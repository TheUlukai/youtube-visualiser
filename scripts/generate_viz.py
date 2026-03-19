#!/usr/bin/env python3
"""
Generate React visualization components for each section using Claude Sonnet 4.6.
Usage: python scripts/generate_viz.py [--start N] [--only ID]
Reads:  output/sections.json
Writes: output/components/{id}.jsx
"""

import argparse
import json
import os
import re
import sys
import time
import anthropic

SECTIONS_PATH = os.path.join(os.path.dirname(__file__), "..", "output", "sections.json")
COMPONENTS_DIR = os.path.join(os.path.dirname(__file__), "..", "output", "components")
MODEL = "claude-sonnet-4-6"
DELAY_BETWEEN_CALLS = 2.0  # seconds

SYSTEM_PROMPT = """You are an expert React developer and data visualization designer.
You write self-contained, interactive React components that make abstract ideas viscerally understandable.

STRICT OUTPUT RULES — violate any of these and the output is unusable:
- Return ONLY the JSX source code. No markdown, no code fences, no explanation.
- The component must be a named function (e.g. function OntologyIntro() { ... })
- The final line must be: export default ComponentName
- No imports — React hooks (useState, useEffect, useRef, useCallback) are available as globals.
  recharts components are available as globals (BarChart, LineChart, etc).
  lucide-react icons are available as globals (ChevronDown, ChevronUp, etc).
- Use only inline styles (style={{...}}). No className, no Tailwind, no CSS.
- Use hex colors only — never rgb(), rgba(), or named colors.
- Use Georgia serif font throughout (fontFamily: "Georgia, serif").
- Unicode characters must be typed directly — never \\uNNNN escape sequences.
- No placeholder comments like "// add visualization here". Every section must be fully implemented.

RESPONSIVE LAYOUT RULES — components must look correct on screens as narrow as 375px (iPhone):
- Font sizes: always use clamp() — e.g. clamp(12px, 1.8vw, 15px) for body text,
  clamp(18px, 3vw, 28px) for headings. Never use a bare px font size.
- SVG diagrams: always set viewBox="0 0 W H" and width="100%" with a maxWidth style.
  Never use a fixed pixel width or height attribute on an <svg> element.
- Canvas elements: derive width and height from the container in a useEffect via
  ResizeObserver (or container.offsetWidth). Never pass fixed pixel values as JSX
  width/height props on a <canvas> element.
- Content wrappers: the inner centering div must use maxWidth: "min(90vw, 860px)"
  (not a bare pixel value like maxWidth: 860). This has no effect on wide desktops.
- No hardcoded widths wider than 340px except inside a maxWidth-constrained container."""

