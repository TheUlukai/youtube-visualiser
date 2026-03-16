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

## Visual Verification (Optional)

If you have [Claude Code](https://code.claude.com) with Chrome integration, you can have it visually inspect and fix issues automatically:

```bash
# In a separate terminal:
claude --chrome
# Then: "Open localhost:5173, click through every section,
#  check for visual bugs, and fix anything you find."
```

## Saving a Finished Site

Once you're happy with a visualization, package it as a standalone site:

```bash
# Using Claude Code:
claude
# Then: "Package the current visualization as a standalone site under sites/"
```

This creates a self-contained project under `sites/` that you can relaunch anytime:

```bash
cd sites/your-video-name
npm install    # only needed once
npm run dev    # launches at localhost:5173
```

To build a static version you can host or share without Node.js:

```bash
cd sites/your-video-name
npm run build  # creates dist/ folder — open index.html or deploy anywhere
```

## Project Structure

```
youtube-visualizer/
├── scripts/                    # The pipeline (reusable)
│   ├── fetch_transcript.py     # Downloads transcript from YouTube
│   ├── parse_sections.py       # Splits into sections via Claude API
│   ├── generate_viz.py         # Generates React components via Claude API
│   └── assemble.py             # Combines into a single navigable app
├── output/                     # Temporary working directory
│   ├── transcript.txt          # Raw transcript
│   ├── sections.json           # Parsed section data
│   ├── components/             # Individual generated components
│   └── visualizations.jsx      # Assembled app
├── sites/                      # Finalized sites (permanent archive)
│   └── your-video-name/        # Self-contained Vite + React project
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
