export const YEAR = 2026;

export type ViewMode = "year" | "month";

export type MoodId =
  | "sunny"
  | "cozy"
  | "loved"
  | "adventurous"
  | "sleepy"
  | "creative"
  | "wild"
  | "peaceful";

export type StickerId =
  | "heart"
  | "star"
  | "flower"
  | "moon"
  | "coffee"
  | "music"
  | "plane"
  | "book"
  | "cake"
  | "rain"
  | "leaf"
  | "sparkle";

export type WashiColor = "coral" | "sage" | "sky" | "butter" | "lavender" | "ink";

export type CalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  color: WashiColor;
  location: string;
  googleEventId?: string;
};

export type Photo = {
  id: string;
  dataUrl: string;
  caption: string;
};

export type DayEntry = {
  date: string;
  notes: string;
  mood?: MoodId;
  stickers: StickerId[];
  events: CalendarEvent[];
  photos: Photo[];
};

export type GoogleSettings = {
  clientId: string;
  accessToken: string;
  tokenExpiry: number;
  lastSync: string;
  connectedEmail: string;
};

export type AppData = {
  days: Record<string, DayEntry>;
  google: GoogleSettings;
  onboarded: boolean;
};

export const EMPTY_GOOGLE: GoogleSettings = {
  clientId: "",
  accessToken: "",
  tokenExpiry: 0,
  lastSync: "",
  connectedEmail: "",
};

export function emptyDay(date: string): DayEntry {
  return {
    date,
    notes: "",
    stickers: [],
    events: [],
    photos: [],
  };
}

export function isDayFilled(day?: DayEntry): boolean {
  if (!day) return false;
  return Boolean(
    day.notes.trim() ||
      day.mood ||
      day.stickers.length ||
      day.events.length ||
      day.photos.length
  );
}
