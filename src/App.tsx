import { useMemo, useState } from "react";
import { DayJournal } from "./components/DayJournal";
import { FloatingDecor } from "./components/Decor";
import { GoogleModal } from "./components/GoogleModal";
import { Header } from "./components/Header";
import { MonthView } from "./components/MonthView";
import { YearView } from "./components/YearView";
import { JournalProvider, useJournal } from "./context/Journal";
import { YEAR, type ViewMode } from "./types";
import { Pip } from "./components/Doodles";

function currentMonth() {
  const now = new Date();
  if (now.getFullYear() === YEAR) return now.getMonth();
  return 0;
}

function Shell() {
  const { ready, data, finishOnboarding } = useJournal();
  const startMonth = useMemo(currentMonth, []);
  const [view, setView] = useState<ViewMode>("month");
  const [month, setMonth] = useState(startMonth);
  const [selected, setSelected] = useState<string | null>(null);
  const [googleOpen, setGoogleOpen] = useState(false);

  if (!ready) {
    return (
      <div className="splash">
        <Pip className="splash-pip" />
        <p className="hand-line">opening your year…</p>
      </div>
    );
  }

  return (
    <div className="app-frame">
      <FloatingDecor />
      <Header
        view={view}
        month={month}
        onView={setView}
        onMonth={setMonth}
        onGoogle={() => setGoogleOpen(true)}
        googleOn={Boolean(data.google.accessToken)}
      />
      <main>
        {view === "year" ? (
          <YearView
            onOpenMonth={(next) => {
              setMonth(next);
              setView("month");
              setSelected(null);
            }}
          />
        ) : (
          <MonthView month={month} selected={selected} onSelect={setSelected} />
        )}
      </main>
      {selected && view === "month" && (
        <DayJournal date={selected} onClose={() => setSelected(null)} />
      )}
      {googleOpen && <GoogleModal onClose={() => setGoogleOpen(false)} />}
      {!data.onboarded && (
        <div className="welcome-card">
          <p className="hand-line">hello, 2026</p>
          <h2>This is your illustrated year.</h2>
          <p>
            Click any day. Write a memory. Stick a photo. Pin a plan. Nothing here is trying to look like work software.
          </p>
          <button className="save-event" onClick={finishOnboarding}>
            Open the book
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <JournalProvider>
      <Shell />
    </JournalProvider>
  );
}
