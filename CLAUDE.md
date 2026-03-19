# YouTube Visualizer

## Project Purpose
Takes a YouTube URL, downloads the transcript, parses it into sections,
and generates interactive React visualizations for each section.

## Tech Stack
- Python 3 for transcript fetching (youtube-transcript-api)
- Node.js / React for visualization output
- Claude API (Sonnet 4.6) for parsing and generation

## Content Structure — The Problem Chain
Educational content typically follows a pattern: each idea exists because
it solves a problem left by the previous idea, and each idea creates new
problems that the next section inherits. This chain is the backbone of
the narrative and MUST be surfaced in the visualizations.

For each section, the parser must extract:
- **problem_inherited**: what problem or tension from earlier this section
  is responding to (null for the first section)
- **solution**: how this section's key idea resolves that problem
- **problem_created**: what new difficulty, tension, or open question this
  idea generates — the thing that forces the next development
- **real_world_examples**: concrete modern parallels from the transcript

The visualization for each section should make the problem chain visible:
- A "The Problem" panel (or header) showing what tension this section faces
- The main visualization of the idea/solution
- A "The Difficulty" or "But..." panel showing the new problem created
- A "Real-World Echoes" collapsible panel with concrete examples

This gives the viewer the *pressure* that forced each idea into existence,
not just a static description of the idea itself.

## Style Guidelines for Generated Visualizations
- Dark themed backgrounds (radial gradients, unique per section)
- Georgia serif font throughout
- Each section gets a unique accent color (hex format, not rgb)
- Interactive elements: clickable regions, expandable panels, toggles
- Minimal formatting — no bullet lists in descriptions
- Unicode characters directly (never \uNNNN escape sequences)
- All in a single .jsx file with Tailwind-compatible inline styles
- Available libraries: React hooks, recharts, lucide-react, d3

## Required: Section Header Block
**Every section MUST open with a centred header block** placed before The Problem panel. This is non-negotiable.

### Structure
```jsx
<div style={{ textAlign: "center", marginBottom: 32 }}>
  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
    Part N of M — Series Title
  </div>
  <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
    Section Title
  </h1>
  <p style={{ fontSize: 15, color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
    One-sentence framing of what this section is about.
  </p>
</div>
```

### Rules
- `textAlign: "center"` on the outer wrapper — never left-justified
- Order is always: **Header → The Problem → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes**
- The Problem panel must come **after** the header, never before it
- `h1` uses `fontWeight: "normal"` and `clamp()` font size for mobile scaling

## Required: Consistent Panel Width
**Every panel in a section must appear the same visual width.** The Problem, Main Visualization, Key Concepts, The Difficulty, and Real-World Echoes panels must all line up at the same left and right edges.

### Pattern
The standard approach is a single inner wrapper around the entire section content:
```jsx
<div style={{ maxWidth: 860, margin: "0 auto" }}>
  {/* Header */}
  {/* The Problem */}
  {/* Main Visualization */}
  {/* Key Concepts */}
  {/* The Difficulty */}
  {/* Real-World Echoes */}
</div>
```

All card divs inside this wrapper use no horizontal margin (they stretch edge-to-edge within the wrapper). If individual panels need side padding, apply it inside the card div's `padding` style, not via `margin`.

### What to avoid
- Full-width Problem/Difficulty bands (background spanning the viewport) while other panels are constrained — always apply `borderRadius` and keep panels inside the `maxWidth` wrapper
- Mixing `margin: "0 40px"` on some panels with `maxWidth` wrappers on others — pick one approach and apply it consistently within the section
- KC card a different width than the surrounding Problem/Difficulty cards — all three must share the same `maxWidth` constraint

## Required: Interactive Key Concepts Section
**Every section MUST include an interactive "Key Concepts — Click to Explore" panel.**
This is non-negotiable — static concept tags (plain `<span>` pills with no handler) are not acceptable.

### Implementation pattern
Each section component must have:
1. `const [hoveredConcept, setHoveredConcept] = useState(null);` in its state declarations
2. A `concepts` (or `keyConcepts`) array with objects: `{ id, label, desc }` — 4–6 concepts per section, each `desc` being a substantive 2–3 sentence explanation in context
3. A rendered Key Concepts block positioned before "The Difficulty" panel or "Real-World Echoes":

