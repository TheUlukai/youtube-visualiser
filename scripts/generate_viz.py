#!/usr/bin/env python3
"""
Generate React visualization components for each section using Claude Sonnet 4.6.
Usage: python scripts/generate_viz.py [--start N] [--only ID]
Reads:  output/sections.json
Writes: output/components/{id}.jsx
"""

import argparse
import asyncio
import json
import os
import re
import sys
import time
import anthropic

SECTIONS_PATH = os.path.join(os.path.dirname(__file__), "..", "output", "sections.json")
COMPONENTS_DIR = os.path.join(os.path.dirname(__file__), "..", "output", "components")
MODEL = "claude-sonnet-4-6"
MAX_CONCURRENCY = 2  # max parallel API calls — tune with --concurrency

# Pricing per million tokens (claude-sonnet-4-6, as of 2026-03)
# Update these if Anthropic changes rates.
PRICE_INPUT          = 3.00   # $/MTok  — normal input
PRICE_OUTPUT         = 15.00  # $/MTok  — output
PRICE_CACHE_WRITE    = 3.75   # $/MTok  — cache creation (1.25× input)
PRICE_CACHE_READ     = 0.30   # $/MTok  — cache read    (0.10× input)


def tokens_to_cost(input: int, output: int,
                   cache_write: int, cache_read: int) -> float:
    return (
        input       * PRICE_INPUT        / 1_000_000
        + output    * PRICE_OUTPUT       / 1_000_000
        + cache_write * PRICE_CACHE_WRITE / 1_000_000
        + cache_read  * PRICE_CACHE_READ  / 1_000_000
    )

# Large static prompt — moved to system so it is cached across all section calls.
# Dynamic per-section values are described generically here; they are supplied in
# the user message via the SECTION_DATA_TEMPLATE below.
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
- No hardcoded widths wider than 340px except inside a maxWidth-constrained container.

=== REQUIRED COMPONENT STRUCTURE ===
Every component must contain these layers in this exact order. All panels must share
the same visual width via a single inner wrapper:
  <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

0. SECTION HEADER (very first element, before everything else)
   A centred title block placed BEFORE The Problem panel. MANDATORY — never omit or move it.
     <div style={{ textAlign: "center", marginBottom: 32 }}>
       <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                     color: ACCENT, marginBottom: 8 }}>
         Part N of M — Series Title
       </div>
       <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal",
                    color: TITLE_COLOR, margin: "0 0 8px 0" }}>
         Section Title
       </h1>
       <p style={{ fontSize: 15, color: SUBTITLE_COLOR, margin: 0,
                   lineHeight: 1.6, fontStyle: "italic" }}>
         One-sentence framing of what this section is about.
       </p>
     </div>
   Rules: textAlign "center" on outer wrapper. Order is always Header → Problem → Main Viz →
   Key Concepts → Difficulty → Real-World Echoes → Footer. h1 uses fontWeight "normal".

1. THE PROBLEM PANEL (immediately after the header)
   Show the problem_inherited from the section data — the tension this section is responding to.
   If this is the first section (problem_inherited is null/absent), omit this panel entirely.
   Style: dark card with a subtle left border in the section's accent color. Label "The Problem"
   in small caps. Text should convey urgency — this is the pressure that forced the idea into existence.

2. MAIN VISUALIZATION (center, largest section)
   Implement the visualization_suggestion faithfully. Make it genuinely interactive: clickable
   elements, hover states, expandable details, toggles, animated transitions.
   Use SVG for diagrams. Use Canvas (useRef + useEffect + ResizeObserver) for animations.
   Use recharts for data that benefits from charts. The visualization must illuminate the
   core_argument — not just decorate it.

