---
name: "Jerven Portfolio — Mission Grid 199X"
description: "The Route Dominant Playful identity: a polished cartridge-era developer campaign built around shipped systems."
colors:
  command-navy: "#142c47"
  command-navy-soft: "#1b4260"
  briefing-sand: "#ead5ac"
  briefing-paper: "#f6e8c8"
  signal-ivory: "#fff4dc"
  route-orange: "#f0542b"
  route-orange-dark: "#b9341d"
  branch-teal: "#258d8b"
  loadout-teal: "#1c5c69"
  utility-white: "#ffffff"
typography:
  display:
    fontFamily: "Jersey 15, ui-monospace, monospace"
    fontSize: "clamp(4rem, 10vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.77
    letterSpacing: "0.015em"
  hero:
    fontFamily: "Madimi One, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.75vw, 4.55rem)"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Jersey 15, ui-monospace, monospace"
    fontSize: "clamp(2.3rem, 5vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.015em"
  narrative-title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.04rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Jersey 15, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  square: "0"
  control: "2px"
  marker: "3px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section-mobile: "5rem"
components:
  mission-command-primary:
    backgroundColor: "{colors.route-orange}"
    textColor: "{colors.utility-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
    height: "3rem"
  mission-command-secondary:
    backgroundColor: "{colors.signal-ivory}"
    textColor: "{colors.command-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
    height: "3rem"
  mission-marker:
    backgroundColor: "{colors.route-orange}"
    textColor: "{colors.signal-ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.marker}"
    padding: "0.3rem 0.7rem"
    height: "2.5rem"
  mission-project-brief:
    backgroundColor: "{colors.briefing-paper}"
    textColor: "{colors.command-navy}"
    rounded: "{rounded.square}"
    padding: "2rem"
  mission-hud:
    backgroundColor: "{colors.command-navy}"
    textColor: "{colors.signal-ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.65rem 0.8rem"
---

# Design System: Jerven Portfolio — Mission Grid 199X

## Overview

**Creative North Star: "Mission Grid 199X"**

The Playful identity is a polished retro developer action game expressed as a recruiter-ready portfolio. An overhead campaign route turns each shipped system into an objective: the safety-orange path supplies the first viewport's dominant move, factual project evidence opens as a briefing dossier, and an original engineer token gives the world character without borrowing game IP. It should feel specific, tactile, and exact—not like a skin applied to a conventional portfolio.

The strongest spectacle belongs to the hero and project proof. Below them, the same world becomes quieter and more editorially useful: briefing paper, route spines, objective markers, fixed information cells, and compact HUD elements carry the grammar while Bricolage Grotesque keeps explanations easy to scan. Interaction is optional enhancement; navigation, links, email, and CV download remain ordinary controls.

Mission Grid is only the Playful world. It is activated by `html[data-playful="on"]` and rendered through the Mission Grid hero/campaign subtree. Crafted mode remains the default, separate identity and must retain its own warm off-white/vermilion palette, typography, navbar, project sequence, and footer. Shared factual content and destinations may cross the boundary; Mission Grid styling may not.

**Key Characteristics:**

- Route-dominant overhead campaign map with a visible project dossier at the lower edge.
- Flat navy, sand, paper, orange, teal, and ivory fields with pixel plates and printed texture.
- Jersey 15 for game UI, Madimi One for the map headline, and Bricolage Grotesque for readable body copy.
- Square controls, doubled keylines, dashed rules, diamond nodes, and solid offset depth.
- Factual shipped-work proof inside a playful world; generated interface plates are always identified as illustrative.
- Fully optional motion and sound, with keyboard, touch, reduced-motion, and mute behavior treated as first-class states.

## Colors

The palette behaves like a printed cartridge-era campaign kit: navy establishes command and contrast, sand and paper carry evidence, orange marks the primary route and action, and teal identifies secondary branches or section shifts.

### Primary

- **Safety Route Orange:** The dominant route, primary commands, objective stamps, timeline spines, and active navigation signal. Pair ordinary-size white or ivory text with the darker orange outline; use orange alone against sand only for large marks and fills.
- **Route Orange Dark:** Structural outline and high-contrast text companion to the brighter orange, never a second competing accent.

