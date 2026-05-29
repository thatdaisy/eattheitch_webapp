---
name: project-overview
description: Eat the Itch – crafting community webapp stack, structure, and Ravelry API integration
metadata:
  type: project
---

Vue 3 + Vite project under `Project/` subdirectory. The actual app lives in `Project/src/`.

**Why:** FH student project (CSDC 2nd semester) — a crafting community where users can rate wool, trade yarn, share patterns, and find events.

**Stack:** Vue 3 (Composition API, `<script setup>`), Vite 8, vue-router 4. No Pinia yet. Axios is in root node_modules but not used in app — service layer uses native `fetch`.

**Key files:**
- `Project/src/App.vue` — shell with dark green header, NavBar, `<RouterView>`
- `Project/src/route/index.js` — routes: `/community` (home), `/brands`, `/profile`
- `Project/src/views/CommunityView.vue` — homepage matching design (Trade / Pattern / Events sections)
- `Project/src/services/ravelryServices.js` — Ravelry API with mock fallback; needs `VITE_RAVELRY_USER` + `VITE_RAVELRY_KEY` in `.env`
- `Project/.env.example` — documents required env vars

**Ravelry API:** Basic Auth, `https://api.ravelry.com`. Get free key pair at ravelry.com/pro/developer. Falls back to mock data when credentials are absent.

**Design colors:** header `#3b5220`, orange `#c4622a`, trade cards teal `#6daeaa`, pattern cards rust `#b95a27`, events cards tan `#d3c8b0`, page bg `#f0ebe0`.

**How to apply:** When adding features, follow the existing mock → real API pattern. Trade and Events have no Ravelry endpoint — they are app-specific and will need a backend.
