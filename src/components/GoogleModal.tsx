import { useState } from "react";
import { useJournal } from "../context/Journal";
import {
  fetchGoogleEvents,
  parseIcs,
  pushGoogleEvent,
  requestGoogleToken,
  revokeGoogleToken,
} from "../lib/google";
import { WashiStrip } from "./Doodles";

type Props = {
  onClose: () => void;
};

export function GoogleModal({ onClose }: Props) {
  const { data, connectGoogle, disconnectGoogle, importEvents, markSynced, editEvent } = useJournal();
  const [clientId, setClientId] = useState(data.google.clientId);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const connected = Boolean(data.google.accessToken);

  async function connect() {
    if (!clientId.trim()) {
      setStatus("Paste your Google OAuth client ID first.");
      return;
    }
    setBusy(true);
    setStatus("Opening Google…");
    try {
      const token = await requestGoogleToken(clientId);
      connectGoogle(clientId.trim(), token);
      setStatus("Connected. You can pull 2026 events in now.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not connect");
    } finally {
      setBusy(false);
    }
  }

  async function pull() {
    if (!data.google.accessToken) return;
    setBusy(true);
    setStatus("Gathering events from Google…");
    try {
      const incoming = await fetchGoogleEvents(data.google.accessToken);
      const added = importEvents(incoming);
      markSynced();
      setStatus(`Tucked ${added} new Google events into 2026.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Sync failed");
    } finally {
      setBusy(false);
    }
  }

  async function pushLocal() {
    if (!data.google.accessToken) return;
    setBusy(true);
    setStatus("Sending local plans to Google…");
    try {
      let sent = 0;
      for (const day of Object.values(data.days)) {
        for (const event of day.events) {
          if (event.googleEventId) continue;
          const id = await pushGoogleEvent(data.google.accessToken, day.date, event);
          if (id) {
            editEvent(day.date, event.id, { googleEventId: id });
            sent += 1;
          }
        }
      }
      markSynced();
      setStatus(sent ? `Sent ${sent} plans to Google Calendar.` : "Everything local is already synced.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not send events");
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    if (data.google.accessToken) await revokeGoogleToken(data.google.accessToken);
    disconnectGoogle();
    setStatus("Disconnected. Your diary pages stay here.");
  }

  function onIcs(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const incoming = parseIcs(text);
      const added = importEvents(incoming);
      setStatus(`Imported ${added} events from ${file.name}.`);
    };
    reader.readAsText(file);
  }

  return (
    <div className="journal-backdrop" onClick={onClose}>
      <div className="postcard" onClick={(event) => event.stopPropagation()} role="dialog" aria-label="Google Calendar">
        <WashiStrip className="tape-blue" />
        <button className="close-journal" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <p className="hand-line">a little envelope for Google</p>
        <h2>Bring your calendar home</h2>
        <p className="postcard-copy">
          Photos, notes, moods, and stickers live only in this diary. Events can travel both ways with Google Calendar.
        </p>
        <ol className="soft-steps">
          <li>Create a Google Cloud OAuth client of type “Web application”.</li>
          <li>Add this origin under Authorized JavaScript origins.</li>
          <li>Enable the Google Calendar API, then paste the client ID below.</li>
        </ol>
        <input
          className="client-input"
          placeholder="xxxx.apps.googleusercontent.com"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
        />
        <div className="postcard-actions">
          <button className="save-event" disabled={busy} onClick={() => void connect()}>
            {connected ? "Reconnect" : "Connect Google"}
          </button>
          <button className="chip" disabled={busy || !connected} onClick={() => void pull()}>
            Pull 2026 events
          </button>
          <button className="chip" disabled={busy || !connected} onClick={() => void pushLocal()}>
            Send my plans
          </button>
          {connected && (
            <button className="chip" onClick={() => void disconnect()}>
              Disconnect
            </button>
          )}
        </div>
        <label className="ics-label">
          or drop an .ics file
          <input type="file" accept=".ics,text/calendar" hidden onChange={(event) => onIcs(event.target.files?.[0])} />
        </label>
        {status && <p className="status-line">{status}</p>}
        {data.google.lastSync && (
          <p className="hand-line">last sync {new Date(data.google.lastSync).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}
