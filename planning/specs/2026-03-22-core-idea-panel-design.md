# Core Idea Panel — Design Spec

**Date:** 2026-03-22
**Status:** Approved

---

## Problem

The `core_argument` field in `sections.json` is rich (3–5 sentences with examples and contrast) but is only used as generation context — it never surfaces in the UI. Users see The Problem and jump straight into the main visualization with no explicit statement of what the section's central claim actually is.

---

## Solution

Add a **"The Core Idea"** panel between The Problem and the Main Visualization. It surfaces the `core_argument` text directly, split into a lead sentence (the central claim) and a body (elaboration and examples).

---

## Panel Order (updated)

```
Header → The Problem → The Core Idea → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer
```

For the first section (where The Problem panel is omitted), The Core Idea still appears — immediately after the Header:

```
Header → The Core Idea → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer
```

---

## Content

**Source field:** `core_argument` from `sections.json`, hardcoded as a constant at the top of each component — the same pattern used for all section-specific text strings.

**Guard:** If `core_argument` is falsy (empty, null, or absent), omit the entire panel.

**Splitting logic:** Split on the first sentence boundary — a period, exclamation mark, or question mark followed by whitespace and a capital letter — with a **minimum lead length of 30 characters** to avoid misfiring on abbreviations ("Dr.", "cf.", "e.g.") or short openers that end with punctuation.

```js
const CORE_ARGUMENT = "...hardcoded value from sections.json...";

const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
const coreIdBody = splitMatch ? splitMatch[2] : "";
```

The `.{30,}?` quantifier requires at least 30 characters before the sentence-ending punctuation. All common abbreviations are well below this threshold; real philosophical sentences are always longer. If no boundary is found, the full string goes into `lead` and `body` is `""` — the body paragraph is not rendered.

---

## Styling

```jsx
{/* The Core Idea */}
{CORE_ARGUMENT && (
  <div style={{
    background: "rgba(0,0,0,0.3)",
    border: `1px solid ${ACCENT}25`,
    borderRadius: 8,
    padding: "16px 20px",
    marginBottom: 16,
  }}>
    <div style={{
      fontSize: 11,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: ACCENT,
      marginBottom: 10,
    }}>
      The Core Idea
    </div>
    <p style={{
      fontSize: 15,
      color: "#e8e0d4",
      lineHeight: 1.6,
      margin: coreIdBody ? "0 0 8px" : 0,
    }}>
      {coreIdLead}
    </p>
    {coreIdBody && (
      <p style={{
        fontSize: 13,
        color: "#a09898",
        lineHeight: 1.75,
        margin: 0,
      }}>
        {coreIdBody}
      </p>
    )}
  </div>
)}
```

**Visual rationale:** Full border (not left-border like Problem/Difficulty) distinguishes it as expository rather than a narrative tension panel. Lead sentence in `#e8e0d4` draws the eye to the central claim; body in `#a09898` recedes appropriately. `marginBottom: 16` is used consistently on all cards within the `maxWidth` wrapper — no change needed to adjacent panels.

**Label fontSize:** `11` — consistent with the Problem, Difficulty, and Key Concepts panel labels (all use `fontSize: 11`).

---

## Files to Change

### 1. `CLAUDE.md`

- Add **"Required: Core Idea Panel"** section with the full spec (splitting logic, styling, guard)
- Update the panel order string wherever it appears — replace:
  `Header → The Problem → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer`
  with:
  `Header → The Problem → The Core Idea → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer`
- Update the "Required: Consistent Panel Width" section to include The Core Idea in the list of panels that must share the same `maxWidth` constraint
- Add "Missing or misplaced Core Idea panel" to the recurring bug patterns checklist

### 2. `.claude/commands/static-check.md`

Add a check for the Core Idea panel — grep for `"The Core Idea"` label string in each component. Flag any component that is missing it (except where there is no `core_argument` in the corresponding `sections.json` entry).

### 3. `scripts/generate_viz.py` — `SYSTEM_PROMPT`

Add panel **2. THE CORE IDEA** to the required component structure, between The Problem and Main Visualization:

```
2. THE CORE IDEA PANEL (after The Problem / Header, before the main visualization)
   Source: the CORE_ARGUMENT constant (core_argument from section data), hardcoded at the top of the component.
   Guard: if CORE_ARGUMENT is falsy, omit the entire panel.
   Split CORE_ARGUMENT into lead and body using a sentence-boundary regex with a 30-char minimum:
     const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
     const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
     const coreIdBody = splitMatch ? splitMatch[2] : "";
   Style: border `1px solid ${ACCENT}25` (full border, not left-border), background rgba(0,0,0,0.3),
   borderRadius 8, padding "16px 20px", marginBottom 16.
   Label "The Core Idea": fontSize 11, letterSpacing 2, uppercase, color ACCENT, marginBottom 10.
   Lead paragraph: fontSize 15, color "#e8e0d4", lineHeight 1.6, margin "0 0 8px" (or 0 if no body).
   Body paragraph: fontSize 13, color "#a09898", lineHeight 1.75. Only render if coreIdBody is non-empty.
```

Renumber subsequent panels (Main Visualization becomes 3, Key Concepts 4, etc.).

Also add a structural validation check to the `validate_jsx` function, analogous to the existing footer and RWE checks:

```python
if "The Core Idea" not in code:
    return False, "Missing Core Idea panel (no 'The Core Idea' label found)"
```

### 4. `scripts/parse_sections.py`

No changes needed. `core_argument` is already extracted and passed through.

### 5. Existing packaged sites

Five sites need the Core Idea panel retrofitted. They fall into two categories:

**Modern sites** (have `src/components/` and `src/sections.json`):
- `hegel-philosophical-system`
- `aristotle-philosophy-science-legacy`

For each, edit the individual component files in `src/components/`, adding:
1. A `CORE_ARGUMENT` constant at the top (value copied from `src/sections.json` for that section)
2. The `splitMatch` / `coreIdLead` / `coreIdBody` split logic alongside the constant
3. The panel JSX between The Problem (or Header for first sections) and the main visualization div

Then reassemble and build:
```bash
python scripts/assemble.py \
  --components-dir sites/<slug>/src/components \
  --sections-file  sites/<slug>/src/sections.json \
  --output         sites/<slug>/src/App.jsx
cd sites/<slug> && npm run build
```

**Legacy sites** (have only `src/App.jsx`, no `src/components/` or `src/sections.json`):
- `ontology-the-hidden-operating-system`
- `kant-copernican-revolution`
- `spinoza-philosophy`

These sites do not have `core_argument` values stored anywhere in their site directory. To retrofit them, re-run `parse_sections.py` against the original YouTube URL (found in each site's `README.md`) to regenerate `sections.json`, then edit `src/App.jsx` directly, inserting the Core Idea panel into each section component with the `core_argument` value from the regenerated `sections.json`. There is no automated reassembly path for these sites.

---

## Out of Scope

- No changes to `sections.json` schema
- No changes to `assemble.py`
- No interactivity on the Core Idea panel (always expanded, no toggle)
- No changes to the nav bar or section tabs
