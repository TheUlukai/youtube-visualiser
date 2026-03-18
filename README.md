# YouTube Educational Video Visualizer

Turns any educational YouTube video into an interactive, themed React visualization — one section per topic, with animated diagrams, clickable explorations, and real-world examples pulled from the transcript.

## How It Works

```
YouTube URL → transcript → section parsing → visualization generation → interactive app
```

The pipeline fetches the video transcript, uses Claude (Sonnet 4.6) to parse it into logical sections and extract key concepts, then generates a React component for each section with interactive visuals, a problem chain showing how ideas connect, and real-world examples. The result is a single navigable app you can run locally alongside the video.

## Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **An Anthropic API key** — set as `ANTHROPIC_API_KEY` environment variable
- **youtube-transcript-api** — `pip install youtube-transcript-api`
- **Anthropic Python SDK** — `pip install anthropic`

## Quick Start

```bash
# 1. Set your API key
export ANTHROPIC_API_KEY=your_key_here

# 2. Run the pipeline against a YouTube video
./run.sh "https://www.youtube.com/watch?v=VIDEO_ID"
```

This will:
1. Download the transcript
2. Parse it into sections (via Claude API)
3. Generate a visualization for each section (via Claude API)
4. Assemble them into a single React app
5. Launch a local dev server at `http://localhost:5173`

## Post-Generation Workflow (with Claude Code)

After `run.sh` completes, open Claude Code in this directory and run these three skills in order:

### Step 1 — Static check
```
/static-check
```
Scans all generated components for common bugs (escaped unicode, hooks inside loops, SVG overflow, etc.), fixes them across all files, reassembles the app, and runs a build to confirm no syntax errors.

### Step 2 — Browser check
```
/browser-check
```
Opens the dev server in Chrome and visually inspects every section: color readability, interactive elements, layout overlaps, navigation, and more.

### Step 3 — Package
```
/package
```
Once satisfied, this archives the visualization as a standalone site under `sites/<slug>/`, builds it into `docs/<slug>/` for GitHub Pages, and updates the site index. Then commit and push to deploy.

---

Each packaged site can be relaunched anytime independently:

```bash
cd sites/<site-slug>
npm install    # only needed once
npm run dev    # launches at localhost:5173
```

## Deploying to GitHub Pages

The repo is published at https://TheUlukai.github.io/youtube-visualiser/

`/package` handles the full build and index update automatically. After running it, commit both the `sites/<site-slug>/` source and the `docs/<site-slug>/` build output.

## Project Structure

```
youtube-visualizer/
├── scripts/                    # The pipeline
│   ├── fetch_transcript.py     # Downloads transcript from YouTube
│   ├── parse_sections.py       # Splits into sections via Claude API
│   ├── generate_viz.py         # Generates React components via Claude API
│   └── assemble.py             # Combines into a single navigable app
├── output/                     # Temporary working directory (overwritten each run)
│   ├── transcript.txt          # Raw transcript
│   ├── sections.json           # Parsed section data
│   ├── components/             # Individual generated .jsx components
│   └── visualizations.jsx      # Assembled app (input to devserver)
├── devserver/                  # Vite+React dev server for previewing output/
├── sites/                      # Permanent archive of packaged visualizations
│   └── <site-slug>/            # Self-contained Vite + React project per video
│       ├── src/App.jsx         # Finalized visualization component
│       ├── vite.config.js      # Sets base path and build output → docs/<site-slug>/
│       └── README.md           # Video title, URL, date, launch instructions
├── docs/                       # GitHub Pages root (built output from all sites)
│   ├── index.html              # Index page linking to all published visualizations
│   └── <site-slug>/            # Built static files for each site
├── run.sh                      # End-to-end pipeline script
├── CLAUDE.md                   # Claude Code project context
└── README.md                   # This file
```

## What Gets Generated

Each section in the visualization includes:

- **The Problem** — what tension or question this section is responding to
- **The Core Idea** — an interactive visualization of the concept (SVG diagrams, Canvas animations, clickable explorations)
- **The Difficulty** — what new problem or open question this idea creates
- **Real-World Echoes** — concrete modern examples drawn from the transcript

Sections link together through a problem chain: each section's inherited problem connects to the previous section's created problem, showing the narrative arc of the content.

## Customization

The style and structure are controlled by `CLAUDE.md`. Edit it to change:

- Visual theme (colors, fonts, background style)
- Content extraction (what fields to parse from the transcript)
- Component structure (what panels each section should include)
- Verification checklist (what to check during visual inspection)

## Cost

- Transcript fetching: free (no API key needed)
- Section parsing: ~1 API call (~$0.01–0.05)
- Visualization generation: ~1 API call per section (~$0.01–0.02 each)
- Total for a typical 30-section video: **under $1**
