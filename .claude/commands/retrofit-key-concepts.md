Retrofit the Key Concepts panels in a packaged site to match the current standard. This skill targets `sites/<slug>/src/App.jsx` directly (not `output/components/`).

The site slug must be provided as an argument, or inferred from the current working directory. All fixes go directly in `sites/<slug>/src/App.jsx`. After all sections are confirmed good, run `cd sites/<slug> && npm run build`.

---

## Standard: what a correct Key Concepts block looks like

Key Concepts must be a **top-level sibling card positioned just above The Difficulty panel**, never nested inside the main visualization card. The standard pattern:

```jsx
{/* Key Concepts */}
<div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(R,G,B,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>
  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
    Key Concepts — Click to Explore
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
    {concepts.map(c => (
      <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
        style={{ padding: "6px 14px", background: hoveredConcept === c.id ? ACCENT : "rgba(R,G,B,0.1)",
          border: `1px solid ${hoveredConcept === c.id ? ACCENT_LIGHT : "rgba(R,G,B,0.35)"}`,
          borderRadius: 20, fontSize: 12, cursor: "pointer",
          color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_MUTED, transition: "all 0.2s" }}>
        {c.label}
      </div>
    ))}
  </div>
  {hoveredConcept && (
    <div style={{ background: "rgba(R,G,B,0.08)", border: "1px solid rgba(R,G,B,0.3)", borderRadius: 6, padding: "16px 20px" }}>
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

Rules:
- State variable must be `hoveredConcept`/`setHoveredConcept` (not `activeConcept`, `selectedConcept`, `activeConceptIndex`)
- Concepts array entries must use `.desc` field (not `.description`, `.detail`, or a separate lookup object)
- Pills use `onClick` toggle, never `onMouseEnter`
- Active pill: full accent hex background, `#f0ead8` text
- `borderRadius: 20` on pills (not 4, 5, or 6)
- Label: exactly `"Key Concepts — Click to Explore"` (capital E)
- Description renders in a `<div>` below the pills, never inside SVG

---

## Phase 1 — Scan

Determine the target file: `sites/<slug>/src/App.jsx`. Run all checks and record every finding as `section function name | line number | issue`. Do not fix anything yet.

**Check 1 — Hooks in map (crash risk)**
```
grep -n "useState" sites/<slug>/src/App.jsx | grep -E "\.map|\.forEach"
```
Any `useState` call inside a `.map()` or `.forEach()` callback will cause a silent crash on interaction. This is the highest-priority fix.

**Check 2 — Non-standard state variable names**
```
grep -n "activeConcept\|selectedConcept\|activeConceptIndex\|activeTab\b" sites/<slug>/src/App.jsx
```
Flag any that are being used as the Key Concepts toggle state (as opposed to legitimate tab/mode state elsewhere).

**Check 3 — Non-standard concept field names**
```
grep -n "\.description\b\|\.detail\b\|conceptDetails\[" sites/<slug>/src/App.jsx
```

**Check 4 — Grid layout instead of flex pills**
```
grep -n "gridTemplateColumns" sites/<slug>/src/App.jsx
```
Check whether any of these are inside a Key Concepts block (rather than the main viz).

**Check 5 — Missing centering wrapper**
For each `function` component in the file, check whether its `return (` opens a root div that uses `margin: "Xpx 40px 0 40px"` on inner panels without a `maxWidth` + `margin: "0 auto"` inner wrapper. These sections will appear left-justified on wide screens.
```
grep -n "40px 0 40px\|40px, 0, 40px" sites/<slug>/src/App.jsx
```

**Check 6 — Key Concepts placement**
For each section function, find the line numbers of:
- The Key Concepts block start (`Key Concepts`)
- The Difficulty panel start (`The Difficulty`)
- The main visualization card opening (look for the first large `background`/`border`/`borderRadius` div after the Problem panel)

Then read the indentation of the Key Concepts block vs the Difficulty panel. If Key Concepts is indented *more* than The Difficulty, it is nested inside the main viz and must be moved. If they share the same indentation level, it is correctly placed.

**Check 7 — Pill styling**
```
grep -n "borderRadius.*[^2]0[^p]" sites/<slug>/src/App.jsx
```
Look for pill divs with `borderRadius` values other than 20 (e.g. 4, 5, 6, "4px").

**Check 8 — Active pill color**
For each Key Concepts block, verify the active pill uses the full accent hex (not a semi-transparent `rgba(...)`) as background, and `"#f0ead8"` as text color.

**Check 9 — Viz-internal pill rows accidentally outside their card**
Look for pill-like `.map()` blocks at the top level of the return (outside any card div) that clearly belong to the main visualization rather than being a Key Concepts section. These have no `onClick` toggling `hoveredConcept` — they are hover-tooltip pills or concept summary rows that escaped the main viz card closing div.

**Check 10 — KC wrapper missing card styling**
A KC block may be correctly positioned (passing Check 6) but wrapped in a plain positioning div rather than a styled card. For each KC block found, read 1–2 lines ahead and verify the outer `<div style=` includes all three: `background`, `border`, and `borderRadius`. A wrapper with only `marginTop`/`maxWidth`/`margin` (e.g. `<div style={{ marginTop: 28, maxWidth: "860px", margin: "28px auto 0 auto" }}>`) is missing card styling and must be replaced with the standard card pattern.

**Check 11 — KC card width inconsistency with surrounding panels**
After confirming KC placement, check whether the surrounding Problem and Difficulty panels use explicit `maxWidth` constraints on their card divs directly (e.g. `maxWidth: "860px", margin: "0 auto"`). If they do, and the KC card div lacks matching `maxWidth`/`margin`, the KC card will render full-width while all other panels are constrained — a visible mismatch.
```
grep -n "maxWidth.*860\|maxWidth.*820\|maxWidth.*900" sites/<slug>/src/App.jsx
```
Cross-reference the line numbers against the KC block positions to identify any KC card that is missing a matching constraint.

