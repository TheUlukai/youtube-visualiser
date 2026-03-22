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

    The caller should pass start_pos pointing to (or just before) the opening
    <div> so that the first open-match increments depth from 0 → 1.
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

CORE_IDEA_PANEL_JSX_TEMPLATE = """\
        {{/* The Core Idea */}}
        {{CORE_ARGUMENT && (
          <div style={{{{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${{{accent_var}}}25`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
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


def make_panel_jsx(accent_var: str) -> str:
    """Return the Core Idea panel JSX with the correct accent variable name."""
    return CORE_IDEA_PANEL_JSX_TEMPLATE.format(accent_var=accent_var)


def detect_accent_var(code: str) -> str:
    """
    Detect whether the component uses 'accent' or 'ACCENT' as its accent
    variable. Falls back to 'ACCENT' if neither is found.
    """
    # Look for 'const accent = ' or 'const ACCENT = ' (skip accentMap)
    m_lower = re.search(r'\bconst\s+accent\s*=\s*["\']#', code)
    m_upper = re.search(r'\bconst\s+ACCENT\s*=\s*["\']#', code)
    if m_lower and m_upper:
        # Whichever appears first in the file wins
        return "accent" if m_lower.start() < m_upper.start() else "ACCENT"
    if m_lower:
        return "accent"
    return "ACCENT"


def insert_constant_block(code: str, escaped_core_arg: str) -> str:
    """Insert the CORE_ARGUMENT constant + split logic at the top of the component body."""
    # Find component function opening brace
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
    """
    For non-first sections: insert the Core Idea panel immediately after
    The Problem panel's closing </div>.

    Returns (modified_code, success).
    """
    # Find {/* The Problem */} or inline "The Problem" label inside JSX
    # We look for the comment marker first, then fall back to the text node
    problem_comment = re.search(r'\{/\*\s*The Problem\s*\*/\}', code)
    if not problem_comment:
        # Try to find the text label used as a div child
        problem_text = re.search(r'>\s*The Problem\s*<', code)
        if not problem_text:
            return code, False
        search_start = problem_text.start()
    else:
        search_start = problem_comment.start()

    # From the search start, find the wrapping <div that opens The Problem card.
    # Walk backwards to find the last <div before the marker, or walk forward
    # to find the first <div after the marker.  The card div is typically
    # BEFORE the comment/text node, so look backwards for the most recent <div>.
    # Simpler: scan from a safe point before the marker.
    # We'll look for the opening <div of the Problem card in a window before
    # the marker. The card is at most ~10 lines above the comment.
    window_start = max(0, search_start - 600)
    window = code[window_start:search_start]
    # Find the last <div (opening) in that window
    open_divs = list(re.finditer(r'<div[\s>]', window))
    if not open_divs:
        return code, False

    # The last <div in the window is the opening of The Problem card.
    last_open = open_divs[-1]
    card_div_abs = window_start + last_open.start()

    closing_pos = find_closing_div(code, card_div_abs)
    if closing_pos is None:
        return code, False

    new_code = code[:closing_pos] + '\n' + panel_jsx + code[closing_pos:]
    return new_code, True


def insert_panel_before_main_viz(code: str, panel_jsx: str) -> tuple[str, bool]:
    """
    For first sections (no Problem panel): insert the Core Idea panel before
    the main visualization.

    Strategy: look for {/* Main ...*/} or {/* Visualization ...*/} comment,
    or fall back to the first <svg or <canvas in the return JSX.
    Returns (modified_code, success).
    """
    # Try comment markers
    viz_comment = re.search(
        r'\{/\*\s*(Main|Visualization|MAIN|VIZ)[^\*]*\*\/',
        code,
    )
    if viz_comment:
        insert_pos = viz_comment.start()
        new_code = code[:insert_pos] + panel_jsx + '\n        ' + code[insert_pos:]
        return new_code, True

    # Fall back: first <svg or <canvas inside the return statement
    return_match = re.search(r'\breturn\s*\(', code)
    if not return_match:
        return code, False

    svg_or_canvas = re.search(r'<(svg|canvas)[\s>]', code[return_match.start():])
    if not svg_or_canvas:
        return code, False

    abs_pos = return_match.start() + svg_or_canvas.start()
    new_code = code[:abs_pos] + panel_jsx + '\n        ' + code[abs_pos:]
    return new_code, True


def retrofit_component(code: str, core_argument: str, is_first_section: bool) -> tuple[str, bool]:
    """
    Full retrofit: insert constants block and panel JSX.
    Returns (modified_code, success).
    """
    escaped = escape_backtick_template(core_argument)
    accent_var = detect_accent_var(code)
    panel_jsx = make_panel_jsx(accent_var)

    # 1. Insert constant block
    code = insert_constant_block(code, escaped)

    # 2. Insert panel JSX
    if is_first_section:
        code, ok = insert_panel_before_main_viz(code, panel_jsx)
    else:
        code, ok = insert_panel_after_problem(code, panel_jsx)

    return code, ok


# ---------------------------------------------------------------------------
# Legacy mode — monolithic App.jsx
# ---------------------------------------------------------------------------

def find_function_end(code: str, body_start: int) -> int:
    """
    Given the position immediately after a function's opening '{', return the
    position immediately after its matching closing '}'.  Uses simple brace
    counting — relies on well-formed (balanced) JSX source.
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
    return pos  # points to char after the closing '}'


def retrofit_legacy_app(app_jsx_path: Path, sections_file: Path, dry_run: bool) -> int:
    """
    Retrofit a monolithic App.jsx that contains all section components inline.

    Matching strategy: each section component contains a 'Part N of M' label in
    its header block.  We extract that N and look it up in sections.json by
    part_number to get the core_argument value.
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

    part_map = {s['part_number']: s for s in sections}
    total_parts = len(sections)

    code = app_jsx_path.read_text(encoding='utf-8')

    # Collect all top-level function definitions with their ranges
    func_pattern = re.compile(r'^function\s+(\w+)\s*\([^)]*\)\s*\{', re.MULTILINE)
    func_ranges = []
    for m in func_pattern.finditer(code):
        func_start = m.start()
        func_end = find_function_end(code, m.end())
        func_ranges.append((func_start, func_end, m.group(1)))

    modified_count = 0
    skipped_count = 0
    warning_count = 0

    # Process in reverse order so insertions don't shift earlier positions
    for func_start, func_end, func_name in reversed(func_ranges):
        component_code = code[func_start:func_end]

        # Skip if already retrofitted
        if 'The Core Idea' in component_code or 'CORE_ARGUMENT' in component_code:
            skipped_count += 1
            continue

        # Only process section components — they all have "Part N of M"
        part_match = re.search(r'Part\s+(\d+)\s+of\s+\d+', component_code)
        if not part_match:
            continue  # App/Nav/helper function — skip silently

        part_number = int(part_match.group(1))
        section = part_map.get(part_number)
        if not section:
            print(f'WARNING: Part {part_number} ({func_name}) not found in sections.json')
            warning_count += 1
            continue

        core_argument = section.get('core_argument', '').strip()
        if not core_argument:
            print(f'WARNING: Part {part_number:>2}: {func_name} — no core_argument, skipping')
            warning_count += 1
            continue

        has_problem_panel = (
            re.search(r'\{/\*\s*The Problem\s*\*/\}', component_code) is not None
            or re.search(r'>\s*The Problem\s*<', component_code) is not None
        )
        is_first_section = not has_problem_panel

        new_component_code, ok = retrofit_component(component_code, core_argument, is_first_section)

        if not ok:
            print(f'WARNING: Part {part_number:>2}: {func_name} — could not find insertion point')
            warning_count += 1
            continue

        print(f'Part {part_number:>2} of {total_parts}: {func_name}')

        if not dry_run:
            code = code[:func_start] + new_component_code + code[func_end:]
            modified_count += 1

    print()
    if dry_run:
        n = sum(
            1 for (fs, fe, fn) in func_ranges
            if re.search(r'Part\s+\d+\s+of\s+\d+', code[fs:fe])
            and 'The Core Idea' not in code[fs:fe]
            and 'CORE_ARGUMENT' not in code[fs:fe]
        )
        print(f'Dry run complete. Would modify up to {n} components.')
    else:
        print(f'Modified {modified_count} component(s). Skipped {skipped_count}. Warnings: {warning_count}.')
        if modified_count > 0:
            app_jsx_path.write_text(code, encoding='utf-8')
            print(f'\nUpdated: {app_jsx_path}')

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
        # For output/ mode the assembled file is output/visualizations.jsx
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

        # Skip if already retrofitted
        if 'The Core Idea' in code or 'CORE_ARGUMENT' in code:
            print(f'Part {part_number:>2}: {section_id}  [skip — already has Core Idea]')
            skipped_count += 1
            continue

        if not core_argument:
            print(f'WARNING: Part {part_number:>2}: {section_id}  — no core_argument in sections.json, skipping')
            warning_count += 1
            continue

        # Determine if this is a "first section" (no Problem panel)
        # Use problem_inherited null OR part_number == 1 as the signal,
        # but also check whether The Problem text actually appears in the file.
        has_problem_panel = (
            re.search(r'\{/\*\s*The Problem\s*\*/\}', code) is not None
            or re.search(r'>\s*The Problem\s*<', code) is not None
        )
        is_first_section = not has_problem_panel

        new_code, ok = retrofit_component(code, core_argument, is_first_section)

        if not ok:
            print(f'WARNING: Part {part_number:>2}: {section_id}  — could not find insertion point, skipping')
            warning_count += 1
            continue

        print(f'Part {part_number:>2}: {section_id}')

        if args.dry_run:
            print('         [dry-run — no file written]')
        else:
            component_file.write_text(new_code, encoding='utf-8')
            modified_count += 1

    # Summary
    print()
    if args.dry_run:
        print(f'Dry run complete. Would modify {modified_count + (len(sections) - skipped_count - warning_count)} components.')
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