```jsx
{/* Key Concepts */}
<div style={{ marginTop: 28 }}>
  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
    Key Concepts — Click to Explore
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
    {concepts.map(c => (
      <div
        key={c.id}
        onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
        style={{
          padding: "6px 14px",
          background: hoveredConcept === c.id ? ACCENT : "rgba(ACCENT_RGB, 0.1)",
          border: `1px solid ${hoveredConcept === c.id ? ACCENT_LIGHT : ACCENT_DARK}`,
          borderRadius: 20,
          fontSize: 12,
          cursor: "pointer",
          color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_MUTED,
          transition: "all 0.2s",
        }}
      >
        {c.label}
      </div>
    ))}
  </div>
  {hoveredConcept && (
    <div style={{
      background: "rgba(ACCENT_RGB, 0.08)",
      border: `1px solid ACCENT_DIM`,
      borderRadius: 6,
      padding: "16px 20px",
    }}>
      <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT, marginBottom: 8 }}>
        {concepts.find(c => c.id === hoveredConcept)?.label}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
        {concepts.find(c => c.id === hoveredConcept)?.desc}
      </p>
    </div>
  )}
</div>
```

### Rules
- Use `onClick` toggle (NOT `onMouseEnter`) — hover-triggered layout changes cause jitter (element resizes, moves out from under cursor, triggers leave/enter loop)
- The description popup renders as a `<div>` below the pills, never inside an SVG
- Color the active pill with the section's full accent color (text becomes `#f0ead8` for readability)
- Concepts must be genuinely informative — not just vocabulary labels

## Required: Real-World Echoes Panel
**Every section MUST include a "Real-World Echoes" collapsible panel** as the last element, collapsed by default.

### Implementation pattern
```jsx
{/* Real-World Echoes */}
<div style={{
  background: `${ACCENT}08`,
  border: `1px solid ${ACCENT}33`,
  borderRadius: 8,
  overflow: "hidden",
}}>
  <button
    onClick={() => setEchoesOpen(!echoesOpen)}
    style={{
      width: "100%",
      background: "transparent",
      border: "none",
      padding: "18px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      fontFamily: "Georgia, serif",
    }}
  >
    <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT }}>
      Real-World Echoes
    </span>
    {echoesOpen ? <ChevronUp size={16} color={ACCENT_LIGHT} /> : <ChevronDown size={16} color={ACCENT_LIGHT} />}
  </button>
  {echoesOpen && (
    <div style={{ padding: "0 24px 24px 24px", borderTop: `1px solid ${ACCENT}33` }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
        {[
          { title: "Echo Title", body: "Echo body text..." },
        ].map((item, i) => (
          <div key={i} style={{
            borderLeft: `3px solid ${ACCENT}`,
            borderRadius: "0 6px 6px 0",
            background: `${ACCENT}0a`,
            padding: "14px 18px",
          }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
              {item.title}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
```

### Rules
- 3–4 items per section — concrete, specific modern parallels (not vague generalisations)
- Each item must have a **bold title** and a substantive body paragraph
- Use the section's accent color for `borderLeft` and title color; body text in `#b8b0a8`
- `borderRadius: "0 6px 6px 0"` on each card (flat left edge where the border is, rounded right)
- No hover effects on individual cards — static styling only
- No emoji icons in titles or body text
- No grid layouts — always a single column regardless of item count
- No per-item accent colors — all cards use the same section accent