---

## Phase 2 — Triage

Use `TaskCreate` to create one task per issue type that has findings. List the affected section function names in each task description. If an issue type has no findings, skip it.

Suggested task titles:
- `Hooks in map — crash fix` (Check 1)
- `Non-standard state/field names` (Checks 2–3)
- `Grid layout → flex pills` (Check 4)
- `Missing centering wrapper` (Check 5)
- `Key Concepts placement` (Check 6)
- `Pill styling` (Checks 7–8)
- `Viz-internal pills outside card` (Check 9)
- `KC wrapper missing card styling` (Check 10)
- `KC card width inconsistency` (Check 11)

---

## Phase 3 — Fix (section by section, with visual confirmation)

Work one section at a time in document order. For each section:

1. Read the section function to understand its structure before editing
2. Apply all fixes that apply to this section
3. Run `cd sites/<slug> && npm run build` — confirm clean
4. Tell the user which section is ready and wait for visual confirmation before proceeding

**Fix A — Key Concepts placement (most common)**

If Key Concepts is nested inside the main viz card:
1. Read the section to identify:
   - The Key Concepts block (start/end lines)
   - What closes the main viz (the `</div>` pair that ends the main viz card and its wrapper)
   - The Difficulty panel's outer wrapper style (match its `margin`/`maxWidth` for the new Key Concepts wrapper)
2. Remove the Key Concepts block from inside the main viz
3. Insert it just above The Difficulty panel, wrapped to match The Difficulty's outer container style

The outer wrapper for Key Concepts should match the Difficulty panel's outer wrapper exactly. Common patterns:
- `<div style={{ maxWidth: 860, margin: "0 auto" }}>` — if Difficulty uses this
- `<div style={{ margin: "28px 0 0 0" }}>` — if the section already has a centering wrapper
- No extra outer wrapper needed if Key Concepts is placed directly at the same indent level as The Difficulty

**Fix B — Missing centering wrapper**

If the section's root div has `padding: "0 0 60px 0"` (or similar, no horizontal padding) and inner panels use `margin: "Xpx 40px 0 40px"`:

1. After the root div opening, add: `<div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>`
2. Change the header padding from `"40px 40px 0 40px"` to `"40px 0 0 0"`
3. Change all `margin: "Xpx 40px 0 40px"` to `margin: "Xpx 0 0 0"`
4. Before the root div closing `</div>`, add a closing `</div>` for the wrapper
5. Close the wrapper just before `</div>\n  );\n}` (i.e., before the root div closes)

**Fix C — Hooks in map**

Replace `const [hov, setHov] = useState(false)` inside `.map()` with a single state at component top level:
- Add `const [hoveredPill, setHoveredPill] = useState(null);` with the other state declarations
- In the `.map()`, use `hoveredPill === item.id` (or `item.label` if no id) instead of `hov`
- Replace `onMouseEnter={() => setHov(true)}` with `onMouseEnter={() => setHoveredPill(item.id)}`
- Replace `onMouseLeave={() => setHov(false)}` with `onMouseLeave={() => setHoveredPill(null)}`

**Fix D — Non-standard state/field names**

- Rename `activeConcept` → `hoveredConcept`, `setActiveConcept` → `setHoveredConcept`
- Rename `selectedConcept` → `hoveredConcept`, `setSelectedConcept` → `setHoveredConcept`
- Rename `activeConceptIndex` → `hoveredConcept` (change comparison from index to `c.id`)
- Rename `.description` → `.desc`, `.detail` → `.desc` on concept objects
- Merge separate `conceptDetails` lookup objects into the concepts array as `.desc` fields
- Add `id` fields to concept objects if missing (use a short slug string)

**Fix E — Grid layout → flex pills**

Replace `display: "grid", gridTemplateColumns: ...` Key Concepts blocks with the standard flex-wrap pill pattern. Keep the concepts data; only replace the rendering.

**Fix F — Pill styling**

- `borderRadius: 4` / `borderRadius: 6` / `borderRadius: "4px"` → `borderRadius: 20`
- Active pill background: `rgba(R,G,B,0.3)` or similar semi-transparent → full accent hex
- Active pill text: `#0d0d15` or other dark color → `"#f0ead8"`

**Fix G — Viz-internal pills outside card**

If a pill row (with hover tooltips or concept summaries, no `hoveredConcept` toggling) has escaped the main viz card's closing divs:
1. Remove it from its current position
2. Fix any hooks-in-map on it (Fix C above)
3. Re-insert it inside the main viz card, just before the card's closing `</div>`, typically with a `borderTop` separator

**Fix H — KC wrapper missing card styling**

Replace the plain positioning wrapper with the standard card div:
- Old: `<div style={{ marginTop: 28, maxWidth: "860px", margin: "28px auto 0 auto" }}>`
- New: `<div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(R,G,B,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>`

Use the section's accent colour RGB values for the border. Remove the now-redundant inner wrapper if present.

**Fix I — KC card width inconsistency**

If the surrounding Problem/Difficulty panels use `maxWidth: "860px", margin: "0 auto ..."` on their card divs directly, add matching constraints to the KC card div:
- Add `maxWidth: "860px", margin: "0 auto 16px auto"` to the KC card's style object
- Remove any separate `marginBottom` property since `margin` shorthand replaces it

---

## Phase 4 — Final build and commit

After all sections are visually confirmed:

```bash
cd sites/<slug>
npm run build
```

Report the build result. If clean, suggest committing with a message summarising the sections fixed and issue types resolved.