VIZ_PROMPT_TEMPLATE = """Generate a self-contained interactive React visualization component for this section of an educational series on {series_topic}.

=== SECTION DATA ===
Part: {part_number} of {total_sections}
ID: {id}
Title: {title}
Subtitle: {subtitle}
Key Concepts: {key_concepts}
Core Argument: {core_argument}
Problem Inherited (what came before that this section answers): {problem_inherited}
Solution (how this section resolves it): {solution}
Problem Created (what new tension this section leaves open): {problem_created}
Real-World Examples: {real_world_examples}
Visualization Suggestion: {visualization_suggestion}
Accent Color: {accent_color}
Background Mood: {background_mood}

=== REQUIRED STRUCTURE ===
The component MUST contain these layers in order:

0. SECTION HEADER (very first element, before everything else)
   A centred title block:
     <div style={{ textAlign: "center", marginBottom: 32 }}>
       <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "{accent_color}", marginBottom: 8 }}>
         Part {part_number} of {total_sections} — [Series Name]
       </div>
       <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
         [Section Title]
       </h1>
       <p style={{ fontSize: 15, color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
         [One-sentence framing]
       </p>
     </div>
   This block is MANDATORY — never omit it, never move it below The Problem panel.

1. THE PROBLEM PANEL (immediately after the header){problem_panel_instruction}
   Style: dark card with a subtle left border in the accent color. Label "The Problem" in small caps.
   The text should convey urgency — this is the pressure that forced this idea into existence.

2. MAIN VISUALIZATION (center, largest section)
   This is the heart of the component. Implement the visualization_suggestion faithfully.
   Make it genuinely interactive: clickable elements, hover states, expandable details, toggles,
   animated transitions. Use SVG for diagrams and structural visuals. Use Canvas (via useRef +
   useEffect) for animations or particle effects. Use recharts for any data that benefits from
   charts. The visualization must illuminate the core_argument — not just decorate it.

3. KEY CONCEPTS PANEL (below main viz, above The Difficulty)
   MANDATORY — this panel must always be present. No exceptions.
   PLACEMENT: This must be a TOP-LEVEL SIBLING element — rendered at the same JSX level as the
   main viz card and The Difficulty card. Never nest it inside the main visualization card.
   WRAPPER: wrap the entire Key Concepts section in its own card div:
     <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${'{accent_color}'}33`,
       borderRadius: 8, padding: "clamp(16px, 3vw, 24px)", marginBottom: 16 }}>
   State: const [hoveredConcept, setHoveredConcept] = useState(null);
   Data: a `keyConcepts` array of 4–6 objects with shape {{ id, label, desc }} where desc is
   a substantive 2–3 sentence explanation of the concept in context (not just a definition).
   Render a row of pill buttons. Clicking a pill toggles a description panel below the row.
   Use onClick to toggle (NOT onMouseEnter — hover causes layout jitter).
   The description panel renders as a <div> below the pills, never inside SVG.
   Active pill background: {accent_color}; active pill text: "#f0ead8".
   Label the section "Key Concepts — Click to Explore" in small caps using {accent_color}.
   IMPORTANT: every color in this panel — label, pill borders, active pill background, hover
   popup border — must derive from {accent_color}. Never use a color from a different section.

4. THE DIFFICULTY PANEL (below Key Concepts)
   Show problem_created — the new tension this idea generates.
   Style: dark card with borderLeft: "4px solid {accent_color}" — the SAME accent color as The Problem
   panel and the Key Concepts panel. Never use a different hue or shade here. Label "The Difficulty"
   in small caps using the accent color. End with "This pressure forces the next development..."

5. REAL-WORLD ECHOES PANEL (collapsible, bottom)
   A collapsible section using ChevronDown/ChevronUp from lucide-react. Collapsed by default.
   Label "Real-World Echoes" in small caps (fontSize 10, letterSpacing 3, textTransform uppercase).
   Shows real_world_examples as 3–4 titled cards. Each card MUST have a bold title and a body paragraph.

   Required card format — use this exactly:
     borderLeft: "3px solid ACCENT"
     borderRadius: "0 6px 6px 0"
     background: ACCENT + "0a"   (i.e. hex accent color + "0a" for ~4% opacity)
     padding: "14px 18px"
     title: fontSize 13, fontWeight "bold", color ACCENT_LIGHT, marginBottom 6
     body: fontSize 13, color "#b8b0a8", lineHeight 1.7, margin 0

   Always use a single flex column (flexDirection "column", gap 14) — never a grid.
   No hover effects on cards. No emoji icons. No per-card accent color variation.
   The toggle button uses a plain <button> (width "100%", background transparent, border none).

=== STYLE GUIDELINES ===
- Background: radial gradient from a dark version of the accent color to near-black (#0a0a0f)
- All text: Georgia serif
- Accent color for borders, highlights, glows: {accent_color}
- Overall mood: {background_mood}
- Padding: generous (24-40px). Cards: semi-transparent dark backgrounds with subtle borders.
- Interactive elements: cursor pointer, hover glow or color shift using onMouseEnter/onMouseLeave state.
- No bullet lists in descriptive text — use prose paragraphs or flowing layout.
- The component should feel like a polished interactive essay, not a dashboard.
- Responsive: clamp() for all font sizes; SVG always viewBox + width="100%"; canvas
  dimensions set via ResizeObserver in useEffect; content wrapper maxWidth "min(90vw, 860px)".
- COLOR CONSISTENCY: {accent_color} is the ONE accent for this section. Every structural
  element — Problem borderLeft, KC label and pill colors, Difficulty borderLeft and label,
  RWE label and card borderLeft — must use {accent_color} (or a lighter/darker tint of it
  for readability). Never introduce a different hue for any of these elements. Lighter tints
  (e.g. {accent_color} + "99" for labels) are fine; a completely different color is not.
  The RWE button label <span> must have an explicit color: {accent_color} — never inherit.
- CONSISTENT PANEL WIDTH: every panel (Header, Problem, Main Viz, Key Concepts, Difficulty,
  Real-World Echoes) must appear the same visual width. Achieve this by placing all panels inside
  a single inner wrapper: <div style={{{{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}}}>
  Never let Problem or Difficulty cards span full viewport width while other panels are constrained.
  Never mix margin-based side offsets on some panels with maxWidth wrappers on others.

=== COMPONENT NAMING ===
Name the function: {component_name}
Last line must be: export default {component_name}

Generate the complete component now:"""


