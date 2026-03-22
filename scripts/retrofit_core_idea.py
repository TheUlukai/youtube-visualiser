#!/usr/bin/env python3
"""
retrofit_core_idea.py — Inserts the Core Idea panel into existing per-section React
component files that were generated before this panel existed.

Usage:
  # Packaged site with per-section component files (modern):
  python scripts/retrofit_core_idea.py --site <slug>

  # Arbitrary paths (e.g. output/ working directory):
  python scripts/retrofit_core_idea.py \\
    --components-dir output/components \\
    --sections-file  output/sections.json

  # Legacy site with a single monolithic App.jsx:
  python scripts/retrofit_core_idea.py \\
    --legacy-app sites/<slug>/src/App.jsx \\
    --sections-file output/sections.json

  # Preview without modifying:
  python scripts/retrofit_core_idea.py --site <slug> --dry-run
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def find_closing_div(code: str, start_pos: int) -> int | None:
    """
    Find the position immediately after the </div> that closes the outermost
    <div> opened at or after start_pos.
    """
    depth = 0
    pos = start_pos
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
                return pos + close_m.end()
            depth -= 1
            pos += close_m.end()
    return None


def escape_backtick_template(text: str) -> str:
    """Escape a string for embedding inside a JS backtick template literal."""
    text = text.replace('\\', '\\\\')
    text = text.replace('`', '\\`')
    text = text.replace('${', '\\${')
    return text


CORE_IDEA_CONST_BLOCK = """\
  const CORE_ARGUMENT = `{escaped}`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\\s+([A-Z][\\s\\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";
"""

# {accent_var} and {margin_style} are filled by make_panel_jsx()
CORE_IDEA_PANEL_JSX_TEMPLATE = """\
        {{/* The Core Idea */}}
        {{CORE_ARGUMENT && (
          <div style={{{{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${{{accent_var}}}25`,
            borderRadius: 8,
            padding: "16px 20px",
            {margin_style},
          }}}}>
            <div style={{{{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                          color: {accent_var}, marginBottom: 10 }}}}>
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
        )}}
"""


def make_panel_jsx(accent_var: str, margin_style: str = 'marginBottom: 16') -> str:
    """Return the Core Idea panel JSX with the correct accent variable and margin."""
    return CORE_IDEA_PANEL_JSX_TEMPLATE.format(
        accent_var=accent_var,
        margin_style=margin_style,
    )


def detect_accent_var(code: str) -> str:
    """
    Detect whether the component uses 'accent' or 'ACCENT' as its accent
    variable. Falls back to 'ACCENT' if neither is found.
    """
    m_lower = re.search(r'\bconst\s+accent\s*=\s*["\']#', code)
    m_upper = re.search(r'\bconst\s+ACCENT\s*=\s*["\']#', code)
    if m_lower and m_upper:
        return "accent" if m_lower.start() < m_upper.start() else "ACCENT"
    if m_lower:
        return "accent"
    return "ACCENT"


def detect_problem_margin(component_code: str) -> str:
    """
    Examine the Problem panel's opening <div style={{...}}> and return a CSS
    fragment to use as the Core Idea panel's margin/maxWidth style, so both
    panels share the same horizontal width.

    Returns a JSX style property string like:
      'maxWidth: "min(90vw, 860px)", margin: "0 auto 16px auto"'
      'margin: "0 40px 16px 40px"'
      'marginBottom: 16'   (fallback — outer container constrains width)
    """
    # Locate "The Problem" text
    problem_m = (
        re.search(r'>\s*The Problem\s*<', component_code)
        or re.search(r'The Problem\s*\*/', component_code)
    )
    if not problem_m:
        return 'marginBottom: 16'

    # Look back up to 800 chars for the nearest opening <div style={{
    window_start = max(0, problem_m.start() - 800)
    window = component_code[window_start:problem_m.start()]
    div_matches = list(re.finditer(r'<div\s+style=\{\{', window))
    if not div_matches:
        return 'marginBottom: 16'

    # The last <div style={{ before the problem label is the Problem card's div
    div_style_start = window_start + div_matches[-1].end()
    div_style_text = component_code[div_style_start:div_style_start + 600]

    maxwidth_m = re.search(r'maxWidth:\s*"([^"]+)"', div_style_text)
    margin_m   = re.search(r'\bmargin:\s*"([^"]+)"', div_style_text)

    if maxwidth_m:
        maxwidth = maxwidth_m.group(1)
        if margin_m:
            # Adapt: keep horizontal values, set top=0, bottom=16px
            parts = margin_m.group(1).split()
            if len(parts) == 4:
                new_margin = f'0 {parts[1]} 16px {parts[3]}'
            elif len(parts) == 2:
                new_margin = f'0 {parts[1]} 16px {parts[1]}'
            else:
                new_margin = '0 auto 16px auto'
        else:
            new_margin = '0 auto 16px auto'
        return f'maxWidth: "{maxwidth}", margin: "{new_margin}"'

    if margin_m:
        parts = margin_m.group(1).split()
        if len(parts) == 2:
            # "16px 40px" → "0 40px 16px 40px"
            return f'margin: "0 {parts[1]} 16px {parts[1]}"'
        if len(parts) == 4:
            return f'margin: "0 {parts[1]} 16px {parts[3]}"'

    return 'marginBottom: 16'


def ensure_accent_const(
    component_code: str,
    func_name: str,
    accent_map: dict,
) -> str:
    """
    After the Core Idea panel has been inserted, ensure the component has a
    const ACCENT = "#hex" declaration.  If one already exists (upper or lower
    case), return code unchanged.  Otherwise inject it using accent_map.
    """
    if re.search(r'\bconst ACCENT\s*=\s*["\']#', component_code):
        return component_code
    if re.search(r'\bconst accent\s*=\s*["\']#', component_code):
        return component_code

    # Convert CamelCase function name to snake_case for lookup
    tokens = re.findall(r'[A-Z][a-z]+|[A-Z]+(?=[A-Z]|$)|[a-z]+', func_name)
    section_id = '_'.join(t.lower() for t in tokens)

    hex_color = accent_map.get(section_id)
    if not hex_color:
        # Try partial key match
        for k, v in accent_map.items():
            if k in section_id or section_id in k:
                hex_color = v
                break

    if not hex_color:
        # Last resort: first prominent #xxxxxx in the component that looks
        # like an accent (not a very dark or very light colour)
        for m in re.finditer(r'#([0-9A-Fa-f]{6})', component_code):
            r = int(m.group(1)[0:2], 16)
            g = int(m.group(1)[2:4], 16)
            b = int(m.group(1)[4:6], 16)
            brightness = (r * 299 + g * 587 + b * 114) / 1000
            if 40 < brightness < 220:
                hex_color = m.group(0)
                break

    if not hex_color:
        return component_code  # Can't determine — leave as-is

    func_m = re.search(r'^function\s+\w+\s*\([^)]*\)\s*\{', component_code, re.MULTILINE)
    if not func_m:
        return component_code

    insert_pos = func_m.end()
    return (
        component_code[:insert_pos]
        + f'\n  const ACCENT = "{hex_color}";'
        + component_code[insert_pos:]
    )


# ---------------------------------------------------------------------------
# Core retrofit logic
# ---------------------------------------------------------------------------

def insert_constant_block(code: str, escaped_core_arg: str) -> str:
    """Insert the CORE_ARGUMENT constant + split logic at the top of the component body."""
    match = re.search(
        r'(function\s+\w+\s*\([^)]*\)\s*\{|const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{)',
        code,
    )
    if not match:
        return code

    insert_pos = match.end()
    const_block = CORE_IDEA_CONST_BLOCK.replace('{escaped}', escaped_core_arg)
    return code[:insert_pos] + '\n' + const_block + code[insert_pos:]


def insert_panel_after_problem(code: str, panel_jsx: str) -> tuple[str, bool]:
    """Insert the Core Idea panel immediately after The Problem panel's closing </div>."""
    problem_comment = re.search(r'\{/\*\s*The Problem\s*\*/\}', code)
    if not problem_comment:
        problem_text = re.search(r'>\s*The Problem\s*<', code)
        if not problem_text:
            return code, False
        search_start = problem_text.start()
    else:
        search_start = problem_comment.start()

    window_start = max(0, search_start - 600)
    window = code[window_start:search_start]
    open_divs = list(re.finditer(r'<div[\s>]', window))
    if not open_divs:
        return code, False

    card_div_abs = window_start + open_divs[-1].start()
    closing_pos = find_closing_div(code, card_div_abs)
    if closing_pos is None:
        return code, False

    new_code = code[:closing_pos] + '\n' + panel_jsx + code[closing_pos:]
    return new_code, True


def insert_panel_before_main_viz(code: str, panel_jsx: str) -> tuple[str, bool]:
    """For first sections: insert the Core Idea panel before the main visualization."""
    viz_comment = re.search(
        r'\{/\*\s*(Main|Visualization|MAIN|VIZ)[^\*]*\*\/',
        code,
    )
    if viz_comment:
        insert_pos = viz_comment.start()
        new_code = code[:insert_pos] + panel_jsx + '\n        ' + code[insert_pos:]
        return new_code, True

    return_match = re.search(r'\breturn\s*\(', code)
    if not return_match:
        return code, False

    svg_or_canvas = re.search(r'<(svg|canvas)[\s>]', code[return_match.start():])
    if not svg_or_canvas:
        return code, False

    abs_pos = return_match.start() + svg_or_canvas.start()
    new_code = code[:abs_pos] + panel_jsx + '\n        ' + code[abs_pos:]
    return new_code, True


def retrofit_component(
    code: str,
    core_argument: str,
    is_first_section: bool,
    func_name: str = '',
    accent_map: dict | None = None,
) -> tuple[str, bool]:
    """
    Full retrofit: insert constants block and panel JSX, then ensure the
    component has an accent constant.  Returns (modified_code, success).
    """
    escaped = escape_backtick_template(core_argument)
    accent_var = detect_accent_var(code)
    margin_style = detect_problem_margin(code) if not is_first_section else 'marginBottom: 16'
    panel_jsx = make_panel_jsx(accent_var, margin_style)

    # 1. Insert constant block
    code = insert_constant_block(code, escaped)

    # 2. Insert panel JSX
    if is_first_section:
        code, ok = insert_panel_before_main_viz(code, panel_jsx)
    else:
        code, ok = insert_panel_after_problem(code, panel_jsx)

    if not ok:
        return code, False

    # 3. Ensure accent const exists (guard against missing variable)
    if accent_map is not None and func_name:
        code = ensure_accent_const(code, func_name, accent_map)

    return code, True


# ---------------------------------------------------------------------------
# Semantic section matching
# ---------------------------------------------------------------------------

def _name_tokens(name: str) -> set[str]:
    """
    Convert a CamelCase function name or snake_case section ID to a set of
    lowercase tokens, filtering out noise words.
    """
    NOISE = {'of', 'the', 'and', 'or', 'a', 'an', 'in', 'to', 'for', 'with'}
    raw = re.findall(r'[A-Z][a-z]+|[A-Z]+(?=[A-Z]|$)|[a-z]+', name.replace('_', ' '))
    return {t.lower() for t in raw} - NOISE


def build_semantic_assignment(
    func_infos: list[tuple[int, str]],   # [(part_number, func_name), ...]
    sections: list[dict],
) -> dict[int, dict]:
    """
    Return a mapping {app_part_number: section_dict} that assigns each
    App.jsx component the best-matching section from sections.json.

    Strategy:
    1. Exact part-number match gets priority (score = 1000 + token overlap).
    2. If the re-parse count differs, remaining unmatched components are
       assigned by greedy best token-overlap.
    3. Each section is used at most once (except when there are more App.jsx
       parts than re-parse sections — last section is reused for remainders).
    """
    assignment: dict[int, dict] = {}
    used_ids: set[str] = set()

    # Score all (app_part, section) pairs
    scored = []
    for app_part, func_name in func_infos:
        func_tok = _name_tokens(func_name)
        for s in sections:
            id_tok = _name_tokens(s['id'])
            overlap = len(func_tok & id_tok)
            # Exact part-number match gets a large bonus
            exact_bonus = 1000 if s['part_number'] == app_part else 0
            scored.append((exact_bonus + overlap, app_part, func_name, s))

    # Sort descending by score; assign greedily
    scored.sort(key=lambda x: -x[0])
    assigned_app_parts: set[int] = set()

    for score, app_part, func_name, section in scored:
        if app_part in assigned_app_parts:
            continue
        if section['id'] in used_ids:
            continue
        assignment[app_part] = section
        assigned_app_parts.add(app_part)
        used_ids.add(section['id'])

    # Any app parts still unassigned (more parts than re-parse sections):
    # fall back to the last section
    last_section = sections[-1]
    for app_part, func_name in func_infos:
        if app_part not in assignment:
            assignment[app_part] = last_section
            print(
                f'  NOTE: Part {app_part} ({func_name}) has no unique match '
                f'— using last section "{last_section["id"]}"'
            )

    return assignment


# ---------------------------------------------------------------------------
# Legacy mode — monolithic App.jsx
# ---------------------------------------------------------------------------

def find_function_end(code: str, body_start: int) -> int:
    """
    Given the position immediately after a function's opening '{', return the
    position immediately after its matching closing '}'.
    """
    depth = 1
    pos = body_start
    while pos < len(code) and depth > 0:
        ch = code[pos]
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
        pos += 1
    return pos


def extract_accent_map(code: str) -> dict:
    """Extract the accentMap object from the App.jsx if present."""
    m = re.search(r'const accentMap\s*=\s*\{([^}]+)\}', code, re.DOTALL)
    if not m:
        return {}
    result = {}
    for entry in re.finditer(r'"([^"]+)"\s*:\s*"(#[0-9A-Fa-f]{3,6})"', m.group(1)):
        result[entry.group(1)] = entry.group(2)
    return result


def retrofit_legacy_app(app_jsx_path: Path, sections_file: Path, dry_run: bool) -> int:
    """
    Retrofit a monolithic App.jsx.

    Improvements over the original numeric-only approach:
      1. Semantic matching — each App.jsx component is matched to the
         re-parse section whose ID has the greatest token overlap with the
         component's function name (with a large bonus for exact part-number
         match).  This survives re-parse count mismatches gracefully.
      2. Width matching — the Core Idea panel inherits the Problem panel's
         maxWidth/margin so it always aligns visually.
      3. Accent guard — if a component has no const ACCENT/accent, one is
         injected from the accentMap before the file is written.
    """
    if not app_jsx_path.exists():
        print(f'ERROR: App.jsx not found: {app_jsx_path}', file=sys.stderr)
        return 1
    if not sections_file.exists():
        print(f'ERROR: sections file not found: {sections_file}', file=sys.stderr)
        return 1

    with open(sections_file) as f:
        data = json.load(f)
    sections = data.get('sections', [])
    if not sections:
        print('ERROR: sections.json contains no sections.', file=sys.stderr)
        return 1

    code = app_jsx_path.read_text(encoding='utf-8')

    # Extract accentMap for the accent guard
    accent_map = extract_accent_map(code)
    if accent_map:
        print(f'Found accentMap with {len(accent_map)} entries.')

    # Collect all top-level section function definitions with their ranges
    func_pattern = re.compile(r'^function\s+(\w+)\s*\([^)]*\)\s*\{', re.MULTILINE)
    func_ranges = []
    for m in func_pattern.finditer(code):
        func_start = m.start()
        func_end = find_function_end(code, m.end())
        func_name = m.group(1)
        component_code = code[func_start:func_end]
        part_match = re.search(r'Part\s+(\d+)\s+of\s+\d+', component_code)
        if not part_match:
            continue  # helper / App shell — skip
        part_number = int(part_match.group(1))
        func_ranges.append((func_start, func_end, func_name, part_number))

    total_app_parts = len(func_ranges)
    total_reparse = len(sections)
    print(f'App.jsx has {total_app_parts} section components; '
          f'sections.json has {total_reparse} sections.')
    if total_app_parts != total_reparse:
        print(f'  Count mismatch — using semantic matching to assign core_arguments.')

    # Build semantic assignment
    func_infos = [(part_num, fname) for _, _, fname, part_num in func_ranges]
    assignment = build_semantic_assignment(func_infos, sections)

    # Print the full assignment plan before modifying anything
    print('\nAssignment plan:')
    for _, _, fname, part_num in sorted(func_ranges, key=lambda x: x[3]):
        s = assignment.get(part_num)
        if s:
            match_type = 'exact' if s['part_number'] == part_num else 'semantic'
            print(f'  Part {part_num:>2} ({fname}) → reparse Part {s["part_number"]} '
                  f'[{s["id"]}]  ({match_type})')

    if dry_run:
        eligible = sum(
            1 for fs, fe, _fname, _pn in func_ranges
            if 'The Core Idea' not in code[fs:fe]
        )
        print(f'\nDry run complete. Would modify up to {eligible} components.')
        return 0

    print()
    modified_count = 0
    skipped_count = 0
    warning_count = 0

    # Process in reverse order so insertions don't shift earlier positions
    for func_start, func_end, func_name, part_number in reversed(
        sorted(func_ranges, key=lambda x: x[3])
    ):
        component_code = code[func_start:func_end]

        if 'The Core Idea' in component_code or 'CORE_ARGUMENT' in component_code:
            skipped_count += 1
            continue

        section = assignment.get(part_number)
        if not section:
            print(f'WARNING: Part {part_number} ({func_name}) — no section assigned')
            warning_count += 1
            continue

        core_argument = section.get('core_argument', '').strip()
        if not core_argument:
            print(f'WARNING: Part {part_number:>2}: {func_name} — no core_argument, skipping')
            warning_count += 1
            continue

        has_problem_panel = bool(
            re.search(r'\{/\*\s*The Problem\s*\*/\}', component_code)
            or re.search(r'>\s*The Problem\s*<', component_code)
        )
        is_first_section = not has_problem_panel

        new_component_code, ok = retrofit_component(
            component_code,
            core_argument,
            is_first_section,
            func_name=func_name,
            accent_map=accent_map,
        )

        if not ok:
            print(f'WARNING: Part {part_number:>2}: {func_name} — could not find insertion point')
            warning_count += 1
            continue

        reparse_id = section['id']
        match_note = '' if section['part_number'] == part_number else f' [semantic ← reparse Part {section["part_number"]}]'
        print(f'Part {part_number:>2} of {total_app_parts}: {func_name}  [{reparse_id}]{match_note}')
        code = code[:func_start] + new_component_code + code[func_end:]
        modified_count += 1

    print(f'\nModified {modified_count} component(s). Skipped {skipped_count}. Warnings: {warning_count}.')
    if modified_count > 0:
        app_jsx_path.write_text(code, encoding='utf-8')
        print(f'Updated: {app_jsx_path}')

    return 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description='Retrofit Core Idea panel into existing section React components.'
    )
    parser.add_argument('--site', metavar='SLUG',
                        help='Site slug under sites/ (sets components-dir and sections-file automatically)')
    parser.add_argument('--components-dir', metavar='DIR',
                        help='Directory containing per-section .jsx files')
    parser.add_argument('--sections-file', metavar='FILE',
                        help='Path to sections.json')
    parser.add_argument('--legacy-app', metavar='FILE',
                        help='Path to a monolithic App.jsx (legacy site mode); requires --sections-file')
    parser.add_argument('--dry-run', action='store_true',
                        help='Print what would be changed without modifying files')
    args = parser.parse_args()

    # Legacy monolithic App.jsx mode
    if args.legacy_app:
        if not args.sections_file:
            print('ERROR: --legacy-app requires --sections-file', file=sys.stderr)
            return 1
        return retrofit_legacy_app(
            Path(args.legacy_app),
            Path(args.sections_file),
            args.dry_run,
        )

    # Resolve paths
    if args.site:
        site_dir = ROOT / 'sites' / args.site
        components_dir = site_dir / 'src' / 'components'
        sections_file = site_dir / 'src' / 'sections.json'
        output_file = site_dir / 'src' / 'App.jsx'
        is_site_mode = True
    elif args.components_dir and args.sections_file:
        components_dir = Path(args.components_dir)
        sections_file = Path(args.sections_file)
        output_file = components_dir.parent / 'visualizations.jsx'
        is_site_mode = False
    else:
        parser.print_usage()
        print('\nERROR: Provide either --site <slug> or both --components-dir and --sections-file.',
              file=sys.stderr)
        return 1

    if not sections_file.exists():
        print(f'ERROR: sections file not found: {sections_file}', file=sys.stderr)
        return 1

    if not components_dir.is_dir():
        print(f'ERROR: components directory not found: {components_dir}', file=sys.stderr)
        return 1

    with open(sections_file) as f:
        data = json.load(f)

    sections = data.get('sections', [])
    if not sections:
        print('ERROR: sections.json contains no sections.', file=sys.stderr)
        return 1

    accent_map: dict = {}  # per-file accent maps not available in component mode

    modified_count = 0
    skipped_count = 0
    warning_count = 0

    for section in sections:
        section_id = section['id']
        part_number = section.get('part_number', 1)
        core_argument = section.get('core_argument', '').strip()

        component_file = components_dir / f'{section_id}.jsx'
        if not component_file.exists():
            print(f'WARNING: component file not found: {component_file}')
            warning_count += 1
            continue

        code = component_file.read_text(encoding='utf-8')

        if 'The Core Idea' in code or 'CORE_ARGUMENT' in code:
            print(f'Part {part_number:>2}: {section_id}  [skip — already has Core Idea]')
            skipped_count += 1
            continue

        if not core_argument:
            print(f'WARNING: Part {part_number:>2}: {section_id}  — no core_argument, skipping')
            warning_count += 1
            continue

        has_problem_panel = bool(
            re.search(r'\{/\*\s*The Problem\s*\*/\}', code)
            or re.search(r'>\s*The Problem\s*<', code)
        )
        is_first_section = not has_problem_panel

        new_code, ok = retrofit_component(
            code, core_argument, is_first_section,
            func_name=section_id, accent_map=accent_map,
        )

        if not ok:
            print(f'WARNING: Part {part_number:>2}: {section_id}  — could not find insertion point')
            warning_count += 1
            continue

        print(f'Part {part_number:>2}: {section_id}')

        if args.dry_run:
            print('         [dry-run — no file written]')
        else:
            component_file.write_text(new_code, encoding='utf-8')
            modified_count += 1

    print()
    if args.dry_run:
        print('Dry run complete.')
    else:
        print(f'Modified {modified_count} component(s). Skipped {skipped_count}. Warnings: {warning_count}.')

    if not args.dry_run and modified_count > 0:
        print()
        print('Next steps — reassemble the app:')
        if is_site_mode:
            print(f'  python scripts/assemble.py \\')
            print(f'    --components-dir {components_dir} \\')
            print(f'    --sections-file  {sections_file} \\')
            print(f'    --output         {output_file}')
            print()
            print('Then rebuild:')
            print(f'  cd sites/{args.site} && npm run build')
        else:
            print('  python scripts/assemble.py')

    return 0


if __name__ == '__main__':
    sys.exit(main())