### Secondary

- **Branch Teal:** Secondary objectives and alternate routes; it must remain visibly subordinate to the orange route.
- **Loadout Teal:** A deeper field reserved for the Skills/loadout section so the campaign can change terrain without leaving its palette.

### Neutral

- **Command Navy:** Main ink, command rails, dark project terrain, footer, focus-ring backing, and the stable visual anchor across the Playful experience.
- **Command Navy Soft:** Long-form text on paper when pure navy would feel too hard; never use it where full contrast or command priority is required.
- **Briefing Sand:** Base campaign terrain and connective background.
- **Briefing Paper:** Dossiers, profile evidence, career history, and other document-like surfaces; normally paired with the paper texture plate.
- **Signal Ivory:** Text on dark terrain, secondary command fills, borders, and high-visibility UI keylines.
- **Utility White:** Reserved for the highest-contrast text on orange actions and true white requirements; it is not a page surface.

### Named Rules

**The Orange Route Rule.** Safety orange owns the primary path and primary action; teal may branch from it but never compete with it.

**The Flat-Ink Rule.** Use solid color fields. CSS gradients are allowed only as hard-edged construction devices for grids, stripes, or dashed rules—never as blended atmosphere, gradient text, glow, or an AI-style color wash.

**The Contrast Is Evidence Rule.** Preserve WCAG 2.2 AA for text and controls. Orange is a fill and large-mark color; ordinary body copy stays navy on sand/paper or ivory on navy/teal.

## Typography

**Display Font:** Jersey 15 (with ui-monospace and monospace fallback)

**Hero Font:** Madimi One (with system-ui and sans-serif fallback)

**Body Font:** Bricolage Grotesque (with system-ui and sans-serif fallback)

**Character:** The two display faces provide cartridge-era personality without turning technical content into a terminal costume. Bricolage Grotesque carries every paragraph and dense proof block, keeping the game world professional and readable.

### Hierarchy

- **Display** (400, fluid up to oversized end-state scale, 0.77 line-height): Final campaign calls and the largest dramatic all-caps statements.
- **Hero** (400, tightly stacked, 0.84 line-height): The mixed-case “I build entire systems. Alone.” map briefing, printed directly into the terrain clearing.
- **Headline** (400, condensed fluid scale, 0.88 line-height): Mission and section names, usually uppercase, paired with a marker and dashed rule.
- **Narrative Title** (800, compact leading, negative tracking): Human-language claims inside project, profile, and build-log content.
- **Body** (400, 1.65 line-height): Project descriptions and explanatory copy, generally capped around 58–68 characters where the layout supports it.
- **Label** (400, tracked and uppercase): Navigation, mission markers, metadata, HUD state, dates, and compact actions.

### Named Rules

**The Pixel UI, Human Body Rule.** Jersey 15 may label and announce; it must not carry long paragraphs. All explanatory content remains Bricolage Grotesque at an ordinary reading size.

**The No Terminal Costume Rule.** Monospaced fallbacks are resilience only. Do not introduce green-on-black, command prompts, code rain, or monospace body copy to make the work feel technical.

## Layout

The desktop hero is a 3:2 campaign board derived from the approved 1536 × 1024 comp. A slim command rail occupies the top 5.18%, the full-bleed map occupies the next 66.02%, and the first project dossier opens across the final 28.8%. The dominant route moves from the lower-left contact post toward DATABASY / SSU at upper-right, with the CRM branch quieter and secondary. Preserve that reading order even when plate crops evolve.

Campaign sections use a centered 1200px content measure with fluid side gutters and vertical padding that grows from roughly 5.5rem to 9rem. Each section begins with a 5px command rule. Evidence layouts use asymmetric two-column grids; route lists use a visible spine plus fixed identity, description, and technology/action cells rather than generic card grids.

