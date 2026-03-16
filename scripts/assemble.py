#!/usr/bin/env python3
"""
assemble.py — Combines generated section components into a single navigable React app.

Reads:
  output/components/*.jsx      — one component per section
  output/sections.json         — metadata (titles, colors, part numbers, etc.)

Writes:
  output/visualizations.jsx    — single self-contained React app
"""

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
COMPONENTS_DIR = ROOT / "output" / "components"
SECTIONS_FILE = ROOT / "output" / "sections.json"
OUTPUT_FILE = ROOT / "output" / "visualizations.jsx"


def snake_to_pascal(snake: str) -> str:
    return "".join(word.capitalize() for word in snake.split("_"))


def strip_export_default(source: str, component_name: str) -> str:
    """Remove 'export default ComponentName;' or 'export default function ...' forms."""
    # Remove standalone export default at end: export default Foo; or export default Foo (no semicolon)
    source = re.sub(
        rf"^\s*export\s+default\s+{re.escape(component_name)}\s*;?\s*$",
        "",
        source,
        flags=re.MULTILINE,
    )
    # Remove export keyword from exported function declaration
    source = re.sub(
        r"^\s*export\s+default\s+(function\s)",
        r"\1",
        source,
        flags=re.MULTILINE,
    )
    return source.strip()


def load_sections() -> list[dict]:
    with open(SECTIONS_FILE) as f:
        data = json.load(f)
    return data["sections"]


def load_component(section_id: str) -> str | None:
    path = COMPONENTS_DIR / f"{section_id}.jsx"
    if not path.exists():
        return None
    return path.read_text()


def build_imports() -> str:
    return """\
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, Cell, PieChart, Pie, ResponsiveContainer,
} from 'recharts';
import {
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  ArrowRight, ArrowLeft, ArrowDown, ArrowUp,
  Circle, Square, Triangle, Hexagon,
  Info, AlertCircle, CheckCircle, XCircle,
  Play, Pause, RefreshCw, Layers, Grid, List,
  Eye, EyeOff, Lock, Unlock, Star, Zap,
  BookOpen, Lightbulb, Target, Globe, Link,
} from 'lucide-react';\
"""


def build_sections_array(sections: list[dict]) -> str:
    entries = []
    for s in sections:
        entry = (
            f"  {{\n"
            f"    id: {json.dumps(s['id'])},\n"
            f"    name: {json.dumps(s['title'])},\n"
            f"    subtitle: {json.dumps(s.get('subtitle', ''))},\n"
            f"    part: {s['part_number']},\n"
            f"  }}"
        )
        entries.append(entry)
    return "const SECTIONS = [\n" + ",\n".join(entries) + "\n];"


def build_accent_map(sections: list[dict]) -> str:
    pairs = [f"  {json.dumps(s['id'])}: {json.dumps(s.get('accent_color', '#334155'))}" for s in sections]
    return "const accentMap = {\n" + ",\n".join(pairs) + "\n};"


def build_bg_map(sections: list[dict]) -> str:
    pairs = [f"  {json.dumps(s['id'])}: {json.dumps(s.get('background_mood', ''))}" for s in sections]
    return "const bgMap = {\n" + ",\n".join(pairs) + "\n};"


def build_viz_map(available_ids: list[str]) -> str:
    pairs = [f"  {json.dumps(sid)}: {snake_to_pascal(sid)}" for sid in available_ids]
    return "const vizMap = {\n" + ",\n".join(pairs) + "\n};"