def build_prompt(section: dict, total_sections: int, series_topic: str) -> str:
    part = section["part_number"]
    is_first = part == 1 or section.get("problem_inherited") is None

    if is_first:
        problem_panel_instruction = (
            "\n   This is the first section — omit The Problem panel entirely."
        )
    else:
        problem_panel_instruction = (
            f"\n   Show: \"{section.get('problem_inherited', '')}\"\n"
            "   This panel MUST be present."
        )

    key_concepts = ", ".join(section.get("key_concepts") or [])
    real_world = "; ".join(section.get("real_world_examples") or []) or "None provided"

    # Convert id to PascalCase component name
    words = re.split(r"[_\-\s]+", section["id"])
    component_name = "".join(w.capitalize() for w in words if w)

    return VIZ_PROMPT_TEMPLATE.format(
        series_topic=series_topic,
        total_sections=total_sections,
        part_number=part,
        id=section["id"],
        title=section["title"],
        subtitle=section["subtitle"],
        key_concepts=key_concepts,
        core_argument=section.get("core_argument", ""),
        problem_inherited=section.get("problem_inherited") or "N/A",
        solution=section.get("solution") or "N/A",
        problem_created=section.get("problem_created", ""),
        real_world_examples=real_world,
        visualization_suggestion=section.get("visualization_suggestion", ""),
        accent_color=section["accent_color"],
        background_mood=section.get("background_mood", ""),
        problem_panel_instruction=problem_panel_instruction,
        component_name=component_name,
    ), component_name


def validate_jsx(code: str, component_name: str) -> tuple[bool, str]:
    """Basic structural validation of the generated JSX."""
    code = code.strip()
    if not code:
        return False, "Empty response"

    # Must define the component function
    if f"function {component_name}" not in code and f"const {component_name}" not in code:
        return False, f"Missing component definition 'function {component_name}'"

    # Must end with export default
    if f"export default {component_name}" not in code:
        return False, f"Missing 'export default {component_name}'"

    # Must have a return with JSX (look for return ()
    if "return (" not in code and "return(" not in code:
        return False, "No JSX return statement found"

    # Must have interactive Key Concepts panel
    if "hoveredConcept" not in code:
        return False, "Missing interactive Key Concepts panel (no hoveredConcept state found)"

    # Must have a centred section header
    if "textAlign" not in code or ("center" not in code and '"center"' not in code):
        return False, "Missing centred section header (no textAlign: 'center' found)"
    if "Part " not in code:
        return False, "Missing section header — no 'Part N of M' label found"

    # Must have Real-World Echoes panel with collapsible state
    if "echoes" not in code.lower() and "echos" not in code.lower():
        return False, "Missing Real-World Echoes panel"

    # RWE cards must use borderLeft (not just border)
    # Look for the pattern near "Real-World Echoes" — rough heuristic
    if 'borderLeft: "3px solid' not in code and "borderLeft: `3px solid" not in code:
        return False, "RWE cards missing borderLeft accent stripe (must use borderLeft: '3px solid ACCENT')"

    # Check for banned patterns
    if "\\u" in code:
        return False, "Contains \\uNNNN unicode escape sequences (use literal unicode)"
    if "className=" in code:
        return False, "Contains className (use inline styles only)"

    # Check balanced braces (rough heuristic)
    open_braces = code.count("{")
    close_braces = code.count("}")
    if abs(open_braces - close_braces) > 3:
        return False, f"Severely unbalanced braces ({open_braces} open, {close_braces} close)"

    return True, ""


def strip_fences(text: str) -> str:
    """Remove markdown code fences if present."""
    text = text.strip()
    match = re.match(r"^```(?:jsx?|javascript|tsx?)?\s*([\s\S]*?)\s*```$", text)
    if match:
        return match.group(1).strip()
    return text


