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
6. **The Difficulty panel** — confirm it is present
7. **Content centering** — confirm content is centered on wide viewports, not anchored to the left

### Navigation check
- Verify Prev/Next buttons step through sections correctly
- Verify the tab bar scrolls to keep the active section tab visible
- Verify the Last section's Next button is inactive (or absent)

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
