# Ontology: The Hidden Operating System

Interactive React visualizations for the YouTube video:

**URL:** https://www.youtube.com/watch?v=7bwUqErebR8

35 sections covering the history and problems of ontology — from Aristotle's categories
through universals, tropes, temporal ontology, social facts, and grounding theory.

## Launch

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build (static output)

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built site locally
```

## Contents

`src/visualizations.jsx` is the complete self-contained React app — all 35 section
components plus the navigation shell assembled into a single file. It has no external
data dependencies; everything is embedded.
