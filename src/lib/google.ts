import type { CalendarEvent, WashiColor } from "../types";
import { EVENT_COLORS } from "./themes";
import { extractDate, extractTime, pad } from "./dates";
import { uid } from "./photos";

const SCOPE = "https://www.googleapis.com/auth/calendar.events";
const GIS_SRC = "https://accounts.google.com/gsi/client";

export function loadGis(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Google sign-in failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google sign-in failed to load"));
    document.head.appendChild(script);
  });
}

export async function requestGoogleToken(clientId: string): Promise<string> {
  await loadGis();
  const oauth = window.google?.accounts.oauth2;
  if (!oauth) throw new Error("Google sign-in is not available");
  return new Promise((resolve, reject) => {
    const client = oauth.initTokenClient({
      client_id: clientId.trim(),
      scope: SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error || "Google did not return a token"));
          return;
        }
        resolve(response.access_token);
      },
    });
    client.requestAccessToken({ prompt: "consent" });
  });
}

export async function revokeGoogleToken(token: string): Promise<void> {
  await loadGis();
  const oauth = window.google?.accounts.oauth2;
  if (!oauth || !token) return;
  await new Promise<void>((resolve) => oauth.revoke(token, () => resolve()));
}

type GoogleEvent = {
  id?: string;
  summary?: string;
  location?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
};

export async function fetchGoogleEvents(
  token: string
): Promise<{ date: string; event: CalendarEvent }[]> {
  const timeMin = encodeURIComponent("2026-01-01T00:00:00Z");
  const timeMax = encodeURIComponent("2027-01-01T00:00:00Z");
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&maxResults=2500&timeMin=${timeMin}&timeMax=${timeMax}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Could not read Google Calendar");
  const json = (await res.json()) as { items?: GoogleEvent[] };
  const out: { date: string; event: CalendarEvent }[] = [];
  (json.items ?? []).forEach((item, index) => {
    const start = item.start?.dateTime || item.start?.date;
    if (!start) return;
    const date = extractDate(start);
    if (!date.startsWith("2026-")) return;
    const allDay = Boolean(item.start?.date && !item.start?.dateTime);
    const color = EVENT_COLORS[index % EVENT_COLORS.length];
    out.push({
      date,
      event: {
        id: uid(),
        title: item.summary?.trim() || "Untitled",
        startTime: allDay ? "" : extractTime(item.start?.dateTime || ""),
        endTime: allDay ? "" : extractTime(item.end?.dateTime || ""),
        allDay,
        color,
        location: item.location ?? "",
        googleEventId: item.id,
      },
    });
  });
  return out;
}

export async function pushGoogleEvent(
  token: string,
  date: string,
  event: CalendarEvent
): Promise<string> {
  const body = event.allDay
    ? {
        summary: event.title,
        location: event.location || undefined,
        start: { date },
        end: { date: nextDate(date) },
      }
    : {
        summary: event.title,
        location: event.location || undefined,
        start: {
          dateTime: `${date}T${event.startTime || "09:00"}:00`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: `${date}T${event.endTime || event.startTime || "10:00"}:00`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error("Could not add event to Google Calendar");
  const json = (await res.json()) as { id?: string };
  return json.id ?? "";
}

function nextDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(y, m - 1, d + 1);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
}

export function parseIcs(text: string): { date: string; event: CalendarEvent }[] {
  const blocks = text.split(/BEGIN:VEVENT/i).slice(1);
  const out: { date: string; event: CalendarEvent }[] = [];
  const colors: WashiColor[] = EVENT_COLORS;
  blocks.forEach((block, index) => {
    const summary = icsValue(block, "SUMMARY") || "Untitled";
    const location = icsValue(block, "LOCATION") || "";
    const startRaw = icsValue(block, "DTSTART") || "";
    const endRaw = icsValue(block, "DTEND") || "";
    const uidValue = icsValue(block, "UID") || uid();
    const allDay = /^\d{8}$/.test(startRaw) && !startRaw.includes("T");
    const date = icsToDate(startRaw);
    if (!date.startsWith("2026-")) return;
    out.push({
      date,
      event: {
        id: uid(),
        title: summary,
        startTime: allDay ? "" : icsToTime(startRaw),
        endTime: allDay ? "" : icsToTime(endRaw),
        allDay,
        color: colors[index % colors.length],
        location,
        googleEventId: uidValue,
      },
    });
  });
  return out;
}

function icsValue(block: string, key: string): string {
  const match = block.match(new RegExp(`^${key}[^:]*:(.*)$`, "im"));
  return match ? match[1].replace(/\\n/g, "\n").replace(/\\,/g, ",").trim() : "";
}

function icsToDate(raw: string): string {
  const compact = raw.replace(/[^0-9T]/g, "");
  if (compact.length >= 8) {
    return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`;
  }
  return "";
}

function icsToTime(raw: string): string {
  const compact = raw.replace(/[^0-9T]/g, "");
  const t = compact.split("T")[1];
  if (!t || t.length < 4) return "";
  return `${t.slice(0, 2)}:${t.slice(2, 4)}`;
}
