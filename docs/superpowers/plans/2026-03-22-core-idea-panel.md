# Core Idea Panel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "The Core Idea" panel (always-expanded, expository) between The Problem and the Main Visualization in every section component, surfacing the `core_argument` field from `sections.json`.

**Architecture:** Four phases — (1) update generation tooling so all future runs produce the panel automatically, (2) verify it works, (3) retrofit the current `output/` working directory before packaging, (4) retrofit the five existing packaged sites. Modern sites (hegel, aristotle) have per-section component files and can be patched programmatically. Legacy sites (ontology, kant, spinoza) have only a monolithic `App.jsx` and require direct editing.

**Tech Stack:** Python 3, React (inline styles), JSX, CLAUDE.md spec enforcement

**Spec:** `docs/superpowers/specs/2026-03-22-core-idea-panel-design.md`

---

## Site inventory

| Site | Type | Sections | Path |
|------|------|----------|------|
| hegel-philosophical-system | Modern | 20 | `sites/hegel-philosophical-system/` |
| aristotle-philosophy-science-legacy | Modern | 15 | `sites/aristotle-philosophy-science-legacy/` |
| ontology-the-hidden-operating-system | Legacy | ~35 | `sites/ontology-the-hidden-operating-system/` |
| kant-copernican-revolution | Legacy | 21 | `sites/kant-copernican-revolution/` |
| spinoza-philosophy | Legacy | 21 | `sites/spinoza-philosophy/` |

Modern = has `src/components/` + `src/sections.json`. Legacy = `src/App.jsx` only.

---

## Task 1: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add "Required: Core Idea Panel" section**

Insert the following section into `CLAUDE.md` immediately after the "Required: Section Header Block" section (before "Required: Consistent Panel Width"):

```markdown
## Required: Core Idea Panel
**Every section MUST include a "The Core Idea" panel** immediately after The Problem panel (or immediately after the Header for the first section where The Problem is omitted). This is non-negotiable.

### Content
Source: the `core_argument` value from `sections.json`, hardcoded as a `CORE_ARGUMENT` constant at the top of the component. If `core_argument` is falsy, omit the entire panel.

Split into lead sentence and body using a sentence-boundary regex with a 30-character minimum lead length to avoid misfiring on abbreviations:

```js
const CORE_ARGUMENT = "...";
const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
const coreIdBody = splitMatch ? splitMatch[2] : "";
```

### Implementation pattern
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
      fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
      color: ACCENT, marginBottom: 10,
    }}>
      The Core Idea
    </div>
    <p style={{
      fontSize: 15, color: "#e8e0d4", lineHeight: 1.6,
      margin: coreIdBody ? "0 0 8px" : 0,
    }}>
      {coreIdLead}
    </p>
    {coreIdBody && (
      <p style={{ fontSize: 13, color: "#a09898", lineHeight: 1.75, margin: 0 }}>
        {coreIdBody}
      </p>
    )}
  </div>
)}
```

### Rules
- Full border (`border: 1px solid ${ACCENT}25`) — NOT a left-border like Problem/Difficulty; this is expository, not a narrative tension panel
- Lead sentence in `#e8e0d4`, body in `#a09898`
- `CORE_ARGUMENT` constant declared alongside the section's other string constants at the top of the component
- For the first section (no Problem panel): Core Idea appears immediately after the Header block
```

- [ ] **Step 2: Update the panel order string**

Find every occurrence of:
```
Header → The Problem → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer
```
Replace with:
```
Header → The Problem → The Core Idea → Main Visualization → Key Concepts → The Difficulty → Real-World Echoes → Footer
```
There are two occurrences: one in the "Required: Section Header Block" Rules list, one in the "Required: Interactive Key Concepts Section" Rules list.

- [ ] **Step 3: Update "Required: Consistent Panel Width"**

In the sentence "The Problem, Main Visualization, Key Concepts, The Difficulty, and Real-World Echoes panels must all line up...", add "The Core Idea" to the list:

```
The Problem, The Core Idea, Main Visualization, Key Concepts, The Difficulty, and Real-World Echoes panels must all line up at the same left and right edges.
```

- [ ] **Step 4: Add bug pattern entry**

In the "Recurring bug patterns" section, add this entry (after the "Missing or misplaced section header" entry):

```markdown
- **Missing or misplaced Core Idea panel** — every section must include a "The Core Idea" panel immediately after The Problem panel (or after the Header for the first section). Common failure modes: (1) panel absent entirely; (2) panel placed after the Main Visualization instead of before it; (3) `CORE_ARGUMENT` constant present but empty string, causing the guard to hide the panel. Fix by adding the standard Core Idea panel (see "Required: Core Idea Panel") with the `core_argument` value from `sections.json`.
```

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "Add Core Idea panel spec to CLAUDE.md"
```