def generate_component(
    client: anthropic.Anthropic,
    section: dict,
    total_sections: int,
    series_topic: str,
    retry_error: str = None,
) -> tuple[str, str]:
    """Call Claude and return (code, component_name). Raises on failure."""
    prompt, component_name = build_prompt(section, total_sections, series_topic)

    if retry_error:
        prompt += (
            f"\n\n=== RETRY NOTE ===\nYour previous attempt failed validation with this error:\n"
            f"{retry_error}\nPlease fix this specific issue in your new response."
        )

    full_text = ""
    with client.messages.stream(
        model=MODEL,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    ) as stream:
        for chunk in stream.text_stream:
            full_text += chunk

        final = stream.get_final_message()

    if final.stop_reason == "max_tokens":
        raise RuntimeError("Response truncated (max_tokens). Component will be incomplete.")

    code = strip_fences(full_text)
    return code, component_name


def process_section(
    client: anthropic.Anthropic,
    section: dict,
    output_dir: str,
    total_sections: int,
    series_topic: str,
) -> bool:
    """Generate, validate, and save a component. Returns True on success."""
    sid = section["id"]
    part = section["part_number"]
    label = f"Part {part:>2}: {section['title']} [{sid}]"
    out_path = os.path.join(output_dir, f"{sid}.jsx")

    print(f"\n{label}")

    # Skip if already generated (within the same run — components/ is cleared by run.sh on fresh runs)
    if os.path.exists(out_path):
        print(f"  Skipping — {sid}.jsx already exists.")
        return True

    # First attempt
    try:
        code, component_name = generate_component(client, section, total_sections, series_topic)
    except Exception as e:
        print(f"  ERROR generating: {e}", file=sys.stderr)
        return False

    valid, err = validate_jsx(code, component_name)

    if not valid:
        print(f"  Validation failed: {err}")
        print(f"  Retrying with error context...")
        time.sleep(DELAY_BETWEEN_CALLS)
        try:
            code, component_name = generate_component(client, section, total_sections, series_topic, retry_error=err)
        except Exception as e:
            print(f"  ERROR on retry: {e}", file=sys.stderr)
            return False
        valid, err = validate_jsx(code, component_name)
        if not valid:
            print(f"  Retry also failed validation: {err}", file=sys.stderr)
            # Save anyway with a warning comment prepended
            code = f"// VALIDATION WARNING: {err}\n\n" + code

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(code)

    tokens_note = ""
    print(f"  Saved {sid}.jsx ({len(code):,} chars){tokens_note}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Generate React visualization components")
    parser.add_argument("--start", type=int, default=1,
                        help="Start from this part number (inclusive)")
    parser.add_argument("--only", type=str, default=None,
                        help="Generate only the section with this ID")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(SECTIONS_PATH):
        print(f"Error: {SECTIONS_PATH} not found. Run parse_sections.py first.", file=sys.stderr)
        sys.exit(1)

    with open(SECTIONS_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    sections = data["sections"]
    total_sections = len(sections)
    # Derive topic from sections.json metadata or fall back to the first section title
    series_topic = data.get("topic") or data.get("title") or sections[0].get("title", "this subject")
    print(f"Loaded {total_sections} sections from sections.json. Topic: {series_topic}")

    # Filter sections
    if args.only:
        # Accept either a section ID string or a part number integer
        if args.only.isdigit():
            sections = [s for s in sections if s["part_number"] == int(args.only)]
            if not sections:
                print(f"Error: No section with part number {args.only} found.", file=sys.stderr)
                sys.exit(1)
        else:
            sections = [s for s in sections if s["id"] == args.only]
            if not sections:
                print(f"Error: No section with id '{args.only}' found.", file=sys.stderr)
                sys.exit(1)
    elif args.start > 1:
        sections = [s for s in sections if s["part_number"] >= args.start]
        print(f"Starting from part {args.start} ({len(sections)} sections remaining).")

    os.makedirs(COMPONENTS_DIR, exist_ok=True)

    client = anthropic.Anthropic(api_key=api_key, max_retries=2)

    successes, failures = 0, 0
    for i, section in enumerate(sections):
        process_section(client, section, COMPONENTS_DIR, total_sections, series_topic)

        # Rate limit delay between calls (not after the last one)
        if i < len(sections) - 1:
            time.sleep(DELAY_BETWEEN_CALLS)

        successes += 1

    print(f"\nDone. {successes} components generated in {COMPONENTS_DIR}/")
    if failures:
        print(f"  {failures} failures — check stderr output above.")


if __name__ == "__main__":
    main()
