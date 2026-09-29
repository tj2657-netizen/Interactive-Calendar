import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  EMPTY_GOOGLE,
  emptyDay,
  type AppData,
  type CalendarEvent,
  type DayEntry,
  type MoodId,
  type Photo,
  type StickerId,
} from "../types";
import {
  addEvent,
  addPhoto,
  loadData,
  mergeGoogleEvents,
  removeEvent,
  removePhoto,
  saveData,
  updatePhoto,
  setMood,
  setNotes,
  toggleSticker,
  updateEvent,
  withGoogle,
} from "../lib/storage";

type JournalContextValue = {
  ready: boolean;
  data: AppData;
  getDay: (date: string) => DayEntry;
  saveNotes: (date: string, notes: string) => void;
  saveMood: (date: string, mood?: MoodId) => void;
  saveSticker: (date: string, sticker: StickerId) => void;
  saveEvent: (date: string, event: CalendarEvent) => void;
  editEvent: (date: string, eventId: string, patch: Partial<CalendarEvent>) => void;
  deleteEvent: (date: string, eventId: string) => void;
  savePhoto: (date: string, photo: Photo) => void;
  captionPhoto: (date: string, photoId: string, caption: string) => void;
  deletePhoto: (date: string, photoId: string) => void;
  importEvents: (incoming: { date: string; event: CalendarEvent }[]) => number;
  connectGoogle: (clientId: string, token: string) => void;
  markSynced: () => void;
  disconnectGoogle: () => void;
  finishOnboarding: () => void;
};

const JournalContext = createContext<JournalContextValue | null>(null);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>({
    days: {},
    google: { ...EMPTY_GOOGLE },
    onboarded: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadData().then((loaded) => {
      setData(loaded);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    void saveData(data);
  }, [data, ready]);

  const updateDays = useCallback((recipe: (days: AppData["days"]) => AppData["days"]) => {
    setData((current) => ({ ...current, days: recipe(current.days) }));
  }, []);

  const value = useMemo<JournalContextValue>(
    () => ({
      ready,
      data,
      getDay: (date) => data.days[date] ?? emptyDay(date),
      saveNotes: (date, notes) => updateDays((days) => setNotes(days, date, notes)),
      saveMood: (date, mood) => updateDays((days) => setMood(days, date, mood)),
      saveSticker: (date, sticker) => updateDays((days) => toggleSticker(days, date, sticker)),
      saveEvent: (date, event) => updateDays((days) => addEvent(days, date, event)),
      editEvent: (date, eventId, patch) =>
        updateDays((days) => updateEvent(days, date, eventId, patch)),
      deleteEvent: (date, eventId) => updateDays((days) => removeEvent(days, date, eventId)),
      savePhoto: (date, photo) => updateDays((days) => addPhoto(days, date, photo)),
      captionPhoto: (date, photoId, caption) =>
        updateDays((days) => updatePhoto(days, date, photoId, { caption })),
      deletePhoto: (date, photoId) => updateDays((days) => removePhoto(days, date, photoId)),
      importEvents: (incoming) => {
        let added = 0;
        setData((current) => {
          const before = Object.values(current.days).reduce(
            (sum, day) => sum + day.events.length,
            0
          );
          const days = mergeGoogleEvents(current.days, incoming);
          added =
            Object.values(days).reduce((sum, day) => sum + day.events.length, 0) - before;
          return { ...current, days };
        });
        return added;
      },
      connectGoogle: (clientId, token) => {
        setData((current) =>
          withGoogle(current, {
            clientId,
            accessToken: token,
            tokenExpiry: Date.now() + 45 * 60 * 1000,
          })
        );
      },
      markSynced: () => {
        setData((current) =>
          withGoogle(current, { lastSync: new Date().toISOString() })
        );
      },
      disconnectGoogle: () => {
        setData((current) => withGoogle(current, { ...EMPTY_GOOGLE, clientId: current.google.clientId }));
      },
      finishOnboarding: () => setData((current) => ({ ...current, onboarded: true })),
    }),
    [data, ready, updateDays]
  );

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used inside JournalProvider");
  return ctx;
}