---

## Task 2: Update `scripts/generate_viz.py`

**Files:**
- Modify: `scripts/generate_viz.py`

- [ ] **Step 1: Add panel 2 to `SYSTEM_PROMPT`**

In `SYSTEM_PROMPT`, find the required component structure section. It currently reads:

```
1. THE PROBLEM PANEL (immediately after the header)
...
2. MAIN VISUALIZATION (center, largest section)
```

Insert a new panel 2 between them and renumber the rest:

```
1. THE PROBLEM PANEL (immediately after the header)
   [existing content unchanged]

2. THE CORE IDEA PANEL (after The Problem / Header, before the main visualization)
   Source: the CORE_ARGUMENT constant (core_argument from section data), hardcoded at the top of the component.
   Guard: if CORE_ARGUMENT is falsy, omit the entire panel.
   Split CORE_ARGUMENT into lead and body:
     const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
     const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
     const coreIdBody = splitMatch ? splitMatch[2] : "";
   Style: border `1px solid ${ACCENT}25` (full border, NOT left-border), background rgba(0,0,0,0.3),
   borderRadius 8, padding "16px 20px", marginBottom 16.
   Label "The Core Idea": fontSize 11, letterSpacing 2, uppercase, color ACCENT, marginBottom 10.
   Lead: fontSize 15, color "#e8e0d4", lineHeight 1.6, margin "0 0 8px" (or 0 if no body).
   Body: fontSize 13, color "#a09898", lineHeight 1.75. Only render if coreIdBody is non-empty.
   For the FIRST section (no Problem panel): place Core Idea immediately after the Header block.

3. MAIN VISUALIZATION (center, largest section)
   [existing content, was 2]

4. KEY CONCEPTS PANEL (below main viz, above The Difficulty)
   [existing content, was 3]

5. THE DIFFICULTY PANEL (below Key Concepts)
   [existing content, was 4]

6. REAL-WORLD ECHOES PANEL (collapsible, bottom)
   [existing content, was 5]

7. SECTION FOOTER (required, after Real-World Echoes)
   [existing content, was 6]
```

- [ ] **Step 2: Add `CORE_ARGUMENT` to `SECTION_DATA_TEMPLATE`**

In `SECTION_DATA_TEMPLATE`, the section data block already contains `Core Argument: {core_argument}`. Verify this line exists. If present, no change needed — the value is already passed to the model.

> **Important:** Always use the 30-char minimum regex `/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/` everywhere this split appears — in CLAUDE.md, in the SYSTEM_PROMPT, and in the retrofit script. An earlier draft of the spec showed `/^(.+?[.!?])\s+.../` (no minimum length) which misfires on abbreviations — ignore that version.

- [ ] **Step 3: Add validation check to `validate_jsx`**

In `validate_jsx`, find the block of structural checks (e.g. the `"Key Concepts"` check, the `"Real-World Echoes"` check). Add after the existing checks:

```python
# Must have a Core Idea panel
if "The Core Idea" not in code:
    return False, "Missing Core Idea panel ('The Core Idea' label not found)"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/generate_viz.py
git commit -m "Add Core Idea panel to generation prompt and validation"
```

---

## Task 3: Update `.claude/commands/static-check.md`

**Files:**
- Modify: `.claude/commands/static-check.md`

- [ ] **Step 1: Read static-check.md to understand the check pattern**

Read `.claude/commands/static-check.md` to see how existing structural checks are expressed (e.g. the check for "Real-World Echoes", "Key Concepts", footer text).

- [ ] **Step 2: Add Core Idea check**

Following the same pattern as the existing structural checks, add:

```
- Grep for `"The Core Idea"` in each component file. Flag any component where the string is absent.
```

