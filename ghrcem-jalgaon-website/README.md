# GHRCEM Jalgaon — Demo College Website

A static, responsive college website built with plain **HTML, CSS and
JavaScript** — no frameworks, no build step — designed as a Coder's Club
session: build it, push it to GitHub, then deploy it to the cloud.

> **Note for facilitators:** quick-fact numbers, staff names, and the
> phone/email/address on the Contact page are placeholders. Swap them for
> the college's real, verified details before using this outside the
> workshop.

## Project structure

```
ghrcem-jalgaon-website/
├── index.html          Home page
├── departments.html    Department & program listing
├── admissions.html     Admissions process + enquiry form
├── contact.html        Contact details + message form
├── css/
│   └── style.css       All styling (one shared stylesheet)
├── js/
│   └── script.js       Mobile nav toggle, form validation, footer year
└── README.md
```

Every page links the same `css/style.css` and `js/script.js`, so a change
to either file updates all four pages — a good talking point for the
"why separate files?" part of the session.

## Part 1 — Run it locally

No build tools needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it properly (recommended, avoids some browser file-access quirks):
  ```bash
  cd ghrcem-jalgaon-website
  python3 -m http.server 8000
  # visit http://localhost:8000
  ```

## Part 2 — Push to a GitHub repository

1. **Create the repo on GitHub** (github.com → New repository). Name it,
   e.g., `ghrcem-jalgaon-website`. Leave it empty — no README/license —
   since you already have local files.
2. **Initialize Git locally and push:**
   ```bash
   cd ghrcem-jalgaon-website
   git init
   git add .
   git commit -m "Initial commit: GHRCEM Jalgaon demo site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ghrcem-jalgaon-website.git
   git push -u origin main
   ```
3. **Verify** by refreshing the GitHub repo page — all files should be
   listed there.

Good discussion points for students: what `.gitignore` is for, the
difference between `git add`, `git commit`, and `git push`, and why the
first `push` needs `-u` (it links your local `main` branch to the remote
one; after that, `git push` alone is enough).

## Part 3 — Deploy to the cloud

Since this is a static site (no server-side code), any static hosting
service works. Three good options for a workshop, easiest first:

### Option A: GitHub Pages (simplest — stays inside GitHub)

1. In the repo, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait a minute, then the page shows your live URL:
   `https://<your-username>.github.io/ghrcem-jalgaon-website/`

Every future `git push` to `main` redeploys automatically.

### Option B: Netlify (drag-and-drop or Git-connected)

1. Sign in at netlify.com with GitHub.
2. **Add new site → Import an existing project → GitHub** → pick the repo.
3. Leave build settings blank (no build command; publish directory `/`).
4. **Deploy** — Netlify gives a live URL and redeploys on every push.

### Option C: Vercel

1. Sign in at vercel.com with GitHub.
2. **New Project** → import the repo.
3. Framework preset: **Other** (static) → **Deploy**.

All three are free for a project like this and take under five minutes —
good to demo two of them side by side so students see that "the cloud"
here just means "a service that serves your static files over HTTPS."

## Extending this for a longer session

- Wire the two forms (`admissions.html`, `contact.html`) to a real
  endpoint — e.g. Formspree, a Netlify Form, or a small serverless
  function — since right now `js/script.js` only *simulates* submission.
- Add a fourth page (e.g. `events.html`) and extend the shared nav —
  good repetition exercise for new contributors.
- Turn the repeated header/footer markup into includes using a static
  site generator (11ty, Astro) once students are comfortable with plain
  HTML — a natural "why do we need a build step?" follow-up session.
