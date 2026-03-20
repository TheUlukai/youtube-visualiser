# Browser Check

Perform the Step 2 in-browser verification of the visualization running at http://localhost:5173.

## Instructions

Use the Chrome browser extension (mcp__claude-in-chrome tools) to systematically check every section of the visualization. Follow this exact process:

### Setup
1. Use `tabs_context_mcp` to get current tabs
2. Create a new tab with `tabs_create_mcp`
3. Navigate to `http://localhost:5173`
4. Take a screenshot to confirm the site loaded

### For EACH section (navigate with Next → button):
Take a screenshot at the top of the section, then check:

1. **Escaped unicode** — scan page text with JS: `document.body.innerText.match(/\\u[0-9a-fA-F]{4}/g)` — should be null
2. **Color readability** — confirm text is visible on dark backgrounds; look for invisible/low-contrast text especially on active/selected pill states
3. **Layout overlaps** — scroll through the full section watching for SVG elements clipping outside containers or absolutely-positioned boxes covering adjacent content
4. **Interactive elements** — test at least one of each:
   - Click a Key Concepts pill and verify the description appears below
   - Click/drag any slider or range input and verify the main visualization changes
   - Click any interactive node, button, or toggle and verify a visible effect
   - Expand the Real-World Echoes collapsible
5. **The Problem panel** — confirm it is present (except section 1)
6. **The Difficulty panel** — confirm it is present; its left border stripe must be the **same colour** as the Problem panel's left border stripe — if the hues look different, flag it
7. **Colour consistency** — the Problem borderLeft, Key Concepts label and pill borders, Difficulty borderLeft, and RWE label should all share the same hue. Any panel using a noticeably different colour is a cross-section bleed or wrong-accent bug
8. **RWE label visibility** — expand the Real-World Echoes panel and confirm the "Real-World Echoes" toggle label text is clearly visible (same colour as the chevron icon). If it appears dark/invisible, the span is missing an explicit `color:` property
9. **Content centering** — confirm content is centered on wide viewports, not anchored to the left
10. **Section footer** — scroll to the bottom of the section and confirm a centred "Part N of M — Series Title" line is visible below the Real-World Echoes panel, with clear space below it. If the footer appears inside the RWE panel or is missing entirely, flag it.

### Navigation check
- **Section 1**: Prev button must be visibly greyed/disabled; Next button must be clearly visible and active
- **Last section**: Next button must be visibly greyed/disabled; Prev button must be clearly visible and active
- **All sections**: Prev and Next button text must be legible against the nav bar background — if either appears invisible or near-black, the section's `accentMap` entry is likely set to a background colour rather than the real accent
- Verify Prev/Next buttons step through sections correctly
- Verify the tab bar scrolls to keep the active section tab visible

### Final static checks (run once via JS on any section)
```js
// Check for escaped unicode
document.body.innerText.match(/\\u[0-9a-fA-F]{4}/g)
```

```js
// Check browser console for errors (check read_console_messages with onlyErrors: true)
```

### Reporting
After checking all sections, report:
- A pass/fail table covering all major check categories
- Any issues found, with the section number and description
- Whether fixes are needed (and if so, remind to fix in `output/components/` then reassemble)

### Fix reminder
If issues are found:
- **Always fix in `output/components/<file>.jsx`**, never in `output/visualizations.jsx` directly
- After fixing, run `python scripts/assemble.py` to regenerate the assembled file
- Re-run this browser check to confirm fixes