Place it alongside the other "required panel" checks.

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/static-check.md
git commit -m "Add Core Idea panel check to static-check command"
```

---

## Task 4: Verify new generation

- [ ] **Step 1: Clear one component and regenerate**

```bash
rm output/components/will_to_live_root_of_suffering.jsx
python scripts/generate_viz.py --only will_to_live_root_of_suffering
```

- [ ] **Step 2: Confirm "The Core Idea" panel is present**

```bash
grep -c "The Core Idea" output/components/will_to_live_root_of_suffering.jsx
```
Expected output: `1`

- [ ] **Step 3: Confirm panel is between Problem and main viz**

```bash
grep -n "The Problem\|The Core Idea\|Main Visualization\|MAIN VIZ\|const \[" output/components/will_to_live_root_of_suffering.jsx | head -20
```

Verify the line number for "The Core Idea" is between "The Problem" and the main visualization div.

- [ ] **Step 4: Confirm CORE_ARGUMENT split logic is present**

```bash
grep "splitMatch\|coreIdLead\|coreIdBody\|CORE_ARGUMENT" output/components/will_to_live_root_of_suffering.jsx
```
Expected: all four identifiers found.

- [ ] **Step 5: Commit if generation looks correct**

```bash
git add output/components/will_to_live_root_of_suffering.jsx
git commit -m "Verify: Core Idea panel generates correctly"
```

---

## Task 5: Write retrofit helper script for modern sites

Modern sites (hegel, aristotle) have per-section component files. Rather than editing 35 files manually, a helper script inserts the Core Idea panel into each component.

**Files:**
- Create: `scripts/retrofit_core_idea.py`

- [ ] **Step 1: Write `scripts/retrofit_core_idea.py`**

```python
#!/usr/bin/env python3
"""
Retrofits the Core Idea panel into existing per-section component files.

Usage:
  # Packaged site (slug shorthand):
  python scripts/retrofit_core_idea.py --site <slug>

  # Arbitrary paths (e.g. output/ working directory):
  python scripts/retrofit_core_idea.py \
    --components-dir output/components \
    --sections-file  output/sections.json

Skips:  components that already contain "The Core Idea"
"""
import argparse
import json
import os
import re
import sys

PANEL_TEMPLATE = """\n        {{/* The Core Idea */}}
        {{CORE_ARGUMENT && (
          <div style={{{{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${{ACCENT}}25`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
          }}}}>
            <div style={{{{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                          color: ACCENT, marginBottom: 10 }}}}>
              The Core Idea
            </div>
            <p style={{{{ fontSize: 15, color: "#e8e0d4", lineHeight: 1.6,
                        margin: coreIdBody ? "0 0 8px" : 0 }}}}>
              {{coreIdLead}}
            </p>
            {{coreIdBody && (
              <p style={{{{ fontSize: 13, color: "#a09898", lineHeight: 1.75, margin: 0 }}}}>
                {{coreIdBody}}
              </p>
            )}}
          </div>
        )}}"""

SPLIT_LOGIC = """
  const splitMatch = CORE_ARGUMENT.match(/^(.{{30,}}?[.!?])\\s+([A-Z][\\s\\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";
"""


def insert_constant(code: str, section: dict) -> str:
    """Add CORE_ARGUMENT constant and split logic near the top of the component."""
    core_arg = section.get("core_argument", "")
    escaped = core_arg.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    constant = f'\n  const CORE_ARGUMENT = `{escaped}`;\n'

    # Insert after the first useState or const declaration inside the component body.
    # Find the opening brace of the component function.
    match = re.search(r'(function\s+\w+\s*\([^)]*\)\s*\{|const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{)', code)
    if not match:
        print(f"  WARNING: could not find component function body; skipping constant insertion")
        return code

    insert_pos = match.end()
    return code[:insert_pos] + constant + SPLIT_LOGIC + code[insert_pos:]