At 980px, multi-column campaign layouts stack, route items become two-column, and AI build logs become a single vertical list. At 900px, the hero stops behaving as a fixed board: the rail and map flow in normal document order, the map becomes 660px tall, the terrain uses an intentional oversized crop, the dossier becomes a stacked section, the full nav/role label and secondary CRM map marker disappear, and primary actions retain at least 3rem height. At 680px, section padding becomes 5rem × 1.25rem, headings and timelines simplify, the route description spans the width beneath its node/title, and the persistent HUD moves to the bottom-right with icon-only sound control. Mobile and desktop must remain free of horizontal overflow.

**The Route Before Cards Rule.** Project navigation is a path with nodes, not a centered card gallery. If a new project cannot fit the route grammar, use a dossier or fixed mission row before reaching for a conventional card.

**The Loud-to-Quiet Rule.** Hero and primary project proof carry the full map spectacle; later sections inherit the geometry, materials, and markers without repeating the entire map.

## Elevation & Depth

Depth is structural. Controls and markers use crisp offset shadows, doubled keylines, and small press displacement. Paper dossiers use modest brown/navy cast shadows and literal tape pieces; pixel assets use small drop shadows that read as physical tokens. There are no diffuse colored glows, glass panels, floating blurred orbs, or ambient gradient haze.

### Shadow Vocabulary

- **Command Rail:** A short navy cast shadow beneath the top rail separates UI chrome from the map.
- **Objective Marker:** A doubled 2px outer keyline plus a compact 4px cast shadow makes labels feel printed and mounted.
- **Command Button:** A 3–4px solid navy offset supplies a physical press state; active controls reduce that offset as they move.
- **Dossier Lift:** A restrained upward shadow separates briefing paper from the map without making it float.
- **Evidence Plate:** A soft neutral cast shadow is permitted on taped screenshots and the player portrait because the material itself is physical.

### Named Rules

**The Solid Depth Rule.** Use borders, offsets, tape, overlap, and physical plate shadows. Never substitute glow or translucent glass for construction.

**The Flat-at-Rest Rule.** Most campaign sections remain planar. Stronger depth appears only on controls, movable tokens, taped evidence, and the hero dossier edge.

## Shapes

The world is predominantly square: controls use 2px corners, objective labels use 3px corners, section surfaces use no radius, and paper frames are built from borders rather than rounded containers. Route nodes and timeline points use rotated squares to form diamonds. Thick borders, doubled keylines, dashed dividers, compact tape rectangles, and clipped pointer tails provide the recurring silhouettes.

Circular geometry is reserved for route targets, compass construction, and icon-scale indicators. Pill shapes and large soft radii belong to Crafted mode and must not migrate into Mission Grid controls.

**The Punched-Tile Rule.** Every decorative shape should read as a printed rule, punched marker, mounted label, taped plate, or route part—not an abstract blob.

## Components

### Command Rail and Navigation

The desktop rail is a slim command strip: ivory Jersey 15 identity and labels on navy, a single orange underline for hover/active state, and a compact sound meter at the far right. The brand control returns to Crafted mode and therefore requires a clear accessible label. Below 900px, keep only the brand and sound control; the omitted navigation must remain available through the document's ordinary anchors and content flow.

### Mission Commands

- **Shape:** Near-square control with a 2px border and solid offset shadow.
- **Primary:** Orange fill, white text, ivory inner border, darker-orange outer keyline; reserve it for Start Mission and equivalent campaign-advancing actions.
- **Secondary:** Ivory fill, navy text, navy-tinted border, and a shorter navy offset.
- **Hover / Active:** Shift horizontally or lift by a few pixels on hover; active state presses down and reduces the offset. Focus uses a 3px ivory outline backed by a 6px navy ring.
- **Touch:** Retain a 3rem minimum hit height and never require the route animation to reach content.

### Mission Markers and Status

Objective labels are compact Jersey 15 tiles with ivory borders and doubled outer keylines. Orange indicates the primary objective; teal indicates a secondary branch; navy identifies the contact post. Status text must be factual—“Live system” is appropriate only for a verified live destination, and invented progress or performance metrics are prohibited.

### Project Dossiers and Evidence Plates

Project proof sits on briefing paper or within a taped evidence plate. Interface artwork uses square borders, `object-fit` chosen for the intended crop, and pixelated rendering. Every generated interface depiction must carry visible “Illustrative interface” wording in or immediately adjacent to the figure, plus accurate alt text. Real project names, roles, descriptions, technology, destinations, and availability states remain factual and unchanged.