3. KEY CONCEPTS PANEL (below main viz, above The Difficulty)
   MANDATORY — always present, no exceptions.
   PLACEMENT: top-level sibling element at the same JSX level as the main viz card and
   The Difficulty card. Never nest it inside the main visualization card.
   WRAPPER: wrap in its own card div:
     <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${ACCENT}33`,
       borderRadius: 8, padding: "clamp(16px, 3vw, 24px)", marginBottom: 16 }}>
   State: const [hoveredConcept, setHoveredConcept] = useState(null);
   Data: a `keyConcepts` array of 4–6 objects with shape { id, label, desc } where desc is
   a substantive 2–3 sentence explanation in context (not just a definition).
   Render a row of pill buttons. Clicking a pill toggles a description panel below the row.
   Use onClick to toggle (NOT onMouseEnter — hover causes layout jitter).
   Description panel renders as a <div> below the pills, never inside SVG.
   Active pill background: section's accent color; active pill text: "#f0ead8".
   Label: "Key Concepts — Click to Explore" in small caps using the section's accent color.
   IMPORTANT: every color in this panel — label, pill borders, active pill background, popup
   border — must derive from the section's accent color. Never use a color from another section.

4. THE DIFFICULTY PANEL (below Key Concepts)
   Show problem_created — the new tension this idea generates.
   Style: dark card with borderLeft: "4px solid ACCENT" — the SAME accent color as The Problem
   panel and Key Concepts panel. Never use a different hue here. Label "The Difficulty" in
   small caps using the accent color. End with "This pressure forces the next development..."

5. REAL-WORLD ECHOES PANEL (collapsible, bottom)
   A collapsible section using ChevronDown/ChevronUp from lucide-react. Collapsed by default.
   Label "Real-World Echoes" in small caps (fontSize 10, letterSpacing 3, textTransform uppercase).
   Shows real_world_examples as 3–4 titled cards. Each card MUST have a bold title and a body paragraph.

   Required card format:
     borderLeft: "3px solid ACCENT"
     borderRadius: "0 6px 6px 0"
     background: ACCENT + "0a"
     padding: "14px 18px"
     title: fontSize 13, fontWeight "bold", color ACCENT_LIGHT, marginBottom 6
     body: fontSize 13, color "#b8b0a8", lineHeight 1.7, margin 0

   Always use a single flex column (flexDirection "column", gap 14) — never a grid.
   No hover effects on cards. No emoji icons. No per-card accent color variation.
   The toggle button: plain <button> (width "100%", background transparent, border none).
   The "Real-World Echoes" <span> inside the button must have an explicit color set to
   the section's accent color — never rely on inheritance.

6. SECTION FOOTER (required, after Real-World Echoes)
   The very last element inside the inner maxWidth wrapper:
     <div style={{ textAlign: "center", marginTop: 36, fontSize: 12,
                   color: ACCENT_DIM, letterSpacing: 1 }}>
       Part N of M — Series Title
     </div>
   ACCENT_DIM is the section accent at ~30–40% brightness (a very dark tint, not transparent).
   Use the series title exactly as given in the section data — never a section-specific subtitle.
   The footer text must be identical across all sections of the same series.

=== STYLE GUIDELINES ===
- Background: radial gradient from a dark version of the section's accent color to near-black (#0a0a0f)
- All text: Georgia serif
- Accent color for borders, highlights, glows: the section's accent_color field
- Overall mood: the section's background_mood field
- Padding: generous (24-40px). Cards: semi-transparent dark backgrounds with subtle borders.
- Interactive elements: cursor pointer, hover glow or color shift via onMouseEnter/onMouseLeave state.
- No bullet lists in descriptive text — use prose paragraphs or flowing layout.
- The component should feel like a polished interactive essay, not a dashboard.
- Responsive: clamp() for all font sizes; SVG always viewBox + width="100%"; canvas dimensions
  set via ResizeObserver in useEffect; content wrapper maxWidth "min(90vw, 860px)".
- COLOR CONSISTENCY: the section's accent_color is the ONE accent for that section. Every
  structural element — Problem borderLeft, KC label and pill colors, Difficulty borderLeft
  and label, RWE label and card borderLeft — must use that accent (or a lighter/darker tint
  for readability). Never introduce a different hue. Lighter tints (e.g. ACCENT + "99") are
  fine; a completely different color is not.
- CONSISTENT PANEL WIDTH: every panel (Header, Problem, Main Viz, Key Concepts, Difficulty,
  Real-World Echoes, Footer) must appear the same visual width inside the single inner wrapper.
  Never let Problem or Difficulty cards span full viewport width while other panels are constrained.
"""

# Small dynamic template — only the per-section data that changes each call.
SECTION_DATA_TEMPLATE = """Generate a self-contained interactive React visualization component for this section of an educational series on {series_topic}.

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
{problem_panel_note}
=== COMPONENT NAMING ===
Function name: {component_name}
Last line must be: export default {component_name}

Generate the complete component now:"""


def build_prompt(section: dict, total_sections: int, series_topic: str) -> tuple[str, str]:
    part = section["part_number"]
    is_first = part == 1 or section.get("problem_inherited") is None

    if is_first:
        problem_panel_note = "Note: this is the first section — omit The Problem panel entirely."
    else:
        problem_panel_note = (
            f"Note: The Problem panel MUST be present. "
            f"Show: \"{section.get('problem_inherited', '')}\""
        )

    key_concepts = ", ".join(section.get("key_concepts") or [])
    rwe_raw = section.get("real_world_examples") or []
    rwe_parts = []
    for item in rwe_raw:
        if isinstance(item, dict):
            rwe_parts.append(f"{item.get('title', '')}: {item.get('explanation', '')}")
        else:
            rwe_parts.append(str(item))
    real_world = "; ".join(rwe_parts) or "None provided"

    # Convert id to PascalCase component name
    words = re.split(r"[_\-\s]+", section["id"])
    component_name = "".join(w.capitalize() for w in words if w)

    prompt = SECTION_DATA_TEMPLATE.format(
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
        problem_panel_note=problem_panel_note,
        component_name=component_name,
    )
    return prompt, component_name


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
    if 'borderLeft: "3px solid' not in code and "borderLeft: `3px solid" not in code:
        return False, "RWE cards missing borderLeft accent stripe (must use borderLeft: '3px solid ACCENT')"

    # Must have a section footer with "Part N of M" text after the RWE panel
    if code.count("Part ") < 2:
        return False, "Missing section footer — 'Part N of M' label appears fewer than twice (need header + footer)"

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


