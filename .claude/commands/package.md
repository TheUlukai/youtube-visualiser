Package the current visualization in `output/` as a permanent site under `sites/` and build it to `docs/` for GitHub Pages.

---

## Step 1 — Gather metadata

Read `output/sections.json` to get:
- `topic` (used for the site title and README description)
- Number of sections (`sections` array length)

Read the first two lines of `output/transcript.txt` to get the YouTube URL (it appears as `Source URL: https://...`).

Derive a **site slug** from the topic: lowercase, spaces → hyphens, remove apostrophes and other punctuation. Examples: "Hegel's complete philosophical system" → `hegel-philosophical-system`, "Kant: The Copernican Revolution in Philosophy" → `kant-copernican-revolution`.

Today's date is available in the system context.

---

## Step 2 — Create site directory

Create `sites/<slug>/` with this structure:

```
sites/<slug>/
  src/
    App.jsx           — copy of output/visualizations.jsx
    main.jsx          — React entry point
    index.css         — global CSS reset
    components/       — archive of per-section source files
      <id>.jsx        — one file per section (copied from output/components/)
    sections.json     — copy of output/sections.json (for future reassembly)
  index.html
  package.json
  vite.config.js
  README.md
```

**`src/App.jsx`** — copy `output/visualizations.jsx` verbatim (use bash `cp`).

**`src/components/`** — copy all files from `output/components/` into `sites/<slug>/src/components/`. These are the individual per-section source files; they are not imported by the build but are preserved so any future fix or retrofit can be done on focused ~400-line files and then reassembled:
```bash
cp -r output/components/. sites/<slug>/src/components/
```

**`src/sections.json`** — copy `output/sections.json` so the site is self-contained for future reassembly:
```bash
cp output/sections.json sites/<slug>/src/sections.json
```

**`src/index.css`**:
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #050508; }
#root { min-height: 100vh; }
```

**`src/main.jsx`**:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**`index.html`**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TOPIC TITLE HERE</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**`package.json`**:
```json
{
  "name": "<slug>",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.400.0",
    "d3": "^7.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.1.0"
  }
}
```

**`vite.config.js`**:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/youtube-visualiser/<slug>/',
  build: {
    outDir: '../../docs/<slug>',
    emptyOutDir: true,
  },
});
```

**`README.md`**:
```markdown
# TOPIC TITLE HERE

Brief description of the visualization content.

**YouTube URL:** <url>
**Date generated:** <date>

## Launch

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
```

## Reassemble

After editing individual section components in `src/components/`, regenerate `src/App.jsx` and rebuild:

```bash
python scripts/assemble.py \
  --components-dir sites/<slug>/src/components \
  --sections-file  sites/<slug>/src/sections.json \
  --output         sites/<slug>/src/App.jsx
cd sites/<slug> && npm run build
```
```

---

## Step 3 — Install and build

```bash
cd sites/<slug>
npm install
npm run build
```

The build outputs to `docs/<slug>/`. Confirm it completes without errors.

---

## Step 4 — Update docs/index.html

Add a new entry to `docs/index.html` before the closing `</body>` tag:

```html
  <a class="site" href="<slug>/">
    <h2>TOPIC TITLE HERE</h2>
    <p>N sections &mdash; Generated YYYY-MM-DD</p>
  </a>
```

Append after the last existing `</a>` entry (before `</body>`).

---

## Step 5 — Report

Confirm to the user:
- Site slug and path created
- Build succeeded (or show any errors)
- docs/index.html updated
- Remind them to commit and push to deploy to GitHub Pages
- Show the reassembly command for future use:
  ```bash
  python scripts/assemble.py \
    --components-dir sites/<slug>/src/components \
    --sections-file  sites/<slug>/src/sections.json \
    --output         sites/<slug>/src/App.jsx
  ```
