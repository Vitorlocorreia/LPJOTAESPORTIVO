---
version: alpha
name: ATLAS BRUT
description: A cinematic, brutalist field guide to concrete monuments featuring heavy weighted scrolling, archival aesthetics, and monochromatic visual language with a signature survey-marker accent.
colors:
  ink: "#0C0D0F"
  bone: "#E7E3DA"
  accent: "#FF4A1F"
  dim: "rgba(231, 227, 218, 0.5)"
  hairline: "rgba(231, 227, 218, 0.14)"
typography:
  display: "Archivo, weight 900, uppercase"
  body: "Archivo, weight 400-500"
  data: "Space Mono, weight 400-700"
spacing:
  pad: "clamp(1.25rem, 4vw, 3.5rem)"
  header: "4.25rem"
rounded:
  pill: "999px"
  dot: "50%"
components:
  wordmark: "{typography.display}, size 0.95rem, with {colors.accent} crosshair icon"
  button: "{typography.data}, uppercase, 1px border on hover via SVG draw effect"
  label: "{typography.data}, uppercase, {colors.dim}, tracking 0.3em"
---

## Overview
ATLAS BRUT is an expeditionary and archival experience designed to evoke the scale and permanence of 20th-century concrete architecture. The visual personality is stark and monumental, utilizing high-contrast typography and a restricted palette (Ink/Bone/Survey Orange). The interface acts as a surveying instrument, featuring a global film-grain overlay, live coordinate readouts, and a weighted, high-inertia scrolling rhythm driven by Lenis and GSAP.

