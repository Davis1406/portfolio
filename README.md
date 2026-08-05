# Technical Precision Portfolio

Interactive React + Vite portfolio in the "Technical Precision" design language: Imperial Red
(`#E63946`) on warm whites, Sora / Hanken Grotesk / JetBrains Mono type, a fixed sidebar + header
shell, and technical "system" theming throughout.

## Pages

| Route   | View                                        |
| ------- | ------------------------------------------- |
| Home    | Hero, animated terminal, count-up metrics   |
| Projects| Bento grid, animated filters, screenshot lightbox |
| Skills  | Competence ring, radar chart, bars, stack, commit heatmap |
| Contact | Terminal-style form with copy + transmit simulation |

## Getting started

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Adding your real screenshots

Drop your project screenshots into `public/projects/` as `PNG`/`JPG`/`WebP` (landscape, ~1280px
wide works best), then edit `src/data/projects.js` and point each project's `screenshot` field to
your file, e.g.:

```js
screenshot: '/projects/my-dashboard.png',
```

The bundled SVGs in `public/projects/` are placeholders only. Add/remove projects, change the
counters in `src/data/profile.js`, skills in `src/data/skills.js`, and your email/socials in
`src/data/profile.js`.

## Free deployment (no domain/hosting cost)

The build output in `dist/` is a fully static site — deploy anywhere for free:

- **Netlify** → `app.netlify.com`, drag-and-drop the `dist/` folder. You get `yourname.netlify.app`.
  Re-deploy on push by connecting the Git repo.
- **Vercel** → `vercel.com`, import the repo. It auto-detects Vite. You get `yourname.vercel.app`.
- **GitHub Pages** → push to a repo, enable Pages, set the build command to `npm run build` and
  output to `dist` (use the `gh-pages` branch or a workflow). You get `username.github.io`.
- **Cloudflare Pages** → `dash.cloudflare.com`, import repo, build command `npm run build`, output
  `dist`. You get `yourname.pages.dev`.

**Free custom subdomain (since Freenom-era free TLDs are gone):**
- `is-a.dev` (via GitHub, give a repo) → `yourname.is-a.dev` pointing at your host.
- `js.org` → `yourname.js.org` for open-source-friendly portfolios.

No credit card required on any of the above.
