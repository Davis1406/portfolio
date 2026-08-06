# Davis Hyacinth Portfolio — Handoff Notes (work in Claude)

Repo: `/Users/davishyacinth/portfolio` · git `main` · origin `git@github.com:Davis1406/davis-hyacinth-portfolio.git` · hosted at https://davishyacinth.vercel.app

Everything below is committed and deployed live — this doc is context so Claude can continue from here.

## 1. Quickstart
- Install/build/lint: `npm install` → `npm run lint` (oxlint) → `npm run build` (Vite)
- Dev server: `npm run dev` (launch config: `.claude/launch.json` → `portfolio-dev`)
- Deploy: `vercel --prod` (Vercel CLI, project `davis-hyacinth/portfolio`, alias `davishyacinth.vercel.app`)
- Moved from Netlify (free tier expired) → Vercel.
- GitHub auto-deploy pending: connect repo at vercel.com/davis-hyacinth/portfolio/settings/git
  (Vercel GitHub App needs repo access grant from GitHub side)

## 2. ByteAlgo brand (DONE)
- Concept: the "A" is an algorithm node-network — two base nodes (data in) feed a central node, apex node = glowing output; rings suggest a graph/metric space.
- Files: `/Users/davishyacinth/bytealgo-brand/` (`bytealgo-logo.svg/.png`, `bytealgo-mark.svg/.png`).
- Colors: bg gradient `#a40f28`→`#e63946`; A-lines white→`#ffb3b1`; apex/glow `#ffd166` (yellow); node fill `#8f0f24`; white node rings.
- In app: `src/components/ByteAlgoLogo.jsx` (inline SVG, `useId` for gradient/filter ids; used in `Sidebar.jsx` size 44 and `Footer.jsx` + "BYTEALGO" wordmark), `public/favicon.svg`.
- Domain: `bytealgo.com` is TAKEN (parked at IONOS SE, no working site); `bytealgo.io` / `.dev` / `.co` free. No company named ByteAlgo found.

## 3. Project screenshots (DONE)
- 20 SVG mockups in `public/projects/*.svg` (1280x800, sanitized). HOCA Africa uses real PNG: `public/projects/hoca-africa.png` (captured via Chrome headless from hoca-africa.org).
- Project data: `src/data/projects.js`; cards: `src/views/Projects.jsx` (full-bleed dark-vignette cards, lightbox modal).

## 4. Remaining / optional follow-ups
- GitHub auto-deploy: grant Vercel GitHub App access at vercel.com/davis-hyacinth/portfolio/settings/git
- `bytealgo.com` ownership/contact is unresolved (parked page).

## 5. Project id list (21)
cosecsa · cosecsa-api(priv) · research-cosecsa · canecsa-events · ecsaconm-events · ecsaconm-admission · cosecsa-voting-system(priv) · online-voting-system(priv) · cosecsa-examiner-app(priv) · logbook · pocketbudgeting · movies-note · redstore-template · land-info-system · hoca-africa · cosecsa-mis · ims(priv) · afyatechtz · daref · tanin · cars-app
