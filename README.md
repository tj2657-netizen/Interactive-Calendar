# Little Year — 2026

A cute illustrated calendar, scrapbook, and visual diary for 2026. This project lives on its own, not inside the Lovable app.

## Run it

You need [Bun](https://bun.sh) or Node.js.

```sh
cd ~/Little\ Year
~/.bun/bin/bun install
~/.bun/bin/bun run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## What you can do

- See the whole year, or live inside one month
- Click any day to write notes, pin events, pick a mood, and add stickers
- Drop photos onto a date (they show up as polaroids on the calendar)
- Connect Google Calendar with your own OAuth client ID, or import an `.ics` file
- Everything is saved in this browser (IndexedDB)

## Google Calendar

1. Create a Google Cloud project
2. Enable **Google Calendar API**
3. Create an OAuth client of type **Web application**
4. Add `http://localhost:5173` as an authorized JavaScript origin
5. Paste the client ID into Little Year and connect

Photos, notes, moods, and stickers stay in the diary. Only events sync with Google.
