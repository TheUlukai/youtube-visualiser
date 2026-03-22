Perform a full static code inspection of all component files in `output/components/` following the CLAUDE.md Fix Workflow. Work through all four phases:

---

## Phase 1 — Scan

Run all of the following grep checks across `output/components/*.jsx` and record every finding (filename + line number + issue type). Do not fix anything yet.

**Check 1 — Escaped unicode**
```
grep -n "\\u[0-9A-Fa-f]{4}" output/components/*.jsx
```

**Check 2 — Unescaped apostrophes in single-quoted JS strings**
```
grep -n "[:=(,]\s*'[^']*'s " output/components/*.jsx | grep -v "\\\\'"
```

**Check 3 — useState (or other hooks) in .map() or .forEach() callbacks**
```
grep -n "useState" output/components/*.jsx | grep "\.map\|\.forEach"
```

**Check 4 — Missing hoveredConcept (interactive Key Concepts panel absent)**
For each file, check whether `hoveredConcept` is present. List any files where it is missing.

**Check 5 — Static concept pills (onClick missing)**
Look for concept/pill rendering blocks that display labels but have no `onClick` handler.

**Check 6 — Bare font sizes without clamp()**
```
grep -n 'fontSize: "[0-9]' output/components/*.jsx | grep -v clamp
```
Note: `fontSize: "0.65em"` and other relative units are acceptable — only flag bare `px` values.

**Check 7 — SVG without viewBox**
```
grep -n "<svg" output/components/*.jsx | grep -v viewBox
```

**Check 8 — Canvas with fixed JSX width/height props**
```
grep -n "<canvas" output/components/*.jsx | grep -E 'width=["{][0-9]|height=["{][0-9]'
```

**Check 9 — maxWidth bare numbers wider than 340 without min(90vw**
```
grep -n "maxWidth:" output/components/*.jsx | grep -v "min(90vw" | grep -E "maxWidth:\s*['\"]?[0-9]{3,}"
```
Flag values greater than 340 that lack the `min(90vw, ...)` wrapper.

**Check 10 — Key Concepts nested inside main viz card (not a top-level sibling)**
For any file containing `hoveredConcept`, check whether the Key Concepts block is inside another card container rather than being a top-level sibling before The Difficulty panel.

**Check 11 — Missing section footer**
Each component file must contain "Part " at least twice (once in the header label, once in the footer). Files with only one occurrence are missing a footer.
```
for f in output/components/*.jsx; do count=$(grep -c "Part " "$f" 2>/dev/null || echo 0); [ "$count" -lt 2 ] && echo "$f: only $count 'Part ' occurrence(s)"; done
```

**Check 12 — RWE cards missing borderLeft accent stripe**
Each component with a Real-World Echoes panel must have `borderLeft` on the cards inside it.
```
grep -rL 'borderLeft.*3px solid' output/components/*.jsx
```
Cross-reference with files that contain "echoes" or "echos" — any match that lacks borderLeft is a finding.

**Check 14 — RWE toggle button label missing explicit colour**
The `<span>` inside the RWE toggle button must have an explicit `color:` set. Without it the label inherits the button's default colour, which may be invisible on dark backgrounds. Look for "Real-World Echoes" spans that lack a colour property on the same element.
```
grep -n "Real-World Echoes" output/components/*.jsx
```
For each match, check the surrounding `<span style={{...}}>` — it must contain `color:`. Flag any that don't.

**Check 15 — Difficulty panel borderLeft colour differs from Problem panel**
Both the Problem and Difficulty panels must use the same accent hex for their `borderLeft`. This is hard to grep precisely, but a rough check is to look for files where the Difficulty section uses a `borderLeft` hex that does not appear near the Problem section's `borderLeft`.
```
grep -n 'borderLeft' output/components/*.jsx | grep -v "3px\|RWE\|card\|echo\|Echo"
```
Review the results: within each file the Problem and Difficulty `borderLeft` values should be identical hex strings.

**Check 16 — Missing Core Idea panel**
Each component file must contain "The Core Idea" label string. Files that lack it are missing the required Core Idea panel.
```
grep -rL "The Core Idea" output/components/*.jsx
```

**Check 13 — Missing centred maxWidth content wrapper**
Each component should have both `maxWidth` and `margin` (for `0 auto` centring) in its return JSX.
```
grep -L "maxWidth" output/components/*.jsx
```
Any file missing `maxWidth` likely has content anchored to the left edge on wide viewports.

---

## Phase 2 — Triage

Use `TaskCreate` to create one task per issue type that has findings, listing the affected files in the description. If an issue type has no findings, skip it.

---

## Phase 3 — Fix

Work issue type by issue type (not file by file). For each issue type:
- Re-grep to confirm every affected instance
- Fix all instances in one pass following the patterns in CLAUDE.md
- Always fix in `output/components/` source files, never in `output/visualizations.jsx` directly
- Mark the task complete

Key fixes reference:
- **Escaped unicode**: replace `\uNNNN` with the literal character
- **Unescaped apostrophes**: escape as `\'` or switch to double-quoted string
- **Hooks in loops**: hoist state to component top level, key into it by item id or index
- **Missing Key Concepts**: add `hoveredConcept` state + `keyConcepts` array + card-wrapped panel before The Difficulty
- **Bare font sizes**: wrap in `clamp()` e.g. `clamp(12px, 1.8vw, 15px)`
- **SVG without viewBox**: add `viewBox="0 0 W H"` and `width="100%"` with `style={{ maxWidth: W }}`
- **Fixed canvas props**: remove JSX width/height, set via ResizeObserver in useEffect
- **Bare maxWidth**: wrap as `maxWidth: "min(90vw, Npx)"`
- **Key Concepts nested**: extract from enclosing card, place as top-level sibling with card wrapper `background: rgba(0,0,0,0.25), border: accent33, borderRadius: 8, padding: clamp(16px,3vw,24px), marginBottom: 16`
- **RWE label missing colour**: add `color: ACCENT` to the `<span>` inside the RWE toggle button — the same colour used on the ChevronDown/Up icon beside it
- **Difficulty borderLeft wrong colour**: change to match the Problem panel's `borderLeft` hex exactly — same ACCENT, never a different hue
- **Missing footer**: add `{/* Footer */}<div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>Part N of M — Series Title</div>` as the last element inside the inner maxWidth wrapper
- **Footer inside RWE panel**: footer must appear AFTER the RWE outer panel's closing `</div>`, not between the `)}` (conditional close) and `</div>` (panel close) — move it out
- **Missing borderLeft on RWE cards**: add `borderLeft: "3px solid ACCENT", borderRadius: "0 6px 6px 0", background: ACCENT + "0a"` to each card div inside the RWE panel
- **Missing maxWidth wrapper**: wrap return JSX content in `<div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>`

---

## Phase 4 — Verify

```bash
python scripts/assemble.py
cd devserver && npm run build
```

Report the final line count and confirm the build is clean. If the build fails, diagnose and fix before reporting done.