## Colors
- **Primary Surface**: `{colors.ink}` (Deep archival black).
- **Primary Text**: `{colors.bone}` (Off-white, reminiscent of sun-bleached concrete).
- **Accent**: `{colors.accent}` (High-visibility surveyor's orange for highlights and coordinates).
- **Structural**: `{colors.hairline}` for thin, technical borders and grid lines.
- **Depth**: Grayscale backgrounds with desaturated photography that blooms to color upon interaction.

## Typography
- **Headers**: Archivo 900, often ultra-condensed or oversized (up to 19rem), always uppercase.
- **Technical Data**: Space Mono (0.58rem - 0.8rem) for coordinates, field clocks, and metadata.
- **Body Prose**: Archivo, weight 400, size 0.95rem, leading 1.6 for readability within the archival tone.

## Layout
- **Grid**: A strict technical layout with wide horizontal padding (`{spacing.pad}`). Sections use large vertical gaps (`clamp(6rem, 16vh, 12rem)`).
- **Rail**: A fixed-position "Meridian Rail" on the left edge tracking vertical scroll progress as latitude degrees.
- **Density**: High-density data areas (the Ledger) contrast with low-density cinematic moments (Chapter dolly-zooms).

## Elevation & Depth
- **Surface Layering**: Stacking cards in the Dispatches section use a CSS-driven scale depth (91% to 100%).
- **Grain**: A global SVG noise filter (`#grain`) sits at `z-index: 90` to unify digital and filmic textures.
- **3D**: The Volume section features a book model with 3D rotation (`rotateY(-26deg)`) and CSS `preserve-3d`.

## Shapes
- **Geometrics**: Square corners are standard for all containers and borders.
- **Symbols**: Circles used exclusively for tracking dots, crosshairs, and survey waypoints.
- **Crosshair**: A custom vertical/horizontal line intersect for cursors and icons.

## Components
- **Cursor**: A custom crosshair cursor with live coordinate readouts tracking the mouse position.
- **Meridian Rail**: A vertical instrument with a scaling line and sliding dot tracking page progress.
- **Specimen Plate**: A dossier-style image viewer with four corner-brackets and decoding text labels.
- **Odometer**: A rolling digit counter for stock levels using vertical translateY strips.
- **CTA Button**: A large-format button featuring a rectangle SVG border that "draws" its stroke on hover.

## Page Sections
### Loader
- **Composition**: Two vertical black halves that split horizontally.
- **Content**: A central decoding console with scrambling Archivo text and ticking Space Mono coordinates.
- **Interaction**: On completion, the curtains exit to reveal the Hero with a rack-focus animation.

### Hero
- **Composition**: Bottom-aligned large-scale typography.
- **Typography**: Clamped font sizes (up to 19rem) with 0.82 line-height.
- **Interaction**: Titles start blurred and oversized, snapping into focus as the page loads.

### Chapter Sections
- **Composition**: A viewport-filling "stage" with a centered masked image.
- **Animation**: The "Dolly Zoom" — a pinned scroll moment where the image mask scales up from 32% to 100% while the image inside counter-scales to maintain perceived size.
- **Visuals**: Photography starts desaturated and becomes full-color as the frame opens.

### The Route
- **Composition**: A technical map grid (graticule) with SVG line paths.
- **Interaction**: A survey pen follows a path that draws itself based on scroll progress. Waypoints ping and pulse once the line reaches them.

### The Ledger
- **Composition**: A two-column grid. Left side contains an interactive list of rows; right side features a sticky dossier specimen plate.
- **Interaction**: Hovering a row translates the text right, highlights it in `{colors.accent}`, and swaps the specimen image with a top-to-bottom wipe.

### The Volume
- **Composition**: Split screen with a 3D book model on the left and a technical specification list on the right.
- **Interaction**: The book tilts on the X/Y axes while an odometer digit counter rolls the "Copies Remaining" figure.

### Footer
- **Composition**: A dense grid containing a lead capture form, coordinate metadata, and an oversized brand mark (`19vw`).
- **Form**: Minimalist input field with a border-bottom that changes color on error.

## Motion & Interaction
- **Transition Personality**: `expo.out` (0.9s to 1.5s) for all major movements.
- **Scroll Behavior**: Lenis smooth-scrolling with a 0.09 lerp for a "heavy" cinematic feel.
- **Text Effects**: Character scrambling/decoding on labels; word-by-word rack-focus (blur to sharp) on scroll-triggered prose.
- **Hover States**: 1px SVG path border-draws; text translations; color blooming on desaturated images.

## Do's and Don'ts
- **Do**: Use `{colors.accent}` only for specific data points and functional indicators.
- **Do**: Maintain strict uppercase for display and mono text.
- **Don't**: Use rounded corners on containers or images.
- **Don't**: Use standard scrollbars; ensure the custom meridian rail is the primary visual progress indicator.

## Accessibility
- **Reduced Motion**: All pins, 3D rotations, and line-draw animations are disabled via `prefers-reduced-motion` media queries.
- **Focus**: Visible focus states using 2px `{colors.accent}` outlines with 4px offset.
- **ARIA**: Detailed use of `aria-hidden` for decorative grain/rail and `aria-live` for form notifications.

## Assets
1. embed: https://fonts.googleapis.com
2. embed: https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&amp;family=Space+Mono:wght@400;700&amp;display=swap
3. other: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js
4. other: https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js
5. other: https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js
6. other: https://cdn.tailwindcss.com
7. other: https://images.unsplash.com/photo-1672191189482-012f0157b3d9?w=3840&amp;q=80
8. other: https://images.unsplash.com/photo-1701455103645-705f6ab68ed8?w=3840&amp;q=80
9. other: https://images.unsplash.com/photo-1630007808426-7be055a4e7e1?w=3840&amp;q=80
10. other: https://images.unsplash.com/photo-1527576539890-dfa815648363?q=80&amp;w=1200&amp;auto=format&amp;fit=crop
11. other: https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
12. other: https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
13. other: https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
14. other: https://images.unsplash.com/photo-1439337153520-7082a56a81f4?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
15. other: https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
16. other: https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&amp;w=900&amp;auto=format&amp;fit=crop&amp;sat=-100
17. other: https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&amp;w=1200&amp;auto=format&amp;fit=crop&amp;sat=-100
18. other: https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&amp;w=1200&amp;auto=format&amp;fit=crop&amp;sat=-100
19. other: https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&amp;w=1200&amp;auto=format&amp;fit=crop&amp;sat=-100
20. other: %23n
21. other: anchor.href, document.baseURI
22. other: document.baseURI
23. other: http://www.w3.org/2000/svg
24. other: https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&amp;w=1200&amp;auto=format&amp;fit=crop
25. other: https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&amp;w=1200&amp;auto=format&amp;fit=crop
26. other: https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200
27. other: https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1200
28. other: https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200
29. other: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200

### Exported Codebase Asset Inventory
1. other: https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&amp;w=1200&amp;auto=format&amp;fit=crop
   Context: index.html: absolute url literal
2. other: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&amp;w=1200&amp;auto=format&amp;fit=crop
   Context: index.html: absolute url literal
