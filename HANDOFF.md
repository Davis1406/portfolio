# Davis Hyacinth Portfolio — Handoff Notes (work in Claude)

Repo: `/Users/davishyacinth/projects` · git `main` · origin `git@github.com:Davis1406/davis-hyacinth-portfolio.git` · hosted at https://davishyacinth.vercel.app

Everything below is committed and deployed live — this doc is context so Claude can continue from here.

## 1. Quickstart
- Install/build/lint: `npm install` → `npm run lint` (oxlint) → `npm run build` (Vite)
- Dev server: `npm run dev` (launch config: `.claude/launch.json` → `portfolio-dev`)
- Deploy: `vercel --prod` (Vercel CLI, project `davis-hyacinth/davishyacinth`)
- Moved from Netlify (free tier expired) → Vercel. GitHub auto-deploy pending: connect repo at vercel.com/davis-hyacinth/davishyacinth/settings/git

## 2. ByteAlgo brand (DONE)
- Concept: the "A" is an algorithm node-network — two base nodes (data in) feed a central node, apex node = glowing output; rings suggest a graph/metric space.
- Files: `/Users/davishyacinth/bytealgo-brand/` (`bytealgo-logo.svg/.png`, `bytealgo-mark.svg/.png`).
- Colors: bg gradient `#a40f28`→`#e63946`; A-lines white→`#ffb3b1`; apex/glow `#ffd166` (yellow); node fill `#8f0f24`; white node rings.
- In app: `src/components/ByteAlgoLogo.jsx` (inline SVG, `useId` for gradient/filter ids; used in `Sidebar.jsx` size 44 and `Footer.jsx` + "BYTEALGO" wordmark), `public/favicon.svg`.
- Domain: `bytealgo.com` is TAKEN (parked at IONOS SE, no working site); `bytealgo.io` / `.dev` / `.co` free. No company named ByteAlgo found.

## 3. Project screenshots (DONE)
- All 21 `public/projects/*.svg` were regenerated as sanitized 1280x800 mockups (design language mirrors DESIGN.md: red `#E63946`, deep red `#B7102A`, ink `#191c1d`, muted `#8f6f6e`, white cards, `#e4bebc` borders, JetBrains Mono + Sora).
- Anatomy: browser topbar (`{id}.example` URL), white sidebar, title block + badge, kind-specific body, footer "SANITIZED DEMO · ALL DATA IS PLACEHOLDER".
- Kinds: 13 dashboard (4 red KPI cards + trend line chart + bar chart + records table), 1 api (endpoint list + dark JSON panel), 5 website (hero + 3 cards), 2 mobile (feature panels + phone frame).
- Badges: 5 private projects get dark "CONFIDENTIAL · DEMO DATA": `cosecsa-api`, `cosecsa-voting-system`, `online-voting-system`, `cosecsa-examiner-app`, `ims`. Others get pill "SANITIZED DEMO".
- Generator: `/var/folders/hs/894l1ff91zb6266ltttpdlg80000gn/T/opencode/gen_projects.py` (self-validates XML; may still exist — if missing, regenerate or hand-edit SVGs).
- Project data lives in `src/data/projects.js` (screenshot field = `/projects/{id}.svg`); cards render it in `src/views/Projects.jsx`.

## 4. Remaining / optional follow-ups
- **HOCA Africa real screenshot**: user has an image of the real hoca-africa.org site (this model can't read images, so it's queued for Claude). Rebuild `public/projects/hoca-africa.svg` using the real logo/brand colors, keep 1280x800 + SANITIZED DEMO footer, validate XML, rebuild + redeploy.
- Unpushed: commit `2bcaf49` is local only — `git push` still pending.
- `bytealgo.com` ownership/contact is unresolved (parked page).

## 5. Project id list (21)
cosecsa · cosecsa-api(priv) · research-cosecsa · canecsa-events · ecsaconm-events · ecsaconm-admission · cosecsa-voting-system(priv) · online-voting-system(priv) · cosecsa-examiner-app(priv) · logbook · pocketbudgeting · movies-note · redstore-template · land-info-system · hoca-africa · cosecsa-mis · ims(priv) · afyatechtz · daref · tanin · cars-app