## File Structure
```
scripts/
  fetch_transcript.py     — downloads transcript from YouTube
  parse_sections.py       — uses Claude API to split into sections
  generate_viz.py         — uses Claude API to generate React components
  assemble.py             — combines components into single navigable app

output/                   — temporary working space, overwritten each pipeline run
  transcript.txt          — raw transcript text
  sections.json           — parsed section data
  components/             — per-section .jsx files generated by generate_viz.py
  visualizations.jsx      — assembled app (input to devserver)

devserver/                — Vite+React dev server for previewing output/visualizations.jsx
  src/
  package.json
  vite.config.js

sites/                    — permanent archive; one subdirectory per packaged visualization
  <site-slug>/
    src/
      App.jsx             — assembled visualization (default export); built by Vite
      main.jsx
      index.css
      components/         — per-section source files (archived from output/components/)
        <section-id>.jsx  — one file per section; not imported by build, kept for editing
      sections.json       — copy of output/sections.json; used for reassembly
    index.html
    package.json
    vite.config.js        — sets base and build.outDir pointing to docs/<site-slug>/
    README.md             — video title, YouTube URL, date generated, launch instructions

docs/                     — GitHub Pages root; built output from all packaged sites
  index.html              — site index with links to each visualization
  <site-slug>/            — built static files for each site (output of npm run build)

CLAUDE.md                 — this file
run.sh                    — convenience wrapper for the full pipeline
```

## Dev Server
The `devserver/` directory is a Vite+React project that serves `output/visualizations.jsx`.
It needs alias config to resolve React/recharts/lucide-react from its own `node_modules`
when the visualizations file is imported from outside the project root.

```bash
cd devserver
npm install        # first time only
npm run dev        # starts at http://localhost:5173
```

## Post-Generation Verification
After any run of `assemble.py` (or `generate_viz.py`), verify the output with these checks:

**Step 1 — Static inspection + build check:**
Run `/static-check` — this performs all grep-based checks, creates tasks for each issue type found, fixes them by type across all components, then reassembles and runs `npm run build` to confirm no syntax errors. See `.claude/commands/static-check.md` for the full check list.

**Step 2 — In-browser checks** — run `/browser-check` to perform all checks using the Chrome browser extension. This covers:
1. **Escaped unicode** — scan for literal `\uNNNN` appearing as text; all unicode should render as real characters
2. **Color readability** — check text visibility on dark backgrounds, especially for active/selected button states where accent color becomes the background
3. **Layout overlaps** — scroll each section; watch for SVG elements or absolutely-positioned boxes clipping outside their containers
4. **Interactive elements** — click toggles, expandable panels ("Real-World Echoes"), and draggable elements in at least a sample of sections
5. **Navigation** — verify Prev/Next buttons step through all sections and the tab bar scrolls the active tab into view

See `.claude/commands/browser-check.md` for the full check list.

**Step 3 — Package** — once satisfied with the result, run `/package` to archive the
visualization under `sites/`, build it to `docs/`, and update the site index.

**Recurring bug patterns** — these have appeared in generated components and should be checked explicitly:

- **`useState` or other hooks called inside `.map()` or loops** — React requires hooks to be called at the top level of a component, never inside loops, conditions, or nested functions. A `const [x, setX] = useState(...)` inside a `.map()` callback will cause a silent crash (blank page or broken render) when the section is interacted with. This is the hardest bug to spot visually. Grep for `useState` appearing inside arrow functions passed to `.map(` and fix by hoisting the state to the top of the component, then using the item's id or index to key into it.

- **SVG viewBox too small for dynamic content** — if a component renders items whose positions are computed at runtime (towers, expanding nodes, regress chains), the viewBox may need extra headroom. Check that dynamically placed elements don't render outside the declared bounds. Fix by enlarging the viewBox (e.g. extend upward with a negative y origin).

- **SVG content overflowing the right edge** — text labels with `textAnchor="middle"` near the right edge of a viewBox, and timeline arrows/labels placed close to `x=viewBox-width`, frequently exceed the boundary. Check the rightmost elements and widen the viewBox if needed. The same applies to text without an explicit `textAnchor`: the default is `"start"`, so text placed near the right edge by an absolute x coordinate will always overflow. For right-aligned SVG text, use `textAnchor="end"` with x set to the inner edge of the containing shape.

- **Conditional SVG content overlapping existing elements** — text or shapes rendered conditionally inside an SVG (e.g. a "pressure test" box that appears on button click) may overlap with the SVG's permanent content. Prefer rendering conditional rich text as a styled `<div>` outside the SVG rather than as SVG `<text>`/`<rect>` elements inside it.