def insert_panel(code: str, section: dict) -> str:
    """Insert the Core Idea panel div after The Problem panel (or after the header for part 1)."""
    is_first = section.get("part_number") == 1 or not section.get("problem_inherited")

    if is_first:
        # For part 1: insert after the header block closing div.
        # The header block ends before The Problem panel or before the main visualization.
        # Look for the end of the first major div group after the outer wrapper.
        # Heuristic: find the last </div> before the main visualization marker.
        # Use the "The Problem" absence — find the first major card div opening after header.
        # Insert before it, or before the main visualization comment if no Problem.
        target_pattern = r'(\{\/\*\s*(?:Main Viz|Main Visualization|MAIN|The Main|Visualization)\b)'
        match = re.search(target_pattern, code, re.IGNORECASE)
        if not match:
            # Fallback: insert before the first <svg or <canvas or recharts component after header
            match = re.search(r'(<(?:svg|canvas)\b)', code)
        if not match:
            print(f"  WARNING: could not find main visualization insertion point for part 1")
            return code
        return code[:match.start()] + PANEL_TEMPLATE + "\n\n        " + code[match.start():]
    else:
        # Find the closing of The Problem panel block and insert after it.
        # The Problem panel is a <div> that contains the label "The Problem".
        # Find "The Problem" text occurrence, then find the matching </div>.
        problem_match = re.search(r'The Problem', code)
        if not problem_match:
            print(f"  WARNING: 'The Problem' not found; skipping panel insertion")
            return code

        # Find the <div that opens The Problem card (search backwards from "The Problem" text)
        # This is brittle — use a comment marker if present, otherwise find the nearest {/* The Problem */}
        comment_match = re.search(r'\{\/\*\s*The Problem\s*\*\/\}', code)
        if not comment_match:
            print(f"  WARNING: The Problem comment block not found; skipping")
            return code

        # From the comment, find the opening <div and then its matching closing </div>
        search_from = comment_match.end()
        div_open = re.search(r'<div\s', code[search_from:])
        if not div_open:
            print(f"  WARNING: could not find The Problem <div; skipping")
            return code

        # Count div depth to find matching close
        div_start = search_from + div_open.start()
        depth = 0
        pos = div_start
        while pos < len(code):
            open_m = re.search(r'<div[\s>]', code[pos:])
            close_m = re.search(r'</div>', code[pos:])
            if not close_m:
                break
            if open_m and open_m.start() < close_m.start():
                depth += 1
                pos += open_m.end()
            else:
                if depth == 0:
                    close_end = pos + close_m.end()
                    return code[:close_end] + "\n" + PANEL_TEMPLATE + code[close_end:]
                depth -= 1
                pos += close_m.end()

        print(f"  WARNING: could not find closing </div> for The Problem panel; skipping")
        return code