async def generate_component(
    client: anthropic.AsyncAnthropic,
    section: dict,
    total_sections: int,
    series_topic: str,
    retry_error: str = None,
) -> tuple[str, str, dict]:
    """Call Claude and return (code, component_name, usage). Raises on failure."""
    prompt, component_name = build_prompt(section, total_sections, series_topic)

    if retry_error:
        prompt += (
            f"\n\n=== RETRY NOTE ===\nYour previous attempt failed validation with this error:\n"
            f"{retry_error}\nPlease fix this specific issue in your new response."
        )

    sid = section["id"]
    for attempt in range(1, 4):
        try:
            full_text = ""
            async with client.messages.stream(
                model=MODEL,
                max_tokens=16000,
                system=[
                    {
                        "type": "text",
                        "text": SYSTEM_PROMPT,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": prompt}],
                extra_headers={"anthropic-beta": "prompt-caching-2024-07-31"},
            ) as stream:
                async for chunk in stream.text_stream:
                    full_text += chunk
                final = await stream.get_final_message()
            break  # success — exit retry loop
        except anthropic.RateLimitError as e:
            if attempt == 3:
                raise
            retry_after = 60
            if hasattr(e, "response") and e.response is not None:
                retry_after = int(e.response.headers.get("retry-after", 60))
            print(f"  [{sid}] Rate limited (attempt {attempt}/3) — waiting {retry_after}s...")
            await asyncio.sleep(retry_after)

    if final.stop_reason == "max_tokens":
        raise RuntimeError("Response truncated (max_tokens). Component will be incomplete.")

    u = final.usage
    usage = {
        "input":       getattr(u, "input_tokens", 0) or 0,
        "output":      getattr(u, "output_tokens", 0) or 0,
        "cache_write": getattr(u, "cache_creation_input_tokens", 0) or 0,
        "cache_read":  getattr(u, "cache_read_input_tokens", 0) or 0,
    }

    code = strip_fences(full_text)
    return code, component_name, usage


async def process_section(
    client: anthropic.AsyncAnthropic,
    section: dict,
    output_dir: str,
    total_sections: int,
    series_topic: str,
    semaphore: asyncio.Semaphore,
) -> dict:
    """Generate, validate, and save a component. Returns a result dict."""
    sid = section["id"]
    part = section["part_number"]
    label = f"Part {part:>2}: {section['title']} [{sid}]"
    out_path = os.path.join(output_dir, f"{sid}.jsx")

    zero_usage = {"input": 0, "output": 0, "cache_write": 0, "cache_read": 0}

    # Skip if already generated
    if os.path.exists(out_path):
        print(f"  Skipping — {sid}.jsx already exists.")
        return {"success": True, "usage": zero_usage}

    async with semaphore:
        print(f"\n{label} — starting")

        # First attempt
        try:
            code, component_name, usage = await generate_component(client, section, total_sections, series_topic)
        except Exception as e:
            print(f"  [{sid}] ERROR generating: {e}", file=sys.stderr)
            return {"success": False, "usage": zero_usage}

        valid, err = validate_jsx(code, component_name)

        if not valid:
            print(f"  [{sid}] Validation failed: {err} — retrying")
            await asyncio.sleep(2)
            try:
                code, component_name, retry_usage = await generate_component(
                    client, section, total_sections, series_topic, retry_error=err
                )
                # Accumulate both attempts
                for k in usage:
                    usage[k] += retry_usage[k]
            except Exception as e:
                print(f"  [{sid}] ERROR on retry: {e}", file=sys.stderr)
                return {"success": False, "usage": usage}
            valid, err = validate_jsx(code, component_name)
            if not valid:
                print(f"  [{sid}] Retry also failed: {err}", file=sys.stderr)
                code = f"// VALIDATION WARNING: {err}\n\n" + code

    cost = tokens_to_cost(**usage)
    print(f"  [{sid}] saved ({len(code):,} chars) — ${cost:.4f}")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(code)

    return {"success": True, "usage": usage}


async def main_async(args: argparse.Namespace) -> None:
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
    series_topic = data.get("topic") or data.get("title") or sections[0].get("title", "this subject")
    print(f"Loaded {total_sections} sections from sections.json. Topic: {series_topic}")

    # Filter sections
    if args.only:
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

    client = anthropic.AsyncAnthropic(api_key=api_key, max_retries=2)
    concurrency = args.concurrency
    semaphore = asyncio.Semaphore(concurrency)

    print(f"Generating {len(sections)} components (max {concurrency} concurrent)...")
    start = time.time()

    results = []

    # Warm the cache with the first section before launching concurrent tasks.
    # This ensures subsequent requests get cache hits rather than all racing to
    # write the same cache entry simultaneously.
    if concurrency > 1 and len(sections) > 1:
        warm_semaphore = asyncio.Semaphore(1)
        print(f"Warming cache with Part {sections[0]['part_number']}...")
        warm_result = await process_section(
            client, sections[0], COMPONENTS_DIR, total_sections, series_topic, warm_semaphore
        )
        results.append(warm_result)
        remaining = sections[1:]
    else:
        remaining = sections

    tasks = [
        process_section(client, s, COMPONENTS_DIR, total_sections, series_topic, semaphore)
        for s in remaining
    ]
    results.extend(await asyncio.gather(*tasks))

    elapsed = time.time() - start
    successes = sum(1 for r in results if r["success"])
    failures = len(results) - successes

    # Aggregate token usage
    totals = {"input": 0, "output": 0, "cache_write": 0, "cache_read": 0}
    for r in results:
        for k in totals:
            totals[k] += r["usage"][k]

    total_cost = tokens_to_cost(**totals)
    cache_saving = totals["cache_read"] * (PRICE_INPUT - PRICE_CACHE_READ) / 1_000_000

    print(f"\nDone in {elapsed:.1f}s. {successes} components generated in {COMPONENTS_DIR}/")
    if failures:
        print(f"  {failures} failures — check stderr output above.")
    print(f"\n--- Token usage ---")
    print(f"  Input (regular):  {totals['input']:>10,}")
    print(f"  Cache write:      {totals['cache_write']:>10,}")
    print(f"  Cache read:       {totals['cache_read']:>10,}")
    print(f"  Output:           {totals['output']:>10,}")
    print(f"\n  Estimated cost:   ${total_cost:.4f}")
    print(f"  Cache saved:     ~${cache_saving:.4f}  (vs no caching)")


def main():
    parser = argparse.ArgumentParser(description="Generate React visualization components")
    parser.add_argument("--start", type=int, default=1,
                        help="Start from this part number (inclusive)")
    parser.add_argument("--only", type=str, default=None,
                        help="Generate only the section with this ID")
    parser.add_argument("--concurrency", type=int, default=MAX_CONCURRENCY,
                        help=f"Max parallel API calls (default: {MAX_CONCURRENCY})")
    args = parser.parse_args()
    asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