- **`position: absolute` overlays escaping their container** — an absolutely-positioned description or tooltip inside a fixed-height container (e.g. overlaid on a `<canvas>`) can overflow and visually cover content in the next section of the page when text wraps to more lines than expected. Use normal document flow for these descriptions instead.

- **Hover-triggered layout reflow causing jitter** — changing `flex`, `width`, or `height` on `mouseEnter` causes the element to resize, which moves it out from under the cursor, triggering `mouseLeave`, collapsing it, then `mouseEnter` again. Use `onClick` to toggle expanded state, and render the expanded content in a separate stable element below rather than inside the pill/chip.

- **Interactive controls not wired to visuals** — sliders, range inputs, and step buttons may update a state variable that is only partially used. Verify that every interactive control has a visible effect on the main visualization (not just a label or counter). Trace the state variable through to the render path.

- **Visual state not matching selected conceptual mode** — when a user selects a philosophical position or mode, any generic floating element (e.g. a draggable "universal" bubble) that is valid for no-selection may become misleading or contradictory once a specific mode is active. Each mode should show only the visual elements consistent with its own logic; hide or transform elements that belong to the neutral/unselected state.

- **Incomplete enumeration of source-material items** — generated category wheels, lists, or diagrams may represent only a subset of the items named in the transcript. Verify that all items mentioned (e.g. all 10 Aristotelian categories, all positions in a debate) are present in the visualization.

- **SVG node labels hard-truncated by character count** — using `label.substring(0, N)` to fit text inside an ellipse or rect is fragile and always clips valid content. Instead, size the node geometry (`rx`/`ry` for ellipses, `width` for rects) to fit the longest label, or split long labels across two `<tspan>` lines. Never hard-cap by character count.

- **Layer sublabels placed at the same y-coordinate as node centres** — if a band of nodes (ellipses, circles) and a sublabel share the same `y` value for their centre / baseline, the sublabel will sit inside the node geometry and be hidden or obscured. Position sublabels either above the layer label (`y = layer.y - N`) or below the node bottom (`y = layer.y + ry + lineHeight`), so they clear the node silhouette entirely.

- **SVG annotation labels colliding with node circles** — stream labels, axis labels, or region labels positioned relative to the start/end point of a curve or line will collide with any node circle anchored at the same point. The label x/y is often set to match the curve's origin (e.g. `x = W * 0.08`) while the first node is also placed at that origin. Fix by moving the label to the canvas edge (`x = 6`) or otherwise offsetting it well clear of the node radius, and adjusting y so it clears the node's year/title text above or below.

- **Missing or misplaced section header** — every section must open with a centred `Part N of M` / `<h1>` / subtitle block placed *before* The Problem panel. Two failure modes to check: (1) the header block is absent entirely — the section jumps straight into The Problem or the main visualization; (2) The Problem panel renders above the `<h1>`, making the heading appear mid-page. Fix by inserting the standard header block (see "Required: Section Header Block") as the very first element inside the section's root div, and moving any misplaced Problem panel to after it.

- **Left-justified section header** — a header block exists but its outer `<div>` lacks `textAlign: "center"`, so the Part label, `<h1>`, and subtitle all anchor to the left edge of the content area. On wide viewports this is immediately visible as misalignment compared to centred sections. Fix by wrapping the three header elements in `<div style={{ textAlign: "center", marginBottom: 32 }}>`.

- **Inconsistent panel widths within a section** — The Problem, Main Visualization, Key Concepts, and The Difficulty panels must all appear the same width. Common failure modes: (1) Problem/Difficulty panels use full-viewport-width background bands while other panels sit in a `maxWidth` container; (2) some panels use `margin: "0 40px"` while others use a `maxWidth` wrapper, producing mismatched edges; (3) the KC card is narrower or wider than the adjacent Problem/Difficulty cards. Fix by ensuring all panels share the same `maxWidth` constraint inside a single inner wrapper (see "Required: Consistent Panel Width").

- **Missing centred content wrapper** — every section component should wrap its content in an inner div with `maxWidth` (typically 820–900px) and `margin: '0 auto'`. Without this wrapper the content anchors to the left edge of the viewport on wide screens, making the section look left-justified compared to all others. Check that the root `<div>` of each section contains an inner wrapper with these two properties; if it relies purely on `padding` without a `maxWidth` container, add the wrapper.

