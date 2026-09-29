import type { MoodId, StickerId, WashiColor } from "../types";

export type MonthTheme = {
  name: string;
  nickname: string;
  line: string;
  accent: string;
  wash: string;
  sky: string;
  ink: string;
};

export const MONTHS: MonthTheme[] = [
  {
    name: "January",
    nickname: "Quiet Snow",
    line: "Soft mornings, warm mugs, a year still unwritten.",
    accent: "#7A9BB8",
    wash: "#E7F0F6",
    sky: "#C9DCE8",
    ink: "#2C3E4A",
  },
  {
    name: "February",
    nickname: "Paper Hearts",
    line: "Notes to keep, notes to send, notes to yourself.",
    accent: "#D46A8C",
    wash: "#F8E6EE",
    sky: "#F3C9D6",
    ink: "#5A2438",
  },
  {
    name: "March",
    nickname: "First Green",
    line: "Rain on the window. Something is beginning.",
    accent: "#6FA07A",
    wash: "#E6F1E4",
    sky: "#C8E0C4",
    ink: "#24382A",
  },
  {
    name: "April",
    nickname: "Petal Weather",
    line: "The air smells like a new chapter.",
    accent: "#E08AA8",
    wash: "#FBEAF1",
    sky: "#F5C7D8",
    ink: "#4A2438",
  },
  {
    name: "May",
    nickname: "Bee Season",
    line: "Longer light. Tiny adventures.",
    accent: "#E2A83B",
    wash: "#F8F0D8",
    sky: "#F3E2A4",
    ink: "#4A3A14",
  },
  {
    name: "June",
    nickname: "Picnic Days",
    line: "Strawberries, bare feet, the good kind of busy.",
    accent: "#E15A5A",
    wash: "#FDECEC",
    sky: "#F7C4C4",
    ink: "#4A2020",
  },
  {
    name: "July",
    nickname: "Salt & Sparks",
    line: "Hot pavement, cold drinks, late light.",
    accent: "#3A8FBF",
    wash: "#E4F3FA",
    sky: "#B9DFF2",
    ink: "#16324A",
  },
  {
    name: "August",
    nickname: "Peach Light",
    line: "Slow afternoons that taste like summer.",
    accent: "#E07A5F",
    wash: "#FBE7DC",
    sky: "#F5C9B4",
    ink: "#4A2A1C",
  },
  {
    name: "September",
    nickname: "Golden Page",
    line: "New pencils. Old trees. A softer kind of hurry.",
    accent: "#C4783A",
    wash: "#F6E6D2",
    sky: "#E8C89A",
    ink: "#3D2A18",
  },
  {
    name: "October",
    nickname: "Cinnamon Wind",
    line: "Sweaters, stories, and a little bit of magic.",
    accent: "#D0723A",
    wash: "#F8E4D0",
    sky: "#EFC09A",
    ink: "#3A2414",
  },
  {
    name: "November",
    nickname: "Harvest Table",
    line: "Thank-you notes and early lamps.",
    accent: "#B85C38",
    wash: "#F3E0D0",
    sky: "#E6C2A4",
    ink: "#3A2218",
  },
  {
    name: "December",
    nickname: "Window Lights",
    line: "The year gathers itself into something warm.",
    accent: "#3F6F8A",
    wash: "#E4EEF4",
    sky: "#C3D7E4",
    ink: "#1C303C",
  },
];

export const WASHI: Record<WashiColor, string> = {
  coral: "#E07A5F",
  sage: "#81B29A",
  sky: "#5FA8D3",
  butter: "#E2A83B",
  lavender: "#9B7EBD",
  ink: "#3D2C29",
};

export const MOODS: { id: MoodId; label: string; face: string }[] = [
  { id: "sunny", label: "Sunny", face: "☼" },
  { id: "cozy", label: "Cozy", face: "◌" },
  { id: "loved", label: "Loved", face: "♡" },
  { id: "adventurous", label: "Out", face: "✸" },
  { id: "sleepy", label: "Sleepy", face: "☾" },
  { id: "creative", label: "Making", face: "✧" },
  { id: "wild", label: "Wild", face: "☄" },
  { id: "peaceful", label: "Still", face: "❀" },
];

export const STICKERS: { id: StickerId; label: string; glyph: string }[] = [
  { id: "heart", label: "Heart", glyph: "♥" },
  { id: "star", label: "Star", glyph: "★" },
  { id: "flower", label: "Flower", glyph: "✿" },
  { id: "moon", label: "Moon", glyph: "☾" },
  { id: "coffee", label: "Coffee", glyph: "☕" },
  { id: "music", label: "Music", glyph: "♪" },
  { id: "plane", label: "Travel", glyph: "✈" },
  { id: "book", label: "Book", glyph: "✎" },
  { id: "cake", label: "Celebrate", glyph: "✦" },
  { id: "rain", label: "Rain", glyph: "☂" },
  { id: "leaf", label: "Leaf", glyph: "❧" },
  { id: "sparkle", label: "Sparkle", glyph: "✧" },
];

export const EVENT_COLORS: WashiColor[] = [
  "coral",
  "sage",
  "sky",
  "butter",
  "lavender",
  "ink",
];
