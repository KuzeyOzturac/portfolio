# Design

Source of truth for future portfolio changes. Read before editing the interface.

## Aesthetic direction

A CK3-inspired character record: stone-hall portrait, framed holdings, brass detailing, dark olive surfaces, ceremonial headings, and readable prose. Preserve Kuzey’s identity, suit, verified experience, and all five project links.

## Dials

- Design variance: 7/10
- Motion intensity: 6/10 for intentional interactions, 2/10 for ambience
- Visual density: 5/10

## Typography

- Display and small labels: Cinzel 400/500/600.
- Body and italic accents: EB Garamond 400/500 and 400 italic.
- Fonts are bundled locally from Fontsource. No third-party font request at runtime.
- Body paragraphs: 17–19px, line-height 1.5–1.65, maximum 65ch.
- Small decorative record numbers can be smaller; never use them for essential content.

## Tokens

- Background: #111613; panel: #1b211c; elevated panel: #242a22.
- Text: #efe9d9; secondary: #b7b7a4; muted: #9b9e8b.
- Brass: #d1b77b; light brass: #e7d7ad.
- Borders: #4e503a and #333b30.
- Secondary shield materials: desaturated blue, green, and oxblood. Use sparingly.
- Shadows: tinted dark green; subtle inset highlights. Sharp panel corners.

## Motion

- Motion for React; spring stiffness 160, damping 25.
- Selection marker: stiffness 380, damping 36.
- Panel changes: 180ms opacity/translation; reveals have only short stagger.
- Project dossiers use shared layout identity; use Radix Dialog for keyboard handling, focus restoration, and scroll isolation.
- MotionConfig reducedMotion="user". Reduced motion shows static portrait and suppresses CSS transitions.
- Portrait video is muted with an explicit pause/play control; no audio.
- No scroll interception, custom cursor, moving text, bounce, or compulsory intro.

## Layout

- Desktop: fixed 80px rail, split portrait/record, four traits, two-column holdings.
- Tablet: 66px rail, two traits, stacked education and languages as necessary.
- Phone <=640px: bottom navigation with safe-area clearance, portrait first, single-column hero/projects, wrapping language rows, two traits (one at <=360px).
- All interactive elements need visible keyboard focus and at least 44px touch height.
- Dialogs fit the dynamic viewport and scroll internally. Test 320, 375, 390, 640, 768, 1024, 1440, and 1920px widths.

## Component inventory

- Custom portrait frame and nameplate, education/languages records, traits, project workflow sketches, chronicle, awards, correspondence seal.
- Motion Primitives Animated Background pattern, discovered through 21st.dev, adapted as AnimatedSelection.
- Radix Tabs and Dialog. Lucide interface icons; Phosphor GitHub/LinkedIn marks.
- UI UX Pro Max guidance used for accessibility, responsive layouts, and tactile materials; generic palette/type suggestions were rejected in favor of the established CK3 direction.

## Content rules

- Preserve verified results: ASL 85.27% across 27 classes, seven pharmacy reports, 100 simulated GA generations.
- Project visuals are labeled system sketches, not screenshots or live demonstrations.
- No invented proficiency ratings, employers, case-study results, testimonials, or game-world biography.

## Last updated

2026-10-16 — Responsive motion redesign with character overview and expanded project dossiers.
