import { YEAR } from "../types";

export const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
export const WEEKDAYS_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function dateKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function parseKey(key: string): { year: number; month: number; day: number } {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

export function formatPretty(key: string): string {
  const { year, month, day } = parseKey(key);
  return new Date(year, month, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(key: string): string {
  const { month, day } = parseKey(key);
  return new Date(YEAR, month, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function firstWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function todayKey(): string {
  const now = new Date();
  return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isToday(key: string): boolean {
  return key === todayKey();
}

export function clampMonth(month: number): number {
  return Math.min(11, Math.max(0, month));
}

export function monthGrid(year: number, month: number): (number | null)[] {
  const start = firstWeekday(year, month);
  const count = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < start; i++) cells.push(null);
  for (let d = 1; d <= count; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function adjacentMonth(
  year: number,
  month: number,
  dir: -1 | 1
): { year: number; month: number } | null {
  const next = month + dir;
  if (year === YEAR && next >= 0 && next <= 11) return { year, month: next };
  return null;
}

export function toLocalDateTime(date: string, time: string): string {
  return `${date}T${time || "00:00"}:00`;
}

export function extractTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function extractDate(iso: string): string {
  if (iso.length <= 10) return iso.slice(0, 10);
  const d = new Date(iso);
  return dateKey(d.getFullYear(), d.getMonth(), d.getDate());
}
