#!/usr/bin/env python3
"""
Parse transcript into sections using Claude Sonnet 4.6.
Usage: python scripts/parse_sections.py
Reads: output/transcript.txt
Writes: output/sections.json
"""

import json
import os
import re
import sys
import time
import anthropic

TRANSCRIPT_PATH = os.path.join(os.path.dirname(__file__), "..", "output", "transcript.txt")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "output", "sections.json")
MODEL = "claude-sonnet-4-6"

# Pricing per million tokens (claude-sonnet-4-6, as of 2026-03)
PRICE_INPUT       = 3.00   # $/MTok
PRICE_OUTPUT      = 15.00  # $/MTok
PRICE_CACHE_WRITE = 3.75   # $/MTok
PRICE_CACHE_READ  = 0.30   # $/MTok


def tokens_to_cost(input: int, output: int,
                   cache_write: int = 0, cache_read: int = 0) -> float:
    return (
        input        * PRICE_INPUT        / 1_000_000
        + output     * PRICE_OUTPUT       / 1_000_000
        + cache_write * PRICE_CACHE_WRITE / 1_000_000
        + cache_read  * PRICE_CACHE_READ  / 1_000_000
    )


SYSTEM_PROMPT = """You are an expert at analyzing educational lecture transcripts and extracting structured information.
Your task is to parse a transcript into logical sections and extract detailed metadata for each.
You must return ONLY valid JSON — no markdown, no code fences, no commentary. Just the raw JSON object."""

USER_PROMPT_TEMPLATE = """Analyze this educational transcript and split it into its logical sections.

For each section, extract the following fields:

- part_number: integer (1-based, sequential)
- id: short snake_case identifier (e.g., "pre_socratic_being", "platos_forms")
- title: concise section title
- subtitle: one sentence expanding on the title
- key_concepts: list of 3-6 core concepts or terms introduced
- core_argument: 3-5 sentences. State the central argument and what makes it novel — how it departs from or builds on predecessors or earlier sections in the video. Include at least one concrete example or analogy from the transcript that makes the idea tangible. IMPORTANT: do not reference other parts by number (e.g. "Part 3", "the previous section") — the core_argument must be fully self-contained and readable without knowledge of any other section.
- problem_inherited: the specific problem or tension from a previous section that this one is responding to (null for the first section)
- solution: how this section's key idea resolves or addresses the inherited problem (1-2 sentences)
- problem_created: the new difficulty, tension, or open question this section's idea generates. Explicitly name what the NEXT section must address — use a forward-linking phrase like "This raises the question of…" or "This now requires an account of…" to make the narrative handoff clear. (2-3 sentences)
- real_world_examples: list of objects with "title" and "explanation" keys — each a specific, named example or modern parallel drawn from the transcript, with 1-2 sentences explaining why it illuminates, extends, or challenges this section's idea. Aim for 3-5 examples. Prefer named scholars, experiments, organisms, or institutions over generic references. Empty list only if the transcript genuinely contains none.
- visualization_suggestion: 3-5 sentences. Begin by naming the specific conceptual difficulty the visualization must solve (e.g., "The hard part is showing why X is not simply Y…"). Then describe the layout, the interactive elements (slider, click states, hover), and precisely how user interaction reveals the concept rather than merely decorating it.
- accent_color: a hex color string (e.g., "#7C3AED") — unique per section, chosen to evoke the mood/theme. Must be a MID-RANGE colour with sufficient brightness to be readable as foreground text on a dark background (perceived brightness 80–180 on a 0–255 scale). Do NOT pick near-black colours (e.g. #1A1A2E, #0a0a0f) — those are background colours, not accents. Good examples: "#7C3AED", "#C2410C", "#0E7490", "#B45309", "#9D174D"
- background_mood: 1-2 words describing the visual atmosphere (e.g., "volcanic tension", "crystalline clarity", "twilight uncertainty")

Return a single JSON object with two keys:
- "topic": a short phrase (3-6 words) naming the overall subject of the video (e.g., "Kant's critical philosophy", "the history of ontology")
- "sections": an array of section objects

TRANSCRIPT:
{transcript}"""


def read_transcript() -> str:
    if not os.path.exists(TRANSCRIPT_PATH):
        print(f"Error: transcript not found at {TRANSCRIPT_PATH}", file=sys.stderr)
        print("Run scripts/fetch_transcript.py first.", file=sys.stderr)
        sys.exit(1)
    with open(TRANSCRIPT_PATH, "r", encoding="utf-8") as f:
        return f.read()


