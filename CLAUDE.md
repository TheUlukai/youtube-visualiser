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

## File Structure
- scripts/fetch_transcript.py — downloads transcript from YouTube
- scripts/parse_sections.py — uses Claude API to split into sections
- scripts/generate_viz.py — uses Claude API to generate React components
- scripts/assemble.py — combines into single navigable app
- output/ — generated visualization files
- devserver/ — Vite+React dev server for previewing output/visualizations.jsx
- CLAUDE.md — this file

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

**Build check** — confirms no syntax errors before opening the browser:
```bash
cd devserver && npm run build
```

**In-browser checks** — start the dev server and visit http://localhost:5173:
1. **Escaped unicode** — scan for literal `\uNNNN` appearing as text; all unicode should render as real characters
2. **Color readability** — check text visibility on dark backgrounds, especially for active/selected button states where accent color becomes the background
3. **Layout overlaps** — scroll each section; watch for SVG elements or absolutely-positioned boxes clipping outside their containers
4. **Interactive elements** — click toggles, expandable panels ("Real-World Echoes"), and draggable elements in at least a sample of sections
5. **Navigation** — verify Prev/Next buttons step through all 35 sections and the tab bar scrolls the active tab into view

**Recurring bug patterns** — these have appeared in generated components and should be checked explicitly:

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

## Site Packaging
When the user is happy with a visualization, package it under sites/.
Each site is a minimal Vite + React project with:
- package.json (dependencies: react, react-dom, vite, @vitejs/plugin-react)
- vite.config.js (must set `base` and `build.outDir` — see below)
- index.html (with root div and script tag)
- src/App.jsx (the finalized visualization, default export)
- README.md (video title, YouTube URL, date generated, launch instructions)

The sites/ folder is the permanent archive. The output/ folder is temporary
working space that gets overwritten on each pipeline run.

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
