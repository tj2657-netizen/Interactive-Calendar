import { MONTHS } from "../lib/themes";
import { YEAR, type ViewMode } from "../types";
import { Pip, Sparkle, Star } from "./Doodles";

type Props = {
  view: ViewMode;
  month: number;
  onView: (view: ViewMode) => void;
  onMonth: (month: number) => void;
  onGoogle: () => void;
  googleOn: boolean;
};

export function Header({ view, month, onView, onMonth, onGoogle, googleOn }: Props) {
  const theme = MONTHS[month];
  return (
    <header className="top-bar">
      <button className="brand" onClick={() => onView("year")} aria-label="Open year view">
        <Pip className="brand-pip" />
        <span>
          <strong>Little Year</strong>
          <em>my illustrated 2026</em>
        </span>
      </button>

      <div className="month-switch">
        <button
          className="nav-arrow"
          disabled={month <= 0 || view === "year"}
          onClick={() => onMonth(month - 1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="month-title">
          <Star className="tiny-star" />
          {view === "year" ? (
            <h1>{YEAR}</h1>
          ) : (
            <h1>
              {theme.name} <span>{YEAR}</span>
            </h1>
          )}
          <Sparkle className="tiny-sparkle" />
        </div>
        <button
          className="nav-arrow"
          disabled={month >= 11 || view === "year"}
          onClick={() => onMonth(month + 1)}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="top-actions">
        <button className={`chip ${view === "year" ? "on" : ""}`} onClick={() => onView("year")}>
          Whole year
        </button>
        <button className={`chip ${view === "month" ? "on" : ""}`} onClick={() => onView("month")}>
          This month
        </button>
        <button className={`chip google ${googleOn ? "on" : ""}`} onClick={onGoogle}>
          {googleOn ? "Calendar synced" : "Google Calendar"}
        </button>
      </div>
    </header>
  );
}
