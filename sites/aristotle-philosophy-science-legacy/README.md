# Aristotle's Philosophy, Science, and Legacy

An interactive visualization of Aristotle's complete philosophical system — from his empirical revolution and logic to biology, physics, ethics, politics, and lasting legacy across 15 sections.

**YouTube URL:** https://www.youtube.com/watch?v=xKXmttHgyKA
**Date generated:** 2026-03-22

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
  --components-dir sites/aristotle-philosophy-science-legacy/src/components \
  --sections-file  sites/aristotle-philosophy-science-legacy/src/sections.json \
  --output         sites/aristotle-philosophy-science-legacy/src/App.jsx
cd sites/aristotle-philosophy-science-legacy && npm run build
```
