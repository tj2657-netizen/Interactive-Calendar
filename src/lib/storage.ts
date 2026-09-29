import {
  EMPTY_GOOGLE,
  emptyDay,
  type AppData,
  type CalendarEvent,
  type DayEntry,
  type GoogleSettings,
  type MoodId,
  type Photo,
  type StickerId,
} from "../types";

const DB_NAME = "little-year-2026";
const DB_VERSION = 1;
const STORE = "journal";
const KEY = "app";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadData(): Promise<AppData> {
  try {
    const db = await openDb();
    const data = await new Promise<AppData | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve(req.result as AppData | undefined);
      req.onerror = () => reject(req.error);
    });
    db.close();
    if (data?.days) {
      return {
        days: data.days,
        google: { ...EMPTY_GOOGLE, ...data.google },
        onboarded: Boolean(data.onboarded),
      };
    }
  } catch {
    /* empty journal */
  }
  return { days: {}, google: { ...EMPTY_GOOGLE }, onboarded: false };
}

export async function saveData(data: AppData): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(data, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export function upsertDay(
  days: Record<string, DayEntry>,
  date: string,
  patch: Partial<DayEntry>
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  const next: DayEntry = { ...current, ...patch, date };
  const filled =
    next.notes.trim() ||
    next.mood ||
    next.stickers.length ||
    next.events.length ||
    next.photos.length;
  const copy = { ...days };
  if (filled) copy[date] = next;
  else delete copy[date];
  return copy;
}

export function addEvent(
  days: Record<string, DayEntry>,
  date: string,
  event: CalendarEvent
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, { events: [...current.events, event] });
}

export function updateEvent(
  days: Record<string, DayEntry>,
  date: string,
  eventId: string,
  patch: Partial<CalendarEvent>
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, {
    events: current.events.map((event) =>
      event.id === eventId ? { ...event, ...patch } : event
    ),
  });
}

export function removeEvent(
  days: Record<string, DayEntry>,
  date: string,
  eventId: string
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, {
    events: current.events.filter((event) => event.id !== eventId),
  });
}

export function addPhoto(
  days: Record<string, DayEntry>,
  date: string,
  photo: Photo
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, { photos: [...current.photos, photo] });
}

export function updatePhoto(
  days: Record<string, DayEntry>,
  date: string,
  photoId: string,
  patch: Partial<Photo>
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, {
    photos: current.photos.map((photo) =>
      photo.id === photoId ? { ...photo, ...patch } : photo
    ),
  });
}

export function removePhoto(
  days: Record<string, DayEntry>,
  date: string,
  photoId: string
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, {
    photos: current.photos.filter((photo) => photo.id !== photoId),
  });
}

export function toggleSticker(
  days: Record<string, DayEntry>,
  date: string,
  sticker: StickerId
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  const has = current.stickers.includes(sticker);
  return upsertDay(days, date, {
    stickers: has
      ? current.stickers.filter((item) => item !== sticker)
      : [...current.stickers, sticker],
  });
}

export function setMood(
  days: Record<string, DayEntry>,
  date: string,
  mood?: MoodId
): Record<string, DayEntry> {
  const current = days[date] ?? emptyDay(date);
  return upsertDay(days, date, { mood: mood === current.mood ? undefined : mood });
}

export function setNotes(
  days: Record<string, DayEntry>,
  date: string,
  notes: string
): Record<string, DayEntry> {
  return upsertDay(days, date, { notes });
}

export function mergeGoogleEvents(
  days: Record<string, DayEntry>,
  incoming: { date: string; event: CalendarEvent }[]
): Record<string, DayEntry> {
  let next = { ...days };
  for (const { date, event } of incoming) {
    const current = next[date] ?? emptyDay(date);
    const exists = current.events.some(
      (item) => item.googleEventId && item.googleEventId === event.googleEventId
    );
    if (!exists) next = addEvent(next, date, event);
  }
  return next;
}

export function withGoogle(
  data: AppData,
  google: Partial<GoogleSettings>
): AppData {
  return { ...data, google: { ...data.google, ...google } };
}