def extract_json(text: str) -> str:
    """Strip markdown code fences if Claude wrapped the JSON."""
    text = text.strip()
    # Remove ```json ... ``` or ``` ... ``` wrappers
    match = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", text)
    if match:
        return match.group(1).strip()
    return text


def call_claude(client: anthropic.Anthropic, transcript: str, attempt: int) -> str:
    """Call Claude with streaming and return the full response text."""
    prompt = USER_PROMPT_TEMPLATE.format(transcript=transcript)

    print(f"  Sending request to {MODEL} (attempt {attempt})...")

    full_text = ""
    with client.messages.stream(
        model=MODEL,
        max_tokens=64000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
        extra_headers={"anthropic-beta": "output-128k-2025-02-19"},
    ) as stream:
        for text_chunk in stream.text_stream:
            full_text += text_chunk
            # Show a simple progress indicator
            if len(full_text) % 2000 < len(text_chunk):
                print(f"  ... {len(full_text):,} chars received", end="\r")

        final = stream.get_final_message()

    u = final.usage
    inp   = getattr(u, "input_tokens", 0) or 0
    out   = getattr(u, "output_tokens", 0) or 0
    cw    = getattr(u, "cache_creation_input_tokens", 0) or 0
    cr    = getattr(u, "cache_read_input_tokens", 0) or 0
    cost  = tokens_to_cost(inp, out, cw, cr)
    print(f"  Done. {len(full_text):,} chars. "
          f"Tokens: {inp:,} in / {out:,} out  —  estimated cost: ${cost:.4f}")

    if final.stop_reason == "max_tokens":
        print("Warning: response was truncated (hit max_tokens). "
              "Attempting to use partial output.", file=sys.stderr)

    return full_text


def parse_with_retry(client: anthropic.Anthropic, transcript: str) -> dict:
    """Call Claude and retry on API errors or JSON parse failures."""
    max_attempts = 4
    base_delay = 5.0

    last_error = None
    for attempt in range(1, max_attempts + 1):
        try:
            raw = call_claude(client, transcript, attempt)
            json_str = extract_json(raw)
            data = json.loads(json_str)

            # Validate basic structure
            if "sections" not in data:
                raise ValueError("Response JSON missing 'sections' key")
            if not isinstance(data["sections"], list) or len(data["sections"]) == 0:
                raise ValueError("'sections' must be a non-empty list")

            return data

        except anthropic.RateLimitError as e:
            last_error = e
            retry_after = int(e.response.headers.get("retry-after", str(int(base_delay * (2 ** attempt)))))
            print(f"Rate limited. Waiting {retry_after}s before retry...", file=sys.stderr)
            time.sleep(retry_after)

        except anthropic.APIStatusError as e:
            last_error = e
            if e.status_code >= 500:
                delay = base_delay * (2 ** (attempt - 1))
                print(f"Server error ({e.status_code}). Waiting {delay:.0f}s before retry...",
                      file=sys.stderr)
                time.sleep(delay)
            else:
                raise  # 4xx client errors are not retryable

        except anthropic.APIConnectionError as e:
            last_error = e
            delay = base_delay * (2 ** (attempt - 1))
            print(f"Connection error. Waiting {delay:.0f}s before retry...", file=sys.stderr)
            time.sleep(delay)

        except (json.JSONDecodeError, ValueError) as e:
            last_error = e
            if attempt < max_attempts:
                delay = base_delay * attempt
                print(f"JSON parse error: {e}. Waiting {delay:.0f}s before retry...",
                      file=sys.stderr)
                time.sleep(delay)
            else:
                raise RuntimeError(
                    f"Failed to get valid JSON after {max_attempts} attempts. "
                    f"Last error: {e}"
                ) from e

    raise RuntimeError(
        f"Failed after {max_attempts} attempts. Last error: {last_error}"
    ) from last_error


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)

    print("Reading transcript...")
    transcript = read_transcript()
    print(f"Transcript loaded: {len(transcript):,} characters.")

    client = anthropic.Anthropic(api_key=api_key, max_retries=2)

    print(f"Parsing sections with {MODEL}...")
    start = time.time()
    data = parse_with_retry(client, transcript)
    elapsed = time.time() - start

    sections = data["sections"]
    print(f"Parsed {len(sections)} sections in {elapsed:.1f}s.")

    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Saved to {OUTPUT_PATH}")
    print()
    print("Sections found:")
    for s in sections:
        part = s.get("part_number", "?")
        title = s.get("title", "(untitled)")
        sid = s.get("id", "")
        print(f"  Part {part:>2}: {title}  [{sid}]")


if __name__ == "__main__":
    main()
