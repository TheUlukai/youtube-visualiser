#!/bin/bash
set -e

RESUME=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    --resume) RESUME=true ;;
    *) POSITIONAL+=("$arg") ;;
  esac
done

URL="${POSITIONAL[0]:?Usage: ./run.sh [--resume] YOUTUBE_URL}"

echo "=== Fetching transcript ==="
python scripts/fetch_transcript.py "$URL"

echo "=== Parsing sections ==="
python scripts/parse_sections.py

if [ "$RESUME" = false ]; then
  echo "=== Clearing previous components ==="
  rm -rf output/components/
else
  echo "=== Resuming — keeping existing components ==="
fi

echo "=== Generating visualizations ==="
python scripts/generate_viz.py

echo "=== Assembling app ==="
python scripts/assemble.py

echo "=== Starting dev server for verification ==="
echo "Open Claude Code with --chrome flag to verify visually"
cd output && npx vite --open
