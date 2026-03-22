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
} from 'lucide-react';

const SECTIONS = [
  {
    id: "aristotle_introduction",
    name: "The Most Influential Mind in History",
    subtitle: "Understanding Aristotle's extraordinary reach across disciplines and why even his errors reveal a systematic genius.",
    part: 1,
  },
  {
    id: "empirical_revolution",
    name: "The Empirical Revolution",
    subtitle: "Aristotle rebuilt philosophy from the ground up by insisting that theory must begin with and be tested against observable reality.",
    part: 2,
  },
  {
    id: "logic_architecture_of_thought",
    name: "Logic and the Architecture of Thought",
    subtitle: "Aristotle invented formal logic as a discipline, creating the first systematic map of valid reasoning that dominated for over two thousand years.",
    part: 3,
  },
  {
    id: "metaphysics_substance_essence",
    name: "Metaphysics: Substance, Essence, and What Really Exists",
    subtitle: "Aristotle mapped the fundamental structure of reality by distinguishing substances from properties, and essential natures from accidental features.",
    part: 4,
  },
  {
    id: "four_causes",
    name: "The Four Causes and How Explanation Works",
    subtitle: "Aristotle argued that fully explaining anything requires identifying four distinct types of cause: material, formal, efficient, and final.",
    part: 5,
  },
  {
    id: "form_matter_potentiality_actuality",
    name: "Form and Matter, Potentiality and Actuality",
    subtitle: "Aristotle solved the ancient puzzle of change and identity by distinguishing the organizing form from the underlying matter and potential being from actual being.",
    part: 6,
  },
  {
    id: "aristotelian_physics_cosmology",
    name: "Physics, Motion, and Cosmology",
    subtitle: "Aristotle's comprehensive physics of natural and violent motion, natural places, and a geocentric finite cosmos was spectacularly wrong yet asked all the right questions.",
    part: 7,
  },
  {
    id: "aristotle_biology",
    name: "Biology and the Science of Life",
    subtitle: "Aristotle's greatest empirical success was systematic biology, where his observational accuracy and functional framework anticipated discoveries confirmed millennia later.",
    part: 8,
  },
  {
    id: "soul_mind_human_nature",
    name: "The Soul, Mind, and Human Nature",
    subtitle: "Aristotle's naturalistic account of soul as the form of a living body bridges his metaphysics and biology while raising the hard problem of consciousness.",
    part: 9,
  },
  {
    id: "ethics_virtue_good_life",
    name: "Ethics, Virtue, Character, and the Good Life",
    subtitle: "Aristotle grounded morality in human flourishing, arguing that virtue is a stable disposition of character cultivated through habituation and guided by practical wisdom.",
    part: 10,
  },
  {
    id: "political_philosophy_community",
    name: "Political Philosophy and the Science of Community",
    subtitle: "Aristotle grounded politics in human nature as inherently social, analyzed constitutions empirically, and sought the regime best suited to human flourishing.",
    part: 11,
  },
  {
    id: "rhetoric_persuasion_communication",
    name: "Rhetoric, Persuasion, and Communication",
    subtitle: "Aristotle systematized persuasion as a legitimate art form, identifying ethos, pathos, and logos as the three universal modes of effective and ethical communication.",
    part: 12,
  },
  {
    id: "poetics_tragedy_art",
    name: "Poetics, Tragedy, and the Nature of Art",
    subtitle: "Aristotle analyzed tragedy as mimesis of serious action that produces catharsis, identifying plot structure, character, and the tragic hero as the foundations of powerful narrative.",
    part: 13,
  },
  {
    id: "aristotle_legacy_history",
    name: "Aristotle's Legacy and His Influence Through History",
    subtitle: "From near-disappearance after his death to Islamic preservation, medieval synthesis with Christianity, and modern revival, Aristotle's influence is the story of Western intellectual history itself.",
    part: 14,
  },
  {
    id: "where_system_breaks",
    name: "Where the System Breaks: Modern Critiques and Unresolved Problems",
    subtitle: "Aristotle's philosophy faces fundamental challenges from modern physics, evolutionary biology, democratic politics, feminist critique, and the hard problem of consciousness that it cannot answer within its own terms.",
    part: 15,
  }
];

const accentMap = {
  "aristotle_introduction": "#C2410C",
  "empirical_revolution": "#0E7490",
  "logic_architecture_of_thought": "#7C3AED",
  "metaphysics_substance_essence": "#B45309",
  "four_causes": "#16A34A",
  "form_matter_potentiality_actuality": "#9D174D",
  "aristotelian_physics_cosmology": "#D97706",
  "aristotle_biology": "#059669",
  "soul_mind_human_nature": "#6366F1",
  "ethics_virtue_good_life": "#EA580C",
  "political_philosophy_community": "#0369A1",
  "rhetoric_persuasion_communication": "#DC2626",
  "poetics_tragedy_art": "#7E22CE",
  "aristotle_legacy_history": "#A16207",
  "where_system_breaks": "#BE185D"
};

const bgMap = {
  "aristotle_introduction": "epic scale",
  "empirical_revolution": "grounded curiosity",
  "logic_architecture_of_thought": "crystalline precision",
  "metaphysics_substance_essence": "structural depth",
  "four_causes": "purposeful growth",
  "form_matter_potentiality_actuality": "dynamic becoming",
  "aristotelian_physics_cosmology": "cosmic wrongness",
  "aristotle_biology": "natural wonder",
  "soul_mind_human_nature": "inner illumination",
  "ethics_virtue_good_life": "moral clarity",
  "political_philosophy_community": "civic order",
  "rhetoric_persuasion_communication": "persuasive tension",
  "poetics_tragedy_art": "dramatic intensity",
  "aristotle_legacy_history": "historical sweep",
  "where_system_breaks": "twilight reckoning"
};