- **Fixed canvas dimensions breaking mobile** — `<canvas width={760} height={400} />` as a JSX prop sets a fixed physical size regardless of the viewport. On mobile this either clips or forces horizontal scroll. The correct pattern is to omit width/height from the JSX, then in a `useEffect` with a `ResizeObserver` on the container ref, set `canvas.width = container.offsetWidth` and compute height from an aspect ratio. Redraw whenever the observer fires. This produces identical output on desktop and scales correctly on narrow screens.

- **Fixed SVG width breaking mobile** — `<svg width={800} height={400}>` ignores the viewport. Use `<svg viewBox="0 0 800 400" width="100%" style={{ maxWidth: 800 }}>` instead. The coordinate system is unchanged, so internal positions need no adjustment, but the SVG scales down proportionally on narrow screens.

- **Bare px font sizes not scaling on mobile** — `fontSize: 14` is fine on desktop but becomes illegible on high-DPI phones. Use `clamp(12px, 1.8vw, 15px)` for body text and `clamp(18px, 3vw, 28px)` for headings. On a 1440px desktop `1.8vw ≈ 26px` which clamp caps to `15px` — identical to the hardcoded value. The mobile benefit is that it scales to the viewport rather than rendering tiny.

## Fix Workflow

**Always fix in `output/components/` source files, never in `output/visualizations.jsx` directly** — the assembled file is overwritten by `assemble.py` and edits will be lost. After fixing components, run `python scripts/assemble.py` to regenerate.

**`assemble.py` is safe to re-run** — it only reads `output/components/` and does not re-run generation. However, running `generate_viz.py` *will* overwrite components, so complete any fixes and reassemble before re-running generation.

**Already-packaged sites** (packaged after 2026-03-18) have individual component files in `sites/<slug>/src/components/`. Edit the relevant component file, then reassemble:
```bash
python scripts/assemble.py \
  --components-dir sites/<slug>/src/components \
  --sections-file  sites/<slug>/src/sections.json \
  --output         sites/<slug>/src/App.jsx
cd sites/<slug> && npm run build
```
Legacy sites (packaged before 2026-03-18) have only `sites/<slug>/src/App.jsx` — edit it directly.

**For multi-section fixes**, run `/static-check` — it handles the full scan → triage → fix-by-issue-type → verify cycle automatically.

## Site Packaging
When the user is happy with a visualization, run `/package` — this skill automates
the full packaging workflow: reads metadata from `output/sections.json`, scaffolds
`sites/<slug>/`, copies `output/visualizations.jsx` as `src/App.jsx`, runs
`npm install && npm run build`, and updates `docs/index.html`.

The sites/ folder is the permanent archive. The output/ folder is temporary
working space that gets overwritten on each pipeline run.

### Manual packaging (if needed)
Each site is a minimal Vite + React project with:
- package.json (dependencies: react, react-dom, vite, @vitejs/plugin-react)
- vite.config.js (must set `base` and `build.outDir` — see below)
- index.html (with root div and script tag)
- src/App.jsx (the finalized visualization, default export)
- README.md (video title, YouTube URL, date generated, launch instructions)

## GitHub Pages Deployment
The repo is published at https://TheUlukai.github.io/youtube-visualiser/
Built static files live in docs/ and are served directly by GitHub Pages.

**For each new site**, vite.config.js must include:
```js
base: '/youtube-visualiser/<site-slug>/',
build: {
  outDir: '../../docs/<site-slug>',
  emptyOutDir: true,
},
```

After packaging, build the site and update docs/index.html:
```bash
cd sites/<site-slug>
npm install
npm run build   # outputs to docs/<site-slug>/
```

Then add a new entry to docs/index.html linking to `<site-slug>/`.

**Known assembler pitfall** — `assemble.py` strips `export default ComponentName` but only
if followed by a semicolon. Components generated without a trailing semicolon will leave a
stray `export default` in the assembled file, which breaks the module. The fix is already
in `assemble.py` (the regex now makes the semicolon optional), but watch for this if the
stripping logic is ever touched again.
