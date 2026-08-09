# Maintainer notes

Static personal site (plain HTML/CSS/JS, no build step). Live at https://smit-hinsu.github.io/

## Structure & design decisions
- Single-page app: sidebar + JS view-switching (`app.js`). Nav is intentionally minimal —
  **About, Reading, Blog** only.
- Experience / Publications / Education / Honors were deliberately dropped from the live
  nav and preserved in **`_archived-sections.html`** (with restore instructions). The
  **résumé PDF** carries the formal professional detail. Don't re-add those sections
  without deciding to.
- **Technical focus** (the tag list of ML compilers / accelerators / infra / DB) was also
  removed from About, for the same reason — the résumé carries it. The `.tags` CSS is still
  in `styles.css` if it's ever restored.
- The **About** panel is deliberately spare: one bio paragraph, then Currently building.
  The bio is the owner's own wording — don't rewrite it without asking. A separate "Mission"
  callout (`.goal`) was tried and removed; the bio's second sentence states the goal instead.
- **Reading** is built from curated Goodreads shelves ("transformational", "insightful")
  plus an "Also recommended" grid of other 4–5★ reads. Book covers are stored locally
  under `covers/` and `covers/more/` so the site is self-contained.
- **Blog**: each post is its own file under `posts/` (see `posts/_template.html`). No build
  tools. The Blog tab stays hidden until at least one `.post` entry exists.
- **Email** uses light client-side obfuscation (reversed `data-e`, assembled on hover/focus/
  click). It's derivable from the name — accepted trade-off; a contact form was declined.
- The résumé PDF is redacted (no phone/email) and its LinkedIn/GitHub links are fixed.
  LaTeX source lives outside the repo (`~/Downloads/resume.tex`), also corrected.

## Updating & deploying
- Edit files here, then: `git add -A && git commit -m "…" && git push origin main`.
  GitHub Pages (repo `smit-hinsu.github.io`, source = `main` branch, root) rebuilds in ~1 min.
- When changing `styles.css` / `app.js`, bump the `?v=N` query on their `<link>`/`<script>`
  refs in `index.html` so browsers pick up the change immediately.
- **Do not delete** `google20aca2246a2b3a26.html` — it's the Google Search Console
  verification file and must stay at the repo root.
- Local preview: `python3 -m http.server 8000` from this directory.

## Content / roadmap ideas
- First blog post candidate: write up **ML Efficiency Principles** as a named methodology.
- Optionally surface the ML Systems Papers index (linked from About) inside the Reading tab.
- See `TODO.md` for the visual-polish task.
