# Kuzey Ozturac Portfolio

A responsive, CK3-inspired character record built with React, TypeScript, Vite, and Motion. Hosted at https://kuzeyozturac.github.io/portfolio/.

## Install, build, and preview

Requires Node.js 22.12+ (or 24+) and npm.

```bash
npm ci
npm run check
npm run build
npm run preview
```

Open http://localhost:4173/portfolio/. The preview serves the production build together with the existing portrait assets. `npm run dev` starts the Vite source server; create `app/assets` as a symlink to `../assets` for portrait assets in development, or use the production preview.

## Editing

- `app/main.tsx`: page composition and interactions.
- `app/data.ts`: projects, experience, skills, and awards.
- `app/styles.css`: responsive design tokens and layout.
- `app/components/`: shared selection marker and icon wrapper.
- `DESIGN.md`: design contract for future updates.
- `assets/`: original portrait/animation and retained legacy visual assets.
- `bundles/` and root `index.html`: generated production output. Do not edit directly.

`npm run build` recreates `bundles/` and root `index.html`. Commit the source and generated output together. GitHub Pages deploys the main branch at repository root; no server, credentials, or runtime build service is required.

## Interaction and accessibility

Project holdings open accessible dossiers with Escape dismissal, focus trapping, and focus restoration. Portfolio tabs support keyboard navigation. Skill selections mark related projects. Portrait animation has a pause control and becomes a still image with reduced motion enabled. Phone navigation is anchored to the bottom with safe-area spacing. Essential text wraps instead of clipping.

See `THIRD_PARTY_NOTICES.md` for source and license references.

## Browser regression checks

With the preview running, install the test browser once with `npx playwright install chromium`, then run `npm run test:browser`. The check covers eight responsive widths, uncut language labels, loaded portrait assets, all five project dialogs, Escape/focus restoration, portfolio tabs, and automated accessibility scans at 390px and 1440px. Set `TEST_URL` to verify the deployed site; optionally set `CHROMIUM_EXECUTABLE_PATH` for an existing test browser. Screenshots are written to `/tmp/portfolio-*-top.png` and `/tmp/portfolio-*-full.png`.