def process_component(component_path: str, section: dict) -> bool:
    """Retrofit a single component. Returns True if modified."""
    with open(component_path, "r", encoding="utf-8") as f:
        code = f.read()

    if "The Core Idea" in code:
        print(f"  Skipping — Core Idea already present")
        return False

    code = insert_constant(code, section)
    code = insert_panel(code, section)

    with open(component_path, "w", encoding="utf-8") as f:
        f.write(code)
    return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", help="Site slug shorthand (e.g. hegel-philosophical-system)")
    parser.add_argument("--components-dir", help="Direct path to components directory")
    parser.add_argument("--sections-file", help="Direct path to sections.json")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be done without modifying files")
    args = parser.parse_args()

    if args.site:
        base = os.path.join("sites", args.site)
        sections_path = os.path.join(base, "src", "sections.json")
        components_dir = os.path.join(base, "src", "components")
    elif args.components_dir and args.sections_file:
        sections_path = args.sections_file
        components_dir = args.components_dir
    else:
        print("ERROR: provide either --site or both --components-dir and --sections-file", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(sections_path):
        print(f"ERROR: {sections_path} not found — is this a modern site?", file=sys.stderr)
        sys.exit(1)
    if not os.path.exists(components_dir):
        print(f"ERROR: {components_dir} not found — is this a modern site?", file=sys.stderr)
        sys.exit(1)

    data = json.load(open(sections_path))
    sections = data["sections"]
    print(f"Retrofitting Core Idea panel into {len(sections)} components in {base}/src/components/")

    modified = 0
    for section in sections:
        sid = section["id"]
        path = os.path.join(components_dir, f"{sid}.jsx")
        if not os.path.exists(path):
            print(f"  WARNING: {sid}.jsx not found — skipping")
            continue
        print(f"  Part {section['part_number']:>2}: {sid}")
        if not args.dry_run:
            if process_component(path, section):
                modified += 1
        else:
            print(f"    [dry-run] would retrofit")

    print(f"\nDone. {modified} components modified.")
    if modified > 0:
        if args.site:
            print(f"\nNext step: reassemble and build:")
            print(f"  python scripts/assemble.py \\")
            print(f"    --components-dir sites/{args.site}/src/components \\")
            print(f"    --sections-file  sites/{args.site}/src/sections.json \\")
            print(f"    --output         sites/{args.site}/src/App.jsx")
            print(f"  cd sites/{args.site} && npm run build")
        else:
            print(f"\nNext step: reassemble:")
            print(f"  python scripts/assemble.py")
            print(f"Then run /package to archive the site.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Commit**

```bash
git add scripts/retrofit_core_idea.py
git commit -m "Add retrofit_core_idea.py helper script for modern sites"
```

---

## Task 6: Retrofit current `output/` working directory

The Schopenhauer site currently in `output/` was generated before the Core Idea panel was added. Retrofit it before packaging so it gets the panel without a full (costly) regeneration.

**Files:**
- Modify: `output/components/*.jsx` (20 files)
- Regenerate: `output/visualizations.jsx`

- [ ] **Step 1: Run retrofit script against output/**

```bash
python scripts/retrofit_core_idea.py \
  --components-dir output/components \
  --sections-file  output/sections.json
```
Expected: 20 components modified, none skipped.

- [ ] **Step 2: Spot-check one component**

```bash
SAMPLE=$(ls output/components/*.jsx | head -1)
grep -c "CORE_ARGUMENT\|coreIdLead\|coreIdBody\|The Core Idea" "$SAMPLE"
```
Expected: `4`

- [ ] **Step 3: Reassemble**

```bash
python scripts/assemble.py
```

- [ ] **Step 4: Verify in devserver**

Start or restart the devserver and confirm the Core Idea panel appears between The Problem and the main visualization in at least two sections:
```bash
cd devserver && npm run dev
```
Open http://localhost:5173 and check Part 1 and one middle section.

- [ ] **Step 5: Package when satisfied**

Run `/package` to archive the Schopenhauer site under `sites/`, build to `docs/`, and update the site index.

---

## Task 7: Retrofit `hegel-philosophical-system` (modern, 20 sections)

**Files:**
- Modify: `sites/hegel-philosophical-system/src/components/*.jsx` (20 files)
- Regenerate: `sites/hegel-philosophical-system/src/App.jsx`

- [ ] **Step 1: Dry-run to preview**

```bash
python scripts/retrofit_core_idea.py --site hegel-philosophical-system --dry-run
```
Expected: 20 components listed, none skipped.

- [ ] **Step 2: Run retrofit**

```bash
python scripts/retrofit_core_idea.py --site hegel-philosophical-system
```

- [ ] **Step 3: Spot-check 2-3 components**

```bash
# Pick any component file from the directory
SAMPLE=$(ls sites/hegel-philosophical-system/src/components/*.jsx | head -1)
grep -A 5 "The Core Idea" "$SAMPLE"
grep -c "CORE_ARGUMENT\|coreIdLead\|coreIdBody" "$SAMPLE"
```
Expected: 3 identifiers found per component.

- [ ] **Step 4: Reassemble**

```bash
python scripts/assemble.py \
  --components-dir sites/hegel-philosophical-system/src/components \
  --sections-file  sites/hegel-philosophical-system/src/sections.json \
  --output         sites/hegel-philosophical-system/src/App.jsx
```

- [ ] **Step 5: Build**

```bash
cd sites/hegel-philosophical-system && npm run build
```
Expected: build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add sites/hegel-philosophical-system/src/
git commit -m "Retrofit Core Idea panel — hegel-philosophical-system"
```

---

## Task 8: Retrofit `aristotle-philosophy-science-legacy` (modern, 15 sections)

Same process as Task 7.

**Files:**
- Modify: `sites/aristotle-philosophy-science-legacy/src/components/*.jsx` (15 files)
- Regenerate: `sites/aristotle-philosophy-science-legacy/src/App.jsx`

- [ ] **Step 1: Dry-run**

```bash
python scripts/retrofit_core_idea.py --site aristotle-philosophy-science-legacy --dry-run
```

- [ ] **Step 2: Run retrofit**

```bash
python scripts/retrofit_core_idea.py --site aristotle-philosophy-science-legacy
```

- [ ] **Step 3: Spot-check**

```bash
grep -c "CORE_ARGUMENT\|coreIdLead\|coreIdBody" sites/aristotle-philosophy-science-legacy/src/components/aristotle_introduction.jsx
```
Expected: `3`

- [ ] **Step 4: Reassemble and build**

```bash
python scripts/assemble.py \
  --components-dir sites/aristotle-philosophy-science-legacy/src/components \
  --sections-file  sites/aristotle-philosophy-science-legacy/src/sections.json \
  --output         sites/aristotle-philosophy-science-legacy/src/App.jsx
cd sites/aristotle-philosophy-science-legacy && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add sites/aristotle-philosophy-science-legacy/src/
git commit -m "Retrofit Core Idea panel — aristotle-philosophy-science-legacy"
```

---

## Task 9: Retrofit legacy sites (ontology, kant, spinoza)

Legacy sites have no `src/components/` or `src/sections.json` — only `src/App.jsx`. The retrofit script cannot be used. These sites need the `core_argument` values re-sourced.

**Approach for each legacy site:**

1. Find the YouTube URL in `sites/<slug>/README.md`
2. Re-run `parse_sections.py` against that URL to get a fresh `sections.json` with `core_argument` values:
   ```bash
   python scripts/fetch_transcript.py <youtube-url>
   python scripts/parse_sections.py
   # This writes output/sections.json
   ```
3. Edit `sites/<slug>/src/App.jsx` directly — for each section component in the file, add:
   - `CORE_ARGUMENT` constant (value from `output/sections.json` for that section's `id`)
   - `splitMatch` / `coreIdLead` / `coreIdBody` split logic
   - The Core Idea panel JSX between The Problem (or Header) and the main visualization
4. Build: `cd sites/<slug> && npm run build`

**Files:**
- Modify: `sites/ontology-the-hidden-operating-system/src/App.jsx`
- Modify: `sites/kant-copernican-revolution/src/App.jsx`
- Modify: `sites/spinoza-philosophy/src/App.jsx`

> **Note:** `ontology` has ~35 sections in a single file — this is a large edit. Consider doing it section by section with builds between to catch errors early.

- [ ] **Step 1: Retrofit ontology**

```bash
# Get core_argument values
python scripts/fetch_transcript.py $(grep "YouTube URL" sites/ontology-the-hidden-operating-system/README.md | grep -oP 'https://[^\s]+')
python scripts/parse_sections.py
# Edit sites/ontology-the-hidden-operating-system/src/App.jsx
cd sites/ontology-the-hidden-operating-system && npm run build
```

- [ ] **Step 2: Commit ontology**

```bash
git add sites/ontology-the-hidden-operating-system/src/App.jsx
git commit -m "Retrofit Core Idea panel — ontology-the-hidden-operating-system"
```

- [ ] **Step 3: Retrofit kant**

```bash
python scripts/fetch_transcript.py $(grep "YouTube URL" sites/kant-copernican-revolution/README.md | grep -oP 'https://[^\s]+')
python scripts/parse_sections.py
# Edit sites/kant-copernican-revolution/src/App.jsx
cd sites/kant-copernican-revolution && npm run build
```

- [ ] **Step 4: Commit kant**

```bash
git add sites/kant-copernican-revolution/src/App.jsx
git commit -m "Retrofit Core Idea panel — kant-copernican-revolution"
```

- [ ] **Step 5: Retrofit spinoza**

```bash
python scripts/fetch_transcript.py $(grep "YouTube URL" sites/spinoza-philosophy/README.md | grep -oP 'https://[^\s]+')
python scripts/parse_sections.py
# Edit sites/spinoza-philosophy/src/App.jsx
cd sites/spinoza-philosophy && npm run build
```

- [ ] **Step 6: Commit spinoza**

```bash
git add sites/spinoza-philosophy/src/App.jsx
git commit -m "Retrofit Core Idea panel — spinoza-philosophy"
```

---

## Task 10: Push and update docs index

- [ ] **Step 1: Push all commits**

```bash
git push
```

- [ ] **Step 2: Verify GitHub Pages builds**

Check https://TheUlukai.github.io/youtube-visualiser/ loads correctly and each site shows the Core Idea panel.

- [ ] **Step 3: Update docs/index.html if any build dates changed**

If any legacy site's build output changed significantly, no index update is needed — the index only links to sites, not sections.

---

## Notes for implementer

- **If the retrofit script misses a component** (warning printed), edit that component manually using the panel pattern from the spec.
- **If a build fails after retrofit**, check the specific component for malformed JSX — the script's div-counting heuristic can misplace the insertion if the Problem panel has unusual nesting. Fix the component manually and reassemble.
- **Legacy sites are the most error-prone** — App.jsx files are large (~2000–8000 lines). Work section by section and run a build after every 5 sections to catch errors early.
- **`core_argument` values from re-running `parse_sections.py`** may differ slightly from the original parse (the LLM is non-deterministic). This is acceptable — the content will be similar.
