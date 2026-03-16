#!/bin/bash
set -e

URL="${1:?Usage: ./run.sh YOUTUBE_URL}"

echo "=== Fetching transcript ==="
python scripts/fetch_transcript.py "$URL"

echo "=== Parsing sections ==="
python scripts/parse_sections.py

echo "=== Clearing previous components ==="
rm -rf output/components/

echo "=== Generating visualizations ==="
python scripts/generate_viz.py

echo "=== Assembling app ==="
python scripts/assemble.py

echo "=== Starting dev server for verification ==="
echo "Open Claude Code with --chrome flag to verify visually"
cd output && npx vite --open
