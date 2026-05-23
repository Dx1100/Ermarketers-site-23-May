# Replit Agency Live

Static Vite deployment of your exported Replit marketing website.

## What changed

- Removed the need for the Replit Express/Postgres backend in the launch setup.
- Added `VITE_LEADS_ENDPOINT` so the form can submit to Google Apps Script.
- Added `vercel.json` so direct visits to internal routes work on Vercel.
- Included a ready-to-use Google Apps Script file in [`scripts/google-apps-script.js`](./scripts/google-apps-script.js).

## Local setup

```bash
npm install
```

Create a `.env` file from `.env.example` and set:

```bash
VITE_LEADS_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then run:

```bash
npm run dev
```

## Google Sheets setup

1. Create a Google Sheet.
2. Add this header row:
   `timestamp, name, email, phone, company, service, message, source`
3. Open `Extensions -> Apps Script`.
4. Paste the contents of [`scripts/google-apps-script.js`](./scripts/google-apps-script.js).
5. Deploy it as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
6. Copy the web app URL into `.env` as `VITE_LEADS_ENDPOINT`.

## Vercel deploy

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Set the environment variable `VITE_LEADS_ENDPOINT`.
4. Deploy.
5. Add your custom domain in Vercel when ready.

## GitHub Pages deploy (static)

This repo includes a GitHub Actions workflow that builds with the correct base path and publishes `dist/` to GitHub Pages.

1. Push to a GitHub repo (default branch: `main`).
2. In GitHub: `Settings -> Pages`, set **Source** to **GitHub Actions**.
3. (Optional) Add a repository secret `VITE_LEADS_ENDPOINT` so the lead form can submit to Google Sheets.

## Quick "CMS" edits (no dashboard)

This project is set up so you can edit most marketing copy without touching React code:

- Main content file: `src/content/site.json`
- Images you own: put them in `public/images/` and reference them like `images/your-file.png`

**Fast edit workflow (recommended):**

1. Open the GitHub repo.
2. Edit `src/content/site.json` in the GitHub web UI.
3. Commit to `main`.
4. Wait ~30–90 seconds for Vercel (or GitHub Pages Actions) to rebuild and publish.
