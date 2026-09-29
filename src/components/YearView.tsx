import { useJournal } from "../context/Journal";
import { dateKey, monthGrid, WEEKDAYS } from "../lib/dates";
import { MONTHS } from "../lib/themes";
import { YEAR } from "../types";
import { MonthArt, StampRing, WashiStrip } from "./Doodles";

type Props = {
  onOpenMonth: (month: number) => void;
};

export function YearView({ onOpenMonth }: Props) {
  const { data } = useJournal();
  return (
    <section className="year-spread">
      <div className="year-intro">
        <WashiStrip className="tape-lavender" />
        <p className="hand-line">a whole year, kept like a scrapbook</p>
        <h2>Twelve little rooms of 2026</h2>
        <p>
          Click any month. Write in the days. Stick photos where the memories live.
          This is not a schedule grid — it is your year, illustrated.
        </p>
      </div>
      <div className="year-grid">
        {MONTHS.map((month, index) => {
          const grid = monthGrid(YEAR, index);
          const photo = Object.values(data.days).find(
            (day) => day.date.startsWith(`2026-${String(index + 1).padStart(2, "0")}`) && day.photos[0]
          )?.photos[0];
          const eventCount = Object.values(data.days)
            .filter((day) => day.date.startsWith(`2026-${String(index + 1).padStart(2, "0")}`))
            .reduce((sum, day) => sum + day.events.length + (day.notes ? 1 : 0) + day.photos.length, 0);
          return (
            <button
              key={month.name}
              className={`year-card month-${index}`}
              onClick={() => onOpenMonth(index)}
              style={{ ["--m-accent" as string]: month.accent, ["--m-wash" as string]: month.wash }}
            >
              <WashiStrip className={`tape tape-${index % 6}`} />
              <StampRing className="stamp" />
              <div className="year-card-head">
                <span className="hand-line">{month.nickname}</span>
                <strong>{month.name}</strong>
              </div>
              <MonthArt month={index} />
              <div className="mini-cal">
                {WEEKDAYS.map((day, i) => (
                  <span key={`${day}-${i}`} className="mini-dow">
                    {day}
                  </span>
                ))}
                {grid.map((day, i) => {
                  const key = day ? dateKey(YEAR, index, day) : "";
                  const entry = key ? data.days[key] : undefined;
                  return (
                    <span
                      key={i}
                      className={`mini-day ${entry?.photos.length ? "has-photo" : ""} ${entry?.events.length ? "has-event" : ""}`}
                    >
                      {day ?? ""}
                    </span>
                  );
                })}
              </div>
              {photo ? (
                <img className="year-peek" src={photo.dataUrl} alt="" />
              ) : (
                <div className="year-peek empty-peek" />
              )}
              <span className="year-count">{eventCount ? `${eventCount} keepsakes` : "still blank, still yours"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
