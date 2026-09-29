import { useMemo, useState } from "react";
import { useJournal } from "../context/Journal";
import { formatPretty } from "../lib/dates";
import { compressImage, uid } from "../lib/photos";
import { EVENT_COLORS, MOODS, STICKERS, WASHI } from "../lib/themes";
import type { CalendarEvent, WashiColor } from "../types";
import { Heart, Sparkle, WashiStrip } from "./Doodles";

type Props = {
  date: string;
  onClose: () => void;
};

const blankEvent = (): Omit<CalendarEvent, "id"> => ({
  title: "",
  startTime: "",
  endTime: "",
  allDay: false,
  color: "coral",
  location: "",
});

export function DayJournal({ date, onClose }: Props) {
  const journal = useJournal();
  const day = journal.getDay(date);
  const [draft, setDraft] = useState(blankEvent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pretty = useMemo(() => formatPretty(date), [date]);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(files).slice(0, 6)) {
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await compressImage(file);
        journal.savePhoto(date, { id: uid(), dataUrl, caption: "" });
      }
    } finally {
      setBusy(false);
    }
  }

  function submitEvent() {
    if (!draft.title.trim()) return;
    if (editingId) {
      journal.editEvent(date, editingId, { ...draft, title: draft.title.trim() });
      setEditingId(null);
    } else {
      journal.saveEvent(date, { ...draft, id: uid(), title: draft.title.trim() });
    }
    setDraft(blankEvent());
  }

  return (
    <div className="journal-backdrop" onClick={onClose}>
      <aside className="journal-page" onClick={(event) => event.stopPropagation()} role="dialog" aria-label={`Journal for ${pretty}`}>
        <WashiStrip className="tape-sage" />
        <WashiStrip className="tape-pink right" />
        <button className="close-journal" onClick={onClose} aria-label="Close day">
          ✕
        </button>
        <header className="journal-head">
          <p className="hand-line">a page from the year</p>
          <h2>{pretty}</h2>
          <Heart className="journal-heart" />
        </header>

        <section className="journal-block">
          <h3>How the day felt</h3>
          <div className="mood-row">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                className={`mood-chip ${day.mood === mood.id ? "on" : ""}`}
                onClick={() => journal.saveMood(date, mood.id)}
              >
                <span>{mood.face}</span>
                {mood.label}
              </button>
            ))}
          </div>
        </section>

        <section className="journal-block">
          <h3>Stickers</h3>
          <div className="sticker-tray">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                className={`sticker ${day.stickers.includes(sticker.id) ? "on" : ""}`}
                onClick={() => journal.saveSticker(date, sticker.id)}
                title={sticker.label}
              >
                {sticker.glyph}
              </button>
            ))}
          </div>
        </section>

        <section className="journal-block">
          <h3>Plans & little events</h3>
          <ul className="event-list">
            {day.events.map((event) => (
              <li key={event.id} className="ticket">
                <span className="ticket-tab" style={{ background: WASHI[event.color] }} />
                <div>
                  <strong>{event.title}</strong>
                  <em>
                    {event.allDay ? "all day" : [event.startTime, event.endTime].filter(Boolean).join(" – ") || "untimed"}
                    {event.location ? ` · ${event.location}` : ""}
                  </em>
                </div>
                <button
                  onClick={() => {
                    setEditingId(event.id);
                    setDraft({
                      title: event.title,
                      startTime: event.startTime,
                      endTime: event.endTime,
                      allDay: event.allDay,
                      color: event.color,
                      location: event.location,
                    });
                  }}
                >
                  edit
                </button>
                <button onClick={() => journal.deleteEvent(date, event.id)}>remove</button>
              </li>
            ))}
          </ul>
          <div className="event-form">
            <input
              placeholder={editingId ? "Update this plan" : "Add something to this day"}
              value={draft.title}
              onChange={(event) => setDraft((d) => ({ ...d, title: event.target.value }))}
            />
            <label className="all-day">
              <input
                type="checkbox"
                checked={draft.allDay}
                onChange={(event) => setDraft((d) => ({ ...d, allDay: event.target.checked }))}
              />
              all day
            </label>
            {!draft.allDay && (
              <>
                <input type="time" value={draft.startTime} onChange={(event) => setDraft((d) => ({ ...d, startTime: event.target.value }))} />
                <input type="time" value={draft.endTime} onChange={(event) => setDraft((d) => ({ ...d, endTime: event.target.value }))} />
              </>
            )}
            <input
              placeholder="Where?"
              value={draft.location}
              onChange={(event) => setDraft((d) => ({ ...d, location: event.target.value }))}
            />
            <div className="color-row">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-dot ${draft.color === color ? "on" : ""}`}
                  style={{ background: WASHI[color] }}
                  onClick={() => setDraft((d) => ({ ...d, color: color as WashiColor }))}
                  aria-label={color}
                />
              ))}
            </div>
            <button className="save-event" onClick={submitEvent}>
              {editingId ? "Save changes" : "Pin this plan"}
            </button>
          </div>
        </section>

        <section className="journal-block">
          <h3>Notes & memories</h3>
          <textarea
            className="lined-notes"
            placeholder="Write the day as it was... a sentence, a secret, a grocery list, a wish."
            value={day.notes}
            onChange={(event) => journal.saveNotes(date, event.target.value)}
          />
        </section>

        <section className="journal-block">
          <h3>
            Photos <Sparkle className="tiny-sparkle" />
          </h3>
          <label
            className={`photo-drop ${busy ? "busy" : ""}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              void onFiles(event.dataTransfer.files);
            }}
          >
            <input type="file" accept="image/*" multiple hidden onChange={(event) => void onFiles(event.target.files)} />
            {busy ? "pressing this photo into the page..." : "Drop a photo, or click to paste one here"}
          </label>
          <div className="polaroid-wall">
            {day.photos.map((photo, index) => (
              <figure key={photo.id} className={`polaroid r${index % 5}`}>
                <img src={photo.dataUrl} alt={photo.caption || "Memory"} />
                <input
                  value={photo.caption}
                  placeholder="a little caption"
                  onChange={(event) => journal.captionPhoto(date, photo.id, event.target.value)}
                />
                <button className="remove-photo" onClick={() => journal.deletePhoto(date, photo.id)}>
                  tuck away
                </button>
              </figure>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