def build_app_component() -> str:
    return """\
export default function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const tabBarRef = useRef(null);

  const activeSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];
  const accent = accentMap[activeId] || '#334155';
  const VizComponent = vizMap[activeId] || null;

  // Scroll active tab into view
  useEffect(() => {
    if (!tabBarRef.current) return;
    const activeTab = tabBarRef.current.querySelector('[data-active="true"]');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  const goTo = useCallback((delta) => {
    const idx = SECTIONS.findIndex((s) => s.id === activeId);
    const next = SECTIONS[idx + delta];
    if (next) setActiveId(next.id);
  }, [activeId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at 30% 20%, ${accent}33 0%, #0a0a0f 60%, #050508 100%)`,
        transition: 'background 0.6s ease',
        fontFamily: 'Georgia, serif',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(5,5,12,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${accent}44`,
          padding: '0.5rem 1rem',
        }}
      >
        {/* Part indicator + prev/next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <button
            onClick={() => goTo(-1)}
            disabled={SECTIONS[0].id === activeId}
            style={{
              background: 'none',
              border: `1px solid ${accent}66`,
              borderRadius: '4px',
              color: SECTIONS[0].id === activeId ? '#475569' : accent,
              cursor: SECTIONS[0].id === activeId ? 'not-allowed' : 'pointer',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontFamily: 'Georgia, serif',
            }}
          >
            ← Prev
          </button>

          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: accent,
              fontFamily: 'Georgia, serif',
            }}
          >
            Part {activeSection.part} of {SECTIONS.length}
          </span>

          <button
            onClick={() => goTo(1)}
            disabled={SECTIONS[SECTIONS.length - 1].id === activeId}
            style={{
              background: 'none',
              border: `1px solid ${accent}66`,
              borderRadius: '4px',
              color: SECTIONS[SECTIONS.length - 1].id === activeId ? '#475569' : accent,
              cursor: SECTIONS[SECTIONS.length - 1].id === activeId ? 'not-allowed' : 'pointer',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontFamily: 'Georgia, serif',
            }}
          >
            Next →
          </button>

          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.85rem',
              color: '#94a3b8',
              fontFamily: 'Georgia, serif',
              maxWidth: '50vw',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {activeSection.name}
          </span>
        </div>

        {/* Scrollable tab bar */}
        <div
          ref={tabBarRef}
          style={{
            display: 'flex',
            gap: '0.25rem',
            overflowX: 'auto',
            paddingBottom: '2px',
            scrollbarWidth: 'none',
          }}
        >
          {SECTIONS.map((s) => {
            const isActive = s.id === activeId;
            const tabAccent = accentMap[s.id] || '#334155';
            return (
              <button
                key={s.id}
                data-active={isActive}
                onClick={() => setActiveId(s.id)}
                style={{
                  flexShrink: 0,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '4px',
                  border: isActive ? `1px solid ${tabAccent}` : '1px solid #1e293b',
                  background: isActive ? `${tabAccent}22` : 'transparent',
                  color: isActive ? tabAccent : '#64748b',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontFamily: 'Georgia, serif',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ opacity: 0.6, marginRight: '0.3rem' }}>{s.part}.</span>
                {s.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main visualization area */}
      <main style={{ flex: 1, padding: '1.5rem 1rem 3rem' }}>
        {VizComponent ? (
          <VizComponent key={activeId} />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              color: '#475569',
              fontSize: '1rem',
              fontFamily: 'Georgia, serif',
            }}
          >
            Visualization not yet generated for this section.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '0.75rem',
          fontSize: '0.65rem',
          color: '#334155',
          letterSpacing: '0.08em',
          fontFamily: 'Georgia, serif',
          borderTop: '1px solid #0f172a',
        }}
      >
        {activeSection.subtitle}
      </footer>
    </div>
  );
}\
"""


def main():
    if not SECTIONS_FILE.exists():
        print(f"Error: {SECTIONS_FILE} not found. Run parse_sections.py first.", file=sys.stderr)
        sys.exit(1)

    sections = load_sections()
    print(f"Loaded {len(sections)} sections from sections.json")

    # Load components, skipping missing ones
    component_blocks = []
    available_ids = []
    missing = []

    for s in sections:
        sid = s["id"]
        source = load_component(sid)
        if source is None:
            missing.append(sid)
            continue

        component_name = snake_to_pascal(sid)
        cleaned = strip_export_default(source, component_name)
        component_blocks.append(f"// ─── Part {s['part_number']}: {s['title']} ───\n{cleaned}")
        available_ids.append(sid)

    print(f"Loaded {len(available_ids)} components ({len(missing)} missing: {missing or 'none'})")

    # Assemble
    parts = [
        build_imports(),
        "",
        build_sections_array(sections),
        "",
        build_accent_map(sections),
        "",
        build_bg_map(sections),
        "",
        "\n\n".join(component_blocks),
        "",
        build_viz_map(available_ids),
        "",
        build_app_component(),
    ]

    output = "\n".join(parts)

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(output)
    print(f"Written to {OUTPUT_FILE}")
    print(f"  {len(output):,} characters, {output.count(chr(10)):,} lines")


if __name__ == "__main__":
    main()
