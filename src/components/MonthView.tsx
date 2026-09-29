import { useMemo } from "react";
import { useJournal } from "../context/Journal";
import { dateKey, formatShort, isToday, monthGrid, WEEKDAYS } from "../lib/dates";
import { compressImage, uid } from "../lib/photos";
import { MONTHS, STICKERS, WASHI } from "../lib/themes";
import { YEAR, isDayFilled } from "../types";
import { Flower, MonthArt, Sparkle, Star, WashiStrip } from "./Doodles";

type Props = {
  month: number;
  selected: string | null;
  onSelect: (date: string) => void;
};

export function MonthView({ month, selected, onSelect }: Props) {
  const { data, savePhoto } = useJournal();
  const theme = MONTHS[month];
  const grid = monthGrid(YEAR, month);
  const prefix = `2026-${String(month + 1).padStart(2, "0")}`;

  const monthDays = useMemo(
    () => Object.values(data.days).filter((day) => day.date.startsWith(prefix)),
    [data.days, prefix]
  );
  const photos = monthDays.flatMap((day) => day.photos.map((photo) => ({ ...photo, date: day.date })));
  const upcoming = monthDays
    .flatMap((day) => day.events.map((event) => ({ ...event, date: day.date })))
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

  return (
    <section className="month-spread" style={{ ["--m-accent" as string]: theme.accent, ["--m-wash" as string]: theme.wash, ["--m-sky" as string]: theme.sky }}>
      <div className="month-hero">
        <WashiStrip className="tape-peach" />
        <div>
          <p className="hand-line">{theme.nickname}</p>
          <h2>{theme.name}</h2>
          <p className="month-line">{theme.line}</p>
        </div>
        <MonthArt month={month} />
        <Flower className="hero-flower" />
        <Star className="hero-star" />
      </div>

      <div className="month-body">
        <div className="calendar-page">
          <div className="dow-row">
            {WEEKDAYS.map((day, i) => (
              <span key={`${day}-${i}`}>{day}</span>
            ))}
          </div>
          <div className="day-grid">
            {grid.map((day, i) => {
              if (!day) return <div key={i} className="day-cell ghost" />;
              const key = dateKey(YEAR, month, day);
              const entry = data.days[key];
              const filled = isDayFilled(entry);
              const photo = entry?.photos[0];
              return (
                <button
                  key={key}
                  className={`day-cell ${selected === key ? "selected" : ""} ${isToday(key) ? "today" : ""} ${filled ? "filled" : ""}`}
                  onClick={() => onSelect(key)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const files = event.dataTransfer.files;
                    void (async () => {
                      for (const file of Array.from(files).slice(0, 4)) {
                        if (!file.type.startsWith("image/")) continue;
                        const dataUrl = await compressImage(file);
                        savePhoto(key, { id: uid(), dataUrl, caption: "" });
                      }
                    })();
                  }}
                >
                  {isToday(key) && <span className="today-ribbon">today</span>}
                  <span className="day-num">{day}</span>
                  {photo && <img className="day-polaroid" src={photo.dataUrl} alt="" />}
                  <span className="day-stickers">
                    {entry?.stickers.slice(0, 3).map((sticker) => (
                      <i key={sticker}>{STICKERS.find((item) => item.id === sticker)?.glyph}</i>
                    ))}
                  </span>
                  <span className="day-events">
                    {entry?.events.slice(0, 2).map((event) => (
                      <em key={event.id} style={{ background: WASHI[event.color] }}>
                        {event.title}
                      </em>
                    ))}
                    {(entry?.events.length ?? 0) > 2 && <em className="more">+{entry!.events.length - 2}</em>}
                  </span>
                  {entry?.notes && !entry.events.length && !photo && (
                    <span className="note-dot" title="Has a memory" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="month-side">
          <div className="side-card blooms">
            <Sparkle className="tiny-sparkle" />
            <h3>This month’s scraps</h3>
            {upcoming.length === 0 && photos.length === 0 ? (
              <p className="empty-copy">
                No plans yet — tap a day and leave a note, a photo, or a little event. The page likes company.
              </p>
            ) : (
              <ul className="scrap-list">
                {upcoming.slice(0, 6).map((event) => (
                  <li key={event.id}>
                    <span className="washi-dot" style={{ background: WASHI[event.color] }} />
                    <button onClick={() => onSelect(event.date)}>
                      <strong>{event.title}</strong>
                      <em>
                        {formatShort(event.date)}
                        {event.allDay ? " · all day" : event.startTime ? ` · ${event.startTime}` : ""}
                      </em>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {photos.length > 0 && (
            <div className="side-card film">
              <h3>Pressed photos</h3>
              <div className="filmstrip">
                {photos.slice(0, 8).map((photo) => (
                  <button key={photo.id} className="film-frame" onClick={() => onSelect(photo.date)}>
                    <img src={photo.dataUrl} alt={photo.caption || "Memory"} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