The shipping plate set is `assets/plates/campaign-map.png`, `engineer-token.png`, `project-paper.png`, `databasy-interface.png`, and `crm-interface.png`. The map may bleed and crop as terrain; the engineer remains a contained original, friendly, weapon-free character; paper is a repeated/covered texture; interface plates are illustrative rather than evidence of a literal screen. Preserve pixel rendering and the deliberate mobile terrain crop instead of responsively shrinking every plate to fit.

### Project Section Grammar

Every main project/campaign section begins with a top command rule and a heading group: objective marker, Jersey mission title, optional Bricolage description, and a dashed line that absorbs remaining width. Alternate terrain by purpose:

- Paper for focused evidence, profile, and career history.
- Navy for the client mission route and campaign end-state.
- Deep teal for the skills/loadout rack.
- Orange for the AI-assisted build station, with navy type and rules.

Client projects use a continuous orange route spine and diamond letter nodes. DATABASY / SSU and DataBasy CRM receive the strongest featured evidence; later clients use scannable mission rows, not decorative mockups or fake dashboards. The page's sequence remains taste and real systems first, speed/AI assistance later, and contact as the closing action.

### Persistent HUD

The HUD appears only after the visitor has moved beyond roughly 72% of the viewport. It provides campaign state and the persistent sound control without covering content. On compact screens it moves to the bottom-right and collapses to the sound icon. Hidden state removes pointer and keyboard access; visible state restores both.

### Interaction, Motion, and Sound

Use the shared quart/quint/expo easing family for continuous transitions and stepped timing for physical game controls. The map headline reveals once, the engineer idles subtly, Start Mission advances it along the route and then scrolls to Projects, section content reveals once on entry, HUD state moves in compactly, and pointer clicks on interactive controls may emit a short 520ms pixel burst. Touch does not produce cursor bursts.

Sound is available only after a deliberate entry into Playful mode and remains a low-gain square-wave accent for select, launch, and collect interactions. It never autoplays: a tone is created only after a deliberate control action. The mute state persists in local storage and all Playful sound controls remain synchronized and expose `aria-pressed`.

Under `prefers-reduced-motion: reduce`, mode switching becomes a direct state flip, Framer entrances render in their final state, the engineer does not idle or traverse, the target-lock and click-burst animations are removed, smooth scrolling becomes immediate, and nonessential transitions are disabled. Information and navigation must never depend on animation or sound.

## Do's and Don'ts

### Do:

- **Do** scope Mission Grid selectors, tokens, assets, and component patterns to Playful mode and its Mission Grid subtrees.
- **Do** preserve the route-dominant first viewport, ordinary anchor navigation, email action, CV download, and factual project destinations.
- **Do** keep long copy in Bricolage Grotesque and reserve pixel display type for headings, labels, and controls.
- **Do** label generated interface plates as illustrative and retain accurate alternative text.
- **Do** preserve keyboard focus, WCAG 2.2 AA contrast, touch-sized controls, persistent mute, and reduced-motion equivalents.
- **Do** use solid offset geometry, tape, borders, rules, and purposeful pixel assets to create depth.

### Don't:

- **Don't** let Mission Grid styles leak into Crafted mode or replace Crafted mode's existing palette, navbar, project sequence, radii, typography, or footer.
- **Don't** create a half-Crafted, half-Mission-Grid hybrid; the mode boundary is part of the product argument.
- **Don't** reopen the prohibited lanes: dark hacker terminal, violet/indigo AI gradients, glassmorphism, blurred orbs, glow, editorial-serif magazine, or corporate SaaS tiles.
- **Don't** use weapons, copied game IP, camouflage, combat language, fake metrics, invented clients, fabricated achievements, or mandatory gameplay.
- **Don't** use pixel fonts for paragraphs, hide proof behind interaction, or make audio and motion prerequisites for comprehension.
- **Don't** promote the teal branch, later sections, or decorative HUD above the primary orange route and DATABASY / SSU objective.
