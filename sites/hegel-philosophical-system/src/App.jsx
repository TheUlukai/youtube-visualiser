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
    id: "dialectical_method",
    name: "The Revolutionary Method",
    subtitle: "Hegel's dialectic reframes contradiction not as a logical failure but as the engine driving both thought and reality forward.",
    part: 1,
  },
  {
    id: "journey_of_consciousness",
    name: "The Journey of Consciousness",
    subtitle: "The Phenomenology of Spirit traces the necessary stages through which consciousness must pass to arrive at genuine self-knowledge.",
    part: 2,
  },
  {
    id: "master_slave_dialectic",
    name: "The Life and Death Struggle",
    subtitle: "The master-slave dialectic reveals that genuine freedom and self-consciousness can only be achieved through mutual recognition, not domination.",
    part: 3,
  },
  {
    id: "architecture_of_the_absolute",
    name: "The Architecture of the Absolute",
    subtitle: "The Absolute is not a supernatural entity but the complete, self-developing totality of thought and being, grasped as a single systematic whole.",
    part: 4,
  },
  {
    id: "science_of_logic",
    name: "The Logic of Pure Thought",
    subtitle: "Hegel's Science of Logic derives the fundamental categories of thought and reality from the internal contradictions of pure Being itself.",
    part: 5,
  },
  {
    id: "philosophy_of_nature",
    name: "Nature as Idea in Otherness",
    subtitle: "Nature is the externalization of logical categories into spatial, temporal, and material existence — rational in structure yet marked by contingency.",
    part: 6,
  },
  {
    id: "philosophy_of_spirit",
    name: "The Realm of Human Spirit",
    subtitle: "Spirit is the self-conscious return of the Absolute Idea to itself through human consciousness, culture, and freedom.",
    part: 7,
  },
  {
    id: "science_of_freedom",
    name: "The Science of Freedom",
    subtitle: "Hegel's political philosophy argues that genuine freedom is not the absence of constraint but is achieved through participation in rational social institutions.",
    part: 8,
  },
  {
    id: "philosophy_of_history",
    name: "The Cunning of Reason",
    subtitle: "World history is the progressive realization of human freedom, driven not by conscious planning but by the rational outcomes that emerge from the collision of particular passions.",
    part: 9,
  },
  {
    id: "absolute_spirit_art_religion_philosophy",
    name: "The Beautiful, the Holy, and the True",
    subtitle: "Absolute Spirit encompasses art, religion, and philosophy as the three modes through which humanity achieves complete self-understanding of its relationship to ultimate reality.",
    part: 10,
  },
  {
    id: "recognition_structure",
    name: "The Drama of Recognition",
    subtitle: "Recognition is the fundamental intersubjective structure through which human beings achieve self-consciousness, freedom, and authentic selfhood.",
    part: 11,
  },
  {
    id: "kant_critique",
    name: "The Kantian Revolution and Its Limits",
    subtitle: "Hegel sees himself as completing Kant's Copernican revolution by eliminating the dualisms that prevent Kant from achieving genuine systematic knowledge.",
    part: 12,
  },
  {
    id: "unhappy_consciousness",
    name: "The Agony of Division",
    subtitle: "The unhappy consciousness is the form of awareness torn between finite existence and infinite aspiration, projecting all value onto an unattainable transcendent beyond.",
    part: 13,
  },
  {
    id: "civil_society",
    name: "The World of Needs and Work",
    subtitle: "Civil society is the realm of market relationships and voluntary associations that enables individual freedom while generating inequalities requiring institutional correction.",
    part: 14,
  },
  {
    id: "hegel_and_marx",
    name: "The Spectre of Materialism",
    subtitle: "Marx preserves the dialectical structure of Hegelian philosophy while inverting its foundations, grounding historical development in material productive forces rather than the development of consciousness.",
    part: 15,
  },
  {
    id: "end_of_art",
    name: "The Twilight of Beauty",
    subtitle: "Hegel's 'end of art' thesis holds that art can no longer serve as the primary vehicle for cultural truth in the modern world, having been superseded by religion and philosophy.",
    part: 16,
  },
  {
    id: "hegelian_aesthetics",
    name: "The Realm of Sensuous Knowing",
    subtitle: "Hegel's systematic aesthetics analyzes how each art form — architecture, sculpture, painting, music, poetry — has its own material, expressive possibilities, and historical trajectory.",
    part: 17,
  },
  {
    id: "alienation",
    name: "The Experience of Estrangement",
    subtitle: "Alienation is not merely a feeling of dissatisfaction but a necessary stage in human development through which consciousness discovers the inadequacy of immediate relationships and drives toward more adequate forms of self-realization.",
    part: 18,
  },
  {
    id: "speculative_method",
    name: "The Method of Philosophy",
    subtitle: "Hegel's speculative method allows philosophical content to generate its own method through determinate negation, making thinking itself the deepest subject of philosophy.",
    part: 19,
  },
  {
    id: "living_legacy",
    name: "The Living Legacy",
    subtitle: "Two centuries after his death, Hegel's concepts and methods continue to shape intellectual and political life across Marxism, existentialism, psychoanalysis, feminist theory, postcolonial studies, and even neuroscience.",
    part: 20,
  }
];

const accentMap = {
  "dialectical_method": "#B91C1C",
  "journey_of_consciousness": "#1D4ED8",
  "master_slave_dialectic": "#92400E",
  "architecture_of_the_absolute": "#6D28D9",
  "science_of_logic": "#0F766E",
  "philosophy_of_nature": "#15803D",
  "philosophy_of_spirit": "#1E40AF",
  "science_of_freedom": "#0369A1",
  "philosophy_of_history": "#854D0E",
  "absolute_spirit_art_religion_philosophy": "#C026D3",
  "recognition_structure": "#0891B2",
  "kant_critique": "#475569",
  "unhappy_consciousness": "#7C3AED",
  "civil_society": "#D97706",
  "hegel_and_marx": "#DC2626",
  "end_of_art": "#9D174D",
  "hegelian_aesthetics": "#7E22CE",
  "alienation": "#065F46",
  "speculative_method": "#1F2937",
  "living_legacy": "#D4A017"
};

const bgMap = {
  "dialectical_method": "volcanic tension",
  "journey_of_consciousness": "misty ascent",
  "master_slave_dialectic": "smoldering forge",
  "architecture_of_the_absolute": "crystalline infinity",
  "science_of_logic": "arctic clarity",
  "philosophy_of_nature": "verdant emergence",
  "philosophy_of_spirit": "sovereign blue",
  "science_of_freedom": "civic gravity",
  "philosophy_of_history": "twilight progression",
  "absolute_spirit_art_religion_philosophy": "luminous transcendence",
  "recognition_structure": "tidal tension",
  "kant_critique": "rational twilight",
  "unhappy_consciousness": "twilight uncertainty",
  "civil_society": "mercantile friction",
  "hegel_and_marx": "revolutionary heat",
  "end_of_art": "elegiac dusk",
  "hegelian_aesthetics": "gallery stillness",
  "alienation": "shadowed recognition",
  "speculative_method": "deep systematic order",
  "living_legacy": "golden resonance"
};

// ─── Part 1: The Revolutionary Method ───
function DialecticalMethod() {
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [animatingArc, setAnimatingArc] = useState(null);
  const [arcProgress, setArcProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [activeExample, setActiveExample] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredExample, setHoveredExample] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);
  const arcRef = useRef(null);

  const accent = "#B91C1C";

  const keyConcepts = [
    { id: "dialectic", label: "Dialectic", desc: "Dialectic is not a method applied to a pre-existing subject matter but the inherent movement of thought and reality themselves. Every finite determination contains an internal contradiction — a tension between what it claims to be and what it actually is — and this tension drives thought forward to richer, more concrete determinations. Hegel rehabilitates the ancient art of dialectic as the logic of all rational development." },
    { id: "aufhebung", label: "Sublation (Aufhebung)", desc: "Aufhebung is Hegel's master concept, exploiting the German word's three meanings simultaneously: to cancel, to preserve, and to elevate. The dialectical resolution of a contradiction does not simply destroy the opposing terms but lifts them into a higher unity that contains them as subordinate moments. Nothing is lost; everything is transformed." },
    { id: "contradiction_productive", label: "Contradiction as Productive", desc: "Against the traditional logical law of non-contradiction, Hegel argues that contradiction is not a sign of error but the engine of development. Things actually contain contradictions — finite things are both what they are and conditioned by what they are not — and it is precisely this internal tension that drives them to develop, change, and deepen. Contradiction is the root of all movement and vitality." },
    { id: "self_moving_concept", label: "Self-Moving Concept", desc: "The concept (Begriff) is not static but self-moving — it generates its own content through internal development rather than receiving it from an external source. This is what distinguishes Hegel from Kant: Kant's categories are fixed forms imposed on an alien matter, while Hegel's categories develop from one another through their own immanent logic." },
    { id: "negation", label: "Negation", desc: "Negation is not merely the logical operation of denial but the positive force by which each stage of thought transcends itself. Determinate negation — negation that has content — is the key: when a concept negates itself, what emerges is not mere emptiness but a specific new determination. 'The negative is itself something positive,' as Hegel puts it." },
    { id: "totality", label: "Totality", desc: "Truth is the whole — no partial determination, isolated from its relations to everything else, can express what is genuinely real. The totality is not the sum of its parts but the self-differentiating unity that generates its parts as its own moments and returns to itself through them. This is why philosophy must be a system: only in the system does each part receive its proper meaning." },
  ];

  const circleData = {
    being: {
      id: "being",
      label: "Being",
      x: 50,
      y: 28,
      color: "#B91C1C",
      definition: "Pure, immediate, indeterminate presence — the simplest thought, utterly empty of content. To say something 'is' without any further qualification.",
      concept: "Thesis"
    },
    nothing: {
      id: "nothing",
      label: "Nothing",
      x: 20,
      y: 72,
      color: "#7f1d1d",
      definition: "Pure absence, void, the complete negation of being. Yet to think Nothing is still to think — it has the same emptiness as Being.",
      concept: "Antithesis"
    },
    becoming: {
      id: "becoming",
      label: "Becoming",
      x: 80,
      y: 72,
      color: "#dc2626",
      definition: "The unity in which Being passes into Nothing and Nothing passes into Being — the first concrete thought, the movement itself. Aufhebung in action.",
      concept: "Synthesis (Aufhebung)"
    }
  };

  const examples = [
    {
      label: "Seed → Plant",
      stages: ["Seed", "Negation of Seed", "Plant"],
      descriptions: [
        "The seed exists in pure potential — it is, yet contains within itself the drive to cease being a seed.",
        "The seed negates itself, dissolving its form, seemingly destroyed in darkness and soil.",
        "Aufhebung: the seed is cancelled, preserved, and elevated — its substance lives on transformed as the plant."
      ],
      icon: "🌱"
    },
    {
      label: "Autocracy → State",
      stages: ["Empire", "Revolt", "Modern State"],
      descriptions: [
        "Ancient empires unify people under absolute authority — pure collective order, individual will absorbed.",
        "Individual liberties assert themselves against collective domination — particularity rebels against universality.",
        "The modern constitutional state sublates both: universal law that recognizes individual rights, neither pure empire nor pure anarchy."
      ],
      icon: "⚖️"
    },
    {
      label: "Tech → Policy",
      stages: ["Innovation", "Crisis", "Governance"],
      descriptions: [
        "Rapid technological advancement — pure forward motion, the drive to connect, automate, and transform society.",
        "Privacy erosion, job displacement, algorithmic injustice — the contradictions latent in innovation become acute.",
        "Socially conscious tech policy: innovation preserved but bounded, rights recognized, the synthesis still unfolding."
      ],
      icon: "💻"
    }
  ];

  const currentExample = examples[activeExample];
  const activeStage = Math.min(Math.floor(sliderValue / 34), 2);

  const triggerArcAnimation = (fromId, toId) => {
    if (arcRef.current) cancelAnimationFrame(arcRef.current);
    setAnimatingArc({ from: fromId, to: toId });
    setArcProgress(0);
    const start = performance.now();
    const duration = 900;
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setArcProgress(t);
      if (t < 1) {
        arcRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (fromId === "being" && toId === "nothing") {
            triggerArcAnimation("nothing", "becoming");
          } else if (fromId === "nothing" && toId === "becoming") {
            triggerArcAnimation("being", "becoming");
          } else {
            setAnimatingArc(null);
            setArcProgress(0);
          }
        }, 200);
      }
    };
    arcRef.current = requestAnimationFrame(animate);
  };

  const handleCircleClick = (id) => {
    setActiveCircle(activeCircle === id ? null : id);
    if (id === "being") {
      triggerArcAnimation("being", "nothing");
    } else if (id === "nothing") {
      triggerArcAnimation("nothing", "becoming");
    } else if (id === "becoming") {
      triggerArcAnimation("being", "becoming");
    }
  };

  useEffect(() => {
    return () => {
      if (arcRef.current) cancelAnimationFrame(arcRef.current);
    };
  }, []);

  const getArcPath = (fromKey, toKey) => {
    const from = circleData[fromKey];
    const to = circleData[toKey];
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.3;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.3;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  const getPointOnPath = (fromKey, toKey, t) => {
    const from = circleData[fromKey];
    const to = circleData[toKey];
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.3;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.3;
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
    return { x, y };
  };

  const selectedCircle = activeCircle ? circleData[activeCircle] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #450a0a 0%, #1a0505 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#f5f0eb",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(24px, 4vw, 40px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#B91C1C",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 1 of 20 — Hegel's System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            fontWeight: "normal",
            margin: "0 0 8px 0",
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2
          }}>The Revolutionary Method</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 17px)",
            color: "#c9a89a",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5
          }}>Hegel's dialectic reframes contradiction not as a logical failure but as the engine driving both thought and reality forward.</p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(185,28,28,0.3)",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(10px, 1.3vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B91C1C",
            marginBottom: "clamp(10px, 2vw, 18px)"
          }}>The Dialectical Trinity</div>

          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#c9a89a",
            lineHeight: 1.7,
            marginBottom: "clamp(12px, 2vw, 20px)",
            margin: "0 0 clamp(12px, 2vw, 20px) 0"
          }}>
            Click any concept to set it in motion. Watch how Being passes into Nothing, and how both are absorbed — cancelled, preserved, elevated — into Becoming.
          </p>

          {/* SVG Diagram */}
          <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <svg viewBox="0 0 100 105" width="100%" style={{ overflow: "visible", display: "block" }}>
              <defs>
                <radialGradient id="glowBeing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B91C1C" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowNothing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowBecoming" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#B91C1C" opacity="0.8" />
                </marker>
              </defs>

              {/* Static arcs */}
              {[["being","nothing"],["nothing","becoming"],["being","becoming"]].map(([a,b]) => (
                <path
                  key={`${a}-${b}`}
                  d={getArcPath(a, b)}
                  fill="none"
                  stroke="rgba(185,28,28,0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                />
              ))}

              {/* Animated arc */}
              {animatingArc && (() => {
                const pts = [];
                for (let i = 0; i <= 30; i++) {
                  const t = (i / 30) * arcProgress;
                  const p = getPointOnPath(animatingArc.from, animatingArc.to, t);
                  pts.push(`${p.x},${p.y}`);
                }
                const dot = getPointOnPath(animatingArc.from, animatingArc.to, arcProgress);
                return (
                  <g>
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke="#B91C1C"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <circle cx={dot.x} cy={dot.y} r="1.5" fill="#fff" opacity="0.9" />
                    <circle cx={dot.x} cy={dot.y} r="3" fill="#B91C1C" opacity="0.3" />
                  </g>
                );
              })()}

              {/* Circles */}
              {Object.values(circleData).map((c) => {
                const isHovered = hoveredCircle === c.id;
                const isActive = activeCircle === c.id;
                const r = 10;
                return (
                  <g
                    key={c.id}
                    transform={`translate(${c.x}, ${c.y})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCircleClick(c.id)}
                    onMouseEnter={() => setHoveredCircle(c.id)}
                    onMouseLeave={() => setHoveredCircle(null)}
                  >
                    {(isHovered || isActive) && (
                      <circle r={r + 5} fill={c.color} opacity="0.15" />
                    )}
                    <circle
                      r={r}
                      fill={isActive ? c.color : "rgba(15,5,5,0.85)"}
                      stroke={c.color}
                      strokeWidth={isActive ? "1.5" : "1"}
                      opacity="1"
                    />
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fontSize="3.8"
                      fontFamily="Georgia, serif"
                      fill={isActive ? "#fff" : c.color}
                      fontWeight="bold"
                    >{c.label}</text>
                    <text
                      textAnchor="middle"
                      dy="4.8em"
                      fontSize="2.5"
                      fontFamily="Georgia, serif"
                      fill="rgba(201,168,154,0.7)"
                      fontStyle="italic"
                    >{c.concept}</text>
                  </g>
                );
              })}

              {/* Aufhebung label in center */}
              <text x="50" y="55" textAnchor="middle" fontSize="2.8" fontFamily="Georgia, serif" fill="rgba(185,28,28,0.5)" fontStyle="italic">Aufhebung</text>
              <text x="50" y="59" textAnchor="middle" fontSize="2" fontFamily="Georgia, serif" fill="rgba(185,28,28,0.35)">cancel · preserve · elevate</text>
            </svg>
          </div>

          {/* Info panel for active circle */}
          <div style={{
            minHeight: "80px",
            background: selectedCircle ? "rgba(185,28,28,0.08)" : "transparent",
            border: selectedCircle ? "1px solid rgba(185,28,28,0.25)" : "1px solid transparent",
            borderRadius: "8px",
            padding: selectedCircle ? "clamp(12px, 2vw, 18px)" : "0",
            marginTop: "clamp(8px, 2vw, 16px)",
            transition: "all 0.3s ease"
          }}>
            {selectedCircle ? (
              <>
                <div style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  color: selectedCircle.color,
                  fontWeight: "bold",
                  marginBottom: "6px"
                }}>{selectedCircle.label} — {selectedCircle.concept}</div>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  color: "#e8d5ce",
                  lineHeight: 1.7,
                  margin: 0
                }}>{selectedCircle.definition}</p>
              </>
            ) : (
              <p style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "rgba(201,168,154,0.5)",
                textAlign: "center",
                fontStyle: "italic",
                margin: "clamp(12px, 2vw, 18px) 0"
              }}>Click a circle to reveal its meaning and watch the dialectical movement unfold...</p>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(185,28,28,0.15)", margin: "clamp(16px, 3vw, 28px) 0" }} />

          {/* Slider Examples */}
          <div style={{
            fontSize: "clamp(10px, 1.3vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B91C1C",
            marginBottom: "clamp(8px, 1.5vw, 14px)"
          }}>Drag the Dialectic — Real-World Examples</div>

          {/* Example selector */}
          <div style={{
            display: "flex",
            gap: "clamp(6px, 1.5vw, 12px)",
            marginBottom: "clamp(12px, 2vw, 20px)",
            flexWrap: "wrap"
          }}>
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setActiveExample(i); setSliderValue(0); }}
                onMouseEnter={() => setHoveredExample(i)}
                onMouseLeave={() => setHoveredExample(null)}
                style={{
                  background: activeExample === i ? "rgba(185,28,28,0.3)" : "rgba(255,255,255,0.04)",
                  border: activeExample === i ? "1px solid #B91C1C" : "1px solid rgba(185,28,28,0.2)",
                  borderRadius: "6px",
                  padding: "6px clamp(10px, 2vw, 16px)",
                  color: activeExample === i ? "#fff" : "#c9a89a",
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                  boxShadow: (hoveredExample === i || activeExample === i) ? "0 0 10px rgba(185,28,28,0.3)" : "none"
                }}
              >{ex.icon} {ex.label}</button>
            ))}
          </div>

          {/* Stage display */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            gap: "clamp(4px, 1vw, 8px)"
          }}>
            {currentExample.stages.map((stage, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: "center",
                padding: "clamp(8px, 1.5vw, 12px) clamp(4px, 1vw, 8px)",
                background: activeStage === i ? "rgba(185,28,28,0.25)" : "rgba(255,255,255,0.03)",
                border: activeStage === i ? "1px solid #B91C1C" : "1px solid rgba(185,28,28,0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                boxShadow: activeStage === i ? "0 0 16px rgba(185,28,28,0.3)" : "none"
              }}>
                <div style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  color: activeStage === i ? "#B91C1C" : "rgba(185,28,28,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "4px"
                }}>{i === 0 ? "Thesis" : i === 1 ? "Antithesis" : "Synthesis"}</div>
                <div style={{
                  fontSize: "clamp(11px, 1.6vw, 14px)",
                  color: activeStage === i ? "#fff" : "#888",
                  fontWeight: activeStage === i ? "bold" : "normal",
                  transition: "all 0.3s"
                }}>{stage}</div>
              </div>
            ))}
          </div>

          {/* Slider */}
          <div style={{ position: "relative", margin: "clamp(8px, 1.5vw, 14px) 0" }}>
            <input
              type="range"
              min={0}
              max={99}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{
                width: "100%",
                cursor: "pointer",
                accentColor: "#B91C1C",
                height: "4px"
              }}
            />
          </div>

          {/* Stage description */}
          <div style={{
            background: "rgba(185,28,28,0.06)",
            border: "1px solid rgba(185,28,28,0.15)",
            borderLeft: "3px solid #B91C1C",
            borderRadius: "0 6px 6px 0",
            padding: "clamp(10px, 2vw, 16px)",
            minHeight: "60px"
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#e8d5ce",
              lineHeight: 1.75,
              margin: 0,
              fontStyle: "italic"
            }}>
              {currentExample.descriptions[activeStage]}
            </p>
          </div>

          {/* Core argument prose */}
          <div style={{ marginTop: "clamp(16px, 3vw, 28px)" }}>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#c9a89a",
              lineHeight: 1.8,
              margin: "0 0 12px 0"
            }}>
              Traditional logic treats contradiction as a fatal error to be eliminated. Hegel inverts this entirely: contradictions are the very force that moves thinking and reality toward higher unities.
            </p>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#c9a89a",
              lineHeight: 1.8,
              margin: 0
            }}>
              Every concept contains within itself its own opposition. The resolution of that tension — <em style={{ color: "#e8d5ce" }}>Aufhebung</em> — simultaneously cancels, preserves, and elevates. This movement is not imposed from outside but flows from the inner nature of the content itself. Truth, therefore, is not found in isolated propositions but only in the complete, self-developing totality.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(127,29,29,0.35)",
          borderLeft: "3px solid #7f1d1d",
          borderRadius: "0 10px 10px 0",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(12px, 2.5vw, 22px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 10px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9a3232",
            marginBottom: "clamp(8px, 1.5vw, 14px)"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#c9a89a",
            lineHeight: 1.8,
            margin: "0 0 10px 0"
          }}>
            If reality and thought both develop through internal contradiction — if everything carries within it the seed of its own negation — then we face a vertiginous question: can any individual mind actually know anything at all? Is consciousness itself trapped in contradiction, forever reaching for truths it cannot hold?
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#c9a89a",
            lineHeight: 1.8,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: we need a new account of how consciousness itself develops through these very contradictions — the journey Hegel calls the Phenomenology of Spirit.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(185,28,28,0.2)",
          borderRadius: "10px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px, 2vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 10px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B91C1C"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#B91C1C" />
              : <ChevronDown size={16} color="#B91C1C" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)" }}>
              {examples.map((ex, i) => (
                <div key={i} style={{
                  marginBottom: i < examples.length - 1 ? "clamp(12px, 2vw, 18px)" : 0,
                  paddingBottom: i < examples.length - 1 ? "clamp(12px, 2vw, 18px)" : 0,
                  borderBottom: i < examples.length - 1 ? "1px solid rgba(185,28,28,0.1)" : "none"
                }}>
                  <div style={{
                    fontSize: "clamp(13px, 1.7vw, 15px)",
                    color: "#e8d5ce",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span>{ex.icon}</span>
                    <span style={{ fontWeight: "bold" }}>{ex.label}</span>
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c9a89a",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {ex.descriptions[0]} Then: {ex.descriptions[1].toLowerCase()} Finally: {ex.descriptions[2].toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 2: The Journey of Consciousness ───
function JourneyOfConsciousness() {
  const [activeStep, setActiveStep] = useState(null);
  const [sublated, setSublated] = useState([]);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#3B82F6";

  const keyConcepts = [
    { id: "sense_certainty", label: "Sense Certainty", desc: "Sense certainty is the opening position of consciousness: the conviction that the most immediate, pre-conceptual contact with a 'this, here, now' is the richest and most certain kind of knowledge. Hegel shows this is the poorest: the very words used to point — 'this,' 'here,' 'now' — are universal terms that dissolve the singular they aim at. Language is already conceptual, and 'the ineffable' cannot be expressed." },
    { id: "perception", label: "Perception", desc: "Consciousness moves to perception — the attempt to grasp the determinate thing as a bundle of properties. But the thing cannot be both a unified one and a many-propertied multiplicity without contradiction. Consciousness oscillates between attributing unity to the thing itself and to its own act of comparison, unable to stabilize a consistent account of the object." },
    { id: "understanding", label: "Understanding", desc: "The Understanding posits invisible forces and laws behind appearances — the supersensible world as the true explanation of sensuous phenomena. But this inner world turns out to be an inverted world: every law has its inversion equally valid, and the very distinction between appearance and inner truth collapses. What the Understanding sought behind appearances is just appearances understood more systematically." },
    { id: "self_consciousness", label: "Self-Consciousness", desc: "When the inner world collapses, consciousness turns back on itself and discovers that what it was seeking — the explanation of things — was always its own activity. This is the birth of self-consciousness: 'I = I.' But this pure self-reflection is immediately unstable, because self-consciousness can only confirm itself through the recognition of another self-consciousness." },
    { id: "intersubjectivity", label: "Intersubjectivity", desc: "The Phenomenology's most famous insight: self-consciousness is inherently intersubjective. A solitary self cannot validate itself by introspection; it requires acknowledgment from another free self-consciousness. This recognition is not a social nicety but a metaphysical necessity — without mutual recognition, self-consciousness remains a hollow claim rather than a lived reality." },
    { id: "absolute_knowledge", label: "Absolute Knowledge", desc: "The Phenomenology culminates in Absolute Knowledge — not omniscience but the point at which consciousness recognizes that the entire journey it has undergone (from sense certainty through religion) was the self-development of Spirit coming to know itself. The separation between the knowing subject and what is known is finally overcome: knowledge and its object are both revealed as Spirit's own movement." },
  ];

  const steps = [
    {
      id: 0,
      label: "Sense Certainty",
      subtitle: "The richest, most immediate knowing",
      color: "#3B82F6",
      contradiction: "When I say 'this tree, here, now' — I try to grasp the singular. But 'here' is also behind me, above me, across the world. 'Now' is day, night, this moment, and the next. The very words I use to point dissolve into universals, sweeping the singular away. What seemed the most concrete proves the most abstract.",
      sublatedContent: "The insight that immediate sensation already contains conceptual mediation — that every 'given' is shaped by universal structures of language and thought.",
      animationHint: "dissolving"
    },
    {
      id: 1,
      label: "Perception",
      subtitle: "Things with multiple properties",
      color: "#6366F1",
      contradiction: "I see a grain of salt: white, cubic, tart, hard. But which is the 'real' salt — the whiteness or the cubeness? Each property seems to exclude the others, yet they must coexist in one thing. Perception oscillates between the unity of the thing and the multiplicity of its properties, unable to hold both consistently.",
      sublatedContent: "The understanding that objects are not bundles of accidental properties, but that unity and multiplicity require a deeper organizing principle — a lawful inner structure.",
      animationHint: "splitting"
    },
    {
      id: 2,
      label: "Understanding",
      subtitle: "Invisible forces behind appearances",
      color: "#8B5CF6",
      contradiction: "Science explains visible effects through invisible laws — gravity, electromagnetism, forces. The 'real' world becomes a supersensible beyond. But these inner forces are only ever known through their outer expressions. The curtain conceals nothing — or rather, we ourselves placed the curtain there and then sought what lay behind it.",
      sublatedContent: "The recognition that the laws mind projects onto nature are mind's own structures — that in understanding the world, consciousness discovers itself. The object and the subject begin to mirror each other.",
      animationHint: "reflection"
    },
    {
      id: 3,
      label: "Self-Consciousness",
      subtitle: "Mind recognizes itself in its knowing",
      color: "#A855F7",
      contradiction: "I recognize that I have been present in every stage of knowing — the 'I' that structures experience. But this self-certainty is hollow without external confirmation. Another self-consciousness faces me, each of us claiming to be the universal standpoint, each needing the other's recognition to be real.",
      sublatedContent: "The necessity of intersubjectivity: genuine self-knowledge requires recognition from other selves. Knowledge is not a private achievement but a social, historical process.",
      animationHint: "encounter"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const ctx = canvas.getContext("2d");
    let animFrame;
    let particles = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 38; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -Math.random() * 0.22 - 0.05,
          alpha: Math.random() * 0.35 + 0.08,
          hue: 210 + Math.random() * 60
        });
      }
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.round(29 + p.hue * 0.3).toString(16).padStart(2,'0')}4ED8`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  const handleStepClick = (id) => {
    if (activeStep === id) {
      setActiveStep(null);
    } else {
      setActiveStep(id);
      setSublated(prev => prev.includes(id) ? prev : [...prev, id]);
    }
  };

  const outerStyle = {
    background: "radial-gradient(ellipse at 40% 20%, #0f2a6e 0%, #080818 70%, #0a0a0f 100%)",
    minHeight: "100vh",
    fontFamily: "Georgia, serif",
    padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    boxSizing: "border-box"
  };

  const wrapperStyle = {
    maxWidth: "min(90vw, 860px)",
    margin: "0 auto",
    position: "relative"
  };

  const cardBase = {
    background: "#0d1b3e99",
    border: "1px solid #1D4ED833",
    borderRadius: "10px",
    padding: "clamp(16px, 3vw, 28px)",
    marginBottom: "clamp(16px, 3vw, 28px)"
  };

  return (
    <div style={outerStyle}>
      <div style={wrapperStyle}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", letterSpacing: "0.18em", color: "#93C5FD", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 2 of 20 — Phenomenology of Spirit
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", color: "#E0EAFF", margin: "0 0 10px 0", fontWeight: "normal", letterSpacing: "0.02em" }}>
            The Journey of Consciousness
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: "#93C5FD", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            The Phenomenology of Spirit traces the necessary stages through which consciousness must pass to arrive at genuine self-knowledge.
          </p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{ ...cardBase, borderLeft: "4px solid #1D4ED8", background: "#07122e99" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "10px" }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#CBD5E1", lineHeight: 1.75, margin: 0 }}>
            If all thinking develops dialectically through contradiction, what does this mean for the development of the individual mind? Can consciousness ever achieve genuine, non-arbitrary knowledge — or is every claim to knowing just one more moment in an endless, groundless oscillation? The pressure is urgent: without an answer, philosophy itself collapses into relativism.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{ ...cardBase, background: "#08122899", position: "relative", overflow: "hidden", padding: 0 }}>

          {/* Canvas background */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, padding: "clamp(16px, 3vw, 28px)" }}>
            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "6px" }}>
              The Staircase of Knowing
            </div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", margin: "0 0 clamp(16px, 3vw, 24px) 0", lineHeight: 1.6 }}>
              Each stage below carries within it a contradiction that forces the ascent to the next. Click any step to witness the internal collapse — and what is preserved in the rising.
            </p>

            <div style={{ display: "flex", gap: "clamp(10px, 2vw, 20px)", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* Staircase column */}
              <div style={{ flex: "1 1 min(260px, 100%)", minWidth: 0 }}>
                {steps.map((step, idx) => {
                  const isActive = activeStep === step.id;
                  const isHovered = hoveredStep === step.id;
                  const isSublated = sublated.includes(step.id);
                  const stepOffset = idx * 18;

                  return (
                    <div key={step.id} style={{ marginBottom: "clamp(8px, 1.5vw, 14px)", marginLeft: `${stepOffset}px`, transition: "margin 0.3s ease" }}>
                      {/* Step button */}
                      <div
                        onClick={() => handleStepClick(step.id)}
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "8px",
                          padding: "clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 18px)",
                          background: isActive
                            ? `${step.color}22`
                            : isHovered ? "#1a2a5e99" : "#101c3e88",
                          border: `2px solid ${isActive ? step.color : isHovered ? "#3B82F699" : "#1D4ED855"}`,
                          boxShadow: isActive ? `0 0 18px ${step.color}44` : isHovered ? `0 0 10px #1D4ED844` : "none",
                          transition: "all 0.25s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}
                      >
                        {/* Step number */}
                        <div style={{
                          width: "clamp(24px, 3.5vw, 32px)",
                          height: "clamp(24px, 3.5vw, 32px)",
                          borderRadius: "50%",
                          background: isActive ? step.color : "#1D4ED866",
                          border: `2px solid ${step.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(10px, 1.4vw, 13px)",
                          color: "#E0EAFF",
                          fontWeight: "bold",
                          flexShrink: 0,
                          transition: "background 0.25s ease"
                        }}>
                          {idx + 1}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: isActive ? "#E0EAFF" : "#93C5FD", fontWeight: "bold", letterSpacing: "0.02em" }}>
                            {step.label}
                          </div>
                          <div style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: "#64748B", fontStyle: "italic", marginTop: "2px" }}>
                            {step.subtitle}
                          </div>
                        </div>

                        {isSublated && !isActive && (
                          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#4ADE80", letterSpacing: "0.1em", flexShrink: 0 }}>
                            sublated ✓
                          </div>
                        )}

                        <div style={{ color: step.color, fontSize: "clamp(12px, 1.8vw, 16px)", flexShrink: 0, transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>
                          ▼
                        </div>
                      </div>

                      {/* Expanded panel */}
                      {isActive && (
                        <div style={{
                          marginTop: "4px",
                          borderRadius: "0 0 8px 8px",
                          background: "#050e2799",
                          border: `1px solid ${step.color}55`,
                          borderTop: "none",
                          padding: "clamp(12px, 2vw, 18px)",
                          animation: "none"
                        }}>
                          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", color: step.color, textTransform: "uppercase", marginBottom: "8px" }}>
                            Internal Contradiction
                          </div>
                          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#CBD5E1", lineHeight: 1.7, margin: "0 0 14px 0" }}>
                            {step.contradiction}
                          </p>

                          {/* Dissolution animation hint */}
                          <ContradictionViz step={step} />

                          <div style={{ borderTop: `1px solid ${step.color}33`, paddingTop: "12px", marginTop: "12px" }}>
                            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", color: "#4ADE80", textTransform: "uppercase", marginBottom: "6px" }}>
                              What is Sublated (Preserved-and-Transcended)
                            </div>
                            <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#86EFAC", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                              {step.sublatedContent}
                            </p>
                          </div>

                          {idx < steps.length - 1 && (
                            <div style={{ textAlign: "center", marginTop: "14px" }}>
                              <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#60A5FA", letterSpacing: "0.08em" }}>
                                Contradiction forces ascent to →
                              </div>
                              <div style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: steps[idx + 1].color, fontWeight: "bold", marginTop: "4px" }}>
                                {steps[idx + 1].label}
                              </div>
                            </div>
                          )}
                          {idx === steps.length - 1 && (
                            <div style={{ textAlign: "center", marginTop: "14px" }}>
                              <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#A855F7", letterSpacing: "0.08em", fontStyle: "italic" }}>
                                The journey approaches Absolute Knowledge — but only through the struggle for recognition...
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Summit indicator */}
                <div style={{
                  marginLeft: `${steps.length * 18}px`,
                  padding: "clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 18px)",
                  borderRadius: "8px",
                  background: "#1D4ED811",
                  border: "1px dashed #1D4ED866",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#C4B5FD", letterSpacing: "0.1em", fontStyle: "italic" }}>
                    ✦ Absolute Knowledge — the goal beyond the horizon ✦
                  </div>
                </div>
              </div>

              {/* Sublated tracker sidebar */}
              {sublated.length > 0 && (
                <div style={{
                  flex: "0 0 min(200px, 100%)",
                  background: "#04091eaa",
                  border: "1px solid #4ADE8033",
                  borderRadius: "8px",
                  padding: "clamp(10px, 1.8vw, 16px)"
                }}>
                  <div style={{ fontSize: "clamp(9px, 1.2vw, 10px)", letterSpacing: "0.18em", color: "#4ADE80", textTransform: "uppercase", marginBottom: "10px" }}>
                    Sublated So Far
                  </div>
                  <p style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: "#64748B", fontStyle: "italic", margin: "0 0 10px 0", lineHeight: 1.5 }}>
                    Each insight is cancelled in its one-sidedness, yet preserved in the richer whole:
                  </p>
                  {sublated.map(id => (
                    <div key={id} style={{
                      marginBottom: "8px",
                      padding: "6px 8px",
                      borderRadius: "5px",
                      background: `${steps[id].color}15`,
                      borderLeft: `3px solid ${steps[id].color}`
                    }}>
                      <div style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: steps[id].color, fontWeight: "bold", marginBottom: "3px" }}>
                        {steps[id].label}
                      </div>
                      <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#86EFAC", lineHeight: 1.5 }}>
                        {steps[id].sublatedContent}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{ ...cardBase, borderLeft: "4px solid #7C3AED", background: "#0e0a2699" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#A78BFA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "10px" }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#CBD5E1", lineHeight: 1.75, margin: "0 0 12px 0" }}>
            Self-consciousness cannot validate itself through solitary introspection. It requires acknowledgment from other self-conscious beings, making knowledge inherently intersubjective. But what happens when two self-conscious beings first encounter each other — each claiming to be the universal standard of what is real, each needing the other's recognition to be fully itself?
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#A78BFA", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the primal struggle between two self-consciousnesses — each willing to risk everything, even life itself, to secure recognition from the other.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{ ...cardBase, background: "#08112299", marginBottom: 0 }}>
          <div
            onClick={() => setEchosOpen(o => !o)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps" }}>
              Real-World Echoes
            </div>
            <div style={{ color: "#60A5FA", display: "flex", alignItems: "center" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {echosOpen && (
            <div style={{ marginTop: "16px" }}>
              <div style={{
                padding: "clamp(12px, 2vw, 18px)",
                borderRadius: "6px",
                background: "#0d1a3e88",
                border: "1px solid #1D4ED833",
                marginBottom: "12px"
              }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#93C5FD", fontWeight: "bold", marginBottom: "6px" }}>
                  Physics and the Supersensible
                </div>
                <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                  Modern science exemplifies the 'Understanding' stage: we explain visible effects through invisible causes — gravity curves spacetime, electromagnetism propagates fields, quarks bind nucleons. The 'real' world retreats behind the phenomena into an invisible, lawlike supersensible domain. Yet, as Hegel saw, these laws are mind's own projections onto nature.
                </p>
              </div>
              <div style={{
                padding: "clamp(12px, 2vw, 18px)",
                borderRadius: "6px",
                background: "#0d1a3e88",
                border: "1px solid #1D4ED833"
              }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#93C5FD", fontWeight: "bold", marginBottom: "6px" }}>
                  Western Philosophy as the Struggle for Recognition
                </div>
                <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                  The history of Western philosophy and culture can itself be read as the Phenomenology writ large — successive civilizations and thinkers each attempting to resolve the problem of mutual recognition: Stoic withdrawal, Roman legal personhood, Christian inwardness, Enlightenment autonomy. Each is a stage that collapses under its own contradictions and forces the next attempt.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function ContradictionViz({ step }) {
  const svgRef = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 60);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const t = tick / 60;

  if (step.animationHint === "dissolving") {
    const words = ["this", "here", "now"];
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        {words.map((w, i) => {
          const phase = (t + i * 0.33) % 1;
          const opacity = Math.abs(Math.sin(phase * Math.PI));
          const scale = 0.7 + 0.5 * Math.abs(Math.sin(phase * Math.PI * 0.7));
          return (
            <g key={w} transform={`translate(${50 + i * 90}, 30) scale(${scale})`}>
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle"
                fill={step.color} opacity={opacity}
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(11px, 1.8vw, 14px)", fontStyle: "italic" }}>
                {w}
              </text>
              <text x={12 + Math.sin(phase * Math.PI * 2) * 8} y={-8 + Math.cos(phase * Math.PI * 2) * 5}
                textAnchor="middle" dominantBaseline="middle"
                fill="#93C5FD" opacity={1 - opacity}
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>
                universal
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (step.animationHint === "splitting") {
    const phase = t;
    const split = Math.abs(Math.sin(phase * Math.PI));
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <circle cx="150" cy="30" r="18" fill="none" stroke={step.color} strokeWidth="1.5" opacity="0.6" />
        {["white", "cubic", "tart", "hard"].map((prop, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
          const r = 14 + split * 22;
          const x = 150 + Math.cos(angle) * r;
          const y = 30 + Math.sin(angle) * r;
          return (
            <text key={prop} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fill={step.color} opacity={0.5 + split * 0.5}
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)", fontStyle: "italic" }}>
              {prop}
            </text>
          );
        })}
        <text x="150" y="30" textAnchor="middle" dominantBaseline="middle"
          fill="#E0EAFF" opacity={1 - split * 0.7}
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(9px, 1.4vw, 11px)" }}>
          salt
        </text>
      </svg>
    );
  }

  if (step.animationHint === "reflection") {
    const phase = t;
    const pulse = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <line x1="50" y1="30" x2="130" y2="30" stroke={step.color} strokeWidth="1.5" opacity="0.7" strokeDasharray="4 3" />
        <line x1="170" y1="30" x2="250" y2="30" stroke={step.color} strokeWidth="1.5" opacity="0.7" strokeDasharray="4 3" />
        <ellipse cx="150" cy="30" rx={12 + pulse * 6} ry={8 + pulse * 4}
          fill="none" stroke={step.color} strokeWidth="1.5" opacity={0.5 + pulse * 0.4} />
        <text x="90" y="24" textAnchor="middle" fill="#93C5FD" opacity="0.8"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>outer</text>
        <text x="210" y="24" textAnchor="middle" fill="#93C5FD" opacity="0.8"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>inner</text>
        <text x="150" y="30" textAnchor="middle" dominantBaseline="middle"
          fill={step.color} opacity={pulse}
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>mind</text>
      </svg>
    );
  }

  if (step.animationHint === "encounter") {
    const phase = t;
    const dist = 28 + Math.abs(Math.sin(phase * Math.PI)) * 28;
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <circle cx={150 - dist} cy="30" r="12" fill={step.color} opacity="0.25" />
        <text x={150 - dist} y="30" textAnchor="middle" dominantBaseline="middle"
          fill={step.color} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>I</text>
        <circle cx={150 + dist} cy="30" r="12" fill="#EC489988" opacity="0.25" />
        <text x={150 + dist} y="30" textAnchor="middle" dominantBaseline="middle"
          fill="#EC4899" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>Other</text>
        {dist < 40 && (
          <line x1={150 - dist + 14} y1="30" x2={150 + dist - 14} y2="30"
            stroke="#F59E0B" strokeWidth="1" opacity={1 - dist / 56} strokeDasharray="3 3" />
        )}
      </svg>
    );
  }

  return null;
}

// ─── Part 3: The Life and Death Struggle ───
function MasterSlaveDialectic() {
  const [sliderDependence, setSliderDependence] = useState(0);
  const [sliderCompetence, setSliderCompetence] = useState(0);
  const [selectedArrow, setSelectedArrow] = useState(null);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [phase, setPhase] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const accent = "#92400E";
  const accentBright = "#D97706";

  const keyConcepts = [
    { id: "recognition", label: "Recognition", desc: "For Hegel, self-consciousness cannot validate itself in isolation — it requires that another free being acknowledge it as free. This recognition is not a social nicety but an ontological condition: without mutual recognition, 'I' cannot fully know myself as an 'I.' The demand for recognition is the root of all social conflict and the precondition of genuine freedom." },
    { id: "life_death_struggle", label: "Life-and-Death Struggle", desc: "The initial encounter between two self-consciousnesses escalates to mortal combat because each must prove that it values freedom over mere biological survival. Spirit is not reducible to life; a being that clings to life at the cost of freedom has revealed that it is not genuinely free. The one who backs down, preferring survival, becomes the slave — the one who risks death, the master." },
    { id: "master", label: "Master", desc: "The master is the self-consciousness that risked death and won. She now enjoys the fruits of the slave's labor without working herself, and has the recognition she sought — but recognition from a being she has reduced to a thing. Coerced recognition is valueless: the master has won a victory that immediately empties itself, producing not genuine self-confirmation but isolation and stagnation." },
    { id: "slave_labor", label: "Slave / Labor and Self-Objectification", desc: "The slave, forced to work on external matter under the master's direction, paradoxically begins a process of genuine self-discovery. In shaping the world, the slave externalizes her will — the finished object is a mirror of her inner life, a permanent record of her activity. Through disciplined labor, she develops real competence and encounters herself as a genuinely effective agent in the world." },
    { id: "dialectical_reversal", label: "Dialectical Reversal", desc: "The great irony of the dialectic: what appears as power (the master's domination) conceals radical dependence and spiritual stagnation; what appears as submission (the slave's labor) generates genuine self-knowledge and growing freedom. This reversal is not a political revolution but a logical inversion already implicit in the structure of the original relation — the machinery of its own undoing is contained within it from the start." },
    { id: "stoicism_unhappy_consciousness", label: "Stoicism and Unhappy Consciousness", desc: "After the reversal becomes apparent, the slave's developing consciousness passes through Stoicism (withdrawal into inner freedom: 'I am free in thought, whatever my outward condition') and Unhappy Consciousness (the split between the self that clings to finitude and the self that yearns for the infinite). These are necessary stations on the way to a self-consciousness that can sustain its freedom in and through its engagement with the world." },
  ];
  const accentGlow = "#F59E0B";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      canvas.width = container.offsetWidth;
      canvas.height = Math.min(container.offsetWidth * 0.35, 160);
      initParticles();
    });
    observer.observe(container);
    canvas.width = container.offsetWidth;
    canvas.height = Math.min(container.offsetWidth * 0.35, 160);
    initParticles();
    return () => observer.disconnect();
  }, []);

  function initParticles() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.5 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.8 + 0.2),
      life: Math.random(),
      size: Math.random() * 2.5 + 0.5,
      hue: Math.random() * 40,
    }));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
      grad.addColorStop(0, "#1a0800");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        if (p.life <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height;
          p.life = 0.8 + Math.random() * 0.2;
          p.vy = -(Math.random() * 0.8 + 0.2);
          p.vx = (Math.random() - 0.5) * 0.4;
        }
        const alpha = p.life * 0.7;
        const r = 220 + Math.floor(p.hue * 0.5);
        const g = 80 + Math.floor(p.hue * 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.min(255,r).toString(16).padStart(2,'0')}${Math.min(255,g).toString(16).padStart(2,'0')}20`;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animFrameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const masterArrows = [
    {
      id: "m1",
      label: "Hollow Tribute",
      x1: 0.52, y1: 0.32, x2: 0.42, y2: 0.52,
      desc: "Recognition extracted by force is worthless. The slave bows not from genuine acknowledgment but from fear of death. The master's craving for validation remains forever unsatisfied.",
      active: sliderDependence > 20,
    },
    {
      id: "m2",
      label: "Material Need",
      x1: 0.38, y1: 0.75, x2: 0.45, y2: 0.58,
      desc: "The master consumes what the slave produces but cannot create anything himself. Every meal, every object of comfort is now mediated through the slave's labor — dependence deepens invisibly.",
      active: sliderDependence > 45,
    },
    {
      id: "m3",
      label: "Stagnation",
      x1: 0.42, y1: 0.22, x2: 0.35, y2: 0.38,
      desc: "Without the discipline of labor or the resistance of the material world, the master's self-consciousness remains abstract and hollow — a freedom that is actually paralysis.",
      active: sliderDependence > 70,
    },
  ];

  const slaveArrows = [
    {
      id: "s1",
      label: "Labor Transforms",
      x1: 0.58, y1: 0.68, x2: 0.7, y2: 0.55,
      desc: "In working on the material world, the slave encounters real resistance and must develop genuine skill. The object shaped by labor bears the imprint of the worker's will — a first form of self-objectification.",
      active: sliderCompetence > 20,
    },
    {
      id: "s2",
      label: "Self-Recognition",
      x1: 0.72, y1: 0.42, x2: 0.62, y2: 0.35,
      desc: "The slave sees himself reflected in his created objects. Unlike the master's abstract self-assertion, this recognition is concrete: the product exists independently and attests to the worker's power.",
      active: sliderCompetence > 45,
    },
    {
      id: "s3",
      label: "Growing Autonomy",
      x1: 0.78, y1: 0.62, x2: 0.75, y2: 0.78,
      desc: "As competence accumulates, the slave's dependence on the master's protection diminishes. The dialectical reversal becomes palpable: the one who seemed powerless holds the real foundations of the social order.",
      active: sliderCompetence > 70,
    },
  ];

  const allArrows = [...masterArrows, ...slaveArrows];

  const masterDim = Math.max(0.15, 1 - sliderDependence / 130);
  const slaveBright = 0.3 + (sliderCompetence / 100) * 0.7;

  function handleAutoPlay() {
    if (animating) return;
    setAnimating(true);
    setSliderDependence(0);
    setSliderCompetence(0);
    let dep = 0, comp = 0;
    const interval = setInterval(() => {
      dep = Math.min(100, dep + 2);
      comp = Math.min(100, comp + 1.5);
      setSliderDependence(dep);
      setSliderCompetence(comp);
      if (dep >= 100 && comp >= 100) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 50);
  }

  const selected = selectedArrow ? allArrows.find(a => a.id === selectedArrow) : null;

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 30% 20%, #3d1a05 0%, #1a0800 40%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        padding: "clamp(16px, 4vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "min(90vw, 860px)" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 3vw, 36px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: accentBright,
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>Part 3 of 20 · Hegel's Phenomenology of Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            color: "#F5E6D0",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            letterSpacing: "0.03em",
          }}>The Life and Death Struggle</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#C9A882",
            margin: 0,
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6",
          }}>The master-slave dialectic reveals that genuine freedom can only emerge through mutual recognition — never through domination.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0f0800cc",
          border: "1px solid #2a1500",
          borderLeft: `4px solid ${accent}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: accentBright,
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#E8D5B8",
            margin: 0,
            lineHeight: "1.75",
          }}>
            Self-consciousness demands to be recognized — but what happens when two self-conscious beings meet for the first time, each treating <em>itself</em> as the sole measure of reality? Neither can simply grant recognition to the other without undermining its own claim to supremacy. The raw encounter between two selves is not a negotiation — it is a collision. Something must give way, and the question is whether what gives way is a body or a freedom.
          </p>
        </div>

        {/* Forge embers canvas */}
        <canvas ref={canvasRef} style={{ width: "100%", display: "block", borderRadius: "6px 6px 0 0", marginBottom: "0" }} />

        {/* Main Visualization */}
        <div style={{
          background: "#100a02ee",
          border: "1px solid #2a1500",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          padding: "clamp(12px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}>
            <h2 style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              color: "#F5E6D0",
              margin: 0,
              fontWeight: "normal",
            }}>The Dialectical Reversal</h2>
            <button
              onClick={handleAutoPlay}
              disabled={animating}
              style={{
                background: animating ? "#2a1500" : accent,
                color: animating ? "#7a5030" : "#FFF8F0",
                border: "none",
                borderRadius: "5px",
                padding: "7px 16px",
                fontSize: "clamp(11px, 1.5vw, 13px)",
                fontFamily: "Georgia, serif",
                cursor: animating ? "default" : "pointer",
                letterSpacing: "0.05em",
                transition: "background 0.3s",
              }}
            >
              {animating ? "Unfolding..." : "▶ Animate Reversal"}
            </button>
          </div>

          {/* SVG Stage */}
          <svg
            viewBox="0 0 800 340"
            width="100%"
            style={{ display: "block", marginBottom: "12px" }}
          >
            {/* Background split */}
            <defs>
              <radialGradient id="masterBg" cx="30%" cy="40%">
                <stop offset="0%" stopColor={`#3d1505`} stopOpacity={masterDim} />
                <stop offset="100%" stopColor="#0a0400" stopOpacity={masterDim * 0.5} />
              </radialGradient>
              <radialGradient id="slaveBg" cx="70%" cy="60%">
                <stop offset="0%" stopColor="#3d2a05" stopOpacity={slaveBright * 0.8} />
                <stop offset="100%" stopColor="#0a0700" stopOpacity={slaveBright * 0.3} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="400" height="340" fill="url(#masterBg)" />
            <rect x="400" y="0" width="400" height="340" fill="url(#slaveBg)" />
            <line x1="400" y1="0" x2="400" y2="340" stroke="#3a1a00" strokeWidth="1.5" strokeDasharray="6,4" />

            {/* Labels */}
            <text x="200" y="28" textAnchor="middle" fill={`#${Math.floor(180*masterDim).toString(16).padStart(2,'0')}9060`} fontSize="13" fontFamily="Georgia, serif" letterSpacing="3">MASTER</text>
            <text x="600" y="28" textAnchor="middle" fill={`#${Math.floor(200*slaveBright).toString(16).padStart(2,'0')}${Math.floor(130*slaveBright).toString(16).padStart(2,'0')}40`} fontSize="13" fontFamily="Georgia, serif" letterSpacing="3">SLAVE / BONDSMAN</text>

            {/* Throne / Master figure */}
            <rect x="155" y="130" width="80" height="50" rx="4" fill="#1a0900" stroke={`#${Math.floor(100*masterDim).toString(16).padStart(2,'0')}4010`} strokeWidth="1.5" />
            <rect x="170" y="118" width="50" height="15" rx="2" fill="#2a1000" stroke="#3a1800" strokeWidth="1" />
            {/* Master body */}
            <ellipse cx="195" cy="108" rx="18" ry="22" fill={`#${Math.floor(160*masterDim).toString(16).padStart(2,'0')}7030`} />
            <circle cx="195" cy="82" r="13" fill={`#${Math.floor(150*masterDim).toString(16).padStart(2,'0')}6828`} />
            {/* Crown */}
            <polygon points="182,72 188,62 195,70 202,62 208,72" fill={accentBright} opacity={masterDim} />
            {/* Scepter */}
            <line x1="215" y1="90" x2="230" y2="130" stroke="#7a5020" strokeWidth="2.5" opacity={masterDim} />
            <circle cx="230" cy="133" r="4" fill={accentBright} opacity={masterDim} />

            {/* Slave/Bowed figure before master */}
            <ellipse cx="280" cy="185" rx="14" ry="10" fill="#2a1500" />
            <circle cx="280" cy="170" r="10" fill="#2a1200" />
            {/* Bowed posture */}
            <path d="M280 180 Q 270 200 265 215" stroke="#3a1800" strokeWidth="3" fill="none" />
            <path d="M280 180 Q 290 200 295 210" stroke="#3a1800" strokeWidth="3" fill="none" />

            {/* Forge on slave side */}
            <rect x="490" y="220" width="60" height="45" rx="3" fill="#1a0a00" stroke="#4a2000" strokeWidth="1.5" />
            <ellipse cx="520" cy="220" rx="30" ry="8" fill="#2a1200" stroke="#5a2800" strokeWidth="1" />
            {/* Forge fire */}
            {sliderCompetence > 5 && (
              <>
                <ellipse cx="520" cy="215" rx="12" ry={6 + sliderCompetence * 0.06} fill="#D97706" opacity={slaveBright * 0.8} filter="url(#glow)" />
                <ellipse cx="516" cy="212" rx="7" ry={4 + sliderCompetence * 0.04} fill="#F59E0B" opacity={slaveBright * 0.6} />
                <ellipse cx="524" cy="213" rx="5" ry={3 + sliderCompetence * 0.03} fill="#FCD34D" opacity={slaveBright * 0.5} />
              </>
            )}

            {/* Slave/Worker figure */}
            <circle cx="570" cy="195" r="13" fill={`#${Math.floor(160*slaveBright).toString(16).padStart(2,'0')}8030`} />
            <rect x="558" y="208" width="24" height="40" rx="4" fill={`#${Math.floor(130*slaveBright).toString(16).padStart(2,'0')}6020`} />
            {/* Arm with hammer */}
            <line x1="582" y1="220" x2="605" y2="235" stroke={`#${Math.floor(140*slaveBright).toString(16).padStart(2,'0')}6020`} strokeWidth="4" />
            <rect x="603" y="230" width="14" height="8" rx="2" fill="#5a3010" />

            {/* Created objects accumulating */}
            {sliderCompetence > 15 && (
              <rect x="450" y="265" width="22" height="16" rx="2" fill={`#${Math.floor(120*slaveBright).toString(16).padStart(2,'0')}5010`} stroke={accentBright} strokeWidth="0.8" opacity={Math.min(1, (sliderCompetence - 15) / 30)} />
            )}
            {sliderCompetence > 35 && (
              <rect x="476" y="260" width="18" height="20" rx="2" fill={`#${Math.floor(130*slaveBright).toString(16).padStart(2,'0')}5510`} stroke={accentBright} strokeWidth="0.8" opacity={Math.min(1, (sliderCompetence - 35) / 30)} />
            )}
            {sliderCompetence > 55 && (
              <ellipse cx="435" cy="275" rx="12" ry="8" fill={`#${Math.floor(140*slaveBright).toString(16).padStart(2,'0')}6010`} stroke={accentGlow} strokeWidth="0.8" opacity={Math.min(1, (sliderCompetence - 55) / 30)} />
            )}
            {sliderCompetence > 75 && (
              <rect x="500" y="255" width="14" height="25" rx="2" fill={`#${Math.floor(150*slaveBright).toString(16).padStart(2,'0')}6510`} stroke={accentGlow} strokeWidth="1" opacity={Math.min(1, (sliderCompetence - 75) / 25)} filter="url(#glow)" />
            )}

            {/* Dependency arrows (master side) */}
            {masterArrows.map((arrow) => {
              if (!arrow.active) return null;
              const x1 = arrow.x1 * 800;
              const y1 = arrow.y1 * 340;
              const x2 = arrow.x2 * 800;
              const y2 = arrow.y2 * 340;
              const isHov = hoveredArrow === arrow.id;
              const isSel = selectedArrow === arrow.id;
              const col = isSel ? "#F87171" : isHov ? "#FCA5A5" : "#EF4444";
              const op = Math.min(1, (sliderDependence - (arrow.id === "m1" ? 20 : arrow.id === "m2" ? 45 : 70)) / 25);
              return (
                <g key={arrow.id} style={{ cursor: "pointer" }}
                  onClick={() => setSelectedArrow(selectedArrow === arrow.id ? null : arrow.id)}
                  onMouseEnter={() => setHoveredArrow(arrow.id)}
                  onMouseLeave={() => setHoveredArrow(null)}
                  opacity={op}
                >
                  <defs>
                    <marker id={`arrowhead-m-${arrow.id}`} markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={col} />
                    </marker>
                  </defs>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={col} strokeWidth={isHov || isSel ? 2.5 : 1.8}
                    strokeDasharray="5,3"
                    markerEnd={`url(#arrowhead-m-${arrow.id})`}
                    filter={isHov || isSel ? "url(#glow)" : "none"}
                  />
                  <rect
                    x={Math.min(x1, x2) + Math.abs(x2 - x1) * 0.25}
                    y={Math.min(y1, y2) + Math.abs(y2 - y1) * 0.2}
                    width="80" height="18" rx="3"
                    fill="#0f0500cc"
                    stroke={col}
                    strokeWidth="0.8"
                  />
                  <text
                    x={Math.min(x1, x2) + Math.abs(x2 - x1) * 0.25 + 40}
                    y={Math.min(y1, y2) + Math.abs(y2 - y1) * 0.2 + 12}
                    textAnchor="middle"
                    fill={col}
                    fontSize="9"
                    fontFamily="Georgia, serif"
                  >{arrow.label}</text>
                </g>
              );
            })}

            {/* Competence arrows (slave side) */}
            {slaveArrows.map((arrow) => {
              if (!arrow.active) return null;
              const x1 = arrow.x1 * 800;
              const y1 = arrow.y1 * 340;
              const x2 = arrow.x2 * 800;
              const y2 = arrow.y2 * 340;
              const isHov = hoveredArrow === arrow.id;
              const isSel = selectedArrow === arrow.id;
              const col = isSel ? accentGlow : isHov ? "#FDE68A" : accentBright;
              const op = Math.min(1, (sliderCompetence - (arrow.id === "s1" ? 20 : arrow.id === "s2" ? 45 : 70)) / 25);
              return (
                <g key={arrow.id} style={{ cursor: "pointer" }}
                  onClick={() => setSelectedArrow(selectedArrow === arrow.id ? null : arrow.id)}
                  onMouseEnter={() => setHoveredArrow(arrow.id)}
                  onMouseLeave={() => setHoveredArrow(null)}
                  opacity={op}
                >
                  <defs>
                    <marker id={`arrowhead-s-${arrow.id}`} markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={col} />
                    </marker>
                  </defs>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={col} strokeWidth={isHov || isSel ? 2.5 : 1.8}
                    markerEnd={`url(#arrowhead-s-${arrow.id})`}
                    filter={isHov || isSel ? "url(#glowStrong)" : "url(#glow)"}
                  />
                  <rect
                    x={Math.min(x1, x2) + Math.abs(x2 - x1) * 0.2}
                    y={Math.min(y1, y2) + Math.abs(y2 - y1) * 0.25}
                    width="88" height="18" rx="3"
                    fill="#0a0700cc"
                    stroke={col}
                    strokeWidth="0.8"
                  />
                  <text
                    x={Math.min(x1, x2) + Math.abs(x2 - x1) * 0.2 + 44}
                    y={Math.min(y1, y2) + Math.abs(y2 - y1) * 0.25 + 12}
                    textAnchor="middle"
                    fill={col}
                    fontSize="9"
                    fontFamily="Georgia, serif"
                  >{arrow.label}</text>
                </g>
              );
            })}

            {/* Reversal indicator */}
            {sliderDependence > 60 && sliderCompetence > 60 && (
              <g opacity={Math.min(1, (Math.min(sliderDependence, sliderCompetence) - 60) / 35)}>
                <text x="400" y="310" textAnchor="middle" fill={accentGlow} fontSize="11" fontFamily="Georgia, serif" letterSpacing="2" filter="url(#glow)">
                  ← THE REVERSAL BECOMES VISIBLE →
                </text>
              </g>
            )}
          </svg>

          {/* Selected arrow detail */}
          {selected && (
            <div style={{
              background: "#1a0a00cc",
              border: `1px solid ${selected.id.startsWith('m') ? '#7f1d1d' : accent}`,
              borderLeft: `4px solid ${selected.id.startsWith('m') ? '#EF4444' : accentGlow}`,
              borderRadius: "6px",
              padding: "clamp(12px, 2vw, 18px)",
              marginBottom: "16px",
            }}>
              <div style={{
                fontSize: "clamp(10px, 1.4vw, 12px)",
                letterSpacing: "0.15em",
                color: selected.id.startsWith('m') ? "#FCA5A5" : accentGlow,
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>{selected.label}</div>
              <p style={{
                fontSize: "clamp(12px, 1.7vw, 14px)",
                color: "#E8D5B8",
                margin: 0,
                lineHeight: "1.7",
              }}>{selected.desc}</p>
            </div>
          )}

          {/* Sliders */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(10px, 2vw, 20px)",
            marginBottom: "16px",
          }}>
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}>
                <span style={{ fontSize: "clamp(10px, 1.5vw, 13px)", color: "#FCA5A5", letterSpacing: "0.08em" }}>Master's Dependence</span>
                <span style={{ fontSize: "clamp(10px, 1.5vw, 12px)", color: "#F87171" }}>{sliderDependence}%</span>
              </div>
              <input type="range" min="0" max="100" value={sliderDependence}
                onChange={(e) => setSliderDependence(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#EF4444",
                  cursor: "pointer",
                  background: "transparent",
                }}
              />
              <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#7a3030", marginTop: "4px", lineHeight: "1.5" }}>
                Raises red arrows — each reveals the master's hollow grip
              </div>
            </div>
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}>
                <span style={{ fontSize: "clamp(10px, 1.5vw, 13px)", color: accentBright, letterSpacing: "0.08em" }}>Slave's Competence</span>
                <span style={{ fontSize: "clamp(10px, 1.5vw, 12px)", color: accentGlow }}>{sliderCompetence}%</span>
              </div>
              <input type="range" min="0" max="100" value={sliderCompetence}
                onChange={(e) => setSliderCompetence(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: accentBright,
                  cursor: "pointer",
                  background: "transparent",
                }}
              />
              <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#5a3a10", marginTop: "4px", lineHeight: "1.5" }}>
                Raises golden arrows — each reveals the slave's growing selfhood
              </div>
            </div>
          </div>

          {/* Narrative summary */}
          <div style={{
            marginTop: "20px",
            borderTop: "1px solid #2a1500",
            paddingTop: "16px",
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              color: "#C9A882",
              margin: 0,
              lineHeight: "1.8",
            }}>
              The master's victory is immediately Pyrrhic. Recognition demanded at sword-point acknowledges nothing — a coerced 'I recognize you' is merely a statement of weakness. Meanwhile, through the discipline of labor, the slave develops real competence, encounters the genuine resistance of matter, and comes to see his inner life reflected in the objects he creates. The dialectic completes itself silently, from within: the very relation that seemed to fix master above slave contains the logical machinery of its own undoing.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accentBright}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accentBright, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accentBright : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accentBright : accentBright + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accentBright}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accentBright, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0a0c10cc",
          border: "1px solid #1a2030",
          borderLeft: "4px solid #7C3AED",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#A78BFA",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#D8CCF0",
            margin: "0 0 12px 0",
            lineHeight: "1.75",
          }}>
            The master-slave relation is inherently unstable and ultimately satisfies neither party. The master cannot receive genuine recognition from a coerced inferior; the slave, for all her growing competence, remains externally dominated. The dialectic exposes the impossibility of asymmetric recognition — but it does not yet tell us what institutions, practices, or forms of life could actually sustain the mutual, freely-given acknowledgment that selfhood requires. A dyad of domination cannot model a society of equals.
          </p>
          <p style={{
            fontSize: "clamp(11px, 1.6vw, 13px)",
            color: "#7C3AED",
            margin: 0,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}>
            This pressure forces the next development: Spirit must seek more adequate social structures — ethical life, law, moral community — in which recognition can be institutionalized rather than merely won in individual combat.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#080c08cc",
          border: "1px solid #1a2a1a",
          borderLeft: `4px solid #16A34A`,
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "clamp(16px, 3vw, 28px)",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            <div>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                color: "#4ADE80",
                textTransform: "uppercase",
                fontVariant: "small-caps",
              }}>Real-World Echoes</span>
              <span style={{
                display: "block",
                fontSize: "clamp(11px, 1.6vw, 13px)",
                color: "#86EFAC",
                marginTop: "2px",
              }}>Frantz Fanon, Marx, and revolutionary recognition</span>
            </div>
            {echosOpen
              ? <ChevronUp size={20} color="#4ADE80" />
              : <ChevronDown size={20} color="#4ADE80" />}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  {
                    title: "Colonial Domination & Anti-Colonial Resistance",
                    body: "Frantz Fanon's Wretched of the Earth applies Hegel's dialectic directly to colonial relations: the colonized subject, denied recognition by the colonizer, cannot achieve selfhood through the master's categories. Liberation requires not just political independence but a transformation of consciousness — a reclamation of the self that the colonial relation had tried to negate.",
                    icon: "🌍",
                  },
                  {
                    title: "Marx and Alienated Labor",
                    body: "Marx inverted Hegel's idealism while preserving the dialectic: the worker who creates all wealth is estranged from the product of her labor, from the act of production, from her species-being, and from other workers. Capitalist relations reproduce the master-slave structure industrially — the slave creates, the master consumes, and the reversal awaits in historical time rather than philosophical logic.",
                    icon: "⚒",
                  },
                  {
                    title: "Revolutionary Movements & Dignity",
                    body: "From the Haitian Revolution — which Hegel may have known about — to twentieth-century independence movements to contemporary protests for racial and economic dignity, the demand underlying each is Hegelian: not merely material redistribution, but recognition. The oppressed insist not only on rights but on being seen as genuinely human — the precise demand that hollow tribute can never satisfy.",
                    icon: "✊",
                  },
                ].map((echo) => (
                  <div key={echo.title} style={{
                    background: "#060f06dd",
                    border: "1px solid #1a3a1a",
                    borderRadius: "6px",
                    padding: "clamp(12px, 2vw, 18px)",
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}>
                      <span style={{ fontSize: "clamp(18px, 2.5vw, 22px)", flexShrink: 0 }}>{echo.icon}</span>
                      <div>
                        <div style={{
                          fontSize: "clamp(12px, 1.7vw, 14px)",
                          color: "#4ADE80",
                          marginBottom: "6px",
                          letterSpacing: "0.04em",
                        }}>{echo.title}</div>
                        <p style={{
                          fontSize: "clamp(11px, 1.6vw, 13px)",
                          color: "#A7C5A7",
                          margin: 0,
                          lineHeight: "1.7",
                        }}>{echo.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav hint */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.4vw, 12px)",
          color: "#4a2a10",
          letterSpacing: "0.1em",
          paddingBottom: "16px",
        }}>
          Part 3 of 20 · The Phenomenology of Spirit continues →
        </div>

      </div>
    </div>
  );
}

// ─── Part 4: The Architecture of the Absolute ───
function ArchitectureOfTheAbsolute() {
  const [selectedRing, setSelectedRing] = useState(null);
  const [hoveredRing, setHoveredRing] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [pulseT, setPulseT] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const accent = "#6D28D9";

  const keyConcepts = [
    { id: "the_absolute", label: "The Absolute", desc: "The Absolute is Hegel's term for reality as a self-comprehending totality — not a thing or substance but a self-developing process that contains and generates all finite things within itself. It is not something separate from the world but the world understood as a unified, rational whole." },
    { id: "logic_nature_spirit", label: "Logic / Nature / Spirit", desc: "Hegel's system divides into three spheres: the Logic (pure conceptual structures before any world exists), Nature (the Idea externalized in space and time), and Spirit (the Idea returning to itself through conscious freedom). These are not separate topics but three phases of a single self-unfolding reality." },
    { id: "externalization", label: "Externalization", desc: "Externalization (Entäusserung) is the moment the Absolute Idea 'lets itself go' into Nature — into the realm of space, time, and physical contingency. This is a necessary step: Spirit can only return to itself by first going outside itself, encountering an other, and recognizing that other as itself." },
    { id: "self_returning_circle", label: "Self-Returning Circle", desc: "The entire system is circular: the end (Absolute Spirit knowing itself) is already implicitly present at the beginning (pure Being), and the beginning is fully understood only in light of the end. This is not a vicious circle but what Hegel calls the 'circle of circles' — each part presupposes and completes every other." },
    { id: "idea_in_otherness", label: "Idea in Otherness", desc: "Nature is not the opposite of thought but the Idea in the form of otherness — logic in spatial-temporal disguise. This means that the rational structure uncovered in the Logic is the same structure science discovers in the natural world, making genuine knowledge of nature possible without appeal to an unknowable thing-in-itself." },
    { id: "systematic_philosophy", label: "Systematic Philosophy", desc: "Hegel insists philosophy must be a system — not a collection of isolated insights but an internally connected whole where each claim derives its meaning from its place in the total structure. A philosophical claim pulled from the system is like a limb severed from a living body: it cannot function as it did when alive." },
  ];

  const rings = [
    {
      id: "logic",
      label: "Logic",
      color: "#6D28D9",
      description: "The inner rational structure of reality — pure conceptual categories developing from Being through Essence to the Absolute Idea, before any externalization in time or space.",
      stages: [
        { name: "Being", desc: "The most abstract, immediate starting point: pure undetermined presence." },
        { name: "Essence", desc: "Being reflecting on itself, generating appearance and ground distinctions." },
        { name: "The Notion", desc: "The self-determining concept — subjectivity, objectivity, and their unity." },
        { name: "Absolute Idea", desc: "Logic's culmination: thought that grasps itself as the whole." }
      ]
    },
    {
      id: "nature",
      label: "Nature",
      color: "#9333EA",
      description: "The Idea in its otherness — logical categories externalized in space, time, and matter. Nature is not opposed to Spirit but is Logic alienated from itself, awaiting return.",
      stages: [
        { name: "Mechanics", desc: "Space, time, matter — the abstract externality of natural being." },
        { name: "Physics", desc: "Light, chemical process — nature gaining inner differentiation." },
        { name: "Organics", desc: "Life itself — nature's highest form, preparing for self-consciousness." },
        { name: "Geology & Biology", desc: "The earth organism culminating in the animal subject." }
      ]
    },
    {
      id: "spirit",
      label: "Spirit",
      color: "#A855F7",
      description: "Logic returning to itself through Nature — self-conscious freedom realizing the rational structure first laid out abstractly in Logic, now made concrete in mind, culture, and history.",
      stages: [
        { name: "Subjective Spirit", desc: "Individual consciousness — soul, phenomenology, psychology." },
        { name: "Objective Spirit", desc: "Right, morality, and ethical life — freedom made institutional." },
        { name: "Absolute Spirit", desc: "Art, religion, and philosophy — Spirit knowing itself as Absolute." },
        { name: "Absolute Knowledge", desc: "The complete circle closed: systematic self-comprehension." }
      ]
    }
  ];

  useEffect(() => {
    let frame;
    const tick = (t) => {
      timeRef.current = t;
      setPulseT(t);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const draw = (t) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const baseR = minDim * 0.08;

      const numParticles = 60;
      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2 + t * 0.0003;
        const radiusFactor = 0.2 + 0.3 * ((i * 0.618033) % 1);
        const r = minDim * radiusFactor;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const alpha = 0.08 + 0.12 * Math.sin(t * 0.001 + i);
        const size = 1 + 1.5 * ((i * 0.31) % 1);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `#6D28D9${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  const t = pulseT;
  const pulse = 0.5 + 0.5 * Math.sin(t * 0.002);
  const slowPulse = 0.5 + 0.5 * Math.sin(t * 0.0008);

  const ringRadii = [42, 68, 90];
  const viewBoxSize = 220;
  const cx = 110;
  const cy = 110;

  const getStrokeDash = (ringIndex) => {
    const phase = (t * 0.0004 + ringIndex * 0.33) % 1;
    return `${phase * 100} ${100 - phase * 100 + 0.01}`;
  };

  const isActive = (id) => selectedRing === id || hoveredRing === id;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 30%, #2e1065 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      fontFamily: "Georgia, serif",
      color: "#e2d9f3"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vw, 28px)"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(4px, 1vw, 8px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: "8px"
          }}>Part 4 of 20 — Hegel's System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: "normal",
            color: "#f5f0ff",
            margin: "0 0 8px 0",
            letterSpacing: "0.02em"
          }}>The Architecture of the Absolute</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c4b5fd",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.6
          }}>
            The Absolute is not a supernatural entity but the complete, self-developing totality of thought and being, grasped as a single systematic whole.
          </p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#12091f",
          border: "1px solid #2d1b69",
          borderLeft: "4px solid #6D28D9",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7c3aed",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd6fe",
            margin: 0
          }}>
            The master-slave dialectic revealed that individual self-consciousness collapses under scrutiny — each self requires another self to be recognized, and that recognition is always fraught, unequal, incomplete. But this raises an urgent, vertiginous question: <em>what is the ultimate framework</em> — the total structure of reality — within which all these developments of consciousness, nature, and social life actually fit together? Without such a framework, philosophy has no ground beneath it, only an endless series of partial perspectives colliding without resolution.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0d0820",
          border: "1px solid #2d1b69",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div
            ref={containerRef}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              pointerEvents: "none",
              overflow: "hidden"
            }}
          >
            <canvas ref={canvasRef} style={{ display: "block" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "clamp(14px, 2.2vw, 18px)",
              fontWeight: "normal",
              color: "#c4b5fd",
              textAlign: "center",
              margin: "0 0 clamp(12px, 2vw, 20px) 0",
              letterSpacing: "0.05em"
            }}>The Triadic System — Logic · Nature · Spirit</h2>

            {/* SVG Diagram */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                width="100%"
                style={{ maxWidth: "360px", display: "block" }}
                aria-label="Triadic diagram of Logic, Nature, and Spirit"
              >
                <defs>
                  <radialGradient id="absGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9 + pulse * 0.1} />
                    <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.4 + pulse * 0.2} />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Radiating lines from center */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const lineAlpha = 0.2 + 0.15 * Math.sin(t * 0.001 + i * 0.8);
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={cx + Math.cos(rad) * 100}
                      y2={cy + Math.sin(rad) * 100}
                      stroke="#6D28D9"
                      strokeWidth="0.3"
                      strokeOpacity={lineAlpha}
                    />
                  );
                })}

                {/* Ring 3 — Spirit (outermost) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[2]}
                  fill="none"
                  stroke={isActive("spirit") ? "#A855F7" : "#5b21b6"}
                  strokeWidth={isActive("spirit") ? 3 : 1.5}
                  strokeOpacity={isActive("spirit") ? 0.9 : 0.5}
                  filter={isActive("spirit") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "spirit" ? null : "spirit")}
                  onMouseEnter={() => setHoveredRing("spirit")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                {/* Animated arc for Spirit */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[2]}
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="1"
                  strokeOpacity={0.6 + slowPulse * 0.2}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[2] * 0.3} ${Math.PI * 2 * ringRadii[2] * 0.7}`}
                  strokeDashoffset={-t * 0.04}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx}
                  y={cy - ringRadii[2] - 4}
                  textAnchor="middle"
                  fill={isActive("spirit") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="8"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "spirit" ? null : "spirit")}
                  onMouseEnter={() => setHoveredRing("spirit")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Spirit</text>

                {/* Ring 2 — Nature (middle) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[1]}
                  fill="none"
                  stroke={isActive("nature") ? "#9333EA" : "#6D28D9"}
                  strokeWidth={isActive("nature") ? 3 : 1.5}
                  strokeOpacity={isActive("nature") ? 0.9 : 0.55}
                  filter={isActive("nature") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "nature" ? null : "nature")}
                  onMouseEnter={() => setHoveredRing("nature")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                <circle
                  cx={cx} cy={cy} r={ringRadii[1]}
                  fill="none"
                  stroke="#9333EA"
                  strokeWidth="1"
                  strokeOpacity={0.6 + pulse * 0.2}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[1] * 0.25} ${Math.PI * 2 * ringRadii[1] * 0.75}`}
                  strokeDashoffset={-t * 0.06}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx + ringRadii[1] + 4}
                  y={cy + 3}
                  textAnchor="start"
                  fill={isActive("nature") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="7.5"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "nature" ? null : "nature")}
                  onMouseEnter={() => setHoveredRing("nature")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Nature</text>

                {/* Ring 1 — Logic (innermost) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[0]}
                  fill="none"
                  stroke={isActive("logic") ? "#6D28D9" : "#4c1d95"}
                  strokeWidth={isActive("logic") ? 3 : 1.5}
                  strokeOpacity={isActive("logic") ? 1 : 0.6}
                  filter={isActive("logic") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "logic" ? null : "logic")}
                  onMouseEnter={() => setHoveredRing("logic")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                <circle
                  cx={cx} cy={cy} r={ringRadii[0]}
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="1.2"
                  strokeOpacity={0.7 + pulse * 0.15}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[0] * 0.2} ${Math.PI * 2 * ringRadii[0] * 0.8}`}
                  strokeDashoffset={-t * 0.08}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx}
                  y={cy + ringRadii[0] + 10}
                  textAnchor="middle"
                  fill={isActive("logic") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="7.5"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "logic" ? null : "logic")}
                  onMouseEnter={() => setHoveredRing("logic")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Logic</text>

                {/* Central Absolute node */}
                <circle
                  cx={cx} cy={cy}
                  r={12 + pulse * 3}
                  fill="url(#absGrad)"
                  filter="url(#strongGlow)"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={cx} cy={cy}
                  r={8}
                  fill="#6D28D9"
                  fillOpacity={0.8 + pulse * 0.2}
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx} y={cy - 2}
                  textAnchor="middle"
                  fill="#f5f0ff"
                  fontSize="4.5"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >The</text>
                <text
                  x={cx} y={cy + 4.5}
                  textAnchor="middle"
                  fill="#f5f0ff"
                  fontSize="4.5"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >Absolute</text>

                {/* Clockwise arrows */}
                {[0, 1, 2].map((ri) => {
                  const r = ringRadii[ri];
                  const arrowAngle = (t * [0.0006, 0.0005, 0.0004][ri]) % (Math.PI * 2);
                  const ax = cx + Math.cos(arrowAngle) * r;
                  const ay = cy + Math.sin(arrowAngle) * r;
                  const dx = -Math.sin(arrowAngle) * 4;
                  const dy = Math.cos(arrowAngle) * 4;
                  const colors = ["#8b5cf6", "#a855f7", "#c084fc"];
                  return (
                    <g key={ri} style={{ pointerEvents: "none" }}>
                      <polygon
                        points={`${ax},${ay} ${ax - dx - dy * 0.5},${ay - dy + dx * 0.5} ${ax - dx + dy * 0.5},${ay - dy - dx * 0.5}`}
                        fill={colors[ri]}
                        fillOpacity={0.9}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Instruction */}
            <p style={{
              textAlign: "center",
              fontSize: "clamp(10px, 1.4vw, 12px)",
              color: "#7c3aed",
              margin: "8px 0 16px 0",
              letterSpacing: "0.05em"
            }}>
              Click any ring to explore its stages
            </p>

            {/* Expanded Ring Detail */}
            {selectedRing && (() => {
              const ring = rings.find(r => r.id === selectedRing);
              return (
                <div style={{
                  background: "#160b2e",
                  border: `1px solid ${ring.color}44`,
                  borderLeft: `4px solid ${ring.color}`,
                  borderRadius: "8px",
                  padding: "clamp(14px, 2.5vw, 22px)",
                  marginTop: "4px",
                  transition: "all 0.3s"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px"
                  }}>
                    <h3 style={{
                      fontSize: "clamp(15px, 2.4vw, 20px)",
                      color: ring.color,
                      margin: 0,
                      fontWeight: "normal"
                    }}>{ring.label}</h3>
                    <button
                      onClick={() => setSelectedRing(null)}
                      style={{
                        background: "none",
                        border: `1px solid ${ring.color}66`,
                        color: "#a78bfa",
                        borderRadius: "4px",
                        padding: "2px 10px",
                        cursor: "pointer",
                        fontSize: "clamp(10px, 1.4vw, 12px)",
                        fontFamily: "Georgia, serif"
                      }}
                    >Close</button>
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#ddd6fe",
                    lineHeight: 1.7,
                    margin: "0 0 16px 0"
                  }}>{ring.description}</p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
                    gap: "10px"
                  }}>
                    {ring.stages.map((stage, i) => (
                      <div key={i} style={{
                        background: "#1e0f40",
                        border: `1px solid ${ring.color}33`,
                        borderRadius: "6px",
                        padding: "12px"
                      }}>
                        <div style={{
                          fontSize: "clamp(11px, 1.5vw, 13px)",
                          color: ring.color,
                          marginBottom: "6px",
                          fontWeight: "bold"
                        }}>
                          {["I.", "II.", "III.", "IV."][i]} {stage.name}
                        </div>
                        <div style={{
                          fontSize: "clamp(10px, 1.4vw, 12px)",
                          color: "#c4b5fd",
                          lineHeight: 1.6
                        }}>{stage.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Core Argument prose */}
            {!selectedRing && (
              <div style={{ marginTop: "clamp(16px, 2.5vw, 24px)" }}>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  color: "#c4b5fd",
                  lineHeight: 1.8,
                  margin: "0 0 12px 0"
                }}>
                  Hegel's system begins with the most abstract possible starting point — pure Being — and derives, through purely internal conceptual development, increasingly concrete categories culminating in the Absolute Idea. This Idea must then externalize itself as Nature (logic in spatial-temporal form) and return to itself as Spirit (self-conscious freedom).
                </p>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  color: "#c4b5fd",
                  lineHeight: 1.8,
                  margin: 0
                }}>
                  The three spheres — Logic, Nature, Spirit — are not separate subjects but three aspects of a single self-developing reality, making the system genuinely circular: each part presupposes and completes every other. The Absolute is not a static finished entity but an eternal process of self-differentiation and self-recovery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0f0a1e",
          border: "1px solid #3b1f6e",
          borderLeft: "4px solid #9333EA",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9333EA",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd6fe",
            margin: "0 0 12px 0"
          }}>
            If the Absolute is grasped systematically through Logic, Nature, and Spirit, we need a detailed account of how pure thought itself develops — what is the internal logic of logical categories before they are externalized in Nature? The triadic framework names the structure but does not yet unfold it from within. The whole system rests on Logic, yet Logic's own internal movement remains to be shown.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#a78bfa",
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.6
          }}>
            This pressure forces the next development: a painstaking, category-by-category derivation of how pure thought moves from Being through Essence to the Notion — the Science of Logic itself, from the ground up.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0d0820",
          border: "1px solid #2d1b69",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7c3aed",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echoesOpen
              ? <ChevronUp size={18} color="#7c3aed" />
              : <ChevronDown size={18} color="#7c3aed" />
            }
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)"
            }}>
              <div style={{
                borderTop: "1px solid #2d1b69",
                paddingTop: "clamp(14px, 2.5vw, 20px)",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{
                  background: "#160b2e",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #6D28D9"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a78bfa",
                    marginBottom: "8px",
                    fontWeight: "bold"
                  }}>Einstein and the Revision of Physics</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c4b5fd",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    When Einstein's relativity challenged Newtonian mechanics, it was not one isolated concept that changed — mass, time, space, simultaneity, gravity, and causation all had to be reconceived together. No concept could be revised in isolation because they formed a mutually dependent system. This mirrors Hegel's insistence that the categories of Logic, Nature, and Spirit are internally bound: to grasp one truly is to grasp all.
                  </p>
                </div>
                <div style={{
                  background: "#160b2e",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #9333EA"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a78bfa",
                    marginBottom: "8px",
                    fontWeight: "bold"
                  }}>The Organism and Its Organs</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c4b5fd",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    No organ of the body is intelligible in isolation — the heart only makes sense in relation to blood, lungs, brain, and the organism's life as a whole. Each part exists for the whole and through the whole. Hegel's Logic, Nature, and Spirit relate in exactly this way: not as independent compartments but as moments of a living totality in which each part is the whole seen from a particular vantage.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 5: The Logic of Pure Thought ───
function ScienceOfLogic() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(["becoming"]));
  const [scrubPosition, setScrubPosition] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [beingHovered, setBeingHovered] = useState(false);
  const [nothingHovered, setNothingHovered] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const mergeRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(800);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setSvgWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const bothHovered = beingHovered || nothingHovered;

  useEffect(() => {
    let frame;
    if (bothHovered) {
      const animate = () => {
        setMergeProgress(p => {
          if (p >= 1) return 1;
          frame = requestAnimationFrame(animate);
          return Math.min(1, p + 0.04);
        });
      };
      frame = requestAnimationFrame(animate);
    } else {
      const animate = () => {
        setMergeProgress(p => {
          if (p <= 0) return 0;
          frame = requestAnimationFrame(animate);
          return Math.max(0, p - 0.04);
        });
      };
      frame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frame);
  }, [bothHovered]);

  const accent = "#0F766E";

  const keyConcepts = [
    { id: "pure_being", label: "Pure Being", desc: "The Science of Logic begins with pure Being — the most abstract, indeterminate thought possible. Being with no further specification is so empty that it immediately collapses into its opposite, Nothing. This is not a logical error but the first movement of thought: indeterminacy cannot remain stable and must generate its own contradiction." },
    { id: "nothing", label: "Nothing", desc: "Pure Nothing — the complete absence of determination — is just as indeterminate as pure Being. Hegel's insight is that they are identical in content (both are utterly empty) yet different in intent (Being aims at presence, Nothing at absence). This identity-in-difference is the engine that drives thought forward into Becoming." },
    { id: "becoming", label: "Becoming", desc: "Becoming is the first concrete thought: the unity of Being and Nothing in transition. Things come to be (Being passing into Nothing) and pass away (Nothing passing into Being). Becoming is the first genuine category because it holds the contradiction of Being and Nothing together, rather than claiming either alone." },
    { id: "determinate_being", label: "Determinate Being", desc: "From Becoming, thought arrives at determinate being (Dasein) — being with a specific quality, a 'this rather than that.' Quality leads to Quantity (determinacy that is externally comparable), and Quantity leads to Measure (the qualitatively significant quantity, as in a physical threshold). These three sections constitute the Logic of Being." },
    { id: "logic_of_essence", label: "Logic of Essence", desc: "The Logic of Essence explores the category of Ground — things as having hidden inner natures that appear in their outward form. Essence, Appearance, and Actuality are the three moments: essence grounds appearance, appearance expresses essence, and their unity is actual, causally interconnected reality. This is the logic of scientific explanation." },
    { id: "absolute_idea", label: "Logic of the Concept / Absolute Idea", desc: "The Logic of the Concept is the highest section: the concept is self-determining, not derived from anything outside itself. It culminates in the Absolute Idea — the self-comprehending whole of all logical categories. The Absolute Idea then releases itself into Nature, beginning the transition from Logic to the Philosophy of Nature." },
  ];

  const nodes = {
    being: {
      id: "being", label: "Pure Being", division: "being",
      x: 0.28, y: 0.06,
      desc: "The most empty, presuppositionless concept possible. Pure Being has no determination, no content — it is the attempt to think sheer immediacy itself.",
      contradiction: "Pure Being, utterly without content, is indistinguishable from Pure Nothing.",
      children: []
    },
    nothing: {
      id: "nothing", label: "Pure Nothing", division: "being",
      x: 0.72, y: 0.06,
      desc: "The complete absence of determination. Pure Nothing, like Pure Being, has no content, no difference — it is simply emptiness itself.",
      contradiction: "Pure Nothing, the complete absence of all, is identical to Pure Being in its utter emptiness.",
      children: []
    },
    becoming: {
      id: "becoming", label: "Becoming", division: "being",
      x: 0.5, y: 0.17,
      desc: "Being and Nothing each pass over into the other. Their unity-in-opposition is not static but a restless movement: this is Becoming — the first concrete logical category.",
      contradiction: "Becoming contains within itself two moments (coming-to-be, ceasing-to-be) which tend to cancel each other, producing a stable result.",
      children: ["determinate_being"]
    },
    determinate_being: {
      id: "determinate_being", label: "Determinate Being", division: "being",
      x: 0.5, y: 0.29,
      desc: "Becoming sublates itself into stable Determinate Being (Dasein): being with a specific quality. To be determinate is to be this and not that — quality as such.",
      contradiction: "Quality implies its other (negation of quality), leading to the problem of the One and the Many, and ultimately to Quantity.",
      children: ["quality", "quantity"]
    },
    quality: {
      id: "quality", label: "Quality", division: "being",
      x: 0.3, y: 0.41,
      desc: "The immediate character of something — what makes it THIS thing. Quality is identical with being: to lose its quality is for a thing to cease to be what it is.",
      contradiction: "Quality generates its negation. Something is defined by what it is NOT. This otherness is internal to it, driving toward Quantity.",
      children: []
    },
    quantity: {
      id: "quantity", label: "Quantity", division: "being",
      x: 0.7, y: 0.41,
      desc: "Being whose determination is external and indifferent to it. Quantity can change without the thing ceasing to be what it is — unlike Quality.",
      contradiction: "Quantity and Quality are not independent: at a certain quantum, a qualitative change occurs. This unity is Measure.",
      children: ["measure"]
    },
    measure: {
      id: "measure", label: "Measure", division: "being",
      x: 0.5, y: 0.53,
      desc: "The unity of Quality and Quantity — the specific quantum that constitutes a thing's quality. Measure is where Being shows its inner necessity most concretely.",
      contradiction: "Measure implies something that persists through qualitative changes, a substrate behind appearances. This drives us into the Logic of Essence.",
      children: ["essence_core"]
    },
    essence_core: {
      id: "essence_core", label: "Essence", division: "essence",
      x: 0.5, y: 0.63,
      desc: "Essence is Being reflected into itself — the 'inner' reality behind outer appearance. It introduces the categorial oppositions of inner/outer, identity/difference, appearance/reality.",
      contradiction: "Essence splits into Identity and Difference. Pure identity contains difference within itself; pure difference presupposes identity. These generate the logic of Ground and Existence.",
      children: ["identity_diff", "ground"]
    },
    identity_diff: {
      id: "identity_diff", label: "Identity & Difference", division: "essence",
      x: 0.28, y: 0.74,
      desc: "Identity (A=A) seems pure but secretly contains difference (A is NOT not-A). Difference cannot be stated without identity. Together they generate Contradiction as a category.",
      contradiction: "Essence as identity-in-difference points to something that grounds appearances — a Cause behind Effects.",
      children: []
    },
    ground: {
      id: "ground", label: "Ground & Cause", division: "essence",
      x: 0.72, y: 0.74,
      desc: "The Essence as Ground explains Existence. Causal relations belong here: a cause is the ground of its effect. But finite causality leads to infinite regress.",
      contradiction: "The infinite causal chain of Essence points beyond itself to a self-grounding reality — the Concept that gives itself its own content.",
      children: ["concept_node"]
    },
    concept_node: {
      id: "concept_node", label: "The Concept", division: "concept",
      x: 0.5, y: 0.84,
      desc: "The Concept (Begriff) is the unity of Universality, Particularity, and Individuality. It is not merely subjective thought but the self-determining structure of reality itself.",
      contradiction: "The Concept must actualize itself through Judgment and Syllogism, ultimately achieving perfect self-unity in the Absolute Idea.",
      children: ["absolute_idea"]
    },
    absolute_idea: {
      id: "absolute_idea", label: "Absolute Idea", division: "concept",
      x: 0.5, y: 0.94,
      desc: "The Absolute Idea is the complete, self-transparent system of all logical categories — the Concept that fully comprehends itself. It is Logic's culmination and must now externalize itself as Nature.",
      contradiction: "The Absolute Idea is purely logical, abstract, self-contained. But self-externalization into Nature introduces contingency, space, and time — the very opposites of pure logic.",
      children: []
    }
  };

  const divisionColors = {
    being: "#D97706",
    essence: "#0F766E",
    concept: "#7C3AED"
  };

  const divisionLabels = {
    being: "Logic of Being",
    essence: "Logic of Essence",
    concept: "Logic of the Concept"
  };

  const nodeOrder = [
    "being", "nothing", "becoming", "determinate_being",
    "quality", "quantity", "measure", "essence_core",
    "identity_diff", "ground", "concept_node", "absolute_idea"
  ];

  const visibleCount = Math.round(scrubPosition * (nodeOrder.length - 2)) + 2;
  const visibleNodes = new Set(nodeOrder.slice(0, visibleCount));

  const isNodeVisible = (id) => {
    if (id === "being" || id === "nothing") return true;
    return visibleNodes.has(id);
  };

  const getAllEdges = () => {
    const edges = [];
    edges.push({ from: "being", to: "becoming", special: true });
    edges.push({ from: "nothing", to: "becoming", special: true });
    Object.values(nodes).forEach(node => {
      node.children.forEach(child => {
        edges.push({ from: node.id, to: child, special: false });
      });
    });
    return edges;
  };

  const SVG_H = 900;
  const SVG_W = 800;

  const getX = (nx) => nx * SVG_W;
  const getY = (ny) => ny * SVG_H;

  const selectedData = selectedNode ? nodes[selectedNode] : null;

  const handleNodeClick = (id) => {
    if (id === "being" || id === "nothing") return;
    setSelectedNode(prev => prev === id ? null : id);
  };

  const scrubHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setScrubPosition(Math.max(0, Math.min(1, x)));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 20%, #0d3330 0%, #0a0a0f 70%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8e8e8"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(16px, 3vw, 28px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.5vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0F766E",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 5 of 20 — The Science of Logic</div>
          <h1 style={{
            fontSize: "clamp(20px, 4vw, 36px)",
            fontWeight: "normal",
            color: "#f0f0f0",
            margin: "0 0 8px 0",
            lineHeight: 1.2
          }}>The Logic of Pure Thought</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#a0b0af",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.6
          }}>Hegel's Science of Logic derives the fundamental categories of thought and reality from the internal contradictions of pure Being itself.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0e1a19",
          border: "1px solid #1a3330",
          borderLeft: "4px solid #0F766E",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 3vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0F766E",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#c8d8d6",
            margin: 0
          }}>
            If the Absolute is the systematic whole of Logic-Nature-Spirit, we need to see exactly how the logical dimension develops: <em>how does pure thought generate its own content without arbitrary assumptions?</em> Any starting point we choose seems to smuggle in presuppositions from outside — yet philosophy demands a truly presuppositionless beginning. The system's claim to necessity hangs entirely on whether this is possible.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0b1817",
          border: "1px solid #1a3330",
          borderRadius: "12px",
          padding: "clamp(14px, 2.5vw, 28px)",
          marginBottom: "clamp(20px, 3vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(14px, 2.2vw, 18px)",
            color: "#e0ede8",
            marginBottom: "8px",
            letterSpacing: "0.05em"
          }}>The Dialectical Unfolding of Logical Categories</div>
          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#7a9a96",
            marginBottom: "16px",
            lineHeight: 1.6,
            margin: "0 0 16px 0"
          }}>
            Hover between Being and Nothing to witness their identity generate Becoming. Scrub the timeline to watch the logic unfold. Click any node to read its contradiction and necessity.
          </p>

          {/* Division Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            {Object.entries(divisionLabels).map(([key, label]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: divisionColors[key]
                }} />
                <span style={{
                  fontSize: "clamp(10px, 1.4vw, 12px)",
                  color: "#8aada8",
                  letterSpacing: "0.05em"
                }}>{label}</span>
              </div>
            ))}
          </div>

          {/* SVG Graph */}
          <div ref={svgContainerRef} style={{ width: "100%", position: "relative" }}>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              width="100%"
              style={{ display: "block" }}
            >
              <defs>
                <filter id="glow-being">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-nothing">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-selected">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="merge-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D97706" stopOpacity={mergeProgress * 0.6} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Merge glow between Being and Nothing */}
              {mergeProgress > 0 && (
                <ellipse
                  cx={SVG_W * 0.5}
                  cy={SVG_H * 0.06}
                  rx={SVG_W * 0.25 * mergeProgress}
                  ry={40 * mergeProgress}
                  fill="url(#merge-glow)"
                  opacity={mergeProgress}
                />
              )}

              {/* Merge label */}
              {mergeProgress > 0.3 && (
                <text
                  x={SVG_W * 0.5}
                  y={SVG_H * 0.06 + 5}
                  textAnchor="middle"
                  fill={`rgba(217,119,6,${mergeProgress})`}
                  fontSize="14"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                >
                  indistinguishable...
                </text>
              )}

              {/* Edges */}
              {getAllEdges().map((edge, i) => {
                const fromNode = nodes[edge.from];
                const toNode = nodes[edge.to];
                if (!isNodeVisible(edge.from) || !isNodeVisible(edge.to)) return null;
                const x1 = getX(fromNode.x);
                const y1 = getY(fromNode.y);
                const x2 = getX(toNode.x);
                const y2 = getY(toNode.y);
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const color = divisionColors[toNode.division];
                const isSpecial = edge.special;
                return (
                  <g key={i}>
                    <path
                      d={`M ${x1} ${y1} Q ${midX} ${midY - 10} ${x2} ${y2}`}
                      fill="none"
                      stroke={color}
                      strokeWidth={isSpecial ? "1.5" : "1"}
                      strokeOpacity={isSpecial ? 0.4 + mergeProgress * 0.4 : 0.3}
                      strokeDasharray={isSpecial ? "4 4" : "none"}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {Object.values(nodes).map(node => {
                if (!isNodeVisible(node.id)) return null;
                const x = getX(node.x);
                const y = getY(node.y);
                const color = divisionColors[node.division];
                const isSelected = selectedNode === node.id;
                const isHov = hoveredNode === node.id;
                const isBeing = node.id === "being";
                const isNothing = node.id === "nothing";
                const specialOpacity = (isBeing || isNothing)
                  ? Math.max(0.35, 1 - mergeProgress * 0.65)
                  : 1;
                const radius = (isBeing || isNothing) ? 32 : isSelected ? 36 : 28;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: (isBeing || isNothing) ? "default" : "pointer" }}
                    onMouseEnter={() => {
                      setHoveredNode(node.id);
                      if (isBeing) setBeingHovered(true);
                      if (isNothing) setNothingHovered(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      if (isBeing) setBeingHovered(false);
                      if (isNothing) setNothingHovered(false);
                    }}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {/* Outer glow ring for selected */}
                    {isSelected && (
                      <circle
                        cx={x} cy={y} r={radius + 10}
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        filter="url(#glow-selected)"
                      />
                    )}
                    {/* Hover ring */}
                    {isHov && !isSelected && (
                      <circle
                        cx={x} cy={y} r={radius + 8}
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.35"
                      />
                    )}
                    {/* Main circle */}
                    <circle
                      cx={x} cy={y} r={radius}
                      fill="#0b1817"
                      stroke={color}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      strokeOpacity={specialOpacity}
                      fillOpacity={specialOpacity}
                    />
                    {/* Inner fill */}
                    <circle
                      cx={x} cy={y} r={radius - 2}
                      fill={color}
                      fillOpacity={isSelected ? 0.25 : isHov ? 0.18 : 0.08}
                    />
                    {/* Label */}
                    <text
                      x={x} y={y - 4}
                      textAnchor="middle"
                      fill={color}
                      fillOpacity={specialOpacity}
                      fontSize={isBeing || isNothing ? "13" : "12"}
                      fontFamily="Georgia, serif"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {node.label.split(" ").length > 2
                        ? node.label.split(" ").slice(0, 2).join(" ")
                        : node.label}
                    </text>
                    {node.label.split(" ").length > 2 && (
                      <text
                        x={x} y={y + 10}
                        textAnchor="middle"
                        fill={color}
                        fillOpacity={specialOpacity}
                        fontSize="12"
                        fontFamily="Georgia, serif"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {node.label.split(" ").slice(2).join(" ")}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Node Detail */}
          {selectedData && (
            <div style={{
              background: "#0d2420",
              border: `1px solid ${divisionColors[selectedData.division]}44`,
              borderLeft: `3px solid ${divisionColors[selectedData.division]}`,
              borderRadius: "8px",
              padding: "clamp(12px, 2vw, 20px)",
              marginTop: "16px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px"
              }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: divisionColors[selectedData.division],
                    display: "block",
                    marginBottom: "4px"
                  }}>{divisionLabels[selectedData.division]}</span>
                  <div style={{
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: "#f0f0f0",
                    fontWeight: "normal"
                  }}>{selectedData.label}</div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: "none",
                    border: `1px solid ${divisionColors[selectedData.division]}44`,
                    color: "#7a9a96",
                    cursor: "pointer",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >close</button>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#c0d4d0",
                lineHeight: 1.7,
                margin: "0 0 12px 0"
              }}>{selectedData.desc}</p>
              <div style={{
                borderTop: `1px solid ${divisionColors[selectedData.division]}22`,
                paddingTop: "12px"
              }}>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7a9a96",
                  display: "block",
                  marginBottom: "6px"
                }}>Internal Contradiction</span>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  color: "#9ab8b4",
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: "italic"
                }}>{selectedData.contradiction}</p>
              </div>
            </div>
          )}

          {/* Hover tooltip for Being/Nothing */}
          {(hoveredNode === "being" || hoveredNode === "nothing") && (
            <div style={{
              background: "#0d2420",
              border: "1px solid #D97706",
              borderRadius: "8px",
              padding: "clamp(10px, 1.8vw, 16px)",
              marginTop: "12px"
            }}>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#c8a060",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic"
              }}>
                {hoveredNode === "being"
                  ? nodes.being.desc
                  : nodes.nothing.desc}
              </p>
              <p style={{
                fontSize: "clamp(11px, 1.4vw, 13px)",
                color: "#8a7040",
                lineHeight: 1.6,
                margin: "8px 0 0 0"
              }}>Move toward the other node to witness their indistinguishability generate Becoming...</p>
            </div>
          )}

          {/* Timeline Scrubber */}
          <div style={{ marginTop: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0F766E"
              }}>Logical Progression</span>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                color: "#5a7a76"
              }}>
                {nodeOrder.slice(2, visibleCount).length} categories unfolded
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "24px",
                background: "#071210",
                borderRadius: "12px",
                border: "1px solid #1a3330",
                cursor: "pointer",
                position: "relative",
                userSelect: "none"
              }}
              onClick={scrubHandler}
              onMouseMove={(e) => { if (e.buttons === 1) scrubHandler(e); }}
            >
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${scrubPosition * 100}%`,
                background: "linear-gradient(90deg, #D97706, #0F766E, #7C3AED)",
                borderRadius: "12px",
                transition: "width 0.1s ease",
                opacity: 0.7
              }} />
              <div style={{
                position: "absolute",
                top: "50%",
                left: `${scrubPosition * 100}%`,
                transform: "translate(-50%, -50%)",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#f0f0f0",
                border: "2px solid #0F766E",
                boxShadow: "0 0 8px #0F766E"
              }} />
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px"
            }}>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#D97706" }}>Pure Being</span>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#0F766E" }}>Measure</span>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#7C3AED" }}>Absolute Idea</span>
            </div>
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0e1420",
          border: "1px solid #1a2040",
          borderLeft: "4px solid #3b4fa0",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6080d0",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#b0c0d8",
            margin: "0 0 12px 0"
          }}>
            The Absolute Idea is logically complete — a perfectly self-transparent system of all necessary categories, requiring nothing outside itself. Yet it remains purely abstract, moving in the ether of pure thought. How do these entirely logical categories appear in the concrete, contingent, spatial-temporal world of Nature? The Logic is not yet Nature; the necessity of pure thought is not yet the contingency of falling stones and rotating planets.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7088b0",
            fontStyle: "italic",
            margin: 0
          }}>
            This pressure forces the next development: the Absolute Idea must freely release itself into its own otherness — Nature — and the question becomes how pure logical structure can be the inner essence of the apparently senseless contingency of the natural world.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e1817",
          border: "1px solid #1a3330",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#0F766E",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#0F766E" />
              : <ChevronDown size={16} color="#0F766E" />}
          </button>
          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)"
            }}>
              <div style={{
                borderTop: "1px solid #1a3330",
                paddingTop: "clamp(12px, 2vw, 20px)"
              }}>
                <div style={{
                  background: "#071410",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  marginBottom: "12px",
                  borderLeft: "3px solid #0F766E"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#0F766E",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>Mathematical Derivation</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab8b4",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    A mathematician beginning from axioms derives entire structures without empirical input — just as Hegel's Logic derives all categories from pure Being. The necessity feels non-arbitrary, self-generating; each theorem follows from internal compulsion rather than external discovery. Yet the result is somehow about reality.
                  </p>
                </div>
                <div style={{
                  background: "#071410",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #7C3AED"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9060c8",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>Scientific Frameworks Becoming Concrete</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab8b4",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    Abstract physics (pure equations) becomes concrete only through application — the empty formalism of quantum mechanics acquires determinacy when interpreted against experimental results. The movement from abstract framework to concrete application mirrors Hegel's logic of categories becoming increasingly determinate through their own internal contradictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#3a5550",
          paddingBottom: "8px"
        }}>
          Hegel, Science of Logic (1812–16) · Interactive exploration of dialectical necessity
        </div>

      </div>
    </div>
  );
}

// ─── Part 6: Nature as Idea in Otherness ───
function PhilosophyOfNature() {
  const [activeTier, setActiveTier] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredTier, setHoveredTier] = useState(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const mechanicsCanvasRef = useRef(null);
  const physicsCanvasRef = useRef(null);
  const organicsCanvasRef = useRef(null);
  const animFrameRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mechanics animation: bouncing particle
  useEffect(() => {
    if (activeTier !== 'mechanics') return;
    const canvas = mechanicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 30, y = 30, vx = 2.2, vy = 1.7;
    let raf;
    const W = canvas.width, H = canvas.height;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = '#1a3a2a';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= W; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
      }
      for (let j = 0; j <= H; j += 20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
      }
      // particle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#15803D';
      ctx.shadowColor = '#15803D';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      // trail
      x += vx; y += vy;
      if (x < 8 || x > W - 8) vx *= -1;
      if (y < 8 || y > H - 8) vy *= -1;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  // Physics animation: iron filings around magnet
  useEffect(() => {
    if (activeTier !== 'physics') return;
    const canvas = physicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // draw magnet
      const mx = W / 2, my = H / 2;
      ctx.fillStyle = '#0e2a1a';
      ctx.fillRect(mx - 18, my - 8, 36, 16);
      ctx.fillStyle = '#15803D';
      ctx.fillRect(mx - 18, my - 8, 18, 16);
      ctx.fillStyle = '#4a1a1a';
      ctx.fillRect(mx, my - 8, 18, 16);
      ctx.fillStyle = '#a3e6c0';
      ctx.font = 'bold 9px Georgia';
      ctx.fillText('N', mx - 13, my + 5);
      ctx.fillStyle = '#e6a3a3';
      ctx.fillText('S', mx + 8, my + 5);
      // field lines
      const numLines = 14;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const r0 = 22;
        ctx.beginPath();
        for (let r = r0; r < 80; r += 2) {
          const fx = Math.cos(angle) * r;
          const fy = Math.sin(angle) * r;
          // dipole field distortion
          const dx = fx - 18, dy = fy;
          const dx2 = fx + 18, dy2 = fy;
          const r1 = Math.sqrt(dx * dx + dy * dy) + 0.1;
          const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.1;
          const fieldX = dx / (r1 * r1 * r1) - dx2 / (r2 * r2 * r2);
          const fieldY = dy / (r1 * r1 * r1) - dy2 / (r2 * r2 * r2);
          const mag = Math.sqrt(fieldX * fieldX + fieldY * fieldY) + 0.001;
          const nx2 = fieldX / mag, ny2 = fieldY / mag;
          const px = mx + fx + nx2 * (r - r0) * 0.3;
          const py = my + fy + ny2 * (r - r0) * 0.3;
          if (r === r0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const alpha = 0.4 + 0.3 * Math.sin(t * 0.04 + i * 0.4);
        ctx.strokeStyle = `#15803D`;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // animated filings
      const filings = 28;
      for (let i = 0; i < filings; i++) {
        const baseAngle = (i / filings) * Math.PI * 2 + t * 0.005;
        const r = 30 + (i % 4) * 14;
        const fx = mx + Math.cos(baseAngle) * r;
        const fy = my + Math.sin(baseAngle) * r;
        const lineAngle = baseAngle + Math.PI / 2;
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(lineAngle);
        ctx.fillStyle = '#a3e6c0';
        ctx.globalAlpha = 0.7;
        ctx.fillRect(-5, -1, 10, 2);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  // Organics animation: growing/dying plant
  useEffect(() => {
    if (activeTier !== 'organics') return;
    const canvas = organicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    let raf;
    function drawBranch(x, y, angle, length, depth, alpha) {
      if (depth === 0 || length < 3) return;
      const ex = x + Math.cos(angle) * length;
      const ey = y - Math.sin(angle) * length;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = depth > 2 ? '#15803D' : '#4ade80';
      ctx.globalAlpha = alpha;
      ctx.lineWidth = depth * 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;
      drawBranch(ex, ey, angle + 0.45, length * 0.68, depth - 1, alpha * 0.9);
      drawBranch(ex, ey, angle - 0.45, length * 0.68, depth - 1, alpha * 0.9);
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // cell-like background circles
      for (let i = 0; i < 8; i++) {
        const cx = (i % 4) * (W / 3.5) + 10;
        const cy = H - 15 - Math.floor(i / 4) * 20;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = '#15803D';
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // cycle: 0-120 grow, 120-180 full, 180-240 die
      const cycle = t % 240;
      let growFactor, deathAlpha;
      if (cycle < 120) {
        growFactor = cycle / 120;
        deathAlpha = 1;
      } else if (cycle < 180) {
        growFactor = 1;
        deathAlpha = 1;
      } else {
        growFactor = 1;
        deathAlpha = 1 - (cycle - 180) / 60;
      }
      const maxLen = 38 * growFactor;
      if (maxLen > 2) {
        ctx.save();
        drawBranch(W / 2, H - 10, Math.PI / 2, maxLen, 5, deathAlpha);
        ctx.restore();
      }
      // leaf cells near tips when grown
      if (growFactor > 0.7) {
        const leafAlpha = (growFactor - 0.7) / 0.3 * deathAlpha;
        for (let i = 0; i < 5; i++) {
          const lx = W / 2 + (i - 2) * 14;
          const ly = H - maxLen * 0.7 - 10;
          ctx.beginPath();
          ctx.ellipse(lx, ly, 6, 10, i * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = '#22c55e';
          ctx.globalAlpha = leafAlpha * 0.6;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      // soil
      ctx.fillStyle = '#0e2a1a';
      ctx.fillRect(0, H - 10, W, 10);
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  const accent = "#15803D";

  const keyConcepts = [
    { id: "externalization", label: "Externalization", desc: "Nature is the Absolute Idea in the form of externalization (Entäusserung): the logical structure that was entirely self-contained in the Logic now exists outside itself, dispersed in space and time. This is not a failure but a necessary moment — Spirit cannot return to itself without first having gone outside itself, and nature is that necessary outside." },
    { id: "contingency", label: "Contingency", desc: "Unlike the pure logical necessity of the Logic, natural forms are characterized by contingency and external determination. Hegel speaks of the 'impotence of nature' (Ohnmacht der Natur): natural things fail to fully realize their concept, exhibiting accident, irregularity, and deviation from rational form. This contingency is not a defect of our knowledge but an actual feature of natural existence as externalized spirit." },
    { id: "mechanics", label: "Mechanics", desc: "The first tier of nature is mechanics — the realm of space, time, matter, and motion. Here natural things are purely external to each other: they relate only through collision, gravitation, and displacement. Mechanics is nature at its most external, its least self-related. Gravity is the first hint of an inner relation — matter's tendency to be with other matter — but it remains an external force." },
    { id: "physics", label: "Physics", desc: "The second tier, physics, deals with qualitative natural forms: light, magnetism, electricity, chemical processes. Here natural things begin to exhibit inner distinctions and polar relations — they are no longer merely juxtaposed but stand in relations of attraction and repulsion, identity and difference. Physics shows nature becoming more self-differentiated, exhibiting something analogous to concept-structure." },
    { id: "organic_life", label: "Organic Life", desc: "Organic life is the highest stage of nature and the transition to Spirit. The living organism is self-maintaining — it actively preserves its form against the external environment, drawing matter into itself and transforming it according to its own inner principle. The organism has something like a concept of itself: a unified plan that it realizes and sustains. But it cannot take itself as its own object — that requires the transition to Spirit." },
    { id: "impotence_of_nature", label: "Impotence of Nature", desc: "Nature's highest achievement (the living individual organism) is simultaneously its limit: the organism cannot become self-conscious, cannot take its own concept as an object of knowledge, cannot know that it is a realization of logical structure. This is the impotence of nature — not weakness in a pejorative sense, but the structural boundary between natural existence and spiritual existence, the point where nature sublates itself into Spirit." },
  ];

  const tiers = [
    {
      id: 'mechanics',
      label: 'Mechanics',
      sublabel: 'Space · Time · Matter · Motion',
      description: 'The most abstract layer of nature: pure extension in space and time, mass and motion. Here logical categories appear as sheer externality — bodies defined by position and momentum, indifferent to one another. Necessity operates as blind mechanical law, with no internal principle of self-organization.',
      texture: 'grid',
      color: '#15803D',
      lightColor: '#4ade80',
    },
    {
      id: 'physics',
      label: 'Physics',
      sublabel: 'Magnetism · Electricity · Chemistry',
      description: 'Physical processes show greater internal differentiation: magnetism holds opposite poles in unity, electricity discharges tension between opposed charges, and chemistry transforms substances through their mutual negation. Here matter begins to exhibit something like inner polarity — the first hint of self-relation in natural forms.',
      texture: 'fields',
      color: '#166534',
      lightColor: '#86efac',
    },
    {
      id: 'organics',
      label: 'Organic Life',
      sublabel: 'Individuality · Self-Maintenance · Death',
      description: 'The living organism achieves genuine individuality: it actively maintains itself through continuous material exchange, metabolizes its environment, and reproduces its form. Yet organic life remains caught in biological cycles — it cannot take itself as object, cannot know itself as self. This is the impotence of nature at its highest.',
      texture: 'cells',
      color: '#14532d',
      lightColor: '#bbf7d0',
    },
  ];

  const pulseOpacity = 0.5 + 0.5 * Math.sin(pulsePhase * 0.2);
  const pulseY = -4 + 4 * Math.sin(pulsePhase * 0.2);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #052e16 0%, #0a0a0f 80%)',
      fontFamily: 'Georgia, serif',
      color: '#d1fae5',
      padding: 'clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)',
    }}>
      <div style={{
        maxWidth: 'min(90vw, 860px)',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(20px, 4vw, 36px)', textAlign: 'center' }}>
          <div style={{
            fontSize: 'clamp(10px, 1.5vw, 12px)',
            letterSpacing: '0.18em',
            color: '#4ade80',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>Part 6 of 20 — Philosophy of Nature</div>
          <h1 style={{
            fontSize: 'clamp(22px, 4vw, 38px)',
            fontWeight: 'bold',
            color: '#f0fdf4',
            margin: '0 0 10px 0',
            lineHeight: 1.2,
          }}>Nature as Idea in Otherness</h1>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#86efac',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}>Nature is the externalization of logical categories into spatial, temporal, and material existence — rational in structure yet marked by contingency.</p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: '#0c1a10',
          border: '1px solid #1a3a22',
          borderLeft: '4px solid #15803D',
          borderRadius: '8px',
          padding: 'clamp(16px, 3vw, 28px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 24px #0a2a1280',
        }}>
          <div style={{
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4ade80',
            marginBottom: '12px',
            fontVariant: 'small-caps',
          }}>The Problem</div>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#d1fae5',
            margin: 0,
            lineHeight: 1.7,
          }}>
            The Absolute Idea has achieved its fullest logical articulation — yet it remains purely conceptual, abstract, enclosed within thought's own movement. If the Idea is truly absolute, it cannot remain sealed within itself. It must externalize, must become other to itself. <em>But how do purely logical categories appear in the contingent, resisting materiality of the actual world?</em> How does necessity become nature — blind, spatial, temporal, shot through with accident?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: '#0a1a0f',
          border: '1px solid #1a3a22',
          borderRadius: '12px',
          padding: 'clamp(16px, 3vw, 32px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 40px #0a2a1240',
        }}>
          <h2 style={{
            fontSize: 'clamp(15px, 2.2vw, 20px)',
            color: '#f0fdf4',
            margin: '0 0 8px 0',
            letterSpacing: '0.04em',
          }}>The Ladder of Nature</h2>
          <p style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            color: '#86efac',
            margin: '0 0 24px 0',
            fontStyle: 'italic',
          }}>Click any tier to explore its examples and animations</p>

          {/* Ladder SVG + Tiers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
            {/* Transition to Spirit arrow at top */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '8px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translateY(${pulseY}px)`,
                transition: 'none',
              }}>
                <div style={{
                  fontSize: 'clamp(9px, 1.3vw, 12px)',
                  color: '#4ade80',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: pulseOpacity,
                  border: '1px dashed #15803D',
                  borderRadius: '20px',
                  padding: '5px 16px',
                  marginBottom: '6px',
                  background: '#0a1f12',
                }}>Transition to Spirit</div>
                <svg viewBox="0 0 30 28" width="30" style={{ opacity: pulseOpacity }}>
                  <polygon points="15,0 28,28 2,28" fill="#15803D" />
                </svg>
              </div>
            </div>

            {/* Tiers in reverse order (organics on top, mechanics at bottom) */}
            {[...tiers].reverse().map((tier, reversedIdx) => {
              const isActive = activeTier === tier.id;
              const isHovered = hoveredTier === tier.id;
              return (
                <div key={tier.id}>
                  <div
                    onClick={() => setActiveTier(isActive ? null : tier.id)}
                    onMouseEnter={() => setHoveredTier(tier.id)}
                    onMouseLeave={() => setHoveredTier(null)}
                    style={{
                      cursor: 'pointer',
                      background: isActive
                        ? '#0d2a18'
                        : isHovered
                        ? '#0b2014'
                        : '#091509',
                      border: `2px solid ${isActive ? tier.color : isHovered ? '#1a4a2a' : '#112a18'}`,
                      borderLeft: `5px solid ${tier.color}`,
                      borderRadius: '8px',
                      padding: 'clamp(12px, 2vw, 20px)',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? `0 0 20px ${tier.color}40` : isHovered ? `0 0 12px ${tier.color}20` : 'none',
                      marginBottom: isActive ? '0' : '6px',
                      borderBottomLeftRadius: isActive ? '0' : '8px',
                      borderBottomRightRadius: isActive ? '0' : '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{
                          fontSize: 'clamp(14px, 2vw, 18px)',
                          fontWeight: 'bold',
                          color: tier.lightColor,
                          marginBottom: '2px',
                        }}>{tier.label}</div>
                        <div style={{
                          fontSize: 'clamp(10px, 1.4vw, 13px)',
                          color: '#86efac',
                          fontStyle: 'italic',
                        }}>{tier.sublabel}</div>
                      </div>
                      <div style={{
                        color: tier.lightColor,
                        fontSize: 'clamp(18px, 2.5vw, 22px)',
                        marginLeft: '12px',
                        transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}>
                        {isActive ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isActive && (
                    <div style={{
                      background: '#061210',
                      border: `2px solid ${tier.color}`,
                      borderTop: 'none',
                      borderRadius: '0 0 8px 8px',
                      padding: 'clamp(14px, 2.5vw, 24px)',
                      marginBottom: '6px',
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        alignItems: 'center',
                      }}>
                        {/* Canvas animation */}
                        <div style={{ width: '100%', maxWidth: '320px' }}>
                          <div style={{
                            fontSize: 'clamp(9px, 1.2vw, 11px)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: tier.lightColor,
                            marginBottom: '6px',
                            textAlign: 'center',
                          }}>
                            {tier.id === 'mechanics' && 'Mechanical Motion'}
                            {tier.id === 'physics' && 'Magnetic Field Lines'}
                            {tier.id === 'organics' && 'Growth & Death Cycle'}
                          </div>
                          <div style={{
                            border: `1px solid ${tier.color}`,
                            borderRadius: '6px',
                            overflow: 'hidden',
                            background: '#040e08',
                          }}>
                            {tier.id === 'mechanics' && (
                              <canvas
                                ref={mechanicsCanvasRef}
                                width={280}
                                height={120}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                            {tier.id === 'physics' && (
                              <canvas
                                ref={physicsCanvasRef}
                                width={280}
                                height={140}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                            {tier.id === 'organics' && (
                              <canvas
                                ref={organicsCanvasRef}
                                width={280}
                                height={140}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{
                          fontSize: 'clamp(12px, 1.6vw, 15px)',
                          color: '#d1fae5',
                          margin: 0,
                          lineHeight: 1.75,
                          textAlign: 'left',
                          width: '100%',
                        }}>{tier.description}</p>

                        {/* Key concepts chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
                          {tier.id === 'mechanics' && ['externalization', 'contingency', 'mechanics'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                          {tier.id === 'physics' && ['physics', 'polarity', 'chemistry'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                          {tier.id === 'organics' && ['organic life', 'impotence of nature', 'individuality'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Ground line */}
            <div style={{
              borderTop: '2px solid #1a3a22',
              marginTop: '8px',
              paddingTop: '8px',
              textAlign: 'center',
              fontSize: 'clamp(10px, 1.3vw, 12px)',
              color: '#4ade80',
              letterSpacing: '0.12em',
              opacity: 0.6,
            }}>Pure Logical Categories — point of departure</div>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: 'clamp(20px, 3vw, 28px)',
            borderTop: '1px solid #1a3a22',
            paddingTop: 'clamp(16px, 2.5vw, 24px)',
          }}>
            <p style={{
              fontSize: 'clamp(13px, 1.7vw, 15px)',
              color: '#a7f3d0',
              margin: 0,
              lineHeight: 1.8,
            }}>
              Nature is not a realm separate from thought — it is the Absolute Idea in the form of otherness, logical structure realized as space, time, and matter. Unlike the clean necessity of pure logic, natural forms are characterized by contingency and external determination: what Hegel calls the <em>impotence of nature</em>. Yet nature is not chaos. It exhibits a rational progression — from the bare exteriority of mechanics through the polar tensions of physical processes to the self-maintaining unity of organic life. Each level shows greater internal self-relation, until at the apex the living organism achieves genuine individuality. But it cannot take itself as its own object. Nature's highest achievement is also its limit.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: '#0c1a10',
          border: '1px solid #1a3a22',
          borderLeft: '4px solid #166534',
          borderRadius: '8px',
          padding: 'clamp(16px, 3vw, 28px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 24px #0a2a1260',
        }}>
          <div style={{
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4ade80',
            marginBottom: '12px',
            fontVariant: 'small-caps',
          }}>The Difficulty</div>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#d1fae5',
            margin: '0 0 14px 0',
            lineHeight: 1.7,
          }}>
            Even the highest form of organic life cannot transcend the biological cycle of growth, reproduction, and death. The organism self-maintains, but it remains locked in repetition — its individuality is always finite, always reclaimed by nature's indifferent processes. It cannot step outside itself, cannot recognize itself <em>as itself</em>. The gap between living and knowing remains absolute within nature's own resources.
          </p>
          <p style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            color: '#86efac',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            This pressure forces the next development: if nature reaches its own limit in the organism that cannot know itself, something must arise that is no longer merely natural — something that can take its own existence as an object. This is the demand for Spirit, and it cannot be met from within nature alone.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: '#0a1a0f',
          border: '1px solid #1a3a22',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: 'clamp(16px, 3vw, 24px)',
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 'clamp(14px, 2.5vw, 20px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Georgia, serif',
            }}
          >
            <span style={{
              fontSize: 'clamp(9px, 1.2vw, 11px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4ade80',
              fontVariant: 'small-caps',
            }}>Real-World Echoes</span>
            <span style={{ color: '#4ade80' }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{
              padding: 'clamp(4px, 1vw, 8px) clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)',
              borderTop: '1px solid #1a3a22',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    title: 'The Magnet as Self-Organizing System',
                    body: 'A magnet maintains its polarity through continuous interaction with its magnetic field and surrounding matter — an inanimate object exhibiting something like self-organization. For Hegel, this is physics showing the first trace of internal relation: the system is defined by its own internal tension, not merely by external forces acting upon it.'
                  },
                  {
                    title: 'Living Organisms and Metabolic Identity',
                    body: 'Every living cell continuously replaces its own constituents while maintaining its form — the organism persists through constant material change. This is Hegelian self-maintenance made biological: identity is not static substance but active self-reproduction. Yet the cell has no experience of itself, no self-knowledge.'
                  },
                  {
                    title: 'Death as the Dialectical Limit',
                    body: 'Death is not an external accident that happens to organisms but the internal contradiction of finite natural individuality made explicit. The organism\'s very effort to maintain itself — metabolism, growth, reproduction — is driven by and ultimately consumed by its finitude. Hegel reads this as nature itself pointing beyond biology toward something that can acknowledge its own mortality.'
                  },
                ].map((echo, i) => (
                  <div key={i} style={{
                    borderLeft: '3px solid #15803D',
                    paddingLeft: '16px',
                  }}>
                    <div style={{
                      fontSize: 'clamp(12px, 1.6vw, 14px)',
                      color: '#4ade80',
                      marginBottom: '6px',
                      fontWeight: 'bold',
                    }}>{echo.title}</div>
                    <p style={{
                      fontSize: 'clamp(12px, 1.6vw, 14px)',
                      color: '#d1fae5',
                      margin: 0,
                      lineHeight: 1.7,
                    }}>{echo.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav hint */}
        <div style={{
          textAlign: 'center',
          fontSize: 'clamp(10px, 1.4vw, 12px)',
          color: '#166534',
          letterSpacing: '0.1em',
          paddingBottom: '8px',
        }}>
          — Nature's limit points toward Part 7: The Philosophy of Spirit —
        </div>
      </div>
    </div>
  );
}

// ─── Part 7: The Realm of Human Spirit ───
function PhilosophyOfSpirit() {
  const [selectedRing, setSelectedRing] = useState(null);
  const [hoveredRing, setHoveredRing] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animOffset, setAnimOffset] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const accent = "#1E40AF";

  const keyConcepts = [
    { id: "subjective_spirit", label: "Subjective Spirit", desc: "Subjective Spirit is the first stage — spirit as it exists within the individual: the soul, consciousness, and mind. It encompasses anthropology (spirit embedded in nature and the body), phenomenology (consciousness becoming self-consciousness), and psychology (the faculties of feeling, imagination, and will). It is spirit's most immediate and least free form." },
    { id: "objective_spirit", label: "Objective Spirit", desc: "Objective Spirit is spirit externalized in social institutions — the realm of law, morality, and ethical life. Here freedom is no longer merely inward or individual but embodied in the structures of family, civil society, and the state. This is Hegel's political philosophy: spirit achieving reality by giving itself an objective, institutional form that all members inhabit." },
    { id: "absolute_spirit", label: "Absolute Spirit", desc: "Absolute Spirit is spirit's highest realization — the moment when it comprehends itself as the inner truth of all reality, no longer limited by individual finitude or particular institutions. It manifests through art (sensuous self-knowing), religion (representational self-knowing), and philosophy (conceptual self-knowing). Philosophy is the completion of Spirit's journey." },
    { id: "freedom", label: "Freedom", desc: "Freedom is not a property of isolated individuals but the telos of the entire development of Spirit. Hegel distinguishes mere freedom-from (negative freedom, absence of external constraint) from genuine freedom-to (positive freedom, self-determination according to rational principles). Real freedom is achieved only in rational institutions that make self-realization possible for all." },
    { id: "mutual_recognition", label: "Mutual Recognition", desc: "Self-consciousness requires recognition from another self-consciousness — I cannot know myself as free unless others acknowledge my freedom, and I must acknowledge theirs. This mutual recognition is not merely a social nicety but a metaphysical necessity: the structure of self-conscious freedom is inherently intersubjective, which is why Spirit must externalize itself in social life." },
    { id: "ethical_life", label: "Ethical Life", desc: "Sittlichkeit (ethical life) is the third and highest moment of Objective Spirit — the concrete social world of actual ethical institutions (family, civil society, state) in which individuals find their freedom genuinely realized. Unlike abstract morality, ethical life provides substantive content: the individual is not isolated and self-legislating but embedded in living traditions and mutual obligations." },
  ];

  const rings = [
    {
      id: "absolute",
      label: "Absolute Spirit",
      sublabel: "Art · Religion · Philosophy",
      color: "#1E40AF",
      lightColor: "#3B82F6",
      radius: 0.9,
      description: "The highest form of Spirit's self-understanding, where consciousness grasps the Absolute in sensuous form (art), representational thought (religion), and pure conceptual comprehension (philosophy).",
      stages: [
        { name: "Art", desc: "Spirit expressed in sensuous material — architecture, sculpture, painting, music, poetry — each medium a different degree of spiritual inwardness." },
        { name: "Revealed Religion", desc: "Spirit represented in narrative, image, and community — God as a being who becomes human, reconciling finite and infinite in representational form." },
        { name: "Philosophy", desc: "Spirit comprehending itself in pure thought — the Concept knowing itself as the truth of all reality, the culmination of the entire Hegelian system." },
      ]
    },
    {
      id: "objective",
      label: "Objective Spirit",
      sublabel: "Right · Morality · Ethical Life",
      color: "#1D4ED8",
      lightColor: "#60A5FA",
      radius: 0.62,
      description: "Freedom made objective in social institutions. Individual will externalizes itself into laws, customs, and political structures, achieving a reality beyond any single person.",
      stages: [
        { name: "Abstract Right", desc: "The sphere of property and contract — persons recognized as free through their external possessions and formal agreements." },
        { name: "Morality", desc: "The inner life of conscience — the individual's capacity to will the good and bear responsibility for intentions, not merely actions." },
        { name: "Ethical Life (Sittlichkeit)", desc: "Concrete freedom in living institutions: the Family as love's unity, Civil Society as market interdependence, the State as rational universal freedom." },
      ]
    },
    {
      id: "subjective",
      label: "Subjective Spirit",
      sublabel: "Soul · Consciousness · Mind",
      color: "#2563EB",
      lightColor: "#93C5FD",
      radius: 0.34,
      description: "Spirit as it first awakens in the individual — from the sleeping soul embedded in nature, through the struggle of self-consciousness, to theoretical and practical reason.",
      stages: [
        { name: "Anthropology (Soul)", desc: "The natural soul immersed in bodily life — feeling, habit, sensation — still bound to nature but beginning to differentiate." },
        { name: "Phenomenology of Spirit", desc: "Consciousness confronting the world and other selves — sensory certainty, perception, understanding, and the dialectic of master and servant." },
        { name: "Psychology (Mind)", desc: "Theoretical mind cognizing truth, practical mind pursuing the good — the individual achieving integrated rational agency." },
      ]
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;

    const resize = () => {
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (container) ro.observe(container);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = (t) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.44;

      // Draw animated flowing arrows
      const numArrows = 12;
      for (let i = 0; i < numArrows; i++) {
        const phase = (i / numArrows) * Math.PI * 2;
        const progress = ((t * 0.0004 + i / numArrows) % 1);

        // Outward path (0 to 0.5)
        if (progress < 0.5) {
          const p = progress / 0.5;
          const r = p * maxR;
          const angle = phase + p * 0.3;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          const alpha = Math.sin(p * Math.PI) * 0.6;
          const size = 3 + p * 4;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `#93C5FD${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        } else {
          // Return path (0.5 to 1)
          const p = (progress - 0.5) / 0.5;
          const r = (1 - p) * maxR;
          const angle = phase + 0.3 + p * 0.5;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          const alpha = Math.sin(p * Math.PI) * 0.4;
          const size = 2 + (1 - p) * 3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `#1E40AF${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame((ts) => draw(ts));
    };

    animRef.current = requestAnimationFrame((ts) => draw(ts));
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const getOpacity = (ringId) => {
    if (!selectedRing && !hoveredRing) return 1;
    if (selectedRing === ringId || hoveredRing === ringId) return 1;
    if (selectedRing && selectedRing !== ringId) return 0.3;
    if (hoveredRing && hoveredRing !== ringId) return 0.5;
    return 1;
  };

  const selectedData = rings.find(r => r.id === selectedRing);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #0f1e4a 0%, #060810 70%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e2e8f0",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vw, 32px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#60A5FA",
            marginBottom: "8px",
          }}>Part 7 of 20 · Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "normal",
            margin: "0 0 8px",
            color: "#e2e8f0",
          }}>The Realm of Human Spirit</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#93C5FD",
            margin: 0,
            fontStyle: "italic",
          }}>Spirit is the self-conscious return of the Absolute Idea to itself through human consciousness, culture, and freedom.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderLeft: "4px solid #1E40AF",
          borderRadius: "8px",
          padding: "clamp(16px, 2.5vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3B82F6",
            marginBottom: "10px",
            fontVariant: "small-caps",
          }}>The Problem</div>
          <p style={{
            margin: 0,
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
          }}>
            Nature reaches its limit in organic life — the plant that responds to light, the animal that feels and strives. Yet no organism can step back and ask <em>what it is</em>, nor reshape the world according to a freely chosen rational purpose. Life alone cannot become aware of itself as life. The pressure accumulates into an unavoidable question: <strong style={{ color: "#93C5FD" }}>how does the transition to genuine self-consciousness and freedom occur?</strong> Something must rupture from within nature's necessity and discover that it is not merely a thing among things but a subject — a being for whom the world exists.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#080d1e",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          overflow: "hidden",
        }}>
          <div style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#93C5FD",
            marginBottom: "4px",
            textAlign: "center",
          }}>The Triadic Structure of Spirit</div>
          <div style={{
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: "#64748b",
            marginBottom: "clamp(12px, 2vw, 20px)",
            textAlign: "center",
          }}>Click any ring to explore its stages</div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 2.5vw, 24px)",
            alignItems: "center",
          }}>
            {/* SVG Ring Diagram */}
            <div style={{ position: "relative", width: "100%", maxWidth: "460px" }}>
              <div ref={containerRef} style={{ position: "relative", width: "100%", paddingBottom: "90%" }}>
                <canvas ref={canvasRef} style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: "100%",
                  pointerEvents: "none",
                }} />
                <svg
                  viewBox="0 0 400 360"
                  width="100%"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                >
                  <defs>
                    <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0f1e4a" stopOpacity="0.6" />
                    </radialGradient>
                    <radialGradient id="midGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.7" />
                    </radialGradient>
                    <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Outer ring - Absolute Spirit */}
                  <circle
                    cx="200" cy="180" r="158"
                    fill="url(#outerGrad)"
                    stroke={selectedRing === "absolute" || hoveredRing === "absolute" ? "#3B82F6" : "#1E40AF"}
                    strokeWidth={selectedRing === "absolute" ? "3" : "1.5"}
                    opacity={getOpacity("absolute")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "absolute" ? null : "absolute")}
                    onMouseEnter={() => setHoveredRing("absolute")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "absolute" || hoveredRing === "absolute" ? "url(#glow)" : "none"}
                  />

                  {/* Middle ring - Objective Spirit */}
                  <circle
                    cx="200" cy="180" r="108"
                    fill="url(#midGrad)"
                    stroke={selectedRing === "objective" || hoveredRing === "objective" ? "#60A5FA" : "#1D4ED8"}
                    strokeWidth={selectedRing === "objective" ? "3" : "1.5"}
                    opacity={getOpacity("objective")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "objective" ? null : "objective")}
                    onMouseEnter={() => setHoveredRing("objective")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "objective" || hoveredRing === "objective" ? "url(#glow)" : "none"}
                  />

                  {/* Inner ring - Subjective Spirit */}
                  <circle
                    cx="200" cy="180" r="58"
                    fill="url(#innerGrad)"
                    stroke={selectedRing === "subjective" || hoveredRing === "subjective" ? "#93C5FD" : "#2563EB"}
                    strokeWidth={selectedRing === "subjective" ? "3" : "1.5"}
                    opacity={getOpacity("subjective")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "subjective" ? null : "subjective")}
                    onMouseEnter={() => setHoveredRing("subjective")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "subjective" || hoveredRing === "subjective" ? "url(#glow)" : "none"}
                  />

                  {/* Center dot */}
                  <circle cx="200" cy="180" r="7" fill="#93C5FD" opacity="0.8" />

                  {/* Labels */}
                  <text x="200" y="183" textAnchor="middle" fill="#bfdbfe"
                    fontSize="9" fontFamily="Georgia, serif" opacity={getOpacity("subjective")}
                    style={{ pointerEvents: "none" }}>Subjective</text>

                  <text x="200" y="108" textAnchor="middle" fill="#bfdbfe"
                    fontSize="10" fontFamily="Georgia, serif" opacity={getOpacity("objective")}
                    style={{ pointerEvents: "none" }}>Objective Spirit</text>

                  <text x="200" y="36" textAnchor="middle" fill="#bfdbfe"
                    fontSize="11" fontFamily="Georgia, serif" opacity={getOpacity("absolute")}
                    style={{ pointerEvents: "none" }}>Absolute Spirit</text>

                  {/* Sub-labels for outer rings */}
                  <text x="200" y="120" textAnchor="middle" fill="#93C5FD"
                    fontSize="7.5" fontFamily="Georgia, serif" opacity={getOpacity("objective") * 0.8}
                    style={{ pointerEvents: "none" }}>Right · Morality · Ethical Life</text>

                  <text x="200" y="49" textAnchor="middle" fill="#93C5FD"
                    fontSize="7.5" fontFamily="Georgia, serif" opacity={getOpacity("absolute") * 0.8}
                    style={{ pointerEvents: "none" }}>Art · Religion · Philosophy</text>

                  {/* Outward arrows */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 200 + Math.cos(rad) * 65;
                    const y1 = 180 + Math.sin(rad) * 65;
                    const x2 = 200 + Math.cos(rad) * 155;
                    const y2 = 180 + Math.sin(rad) * 155;
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#1E40AF" strokeWidth="0.8" opacity="0.35"
                        strokeDasharray="4 4"
                        style={{ pointerEvents: "none" }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Selected Ring Detail Panel */}
            {selectedData && (
              <div style={{
                width: "100%",
                background: "#0a1128",
                border: `1px solid ${selectedData.lightColor}55`,
                borderLeft: `4px solid ${selectedData.lightColor}`,
                borderRadius: "8px",
                padding: "clamp(14px, 2.5vw, 24px)",
                animation: "none",
              }}>
                <div style={{
                  fontSize: "clamp(15px, 2.2vw, 19px)",
                  color: selectedData.lightColor,
                  marginBottom: "4px",
                }}>{selectedData.label}</div>
                <div style={{
                  fontSize: "clamp(11px, 1.4vw, 13px)",
                  color: "#64748b",
                  marginBottom: "12px",
                  fontStyle: "italic",
                }}>{selectedData.sublabel}</div>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  lineHeight: "1.75",
                  color: "#cbd5e1",
                  margin: "0 0 16px",
                }}>{selectedData.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedData.stages.map((stage, idx) => (
                    <div key={idx} style={{
                      background: "#060d20",
                      border: `1px solid ${selectedData.color}44`,
                      borderRadius: "6px",
                      padding: "clamp(10px, 2vw, 16px)",
                    }}>
                      <div style={{
                        fontSize: "clamp(12px, 1.6vw, 14px)",
                        color: selectedData.lightColor,
                        marginBottom: "4px",
                        fontWeight: "bold",
                      }}>{idx + 1}. {stage.name}</div>
                      <div style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: "#94a3b8",
                        lineHeight: "1.65",
                      }}>{stage.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ring selector buttons */}
            <div style={{
              display: "flex",
              gap: "clamp(8px, 1.5vw, 12px)",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}>
              {rings.map((ring) => (
                <button
                  key={ring.id}
                  onClick={() => setSelectedRing(selectedRing === ring.id ? null : ring.id)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = ring.color + "55"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = selectedRing === ring.id ? ring.color + "44" : "#0a0f1e"; }}
                  style={{
                    background: selectedRing === ring.id ? ring.color + "44" : "#0a0f1e",
                    border: `1px solid ${selectedRing === ring.id ? ring.lightColor : ring.color}`,
                    borderRadius: "6px",
                    padding: "clamp(6px, 1vw, 10px) clamp(12px, 2vw, 18px)",
                    color: selectedRing === ring.id ? ring.lightColor : "#94a3b8",
                    fontSize: "clamp(10px, 1.4vw, 13px)",
                    fontFamily: "Georgia, serif",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {ring.label}
                </button>
              ))}
            </div>

            {/* Core argument prose */}
            <div style={{
              width: "100%",
              background: "#07101f",
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 24px)",
              borderTop: "1px solid #1e293b",
            }}>
              <div style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3B82F6",
                marginBottom: "10px",
              }}>The Movement of Spirit</div>
              <p style={{
                margin: "0 0 12px",
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: "1.8",
                color: "#cbd5e1",
              }}>
                Spirit is not a ghostly substance floating above the world — it is the realm of human consciousness, society, and culture, the point where the logical categories discovered in the Science of Logic become <em>explicitly</em> self-conscious. The three rings are not merely categories but stages of freedom's own self-actualization.
              </p>
              <p style={{
                margin: 0,
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: "1.8",
                color: "#cbd5e1",
              }}>
                Spirit externalizes itself outward from the bare individual into social institutions and cultural forms — then returns inward, recognizing those external structures as expressions of its own rational nature. This journey of <strong style={{ color: "#60A5FA" }}>externalization and return</strong> is Spirit's freedom: not escape from the world, but the recognition that the rational structure of the world is Spirit's own.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderLeft: "4px solid #2563EB",
          borderRadius: "8px",
          padding: "clamp(16px, 2.5vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#60A5FA",
            marginBottom: "10px",
            fontVariant: "small-caps",
          }}>The Difficulty</div>
          <p style={{
            margin: "0 0 14px",
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
          }}>
            The full realization of Spirit requires concrete social and political institutions — freedom is not an inner feeling but a structure that must be built into the actual world. But this creates a tension that mere description cannot resolve: <strong style={{ color: "#93C5FD" }}>what exactly does a rational political order look like?</strong> How does the state reconcile the individual's particular will with the demands of universal law without simply crushing one or the other? And when actual states fail to be rational — as history repeatedly shows — does Hegel's system provide any grounds for critique, or does it simply justify whatever exists?
          </p>
          <p style={{
            margin: 0,
            fontSize: "clamp(12px, 1.6vw, 14px)",
            lineHeight: "1.7",
            color: "#64748b",
            fontStyle: "italic",
          }}>
            This pressure forces the next development — a detailed analysis of the institutions of Objective Spirit: property, contract, conscience, family, civil society, and the constitutional state as the concrete home of human freedom.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0f1e4a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom: echosOpen ? "1px solid #1e293b" : "none",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3B82F6",
              fontFamily: "Georgia, serif",
              fontVariant: "small-caps",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#3B82F6" />
              : <ChevronDown size={16} color="#3B82F6" />}
          </button>
          {echosOpen && (
            <div style={{ padding: "clamp(14px, 2.5vw, 24px)" }}>
              {[
                {
                  title: "The Family",
                  body: "For Hegel, the family is the first and most immediate form of ethical life — persons united not by contract but by love, holding property in common, submerging individual selfishness in care for one another. Every household that functions through genuine mutual devotion rather than legal obligation enacts this first stage of Objective Spirit."
                },
                {
                  title: "Civil Society",
                  body: "The market economy and its supporting institutions — courts, police, trade associations — constitute civil society: the sphere where individuals pursue their private interests yet are unknowingly bound together by mutual dependence. Modern capitalism and its regulatory frameworks are the living embodiment of this middle stage, where particular freedom is real but isolated from genuine community."
                },
                {
                  title: "The Constitutional State",
                  body: "The modern democratic state, with its constitution, representative institutions, and rule of law, represents Hegel's synthesis: a structure in which individuals can recognize their own rational will in universal laws they have collectively created. The ongoing debates about constitutional democracy — how to balance individual rights with collective goods — are precisely the tensions Hegel diagnosed."
                },
              ].map((ex, i) => (
                <div key={i} style={{
                  marginBottom: i < 2 ? "clamp(12px, 2vw, 18px)" : 0,
                  paddingBottom: i < 2 ? "clamp(12px, 2vw, 18px)" : 0,
                  borderBottom: i < 2 ? "1px solid #1e293b" : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(13px, 1.8vw, 15px)",
                    color: "#60A5FA",
                    marginBottom: "6px",
                  }}>{ex.title}</div>
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    lineHeight: "1.75",
                    color: "#94a3b8",
                  }}>{ex.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 8: The Science of Freedom ───
function ScienceOfFreedom() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [vennHover, setVennHover] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const accent = "#0369A1";

  const keyConcepts = [
    { id: "negative_positive_freedom", label: "Negative vs. Positive Freedom", desc: "Negative freedom is freedom-from: the absence of external obstacles and coercion. Positive freedom is freedom-to: the capacity for genuine self-determination according to rational principles. Hegel insists that negative freedom is a necessary but insufficient starting point. A will that has no obligations and faces no constraints has no determinate content — it is an empty freedom that cannot distinguish genuine self-realization from arbitrary whim." },
    { id: "abstract_right", label: "Abstract Right", desc: "Abstract right is the first stage of Objective Spirit: freedom expressed as the legal capacity to own property, enter contracts, and be protected from wrong. Persons are recognized as bearers of rights, but only in the abstract — as isolated atoms with no account of their inner convictions or shared purposes. Abstract right is freedom as form only, unable to specify which purposes are worth pursuing." },
    { id: "morality", label: "Morality (Moralität)", desc: "Morality internalizes freedom: the will is now self-legislating, following universal principles derived from conscience rather than external command. This is Kant's domain — the categorical imperative, duty for its own sake. But Hegel argues Kantian morality is tragically empty: the universal form of duty cannot generate concrete obligations, and the moral standpoint produces endless 'ought' without the determinate 'is' of actual social life." },
    { id: "sittlichkeit", label: "Ethical Life (Sittlichkeit)", desc: "Sittlichkeit is the synthesis where individual moral conviction and objective social institutions achieve living unity. Unlike morality, ethical life is concrete: the individual finds herself genuinely at home in the institutions that shape her. Family provides immediate love-based unity; civil society mediates particular interests; and the rational state synthesizes particular and universal freedom. This is freedom genuinely actualized." },
    { id: "civil_society", label: "Civil Society", desc: "Civil society is the middle term between family and state — the realm of market exchange, voluntary associations, and professional corporations. Here individuals pursue private interests but are bound into a system of mutual dependence. Civil society enables unprecedented freedom and development but also generates systemic inequality and atomization, requiring the mediating institutions of the state to preserve its gains while correcting its excesses." },
    { id: "rational_state", label: "The Rational State", desc: "The rational state, for Hegel, is not an external constraint on freedom but its fullest realization — the institution in which universal rational law, particular group interests, and individual subjective freedom are unified. The state is 'the actuality of concrete freedom' because in it the individual wills what reason endorses, and reason is embodied in institutions the individual can genuinely call her own." },
  ];

  const steps = [
    {
      id: "abstract_right",
      label: "Abstract Right",
      number: "I",
      subtitle: "Property & Contract",
      color: "#1e6fa8",
      institutions: ["Property", "Contract", "Wrong & Punishment"],
      description: "The first stage of freedom is purely formal: the free will expressed through ownership of external objects and recognition between persons as bearers of rights. Here freedom appears as the capacity to possess, exchange, and enforce claims. Yet this is insufficient — abstract right treats persons as isolated atoms with no account of inner conviction or shared ends. It mistakes the shell of freedom for its substance.",
      critique: "Abstract right is freedom as form only — it cannot tell us which purposes are worth pursuing, nor does it bind persons into genuine community.",
      hegelQuote: "A person must translate his freedom into an external sphere in order to exist as Idea."
    },
    {
      id: "morality",
      label: "Morality",
      number: "II",
      subtitle: "Conscience & Duty",
      color: "#0369A1",
      institutions: ["Purpose & Responsibility", "Intention & Welfare", "Good & Conscience"],
      description: "Morality (Moralität) internalizes freedom — the will is now self-legislating, following universal principles derived from conscience rather than mere external custom. This is Kant's domain: the categorical imperative, duty for its own sake, the moral subject who gives herself the law. Yet Kant's morality remains tragically empty. The universal form of duty cannot by itself generate concrete obligations; the moral standpoint produces endless 'ought' without the determinate 'is' of actual social life.",
      critique: "Morality's formal universality is its glory and its prison — it transcends custom but cannot provide the concrete, living content that makes freedom real.",
      hegelQuote: "The moral standpoint is the standpoint of the will so far as it is infinite not merely in itself but for itself."
    },
    {
      id: "ethical_life",
      label: "Ethical Life",
      number: "III",
      subtitle: "Sittlichkeit",
      color: "#0284c7",
      institutions: ["Family", "Civil Society", "The State"],
      description: "Sittlichkeit — ethical life — is the synthesis where individual moral conviction and objective social institutions achieve living unity. Here freedom is no longer abstract form or inner duty but concrete actuality: the individual finds herself at home in the institutions that shape her. The family provides immediate love-based unity; civil society (market and voluntary associations) mediates particular interests; and the rational state synthesizes particular and universal freedom. This is the highest stage because freedom here is genuinely actualized rather than merely claimed or commanded.",
      critique: "Ethical life resolves the antinomy of abstract right and morality by showing freedom as inherently social — self-realization requires rational institutions.",
      hegelQuote: "Ethical life is the Idea of freedom as the living Good which has its knowledge and volition in self-consciousness."
    }
  ];

  const ethicalInstitutions = [
    {
      id: "family",
      label: "Family",
      icon: "⌂",
      desc: "Immediate unity through love — the individual transcends isolated selfhood through natural bonds of care and recognition within the household.",
      color: "#0369A1"
    },
    {
      id: "civil_society",
      label: "Civil Society",
      icon: "⚙",
      desc: "The sphere of particular interests: market relations, voluntary associations, corporations. Here individuals pursue private ends, yet through mutual dependence generate a social fabric — though one riven by inequality requiring regulation.",
      color: "#0284c7"
    },
    {
      id: "state",
      label: "The State",
      icon: "◈",
      desc: "The rational state is the synthesis — it embodies the community's shared rational nature, enabling citizens to participate in universal ends while remaining particular persons. Political participation becomes self-realization.",
      color: "#38bdf8"
    }
  ];

  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const stepData = selectedStep ? steps.find(s => s.id === selectedStep) : null;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 20%, #012e4a 0%, #050810 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e2e8f0",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0369A1",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "Georgia, serif"
          }}>
            Part 8 of 20 — Hegel's System
          </div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "bold",
            color: "#f0f9ff",
            margin: "0 0 10px 0",
            letterSpacing: "-0.01em",
            fontFamily: "Georgia, serif"
          }}>
            The Science of Freedom
          </h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontFamily: "Georgia, serif"
          }}>
            Genuine freedom is not the absence of constraint — it is achieved through participation in rational social institutions.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderLeft: "4px solid #0369A1",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 36px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0369A1",
            marginBottom: "12px",
            fontFamily: "Georgia, serif"
          }}>
            The Problem
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
            margin: 0,
            fontFamily: "Georgia, serif"
          }}>
            Spirit has achieved self-consciousness — but consciousness alone is not enough. Freedom must become actual, must walk in the world. Yet here the crisis deepens: <span style={{ color: "#7dd3fc", fontStyle: "italic" }}>Spirit requires objective social institutions to fully realize freedom</span>, but what specific institutional architecture makes genuine collective freedom possible without crushing individual autonomy? Provide too little structure and freedom atomizes into chaos; provide too much and the living subject is swallowed by the machine of the state. The problem inherited from Kant and the French Revolution alike is this unbearable tension — and Hegel insists it must be resolved not by choosing one side but by thinking through both at once.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#060d18",
          border: "1px solid #1a3347",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(20px, 4vw, 36px)"
        }}>
          <div style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#e2e8f0",
            fontWeight: "bold",
            marginBottom: "6px",
            fontFamily: "Georgia, serif"
          }}>
            The Staircase of Freedom
          </div>
          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#64748b",
            marginBottom: "clamp(16px, 3vw, 28px)",
            fontFamily: "Georgia, serif"
          }}>
            Click each stage to explore its logic, limits, and the critique that drives the ascent.
          </p>

          {/* Staircase SVG */}
          <svg viewBox="0 0 700 280" width="100%" style={{ maxWidth: "700px", display: "block", margin: "0 auto", marginBottom: "clamp(12px, 2vw, 20px)" }}>
            {/* Background grid lines */}
            <line x1="0" y1="280" x2="700" y2="280" stroke="#1a3347" strokeWidth="1"/>
            <line x1="0" y1="200" x2="700" y2="200" stroke="#1a3347" strokeWidth="0.5" strokeDasharray="4,4"/>
            <line x1="0" y1="140" x2="700" y2="140" stroke="#1a3347" strokeWidth="0.5" strokeDasharray="4,4"/>

            {/* Step 1 — Abstract Right */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "abstract_right" ? null : "abstract_right")}
              onMouseEnter={() => setHoveredStep("abstract_right")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="20" y="210" width="200" height="70"
                fill={selectedStep === "abstract_right" ? "#1e3a52" : hoveredStep === "abstract_right" ? "#162a3d" : "#0e1f2d"}
                stroke={selectedStep === "abstract_right" ? "#38bdf8" : "#1e6fa8"}
                strokeWidth={selectedStep === "abstract_right" ? "2" : "1"}
                rx="4"
              />
              <rect x="20" y="210" width="5" height="70" fill="#1e6fa8" rx="2"/>
              <text x="135" y="237" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">I</text>
              <text x="135" y="256" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Abstract Right</text>
              <text x="135" y="272" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Georgia, serif">Property · Contract</text>
            </g>

            {/* Step arrow up */}
            <polygon points="230,230 245,220 245,240" fill="#1e6fa8" opacity="0.7"/>
            <line x1="233" y1="230" x2="260" y2="230" stroke="#1e6fa8" strokeWidth="1.5" opacity="0.7"/>

            {/* Step 2 — Morality */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "morality" ? null : "morality")}
              onMouseEnter={() => setHoveredStep("morality")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="250" y="150" width="200" height="130"
                fill={selectedStep === "morality" ? "#1a3554" : hoveredStep === "morality" ? "#142841" : "#0b1929"}
                stroke={selectedStep === "morality" ? "#38bdf8" : "#0369A1"}
                strokeWidth={selectedStep === "morality" ? "2" : "1"}
                rx="4"
              />
              <rect x="250" y="150" width="5" height="130" fill="#0369A1" rx="2"/>
              <text x="355" y="177" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">II</text>
              <text x="355" y="196" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Morality</text>
              <text x="355" y="213" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Georgia, serif">Conscience · Duty</text>
              <text x="355" y="234" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Categorical Imperative</text>
              <text x="355" y="250" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Formal universality</text>
              <text x="355" y="266" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">without content</text>
            </g>

            {/* Step arrow up */}
            <polygon points="460,170 475,160 475,180" fill="#0284c7" opacity="0.7"/>
            <line x1="463" y1="170" x2="490" y2="170" stroke="#0284c7" strokeWidth="1.5" opacity="0.7"/>

            {/* Step 3 — Ethical Life */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "ethical_life" ? null : "ethical_life")}
              onMouseEnter={() => setHoveredStep("ethical_life")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="480" y="60" width="200" height="220"
                fill={selectedStep === "ethical_life" ? "#1a3d5c" : hoveredStep === "ethical_life" ? "#123046" : "#091828"}
                stroke={selectedStep === "ethical_life" ? "#7dd3fc" : "#0284c7"}
                strokeWidth={selectedStep === "ethical_life" ? "2" : "1"}
                rx="4"
              />
              {/* Glow effect for highest step */}
              {(selectedStep === "ethical_life" || hoveredStep === "ethical_life") && (
                <rect x="480" y="60" width="200" height="220" fill="none" stroke="#38bdf8" strokeWidth="1" rx="4" opacity="0.4"/>
              )}
              <rect x="480" y="60" width="5" height="220" fill="#0284c7" rx="2"/>
              <text x="585" y="88" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">III</text>
              <text x="585" y="108" textAnchor="middle" fill="#f0f9ff" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Ethical Life</text>
              <text x="585" y="126" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="Georgia, serif">Sittlichkeit</text>
              <line x1="500" y1="135" x2="670" y2="135" stroke="#1a4060" strokeWidth="1"/>
              <text x="585" y="153" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="Georgia, serif">Family</text>
              <text x="585" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="Georgia, serif">Civil Society</text>
              <text x="585" y="187" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">The State</text>
              <line x1="500" y1="197" x2="670" y2="197" stroke="#1a4060" strokeWidth="1"/>
              <text x="585" y="217" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Georgia, serif">Synthesis of</text>
              <text x="585" y="232" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Georgia, serif">particular & universal</text>
              <text x="585" y="268" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="Georgia, serif">↑ Rational Freedom ↑</text>
            </g>

            {/* Vertical freedom label */}
            <text x="12" y="200" fill="#1e4060" fontSize="9" fontFamily="Georgia, serif" transform="rotate(-90, 12, 200)">FREEDOM</text>

            {/* Negative vs Positive label */}
            <text x="30" y="200" fill="#334155" fontSize="9" fontFamily="Georgia, serif">Negative ↓</text>
            <text x="490" y="55" fill="#334155" fontSize="9" fontFamily="Georgia, serif">Positive ↑</text>
          </svg>

          {/* Step Detail Panel */}
          {stepData && (
            <div style={{
              background: "#07111c",
              border: "1px solid #1e3a52",
              borderLeft: `4px solid ${stepData.color}`,
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 24px)",
              marginBottom: "clamp(16px, 3vw, 24px)",
              transition: "all 0.3s ease"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: stepData.color,
                    fontFamily: "Georgia, serif"
                  }}>
                    Stage {stepData.number}
                  </span>
                  <h3 style={{
                    fontSize: "clamp(15px, 2.2vw, 20px)",
                    color: "#f0f9ff",
                    margin: "4px 0 2px 0",
                    fontFamily: "Georgia, serif"
                  }}>
                    {stepData.label}
                  </h3>
                  <p style={{
                    fontSize: "clamp(11px, 1.4vw, 13px)",
                    color: "#64748b",
                    margin: 0,
                    fontFamily: "Georgia, serif"
                  }}>{stepData.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  style={{
                    background: "#1a3347",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >
                  Close ×
                </button>
              </div>
              <div style={{ marginTop: "16px" }}>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  lineHeight: "1.75",
                  color: "#cbd5e1",
                  margin: "0 0 14px 0",
                  fontFamily: "Georgia, serif"
                }}>
                  {stepData.description}
                </p>
                <div style={{
                  background: "#0b1e2e",
                  borderLeft: "3px solid #334155",
                  padding: "10px 14px",
                  marginBottom: "14px",
                  borderRadius: "0 4px 4px 0"
                }}>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    fontStyle: "italic",
                    color: "#7dd3fc",
                    margin: 0,
                    fontFamily: "Georgia, serif"
                  }}>
                    "{stepData.hegelQuote}"
                  </p>
                  <p style={{
                    fontSize: "clamp(10px, 1.2vw, 11px)",
                    color: "#475569",
                    margin: "6px 0 0 0",
                    fontFamily: "Georgia, serif"
                  }}>— Hegel, Philosophy of Right</p>
                </div>
                <div style={{
                  background: "#0f1e2e",
                  border: "1px solid #1e3347",
                  borderRadius: "6px",
                  padding: "10px 14px"
                }}>
                  <span style={{
                    fontSize: "clamp(9px, 1.1vw, 10px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#ef4444",
                    fontFamily: "Georgia, serif"
                  }}>
                    The Critique
                  </span>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: "6px 0 0 0",
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    {stepData.critique}
                  </p>
                </div>
                <div style={{ marginTop: "14px" }}>
                  <span style={{
                    fontSize: "clamp(9px, 1.1vw, 10px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#64748b",
                    fontFamily: "Georgia, serif"
                  }}>Institutions</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                    {stepData.institutions.map(inst => (
                      <span key={inst} style={{
                        background: "#0e2235",
                        border: `1px solid ${stepData.color}`,
                        color: "#7dd3fc",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "clamp(10px, 1.3vw, 12px)",
                        fontFamily: "Georgia, serif"
                      }}>
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ethical Life Sub-institutions */}
          <div style={{ marginBottom: "clamp(16px, 3vw, 28px)" }}>
            <div style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#64748b",
              marginBottom: "clamp(10px, 2vw, 16px)",
              fontFamily: "Georgia, serif"
            }}>
              Ethical Life's three spheres — explore each:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px, 1.5vw, 14px)" }}>
              {ethicalInstitutions.map(inst => {
                const isSelected = selectedInstitution === inst.id;
                return (
                  <div
                    key={inst.id}
                    onClick={() => setSelectedInstitution(isSelected ? null : inst.id)}
                    style={{
                      flex: "1 1 clamp(120px, 28%, 220px)",
                      background: isSelected ? "#0e2235" : "#07111c",
                      border: `1px solid ${isSelected ? inst.color : "#1a3347"}`,
                      borderRadius: "8px",
                      padding: "clamp(12px, 2vw, 18px)",
                      cursor: "pointer",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = inst.color; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "#1a3347"; }}
                  >
                    <div style={{
                      fontSize: "clamp(18px, 3vw, 24px)",
                      marginBottom: "6px"
                    }}>
                      {inst.icon}
                    </div>
                    <div style={{
                      fontSize: "clamp(12px, 1.7vw, 15px)",
                      color: isSelected ? "#f0f9ff" : "#e2e8f0",
                      fontWeight: "bold",
                      fontFamily: "Georgia, serif",
                      marginBottom: "4px"
                    }}>
                      {inst.label}
                    </div>
                    {isSelected && (
                      <p style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: "1.65",
                        fontFamily: "Georgia, serif"
                      }}>
                        {inst.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Venn Diagram — The Rational State */}
          <div style={{
            background: "#06101a",
            border: "1px solid #1a3347",
            borderRadius: "10px",
            padding: "clamp(14px, 2.5vw, 24px)"
          }}>
            <div style={{
              fontSize: "clamp(12px, 1.7vw, 15px)",
              color: "#7dd3fc",
              fontWeight: "bold",
              marginBottom: "6px",
              fontFamily: "Georgia, serif"
            }}>
              The Rational State: The Synthesis
            </div>
            <p style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              color: "#64748b",
              marginBottom: "clamp(12px, 2vw, 20px)",
              fontFamily: "Georgia, serif"
            }}>
              Hover over each region to understand what the state synthesizes.
            </p>
            <svg viewBox="0 0 500 220" width="100%" style={{ maxWidth: "500px", display: "block", margin: "0 auto" }}>
              {/* Left circle — Particular Interest */}
              <circle
                cx="185" cy="110" r="90"
                fill={vennHover === "particular" ? "#0f2d44" : "#071624"}
                stroke={vennHover === "particular" ? "#0369A1" : "#1a3a52"}
                strokeWidth={vennHover === "particular" ? "2" : "1"}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={() => setVennHover("particular")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Right circle — Universal Principle */}
              <circle
                cx="315" cy="110" r="90"
                fill={vennHover === "universal" ? "#0f2d44" : "#071624"}
                stroke={vennHover === "universal" ? "#0369A1" : "#1a3a52"}
                strokeWidth={vennHover === "universal" ? "2" : "1"}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={() => setVennHover("universal")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Overlap — Rational Freedom — glowing */}
              <ellipse
                cx="250" cy="110" rx="42" ry="80"
                fill={pulse ? "#0f3a5a" : "#0c2d47"}
                stroke={pulse ? "#38bdf8" : "#0369A1"}
                strokeWidth={pulse ? "2.5" : "1.5"}
                style={{ cursor: "pointer", transition: "all 0.9s ease" }}
                onMouseEnter={() => setVennHover("synthesis")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Labels */}
              <text x="135" y="96" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Particular</text>
              <text x="135" y="112" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Interest</text>
              <text x="135" y="132" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Civil Society</text>
              <text x="135" y="146" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Individual Ends</text>

              <text x="368" y="96" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Universal</text>
              <text x="368" y="112" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Principle</text>
              <text x="368" y="132" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Rational Law</text>
              <text x="368" y="146" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Common Good</text>

              <text x="250" y="104" textAnchor="middle" fill="#f0f9ff" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">Rational</text>
              <text x="250" y="119" textAnchor="middle" fill="#f0f9ff" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">Freedom</text>
              {pulse && (
                <text x="250" y="136" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="Georgia, serif">★</text>
              )}
            </svg>

            {/* Venn Tooltip */}
            <div style={{
              minHeight: "60px",
              marginTop: "14px",
              padding: "12px 16px",
              background: "#071420",
              border: "1px solid #1a3347",
              borderRadius: "6px",
              transition: "all 0.2s ease"
            }}>
              {vennHover === "particular" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>Particular Interest:</span> The individual's private aims, needs, and voluntary associations — the domain of civil society. Without the universal, particularity degenerates into selfishness and market anarchy.
                </p>
              )}
              {vennHover === "universal" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>Universal Principle:</span> The rational law and common good that transcend any individual's preference. Without the particular, universality becomes an abstract tyranny that crushes concrete life.
                </p>
              )}
              {vennHover === "synthesis" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#38bdf8", fontWeight: "bold" }}>Rational Freedom:</span> The synthesis where citizens identify their own deepest purposes with the rational institutions of the state. Political participation is not sacrifice of the self — it is the highest form of self-realization.
                </p>
              )}
              {!vennHover && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#334155", margin: 0, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  Hover over a region of the diagram to see what it represents...
                </p>
              )}
            </div>
          </div>

          {/* Negative vs Positive Freedom Toggle */}
          <div style={{ marginTop: "clamp(16px, 3vw, 24px)" }}>
            <div style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#64748b",
              marginBottom: "12px",
              fontFamily: "Georgia, serif"
            }}>
              The central distinction Hegel draws:
            </div>
            <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 14px)", flexWrap: "wrap" }}>
              <div style={{
                flex: "1 1 clamp(140px, 45%, 300px)",
                background: "#07111c",
                border: "1px solid #1a3347",
                borderTop: "3px solid #ef4444",
                borderRadius: "6px",
                padding: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{
                  fontSize: "clamp(10px, 1.3vw, 12px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  marginBottom: "8px",
                  fontFamily: "Georgia, serif"
                }}>
                  Negative Freedom
                </div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#94a3b8",
                  margin: 0,
                  lineHeight: "1.65",
                  fontFamily: "Georgia, serif"
                }}>
                  Freedom as absence of external constraint. The liberal ideal: no one compels me. Yet Hegel argues this is bondage in disguise — the slave of arbitrary desire, with no account of what makes a will genuinely free rather than merely unobstructed.
                </p>
              </div>
              <div style={{
                flex: "1 1 clamp(140px, 45%, 300px)",
                background: "#07111c",
                border: "1px solid #1a3347",
                borderTop: "3px solid #0369A1",
                borderRadius: "6px",
                padding: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{
                  fontSize: "clamp(10px, 1.3vw, 12px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#0369A1",
                  marginBottom: "8px",
                  fontFamily: "Georgia, serif"
                }}>
                  Positive Freedom
                </div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#94a3b8",
                  margin: 0,
                  lineHeight: "1.65",
                  fontFamily: "Georgia, serif"
                }}>
                  Freedom as self-determination according to rational principles. The will is genuinely free when it wills what reason endorses — and this requires rational institutions in which the individual is genuinely recognized and at home. Freedom is achieved, not merely given.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderLeft: "4px solid #0c4a6e",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0c4a6e",
            marginBottom: "12px",
            fontFamily: "Georgia, serif"
          }}>
            The Difficulty
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif"
          }}>
            The Philosophy of Right delivers a genuine resolution: freedom actualized in the rational state. But this very success generates a pressing new problem. If the rational state is the highest embodiment of objective freedom, how does this particular, historically situated state fit into the larger sweep of world history? States rise and fall — the Greek polis gave way to Rome, Rome to the Christian kingdoms, those to modern constitutional orders. Is there a rational pattern to this succession, or is history merely a slaughterhouse of political forms with no redemptive logic?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#475569",
            margin: 0,
            fontStyle: "italic",
            fontFamily: "Georgia, serif"
          }}>
            This pressure forces the next development: a philosophy of world history in which Geist moves through successive civilizations, each embodying a partial form of freedom, toward a final reconciliation — not within any single state, but in the very concept of history itself.
          </p>
        </div>

        {/* REAL-WORLD ECHOES — collapsible */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "#e2e8f0",
              fontFamily: "Georgia, serif"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0369A1",
                fontFamily: "Georgia, serif"
              }}>
                Real-World Echoes
              </span>
              <span style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#475569",
                fontFamily: "Georgia, serif"
              }}>
                — concrete parallels today
              </span>
            </div>
            {echosOpen ? <ChevronUp size={18} color="#0369A1"/> : <ChevronDown size={18} color="#0369A1"/>}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
              borderTop: "1px solid #1a3347"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 18px)", marginTop: "clamp(14px, 2.5vw, 20px)" }}>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Property Rights as Actualized Purpose
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    When someone owns a home, business, or creative work, they do not merely possess an asset — they have externalized their will into the world. Property rights, on Hegel's account, are not primarily economic instruments but the institutional recognition of persons as free agents capable of projecting their purposes outward. Abstract right's genuine insight lives here, however incomplete it remains by itself.
                  </p>
                </div>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Kant's Categorical Imperative as Morality's Limit
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    Kant's formula — "Act only according to that maxim you could will as universal law" — captures morality's formal universality with precision. Yet critics have long noted its emptiness: almost any maxim can be universalized with enough ingenuity. Hegel sharpens this critique: the categorical imperative tells us the form of moral reasoning but cannot deliver its content without appeal to the very social life it was meant to transcend.
                  </p>
                </div>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Civil Society's Dialectic: Markets and Inequality
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    Hegel recognized that market competition — the engine of civil society — generates both wealth and systemic inequality. Left to its own logic, the market concentrates advantages and produces a "rabble" (Pöbel) excluded from genuine participation. This is not a failure of markets per se but the internal dialectic of civil society demanding state regulation. The ongoing debates around antitrust law, welfare states, and labor standards are live instances of this Hegelian insight playing out in real political time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(24px, 4vw, 40px)",
          paddingBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <p style={{
            fontSize: "clamp(10px, 1.3vw, 12px)",
            color: "#1e3a52",
            fontFamily: "Georgia, serif",
            fontStyle: "italic"
          }}>
            Part 8 of 20 — The Science of Freedom
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Part 9: The Cunning of Reason ───
function PhilosophyOfHistory() {
  const [selectedEpoch, setSelectedEpoch] = useState(null);
  const [hoveredEpoch, setHoveredEpoch] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredEchos, setHoveredEchos] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const epochs = [
    {
      id: "oriental",
      label: "Oriental",
      subtitle: "One is Free",
      period: "Ancient East",
      color: "#C2410C",
      freedom: "Freedom exists only in the despot. The divine ruler embodies the state absolutely; all others exist as subjects without personal right.",
      contradiction: "When freedom belongs to one alone, it is arbitrary will — not true freedom. The despot's whim is not reason, and subjugated peoples cannot recognize themselves as free.",
      transition: "The Persian synthesis of diverse peoples under law plants the seed of universality, but the structure collapses under its own rigidity, giving way to the Greek spirit of civic participation.",
      motif: "pyramid"
    },
    {
      id: "greek",
      label: "Greek",
      subtitle: "Some are Free",
      period: "Classical Antiquity",
      color: "#9A3412",
      freedom: "The citizen participates in the life of the polis. Beautiful ethical community — the individual finds meaning in collective civic existence.",
      contradiction: "Freedom is real but limited: slaves and women are excluded. The unity of individual and community rests on unreflective custom, not self-conscious reason. Socratic questioning destroys the naive harmony.",
      transition: "The collapse of the polis under Alexander and Rome universalizes the Greek individual — but strips citizenship of its ethical community, leaving only abstract legal personhood.",
      motif: "parthenon"
    },
    {
      id: "roman",
      label: "Roman",
      subtitle: "Legal Universality",
      period: "Roman Empire",
      color: "#7C2D12",
      freedom: "Every person is a legal subject — a formal right-bearer before the law. The concept of the person achieves universal scope.",
      contradiction: "Legal universality without ethical community. The Roman 'person' is a hollow abstraction; real life is servitude and empire. The longing for genuine inner freedom cannot be satisfied by external law alone.",
      transition: "Christianity answers Roman alienation by locating freedom in the inner life — the soul's infinite worth before God — transforming the abstract legal person into a spiritually free subject.",
      motif: "eagle"
    },
    {
      id: "germanic",
      label: "Germanic",
      subtitle: "All are Free",
      period: "Modern World",
      color: "#854D0E",
      freedom: "Through the Protestant Reformation, Enlightenment, and French Revolution, the principle is established: all persons are free in principle. The rational state embodies this in concrete institutions.",
      contradiction: "The French Revolution shows the danger of abstract freedom — applying universal principles without mediating institutions produces the Terror. Freedom must be realized through particular institutions, not abstract will.",
      transition: "Constitutional monarchy synthesizes popular sovereignty with institutional stability — but even the most rational political order remains historically particular, raising the question of what lies beyond political history.",
      motif: "arch"
    }
  ];

  const echoes = [
    { title: "Persian Empire", text: "Incorporated diverse peoples under administrative universality while maintaining despotic structure — the Oriental moment of unity-without-freedom replayed in every modern authoritarian 'modernizer'." },
    { title: "Greek City-States", text: "Achieved genuine political participation and civic identity, yet excluded slaves and women — a recurring pattern where freedom is real for insiders and nonexistent for those the community defines as outside." },
    { title: "The French Revolution & Terror", text: "Applied abstract universal principles — Liberty, Equality — without the mediating institutions that make freedom concrete. Every revolutionary purism that destroys existing structures risks reproducing the Terror." },
    { title: "Constitutional Monarchy", text: "Hegel's synthesis: representative institutions, rule of law, and an executive that embodies state unity. The tension between populism and constitutional constraint is the Germanic world's living problem." }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const w = container.offsetWidth;
      const h = Math.min(120, w * 0.18);
      canvas.width = w;
      canvas.height = h;
    });
    resizeObserver.observe(container);

    const w = container.offsetWidth;
    const h = Math.min(120, w * 0.18);
    canvas.width = w;
    canvas.height = h;

    const draw = (timestamp) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;
      const ctx = canvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // River base gradient
      const riverGrad = ctx.createLinearGradient(0, 0, cw, 0);
      riverGrad.addColorStop(0, "#1a0a02");
      riverGrad.addColorStop(0.25, "#3d1a08");
      riverGrad.addColorStop(0.5, "#5c2a0e");
      riverGrad.addColorStop(0.75, "#7a3510");
      riverGrad.addColorStop(1, "#9a4515");
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, 0, cw, ch);

      // River flow lines
      for (let layer = 0; layer < 6; layer++) {
        ctx.beginPath();
        const yBase = ch * 0.2 + layer * (ch * 0.12);
        const amplitude = 3 + layer * 1.5;
        const freq = 0.008 + layer * 0.002;
        const speed = 0.4 + layer * 0.15;
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= cw; x += 4) {
          const y = yBase + Math.sin(x * freq + t * speed) * amplitude + Math.sin(x * freq * 1.7 + t * speed * 0.6) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }
        const alpha = 0.15 + layer * 0.05;
        ctx.strokeStyle = `#F97316${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Eddies at transition points (between epochs)
      const eddiePosX = [cw * 0.27, cw * 0.5, cw * 0.73];
      eddiePosX.forEach((ex, i) => {
        const ey = ch * 0.5;
        const pulseR = 8 + Math.sin(t * 1.2 + i * 2.1) * 4;
        for (let ring = 0; ring < 3; ring++) {
          const r = pulseR + ring * 8;
          const alpha = Math.max(0, 0.4 - ring * 0.12) * (0.6 + 0.4 * Math.sin(t * 0.8 + i));
          ctx.beginPath();
          ctx.arc(ex, ey, r, 0, Math.PI * 2);
          ctx.strokeStyle = `#F97316${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Spiral
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 4; angle += 0.15) {
          const spiralR = (angle / (Math.PI * 4)) * pulseR;
          const sx = ex + spiralR * Math.cos(angle + t * 2 + i);
          const sy = ey + spiralR * Math.sin(angle + t * 2 + i) * 0.6;
          if (angle === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `#FDBA74aa`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Floating particles
      for (let p = 0; p < 20; p++) {
        const px = ((p * 137.5 + t * 30) % cw);
        const py = ch * 0.2 + Math.sin(px * 0.02 + t * 0.3 + p) * ch * 0.3;
        const alpha = 0.3 + 0.3 * Math.sin(t * 0.5 + p);
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `#FED7AA${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  function PyramidMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <polygon points="30,4 56,46 4,46" fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" />
        <line x1="30" y1="4" x2="30" y2="46" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="18" y1="25" x2="42" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="30" cy="10" r="2.5" fill={color} opacity="0.8" />
      </svg>
    );
  }

  function ParthenonMotif({ color, size }) {
    const cols = 6;
    const colW = 42 / cols;
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <rect x="6" y="40" width="48" height="5" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <rect x="10" y="35" width="40" height="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <polygon points="8,12 52,12 56,20 4,20" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        {Array.from({ length: cols }).map((_, i) => (
          <rect key={i} x={12 + i * 7} y="20" width="3" height="15" fill={color} opacity="0.7" />
        ))}
      </svg>
    );
  }

  function EagleMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <ellipse cx="30" cy="28" rx="8" ry="10" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M22,24 Q10,15 6,20 Q14,22 22,28" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M38,24 Q50,15 54,20 Q46,22 38,28" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M26,38 Q30,44 34,38" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <circle cx="30" cy="22" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <path d="M28,20 Q30,17 32,20" fill={color} opacity="0.8" />
      </svg>
    );
  }

  function ArchMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <path d="M12,46 L12,22 Q12,6 30,6 Q48,6 48,22 L48,46" fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" />
        <path d="M18,46 L18,24 Q18,14 30,14 Q42,14 42,24 L42,46" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <line x1="6" y1="46" x2="54" y2="46" stroke={color} strokeWidth="2" opacity="0.9" />
        <circle cx="30" cy="6" r="3" fill={color} opacity="0.7" />
        <line x1="30" y1="6" x2="30" y2="46" stroke={color} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
      </svg>
    );
  }

  function EpochMotif({ motif, color, size }) {
    if (motif === "pyramid") return <PyramidMotif color={color} size={size} />;
    if (motif === "parthenon") return <ParthenonMotif color={color} size={size} />;
    if (motif === "eagle") return <EagleMotif color={color} size={size} />;
    if (motif === "arch") return <ArchMotif color={color} size={size} />;
    return null;
  }

  const outerStyle = {
    background: "radial-gradient(ellipse at 40% 30%, #3d1a0880 0%, #1a0a0260 40%, #0a0a0f 100%)",
    minHeight: "100vh",
    fontFamily: "Georgia, serif",
    padding: "clamp(16px, 4vw, 40px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const wrapperStyle = {
    width: "100%",
    maxWidth: "min(90vw, 860px)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(20px, 3vw, 32px)"
  };

  const accent = "#C2410C";

  const keyConcepts = [
    { id: "cunning_of_reason", label: "Cunning of Reason", desc: "The cunning of reason (List der Vernunft) is Hegel's explanation for how rational outcomes emerge from irrational passions: world-historical individuals pursue self-interested goals, but reason uses those passions as instruments for its own ends. Caesar conquered for personal glory; reason used him to create the conditions for a new political epoch." },
    { id: "historical_epochs", label: "World-Historical Epochs", desc: "Hegel divides world history into four epochs corresponding to different stages of freedom's realization: the Oriental world (one free), the Greek world (some free), the Roman world (abstract legal freedom for all), and the Germanic world (freedom fully actualized in the constitutional state). Each stage inherits the problems of the last and raises the degree of conscious freedom." },
    { id: "recognition", label: "Recognition and Historical Change", desc: "The struggle for recognition is the engine of historical change. Peoples and world-historical individuals demand that their claims to freedom and self-determination be acknowledged, and when existing institutions deny that recognition, historical rupture follows. The French Revolution is the most dramatic example: the demand for universal recognition overturning an entire social order." },
    { id: "french_revolution", label: "French Revolution", desc: "The French Revolution is the pivotal world-historical event in Hegel's account — the moment when freedom becomes a conscious political principle that the modern world must institutionalize. But its abstract universalism, disconnected from concrete institutions and traditions, collapses into the Terror. For Hegel, this proves that freedom must be institutionally embodied, not merely asserted." },
    { id: "constitutional_monarchy", label: "Constitutional Monarchy", desc: "The rational state, for Hegel, takes the form of a constitutional monarchy in which universal law, particular interests (represented through estates and civil society), and individual sovereignty are unified. This is not a defense of arbitrary monarchy but of a differentiated state structure in which rational freedom is concretely realized for all members." },
    { id: "geist_in_history", label: "Spirit in History", desc: "Hegel's philosophy of history is not mere chronology but the account of Geist (Spirit) becoming self-conscious through temporal development. History has a structure — it is going somewhere — and that destination is freedom's self-knowledge. Nations are the vehicles of Spirit at particular stages; no nation is the permanent bearer, and history 'uses up' peoples as it advances." },
  ];

  const cardStyle = {
    background: "#0e080280",
    border: "1px solid #854D0E40",
    borderRadius: "8px",
    padding: "clamp(16px, 3vw, 28px)"
  };

  const problemCardStyle = {
    ...cardStyle,
    borderLeft: "4px solid #854D0E",
    background: "#0e080290"
  };

  const difficultyCardStyle = {
    ...cardStyle,
    borderLeft: "4px solid #7C2D12",
    background: "#0e080290"
  };

  const labelStyle = {
    fontVariant: "small-caps",
    fontSize: "clamp(10px, 1.4vw, 12px)",
    letterSpacing: "0.12em",
    color: "#C2410C",
    marginBottom: "10px",
    textTransform: "uppercase"
  };

  return (
    <div style={outerStyle}>
      <div style={wrapperStyle}>

        {/* Part indicator */}
        <div style={{ textAlign: "center", marginBottom: "-8px" }}>
          <span style={{ fontSize: "clamp(10px, 1.3vw, 11px)", color: "#854D0E90", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Part 9 of 20 — Philosophy of Spirit
          </span>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", color: "#FED7AA", margin: "0 0 10px 0", fontWeight: "normal", letterSpacing: "0.03em" }}>
            The Cunning of Reason
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: "#FDBA7490", margin: 0, fontStyle: "italic", lineHeight: "1.5" }}>
            World history is the progressive realization of human freedom, driven not by conscious planning but by the rational outcomes that emerge from the collision of particular passions.
          </p>
        </div>

        {/* 1. PROBLEM PANEL */}
        <div style={problemCardStyle}>
          <div style={labelStyle}>The Problem</div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#FED7AAcc", lineHeight: "1.7", margin: 0 }}>
            If the rational state is the highest form of objective spirit — the institutional embodiment of freedom — then history confronts philosophy with an urgent question. How did humanity arrive at it? Surveying the vast pageant of empires, conquests, and civilizations that preceded the modern world, one finds not steady progress but apparent chaos: dynasties rising and falling, wars obliterating cultures, passions and accidents shaping outcomes. Is there a rational pattern underlying the seemingly chaotic succession of historical empires and cultures, or is the idea of the rational state merely our present flattering itself?
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{ ...cardStyle, background: "#08050290", border: "1px solid #854D0E30" }}>

          {/* Header */}
          <div style={{ marginBottom: "clamp(16px, 2.5vw, 24px)" }}>
            <div style={labelStyle}>The Four World-Historical Epochs</div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#FDBA7480", margin: 0, fontStyle: "italic" }}>
              Click any epoch to explore its form of freedom, its inner contradiction, and the transition that drove history forward.
            </p>
          </div>

          {/* Epoch markers — horizontal flow */}
          <div ref={containerRef} style={{ width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(6px, 1.5vw, 14px)",
              marginBottom: "16px"
            }}>
              {epochs.map((epoch, idx) => {
                const isSelected = selectedEpoch === epoch.id;
                const isHovered = hoveredEpoch === epoch.id;
                const motifSize = 52;
                return (
                  <div
                    key={epoch.id}
                    onClick={() => setSelectedEpoch(isSelected ? null : epoch.id)}
                    onMouseEnter={() => setHoveredEpoch(epoch.id)}
                    onMouseLeave={() => setHoveredEpoch(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "clamp(10px, 2vw, 18px) clamp(6px, 1.5vw, 12px)",
                      background: isSelected ? "#3d1a0850" : isHovered ? "#2a100420" : "#1a080210",
                      border: `1px solid ${isSelected ? epoch.color + "cc" : isHovered ? epoch.color + "60" : epoch.color + "30"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? `0 0 20px ${epoch.color}40` : isHovered ? `0 0 10px ${epoch.color}20` : "none",
                      position: "relative"
                    }}
                  >
                    {/* Roman numeral */}
                    <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: epoch.color + "90", marginBottom: "6px", letterSpacing: "0.1em" }}>
                      {["I", "II", "III", "IV"][idx]}
                    </span>

                    {/* Motif */}
                    <div style={{ marginBottom: "8px", filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${epoch.color}80)` : "none", transition: "filter 0.25s ease" }}>
                      <EpochMotif motif={epoch.motif} color={epoch.color} size={motifSize} />
                    </div>

                    <span style={{ fontSize: "clamp(11px, 1.5vw, 14px)", fontWeight: "bold", color: "#FED7AAcc", marginBottom: "3px", textAlign: "center" }}>
                      {epoch.label}
                    </span>
                    <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: epoch.color, fontStyle: "italic", textAlign: "center", lineHeight: "1.3" }}>
                      {epoch.subtitle}
                    </span>
                    <span style={{ fontSize: "clamp(8px, 1.1vw, 10px)", color: "#FDBA7450", marginTop: "4px", textAlign: "center" }}>
                      {epoch.period}
                    </span>

                    {isSelected && (
                      <div style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        background: epoch.color,
                        borderRadius: "50%"
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Connector arrows between epochs */}
            <svg viewBox="0 0 800 30" width="100%" style={{ display: "block", marginBottom: "0px", overflow: "visible" }}>
              {[0.27, 0.5, 0.73].map((x, i) => (
                <g key={i}>
                  <line x1={x * 800 - 20} y1="15" x2={x * 800 + 20} y2="15" stroke="#854D0E60" strokeWidth="1.5" />
                  <polygon points={`${x * 800 + 20},15 ${x * 800 + 12},11 ${x * 800 + 12},19`} fill="#854D0E60" />
                </g>
              ))}
              <text x="400" y="28" textAnchor="middle" fill="#854D0E50" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">
                dialectical transitions
              </text>
            </svg>

            {/* Animated River: Cunning of Reason */}
            <div style={{ position: "relative", marginTop: "4px" }}>
              <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", borderRadius: "6px", border: "1px solid #854D0E30" }}
              />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                textAlign: "center"
              }}>
                <span style={{ fontSize: "clamp(9px, 1.3vw, 12px)", color: "#FED7AA80", fontStyle: "italic", letterSpacing: "0.08em", textShadow: "0 0 8px #0a0a0f" }}>
                  ~ The Cunning of Reason ~
                </span>
              </div>
            </div>
            <p style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#854D0E70", fontStyle: "italic", textAlign: "center", margin: "6px 0 0 0" }}>
              Eddies mark the collision of passions that generate unintended rational outcomes
            </p>
          </div>

          {/* Expanded epoch detail */}
          {selectedEpoch && (() => {
            const epoch = epochs.find(e => e.id === selectedEpoch);
            return (
              <div style={{
                marginTop: "clamp(14px, 2vw, 20px)",
                padding: "clamp(14px, 2.5vw, 22px)",
                background: "#1a080230",
                border: `1px solid ${epoch.color}50`,
                borderRadius: "8px",
                borderLeft: `4px solid ${epoch.color}`,
                animation: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <EpochMotif motif={epoch.motif} color={epoch.color} size={40} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "clamp(15px, 2.2vw, 20px)", color: "#FED7AA", fontWeight: "normal" }}>
                      The {epoch.label} World
                    </h3>
                    <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: epoch.color, fontStyle: "italic" }}>
                      {epoch.subtitle} — {epoch.period}
                    </span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Form of Freedom
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.freedom}
                    </p>
                  </div>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Inner Contradiction
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.contradiction}
                    </p>
                  </div>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px", gridColumn: epoch.id === "germanic" ? "1 / -1" : "auto" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Transition Forward
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.transition}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. DIFFICULTY PANEL */}
        <div style={difficultyCardStyle}>
          <div style={{ ...labelStyle, color: "#C2410C" }}>The Difficulty</div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#FED7AAcc", lineHeight: "1.7", margin: "0 0 12px 0" }}>
            Even the most rational political order — the constitutional state that embodies freedom for all — remains historically particular and finite. It arose through specific cultural struggles, Protestant and Enlightenment traditions, revolutionary upheaval, and it bears the marks of its origins. If history is the self-development of reason toward freedom, and if the modern state represents the culmination of political history, then what lies beyond? The nation-state can be rational in form and yet provincial in spirit, capable of war, domination, and cultural narrowness. The question presses: is political self-consciousness the ultimate form of human achievement, or does spirit seek a higher medium — art, religion, philosophy — in which it knows itself not as citizen but as the thinking subject that comprehends the whole?
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#C2410C90", fontStyle: "italic", margin: 0 }}>
            This pressure forces the next development: the move from Objective Spirit — spirit realized in institutions — to Absolute Spirit, where humanity recognizes its deepest nature not in political community but in art, revealed religion, and philosophical thought.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES — collapsible */}
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={() => setHoveredEchos(true)}
            onMouseLeave={() => setHoveredEchos(false)}
            style={{
              width: "100%",
              background: hoveredEchos ? "#1a080220" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.2s ease"
            }}
          >
            <span style={{ ...labelStyle, margin: 0, color: "#C2410C" }}>Real-World Echoes</span>
            <span style={{ color: "#854D0E" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 2.5vw, 24px)", borderTop: "1px solid #854D0E20" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "14px", marginTop: "16px" }}>
                {echoes.map((echo, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#14060210",
                        border: "1px solid #854D0E25",
                        borderRadius: "6px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#C2410C", fontWeight: "bold", marginBottom: "8px" }}>
                        {echo.title}
                      </div>
                      <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA80", lineHeight: "1.6", margin: 0 }}>
                        {echo.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: "8px" }}>
          <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#854D0E50", letterSpacing: "0.15em", fontStyle: "italic" }}>
            Hegel's Philosophy of History — The Cunning of Reason
          </span>
        </div>

      </div>
    </div>
  );
}

// ─── Part 10: The Beautiful, the Holy, and the True ───
function AbsoluteSpiritArtReligionPhilosophy() {
  const [luminosity, setLuminosity] = useState(1);
  const [activePanel, setActivePanel] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  const accent = "#C026D3";

  const keyConcepts = [
    { id: "absolute_spirit", label: "Absolute Spirit", desc: "Absolute Spirit is Hegel's name for mind or spirit at its fullest self-realization — the moment when thought comprehends itself as the inner truth of all reality. Art, religion, and philosophy are its three successive forms, each offering a different medium through which Spirit comes to know itself." },
    { id: "art_sensuous", label: "Art as Sensuous Appearance", desc: "For Hegel, art is the first and most immediate mode in which the Absolute becomes present to consciousness — through the beautiful sensuous shape of stone, sound, or image. The Idea shines through material form, but because the medium is external and resistant, art can only partially express what Spirit truly is." },
    { id: "art_forms", label: "Symbolic / Classical / Romantic Art", desc: "Hegel traces three historical forms of art: Symbolic art (ancient Egypt) where Spirit and matter are inadequately matched; Classical art (ancient Greece) where they achieve perfect sensuous harmony in the human body; and Romantic art (Christian Europe) where Spirit withdraws inward, beginning to outgrow the sensuous medium entirely." },
    { id: "religion_representational", label: "Religion as Representational Truth", desc: "Religion grasps the same absolute truth as philosophy but in the medium of Vorstellung — picture-thinking or representation. It narrates in stories, images, and rituals what philosophy will express in pure concepts. Christianity captures the speculative truth of the unity of finite and infinite, but clothes it in historical narrative rather than transparent thought." },
    { id: "philosophy_conceptual", label: "Philosophy as Conceptual Self-Transparency", desc: "Philosophy is the culmination of Absolute Spirit because it grasps the truth in its own proper medium — the self-moving concept (Begriff). Where art requires sensuous material and religion requires narrative images, philosophy strips away every external husk and lets Spirit comprehend itself purely in thought." },
    { id: "end_of_art", label: "End of Art Thesis", desc: "Hegel argues that art has reached its historical end — not that people will stop making art, but that art can no longer serve as the highest vehicle for Spirit's self-knowledge. In the modern world, philosophy has taken over that function; art becomes an object of theoretical reflection rather than the living presence of the sacred." },
  ];

  const panels = [
    {
      id: "art",
      label: "Art",
      subtitle: "Sensuous Appearance of the Idea",
      icon: "◈",
      color: "#e07b39",
      stages: [
        { name: "Symbolic", culture: "Egyptian", desc: "Form is inadequate to content. The pyramid points toward an infinite mystery that exceeds every finite shape — spirit struggles to express itself through matter.", glyph: "△" },
        { name: "Classical", culture: "Greek", desc: "Perfect unity of form and spiritual content. The sculptured human body becomes the ideal vessel for divine spirit — neither too much nor too little.", glyph: "○" },
        { name: "Romantic", culture: "Christian", desc: "Inner spiritual life exceeds all finite form. Painting and music gesture toward inwardness that no external shape can fully contain.", glyph: "♦" }
      ],
      desc: "Art makes spiritual truth sensorially present as beauty. It is the first, most immediate mode in which Absolute Spirit cognizes itself — through the shining of the idea in sensuous form."
    },
    {
      id: "religion",
      label: "Religion",
      subtitle: "Representational Truth",
      icon: "✦",
      color: "#5b8dee",
      stages: [
        { name: "Nature Religion", culture: "Ancient", desc: "Spirit worships itself in natural forces — light, storm, fertility. The divine is immediate, unmediated, external.", glyph: "☀" },
        { name: "Art Religion", culture: "Greek", desc: "The divine is shaped by human craft into beautiful, individuated gods. Spirit begins to recognize its own reflection in ideal human form.", glyph: "⚱" },
        { name: "Revealed Religion", culture: "Christian", desc: "God becomes human. The infinite enters the finite absolutely. Spirit recognizes the finite-infinite unity through the narrative of incarnation, death, and resurrection.", glyph: "✝" }
      ],
      desc: "Religion grasps the same truth as art, but through representational narrative and feeling rather than sensuous form. Its highest achievement is the Christian recognition of finite-infinite unity."
    },
    {
      id: "philosophy",
      label: "Philosophy",
      subtitle: "Conceptual Self-Transparency",
      icon: "⬡",
      color: "#C026D3",
      stages: [
        { name: "Eastern Philosophy", culture: "Ancient East", desc: "Pure abstract being — undifferentiated unity. Thought has not yet distinguished itself from its object. Spirit is immediate to itself.", glyph: "∞" },
        { name: "Greek Philosophy", culture: "Athens", desc: "The discovery of the concept, of dialectic, of the movement of thought thinking itself. Logos becomes the medium of spirit's self-articulation.", glyph: "Φ" },
        { name: "Speculative Idealism", culture: "Modern", desc: "Absolute knowing: thought thinks itself thinking the whole. Philosophy completes the system, recognizing that the real is rational and the rational is real.", glyph: "◉" }
      ],
      desc: "Philosophy supersedes art and religion by expressing absolute truth in pure conceptual thinking — requiring no sensuous support, no narrative image. It is Spirit transparent to itself in thought."
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = 80;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const ctx = canvas.getContext("2d");
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const artGlow = luminosity <= 1 ? 1 : Math.max(0, 1 - (luminosity - 1));
      const relGlow = luminosity <= 1 ? luminosity : luminosity <= 2 ? 1 : Math.max(0, 1 - (luminosity - 2));
      const philGlow = luminosity <= 2 ? luminosity / 2 : 1;

      const colors = [
        { r: 224, g: 123, b: 57, a: artGlow },
        { r: 91, g: 141, b: 238, a: relGlow },
        { r: 192, g: 38, b: 211, a: philGlow }
      ];

      const nodeCount = 18;
      for (let i = 0; i < nodeCount; i++) {
        const section = Math.floor(i / 6);
        const c = colors[section];
        const x = (i / nodeCount) * w + Math.sin(t * 0.7 + i) * 6;
        const y = h / 2 + Math.sin(t + i * 0.9) * 18;
        const r = 3 + Math.sin(t * 1.2 + i) * 2;
        const alpha = c.a * (0.5 + 0.5 * Math.sin(t * 0.8 + i));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.round(c.r).toString(16).padStart(2,"0")}${Math.round(c.g).toString(16).padStart(2,"0")}${Math.round(c.b).toString(16).padStart(2,"0")}`;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (i < nodeCount - 1) {
          const nx = ((i + 1) / nodeCount) * w + Math.sin(t * 0.7 + i + 1) * 6;
          const ny = h / 2 + Math.sin(t + (i + 1) * 0.9) * 18;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          const nc = colors[Math.floor((i + 1) / 6)];
          ctx.strokeStyle = `#${Math.round((c.r + nc.r) / 2).toString(16).padStart(2,"0")}${Math.round((c.g + nc.g) / 2).toString(16).padStart(2,"0")}${Math.round((c.b + nc.b) / 2).toString(16).padStart(2,"0")}`;
          ctx.globalAlpha = (c.a + nc.a) / 2 * 0.4;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      t += 0.02;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [luminosity]);

  const getPanelOpacity = (panelId) => {
    const idx = panels.findIndex(p => p.id === panelId);
    const pos = idx / 2;
    if (luminosity <= 1) {
      if (idx === 0) return 1;
      return 0.3 + 0.4 * (luminosity * (idx === 1 ? 0.7 : 0.4));
    }
    if (luminosity <= 2) {
      const t = luminosity - 1;
      if (idx === 0) return 1 - t * 0.6;
      if (idx === 1) return 0.6 + t * 0.4;
      return 0.2 + t * 0.5;
    }
    const t = luminosity - 2;
    if (idx === 0) return 0.3 + (1 - t) * 0.1;
    if (idx === 1) return 0.8 - t * 0.5;
    return 0.7 + t * 0.3;
  };

  const getPanelGlow = (panelId) => {
    const idx = panels.findIndex(p => p.id === panelId);
    if (luminosity <= 1) return idx === 0 ? 1 : 0;
    if (luminosity <= 2) {
      const t = luminosity - 1;
      if (idx === 0) return 1 - t;
      if (idx === 1) return t;
      return 0;
    }
    const t = luminosity - 2;
    if (idx === 1) return 1 - t;
    if (idx === 2) return t;
    return 0;
  };

  const getLuminosityLabel = () => {
    if (luminosity < 0.7) return "Sensuous Immediacy";
    if (luminosity < 1.3) return "The Beautiful";
    if (luminosity < 1.7) return "Art into Religion";
    if (luminosity < 2.3) return "The Holy";
    if (luminosity < 2.7) return "Religion into Philosophy";
    return "Conceptual Transparency";
  };

  return (
    <div ref={containerRef} style={{
      background: "radial-gradient(ellipse at 50% 20%, #3d0a42 0%, #12031a 50%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      boxSizing: "border-box"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            color: accent,
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 10 of 20 · Absolute Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            color: "#f5e6ff",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            letterSpacing: "0.02em"
          }}>The Beautiful, the Holy, and the True</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#b898c8",
            margin: 0,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6
          }}>Art, Religion, and Philosophy as the three modes through which humanity achieves complete self-understanding of its relationship to ultimate reality.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#1a0a1e",
          border: "1px solid #2a1030",
          borderLeft: `4px solid ${accent}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.1vw, 10px)",
            letterSpacing: "0.25em",
            color: accent,
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0f0",
            margin: 0,
            lineHeight: 1.7
          }}>
            Political history reaches its limit in the rational state — the institutional embodiment of freedom. Yet the state, however rational, remains a finite arrangement of laws and customs. What lies beyond finite political institutions as the ultimate form in which Spirit knows itself? The organism of civic life still operates through external necessity, through force of habit and law. But Spirit's deepest need is not merely to be enacted — it must be <em>known</em>, fully and transparently, as the infinite expressing itself through and as finite existence. The urgency is this: a civilization that has achieved the rational state but lacks the capacity for absolute self-understanding remains, in the deepest sense, incomplete.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#110718",
          border: "1px solid #2a0a35",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>

          {/* Luminosity Slider */}
          <div style={{ marginBottom: "clamp(16px, 3vw, 24px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#e07b39", letterSpacing: "0.15em", textTransform: "uppercase" }}>Sensuous</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: accent, letterSpacing: "0.1em" }}>{getLuminosityLabel()}</div>
                <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#6a4a7a", marginTop: "2px" }}>dial to trace Spirit's ascent</div>
              </div>
              <span style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#C026D3", letterSpacing: "0.15em", textTransform: "uppercase" }}>Conceptual</span>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #e07b39, #5b8dee, #C026D3)",
                marginBottom: "4px"
              }} />
              <input
                type="range"
                min="0"
                max="3"
                step="0.01"
                value={luminosity}
                onChange={e => setLuminosity(parseFloat(e.target.value))}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  appearance: "none",
                  height: "24px",
                  background: "transparent",
                  position: "absolute",
                  top: "-14px",
                  left: 0
                }}
              />
            </div>
          </div>

          {/* Canvas Wave */}
          <canvas ref={canvasRef} style={{ width: "100%", display: "block", marginBottom: "clamp(16px, 3vw, 20px)", borderRadius: "6px" }} />

          {/* Triptych Panels */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(16px, 3vw, 24px)"
          }}>
            {panels.map((panel, idx) => {
              const opacity = getPanelOpacity(panel.id);
              const glow = getPanelGlow(panel.id);
              const isActive = activePanel === panel.id;
              const isHovered = hoveredPanel === panel.id;
              return (
                <div
                  key={panel.id}
                  onClick={() => setActivePanel(isActive ? null : panel.id)}
                  onMouseEnter={() => setHoveredPanel(panel.id)}
                  onMouseLeave={() => setHoveredPanel(null)}
                  style={{
                    background: `${panel.color}11`,
                    border: `1px solid ${isActive || isHovered ? panel.color : panel.color + "44"}`,
                    borderTop: `3px solid ${panel.color}`,
                    borderRadius: "8px",
                    padding: "clamp(10px, 2vw, 18px)",
                    cursor: "pointer",
                    opacity: opacity,
                    boxShadow: glow > 0.3 ? `0 0 ${Math.round(glow * 30)}px ${panel.color}66` : "none",
                    transition: "all 0.4s ease",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)"
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <div style={{ fontSize: "clamp(20px, 4vw, 32px)", color: panel.color, lineHeight: 1 }}>{panel.icon}</div>
                    <div style={{ fontSize: "clamp(13px, 2vw, 17px)", color: "#f0e0ff", fontWeight: "normal", marginTop: "6px" }}>{panel.label}</div>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: panel.color, marginTop: "3px", letterSpacing: "0.05em" }}>{panel.subtitle}</div>
                  </div>

                  {/* Stages as mini glyphs */}
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px" }}>
                    {panel.stages.map((stage, si) => (
                      <div
                        key={stage.name}
                        onClick={e => { e.stopPropagation(); setActiveStage(activeStage === `${panel.id}-${si}` ? null : `${panel.id}-${si}`); }}
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          padding: "4px",
                          borderRadius: "4px",
                          background: activeStage === `${panel.id}-${si}` ? panel.color + "33" : "transparent",
                          border: activeStage === `${panel.id}-${si}` ? `1px solid ${panel.color}66` : "1px solid transparent",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ fontSize: "clamp(14px, 2.5vw, 20px)", color: panel.color }}>{stage.glyph}</div>
                        <div style={{ fontSize: "clamp(8px, 1vw, 10px)", color: "#c090d8", marginTop: "2px", whiteSpace: "nowrap" }}>{stage.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detail */}
          {activeStage && (() => {
            const [pid, sidxStr] = activeStage.split("-");
            const sidx = parseInt(sidxStr);
            const panel = panels.find(p => p.id === pid);
            const stage = panel.stages[sidx];
            return (
              <div style={{
                background: panel.color + "15",
                border: `1px solid ${panel.color}55`,
                borderRadius: "8px",
                padding: "clamp(12px, 2.5vw, 20px)",
                marginBottom: "clamp(12px, 2vw, 18px)",
                animation: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "clamp(16px, 3vw, 24px)", color: panel.color }}>{stage.glyph}</span>
                  <div>
                    <span style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: panel.color }}>{stage.name}</span>
                    <span style={{ fontSize: "clamp(11px, 1.4vw, 13px)", color: "#8a6a98", marginLeft: "10px" }}>({stage.culture})</span>
                  </div>
                </div>
                <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#dcc8ea", margin: 0, lineHeight: 1.7 }}>{stage.desc}</p>
              </div>
            );
          })()}

          {/* Active Panel Description */}
          {activePanel && (() => {
            const panel = panels.find(p => p.id === activePanel);
            return (
              <div style={{
                background: panel.color + "11",
                border: `1px solid ${panel.color}44`,
                borderRadius: "8px",
                padding: "clamp(12px, 2.5vw, 20px)",
                marginBottom: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", letterSpacing: "0.2em", color: panel.color, textTransform: "uppercase", marginBottom: "8px" }}>{panel.label} — Full Account</div>
                <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#dcc8ea", margin: 0, lineHeight: 1.7 }}>{panel.desc}</p>
              </div>
            );
          })()}

          {/* SVG Progression Diagram */}
          <svg viewBox="0 0 600 90" width="100%" style={{ display: "block", marginTop: "8px" }}>
            <defs>
              <linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e07b39" />
                <stop offset="50%" stopColor="#5b8dee" />
                <stop offset="100%" stopColor="#C026D3" />
              </linearGradient>
            </defs>
            {/* Timeline line */}
            <line x1="40" y1="45" x2="560" y2="45" stroke="url(#progGrad)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />

            {/* Art node */}
            <circle cx="100" cy="45" r="22" fill="#e07b3922" stroke="#e07b39" strokeWidth="1.5" opacity={getPanelOpacity("art")} />
            <text x="100" y="41" textAnchor="middle" fill="#e07b39" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("art")}>◈</text>
            <text x="100" y="56" textAnchor="middle" fill="#e07b39" fontSize="9" fontFamily="Georgia, serif" opacity={getPanelOpacity("art")}>ART</text>
            <text x="100" y="78" textAnchor="middle" fill="#8a6070" fontSize="8" fontFamily="Georgia, serif">Sensuous</text>

            {/* Arrow 1 */}
            <path d="M 130 45 Q 200 20 270 45" stroke="#8a6888" strokeWidth="1" fill="none" opacity="0.5" />
            <polygon points="268,40 275,45 268,50" fill="#8a6888" opacity="0.5" />
            <text x="200" y="28" textAnchor="middle" fill="#7a5888" fontSize="8" fontFamily="Georgia, serif">representation</text>

            {/* Religion node */}
            <circle cx="300" cy="45" r="22" fill="#5b8dee22" stroke="#5b8dee" strokeWidth="1.5" opacity={getPanelOpacity("religion")} />
            <text x="300" y="41" textAnchor="middle" fill="#5b8dee" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("religion")}>✦</text>
            <text x="300" y="56" textAnchor="middle" fill="#5b8dee" fontSize="8" fontFamily="Georgia, serif" opacity={getPanelOpacity("religion")}>RELIGION</text>
            <text x="300" y="78" textAnchor="middle" fill="#6a6090" fontSize="8" fontFamily="Georgia, serif">Narrative</text>

            {/* Arrow 2 */}
            <path d="M 330 45 Q 400 20 470 45" stroke="#8a6888" strokeWidth="1" fill="none" opacity="0.5" />
            <polygon points="468,40 475,45 468,50" fill="#8a6888" opacity="0.5" />
            <text x="400" y="28" textAnchor="middle" fill="#7a5888" fontSize="8" fontFamily="Georgia, serif">pure concept</text>

            {/* Philosophy node */}
            <circle cx="500" cy="45" r="22" fill="#C026D322" stroke="#C026D3" strokeWidth="1.5" opacity={getPanelOpacity("philosophy")} />
            <text x="500" y="41" textAnchor="middle" fill="#C026D3" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("philosophy")}>⬡</text>
            <text x="500" y="56" textAnchor="middle" fill="#C026D3" fontSize="7.5" fontFamily="Georgia, serif" opacity={getPanelOpacity("philosophy")}>PHILOSOPHY</text>
            <text x="500" y="78" textAnchor="middle" fill="#9060a8" fontSize="8" fontFamily="Georgia, serif">Conceptual</text>

            {/* Luminosity marker */}
            <circle
              cx={40 + (luminosity / 3) * 520}
              cy="45"
              r="5"
              fill="#ffffff"
              opacity="0.7"
            />
          </svg>

          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#7a5888",
            textAlign: "center",
            margin: "10px 0 0 0",
            fontStyle: "italic"
          }}>Click any panel or stage glyph to explore · Drag the slider to trace Spirit's ascent from beauty to truth</p>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* The Difficulty Panel */}
        <div style={{
          background: "#0e1020",
          border: "1px solid #1a1535",
          borderLeft: "4px solid #6040c0",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.1vw, 10px)",
            letterSpacing: "0.25em",
            color: "#6040c0",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#ccc0e0",
            margin: "0 0 14px 0",
            lineHeight: 1.7
          }}>
            If philosophy is the highest form of Spirit's self-knowledge and completes the entire system, a sharp tension emerges at its summit. Philosophy achieves conceptual self-transparency — but the self that becomes transparent is not a solitary mind. The entire architecture of Hegel's system has shown that self-consciousness is never immediate: it requires recognition by another, passes through the risk of desire and struggle, develops through labor, law, love, and history. The very movement that culminates in absolute knowing presupposes a structure of mutual recognition — and yet philosophy, in its purest form, seems to withdraw into solitary contemplation of the concept.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#ccc0e0",
            margin: 0,
            lineHeight: 1.7
          }}>
            Moreover, if art has truly been "ended" as the primary vehicle of cultural truth — if the modern world has passed beyond the stage where beauty could carry the full weight of absolute meaning — then what becomes of embodied, sensuous human experience in a civilization that has sublated it into concept? The question of how individual self-consciousness, which requires others to know itself, relates to the system's completed totality remains as an unresolved pressure. <span style={{ color: "#9070c8", fontStyle: "italic" }}>This pressure forces the next development: a rethinking of recognition, intersubjectivity, and what it means for Spirit to know itself not in solitary philosophy but through the living structure of human acknowledgment.</span>
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e0e18",
          border: "1px solid #1a1525",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: "clamp(14px, 2.5vw, 20px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.1vw, 10px)",
              letterSpacing: "0.25em",
              color: accent,
              textTransform: "uppercase",
              fontVariant: "small-caps"
            }}>Real-World Echoes</div>
            {echosOpen
              ? <ChevronUp size={16} color={accent} />
              : <ChevronDown size={16} color={accent} />}
          </div>

          {echosOpen && (
            <div style={{ padding: "0 clamp(14px, 2.5vw, 20px) clamp(14px, 2.5vw, 20px)" }}>
              {[
                {
                  label: "The Egyptian Pyramid",
                  text: "The great pyramids embody symbolic art in its most monumental form. Their sheer mass and geometric perfection strive toward infinite mystery — but the spiritual content (death, resurrection, the journey of the soul) exceeds any shape that architecture can provide. Form and content are not yet reconciled; the pyramid points beyond itself, a sign gesturing toward what it cannot contain."
                },
                {
                  label: "Greek Sculpture and the Classical Ideal",
                  text: "In the Olympian gods as rendered by Phidias or Praxiteles, Hegel sees the classical ideal achieved: the individuated human body, perfected and idealized, becomes the adequate vehicle for divine spiritual content. The god is not symbolized by the human form — it IS the human form, raised to its ideal essence. Form and content are in perfect, serene unity."
                },
                {
                  label: "Christian Painting: Raphael and Leonardo",
                  text: "The Madonnas of Raphael and the Christ figures of Leonardo illustrate romantic art's achievement: the face and gesture become transparent to inner spiritual life — to love, grief, transcendence — in a way that no finite sensuous form can fully exhaust. The painting points inward, beyond itself. Its greatness lies in what it cannot quite show."
                },
                {
                  label: "Modern Art and the End of Art",
                  text: "Contemporary art's self-reflexivity — conceptual art, art about art, art that interrogates what art is — illustrates Hegel's 'end of art' thesis. When art becomes primarily about its own conditions and no longer carries a civilization's spiritual substance, it has entered the post-artistic mode he predicted: form without the weight of absolute content, freedom without sacred necessity."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 3 ? "clamp(12px, 2vw, 16px)" : 0,
                  paddingBottom: i < 3 ? "clamp(12px, 2vw, 16px)" : 0,
                  borderBottom: i < 3 ? "1px solid #1e1528" : "none"
                }}>
                  <div style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: accent, marginBottom: "6px" }}>{echo.label}</div>
                  <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#b0a0c0", margin: 0, lineHeight: 1.7 }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "clamp(24px, 4vw, 40px)", paddingBottom: "16px" }}>
          <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#3a2a45", letterSpacing: "0.2em" }}>
            HEGEL'S COMPLETE PHILOSOPHICAL SYSTEM · PART 10 OF 20
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Part 11: The Drama of Recognition ───
function RecognitionStructure() {
  const [sliderValue, setSliderValue] = useState(0);
  const [hoveredStage, setHoveredStage] = useState(null);
  const [expandedEchoes, setExpandedEchoes] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  const stages = [
    {
      id: "domination",
      label: "Master–Slave",
      range: [0, 0.28],
      color: "#c0392b",
      description: "The master forces recognition from the slave, but this recognition is worthless — it comes from someone the master has denied as a free equal. The victor gains an empty mirror.",
      gap: 0.72,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "one-way",
      fail: "Recognition without freedom is flattery, not acknowledgment."
    },
    {
      id: "stoicism",
      label: "Stoic Withdrawal",
      range: [0.28, 0.55],
      color: "#8e44ad",
      description: "The Stoic and Skeptic retreat inward, asserting independence from all external recognition. Freedom becomes purely interior — but a self-consciousness that turns away from others cannot confirm its own content.",
      gap: 0.6,
      leftAngle: -35,
      rightAngle: 35,
      arrows: "none",
      fail: "Negative freedom cannot generate positive selfhood."
    },
    {
      id: "ethical",
      label: "Ethical Life",
      range: [0.55, 0.78],
      color: "#0891B2",
      description: "In shared institutions — family, civil society, the state — recognition is embedded in social roles and laws. Partial mutuality emerges, though individual and universal remain in tension.",
      gap: 0.3,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "bidirectional-partial",
      fail: "Institutional recognition can become alienating when institutions lose their living spirit."
    },
    {
      id: "mutual",
      label: "Mutual Recognition",
      range: [0.78, 1.0],
      color: "#10b981",
      description: "Free beings acknowledge each other as free. The gap closes. Each self finds itself in the other — not by dominating, not by withdrawing, but through the reciprocal gift of acknowledgment that constitutes genuine freedom.",
      gap: 0.05,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "bidirectional-full",
      fail: null
    }
  ];

  const getCurrentStage = (val) => {
    return stages.find(s => val >= s.range[0] && val <= s.range[1]) || stages[3];
  };

  const currentStage = getCurrentStage(sliderValue);

  const interpolate = (val) => {
    const s = getCurrentStage(val);
    const progress = (val - s.range[0]) / (s.range[1] - s.range[0]);
    return { stage: s, progress };
  };

  const { stage, progress } = interpolate(sliderValue);

  const getGap = () => {
    const s = getCurrentStage(sliderValue);
    const idx = stages.indexOf(s);
    if (idx < stages.length - 1) {
      const next = stages[idx + 1];
      const p = (sliderValue - s.range[0]) / (s.range[1] - s.range[0]);
      return s.gap + (next.gap - s.gap) * p;
    }
    return s.gap;
  };

  const currentGap = getGap();

  const concepts = [
    { id: "anerkennung", label: "Anerkennung", sub: "Recognition", desc: "The fundamental act by which one consciousness acknowledges another as genuinely free and rational — and is itself acknowledged in return. Not mere approval, but ontological confirmation." },
    { id: "intersubjectivity", label: "Intersubjectivity", sub: "The Between", desc: "Selfhood does not precede social relation but emerges through it. 'I' am always already constituted through the gaze, language, and acknowledgment of others." },
    { id: "unhappy", label: "Unhappy Consciousness", sub: "The Divided Self", desc: "When recognition fails — or is projected onto an unreachable transcendent — consciousness experiences itself as irreconcilably split: finite here, infinite there, never whole." },
    { id: "social", label: "Reason as Social Achievement", sub: "Spirit as We", desc: "What Hegel calls Geist — spirit — is not a metaphysical substance but the living reality of human beings recognizing each other in shared institutions, language, and practice." }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let t = 0;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const stageColor = getCurrentStage(sliderValue).color;
      const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        return [r,g,b];
      };
      const [sr,sg,sb] = hex2rgb(stageColor);

      // Draw subtle wave lines
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y0 = h * 0.15 + i * (h * 0.18);
        const alpha = 0.04 + i * 0.015;
        ctx.strokeStyle = `rgba(${sr},${sg},${sb},${alpha})`;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = y0 + Math.sin((x / w) * Math.PI * 3 + t * 0.4 + i * 0.8) * (h * 0.04);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Particle field
      const particleCount = 18;
      for (let i = 0; i < particleCount; i++) {
        const px = (Math.sin(i * 2.3 + t * 0.15) * 0.4 + 0.5) * w;
        const py = (Math.cos(i * 1.7 + t * 0.1) * 0.4 + 0.5) * h;
        const radius = 1.5 + Math.sin(i + t * 0.3) * 1;
        const opa = 0.08 + Math.sin(i + t * 0.2) * 0.04;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sr},${sg},${sb},${opa})`;
        ctx.fill();
      }

      t += 0.02;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [sliderValue]);

  const renderSVGFigures = () => {
    const gap = currentGap;
    const leftX = 0.5 - gap / 2 - 0.12;
    const rightX = 0.5 + gap / 2 + 0.12;
    const figureY = 0.42;

    const s = getCurrentStage(sliderValue);
    const leftRotate = s.leftAngle;
    const rightRotate = s.rightAngle;

    const arrowType = s.arrows;
    const stageColor = s.color;

    const centerX = 0.5;

    return (
      <svg viewBox="0 0 800 400" width="100%" style={{ maxWidth: "min(90vw,860px)", display: "block", margin: "0 auto" }}>
        <defs>
          <radialGradient id="leftGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={stageColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stageColor} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={stageColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stageColor} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={stageColor} />
          </marker>
          <marker id="arrowLeft" markerWidth="8" markerHeight="8" refX="0" refY="3" orient="auto-start-reverse">
            <path d="M6,0 L0,3 L6,6 Z" fill={stageColor} />
          </marker>
        </defs>

        {/* Background ellipses for each figure */}
        <ellipse cx={leftX * 800} cy={figureY * 400} rx={60} ry={70} fill="url(#leftGlow)" />
        <ellipse cx={rightX * 800} cy={figureY * 400} rx={60} ry={70} fill="url(#rightGlow)" />

        {/* Left figure */}
        <g transform={`translate(${leftX * 800}, ${figureY * 400}) rotate(${leftRotate})`}>
          {/* Head */}
          <circle cx={0} cy={-80} r={22} fill="#1a2a35" stroke={stageColor} strokeWidth="2" filter="url(#glow)" />
          {/* Body */}
          <rect x={-14} y={-56} width={28} height={56} rx={6} fill="#1a2a35" stroke={stageColor} strokeWidth="1.5" />
          {/* Arms */}
          <line x1={-14} y1={-45} x2={-36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={14} y1={-45} x2={36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <line x1={-8} y1={0} x2={-14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={8} y1={0} x2={14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          {/* Face dot */}
          <circle cx={-6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <circle cx={6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          {/* Label */}
          <text x={0} y={65} textAnchor="middle" fill={stageColor} fontSize="13" fontFamily="Georgia, serif" opacity="0.9">Self</text>
        </g>

        {/* Right figure */}
        <g transform={`translate(${rightX * 800}, ${figureY * 400}) rotate(${rightRotate})`}>
          <circle cx={0} cy={-80} r={22} fill="#1a2a35" stroke={stageColor} strokeWidth="2" filter="url(#glow)" />
          <rect x={-14} y={-56} width={28} height={56} rx={6} fill="#1a2a35" stroke={stageColor} strokeWidth="1.5" />
          <line x1={-14} y1={-45} x2={-36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={14} y1={-45} x2={36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={-8} y1={0} x2={-14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={8} y1={0} x2={14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx={-6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <circle cx={6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <text x={0} y={65} textAnchor="middle" fill={stageColor} fontSize="13" fontFamily="Georgia, serif" opacity="0.9">Other</text>
        </g>

        {/* Gap label */}
        {gap > 0.1 && (
          <text x={400} y={figureY * 400 - 95} textAnchor="middle" fill="#888888" fontSize="11" fontFamily="Georgia, serif">
            — gap —
          </text>
        )}

        {/* Arrows based on mode */}
        {arrowType === "one-way" && (
          <>
            <line
              x1={rightX * 800 - 55}
              y1={figureY * 400 - 40}
              x2={leftX * 800 + 55}
              y2={figureY * 400 - 40}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowLeft)"
              opacity="0.9"
              strokeDasharray="4,3"
            />
            <text x={400} y={figureY * 400 - 20} textAnchor="middle" fill={stageColor} fontSize="11" fontFamily="Georgia, serif" opacity="0.7">coerced acknowledgment</text>
          </>
        )}

        {arrowType === "bidirectional-partial" && (
          <>
            <line
              x1={leftX * 800 + 55}
              y1={figureY * 400 - 50}
              x2={rightX * 800 - 55}
              y2={figureY * 400 - 50}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowRight)"
              opacity="0.75"
            />
            <line
              x1={rightX * 800 - 55}
              y1={figureY * 400 - 30}
              x2={leftX * 800 + 55}
              y2={figureY * 400 - 30}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowLeft)"
              opacity="0.75"
            />
            <text x={400} y={figureY * 400 - 10} textAnchor="middle" fill={stageColor} fontSize="11" fontFamily="Georgia, serif" opacity="0.7">partial mutuality</text>
          </>
        )}

        {arrowType === "bidirectional-full" && (
          <>
            {[...Array(3)].map((_, i) => (
              <line
                key={i}
                x1={leftX * 800 + 55}
                y1={figureY * 400 - 55 + i * 18}
                x2={rightX * 800 - 55}
                y2={figureY * 400 - 55 + i * 18}
                stroke={stageColor}
                strokeWidth={i === 1 ? 3 : 2}
                markerEnd="url(#arrowRight)"
                markerStart="url(#arrowLeft)"
                opacity={0.9 - i * 0.15}
                filter={i === 1 ? "url(#glow)" : undefined}
              />
            ))}
            <text x={400} y={figureY * 400 + 10} textAnchor="middle" fill={stageColor} fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.9">free recognition of the free</text>
          </>
        )}

        {arrowType === "none" && (
          <>
            <text x={400} y={figureY * 400 - 40} textAnchor="middle" fill={stageColor} fontSize="12" fontFamily="Georgia, serif" opacity="0.75" fontStyle="italic">— withdrawn —</text>
            <line x1={350} y1={figureY * 400 - 50} x2={400} y2={figureY * 400 - 55} stroke={stageColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            <line x1={450} y1={figureY * 400 - 50} x2={400} y2={figureY * 400 - 55} stroke={stageColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          </>
        )}

        {/* Stage markers on bottom axis */}
        {stages.map((s, i) => {
          const mx = (s.range[0] + s.range[1]) / 2;
          const isActive = currentStage.id === s.id;
          return (
            <g key={s.id}>
              <circle
                cx={80 + mx * 640}
                cy={370}
                r={isActive ? 7 : 4}
                fill={isActive ? s.color : "#333"}
                stroke={s.color}
                strokeWidth="1.5"
                opacity={isActive ? 1 : 0.5}
              />
              <text
                x={80 + mx * 640}
                y={390}
                textAnchor="middle"
                fill={isActive ? s.color : "#666"}
                fontSize="10"
                fontFamily="Georgia, serif"
                opacity={isActive ? 1 : 0.6}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Axis line */}
        <line x1={80} y1={370} x2={720} y2={370} stroke="#333" strokeWidth="1" />
      </svg>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #062e3f 0%, #050c14 50%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#e0e8ed",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0891B2",
            textTransform: "uppercase",
            marginBottom: "10px",
            opacity: 0.9
          }}>Part 11 of 20 — Phenomenology of Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "normal",
            margin: "0 0 10px 0",
            color: "#f0f8ff",
            letterSpacing: "-0.02em"
          }}>The Drama of Recognition</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#8ab8c8",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>Recognition is the fundamental intersubjective structure through which human beings achieve self-consciousness, freedom, and authentic selfhood.</p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(8, 20, 30, 0.85)",
          borderLeft: "3px solid #0891B2",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#0891B2",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontVariant: "small-caps"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            margin: 0,
            color: "#c8dde8",
            fontStyle: "italic"
          }}>
            The Absolute System and its culmination in philosophy reveal that truth is systematic and intersubjective — but what is the underlying human need that drives all these developments from individual consciousness through social institutions to absolute spirit? Philosophy has mapped the territory, yet the engine remains unnamed. What compels the self to leave its solitude and enter the dangerous, necessary world of other selves?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(6, 18, 28, 0.9)",
          borderRadius: "10px",
          border: "1px solid rgba(8,145,178,0.2)",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <h2 style={{
            fontSize: "clamp(15px, 2.2vw, 20px)",
            fontWeight: "normal",
            color: "#0891B2",
            margin: "0 0 8px 0",
            letterSpacing: "0.04em"
          }}>The Dialectic of Recognition</h2>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7a9aaa",
            margin: "0 0 20px 0",
            lineHeight: 1.6
          }}>
            Drag the slider to move through the stages. Watch how the figures relate — and fail to relate — at each moment of the dialectic.
          </p>

          {/* Canvas background + SVG overlay */}
          <div ref={containerRef} style={{
            position: "relative",
            width: "100%",
            height: "clamp(260px, 40vw, 420px)",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "20px",
            background: "rgba(3, 10, 18, 0.7)"
          }}>
            <canvas ref={canvasRef} style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }} />
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {renderSVGFigures()}
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#7a9aaa", letterSpacing: "0.05em" }}>Mode of Recognition</span>
              <span style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: currentStage.color,
                fontWeight: "bold",
                letterSpacing: "0.05em",
                transition: "color 0.4s ease"
              }}>{currentStage.label}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(sliderValue * 100)}
              onChange={e => setSliderValue(e.target.value / 100)}
              style={{
                width: "100%",
                appearance: "none",
                height: "6px",
                borderRadius: "3px",
                background: `linear-gradient(to right, ${currentStage.color} ${sliderValue * 100}%, #1a2a35 ${sliderValue * 100}%)`,
                outline: "none",
                cursor: "pointer"
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px"
            }}>
              {stages.map(s => (
                <span key={s.id} style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  color: currentStage.id === s.id ? s.color : "#445",
                  transition: "color 0.3s",
                  textAlign: "center",
                  flex: 1
                }}>{s.label.split("–")[0]}</span>
              ))}
            </div>
          </div>

          {/* Stage description card */}
          <div style={{
            background: "rgba(8, 145, 178, 0.07)",
            borderLeft: `3px solid ${currentStage.color}`,
            borderRadius: "6px",
            padding: "clamp(14px, 2.5vw, 22px)",
            transition: "border-color 0.4s ease",
            marginBottom: "20px"
          }}>
            <div style={{
              fontSize: "clamp(14px, 1.9vw, 17px)",
              color: currentStage.color,
              marginBottom: "10px",
              fontWeight: "normal",
              transition: "color 0.4s"
            }}>{currentStage.label}</div>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              lineHeight: 1.75,
              color: "#c0d4de",
              margin: "0 0 10px 0"
            }}>{currentStage.description}</p>
            {currentStage.fail && (
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#e8b86a",
                borderTop: "1px solid rgba(232,184,106,0.2)",
                paddingTop: "10px",
                fontStyle: "italic"
              }}>
                Why it fails: {currentStage.fail}
              </div>
            )}
            {!currentStage.fail && (
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#10b981",
                borderTop: "1px solid rgba(16,185,129,0.2)",
                paddingTop: "10px",
                fontStyle: "italic"
              }}>
                The telos of the dialectic — genuine selfhood achieved through the other, not despite them.
              </div>
            )}
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #0891B233",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#0891B2", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#0891B2" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#0891B2" : "#0891B255"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #0891B244", borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#0891B2", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(8, 14, 24, 0.88)",
          borderLeft: "3px solid #0e6a80",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#0e6a80",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontVariant: "small-caps"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            margin: "0 0 14px 0",
            color: "#b8ccd8"
          }}>
            The drive for recognition, once named, reveals a new wound. If acknowledgment from other free beings is what self-consciousness requires, what happens when no such acknowledgment appears — or when the self, despairing of finite recognition, projects its infinite longing onto a transcendent beyond? The consciousness that cannot find itself in any earthly mirror turns toward heaven, but this divine infinity only deepens the split: the finite self here, the infinite there, a gap that cannot be crossed by any act of will. This is the <em>unhappy consciousness</em> — self-consciousness in a condition of irreconcilable division, worshipping what it can never become, mourning what it has cast away.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7a96a6",
            fontStyle: "italic",
            borderTop: "1px solid rgba(14,106,128,0.3)",
            paddingTop: "12px",
            margin: 0,
            lineHeight: 1.7
          }}>
            This pressure forces the next development: understanding how alienated consciousness arises from failed recognition, and tracing the long path through medieval devotion, Stoic endurance, and skeptical negation toward the moment when the unhappy consciousness finally discovers the social world in which genuine reconciliation becomes possible.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(8, 14, 24, 0.75)",
          borderRadius: "6px",
          border: "1px solid rgba(8,145,178,0.15)",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setExpandedEchoes(!expandedEchoes)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px)",
              cursor: "pointer",
              color: "#0891B2",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontVariant: "small-caps"
            }}>Real-World Echoes</span>
            {expandedEchoes
              ? <ChevronUp size={18} color="#0891B2" />
              : <ChevronDown size={18} color="#0891B2" />
            }
          </button>

          {expandedEchoes && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              borderTop: "1px solid rgba(8,145,178,0.12)"
            }}>
              {[
                {
                  title: "Rights and Dignity",
                  text: "When someone declares 'I am a rational person, worthy of respect,' the declaration alone is insufficient. It requires acknowledgment from other rational agents — legal recognition, institutional forms, social practices. The civil rights movement, feminist struggles, LGBTQ+ recognition movements: all are, at the philosophical level, battles for Anerkennung."
                },
                {
                  title: "Stoic Philosophers under Roman Slavery",
                  text: "Epictetus and Marcus Aurelius represent the Stoic response to failed recognition: retreat inward. 'My freedom is in my will; no master can touch it.' This achieves a real negative freedom, an independence from external fortune — but it abandons the claim to be recognized as free by others, producing a self that is, in Hegel's terms, abstract and contentless."
                },
                {
                  title: "Medieval Christian Devotion",
                  text: "The monk fasting, the saint performing mortification of the flesh, the believer projecting all value onto an infinite God: these practices represent the unhappy consciousness in historical form — the attempt to achieve recognition from an infinite transcendent source when finite human recognition has failed or been refused. The divine becomes the only mirror that matters."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginTop: "18px",
                  paddingLeft: "clamp(12px, 2vw, 18px)",
                  borderLeft: "2px solid rgba(8,145,178,0.3)"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#0891B2",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab4c0",
                    lineHeight: 1.7,
                    margin: 0
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 12: The Kantian Revolution and Its Limits ───
function KantCritique() {
  const [activeWall, setActiveWall] = useState(null);
  const [activeMerge, setActiveMerge] = useState(null);
  const [hoveredWall, setHoveredWall] = useState(false);
  const [hoveredMerge, setHoveredMerge] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [activeConceptIdx, setActiveConceptIdx] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  const concepts = [
    { label: "Copernican Revolution", short: "Objects conform to cognition", detail: "Kant's decisive insight: the mind is not a passive mirror of reality but actively constitutes experience through its own forms. Yet this raises the question: what about the reality behind those forms?" },
    { label: "Phenomena / Noumena", short: "The knowable vs. the unknowable", detail: "Phenomena are appearances structured by our cognitive forms. Noumena — things-in-themselves — lie forever beyond reach. But Hegel asks: how can we speak meaningfully of what is, by definition, beyond all speech?" },
    { label: "Categories of Understanding", short: "The mind's constitutive forms", detail: "Kant's twelve categories (causality, substance, etc.) make experience possible. Hegel agrees but insists they are not merely subjective: they are the logical skeleton of reality itself." },
    { label: "Categorical Imperative", short: "Duty without content", detail: "Act only on maxims you can universalize. Formally powerful, but silent on which duties to pursue or how to order social life. The empty formalism of 'do your duty' cannot generate a living ethical world." },
    { label: "Dualism of Form/Content", short: "The split Hegel must heal", detail: "Kant separates the form mind imposes from the content given from outside. For Hegel, this separation is itself a product of thought — which means thought can overcome it from within." },
    { label: "Speculative Idealism", short: "Hegel's solution", detail: "Reality is not alien to thought; it is thought's own self-development. The categories are not our subjective impositions but the objective structure of being itself — and so genuine systematic knowledge is possible." },
  ];

  const keyConcepts = [
    { id: "copernican_revolution", label: "Copernican Revolution in Philosophy", desc: "Kant's decisive insight is that experience is possible only because the mind actively constitutes it through its own forms — objects must conform to our cognition, not our cognition to objects. This inverts the naive view that knowledge is passive reception. But it raises the question Hegel presses: if the mind's forms structure everything we can know, what is the status of the thing-in-itself that supposedly exists behind those forms?" },
    { id: "phenomena_noumena", label: "Phenomena vs. Things-in-Themselves", desc: "Kant splits reality into phenomena (appearances structured by our cognitive forms, which we can know) and things-in-themselves (the reality behind appearances, which forever lies beyond knowledge). Hegel's objection: we cannot coherently speak of what is, by definition, beyond all speech. The thing-in-itself is a self-contradictory notion — it is posited as causing our sensations, but causality is itself a category Kant says applies only to phenomena." },
    { id: "categories_of_understanding", label: "Categories of Understanding", desc: "Kant's twelve categories (causality, substance, necessity, etc.) are the a priori forms that make experience possible — without them, sensory data would be a formless manifold. Hegel agrees that categories are not derived from experience. But he insists they are not merely our subjective cognitive equipment: they are the objective logical structure of reality itself, which is why genuine scientific knowledge of the world is possible." },
    { id: "categorical_imperative", label: "Kant's Moral Philosophy / Categorical Imperative", desc: "Act only according to maxims you could universalize without contradiction — this is Kant's categorical imperative, the supreme principle of morality derived from pure practical reason alone, independent of all inclination or consequence. Hegel finds this formally powerful but materially empty: the universalizability test cannot generate specific obligations or order social life. The 'ought' floats free of any determinate ethical content." },
    { id: "dualism_form_content", label: "Dualism of Form and Content", desc: "Kant's entire philosophy rests on a strict separation between form (supplied by the mind: the pure intuitions of space and time, the categories of understanding) and content (given from outside through sensory affection). For Hegel, this dualism is itself a product of thought — thought has drawn this distinction within itself. This means thought is capable of overcoming the dualism from within, which is exactly what speculative idealism proposes." },
    { id: "speculative_idealism", label: "Speculative Idealism", desc: "Hegel's speculative idealism dissolves Kant's dualism by eliminating the thing-in-itself entirely: reality is not alien to thought but is thought's own self-development. The categories of the Logic are not our subjective impositions on a resistant given but the objective structure of being itself — the same structure that unfolds in nature and returns to itself in Spirit. Genuine, systematic knowledge of reality is therefore possible." },
  ];

  const wallObjDetails = [
    { id: "thing-itself", label: "The Thing-in-Itself", text: "Hegel's objection: Kant posits the thing-in-itself as causing our sensory affections while simultaneously declaring it unknowable. But causality is itself a category of understanding — one Kant says applies only to phenomena. To use 'cause' to describe what lies beyond phenomena is a performative contradiction that collapses on its own terms." },
    { id: "formal-ethics", label: "Formal Ethics", text: "Kant's categorical imperative requires universalizability but cannot tell us what to universalize. Contradictory maxims can each pass the universalizability test. The moral law is an empty formalism — the 'ought' floats free of any determinate content, leaving ethical life ungrounded." },
    { id: "subjective-category", label: "Subjective Categories", text: "If categories merely belong to the subjective mind and impose structure on an alien content, then science describes only our cognitive habits, not reality. Yet Kant simultaneously wants Newtonian physics to have objective validity. This tension between subjective form and objective claim is irresolvable within Kant's own framework." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const setSize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight || 220;
    };
    setSize();

    const observer = new ResizeObserver(setSize);
    observer.observe(parent);

    const ctx = canvas.getContext("2d");
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;

      // Draw two spiraling currents merging
      for (let stream = 0; stream < 2; stream++) {
        const sign = stream === 0 ? 1 : -1;
        ctx.beginPath();
        for (let i = 0; i < 300; i++) {
          const frac = i / 299;
          const angle = frac * Math.PI * 6 + sign * Math.PI / 2 + t * 0.5;
          const radius = maxR * frac * 0.5;
          const spiralX = cx + radius * Math.cos(angle);
          const spiralY = cy + radius * Math.sin(angle) * 0.55;
          if (i === 0) ctx.moveTo(spiralX, spiralY);
          else ctx.lineTo(spiralX, spiralY);
        }
        const grad = ctx.createLinearGradient(cx - maxR * 0.5, 0, cx + maxR * 0.5, 0);
        if (stream === 0) {
          grad.addColorStop(0, "#1e3a5f44");
          grad.addColorStop(0.5, "#3b82f6aa");
          grad.addColorStop(1, "#7c3aed88");
        } else {
          grad.addColorStop(0, "#44337a44");
          grad.addColorStop(0.5, "#9333eaaa");
          grad.addColorStop(1, "#475569aa");
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Pulsing center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.18);
      glow.addColorStop(0, "#475569cc");
      glow.addColorStop(0.4, "#47556944");
      glow.addColorStop(1, "#00000000");
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.18 + Math.sin(t * 2) * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Floating particles along the streams
      for (let p = 0; p < 12; p++) {
        const pFrac = ((p / 12) + t * 0.03) % 1;
        const sign = p % 2 === 0 ? 1 : -1;
        const angle = pFrac * Math.PI * 6 + sign * Math.PI / 2 + t * 0.5;
        const radius = maxR * pFrac * 0.5;
        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle) * 0.55;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? "#3b82f6cc" : "#9333eacc";
        ctx.fill();
      }

      t += 0.018;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  const accent = "#475569";
  const darkBg = "#0d1117";
  const cardBg = "#111827ee";
  const borderColor = "#1e293b";

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #1a2535 0%, #0a0a0f 80%)",
      fontFamily: "Georgia, serif",
      color: "#cbd5e1",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "8px",
          }}>Part 12 of 20 — Hegel's Complete System</div>
          <h1 style={{
            fontSize: "clamp(20px, 3.5vw, 34px)",
            color: "#f1f5f9",
            margin: "0 0 8px 0",
            lineHeight: 1.25,
            fontWeight: "normal",
          }}>The Kantian Revolution and Its Limits</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#94a3b8",
            margin: 0,
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>Hegel sees himself as completing Kant's Copernican revolution by eliminating the dualisms that prevent Kant from achieving genuine systematic knowledge.</p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderLeft: `4px solid ${accent}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            margin: 0,
            color: "#e2e8f0",
          }}>
            The drive for recognition requires intersubjective institutions, but the philosophical framework for understanding how thought relates to reality needs to be clarified — Kant attempted this, but did he succeed? At the cusp of modernity, we need to know whether the categories through which we grasp the world are our own subjective impositions or whether they genuinely disclose what is real. Without an answer, every claim to knowledge — scientific, moral, political — trembles on uncertain ground.
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <h2 style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#f1f5f9",
            margin: "0 0 20px 0",
            fontWeight: "normal",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}>Two Architectures of Knowledge</h2>

          {/* Split Diagram: Kant vs Hegel */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}>
            {/* Kant's System */}
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#94a3b8",
                textAlign: "center",
                marginBottom: "8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>Kant's System</div>
              <svg viewBox="0 0 300 220" width="100%" style={{ display: "block", maxWidth: "100%" }}>
                {/* Background rooms */}
                <rect x="4" y="20" width="128" height="176" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <rect x="168" y="20" width="128" height="176" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />

                {/* Room labels */}
                <text x="68" y="50" textAnchor="middle" fill="#60a5fa" fontSize="11" fontFamily="Georgia, serif">Phenomena</text>
                <text x="68" y="64" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">(Knowable)</text>
                <text x="232" y="50" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Georgia, serif">Noumena</text>
                <text x="232" y="64" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="Georgia, serif">(Unknowable)</text>

                {/* Icons in rooms */}
                <circle cx="68" cy="110" r="22" fill="#1d4ed822" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="68" y="116" textAnchor="middle" fill="#60a5fa" fontSize="16">⚙</text>

                <circle cx="232" cy="110" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="232" y="116" textAnchor="middle" fill="#334155" fontSize="16">?</text>

                {/* The Wall */}
                <rect x="136" y="14" width="28" height="194" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="150" y="115" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif" transform="rotate(-90 150 115)">WALL</text>

                {/* Clickable wall zones */}
                {wallObjDetails.map((w, i) => {
                  const yPos = 35 + i * 60;
                  const isActive = activeWall === w.id;
                  const isHov = hoveredWall === w.id;
                  return (
                    <g key={w.id}
                      onClick={() => setActiveWall(isActive ? null : w.id)}
                      onMouseEnter={() => setHoveredWall(w.id)}
                      onMouseLeave={() => setHoveredWall(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle cx="150" cy={yPos} r={isActive || isHov ? 9 : 7}
                        fill={isActive ? "#7c3aed" : isHov ? "#475569" : "#1e293b"}
                        stroke={isActive ? "#a78bfa" : "#475569"} strokeWidth="1.5" />
                      <text x="150" y={yPos + 4} textAnchor="middle" fill="#f1f5f9" fontSize="8">✕</text>
                    </g>
                  );
                })}

                {/* Arrow trying to cross */}
                <path d="M 100 155 Q 130 145 140 155" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
                <polygon points="140,151 148,155 140,159" fill="#f59e0b" opacity="0.7" />
                <text x="80" y="178" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="Georgia, serif">Can we cross?</text>

                <text x="150" y="215" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="Georgia, serif">Click the ✕ marks on the wall</text>
              </svg>
            </div>

            {/* Hegel's System */}
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#94a3b8",
                textAlign: "center",
                marginBottom: "8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>Hegel's System</div>
              <div style={{ position: "relative", width: "100%", paddingBottom: "73%" }}>
                <canvas ref={canvasRef} style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  background: "#0d1117",
                  border: "1px solid #1e293b",
                }} />
                {/* Overlay labels */}
                <div
                  onClick={() => setActiveMerge(activeMerge === "thought" ? null : "thought")}
                  onMouseEnter={() => setHoveredMerge("thought")}
                  onMouseLeave={() => setHoveredMerge(null)}
                  style={{
                    position: "absolute", top: "12%", left: "8%",
                    background: hoveredMerge === "thought" || activeMerge === "thought" ? "#1d4ed866" : "#0d111788",
                    border: `1px solid ${hoveredMerge === "thought" || activeMerge === "thought" ? "#3b82f6" : "#1e293b"}`,
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    color: "#93c5fd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>Thought</div>
                <div
                  onClick={() => setActiveMerge(activeMerge === "being" ? null : "being")}
                  onMouseEnter={() => setHoveredMerge("being")}
                  onMouseLeave={() => setHoveredMerge(null)}
                  style={{
                    position: "absolute", bottom: "12%", right: "8%",
                    background: hoveredMerge === "being" || activeMerge === "being" ? "#44337a66" : "#0d111788",
                    border: `1px solid ${hoveredMerge === "being" || activeMerge === "being" ? "#9333ea" : "#1e293b"}`,
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    color: "#c4b5fd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>Being</div>
                <div style={{
                  position: "absolute", bottom: "4%", left: "50%", transform: "translateX(-50%)",
                  fontSize: "clamp(8px, 1.2vw, 10px)",
                  color: "#334155",
                  whiteSpace: "nowrap",
                }}>Click labels to explore</div>
              </div>
            </div>
          </div>

          {/* Wall objection panel */}
          {activeWall && (() => {
            const w = wallObjDetails.find(x => x.id === activeWall);
            return (
              <div style={{
                background: "#1a0a2e",
                border: "1px solid #7c3aed",
                borderRadius: "8px",
                padding: "16px 20px",
                marginBottom: "16px",
                animation: "none",
              }}>
                <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#a78bfa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Hegel's Objection: {w.label}</div>
                <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>{w.text}</p>
              </div>
            );
          })()}

          {/* Merge panel */}
          {activeMerge && (
            <div style={{
              background: "#0f0a1e",
              border: "1px solid #3b82f6",
              borderRadius: "8px",
              padding: "16px 20px",
              marginBottom: "16px",
            }}>
              {activeMerge === "thought" && (
                <>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#93c5fd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Thought — the active current</div>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>For Hegel, thought is not a passive receptacle but the self-moving activity by which reality becomes determinate and knowable. The categories of logic are not our subjective impositions — they are the forms through which being articulates itself. Thought thinking itself just is being becoming self-aware.</p>
                </>
              )}
              {activeMerge === "being" && (
                <>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#c4b5fd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Being — the other current</div>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>Being, stripped of all determination, is indistinguishable from pure nothing — and this very indeterminacy sets thought in motion. Rather than a brute alien 'given' that imposes itself from outside, being is the concrete totality of all determinate relations that thought has made explicit. The wall between knower and known dissolves.</p>
                </>
              )}
            </div>
          )}

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            borderTop: "1px solid #1e293b",
            paddingTop: "20px",
          }}>
            <p style={{
              margin: "0 0 12px 0",
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}>
              Kant's Copernican revolution correctly identifies that objects must conform to our cognition rather than the other way around — grounding the possibility of scientific knowledge. But in doing so, Kant splits reality into phenomena (what we can know) and things-in-themselves (what forever escapes us), and this division is self-undermining. The thing-in-itself supposedly affects our sensory apparatus — but "affection" is a causal relation, and causality is precisely one of Kant's categories that applies only to phenomena. Kant has used a concept he forbids to describe what lies beyond the concept's legitimate reach.
            </p>
            <p style={{
              margin: 0,
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}>
              Hegel's resolution is radical: eliminate the thing-in-itself entirely. If the categories are not mere subjective impositions but the objective logical structure of reality, thought and being are not two sides of a wall but two currents of a single self-developing process. Speculative idealism does not deny an external world — it denies that anything could be genuinely external to the rational structure that thought and being share.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. THE DIFFICULTY PANEL */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderLeft: "4px solid #334155",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#334155",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            margin: "0 0 14px 0",
            color: "#e2e8f0",
          }}>
            If reality is thoroughly conceptual and the dualisms between subject and object, duty and inclination, are not ultimate but produced by a rational whole that can in principle overcome them — then how does the most alienated and divided form of consciousness arise within this system? How does a consciousness that experiences irreconcilable inner division, that finds itself split against itself with no hope of reconciliation, emerge within what Hegel insists is ultimately rational? The very completeness of the speculative solution raises the sharpest possible question about suffering, estrangement, and what consciousness looks like when rational unity seems least available.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 14px)",
            lineHeight: 1.7,
            margin: 0,
            color: "#475569",
            fontStyle: "italic",
          }}>
            This pressure forces the next development: the anatomy of unhappy consciousness — the structure of a mind at war with itself — and how even that extremity is a determinate stage within Spirit's self-recovery.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#94a3b8",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: accent,
              fontWeight: "bold",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={18} color={accent} />
              : <ChevronDown size={18} color={accent} />}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)",
              borderTop: `1px solid ${borderColor}`,
              paddingTop: "20px",
            }}>
              {[
                {
                  title: "The Empty Categorical Imperative",
                  body: "Kant's categorical imperative — act only on universalizable maxims — is formally powerful but silent on content. It cannot tell us whether to prioritize individual freedom or communal solidarity, whether markets or redistribution. Contemporary policy debates where abstract principles generate contradictory specific duties are a living demonstration of what Hegel diagnosed: the gap between formal universality and determinate ethical life."
                },
                {
                  title: "Newtonian Physics and Einstein",
                  body: "Kant took Newtonian mechanics as a fixed, timeless framework — the very form of possible experience. Einstein's relativity revealed that 'absolute space' and 'simultaneous events' are not given features of reality but conceptual constructions that serve certain purposes and break down under others. The categories we use to frame experience are themselves historically produced and revisable — vindicating Hegel's insistence on the conceptual constitution of what we call nature."
                },
                {
                  title: "The Unknowable Thing-in-Itself in Modern Epistemology",
                  body: "Whenever a philosophical or scientific position posits a 'true reality' that is, by definition, beyond all possible evidence or test, it replicates Kant's performative contradiction. String theory's landscape of unobservable universes, or the claim that consciousness is 'really' just brain states we can never directly access — both deploy a concept of the unknowable while making substantive claims about it, precisely the move Hegel identifies as incoherent."
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 2 ? "20px" : 0,
                  paddingBottom: i < 2 ? "20px" : 0,
                  borderBottom: i < 2 ? `1px solid ${borderColor}` : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#60a5fa",
                    marginBottom: "8px",
                    fontStyle: "italic",
                  }}>{echo.title}</div>
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    lineHeight: 1.75,
                    color: "#94a3b8",
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: "12px" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#1e293b", letterSpacing: "0.1em" }}>
            Hegel's Complete System · Part 12 of 20
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Part 13: The Agony of Division ───
function UnhappyConsciousness() {
  const [asceticLevel, setAsceticLevel] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [resolveProgress, setResolveProgress] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const resolveAnimRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  const concepts = [
    { id: "unhappy", label: "Unhappy Consciousness", desc: "The form of awareness split between what it is and what it longs to be — finite existence gazing upward at an infinite it can never grasp." },
    { id: "division", label: "Finite vs. Infinite", desc: "Consciousness experiences itself as base, changing, mortal — while projecting all perfection onto an unchanging, eternal, unreachable beyond." },
    { id: "asceticism", label: "Self-Denial & Asceticism", desc: "Every renunciation of finite pleasure is meant to close the gap — yet each act of self-denial reinforces the very split it seeks to heal." },
    { id: "alienation", label: "Religious Alienation", desc: "The divine becomes wholly other: the more magnificent the transcendent, the more worthless finite existence appears by comparison." },
    { id: "heart", label: "The Devoted Heart", desc: "Feeling replaces knowledge; the yearning itself becomes proof of connection — yet the beloved infinite remains perpetually absent." },
    { id: "mediated", label: "Mediated Immediacy", desc: "The resolution arrives not by escaping finitude but by discovering that infinity is always already present within finite forms." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.offsetWidth;
      canvas.height = Math.min(container.offsetWidth * 0.75, 480);
    });
    resizeObserver.observe(container);
    canvas.width = container.offsetWidth;
    canvas.height = Math.min(container.offsetWidth * 0.75, 480);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.001,
          vy: (Math.random() - 0.5) * 0.001,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() > 0.5 ? "finite" : "infinite",
        });
      }
    };
    initParticles();

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
      bg.addColorStop(0, "#1a0a3a");
      bg.addColorStop(1, "#04020f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const baseFiniteY = H * 0.82;
      const baseInfiniteY = H * 0.12;
      const silhouetteY = H * 0.47;

      const stretchFactor = resolved ? 0 : asceticLevel / 100;
      const rp = resolved ? resolveProgress : 0;

      // Compute positions with stretch
      const finiteY = resolved
        ? silhouetteY * (1 - rp) + baseFiniteY * rp + (silhouetteY - (silhouetteY * (1 - rp) + baseFiniteY * rp)) * rp
        : baseFiniteY + stretchFactor * H * 0.03;

      const infiniteY = resolved
        ? silhouetteY * (1 - rp) + baseInfiniteY * rp - (((silhouetteY * (1 - rp) + baseInfiniteY * rp)) - silhouetteY) * rp
        : baseInfiniteY - stretchFactor * H * 0.08;

      const finiteActualY = resolved
        ? baseFiniteY + (silhouetteY - baseFiniteY) * rp
        : baseFiniteY + stretchFactor * H * 0.03;

      const infiniteActualY = resolved
        ? baseInfiniteY + (silhouetteY - baseInfiniteY) * rp
        : baseInfiniteY - stretchFactor * H * 0.08;

      const finiteR = resolved ? 28 * (1 - rp * 0.5) : 28;
      const infiniteR = resolved ? 36 * (1 - rp * 0.5) : 36 - stretchFactor * 6;
      const mergedR = resolved ? 32 * rp : 0;

      // Draw tension line
      if (!resolved || rp < 0.8) {
        const lineAlpha = resolved ? 1 - rp : 0.4 + stretchFactor * 0.3;
        ctx.save();
        ctx.globalAlpha = lineAlpha;
        const grad = ctx.createLinearGradient(cx, infiniteActualY, cx, finiteActualY);
        grad.addColorStop(0, "#e8d5ff");
        grad.addColorStop(0.5, "#7C3AED");
        grad.addColorStop(1, "#4a4a6a");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + stretchFactor * 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, infiniteActualY + infiniteR);
        ctx.lineTo(cx, finiteActualY - finiteR);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Finite orb
      if (!resolved || rp < 0.95) {
        const orbAlpha = resolved ? 1 - rp : 1;
        ctx.save();
        ctx.globalAlpha = orbAlpha;
        const finiteGrad = ctx.createRadialGradient(cx - 4, finiteActualY - 4, 2, cx, finiteActualY, finiteR);
        finiteGrad.addColorStop(0, "#6b6b8a");
        finiteGrad.addColorStop(0.6, "#3a3a5c");
        finiteGrad.addColorStop(1, "#1a1a2e");
        ctx.fillStyle = finiteGrad;
        ctx.beginPath();
        ctx.arc(cx, finiteActualY, finiteR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#555577";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Finite label
        ctx.fillStyle = "#aaaacc";
        ctx.font = `${Math.max(9, W * 0.022)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Finite Existence", cx, finiteActualY + finiteR + 16);
        ctx.font = `${Math.max(7, W * 0.016)}px Georgia, serif`;
        ctx.fillStyle = "#7777aa";
        ctx.fillText("body · desire · mortality", cx, finiteActualY + finiteR + 30);
        ctx.restore();
      }

      // Infinite orb
      if (!resolved || rp < 0.95) {
        const orbAlpha = resolved ? 1 - rp : 1;
        ctx.save();
        ctx.globalAlpha = orbAlpha;
        const pulse = Math.sin(timeRef.current * 1.5) * 0.15 + 0.85;
        const glow = ctx.createRadialGradient(cx, infiniteActualY, 0, cx, infiniteActualY, infiniteR * 2.5);
        glow.addColorStop(0, "#ffffff22");
        glow.addColorStop(0.4, "#c4a0ff18");
        glow.addColorStop(1, "#00000000");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, infiniteActualY, infiniteR * 2.5, 0, Math.PI * 2);
        ctx.fill();

        const infGrad = ctx.createRadialGradient(cx - 6, infiniteActualY - 6, 2, cx, infiniteActualY, infiniteR);
        infGrad.addColorStop(0, "#ffffff");
        infGrad.addColorStop(0.3, "#e8d5ff");
        infGrad.addColorStop(0.7, "#9f70ff");
        infGrad.addColorStop(1, "#4a1a8a");
        ctx.fillStyle = infGrad;
        ctx.globalAlpha = orbAlpha * pulse;
        ctx.beginPath();
        ctx.arc(cx, infiniteActualY, infiniteR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c4a0ff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.globalAlpha = orbAlpha;
        ctx.fillStyle = "#ddd0ff";
        ctx.font = `${Math.max(9, W * 0.022)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Infinite Ideal", cx, infiniteActualY - infiniteR - 18);
        ctx.font = `${Math.max(7, W * 0.016)}px Georgia, serif`;
        ctx.fillStyle = "#b09edd";
        ctx.fillText("God · perfect love · utopia", cx, infiniteActualY - infiniteR - 6);
        ctx.restore();
      }

      // Merged orb
      if (resolved && rp > 0.3) {
        const mergeAlpha = Math.min(1, (rp - 0.3) / 0.7);
        ctx.save();
        ctx.globalAlpha = mergeAlpha;
        const pulse2 = Math.sin(timeRef.current * 2) * 0.1 + 0.9;
        const bigR = 44 * pulse2;

        const glow2 = ctx.createRadialGradient(cx, silhouetteY - 10, 0, cx, silhouetteY - 10, bigR * 2.2);
        glow2.addColorStop(0, "#ffffff33");
        glow2.addColorStop(0.5, "#9f70ff22");
        glow2.addColorStop(1, "#00000000");
        ctx.fillStyle = glow2;
        ctx.beginPath();
        ctx.arc(cx, silhouetteY - 10, bigR * 2.2, 0, Math.PI * 2);
        ctx.fill();

        const mergeGrad = ctx.createRadialGradient(cx - 8, silhouetteY - 18, 4, cx, silhouetteY - 10, bigR);
        mergeGrad.addColorStop(0, "#ffffff");
        mergeGrad.addColorStop(0.25, "#e8d5ff");
        mergeGrad.addColorStop(0.55, "#7C3AED");
        mergeGrad.addColorStop(0.8, "#3a3a5c");
        mergeGrad.addColorStop(1, "#1a0a3a");
        ctx.fillStyle = mergeGrad;
        ctx.beginPath();
        ctx.arc(cx, silhouetteY - 10, bigR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c4a0ff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#f0e8ff";
        ctx.font = `bold ${Math.max(10, W * 0.025)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Infinite within Finite", cx, silhouetteY - 10 + bigR + 20);
        ctx.restore();
      }

      // Silhouette
      const silAlpha = resolved ? 0.3 + rp * 0.4 : 0.85;
      const stretchY = resolved ? 0 : stretchFactor * H * 0.035;
      ctx.save();
      ctx.globalAlpha = silAlpha;

      const headY = silhouetteY - 32 - stretchY;
      const headR = 14;
      const bodyTop = headY + headR;
      const bodyBot = silhouetteY + 32 + stretchY;
      const bodyW = 20;

      // Head
      const silGrad = ctx.createLinearGradient(cx - bodyW, headY - headR, cx + bodyW, bodyBot);
      silGrad.addColorStop(0, resolved && rp > 0.5 ? "#7C3AED" : "#2a2a44");
      silGrad.addColorStop(1, resolved && rp > 0.5 ? "#4a1a8a" : "#111128");
      ctx.fillStyle = silGrad;

      ctx.beginPath();
      ctx.arc(cx, headY, headR, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(cx - bodyW * 0.6, bodyTop + 4);
      ctx.bezierCurveTo(cx - bodyW, bodyTop + 12, cx - bodyW * 1.2, silhouetteY, cx - bodyW * 0.8, bodyBot);
      ctx.lineTo(cx + bodyW * 0.8, bodyBot);
      ctx.bezierCurveTo(cx + bodyW * 1.2, silhouetteY, cx + bodyW, bodyTop + 12, cx + bodyW * 0.6, bodyTop + 4);
      ctx.closePath();
      ctx.fill();

      // Arms reaching
      if (!resolved || rp < 0.6) {
        const armAlpha2 = resolved ? 1 - rp : 1;
        ctx.globalAlpha = silAlpha * armAlpha2;
        const armStretch = stretchFactor * 14;
        // Left arm down
        ctx.beginPath();
        ctx.moveTo(cx - bodyW * 0.6, bodyTop + 20);
        ctx.quadraticCurveTo(cx - bodyW * 2.2 - armStretch * 0.5, silhouetteY + 20 + armStretch, cx - bodyW * 1.5 - armStretch * 0.3, bodyBot + 5 + armStretch * 0.4);
        ctx.lineWidth = 6;
        ctx.strokeStyle = silGrad;
        ctx.stroke();
        // Right arm up
        ctx.beginPath();
        ctx.moveTo(cx + bodyW * 0.6, bodyTop + 20);
        ctx.quadraticCurveTo(cx + bodyW * 2.2 + armStretch * 0.5, silhouetteY - 20 - armStretch, cx + bodyW * 1.5 + armStretch * 0.3, headY - armStretch * 0.6);
        ctx.stroke();
        ctx.globalAlpha = silAlpha;
      }

      ctx.restore();

      // Floating particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * W;
        const py = p.y * H;
        ctx.save();
        ctx.globalAlpha = p.opacity * (resolved ? 0.3 : 0.7);
        ctx.fillStyle = p.hue === "infinite" ? "#9f70ff" : "#555577";
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Ascetic label
      if (!resolved && stretchFactor > 0.1) {
        ctx.save();
        ctx.globalAlpha = stretchFactor;
        ctx.fillStyle = "#cc6666";
        ctx.font = `italic ${Math.max(8, W * 0.018)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("The harder consciousness strives upward — the further the ideal recedes", cx, H * 0.5 + 6);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [asceticLevel, resolved, resolveProgress]);

  const handleResolve = () => {
    if (animating) return;
    if (resolved) {
      setResolved(false);
      setResolveProgress(0);
      setAsceticLevel(0);
      return;
    }
    setAnimating(true);
    let progress = 0;
    const animate = () => {
      progress += 0.018;
      setResolveProgress(Math.min(1, progress));
      if (progress < 1) {
        resolveAnimRef.current = requestAnimationFrame(animate);
      } else {
        setResolved(true);
        setAnimating(false);
      }
    };
    resolveAnimRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (resolved || animating) return;
    setResolveProgress(0);
  }, [resolved, animating]);

  const [conceptPanelOpen, setConceptPanelOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #2d0a5e 0%, #0a0410 60%, #04020f 100%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#d4c8f0",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vw, 28px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", paddingBottom: "8px" }}>
          <div style={{
            fontSize: "clamp(10px, 1.6vw, 12px)",
            letterSpacing: "0.2em",
            color: "#7C3AED",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "Georgia, serif",
          }}>Part 13 of 20 — Hegel's Phenomenology of Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4.5vw, 42px)",
            fontWeight: "bold",
            color: "#f0e8ff",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
            fontFamily: "Georgia, serif",
          }}>The Agony of Division</h1>
          <p style={{
            fontSize: "clamp(13px, 2vw, 17px)",
            color: "#a090cc",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: "Georgia, serif",
          }}>The unhappy consciousness is the form of awareness torn between finite existence and infinite aspiration, projecting all value onto an unattainable transcendent beyond.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0e0820",
          border: "1px solid #2a1a50",
          borderLeft: "4px solid #7C3AED",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7C3AED",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 2vw, 16px)",
            lineHeight: 1.7,
            color: "#c8b8e8",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            If reality is rational and recognition is the very structure of self-consciousness, why does consciousness so frequently experience itself as <em>irreconcilably divided</em> — torn from its own essence, straining toward a perfection it can never inhabit? Why does the very capacity for self-reflection so often become a source of anguish rather than freedom? Something essential in the architecture of spirit seems to generate alienation not as accident but as necessity.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "clamp(16px, 3vw, 24px)",
            borderBottom: "1px solid #1a0a30",
          }}>
            <h2 style={{
              fontSize: "clamp(15px, 2.5vw, 20px)",
              color: "#e0d0ff",
              margin: "0 0 6px 0",
              fontFamily: "Georgia, serif",
            }}>The Structure of Unhappy Consciousness</h2>
            <p style={{
              fontSize: "clamp(11px, 1.7vw, 14px)",
              color: "#8878aa",
              margin: 0,
              fontFamily: "Georgia, serif",
            }}>The silhouette is stretched between the dim weight below and the brilliant ideal above. Adjust the ascetic effort to witness the self-defeating logic — then press Resolution to discover where the infinite truly resides.</p>
          </div>

          <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%" }}
            />
          </div>

          {/* Controls */}
          <div style={{
            padding: "clamp(14px, 2.5vw, 22px)",
            borderTop: "1px solid #1a0a30",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Slider */}
            <div style={{ opacity: resolved ? 0.4 : 1, transition: "opacity 0.5s" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}>
                <label style={{
                  fontSize: "clamp(11px, 1.7vw, 14px)",
                  color: "#b09edd",
                  fontFamily: "Georgia, serif",
                }}>Ascetic Effort</label>
                <span style={{
                  fontSize: "clamp(10px, 1.5vw, 13px)",
                  color: "#7C3AED",
                  fontFamily: "Georgia, serif",
                }}>{asceticLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={asceticLevel}
                onChange={(e) => !resolved && setAsceticLevel(Number(e.target.value))}
                disabled={resolved}
                style={{
                  width: "100%",
                  accentColor: "#7C3AED",
                  cursor: resolved ? "not-allowed" : "pointer",
                  height: "6px",
                }}
              />
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "clamp(9px, 1.3vw, 11px)",
                color: "#665588",
                marginTop: "4px",
                fontFamily: "Georgia, serif",
              }}>
                <span>Passive acceptance</span>
                <span>Maximum renunciation</span>
              </div>
            </div>

            {/* Resolution button */}
            <button
              onClick={handleResolve}
              disabled={animating}
              style={{
                background: resolved ? "#1a0a3a" : "linear-gradient(135deg, #4a1a8a, #7C3AED)",
                border: "1px solid #7C3AED",
                borderRadius: "8px",
                color: resolved ? "#9f70ff" : "#ffffff",
                fontSize: "clamp(12px, 1.8vw, 15px)",
                padding: "12px 24px",
                cursor: animating ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.3s",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => { if (!animating) e.currentTarget.style.boxShadow = "0 0 20px #7C3AED66"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {resolved ? "Reset: Return to Division" : animating ? "Dissolving the separation..." : "Resolution: Discover the Infinite Within"}
            </button>

            {resolved && (
              <p style={{
                fontSize: "clamp(12px, 1.7vw, 14px)",
                color: "#c4a0ff",
                fontStyle: "italic",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
                fontFamily: "Georgia, serif",
              }}>
                The two poles collapse into one: the infinite was never elsewhere. Finite existence's very capacity for infinite longing reveals infinity already present within it.
              </p>
            )}
          </div>
        </div>

        {/* Core Argument */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 24px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7C3AED",
            marginBottom: "14px",
            fontFamily: "Georgia, serif",
          }}>The Argument</div>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            Unhappy consciousness emerges when the social world no longer offers adequate recognition — when its institutions feel hollow, its bonds insufficient. The self turns inward, then upward, projecting all genuine value onto an infinite transcendent source: God, perfect love, utopia. But this projection generates a devastating logic. The more magnificent the infinite appears, the more wretched finite existence becomes by comparison.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            Every act of renunciation — fasting, prayer, mortification, utopian sacrifice — is intended to close the gap between finite self and infinite ideal. Yet each renunciation reinforces the very division it seeks to overcome: the self that performs the renunciation is still there, now watching itself renounce, generating a subtle spiritual pride that replaces genuine transcendence.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            The deeper error, Hegel insists, is treating the infinite as entirely external to finite existence. The decisive insight is this: finite consciousness's very capacity to <em>aspire</em> toward the infinite — to feel the lack, to long across the gap — already demonstrates that infinity is not elsewhere. It is the power within finitude that drives the striving itself. Resolution comes not by escaping the finite but by recognizing that the infinite is realized precisely through finite institutions, relationships, and historical forms.
          </p>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #7C3AED33",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#7C3AED", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7C3AED" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#7C3AED" : "#7C3AED55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #7C3AED44", borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#7C3AED", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0a0c1a",
          border: "1px solid #1a2050",
          borderLeft: "4px solid #4a6acd",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4a6acd",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 2vw, 16px)",
            lineHeight: 1.7,
            color: "#b0b8d8",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            If unhappy consciousness is overcome by discovering the infinite within finite forms — through institutions, relationships, historical life — then the character of those finite forms becomes philosophically urgent. The movement beyond unhappy consciousness leads to 'reason': the discovery that consciousness can find itself reflected in the objective world. But this requires concrete social and economic institutions through which that discovery is mediated. What is the character of those institutions? What makes them adequate — or inadequate — vehicles for the realization of spirit?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 14px)",
            lineHeight: 1.6,
            color: "#7a88bb",
            margin: 0,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}>
            This pressure forces the next development: a sustained examination of how reason attempts to recognize itself in the social world — and why that recognition so frequently fails, generating new forms of alienation far more sophisticated than the simple division of unhappy consciousness.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "clamp(14px, 2.5vw, 22px)",
              cursor: "pointer",
              background: echosOpen ? "#0e0820" : "transparent",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0e0820"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = echosOpen ? "#0e0820" : "transparent"; }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.4vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7C3AED",
              fontFamily: "Georgia, serif",
            }}>Real-World Echoes</div>
            <div style={{ color: "#7C3AED" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              {[
                {
                  title: "Medieval Christian Spirituality",
                  body: "The logic of monastic self-mortification follows the structure precisely: the more perfect God appears, the more worthless finite human existence becomes by comparison. Flagellant movements, extreme fasting, the cult of suffering — each attempt to eliminate the finite self only intensifies the consciousness of division.",
                },
                {
                  title: "Romantic Idealization",
                  body: "Secular unhappy consciousness finds its home in the idealization of perfect love. When actual beloved persons are held to impossible standards of transcendent perfection, every real intimacy disappoints. The beloved must be infinite — and therefore is never met in actual flesh. The relationship remains perpetually with an ideal, never a person.",
                },
                {
                  title: "Utopian Political Movements",
                  body: "Political utopianisms that demand immediate total transformation exhibit the same structure: the perfect future society is so radically opposed to existing arrangements that any compromise with present institutions becomes treason. The movement consumes itself in purity spirals — each purge of the impure reinforcing the distance between the actual and the ideal.",
                },
              ].map((ex, i) => (
                <div key={i} style={{
                  background: "#0d0820",
                  border: "1px solid #2a1a40",
                  borderRadius: "8px",
                  padding: "16px",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.8vw, 15px)",
                    color: "#c4a0ff",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif",
                  }}>{ex.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#8878aa",
                    lineHeight: 1.65,
                    margin: 0,
                    fontFamily: "Georgia, serif",
                  }}>{ex.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.4vw, 12px)",
          color: "#443366",
          paddingBottom: "8px",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.08em",
        }}>
          Part 13 of 20 · Hegel's Complete Philosophical System
        </div>
      </div>
    </div>
  );
}

// ─── Part 14: The World of Needs and Work ───
function CivilSociety() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const figuresRef = useRef([]);
  const containerRef = useRef(null);

  const accent = "#D97706";

  const keyConcepts = [
    { id: "system_of_needs", label: "System of Needs", desc: "The system of needs is Hegel's name for the market economy understood philosophically: a vast web of mutual dependence in which each person pursues private ends and, through that very pursuit, serves others' needs. It is the first sphere of civil society and generates unprecedented freedom and social complexity, but also systemic inequality and alienation." },
    { id: "division_of_labor", label: "Division of Labor", desc: "Through specialization, individuals become dependent on the social whole for their survival and development. Division of labor is simultaneously liberating (it allows mastery and market participation) and limiting (it narrows the individual's activity and makes her vulnerable to economic forces beyond her control, a theme Marx would later radicalize)." },
    { id: "administration_of_justice", label: "Administration of Justice", desc: "Civil society requires a legal system that transforms abstract right into positive law — actually enforceable rules specifying rights of property, contract, and personal security. For Hegel this is not merely a practical necessity but a recognition: law makes persons visible to each other as rights-bearing subjects, not merely as competitors." },
    { id: "police_regulation", label: "Police (Public Regulation)", desc: "In Hegel's usage, 'police' (Polizei) means something much broader than law enforcement: the entire system of public economic regulation, consumer protection, poverty relief, and public works. It exists because market exchange alone cannot guarantee welfare or correct systemic failures — a kind of proto-welfare-state function." },
    { id: "corporation", label: "Corporation", desc: "Corporations (professional guilds and voluntary associations) are intermediate institutions between the isolated individual and the state. They provide social identity, mutual support, and ethical formation for their members — bridging the gap between private market actors and the public political community, and countering the atomization the market otherwise produces." },
    { id: "inequality", label: "Social Class and Inequality", desc: "Civil society inevitably generates three social classes — the agricultural class, the business class, and the universal class (civil servants) — and chronic inequality. Hegel sees this not as a contingent failure but as structurally necessary: the very freedom that enables development also enables concentration of advantage. This tension is what compels the state." },
  ];

  const districts = {
    family: {
      label: "Family",
      emoji: "🏠",
      color: "#7C3AED",
      x: 12, y: 55,
      title: "The Family",
      concept: "Natural Unity",
      description: "The family is the original ethical community — bound by love and biological ties rather than contract. It provides children's first recognition and instills ethical dispositions. But it cannot extend recognition to strangers, nor can it meet the complex needs of modern individuals through mere domestic life alone.",
      limitation: "Limited to blood and sentiment; cannot address the universal stranger."
    },
    corporations: {
      label: "Corporations",
      emoji: "⚙️",
      color: "#059669",
      x: 70, y: 20,
      title: "The Corporation",
      concept: "Occupational Associations",
      description: "Corporations — Hegel's term for guilds and professional associations — provide a second family for individuals. They confer social honor and identity through one's craft or profession, offering mutual support and a sense of belonging that pure market relations destroy. They mediate between private individuals and the abstract state.",
      limitation: "Particular loyalties can conflict with universal interest; risk of guild protectionism."
    },
    justice: {
      label: "Justice",
      emoji: "⚖️",
      color: "#2563EB",
      x: 70, y: 75,
      title: "Administration of Justice",
      concept: "Legal Framework",
      description: "Abstract right must be made concrete in laws and courts. The administration of justice transforms the empty form of rights into a living institution — enforcing contracts, protecting property, and adjudicating disputes. Without law, market exchange collapses into mere power.",
      limitation: "Law treats persons as formal equals while ignoring substantive inequalities."
    },
    police: {
      label: "Police / Regulation",
      emoji: "🏛️",
      color: "#DC2626",
      x: 12, y: 20,
      title: "The Police (Public Regulation)",
      concept: "Public Economic Regulation & Welfare",
      description: "Hegel's 'police' (Polizei) is far broader than law enforcement — it encompasses all public economic regulation, infrastructure, consumer protection, and social welfare. It corrects market failures: preventing monopoly, ensuring public health and safety, and providing for those who cannot provide for themselves through the market.",
      limitation: "Paternalistic regulation risks stifling the very freedom civil society exists to protect."
    },
    state: {
      label: "The State",
      emoji: "🏛️",
      color: "#D97706",
      x: 41, y: 2,
      title: "The State (on the Horizon)",
      concept: "Ethical Totality",
      description: "The state is not simply a regulator of civil society but its ethical completion. Where civil society sees only particular interests, the state grasps the universal good. It gives civil society its ultimate rational form — not by abolishing market freedom but by embedding it within institutions that honor the common life.",
      limitation: "The state's relation to civil society remains deeply contested — is it guardian or oppressor?"
    }
  };

  const inequalityData = [
    { label: "Merchant", size: 1.0, color: "#D97706", growth: 0.008 },
    { label: "Artisan", size: 0.65, color: "#6B7280", growth: 0.002 },
    { label: "Worker", size: 0.45, color: "#6B7280", growth: -0.001 },
    { label: "Poor", size: 0.25, color: "#4B5563", growth: -0.004 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initFigures(canvas);
    });

    resizeObserver.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initFigures(canvas);
    animate(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  function initFigures(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const figures = [];
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.28;

    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      figures.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        pile: 3 + Math.random() * 8,
        role: i < 3 ? "rich" : i < 10 ? "middle" : "poor",
        cx, cy, radius
      });
    }
    figuresRef.current = figures;
  }

  function animate(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw market floor
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
      grad.addColorStop(0, "#1a0f00");
      grad.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw market ring
      ctx.strokeStyle = "#D9770640";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.33, 0, Math.PI * 2);
      ctx.stroke();

      // Label
      ctx.fillStyle = "#D97706";
      ctx.font = `bold ${Math.max(10, w * 0.025)}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.fillText("MARKETPLACE", cx, cy - Math.min(w, h) * 0.3);

      const figures = figuresRef.current;
      figures.forEach(fig => {
        // Bounce within market circle
        const dx = fig.x - cx;
        const dy = fig.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > fig.radius * 0.88) {
          fig.vx -= dx * 0.002;
          fig.vy -= dy * 0.002;
        }

        fig.x += fig.vx;
        fig.y += fig.vy;
        fig.vx *= 0.99;
        fig.vy *= 0.99;
        if (Math.abs(fig.vx) < 0.05) fig.vx += (Math.random() - 0.5) * 0.3;
        if (Math.abs(fig.vy) < 0.05) fig.vy += (Math.random() - 0.5) * 0.3;

        // Accumulation effect
        if (fig.role === "rich") fig.pile = Math.min(fig.pile + 0.015, 20);
        else if (fig.role === "poor") fig.pile = Math.max(fig.pile - 0.008, 0.5);

        // Draw figure
        const r = Math.max(3, Math.min(w, h) * 0.018);
        const pileColor = fig.role === "rich" ? "#D97706" : fig.role === "middle" ? "#6B7280" : "#374151";
        
        // Pile of goods
        ctx.fillStyle = pileColor + "80";
        ctx.beginPath();
        ctx.ellipse(fig.x, fig.y + r * 0.8, r * 0.4 * (fig.pile / 8), r * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Person body
        ctx.fillStyle = fig.role === "rich" ? "#F59E0B" : fig.role === "middle" ? "#9CA3AF" : "#4B5563";
        ctx.beginPath();
        ctx.arc(fig.x, fig.y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = "#FBBF7480";
        ctx.beginPath();
        ctx.arc(fig.x, fig.y - r * 0.7, r * 0.32, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }

  const districtKeys = Object.keys(districts);

  const svgPositions = {
    family: { cx: "14%", cy: "62%" },
    corporations: { cx: "72%", cy: "22%" },
    justice: { cx: "72%", cy: "76%" },
    police: { cx: "14%", cy: "22%" },
    state: { cx: "50%", cy: "5%" }
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3d1c02 0%, #1a0d00 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8dcc8"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vw, 32px)"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#D97706",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 14 of 20 — Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            color: "#F5DEB3",
            margin: "0 0 8px",
            fontWeight: "normal",
            lineHeight: 1.2
          }}>The World of Needs and Work</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c4a97a",
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.5
          }}>Civil society is the realm of market relationships and voluntary associations<br style={{ display: "none" }} /> that enables individual freedom while generating inequalities requiring institutional correction.</p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "#0f0a04ee",
          border: "1px solid #2a1a08",
          borderLeft: "4px solid #D97706",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D97706",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd0b8",
            margin: 0
          }}>
            The movement beyond unhappy consciousness and toward reason requires concrete institutions — but what is the character of the intermediate social realm between the family and the state where individuals first encounter each other as strangers? The family offers warmth and unity, but it cannot recognize the universal person. Pure abstract right is too thin to sustain a life. Something must stand between the intimacy of the home and the grandeur of the state: a world of strangers exchanging goods and labor, seeking recognition not through love but through work, need, and mutual dependence.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0c0804f5",
          border: "1px solid #2a1a08",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <h2 style={{
              fontSize: "clamp(15px, 2.2vw, 20px)",
              color: "#F5DEB3",
              margin: "0 0 6px",
              fontWeight: "normal"
            }}>Civil Society: The Marketplace and Its Districts</h2>
            <p style={{
              fontSize: "clamp(12px, 1.5vw, 14px)",
              color: "#a0896a",
              margin: 0,
              fontStyle: "italic"
            }}>Click any district to explore its role and limitation. Watch the marketplace below — inequality accumulates in real time.</p>
          </div>

          {/* City Map SVG + Canvas composite */}
          <div style={{ position: "relative", width: "100%" }}>
            <svg
              viewBox="0 0 500 320"
              width="100%"
              style={{ display: "block", maxWidth: "860px" }}
              aria-label="Civil Society Map"
            >
              {/* Background */}
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#1a1000" />
                  <stop offset="100%" stopColor="#060408" />
                </radialGradient>
                <radialGradient id="marketGlow" cx="50%" cy="55%" r="30%">
                  <stop offset="0%" stopColor="#D9770618" />
                  <stop offset="100%" stopColor="#D9770600" />
                </radialGradient>
              </defs>
              <rect width="500" height="320" fill="url(#bgGrad)" rx="8" />
              <rect width="500" height="320" fill="url(#marketGlow)" rx="8" />

              {/* Connecting lines from districts to center */}
              {[
                { x1: 70, y1: 198, x2: 210, y2: 185 },
                { x1: 362, y1: 72, x2: 302, y2: 140 },
                { x1: 362, y1: 245, x2: 302, y2: 195 },
                { x1: 70, y1: 72, x2: 198, y2: 140 },
                { x1: 250, y1: 22, x2: 250, y2: 118 }
              ].map((line, i) => (
                <line
                  key={i}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="#D9770630"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Canvas marketplace in center - represented as embedded foreignObject */}
              <foreignObject x="140" y="108" width="220" height="160">
                <div style={{ width: "100%", height: "100%" }}>
                  <canvas
                    ref={canvasRef}
                    style={{ width: "100%", height: "100%", display: "block", borderRadius: "50%" }}
                  />
                </div>
              </foreignObject>

              {/* Market circle border */}
              <circle cx="250" cy="188" r="110" fill="none" stroke="#D9770650" strokeWidth="1.5" strokeDasharray="6 3" />

              {/* District nodes */}
              {/* Family - bottom left */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "family" ? null : "family")}
                onMouseEnter={() => setHoveredDistrict("family")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="10" y="162" width="120" height="74" rx="8"
                  fill={selectedDistrict === "family" ? "#2d1a5a" : hoveredDistrict === "family" ? "#1e1240" : "#140d2a"}
                  stroke={selectedDistrict === "family" ? "#7C3AED" : "#3d2870"}
                  strokeWidth={selectedDistrict === "family" ? 2 : 1}
                />
                <text x="70" y="184" textAnchor="middle" fill="#A78BFA" fontSize="18">🏠</text>
                <text x="70" y="203" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold">FAMILY</text>
                <text x="70" y="217" textAnchor="middle" fill="#8b7fc0" fontSize="8.5" fontFamily="Georgia, serif">Natural Unity</text>
                <text x="70" y="228" textAnchor="middle" fill="#6d6494" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">love & kinship</text>
              </g>

              {/* Police - top left */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "police" ? null : "police")}
                onMouseEnter={() => setHoveredDistrict("police")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="10" y="30" width="120" height="74" rx="8"
                  fill={selectedDistrict === "police" ? "#3d0a0a" : hoveredDistrict === "police" ? "#280808" : "#1a0808"}
                  stroke={selectedDistrict === "police" ? "#DC2626" : "#5a1a1a"}
                  strokeWidth={selectedDistrict === "police" ? 2 : 1}
                />
                <text x="70" y="52" textAnchor="middle" fill="#FCA5A5" fontSize="18">🏛</text>
                <text x="70" y="70" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">POLICE / REGULATION</text>
                <text x="70" y="84" textAnchor="middle" fill="#c08080" fontSize="8.5" fontFamily="Georgia, serif">Public Regulation</text>
                <text x="70" y="96" textAnchor="middle" fill="#805050" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">welfare & order</text>
              </g>

              {/* Corporations - top right */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "corporations" ? null : "corporations")}
                onMouseEnter={() => setHoveredDistrict("corporations")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="370" y="30" width="120" height="74" rx="8"
                  fill={selectedDistrict === "corporations" ? "#0a2d1e" : hoveredDistrict === "corporations" ? "#071e14" : "#041208"}
                  stroke={selectedDistrict === "corporations" ? "#059669" : "#0a3a20"}
                  strokeWidth={selectedDistrict === "corporations" ? 2 : 1}
                />
                <text x="430" y="52" textAnchor="middle" fill="#6EE7B7" fontSize="18">⚙</text>
                <text x="430" y="70" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">CORPORATIONS</text>
                <text x="430" y="84" textAnchor="middle" fill="#4db090" fontSize="8.5" fontFamily="Georgia, serif">Occupational Assoc.</text>
                <text x="430" y="96" textAnchor="middle" fill="#2e7060" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">guilds & professions</text>
              </g>

              {/* Justice - bottom right */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "justice" ? null : "justice")}
                onMouseEnter={() => setHoveredDistrict("justice")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="370" y="212" width="120" height="74" rx="8"
                  fill={selectedDistrict === "justice" ? "#071628" : hoveredDistrict === "justice" ? "#050f1c" : "#030810"}
                  stroke={selectedDistrict === "justice" ? "#2563EB" : "#0a2050"}
                  strokeWidth={selectedDistrict === "justice" ? 2 : 1}
                />
                <text x="430" y="234" textAnchor="middle" fill="#93C5FD" fontSize="18">⚖</text>
                <text x="430" y="252" textAnchor="middle" fill="#93c5fd" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">JUSTICE</text>
                <text x="430" y="266" textAnchor="middle" fill="#6090c0" fontSize="8.5" fontFamily="Georgia, serif">Legal Framework</text>
                <text x="430" y="278" textAnchor="middle" fill="#405880" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">courts & contracts</text>
              </g>

              {/* State - top center */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "state" ? null : "state")}
                onMouseEnter={() => setHoveredDistrict("state")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="178" y="2" width="144" height="50" rx="8"
                  fill={selectedDistrict === "state" ? "#2d1a00" : hoveredDistrict === "state" ? "#1e1200" : "#140c00"}
                  stroke={selectedDistrict === "state" ? "#D97706" : "#6b4500"}
                  strokeWidth={selectedDistrict === "state" ? 2.5 : 1.5}
                />
                <text x="250" y="22" textAnchor="middle" fill="#FBBF24" fontSize="14">🏛</text>
                <text x="250" y="36" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">THE STATE</text>
                <text x="250" y="47" textAnchor="middle" fill="#c4902a" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">on the horizon</text>
              </g>

              {/* Market label overlay */}
              <text x="250" y="304" textAnchor="middle" fill="#D97706" fontSize="9" fontFamily="Georgia, serif" opacity="0.7">click districts to explore → inequality accumulates in the market</text>
            </svg>
          </div>

          {/* Selected district detail panel */}
          {selectedDistrict && (
            <div style={{
              background: "#0f0a04f0",
              border: `1px solid ${districts[selectedDistrict].color}60`,
              borderLeft: `4px solid ${districts[selectedDistrict].color}`,
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 22px)",
              animation: "none"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
              }}>
                <span style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}>{districts[selectedDistrict].emoji}</span>
                <div>
                  <div style={{
                    fontSize: "clamp(14px, 2vw, 17px)",
                    color: "#F5DEB3",
                    fontWeight: "bold"
                  }}>{districts[selectedDistrict].title}</div>
                  <div style={{
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    color: districts[selectedDistrict].color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}>{districts[selectedDistrict].concept}</div>
                </div>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: 1.7,
                color: "#c8b89a",
                margin: "0 0 12px"
              }}>{districts[selectedDistrict].description}</p>
              <div style={{
                background: "#ffffff08",
                border: `1px solid ${districts[selectedDistrict].color}30`,
                borderRadius: "4px",
                padding: "10px 14px"
              }}>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: districts[selectedDistrict].color,
                  display: "block",
                  marginBottom: "4px"
                }}>Limitation</span>
                <span style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#a09080",
                  fontStyle: "italic"
                }}>{districts[selectedDistrict].limitation}</span>
              </div>
            </div>
          )}

          {/* Core Argument prose */}
          <div style={{
            background: "#ffffff06",
            border: "1px solid #2a1a08",
            borderRadius: "8px",
            padding: "clamp(14px, 2.5vw, 20px)"
          }}>
            <div style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D97706",
              marginBottom: "10px",
              fontWeight: "bold"
            }}>Hegel's Core Argument</div>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              lineHeight: 1.8,
              color: "#c0aa88",
              margin: 0
            }}>
              Civil society emerges when individuals leave the natural unity of the family and pursue their particular interests through relationships with strangers. Through the division of labor and voluntary exchange, it enables unprecedented individual development and social cooperation — respecting freedom by allowing people to choose occupations, associations, and consumption. But market relationships treat people primarily as means for satisfying needs rather than as ends deserving recognition, and generate self-reinforcing inequalities, cyclical crises, and social fragmentation. Three mechanisms manage these tensions: the administration of justice establishing the legal framework, the police providing public economic regulation and welfare, and the corporation offering professional associations that provide social identity and mutual support between the family and the state.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "#0a0c0fee",
          border: "1px solid #1a1f2a",
          borderLeft: "4px solid #6B7280",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            color: "#b0b8c8",
            margin: "0 0 14px"
          }}>
            Civil society generates inequalities and social fragmentation that it cannot resolve on its own. The same market freedom that enables individual development relentlessly concentrates wealth, creates a class of the permanently poor — what Hegel calls the "rabble" — and produces periodic crises of overproduction. The corporation and the police can mitigate these tensions but cannot eliminate them. Hegel's account here is remarkably prescient: he sees that market society contains within it a structural tendency toward class conflict and social disintegration. This points toward the necessity of the state, but it also opens a wound that Hegel's own account of the state cannot fully close. Later theorists — above all Marx — will seize on precisely this point: that civil society's contradictions are deeper than any bourgeois state can heal.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.5vw, 13px)",
            color: "#7a8090",
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: the question of whether the state can genuinely achieve the ethical totality that civil society fails to provide, or whether it too remains merely the instrument of particular class interests.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "#0a0804ee",
          border: "1px solid #2a1a08",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D97706",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#D97706" />
              : <ChevronDown size={16} color="#D97706" />
            }
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 20px) clamp(14px, 2.5vw, 20px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>
              {[
                {
                  title: "Market Competition and Inequality",
                  text: "Market competition leading to exploitation, inequality, and overproduction crises — from the 19th-century factory system to 21st-century platform monopolies — enacts precisely Hegel's structural insight: that the market produces its own negation in the form of those it leaves behind."
                },
                {
                  title: "Trade Guilds and Professional Associations",
                  text: "The corporation lives on in modern professional associations, trade unions, and licensing bodies — institutions that offer social identity and mutual support beyond the purely private, just as Hegel envisioned. The AMA, bar associations, and labor unions are all Hegelian corporations in this broad sense."
                },
                {
                  title: "Public Economic Regulation",
                  text: "Hegel's 'police' power anticipates the modern regulatory state: antitrust law, consumer protection agencies, public health systems, zoning boards, social insurance. These are all responses to the same structural failure of civil society to regulate itself that Hegel diagnosed in 1820."
                },
                {
                  title: "Labor, Capital, and Marx",
                  text: "Hegel saw workers selling labor power to those who own the means of production — and recognized that this relationship, while formally free, generates substantive unfreedom and class division. Marx radicalized this insight, arguing that the state cannot overcome these contradictions but merely masks them."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  background: "#ffffff05",
                  border: "1px solid #2a1a08",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 16px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#D97706",
                    fontWeight: "bold",
                    marginBottom: "6px"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#a09070",
                    margin: 0
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#4a3820",
          paddingBottom: "8px"
        }}>
          Civil Society · Hegel's Philosophy of Right §182–256
        </div>

      </div>
    </div>
  );
}

// ─── Part 15: The Spectre of Materialism ───
function HegelAndMarx() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [isEchoesOpen, setIsEchoesOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const animRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const concepts = [
    {
      id: "alienation",
      label: "Alienation",
      hegel: "Spirit becomes estranged from itself when it externalizes itself in objective form, failing to recognize its own products as expressions of itself. This estrangement is a necessary stage in Spirit's self-realization — consciousness must pass through alienation to achieve genuine self-knowledge.",
      marx: "Workers are estranged from their products (owned by capital), from their productive activity (sold as labor-power), from their human essence (species-being reduced to mere survival), and from each other (competing in the labor market). Alienation is not a spiritual condition but a material one rooted in property relations."
    },
    {
      id: "dialectic",
      label: "Dialectic",
      hegel: "The dialectic is the self-movement of the Concept — Idea generates its own contradiction, works through the negation, and arrives at a higher synthesis that preserves and transforms the original. History is the logical unfolding of Spirit coming to know itself.",
      marx: "The dialectic is the self-movement of material contradictions — between forces and relations of production, between classes with opposing interests. Capitalism generates its own gravediggers by concentrating workers, creating crises, and reducing the rate of profit until revolutionary transformation becomes materially necessary."
    },
    {
      id: "recognition",
      label: "Recognition",
      hegel: "Self-consciousness requires recognition from another self-consciousness. The master-slave dialectic shows how unequal recognition produces unstable social relations — the slave's labor transforms the world while the master stagnates, eventually inverting the power relation through the slave's developed self-consciousness.",
      marx: "The master-slave dialectic maps directly onto capitalist class relations, but the inversion is not spiritual — it is material. Workers recognize their common interests through shared conditions in factories. Class consciousness emerges from material circumstances, not abstract philosophical reflection."
    },
    {
      id: "rational_kernel",
      label: "Rational Kernel",
      hegel: "What is rational is actual, and what is actual is rational — the existing social order contains within it the rational structure of Spirit's self-realization. Philosophy comprehends the present as rational necessity, reconciling us to historical actuality.",
      marx: "The 'rational kernel' in the Hegelian dialectic must be extracted from its 'mystical shell.' The dialectic's insight into contradiction and transformation is correct — but Hegel's idealism inverts the real relationship, making philosophy serve as ideological reconciliation to unjust conditions rather than a weapon for changing them."
    },
    {
      id: "commodity_fetishism",
      label: "Commodity Fetishism",
      hegel: "Consciousness in its alienated forms mistakes its own products for independent, self-subsistent realities. In Phenomenology, Spirit must work through these reified forms — religion, morality, law — recognizing them as its own creations before achieving genuine freedom.",
      marx: "Commodity fetishism is the economic form of this mystification: social relations between people appear as relations between things. The value of commodities seems to be a natural property of objects rather than crystallized human labor. This is not mere philosophical confusion but a real appearance generated by capitalist production itself."
    },
    {
      id: "revolutionary_practice",
      label: "Revolutionary Practice",
      hegel: "The Owl of Minerva flies at dusk — philosophy can only comprehend its epoch after it has passed. The philosopher reconciles thought to the rational structure already present in actuality. Transformation happens through conceptual recognition, not external intervention.",
      marx: "The 11th Thesis on Feuerbach: philosophers have only interpreted the world; the point is to change it. Theory must become practical — not merely comprehending contradictions but articulating the interests of the class whose material position makes it the agent of historical transformation. Praxis unites theory and practice."
    }
  ];

  const handleFlip = () => {
    if (animating) return;
    setAnimating(true);
    const start = Date.now();
    const duration = 900;
    const startProgress = isFlipped ? 1 : 0;
    const endProgress = isFlipped ? 0 : 1;

    const animate = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startProgress + (endProgress - startProgress) * eased;
      setFlipProgress(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsFlipped(!isFlipped);
        setAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let particles = [];
    let rafId;

    const init = () => {
      particles = [];
      for (let i = 0; i < 38; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.4,
          alpha: Math.random() * 0.25 + 0.05
        });
      }
    };
    init();

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#DC2626`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const p = flipProgress;
  const scaleY = Math.abs(Math.cos(p * Math.PI));
  const midFlip = p > 0.25 && p < 0.75;

  const hegelOpacity = midFlip ? 0 : (p < 0.5 ? 1 - p * 2 : 0);
  const marxOpacity = midFlip ? 0 : (p > 0.5 ? (p - 0.5) * 2 : 0);
  const showHegel = p < 0.5;
  const showMarx = p >= 0.5;

  const diagramOpacity = showHegel ? Math.max(0, 1 - p * 2.5) : Math.max(0, (p - 0.4) * 2.5);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 60% 20%, #3b0a0a 0%, #1a0505 40%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
        overflowX: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.18em",
            color: "#DC2626",
            textTransform: "uppercase",
            marginBottom: "8px",
            opacity: 0.85
          }}>
            Part 15 of 20 — Hegel's Complete System
          </div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            color: "#f5e6e6",
            margin: "0 0 10px 0",
            fontWeight: "normal",
            letterSpacing: "-0.01em",
            lineHeight: 1.2
          }}>
            The Spectre of Materialism
          </h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c9a8a8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontStyle: "italic"
          }}>
            Marx preserves the dialectical structure of Hegelian philosophy while inverting its foundations, grounding historical development in material productive forces rather than the development of consciousness.
          </p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "rgba(30, 8, 8, 0.82)",
          border: "1px solid rgba(220, 38, 38, 0.25)",
          borderLeft: "4px solid #DC2626",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#DC2626",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>
            The Problem
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#e8d0d0",
            lineHeight: 1.75,
            margin: 0
          }}>
            Hegel's civil society analysis reveals deep tensions between market freedom and social solidarity — but does a purely philosophical-conceptual account of these tensions adequately grasp their material roots, or does it ideologically mystify them? When philosophy declares the actual to be rational, does it illuminate reality or provide intellectual cover for its injustices? The pressure of this question is nothing less than a demand to judge whether thinking can change the world, or only ever reconcile us to it.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(20, 5, 5, 0.75)",
          border: "1px solid rgba(220, 38, 38, 0.2)",
          borderRadius: "12px",
          padding: "clamp(16px, 3.5vw, 36px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "clamp(12px, 2.5vw, 24px)"
          }}>
            <h2 style={{
              fontSize: "clamp(15px, 2.2vw, 20px)",
              color: "#f0d8d8",
              margin: "0 0 8px 0",
              fontWeight: "normal",
              letterSpacing: "0.03em"
            }}>
              The Materialist Inversion
            </h2>
            <p style={{
              fontSize: "clamp(12px, 1.5vw, 13px)",
              color: "#a08080",
              margin: 0,
              fontStyle: "italic"
            }}>
              Flip the diagram to see Marx's inversion — then hover concepts below to compare formulations
            </p>
          </div>

          {/* Flip Diagram */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "clamp(16px, 3vw, 28px)"
          }}>
            <div style={{
              width: "100%",
              maxWidth: "500px",
              position: "relative"
            }}>
              <svg
                viewBox="0 0 500 320"
                width="100%"
                style={{
                  transform: `scaleY(${scaleY})`,
                  transformOrigin: "center center",
                  transition: animating ? "none" : "transform 0.1s"
                }}
              >
                {/* Background */}
                <rect width="500" height="320" fill="rgba(10,5,5,0.0)" />

                {showHegel ? (
                  <g opacity={diagramOpacity}>
                    {/* Hegel: Ideas on top, Matter below */}
                    {/* Top box: Ideas/Spirit */}
                    <rect x="80" y="20" width="340" height="90" rx="10"
                      fill="rgba(220,38,38,0.18)" stroke="#DC2626" strokeWidth="2" />
                    <text x="250" y="50" textAnchor="middle"
                      fill="#f5c6c6" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Ideas / Spirit / Consciousness
                    </text>
                    <text x="250" y="72" textAnchor="middle"
                      fill="#c89090" fontSize="12" fontFamily="Georgia, serif">
                      The Concept unfolds through its own logic
                    </text>
                    <text x="250" y="92" textAnchor="middle"
                      fill="#c89090" fontSize="11" fontFamily="Georgia, serif">
                      History = Spirit's self-realization
                    </text>

                    {/* Arrows downward */}
                    <line x1="200" y1="114" x2="200" y2="200" stroke="#DC2626" strokeWidth="2" strokeDasharray="6,4" />
                    <polygon points="200,205 195,195 205,195" fill="#DC2626" />
                    <line x1="300" y1="114" x2="300" y2="200" stroke="#DC2626" strokeWidth="2" strokeDasharray="6,4" />
                    <polygon points="300,205 295,195 305,195" fill="#DC2626" />
                    <text x="250" y="165" textAnchor="middle"
                      fill="#DC2626" fontSize="11" fontFamily="Georgia, serif">
                      determines
                    </text>

                    {/* Bottom box: Material Reality */}
                    <rect x="80" y="208" width="340" height="90" rx="10"
                      fill="rgba(80,20,20,0.35)" stroke="#7a3030" strokeWidth="1.5" />
                    <text x="250" y="238" textAnchor="middle"
                      fill="#b89090" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Material Reality / Nature
                    </text>
                    <text x="250" y="260" textAnchor="middle"
                      fill="#907070" fontSize="12" fontFamily="Georgia, serif">
                      The external, contingent domain
                    </text>
                    <text x="250" y="280" textAnchor="middle"
                      fill="#907070" fontSize="11" fontFamily="Georgia, serif">
                      Secondary expression of Idea
                    </text>

                    {/* Label */}
                    <text x="250" y="316" textAnchor="middle"
                      fill="#DC2626" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">
                      Hegel: Idealist
                    </text>
                  </g>
                ) : (
                  <g opacity={diagramOpacity}>
                    {/* Marx: Material Base on top (visually, since diagram is flipped), Superstructure below */}
                    {/* When diagram is flipped, bottom is now top */}
                    {/* Top box (was bottom): Material Base */}
                    <rect x="80" y="20" width="340" height="90" rx="10"
                      fill="rgba(180, 60, 60, 0.28)" stroke="#DC2626" strokeWidth="2.5" />
                    <text x="250" y="50" textAnchor="middle"
                      fill="#ffd0d0" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Material Base / Productive Forces
                    </text>
                    <text x="250" y="72" textAnchor="middle"
                      fill="#e0a0a0" fontSize="12" fontFamily="Georgia, serif">
                      Forces & relations of production
                    </text>
                    <text x="250" y="92" textAnchor="middle"
                      fill="#e0a0a0" fontSize="11" fontFamily="Georgia, serif">
                      Class struggle drives history
                    </text>

                    {/* Arrows upward — now the base determines superstructure */}
                    <line x1="200" y1="114" x2="200" y2="200" stroke="#ff6b6b" strokeWidth="2.5" />
                    <polygon points="200,205 195,195 205,195" fill="#ff6b6b" />
                    <line x1="300" y1="114" x2="300" y2="200" stroke="#ff6b6b" strokeWidth="2.5" />
                    <polygon points="300,205 295,195 305,195" fill="#ff6b6b" />
                    <text x="250" y="165" textAnchor="middle"
                      fill="#ff6b6b" fontSize="11" fontFamily="Georgia, serif">
                      generates
                    </text>

                    {/* Bottom box: Superstructure / Ideas */}
                    <rect x="80" y="208" width="340" height="90" rx="10"
                      fill="rgba(60, 20, 20, 0.5)" stroke="#7a2020" strokeWidth="1.5" />
                    <text x="250" y="238" textAnchor="middle"
                      fill="#c09090" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Superstructure / Ideology
                    </text>
                    <text x="250" y="260" textAnchor="middle"
                      fill="#907070" fontSize="12" fontFamily="Georgia, serif">
                      Law, philosophy, religion, culture
                    </text>
                    <text x="250" y="280" textAnchor="middle"
                      fill="#907070" fontSize="11" fontFamily="Georgia, serif">
                      Reflects & legitimates material base
                    </text>

                    {/* Label */}
                    <text x="250" y="316" textAnchor="middle"
                      fill="#ff8080" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">
                      Marx: Materialist
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Flip Button */}
            <button
              onClick={handleFlip}
              disabled={animating}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#DC2626";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(220,38,38,0.15)";
                e.currentTarget.style.color = "#f0c0c0";
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                marginTop: "clamp(8px, 2vw, 16px)",
                padding: "clamp(9px, 1.5vw, 13px) clamp(20px, 3.5vw, 36px)",
                background: "rgba(220,38,38,0.15)",
                border: "2px solid #DC2626",
                borderRadius: "30px",
                color: "#f0c0c0",
                fontSize: "clamp(12px, 1.6vw, 15px)",
                fontFamily: "Georgia, serif",
                cursor: animating ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
                transition: "background 0.25s, color 0.25s, transform 0.2s",
                opacity: animating ? 0.6 : 1
              }}
            >
              {isFlipped ? "⟳ Restore Hegel" : "⟲ Invert with Marx"}
            </button>
          </div>

          {/* Core Argument prose */}
          <div style={{
            marginTop: "clamp(20px, 3.5vw, 32px)",
            borderTop: "1px solid rgba(220,38,38,0.15)",
            paddingTop: "clamp(16px, 2.5vw, 24px)"
          }}>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#d0b0b0",
              lineHeight: 1.8,
              margin: "0 0 14px 0"
            }}>
              Marx accepts Hegel's deepest insight — that human beings realize themselves through creative activity — but argues Hegel remains trapped in abstract philosophical speculation. The master-slave dialectic, for Marx, is not a drama of pure consciousness but a structural analysis of class: the worker labors, transforms the world, and yet finds the product of that labor owned by another, confronting her as an alien power. Alienation is not a spiritual condition to be overcome through philosophical recognition; it is a material condition inscribed in property relations.
            </p>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#d0b0b0",
              lineHeight: 1.8,
              margin: 0
            }}>
              The dialectical development of capitalism — concentrating workers in factories where they recognize shared interests, generating periodic crises, and steadily reducing the rate of profit — produces the material conditions for its own revolutionary transformation. But Marx's critique cuts deeper: Hegelian philosophy, by presenting existing social arrangements as the rational expression of Spirit, performs an ideological function, reconciling people to unjust conditions rather than illuminating the material contradictions that could transform them.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #DC262633",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#DC2626", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#DC2626" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#DC2626" : "#DC262655"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (() => {
            const c = concepts.find(x => x.id === hoveredConcept);
            return c ? (
              <div style={{ marginTop: 4 }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: "clamp(10px, 2vw, 16px)",
                }}>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid #DC262644",
                    borderTop: "3px solid #a06060",
                    borderRadius: "6px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#a06060", marginBottom: "8px" }}>
                      Hegel — {c.label}
                    </div>
                    <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>{c.hegel}</p>
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid #DC262644",
                    borderTop: "3px solid #DC2626",
                    borderRadius: "6px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#DC2626", marginBottom: "8px" }}>
                      Marx — {c.label}
                    </div>
                    <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>{c.marx}</p>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(25, 6, 6, 0.82)",
          border: "1px solid rgba(180, 60, 60, 0.2)",
          borderLeft: "4px solid #b03030",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b03030",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>
            The Difficulty
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#e8d0d0",
            lineHeight: 1.75,
            margin: "0 0 12px 0"
          }}>
            If Hegelian philosophy is partially ideological — if conceptual accounts of social reality can function to mystify rather than illuminate the conditions they describe — then the question spreads beyond politics and economics. Can any purely philosophical account of art, beauty, or cultural achievement escape similar charges? When Hegel declares that great art manifests Absolute Spirit in sensuous form, is he comprehending genuine human achievement or aestheticizing the products of conditions we should be transforming? The materialist suspicion, once introduced, colonizes every domain of philosophical inquiry.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: "#a07070",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: whether aesthetic theory can be grounded in anything beyond ideology — whether beauty itself might be the one domain where material conditions do not fully determine the meaning of human creation.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(20, 5, 5, 0.75)",
          border: "1px solid rgba(220, 38, 38, 0.18)",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setIsEchoesOpen(!isEchoesOpen)}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#DC2626",
              fontFamily: "Georgia, serif",
              fontWeight: "bold"
            }}>
              Real-World Echoes
            </span>
            {isEchoesOpen
              ? <ChevronUp size={18} color="#DC2626" />
              : <ChevronDown size={18} color="#DC2626" />
            }
          </button>

          {isEchoesOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)"
            }}>
              {[
                {
                  title: "Revolutionary Movements",
                  text: "The Russian, Chinese, and Cuban revolutionary movements explicitly drew on the Marxist-Hegelian historical dialectic — using the theory of contradictions within capitalism to time and justify political transformation. Mao's essay 'On Contradiction' is a direct engagement with Hegelian-Marxist dialectical logic applied to concrete historical conditions."
                },
                {
                  title: "Factory Concentration and Class Consciousness",
                  text: "Marx's prediction that concentrating workers in large industrial enterprises would generate class consciousness played out in the formation of trade unions and workers' parties. Shared conditions of labor — identical wages, identical hours, identical exposure to industrial hazards — created exactly the recognition of common interest that Marx derived from his inversion of Hegel's master-slave dialectic."
                },
                {
                  title: "Commodity Fetishism Today",
                  text: "Capital's analysis of commodity fetishism — social relations between people appearing as relations between things — finds its contemporary form in brand culture, financial derivatives, and algorithmic pricing, where the social labor producing value becomes invisible behind the spectacle of commodities. This directly parallels Hegel's account of consciousness mistaking its own products for independent, self-subsistent realities."
                },
                {
                  title: "The 11th Thesis in Practice",
                  text: "'The point is not to interpret the world but to change it' became the founding slogan of activist philosophy, from Frankfurt School critical theory to liberation theology to contemporary social movements. The tension between interpretation and transformation — between understanding conditions and mobilizing to change them — remains the central problem of politically engaged thought."
                }
              ].map((item, i) => (
                <div key={i} style={{
                  borderLeft: "2px solid rgba(220,38,38,0.35)",
                  paddingLeft: "clamp(12px, 2vw, 18px)",
                  marginBottom: i < 3 ? "clamp(14px, 2.5vw, 20px)" : 0
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    color: "#DC2626",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>
                    {item.title}
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    color: "#c8a8a8",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(20px, 4vw, 36px)",
          paddingBottom: "clamp(12px, 2vw, 20px)"
        }}>
          <span style={{
            fontSize: "clamp(10px, 1.3vw, 12px)",
            color: "#6a3030",
            letterSpacing: "0.1em"
          }}>
            ◆ Next: Absolute Spirit in Aesthetic Form ◆
          </span>
        </div>

      </div>
    </div>
  );
}

// ─── Part 16: The Twilight of Beauty ───
function EndOfArt() {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [mirrorClicked, setMirrorClicked] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#9D174D";

  const keyConcepts = [
    { id: "end_of_art_thesis", label: "End of Art Thesis", desc: "Hegel's provocative claim is that art has reached its historical end — not that creation ceases, but that art can no longer serve as the highest vehicle for Spirit's self-knowledge. In the modern period, reflective thought (philosophy) has superseded sensuous intuition as the proper medium for truth, leaving art to circle back on itself in self-reflexive critique." },
    { id: "symbolic_classical_romantic", label: "Symbolic / Classical / Romantic Art", desc: "These three art-forms trace the history of the relationship between spiritual content and sensuous form. In symbolic art they are inadequately matched; in classical art they achieve perfect harmony in the human body; in romantic art the spiritual content begins to overwhelm the sensuous medium, pointing beyond art toward religion and philosophy." },
    { id: "art_truth_revelation", label: "Art as Truth Revelation", desc: "For Hegel, great art is not mere decoration but a mode of truth — it makes absolute content (freedom, the divine, spirit's self-understanding) sensorially present and perceptible. The beautiful artwork is not beautiful in a merely aesthetic sense but because the Idea shines through its material form with particular clarity and completeness." },
    { id: "dissolution", label: "Dissolution of Art", desc: "Romantic art contains within itself the logic of its own dissolution: by progressively internalizing spiritual content and withdrawing from the sensuous surface, it produces art that is increasingly self-critical, ironic, and reflective. This culminates in the modern moment where art comments on art — the gallery's mirror as art's most honest self-portrait." },
    { id: "self_reflexivity", label: "Art's Self-Reflexivity", desc: "Post-romantic art becomes aware of its own historicity, its own conditions, its own contradictions. Rather than naively presenting the divine in sensuous form, it reflects on whether and how such presentation is still possible. This self-consciousness is a sign of art's intellectual maturity, but also of its supersession by philosophical thought." },
    { id: "cultural_fragmentation", label: "Cultural Fragmentation", desc: "Modern culture no longer has a single spiritual content that all art can coherently express — no shared mythology, sacred order, or communal self-understanding. This fragmentation means no sensuous form can hold what modernity's plural, individualistic spirit requires, and art proliferates into endless styles, each valid in its own terms, none authoritative." },
  ];

  const stages = [
    {
      id: "symbolic",
      label: "Symbolic",
      subtitle: "Egyptian Art",
      color: "#C4860A",
      x: 60,
      description: "Spiritual content strains against inadequate form. The pyramid points toward meaning it cannot fully express — spirit struggles to find itself in stone.",
      artworks: [
        { name: "The Pyramid", desc: "Form gestures toward infinite spirit but cannot contain it. The sphinx stares outward — a riddle that exceeds its own body." },
        { name: "The Sphinx", desc: "Half-human, half-animal: spirit is present but not yet fully individuated. The form is too material to capture what it seeks." }
      ]
    },
    {
      id: "classical",
      label: "Classical",
      subtitle: "Greek Art",
      color: "#C4A035",
      x: 230,
      description: "Perfect unity of spiritual content and sensuous form. The Greek statue of a god achieves the ideal — but only by limiting spirit to what beauty can embody.",
      artworks: [
        { name: "Apollo Belvedere", desc: "Spirit perfectly at home in its body. The divine is fully present — but divinity here is bounded by what human form can show." },
        { name: "The Parthenon", desc: "Proportion as truth. Form and content achieve equilibrium — yet this beauty cannot express the infinite depths that Christianity will demand." }
      ]
    },
    {
      id: "romantic",
      label: "Romantic",
      subtitle: "Christian & Modern",
      color: "#9D174D",
      x: 400,
      description: "Spirit recognizes the inadequacy of all sensuous form. The cathedral dematerializes stone into light — beauty is sacrificed for spiritual depth.",
      artworks: [
        { name: "Gothic Cathedral", desc: "Stone dissolved into light and height. The building reaches upward because spirit has recognized it cannot be at home in any finite form." },
        { name: "Dutch Interior", desc: "The mundane becomes spiritually charged — but precisely because spirit has retreated inward, away from public myth. Subjectivity deepens; sensuous unity fractures." }
      ]
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let animFrame;
    let particles = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: -Math.random() * 0.3 - 0.05,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    };
    initParticles();

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `#9D174D${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  const stageInfo = stages.find(s => s.id === activeStage);

  return (
    <div ref={containerRef} style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #3d0820 0%, #1a0510 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      position: "relative",
      overflowX: "hidden"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#9D174D",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 16 of 20 — Hegel's Aesthetics</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            color: "#f0e0e8",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            letterSpacing: "0.03em"
          }}>The Twilight of Beauty</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 16px)",
            color: "#b8909a",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5
          }}>Hegel's 'end of art' thesis: how art supersedes itself</p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #3d0820",
          borderLeft: "4px solid #9D174D",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#9D174D",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0d8",
            lineHeight: 1.75,
            margin: 0
          }}>
            The Hegelian-Marxist tension raises the question of whether purely aesthetic experience can achieve genuine truth — and more broadly, <em>what is the status of art in the development of absolute spirit?</em> If thought unfolds historically toward greater self-knowledge, where does sensuous beauty fit in a system that ends in pure conceptual comprehension? Can the image ever do what the concept does — and if so, at what cost to both?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 5, 10, 0.9)",
          border: "1px solid #3d0820",
          borderRadius: "8px",
          marginBottom: "clamp(20px, 4vw, 32px)",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "clamp(14px, 2.5vw, 24px)",
            borderBottom: "1px solid #2a0815"
          }}>
            <h2 style={{
              fontSize: "clamp(14px, 2.2vw, 20px)",
              color: "#f0dde5",
              margin: "0 0 6px 0",
              fontWeight: "normal"
            }}>The Museum of Spirit's Journey</h2>
            <p style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              color: "#9a7080",
              margin: 0,
              fontStyle: "italic"
            }}>Hover over each gallery to explore — click artworks for deeper detail — enter the Modern Room</p>
          </div>

          {/* Gallery SVG */}
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "0" }}>
              <svg
                viewBox="0 0 860 380"
                width="100%"
                style={{ display: "block" }}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <radialGradient id="floorGrad" cx="50%" cy="100%" r="60%">
                    <stop offset="0%" stopColor="#2a0815" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0a0508" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C4860A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C4860A" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glowRose" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9D174D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9D174D" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="wallGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2a1008" />
                    <stop offset="100%" stopColor="#0f0508" />
                  </linearGradient>
                  <linearGradient id="wallGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#221008" />
                    <stop offset="100%" stopColor="#0d0508" />
                  </linearGradient>
                  <linearGradient id="wallGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#200812" />
                    <stop offset="100%" stopColor="#0d040a" />
                  </linearGradient>
                  <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d1525" />
                    <stop offset="40%" stopColor="#5a2040" />
                    <stop offset="100%" stopColor="#2a0f1d" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Background */}
                <rect width="860" height="380" fill="url(#floorGrad)" />

                {/* Floor perspective lines */}
                <line x1="0" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="860" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="215" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="645" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Room 1: Symbolic (leftmost, largest in view) */}
                <g
                  onMouseEnter={() => setHoveredRoom("symbolic")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "symbolic" ? null : "symbolic")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="20" y="60" width="200" height="260" fill="url(#wallGrad1)"
                    stroke={activeStage === "symbolic" ? "#C4860A" : hoveredRoom === "symbolic" ? "#7a5505" : "#2a1008"}
                    strokeWidth={activeStage === "symbolic" ? "2" : "1"}
                  />
                  {hoveredRoom === "symbolic" && (
                    <rect x="20" y="60" width="200" height="260" fill="url(#glowGold)" />
                  )}
                  {/* Room label */}
                  <text x="120" y="90" textAnchor="middle" fill="#C4860A" fontSize="13" fontFamily="Georgia, serif" letterSpacing="2">SYMBOLIC</text>
                  <text x="120" y="107" textAnchor="middle" fill="#7a5530" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Egyptian</text>
                  {/* Pyramid artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("pyramid"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="55" y="130" width="80" height="100" fill="#1a0c06" stroke={hoveredArtwork === "pyramid" ? "#C4860A" : "#3d2010"} strokeWidth="1.5" />
                    {/* Pyramid shape */}
                    <polygon points="95,145 140,215 50,215" fill="#3d2810" stroke="#5a3a15" strokeWidth="1" />
                    <line x1="95" y1="145" x2="95" y2="215" stroke="#5a3a15" strokeWidth="0.5" strokeOpacity="0.5" />
                    {/* Ground */}
                    <rect x="50" y="215" width="90" height="5" fill="#2a1a08" />
                    {/* Glow on hover */}
                    {hoveredArtwork === "pyramid" && (
                      <rect x="55" y="130" width="80" height="100" fill="#C4860A" fillOpacity="0.07" />
                    )}
                    <text x="95" y="245" textAnchor="middle" fill="#7a5530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">The Pyramid</text>
                  </g>
                  {/* Sphinx artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("sphinx"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="145" y="150" width="65" height="80" fill="#1a0c06" stroke={hoveredArtwork === "sphinx" ? "#C4860A" : "#3d2010"} strokeWidth="1.5" />
                    {/* Sphinx silhouette */}
                    <ellipse cx="177" cy="205" rx="22" ry="12" fill="#3d2810" />
                    <circle cx="177" cy="183" r="12" fill="#3d2810" />
                    <rect x="165" y="193" width="24" height="12" fill="#3d2810" />
                    {hoveredArtwork === "sphinx" && (
                      <rect x="145" y="150" width="65" height="80" fill="#C4860A" fillOpacity="0.07" />
                    )}
                    <text x="178" y="245" textAnchor="middle" fill="#7a5530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">The Sphinx</text>
                  </g>
                  {/* Door to next room */}
                  <rect x="170" y="200" width="42" height="90" fill="#0f0608" stroke="#2a1008" strokeWidth="1" rx="2" />
                  <rect x="172" y="202" width="38" height="86" fill="#0d0507" />
                  <text x="191" y="310" textAnchor="middle" fill="#3d1520" fontSize="8" fontFamily="Georgia, serif">→</text>
                </g>

                {/* Room 2: Classical (middle) */}
                <g
                  onMouseEnter={() => setHoveredRoom("classical")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "classical" ? null : "classical")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="230" y="90" width="175" height="230" fill="url(#wallGrad2)"
                    stroke={activeStage === "classical" ? "#C4A035" : hoveredRoom === "classical" ? "#7a6605" : "#221008"}
                    strokeWidth={activeStage === "classical" ? "2" : "1"}
                  />
                  {hoveredRoom === "classical" && (
                    <rect x="230" y="90" width="175" height="230" fill="url(#glowGold)" />
                  )}
                  <text x="317" y="116" textAnchor="middle" fill="#C4A035" fontSize="12" fontFamily="Georgia, serif" letterSpacing="2">CLASSICAL</text>
                  <text x="317" y="131" textAnchor="middle" fill="#7a6530" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Greek</text>

                  {/* Apollo artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("apollo"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="255" y="150" width="70" height="100" fill="#18100a" stroke={hoveredArtwork === "apollo" ? "#C4A035" : "#302008"} strokeWidth="1.5" />
                    {/* Statue silhouette */}
                    <ellipse cx="290" cy="168" rx="9" ry="10" fill="#4a3820" />
                    <rect x="283" y="178" width="14" height="30" fill="#4a3820" />
                    <rect x="275" y="185" width="10" height="20" fill="#4a3820" />
                    <rect x="295" y="183" width="10" height="22" fill="#4a3820" />
                    <rect x="281" y="208" width="8" height="25" fill="#4a3820" />
                    <rect x="289" y="208" width="8" height="25" fill="#4a3820" />
                    {hoveredArtwork === "apollo" && (
                      <rect x="255" y="150" width="70" height="100" fill="#C4A035" fillOpacity="0.08" />
                    )}
                    <text x="290" y="263" textAnchor="middle" fill="#7a6530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Apollo</text>
                  </g>

                  {/* Parthenon artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("parthenon"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="335" y="165" width="58" height="85" fill="#18100a" stroke={hoveredArtwork === "parthenon" ? "#C4A035" : "#302008"} strokeWidth="1.5" />
                    {/* Temple columns */}
                    <rect x="340" y="220" width="48" height="20" fill="#3a2d15" />
                    <rect x="340" y="215" width="48" height="5" fill="#4a3a1a" />
                    {[0, 1, 2, 3, 4].map(i => (
                      <rect key={i} x={343 + i * 9} y="178" width="5" height="37" fill="#4a3a1a" />
                    ))}
                    <polygon points="340,178 388,178 364,168" fill="#4a3a1a" />
                    {hoveredArtwork === "parthenon" && (
                      <rect x="335" y="165" width="58" height="85" fill="#C4A035" fillOpacity="0.08" />
                    )}
                    <text x="364" y="262" textAnchor="middle" fill="#7a6530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Parthenon</text>
                  </g>

                  {/* Door */}
                  <rect x="375" y="215" width="22" height="75" fill="#0f0608" stroke="#221008" strokeWidth="1" rx="1" />
                </g>

                {/* Room 3: Romantic */}
                <g
                  onMouseEnter={() => setHoveredRoom("romantic")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "romantic" ? null : "romantic")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="410" y="115" width="150" height="205" fill="url(#wallGrad3)"
                    stroke={activeStage === "romantic" ? "#9D174D" : hoveredRoom === "romantic" ? "#5a0e2d" : "#200812"}
                    strokeWidth={activeStage === "romantic" ? "2" : "1"}
                  />
                  {hoveredRoom === "romantic" && (
                    <rect x="410" y="115" width="150" height="205" fill="url(#glowRose)" />
                  )}
                  <text x="485" y="138" textAnchor="middle" fill="#9D174D" fontSize="12" fontFamily="Georgia, serif" letterSpacing="2">ROMANTIC</text>
                  <text x="485" y="153" textAnchor="middle" fill="#6a2040" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Christian / Modern</text>

                  {/* Cathedral artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("cathedral"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="425" y="170" width="60" height="95" fill="#120608" stroke={hoveredArtwork === "cathedral" ? "#9D174D" : "#2a0815"} strokeWidth="1.5" />
                    {/* Cathedral silhouette */}
                    <polygon points="455,180 455,230 425,230" fill="#2a1020" />
                    <polygon points="455,180 485,230 455,230" fill="#2a1020" />
                    <rect x="437" y="200" width="10" height="30" fill="#200d18" />
                    <rect x="448" y="200" width="10" height="30" fill="#200d18" />
                    {/* Stained glass glow */}
                    <rect x="440" y="193" width="6" height="10" fill="#4a1030" />
                    <rect x="449" y="193" width="6" height="10" fill="#4a1030" />
                    <polygon points="455,178 449,190 461,190" fill="#1a0815" />
                    {hoveredArtwork === "cathedral" && (
                      <rect x="425" y="170" width="60" height="95" fill="#9D174D" fillOpacity="0.1" />
                    )}
                    <text x="455" y="277" textAnchor="middle" fill="#6a2040" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Cathedral</text>
                  </g>

                  {/* Dutch Interior artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("dutch"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="498" y="180" width="52" height="85" fill="#120608" stroke={hoveredArtwork === "dutch" ? "#9D174D" : "#2a0815"} strokeWidth="1.5" />
                    {/* Interior scene */}
                    <rect x="503" y="195" width="22" height="30" fill="#1a0d10" />
                    <rect x="506" y="198" width="8" height="12" fill="#3a1a20" />
                    <rect x="516" y="198" width="8" height="12" fill="#3a1a20" />
                    <ellipse cx="524" cy="215" rx="7" ry="9" fill="#2a1018" />
                    <line x1="524" y1="195" x2="524" y2="225" stroke="#3d1525" strokeWidth="0.5" />
                    {hoveredArtwork === "dutch" && (
                      <rect x="498" y="180" width="52" height="85" fill="#9D174D" fillOpacity="0.1" />
                    )}
                    <text x="524" y="277" textAnchor="middle" fill="#6a2040" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Dutch Interior</text>
                  </g>

                  {/* Door to modern */}
                  <rect x="545" y="215" width="12" height="65" fill="#0f0608" stroke="#200812" strokeWidth="1" rx="1" />
                </g>

                {/* Room 4: Modern / Mirror Room */}
                <g>
                  <rect x="565" y="135" width="125" height="185" fill="#0d0508"
                    stroke={mirrorClicked ? "#9D174D" : "#1a0810"}
                    strokeWidth={mirrorClicked ? "1.5" : "1"}
                  />
                  <text x="627" y="158" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#3d1525"} fontSize="11" fontFamily="Georgia, serif" letterSpacing="2">MODERN</text>

                  {/* Mirror */}
                  <g
                    onClick={() => setMirrorClicked(!mirrorClicked)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="590" y="175" width="74" height="95" rx="3" fill="url(#mirrorGrad)"
                      stroke={mirrorClicked ? "#9D174D" : "#3d1525"}
                      strokeWidth={mirrorClicked ? "2" : "1"}
                      filter="url(#softGlow)"
                    />
                    {/* Mirror reflection lines */}
                    <line x1="593" y1="178" x2="593" y2="267" stroke="#4a1a2d" strokeWidth="0.5" strokeOpacity="0.4" />
                    <line x1="597" y1="177" x2="590" y2="270" stroke="#4a1a2d" strokeWidth="0.3" strokeOpacity="0.3" />
                    {/* Reflected figure (abstract) */}
                    {mirrorClicked ? (
                      <>
                        <circle cx="627" cy="210" r="8" fill="none" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.6" />
                        <line x1="627" y1="218" x2="627" y2="245" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="615" y1="228" x2="639" y2="228" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.5" />
                        <text x="627" y="200" textAnchor="middle" fill="#9D174D" fontSize="10" fontFamily="Georgia, serif">?</text>
                      </>
                    ) : (
                      <>
                        <line x1="620" y1="195" x2="635" y2="265" stroke="#3d1525" strokeWidth="0.5" strokeOpacity="0.5" />
                        <line x1="625" y1="193" x2="630" y2="268" stroke="#4a1a2d" strokeWidth="0.4" strokeOpacity="0.3" />
                      </>
                    )}
                    {/* Mirror label */}
                    <text x="627" y="283" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#3d1525"} fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                      {mirrorClicked ? "Click again" : "Click mirror"}
                    </text>
                  </g>

                  {/* Empty room text */}
                  <text x="627" y="310" textAnchor="middle" fill="#2a0f1a" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">
                    {mirrorClicked ? "" : "(empty)"}
                  </text>
                </g>

                {/* Vanishing point / horizon glow */}
                <ellipse cx="430" cy="200" rx="60" ry="30" fill="#9D174D" fillOpacity="0.05" />

                {/* Labels below */}
                <text x="120" y="355" textAnchor="middle" fill="#5a3020" fontSize="10" fontFamily="Georgia, serif">Form ≠ Spirit</text>
                <text x="317" y="355" textAnchor="middle" fill="#5a5020" fontSize="10" fontFamily="Georgia, serif">Form = Spirit</text>
                <text x="485" y="355" textAnchor="middle" fill="#5a1535" fontSize="10" fontFamily="Georgia, serif">Form &lt; Spirit</text>
                <text x="627" y="355" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#2a0f1a"} fontSize="10" fontFamily="Georgia, serif">Spirit reflects</text>

                {/* Progression arrow */}
                <line x1="50" y1="370" x2="780" y2="370" stroke="#3d1525" strokeWidth="0.5" strokeOpacity="0.4" />
                <polygon points="780,367 790,370 780,373" fill="#3d1525" fillOpacity="0.4" />
                <text x="420" y="376" textAnchor="middle" fill="#3d1525" fontSize="9" fontFamily="Georgia, serif" letterSpacing="1">historical development of spirit →</text>
              </svg>
            </div>
          </div>

          {/* Mirror Revelation */}
          {mirrorClicked && (
            <div style={{
              margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
              padding: "clamp(14px, 2.5vw, 20px)",
              background: "rgba(30, 5, 18, 0.9)",
              border: "1px solid #9D174D",
              borderRadius: "6px",
              borderLeft: "3px solid #9D174D"
            }}>
              <div style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                color: "#9D174D",
                textTransform: "uppercase",
                marginBottom: "10px"
              }}>The Mirror Speaks</div>
              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#e0c0cc",
                lineHeight: 1.75,
                margin: 0,
                fontStyle: "italic"
              }}>
                "Art now reflects on itself rather than on ultimate truth. Where the pyramid could not contain its meaning, and the Greek statue fully embodied the divine, and the cathedral reached beyond all earthly form — modern art turns its gaze inward, toward its own conditions, its own making, its own inability to say what it once said. The artist becomes critic; the artwork becomes question. This is not death, but it is no longer the highest vocation."
              </p>
            </div>
          )}

          {/* Stage Detail Panel */}
          {activeStage && stageInfo && (
            <div style={{
              margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
              padding: "clamp(14px, 2.5vw, 20px)",
              background: "rgba(25, 5, 15, 0.9)",
              border: `1px solid ${stageInfo.color}`,
              borderRadius: "6px",
              borderLeft: `3px solid ${stageInfo.color}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px", flexWrap: "wrap" }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.18em",
                    color: stageInfo.color,
                    textTransform: "uppercase",
                    fontWeight: "bold"
                  }}>{stageInfo.label} Art</span>
                  <span style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#9a7080",
                    marginLeft: "12px",
                    fontStyle: "italic"
                  }}>{stageInfo.subtitle}</span>
                </div>
                <button
                  onClick={() => setActiveStage(null)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${stageInfo.color}`,
                    color: stageInfo.color,
                    cursor: "pointer",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >close</button>
              </div>
              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#e8d0d8",
                lineHeight: 1.75,
                margin: "0 0 16px 0"
              }}>{stageInfo.description}</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {stageInfo.artworks.map(aw => (
                  <div key={aw.name} style={{
                    flex: "1 1 180px",
                    padding: "clamp(10px, 1.8vw, 16px)",
                    background: "rgba(15, 5, 10, 0.7)",
                    border: `1px solid ${stageInfo.color}40`,
                    borderRadius: "4px"
                  }}>
                    <div style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: stageInfo.color,
                      marginBottom: "6px",
                      fontStyle: "italic"
                    }}>{aw.name}</div>
                    <p style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: "#c0a0b0",
                      lineHeight: 1.65,
                      margin: 0
                    }}>{aw.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artwork Tooltip */}
          {hoveredArtwork && !activeStage && (() => {
            const allArtworks = stages.flatMap(s => s.artworks.map(a => ({ ...a, stageColor: s.color })));
            const found = allArtworks.find(a => a.name.toLowerCase().replace(/ /g, "") === hoveredArtwork.replace(/ /g, "")
              || (hoveredArtwork === "pyramid" && a.name === "The Pyramid")
              || (hoveredArtwork === "sphinx" && a.name === "The Sphinx")
              || (hoveredArtwork === "apollo" && a.name === "Apollo Belvedere")
              || (hoveredArtwork === "parthenon" && a.name === "The Parthenon")
              || (hoveredArtwork === "cathedral" && a.name === "Gothic Cathedral")
              || (hoveredArtwork === "dutch" && a.name === "Dutch Interior")
            );
            if (!found) return null;
            return (
              <div style={{
                margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
                padding: "clamp(10px, 1.8vw, 16px)",
                background: "rgba(20, 5, 12, 0.95)",
                border: `1px solid ${found.stageColor}60`,
                borderRadius: "5px",
                borderLeft: `2px solid ${found.stageColor}`
              }}>
                <div style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: found.stageColor,
                  marginBottom: "6px",
                  fontStyle: "italic"
                }}>{found.name}</div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#c0a0b0",
                  lineHeight: 1.65,
                  margin: 0
                }}>{found.desc}</p>
              </div>
            );
          })()}

          {/* Core argument prose */}
          <div style={{
            padding: "clamp(14px, 2.5vw, 24px)",
            borderTop: "1px solid #2a0815"
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              color: "#9a7080",
              lineHeight: 1.8,
              margin: 0
            }}>
              Each gallery represents a historical stage in art's self-understanding. Click a room to explore the relationship between spiritual content and sensuous form. The logic is cumulative: each stage achieves more spiritual depth at the cost of sensuous perfection, until romantic art reaches a point where the spiritual content <em>exceeds what any sensuous form can hold</em> — and art quietly turns to face itself. The modern room's mirror is not a failure of art but its own most honest statement.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Particle canvas background accent */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none"
        }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #3d0820",
          borderLeft: "4px solid #6b0f35",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#6b0f35",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0d8",
            lineHeight: 1.75,
            margin: "0 0 14px 0"
          }}>
            If art has been superseded as the primary vehicle of cultural truth, how should we understand the nature of aesthetic experience and the specific capacities of different art forms — and what does Hegel's systematic aesthetics reveal about the relationship between beauty, truth, and meaning? The end of art thesis does not simply devalue art; it raises sharper questions about what different arts can do that philosophy cannot. Architecture, music, poetry, painting — each has a distinct relationship to sensuousness and concept. Does Hegel's own careful analysis of these arts undermine his broader claim that they have been surpassed?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#9a7080",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: a systematic account of the individual arts themselves — architecture as the most material, music as the most immaterial, poetry as the art that nearly dissolves into thought — and their specific powers to carry or exceed the spiritual content that Hegel has shown art at its limit cannot finally hold.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #2a0815",
          borderRadius: "6px",
          overflow: "hidden",
          position: "relative",
          zIndex: 2
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif"
            }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              color: "#9D174D",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}>Real-World Echoes</div>
            {echoesOpen
              ? <ChevronUp size={16} color="#9D174D" />
              : <ChevronDown size={16} color="#9D174D" />
            }
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)" }}>
              {[
                {
                  title: "Egyptian Pyramids & Sphinxes",
                  body: "The pyramids are Hegel's paradigm case of symbolic art: their form (massive, geometrically pure, inhuman in scale) points toward a spiritual meaning it cannot quite articulate. The sphinx — part human, part animal — embodies the riddle of spirit not yet individuated. Meaning exceeds and strains against the stone."
                },
                {
                  title: "Greek Statues of Gods & Heroes",
                  body: "The Apollo Belvedere or the sculptures of the Parthenon represent, for Hegel, the highest achievement of art's proper vocation: the perfect unity of spiritual content and sensuous form. The god is fully present in the marble — but this also means divinity is bounded by what a beautiful human body can express."
                },
                {
                  title: "Medieval Cathedrals",
                  body: "Gothic architecture enacts the romantic dissolution of matter into spirit: stone is carved into lacework, walls become windows, height replaces horizontal enclosure. The building reaches, rather than rests. This is Christian art recognizing that no finite form can contain the infinite — sensuous beauty is sacrificed to spiritual yearning."
                },
                {
                  title: "Contemporary Art & Democratic Societies",
                  body: "Modern debates about art's role in democracy echo Hegel's thesis: when art becomes primarily critical, ironic, or self-referential — when it reflects on its own conditions rather than embodying shared cultural truth — it has entered the self-reflexive mode that Hegel predicted. Contemporary art's turn to institutional critique, conceptualism, and post-medium practice all confirm that art now operates in philosophy's neighborhood."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 3 ? "clamp(12px, 2vw, 18px)" : 0,
                  padding: "clamp(12px, 2vw, 18px)",
                  background: "rgba(15, 5, 10, 0.6)",
                  border: "1px solid #2a0815",
                  borderRadius: "4px"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#d4a0b5",
                    marginBottom: "8px",
                    fontStyle: "italic"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9a7080",
                    lineHeight: 1.75,
                    margin: 0
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          marginTop: "clamp(20px, 3vw, 28px)",
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#3d1525",
          letterSpacing: "0.1em"
        }}>
          Part 16 of 20 · Hegel's Complete Philosophical System
        </div>
      </div>
    </div>
  );
}

// ─── Part 17: The Realm of Sensuous Knowing ───
function HegelianAesthetics() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [echoesHovered, setEchoesHovered] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#7E22CE";

  const keyConcepts = [
    { id: "beauty_sensuous", label: "Beauty as Sensuous Appearance", desc: "For Hegel, beauty is not a subjective pleasure response but the Idea's sensuous shining — the moment when rational content makes itself perceptible in material form. A work is beautiful when spirit and matter are so fully integrated that the form seems to emanate necessarily from its content, and the content appears self-evidently in the form." },
    { id: "five_art_forms", label: "Architecture / Sculpture / Painting / Music / Poetry", desc: "Hegel's five art forms are ranked by the ratio of spiritual to material content. Architecture is most material (stone serving symbol); sculpture achieves the perfect classical balance in the human body; painting, music, and poetry progressively dematerialize, moving from visual surface to temporal sound to pure conceptual language — tracing art's own internal development toward spirit." },
    { id: "form_content", label: "Form and Content", desc: "The central aesthetic problem for Hegel is the relationship between spiritual content (what the artwork means, what it expresses) and sensuous form (the specific material in which it is expressed). Great art achieves their perfect unity; failed or transitional art shows a gap — either the form overwhelms the content (mere decoration) or the content exceeds the form (the failure of romantic art)." },
    { id: "inner_life", label: "Inner Life vs. External Representation", desc: "Painting and music begin to portray inner subjectivity — emotion, psychological depth, individual character — rather than the objective external world of architecture and sculpture. This shift marks a crucial transition: art starts to reflect on the interior life of the human spirit, a project that ultimately requires language and concept, not sensuous form." },
    { id: "temporal_spatial", label: "Temporal vs. Spatial Arts", desc: "A fundamental division in the arts distinguishes spatial forms (architecture, sculpture, painting — which exist simultaneously in space) from temporal forms (music, poetry — which unfold through time). This division maps onto the increasing internalization of art: time is the medium of subjective consciousness, and the temporal arts are closer to spirit's own mode of being." },
    { id: "poetic_language", label: "Poetic Language", desc: "Poetry is the highest art form for Hegel because it uses the most dematerialized medium — language, the element of thought itself. Poetic language still has sensuous qualities (rhythm, sound, image) but its primary medium is meaning, making it the art form closest to philosophy. Poetry is art on the threshold of its own supersession." },
  ];

  const artForms = [
    {
      id: "architecture",
      label: "Architecture",
      icon: "⬛",
      symbol: "▲",
      position: 0,
      material: "Stone, wood, space — massive physical matter shaped into enclosures and monuments.",
      strength: "Commands awe through sheer weight and proportion; creates sacred spatial relationships between humanity and the infinite.",
      limitation: "Cannot represent living beings or inner life — spirit remains imprisoned in inert matter, pointing beyond itself but unable to speak.",
      example: "Egyptian pyramids encasing the dead in geometric immensity; Greek temples whose columns enact rational harmony between earth and sky.",
      sensuousness: 0.95,
      spirituality: 0.15,
    },
    {
      id: "sculpture",
      label: "Sculpture",
      icon: "🗿",
      symbol: "◆",
      position: 1,
      material: "Marble, bronze — three-dimensional form carved or cast into the likeness of living beings.",
      strength: "Achieves perfect unity of spiritual content and sensuous form in the idealized human body; the divine made touchable.",
      limitation: "Locked in spatial stillness — the inner life of thought and feeling cannot move through stone; color and expression remain absent.",
      example: "Greek kouros figures and Phidias's Athena: the serene, idealized human form as the adequate sensuous vessel for classical divinity.",
      sensuousness: 0.78,
      spirituality: 0.38,
    },
    {
      id: "painting",
      label: "Painting",
      icon: "🎨",
      symbol: "●",
      position: 2,
      material: "Pigment on flat surface — two dimensions, light, color, and pictorial illusion.",
      strength: "Represents interiority: the play of light across a face, grief in the eyes, devotion in a gesture — the psychological becomes visible.",
      limitation: "Still bound to spatial representation; the inner life depicted remains frozen in a moment, incapable of true temporal unfolding.",
      example: "Raphael's Madonnas and Leonardo's sfumato: spiritual luminosity rendered through color gradients that dissolve material boundaries.",
      sensuousness: 0.60,
      spirituality: 0.58,
    },
    {
      id: "music",
      label: "Music",
      icon: "♪",
      symbol: "♫",
      position: 3,
      material: "Tone, rhythm, duration — vibrations unfolding through time with no spatial extension.",
      strength: "Directly embodies the movement of inner life — joy, longing, grief — without needing to represent anything external at all.",
      limitation: "Lacks determinate content; music's emotion is real but vague, unable to articulate the specific conceptual truths spirit must know.",
      example: "Bach's counterpoint as mathematical feeling; Beethoven's late quartets where purely sonic development mirrors the dialectic of consciousness.",
      sensuousness: 0.42,
      spirituality: 0.72,
    },
    {
      id: "poetry",
      label: "Poetry",
      icon: "✍",
      symbol: "✦",
      position: 4,
      material: "Language — the most spiritual of all materials, combining sound with determinate conceptual meaning.",
      strength: "Unites temporal sensuousness with articulate conceptual content; can represent any subject, any inner state, any idea in vivid particularity.",
      limitation: "In achieving the highest synthesis, poetry approaches philosophy — its very power reveals that art's sensuous medium is finally inadequate for absolute truth.",
      example: "Dante's Divine Comedy and Shakespeare's tragedies: language that thinks while it sings, where concept and image are inseparable.",
      sensuousness: 0.22,
      spirituality: 0.92,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    let animFrame;
    let particles = [];

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.35 + 0.05,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#7E22CE`;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animFrame = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const getBarColor = (art, type) => {
    if (type === "sensuous") {
      const val = art.sensuousness;
      if (val > 0.7) return "#7E22CE";
      if (val > 0.4) return "#9333EA";
      return "#C084FC";
    } else {
      const val = art.spirituality;
      if (val > 0.7) return "#D4AF37";
      if (val > 0.4) return "#B8962E";
      return "#8B6914";
    }
  };

  const isSelected = (id) => selectedArt === id;
  const isHovered = (id) => hoveredArt === id;

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at 40% 30%, #2d0a5e 0%, #0a0a0f 70%)",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        color: "#e8e0f0",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      }}
    >
      <div
        style={{
          maxWidth: "min(90vw, 860px)",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 40px)" }}>
          <div
            style={{
              fontSize: "clamp(10px, 1.4vw, 12px)",
              letterSpacing: "0.25em",
              color: "#9F7AEA",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Part 17 of 20 · Hegel's Philosophical System
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: "normal",
              color: "#f0e8ff",
              margin: "0 0 10px",
              letterSpacing: "0.02em",
            }}
          >
            The Realm of Sensuous Knowing
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "#b89fd4",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontStyle: "italic",
            }}
          >
            Hegel's systematic aesthetics analyzes how each art form — architecture, sculpture,
            painting, music, poetry — has its own material, expressive possibilities, and
            historical trajectory.
          </p>
        </div>

        {/* Problem Panel */}
        <div
          style={{
            background: "#0f0a1a",
            border: "1px solid #2a1a40",
            borderLeft: "4px solid #7E22CE",
            borderRadius: "6px",
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7E22CE",
              marginBottom: "12px",
              fontVariant: "small-caps",
            }}
          >
            The Problem
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              lineHeight: "1.8",
              color: "#cfc0e8",
              margin: 0,
            }}
          >
            If art has been superseded as cultural authority, we still need a detailed account of
            what different art forms can and cannot achieve — how does Hegel's systematic
            philosophy of specific art forms illuminate the relationship between aesthetic and
            other forms of human understanding? The urgency is real: without this analysis, the
            death of art remains an empty proclamation, and the particular glories of architecture,
            music, and poetry remain philosophically unaccounted for.
          </p>
        </div>

        {/* Main Visualization */}
        <div
          style={{
            background: "#0c0817",
            border: "1px solid #2a1a40",
            borderRadius: "8px",
            padding: "clamp(16px, 3vw, 32px)",
            marginBottom: "clamp(20px, 3vw, 32px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Canvas background */}
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: "normal",
                color: "#e0d0f8",
                margin: "0 0 6px",
                textAlign: "center",
              }}
            >
              The Five Art Forms: From Matter to Spirit
            </h2>
            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#9070b0",
                textAlign: "center",
                margin: "0 0 clamp(16px, 3vw, 28px)",
                fontStyle: "italic",
              }}
            >
              Click each form to explore its material, strength, limitation, and historical example.
            </p>

            {/* Gradient axis labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(9px, 1.3vw, 11px)",
                  color: "#7E22CE",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ← Sensuous Immediacy
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 1.3vw, 11px)",
                  color: "#D4AF37",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Spiritual Adequacy →
              </div>
            </div>

            {/* Gradient bar */}
            <div
              style={{
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #7E22CE, #3b1878, #8B6914, #D4AF37)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                opacity: 0.7,
              }}
            />

            {/* Art form cards row */}
            <div
              style={{
                display: "flex",
                gap: "clamp(6px, 1.5vw, 14px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                flexWrap: "nowrap",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              {artForms.map((art) => {
                const active = isSelected(art.id);
                const hovered = isHovered(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArt(active ? null : art.id)}
                    onMouseEnter={() => setHoveredArt(art.id)}
                    onMouseLeave={() => setHoveredArt(null)}
                    style={{
                      flex: "1 0 clamp(54px, 14vw, 130px)",
                      minWidth: "54px",
                      cursor: "pointer",
                      background: active
                        ? "rgba(126,34,206,0.22)"
                        : hovered
                        ? "rgba(126,34,206,0.12)"
                        : "rgba(20,12,36,0.7)",
                      border: active
                        ? "1px solid #7E22CE"
                        : hovered
                        ? "1px solid #5b1f9a"
                        : "1px solid #2a1a40",
                      borderRadius: "6px",
                      padding: "clamp(10px, 1.8vw, 18px) clamp(6px, 1.2vw, 12px)",
                      textAlign: "center",
                      transition: "all 0.22s ease",
                      boxShadow: active
                        ? "0 0 18px rgba(126,34,206,0.35)"
                        : hovered
                        ? "0 0 10px rgba(126,34,206,0.2)"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(20px, 3.5vw, 32px)",
                        marginBottom: "6px",
                        lineHeight: 1,
                      }}
                    >
                      {art.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(10px, 1.4vw, 13px)",
                        color: active ? "#d4b8ff" : "#a08ac0",
                        fontWeight: active ? "bold" : "normal",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {art.label}
                    </div>

                    {/* Mini bars */}
                    <div style={{ marginTop: "10px" }}>
                      <div
                        style={{
                          fontSize: "clamp(8px, 1.1vw, 10px)",
                          color: "#6a5080",
                          marginBottom: "3px",
                          textAlign: "left",
                        }}
                      >
                        Sens.
                      </div>
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          background: "#1a1028",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.sensuousness * 100}%`,
                            borderRadius: "2px",
                            background: "#7E22CE",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(8px, 1.1vw, 10px)",
                          color: "#6a5080",
                          marginBottom: "3px",
                          textAlign: "left",
                        }}
                      >
                        Spirit.
                      </div>
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.spirituality * 100}%`,
                            borderRadius: "2px",
                            background: "#D4AF37",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SVG dual-axis chart */}
            <svg
              viewBox="0 0 500 100"
              width="100%"
              style={{ display: "block", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              <defs>
                <linearGradient id="sensBg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="spirBg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="500" height="100" fill="url(#sensBg)" />
              <rect x="0" y="0" width="500" height="100" fill="url(#spirBg)" />

              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={50 + i * 100}
                  y1="0"
                  x2={50 + i * 100}
                  y2="100"
                  stroke="#2a1a40"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}

              {/* Sensuous line */}
              <polyline
                points={artForms
                  .map((a, i) => `${50 + i * 100},${100 - a.sensuousness * 85}`)
                  .join(" ")}
                fill="none"
                stroke="#7E22CE"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Spiritual line */}
              <polyline
                points={artForms
                  .map((a, i) => `${50 + i * 100},${100 - a.spirituality * 85}`)
                  .join(" ")}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {artForms.map((art, i) => (
                <g key={art.id}>
                  <circle
                    cx={50 + i * 100}
                    cy={100 - art.sensuousness * 85}
                    r={selectedArt === art.id ? 7 : 4.5}
                    fill={selectedArt === art.id ? "#7E22CE" : "#4a1580"}
                    stroke="#7E22CE"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s ease" }}
                  />
                  <circle
                    cx={50 + i * 100}
                    cy={100 - art.spirituality * 85}
                    r={selectedArt === art.id ? 7 : 4.5}
                    fill={selectedArt === art.id ? "#D4AF37" : "#6b4c10"}
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s ease" }}
                  />
                </g>
              ))}

              {/* Labels */}
              {artForms.map((art, i) => (
                <text
                  key={art.id}
                  x={50 + i * 100}
                  y="98"
                  textAnchor="middle"
                  fontSize="7"
                  fill={selectedArt === art.id ? "#d4b8ff" : "#6a5080"}
                  fontFamily="Georgia, serif"
                >
                  {art.label}
                </text>
              ))}

              {/* Legend */}
              <circle cx="12" cy="12" r="4" fill="#7E22CE" />
              <text x="20" y="16" fontSize="7" fill="#9370c8" fontFamily="Georgia, serif">
                Sensuousness
              </text>
              <circle cx="12" cy="26" r="4" fill="#D4AF37" />
              <text x="20" y="30" fontSize="7" fill="#b8982e" fontFamily="Georgia, serif">
                Spirituality
              </text>
            </svg>

            {/* Expanded card */}
            {selectedArt && (() => {
              const art = artForms.find((a) => a.id === selectedArt);
              return (
                <div
                  style={{
                    background: "rgba(20,10,40,0.92)",
                    border: "1px solid #7E22CE",
                    borderRadius: "8px",
                    padding: "clamp(14px, 2.5vw, 26px)",
                    marginTop: "4px",
                    boxShadow: "0 0 24px rgba(126,34,206,0.25)",
                    animation: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>{art.icon}</span>
                    <h3
                      style={{
                        fontSize: "clamp(15px, 2.2vw, 20px)",
                        color: "#e0d0f8",
                        margin: 0,
                        fontWeight: "normal",
                      }}
                    >
                      {art.label}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                      gap: "clamp(10px, 2vw, 18px)",
                    }}
                  >
                    {[
                      { label: "Material", text: art.material, color: "#9F7AEA" },
                      { label: "Expressive Strength", text: art.strength, color: "#68D391" },
                      { label: "Inherent Limitation", text: art.limitation, color: "#F6AD55" },
                      { label: "Historical Example", text: art.example, color: "#D4AF37" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          background: "rgba(126,34,206,0.07)",
                          border: "1px solid #2a1a40",
                          borderRadius: "5px",
                          padding: "clamp(10px, 1.8vw, 16px)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(9px, 1.2vw, 11px)",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: item.color,
                            marginBottom: "8px",
                          }}
                        >
                          {item.label}
                        </div>
                        <p
                          style={{
                            fontSize: "clamp(12px, 1.6vw, 14px)",
                            color: "#c8b8e0",
                            lineHeight: "1.7",
                            margin: 0,
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Duality bars */}
                  <div style={{ marginTop: "16px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 0 140px" }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.2vw, 11px)",
                          color: "#7E22CE",
                          marginBottom: "5px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Sensuous Immediacy — {Math.round(art.sensuousness * 100)}%
                      </div>
                      <div
                        style={{
                          height: "8px",
                          borderRadius: "4px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.sensuousness * 100}%`,
                            borderRadius: "4px",
                            background: "linear-gradient(to right, #4a1580, #7E22CE)",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: "1 0 140px" }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.2vw, 11px)",
                          color: "#D4AF37",
                          marginBottom: "5px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Spiritual Adequacy — {Math.round(art.spirituality * 100)}%
                      </div>
                      <div
                        style={{
                          height: "8px",
                          borderRadius: "4px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.spirituality * 100}%`,
                            borderRadius: "4px",
                            background: "linear-gradient(to right, #6b4c10, #D4AF37)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Core argument prose */}
            <div
              style={{
                marginTop: "clamp(16px, 2.5vw, 24px)",
                padding: "clamp(14px, 2vw, 20px)",
                background: "rgba(14,8,26,0.7)",
                borderRadius: "6px",
                border: "1px solid #1e1230",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  lineHeight: "1.85",
                  color: "#b8a8d0",
                  margin: 0,
                }}
              >
                Hegel's aesthetics is grounded in the conviction that genuine art achieves{" "}
                <span style={{ color: "#c084fc", fontStyle: "italic" }}>truth revelation</span> —
                not mere decoration or entertainment — by making universal spiritual content
                present through particular sensuous forms. Moving from architecture through sculpture,
                painting, and music to poetry, each art form trades increasing sensuous presence
                for increasing capacity to articulate the inner life of spirit. The progression is
                not simply historical but{" "}
                <span style={{ color: "#c084fc", fontStyle: "italic" }}>logical</span>: each
                form both fulfills and surpasses the one before it, until poetry's linguistic
                medium — the most spiritual of materials — itself begins to dissolve into pure
                philosophical thought.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div
          style={{
            background: "#0d0818",
            border: "1px solid #2a1a40",
            borderLeft: "4px solid #9333EA",
            borderRadius: "6px",
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9333EA",
              marginBottom: "12px",
              fontVariant: "small-caps",
            }}
          >
            The Difficulty
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              lineHeight: "1.8",
              color: "#cfc0e8",
              margin: "0 0 14px",
            }}
          >
            The detailed analysis of art and aesthetic experience raises the broader question of
            alienation: when cultural achievements appear as monuments to past greatness rather
            than living expressions of creativity, how does this aesthetic alienation relate to
            the wider phenomenon of estrangement in human experience? The pyramids and cathedrals
            that once embodied a living spiritual world now stand before us as magnificent but
            distant — we can analyze them but no longer inhabit their world. Art's supersession
            is not merely a philosophical thesis but a lived condition: the museum replaces the
            temple, the concert hall replaces communal ritual, and appreciation substitutes for
            genuine spiritual participation.
          </p>
          <p
            style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#8b6aaa",
              fontStyle: "italic",
              margin: 0,
              lineHeight: "1.7",
            }}
          >
            This pressure forces the next development: a reckoning with alienation itself — the
            structure of consciousness estranged from its own products — which will demand a
            philosophical account of how spirit returns to itself through the very estrangement
            it has created.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div
          style={{
            background: "#0d0818",
            border: "1px solid #2a1a40",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={() => setEchoesHovered(true)}
            onMouseLeave={() => setEchoesHovered(false)}
            style={{
              width: "100%",
              background: echoesHovered ? "rgba(126,34,206,0.08)" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7E22CE",
                fontFamily: "Georgia, serif",
                fontVariant: "small-caps",
              }}
            >
              Real-World Echoes
            </span>
            {echoesOpen ? (
              <ChevronUp size={16} color="#7E22CE" />
            ) : (
              <ChevronDown size={16} color="#7E22CE" />
            )}
          </button>

          {echoesOpen && (
            <div
              style={{
                padding: "0 clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 22px)",
                borderTop: "1px solid #1e1230",
              }}
            >
              {[
                {
                  title: "Egyptian Pyramids",
                  text: "The Great Pyramid of Giza embodies symbolic architecture at its most extreme: geometric immensity expressing the weight of death and eternity, where spirit is wholly consumed by its inert material shell.",
                },
                {
                  title: "Greek Temples",
                  text: "The Parthenon creates sacred space through mathematical proportions — columns whose measured intervals enact rational harmony between earth and sky, spirit at home in its sensuous form.",
                },
                {
                  title: "Renaissance Masters",
                  text: "Raphael's Sistine Madonna and Leonardo's Virgin of the Rocks render spiritual luminosity through color and light — interiority made visible, the divine accessible through the particular human face.",
                },
                {
                  title: "Gothic Cathedrals",
                  text: "Chartres and Amiens dematerialize stone into light-filled space: flying buttresses transfer weight outward so that walls dissolve into stained glass, matter yearning to transcend itself into pure luminosity.",
                },
              ].map((echo, i) => (
                <div
                  key={i}
                  style={{
                    marginTop: "14px",
                    paddingLeft: "14px",
                    borderLeft: "2px solid #3a1a60",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: "#9F7AEA",
                      marginBottom: "4px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {echo.title}
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.6vw, 14px)",
                      color: "#a090c0",
                      lineHeight: "1.7",
                      margin: 0,
                    }}
                  >
                    {echo.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            padding: "clamp(10px, 2vw, 16px) 0",
          }}
        >
          <p
            style={{
              fontSize: "clamp(10px, 1.4vw, 12px)",
              color: "#4a3a60",
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            "The beauty of art is beauty born of the spirit and born again..." — Hegel, Aesthetics
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Part 18: The Experience of Estrangement ───
function Alienation() {
  const [selectedSphere, setSelectedSphere] = useState(null);
  const [alienationStates, setAlienationStates] = useState({
    nature: 1,
    society: 1,
    culture: 1,
    religion: 1,
  });
  const [timelineValue, setTimelineValue] = useState(0);
  const [hoveredSphere, setHoveredSphere] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredEcho, setHoveredEcho] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const accent = "#065F46";

  const keyConcepts = [
    { id: "entfremdung", label: "Alienation (Entfremdung)", desc: "Entfremdung is Hegel's term for the condition in which consciousness encounters its own products, activities, or expressions as alien, independent powers standing over against it. Alienation is not a mere psychological feeling of estrangement but a structural condition: what is genuinely human appears as inhuman, what is one's own appears as foreign." },
    { id: "natural_alienation", label: "Natural Alienation", desc: "The most immediate form of alienation is humanity's encounter with nature as an external, indifferent force. Before human activity transforms it, nature is simply there — resistant, given, not yet permeated by human purpose. The first overcoming of this alienation is labor: the act by which consciousness imprints itself on natural material and begins to recognize itself in it." },
    { id: "social_alienation", label: "Social Alienation", desc: "In civil society, the market economy confronts individuals as an impersonal system with laws of its own — supply, demand, competition — that no one designed and no one controls. Individuals produce this system through their own activity yet experience it as an alien force dictating the conditions of their existence. This is the form of alienation that Marx would later radicalize." },
    { id: "religious_alienation", label: "Religious Alienation", desc: "Religious consciousness projects human spiritual powers and capacities onto a transcendent divine being, then experiences those capacities as belonging to God rather than to humanity itself. For Hegel, this is alienation at its most profound: the best of what is human (rationality, love, creative power) appears as the exclusive property of an alien supernatural entity." },
    { id: "cultural_alienation", label: "Cultural Alienation", desc: "In the Phenomenology's chapter on culture (Bildung), Hegel traces how the individual must alienate her natural immediacy — her unreflective desires and assumptions — in order to become genuinely formed by and for the social world. This alienation from oneself is the price of genuine culture: the natural self must die so the cultivated, socially aware self can live." },
    { id: "mediated_immediacy", label: "Mediated Immediacy as Resolution", desc: "The resolution of alienation is not a return to pre-alienated innocence but what Hegel calls mediated immediacy: a form of relationship that has passed through estrangement and reflection and arrived at genuine recognition within concrete institutions. The worker who understands the system, the citizen who participates in the rational state — these are reconciled to what was once alien, not by ignorance but by comprehension." },
  ];

  const sphereData = {
    nature: {
      label: "Nature",
      angle: -90,
      color: "#065F46",
      description:
        "Ordinary consciousness treats the external world as simply given — as a collection of independent objects with fixed properties. But nature as we encounter it is already shaped by human categories and activity. The alienation from nature consists in forgetting this world-constituting work, experiencing our own structuring activity as an alien, overwhelming force standing over against us.",
      arrowDir: "alienated",
    },
    society: {
      label: "Society",
      angle: 0,
      color: "#047857",
      description:
        "Social institutions — markets, laws, bureaucracies — are products of collective human activity, yet appear as impersonal mechanisms obeying their own iron logic. Workers experience market forces as beyond their influence. Citizens feel governed by systems no one designed. This is social alienation: human cooperative activity crystallized into structures that seem to oppose their creators.",
      arrowDir: "alienated",
    },
    culture: {
      label: "Culture",
      angle: 90,
      color: "#059669",
      description:
        "Cultural traditions, artworks, and intellectual achievements accumulate into a heritage that can feel like dead weight rather than living resource. When we encounter the past only as museum pieces — objects of scholarly study rather than vital expressions — cultural alienation has set in. The spirit that animated a tradition has withdrawn, leaving only its outer form.",
      arrowDir: "alienated",
    },
    religion: {
      label: "Religion",
      angle: 180,
      color: "#10B981",
      description:
        "Religious alienation projects human capacities onto a transcendent beyond — what Feuerbach would later analyze systematically. God appears as the repository of all perfections that humanity has stripped from itself. The divine is humanity's own essence experienced as external sovereign. Hegel sees this not as simple error but as a necessary stage in self-knowledge.",
      arrowDir: "alienated",
    },
  };

  const getRecognitionLevel = (sphereKey) => {
    const timelineEffect = timelineValue / 100;
    const clickEffect = alienationStates[sphereKey];
    return Math.max(0, Math.min(1, timelineEffect * 0.8 + (1 - clickEffect) * 0.2));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeObserver = new ResizeObserver(() => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles(canvas.width, canvas.height);
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const initParticles = (w, h) => {
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.05,
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#065F46`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const toggleSphere = (key) => {
    setAlienationStates((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
    setSelectedSphere((prev) => (prev === key ? null : key));
  };

  const cx = 50;
  const cy = 50;
  const orbitR = 32;
  const sphereR = 9;
  const centerR = 7;

  const getPos = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const keys = Object.keys(sphereData);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #022c22 0%, #071a12 40%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
        color: "#d1fae5",
      }}
    >
      <div
        style={{
          maxWidth: "min(90vw, 860px)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px, 3vw, 32px)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "clamp(10px, 1.4vw, 12px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6ee7b7",
              marginBottom: "8px",
            }}
          >
            Part 18 of 20 — Hegel's System
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: "bold",
              color: "#ecfdf5",
              margin: "0 0 10px 0",
              lineHeight: 1.2,
            }}
          >
            The Experience of Estrangement
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "#a7f3d0",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            Alienation is not merely a feeling of dissatisfaction but a necessary stage in human
            development through which consciousness discovers the inadequacy of immediate
            relationships and drives toward more adequate forms of self-realization.
          </p>
        </div>

        {/* Problem Panel */}
        <div
          style={{
            background: "#0d1f18",
            border: "1px solid #064e3b",
            borderLeft: "4px solid #065F46",
            borderRadius: "8px",
            padding: "clamp(16px, 3vw, 28px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6ee7b7",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            The Problem
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#d1fae5",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            The systematic aesthetics raises the question of cultural alienation — when artworks
            appear as monuments to the past rather than living expressions — which connects to the
            broader phenomenon of estrangement throughout human experience. If art can become a
            dead letter, what prevents every human achievement from fossilizing into an alien
            power? The pressure here is urgent: something produced by human activity turns against
            its producers, and no domain of life seems immune to this reversal.
          </p>
        </div>

        {/* Main Visualization */}
        <div
          style={{
            background: "#0b1e16",
            border: "1px solid #065F46",
            borderRadius: "12px",
            padding: "clamp(16px, 3vw, 32px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={containerRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "clamp(12px, 2vw, 20px)",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(15px, 2.2vw, 20px)",
                  color: "#6ee7b7",
                  margin: "0 0 6px 0",
                  letterSpacing: "0.05em",
                }}
              >
                The Structure of Alienation
              </h2>
              <p
                style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#a7f3d0",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Click any sphere to toggle recognition. Drag the timeline to restore mediated
                immediacy.
              </p>
            </div>

            {/* SVG Diagram */}
            <svg
              viewBox="0 0 100 100"
              width="100%"
              style={{ maxWidth: "420px", display: "block", margin: "0 auto" }}
              aria-label="Alienation diagram showing central figure surrounded by four spheres"
            >
              <defs>
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#065F46" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Orbit ring */}
              <circle
                cx={cx}
                cy={cy}
                r={orbitR}
                fill="none"
                stroke="#065F46"
                strokeWidth="0.3"
                strokeDasharray="2 1.5"
                opacity="0.4"
              />

              {/* Arrows and spheres */}
              {keys.map((key) => {
                const sd = sphereData[key];
                const pos = getPos(sd.angle, orbitR);
                const recognition = getRecognitionLevel(key);
                const isSelected = selectedSphere === key;
                const isHovered = hoveredSphere === key;
                const opacity = 0.35 + (1 - recognition) * 0.65;

                const midX = (cx + pos.x) / 2;
                const midY = (cy + pos.y) / 2;

                const normX = (pos.x - cx) / orbitR;
                const normY = (pos.y - cy) / orbitR;

                const arrowFrac = recognition > 0.5 ? recognition : 0;
                const arrX1 = cx + normX * (centerR + 1);
                const arrY1 = cy + normY * (centerR + 1);
                const arrX2 = pos.x - normX * (sphereR + 1);
                const arrY2 = pos.y - normY * (sphereR + 1);

                const awayX1 = pos.x - normX * (sphereR + 1);
                const awayY1 = pos.y - normY * (sphereR + 1);
                const awayX2 = cx + normX * (centerR + 1);
                const awayY2 = cy + normY * (centerR + 1);

                return (
                  <g key={key}>
                    {/* Connection line */}
                    <line
                      x1={cx + normX * centerR}
                      y1={cy + normY * centerR}
                      x2={pos.x - normX * sphereR}
                      y2={pos.y - normY * sphereR}
                      stroke={sd.color}
                      strokeWidth={isSelected || isHovered ? "0.8" : "0.4"}
                      opacity={0.5 + recognition * 0.4}
                      strokeDasharray={recognition > 0.5 ? "none" : "1.5 1"}
                    />

                    {/* Arrow: alienated direction (sphere → center, controlling) */}
                    {recognition < 0.5 && (
                      <polygon
                        points={`${midX + normX * 0.5},${midY + normY * 0.5} ${midX - normY * 1.2 - normX * 1.2},${midY + normX * 1.2 - normY * 1.2} ${midX + normY * 1.2 - normX * 1.2},${midY - normX * 1.2 - normY * 1.2}`}
                        fill="#ef4444"
                        opacity={0.6 + (1 - recognition) * 0.3}
                      />
                    )}

                    {/* Arrow: recognized direction (center → sphere, expressed through) */}
                    {recognition >= 0.5 && (
                      <polygon
                        points={`${midX + normX * 0.5},${midY + normY * 0.5} ${midX - normY * 1.2 - normX * 0},${midY + normX * 1.2 - normY * 0} ${midX + normY * 1.2 - normX * 0},${midY - normX * 1.2 - normY * 0}`}
                        fill="#34d399"
                        opacity={0.4 + recognition * 0.5}
                      />
                    )}

                    {/* Sphere */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={sphereR + (isHovered ? 1 : 0)}
                      fill={sd.color}
                      fillOpacity={opacity}
                      stroke={isSelected ? "#ecfdf5" : sd.color}
                      strokeWidth={isSelected ? "0.8" : "0.4"}
                      style={{ cursor: "pointer", transition: "all 0.3s" }}
                      filter={isSelected || isHovered ? "url(#glow)" : "none"}
                      onClick={() => toggleSphere(key)}
                      onMouseEnter={() => setHoveredSphere(key)}
                      onMouseLeave={() => setHoveredSphere(null)}
                    />

                    {/* Mirror figure inside sphere */}
                    <g opacity={opacity * 0.8} style={{ pointerEvents: "none" }}>
                      {/* Head */}
                      <circle cx={pos.x} cy={pos.y - 3.5} r={1.5} fill="#ecfdf5" opacity={0.5} />
                      {/* Body */}
                      <line
                        x1={pos.x}
                        y1={pos.y - 2}
                        x2={pos.x}
                        y2={pos.y + 2}
                        stroke="#ecfdf5"
                        strokeWidth="0.7"
                        opacity={0.5}
                      />
                      <line
                        x1={pos.x - 1.5}
                        y1={pos.y - 0.5}
                        x2={pos.x + 1.5}
                        y2={pos.y - 0.5}
                        stroke="#ecfdf5"
                        strokeWidth="0.7"
                        opacity={0.5}
                      />
                      <line
                        x1={pos.x}
                        y1={pos.y + 2}
                        x2={pos.x - 1.2}
                        y2={pos.y + 4.5}
                        stroke="#ecfdf5"
                        strokeWidth="0.7"
                        opacity={0.5}
                      />
                      <line
                        x1={pos.x}
                        y1={pos.y + 2}
                        x2={pos.x + 1.2}
                        y2={pos.y + 4.5}
                        stroke="#ecfdf5"
                        strokeWidth="0.7"
                        opacity={0.5}
                      />
                    </g>

                    {/* Sphere label */}
                    <text
                      x={pos.x}
                      y={pos.y + sphereR + 3.5}
                      textAnchor="middle"
                      fill="#d1fae5"
                      fontSize="3.5"
                      fontFamily="Georgia, serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {sd.label}
                    </text>

                    {/* Recognition indicator */}
                    {recognition > 0.1 && (
                      <text
                        x={pos.x}
                        y={pos.y - sphereR - 1.5}
                        textAnchor="middle"
                        fill="#34d399"
                        fontSize="2.8"
                        fontFamily="Georgia, serif"
                        style={{ pointerEvents: "none" }}
                      >
                        {recognition > 0.5 ? "expressed through" : ""}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Central figure */}
              <circle
                cx={cx}
                cy={cy}
                r={centerR}
                fill="url(#centerGrad)"
                stroke="#34d399"
                strokeWidth="0.5"
                filter="url(#glow)"
              />
              {/* Central human figure */}
              <circle cx={cx} cy={cy - 3.5} r={1.8} fill="#ecfdf5" opacity={0.9} />
              <line
                x1={cx}
                y1={cy - 1.7}
                x2={cx}
                y2={cy + 2.5}
                stroke="#ecfdf5"
                strokeWidth="0.9"
                opacity={0.9}
              />
              <line
                x1={cx - 2}
                y1={cy - 0.2}
                x2={cx + 2}
                y2={cy - 0.2}
                stroke="#ecfdf5"
                strokeWidth="0.9"
                opacity={0.9}
              />
              <line
                x1={cx}
                y1={cy + 2.5}
                x2={cx - 1.5}
                y2={cy + 5.5}
                stroke="#ecfdf5"
                strokeWidth="0.9"
                opacity={0.9}
              />
              <line
                x1={cx}
                y1={cy + 2.5}
                x2={cx + 1.5}
                y2={cy + 5.5}
                stroke="#ecfdf5"
                strokeWidth="0.9"
                opacity={0.9}
              />
              <text
                x={cx}
                y={cy + 9}
                textAnchor="middle"
                fill="#6ee7b7"
                fontSize="3"
                fontFamily="Georgia, serif"
              >
                Consciousness
              </text>
            </svg>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(12px, 2vw, 24px)",
                marginTop: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "3px",
                    background: "#ef4444",
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#a7f3d0" }}>
                  Controlled by (alienated)
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "3px",
                    background: "#34d399",
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#a7f3d0" }}>
                  Expressed through (recognized)
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: "clamp(16px, 2.5vw, 24px)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#6ee7b7" }}>
                  Immediate Relationship
                </span>
                <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#6ee7b7" }}>
                  Mediated Immediacy
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={timelineValue}
                  onChange={(e) => setTimelineValue(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#065F46",
                    cursor: "pointer",
                    height: "6px",
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "6px",
                  fontSize: "clamp(10px, 1.4vw, 12px)",
                  color: "#a7f3d0",
                  fontStyle: "italic",
                }}
              >
                {timelineValue < 20
                  ? "Stage: Naive immediacy — alienation not yet experienced"
                  : timelineValue < 45
                  ? "Stage: Alienation intensifies — estrangement fully felt"
                  : timelineValue < 70
                  ? "Stage: Critical distance — alienation recognized as such"
                  : "Stage: Mediated immediacy — recognition within institutions"}
              </div>
            </div>

            {/* Selected sphere detail */}
            {selectedSphere && (
              <div
                style={{
                  marginTop: "clamp(16px, 2vw, 20px)",
                  background: "#071810",
                  border: `1px solid ${sphereData[selectedSphere].color}`,
                  borderRadius: "8px",
                  padding: "clamp(14px, 2vw, 20px)",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: sphereData[selectedSphere].color,
                    marginBottom: "8px",
                  }}
                >
                  {sphereData[selectedSphere].label} — Alienation
                </div>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#d1fae5",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {sphereData[selectedSphere].description}
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#6ee7b7",
                    fontStyle: "italic",
                  }}
                >
                  {alienationStates[selectedSphere] === 0
                    ? "Recognition restored — this domain is now experienced as an expression of human activity."
                    : "Full alienation — this domain appears as an independent force controlling consciousness."}
                </div>
              </div>
            )}

            {/* Core argument prose */}
            <div
              style={{
                marginTop: "clamp(16px, 2vw, 24px)",
                padding: "clamp(14px, 2vw, 20px)",
                background: "#071810",
                borderRadius: "8px",
                border: "1px solid #064e3b",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(13px, 1.7vw, 15px)",
                  color: "#d1fae5",
                  lineHeight: 1.75,
                  margin: "0 0 12px 0",
                }}
              >
                Alienation occurs whenever consciousness encounters its own products or expressions
                as foreign powers that appear to control it. What is most striking in Hegel's
                analysis is that all forms of alienation share a single structure: externality. Something
                that actually expresses human activity appears as an independent force opposing
                human purposes.
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 1.7vw, 15px)",
                  color: "#d1fae5",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Yet alienation also serves crucial positive functions — it forces consciousness to
                confront the inadequacy of immediate relationships, develops critical distance from
                tradition, and motivates social reform. The goal is not to eliminate alienation by
                returning to pre-alienated innocence, but to achieve what Hegel calls mediated
                immediacy: forms of relationship that preserve the gains of reflection while enabling
                genuine recognition within concrete institutions.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div
          style={{
            background: "#0d1a2b",
            border: "1px solid #1d4ed8",
            borderLeft: "4px solid #3b82f6",
            borderRadius: "8px",
            padding: "clamp(16px, 3vw, 28px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#93c5fd",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            The Difficulty
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#dbeafe",
              lineHeight: 1.7,
              margin: "0 0 12px 0",
            }}
          >
            If alienation's overcoming requires adequate philosophical method as well as
            institutional change, what exactly is the nature of speculative philosophical thinking?
            How does Hegel's method differ from both empiricism, which takes the given as final,
            and rationalism, which imposes formal categories from without — and why must it be
            simultaneously descriptive of what is and constitutive of the reality it describes?
          </p>
          <p
            style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#93c5fd",
              lineHeight: 1.65,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            This pressure forces the next development: a direct confrontation with philosophical
            method itself — speculative reason as the form of thinking adequate to a reality that
            is itself rational, a logic that does not stand apart from its subject matter but moves
            within it.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div
          style={{
            background: "#0d1f18",
            border: "1px solid #064e3b",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#d1fae5",
              fontFamily: "Georgia, serif",
            }}
          >
            <span
              style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6ee7b7",
                fontWeight: "bold",
              }}
            >
              Real-World Echoes
            </span>
            {echosOpen ? (
              <ChevronUp size={18} color="#6ee7b7" />
            ) : (
              <ChevronDown size={18} color="#6ee7b7" />
            )}
          </button>

          {echosOpen && (
            <div
              style={{
                padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {[
                {
                  head: "Natural Alienation",
                  body:
                    "Ordinary consciousness treats the external world as simply given — a collection of independent objects with fixed properties — forgetting that this world is already structured by human conceptual activity. Climate anxiety often has this form: nature appears as an indifferent mechanism indifferent to human purposes.",
                },
                {
                  head: "Market as Alien Force",
                  body:
                    "Workers and citizens experience market mechanisms as impersonal forces beyond any individual influence — as natural laws rather than contingent human arrangements. The economy appears to have its own logic that must be obeyed, precisely because collective human activity has crystallized into structures no single agent designed.",
                },
                {
                  head: "Cultural Heritage as Museum",
                  body:
                    "When cultural traditions are experienced only as objects of scholarly study or tourism rather than vital resources for present life, cultural alienation has set in. The spirit that once animated a tradition has withdrawn; what remains is form without life, monument without meaning.",
                },
                {
                  head: "Secular Forms of Projection",
                  body:
                    "Romantic idealization, utopian politics, and certain forms of speculative philosophy all share the structure of religious alienation — they project human capacities onto a beyond (the beloved, the future society, the Absolute) and relate to their own powers as if from outside. The projected ideal returns to control the projector.",
                },
              ].map((echo, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredEcho(i)}
                  onMouseLeave={() => setHoveredEcho(null)}
                  style={{
                    background: hoveredEcho === i ? "#0f2a1f" : "#071810",
                    border: `1px solid ${hoveredEcho === i ? "#065F46" : "#064e3b"}`,
                    borderRadius: "6px",
                    padding: "clamp(12px, 2vw, 16px)",
                    cursor: "default",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(12px, 1.6vw, 14px)",
                      color: "#34d399",
                      fontWeight: "bold",
                      marginBottom: "6px",
                    }}
                  >
                    {echo.head}
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 14px)",
                      color: "#a7f3d0",
                      lineHeight: 1.65,
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

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(10px, 1.3vw, 12px)",
            color: "#4b7a64",
            paddingBottom: "8px",
          }}
        >
          Part 18 of 20 — Next: The Nature of Speculative Method
        </div>
      </div>
    </div>
  );
}

// ─── Part 19: The Method of Philosophy ───
function SpeculativeMethod() {
  const [echosOpen, setEchosOpen] = useState(false);
  const [mode, setMode] = useState(null); // null | 'abstract' | 'determinate'
  const [chainStep, setChainStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [abstractDeleted, setAbstractDeleted] = useState([]);
  const [determinateHistory, setDeterminateHistory] = useState([]);
  const [showSplit, setShowSplit] = useState(false);
  const [splitFade, setSplitFade] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);

  const accent = "#6366f1";

  const keyConcepts = [
    { id: "speculative_thinking", label: "Speculative Thinking", desc: "Speculative thinking is Hegel's name for the mode of thought capable of holding contradictions together without forcing premature resolution. Rather than treating opposites as external to each other (as the understanding does), speculative reason follows their inner movement — the way each term passes into its opposite and generates a richer unity from that tension." },
    { id: "determinate_negation", label: "Determinate Negation", desc: "Abstract negation simply cancels: 'not-A.' Determinate negation preserves what was true in what it negates and elevates it to a higher standpoint. When Becoming negates the identity of Being and Nothing, it does not destroy them but holds their unity-in-opposition in a single dynamic concept. Every step forward in the Logic is a determinate negation." },
    { id: "aufhebung", label: "Aufhebung (Sublation)", desc: "Aufhebung is Hegel's key technical term, deliberately exploiting the German word's triple meaning: to cancel, to preserve, and to elevate. Each dialectical movement sublates its starting point — the lower category is cancelled as independent, preserved as a moment within a richer whole, and elevated to a new level of concreteness. Nothing is simply discarded." },
    { id: "method_from_content", label: "Method from Content", desc: "Unlike Kant, who supplies categories to experience from outside, Hegel insists that the philosophical method must arise from the movement of its subject matter itself. The method of the Logic is not imposed on its content but is extracted from it: logic develops its own method as it proceeds, making the beginning and the method appear only at the end." },
    { id: "systematic_holism", label: "Systematic Holism", desc: "No philosophical concept has meaning in isolation — each is what it is only through its relations to every other concept in the system. Truth is 'the whole,' as Hegel famously says. A concept grasped in abstraction from its place in the total movement of thought is always a partial, one-sided representation — a fragment mistaken for a self-sufficient whole." },
    { id: "circular_return", label: "Philosophy as Self-Knowing Activity", desc: "The system ends where it begins, but the return is not a simple loop — it is a circle that, in completing itself, reveals itself as the ground of its own starting point. The Absolute Idea at the close of the Logic shows that Being at the opening was always already the implicit self-determination of the Idea. Philosophy's end illuminates its beginning." },
  ];

  const chainConcepts = [
    { id: 0, label: "Being", x: 50, y: 50, color: "#6366f1", size: 28 },
    { id: 1, label: "Nothing", x: 200, y: 50, color: "#8b5cf6", size: 28, kernelOf: 0 },
    { id: 2, label: "Becoming", x: 125, y: 150, color: "#a78bfa", size: 34, kernelOf: 1, richer: true },
    { id: 3, label: "Determinate\nBeing", x: 270, y: 150, color: "#c4b5fd", size: 38, kernelOf: 2, richer: true },
    { id: 4, label: "Quality", x: 390, y: 80, color: "#ddd6fe", size: 40, kernelOf: 3, richer: true },
    { id: 5, label: "Something", x: 390, y: 220, color: "#818cf8", size: 42, kernelOf: 4, richer: true },
  ];

  const baseEdges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  const visibleNodes = mode === 'abstract'
    ? chainConcepts.slice(0, Math.max(1, 3 - abstractDeleted.length))
    : mode === 'determinate'
    ? chainConcepts.slice(0, Math.min(chainStep + 2, chainConcepts.length))
    : chainConcepts.slice(0, 2);

  const visibleEdges = baseEdges.filter(e =>
    visibleNodes.find(n => n.id === e.from) && visibleNodes.find(n => n.id === e.to)
  );

  function handleAbstractNegation() {
    if (animating) return;
    setMode('abstract');
    setAnimating(true);
    setAbstractDeleted(prev => {
      const next = [...prev, prev.length];
      return next;
    });
    setTimeout(() => setAnimating(false), 600);
  }

  function handleDeterminateNegation() {
    if (animating) return;
    setMode('determinate');
    setShowSplit(true);
    setSplitFade(1);
    setAnimating(true);
    setTimeout(() => {
      setSplitFade(0);
      setTimeout(() => {
        setShowSplit(false);
        setChainStep(prev => Math.min(prev + 1, chainConcepts.length - 2));
        setDeterminateHistory(prev => [...prev, chainStep]);
        setAnimating(false);
      }, 500);
    }, 900);
  }

  function handleReset() {
    setMode(null);
    setChainStep(0);
    setAbstractDeleted([]);
    setDeterminateHistory([]);
    setShowSplit(false);
    setSplitFade(0);
    setAnimating(false);
  }

  const svgViewBox = "0 0 480 300";

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #1a2030 0%, #0a0a0f 80%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e5e7eb",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px, 3vw, 32px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(8px, 2vw, 16px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.5vw, 12px)",
            letterSpacing: "0.18em",
            color: "#6b7280",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>Part 19 of 20 · Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 40px)",
            fontWeight: "bold",
            color: "#f9fafb",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
          }}>The Method of Philosophy</h1>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 17px)",
            color: "#9ca3af",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Hegel's speculative method allows philosophical content to generate its own method through determinate negation, making thinking itself the deepest subject of philosophy.
          </p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(17, 24, 39, 0.85)",
          borderLeft: "4px solid #1F2937",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          boxShadow: "0 2px 24px rgba(31,41,55,0.3)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.3vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#d1d5db",
            lineHeight: 1.75,
            margin: 0,
          }}>
            The analysis of alienation and its overcoming requires a philosophical method adequate to the dynamic, self-developing character of reality — but what is that method, and how does it differ from both empiricist and rationalist alternatives? Empiricism imports an external observer; rationalism imposes pre-formed categories. Neither can let content speak for itself. Something more radical is needed: a method that does not stand apart from its subject matter but emerges from within it, a method that <em>moves</em> as reality itself moves.
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 20, 35, 0.92)",
          borderRadius: "12px",
          border: "1px solid rgba(99,102,241,0.18)",
          padding: "clamp(16px, 3vw, 32px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
        }}>
          <h2 style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "#e0e7ff",
            margin: "0 0 6px 0",
          }}>Negation as Method: Abstract vs. Determinate</h2>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 15px)",
            color: "#9ca3af",
            margin: "0 0 20px 0",
            lineHeight: 1.65,
          }}>
            Every philosophical concept can be negated in two ways. <strong style={{ color: "#a78bfa" }}>Abstract negation</strong> simply erases — leaving emptiness and dead ends. <strong style={{ color: "#6ee7b7" }}>Determinate negation</strong> transforms — preserving the kernel of truth while sublating the error, generating a richer, more concrete concept. Use the controls below to see both in action, then chain determinate negations to watch the network grow.
          </p>

          {/* Controls */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "22px",
          }}>
            {[
              { label: "Abstract Negation", key: "abstract", color: "#ef4444", glow: "#ef444455" },
              { label: "Determinate Negation", key: "determinate", color: "#6ee7b7", glow: "#6ee7b755" },
              { label: "Reset", key: "reset", color: "#6b7280", glow: "#6b728055" },
            ].map(btn => (
              <button
                key={btn.key}
                onClick={btn.key === "reset" ? handleReset : btn.key === "abstract" ? handleAbstractNegation : handleDeterminateNegation}
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: `1.5px solid ${btn.color}`,
                  color: btn.color,
                  borderRadius: "6px",
                  padding: "8px 18px",
                  fontSize: "clamp(11px, 1.6vw, 14px)",
                  fontFamily: "Georgia, serif",
                  cursor: animating && btn.key !== "reset" ? "not-allowed" : "pointer",
                  opacity: animating && btn.key !== "reset" ? 0.5 : 1,
                  transition: "box-shadow 0.2s, background 0.2s",
                  boxShadow: hoveredNode === btn.key ? `0 0 12px ${btn.glow}` : "none",
                }}
                onMouseEnter={() => setHoveredNode(btn.key)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Status label */}
          <div style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#6b7280",
            marginBottom: "10px",
            minHeight: "20px",
          }}>
            {mode === null && "Start with Abstract or Determinate Negation to see the difference."}
            {mode === 'abstract' && `Abstract negation: concepts are simply deleted — ${Math.min(abstractDeleted.length, 2)} removed. The network shrinks toward emptiness.`}
            {mode === 'determinate' && `Determinate negation applied ${determinateHistory.length + (chainStep > 0 ? 0 : 0)} time(s). The network grows richer with each transformation.`}
          </div>

          {/* SVG Network */}
          <div style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}>
            <svg
              viewBox={svgViewBox}
              width="100%"
              style={{ display: "block", overflow: "visible" }}
            >
              <defs>
                <filter id="glow-purple">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-green">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#4b5563" />
                </marker>
              </defs>

              {/* Edges */}
              {visibleEdges.map((e, i) => {
                const fn = visibleNodes.find(n => n.id === e.from);
                const tn = visibleNodes.find(n => n.id === e.to);
                if (!fn || !tn) return null;
                return (
                  <line
                    key={i}
                    x1={fn.x}
                    y1={fn.y}
                    x2={tn.x}
                    y2={tn.y}
                    stroke={mode === 'determinate' ? "#6ee7b744" : "#4b556344"}
                    strokeWidth="1.5"
                    markerEnd="url(#arrow)"
                    style={{ transition: "all 0.4s" }}
                  />
                );
              })}

              {/* Split animation overlay */}
              {showSplit && mode === 'determinate' && chainStep < chainConcepts.length - 2 && (() => {
                const target = chainConcepts[Math.min(chainStep + 1, chainConcepts.length - 1)];
                return (
                  <g opacity={splitFade} style={{ transition: "opacity 0.5s" }}>
                    {/* Kernel (preserved truth) */}
                    <circle
                      cx={target.x - 18}
                      cy={target.y - 14}
                      r={target.size * 0.5}
                      fill="#6ee7b7"
                      filter="url(#glow-green)"
                      opacity="0.85"
                    />
                    <text
                      x={target.x - 18}
                      y={target.y - 14}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="7"
                      fill="#064e3b"
                      fontFamily="Georgia, serif"
                    >kernel</text>
                    {/* Sublated error (dissolving) */}
                    <circle
                      cx={target.x + 18}
                      cy={target.y + 12}
                      r={target.size * 0.45}
                      fill="#ef4444"
                      opacity={splitFade * 0.4}
                      style={{ transition: "opacity 0.5s" }}
                    />
                    <text
                      x={target.x + 18}
                      y={target.y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="7"
                      fill="#fca5a5"
                      fontFamily="Georgia, serif"
                      opacity={splitFade * 0.7}
                    >error↗</text>
                  </g>
                );
              })()}

              {/* Abstract deletion X marks */}
              {mode === 'abstract' && abstractDeleted.map((d, i) => {
                const idx = 1 + i;
                const node = chainConcepts[idx];
                if (!node) return null;
                return (
                  <g key={"del-" + i}>
                    <circle cx={node.x} cy={node.y} r={node.size + 4} fill="#1a0a0a" opacity="0.85" />
                    <line x1={node.x - 12} y1={node.y - 12} x2={node.x + 12} y2={node.y + 12} stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                    <line x1={node.x + 12} y1={node.y - 12} x2={node.x - 12} y2={node.y + 12} stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                  </g>
                );
              })}

              {/* Nodes */}
              {visibleNodes.map((node, i) => {
                const isNew = mode === 'determinate' && i === visibleNodes.length - 1 && chainStep > 0;
                const isDeleted = mode === 'abstract' && abstractDeleted.includes(i - 1) && i > 0;
                if (isDeleted) return null;

                const lines = node.label.split('\n');
                return (
                  <g
                    key={node.id}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.4s",
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size + (hoveredNode === node.id ? 4 : 0)}
                      fill={isNew ? "#6ee7b733" : "rgba(17,24,39,0.95)"}
                      stroke={isNew ? "#6ee7b7" : node.color}
                      strokeWidth={isNew ? 2.5 : 1.8}
                      filter={isNew ? "url(#glow-green)" : hoveredNode === node.id ? "url(#glow-purple)" : "none"}
                      style={{ transition: "all 0.35s" }}
                    />
                    {lines.map((line, li) => (
                      <text
                        key={li}
                        x={node.x}
                        y={node.y + (lines.length === 1 ? 0 : (li - 0.5) * 9)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={clampFontSize(node.size)}
                        fill={isNew ? "#6ee7b7" : node.color}
                        fontFamily="Georgia, serif"
                        style={{ userSelect: "none", transition: "all 0.3s" }}
                      >
                        {line}
                      </text>
                    ))}
                    {isNew && (
                      <text
                        x={node.x}
                        y={node.y + node.size + 14}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#6ee7b7"
                        fontFamily="Georgia, serif"
                        opacity="0.7"
                      >▲ richer</text>
                    )}
                  </g>
                );
              })}

              {/* Abstract negation — gap label */}
              {mode === 'abstract' && abstractDeleted.length > 0 && (
                <text
                  x={240}
                  y={270}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#ef444488"
                  fontFamily="Georgia, serif"
                >
                  Dead end — negation leaves only absence
                </text>
              )}

              {/* Determinate negation — growth label */}
              {mode === 'determinate' && chainStep >= 2 && (
                <text
                  x={240}
                  y={275}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6ee7b788"
                  fontFamily="Georgia, serif"
                >
                  The network grows denser and more concrete
                </text>
              )}
            </svg>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            background: "rgba(31,41,55,0.4)",
            borderRadius: "8px",
            padding: "clamp(14px, 2.5vw, 22px)",
            borderLeft: "3px solid #6366f1",
          }}>
            <p style={{
              fontSize: "clamp(13px, 1.8vw, 15px)",
              color: "#d1d5db",
              lineHeight: 1.8,
              margin: 0,
            }}>
              Traditional philosophy assumes a standing opposition: the knowing subject on one side, the known object on the other. Empiricism fills the subject with external data; rationalism equips it with innate categories. Kant draws the sharpest line — we know phenomena, never things-in-themselves. Hegel's decisive move is to recognize that this very opposition is itself a product of thinking, and thinking can reflect on it. When thought examines its own movement, it discovers that every apparent limit conceals a passage — not by jumping over the limit from outside, but by pressing immanently against it until the limit reveals its own other side. This is speculative thinking: patient, relentless, and ultimately self-knowing.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(17, 24, 39, 0.85)",
          borderLeft: "4px solid #374151",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          boxShadow: "0 2px 24px rgba(31,41,55,0.2)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.3vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#d1d5db",
            lineHeight: 1.75,
            margin: "0 0 12px 0",
          }}>
            If speculative philosophy achieves the highest form of self-knowledge — if the method truly sublates all prior approaches and the system genuinely closes on itself — a new and urgent question emerges. What is Hegel's living legacy? How have subsequent thinkers appropriated, transformed, and criticized his system? Marx inverted the dialectic into material history; Kierkegaard exploded it from within through the irreducibly singular existing individual; analytic philosophy largely bypassed it; poststructuralism found in it a totalizing violence to be resisted. What remains genuinely urgent in Hegel's vision, and what must be released?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#6b7280",
            fontStyle: "italic",
            margin: 0,
          }}>
            This pressure forces the next development: a reckoning with Hegel's reception, transformation, and the stakes of his system for thinking in our own time.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "rgba(17, 24, 39, 0.8)",
          borderRadius: "8px",
          border: "1px solid rgba(99,102,241,0.12)",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 22px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <span style={{
              fontSize: "clamp(9px, 1.3vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontWeight: "bold",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={18} color="#6b7280" />
              : <ChevronDown size={18} color="#6b7280" />}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              {[
                {
                  title: "Hegel's Notorious Difficulty",
                  body: "Hegel's prose is famously dense — and deliberately so. Ordinary language was built for stable identities and external relations. Speculative content, which is constitutively self-moving and self-differentiating, strains against those structures. Every sentence must somehow hold the object, its negation, and their unity simultaneously. The difficulty is not an accident of style but a consequence of using a static medium to express dynamic reality.",
                },
                {
                  title: "Plato vs. Hegel: External vs. Immanent Dialectics",
                  body: "Plato's dialogues proceed dialectically, but Socrates often introduces a new distinction or analogy from outside — a move Hegel calls 'arbitrary.' Hegel's claim is that genuine dialectic must be driven by the content's own nature. When 'Being' is fully thought, it passes into 'Nothing' not because the philosopher decides to introduce a new idea, but because pure Being, as utterly indeterminate, is indistinguishable from Nothing. The movement is immanent, necessary, and impersonal.",
                },
                {
                  title: "Einstein's Relativity as Holistic Conceptual Revision",
                  body: "When Einstein reconceived simultaneity, he did not merely add a new fact to physics — he forced the reconstruction of time, space, mass, and energy as an interconnected whole. No single concept could remain fixed while the others shifted. This illustrates Hegel's insight that concepts form a web of mutual determination: genuine conceptual change is always holistic, never merely additive. The speculative method anticipates precisely this kind of systematic conceptual transformation.",
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  background: "rgba(31,41,55,0.45)",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "2px solid #4b5563",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.7vw, 15px)",
                    color: "#a5b4fc",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ca3af",
                    lineHeight: 1.72,
                    margin: 0,
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function clampFontSize(size) {
  if (size > 38) return "9";
  if (size > 32) return "8.5";
  return "8";
}

function ConceptCard({ term, desc }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(99,102,241,0.12)" : "rgba(31,41,55,0.5)",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "rgba(75,85,99,0.3)"}`,
        borderRadius: "7px",
        padding: "clamp(10px, 2vw, 16px)",
        cursor: "pointer",
        transition: "all 0.25s",
      }}
    >
      <div style={{
        fontSize: "clamp(12px, 1.6vw, 14px)",
        color: "#c7d2fe",
        fontWeight: "bold",
        marginBottom: open ? "8px" : 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "6px",
      }}>
        <span>{term}</span>
        <span style={{ color: "#6b7280", fontSize: "clamp(10px, 1.5vw, 12px)", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <p style={{
          fontSize: "clamp(11px, 1.5vw, 13px)",
          color: "#9ca3af",
          lineHeight: 1.65,
          margin: 0,
        }}>{desc}</p>
      )}
    </div>
  );
}

// ─── Part 20: The Living Legacy ───
function LivingLegacy() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [criticalMode, setCriticalMode] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const accent = "#D4A017";

  const keyConcepts = [
    { id: "marxist_materialism", label: "Marxist Historical Materialism", desc: "Marx's appropriation of Hegel inverts the dialectic: where Hegel's Spirit develops through ideas, Marx grounds development in material productive forces and class struggle. The dialectical logic of contradiction, negation, and synthesis is preserved but applied to the concrete economic and social conditions that shape consciousness rather than to consciousness shaping reality." },
    { id: "existentialism", label: "Existentialism (Kierkegaard / Sartre)", desc: "Kierkegaard's attack on Hegel became the foundation of existentialism: the actual individual, with her irreducible anxiety, passion, and faith, cannot be dissolved into the rational system. Sartre radicalized this by making individual freedom and radical responsibility the irreducible starting points — inverting Hegel's move from individual freedom to institutional actualization." },
    { id: "lacanian_psychoanalysis", label: "Lacanian Psychoanalysis", desc: "Lacan's return to Freud via Hegel (mediated through Kojève) reinterprets the unconscious through the master-slave dialectic and the structure of desire. For Lacan, desire is always the desire of the Other — structured by recognition and the fundamental lack that drives the subject's relation to the symbolic order. The Hegelian logic of intersubjectivity enters the heart of psychoanalytic theory." },
    { id: "feminist_postcolonial", label: "Feminist and Postcolonial Appropriations", desc: "Thinkers like Simone de Beauvoir, Frantz Fanon, and more recently Robert Williams and Susan Buck-Morss have read Hegel's master-slave dialectic through the lens of gender and colonialism. Fanon showed that colonial racism structures recognition in precisely the way Hegel describes — except the promised dialectical reversal is systematically blocked by the colonial apparatus of violence." },
    { id: "analytic_revival", label: "Hegelian Revival in Analytic Philosophy", desc: "Robert Brandom, John McDowell, and Robert Pippin have brought Hegel into dialogue with contemporary analytic philosophy of mind and language. Brandom's inferentialist semantics owes explicit debts to Hegel's logic; McDowell's account of the space of reasons draws on the Phenomenology; Pippin argues that Hegel's idealism is a plausible response to problems analytic philosophy has yet to solve." },
    { id: "neuroscience_intersubjectivity", label: "Neuroscience and Intersubjective Self-Consciousness", desc: "Contemporary neuroscience and developmental psychology have converged — through entirely different methods — on the Hegelian conclusion that selfhood is irreducibly intersubjective. Infants develop self-consciousness through mirroring interactions with caregivers; the capacity for self-knowledge is grounded in the ability to see oneself from the other's perspective. Hegel's logic of recognition maps onto empirical findings about human development." },
  ];

  const nodes = [
    {
      id: "hegel",
      label: "Hegel",
      sublabel: "(1831)",
      x: 50,
      y: 50,
      domain: "center",
      color: "#D4A017",
      radius: 28,
      concept: null,
      description: null,
    },
    {
      id: "marx",
      label: "Marx",
      sublabel: "1818–1883",
      x: 20,
      y: 18,
      domain: "political",
      color: "#C0392B",
      radius: 20,
      concept: "Historical Materialism",
      description:
        "Marx inverted Hegel's idealist dialectic, grounding the movement of history in material conditions and class struggle rather than Spirit. He preserved the triadic structure of contradiction and synthesis while insisting that 'the ideal is nothing else than the material world reflected by the human mind.' The master–slave dialectic became a lens for understanding labor, alienation, and revolutionary transformation.",
      critique:
        "Marx accused Hegel of mystification — of treating real social contradictions as mere moments in the self-development of Absolute Spirit. The critique arrow runs from materialism back to idealism.",
    },
    {
      id: "kierkegaard",
      label: "Kierkegaard",
      sublabel: "1813–1855",
      x: 78,
      y: 15,
      domain: "existential",
      color: "#2980B9",
      radius: 18,
      concept: "Existential Inwardness",
      description:
        "Kierkegaard found Hegel's system too abstract to address the concrete existing individual. He seized on Hegel's categories of freedom and spirit but redirected them inward, insisting that truth is subjectivity. The leap of faith, the stages of existence, and the category of the individual all respond to — and revolt against — Hegel's absorption of particularity into the universal.",
      critique:
        "Kierkegaard's entire project is a sustained protest against the Hegelian system's erasure of the existing individual in favour of speculative totality.",
    },
    {
      id: "sartre",
      label: "Sartre",
      sublabel: "1905–1980",
      x: 82,
      y: 35,
      domain: "existential",
      color: "#2980B9",
      radius: 17,
      concept: "Being-for-Others",
      description:
        "Sartre transformed Hegel's recognition dialectic into the ontology of the look: the other's gaze petrifies my freedom, making conflict the fundamental structure of intersubjectivity. His Critique of Dialectical Reason later reintegrated Marxist and Hegelian threads, attempting a dialectical anthropology of groups, praxis, and seriality.",
      critique:
        "Sartre rejected Hegel's reconciliatory synthesis, insisting that conflict between consciousnesses cannot be finally resolved — each consciousness seeks to objectify the other.",
    },
    {
      id: "lacan",
      label: "Lacan",
      sublabel: "1901–1981",
      x: 75,
      y: 72,
      domain: "psychoanalysis",
      color: "#27AE60",
      radius: 17,
      concept: "Mirror Stage & Recognition",
      description:
        "Lacan reread Freud through Hegel's Phenomenology, particularly the master–slave dialectic and the structure of desire as always desire of the Other's desire. The mirror stage — where the infant first recognizes itself as a unified image in the other's gaze — is a directly Hegelian insight about the intersubjective constitution of subjectivity. Language, for Lacan, is the medium through which the Hegelian Other operates.",
      critique:
        "Lacan introduced the Real as what resists dialectical resolution — a permanent remainder that prevents the Hegelian reconciliation from ever fully closing.",
    },
    {
      id: "fanon",
      label: "Fanon",
      sublabel: "1925–1961",
      x: 25,
      y: 78,
      domain: "postcolonial",
      color: "#D4A017",
      radius: 17,
      concept: "Colonial Recognition",
      description:
        "Frantz Fanon deployed the master–slave dialectic to analyze the psychic structure of colonialism. In Black Skin, White Masks, he showed that the colonial situation perverts Hegelian recognition: the colonized subject is denied the reciprocal recognition that would constitute genuine selfhood. Yet Hegel assumed a symmetry between combatants that the colonial situation destroys — the colonizer's recognition is structurally withheld.",
      critique:
        "Fanon exposed the Eurocentrism latent in Hegel's account of world history and the 'master–slave' narrative, showing that actual colonial masters had no need of the slave's recognition to sustain their self-consciousness.",
    },
    {
      id: "debeauvoir",
      label: "de Beauvoir",
      sublabel: "1908–1986",
      x: 15,
      y: 55,
      domain: "postcolonial",
      color: "#D4A017",
      radius: 17,
      concept: "The Second Sex",
      description:
        "Simone de Beauvoir's analysis of woman as 'the Other' draws directly on Hegelian categories of recognition and otherness. Man constitutes himself as the Essential by defining woman as the Inessential Other — a structure of domination legible through the master–slave dialectic. De Beauvoir asked why women have historically not risen to revolt as the slave does, finding the answer in their dispersal and lack of collective solidarity.",
      critique:
        "De Beauvoir challenged Hegel's assumption that the dialectic of recognition tends toward reciprocity, revealing how gender structures can arrest the movement at permanent asymmetry.",
    },
    {
      id: "mcdowell",
      label: "McDowell",
      sublabel: "b. 1942",
      x: 50,
      y: 88,
      domain: "analytic",
      color: "#7F8C8D",
      radius: 16,
      concept: "Second Nature & Normativity",
      description:
        "John McDowell's Mind and World revives Hegel's concept of Geist to resolve the impasse between empiricism and rationalism in analytic philosophy of mind. Concepts are not merely imposed on a conceptually neutral sensory given; rather, nature itself — through the cultivation of 'second nature' in upbringing — becomes conceptually articulated. Brandom and Pinkard similarly find in Hegel's inferentialist semantics a resource for contemporary philosophy of language and mind.",
      critique:
        "The analytic Hegelian revival tends to bracket Hegel's metaphysics of Absolute Spirit, appropriating his method while leaving open whether the holistic commitments can be sustained.",
    },
    {
      id: "neuroscience",
      label: "Neuroscience",
      sublabel: "Social Cognition",
      x: 50,
      y: 12,
      domain: "mind",
      color: "#8E44AD",
      radius: 16,
      concept: "Intersubjective Self-Consciousness",
      description:
        "Contemporary research on social cognition and the default mode network independently confirms Hegel's insight that self-consciousness is intersubjectively constituted. Studies of mirror neurons, theory of mind, and developmental psychology show that the capacity for self-awareness emerges through the experience of being recognized by others — infants develop a sense of self through the reciprocal gaze of caregivers, echoing Hegel's argument that 'self-consciousness achieves its satisfaction only in another self-consciousness.'",
      critique:
        "Neuroscience provides empirical confirmation without the speculative scaffolding, raising the question of whether Hegel's metaphysical apparatus is necessary for the insights it generates.",
    },
  ];

  const connections = [
    { from: "hegel", to: "marx", type: "transmission" },
    { from: "hegel", to: "kierkegaard", type: "transmission" },
    { from: "hegel", to: "sartre", type: "transmission" },
    { from: "hegel", to: "lacan", type: "transmission" },
    { from: "hegel", to: "fanon", type: "transmission" },
    { from: "hegel", to: "debeauvoir", type: "transmission" },
    { from: "hegel", to: "mcdowell", type: "transmission" },
    { from: "hegel", to: "neuroscience", type: "transmission" },
    { from: "marx", to: "hegel", type: "critique" },
    { from: "kierkegaard", to: "hegel", type: "critique" },
    { from: "sartre", to: "hegel", type: "critique" },
    { from: "lacan", to: "hegel", type: "critique" },
    { from: "fanon", to: "hegel", type: "critique" },
    { from: "debeauvoir", to: "hegel", type: "critique" },
  ];

  const domainColors = {
    center: "#D4A017",
    political: "#C0392B",
    existential: "#2980B9",
    psychoanalysis: "#27AE60",
    postcolonial: "#D4A017",
    analytic: "#7F8C8D",
    mind: "#8E44AD",
  };

  const domainLabels = {
    political: "Political Theory",
    existential: "Existentialism",
    psychoanalysis: "Psychoanalysis",
    postcolonial: "Feminist & Postcolonial",
    analytic: "Analytic Philosophy",
    mind: "Neuroscience / Mind",
  };

  const getNodeById = (id) => nodes.find((n) => n.id === id);

  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ w: 600, h: 500 });

  useEffect(() => {
    if (!svgRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.max(320, w * 0.75);
        setSvgSize({ w, h });
      }
    });
    obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  const toSVG = (pct, dim) => (pct / 100) * dim;

  const getLinePoints = (fromNode, toNode) => {
    const x1 = toSVG(fromNode.x, svgSize.w);
    const y1 = toSVG(fromNode.y, svgSize.h);
    const x2 = toSVG(toNode.x, svgSize.w);
    const y2 = toSVG(toNode.y, svgSize.h);
    return { x1, y1, x2, y2 };
  };

  const getCurvePath = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = my - (dy * 0.15) + (mx - x1) * 0.1;
    const cy = mx + (dx * 0.15) + (my - y1) * 0.1;
    return `M ${x1} ${y1} Q ${mx + (y2 - y1) * 0.1} ${my - (x2 - x1) * 0.1} ${x2} ${y2}`;
  };

  const uniqueDomains = [...new Set(nodes.filter(n => n.domain !== "center").map(n => n.domain))];

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #2a1a00 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8d8b0",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#D4A017",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>Part 20 of 20 — Hegel's Complete System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "bold",
            color: "#D4A017",
            margin: "0 0 8px 0",
            textShadow: "0 0 30px #D4A01755",
          }}>The Living Legacy</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#b8a070",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>Two centuries after his death, Hegel's concepts and methods continue to shape intellectual and political life across philosophy, politics, psychoanalysis, and beyond.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#12100a",
          border: "1px solid #2a2010",
          borderLeft: "4px solid #D4A017",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#D4A017",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "12px",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#d4c090",
            margin: 0,
            fontStyle: "italic",
          }}>
            The speculative method achieves systematic self-knowledge — but does this represent a final philosophical achievement, or does each generation need to rethink these problems in light of contemporary conditions and challenges? If Spirit truly comprehends itself in Hegel's system, why do thinkers keep returning to it, transforming it, arguing with it? The very vitality of the Hegelian inheritance suggests either that the system was never final, or that its generative tensions cannot be closed.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "12px",
          }}>
            <div>
              <h2 style={{
                fontSize: "clamp(15px, 2.2vw, 20px)",
                color: "#D4A017",
                margin: "0 0 4px 0",
              }}>Influence Map</h2>
              <p style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#8a7a50",
                margin: 0,
              }}>Click any thinker to explore their relationship with Hegel</p>
            </div>
            <button
              onClick={() => setCriticalMode(m => !m)}
              style={{
                background: criticalMode ? "#D4A017" : "#1a1508",
                color: criticalMode ? "#0a0a0f" : "#D4A017",
                border: "2px solid #D4A017",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "clamp(10px, 1.4vw, 12px)",
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
              }}
            >
              {criticalMode ? "Critique Mode ON" : "Show Critiques"}
            </button>
          </div>

          {/* Domain Legend */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
          }}>
            {uniqueDomains.map(domain => (
              <div key={domain} style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "clamp(9px, 1.2vw, 11px)",
                color: "#a09060",
              }}>
                <div style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: domainColors[domain],
                  flexShrink: 0,
                }} />
                {domainLabels[domain]}
              </div>
            ))}
          </div>

          {/* SVG Influence Map */}
          <div ref={svgRef} style={{ width: "100%", position: "relative" }}>
            <svg
              viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
              width="100%"
              style={{ display: "block" }}
            >
              <defs>
                <radialGradient id="hegelGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4A017" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="arrowCritique" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#FF6B6B" opacity="0.9" />
                </marker>
                <marker id="arrowTransmit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#D4A017" opacity="0.6" />
                </marker>
              </defs>

              {/* Background glow for Hegel center */}
              <ellipse
                cx={toSVG(50, svgSize.w)}
                cy={toSVG(50, svgSize.h)}
                rx={svgSize.w * 0.18}
                ry={svgSize.h * 0.18}
                fill="url(#hegelGlow)"
              />

              {/* Connections */}
              {connections.map((conn, i) => {
                const fromNode = getNodeById(conn.from);
                const toNode = getNodeById(conn.to);
                if (!fromNode || !toNode) return null;
                const { x1, y1, x2, y2 } = getLinePoints(fromNode, toNode);

                const isTransmission = conn.type === "transmission";
                const isCritique = conn.type === "critique";

                if (criticalMode && isTransmission) return null;
                if (!criticalMode && isCritique) return null;

                const opacity = criticalMode
                  ? (isCritique ? 0.85 : 0.15)
                  : (isTransmission ? 0.6 : 0.15);

                const strokeColor = isCritique ? "#FF6B6B" : "#D4A017";
                const strokeDash = isCritique ? "6,4" : "none";

                return (
                  <path
                    key={i}
                    d={getCurvePath(x1, y1, x2, y2)}
                    stroke={strokeColor}
                    strokeWidth={isCritique ? 1.5 : 1.8}
                    strokeDasharray={strokeDash}
                    fill="none"
                    opacity={opacity}
                    markerEnd={isCritique ? "url(#arrowCritique)" : "url(#arrowTransmit)"}
                    style={{ transition: "opacity 0.4s ease" }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const cx = toSVG(node.x, svgSize.w);
                const cy = toSVG(node.y, svgSize.h);
                const r = Math.max(14, (node.radius / 28) * Math.min(svgSize.w, svgSize.h) * 0.065);
                const isSelected = selectedNode && selectedNode.id === node.id;
                const isHovered = hoveredNode === node.id;
                const isCenter = node.id === "hegel";

                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      if (!isCenter) {
                        setSelectedNode(isSelected ? null : node);
                      }
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: isCenter ? "default" : "pointer" }}
                  >
                    {(isSelected || isHovered) && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 8}
                        fill={node.color}
                        opacity="0.15"
                        style={{ transition: "all 0.2s ease" }}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={isCenter ? "#1a1000" : "#0e0c08"}
                      stroke={node.color}
                      strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 2}
                      filter={isCenter || isSelected ? "url(#glow)" : "none"}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    {isCenter && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r * 0.65}
                        fill="#D4A017"
                        opacity="0.25"
                      />
                    )}
                    <text
                      x={cx}
                      y={cy - (node.sublabel ? 4 : 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={node.color}
                      fontSize={Math.max(8, r * 0.55)}
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                    {node.sublabel && (
                      <text
                        x={cx}
                        y={cy + r * 0.5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={node.color}
                        fontSize={Math.max(6, r * 0.38)}
                        fontFamily="Georgia, serif"
                        opacity="0.75"
                      >
                        {node.sublabel}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mode explanation */}
          <div style={{
            marginTop: "12px",
            padding: "10px 14px",
            background: criticalMode ? "#1a0808" : "#100e04",
            border: `1px solid ${criticalMode ? "#FF6B6B44" : "#D4A01733"}`,
            borderRadius: "6px",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#a09060",
            lineHeight: 1.5,
          }}>
            {criticalMode
              ? "Critique mode: dashed red arrows show where each tradition pushed back against Hegel — challenging Eurocentrism, idealism, or the promise of reconciliation."
              : "Transmission mode: gold lines trace the flow of Hegelian concepts across two centuries of thought. Toggle 'Show Critiques' to see where traditions resisted."}
          </div>

          {/* Selected node detail */}
          {selectedNode && (
            <div style={{
              marginTop: "20px",
              background: "#12100a",
              border: `2px solid ${selectedNode.color}`,
              borderRadius: "10px",
              padding: "clamp(14px, 2.5vw, 22px)",
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}>
                <div>
                  <div style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    color: selectedNode.color,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>{domainLabels[selectedNode.domain]}</div>
                  <h3 style={{
                    fontSize: "clamp(16px, 2.4vw, 22px)",
                    color: selectedNode.color,
                    margin: 0,
                  }}>{selectedNode.label} <span style={{ fontSize: "0.65em", opacity: 0.7 }}>{selectedNode.sublabel}</span></h3>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a09060",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}>Hegelian concept: {selectedNode.concept}</div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${selectedNode.color}55`,
                    color: selectedNode.color,
                    borderRadius: "4px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif",
                  }}
                >Close</button>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.7vw, 14px)",
                lineHeight: 1.75,
                color: "#d4c090",
                margin: "0 0 14px 0",
              }}>{selectedNode.description}</p>
              {selectedNode.critique && (
                <div style={{
                  borderTop: "1px solid #2a2010",
                  paddingTop: "12px",
                }}>
                  <div style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    color: "#FF6B6B",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>Where They Pushed Back</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#c0a080",
                    margin: 0,
                    fontStyle: "italic",
                  }}>{selectedNode.critique}</p>
                </div>
              )}
            </div>
          )}

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            borderTop: "1px solid #2a2010",
            paddingTop: "20px",
          }}>
            <h3 style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "#D4A017",
              margin: "0 0 12px 0",
            }}>Critical Appropriation</h3>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#b8a870",
              margin: "0 0 12px 0",
            }}>
              Hegel himself declared that philosophy is "its time comprehended in thoughts." This means the Hegelian legacy cannot simply be transmitted whole — each generation must rethink freedom, recognition, and alienation in light of its own historical situation. The most productive inheritance is neither dogmatic repetition nor wholesale rejection, but critical appropriation: preserving the dialectical method while interrogating its assumptions.
            </p>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#b8a870",
              margin: 0,
            }}>
              The thinkers on this map did not simply apply Hegel — they transformed him. Marx materialized the dialectic; Kierkegaard individualized it; Fanon decolonized it; Lacan psychoanalyzed it. Even neuroscience has arrived, through entirely different methods, at the Hegelian conclusion that selfhood is irreducibly intersubjective. This convergence from multiple directions suggests something more than historical accident: these ideas persist because they address perennial features of the human condition.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${accent}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accent : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? accent : accent + "55"}`,
                  borderRadius: 20,
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c8c0b4",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accent}44`, borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: accent, marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderLeft: "4px solid #8E44AD",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#8E44AD",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "12px",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#c8b8d8",
            margin: "0 0 12px 0",
          }}>
            This is the final movement of the series, and the difficulty it leaves is generative rather than aporetic: the Hegelian legacy has no clean resolution because productive intellectual inheritance requires ongoing critical transformation, not canonical closure. Every appropriation creates a new interpretation, and every critique generates new possibilities. The demand to preserve dialectical insight while rejecting Eurocentric assumptions about historical progress is itself a dialectical task — and one that remains genuinely open.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            lineHeight: 1.7,
            color: "#9a8aaa",
            margin: 0,
            fontStyle: "italic",
          }}>
            This openness is not a failure of the system but its deepest truth: philosophy is always already the task of comprehending one's own time in thought — and the time is never finished arriving.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 28px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              color: "#D4A017",
              textTransform: "uppercase",
              fontVariant: "small-caps",
            }}>Real-World Echoes</span>
            <span style={{ color: "#D4A017" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
              borderTop: "1px solid #2a2010",
            }}>
              {[
                {
                  title: "20th-Century Revolutionary Movements",
                  text: "Revolutionary movements in Russia, China, and Cuba drew explicitly on Marxist-Hegelian dialectic — understanding history as driven by contradictions that generate their own supersession. Lenin, Mao, and Che each adapted the dialectical method to specific national conditions, exemplifying the critical appropriation the legacy demands.",
                },
                {
                  title: "Fanon and Colonial Psychology",
                  text: "In Black Skin, White Masks (1952), Frantz Fanon deployed the master–slave dialectic to expose how colonialism imposes a split consciousness on the colonized — forcing them to see themselves through the eyes of the colonizer. This is Hegel's recognition structure analyzed under conditions Hegel never contemplated.",
                },
                {
                  title: "Lacan and the Linguistic Unconscious",
                  text: "Jacques Lacan's seminars throughout the 1950s–70s systematically reread Freud through Hegel, particularly through Alexandre Kojève's influential lectures. The mirror stage, the structure of desire, and the symbolic order all bear the imprint of Hegelian intersubjectivity translated into psychoanalytic register.",
                },
                {
                  title: "The Analytic Hegelian Revival",
                  text: "John McDowell's Mind and World (1994), Robert Brandom's Making It Explicit (1994), and Terry Pinkard's Hegel's Phenomenology (1994) collectively launched a Hegelian revival in Anglophone philosophy, demonstrating that Hegel's insights about conceptual holism, normativity, and second nature remain vital for contemporary debates.",
                },
                {
                  title: "Simone de Beauvoir and the Second Sex",
                  text: "De Beauvoir's landmark work (1949) showed that the Hegelian structure of recognition — where one consciousness constitutes itself as essential by rendering another inessential — operates with particular force in the construction of femininity. Woman is made 'Other' so that Man can achieve selfhood without reciprocity.",
                },
                {
                  title: "Neuroscience and Intersubjective Selfhood",
                  text: "Research on social cognition, mirror neurons, and infant development confirms that self-awareness does not precede social interaction but emerges through it. Babies develop a sense of self by being recognized, named, and responded to — an empirical convergence with Hegel's claim that self-consciousness achieves satisfaction only in another self-consciousness.",
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  padding: "16px 0",
                  borderBottom: i < 5 ? "1px solid #1a1508" : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#D4A017",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#a09060",
                    margin: 0,
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "16px 0",
          borderTop: "1px solid #2a2010",
        }}>
          <p style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#5a4a20",
            margin: 0,
            letterSpacing: "0.1em",
          }}>
            Part 20 of 20 — End of Hegel's Complete Philosophical System
          </p>
          <p style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#D4A01755",
            margin: "6px 0 0 0",
            fontStyle: "italic",
          }}>
            "Philosophy is its own time apprehended in thoughts." — G.W.F. Hegel
          </p>
        </div>

      </div>
    </div>
  );
}

const vizMap = {
  "dialectical_method": DialecticalMethod,
  "journey_of_consciousness": JourneyOfConsciousness,
  "master_slave_dialectic": MasterSlaveDialectic,
  "architecture_of_the_absolute": ArchitectureOfTheAbsolute,
  "science_of_logic": ScienceOfLogic,
  "philosophy_of_nature": PhilosophyOfNature,
  "philosophy_of_spirit": PhilosophyOfSpirit,
  "science_of_freedom": ScienceOfFreedom,
  "philosophy_of_history": PhilosophyOfHistory,
  "absolute_spirit_art_religion_philosophy": AbsoluteSpiritArtReligionPhilosophy,
  "recognition_structure": RecognitionStructure,
  "kant_critique": KantCritique,
  "unhappy_consciousness": UnhappyConsciousness,
  "civil_society": CivilSociety,
  "hegel_and_marx": HegelAndMarx,
  "end_of_art": EndOfArt,
  "hegelian_aesthetics": HegelianAesthetics,
  "alienation": Alienation,
  "speculative_method": SpeculativeMethod,
  "living_legacy": LivingLegacy
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