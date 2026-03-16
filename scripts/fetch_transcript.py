#!/usr/bin/env python3
"""
Fetch transcript from a YouTube video and save to output/transcript.txt.
Usage: python scripts/fetch_transcript.py <youtube_url>
"""

import sys
import re
import os
from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi


def extract_video_id(url: str) -> str:
    parsed = urlparse(url)

    # youtu.be/<id>
    if parsed.netloc in ("youtu.be", "www.youtu.be"):
        video_id = parsed.path.lstrip("/").split("/")[0]
        if video_id:
            return video_id

    # youtube.com/watch?v=<id>
    if "youtube.com" in parsed.netloc:
        qs = parse_qs(parsed.query)
        if "v" in qs:
            return qs["v"][0]

    raise ValueError(f"Could not extract video ID from URL: {url}")


def fetch_transcript(video_id: str) -> list[dict]:
    api = YouTubeTranscriptApi()
    fetched = api.fetch(video_id)
    return fetched.to_raw_data()


def clean_transcript(entries: list[dict]) -> str:
    """
    Merge transcript entries into readable paragraphs.
    Groups entries into ~30-second chunks, then joins chunks with blank lines.
    Cleans up common transcript artifacts.
    """
    CHUNK_SECONDS = 30

    chunks: list[list[str]] = []
    current_chunk: list[str] = []
    chunk_start = 0.0

    for entry in entries:
        text = entry["text"].strip()
        # Remove filler artifacts like [Music], [Applause], etc.
        text = re.sub(r"\[.*?\]", "", text).strip()
        if not text:
            continue

        # Capitalize first letter of each entry's text
        text = text[0].upper() + text[1:]

        if entry["start"] - chunk_start >= CHUNK_SECONDS and current_chunk:
            chunks.append(current_chunk)
            current_chunk = []
            chunk_start = entry["start"]

        current_chunk.append(text)

    if current_chunk:
        chunks.append(current_chunk)

    paragraphs = []
    for chunk in chunks:
        paragraph = " ".join(chunk)
        # Clean up spacing around punctuation
        paragraph = re.sub(r"\s+", " ", paragraph)
        paragraph = re.sub(r" ([.,!?;:])", r"\1", paragraph)
        paragraphs.append(paragraph)

    return "\n\n".join(paragraphs)


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/fetch_transcript.py <youtube_url>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]

    try:
        video_id = extract_video_id(url)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching transcript for video ID: {video_id}")

    try:
        entries = fetch_transcript(video_id)
    except Exception as e:
        print(f"Error fetching transcript: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"Downloaded {len(entries)} transcript entries.")

    cleaned = clean_transcript(entries)

    output_dir = os.path.join(os.path.dirname(__file__), "..", "output")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "transcript.txt")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"Video ID: {video_id}\n")
        f.write(f"Source URL: {url}\n")
        f.write("\n---\n\n")
        f.write(cleaned)

    print(f"Transcript saved to {output_path}")


if __name__ == "__main__":
    main()
