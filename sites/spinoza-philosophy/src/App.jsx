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
    id: "spinoza_introduction",
    name: "The Most Dangerous Philosopher in Europe",
    subtitle: "Spinoza's revolutionary systematic philosophy challenged every foundational assumption of European civilization about God, nature, freedom, and authority.",
    part: 1,
  },
  {
    id: "making_of_revolutionary_mind",
    name: "The Making of a Revolutionary Mind",
    subtitle: "Spinoza's journey from star Talmudic pupil to excommunicated outcast forged the intellectual independence necessary for his philosophical revolution.",
    part: 2,
  },
  {
    id: "revolutionary_metaphysics_god_or_nature",
    name: "God or Nature: Substance Monism",
    subtitle: "Spinoza's most radical claim — that reality consists of exactly one substance identical with both God and nature — demolishes the entire architecture of medieval and early modern philosophy.",
    part: 3,
  },
  {
    id: "architecture_of_reality_attributes_modes",
    name: "Attributes and Modes: The Architecture of Reality",
    subtitle: "Spinoza explains how the absolute unity of one infinite substance manifests in the rich diversity of finite things through a hierarchy of attributes and modes.",
    part: 4,
  },
  {
    id: "unity_of_mind_and_body",
    name: "Solving the Cartesian Problem: The Unity of Mind and Body",
    subtitle: "Spinoza dissolves Descartes' intractable mind-body problem by showing that mind and body are not two substances that interact but two attributive descriptions of the same individual reality.",
    part: 5,
  },
  {
    id: "ladder_of_knowledge",
    name: "The Ladder of Knowledge: From Imagination to Intuition",
    subtitle: "Spinoza distinguishes three ascending kinds of cognition — imagination, reason, and intuition — representing not just different amounts of information but qualitative transformations of consciousness itself.",
    part: 6,
  },
  {
    id: "conatus_essential_drive",
    name: "Conatus: The Essential Drive of All Things",
    subtitle: "Spinoza's concept of conatus — the universal striving of every thing to persevere and enhance its being — provides the metaphysical bridge between abstract substance theory and concrete human psychology.",
    part: 7,
  },
  {
    id: "emotional_life_passion_to_action",
    name: "From Passion to Action: The Emotional Life",
    subtitle: "Spinoza treats emotions as natural phenomena — specific kinds of thoughts accompanied by bodily changes in power — that can be systematically understood and transformed rather than merely suppressed or indulged.",
    part: 8,
  },
  {
    id: "freedom_within_necessity",
    name: "Freedom Within Necessity: Determinism and Human Agency",
    subtitle: "Spinoza reconceives freedom not as exemption from causal determination but as being determined by causes that express one's own essential nature rather than alien external forces.",
    part: 9,
  },
  {
    id: "art_of_living_ethics_flourishing",
    name: "The Art of Living: Ethics and Human Flourishing",
    subtitle: "Spinoza's ethics asks not what external authorities command but what kinds of lives, virtues, and relationships actually promote genuine human flourishing as rational and social beings.",
    part: 10,
  },
  {
    id: "political_vision_democracy_liberation",
    name: "Democracy and Human Liberation: The Political Vision",
    subtitle: "Spinoza grounds democratic governance and intellectual freedom in naturalistic analysis of what institutional arrangements actually enhance the collective capacity for rational and creative life.",
    part: 11,
  },
  {
    id: "critique_of_religion_scripture",
    name: "Critique of Religion and Scripture",
    subtitle: "Spinoza applies rigorous rational analysis to biblical texts and religious institutions, separating genuine moral and spiritual insight from accumulated superstition and political manipulation.",
    part: 12,
  },
  {
    id: "miracles_prophecy_natural_order",
    name: "Miracles, Prophecy, and Natural Order",
    subtitle: "Spinoza's consistent naturalism eliminates supernatural interventions as logically impossible given that natural law expresses the immutable divine nature itself.",
    part: 13,
  },
  {
    id: "social_contract_natural_right",
    name: "Natural Right and Social Contract: The Political Foundation",
    subtitle: "Spinoza grounds political authority not in abstract consent or divine right but in the demonstrated enhancement of citizens' collective power to achieve their essential goals.",
    part: 14,
  },
  {
    id: "education_transformation_society",
    name: "Education and the Transformation of Society",
    subtitle: "Although Spinoza never wrote a systematic theory of education, his framework implies that genuine education is a fundamental transformation of consciousness — not information transfer — that cannot succeed without concurrent social reform.",
    part: 15,
  },
  {
    id: "problem_of_evil_suffering",
    name: "Evil, Suffering, and the Limits of Finite Existence",
    subtitle: "Spinoza reframes evil not as an absolute metaphysical category but as the natural collision of finite beings with conflicting interests, reducible through greater wisdom and better social organization.",
    part: 16,
  },
  {
    id: "eternity_minds_immortality",
    name: "Eternity and the Mind's Immortality",
    subtitle: "Spinoza offers a naturalistic account of mental eternity — not personal survival after death but the mind's progressive participation in eternal truths that transcends ordinary temporal existence.",
    part: 17,
  },
  {
    id: "geometric_method_demonstration",
    name: "The Geometric Method and Philosophical Demonstration",
    subtitle: "Spinoza's decision to present his philosophy in the form of geometric definitions, axioms, and propositions reflects deep convictions about how certainty can be achieved and rhetorical distortion eliminated in philosophy.",
    part: 18,
  },
  {
    id: "spinoza_influence_later_philosophy",
    name: "Spinoza's Influence on Later Philosophy",
    subtitle: "Spinoza's system generated cycles of suppression and rediscovery across three centuries, with each generation creatively appropriating his insights to address their own philosophical challenges.",
    part: 19,
  },
  {
    id: "contemporary_relevance_modern_applications",
    name: "Contemporary Relevance: Spinoza for the Modern World",
    subtitle: "Spinoza's naturalistic framework continues to offer resources for contemporary challenges in neuroscience, environmental ethics, democratic theory, and the search for authentic human flourishing beyond consumer individualism.",
    part: 20,
  },
  {
    id: "unity_of_spinozas_system_final_integration",
    name: "The Unity of Spinoza's System: Final Integration",
    subtitle: "The true genius of Spinoza's achievement is the systematic unity that integrates metaphysics, epistemology, psychology, ethics, and politics into a single coherent vision where every element illuminates every other.",
    part: 21,
  }
];

const accentMap = {
  "spinoza_introduction": "#1A1A2E",
  "making_of_revolutionary_mind": "#2D4A6E",
  "revolutionary_metaphysics_god_or_nature": "#4B0082",
  "architecture_of_reality_attributes_modes": "#006B6B",
  "unity_of_mind_and_body": "#2E7D32",
  "ladder_of_knowledge": "#B45309",
  "conatus_essential_drive": "#C2410C",
  "emotional_life_passion_to_action": "#9D174D",
  "freedom_within_necessity": "#1E40AF",
  "art_of_living_ethics_flourishing": "#D97706",
  "political_vision_democracy_liberation": "#0F766E",
  "critique_of_religion_scripture": "#7C2D12",
  "miracles_prophecy_natural_order": "#4C1D95",
  "social_contract_natural_right": "#065F46",
  "education_transformation_society": "#1D4ED8",
  "problem_of_evil_suffering": "#78350F",
  "eternity_minds_immortality": "#5B21B6",
  "geometric_method_demonstration": "#374151",
  "spinoza_influence_later_philosophy": "#0E7490",
  "contemporary_relevance_modern_applications": "#15803D",
  "unity_of_spinozas_system_final_integration": "#6D28D9"
};

const bgMap = {
  "spinoza_introduction": "stormy emergence",
  "making_of_revolutionary_mind": "turbulent awakening",
  "revolutionary_metaphysics_god_or_nature": "cosmic dissolution",
  "architecture_of_reality_attributes_modes": "crystalline clarity",
  "unity_of_mind_and_body": "integrative warmth",
  "ladder_of_knowledge": "ascending illumination",
  "conatus_essential_drive": "vital tension",
  "emotional_life_passion_to_action": "turbulent warmth",
  "freedom_within_necessity": "contested clarity",
  "art_of_living_ethics_flourishing": "warm flourishing",
  "political_vision_democracy_liberation": "civic possibility",
  "critique_of_religion_scripture": "excavating fire",
  "miracles_prophecy_natural_order": "twilight revelation",
  "social_contract_natural_right": "grounded authority",
  "education_transformation_society": "dawning understanding",
  "problem_of_evil_suffering": "somber resilience",
  "eternity_minds_immortality": "luminous infinity",
  "geometric_method_demonstration": "architectural precision",
  "spinoza_influence_later_philosophy": "reverberating legacy",
  "contemporary_relevance_modern_applications": "living relevance",
  "unity_of_spinozas_system_final_integration": "unified radiance"
};

// ─── Part 1: The Most Dangerous Philosopher in Europe ───
function SpinozaIntroduction() {
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredEcho, setHoveredEcho] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const pillars = [
    {
      id: "metaphysics",
      label: "Metaphysics",
      shortLabel: "Meta-\nphysics",
      symbol: "∞",
      color: "#7B68EE",
      description:
        "The foundation of everything: there is only one substance — God or Nature — and all things are modes of this single infinite being. This radical monism dissolves the dualism between mind and matter, Creator and creation.",
      connections: ["human-nature", "emotions", "ethics", "politics"],
      role: "Provides the ontological ground from which all other claims derive their necessity.",
    },
    {
      id: "human-nature",
      label: "Human Nature",
      shortLabel: "Human\nNature",
      symbol: "◈",
      color: "#4FC3F7",
      description:
        "Humans are not free agents standing apart from nature but finite modes of the one substance. Mind and body are two expressions of the same thing. There is no will separate from causation — only drives and affects.",
      connections: ["metaphysics", "emotions", "ethics", "politics"],
      role: "Translates metaphysical monism into a specific account of what we are and how we operate.",
    },
    {
      id: "emotions",
      label: "Emotions",
      shortLabel: "Emotions",
      symbol: "⟁",
      color: "#FF8A65",
      description:
        "Emotions (affects) are not obstacles to reason but the very engine of human motivation. They increase or decrease our power to act. Understanding them scientifically — not moralizing them — is the path to freedom.",
      connections: ["metaphysics", "human-nature", "ethics", "politics"],
      role: "Bridges the metaphysics of power with the practical ethics of living well.",
    },
    {
      id: "ethics",
      label: "Ethics",
      shortLabel: "Ethics",
      symbol: "✦",
      color: "#A5D6A7",
      description:
        "Virtue is not obedience to external commandments but the expression of one's own rational nature. The highest good is understanding — knowing God/Nature as fully as possible. Freedom is achieved through reason, not revealed religion.",
      connections: ["metaphysics", "human-nature", "emotions", "politics"],
      role: "Derives a complete theory of the good life from the nature of substance and the mechanics of emotion.",
    },
    {
      id: "politics",
      label: "Politics",
      shortLabel: "Politics",
      symbol: "⬡",
      color: "#F48FB1",
      description:
        "Political authority is legitimate only insofar as it serves rational freedom. Democratic organization best reflects the natural equality of rational beings. Freedom of thought is not merely permitted — it is the purpose of the state.",
      connections: ["metaphysics", "human-nature", "emotions", "ethics"],
      role: "Extends the ethics of rational freedom into a theory of just governance and intellectual liberty.",
    },
  ];

  const pillarWidth = 90;
  const pillarSpacing = 20;
  const svgWidth = 560;
  const svgHeight = 420;
  const baseY = 360;
  const roofY = 60;
  const totalWidth = pillars.length * pillarWidth + (pillars.length - 1) * pillarSpacing;
  const startX = (svgWidth - totalWidth) / 2;

  const getPillarX = (i) => startX + i * (pillarWidth + pillarSpacing);
  const getPillarCenter = (i) => getPillarX(i) + pillarWidth / 2;

  const pillarHeights = [220, 200, 210, 195, 215];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: ["#7B68EE", "#4FC3F7", "#FF8A65", "#A5D6A7", "#F48FB1"][
        Math.floor(Math.random() * 5)
      ],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = H;
          p.x = Math.random() * W;
        }
        if (p.x < 0 || p.x > W) p.vx *= -1;
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const getSelectedPillarObj = () =>
    selectedPillar ? pillars.find((p) => p.id === selectedPillar) : null;

  const isConnected = (pillarId) => {
    if (!selectedPillar) return false;
    const sp = pillars.find((p) => p.id === selectedPillar);
    return sp && sp.connections.includes(pillarId);
  };

  const getConnectionLines = () => {
    if (!selectedPillar) return [];
    const sp = pillars.find((p) => p.id === selectedPillar);
    if (!sp) return [];
    const fromIdx = pillars.findIndex((p) => p.id === selectedPillar);
    const fromX = getPillarCenter(fromIdx);
    const fromY = baseY - pillarHeights[fromIdx];
    return sp.connections.map((connId) => {
      const toIdx = pillars.findIndex((p) => p.id === connId);
      const toX = getPillarCenter(toIdx);
      const toY = baseY - pillarHeights[toIdx];
      const connPillar = pillars.find((p) => p.id === connId);
      return { fromX, fromY, toX, toY, color: connPillar.color, id: connId };
    });
  };

  const lines = getConnectionLines();

  const realWorldEchoes = [
    {
      title: "Modern Biblical Criticism",
      text: "Spinoza's Theological-Political Treatise pioneered treating scripture as a human historical document, founding the discipline of academic biblical scholarship practiced in every major university today.",
    },
    {
      title: "Neuroscience & Cognitive Psychology",
      text: "Antonio Damasio's landmark work Descartes' Error draws directly on Spinoza's account of emotions as bodily information central to rational decision-making — vindicating his philosophy through neurobiology.",
    },
    {
      title: "Enlightenment Democratic Theory",
      text: "Spinoza's argument that the purpose of the state is to protect intellectual freedom became a cornerstone of liberal democratic thought, influencing Locke, Jefferson, and the architects of constitutional republics.",
    },
    {
      title: "Philosophy of Consciousness",
      text: "Contemporary debates about emergentism, panpsychism, and the mind-body problem continually return to Spinoza's attribute theory as a live option for dissolving the hard problem of consciousness.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 40% 30%, #1A1A2E 0%, #0d0d1a 45%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        color: "#e8e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "min(90vw, 780px)",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "36px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#7B68EE",
              marginBottom: "12px",
              opacity: 0.9,
            }}
          >
            Part 1 of 21 — Spinoza's Philosophical System
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 38px)",
              fontWeight: "normal",
              margin: "0 0 14px 0",
              lineHeight: 1.2,
              color: "#f0eefc",
              letterSpacing: "-0.5px",
            }}
          >
            The Most Dangerous Philosopher in Europe
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.8vw, 16px)",
              color: "#a0a0c0",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "min(90vw, 580px)",
            }}
          >
            Spinoza's revolutionary systematic philosophy challenged every foundational assumption
            of European civilization about God, nature, freedom, and authority.
          </p>
        </div>

        {/* Main Visualization */}
        <div
          style={{
            background: "rgba(15, 15, 35, 0.85)",
            border: "1px solid rgba(123, 104, 238, 0.25)",
            borderRadius: "16px",
            padding: "32px 24px",
            marginBottom: "28px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <h2
              style={{
                fontSize: "13px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#7B68EE",
                margin: "0 0 8px 0",
                fontWeight: "normal",
              }}
            >
              The Philosophical Architecture
            </h2>
            <p style={{ fontSize: "13px", color: "#7070a0", margin: "0 0 20px 0" }}>
              Click any pillar to reveal how it connects to and supports every other domain
            </p>
          </div>

          {/* SVG Architecture */}
          <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              width="100%"
              style={{ display: "block", maxWidth: svgWidth }}
            >
              {/* Background glow for selected */}
              {selectedPillar && (() => {
                const idx = pillars.findIndex((p) => p.id === selectedPillar);
                const sp = pillars[idx];
                return (
                  <ellipse
                    cx={getPillarCenter(idx)}
                    cy={baseY - pillarHeights[idx] / 2}
                    rx={55}
                    ry={pillarHeights[idx] / 2 + 20}
                    fill={sp.color + "18"}
                  />
                );
              })()}

              {/* Connection lines */}
              {lines.map((line, i) => (
                <g key={line.id}>
                  <line
                    x1={line.fromX}
                    y1={line.fromY}
                    x2={line.toX}
                    y2={line.toY}
                    stroke={line.color}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity="0.7"
                    style={{
                      filter: `drop-shadow(0 0 6px ${line.color})`,
                    }}
                  >
                    <animate
                      attributeName="strokeDashoffset"
                      from="0"
                      to="-40"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <circle cx={line.toX} cy={line.toY} r="5" fill={line.color} opacity="0.9">
                    <animate
                      attributeName="r"
                      values="4;7;4"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.9;0.4;0.9"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}

              {/* Roof / pediment */}
              <polygon
                points={`${startX - 20},${roofY + 40} ${svgWidth / 2},${roofY} ${startX + totalWidth + 20},${roofY + 40}`}
                fill="none"
                stroke="rgba(123,104,238,0.5)"
                strokeWidth="2"
              />
              <rect
                x={startX - 20}
                y={roofY + 40}
                width={totalWidth + 40}
                height="10"
                fill="rgba(123,104,238,0.2)"
                rx="2"
              />

              {/* Entablature text */}
              <text
                x={svgWidth / 2}
                y={roofY + 28}
                textAnchor="middle"
                fill="#a090e0"
                fontSize="11"
                fontFamily="Georgia, serif"
                letterSpacing="2"
              >
                DEUS SIVE NATURA
              </text>

              {/* Base platform */}
              <rect
                x={startX - 20}
                y={baseY}
                width={totalWidth + 40}
                height="14"
                fill="rgba(123,104,238,0.25)"
                rx="3"
              />
              <rect
                x={startX - 10}
                y={baseY + 14}
                width={totalWidth + 20}
                height="8"
                fill="rgba(123,104,238,0.15)"
                rx="2"
              />

              {/* Pillars */}
              {pillars.map((pillar, i) => {
                const x = getPillarX(i);
                const cx = getPillarCenter(i);
                const h = pillarHeights[i];
                const isSelected = selectedPillar === pillar.id;
                const isHovered = hoveredPillar === pillar.id;
                const connected = isConnected(pillar.id);
                const dimmed = selectedPillar && !isSelected && !connected;

                return (
                  <g
                    key={pillar.id}
                    onClick={() =>
                      setSelectedPillar(isSelected ? null : pillar.id)
                    }
                    onMouseEnter={() => setHoveredPillar(pillar.id)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pillar shaft */}
                    <rect
                      x={x + 10}
                      y={baseY - h}
                      width={pillarWidth - 20}
                      height={h}
                      rx="4"
                      fill={
                        isSelected
                          ? pillar.color + "55"
                          : isHovered
                          ? pillar.color + "33"
                          : connected
                          ? pillar.color + "22"
                          : "rgba(40,40,70,0.6)"
                      }
                      stroke={
                        isSelected
                          ? pillar.color
                          : isHovered || connected
                          ? pillar.color + "99"
                          : "rgba(100,100,150,0.3)"
                      }
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      opacity={dimmed ? 0.3 : 1}
                      style={
                        isSelected || isHovered
                          ? { filter: `drop-shadow(0 0 12px ${pillar.color}88)` }
                          : {}
                      }
                    />

                    {/* Capital (top decoration) */}
                    <rect
                      x={x + 6}
                      y={baseY - h - 8}
                      width={pillarWidth - 12}
                      height="10"
                      rx="3"
                      fill={
                        isSelected ? pillar.color + "77" : pillar.color + "33"
                      }
                      stroke={pillar.color + (isSelected ? "cc" : "55")}
                      strokeWidth="1"
                      opacity={dimmed ? 0.3 : 1}
                    />

                    {/* Base (bottom decoration) */}
                    <rect
                      x={x + 6}
                      y={baseY - 8}
                      width={pillarWidth - 12}
                      height="10"
                      rx="2"
                      fill={pillar.color + "33"}
                      stroke={pillar.color + "55"}
                      strokeWidth="1"
                      opacity={dimmed ? 0.3 : 1}
                    />

                    {/* Symbol in pillar */}
                    <text
                      x={cx}
                      y={baseY - h / 2 + 6}
                      textAnchor="middle"
                      fill={isSelected || isHovered ? pillar.color : pillar.color + "99"}
                      fontSize="22"
                      opacity={dimmed ? 0.3 : 1}
                    >
                      {pillar.symbol}
                    </text>

                    {/* Label below base */}
                    {pillar.shortLabel.split("\n").map((line, li) => (
                      <text
                        key={li}
                        x={cx}
                        y={baseY + 30 + li * 16}
                        textAnchor="middle"
                        fill={
                          isSelected
                            ? pillar.color
                            : isHovered
                            ? "#d0d0f0"
                            : connected
                            ? pillar.color + "cc"
                            : "#8080a0"
                        }
                        fontSize="11"
                        fontFamily="Georgia, serif"
                        opacity={dimmed ? 0.3 : 1}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel for selected pillar */}
          <div
            style={{
              minHeight: "120px",
              marginTop: "12px",
              padding: "20px 24px",
              background: selectedPillar
                ? `rgba(${
                    selectedPillar === "metaphysics"
                      ? "123,104,238"
                      : selectedPillar === "human-nature"
                      ? "79,195,247"
                      : selectedPillar === "emotions"
                      ? "255,138,101"
                      : selectedPillar === "ethics"
                      ? "165,214,167"
                      : "244,143,177"
                  },0.08)`
                : "rgba(20,20,50,0.4)",
              border: selectedPillar
                ? `1px solid ${getSelectedPillarObj()?.color + "44"}`
                : "1px solid rgba(60,60,100,0.3)",
              borderRadius: "10px",
              transition: "all 0.4s ease",
            }}
          >
            {selectedPillar ? (
              (() => {
                const sp = getSelectedPillarObj();
                return (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>{sp.symbol}</span>
                      <div>
                        <div
                          style={{
                            fontSize: "9px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: sp.color,
                            marginBottom: "3px",
                          }}
                        >
                          Pillar
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            color: sp.color,
                            fontWeight: "normal",
                          }}
                        >
                          {sp.label}
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(13px, 1.6vw, 14px)",
                        lineHeight: 1.75,
                        color: "#c8c8e0",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {sp.description}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: 1.6,
                        color: sp.color + "cc",
                        margin: 0,
                        borderTop: `1px solid ${sp.color + "33"}`,
                        paddingTop: "10px",
                        fontStyle: "italic",
                      }}
                    >
                      {sp.role}
                    </p>
                  </div>
                );
              })()
            ) : (
              <p
                style={{
                  fontSize: "clamp(13px, 1.6vw, 14px)",
                  color: "#5050780",
                  textAlign: "center",
                  lineHeight: 1.7,
                  color: "#606090",
                  margin: 0,
                  paddingTop: "20px",
                }}
              >
                Each pillar of Spinoza's system supports and requires all the others. The architecture
                stands as a whole — or not at all. Select any pillar above to trace its connections
                through the entire edifice.
              </p>
            )}
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(123,104,238,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7B68EE", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {[
              { id: "systematic_philosophy", label: "Systematic Philosophy", desc: "Spinoza's philosophy forms a single deductive system where every claim follows necessarily from first principles, making each part inseparable from the whole. To remove one element is to alter all the others — philosophy as architecture, not anthology." },
              { id: "substance_monism", label: "Substance Monism", desc: "The doctrine that exactly one substance — God or Nature — underlies all of reality. Every finite thing is a modification of this single infinite being, not a separate substance in its own right. This dissolves the gulf between creator and creation." },
              { id: "naturalism", label: "Naturalism", desc: "Everything that exists, including minds, values, and human institutions, must be explained through natural causes rather than supernatural intervention. For Spinoza, this was not atheism but a more rigorous form of theology." },
              { id: "excommunication", label: "Excommunication", desc: "The cherem issued against Spinoza in 1656 was the harshest ever issued by the Amsterdam community. Rather than silencing him, it cut him free from communal obligations and social constraints, liberating him to pursue philosophy wherever reason led." },
              { id: "intellectual_liberation", label: "Intellectual Liberation", desc: "The act of reasoning from evidence and internal logic alone, unconstrained by inherited authority. For Spinoza this was not rebellion but the highest form of devotion — thinking God's own thoughts, expressed in the language of geometry and necessity." },
              { id: "philosophical_architecture", label: "Philosophical Architecture", desc: "A philosophical system must cohere like a building, where every claim supports and is supported by every other. The Euclidean form of the Ethics — definitions, axioms, propositions, proofs — embodies this ideal: the structure is the argument." },
            ].map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7B68EE" : "rgba(123,104,238,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#9d8ef5" : "rgba(123,104,238,0.3)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#9080c0",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(123,104,238,0.08)", border: "1px solid rgba(123,104,238,0.2)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7B68EE", marginBottom: 8 }}>
                {[
                  { id: "systematic_philosophy", label: "Systematic Philosophy" },
                  { id: "substance_monism", label: "Substance Monism" },
                  { id: "naturalism", label: "Naturalism" },
                  { id: "excommunication", label: "Excommunication" },
                  { id: "intellectual_liberation", label: "Intellectual Liberation" },
                  { id: "philosophical_architecture", label: "Philosophical Architecture" },
                ].find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {[
                  { id: "systematic_philosophy", desc: "Spinoza's philosophy forms a single deductive system where every claim follows necessarily from first principles, making each part inseparable from the whole. To remove one element is to alter all the others — philosophy as architecture, not anthology." },
                  { id: "substance_monism", desc: "The doctrine that exactly one substance — God or Nature — underlies all of reality. Every finite thing is a modification of this single infinite being, not a separate substance in its own right. This dissolves the gulf between creator and creation." },
                  { id: "naturalism", desc: "Everything that exists, including minds, values, and human institutions, must be explained through natural causes rather than supernatural intervention. For Spinoza, this was not atheism but a more rigorous form of theology." },
                  { id: "excommunication", desc: "The cherem issued against Spinoza in 1656 was the harshest ever issued by the Amsterdam community. Rather than silencing him, it cut him free from communal obligations and social constraints, liberating him to pursue philosophy wherever reason led." },
                  { id: "intellectual_liberation", desc: "The act of reasoning from evidence and internal logic alone, unconstrained by inherited authority. For Spinoza this was not rebellion but the highest form of devotion — thinking God's own thoughts, expressed in the language of geometry and necessity." },
                  { id: "philosophical_architecture", desc: "A philosophical system must cohere like a building, where every claim supports and is supported by every other. The Euclidean form of the Ethics — definitions, axioms, propositions, proofs — embodies this ideal: the structure is the argument." },
                ].find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* The Difficulty Panel */}
        <div
          style={{
            background: "rgba(12, 12, 28, 0.88)",
            border: "1px solid rgba(100, 80, 180, 0.3)",
            borderLeft: "4px solid #4a3a8a",
            borderRadius: "10px",
            padding: "28px 28px 24px 28px",
            marginBottom: "20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#8878c8",
              marginBottom: "14px",
              fontFamily: "Georgia, serif",
            }}
          >
            The Difficulty
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 15px)",
              lineHeight: 1.8,
              color: "#b8b8d8",
              margin: "0 0 14px 0",
            }}
          >
            If Spinoza's system is genuinely unified — if metaphysics, psychology, ethics, and
            politics cannot be understood in isolation from one another — then the entire structure
            rests on a single, audacious claim at its base. Every pillar derives its stability from
            that foundation. Before we can evaluate any part of this edifice, we are compelled to
            ask: what exactly is the radical metaphysical claim from which everything else follows?
          </p>
          <p
            style={{
              fontSize: "clamp(13px, 1.6vw, 14px)",
              lineHeight: 1.75,
              color: "#8070a8",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            This pressure forces the next development: we must descend into the foundations of the
            building and confront Spinoza's most explosive proposition — his account of what
            substance, God, and Nature ultimately are.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div
          style={{
            background: "rgba(10, 10, 25, 0.85)",
            border: "1px solid rgba(80, 70, 140, 0.25)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(123,104,238,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#7060a0",
                fontFamily: "Georgia, serif",
              }}
            >
              Real-World Echoes
            </span>
            {echoesOpen ? (
              <ChevronUp size={16} color="#7060a0" />
            ) : (
              <ChevronDown size={16} color="#7060a0" />
            )}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #7B68EE33" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                {realWorldEchoes.map((echo, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: "3px solid #7B68EE",
                      borderRadius: "0 6px 6px 0",
                      background: "#7B68EE0a",
                      padding: "14px 18px",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#9d8ef5", marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: "#b8b0a8",
                        margin: 0,
                      }}
                    >
                      {echo.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(60,55,100,0.2)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#3a3860",
              letterSpacing: "1px",
            }}
          >
            Spinoza's Philosophical System — Part 1 of 21
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Part 2: The Making of a Revolutionary Mind ───
function MakingOfRevolutionaryMind() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const progressRef = useRef(0);

  const events = [
    {
      id: "birth",
      year: 1632,
      t: 0.05,
      stream: "religious",
      label: "Born in Amsterdam",
      detail: "Baruch Spinoza is born into the Portuguese-Jewish community of Amsterdam — refugees and descendants of those expelled by the Inquisition. The community is devout, prosperous, and intensely protective of its hard-won religious identity.",
      x: null
    },
    {
      id: "talmud_torah",
      year: 1640,
      t: 0.18,
      stream: "religious",
      label: "Talmud Torah School",
      detail: "Enrolled in the prestigious Talmud Torah school, Spinoza becomes a star pupil. He masters Hebrew, Talmudic commentary, and the medieval Jewish philosophers — Maimonides, Gersonides — who tried to reconcile reason with scripture.",
      x: null
    },
    {
      id: "descartes",
      year: 1644,
      t: 0.28,
      stream: "philosophy",
      label: "Descartes' Principles",
      detail: "Descartes' Principia Philosophiae (1644) reaches Amsterdam. His mechanical universe — matter governed by mathematical laws — begins circulating among the Dutch intellectual class. The new philosophy offers a God who is architect, not interventionist.",
      x: null
    },
    {
      id: "father_death",
      year: 1654,
      t: 0.42,
      stream: "religious",
      label: "Father Dies",
      detail: "Michael de Spinoza dies, leaving Baruch to manage the family merchant business. Spinoza is now 22, running a trading firm while secretly devouring Hobbes, Descartes, and the new biblical criticism that treats scripture as a human document.",
      x: null
    },
    {
      id: "hobbes",
      year: 1651,
      t: 0.36,
      stream: "philosophy",
      label: "Hobbes' Leviathan",
      detail: "Thomas Hobbes' Leviathan (1651) argues that religion is a political instrument, that the natural world operates by pure mechanism, and that sovereign power — not divine decree — is the foundation of social order. For Spinoza, this is electrifying.",
      x: null
    },
    {
      id: "excommunication",
      year: 1656,
      t: 0.55,
      stream: "collision",
      label: "Excommunication",
      detail: "On July 27, 1656, the Amsterdam Jewish community pronounces the cherem — the harshest excommunication ever recorded by that community. The document accuses Spinoza of 'abominable heresies' and 'monstrous deeds' without specifying them. He is 23 years old. He never recants.",
      x: null
    },
    {
      id: "lens_grinding",
      year: 1660,
      t: 0.68,
      stream: "synthesis",
      label: "Lens Grinder at Rijnsburg",
      detail: "Having moved to Rijnsburg, Spinoza supports himself by grinding optical lenses — the precision technology behind the new astronomy. The craft embodies his philosophy: understanding nature requires examining it directly, not through inherited scripture.",
      x: null
    },
    {
      id: "short_treatise",
      year: 1662,
      t: 0.78,
      stream: "synthesis",
      label: "Short Treatise on God",
      detail: "Spinoza begins circulating manuscripts among trusted friends. His early Short Treatise stakes out the core claim: God and Nature are identical. There is one infinite substance. What religion calls 'creation' is simply nature expressing itself through infinite modes.",
      x: null
    },
    {
      id: "ethics_begun",
      year: 1665,
      t: 0.90,
      stream: "synthesis",
      label: "Ethics Begun",
      detail: "Spinoza begins composing the Ethics in geometric form — definitions, axioms, propositions, proofs — the architecture of a complete philosophical system. Not theology corrected, not science supplemented: a wholly new account of reality, mind, freedom, and the good life.",
      x: null
    }
  ];

  const streamColors = {
    religious: "#C4A35A",
    philosophy: "#4A9CAD",
    collision: "#E05C3A",
    synthesis: "#6B9E6B"
  };

  const streamLabels = {
    religious: "Religious Tradition",
    philosophy: "New Philosophy",
    collision: "Collision Point",
    synthesis: "Systematic Philosophy"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || canvasW;
    canvas.height = Math.round(canvas.width * (canvasH / canvasW));
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    function getBezierPoint(p0, p1, p2, p3, t) {
      const mt = 1 - t;
      return {
        x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
        y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y
      };
    }

    function getReligiousPoint(t) {
      const collisionX = W * 0.58;
      const collisionY = H * 0.5;
      if (t <= 0.55) {
        const localT = t / 0.55;
        const p0 = { x: W * 0.08, y: H * 0.28 };
        const p1 = { x: W * 0.25, y: H * 0.22 };
        const p2 = { x: W * 0.42, y: H * 0.35 };
        const p3 = { x: collisionX, y: collisionY };
        return getBezierPoint(p0, p1, p2, p3, localT);
      } else {
        const localT = (t - 0.55) / 0.45;
        const p0 = { x: collisionX, y: collisionY };
        const p1 = { x: W * 0.68, y: H * 0.48 };
        const p2 = { x: W * 0.80, y: H * 0.50 };
        const p3 = { x: W * 0.94, y: H * 0.50 };
        return getBezierPoint(p0, p1, p2, p3, localT);
      }
    }

    function getPhilosophyPoint(t) {
      const collisionX = W * 0.58;
      const collisionY = H * 0.5;
      if (t <= 0.55) {
        const localT = t / 0.55;
        const p0 = { x: W * 0.08, y: H * 0.72 };
        const p1 = { x: W * 0.25, y: H * 0.78 };
        const p2 = { x: W * 0.42, y: H * 0.65 };
        const p3 = { x: collisionX, y: collisionY };
        return getBezierPoint(p0, p1, p2, p3, localT);
      } else {
        const localT = (t - 0.55) / 0.45;
        const p0 = { x: collisionX, y: collisionY };
        const p1 = { x: W * 0.68, y: H * 0.52 };
        const p2 = { x: W * 0.80, y: H * 0.50 };
        const p3 = { x: W * 0.94, y: H * 0.50 };
        return getBezierPoint(p0, p1, p2, p3, localT);
      }
    }

    function drawRiver(ctx, getPoint, color, width, steps, alpha) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = alpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const p0 = getPoint(0);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const p = getPoint(t);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawGlow(ctx, getPoint, color, steps, maxT) {
      for (let w = 18; w >= 3; w -= 3) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.globalAlpha = 0.04 + (18 - w) * 0.005;
        ctx.lineCap = "round";
        const p0 = getPoint(0);
        ctx.moveTo(p0.x, p0.y);
        for (let i = 1; i <= steps; i++) {
          const t = (i / steps) * maxT;
          const p = getPoint(t);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      const prog = progressRef.current;
      const steps = 120;

      // Draw full dim paths first
      drawRiver(ctx, getReligiousPoint, "#C4A35A22", 2, steps * 2, 0.15);
      drawRiver(ctx, getPhilosophyPoint, "#4A9CAD22", 2, steps * 2, 0.15);

      // Draw animated religious stream
      if (prog > 0) {
        const rMaxT = Math.min(prog * 1.8, 1);
        drawGlow(ctx, getReligiousPoint, "#C4A35A", steps, rMaxT);
        drawRiver(ctx, getReligiousPoint, "#C4A35A", 3.5, Math.floor(steps * rMaxT), 0.85);
      }

      // Draw animated philosophy stream
      if (prog > 0.05) {
        const pMaxT = Math.min((prog - 0.05) * 1.8, 1);
        drawGlow(ctx, getPhilosophyPoint, "#4A9CAD", steps, pMaxT);
        drawRiver(ctx, getPhilosophyPoint, "#4A9CAD", 3.5, Math.floor(steps * pMaxT), 0.85);
      }

      // Draw synthesis stream after collision
      if (prog > 0.5) {
        const sProgress = (prog - 0.5) / 0.5;
        const sSteps = Math.floor(steps * sProgress);
        ctx.beginPath();
        ctx.strokeStyle = "#6B9E6B";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.85;
        const start = getReligiousPoint(0.55);
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i <= sSteps; i++) {
          const t = 0.55 + (i / steps) * 0.45 * sProgress;
          const p = getReligiousPoint(Math.min(t, 1));
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Glow for synthesis
        for (let w = 22; w >= 5; w -= 4) {
          ctx.beginPath();
          ctx.strokeStyle = "#6B9E6B";
          ctx.lineWidth = w;
          ctx.globalAlpha = 0.03;
          ctx.lineCap = "round";
          const sp = getReligiousPoint(0.55);
          ctx.moveTo(sp.x, sp.y);
          for (let i = 1; i <= sSteps; i++) {
            const t = 0.55 + (i / steps) * 0.45 * sProgress;
            const p = getReligiousPoint(Math.min(t, 1));
            ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Draw collision burst
      if (prog >= 0.5 && prog <= 0.7) {
        const burstIntensity = 1 - Math.abs(prog - 0.6) / 0.1;
        const cx = W * 0.58;
        const cy = H * 0.5;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * burstIntensity);
        gradient.addColorStop(0, `#E05C3A`);
        gradient.addColorStop(1, `#E05C3A00`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.6 * burstIntensity;
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(drawFrame);
    }

    animRef.current = requestAnimationFrame(drawFrame);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + 0.004, 1);
      setAnimProgress(progressRef.current);
      if (progressRef.current >= 1) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  function getEventPosition(event, canvasWidth, canvasHeight) {
    const W = canvasWidth;
    const H = canvasHeight;
    const t = event.t;

    function getBezierPoint(p0, p1, p2, p3, t) {
      const mt = 1 - t;
      return {
        x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
        y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y
      };
    }

    const collisionX = W * 0.58;
    const collisionY = H * 0.5;

    if (event.stream === "religious") {
      const localT = t / 0.55;
      const p0 = { x: W * 0.08, y: H * 0.28 };
      const p1 = { x: W * 0.25, y: H * 0.22 };
      const p2 = { x: W * 0.42, y: H * 0.35 };
      const p3 = { x: collisionX, y: collisionY };
      return getBezierPoint(p0, p1, p2, p3, localT);
    } else if (event.stream === "philosophy") {
      const localT = t / 0.55;
      const p0 = { x: W * 0.08, y: H * 0.72 };
      const p1 = { x: W * 0.25, y: H * 0.78 };
      const p2 = { x: W * 0.42, y: H * 0.65 };
      const p3 = { x: collisionX, y: collisionY };
      return getBezierPoint(p0, p1, p2, p3, localT);
    } else if (event.stream === "collision") {
      return { x: collisionX, y: collisionY };
    } else {
      const localT = (t - 0.55) / 0.45;
      const p0 = { x: collisionX, y: collisionY };
      const p1 = { x: W * 0.68, y: H * 0.48 };
      const p2 = { x: W * 0.80, y: H * 0.50 };
      const p3 = { x: W * 0.94, y: H * 0.50 };
      return getBezierPoint(p0, p1, p2, p3, localT);
    }
  }

  const canvasW = 800;
  const canvasH = 380;

  const [hoveredConcept, setHoveredConcept] = useState(null);

  const concepts = [
    { id: "sephardic", label: "Sephardic Community", color: "#C4A35A", desc: "Portuguese Jewish refugees who rebuilt their world in Amsterdam, maintaining orthodoxy as a survival strategy and identity anchor." },
    { id: "dutch_golden", label: "Dutch Golden Age", color: "#4A9CAD", desc: "Amsterdam in the 1650s was the world's freest intellectual city — printers, scientists, theologians and radicals could all operate here." },
    { id: "excommunication", label: "Excommunication", color: "#E05C3A", desc: "The cherem of 1656 was the most severe ever issued by the Amsterdam community. Paradoxically, it freed Spinoza from having to compromise." },
    { id: "cartesian", label: "Cartesian Influence", color: "#4A9CAD", desc: "Descartes gave Spinoza the tools: mathematical method, mechanistic nature, and the problem of mind-body dualism that Spinoza would resolve by eliminating the duality." },
    { id: "lens_grinding", label: "Lens Grinding", color: "#6B9E6B", desc: "Spinoza's craft was not accidental — lenses extended human perception, revealing a cosmos governed by natural law, not divine whim." },
    { id: "system_building", label: "System Building", color: "#6B9E6B", desc: "Unlike Descartes or Hobbes who left tensions unresolved, Spinoza aimed for total coherence: one substance, one system, no exceptions." }
  ];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #1a2d42 0%, #0d1a27 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d4c9b8",
      padding: "0"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: '0 auto' }}>
      {/* Title Block */}
      <div style={{ padding: "36px 40px 10px 40px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#2D4A6E", marginBottom: "8px", textTransform: "uppercase" }}>Part 2 of 21</div>
        <h1 style={{ fontSize: "32px", fontWeight: "normal", color: "#e8dcc8", margin: "0 0 8px 0", letterSpacing: "0.5px" }}>
          The Making of a Revolutionary Mind
        </h1>
        <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#8a9db5", margin: 0, fontStyle: "italic" }}>
          Spinoza's journey from star Talmudic pupil to excommunicated outcast forged the intellectual independence necessary for his philosophical revolution.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{
        margin: "16px 40px",
        padding: "24px 28px",
        background: "rgba(10,12,20,0.85)",
        border: "1px solid rgba(45,74,110,0.3)",
        borderLeft: "4px solid #2D4A6E",
        borderRadius: 8,
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#2D4A6E",
          marginBottom: "14px",
          fontFamily: "Georgia, serif"
        }}>The Problem</div>
        <p style={{
          fontSize: "clamp(14px, 1.8vw, 17px)",
          lineHeight: "1.75",
          color: "#c8bca8",
          margin: 0,
          fontStyle: "italic"
        }}>
          The introduction established that Spinoza's system is radically unified — but how did a single person come to develop such a sweeping challenge to all received wisdom? What confluence of forces produced a thinker willing to dismantle the entire framework of Western theology and replace it with something no one had yet imagined?
        </p>
      </div>

      {/* Main Visualization */}
      <div style={{ padding: "24px 40px 16px 40px" }}>
        <div style={{
          background: "rgba(8,14,24,0.9)",
          border: "1px solid #2D4A6E44",
          borderRadius: "4px",
          padding: "28px 24px 20px 24px"
        }}>
          {/* Legend */}
          <div style={{ display: "flex", gap: "28px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: "12px", color: "#8a9db5", letterSpacing: "1px", textTransform: "uppercase", marginRight: "4px" }}>Streams:</div>
            {[
              { color: "#C4A35A", label: "Religious Tradition" },
              { color: "#4A9CAD", label: "New Philosophy" },
              { color: "#E05C3A", label: "1656 — Collision" },
              { color: "#6B9E6B", label: "Systematic Philosophy" }
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "28px", height: "3px", background: item.color, borderRadius: "2px" }}></div>
                <span style={{ fontSize: "12px", color: "#a09585" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Canvas + SVG overlay */}
          <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", borderRadius: "2px" }}
            />

            {/* SVG overlay for event nodes */}
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible" }}
              viewBox={`0 0 ${canvasW} ${canvasH}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Year labels */}
              <text x={canvasW * 0.08} y={canvasH - 12} fill="#2D4A6E" fontSize="11" fontFamily="Georgia, serif" textAnchor="middle">1632</text>
              <text x={canvasW * 0.58} y={canvasH - 12} fill="#E05C3A" fontSize="11" fontFamily="Georgia, serif" textAnchor="middle">1656</text>
              <text x={canvasW * 0.94} y={canvasH - 12} fill="#6B9E6B" fontSize="11" fontFamily="Georgia, serif" textAnchor="middle">1665+</text>

              {/* Stream labels */}
              <text x={6} y={canvasH * 0.18} fill="#C4A35A99" fontSize="10" fontFamily="Georgia, serif" textAnchor="start" fontStyle="italic">Religious</text>
              <text x={6} y={canvasH * 0.82} fill="#4A9CAD99" fontSize="10" fontFamily="Georgia, serif" textAnchor="start" fontStyle="italic">Philosophy</text>

              {events.map(event => {
                const pos = getEventPosition(event, canvasW, canvasH);
                const isHovered = hoveredEvent === event.id;
                const isSelected = selectedEvent === event.id;
                const color = streamColors[event.stream];
                const isVisible = animProgress >= event.t - 0.05;

                if (!isVisible) return null;

                return (
                  <g key={event.id}>
                    {/* Glow ring on hover */}
                    {(isHovered || isSelected) && (
                      <circle cx={pos.x} cy={pos.y} r={18} fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={event.stream === "collision" ? 11 : 8}
                      fill={isHovered || isSelected ? color : "#0a0e18"}
                      stroke={color}
                      strokeWidth={event.stream === "collision" ? 2.5 : 1.8}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={() => setHoveredEvent(event.id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    />
                    {/* Year label */}
                    <text
                      x={pos.x}
                      y={pos.y - (event.stream === "collision" ? 18 : 15)}
                      fill={color}
                      fontSize="10"
                      fontFamily="Georgia, serif"
                      textAnchor="middle"
                      opacity="0.9"
                    >
                      {event.year}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Event detail cards — positioned absolutely */}
            {(hoveredEvent || selectedEvent) && (() => {
              const activeId = selectedEvent || hoveredEvent;
              const event = events.find(e => e.id === activeId);
              if (!event) return null;
              const pos = getEventPosition(event, canvasW, canvasH);
              const color = streamColors[event.stream];
              const canvasEl = canvasRef.current;
              const canvasDisplayW = canvasEl ? canvasEl.clientWidth : canvasW;
              const scaleX = canvasDisplayW / canvasW;
              const canvasDisplayH = canvasEl ? canvasEl.clientHeight : canvasH;
              const scaleY = canvasDisplayH / canvasH;

              const cardX = pos.x * scaleX;
              const cardY = pos.y * scaleY;
              const cardW = 240;
              const containerW = canvasDisplayW;

              let leftPos = cardX - cardW / 2;
              if (leftPos < 8) leftPos = 8;
              if (leftPos + cardW > containerW - 8) leftPos = containerW - cardW - 8;

              let topPos = cardY - 130;
              if (topPos < 8) topPos = cardY + 28;

              return (
                <div style={{
                  position: "absolute",
                  left: `${leftPos}px`,
                  top: `${topPos}px`,
                  width: `${cardW}px`,
                  background: "rgba(8,14,24,0.97)",
                  border: `1px solid ${color}`,
                  borderRadius: "3px",
                  padding: "14px 16px",
                  pointerEvents: "none",
                  zIndex: 10,
                  boxShadow: `0 0 20px ${color}33`
                }}>
                  <div style={{ fontSize: "10px", color: color, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                    {event.year} — {streamLabels[event.stream]}
                  </div>
                  <div style={{ fontSize: "13px", color: "#e8dcc8", fontWeight: "bold", marginBottom: "6px" }}>
                    {event.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#a09585", lineHeight: "1.6" }}>
                    {event.detail}
                  </div>
                </div>
              );
            })()}
          </div>

          <p style={{ fontSize: "12px", color: "#4a5c6e", textAlign: "center", marginTop: "12px", fontStyle: "italic" }}>
            Hover or click the nodes along each stream to reveal historical detail
          </p>
        </div>
      </div>

      {/* Core Argument */}
      <div style={{ padding: "0 40px 28px 40px" }}>
        <div style={{
          background: "rgba(45,74,110,0.12)",
          border: "1px solid #2D4A6E33",
          borderRadius: "3px",
          padding: "24px 28px"
        }}>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: "1.8", color: "#c0b49a", margin: 0 }}>
            Spinoza grew up at the intersection of rigorous religious tradition and the explosive new philosophy of Descartes and Hobbes, creating an unbearable contradiction between what reason demanded and what faith required. His excommunication at 23, rather than silencing him, liberated him to pursue philosophy wherever reason led. His manual craft of lens-grinding grounded him in practical reality while he constructed the most radical philosophical system in European history — one that would not compromise between the two streams that had formed him, but would dissolve them both into a wholly new foundation.
          </p>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ padding: "0 40px 16px 40px" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(45,74,110,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2D4A6E", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#2D4A6E" : "rgba(45,74,110,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#4a7aae" : "rgba(45,74,110,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7a9ab8",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(45,74,110,0.08)", border: "1px solid rgba(45,74,110,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#2D4A6E", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty Panel */}
      <div style={{
        margin: "0 40px 16px 40px",
        padding: "24px 28px",
        background: "rgba(10,12,20,0.85)",
        border: "1px solid rgba(74,110,90,0.3)",
        borderLeft: "4px solid #4A6E5A",
        borderRadius: 8,
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#4A6E5A",
          marginBottom: "14px"
        }}>The Difficulty</div>
        <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: "1.75", color: "#b8c8b4", margin: "0 0 16px 0" }}>
          Having been freed from institutional constraints, Spinoza faced an urgent metaphysical demand: he could not merely reject the God-world dualism of his tradition — he needed to replace it. The excommunication cleared the path, but left a chasm. What is reality, fundamentally, if not a creator God standing apart from a created world? What can mind, matter, freedom, and morality mean without that scaffolding?
        </p>
        <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: "1.7", color: "#7a9e8a", margin: 0, fontStyle: "italic" }}>
          This pressure forces the next development: Spinoza must construct a new account of substance itself — the bedrock of all reality — that can support everything he wants to say about God, nature, mind, and human liberation without importing the old dualisms through the back door.
        </p>
      </div>

      {/* Real-World Echoes */}
      <div style={{
        margin: "16px 40px 32px 40px",
        background: "#2D4A6E08",
        border: "1px solid #2D4A6E33",
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setEchosOpen(!echosOpen)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#8ab0c8" }}>
            Real-World Echoes
          </span>
          {echosOpen ? <ChevronUp size={16} color="#8ab0c8" /> : <ChevronDown size={16} color="#8ab0c8" />}
        </button>

        {echosOpen && (
          <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #2D4A6E33" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
              {[
                {
                  title: "Spanish and Portuguese Inquisition Refugees",
                  body: "The Amsterdam Sephardic community was built by those who had been forcibly converted and then fled. Their fierce orthodoxy was a survival identity — making Spinoza's internal questioning not merely heterodox but existentially threatening to communal cohesion."
                },
                {
                  title: "The Dutch Republic as Intellectual Laboratory",
                  body: "The Dutch Republic's commercial pragmatism made it uniquely tolerant — printers could publish what was forbidden everywhere else. Amsterdam was where Descartes lived when he wrote his major works, and where radical ideas circulated in coffeehouses and merchant networks."
                },
                {
                  title: "Descartes' Mechanical Philosophy",
                  body: "Descartes had argued that nature was pure mechanism — matter governed by mathematical laws — while preserving a separate, immaterial mind and a creator God. Spinoza read this as an unstable compromise: if nature is purely mechanical, what role does God actually play?"
                },
                {
                  title: "Biblical Textual Criticism",
                  body: "Scholars in Spinoza's circle were applying philological methods to scripture — asking when texts were written, by whom, and for what political purpose. This historical approach to sacred texts was the intellectual detonator Spinoza would later systematize in the Theological-Political Treatise."
                }
              ].map(item => (
                <div key={item.title} style={{
                  borderLeft: "3px solid #2D4A6E",
                  borderRadius: "0 6px 6px 0",
                  background: "#2D4A6E0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#8ab0c8", marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

// ─── Part 3: God or Nature: Substance Monism ───
function RevolutionaryMetaphysicsGodOrNature() {
  const [sliderValue, setSliderValue] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const naturalLaws = [
    { id: 'physics', label: 'Physics', desc: 'Conservation laws, gravity, electromagnetism — the modes through which infinite substance expresses its extension.' },
    { id: 'biology', label: 'Biology', desc: 'Evolution and cellular life — nature\'s self-organization expressing conatus, the drive of each thing to persist in being.' },
    { id: 'mind', label: 'Mind', desc: 'Thought and consciousness — not a ghost in a machine, but the same substance known under the attribute of Thought.' },
    { id: 'mathematics', label: 'Mathematics', desc: 'Geometric necessity itself — the very form of divine-natural causation, as triangles necessitate their properties.' },
    { id: 'ethics', label: 'Ethics', desc: 'Human affect and reason — emotions are adequate or inadequate ideas, natural forces to be understood, not suppressed.' },
    { id: 'society', label: 'Society', desc: 'Political life and cooperation — finite modes of the one substance striving together, equally expressions of God-Nature.' },
  ];

  const concepts = [
    { id: 'monism', label: 'Substance Monism', desc: 'Only one substance exists. Everything else is a mode or attribute of that single infinite being.' },
    { id: 'deus', label: 'Deus sive Natura', desc: '"God or Nature" — not two things but one, viewed under different descriptions. Theology and science share the same object.' },
    { id: 'necessity', label: 'Geometric Necessity', desc: 'Things follow from God-Nature as theorems from axioms — with absolute logical necessity, not arbitrary will.' },
    { id: 'infinite', label: 'Infinite Substance', desc: 'The one substance has infinite attributes, of which we know two: Extension (matter) and Thought (mind).' },
    { id: 'necessitarianism', label: 'Necessitarianism', desc: 'Nothing could be otherwise. Contingency is merely our ignorance of causes, not a feature of reality.' },
    { id: 'causation', label: 'Divine Causation', desc: 'God is not an external creator but the immanent cause of all things — nature causing itself from within.' },
  ];

  const t = sliderValue / 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 700;
    canvas.height = canvas.offsetHeight || 420;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const W = canvas.width;
    const H = canvas.height;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.angle += (Math.random() - 0.5) * 0.05;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#8B5CF6`;
        ctx.globalAlpha = p.opacity * (0.3 + t * 0.7);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [t]);

  const lerp = (a, b, t) => a + (b - a) * t;

  const godY = lerp(60, 200, t);
  const godOpacity = lerp(1, 0, Math.min(t * 1.5, 1));
  const creatureOpacity = lerp(1, 0, Math.min(t * 1.5, 1));
  const arrowOpacity = lerp(1, 0, Math.min(t * 2, 1));
  const unifiedOpacity = lerp(0, 1, Math.max(0, (t - 0.4) / 0.6));
  const unifiedScale = lerp(0.3, 1, Math.max(0, (t - 0.4) / 0.6));
  const labelSize = lerp(0, 18, Math.max(0, (t - 0.6) / 0.4));

  const dotPositions = [
    { x: 160, y: 310, law: naturalLaws[0] },
    { x: 280, y: 290, law: naturalLaws[1] },
    { x: 380, y: 320, law: naturalLaws[2] },
    { x: 210, y: 360, law: naturalLaws[3] },
    { x: 330, y: 355, law: naturalLaws[4] },
    { x: 270, y: 230, law: naturalLaws[5] },
  ];

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: 'radial-gradient(ellipse at center, #1a003a 0%, #0a0a0f 100%)',
      minHeight: '100vh',
      padding: '40px 24px',
      color: '#e8d5ff',
    }}>
      <div style={{ maxWidth: "min(90vw, 760px)", margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: '#8B5CF6', textTransform: 'uppercase', marginBottom: 8 }}>
            Part 3 of 21
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 'normal', color: '#f0e6ff', margin: '0 0 10px 0', lineHeight: 1.3 }}>
            God or Nature: Substance Monism
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: '#b89fd4', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
            Spinoza's most radical claim — that reality consists of exactly one substance identical with both God and nature — demolishes the entire architecture of medieval and early modern philosophy.
          </p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: '#0f0518',
          border: '1px solid #2a1040',
          borderLeft: '4px solid #4B0082',
          borderRadius: 8,
          padding: '24px 28px',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#4B0082', textTransform: 'uppercase', marginBottom: 12, fontWeight: 'bold' }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.8, color: '#cbb5e8' }}>
            For over a thousand years, European thought had divided reality into two irreconcilable realms: an infinite, perfect, transcendent God on one side, and a finite, contingent, created world on the other. God made nature; nature depended on God; and between them ran an unbridgeable ontological gap. Descartes had reinforced this architecture with his own dualisms — mind versus body, God versus extension. Spinoza saw that this framework was not merely philosophically unsatisfying. It was <em>logically incoherent</em>. A foundation for rational philosophy could not be built on a crack between two worlds that had no way of meeting.
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: '#0c0220',
          border: '1px solid #2a1040',
          borderRadius: 12,
          padding: '28px',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4 }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#8B5CF6', textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold' }}>
              The Substance Collapse
            </div>

            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#a07cc5' }}>Apply Spinoza's Logic</span>
                <span style={{ fontSize: 12, color: '#4B0082', fontStyle: 'italic' }}>
                  {t < 0.2 ? 'Traditional dualism' : t < 0.5 ? 'Distinctions dissolving...' : t < 0.8 ? 'Convergence underway...' : 'Deus sive Natura'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={e => { setSliderValue(Number(e.target.value)); setClickedPoint(null); }}
                style={{
                  width: '100%',
                  accentColor: '#4B0082',
                  cursor: 'pointer',
                  height: 4,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b4a8a', marginTop: 4 }}>
                <span>Medieval Dualism</span>
                <span>Spinoza's Monism</span>
              </div>
            </div>

            {/* SVG Diagram */}
            <div style={{ position: 'relative' }}>
              <svg width="100%" viewBox="0 0 540 420" style={{ display: 'block' }}>
                {/* Background glow for unified field */}
                {t > 0.4 && (
                  <ellipse
                    cx={270}
                    cy={295}
                    rx={lerp(0, 160, Math.max(0, (t - 0.4) / 0.6))}
                    ry={lerp(0, 120, Math.max(0, (t - 0.4) / 0.6))}
                    fill="none"
                    stroke="#4B0082"
                    strokeWidth={2}
                    opacity={unifiedOpacity * 0.6}
                  />
                )}
                {t > 0.4 && (
                  <ellipse
                    cx={270}
                    cy={295}
                    rx={lerp(0, 190, Math.max(0, (t - 0.4) / 0.6))}
                    ry={lerp(0, 145, Math.max(0, (t - 0.4) / 0.6))}
                    fill="url(#unifiedGlow)"
                    opacity={unifiedOpacity * 0.3}
                  />
                )}

                <defs>
                  <radialGradient id="unifiedGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7B2FBE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4B0082" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="godGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Creation Arrows */}
                {[180, 270, 360].map((x, i) => (
                  <line
                    key={i}
                    x1={270}
                    y1={100}
                    x2={x}
                    y2={280 - i * 10 + i * 10}
                    stroke="#FFD700"
                    strokeWidth={1.5}
                    strokeDasharray="5,4"
                    opacity={arrowOpacity * 0.7}
                  />
                ))}

                {/* God circle */}
                <g opacity={godOpacity} filter="url(#glow)">
                  <circle cx={270} cy={godY} r={38} fill="url(#godGlow)" opacity={0.15} />
                  <circle cx={270} cy={godY} r={28} fill="#1a0e00" stroke="#FFD700" strokeWidth={2} />
                  <text x={270} y={godY - 6} textAnchor="middle" fill="#FFD700" fontSize={10} fontFamily="Georgia, serif">GOD</text>
                  <text x={270} y={godY + 8} textAnchor="middle" fill="#FFD700" fontSize={8} fontFamily="Georgia, serif" fontStyle="italic">transcendent</text>
                </g>

                {/* Creature circles */}
                {[
                  { x: 160, y: 310, label: 'Rocks', sub: 'finite' },
                  { x: 270, y: 330, label: 'Plants', sub: 'finite' },
                  { x: 380, y: 310, label: 'Minds', sub: 'finite' },
                ].map((c, i) => {
                  const cx = lerp(c.x, 270, t);
                  const cy = lerp(c.y, 295, t);
                  return (
                    <g key={i} opacity={creatureOpacity}>
                      <circle cx={cx} cy={cy} r={22} fill="#0d1a2a" stroke="#4488aa" strokeWidth={1.5} />
                      <text x={cx} y={cy - 4} textAnchor="middle" fill="#88bbdd" fontSize={9} fontFamily="Georgia, serif">{c.label}</text>
                      <text x={cx} y={cy + 8} textAnchor="middle" fill="#6699aa" fontSize={7} fontFamily="Georgia, serif" fontStyle="italic">{c.sub}</text>
                    </g>
                  );
                })}

                {/* Unified Deus sive Natura field */}
                {t > 0.4 && (
                  <g>
                    <text
                      x={270}
                      y={lerp(500, 270, Math.max(0, (t - 0.4) / 0.6))}
                      textAnchor="middle"
                      fill="#c084fc"
                      fontSize={labelSize}
                      fontFamily="Georgia, serif"
                      fontStyle="italic"
                      opacity={unifiedOpacity}
                    >
                      Deus sive Natura
                    </text>
                    {t > 0.6 && dotPositions.map((dp, i) => (
                      <g key={i}
                        onClick={() => setClickedPoint(clickedPoint === dp.law.id ? null : dp.law.id)}
                        onMouseEnter={() => setHoveredPoint(dp.law.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        style={{ cursor: 'pointer' }}
                        opacity={unifiedOpacity}
                      >
                        <circle
                          cx={dp.x}
                          cy={dp.y}
                          r={hoveredPoint === dp.law.id || clickedPoint === dp.law.id ? 9 : 6}
                          fill={clickedPoint === dp.law.id ? '#c084fc' : hoveredPoint === dp.law.id ? '#9b59b6' : '#4B0082'}
                          stroke={hoveredPoint === dp.law.id || clickedPoint === dp.law.id ? '#e0aaff' : '#7B2FBE'}
                          strokeWidth={1.5}
                        />
                        <text
                          x={dp.x}
                          y={dp.y - 13}
                          textAnchor="middle"
                          fill={hoveredPoint === dp.law.id ? '#e0aaff' : '#a78bcc'}
                          fontSize={9}
                          fontFamily="Georgia, serif"
                        >
                          {dp.law.label}
                        </text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Separator line (old dualism) */}
                {t < 0.5 && (
                  <line
                    x1={80}
                    y1={lerp(210, 500, t * 2)}
                    x2={460}
                    y2={lerp(210, 500, t * 2)}
                    stroke="#4B0082"
                    strokeWidth={1}
                    strokeDasharray="8,6"
                    opacity={lerp(0.5, 0, t * 2)}
                  />
                )}
                {t < 0.5 && (
                  <text x={90} y={lerp(205, 495, t * 2)} fill="#6b4a8a" fontSize={9} fontFamily="Georgia, serif" opacity={lerp(0.5, 0, t * 2)}>
                    ontological divide
                  </text>
                )}
              </svg>

              {/* Clicked point description */}
              {clickedPoint && t > 0.6 && (
                <div style={{
                  marginTop: 12,
                  background: '#150830',
                  border: '1px solid #4B0082',
                  borderRadius: 8,
                  padding: '14px 18px',
                  animation: 'none',
                }}>
                  {naturalLaws.filter(l => l.id === clickedPoint).map(l => (
                    <div key={l.id}>
                      <div style={{ fontSize: 13, color: '#c084fc', marginBottom: 6, fontStyle: 'italic' }}>
                        Studying {l.label} is studying God-Nature:
                      </div>
                      <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", color: '#cbb5e8', lineHeight: 1.7 }}>{l.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {t > 0.6 && !clickedPoint && (
                <p style={{ fontSize: 12, color: '#6b4a8a', textAlign: 'center', margin: '8px 0 0 0', fontStyle: 'italic' }}>
                  Click any point in the unified field to discover what natural law governs it
                </p>
              )}
            </div>

            {/* Core Argument Text */}
            <div style={{ marginTop: 24, borderTop: '1px solid #2a1040', paddingTop: 20 }}>
              <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.8, color: '#b89fd4', margin: '0 0 12px 0' }}>
                Spinoza's argument is surgical: a genuine substance is that which exists in itself and is conceived through itself. If two substances shared an attribute, one could be conceived through the other — violating the definition of substance. Therefore no two substances share attributes, and since the infinite substance has all attributes, no other substance can exist alongside it. The logic collapses the gap between creator and creation.
              </p>
              <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.8, color: '#b89fd4', margin: 0 }}>
                What theology called God's acts of creation are simply the immanent self-expression of infinite nature. What scientists study as natural law is identical with divine causation. The triangle does not "choose" to have angles summing to 180° — it follows of necessity from what a triangle is. So too with everything in existence.
              </p>
            </div>

          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(75,0,130,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7B2FBE', marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: '6px 14px',
                  background: hoveredConcept === c.id ? '#7B2FBE' : 'rgba(75,0,130,0.1)',
                  border: `1px solid ${hoveredConcept === c.id ? '#9d50e0' : 'rgba(75,0,130,0.35)'}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: hoveredConcept === c.id ? '#f0ead8' : '#c084fc',
                  transition: 'all 0.2s',
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: 'rgba(75,0,130,0.08)', border: '1px solid rgba(75,0,130,0.3)', borderRadius: 6, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: '#c084fc', marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#c8c0b4' }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. THE DIFFICULTY PANEL */}
        <div style={{
          background: '#0f0518',
          border: '1px solid #2a1040',
          borderLeft: '4px solid #6B21A8',
          borderRadius: 8,
          padding: '24px 28px',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#6B21A8', textTransform: 'uppercase', marginBottom: 12, fontWeight: 'bold' }}>
            The Difficulty
          </div>
          <p style={{ margin: '0 0 12px 0', fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.8, color: '#cbb5e8' }}>
            Spinoza's monism creates a vertigo of its own. If there is only one infinite substance and all finite things are merely its modes — waves on a single ocean — then what exactly are we? What is a rock, a thought, a grief, a choice? The rich plurality of human experience seems to dissolve into a single undifferentiated field. Even more troubling: if everything follows from the divine-natural substance with the same necessity that geometric theorems follow from axioms, then nothing could ever be different from how it is. Your choices, your regrets, your moral striving — all necessary, all inevitable.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.8, color: '#cbb5e8' }}>
            This pressure forces the next development: Spinoza must explain how an infinite, unified, necessary substance gives rise to finite, diverse, apparently contingent things — and he must do so in a way that salvages meaningful ethics and human freedom. The architecture of attributes and modes awaits.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: '#0f0518',
          border: '1px solid #2a1040',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          <div
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 28px',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#150830'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#4B0082', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Real-World Echoes
            </div>
            {echoesOpen
              ? <ChevronUp size={18} color="#4B0082" />
              : <ChevronDown size={18} color="#4B0082" />
            }
          </div>
          {echoesOpen && (
            <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #4B008233' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: "Mathematical Necessity and Discovery",
                    body: "When mathematicians investigate the properties of prime numbers, they do not \"create\" those properties — they discover necessities that were always there, just as Spinoza's God-Nature expresses its essence with geometric certainty. The boundary between discovery and revelation dissolves.",
                  },
                  {
                    title: "The Unified Field Theory Aspiration",
                    body: "Modern physics searching for a unified field theory — a single framework from which all forces and particles emerge — mirrors Spinoza's intuition. The aspiration to find one substrate beneath apparent multiplicity is his metaphysics reborn in mathematics.",
                  },
                  {
                    title: "Prayer and Natural Transformation",
                    body: "When someone prays for rain during a drought, Spinoza would not call the prayer superstitious — but he would note that its real effects are psychological clarity, community solidarity, and renewed attention to the environment. Nature does not bend; the pray-er changes. The same God is at work either way.",
                  },
                  {
                    title: "Einstein's God",
                    body: "Einstein, famously, believed in \"Spinoza's God\" — not a personal deity who intervenes in history, but the rational harmony underlying natural law. When he said he wanted to know God's thoughts, he meant the equations that hold the universe in necessary form.",
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    borderLeft: '3px solid #4B0082',
                    borderRadius: '0 6px 6px 0',
                    background: '#4B00820a',
                    padding: '14px 18px',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 'bold', color: '#9b72cf', marginBottom: 6 }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#b8b0a8' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36, fontSize: 12, color: '#3d1a5c', letterSpacing: 1 }}>
          Part 3 of 21 — Spinoza's Ethics
        </div>
      </div>
    </div>
  );
}

// ─── Part 4: Attributes and Modes: The Architecture of Reality ───
function ArchitectureOfRealityAttributesModes() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [parallelHighlight, setParallelHighlight] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const sec4Concepts = [
    { id: "attributes", label: "Attributes", desc: "What the intellect perceives as constituting the essence of substance. Extension and Thought are not separate realities but two complete vocabularies — like two languages translating the same text. Every truth statable in one is statable in the other, yet neither reduces to the other." },
    { id: "infinite_modes", label: "Infinite Modes", desc: "Universal, eternal patterns that pervade an entire attribute without being particular things — the laws of physics for Extension, the principles of logic for Thought. They are neither substance nor finite things but the universal structure through which substance expresses itself." },
    { id: "finite_modes", label: "Finite Modes", desc: "Particular, temporary things existing in and through substance — this rock, this thought, this person. Every finite mode is causally determined by prior finite modes in an infinite chain. No finite mode exists independently; each is a temporary individuation of substance." },
    { id: "parallelism", label: "Parallelism", desc: "The order and connection of ideas is the same as the order and connection of things. Mind and body are not causally related but two complete descriptions of one underlying reality. The same event that is a brain state in Extension is, simultaneously, a thought in the attribute of Thought." },
    { id: "extension_attr", label: "Extension", desc: "The attribute of substance corresponding to physical, spatial, material reality. Everything physical — bodies, forces, motions — exists within Extension. It is not a separate substance but one way the intellect perceives infinite substance as a whole." },
    { id: "thought_attr", label: "Thought", desc: "The attribute of substance corresponding to mental, conceptual reality. Every idea, mind, and conscious experience exists within Thought. The entire mental realm is one complete self-sufficient register for describing substance — parallel to Extension but never reducible to it." },
  ];

  const accent = "#006B6B";
  const accentLight = "#00A0A0";
  const accentDim = "#004444";

  const extensionNodes = [
    { id: "ext_infinite", label: "Laws of Motion", level: "infinite", x: 200, y: 120, desc: "The universal, eternal laws governing all extended matter — infinite modes of Extension expressing necessary physical principles across all space and time." },
    { id: "ext_general_1", label: "Physical Bodies", level: "general", x: 120, y: 210, desc: "The general category of all physical objects — finite modes of Extension that share the property of occupying space and having measurable properties." },
    { id: "ext_general_2", label: "Natural Forces", level: "general", x: 260, y: 210, desc: "Gravity, electromagnetism, the interactions that bind matter — general finite modes expressing causal relationships within the attribute of Extension." },
    { id: "ext_finite_1", label: "A Rock", level: "finite", x: 70, y: 300, desc: "This particular rock — a finite mode of Extension, temporarily individuated, embedded in infinite causal chains of prior physical causes.", pair: "tho_finite_1" },
    { id: "ext_finite_2", label: "A Human Body", level: "finite", x: 160, y: 300, desc: "Your body — a finite mode of Extension, a complex pattern of matter in motion, causally determined by prior physical states.", pair: "tho_finite_2" },
    { id: "ext_finite_3", label: "A River", level: "finite", x: 250, y: 300, desc: "A flowing river — a finite mode, its form arising from and dissolving back into the causal network of extended nature.", pair: "tho_finite_3" },
    { id: "ext_finite_4", label: "A Flame", level: "finite", x: 330, y: 300, desc: "A flame's physical process — a finite mode of Extension, nothing more than matter and energy in temporary configuration.", pair: "tho_finite_4" },
  ];

  const thoughtNodes = [
    { id: "tho_infinite", label: "Laws of Logic", level: "infinite", x: 200, y: 120, desc: "The universal, eternal principles of reason and inference — infinite modes of Thought expressing necessary logical structure across all minds and ideas." },
    { id: "tho_general_1", label: "Concepts & Ideas", level: "general", x: 120, y: 210, desc: "The general category of all ideas — finite modes of Thought that represent, correspond to, and track the structure of extended reality." },
    { id: "tho_general_2", label: "Mental Causation", level: "general", x: 260, y: 210, desc: "The logical connections between ideas — how one thought follows necessarily from another, parallel to physical causation in Extension." },
    { id: "tho_finite_1", label: "Idea of a Rock", level: "finite", x: 70, y: 300, desc: "The idea of this particular rock — a finite mode of Thought, the exact parallel to the rock as extended mode. Same order, same connection.", pair: "ext_finite_1" },
    { id: "tho_finite_2", label: "A Human Mind", level: "finite", x: 160, y: 300, desc: "Your mind — a finite mode of Thought, the idea of your body. Mind and body are not two things but one thing described in two attributes.", pair: "ext_finite_2" },
    { id: "tho_finite_3", label: "Idea of a River", level: "finite", x: 250, y: 300, desc: "The idea of the river — tracking in the register of Thought everything the river is in the register of Extension.", pair: "ext_finite_3" },
    { id: "tho_finite_4", label: "Experience of Heat", level: "finite", x: 330, y: 300, desc: "The felt sensation of heat — the mental side of what is physically a flame. Not caused by the flame: the same reality described in Thought.", pair: "ext_finite_4" },
  ];

  const connections = [
    { from: "ext_infinite", to: "ext_general_1" },
    { from: "ext_infinite", to: "ext_general_2" },
    { from: "ext_general_1", to: "ext_finite_1" },
    { from: "ext_general_1", to: "ext_finite_2" },
    { from: "ext_general_1", to: "ext_finite_3" },
    { from: "ext_general_2", to: "ext_finite_4" },
    { from: "tho_infinite", to: "tho_general_1" },
    { from: "tho_infinite", to: "tho_general_2" },
    { from: "tho_general_1", to: "tho_finite_1" },
    { from: "tho_general_1", to: "tho_finite_2" },
    { from: "tho_general_1", to: "tho_finite_3" },
    { from: "tho_general_2", to: "tho_finite_4" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 900;
    canvas.height = canvas.offsetHeight || 500;
    const ctx = canvas.getContext("2d");
    let t = 0;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#00A0A0`;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t + p.x));
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const getNodeById = (id) => {
    return [...extensionNodes, ...thoughtNodes].find(n => n.id === id);
  };

  const isHighlighted = (node) => {
    if (!parallelHighlight) return false;
    return node.id === parallelHighlight || node.pair === parallelHighlight || node.id === selectedNode?.id || node.pair === selectedNode?.id;
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setParallelHighlight(node.id);
  };

  const levelColors = {
    infinite: "#FFD700",
    general: accentLight,
    finite: "#B0E0E0",
  };

  const levelSizes = {
    infinite: 22,
    general: 16,
    finite: 12,
  };

  const renderTree = (nodes, side, offsetX) => {
    const allNodes = [...extensionNodes, ...thoughtNodes];
    return (
      <g transform={`translate(${offsetX}, 0)`}>
        {connections
          .filter(c => c.from.startsWith(side === "ext" ? "ext" : "tho"))
          .map((conn, i) => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return null;
            const isActive = parallelHighlight && (
              conn.from === parallelHighlight || conn.to === parallelHighlight ||
              allNodes.find(n => n.id === conn.from)?.pair === parallelHighlight ||
              allNodes.find(n => n.id === conn.to)?.pair === parallelHighlight
            );
            return (
              <line
                key={i}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={isActive ? accentLight : accentDim}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.9 : 0.4}
              />
            );
          })}
        {nodes.map((node) => {
          const r = levelSizes[node.level];
          const isSelected = selectedNode?.id === node.id;
          const isPaired = selectedNode?.pair === node.id || selectedNode?.id === node.pair;
          const isHov = hoveredNode === node.id;
          const color = levelColors[node.level];
          const glowing = isSelected || isPaired;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: "pointer" }}
            >
              {glowing && (
                <circle r={r + 10} fill={color} opacity={0.15} />
              )}
              {isHov && (
                <circle r={r + 6} fill={color} opacity={0.12} />
              )}
              <circle
                r={r}
                fill={glowing ? color : "#0d2020"}
                stroke={color}
                strokeWidth={glowing ? 2.5 : 1.5}
                opacity={0.95}
              />
              <text
                textAnchor="middle"
                dy={r + 14}
                fill={glowing ? color : "#9ECECE"}
                fontSize={node.level === "infinite" ? 11 : node.level === "general" ? 10 : 9}
                fontFamily="Georgia, serif"
                fontWeight={glowing ? "bold" : "normal"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const svgWidth = 900;
  const svgHeight = 400;
  const centerX = svgWidth / 2;

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #002828 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#D0EDED",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "min(90vw, 960px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 8, opacity: 0.6, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: accentLight }}>
            Part 4 of 21 — Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", color: "#E8F8F8", margin: "0 0 6px 0", letterSpacing: 0.5 }}>
            Attributes and Modes: The Architecture of Reality
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#88BBBB", margin: 0, lineHeight: 1.6 }}>
            Spinoza explains how the absolute unity of one infinite substance manifests in the rich diversity of finite things through a hierarchy of attributes and modes.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#0d1a1a",
          border: "1px solid #1a3030",
          borderLeft: `4px solid ${accent}`,
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: accent, marginBottom: 12, fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "clamp(13px, 1.8vw, 15px)", color: "#C8E8E8" }}>
            Substance monism established one infinite substance — but this hard-won unity immediately generates a new crisis. If everything is one substance, what happens to difference? What happens to the particular — this rock, this thought, this person? The danger is collapse: an undifferentiated unity that swallows all diversity into a featureless whole, leaving us unable to account for the obvious fact that things are genuinely different from one another. How can finite, diverse, particular things exist within a single infinite substance without being dissolved into nothing?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0a1818",
          border: "1px solid #1a3030",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Canvas background particles */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: accent, marginBottom: 6 }}>
              The Architecture of Reality
            </div>
            <p style={{ fontSize: 13, color: "#88AAAA", margin: "0 0 20px 0", lineHeight: 1.6 }}>
              Click any node to reveal its nature and automatically highlight its parallel. Every finite thing exists twice — once in Extension, once in Thought — as two descriptions of the same underlying reality.
            </p>

            {/* Attribute labels */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{
                background: "#0d2a2a",
                border: `1px solid ${accentDim}`,
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 13,
                color: accentLight,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}>
                Extension (Matter / Space)
              </div>
              <div style={{
                background: "#1a1a08",
                border: "1px solid #44440d",
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 13,
                color: "#D4D460",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}>
                Substance
              </div>
              <div style={{
                background: "#0d2a2a",
                border: `1px solid ${accentDim}`,
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 13,
                color: accentLight,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}>
                Thought (Mind / Logic)
              </div>
            </div>

            {/* SVG Tree Diagram */}
            <div style={{ overflowX: "auto" }}>
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" style={{ display: "block", margin: "0 auto", maxWidth: svgWidth }}>
                <defs>
                  <radialGradient id="subGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C8A000" stopOpacity="0.2" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Central substance */}
                <g transform={`translate(${centerX}, 60)`}>
                  <circle r={36} fill="url(#subGrad)" filter="url(#glow)" opacity={0.9} />
                  <circle r={36} fill="none" stroke="#FFD700" strokeWidth={1.5} opacity={0.6} />
                  <text textAnchor="middle" dy={-8} fill="#FFD700" fontSize={10} fontFamily="Georgia, serif" fontWeight="bold">INFINITE</text>
                  <text textAnchor="middle" dy={6} fill="#FFD700" fontSize={10} fontFamily="Georgia, serif" fontWeight="bold">SUBSTANCE</text>
                  <text textAnchor="middle" dy={20} fill="#D4C060" fontSize={9} fontFamily="Georgia, serif">Deus sive Natura</text>
                </g>

                {/* Connecting arms from substance to attributes */}
                <line x1={centerX} y1={96} x2={centerX - 240} y2={140} stroke="#FFD70066" strokeWidth={2} />
                <line x1={centerX} y1={96} x2={centerX + 240} y2={140} stroke="#FFD70066" strokeWidth={2} />

                {/* Parallelism bridge lines between paired finite nodes */}
                {["ext_finite_1","ext_finite_2","ext_finite_3","ext_finite_4"].map((extId) => {
                  const extNode = extensionNodes.find(n => n.id === extId);
                  const thoNode = thoughtNodes.find(n => n.id === extNode?.pair);
                  if (!extNode || !thoNode) return null;
                  const extX = extNode.x + 20;
                  const thoX = thoNode.x + 480;
                  const y = extNode.y + 60;
                  const isActive = parallelHighlight && (
                    extNode.id === parallelHighlight || extNode.pair === parallelHighlight ||
                    thoNode.id === parallelHighlight || thoNode.pair === parallelHighlight
                  );
                  return (
                    <line
                      key={extId}
                      x1={extX} y1={y}
                      x2={thoX} y2={y}
                      stroke={isActive ? "#FFFFFF" : "#FFFFFF"}
                      strokeWidth={isActive ? 1.5 : 0.5}
                      strokeOpacity={isActive ? 0.5 : 0.08}
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Extension petal background */}
                <ellipse cx={200} cy={220} rx={190} ry={150} fill="#006B6B" fillOpacity={0.07} stroke={accent} strokeOpacity={0.2} strokeWidth={1} />

                {/* Thought petal background */}
                <ellipse cx={680} cy={220} rx={190} ry={150} fill="#006B6B" fillOpacity={0.07} stroke={accent} strokeOpacity={0.2} strokeWidth={1} />

                {/* Extension tree */}
                {renderTree(extensionNodes, "ext", 20)}

                {/* Thought tree */}
                {renderTree(thoughtNodes, "tho", 480)}

                {/* Level legend */}
                <g transform="translate(390, 340)">
                  <circle r={8} cx={0} cy={0} fill="#FFD700" />
                  <text x={14} y={4} fill="#FFD700" fontSize={9} fontFamily="Georgia, serif">Infinite modes</text>
                  <circle r={6} cx={0} cy={20} fill={accentLight} />
                  <text x={14} y={24} fill={accentLight} fontSize={9} fontFamily="Georgia, serif">General modes</text>
                  <circle r={5} cx={0} cy={40} fill="#B0E0E0" />
                  <text x={14} y={44} fill="#B0E0E0" fontSize={9} fontFamily="Georgia, serif">Finite modes</text>
                </g>
              </svg>
            </div>

            {/* Selected node detail */}
            {selectedNode ? (
              <div style={{
                marginTop: 20,
                background: "#0d2222",
                border: `1px solid ${accent}`,
                borderRadius: 8,
                padding: "18px 22px",
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: accentLight, marginBottom: 6 }}>
                      {selectedNode.level === "infinite" ? "Infinite Mode" : selectedNode.level === "general" ? "General Mode" : "Finite Mode"} — {selectedNode.id.startsWith("ext") ? "Extension" : "Thought"}
                    </div>
                    <div style={{ fontSize: 18, color: "#E8F8F8", marginBottom: 8, fontWeight: "normal" }}>
                      {selectedNode.label}
                    </div>
                    <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", color: "#AAD0D0", lineHeight: 1.7 }}>
                      {selectedNode.desc}
                    </p>
                  </div>
                  {selectedNode.pair && (
                    <div style={{
                      background: "#0a1818",
                      border: "1px solid #1a3030",
                      borderRadius: 6,
                      padding: "12px 16px",
                      minWidth: 180,
                      flexShrink: 0,
                    }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#D4D460", marginBottom: 6 }}>
                        Parallel Node
                      </div>
                      <div style={{ fontSize: 14, color: "#D0D080" }}>
                        {getNodeById(selectedNode.pair)?.label}
                      </div>
                      <div style={{ fontSize: 12, color: "#888860", marginTop: 4 }}>
                        Same reality, {selectedNode.id.startsWith("ext") ? "Thought" : "Extension"} register
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                marginTop: 20,
                textAlign: "center",
                color: "#446666",
                fontSize: 13,
                fontStyle: "italic",
                padding: "16px",
                border: "1px dashed #1a3030",
                borderRadius: 8,
              }}>
                Click any node in the diagram to explore its place in the hierarchy and discover its parallel
              </div>
            )}

            {/* Prose explanation */}
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{
                background: "#0a1818",
                border: "1px solid #1a3030",
                borderRadius: 8,
                padding: "18px 20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>
                  Attributes
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#AAC8C8", lineHeight: 1.75 }}>
                  An attribute is what the intellect perceives as constituting the essence of substance. Extension and Thought are not separate realities but two complete vocabularies — like two languages translating the same text. Every truth statable in one is statable in the other, yet neither is reducible to the other.
                </p>
              </div>
              <div style={{
                background: "#0a1818",
                border: "1px solid #1a3030",
                borderRadius: 8,
                padding: "18px 20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>
                  Modes
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#AAC8C8", lineHeight: 1.75 }}>
                  A mode is a modification of substance — it exists in and through something else. Infinite modes are universal and eternal (the laws of physics, the principles of logic). Finite modes are particular, temporary, caused by prior finite modes in an infinite chain that constitutes the life of nature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(0,107,107,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: accentLight, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {sec4Concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? accentLight : "rgba(0,160,160,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#00C8C8" : accentDim}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#70B0B0",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(0,160,160,0.08)", border: `1px solid ${accentDim}`, borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: accentLight, marginBottom: 8 }}>
                {sec4Concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {sec4Concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0d1a0d",
          border: "1px solid #1a301a",
          borderLeft: "4px solid #4A8B4A",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#4A8B4A", marginBottom: 12, fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: "clamp(13px, 1.8vw, 15px)", color: "#C0D8C0" }}>
            The parallelism doctrine is elegant, but it generates an acute new problem. If Extension and Thought are two complete and self-sufficient descriptions of the same reality — if every mental event has its full explanation in the mental register, and every physical event has its full explanation in the physical register — then there is no causal passage between them. The mind does not cause the body to move, nor the body cause the mind to feel. They run in perfect parallel, never intersecting.
          </p>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "clamp(13px, 1.8vw, 15px)", color: "#C0D8C0" }}>
            But then what is a human being? How does the knowledge we form in thought actually track the structure of extended matter? What unifies the two descriptions of one person, and how can we acquire genuine knowledge of physical reality through mental operations alone? This pressure forces the next development — Spinoza's account of the human mind as the idea of the human body, and his radical theory of adequate versus inadequate ideas.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0d1a1a",
          border: "1px solid #1a3030",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            onMouseEnter={e => e.currentTarget.style.background = "#0d2020"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "18px 28px",
              cursor: "pointer",
              color: "#D0EDED",
              fontFamily: "Georgia, serif",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: accentLight, fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echosOpen ? <ChevronUp size={18} color={accentLight} /> : <ChevronDown size={18} color={accentLight} />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 28px 24px 28px" }}>
              <div style={{ borderTop: `1px solid ${accentDim}`, paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{
                  background: "#0a1818",
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: "0 6px 6px 0",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: accentLight, marginBottom: 6 }}>
                    Translation as Attribute
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#99BBBB", lineHeight: 1.7 }}>
                    A novel translated into English, French, and Japanese contains the same story — the same characters, the same plot, the same meaning — expressed in three completely self-sufficient linguistic systems. No sentence requires the other language to be valid; yet all three are descriptions of the identical underlying narrative. Spinoza's attributes work like this: Extension and Thought are complete, non-overlapping languages for the single text of reality.
                  </p>
                </div>
                <div style={{
                  background: "#0a1818",
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: "0 6px 6px 0",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: accentLight, marginBottom: 6 }}>
                    Laws of Motion as Infinite Modes
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#99BBBB", lineHeight: 1.7 }}>
                    Newton's laws of motion — or Einstein's field equations — govern every physical event in the universe without exception. They are never violated, never suspended, and no finite object exists outside their reach. These are exactly what Spinoza means by infinite modes of Extension: universal, eternal, necessary patterns that pervade the entire attribute without themselves being particular things.
                  </p>
                </div>
                <div style={{
                  background: "#0a1818",
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: "0 6px 6px 0",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: accentLight, marginBottom: 6 }}>
                    Sensations and Emotions as Finite Modes of Thought
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#99BBBB", lineHeight: 1.7 }}>
                    The sting of anger, the flush of pleasure, the anxiety that surfaces before a difficult conversation — these are not mysterious entities floating free of the natural order. For Spinoza, each is a finite mode of the attribute of Thought: particular, causally embedded in prior mental states, and exactly parallel to specific configurations of the body in Extension. Neuroscience today explores this same correspondence, mapping emotional states to brain states as two descriptions of one underlying process.
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

// ─── Part 5: Solving the Cartesian Problem: The Unity of Mind and Body ───
function UnityOfMindAndBody() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [unifiedView, setUnifiedView] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);
  const canvasRef = useRef(null);

  const mindBodyConcepts = [
    { id: "dualism", label: "Cartesian Dualism", desc: "Descartes' untenable division of reality into unextended mind and unthinking body, leaving their interaction inexplicable." },
    { id: "parallelism", label: "Mind-Body Parallelism", desc: "Every mental event corresponds to a physical event not through causation but through attributive identity — same order, same connection." },
    { id: "unity", label: "Psychosomatic Unity", desc: "Mind and body are one individual mode of substance, not two entities joined together." },
    { id: "adequate", label: "Adequate Ideas", desc: "Knowledge that fully grasps its object — possible only when the body is well-disposed and the mind active rather than passive." },
    { id: "embodied", label: "Embodied Cognition", desc: "The quality of knowing is inseparable from the quality of bodily engagement with the world." },
  ];

  const events = [
    {
      id: "emotion",
      label: "Emotion Arises",
      icon: "♥",
      bodyDesc: "Hormones cascade through bloodstream; heart rate shifts; muscles tense or relax.",
      mindDesc: "An idea of increased or diminished power of acting floods the intellect.",
      color: "#c0392b",
      bodyNodes: [[140, 160], [120, 200], [155, 230], [135, 270]],
      mindNodes: [[310, 150], [340, 185], [315, 220], [345, 260]]
    },
    {
      id: "injury",
      label: "Injury Occurs",
      icon: "⚡",
      bodyDesc: "Tissue damage disrupts the equilibrium of bodily systems and their capacity for action.",
      mindDesc: "The mind's range of ideas contracts; certain thoughts become unavailable.",
      color: "#e67e22",
      bodyNodes: [[130, 180], [145, 210], [125, 250], [150, 285]],
      mindNodes: [[325, 165], [305, 200], [330, 235], [310, 270]]
    },
    {
      id: "learning",
      label: "Learning Happens",
      icon: "✦",
      bodyDesc: "Neural pathways strengthen; the body's disposition toward action expands and diversifies.",
      mindDesc: "New connections form between ideas; the mind's capacity for adequate understanding grows.",
      color: "#2E7D32",
      bodyNodes: [[135, 155], [150, 190], [130, 225], [155, 260], [140, 295]],
      mindNodes: [[315, 145], [340, 175], [320, 210], [345, 245], [325, 280]]
    }
  ];

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.03;
      setPulsePhase(t);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
      canvas.width = canvas.offsetWidth || 480;
      canvas.height = canvas.offsetHeight || 400;
    }
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    if (activeEvent) {
      const ev = events.find(e => e.id === activeEvent);
      if (!ev) return;

      const progress = Math.min(1, (Math.sin(pulsePhase) * 0.5 + 0.5));

      if (!unifiedView) {
        ev.bodyNodes.forEach(([x, y], i) => {
          const delay = i * 0.3;
          const alpha = Math.max(0, Math.sin(pulsePhase - delay) * 0.5 + 0.5);
          const radius = 6 + alpha * 4;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = ev.color + Math.floor(alpha * 200).toString(16).padStart(2, '0');
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = ev.color + Math.floor(alpha * 100).toString(16).padStart(2, '0');
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        ev.mindNodes.forEach(([x, y], i) => {
          const delay = i * 0.3;
          const alpha = Math.max(0, Math.sin(pulsePhase - delay) * 0.5 + 0.5);
          const radius = 5 + alpha * 4;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = ev.color + Math.floor(alpha * 200).toString(16).padStart(2, '0');
          ctx.fill();
          if (i < ev.mindNodes.length - 1) {
            const [nx, ny] = ev.mindNodes[i + 1];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = ev.color + Math.floor(alpha * 80).toString(16).padStart(2, '0');
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });

        const bridgeAlpha = Math.abs(Math.sin(pulsePhase * 0.7));
        ctx.beginPath();
        ctx.moveTo(230, 220);
        ctx.lineTo(240, 220);
        ctx.strokeStyle = ev.color + Math.floor(bridgeAlpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 3;
        ctx.stroke();

      } else {
        const cx = W / 2;
        const cy = H / 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + pulsePhase * 0.5;
          const r = 40 + Math.sin(pulsePhase + i) * 10;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          const alpha = Math.sin(pulsePhase + i * 0.4) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = ev.color + Math.floor(alpha * 200).toString(16).padStart(2, '0');
          ctx.fill();
        }
      }
    } else {
      const cx = W / 2;
      for (let i = 0; i < 5; i++) {
        const y = 120 + i * 60;
        const alpha = Math.sin(pulsePhase * 0.5 + i * 0.8) * 0.3 + 0.15;
        if (!unifiedView) {
          ctx.beginPath();
          ctx.arc(140, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#2E7D32" + Math.floor(alpha * 255).toString(16).padStart(2, '0');
          ctx.fill();
          ctx.beginPath();
          ctx.arc(330, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#2E7D32" + Math.floor(alpha * 255).toString(16).padStart(2, '0');
          ctx.fill();
        } else {
          const angle = (i / 5) * Math.PI * 2 + pulsePhase * 0.3;
          const x = cx + Math.cos(angle) * 50;
          const uy = 220 + Math.sin(angle) * 50;
          ctx.beginPath();
          ctx.arc(x, uy, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#2E7D32" + Math.floor(alpha * 2 * 255).toString(16).padStart(2, '0');
          ctx.fill();
        }
      }
    }
  }, [pulsePhase, activeEvent, unifiedView]);

  const handleEventClick = (id) => {
    setActiveEvent(prev => prev === id ? null : id);
  };

  const currentEvent = events.find(e => e.id === activeEvent);

  const bodyColor = "#1565C0";
  const mindColor = "#6A1B9A";

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "radial-gradient(ellipse at center, #1a3a1c 0%, #0d1f0e 40%, #050a05 100%)",
      minHeight: "100vh",
      padding: "40px 24px",
      color: "#e8f5e9",
      maxWidth: "min(90vw, 860px)",
      margin: "0 auto"
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#66bb6a", marginBottom: 8 }}>Part 5 of 21</div>
        <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", color: "#e8f5e9", margin: "0 0 8px 0" }}>
          Solving the Cartesian Problem: The Unity of Mind and Body
        </h1>
        <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#a5d6a7", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
          Mind and body are not two substances that mysteriously interact — they are two complete descriptions of one and the same mode of infinite substance.
        </p>
      </div>

      {/* PROBLEM PANEL */}
      <div style={{
        background: "rgba(10, 20, 10, 0.85)",
        border: "1px solid #1b5e20",
        borderLeft: "4px solid #2E7D32",
        borderRadius: "8px",
        padding: "28px 32px",
        marginBottom: "36px"
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#66bb6a",
          marginBottom: "14px",
          fontFamily: "Georgia, serif"
        }}>The Problem</div>
        <p style={{
          margin: 0,
          fontSize: "clamp(13px, 1.8vw, 15px)",
          lineHeight: "1.8",
          color: "#c8e6c9",
          fontStyle: "italic"
        }}>
          The attribute framework raised a pressing question: if Extension and Thought are genuinely distinct
          attributes — neither reducible to the other — how do they cohere within a single human being?
          Descartes had already run aground on this reef: an unextended mind supposedly moves a corporeal body
          through the pineal gland, a solution so incoherent it embarrassed even its author. Spinoza inherits
          the wreckage. The challenge is not merely to fix Descartes' account but to show why the very question
          of interaction is malformed — that it rests on a fundamental misunderstanding of what mind and body are.
        </p>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{
        background: "rgba(10, 20, 10, 0.75)",
        border: "1px solid #2E7D32",
        borderRadius: "12px",
        padding: "32px",
        marginBottom: "36px",
        position: "relative"
      }}>
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#66bb6a", marginBottom: "8px" }}>
            The Core Argument
          </div>
          <h2 style={{ margin: "0 0 6px 0", fontSize: "20px", color: "#a5d6a7", fontWeight: "normal" }}>
            Solving the Cartesian Problem: The Unity of Mind and Body
          </h2>
          <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#81c784", fontStyle: "italic" }}>
            "The order and connection of ideas is the same as the order and connection of things." — Ethics II, P7
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <button
            onClick={() => setUnifiedView(false)}
            style={{
              padding: "8px 20px",
              background: !unifiedView ? "#2E7D32" : "transparent",
              border: "1px solid #2E7D32",
              borderRight: "none",
              borderRadius: "6px 0 0 6px",
              color: !unifiedView ? "#fff" : "#81c784",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              fontSize: "13px",
              transition: "all 0.3s"
            }}
          >
            Dualist View
          </button>
          <button
            onClick={() => setUnifiedView(true)}
            style={{
              padding: "8px 20px",
              background: unifiedView ? "#2E7D32" : "transparent",
              border: "1px solid #2E7D32",
              borderLeft: "none",
              borderRadius: "0 6px 6px 0",
              color: unifiedView ? "#fff" : "#81c784",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              fontSize: "13px",
              transition: "all 0.3s"
            }}
          >
            Spinoza's View
          </button>
        </div>

        {/* SVG + Canvas */}
        <div style={{ position: "relative", width: "100%", maxWidth: "min(90vw, 480px)", margin: "0 auto", height: "400px" }}>
          <svg viewBox="0 0 480 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", top: 0, left: 0 }}>
            <defs>
              <radialGradient id="bodyGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#1e88e5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0d47a1" stopOpacity="0.1" />
              </radialGradient>
              <radialGradient id="mindGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#9c27b0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4a148c" stopOpacity="0.1" />
              </radialGradient>
              <radialGradient id="unifiedGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1b5e20" stopOpacity="0.1" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {!unifiedView ? (
              <>
                {/* Body side */}
                <ellipse cx="140" cy="230" rx="70" ry="130" fill="url(#bodyGrad)" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.5" />
                {/* Head */}
                <ellipse cx="140" cy="90" rx="32" ry="38" fill="none" stroke="#1565C0" strokeWidth="1.5" strokeOpacity="0.7" />
                {/* Torso lines */}
                <line x1="120" y1="130" x2="115" y2="200" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="160" y1="130" x2="165" y2="200" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="115" y1="200" x2="108" y2="290" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="165" y1="200" x2="172" y2="290" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.5" />
                {/* Heart glow */}
                <circle cx="140" cy="165" r={6 + Math.sin(pulsePhase * 2) * 2} fill="#e53935" fillOpacity="0.6" />
                {/* Brain */}
                <ellipse cx="140" cy="82" rx="22" ry="18" fill="none" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.6" />

                <text x="140" y="340" textAnchor="middle" fill="#64b5f6" fontSize="13" fontFamily="Georgia, serif">Extension</text>
                <text x="140" y="357" textAnchor="middle" fill="#64b5f6" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">(Body)</text>

                {/* Mind side — idea network */}
                <ellipse cx="330" cy="230" rx="70" ry="130" fill="url(#mindGrad)" stroke="#7b1fa2" strokeWidth="1" strokeOpacity="0.5" />

                {/* Idea nodes */}
                {[[330, 80], [305, 130], [355, 145], [320, 185], [345, 210], [310, 255], [350, 280], [330, 320]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={5 + Math.sin(pulsePhase + i * 0.7) * 1.5} fill="#ce93d8" fillOpacity="0.7" />
                    <circle cx={x} cy={y} r={10 + Math.sin(pulsePhase + i * 0.7) * 2} fill="none" stroke="#ce93d8" strokeWidth="0.5" strokeOpacity="0.3" />
                  </g>
                ))}
                {/* Connections */}
                {[[330,80,305,130],[305,130,355,145],[355,145,320,185],[320,185,345,210],[345,210,310,255],[310,255,350,280],[350,280,330,320],[330,80,355,145],[305,130,320,185]].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9c27b0" strokeWidth="0.8" strokeOpacity="0.4" />
                ))}

                <text x="330" y="340" textAnchor="middle" fill="#ce93d8" fontSize="13" fontFamily="Georgia, serif">Thought</text>
                <text x="330" y="357" textAnchor="middle" fill="#ce93d8" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">(Mind)</text>

                {/* Bridge label */}
                <rect x="190" y="205" width="100" height="30" rx="6" fill="rgba(20,40,20,0.9)" stroke="#2E7D32" strokeWidth="1" />
                <text x="240" y="218" textAnchor="middle" fill="#81c784" fontSize="9" fontFamily="Georgia, serif">same event</text>
                <text x="240" y="229" textAnchor="middle" fill="#81c784" fontSize="9" fontFamily="Georgia, serif">two descriptions</text>
                <line x1="210" y1="220" x2="195" y2="220" stroke="#2E7D32" strokeWidth="1.5" markerEnd="url(#arr)" />
                <line x1="270" y1="220" x2="285" y2="220" stroke="#2E7D32" strokeWidth="1.5" />

                {/* Cartesian question mark */}
                <text x="240" y="175" textAnchor="middle" fill="#ef9a9a" fontSize="22" fontFamily="Georgia, serif" opacity="0.5">?</text>
                <text x="240" y="198" textAnchor="middle" fill="#ef9a9a" fontSize="9" fontFamily="Georgia, serif" opacity="0.6">interaction?</text>

                {/* Highlight if event active */}
                {currentEvent && (
                  <>
                    <rect x="188" y="203" width="104" height="34" rx="7" fill="none" stroke={currentEvent.color} strokeWidth="2" strokeOpacity="0.9" />
                    <line x1="210" y1="220" x2="140" y2="220" stroke={currentEvent.color} strokeWidth="2" strokeOpacity={0.6 + Math.sin(pulsePhase) * 0.3} strokeDasharray="4,3" />
                    <line x1="270" y1="220" x2="330" y2="220" stroke={currentEvent.color} strokeWidth="2" strokeOpacity={0.6 + Math.sin(pulsePhase) * 0.3} strokeDasharray="4,3" />
                  </>
                )}
              </>
            ) : (
              <>
                {/* Unified figure */}
                <ellipse cx="240" cy="230" rx="90" ry="140" fill="url(#unifiedGrad)" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.8" />
                {/* Head */}
                <ellipse cx="240" cy="80" rx="38" ry="42" fill="none" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.8" />
                {/* Dual-nature head fill */}
                <ellipse cx="240" cy="80" rx="38" ry="42" fill="none" stroke="#66bb6a" strokeWidth="0.5" strokeOpacity="0.4" />
                {/* Body lines */}
                <line x1="215" y1="124" x2="208" y2="210" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.7" />
                <line x1="265" y1="124" x2="272" y2="210" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.7" />
                <line x1="208" y1="210" x2="200" y2="320" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.7" />
                <line x1="272" y1="210" x2="280" y2="320" stroke="#2E7D32" strokeWidth="1.5" strokeOpacity="0.7" />
                {/* Idea nodes integrated into figure */}
                {[[240,75],[225,120],[255,135],[235,165],[248,195],[228,230],[252,258],[240,290]].map(([x,y],i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={4 + Math.sin(pulsePhase + i * 0.6) * 2} fill="#66bb6a" fillOpacity="0.7" />
                    <circle cx={x} cy={y} r={9 + Math.sin(pulsePhase + i) * 3} fill="none" stroke="#66bb6a" strokeWidth="0.5" strokeOpacity="0.3" />
                  </g>
                ))}
                {[[240,75,225,120],[225,120,255,135],[255,135,235,165],[235,165,248,195],[248,195,228,230],[228,230,252,258],[252,258,240,290],[240,75,255,135],[225,120,235,165]].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2E7D32" strokeWidth="1" strokeOpacity="0.5" />
                ))}
                {/* Heart glow */}
                <circle cx="240" cy="162" r={7 + Math.sin(pulsePhase * 2) * 3} fill="#4caf50" fillOpacity="0.5" />

                <text x="240" y="358" textAnchor="middle" fill="#a5d6a7" fontSize="13" fontFamily="Georgia, serif">One Individual Reality</text>
                <text x="240" y="375" textAnchor="middle" fill="#81c784" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">Extension ≡ Thought</text>

                {currentEvent && (
                  <circle cx="240" cy="220" r={50 + Math.sin(pulsePhase) * 10} fill="none" stroke={currentEvent.color} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="6,4" />
                )}
              </>
            )}
          </svg>

          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          />
        </div>

        {/* Event buttons */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ textAlign: "center", fontSize: "12px", color: "#81c784", marginBottom: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
            Trigger an event — watch both descriptions respond simultaneously
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {events.map(ev => (
              <button
                key={ev.id}
                onClick={() => handleEventClick(ev.id)}
                onMouseEnter={() => setHoveredEvent(ev.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{
                  padding: "10px 20px",
                  background: activeEvent === ev.id ? ev.color + "33" : hoveredEvent === ev.id ? "rgba(46,125,50,0.15)" : "rgba(10,20,10,0.7)",
                  border: `1px solid ${activeEvent === ev.id ? ev.color : "#2E7D32"}`,
                  borderRadius: "6px",
                  color: activeEvent === ev.id ? ev.color : "#81c784",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "13px",
                  transition: "all 0.25s",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px"
                }}
              >
                <span style={{ fontSize: "16px" }}>{ev.icon}</span>
                {ev.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event description */}
        {currentEvent && (
          <div style={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap"
          }}>
            {!unifiedView ? (
              <>
                <div style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "rgba(13,30,60,0.8)",
                  border: `1px solid ${bodyColor}`,
                  borderRadius: "8px",
                  padding: "16px 20px"
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#64b5f6", marginBottom: "8px", textTransform: "uppercase" }}>Body / Extension</div>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", color: "#bbdefb" }}>{currentEvent.bodyDesc}</p>
                </div>
                <div style={{
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px"
                }}>
                  <div style={{
                    background: `${currentEvent.color}22`,
                    border: `1px solid ${currentEvent.color}`,
                    borderRadius: "6px",
                    padding: "8px 10px",
                    fontSize: "10px",
                    color: currentEvent.color,
                    textAlign: "center",
                    letterSpacing: "1px",
                    textTransform: "uppercase"
                  }}>
                    same<br/>event<br/>≡
                  </div>
                </div>
                <div style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "rgba(40,10,60,0.8)",
                  border: `1px solid ${mindColor}`,
                  borderRadius: "8px",
                  padding: "16px 20px"
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#ce93d8", marginBottom: "8px", textTransform: "uppercase" }}>Mind / Thought</div>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", color: "#e1bee7" }}>{currentEvent.mindDesc}</p>
                </div>
              </>
            ) : (
              <div style={{
                flex: 1,
                background: "rgba(20,40,20,0.8)",
                border: `1px solid ${currentEvent.color}`,
                borderRadius: "8px",
                padding: "16px 20px"
              }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#66bb6a", marginBottom: "8px", textTransform: "uppercase" }}>One Event, One Reality</div>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", color: "#c8e6c9" }}>
                  {currentEvent.bodyDesc} This is inseparable from: {currentEvent.mindDesc.toLowerCase()} Not two events causally connected — one event, apprehended under two attributive descriptions that are equally complete and equally valid.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Circle analogy */}
        <div style={{
          marginTop: "28px",
          background: "rgba(5, 15, 5, 0.8)",
          border: "1px solid #1b5e20",
          borderRadius: "8px",
          padding: "20px 24px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#66bb6a", marginBottom: "10px", textTransform: "uppercase" }}>The Circle Analogy</div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <svg width="120" height="100" style={{ display: "block", margin: "0 auto" }}>
                <circle cx="60" cy="50" r="35" fill="none" stroke="#1565C0" strokeWidth="2" strokeOpacity="0.8" />
                <circle cx="60" cy="50" r="3" fill="#1565C0" fillOpacity="0.8" />
                <line x1="60" y1="50" x2="95" y2="50" stroke="#1565C0" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3,2" />
                <text x="60" y="95" textAnchor="middle" fill="#64b5f6" fontSize="10" fontFamily="Georgia, serif">locus of points</text>
              </svg>
            </div>
            <div style={{ textAlign: "center", fontSize: "18px", color: "#2E7D32" }}>≡</div>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <svg width="120" height="100" style={{ display: "block", margin: "0 auto" }}>
                <line x1="60" y1="50" x2="95" y2="50" stroke="#7b1fa2" strokeWidth="2" strokeOpacity="0.8" />
                <circle cx="60" cy="50" r="3" fill="#7b1fa2" fillOpacity="0.8" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                  const rad = (deg + pulsePhase * 20) * Math.PI / 180;
                  return <circle key={i} cx={60 + Math.cos(rad) * 35} cy={50 + Math.sin(rad) * 35} r="2" fill="#ce93d8" fillOpacity="0.7" />;
                })}
                <text x="60" y="95" textAnchor="middle" fill="#ce93d8" fontSize="10" fontFamily="Georgia, serif">rotation of line</text>
              </svg>
            </div>
          </div>
          <p style={{ margin: "10px 0 0 0", fontSize: "12px", lineHeight: "1.7", color: "#a5d6a7", textAlign: "center", fontStyle: "italic" }}>
            The geometric and algebraic descriptions of a circle do not interact — they describe the same object. Asking how body causes mind is like asking how the locus-description causes the rotation-description.
          </p>
        </div>

      </div>

      {/* Key Concepts */}
      <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(46,125,50,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2E7D32", marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {mindBodyConcepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: "6px 14px",
                background: hoveredConcept === c.id ? "#2E7D32" : "rgba(46,125,50,0.1)",
                border: `1px solid ${hoveredConcept === c.id ? "#66bb6a" : "rgba(46,125,50,0.35)"}`,
                borderRadius: 20,
                fontSize: 12,
                cursor: "pointer",
                color: hoveredConcept === c.id ? "#f0ead8" : "#81c784",
                transition: "all 0.2s",
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{ background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.3)", borderRadius: 6, padding: "16px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: "#2E7D32", marginBottom: 8 }}>
              {mindBodyConcepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
              {mindBodyConcepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
      </div>

      {/* DIFFICULTY PANEL */}
      <div style={{
        background: "rgba(10, 20, 10, 0.85)",
        border: "1px solid #33691e",
        borderLeft: "4px solid #558b2f",
        borderRadius: "8px",
        padding: "28px 32px",
        marginBottom: "28px"
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#aed581",
          marginBottom: "14px"
        }}>The Difficulty</div>
        <p style={{
          margin: "0 0 14px 0",
          fontSize: "clamp(13px, 1.8vw, 15px)",
          lineHeight: "1.8",
          color: "#dcedc8"
        }}>
          The dissolution of the interaction problem opens a new and deeper question. If the mind's knowledge
          of the world is entirely mediated through the body's engagement with that world — if every idea is
          precisely the mind's representation of its own body's states and the bodies that affect it — then
          the scope and quality of what we can know depends on how our body is affected. A body that is
          overwhelmed, fragmented, or acted upon in disorganized ways produces a mind full of confused,
          mutilated, partial ideas. A body that acts with power and coherence produces a mind capable of
          adequate understanding.
        </p>
        <p style={{
          margin: 0,
          fontSize: "clamp(13px, 1.6vw, 14px)",
          lineHeight: "1.7",
          color: "#c5e1a5",
          fontStyle: "italic"
        }}>
          This pressure forces the next development: we need a rigorous account of adequate versus inadequate
          ideas — what distinguishes genuine knowledge from the confused images that dominate ordinary
          experience, and whether there is a path from one to the other.
        </p>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{
        background: "rgba(10, 20, 10, 0.85)",
        border: "1px solid #2E7D32",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <button
          onClick={() => setEchoesOpen(o => !o)}
          style={{
            width: "100%",
            padding: "20px 28px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Georgia, serif"
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#66bb6a" }}>
            Real-World Echoes
          </span>
          {echoesOpen ? <ChevronUp size={18} color="#2E7D32" /> : <ChevronDown size={18} color="#2E7D32" />}
        </button>

        {echoesOpen && (
          <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #2E7D3233" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
              <EchoItem
                title="The Circle's Double Description"
                text="A circle described as 'the locus of all points equidistant from a center' and as 'the figure generated by rotating a line segment around one endpoint' are not two circles connected by some mechanism — they are one geometric object described in two complete and non-reducible vocabularies. No one asks how the two descriptions interact; we understand they are perspectives on the same thing. Spinoza asks us to see body and mind the same way."
                accent="#2E7D32"
              />
              <EchoItem
                title="Brain Damage and the Contracted Mind"
                text="When a stroke destroys the region governing language, the person loses not just the physical capacity to move certain muscles — their inner world of verbal thought diminishes correspondingly. This is not the body causing a mental effect; it is one event appearing in two attributive vocabularies simultaneously. The physical description and the mental description have equal standing; neither is more fundamental."
                accent="#2E7D32"
              />
              <EchoItem
                title="Physical and Mental Cultivation as One Practice"
                text="Spinoza anticipates what modern practitioners of yoga, martial arts, or somatic therapy know directly: cultivating the body's range of expression and cultivating the mind's clarity are not two separate projects connected by motivation. They are the same project described under different attributive lenses. Physical health does not merely support mental health — it is mental health, described extensionally."
                accent="#2E7D32"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConceptChip({ label, desc, accentColor }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: open ? `${accentColor}22` : hovered ? `${accentColor}14` : "rgba(10,20,10,0.7)",
        border: `1px solid ${open ? accentColor : hovered ? accentColor + "88" : "#2E7D32" + "55"}`,
        borderRadius: "6px",
        padding: open ? "10px 14px" : "7px 14px",
        cursor: "pointer",
        transition: "all 0.2s",
        maxWidth: open ? "100%" : "auto",
        flex: open ? "1 1 100%" : "0 0 auto"
      }}
    >
      <div style={{ fontSize: "12px", color: "#a5d6a7", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "9px", color: accentColor }}>▸</span>
        {label}
      </div>
      {open && (
        <p style={{ margin: "8px 0 0 0", fontSize: "12px", lineHeight: "1.7", color: "#c8e6c9", fontStyle: "italic" }}>
          {desc}
        </p>
      )}
    </div>
  );
}

function EchoItem({ title, text, accent }) {
  return (
    <div style={{
      borderLeft: `3px solid ${accent}`,
      borderRadius: "0 6px 6px 0",
      background: `${accent}0a`,
      padding: "14px 18px",
    }}>
      <div style={{ fontSize: 13, fontWeight: "bold", color: "#a5d6a7", marginBottom: 6 }}>{title}</div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#b8b0a8" }}>{text}</p>
    </div>
  );
}

// ─── Part 6: The Ladder of Knowledge: From Imagination to Intuition ───
function LadderOfKnowledge() {
  const [activeRung, setActiveRung] = useState(1);
  const [hoveredRung, setHoveredRung] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  const rungs = [
    {
      id: 1,
      label: "Imagination",
      latin: "Imaginatio",
      color: "#7c3d12",
      glowColor: "#c2410c",
      textColor: "#fca67e",
      emotion: "Fluctuating Hope & Fear",
      emotionDesc: "Buffeted by circumstance, dependent on what the body encounters. Opinion, hearsay, and sensory impression generate beliefs that shift with fortune.",
      cognitionDesc: "Confused, fragmentary, circumstance-dependent. The mind receives passive impressions from external causes — it is acted upon rather than acting. Superstition and prejudice arise here.",
      weather: "stormy",
      spinSpeed: 3.5,
      patternType: "erratic",
    },
    {
      id: 2,
      label: "Reason",
      latin: "Ratio",
      color: "#92400e",
      glowColor: "#d97706",
      textColor: "#fde68a",
      emotion: "Stable Satisfaction",
      emotionDesc: "Grounded in necessity, independent of personal fortune. Understanding causes and universal laws produces a quiet, enduring equanimity.",
      cognitionDesc: "Universal, necessary, systematic. Reason grasps common notions and causal laws through demonstration — transcending personal experience and cultural conditioning.",
      weather: "calm",
      spinSpeed: 1.2,
      patternType: "geometric",
    },
    {
      id: 3,
      label: "Intuition",
      latin: "Scientia Intuitiva",
      color: "#b45309",
      glowColor: "#f59e0b",
      textColor: "#fef3c7",
      emotion: "Intellectual Love of God",
      emotionDesc: "The mind's highest joy — simultaneously personal and eternally valid, particular and universal, fleeting and timeless. Amor intellectualis Dei.",
      cognitionDesc: "Grasps how universal principles express themselves in singular things. Sees particulars sub specie aeternitatis — under the aspect of eternity — uniting the individual and the infinite.",
      weather: "luminous",
      spinSpeed: 0.5,
      patternType: "unified",
    },
  ];

  const concepts = [
    { id: "imagination", label: "Imagination", rung: 1, desc: "Passive impressions from the body's encounters with the world. Source of error when taken as complete truth." },
    { id: "reason", label: "Reason", rung: 2, desc: "Active comprehension of necessary universal principles. Adequate ideas formed through demonstration." },
    { id: "intuitive", label: "Intuitive Knowledge", rung: 3, desc: "Direct grasp of singular essences within the eternal whole. The summit of human cognition." },
    { id: "adequate", label: "Adequate Ideas", rung: 2, desc: "Ideas that contain their own cause — complete, non-fragmentary, internally consistent representations." },
    { id: "eternity", label: "Sub Specie Aeternitatis", rung: 3, desc: "Literally 'under the aspect of eternity.' Seeing things not in temporal sequence but in their necessary eternal relation to God/Nature." },
    { id: "amor", label: "Intellectual Love of God", rung: 3, desc: "The mind's joy in understanding its own unity with infinite substance — the highest human emotion, combining intellectual clarity with personal beatitude." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const rung = rungs[activeRung - 1];

    const initParticles = () => {
      particlesRef.current = [];
      const count = rung.patternType === "erratic" ? 60 : rung.patternType === "geometric" ? 30 : 20;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rung.patternType === "erratic" ? (Math.random() * 2 + 0.5) : rung.patternType === "geometric" ? (Math.random() * 0.8 + 0.3) : (Math.random() * 0.4 + 0.1);
        particlesRef.current.push({
          x: W / 2 + (Math.random() - 0.5) * 20,
          y: H / 2 + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed * (rung.patternType === "erratic" ? (Math.random() > 0.5 ? 1 : -1) : 1),
          vy: Math.sin(angle) * speed * (rung.patternType === "erratic" ? (Math.random() > 0.5 ? 1 : -1) : 1),
          life: Math.random(),
          maxLife: 0.7 + Math.random() * 0.3,
          size: rung.patternType === "erratic" ? (Math.random() * 3 + 1) : rung.patternType === "geometric" ? 2 : (Math.random() * 4 + 2),
          hue: rung.patternType === "erratic" ? Math.floor(Math.random() * 360) : (rung.patternType === "geometric" ? 45 : 50),
          orbit: rung.patternType !== "erratic",
          orbitAngle: angle,
          orbitRadius: 30 + Math.random() * 50,
          orbitSpeed: (0.01 + Math.random() * 0.02) * (rung.patternType === "unified" ? 0.5 : 1),
        });
      }
    };

    initParticles();

    const draw = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      if (rung.weather === "stormy") {
        const flicker = 0.3 + 0.2 * Math.sin(timeRef.current * 8);
        ctx.beginPath();
        ctx.arc(cx, cy, 55, 0, Math.PI * 2);
        const stormy = ctx.createRadialGradient(cx, cy, 5, cx, cy, 55);
        stormy.addColorStop(0, `#7c3d1288`);
        stormy.addColorStop(1, `#7c3d1200`);
        ctx.fillStyle = stormy;
        ctx.fill();

        for (let i = 0; i < 3; i++) {
          const bx = cx + Math.sin(timeRef.current * 3 + i * 2) * 40;
          const by = cy + Math.cos(timeRef.current * 2.5 + i * 1.5) * 40;
          ctx.beginPath();
          ctx.arc(bx, by, 3 + flicker * 5, 0, Math.PI * 2);
          ctx.fillStyle = `#c2410c${Math.floor(flicker * 200 + 55).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }

      if (rung.weather === "calm") {
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.arc(cx, cy, ring * 25 + 10, 0, Math.PI * 2);
          ctx.strokeStyle = `#d97706${Math.floor(30 / ring).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        for (let i = 0; i < 6; i++) {
          const a = (timeRef.current * 0.3) + (i * Math.PI / 3);
          const r = 55;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          ctx.strokeStyle = "#d9770622";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (rung.weather === "luminous") {
        const pulse = 0.6 + 0.4 * Math.sin(timeRef.current * 1.5);
        const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 80);
        glow.addColorStop(0, `#f59e0b${Math.floor(pulse * 120).toString(16).padStart(2, "0")}`);
        glow.addColorStop(0.5, `#b4530944`);
        glow.addColorStop(1, `#b4530900`);
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        for (let i = 0; i < 8; i++) {
          const a = (timeRef.current * 0.2) + (i * Math.PI / 4);
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * 60, cy + Math.sin(a) * 60, 3, 0, Math.PI * 2);
          ctx.fillStyle = `#fef3c7${Math.floor(pulse * 180).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }

      const sphereRadius = 35;
      const sphereAngle = timeRef.current * rung.spinSpeed;
      const gradient = ctx.createRadialGradient(cx - 10, cy - 10, 3, cx, cy, sphereRadius);
      gradient.addColorStop(0, rung.textColor + "ff");
      gradient.addColorStop(0.5, rung.glowColor + "cc");
      gradient.addColorStop(1, rung.color + "88");
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      if (rung.patternType === "geometric") {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(sphereAngle);
        ctx.strokeStyle = "#fde68a88";
        ctx.lineWidth = 1.5;
        for (let s = 0; s < 3; s++) {
          ctx.beginPath();
          for (let v = 0; v <= 6; v++) {
            const a = (v / 6) * Math.PI * 2 + (s * Math.PI / 3);
            const r = 20 - s * 5;
            if (v === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      if (rung.patternType === "unified") {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(sphereAngle * 0.5);
        ctx.strokeStyle = "#fef3c7aa";
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          const r = 22;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * 10, Math.sin(a) * 10, r / 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.strokeStyle = "#f59e0b66";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      particlesRef.current.forEach((p, idx) => {
        if (p.orbit) {
          p.orbitAngle += p.orbitSpeed;
          p.x = cx + Math.cos(p.orbitAngle) * p.orbitRadius;
          p.y = cy + Math.sin(p.orbitAngle) * p.orbitRadius;
          p.life += 0.005;
          if (p.life > p.maxLife) p.life = 0;
        } else {
          p.x += p.vx * (0.5 + Math.sin(timeRef.current * 2 + idx) * 0.3);
          p.y += p.vy * (0.5 + Math.cos(timeRef.current * 1.5 + idx) * 0.3);
          p.life += 0.02;
          if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
            p.x = cx + (Math.random() - 0.5) * 20;
            p.y = cy + (Math.random() - 0.5) * 20;
            const a = Math.random() * Math.PI * 2;
            const sp = Math.random() * 2 + 0.5;
            p.vx = Math.cos(a) * sp * (Math.random() > 0.5 ? 1 : -1);
            p.vy = Math.sin(a) * sp * (Math.random() > 0.5 ? 1 : -1);
            p.life = 0;
            p.hue = Math.floor(Math.random() * 360);
          }
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (rung.patternType === "erratic") {
          ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
          ctx.globalAlpha = alpha * 0.8;
        } else if (rung.patternType === "geometric") {
          ctx.fillStyle = "#fde68a";
          ctx.globalAlpha = alpha * 0.6;
        } else {
          ctx.fillStyle = "#fef3c7";
          ctx.globalAlpha = alpha * 0.9;
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeRung]);

  const activeRungData = rungs[activeRung - 1];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 0%, #3b1a06 0%, #1a0a02 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8d5b7",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "min(90vw, 800px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#B45309", textTransform: "uppercase", marginBottom: 8 }}>
            Part 6 of 21 — Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", margin: "0 0 8px", color: "#fef3c7", lineHeight: 1.3 }}>
            The Ladder of Knowledge
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#d4a96a", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
            From Imagination to Intuition — three ascending kinds of cognition, each a qualitative transformation of consciousness itself
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#1a0a0288",
          border: "1px solid #3b1a0655",
          borderLeft: "3px solid #B45309",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#B45309", textTransform: "uppercase", marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.7, color: "#d4a96a", fontStyle: "italic" }}>
            If mind is the idea of the body and knowledge depends on embodied engagement, what distinguishes adequate from inadequate knowledge, and how can human beings progressively develop toward truth?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#12080288",
          border: "1px solid #3b1a0644",
          borderRadius: 12,
          padding: "28px 24px",
          marginBottom: 28,
        }}>
          {/* Ladder rung selectors */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28, justifyContent: "center" }}>
            {rungs.map((r, i) => {
              const isActive = activeRung === r.id;
              const isHovered = hoveredRung === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRung(r.id)}
                  onMouseEnter={() => setHoveredRung(r.id)}
                  onMouseLeave={() => setHoveredRung(null)}
                  style={{
                    flex: 1,
                    padding: "14px 10px",
                    background: isActive ? `${r.color}cc` : (isHovered ? `${r.color}44` : "#12080244"),
                    border: isActive ? `2px solid ${r.glowColor}` : `1px solid ${r.color}55`,
                    borderRadius: 8,
                    cursor: "pointer",
                    color: isActive ? r.textColor : "#b08060",
                    fontFamily: "Georgia, serif",
                    fontSize: 14,
                    fontWeight: isActive ? "bold" : "normal",
                    transition: "all 0.3s",
                    boxShadow: isActive ? `0 0 20px ${r.glowColor}44` : "none",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 11, letterSpacing: 1, opacity: 0.7, marginBottom: 4 }}>
                    Rung {r.id}
                  </div>
                  <div style={{ fontSize: 15 }}>{r.label}</div>
                  <div style={{ fontSize: 11, fontStyle: "italic", opacity: 0.7, marginTop: 2 }}>{r.latin}</div>
                </button>
              );
            })}
          </div>

          {/* Canvas + description side by side */}
          <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {/* Canvas */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  border: `2px solid ${activeRungData.glowColor}55`,
                  boxShadow: `0 0 30px ${activeRungData.glowColor}33`,
                  display: "block",
                }}
              />
              <div style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                background: activeRungData.color,
                color: activeRungData.textColor,
                fontSize: 11,
                letterSpacing: 1,
                padding: "3px 10px",
                borderRadius: 10,
                whiteSpace: "nowrap",
                fontStyle: "italic",
              }}>
                {activeRungData.weather === "stormy" ? "stormy consciousness" : activeRungData.weather === "calm" ? "calm clarity" : "luminous unity"}
              </div>
            </div>

            {/* Description */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{
                fontSize: 11,
                letterSpacing: 2,
                color: activeRungData.glowColor,
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                Mode of Cognition
              </div>
              <p style={{ margin: "0 0 16px", fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.7, color: "#d4a96a" }}>
                {activeRungData.cognitionDesc}
              </p>
              <div style={{
                background: `${activeRungData.color}44`,
                border: `1px solid ${activeRungData.glowColor}33`,
                borderRadius: 8,
                padding: "12px 16px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: activeRungData.glowColor, textTransform: "uppercase", marginBottom: 6 }}>
                  Characteristic Emotion
                </div>
                <div style={{ fontSize: 15, color: activeRungData.textColor, fontWeight: "bold", marginBottom: 6 }}>
                  {activeRungData.emotion}
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#c4956a" }}>
                  {activeRungData.emotionDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Visual ladder diagram */}
          <div style={{ marginBottom: 24 }}>
            <svg width="100%" height="120" viewBox="0 0 700 120" style={{ display: "block" }}>
              {/* Ladder rails */}
              <line x1="180" y1="10" x2="180" y2="110" stroke="#3b1a0688" strokeWidth="3" />
              <line x1="520" y1="10" x2="520" y2="110" stroke="#3b1a0688" strokeWidth="3" />
              {/* Rungs */}
              {rungs.map((r, i) => {
                const y = 95 - i * 40;
                const isActive = activeRung === r.id;
                return (
                  <g key={r.id} onClick={() => setActiveRung(r.id)} style={{ cursor: "pointer" }}>
                    <rect x="180" y={y - 12} width="340" height="24" rx="4"
                      fill={isActive ? `${r.color}cc` : `${r.color}44`}
                      stroke={isActive ? r.glowColor : r.color + "44"}
                      strokeWidth={isActive ? 2 : 1}
                    />
                    {isActive && (
                      <rect x="178" y={y - 14} width="344" height="28" rx="5"
                        fill="none"
                        stroke={r.glowColor}
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    )}
                    <text x="350" y={y + 5} textAnchor="middle"
                      fill={isActive ? r.textColor : "#b08060"}
                      fontSize="14"
                      fontFamily="Georgia, serif"
                      fontWeight={isActive ? "bold" : "normal"}
                    >
                      {r.label}
                    </text>
                    <text x="188" y={y + 5}
                      fill={r.glowColor}
                      fontSize="11"
                      fontFamily="Georgia, serif"
                      opacity="0.7"
                    >
                      {i + 1}
                    </text>
                    <text x="510" y={y + 5} textAnchor="end"
                      fill={r.glowColor}
                      fontSize="11"
                      fontFamily="Georgia, serif"
                      fontStyle="italic"
                      opacity="0.7"
                    >
                      {r.emotion}
                    </text>
                  </g>
                );
              })}
              {/* Arrow indicating ascent */}
              <polygon points="160,15 150,30 145,15 155,18 155,110 165,110 165,18"
                fill="#B4530933" />
              <text x="155" y="10" textAnchor="middle" fill="#B45309" fontSize="12" fontFamily="Georgia, serif" opacity="0.6">
                ↑
              </text>
              <text x="155" y="8" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="Georgia, serif" opacity="0.5">
                ascent
              </text>
            </svg>
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(180,83,9,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#B45309", textTransform: "uppercase", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#B45309" : "rgba(180,83,9,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#d97706" : "rgba(180,83,9,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c4956a",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(180,83,9,0.08)", border: "1px solid rgba(180,83,9,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#B45309", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0f0a0288",
          border: "1px solid #3b1a0655",
          borderLeft: "3px solid #78350f",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#92400e", textTransform: "uppercase", marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px", fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.7, color: "#c4956a" }}>
            If imagination generates fluctuating passive emotions while reason and intuition generate stable active ones, then cognitive development is inseparable from emotional transformation — but what exactly is the mechanism by which emotions are tied to knowledge levels, and how can we practically change our emotional lives?
          </p>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.6, color: "#8a6040", fontStyle: "italic" }}>
            This pressure forces the next development — toward a systematic account of how understanding itself can transform the power of an emotion, dissolving bondage through insight rather than will.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0f0a0288",
          border: "1px solid #3b1a0655",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              color: "#d4a96a",
            }}
          >
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#B45309", textTransform: "uppercase" }}>
              Real-World Echoes
            </div>
            {echosOpen ? (
              <ChevronUp size={18} color="#B45309" />
            ) : (
              <ChevronDown size={18} color="#B45309" />
            )}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 24px 20px", borderTop: "1px solid #3b1a0633" }}>
              <p style={{ marginTop: 16, marginBottom: 14, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.7, color: "#b08060" }}>
                Spinoza's three levels of knowledge resonate across modern experience — wherever we notice the difference between raw impression, systematic understanding, and direct insight.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Opinion vs. Mathematical Proof", body: "Forming beliefs based on casual observation (someone seems untrustworthy because they were rude once) versus understanding a geometric theorem as necessarily true regardless of who encounters it — this is imagination versus reason made vivid." },
                  { title: "Euclidean Geometry as Rational Knowledge", body: "Understanding why every triangle's angles sum to 180 degrees is not a fact you memorized but a necessity you grasp from first principles — the paradigm Spinoza had in mind when describing rational knowledge." },
                  { title: "Intellectual Love — Impersonal Joy", body: "Scientists describe moments of sudden comprehension — not just solving a problem but seeing how a singular phenomenon is an expression of deep universal law — as among the most profound human emotions. This is the closest modern parallel to Spinoza's amor intellectualis Dei." },
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: "3px solid #B45309", borderRadius: "0 6px 6px 0", background: "#B453090a", padding: "14px 18px" }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#d4844c", marginBottom: 6 }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#b8b0a8" }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 7: Conatus: The Essential Drive of All Things ───
function ConatusEssentialDrive() {
  const [sliderValue, setSliderValue] = useState(50);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const adequacy = sliderValue / 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 500;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // Background gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
      bgGrad.addColorStop(0, "#1a0a06");
      bgGrad.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw two spiral paths
      const drawSpiral = (startX, startY, dir, steps, colorStart, colorEnd, opacity) => {
        for (let i = 0; i < steps; i++) {
          const prog = i / steps;
          const angle = dir * prog * Math.PI * 4 + (dir > 0 ? -Math.PI / 2 : Math.PI / 2);
          const radius = 20 + prog * 80;
          const x = startX + Math.cos(angle) * radius;
          const y = startY + Math.sin(angle) * radius * 0.5;

          const r1 = parseInt(colorStart.slice(1, 3), 16);
          const g1 = parseInt(colorStart.slice(3, 5), 16);
          const b1 = parseInt(colorStart.slice(5, 7), 16);
          const r2 = parseInt(colorEnd.slice(1, 3), 16);
          const g2 = parseInt(colorEnd.slice(3, 5), 16);
          const b2 = parseInt(colorEnd.slice(5, 7), 16);

          const r = Math.round(r1 + (r2 - r1) * prog);
          const g = Math.round(g1 + (g2 - g1) * prog);
          const b = Math.round(b1 + (b2 - b1) * prog);

          const size = dir > 0 ? (3 + prog * 6) : (3 + (1 - prog) * 6);
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          ctx.globalAlpha = opacity * (0.3 + 0.7 * prog);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      };

      // Active spiral (left side, upward) - shown when adequacy is high
      const activeOpacity = adequacy;
      const passiveOpacity = 1 - adequacy;

      // Active path: upper-left spiral
      const activeX = cx - 80;
      const activeY = cy - 20;
      drawSpiral(activeX, activeY, -1, 60, "#C2410C", "#FCD34D", activeOpacity);

      // Passive path: lower-right spiral
      const passiveX = cx + 80;
      const passiveY = cy + 20;
      drawSpiral(passiveX, passiveY, 1, 60, "#C2410C", "#312e38", passiveOpacity);

      // Animated expanding rings (active side)
      if (activeOpacity > 0.1) {
        for (let ring = 0; ring < 3; ring++) {
          const ringT = (t * 0.8 + ring * 0.33) % 1;
          const ringR = 30 + ringT * 90;
          const ringAlpha = activeOpacity * (1 - ringT) * 0.5;
          ctx.beginPath();
          ctx.arc(activeX - 30, activeY - 50, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = "#F59E0B";
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = ringAlpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Animated contracting rings (passive side)
      if (passiveOpacity > 0.1) {
        for (let ring = 0; ring < 3; ring++) {
          const ringT = (t * 0.6 + ring * 0.33) % 1;
          const ringR = 80 - ringT * 60;
          const ringAlpha = passiveOpacity * ringT * 0.4;
          ctx.beginPath();
          ctx.arc(passiveX + 30, passiveY + 50, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = "#6B21A8";
          ctx.lineWidth = 1;
          ctx.globalAlpha = ringAlpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Central figure glow
      const glowColor = adequacy > 0.5 ? "#C2410C" : "#4C1D95";
      const glowR = parseInt(glowColor.slice(1, 3), 16);
      const glowG = parseInt(glowColor.slice(3, 5), 16);
      const glowB = parseInt(glowColor.slice(5, 7), 16);
      const mixedR = Math.round(glowR * adequacy + 76 * (1 - adequacy));
      const mixedG = Math.round(glowG * adequacy + 29 * (1 - adequacy));
      const mixedB = Math.round(glowB * adequacy + 149 * (1 - adequacy));
      const mixedColor = `#${mixedR.toString(16).padStart(2, "0")}${mixedG.toString(16).padStart(2, "0")}${mixedB.toString(16).padStart(2, "0")}`;

      const pulseScale = 1 + Math.sin(t * Math.PI * 2) * 0.08;

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45 * pulseScale);
      grd.addColorStop(0, "#ffffff");
      grd.addColorStop(0.15, mixedColor);
      grd.addColorStop(0.6, mixedColor + "44");
      grd.addColorStop(1, "#00000000");
      ctx.beginPath();
      ctx.arc(cx, cy, 45 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Figure body (simple human silhouette)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulseScale, pulseScale);
      // Head
      ctx.beginPath();
      ctx.arc(0, -22, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.9;
      ctx.fill();
      // Body
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(0, 10);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.9;
      ctx.stroke();
      // Arms
      ctx.beginPath();
      ctx.moveTo(-12, -5);
      ctx.lineTo(12, -5);
      ctx.stroke();
      // Legs
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-8, 24);
      ctx.moveTo(0, 10);
      ctx.lineTo(8, 24);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      // Labels
      ctx.font = "bold 13px Georgia, serif";
      ctx.textAlign = "center";

      // Active label
      ctx.globalAlpha = 0.4 + activeOpacity * 0.6;
      ctx.fillStyle = "#FCD34D";
      ctx.fillText("Active Affects", cx - 110, cy - 90);
      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "#FDE68A";
      ctx.fillText("Adequate Ideas", cx - 110, cy - 74);
      ctx.globalAlpha = 1;

      // Passive label
      ctx.globalAlpha = 0.4 + passiveOpacity * 0.6;
      ctx.font = "bold 13px Georgia, serif";
      ctx.fillStyle = "#A78BFA";
      ctx.fillText("Passive Affects", cx + 110, cy + 90);
      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "#C4B5FD";
      ctx.fillText("Inadequate Ideas", cx + 110, cy + 106);
      ctx.globalAlpha = 1;

      // Center label
      ctx.font = "bold 14px Georgia, serif";
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.95;
      ctx.fillText("Conatus", cx, cy + 50);
      ctx.globalAlpha = 1;

      // Connection arrows from center
      const drawArrow = (fromX, fromY, toX, toY, color, alpha) => {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      };

      drawArrow(cx - 18, cy - 10, cx - 70, cy - 55, "#F59E0B", activeOpacity * 0.7);
      drawArrow(cx + 18, cy + 10, cx + 70, cy + 55, "#7C3AED", passiveOpacity * 0.7);
    };

    const animate = () => {
      timeRef.current += 0.008;
      draw(timeRef.current % 1);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [adequacy]);

  const concepts = [
    {
      id: "conatus",
      label: "Conatus",
      desc: "From the Latin 'to strive' — Spinoza's term for the intrinsic tendency of every existing thing to persist and enhance its being. Not a force added to a thing from outside, but the very essence of what it means to be that thing.",
      color: "#C2410C",
    },
    {
      id: "active",
      label: "Active Affects",
      desc: "Emotions and drives that flow from adequate ideas — from our own clear understanding. These are expressions of our genuine power and lead to increasing joy, understanding, and capability. They spiral upward.",
      color: "#F59E0B",
    },
    {
      id: "passive",
      label: "Passive Affects",
      desc: "Emotions and drives that arise when external forces act upon us through inadequate ideas — when we are moved by things we don't truly understand. These constrain our power and lead to diminishment.",
      color: "#7C3AED",
    },
    {
      id: "efficient",
      label: "Efficient Causation",
      desc: "Conatus expresses itself through efficient causation — the actual chain of causes producing effects. When ideas are adequate, we are the genuine cause of our affects. When inadequate, external causes dominate.",
      color: "#059669",
    },
  ];

  const [hoveredSlider, setHoveredSlider] = useState(false);

  const sliderLabel =
    sliderValue < 25
      ? "Deeply Passive — External forces dominate"
      : sliderValue < 50
      ? "Mostly Passive — Understanding growing"
      : sliderValue < 75
      ? "Mostly Active — Ideas clarifying"
      : "Deeply Active — Adequate understanding";

  const sliderColor =
    sliderValue < 25
      ? "#7C3AED"
      : sliderValue < 50
      ? "#9D4EDD"
      : sliderValue < 75
      ? "#E07B39"
      : "#F59E0B";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center, #2a0d04 0%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        color: "#e8e0d8",
        padding: "40px 24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#C2410C", marginBottom: "8px", textTransform: "uppercase" }}>
            Part 7 of 21 — Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: "bold", color: "#ffffff", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            Conatus: The Essential Drive of All Things
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#b8a99a", lineHeight: "1.7", maxWidth: "min(100%, 680px)", margin: "0 auto" }}>
            Spinoza's concept of conatus — the universal striving of every thing to persevere and enhance its being — provides the metaphysical bridge between abstract substance theory and concrete human psychology.
          </p>
        </div>

        {/* Problem Panel */}
        <div
          style={{
            background: "#12080466",
            border: "1px solid #2a1a10",
            borderLeft: "4px solid #C2410C",
            borderRadius: "8px",
            padding: "24px 28px",
            marginBottom: "32px",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#C2410C", marginBottom: "12px", textTransform: "uppercase", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: "1.8", color: "#d4c4b8" }}>
            The epistemological ladder revealed that our levels of knowledge correspond to different emotional states — but this leaves a pressing question unanswered. <span style={{ color: "#ffffff", fontStyle: "italic" }}>What is the underlying motivational force that ties cognition, emotion, and action together into a single dynamic?</span> Without such a unifying principle, the correspondence between knowing and feeling remains a mysterious coincidence rather than a necessary connection. Something must be driving the whole system.
          </p>
        </div>

        {/* Main Visualization */}
        <div
          style={{
            background: "#0e080566",
            border: "1px solid #2a1a10",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", color: "#ffffff", margin: "0 0 8px 0", fontWeight: "bold" }}>
              The Two Paths of Striving
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#9a8878", lineHeight: "1.6" }}>
              Drag the slider to shift between adequate and inadequate understanding — watch the figure's trajectory transform in real time.
            </p>
          </div>

          {/* Canvas */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <canvas
              ref={canvasRef}
              style={{
                borderRadius: "8px",
                border: "1px solid #2a1a10",
                maxWidth: "100%",
                width: 500,
                height: 320,
              }}
            />
          </div>

          {/* Slider */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#A78BFA" }}>Less Adequate Understanding</span>
              <span style={{ fontSize: "12px", color: "#F59E0B" }}>More Adequate Understanding</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                onMouseEnter={() => setHoveredSlider(true)}
                onMouseLeave={() => setHoveredSlider(false)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  accentColor: sliderColor,
                  height: "6px",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "13px",
                color: sliderColor,
                fontStyle: "italic",
                transition: "color 0.4s",
              }}
            >
              {sliderLabel}
            </div>
          </div>

          {/* Core argument prose */}
          <div
            style={{
              background: "#12080455",
              border: "1px solid #2a1a10",
              borderRadius: "8px",
              padding: "20px 24px",
              marginTop: "20px",
            }}
          >
            <p style={{ margin: "0 0 12px 0", fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: "1.8", color: "#c8b8a8" }}>
              Conatus is not something things <em>have</em> in addition to their nature — it <em>is</em> their nature. To be a stone is to resist dissolution; to be a plant is to grow toward light; to be a human mind is to strive for understanding, connection, and meaning. The same principle governs all finite modes of substance, expressing itself at every level of complexity.
            </p>
            <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: "1.8", color: "#c8b8a8" }}>
              The crucial fork appears in how conatus expresses itself. When our ideas are adequate — when we genuinely understand the causes of our affects — conatus operates as an active power, generating what Spinoza calls <span style={{ color: "#F59E0B" }}>active affects</span>: joy, strength, and expanding capability that spiral upward into greater understanding. When ideas are inadequate, we are buffeted by external causes we don't comprehend, producing <span style={{ color: "#A78BFA" }}>passive affects</span> that contract our power and leave us at the mercy of fortune.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(180,83,9,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#B45309", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#B45309" : "rgba(180,83,9,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#d97706" : "rgba(180,83,9,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#d97706",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(180,83,9,0.08)", border: "1px solid rgba(180,83,9,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#B45309", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div
          style={{
            background: "#0e0a1266",
            border: "1px solid #2a1a2a",
            borderLeft: "4px solid #7C3AED",
            borderRadius: "8px",
            padding: "24px 28px",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#9D4EDD", marginBottom: "12px", textTransform: "uppercase", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: "1.8", color: "#c8b8b8" }}>
            Conatus resolves the motivational gap — but in doing so it sharpens an urgent practical question. If the same striving can spiral upward into active empowerment or downward into passive bondage depending on whether our ideas are adequate, then we need to understand precisely <em>how</em> this works. How do emotions arise mechanically from the interplay of mind and world? What is the systematic structure of the transition from passive to active emotional life?
          </p>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: "1.7", color: "#9a8898", fontStyle: "italic" }}>
            This pressure forces the next development: a rigorous account of the affects themselves — their origins, their dynamics, and the exact mechanism by which adequate ideas transform passive suffering into active power.
          </p>
        </div>

        {/* Real-World Echoes (collapsible) */}
        <div
          style={{
            background: "#0e080566",
            border: "1px solid #2a1a10",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: "18px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#C2410C", textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </div>
            {echosOpen ? (
              <ChevronUp size={18} color="#C2410C" />
            ) : (
              <ChevronDown size={18} color="#C2410C" />
            )}
          </div>

          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #C2410C33" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
              {[
                { title: "The Stone", body: "A stone resisting forces that would break it apart expresses conatus in its most elementary form — not conscious, not striving in any felt sense, but exhibiting a structural tendency to maintain its physical integrity against dissolution. The stone's \"essence\" just is this resistance; take it away and there is no stone, only rubble." },
                { title: "The Plant", body: "A plant growing toward light and adapting its root structure to preserve its organization shows conatus at a biological level. The plant doesn't merely resist destruction — it actively reorganizes itself in response to its environment to maintain and extend its pattern of living. This is the beginning of active feedback." },
                { title: "Human Striving", body: "In humans, conatus takes its fullest expression — striving not just for survival but for understanding, creativity, and genuine social connection. When a person pursues knowledge that genuinely illuminates their situation, they experience the upward spiral: greater clarity enables more active responses, which generate the joy of increased power, which fuels further understanding. This is Spinoza's account of human flourishing." },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: "3px solid #C2410C", borderRadius: "0 6px 6px 0", background: "#C2410C0a", padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#f97316", marginBottom: 6 }}>{item.title}</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 8: From Passion to Action: The Emotional Life ───
function EmotionalLifePassionToAction() {
  const [adequacy, setAdequacy] = useState(30);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const sec8Concepts = [
    { id: "passive_affects", label: "Passive Affects", desc: "Emotions caused by external circumstances we don't adequately understand. When forces outside us determine our emotional states, we are passive — buffeted, reactive, enslaved to fortune. Sadness, fear, hatred, and envy are paradigmatic passive affects, each marking a diminishment of our power of acting." },
    { id: "active_affects", label: "Active Affects", desc: "Emotions flowing from our own adequate understanding and creativity. When we are the genuine cause of our emotional states through clear ideas, we experience joy and strength that spiral upward. Active affects expand our power and generate further understanding in a virtuous cycle." },
    { id: "adequate_ideas", label: "Adequate Ideas", desc: "Ideas that are complete, clear, and self-explanatory — not confused fragments caused by external impacts but genuine understanding of causes. Developing adequate ideas is the cognitive task underlying emotional transformation; it is not an act of will but a gradual intellectual achievement." },
    { id: "emotion_network", label: "Emotion Network", desc: "For Spinoza, emotions form a systematic network. Joy and sadness are primary; love, hatred, hope, fear, envy, and desire are derivatives combining these with ideas of external causes. The network above transforms as adequacy increases, showing how understanding restructures the entire emotional landscape." },
    { id: "conatus_affects", label: "Conatus & Emotion", desc: "Every emotion is an expression of conatus — the universal striving to preserve and enhance being. Joy is conatus succeeding; sadness is conatus being inhibited. Love and hatred are conatus attaching itself to (or repelling) whatever it believes enhances or diminishes its own power of acting." },
  ];

  const emotions = [
    {
      id: "joy",
      label: "Joy",
      type: "both",
      angle: 0,
      definition: "Joy is the passage of the mind to a greater perfection — an increase in the body's power of acting, becoming more itself.",
      genealogy: "Joy arises when the body's conatus is aided. It is not yet active or passive by itself but becomes active when arising from our own understanding.",
      activeThreshold: 20,
    },
    {
      id: "sadness",
      label: "Sadness",
      type: "passive",
      angle: 45,
      definition: "Sadness is the passage of the mind to a lesser perfection — a diminishment of the body's power of acting, a restriction of being.",
      genealogy: "Sadness is always passive: it marks an external constraint upon our striving. No adequate idea produces sadness in us.",
      activeThreshold: 90,
    },
    {
      id: "love",
      label: "Love",
      type: "both",
      angle: 90,
      definition: "Love is joy accompanied by the idea of an external cause — we cleave to what we believe has increased our power.",
      genealogy: "Love becomes active when the 'cause' is not a contingent object but the eternal order of nature understood through reason.",
      activeThreshold: 35,
    },
    {
      id: "hatred",
      label: "Hatred",
      type: "passive",
      angle: 135,
      definition: "Hatred is sadness accompanied by the idea of an external cause — we resent what we believe has diminished our power.",
      genealogy: "Hatred is always rooted in inadequate ideas: we misattribute our diminishment to an external thing rather than understanding the full causal chain.",
      activeThreshold: 95,
    },
    {
      id: "hope",
      label: "Hope",
      type: "passive",
      angle: 180,
      definition: "Hope is an inconstant joy arising from the idea of a future or past thing whose outcome we doubt.",
      genealogy: "Hope is intrinsically unstable and passive — it implies ignorance of causes and oscillates with Fear whenever doubt shifts.",
      activeThreshold: 80,
    },
    {
      id: "fear",
      label: "Fear",
      type: "passive",
      angle: 225,
      definition: "Fear is an inconstant sadness arising from the idea of a future or past thing whose outcome we doubt.",
      genealogy: "Fear is the shadow side of Hope — both vanish when we achieve adequate understanding of causes and necessity.",
      activeThreshold: 85,
    },
    {
      id: "envy",
      label: "Envy",
      type: "passive",
      angle: 270,
      definition: "Envy is hatred insofar as it so affects a person that they are saddened by another's happiness and pleased by another's misfortune.",
      genealogy: "Envy arises from imitation of affects: we imagine others feeling what we feel, and when their joy contrasts with our sadness, hatred follows.",
      activeThreshold: 98,
    },
    {
      id: "desire",
      label: "Desire",
      type: "both",
      angle: 315,
      definition: "Desire is appetite accompanied by consciousness of itself — it is the very essence of the human being insofar as it is conceived as determined to act.",
      genealogy: "Desire can be passive (driven by external compulsion and confused ideas) or active (flowing from our own nature understood clearly).",
      activeThreshold: 25,
    },
  ];

  const getEmotionState = (emotion, adeq) => {
    const activeRatio = Math.min(1, Math.max(0, (adeq - emotion.activeThreshold) / 60));
    const isActive = emotion.type === "active" || (emotion.type === "both" && adeq > emotion.activeThreshold);
    const isPassive = emotion.type === "passive" || (emotion.type === "both" && adeq <= emotion.activeThreshold);
    return { activeRatio, isActive: !isPassive };
  };

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 1;
      setTick(t);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const centerX = 280;
  const centerY = 280;
  const orbitRadius = 195;

  const getNodePosition = (emotion, adeq) => {
    const baseAngle = (emotion.angle * Math.PI) / 180;
    const { isActive } = getEmotionState(emotion, adeq);
    const jitter = isActive ? 0 : Math.sin(tick * 0.04 + emotion.angle) * 8;
    const r = orbitRadius + jitter;
    return {
      x: centerX + r * Math.cos(baseAngle),
      y: centerY + r * Math.sin(baseAngle),
    };
  };

  const getNodeRadius = (emotion, adeq) => {
    const { isActive } = getEmotionState(emotion, adeq);
    const base = isActive ? 28 + (adeq / 100) * 14 : 32 - (adeq / 100) * 12;
    const pulse = isActive ? 0 : Math.sin(tick * 0.05 + emotion.angle * 0.1) * 4;
    return Math.max(14, base + pulse);
  };

  const getNodeColor = (emotion, adeq) => {
    const { isActive } = getEmotionState(emotion, adeq);
    if (isActive) return "#C9830A";
    const darkness = 1 - adeq / 100;
    return "#C0392B";
  };

  const getNodeGlow = (emotion, adeq) => {
    const { isActive } = getEmotionState(emotion, adeq);
    const pulse = Math.sin(tick * 0.05 + emotion.angle * 0.1);
    if (isActive) return `0 0 ${16 + pulse * 6}px #F5A623, 0 0 ${32 + pulse * 8}px #C9830A88`;
    return `0 0 ${12 + pulse * 8}px #E74C3C, 0 0 ${24 + pulse * 10}px #C0392B88`;
  };

  const getConnectionOpacity = (emotion, adeq) => {
    const { isActive } = getEmotionState(emotion, adeq);
    return isActive ? 0.3 + (adeq / 100) * 0.4 : 0.15;
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #3d0a1e 0%, #1a0510 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "40px 24px",
      color: "#e8d5c4",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#9D174D", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 8 of 21
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", color: "#f0e0d0", margin: "0 0 8px 0", lineHeight: "1.3" }}>
            From Passion to Action: The Emotional Life
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c4a090", lineHeight: "1.7", margin: "0 auto", maxWidth: "min(100%, 620px)" }}>
            Spinoza treats emotions as natural phenomena — specific kinds of thoughts accompanied by bodily changes in power — that can be systematically understood and transformed rather than merely suppressed or indulged.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#12060e",
          border: "1px solid #2a0f1a",
          borderLeft: "4px solid #9D174D",
          borderRadius: "8px",
          padding: "24px 28px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, #9D174D, transparent)"
          }} />
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#9D174D", textTransform: "uppercase", marginBottom: "12px" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: "1.8", color: "#d4b0a0" }}>
            Conatus established the universal striving at the heart of human nature and showed it can take active or passive forms — but <em>what is the detailed mechanics of how emotions arise, function, and can be changed?</em> We know the engine, but not the gears. Without a systematic account of emotional causation, we are left with moral exhortations to "be less reactive" that have no purchase on the actual structure of feeling.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0e0610",
          border: "1px solid #2a1020",
          borderRadius: "12px",
          padding: "32px 28px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "17px", fontWeight: "normal", color: "#f0e0d0", margin: "0 0 8px 0" }}>
            The Emotion Network
          </h2>
          <p style={{ fontSize: "13px", color: "#9a7a6a", margin: "0 0 28px 0", lineHeight: "1.6" }}>
            Each node is an affect in Spinoza's system. <strong style={{ color: "#c4a090" }}>Red pulsing nodes</strong> are passive — driven by external causes we don't understand. <strong style={{ color: "#d4a040" }}>Gold steady nodes</strong> are active — flowing from our own adequate understanding. Drag the slider to transform the network. Click any node to reveal its definition.
          </p>

          {/* Adequacy Slider */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#9a7a6a", letterSpacing: "1px", textTransform: "uppercase" }}>
                Adequacy of Understanding
              </span>
              <span style={{ fontSize: "13px", color: adequacy > 50 ? "#d4a040" : "#C0392B", fontWeight: "bold" }}>
                {adequacy < 20 ? "Bondage" : adequacy < 50 ? "Awakening" : adequacy < 80 ? "Clarity" : "Wisdom"}
                {" — "}{adequacy}%
              </span>
            </div>
            <div style={{ position: "relative", height: "6px", background: "#1a0810", borderRadius: "3px", cursor: "pointer" }}>
              <div style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                width: `${adequacy}%`,
                background: `linear-gradient(90deg, #9D174D, #C9830A)`,
                borderRadius: "3px",
                transition: "width 0.1s",
              }} />
              <input
                type="range" min={0} max={100} value={adequacy}
                onChange={e => setAdequacy(Number(e.target.value))}
                style={{
                  position: "absolute", top: "-8px", left: 0, width: "100%",
                  opacity: 0, cursor: "pointer", height: "22px", margin: 0,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "11px", color: "#6a4a4a" }}>Passive Bondage</span>
              <span style={{ fontSize: "11px", color: "#7a6030" }}>Active Freedom</span>
            </div>
          </div>

          {/* SVG Network */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 560px", maxWidth: "100%" }}>
              <svg viewBox="0 0 560 560" width="100%" style={{ display: "block", maxWidth: 560 }}>
                {/* Background gradient */}
                <defs>
                  <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1a0820" />
                    <stop offset="100%" stopColor="#080508" />
                  </radialGradient>
                  <filter id="glow-passive">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="glow-active">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <rect width="560" height="560" fill="url(#bgGrad)" rx="8" />

                {/* Orbit ring */}
                <circle
                  cx={centerX} cy={centerY} r={orbitRadius}
                  fill="none" stroke="#2a1020" strokeWidth="1" strokeDasharray="4 6" opacity="0.5"
                />

                {/* Connections from center to nodes */}
                {emotions.map(emotion => {
                  const pos = getNodePosition(emotion, adequacy);
                  const { isActive } = getEmotionState(emotion, adequacy);
                  const opacity = getConnectionOpacity(emotion, adequacy);
                  return (
                    <line
                      key={emotion.id + "-line"}
                      x1={centerX} y1={centerY}
                      x2={pos.x} y2={pos.y}
                      stroke={isActive ? "#C9830A" : "#9D174D"}
                      strokeWidth={isActive ? 1.5 : 1}
                      opacity={opacity}
                      strokeDasharray={isActive ? "none" : "3 5"}
                    />
                  );
                })}

                {/* Emotion nodes */}
                {emotions.map(emotion => {
                  const pos = getNodePosition(emotion, adequacy);
                  const r = getNodeRadius(emotion, adequacy);
                  const color = getNodeColor(emotion, adequacy);
                  const { isActive } = getEmotionState(emotion, adequacy);
                  const isSelected = selectedEmotion?.id === emotion.id;
                  const isHovered = hoveredEmotion === emotion.id;
                  const glowRadius = isActive
                    ? r + 8 + Math.sin(tick * 0.04 + emotion.angle) * 2
                    : r + 10 + Math.sin(tick * 0.06 + emotion.angle) * 5;

                  return (
                    <g key={emotion.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedEmotion(isSelected ? null : emotion)}
                      onMouseEnter={() => setHoveredEmotion(emotion.id)}
                      onMouseLeave={() => setHoveredEmotion(null)}
                    >
                      {/* Glow halo */}
                      <circle
                        cx={pos.x} cy={pos.y} r={glowRadius}
                        fill={isActive ? "#C9830A" : "#9D174D"}
                        opacity={isActive ? 0.12 + Math.sin(tick * 0.04) * 0.04 : 0.18 + Math.sin(tick * 0.07 + emotion.angle) * 0.08}
                      />
                      {/* Main node */}
                      <circle
                        cx={pos.x} cy={pos.y} r={r}
                        fill={isSelected || isHovered ? (isActive ? "#d4880f" : "#c0392b") : (isActive ? "#a06010" : "#8b1f1f")}
                        stroke={isActive ? "#F5A623" : "#E74C3C"}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                        filter={isActive ? "url(#glow-active)" : "url(#glow-passive)"}
                      />
                      {/* Label */}
                      <text
                        x={pos.x} y={pos.y + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fill={isActive ? "#fde68a" : "#f8c4c4"}
                        fontSize={r > 26 ? "11" : "10"}
                        fontFamily="Georgia, serif"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {emotion.label}
                      </text>
                      {/* Active/passive indicator dot */}
                      <circle
                        cx={pos.x + r * 0.65} cy={pos.y - r * 0.65} r={3}
                        fill={isActive ? "#F5A623" : "#E74C3C"}
                        opacity={0.9}
                      />
                    </g>
                  );
                })}

                {/* Central Self node */}
                <g>
                  <circle cx={centerX} cy={centerY} r={38}
                    fill="#1a0820" stroke="#9D174D" strokeWidth="2"
                  />
                  <circle cx={centerX} cy={centerY} r={34}
                    fill="#0e0615" stroke="#5a1030" strokeWidth="1"
                  />
                  <text x={centerX} y={centerY - 7} textAnchor="middle"
                    fill="#e0c0d0" fontSize="12" fontFamily="Georgia, serif">Self</text>
                  <text x={centerX} y={centerY + 9} textAnchor="middle"
                    fill="#9D174D" fontSize="9" fontFamily="Georgia, serif">conatus</text>
                  {/* Power ring that grows with adequacy */}
                  <circle cx={centerX} cy={centerY}
                    r={38 + (adequacy / 100) * 20}
                    fill="none"
                    stroke="#9D174D"
                    strokeWidth="1"
                    opacity={0.2 + (adequacy / 100) * 0.3}
                    strokeDasharray="2 4"
                  />
                </g>
              </svg>
            </div>

            {/* Selected emotion detail panel */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              {selectedEmotion ? (
                <div style={{
                  background: "#12060e",
                  border: "1px solid #3a1525",
                  borderLeft: `3px solid ${getNodeColor(selectedEmotion, adequacy)}`,
                  borderRadius: "8px",
                  padding: "20px",
                  animation: "fadeIn 0.3s ease",
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#9D174D", textTransform: "uppercase", marginBottom: "8px" }}>
                    {getEmotionState(selectedEmotion, adequacy).isActive ? "Active Affect" : "Passive Affect"}
                  </div>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "20px", color: getEmotionState(selectedEmotion, adequacy).isActive ? "#F5A623" : "#E74C3C", fontWeight: "normal" }}>
                    {selectedEmotion.label}
                  </h3>
                  <p style={{ margin: "0 0 16px 0", fontSize: "13px", lineHeight: "1.7", color: "#c8a898", borderBottom: "1px solid #2a1020", paddingBottom: "14px" }}>
                    <em>{selectedEmotion.definition}</em>
                  </p>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#7a5060", textTransform: "uppercase", marginBottom: "8px" }}>
                    Causal Genealogy
                  </div>
                  <p style={{ margin: 0, fontSize: "12px", lineHeight: "1.7", color: "#a08878" }}>
                    {selectedEmotion.genealogy}
                  </p>
                  <div style={{ marginTop: "16px", padding: "10px", background: "#0e0610", borderRadius: "4px" }}>
                    <div style={{ fontSize: "11px", color: "#7a5060", marginBottom: "4px" }}>
                      Becomes fully active at:
                    </div>
                    <div style={{ height: "4px", background: "#1a0810", borderRadius: "2px" }}>
                      <div style={{
                        height: "100%",
                        width: `${Math.min(100, (adequacy / selectedEmotion.activeThreshold) * 100)}%`,
                        background: adequacy >= selectedEmotion.activeThreshold ? "#C9830A" : "#9D174D",
                        borderRadius: "2px",
                        transition: "width 0.3s",
                      }} />
                    </div>
                    <div style={{ fontSize: "11px", color: "#9a7060", marginTop: "4px" }}>
                      {adequacy >= selectedEmotion.activeThreshold
                        ? "Transformed through understanding"
                        : `Requires ${selectedEmotion.activeThreshold}% adequacy`}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEmotion(null)}
                    style={{
                      marginTop: "14px", background: "none", border: "1px solid #3a1525",
                      color: "#9a7060", fontSize: "11px", padding: "5px 12px",
                      borderRadius: "4px", cursor: "pointer", fontFamily: "Georgia, serif",
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", marginBottom: "12px", opacity: 0.4 }}>◎</div>
                  <p style={{ fontSize: "13px", color: "#6a4a4a", lineHeight: "1.7", margin: 0 }}>
                    Click any emotion node to reveal its Spinozist definition and causal genealogy.
                  </p>
                  <div style={{ marginTop: "24px", padding: "16px", background: "#0e0610", borderRadius: "6px", border: "1px solid #1a0810" }}>
                    <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#7a3040", textTransform: "uppercase", marginBottom: "10px" }}>
                      Network Status
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#E74C3C" }}>
                        Passive: {emotions.filter(e => !getEmotionState(e, adequacy).isActive).length}
                      </span>
                      <span style={{ fontSize: "12px", color: "#C9830A" }}>
                        Active: {emotions.filter(e => getEmotionState(e, adequacy).isActive).length}
                      </span>
                    </div>
                    <div style={{ height: "4px", background: "#1a0810", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${(emotions.filter(e => getEmotionState(e, adequacy).isActive).length / emotions.length) * 100}%`,
                        background: "linear-gradient(90deg, #9D174D, #C9830A)",
                        transition: "width 0.4s ease",
                        borderRadius: "2px",
                      }} />
                    </div>
                  </div>
                </div>
              )}

              {/* placeholder — key concepts moved below */}
              <div style={{ marginTop: "16px" }} />
            </div>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: "28px", padding: "20px 24px",
            background: "#0c0510", border: "1px solid #1e0a14",
            borderRadius: "6px",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#9D174D", textTransform: "uppercase", marginBottom: "12px" }}>
              The Argument
            </div>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.9", color: "#c4a090" }}>
              Emotions are not mysterious intrusions upon rational thought but <em>ideas accompanied by awareness of changes in the body's power of acting</em>. Joy marks increased power, sadness marks its decrease. Love and hatred arise when external objects are identified — rightly or wrongly — as sources of these changes. The crucial distinction is between <strong style={{ color: "#E74C3C" }}>passive affects</strong>, caused by external circumstances we don't understand or control and generating cycles of reactivity, and <strong style={{ color: "#C9830A" }}>active affects</strong>, flowing from our own understanding and creativity and generating cycles of empowerment. Emotional transformation is not an act of will but requires the gradual development of more adequate ideas — a cognitive task, not a moral one.
            </p>
          </div>
        </div>

        {/* KEY CONCEPTS — Click to Explore */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(157,23,77,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#9D174D", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {sec8Concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#9D174D" : "rgba(157,23,77,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#C2185B" : "rgba(157,23,77,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c87090",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(157,23,77,0.08)",
              border: "1px solid rgba(157,23,77,0.25)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#9D174D", marginBottom: 8 }}>
                {sec8Concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {sec8Concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0c0810",
          border: "1px solid #201428",
          borderLeft: "4px solid #7B2D8B",
          borderRadius: "8px",
          padding: "24px 28px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, #7B2D8B, transparent)"
          }} />
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#7B2D8B", textTransform: "uppercase", marginBottom: "12px" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", fontSize: "15px", lineHeight: "1.8", color: "#c4a0c0" }}>
            If emotional transformation requires adequate understanding, and adequate understanding requires emotional conditions conducive to clear thinking, we face an uncomfortable question: <em>is this a circle?</em> The person most in need of emotional liberation — mired in passive affects, reactive and confused — is precisely the person least equipped to develop the adequate ideas that would liberate them. The path out requires the very clarity that emotional bondage makes nearly impossible.
          </p>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.8", color: "#a080a0" }}>
            And beneath this lies a deeper tension: in what sense can human beings be genuinely free if the entire process — including the "development of adequate understanding" — unfolds within a fully determined natural system where nothing could have been otherwise? This pressure forces the next development: Spinoza's radical reconception of freedom not as escape from determination, but as expression of one's deepest nature within it.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "#0c0810",
          border: "1px solid #201428",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%", background: "none", border: "none",
              padding: "20px 28px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              color: "#c4a090", fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color="#9D174D" />
              : <ChevronDown size={16} color="#9D174D" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 28px 28px 28px" }}>
              <div style={{ height: "1px", background: "#1e0a14", marginBottom: "20px" }} />
              {[
                {
                  title: "Anger and Unmet Expectations",
                  text: "When things don't conform to our mental model of how they should be, anger arises — a passive affect identifying external circumstances as the cause of our diminished power. Spinoza would say: the anger is real, but the attribution is inadequate. Understanding the full causal chain dissolves the reactivity without suppressing the underlying energy.",
                },
                {
                  title: "Envy and Social Comparison",
                  text: "Envy emerges when another's apparent possession of goods contrasts with our own lack — a sadness born from imitation of affects. Social media has created unprecedented machinery for generating exactly this species of passive affect: constant comparison with curated images of others' flourishing.",
                },
                {
                  title: "Shame and Social Standards",
                  text: "Shame arises from falling short of standards we've internalized from others — a paradigmatic passive affect where external evaluation becomes the cause of our diminishment. Spinoza's ethics suggests that authentic self-assessment grounded in adequate understanding differs fundamentally from shame.",
                },
                {
                  title: "Just Social Conditions as Prerequisite",
                  text: "Spinoza recognized that individual emotional development cannot be separated from social context. Just institutions — those that provide security, education, and genuine community — are not optional luxuries but necessary conditions for the kind of adequate understanding that enables active affects. Politics is ultimately about creating the emotional conditions for human flourishing.",
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  padding: "16px 20px",
                  background: "#0e0612",
                  border: "1px solid #1a0818",
                  borderRadius: "6px",
                  marginBottom: "12px",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#9D174D", marginBottom: "8px" }}>{echo.title}</div>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.75", color: "#9a7a70" }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 9: Freedom Within Necessity: Determinism and Human Agency ───
function FreedomWithinNecessity() {
  const [showEchoes, setShowEchoes] = useState(false);
  const [showCausalChains, setShowCausalChains] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [tick, setTick] = useState(0);
  const animRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      frame++;
      setTick(frame);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const t = tick / 60;

  // Left figure (alien necessity): jerky, pulled by strings
  const leftFigureX = 160;
  const leftFigureY = 200 + Math.sin(t * 3.1) * 18 + Math.sin(t * 7.3) * 8;

  // Right figure (self-determination): smooth, fluid
  const rightFigureX = 460;
  const rightFigureY = 200 + Math.sin(t * 1.2) * 12;

  // External force positions (ads, crowd, authority)
  const forces = [
    { x: 60, y: 100, label: "Ad", color: "#ef4444", angle: t * 2.2 },
    { x: 240, y: 90, label: "Crowd", color: "#f97316", angle: t * 1.7 + 1 },
    { x: 80, y: 310, label: "Authority", color: "#a855f7", angle: t * 1.9 + 2 },
  ];

  // String endpoints from forces to left figure
  const strings = forces.map(f => {
    const jerk = Math.sin(t * 4 + f.angle) * 6;
    return {
      x1: f.x + 20, y1: f.y + 20,
      x2: leftFigureX + jerk, y2: leftFigureY,
      color: f.color
    };
  });

  // Core glow pulse for right figure
  const glowRadius = 22 + Math.sin(t * 2) * 5;
  const coreOpacity = 0.5 + Math.sin(t * 1.5) * 0.2;

  // Causal chain toggle: show arrows tracing origins
  const leftChainColor = "#ef4444";
  const rightChainColor = "#22c55e";

  const concepts = [
    { id: "determinism", label: "Determinism", desc: "All events, including human actions, follow necessarily from prior causes according to universal natural laws. Nothing escapes causation." },
    { id: "self-determination", label: "Self-Determination", desc: "Freedom as determination by causes that express one's own essential nature — acting from one's deepest self rather than foreign compulsion." },
    { id: "alien necessity", label: "Alien Necessity", desc: "Bondage: being moved by external causes that are foreign to or in conflict with one's essential nature, even without physical constraint." },
    { id: "moral responsibility", label: "Moral Responsibility", desc: "Spinoza shifts from retributive blame to educative concern — evaluating character and understanding rather than punishing past acts." },
    { id: "educative ethics", label: "Educative Ethics", desc: "Ethics aimed not at judgment but at cultivation: fostering the conditions under which people can develop adequate understanding and authentic action." },
    { id: "authentic action", label: "Authentic Action", desc: "Action arising from one's own nature, where determination and choice feel unified — no inner conflict between what one must do and what one wills." },
  ];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #1a2a6e 0%, #0f1a3a 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e8f0",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#6b80c4", textTransform: "uppercase", marginBottom: 8 }}>
            Part 9 of 21 · Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "bold", color: "#c8d8ff", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            Freedom Within Necessity
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#8896c8", maxWidth: "min(100%, 560px)", margin: "0 auto", lineHeight: 1.7 }}>
            Spinoza reconceives freedom not as exemption from causal determination but as being determined by causes that express one's own essential nature rather than alien external forces.
          </p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(10, 12, 30, 0.85)",
          border: "1px solid #1E40AF",
          borderLeft: "4px solid #1E40AF",
          borderRadius: 10,
          padding: "24px 28px",
          marginBottom: 32,
          boxShadow: "0 0 24px rgba(30,64,175,0.15)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#1E40AF", textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.85, fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c0cce8" }}>
            The analysis of passive and active emotions raised a pressing tension at the heart of Spinoza's system: the same framework that reveals how emotions enslave us also seems to leave no room for escape. If every mental state and every action follows necessarily from prior causes — if the person consumed by envy could not have been otherwise given their history and circumstances — then what could it mean to say that liberation is genuinely possible? Can human beings truly choose their path toward active affects, or is such language merely consoling fiction layered atop iron determinism?
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(8, 12, 28, 0.9)",
          border: "1px solid #2a3a6a",
          borderRadius: 14,
          padding: "28px",
          marginBottom: 32,
          boxShadow: "0 0 40px rgba(30,64,175,0.1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 19, color: "#a8c0ff", margin: "0 0 6px 0" }}>Two Modes of Determination</h2>
            <p style={{ fontSize: 13, color: "#6878a8", margin: 0 }}>Both figures are causally determined — but the origin of their determination differs fundamentally.</p>
          </div>

          {/* Toggle causal chains */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button
              onClick={() => setShowCausalChains(!showCausalChains)}
              style={{
                background: showCausalChains ? "#1E40AF" : "rgba(30,64,175,0.2)",
                border: "1px solid #1E40AF",
                borderRadius: 20,
                color: "#c8d8ff",
                padding: "7px 22px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "Georgia, serif",
                transition: "background 0.3s",
              }}
            >
              {showCausalChains ? "Hide Causal Origins" : "Reveal Causal Chains"}
            </button>
            <span style={{ fontSize: 12, color: "#4a5a8a", marginLeft: 12 }}>
              {showCausalChains ? "Both are determined — but look where the chains begin." : "Toggle to see how both figures are determined"}
            </span>
          </div>

          {/* SVG Animation Canvas */}
          <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
            <svg viewBox="0 0 620 420" width="100%" style={{ display: "block", margin: "0 auto", maxWidth: 620 }}>
              {/* Background lane divider */}
              <line x1="310" y1="20" x2="310" y2="400" stroke="#1E40AF" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />

              {/* Labels */}
              <text x="155" y="38" textAnchor="middle" fill="#ef8080" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Alien Necessity</text>
              <text x="465" y="38" textAnchor="middle" fill="#86efac" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Self-Determination</text>

              {/* === LEFT SIDE: ALIEN NECESSITY === */}

              {/* External force boxes */}
              {forces.map((f, i) => {
                const pulse = 0.7 + Math.sin(t * 2.5 + i) * 0.2;
                return (
                  <g key={i}>
                    <rect x={f.x} y={f.y} width={44} height={32} rx={5}
                      fill={f.color} opacity={pulse * 0.85}
                      style={{ filter: `drop-shadow(0 0 6px ${f.color})` }} />
                    <text x={f.x + 22} y={f.y + 21} textAnchor="middle"
                      fill="#fff" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">
                      {f.label}
                    </text>
                  </g>
                );
              })}

              {/* Strings from forces to left figure */}
              {strings.map((s, i) => {
                const slack = Math.sin(t * 3 + i) * 12;
                const midX = (s.x1 + s.x2) / 2 + slack;
                const midY = (s.y1 + s.y2) / 2 - 20;
                return (
                  <path
                    key={i}
                    d={`M ${s.x1} ${s.y1} Q ${midX} ${midY} ${s.x2} ${s.y2}`}
                    stroke={s.color}
                    strokeWidth="1.5"
                    fill="none"
                    opacity={0.7}
                    strokeDasharray={showCausalChains ? "none" : "none"}
                  />
                );
              })}

              {/* Causal chain from external → left figure, when toggled */}
              {showCausalChains && (
                <g>
                  <path d="M 30 360 L 110 320 L 160 280"
                    stroke={leftChainColor} strokeWidth="2" fill="none" strokeDasharray="8 4"
                    opacity={0.5 + Math.sin(t * 2) * 0.2} />
                  <text x="30" y="375" fill={leftChainColor} fontSize="10" fontFamily="Georgia, serif" opacity="0.7">External origin</text>
                  <circle cx="30" cy="360" r="5" fill={leftChainColor} opacity="0.8" />
                </g>
              )}

              {/* Left figure body */}
              <g>
                {/* Jerk effect: shadow trail */}
                <circle cx={leftFigureX - 3} cy={leftFigureY - 40} r={18}
                  fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.15" />
                {/* Head */}
                <circle cx={leftFigureX} cy={leftFigureY - 42} r={18}
                  fill="#1a1a2e" stroke="#ef8080" strokeWidth="1.5" />
                {/* Body */}
                <line x1={leftFigureX} y1={leftFigureY - 24} x2={leftFigureX} y2={leftFigureY + 30}
                  stroke="#ef8080" strokeWidth="2.5" />
                {/* Arms jerked outward */}
                <line
                  x1={leftFigureX} y1={leftFigureY - 10}
                  x2={leftFigureX - 28 + Math.sin(t * 3.5) * 10} y2={leftFigureY + 10 + Math.cos(t * 2.8) * 8}
                  stroke="#ef8080" strokeWidth="2" />
                <line
                  x1={leftFigureX} y1={leftFigureY - 10}
                  x2={leftFigureX + 28 + Math.sin(t * 4.1) * 10} y2={leftFigureY + 8 + Math.cos(t * 3.2) * 8}
                  stroke="#ef8080" strokeWidth="2" />
                {/* Legs */}
                <line
                  x1={leftFigureX} y1={leftFigureY + 30}
                  x2={leftFigureX - 16 + Math.sin(t * 4) * 8} y2={leftFigureY + 65}
                  stroke="#ef8080" strokeWidth="2" />
                <line
                  x1={leftFigureX} y1={leftFigureY + 30}
                  x2={leftFigureX + 16 + Math.sin(t * 3.5 + 1) * 8} y2={leftFigureY + 65}
                  stroke="#ef8080" strokeWidth="2" />
                {/* Distress marks */}
                <text x={leftFigureX + 22} y={leftFigureY - 52} fill="#ef4444" fontSize="14" opacity={0.5 + Math.sin(t * 3) * 0.4}>!</text>
                <text x={leftFigureX - 32} y={leftFigureY - 48} fill="#f97316" fontSize="12" opacity={0.4 + Math.sin(t * 2.7) * 0.4}>?</text>
              </g>

              {/* === RIGHT SIDE: SELF-DETERMINATION === */}

              {/* Internal glow core */}
              <circle cx={rightFigureX} cy={rightFigureY - 8} r={glowRadius + 18}
                fill="#1E40AF" opacity={0.08} />
              <circle cx={rightFigureX} cy={rightFigureY - 8} r={glowRadius + 8}
                fill="#3b82f6" opacity={0.12} />
              <circle cx={rightFigureX} cy={rightFigureY - 8} r={glowRadius}
                fill="#60a5fa" opacity={coreOpacity * 0.3}
                style={{ filter: "blur(2px)" }} />

              {/* Causal chain from internal → right figure, when toggled */}
              {showCausalChains && (
                <g>
                  <path d={`M ${rightFigureX} ${rightFigureY - 8} L ${rightFigureX + 30} ${rightFigureY + 40} L ${rightFigureX + 50} ${rightFigureY + 90}`}
                    stroke={rightChainColor} strokeWidth="2" fill="none" strokeDasharray="8 4"
                    opacity={0.5 + Math.sin(t * 2) * 0.2} />
                  <text x={rightFigureX + 30} y={rightFigureY + 108} fill={rightChainColor} fontSize="10" fontFamily="Georgia, serif" opacity="0.7">Internal origin</text>
                  <circle cx={rightFigureX} cy={rightFigureY - 8} r={5} fill={rightChainColor} opacity="0.8" />
                </g>
              )}

              {/* Flowing lines emanating from right figure */}
              {[0, 1, 2, 3].map(i => {
                const angle = (i / 4) * Math.PI * 2 + t * 0.5;
                const r1 = glowRadius + 14;
                const r2 = glowRadius + 32 + Math.sin(t * 1.5 + i) * 8;
                return (
                  <line key={i}
                    x1={rightFigureX + Math.cos(angle) * r1}
                    y1={rightFigureY - 8 + Math.sin(angle) * r1}
                    x2={rightFigureX + Math.cos(angle) * r2}
                    y2={rightFigureY - 8 + Math.sin(angle) * r2}
                    stroke="#60a5fa" strokeWidth="1.5" opacity="0.3" />
                );
              })}

              {/* Right figure body */}
              <g>
                {/* Head */}
                <circle cx={rightFigureX} cy={rightFigureY - 42} r={18}
                  fill="#1a1a2e" stroke="#86efac" strokeWidth="1.5"
                  style={{ filter: "drop-shadow(0 0 6px #22c55e)" }} />
                {/* Body */}
                <line x1={rightFigureX} y1={rightFigureY - 24} x2={rightFigureX} y2={rightFigureY + 30}
                  stroke="#86efac" strokeWidth="2.5" />
                {/* Arms: smooth, purposeful */}
                <line
                  x1={rightFigureX} y1={rightFigureY - 10}
                  x2={rightFigureX - 26 + Math.sin(t * 1.2) * 5} y2={rightFigureY + 8 + Math.sin(t * 0.9) * 4}
                  stroke="#86efac" strokeWidth="2" />
                <line
                  x1={rightFigureX} y1={rightFigureY - 10}
                  x2={rightFigureX + 26 + Math.sin(t * 1.0 + 1) * 5} y2={rightFigureY + 6 + Math.sin(t * 1.1) * 4}
                  stroke="#86efac" strokeWidth="2" />
                {/* Legs: fluid */}
                <line
                  x1={rightFigureX} y1={rightFigureY + 30}
                  x2={rightFigureX - 14 + Math.sin(t * 1.3) * 5} y2={rightFigureY + 65}
                  stroke="#86efac" strokeWidth="2" />
                <line
                  x1={rightFigureX} y1={rightFigureY + 30}
                  x2={rightFigureX + 14 + Math.sin(t * 1.1 + 0.5) * 5} y2={rightFigureY + 65}
                  stroke="#86efac" strokeWidth="2" />
                {/* Inner glow dot at chest */}
                <circle cx={rightFigureX} cy={rightFigureY - 5} r={5}
                  fill="#60a5fa" opacity={0.6 + Math.sin(t * 2) * 0.2}
                  style={{ filter: "drop-shadow(0 0 4px #60a5fa)" }} />
              </g>

              {/* Same environment obstacles: appear in both lanes */}
              {[0, 1, 2].map(i => {
                const oy = 320 + i * 28;
                return (
                  <g key={i}>
                    {/* Left lane obstacle */}
                    <rect x={leftFigureX - 15} y={oy - 8} width={30} height={16} rx={3}
                      fill="#2a1a3a" stroke="#6b4d8a" strokeWidth="1" opacity="0.6" />
                    {/* Right lane obstacle */}
                    <rect x={rightFigureX - 15} y={oy - 8} width={30} height={16} rx={3}
                      fill="#1a2a3a" stroke="#3a6a8a" strokeWidth="1" opacity="0.5" />
                  </g>
                );
              })}

              {/* Environment label */}
              <text x="310" y="408" textAnchor="middle" fill="#3a4a6a" fontSize="10" fontFamily="Georgia, serif">
                — same environment, same obstacles —
              </text>
            </svg>
          </div>

          {/* Explanation below SVG */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
            <div style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#ef8080", textTransform: "uppercase", marginBottom: 8 }}>Alien Necessity</div>
              <p style={{ margin: 0, fontSize: 13, color: "#c0a8a8", lineHeight: 1.7 }}>
                The figure is pulled by advertisements, crowd expectations, and authority. Its movements are reactive, jerky — not flowing from itself but from pressures foreign to its nature. It may feel free, yet is in bondage.
              </p>
            </div>
            <div style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 8,
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#86efac", textTransform: "uppercase", marginBottom: 8 }}>Self-Determination</div>
              <p style={{ margin: 0, fontSize: 13, color: "#a8c8a8", lineHeight: 1.7 }}>
                The figure moves from an internal luminous core — equally determined, encountering the same obstacles, yet navigating them as an expression of its own deepest nature. Determination and freedom are unified.
              </p>
            </div>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: 24,
            padding: "18px 20px",
            background: "rgba(15, 20, 45, 0.6)",
            borderRadius: 8,
            border: "1px solid #2a3a5a",
          }}>
            <p style={{ margin: 0, lineHeight: 1.85, fontSize: 14, color: "#98aad8" }}>
              Everything follows necessarily from prior causes — including all human actions. But not all forms of causal determination are equivalent. When our actions flow from external forces that distort our essential nature, we are in bondage even if physically unconstrained. When our actions flow from internal causes expressing our own deepest nature, we are genuinely free even though equally determined. This reconceptualization shifts moral evaluation from retributive blame for past acts to an educative concern for developing the character and understanding that leads to authentic action.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(30,64,175,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1E40AF", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#1E40AF" : "rgba(30,64,175,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#3b82f6" : "rgba(30,64,175,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#8898c8",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(30,64,175,0.08)", border: "1px solid rgba(30,64,175,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#1E40AF", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(10, 12, 30, 0.85)",
          border: "1px solid #2d4a9a",
          borderLeft: "4px solid #3b6fd4",
          borderRadius: 10,
          padding: "24px 28px",
          marginBottom: 24,
          boxShadow: "0 0 20px rgba(59,111,212,0.1)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#3b6fd4", textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", lineHeight: 1.85, fontSize: "clamp(13px, 1.8vw, 15px)", color: "#b0bce0" }}>
            Spinoza's solution is elegant — freedom is real, not illusory, because self-determination is genuinely different from alien compulsion, even within a deterministic framework. But this answer immediately raises a deeper question. If freedom consists in self-determination through adequate understanding, and if this capacity can be progressively cultivated, then what does a genuinely free and flourishing human life actually look like? The conceptual distinction between bondage and freedom needs to be filled in with concrete content: what virtues, what practices, what forms of understanding constitute genuine human flourishing rather than its semblance?
          </p>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", color: "#8898c8", fontStyle: "italic", lineHeight: 1.7 }}>
            This pressure forces the next development: an account of the virtues — courage, generosity, strength of character — that constitute the positive content of a life lived from one's own nature rather than from alien compulsion.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "rgba(10, 12, 30, 0.8)",
          border: "1px solid #2a3a5a",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setShowEchoes(!showEchoes)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "18px 28px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, color: "#4a6aaa", textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {showEchoes
              ? <ChevronUp size={18} color="#4a6aaa" />
              : <ChevronDown size={18} color="#4a6aaa" />}
          </button>

          {showEchoes && (
            <div style={{ padding: "0 28px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{
                  padding: "14px 18px",
                  background: "rgba(30,64,175,0.08)",
                  borderRadius: 8,
                  borderLeft: "3px solid #1E40AF",
                }}>
                  <div style={{ fontSize: 13, color: "#a8b8e0", fontWeight: "bold", marginBottom: 6 }}>Social Conformity as Bondage</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#7888b8", lineHeight: 1.7 }}>
                    Conforming to social expectations that conflict with one's authentic interests — choosing a career, a relationship, or a lifestyle because it satisfies external approval rather than inner nature — is a paradigm case of alien necessity. The person is not physically forced, yet their determination comes from outside.
                  </p>
                </div>
                <div style={{
                  padding: "14px 18px",
                  background: "rgba(30,64,175,0.08)",
                  borderRadius: 8,
                  borderLeft: "3px solid #2d5ab8",
                }}>
                  <div style={{ fontSize: 13, color: "#a8b8e0", fontWeight: "bold", marginBottom: 6 }}>Advertising and Manufactured Desire</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#7888b8", lineHeight: 1.7 }}>
                    Advertising and peer pressure operate precisely by inserting alien desires into the self and making them feel like one's own. The person who urgently wants a product they had never heard of an hour ago demonstrates alien necessity in modern form — determination by external manipulation disguised as autonomous choice.
                  </p>
                </div>
                <div style={{
                  padding: "14px 18px",
                  background: "rgba(30,64,175,0.08)",
                  borderRadius: 8,
                  borderLeft: "3px solid #3b6fd4",
                }}>
                  <div style={{ fontSize: 13, color: "#a8b8e0", fontWeight: "bold", marginBottom: 6 }}>Moments of Authentic Action</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#7888b8", lineHeight: 1.7 }}>
                    By contrast, consider moments when a necessary action perfectly expresses one's own values and nature — the artist who must create, the defender who must speak, the parent who cannot abandon their child. There is no felt conflict between what must be and what one wills. This unity of determination and choice is what Spinoza means by freedom.
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

// ─── Part 10: The Art of Living: Ethics and Human Flourishing ───
function ArtOfLivingEthicsFlourishing() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const nodesRef = useRef([]);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mode, setMode] = useState("cooperative"); // "cooperative" | "isolated"
  const [sunBrightness, setSunBrightness] = useState(0.3);
  const [avgHealth, setAvgHealth] = useState(0.3);
  const [draggingIdx, setDraggingIdx] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [echoHover, setEchoHover] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const sec10Concepts = [
    { id: "naturalistic_ethics", label: "Naturalistic Ethics", desc: "Grounding moral life in what actually promotes human well-being rather than external authority or arbitrary command. For Spinoza, ethics is a science of human nature — once we understand what we genuinely are as finite modes of substance, what promotes our flourishing follows necessarily." },
    { id: "enlightened_interest", label: "Enlightened Self-Interest", desc: "Our deepest interests require social cooperation — exploiting others undermines one's own flourishing. This is not a moral exhortation but a metaphysical claim: the rational person understands that human power is amplified, not diminished, by genuine community. Self-interest rightly understood is generous." },
    { id: "virtue_power", label: "Virtue as Power", desc: "Virtue is not obedience to external law but the actual power to act from one's essential nature. To be virtuous is to express what you most deeply are — to be the cause of your own affects, rather than merely the effect of external forces. Virtue is active, not submissive." },
    { id: "courage", label: "Courage", desc: "Persisting toward authentic goals despite social opposition, internal passions, or the fear that deflect us. Courage is not fearlessness but the power to act from adequate understanding even when passive affects pull in the opposite direction. It is the primary virtue of the conatus expressed through reason." },
    { id: "generosity", label: "Generosity", desc: "Recognizing and actively supporting others' genuine flourishing as integral to one's own. The generous person is one who understands that another's increase in power does not diminish their own but amplifies it — like nodes in the cooperative simulation above, thriving together." },
    { id: "wisdom", label: "Wisdom", desc: "Understanding one's own nature and the causal web of existence with clarity and equanimity. Wisdom is not accumulated information but a transformed mode of being — seeing oneself and all things sub specie aeternitatis, under the aspect of eternity. It is the practical expression of the third kind of knowledge." },
  ];

  const W = 680;
  const H = 420;
  const SUN_X = W / 2;
  const SUN_Y = H / 2;

  const NODE_LABELS = ["Amara", "Leon", "Priya", "Kai", "Sofia", "Omar", "Mia", "Theo"];
  const NODE_COUNT = 8;

  function initNodes(cooperative) {
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radius = cooperative ? 130 : 170;
      const jitter = cooperative ? 30 : 60;
      nodes.push({
        x: SUN_X + Math.cos(angle) * radius + (Math.random() - 0.5) * jitter,
        y: SUN_Y + Math.sin(angle) * radius + (Math.random() - 0.5) * jitter,
        vx: 0,
        vy: 0,
        health: cooperative ? 0.7 + Math.random() * 0.3 : 0.2 + Math.random() * 0.2,
        label: NODE_LABELS[i],
        angle: angle,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    return nodes;
  }

  useEffect(() => {
    nodesRef.current = initNodes(mode === "cooperative");
  }, [mode]);

  useEffect(() => {
    nodesRef.current = initNodes(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    let t = 0;

    function getConnections(nodes, cooperative) {
      const connections = [];
      if (!cooperative) return connections;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            connections.push({ i, j, dist });
          }
        }
      }
      return connections;
    }

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const cooperative = mode === "cooperative";

      // Update health gradually
      for (let i = 0; i < nodes.length; i++) {
        const targetHealth = cooperative ? 0.75 + Math.sin(t * 0.8 + nodes[i].pulsePhase) * 0.12 : 0.15 + Math.sin(t * 1.5 + nodes[i].pulsePhase) * 0.08;
        nodes[i].health += (targetHealth - nodes[i].health) * 0.02;
        nodes[i].health = Math.max(0.05, Math.min(1.0, nodes[i].health));
      }

      const connections = getConnections(nodes, cooperative);
      const connectivity = connections.length / (NODE_COUNT * (NODE_COUNT - 1) / 2);
      const newBrightness = cooperative ? 0.3 + connectivity * 0.7 : 0.1 + Math.sin(t * 0.5) * 0.05;
      setSunBrightness(prev => prev + (newBrightness - prev) * 0.03);
      const totalHealth = nodes.reduce((s, n) => s + n.health, 0) / nodes.length;
      setAvgHealth(prev => prev + (totalHealth - prev) * 0.03);

      // Gentle attraction/repulsion physics
      for (let i = 0; i < nodes.length; i++) {
        let ax = 0, ay = 0;
        // Repel from other nodes
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 80) {
            ax += (dx / dist) * (80 - dist) * 0.1;
            ay += (dy / dist) * (80 - dist) * 0.1;
          }
        }
        // Attract toward sun if cooperative
        const dx = SUN_X - nodes[i].x;
        const dy = SUN_Y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = cooperative ? 130 : 175;
        const force = (dist - targetDist) * 0.005;
        ax += (dx / dist) * force;
        ay += (dy / dist) * force;

        nodes[i].vx = (nodes[i].vx + ax) * 0.92;
        nodes[i].vy = (nodes[i].vy + ay) * 0.92;
        if (draggingIdx !== i) {
          nodes[i].x += nodes[i].vx;
          nodes[i].y += nodes[i].vy;
        }
        // Clamp to canvas
        nodes[i].x = Math.max(30, Math.min(W - 30, nodes[i].x));
        nodes[i].y = Math.max(30, Math.min(H - 30, nodes[i].y));
      }

      // Draw sun glow
      const sunR = 38 + sunBrightness * 18;
      const glowR = 80 + sunBrightness * 60;
      const sunGrad = ctx.createRadialGradient(SUN_X, SUN_Y, 0, SUN_X, SUN_Y, glowR);
      const alpha1 = Math.floor(sunBrightness * 200).toString(16).padStart(2, "0");
      const alpha2 = Math.floor(sunBrightness * 80).toString(16).padStart(2, "0");
      const alpha3 = "00";
      sunGrad.addColorStop(0, "#FFF9C4");
      sunGrad.addColorStop(0.15, "#D97706" + alpha1);
      sunGrad.addColorStop(0.5, "#D97706" + alpha2);
      sunGrad.addColorStop(1, "#D97706" + alpha3);
      ctx.beginPath();
      ctx.arc(SUN_X, SUN_Y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun circle
      ctx.beginPath();
      ctx.arc(SUN_X, SUN_Y, sunR, 0, Math.PI * 2);
      const sunCore = ctx.createRadialGradient(SUN_X, SUN_Y, 0, SUN_X, SUN_Y, sunR);
      sunCore.addColorStop(0, "#FFFDE7");
      sunCore.addColorStop(0.5, "#FFC107");
      sunCore.addColorStop(1, "#D97706");
      ctx.fillStyle = sunCore;
      ctx.fill();
      ctx.strokeStyle = "#FFF9C4";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Sun label
      ctx.font = "bold 9px Georgia, serif";
      ctx.fillStyle = "#1a0a00";
      ctx.textAlign = "center";
      ctx.fillText("Intellectual", SUN_X, SUN_Y - 5);
      ctx.fillText("Love of God", SUN_X, SUN_Y + 7);

      // Draw connections
      for (const conn of connections) {
        const ni = nodes[conn.i];
        const nj = nodes[conn.j];
        const strength = 1 - conn.dist / 180;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + conn.i + conn.j);
        const alpha = Math.floor((0.3 + 0.4 * strength) * pulse * 255).toString(16).padStart(2, "0");
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.strokeStyle = "#D97706" + alpha;
        ctx.lineWidth = 1 + strength * 2;
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const health = n.health;
        const r = 18 + health * 8;
        const pulse = 1 + 0.05 * Math.sin(t * 3 + n.pulsePhase);

        // Health ring
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + health * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (r + 4) * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = cooperative ? "#D9770640" : "#ff220020";
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, (r + 4) * pulse, startAngle, endAngle);
        const healthColor = health > 0.6 ? "#D97706" : health > 0.35 ? "#F59E0B" : "#EF4444";
        ctx.strokeStyle = healthColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Node body
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * pulse, 0, Math.PI * 2);
        const nodeGrad = ctx.createRadialGradient(n.x - 4, n.y - 4, 0, n.x, n.y, r);
        if (health > 0.6) {
          nodeGrad.addColorStop(0, "#FFF3E0");
          nodeGrad.addColorStop(0.5, "#F59E0B");
          nodeGrad.addColorStop(1, "#92400E");
        } else {
          nodeGrad.addColorStop(0, "#4a1a1a");
          nodeGrad.addColorStop(0.5, "#991B1B");
          nodeGrad.addColorStop(1, "#3b0a0a");
        }
        ctx.fillStyle = nodeGrad;
        ctx.fill();
        ctx.strokeStyle = health > 0.6 ? "#FFC107" : "#7F1D1D";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = "bold 8px Georgia, serif";
        ctx.fillStyle = "#FFF9C4";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + 3);

        // Health bar below
        const barW = 30;
        const barH = 4;
        const bx = n.x - barW / 2;
        const by = n.y + r + 6;
        ctx.fillStyle = "#1a0a00";
        ctx.fillRect(bx, by, barW, barH);
        ctx.fillStyle = healthColor;
        ctx.fillRect(bx, by, barW * health, barH);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [mode, draggingIdx]);

  function getNodeAtPoint(x, y) {
    const nodes = nodesRef.current;
    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - x;
      const dy = nodes[i].y - y;
      if (Math.sqrt(dx * dx + dy * dy) < 30) return i;
    }
    return -1;
  }

  function handleMouseDown(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const idx = getNodeAtPoint(x, y);
    if (idx >= 0) setDraggingIdx(idx);
  }

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    if (draggingIdx !== null) {
      nodesRef.current[draggingIdx].x = x;
      nodesRef.current[draggingIdx].y = y;
      nodesRef.current[draggingIdx].vx = 0;
      nodesRef.current[draggingIdx].vy = 0;
    }
    const idx = getNodeAtPoint(x, y);
    if (idx >= 0) {
      const n = nodesRef.current[idx];
      setTooltip({ idx, label: n.label, health: n.health, x: e.clientX - rect.left, y: e.clientY - rect.top });
    } else {
      setTooltip(null);
    }
  }

  function handleMouseUp() {
    setDraggingIdx(null);
  }

  const healthPct = Math.round(avgHealth * 100);
  const sunPct = Math.round(sunBrightness * 100);

  const echoItems = [
    { title: "Courage", body: "The entrepreneur who persists in building something meaningful despite market pressure and social doubt — not because authority commands it, but because the work expresses their essential creative nature." },
    { title: "Generosity", body: "The mentor who invests in a student's genuine development, recognizing that supporting another's flourishing enriches the shared intellectual community from which everyone — including the mentor — draws sustenance." },
    { title: "Intellectual Love of God", body: "The scientist or artist who finds a deep, circumstance-independent satisfaction in moments of genuine understanding or creative breakthrough — joy that belongs to the act itself, not the external rewards it may bring." },
  ];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3d1a00 0%, #1a0800 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#F5E6C8",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "min(90vw, 760px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 8, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#D97706", textTransform: "uppercase", marginBottom: 6 }}>
            Part 10 of 21 — Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 26px)", fontWeight: "bold", margin: "0 0 6px 0", color: "#FFF3E0" }}>
            The Art of Living: Ethics and Human Flourishing
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", color: "#C4A97A", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            Spinoza's ethics asks not what external authorities command but what kinds of lives, virtues, and relationships actually promote genuine human flourishing as rational and social beings.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#12080280",
          border: "1px solid #3d1a00",
          borderLeft: "4px solid #D97706",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 24,
          marginTop: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#D97706", textTransform: "uppercase", marginBottom: 10, fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.8, color: "#E8D5B0" }}>
            The analysis of freedom and self-determination showed that authentic living requires expressing one's essential nature — but a troubling gap remained. What <em>concretely</em> constitutes human flourishing? And more urgently: does living well for oneself necessarily conflict with living well with others? Every moral tradition before Spinoza had answered this by appeal to authority — divine command, social convention, legal sanction. But if authentic freedom means self-determination rather than external obedience, those answers collapse. The question becomes inescapable: can self-interest and genuine morality ever truly converge, or are we permanently torn between them?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0e060280",
          border: "1px solid #3d1a00",
          borderRadius: 10,
          padding: "24px",
          marginBottom: 24,
        }}>
          <div style={{ marginBottom: 16, textAlign: "center" }}>
            <h2 style={{ fontSize: 18, margin: "0 0 6px 0", color: "#FFF3E0" }}>
              The Ecosystem of Flourishing
            </h2>
            <p style={{ fontSize: 13, color: "#C4A97A", margin: 0, lineHeight: 1.6 }}>
              Drag individual nodes to explore how isolation and cooperation alter the power of acting. The sun's brightness measures collective intellectual flourishing.
            </p>
          </div>

          {/* Mode Toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 18 }}>
            {["cooperative", "isolated"].map(m => {
              const active = mode === m;
              return (
                <button key={m} onClick={() => setMode(m)} style={{
                  background: active ? "#D97706" : "#1a0a0010",
                  color: active ? "#1a0800" : "#D97706",
                  border: "1.5px solid #D97706",
                  borderRadius: 20,
                  padding: "6px 22px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: 13,
                  fontWeight: active ? "bold" : "normal",
                  transition: "all 0.3s",
                  letterSpacing: 1,
                }}>
                  {m === "cooperative" ? "Cooperative Mode" : "Isolated Mode"}
                </button>
              );
            })}
          </div>

          {/* Canvas */}
          <div style={{ position: "relative", width: "100%", maxWidth: W, margin: "0 auto" }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                width: "100%",
                height: "auto",
                cursor: draggingIdx !== null ? "grabbing" : "grab",
                borderRadius: 8,
                border: "1px solid #3d1a0080",
                display: "block",
              }}
            />
            {tooltip && (
              <div style={{
                position: "absolute",
                left: tooltip.x + 12,
                top: tooltip.y - 10,
                background: "#1a0800ee",
                border: "1px solid #D97706",
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 12,
                color: "#FFF3E0",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}>
                <strong>{tooltip.label}</strong><br />
                Power of Acting: <span style={{ color: tooltip.health > 0.6 ? "#D97706" : "#EF4444" }}>{Math.round(tooltip.health * 100)}%</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 16, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#C4A97A", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Collective Health</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: healthPct > 60 ? "#D97706" : "#EF4444", transition: "color 0.5s" }}>
                {healthPct}%
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#C4A97A", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Intellectual Love</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#FFC107", transition: "color 0.5s" }}>
                {sunPct}%
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#C4A97A", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Mode</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: mode === "cooperative" ? "#D97706" : "#EF4444", transition: "color 0.5s" }}>
                {mode === "cooperative" ? "Flourishing" : "Diminished"}
              </div>
            </div>
          </div>

          {/* Core Argument prose */}
          <div style={{ marginTop: 22, padding: "16px 20px", background: "#1a0a0050", borderRadius: 8, border: "1px solid #3d1a0060" }}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.85, color: "#E8D5B0" }}>
              Rather than grounding ethics in divine command or social convention, Spinoza roots it in careful analysis of what actually promotes human well-being as finite modes of infinite substance. The convergence is not accidental: properly understood self-interest <em>necessarily</em> involves concern for others because our deepest interests can be fulfilled only in social contexts of mutual understanding and cooperation. The person who exploits others undermines the very conditions of their own flourishing. When the golden threads of mutual recognition multiply in the simulation above, all nodes rise together — this is the geometry of ethics made visible.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#D97706", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {sec10Concepts.map(c => (
              <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredConcept === c.id ? "#D97706" : "rgba(217,119,6,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#FFC107" : "rgba(217,119,6,0.35)"}`,
                  borderRadius: 20, fontSize: 12, cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#C4A97A", transition: "all 0.2s" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#D97706", marginBottom: 8 }}>
                {sec10Concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {sec10Concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0a080280",
          border: "1px solid #2d1f00",
          borderLeft: "4px solid #92400E",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#92400E", textTransform: "uppercase", marginBottom: 10, fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.8, color: "#E8D5B0" }}>
            If individual flourishing and social flourishing are so deeply interdependent — if our power of acting genuinely rises and falls with the quality of our shared community — then a new and urgent question emerges that ethics alone cannot answer. The convergence of self-interest and morality depends on social conditions that may or may not actually obtain. What happens when political institutions are structured to pit people against each other, rewarding exploitation and punishing cooperation? Spinoza's ethics implies that the conditions for flourishing must be politically and institutionally created and defended.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#C4A97A", fontStyle: "italic" }}>
            This pressure forces the next development: if genuine human flourishing requires specific kinds of social and political conditions, then Spinoza's system must turn from personal ethics to the question of what kinds of political institutions actually support the human capacity for rational and creative life — the problem of the just polity.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0e060280",
          border: "1px solid #3d1a0060",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(v => !v)}
            onMouseEnter={() => setEchoHover(true)}
            onMouseLeave={() => setEchoHover(false)}
            style={{
              width: "100%",
              background: echoHover ? "#1a0a0080" : "transparent",
              border: "none",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              color: "#D97706",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echosOpen ? <ChevronUp size={18} color="#D97706" /> : <ChevronDown size={18} color="#D97706" />}
          </button>
          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #D9770633" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                {echoItems.map((item, i) => (
                  <div key={i} style={{
                    borderLeft: "3px solid #D97706",
                    borderRadius: "0 6px 6px 0",
                    background: "#D977060a",
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#f0a930", marginBottom: 6 }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#b8b0a8" }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function ConceptTag({ term, accent }) {
  return (
    <div
      style={{
        background: "#1a0a0060",
        border: "1.5px solid #3d1a00",
        borderRadius: 16,
        padding: "6px 14px",
        color: "#E8D5B0",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Georgia, serif" }}>{term}</div>
    </div>
  );
}

function EchoItem2({ title, body, accent, last }) {
  return (
    <div style={{
      marginBottom: last ? 0 : 16,
      paddingBottom: last ? 0 : 16,
      borderBottom: last ? "none" : "1px solid #3d1a0030",
    }}>
      <div style={{ fontSize: 13, fontWeight: "bold", color: accent, marginBottom: 5, fontFamily: "Georgia, serif" }}>
        {title}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#D4BF99", fontFamily: "Georgia, serif" }}>
        {body}
      </p>
    </div>
  );
}

// ─── Part 11: Democracy and Human Liberation: The Political Vision ───
function PoliticalVisionDemocracyLiberation() {
  const [echosOpen, setEchosOpen] = useState(false);
  const [crisisTriggered, setCrisisTriggered] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, deliberating, resolved
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredSystem, setHoveredSystem] = useState(null);
  const animRef = useRef(null);
  const timerRef = useRef(null);

  const accent = '#0F766E';
  const accentDark = '#0a4a44';
  const accentLight = '#14b8a6';

  const concepts = [
    { id: 'popular_sovereignty', label: 'Popular Sovereignty', desc: 'Authority derives from the collective power of citizens, not from divine right or abstract principle. Power is real only when supported by the governed.' },
    { id: 'collective_intelligence', label: 'Collective Intelligence', desc: 'Diverse perspectives aggregate into superior decisions. No single mind can hold all relevant knowledge; distributed deliberation compensates for individual blindness.' },
    { id: 'political_legitimacy', label: 'Political Legitimacy', desc: 'A government is legitimate not because it conforms to some ideal form, but because it actually succeeds in enhancing the rational and creative capacity of its members.' },
    { id: 'freedom_of_expression', label: 'Freedom of Expression', desc: 'Censorship is self-defeating: suppressing dissent removes the feedback that governments need to remain responsive and coherent. Free expression is a political necessity.' },
    { id: 'religious_tolerance', label: 'Religious Tolerance', desc: 'Inner belief cannot be coerced. Forcing outward conformity breeds resentment and duplicity. Genuine civic unity requires tolerating diversity of conscience.' },
    { id: 'deliberative_democracy', label: 'Deliberative Democracy', desc: 'The process of deliberation itself transforms citizens — requiring them to appeal to shared interests rather than narrow ones, thereby cultivating the rational faculties that make good governance possible.' },
  ];

  const systems = [
    {
      id: 'monarchy',
      label: 'Monarchy',
      color: '#b45309',
      nodes: [
        { id: 0, x: 50, y: 50, isDecider: true },
        { id: 1, x: 20, y: 80 },
        { id: 2, x: 80, y: 80 },
        { id: 3, x: 35, y: 110 },
        { id: 4, x: 65, y: 110 },
        { id: 5, x: 50, y: 130 },
      ],
      description: 'One decides swiftly. Most minds remain dormant. The system is brittle — it can only be as wise as one person.',
    },
    {
      id: 'aristocracy',
      label: 'Aristocracy',
      color: '#7c3aed',
      nodes: [
        { id: 0, x: 25, y: 50, isDecider: true },
        { id: 1, x: 50, y: 40, isDecider: true },
        { id: 2, x: 75, y: 50, isDecider: true },
        { id: 3, x: 20, y: 100 },
        { id: 4, x: 50, y: 110 },
        { id: 5, x: 80, y: 100 },
      ],
      description: 'A council deliberates. Better than one, but still narrow. The many are consulted after the fact, if at all.',
    },
    {
      id: 'democracy',
      label: 'Democracy',
      color: accent,
      nodes: [
        { id: 0, x: 50, y: 45, isDecider: true },
        { id: 1, x: 25, y: 60, isDecider: true },
        { id: 2, x: 75, y: 60, isDecider: true },
        { id: 3, x: 20, y: 95, isDecider: true },
        { id: 4, x: 50, y: 105, isDecider: true },
        { id: 5, x: 80, y: 95, isDecider: true },
      ],
      description: 'All deliberate. Slower, yes — but every mind activates. The process itself builds the rational capacity of citizens.',
    },
  ];

  const [nodeStates, setNodeStates] = useState(() => {
    const s = {};
    systems.forEach(sys => {
      s[sys.id] = sys.nodes.map(n => ({ capacity: 0.2, active: false, glow: 0 }));
    });
    return s;
  });

  const triggerCrisis = () => {
    if (phase !== 'idle') return;
    setCrisisTriggered(true);
    setPhase('deliberating');

    // Reset all nodes
    setNodeStates(() => {
      const s = {};
      systems.forEach(sys => {
        s[sys.id] = sys.nodes.map(n => ({ capacity: 0.2, active: false, glow: 0 }));
      });
      return s;
    });

    let tick = 0;
    const totalTicks = 40;

    const animate = () => {
      tick++;
      const progress = tick / totalTicks;

      setNodeStates(prev => {
        const next = { ...prev };

        // Monarchy: only node 0 activates fast, others stay low
        next.monarchy = systems[0].nodes.map((n, i) => {
          if (i === 0) {
            return { capacity: Math.min(0.9, 0.2 + progress * 0.7), active: progress > 0.1, glow: progress > 0.1 ? Math.min(1, progress * 3) : 0 };
          }
          return { capacity: 0.2 + progress * 0.05, active: false, glow: 0 };
        });

        // Aristocracy: nodes 0,1,2 activate moderately
        next.aristocracy = systems[1].nodes.map((n, i) => {
          if (i < 3) {
            const delay = i * 0.15;
            const localP = Math.max(0, progress - delay);
            return { capacity: Math.min(0.7, 0.2 + localP * 0.5), active: localP > 0.05, glow: localP > 0.05 ? Math.min(0.8, localP * 2) : 0 };
          }
          return { capacity: 0.2 + progress * 0.08, active: false, glow: 0 };
        });

        // Democracy: all activate, slower but higher
        next.democracy = systems[2].nodes.map((n, i) => {
          const delay = i * 0.1;
          const localP = Math.max(0, progress - delay);
          return { capacity: Math.min(0.95, 0.2 + localP * 0.75), active: localP > 0.05, glow: localP > 0.05 ? Math.min(1, localP * 1.5) : 0 };
        });

        return next;
      });

      if (tick < totalTicks) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('resolved');
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  const resetSimulator = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setCrisisTriggered(false);
    setPhase('idle');
    setNodeStates(() => {
      const s = {};
      systems.forEach(sys => {
        s[sys.id] = sys.nodes.map(n => ({ capacity: 0.2, active: false, glow: 0 }));
      });
      return s;
    });
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const getNodeColor = (systemId, nodeIndex, nodeData) => {
    const ns = nodeStates[systemId][nodeIndex];
    if (!ns) return '#333';
    const sys = systems.find(s => s.id === systemId);
    const base = sys.color;
    if (ns.active) return base;
    return '#2a2a3a';
  };

  const getCapacityBarHeight = (systemId) => {
    const ns = nodeStates[systemId];
    if (!ns) return 0;
    const avg = ns.reduce((sum, n) => sum + n.capacity, 0) / ns.length;
    return avg;
  };

  const speedLabels = { monarchy: 'Fast', aristocracy: 'Moderate', democracy: 'Deliberate' };
  const qualityLabels = { monarchy: 'Narrow', aristocracy: 'Partial', democracy: 'Comprehensive' };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 40% 20%, #0a2e2b 0%, #061a18 40%, #05100f 100%)',
      fontFamily: 'Georgia, serif',
      color: '#e8e8e0',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 'min(90vw, 900px)', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', letterSpacing: '3px', color: accentLight, textTransform: 'uppercase', marginBottom: '8px' }}>
            Part 11 of 21
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 'normal', color: '#f0ede6', margin: '0 0 12px 0', lineHeight: '1.3' }}>
            Democracy and Human Liberation
          </h1>
          <p style={{ fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#9ecfcb', maxWidth: 'min(100%, 620px)', margin: '0 auto', lineHeight: '1.7' }}>
            Spinoza grounds democratic governance and intellectual freedom in naturalistic analysis of what institutional arrangements actually enhance the collective capacity for rational and creative life.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: 'rgba(10, 20, 20, 0.8)',
          border: '1px solid #1a3a38',
          borderLeft: `4px solid ${accent}`,
          borderRadius: '8px',
          padding: '28px 32px',
          marginBottom: '32px',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: accentLight, textTransform: 'uppercase', marginBottom: '14px', fontWeight: 'bold' }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: '1.85', fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#d4cfc5' }}>
            The convergence of individual and collective flourishing in ethics raised a sharp practical question — one that could not be answered by philosophy alone. If human beings genuinely thrive through rational engagement and creative cooperation, then the conditions for that flourishing cannot be treated as incidental. <em>Which political institutions actually produce those conditions?</em> What arrangement of power, deliberation, and authority would not merely permit rational life but actively cultivate it across an entire society? The philosophical argument demanded a political answer.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: 'rgba(10, 22, 20, 0.85)',
          border: '1px solid #1a3a38',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'normal', color: accentLight, margin: '0 0 6px 0' }}>
              Governance Simulator
            </h2>
            <p style={{ fontSize: '13px', color: '#7ba8a4', margin: '0 0 24px 0' }}>
              Trigger a policy crisis and observe how each system mobilizes — and transforms — its citizens.
            </p>
          </div>

          {/* Crisis Button */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            {phase === 'idle' && (
              <button
                onClick={triggerCrisis}
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 32px',
                  fontSize: '14px',
                  fontFamily: 'Georgia, serif',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  boxShadow: `0 0 20px ${accentDark}`,
                }}
              >
                ⚡ Trigger Policy Crisis
              </button>
            )}
            {phase === 'deliberating' && (
              <div style={{ color: '#f59e0b', fontSize: '14px', letterSpacing: '1px' }}>
                Crisis underway — systems responding...
              </div>
            )}
            {phase === 'resolved' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ color: accentLight, fontSize: '14px' }}>Crisis resolved. Notice citizen capacity.</div>
                <button
                  onClick={resetSimulator}
                  style={{
                    background: 'transparent',
                    color: '#9ecfcb',
                    border: `1px solid ${accent}`,
                    borderRadius: '4px',
                    padding: '6px 18px',
                    fontSize: '13px',
                    fontFamily: 'Georgia, serif',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Three Columns */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
            {systems.map(sys => {
              const isHovered = hoveredSystem === sys.id;
              const avgCapacity = getCapacityBarHeight(sys.id);
              return (
                <div
                  key={sys.id}
                  onMouseEnter={() => setHoveredSystem(sys.id)}
                  onMouseLeave={() => setHoveredSystem(null)}
                  style={{
                    flex: 1,
                    background: isHovered ? 'rgba(15, 118, 110, 0.08)' : 'rgba(5, 15, 14, 0.6)',
                    border: `1px solid ${isHovered ? sys.color : '#1a3a38'}`,
                    borderTop: `3px solid ${sys.color}`,
                    borderRadius: '8px',
                    padding: '20px 16px',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <div style={{ fontSize: '14px', color: sys.color, letterSpacing: '1px', marginBottom: '4px' }}>
                      {sys.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#556', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {sys.id === 'monarchy' ? 'Rule by One' : sys.id === 'aristocracy' ? 'Rule by Few' : 'Rule by All'}
                    </div>
                  </div>

                  {/* SVG Node Diagram */}
                  <svg width="100%" viewBox="0 0 100 160" style={{ display: 'block', marginBottom: '12px' }}>
                    {/* Connection lines for democracy */}
                    {sys.id === 'democracy' && sys.nodes.map((n, i) =>
                      sys.nodes.slice(i + 1).map((m, j) => {
                        const ns1 = nodeStates[sys.id][i];
                        const ns2 = nodeStates[sys.id][i + j + 1];
                        const bothActive = ns1?.active && ns2?.active;
                        return (
                          <line
                            key={`${i}-${i + j + 1}`}
                            x1={n.x} y1={n.y}
                            x2={m.x} y2={m.y}
                            stroke={bothActive ? accent : '#1a2a28'}
                            strokeWidth={bothActive ? '0.8' : '0.4'}
                            opacity={bothActive ? 0.6 : 0.3}
                          />
                        );
                      })
                    )}
                    {/* Connection lines for monarchy (hub and spoke) */}
                    {sys.id === 'monarchy' && sys.nodes.slice(1).map((n, i) => {
                      const ns0 = nodeStates[sys.id][0];
                      return (
                        <line
                          key={i}
                          x1={sys.nodes[0].x} y1={sys.nodes[0].y}
                          x2={n.x} y2={n.y}
                          stroke={ns0?.active ? '#b45309' : '#1a2a28'}
                          strokeWidth="0.5"
                          opacity={ns0?.active ? 0.5 : 0.2}
                        />
                      );
                    })}
                    {/* Connection lines for aristocracy */}
                    {sys.id === 'aristocracy' && sys.nodes.slice(0, 3).map((n, i) =>
                      sys.nodes.slice(0, 3).slice(i + 1).map((m, j) => {
                        const ns1 = nodeStates[sys.id][i];
                        const ns2 = nodeStates[sys.id][i + j + 1];
                        return (
                          <line
                            key={`a${i}-${i + j + 1}`}
                            x1={n.x} y1={n.y}
                            x2={m.x} y2={m.y}
                            stroke={ns1?.active && ns2?.active ? '#7c3aed' : '#1a2a28'}
                            strokeWidth="0.6"
                            opacity={0.4}
                          />
                        );
                      })
                    )}
                    {sys.nodes.map((n, i) => {
                      const ns = nodeStates[sys.id][i];
                      const cap = ns?.capacity || 0.2;
                      const glowStrength = ns?.glow || 0;
                      const isActive = ns?.active;
                      return (
                        <g key={n.id}>
                          {isActive && (
                            <circle
                              cx={n.x} cy={n.y}
                              r={10 + glowStrength * 4}
                              fill="none"
                              stroke={sys.color}
                              strokeWidth="1"
                              opacity={glowStrength * 0.4}
                            />
                          )}
                          <circle
                            cx={n.x} cy={n.y} r="8"
                            fill={isActive ? sys.color : '#1a2a28'}
                            stroke={sys.color}
                            strokeWidth={n.isDecider ? "2" : "1"}
                            opacity={isActive ? 1 : 0.5}
                          />
                          {/* Capacity fill within circle */}
                          <circle
                            cx={n.x} cy={n.y} r="5"
                            fill={isActive ? '#fff' : '#333'}
                            opacity={0.15 + cap * 0.7}
                          />
                          {n.isDecider && (
                            <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#fff" opacity="0.9">
                              {sys.id === 'democracy' ? '★' : sys.id === 'monarchy' ? '♛' : '◆'}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Capacity Bar */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '10px', color: '#556', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                      Avg. Citizen Capacity
                    </div>
                    <div style={{ background: '#0d1f1e', borderRadius: '3px', height: '8px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${avgCapacity * 100}%`,
                        background: `linear-gradient(90deg, ${accentDark}, ${sys.color})`,
                        borderRadius: '3px',
                        transition: 'width 0.1s linear',
                      }} />
                    </div>
                    <div style={{ fontSize: '10px', color: sys.color, marginTop: '3px', textAlign: 'right' }}>
                      {Math.round(avgCapacity * 100)}%
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '4px', padding: '6px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: '#556', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Speed</div>
                      <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>{speedLabels[sys.id]}</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '4px', padding: '6px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '10px', color: '#556', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope</div>
                      <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>{qualityLabels[sys.id]}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#7ba8a4', margin: 0, lineHeight: '1.6', textAlign: 'center' }}>
                    {sys.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Capacity Chart using Recharts */}
          {phase === 'resolved' && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '12px', color: '#7ba8a4', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Post-Crisis Citizen Capacity Comparison
              </div>
              <BarChart
                width={800}
                height={160}
                data={[
                  { name: 'Monarchy', capacity: Math.round(getCapacityBarHeight('monarchy') * 100), fill: '#b45309' },
                  { name: 'Aristocracy', capacity: Math.round(getCapacityBarHeight('aristocracy') * 100), fill: '#7c3aed' },
                  { name: 'Democracy', capacity: Math.round(getCapacityBarHeight('democracy') * 100), fill: accent },
                ]}
                style={{ fontFamily: 'Georgia, serif', maxWidth: '100%' }}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <Bar dataKey="capacity" radius={[4, 4, 0, 0]}>
                  {[
                    { fill: '#b45309' },
                    { fill: '#7c3aed' },
                    { fill: accent },
                  ].map((entry, index) => (
                    <rect key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          )}

          {/* Core Argument Prose */}
          <div style={{
            marginTop: '28px',
            padding: '20px 24px',
            background: 'rgba(0,0,0,0.25)',
            borderRadius: '8px',
            borderLeft: `3px solid ${accentDark}`,
          }}>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#c0bbb0', lineHeight: '1.85' }}>
              Political authority is justified not by conformity to abstract principles but by its success in enhancing members' collective capacity for rational and creative life. Spinoza's argument is empirical: large deliberative bodies make better decisions than elites because diversity of perspectives increases relevant inputs and public deliberation creates incentives to appeal to shared interests rather than narrow ones.
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#c0bbb0', lineHeight: '1.85' }}>
              Governments that maintain themselves through censorship and propaganda are self-defeating — they undermine the rational deliberation that would enable citizens to recognize legitimacy in the first place. Freedom of thought is therefore not a luxury afforded by stable governance; it is the precondition for governance that can remain stable at all.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(15,118,110,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: accent, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: '6px 14px',
                  background: hoveredConcept === c.id ? accent : 'rgba(15,118,110,0.1)',
                  border: `1px solid ${hoveredConcept === c.id ? accentLight : 'rgba(15,118,110,0.35)'}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: hoveredConcept === c.id ? '#f0ead8' : accentLight,
                  transition: 'all 0.2s',
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: 'rgba(15,118,110,0.08)', border: `1px solid rgba(15,118,110,0.3)`, borderRadius: 6, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: accentLight, marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#c8c0b4' }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: 'rgba(10, 20, 20, 0.8)',
          border: '1px solid #1a3a38',
          borderLeft: `4px solid #0e5954`,
          borderRadius: '8px',
          padding: '28px 32px',
          marginBottom: '24px',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: '#6bcfc8', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 'bold' }}>
            The Difficulty
          </div>
          <p style={{ margin: '0 0 14px 0', lineHeight: '1.85', fontSize: '15px', color: '#d4cfc5' }}>
            But if political stability requires rational deliberation, and rational deliberation requires freedom of thought, then a new and uncomfortable tension emerges. Religious authority has historically claimed the right to shape not only private belief but public organization — to define which questions may be asked, which conclusions may be reached, and which voices may speak in the civic forum. If Spinoza is right that coerced conformity breeds duplicity and resentment rather than genuine loyalty, then no state can afford to hand that power to ecclesiastical institutions.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#9ecfcb', fontStyle: 'italic', lineHeight: '1.7' }}>
            This pressure forces the next development: a systematic account of how scripture must be read, what religion can legitimately claim authority over, and why the boundary between theological and philosophical inquiry is not merely an academic nicety but a political necessity.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: 'rgba(10, 20, 20, 0.8)',
          border: '1px solid #1a3a38',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            <span style={{ fontSize: '11px', letterSpacing: '2.5px', color: accentLight, textTransform: 'uppercase', fontWeight: 'bold' }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={18} color={accentLight} />
              : <ChevronDown size={18} color={accentLight} />
            }
          </button>

          {echosOpen && (
            <div style={{ padding: '0 24px 24px 24px', borderTop: `1px solid ${accent}33` }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: 'Censorship as Systemic Self-Harm',
                    text: 'Authoritarian regimes that suppress dissent consistently discover that they lose the ability to accurately model their own populations. The Soviet politburo, late-Maoist China, and modern autocracies alike found that information suppression produces not loyalty but a dangerous epistemic blindness — exactly Spinoza\'s prediction that censorship defeats the rational deliberation needed for legitimate governance.',
                  },
                  {
                    title: 'Democratic Epistemic Advantage',
                    text: 'Contemporary research on "the wisdom of crowds" and deliberative mini-publics confirms that diverse groups consistently outperform expert committees on complex policy questions. Ireland\'s Citizens\' Assembly on abortion, climate, and constitutional reform demonstrated that ordinary citizens engaging in sustained deliberation arrive at nuanced, coherent positions — sometimes ahead of their elected representatives.',
                  },
                  {
                    title: 'Voluntary Cooperation as the True Foundation',
                    text: 'Political scientists now widely recognize that compliance achieved through fear is fragile and expensive. Societies with high voluntary civic trust — the Nordic countries, for instance — outperform coercive states on virtually every governance metric. Spinoza\'s claim that genuine political stability rests on citizens recognizing their own interests in collective governance finds its most vivid modern vindication here.',
                  },
                ].map((echo, i) => (
                  <div key={i} style={{
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: '0 6px 6px 0',
                    background: `${accent}0a`,
                    padding: '14px 18px',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 'bold', color: accentLight, marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.75 }}>
                      {echo.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 12: Critique of Religion and Scripture ───
function CritiqueOfReligionScripture() {
  const [sliderValue, setSliderValue] = useState(0);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredEcho, setHoveredEcho] = useState(null);

  const layers = [
    {
      id: "divine",
      label: "Divine Authority Aura",
      sublabel: "Traditional Reception",
      threshold: 0,
      color: "#F59E0B",
      glowColor: "#FCD34D",
      description: "The text arrives wrapped in claims of direct divine origin — every word sacred, every law eternal, every narrative literally true. This surface presentation demands unquestioning obedience.",
      height: 60,
    },
    {
      id: "editorial",
      label: "Later Editorial Additions",
      sublabel: "Post-exilic redaction",
      threshold: 20,
      color: "#B45309",
      glowColor: "#D97706",
      description: "Scribes and editors working centuries after the events described added glosses, harmonized contradictions, and shaped narratives to serve institutional needs. The death of Moses described in Deuteronomy could not have been written by Moses.",
      height: 55,
    },
    {
      id: "political",
      label: "Political Agenda",
      sublabel: "Priestly and royal interests",
      threshold: 40,
      color: "#92400E",
      glowColor: "#B45309",
      description: "Temple priesthoods, monarchy, and tribal coalitions all left fingerprints on the text. Laws about sacrifice concentrate power in Jerusalem. Genealogies legitimate certain lineages. History is written by those who control its inscription.",
      height: 50,
    },
    {
      id: "sources",
      label: "Multiple Source Documents",
      sublabel: "J, E, D, P traditions",
      threshold: 60,
      color: "#78350F",
      glowColor: "#92400E",
      description: "What appears unified is a weave of originally separate documents — different names for God, contradictory creation stories, duplicate narratives of the same events. These seams reveal human compilation, not singular divine dictation.",
      height: 45,
    },
    {
      id: "audience",
      label: "Specific Historical Audience",
      sublabel: "Ancient Near Eastern context",
      threshold: 80,
      color: "#451A03",
      glowColor: "#78350F",
      description: "Every text speaks to someone, somewhere, in a particular moment. The laws address an Iron Age agrarian society. The cosmology reflects Babylonian models. Understanding this context is not reduction — it is illumination.",
      height: 40,
    },
  ];

  const concepts = [
    {
      id: "biblical_criticism",
      label: "Biblical Criticism",
      desc: "Spinoza insists the Bible must be read like any other ancient text — with attention to its linguistic patterns, historical circumstances, internal contradictions, and the interests of those who preserved it. This is not impiety but intellectual honesty.",
    },
    {
      id: "natural_prophecy",
      label: "Natural Prophecy",
      desc: "Prophets were individuals of extraordinary moral sensitivity and imaginative vividness. Their 'visions' were psychologically genuine experiences, but they were shaped by the prophets' own temperaments, cultural contexts, and limited scientific knowledge — not literal transmissions from an infinite God.",
    },
    {
      id: "moral_core",
      label: "Moral Core",
      desc: "Strip away the supernatural packaging and what remains is genuinely valuable: teachings about treating others with justice, caring for the vulnerable, building communities of mutual aid. This ethical wisdom needs no miracles to be true.",
    },
    {
      id: "human_documents",
      label: "Human Documents",
      desc: "The Pentateuch shows signs of multiple authorial hands, post-Mosaic historical references, and systematic theological programs. Ezra and the Great Assembly likely assembled and edited much of what became canonical — a human, political, spiritual project.",
    },
  ];

  const activeLayerCount = layers.filter(l => sliderValue >= l.threshold).length;
  const coreVisible = sliderValue >= 95;
  const coreIntensity = Math.max(0, (sliderValue - 80) / 20);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3B0E06 0%, #1C0A02 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#E8D5C4",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ marginBottom: "12px", opacity: 0.6, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Part 12 of 21 — Spinoza's System
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: "normal", margin: "0 0 8px", color: "#F5E6D3", letterSpacing: "0.5px" }}>
            Critique of Religion and Scripture
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "#C9A882", margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>
            Spinoza applies rigorous rational analysis to biblical texts and religious institutions, separating genuine moral and spiritual insight from accumulated superstition and political manipulation.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(15, 5, 2, 0.75)",
          border: "1px solid rgba(124, 45, 18, 0.3)",
          borderLeft: "4px solid #7C2D12",
          borderRadius: "8px",
          padding: "28px 32px",
          marginBottom: "32px",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7C2D12", marginBottom: "14px", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: "1.8", fontSize: "clamp(13px, 1.8vw, 15px)", color: "#D4B896" }}>
            The political vision required the subordination of traditional religious authority to rational criticism — but what justifies this subordination, and what happens to the genuine spiritual and moral insights religion carries? If you unmask the Bible as a human document, do you destroy everything of value within it, leaving only rubble where a cathedral stood?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(10, 4, 1, 0.85)",
          border: "1px solid rgba(124, 45, 18, 0.4)",
          borderRadius: "12px",
          padding: "36px 32px",
          marginBottom: "32px",
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: "normal", color: "#F0D5B8", margin: "0 0 8px", letterSpacing: "0.5px" }}>
            The Hermeneutical Excavation
          </h2>
          <p style={{ fontSize: "13px", color: "#9A7355", margin: "0 0 28px", lineHeight: "1.6" }}>
            Drag the slider to apply Spinoza's historical analysis. Watch how each layer of accumulated interpretation is stripped away to reveal what lies beneath.
          </p>

          {/* Slider */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "#7C5540", letterSpacing: "1px", textTransform: "uppercase" }}>Surface Reception</span>
              <span style={{ fontSize: "13px", color: "#E8A87C", fontWeight: "bold" }}>
                Analysis Depth: {sliderValue}%
              </span>
              <span style={{ fontSize: "12px", color: "#C06030", letterSpacing: "1px", textTransform: "uppercase" }}>Core Revealed</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={e => setSliderValue(Number(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                cursor: "pointer",
                accentColor: "#7C2D12",
                background: `linear-gradient(to right, #7C2D12 ${sliderValue}%, #2A1008 ${sliderValue}%)`,
                borderRadius: "3px",
                outline: "none",
                border: "none",
              }}
            />
          </div>

          {/* Layered Excavation SVG */}
          <div style={{ position: "relative", marginBottom: "28px" }}>
            <svg width="100%" viewBox="0 0 760 420" style={{ display: "block", overflow: "visible" }}>
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCD34D" stopOpacity={0.9 * coreIntensity} />
                  <stop offset="40%" stopColor="#F59E0B" stopOpacity={0.6 * coreIntensity} />
                  <stop offset="100%" stopColor="#7C2D12" stopOpacity={0} />
                </radialGradient>
                <radialGradient id="divineGlow" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background ambient */}
              <rect x="0" y="0" width="760" height="420" fill="url(#divineGlow)" />

              {/* Layer blocks stacked from bottom */}
              {layers.map((layer, idx) => {
                const totalLayers = layers.length;
                const yBase = 340;
                const layerHeights = [60, 55, 50, 45, 40];
                const cumulativeHeight = layerHeights.slice(idx).reduce((a, b) => a + b, 0);
                const yTop = yBase - cumulativeHeight + layerHeights[idx];
                const yStart = yBase - cumulativeHeight;
                const isStripped = sliderValue >= layer.threshold + 20 && idx > 0;
                const isBeingStripped = sliderValue >= layer.threshold && sliderValue < layer.threshold + 20;
                const progress = isBeingStripped ? (sliderValue - layer.threshold) / 20 : (isStripped ? 1 : 0);
                const opacity = idx === 0 ? Math.max(0.15, 1 - progress) : Math.max(0.15, 1 - progress);
                const translateX = isStripped ? 80 : (isBeingStripped ? progress * 80 : 0);
                const isHovered = hoveredLayer === layer.id;

                return (
                  <g key={layer.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    <rect
                      x={20 + translateX}
                      y={yStart}
                      width={660 - translateX * 0.5}
                      height={layerHeights[idx] - 2}
                      rx="4"
                      fill={layer.color}
                      opacity={opacity}
                      filter={isHovered ? "url(#glow)" : "none"}
                      stroke={isHovered ? layer.glowColor : "none"}
                      strokeWidth="1"
                    />
                    {opacity > 0.3 && (
                      <>
                        <text
                          x={40 + translateX}
                          y={yStart + 20}
                          fill="#F5DEB3"
                          fontSize="13"
                          fontFamily="Georgia, serif"
                          opacity={Math.min(1, opacity * 2)}
                        >
                          {layer.label}
                        </text>
                        <text
                          x={40 + translateX}
                          y={yStart + 36}
                          fill="#C8956A"
                          fontSize="10"
                          fontFamily="Georgia, serif"
                          fontStyle="italic"
                          opacity={Math.min(1, opacity * 2)}
                        >
                          {layer.sublabel}
                        </text>
                        {isStripped && (
                          <text
                            x={20 + translateX + 580}
                            y={yStart + 24}
                            fill="#7C2D12"
                            fontSize="11"
                            fontFamily="Georgia, serif"
                            textAnchor="middle"
                            opacity={0.8}
                          >
                            excavated
                          </text>
                        )}
                      </>
                    )}
                  </g>
                );
              })}

              {/* Core ethical insight at the base */}
              <g>
                <rect
                  x="20"
                  y="346"
                  width="660"
                  height="50"
                  rx="6"
                  fill="#1A0800"
                  stroke="#7C2D12"
                  strokeWidth="1"
                />
                {coreIntensity > 0 && (
                  <rect
                    x="20"
                    y="346"
                    width="660"
                    height="50"
                    rx="6"
                    fill="url(#coreGlow)"
                    opacity={coreIntensity}
                    filter="url(#strongGlow)"
                  />
                )}
                <text
                  x="350"
                  y="367"
                  textAnchor="middle"
                  fill={coreIntensity > 0.3 ? "#FCD34D" : "#6B4020"}
                  fontSize="14"
                  fontFamily="Georgia, serif"
                  fontWeight="bold"
                  filter={coreIntensity > 0.3 ? "url(#strongGlow)" : "none"}
                >
                  Ethical Core: Justice and Compassion
                </text>
                <text
                  x="350"
                  y="385"
                  textAnchor="middle"
                  fill={coreIntensity > 0.3 ? "#F5C470" : "#4A2810"}
                  fontSize="11"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                >
                  {coreIntensity > 0.3 ? "The genuine wisdom — clarified, not destroyed, by rational analysis" : "Move slider to 80%+ to reveal..."}
                </text>
              </g>

              {/* Arrow showing direction of analysis */}
              {sliderValue > 10 && (
                <g opacity={Math.min(1, sliderValue / 30)}>
                  <line x1="710" y1="50" x2="710" y2="340" stroke="#7C2D12" strokeWidth="1.5" strokeDasharray="4,3" />
                  <polygon points="710,350 705,336 715,336" fill="#7C2D12" />
                  <text x="724" y="200" fill="#7C2D12" fontSize="10" fontFamily="Georgia, serif" transform="rotate(90, 724, 200)">
                    Analysis Deepens
                  </text>
                </g>
              )}
            </svg>

            {/* Hover detail box */}
            {hoveredLayer && (
              <div style={{
                background: "rgba(20, 6, 2, 0.95)",
                border: "1px solid rgba(124, 45, 18, 0.6)",
                borderRadius: "8px",
                padding: "16px 20px",
                marginTop: "12px",
                borderLeft: "3px solid #7C2D12",
              }}>
                {layers.filter(l => l.id === hoveredLayer).map(l => (
                  <div key={l.id}>
                    <div style={{ fontSize: "13px", color: "#E8A87C", marginBottom: "6px", fontWeight: "bold" }}>{l.label}</div>
                    <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.7", color: "#C4956A" }}>{l.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: "28px",
            padding: "20px 24px",
            background: "rgba(30, 8, 2, 0.6)",
            borderRadius: "8px",
            border: "1px solid rgba(124, 45, 18, 0.2)",
          }}>
            <p style={{ margin: 0, lineHeight: "1.9", fontSize: "clamp(13px, 1.6vw, 14px)", color: "#C4956A" }}>
              Through linguistic, historical, and internal-consistency analysis, Spinoza demonstrates that the Hebrew scriptures are human documents compiled by later editors combining multiple sources according to theological and political agendas — not direct divine revelation. Prophetic experience is explained as a natural psychological phenomenon involving exceptional moral sensitivity and imaginative power rather than supernatural communication. The genuine value of religious tradition lies in its ethical core — teachings about justice and compassion — which can be appreciated and developed without belief in miracles or divine commands.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(124,45,18,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7C2D12", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7C2D12" : "rgba(124,45,18,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#b45309" : "rgba(124,45,18,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#E8A87C",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(124,45,18,0.08)", border: "1px solid rgba(124,45,18,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7C2D12", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(15, 5, 2, 0.75)",
          border: "1px solid rgba(180, 83, 9, 0.25)",
          borderLeft: "4px solid #B45309",
          borderRadius: "8px",
          padding: "28px 32px",
          marginBottom: "32px",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#B45309", marginBottom: "14px", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 16px", lineHeight: "1.8", fontSize: "15px", color: "#D4B896" }}>
            If miracles and prophecy are natural phenomena misinterpreted through limited ancient scientific understanding, then what is the systematic account of why natural law cannot be violated? What does supernatural interpretation reveal about human psychology — about our deep tendency to read intention and agency into the impersonal workings of an infinite substance?
          </p>
          <p style={{ margin: 0, lineHeight: "1.8", fontSize: "14px", color: "#9A7355", fontStyle: "italic" }}>
            This pressure forces the next development: a rigorous account of necessity, natural law, and the psychology of religious imagination — asking why human beings in every culture have sought to negotiate with a personal God standing outside nature.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(15, 5, 2, 0.75)",
          border: "1px solid rgba(124, 45, 18, 0.3)",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 32px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#E8D5C4",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7C2D12", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={18} color="#7C2D12" /> : <ChevronDown size={18} color="#7C2D12" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #7C2D1233" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: "The Authorship of the Pentateuch",
                    body: "Spinoza noted that passages in the Torah describe events impossible for Moses to have written — including an account of his own death. Modern source criticism identifies at least four distinct documentary traditions (J, E, D, P) woven together, each with distinctive vocabulary, theology, and historical perspective.",
                  },
                  {
                    title: "Prophets as Moral Voices",
                    body: "The Hebrew prophets — Amos, Isaiah, Jeremiah — are better understood as extraordinary moral reformers addressing the social injustices of their time than as supernatural mouthpieces. Their power lay precisely in their sensitivity to exploitation and suffering, capacities that are recognizably human and deeply admirable.",
                  },
                  {
                    title: "Religious Institutions and Secular Authority",
                    body: "Throughout European history, churches claimed authority over economic contracts (usury laws), scientific investigation (Galileo's trial), and political succession. Spinoza's analysis provides the philosophical grounds for separating institutional religious authority from civil governance — a separation foundational to liberal democratic states.",
                  },
                ].map((echo, idx) => (
                  <div key={idx} style={{
                    borderLeft: "3px solid #7C2D12",
                    borderRadius: "0 6px 6px 0",
                    background: "#7C2D120a",
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#E8A87C", marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
                      {echo.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 13: Miracles, Prophecy, and Natural Order ───
function MiraclesProphecyNaturalOrder() {
  const [activeView, setActiveView] = useState('ancient');
  const [showHistorical, setShowHistorical] = useState(false);
  const [showSpinoza, setShowSpinoza] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [eclipsePhase, setEclipsePhase] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const phaseRef = useRef(0);

  const concepts = [
    { id: 'natural_law', label: 'Natural Law', desc: 'Laws of nature are not external rules imposed on God — they are the necessary expression of the divine infinite nature itself. To violate them would be God contradicting the divine essence.' },
    { id: 'miracles', label: 'Miracles as Impossibility', desc: 'A miracle would require God to act against God\'s own nature — a logical contradiction. A God who could perform miracles would be finite, contingent, and arbitrary, not the infinite necessary being of Spinoza\'s metaphysics.' },
    { id: 'prophecy', label: 'Prophetic Tradition', desc: 'The prophets possessed vivid imaginations, not superior intellects. Their visions were genuine psychological experiences, but their interpretations were shaped by their cultural moment — not divine revelation about the literal structure of nature.' },
    { id: 'superstition', label: 'Superstitious Interpretation', desc: 'Fear and political crisis create psychological need for meaning. Ancient peoples lacking astronomical knowledge experienced eclipses, plagues, and military defeats as cosmic messages — a comprehensible, human response to the unknown.' },
    { id: 'science', label: 'Scientific Progress', desc: 'As natural investigation expands, the domain of the \"miraculous\" shrinks not because wonder diminishes but because causes become visible. Each explained phenomenon deepens rather than reduces the sense of the infinite.' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 840;
    canvas.height = canvas.offsetHeight || 180;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const draw = () => {
      phaseRef.current += 0.008;
      const phase = phaseRef.current;

      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.8);
      bg.addColorStop(0, '#1a0a2e');
      bg.addColorStop(1, '#050508');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const twinkle = 0.4 + 0.6 * Math.sin(phase * s.twinkleSpeed * 100 + s.x);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `#ffffff`;
        ctx.globalAlpha = twinkle * 0.7;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const moonX = W / 2 + Math.cos(phase * 0.5) * 60;
      const moonY = H / 2 - 20 + Math.sin(phase * 0.3) * 15;
      const sunX = W / 2;
      const sunY = H / 2 - 20;
      const coverFraction = Math.max(0, 1 - Math.abs(moonX - sunX) / 55);

      const corona = ctx.createRadialGradient(sunX, sunY, 28, sunX, sunY, 90);
      corona.addColorStop(0, '#fff7d6');
      corona.addColorStop(0.3, '#ffd700');
      corona.addColorStop(0.7, '#ff6b0020');
      corona.addColorStop(1, '#00000000');
      ctx.globalAlpha = coverFraction > 0.7 ? 1 : 0.3;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 90, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();
      ctx.globalAlpha = 1;

      const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 30);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.5, '#ffe066');
      sunGrad.addColorStop(1, '#ffaa00');
      ctx.beginPath();
      ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, 29, 0, Math.PI * 2);
      ctx.fillStyle = '#0d0620';
      ctx.fill();
      ctx.strokeStyle = '#3d2060';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      setEclipsePhase(coverFraction);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const conceptPanelStyle = (id) => ({
    padding: '10px 14px',
    marginBottom: '8px',
    background: hoveredConcept === id ? '#2d1a4a' : '#1a0f2e',
    border: `1px solid ${hoveredConcept === id ? '#7c3aed' : '#3d1f6b'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: hoveredConcept === id ? '0 0 12px #4C1D9566' : 'none',
  });

  const tabStyle = (active) => ({
    padding: '8px 20px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '14px',
    background: active ? '#4C1D95' : '#1a0f2e',
    color: active ? '#f5f0ff' : '#9d7bc4',
    border: `1px solid ${active ? '#7c3aed' : '#3d1f6b'}`,
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    letterSpacing: '0.03em',
  });

  return (
    <div style={{
      background: 'radial-gradient(ellipse at center, #1a0535 0%, #0a0a0f 100%)',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#e8e0f5',
      padding: '36px 24px',
    }}><div style={{ maxWidth: 'min(90vw, 900px)', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#7c5cbf', textTransform: 'uppercase', marginBottom: '6px' }}>
          Part 13 of 21 — Spinoza's System
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 'normal', color: '#f0e8ff', margin: '0 0 6px 0', letterSpacing: '0.02em' }}>
          Miracles, Prophecy, and Natural Order
        </h1>
        <p style={{ fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#a68fd4', fontStyle: 'italic', margin: 0, maxWidth: 'min(100%, 640px)', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Spinoza's consistent naturalism eliminates supernatural interventions as logically impossible given that natural law expresses the immutable divine nature itself.
        </p>
      </div>

      {/* THE PROBLEM PANEL */}
      <div style={{
        background: '#110a1e',
        border: '1px solid #2a1245',
        borderLeft: '4px solid #4C1D95',
        borderRadius: '8px',
        padding: '22px 26px',
        marginBottom: '28px',
        boxShadow: '0 2px 24px #4C1D9522',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 'bold' }}>
          The Problem
        </div>
        <p style={{ margin: 0, lineHeight: '1.75', fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#c9b8e8' }}>
          The critique of scripture had established that religious texts are human documents — shaped by historical circumstance, political pressure, and the imaginative faculty of their authors. But this left a gap at the center of the argument. If miracles and prophecy are the primary evidence for divine intervention in history, their status needed systematic grounding — not merely in textual criticism, but in the metaphysics of natural law itself. What exactly makes a miracle impossible, and why does prophetic vision, however vivid, not constitute privileged access to divine intention? These questions demanded an answer that reached deeper than philology.
        </p>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{
        background: '#0e0820',
        border: '1px solid #2a1245',
        borderRadius: '12px',
        padding: '28px',
        marginBottom: '28px',
        boxShadow: '0 4px 40px #4C1D9530',
      }}>

        {/* Eclipse Canvas */}
        <div style={{ position: 'relative', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '180px', borderRadius: '10px' }}
          />
          {eclipsePhase > 0.6 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#ffd700',
              textTransform: 'uppercase',
              textShadow: '0 0 12px #ffd700',
              pointerEvents: 'none',
              opacity: Math.min(1, (eclipsePhase - 0.6) * 2.5),
            }}>
              Eclipse in Progress
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '14px',
            fontSize: '10px',
            color: '#7c5cbf',
            fontStyle: 'italic',
          }}>
            The same celestial event — two interpretations
          </div>
        </div>

        {/* View Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <button style={tabStyle(activeView === 'ancient')} onClick={() => setActiveView('ancient')}>
            Ancient Interpretation
          </button>
          <button style={tabStyle(activeView === 'scientific')} onClick={() => setActiveView('scientific')}>
            Scientific Causal Chain
          </button>
          <button
            style={{
              ...tabStyle(showHistorical),
              background: showHistorical ? '#2d1a4a' : '#1a0f2e',
              borderColor: showHistorical ? '#9d5cdb' : '#3d1f6b',
              color: showHistorical ? '#d4b8f5' : '#9d7bc4',
            }}
            onClick={() => setShowHistorical(h => !h)}
          >
            Historical Context {showHistorical ? '▲' : '▼'}
          </button>
          <button
            style={{
              ...tabStyle(showSpinoza),
              background: showSpinoza ? '#1e3a1e' : '#1a0f2e',
              borderColor: showSpinoza ? '#4a9d5c' : '#3d1f6b',
              color: showSpinoza ? '#a8e6b8' : '#9d7bc4',
            }}
            onClick={() => setShowSpinoza(s => !s)}
          >
            Spinoza's Point {showSpinoza ? '▲' : '▼'}
          </button>
        </div>

        {/* Dual Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: activeView === 'ancient' ? '1fr' : '1fr 1fr', gap: '18px', marginBottom: '20px', transition: 'all 0.4s ease' }}>

          {/* Ancient Panel */}
          {(activeView === 'ancient' || activeView === 'scientific') && (
            <div style={{
              background: '#150d28',
              border: '1px solid #3d1f6b',
              borderRadius: '10px',
              padding: '20px',
              display: activeView === 'scientific' ? 'block' : 'block',
            }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#9d5cdb', textTransform: 'uppercase', marginBottom: '14px' }}>
                Ancient Interpretation
              </div>

              <svg width="100%" viewBox="0 0 320 200" style={{ display: 'block', marginBottom: '14px' }}>
                {/* Sky */}
                <defs>
                  <radialGradient id="darksky" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#1a0535" />
                    <stop offset="100%" stopColor="#050308" />
                  </radialGradient>
                  <radialGradient id="ecglow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="320" height="200" fill="url(#darksky)" />

                {/* Eclipse symbol */}
                <circle cx="160" cy="55" r="30" fill="#ffe066" opacity="0.9" />
                <circle cx="175" cy="50" r="29" fill="#1a0535" />
                <circle cx="160" cy="55" r="32" fill="url(#ecglow)" />

                {/* Supernatural arrows */}
                <g opacity="0.85">
                  <line x1="160" y1="88" x2="90" y2="140" stroke="#ff3300" strokeWidth="2" strokeDasharray="5,3" />
                  <polygon points="90,140 82,130 98,128" fill="#ff3300" />
                  <text x="54" y="128" fill="#ff5522" fontSize="9" fontFamily="Georgia, serif">God's Wrath</text>

                  <line x1="160" y1="88" x2="230" y2="140" stroke="#ff3300" strokeWidth="2" strokeDasharray="5,3" />
                  <polygon points="230,140 222,130 238,128" fill="#ff3300" />
                  <text x="202" y="128" fill="#ff5522" fontSize="9" fontFamily="Georgia, serif">Divine Sign</text>

                  <line x1="160" y1="88" x2="160" y2="145" stroke="#ff6600" strokeWidth="2" strokeDasharray="5,3" />
                  <polygon points="160,145 153,133 167,133" fill="#ff6600" />
                  <text x="135" y="162" fill="#ff7733" fontSize="9" fontFamily="Georgia, serif">Punishment</text>
                </g>

                {/* Figures */}
                <g fill="#7c5cbf" opacity="0.8">
                  <circle cx="60" cy="175" r="6" />
                  <line x1="60" y1="181" x2="60" y2="195" stroke="#7c5cbf" strokeWidth="2" />
                  <line x1="60" y1="186" x2="50" y2="193" stroke="#7c5cbf" strokeWidth="1.5" />
                  <line x1="60" y1="186" x2="70" y2="181" stroke="#7c5cbf" strokeWidth="1.5" />
                  <text x="45" y="200" fill="#9d7bc4" fontSize="7" fontFamily="Georgia, serif">Priest</text>

                  <circle cx="250" cy="175" r="6" />
                  <line x1="250" y1="181" x2="250" y2="195" stroke="#7c5cbf" strokeWidth="2" />
                  <line x1="250" y1="186" x2="240" y2="181" stroke="#7c5cbf" strokeWidth="1.5" />
                  <line x1="250" y1="186" x2="260" y2="193" stroke="#7c5cbf" strokeWidth="1.5" />
                  <text x="234" y="200" fill="#9d7bc4" fontSize="7" fontFamily="Georgia, serif">People</text>
                </g>

                <text x="160" y="20" textAnchor="middle" fill="#9d5cdb" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                  "The sun darkens — the gods are angry"
                </text>
              </svg>

              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.65', color: '#a890cc' }}>
                Without orbital mechanics, without the geometry of shadows, an eclipse is genuinely terrifying. The psychological response — seeking agency, meaning, warning — is not foolishness but the deepest human impulse toward coherence. Ancient interpreters were not wrong to seek meaning; they were limited in the causal vocabulary available to them.
              </p>
            </div>
          )}

          {/* Scientific Panel */}
          {activeView === 'scientific' && (
            <div style={{
              background: '#0d1520',
              border: '1px solid #1a3a5c',
              borderRadius: '10px',
              padding: '20px',
            }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#4a9ddb', textTransform: 'uppercase', marginBottom: '14px' }}>
                Scientific Causal Chain
              </div>

              <svg width="100%" viewBox="0 0 320 200" style={{ display: 'block', marginBottom: '14px' }}>
                <defs>
                  <radialGradient id="spacegrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#050d1a" />
                    <stop offset="100%" stopColor="#020508" />
                  </radialGradient>
                </defs>
                <rect width="320" height="200" fill="url(#spacegrad)" />

                {/* Sun */}
                <circle cx="50" cy="100" r="22" fill="#ffe066" opacity="0.9" />
                <text x="50" y="130" textAnchor="middle" fill="#ffe066" fontSize="9" fontFamily="Georgia, serif">Sun</text>

                {/* Light rays */}
                <line x1="72" y1="100" x2="180" y2="100" stroke="#ffe066" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6" />

                {/* Moon orbit */}
                <ellipse cx="160" cy="100" rx="95" ry="25" fill="none" stroke="#4a7aad" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                <circle cx="160" cy="75" r="12" fill="#3d3d5c" />
                <text x="160" y="65" textAnchor="middle" fill="#9090b8" fontSize="9" fontFamily="Georgia, serif">Moon</text>

                {/* Earth */}
                <circle cx="255" cy="100" r="18" fill="#2d5a8e" />
                <circle cx="255" cy="100" r="6" fill="#4a9d5c" opacity="0.8" />
                <text x="255" y="128" textAnchor="middle" fill="#4a9ddb" fontSize="9" fontFamily="Georgia, serif">Earth</text>

                {/* Shadow geometry */}
                <line x1="172" y1="87" x2="273" y2="92" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                <line x1="172" y1="113" x2="273" y2="108" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                <polygon points="172,87 172,113 230,102" fill="#000000" opacity="0.5" />

                {/* Labels */}
                <text x="200" y="97" textAnchor="middle" fill="#6090aa" fontSize="8" fontFamily="Georgia, serif" fontStyle="italic">umbra</text>

                {/* Causal chain labels */}
                <text x="50" y="15" textAnchor="middle" fill="#4a9ddb" fontSize="8" fontFamily="Georgia, serif">1. Solar emission</text>
                <text x="160" y="15" textAnchor="middle" fill="#4a9ddb" fontSize="8" fontFamily="Georgia, serif">2. Lunar interposition</text>
                <text x="270" y="15" textAnchor="middle" fill="#4a9ddb" fontSize="8" fontFamily="Georgia, serif">3. Shadow projection</text>

                <line x1="50" y1="20" x2="130" y2="20" stroke="#4a9ddb" strokeWidth="0.8" opacity="0.5" markerEnd="url(#arr)" />
                <line x1="160" y1="20" x2="240" y2="20" stroke="#4a9ddb" strokeWidth="0.8" opacity="0.5" />
                <polygon points="240,17 248,20 240,23" fill="#4a9ddb" opacity="0.5" />
                <polygon points="130,17 138,20 130,23" fill="#4a9ddb" opacity="0.5" />
              </svg>

              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.65', color: '#88aac4' }}>
                The orbital geometry is immutable, mathematically necessary, and perfectly predictable. No divine decision is required — or even logically possible — to produce the eclipse. The same natural laws that govern the cosmos express the divine nature necessarily and completely.
              </p>
            </div>
          )}
        </div>

        {/* Historical Context Overlay */}
        {showHistorical && (
          <div style={{
            background: '#1a0f2e',
            border: '1px solid #5a3090',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #7c3aed',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#9d5cdb', textTransform: 'uppercase', marginBottom: '12px' }}>
              Historical Context
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {[
                { icon: '🌑', title: 'Limited Astronomy', body: 'Without knowledge of orbital mechanics, celestial disruptions appeared genuinely discontinuous with known natural patterns — making divine intervention the most coherent available explanation.' },
                { icon: '⚔️', title: 'Political Crisis', body: 'Eclipses often coincided with military campaigns or political transitions. The coincidence amplified the sense that natural events carried political meaning — a correlation that felt causal.' },
                { icon: '🧠', title: 'Psychological Need', body: 'In moments of collective fear, the mind urgently seeks agency and meaning. Attributing events to divine will provides both an explanation and — crucially — a potential avenue for response through ritual and prayer.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#120b22', borderRadius: '8px', padding: '14px', border: '1px solid #2d1850' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#c4a0e8', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#9080b0', lineHeight: '1.55' }}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spinoza's Point Overlay */}
        {showSpinoza && (
          <div style={{
            background: '#0f1e12',
            border: '1px solid #2d6b3a',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '16px',
            borderLeft: '4px solid #4a9d5c',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#4a9d5c', textTransform: 'uppercase', marginBottom: '12px' }}>
              Spinoza's Point
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#7cc48a', fontWeight: 'bold', marginBottom: '8px' }}>Accepting Natural Law Deepens Wonder</div>
                <p style={{ margin: 0, fontSize: '13px', color: '#7a9d80', lineHeight: '1.65' }}>
                  To understand an eclipse through orbital mechanics is not to diminish it — it is to perceive the infinite necessity of the divine nature expressing itself through every particle of matter and every moment of time. The wonder is not abolished; it is reoriented toward the whole.
                </p>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#7cc48a', fontWeight: 'bold', marginBottom: '8px' }}>The Political Consequence</div>
                <p style={{ margin: 0, fontSize: '13px', color: '#7a9d80', lineHeight: '1.65' }}>
                  If no eclipse can be a divine message, then no priest or king can claim supernatural authority derived from such signs. Political authority must justify itself rationally, in terms of natural right and collective benefit — not celestial endorsement. This is the liberating edge of naturalism.
                </p>
              </div>
            </div>
            <div style={{
              marginTop: '16px',
              padding: '14px',
              background: '#0a1a0d',
              borderRadius: '8px',
              border: '1px solid #1e4a28',
              textAlign: 'center',
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#a8e6b8', fontStyle: 'italic', lineHeight: '1.7' }}>
                "God does not contradict God. Natural law is not a constraint on the divine — it is the divine nature in its most immediate and complete expression."
              </p>
              <div style={{ fontSize: '11px', color: '#4a9d5c', marginTop: '8px', letterSpacing: '0.1em' }}>— Spinoza's core argument</div>
            </div>
          </div>
        )}

      </div>

      {/* Key Concepts */}
      <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7c3aed', marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {concepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: '6px 14px',
                background: hoveredConcept === c.id ? '#7c3aed' : 'rgba(124,58,237,0.1)',
                border: `1px solid ${hoveredConcept === c.id ? '#a78bfa' : 'rgba(124,58,237,0.35)'}`,
                borderRadius: 20,
                fontSize: 12,
                cursor: 'pointer',
                color: hoveredConcept === c.id ? '#f0ead8' : '#b090d8',
                transition: 'all 0.2s',
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 6, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#7c3aed', marginBottom: 8 }}>
              {concepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#c8c0b4' }}>
              {concepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{
        background: '#110a1e',
        border: '1px solid #2a1245',
        borderLeft: '4px solid #7c3aed',
        borderRadius: '8px',
        padding: '22px 26px',
        marginBottom: '20px',
        boxShadow: '0 2px 24px #7c3aed18',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#9d5cdb', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 'bold' }}>
          The Difficulty
        </div>
        <p style={{ margin: '0 0 14px 0', lineHeight: '1.75', fontSize: '15px', color: '#c9b8e8' }}>
          The demolition of supernatural sanction creates an immediate and urgent political vacuum. If no eclipse, no plague, no military victory can be read as divine endorsement — then on what basis does any ruler hold authority? Spinoza has eliminated the theological prop without yet replacing it. The argument now requires a theory of natural right: some account of how power is legitimated in the purely natural realm, without recourse to celestial messages or prophetic mandates.
        </p>
        <p style={{ margin: 0, lineHeight: '1.75', fontSize: '15px', color: '#c9b8e8' }}>
          More precisely, the tension concerns the relationship between individual natural power — the conatus, the drive of each finite mode to persist — and the collective institution of political authority. Does political right emerge from the aggregation of individual natural powers? And if so, what constrains the powerful from simply dominating the weak? This pressure forces the next development: a philosophy of the state grounded not in divine right but in the geometry of natural power itself.
        </p>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{
        background: '#110a1e',
        border: '1px solid #2a1245',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 16px #4C1D9518',
      }}>
        <div
          style={{
            padding: '18px 26px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: echosOpen ? '#160d28' : '#110a1e',
            transition: 'background 0.2s ease',
          }}
          onClick={() => setEchosOpen(o => !o)}
        >
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#7c3aed', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Real-World Echoes
          </div>
          {echosOpen
            ? <ChevronUp size={16} color="#7c3aed" />
            : <ChevronDown size={16} color="#7c3aed" />}
        </div>
        {echosOpen && (
          <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #4C1D9533' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
              {[
                {
                  title: 'Eclipses, Earthquakes, and Plagues as Divine Messages',
                  body: 'Throughout antiquity and into the medieval period, sudden natural disasters were routinely read as divine communications — either punishment for social transgression or warning of impending judgment. The 1755 Lisbon earthquake triggered fierce theological debate: Voltaire and Rousseau clashed over whether God had sent it as punishment. Spinoza\'s naturalism dissolves this debate entirely: the tectonic forces involved express the same divine necessity as the orbits of planets.',
                },
                {
                  title: 'Military Victory and Divine Endorsement',
                  body: 'From the Roman practice of consulting augurs before battle to modern political leaders claiming God\'s blessing on military campaigns, the attribution of military success to divine favor has been a persistent legitimating strategy. Spinoza\'s argument strips this claim of metaphysical grounding: the outcome of a battle reflects the configuration of natural powers — numbers, terrain, morale, technology — not divine preference.',
                },
                {
                  title: 'Contemporary Scientific Investigation Expanding the Known',
                  body: 'Each advance in epidemiology, seismology, climatology, or neuroscience reclaims another domain from the formerly miraculous. When the mechanism of a seizure becomes understood as electrochemical rather than demonic possession, the domain of the \'miraculous\' contracts. This is precisely the positive feedback loop Spinoza described: scientific investigation and political rationalization reinforce each other in the project of human self-governance.',
                },
                {
                  title: 'The Persistence of Providential Politics',
                  body: 'Contemporary political discourse in many countries still invokes divine sanction — for national destiny, military action, or social policy. Spinoza\'s analysis predicts that such invocations will prove unstable: they require populations to defer to an authority that cannot be questioned, which generates resentment, and they cannot resolve disputes between competing divine mandates. The rational alternative he points toward remains unfinished political business.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  borderLeft: '3px solid #4C1D95',
                  borderRadius: '0 6px 6px 0',
                  background: '#4C1D950a',
                  padding: '14px 18px',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#b090d8', marginBottom: 6 }}>{item.title}</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '11px', color: '#4a306a', letterSpacing: '0.1em' }}>
        Spinoza's System — Part 13 of 21
      </div>
    </div></div>
  );
}

// ─── Part 14: Natural Right and Social Contract: The Political Foundation ───
function SocialContractNaturalRight() {
  const [simRunning, setSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [selectedRegime, setSelectedRegime] = useState("Democracy");
  const [civicVirtue, setCivicVirtue] = useState(0.6);
  const [infoAccess, setInfoAccess] = useState(0.7);
  const [powerHistory, setPowerHistory] = useState({ Monarchy: [], Aristocracy: [], Democracy: [] });
  const [collectiveHistory, setCollectiveHistory] = useState({ Monarchy: [], Aristocracy: [], Democracy: [] });
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [isHoveringRun, setIsHoveringRun] = useState(false);
  const [isHoveringReset, setIsHoveringReset] = useState(false);
  const simRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const ACCENT = "#065F46";
  const ACCENT_LIGHT = "#10B981";
  const ACCENT_MID = "#047857";

  const regimeColors = {
    Monarchy: "#B45309",
    Aristocracy: "#7C3AED",
    Democracy: "#065F46"
  };

  const concepts = [
    { id: "natural_right", label: "Natural Right as Power", desc: "Spinoza radically equates right with actual capacity. A stone has the right to fall; a predator has the right to hunt. Rights are not moral abstractions but descriptions of real power in the world. This makes rights measurable and grounded in nature itself." },
    { id: "state_of_nature", label: "State of Nature", desc: "In Spinoza's state of nature, individuals are largely powerless alone. Unlike Hobbes's war of all against all focused on fear, Spinoza's account emphasizes the positive gain from cooperation — you do not escape nature's violence so much as you harness nature's social logic." },
    { id: "collective_enhancement", label: "Collective Enhancement", desc: "The social contract for Spinoza is not a moment of consent but an ongoing demonstration. Legitimate authority continuously proves itself through observable outcomes: do citizens think more freely, create more, and live more fully under this government?" },
    { id: "legitimacy", label: "Political Legitimacy", desc: "No government is legitimate by virtue of being elected or divinely appointed. Legitimacy is a property of results. A democracy that fails to enhance citizens' rational capacities loses its claim; a benevolent monarchy that succeeds gains one — though structurally, democracy has systematic advantages." },
    { id: "sovereignty", label: "Popular Sovereignty", desc: "Even authoritarian regimes must manage popular power — they cannot simply ignore it. Spinoza's realism acknowledges that no state can survive sustained active resistance from its population. The question is always how power is distributed and managed, not whether the people have it." },
    { id: "democratic", label: "Democratic Deliberation", desc: "Democracy is not just instrumentally better at distributing power — it has a developmental quality. Participation in democratic deliberation itself cultivates the rational and civic capacities that make democracy work. The process is part of the product." }
  ];

  function computeRegimeStep(regime, step, cv, ia) {
    const base = {
      Monarchy: { growthRate: 0.015, ceiling: 0.55, collectiveMult: 0.6, delay: 0 },
      Aristocracy: { growthRate: 0.022, ceiling: 0.72, collectiveMult: 0.75, delay: 0 },
      Democracy: { growthRate: 0.028, ceiling: 0.95, collectiveMult: 1.0, delay: 8 }
    };
    const r = base[regime];
    const effectiveStep = Math.max(0, step - r.delay);
    const cvBonus = regime === "Democracy" ? cv * 0.25 : cv * 0.08;
    const iaBonus = regime === "Democracy" ? ia * 0.20 : ia * 0.05;
    const ceiling = Math.min(0.98, r.ceiling + cvBonus + iaBonus);
    const power = ceiling * (1 - Math.exp(-r.growthRate * effectiveStep));
    const collective = power * r.collectiveMult * (1 + (regime === "Democracy" ? cv * 0.15 : 0));
    return { power: Math.min(0.98, power), collective: Math.min(0.98, collective) };
  }

  function runSimulation() {
    const newPower = { Monarchy: [], Aristocracy: [], Democracy: [] };
    const newCollective = { Monarchy: [], Aristocracy: [], Democracy: [] };
    for (let s = 0; s <= 50; s++) {
      ["Monarchy", "Aristocracy", "Democracy"].forEach(regime => {
        const vals = computeRegimeStep(regime, s, civicVirtue, infoAccess);
        newPower[regime].push(vals.power);
        newCollective[regime].push(vals.collective);
      });
    }
    setPowerHistory(newPower);
    setCollectiveHistory(newCollective);
    setSimStep(0);
    setSimRunning(true);
  }

  useEffect(() => {
    if (!simRunning) return;
    if (simStep >= 50) { setSimRunning(false); return; }
    const timer = setTimeout(() => setSimStep(s => s + 1), 80);
    return () => clearTimeout(timer);
  }, [simRunning, simStep]);

  function resetSim() {
    setSimRunning(false);
    setSimStep(0);
    setPowerHistory({ Monarchy: [], Aristocracy: [], Democracy: [] });
    setCollectiveHistory({ Monarchy: [], Aristocracy: [], Democracy: [] });
  }

  const chartData = [];
  for (let i = 0; i <= simStep; i++) {
    const point = { step: i };
    ["Monarchy", "Aristocracy", "Democracy"].forEach(r => {
      if (powerHistory[r] && powerHistory[r][i] !== undefined) {
        point[`power_${r}`] = +(powerHistory[r][i] * 100).toFixed(1);
        point[`coll_${r}`] = +(collectiveHistory[r][i] * 100).toFixed(1);
      }
    });
    chartData.push(point);
  }

  const currentVals = {};
  ["Monarchy", "Aristocracy", "Democracy"].forEach(r => {
    if (powerHistory[r] && powerHistory[r][simStep] !== undefined) {
      currentVals[r] = {
        power: (powerHistory[r][simStep] * 100).toFixed(1),
        collective: (collectiveHistory[r][simStep] * 100).toFixed(1)
      };
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 860;
    canvas.height = canvas.offsetHeight || 160;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const agents = [];
    const regimePositions = {
      Monarchy: { cx: W * 0.18, cy: H * 0.5 },
      Aristocracy: { cx: W * 0.5, cy: H * 0.5 },
      Democracy: { cx: W * 0.82, cy: H * 0.5 }
    };

    ["Monarchy", "Aristocracy", "Democracy"].forEach((regime, ri) => {
      const count = regime === "Monarchy" ? 7 : regime === "Aristocracy" ? 10 : 14;
      const { cx, cy } = regimePositions[regime];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = regime === "Monarchy" ? 28 + (i === 0 ? 0 : 18) : regime === "Aristocracy" ? 30 : 35;
        const r = i === 0 && regime === "Monarchy" ? 0 : radius;
        agents.push({
          x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * 8,
          y: cy + Math.sin(angle) * r + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          regime,
          cx, cy,
          isElite: (regime === "Monarchy" && i === 0) || (regime === "Aristocracy" && i < 3),
          power: 0.1 + Math.random() * 0.3,
          targetPower: 0
        });
      }
    });

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      agents.forEach(agent => {
        const progress = simStep / 50;
        const vals = computeRegimeStep(agent.regime, simStep, civicVirtue, infoAccess);
        if (agent.isElite && agent.regime === "Monarchy") {
          agent.targetPower = 0.85;
        } else if (agent.isElite && agent.regime === "Aristocracy") {
          agent.targetPower = 0.65 + vals.power * 0.2;
        } else {
          agent.targetPower = vals.power * (agent.regime === "Democracy" ? 1.0 : agent.isElite ? 0.9 : 0.6);
        }
        agent.power += (agent.targetPower - agent.power) * 0.05;

        const pull = 0.015;
        agent.vx += (agent.cx - agent.x) * pull;
        agent.vy += (agent.cy - agent.y) * pull;
        agent.vx *= 0.92;
        agent.vy *= 0.92;
        agent.x += agent.vx + Math.sin(frame * 0.02 + agent.power * 10) * 0.4;
        agent.y += agent.vy + Math.cos(frame * 0.018 + agent.power * 8) * 0.4;

        const grd = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, agent.power * 14 + 4);
        const col = regimeColors[agent.regime];
        grd.addColorStop(0, col + "ff");
        grd.addColorStop(1, col + "00");
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.power * 14 + 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.isElite ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = agent.isElite ? "#FFF" : col;
        ctx.fill();
      });

      Object.entries(regimePositions).forEach(([regime, pos]) => {
        ctx.fillStyle = "#ffffff22";
        ctx.font = "bold 11px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(regime, pos.cx, H - 12);
        const vals = computeRegimeStep(regime, simStep, civicVirtue, infoAccess);
        const barW = 60;
        const barH = 5;
        const bx = pos.cx - barW / 2;
        const by = H - 28;
        ctx.fillStyle = "#ffffff18";
        ctx.fillRect(bx, by, barW, barH);
        ctx.fillStyle = regimeColors[regime];
        ctx.fillRect(bx, by, barW * vals.power, barH);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [simStep, civicVirtue, infoAccess]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #022c22 0%, #051c14 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#e8e8e0",
      padding: "40px 24px"
    }}>
      <div style={{ maxWidth: "min(90vw, 900px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 12, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: ACCENT_LIGHT, textTransform: "uppercase", marginBottom: 8 }}>Part 14 of 21 — Spinoza's System</div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "bold", color: "#f0ede4", margin: "0 0 10px 0", lineHeight: 1.3 }}>Natural Right and Social Contract</h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#aaa89a", maxWidth: "min(100%, 680px)", margin: "0 auto", lineHeight: 1.7 }}>
            Spinoza grounds political authority not in abstract consent or divine right but in the demonstrated enhancement of citizens' collective power to achieve their essential goals.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#0d1f18cc",
          border: "1px solid #1a2e24",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: 10,
          padding: "24px 28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: ACCENT_LIGHT, textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>The Problem</div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.8, color: "#d4d0c4" }}>
            Eliminating supernatural political sanction demanded a purely naturalistic account of how and why political authority is legitimate. Once God no longer underwrites kingship and divine right no longer explains obedience, a vacuum appears at the heart of political philosophy: <em style={{ color: "#f0ede4" }}>on what basis can one person or institution claim authority over others?</em> This is not merely an academic puzzle — without an answer, every government is simply organized force, and every rebel has as much right as any king.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0b1a14cc",
          border: "1px solid #1a2e24",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: ACCENT_LIGHT, textTransform: "uppercase", marginBottom: 6 }}>Core Argument — Interactive Simulation</div>
          <h2 style={{ fontSize: 19, color: "#f0ede4", margin: "0 0 6px 0" }}>Legitimacy Through Demonstrated Power Enhancement</h2>
          <p style={{ fontSize: 14, color: "#9a9888", lineHeight: 1.7, margin: "0 0 24px 0" }}>
            Spinoza's theory is empirically testable: legitimate government is the kind that actually increases citizens' power. Run the simulation to see how three regimes perform over 50 policy steps. Adjust civic virtue and information access to explore when democracy's structural advantage grows or shrinks.
          </p>

          {/* Canvas Agent Simulation */}
          <div style={{ position: "relative", marginBottom: 20 }}>
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: 160,
                borderRadius: 8,
                background: "#060f0a",
                border: "1px solid #1a2e24",
                display: "block"
              }}
            />
            <div style={{
              position: "absolute",
              top: 8,
              left: 12,
              fontSize: 11,
              color: "#6a8878",
              letterSpacing: 1
            }}>
              AGENT POWER DISTRIBUTION — Step {simStep}/50
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20, alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 11, color: "#6a8878", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Civic Virtue Level: {(civicVirtue * 100).toFixed(0)}%</div>
              <input
                type="range" min={0} max={100} value={civicVirtue * 100}
                onChange={e => { setCivicVirtue(e.target.value / 100); if (simStep > 0) resetSim(); }}
                style={{ width: 160, accentColor: ACCENT_LIGHT, cursor: "pointer" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#6a8878", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Information Access: {(infoAccess * 100).toFixed(0)}%</div>
              <input
                type="range" min={0} max={100} value={infoAccess * 100}
                onChange={e => { setInfoAccess(e.target.value / 100); if (simStep > 0) resetSim(); }}
                style={{ width: 160, accentColor: ACCENT_LIGHT, cursor: "pointer" }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={simRunning ? () => setSimRunning(false) : runSimulation}
                onMouseEnter={() => setIsHoveringRun(true)}
                onMouseLeave={() => setIsHoveringRun(false)}
                style={{
                  background: isHoveringRun ? ACCENT_MID : ACCENT,
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "background 0.2s"
                }}
              >
                {simRunning ? "Pause" : simStep > 0 ? "Resume" : "Run Simulation"}
              </button>
              <button
                onClick={resetSim}
                onMouseEnter={() => setIsHoveringReset(true)}
                onMouseLeave={() => setIsHoveringReset(false)}
                style={{
                  background: "transparent",
                  color: isHoveringReset ? ACCENT_LIGHT : "#6a8878",
                  border: `1px solid ${isHoveringReset ? ACCENT_LIGHT : "#2a3e34"}`,
                  borderRadius: 6,
                  padding: "8px 16px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Current Values Display */}
          {simStep > 0 && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {["Monarchy", "Aristocracy", "Democracy"].map(r => (
                <div key={r} style={{
                  flex: 1,
                  minWidth: 160,
                  background: "#070f0b",
                  border: `1px solid ${regimeColors[r]}44`,
                  borderTop: `2px solid ${regimeColors[r]}`,
                  borderRadius: 8,
                  padding: "12px 16px"
                }}>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: regimeColors[r], marginBottom: 8 }}>{r}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#6a8878" }}>Avg. Individual Power</span>
                    <span style={{ fontSize: 13, color: "#e8e8e0" }}>{currentVals[r]?.power ?? "—"}</span>
                  </div>
                  <div style={{ background: "#0d1a12", borderRadius: 3, height: 4, marginBottom: 8 }}>
                    <div style={{ width: `${currentVals[r]?.power ?? 0}%`, height: 4, background: regimeColors[r], borderRadius: 3, transition: "width 0.3s" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#6a8878" }}>Collective Achievement</span>
                    <span style={{ fontSize: 13, color: "#e8e8e0" }}>{currentVals[r]?.collective ?? "—"}</span>
                  </div>
                  <div style={{ background: "#0d1a12", borderRadius: 3, height: 4 }}>
                    <div style={{ width: `${currentVals[r]?.collective ?? 0}%`, height: 4, background: regimeColors[r] + "cc", borderRadius: 3, transition: "width 0.3s" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Charts */}
          {chartData.length > 1 && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 11, color: "#6a8878", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Average Individual Power</div>
                <LineChart width={390} height={180} data={chartData} style={{ maxWidth: "100%" }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2e24" />
                  <XAxis dataKey="step" tick={{ fill: "#5a7868", fontSize: 10 }} label={{ value: "Policy Steps", position: "insideBottom", offset: -2, fill: "#5a7868", fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#5a7868", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "#0d1f18", border: `1px solid ${ACCENT}`, color: "#e8e8e0", fontFamily: "Georgia, serif", fontSize: 12 }} />
                  <Line type="monotone" dataKey="power_Monarchy" stroke="#B45309" dot={false} strokeWidth={2} name="Monarchy" />
                  <Line type="monotone" dataKey="power_Aristocracy" stroke="#7C3AED" dot={false} strokeWidth={2} name="Aristocracy" />
                  <Line type="monotone" dataKey="power_Democracy" stroke="#10B981" dot={false} strokeWidth={2.5} name="Democracy" />
                </LineChart>
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 11, color: "#6a8878", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Collective Achievement Score</div>
                <LineChart width={390} height={180} data={chartData} style={{ maxWidth: "100%" }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2e24" />
                  <XAxis dataKey="step" tick={{ fill: "#5a7868", fontSize: 10 }} label={{ value: "Policy Steps", position: "insideBottom", offset: -2, fill: "#5a7868", fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#5a7868", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "#0d1f18", border: `1px solid ${ACCENT}`, color: "#e8e8e0", fontFamily: "Georgia, serif", fontSize: 12 }} />
                  <Line type="monotone" dataKey="coll_Monarchy" stroke="#B45309" dot={false} strokeWidth={2} name="Monarchy" />
                  <Line type="monotone" dataKey="coll_Aristocracy" stroke="#7C3AED" dot={false} strokeWidth={2} name="Aristocracy" />
                  <Line type="monotone" dataKey="coll_Democracy" stroke="#10B981" dot={false} strokeWidth={2.5} name="Democracy" />
                </LineChart>
              </div>
            </div>
          )}

          {simStep === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#4a6858" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>▷</div>
              <div style={{ fontSize: 14 }}>Press "Run Simulation" to see how regime type affects citizens' power over 50 policy steps.</div>
              <div style={{ fontSize: 13, marginTop: 8, color: "#3a5848" }}>Adjust civic virtue and information access to test when democracy's advantage appears.</div>
            </div>
          )}

          {/* Interpretation note */}
          {simStep >= 40 && (
            <div style={{
              background: "#0a2018",
              border: `1px solid ${ACCENT}44`,
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 16
            }}>
              <div style={{ fontSize: 12, color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6 }}>Spinoza's Verdict</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#a8a498" }}>
                Notice that Democracy {civicVirtue < 0.3 && infoAccess < 0.3 ? "struggles when civic virtue and information are suppressed — Spinoza would say such conditions undermine democracy from within" : "consistently achieves the highest individual power and collective achievement"}.
                {civicVirtue > 0.6 ? " High civic virtue dramatically amplifies democracy's structural advantage, confirming Spinoza's view that participation itself builds the capacities needed for self-governance." : ""}
                {infoAccess > 0.6 ? " Information access multiplies democratic outcomes because rational deliberation requires shared knowledge." : ""}
                {" "}Legitimacy is not declared — it is demonstrated through these observable consequences.
              </p>
            </div>
          )}
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(6,95,70,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? ACCENT : "rgba(6,95,70,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? ACCENT_LIGHT : "rgba(6,95,70,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(6,95,70,0.08)", border: "1px solid rgba(6,95,70,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0c1820cc",
          border: "1px solid #1a2838",
          borderLeft: `4px solid #0284C7`,
          borderRadius: 10,
          padding: "24px 28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#38BDF8", textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>The Difficulty</div>
          <p style={{ margin: "0 0 14px 0", fontSize: 15, lineHeight: 1.8, color: "#d4d0c4" }}>
            If democracy is the most legitimate form of government because it distributes power most broadly and transforms citizens through participation, then a new and urgent question arises: the simulation makes clear that democracy's advantage depends heavily on civic virtue and information access — but these are not naturally given. They must be cultivated. How do individuals develop the rational and moral capacities needed for effective democratic participation? What role does education play in producing the kind of citizens that democracy requires to produce its legitimacy-granting consequences?
          </p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#8a9aaa", fontStyle: "italic" }}>
            This pressure forces the next development: an account of moral and intellectual formation — how education, social institutions, and the practice of reason itself can cultivate citizens capable of sustaining the democratic conditions on which Spinoza's political theory depends.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0b1810cc",
          border: "1px solid #1a2e24",
          borderRadius: 10,
          overflow: "hidden"
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 24px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: 3, color: ACCENT_LIGHT, textTransform: "uppercase", fontWeight: "bold" }}>Real-World Echoes</div>
            {echosOpen ? <ChevronUp size={18} color={ACCENT_LIGHT} /> : <ChevronDown size={18} color={ACCENT_LIGHT} />}
          </div>
          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: `1px solid #1a2e24` }}>
              <p style={{ fontSize: 14, color: "#8a9888", lineHeight: 1.7, margin: "16px 0 20px 0" }}>
                Spinoza's consequentialist theory of political legitimacy finds striking resonance in contemporary democratic experiments and debates about the nature of political authority.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    title: "Participatory Budgeting & Citizens' Assemblies",
                    text: "Contemporary experiments in Porto Alegre, Ireland's constitutional convention, and citizen climate assemblies worldwide enact Spinoza's insight: giving citizens direct control over resources and decisions both produces better outcomes and builds the civic capacities that make further participation possible. Legitimacy and capacity grow together."
                  },
                  {
                    title: "Monarchical Power Concentration",
                    text: "The simulation captures something real: concentrated power creates incentive structures misaligned with the common good. A monarch's rational interest diverges from citizens' flourishing — the historical record of absolute monarchies, and contemporary authoritarian states, confirms that power concentrated without accountability systematically underperforms at enhancing collective capacity."
                  },
                  {
                    title: "Majoritarianism and the Democratic Challenge",
                    text: "Spinoza recognized that democracy is not simply majority rule — that would be tyranny of numbers. The cultivation of civic virtue, represented in the simulation's slider, is the difference between a democracy that genuinely enhances collective rationality and one that merely aggregates poorly-informed preferences. Contemporary polarization and disinformation crises are precisely the degradation of the civic virtue parameter."
                  }
                ].map((item, i) => (
                  <div key={i} style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    borderRadius: "0 6px 6px 0",
                    background: `${ACCENT}0a`,
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#b8b0a8" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "#3a4a40" }}>
          Part 14 of 21 — Spinoza's Comprehensive Philosophical System
        </div>
      </div>
    </div>
  );
}

// ─── Part 15: Education and the Transformation of Society ───
function EducationTransformationSociety() {
  const [socialDials, setSocialDials] = useState({
    economicEquality: 40,
    politicalParticipation: 35,
    culturalOpportunity: 30,
  });
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeClassroom, setActiveClassroom] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredDial, setHoveredDial] = useState(null);

  const socialAvg = Math.round(
    (socialDials.economicEquality + socialDials.politicalParticipation + socialDials.culturalOpportunity) / 3
  );

  const leftBrightness = Math.max(20, Math.round(20 + socialAvg * 0.3));
  const rightBrightness = Math.max(40, Math.round(40 + socialAvg * 0.55));

  const concepts = [
    { id: "transformation", label: "Educational Transformation", desc: "Education is not information transfer but a fundamental reshaping of consciousness — moving the learner from passive reception to active rational engagement with the world." },
    { id: "imagination", label: "Imagination to Reason", desc: "Spinoza's three levels of knowledge map onto pedagogical stages: from confused imaginative dependency on authority, through rational systematic understanding, toward intuitive wisdom." },
    { id: "facilitative", label: "Facilitative Teaching", desc: "The teacher's role is not to deposit knowledge but to arrange conditions so that students discover principles through guided inquiry, fostering intellectual independence." },
    { id: "social", label: "Social Conditions for Learning", desc: "Educational institutions embedded in unequal, oppressive societies inevitably reproduce those conditions. Reform of schooling and reform of society must proceed together." },
    { id: "democracy", label: "Democracy and Education", desc: "Democratic governance requires citizens capable of rational deliberation. Education that cultivates reason is therefore not merely personal enrichment but a political necessity." },
  ];

  const dialLabels = {
    economicEquality: "Economic Equality",
    politicalParticipation: "Political Participation",
    culturalOpportunity: "Cultural Opportunity",
  };

  function getStudentGlow(brightness) {
    const b = brightness / 100;
    const r = Math.round(30 + b * 200);
    const g = Math.round(30 + b * 180);
    const b2 = Math.round(80 + b * 120);
    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b2.toString(16).padStart(2,"0")}`;
  }

  function hexOpacity(hex, opacity) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    const alpha = Math.round(opacity * 255).toString(16).padStart(2,"0");
    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}${alpha}`;
  }

  const leftStudentColor = getStudentGlow(leftBrightness);
  const rightStudentColor = getStudentGlow(rightBrightness);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #0f2060 0%, #060612 70%)",
      fontFamily: "Georgia, serif",
      color: "#e8e8f0",
      padding: "32px 24px",
    }}>

      {/* HEADER */}
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto 28px auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#1D4ED8", textTransform: "uppercase", marginBottom: 8 }}>
          Part 15 of 21 — Spinoza's Philosophical System
        </div>
        <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", margin: "0 0 8px 0", color: "#f0f0ff", lineHeight: 1.3 }}>
          Education and the Transformation of Society
        </h1>
        <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#9090b8", margin: 0, lineHeight: 1.6 }}>
          Genuine education is a fundamental transformation of consciousness — not information transfer — that cannot succeed without concurrent social reform.
        </p>
      </div>

      {/* PROBLEM PANEL */}
      <div style={{
        maxWidth: "min(90vw, 860px)", margin: "0 auto 28px auto",
        background: "#0a0a1a",
        border: "1px solid #1a1a30",
        borderLeft: "4px solid #1D4ED8",
        borderRadius: 8,
        padding: "20px 24px",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#1D4ED8", textTransform: "uppercase", marginBottom: 10 }}>
          The Problem
        </div>
        <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.7, color: "#c8c8e8" }}>
          The analysis of democratic participation established that citizens need rational and moral capacities for effective governance — but how are these capacities developed, and what institutional forms support their cultivation? The democratic ideal presses urgently against this gap: we can articulate what citizens must become, but the mechanism of that becoming remains unspecified.
        </p>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto 28px auto" }}>

        {/* CLASSROOM COMPARISON */}
        <div style={{
          background: "#080814",
          border: "1px solid #1a1a2e",
          borderRadius: 10,
          padding: "24px",
          marginBottom: 20,
        }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#1D4ED8", textTransform: "uppercase", marginBottom: 4 }}>
              Two Models of Education
            </div>
            <p style={{ fontSize: 13, color: "#7070a0", margin: 0 }}>
              Click a classroom to explore it. Adjust the social dials below to see how context transforms both.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>

            {/* LEFT CLASSROOM — Imagination Level */}
            <div
              onClick={() => setActiveClassroom(activeClassroom === "left" ? null : "left")}
              style={{
                flex: 1,
                background: activeClassroom === "left" ? "#0d1020" : "#0a0a16",
                border: `1px solid ${activeClassroom === "left" ? "#1D4ED8" : "#1a1a28"}`,
                borderRadius: 8,
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 12, color: "#6060a0", letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>
                Imagination Level
              </div>

              {/* SVG Classroom Left */}
              <svg width="100%" viewBox="0 0 220 160" style={{ display: "block", marginBottom: 12 }}>
                {/* Background */}
                <rect width="220" height="160" fill={`#0a0${leftBrightness < 40 ? "a" : "d"}16`} rx="4"/>

                {/* Teacher — authoritative, central, lit */}
                <ellipse cx="110" cy="30" rx="16" ry="18" fill="#3a4060"/>
                <circle cx="110" cy="18" r="9" fill="#4a5075"/>
                {/* Teacher glow */}
                <circle cx="110" cy="30" r="22" fill="none" stroke="#5060a0" strokeWidth="1" opacity="0.5"/>

                {/* "Knowledge" block above teacher */}
                <rect x="85" y="2" width="50" height="12" rx="3" fill="#1D4ED8" opacity="0.7"/>
                <text x="110" y="12" textAnchor="middle" fontSize="7" fill="#ffffff" fontFamily="Georgia,serif">Fixed Knowledge</text>

                {/* One-way arrows from teacher to students */}
                <line x1="85" y1="45" x2="45" y2="80" stroke="#4060a0" strokeWidth="1.5" markerEnd="url(#arrowL1)"/>
                <line x1="105" y1="50" x2="85" y2="80" stroke="#4060a0" strokeWidth="1.5" markerEnd="url(#arrowL1)"/>
                <line x1="115" y1="50" x2="135" y2="80" stroke="#4060a0" strokeWidth="1.5" markerEnd="url(#arrowL1)"/>
                <line x1="135" y1="45" x2="175" y2="80" stroke="#4060a0" strokeWidth="1.5" markerEnd="url(#arrowL1)"/>

                {/* Students — dim */}
                {[[40,100],[80,100],[130,100],[170,100]].map(([x,y],i) => (
                  <g key={i}>
                    <ellipse cx={x} cy={y+10} rx="11" ry="13" fill={leftStudentColor} opacity="0.5"/>
                    <circle cx={x} cy={y} r="7" fill={leftStudentColor} opacity="0.6"/>
                  </g>
                ))}

                {/* "Passive reception" labels */}
                <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#5050a0" fontFamily="Georgia,serif">
                  Passive Reception
                </text>

                <defs>
                  <marker id="arrowL1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#4060a0"/>
                  </marker>
                </defs>
              </svg>

              <p style={{ fontSize: 12, color: "#6060a0", margin: 0, lineHeight: 1.6 }}>
                The teacher transmits fixed information downward. Students receive passively. Knowledge flows one way, consciousness remains imaginatively dependent.
              </p>

              {activeClassroom === "left" && (
                <div style={{ marginTop: 12, borderTop: "1px solid #1a1a30", paddingTop: 12 }}>
                  <p style={{ fontSize: 12, color: "#8888b0", margin: 0, lineHeight: 1.7 }}>
                    At the imaginative level, learners accept authoritative pronouncements without understanding their grounds. Education becomes conditioning rather than liberation. The student can recite but not reason, repeat but not discover.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT CLASSROOM — Reason Level */}
            <div
              onClick={() => setActiveClassroom(activeClassroom === "right" ? null : "right")}
              style={{
                flex: 1,
                background: activeClassroom === "right" ? "#0d1628" : "#0a0c16",
                border: `1px solid ${activeClassroom === "right" ? "#1D4ED8" : "#1a1e28"}`,
                borderRadius: 8,
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 12, color: "#4080c0", letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>
                Reason Level
              </div>

              {/* SVG Classroom Right */}
              <svg width="100%" viewBox="0 0 220 160" style={{ display: "block", marginBottom: 12 }}>
                <rect width="220" height="160" fill="#0a0d1a" rx="4"/>

                {/* Teacher — facilitator, off-center */}
                <ellipse cx="30" cy="80" rx="14" ry="16" fill="#1a3060"/>
                <circle cx="30" cy="68" r="8" fill="#2a4080"/>
                {/* Teacher softer glow */}
                <circle cx="30" cy="80" r="20" fill="none" stroke="#1D4ED8" strokeWidth="1" opacity="0.4"/>

                {/* Students — brighter, arranged in circle */}
                {[[100,30],[160,55],[180,110],[110,140],[55,130]].map(([x,y],i) => {
                  const brightness2 = rightBrightness / 100;
                  return (
                    <g key={i}>
                      {/* glow halo */}
                      <circle cx={x} cy={y} r={10 + brightness2*8} fill={rightStudentColor} opacity={0.08 + brightness2*0.12}/>
                      <ellipse cx={x} cy={y+8} rx="11" ry="13" fill={rightStudentColor} opacity={0.5 + brightness2*0.3}/>
                      <circle cx={x} cy={y} r="7" fill={rightStudentColor} opacity={0.7 + brightness2*0.2}/>
                    </g>
                  );
                })}

                {/* Multi-directional arrows between students */}
                <line x1="100" y1="45" x2="160" y2="60" stroke="#2a6fd0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.7"/>
                <line x1="160" y1="70" x2="170" y2="105" stroke="#2a6fd0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.7"/>
                <line x1="165" y1="115" x2="120" y2="136" stroke="#2a6fd0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.7"/>
                <line x1="95" y1="138" x2="65" y2="132" stroke="#2a6fd0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.7"/>
                <line x1="60" y1="120" x2="95" y2="45" stroke="#2a6fd0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.5"/>
                {/* Teacher to students */}
                <line x1="45" y1="72" x2="92" y2="38" stroke="#1D4ED8" strokeWidth="1.2" markerEnd="url(#arrowR1)" opacity="0.6"/>
                <line x1="45" y1="80" x2="65" y2="125" stroke="#1D4ED8" strokeWidth="1.2" markerEnd="url(#arrowR1)" opacity="0.6"/>
                {/* Student back to teacher */}
                <line x1="65" y1="122" x2="42" y2="88" stroke="#4a90e0" strokeWidth="1" markerEnd="url(#arrowR1)" opacity="0.4"/>

                <text x="110" y="158" textAnchor="middle" fontSize="8" fill="#4080b0" fontFamily="Georgia,serif">
                  Guided Inquiry
                </text>

                <defs>
                  <marker id="arrowR1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#2a6fd0"/>
                  </marker>
                </defs>
              </svg>

              <p style={{ fontSize: 12, color: "#4080a0", margin: 0, lineHeight: 1.6 }}>
                The teacher facilitates inquiry from the margins. Knowledge flows multidirectionally. Students glow brighter as they discover principles through collaborative investigation.
              </p>

              {activeClassroom === "right" && (
                <div style={{ marginTop: 12, borderTop: "1px solid #1a2030", paddingTop: 12 }}>
                  <p style={{ fontSize: 12, color: "#6090c0", margin: 0, lineHeight: 1.7 }}>
                    At the rational level, students grasp causes and connections for themselves. The teacher arranges problems, not answers. Intellectual independence and moral courage grow together — this is education as consciousness transformation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SOCIAL CONTEXT DIALS */}
        <div style={{
          background: "#080814",
          border: "1px solid #1a1a2e",
          borderRadius: 10,
          padding: "24px",
        }}>
          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#1D4ED8", textTransform: "uppercase", marginBottom: 4 }}>
              Social Context Variables
            </div>
            <p style={{ fontSize: 13, color: "#6060a0", margin: "0 0 18px 0" }}>
              Adjust these conditions. Watch both classrooms transform — education cannot succeed in social isolation.
            </p>
          </div>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {Object.entries(dialLabels).map(([key, label]) => (
              <div
                key={key}
                onMouseEnter={() => setHoveredDial(key)}
                onMouseLeave={() => setHoveredDial(null)}
                style={{ flex: "1 1 180px", minWidth: 160 }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", marginBottom: 6,
                  fontSize: 12, color: hoveredDial === key ? "#7aafff" : "#6060a0",
                  transition: "color 0.2s",
                }}>
                  <span>{label}</span>
                  <span style={{ color: "#1D4ED8", fontWeight: "bold" }}>{socialDials[key]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={socialDials[key]}
                  onChange={e => setSocialDials(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    accentColor: "#1D4ED8",
                    height: 4,
                  }}
                />
                {hoveredDial === key && (
                  <div style={{ fontSize: 11, color: "#4060a0", marginTop: 4, lineHeight: 1.5 }}>
                    {key === "economicEquality" && "Material security frees cognitive resources for genuine learning rather than survival anxiety."}
                    {key === "politicalParticipation" && "Political agency gives meaning and motivation to rational development — learners see their capacities matter."}
                    {key === "culturalOpportunity" && "Access to cultural resources and diverse perspectives feeds the inquiry that reason requires."}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Overall indicator */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 20,
              background: socialAvg < 40 ? "#1a0a08" : socialAvg < 70 ? "#0d1428" : "#081428",
              border: `1px solid ${socialAvg < 40 ? "#4a1a10" : socialAvg < 70 ? "#1D4ED8" : "#2a6fd0"}`,
              fontSize: 13,
              color: socialAvg < 40 ? "#a06050" : socialAvg < 70 ? "#6090c0" : "#70c0ff",
            }}>
              {socialAvg < 40 && "Oppressive conditions — both classrooms struggle to achieve transformation"}
              {socialAvg >= 40 && socialAvg < 70 && "Partial conditions — some transformation possible, deep reform still needed"}
              {socialAvg >= 70 && "Favorable conditions — educational transformation becomes genuinely possible"}
            </div>
          </div>
        </div>

        {/* CORE ARGUMENT PROSE */}
        <div style={{
          background: "#080814",
          border: "1px solid #1a1a2e",
          borderRadius: 10,
          padding: "24px",
          marginTop: 20,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#1D4ED8", textTransform: "uppercase", marginBottom: 12 }}>
            The Core Argument
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b0b0cc", margin: "0 0 12px 0" }}>
            Education's purpose is not information accumulation but the progressive transformation of consciousness from imaginative dependency to rational independence and ultimately to intuitive wisdom. The three knowledge levels Spinoza identifies are not merely epistemological categories — they describe stages of human development that effective pedagogy must navigate.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b0b0cc", margin: "0 0 12px 0" }}>
            Effective teaching requires creating environments where students discover principles through guided investigation rather than accepting authoritative pronouncements. This is the difference between a teacher as repository and a teacher as facilitator — the first produces dependence, the second cultivates the intellectual independence and moral courage that both personal flourishing and democratic citizenship require.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b0b0cc", margin: 0 }}>
            Crucially, this transformation cannot occur in a social vacuum. Educational institutions embedded in unequal, oppressive societies inevitably reproduce those inequalities regardless of individual teachers' intentions. The social context dials above demonstrate Spinoza's insistence: educational reform and social reform are not sequential but simultaneous necessities.
          </p>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto 28px auto" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(29,78,216,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1D4ED8", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#1D4ED8" : "rgba(29,78,216,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#60a5fa" : "rgba(29,78,216,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7aafff",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#1D4ED8", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DIFFICULTY PANEL */}
      <div style={{
        maxWidth: "min(90vw, 860px)", margin: "0 auto 28px auto",
        background: "#0a0a1a",
        border: "1px solid #1a1a30",
        borderLeft: "4px solid #2a3a7a",
        borderRadius: 8,
        padding: "20px 24px",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#4a6aaa", textTransform: "uppercase", marginBottom: 10 }}>
          The Difficulty
        </div>
        <p style={{ margin: "0 0 12px 0", fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.7, color: "#b0b0cc" }}>
          Even with adequate education and social conditions — even with citizens capable of rational deliberation and institutions that nurture rather than suppress growth — human beings still face suffering, conflict, and harm from other finite beings. Education can transform consciousness, but it cannot abolish finitude or eliminate the ways in which limited beings collide with one another in a causally determined world.
        </p>
        <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.7, color: "#7070a0", fontStyle: "italic" }}>
          This pressure forces the next development: Spinoza must account for the existence and meaning of evil and suffering within his rigorously naturalistic framework, confronting whether a world fully explained by necessary causes leaves room for genuine harm or whether "evil" is itself a perspectival category awaiting rational dissolution.
        </p>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>
        <div
          onClick={() => setEchosOpen(!echosOpen)}
          style={{
            background: "#080814",
            border: "1px solid #1a1a2e",
            borderRadius: echosOpen ? "8px 8px 0 0" : 8,
            padding: "16px 24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#1D4ED8", textTransform: "uppercase" }}>
            Real-World Echoes
          </div>
          {echosOpen
            ? <ChevronUp size={16} color="#1D4ED8"/>
            : <ChevronDown size={16} color="#1D4ED8"/>
          }
        </div>

        {echosOpen && (
          <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #1D4ED833" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
              {[
                {
                  title: "Teachers as Facilitators",
                  body: "The progressive education tradition, from Dewey's learning by doing through Freire's pedagogy of the oppressed, echoes Spinoza's vision of the teacher as one who arranges conditions for discovery rather than depositing knowledge into passive recipients. Problem-based learning and Socratic method are institutional instantiations of this Spinozist insight."
                },
                {
                  title: "Economic Inequality and Educational Reproduction",
                  body: "Sociologists from Bourdieu to contemporary researchers document how educational institutions in unequal societies systematically reproduce inequality — through differential resources, cultural capital, and the hidden curriculum of behavioral expectations. This is Spinoza's warning made empirically measurable: you cannot reform education without reforming the social conditions in which it operates."
                },
                {
                  title: "Democracy's Dependence on Educated Citizens",
                  body: "Contemporary democracy faces the question Spinoza identified: a citizenry that has not developed rational critical capacities becomes vulnerable to manipulation, demagoguery, and the politics of fear. Civic education debates — from media literacy to critical thinking requirements — are arguments about what Spinozist rational transformation looks like at democratic scale."
                },
              ].map((item, i) => (
                <div key={i} style={{
                  borderLeft: "3px solid #1D4ED8",
                  borderRadius: "0 6px 6px 0",
                  background: "#1D4ED80a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, color: "#7aafff", fontWeight: "bold", marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", margin: 0, lineHeight: 1.7 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Part 16: Evil, Suffering, and the Limits of Finite Existence ───
function ProblemOfEvilSuffering() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const wisdomRef = useRef(0);
  const institutionsRef = useRef(0);
  const explosionsRef = useRef([]);
  const channelsRef = useRef([]);

  const [wisdom, setWisdom] = useState(0);
  const [institutions, setInstitutions] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [stats, setStats] = useState({ collisions: 0, harmony: 0 });
  const statsRef = useRef({ collisions: 0, harmony: 0 });

  const concepts = [
    { id: "relational_evil", label: "Relational Evil", desc: "Nothing is evil in itself — evil exists only in relation to a being whose nature it contradicts. The predator is not evil; only from the prey's perspective does 'evil' arise." },
    { id: "passive_desires", label: "Passive Desires", desc: "Suffering emerges when we are driven by passions we do not understand. We become enslaved to desires for things outside our control, generating inevitable disappointment." },
    { id: "finite_existence", label: "Finite Existence", desc: "Because all finite beings strive to persevere, collisions are structurally inevitable. Complete elimination of suffering is impossible — but its reduction is the work of wisdom." },
    { id: "social_conditions", label: "Social Conditions", desc: "Economic inequality and structural injustice generate incentives for mutual exploitation, amplifying the suffering that inadequate understanding already produces." },
    { id: "structural_reform", label: "Structural Reform", desc: "Better institutions channel individual strivings toward mutual benefit. They do not eliminate conatus — they redirect it so trajectories align rather than collide." },
    { id: "wisdom_remedy", label: "Wisdom as Remedy", desc: "Adequate understanding of how our striving affects others transforms passive affects into active ones. The wise person reduces harmful collisions not by suppressing desire, but by seeing truly." },
  ];

  wisdomRef.current = wisdom;
  institutionsRef.current = institutions;

  const initParticles = useCallback((canvas) => {
    const N = 22;
    const particles = [];
    for (let i = 0; i < N; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.0;
      particles.push({
        x: 60 + Math.random() * (canvas.width - 120),
        y: 60 + Math.random() * (canvas.height - 120),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 7 + Math.random() * 5,
        baseColor: `#${Math.floor(140 + Math.random() * 80).toString(16)}${Math.floor(80 + Math.random() * 60).toString(16)}${Math.floor(20 + Math.random() * 40).toString(16)}`,
        hue: Math.random(),
        phase: Math.random() * Math.PI * 2,
        id: i,
      });
    }
    particlesRef.current = particles;
    explosionsRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    initParticles({ width: canvas.offsetWidth, height: canvas.offsetHeight });

    let collisionCount = 0;
    let harmonyCount = 0;
    let frameCount = 0;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const w = wisdomRef.current / 100;
      const inst = institutionsRef.current / 100;

      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
      bg.addColorStop(0, "#1a0d06");
      bg.addColorStop(1, "#070508");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Draw channels when institutions > 0
      const numChannels = Math.floor(inst * 4);
      channelsRef.current = [];
      if (numChannels > 0) {
        for (let c = 0; c < numChannels; c++) {
          const cx = (W / (numChannels + 1)) * (c + 1);
          const channelW = 28 + inst * 20;
          channelsRef.current.push({ x: cx, w: channelW });
          const grad = ctx.createLinearGradient(cx - channelW / 2, 0, cx + channelW / 2, 0);
          grad.addColorStop(0, "rgba(120, 53, 15, 0.0)");
          grad.addColorStop(0.5, `rgba(120, 53, 15, ${0.06 + inst * 0.10})`);
          grad.addColorStop(1, "rgba(120, 53, 15, 0.0)");
          ctx.fillStyle = grad;
          ctx.fillRect(cx - channelW / 2, 0, channelW, H);
          ctx.strokeStyle = `rgba(200, 120, 40, ${0.12 + inst * 0.15})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.beginPath();
          ctx.moveTo(cx, 0);
          ctx.lineTo(cx, H);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Update + draw particles
      const particles = particlesRef.current;
      frameCount++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Channel attraction
        if (channelsRef.current.length > 0) {
          let nearestDist = Infinity;
          let nearestX = p.x;
          for (const ch of channelsRef.current) {
            const d = Math.abs(p.x - ch.x);
            if (d < nearestDist) { nearestDist = d; nearestX = ch.x; }
          }
          const pull = inst * 0.018;
          p.vx += (nearestX - p.x) * pull * 0.01;
        }

        // Wisdom: particles become aware of each other and deflect gently
        if (w > 0.05) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const awareness = (p.radius + q.radius) * (2 + w * 5);
            if (dist < awareness && dist > 0) {
              const force = (w * 0.012) / dist;
              p.vx -= dx * force;
              p.vy -= dy * force;
              q.vx += dx * force;
              q.vy += dy * force;
            }
          }
        }

        // Speed damping with wisdom
        const maxSpeed = 1.8 - w * 1.0;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        if (speed < 0.2 && w < 0.3) {
          p.vx += (Math.random() - 0.5) * 0.15;
          p.vy += (Math.random() - 0.5) * 0.15;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        // Bounce walls
        if (p.x < p.radius) { p.x = p.radius; p.vx = Math.abs(p.vx); }
        if (p.x > W - p.radius) { p.x = W - p.radius; p.vx = -Math.abs(p.vx); }
        if (p.y < p.radius) { p.y = p.radius; p.vy = Math.abs(p.vy); }
        if (p.y > H - p.radius) { p.y = H - p.radius; p.vy = -Math.abs(p.vy); }

        // Collision detection
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < p.radius + q.radius) {
            // Collision!
            const nx = dx / dist;
            const ny = dy / dist;
            const relVx = p.vx - q.vx;
            const relVy = p.vy - q.vy;
            const dot = relVx * nx + relVy * ny;
            p.vx -= dot * nx;
            p.vy -= dot * ny;
            q.vx += dot * nx;
            q.vy += dot * ny;
            // Separate
            const overlap = (p.radius + q.radius - dist) / 2;
            p.x -= nx * overlap;
            p.y -= ny * overlap;
            q.x += nx * overlap;
            q.y += ny * overlap;

            // Explosion based on wisdom level
            const severity = 1 - w;
            if (severity > 0.1 && frameCount % 2 === 0) {
              explosionsRef.current.push({
                x: (p.x + q.x) / 2,
                y: (p.y + q.y) / 2,
                life: 1.0,
                maxLife: 1.0,
                severity: severity,
                particles: Array.from({ length: Math.floor(4 + severity * 8) }, () => ({
                  dx: (Math.random() - 0.5) * (2 + severity * 3),
                  dy: (Math.random() - 0.5) * (2 + severity * 3),
                  x: 0, y: 0,
                })),
              });
              collisionCount++;
              statsRef.current.collisions = collisionCount;
            }
            if (w > 0.5) harmonyCount++;
          }
        }

        // Draw particle
        const r = p.radius;
        const glowAlpha = 0.3 + Math.sin(p.phase) * 0.1;
        const wisdomGlow = w * 0.6;

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
        if (w < 0.4) {
          glow.addColorStop(0, `rgba(200, 80, 20, ${glowAlpha * (1 - w)})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
        } else {
          glow.addColorStop(0, `rgba(180, 140, 40, ${wisdomGlow * 0.4})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        const core = ctx.createRadialGradient(p.x - r * 0.3, p.y - r * 0.3, r * 0.1, p.x, p.y, r);
        if (w < 0.5) {
          core.addColorStop(0, "#e07030");
          core.addColorStop(0.6, "#a04010");
          core.addColorStop(1, "#501808");
        } else {
          core.addColorStop(0, "#e8c060");
          core.addColorStop(0.6, "#c09030");
          core.addColorStop(1, "#785010");
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
        ctx.strokeStyle = w > 0.5 ? `rgba(255,200,80,${0.4 + w * 0.3})` : `rgba(255,100,30,${0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw + update explosions
      const newExplosions = [];
      for (const ex of explosionsRef.current) {
        ex.life -= 0.045;
        if (ex.life > 0) {
          newExplosions.push(ex);
          const alpha = ex.life / ex.maxLife;
          for (const ep of ex.particles) {
            ep.x += ep.dx;
            ep.y += ep.dy;
            ctx.beginPath();
            ctx.arc(ex.x + ep.x, ex.y + ep.y, 2 * alpha * ex.severity, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, ${Math.floor(50 + (1 - ex.severity) * 150)}, 20, ${alpha * 0.8})`;
            ctx.fill();
          }
          // Ring
          const ring = Math.max(0, (1 - ex.life / ex.maxLife));
          ctx.beginPath();
          ctx.arc(ex.x, ex.y, ring * 18 * ex.severity, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 80, 20, ${alpha * 0.6 * ex.severity})`;
          ctx.lineWidth = 2 * ex.severity;
          ctx.stroke();
        }
      }
      explosionsRef.current = newExplosions;

      // Harmony lines when wisdom is high
      if (w > 0.5) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p = particles[i];
            const q = particles[j];
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 80 + w * 60;
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (w - 0.5) * 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(200, 160, 60, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // HUD labels
      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "rgba(200, 160, 100, 0.55)";
      ctx.fillText(`conatus collisions: ${statsRef.current.collisions}`, 12, H - 12);
      if (w > 0.5) {
        ctx.fillStyle = "rgba(220, 190, 80, 0.6)";
        ctx.fillText("wisdom active: trajectories aligning", W / 2 - 90, 20);
      }
      if (inst > 0.5) {
        ctx.fillStyle = "rgba(200, 140, 60, 0.5)";
        ctx.fillText("institutions: channels shaping flow", W - 200, 20);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "radial-gradient(ellipse at 40% 30%, #2a1005 0%, #120804 40%, #0a0508 100%)",
      minHeight: "100vh",
      padding: "40px 24px",
      color: "#d4b896",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 12, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#78350F", textTransform: "uppercase", marginBottom: 6 }}>Part 16 of 21</div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 26px)", fontWeight: "normal", color: "#e8c896", margin: "0 0 8px", letterSpacing: 0.5 }}>Evil, Suffering, and the Limits of Finite Existence</h1>
          <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", color: "#a08060", lineHeight: 1.6, margin: 0 }}>
            Spinoza reframes evil not as an absolute metaphysical category but as the natural collision of finite beings with conflicting interests, reducible through greater wisdom and better social organization.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(10, 5, 2, 0.7)",
          border: "1px solid rgba(120, 53, 15, 0.3)",
          borderLeft: "4px solid #78350F",
          borderRadius: 6,
          padding: "20px 24px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#78350F", marginBottom: 10 }}>The Problem</div>
          <p style={{ margin: 0, lineHeight: 1.75, fontSize: "clamp(13px, 1.6vw, 14px)", color: "#c4a07a" }}>
            The analysis of education and social conditions raised the question of whether, even with ideal institutions and education, the reality of suffering and harm can be adequately addressed within a naturalistic framework. Can a philosophy that denies a transcendent moral order — that sees no cosmic arbiter distinguishing good from evil — still take suffering seriously, and offer something more than resignation in the face of it? The urgency is real: if nature is indifferent and evil is everywhere, does philosophy merely teach us to endure?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(8, 4, 2, 0.85)",
          border: "1px solid rgba(120, 53, 15, 0.25)",
          borderRadius: 8,
          padding: "24px",
          marginBottom: 24,
        }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: "normal", color: "#e0b870", margin: "0 0 6px" }}>
              The Particle World of Conatus
            </h2>
            <p style={{ fontSize: 13, color: "#907050", lineHeight: 1.6, margin: 0 }}>
              Each particle strives to persevere in its being — blind, purposeful, unstoppable. Without understanding, trajectories collide and suffering ignites. Adjust the levers below to see how wisdom and institutions transform the same underlying drives.
            </p>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 6,
              border: "1px solid rgba(120, 53, 15, 0.2)",
              display: "block",
            }}
          />

          {/* Controls */}
          <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#c09050", letterSpacing: 1 }}>WISDOM</span>
                <span style={{ fontSize: 12, color: "#e0b050" }}>{wisdom}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={wisdom}
                onChange={(e) => { setWisdom(Number(e.target.value)); wisdomRef.current = Number(e.target.value); }}
                style={{ width: "100%", cursor: "pointer", accentColor: "#c07030" }}
              />
              <p style={{ fontSize: 11, color: "#705030", margin: "4px 0 0", lineHeight: 1.5 }}>
                {wisdom < 20 ? "Blind striving — collisions are frequent and severe." :
                  wisdom < 50 ? "Growing awareness — agents begin to deflect rather than collide." :
                    wisdom < 80 ? "Adequate understanding — trajectories align, suffering diminishes." :
                      "High wisdom — golden threads of harmony connect the striving agents."}
              </p>
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#c09050", letterSpacing: 1 }}>SOCIAL INSTITUTIONS</span>
                <span style={{ fontSize: 12, color: "#e0b050" }}>{institutions}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={institutions}
                onChange={(e) => { setInstitutions(Number(e.target.value)); institutionsRef.current = Number(e.target.value); }}
                style={{ width: "100%", cursor: "pointer", accentColor: "#78350F" }}
              />
              <p style={{ fontSize: 11, color: "#705030", margin: "4px 0 0", lineHeight: 1.5 }}>
                {institutions < 20 ? "No channels — each agent finds its own path, often destructive." :
                  institutions < 50 ? "Nascent structures — faint channels begin to shape flow." :
                    institutions < 80 ? "Reformed institutions — trajectories increasingly guided into alignment." :
                      "Strong institutions — flows channeled, structural conflict greatly reduced."}
              </p>
            </div>
          </div>

          {/* Core Argument prose */}
          <div style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(20, 10, 4, 0.7)",
            borderRadius: 6,
            border: "1px solid rgba(120, 53, 15, 0.15)",
          }}>
            <p style={{ fontSize: 13, color: "#b09070", lineHeight: 1.78, margin: 0 }}>
              Nothing is evil in itself — only in relation to beings whose nature it contradicts. The predator is simply striving; it becomes the locus of 'evil' only from the prey's vantage. Human suffering arises primarily from the gap between desires and the power to satisfy them, compounded by attachments to things outside our control. Much of this suffering could be significantly reduced through greater wisdom and better social institutions — yet the complete elimination of suffering remains impossible, given the irreducible nature of finite existence.
            </p>
          </div>
        </div>

        {/* Evil as Relational: SVG diagram */}
        <div style={{
          background: "rgba(8, 4, 2, 0.75)",
          border: "1px solid rgba(120, 53, 15, 0.2)",
          borderRadius: 8,
          padding: "24px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#78350F", marginBottom: 14 }}>Evil as Relational — Not Metaphysical</div>
          <svg viewBox="0 0 700 180" style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Predator */}
            <circle cx={100} cy={90} r={38} fill="#3a1506" stroke="#78350F" strokeWidth={1.5} />
            <text x={100} y={84} textAnchor="middle" fill="#e0a050" fontSize={12} fontFamily="Georgia, serif">Predator</text>
            <text x={100} y={100} textAnchor="middle" fill="#a06030" fontSize={10} fontFamily="Georgia, serif">striving to</text>
            <text x={100} y={114} textAnchor="middle" fill="#a06030" fontSize={10} fontFamily="Georgia, serif">persevere</text>

            {/* Prey */}
            <circle cx={280} cy={90} r={38} fill="#1a0804" stroke="#c05020" strokeWidth={1.5} />
            <text x={280} y={84} textAnchor="middle" fill="#e08050" fontSize={12} fontFamily="Georgia, serif">Prey</text>
            <text x={280} y={100} textAnchor="middle" fill="#a06030" fontSize={10} fontFamily="Georgia, serif">also striving</text>
            <text x={280} y={114} textAnchor="middle" fill="#a06030" fontSize={10} fontFamily="Georgia, serif">to persevere</text>

            {/* Arrow */}
            <defs>
              <marker id="arrowRed" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#c04020" />
              </marker>
            </defs>
            <line x1={140} y1={90} x2={238} y2={90} stroke="#c04020" strokeWidth={2} markerEnd="url(#arrowRed)" strokeDasharray="5,3" />
            <text x={190} y={80} textAnchor="middle" fill="#c04020" fontSize={11} fontFamily="Georgia, serif">collision</text>

            {/* Perspective boxes */}
            <rect x={380} y={30} width={140} height={55} rx={4} fill="#1a0a03" stroke="rgba(120,53,15,0.4)" strokeWidth={1} />
            <text x={450} y={52} textAnchor="middle" fill="#c09050" fontSize={11} fontFamily="Georgia, serif">From predator's view:</text>
            <text x={450} y={70} textAnchor="middle" fill="#e0a040" fontSize={12} fontFamily="Georgia, serif" fontStyle="italic">neutral necessity</text>

            <rect x={540} y={100} width={145} height={55} rx={4} fill="#1a0403" stroke="rgba(200,50,20,0.4)" strokeWidth={1} />
            <text x={612} y={122} textAnchor="middle" fill="#d07050" fontSize={11} fontFamily="Georgia, serif">From prey's view:</text>
            <text x={612} y={140} textAnchor="middle" fill="#e05030" fontSize={12} fontFamily="Georgia, serif" fontStyle="italic">"evil"</text>

            <line x1={370} y1={57} x2={325} y2={80} stroke="rgba(120,53,15,0.4)" strokeWidth={1} strokeDasharray="3,4" />
            <line x1={540} y1={127} x2={318} y2={100} stroke="rgba(200,50,20,0.3)" strokeWidth={1} strokeDasharray="3,4" />

            <text x={350} y={170} textAnchor="middle" fill="#604030" fontSize={11} fontFamily="Georgia, serif" fontStyle="italic">"Evil" names a relational asymmetry, not an intrinsic property of nature.</text>
          </svg>
        </div>

        {/* KEY CONCEPTS */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(120,53,15,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#78350F", marginBottom: 14 }}>Key Concepts — Click to Explore</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredConcept === c.id ? "#78350F" : "rgba(120,53,15,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#b45309" : "rgba(120,53,15,0.35)"}`,
                  borderRadius: 20, fontSize: 12, cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#e0a050", transition: "all 0.2s" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(120,53,15,0.08)", border: "1px solid rgba(120,53,15,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#78350F", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(10, 5, 2, 0.7)",
          border: "1px solid rgba(100, 40, 10, 0.3)",
          borderLeft: "4px solid #5c2308",
          borderRadius: 6,
          padding: "20px 24px",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#5c2308", marginBottom: 10 }}>The Difficulty</div>
          <p style={{ margin: "0 0 12px", lineHeight: 1.75, fontSize: 14, color: "#b09070" }}>
            If suffering arises partly from finite existence itself and partly from inadequate understanding, and if higher knowledge transforms our relationship to temporality and finitude, then what happens to the self at the highest levels of knowledge? Is there any sense in which something in human beings transcends temporal dissolution? Spinoza's solution converts the problem of evil from theology into practice — but it opens a new abyss: the question of whether the wise person, having seen sub specie aeternitatis, relates to their own death and dissolution in a fundamentally different way than the unwise.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#78350F", fontStyle: "italic", lineHeight: 1.6 }}>
            This pressure forces the next development: an inquiry into what the highest knowledge reveals about the eternity of the mind and the relationship between individual existence and infinite substance.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "rgba(8, 4, 2, 0.7)",
          border: "1px solid rgba(120, 53, 15, 0.2)",
          borderRadius: 6,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#c09060",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#78350F" }}>Real-World Echoes</span>
            {echosOpen ? <ChevronUp size={16} color="#78350F" /> : <ChevronDown size={16} color="#78350F" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    title: "Predator-Prey Relationships",
                    body: "A wolf killing a deer is not acting from malice — it is expressing its own conatus. 'Evil' enters only from the deer's perspective, or from a human observer imposing a moral frame. The collision is real; the metaphysical judgment is our addition."
                  },
                  {
                    title: "Economic Inequality and Structural Exploitation",
                    body: "When institutions reward short-term extraction over long-term cooperation, rational actors are structurally incentivized to harm each other. This is not individual wickedness but the logic of a badly organized system — exactly what Spinoza means by institutional failure amplifying the suffering that inadequate understanding produces."
                  },
                  {
                    title: "Addiction and Depression as Passive Affect",
                    body: "Addiction cycles are paradigmatic passive affects: desires that grow stronger with satisfaction, driven by inadequate understanding of their own dynamics. The addict strives — genuinely, urgently — for something that diminishes their power to strive. Depression often involves similar loops of passive imagination. Understanding the mechanism does not instantly dissolve it, but it is the beginning of transformation."
                  }
                ].map((ex, i) => (
                  <div key={i} style={{
                    padding: "16px 18px",
                    background: "rgba(20, 10, 4, 0.6)",
                    border: "1px solid rgba(120, 53, 15, 0.15)",
                    borderRadius: 5,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#e0a050", marginBottom: 8 }}>{ex.title}</div>
                    <p style={{ fontSize: 13, color: "#a08060", lineHeight: 1.7, margin: 0 }}>{ex.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 17: Eternity and the Mind's Immortality ───
function EternityMindsImmortality() {
  const [isEchoesOpen, setIsEchoesOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('living'); // 'living', 'death', 'afterdeath'
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [timePosition, setTimePosition] = useState(0); // 0 to 1
  const [isAnimating, setIsAnimating] = useState(false);
  const [latticeNodes, setLatticeNodes] = useState([]);
  const [sparks, setSparks] = useState([]);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);
  const phaseRef = useRef('living');

  const concepts = [
    { id: 'duration', label: 'Duration', color: '#f59e0b', desc: 'The temporal sequence of finite modes — birth, growth, memory, desire, aging, death. All finite things exist in duration.' },
    { id: 'eternity', label: 'Sub Specie Aeternitatis', color: '#5B21B6', desc: 'Under the aspect of eternity — seeing things as necessary expressions of infinite substance, outside time entirely.' },
    { id: 'adequate', label: 'Adequate Knowledge', color: '#06b6d4', desc: 'Ideas whose validity does not depend on when they are thought. Mathematical and logical truths that hold eternally.' },
    { id: 'intellect', label: 'Intellectual Love of God', color: '#10b981', desc: 'The mind\'s highest satisfaction: understanding its own participation in the eternal intellectual activity of infinite substance.' },
    { id: 'impersonal', label: 'Impersonal Immortality', color: '#e879f9', desc: 'Not the survival of personal memories or desires, but the mind\'s genuine participation in eternal truths that transcend the individual.' },
  ];

  const latticeDefinitions = [
    { id: 'math1', x: 0.5, y: 0.3, label: '2+2=4', type: 'math', threshold: 0.15 },
    { id: 'math2', x: 0.35, y: 0.45, label: 'Pythagorean theorem', type: 'math', threshold: 0.25 },
    { id: 'math3', x: 0.65, y: 0.45, label: 'Prime numbers infinite', type: 'math', threshold: 0.35 },
    { id: 'logic1', x: 0.5, y: 0.55, label: 'A→B, A ∴ B', type: 'logic', threshold: 0.45 },
    { id: 'logic2', x: 0.3, y: 0.6, label: 'Excluded middle', type: 'logic', threshold: 0.5 },
    { id: 'logic3', x: 0.7, y: 0.6, label: 'Non-contradiction', type: 'logic', threshold: 0.55 },
    { id: 'intuit1', x: 0.5, y: 0.7, label: 'Substance is one', type: 'intuition', threshold: 0.65 },
    { id: 'intuit2', x: 0.38, y: 0.75, label: 'All things in God', type: 'intuition', threshold: 0.72 },
    { id: 'intuit3', x: 0.62, y: 0.75, label: 'Mind = idea of body', type: 'intuition', threshold: 0.78 },
    { id: 'intuit4', x: 0.5, y: 0.85, label: 'Blessedness = understanding', type: 'intuition', threshold: 0.88 },
  ];

  const nodeTypeColors = { math: '#06b6d4', logic: '#e879f9', intuition: '#5B21B6' };

  const getActiveNodes = (pos) => latticeDefinitions.filter(n => n.threshold <= pos);

  useEffect(() => {
    setLatticeNodes(getActiveNodes(timePosition));
  }, [timePosition]);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationPhase('living');
    phaseRef.current = 'living';
    timeRef.current = 0;
    setTimePosition(0);
    setSparks([]);

    const startTime = performance.now();
    const totalDuration = 6000;

    const step = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / totalDuration, 1);
      timeRef.current = raw;

      if (raw < 0.85) {
        setTimePosition(raw / 0.85);
        setAnimationPhase('living');
        phaseRef.current = 'living';
        if (Math.random() < 0.08) {
          const angle = Math.random() * Math.PI * 2;
          const newSpark = {
            id: Math.random(),
            x: 0.3 + Math.random() * 0.4,
            y: 0.15 + Math.random() * 0.3,
            vx: Math.cos(angle) * 0.002,
            vy: Math.sin(angle) * 0.002 - 0.001,
            life: 1,
            color: ['#f59e0b', '#fb923c', '#f87171', '#a78bfa'][Math.floor(Math.random() * 4)],
          };
          setSparks(prev => [...prev.slice(-25), newSpark]);
        }
      } else if (raw < 0.92) {
        setAnimationPhase('death');
        phaseRef.current = 'death';
        setTimePosition(1);
      } else {
        setAnimationPhase('afterdeath');
        phaseRef.current = 'afterdeath';
        setTimePosition(1);
      }

      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        setAnimationPhase('afterdeath');
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  useEffect(() => {
    if (sparks.length === 0) return;
    const timeout = setTimeout(() => {
      setSparks(prev => prev.map(s => ({ ...s, life: s.life - 0.05 })).filter(s => s.life > 0));
    }, 50);
    return () => clearTimeout(timeout);
  }, [sparks]);

  const activeNodes = getActiveNodes(timePosition);

  const getLifecycleX = (pos) => 0.05 + pos * 0.9;
  const lifeY = 0.25;

  const outerFade = animationPhase === 'death' ? 0.4 : animationPhase === 'afterdeath' ? 0.08 : 1;
  const innerGlow = animationPhase === 'afterdeath' ? 1.4 : animationPhase === 'death' ? 1.1 : 1;

  const svgW = 700;
  const svgH = 480;

  const getLatticeNodePos = (node) => ({
    cx: node.x * svgW,
    cy: node.y * svgH,
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #2d1065 0%, #1a0a3d 30%, #0a0a0f 100%)',
      fontFamily: 'Georgia, serif',
      color: '#e2d9f3',
      padding: '0',
    }}>

      {/* Header + Problem */}
      <div style={{
        maxWidth: 'min(90vw, 860px)',
        margin: '0 auto',
        padding: '40px 32px 0 32px',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#7c3aed', textTransform: 'uppercase', marginBottom: '10px' }}>
            Part 17 of 21
          </div>
          <h1 style={{ margin: '0 0 10px 0', fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 'normal', color: '#f5f0ff', letterSpacing: '0.5px' }}>
            Eternity and the Mind's Immortality
          </h1>
          <p style={{ margin: '0 auto', fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#9d85c4', lineHeight: '1.6', maxWidth: 'min(100%, 600px)' }}>
            Spinoza offers a naturalistic account of mental eternity — not personal survival after death but the mind's progressive participation in eternal truths.
          </p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: 'rgba(15,10,30,0.85)',
          border: '1px solid #2a1a5e',
          borderLeft: '4px solid #5B21B6',
          borderRadius: '8px',
          padding: '28px 32px',
          marginBottom: '32px',
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#7c3aed',
            fontFamily: 'Georgia, serif',
            marginBottom: '14px',
            fontWeight: 'bold',
          }}>The Problem</div>
          <p style={{
            margin: 0,
            lineHeight: '1.75',
            fontSize: 'clamp(13px, 1.8vw, 15px)',
            color: '#c4b5fd',
            fontStyle: 'italic',
          }}>
            The account of evil and finite suffering raised the question of whether something in human beings can transcend temporal dissolution — particularly for those who have cultivated the highest forms of knowledge. Can minds that have glimpsed eternal truth simply vanish into nothing? The problem presses with urgency: if everything finite perishes, does understanding itself perish with it?
          </p>
        </div>
      </div>

      {/* Main Visualization */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          background: 'rgba(10,8,25,0.9)',
          border: '1px solid #2a1a5e',
          borderRadius: '12px',
          padding: '28px',
          marginBottom: '24px',
        }}>

          {/* SVG Visualization */}
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              style={{ width: '100%', maxWidth: '700px', display: 'block', margin: '0 auto' }}
            >
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#1a0a3d" stopOpacity="1" />
                  <stop offset="100%" stopColor="#050510" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="latticeGlow" cx="50%" cy="70%">
                  <stop offset="0%" stopColor={`#5B21B6`} stopOpacity={0.35 * innerGlow} />
                  <stop offset="60%" stopColor="#2d1065" stopOpacity={0.15 * innerGlow} />
                  <stop offset="100%" stopColor="#050510" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width={svgW} height={svgH} fill="url(#bgGrad)" rx="8" />

              {/* Duration track background */}
              <ellipse
                cx={svgW * 0.5}
                cy={svgH * 0.22}
                rx={svgW * 0.42}
                ry={svgH * 0.13}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity={outerFade * 0.5}
              />

              {/* Duration label */}
              <text
                x={svgW * 0.5}
                y={svgH * 0.06}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="13"
                fontFamily="Georgia, serif"
                letterSpacing="3"
                opacity={outerFade}
              >
                DURATION
              </text>

              {/* Timeline line */}
              <line
                x1={svgW * 0.08}
                y1={svgH * lifeY}
                x2={svgW * 0.92}
                y2={svgH * lifeY}
                stroke="#f59e0b"
                strokeWidth="2"
                opacity={outerFade * 0.6}
              />

              {/* Birth marker */}
              <circle cx={svgW * 0.08} cy={svgH * lifeY} r="5" fill="#f59e0b" opacity={outerFade * 0.8} />
              <text x={svgW * 0.08} y={svgH * lifeY - 12} textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="Georgia, serif" opacity={outerFade}>Birth</text>

              {/* Death marker */}
              <circle cx={svgW * 0.92} cy={svgH * lifeY} r="5" fill={animationPhase === 'afterdeath' ? '#666' : '#fb923c'} opacity={outerFade * 0.8} />
              <text x={svgW * 0.92} y={svgH * lifeY - 12} textAnchor="middle" fill={animationPhase === 'afterdeath' ? '#666' : '#fb923c'} fontSize="10" fontFamily="Georgia, serif" opacity={outerFade}>Death</text>

              {/* Life milestones */}
              {[
                { pos: 0.2, label: 'Memory' },
                { pos: 0.45, label: 'Desire' },
                { pos: 0.7, label: 'Aging' },
              ].map(m => (
                <g key={m.label}>
                  <circle
                    cx={svgW * (0.08 + m.pos * 0.84)}
                    cy={svgH * lifeY}
                    r="4"
                    fill="#f59e0b"
                    opacity={timePosition > m.pos ? outerFade * 0.7 : 0.15}
                  />
                  <text
                    x={svgW * (0.08 + m.pos * 0.84)}
                    y={svgH * lifeY + 16}
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="9"
                    fontFamily="Georgia, serif"
                    opacity={timePosition > m.pos ? outerFade * 0.6 : 0.1}
                  >
                    {m.label}
                  </text>
                </g>
              ))}

              {/* Current life position indicator */}
              {animationPhase !== 'afterdeath' && (
                <g>
                  <circle
                    cx={svgW * getLifecycleX(timePosition)}
                    cy={svgH * lifeY}
                    r="8"
                    fill="#fff"
                    opacity={outerFade * 0.9}
                    filter="url(#glow)"
                  />
                  <text
                    x={svgW * getLifecycleX(timePosition)}
                    y={svgH * lifeY - 18}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontFamily="Georgia, serif"
                    opacity={outerFade * 0.7}
                  >
                    mind
                  </text>
                </g>
              )}

              {/* Sparks (memories/desires) */}
              {sparks.map(spark => (
                <circle
                  key={spark.id}
                  cx={svgW * (spark.x + (1 - spark.life) * spark.vx * 30)}
                  cy={svgH * (spark.y + (1 - spark.life) * spark.vy * 30)}
                  r={3 * spark.life}
                  fill={spark.color}
                  opacity={spark.life * outerFade * 0.8}
                  filter="url(#glow)"
                />
              ))}

              {/* Eternity zone glow */}
              <ellipse
                cx={svgW * 0.5}
                cy={svgH * 0.65}
                rx={svgW * 0.38}
                ry={svgH * 0.28}
                fill="url(#latticeGlow)"
              />

              {/* Eternity label */}
              <text
                x={svgW * 0.5}
                y={svgH * 0.46}
                textAnchor="middle"
                fill="#7c3aed"
                fontSize="11"
                fontFamily="Georgia, serif"
                letterSpacing="3"
                opacity={0.8 * innerGlow}
              >
                ETERNITY
              </text>
              <text
                x={svgW * 0.5}
                y={svgH * 0.49}
                textAnchor="middle"
                fill="#5B21B6"
                fontSize="9"
                fontFamily="Georgia, serif"
                letterSpacing="2"
                fontStyle="italic"
                opacity={0.6 * innerGlow}
              >
                sub specie aeternitatis
              </text>

              {/* Lattice connections */}
              {activeNodes.length > 1 && activeNodes.map((node, i) => {
                return activeNodes.slice(i + 1).map(other => {
                  const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
                  if (dist > 0.28) return null;
                  const pos1 = getLatticeNodePos(node);
                  const pos2 = getLatticeNodePos(other);
                  return (
                    <line
                      key={`${node.id}-${other.id}`}
                      x1={pos1.cx}
                      y1={pos1.cy}
                      x2={pos2.cx}
                      y2={pos2.cy}
                      stroke="#5B21B6"
                      strokeWidth="1"
                      opacity={0.3 * innerGlow}
                    />
                  );
                });
              })}

              {/* Lattice nodes */}
              {latticeDefinitions.map(node => {
                const { cx, cy } = getLatticeNodePos(node);
                const isActive = activeNodes.some(n => n.id === node.id);
                const nodeColor = nodeTypeColors[node.type];
                const isHovered = hoveredNode === node.id;
                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 12 : 8}
                      fill={isActive ? nodeColor : '#1a1035'}
                      stroke={isActive ? nodeColor : '#2a1a5e'}
                      strokeWidth={isActive ? 2 : 1}
                      opacity={isActive ? (animationPhase === 'afterdeath' ? 1 * innerGlow : 0.9) : 0.3}
                      filter={isActive && animationPhase === 'afterdeath' ? 'url(#softGlow)' : isActive ? 'url(#glow)' : 'none'}
                      style={{ transition: 'all 0.4s' }}
                    />
                    {isActive && (
                      <text
                        x={cx}
                        y={cy - 14}
                        textAnchor="middle"
                        fill={nodeColor}
                        fontSize="8"
                        fontFamily="Georgia, serif"
                        opacity={isHovered ? 1 : 0.7}
                      >
                        {node.label}
                      </text>
                    )}
                    {!isActive && (
                      <circle cx={cx} cy={cy} r="3" fill="#2a1a5e" opacity="0.4" />
                    )}
                  </g>
                );
              })}

              {/* After death: duration ring fades, lattice pulses */}
              {animationPhase === 'afterdeath' && (
                <>
                  <ellipse
                    cx={svgW * 0.5}
                    cy={svgH * 0.65}
                    rx={svgW * 0.35}
                    ry={svgH * 0.25}
                    fill="none"
                    stroke="#5B21B6"
                    strokeWidth="2"
                    opacity="0.4"
                    strokeDasharray="4 3"
                    filter="url(#glow)"
                  />
                  <text
                    x={svgW * 0.5}
                    y={svgH * 0.96}
                    textAnchor="middle"
                    fill="#a78bfa"
                    fontSize="11"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    opacity="0.85"
                  >
                    The outer life fades. The lattice of understanding remains.
                  </text>
                </>
              )}

              {/* Connecting arrows from life to lattice */}
              {activeNodes.map((node, idx) => {
                if (idx % 3 !== 0) return null;
                const { cx, cy } = getLatticeNodePos(node);
                const lifeXpos = svgW * (0.08 + node.threshold * 0.84);
                return (
                  <line
                    key={`arrow-${node.id}`}
                    x1={lifeXpos}
                    y1={svgH * lifeY + 10}
                    x2={cx}
                    y2={cy - 10}
                    stroke={nodeTypeColors[node.type]}
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    opacity={outerFade * 0.3}
                  />
                );
              })}

              {/* Legend */}
              {[
                { type: 'math', label: 'Mathematical' },
                { type: 'logic', label: 'Logical' },
                { type: 'intuition', label: 'Intuitive' },
              ].map((item, i) => (
                <g key={item.type}>
                  <circle
                    cx={svgW * 0.08 + i * 100}
                    cy={svgH * 0.93}
                    r="5"
                    fill={nodeTypeColors[item.type]}
                    opacity="0.8"
                  />
                  <text
                    x={svgW * 0.08 + i * 100 + 10}
                    y={svgH * 0.93 + 4}
                    fill={nodeTypeColors[item.type]}
                    fontSize="9"
                    fontFamily="Georgia, serif"
                    opacity="0.7"
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Controls */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {!isAnimating && animationPhase !== 'afterdeath' && (
                <button
                  onClick={runAnimation}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a78bfa'; }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #5B21B6',
                    borderRadius: '6px',
                    padding: '10px 28px',
                    color: '#a78bfa',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    letterSpacing: '0.5px',
                  }}
                >
                  Animate a Life's Understanding
                </button>
              )}
              {animationPhase === 'afterdeath' && !isAnimating && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#a78bfa', fontSize: '13px', fontStyle: 'italic', marginBottom: '12px' }}>
                    {activeNodes.length} eternal truths remain — the mind's genuine contribution to eternity.
                  </p>
                  <button
                    onClick={() => { setAnimationPhase('living'); setTimePosition(0); setSparks([]); }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#2d1065'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #2d1065',
                      borderRadius: '6px',
                      padding: '8px 20px',
                      color: '#6d4fa0',
                      cursor: 'pointer',
                      fontFamily: 'Georgia, serif',
                      fontSize: '12px',
                      transition: 'all 0.2s',
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}
              {isAnimating && (
                <p style={{ color: '#7c3aed', fontSize: '12px', fontStyle: 'italic' }}>
                  Watching a mind move through duration, adding nodes to eternity...
                </p>
              )}

              {/* Manual timeline scrubber */}
              {!isAnimating && animationPhase !== 'afterdeath' && (
                <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <label style={{ color: '#7c3aed', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Or explore manually
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(timePosition * 100)}
                    onChange={e => setTimePosition(Number(e.target.value) / 100)}
                    style={{ width: '100%', accentColor: '#5B21B6', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: '10px', color: '#6d4fa0' }}>Birth</span>
                    <span style={{ fontSize: '10px', color: '#a78bfa' }}>
                      {activeNodes.length} eternal truths grasped
                    </span>
                    <span style={{ fontSize: '10px', color: '#6d4fa0' }}>Death</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prose explanation */}
          <div style={{
            marginTop: '28px',
            borderTop: '1px solid #1a1040',
            paddingTop: '24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}>
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid #f59e0b22', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#f59e0b', marginBottom: '10px', textTransform: 'uppercase' }}>Duration</div>
              <p style={{ margin: 0, fontSize: '13px', color: '#c4a86a', lineHeight: '1.7' }}>
                The outer ring of human existence: the span from birth to death, populated by memories, desires, and passing experiences. These are real but impermanent — they will not survive the dissolution of the body.
              </p>
            </div>
            <div style={{ background: 'rgba(91,33,182,0.08)', border: '1px solid #5B21B622', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#7c3aed', marginBottom: '10px', textTransform: 'uppercase' }}>Eternity</div>
              <p style={{ margin: 0, fontSize: '13px', color: '#a78bfa', lineHeight: '1.7' }}>
                The inner lattice: mathematical, logical, and intuitive truths whose validity does not depend on when they are thought. Each adequate idea is a node in this structure — eternal, impersonal, permanent participation in the activity of infinite substance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 'min(90vw, 860px)', margin: '0 auto 24px auto', padding: '0 32px' }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(91,33,182,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#5B21B6', marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: '6px 14px',
                  background: hoveredConcept === c.id ? '#5B21B6' : 'rgba(91,33,182,0.1)',
                  border: `1px solid ${hoveredConcept === c.id ? '#a78bfa' : 'rgba(91,33,182,0.35)'}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: hoveredConcept === c.id ? '#f0ead8' : '#a78bfa',
                  transition: 'all 0.2s',
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: 'rgba(91,33,182,0.08)', border: '1px solid rgba(91,33,182,0.3)', borderRadius: 6, padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5B21B6', marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#c8c0b4' }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty Panel */}
      <div style={{ maxWidth: 'min(90vw, 860px)', margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          background: 'rgba(15,10,30,0.85)',
          border: '1px solid #1e1255',
          borderLeft: '4px solid #7c3aed',
          borderRadius: '8px',
          padding: '28px 32px',
          marginBottom: '24px',
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#7c3aed',
            marginBottom: '14px',
            fontWeight: 'bold',
          }}>The Difficulty</div>
          <p style={{ margin: '0 0 14px 0', lineHeight: '1.75', fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#b8a8d8' }}>
            If eternity is achieved through the development of adequate knowledge expressed in a geometric philosophical system, then what exactly justifies and explains the choice of geometric demonstration as the method of philosophy — and what does this method accomplish that other forms of philosophical presentation cannot?
          </p>
          <p style={{ margin: 0, lineHeight: '1.75', fontSize: 'clamp(13px, 1.6vw, 14px)', color: '#7c6a9e', fontStyle: 'italic' }}>
            The achievement of mental eternity through adequate ideas raises an urgent methodological question: the geometric form of the Ethics is not merely decorative but essential — yet Spinoza has not yet fully explained why axiomatic demonstration uniquely captures eternal truth rather than obscuring it. This pressure forces the next development, where the method itself becomes the final subject of philosophical inquiry.
          </p>
        </div>
      </div>

      {/* Real-World Echoes */}
      <div style={{ maxWidth: 'min(90vw, 860px)', margin: '0 auto', padding: '0 32px 40px 32px' }}>
        <div style={{
          background: 'rgba(15,10,30,0.85)',
          border: '1px solid #1e1255',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setIsEchoesOpen(!isEchoesOpen)}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(91,33,182,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: '20px 28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <span style={{
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#7c3aed',
              fontFamily: 'Georgia, serif',
              fontWeight: 'bold',
            }}>Real-World Echoes</span>
            {isEchoesOpen
              ? <ChevronUp size={16} color="#5B21B6" />
              : <ChevronDown size={16} color="#5B21B6" />
            }
          </button>
          {isEchoesOpen && (
            <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #5B21B633' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: 'Mathematical Truths as Timeless',
                    body: 'When Euler proved his identity e^(iπ) + 1 = 0, he did not create a truth that will expire. The thought, once genuinely understood, participates in something that was true before he lived and will remain true after all human civilization ends. This is the Spinozistic kernel of mental eternity: the thinking of eternal thoughts.',
                  },
                  {
                    title: 'Personal Memories and Desires as Durational',
                    body: 'Our anxieties about legacy, our fears of being forgotten, our desires to be remembered — these are all durational. They belong to the outer ring. A person who dies peacefully, having spent their life in genuine understanding rather than the accumulation of reputation and memory, exemplifies Spinoza\'s ideal.',
                  },
                  {
                    title: 'Intellectual Love as Unconditional Satisfaction',
                    body: 'The mathematician or scientist who finds deep joy in understanding — not from external praise but from the act of comprehension itself — already lives the intellectual love of God. This satisfaction is independent of whether one is remembered, rewarded, or even whether one\'s work is known to others.',
                  },
                ].map(item => (
                  <div key={item.title} style={{
                    borderLeft: '3px solid #5B21B6',
                    borderRadius: '0 6px 6px 0',
                    background: '#5B21B60a',
                    padding: '14px 18px',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a78bfa', marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Part 18: The Geometric Method and Philosophical Demonstration ───
function GeometricMethodDemonstration() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mode, setMode] = useState('geometric');
  const [echosOpen, setEchosOpen] = useState(false);
  const [illuminatedNodes, setIlluminatedNodes] = useState(new Set());
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const sec18Concepts = [
    { id: "geometric_form", label: "Geometric Form", desc: "The method of presenting philosophy as definitions, axioms, and propositions with formal proofs — borrowed from Euclid's Elements. For Spinoza, this form is not stylistic choice but embodies a philosophical claim: truth is necessary, not contingent, and admits the same certainty as mathematical demonstration." },
    { id: "defs_axioms", label: "Definitions & Axioms", desc: "The foundation of the geometric method. Definitions specify exactly what concept is under discussion; axioms state what is self-evident to any rational mind. From these, nothing arbitrary can enter — every conclusion flows necessarily from starting points. The Ethics opens with seven definitions and seven axioms from which everything else follows." },
    { id: "logical_necessity", label: "Logical Necessity", desc: "The crucial property Spinoza seeks: conclusions that could not be otherwise if the premises are accepted. Unlike arguments that conclude 'it is likely,' geometric conclusions carry the force 'it must be so.' This necessity mirrors the necessity Spinoza finds in nature — nothing in God/Nature could have been different." },
    { id: "eliminates_rhetoric", label: "Eliminates Rhetoric", desc: "By demonstrating rather than persuading, the geometric method removes the personal authority of the philosopher from the equation. A valid proof is valid regardless of who states it. Spinoza wanted philosophical truth to be as impersonal and universal as mathematical truth — compelling to any rational mind." },
    { id: "systematic_unity_18", label: "Systematic Unity", desc: "The geometric structure makes the interdependence of Spinoza's claims explicit and traceable. Every proposition references the earlier ones it depends on. This is not mere formalism but expresses the philosophical claim that the system's parts genuinely support each other — the visualization above shows these dependency threads." },
    { id: "philosophical_certainty", label: "Philosophical Certainty", desc: "Spinoza's goal is knowledge of the highest certainty — intuitive science that grasps singular things through their place in the infinite whole. The geometric method is the public vehicle for this certainty: any rational reader tracing the proofs can arrive at the same understanding, independent of culture or temperament." },
  ];

  const nodes = {
    // Definitions
    d1: { id: 'd1', type: 'definition', label: 'Def. 1', full: 'Self-caused (causa sui)', x: 60, y: 520, deps: [] },
    d2: { id: 'd2', type: 'definition', label: 'Def. 2', full: 'Finite in its kind', x: 160, y: 520, deps: [] },
    d3: { id: 'd3', type: 'definition', label: 'Def. 3', full: 'Substance', x: 260, y: 520, deps: [] },
    d4: { id: 'd4', type: 'definition', label: 'Def. 4', full: 'Attribute', x: 360, y: 520, deps: [] },
    d5: { id: 'd5', type: 'definition', label: 'Def. 5', full: 'Mode', x: 460, y: 520, deps: [] },
    d6: { id: 'd6', type: 'definition', label: 'Def. 6', full: 'God (infinite substance)', x: 560, y: 520, deps: [] },
    // Axioms
    a1: { id: 'a1', type: 'axiom', label: 'Ax. 1', full: 'Everything exists in itself or in another', x: 110, y: 440, deps: [] },
    a2: { id: 'a2', type: 'axiom', label: 'Ax. 2', full: 'What cannot be conceived through another must be conceived through itself', x: 260, y: 440, deps: [] },
    a3: { id: 'a3', type: 'axiom', label: 'Ax. 3', full: 'From a given cause an effect necessarily follows', x: 410, y: 440, deps: [] },
    a4: { id: 'a4', type: 'axiom', label: 'Ax. 4', full: 'Knowledge of an effect depends on knowledge of the cause', x: 560, y: 440, deps: [] },
    // Propositions
    p1: { id: 'p1', type: 'proposition', label: 'P1', full: 'Substance is prior in nature to its affections', x: 160, y: 350, deps: ['d3', 'd5', 'a1'] },
    p2: { id: 'p2', type: 'proposition', label: 'P2', full: 'Two substances with different attributes have nothing in common', x: 360, y: 350, deps: ['d3', 'd4', 'a2'] },
    p3: { id: 'p3', type: 'proposition', label: 'P3', full: 'Substances with nothing in common cannot cause one another', x: 560, y: 350, deps: ['p2', 'a3', 'a4'] },
    p4: { id: 'p4', type: 'proposition', label: 'P4', full: 'Two or more distinct things differ by attributes or modes', x: 260, y: 260, deps: ['d3', 'd4', 'p1', 'p2'] },
    p5: { id: 'p5', type: 'proposition', label: 'P5', full: 'There cannot be two substances with the same attribute', x: 460, y: 260, deps: ['d3', 'd4', 'p1', 'p4'] },
    p6: { id: 'p6', type: 'proposition', label: 'P6', full: 'One substance cannot produce another substance', x: 360, y: 170, deps: ['p2', 'p3', 'p5'] },
    p7: { id: 'p7', type: 'proposition', label: 'P7', full: 'Existence belongs to the nature of substance', x: 200, y: 170, deps: ['d1', 'p1', 'p6', 'a2'] },
    p11: { id: 'p11', type: 'proposition', label: 'P11', full: 'God necessarily exists', x: 310, y: 80, deps: ['d6', 'p7', 'a1', 'a3'] },
  };

  const rhetoricalText = {
    d1: "When we speak of something that is 'self-caused,' we mean an entity whose essence necessarily involves existence — a thing that could not fail to be, given what it is.",
    d3: "By 'substance,' Spinoza means what ancient philosophers glimpsed but never clearly formulated: a thing that requires nothing outside itself to exist or be understood.",
    p7: "Here we arrive at one of Spinoza's most striking claims. Substance, by its very nature, cannot fail to exist. This is not a matter of contingency or divine will — it follows with the same iron necessity as any theorem from its axioms.",
    p11: "The conclusion crowns the argument: God — defined as infinite substance with infinite attributes — necessarily exists. Not as a matter of faith, not as the conclusion of an argument from design, but as a logical consequence visible to any mind that traces the reasoning carefully.",
  };

  const allEdges = [];
  Object.values(nodes).forEach(node => {
    node.deps.forEach(depId => {
      allEdges.push({ from: depId, to: node.id });
    });
  });

  const getNodeColor = (node) => {
    if (node.type === 'definition') return '#1e3a5f';
    if (node.type === 'axiom') return '#1a3a2a';
    return '#2d1b3d';
  };

  const getNodeBorder = (node) => {
    if (node.type === 'definition') return '#4a90d9';
    if (node.type === 'axiom') return '#4caf7d';
    return '#9b7fd4';
  };

  const getNodeGlow = (node) => {
    if (node.type === 'definition') return '#4a90d9';
    if (node.type === 'axiom') return '#4caf7d';
    return '#9b7fd4';
  };

  const getDependencyTree = (nodeId, visited = new Set()) => {
    if (visited.has(nodeId)) return visited;
    visited.add(nodeId);
    const node = nodes[nodeId];
    if (node) {
      node.deps.forEach(depId => getDependencyTree(depId, visited));
    }
    return visited;
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null);
      setIlluminatedNodes(new Set());
    } else {
      setSelectedNode(nodeId);
      const tree = getDependencyTree(nodeId);
      setIlluminatedNodes(tree);
    }
  };

  const isIlluminated = (nodeId) => {
    if (selectedNode === null) return false;
    return illuminatedNodes.has(nodeId);
  };

  const isEdgeIlluminated = (edge) => {
    if (selectedNode === null) return false;
    return illuminatedNodes.has(edge.from) && illuminatedNodes.has(edge.to);
  };

  const nodeRadius = 24;

  return (
    <div style={{
      background: 'radial-gradient(ellipse at center, #1a1f2e 0%, #0a0a0f 100%)',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#e8e4dc',
      padding: '40px 32px',
    }}><div style={{ maxWidth: 'min(90vw, 900px)', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>
          Part 18 of 21 — Spinoza's System
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 'normal', color: '#f0ece4', margin: '0 0 8px 0' }}>
          The Geometric Method and Philosophical Demonstration
        </h1>
        <p style={{ fontSize: 'clamp(13px, 1.8vw, 15px)', color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
          Spinoza writes philosophy as Euclid wrote geometry — in definitions, axioms, propositions, and demonstrations — making the form of argument itself carry philosophical weight.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{
        background: '#111827cc',
        border: '1px solid #374151',
        borderLeft: '4px solid #374151',
        borderRadius: '8px',
        padding: '28px 32px',
        marginBottom: '36px',
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          marginBottom: '14px',
          fontFamily: 'Georgia, serif',
        }}>The Problem</div>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 16px)',
          lineHeight: '1.75',
          color: '#d1cfc9',
          margin: 0,
          fontStyle: 'italic',
        }}>
          The doctrine of mental eternity proposed that adequate knowledge participates in eternal truths — but this raises the question of what methodological form is appropriate for a philosophy that aspires to such certainty. If the mind can grasp necessary truths sub specie aeternitatis, what kind of writing could faithfully carry those truths to another mind without distorting them?
        </p>
      </div>

      {/* Main Visualization */}
      <div style={{
        background: '#0d1117cc',
        border: '1px solid #374151',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '36px',
      }}>
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 'normal',
            color: '#f0ece4',
            margin: '0 0 6px 0',
          }}>The Geometric Method and Philosophical Demonstration</h2>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
          }}>
            Spinoza's decision to present his philosophy in the form of geometric definitions, axioms, and propositions reflects deep convictions about how certainty can be achieved and rhetorical distortion eliminated in philosophy.
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>View as:</span>
          {['geometric', 'rhetorical'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: `1px solid ${mode === m ? '#6b7280' : '#374151'}`,
                background: mode === m ? '#374151' : '#1f2937',
                color: mode === m ? '#f9fafb' : '#9ca3af',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'Georgia, serif',
                transition: 'all 0.2s',
                letterSpacing: '0.04em',
              }}
            >
              {m === 'geometric' ? 'Geometric Mode' : 'Rhetorical Mode'}
            </button>
          ))}
          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
            {mode === 'geometric'
              ? 'Click any node to trace its logical foundations'
              : 'Click highlighted nodes to see rhetorical expansions'}
          </span>
        </div>

        {mode === 'geometric' ? (
          <div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[
                { color: '#4a90d9', label: 'Definition' },
                { color: '#4caf7d', label: 'Axiom' },
                { color: '#9b7fd4', label: 'Proposition' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: item.color + '33',
                    border: `2px solid ${item.color}`,
                  }} />
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{item.label}</span>
                </div>
              ))}
              {selectedNode && (
                <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#fbbf24' }}>
                  Illuminating dependency tree for {nodes[selectedNode]?.label}
                </div>
              )}
            </div>

            {/* SVG Diagram */}
            <div style={{ overflowX: 'auto' }}>
              <svg viewBox="0 0 660 580" width="100%" style={{ display: 'block', margin: '0 auto', maxWidth: 660 }}>
                {/* Edges */}
                {allEdges.map((edge, i) => {
                  const fromNode = nodes[edge.from];
                  const toNode = nodes[edge.to];
                  if (!fromNode || !toNode) return null;
                  const lit = isEdgeIlluminated(edge);
                  const dimmed = selectedNode !== null && !lit;
                  return (
                    <line
                      key={i}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={lit ? '#fbbf24' : '#374151'}
                      strokeWidth={lit ? 2 : 1}
                      strokeOpacity={dimmed ? 0.15 : (lit ? 0.9 : 0.4)}
                      style={{ transition: 'all 0.3s' }}
                    />
                  );
                })}

                {/* Nodes */}
                {Object.values(nodes).map(node => {
                  const lit = isIlluminated(node.id);
                  const isSelected = selectedNode === node.id;
                  const dimmed = selectedNode !== null && !lit;
                  const isHovered = hoveredNode === node.id;
                  const borderColor = getNodeBorder(node);
                  const bgColor = getNodeColor(node);
                  const glowColor = getNodeGlow(node);

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => handleNodeClick(node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {(lit || isSelected || isHovered) && (
                        <circle
                          r={nodeRadius + 8}
                          fill="none"
                          stroke={isSelected ? '#fbbf24' : glowColor}
                          strokeWidth={isSelected ? 2 : 1}
                          strokeOpacity={0.5}
                          style={{ filter: `blur(4px)` }}
                        />
                      )}
                      <circle
                        r={nodeRadius}
                        fill={bgColor}
                        stroke={isSelected ? '#fbbf24' : (lit ? glowColor : borderColor)}
                        strokeWidth={isSelected ? 2.5 : (lit ? 2 : 1.5)}
                        strokeOpacity={dimmed ? 0.2 : 1}
                        fillOpacity={dimmed ? 0.3 : 1}
                        style={{ transition: 'all 0.3s' }}
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontFamily="Georgia, serif"
                        fill={dimmed ? '#4b5563' : (isSelected ? '#fbbf24' : '#e8e4dc')}
                        style={{ transition: 'all 0.3s', pointerEvents: 'none' }}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}

                {/* Layer Labels */}
                <text x="8" y="535" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Definitions</text>
                <text x="8" y="455" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Axioms</text>
                <text x="8" y="365" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Props 1-3</text>
                <text x="8" y="275" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Props 4-5</text>
                <text x="8" y="185" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Props 6-7</text>
                <text x="8" y="95" fontSize="11" fontFamily="Georgia, serif" fill="#4b5563">Prop 11</text>

                {/* Horizontal dividers */}
                {[490, 405, 315, 225, 135].map((y, i) => (
                  <line key={i} x1="80" y1={y} x2="620" y2={y} stroke="#374151" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,4" />
                ))}
              </svg>
            </div>

            {/* Node Detail Panel */}
            {selectedNode && nodes[selectedNode] && (
              <div style={{
                marginTop: '20px',
                background: '#1f2937',
                border: `1px solid ${getNodeBorder(nodes[selectedNode])}`,
                borderRadius: '8px',
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: getNodeBorder(nodes[selectedNode]),
                      marginBottom: '8px',
                    }}>
                      {nodes[selectedNode].type} — {nodes[selectedNode].label}
                    </div>
                    <div style={{ fontSize: '16px', color: '#f0ece4', marginBottom: '10px' }}>
                      {nodes[selectedNode].full}
                    </div>
                    {nodes[selectedNode].deps.length > 0 && (
                      <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                        Depends on: {nodes[selectedNode].deps.map(d => nodes[d]?.label).join(', ')} — highlighted above in yellow.
                      </div>
                    )}
                    {nodes[selectedNode].deps.length === 0 && (
                      <div style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>
                        This is a foundational element — it requires no prior propositions.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setSelectedNode(null); setIlluminatedNodes(new Set()); }}
                    style={{
                      background: 'none',
                      border: '1px solid #374151',
                      color: '#9ca3af',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {!selectedNode && (
              <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
                Click any node to illuminate its full chain of logical dependencies, tracing necessity back to foundations.
              </p>
            )}
          </div>
        ) : (
          /* Rhetorical Mode */
          <div>
            <div style={{
              background: '#111827',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '28px 32px',
              lineHeight: '1.9',
              fontSize: '15px',
              color: '#d1cfc9',
            }}>
              <p style={{ margin: '0 0 18px 0' }}>
                In the beginning, there is a kind of thing — call it substance — that carries its own existence within itself, needing nothing external to account for what it is or why it persists. This is not a modest claim. Most things we encounter depend entirely on other things: a wave requires ocean, a thought requires mind, a fire requires wood. But Spinoza asks us to conceive of something that simply is, without remainder or borrowed support.
              </p>
              <p style={{ margin: '0 0 18px 0' }}>
                Now, two such things — two truly self-sufficient substances — could share nothing in common. For if they shared a nature, they would not be truly independent. And if they share nothing, neither can act upon the other, since causation requires some conceptual bridge between cause and effect. This might seem a dry logical point, but it has a staggering consequence: each substance inhabits a kind of ontological solitude.
              </p>
              <p style={{ margin: '0 0 18px 0' }}>
                From this it follows — with something approaching the inevitability of falling water — that no substance can bring another into existence. Each substance must, in some sense, always have existed. Existence is not an accident that happened to substance; it is what substance is.
              </p>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#9ca3af', borderTop: '1px solid #374151', paddingTop: '16px', fontSize: '13px' }}>
                Notice: the rhetorical version gains warmth and metaphor but loses precision. "Something approaching the inevitability of falling water" is evocative — but is it an argument? Spinoza's geometric form strips this away entirely, preserving only what reason can evaluate.
              </p>
            </div>

            {/* Comparison callout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '20px',
            }}>
              {[
                {
                  title: 'Geometric Mode Gains',
                  points: [
                    'Every step is evaluable on logical merit alone',
                    'Charisma and eloquence cannot distort the argument',
                    'Dependencies are explicit and traceable',
                    'Universal agreement becomes possible among rational readers',
                  ],
                  color: '#4a90d9',
                },
                {
                  title: 'Geometric Mode Loses',
                  points: [
                    'Intuitive metaphors that aid comprehension',
                    'Contextual motivation for each claim',
                    'A sense of the living movement of thought',
                    'Accessibility to non-specialist readers',
                  ],
                  color: '#e07b54',
                },
              ].map(col => (
                <div key={col.title} style={{
                  background: '#111827',
                  border: `1px solid ${col.color}44`,
                  borderTop: `3px solid ${col.color}`,
                  borderRadius: '8px',
                  padding: '18px 20px',
                }}>
                  <div style={{ fontSize: '12px', color: col.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {col.title}
                  </div>
                  {col.points.map((pt, i) => (
                    <p key={i} style={{ fontSize: '13px', color: '#d1cfc9', margin: '0 0 8px 0', lineHeight: '1.6' }}>
                      — {pt}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Key Concepts */}
      <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(75,85,99,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: '#9ca3af', marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: hoveredConcept ? 16 : 0 }}>
          {sec18Concepts.map(c => (
            <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{ padding: '6px 14px', background: hoveredConcept === c.id ? '#4b5563' : 'rgba(75,85,99,0.15)',
                border: `1px solid ${hoveredConcept === c.id ? '#9ca3af' : '#374151'}`,
                borderRadius: 20, fontSize: '12px', cursor: 'pointer',
                color: hoveredConcept === c.id ? '#f0ead8' : '#9ca3af', transition: 'all 0.2s' }}>
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{ background: 'rgba(75,85,99,0.12)', border: '1px solid #374151', borderRadius: 6, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#d1cfc9', marginBottom: 8 }}>
              {sec18Concepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#9ca3af' }}>
              {sec18Concepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
      </div>

      {/* Difficulty Panel */}
      <div style={{
        background: '#111827cc',
        border: '1px solid #4b5563',
        borderLeft: '4px solid #6b7280',
        borderRadius: '8px',
        padding: '28px 32px',
        marginBottom: '24px',
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          marginBottom: '14px',
        }}>The Difficulty</div>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.8',
          color: '#d1cfc9',
          margin: '0 0 16px 0',
        }}>
          While the geometric method embodies Spinoza's epistemological ideals — that truth is necessary, systematic, and accessible to any rational mind — it also erects formidable barriers to the very communication it aims to achieve. The Ethics is one of the most technically demanding texts in all of philosophy; generations of readers have been repelled before reaching its deepest insights. Critics from Hegel onward have argued that the method produces a kind of mechanical externalism, forcing living ideas into a rigid logical scaffolding that obscures rather than reveals their inner movement.
        </p>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.8',
          color: '#d1cfc9',
          margin: 0,
        }}>
          This tension — between rigorous form and communicative reach — has shaped Spinoza's reception across centuries: celebrated by mathematically-minded rationalists, transformed into flowing prose by Romantic readers, and reconstructed in modern analytic idiom by philosophers who keep the arguments but abandon the apparatus. The aspiration to universality through form has produced, paradoxically, a fiercely contested and selectively accessed text. <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>This pressure forces the next development: a reckoning with what it means for a philosophy of liberation to be so difficult to receive.</span>
        </p>
      </div>

      {/* Real-World Echoes */}
      <div style={{
        background: '#111827cc',
        border: '1px solid #374151',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setEchosOpen(!echosOpen)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 28px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            color: '#9ca3af',
          }}
        >
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>Real-World Echoes</span>
          {echosOpen
            ? <ChevronUp size={18} color="#6b7280" />
            : <ChevronDown size={18} color="#6b7280" />}
        </button>

        {echosOpen && (
          <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #37415133' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
              {[
                {
                  title: 'Euclidean Geometry',
                  text: 'Euclid\'s Elements — organizing all of plane geometry from five definitions, five common notions, and five postulates — was Spinoza\'s explicit model. When educated readers opened the Ethics, they immediately recognized the format: this was philosophy claiming the same kind of necessity that makes a triangle\'s angles sum to 180 degrees not a cultural preference but an unavoidable truth of reason.',
                },
                {
                  title: 'The Ethics\'s Dense Logical Fabric',
                  text: 'The Ethics\' five parts contain hundreds of propositions, proofs, and scholiums, each formally linked to earlier ones. Readers encounter arguments like: "PROP. XI. God, or substance, consisting of infinite attributes, each of which expresses eternal and infinite essentiality, necessarily exists. Proof: If this be denied, conceive, if possible, that God does not exist..." The density is not ornamental — it is the substance of the philosophical claim itself.',
                },
                {
                  title: 'Scientific Consensus as Spinoza\'s Ideal',
                  text: 'Spinoza\'s vision of universal agreement among rational investigators has its closest modern parallel in the scientific community. Mathematicians in Beijing and Buenos Aires reach identical conclusions about prime numbers; physicists worldwide converge on the same constants. Spinoza wanted philosophy to achieve exactly this: a domain where cultural background and personal temperament become irrelevant before the force of well-ordered reasoning.',
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  borderLeft: '3px solid #374151',
                  borderRadius: '0 6px 6px 0',
                  background: '#3741510a',
                  padding: '14px 18px',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#d1cfc9', marginBottom: 6 }}>
                    {echo.title}
                  </div>
                  <p style={{ fontSize: 13, color: '#b8b0a8', lineHeight: 1.75, margin: 0 }}>
                    {echo.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div></div>
  );
}

// ─── Part 19: Spinoza's Influence on Later Philosophy ───
function SpinozaInfluenceLaterPhilosophy() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [timeFilter, setTimeFilter] = useState(3);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const domainColors = {
    metaphysics: "#0E7490",
    politics: "#7C3AED",
    psychology: "#B45309",
    ecology: "#065F46",
    theology: "#9D174D",
    source: "#C0A060",
  };

  const eras = [
    { label: "1650–1750", desc: "Immediate Reception" },
    { label: "1750–1850", desc: "German Idealism" },
    { label: "1850–1950", desc: "Critique & Naturalism" },
    { label: "Contemporary", desc: "Revival & Application" },
  ];

  const nodes = [
    {
      id: "spinoza",
      label: "Spinoza",
      year: "1677",
      domain: "source",
      era: 0,
      angle: 0,
      radius: 0,
      bio: "Baruch Spinoza (1632–1677). Excommunicated from the Amsterdam Jewish community at 23, he developed his geometric system in near-total isolation, publishing the Ethics posthumously. His substance monism — one infinite substance with infinite attributes — set the central problem for three centuries of European philosophy.",
    },
    {
      id: "leibniz",
      label: "Leibniz",
      year: "1646–1716",
      domain: "metaphysics",
      era: 0,
      angle: -40,
      radius: 1,
      bio: "G.W. Leibniz (1646–1716). Visited Spinoza in 1676 and later claimed to have disagreed with him — yet his system of pre-established harmony, infinite monads, and conatus owes far more to Spinoza than he admitted. His pluralism was in part an anxious response to Spinozist monism.",
    },
    {
      id: "bayle",
      label: "Bayle",
      year: "1647–1706",
      domain: "theology",
      era: 0,
      angle: 40,
      radius: 1,
      bio: "Pierre Bayle (1647–1706). In his Dictionnaire critique, Bayle devoted a lengthy article to Spinoza, calling his system the most rigorous atheism ever conceived — and paradoxically coherent. By spreading the name 'Spinozism,' Bayle made Spinoza notorious across Europe, inadvertently ensuring that every serious thinker had to reckon with him.",
    },
    {
      id: "fichte",
      label: "Fichte",
      year: "1762–1814",
      domain: "metaphysics",
      era: 1,
      angle: -60,
      radius: 2,
      bio: "J.G. Fichte (1762–1814). Developed his Wissenschaftslehre partly in reaction to the Spinoza-pantheism controversy of the 1780s. He wanted to preserve absolute unity (Spinoza's insight) while making the Absolute an active self-positing subject, not a static substance.",
    },
    {
      id: "schelling",
      label: "Schelling",
      year: "1775–1854",
      domain: "metaphysics",
      era: 1,
      angle: -20,
      radius: 2,
      bio: "F.W.J. Schelling (1775–1854). Called Spinoza 'the Christ of modern philosophy.' His Naturphilosophie developed Spinoza's idea of nature as self-organizing into a dynamic conception of nature as productive force — Natura naturans made temporal and evolutionary.",
    },
    {
      id: "hegel",
      label: "Hegel",
      year: "1770–1831",
      domain: "metaphysics",
      era: 1,
      angle: 20,
      radius: 2,
      bio: "G.W.F. Hegel (1770–1831). Declared that 'to be a philosopher, you must first be a Spinozist.' He praised Spinoza for achieving genuine systematic thought of the Absolute, but argued that the static substance must be re-thought as Subject — an infinite process of self-differentiation and return. His dialectic incorporates the dynamism Spinoza's eternal sub specie aeternitatis excluded.",
    },
    {
      id: "jacobi",
      label: "Jacobi",
      year: "1743–1819",
      domain: "theology",
      era: 1,
      angle: 60,
      radius: 2,
      bio: "F.H. Jacobi (1743–1819). Sparked the Pantheismusstreit (pantheism controversy) by claiming Lessing had confessed to being a Spinozist. Though he opposed Spinoza as fatalist and atheist, his controversy forced German philosophy to take Spinoza seriously. The 1780s debate reshaped Kant's reception and launched German Idealism.",
    },
    {
      id: "feuerbach",
      label: "Feuerbach",
      year: "1804–1872",
      domain: "politics",
      era: 2,
      angle: -70,
      radius: 3,
      bio: "Ludwig Feuerbach (1804–1872). Inverted Hegel's idealism by drawing on Spinoza's materialism: God is not the ground of nature but a human projection onto nature. His 'anthropological materialism' derived human essence from natural-bodily existence — Spinoza's naturalism without the theology.",
    },
    {
      id: "marx",
      label: "Marx",
      year: "1818–1883",
      domain: "politics",
      era: 2,
      angle: -35,
      radius: 3,
      bio: "Karl Marx (1818–1883). Drew on Spinoza's critique of imagination and inadequate ideas for his theory of ideology. False consciousness — mistaking effects for causes, ideals for material interests — is a Spinozist diagnosis. Marx also inherited Spinoza's conatus as human labour-power, the drive of natural self-preservation transformed into social production.",
    },
    {
      id: "nietzsche",
      label: "Nietzsche",
      year: "1844–1900",
      domain: "psychology",
      era: 2,
      angle: 10,
      radius: 3,
      bio: "Friedrich Nietzsche (1844–1900). In a notebook entry of 1881, Nietzsche exclaimed that he had a 'precursor' in Spinoza: both rejected teleology, free will, moral guilt, and the good/evil distinction. His will to power is a dynamic re-casting of conatus; his eternal recurrence echoes sub specie aeternitatis. He diverged in celebrating active affirmation over contemplative reason.",
    },
    {
      id: "freud",
      label: "Freud",
      year: "1856–1939",
      domain: "psychology",
      era: 2,
      angle: 50,
      radius: 3,
      bio: "Sigmund Freud (1856–1939). Acknowledged that Spinoza anticipated the unconscious determination of conscious experience. The Ethics' claim that we do not know the causes of our desires — we merely experience the affects — prefigures the psychoanalytic discovery. Freud's conatus appears as Eros, the drive toward self-preservation and connection.",
    },
    {
      id: "deleuze",
      label: "Deleuze",
      year: "1925–1995",
      domain: "ecology",
      era: 3,
      angle: -55,
      radius: 4,
      bio: "Gilles Deleuze (1925–1995). Called Spinoza 'the prince of philosophers.' His immanence philosophy — contra transcendence in any form — radicalizes Spinoza's one-substance doctrine into a plane of immanence populated by bodies and their capacities to affect and be affected. His reading revived Spinoza for continental philosophy and ecology.",
    },
    {
      id: "negri",
      label: "Negri",
      year: "b. 1933",
      domain: "politics",
      era: 3,
      angle: -20,
      radius: 4,
      bio: "Antonio Negri (b. 1933). In The Savage Anomaly, Negri reads Spinoza as a theorist of democratic constituent power — the multitude's collective conatus resisting sovereign capture. His political Spinozism grounds contemporary democratic theory in natural right and collective self-organization.",
    },
    {
      id: "damasio",
      label: "Damasio",
      year: "b. 1944",
      domain: "psychology",
      era: 3,
      angle: 20,
      radius: 4,
      bio: "Antonio Damasio (b. 1944). In Looking for Spinoza, the neuroscientist argues that Spinoza anticipated his somatic marker hypothesis: emotions are bodily states that guide rational cognition rather than impeding it. Mind-body parallelism maps onto the embodied cognition paradigm in contemporary neuroscience.",
    },
    {
      id: "naess",
      label: "Næss",
      year: "1912–2009",
      domain: "ecology",
      era: 3,
      angle: 55,
      radius: 4,
      bio: "Arne Næss (1912–2009). Founder of deep ecology, Næss found in Spinoza the metaphysical foundation for environmental ethics: if all modes are expressions of the same substance, the rigid self/nature boundary dissolves. Ecological self-realization — expanding one's identity to include other beings — is a practical consequence of Spinozist immanence.",
    },
  ];

  const edges = [
    {
      from: "spinoza",
      to: "leibniz",
      idea: "Substance monism & conatus",
      transformation: "Leibniz pluralized Spinoza's one substance into infinite monads with pre-established harmony — preserving unity without pantheism.",
    },
    {
      from: "spinoza",
      to: "bayle",
      idea: "Geometric necessity & God-Nature identity",
      transformation: "Bayle publicized Spinoza as the exemplary atheist, making 'Spinozism' a philosophical reference point across Europe.",
    },
    {
      from: "spinoza",
      to: "fichte",
      idea: "Absolute substance as single ground",
      transformation: "Fichte dynamized the static Absolute into a self-positing Ego, preserving unity while grounding freedom.",
    },
    {
      from: "spinoza",
      to: "schelling",
      idea: "Natura naturans — nature as productive activity",
      transformation: "Schelling temporalized Spinoza's eternal productive nature into an evolutionary Naturphilosophie.",
    },
    {
      from: "spinoza",
      to: "hegel",
      idea: "Substance as the Absolute; thought-extension parallelism",
      transformation: "Hegel sublated substance into Subject — the Absolute must be conceived as self-differentiating process, not static ground.",
    },
    {
      from: "spinoza",
      to: "jacobi",
      idea: "Immanent causation & determinism",
      transformation: "Jacobi weaponized Spinoza's fatalism to argue that reason leads inevitably to nihilism, demanding a leap of faith.",
    },
    {
      from: "spinoza",
      to: "feuerbach",
      idea: "Naturalistic critique of transcendence",
      transformation: "Feuerbach grounded Spinoza's immanence in anthropology: the Infinite is human species-being projected outward.",
    },
    {
      from: "spinoza",
      to: "marx",
      idea: "Inadequate ideas & ideology; conatus as labour-power",
      transformation: "Marx materialized Spinoza's epistemology: ideological consciousness is the imagination of those who know not the causes of their social conditions.",
    },
    {
      from: "spinoza",
      to: "nietzsche",
      idea: "Conatus; rejection of teleology and moral guilt",
      transformation: "Nietzsche radicalized conatus into will to power, transforming Spinoza's contemplative beatitude into active self-overcoming.",
    },
    {
      from: "spinoza",
      to: "freud",
      idea: "Unconscious determination of desire; affects preceding knowledge",
      transformation: "Freud systematized Spinoza's insight that we desire without knowing why into a clinical theory of the unconscious.",
    },
    {
      from: "spinoza",
      to: "deleuze",
      idea: "Immanence; bodies as capacities to affect",
      transformation: "Deleuze radicalized immanence, dissolving substance into a plane of differential intensities — Spinoza without transcendence of any kind.",
    },
    {
      from: "spinoza",
      to: "negri",
      idea: "Natural right; conatus of the multitude",
      transformation: "Negri read Spinoza's democratic theory as constituent power — the multitude's living labor against sovereign capture.",
    },
    {
      from: "spinoza",
      to: "damasio",
      idea: "Mind-body parallelism; emotions as bodily knowledge",
      transformation: "Damasio found in Spinoza's parallelism a precursor to embodied cognition and the somatic basis of rational decision-making.",
    },
    {
      from: "spinoza",
      to: "naess",
      idea: "God-Nature identity; modes as expressions of one substance",
      transformation: "Næss drew on Spinoza's monism to argue that ecological self-realization requires expanding identity beyond the individual organism.",
    },
    {
      from: "hegel",
      to: "feuerbach",
      idea: "Dialectical negation of spirit",
      transformation: "Feuerbach inverted Hegel's Spinozism: instead of Nature becoming Spirit, Spirit is revealed as alienated Nature.",
    },
    {
      from: "feuerbach",
      to: "marx",
      idea: "Material anthropology",
      transformation: "Marx took Feuerbach's naturalism but insisted on labour and social relations as the mediating reality.",
    },
  ];

  const eraRadii = [0, 110, 210, 300, 390];

  function getNodePosition(node, cx, cy) {
    if (node.id === "spinoza") return { x: cx, y: cy };
    const r = eraRadii[node.era + 1];
    const rad = (node.angle * Math.PI) / 180;
    return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
  }

  const visibleEras = timeFilter;

  function isNodeVisible(node) {
    if (node.id === "spinoza") return true;
    return node.era < visibleEras;
  }

  function isEdgeVisible(edge) {
    const fromNode = nodes.find((n) => n.id === edge.from);
    const toNode = nodes.find((n) => n.id === edge.to);
    return isNodeVisible(fromNode) && isNodeVisible(toNode);
  }

  const svgWidth = 800;
  const svgHeight = 700;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2 + 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const W = canvas.width;
    const H = canvas.height;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.4 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#0E7490`;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W) { p.x = Math.random() * W; }
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const activeConnection = selectedEdge || hoveredEdge;
  const activeConnectionData = activeConnection
    ? edges.find((e) => e.from + "-" + e.to === activeConnection)
    : null;

  const activeNode = selectedNode
    ? nodes.find((n) => n.id === selectedNode)
    : hoveredNode
    ? nodes.find((n) => n.id === hoveredNode)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #0a2a35 0%, #050810 70%)",
        fontFamily: "Georgia, serif",
        color: "#e8e0d0",
        padding: "0",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          opacity: 0.18,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "min(90vw, 920px)", margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#0E7490", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 19 of 21 — Spinoza's Philosophical Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", margin: "0 0 10px", color: "#f0e8d8", lineHeight: 1.3 }}>
            Spinoza's Influence on Later Philosophy
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#a09880", maxWidth: "min(100%, 660px)", margin: "0 auto", lineHeight: 1.7 }}>
            Suppressed as heretical, then rediscovered across three centuries — each generation finding new resources in a system that refused to stay buried.
          </p>
        </div>

        {/* 1. PROBLEM PANEL */}
        <div
          style={{
            background: "rgba(14,116,144,0.07)",
            border: "1px solid rgba(14,116,144,0.2)",
            borderLeft: "4px solid #0E7490",
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "32px",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#0E7490", marginBottom: "12px" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.8, color: "#d4c8b8" }}>
            Having established the geometric method and the systematic unity of Spinoza's system, the question becomes pressing: has this systematic vision actually influenced subsequent intellectual history, and if so, how? The Ethics was condemned as atheistic, Spinoza himself placed under herem — complete social excommunication — at twenty-three. A system so thoroughly rejected by its own moment seems an unlikely candidate for lasting philosophical legacy. And yet the history of European thought from Leibniz forward cannot be written without reckoning with his ghost.
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div
          style={{
            background: "rgba(5,8,16,0.7)",
            border: "1px solid rgba(14,116,144,0.25)",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#0E7490" }}>
              Influence Map — Creative Appropriation Across Three Centuries
            </span>
          </div>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#7a6e60", margin: "0 0 20px" }}>
            Click any node to explore a thinker. Click any connection line to reveal the idea transmitted and transformed.
          </p>

          {/* Era Timeline Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", color: "#7a6e60", whiteSpace: "nowrap" }}>Show eras:</span>
            {eras.map((era, i) => (
              <button
                key={i}
                onClick={() => setTimeFilter(i + 1)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: `1px solid ${timeFilter > i ? "#0E7490" : "rgba(14,116,144,0.3)"}`,
                  background: timeFilter > i ? "rgba(14,116,144,0.25)" : "rgba(14,116,144,0.05)",
                  color: timeFilter > i ? "#a0d8e8" : "#5a6e70",
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Domain Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "16px" }}>
            {Object.entries(domainColors).filter(([k]) => k !== "source").map(([domain, color]) => (
              <div key={domain} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "11px", color: "#8a7e70", textTransform: "capitalize" }}>{domain}</span>
              </div>
            ))}
          </div>

          {/* SVG Map */}
          <div style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}>
            <svg
              width="100%"
              style={{ maxWidth: svgWidth, cursor: "default" }}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
              {/* Radial rings */}
              {[1, 2, 3, 4].map((ring) => (
                <circle
                  key={ring}
                  cx={cx}
                  cy={cy}
                  r={eraRadii[ring]}
                  fill="none"
                  stroke="rgba(14,116,144,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              ))}
              {/* Era labels on rings */}
              {eras.map((era, i) => (
                <text
                  key={i}
                  x={cx + eraRadii[i + 1] + 4}
                  y={cy + 4}
                  fontSize="10"
                  fill={timeFilter > i ? "rgba(14,116,144,0.6)" : "rgba(14,116,144,0.2)"}
                  fontFamily="Georgia, serif"
                >
                  {era.label}
                </text>
              ))}

              {/* Edges */}
              {edges.filter(isEdgeVisible).map((edge) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                const fp = getNodePosition(fromNode, cx, cy);
                const tp = getNodePosition(toNode, cx, cy);
                const edgeId = edge.from + "-" + edge.to;
                const isActive = hoveredEdge === edgeId || selectedEdge === edgeId;
                const isSpinozaEdge = edge.from === "spinoza";
                const toColor = domainColors[toNode.domain];

                const mx = (fp.x + tp.x) / 2 + (isSpinozaEdge ? (tp.y - fp.y) * 0.18 : 0);
                const my = (fp.y + tp.y) / 2 + (isSpinozaEdge ? (fp.x - tp.x) * 0.18 : 0);

                return (
                  <g key={edgeId}>
                    <path
                      d={`M ${fp.x} ${fp.y} Q ${mx} ${my} ${tp.x} ${tp.y}`}
                      fill="none"
                      stroke={isActive ? toColor : "rgba(14,116,144,0.2)"}
                      strokeWidth={isActive ? 2.5 : 1}
                      strokeOpacity={isActive ? 0.9 : 0.5}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={() => setHoveredEdge(edgeId)}
                      onMouseLeave={() => setHoveredEdge(null)}
                      onClick={() => setSelectedEdge(selectedEdge === edgeId ? null : edgeId)}
                    />
                    {isActive && (
                      <path
                        d={`M ${fp.x} ${fp.y} Q ${mx} ${my} ${tp.x} ${tp.y}`}
                        fill="none"
                        stroke={toColor}
                        strokeWidth={6}
                        strokeOpacity={0.12}
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.filter(isNodeVisible).map((node) => {
                const pos = getNodePosition(node, cx, cy);
                const isActive = hoveredNode === node.id || selectedNode === node.id;
                const color = domainColors[node.domain];
                const isSpinoza = node.id === "spinoza";
                const nodeR = isSpinoza ? 28 : 18;

                const labelAngle = node.angle || 0;
                const labelOffsetX = isSpinoza ? 0 : Math.sin((labelAngle * Math.PI) / 180) * 10;
                const labelOffsetY = isSpinoza ? 36 : Math.abs(Math.cos((labelAngle * Math.PI) / 180)) > 0.5
                  ? (Math.cos((labelAngle * Math.PI) / 180) > 0 ? -30 : 30)
                  : 0;
                const labelAnchor = isSpinoza ? "middle"
                  : Math.abs(labelAngle) < 25 ? "middle"
                  : labelAngle < 0 ? "end" : "start";

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={nodeR + 10}
                        fill={color}
                        opacity={0.15}
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeR}
                      fill={isActive ? color : "rgba(5,8,16,0.8)"}
                      stroke={color}
                      strokeWidth={isSpinoza ? 3 : 2}
                      opacity={isActive ? 1 : 0.85}
                    />
                    {isSpinoza && (
                      <circle cx={pos.x} cy={pos.y} r={18} fill="none" stroke={color} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
                    )}
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      fontSize={isSpinoza ? "11" : "9"}
                      fill={isActive ? "#fff" : color}
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                      style={{ pointerEvents: "none" }}
                    >
                      {isSpinoza ? "Spinoza" : node.label.split(" ")[0]}
                    </text>
                    {isSpinoza && (
                      <text x={pos.x} y={pos.y + 16} textAnchor="middle" fontSize="8" fill={color} fontFamily="Georgia, serif" style={{ pointerEvents: "none" }}>
                        {node.year}
                      </text>
                    )}
                    <text
                      x={pos.x + labelOffsetX}
                      y={pos.y + nodeR + (labelOffsetY !== 0 ? labelOffsetY - nodeR : 14)}
                      textAnchor={labelAnchor}
                      fontSize="10"
                      fill={isActive ? "#d4c8b8" : "#7a6e60"}
                      fontFamily="Georgia, serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {!isSpinoza ? node.label : ""}
                    </text>
                    <text
                      x={pos.x + labelOffsetX}
                      y={pos.y + nodeR + (labelOffsetY !== 0 ? labelOffsetY - nodeR + 12 : 26)}
                      textAnchor={labelAnchor}
                      fontSize="8"
                      fill={isActive ? "#0E7490" : "#4a5e60"}
                      fontFamily="Georgia, serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {!isSpinoza ? node.year : ""}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Info Panel */}
          <div style={{ marginTop: "20px", minHeight: "120px" }}>
            {activeConnectionData ? (
              <div
                style={{
                  background: "rgba(14,116,144,0.1)",
                  border: "1px solid rgba(14,116,144,0.35)",
                  borderRadius: "8px",
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#0E7490", marginBottom: "10px" }}>
                  Connection: {activeConnectionData.from} → {activeConnectionData.to}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#0E7490", marginBottom: "6px", fontStyle: "italic" }}>Idea Transmitted</div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#c8bcac", lineHeight: 1.7 }}>{activeConnectionData.idea}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#7C3AED", marginBottom: "6px", fontStyle: "italic" }}>How It Was Transformed</div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#c8bcac", lineHeight: 1.7 }}>{activeConnectionData.transformation}</p>
                  </div>
                </div>
              </div>
            ) : activeNode ? (
              <div
                style={{
                  background: "rgba(14,116,144,0.08)",
                  border: `1px solid ${domainColors[activeNode.domain]}40`,
                  borderLeft: `3px solid ${domainColors[activeNode.domain]}`,
                  borderRadius: "8px",
                  padding: "20px 24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <span style={{ fontSize: "16px", color: "#f0e8d8" }}>{activeNode.label}</span>
                    <span style={{ fontSize: "12px", color: "#7a6e60", marginLeft: "12px" }}>{activeNode.year}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: domainColors[activeNode.domain],
                      background: `${domainColors[activeNode.domain]}20`,
                      padding: "3px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {activeNode.domain}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", color: "#c8bcac", lineHeight: 1.8 }}>{activeNode.bio}</p>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#4a5e60",
                  fontSize: "13px",
                  fontStyle: "italic",
                }}
              >
                Select a thinker node or connection line to explore the specific philosophical inheritance...
              </div>
            )}
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(14,116,144,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#0E7490", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {[
              { concept: "German Idealism", desc: "Fichte, Schelling, and Hegel transformed Spinoza's static substance into a dynamic Absolute that becomes what it is through self-differentiation — preserving monism while adding history." },
              { concept: "Hegel's Dialectic", desc: "Hegel's 'determinate negation' is the logic Spinoza lacked: how the Absolute moves through contradiction without losing its unity. Substance becomes Subject." },
              { concept: "Marx & Materialism", desc: "Marx inherited Spinoza's equation of imagination with ideology — the mind's tendency to mistake its own projections for natural necessities — and grounded it in class relations." },
              { concept: "Nietzsche's Naturalism", desc: "Nietzsche found in Spinoza's conatus and rejection of guilt a precursor to will-to-power. He radicalized the naturalism by rejecting even Spinoza's rational beatitude." },
              { concept: "Freud & the Unconscious", desc: "Spinoza's claim that we do not know the causes of our desires directly anticipates Freud's therapeutic insight: self-knowledge requires making the unconscious determination conscious." },
              { concept: "Property Dualism", desc: "Contemporary philosophy of mind uses Spinoza's mind-body parallelism to articulate property dualism: one substance, multiple irreducible descriptive frameworks." },
            ].map(({ concept, desc }) => (
              <div
                key={concept}
                onClick={() => setHoveredConcept(hoveredConcept === concept ? null : concept)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === concept ? "#0E7490" : "rgba(14,116,144,0.1)",
                  border: `1px solid ${hoveredConcept === concept ? "#22d3ee" : "rgba(14,116,144,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === concept ? "#f0ead8" : "#67e8f9",
                  transition: "all 0.2s",
                }}
              >
                {concept}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(14,116,144,0.08)", border: "1px solid rgba(14,116,144,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#0E7490", marginBottom: 8 }}>
                {hoveredConcept}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {[
                  { concept: "German Idealism", desc: "Fichte, Schelling, and Hegel transformed Spinoza's static substance into a dynamic Absolute that becomes what it is through self-differentiation — preserving monism while adding history." },
                  { concept: "Hegel's Dialectic", desc: "Hegel's 'determinate negation' is the logic Spinoza lacked: how the Absolute moves through contradiction without losing its unity. Substance becomes Subject." },
                  { concept: "Marx & Materialism", desc: "Marx inherited Spinoza's equation of imagination with ideology — the mind's tendency to mistake its own projections for natural necessities — and grounded it in class relations." },
                  { concept: "Nietzsche's Naturalism", desc: "Nietzsche found in Spinoza's conatus and rejection of guilt a precursor to will-to-power. He radicalized the naturalism by rejecting even Spinoza's rational beatitude." },
                  { concept: "Freud & the Unconscious", desc: "Spinoza's claim that we do not know the causes of our desires directly anticipates Freud's therapeutic insight: self-knowledge requires making the unconscious determination conscious." },
                  { concept: "Property Dualism", desc: "Contemporary philosophy of mind uses Spinoza's mind-body parallelism to articulate property dualism: one substance, multiple irreducible descriptive frameworks." },
                ].find(c => c.concept === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* 3. DIFFICULTY PANEL */}
        <div
          style={{
            background: "rgba(5,8,16,0.6)",
            border: "1px solid rgba(14,116,144,0.15)",
            borderLeft: "4px solid #065F46",
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#065F46", marginBottom: "12px" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: 1.8, color: "#d4c8b8" }}>
            If Spinoza's system continues to prove relevant across domains as diverse as neuroscience, environmental philosophy, democratic theory, and personal development, the diversity of appropriations begins to raise a troubling question: is there a coherent Spinozism, or simply a quarry from which any sufficiently ambitious thinker can mine convenient materials? The history of influence shows both the depth of the original insights and their promiscuous availability — Spinoza has been claimed by rationalists and romantics, materialists and mystics, revolutionaries and conservatives.
          </p>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.8, color: "#a09880", fontStyle: "italic" }}>
            This pressure forces the next development: what does the pattern of creative appropriation reveal about which aspects of Spinoza's system are most alive for our own historical moment — and what genuinely new problems does twenty-first century life pose that his framework might illuminate in ways even its most sophisticated readers have not yet articulated?
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES */}
        <div
          style={{
            background: "rgba(5,8,16,0.6)",
            border: "1px solid rgba(14,116,144,0.15)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              padding: "20px 28px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#0E7490" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color="#0E7490" />
              : <ChevronDown size={16} color="#0E7490" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #0E749033" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: "Hegel's Tribute",
                    text: "In his Lectures on the History of Philosophy, Hegel declared that you cannot be a philosopher without first passing through Spinozism, praising it as the only genuine attempt to think the Absolute as a system. This endorsement made Spinoza canonical for nineteenth-century German thought.",
                  },
                  {
                    title: "Marx's Ideology Critique",
                    text: "Marx's analysis of false consciousness — workers experiencing capitalist social relations as natural and necessary rather than historically contingent — translates Spinoza's account of inadequate ideas into political economy. The fetishism of commodities is imagination in the technical Spinozist sense.",
                  },
                  {
                    title: "Freud's Acknowledgment",
                    text: "Freud explicitly acknowledged that Spinoza had anticipated the psychoanalytic discovery: we act for reasons we do not know, and what we call reasons are often post-hoc rationalizations of prior affective states. The unconscious is Spinoza's stratum of inadequate ideas.",
                  },
                  {
                    title: "Property Dualism in Philosophy of Mind",
                    text: "Contemporary philosophers like David Chalmers and Joseph Levine work with a framework directly descended from Spinoza's parallelism: physical and phenomenal descriptions are irreducibly different modes of access to the same underlying reality — solving the causal problem while acknowledging the explanatory gap.",
                  },
                ].map(({ title, text }) => (
                  <div key={title} style={{
                    borderLeft: "3px solid #0E7490",
                    borderRadius: "0 6px 6px 0",
                    background: "#0E74900a",
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#38bcd4", marginBottom: 6 }}>{title}</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "40px", color: "#3a4e50", fontSize: "12px" }}>
          Part 19 of 21 — The legacy reverberates forward
        </div>
      </div>
    </div>
  );
}

function ConceptCard({ concept, desc, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "rgba(14,116,144,0.2)" : "rgba(14,116,144,0.05)",
        border: `1px solid ${isActive ? "rgba(14,116,144,0.6)" : "rgba(14,116,144,0.15)"}`,
        borderRadius: "6px",
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: isActive ? "0 0 10px rgba(14,116,144,0.2)" : "none",
      }}
    >
      <div style={{ fontSize: "12px", color: isActive ? "#22D3EE" : "#0E7490", marginBottom: isActive ? "8px" : 0, fontWeight: "bold" }}>{concept}</div>
      {isActive && <p style={{ margin: 0, fontSize: "12px", color: "#8a7e6e", lineHeight: 1.7 }}>{desc}</p>}
    </div>
  );
}

// ─── Part 20: Contemporary Relevance: Spinoza for the Modern World ───
function ContemporaryRelevanceModernApplications() {
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hubHovered, setHubHovered] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const accent = "#15803D";
  const accentLight = "#22c55e";
  const accentDim = "#0f5c2e";

  const panels = [
    {
      id: "neuroscience",
      title: "Neuroscience",
      icon: "🧠",
      problem: "Mind-body dualism",
      concept: "Embodied Cognition",
      spinozaCore: "Thought and Extension as parallel attributes of one substance",
      contemporary: "Damasio's somatic marker hypothesis confirms that emotion is constitutive of reason, not opposed to it — vindicating Spinoza's parallelism.",
      detail: "Antonio Damasio's research on patients with prefrontal damage revealed that without emotional signals, rational decision-making collapses entirely. Spinoza argued in 1677 that mind and body are one thing expressed in two ways — emotions are ideas of bodily states, not irrational interruptions. Contemporary neuroscience has arrived at the same conclusion through empirical routes Spinoza could not have imagined.",
      color: "#1d4ed8",
    },
    {
      id: "environment",
      title: "Environmental Ethics",
      icon: "🌍",
      problem: "Ecological crisis",
      concept: "Ecological Interdependence",
      spinozaCore: "Humans as finite modes of infinite Nature (Deus sive Natura)",
      contemporary: "Spinoza's monism dissolves the subject-nature boundary that enables both exploitation and romantic withdrawal.",
      detail: "Both anthropocentric exploitation (nature as resource) and romantic withdrawal (nature as pristine Other) presuppose a separation between humanity and the natural world. Spinoza's identification of God with Nature — Deus sive Natura — makes humans participants within a single substance, not masters over it. This grounds an ecological ethics of participation rather than domination, neither exploiting nor escaping nature but understanding our place within it.",
      color: "#15803D",
    },
    {
      id: "democracy",
      title: "Democratic Theory",
      icon: "🏛️",
      problem: "Political polarization",
      concept: "Deliberative Democracy",
      spinozaCore: "Collective intelligence surpasses individual reason; freedom through participation",
      contemporary: "Citizens' assemblies and participatory budgeting operationalize Spinoza's insight that genuine collective deliberation produces more adequate ideas.",
      detail: "Spinoza argued that democratic participation isn't merely a political form but an epistemic practice — collective deliberation enables people to overcome the partial perspectives that generate passive affects and conflict. Modern deliberative democracy experiments like Ireland's Citizens' Assembly on abortion demonstrate that ordinary citizens, given adequate information and genuine deliberation, produce more nuanced and stable judgments than polarized partisan politics allows.",
      color: "#7c3aed",
    },
    {
      id: "psychology",
      title: "Psychology & Therapy",
      icon: "💭",
      problem: "Addiction & depression",
      concept: "Passive Affect Cycles",
      spinozaCore: "Bondage = being driven by inadequate ideas; liberation = forming adequate ideas",
      contemporary: "CBT, ACT, and self-determination theory all operationalize the move from passive to active affects through understanding.",
      detail: "Spinoza's analysis of human bondage describes addiction and depression with striking precision: we are driven by affects whose causes we do not understand, seeking relief in objects that compound our confusion. Self-determination theory research confirms that autonomous motivation — acting from genuine understanding rather than external compulsion or internal conflict — predicts wellbeing far better than achievement or wealth. Cognitive-behavioral therapy's restructuring of maladaptive cognitions is, in Spinozist terms, the transformation of inadequate ideas into adequate ones.",
      color: "#b45309",
    },
    {
      id: "education",
      title: "Education",
      icon: "📚",
      problem: "Passive learning",
      concept: "Self-Determination Theory",
      spinozaCore: "Conatus: each thing strives to persist and enhance its power of acting",
      contemporary: "Intrinsic motivation research confirms that learning driven by genuine curiosity — conatus expressing itself — outperforms reward-based instruction.",
      detail: "Deci and Ryan's self-determination theory, one of the most empirically robust frameworks in motivation psychology, distinguishes autonomous from controlled motivation in terms that directly parallel Spinoza's active/passive affect distinction. Students learning to satisfy genuine curiosity (active conatus) demonstrate deeper comprehension, greater creativity, and superior long-term retention compared to those learning for external rewards — confirming that education aligned with conatus is not only more humane but more effective.",
      color: "#0e7490",
    },
    {
      id: "flourishing",
      title: "Personal Flourishing",
      icon: "✨",
      problem: "Consumer individualism",
      concept: "Understanding as Freedom",
      spinozaCore: "Beatitudo: blessedness through intellectual love — not pleasure-seeking but understanding",
      contemporary: "The paradox of consumer culture — rising wealth, rising depression — is precisely what Spinoza predicted: passive affect cycles cannot constitute genuine flourishing.",
      detail: "The empirical paradox of modern affluence — that above a modest threshold, increased wealth and consumption produce no improvement in wellbeing — is precisely what Spinoza's framework predicts. Consumer culture promises increases in joy through acquisition, but these are passive joys tied to objects that inevitably change or disappoint. Genuine blessedness, Spinoza argued, consists not in passive enjoyment but in the active power of understanding — a power that increases without limit and cannot be taken away.",
      color: "#9d174d",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 900;
    canvas.height = canvas.offsetHeight || 600;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const W = canvas.width;
    const H = canvas.height;

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#22c55e`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handlePanelClick = (id) => {
    setExpandedPanel(expandedPanel === id ? null : id);
  };

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at center, #052e16 0%, #0a0a0f 100%)",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        color: "#e2e8f0",
        padding: "40px 24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "min(90vw, 960px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "3px", color: accentLight, marginBottom: "8px", textTransform: "uppercase" }}>
            Part 20 of 21
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: "normal", color: "#f0fdf4", marginBottom: "12px", lineHeight: "1.3" }}>
            Contemporary Relevance: Spinoza for the Modern World
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#a7f3d0", maxWidth: "min(100%, 700px)", margin: "0 auto", lineHeight: "1.7", fontStyle: "italic" }}>
            Spinoza's naturalistic framework continues to offer resources for contemporary challenges in neuroscience, environmental ethics, democratic theory, and the search for authentic human flourishing beyond consumer individualism.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div
          style={{
            background: "#0f1a14",
            border: "1px solid #1f2937",
            borderLeft: `4px solid ${accent}`,
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "36px",
          }}
        >
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: accent, marginBottom: "12px", textTransform: "uppercase", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: "1.8", color: "#cbd5e1", margin: 0 }}>
            The survey of Spinoza's historical influence established the depth and breadth of his impact — but the question remains whether his 17th century system offers genuinely live resources for specifically contemporary intellectual and practical challenges. Can a philosopher who wrote in Latin, cited Euclid, and lived before Newton's Principia truly speak to neural networks, climate collapse, and algorithmic polarization? The urgency is not merely academic: if systematic philosophy cannot engage real problems, it becomes museum philosophy — admirable but inert.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{ position: "relative", marginBottom: "36px" }}>
          {/* Canvas background */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.15,
              pointerEvents: "none",
              borderRadius: "12px",
            }}
          />

          {/* Core Argument Statement */}
          <div
            style={{
              background: "#0f1a14",
              border: "1px solid #166534",
              borderRadius: "12px",
              padding: "28px 32px",
              marginBottom: "28px",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: accentLight, marginBottom: "12px", textTransform: "uppercase" }}>
              Core Argument
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#d1fae5", margin: 0 }}>
              Contemporary neuroscience has confirmed Spinoza's insights about embodied consciousness and the cognitive role of emotion. Environmental philosophy has found in his vision of humans as finite modes of nature a framework for ecological ethics that transcends both anthropocentric exploitation and romantic withdrawal. Democratic theorists have drawn on his analysis of collective intelligence for deliberative democracy innovations. Most urgently, his vision of flourishing through understanding and cooperation offers an alternative to consumer individualism that explains and addresses contemporary social problems — addiction, depression, polarization — as cycles of passive affect generated by inadequate understanding.
            </p>
          </div>

          {/* Central Hub */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div
              onMouseEnter={() => setHubHovered(true)}
              onMouseLeave={() => setHubHovered(false)}
              style={{
                background: hubHovered ? "#052e16" : "#0a1a10",
                border: `2px solid ${hubHovered ? accentLight : accent}`,
                borderRadius: "50%",
                width: "140px",
                height: "140px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
                boxShadow: hubHovered ? `0 0 32px ${accentDim}` : "none",
                transition: "all 0.3s ease",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>∞</div>
              <div style={{ fontSize: "11px", color: accentLight, lineHeight: "1.4", letterSpacing: "0.5px" }}>
                Substance Monism
              </div>
              <div style={{ fontSize: "10px", color: "#6ee7b7", lineHeight: "1.4", marginTop: "3px" }}>
                + Conatus
              </div>
              <div style={{ fontSize: "9px", color: "#4ade80", marginTop: "3px", fontStyle: "italic" }}>
                Metaphysical Core
              </div>
            </div>
          </div>

          {/* Domain Panels Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              position: "relative",
            }}
          >
            {panels.map((panel) => {
              const isExpanded = expandedPanel === panel.id;
              const isHovered = hoveredPanel === panel.id;
              return (
                <div
                  key={panel.id}
                  onClick={() => handlePanelClick(panel.id)}
                  onMouseEnter={() => setHoveredPanel(panel.id)}
                  onMouseLeave={() => setHoveredPanel(null)}
                  style={{
                    background: isExpanded ? "#0f1f15" : isHovered ? "#0d1f14" : "#080f0a",
                    border: `1px solid ${isExpanded ? panel.color : isHovered ? "#166534" : "#1a2e1f"}`,
                    borderTop: `3px solid ${panel.color}`,
                    borderRadius: "10px",
                    padding: isExpanded ? "24px" : "20px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: isExpanded || isHovered ? `0 4px 24px rgba(0,0,0,0.5)` : "none",
                    gridColumn: isExpanded ? "span 3" : "span 1",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "24px" }}>{panel.icon}</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: "#f0fdf4", letterSpacing: "0.5px" }}>
                        {panel.title}
                      </div>
                      <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "1px" }}>
                        Problem: {panel.problem}
                      </div>
                    </div>
                    <div style={{ marginLeft: "auto", fontSize: "11px", color: isExpanded ? accentLight : "#6b7280" }}>
                      {isExpanded ? "▲" : "▼"}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      color: panel.color === "#15803D" ? "#4ade80" : "#a5b4fc",
                      background: "#1a2535",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      marginBottom: "8px",
                      border: `1px solid ${panel.color}30`,
                      color: "#d1fae5",
                    }}
                  >
                    {panel.concept}
                  </div>

                  <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>
                    {panel.contemporary}
                  </p>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: "20px",
                        borderTop: `1px solid ${panel.color}40`,
                        paddingTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "20px",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: accentLight, marginBottom: "8px", textTransform: "uppercase" }}>
                            Spinoza's Framework
                          </div>
                          <div
                            style={{
                              background: "#0a1f14",
                              border: `1px solid ${accent}40`,
                              borderRadius: "6px",
                              padding: "14px",
                              fontSize: "13px",
                              color: "#a7f3d0",
                              lineHeight: "1.6",
                              fontStyle: "italic",
                            }}
                          >
                            "{panel.spinozaCore}"
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: accentLight, marginBottom: "8px", textTransform: "uppercase" }}>
                            Contemporary Convergence
                          </div>
                          <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.7", margin: 0 }}>
                            {panel.detail}
                          </p>
                        </div>
                      </div>

                      {/* Connection to core */}
                      <div
                        style={{
                          marginTop: "16px",
                          padding: "12px 16px",
                          background: "#052e16",
                          borderRadius: "6px",
                          border: `1px solid ${accent}`,
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "18px" }}>∞</span>
                        <span style={{ fontSize: "12px", color: "#86efac" }}>
                          Traces back to substance monism: if there is one substance expressing itself through infinite attributes, then mind-body, human-nature, individual-collective divisions are secondary — modes of one reality, whose understanding constitutes freedom.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Key Concepts */}
        <div
          style={{
            background: "#080f0a",
            border: "1px solid #1a2e1f",
            borderRadius: "10px",
            padding: "20px 24px",
            marginBottom: "28px",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: 2, color: accent, marginBottom: 14, textTransform: "uppercase" }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { label: "Embodied Cognition", panel: "neuroscience" },
              { label: "Ecological Interdependence", panel: "environment" },
              { label: "Deliberative Democracy", panel: "democracy" },
              { label: "Consumer Individualism", panel: "flourishing" },
              { label: "Self-Determination Theory", panel: "education" },
              { label: "Political Polarization", panel: "democracy" },
            ].map((kc) => {
              const isActive = expandedPanel === kc.panel;
              return (
                <div
                  key={kc.label}
                  onClick={() => handlePanelClick(kc.panel)}
                  style={{
                    padding: "6px 14px",
                    border: `1px solid ${isActive ? accentLight : "#2d4a35"}`,
                    borderRadius: "20px",
                    fontSize: "12px",
                    color: isActive ? "#f0ead8" : "#6ee7b7",
                    cursor: "pointer",
                    background: isActive ? accent : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {kc.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div
          style={{
            background: "#0f1219",
            border: "1px solid #1f2937",
            borderLeft: `4px solid #4338ca`,
            borderRadius: "8px",
            padding: "28px 32px",
            marginBottom: "28px",
          }}
        >
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#818cf8", marginBottom: "12px", textTransform: "uppercase", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#cbd5e1", margin: "0 0 14px 0" }}>
            Having surveyed all aspects of the system, the final question is whether its parts truly cohere into a unified whole — does Spinoza's systematic integration hold, and what is the ultimate significance of his philosophical achievement? The convergences between Spinoza and contemporary research are striking, but convergence is not identity. Does neuroscience's embodied cognition truly require Spinoza's parallelism, or merely resemble it? Does ecological ethics need substance monism, or only a modest holism? The risk is that contemporary applications become a collection of family resemblances rather than a demonstration of systematic necessity.
          </p>
          <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#a5b4fc", margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: a final reckoning with whether the Ethics constitutes a genuine philosophical system — its parts logically entailed by its foundations — or a remarkable but ultimately contingent collection of insights. The question of systematic coherence becomes the question of Spinoza's ultimate philosophical significance.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div
          style={{
            background: "#0a0f0b",
            border: "1px solid #1a2e1f",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: "20px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: accent, textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </div>
            {echosOpen ? (
              <ChevronUp size={18} color={accent} />
            ) : (
              <ChevronDown size={18} color={accent} />
            )}
          </div>

          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: `1px solid ${accent}33` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                {[
                  {
                    title: "Self-Determination Theory Research",
                    body: "Deci and Ryan's decades of empirical research demonstrate that autonomous motivation — acting from genuine understanding and intrinsic interest — predicts psychological wellbeing, creativity, and sustained engagement far better than extrinsic reward. This directly confirms Spinoza's analysis of active versus passive affects as the key dimension of human freedom.",
                  },
                  {
                    title: "Participatory Budgeting & Citizens' Assemblies",
                    body: "Porto Alegre's participatory budgeting (begun 1989) and Ireland's Citizens' Assembly on abortion rights (2016-18) demonstrate that structured deliberation among ordinary citizens produces nuanced, stable, democratically legitimate outcomes — operationalizing Spinoza's claim that collective intelligence through genuine participation surpasses polarized partisan conflict.",
                  },
                  {
                    title: "Addiction and Depression as Passive Affect Cycles",
                    body: "The neuroscience of addiction reveals exactly the structure Spinoza described: inadequate understanding of one's own affective states generates compulsive seeking behavior that temporarily relieves but ultimately amplifies the underlying distress. Treatment approaches emphasizing self-understanding and intrinsic motivation (mindfulness, ACT) outperform purely behavioral suppression.",
                  },
                  {
                    title: "Climate Crisis and Inadequate Understanding",
                    body: "The climate crisis, on Spinoza's analysis, arises from a systematic failure to understand human embeddedness in natural systems — treating nature as an external resource rather than as the substance of which we are finite modes. This is not merely an ethical failure but an epistemological one: inadequate ideas generating passive destructive affects at civilizational scale.",
                  },
                ].map((echo) => (
                  <div key={echo.title} style={{
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: "0 6px 6px 0",
                    background: `${accent}0a`,
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: accentLight, marginBottom: 6 }}>
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

      </div>
    </div>
  );
}

// ─── Part 21: The Unity of Spinoza's System: Final Integration ───
function UnityOfSpinozasSystemFinalIntegration() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredKc, setHoveredKc] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState(0);
  const rotationRef = useRef(0);
  const pulseRef = useRef(0);

  const sectors = [
    {
      id: "metaphysics",
      label: "Metaphysics",
      angle: 0,
      color: "#6D28D9",
      description: "Substance monism grounds all else: one infinite substance (God/Nature) with infinite attributes. This eliminates the dualisms—God/world, mind/body—that tortured earlier thinkers, making a thoroughly naturalistic account possible.",
      connections: ["epistemology", "psychology", "ethics", "politics", "eternity"],
      symbol: "∞"
    },
    {
      id: "epistemology",
      label: "Epistemology",
      angle: 60,
      color: "#7C3AED",
      description: "Three kinds of knowledge—imagination, reason, intuitive science—map onto degrees of adequacy. As finite modes grasp the whole more completely, bondage gives way to freedom. Knowledge is not merely theoretical but transformative.",
      connections: ["metaphysics", "psychology", "ethics", "politics", "eternity"],
      symbol: "⊕"
    },
    {
      id: "psychology",
      label: "Psychology",
      angle: 120,
      color: "#8B5CF6",
      description: "Conatus—the striving to persist in being—underlies all affect. Passive emotions arise from inadequate ideas; active emotions from adequate ones. The same fundamental drive that enslaves can be redirected toward genuine power and joy.",
      connections: ["metaphysics", "epistemology", "ethics", "politics", "eternity"],
      symbol: "⟳"
    },
    {
      id: "ethics",
      label: "Ethics",
      angle: 180,
      color: "#9D60F8",
      description: "Freedom is not contra-causal but the expression of one's deepest nature through reason. Virtue is power; the good is understood, not commanded. Human flourishing emerges from transforming passive bondage into active self-determination.",
      connections: ["metaphysics", "epistemology", "psychology", "politics", "eternity"],
      symbol: "✦"
    },
    {
      id: "politics",
      label: "Politics",
      angle: 240,
      color: "#A855F7",
      description: "Individual and collective development are inseparable. Democratic community amplifies each person's rational power; social justice and personal development are not competing values but mutually supporting dimensions of human flourishing.",
      connections: ["metaphysics", "epistemology", "psychology", "ethics", "eternity"],
      symbol: "◎"
    },
    {
      id: "eternity",
      label: "Eternity",
      angle: 300,
      color: "#B970FF",
      description: "Sub specie aeternitatis—under the aspect of eternity—the mind participates in the infinite intellect of God/Nature. This impersonal immortality and intellectual love of God represents the highest human blessedness: understanding one's place in the whole.",
      connections: ["metaphysics", "epistemology", "psychology", "ethics", "politics"],
      symbol: "☽"
    }
  ];

  const canvasWidth = 620;
  const canvasHeight = 520;
  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2;
  const orbitR = 170;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      rotationRef.current += 0.004;
      pulseRef.current += 0.025;
      setRotation(rotationRef.current);
      setPulse(pulseRef.current);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Background glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      bgGrad.addColorStop(0, "rgba(109,40,217,0.12)");
      bgGrad.addColorStop(0.5, "rgba(109,40,217,0.05)");
      bgGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();

      // Outer orbit ring
      ctx.beginPath();
      ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(109,40,217,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner orbit ring
      ctx.beginPath();
      ctx.arc(cx, cy, orbitR * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(109,40,217,0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compute node positions with rotation
      const nodePositions = sectors.map((s) => {
        const angle = (s.angle * Math.PI) / 180 + rotationRef.current;
        return {
          id: s.id,
          x: cx + orbitR * Math.cos(angle),
          y: cy + orbitR * Math.sin(angle),
          color: s.color
        };
      });

      // Draw connection threads
      const active = selectedConcept || hoveredConcept;
      nodePositions.forEach((node, i) => {
        nodePositions.forEach((other, j) => {
          if (j <= i) return;
          const isActive = active && (node.id === active || other.id === active);
          if (!active || isActive) {
            const baseAlpha = active ? (isActive ? 0.7 : 0.05) : 0.12;
            const pAlpha = active && isActive
              ? baseAlpha + 0.2 * Math.abs(Math.sin(pulseRef.current + i * 0.5))
              : baseAlpha;
            const grad = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            grad.addColorStop(0, `rgba(109,40,217,${pAlpha})`);
            grad.addColorStop(0.5, `rgba(185,112,255,${pAlpha * 1.5})`);
            grad.addColorStop(1, `rgba(109,40,217,${pAlpha})`);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            // Curved connection through center-ish
            const midX = (node.x + other.x) / 2 + (Math.random() > 0.5 ? 1 : -1) * 8;
            const midY = (node.y + other.y) / 2 + (Math.random() > 0.5 ? 1 : -1) * 8;
            ctx.bezierCurveTo(
              node.x * 0.6 + cx * 0.4, node.y * 0.6 + cy * 0.4,
              other.x * 0.6 + cx * 0.4, other.y * 0.6 + cy * 0.4,
              other.x, other.y
            );
            ctx.strokeStyle = grad;
            ctx.lineWidth = active && isActive ? 1.5 : 0.8;
            ctx.stroke();
          }
        });
      });

      // Radial lines from center to nodes
      nodePositions.forEach((node) => {
        const isActive = active === node.id;
        const alpha = active ? (isActive ? 0.5 : 0.08) : 0.18;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(185,112,255,${alpha})`;
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        ctx.stroke();
      });

      // Center sphere
      const sphereGlow = ctx.createRadialGradient(cx - 12, cy - 12, 2, cx, cy, 38);
      const pulseFactor = 0.15 + 0.08 * Math.sin(pulseRef.current);
      sphereGlow.addColorStop(0, `rgba(185,112,255,${0.9})`);
      sphereGlow.addColorStop(0.4, `rgba(109,40,217,${0.7})`);
      sphereGlow.addColorStop(1, `rgba(109,40,217,0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 38 + pulseFactor * 10, 0, Math.PI * 2);
      ctx.fillStyle = sphereGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      const innerGrad = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, 28);
      innerGrad.addColorStop(0, "#c084fc");
      innerGrad.addColorStop(0.5, "#7c3aed");
      innerGrad.addColorStop(1, "#4c1d95");
      ctx.fillStyle = innerGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(216,180,254,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center label
      ctx.fillStyle = "#f3e8ff";
      ctx.font = "bold 10px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("God/", cx, cy - 3);
      ctx.fillText("Nature", cx, cy + 9);

      // Draw nodes
      nodePositions.forEach((node) => {
        const isActive = active === node.id;
        const isSelected = selectedConcept === node.id;
        const r = isActive ? 20 : 16;

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
        glow.addColorStop(0, `rgba(185,112,255,${isActive ? 0.4 : 0.15})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const nGrad = ctx.createRadialGradient(node.x - 4, node.y - 4, 2, node.x, node.y, r);
        nGrad.addColorStop(0, isSelected ? "#e9d5ff" : "#a78bfa");
        nGrad.addColorStop(1, isSelected ? "#7c3aed" : "#4c1d95");
        ctx.fillStyle = nGrad;
        ctx.fill();
        ctx.strokeStyle = isActive ? "#e9d5ff" : "rgba(167,139,250,0.6)";
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 5 + 3 * Math.abs(Math.sin(pulseRef.current)), 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(216,180,254,0.5)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Floating particles along threads
      const t = (pulseRef.current * 0.3) % 1;
      nodePositions.forEach((node, i) => {
        nodePositions.forEach((other, j) => {
          if (j <= i) return;
          const isActive = active && (node.id === active || other.id === active);
          if (!active || isActive) {
            const pt = (t + i * 0.15 + j * 0.07) % 1;
            const px = node.x + (cx * 0.4 + node.x * 0.6 - node.x) * pt;
            const py = node.y + (cy * 0.4 + node.y * 0.6 - node.y) * pt;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(216,180,254,${active && isActive ? 0.9 : 0.3})`;
            ctx.fill();
          }
        });
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [selectedConcept, hoveredConcept]);

  const getNodeScreenPos = (sector) => {
    const angle = (sector.angle * Math.PI) / 180 + rotation;
    return {
      x: cx + orbitR * Math.cos(angle),
      y: cy + orbitR * Math.sin(angle)
    };
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const cx2 = mx * scaleX;
    const cy2 = my * scaleY;

    let found = null;
    sectors.forEach((s) => {
      const angle = (s.angle * Math.PI) / 180 + rotation;
      const nx = cx + orbitR * Math.cos(angle);
      const ny = cy + orbitR * Math.sin(angle);
      const dist = Math.sqrt((cx2 - nx) ** 2 + (cy2 - ny) ** 2);
      if (dist < 24) found = s.id;
    });

    if (found) {
      setSelectedConcept(selectedConcept === found ? null : found);
    } else {
      setSelectedConcept(null);
    }
  };

  const handleCanvasMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = canvasWidth / rect.width;
    const scaleY = canvasHeight / rect.height;
    const cx2 = mx * scaleX;
    const cy2 = my * scaleY;

    let found = null;
    sectors.forEach((s) => {
      const angle = (s.angle * Math.PI) / 180 + rotation;
      const nx = cx + orbitR * Math.cos(angle);
      const ny = cy + orbitR * Math.sin(angle);
      const dist = Math.sqrt((cx2 - nx) ** 2 + (cy2 - ny) ** 2);
      if (dist < 28) found = s.id;
    });
    setHoveredConcept(found);
  };

  const selectedSector = sectors.find((s) => s.id === selectedConcept);
  const [echoesBtnHover, setEchoesBtnHover] = useState(false);
  const [hoveredEcho, setHoveredEcho] = useState(null);

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "radial-gradient(ellipse at center, #1e0a3c 0%, #0a0612 50%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "40px 24px",
      color: "#e9d5ff"
    }}>
      <div style={{ maxWidth: "min(90vw, 760px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 8 }}>
            Part 21 of 21 — Final Integration
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 26px)", fontWeight: "bold", color: "#f3e8ff", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            The Unity of Spinoza's System
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.6vw, 14px)", color: "#c4b5fd", lineHeight: 1.7, maxWidth: "min(100%, 580px)", margin: "0 auto" }}>
            The true genius of Spinoza's achievement is the systematic unity that integrates metaphysics, epistemology, psychology, ethics, and politics into a single coherent vision where every element illuminates every other.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(109,40,217,0.08)",
          border: "1px solid rgba(109,40,217,0.3)",
          borderLeft: "4px solid #6D28D9",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px, 1.6vw, 14px)", lineHeight: 1.8, color: "#ddd6fe" }}>
            The survey of contemporary relevance raised the question of whether Spinoza's system truly coheres as a unified whole — and what is the ultimate significance of his philosophical achievement across four centuries. Does the edifice hold together, or does systematic ambition mask irresolvable fractures between its parts?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15,5,30,0.8)",
          border: "1px solid rgba(109,40,217,0.3)",
          borderRadius: 12,
          padding: "28px 24px",
          marginBottom: 28
        }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#a78bfa", letterSpacing: 1, marginBottom: 6 }}>
              The Integrated System
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>
              Click any node to illuminate its connections across all dimensions of Spinoza's philosophy.
            </p>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={() => setHoveredConcept(null)}
              style={{
                cursor: hoveredConcept ? "pointer" : "default",
                maxWidth: "100%",
                borderRadius: 8,
                width: canvasWidth,
                height: canvasHeight,
              }}
            />

            {/* Sector labels overlay */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {sectors.map((s) => {
                const angle = (s.angle * Math.PI) / 180 + rotation;
                const lx = cx + (orbitR + 38) * Math.cos(angle);
                const ly = cy + (orbitR + 38) * Math.sin(angle);
                const isActive = selectedConcept === s.id || hoveredConcept === s.id;
                const canvasRect = canvasRef.current ? canvasRef.current.getBoundingClientRect() : { width: canvasWidth, height: canvasHeight };
                const scaleX = canvasRect.width / canvasWidth;
                const scaleY = canvasRect.height / canvasHeight;
                return (
                  <div
                    key={s.id}
                    style={{
                      position: "absolute",
                      left: lx * scaleX - 45,
                      top: ly * scaleY - 12,
                      width: 90,
                      textAlign: "center",
                      pointerEvents: "none",
                      transition: "opacity 0.3s"
                    }}
                  >
                    <div style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: isActive ? "#f3e8ff" : "#c4b5fd",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      textShadow: isActive ? "0 0 12px rgba(167,139,250,0.9)" : "none"
                    }}>
                      {s.symbol} {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node detail panel */}
          {selectedSector && (
            <div style={{
              marginTop: 20,
              background: "rgba(109,40,217,0.12)",
              border: "1px solid rgba(109,40,217,0.4)",
              borderRadius: 8,
              padding: "18px 20px",
              transition: "all 0.3s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 20, color: "#c084fc" }}>{selectedSector.symbol}</span>
                <div style={{ fontSize: 15, fontWeight: "bold", color: "#f3e8ff" }}>
                  {selectedSector.label}
                </div>
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: 13, color: "#ddd6fe", lineHeight: 1.8 }}>
                {selectedSector.description}
              </p>
              <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: 1 }}>
                INTERCONNECTS WITH: {selectedSector.connections.map(c =>
                  sectors.find(s => s.id === c)?.label
                ).join(" · ")}
              </div>
            </div>
          )}

          {!selectedSector && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {sectors.map((s) => {
                  const isH = hoveredConcept === s.id;
                  return (
                    <button
                      key={s.id}
                      onMouseEnter={() => setHoveredConcept(s.id)}
                      onMouseLeave={() => setHoveredConcept(null)}
                      onClick={() => setSelectedConcept(s.id)}
                      style={{
                        background: isH ? "rgba(109,40,217,0.35)" : "rgba(109,40,217,0.15)",
                        border: `1px solid ${isH ? "#a78bfa" : "rgba(109,40,217,0.4)"}`,
                        borderRadius: 20,
                        padding: "6px 14px",
                        color: isH ? "#f3e8ff" : "#c4b5fd",
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "Georgia, serif",
                        transition: "all 0.2s",
                        boxShadow: isH ? "0 0 12px rgba(109,40,217,0.4)" : "none"
                      }}
                    >
                      {s.symbol} {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Core argument prose */}
          <div style={{
            marginTop: 24,
            borderTop: "1px solid rgba(109,40,217,0.2)",
            paddingTop: 20
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 12 }}>
              The Systematic Integration
            </div>
            <p style={{ fontSize: 13, color: "#ddd6fe", lineHeight: 1.85, margin: "0 0 12px 0" }}>
              Spinoza's substance monism does not merely assert unity — it demonstrates it geometrically. By establishing that mind and body are two attributes of a single substance, that God is identical with Nature, and that human beings are finite modes of infinite power, every apparent dualism dissolves into aspects of one reality. The system does not merely avoid contradiction; it actively illuminates each domain through the others.
            </p>
            <p style={{ fontSize: 13, color: "#ddd6fe", lineHeight: 1.85, margin: 0 }}>
              The same conatus that drives psychological striving becomes, when properly understood through reason, the foundation of ethical virtue and political solidarity. Epistemology is not separate from ethics — adequate knowledge just is active, free existence. Politics is not separate from psychology — the democratic community is the social form in which individual rational power is maximally amplified. And the contemplative summit, the intellectual love of God, is not otherworldly escape but the deepest possible engagement with the one substance that is everything there is.
            </p>
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(109,40,217,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredKc ? 16 : 0 }}>
            {[
              { id: "systematic_unity", label: "Systematic Unity", desc: "Every part of Spinoza's system entails every other. Metaphysics grounds psychology, which grounds ethics, which grounds politics. The system does not merely avoid contradiction — it uses each domain to illuminate the others, so that understanding one element deepens understanding of all." },
              { id: "substance_monism", label: "Substance Monism", desc: "There is one infinite substance, God/Nature, of which minds and bodies are two complete descriptive frameworks. This dissolves the mind-body problem by denying that two substances ever needed to interact — they are the same reality described in different but equally complete ways." },
              { id: "conatus", label: "Conatus", desc: "The striving to persist and increase power of acting is the essential nature of every finite mode. The same drive that generates passive bondage becomes, when understood through reason, the source of active virtue, political cooperation, and intellectual joy." },
              { id: "adequate_knowledge", label: "Adequate Knowledge", desc: "Knowledge that grasps its own causes generates active affects — emotions that flow from within rather than being imposed from without. Adequate knowledge is simultaneously an epistemic and ethical achievement: to understand truly is already to be partly free." },
              { id: "active_freedom", label: "Active Freedom", desc: "Freedom is not contra-causal escape from determination but self-determination through one's deepest nature. The free person is maximally expressive of what they essentially are — not maximally unconstrained but maximally self-authored within the necessities of their own nature." },
              { id: "intellectual_love", label: "Intellectual Love", desc: "The mind's highest blessedness: understanding one's place in the whole of God/Nature, recognizing the eternal necessity of all things, and finding in that recognition not resignation but the deepest possible joy — amor intellectualis Dei, love of the infinite through understanding." },
            ].map(c => (
              <div key={c.id} onClick={() => setHoveredKc(hoveredKc === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredKc === c.id ? "#6D28D9" : "rgba(109,40,217,0.1)",
                  border: `1px solid ${hoveredKc === c.id ? "#a78bfa" : "rgba(109,40,217,0.35)"}`,
                  borderRadius: 20, fontSize: 12, cursor: "pointer",
                  color: hoveredKc === c.id ? "#f0ead8" : "#c4b5fd", transition: "all 0.2s" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredKc && (
            <div style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(109,40,217,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#a78bfa", marginBottom: 8 }}>
                {[{ id: "systematic_unity", label: "Systematic Unity" }, { id: "substance_monism", label: "Substance Monism" }, { id: "conatus", label: "Conatus" }, { id: "adequate_knowledge", label: "Adequate Knowledge" }, { id: "active_freedom", label: "Active Freedom" }, { id: "intellectual_love", label: "Intellectual Love" }].find(c => c.id === hoveredKc)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {[
                  { id: "systematic_unity", desc: "Every part of Spinoza's system entails every other. Metaphysics grounds psychology, which grounds ethics, which grounds politics. The system does not merely avoid contradiction — it uses each domain to illuminate the others, so that understanding one element deepens understanding of all." },
                  { id: "substance_monism", desc: "There is one infinite substance, God/Nature, of which minds and bodies are two complete descriptive frameworks. This dissolves the mind-body problem by denying that two substances ever needed to interact — they are the same reality described in different but equally complete ways." },
                  { id: "conatus", desc: "The striving to persist and increase power of acting is the essential nature of every finite mode. The same drive that generates passive bondage becomes, when understood through reason, the source of active virtue, political cooperation, and intellectual joy." },
                  { id: "adequate_knowledge", desc: "Knowledge that grasps its own causes generates active affects — emotions that flow from within rather than being imposed from without. Adequate knowledge is simultaneously an epistemic and ethical achievement: to understand truly is already to be partly free." },
                  { id: "active_freedom", desc: "Freedom is not contra-causal escape from determination but self-determination through one's deepest nature. The free person is maximally expressive of what they essentially are — not maximally unconstrained but maximally self-authored within the necessities of their own nature." },
                  { id: "intellectual_love", desc: "The mind's highest blessedness: understanding one's place in the whole of God/Nature, recognizing the eternal necessity of all things, and finding in that recognition not resignation but the deepest possible joy — amor intellectualis Dei, love of the infinite through understanding." },
                ].find(c => c.id === hoveredKc)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(76,29,149,0.08)",
          border: "1px solid rgba(139,92,246,0.25)",
          borderLeft: "4px solid #8B5CF6",
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: 14, lineHeight: 1.8, color: "#ddd6fe" }}>
            Spinoza's system itself — with its necessitarianism, its impersonal immortality, its dissolution of traditional free will — remains deeply challenging and not fully resolved. The very internal coherence that makes the system so impressive raises a pointed question: if every element of the system supports every other element, does this mean all its conclusions must be accepted as a package, or are there genuine tensions that require further philosophical development? Can one embrace the naturalistic psychology without the hard necessitarianism? Can one affirm the political vision without the metaphysical substance monism that grounds it?
          </p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#c4b5fd", fontStyle: "italic" }}>
            This pressure forces the next development: any serious engagement with Spinoza must either accept the systematic unity as genuinely illuminating — which means confronting its most challenging implications — or explain precisely where and why the threads connecting the system's parts fall short of genuine entailment.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(15,5,30,0.7)",
          border: "1px solid rgba(109,40,217,0.25)",
          borderRadius: 8,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={() => setEchoesBtnHover(true)}
            onMouseLeave={() => setEchoesBtnHover(false)}
            style={{
              width: "100%",
              background: echoesBtnHover ? "rgba(109,40,217,0.15)" : "transparent",
              border: "none",
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              transition: "background 0.2s"
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color="#a78bfa" />
              : <ChevronDown size={16} color="#a78bfa" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px" }}>
              <div style={{ borderTop: "1px solid rgba(109,40,217,0.2)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    title: "Against Reductive Specialization",
                    text: "Spinoza's integrated system offers a model for fields that have fragmented into narrow specializations — the humanities, the sciences, philosophy itself. His achievement suggests that the deepest understanding requires seeing how psychological, ethical, political, and metaphysical dimensions of a problem form a coherent whole rather than separate territories."
                  },
                  {
                    title: "Individual and Collective Flourishing",
                    text: "The Spinozist insight that personal development and social justice are not merely compatible but mutually reinforcing resonates powerfully in contemporary debates. Neither purely individualist nor purely collectivist, his vision shows how the rational development of each person requires, and contributes to, the rational development of all."
                  },
                  {
                    title: "Philosophy as Transformative Practice",
                    text: "Against the reduction of philosophy to technical puzzle-solving or cultural commentary, Spinoza's system embodies the ancient understanding of philosophy as a way of life — not merely a set of propositions to be believed, but a transformative engagement with the deepest questions of human existence that genuinely changes how one lives and acts in the world."
                  }
                ].map((echo) => (
                  <div key={echo.title} style={{
                    borderLeft: "3px solid #6D28D9",
                    borderRadius: "0 6px 6px 0",
                    background: "#6D28D90a",
                    padding: "14px 18px",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#c084fc", marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.75 }}>
                      {echo.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, color: "#6b21a8", fontSize: 11, letterSpacing: 2 }}>
          — SPINOZA'S ETHICS · SUB SPECIE AETERNITATIS —
        </div>
      </div>
    </div>
  );
}

const vizMap = {
  "spinoza_introduction": SpinozaIntroduction,
  "making_of_revolutionary_mind": MakingOfRevolutionaryMind,
  "revolutionary_metaphysics_god_or_nature": RevolutionaryMetaphysicsGodOrNature,
  "architecture_of_reality_attributes_modes": ArchitectureOfRealityAttributesModes,
  "unity_of_mind_and_body": UnityOfMindAndBody,
  "ladder_of_knowledge": LadderOfKnowledge,
  "conatus_essential_drive": ConatusEssentialDrive,
  "emotional_life_passion_to_action": EmotionalLifePassionToAction,
  "freedom_within_necessity": FreedomWithinNecessity,
  "art_of_living_ethics_flourishing": ArtOfLivingEthicsFlourishing,
  "political_vision_democracy_liberation": PoliticalVisionDemocracyLiberation,
  "critique_of_religion_scripture": CritiqueOfReligionScripture,
  "miracles_prophecy_natural_order": MiraclesProphecyNaturalOrder,
  "social_contract_natural_right": SocialContractNaturalRight,
  "education_transformation_society": EducationTransformationSociety,
  "problem_of_evil_suffering": ProblemOfEvilSuffering,
  "eternity_minds_immortality": EternityMindsImmortality,
  "geometric_method_demonstration": GeometricMethodDemonstration,
  "spinoza_influence_later_philosophy": SpinozaInfluenceLaterPhilosophy,
  "contemporary_relevance_modern_applications": ContemporaryRelevanceModernApplications,
  "unity_of_spinozas_system_final_integration": UnityOfSpinozasSystemFinalIntegration
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