// ─── Part 1: The Most Influential Mind in History ───
function AristotleIntroduction() {
  const ACCENT = "#C2410C";
  const ACCENT_LIGHT = "#f97316";
  const ACCENT_DIM = "#3a1205";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);

  const domains = [
    {
      id: "logic",
      label: "Logic",
      angle: 0,
      legacyScore: 92,
      retained: true,
      claim: "Syllogistic reasoning is the foundation of valid inference — if A implies B, and B implies C, then A implies C.",
      modern: "Formal logic still uses Aristotelian syllogisms as its historical bedrock. Predicate logic extended rather than replaced his framework. His core insight was correct.",
    },
    {
      id: "ethics",
      label: "Ethics",
      angle: 45,
      legacyScore: 85,
      retained: true,
      claim: "Virtue is a mean between extremes; human flourishing (eudaimonia) is the highest good and purpose of life.",
      modern: "Virtue ethics is a major contemporary school. Aristotle's 'eudaimonia' directly informs modern debates in moral philosophy, psychology, and political theory.",
    },
    {
      id: "biology",
      label: "Biology",
      angle: 90,
      legacyScore: 60,
      retained: false,
      claim: "Women have fewer teeth than men. Spontaneous generation creates flies from rotting meat. The heart is the seat of thought.",
      modern: "Spectacularly wrong on anatomy — women and men have the same number of teeth. Spontaneous generation was disproven by Pasteur. The brain, not the heart, controls thought.",
    },
    {
      id: "physics",
      label: "Physics",
      angle: 135,
      legacyScore: 15,
      retained: false,
      claim: "Heavier objects fall faster than lighter ones. All matter is composed of four elements: earth, water, fire, air.",
      modern: "Galileo disproved falling-body claims experimentally. Newtonian mechanics and atomic theory replaced elemental theory entirely. Almost nothing survived.",
    },
    {
      id: "politics",
      label: "Politics",
      angle: 180,
      legacyScore: 78,
      retained: true,
      claim: "Humans are political animals (zoon politikon). The best government balances elements of monarchy, aristocracy, and democracy.",
      modern: "The idea of humans as inherently social/political beings remains foundational. Constitutional mixed governance echoes his Politeia. His classification of government types persists in political science.",
    },
    {
      id: "metaphysics",
      label: "Metaphysics",
      angle: 225,
      legacyScore: 80,
      retained: true,
      claim: "Substance, essence, form, and matter are the fundamental categories of being. Everything has a telos — a final purpose.",
      modern: "Aristotelian categories shaped medieval scholasticism and persist in contemporary ontology. 'Essence' debates in analytic philosophy trace directly to his Metaphysics.",
    },
    {
      id: "rhetoric",
      label: "Rhetoric",
      angle: 270,
      legacyScore: 88,
      retained: true,
      claim: "Persuasion rests on three pillars: ethos (credibility), pathos (emotion), and logos (logic). Rhetoric is a neutral art of discourse.",
      modern: "Ethos, pathos, logos are taught in every communications curriculum worldwide. His Rhetoric remains the foundational text of the field after 2,400 years.",
    },
    {
      id: "poetics",
      label: "Poetics",
      angle: 315,
      legacyScore: 82,
      retained: true,
      claim: "Tragedy achieves catharsis through pity and fear. Drama must have unity of plot; character serves story.",
      modern: "Catharsis, mimesis, and dramatic unity remain central to literary criticism and film theory. Screenwriting manuals still cite Aristotle's three-act structure implicitly.",
    },
  ];

  const keyConcepts = [
    {
      id: "systematic",
      label: "Systematic Philosophy",
      desc: "Aristotle was the first thinker to attempt a total account of reality — not just ethics or nature, but everything simultaneously. His treatises form an interconnected web where logic grounds biology, biology informs ethics, and ethics shapes politics. This systematic ambition set the template for what 'philosophy' as a discipline would mean for millennia.",
    },
    {
      id: "observation",
      label: "Observation & Reason",
      desc: "Unlike his teacher Plato, Aristotle insisted that knowledge must begin with sensory observation of the actual world. He dissected animals, surveyed 158 constitutions, and catalogued hundreds of species. Yet he also recognized that raw observation without rational structure yields only data, not understanding — the combination of both is his signature method.",
    },
    {
      id: "dominance",
      label: "Intellectual Dominance",
      desc: "For nearly 1,800 years — from roughly 300 CE to 1600 CE — Aristotle's texts were the intellectual scaffolding of Western civilization. Medieval universities taught 'the Philosopher' (no first name needed) as near-scripture. Islamic scholars preserved and extended his work during Europe's Dark Ages. Disagreeing with Aristotle required extraordinary justification.",
    },
    {
      id: "wrong",
      label: "Spectacularly Wrong",
      desc: "Aristotle claimed women have fewer teeth than men, that heavier objects fall faster, and that the brain is merely a cooling organ for the blood. He never counted teeth or tested falling bodies — revealing that even his empirical method had blind spots. His errors are as instructive as his insights: they show where confident deduction outran careful observation.",
    },
    {
      id: "frameworks",
      label: "Conceptual Frameworks",
      desc: "Even when specific Aristotelian claims were overturned, his conceptual frameworks often survived. The categories of substance and accident, the distinction between form and matter, the idea of teleological explanation — these are lenses through which we still perceive philosophical problems, whether or not we endorse the original answers Aristotle gave.",
    },
    {
      id: "legacy",
      label: "Philosophical Legacy",
      desc: "Contemporary law uses Aristotelian notions of equity and proportional justice. Modern biology's taxonomy traces to his classification project. Virtue ethics is a thriving field in moral philosophy. Literary criticism still debates catharsis. No other single thinker has seeded so many living intellectual traditions simultaneously across such unrelated domains.",
    },
  ];

  const realWorldEchoes = [
    {
      title: "How We Organize Knowledge",
      body: "University faculties — humanities, sciences, social sciences, arts — reflect Aristotle's original disciplinary divisions. The very idea that knowledge can be partitioned into domains with distinct methods is his. Library classification systems, academic journal categories, and curriculum design all trace their logic to his encyclopedic project of sorting what there is to know.",
    },
    {
      title: "How We Justify Moral Choices",
      body: "When people argue that a character trait (honesty, courage, compassion) is a virtue that leads to human flourishing, they are reasoning in Aristotelian terms — whether they know it or not. Contemporary moral psychology, positive psychology's concept of 'well-being,' and legal notions of 'good character' all flow from his Nicomachean Ethics.",
    },
    {
      title: "How We Structure Scientific Inquiry",
      body: "The demand that scientific claims be grounded in observation, that causes be sought rather than mere correlations, and that explanations identify what a thing fundamentally is — these methodological commitments are Aristotelian. The Scientific Revolution refined his methods but inherited the basic epistemological architecture.",
    },
    {
      title: "Rhetoric and Modern Persuasion",
      body: "Every political speech, advertising campaign, and courtroom argument is unconsciously structured by Aristotle's three appeals: ethos (why should I trust you?), pathos (how does this make me feel?), logos (does the reasoning hold?). Marketing consultants and debate coaches use exactly these categories, often without knowing their ancient source.",
    },
  ];

  const cx = 200;
  const cy = 200;
  const outerR = 150;
  const innerR = 42;
  const spokePad = 18;

  function polarToXY(angleDeg, r) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function getLegacyColor(score, retained) {
    if (retained) {
      const t = (score - 60) / 40;
      return ACCENT_LIGHT;
    }
    return "#4a4a5a";
  }

  const active = selectedDomain || hoveredDomain;
  const activeDomain = domains.find((d) => d.id === active);

  return (
    <div
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #3a1205 0%, #0a0a0f 80%)`,
        minHeight: "100vh",
        padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
        fontFamily: "Georgia, serif",
        color: TITLE_COLOR,
      }}
    >
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            Part 1 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1
            style={{
              fontSize: "clamp(22px,4vw,36px)",
              fontWeight: "normal",
              color: TITLE_COLOR,
              margin: "0 0 10px 0",
              lineHeight: 1.3,
            }}
          >
            The Most Influential Mind in History
          </h1>
          <p
            style={{
              fontSize: "clamp(13px,2vw,16px)",
              color: SUBTITLE_COLOR,
              margin: 0,
              lineHeight: 1.7,
              fontStyle: "italic",
              maxWidth: 620,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Understanding Aristotle's extraordinary reach across disciplines and why even his errors reveal a systematic genius.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div
          style={{
            background: "rgba(0,0,0,0.38)",
            border: `1px solid ${ACCENT}44`,
            borderRadius: 12,
            padding: "clamp(16px,3vw,32px)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 4,
            }}
          >
            Aristotle's Domain — Interactive Map
          </div>
          <p style={{ fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, margin: "0 0 20px 0", lineHeight: 1.6 }}>
            Click any domain spoke to reveal what Aristotle claimed, what modernity thinks, and how much survived. Glowing spokes indicate lasting influence; dimmed spokes mark where he was overturned.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg
              viewBox="0 0 400 400"
              width="100%"
              style={{ maxWidth: 420, display: "block" }}
              aria-label="Aristotle domain radial diagram"
            >
              {/* Outer ring */}
              <circle
                cx={cx}
                cy={cy}
                r={outerR + 14}
                fill="none"
                stroke={ACCENT + "22"}
                strokeWidth={1}
              />
              <circle
                cx={cx}
                cy={cy}
                r={outerR - 10}
                fill="none"
                stroke={ACCENT + "15"}
                strokeWidth={1}
                strokeDasharray="4 6"
              />

              {/* Spokes and labels */}
              {domains.map((d) => {
                const tip = polarToXY(d.angle, outerR - spokePad);
                const labelPos = polarToXY(d.angle, outerR + 26);
                const isActive = active === d.id;
                const glowColor = d.retained ? ACCENT_LIGHT : "#6a6a7a";
                const strokeColor = isActive ? ACCENT_LIGHT : d.retained ? ACCENT + "cc" : "#4a4a5a";
                const strokeW = isActive ? 3.5 : 2;

                // Score marker position
                const markerR = innerR + ((outerR - innerR - spokePad) * d.legacyScore) / 100;
                const markerPos = polarToXY(d.angle, markerR);

                return (
                  <g key={d.id}>
                    {/* Spoke line */}
                    <line
                      x1={polarToXY(d.angle, innerR).x}
                      y1={polarToXY(d.angle, innerR).y}
                      x2={tip.x}
                      y2={tip.y}
                      stroke={strokeColor}
                      strokeWidth={strokeW}
                      strokeLinecap="round"
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />

                    {/* Glow effect for retained */}
                    {d.retained && (
                      <line
                        x1={polarToXY(d.angle, innerR).x}
                        y1={polarToXY(d.angle, innerR).y}
                        x2={tip.x}
                        y2={tip.y}
                        stroke={ACCENT_LIGHT}
                        strokeWidth={isActive ? 8 : 5}
                        strokeLinecap="round"
                        opacity={isActive ? 0.18 : 0.08}
                        style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
                      />
                    )}

                    {/* Legacy score marker */}
                    <circle
                      cx={markerPos.x}
                      cy={markerPos.y}
                      r={isActive ? 6 : 4}
                      fill={d.retained ? ACCENT_LIGHT : "#6a6a7a"}
                      opacity={isActive ? 1 : 0.7}
                      style={{ transition: "r 0.3s, opacity 0.3s" }}
                    />

                    {/* Hit area */}
                    <line
                      x1={polarToXY(d.angle, innerR).x}
                      y1={polarToXY(d.angle, innerR).y}
                      x2={tip.x}
                      y2={tip.y}
                      stroke="transparent"
                      strokeWidth={22}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedDomain(selectedDomain === d.id ? null : d.id)
                      }
                      onMouseEnter={() => setHoveredDomain(d.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    />

                    {/* Domain label */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? ACCENT_LIGHT : d.retained ? "#d4c8b8" : SUBTITLE_COLOR}
                      fontSize={isActive ? 13 : 11.5}
                      fontFamily="Georgia, serif"
                      style={{
                        cursor: "pointer",
                        transition: "fill 0.3s, font-size 0.3s",
                        userSelect: "none",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                      onClick={() =>
                        setSelectedDomain(selectedDomain === d.id ? null : d.id)
                      }
                      onMouseEnter={() => setHoveredDomain(d.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Center circle */}
              <circle
                cx={cx}
                cy={cy}
                r={innerR}
                fill="#0a0a0f"
                stroke={ACCENT}
                strokeWidth={2}
              />
              <circle
                cx={cx}
                cy={cy}
                r={innerR - 6}
                fill="none"
                stroke={ACCENT + "44"}
                strokeWidth={1}
              />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                fill={TITLE_COLOR}
                fontSize={13}
                fontFamily="Georgia, serif"
                fontStyle="italic"
              >
                Aristotle
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fill={ACCENT + "cc"}
                fontSize={9}
                fontFamily="Georgia, serif"
                letterSpacing={1}
              >
                384–322 BCE
              </text>

              {/* Legend */}
              <g transform="translate(16, 370)">
                <circle cx={7} cy={7} r={5} fill={ACCENT_LIGHT} opacity={0.85} />
                <text x={16} y={11} fill={SUBTITLE_COLOR} fontSize={9.5} fontFamily="Georgia, serif">
                  Largely retained
                </text>
                <circle cx={110} cy={7} r={5} fill="#6a6a7a" />
                <text x={119} y={11} fill={SUBTITLE_COLOR} fontSize={9.5} fontFamily="Georgia, serif">
                  Largely overturned
                </text>
              </g>
            </svg>

            {/* Detail panel */}
            <div
              style={{
                width: "100%",
                minHeight: 140,
                background: activeDomain ? "rgba(194,65,12,0.08)" : "rgba(0,0,0,0.2)",
                border: `1px solid ${activeDomain ? ACCENT + "55" : "#ffffff11"}`,
                borderRadius: 8,
                padding: "clamp(14px,2vw,20px)",
                transition: "background 0.4s, border-color 0.4s",
              }}
            >
              {activeDomain ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "clamp(16px,2.5vw,22px)",
                        color: activeDomain.retained ? ACCENT_LIGHT : "#9a9ab0",
                        fontWeight: "bold",
                      }}
                    >
                      {activeDomain.label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: activeDomain.retained ? ACCENT_LIGHT : "#6a6a7a",
                        background: activeDomain.retained ? ACCENT + "22" : "#6a6a7a22",
                        border: `1px solid ${activeDomain.retained ? ACCENT + "55" : "#6a6a7a55"}`,
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      {activeDomain.retained ? "Largely Retained" : "Largely Overturned"}
                    </span>
                  </div>

                  {/* Legacy score bar */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: SUBTITLE_COLOR, marginBottom: 4, letterSpacing: 1 }}>
                      LEGACY SCORE — {activeDomain.legacyScore}%
                    </div>
                    <div style={{ height: 6, background: "#ffffff15", borderRadius: 4, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${activeDomain.legacyScore}%`,
                          background: activeDomain.retained
                            ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`
                            : "#4a4a5a",
                          borderRadius: 4,
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: ACCENT,
                          marginBottom: 4,
                        }}
                      >
                        Aristotle's Claim
                      </div>
                      <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: "#d4c8b8", lineHeight: 1.7, fontStyle: "italic" }}>
                        "{activeDomain.claim}"
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: activeDomain.retained ? ACCENT_LIGHT : "#9a9ab0",
                          marginBottom: 4,
                        }}
                      >
                        Modern Assessment
                      </div>
                      <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.7 }}>
                        {activeDomain.modern}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 140,
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ fontSize: "clamp(13px,2vw,15px)", color: SUBTITLE_COLOR, fontStyle: "italic", textAlign: "center" }}>
                    Click or hover any domain spoke to explore Aristotle's claims and their modern legacy.
                  </div>
                  <div style={{ fontSize: 11, color: ACCENT + "88", letterSpacing: 1 }}>
                    8 DOMAINS · 2,400 YEARS OF INFLUENCE
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 24px)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 14,
            }}
          >
            Key Concepts — Click to Explore
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: hoveredConcept ? 16 : 0,
            }}
          >
            {keyConcepts.map((kc) => {
              const isActive = hoveredConcept === kc.id;
              return (
                <button
                  key={kc.id}
                  onClick={() => setHoveredConcept(isActive ? null : kc.id)}
                  style={{
                    background: isActive ? ACCENT : "transparent",
                    border: `1px solid ${isActive ? ACCENT : ACCENT + "66"}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: isActive ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(11px,1.6vw,13px)",
                    fontFamily: "Georgia, serif",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s, color 0.2s",
                  }}
                >
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (
            <div
              style={{
                marginTop: 12,
                background: ACCENT + "12",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.75 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}33`,
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: 8,
            padding: "clamp(16px,3vw,24px)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            The Difficulty
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.9vw,15px)", color: "#d4c8b8", lineHeight: 1.8 }}>
            If Aristotle was both profoundly right and spectacularly wrong, we need a principled method for distinguishing what to keep from what to discard. His legacy score varies from 92% in Logic to barely 15% in Physics — yet both emerged from the same mind using ostensibly the same approach of observation and reason. This tension raises the deeper question of what philosophical method he was actually using and where it came from. This pressure forces the next development: understanding the intellectual world Aristotle inherited and how his method was forged from it.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
                fontFamily: "Georgia, serif",
              }}
            >
              Real-World Echoes
            </span>
            {echoesOpen ? (
              <ChevronUp size={16} color={ACCENT} />
            ) : (
              <ChevronDown size={16} color={ACCENT} />
            )}
          </button>

          {echoesOpen && (
            <div
              style={{
                padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {realWorldEchoes.map((echo, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    borderRadius: "0 6px 6px 0",
                    background: ACCENT + "0a",
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: ACCENT_LIGHT,
                      marginBottom: 6,
                    }}
                  >
                    {echo.title}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#b8b0a8",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {echo.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div
          style={{
            textAlign: "center",
            marginTop: 36,
            fontSize: 12,
            color: ACCENT_DIM,
            letterSpacing: 1,
          }}
        >
          Part 1 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>
      </div>
    </div>
  );
}

// ─── Part 2: The Empirical Revolution ───
function EmpiricalRevolution() {
  const ACCENT = "#0E7490";
  const ACCENT_LIGHT = "#38BDF8";
  const ACCENT_DIM = "#0a3040";
  const ACCENT_MID = "#0E749066";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [draggedConcept, setDraggedConcept] = useState(null);
  const [placedConcept, setPlacedConcept] = useState(null);
  const [activeSide, setActiveSide] = useState(null);
  const [methodStep, setMethodStep] = useState(-1);
  const [methodRunning, setMethodRunning] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  const concepts = [
    { id: "table", label: "Table", icon: "⬛" },
    { id: "justice", label: "Justice", icon: "⚖" },
    { id: "beauty", label: "Beauty", icon: "✦" },
  ];

  const methodSteps = [
    { label: "Observe", desc: "Go out and look at actual things in the world — specimens, behaviors, events." },
    { label: "Categorize", desc: "Sort observations into meaningful groups using conceptual categories." },
    { label: "Theorize", desc: "Construct a general explanation from the patterns you find." },
    { label: "Test", desc: "Check your theory against new observations and cases." },
    { label: "Revise", desc: "Correct the theory where it fails, then cycle again." },
  ];

  const platoAnalysis = {
    table: { title: "The Form of Table", body: "Your wooden table is a pale shadow of the eternal, perfect Form of Table-ness. True knowledge of the table means ascending beyond this imperfect copy to grasp the unchanging ideal that it imperfectly reflects. The physical table is almost irrelevant to genuine understanding." },
    justice: { title: "The Form of Justice", body: "Justice in this city or that court case is a mere approximation of the eternal Form of Justice — absolute, unchanging, perfect. True knowledge of justice requires turning away from messy human affairs toward the pure Idea itself, grasped by intellect alone." },
    beauty: { title: "The Form of Beauty", body: "This beautiful face or sunset is only beautiful because it participates, weakly, in the Form of Beauty — perfect and eternal. Real philosophical inquiry ascends from particular beautiful things to Beauty Itself, leaving the sensory world behind." },
  };

  const aristotleAnalysis = {
    table: { title: "What actual tables do", body: "Examine real tables: wood, stone, metal, small, large, three-legged, four-legged. A table is defined by its function and form together — its substance is the organized matter that enables it to serve its purpose. Categories apply: substance (what it is), quantity (size), quality (material), relation (to chairs), place, state. Theory emerges from specimens." },
    justice: { title: "Justice in actual communities", body: "Observe real constitutions — Aristotle surveyed 158 of them. Justice differs: distributive (fair shares), corrective (rectifying wrongs), reciprocal (fair exchange). Theorize from these cases, then test the theory on new communities. Ethics requires knowing actual human beings, not just an abstract Form." },
    beauty: { title: "Beauty in actual things", body: "Beautiful objects share observable features: order, symmetry, definiteness, appropriate magnitude. Observe tragic plays, fine horses, well-proportioned buildings. Beauty is not a separate realm but a property of things in this world — your theory of beauty must account for why these particular things strike us as beautiful." },
  };

  const runMethod = () => {
    if (methodRunning) return;
    setMethodRunning(true);
    setMethodStep(-1);
    let step = 0;
    const advance = () => {
      setMethodStep(step);
      step++;
      if (step < methodSteps.length) {
        setTimeout(advance, 1100);
      } else {
        setTimeout(() => {
          setMethodRunning(false);
        }, 1200);
      }
    };
    setTimeout(advance, 200);
  };

  const keyConcepts = [
    { id: "empiricism", label: "Empiricism", desc: "Empiricism is the philosophical commitment to grounding all knowledge in sensory experience and observation. For Aristotle, this was not mere data-collection — it was the necessary first step in any inquiry, preventing theory from floating free of reality. Without grounding claims in what can be observed, philosophy becomes mythology." },
    { id: "forms_rejected", label: "Forms Rejected", desc: "Plato's Forms were eternal, perfect, non-physical archetypes that physical things merely imitate. Aristotle rejected their separate existence, arguing that the 'form' of a thing — what makes it what it is — exists only within the thing itself, not in a transcendent realm. This keeps philosophy tethered to the actual world." },
    { id: "categories", label: "Ten Categories", desc: "Aristotle developed ten fundamental categories for organizing observations: substance, quantity, quality, relation, place, time, position, state, action, and affection. These are the irreducible types of things one can say about anything that exists. They give observation a conceptual skeleton without replacing observation with pure abstraction." },
    { id: "systematic_bio", label: "Systematic Biology", desc: "Aristotle's biological works — Historia Animalium, Parts of Animals, Generation of Animals — represent the first systematic attempt to describe and classify the living world. He described over 500 species, performed dissections, and correctly identified dolphins and whales as air-breathing mammals, not fish — a finding not rediscovered for 2,000 years." },
    { id: "theory_balance", label: "Theory-Observation Balance", desc: "Aristotle understood that raw observation without theory is blind, and theory without observation is empty. He developed a method of moving back and forth: observe particulars, form a universal theory, check it against new particulars, revise. This feedback loop is the ancestor of scientific method as we practice it today." },
    { id: "lyceum", label: "The Lyceum", desc: "Aristotle founded his school, the Lyceum, in Athens around 335 BCE — arguably the world's first research institution. Students and collaborators collected biological specimens, surveyed constitutions, and collaborated on systematic inquiries across every field. Knowledge was organized, cumulative, and cooperative rather than individual and oracular." },
  ];

  const echoExamples = [
    { title: "The Lyceum as Proto-University", body: "Aristotle's Lyceum pioneered the idea of organized, collaborative inquiry. Students collected data across disciplines — biology, politics, rhetoric, logic — building a shared body of knowledge. This model of a research community dedicated to systematic inquiry prefigures the modern university and research institute." },
    { title: "Dolphins as Non-Fish", body: "Aristotle's careful observations led him to correctly classify dolphins and whales as viviparous, air-breathing animals fundamentally different from fish. This identification was ignored or forgotten for nearly two millennia, only being confirmed by modern zoology. It stands as a striking vindication of his observational method against pure categorization by appearance." },
    { title: "158 Constitutions Surveyed", body: "Before theorizing about the ideal state in the Politics, Aristotle and his students collected and analyzed 158 actual Greek constitutions. This empirical political science — grounding normative theory in comparative institutional data — is the direct ancestor of modern political science and comparative government studies." },
    { title: "Nancy Cartwright's Aristotelian Physics", body: "Contemporary philosopher Nancy Cartwright argues that modern physics is deeply Aristotelian in spirit: it concerns the causal capacities of specific kinds of things in specific contexts, not universal laws that hold absolutely everywhere. Her 'dappled world' view echoes Aristotle's insistence that nature is varied and context-dependent, not reducible to a single abstract formalism." },
  ];

  const selectedConceptAnalysis = placedConcept && activeSide;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 20%, #0a2a33 0%, #080c10 70%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d4cfc8",
      padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 2 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            The Empirical Revolution
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle rebuilt philosophy from the ground up by insisting that theory must begin with and be tested against observable reality.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8c0b8", lineHeight: 1.8, margin: 0 }}>
            Plato's philosophy demanded turning away from the changing physical world toward eternal abstract Forms, making theory completely disconnected from actual tables, actual human beings, and actual moral struggles. Philosophy had become an escape from reality rather than an explanation of it.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid " + ACCENT + "44",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Interactive — Two Worlds of Knowledge
          </div>

          {/* Concept chooser */}
          <div style={{ marginBottom: 18, textAlign: "center" }}>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0" }}>
              Choose a concept, then drop it into Plato's or Aristotle's world to see how each analyzes it:
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {concepts.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setDraggedConcept(c.id); setPlacedConcept(null); setActiveSide(null); }}
                  style={{
                    background: draggedConcept === c.id ? ACCENT : "rgba(14,116,144,0.15)",
                    border: "1px solid " + ACCENT,
                    borderRadius: 20,
                    padding: "6px 18px",
                    color: draggedConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    transition: "all 0.2s",
                  }}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
            {draggedConcept && (
              <p style={{ fontSize: 12, color: ACCENT_LIGHT, marginTop: 8, fontStyle: "italic" }}>
                Now click a side below to place "{concepts.find(c => c.id === draggedConcept)?.label}"
              </p>
            )}
          </div>

          {/* Split screen */}
          <div style={{ display: "flex", gap: 10, alignItems: "stretch", flexWrap: "wrap" }}>
            {/* Plato's side */}
            <div
              onClick={() => { if (draggedConcept) { setPlacedConcept(draggedConcept); setActiveSide("plato"); } }}
              style={{
                flex: "1 1 200px",
                background: activeSide === "plato" ? "rgba(14,116,144,0.12)" : "rgba(20,10,40,0.5)",
                border: activeSide === "plato" ? "2px solid " + ACCENT : "1px solid #3a2a5a",
                borderRadius: 8,
                padding: "clamp(12px, 2vw, 20px)",
                cursor: draggedConcept ? "pointer" : "default",
                transition: "all 0.3s",
                minWidth: 0,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: "#a080d0", marginBottom: 4 }}>
                  Plato's World
                </div>
                <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#8070a0", fontStyle: "italic" }}>
                  Eternal Forms & Pure Reason
                </div>
              </div>

              {/* SVG ethereal realm */}
              <svg viewBox="0 0 220 160" width="100%" style={{ display: "block", maxWidth: 280, margin: "0 auto" }}>
                {/* Stars/ether */}
                {[[20,15],[200,25],[110,10],[50,140],[180,130],[30,90],[200,100]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r={1.2} fill="#c0a0ff" opacity={0.5} />
                ))}
                {/* Glowing perfect shapes (Forms) */}
                <circle cx={110} cy={45} r={28} fill="none" stroke="#b090ff" strokeWidth={1.5} opacity={0.7} />
                <circle cx={110} cy={45} r={20} fill="none" stroke="#c8a8ff" strokeWidth={0.8} opacity={0.5} />
                <text x={110} y={49} textAnchor="middle" fill="#e0d0ff" fontSize={10} fontFamily="Georgia, serif">FORM</text>
                <polygon points="55,95 85,55 115,95" fill="none" stroke="#b090ff" strokeWidth={1.5} opacity={0.6} />
                <polygon points="155,95 175,60 195,95" fill="none" stroke="#c0a0e8" strokeWidth={1.2} opacity={0.5} />
                {/* Shadowy copies below */}
                <line x1={40} y1={108} x2={220} y2={108} stroke="#4a3a6a" strokeWidth={0.8} strokeDasharray="4,3" />
                <rect x={45} y={113} width={30} height={18} rx={2} fill="#2a1a3a" stroke="#4a3a6a" strokeWidth={1} opacity={0.7} />
                <text x={60} y={126} textAnchor="middle" fill="#6a5a8a" fontSize={8} fontFamily="Georgia, serif">shadow</text>
                <rect x={90} y={116} width={24} height={14} rx={2} fill="#2a1a3a" stroke="#3a2a5a" strokeWidth={1} opacity={0.6} />
                <text x={102} y={127} textAnchor="middle" fill="#5a4a7a" fontSize={7} fontFamily="Georgia, serif">copy</text>
                <rect x={140} y={114} width={28} height={16} rx={2} fill="#1a0a2a" stroke="#3a2a5a" strokeWidth={1} opacity={0.5} />
                <text x={154} y={126} textAnchor="middle" fill="#4a3a6a" fontSize={7} fontFamily="Georgia, serif">illusion</text>
                {/* Arrow down */}
                <text x={110} y={105} textAnchor="middle" fill="#7060a0" fontSize={9} fontFamily="Georgia, serif">↓ pale imitations</text>
              </svg>

              {placedConcept && activeSide === "plato" && platoAnalysis[placedConcept] && (
                <div style={{ marginTop: 12, background: "rgba(80,40,120,0.18)", borderRadius: 6, padding: "10px 12px", borderLeft: "3px solid #b090ff" }}>
                  <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#c8a8ff", marginBottom: 6 }}>
                    {platoAnalysis[placedConcept].title}
                  </div>
                  <p style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "#a090c0", lineHeight: 1.7, margin: 0 }}>
                    {platoAnalysis[placedConcept].body}
                  </p>
                </div>
              )}
            </div>

            {/* Aristotle's side */}
            <div
              onClick={() => { if (draggedConcept) { setPlacedConcept(draggedConcept); setActiveSide("aristotle"); } }}
              style={{
                flex: "1 1 200px",
                background: activeSide === "aristotle" ? "rgba(14,116,144,0.12)" : "rgba(5,20,15,0.5)",
                border: activeSide === "aristotle" ? "2px solid " + ACCENT : "1px solid #1a3a2a",
                borderRadius: 8,
                padding: "clamp(12px, 2vw, 20px)",
                cursor: draggedConcept ? "pointer" : "default",
                transition: "all 0.3s",
                minWidth: 0,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>
                  Aristotle's World
                </div>
                <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#508090", fontStyle: "italic" }}>
                  Observation & Naturalist's Notebook
                </div>
              </div>

              {/* SVG naturalist notebook */}
              <svg viewBox="0 0 220 160" width="100%" style={{ display: "block", maxWidth: 280, margin: "0 auto" }}>
                {/* Notebook page */}
                <rect x={20} y={8} width={180} height={144} rx={4} fill="#f5efd8" opacity={0.08} stroke="#0E7490" strokeWidth={0.8} />
                {/* Ruled lines */}
                {[30,42,54,66,78,90,102,114,126,138].map((y,i) => (
                  <line key={i} x1={30} y1={y} x2={190} y2={y} stroke="#0E7490" strokeWidth={0.3} opacity={0.3} />
                ))}
                {/* Sketched dolphin */}
                <ellipse cx={75} cy={48} rx={28} ry={10} fill="none" stroke="#0E7490" strokeWidth={1.2} opacity={0.8} />
                <path d="M103,44 Q115,48 108,55" fill="none" stroke="#0E7490" strokeWidth={1.2} opacity={0.8} />
                <path d="M47,46 Q40,38 44,42" fill="none" stroke="#0E7490" strokeWidth={1} opacity={0.7} />
                <ellipse cx={79} cy={44} rx={2.5} ry={2.5} fill="#0E7490" opacity={0.6} />
                {/* Label */}
                <text x={30} y={75} fill="#0E7490" fontSize={7.5} fontFamily="Georgia, serif" fontStyle="italic" opacity={0.9}>Delphinus — breathes air,</text>
                <text x={30} y={85} fill="#0E7490" fontSize={7.5} fontFamily="Georgia, serif" fontStyle="italic" opacity={0.9}>warm-blooded. Not a fish.</text>
                {/* Comparative table sketch */}
                <line x1={30} y1={100} x2={190} y2={100} stroke="#0E7490" strokeWidth={0.6} opacity={0.5} />
                <line x1={90} y1={100} x2={90} y2={150} stroke="#0E7490" strokeWidth={0.5} opacity={0.4} />
                <line x1={140} y1={100} x2={140} y2={150} stroke="#0E7490" strokeWidth={0.5} opacity={0.4} />
                <text x={35} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Feature</text>
                <text x={95} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Fish</text>
                <text x={145} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Dolphin</text>
                <line x1={30} y1={115} x2={190} y2={115} stroke="#0E7490" strokeWidth={0.4} opacity={0.35} />
                <text x={35} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>Breathes</text>
                <text x={95} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>gills</text>
                <text x={145} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>lungs</text>
                <text x={35} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>Birth</text>
                <text x={95} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>eggs</text>
                <text x={145} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>live young</text>
              </svg>

              {placedConcept && activeSide === "aristotle" && aristotleAnalysis[placedConcept] && (
                <div style={{ marginTop: 12, background: "rgba(14,116,144,0.12)", borderRadius: 6, padding: "10px 12px", borderLeft: "3px solid " + ACCENT }}>
                  <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {aristotleAnalysis[placedConcept].title}
                  </div>
                  <p style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "#90b8c0", lineHeight: 1.7, margin: 0 }}>
                    {aristotleAnalysis[placedConcept].body}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Aristotle's Method Cycle */}
          <div style={{ marginTop: 24, borderTop: "1px solid " + ACCENT + "33", paddingTop: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                Aristotle's Method
              </div>
              <button
                onClick={runMethod}
                disabled={methodRunning}
                style={{
                  background: methodRunning ? "rgba(14,116,144,0.2)" : ACCENT,
                  border: "none",
                  borderRadius: 20,
                  padding: "7px 22px",
                  color: methodRunning ? ACCENT_LIGHT : "#f0ead8",
                  cursor: methodRunning ? "default" : "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  letterSpacing: 1,
                  transition: "all 0.2s",
                }}
              >
                {methodRunning ? "Running..." : "Animate the Cycle"}
              </button>
            </div>

            {/* Method steps visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
              {methodSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    background: methodStep >= i ? ACCENT : "rgba(14,116,144,0.1)",
                    border: "1px solid " + (methodStep >= i ? ACCENT : ACCENT + "44"),
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: "clamp(11px, 1.4vw, 13px)",
                    color: methodStep >= i ? "#f0ead8" : SUBTITLE_COLOR,
                    transition: "all 0.4s",
                    textAlign: "center",
                    minWidth: 60,
                  }}>
                    {step.label}
                  </div>
                  {i < methodSteps.length - 1 && (
                    <div style={{ color: methodStep > i ? ACCENT : ACCENT + "44", fontSize: 14, transition: "color 0.4s" }}>→</div>
                  )}
                  {i === methodSteps.length - 1 && methodStep === methodSteps.length - 1 && (
                    <div style={{ color: ACCENT, fontSize: 12 }}>↺</div>
                  )}
                </div>
              ))}
            </div>

            {methodStep >= 0 && methodStep < methodSteps.length && (
              <div style={{
                marginTop: 14,
                background: "rgba(14,116,144,0.1)",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 6,
                padding: "10px 16px",
                textAlign: "center",
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#b0d0d8",
                lineHeight: 1.6,
                transition: "opacity 0.3s",
              }}>
                <span style={{ color: ACCENT_LIGHT, fontWeight: "bold" }}>{methodSteps[methodStep].label}: </span>
                {methodSteps[methodStep].desc}
              </div>
            )}
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: "1px solid " + ACCENT + (hoveredConcept === kc.id ? "ff" : "88"),
                  borderRadius: 16,
                  padding: "5px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(14,116,144,0.1)",
              border: "1px solid " + ACCENT + "55",
              borderRadius: 6,
              padding: "12px 16px",
            }}>
              <div style={{ fontSize: "clamp(12px, 1.6vw, 13px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#a8c8d0", lineHeight: 1.75, margin: 0 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8c0b8", lineHeight: 1.8, margin: "0 0 10px 0" }}>
            Aristotle's empiricism relied on careful but unaided observation, which can be deeply misleading. His physics failed because everyday observations about motion and falling objects do not reveal the true underlying laws without controlled experiments and mathematical rigor. A stone dropped from a height does not obviously confirm Newtonian mechanics.
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: ACCENT_LIGHT, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the question of what kind of reasoning and method can correct for the limits of raw observation...
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              width: "100%",
              background: hoverBtn ? "rgba(14,116,144,0.08)" : "transparent",
              border: "none",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 3vw, 24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            <span style={{ color: ACCENT }}>
              {echoesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {echoExamples.map((ex, i) => (
                <div key={i} style={{
                  borderLeft: "3px solid " + ACCENT,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {ex.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {ex.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 2 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 3: Logic and the Architecture of Thought ───
function LogicArchitectureOfThought() {
  const ACCENT = "#7C3AED";
  const ACCENT_LIGHT = "#a78bfa";
  const ACCENT_DIM = "#2d1a5e";
  const ACCENT_DARK = "#1a0a3a";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [selectedForm, setSelectedForm] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("builder");
  const [hoveredPill, setHoveredPill] = useState(null);

  // Syllogism builder state
  const [majorTerm, setMajorTerm] = useState("All humans");
  const [majorPred, setMajorPred] = useState("are mortal");
  const [minorTerm, setMinorTerm] = useState("All Greeks");
  const [minorPred, setMinorPred] = useState("are human");
  const [validated, setValidated] = useState(null);
  const [matchedForm, setMatchedForm] = useState(null);
  const [animating, setAnimating] = useState(false);

  const syllogisticForms = [
    {
      id: "barbara",
      name: "Barbara",
      mood: "AAA-1",
      schema: ["All M are P", "All S are M", "All S are P"],
      example: ["All humans are mortal", "All Greeks are human", "All Greeks are mortal"],
      description: "The most celebrated form. Universal affirmatives chained to yield a universal affirmative conclusion.",
    },
    {
      id: "celarent",
      name: "Celarent",
      mood: "EAE-1",
      schema: ["No M are P", "All S are M", "No S are P"],
      example: ["No reptiles are warm-blooded", "All snakes are reptiles", "No snakes are warm-blooded"],
      description: "Universal negative major with universal affirmative minor yields universal negative conclusion.",
    },
    {
      id: "darii",
      name: "Darii",
      mood: "AII-1",
      schema: ["All M are P", "Some S are M", "Some S are P"],
      example: ["All mammals nurse their young", "Some creatures are mammals", "Some creatures nurse their young"],
      description: "Universal affirmative major with particular affirmative minor yields particular affirmative conclusion.",
    },
    {
      id: "ferio",
      name: "Ferio",
      mood: "EIO-1",
      schema: ["No M are P", "Some S are M", "Some S are P"],
      example: ["No fish are warm-blooded", "Some animals are fish", "Some animals are not warm-blooded"],
      description: "Universal negative major with particular affirmative minor yields particular negative conclusion.",
    },
  ];

  function parseQuantifier(phrase) {
    const p = phrase.trim().toLowerCase();
    if (p.startsWith("all ")) return { q: "A", term: p.slice(4).trim() };
    if (p.startsWith("no ")) return { q: "E", term: p.slice(3).trim() };
    if (p.startsWith("some ") && !p.includes(" not ")) return { q: "I", term: p.slice(5).trim() };
    if (p.startsWith("some ") && p.includes(" not ")) return { q: "O", term: p.slice(5).replace(" not", "").trim() };
    return null;
  }

  function parsePredicate(phrase) {
    const p = phrase.trim().toLowerCase();
    if (p.startsWith("are not ")) return { neg: true, term: p.slice(8).trim() };
    if (p.startsWith("are ")) return { neg: false, term: p.slice(4).trim() };
    return null;
  }

  function validateSyllogism() {
    setAnimating(true);
    setTimeout(() => {
      const maj = parseQuantifier(majorTerm);
      const majP = parsePredicate(majorPred);
      const min = parseQuantifier(minorTerm);
      const minP = parsePredicate(minorPred);

      if (!maj || !majP || !min || !minP) {
        setValidated("invalid");
        setMatchedForm(null);
        setAnimating(false);
        return;
      }

      const middleTerm = majP.term;
      const minSubject = min.term;
      const minPredTerm = minP.term;
      const majorSubject = maj.term;

      // Check if minor predicate matches major subject (middle term connection)
      if (minPredTerm !== middleTerm && minPredTerm !== majorSubject) {
        setValidated("invalid");
        setMatchedForm(null);
        setAnimating(false);
        return;
      }

      // Check for Barbara: All M are P, All S are M → All S are P
      if (maj.q === "A" && !majP.neg && min.q === "A" && !minP.neg) {
        const form = syllogisticForms.find(f => f.id === "barbara");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "E" && min.q === "A") {
        const form = syllogisticForms.find(f => f.id === "celarent");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "A" && min.q === "I") {
        const form = syllogisticForms.find(f => f.id === "darii");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "E" && min.q === "I") {
        const form = syllogisticForms.find(f => f.id === "ferio");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      setValidated("invalid");
      setMatchedForm(null);
      setAnimating(false);
    }, 400);
  }

  const keyConcepts = [
    {
      id: "syllogism",
      label: "Syllogism",
      desc: "A syllogism is a deductive argument in which a conclusion follows necessarily from two premises sharing a middle term. Aristotle identified 256 possible syllogistic forms and proved which 19 are genuinely valid. The key insight is that validity is purely structural — it depends on the form of the premises, never their content.",
    },
    {
      id: "formal-validity",
      label: "Formal Validity",
      desc: "An argument is formally valid if the conclusion cannot be false when the premises are true, regardless of what the premises are about. This separates validity (structural correctness) from soundness (true premises). Aristotle was the first to make this distinction explicit, enabling logic to function as a content-independent discipline.",
    },
    {
      id: "non-contradiction",
      label: "Non-Contradiction",
      desc: "The principle that no proposition can be both true and false at the same time and in the same respect. Aristotle recognized this as the most certain of all principles — one that cannot be proven from more basic premises but that underlies all rational thought. Without it, no argument could distinguish a valid conclusion from its denial.",
    },
    {
      id: "demonstrative",
      label: "Demonstrative vs. Dialectical",
      desc: "Demonstrative reasoning starts from certain first principles and generates necessary conclusions (as in mathematics). Dialectical reasoning starts from commonly accepted opinions and tests them through dialogue. Aristotle insisted these require different standards: demanding certainty from dialectical argument is a category error, just as accepting mere opinion in mathematics.",
    },
    {
      id: "categorical",
      label: "Categorical Statements",
      desc: "Every syllogism is built from four types of categorical statement: All S are P (universal affirmative, A), No S are P (universal negative, E), Some S are P (particular affirmative, I), Some S are not P (particular negative, O). These four forms — represented by medieval logicians using vowels from 'affirmo' and 'nego' — exhaust the space of simple subject-predicate claims.",
    },
    {
      id: "description-of-thought",
      label: "Logic as Description",
      desc: "For Aristotle, logic was not merely a calculus or formal game but a systematic description of how rational minds actually operate. The Organon (meaning 'instrument') was positioned as a preparatory discipline: before doing philosophy, science, or rhetoric, one must understand the structure of valid thought itself. This gave logic a peculiar double status — both normative and descriptive.",
    },
  ];

  const inputStyle = {
    background: "rgba(124,58,237,0.12)",
    border: `1px solid ${ACCENT}55`,
    borderRadius: 6,
    padding: "8px 12px",
    color: TITLE_COLOR,
    fontFamily: "Georgia, serif",
    fontSize: "clamp(11px,1.6vw,13px)",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  const validColor = validated === "valid" ? "#22c55e" : validated === "invalid" ? "#ef4444" : ACCENT;

  return (
    <div style={{
      background: `radial-gradient(ellipse at 30% 20%, ${ACCENT_DARK} 0%, #0a0a0f 70%)`,
      minHeight: "100vh",
      padding: "clamp(20px,4vw,48px) clamp(12px,3vw,24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
            Part 3 of 15 — Aristotle: Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Logic and the Architecture of Thought
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle invented formal logic as a discipline, creating the first systematic map of valid reasoning that dominated for over two thousand years.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${ACCENT}44`,
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>
            Even Aristotle's empirical method required reasoning from observations to theories, but there were no systematic rules for distinguishing valid inferences from fallacious ones — anyone could argue anything without a formal check.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { id: "builder", label: "Syllogism Builder" },
              { id: "forms", label: "The 4 Classic Forms" },
              { id: "limits", label: "Aristotle's Limit" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? ACCENT : "rgba(124,58,237,0.15)",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  color: activeTab === tab.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* BUILDER TAB */}
          {activeTab === "builder" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 20, lineHeight: 1.7 }}>
                Construct a syllogism. Begin premises with <em>All</em>, <em>No</em>, or <em>Some</em>. Predicates should start with <em>are</em> or <em>are not</em>. The system checks whether a valid First-Figure Aristotelian form results.
              </p>

              <div style={{ display: "grid", gap: 16, marginBottom: 20 }}>
                {/* Major Premise */}
                <div style={{
                  background: "rgba(124,58,237,0.08)",
                  border: `1px solid ${ACCENT}33`,
                  borderRadius: 8,
                  padding: "16px",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
                    Major Premise
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>SUBJECT</div>
                      <input
                        value={majorTerm}
                        onChange={e => { setMajorTerm(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. All humans"
                      />
                    </div>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>PREDICATE</div>
                      <input
                        value={majorPred}
                        onChange={e => { setMajorPred(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. are mortal"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                    "{majorTerm} {majorPred}"
                  </div>
                </div>

                {/* Minor Premise */}
                <div style={{
                  background: "rgba(124,58,237,0.08)",
                  border: `1px solid ${ACCENT}33`,
                  borderRadius: 8,
                  padding: "16px",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
                    Minor Premise
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>SUBJECT</div>
                      <input
                        value={minorTerm}
                        onChange={e => { setMinorTerm(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. All Greeks"
                      />
                    </div>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>PREDICATE</div>
                      <input
                        value={minorPred}
                        onChange={e => { setMinorPred(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. are human"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                    "{minorTerm} {minorPred}"
                  </div>
                </div>
              </div>

              <button
                onClick={validateSyllogism}
                disabled={animating}
                style={{
                  background: ACCENT,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 28px",
                  color: "#f0ead8",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px,1.7vw,14px)",
                  cursor: animating ? "wait" : "pointer",
                  marginBottom: 20,
                  opacity: animating ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {animating ? "Checking..." : "Check Validity"}
              </button>

              {validated && (
                <div style={{
                  background: validated === "valid" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${validColor}55`,
                  borderLeft: `4px solid ${validColor}`,
                  borderRadius: 8,
                  padding: "16px 20px",
                  transition: "all 0.3s",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: validColor, marginBottom: 8 }}>
                    {validated === "valid" ? "Valid Syllogism" : "Invalid Form"}
                  </div>

                  {validated === "valid" && matchedForm ? (
                    <div>
                      <div style={{ fontSize: "clamp(14px,2vw,17px)", color: TITLE_COLOR, marginBottom: 8 }}>
                        Form: <strong style={{ color: ACCENT_LIGHT }}>{matchedForm.name}</strong> ({matchedForm.mood})
                      </div>
                      <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0", lineHeight: 1.7 }}>
                        {matchedForm.description}
                      </p>
                      <div style={{
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: 6,
                        padding: "12px 16px",
                      }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>SCHEMA</div>
                        {matchedForm.schema.map((s, i) => (
                          <div key={i} style={{
                            fontSize: "clamp(12px,1.6vw,14px)",
                            color: i === 2 ? ACCENT_LIGHT : "#d0c8c0",
                            borderTop: i === 2 ? `1px solid ${ACCENT}44` : "none",
                            paddingTop: i === 2 ? 8 : 0,
                            marginTop: i === 2 ? 4 : 0,
                            fontStyle: "italic",
                          }}>
                            {i === 2 ? "∴ " : ""}{s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
                        The premises do not connect through a shared middle term in any valid First-Figure form. Try ensuring the predicate of the major premise matches the predicate of the minor premise (the middle term that links them).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* FORMS TAB */}
          {activeTab === "forms" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 20, lineHeight: 1.7 }}>
                Aristotle identified 256 possible combinations of premise types and proved exactly which are valid. Here are the four canonical First-Figure forms — the clearest and most powerful. Medieval logicians gave them memorable names encoding their structure.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {syllogisticForms.map(form => (
                  <div
                    key={form.id}
                    onClick={() => setSelectedForm(selectedForm === form.id ? null : form.id)}
                    style={{
                      background: selectedForm === form.id ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.07)",
                      border: `1px solid ${selectedForm === form.id ? ACCENT : ACCENT + "33"}`,
                      borderRadius: 8,
                      padding: "14px 18px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: "clamp(14px,2vw,17px)", color: ACCENT_LIGHT, fontWeight: "bold" }}>{form.name}</span>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#6b7280", marginLeft: 10 }}>{form.mood}</span>
                      </div>
                      <div style={{ fontSize: 11, color: ACCENT_LIGHT }}>
                        {selectedForm === form.id ? "▲ collapse" : "▼ expand"}
                      </div>
                    </div>

                    {selectedForm === form.id && (
                      <div style={{ marginTop: 14 }}>
                        <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.7 }}>
                          {form.description}
                        </p>
                        <div style={{ display: "grid", gap: 12 }}>
                          {/* Schema */}
                          <div style={{
                            background: "rgba(0,0,0,0.3)",
                            borderRadius: 6,
                            padding: "12px 16px",
                          }}>
                            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>ABSTRACT SCHEMA</div>
                            {form.schema.map((s, i) => (
                              <div key={i} style={{
                                fontSize: "clamp(12px,1.6vw,14px)",
                                color: i === 2 ? ACCENT_LIGHT : "#d0c8c0",
                                borderTop: i === 2 ? `1px solid ${ACCENT}44` : "none",
                                paddingTop: i === 2 ? 8 : 0,
                                marginTop: i === 2 ? 4 : 0,
                                fontStyle: "italic",
                              }}>
                                {i === 2 ? "∴ " : ""}{s}
                              </div>
                            ))}
                          </div>
                          {/* Example */}
                          <div style={{
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: 6,
                            padding: "12px 16px",
                          }}>
                            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>CONCRETE EXAMPLE</div>
                            {form.example.map((s, i) => (
                              <div key={i} style={{
                                fontSize: "clamp(12px,1.6vw,14px)",
                                color: i === 2 ? "#a78bfa" : "#b8b0a8",
                                borderTop: i === 2 ? `1px solid ${ACCENT}33` : "none",
                                paddingTop: i === 2 ? 8 : 0,
                                marginTop: i === 2 ? 4 : 0,
                              }}>
                                {i === 2 ? "∴ " : ""}{s}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIMITS TAB */}
          {activeTab === "limits" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 24, lineHeight: 1.7 }}>
                Aristotle's logic triumphed for two millennia — yet a simple argument about height exposes its fundamental boundary.
              </p>

              {/* The Failing Argument */}
              <div style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderLeft: "4px solid #ef4444",
                borderRadius: 8,
                padding: "18px 20px",
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#f87171", marginBottom: 12 }}>
                  The Argument That Breaks the Mold
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#fca5a5", marginBottom: 4 }}>
                  John is taller than Mary.
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#fca5a5", marginBottom: 12 }}>
                  Mary is taller than Susan.
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#ef4444", borderTop: "1px solid rgba(239,68,68,0.3)", paddingTop: 10 }}>
                  ∴ John is taller than Susan.
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "14px 0 0 0", lineHeight: 1.7 }}>
                  This conclusion is obviously correct — yet no Aristotelian syllogism can validate it. The argument uses a <em>relation</em> ("taller than") that spans two individuals. Aristotelian logic only handles properties belonging to categories. There is no middle term here in the syllogistic sense — only a transitive relation connecting three named individuals.
                </p>
              </div>

              {/* Why It Fails - SVG Diagram */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 12 }}>
                  Why Syllogistic Structure Fails
                </div>
                <svg viewBox="0 0 700 220" width="100%" style={{ maxWidth: 700 }}>
                  <defs>
                    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L8,3 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L8,3 z" fill={ACCENT} />
                    </marker>
                  </defs>

                  {/* Aristotelian side - FAILING */}
                  <text x="170" y="22" textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="Georgia,serif" letterSpacing="2">ARISTOTELIAN (fails)</text>

                  <rect x="110" y="38" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="54" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Subject</text>
                  <text x="170" y="70" textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="Georgia,serif" fontStyle="italic">John</text>

                  <rect x="110" y="100" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="116" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Middle Term?</text>
                  <text x="170" y="132" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">taller than Mary</text>

                  <rect x="110" y="160" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="178" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Predicate</text>
                  <text x="170" y="194" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">taller than Susan</text>

                  <line x1="170" y1="78" x2="170" y2="98" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowRed)" />
                  <line x1="170" y1="140" x2="170" y2="158" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowRed)" />

                  <text x="295" y="115" textAnchor="middle" fill="#6b7280" fontSize="20" fontFamily="Georgia,serif">✕</text>
                  <text x="295" y="135" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia,serif">no shared</text>
                  <text x="295" y="148" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia,serif">category</text>

                  {/* Modern side - SUCCEEDING */}
                  <text x="530" y="22" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="12" fontFamily="Georgia,serif" letterSpacing="2">PREDICATE LOGIC (works)</text>

                  <rect x="430" y="38" width="200" height="42" rx="6" fill="rgba(124,58,237,0.15)" stroke={ACCENT} strokeWidth="1" />
                  <text x="530" y="56" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">∀x∀y∀z [ Taller(x,y) ∧</text>
                  <text x="530" y="72" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">Taller(y,z) → Taller(x,z) ]</text>

                  <line x1="530" y1="82" x2="530" y2="108" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

                  <rect x="430" y="110" width="200" height="42" rx="6" fill="rgba(124,58,237,0.1)" stroke={ACCENT} strokeWidth="1" />
                  <text x="530" y="128" textAnchor="middle" fill="#d0c8c0" fontSize="11" fontFamily="Georgia,serif">Taller(John,Mary)</text>
                  <text x="530" y="144" textAnchor="middle" fill="#d0c8c0" fontSize="11" fontFamily="Georgia,serif">Taller(Mary,Susan)</text>

                  <line x1="530" y1="154" x2="530" y2="166" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

                  <rect x="430" y="168" width="200" height="36" rx="6" fill="rgba(124,58,237,0.2)" stroke={ACCENT} strokeWidth="1.5" />
                  <text x="530" y="184" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">∴ Taller(John,Susan) ✓</text>
                  <text x="530" y="198" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="Georgia,serif">by transitivity rule</text>
                </svg>
              </div>

              <div style={{
                background: "rgba(124,58,237,0.1)",
                border: `1px solid ${ACCENT}33`,
                borderRadius: 8,
                padding: "14px 18px",
              }}>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>
                  Modern predicate logic — developed by Frege in 1879 and refined by Russell — introduces <strong style={{ color: ACCENT_LIGHT }}>variables</strong> ranging over individuals, <strong style={{ color: ACCENT_LIGHT }}>quantifiers</strong> (∀ and ∃), and <strong style={{ color: ACCENT_LIGHT }}>relation symbols</strong>. This allows the transitivity of "taller than" to be stated as a general axiom and applied mechanically. What Aristotle captured about class-inclusion logic was correct and deep — it simply could not reach the relational structure that mathematics requires.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${ACCENT}88`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(c => c.id === hoveredConcept);
            return kc ? (
              <div style={{
                background: "rgba(0,0,0,0.3)",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 18px",
                marginTop: 4,
              }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>{kc.label}</div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>{kc.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${ACCENT}44`,
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0", lineHeight: 1.75 }}>
            Aristotelian logic handles categorical statements elegantly but cannot process relational arguments ("John is taller than Mary") or the quantifiers essential to mathematics, leaving vast territories of rational thought — including all of modern mathematical logic — beyond its reach.
          </p>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#6b7280", margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: How does Aristotle extend his framework beyond bare logic to explain how humans actually acquire knowledge of the world?
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT_LIGHT,
              fontFamily: "Georgia, serif",
            }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT_LIGHT} />
              : <ChevronDown size={16} color={ACCENT_LIGHT} />
            }
          </button>

          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Legal Argument and Fallacy Detection</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Every common law jurisdiction implicitly relies on Aristotelian logic when courts identify fallacious reasoning. The formal distinction between a valid argument and a persuasive-but-invalid one — the difference between sound precedent and rhetorical sleight of hand — traces directly to Aristotle's enumeration of fallacies in the Sophistical Refutations. Trial advocacy textbooks still teach the same categorical errors Aristotle named.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Medical Diagnosis as Practical Syllogism</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Physicians routinely practice a form of Barbara: all cases presenting symptom-cluster X indicate disease D; this patient presents symptom-cluster X; therefore this patient likely has disease D. Aristotle himself recognized medicine as the paradigm case of practical syllogistic reasoning, where universal medical knowledge is applied to a particular patient. Modern clinical decision support algorithms formalize exactly this inferential structure.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Computer Science and the Frege-Russell Revolution</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Frege's Begriffsschrift (1879) and Russell and Whitehead's Principia Mathematica (1910) extended Aristotelian logic precisely where it failed — adding quantifiers and relations. This predicate logic became the foundation of computer science: every database query language (SQL uses universal and existential quantifiers), every type system, and every formal verification tool descends from this revolution that Aristotle's limits made necessary.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Fred Sommers and the Neo-Aristotelian Revival</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  In the 1960s–80s, philosopher Fred Sommers developed a "traditional formal logic" showing that Aristotelian term logic, properly extended, could handle many relational inferences that supposedly required Fregean predicate logic. His work demonstrated that Aristotle's framework was less limited than the standard narrative suggests — and sparked an active research program in neo-Aristotelian logic that continues in philosophical logic journals today.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 3 of 15 — Aristotle: Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 4: Metaphysics: Substance, Essence, and What Really Exists ───
function MetaphysicsSubstanceEssence() {
  const ACCENT = "#B45309";
  const ACCENT_LIGHT = "#D97706";
  const ACCENT_DIM = "#3a1a02";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeView, setActiveView] = useState("aristotle");
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState(null);
  const [draggedProp, setDraggedProp] = useState(null);
  const [hoveredProp, setHoveredProp] = useState(null);
  const [propRings, setPropRings] = useState({
    "animate": "essential",
    "mammal": "essential",
    "four-legged": "essential",
    "breathes": "essential",
    "brown": "accidental",
    "fast": "accidental",
    "scar on flank": "accidental",
    "tall": "accidental",
  });
  const [feedback, setFeedback] = useState(null);

  const essentialDefs = {
    "animate": "Being alive is core to what a horse is.",
    "mammal": "Belonging to mammals defines horse's biological kind.",
    "four-legged": "Quadrupedal structure is part of horse's essential form.",
    "breathes": "Respiration is a mark of animal life — essential.",
    "brown": "Color varies among horses — purely accidental.",
    "fast": "Speed varies by individual — accidental feature.",
    "scar on flank": "A wound's trace — wholly contingent, accidental.",
    "tall": "Height varies; no essential height for horseness.",
  };

  const aristotleEssential = new Set(["animate", "mammal", "four-legged", "breathes"]);

  const keyConcepts = [
    { id: "substance", label: "Substance (ousia)", desc: "For Aristotle, substances are the bedrock of reality — individual things like this horse, this oak tree, this person. Everything else (qualities, relations, quantities) exists only insofar as some substance bears it. Remove the substance and its properties dissolve with it." },
    { id: "essence", label: "Essence vs. Accident", desc: "The essence of a thing is what it must be to be the kind of thing it is — remove an essential property and the thing ceases to exist as that kind. An accident is merely what a thing happens to be — brown, fast, scarred — contingent features that could change without altering the thing's fundamental identity." },
    { id: "primary", label: "Primary vs. Secondary Substance", desc: "Primary substances are individual concrete things (this particular horse). Secondary substances are species and genera (horse, animal). Primary substances are ontologically prior — species exist because individuals exist, not the reverse. Yet both are called 'substance,' creating an enduring tension." },
    { id: "essentialism", label: "Essentialism", desc: "Aristotle's essentialism holds that natural kinds have real essences discoverable by investigation. Science aims at essences, not mere regularities. Ethical norms are grounded in human essence (rational animal). This makes both science and ethics objective rather than conventional." },
    { id: "universals", label: "Problem of Universals", desc: "Are species and genera — secondary substances — truly real, or just names we apply to collections of individuals? Aristotle tried to say universals are real but only in individuals, not apart from them. This middle path satisfied few, launching the medieval realist vs. nominalist controversy." },
    { id: "priority", label: "Ontological Priority", desc: "To say X is ontologically prior to Y means Y depends on X for its existence, not vice versa. Aristotle argues substances are prior to their properties: the color brown depends on the horse to exist, but not the reverse. This asymmetry structures his entire metaphysics." },
  ];

  const realWorldEchoes = [
    { title: "Aquinas vs. Ockham: Realism vs. Nominalism", body: "Medieval philosophy split over whether secondary substances (species, genera) are real. Aquinas followed Aristotle in affirming that universals have a genuine footing in things. William of Ockham famously denied this — only individuals exist; universals are mere names (nomina). This debate shaped logic, theology, and politics for centuries." },
    { title: "Hume's Bundle Theory", body: "David Hume challenged the very concept of substance as a substratum bearing properties. When you examine experience, he argued, you find only bundles of perceptions — no persistent 'thing' underlying them. This struck at Aristotle's primary substances and forced subsequent philosophy to reconstruct personal identity, causation, and objecthood without a substance core." },
    { title: "Quantum Mechanics and Individual Identity", body: "Identical quantum particles (electrons, photons) lack the individual identity Aristotle's primary substances require. Two electrons of the same type are not merely similar — they are numerically indistinguishable in ways classical objects are not. This challenges whether the category of 'individual substance' applies at the fundamental level of nature." },
    { title: "E.J. Lowe and Contemporary Substance Metaphysics", body: "Philosopher E.J. Lowe argued in the late 20th century that a four-category ontology — individual substances, kinds, attributes, and modes — was both necessary and coherent. Against modern eliminativism, Lowe held that substances and natural kinds are irreducible to physics, reviving Aristotelian metaphysics in sophisticated analytic form." },
  ];

  function handlePropClick(prop) {
    if (selectedProp === prop) {
      setSelectedProp(null);
      setFeedback(null);
      return;
    }
    setSelectedProp(prop);
    setFeedback(null);
  }

  function moveProp(prop, targetRing) {
    const current = propRings[prop];
    if (current === targetRing) return;
    const isAristotelianEssential = aristotleEssential.has(prop);
    let msg = "";
    if (targetRing === "essential" && !isAristotelianEssential) {
      msg = `Aristotle would disagree: "${prop}" can vary without changing what it is to be a horse. It's accidental.`;
    } else if (targetRing === "accidental" && isAristotelianEssential) {
      msg = `Aristotle would object: removing "${prop}" would make it no longer a horse. This is essential to horseness.`;
    } else if (targetRing === "essential" && isAristotelianEssential) {
      msg = `Correct: "${prop}" is essential — a horse without this is not truly a horse.`;
    } else {
      msg = `Correct: "${prop}" is accidental — it can change without affecting what makes a horse a horse.`;
    }
    setPropRings(prev => ({ ...prev, [prop]: targetRing }));
    setFeedback({ prop, msg, correct: (targetRing === "essential") === isAristotelianEssential });
  }

  const essentialProps = Object.entries(propRings).filter(([, v]) => v === "essential").map(([k]) => k);
  const accidentalProps = Object.entries(propRings).filter(([, v]) => v === "accidental").map(([k]) => k);

  const blurAmount = activeView === "modern" ? 1 : 0;

  // SVG layout
  const cx = 300, cy = 240;
  const r1 = 70, r2 = 140, r3 = 200;

  function polarToXY(angle, r) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function distributeOnRing(items, r, spread = 360) {
    return items.map((item, i) => {
      const angle = items.length === 1 ? 0 : (i / items.length) * spread;
      const pos = polarToXY(angle, r);
      return { item, ...pos };
    });
  }

  const essentialPositions = distributeOnRing(essentialProps, (r1 + r2) / 2 + 10);
  const accidentalPositions = distributeOnRing(accidentalProps, (r2 + r3) / 2 + 5);

  function getPillColor(ring, prop) {
    if (hoveredProp === prop) return ACCENT_LIGHT;
    if (ring === "essential") return ACCENT;
    return "#4a3520";
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 40% 30%, #2a1000 0%, #0a0a0f 100%)`,
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 4 of 15 — Aristotle: Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Metaphysics: Substance, Essence, and What Really Exists
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle mapped the fundamental structure of reality by distinguishing substances from properties, and essential natures from accidental features.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(20,10,0,0.7)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,15px)", color: "#d4c9b8", lineHeight: 1.75 }}>
            Aristotle's empirical method needed conceptual frameworks to organize observations, but what are those frameworks tracking? Are the categories and kinds we observe — horse, tree, human — genuinely real features of the world, or human impositions?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15,8,0,0.8)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 12,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: "clamp(14px,2.5vw,18px)", color: ACCENT_LIGHT, marginBottom: 6 }}>
              The Structure of a Substance
            </div>
            <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
              Click any property to learn about it. Drag it to the other ring to test whether Aristotle would call it essential or accidental.
            </p>
            {/* Toggle */}
            <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 4 }}>
              {["aristotle", "modern"].map(v => (
                <button
                  key={v}
                  onClick={() => { setActiveView(v); setFeedback(null); }}
                  style={{
                    background: activeView === v ? ACCENT : "rgba(30,15,0,0.8)",
                    color: activeView === v ? "#f0ead8" : SUBTITLE_COLOR,
                    border: `1px solid ${ACCENT}66`,
                    padding: "7px 18px",
                    cursor: "pointer",
                    fontSize: "clamp(11px,1.5vw,13px)",
                    fontFamily: "Georgia, serif",
                    borderRadius: v === "aristotle" ? "6px 0 0 6px" : "0 6px 6px 0",
                    transition: "background 0.2s",
                  }}
                >
                  {v === "aristotle" ? "Aristotle's View" : "Modern Biology's View"}
                </button>
              ))}
            </div>
          </div>

          {activeView === "modern" && (
            <div style={{
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}55`,
              borderRadius: 8,
              padding: "10px 16px",
              marginBottom: 14,
              fontSize: "clamp(12px,1.6vw,13px)",
              color: "#c8b89a",
              lineHeight: 1.65,
            }}>
              <strong style={{ color: ACCENT_LIGHT }}>Modern biology's view:</strong> Species have no sharp essential core. Traits form probabilistic clusters — the rings blur. A "horse" is any population member sharing a statistical family resemblance, not a fixed essence. The boundary between essential and accidental dissolves.
            </div>
          )}

          <svg viewBox="0 0 600 480" width="100%" style={{ display: "block", margin: "0 auto", maxWidth: 600 }}>
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#1a0800" />
                <stop offset="100%" stopColor="#080508" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="softBlur">
                <feGaussianBlur stdDeviation={activeView === "modern" ? "5" : "0"} />
              </filter>
            </defs>

            <rect x="0" y="0" width="600" height="480" fill="url(#bgGrad)" rx="10" />

            {/* Outer accidental ring */}
            <circle
              cx={cx} cy={cy} r={r3}
              fill={activeView === "modern" ? `${ACCENT}18` : "#1a0800"}
              stroke={activeView === "modern" ? "#88440088" : `${ACCENT}55`}
              strokeWidth={activeView === "modern" ? "1.5" : "1.5"}
              strokeDasharray={activeView === "modern" ? "6 4" : "none"}
              filter={activeView === "modern" ? "url(#softBlur)" : "none"}
            />
            {/* Essential ring */}
            <circle
              cx={cx} cy={cy} r={r2}
              fill="#120800"
              stroke={activeView === "modern" ? `${ACCENT}44` : `${ACCENT}88`}
              strokeWidth={activeView === "modern" ? "1" : "2"}
              strokeDasharray={activeView === "modern" ? "4 4" : "none"}
              filter={activeView === "modern" ? "url(#softBlur)" : "none"}
            />
            {/* Core substance circle */}
            <circle cx={cx} cy={cy} r={r1} fill={`${ACCENT}22`} stroke={ACCENT} strokeWidth="2" filter="url(#glow)" />

            {/* Ring labels */}
            <text x={cx} y={cy - r2 - 8} textAnchor="middle" fill={activeView === "modern" ? `${ACCENT}88` : ACCENT_LIGHT} fontSize="12" fontFamily="Georgia, serif">
              {activeView === "modern" ? "Trait Cluster (blurred)" : "Accidental Properties"}
            </text>
            <text x={cx} y={cy - r1 - 76} textAnchor="middle" fill={activeView === "modern" ? `${ACCENT}66` : `${ACCENT}cc`} fontSize="11" fontFamily="Georgia, serif">
              {activeView === "modern" ? "Probable Core" : "Essential Properties"}
            </text>

            {/* Horse icon in center */}
            <text x={cx} y={cy - 12} textAnchor="middle" fontSize="32" fontFamily="Georgia, serif">🐴</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill={ACCENT_LIGHT} fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">HORSE</text>
            <text x={cx} y={cy + 32} textAnchor="middle" fill={`${ACCENT}99`} fontSize="10" fontFamily="Georgia, serif">primary substance</text>

            {/* Modern blur overlay */}
            {activeView === "modern" && (
              <>
                <circle cx={cx} cy={cy} r={r2 + 15} fill="none" stroke={`${ACCENT}33`} strokeWidth="20" opacity="0.5" />
                <circle cx={cx} cy={cy} r={r1 + 15} fill="none" stroke={`${ACCENT}22`} strokeWidth="15" opacity="0.4" />
              </>
            )}

            {/* Essential property nodes */}
            {essentialPositions.map(({ item, x, y }) => (
              <g key={item}
                style={{ cursor: "pointer" }}
                onClick={() => handlePropClick(item)}
                onMouseEnter={() => setHoveredProp(item)}
                onMouseLeave={() => setHoveredProp(null)}
              >
                <rect
                  x={x - 38} y={y - 13}
                  width={76} height={26}
                  rx={13}
                  fill={selectedProp === item ? ACCENT : (hoveredProp === item ? `${ACCENT}cc` : `${ACCENT}44`)}
                  stroke={selectedProp === item ? ACCENT_LIGHT : ACCENT}
                  strokeWidth="1.5"
                  filter={selectedProp === item ? "url(#glow)" : "none"}
                />
                <text x={x} y={y + 5} textAnchor="middle" fill="#f0ead8" fontSize="10.5" fontFamily="Georgia, serif">
                  {item}
                </text>
                {/* drag hint */}
                <text x={x} y={y + 20} textAnchor="middle" fill={`${ACCENT}88`} fontSize="8" fontFamily="Georgia, serif">
                  click
                </text>
              </g>
            ))}

            {/* Accidental property nodes */}
            {accidentalPositions.map(({ item, x, y }) => (
              <g key={item}
                style={{ cursor: "pointer" }}
                onClick={() => handlePropClick(item)}
                onMouseEnter={() => setHoveredProp(item)}
                onMouseLeave={() => setHoveredProp(null)}
              >
                <rect
                  x={x - 40} y={y - 13}
                  width={80} height={26}
                  rx={13}
                  fill={selectedProp === item ? "#4a2a0a" : (hoveredProp === item ? "#3a2010" : "#1e1008")}
                  stroke={selectedProp === item ? ACCENT_LIGHT : `${ACCENT}66`}
                  strokeWidth="1.5"
                  strokeDasharray={activeView === "modern" ? "4 3" : "none"}
                />
                <text x={x} y={y + 5} textAnchor="middle" fill={selectedProp === item ? "#f0ead8" : SUBTITLE_COLOR} fontSize="10.5" fontFamily="Georgia, serif">
                  {item}
                </text>
                <text x={x} y={y + 20} textAnchor="middle" fill={`${ACCENT}66`} fontSize="8" fontFamily="Georgia, serif">
                  click
                </text>
              </g>
            ))}
          </svg>

          {/* Selected property detail + move buttons */}
          {selectedProp && (
            <div style={{
              background: "rgba(30,12,0,0.85)",
              border: `1px solid ${ACCENT}66`,
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 12,
            }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6 }}>
                "{selectedProp}"
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "clamp(12px,1.6vw,13px)", color: "#c8b89a", lineHeight: 1.65 }}>
                {essentialDefs[selectedProp]}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => moveProp(selectedProp, "essential")}
                  style={{
                    background: propRings[selectedProp] === "essential" ? ACCENT : "rgba(40,20,0,0.8)",
                    color: "#f0ead8",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 6,
                    padding: "7px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(11px,1.5vw,13px)",
                  }}
                >
                  Move to Essential Ring
                </button>
                <button
                  onClick={() => moveProp(selectedProp, "accidental")}
                  style={{
                    background: propRings[selectedProp] === "accidental" ? "#4a2a0a" : "rgba(40,20,0,0.8)",
                    color: "#f0ead8",
                    border: `1px solid ${ACCENT}66`,
                    borderRadius: 6,
                    padding: "7px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(11px,1.5vw,13px)",
                  }}
                >
                  Move to Accidental Ring
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 8,
              background: feedback.correct ? "rgba(20,40,10,0.7)" : "rgba(40,10,10,0.7)",
              border: `1px solid ${feedback.correct ? "#5a8a2a" : "#8a2a2a"}`,
              fontSize: "clamp(12px,1.6vw,13px)",
              color: feedback.correct ? "#a8d888" : "#e88888",
              lineHeight: 1.65,
            }}>
              {feedback.correct ? "✓ " : "✗ "}{feedback.msg}
            </div>
          )}

          {/* Legend */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: ACCENT, border: `1px solid ${ACCENT_LIGHT}` }} />
              <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>Essential (inner ring)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1e1008", border: `1px solid ${ACCENT}66` }} />
              <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>Accidental (outer ring)</span>
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT : ACCENT + "88"}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              marginTop: 14,
              padding: "14px 18px",
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}55`,
              borderRadius: 8,
            }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,14px)", color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: "#c8b89a", lineHeight: 1.75 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20,10,0,0.7)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 10px 0", fontSize: "clamp(13px,1.8vw,15px)", color: "#d4c9b8", lineHeight: 1.75 }}>
            Modern science abandoned essences in favor of structural descriptions and causal laws — gold is just any atom with 79 protons, species have no Aristotelian essence but only statistical trait distributions. This raises the question of whether Aristotelian metaphysics is compatible with science at all.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: `${ACCENT}cc`, lineHeight: 1.6, fontStyle: "italic" }}>
            This pressure forces the next development: if essences dissolve into causal structures, can purpose and teleology survive in the scientific worldview?
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(15,8,0,0.7)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {realWorldEchoes.map((echo, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: `${ACCENT}0a`,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {echo.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {echo.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 4 of 15 — Aristotle: Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 5: The Four Causes and How Explanation Works ───
function FourCauses() {
  const ACCENT = "#16A34A";
  const ACCENT_LIGHT = "#4ade80";
  const ACCENT_DIM = "#0a2e18";
  const TITLE_COLOR = "#e8f5e9";
  const SUBTITLE_COLOR = "#86efac";
  const BG = "radial-gradient(ellipse at 30% 20%, #052e16 0%, #0a0a0f 80%)";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [modernMode, setModernMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [activeQuadrant, setActiveQuadrant] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredQuadrant, setHoveredQuadrant] = useState(null);

  const transition = sliderValue / 100;

  const keyConcepts = [
    { id: "material", label: "Material Cause", desc: "The material cause is what something is made of — the substrate that receives form. For an oak, it is the cells, water, nutrients, and carbon compounds that compose it. Aristotle insisted matter alone cannot explain a thing; you must also ask what organizes the matter into this particular kind of being." },
    { id: "formal", label: "Formal Cause", desc: "The formal cause is the structure, pattern, or essential form that makes something what it is. The oak has a characteristic branching geometry, cellular architecture, and biochemical organization that distinguishes it from every other plant. Form is not mere shape — it is the organizing principle embedded in the matter." },
    { id: "efficient", label: "Efficient Cause", desc: "The efficient cause is the agent or process that brings a thing into being or changes it — the 'mover' in the chain of production. For the oak, efficient causes include sunlight driving photosynthesis, water absorbed by roots, and the biochemical machinery of cell division. This is closest to what modern physics means by 'cause.'" },
    { id: "final", label: "Final Cause", desc: "The final cause is the telos — the goal, function, or end toward which something develops. Aristotle believed nature is genuinely goal-directed: the acorn grows into an oak because being a mature oak is its natural end. This is not mere metaphor for Aristotle; teleology is built into the structure of natural kinds." },
    { id: "teleological", label: "Teleological Explanation", desc: "Teleological explanation explains something by reference to its purpose or function rather than its prior causes. When biologists say the heart evolved 'in order to' pump blood, they deploy a teleological idiom. Whether this requires genuine goals in nature or can be reduced to selection history remains one of philosophy of biology's central debates." },
    { id: "aitia", label: "Aitia", desc: "Aitia is the Greek term Aristotle used for 'cause' or 'explanation' — but its meaning is richer than the English word. An aitia is a complete account of why something is the case, an answer to a 'why' question that leaves nothing explanatorily relevant unsaid. The four causes are four irreducibly different kinds of aitia." },
  ];

  const quadrants = [
    {
      id: "material",
      label: "Material Cause",
      sublabel: "What it's made of",
      greek: "hylē",
      color: "#78350f",
      accent: "#fbbf24",
      fadeOnModern: false,
      desc: "Cells, water, nutrients, carbon compounds — the physical substrate of the oak.",
      modernDesc: "Mass, atoms, molecular bonds — measured and quantified."
    },
    {
      id: "formal",
      label: "Formal Cause",
      sublabel: "Its structure/pattern",
      greek: "morphē",
      color: "#1e3a5f",
      accent: "#60a5fa",
      fadeOnModern: true,
      desc: "The oak's characteristic branching architecture, cellular organization, DNA blueprint.",
      modernDesc: "Eliminated from physics. Replaced by mathematical law."
    },
    {
      id: "efficient",
      label: "Efficient Cause",
      sublabel: "What produces it",
      greek: "kinoun",
      color: "#14532d",
      accent: "#4ade80",
      fadeOnModern: false,
      expandOnModern: true,
      desc: "Sunlight, water, photosynthesis, cell division — the processes driving growth.",
      modernDesc: "F = ma. Biochemical reaction rates. Thermodynamic gradients. Mathematical laws govern all."
    },
    {
      id: "final",
      label: "Final Cause",
      sublabel: "Its purpose/telos",
      greek: "telos",
      color: "#3b1c6e",
      accent: "#c084fc",
      fadeOnModern: true,
      desc: "The mature oak: the natural end toward which the acorn strives.",
      modernDesc: "Eliminated from physics. Controversial in biology."
    }
  ];

  const svgAnimOffset = Date.now();

  function QuadrantSVG({ q, transition, isActive, isHovered }) {
    const fade = q.fadeOnModern ? (1 - transition * 0.85) : 1;
    const expand = q.expandOnModern ? (1 + transition * 0.3) : 1;
    const opacity = fade;

    if (q.id === "material") {
      return (
        <svg viewBox="0 0 160 120" width="100%" style={{ display: "block" }}>
          <rect x="0" y="0" width="160" height="120" fill={q.color} opacity="0.4" rx="4" />
          {[20, 40, 60, 80, 100, 120, 140].map((x, i) => (
            <circle key={i} cx={x} cy={30 + (i % 3) * 20} r={4 + (i % 2) * 2}
              fill={q.accent} opacity={0.5 + (i % 3) * 0.15} />
          ))}
          <text x="80" y="72" textAnchor="middle" fill={q.accent} fontSize="11" fontFamily="Georgia, serif" opacity="0.9">H₂O · C · N · O</text>
          <text x="80" y="88" textAnchor="middle" fill={q.accent} fontSize="9" fontFamily="Georgia, serif" opacity="0.7">cellular substrate</text>
          {transition > 0.3 && (
            <text x="80" y="108" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="Georgia, serif" opacity={transition * 0.9}>atoms & mass</text>
          )}
          {[30, 70, 110, 150].map((x, i) => (
            <line key={i} x1={x} y1="55" x2={x + 10} y2="15"
              stroke={q.accent} strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
          ))}
        </svg>
      );
    }
    if (q.id === "formal") {
      return (
        <svg viewBox="0 0 160 120" width="100%" style={{ display: "block", opacity }}>
          <rect x="0" y="0" width="160" height="120" fill={q.color} opacity="0.4" rx="4" />
          <line x1="80" y1="110" x2="80" y2="70" stroke={q.accent} strokeWidth="2" opacity="0.8" />
          <line x1="80" y1="85" x2="50" y2="58" stroke={q.accent} strokeWidth="1.5" opacity="0.7" />
          <line x1="80" y1="85" x2="110" y2="58" stroke={q.accent} strokeWidth="1.5" opacity="0.7" />
          <line x1="80" y1="70" x2="55" y2="42" stroke={q.accent} strokeWidth="1.2" opacity="0.6" />
          <line x1="80" y1="70" x2="105" y2="42" stroke={q.accent} strokeWidth="1.2" opacity="0.6" />
          <line x1="55" y1="42" x2="42" y2="25" stroke={q.accent} strokeWidth="1" opacity="0.5" />
          <line x1="55" y1="42" x2="62" y2="22" stroke={q.accent} strokeWidth="1" opacity="0.5" />
          <line x1="105" y1="42" x2="118" y2="25" stroke={q.accent} strokeWidth="1" opacity="0.5" />
          <line x1="105" y1="42" x2="98" y2="22" stroke={q.accent} strokeWidth="1" opacity="0.5" />
          <text x="80" y="14" textAnchor="middle" fill={q.accent} fontSize="10" fontFamily="Georgia, serif" opacity="0.9">morphē</text>
          {transition > 0.5 && (
            <rect x="10" y="35" width="140" height="50" fill="#0a0a0f" opacity={transition * 0.7} rx="4" />
          )}
          {transition > 0.5 && (
            <text x="80" y="66" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia, serif" opacity={transition}>eliminated</text>
          )}
        </svg>
      );
    }
    if (q.id === "efficient") {
      return (
        <svg viewBox="0 0 160 120" width="100%" style={{ display: "block" }}>
          <rect x="0" y="0" width="160" height="120" fill={q.color} opacity={0.4 + transition * 0.3} rx="4" />
          <circle cx="80" cy="20" r="12" fill="#fbbf24" opacity="0.9" />
          <text x="80" y="24" textAnchor="middle" fill="#7c2d12" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold">SUN</text>
          {[60, 75, 90, 105].map((x, i) => (
            <line key={i} x1={x} y1="32" x2={80} y2="60" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" strokeDasharray={`${3 + i},2`} />
          ))}
          <ellipse cx="80" cy="75" rx="18" ry="8" fill={q.accent} opacity="0.7" />
          <text x="80" y="78" textAnchor="middle" fill="#052e16" fontSize="8" fontFamily="Georgia, serif" fontWeight="bold">growth</text>
          <line x1="65" y1="110" x2="65" y2="83" stroke="#60a5fa" strokeWidth="2" opacity="0.6" />
          <line x1="75" y1="110" x2="75" y2="83" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
          <text x="70" y="118" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="Georgia, serif">H₂O</text>
          {transition > 0.4 && (
            <>
              <text x="80" y="45" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="Georgia, serif" opacity={transition * 0.95}>F = ma</text>
              <text x="130" y="65" textAnchor="middle" fill="#4ade80" fontSize="7" fontFamily="Georgia, serif" opacity={transition * 0.85}>ΔG = ΔH−TΔS</text>
              <text x="30" y="95" textAnchor="middle" fill="#4ade80" fontSize="7" fontFamily="Georgia, serif" opacity={transition * 0.8}>∂C/∂t</text>
            </>
          )}
        </svg>
      );
    }
    if (q.id === "final") {
      return (
        <svg viewBox="0 0 160 120" width="100%" style={{ display: "block", opacity }}>
          <rect x="0" y="0" width="160" height="120" fill={q.color} opacity="0.4" rx="4" />
          <line x1="80" y1="115" x2="80" y2="65" stroke="#92400e" strokeWidth="4" opacity="0.8" />
          <line x1="80" y1="95" x2="45" y2="60" stroke="#16a34a" strokeWidth="2.5" opacity="0.8" />
          <line x1="80" y1="95" x2="115" y2="60" stroke="#16a34a" strokeWidth="2.5" opacity="0.8" />
          <line x1="80" y1="78" x2="38" y2="38" stroke="#16a34a" strokeWidth="2" opacity="0.7" />
          <line x1="80" y1="78" x2="122" y2="38" stroke="#16a34a" strokeWidth="2" opacity="0.7" />
          <line x1="80" y1="65" x2="55" y2="30" stroke="#16a34a" strokeWidth="1.5" opacity="0.6" />
          <line x1="80" y1="65" x2="105" y2="30" stroke="#16a34a" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx="80" cy="20" rx="35" ry="14" fill="#16a34a" opacity="0.4" />
          <text x="80" y="23" textAnchor="middle" fill={q.accent} fontSize="9" fontFamily="Georgia, serif" fontWeight="bold">telos: mature oak</text>
          <text x="80" y="108" textAnchor="middle" fill={q.accent} fontSize="8" fontFamily="Georgia, serif" opacity="0.8">→</text>
          {transition > 0.5 && (
            <rect x="10" y="30" width="140" height="55" fill="#0a0a0f" opacity={transition * 0.75} rx="4" />
          )}
          {transition > 0.5 && (
            <text x="80" y="62" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia, serif" opacity={transition}>eliminated</text>
          )}
          {transition > 0.5 && (
            <text x="80" y="76" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="Georgia, serif" opacity={transition * 0.8}>from physics</text>
          )}
        </svg>
      );
    }
    return null;
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "clamp(16px, 4vw, 40px)", fontFamily: "Georgia, serif", color: "#d1fae5" }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 5 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            The Four Causes and How Explanation Works
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle argued that fully explaining anything requires identifying four distinct types of cause: material, formal, efficient, and final.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{ background: "rgba(0,0,0,0.35)", borderLeft: `4px solid ${ACCENT}`, borderRadius: "0 8px 8px 0", padding: "clamp(14px, 3vw, 22px)", marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>The Problem</div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,15px)", color: "#c8f0d8", lineHeight: 1.75 }}>
            Aristotle's substance metaphysics established that things have essences, but it did not explain how things change, develop, or produce other things — a purely static picture of substances with properties cannot account for growth, generation, or causation.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${ACCENT}44`, borderRadius: 10, padding: "clamp(16px,3vw,28px)", marginBottom: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: "clamp(14px,2vw,17px)", color: ACCENT_LIGHT, marginBottom: 6 }}>
              The Oak Tree: Four Causal Explanations
            </div>
            <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#86efac", margin: "0 0 16px 0", lineHeight: 1.6 }}>
              Drag the slider to shift from Aristotle's complete explanation to modern science's account — watch formal and final causes fade away.
            </p>

            {/* SLIDER */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "clamp(11px,1.5vw,13px)", color: ACCENT_LIGHT, whiteSpace: "nowrap" }}>Aristotle</span>
              <input
                type="range" min="0" max="100" value={sliderValue}
                onChange={e => setSliderValue(Number(e.target.value))}
                style={{ width: "clamp(140px, 40vw, 280px)", accentColor: ACCENT, cursor: "pointer" }}
              />
              <span style={{ fontSize: "clamp(11px,1.5vw,13px)", color: "#60a5fa", whiteSpace: "nowrap" }}>Modern Physics</span>
            </div>

            {/* Status badge */}
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, background: sliderValue < 50 ? `${ACCENT}33` : "#1e3a5f", border: `1px solid ${sliderValue < 50 ? ACCENT : "#60a5fa"}`, fontSize: "clamp(10px,1.4vw,12px)", color: sliderValue < 50 ? ACCENT_LIGHT : "#93c5fd", marginBottom: 18 }}>
              {sliderValue < 20 ? "Complete Aristotelian explanation" : sliderValue < 50 ? "Partial — some causes remain" : sliderValue < 80 ? "Modern science taking over" : "Physics: efficient causes only + mathematical law"}
            </div>
          </div>

          {/* FOUR QUADRANTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1.5vw,14px)", marginBottom: 16 }}>
            {quadrants.map(q => {
              const fade = q.fadeOnModern ? (1 - transition * 0.85) : 1;
              const isActive = activeQuadrant === q.id;
              const isHovered = hoveredQuadrant === q.id;
              return (
                <div key={q.id}
                  onClick={() => setActiveQuadrant(isActive ? null : q.id)}
                  onMouseEnter={() => setHoveredQuadrant(q.id)}
                  onMouseLeave={() => setHoveredQuadrant(null)}
                  style={{
                    background: isActive ? `${q.color}99` : `${q.color}55`,
                    border: `2px solid ${isActive || isHovered ? q.accent : q.accent + "55"}`,
                    borderRadius: 8,
                    padding: "clamp(10px,2vw,16px)",
                    cursor: "pointer",
                    opacity: fade < 0.3 ? 0.3 : fade,
                    transition: "all 0.3s ease",
                    boxShadow: isActive ? `0 0 20px ${q.accent}44` : "none"
                  }}>
                  <div style={{ fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: 2, textTransform: "uppercase", color: q.accent, marginBottom: 2 }}>
                    {q.label}
                  </div>
                  <div style={{ fontSize: "clamp(9px,1.1vw,10px)", color: q.accent + "99", marginBottom: 6, fontStyle: "italic" }}>
                    {q.sublabel} · {q.greek}
                  </div>
                  <QuadrantSVG q={q} transition={transition} isActive={isActive} isHovered={isHovered} />
                  {isActive && (
                    <div style={{ marginTop: 8, fontSize: "clamp(10px,1.3vw,12px)", color: "#d1fae5", lineHeight: 1.6 }}>
                      {transition > 0.5 ? q.modernDesc : q.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Caption */}
          <div style={{ textAlign: "center", fontSize: "clamp(10px,1.3vw,12px)", color: "#6b7280", fontStyle: "italic" }}>
            Click any quadrant to expand its explanation · Slide right to apply the modern scientific filter
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${ACCENT}33`, borderRadius: 8, padding: "clamp(16px, 3vw, 24px)", marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {keyConcepts.map(kc => {
              const isActive = hoveredConcept === kc.id;
              return (
                <button key={kc.id}
                  onClick={() => setHoveredConcept(isActive ? null : kc.id)}
                  style={{
                    background: isActive ? ACCENT : "transparent",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: isActive ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(10px,1.4vw,12px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "all 0.2s ease"
                  }}>
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(k => k.id === hoveredConcept);
            return kc ? (
              <div style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}44`, borderRadius: 6, padding: "14px 18px" }}>
                <div style={{ fontSize: "clamp(12px,1.6vw,14px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{kc.label}</div>
                <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: "#c8f0d8", lineHeight: 1.75 }}>{kc.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{ background: "rgba(0,0,0,0.35)", borderLeft: `4px solid ${ACCENT}`, borderRadius: "0 8px 8px 0", padding: "clamp(14px, 3vw, 22px)", marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>The Difficulty</div>
          <p style={{ margin: "0 0 10px 0", fontSize: "clamp(13px,1.8vw,15px)", color: "#c8f0d8", lineHeight: 1.75 }}>
            The scientific revolution demonstrated that physics succeeds by eliminating formal and final causes entirely, relying only on efficient causation and mathematical law — yet biology persistently requires functional explanation that sounds like Aristotelian final causation, leaving the status of teleology unresolved.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(11px,1.5vw,13px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
            This pressure forces the next development — asking what kind of entity can be a substance that acts, perceives, and reasons.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${ACCENT}22`, borderRadius: 8, marginBottom: 16, overflow: "hidden" }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{ width: "100%", background: "transparent", border: "none", padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>Real-World Echoes</span>
            {echoesOpen ? <ChevronUp size={16} color={ACCENT} /> : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 6px 6px 0", background: `${ACCENT}0a`, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Evolutionary Biology and Functional Explanation</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>When biologists explain that the vertebrate eye evolved "in order to" detect light, or that blood-clotting cascades exist "for the purpose of" wound repair, they deploy what is structurally a final-causal vocabulary. The debate over whether such teleological language is merely shorthand for selection history, or whether it picks out something genuinely explanatory in its own right, directly recapitulates the Aristotelian controversy.</p>
              </div>
              <div style={{ borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 6px 6px 0", background: `${ACCENT}0a`, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Neander and Millikan: Naturalized Teleology</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>Philosophers Karen Neander and Ruth Millikan developed "selected effects" theories of function: a trait's proper function is what it was selected for. This naturalizes final causation without invoking divine design — but critics argue it reduces teleology to history, losing the forward-looking, goal-directed character that makes final causes explanatorily distinctive in the first place.</p>
              </div>
              <div style={{ borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 6px 6px 0", background: `${ACCENT}0a`, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Nancy Cartwright: The Cost of Eliminating Causes</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>Philosopher of science Nancy Cartwright has argued that the success of modern physics in eliminating formal and final causes comes at a real epistemic cost: we gain mathematical precision but lose genuine understanding of capacities, natures, and ends. Her work suggests Aristotle's four causes may represent irreducible dimensions of explanation that no purely efficient-causal science can fully capture.</p>
              </div>
              <div style={{ borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 6px 6px 0", background: `${ACCENT}0a`, padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Developmental Biology and Gene Regulatory Networks</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>Gene regulatory networks (GRNs) that orchestrate embryonic development look strikingly like Aristotelian formal causes: they are organizational patterns, not physical constituents, that determine what kind of organism develops from undifferentiated cells. Evo-devo researchers increasingly describe these networks as "body plans" — a vocabulary that echoes Aristotle's morphē and resists reduction to efficient-causal biochemistry alone.</p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 5 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 6: Form and Matter, Potentiality and Actuality ───
function FormMatterPotentialityActuality() {
  const ACCENT = "#9D174D";
  const ACCENT_LIGHT = "#e05a8a";
  const ACCENT_DIM = "#3a0820";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [sculptSlider, setSculptSlider] = useState(0);
  const [growthStage, setGrowthStage] = useState(0);
  const [quantumMode, setQuantumMode] = useState(false);
  const [quantumCollapsed, setQuantumCollapsed] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [activeGrowthTooltip, setActiveGrowthTooltip] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    if (!quantumMode || quantumCollapsed) return;
    const id = setInterval(() => {
      setWaveOffset(p => (p + 2) % 200);
    }, 30);
    return () => clearInterval(id);
  }, [quantumMode, quantumCollapsed]);

  const keyConcepts = [
    { id: "hylomorphism", label: "Hylomorphism", desc: "Hylomorphism is Aristotle's doctrine that every physical thing is a compound of form (morphe) and matter (hyle). Neither exists as a fully independent entity in ordinary objects: the bronze needs a shape to be something determinate, and the statue-shape needs bronze to be materially real. This dual structure is what makes change intelligible." },
    { id: "prime_matter", label: "Prime Matter", desc: "Prime matter is the ultimate substrate that underlies all physical change — pure potentiality with no form of its own. It never exists as a bare thing, but is always already formed into something. Aristotle needs it theoretically to ground the chain of matter-form analysis without infinite regress." },
    { id: "pure_actuality", label: "Pure Actuality", desc: "Pure actuality (actus purus) is the logical endpoint of Aristotle's analysis: something that is fully what it is with no unrealized potential. The Unmoved Mover is this entity. Because it has nothing left to become, it cannot be moved — it is eternal, unchanging, and moves other things as the object of desire, not by pushing." },
    { id: "potentiality_mode", label: "Potentiality as Mode of Being", desc: "For Aristotle, potentiality is not mere absence or fiction — it is a genuine mode of being. The acorn is really a potential oak, not just a non-oak. This ontological weight is crucial: it lets Aristotle say that change moves from one real state to another, rather than from nothing to something." },
    { id: "actuality_prior", label: "Actuality Prior to Potentiality", desc: "Aristotle argues that actuality is metaphysically prior to potentiality in three senses: in definition (you define potential F by reference to actual F), in time (something actual always precedes any new potential), and in substance (the fully realized form is the telos that explains the process). An egg presupposes a chicken." },
    { id: "unmoved_mover", label: "Unmoved Mover", desc: "If every actualization requires something already actual to trigger it, the chain cannot regress infinitely or move in a circle — there must be a first actualizer that is itself always already actual. This is Aristotle's Unmoved Mover: not a temporal first cause, but the metaphysical condition of there being any motion at all." },
  ];

  const growthStages = [
    { label: "Acorn", potentiality: 1.0, actuality: 0.0, desc: "Maximum potential, minimal actuality. The acorn holds the entire form of the oak in potential." },
    { label: "Seedling", potentiality: 0.7, actuality: 0.3, desc: "Sunlight — already actual energy — triggers actualization. The form begins expressing itself." },
    { label: "Sapling", potentiality: 0.45, actuality: 0.55, desc: "Actuality now exceeds potentiality. The oak form dominates; growth continues toward the telos." },
    { label: "Oak Tree", potentiality: 0.1, actuality: 0.9, desc: "Near-full actuality. The oak has realized its form. Residual potential: future seeds, continued growth." },
  ];

  const realWorldExamples = [
    { title: "Molecular Structure as Formal Cause", body: "In chemistry, the same atoms (matter) can compose radically different substances depending on their arrangement (form). Diamond and graphite are both pure carbon — their difference is entirely formal. Hylomorphism maps cleanly onto the structure-matter distinction that chemists work with every day." },
    { title: "Putnam's Functionalism", body: "Hillary Putnam's philosophy of mind argues that mental states are defined by their functional role — their causal-structural form — not by the physical substrate realizing them. Pain is what pain does, regardless of whether it runs on neurons or silicon. This neo-Aristotelian move separates form from matter in the mind-body problem." },
    { title: "Causal Powers and Dispositions", body: "Contemporary philosophers Ruth Groff and Neil Williams defend a view of properties as real causal powers — things are genuinely disposed toward certain behaviors before those behaviors occur. This rehabilitates Aristotelian potentiality against the Humean view that dispositions are mere regularities with no inner reality." },
    { title: "Living Cell Organization", body: "Cell biologists describe living cells as having organization that cannot be reduced to the sum of their chemical parts. The information encoded in DNA and expressed through protein folding constitutes something like a formal cause: the same atoms arranged differently produce an entirely different organism or nothing living at all." },
  ];

  const pct = sculptSlider / 100;
  const stg = growthStages[growthStage];

  function lerp(a, b, t) { return a + (b - a) * t; }

  const bronzePoints = "60,140 100,155 140,160 180,155 220,145 240,120 235,90 210,70 175,60 140,58 110,62 85,75 68,95 60,120";
  const statuePoints = "120,150 130,155 150,158 170,155 185,148 195,130 192,105 180,80 165,62 150,55 135,58 122,68 115,85 112,108 115,130";

  function interpolatePoints(pts1, pts2, t) {
    const a1 = pts1.split(" ").map(p => p.split(",").map(Number));
    const a2 = pts2.split(" ").map(p => p.split(",").map(Number));
    const minLen = Math.min(a1.length, a2.length);
    return Array.from({ length: minLen }, (_, i) => {
      const x = lerp(a1[i][0], a2[i][0], t);
      const y = lerp(a1[i][1], a2[i][1], t);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  const interpolatedPoints = interpolatePoints(bronzePoints, statuePoints, pct);

  const quantumPotColor = quantumCollapsed ? "#4a90d9" : ACCENT_LIGHT;

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 30% 20%, #3a0820 0%, #1a0010 40%, #0a0a0f 100%)`,
      color: TITLE_COLOR,
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px)",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
            Part 6 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Form and Matter, Potentiality and Actuality
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle solved the ancient puzzle of change and identity by distinguishing the organizing form from the underlying matter and potential being from actual being.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.75, margin: 0 }}>
            Substance metaphysics described what things are in their stable state, but pre-Socratic philosophy had shown that change and persistence seemed logically incompatible: if something changes it becomes different, so how is it still the same thing?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 16, textAlign: "center" }}>
            Interactive Diagram — Form, Matter & Becoming
          </div>

          {/* MODULE 1: Bronze → Statue */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6, textAlign: "center" }}>
              Hylomorphism: The Sculpting of Bronze
            </div>
            <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: SUBTITLE_COLOR, textAlign: "center", margin: "0 0 12px 0", lineHeight: 1.6 }}>
              The matter (bronze, glowing) persists throughout. Drag the slider to apply the form.
            </p>
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 500, display: "block", margin: "0 auto" }}>
              <defs>
                <radialGradient id="bronzeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#cd7f32" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7a4010" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient id="formGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={ACCENT_LIGHT} stopOpacity={pct * 0.7} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Matter label */}
              <text x="150" y="18" textAnchor="middle" fontSize="11" fill="#cd7f32" fontFamily="Georgia, serif">
                Matter (bronze) — persists throughout
              </text>
              {/* Background glow for form */}
              <ellipse cx="150" cy="108" rx={40 + pct * 30} ry={55 + pct * 10} fill="url(#formGlow)" />
              {/* The interpolated shape */}
              <polygon
                points={interpolatedPoints}
                fill="url(#bronzeGlow)"
                stroke="#cd7f32"
                strokeWidth="2"
                filter="url(#glow)"
              />
              {/* Form overlay lines (crystallizing) */}
              {pct > 0.1 && (
                <polygon
                  points={interpolatedPoints}
                  fill="none"
                  stroke={ACCENT_LIGHT}
                  strokeWidth={pct * 2}
                  strokeOpacity={pct * 0.8}
                  strokeDasharray={`${(1 - pct) * 8} ${(1 - pct) * 4}`}
                />
              )}
              {/* Labels */}
              <text x="150" y="185" textAnchor="middle" fontSize="11" fill={ACCENT_LIGHT} fontFamily="Georgia, serif" opacity={pct}>
                {pct < 0.3 ? "Formless bronze..." : pct < 0.7 ? "Form emerging..." : "Statue of Athena"}
              </text>
              {/* Form label */}
              <text x="150" y="198" textAnchor="middle" fontSize="9" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">
                Form applied: {Math.round(pct * 100)}%
              </text>
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px auto 0", maxWidth: 500 }}>
              <span style={{ fontSize: 11, color: "#cd7f32", whiteSpace: "nowrap" }}>Raw Bronze</span>
              <input
                type="range" min={0} max={100} value={sculptSlider}
                onChange={e => setSculptSlider(Number(e.target.value))}
                style={{ flex: 1, accentColor: ACCENT, cursor: "pointer" }}
              />
              <span style={{ fontSize: 11, color: ACCENT_LIGHT, whiteSpace: "nowrap" }}>Athena</span>
            </div>
          </div>

          {/* MODULE 2: Acorn → Oak / Quantum Toggle */}
          <div style={{ borderTop: `1px solid ${ACCENT}33`, paddingTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontWeight: "bold" }}>
                {quantumMode ? "Quantum Objection: Potentiality Inverted" : "Potentiality → Actuality: The Oak's Journey"}
              </div>
              <button
                onClick={() => { setQuantumMode(q => !q); setQuantumCollapsed(false); }}
                style={{
                  background: quantumMode ? ACCENT : "transparent",
                  border: `1px solid ${ACCENT}`,
                  color: quantumMode ? "#f0ead8" : ACCENT_LIGHT,
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  letterSpacing: 1,
                }}
              >
                {quantumMode ? "← Aristotle" : "Quantum Objection →"}
              </button>
            </div>

            {!quantumMode ? (
              <>
                <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
                  Click each stage. Potentiality depletes as actuality increases. Note: each stage requires something <em>already actual</em> (sunlight) to trigger the transition.
                </p>
                {/* Growth stages */}
                <div style={{ display: "flex", justifyContent: "center", gap: "clamp(4px,1.5vw,10px)", marginBottom: 16, flexWrap: "wrap" }}>
                  {growthStages.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setGrowthStage(i)}
                      style={{
                        background: growthStage === i ? ACCENT : "rgba(0,0,0,0.3)",
                        border: `1px solid ${growthStage === i ? ACCENT_LIGHT : ACCENT + "55"}`,
                        color: growthStage === i ? "#f0ead8" : SUBTITLE_COLOR,
                        borderRadius: 6,
                        padding: "6px 12px",
                        fontSize: "clamp(10px,1.5vw,12px)",
                        cursor: "pointer",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                {/* Meters */}
                <svg viewBox="0 0 500 140" width="100%" style={{ maxWidth: 500, display: "block", margin: "0 auto" }}>
                  {/* Stage icon area */}
                  {growthStage === 0 && (
                    <ellipse cx="250" cy="55" rx="18" ry="24" fill="#8B6914" stroke="#cd9a30" strokeWidth="2" />
                  )}
                  {growthStage === 1 && (
                    <g>
                      <ellipse cx="250" cy="70" rx="12" ry="15" fill="#8B6914" />
                      <line x1="250" y1="55" x2="250" y2="25" stroke="#3a7a30" strokeWidth="3" />
                      <ellipse cx="250" cy="20" rx="10" ry="8" fill="#4a9a40" />
                    </g>
                  )}
                  {growthStage === 2 && (
                    <g>
                      <line x1="250" y1="80" x2="250" y2="20" stroke="#4a7a30" strokeWidth="4" />
                      <ellipse cx="250" cy="18" rx="20" ry="15" fill="#3a8a30" />
                      <ellipse cx="232" cy="30" rx="14" ry="10" fill="#4a9a40" />
                      <ellipse cx="268" cy="30" rx="14" ry="10" fill="#4a9a40" />
                    </g>
                  )}
                  {growthStage === 3 && (
                    <g>
                      <line x1="250" y1="85" x2="250" y2="40" stroke="#6a5020" strokeWidth="6" />
                      <ellipse cx="250" cy="30" rx="32" ry="22" fill="#3a7a28" />
                      <ellipse cx="225" cy="42" rx="20" ry="15" fill="#4a9a38" />
                      <ellipse cx="275" cy="42" rx="20" ry="15" fill="#4a9a38" />
                      <ellipse cx="250" cy="48" rx="24" ry="14" fill="#5aaa48" />
                    </g>
                  )}
                  {/* Potentiality meter */}
                  <text x="30" y="100" textAnchor="middle" fontSize="10" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">Potentiality</text>
                  <rect x="55" y="92" width="120" height="14" rx="7" fill="rgba(0,0,0,0.4)" stroke={ACCENT + "55"} />
                  <rect x="55" y="92" width={stg.potentiality * 120} height="14" rx="7" fill={ACCENT} />
                  <text x="185" y="103" fontSize="10" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">{Math.round(stg.potentiality * 100)}%</text>
                  {/* Actuality meter */}
                  <text x="330" y="100" textAnchor="middle" fontSize="10" fill="#60c060" fontFamily="Georgia, serif">Actuality</text>
                  <rect x="355" y="92" width="120" height="14" rx="7" fill="rgba(0,0,0,0.4)" stroke="#60c06055" />
                  <rect x="355" y="92" width={stg.actuality * 120} height="14" rx="7" fill="#3a8a30" />
                  <text x="485" y="103" fontSize="10" fill="#60c060" fontFamily="Georgia, serif">{Math.round(stg.actuality * 100)}%</text>
                  {/* Label */}
                  <text x="250" y="128" textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">
                    {stg.label} — {stg.potentiality > stg.actuality ? "Potentiality dominant" : "Actuality dominant"}
                  </text>
                </svg>
                <div style={{
                  background: ACCENT + "15",
                  border: `1px solid ${ACCENT}44`,
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginTop: 10,
                  maxWidth: 500,
                  margin: "10px auto 0",
                }}>
                  <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.65 }}>
                    {stg.desc}
                  </p>
                  {growthStage > 0 && (
                    <p style={{ fontSize: "clamp(10px,1.5vw,12px)", color: ACCENT_LIGHT, margin: "8px 0 0", lineHeight: 1.6 }}>
                      Actuality is prior: the sunlight (already actual) is what enables each new stage of actualization.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
                  At the quantum level, particles exist as probability waves — superpositions of potential states. Actuality appears only upon measurement. Does this invert Aristotle's hierarchy?
                </p>
                <svg viewBox="0 0 500 140" width="100%" style={{ maxWidth: 500, display: "block", margin: "0 auto" }}>
                  {!quantumCollapsed ? (
                    <g>
                      {/* Probability wave */}
                      {Array.from({ length: 80 }, (_, i) => {
                        const x = 40 + i * 5.25;
                        const phase = (i * 15 + waveOffset) % 360;
                        const amplitude = 28 * Math.exp(-Math.pow((i - 40) / 22, 2));
                        const y = 70 + amplitude * Math.sin(phase * Math.PI / 180);
                        return (
                          <circle key={i} cx={x} cy={y} r="1.5"
                            fill={ACCENT_LIGHT}
                            opacity={0.3 + 0.5 * (1 - Math.abs(i - 40) / 40)}
                          />
                        );
                      })}
                      <text x="250" y="115" textAnchor="middle" fontSize="11" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">
                        Superposition: pure potentiality
                      </text>
                      <text x="250" y="130" textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">
                        No definite position — a field of overlapping possibilities
                      </text>
                      {/* Potentiality bar — full */}
                      <rect x="30" y="16" width="200" height="10" rx="5" fill="rgba(0,0,0,0.4)" stroke={ACCENT + "55"} />
                      <rect x="30" y="16" width="200" height="10" rx="5" fill={ACCENT} />
                      <text x="240" y="25" fontSize="9" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">Potentiality: 100%</text>
                      <rect x="270" y="16" width="200" height="10" rx="5" fill="rgba(0,0,0,0.4)" stroke="#60c06055" />
                      <text x="395" y="25" fontSize="9" fill="#60c060" fontFamily="Georgia, serif">Actuality: ~0%</text>
                    </g>
                  ) : (
                    <g>
                      {/* Collapsed — particle */}
                      <circle cx="250" cy="70" r="14" fill={ACCENT} stroke={ACCENT_LIGHT} strokeWidth="2" filter="url(#glow)" />
                      <text x="250" y="75" textAnchor="middle" fontSize="11" fill="#f0ead8" fontFamily="Georgia, serif">●</text>
                      {/* Shockwaves */}
                      {[20, 36, 52].map((r, i) => (
                        <circle key={i} cx="250" cy="70" r={r} fill="none" stroke={ACCENT_LIGHT}
                          strokeWidth="1" strokeOpacity={0.2 - i * 0.05} />
                      ))}
                      <text x="250" y="108" textAnchor="middle" fontSize="11" fill="#60c060" fontFamily="Georgia, serif">
                        Measurement collapses wave → definite actuality
                      </text>
                      <rect x="30" y="16" width="200" height="10" rx="5" fill="rgba(0,0,0,0.4)" stroke={ACCENT + "55"} />
                      <rect x="30" y="16" width="20" height="10" rx="5" fill={ACCENT} />
                      <text x="240" y="25" fontSize="9" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">Potentiality: ~0%</text>
                      <rect x="270" y="16" width="200" height="10" rx="5" fill="rgba(0,0,0,0.4)" stroke="#60c06055" />
                      <rect x="270" y="16" width="200" height="10" rx="5" fill="#3a8a30" />
                      <text x="480" y="25" fontSize="9" fill="#60c060" fontFamily="Georgia, serif">Actuality: 100%</text>
                    </g>
                  )}
                </svg>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <button
                    onClick={() => setQuantumCollapsed(q => !q)}
                    style={{
                      background: quantumCollapsed ? "#3a8a30" : ACCENT,
                      border: "none",
                      color: "#f0ead8",
                      borderRadius: 20,
                      padding: "8px 20px",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {quantumCollapsed ? "Restore Superposition" : "Measure (Collapse Wave)"}
                  </button>
                </div>
                <div style={{
                  background: ACCENT + "15",
                  border: `1px solid ${ACCENT}44`,
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginTop: 12,
                  maxWidth: 500,
                  margin: "12px auto 0",
                }}>
                  <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.65 }}>
                    {quantumCollapsed
                      ? "Once measured, the system snaps into full actuality. But was its prior state genuine potentiality — or merely our ignorance of an already-actual hidden state?"
                      : "Quantum superposition suggests systems may be genuinely potential before measurement — not just unknown. If so, potentiality may be more fundamental than actuality at the deepest physical level."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(c => (
              <button
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  background: hoveredConcept === c.id ? ACCENT : "transparent",
                  border: `1px solid ${ACCENT}`,
                  color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: "clamp(10px,1.5vw,12px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "background 0.2s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const c = keyConcepts.find(k => k.id === hoveredConcept);
            return c ? (
              <div style={{
                background: ACCENT + "18",
                border: `1px solid ${ACCENT}55`,
                borderRadius: 6,
                padding: "12px 16px",
                marginTop: 4,
              }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{c.label}</div>
                <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.75, margin: "0 0 10px 0" }}>
            Quantum mechanics seems to invert Aristotle's principle that actuality is prior to potentiality: at the quantum level, systems exist as superpositions of potential states that only become actual upon measurement, suggesting potentiality may be more fundamental than actuality at the deepest level of reality.
          </p>
          <p style={{ fontSize: "clamp(11px,1.6vw,13px)", color: ACCENT_LIGHT, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: how does Aristotle's teleology and the concept of the soul extend hylomorphism into biological and psychological explanation?
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(o => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,3vw,20px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT_LIGHT} />
              : <ChevronDown size={16} color={ACCENT_LIGHT} />}
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(14px,3vw,20px) clamp(14px,3vw,20px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {realWorldExamples.map((ex, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{ex.title}</div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>{ex.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 6 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 7: Physics, Motion, and Cosmology ───
function AristotelianPhysicsCosmology() {
  const ACCENT = "#D97706";
  const ACCENT_LIGHT = "#F59E0B";
  const ACCENT_DIM = "#3a2a08";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showRightAnswers, setShowRightAnswers] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAnimFrame(f => (f + 1) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const keyConcepts = [
    { id: "naturalviolent", label: "Natural vs. Violent Motion", desc: "Natural motion is a body's intrinsic tendency to seek its proper place — earth falls, fire rises — requiring no external cause once released. Violent motion is imposed against a body's nature by continuous contact with an external mover: the moment the mover stops touching, violent motion ceases. This distinction was Aristotle's alternative to inertia, and it made intuitive sense until Galileo showed that falling bodies accelerate uniformly regardless of weight." },
    { id: "fiveelements", label: "Five Elements & Natural Places", desc: "Earth, water, air, fire, and quintessence (aether) each have a natural place in a layered cosmos: earth at the center, water surrounding it, air above, fire at the periphery of the sublunary realm, and aether composing the unchanging celestial spheres beyond. A displaced element 'seeks' its natural place — an Aristotelian explanation of gravity and buoyancy that conflates direction with causation." },
    { id: "noinertia", label: "Absence of Inertia", desc: "Aristotle held that every motion requires a continuous mover — if you throw a stone, the air disturbed by the throw must continue pushing the stone after it leaves your hand. Newton's First Law — that bodies in motion stay in motion without any continuing force — directly contradicts this. The absence of the concept of inertia meant Aristotle could not account for projectile motion, planetary orbits, or any uniform rectilinear motion without invoking a sustaining cause." },
    { id: "continuousmover", label: "Continuous Mover Principle", desc: "Aristotle demanded that for every motion there is a mover in continuous contact: omne quod movetur ab alio movetur — everything moved is moved by another. This principle was his solution to the chain of causation, ultimately terminating in the Unmoved Mover. It produced a physics where transmitted force requires physical contact at every moment, which made action at a distance — gravity, magnetism, electromagnetism — literally inconceivable within the system." },
    { id: "sublunarycelestial", label: "Sublunary vs. Celestial Realms", desc: "Below the Moon everything is composed of the four elements, subject to generation and corruption. Above the Moon the heavens are made of quintessence, which moves only in perfect eternal circles and never changes in any other way. This two-realm division was demolished by Galileo's telescopic observations of sunspots and lunar mountains, and by Newton's demonstration that the same gravitational law governs both falling apples and orbiting moons." },
    { id: "novacuum", label: "Rejection of Vacuum", desc: "Aristotle argued that a vacuum is impossible: motion requires a medium to offer resistance, and without resistance motion would be instantaneous — which is absurd. He also argued that a void has no directional properties and thus could not explain natural motion toward places. Torricelli's barometer, Pascal's experiments, and eventually the vacuum of outer space refuted this completely, though Einstein's curved spacetime ironically echoed Aristotle's intuition that space itself has structure." },
  ];

  const objects = [
    { id: "stone", label: "Falling Stone", aristotle: "Earth element seeks its natural place at the center. Falls because its nature demands it. Heavier = more earth = falls faster.", modern: "Gravity accelerates all bodies equally (9.8 m/s²) regardless of mass. Inertia — not nature — is the fundamental property." },
    { id: "flame", label: "Rising Flame", aristotle: "Fire element seeks its natural place at the periphery of the sublunary sphere. Rises naturally, requiring no mover.", modern: "Hot gas is less dense than surrounding air; buoyancy (pressure differential) pushes it upward. No 'natural place' involved." },
    { id: "moon", label: "The Moon", aristotle: "Made of quintessence. Moves in a perfect eternal circle carried by a celestial sphere. Never changes, never corrupts.", modern: "Rocky body orbiting under gravity. Has mountains, craters, and is slowly spiraling away from Earth. Same physics as falling stone." },
    { id: "arrow", label: "Fired Arrow", aristotle: "Violent motion imposed by the bow. Air closed behind the arrow pushes it forward. Stops when disturbed air is exhausted.", modern: "Inertia carries the arrow. Air drag decelerates it. No continued push needed — Newton's First Law." },
  ];

  const selectedObj = objects.find(o => o.id === selectedObject);

  const cx = 130, cy = 130, r = 120;
  const deg = (animFrame * Math.PI) / 180;

  const renderAristotelianCosmos = () => {
    const layers = [
      { r: 118, color: "#6366f1", label: "Quintessence" },
      { r: 90, color: "#f97316", label: "Fire" },
      { r: 68, color: "#93c5fd", label: "Air" },
      { r: 50, color: "#1d4ed8", label: "Water" },
      { r: 32, color: "#78716c", label: "Earth" },
    ];
    const moonAngle = deg;
    const moonX = cx + 90 * Math.cos(moonAngle);
    const moonY = cy + 90 * Math.sin(moonAngle);

    const arrowPath = selectedObject === "arrow"
      ? `M${cx + 20},${cy} L${cx + 75},${cy - 5}`
      : null;

    return (
      <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 300 }}>
        {layers.map((l, i) => (
          <circle key={i} cx={cx} cy={cy} r={l.r} fill={l.color}
            fillOpacity={0.18} stroke={l.color} strokeWidth={1.2} strokeOpacity={0.5} />
        ))}
        {/* Earth */}
        <circle cx={cx} cy={cy} r={18} fill="#57534e" stroke="#78716c" strokeWidth={1.5} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill="#e7e5e4" fontFamily="Georgia, serif">Earth</text>

        {/* Moon orbiting */}
        <circle cx={moonX} cy={moonY} r={8}
          fill={selectedObject === "moon" ? "#c4b5fd" : "#d1d5db"}
          stroke={selectedObject === "moon" ? ACCENT_LIGHT : "#9ca3af"}
          strokeWidth={selectedObject === "moon" ? 2 : 1} />

        {/* Quintessence sphere ring */}
        <circle cx={cx} cy={cy} r={108} fill="none" stroke="#6366f1" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.4} />

        {/* Natural motion arrows */}
        {/* Stone falls */}
        {selectedObject === "stone" && (
          <g>
            <circle cx={cx + 50} cy={cy - 60} r={6} fill="#78716c" stroke={ACCENT} strokeWidth={2} />
            <line x1={cx + 50} y1={cy - 54} x2={cx + 50} y2={cy - 28} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <text x={cx + 62} y={cy - 55} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">seeks center</text>
          </g>
        )}
        {selectedObject === "flame" && (
          <g>
            <ellipse cx={cx - 50} cy={cy + 40} rx={6} ry={10} fill="#f97316" fillOpacity={0.9} stroke={ACCENT} strokeWidth={1.5} />
            <line x1={cx - 50} y1={cy + 30} x2={cx - 50} y2={cy + 5} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <text x={cx - 80} y={cy + 20} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">seeks periphery</text>
          </g>
        )}
        {selectedObject === "arrow" && (
          <g>
            <line x1={cx + 10} y1={cy} x2={cx + 80} y2={cy - 10} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <circle cx={cx + 80} cy={cy - 10} r={4} fill="#a8a29e" stroke={ACCENT} strokeWidth={1.5} />
            <text x={cx + 30} y={cy - 16} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">air pushes</text>
          </g>
        )}
        {selectedObject === "moon" && (
          <g>
            <circle cx={moonX} cy={moonY} r={8} fill="none" stroke={ACCENT_LIGHT} strokeWidth={2} strokeDasharray="3 2" />
            <text x={cx} y={cy + 105} textAnchor="middle" fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">perfect circle, eternal</text>
          </g>
        )}

        {/* Right-answers highlight */}
        {showRightAnswers && (
          <g>
            <circle cx={cx} cy={cy} r={115} fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="6 4" strokeOpacity={0.7} />
            <text x={cx} y={18} textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="Georgia, serif">Space has structure ✓</text>
          </g>
        )}

        <defs>
          <marker id="arrow-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ACCENT_LIGHT} />
          </marker>
        </defs>

        <text x={cx} y={250} textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">Aristotle's Cosmos</text>
        <text x={cx} y={10} textAnchor="middle" fontSize="8" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif" fontStyle="italic">geocentric · layered elements</text>
      </svg>
    );
  };

  const renderModernCosmos = () => {
    const sunX = 130, sunY = 130;
    const planetData = [
      { name: "Mercury", orbitR: 30, size: 3, color: "#a8a29e", speed: 4.1 },
      { name: "Venus", orbitR: 48, size: 5, color: "#fde68a", speed: 1.6 },
      { name: "Earth", orbitR: 68, size: 6, color: "#3b82f6", speed: 1.0 },
      { name: "Mars", orbitR: 90, size: 4, color: "#ef4444", speed: 0.53 },
    ];

    return (
      <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 300 }}>
        {/* Sun */}
        <circle cx={sunX} cy={sunY} r={16} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
        <circle cx={sunX} cy={sunY} r={22} fill="none" stroke="#fbbf24" strokeWidth={1} strokeOpacity={0.3} />
        <text x={sunX} y={sunY + 4} textAnchor="middle" fontSize="8" fill="#292524" fontFamily="Georgia, serif" fontWeight="bold">Sun</text>

        {planetData.map((p, i) => {
          const angle = deg * p.speed + i * 1.2;
          const px = sunX + p.orbitR * Math.cos(angle);
          const py = sunY + p.orbitR * Math.sin(angle);

          const isEarth = p.name === "Earth";
          const moonAngle2 = deg * 3 + i;
          const moonX2 = px + 13 * Math.cos(moonAngle2);
          const moonY2 = py + 13 * Math.sin(moonAngle2);

          const highlightMoon = selectedObject === "moon" && isEarth;
          const highlightEarth = selectedObject === "stone" && isEarth;

          return (
            <g key={p.name}>
              <ellipse cx={sunX} cy={sunY} rx={p.orbitR} ry={p.orbitR * 0.92}
                fill="none" stroke="#374151" strokeWidth={0.8} strokeDasharray="3 3" />
              <circle cx={px} cy={py} r={p.size}
                fill={p.color}
                stroke={highlightEarth ? ACCENT_LIGHT : "#fff"}
                strokeWidth={highlightEarth ? 2 : 0.5} />

              {/* Gravity vector toward sun */}
              {(selectedObject === "stone" && isEarth) && (
                <line x1={px} y1={py} x2={sunX + (px - sunX) * 0.3} y2={sunY + (py - sunY) * 0.3}
                  stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" strokeOpacity={0.8} />
              )}

              {isEarth && (
                <g>
                  <circle cx={sunX} cy={sunY} r={p.orbitR + 14}
                    fill="none" stroke="#374151" strokeWidth={0.5} strokeDasharray="2 3" />
                  <circle cx={moonX2} cy={moonY2} r={3}
                    fill={highlightMoon ? "#c4b5fd" : "#9ca3af"}
                    stroke={highlightMoon ? ACCENT_LIGHT : "#6b7280"}
                    strokeWidth={highlightMoon ? 2 : 0.5} />
                  {highlightMoon && (
                    <line x1={moonX2} y1={moonY2} x2={px + (moonX2 - px) * 0.2} y2={py + (moonY2 - py) * 0.2}
                      stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" strokeOpacity={0.8} />
                  )}
                </g>
              )}

              {selectedObject === "flame" && isEarth && (
                <g>
                  <ellipse cx={px + 8} cy={py - 8} rx={4} ry={7} fill="#f97316" fillOpacity={0.8} />
                  <text x={px + 18} y={py - 12} fontSize="7" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">buoyancy</text>
                </g>
              )}

              {selectedObject === "arrow" && isEarth && (
                <g>
                  <line x1={px - 12} y1={py} x2={px + 12} y2={py - 5}
                    stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" />
                  <text x={px - 10} y={py - 10} fontSize="7" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">inertia</text>
                </g>
              )}
            </g>
          );
        })}

        {showRightAnswers && (
          <g>
            <text x={sunX} y={22} textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="Georgia, serif">Curved spacetime ≈ Aristotle's structured space ✓</text>
            <circle cx={sunX} cy={sunY} r={115} fill="none" stroke="#10b981" strokeWidth={1.5} strokeDasharray="5 3" strokeOpacity={0.5} />
          </g>
        )}

        <defs>
          <marker id="arrow-m" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ACCENT_LIGHT} />
          </marker>
        </defs>

        <text x={sunX} y={250} textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">Modern Cosmos</text>
        <text x={sunX} y={10} textAnchor="middle" fontSize="8" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif" fontStyle="italic">heliocentric · gravity · inertia</text>
      </svg>
    );
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3a1a02 0%, #1a0e00 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: "#e7e5e4"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 7 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Physics, Motion, and Cosmology
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle's comprehensive physics of natural and violent motion, natural places, and a geocentric finite cosmos was spectacularly wrong yet asked all the right questions.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 3vw, 22px)",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
            Aristotle's form-matter and potentiality-actuality framework needed a physical theory to explain how actual movers actualize potentials in the material world — a metaphysics of change required a corresponding physics of motion. The grand categories of hylomorphism demanded to know: what actually moves what, by what mechanism, according to what laws? Without a physics, metaphysics floated free of the world it claimed to explain.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 10,
          padding: "clamp(14px, 3vw, 26px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Two Cosmos, One Object — Interactive Comparison
          </div>

          {/* Object selector */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {objects.map(obj => (
              <button key={obj.id}
                onClick={() => setSelectedObject(selectedObject === obj.id ? null : obj.id)}
                style={{
                  background: selectedObject === obj.id ? ACCENT : "rgba(0,0,0,0.3)",
                  border: `1px solid ${selectedObject === obj.id ? ACCENT_LIGHT : ACCENT + "55"}`,
                  borderRadius: 20,
                  color: selectedObject === obj.id ? "#fff" : SUBTITLE_COLOR,
                  padding: "6px 14px",
                  fontSize: "clamp(11px,1.6vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}>
                {obj.label}
              </button>
            ))}
            <button
              onClick={() => setShowRightAnswers(r => !r)}
              style={{
                background: showRightAnswers ? "#065f46" : "rgba(0,0,0,0.3)",
                border: `1px solid ${showRightAnswers ? "#10b981" : "#374151"}`,
                borderRadius: 20,
                color: showRightAnswers ? "#6ee7b7" : SUBTITLE_COLOR,
                padding: "6px 14px",
                fontSize: "clamp(11px,1.6vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s"
              }}>
              Where Aristotle Was Right ✓
            </button>
          </div>

          {/* Side by side cosmos */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 200px", minWidth: 180, maxWidth: 320 }}>
              {renderAristotelianCosmos()}
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
              <div style={{ color: ACCENT, fontSize: 20, fontWeight: "bold" }}>vs.</div>
            </div>
            <div style={{ flex: "1 1 200px", minWidth: 180, maxWidth: 320 }}>
              {renderModernCosmos()}
            </div>
          </div>

          {/* Explanation panel */}
          {selectedObj && (
            <div style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 12
            }}>
              <div style={{
                flex: "1 1 180px",
                background: "rgba(217,119,6,0.08)",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 16px"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  Aristotle on {selectedObj.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                  {selectedObj.aristotle}
                </p>
              </div>
              <div style={{
                flex: "1 1 180px",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid #3b82f644",
                borderRadius: 8,
                padding: "14px 16px"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#60a5fa", marginBottom: 8 }}>
                  Modern Physics on {selectedObj.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                  {selectedObj.modern}
                </p>
              </div>
            </div>
          )}

          {showRightAnswers && (
            <div style={{
              marginTop: 16,
              background: "rgba(6,78,59,0.2)",
              border: "1px solid #10b98155",
              borderRadius: 8,
              padding: "14px 16px"
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#10b981", marginBottom: 8 }}>
                Where Aristotle Was Right
              </div>
              <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                Einstein's curved spacetime vindicates Aristotle's intuition that space itself has properties — it is not a neutral void but a structured medium that shapes motion. Aristotle was also right that different domains of reality may require different explanatory principles (sublunary vs. celestial), even if he drew the boundary wrongly. His insistence that physics must account for all four kinds of change — place, quality, quantity, substance — anticipated a truly general physical theory.
              </p>
            </div>
          )}

          {!selectedObj && !showRightAnswers && (
            <p style={{ textAlign: "center", fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, marginTop: 14, fontStyle: "italic" }}>
              Click an object above to animate both cosmologies simultaneously, or toggle "Where Aristotle Was Right."
            </p>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => (
              <button key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT_LIGHT : ACCENT + "66"}`,
                  borderRadius: 20,
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  padding: "6px 14px",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}>
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(k => k.id === hoveredConcept);
            return kc ? (
              <div style={{
                background: `${ACCENT}11`,
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 18px"
              }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>
                  {kc.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
                  {kc.desc}
                </p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 3vw, 22px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
            Reliance on unaided phenomenological observation without controlled experiments or mathematics produced a physics that was internally consistent but fundamentally wrong about falling bodies, inertia, planetary orbits, and the structure of the cosmos. Galileo showed that objects fall at the same rate regardless of weight — directly contradicting Aristotle. Kepler showed orbits are ellipses, not circles. Newton unified sublunary and celestial physics under a single law. The system's very coherence made it dangerous: it gave philosophical authority to observable illusions, lending scholarly prestige to errors for nearly two millennia. This pressure forces the next development — the question of how Aristotle's teleological biology and psychology tried to operate on better observational ground than his physics.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => setEchoesOpen(o => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: `1px solid ${ACCENT}33`,
              borderRadius: echoesOpen ? "8px 8px 0 0" : 8,
              padding: "14px 18px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={16} color={ACCENT} /> : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{
              background: "rgba(0,0,0,0.25)",
              border: `1px solid ${ACCENT}33`,
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: "clamp(14px, 3vw, 22px)"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Galileo's Inclined Plane Experiments", body: "By rolling balls down inclined planes and timing them with water clocks, Galileo proved that all bodies fall with equal acceleration regardless of mass — directly refuting Aristotle's claim that heavier earth-laden objects fall faster. The experiment required a controlled setup precisely because common observation seemed to confirm Aristotle: air resistance does make heavy objects fall faster in practice. Controlled experiment was the methodological revolution." },
                  { title: "Kepler's Elliptical Orbits", body: "Kepler's three laws of planetary motion, derived from Tycho Brahe's precise observational data, showed that planets move in ellipses with varying speed — utterly impossible within Aristotle's framework of perfect circular motion at constant speed. The quintessence of celestial spheres was replaced by mathematical curves describable by equations, demolishing the sublunary/celestial divide." },
                  { title: "Newton's Universal Gravitation", body: "Newton's inverse-square law of gravitation applied identically to a falling apple and the orbiting Moon, proving that Aristotle's two realms — sublunary and celestial — operate under a single set of physical laws. The Principia Mathematica of 1687 was the definitive refutation of Aristotelian cosmology, replacing natural places and quintessence with force, mass, and acceleration." },
                  { title: "Einstein's Curved Spacetime", body: "General relativity describes gravity not as a force but as the curvature of spacetime — space itself has properties that direct the motion of objects. In an ironic vindication, Aristotle was right that space is not a neutral void. He was wrong about what those properties are and how they work, but his rejection of a featureless vacuum as physically incoherent anticipated that spacetime geometry is a physical entity with causal power." },
                ].map((card, i) => (
                  <div key={i} style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    borderRadius: "0 6px 6px 0",
                    background: `${ACCENT}0a`,
                    padding: "14px 18px"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                      {card.title}
                    </div>
                    <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 7 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 8: Biology and the Science of Life ───
function AristotleBiology() {
  const ACCENT = "#059669";
  const ACCENT_LIGHT = "#34d399";
  const ACCENT_DIM = "#052e1c";
  const TITLE_COLOR = "#e8f5f0";
  const SUBTITLE_COLOR = "#a7c4b8";

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [hoveredAnimal, setHoveredAnimal] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [teleologyMode, setTeleologyMode] = useState("aristotle");
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);

  const animals = [
    {
      id: "dolphin",
      name: "Dolphin",
      icon: "🐬",
      x: 18, y: 30,
      aristotle: {
        desc: "Aristotle noted that dolphins breathe air, nurse their young with milk, have warm blood, and give live birth — placing them firmly outside the fish category despite living in the sea.",
        classification: "Warm-blooded, live-bearing, air-breathing — not a fish",
        status: "correct"
      },
      modern: {
        desc: "Modern taxonomy classifies dolphins as cetacean mammals (Delphinidae), descended from terrestrial artiodactyls. Aristotle's intuition preceded formal mammalian systematics by two millennia.",
        classification: "Order Cetacea, Class Mammalia",
        confirmed: true
      }
    },
    {
      id: "shark",
      name: "Shark",
      icon: "🦈",
      x: 62, y: 22,
      aristotle: {
        desc: "Aristotle described what is now called placental viviparity in certain sharks (particularly the smooth dogfish), observing a yolk-sac placenta connecting embryo to mother — a claim so remarkable it was doubted for centuries.",
        classification: "Selachian (cartilaginous), viviparous with placental connection",
        status: "correct"
      },
      modern: {
        desc: "19th century zoologists confirmed the placental connection in Mustelus laevis. The placenta of chondrichthyans is structurally analogous to mammalian placentas. Aristotle's observation was vindicated after 2,000 years.",
        classification: "Class Chondrichthyes; some species: Order Carcharhiniformes",
        confirmed: true
      }
    },
    {
      id: "octopus",
      name: "Octopus",
      icon: "🐙",
      x: 40, y: 55,
      aristotle: {
        desc: "Aristotle described octopus mating in detail, noting the use of the hectocotylus arm for reproduction — though he misunderstood the precise mechanism. He also correctly described their ink, suction cups, and color-changing.",
        classification: "Soft-bodied (malakion), cephalopod — no skeleton",
        status: "partial"
      },
      modern: {
        desc: "Aristotle's cephalopod grouping is taxonomically sound. His description of the hectocotylus prefigured 19th century discoveries by Cuvier. Most behavioral and anatomical observations were accurate.",
        classification: "Class Cephalopoda, Order Octopoda",
        confirmed: true
      }
    },
    {
      id: "chick",
      name: "Chick Embryo",
      icon: "🐣",
      x: 75, y: 55,
      aristotle: {
        desc: "Aristotle opened eggs daily over the course of incubation and described the progressive development of the heart, blood vessels, and organs — arguing that form emerges gradually from undifferentiated matter (epigenesis), not from a miniature pre-formed creature.",
        classification: "Oviparous, warm-blooded; epigenetic development",
        status: "correct"
      },
      modern: {
        desc: "Aristotle's epigenesis concept was vindicated against preformationism in the 18th–19th centuries. His sequential organ emergence description remarkably anticipates Hamburger–Hamilton staging. The heart appearing first aligns with modern developmental biology.",
        classification: "Class Aves; embryogenesis via regulatory gene networks",
        confirmed: true
      }
    },
    {
      id: "ruminant",
      name: "Ruminant",
      icon: "🐄",
      x: 28, y: 72,
      aristotle: {
        desc: "Aristotle described the multiple stomach chambers of ruminants (cattle, sheep) and connected this anatomical complexity to their dietary function — digesting tough plant material. He saw this as a clear example of organs serving purposes.",
        classification: "Many-stomached, hornless or horned, plant-eating",
        status: "correct"
      },
      modern: {
        desc: "The four-chambered stomach (rumen, reticulum, omasum, abomasum) of ruminants is well-characterized. Aristotle's functional description was essentially correct, though he lacked knowledge of microbial fermentation.",
        classification: "Infraorder Pecora, family-dependent; foregut fermenters",
        confirmed: true
      }
    }
  ];

  const keyConcepts = [
    {
      id: "scala",
      label: "Scala Naturae",
      desc: "The 'ladder of nature' — Aristotle's hierarchical ordering of living things by their soul capacities: nutritive (plants), sensitive (animals), and rational (humans). This was not an evolutionary tree but a static hierarchy of complexity. It organized the natural world conceptually for the first time and influenced biology through Linnaeus and beyond."
    },
    {
      id: "teleology",
      label: "Teleological Biology",
      desc: "Aristotle explained biological features by asking what function they serve — 'the eye is for seeing.' This final-cause reasoning treated organisms as organized wholes where every part contributes to the creature's characteristic activity. Darwin showed how natural selection produces the appearance of purpose without conscious design, but functional language remains indispensable in modern biology."
    },
    {
      id: "epigenesis",
      label: "Epigenesis",
      desc: "Aristotle's doctrine that an organism develops progressively from undifferentiated material — the embryo is not a miniature preformed adult. This was correct and was vindicated against preformationism in the 18th century. Modern developmental genetics, with gene regulatory networks switching on sequentially, is the mechanistic realization of epigenetic development."
    },
    {
      id: "homology",
      label: "Homology",
      desc: "Aristotle noticed that disparate animals share structurally similar parts in different forms — what we now call homologous structures. He observed that the bones of human arms, horse forelegs, and bird wings correspond. Darwin interpreted this as evidence of common descent; Aristotle saw it as formal similarity across nature's hierarchy."
    },
    {
      id: "classification",
      label: "Natural Classification",
      desc: "Aristotle developed the first systematic taxonomy using multiple anatomical criteria rather than single features. He distinguished fish, birds, cetaceans, insects, and mollusks with remarkable accuracy. His insistence on using 'essential' features — those tied to function and form — anticipates phylogenetic systematics."
    },
    {
      id: "spontaneous",
      label: "Spontaneous Generation Error",
      desc: "Aristotle believed that simpler animals — eels, insects, shellfish — could arise spontaneously from mud, dew, or rotting matter. This was his most significant biological error, finally refuted by Pasteur in 1859. It stemmed from his scala naturae: if plants arise from seeds, the lowest animals might arise from inorganic matter directly."
    }
  ];

  const teleologyData = {
    organ: "The vertebrate eye",
    aristotle: {
      label: "Aristotelian Final Cause",
      explanation: "The eye exists for the sake of seeing. Its structure — lens, iris, retina — is intelligible only in terms of the end it serves: providing the animal with visual perception of its environment. The final cause (vision) explains why the parts are organized exactly as they are. Remove the function and the arrangement becomes arbitrary.",
      structure: ["Final cause: vision", "Material cause: transparent humor, tissue", "Formal cause: sphere with focusing apparatus", "Efficient cause: developmental process"],
      color: "#7c3aed"
    },
    darwin: {
      label: "Darwinian Selected Effect",
      explanation: "The eye has the structure it has because ancestral organisms with slightly better light-detection survived and reproduced more than those without. Natural selection accumulated small improvements over millions of generations. The 'purpose' of the eye is not a real goal but a post-hoc description of what the selected trait does. Function language describes selection history, not genuine teleology.",
      structure: ["Selected effect: increased survival via detection", "Mechanism: cumulative natural selection", "History: from photoreceptor patch to complex eye", "Teleology: apparent, not intrinsic"],
      color: "#059669"
    }
  };

  const echoes = [
    {
      title: "Dolphins and Whales: Classification Vindicated",
      body: "Aristotle's insistence that cetaceans were not fish but warm-blooded, air-breathing, milk-giving creatures was largely ignored by medieval naturalists who returned them to the fish category. It took Linnaeus in 1758, working from similar observational criteria, to formally restore Aristotle's original correct classification. The observation that physiological function determines natural kind membership proved more durable than superficial ecological resemblance."
    },
    {
      title: "Shark Placenta: A 2,000-Year Vindication",
      body: "Aristotle's description of placental viviparity in the dogfish shark was dismissed as error for centuries because it seemed too mammalian for a fish. In 1842, zoologist Johannes Müller confirmed the placental connection in Mustelus laevis, exactly as Aristotle had described. This remains one of the most striking cases of ancient empirical observation being dismissed and then confirmed by modern science."
    },
    {
      title: "Developmental Biology and Genetic Regulatory Networks",
      body: "Aristotle's concept of epigenesis — progressive differentiation from an undifferentiated start — maps remarkably onto modern developmental genetics. The sequential activation of Hox genes and regulatory cascades during embryogenesis is essentially the mechanistic account of what Aristotle called formal causation in development. His question 'what guides the developmental process toward the mature form?' now has a molecular answer."
    },
    {
      title: "Karen Neander and Naturalized Teleology",
      body: "Philosopher Karen Neander's 'selected effects' theory of biological function attempts to preserve functional language within a Darwinian framework: the heart's function is to pump blood because that is what selection selected it for. This directly echoes the Aristotelian–Darwinian tension: Aristotle thought function was irreducible; Darwin seemed to eliminate it; Neander argues functional explanation is naturalizable but not eliminable — the deepest question Aristotle's biology poses to modern philosophy of science."
    }
  ];

  const getStatusColor = (status, confirmed) => {
    if (status === "correct" && confirmed) return "#34d399";
    if (status === "partial") return "#fbbf24";
    return "#f87171";
  };

  const getStatusLabel = (status, confirmed) => {
    if (status === "correct" && confirmed) return "✓ Confirmed Correct";
    if (status === "partial") return "~ Partially Correct";
    return "✗ Incorrect";
  };

  const selectedAnimalData = selectedAnimal ? animals.find(a => a.id === selectedAnimal) : null;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 20%, #052e1c 0%, #0a0f0c 60%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: "#d4e8df"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 8 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Biology and the Science of Life
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle's greatest empirical success was systematic biology, where observational accuracy and functional framework anticipated discoveries confirmed millennia later.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(5,150,105,0.07)",
          border: "1px solid " + ACCENT + "44",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
            The four-causes framework promised that final causes — purposes and functions — were essential to complete explanation, but it needed empirical grounding. What are the actual functions of actual biological structures in actual organisms? Without concrete observation, teleology remained abstract metaphysics rather than science.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>
            Aristotle's Zoological Investigations
          </div>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 20px 0", lineHeight: 1.6 }}>
            Click any animal Aristotle studied to compare his original description with modern taxonomy.
          </p>

          {/* Animal selection grid */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
            justifyContent: "center"
          }}>
            {animals.map(animal => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(selectedAnimal === animal.id ? null : animal.id)}
                onMouseEnter={() => setHoveredAnimal(animal.id)}
                onMouseLeave={() => setHoveredAnimal(null)}
                style={{
                  background: selectedAnimal === animal.id
                    ? ACCENT + "33"
                    : hoveredAnimal === animal.id
                    ? "rgba(5,150,105,0.12)"
                    : "rgba(0,0,0,0.3)",
                  border: selectedAnimal === animal.id
                    ? "2px solid " + ACCENT
                    : "1px solid " + ACCENT + "44",
                  borderRadius: 8,
                  padding: "10px 16px",
                  cursor: "pointer",
                  color: selectedAnimal === animal.id ? ACCENT_LIGHT : "#c8ddd6",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px,1.6vw,14px)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <span style={{ fontSize: "clamp(16px,2.5vw,20px)" }}>{animal.icon}</span>
                <span>{animal.name}</span>
              </button>
            ))}
          </div>

          {/* Animal detail panel */}
          {selectedAnimalData ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}>
              <div style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap"
              }}>
                {/* Aristotle panel */}
                <div style={{
                  flex: "1 1 280px",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid #7c3aed44",
                  borderRadius: 8,
                  padding: "clamp(12px,2vw,18px)"
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>
                    Aristotle's Description (~350 BCE)
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#d4c8f0", lineHeight: 1.75, margin: "0 0 12px 0" }}>
                    {selectedAnimalData.aristotle.desc}
                  </p>
                  <div style={{
                    background: "rgba(124,58,237,0.12)",
                    borderRadius: 6,
                    padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 4 }}>
                      Classification
                    </div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#c4b8e8", fontStyle: "italic" }}>
                      {selectedAnimalData.aristotle.classification}
                    </div>
                  </div>
                </div>

                {/* Modern science panel */}
                <div style={{
                  flex: "1 1 280px",
                  background: "rgba(5,150,105,0.08)",
                  border: "1px solid " + ACCENT + "44",
                  borderRadius: 8,
                  padding: "clamp(12px,2vw,18px)"
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
                    Modern Science's Verdict
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c8ddd6", lineHeight: 1.75, margin: "0 0 12px 0" }}>
                    {selectedAnimalData.modern.desc}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap"
                  }}>
                    <div style={{
                      background: getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed) + "22",
                      border: "1px solid " + getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed) + "66",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: "clamp(11px,1.5vw,12px)",
                      color: getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed),
                      fontWeight: "bold"
                    }}>
                      {getStatusLabel(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed)}
                    </div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, fontStyle: "italic" }}>
                      {selectedAnimalData.modern.classification}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "24px",
              color: SUBTITLE_COLOR,
              fontSize: "clamp(12px,1.6vw,14px)",
              fontStyle: "italic"
            }}>
              Select an animal above to see Aristotle's observations compared with modern science
            </div>
          )}

          {/* Teleology Module */}
          <div style={{
            marginTop: 24,
            background: "rgba(0,0,0,0.25)",
            border: "1px solid " + ACCENT + "33",
            borderRadius: 8,
            padding: "clamp(14px,2.5vw,20px)"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>
              Teleology Module
            </div>
            <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
              Toggle between explanatory frameworks for <em>{teleologyData.organ}</em>:
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setTeleologyMode("aristotle")}
                style={{
                  background: teleologyMode === "aristotle" ? "#7c3aed33" : "transparent",
                  border: teleologyMode === "aristotle" ? "2px solid #7c3aed" : "1px solid #7c3aed44",
                  borderRadius: 6,
                  padding: "7px 14px",
                  color: teleologyMode === "aristotle" ? "#a78bfa" : "#8b7ab8",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer"
                }}
              >
                Aristotelian Final Cause
              </button>
              <button
                onClick={() => setTeleologyMode("darwin")}
                style={{
                  background: teleologyMode === "darwin" ? ACCENT + "33" : "transparent",
                  border: teleologyMode === "darwin" ? "2px solid " + ACCENT : "1px solid " + ACCENT + "44",
                  borderRadius: 6,
                  padding: "7px 14px",
                  color: teleologyMode === "darwin" ? ACCENT_LIGHT : SUBTITLE_COLOR,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer"
                }}
              >
                Darwinian Selected Effect
              </button>
            </div>

            {teleologyMode === "aristotle" ? (
              <div style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid #7c3aed44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>
                  Aristotelian Final Cause
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#d4c8f0", lineHeight: 1.75, margin: "0 0 14px 0" }}>
                  {teleologyData.aristotle.explanation}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {teleologyData.aristotle.structure.map((s, i) => (
                    <div key={i} style={{
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid #7c3aed44",
                      borderRadius: 4,
                      padding: "4px 10px",
                      fontSize: "clamp(10px,1.4vw,12px)",
                      color: "#c4b8e8"
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                background: "rgba(5,150,105,0.08)",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
                  Darwinian Selected Effect
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c8ddd6", lineHeight: 1.75, margin: "0 0 14px 0" }}>
                  {teleologyData.darwin.explanation}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {teleologyData.darwin.structure.map((s, i) => (
                    <div key={i} style={{
                      background: ACCENT + "15",
                      border: "1px solid " + ACCENT + "44",
                      borderRadius: 4,
                      padding: "4px 10px",
                      fontSize: "clamp(10px,1.4vw,12px)",
                      color: "#9ec8b8"
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
            <p style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, margin: "12px 0 0 0", fontStyle: "italic", lineHeight: 1.6 }}>
              Notice: both frameworks preserve functional language — what changes is whether that function is intrinsic to the organism's nature or a record of selection history.
            </p>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: "1px solid " + ACCENT + (hoveredConcept === kc.id ? "" : "77"),
                  borderRadius: 20,
                  padding: "5px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const concept = keyConcepts.find(k => k.id === hoveredConcept);
            return concept ? (
              <div style={{
                marginTop: 10,
                background: ACCENT + "12",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  {concept.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
                  {concept.desc}
                </p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(5,150,105,0.05)",
          border: "1px solid " + ACCENT + "33",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
            Aristotle's teleological biology assumed fixed species with eternal essences — the shark is essentially a shark, the dolphin essentially a dolphin, each with a permanent natural kind. Darwin's evolutionary theory demolished this assumption: species are mutable, essences are fictions, and natural selection explains the appearance of purposive design without any actual purpose. The question left open is whether genuine teleology survives in biology or has been fully naturalized away — whether functions are real features of organisms or merely convenient descriptions of selection histories. This pressure forces the next development: the confrontation between Aristotelian essentialism and modern evolutionary theory.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />
            }
          </button>
          {echosOpen && (
            <div style={{ padding: "0 clamp(14px,2.5vw,20px) clamp(14px,2.5vw,20px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {echoes.map((echo, i) => (
                  <div key={i} style={{
                    borderLeft: "3px solid " + ACCENT,
                    borderRadius: "0 6px 6px 0",
                    background: ACCENT + "0a",
                    padding: "14px 18px"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                      {echo.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 8 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 9: The Soul, Mind, and Human Nature ───
function SoulMindHumanNature() {
  const ACCENT = "#6366F1";
  const ACCENT_LIGHT = "#a5b4fc";
  const ACCENT_DIM = "#1e1f3a";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [selectedInterp, setSelectedInterp] = useState("averroes");
  const [pulse, setPulse] = useState(0);
  const [senseHighlight, setSenseHighlight] = useState(null);
  const animRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      setPulse(Math.sin(frame * 0.04) * 0.5 + 0.5);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const layers = [
    {
      id: "nutritive",
      label: "Nutritive Soul",
      color: "#22c55e",
      darkColor: "#14532d",
      radius: 110,
      description: "The most basic form of soul, shared by all living things including plants. It governs nutrition, growth, and reproduction — the capacity to take in nourishment and sustain organic life through time.",
      modern: "Modern Equivalent: Metabolic regulation, homeostasis, growth signaling — the biochemical machinery that maintains the boundary between living and non-living matter.",
      aristotle: "\"The soul is the first actuality of a natural body that is potentially alive.\" — De Anima II.1"
    },
    {
      id: "sensitive",
      label: "Sensitive Soul",
      color: "#3b82f6",
      darkColor: "#1e3a5f",
      radius: 150,
      description: "Added in animals above plants, the sensitive soul encompasses perception through the five senses, desire (orexis), pleasure and pain, and locomotion. Perception is receiving the form of an object without its matter.",
      modern: "Modern Equivalent: Sensory processing, affective neuroscience, motor control — the distributed neural systems mediating perception-action cycles and motivated behavior.",
      aristotle: "\"Perceiving is a kind of being affected and moved... the perceiving faculty receives the sensible form without the matter.\" — De Anima II.12"
    },
    {
      id: "rational",
      label: "Rational Soul",
      color: "#f59e0b",
      darkColor: "#451a03",
      radius: 190,
      description: "Unique to humans, rational soul adds the capacity for thought (nous), deliberation, and rational desire. It operates on universals and can reflect on its own activity. The 'active intellect' within it is described as separable and immortal.",
      modern: "Modern Equivalent: Executive function, abstract reasoning, language — prefrontal cortex systems enabling counterfactual thinking, planning, and symbolic representation.",
      aristotle: "\"The intellect is separable, impassive, unmixed, being in its essence actuality... it alone is immortal and eternal.\" — De Anima III.5"
    }
  ];

  const senseOrgans = [
    { id: "eye", label: "Sight", x: 155, y: 95, sense: "Sight (visus): Form without matter — the eye receives the visible form of color without the colored stuff itself." },
    { id: "ear", label: "Hearing", x: 172, y: 108, sense: "Hearing (auditus): Sound as the movement of air, perceived through the medium of the inner ear's moisture." },
    { id: "nose", label: "Smell", x: 163, y: 122, sense: "Smell (olfactus): Requires a medium; the nose detects the form of odorous quality without physical contact." },
    { id: "mouth", label: "Taste", x: 163, y: 135, sense: "Taste (gustus): Direct contact with the object; the tongue detects savory qualities dissolved in moisture." },
    { id: "skin", label: "Touch", x: 163, y: 200, sense: "Touch (tactus): The primary sense, seated throughout the flesh; without it no animal can survive." },
  ];

  const interpretations = {
    averroes: {
      name: "Averroes (Ibn Rushd)",
      century: "12th c. CE",
      claim: "The active intellect is a single, separate, universal substance shared by all humans — not an individual faculty. Personal immortality is impossible; only collective intellect is eternal.",
      implication: "This 'monopsychism' threatened Christian doctrine: if intellect is shared, individual souls cannot survive death, undermining personal salvation and judgment.",
      color: "#f59e0b"
    },
    aquinas: {
      name: "Thomas Aquinas",
      century: "13th c. CE",
      claim: "Each human soul has its own active intellect. Soul is the form of the body, but as an intellectual form it can subsist separately from the body — enabling personal immortality compatible with Christian resurrection.",
      implication: "Aquinas synthesized Aristotle with Christianity by making the individual rational soul both hylomorphically united to the body AND capable of separate subsistence after death.",
      color: "#6366F1"
    },
    alexander: {
      name: "Alexander of Aphrodisias",
      century: "2nd c. CE",
      claim: "The active intellect is simply the natural, material disposition of the human brain/body at its highest development — fully mortal and physical. No part of intellect separates from the body.",
      implication: "This physicalist reading makes Aristotle a thoroughgoing materialist: mind entirely depends on body, no immortality of any kind, anticipating modern neuroscientific eliminativism.",
      color: "#22c55e"
    }
  };

  const keyConcepts = [
    { id: "psyche", label: "Psyche as Form", desc: "For Aristotle, psyche does not mean 'ghost in the machine' but the organizing principle that makes a body alive and functional. Just as the shape of an axe is what makes it an axe, the soul is what makes a living body living — inseparable from it in the same way." },
    { id: "hylomorphic", label: "Hylomorphic Psychology", desc: "Applying the matter-form distinction to mind: the body is the matter, the soul is the form. Mental states are neither purely physical (mere matter) nor purely spiritual (pure form without matter) — they are matter organized in life-enabling ways, avoiding both Descartes and crude reductionism." },
    { id: "hierarchy", label: "Soul Hierarchy", desc: "The three souls form a nested hierarchy: nutritive soul is necessary for all life, sensitive soul requires and builds upon nutritive, rational soul requires and builds upon sensitive. Plants have one, animals two, humans all three — a proto-evolutionary scale of psychic complexity." },
    { id: "active", label: "Active Intellect", desc: "The most obscure passage in Aristotle: a brief description of an intellect that 'makes all things' (as light makes colors visible) versus one that 'becomes all things.' This 'active intellect' is called separable, immortal, and eternal — generating 2,000 years of conflicting interpretation." },
    { id: "koine", label: "Common Sense", desc: "Koinē aisthēsis is the integrating faculty that unifies inputs from the five senses into a single coherent perception. It also allows awareness of time, motion, and the fact that one is perceiving — a proto-theory of the 'binding problem' in consciousness research." },
    { id: "functionalism", label: "Functionalism", desc: "Aristotle's claim that soul is form means mental states are defined by what they do — their causal-functional role — not what they are made of. Hilary Putnam explicitly named this as neo-Aristotelian: minds could be realized in silicon or neurons alike, but why those functions feel like something remains unanswered." }
  ];

  const activeLayer = selectedLayer ? layers.find(l => l.id === selectedLayer) : null;
  const activeInterp = interpretations[selectedInterp];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #1a1a3e 0%, #0a0a1a 70%, #050508 100%)",
      minHeight: "100vh",
      padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 9 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            The Soul, Mind, and Human Nature
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle's naturalistic account of soul as the form of a living body bridges his metaphysics and biology while raising the hard problem of consciousness.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8c0b8", lineHeight: 1.7, margin: 0 }}>
            Aristotle's biology successfully explained the functions of organs and organisms, but living things think, perceive, desire, and feel — requiring an account of mind that connects to, but is not reducible to, mere biological organization.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
            The Three Souls — Click Each Layer to Explore
          </div>

          {/* Soul Silhouette */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg viewBox="0 0 340 420" width="100%" style={{ maxWidth: 340, display: "block" }}>
              {/* Rational Soul aura */}
              <ellipse
                cx="163" cy="220" rx="130" ry="175"
                fill={selectedLayer === "rational" ? "#f59e0b22" : hoveredLayer === "rational" ? "#f59e0b18" : "#f59e0b0a"}
                stroke={selectedLayer === "rational" ? "#f59e0b" : "#f59e0b55"}
                strokeWidth={selectedLayer === "rational" ? 2.5 : 1.5}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={() => setHoveredLayer("rational")}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setSelectedLayer(selectedLayer === "rational" ? null : "rational")}
              />
              {/* Floating rational symbols */}
              {["λ","∀","∞","Ω","Σ"].map((sym, i) => (
                <text key={i}
                  x={60 + i * 55 + Math.sin(pulse * Math.PI * 2 + i) * 8}
                  y={55 + Math.cos(pulse * Math.PI * 2 + i * 1.3) * 12}
                  fill="#f59e0b"
                  fontSize="14"
                  opacity={0.4 + pulse * 0.3}
                  textAnchor="middle"
                  style={{ fontFamily: "Georgia, serif", pointerEvents: "none" }}
                >{sym}</text>
              ))}

              {/* Sensitive Soul aura */}
              <ellipse
                cx="163" cy="220" rx="95" ry="135"
                fill={selectedLayer === "sensitive" ? "#3b82f622" : hoveredLayer === "sensitive" ? "#3b82f618" : "#3b82f60a"}
                stroke={selectedLayer === "sensitive" ? "#3b82f6" : "#3b82f655"}
                strokeWidth={selectedLayer === "sensitive" ? 2.5 : 1.5}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={() => setHoveredLayer("sensitive")}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setSelectedLayer(selectedLayer === "sensitive" ? null : "sensitive")}
              />

              {/* Nutritive Soul aura — pulsing */}
              <ellipse
                cx="163" cy="220" rx={60 + pulse * 6} ry={85 + pulse * 8}
                fill={selectedLayer === "nutritive" ? "#22c55e22" : hoveredLayer === "nutritive" ? "#22c55e18" : "#22c55e0a"}
                stroke={selectedLayer === "nutritive" ? "#22c55e" : "#22c55e55"}
                strokeWidth={selectedLayer === "nutritive" ? 2.5 : 1.5}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={() => setHoveredLayer("nutritive")}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setSelectedLayer(selectedLayer === "nutritive" ? null : "nutritive")}
              />

              {/* Human silhouette body */}
              {/* Head */}
              <ellipse cx="163" cy="75" rx="28" ry="32" fill="#2a2a3a" stroke="#6366F144" strokeWidth="1" style={{ pointerEvents: "none" }} />
              {/* Neck */}
              <rect x="155" y="105" width="16" height="18" fill="#2a2a3a" style={{ pointerEvents: "none" }} />
              {/* Torso */}
              <path d="M130 123 Q118 140 115 175 L115 290 Q115 295 125 297 L201 297 Q211 295 211 290 L211 175 Q208 140 196 123 Z" fill="#2a2a3a" stroke="#6366F144" strokeWidth="1" style={{ pointerEvents: "none" }} />
              {/* Left arm */}
              <path d="M130 130 Q110 150 100 190 Q96 210 102 220 Q108 215 112 195 Q120 165 135 145 Z" fill="#252535" style={{ pointerEvents: "none" }} />
              {/* Right arm */}
              <path d="M196 130 Q216 150 226 190 Q230 210 224 220 Q218 215 214 195 Q206 165 191 145 Z" fill="#252535" style={{ pointerEvents: "none" }} />
              {/* Legs */}
              <path d="M115 290 Q113 330 112 380 Q111 400 122 400 Q132 400 133 380 L138 297 Z" fill="#252535" style={{ pointerEvents: "none" }} />
              <path d="M211 290 Q213 330 214 380 Q215 400 204 400 Q194 400 193 380 L188 297 Z" fill="#252535" style={{ pointerEvents: "none" }} />

              {/* Sense organ highlights */}
              {senseOrgans.map((organ) => (
                <g key={organ.id}>
                  <circle
                    cx={organ.x} cy={organ.y} r={organ.id === "skin" ? 10 : 6}
                    fill={senseHighlight === organ.id ? "#3b82f6" : "#3b82f633"}
                    stroke="#3b82f6"
                    strokeWidth={senseHighlight === organ.id ? 2 : 1}
                    style={{ cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={() => setSenseHighlight(organ.id)}
                    onMouseLeave={() => setSenseHighlight(null)}
                  />
                  <text x={organ.x + 10} y={organ.y + 4} fill="#3b82f699" fontSize="9" style={{ pointerEvents: "none", fontFamily: "Georgia, serif" }}>
                    {organ.label}
                  </text>
                </g>
              ))}

              {/* Layer labels */}
              <text x="305" y="115" fill="#f59e0b" fontSize="11" textAnchor="middle" style={{ fontFamily: "Georgia, serif", pointerEvents: "none" }}>Rational</text>
              <line x1="285" y1="112" x2="260" y2="100" stroke="#f59e0b44" strokeWidth="1" />
              <text x="305" y="175" fill="#3b82f6" fontSize="11" textAnchor="middle" style={{ fontFamily: "Georgia, serif", pointerEvents: "none" }}>Sensitive</text>
              <line x1="285" y1="172" x2="260" y2="170" stroke="#3b82f644" strokeWidth="1" />
              <text x="305" y="235" fill="#22c55e" fontSize="11" textAnchor="middle" style={{ fontFamily: "Georgia, serif", pointerEvents: "none" }}>Nutritive</text>
              <line x1="285" y1="232" x2="230" y2="232" stroke="#22c55e44" strokeWidth="1" />
            </svg>

            {/* Sense highlight tooltip */}
            {senseHighlight && (
              <div style={{
                background: "rgba(15,15,35,0.95)",
                border: "1px solid #3b82f666",
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: "clamp(11px,1.5vw,13px)",
                color: "#a5b4fc",
                lineHeight: 1.6,
                maxWidth: "min(90%, 400px)",
                textAlign: "center"
              }}>
                {senseOrgans.find(o => o.id === senseHighlight)?.sense}
              </div>
            )}

            {/* Layer Detail Panel */}
            {activeLayer && (
              <div style={{
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${activeLayer.color}66`,
                borderLeft: `4px solid ${activeLayer.color}`,
                borderRadius: 8,
                padding: "clamp(14px,2.5vw,20px)",
                width: "100%",
                maxWidth: "min(90vw, 680px)"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: activeLayer.color, marginBottom: 10 }}>
                  {activeLayer.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c8c0b8", lineHeight: 1.7, margin: "0 0 10px 0" }}>
                  {activeLayer.description}
                </p>
                <p style={{ fontSize: "clamp(11px,1.5vw,13px)", color: activeLayer.color, lineHeight: 1.6, margin: "0 0 8px 0", fontStyle: "italic" }}>
                  {activeLayer.modern}
                </p>
                <p style={{ fontSize: "clamp(11px,1.4vw,12px)", color: "#7878a8", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                  {activeLayer.aristotle}
                </p>
              </div>
            )}

            {/* Active Intellect Debate */}
            <div style={{ width: "100%", maxWidth: "min(90vw, 680px)" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
                The Active Intellect — Three Interpretations
              </div>
              <p style={{ fontSize: "clamp(11px,1.5vw,13px)", color: "#8888aa", lineHeight: 1.6, margin: "0 0 14px 0", fontStyle: "italic" }}>
                "When intellect is set free from its present conditions it appears as just what it is and nothing more: this alone is immortal and eternal." — De Anima III.5 (tr. Smith)
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {Object.entries(interpretations).map(([key, interp]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedInterp(key)}
                    style={{
                      background: selectedInterp === key ? interp.color + "33" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${selectedInterp === key ? interp.color : interp.color + "44"}`,
                      borderRadius: 20,
                      padding: "6px 14px",
                      color: selectedInterp === key ? interp.color : "#8888a8",
                      fontSize: "clamp(11px,1.5vw,13px)",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                      transition: "all 0.2s"
                    }}
                  >
                    {interp.name}
                  </button>
                ))}
              </div>
              <div style={{
                background: "rgba(0,0,0,0.4)",
                border: `1px solid ${activeInterp.color}44`,
                borderLeft: `4px solid ${activeInterp.color}`,
                borderRadius: 8,
                padding: "clamp(12px,2vw,18px)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontSize: "clamp(13px,1.8vw,15px)", color: activeInterp.color, fontWeight: "bold" }}>{activeInterp.name}</span>
                  <span style={{ fontSize: 11, color: "#6666aa", letterSpacing: 1 }}>{activeInterp.century}</span>
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c8c0b8", lineHeight: 1.7, margin: "0 0 10px 0" }}>
                  {activeInterp.claim}
                </p>
                <p style={{ fontSize: "clamp(11px,1.5vw,13px)", color: "#9898b8", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                  Implication: {activeInterp.implication}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT : ACCENT + "66"}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(0,0,0,0.35)",
              border: `1px solid ${ACCENT}44`,
              borderRadius: 6,
              padding: "clamp(12px,2vw,16px)",
              marginTop: 4
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c8c0b8", lineHeight: 1.7, margin: 0 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8c0b8", lineHeight: 1.7, margin: 0 }}>
            Even if mental states are functional roles of biological organization, this does not explain why performing those roles involves subjective experience — the 'hard problem of consciousness.' Aristotle's obscure active intellect passage raises unresolved questions about whether any aspect of mind transcends bodily organization, generating contradictory readings across two millennia. This pressure forces the next development: how do the capacities of soul integrate into a unified human life oriented toward flourishing?
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(14px,2.5vw,20px) clamp(14px,2.5vw,20px)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Hilary Putnam's Functionalism</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Putnam explicitly positioned his functionalist theory of mind as neo-Aristotelian: mental states are defined by their causal-functional roles, not their physical substrate, so the same mental state could be realized in neurons or silicon. This revived Aristotle's form-matter distinction under computational language, though Putnam himself later grew skeptical of strong functionalism.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Eliminative Materialism (Churchland)</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Paul and Patricia Churchland's eliminative materialism represents the Alexander of Aphrodisias position updated for neuroscience: folk psychological categories like 'belief,' 'desire,' and 'perception' will eventually be replaced entirely by neuroscientific descriptions. There is no soul hierarchy — only neural architecture. This is the fullest realization of the materialist reading of Aristotle's De Anima.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Robert Pasnau's Defense of Psychological Explanation</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Contemporary philosopher Robert Pasnau has argued that Aristotle's psychological-level explanation — describing mental capacities as real organizational features of living bodies — remains indispensable even after neuroscience. No amount of neural description captures what it is to see red or feel pain as experienced; the soul as form captures a real level of description that physical substrate alone cannot.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Cognitive Science and Aristotelian Faculties</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Cognitive science effectively reinvented Aristotle's faculty psychology under new names: perception, attention (koinē aisthēsis), memory, imagination (phantasia), and practical reason (phronēsis) all appear as distinct research programs. The binding problem — how disparate sensory streams unify into a single experience — is precisely the question Aristotle's common sense was designed to answer, still unresolved today.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 9 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 10: Ethics, Virtue, Character, and the Good Life ───
function EthicsVirtueGoodLife() {
  const ACCENT = "#EA580C";
  const ACCENT_LIGHT = "#FB923C";
  const ACCENT_DIM = "#3a1a06";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";
  const BG = "radial-gradient(ellipse at 40% 30%, #2a1005 0%, #0f0805 60%, #0a0a0f 100%)";

  const [selectedVirtue, setSelectedVirtue] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [practiceCount, setPracticeCount] = useState(0);
  const [practiceLabel, setPracticeLabel] = useState("");
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const virtues = [
    {
      name: "Courage",
      deficiency: "Cowardice",
      excess: "Recklessness",
      scenarios: [
        {
          label: "Facing Protest Danger",
          defDesc: "You flee at the first sign of risk, abandoning fellow protesters to danger — driven purely by fear.",
          meanDesc: "You stay to support others despite real danger, acting from principle — fear is felt but mastered by reason.",
          excessDesc: "You charge into violence recklessly, heedless of genuine peril — confusing bravado with bravery.",
        },
        {
          label: "Confronting a Bully",
          defDesc: "You look away, pretending not to notice, prioritizing your comfort over justice.",
          meanDesc: "You intervene proportionally — firm but measured — addressing the situation without needless escalation.",
          excessDesc: "You escalate immediately to aggression, seeking confrontation beyond what the situation warrants.",
        },
        {
          label: "Whistleblowing at Work",
          defDesc: "You stay silent about serious wrongdoing, letting fear of retaliation override your duty.",
          meanDesc: "You report the wrongdoing through appropriate channels, accepting real personal risk for the right reason.",
          excessDesc: "You broadcast everything recklessly without regard for collateral harm to uninvolved parties.",
        },
      ],
    },
    {
      name: "Generosity",
      deficiency: "Miserliness",
      excess: "Profligacy",
      scenarios: [
        {
          label: "Friend in Financial Need",
          defDesc: "You refuse any help, prioritizing your wealth over genuine care for a close friend.",
          meanDesc: "You give what you can meaningfully afford — neither too little nor so much it harms your own stability.",
          excessDesc: "You give everything impulsively, leaving yourself unable to help anyone — including yourself — later.",
        },
        {
          label: "Charitable Giving",
          defDesc: "You find every reason to avoid giving, even when you have substantial surplus.",
          meanDesc: "You give regularly and deliberately to worthwhile causes, proportionate to your means and their need.",
          excessDesc: "You give compulsively to feel good, without discernment, often to causes that squander the funds.",
        },
        {
          label: "Managing Shared Expenses",
          defDesc: "You consistently underpay your share, burdening others with costs that are rightfully yours.",
          meanDesc: "You contribute your fair share — neither exploiting others nor insisting on extravagant over-contribution.",
          excessDesc: "You throw money at every shared cost to avoid discomfort, enabling poor financial decisions by others.",
        },
      ],
    },
    {
      name: "Temperance",
      deficiency: "Insensibility",
      excess: "Self-Indulgence",
      scenarios: [
        {
          label: "Eating and Drinking",
          defDesc: "You deny yourself all pleasure as if bodily appetite were shameful, becoming joyless and austere.",
          meanDesc: "You enjoy food and drink with genuine pleasure, neither obsessing nor denying — savoring without excess.",
          excessDesc: "You pursue bodily pleasures compulsively, allowing appetite to override reason and duty.",
        },
        {
          label: "Social Pleasures",
          defDesc: "You refuse all leisure and fun, treating enjoyment as a moral failing.",
          meanDesc: "You participate in social pleasure appropriately — present, joyful, and still capable of restraint.",
          excessDesc: "You chase every pleasure immediately, unable to delay gratification even when important things call.",
        },
        {
          label: "Rest and Recreation",
          defDesc: "You work without rest, treating any recreation as waste — leading to burnout and rigidity.",
          meanDesc: "You rest and play appropriately, recognizing that recovery and joy are part of a flourishing life.",
          excessDesc: "You prioritize leisure so heavily that duties and relationships suffer under the weight of self-pleasure.",
        },
      ],
    },
    {
      name: "Justice",
      deficiency: "Unfairness (taking too little)",
      excess: "Grasping (taking too much)",
      scenarios: [
        {
          label: "Dividing Resources",
          defDesc: "You assign yourself too little out of false modesty, creating imbalance and devaluing your contribution.",
          meanDesc: "You divide proportionally to contribution and need — neither self-serving nor self-abnegating.",
          excessDesc: "You claim more than your share, rationalizing advantage while others bear undue costs.",
        },
        {
          label: "Evaluating Colleagues",
          defDesc: "You consistently underrate yourself and others from excessive deference, distorting accurate judgment.",
          meanDesc: "You assess merit honestly and proportionally, giving each person what they genuinely deserve.",
          excessDesc: "You inflate your evaluations of allies and deflate those of rivals to gain unfair advantage.",
        },
        {
          label: "Civic Participation",
          defDesc: "You withdraw entirely from civic life, refusing to shoulder any communal burden.",
          meanDesc: "You contribute to civic life proportionally to your capacity — present, honest, and fairly engaged.",
          excessDesc: "You manipulate civic structures to concentrate power and advantage beyond your just share.",
        },
      ],
    },
  ];

  const keyConcepts = [
    {
      id: "eudaimonia",
      label: "Eudaimonia",
      desc: "Eudaimonia is often translated as 'happiness' but is better rendered as flourishing or living well. For Aristotle it is not a feeling or pleasant state but an ongoing activity — a life of excellent rational activity expressed through virtuous character and meaningful relationships. It is the final end to which all human action ultimately aims.",
    },
    {
      id: "mean",
      label: "Doctrine of the Mean",
      desc: "Virtue is a disposition to choose the mean between excess and deficiency — but this is not arithmetic. The mean is relative to the person and situation, requiring practical wisdom to identify. The courageous response for a trained soldier differs from that for an untrained civilian facing the same threat.",
    },
    {
      id: "phronesis",
      label: "Phronesis",
      desc: "Practical wisdom (phronesis) is the master intellectual virtue that guides all the moral virtues. It is the cultivated capacity to discern what reason demands in each particular situation — not a set of rules but a kind of perceptual sensitivity developed through experience, reflection, and good character.",
    },
    {
      id: "habituation",
      label: "Habituation",
      desc: "We become virtuous by practicing virtuous acts, just as we become builders by building. Virtue cannot be acquired by reading about it — it requires repeated action until the disposition becomes second nature. The goal is not mere compliance but genuine desire: the virtuous person wants to do the right thing.",
    },
    {
      id: "philia",
      label: "Friendship (Philia)",
      desc: "Aristotle considered deep friendship (philia) essential to eudaimonia, not merely instrumental. The highest form is friendship based on mutual admiration of character — each person wishing the good of the other for the other's own sake. Such friendship is a mirror in which we see and develop our own virtue.",
    },
    {
      id: "function",
      label: "Function Argument",
      desc: "Aristotle argues that every kind of thing has a characteristic function (ergon). The function of a human being is rational activity — what distinguishes us from plants (nutrition) and animals (sensation). Living well means performing this function excellently, which just is exercising virtue of the rational soul.",
    },
  ];

  const currentVirtue = virtues[selectedVirtue];
  const currentScenario = currentVirtue.scenarios[selectedScenario];

  const sliderRegion = sliderValue < 33 ? "deficiency" : sliderValue > 66 ? "excess" : "mean";
  const sliderDescription =
    sliderRegion === "deficiency"
      ? currentScenario.defDesc
      : sliderRegion === "excess"
      ? currentScenario.excessDesc
      : currentScenario.meanDesc;

  const sliderLabel =
    sliderRegion === "deficiency"
      ? currentVirtue.deficiency
      : sliderRegion === "excess"
      ? currentVirtue.excess
      : currentVirtue.name + " (The Mean)";

  const sliderColor =
    sliderRegion === "deficiency"
      ? "#6b7280"
      : sliderRegion === "excess"
      ? "#dc2626"
      : ACCENT;

  const gaugePercent = Math.min((practiceCount / 20) * 100, 100);
  const gaugeStage =
    gaugePercent < 25
      ? "Novice — acts reluctantly, with effort"
      : gaugePercent < 50
      ? "Developing — acts consistently but with strain"
      : gaugePercent < 75
      ? "Practiced — acts well, rarely struggles"
      : gaugePercent < 100
      ? "Habituated — virtue feels natural, not forced"
      : "Character Formed — virtue is second nature";

  function handlePractice() {
    if (practiceCount < 20) {
      setPracticeCount((c) => c + 1);
      setPracticeLabel("Practice act performed!");
      setTimeout(() => setPracticeLabel(""), 1200);
    }
  }

  function handleReset() {
    setPracticeCount(0);
    setPracticeLabel("Character gauge reset.");
    setTimeout(() => setPracticeLabel(""), 1200);
  }

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        color: TITLE_COLOR,
        padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
      }}
    >
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 8,
            }}
          >
            Part 10 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: "normal",
              color: TITLE_COLOR,
              margin: "0 0 8px 0",
            }}
          >
            Ethics, Virtue, Character, and the Good Life
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: SUBTITLE_COLOR,
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            Aristotle grounded morality in human flourishing, arguing that virtue is a stable disposition of character cultivated through habituation and guided by practical wisdom.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.35)",
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: "0 8px 8px 0",
            padding: "clamp(14px, 3vw, 22px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
            Aristotle's metaphysics established that things have natural functions whose fulfillment constitutes their excellence, and his psychology showed that humans are rational animals — but what does excellent rational activity as a human actually look like in practice, and how do we cultivate it?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}44`,
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 18,
            }}
          >
            Interactive Virtue Explorer
          </div>

          {/* Virtue Selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR, marginBottom: 10, letterSpacing: 1 }}>
              Choose a Virtue:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {virtues.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => { setSelectedVirtue(i); setSelectedScenario(0); setSliderValue(50); }}
                  style={{
                    background: selectedVirtue === i ? ACCENT : "rgba(0,0,0,0.4)",
                    border: `1px solid ${selectedVirtue === i ? ACCENT : ACCENT + "55"}`,
                    borderRadius: 20,
                    color: selectedVirtue === i ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "all 0.2s",
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR, marginBottom: 10, letterSpacing: 1 }}>
              Choose a Situation:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {currentVirtue.scenarios.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => { setSelectedScenario(i); setSliderValue(50); }}
                  style={{
                    background: selectedScenario === i ? ACCENT + "33" : "transparent",
                    border: `1px solid ${selectedScenario === i ? ACCENT : ACCENT + "33"}`,
                    borderRadius: 6,
                    color: selectedScenario === i ? ACCENT_LIGHT : SUBTITLE_COLOR,
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Virtue Spectrum Diagram */}
          <div style={{ marginBottom: 20 }}>
            <svg
              viewBox="0 0 600 80"
              width="100%"
              style={{ display: "block", maxWidth: "100%" }}
              aria-label="Virtue spectrum diagram"
            >
              {/* Background gradient bar */}
              <defs>
                <linearGradient id="virtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="40%" stopColor={ACCENT} />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <rect x="40" y="28" width="520" height="14" rx="7" fill="url(#virtGrad)" opacity="0.5" />

              {/* Mean zone highlight */}
              <rect x="213" y="26" width="174" height="18" rx="9" fill={ACCENT} opacity="0.2" />
              <rect x="213" y="26" width="174" height="18" rx="9" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />

              {/* Slider thumb */}
              <circle
                cx={40 + (sliderValue / 100) * 520}
                cy="35"
                r="12"
                fill={sliderColor}
                stroke="#f0ead8"
                strokeWidth="2"
                style={{ filter: `drop-shadow(0 0 6px ${sliderColor})` }}
              />

              {/* Labels */}
              <text x="40" y="68" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="Georgia, serif">
                {currentVirtue.deficiency}
              </text>
              <text x="300" y="16" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="12" fontFamily="Georgia, serif" fontStyle="italic">
                {currentVirtue.name}
              </text>
              <text x="560" y="68" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="Georgia, serif">
                {currentVirtue.excess}
              </text>
            </svg>

            {/* Slider Input */}
            <div style={{ padding: "0 4px" }}>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: ACCENT,
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(10px, 1.3vw, 12px)", color: SUBTITLE_COLOR }}>
                <span>← Deficiency</span>
                <span>The Mean</span>
                <span>Excess →</span>
              </div>
            </div>
          </div>

          {/* Response Description */}
          <div
            style={{
              background: "rgba(0,0,0,0.35)",
              border: `1px solid ${sliderColor}55`,
              borderLeft: `4px solid ${sliderColor}`,
              borderRadius: "0 8px 8px 0",
              padding: "clamp(12px, 2vw, 18px)",
              marginBottom: 8,
              minHeight: 80,
              transition: "border-color 0.3s",
            }}
          >
            <div
              style={{
                fontSize: "clamp(10px, 1.4vw, 12px)",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: sliderColor,
                marginBottom: 8,
              }}
            >
              {sliderLabel}
            </div>
            <p style={{ fontSize: "clamp(13px, 1.7vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
              {sliderDescription}
            </p>
          </div>
          {sliderRegion === "mean" && (
            <div
              style={{
                background: ACCENT + "11",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: "clamp(12px, 1.6vw, 13px)",
                color: ACCENT_LIGHT,
                fontStyle: "italic",
              }}
            >
              Aristotle: The mean is not the same for everyone. Phronesis — practical wisdom — discerns what the situation and person require. The virtuous person acts at the right time, in the right way, to the right degree, toward the right person, for the right reason.
            </div>
          )}

          {/* Habituation Panel */}
          <div
            style={{
              marginTop: 28,
              background: "rgba(0,0,0,0.25)",
              border: `1px solid ${ACCENT}33`,
              borderRadius: 8,
              padding: "clamp(14px, 2.5vw, 22px)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 14,
              }}
            >
              The Habituation Model
            </div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: SUBTITLE_COLOR, lineHeight: 1.7, margin: "0 0 16px 0" }}>
              Virtue is not innate — it is built through practice. Each act of {currentVirtue.name.toLowerCase()} shapes the character. Click to practice virtuous acts and watch the disposition solidify.
            </p>

            {/* Gauge */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR }}>
                <span>Character Gauge</span>
                <span style={{ color: ACCENT_LIGHT }}>{Math.round(gaugePercent)}%</span>
              </div>
              <div
                style={{
                  height: 18,
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: 9,
                  border: `1px solid ${ACCENT}44`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${gaugePercent}%`,
                    background: gaugePercent === 100
                      ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`
                      : `linear-gradient(90deg, ${ACCENT}99, ${ACCENT})`,
                    borderRadius: 9,
                    transition: "width 0.4s ease",
                    boxShadow: gaugePercent > 50 ? `0 0 10px ${ACCENT}88` : "none",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: "clamp(12px, 1.6vw, 13px)",
                  color: gaugePercent === 100 ? ACCENT_LIGHT : SUBTITLE_COLOR,
                  fontStyle: "italic",
                  minHeight: 20,
                }}
              >
                {gaugeStage}
              </div>
            </div>

            {/* Practice markers */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "clamp(12px, 3vw, 18px)",
                    height: "clamp(12px, 3vw, 18px)",
                    borderRadius: "50%",
                    background: i < practiceCount ? ACCENT : "rgba(0,0,0,0.4)",
                    border: `1px solid ${i < practiceCount ? ACCENT : ACCENT + "33"}`,
                    transition: "background 0.3s",
                    boxShadow: i < practiceCount ? `0 0 4px ${ACCENT}66` : "none",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={handlePractice}
                disabled={practiceCount >= 20}
                style={{
                  background: practiceCount >= 20 ? "rgba(0,0,0,0.3)" : ACCENT,
                  border: "none",
                  borderRadius: 6,
                  color: practiceCount >= 20 ? SUBTITLE_COLOR : "#f0ead8",
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  padding: "9px 20px",
                  cursor: practiceCount >= 20 ? "not-allowed" : "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "background 0.2s",
                }}
              >
                Practice {currentVirtue.name}
              </button>
              <button
                onClick={handleReset}
                style={{
                  background: "transparent",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 6,
                  color: ACCENT_LIGHT,
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                }}
              >
                Reset
              </button>
              {practiceLabel && (
                <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                  {practiceLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 24px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 14,
            }}
          >
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map((kc) => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT : ACCENT + "66"}`,
                  borderRadius: 20,
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontSize: "clamp(12px, 1.5vw, 13px)",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div
              style={{
                background: ACCENT + "11",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "clamp(12px, 2vw, 18px)",
                marginTop: 4,
              }}
            >
              <div style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: TITLE_COLOR, fontWeight: "bold", marginBottom: 8 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#c8bfb0", lineHeight: 1.8, margin: 0 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.35)",
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: "0 8px 8px 0",
            padding: "clamp(14px, 3vw, 22px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: "0 0 10px 0" }}>
            Grounding ethics in human nature and function faces Hume's is-ought gap — facts about human nature do not automatically yield normative conclusions about how we should live. Even granting that humans have a rational function, why must we perform it excellently, or at all? The naturalistic foundation Aristotle offers is philosophically contested.
          </p>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
            Aristotle's specific catalogue of virtues also appears culturally parochial — designed for aristocratic Greek males with leisure for philosophical contemplation, raising charges of elitism and exclusion that any revival must squarely address. This pressure forces the next development: how can practical and productive knowledge be systematized, and what is the relationship between wisdom and making?
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchosOpen((o) => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px, 2.5vw, 18px) clamp(16px, 3vw, 24px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              Real-World Echoes
            </span>
            {echosOpen ? (
              <ChevronUp size={16} color={ACCENT} />
            ) : (
              <ChevronDown size={16} color={ACCENT} />
            )}
          </button>
          {echosOpen && (
            <div
              style={{
                padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  MacIntyre's After Virtue and the Revival
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Alasdair MacIntyre's 1981 diagnosis of modern moral philosophy as fragmented and incoherent — and his argument that only a return to Aristotelian virtue ethics could provide a coherent moral framework — sparked a major revival that now dominates academic ethics alongside its Kantian and utilitarian rivals.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Nussbaum's Capabilities Approach
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Martha Nussbaum extended Aristotle's eudaimonia into a cross-cultural framework for human development, arguing that flourishing requires a threshold of capabilities — not just GDP — and using this to critique development economics and global poverty. Her approach has directly influenced UN human development indices.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Moral Psychology and Character Research
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Psychological research on moral development — from Bandura's social learning theory to Angela Duckworth's work on grit and character — has largely confirmed Aristotle's intuition that moral character is formed through practice, modeling, and habituation rather than purely through rational rule-following.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Virtue Ethics in Professional Education
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Medical, legal, and business ethics education has increasingly adopted virtue ethics frameworks, recognizing that rule-based compliance training is insufficient for cultivating the practical wisdom and integrity that professions actually require. Character formation programs in medicine explicitly draw on the habituation model.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div
          style={{
            textAlign: "center",
            marginTop: 36,
            fontSize: 12,
            color: ACCENT_DIM,
            letterSpacing: 1,
          }}
        >
          Part 10 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 11: Political Philosophy and the Science of Community ───
function PoliticalPhilosophyCommunity() {
  const ACCENT = "#0369A1";
  const ACCENT_LIGHT = "#38BDF8";
  const ACCENT_DIM = "#0c2a3a";
  const TITLE_COLOR = "#e8e0d0";
  const SUBTITLE_COLOR = "#a0b8c8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeConstitution, setActiveConstitution] = useState(null);
  const [wealthConc, setWealthConc] = useState(50);
  const [citizenVirtue, setCitizenVirtue] = useState(50);
  const [middleClass, setMiddleClass] = useState(50);
  const [view, setView] = useState("wheel");
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredSector, setHoveredSector] = useState(null);

  const constitutions = [
    {
      id: "monarchy",
      label: "Monarchy",
      type: "good",
      angle: 0,
      color: "#0EA5E9",
      rule: "One",
      aim: "Common good",
      desc: "Rule by one person for the benefit of all. Best in theory when the ruler possesses supreme virtue, but rare and fragile.",
      examples: ["Solon's Athens (early)", "Philip II of Macedon"],
      conditions: { wealth: [0,40], virtue: [70,100], middle: [30,70] }
    },
    {
      id: "aristocracy",
      label: "Aristocracy",
      type: "good",
      angle: 60,
      color: "#0284C7",
      rule: "Few",
      aim: "Common good",
      desc: "Rule by the few who are genuinely virtuous and wise. Requires a cultivated elite committed to justice over privilege.",
      examples: ["Sparta (idealized)", "Carthage"],
      conditions: { wealth: [20,60], virtue: [60,100], middle: [40,80] }
    },
    {
      id: "polity",
      label: "Polity",
      type: "good",
      angle: 120,
      color: "#0369A1",
      rule: "Many",
      aim: "Common good",
      desc: "Mixed constitution balancing democratic and oligarchic elements. Stable because a large middle class moderates extremes. Aristotle's recommended regime.",
      examples: ["Carthage", "Modern mixed constitutions", "Swiss confederation"],
      conditions: { wealth: [30,70], virtue: [40,80], middle: [60,100] }
    },
    {
      id: "democracy",
      label: "Democracy",
      type: "corrupt",
      angle: 180,
      color: "#DC2626",
      rule: "Many",
      aim: "Poor majority",
      desc: "Corruption of polity: the many rule for their own advantage, ignoring the common good. Mob rule driven by passion over reason.",
      examples: ["Late Athenian democracy", "Populist demagoguery"],
      conditions: { wealth: [50,100], virtue: [0,40], middle: [0,40] }
    },
    {
      id: "oligarchy",
      label: "Oligarchy",
      type: "corrupt",
      angle: 240,
      color: "#B45309",
      rule: "Few",
      aim: "Wealthy few",
      desc: "Corruption of aristocracy: the wealthy few govern for their own enrichment. Confuses wealth with virtue and merit.",
      examples: ["Corinth (classical)", "Plutocratic regimes"],
      conditions: { wealth: [70,100], virtue: [0,50], middle: [0,40] }
    },
    {
      id: "tyranny",
      label: "Tyranny",
      type: "corrupt",
      angle: 300,
      color: "#7F1D1D",
      rule: "One",
      aim: "Tyrant's gain",
      desc: "Worst of all constitutions: one person rules by force for personal advantage. Destroys civic life and human flourishing entirely.",
      examples: ["Dionysius of Syracuse", "Thirty Tyrants of Athens"],
      conditions: { wealth: [70,100], virtue: [0,30], middle: [0,30] }
    }
  ];

  const capabilities = [
    { ancient: "Eudaimonia (complete flourishing)", modern: "Human Development Index", connect: "Both measure whether conditions support a fully realized human life, not merely survival." },
    { ancient: "Philia (civic friendship)", modern: "Social cohesion indicators", connect: "Nussbaum's 'affiliation' capability maps Aristotle's philia — the bonds enabling political life." },
    { ancient: "Praxis (virtuous activity)", modern: "Political participation rights", connect: "The capability to participate in governance reflects Aristotle's insistence that political action is constitutive of the good life." },
    { ancient: "Logos (reason in community)", modern: "Freedom of expression & education", connect: "Capabilities for senses, imagination, emotions, and reason echo Aristotle's view that logos distinguishes humans from other animals." },
    { ancient: "Arete (virtue through habituation)", modern: "Access to education & culture", connect: "Nussbaum's 'play' and 'practical reason' capabilities capture Aristotelian character formation through practice and reflection." },
    { ancient: "Polis (natural community)", modern: "Rights to association & assembly", connect: "The political community as natural completion of human sociality becomes the right to form associations in capabilities language." }
  ];

  const keyConcepts = [
    { id: "zoon", label: "Zoon Politikon", desc: "Aristotle's claim that humans are 'political animals' by nature — not by contract or convention. Outside the polis, a being is either a beast or a god. Political life is the medium in which specifically human capacities for reason, language, and justice develop and express themselves. This is not a normative preference but a biological-teleological claim about what humans essentially are." },
    { id: "polis", label: "Polis as Natural", desc: "The city-state is not an artificial construct but the telos of human social development, from family to village to polis. Earlier communities are incomplete realizations of what the polis achieves: a self-sufficient community capable of promoting the good life. The polis is prior to the individual in the logical sense that the whole is prior to its parts — a hand severed from the body is no longer a hand except in name." },
    { id: "six", label: "Six Constitutions", desc: "By studying 158 actual constitutions, Aristotle classified governments by two criteria: how many rule (one, few, many) and whether they serve the common good or private advantage. The result is six forms: three good (monarchy, aristocracy, polity) and three corrupt deviations (tyranny, oligarchy, democracy). This empirical taxonomy was unprecedented in political thought and remains foundational to comparative politics." },
    { id: "justice", label: "Distributive Justice", desc: "Distributive justice allocates goods proportionally to desert or merit — giving equal shares to equals, unequal shares to unequals. Rectificatory justice corrects imbalances in voluntary and involuntary transactions, restoring arithmetic equality. Aristotle's analysis of justice as proportionality rather than mere equality influenced centuries of jurisprudence and remains central to debates about merit, need, and desert in political philosophy." },
    { id: "polity", label: "Polity as Mixed Regime", desc: "Polity deliberately blends democratic and oligarchic elements, using different selection mechanisms for different offices. The key ingredient is a large middle class — neither too rich to be corrupted by excess nor too poor to be desperate — that moderates extremes and provides a stable social base for good governance. This is Aristotle's most practically achievable recommendation and anticipates modern arguments for economic equality as a precondition of democracy." },
    { id: "education", label: "Education & Citizenship", desc: "Education is the master tool of constitutional preservation. The polis must form virtuous citizens capable of ruling and being ruled in turn — the distinctively political form of freedom. Without civic education, constitutions degenerate because citizens lack the character to sustain them. This makes education a public, not merely private, concern and explains why Aristotle devotes the final books of the Politics to curriculum design." }
  ];

  function getRecommendedRegime() {
    let scores = {};
    constitutions.forEach(c => {
      const wOk = wealthConc >= c.conditions.wealth[0] && wealthConc <= c.conditions.wealth[1];
      const vOk = citizenVirtue >= c.conditions.virtue[0] && citizenVirtue <= c.conditions.virtue[1];
      const mOk = middleClass >= c.conditions.middle[0] && middleClass <= c.conditions.middle[1];
      scores[c.id] = (wOk ? 1 : 0) + (vOk ? 1 : 0) + (mOk ? 1 : 0);
    });
    let best = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
    return best;
  }

  const recommended = getRecommendedRegime();

  const SVG_SIZE = 400;
  const CX = 200;
  const CY = 200;
  const R_OUTER = 160;
  const R_INNER = 60;

  function polarToCart(angleDeg, r) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
  }

  function sectorPath(startAngle, endAngle, rInner, rOuter) {
    const [x1, y1] = polarToCart(startAngle, rOuter);
    const [x2, y2] = polarToCart(endAngle, rOuter);
    const [x3, y3] = polarToCart(endAngle, rInner);
    const [x4, y4] = polarToCart(startAngle, rInner);
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  }

  function labelPos(angleDeg, r) {
    return polarToCart(angleDeg + 30, r);
  }

  const active = constitutions.find(c => c.id === activeConstitution);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 20%, #0c2840 0%, #060c14 70%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d8d0c8",
      padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
            Part 11 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Political Philosophy and the Science of Community
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle grounded politics in human nature as inherently social, analyzed constitutions empirically, and sought the regime best suited to human flourishing.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(3,105,161,0.08)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,15px)", color: "#c8d8e8", lineHeight: 1.75 }}>
            Aristotle's ethics established that human flourishing is the goal, and that virtue requires habituation in a community — but what kind of community best enables virtue, and what political arrangements promote rather than corrupt it?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "44",
          borderRadius: 12,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16
        }}>
          {/* View toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["wheel","capabilities"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? ACCENT : "rgba(3,105,161,0.1)",
                border: "1px solid " + ACCENT + (view === v ? "ff" : "66"),
                color: view === v ? "#f0ead8" : ACCENT_LIGHT,
                borderRadius: 20,
                padding: "6px 18px",
                fontSize: "clamp(11px,1.6vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5
              }}>
                {v === "wheel" ? "Constitutional Wheel" : "Capabilities Adaptation"}
              </button>
            ))}
          </div>

          {view === "wheel" && (
            <div>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#a0b8c8", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
                Aristotle's six constitutional forms — classified by <em>who rules</em> and <em>for whose benefit</em>. Adjust conditions below to see which regime Aristotle would recommend.
              </div>

              {/* Sliders */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                {[
                  { label: "Wealth Concentration", val: wealthConc, set: setWealthConc, desc: "High = wealth pooled at top" },
                  { label: "Citizen Virtue Level", val: citizenVirtue, set: setCitizenVirtue, desc: "High = broadly virtuous citizenry" },
                  { label: "Size of Middle Class", val: middleClass, set: setMiddleClass, desc: "High = large, robust middle class" }
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(3,105,161,0.07)", borderRadius: 8, padding: "12px 14px", border: "1px solid " + ACCENT + "33" }}>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: ACCENT_LIGHT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#6090a8", marginBottom: 8 }}>{s.desc}</div>
                    <input type="range" min={0} max={100} value={s.val}
                      onChange={e => s.set(Number(e.target.value))}
                      style={{ width: "100%", accentColor: ACCENT, cursor: "pointer" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7090a8" }}>
                      <span>Low</span><span style={{ color: ACCENT_LIGHT, fontWeight: "bold" }}>{s.val}</span><span>High</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended badge */}
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#7090a8" }}>Aristotle recommends: </span>
                <span style={{
                  background: constitutions.find(c=>c.id===recommended)?.color + "22",
                  border: "1px solid " + (constitutions.find(c=>c.id===recommended)?.color || ACCENT),
                  color: constitutions.find(c=>c.id===recommended)?.color || ACCENT_LIGHT,
                  borderRadius: 12,
                  padding: "3px 14px",
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "Georgia, serif"
                }}>
                  {constitutions.find(c=>c.id===recommended)?.label}
                </span>
              </div>

              {/* Wheel SVG */}
              <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 420, display: "block", margin: "0 auto" }}>
                {/* Background rings */}
                <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="none" stroke={ACCENT + "22"} strokeWidth={1} />
                <circle cx={CX} cy={CY} r={R_INNER} fill="rgba(3,105,161,0.15)" stroke={ACCENT + "44"} strokeWidth={1} />

                {/* Good/corrupt labels */}
                <text x={CX} y={70} textAnchor="middle" fill={ACCENT_LIGHT + "88"} fontSize={9} fontFamily="Georgia, serif" letterSpacing={2}>GOOD FORMS</text>
                <text x={CX} y={338} textAnchor="middle" fill="#DC262688" fontSize={9} fontFamily="Georgia, serif" letterSpacing={2}>CORRUPT FORMS</text>

                {constitutions.map((c, i) => {
                  const startAngle = c.angle;
                  const endAngle = c.angle + 60;
                  const isRec = recommended === c.id;
                  const isHov = hoveredSector === c.id;
                  const isAct = activeConstitution === c.id;
                  const rOuter = isRec ? R_OUTER + 12 : isHov ? R_OUTER + 6 : R_OUTER;
                  const path = sectorPath(startAngle, endAngle, R_INNER + 4, rOuter);
                  const [lx, ly] = labelPos(startAngle, (rOuter + R_INNER) / 2 - 4);

                  return (
                    <g key={c.id}
                      onClick={() => setActiveConstitution(activeConstitution === c.id ? null : c.id)}
                      onMouseEnter={() => setHoveredSector(c.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d={path}
                        fill={isAct ? c.color + "cc" : isRec ? c.color + "99" : c.color + (isHov ? "77" : "44")}
                        stroke={isAct || isRec ? c.color : c.color + "66"}
                        strokeWidth={isAct || isRec ? 2 : 1}
                        style={{ transition: "all 0.3s" }}
                      />
                      <text
                        x={lx} y={ly}
                        textAnchor="middle"
                        fill={isAct || isHov || isRec ? "#f0ead8" : "#9ab0c0"}
                        fontSize={10}
                        fontFamily="Georgia, serif"
                        fontWeight={isAct || isRec ? "bold" : "normal"}
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      >
                        {c.label}
                      </text>
                      {isRec && (
                        <text x={lx} y={ly + 12} textAnchor="middle" fill="#f0ead8" fontSize={8} fontFamily="Georgia, serif" style={{ pointerEvents: "none" }}>
                          ★ recommended
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Center label */}
                <text x={CX} y={CY - 8} textAnchor="middle" fill={ACCENT_LIGHT} fontSize={10} fontFamily="Georgia, serif" letterSpacing={1}>WHO</text>
                <text x={CX} y={CY + 4} textAnchor="middle" fill={ACCENT_LIGHT} fontSize={10} fontFamily="Georgia, serif" letterSpacing={1}>RULES?</text>
                <text x={CX} y={CY + 16} textAnchor="middle" fill={ACCENT_LIGHT + "88"} fontSize={8} fontFamily="Georgia, serif">FOR WHOM?</text>

                {/* Dividing line between good/corrupt */}
                <line
                  x1={CX - R_OUTER - 20} y1={CY}
                  x2={CX + R_OUTER + 20} y2={CY}
                  stroke={ACCENT + "44"} strokeWidth={1} strokeDasharray="4,4"
                />
              </svg>

              {/* Active constitution details */}
              {active && (
                <div style={{
                  background: active.color + "15",
                  border: "1px solid " + active.color + "66",
                  borderRadius: 10,
                  padding: "clamp(14px,2.5vw,20px)",
                  marginTop: 16
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <span style={{ fontSize: "clamp(16px,2.5vw,20px)", color: active.color, fontWeight: "bold" }}>{active.label}</span>
                      <span style={{ marginLeft: 10, fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
                        color: active.type === "good" ? "#34D399" : "#F87171",
                        background: active.type === "good" ? "#34D39922" : "#F8717122",
                        borderRadius: 10, padding: "2px 8px" }}>
                        {active.type === "good" ? "Good Form" : "Corrupt Deviation"}
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#7090a8" }}>Rules: <span style={{ color: active.color }}>{active.rule}</span></div>
                      <div style={{ fontSize: 11, color: "#7090a8" }}>Aims for: <span style={{ color: active.color }}>{active.aim}</span></div>
                    </div>
                  </div>
                  <p style={{ fontSize: "clamp(13px,1.8vw,14px)", color: "#c0d0dc", lineHeight: 1.75, margin: "0 0 12px 0" }}>{active.desc}</p>
                  <div style={{ fontSize: 11, color: "#5080a0" }}>
                    <span style={{ color: ACCENT_LIGHT, letterSpacing: 1, textTransform: "uppercase", fontSize: 10 }}>Historical examples: </span>
                    {active.examples.join(" · ")}
                  </div>
                </div>
              )}

              {!active && (
                <p style={{ textAlign: "center", fontSize: "clamp(11px,1.5vw,12px)", color: "#5080a0", marginTop: 12 }}>
                  Click a sector to explore that constitutional form
                </p>
              )}
            </div>
          )}

          {view === "capabilities" && (
            <div>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#a0b8c8", textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>
                Martha Nussbaum's Capabilities Approach translates Aristotelian eudaimonia into measurable policy criteria — mapping ancient virtues onto modern human rights indicators.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {capabilities.map((cap, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: 10,
                    alignItems: "center",
                    background: "rgba(3,105,161,0.06)",
                    border: "1px solid " + ACCENT + "33",
                    borderRadius: 8,
                    padding: "clamp(10px,2vw,14px)"
                  }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT + "88", marginBottom: 4 }}>Aristotle</div>
                      <div style={{ fontSize: "clamp(12px,1.7vw,14px)", color: "#c8d8e8", fontStyle: "italic", lineHeight: 1.4 }}>{cap.ancient}</div>
                    </div>
                    <div style={{ textAlign: "center", fontSize: 18, color: ACCENT + "99" }}>→</div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#34D39988", marginBottom: 4 }}>Nussbaum</div>
                      <div style={{ fontSize: "clamp(12px,1.7vw,14px)", color: "#b8d0b8", lineHeight: 1.4 }}>{cap.modern}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(3,105,161,0.08)",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 8,
                padding: "clamp(12px,2.5vw,18px)",
                marginTop: 18
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
                  The Bridge
                </div>
                <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", color: "#a0b8c8", lineHeight: 1.75 }}>
                  Nussbaum argues that Aristotle's teleological framework — asking what a fully flourishing human life requires — provides a richer foundation for global justice than abstract rights talk. Each capability represents a threshold below which a life cannot be called fully human. This transforms ancient political philosophy into a tool for measuring poverty, disability, gender inequality, and political exclusion across 193 UN member states.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(kc => (
              <button key={kc.id} onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)} style={{
                background: hoveredConcept === kc.id ? ACCENT : "rgba(3,105,161,0.12)",
                border: "1px solid " + ACCENT + (hoveredConcept === kc.id ? "ff" : "66"),
                color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: "clamp(11px,1.5vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s"
              }}>
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(3,105,161,0.1)",
              border: "1px solid " + ACCENT + "55",
              borderRadius: 8,
              padding: "clamp(12px,2vw,16px)"
            }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", color: "#b0c8d8", lineHeight: 1.75 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(3,105,161,0.07)",
          border: "1px solid " + ACCENT + "44",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: "clamp(13px,1.8vw,15px)", color: "#c8d8e8", lineHeight: 1.75 }}>
            Aristotelian politics assumes a small, homogeneous, face-to-face community where citizens share values and deliberate together — conditions that are impossible in modern large, diverse, pluralistic nation-states. Its perfectionist demand that the state actively promote virtue clashes directly with liberal neutrality and individual rights. Moreover, the exclusion of women, slaves, and foreigners is not an incidental flaw but structural — built into the theory of who counts as capable of reason and political life.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: "#7090a8", fontStyle: "italic", lineHeight: 1.6 }}>
            This pressure forces the next development: can a revised Aristotelianism speak to modern pluralism, or must we choose between ancient depth and modern freedom?
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <button onClick={() => setEchoesOpen(!echoesOpen)} style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "clamp(14px,2.5vw,20px)",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT_LIGHT} />
              : <ChevronDown size={16} color={ACCENT_LIGHT} />
            }
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(14px,3vw,20px) clamp(14px,3vw,20px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  title: "Communitarian Critiques of Liberalism",
                  body: "Alasdair MacIntyre and Charles Taylor drew directly on Aristotle to challenge liberal individualism. MacIntyre argued in After Virtue that modern moral discourse is fragmented precisely because we abandoned Aristotle's teleological framework, leaving us with incommensurable moral fragments. Taylor's communitarian politics insists that individual identity is constituted by community membership — echoing the Aristotelian claim that the polis is prior to the individual."
                },
                {
                  title: "Nussbaum's Capabilities Approach in Global Development",
                  body: "Martha Nussbaum's collaboration with Amartya Sen produced the capabilities approach now used by the UNDP and in development economics worldwide. Her list of ten central capabilities — including bodily health, practical reason, affiliation, and political participation — translates Aristotelian eudaimonia into cross-cultural policy benchmarks. This is arguably the most influential application of ancient philosophy to contemporary global justice."
                },
                {
                  title: "Middle Class Stability and Democratic Research",
                  body: "Aristotle's claim that a large middle class stabilizes democracy has been confirmed by decades of political science research. Studies across 150+ countries show that economic inequality correlates with democratic breakdown and authoritarian backsliding. The Lipset hypothesis (1959) and subsequent work by Acemoglu, Robinson, and Przeworski provide empirical support for what Aristotle argued on teleological grounds over 2,300 years ago."
                },
                {
                  title: "Deliberative Democracy and Participatory Budgeting",
                  body: "Neo-Aristotelian theorists including Jürgen Habermas and contemporary deliberative democrats argue that legitimate political decisions require genuine citizen deliberation, not merely aggregation of preferences. Porto Alegre's participatory budgeting experiment — in which citizens directly deliberate over municipal spending — has been replicated in 3,000+ cities worldwide and is explicitly theorized as recovering the Aristotelian practice of citizens ruling and being ruled in turn."
                }
              ].map(card => (
                <div key={card.title} style={{
                  borderLeft: "3px solid " + ACCENT,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px"
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{card.title}</div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 11 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 12: Rhetoric, Persuasion, and Communication ───
function RhetoricPersuasionCommunication() {
  const ACCENT = "#DC2626";
  const ACCENT_LIGHT = "#ef4444";
  const ACCENT_DIM = "#3a0a0a";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeTab, setActiveTab] = useState("analyze");
  const [selectedSpeech, setSelectedSpeech] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [ethos, setEthos] = useState(33);
  const [pathos, setPathos] = useState(33);
  const [logos, setLogos] = useState(34);
  const [audience, setAudience] = useState("general");
  const [showImpact, setShowImpact] = useState(false);

  const keyConcepts = [
    { id: "ethos", label: "Ethos", desc: "Ethos is the mode of persuasion based on the speaker's character and credibility. Aristotle argued that audiences must trust the speaker's goodwill, competence, and virtue before accepting their arguments — making perceived character arguably the most powerful persuasive tool. A doctor's recommendation works partly because of their ethos, independent of the technical content." },
    { id: "pathos", label: "Pathos", desc: "Pathos involves moving audiences through appropriate emotional engagement. Aristotle devoted extensive analysis to specific emotions — anger, pity, fear, envy — identifying their characteristic objects, what triggers them, and what dissolves them. He did not condemn emotional appeal but insisted it must be fitting to the situation, not manufactured to distract from weak reasoning." },
    { id: "logos", label: "Logos", desc: "Logos is persuasion through reasoned argument. In rhetoric, this typically means the enthymeme — a syllogism with one premise supplied by the audience from shared beliefs. Because rhetoric addresses probable matters rather than certainties, logos in rhetoric is probabilistic reasoning, not demonstration. The audience's active participation in completing the argument makes it more persuasive." },
    { id: "enthymeme", label: "Enthymeme", desc: "The enthymeme is Aristotle's name for the rhetorical syllogism — an argument where one premise is left unstated because the audience already believes it. For example: 'This politician served in the military, so they understand sacrifice' leaves implicit the premise that military service teaches the nature of sacrifice. The audience's act of supplying the premise makes them complicit in the conclusion." },
    { id: "three-genres", label: "Three Genres", desc: "Aristotle classified rhetorical situations into three types: forensic (legal, concerning past actions and justice), deliberative (political, concerning future actions and advantage), and epideictic (ceremonial, concerning present praise or blame and honor). Each genre has characteristic time orientation, purpose, and dominant appeal, though all three modes appear in each." },
    { id: "dual-use", label: "Dual-Use Problem", desc: "Rhetoric's framework is content-neutral — the same analysis that helps a doctor persuade patients to take life-saving medicine helps a demagogue spread fear of a minority group. Aristotle acknowledged this but argued the danger of rhetoric is not unique to it: medicine can poison as well as heal. He considered the ability to argue both sides of a case essential for recognizing the enemy's moves." },
  ];

  const speeches = [
    {
      title: "Anti-Smoking Ad",
      segments: [
        { text: "As a cardiologist with 20 years of experience treating lung cancer patients,", type: "ethos", label: "Ethos", tooltip: "Establishes speaker credibility through professional expertise and direct patient experience." },
        { text: " I've held the hands of people dying from choices made at 16.", type: "pathos", label: "Pathos", tooltip: "Visceral emotional appeal — creates fear and grief through a specific, human image of suffering." },
        { text: " Studies show smoking causes 90% of lung cancers and kills 480,000 Americans annually.", type: "logos", label: "Logos", tooltip: "Statistical argument — concrete numbers function as logos, grounding the emotional appeal in verifiable fact." },
        { text: " You have the power to choose a different story.", type: "pathos", label: "Pathos", tooltip: "Appeal to agency and hope — shifts emotion from fear to empowerment, closing with positive emotional motivation." },
      ]
    },
    {
      title: "Political Speech",
      segments: [
        { text: "My grandfather built this town with his hands.", type: "ethos", label: "Ethos", tooltip: "Establishes belonging and authenticity — rooting identity in shared community history to build trust." },
        { text: " Our children are inheriting a broken system,", type: "pathos", label: "Pathos", tooltip: "Fear and grief appeal centered on children — invoking parental protective instinct." },
        { text: " and the data is clear: wages have fallen 12% in real terms since 2000.", type: "logos", label: "Logos", tooltip: "Statistical logos — the specific figure and time range make the claim appear precise and researched." },
        { text: " We are better than this. We have always been better than this.", type: "pathos", label: "Pathos", tooltip: "Collective pride appeal — invokes shared identity and past greatness as emotional motivation for action." },
      ]
    },
    {
      title: "Vaccine Advocacy",
      segments: [
        { text: "The FDA, CDC, and WHO all recommend this vaccine after reviewing trials involving 40,000 participants.", type: "logos", label: "Logos", tooltip: "Logos through institutional authority and scale of evidence — the number of trial participants signals rigorous testing." },
        { text: " Parents, I understand the fear —", type: "pathos", label: "Pathos", tooltip: "Direct emotional acknowledgment — validating the audience's existing fear before addressing it disarms defensiveness." },
        { text: " Dr. Chen herself vaccinated her own children last month.", type: "ethos", label: "Ethos", tooltip: "Personal ethos through example — a credible expert's own behavior is more persuasive than abstract recommendation." },
        { text: " The risk of serious illness from the disease is 40 times greater than any vaccine side effect.", type: "logos", label: "Logos", tooltip: "Comparative logos — framing risk as a ratio makes the rational case concrete and actionable." },
      ]
    }
  ];

  const typeColors = { ethos: "#3b82f6", pathos: ACCENT, logos: "#eab308" };
  const typeColorsDim = { ethos: "#1e3a5f", pathos: "#3a0a0a", logos: "#3a2e00" };

  const currentSpeech = speeches[selectedSpeech];

  const segmentCounts = currentSpeech.segments.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {});
  const total = currentSpeech.segments.length;

  function getImpactScore() {
    const audienceWeights = {
      general: { ethos: 0.35, pathos: 0.4, logos: 0.25 },
      expert: { ethos: 0.25, pathos: 0.2, logos: 0.55 },
      emotional: { ethos: 0.2, pathos: 0.6, logos: 0.2 },
      skeptical: { ethos: 0.45, pathos: 0.15, logos: 0.4 },
    };
    const w = audienceWeights[audience];
    const e = ethos / 100, p = pathos / 100, l = logos / 100;
    const balance = 1 - Math.abs(e - w.ethos) - Math.abs(p - w.pathos) - Math.abs(l - w.logos);
    return Math.max(0, Math.min(100, Math.round(balance * 120)));
  }

  function handleSlider(mode, val) {
    const v = parseInt(val);
    if (mode === "ethos") {
      const diff = v - ethos;
      const newPathos = Math.max(0, Math.min(100 - v, pathos - diff / 2));
      const newLogos = Math.max(0, 100 - v - newPathos);
      setEthos(v); setPathos(Math.round(newPathos)); setLogos(Math.round(newLogos));
    } else if (mode === "pathos") {
      const diff = v - pathos;
      const newEthos = Math.max(0, Math.min(100 - v, ethos - diff / 2));
      const newLogos = Math.max(0, 100 - v - newEthos);
      setPathos(v); setEthos(Math.round(newEthos)); setLogos(Math.round(newLogos));
    } else {
      const diff = v - logos;
      const newEthos = Math.max(0, Math.min(100 - v, ethos - diff / 2));
      const newPathos = Math.max(0, 100 - v - newEthos);
      setLogos(v); setEthos(Math.round(newEthos)); setPathos(Math.round(newPathos));
    }
    setShowImpact(false);
  }

  const impactScore = getImpactScore();

  const audienceLabels = { general: "General Public", expert: "Expert Audience", emotional: "Emotionally Engaged", skeptical: "Skeptical Audience" };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 20%, #2a0505 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      padding: "clamp(20px,4vw,48px) clamp(12px,3vw,24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 12 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Rhetoric, Persuasion, and Communication
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle systematized persuasion as a legitimate art form, identifying ethos, pathos, and logos as the three universal modes of effective and ethical communication.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
            Aristotle's logic and ethics established standards for valid reasoning and virtuous action, but real political and legal life requires persuading actual audiences who are not purely rational — a gap between philosophical ideal and practical necessity.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Persuasion Analyzer — Aristotle's Framework in Action
          </div>

          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["analyze", "design"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? ACCENT : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeTab === tab ? ACCENT : ACCENT + "44"}`,
                borderRadius: 6,
                color: activeTab === tab ? "#fff" : SUBTITLE_COLOR,
                padding: "8px 18px",
                fontSize: "clamp(12px,1.6vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5,
              }}>
                {tab === "analyze" ? "Analyze Mode" : "Design Mode"}
              </button>
            ))}
          </div>

          {activeTab === "analyze" && (
            <div>
              {/* Speech Selector */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {speeches.map((s, i) => (
                  <button key={i} onClick={() => { setSelectedSpeech(i); setHoveredSegment(null); }} style={{
                    background: selectedSpeech === i ? ACCENT + "22" : "transparent",
                    border: `1px solid ${selectedSpeech === i ? ACCENT : ACCENT + "33"}`,
                    borderRadius: 20,
                    color: selectedSpeech === i ? ACCENT_LIGHT : SUBTITLE_COLOR,
                    padding: "5px 14px",
                    fontSize: "clamp(11px,1.5vw,12px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}>
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                {[["ethos", "Ethos — Credibility"], ["pathos", "Pathos — Emotion"], ["logos", "Logos — Reason"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: typeColors[k] }} />
                    <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Annotated Text */}
              <div style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 8,
                padding: "clamp(14px,2.5vw,20px)",
                marginBottom: 18,
                lineHeight: 1.9,
                fontSize: "clamp(13px,1.8vw,15px)",
              }}>
                {currentSpeech.segments.map((seg, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredSegment(i)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => setHoveredSegment(hoveredSegment === i ? null : i)}
                    style={{
                      background: hoveredSegment === i ? typeColors[seg.type] + "44" : typeColors[seg.type] + "22",
                      borderBottom: `2px solid ${typeColors[seg.type]}`,
                      borderRadius: 3,
                      padding: "1px 2px",
                      cursor: "pointer",
                      color: hoveredSegment === i ? "#fff" : TITLE_COLOR,
                      transition: "background 0.2s",
                      display: "inline",
                    }}
                  >
                    {seg.text}
                  </span>
                ))}
              </div>

              {/* Tooltip */}
              {hoveredSegment !== null && (
                <div style={{
                  background: typeColorsDim[currentSpeech.segments[hoveredSegment].type],
                  border: `1px solid ${typeColors[currentSpeech.segments[hoveredSegment].type]}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 18,
                }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: typeColors[currentSpeech.segments[hoveredSegment].type], marginBottom: 6 }}>
                    {currentSpeech.segments[hoveredSegment].label} Move
                  </div>
                  <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", color: TITLE_COLOR, lineHeight: 1.6 }}>
                    {currentSpeech.segments[hoveredSegment].tooltip}
                  </p>
                </div>
              )}

              {/* Balance Gauges */}
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                Appeal Balance
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["ethos", "Ethos"], ["pathos", "Pathos"], ["logos", "Logos"]].map(([k, label]) => {
                  const pct = Math.round(((segmentCounts[k] || 0) / total) * 100);
                  return (
                    <div key={k}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: typeColors[k] }}>{label}</span>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>{segmentCounts[k] || 0} of {total} segments ({pct}%)</span>
                      </div>
                      <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: typeColors[k],
                          borderRadius: 4,
                          transition: "width 0.4s",
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div>
              {/* Audience Selector */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 10 }}>
                  Select Your Audience
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.entries(audienceLabels).map(([k, v]) => (
                    <button key={k} onClick={() => { setAudience(k); setShowImpact(false); }} style={{
                      background: audience === k ? ACCENT + "22" : "transparent",
                      border: `1px solid ${audience === k ? ACCENT : ACCENT + "33"}`,
                      borderRadius: 20,
                      color: audience === k ? ACCENT_LIGHT : SUBTITLE_COLOR,
                      padding: "5px 12px",
                      fontSize: "clamp(11px,1.4vw,12px)",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                    }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                  Adjust Your Appeal Mix
                </div>
                {[["ethos", "Ethos — Credibility", ethos, "#3b82f6"], ["pathos", "Pathos — Emotion", pathos, ACCENT], ["logos", "Logos — Reason", logos, "#eab308"]].map(([mode, label, val, col]) => (
                  <div key={mode} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "clamp(12px,1.7vw,14px)", color: col }}>{label}</span>
                      <span style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, fontVariantNumeric: "tabular-nums" }}>{val}%</span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={val}
                      onChange={e => handleSlider(mode, e.target.value)}
                      style={{ width: "100%", accentColor: col, cursor: "pointer" }}
                    />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginTop: 4 }}>
                      <div style={{ height: "100%", width: `${val}%`, background: col, borderRadius: 3, transition: "width 0.3s" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Triangle Visualization */}
              <div style={{ marginBottom: 20 }}>
                <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: 320, display: "block", margin: "0 auto" }}>
                  {/* Background triangle */}
                  <polygon points="150,20 20,220 280,220" fill="rgba(255,255,255,0.03)" stroke={ACCENT + "33"} strokeWidth="1" />
                  {/* Dynamic inner triangle based on values */}
                  {(() => {
                    const eN = ethos / 100, pN = pathos / 100, lN = logos / 100;
                    const sum = eN + pN + lN || 1;
                    const e = eN / sum, p = pN / sum, l = lN / sum;
                    const apex = [150, 20]; const bl = [20, 220]; const br = [280, 220];
                    const x = apex[0] * e + bl[0] * p + br[0] * l;
                    const y = apex[1] * e + bl[1] * p + br[1] * l;
                    const ix1 = apex[0] * 0.5 + x * 0.5;
                    const iy1 = apex[1] * 0.5 + y * 0.5;
                    const ix2 = bl[0] * 0.5 + x * 0.5;
                    const iy2 = bl[1] * 0.5 + y * 0.5;
                    const ix3 = br[0] * 0.5 + x * 0.5;
                    const iy3 = br[1] * 0.5 + y * 0.5;
                    return (
                      <>
                        <polygon points={`${ix1},${iy1} ${ix2},${iy2} ${ix3},${iy3}`}
                          fill={ACCENT + "18"} stroke={ACCENT + "88"} strokeWidth="1.5" />
                        <circle cx={x} cy={y} r={8} fill={ACCENT} opacity={0.9} />
                        <circle cx={x} cy={y} r={14} fill="none" stroke={ACCENT + "55"} strokeWidth="1" />
                      </>
                    );
                  })()}
                  {/* Labels */}
                  <text x="150" y="12" textAnchor="middle" fill="#3b82f6" fontSize="12" fontFamily="Georgia, serif">Ethos</text>
                  <text x="8" y="235" textAnchor="start" fill={ACCENT} fontSize="12" fontFamily="Georgia, serif">Pathos</text>
                  <text x="292" y="235" textAnchor="end" fill="#eab308" fontSize="12" fontFamily="Georgia, serif">Logos</text>
                  {/* Corner dots */}
                  <circle cx="150" cy="20" r="4" fill="#3b82f6" opacity="0.8" />
                  <circle cx="20" cy="220" r="4" fill={ACCENT} opacity="0.8" />
                  <circle cx="280" cy="220" r="4" fill="#eab308" opacity="0.8" />
                </svg>
              </div>

              {/* Predict Impact Button */}
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <button onClick={() => setShowImpact(true)} style={{
                  background: ACCENT,
                  border: "none",
                  borderRadius: 6,
                  color: "#fff",
                  padding: "10px 28px",
                  fontSize: "clamp(12px,1.7vw,14px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  letterSpacing: 0.5,
                }}>
                  Predict Persuasive Impact
                </button>
              </div>

              {showImpact && (
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 8,
                  padding: "clamp(14px,2.5vw,20px)",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                    Predicted Impact Score
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                    <div style={{
                      fontSize: "clamp(28px,5vw,48px)",
                      fontWeight: "bold",
                      color: impactScore > 60 ? "#4ade80" : impactScore > 35 ? "#eab308" : ACCENT,
                      minWidth: 70,
                    }}>
                      {impactScore}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${impactScore}%`,
                          background: impactScore > 60 ? "#4ade80" : impactScore > 35 ? "#eab308" : ACCENT,
                          borderRadius: 6,
                          transition: "width 0.5s",
                        }} />
                      </div>
                      <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, marginTop: 6 }}>
                        out of 100 — for a {audienceLabels[audience]}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
                    {impactScore > 60
                      ? "This balance aligns well with your audience's persuasive needs. Aristotle would recognize this as kairos — the right message in the right measure for the moment."
                      : impactScore > 35
                      ? "This mix has partial alignment. Consider adjusting your dominant appeal to better match how this audience processes arguments."
                      : "This balance works against you with this audience. Your dominant appeal does not match their primary mode of receptivity — a key insight from Aristotle's audience analysis."}
                  </p>
                  <div style={{ marginTop: 12, padding: "10px 14px", background: ACCENT + "11", borderRadius: 6, borderLeft: `3px solid ${ACCENT}` }}>
                    <p style={{ margin: 0, fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, lineHeight: 1.6, fontStyle: "italic" }}>
                      Ethical note: This same framework that predicts effective persuasion applies equally to manipulative messaging. The tool is neutral; the intent is not.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(c => (
              <button key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)} style={{
                background: hoveredConcept === c.id ? ACCENT : "transparent",
                border: `1px solid ${hoveredConcept === c.id ? ACCENT : ACCENT + "66"}`,
                borderRadius: 20,
                color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                padding: "6px 14px",
                fontSize: "clamp(11px,1.5vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "background 0.2s",
              }}>
                {c.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const c = keyConcepts.find(x => x.id === hoveredConcept);
            return (
              <div style={{
                borderTop: `1px solid ${ACCENT}33`,
                paddingTop: 14,
                marginTop: 6,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  {c.label}
                </div>
                <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.7 }}>
                  {c.desc}
                </p>
              </div>
            );
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: "0 0 10px 0", lineHeight: 1.7 }}>
            Because rhetoric is content-neutral — its tools apply equally to truth and falsehood, justice and injustice — teaching rhetoric systematizes manipulation as readily as legitimate persuasion, a danger amplified enormously by modern mass media, microtargeting, and disinformation at industrial scale.
          </p>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: ACCENT_LIGHT, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the question of whether rational demonstration and rhetorical persuasion can ever fully converge, or whether the gap between ideal argument and effective communication is permanent.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button onClick={() => setEchoesOpen(!echoesOpen)} style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "clamp(12px,2.5vw,18px) clamp(16px,3vw,24px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={16} color={ACCENT} /> : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  title: "Legal Education and Trial Advocacy",
                  body: "Law schools explicitly teach Aristotle's three modes: establishing attorney credibility through court manner and expertise (ethos), crafting narratives that elicit appropriate jury emotions (pathos), and marshaling evidence and inference (logos). Trial advocacy courses are essentially applied Aristotelian rhetoric, validating his claim that persuasion in adversarial settings is a systematic discipline."
                },
                {
                  title: "Anti-Smoking and Public Health Campaigns",
                  body: "Decades of research in health communication confirm that effective campaigns combine all three modes. Surgeon General warnings provide logos through statistics; graphic warning labels deploy pathos through visceral imagery; endorsements by recognizable medical figures build ethos. Campaigns relying on logos alone consistently underperform those integrating all three modes."
                },
                {
                  title: "Vaccine Advocacy and Credible Messengers",
                  body: "Vaccination campaigns that use trusted community figures rather than distant experts demonstrate Aristotle's insight that ethos is context-dependent — credibility belongs to the audience's perception, not objective credentials. A community pastor's recommendation may carry more persuasive weight than a virologist's, precisely because the audience grants that ethos within their evaluative frame."
                },
                {
                  title: "Social Media Microtargeting and Disinformation",
                  body: "Contemporary political microtargeting operationalizes Aristotle's audience analysis at industrial scale: platforms profile users to identify their dominant receptivity mode, then deliver ethos, pathos, or logos appeals tailored to that profile. Disinformation campaigns deliberately deploy false ethos (fake experts), manufactured pathos (fabricated outrage), and distorted logos (cherry-picked statistics) — the Aristotelian toolkit weaponized."
                },
              ].map((card, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 12 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 13: Poetics, Tragedy, and the Nature of Art ───
function PoeticsTragedyArt() {
  const ACCENT = "#7E22CE";
  const ACCENT_LIGHT = "#a855f7";
  const ACCENT_DIM = "#2d1254";
  const ACCENT_MID = "#6b21a8";
  const BG = "radial-gradient(ellipse at 40% 30%, #1a0a2e 0%, #0a0a0f 100%)";

  const [selectedStory, setSelectedStory] = useState(0);
  const [catharsis, setCatharsis] = useState("purgation");
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tragedy");

  const stories = [
    {
      title: "Oedipus Rex",
      medium: "Greek Tragedy",
      hero: "Oedipus",
      hamartia: "Hubris & relentless truth-seeking",
      events: [
        { label: "Oedipus rules Thebes", phase: "beginning", x: 0.05, pity: 0.1, fear: 0.1, type: "normal" },
        { label: "Plague strikes; oracle consulted", phase: "beginning", x: 0.15, pity: 0.2, fear: 0.2, type: "normal" },
        { label: "Tiresias warns Oedipus", phase: "middle", x: 0.28, pity: 0.3, fear: 0.35, type: "normal" },
        { label: "Oedipus pursues truth relentlessly", phase: "middle", x: 0.42, pity: 0.45, fear: 0.5, type: "hamartia" },
        { label: "Messenger arrives from Corinth", phase: "middle", x: 0.55, pity: 0.55, fear: 0.65, type: "normal" },
        { label: "REVERSAL: Truth revealed", phase: "middle", x: 0.68, pity: 0.75, fear: 0.85, type: "reversal" },
        { label: "RECOGNITION: Oedipus sees himself", phase: "end", x: 0.78, pity: 0.9, fear: 0.9, type: "recognition" },
        { label: "Jocasta's death; Oedipus blinds himself", phase: "end", x: 0.88, pity: 0.95, fear: 0.8, type: "climax" },
        { label: "Catharsis", phase: "end", x: 0.97, pity: 0.5, fear: 0.4, type: "catharsis" },
      ]
    },
    {
      title: "Hamlet",
      medium: "Shakespearean Tragedy",
      hero: "Hamlet",
      hamartia: "Paralysis & over-reflection",
      events: [
        { label: "Ghost reveals murder", phase: "beginning", x: 0.05, pity: 0.15, fear: 0.2, type: "normal" },
        { label: "Hamlet vows revenge", phase: "beginning", x: 0.15, pity: 0.2, fear: 0.25, type: "normal" },
        { label: "Hamlet feigns madness", phase: "middle", x: 0.28, pity: 0.3, fear: 0.3, type: "normal" },
        { label: "Indecision and delay", phase: "middle", x: 0.42, pity: 0.4, fear: 0.45, type: "hamartia" },
        { label: "Play-within-play; Claudius exposed", phase: "middle", x: 0.55, pity: 0.5, fear: 0.55, type: "reversal" },
        { label: "Ophelia's death; Laertes' rage", phase: "middle", x: 0.67, pity: 0.7, fear: 0.65, type: "normal" },
        { label: "RECOGNITION: Hamlet accepts fate", phase: "end", x: 0.77, pity: 0.8, fear: 0.75, type: "recognition" },
        { label: "Duel: all principals die", phase: "end", x: 0.88, pity: 0.92, fear: 0.88, type: "climax" },
        { label: "Catharsis", phase: "end", x: 0.97, pity: 0.45, fear: 0.35, type: "catharsis" },
      ]
    },
    {
      title: "Breaking Bad",
      medium: "Television Drama",
      hero: "Walter White",
      hamartia: "Pride masquerading as necessity",
      events: [
        { label: "Walt learns he has cancer", phase: "beginning", x: 0.05, pity: 0.4, fear: 0.1, type: "normal" },
        { label: "Cooks meth 'for his family'", phase: "beginning", x: 0.16, pity: 0.35, fear: 0.2, type: "normal" },
        { label: "First kill; moral threshold crossed", phase: "middle", x: 0.28, pity: 0.3, fear: 0.35, type: "hamartia" },
        { label: "Heisenberg identity grows", phase: "middle", x: 0.40, pity: 0.25, fear: 0.5, type: "hamartia" },
        { label: "Jesse becomes his prisoner", phase: "middle", x: 0.53, pity: 0.2, fear: 0.65, type: "normal" },
        { label: "REVERSAL: Hank discovers truth", phase: "middle", x: 0.65, pity: 0.3, fear: 0.8, type: "reversal" },
        { label: "RECOGNITION: 'I did it for me'", phase: "end", x: 0.77, pity: 0.55, fear: 0.7, type: "recognition" },
        { label: "Walt's death; Jesse freed", phase: "end", x: 0.87, pity: 0.75, fear: 0.6, type: "climax" },
        { label: "Catharsis", phase: "end", x: 0.97, pity: 0.4, fear: 0.3, type: "catharsis" },
      ]
    },
    {
      title: "The Last of Us",
      medium: "Video Game / TV",
      hero: "Joel",
      hamartia: "Grief transformed into control",
      events: [
        { label: "Sarah's death; Joel broken", phase: "beginning", x: 0.05, pity: 0.55, fear: 0.2, type: "normal" },
        { label: "Joel tasked with Ellie", phase: "beginning", x: 0.15, pity: 0.4, fear: 0.25, type: "normal" },
        { label: "Joel's detachment", phase: "middle", x: 0.27, pity: 0.35, fear: 0.3, type: "hamartia" },
        { label: "Bond with Ellie forms", phase: "middle", x: 0.40, pity: 0.5, fear: 0.4, type: "normal" },
        { label: "Ellie's sacrifice possible", phase: "middle", x: 0.53, pity: 0.65, fear: 0.55, type: "normal" },
        { label: "REVERSAL: Joel refuses to let go", phase: "middle", x: 0.65, pity: 0.7, fear: 0.7, type: "reversal" },
        { label: "RECOGNITION: Joel lies to Ellie", phase: "end", x: 0.77, pity: 0.75, fear: 0.6, type: "recognition" },
        { label: "Uneasy peace / Season 2 consequences", phase: "end", x: 0.87, pity: 0.8, fear: 0.65, type: "climax" },
        { label: "Catharsis", phase: "end", x: 0.97, pity: 0.45, fear: 0.38, type: "catharsis" },
      ]
    }
  ];

  const catharsisInterpretations = {
    purgation: {
      label: "Purgation",
      desc: "Catharsis expels harmful emotional excess — like a medical purge. After the tragedy, pity and fear are drained from the spectator, leaving them emotionally lighter and stable.",
      ending: "A successful ending physically releases built-up emotion. The spectator leaves emptied of distress.",
      color: "#c084fc"
    },
    purification: {
      label: "Purification",
      desc: "Catharsis refines and elevates the emotions — like purifying metal. Pity and fear become more noble, better calibrated to truly pitiable and truly fearful situations.",
      ending: "A successful ending transforms the quality of emotion. The spectator leaves with more refined moral feelings.",
      color: "#a78bfa"
    },
    clarification: {
      label: "Clarification",
      desc: "Catharsis illuminates the nature of pity and fear — like clearing a foggy lens. The tragedy teaches us what these emotions truly are, making them intelligible rather than merely felt.",
      ending: "A successful ending produces understanding. The spectator leaves having grasped something true about human vulnerability.",
      color: "#818cf8"
    }
  };

  const keyConcepts = [
    { id: "mimesis", label: "Mimesis", desc: "Mimesis is not slavish copying but intelligent representation that reveals underlying patterns and possibilities. Poetry imitates not what happened but what might happen — making it more universal and philosophical than history, which records only particulars. A great tragedy mimetically shows universal truths about moral psychology through specific characters." },
    { id: "catharsis", label: "Catharsis", desc: "Catharsis is tragedy's emotional effect on the audience — but its exact meaning has been debated for 2,400 years. Aristotle uses the word in Poetics without defining it, leaving open whether tragedy purges excess emotion (purgation), refines emotional responses (purification), or produces cognitive clarity about emotional experience (clarification). The debate shapes every theory of art's social value." },
    { id: "hamartia", label: "Hamartia", desc: "Hamartia is the tragic hero's error or flaw — often translated as 'tragic flaw' but more accurately an error in judgment or action. The hero is not villainous but makes a serious mistake or miscalculation, sometimes from moral weakness, sometimes from ignorance. Hamartia makes the downfall plausible while preserving the audience's ability to identify with the hero — neither wholly virtuous nor wholly vicious." },
    { id: "unity", label: "Unity of Action", desc: "Aristotle insists the plot must have unity of action — a single complete action with beginning, middle, and end, where each part follows necessarily from the previous. He was less concerned with unity of time or place (those became neoclassical rules). Unity of action means every scene must be causally necessary: removing any part should destroy the whole." },
    { id: "reversal", label: "Reversal & Recognition", desc: "Reversal (peripeteia) is a sudden change of fortune to its opposite — prosperity to ruin or vice versa. Recognition (anagnorisis) is a change from ignorance to knowledge, especially about identity. The best plots combine both simultaneously, as in Oedipus: the messenger who arrives to bring good news precipitates both Oedipus's recognition of his true identity and his catastrophic reversal of fortune." },
    { id: "plot", label: "Plot as Soul", desc: "Aristotle calls plot the 'soul' of tragedy, ranking it above character, thought, diction, melody, and spectacle. This prioritization is polemical: against those who thought performance or poetry's music mattered most, and against Plato's focus on moral character. A tragedy with great plot and weak character is still tragedy; a performance of character study without plot structure is not. Causally ordered events, not persons, produce the emotional effect." },
  ];

  const story = stories[selectedStory];

  const phaseColor = { beginning: "#3b82f6", middle: "#f59e0b", end: "#ef4444" };
  const phaseLabel = { beginning: "Beginning", middle: "Middle", end: "End" };

  const typeStyle = {
    normal: { fill: "#ffffff", r: 5 },
    hamartia: { fill: "#f59e0b", r: 7 },
    reversal: { fill: "#ef4444", r: 9 },
    recognition: { fill: "#a855f7", r: 9 },
    climax: { fill: "#ff6b6b", r: 8 },
    catharsis: { fill: "#22d3ee", r: 8 },
  };

  const W = 800;
  const H = 260;
  const PAD = { left: 48, right: 28, top: 24, bottom: 44 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (frac) => PAD.left + frac * chartW;
  const toY = (frac) => PAD.top + (1 - frac) * chartH;

  const pityCurve = () => {
    const pts = story.events.map(e => `${toX(e.x)},${toY(e.pity)}`);
    return "M " + pts.join(" L ");
  };
  const fearCurve = () => {
    const pts = story.events.map(e => `${toX(e.x)},${toY(e.fear)}`);
    return "M " + pts.join(" L ");
  };

  const phaseRegions = [
    { label: "Beginning", start: 0, end: 0.22, color: "#3b82f6" },
    { label: "Middle", start: 0.22, end: 0.72, color: "#f59e0b" },
    { label: "End", start: 0.72, end: 1.0, color: "#ef4444" },
  ];

  return (
    <div style={{
      background: BG,
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e0f0",
      padding: "clamp(16px, 4vw, 48px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
            Part 13 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: "#f5f0ff", margin: "0 0 8px 0" }}>
            Poetics, Tragedy, and the Nature of Art
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c4b8d8", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle analyzed tragedy as mimesis of serious action that produces catharsis — revealing why plot structure, hamartia, and emotional arc remain the foundations of powerful narrative across every medium.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(20, 5, 40, 0.75)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 26px)",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,15px)", lineHeight: 1.8, color: "#d4c8e8" }}>
            Aristotle's ethics argued that developing emotional capacities — especially appropriate pity and fear — is essential to virtue and flourishing, but it needed an account of how art engages and educates those emotions rather than merely indulging or corrupting them.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 5, 35, 0.85)",
          border: `1px solid ${ACCENT}55`,
          borderRadius: 12,
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 16 }}>
            Aristotle's Plot Anatomy — Interactive Story Map
          </div>

          {/* Story selector */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {stories.map((s, i) => (
              <button key={i} onClick={() => { setSelectedStory(i); setHoveredEvent(null); }} style={{
                background: selectedStory === i ? ACCENT : "rgba(126,34,206,0.18)",
                border: `1px solid ${ACCENT}`,
                borderRadius: 20,
                padding: "5px 14px",
                color: selectedStory === i ? "#f5f0ff" : ACCENT_LIGHT,
                fontSize: "clamp(11px,1.5vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s"
              }}>
                {s.title}
              </button>
            ))}
          </div>

          {/* Hero info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div style={{ background: "rgba(126,34,206,0.15)", border: `1px solid ${ACCENT}44`, borderRadius: 8, padding: "8px 14px", flex: "1 1 160px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 4 }}>Hero</div>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#f5f0ff" }}>{story.hero}</div>
            </div>
            <div style={{ background: "rgba(126,34,206,0.15)", border: `1px solid ${ACCENT}44`, borderRadius: 8, padding: "8px 14px", flex: "2 1 220px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 4 }}>Hamartia</div>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#f5f0ff" }}>{story.hamartia}</div>
            </div>
            <div style={{ background: "rgba(126,34,206,0.15)", border: `1px solid ${ACCENT}44`, borderRadius: 8, padding: "8px 14px", flex: "1 1 120px" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 4 }}>Medium</div>
              <div style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#f5f0ff" }}>{story.medium}</div>
            </div>
          </div>

          {/* SVG Chart */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", maxWidth: "100%" }}>
              {/* Phase background regions */}
              {phaseRegions.map((region, ri) => (
                <rect key={ri}
                  x={toX(region.start)}
                  y={PAD.top}
                  width={toX(region.end) - toX(region.start)}
                  height={chartH}
                  fill={region.color}
                  fillOpacity={0.06}
                />
              ))}
              {/* Phase labels at bottom */}
              {phaseRegions.map((region, ri) => (
                <text key={ri}
                  x={(toX(region.start) + toX(region.end)) / 2}
                  y={H - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fill={region.color}
                  opacity={0.85}
                  fontFamily="Georgia, serif"
                >
                  {region.label}
                </text>
              ))}
              {/* Phase dividers */}
              <line x1={toX(0.22)} y1={PAD.top} x2={toX(0.22)} y2={PAD.top + chartH} stroke="#3b82f6" strokeDasharray="4,4" strokeOpacity={0.4} />
              <line x1={toX(0.72)} y1={PAD.top} x2={toX(0.72)} y2={PAD.top + chartH} stroke="#ef4444" strokeDasharray="4,4" strokeOpacity={0.4} />
              {/* Y axis labels */}
              <text x={PAD.left - 6} y={toY(1.0)} textAnchor="end" fontSize={9} fill="#9a8cb8" fontFamily="Georgia, serif">High</text>
              <text x={PAD.left - 6} y={toY(0.0) + 4} textAnchor="end" fontSize={9} fill="#9a8cb8" fontFamily="Georgia, serif">Low</text>
              <text x={PAD.left - 6} y={toY(0.5)} textAnchor="end" fontSize={9} fill="#9a8cb8" fontFamily="Georgia, serif">Med</text>
              {/* Axis */}
              <line x1={PAD.left} y1={PAD.top + chartH} x2={PAD.left + chartW} y2={PAD.top + chartH} stroke="#ffffff22" />
              <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + chartH} stroke="#ffffff22" />
              {/* Pity line */}
              <path d={pityCurve()} fill="none" stroke="#c084fc" strokeWidth={2.2} strokeOpacity={0.85} />
              {/* Fear line */}
              <path d={fearCurve()} fill="none" stroke="#f472b6" strokeWidth={2.2} strokeOpacity={0.85} strokeDasharray="6,3" />
              {/* Catharsis interpretation overlay */}
              {catharsis === "purgation" && (
                <rect x={toX(0.90)} y={PAD.top} width={toX(1.0) - toX(0.90)} height={chartH} fill="#22d3ee" fillOpacity={0.08} />
              )}
              {catharsis === "purification" && (
                <rect x={toX(0.85)} y={PAD.top} width={toX(1.0) - toX(0.85)} height={chartH} fill="#a78bfa" fillOpacity={0.1} />
              )}
              {catharsis === "clarification" && (
                <rect x={toX(0.80)} y={PAD.top} width={toX(1.0) - toX(0.80)} height={chartH} fill="#818cf8" fillOpacity={0.1} />
              )}
              {/* Event dots */}
              {story.events.map((e, i) => {
                const ts = typeStyle[e.type];
                const isHovered = hoveredEvent === i;
                return (
                  <g key={i}>
                    <circle
                      cx={toX(e.x)}
                      cy={toY(e.pity)}
                      r={isHovered ? ts.r + 3 : ts.r}
                      fill={ts.fill}
                      fillOpacity={isHovered ? 1 : 0.85}
                      stroke={isHovered ? ACCENT_LIGHT : "rgba(255,255,255,0.2)"}
                      strokeWidth={isHovered ? 2 : 1}
                      style={{ cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={() => setHoveredEvent(i)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      onClick={() => setHoveredEvent(hoveredEvent === i ? null : i)}
                    />
                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={Math.min(toX(e.x) - 80, W - PAD.right - 162)}
                          y={toY(e.pity) - 46}
                          width={162}
                          height={40}
                          rx={5}
                          fill="#1a0a2e"
                          stroke={ACCENT}
                          strokeWidth={1}
                          opacity={0.97}
                        />
                        <text
                          x={Math.min(toX(e.x) - 80, W - PAD.right - 162) + 8}
                          y={toY(e.pity) - 30}
                          fontSize={9.5}
                          fill="#f0e8ff"
                          fontFamily="Georgia, serif"
                        >
                          {e.label.length > 26 ? e.label.substring(0, 26) + "…" : e.label}
                        </text>
                        <text
                          x={Math.min(toX(e.x) - 80, W - PAD.right - 162) + 8}
                          y={toY(e.pity) - 15}
                          fontSize={8.5}
                          fill={ACCENT_LIGHT}
                          fontFamily="Georgia, serif"
                        >
                          Pity: {Math.round(e.pity * 100)}% | Fear: {Math.round(e.fear * 100)}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              {/* Fear dots (secondary) */}
              {story.events.map((e, i) => (
                <circle key={`fear-${i}`}
                  cx={toX(e.x)}
                  cy={toY(e.fear)}
                  r={3}
                  fill="#f472b6"
                  fillOpacity={0.7}
                />
              ))}
              {/* Legend */}
              <circle cx={PAD.left + 8} cy={PAD.top - 8} r={4} fill="#c084fc" />
              <text x={PAD.left + 16} y={PAD.top - 4} fontSize={9} fill="#c084fc" fontFamily="Georgia, serif">Pity arc</text>
              <circle cx={PAD.left + 72} cy={PAD.top - 8} r={4} fill="#f472b6" />
              <text x={PAD.left + 80} y={PAD.top - 4} fontSize={9} fill="#f472b6" fontFamily="Georgia, serif">Fear arc (dashed)</text>
            </svg>
          </div>

          {/* Event type legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, marginBottom: 16 }}>
            {[
              { type: "hamartia", label: "Hamartia moment", color: "#f59e0b" },
              { type: "reversal", label: "Reversal", color: "#ef4444" },
              { type: "recognition", label: "Recognition", color: "#a855f7" },
              { type: "climax", label: "Climax", color: "#ff6b6b" },
              { type: "catharsis", label: "Catharsis", color: "#22d3ee" },
            ].map(item => (
              <div key={item.type} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                <span style={{ fontSize: "clamp(10px,1.4vw,12px)", color: "#b8b0c8" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Catharsis interpretation toggle */}
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            padding: "clamp(12px,2vw,18px)"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 12 }}>
              Catharsis Interpretation — How Does the Tragedy Succeed?
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              {Object.entries(catharsisInterpretations).map(([key, val]) => (
                <button key={key} onClick={() => setCatharsis(key)} style={{
                  background: catharsis === key ? ACCENT : "rgba(126,34,206,0.15)",
                  border: `1px solid ${ACCENT}`,
                  borderRadius: 16,
                  padding: "5px 16px",
                  color: catharsis === key ? "#f0ead8" : ACCENT_LIGHT,
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif"
                }}>
                  {val.label}
                </button>
              ))}
            </div>
            <div style={{
              background: "rgba(126,34,206,0.1)",
              borderLeft: `3px solid ${catharsisInterpretations[catharsis].color}`,
              borderRadius: "0 6px 6px 0",
              padding: "12px 16px"
            }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "clamp(12px,1.7vw,14px)", color: "#d8d0ee", lineHeight: 1.7 }}>
                {catharsisInterpretations[catharsis].desc}
              </p>
              <p style={{ margin: 0, fontSize: "clamp(11px,1.5vw,13px)", color: catharsisInterpretations[catharsis].color, lineHeight: 1.6, fontStyle: "italic" }}>
                What counts as a successful ending: {catharsisInterpretations[catharsis].ending}
              </p>
            </div>
          </div>

          {/* Cross-media tab */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 0 }}>
              {["tragedy", "game"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background: activeTab === tab ? "rgba(126,34,206,0.35)" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${ACCENT}${activeTab === tab ? "88" : "33"}`,
                  borderBottom: activeTab === tab ? "1px solid rgba(15,5,35,0.85)" : `1px solid ${ACCENT}33`,
                  borderRadius: "8px 8px 0 0",
                  padding: "8px 18px",
                  color: activeTab === tab ? ACCENT_LIGHT : "#9a8cb8",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif"
                }}>
                  {tab === "tragedy" ? "Classic Tragedy" : "Video Game Narrative"}
                </button>
              ))}
            </div>
            <div style={{
              background: "rgba(126,34,206,0.08)",
              border: `1px solid ${ACCENT}44`,
              borderRadius: "0 8px 8px 8px",
              padding: "clamp(14px,2.5vw,20px)"
            }}>
              {activeTab === "tragedy" ? (
                <div>
                  <p style={{ margin: "0 0 10px 0", fontSize: "clamp(12px,1.7vw,14px)", color: "#d0c4e8", lineHeight: 1.75 }}>
                    Aristotle identified six elements of tragedy ranked by importance: Plot (mythos) as the soul of drama, then Character (ethos), Thought (dianoia), Diction (lexis), Melody (melopoiia), and Spectacle (opsis). The prioritization was polemical — against Plato, who focused on character's moral effect, and against stagecraft enthusiasts who valued spectacle.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Plot (Soul)", "Character", "Thought", "Diction", "Melody", "Spectacle"].map((el, i) => (
                      <div key={i} style={{
                        background: `rgba(126,34,206,${0.35 - i * 0.05})`,
                        border: `1px solid ${ACCENT}${["88", "66", "55", "44", "33", "22"][i]}`,
                        borderRadius: 6,
                        padding: "6px 12px",
                        fontSize: "clamp(10px,1.4vw,12px)",
                        color: ["#f5f0ff", "#e2d8f8", "#ccc0e8", "#b8b0d8", "#a8a0c8", "#9890b8"][i]
                      }}>
                        {i + 1}. {el}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ margin: "0 0 12px 0", fontSize: "clamp(12px,1.7vw,14px)", color: "#d0c4e8", lineHeight: 1.75 }}>
                    Video game narrative design rediscovers Aristotle: the best story games use his structural principles even when designers don't know it. The player becomes both audience and agent — experiencing catharsis through actions they chose, making hamartia feel personally motivated. Interactive branching applies Aristotelian unity of action to multiple possible paths.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { aristotle: "Unity of Action", game: "Critical path / main quest chain — every branch must reconnect causally" },
                      { aristotle: "Reversal (Peripeteia)", game: "Plot twist mechanic — fortune changes direction through player discovery" },
                      { aristotle: "Recognition (Anagnorisis)", game: "The reveal moment — player learns true identity, motive, or consequence" },
                      { aristotle: "Hamartia", game: "Player's defining moral choice creates the flaw that returns as consequence" },
                      { aristotle: "Catharsis", game: "Post-credits emotional resolution — players report lingering feeling of meaningful release" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", gap: 0, borderRadius: 6, overflow: "hidden" }}>
                        <div style={{ background: "rgba(126,34,206,0.3)", padding: "7px 12px", flex: "0 0 36%", fontSize: "clamp(10px,1.4vw,12px)", color: ACCENT_LIGHT, fontWeight: "bold" }}>
                          {row.aristotle}
                        </div>
                        <div style={{ background: "rgba(0,0,0,0.25)", padding: "7px 12px", flex: 1, fontSize: "clamp(10px,1.4vw,12px)", color: "#c8c0d8" }}>
                          {row.game}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(concept => (
              <button key={concept.id}
                onClick={() => setHoveredConcept(hoveredConcept === concept.id ? null : concept.id)}
                style={{
                  background: hoveredConcept === concept.id ? ACCENT : "transparent",
                  border: `1px solid ${ACCENT}`,
                  borderRadius: 20,
                  padding: "5px 14px",
                  color: hoveredConcept === concept.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.15s"
                }}
              >
                {concept.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const c = keyConcepts.find(k => k.id === hoveredConcept);
            return c ? (
              <div style={{
                background: "rgba(126,34,206,0.12)",
                border: `1px solid ${ACCENT}55`,
                borderRadius: 8,
                padding: "14px 18px",
                marginTop: 4
              }}>
                <div style={{ fontSize: "clamp(13px,1.8vw,15px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{c.label}</div>
                <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", color: "#c8c0e0", lineHeight: 1.75 }}>{c.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20, 5, 40, 0.75)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 26px)",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 10px 0", fontSize: "clamp(13px,1.8vw,15px)", lineHeight: 1.8, color: "#d4c8e8" }}>
            Aristotle's formalism — prioritizing plot structure over character, theme, and social context — became prescriptive neoclassical rules that constrained theater for centuries. The three unities (action, time, place) were enforced as law rather than observation, strangling dramatic experimentation across Europe from the 16th through 18th centuries.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", lineHeight: 1.75, color: "#b8a8d0", fontStyle: "italic" }}>
            Meanwhile, the unclear catharsis concept and narrow focus on tragedy and epic left large domains of aesthetic experience — abstract art, music, comedy, interactive narrative — undertheorized or unexplained. This pressure forces the next development: a broader philosophy of aesthetic experience beyond narrative form.
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color={ACCENT_LIGHT} />
              : <ChevronDown size={16} color={ACCENT_LIGHT} />}
          </button>
          {echosOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  title: "Oedipus Rex: Aristotle's Perfect Tragedy",
                  body: "Aristotle treats Sophocles' Oedipus Rex as the paradigm case throughout the Poetics. It combines reversal and recognition in a single moment — the messenger's arrival — with maximum efficiency, and its hamartia (the relentless pursuit of truth that destroys Oedipus) is inseparable from his greatest virtue. Aristotle noted this structural perfection even while acknowledging the myth was old and familiar."
                },
                {
                  title: "Hollywood's Three-Act Structure",
                  body: "The three-act structure dominating Hollywood film and television is an Aristotelian inheritance. Syd Field's Screenwriter's Workshop, Robert McKee's Story, and Blake Snyder's Save the Cat all teach beginning-middle-end with crisis, climax, and resolution — directly descended from Aristotle's account of unity of action. Studio development notes routinely flag 'act breaks' and 'the turn' in Aristotelian terms."
                },
                {
                  title: "Video Game Narrative Design",
                  body: "Game narrative designers increasingly cite Aristotelian principles explicitly. The concept of the 'ludonarrative arc' maps hamartia onto player moral choices whose consequences return as plot consequences. Games like The Last of Us, Disco Elysium, and Spec Ops: The Line deliberately engineer recognition scenes where players confront the meaning of their earlier choices — the interactive form making anagnorisis viscerally personal."
                },
                {
                  title: "Martha Nussbaum on Tragic Emotions",
                  body: "Martha Nussbaum's Upheavals of Thought and The Fragility of Goodness develop Aristotle's insight that tragedy cultivates moral emotions. Nussbaum argues that engaging with tragedy teaches us that good people can suffer undeserved misfortune, that luck is real and morally significant, and that appropriate pity requires recognizing our shared vulnerability — making literary education indispensable to ethical formation."
                }
              ].map((card, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px"
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{card.title}</div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 13 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 14: Aristotle's Legacy and His Influence Through History ───
function AristotleLegacyHistory() {
  const ACCENT = "#A16207";
  const ACCENT_LIGHT = "#D4A017";
  const ACCENT_DIM = "#3a2402";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#c8b89a";
  const BG = "radial-gradient(ellipse at 40% 30%, #2a1600 0%, #0a0a0f 100%)";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(1), 300);
    return () => clearTimeout(t);
  }, []);

  const keyConcepts = [
    { id: "transmission", label: "Transmission of Texts", desc: "After Aristotle's death, his lecture notes were stored in a cellar, damaged by moisture, and nearly lost. Andronicus of Rhodes edited and organized the surviving corpus around 60 BCE, creating the canonical texts we still read — meaning almost everything we have of Aristotle passed through this single editorial act. Without it, Western philosophy would look radically different." },
    { id: "averroes", label: "Islamic Aristotelianism", desc: "Averroes (Ibn Rushd) and Avicenna (Ibn Sina) preserved Aristotle's complete works when European Christians knew only fragments of his logic. Averroes wrote such authoritative commentaries that Dante simply called him 'the Commentator.' Islamic philosophers extended, corrected, and deeply engaged Aristotle rather than merely copying him, producing original metaphysics and epistemology in dialogue with his framework." },
    { id: "aquinas", label: "Aquinas's Synthesis", desc: "Thomas Aquinas achieved the most ambitious intellectual synthesis of the medieval world: fusing Aristotle's pagan philosophy with Christian theology. He argued that reason (Aristotle) and faith (scripture) were complementary routes to truth. This made Aristotle the official philosopher of the Catholic Church, embedding his categories — substance, form, essence, potency — into the very structure of Christian doctrine." },
    { id: "scholastic", label: "Scholastic Dominance", desc: "Medieval universities organized their entire curricula around Aristotle's works. Logic, natural philosophy, ethics, and metaphysics were all taught through his texts. This dominance was so total that 'the Philosopher' with no further identification meant Aristotle alone. For three centuries, to dispute Aristotle was to dispute the educational establishment itself." },
    { id: "revolution", label: "Scientific Revolution", desc: "Galileo, Descartes, and Newton defined their project partly through rejecting Aristotelian physics — his doctrines of natural place, the unmoved mover, and the distinction between celestial and terrestrial motion. Yet the rejection was selective: his logic, ethics, rhetoric, and biological concepts retained influence. The scientific revolution overthrew Aristotle's answers while leaving his questions standing." },
    { id: "revival", label: "20th Century Revival", desc: "MacIntyre's After Virtue (1981) sparked a neo-Aristotelian renaissance in ethics by arguing that modern moral philosophy had collapsed without the teleological framework Aristotle provided. Nussbaum's capabilities approach applied Aristotelian flourishing to development economics. Philosophers of mind rediscovered hylomorphism; metaphysicians revisited his essentialism — showing his questions outlast his answers." },
  ];

  const historyNodes = [
    { id: "death", year: -322, label: "Death & Near-Loss", shortLabel: "322 BCE", x: 4, figure: "Aristotle dies in Chalcis. His library and lecture notes are bequeathed to Theophrastus, then descend through a chain of custody that ends in a cellar — stored to avoid Macedonian confiscation, damaged by moisture and insects. For two centuries the corpus nearly vanishes.", kept: "Biological observation methods, logical works circulate separately", transformed: "Lecture notes deteriorate and are partially lost", rejected: "Public dialogues (now lost) once made him famous" },
    { id: "andronicus", year: -60, label: "Andronicus of Rhodes", shortLabel: "~60 BCE", x: 11, figure: "Andronicus edits the surviving lecture notes into the canonical corpus, inventing the term 'metaphysics' (ta meta ta physika — 'the things after the physics'). Every Aristotle text we read passed through his editorial judgment. He organized works by topic, created the titles, and shaped how posterity would understand Aristotle's system.", kept: "Surviving lecture notes on logic, physics, biology, ethics, metaphysics", transformed: "Raw lecture notes organized into treatises with imposed structure", rejected: "Public dialogues and popular writings left aside" },
    { id: "avicenna", year: 1000, label: "Avicenna (Ibn Sina)", shortLabel: "~1000 CE", x: 30, figure: "Avicenna claims to have read the Metaphysics forty times without understanding it until he read Al-Farabi's commentary. He then produced original extensions of Aristotle in medicine, psychology, and metaphysics — his distinction between essence and existence became central to medieval theology. He read Aristotle as a basis for a complete philosophical system integrating science, theology, and mysticism.", kept: "Hylomorphism, logic, theory of the soul, natural philosophy", transformed: "Essence/existence distinction extended far beyond Aristotle", rejected: "Aristotle's denial of individual immortality" },
    { id: "averroes", year: 1180, label: "Averroes (Ibn Rushd)", shortLabel: "1180 CE", x: 38, figure: "Averroes wrote short, middle, and long commentaries on virtually every Aristotle text, earning the title 'the Commentator' in Dante's Divine Comedy. He argued for the unity of the intellect — one shared active intellect for all humanity — which scandalized Christian theologians. His translations and commentaries were the primary vehicle through which Aristotle entered the Latin West in the 12th century.", kept: "Aristotelian logic as the definitive method of reasoning", transformed: "Psychology radically revised toward collective intellect", rejected: "Personal individual immortality of the soul" },
    { id: "aquinas", year: 1265, label: "Thomas Aquinas", shortLabel: "1265 CE", x: 46, figure: "Aquinas wrote detailed commentaries on Aristotle and integrated his philosophy into Christian theology in the Summa Theologica. He argued that Aristotle's account of final causality and the unmoved mover was compatible with — indeed pointed toward — Christian creation and providence. He made Aristotle the official philosopher of Catholicism, a status formalized at the Council of Trent and confirmed by Leo XIII's encyclical Aeterni Patris (1879).", kept: "Form, matter, substance, actuality, potency, teleology, the good", transformed: "Prime mover becomes the Christian God of creation ex nihilo", rejected: "Aristotle's eternity of the world (incompatible with Genesis)" },
    { id: "universities", year: 1300, label: "Scholastic Universities", shortLabel: "1300 CE", x: 52, figure: "Medieval universities — Paris, Oxford, Bologna — organized their curricula entirely around Aristotle. The Arts faculty taught his logic, natural philosophy, and ethics as the foundation for theology and law. Being a university-educated person meant having absorbed Aristotle. The Condemnation of 1277, which censured 219 propositions (many Aristotelian), shows how central — and how dangerous — his dominance had become.", kept: "Entire curriculum structure, logic, natural philosophy, ethics", transformed: "Aristotle's naturalism filtered through theological necessity", rejected: "His most materialist and anti-providential doctrines" },
    { id: "galileo", year: 1632, label: "Galileo", shortLabel: "1632 CE", x: 65, figure: "Galileo's Dialogue Concerning the Two Chief World Systems (1632) is organized as a debate between a defender of Aristotle (Simplicio) and a Copernican. He systematically demolishes Aristotelian physics: things don't move toward natural places, the heavens are not made of different stuff from earth, heavier objects don't fall faster. His method of mathematical idealization directly contradicts Aristotle's physics. Yet Galileo retained Aristotelian categories of demonstration and logical argument.", kept: "Logical rigor, structure of scientific demonstration", transformed: "Empirical observation combined with mathematics replaces qualitative physics", rejected: "Natural place, natural motion, qualitative physics, geocentrism" },
    { id: "newton", year: 1687, label: "Newton", shortLabel: "1687 CE", x: 72, figure: "Newton's Principia Mathematica (1687) completed the overthrow of Aristotelian cosmology. Universal gravitation showed that the same laws govern celestial and terrestrial motion — obliterating Aristotle's distinction. Inertia contradicted natural motion. The clockwork universe replaced the teleological cosmos. Yet Newtonian science retained something Aristotelian: the search for universal necessary laws governing natural kinds.", kept: "Universal laws of nature, systematic explanation of motion", transformed: "Teleology replaced by mechanical causation and mathematics", rejected: "Teleological cosmology, natural place, celestial/terrestrial distinction" },
    { id: "macintyre", year: 1981, label: "MacIntyre", shortLabel: "1981 CE", x: 88, figure: "Alasdair MacIntyre's After Virtue (1981) argued that modern moral philosophy had collapsed into incoherence because it inherited Aristotelian moral concepts (virtue, human nature, the good) while rejecting the teleological framework that made them intelligible. His proposed solution: return to an Aristotelian virtue ethics grounded in practices and community. This sparked a major revival of virtue ethics in Anglo-American philosophy.", kept: "Virtue, teleology, human flourishing, the role of community", transformed: "Aristotelian ethics reconstructed for pluralist modern societies", rejected: "Aristotle's biological essentialism and exclusion of women and slaves" },
    { id: "nussbaum", year: 1995, label: "Nussbaum & Revival", shortLabel: "1995 CE", x: 96, figure: "Martha Nussbaum's capabilities approach applies Aristotelian flourishing (eudaimonia) to development economics and human rights, asking what capabilities a dignified human life requires. Simultaneously: David Braine and others revive hylomorphism in philosophy of mind; Kit Fine and E.J. Lowe revive Aristotelian essentialism in metaphysics; neo-Aristotelian naturalism flourishes in ethics. Aristotle's questions — what is a substance? what is the good? what is the soul? — prove more durable than his answers.", kept: "Eudaimonia, capabilities, function, essence, hylomorphism", transformed: "Applied to global justice, disability, development economics", rejected: "Specific biological claims, hierarchical politics, exclusionary definitions" },
  ];

  const riverPath = (t) => {
    const steps = [
      { pct: 0.04, width: 18, y: 0.5 },
      { pct: 0.11, width: 4, y: 0.5 },
      { pct: 0.20, width: 6, y: 0.5 },
      { pct: 0.30, width: 12, y: 0.42 },
      { pct: 0.38, width: 16, y: 0.45 },
      { pct: 0.46, width: 22, y: 0.5 },
      { pct: 0.52, width: 26, y: 0.5 },
      { pct: 0.65, width: 14, y: 0.45 },
      { pct: 0.72, width: 10, y: 0.48 },
      { pct: 0.88, width: 24, y: 0.5 },
      { pct: 0.96, width: 32, y: 0.5 },
    ];
    return steps;
  };

  const eraLabels = [
    { label: "Greek", pct: 0.07, color: "#8B6914" },
    { label: "Hellenistic", pct: 0.18, color: "#8B6914" },
    { label: "Islamic Golden Age", pct: 0.34, color: "#C17A20" },
    { label: "Medieval", pct: 0.49, color: "#C17A20" },
    { label: "Scientific Revolution", pct: 0.685, color: "#6B7C93" },
    { label: "Modern Revival", pct: 0.92, color: "#A16207" },
  ];

  const streams = [
    { label: "Virtue Ethics", x: 90, y: 0.32 },
    { label: "Phil. of Mind", x: 93, y: 0.42 },
    { label: "Metaphysics", x: 92, y: 0.52 },
    { label: "Political Phil.", x: 90, y: 0.62 },
    { label: "Rhetoric", x: 88, y: 0.70 },
  ];

  const W = 900;
  const H = 340;

  const getNodeX = (node) => (node.x / 100) * W;
  const getNodeY = () => H * 0.5;

  const riverSegments = () => {
    const pts = riverPath();
    return pts.map(p => ({ x: p.pct * W, y: p.y * H, w: p.width }));
  };

  const segs = riverSegments();

  const buildRiverPoly = () => {
    const top = segs.map(s => `${s.x},${s.y - s.w}`).join(" ");
    const bot = [...segs].reverse().map(s => `${s.x},${s.y + s.w}`).join(" ");
    return top + " " + bot;
  };

  const buildCellarDip = () => {
    const x1 = 0.06 * W, x2 = 0.22 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.72} ${x2} ${H * 0.5}`;
  };

  const buildIslamicBulge = () => {
    const x1 = 0.25 * W, x2 = 0.55 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.25} ${x2} ${H * 0.5}`;
  };

  const buildRevDip = () => {
    const x1 = 0.58 * W, x2 = 0.80 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.68} ${x2} ${H * 0.5}`;
  };

  const buildFanStreams = () => {
    return streams.map((s, i) => {
      const startX = 0.82 * W;
      const endX = (s.x / 100) * W;
      const endY = s.y * H;
      return `M ${startX} ${H * 0.5} Q ${(startX + endX) / 2 + 10} ${endY - 10} ${endX} ${endY}`;
    });
  };

  const fanPaths = buildFanStreams();

  return (
    <div style={{
      background: BG,
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 14 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Aristotle's Legacy and His Influence Through History
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            From near-disappearance after his death to Islamic preservation, medieval synthesis with Christianity, and modern revival, Aristotle's influence is the story of Western intellectual history itself.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: 0 }}>
            Aristotle's comprehensive system needed transmission across time, cultural translation across radically different civilizations, and integration with religious worldviews that his pagan philosophy never anticipated — and his errors needed eventual overthrow without losing his genuine insights.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 10,
          padding: "clamp(14px,2.5vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            The River of Influence — 322 BCE to Present
          </div>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#9a8870", margin: "0 0 18px 0", lineHeight: 1.6 }}>
            Click any figure on the timeline to see how they engaged with Aristotle — what they kept, transformed, or rejected.
          </p>

          {/* SVG Timeline */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <svg viewBox={`0 0 ${W} ${H + 80}`} width="100%" style={{ display: "block", minWidth: 320 }}>
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a2800" stopOpacity="0.3" />
                  <stop offset="25%" stopColor={ACCENT} stopOpacity="0.5" />
                  <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.7" />
                  <stop offset="65%" stopColor="#4a6080" stopOpacity="0.4" />
                  <stop offset="80%" stopColor="#3a3a2a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="islamicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity="0.0" />
                  <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="softglow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background eras */}
              <rect x="0" y="0" width={W * 0.24} height={H} fill="#1a0e00" opacity="0.4" />
              <rect x={W * 0.24} y="0" width={W * 0.34} height={H} fill="#1a1000" opacity="0.3" />
              <rect x={W * 0.58} y="0" width={W * 0.24} height={H} fill="#0a1020" opacity="0.4" />
              <rect x={W * 0.82} y="0" width={W * 0.18} height={H} fill="#100e00" opacity="0.3" />

              {/* Era labels */}
              {eraLabels.map((era, i) => (
                <text key={i} x={era.pct * W} y={H - 10} textAnchor="middle"
                  fontSize="9" fill={era.color} opacity="0.7" fontFamily="Georgia, serif"
                  letterSpacing="1">
                  {era.label}
                </text>
              ))}

              {/* Main river body */}
              <polygon
                points={buildRiverPoly()}
                fill="url(#riverGrad)"
                opacity={animStep >= 1 ? 0.85 : 0}
                style={{ transition: "opacity 1.5s ease" }}
              />

              {/* Cellar dip annotation */}
              <path d={buildCellarDip()} fill="none" stroke="#6b4010" strokeWidth="2"
                strokeDasharray="5,4" opacity="0.6" />
              <text x={W * 0.13} y={H * 0.82} textAnchor="middle" fontSize="8.5"
                fill="#8B6010" fontFamily="Georgia, serif" fontStyle="italic">
                underground (cellar)
              </text>

              {/* Islamic bulge annotation */}
              <path d={buildIslamicBulge()} fill="none" stroke={ACCENT_LIGHT} strokeWidth="1.5"
                strokeDasharray="6,3" opacity="0.5" />
              <text x={W * 0.40} y={H * 0.18} textAnchor="middle" fontSize="8.5"
                fill={ACCENT_LIGHT} fontFamily="Georgia, serif" fontStyle="italic">
                preserved & extended
              </text>

              {/* Scientific revolution dip */}
              <path d={buildRevDip()} fill="none" stroke="#5a7090" strokeWidth="2"
                strokeDasharray="5,4" opacity="0.5" />
              <text x={W * 0.69} y={H * 0.75} textAnchor="middle" fontSize="8.5"
                fill="#7090a0" fontFamily="Georgia, serif" fontStyle="italic">
                contested & reduced
              </text>

              {/* Fan streams */}
              {fanPaths.map((path, i) => (
                <path key={i} d={path} fill="none"
                  stroke={ACCENT_LIGHT} strokeWidth="1.2" opacity="0.55"
                  strokeDasharray="4,3" />
              ))}
              {streams.map((s, i) => (
                <text key={i}
                  x={(s.x / 100) * W + 4}
                  y={s.y * H + 4}
                  fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif" opacity="0.85">
                  {s.label}
                </text>
              ))}

              {/* Timeline axis */}
              <line x1="0" y1={H * 0.5} x2={W} y2={H * 0.5} stroke="#3a2a10" strokeWidth="1" opacity="0.4" />

              {/* Historical nodes */}
              {historyNodes.map((node, i) => {
                const nx = getNodeX(node);
                const ny = getNodeY();
                const isSelected = selectedNode && selectedNode.id === node.id;
                const isHovered = hoveredNode === node.id;
                const r = isSelected ? 11 : isHovered ? 9 : 7;
                return (
                  <g key={node.id} style={{ cursor: "pointer" }}
                    onClick={() => setSelectedNode(isSelected ? null : node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}>
                    {(isSelected || isHovered) && (
                      <circle cx={nx} cy={ny} r={r + 8} fill={ACCENT} opacity="0.2" filter="url(#softglow)" />
                    )}
                    <circle cx={nx} cy={ny} r={r}
                      fill={isSelected ? ACCENT_LIGHT : isHovered ? ACCENT : "#2a1600"}
                      stroke={isSelected ? ACCENT_LIGHT : ACCENT}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      filter={isSelected ? "url(#glow)" : "none"}
                    />
                    <line x1={nx} y1={ny - r} x2={nx} y2={H * 0.5 - 28}
                      stroke={ACCENT} strokeWidth="0.8" opacity="0.45" />
                    <text x={nx} y={H * 0.5 - 32} textAnchor="middle"
                      fontSize="8.5" fill={isSelected ? ACCENT_LIGHT : "#b09060"}
                      fontFamily="Georgia, serif"
                      fontWeight={isSelected ? "bold" : "normal"}>
                      {node.shortLabel}
                    </text>
                    <text x={nx} y={H * 0.5 - 42} textAnchor="middle"
                      fontSize="8" fill={isSelected ? TITLE_COLOR : "#9a8060"}
                      fontFamily="Georgia, serif">
                      {node.label.length > 14 ? node.label.slice(0, 13) + "…" : node.label}
                    </text>
                  </g>
                );
              })}

              {/* Time axis labels */}
              <text x={4} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif">322 BCE</text>
              <text x={W - 4} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif" textAnchor="end">Present</text>
              <text x={W * 0.5} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif" textAnchor="middle">1000 CE</text>
            </svg>
          </div>

          {/* Selected node profile */}
          {selectedNode && (
            <div style={{
              marginTop: 20,
              background: "rgba(20,12,0,0.7)",
              border: `1px solid ${ACCENT}66`,
              borderRadius: 8,
              padding: "clamp(14px,2.5vw,20px)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>
                    Figure Profile
                  </div>
                  <div style={{ fontSize: "clamp(15px,2.2vw,18px)", color: ACCENT_LIGHT, marginBottom: 4, fontWeight: "bold" }}>
                    {selectedNode.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#7a6040", marginBottom: 12 }}>{selectedNode.shortLabel}</div>
                </div>
                <button onClick={() => setSelectedNode(null)} style={{
                  background: "transparent", border: `1px solid ${ACCENT}44`,
                  color: ACCENT, borderRadius: 4, padding: "4px 10px",
                  cursor: "pointer", fontSize: 11, fontFamily: "Georgia, serif"
                }}>close ×</button>
              </div>
              <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: "0 0 16px 0" }}>
                {selectedNode.figure}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                {[
                  { label: "Kept", text: selectedNode.kept, color: "#4a8040" },
                  { label: "Transformed", text: selectedNode.transformed, color: ACCENT },
                  { label: "Rejected", text: selectedNode.rejected, color: "#804040" },
                ].map(col => (
                  <div key={col.label} style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${col.color}44`,
                    borderRadius: 6,
                    padding: "10px 12px",
                  }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: col.color, marginBottom: 6 }}>{col.label}</div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#a09878", lineHeight: 1.7 }}>{col.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedNode && (
            <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#6a5838", fontStyle: "italic" }}>
              Select a figure above to see their relationship with Aristotle's corpus
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => {
              const active = hoveredConcept === kc.id;
              return (
                <button key={kc.id}
                  onClick={() => setHoveredConcept(active ? null : kc.id)}
                  style={{
                    background: active ? ACCENT : "transparent",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: active ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(11px,1.5vw,13px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "background 0.2s, color 0.2s",
                  }}>
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(k => k.id === hoveredConcept);
            return kc ? (
              <div style={{
                marginTop: 12,
                padding: "14px 16px",
                background: `${ACCENT}11`,
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>{kc.label}</div>
                <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: 0 }}>{kc.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: "0 0 10px 0" }}>
            Aristotle's dominance became so absolute that his errors were treated as dogmas, actively blocking scientific progress — and even today the question of how much of his system can be selectively retrieved without its systematic unity remains unresolved, raising the question of whether neo-Aristotelian philosophy is genuine retrieval or mere appropriation of vocabulary.
          </p>
          <p style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#8a7050", margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: an assessment of what in Aristotle endures, and what the final shape of his legacy in contemporary thought actually looks like.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%", background: "transparent", border: "none",
              padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
              cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Andronicus of Rhodes (~60 BCE)", body: "Andronicus edited scattered lecture notes into the organized corpus that defines Aristotle for us today. He invented the word 'metaphysics' accidentally — it simply meant 'the books placed after the Physics.' Every Aristotle text we read is a product of his editorial decisions, meaning our entire relationship to Aristotle is mediated by a first-century scholar whose selection criteria we cannot fully reconstruct." },
                { title: "Averroes and the Latin West (12th century)", body: "Averroes' commentaries on Aristotle — translated into Latin alongside Aristotle's own texts — gave medieval Christian scholars their first systematic access to the full Aristotelian corpus. His doctrine of the unity of the intellect scandalized Christian thinkers (it seemed to deny individual immortality) but his logical and scientific commentaries became indispensable. He is the figure who made Aristotle a live presence in Western universities." },
                { title: "Galileo and the Dialogue (1632)", body: "Galileo's Dialogue Concerning the Two Chief World Systems dramatizes the conflict between Aristotelian natural philosophy and the emerging mathematical science of nature. The Aristotelian character, Simplicio, argues from natural place and qualitative motion; Salviati (Galileo's voice) argues from experiment and mathematics. The Dialogue was a cultural weapon: it made Aristotelian physics look like the position of a simpleton. The Inquisition understood the point." },
                { title: "MacIntyre's After Virtue (1981)", body: "MacIntyre's book is the founding document of contemporary virtue ethics and one of the most influential works of moral philosophy in the 20th century. He argued that modern ethics — Kantian, utilitarian, emotivist — had inherited Aristotelian vocabulary without Aristotelian teleology, producing incoherence. His solution was a return to the Aristotelian tradition, reinterpreted through the lens of social practices and communities. This sparked a generation of neo-Aristotelian work in ethics, political philosophy, and philosophy of religion." },
              ].map((card) => (
                <div key={card.title} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: `${ACCENT}0a`,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{card.title}</div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 14 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

// ─── Part 15: Where the System Breaks: Modern Critiques and Unresolved Problems ───
function WhereSystemBreaks() {
  const ACCENT = "#BE185D";
  const ACCENT_LIGHT = "#f472b6";
  const ACCENT_DIM = "#4a0a24";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [demolishedPillars, setDemolishedPillars] = useState([]);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animating, setAnimating] = useState(null);
  const [showCrackOverlay, setShowCrackOverlay] = useState([]);

  const pillars = [
    {
      id: "geocentric",
      label: "Geocentric\nPhysics",
      x: 60,
      short: "Natural Places",
      critique: "Galileo's inertia & Newtonian mechanics",
      collapses: ["physics_room", "cosmology_room"],
      cracks: ["biology_room"],
    },
    {
      id: "teleology",
      label: "Natural\nTeleology",
      x: 175,
      short: "Teleology",
      critique: "Darwin's undirected variation & selection",
      collapses: ["cosmology_room", "biology_room"],
      cracks: ["ethics_room"],
    },
    {
      id: "essentialism",
      label: "Fixed\nEssences",
      x: 290,
      short: "Essentialism",
      critique: "Evolutionary biology: species flow",
      collapses: ["biology_room", "politics_room"],
      cracks: ["ethics_room", "physics_room"],
    },
    {
      id: "substance",
      label: "Substance\nMetaphysics",
      x: 405,
      short: "Substance",
      critique: "Quantum mechanics: superposition violates actuality",
      collapses: ["physics_room", "cosmology_room"],
      cracks: ["mind_room"],
    },
    {
      id: "hylemorphism",
      label: "Hylemo-\nrphism",
      x: 520,
      short: "Hylemorphism",
      critique: "Hard problem: form alone can't explain qualia",
      collapses: ["mind_room"],
      cracks: ["ethics_room", "biology_room"],
    },
  ];

  const rooms = [
    { id: "physics_room", label: "Aristotelian\nPhysics", x: 30, y: 60, w: 120, h: 70, survivable: false },
    { id: "cosmology_room", label: "Cosmology &\nAstronomy", x: 165, y: 60, w: 120, h: 70, survivable: false },
    { id: "biology_room", label: "Fixed-Species\nBiology", x: 300, y: 60, w: 120, h: 70, survivable: false },
    { id: "mind_room", label: "Psychology &\nSoul Theory", x: 435, y: 60, w: 120, h: 70, survivable: false },
    { id: "politics_room", label: "Hierarchical\nPolitics", x: 570, y: 60, w: 110, h: 70, survivable: false },
    { id: "ethics_room", label: "Virtue\nEthics", x: 30, y: 155, w: 130, h: 70, survivable: true },
    { id: "rhetoric_room", label: "Rhetoric &\nPoetics", x: 175, y: 155, w: 130, h: 70, survivable: true },
    { id: "logic_room", label: "Logic &\nCategories", x: 320, y: 155, w: 130, h: 70, survivable: true },
    { id: "narrative_room", label: "Narrative\nTheory", x: 465, y: 155, w: 130, h: 70, survivable: true },
    { id: "practical_room", label: "Practical\nWisdom", x: 610, y: 155, w: 70, h: 70, survivable: true },
  ];

  const allCollapsed = new Set();
  const allCracked = new Set();
  demolishedPillars.forEach(pid => {
    const p = pillars.find(x => x.id === pid);
    if (p) {
      p.collapses.forEach(r => allCollapsed.add(r));
      p.cracks.forEach(r => allCracked.add(r));
    }
  });

  const handleDemolish = (pillarId) => {
    if (demolishedPillars.includes(pillarId)) {
      setDemolishedPillars(prev => prev.filter(p => p !== pillarId));
    } else {
      setAnimating(pillarId);
      setTimeout(() => {
        setDemolishedPillars(prev => [...prev, pillarId]);
        setAnimating(null);
      }, 400);
    }
  };

  const resetAll = () => {
    setDemolishedPillars([]);
    setAnimating(null);
  };

  const getRoomState = (roomId) => {
    if (allCollapsed.has(roomId)) return "collapsed";
    if (allCracked.has(roomId)) return "cracked";
    return "standing";
  };

  const getRoomColor = (roomId, survivable) => {
    const state = getRoomState(roomId);
    if (state === "collapsed") return "#1a0a0f";
    if (state === "cracked") return survivable ? "#2a1a0f" : "#1f1015";
    return survivable ? "#0f2a1a" : "#1a1040";
  };

  const getRoomBorder = (roomId, survivable) => {
    const state = getRoomState(roomId);
    if (state === "collapsed") return "#4a1a2a";
    if (state === "cracked") return "#8a4a20";
    return survivable ? "#2a8a4a" : "#4a4aaa";
  };

  const getRoomTextColor = (roomId) => {
    const state = getRoomState(roomId);
    if (state === "collapsed") return "#4a2a32";
    if (state === "cracked") return "#a86a30";
    return "#a8c8a8";
  };

  const keyConcepts = [
    {
      id: "physics_refutation",
      label: "Physics Refutation",
      desc: "Galileo demonstrated that objects don't seek natural places — inertia replaces Aristotle's need for continuous movers. Newton's laws made Aristotelian physics not just incomplete but foundationally wrong. Quantum mechanics delivers the deeper blow: superposition violates the sharp actuality-potentiality distinction that underlies all of Aristotle's metaphysics.",
    },
    {
      id: "evolution",
      label: "Essentialism vs Evolution",
      desc: "Darwin's theory eliminated fixed species with real essences — the cornerstone of Aristotle's biology and much of his metaphysics. Species are populations with variable traits, not kinds defined by unchanging natures. This doesn't just refute one doctrine; it undermines the entire framework of natural teleology, since there is no fixed telos toward which evolution aims.",
    },
    {
      id: "consciousness",
      label: "Hard Problem",
      desc: "Hylemorphism says the soul is the form of a living body — functional organization explains life. But why does this functional organization produce subjective experience at all? The hard problem of consciousness asks why there is something it is like to be a creature with such organization. Aristotle's framework can account for function but cannot explain phenomenal qualia.",
    },
    {
      id: "is_ought",
      label: "Is-Ought Gap",
      desc: "Aristotle's ethics derives values from facts about human nature: we ought to flourish because flourishing is our natural end. Hume's is-ought gap challenges this: no set of factual claims about nature entails a normative conclusion. Even if humans naturally pursue certain ends, it doesn't follow that they ought to. This puts his entire naturalistic ethics under pressure.",
    },
    {
      id: "feminist",
      label: "Feminist Critique",
      desc: "Aristotle's exclusion of women and slaves wasn't incidental — it was embedded in his metaphysical categories. Matter is passive-feminine, form is active-masculine; women contribute only matter to reproduction while men contribute form and soul. This gendered metaphysics means his core categories carry ideological weight that cannot simply be stripped away without structural damage.",
    },
    {
      id: "internal_tensions",
      label: "Internal Tensions",
      desc: "Aristotle never resolved the tension between particular substances (this horse) as primary realities and universal forms as the objects of knowledge. Nor did he resolve how the immortal active intellect — which seems to be pure form without matter — can coexist with his hylemorphic account of the soul. These are not peripheral puzzles but fractures running through the center of the system.",
    },
  ];

  const realWorldEchoes = [
    {
      title: "Galileo's Refutation of Natural Motion",
      body: "When Galileo rolled balls down inclined planes and measured uniform acceleration, he didn't just discover a new fact — he eliminated the concept of natural place entirely. Objects don't move toward their natural homes; they continue moving until something stops them. This inertial framework made the entire Aristotelian causal analysis of motion obsolete, collapsing his physics and pulling the cosmological superstructure down with it.",
    },
    {
      title: "Darwin and the Dissolution of Fixed Species",
      body: "Darwin's 1859 Origin of Species was a direct philosophical assault on essentialism. If species are populations of varying individuals connected by descent with modification, then there are no fixed essences defining what it is to be a horse or a human. The concept of telos — the fixed natural end toward which a species develops — becomes incoherent when the species itself is not a fixed natural kind but a temporary snapshot in an ongoing process.",
    },
    {
      title: "Quantum Mechanics and Superposition",
      body: "Aristotle's metaphysics requires a sharp distinction between actuality and potentiality — a thing is either actually hot or potentially hot, not both. Quantum superposition places physical systems in states that are neither actually one outcome nor actually another until measured. This is not merely a gap in Aristotelian science but a violation of its deepest metaphysical commitment: the principle of non-contradiction at the level of fundamental reality.",
    },
    {
      title: "Feminist Metaphysics and Gendered Categories",
      body: "Philosophers like Luce Irigaray and Charlotte Witt have shown that Aristotle's matter-form distinction maps onto a gendered hierarchy: matter is passive, receptive, and associated with the feminine; form is active, structuring, and associated with the masculine. His biological claim that males supply the animating soul-principle while females provide only passive matter is not a correctable empirical error but a symptom of metaphysical categories that encode social hierarchy as natural fact.",
    },
  ];

  const demolishedCount = demolishedPillars.length;

  return (
    <div style={{
      background: `radial-gradient(ellipse at 40% 30%, #3a0520 0%, #1a0515 40%, #0a0a0f 100%)`,
      minHeight: "100vh",
      padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            color: ACCENT, marginBottom: 8,
          }}>
            Part 15 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{
            fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal",
            color: TITLE_COLOR, margin: "0 0 8px 0",
          }}>
            Where the System Breaks
          </h1>
          <p style={{
            fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0,
            lineHeight: 1.6, fontStyle: "italic",
          }}>
            Modern physics, evolutionary biology, feminist critique, and the hard problem of consciousness each attack a load-bearing wall — and some of the building still stands.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: ACCENT, marginBottom: 10,
          }}>
            The Problem
          </div>
          <p style={{
            fontSize: "clamp(13px,1.8vw,15px)", color: "#c8bfb4",
            lineHeight: 1.75, margin: 0,
          }}>
            Aristotle's system claimed comprehensive systematic unity — his physics, metaphysics, biology, psychology, ethics, and politics were all connected through shared principles. But if those foundational principles (natural teleology, fixed essences, geocentric cosmos) are false, the entire structure is undermined. The question is not whether any part survives, but which parts — and whether what survives is still genuinely Aristotelian.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 10,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: ACCENT, marginBottom: 6,
          }}>
            Structural Simulation — Aristotle's System as Architecture
          </div>
          <p style={{
            fontSize: "clamp(12px,1.5vw,13px)", color: SUBTITLE_COLOR,
            marginBottom: 16, lineHeight: 1.6,
          }}>
            Click <strong style={{ color: ACCENT_LIGHT }}>Demolish</strong> on any pillar to apply its modern critique. Watch which rooms collapse, crack, or survive. Survivable rooms (green) contain insights that outlast their foundations.
          </p>

          {/* STATUS BAR */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 8, marginBottom: 18,
          }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "#4aaa6a" }}>■ Survivable</span>
              <span style={{ fontSize: 11, color: "#6a6acc" }}>■ Foundational</span>
              <span style={{ fontSize: 11, color: "#cc8a30" }}>■ Cracked</span>
              <span style={{ fontSize: 11, color: "#5a2a3a" }}>■ Collapsed</span>
            </div>
            <button
              onClick={resetAll}
              style={{
                background: "transparent", border: `1px solid ${ACCENT}66`,
                borderRadius: 6, color: ACCENT_LIGHT, cursor: "pointer",
                fontSize: 11, padding: "4px 12px", fontFamily: "Georgia, serif",
                letterSpacing: 1,
              }}
              onMouseEnter={e => e.target.style.borderColor = ACCENT}
              onMouseLeave={e => e.target.style.borderColor = ACCENT + "66"}
            >
              Rebuild All
            </button>
          </div>

          {/* BUILDING SVG */}
          <svg
            viewBox="0 0 700 310"
            width="100%"
            style={{ maxWidth: "100%", display: "block" }}
          >
            {/* Roof */}
            <polygon
              points="10,155 350,10 690,155"
              fill="#1a0820"
              stroke={ACCENT + "88"}
              strokeWidth="2"
            />
            <text x="350" y="80" textAnchor="middle" fontSize="12" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">
              Aristotle's Philosophical System
            </text>
            <text x="350" y="96" textAnchor="middle" fontSize="9" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">
              384–322 BCE
            </text>

            {/* Upper rooms (foundational — collapse first) */}
            {rooms.filter(r => r.y === 60).map(room => {
              const state = getRoomState(room.id);
              const bg = getRoomColor(room.id, room.survivable);
              const border = getRoomBorder(room.id, room.survivable);
              const textCol = getRoomTextColor(room.id);
              const lines = room.label.split("\n");
              return (
                <g key={room.id}>
                  <rect
                    x={room.x} y={room.y} width={room.w} height={room.h}
                    fill={bg} stroke={border} strokeWidth="1.5" rx="2"
                  />
                  {state === "collapsed" && (
                    <>
                      <line x1={room.x} y1={room.y} x2={room.x + room.w} y2={room.y + room.h} stroke="#4a1a2a" strokeWidth="1" opacity="0.5" />
                      <line x1={room.x + room.w} y1={room.y} x2={room.x} y2={room.y + room.h} stroke="#4a1a2a" strokeWidth="1" opacity="0.5" />
                    </>
                  )}
                  {state === "cracked" && (
                    <polyline
                      points={`${room.x + room.w * 0.3},${room.y} ${room.x + room.w * 0.45},${room.y + room.h * 0.4} ${room.x + room.w * 0.35},${room.y + room.h * 0.6} ${room.x + room.w * 0.5},${room.y + room.h}`}
                      fill="none" stroke="#cc8a30" strokeWidth="1" opacity="0.6"
                    />
                  )}
                  {lines.map((line, i) => (
                    <text
                      key={i} x={room.x + room.w / 2} y={room.y + 28 + i * 16}
                      textAnchor="middle" fontSize="9" fill={textCol}
                      fontFamily="Georgia, serif"
                    >
                      {line}
                    </text>
                  ))}
                  {state === "standing" && (
                    <text x={room.x + room.w / 2} y={room.y + room.h - 8} textAnchor="middle" fontSize="8" fill={room.survivable ? "#4aaa6a" : "#8888dd"} fontFamily="Georgia, serif">
                      {room.survivable ? "✓ survives" : "depends on pillars"}
                    </text>
                  )}
                  {state === "collapsed" && (
                    <text x={room.x + room.w / 2} y={room.y + room.h - 8} textAnchor="middle" fontSize="8" fill="#7a3040" fontFamily="Georgia, serif">
                      ✗ collapsed
                    </text>
                  )}
                  {state === "cracked" && (
                    <text x={room.x + room.w / 2} y={room.y + room.h - 8} textAnchor="middle" fontSize="8" fill="#cc8a30" fontFamily="Georgia, serif">
                      ⚠ cracked
                    </text>
                  )}
                </g>
              );
            })}

            {/* Lower rooms (survivable) */}
            {rooms.filter(r => r.y === 155).map(room => {
              const state = getRoomState(room.id);
              const bg = getRoomColor(room.id, room.survivable);
              const border = getRoomBorder(room.id, room.survivable);
              const textCol = getRoomTextColor(room.id);
              const lines = room.label.split("\n");
              return (
                <g key={room.id}>
                  <rect
                    x={room.x} y={room.y} width={room.w} height={room.h}
                    fill={bg} stroke={border} strokeWidth="1.5" rx="2"
                  />
                  {state === "cracked" && (
                    <polyline
                      points={`${room.x + room.w * 0.4},${room.y} ${room.x + room.w * 0.55},${room.y + room.h * 0.5} ${room.x + room.w * 0.45},${room.y + room.h}`}
                      fill="none" stroke="#cc8a30" strokeWidth="1" opacity="0.5"
                    />
                  )}
                  {lines.map((line, i) => (
                    <text
                      key={i} x={room.x + room.w / 2} y={room.y + 26 + i * 16}
                      textAnchor="middle" fontSize="9" fill={textCol}
                      fontFamily="Georgia, serif"
                    >
                      {line}
                    </text>
                  ))}
                  <text x={room.x + room.w / 2} y={room.y + room.h - 8} textAnchor="middle" fontSize="8"
                    fill={state === "cracked" ? "#cc8a30" : "#4aaa6a"} fontFamily="Georgia, serif">
                    {state === "cracked" ? "⚠ pressured" : "✓ survives"}
                  </text>
                </g>
              );
            })}

            {/* Floor */}
            <rect x="10" y="228" width="680" height="8" fill="#2a1830" stroke={ACCENT + "44"} />

            {/* Foundation label */}
            <text x="350" y="244" textAnchor="middle" fontSize="9" fill={ACCENT + "88"} fontFamily="Georgia, serif">
              FOUNDATIONS — Click pillars below to apply modern critiques
            </text>

            {/* Pillars */}
            {pillars.map(pillar => {
              const isDemolished = demolishedPillars.includes(pillar.id);
              const isAnimatingThis = animating === pillar.id;
              const isHovered = hoveredPillar === pillar.id;
              const lines = pillar.label.split("\n");
              return (
                <g key={pillar.id}>
                  {/* Pillar body */}
                  {!isDemolished ? (
                    <rect
                      x={pillar.x} y={252} width={80} height={30}
                      fill={isHovered ? "#3a1540" : "#1a0c28"}
                      stroke={isHovered ? ACCENT : ACCENT + "66"}
                      strokeWidth="1.5" rx="2"
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={() => setHoveredPillar(pillar.id)}
                      onMouseLeave={() => setHoveredPillar(null)}
                      onClick={() => handleDemolish(pillar.id)}
                    />
                  ) : (
                    <rect
                      x={pillar.x} y={252} width={80} height={30}
                      fill="#1a0810"
                      stroke="#4a1a2a"
                      strokeWidth="1" rx="2" strokeDasharray="4 2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDemolish(pillar.id)}
                    />
                  )}
                  {/* Pillar label */}
                  {lines.map((line, i) => (
                    <text
                      key={i}
                      x={pillar.x + 40} y={260 + i * 13}
                      textAnchor="middle"
                      fontSize="8"
                      fill={isDemolished ? "#5a2a3a" : (isHovered ? ACCENT_LIGHT : "#a898d8")}
                      fontFamily="Georgia, serif"
                      style={{ cursor: "pointer", pointerEvents: "none" }}
                    >
                      {line}
                    </text>
                  ))}
                  {/* Demolish/Restore button */}
                  <rect
                    x={pillar.x + 5} y={286} width={70} height={16}
                    fill={isDemolished ? ACCENT + "22" : (isHovered ? ACCENT : ACCENT + "44")}
                    rx="3"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredPillar(pillar.id)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    onClick={() => handleDemolish(pillar.id)}
                  />
                  <text
                    x={pillar.x + 40} y={297}
                    textAnchor="middle" fontSize="8"
                    fill={isDemolished ? ACCENT + "88" : "#fff"}
                    fontFamily="Georgia, serif"
                    style={{ cursor: "pointer", pointerEvents: "none" }}
                  >
                    {isDemolished ? "↺ Restore" : "✕ Demolish"}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Critique tooltip */}
          {hoveredPillar && !demolishedPillars.includes(hoveredPillar) && (
            <div style={{
              background: "#1a0820",
              border: `1px solid ${ACCENT}55`,
              borderRadius: 6,
              padding: "10px 14px",
              marginTop: 8,
              fontSize: "clamp(11px,1.5vw,13px)",
              color: SUBTITLE_COLOR,
              lineHeight: 1.6,
            }}>
              <span style={{ color: ACCENT_LIGHT, fontWeight: "bold" }}>
                {pillars.find(p => p.id === hoveredPillar)?.short}
              </span>
              {" — "}
              {pillars.find(p => p.id === hoveredPillar)?.critique}
            </div>
          )}

          {/* Demolish summary */}
          {demolishedCount > 0 && (
            <div style={{
              marginTop: 14,
              background: `${ACCENT}11`,
              border: `1px solid ${ACCENT}33`,
              borderRadius: 6,
              padding: "12px 16px",
            }}>
              <div style={{
                fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                color: ACCENT, marginBottom: 6,
              }}>
                Assessment — {demolishedCount} pillar{demolishedCount > 1 ? "s" : ""} demolished
              </div>
              <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "#c8bfb4", lineHeight: 1.7, margin: 0 }}>
                {allCollapsed.size > 0 && (
                  <span>
                    <strong style={{ color: "#cc4444" }}>Collapsed:</strong>{" "}
                    {[...allCollapsed].map(id => rooms.find(r => r.id === id)?.label.replace("\n", " ")).join(", ")}.{" "}
                  </span>
                )}
                {allCracked.size > 0 && (
                  <span>
                    <strong style={{ color: "#cc8a30" }}>Under pressure:</strong>{" "}
                    {[...allCracked].map(id => rooms.find(r => r.id === id)?.label.replace("\n", " ")).join(", ")}.{" "}
                  </span>
                )}
                <span>
                  <strong style={{ color: "#4aaa6a" }}>Still standing:</strong>{" "}
                  Virtue Ethics, Rhetoric & Poetics, Logic & Categories, Narrative Theory, Practical Wisdom — these survive because their insights don't depend on refuted foundations.
                </span>
              </p>
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: ACCENT, marginBottom: 14,
          }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(kc => {
              const isActive = hoveredConcept === kc.id;
              return (
                <button
                  key={kc.id}
                  onClick={() => setHoveredConcept(isActive ? null : kc.id)}
                  style={{
                    background: isActive ? ACCENT : "transparent",
                    border: `1px solid ${ACCENT}${isActive ? "ff" : "66"}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: isActive ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(11px,1.5vw,13px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "all 0.2s",
                  }}
                >
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (
            <div style={{
              background: `${ACCENT}11`,
              border: `1px solid ${ACCENT}44`,
              borderRadius: 6,
              padding: "14px 16px",
              marginTop: 4,
            }}>
              <div style={{
                fontSize: 11, fontWeight: "bold", color: ACCENT_LIGHT,
                marginBottom: 8,
              }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{
                fontSize: "clamp(12px,1.6vw,14px)", color: "#c8bfb4",
                lineHeight: 1.75, margin: 0,
              }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: ACCENT, marginBottom: 10,
          }}>
            The Difficulty
          </div>
          <p style={{
            fontSize: "clamp(13px,1.8vw,15px)", color: "#c8bfb4",
            lineHeight: 1.75, margin: 0,
          }}>
            Without the systematic unity Aristotle claimed, selective retrieval leaves philosophy with a toolkit of disconnected Aristotelian concepts rather than a coherent system. Virtue ethics without fixed human nature, substance metaphysics without natural teleology, hylemorphism without geocentric cosmology — are these still Aristotelian, or are they new theories that simply borrow his vocabulary? And the deepest question remains unanswered: was Aristotle right that systematic philosophy explaining everything through unified principles is possible, or does the failure of his system show that such ambition is itself misguided?
          </p>
          <p style={{
            fontSize: "clamp(11px,1.5vw,13px)", color: ACCENT + "cc",
            marginTop: 12, marginBottom: 0, fontStyle: "italic",
          }}>
            This pressure forces the next development: philosophy must choose between comprehensive systems and piecemeal progress — a question that defines the modern philosophical tradition.
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%", background: "transparent", border: "none",
              padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", fontFamily: "Georgia, serif",
            }}
          >
            <span style={{
              fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
              color: ACCENT,
            }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {realWorldEchoes.map(echo => (
                <div key={echo.title} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: "bold",
                    color: ACCENT_LIGHT, marginBottom: 6,
                  }}>
                    {echo.title}
                  </div>
                  <p style={{
                    fontSize: 13, color: "#b8b0a8",
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {echo.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{
          textAlign: "center", marginTop: 36, fontSize: 12,
          color: ACCENT_DIM, letterSpacing: 1,
        }}>
          Part 15 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

const vizMap = {
  "aristotle_introduction": AristotleIntroduction,
  "empirical_revolution": EmpiricalRevolution,
  "logic_architecture_of_thought": LogicArchitectureOfThought,
  "metaphysics_substance_essence": MetaphysicsSubstanceEssence,
  "four_causes": FourCauses,
  "form_matter_potentiality_actuality": FormMatterPotentialityActuality,
  "aristotelian_physics_cosmology": AristotelianPhysicsCosmology,
  "aristotle_biology": AristotleBiology,
  "soul_mind_human_nature": SoulMindHumanNature,
  "ethics_virtue_good_life": EthicsVirtueGoodLife,
  "political_philosophy_community": PoliticalPhilosophyCommunity,
  "rhetoric_persuasion_communication": RhetoricPersuasionCommunication,
  "poetics_tragedy_art": PoeticsTragedyArt,
  "aristotle_legacy_history": AristotleLegacyHistory,
  "where_system_breaks": WhereSystemBreaks
};

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
}