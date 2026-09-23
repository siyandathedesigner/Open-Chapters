# Open Chapter — V4 Plain Front End

This version deliberately returns to the V2 visual direction and removes React, Vite, Framer Motion, Lucide and other UI/animation frameworks.

## Run it

No npm install is required.

### Simplest
Open `index.html` in a modern browser.

### Recommended in VS Code
Install the Live Server extension, open this folder, right-click `index.html`, and choose **Open with Live Server**.

## Architecture
- `index.html` — semantic page structure and real readable content.
- `css/main.css` — authored visual system, layout, cabinet, report, responsive behaviour and motion.
- `css/design-primitives.css` — dependency-free reusable production primitives.
- `css/composition-system.css` — image composition and proportional placement primitives.
- `js/app.js` — navigation, reveal states, lesson interaction, score, progress, page content and pointer response.
- `js/primitives.js` — dependency-free animation/math primitives for extending the system.
- `assets/` — approved logo plus high-detail visual artwork used where CSS would reduce fidelity.

## Design decision
The page does not attempt to redraw sophisticated illustrated artwork in CSS. CSS builds the interface and cabinet materials; rendered imagery carries the high-detail art. Animation is deliberately limited to interface state, illumination, small object movement, image pans and interaction feedback so that static artwork does not look artificially distorted.

## Source target
`assets/reference-target.png` is included as the visual composition target for comparison.

## V7.1 homepage product showcase
The interactive lesson is now the central homepage product event. It retains live page, progress, score and stage controls while the standalone lesson page remains the full experience.

## V7.2 cohesion / energy pass
- Added sticky on-page chapter navigation with scroll-spy and smooth section navigation.
- Preserved the V7.1 star-product lesson and standalone lesson page.
- Added controlled section overlap, asymmetric art placement, scale contrast and restrained continuous motion.
- No new content architecture or generic sections were introduced.

## V7.3 pacing pass
- Replaced the sticky/static on-page chapter rail with an embedded horizontal narrative thread.
- The thread is clickable and context-aware but reads as composition before navigation.
- Reduced V7.2 decorative collision, tilt, shadow and overlap by roughly 20%.
- Added deliberate quiet beats between the lesson, programmes and parent/progress content.
- Continuous ambient motion is reserved for the hero and star-product lesson; secondary sections react rather than constantly move.


## V7.4 85% energy balance
- Kept V7.3's implicit horizontal narrative navigation and quiet pacing beats unchanged.
- Recovered roughly one quarter of the visual energy removed between V7.2 and V7.3, placing the homepage at approximately 85% of V7.2's collision/depth level.
- Increased selected overlap, tilt, edge scale, cabinet presence and depth only at visual peaks; continuous motion remains concentrated in hero and lesson.
- No information architecture or content changes.

## V7.5 — 95% spatial energy
This pass changes the *spatial tension* of the homepage, not its information architecture. It restores most of V7.2's overlap, scale, angularity, edge tension and cabinet depth while retaining V7.3's quiet beats, implicit horizontal narrative thread and selective motion hierarchy. In other words: more visual tension, not more content and not more constant animation.

## V7.6 homepage lesson rebalance
V7.6 deliberately freezes the V7.5 site-wide spatial tension and energy. The only material visual change is the homepage lesson showcase: it is narrower, shorter, surrounded by more white breathing room, and uses a quieter dark transition/aura. The full lesson page is unchanged. This keeps the lesson as the star product without allowing its contrast, scale and motion to dominate the entire homepage.

## V7.7 — V7.2 composition restored
V7.7 keeps the current implicit horizontal narrative navigation, pacing, and V7.6 homepage lesson rebalance. The rest of the homepage restores V7.2's spatial composition: overlap, scale contrast, asymmetry, edge tension, and stronger section collisions. The standalone lesson.html is unchanged from V7.6.
