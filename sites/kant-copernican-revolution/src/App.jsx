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
    id: "kant_revolutionary_introduction",
    name: "The Copernican Revolution in Philosophy",
    subtitle: "Kant dismantled 2,000 years of philosophical assumptions by revealing that the mind actively constructs rather than passively mirrors reality.",
    part: 1,
  },
  {
    id: "making_of_revolutionary_mind",
    name: "The Making of a Revolutionary Mind",
    subtitle: "Kant's intellectual formation \u2014 shaped by Pietism, Newton, Hume, and years of solitary reflection \u2014 planted the seeds of his critical synthesis.",
    part: 2,
  },
  {
    id: "critical_turn_first_critique",
    name: "The Critical Turn and the First Critique",
    subtitle: "The Critique of Pure Reason asked how synthetic a priori knowledge is possible and discovered that the mind imposes its own forms and categories on raw experience.",
    part: 3,
  },
  {
    id: "space_time_forms_of_intuition",
    name: "Space and Time as Forms of Intuition",
    subtitle: "Kant argued that space and time are not features of mind-independent reality but the necessary forms through which human sensibility must represent any object.",
    part: 4,
  },
  {
    id: "categories_logic_of_experience",
    name: "The Categories and the Logic of Experience",
    subtitle: "Kant derived twelve pure concepts of understanding from the logical forms of judgment, showing how the mind organizes intuitions into coherent experience of objects.",
    part: 5,
  },
  {
    id: "transcendental_deduction_unity",
    name: "The Transcendental Deduction and the Unity of Experience",
    subtitle: "Kant proved that the categories must necessarily apply to all possible experience by showing that the same synthesis producing unified self-consciousness also constitutes objective experience.",
    part: 6,
  },
  {
    id: "phenomena_noumena_limits_of_knowledge",
    name: "Phenomena, Noumena, and the Limits of Knowledge",
    subtitle: "The distinction between appearances and things-in-themselves marks the absolute boundary of human knowledge while preserving a realm for moral freedom.",
    part: 7,
  },
  {
    id: "antinomies_illusions_pure_reason",
    name: "The Antinomies and the Illusions of Pure Reason",
    subtitle: "When reason attempts to answer questions about the world as a whole, it inevitably produces contradictions \u2014 revealing both the power and the necessary limits of rational thought.",
    part: 8,
  },
  {
    id: "transition_to_practical_philosophy",
    name: "The Transition to Practical Philosophy",
    subtitle: "The completion of theoretical philosophy left a profound gap between the natural world and the moral world that only a new investigation of practical reason could fill.",
    part: 9,
  },
  {
    id: "categorical_imperative_foundation_morality",
    name: "The Categorical Imperative and the Foundation of Morality",
    subtitle: "Kant derived the supreme principle of morality from pure practical reason alone, yielding three equivalent formulations that together define what it means to act morally.",
    part: 10,
  },
  {
    id: "freedom_autonomy_goodwill",
    name: "Freedom, Autonomy, and the Good Will",
    subtitle: "Kant's moral philosophy grounds human dignity in the capacity for autonomous self-legislation and identifies the good will as the only unconditionally valuable thing.",
    part: 11,
  },
  {
    id: "critique_practical_reason_moral_psychology",
    name: "The Critique of Practical Reason and Moral Psychology",
    subtitle: "The second Critique completed Kant's account of practical reason by analyzing moral feeling, the psychology of duty versus inclination, and the nature of virtue as ongoing moral struggle.",
    part: 12,
  },
  {
    id: "postulates_god_freedom_immortality",
    name: "The Postulates of Practical Reason: God, Freedom, and Immortality",
    subtitle: "Practical reason must postulate freedom, immortality, and God's existence not as theoretical knowledge but as rational requirements for making moral commitment coherent.",
    part: 13,
  },
  {
    id: "critique_of_judgment_bridging_nature_freedom",
    name: "The Critique of Judgment: Bridging Nature and Freedom",
    subtitle: "The third Critique discovered that reflective judgment \u2014 operating through the principle of natural purposiveness \u2014 mediates between the theoretical and practical domains Kant had established.",
    part: 14,
  },
  {
    id: "aesthetic_judgment_beautiful",
    name: "Aesthetic Judgment and the Beautiful",
    subtitle: "Beauty is neither an objective property nor a mere subjective preference but a universally communicable feeling arising from the harmonious free play of imagination and understanding.",
    part: 15,
  },
  {
    id: "sublime_limits_of_imagination",
    name: "The Sublime and the Limits of Imagination",
    subtitle: "The sublime begins with the overwhelming failure of imagination before vast magnitudes or mighty forces, then transforms into awareness of our supersensible rational and moral nature.",
    part: 16,
  },
  {
    id: "genius_art_aesthetic_ideas",
    name: "Genius, Art, and Aesthetic Ideas",
    subtitle: "Kant's theory of genius explains how original artworks transcend conscious intention through nature's gift, expressing aesthetic ideas that communicate more than any concept can contain.",
    part: 17,
  },
  {
    id: "teleology_purposiveness_of_nature",
    name: "Teleology and the Purposiveness of Nature",
    subtitle: "Organisms cannot be fully understood through mechanical principles alone; reflective teleological judgment provides a regulative framework for biological investigation without positing non-physical causes.",
    part: 18,
  },
  {
    id: "political_philosophy_perpetual_peace",
    name: "Political Philosophy and the Ideal of Perpetual Peace",
    subtitle: "Kant grounded legitimate political authority in the protection of innate human freedom and envisioned a world federation of republican states as both a moral duty and a practical possibility.",
    part: 19,
  },
  {
    id: "religion_within_boundaries_of_reason",
    name: "Religion Within the Boundaries of Reason",
    subtitle: "Kant reconstructed religious belief by grounding it in moral experience rather than theoretical argument, reinterpreting traditional doctrines as symbols of moral truths.",
    part: 20,
  },
  {
    id: "unity_critical_system_kants_legacy",
    name: "The Unity of the Critical System and Kant's Legacy",
    subtitle: "The three Critiques form a complete and systematic account of human reason in its theoretical, practical, and aesthetic employments \u2014 and their influence continues across philosophy, science, politics, and culture.",
    part: 21,
  }
];

const accentMap = {
  "kant_revolutionary_introduction": "#1A6B8A",
  "making_of_revolutionary_mind": "#5C4A1E",
  "critical_turn_first_critique": "#2D6A4F",
  "space_time_forms_of_intuition": "#7B5EA7",
  "categories_logic_of_experience": "#1B4F72",
  "transcendental_deduction_unity": "#0D4C2E",
  "phenomena_noumena_limits_of_knowledge": "#4A1942",
  "antinomies_illusions_pure_reason": "#8B1A1A",
  "transition_to_practical_philosophy": "#B5651D",
  "categorical_imperative_foundation_morality": "#1D5C8A",
  "freedom_autonomy_goodwill": "#3D5A2E",
  "critique_practical_reason_moral_psychology": "#2C3E7A",
  "postulates_god_freedom_immortality": "#6B4C9A",
  "critique_of_judgment_bridging_nature_freedom": "#2A7D4F",
  "aesthetic_judgment_beautiful": "#D4A017",
  "sublime_limits_of_imagination": "#4A2060",
  "genius_art_aesthetic_ideas": "#C0392B",
  "teleology_purposiveness_of_nature": "#27AE60",
  "political_philosophy_perpetual_peace": "#2980B9",
  "religion_within_boundaries_of_reason": "#884EA0",
  "unity_critical_system_kants_legacy": "#E8A020"
};

const bgMap = {
  "kant_revolutionary_introduction": "awakening dawn",
  "making_of_revolutionary_mind": "forge fire",
  "critical_turn_first_critique": "crystalline clarity",
  "space_time_forms_of_intuition": "geometric twilight",
  "categories_logic_of_experience": "ordered cosmos",
  "transcendental_deduction_unity": "deep certainty",
  "phenomena_noumena_limits_of_knowledge": "volcanic tension",
  "antinomies_illusions_pure_reason": "volcanic tension",
  "transition_to_practical_philosophy": "threshold crossing",
  "categorical_imperative_foundation_morality": "moral clarity",
  "freedom_autonomy_goodwill": "sovereign light",
  "critique_practical_reason_moral_psychology": "stellar solemnity",
  "postulates_god_freedom_immortality": "twilight uncertainty",
  "critique_of_judgment_bridging_nature_freedom": "verdant mediation",
  "aesthetic_judgment_beautiful": "luminous harmony",
  "sublime_limits_of_imagination": "volcanic awe",
  "genius_art_aesthetic_ideas": "creative fire",
  "teleology_purposiveness_of_nature": "organic growth",
  "political_philosophy_perpetual_peace": "civic horizon",
  "religion_within_boundaries_of_reason": "sacred contemplation",
  "unity_critical_system_kants_legacy": "monumental clarity"
};

// ─── Part 1: The Copernican Revolution in Philosophy ───
function KantRevolutionaryIntroduction() {
  const [activeView, setActiveView] = useState("old");
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [lightPosition, setLightPosition] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  const concepts = [
    { id: "copernican", label: "Copernican Revolution", color: "#1A6B8A", desc: "Just as Copernicus shifted the center of the solar system from Earth to the Sun, Kant shifted the center of knowledge from external reality to the human mind — a revolution so profound it reordered every philosophical question that followed." },
    { id: "active_mind", label: "Active Mind", color: "#2A8BA0", desc: "The mind is not a blank slate or passive mirror. It brings its own structures — space, time, causality — that shape every experience before we're even aware of it. Knowledge is a collaboration between mind and world." },
    { id: "dual_nature", label: "Dual Human Nature", color: "#3AABBA", desc: "Humans uniquely inhabit two realms: the natural world governed by physical laws we cannot escape, and the moral world of rational self-governance, where we author our own obligations through reason." },
    { id: "dignity", label: "Human Dignity", color: "#1A6B8A", desc: "Because humans can govern themselves by reason, they possess an inherent dignity that mere things lack. This is the philosophical bedrock of rights, ethics, and Kant's vision of perpetual world peace." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const drawFrame = (t) => {
      ctx.clearRect(0, 0, W, H);

      if (activeView === "old") {
        // Draw mirror scene
        const mirrorX = W / 2;
        const mirrorTop = 20;
        const mirrorH = H - 40;

        // Incoming light rays (straight, parallel)
        ctx.strokeStyle = "#F0C060";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 7; i++) {
          const y = 30 + i * (mirrorH / 7);
          const phase = Math.sin(t * 0.04 + i * 0.5) * 3;
          ctx.globalAlpha = 0.6 + 0.3 * Math.sin(t * 0.03 + i);
          ctx.beginPath();
          ctx.moveTo(20, y + phase);
          ctx.lineTo(mirrorX - 20, y + phase);
          // Arrow
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(mirrorX - 28, y + phase - 5);
          ctx.lineTo(mirrorX - 20, y + phase);
          ctx.lineTo(mirrorX - 28, y + phase + 5);
          ctx.stroke();
        }

        // Reflected rays (symmetric, same y)
        ctx.strokeStyle = "#A0D0F0";
        for (let i = 0; i < 7; i++) {
          const y = 30 + i * (mirrorH / 7);
          const phase = Math.sin(t * 0.04 + i * 0.5) * 3;
          ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 0.03 + i);
          ctx.beginPath();
          ctx.moveTo(mirrorX + 20, y + phase);
          ctx.lineTo(W - 20, y + phase);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(W - 28, y + phase - 5);
          ctx.lineTo(W - 20, y + phase);
          ctx.lineTo(W - 28, y + phase + 5);
          ctx.stroke();
        }

        // Mirror surface
        ctx.globalAlpha = 1;
        const grad = ctx.createLinearGradient(mirrorX - 8, 0, mirrorX + 8, 0);
        grad.addColorStop(0, "#1A3A4A");
        grad.addColorStop(0.5, "#A0D8F0");
        grad.addColorStop(1, "#1A3A4A");
        ctx.fillStyle = grad;
        ctx.fillRect(mirrorX - 6, mirrorTop, 12, mirrorH);
        ctx.strokeStyle = "#A0D8F0";
        ctx.lineWidth = 2;
        ctx.strokeRect(mirrorX - 6, mirrorTop, 12, mirrorH);

        // Labels
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#F0C060";
        ctx.font = "12px Georgia, serif";
        ctx.fillText("REALITY", 24, H - 8);
        ctx.fillStyle = "#A0D8F0";
        ctx.fillText("REFLECTION (identical)", mirrorX + 24, H - 8);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#A0D8F0";
        ctx.font = "10px Georgia, serif";
        ctx.fillText("MIRROR", mirrorX - 14, mirrorTop - 6);

      } else {
        // Draw prism / active mind scene
        const prismCX = W / 2;
        const prismCY = H / 2;

        // Incoming white beam
        const beamY = H / 2;
        const prismLeftEdge = prismCX - 55;

        // Animated shimmer on incoming beam
        const grad0 = ctx.createLinearGradient(20, beamY - 10, prismLeftEdge, beamY + 10);
        grad0.addColorStop(0, "#F8E080");
        grad0.addColorStop(1, "#F0C060");
        ctx.fillStyle = grad0;
        ctx.globalAlpha = 0.7 + 0.2 * Math.sin(t * 0.05);
        ctx.beginPath();
        ctx.moveTo(20, beamY - 8);
        ctx.lineTo(prismLeftEdge, beamY - 6);
        ctx.lineTo(prismLeftEdge, beamY + 6);
        ctx.lineTo(20, beamY + 8);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = "#F0C060";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Prism shape (triangle)
        ctx.globalAlpha = 1;
        const prismPoints = [
          { x: prismCX - 50, y: prismCY + 55 },
          { x: prismCX + 50, y: prismCY + 55 },
          { x: prismCX, y: prismCY - 55 },
        ];
        const prismGrad = ctx.createLinearGradient(prismCX - 50, prismCY - 55, prismCX + 50, prismCY + 55);
        prismGrad.addColorStop(0, "#0D3A50");
        prismGrad.addColorStop(0.5, "#1A6B8A");
        prismGrad.addColorStop(1, "#0D3A50");
        ctx.fillStyle = prismGrad;
        ctx.beginPath();
        ctx.moveTo(prismPoints[0].x, prismPoints[0].y);
        ctx.lineTo(prismPoints[1].x, prismPoints[1].y);
        ctx.lineTo(prismPoints[2].x, prismPoints[2].y);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#3AABBA";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Prism label
        ctx.fillStyle = "#A0E0F0";
        ctx.font = "bold 11px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("THE MIND", prismCX, prismCY + 8);
        ctx.font = "10px Georgia, serif";
        ctx.fillText("(active structures)", prismCX, prismCY + 22);

        // Dispersed rays: space, time, causality, etc.
        const rays = [
          { label: "Space", color: "#FF6B6B", angle: -50 },
          { label: "Time", color: "#FFA056", angle: -30 },
          { label: "Causality", color: "#F0D060", angle: -10 },
          { label: "Unity", color: "#60D060", angle: 10 },
          { label: "Substance", color: "#60A0F0", angle: 30 },
          { label: "Necessity", color: "#C060F0", angle: 50 },
        ];

        const prismRightEdge = prismCX + 52;
        rays.forEach((ray, i) => {
          const rad = (ray.angle * Math.PI) / 180;
          const len = 100 + Math.abs(ray.angle) * 0.6;
          const ex = prismRightEdge + len * Math.cos(rad);
          const ey = prismCY + len * Math.sin(rad);
          const pulse = 0.7 + 0.25 * Math.sin(t * 0.04 + i * 1.1);
          ctx.globalAlpha = pulse;
          ctx.strokeStyle = ray.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(prismRightEdge, prismCY);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.globalAlpha = pulse * 0.9;
          ctx.fillStyle = ray.color;
          ctx.font = "11px Georgia, serif";
          ctx.textAlign = "left";
          if (ray.angle < 0) {
            ctx.fillText(ray.label, ex + 4, ey - 2);
          } else if (ray.angle === 0) {
            ctx.fillText(ray.label, ex + 4, ey + 4);
          } else {
            ctx.fillText(ray.label, ex + 4, ey + 10);
          }
        });

        ctx.globalAlpha = 0.65;
        ctx.fillStyle = "#F0C060";
        ctx.font = "12px Georgia, serif";
        ctx.textAlign = "left";
        ctx.fillText("RAW EXPERIENCE", 22, H - 8);
        ctx.fillStyle = "#A0E0F0";
        ctx.fillText("STRUCTURED KNOWLEDGE", prismRightEdge + 10, H - 8);
        ctx.globalAlpha = 1;
        ctx.textAlign = "left";
      }

      timeRef.current = t + 1;
      animFrameRef.current = requestAnimationFrame(() => drawFrame(timeRef.current));
    };

    drawFrame(timeRef.current);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeView]);

  const handleToggle = (view) => {
    if (view === activeView || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveView(view);
      setAnimating(false);
    }, 300);
  };

  const bgGradient = "radial-gradient(ellipse at 40% 30%, #0D3A50 0%, #061220 60%, #0a0a0f 100%)";

  return (
    <div style={{
      background: bgGradient,
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#D8EAF0",
      padding: "40px 24px",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 860, margin: "0 auto 36px auto" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#1A6B8A", textTransform: "uppercase", marginBottom: 10, opacity: 0.9 }}>
          Part 1 of 21 — Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "normal", margin: "0 0 12px 0", color: "#E8F4F8", lineHeight: 1.3 }}>
          The Copernican Revolution in Philosophy
        </h1>
        <p style={{ fontSize: 16, color: "#8AB8CC", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
          Kant dismantled 2,000 years of philosophical assumptions by revealing that the mind actively constructs rather than passively mirrors reality.
        </p>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{ maxWidth: 860, margin: "0 auto 32px auto" }}>
        <div style={{
          background: "rgba(10, 28, 40, 0.75)",
          border: "1px solid #1A6B8A",
          borderRadius: 12,
          padding: "28px 28px 24px 28px",
          boxShadow: "0 0 40px rgba(26, 107, 138, 0.18)",
        }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: "#8AB8CC", margin: 0, lineHeight: 1.7 }}>
              For two millennia, philosophers assumed the mind receives reality as it is — like a mirror faithfully reflecting what stands before it. Kant's revolutionary insight reversed this: the mind is not a mirror but an active organizer, imposing its own structures upon raw experience. Toggle between the two models below and explore what each implies.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, justifyContent: "center" }}>
            {[
              { id: "old", label: "The Old View: Mind as Mirror" },
              { id: "kant", label: "Kant's View: Mind as Prism" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleToggle(btn.id)}
                style={{
                  background: activeView === btn.id ? "#1A6B8A" : "rgba(26, 107, 138, 0.12)",
                  color: activeView === btn.id ? "#E8F4F8" : "#6A9BB0",
                  border: `1.5px solid ${activeView === btn.id ? "#3AABBA" : "#1A4A5A"}`,
                  borderRadius: 8,
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: 13,
                  fontWeight: activeView === btn.id ? "bold" : "normal",
                  transition: "all 0.3s ease",
                  boxShadow: activeView === btn.id ? "0 0 16px rgba(26, 107, 138, 0.5)" : "none",
                  letterSpacing: 0.4,
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.3s ease",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid rgba(26, 107, 138, 0.3)",
            background: "#040D14",
            display: "flex",
            justifyContent: "center",
          }}>
            <canvas
              ref={canvasRef}
              width={760}
              height={200}
              style={{ display: "block", maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* View Description */}
          <div style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(26, 107, 138, 0.1)",
            borderLeft: `3px solid #1A6B8A`,
            borderRadius: "0 6px 6px 0",
            minHeight: 64,
            transition: "opacity 0.3s ease",
            opacity: animating ? 0 : 1,
          }}>
            {activeView === "old" ? (
              <p style={{ margin: 0, fontSize: 14, color: "#A8C8D8", lineHeight: 1.8 }}>
                <strong style={{ color: "#E8F4F8" }}>The Passive Mirror Model:</strong> Reality exists "out there," fully formed and independent. The mind simply opens itself to receive reality's imprint. If our knowledge fails, we look more carefully or remove distortions. This model left philosophers unable to explain how universal truths — like mathematics or morality — could be known with certainty, because they could never be sure the mirror was perfectly clean.
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: "#A8C8D8", lineHeight: 1.8 }}>
                <strong style={{ color: "#E8F4F8" }}>The Active Prism Model:</strong> The mind doesn't passively receive — it actively structures. Space, time, and causality are not features of raw reality we discover; they are frameworks the mind imposes on every experience. Just as a prism disperses white light into its constituent colors, the mind disperses the flux of sensation into coherent, structured knowledge. This explains why mathematics and science work: they describe the mind's own structures, not a mysterious external world.
              </p>
            )}
          </div>

          {/* Core Argument Prose */}
          <div style={{
            marginTop: 28,
            padding: "20px 22px",
            background: "rgba(6, 18, 28, 0.7)",
            borderRadius: 8,
            border: "1px solid rgba(26, 107, 138, 0.2)",
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, color: "#1A6B8A", textTransform: "uppercase", marginBottom: 12 }}>
              Core Argument
            </div>
            <p style={{ margin: "0 0 12px 0", fontSize: 14, color: "#B0CCd8", lineHeight: 1.85 }}>
              Philosophers had spent two thousand years asking the wrong questions because they assumed the mind passively reflects reality. Every attempt to ground knowledge, morality, or science stumbled on the same hidden assumption: that truth is simply reality's reflection in an attentive mind. Kant showed that this assumption was the source of every unsolvable problem.
            </p>
            <p style={{ margin: "0 0 12px 0", fontSize: 14, color: "#B0CCD8", lineHeight: 1.85 }}>
              The mind, Kant argued, actively shapes every aspect of experience. Space and time are not containers the universe supplies — they are the mind's own lenses through which all experience is filtered. Causality is not something we observe in the world — it is a framework we bring to observation. This single insight unlocked a new foundation for ethics, aesthetics, and political philosophy simultaneously.
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#B0CCD8", lineHeight: 1.85 }}>
              And it revealed something profound about human beings specifically: we uniquely exist in two worlds. As bodies, we are subject to physical laws we cannot override. As rational agents, we govern ourselves by principles we author through reason — which is the philosophical root of dignity, rights, and Kant's prescient vision of perpetual peace through international law.
            </p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 860, margin: "0 auto 24px auto" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(26,107,138,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1A6B8A", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map((c) => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#1A6B8A" : "rgba(26,107,138,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#3a9abc" : "rgba(26,107,138,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7AAABB",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(26,107,138,0.08)",
              border: "1px solid rgba(26,107,138,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#1A6B8A", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{ maxWidth: 860, margin: "0 auto 24px auto" }}>
        <div style={{
          background: "rgba(10, 18, 28, 0.8)",
          border: "1px solid #2A5A6A",
          borderLeft: "4px solid #2A8BA0",
          borderRadius: 8,
          padding: "22px 26px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, color: "#2A8BA0", textTransform: "uppercase", marginBottom: 12 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 12px 0", fontSize: 14, color: "#9ABCCC", lineHeight: 1.85 }}>
            Kant's revolution raises a question more demanding than the ones it dissolves. If the mind actively constructs experience rather than receiving it, we need a rigorous account of exactly how this construction works. What, precisely, does the mind contribute? What does raw experience contribute? And where does the boundary fall between the world as we can ever know it and the world as it might exist independent of any mind?
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#9ABCCC", lineHeight: 1.85, fontStyle: "italic" }}>
            This pressure forces the next development: a systematic map of the mind's own architecture — a catalogue of the exact structures and categories the mind imposes, and the hard limit of what any human knower can ever reach.
          </p>
        </div>
      </div>

      {/* REAL-WORLD ECHOES PANEL */}
      <div style={{ maxWidth: 860, margin: "0 auto 40px auto" }}>
        <div style={{
          background: "rgba(10, 18, 28, 0.7)",
          border: "1px solid rgba(26, 107, 138, 0.3)",
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
              padding: "18px 26px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 2.5, color: "#1A6B8A", textTransform: "uppercase" }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={18} color="#1A6B8A" />
              : <ChevronDown size={18} color="#1A6B8A" />
            }
          </button>

          {echosOpen && (
            <div style={{ padding: "0 26px 24px 26px", borderTop: "1px solid rgba(26, 107, 138, 0.2)" }}>
              <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{
                  padding: "16px 20px",
                  background: "rgba(26, 107, 138, 0.08)",
                  borderLeft: "3px solid #1A6B8A",
                  borderRadius: "0 6px 6px 0",
                }}>
                  <div style={{ fontSize: 12, color: "#3AABBA", fontWeight: "bold", marginBottom: 8, letterSpacing: 0.5 }}>
                    Copernicus and the Heliocentric Revolution
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: "#8AACBC", lineHeight: 1.8 }}>
                    Copernicus didn't discover a new planet — he reinterpreted the same data by shifting the assumed center of the system. Kant did the same in philosophy: the same philosophical questions, the same human experiences, but reinterpreted once we move the mind to the center. Both revolutions showed that what appears obvious can be a hidden assumption that, once exposed, collapses entirely.
                  </p>
                </div>
                <div style={{
                  padding: "16px 20px",
                  background: "rgba(26, 107, 138, 0.08)",
                  borderLeft: "3px solid #2A8BA0",
                  borderRadius: "0 6px 6px 0",
                }}>
                  <div style={{ fontSize: 12, color: "#3AABBA", fontWeight: "bold", marginBottom: 8, letterSpacing: 0.5 }}>
                    International Law and the Vision of Perpetual Peace
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: "#8AACBC", lineHeight: 1.8 }}>
                    Kant's 1795 essay "Perpetual Peace" directly applied his philosophical revolution to international relations. Because rational beings share the same structures of reason, they share a foundation for universal moral and legal principles. The modern United Nations, international courts, and human rights frameworks are living descendants of this vision — imperfect, contested, but unmistakably Kantian in their aspiration.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: "#051820", letterSpacing: 1 }}>
          Part 1 of 21 — Kant's Critical Philosophy
        </div>
      </div>
    </div>
  );
}

// ─── Part 2: The Making of a Revolutionary Mind ───
function MakingOfRevolutionaryMind() {
  const [activeInfluence, setActiveInfluence] = useState(null);
  const [hoveredMoment, setHoveredMoment] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredInfluence, setHoveredInfluence] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const keyConcepts = [
    { id: "dogmatic_slumber", label: "Dogmatic Slumber", desc: "Kant's own phrase for his pre-critical complacency within rationalist metaphysics. Reading Hume awoke him to the problem that neither pure reason nor experience alone can justify our most fundamental beliefs about causation, necessity, and the external world — forcing him to seek a third path." },
    { id: "pre_critical", label: "Pre-Critical Period", desc: "The first two decades of Kant's intellectual career (roughly 1746–1770), during which he worked within the Wolffian rationalist tradition while increasingly incorporating Newtonian science. This period produced important scientific works but no definitive philosophical system, ending with the Inaugural Dissertation of 1770." },
    { id: "synthesis", label: "Synthesis of Traditions", desc: "Kant's unique position at the intersection of Pietist moral seriousness, Wolffian rationalist system-building, Newtonian empirical science, and Humean skepticism. Rather than choosing between them, he sought a framework that could explain how each tradition captured something real while remaining incomplete on its own." },
    { id: "causation", label: "Universal Law of Causation", desc: "The principle that every event has a cause — central to Newtonian physics and to ordinary experience. Hume argued this principle cannot be justified by logic (it is not analytically true) or by experience (experience only shows sequence, never necessity). Kant's entire Critical project can be read as a response to this challenge." },
    { id: "silent_decade", label: "The Silent Decade", desc: "The roughly nine years between Kant's Inaugural Dissertation (1770) and the Critique of Pure Reason (1781) during which he published almost nothing. Far from intellectual stagnation, this was a period of intensive private work as Kant developed the transcendental framework from scratch — forging one of philosophy's greatest achievements in silence." },
  ];

  const influences = [
    {
      id: "pietism",
      label: "Pietism",
      color: "#C4783A",
      x: 80,
      years: "1724–1740",
      icon: "✦",
      short: "Moral Seriousness",
      description: "Kant was raised in a devout Pietist household in Königsberg. This Protestant movement emphasized sincere inner faith over ritual, instilling in young Kant a deep sense of moral duty, personal integrity, and the primacy of conscience. Though he later distanced himself from its religious formalism, Pietism's moral seriousness became the bedrock of his ethics.",
      impact: "Gave Kant the conviction that morality must be grounded in something unconditional — not in pleasure, utility, or divine command, but in the structure of rational agency itself."
    },
    {
      id: "wolff",
      label: "Wolffian Rationalism",
      color: "#8B6914",
      x: 220,
      years: "1740–1755",
      icon: "◆",
      short: "Pure Reason",
      description: "At the University of Königsberg, Kant was trained in the tradition of Christian Wolff, the great systematizer of Leibnizian rationalism. Wolff believed that all genuine knowledge could be derived through pure logical analysis — that reason alone, working from clear and distinct concepts, could reveal the nature of God, the soul, and the cosmos.",
      impact: "Rationalism taught Kant the power of systematic thinking and the ambition to ground all knowledge in necessary truths — but it also showed him its limits when confronted with empirical reality."
    },
    {
      id: "newton",
      label: "Newtonian Physics",
      color: "#5C7A3A",
      x: 380,
      years: "1755–1762",
      icon: "⊙",
      short: "Universal Laws",
      description: "Newton's Principia represented a triumph: universal laws governing planetary motion, gravity, and matter expressed in elegant mathematics. Kant wrote his own early cosmological work — the Nebular Hypothesis — explaining the origin of the solar system through natural laws. For Kant, Newtonian science was certain knowledge that the empiricists could not fully explain.",
      impact: "If science gives us necessary, universal laws about nature, and experience alone cannot justify necessity or universality, then there must be something in the mind itself that contributes these features to our knowledge."
    },
    {
      id: "hume",
      label: "Humean Skepticism",
      color: "#3A5C7A",
      x: 560,
      years: "1762–1770",
      icon: "~",
      short: "Awakening",
      description: "David Hume's Enquiry Concerning Human Understanding struck Kant like lightning. Hume argued that our belief in causation — that every event has a cause — cannot be justified by either logic or experience. We observe sequence, never necessity. This threatened not just metaphysics but the foundations of Newtonian science itself.",
      impact: "This was Kant's 'awakening from dogmatic slumber.' Hume did not make Kant a skeptic — instead, it forced him to ask: how is scientific knowledge possible at all? The answer would require a revolution in philosophy."
    }
  ];

  const timelinePhases = [
    { label: "Childhood & Formation", start: 0, end: 0.22, year: "1724" },
    { label: "University Years", start: 0.22, end: 0.44, year: "1740" },
    { label: "Private Tutor Period", start: 0.44, end: 0.66, year: "1755" },
    { label: "Silent Decade", start: 0.66, end: 0.88, year: "1762" },
    { label: "Critique", start: 0.88, end: 1.0, year: "1781" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      color: ["#5C4A1E", "#C4783A", "#8B6914", "#3A4A5C"][Math.floor(Math.random() * 4)]
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const svgWidth = 760;
  const svgHeight = 320;
  const timelineY = 200;
  const timelineStartX = 40;
  const timelineEndX = 660;
  const timelineWidth = timelineEndX - timelineStartX;

  function getInfluenceX(inf) {
    return timelineStartX + (inf.x / 640) * timelineWidth;
  }

  function drawRiverPath(inf) {
    const x = getInfluenceX(inf);
    const startY = 30;
    const endY = timelineY - 8;
    const cp1Y = startY + (endY - startY) * 0.4;
    const cp2Y = startY + (endY - startY) * 0.7;
    return `M ${x} ${startY} C ${x} ${cp1Y}, ${x} ${cp2Y}, ${x} ${endY}`;
  }

  const humeX = getInfluenceX(influences[3]);
  const humeY = timelineY;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #2a1a08 0%, #1a1006 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8d5b0",
      padding: "0",
      position: "relative",
      overflow: "hidden"
    }}>
      <canvas ref={canvasRef} width={800} height={600} style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.3,
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#8B6914", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 2 of 21 — Kant's Critical Philosophy
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "normal", color: "#f0ddb0", margin: "0 0 8px 0", letterSpacing: "0.5px" }}>
            The Making of a Revolutionary Mind
          </h1>
          <p style={{ fontSize: "14px", color: "#a08050", margin: 0, fontStyle: "italic", lineHeight: "1.6" }}>
            Kant's intellectual formation — shaped by Pietism, Newton, Hume, and years of solitary reflection — planted the seeds of his critical synthesis.
          </p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#12100a",
          border: "1px solid #2a1f0a",
          borderLeft: "4px solid #5C4A1E",
          borderRadius: "6px",
          padding: "24px 28px",
          marginBottom: "28px",
          boxShadow: "0 4px 24px #00000080"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#5C4A1E", textTransform: "uppercase", marginBottom: "12px", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: "1.8", fontSize: "15px", color: "#c8b88a" }}>
            If the mind constructs experience, we need to understand where this constructive capacity came from and what philosophical tradition could possibly support such a radical claim. A mind that actively shapes reality rather than merely receives it — where does this idea come from? What pressures of thought forced it into existence?
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0f0d09",
          border: "1px solid #2a2010",
          borderRadius: "8px",
          padding: "28px 24px",
          marginBottom: "28px",
          boxShadow: "0 8px 40px #00000090"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#8B6914", textTransform: "uppercase", marginBottom: "8px" }}>
            Kant's Intellectual Formation
          </div>
          <p style={{ fontSize: "13px", color: "#806040", margin: "0 0 20px 0", fontStyle: "italic" }}>
            Click any influence stream to explore its content and impact on Kant's synthesis.
          </p>

          {/* SVG Timeline */}
          <div style={{ overflowX: "auto" }}>
            <svg width={svgWidth} height={svgHeight} style={{ display: "block", margin: "0 auto" }}>
              <defs>
                {influences.map(inf => (
                  <linearGradient key={inf.id} id={`grad-${inf.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={inf.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={inf.color} stopOpacity="0.2" />
                  </linearGradient>
                ))}
                <linearGradient id="timelineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3a2a10" />
                  <stop offset="60%" stopColor="#5C4A1E" />
                  <stop offset="100%" stopColor="#C4783A" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="humeGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Phase labels */}
              {timelinePhases.map((phase, i) => {
                const x1 = timelineStartX + phase.start * timelineWidth;
                const x2 = timelineStartX + phase.end * timelineWidth;
                const cx = (x1 + x2) / 2;
                return (
                  <g key={i}>
                    <line x1={x1} y1={timelineY - 20} x2={x1} y2={timelineY + 16}
                      stroke="#2a1f0a" strokeWidth="1" strokeDasharray="3,3" />
                    <text x={cx} y={timelineY + 38} textAnchor="middle"
                      fill="#5C4A1E" fontSize="9" fontFamily="Georgia, serif"
                      style={{ letterSpacing: "0.5px" }}>
                      {phase.label}
                    </text>
                    <text x={x1 + 3} y={timelineY + 50} textAnchor="middle"
                      fill="#3a2a10" fontSize="9" fontFamily="Georgia, serif">
                      {phase.year}
                    </text>
                  </g>
                );
              })}

              {/* Timeline track */}
              <rect x={timelineStartX} y={timelineY - 5} width={timelineWidth} height={10}
                rx="5" fill="url(#timelineGrad)" />

              {/* Kant label on timeline */}
              <text x={timelineStartX - 5} y={timelineY + 4} textAnchor="end"
                fill="#a08050" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">
                Kant
              </text>

              {/* Influence rivers */}
              {influences.map(inf => {
                const isActive = activeInfluence === inf.id;
                const isHovered = hoveredInfluence === inf.id;
                const x = getInfluenceX(inf);
                const path = drawRiverPath(inf);
                return (
                  <g key={inf.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveInfluence(activeInfluence === inf.id ? null : inf.id)}
                    onMouseEnter={() => setHoveredInfluence(inf.id)}
                    onMouseLeave={() => setHoveredInfluence(null)}>

                    {/* Glow layer */}
                    <path d={path} stroke={inf.color} strokeWidth={isActive || isHovered ? 10 : 6}
                      fill="none" opacity="0.15" filter="url(#glow)" />

                    {/* Main river */}
                    <path d={path} stroke={`url(#grad-${inf.id})`}
                      strokeWidth={isActive || isHovered ? 6 : 4}
                      fill="none" opacity={isActive || isHovered ? 1 : 0.6}
                      style={{ transition: "stroke-width 0.2s, opacity 0.2s" }} />

                    {/* Source bubble */}
                    <circle cx={x} cy={26} r={isActive || isHovered ? 18 : 14}
                      fill={inf.color} opacity={isActive || isHovered ? 0.9 : 0.6}
                      style={{ transition: "r 0.2s, opacity 0.2s" }} />
                    <text x={x} y={22} textAnchor="middle"
                      fill="#ffffff" fontSize="12" fontFamily="Georgia, serif">
                      {inf.icon}
                    </text>
                    <text x={x} y={31} textAnchor="middle"
                      fill="#ffffff" fontSize="7" fontFamily="Georgia, serif">
                      {inf.short}
                    </text>

                    {/* Label below bubble */}
                    <text x={x} y={58} textAnchor="middle"
                      fill={isActive || isHovered ? inf.color : "#806040"}
                      fontSize="10" fontFamily="Georgia, serif"
                      style={{ transition: "fill 0.2s", fontStyle: "italic" }}>
                      {inf.label}
                    </text>
                    <text x={x} y={70} textAnchor="middle"
                      fill="#4a3a20" fontSize="8" fontFamily="Georgia, serif">
                      {inf.years}
                    </text>

                    {/* Confluence dot on timeline */}
                    <circle cx={x} cy={timelineY}
                      r={isActive || isHovered ? 7 : 5}
                      fill={inf.color} opacity={isActive || isHovered ? 1 : 0.7}
                      style={{ transition: "r 0.2s" }} />
                  </g>
                );
              })}

              {/* Hume Awakening Marker */}
              <g
                onMouseEnter={() => setHoveredMoment(true)}
                onMouseLeave={() => setHoveredMoment(false)}
                style={{ cursor: "pointer" }}>
                <circle cx={humeX} cy={humeY} r={hoveredMoment ? 22 : 16}
                  fill="#1a2a3a" stroke="#3A5C7A" strokeWidth="2"
                  filter="url(#humeGlow)"
                  style={{ transition: "r 0.3s" }} />
                <text x={humeX} y={humeY - 4} textAnchor="middle"
                  fill="#7ab0d4" fontSize="14" fontFamily="Georgia, serif">
                  ★
                </text>
                <text x={humeX} y={humeY + 8} textAnchor="middle"
                  fill="#3A5C7A" fontSize="7" fontFamily="Georgia, serif">
                  Awaken
                </text>
              </g>

              {/* Synthesis arrow */}
              <g>
                <line x1={timelineEndX - 20} y1={timelineY} x2={timelineEndX + 10} y2={timelineY}
                  stroke="#C4783A" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x={timelineEndX + 14} y={timelineY + 4} fill="#C4783A"
                  fontSize="10" fontFamily="Georgia, serif">→ Critique</text>
              </g>

              {/* Hume hover tooltip */}
              {hoveredMoment && (
                <g>
                  <rect x={humeX - 160} y={timelineY - 110} width={280} height={90}
                    rx="6" fill="#0d1a24" stroke="#3A5C7A" strokeWidth="1.5" opacity="0.97" />
                  <text x={humeX - 150} y={timelineY - 90} fill="#7ab0d4"
                    fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                    "Awakening from Dogmatic Slumber"
                  </text>
                  <foreignObject x={humeX - 150} y={timelineY - 80} width={260} height={65}>
                    <div xmlns="http://www.w3.org/1999/xhtml"
                      style={{ fontSize: "10px", color: "#8ab0c8", fontFamily: "Georgia, serif", lineHeight: "1.5" }}>
                      Hume showed that causation cannot be derived from logic or observation. This awoke Kant from his comfortable acceptance of Wolffian rationalism. Rather than despair, Kant saw a task: explain how science is possible at all.
                    </div>
                  </foreignObject>
                </g>
              )}
            </svg>
          </div>

          {/* Active Influence Panel */}
          {activeInfluence && (() => {
            const inf = influences.find(i => i.id === activeInfluence);
            return (
              <div style={{
                marginTop: "20px",
                background: "#12100a",
                border: `1px solid ${inf.color}40`,
                borderLeft: `4px solid ${inf.color}`,
                borderRadius: "6px",
                padding: "20px 24px",
                animation: "fadeIn 0.3s ease"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "18px", marginRight: "10px" }}>{inf.icon}</span>
                    <span style={{ fontSize: "16px", color: inf.color, fontStyle: "italic" }}>{inf.label}</span>
                    <span style={{ fontSize: "11px", color: "#4a3a20", marginLeft: "10px" }}>{inf.years}</span>
                  </div>
                  <button
                    onClick={() => setActiveInfluence(null)}
                    style={{
                      background: "none", border: "none", color: "#5C4A1E",
                      cursor: "pointer", fontSize: "18px", padding: "0 4px",
                      fontFamily: "Georgia, serif"
                    }}>×</button>
                </div>
                <p style={{ margin: "0 0 12px 0", lineHeight: "1.75", fontSize: "14px", color: "#c8b88a" }}>
                  {inf.description}
                </p>
                <div style={{ borderTop: `1px solid ${inf.color}30`, paddingTop: "12px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", color: inf.color, textTransform: "uppercase", marginBottom: "6px" }}>
                    Impact on Kant's Synthesis
                  </div>
                  <p style={{ margin: 0, lineHeight: "1.7", fontSize: "13px", color: "#a09070", fontStyle: "italic" }}>
                    {inf.impact}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Key concepts row */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
            {[
              { label: "Dogmatic Slumber", color: "#3A5C7A" },
              { label: "Synthetic Approach", color: "#5C4A1E" },
              { label: "Wolffian System", color: "#8B6914" },
              { label: "Moral Seriousness", color: "#C4783A" },
              { label: "Newtonian Laws", color: "#5C7A3A" }
            ].map(concept => (
              <div key={concept.label} style={{
                background: `${concept.color}20`,
                border: `1px solid ${concept.color}60`,
                borderRadius: "4px",
                padding: "5px 12px",
                fontSize: "11px",
                color: concept.color,
                letterSpacing: "0.5px"
              }}>
                {concept.label}
              </div>
            ))}
          </div>

          {/* Synthesis explanation */}
          <div style={{
            marginTop: "20px",
            background: "#16120a",
            border: "1px solid #2a1f0a",
            borderRadius: "6px",
            padding: "18px 22px"
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#8B6914", textTransform: "uppercase", marginBottom: "10px" }}>
              The Collision That Produced a Synthesis
            </div>
            <p style={{ margin: 0, lineHeight: "1.8", fontSize: "14px", color: "#b0a080" }}>
              Kant did not inherit a single tradition — he sat at the intersection of all of them. Pietism gave him conscience; rationalism gave him system; Newton gave him the fact of universal scientific knowledge; and Hume gave him the problem that made all of it urgent. His nine years as a private tutor, removed from academic pressure, were not years of inactivity but of quiet, sustained synthesis — the intellectual forge in which the Critique was slowly hammered into shape.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(196,120,58,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4783A", marginBottom: "14px" }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: hoveredConcept ? "16px" : "0" }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#C4783A" : "rgba(196,120,58,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#d8956a" : "rgba(196,120,58,0.35)"}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#b07a50",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(196,120,58,0.08)",
              border: "1px solid rgba(196,120,58,0.3)",
              borderRadius: "6px",
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#C4783A", marginBottom: "8px" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.75", color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#12100a",
          border: "1px solid #2a1f0a",
          borderLeft: "4px solid #5C4A1E",
          borderRadius: "6px",
          padding: "24px 28px",
          marginBottom: "20px",
          boxShadow: "0 4px 24px #00000080"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#5C4A1E", textTransform: "uppercase", marginBottom: "12px", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", lineHeight: "1.8", fontSize: "15px", color: "#c8b88a" }}>
            Hume showed that causation, the external world, and personal identity cannot be rationally justified through either pure reason or experience alone. This left science, morality, and common reasoning without a rational foundation. Neither the rationalist's armchair certainties nor the empiricist's accumulated observations could close the gap Hume had opened. Something entirely new was needed — but it was not yet clear what shape that new thing could take.
          </p>
          <p style={{ margin: 0, lineHeight: "1.7", fontSize: "13px", color: "#8B7040", fontStyle: "italic" }}>
            This pressure forces the next development: if neither reason alone nor experience alone can ground our knowledge, perhaps knowledge arises from the structure of how the mind itself receives and organizes experience — a structure that is neither given by the world nor invented by pure thought, but constitutive of experience as such.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0f0d09",
          border: "1px solid #2a1f0a",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 4px 16px #00000060"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={e => e.currentTarget.style.background = "#16120a"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "background 0.2s"
            }}>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#8B6914", textTransform: "uppercase", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
              Real-World Echoes
            </div>
            {echosOpen
              ? <ChevronUp size={16} color="#8B6914" />
              : <ChevronDown size={16} color="#8B6914" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #1a1408" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                <div style={{ borderLeft: "3px solid #5C4A1E", borderRadius: "0 6px 6px 0", background: "rgba(92,74,30,0.07)", padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#C4783A", marginBottom: 6 }}>Newton's Physics and Universal Law</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
                    When Newton published his laws of motion and universal gravitation, he revealed that the same mathematical principles govern a falling apple and the orbit of Jupiter. For Kant, this was the central puzzle: if all knowledge comes from experience, how can we ever arrive at truly universal laws? Experience only ever shows us particular cases. The existence of Newtonian physics proved that something beyond mere experience must be at work in human cognition.
                  </p>
                </div>
                <div style={{ borderLeft: "3px solid #5C4A1E", borderRadius: "0 6px 6px 0", background: "rgba(92,74,30,0.07)", padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#C4783A", marginBottom: 6 }}>Kant's Nebular Hypothesis</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
                    Before the Critique, Kant proposed that the solar system formed from a rotating cloud of gas and dust — a hypothesis later independently developed by Laplace. This early scientific work showed Kant applying Newtonian principles speculatively, and it convinced him of the power of rational inquiry. But it also raised a deeper question: when we reason about the origins of the universe, are we genuinely extending scientific knowledge, or are we overreaching beyond what experience can ever confirm?
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: "#1a1005", letterSpacing: 1 }}>
          Part 2 of 21 — Kant's Critical Philosophy
        </div>

      </div>
    </div>
  );
}

// ─── Part 3: The Critical Turn and the First Critique ───
function CriticalTurnFirstCritique() {
  const [dragging, setDragging] = useState(null);
  const [placements, setPlacements] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hoveredZone, setHoveredZone] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [showTranscendental, setShowTranscendental] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);

  const keyConcepts = [
    { id: "synthetic_apriori", label: "Synthetic A Priori Knowledge", desc: "Kant's central discovery: judgments that are both informative (synthetic — they add new knowledge beyond what is contained in concepts alone) and necessary/universal (a priori — knowable independently of experience). Mathematical truths and causal necessity are the prime examples. Their existence is Kant's Copernican turn's starting point." },
    { id: "analytic_synthetic", label: "Analytic vs. Synthetic Judgments", desc: "Analytic judgments are true by definition alone — the predicate is already contained in the subject concept (all bachelors are unmarried). Synthetic judgments add genuinely new information (the stone is heavy). Hume and rationalists had missed a crucial third category: judgments that are both synthetic and a priori." },
    { id: "apriori_aposteriori", label: "A Priori vs. A Posteriori", desc: "A priori knowledge is independent of experience — its justification requires no observation, only rational reflection. A posteriori knowledge is derived from and dependent on experience. Kant argued that the most important judgments in mathematics and natural science are a priori yet synthetic, a combination his predecessors had overlooked." },
    { id: "transcendental_idealism", label: "Transcendental Idealism", desc: "Kant's core metaphysical position: space, time, and the categories of the understanding are not features of mind-independent reality but forms that the mind imposes on experience. The empirical world is therefore 'ideal' in the sense that its fundamental structure reflects the mind's contribution, yet 'real' in that it is objective for all possible experience." },
    { id: "limits_reason", label: "Limits of Pure Reason", desc: "The Critique of Pure Reason demonstrates that pure reason, when it attempts to reach beyond possible experience toward the unconditioned totality of things, falls into unavoidable contradictions (antinomies) and empty metaphysical speculation. The first Critique is as much a critique limiting reason's pretensions as it is a vindication of its legitimate scientific use." },
  ];

  useEffect(() => {
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      setPulsePhase(elapsed);
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const judgments = [
    { id: "bachelors", label: "All bachelors are unmarried", correctZone: "analytic_apriori", hint: "Analytic & A Priori — truth contained in the concept itself, knowable without experience." },
    { id: "math", label: "7 + 5 = 12", correctZone: "synthetic_apriori", hint: "Synthetic A Priori — adds new knowledge (12 isn't just '7+5' defined) yet is universal and necessary." },
    { id: "stone", label: "This stone is heavy", correctZone: "synthetic_aposteriori", hint: "Synthetic & A Posteriori — new information gained only through sensory experience." },
    { id: "cause", label: "Every event has a cause", correctZone: "synthetic_apriori", hint: "Synthetic A Priori — foundational to science, yet not derivable from experience alone." },
    { id: "triangles", label: "Triangles have 3 sides", correctZone: "analytic_apriori", hint: "Analytic & A Priori — the predicate is contained in the subject concept." },
    { id: "gold", label: "Gold is yellow", correctZone: "synthetic_aposteriori", hint: "Synthetic & A Posteriori — we must look at gold to know its color." },
  ];

  const zones = [
    { id: "analytic_apriori", label: "Analytic A Priori", x: 80, y: 60, w: 200, h: 80, color: "#1a3a5c", border: "#3a7abf", desc: "True by definition, knowable without experience. E.g. logical tautologies." },
    { id: "synthetic_apriori", label: "Synthetic A Priori", x: 80, y: 200, w: 200, h: 90, color: "#1a3d2e", border: "#2D6A4F", desc: "Adds new knowledge AND is universal/necessary. Kant's discovery: the mind imposes this structure.", isKey: true },
    { id: "synthetic_aposteriori", label: "Synthetic A Posteriori", x: 80, y: 340, w: 200, h: 80, color: "#3d1a1a", border: "#bf3a3a", desc: "New information gained through sensory experience. Hume's territory." },
    { id: "analytic_aposteriori", label: "Analytic A Posteriori", x: 80, y: 470, w: 200, h: 80, color: "#2a2a2a", border: "#555555", desc: "Technically impossible — if it's analytic, experience can't add to it.", impossible: true },
  ];

  const pulseOpacity = 0.15 + 0.12 * Math.sin(pulsePhase * 2.2);
  const pulseScale = 1 + 0.03 * Math.sin(pulsePhase * 2.2);

  const getDragProps = (id) => ({
    draggable: true,
    onDragStart: (e) => {
      setDragging(id);
      e.dataTransfer.effectAllowed = "move";
    },
    onDragEnd: () => setDragging(null),
  });

  const getDropProps = (zoneId) => ({
    onDragOver: (e) => { e.preventDefault(); setHoveredZone(zoneId); },
    onDragLeave: () => setHoveredZone(null),
    onDrop: (e) => {
      e.preventDefault();
      setHoveredZone(null);
      if (!dragging) return;
      const judgment = judgments.find(j => j.id === dragging);
      const correct = judgment && judgment.correctZone === zoneId;
      setPlacements(prev => ({ ...prev, [dragging]: zoneId }));
      setFeedback(prev => ({ ...prev, [dragging]: { correct, hint: judgment ? judgment.hint : "" } }));
      setDragging(null);
    },
  });

  const placedInZone = (zoneId) => judgments.filter(j => placements[j.id] === zoneId);
  const unplaced = judgments.filter(j => !placements[j.id]);

  const resetAll = () => {
    setPlacements({});
    setFeedback({});
    setShowTranscendental(false);
  };

  const allCorrect = judgments.every(j => placements[j.id] === j.correctZone);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 20%, #0d2b1e 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e0d4",
      padding: "0 0 60px 0",
    }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "48px 40px 0 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ color: "#2D6A4F", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Part 3 of 21 — Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", margin: "0 0 8px 0", color: "#f0ead8", lineHeight: 1.3 }}>
          The Critical Turn and the First Critique
        </h1>
        <p style={{ fontSize: 15, color: "#a0998c", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
          The Critique of Pure Reason asked how synthetic a priori knowledge is possible and discovered that the mind imposes its own forms and categories on raw experience.
        </p>
      </div>

      {/* THE PROBLEM PANEL */}
      <div style={{ maxWidth: 900, margin: "36px auto 0 auto", padding: "0 40px" }}>
        <div style={{
          background: "#0e1a14",
          border: "1px solid #1e3d2a",
          borderLeft: "4px solid #2D6A4F",
          borderRadius: 6,
          padding: "24px 28px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#2D6A4F", marginBottom: 12, fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "#c8c0b4" }}>
            Hume's skepticism had <span style={{ color: "#e8845a", fontStyle: "italic" }}>destroyed the rational foundations of causation and scientific knowledge</span> — we never observe causation itself, only constant conjunction of events. If we cannot justify our belief in cause and effect, the entire edifice of natural science collapses into mere habit. Neither pure reason (the rationalist hope) nor sensory experience (the empiricist hope) could provide a solid ground. Philosophy stood at an impasse: either accept radical skepticism, or find something neither camp had yet considered.
          </p>
        </div>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{ maxWidth: 900, margin: "36px auto 0 auto", padding: "0 40px" }}>
        <div style={{
          background: "#0c1a14",
          border: "1px solid #1e3d2a",
          borderRadius: 8,
          padding: "32px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#2D6A4F", marginBottom: 6 }}>
            Main Visualization
          </div>
          <h2 style={{ fontSize: 20, fontWeight: "normal", margin: "0 0 6px 0", color: "#f0ead8" }}>
            The Judgment Sorter: Analytic / Synthetic × A Priori / A Posteriori
          </h2>
          <p style={{ fontSize: 13, color: "#7a7a6e", margin: "0 0 28px 0", fontStyle: "italic" }}>
            Drag each judgment into its correct category. The glowing central zone reveals Kant's key discovery.
          </p>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>

            {/* LEFT: Drag source */}
            <div style={{ flex: "0 0 220px", minWidth: 180 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#6a8c7a", marginBottom: 12 }}>
                Judgments to sort
              </div>
              <div style={{
                minHeight: 280,
                background: "#080e0a",
                border: "1px dashed #2D6A4F",
                borderRadius: 6,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                {unplaced.length === 0 ? (
                  <div style={{ color: "#4a7a5a", fontSize: 13, fontStyle: "italic", textAlign: "center", paddingTop: 20 }}>
                    All judgments placed!
                    {allCorrect && (
                      <div style={{ color: "#2D6A4F", marginTop: 8, fontSize: 12 }}>✓ All correct</div>
                    )}
                  </div>
                ) : unplaced.map(j => {
                  const fb = feedback[j.id];
                  return (
                    <div
                      key={j.id}
                      {...getDragProps(j.id)}
                      style={{
                        background: dragging === j.id ? "#1a3d2e" : "#101a12",
                        border: `1px solid ${dragging === j.id ? "#2D6A4F" : "#2a3a2e"}`,
                        borderRadius: 4,
                        padding: "8px 10px",
                        cursor: "grab",
                        fontSize: 12,
                        color: "#c8d4bc",
                        transition: "background 0.2s, border 0.2s",
                        userSelect: "none",
                      }}
                    >
                      {j.label}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={resetAll}
                style={{
                  marginTop: 12,
                  background: "transparent",
                  border: "1px solid #2D6A4F",
                  color: "#2D6A4F",
                  borderRadius: 4,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontSize: 11,
                  letterSpacing: 1,
                  width: "100%",
                  fontFamily: "Georgia, serif",
                }}
              >
                Reset
              </button>
            </div>

            {/* RIGHT: Drop zones */}
            <div style={{ flex: 1, minWidth: 300 }}>
              {/* Column headers */}
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, textAlign: "center", fontSize: 11, letterSpacing: 2, color: "#3a7abf", textTransform: "uppercase" }}>A Priori</div>
                <div style={{ flex: 1, textAlign: "center", fontSize: 11, letterSpacing: 2, color: "#bf3a3a", textTransform: "uppercase" }}>A Posteriori</div>
              </div>

              {/* Row: Analytic */}
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: "#3a9abf", textTransform: "uppercase", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", alignSelf: "center", marginRight: 4, width: 20 }}>Analytic</div>
                {/* Analytic A Priori */}
                <DropZone
                  zoneId="analytic_apriori"
                  label="Analytic A Priori"
                  desc="True by definition, knowable without experience."
                  color="#0d1a2e"
                  borderColor={hoveredZone === "analytic_apriori" ? "#3a7abf" : "#1e3a5c"}
                  glowColor="#3a7abf"
                  items={placedInZone("analytic_apriori")}
                  feedback={feedback}
                  dropProps={getDropProps("analytic_apriori")}
                  hoveredZone={hoveredZone}
                  expandedPanel={expandedPanel}
                  setExpandedPanel={setExpandedPanel}
                  panelContent="Analytic judgments are true by virtue of the meaning of their terms alone. The predicate simply unpacks what is already contained in the subject. 'All bachelors are unmarried' tells us nothing new — it only explicates."
                />
                {/* Analytic A Posteriori */}
                <div style={{
                  flex: 1, background: "#111111", border: "1px dashed #333333", borderRadius: 6,
                  padding: 10, minHeight: 100, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                  ...getDropProps("analytic_aposteriori"),
                  opacity: 0.5,
                }}
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!dragging) return;
                    const judgment = judgments.find(j => j.id === dragging);
                    setPlacements(prev => ({ ...prev, [dragging]: "analytic_aposteriori" }));
                    setFeedback(prev => ({ ...prev, [dragging]: { correct: false, hint: "Analytic A Posteriori is impossible — if truth is contained in the concept, experience cannot add to or verify it. Kant considered this cell empty." } }));
                    setDragging(null);
                  }}
                >
                  <div style={{ fontSize: 10, color: "#555555", textAlign: "center", letterSpacing: 1 }}>ANALYTIC A POSTERIORI</div>
                  <div style={{ fontSize: 9, color: "#444444", marginTop: 4, textAlign: "center", fontStyle: "italic" }}>Impossible</div>
                </div>
              </div>

              {/* Row: Synthetic */}
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: "#bf7a3a", textTransform: "uppercase", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", alignSelf: "center", marginRight: 4, width: 20 }}>Synthetic</div>
                {/* Synthetic A Priori — KEY ZONE */}
                <div
                  style={{
                    flex: 1,
                    background: `#0d2a1a`,
                    border: `2px solid #2D6A4F`,
                    borderRadius: 6,
                    padding: 10,
                    minHeight: 130,
                    position: "relative",
                    cursor: "default",
                    boxShadow: `0 0 ${18 + 8 * Math.sin(pulsePhase * 2.2)}px ${pulseOpacity + 0.1}px #2D6A4F`,
                    transition: "box-shadow 0.1s",
                  }}
                  onDragOver={(e) => { e.preventDefault(); setHoveredZone("synthetic_apriori"); }}
                  onDragLeave={() => setHoveredZone(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setHoveredZone(null);
                    if (!dragging) return;
                    const judgment = judgments.find(j => j.id === dragging);
                    const correct = judgment && judgment.correctZone === "synthetic_apriori";
                    setPlacements(prev => ({ ...prev, [dragging]: "synthetic_apriori" }));
                    setFeedback(prev => ({ ...prev, [dragging]: { correct, hint: judgment ? judgment.hint : "" } }));
                    setDragging(null);
                  }}
                >
                  <div style={{ position: "absolute", top: -1, left: -1, right: -1, bottom: -1, borderRadius: 6, background: `rgba(45,106,79,${pulseOpacity})`, pointerEvents: "none", transition: "background 0.1s" }} />
                  <div style={{ fontSize: 10, color: "#2D6A4F", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4, fontWeight: "bold" }}>
                    ★ Synthetic A Priori
                  </div>
                  <div style={{ fontSize: 9, color: "#4a8a5a", marginBottom: 8, fontStyle: "italic" }}>
                    Kant's key discovery — the mind's contribution
                  </div>
                  {placedInZone("synthetic_apriori").map(j => (
                    <PlacedJudgment key={j.id} j={j} fb={feedback[j.id]} />
                  ))}
                  {expandedPanel === "synthetic_apriori" ? null : (
                    <button
                      onClick={() => setExpandedPanel(expandedPanel === "synthetic_apriori" ? null : "synthetic_apriori")}
                      style={{ marginTop: 8, background: "transparent", border: "1px solid #2D6A4F", color: "#2D6A4F", borderRadius: 3, padding: "3px 8px", cursor: "pointer", fontSize: 10, fontFamily: "Georgia, serif" }}
                    >
                      Why this matters?
                    </button>
                  )}
                  {expandedPanel === "synthetic_apriori" && (
                    <div style={{ marginTop: 8, padding: "10px 12px", background: "#061208", border: "1px solid #2D6A4F", borderRadius: 4, fontSize: 12, color: "#a8c4a8", lineHeight: 1.7 }}>
                      If synthetic a priori judgments exist — statements that are both necessarily true AND add genuine new information — then neither rationalism nor empiricism alone can explain them. Kant's answer: the mind itself contributes the structure. Space, time, and the categories (like causation) are forms the mind imposes on raw experience, making universal necessary knowledge possible.
                      <button onClick={() => setExpandedPanel(null)} style={{ display: "block", marginTop: 6, background: "transparent", border: "none", color: "#2D6A4F", cursor: "pointer", fontSize: 10, fontFamily: "Georgia, serif" }}>— close</button>
                    </div>
                  )}
                </div>

                {/* Synthetic A Posteriori */}
                <DropZone
                  zoneId="synthetic_aposteriori"
                  label="Synthetic A Posteriori"
                  desc="New information, learned through experience."
                  color="#1a0d0d"
                  borderColor={hoveredZone === "synthetic_aposteriori" ? "#bf3a3a" : "#3a1e1e"}
                  glowColor="#bf3a3a"
                  items={placedInZone("synthetic_aposteriori")}
                  feedback={feedback}
                  dropProps={getDropProps("synthetic_aposteriori")}
                  hoveredZone={hoveredZone}
                  expandedPanel={expandedPanel}
                  setExpandedPanel={setExpandedPanel}
                  panelContent="Synthetic a posteriori judgments are the bread and butter of ordinary empirical knowledge. 'This stone is heavy' — we must pick it up to find out. Hume argued this was the only kind of factual knowledge we have."
                />
              </div>

              {/* Feedback messages */}
              <div style={{ marginTop: 16, minHeight: 40 }}>
                {Object.entries(feedback).map(([id, fb]) => {
                  const j = judgments.find(x => x.id === id);
                  return (
                    <div key={id} style={{
                      marginBottom: 6,
                      padding: "6px 10px",
                      borderRadius: 4,
                      background: fb.correct ? "#0d2a1a" : "#2a0d0d",
                      border: `1px solid ${fb.correct ? "#2D6A4F" : "#7a2020"}`,
                      fontSize: 11,
                      color: fb.correct ? "#8acea8" : "#ce8a8a",
                      lineHeight: 1.5,
                    }}>
                      <span style={{ fontStyle: "italic" }}>"{j && j.label}"</span> — {fb.correct ? "✓ Correct. " : "✗ Not quite. "}{fb.hint}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Transcendental Idealism Toggle */}
          <div style={{ marginTop: 32, borderTop: "1px solid #1e3d2a", paddingTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setShowTranscendental(!showTranscendental)}
                style={{
                  background: showTranscendental ? "#1a3d2e" : "transparent",
                  border: `2px solid #2D6A4F`,
                  color: "#2D6A4F",
                  borderRadius: 4,
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontFamily: "Georgia, serif",
                  letterSpacing: 0.5,
                  transition: "background 0.3s",
                }}
              >
                {showTranscendental ? "Hide" : "Reveal"} Transcendental Idealism
              </button>
              <span style={{ fontSize: 12, color: "#5a7a6a", fontStyle: "italic" }}>
                — see how Synthetic A Priori becomes the keystone of Kant's system
              </span>
            </div>

            {showTranscendental && (
              <div style={{
                marginTop: 20,
                padding: "24px",
                background: "#060f09",
                border: "2px solid #2D6A4F",
                borderRadius: 8,
                boxShadow: "0 0 30px rgba(45,106,79,0.3)",
              }}>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: "0 0 auto" }}>
                    <svg width="240" height="180" viewBox="0 0 240 180">
                      {/* Mind arrow */}
                      <defs>
                        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                          <path d="M0,0 L8,4 L0,8 Z" fill="#2D6A4F" />
                        </marker>
                        <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                          <path d="M0,0 L8,4 L0,8 Z" fill="#555555" />
                        </marker>
                      </defs>
                      {/* Noumena (thing-in-itself) */}
                      <ellipse cx="50" cy="90" rx="40" ry="55" fill="#0a0a14" stroke="#333355" strokeWidth="1.5" strokeDasharray="4,3" />
                      <text x="50" y="85" textAnchor="middle" fontSize="9" fill="#555577" fontFamily="Georgia, serif">Thing-in-</text>
                      <text x="50" y="97" textAnchor="middle" fontSize="9" fill="#555577" fontFamily="Georgia, serif">itself</text>
                      <text x="50" y="109" textAnchor="middle" fontSize="8" fill="#444466" fontFamily="Georgia, serif" fontStyle="italic">(noumenon)</text>

                      {/* Mind box */}
                      <rect x="100" y="30" width="80" height="120" rx="6" fill="#0a1a10" stroke="#2D6A4F" strokeWidth="1.5" />
                      <text x="140" y="52" textAnchor="middle" fontSize="10" fill="#2D6A4F" fontFamily="Georgia, serif">The Mind</text>
                      <rect x="110" y="60" width="60" height="22" rx="3" fill="#0d2a1a" stroke="#1e5a3a" strokeWidth="1" />
                      <text x="140" y="75" textAnchor="middle" fontSize="8" fill="#6aaa8a" fontFamily="Georgia, serif">Space & Time</text>
                      <rect x="110" y="88" width="60" height="22" rx="3" fill="#0d2a1a" stroke="#1e5a3a" strokeWidth="1" />
                      <text x="140" y="100" textAnchor="middle" fontSize="8" fill="#6aaa8a" fontFamily="Georgia, serif">Categories</text>
                      <text x="140" y="112" textAnchor="middle" fontSize="7" fill="#5a8a6a" fontFamily="Georgia, serif">(causation etc.)</text>
                      <text x="140" y="138" textAnchor="middle" fontSize="7" fill="#3a6a4a" fontFamily="Georgia, serif" fontStyle="italic">imposes forms</text>

                      {/* Phenomenon */}
                      <ellipse cx="210" cy="90" rx="26" ry="50" fill="#0a1a0e" stroke="#2D6A4F" strokeWidth="1.5" />
                      <text x="210" y="85" textAnchor="middle" fontSize="8" fill="#8acea8" fontFamily="Georgia, serif">Appear-</text>
                      <text x="210" y="96" textAnchor="middle" fontSize="8" fill="#8acea8" fontFamily="Georgia, serif">ance</text>
                      <text x="210" y="108" textAnchor="middle" fontSize="7" fill="#6aaa8a" fontFamily="Georgia, serif" fontStyle="italic">(phenom.)</text>

                      {/* Arrow from noumena into mind */}
                      <line x1="90" y1="85" x2="98" y2="85" stroke="#333355" strokeWidth="1.5" markerEnd="url(#arrowGray)" strokeDasharray="3,2" />
                      {/* Arrow from mind to phenomenon */}
                      <line x1="182" y1="85" x2="182" y2="85" stroke="#2D6A4F" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
                      <line x1="180" y1="85" x2="183" y2="85" stroke="#2D6A4F" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
                      <line x1="180" y1="85" x2="184" y2="85" stroke="#2D6A4F" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                      {/* Label */}
                      <text x="120" y="170" textAnchor="middle" fontSize="8" fill="#4a6a5a" fontFamily="Georgia, serif" fontStyle="italic">Transcendental Idealism</text>
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 16, color: "#2D6A4F", marginBottom: 12 }}>Transcendental Idealism</div>
                    <p style={{ fontSize: 13, color: "#a8c4a8", lineHeight: 1.8, margin: "0 0 12px 0" }}>
                      Synthetic a priori knowledge is possible because the mind does not passively receive the world — it actively structures experience. Space and time are not properties of things-in-themselves but <span style={{ color: "#f0e8c4", fontStyle: "italic" }}>forms of our intuition</span>. The categories (causation, substance, unity) are forms of understanding we impose on the raw given.
                    </p>
                    <p style={{ fontSize: 13, color: "#a8c4a8", lineHeight: 1.8, margin: 0 }}>
                      The result: we have genuine, universal, necessary knowledge of <span style={{ color: "#f0e8c4", fontStyle: "italic" }}>appearances</span> (phenomena) — but the thing-in-itself (noumenon) remains forever beyond our reach. Kant called this his "Copernican Revolution" in philosophy: instead of the mind conforming to objects, objects conform to the mind.
                    </p>
                  </div>
                </div>

                {/* Limits of reason */}
                <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { label: "God", status: "Beyond limits", color: "#7a4a20" },
                    { label: "The Soul", status: "Beyond limits", color: "#7a4a20" },
                    { label: "Freedom", status: "Beyond limits", color: "#7a4a20" },
                    { label: "Mathematics", status: "Secured", color: "#2D6A4F" },
                    { label: "Natural Science", status: "Secured", color: "#2D6A4F" },
                    { label: "Moral Faith", status: "Room made", color: "#5a4a8a" },
                  ].map(item => (
                    <div key={item.label} style={{
                      padding: "6px 12px",
                      border: `1px solid ${item.color}`,
                      borderRadius: 4,
                      fontSize: 11,
                      color: item.color,
                      background: `${item.color}18`,
                    }}>
                      <div style={{ fontWeight: "bold" }}>{item.label}</div>
                      <div style={{ fontSize: 9, opacity: 0.8 }}>{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 900, margin: "24px auto 0 auto", padding: "0 40px" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(45,106,79,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2D6A4F", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#2D6A4F" : "rgba(45,106,79,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#4a9a6a" : "rgba(45,106,79,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#6aaa8a",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(45,106,79,0.08)",
              border: "1px solid rgba(45,106,79,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#2D6A4F", marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{ maxWidth: 900, margin: "28px auto 0 auto", padding: "0 40px" }}>
        <div style={{
          background: "#0e1a14",
          border: "1px solid #1e3d2a",
          borderLeft: "4px solid #2D6A4F",
          borderRadius: 6,
          padding: "24px 28px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#2D6A4F", marginBottom: 12, fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: 15, color: "#c8c0b4" }}>
            Kant's solution carries a sharp price. If the mind imposes the forms of space, time, and causation on all possible experience, then everything we can ever know is <span style={{ fontStyle: "italic" }}>already shaped by those mental contributions</span>. We cannot step outside our own cognitive apparatus to compare our structured experience with unstructured reality. The <span style={{ fontStyle: "italic" }}>thing-in-itself</span> — what the world is like independently of any mind — becomes permanently inaccessible.
          </p>
          <p style={{ margin: "0 0 16px 0", lineHeight: 1.8, fontSize: 15, color: "#c8c0b4" }}>
            This generates the vexing distinction between phenomena (knowable appearances) and noumena (unknowable things-in-themselves). The question of how these two realms relate — whether the noumenon is even a coherent concept, whether freedom and morality can be grounded in it — became the engine driving all post-Kantian philosophy.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#5a8a6a", fontStyle: "italic", borderTop: "1px solid #1e3d2a", paddingTop: 14 }}>
            This pressure forces the next development: Fichte, Schelling, and Hegel each attempted to close the gap between phenomena and noumena — culminating in absolute idealism's claim that the distinction itself must be overcome.
          </p>
        </div>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{ maxWidth: 900, margin: "20px auto 0 auto", padding: "0 40px" }}>
        <div style={{
          background: "#0c100e",
          border: "1px solid #1e2a20",
          borderRadius: 6,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "18px 24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#4a8a5a", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={16} color="#4a8a5a" /> : <ChevronDown size={16} color="#4a8a5a" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #1e2a20" }}>
              <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ borderLeft: "3px solid #2D6A4F", borderRadius: "0 6px 6px 0", background: "rgba(45,106,79,0.07)", padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#6aaa8a", marginBottom: 6 }}>7 + 5 = 12 — Arithmetic as Synthetic A Priori</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
                    When we compute 7 + 5, Kant argued, we are not merely unpacking a definition — we are constructing something new by combining the two numbers in intuition (counting along a mental number line). The result 12 is not contained analytically in the meaning of "7+5"; we must perform an act of synthesis. Yet the result is universally and necessarily true for all rational minds, making it a priori. This remains one of the most debated examples in philosophy of mathematics — Frege and Russell later argued arithmetic is purely analytic, but the debate opened by Kant still animates philosophy of mathematics today.
                  </p>
                </div>
                <div style={{ borderLeft: "3px solid #2D6A4F", borderRadius: "0 6px 6px 0", background: "rgba(45,106,79,0.07)", padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#6aaa8a", marginBottom: 6 }}>"Every Event Has a Cause" — The Causal Principle in Science</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#b8b0a8", lineHeight: 1.7 }}>
                    Modern science operates on the assumption that every phenomenon has a deterministic or probabilistic explanation — that we should never simply give up and declare an event uncaused. This is not a principle learned from any single experiment; no experiment could establish it for all events everywhere. Yet science could not proceed without it. Kant's insight that this principle is synthetic a priori — contributed by the understanding as a condition for possible experience — anticipates contemporary debates about the status of scientific laws and the "principle of sufficient reason" in physics and cosmology.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: "#0a1a10", letterSpacing: 1, maxWidth: 900, margin: "36px auto 0 auto", padding: "0 40px" }}>
        Part 3 of 21 — Kant's Critical Philosophy
      </div>
    </div>
  );
}

function DropZone({ zoneId, label, desc, color, borderColor, glowColor, items, feedback, dropProps, hoveredZone, expandedPanel, setExpandedPanel, panelContent }) {
  return (
    <div
      style={{
        flex: 1,
        background: color,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 6,
        padding: 10,
        minHeight: 100,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hoveredZone === zoneId ? `0 0 12px ${glowColor}55` : "none",
        cursor: "default",
      }}
      {...dropProps}
    >
      <div style={{ fontSize: 9, color: borderColor, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 9, color: "#5a6a5a", fontStyle: "italic", marginBottom: 6 }}>{desc}</div>
      {items.map(j => <PlacedJudgment key={j.id} j={j} fb={feedback[j.id]} />)}
      {panelContent && (
        <>
          {expandedPanel === zoneId ? (
            <div style={{ marginTop: 6, padding: "8px 10px", background: "#040804", border: `1px solid ${borderColor}`, borderRadius: 4, fontSize: 11, color: "#a0a8a0", lineHeight: 1.6 }}>
              {panelContent}
              <button onClick={() => setExpandedPanel(null)} style={{ display: "block", marginTop: 4, background: "transparent", border: "none", color: borderColor, cursor: "pointer", fontSize: 10, fontFamily: "Georgia, serif" }}>— close</button>
            </div>
          ) : (
            items.length > 0 && (
              <button
                onClick={() => setExpandedPanel(zoneId)}
                style={{ marginTop: 4, background: "transparent", border: `1px solid ${borderColor}`, color: borderColor, borderRadius: 3, padding: "2px 6px", cursor: "pointer", fontSize: 9, fontFamily: "Georgia, serif" }}
              >
                Learn more
              </button>
            )
          )}
        </>
      )}
    </div>
  );
}

function PlacedJudgment({ j, fb }) {
  return (
    <div style={{
      background: fb && fb.correct ? "#0d2a1a" : (fb ? "#2a0d0d" : "#1a1a1a"),
      border: `1px solid ${fb && fb.correct ? "#2D6A4F" : (fb ? "#7a2020" : "#333333")}`,
      borderRadius: 3,
      padding: "4px 7px",
      fontSize: 10,
      color: fb && fb.correct ? "#8acea8" : (fb ? "#ce8a8a" : "#a0a0a0"),
      marginBottom: 4,
      lineHeight: 1.4,
    }}>
      {fb && (fb.correct ? "✓ " : "✗ ")}{j.label}
    </div>
  );
}

// ─── Part 4: Space and Time as Forms of Intuition ───
function SpaceTimeFormsOfIntuition() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [spaceOn, setSpaceOn] = useState(true);
  const [timeOn, setTimeOn] = useState(true);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [mathMode, setMathMode] = useState('intuition');
  const [hoverSpace, setHoverSpace] = useState(false);
  const [hoverTime, setHoverTime] = useState(false);
  const [hoverMathToggle, setHoverMathToggle] = useState(false);

  const concepts = [
    { id: 'transcendental_aesthetic', label: 'Transcendental Aesthetic', desc: 'The systematic study of the a priori principles of sensibility — the part of the Critique devoted to uncovering the pure forms that structure all sensory experience before any conceptual understanding is applied.' },
    { id: 'pure_forms', label: 'Pure Forms of Intuition', desc: 'Space and time as they exist in the mind prior to any experience: not derived from sensation but the very conditions under which sensation becomes possible. They are "pure" because they contain no empirical content.' },
    { id: 'ideality', label: 'Ideality of Space & Time', desc: 'Transcendental ideality means space and time are features of our mode of representation, not of things-in-themselves. Yet Kant also insists on empirical realism: within experience, spatial and temporal claims are fully objective.' },
    { id: 'sensation_vs_intuition', label: 'Sensation vs. Intuition', desc: 'Sensation is the raw material — the effect of an object on our receptive faculty. Intuition is the representation of a singular object given to us. Space and time are pure intuitions: singular, immediate, and prior to any sensation they organize.' },
    { id: 'empirical_realism', label: 'Empirical Realism', desc: 'Although space and time are mind-contributed forms, objects within experience are genuinely real — not mere illusions. The chair is empirically real even though its spatiality is transcendentally ideal.' },
    { id: 'mathematics', label: 'Mathematics from Pure Intuition', desc: 'Geometry constructs its objects in pure spatial intuition; arithmetic constructs in pure temporal intuition (successive counting). This explains why mathematical truths are both necessary (a priori) and genuinely informative (synthetic).' },
  ];

  const particles = useRef([]);
  const phase = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Chair anchor points (simplified chair outline as target positions)
    const chairPoints = [];
    // Seat
    for (let i = 0; i < 30; i++) {
      chairPoints.push({ tx: W * 0.35 + (i / 29) * W * 0.3, ty: H * 0.52 });
    }
    // Back
    for (let i = 0; i < 25; i++) {
      chairPoints.push({ tx: W * 0.35 + (i / 24) * W * 0.3, ty: H * 0.52 - (i / 24) * H * 0.22 });
    }
    // Left leg
    for (let i = 0; i < 15; i++) {
      chairPoints.push({ tx: W * 0.37, ty: H * 0.52 + (i / 14) * H * 0.15 });
    }
    // Right leg
    for (let i = 0; i < 15; i++) {
      chairPoints.push({ tx: W * 0.63, ty: H * 0.52 + (i / 14) * H * 0.15 });
    }
    // Mid left leg
    for (let i = 0; i < 15; i++) {
      chairPoints.push({ tx: W * 0.44, ty: H * 0.52 + (i / 14) * H * 0.15 });
    }
    // Mid right leg
    for (let i = 0; i < 15; i++) {
      chairPoints.push({ tx: W * 0.56, ty: H * 0.52 + (i / 14) * H * 0.15 });
    }

    if (particles.current.length === 0) {
      particles.current = chairPoints.map((cp, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: cp.tx,
        ty: cp.ty,
        color: `#${Math.floor(Math.random() * 80 + 100).toString(16)}${Math.floor(Math.random() * 60 + 60).toString(16)}${Math.floor(Math.random() * 100 + 100).toString(16)}`,
        size: Math.random() * 2.5 + 1.5,
        chaos_x: Math.random() * W,
        chaos_y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      }));
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw subtle grid overlay if space is on
      if (spaceOn) {
        ctx.strokeStyle = '#7B5EA730';
        ctx.lineWidth = 0.5;
        const gridSize = 28;
        for (let x = 0; x <= W; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, H);
          ctx.stroke();
        }
        for (let y = 0; y <= H; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particles.current.forEach(p => {
        if (!spaceOn) {
          // Chaotic drift
          p.x += p.vx + (Math.random() - 0.5) * 1.2;
          p.y += p.vy + (Math.random() - 0.5) * 1.2;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          p.x = Math.max(0, Math.min(W, p.x));
          p.y = Math.max(0, Math.min(H, p.y));
        } else {
          // Move toward target
          p.x += (p.tx - p.x) * 0.045;
          p.y += (p.ty - p.y) * 0.045;
        }

        const alpha = spaceOn ? 0.85 : 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw space overlay label
      if (spaceOn) {
        ctx.save();
        ctx.font = 'bold 11px Georgia, serif';
        ctx.fillStyle = '#7B5EA7AA';
        ctx.fillText('SPATIAL FORM ACTIVE', 10, 18);
        ctx.restore();
      } else {
        ctx.save();
        ctx.font = 'bold 11px Georgia, serif';
        ctx.fillStyle = '#ff666688';
        ctx.fillText('SPATIAL FORM REMOVED — CHAOS', 10, 18);
        ctx.restore();
      }

      // Timeline bar at bottom if timeOn
      if (timeOn) {
        const barY = H - 22;
        const barX = W * 0.1;
        const barW = W * 0.8;
        ctx.save();
        const grad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
        grad.addColorStop(0, '#7B5EA720');
        grad.addColorStop(0.5, '#7B5EA7BB');
        grad.addColorStop(1, '#7B5EA720');
        ctx.fillStyle = grad;
        ctx.fillRect(barX, barY, barW, 8);
        // Tick marks
        for (let i = 0; i <= 8; i++) {
          const tx = barX + (i / 8) * barW;
          ctx.beginPath();
          ctx.moveTo(tx, barY - 3);
          ctx.lineTo(tx, barY + 11);
          ctx.strokeStyle = '#7B5EA7CC';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.font = '9px Georgia, serif';
        ctx.fillStyle = '#7B5EA7CC';
        ctx.fillText('TIME', barX + barW / 2 - 14, barY - 6);
        ctx.restore();
      }

      phase.current += 0.01;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [spaceOn, timeOn]);

  const mathContent = {
    intuition: {
      title: 'Mathematics via Pure Intuition',
      body: 'When we prove that the interior angles of a triangle sum to 180°, we do not merely analyze the concept of "triangle." We construct the figure in pure spatial intuition — we see it, draw auxiliary lines, and perceive the necessity in the act of construction. The necessity is not logical but intuitive. Similarly, 7 + 5 = 12 is verified by counting forward in the pure intuition of time, not by unpacking definitions.',
      color: '#7B5EA7',
    },
    concept: {
      title: 'Mathematics via Pure Concept Alone',
      body: 'If mathematics were derived purely from conceptual analysis — as Leibniz believed — then all mathematical truths would be analytic: merely explicating what is already contained in our definitions. But this cannot explain how mathematics applies to the world with such uncanny precision, nor why it feels genuinely informative. Analyzing the concept "triangle" alone never yields the angle-sum theorem without spatial construction.',
      color: '#A07850',
    },
  };

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 40% 30%, #2a1a3e 0%, #0d0b14 60%, #0a0a0f 100%)',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#e8e0f0',
      padding: '0 0 60px 0',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '40px 40px 0 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#7B5EA7', marginBottom: '8px', textTransform: 'uppercase' }}>
          Part 4 of 21 — Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 'normal', margin: '0 0 10px 0', lineHeight: '1.3', color: '#f0eaff' }}>
          Space and Time as Forms of Intuition
        </h1>
        <p style={{ fontSize: '15px', color: '#b8a8cc', margin: '0 0 32px 0', lineHeight: '1.7', fontStyle: 'italic' }}>
          Kant argued that space and time are not features of mind-independent reality but the necessary forms through which human sensibility must represent any object.
        </p>
      </div>

      {/* THE PROBLEM PANEL */}
      <div style={{ padding: '0 40px', maxWidth: '900px', margin: '0 auto 32px auto' }}>
        <div style={{
          background: '#1a1025cc',
          border: '1px solid #2e1f4a',
          borderLeft: '4px solid #7B5EA7',
          borderRadius: '6px',
          padding: '24px 28px',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#7B5EA7', marginBottom: '12px', textTransform: 'uppercase' }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#d4c8e8' }}>
            If the mind structures experience through contributed forms, we need to know precisely what those forms are and how they operate — which requires analyzing the most basic structure of sensible experience before any conceptual thinking occurs. What is the architecture of raw sensibility itself, prior to thought? Unless we can answer this, the claim that the mind actively shapes experience remains abstract and ungrounded.
          </p>
        </div>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{ padding: '0 40px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Canvas zone */}
        <div style={{
          background: '#100d1a',
          border: '1px solid #2e1f4a',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '13px', color: '#b8a8cc', marginBottom: '14px', lineHeight: '1.6' }}>
            Below, raw sensation appears as scattered colored points — unstructured sensory data arriving from the world. The mind's forms of intuition organize them into a coherent spatial object. Toggle the forms to see what happens to experience when they are removed.
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSpaceOn(v => !v)}
              onMouseEnter={() => setHoverSpace(true)}
              onMouseLeave={() => setHoverSpace(false)}
              style={{
                cursor: 'pointer',
                padding: '9px 20px',
                borderRadius: '5px',
                border: `1.5px solid ${spaceOn ? '#7B5EA7' : '#554466'}`,
                background: spaceOn
                  ? (hoverSpace ? '#4a3070' : '#2e1f4a')
                  : (hoverSpace ? '#2a1a3e' : '#180f28'),
                color: spaceOn ? '#d4c0f0' : '#776688',
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                transition: 'all 0.2s',
                boxShadow: spaceOn ? '0 0 10px #7B5EA740' : 'none',
              }}
            >
              {spaceOn ? '✦ Space Form: ON' : '✧ Space Form: OFF'}
            </button>
            <button
              onClick={() => setTimeOn(v => !v)}
              onMouseEnter={() => setHoverTime(true)}
              onMouseLeave={() => setHoverTime(false)}
              style={{
                cursor: 'pointer',
                padding: '9px 20px',
                borderRadius: '5px',
                border: `1.5px solid ${timeOn ? '#7B5EA7' : '#554466'}`,
                background: timeOn
                  ? (hoverTime ? '#4a3070' : '#2e1f4a')
                  : (hoverTime ? '#2a1a3e' : '#180f28'),
                color: timeOn ? '#d4c0f0' : '#776688',
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                transition: 'all 0.2s',
                boxShadow: timeOn ? '0 0 10px #7B5EA740' : 'none',
              }}
            >
              {timeOn ? '✦ Time Form: ON' : '✧ Time Form: OFF'}
            </button>
            {(!spaceOn || !timeOn) && (
              <span style={{ fontSize: '12px', color: '#ff9966', alignSelf: 'center', fontStyle: 'italic' }}>
                {!spaceOn && !timeOn
                  ? 'Both forms removed — pure sensory chaos'
                  : !spaceOn
                  ? 'Without spatial form: objects collapse into undifferentiated sensation'
                  : 'Without temporal form: succession and duration dissolve'}
              </span>
            )}
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={820}
            height={260}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '4px',
              border: '1px solid #2e1f4a',
              background: '#0d0b18',
              display: 'block',
            }}
          />

          <div style={{ marginTop: '12px', fontSize: '11px', color: '#7B5EA7AA', textAlign: 'center', letterSpacing: '1px' }}>
            Sensation points organize through the mind's spatial form into a recognizable object — a chair. The form is contributed by the mind, not found in the world.
          </div>
        </div>

        {/* Core Argument Diagram */}
        <div style={{
          background: '#0f0c1a',
          border: '1px solid #2e1f4a',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#7B5EA7', marginBottom: '20px', textTransform: 'uppercase' }}>
            The Core Argument — Kant's Proof
          </div>
          <ArgumentDiagram />
          <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#b8a8cc', marginTop: '20px', margin: '20px 0 0 0' }}>
            Space and time cannot be empirical concepts because we can represent empty space and time without any objects — yet we cannot represent any object outside spatial or temporal relations. This asymmetry reveals that space and time are more fundamental than their contents: they are the conditions of the possibility of objects, not objects themselves.
          </p>
        </div>

        {/* Mathematics Panel */}
        <div style={{
          background: '#0f0c1a',
          border: '1px solid #2e1f4a',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#7B5EA7', marginBottom: '16px', textTransform: 'uppercase' }}>
            Mathematics: Pure Intuition vs. Pure Concept
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            {['intuition', 'concept'].map(mode => (
              <button
                key={mode}
                onMouseEnter={() => mode !== mathMode && setHoverMathToggle(mode)}
                onMouseLeave={() => setHoverMathToggle(false)}
                onClick={() => setMathMode(mode)}
                style={{
                  cursor: 'pointer',
                  padding: '8px 18px',
                  borderRadius: '4px',
                  border: `1.5px solid ${mathMode === mode ? mathContent[mode].color : '#3d2a5e'}`,
                  background: mathMode === mode ? '#1e1230' : '#130e1e',
                  color: mathMode === mode ? mathContent[mode].color : '#776688',
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  transition: 'all 0.2s',
                  boxShadow: mathMode === mode ? `0 0 10px ${mathContent[mode].color}44` : 'none',
                }}
              >
                {mode === 'intuition' ? 'Kant: From Intuition' : 'Rationalist: From Concept'}
              </button>
            ))}
          </div>
          <div style={{
            background: '#1a1028',
            border: `1px solid ${mathContent[mathMode].color}55`,
            borderRadius: '5px',
            padding: '18px 20px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: mathContent[mathMode].color, marginBottom: '10px' }}>
              {mathContent[mathMode].title}
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.8', color: '#c4b8da' }}>
              {mathContent[mathMode].body}
            </p>
          </div>
          {mathMode === 'intuition' && (
            <div style={{ marginTop: '16px' }}>
              <GeometrySketch />
            </div>
          )}
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ padding: '0 40px', maxWidth: '900px', margin: '0 auto 24px auto' }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(123,94,167,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7B5EA7", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7B5EA7" : "rgba(123,94,167,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#a080d0" : "rgba(123,94,167,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#9a78cc",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(123,94,167,0.08)",
              border: "1px solid rgba(123,94,167,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7B5EA7", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{ padding: '0 40px', maxWidth: '900px', margin: '0 auto 24px auto' }}>
        <div style={{
          background: '#1a1025cc',
          border: '1px solid #2e1f4a',
          borderLeft: '4px solid #7B5EA7',
          borderRadius: '6px',
          padding: '24px 28px',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#7B5EA7', marginBottom: '12px', textTransform: 'uppercase' }}>
            The Difficulty
          </div>
          <p style={{ margin: '0 0 14px 0', fontSize: '14px', lineHeight: '1.8', color: '#d4c8e8' }}>
            If all experienced objects exist only within mind-contributed space and time, then things as they exist independently of minds must be neither spatial nor temporal. But if things-in-themselves are non-spatial and non-temporal, how can they causally affect our senses to produce the sensory content that our minds then organize? A cause acting on a sensory faculty seems to require spatial contact or at minimum temporal sequence — yet those are precisely the forms the mind supposedly contributes. This is Kant's notorious problem of affection: the very machinery required to explain why we receive sensation seems to demand the spatial and temporal relations that the theory places on the mind's side of the divide.
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#9a7acc', fontStyle: 'italic' }}>
            This pressure forces the next development: if the forms of sensible intuition organize raw sensation into spatial and temporal experience, what further structures does the understanding contribute when it applies concepts and categories to the already-formed sensory manifold?
          </p>
        </div>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{ padding: '0 40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: '#100d1acc',
          border: '1px solid #2e1f4a',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setEchosOpen(v => !v)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#d4c8e8',
              fontFamily: 'Georgia, serif',
            }}
          >
            <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#7B5EA7', textTransform: 'uppercase' }}>
              Real-World Echoes
            </span>
            {echosOpen ? <ChevronUp size={16} color="#7B5EA7" /> : <ChevronDown size={16} color="#7B5EA7" />}
          </button>
          {echosOpen && (
            <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #2e1f4a' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 20 }}>
                <div style={{ borderLeft: '3px solid #7B5EA7', borderRadius: '0 6px 6px 0', background: 'rgba(123,94,167,0.07)', padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a880cc', marginBottom: 6 }}>The Chair You Sit On</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>The chair exists as a spatial object — with dimensions, position, and orientation — only because your mind organizes incoming sensory signals through the form of space. The wood and upholstery produce sensory effects; your mind contributes the spatial framework that turns those effects into a coherent three-dimensional object. Without the form of space, there would be no 'here' or 'there,' no shape, no location.</p>
                </div>
                <div style={{ borderLeft: '3px solid #7B5EA7', borderRadius: '0 6px 6px 0', background: 'rgba(123,94,167,0.07)', padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a880cc', marginBottom: 6 }}>Geometric Necessity</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>The Pythagorean theorem holds with absolute necessity not because it describes some Platonic realm of abstract triangles, but because it describes the structure of the spatial form through which every outer object must be represented. It is impossible for us to experience a triangle that violates it — not because nature is constrained, but because our mode of representing spatial objects guarantees the theorem in advance.</p>
                </div>
                <div style={{ borderLeft: '3px solid #7B5EA7', borderRadius: '0 6px 6px 0', background: 'rgba(123,94,167,0.07)', padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a880cc', marginBottom: 6 }}>Neuroscience and Perceptual Construction</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>Contemporary neuroscience confirms that the brain actively constructs spatial and temporal representations rather than passively recording them. The 'spatial present' is a neural construction; temporal order is imposed on sensory signals that arrive with varying delays. Kant anticipated this constructivist picture two centuries before brain imaging, though his version is transcendental rather than empirical.</p>
                </div>
                <div style={{ borderLeft: '3px solid #7B5EA7', borderRadius: '0 6px 6px 0', background: 'rgba(123,94,167,0.07)', padding: '14px 18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a880cc', marginBottom: 6 }}>Einstein's Relativity — A Challenge?</div>
                  <p style={{ margin: 0, fontSize: 13, color: '#b8b0a8', lineHeight: 1.7 }}>Einstein showed that space and time are relative to reference frames and intertwined as spacetime. Some argue this refutes Kant's claim that Euclidean space is a necessary form. Others reply that Kant's deeper point survives: whatever the structure of our perceptual space turns out to be, it is still a form contributed by the subject, not read off from things-in-themselves.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 36, fontSize: 12, color: '#1a0a2e', letterSpacing: 1, maxWidth: '900px', margin: '36px auto 0 auto', padding: '0 40px' }}>
        Part 4 of 21 — Kant's Critical Philosophy
      </div>
    </div>
  );
}

function ConceptChip({ concept, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        padding: '7px 14px',
        borderRadius: '20px',
        border: `1.5px solid ${active ? '#7B5EA7' : hovered ? '#5a4080' : '#3a2855'}`,
        background: active ? '#2e1f4a' : hovered ? '#1e1530' : '#180f28',
        color: active ? '#d4c0f0' : hovered ? '#b8a0d8' : '#8870a8',
        fontFamily: 'Georgia, serif',
        fontSize: '12px',
        transition: 'all 0.18s',
        boxShadow: active ? '0 0 8px #7B5EA755' : 'none',
      }}
    >
      {concept.label}
    </button>
  );
}

function ArgumentDiagram() {
  const steps = [
    { label: 'Can we represent empty space with no objects?', answer: 'Yes', color: '#7B5EA7' },
    { label: 'Can we represent objects outside space?', answer: 'No', color: '#a05080' },
    { label: 'Therefore: space is more fundamental than objects', answer: '', color: '#5080a0' },
    { label: 'Space is not derived from objects — it is their condition', answer: '', color: '#508050' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '14px',
            minWidth: '20px',
          }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: step.color,
              flexShrink: 0,
              marginTop: '4px',
              boxShadow: `0 0 6px ${step.color}88`,
            }} />
            {i < steps.length - 1 && (
              <div style={{
                width: '2px',
                flex: 1,
                background: `linear-gradient(${step.color}, ${steps[i + 1].color})`,
                marginTop: '2px',
                minHeight: '24px',
              }} />
            )}
          </div>
          <div style={{
            padding: '8px 0 16px 0',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <span style={{ fontSize: '13px', color: '#c8b8e0', lineHeight: '1.5' }}>{step.label}</span>
            {step.answer && (
              <span style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: step.answer === 'Yes' ? '#78c88a' : '#e07878',
                minWidth: '30px',
                textAlign: 'right',
              }}>
                {step.answer}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function GeometrySketch() {
  return (
    <div style={{
      background: '#130e1e',
      border: '1px solid #3d2a5e55',
      borderRadius: '5px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      <svg width="140" height="100" style={{ flexShrink: 0 }}>
        {/* Triangle */}
        <polygon points="70,10 130,90 10,90" fill="none" stroke="#7B5EA7" strokeWidth="1.5" />
        {/* Auxiliary parallel line at top */}
        <line x1="10" y1="10" x2="130" y2="10" stroke="#7B5EA755" strokeWidth="1" strokeDasharray="4,3" />
        {/* Angle arcs */}
        <path d="M 70 10 L 85 10" stroke="#a0c0e0" strokeWidth="1" fill="none" />
        <path d="M 10 90 Q 22 75 30 90" stroke="#e0a060" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <path d="M 130 90 Q 118 75 110 90" stroke="#80c080" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        {/* Labels */}
        <text x="65" y="8" fontSize="9" fill="#a0c0e0" fontFamily="Georgia, serif">α</text>
        <text x="15" y="86" fontSize="9" fill="#e0a060" fontFamily="Georgia, serif">β</text>
        <text x="115" y="86" fontSize="9" fill="#80c080" fontFamily="Georgia, serif">γ</text>
        <text x="28" y="107" fontSize="8" fill="#7B5EA7aa" fontFamily="Georgia, serif">α + β + γ = 180°</text>
      </svg>
      <div style={{ flex: 1, minWidth: '180px' }}>
        <div style={{ fontSize: '12px', color: '#7B5EA7', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Constructed in Pure Intuition
        </div>
        <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.7', color: '#b8a8cc' }}>
          The angle-sum theorem is verified by constructing the triangle in spatial intuition and drawing an auxiliary parallel line. The proof requires seeing the figure, not merely analyzing definitions. The necessity is intuitive — built into the spatial form itself.
        </p>
      </div>
    </div>
  );
}

function EchoItem({ title, body }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: '18px',
        paddingLeft: '16px',
        borderLeft: `2px solid ${hovered ? '#7B5EA7' : '#3d2a5e'}`,
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#c8b4e8', marginBottom: '5px' }}>{title}</div>
      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.75', color: '#a898bc' }}>{body}</p>
    </div>
  );
}

// ─── Part 5: The Categories and the Logic of Experience ───
function CategoriesLogicOfExperience() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [substanceEnabled, setSubstanceEnabled] = useState(true);
  const [causalityEnabled, setCausalityEnabled] = useState(true);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animTick, setAnimTick] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const keyConcepts = [
    { id: "pure_concepts", label: "Pure Concepts of Understanding", desc: "The twelve categories that Kant derives from the forms of logical judgment — such as Substance, Causality, and Unity. Unlike empirical concepts, they are contributed by the understanding itself and are the a priori conditions for any possible experience of objects. Without them, the sensory manifold would remain a formless stream of impressions." },
    { id: "table_judgments", label: "Table of Judgments", desc: "Kant's derivation of the categories from the traditional logical forms of judgment: Universal/Particular/Singular, Affirmative/Negative/Infinite, Categorical/Hypothetical/Disjunctive, Problematic/Assertoric/Apodeictic. Each logical form has a corresponding pure concept of the understanding, providing a systematic rather than arbitrary list of categories." },
    { id: "schematism", label: "Schematism", desc: "The mediating function by which the pure categories (timeless, purely conceptual) are applied to the sensible intuitions (always temporal). The schema of each category is a temporal determination: the schema of Causality is 'necessary succession in time,' which connects the abstract concept to actual temporal experience of events." },
    { id: "transcendental_logic", label: "Transcendental Logic", desc: "Kant's innovation: a logic that deals not merely with the form of thought but with the relation between pure concepts and possible experience. General logic abstracts from all content; transcendental logic investigates which pure concepts can have genuine application to objects of experience, and which overstep that boundary." },
    { id: "second_analogy", label: "Second Analogy", desc: "Kant's proof that every alteration must have a cause operating according to a rule — directed against Hume's skepticism. The argument: to experience an objective event (as distinct from a mere subjective sequence of impressions), we must already apply the concept of Causality to order our perceptions as necessarily successive. Causality is thus constitutive of event-experience." },
  ];

  const categories = [
    {
      group: "Quantity",
      groupColor: "#1B4F72",
      forms: [
        { judgment: "Universal (All S are P)", category: "Unity", description: "The concept of a single, unified whole — one object considered as a totality." },
        { judgment: "Particular (Some S are P)", category: "Plurality", description: "The concept of many — experience of multiple distinct items." },
        { judgment: "Singular (This S is P)", category: "Totality", description: "The complete sum — unity of unity and plurality." },
      ]
    },
    {
      group: "Quality",
      groupColor: "#1A5276",
      forms: [
        { judgment: "Affirmative (S is P)", category: "Reality", description: "That which corresponds to a sensation in general — the positive filling of experience." },
        { judgment: "Negative (S is not P)", category: "Negation", description: "The absence or privation — the zero of intuition." },
        { judgment: "Infinite (S is non-P)", category: "Limitation", description: "Reality combined with negation — a bounded, limited reality." },
      ]
    },
    {
      group: "Relation",
      groupColor: "#154360",
      forms: [
        { judgment: "Categorical (S is P)", category: "Substance / Accident", description: "That which endures while properties change — the persistent bearer of qualities without which objects dissolve into fleeting impressions." },
        { judgment: "Hypothetical (If P then Q)", category: "Cause / Effect", description: "The rule of necessary succession — without this, events are merely associated, not objectively ordered in time." },
        { judgment: "Disjunctive (S is P or Q)", category: "Community / Reciprocity", description: "Substances standing in mutual causal interaction — the ground of coexistence." },
      ]
    },
    {
      group: "Modality",
      groupColor: "#0E2F44",
      forms: [
        { judgment: "Problematic (S may be P)", category: "Possibility / Impossibility", description: "Agreement with the formal conditions of experience — what is coherently thinkable in experience." },
        { judgment: "Assertoric (S is P)", category: "Existence / Non-existence", description: "Connection with material conditions of experience — what is actually perceived." },
        { judgment: "Apodeictic (S must be P)", category: "Necessity / Contingency", description: "Determination by universal conditions of experience — what must be given those conditions." },
      ]
    }
  ];

  const allForms = categories.flatMap((g, gi) =>
    g.forms.map((f, fi) => ({ ...f, group: g.group, groupColor: g.groupColor, globalIndex: gi * 3 + fi }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimTick(t => t + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = animTick * 0.05;

    if (!substanceEnabled && !causalityEnabled) {
      // total chaos
      for (let i = 0; i < 40; i++) {
        const x = (Math.sin(i * 2.3 + t * (i % 5 + 1)) * 0.5 + 0.5) * W;
        const y = (Math.cos(i * 1.7 + t * (i % 3 + 0.5)) * 0.5 + 0.5) * H;
        const hue = (i * 37 + t * 30) % 360;
        ctx.beginPath();
        ctx.arc(x, y, 3 + Math.sin(i + t) * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue},80%,60%)`;
        ctx.fill();
      }
      ctx.fillStyle = "#e8c97a";
      ctx.font = "13px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Pure chaos — no substance, no causality", W / 2, H - 14);
      return;
    }

    if (!substanceEnabled) {
      // property streams, no persisting objects
      for (let i = 0; i < 6; i++) {
        const baseX = (i + 0.5) * (W / 6);
        for (let j = 0; j < 8; j++) {
          const frac = (j / 8 + t * 0.3 * (i % 2 === 0 ? 1 : -1)) % 1;
          const y = frac * H;
          const alpha = Math.sin(frac * Math.PI);
          ctx.beginPath();
          ctx.arc(baseX + Math.sin(t + i + j) * 18, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120,180,255,${alpha * 0.85})`;
          ctx.fill();
        }
      }
      ctx.fillStyle = "#7ec8e3";
      ctx.font = "13px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Properties stream by — no enduring bearer", W / 2, H - 14);
      return;
    }

    if (!causalityEnabled) {
      // objects visible but events in random/reversible order
      const objects = [
        { label: "A", x: W * 0.18 },
        { label: "B", x: W * 0.38 },
        { label: "C", x: W * 0.58 },
        { label: "D", x: W * 0.78 },
      ];
      const order = [0, 1, 2, 3];
      const shuffled = order.map(i => ({
        ...objects[i],
        y: H * 0.35 + Math.sin(t * 0.7 + i * 1.6) * H * 0.25,
      }));
      shuffled.forEach((obj, i) => {
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = "#1B4F72";
        ctx.fill();
        ctx.strokeStyle = "#7ec8e3";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(obj.label, obj.x, obj.y + 5);

        if (i < shuffled.length - 1) {
          const nx = shuffled[(i + 1) % shuffled.length];
          ctx.beginPath();
          ctx.moveTo(obj.x + 18, obj.y);
          ctx.lineTo(nx.x - 18, nx.y);
          ctx.strokeStyle = "rgba(230,100,100,0.5)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      const arrows = ["?", "?", "?"];
      arrows.forEach((a, i) => {
        const midX = (shuffled[i].x + shuffled[i + 1 < shuffled.length ? i + 1 : i].x) / 2;
        const midY = (shuffled[i].y + shuffled[i + 1 < shuffled.length ? i + 1 : i].y) / 2;
        ctx.fillStyle = "#e87474";
        ctx.font = "bold 16px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(a, midX, midY - 8);
      });

      ctx.fillStyle = "#e87474";
      ctx.font = "13px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("Objects persist but succession is arbitrary — no causal order", W / 2, H - 14);
      return;
    }

    // Both enabled — ordered experience
    const ship = { x: ((t * 0.4) % 1.3 - 0.15) * W, y: H * 0.38 };
    const riverY = H * 0.5;

    // River
    ctx.beginPath();
    ctx.moveTo(0, riverY - 20);
    ctx.bezierCurveTo(W * 0.25, riverY - 10, W * 0.75, riverY + 10, W, riverY - 5);
    ctx.lineTo(W, riverY + 30);
    ctx.bezierCurveTo(W * 0.75, riverY + 20, W * 0.25, riverY + 35, 0, riverY + 25);
    ctx.closePath();
    ctx.fillStyle = "rgba(27,79,114,0.35)";
    ctx.fill();
    ctx.strokeStyle = "rgba(126,200,227,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Banks
    [0, 1].forEach(side => {
      const yBase = side === 0 ? riverY - 22 : riverY + 32;
      for (let b = 0; b < 8; b++) {
        ctx.beginPath();
        ctx.arc(b * (W / 7) + 20, yBase + Math.sin(b * 1.3) * 6, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(60,100,50,0.4)";
        ctx.fill();
      }
    });

    // Ship
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.beginPath();
    ctx.moveTo(-20, 8);
    ctx.lineTo(20, 8);
    ctx.lineTo(14, -2);
    ctx.lineTo(-14, -2);
    ctx.closePath();
    ctx.fillStyle = "#c9a84c";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(0, -22);
    ctx.lineTo(12, -8);
    ctx.closePath();
    ctx.fillStyle = "#e8e8e8";
    ctx.fill();
    ctx.restore();

    // Arrow showing direction
    ctx.beginPath();
    ctx.moveTo(ship.x + 22, ship.y + 2);
    ctx.lineTo(ship.x + 40, ship.y + 2);
    ctx.strokeStyle = "#7ec8e3";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ship.x + 38, ship.y - 4);
    ctx.lineTo(ship.x + 44, ship.y + 2);
    ctx.lineTo(ship.x + 38, ship.y + 8);
    ctx.fillStyle = "#7ec8e3";
    ctx.fill();

    // Label
    ctx.fillStyle = "#a8d8ea";
    ctx.font = "12px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Ship moving downstream", W / 2, riverY + 58);
    ctx.fillStyle = "#c9e8b0";
    ctx.font = "12px Georgia, serif";
    ctx.fillText("Causally ordered succession — necessarily upstream to downstream", W / 2, riverY + 74);

    // Substance indicator
    ctx.fillStyle = "#7ec8e3";
    ctx.font = "bold 12px Georgia, serif";
    ctx.textAlign = "left";
    ctx.fillText("Substance: ship persists through time", 14, 22);
    ctx.fillStyle = "#c9e8b0";
    ctx.fillText("Causality: position B necessarily follows A", 14, 40);

  }, [animTick, substanceEnabled, causalityEnabled]);

  const groupColors = ["#1B4F72", "#1A5276", "#154360", "#0E2F44"];
  const groupHighlight = ["#2471A3", "#2980B9", "#1A6B9A", "#1A5276"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #0d2b40 0%, #07111a 55%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      padding: "36px 20px 60px 20px",
      color: "#d8e8f0",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 10, textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#5b8fa8", textTransform: "uppercase", marginBottom: 6 }}>Part 5 of 21 · Kant's Critical Philosophy</div>
          <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#e8f4fc", margin: "0 0 8px 0", letterSpacing: 0.5 }}>The Categories and the Logic of Experience</h1>
          <p style={{ fontSize: 15, color: "#7aadcc", margin: 0, fontStyle: "italic" }}>Kant derived twelve pure concepts of understanding from the logical forms of judgment, showing how the mind organizes intuitions into coherent experience of objects.</p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(10,20,32,0.85)",
          border: "1px solid #1B4F72",
          borderLeft: "4px solid #1B4F72",
          borderRadius: 8,
          padding: "22px 28px",
          marginBottom: 28,
          boxShadow: "0 0 24px rgba(27,79,114,0.18)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#5b8fa8", textTransform: "uppercase", marginBottom: 10 }}>The Problem</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#c8dde8" }}>
            Establishing that space and time are forms of intuition still leaves open the question of how the spatial-temporal manifold is organized into coherent experience of distinct, enduring, causally-connected objects rather than remaining a chaotic stream of impressions. The senses deliver raw material; but what binds floating qualities into a ship, and what makes its downstream movement a necessary succession rather than a reversible dream?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(8,18,28,0.92)",
          border: "1px solid #1B4F72",
          borderRadius: 10,
          padding: "28px 24px",
          marginBottom: 28,
          boxShadow: "0 0 32px rgba(27,79,114,0.22)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#5b8fa8", textTransform: "uppercase", marginBottom: 6 }}>Main Visualization</div>
          <h2 style={{ fontSize: 18, fontWeight: "normal", color: "#a8d8ea", margin: "0 0 6px 0" }}>The Table of Categories</h2>
          <p style={{ fontSize: 13, color: "#5b8fa8", margin: "0 0 20px 0", fontStyle: "italic" }}>
            Click any row to reveal the category and its meaning. Each logical form of judgment has its exact experiential counterpart.
          </p>

          {/* Two-column table */}
          {categories.map((group, gi) => (
            <div key={group.group} style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: 11,
                letterSpacing: 3,
                color: groupHighlight[gi],
                textTransform: "uppercase",
                marginBottom: 8,
                paddingLeft: 4,
                borderBottom: `1px solid ${groupColors[gi]}`,
                paddingBottom: 4,
              }}>
                {group.group}
              </div>
              {group.forms.map((form, fi) => {
                const idx = gi * 3 + fi;
                const isHovered = hoveredRow === idx;
                const isSelected = selectedRow === idx;
                return (
                  <div
                    key={fi}
                    onClick={() => setSelectedRow(isSelected ? null : idx)}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 30px 1fr",
                      alignItems: "center",
                      gap: 0,
                      marginBottom: 6,
                      cursor: "pointer",
                      borderRadius: 6,
                      background: isSelected
                        ? "rgba(27,79,114,0.28)"
                        : isHovered
                        ? "rgba(27,79,114,0.15)"
                        : "rgba(255,255,255,0.03)",
                      border: isSelected
                        ? `1px solid ${groupHighlight[gi]}`
                        : "1px solid rgba(255,255,255,0.05)",
                      transition: "background 0.2s, border 0.2s",
                      overflow: "hidden",
                    }}
                  >
                    {/* Judgment form */}
                    <div style={{
                      padding: "10px 14px",
                      fontSize: 13,
                      color: isHovered || isSelected ? "#e8f4fc" : "#9bbccc",
                      fontStyle: "italic",
                    }}>
                      {form.judgment}
                    </div>

                    {/* Arrow */}
                    <div style={{ textAlign: "center", fontSize: 16, color: groupHighlight[gi], transition: "transform 0.3s", transform: isSelected ? "scale(1.4)" : "scale(1)" }}>
                      →
                    </div>

                    {/* Category */}
                    <div style={{
                      padding: "10px 14px",
                      fontSize: 13,
                      fontWeight: isSelected ? "bold" : "normal",
                      color: isSelected ? "#e8c97a" : isHovered ? "#a8d8ea" : "#7aadcc",
                      transition: "color 0.2s",
                    }}>
                      {form.category}
                    </div>
                  </div>
                );
              })}
              {group.forms.map((form, fi) => {
                const idx = gi * 3 + fi;
                if (selectedRow !== idx) return null;
                return (
                  <div key={`desc-${fi}`} style={{
                    background: "rgba(27,79,114,0.18)",
                    border: `1px solid ${groupHighlight[gi]}`,
                    borderRadius: 6,
                    padding: "12px 16px",
                    marginBottom: 8,
                    fontSize: 13,
                    color: "#c8dde8",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}>
                    <span style={{ color: "#e8c97a", fontWeight: "bold", fontStyle: "normal" }}>{form.category}: </span>
                    {form.description}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Experience simulation */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ fontSize: 15, fontWeight: "normal", color: "#a8d8ea", margin: "0 0 8px 0", letterSpacing: 0.3 }}>
              Experience Simulation — Disable Categories to See What's Lost
            </h3>
            <p style={{ fontSize: 13, color: "#5b8fa8", margin: "0 0 14px 0", fontStyle: "italic" }}>
              Toggle Substance and Causality to see what experience would become without them.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { label: "Substance / Accident", key: "substance", enabled: substanceEnabled, setEnabled: setSubstanceEnabled },
                { label: "Cause / Effect", key: "causality", enabled: causalityEnabled, setEnabled: setCausalityEnabled },
              ].map(({ label, key, enabled, setEnabled }) => {
                return (
                  <button
                    key={key}
                    onClick={() => setEnabled(!enabled)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 20,
                      border: enabled ? "1.5px solid #2471A3" : "1.5px solid #7a3030",
                      background: enabled ? "rgba(27,79,114,0.35)" : "rgba(90,30,30,0.35)",
                      color: enabled ? "#a8d8ea" : "#e87474",
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "Georgia, serif",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: enabled ? "#2471A3" : "#7a3030",
                      boxShadow: enabled ? "0 0 6px #2471A3" : "0 0 6px #7a3030",
                    }} />
                    {enabled ? "Enabled" : "Disabled"}: {label}
                  </button>
                );
              })}
            </div>

            <canvas
              ref={canvasRef}
              width={810}
              height={180}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 8,
                border: "1px solid rgba(27,79,114,0.5)",
                background: "rgba(5,12,20,0.9)",
                display: "block",
              }}
            />

            {(!substanceEnabled || !causalityEnabled) && (
              <div style={{
                marginTop: 12,
                padding: "12px 16px",
                background: "rgba(90,30,30,0.18)",
                border: "1px solid #7a3030",
                borderRadius: 6,
                fontSize: 13,
                color: "#e8b4b4",
                lineHeight: 1.7,
              }}>
                {!substanceEnabled && !causalityEnabled
                  ? "With neither Substance nor Causality, experience collapses entirely. There are no persisting things and no ordered succession — only a phantasmagoria of disconnected qualities drifting through time."
                  : !substanceEnabled
                  ? "Without Substance, there is no bearer for properties. Colors, shapes, and sounds stream past with nothing for them to belong to — experience offers qualities without objects."
                  : "Without Causality, objects persist but their succession is arbitrary. The ship might move upstream or downstream — there is no way to distinguish objective sequence from mere subjective association."}
              </div>
            )}

            {substanceEnabled && causalityEnabled && (
              <div style={{
                marginTop: 12,
                padding: "12px 16px",
                background: "rgba(27,79,114,0.15)",
                border: "1px solid #1B4F72",
                borderRadius: 6,
                fontSize: 13,
                color: "#b8d8e8",
                lineHeight: 1.7,
              }}>
                With both categories active, we experience an ordered cosmos: a ship (substance) moves necessarily downstream (causality). This is Kant's example of how the second Analogy of Experience proves the synthetic a priori necessity of every event having a cause.
              </div>
            )}
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: 26,
            padding: "18px 20px",
            background: "rgba(27,79,114,0.1)",
            borderRadius: 8,
            borderLeft: "3px solid #1B4F72",
          }}>
            <p style={{ margin: "0 0 12px 0", fontSize: 14, lineHeight: 1.8, color: "#c8dde8" }}>
              Beyond space and time, the mind requires a second layer of contribution: twelve categories derived from the twelve logical forms of judgment that unify the spatial-temporal manifold into coherent experience of objects. Without Substance, we could not experience persisting things; without Causality, we could not distinguish objective succession from subjective association.
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "#c8dde8" }}>
              The category of Causality is not discovered in experience — it is brought to experience in order to make objective experience possible. This explains why the second Analogy (every event has a cause) is synthetic a priori: it is a necessary condition for experience itself, not a generalization from it.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(36,113,163,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2471A3", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#2471A3" : "rgba(36,113,163,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#4a95cc" : "rgba(36,113,163,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7aadcc",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(36,113,163,0.08)",
              border: "1px solid rgba(36,113,163,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#2471A3", marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(10,20,32,0.85)",
          border: "1px solid #154360",
          borderLeft: "4px solid #2471A3",
          borderRadius: 8,
          padding: "22px 28px",
          marginBottom: 24,
          boxShadow: "0 0 24px rgba(27,79,114,0.13)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#2471A3", textTransform: "uppercase", marginBottom: 10 }}>The Difficulty</div>
          <p style={{ margin: "0 0 14px 0", fontSize: 15, lineHeight: 1.75, color: "#c8dde8" }}>
            Simply possessing twelve categories is not enough. We need a proof — the transcendental deduction — that these pure concepts necessarily apply to all possible experience. Otherwise there is no guarantee that our conceptual thinking actually corresponds to the objects we encounter. The categories might merely be habits of thought with no objective purchase on reality.
          </p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#7aadcc", fontStyle: "italic" }}>
            This pressure forces the next development: Kant must demonstrate not merely that we use these concepts, but that any possible experience must conform to them — a task he calls the most difficult in the entire Critique.
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(8,18,28,0.9)",
          border: "1px solid #1B4F72",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 0 18px rgba(27,79,114,0.12)",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              padding: "16px 24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, color: "#5b8fa8", textTransform: "uppercase" }}>Real-World Echoes</span>
            {echoesOpen
              ? <ChevronUp size={18} color="#5b8fa8" />
              : <ChevronDown size={18} color="#5b8fa8" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "4px 24px 24px 24px" }}>
              <div style={{
                padding: "16px 18px",
                background: "rgba(27,79,114,0.12)",
                borderRadius: 7,
                marginBottom: 14,
                borderLeft: "3px solid #1B4F72",
              }}>
                <div style={{ fontSize: 12, color: "#2471A3", marginBottom: 6, letterSpacing: 1 }}>The Ship and the House</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b8cdd8" }}>
                  Kant's most vivid illustration: when I survey a house, I may look at the roof before the foundation or the foundation before the roof — the order is subjectively reversible. But when I observe a ship moving downstream, I must perceive the upstream position before the downstream one. The order is not reversible in experience because Causality imposes an objective rule of succession. This asymmetry between perceiving a static object and perceiving an event is only explicable if Causality is a category of experience, not a habit of association.
                </p>
              </div>
              <div style={{
                padding: "16px 18px",
                background: "rgba(27,79,114,0.12)",
                borderRadius: 7,
                borderLeft: "3px solid #1B4F72",
              }}>
                <div style={{ fontSize: 12, color: "#2471A3", marginBottom: 6, letterSpacing: 1 }}>Every Alteration Has a Cause — Not Induction but Precondition</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b8cdd8" }}>
                  The principle "every alteration has a cause" looks like an empirical generalization — as if we checked many events and found each had a cause. But Kant argues it is a condition that makes checking possible in the first place. To recognize that anything has changed at all, we must already be applying a framework that distinguishes objective before-and-after from the mere flow of subjective impression. The principle does not describe the world; it constitutes the possibility of experiencing the world as a world of events.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 6: The Transcendental Deduction and the Unity of Experience ───
function TranscendentalDeductionUnity() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showFailure, setShowFailure] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);

  const keyConcepts = [
    { id: "apperception", label: "Apperception", desc: "Kant's term for self-consciousness — specifically the 'I think' that must be capable of accompanying all my representations. Transcendental apperception is not a knowledge of the self as an object but the formal unity of consciousness required for any experience to count as mine. Without it, representations would belong to no subject and constitute nothing." },
    { id: "synthetic_unity", label: "Synthetic Unity of Consciousness", desc: "The act by which the understanding unifies the manifold of intuition under the 'I think.' This synthesis is not a passive gathering but an active, rule-governed connecting — the same act that produces unified self-awareness simultaneously constitutes an objective world of experience, which is the deduction's central insight." },
    { id: "objective_validity", label: "Objective Validity", desc: "The property of a concept or principle that entitles it to apply necessarily to objects of possible experience rather than merely to subjective states. The transcendental deduction establishes the objective validity of the categories: they are not habits of thought but constitutive conditions of any possible object of experience." },
    { id: "transcendental_unity", label: "Transcendental Unity", desc: "The a priori unity of apperception that is the source of all conceptual synthesis. It differs from empirical self-awareness (inner sense) in that it is not a perception of the self at all, but the formal condition making any perception possible. It is 'transcendental' because it is a condition of experience rather than a fact found within experience." },
    { id: "b_deduction", label: "B-Deduction", desc: "The substantially revised and more rigorous version of the transcendental deduction in the 1787 second edition of the Critique of Pure Reason. The B-Deduction proceeds in two steps: first establishing that the categories are conditions of the unity of apperception, then that this same unity necessarily applies to all objects given in intuition — making the proof tighter and more explicit than the 1781 A-Deduction." },
  ];

  const categories = [
    { id: "causality", name: "Causality", angle: 0, subjectiveSide: "I experience events as mine in sequence", objectiveSide: "Events are constituted as objectively ordered in time", example: "Ship moving downstream: the order of perceptions is irreversible and objective — not my choice" },
    { id: "substance", name: "Substance", angle: 45, subjectiveSide: "My representations cohere as belonging to one subject", objectiveSide: "Objects are constituted as persisting substrates of change", example: "The house I survey: I choose the order, yet the house itself remains a unified object" },
    { id: "unity", name: "Unity", angle: 90, subjectiveSide: "The 'I think' gathers all representations under one self", objectiveSide: "Objects appear as unified wholes, not scattered impressions", example: "A melody heard: simultaneously my unified experience AND an ordered sonic object" },
    { id: "plurality", name: "Plurality", angle: 135, subjectiveSide: "I distinguish among my various representations", objectiveSide: "Objects are constituted as having multiple determinate properties", example: "Perceiving distinct features — yet each feature is also objectively 'in' the thing" },
    { id: "totality", name: "Totality", angle: 180, subjectiveSide: "My experience forms a complete whole over time", objectiveSide: "The world of experience is constituted as a systematic totality", example: "Nature as a whole: simultaneously my total experience and an objective order" },
    { id: "reality", name: "Reality", angle: 225, subjectiveSide: "Positive content fills my consciousness", objectiveSide: "Objects have determinate positive qualities", example: "Color, warmth: felt in me yet also genuinely 'in' the object for experience" },
    { id: "negation", name: "Negation", angle: 270, subjectiveSide: "Absence shapes what I notice and expect", objectiveSide: "Objects are constituted with determinable limits and boundaries", example: "Silence as meaningful: my expectation and the object's limit are one act" },
    { id: "limitation", name: "Limitation", angle: 315, subjectiveSide: "My representations are bounded and graded", objectiveSide: "Objects have intensive magnitude — degrees of quality", example: "Brightness: the degree I sense IS the degree constituted in the phenomenon" },
  ];

  useEffect(() => {
    if (!animating) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    const step = () => {
      angleRef.current = (angleRef.current + 0.15) % 360;
      setRotationAngle(angleRef.current);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [animating]);

  const cx = 280;
  const cy = 280;
  const innerR = 60;
  const outerR = 190;
  const midR = 125;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const getPoint = (angleDeg, r) => ({
    x: cx + r * Math.cos(toRad(angleDeg - 90)),
    y: cy + r * Math.sin(toRad(angleDeg - 90)),
  });

  const activeCategory = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : hoveredCategory
    ? categories.find((c) => c.id === hoveredCategory)
    : null;

  const pulseOpacity = 0.4 + 0.3 * Math.sin(toRad(rotationAngle * 2));

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #0a2018 0%, #060d0a 60%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      padding: "40px 24px",
      color: "#d4e8dc",
    }}>

      {/* HEADER */}
      <div style={{ maxWidth: 860, margin: "0 auto 36px auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#0D4C2E", textTransform: "uppercase", marginBottom: 10, opacity: 0.9 }}>
          Part 6 of 21 · Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#d4e8dc", margin: "0 0 10px 0", lineHeight: 1.3 }}>
          The Transcendental Deduction and the Unity of Experience
        </h1>
        <p style={{ fontSize: 14, color: "#7ab89a", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
          Kant proved that the categories must necessarily apply to all possible experience by showing that the same synthesis producing unified self-consciousness also constitutes objective experience.
        </p>
      </div>

      {/* THE PROBLEM PANEL */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto 36px auto",
        background: "rgba(10,20,14,0.85)",
        border: "1px solid #1a3d28",
        borderLeft: "4px solid #0D4C2E",
        borderRadius: 8,
        padding: "28px 32px",
      }}>
        <div style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#4a9e6a",
          marginBottom: 14,
          fontWeight: "bold",
        }}>The Problem</div>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "#b8d8c4" }}>
          Even granting that the mind possesses twelve categories, we face the <em>deduction problem</em>: without proof that these categories necessarily apply to experience, they could be mere <strong style={{ color: "#e8f5ee" }}>subjective habits of thought</strong> — psychological tendencies we happen to have, with no guaranteed relationship to the objective world. A skeptic could grant that we <em>always</em> think in terms of cause and effect, yet deny that causality is truly in nature. The categories would float free of reality, leaving knowledge without its foundation. This was Kant's self-described "most difficult" problem, the crisis that the Transcendental Deduction had to resolve.
        </p>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto 36px auto",
        background: "rgba(8,18,12,0.9)",
        border: "1px solid #1a3d28",
        borderRadius: 12,
        padding: "36px 32px",
      }}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ margin: "0 0 6px 0", fontSize: 20, color: "#e8f5ee", fontWeight: "normal" }}>
            The Transcendental Deduction and the Unity of Experience
          </h2>
          <p style={{ margin: "0 0 20px 0", fontSize: 13, color: "#6ab88a", lineHeight: 1.6 }}>
            Kant's insight: the synthetic act producing <em>unified self-consciousness</em> is the same act that <em>constitutes objects</em>. Click any category node to explore this double-sided identity.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <button
            onClick={() => setAnimating(!animating)}
            onMouseEnter={(e) => e.target.style.background = "#1a5c38"}
            onMouseLeave={(e) => e.target.style.background = "#0D4C2E"}
            style={{
              background: "#0D4C2E", color: "#d4e8dc", border: "1px solid #2a7a4a",
              borderRadius: 6, padding: "8px 18px", cursor: "pointer",
              fontFamily: "Georgia, serif", fontSize: 13,
              transition: "background 0.2s",
            }}>
            {animating ? "Pause Rotation" : "Resume Rotation"}
          </button>
          <button
            onClick={() => { setShowFailure(!showFailure); setSelectedCategory(null); }}
            onMouseEnter={(e) => { e.target.style.background = showFailure ? "#2a2010" : "#3d1a0a"; }}
            onMouseLeave={(e) => { e.target.style.background = showFailure ? "#1a1208" : "#1a0a04"; }}
            style={{
              background: showFailure ? "#1a1208" : "#1a0a04",
              color: showFailure ? "#e8c87a" : "#c4784a",
              border: `1px solid ${showFailure ? "#6a4a18" : "#5a3020"}`,
              borderRadius: 6, padding: "8px 18px", cursor: "pointer",
              fontFamily: "Georgia, serif", fontSize: 13,
              transition: "background 0.2s",
            }}>
            {showFailure ? "Hide Failure Mode" : "Show: Categories Without Intuition"}
          </button>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              onMouseEnter={(e) => e.target.style.color = "#e8f5ee"}
              onMouseLeave={(e) => e.target.style.color = "#8ab89a"}
              style={{
                background: "transparent", color: "#8ab89a", border: "none",
                cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 13,
                textDecoration: "underline",
              }}>
              Clear selection
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>

          {/* SVG Diagram */}
          <div style={{ flex: "0 0 auto" }}>
            <svg width={560} height={560} style={{ maxWidth: "100%" }}>
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1a7a4a" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#0D4C2E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0D4C2E" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="failGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7a4a1a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7a4a1a" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#2a9a5a" />
                </marker>
                <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#c4784a" />
                </marker>
                <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#4a5a50" />
                </marker>
              </defs>

              {/* Outer ring background */}
              <circle cx={cx} cy={cy} r={outerR + 30} fill="rgba(8,20,12,0.5)" stroke="#1a3d28" strokeWidth={1} />

              {/* Rotating synthesis ring */}
              {!showFailure && (
                <circle
                  cx={cx} cy={cy} r={midR}
                  fill="none"
                  stroke="#0D4C2E"
                  strokeWidth={2}
                  strokeDasharray="12 6"
                  strokeDashoffset={-rotationAngle * 2}
                  opacity={0.6}
                />
              )}

              {/* Failure mode: disconnected dashes */}
              {showFailure && (
                <>
                  <circle cx={cx} cy={cy} r={midR} fill="none" stroke="#5a3020" strokeWidth={1} strokeDasharray="4 8" opacity={0.4} />
                  <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#3a2010" strokeWidth={1} strokeDasharray="2 12" opacity={0.3} />
                </>
              )}

              {/* Center glow */}
              <circle cx={cx} cy={cy} r={innerR + 20}
                fill={showFailure ? "url(#failGlow)" : "url(#centerGlow)"}
                opacity={showFailure ? 0.6 : pulseOpacity}
              />

              {/* Center circle — I Think */}
              <circle cx={cx} cy={cy} r={innerR}
                fill={showFailure ? "#1a0c04" : "#081810"}
                stroke={showFailure ? "#8a4a1a" : "#2a9a5a"}
                strokeWidth={2}
                filter="url(#glow)"
              />
              <text x={cx} y={cy - 10} textAnchor="middle" fill={showFailure ? "#c4784a" : "#7adaaa"} fontSize={14} fontFamily="Georgia, serif" fontStyle="italic">I think</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fill={showFailure ? "#8a5030" : "#4a9a6a"} fontSize={10} fontFamily="Georgia, serif">transcendental</text>
              <text x={cx} y={cy + 22} textAnchor="middle" fill={showFailure ? "#8a5030" : "#4a9a6a"} fontSize={10} fontFamily="Georgia, serif">unity</text>

              {/* Category nodes and arrows */}
              {categories.map((cat, i) => {
                const nodeAngle = cat.angle + (selectedCategory === cat.id ? 0 : 0);
                const outerPt = getPoint(nodeAngle, outerR);
                const innerEdge = getPoint(nodeAngle, innerR + 4);
                const midPt = getPoint(nodeAngle, midR);
                const isSelected = selectedCategory === cat.id;
                const isHovered = hoveredCategory === cat.id;
                const isActive = isSelected || isHovered;

                const arrowColor = showFailure ? "#4a5a50" : isActive ? "#7adaaa" : "#2a7a4a";

                return (
                  <g key={cat.id}>
                    {/* Arrow from center to midpoint (subjective side) */}
                    {!showFailure && (
                      <line
                        x1={innerEdge.x} y1={innerEdge.y}
                        x2={midPt.x - (midPt.x - innerEdge.x) * 0.1}
                        y2={midPt.y - (midPt.y - innerEdge.y) * 0.1}
                        stroke={isActive ? "#7adaaa" : "#1a5a30"}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        markerEnd="url(#arrowGreen)"
                        opacity={isActive ? 1 : 0.5}
                        style={{ transition: "stroke 0.2s, opacity 0.2s" }}
                      />
                    )}

                    {/* Arrow from midpoint to outer (objective side) */}
                    {!showFailure && (
                      <line
                        x1={midPt.x} y1={midPt.y}
                        x2={outerPt.x - (outerPt.x - midPt.x) * 0.15}
                        y2={outerPt.y - (outerPt.y - midPt.y) * 0.15}
                        stroke={isActive ? "#4acaaa" : "#1a4a38"}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        strokeDasharray={isActive ? "none" : "5 3"}
                        markerEnd="url(#arrowGreen)"
                        opacity={isActive ? 1 : 0.4}
                        style={{ transition: "stroke 0.2s" }}
                      />
                    )}

                    {/* Failure mode: floating arrows going nowhere */}
                    {showFailure && (
                      <>
                        <line
                          x1={innerEdge.x} y1={innerEdge.y}
                          x2={midPt.x} y2={midPt.y}
                          stroke="#3a4a40" strokeWidth={1} strokeDasharray="3 5"
                          markerEnd="url(#arrowGray)" opacity={0.3}
                        />
                        <line
                          x1={midPt.x + (Math.random() * 10 - 5)} y1={midPt.y + (Math.random() * 10 - 5)}
                          x2={outerPt.x} y2={outerPt.y}
                          stroke="#3a2010" strokeWidth={1} strokeDasharray="2 8"
                          markerEnd="url(#arrowOrange)" opacity={0.2}
                        />
                      </>
                    )}

                    {/* Midpoint marker (synthesis point) */}
                    {!showFailure && (
                      <circle cx={midPt.x} cy={midPt.y} r={4}
                        fill={isActive ? "#2a9a5a" : "#0D4C2E"}
                        stroke={isActive ? "#7adaaa" : "#2a6a40"}
                        strokeWidth={1}
                        opacity={0.8}
                      />
                    )}

                    {/* Outer node */}
                    <circle
                      cx={outerPt.x} cy={outerPt.y} r={isActive ? 26 : 22}
                      fill={showFailure ? (isActive ? "#1a0c04" : "#0a0a08") : (isActive ? "#0a2018" : "#081410")}
                      stroke={showFailure ? (isActive ? "#8a4a1a" : "#2a1a10") : (isActive ? "#7adaaa" : "#1a5a30")}
                      strokeWidth={isActive ? 2 : 1}
                      style={{ cursor: "pointer", transition: "r 0.2s, stroke 0.2s" }}
                      filter={isActive ? "url(#glow)" : "none"}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      onMouseEnter={() => { setHoveredCategory(cat.id); if (animating) setAnimating(false); }}
                      onMouseLeave={() => { setHoveredCategory(null); setAnimating(true); }}
                    />
                    <text
                      x={outerPt.x} y={outerPt.y + 4}
                      textAnchor="middle"
                      fill={showFailure ? (isActive ? "#c4784a" : "#4a4a44") : (isActive ? "#b8f0d0" : "#6a9a7a")}
                      fontSize={10}
                      fontFamily="Georgia, serif"
                      style={{ cursor: "pointer", pointerEvents: "none", transition: "fill 0.2s" }}
                    >
                      {cat.name}
                    </text>

                    {/* Labels for inner/outer ring */}
                    {i === 0 && !showFailure && (
                      <>
                        <text x={cx + innerR + 12} y={cy - innerR - 30} textAnchor="middle" fill="#2a7a4a" fontSize={9} fontFamily="Georgia, serif" fontStyle="italic">unified self-consciousness</text>
                        <text x={cx + outerR - 10} y={cy - outerR - 10} textAnchor="middle" fill="#2a6a5a" fontSize={9} fontFamily="Georgia, serif" fontStyle="italic">constituted objects</text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Synthesis label on rotating ring */}
              {!showFailure && (
                <text
                  x={cx + midR * Math.cos(toRad(rotationAngle - 90))}
                  y={cy + midR * Math.sin(toRad(rotationAngle - 90)) - 8}
                  textAnchor="middle"
                  fill="#1a6a3a"
                  fontSize={8}
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                  opacity={0.7}
                >
                  synthesis
                </text>
              )}

              {/* Failure mode label */}
              {showFailure && (
                <>
                  <text x={cx} y={cy + innerR + 45} textAnchor="middle" fill="#8a5030" fontSize={11} fontFamily="Georgia, serif" fontStyle="italic">
                    Categories unmoored from intuition:
                  </text>
                  <text x={cx} y={cy + innerR + 62} textAnchor="middle" fill="#6a3820" fontSize={11} fontFamily="Georgia, serif" fontStyle="italic">
                    empty concepts, no objective grip
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Detail Panel */}
          <div style={{ flex: "1 1 200px", minWidth: 200 }}>
            {!showFailure && !activeCategory && (
              <div style={{ padding: "20px 0" }}>
                <p style={{ color: "#4a7a5a", fontSize: 13, lineHeight: 1.8, margin: "0 0 16px 0", fontStyle: "italic" }}>
                  Hover or click a category node to explore how each concept simultaneously unifies experience as mine and constitutes objects as objective.
                </p>
                <div style={{ borderTop: "1px solid #1a3d28", paddingTop: 16, marginTop: 8 }}>
                  <p style={{ color: "#6a9a7a", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                    The <strong style={{ color: "#8ac8aa" }}>rotating ring</strong> represents the continuous synthesis of imagination. The arrows are not two separate processes — they are one act viewed from two directions: inward toward the unified 'I' and outward toward constituted objects.
                  </p>
                </div>
                <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(13,76,46,0.15)", border: "1px solid #0D4C2E", borderRadius: 6 }}>
                  <p style={{ color: "#5a9a7a", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                    <strong style={{ color: "#8ad8aa" }}>Kant's Resolution:</strong> Objects of experience are not independent entities we subsequently think about through categories. They are <em>constituted</em> through categorical synthesis — making categorical conformity necessary, not contingent.
                  </p>
                </div>
              </div>
            )}

            {!showFailure && activeCategory && (
              <div style={{
                background: "rgba(10,25,16,0.8)",
                border: "1px solid #1a5a30",
                borderRadius: 8,
                padding: "20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#4a9e6a", marginBottom: 12 }}>
                  Category
                </div>
                <h3 style={{ margin: "0 0 16px 0", fontSize: 18, color: "#b8f0d0", fontWeight: "normal" }}>
                  {activeCategory.name}
                </h3>

                <div style={{ marginBottom: 14, padding: "12px 14px", background: "rgba(13,76,46,0.2)", borderRadius: 6, borderLeft: "3px solid #0D4C2E" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#4a7a5a", marginBottom: 6 }}>Subjective Side</div>
                  <p style={{ margin: 0, color: "#8ac8aa", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>
                    {activeCategory.subjectiveSide}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "6px 0", color: "#2a7a4a", fontSize: 18 }}>
                  ⟺
                </div>

                <div style={{ marginBottom: 14, padding: "12px 14px", background: "rgba(10,70,50,0.2)", borderRadius: 6, borderLeft: "3px solid #1a7a5a" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#3a8a6a", marginBottom: 6 }}>Objective Side</div>
                  <p style={{ margin: 0, color: "#7adaaa", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>
                    {activeCategory.objectiveSide}
                  </p>
                </div>

                <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(5,15,10,0.6)", borderRadius: 6, border: "1px solid #1a3d28" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#3a6a4a", marginBottom: 6 }}>Kant's Example</div>
                  <p style={{ margin: 0, color: "#5a9a7a", fontSize: 12, lineHeight: 1.7 }}>
                    {activeCategory.example}
                  </p>
                </div>

                <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(13,76,46,0.1)", borderRadius: 6 }}>
                  <p style={{ margin: 0, color: "#3a7a5a", fontSize: 11, lineHeight: 1.6, fontStyle: "italic" }}>
                    The same synthetic act produces both sides. There is no gap between "how I experience it" and "what makes it an object" — the deduction closes the gap entirely.
                  </p>
                </div>
              </div>
            )}

            {showFailure && (
              <div style={{
                background: "rgba(20,8,4,0.85)",
                border: "1px solid #5a3020",
                borderRadius: 8,
                padding: "20px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a5030", marginBottom: 12 }}>
                  Failure Mode
                </div>
                <h3 style={{ margin: "0 0 14px 0", fontSize: 16, color: "#c4784a", fontWeight: "normal" }}>
                  Categories Without Sensible Intuition
                </h3>
                <p style={{ color: "#9a6040", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px 0" }}>
                  When reason extends categorical thinking beyond possible experience — to things-in-themselves, to the world as a whole, to God or the soul — the categories lose their grip on sensible intuition.
                </p>
                <p style={{ color: "#7a4828", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px 0" }}>
                  The synthetic act that normally ties 'I think' to 'constituted object' finds no intuitive material to work on. The arrows float free. Causality becomes an empty demand for a first cause. Substance becomes a substanceless subject.
                </p>
                <div style={{ padding: "12px 14px", background: "rgba(20,8,4,0.6)", borderRadius: 6, border: "1px solid #3a1808" }}>
                  <p style={{ margin: 0, color: "#6a3818", fontSize: 12, lineHeight: 1.7, fontStyle: "italic" }}>
                    "Thoughts without content are empty; intuitions without concepts are blind." — Kant, Critique of Pure Reason, A51/B75
                  </p>
                </div>
                <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(15,5,2,0.8)", borderRadius: 6, border: "1px solid #2a1008" }}>
                  <p style={{ margin: 0, color: "#5a2e10", fontSize: 12, lineHeight: 1.7 }}>
                    This is the domain of transcendental illusion — where pure reason generates antinomies, paralogisms, and the ideal of a supreme being. Not errors of logic, but structural overreach.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KEY CONCEPTS */}
      <div style={{ maxWidth: 860, margin: "0 auto 28px auto" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(26,90,64,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1a5a40", marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {keyConcepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: "6px 14px",
                background: hoveredConcept === c.id ? "#1a5a40" : "rgba(26,90,64,0.1)",
                border: `1px solid ${hoveredConcept === c.id ? "#3a8a6a" : "rgba(26,90,64,0.35)"}`,
                borderRadius: 20,
                fontSize: 12,
                cursor: "pointer",
                color: hoveredConcept === c.id ? "#f0ead8" : "#5a9a7a",
                transition: "all 0.2s",
                fontFamily: "Georgia, serif",
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{
            background: "rgba(26,90,64,0.08)",
            border: "1px solid rgba(26,90,64,0.3)",
            borderRadius: 6,
            padding: "16px 20px",
          }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: "#1a5a40", marginBottom: 8 }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
        </div>
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto 28px auto",
        background: "rgba(10,14,10,0.85)",
        border: "1px solid #1a3020",
        borderLeft: "4px solid #1a5a40",
        borderRadius: 8,
        padding: "28px 32px",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#3a8a6a", marginBottom: 14, fontWeight: "bold" }}>
          The Difficulty
        </div>
        <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: 15, color: "#7ab8a0" }}>
          Kant's success contains its own limitation. By proving that categories necessarily apply to all possible experience, the deduction simultaneously establishes where categorical knowledge <em>ends</em>. The same argument that rescues the categories from being mere subjective habits confines them to the domain of sensible intuition — to phenomena, to what can appear in space and time.
        </p>
        <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: 15, color: "#7ab8a0" }}>
          When reason, unsatisfied with the conditioned world of experience, reaches further — toward the unconditioned totality of nature, toward a first cause, toward the soul as a simple substance — it applies categories without their necessary correlate in sensible intuition. The synthesis that successfully constitutes objects of experience now operates in a void, generating what Kant calls <strong style={{ color: "#a8d8c0" }}>transcendental illusion</strong>: not mere logical errors, but inevitable overreach built into reason's own structure.
        </p>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: "#4a8a6a", fontStyle: "italic" }}>
          This pressure forces the next development: an investigation into how pure reason, in its very drive toward the unconditioned, generates systematic antinomies — contradictions within which two equally valid arguments reach opposite conclusions about the nature of the world.
        </p>
      </div>

      {/* REAL-WORLD ECHOES */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        background: "rgba(8,12,10,0.85)",
        border: "1px solid #1a2d1e",
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setEchoesOpen(!echoesOpen)}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(13,76,46,0.15)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          style={{
            width: "100%", background: "transparent", border: "none",
            padding: "20px 32px", cursor: "pointer", display: "flex",
            justifyContent: "space-between", alignItems: "center",
            fontFamily: "Georgia, serif", transition: "background 0.2s",
          }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#3a7a5a", fontWeight: "bold" }}>
            Real-World Echoes
          </span>
          {echoesOpen
            ? <ChevronUp size={18} color="#3a7a5a" />
            : <ChevronDown size={18} color="#3a7a5a" />
          }
        </button>

        {echoesOpen && (
          <div style={{ padding: "4px 32px 28px 32px" }}>
            <div style={{ borderTop: "1px solid #1a2d1e", paddingTop: 20, marginBottom: 20 }}>
              <p style={{ color: "#4a7a5a", fontSize: 13, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                The Transcendental Deduction's core insight — that the same cognitive act both unifies a subject and constitutes an object — resonates across philosophy of mind, cognitive science, and phenomenology.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ padding: "18px 20px", background: "rgba(13,76,46,0.1)", border: "1px solid #1a3d28", borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: "#4a9e6a", marginBottom: 8, fontWeight: "bold", letterSpacing: 1 }}>
                  Kant's Own Illustration: Ship vs. House
                </div>
                <p style={{ margin: 0, color: "#5a8a6a", fontSize: 13, lineHeight: 1.7 }}>
                  When I perceive a ship moving downstream, the order of my perceptions (bow first, then stern) is not reversible — I could not have perceived it in the opposite order without a different event. The order of perception is determined by the event's objective causal structure. Contrast this with surveying a house: I freely choose to look at the roof before the basement. Here the order of perception is subjectively determined. The category of causality is what lets me distinguish these cases — constituting one sequence as objectively necessary while allowing the other as freely variable. This is not a post-hoc interpretation but the very act that makes either sequence a coherent experience.
                </p>
              </div>

              <div style={{ padding: "18px 20px", background: "rgba(13,76,46,0.08)", border: "1px solid #1a3028", borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: "#3a8a6a", marginBottom: 8, fontWeight: "bold", letterSpacing: 1 }}>
                  Contemporary Philosophy of Mind: Constructive Cognition
                </div>
                <p style={{ margin: 0, color: "#4a7a60", fontSize: 13, lineHeight: 1.7 }}>
                  Contemporary cognitive science increasingly echoes the deduction's insight. "Active inference" frameworks (Karl Friston, Andy Clark) hold that perception is not passive reception but predictive construction — the brain generates models of the world that simultaneously constitute what we experience and reflect our generative models' structure. The boundary between "my predictions" and "the perceived object" is not fixed prior to the cognitive act; it is established by it. Kant's point that there is no pre-constituted object waiting to be subsequently categorized finds striking resonance in enactivist and predictive processing accounts of mind.
                </p>
              </div>

              <div style={{ padding: "18px 20px", background: "rgba(13,76,46,0.06)", border: "1px solid #152820", borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: "#2a7a5a", marginBottom: 8, fontWeight: "bold", letterSpacing: 1 }}>
                  The Limits of Categorical Extension: Cosmology and Fundamental Physics
                </div>
                <p style={{ margin: 0, color: "#3a6a50", fontSize: 13, lineHeight: 1.7 }}>
                  Physicists and philosophers of science grapple with what happens when our conceptual framework — evolved to handle medium-sized objects in ordinary experience — is pushed to extremes: quantum indeterminacy, the singularity at the Big Bang, the universe "as a whole." These domains resist straightforward application of causality, substance, and temporal ordering. Whether this represents merely practical difficulty or something like Kant's principled limit — that categories constitutively require something like sensible intuition to get traction — remains a live and productive debate in foundations of physics.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Part 7: Phenomena, Noumena, and the Limits of Knowledge ───
function PhenomenaNoumenaLimitsOfKnowledge() {
  const [probeY, setProbeY] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [probeStartY, setProbeStartY] = useState(60);
  const [bouncing, setBouncing] = useState(false);
  const [showAffection, setShowAffection] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [probeInfo, setProbeInfo] = useState(null);
  const [bounceOffset, setBounceOffset] = useState(0);
  const bounceRef = useRef(null);
  const svgRef = useRef(null);

  const PHENOM_TOP = 40;
  const PHENOM_BOTTOM = 160;
  const COGNITIVE_BOTTOM = 260;
  const NOUMEN_BOTTOM = 370;
  const PROBE_MIN = PHENOM_TOP;
  const PROBE_MAX = NOUMEN_BOTTOM - 20;
  const BOUNCE_THRESHOLD = COGNITIVE_BOTTOM + 10;

  const getLayerInfo = (y) => {
    if (y < PHENOM_BOTTOM) return { layer: "phenomena", label: "Phenomena", text: "Empirical objects are genuinely real here — tables, trees, persons. Space and time structure all appearances. The categories of understanding apply fully. Science is possible." };
    if (y < COGNITIVE_BOTTOM) return { layer: "cognitive", label: "Cognitive Framework", text: "Space, time, and the twelve categories structure raw sensory input. This is the transcendental machinery — real for all finite rational beings, but not features of things-in-themselves." };
    return { layer: "noumena", label: "Things-in-Themselves", text: "Nothing positive can be known here. The probe cannot penetrate. We must think this concept to avoid absolutizing our cognitive conditions, but knowledge halts absolutely." };
  };

  useEffect(() => {
    setProbeInfo(getLayerInfo(probeY));
  }, [probeY]);

  const startDrag = (e) => {
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStartY(clientY);
    setProbeStartY(probeY);
    setBouncing(false);
    if (bounceRef.current) clearInterval(bounceRef.current);
  };

  const onDrag = useCallback((e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragStartY;
    const svgEl = svgRef.current;
    const svgRect = svgEl ? svgEl.getBoundingClientRect() : { height: 420 };
    const scale = 420 / svgRect.height;
    let newY = probeStartY + delta * scale;
    newY = Math.max(PROBE_MIN, Math.min(PROBE_MAX, newY));
    if (newY >= BOUNCE_THRESHOLD) {
      setProbeY(BOUNCE_THRESHOLD - 5);
      triggerBounce();
    } else {
      setProbeY(newY);
    }
  }, [isDragging, dragStartY, probeStartY]);

  const triggerBounce = () => {
    if (bouncing) return;
    setBouncing(true);
    let frame = 0;
    const frames = [0, -18, -8, -22, -5, -14, 0];
    if (bounceRef.current) clearInterval(bounceRef.current);
    bounceRef.current = setInterval(() => {
      if (frame >= frames.length) {
        clearInterval(bounceRef.current);
        setBouncing(false);
        setBounceOffset(0);
        return;
      }
      setBounceOffset(frames[frame]);
      frame++;
    }, 60);
  };

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onDrag);
    window.addEventListener("touchend", endDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [onDrag, endDrag]);

  const concepts = [
    { id: "phenomena", label: "Phenomena", x: 60, y: 90, color: "#b06ab3", desc: "Phenomena are appearances — the objects we perceive through space, time, and the categories. Kant insists they are not illusions. The tree you see is perfectly real as a phenomenon. Empirical realism is secured." },
    { id: "noumena", label: "Noumena", x: 300, y: 330, color: "#4A1942", desc: "Noumena are things-in-themselves — reality as it exists independently of any mind. We are compelled to think this concept, but we can know nothing positive about it. It serves a purely negative, limiting function." },
    { id: "cognitive", label: "Cognitive Framework", x: 170, y: 200, color: "#7a3b7a", desc: "Space and time as pure forms of intuition, plus the twelve categories of the understanding, form the transcendental framework. These conditions make experience possible — but they also mark its absolute limits." },
    { id: "affection", label: "Problem of Affection", x: 430, y: 210, color: "#8B0000", desc: "The deepest paradox: things-in-themselves must somehow 'affect' our sensibility to produce appearances. But affection implies causality — a temporal relation that applies only to phenomena. How can the non-temporal cause anything?" },
  ];

  const currentLayer = probeInfo ? probeInfo.layer : "phenomena";

  return (
    <div
      onMouseMove={onDrag}
      onMouseUp={endDrag}
      style={{
        background: "radial-gradient(ellipse at 40% 30%, #2a0a28 0%, #1a0518 40%, #0a0a0f 100%)",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        padding: "36px 24px",
        color: "#e8dce8",
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 820, margin: "0 auto 32px auto" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#7a5a7a", marginBottom: 8, textTransform: "uppercase" }}>Part 7 of 21 · Kant's Critical Philosophy</div>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#d4a8d4", margin: "0 0 8px 0", lineHeight: 1.2 }}>
          Phenomena, Noumena, and the Limits of Knowledge
        </h1>
        <p style={{ fontSize: 15, color: "#a07aa0", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
          The distinction between appearances and things-in-themselves marks the absolute boundary of human knowledge while preserving a realm for moral freedom.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{ maxWidth: 820, margin: "0 auto 28px auto" }}>
        <div style={{
          background: "#12081a",
          border: "1px solid #2e1030",
          borderLeft: "4px solid #4A1942",
          borderRadius: 8,
          padding: "20px 24px",
          boxShadow: "0 4px 24px #0006",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#7a3b7a", textTransform: "uppercase", marginBottom: 10, fontWeight: "bold" }}>The Problem</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#c8b0c8" }}>
            The transcendental deduction proved that the categories of the understanding apply necessarily to all possible experience — but this very success creates a crisis. If the categories are conditions of <em>experience</em>, they cannot reach beyond experience to things-in-themselves. The machinery that makes knowledge possible is simultaneously the wall that confines it. A sharp, apparently uncrossable boundary opens between knowable appearances and an unknowable reality-in-itself, and philosophy must reckon honestly with what lies on each side.
          </p>
        </div>
      </div>

      {/* Main Visualization */}
      <div style={{ maxWidth: 820, margin: "0 auto 28px auto" }}>
        <div style={{
          background: "#0e051a",
          border: "1px solid #2e1030",
          borderRadius: 10,
          padding: "24px",
          boxShadow: "0 8px 40px #0009",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 13, color: "#b09ab0", letterSpacing: 1 }}>
              Drag the <span style={{ color: "#e8b4e8", fontWeight: "bold" }}>probe</span> downward through the layers
            </div>
            <button
              onClick={() => setShowAffection(v => !v)}
              style={{
                background: showAffection ? "#4A1942" : "#1e0e2a",
                border: "1px solid #6a2a6a",
                color: showAffection ? "#f0d0f0" : "#9a7a9a",
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5,
                transition: "all 0.3s",
              }}
            >
              {showAffection ? "Hide" : "Reveal"} Affection Paradox
            </button>
          </div>

          {/* SVG Geological Diagram */}
          <div style={{ position: "relative" }}>
            <svg
              ref={svgRef}
              width="100%"
              viewBox="0 0 620 420"
              style={{ display: "block", borderRadius: 8, cursor: isDragging ? "grabbing" : "default", overflow: "visible" }}
            >
              {/* Defs */}
              <defs>
                <linearGradient id="phenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3d1f5a" />
                  <stop offset="100%" stopColor="#2a1040" />
                </linearGradient>
                <linearGradient id="cogGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e0a30" />
                  <stop offset="100%" stopColor="#150820" />
                </linearGradient>
                <linearGradient id="noumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d0510" />
                  <stop offset="100%" stopColor="#050208" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="probeGlow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <pattern id="gridPat" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6a3a8a" strokeWidth="0.4" opacity="0.5" />
                </pattern>
                <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#cc3333" />
                </marker>
              </defs>

              {/* Layer 1: Phenomena */}
              <rect x="10" y="30" width="480" height="130" rx="6" fill="url(#phenGrad)" stroke="#5a2a6a" strokeWidth="1" />
              <text x="22" y="52" fill="#c090d0" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic" letterSpacing="2">PHENOMENA</text>
              <text x="22" y="66" fill="#8a6a9a" fontSize="9" fontFamily="Georgia, serif">Empirical Reality — Objects of Possible Experience</text>

              {/* Objects in Phenomena layer */}
              {/* Tree */}
              <g transform="translate(60, 90)">
                <rect x="-3" y="30" width="6" height="25" fill="#6b4226" />
                <ellipse cx="0" cy="20" rx="18" ry="22" fill="#2d7a3d" />
                <ellipse cx="-8" cy="30" rx="10" ry="13" fill="#3a8a4a" />
                <ellipse cx="8" cy="28" rx="10" ry="14" fill="#3a8a4a" />
                <text x="0" y="70" textAnchor="middle" fill="#90c090" fontSize="8" fontFamily="Georgia, serif">tree</text>
              </g>
              {/* Chair */}
              <g transform="translate(150, 88)">
                <rect x="-14" y="20" width="28" height="4" fill="#8a6030" />
                <rect x="-14" y="24" width="4" height="22" fill="#7a5025" />
                <rect x="10" y="24" width="4" height="22" fill="#7a5025" />
                <rect x="-8" y="24" width="4" height="14" fill="#7a5025" />
                <rect x="4" y="24" width="4" height="14" fill="#7a5025" />
                <rect x="-8" y="2" width="4" height="22" fill="#8a6030" />
                <rect x="4" y="2" width="4" height="22" fill="#8a6030" />
                <rect x="-10" y="2" width="20" height="4" fill="#8a6030" />
                <text x="0" y="60" textAnchor="middle" fill="#c0a070" fontSize="8" fontFamily="Georgia, serif">chair</text>
              </g>
              {/* Person */}
              <g transform="translate(240, 80)">
                <circle cx="0" cy="10" r="10" fill="#d4a070" />
                <rect x="-10" y="22" width="20" height="28" rx="4" fill="#4a6a9a" />
                <rect x="-18" y="24" width="7" height="20" rx="3" fill="#4a6a9a" />
                <rect x="11" y="24" width="7" height="20" rx="3" fill="#4a6a9a" />
                <rect x="-8" y="50" width="7" height="18" rx="3" fill="#3a5a8a" />
                <rect x="1" y="50" width="7" height="18" rx="3" fill="#3a5a8a" />
                <text x="0" y="82" textAnchor="middle" fill="#b0b0e0" fontSize="8" fontFamily="Georgia, serif">person</text>
              </g>

              {/* Scientific labels */}
              <text x="320" y="90" fill="#7a9aba" fontSize="8" fontFamily="Georgia, serif">mass: 75kg</text>
              <text x="320" y="103" fill="#7a9aba" fontSize="8" fontFamily="Georgia, serif">velocity: 0 m/s</text>
              <text x="320" y="116" fill="#7a9aba" fontSize="8" fontFamily="Georgia, serif">position: (x,y,z)</text>
              <text x="380" y="90" fill="#8aaaba" fontSize="8" fontFamily="Georgia, serif">F = ma</text>
              <text x="380" y="103" fill="#8aaaba" fontSize="8" fontFamily="Georgia, serif">E = hν</text>
              <text x="380" y="116" fill="#8aaaba" fontSize="8" fontFamily="Georgia, serif">∇·E = ρ/ε₀</text>

              {/* Layer 2: Cognitive Framework */}
              <rect x="10" y="162" width="480" height="100" rx="0" fill="url(#cogGrad)" stroke="#3a1a4a" strokeWidth="1" />
              <rect x="10" y="162" width="480" height="100" fill="url(#gridPat)" opacity="0.7" />
              <text x="22" y="182" fill="#9a70b0" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic" letterSpacing="2">COGNITIVE FRAMEWORK</text>
              <text x="22" y="195" fill="#6a4a7a" fontSize="9" fontFamily="Georgia, serif">Transcendental Conditions — Space · Time · Categories</text>

              {/* Grid lines suggestion */}
              <line x1="10" y1="162" x2="490" y2="162" stroke="#5a2a7a" strokeWidth="2" strokeDasharray="4,3" />
              <line x1="10" y1="262" x2="490" y2="262" stroke="#5a2a7a" strokeWidth="2" strokeDasharray="4,3" />

              {/* Category labels */}
              {["Unity", "Plurality", "Totality", "Reality", "Negation", "Causality", "Substance", "Possibility", "Necessity"].map((cat, i) => (
                <text key={cat} x={30 + (i % 3) * 150} y={215 + Math.floor(i / 3) * 16} fill="#7a5a9a" fontSize="9" fontFamily="Georgia, serif">{cat}</text>
              ))}
              <text x="380" y="215" fill="#7a5a9a" fontSize="9" fontFamily="Georgia, serif">Time →</text>
              <text x="380" y="231" fill="#7a5a9a" fontSize="9" fontFamily="Georgia, serif">Space ↕</text>
              <text x="380" y="247" fill="#7a5a9a" fontSize="9" fontFamily="Georgia, serif">Intuition ◈</text>

              {/* Layer 3: Noumena */}
              <rect x="10" y="264" width="480" height="130" rx="0" fill="url(#noumGrad)" stroke="#200820" strokeWidth="1" />
              <text x="22" y="286" fill="#4a2a50" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic" letterSpacing="2">THINGS-IN-THEMSELVES</text>
              <text x="22" y="299" fill="#2e1a36" fontSize="9" fontFamily="Georgia, serif">Beyond All Possible Experience — Unknowable</text>

              {/* Large question mark */}
              <text x="240" y="360" textAnchor="middle" fill="#1e0e24" fontSize="80" fontFamily="Georgia, serif" fontWeight="bold">?</text>
              <text x="240" y="330" textAnchor="middle" fill="#2a1030" fontSize="11" fontFamily="Georgia, serif" letterSpacing="1">· · · · · · · · · · · · · · · · · · · · ·</text>
              <text x="240" y="388" textAnchor="middle" fill="#2a1030" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">featureless — no categories apply here</text>

              {/* Bottom border */}
              <rect x="10" y="392" width="480" height="8" rx="0" fill="#08040c" />

              {/* Affection paradox arrows */}
              {showAffection && (
                <g>
                  {[320, 360, 400].map((x, i) => (
                    <g key={x}>
                      <line
                        x1={x} y1={370}
                        x2={x} y2={270}
                        stroke="#cc3333"
                        strokeWidth="1.5"
                        strokeDasharray="5,4"
                        markerEnd="url(#arrowRed)"
                        opacity={0.7}
                      />
                      <text x={x + 4} y={310 + i * 12} fill="#cc5555" fontSize="7" fontFamily="Georgia, serif" fontStyle="italic">
                        {i === 0 ? "How?" : i === 1 ? "causal?" : "temporal?"}
                      </text>
                    </g>
                  ))}
                  <rect x="300" y="376" width="120" height="16" rx="4" fill="#1a0a0a" stroke="#cc3333" strokeWidth="1" strokeDasharray="3,2" />
                  <text x="360" y="388" textAnchor="middle" fill="#cc5555" fontSize="8" fontFamily="Georgia, serif">Affection: ???</text>
                </g>
              )}

              {/* Knowledge Probe */}
              <g
                transform={`translate(0, ${bounceOffset})`}
                style={{ cursor: "grab" }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
              >
                {/* Probe shaft */}
                <line
                  x1="500" y1={30}
                  x2="500" y2={probeY + 16}
                  stroke={currentLayer === "noumena" ? "#cc4444" : "#c090d0"}
                  strokeWidth="2"
                  strokeDasharray={currentLayer === "noumena" ? "none" : "4,2"}
                  filter="url(#glow)"
                />
                {/* Probe head */}
                <circle
                  cx="500" cy={probeY}
                  r="14"
                  fill={currentLayer === "noumena" ? "#3a0a0a" : currentLayer === "cognitive" ? "#2a1040" : "#2a0a40"}
                  stroke={currentLayer === "noumena" ? "#cc4444" : "#c090d0"}
                  strokeWidth="2"
                  filter="url(#probeGlow)"
                />
                <text x="500" y={probeY + 4} textAnchor="middle" fill={currentLayer === "noumena" ? "#cc4444" : "#e0c0e0"} fontSize="12" fontFamily="Georgia, serif">
                  {currentLayer === "noumena" ? "✕" : "⊙"}
                </text>
                {/* Probe label */}
                <rect x="515" y={probeY - 12} width="90" height="22" rx="4" fill="#0e061a" stroke="#4A1942" strokeWidth="1" />
                <text x="560" y={probeY + 3} textAnchor="middle" fill="#b090c0" fontSize="9" fontFamily="Georgia, serif">knowledge probe</text>
                {/* Drag hint */}
                <text x="560" y={probeY + 20} textAnchor="middle" fill="#5a3a6a" fontSize="8" fontFamily="Georgia, serif">↕ drag</text>
              </g>

              {/* Bounce ripple effect */}
              {bouncing && (
                <ellipse
                  cx="500"
                  cy={BOUNCE_THRESHOLD - 5}
                  rx="30" ry="6"
                  fill="none"
                  stroke="#cc4444"
                  strokeWidth="2"
                  opacity="0.7"
                />
              )}

              {/* Right side info panel */}
              <rect x="500" y="30" width="110" height="150" rx="6" fill="#0a0514" stroke="#2e1030" strokeWidth="1" />
              <text x="555" y="50" textAnchor="middle" fill="#7a5a8a" fontSize="8" fontFamily="Georgia, serif" letterSpacing="1">LAYER INFO</text>
              {probeInfo && (
                <>
                  <rect x="508" y="58" width="94" height="16" rx="3" fill={
                    currentLayer === "phenomena" ? "#2a104a" : currentLayer === "cognitive" ? "#1a0828" : "#1a0610"
                  } />
                  <text x="555" y="70" textAnchor="middle" fill={
                    currentLayer === "phenomena" ? "#c090e0" : currentLayer === "cognitive" ? "#9070b0" : "#aa4444"
                  } fontSize="9" fontFamily="Georgia, serif" fontWeight="bold">
                    {probeInfo.label}
                  </text>
                  <foreignObject x="508" y="80" width="94" height="95">
                    <div style={{ fontSize: 7.5, color: "#8a6a9a", fontFamily: "Georgia, serif", lineHeight: 1.5, padding: "2px 4px" }}>
                      {currentLayer === "phenomena" && "Rich empirical knowledge accessible. Categories apply. Science works here."}
                      {currentLayer === "cognitive" && "Transcendental machinery visible. Space, time, and categories structure experience."}
                      {currentLayer === "noumena" && "Probe blocked. No positive knowledge possible. Concept required but empty."}
                    </div>
                  </foreignObject>
                </>
              )}
            </svg>
          </div>

          {/* Probe Info Box */}
          {probeInfo && (
            <div style={{
              marginTop: 16,
              padding: "14px 18px",
              background: currentLayer === "noumena" ? "#1a0508" : currentLayer === "cognitive" ? "#100820" : "#150a28",
              border: `1px solid ${currentLayer === "noumena" ? "#6a1a1a" : currentLayer === "cognitive" ? "#3a1a5a" : "#3a1a6a"}`,
              borderLeft: `3px solid ${currentLayer === "noumena" ? "#cc4444" : currentLayer === "cognitive" ? "#7a5a9a" : "#c090d0"}`,
              borderRadius: 6,
              transition: "all 0.4s",
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: currentLayer === "noumena" ? "#aa4444" : "#7a5a8a", marginBottom: 6 }}>
                Probe reading — {probeInfo.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#c0a8c0", lineHeight: 1.7 }}>{probeInfo.text}</p>
            </div>
          )}

          {/* Two-Aspect vs Two-Object note */}
          <div style={{ marginTop: 18, padding: "12px 16px", background: "#0a0514", border: "1px solid #1e0e2e", borderRadius: 6 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#5a3a6a", marginBottom: 8 }}>Interpretive Debate</div>
            <p style={{ margin: 0, fontSize: 12, color: "#8a6a8a", lineHeight: 1.7 }}>
              <strong style={{ color: "#b090c0" }}>Two-Object Reading:</strong> Phenomena and noumena are literally two different entities — one we access, one we cannot. <span style={{ color: "#5a4a6a" }}>|</span> <strong style={{ color: "#b090c0" }}>Two-Aspect Reading:</strong> They are the same entity described in two ways — as it appears to us vs. as it is independently. The two-aspect reading dissolves some paradoxes but sharpens others.
            </p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 820, margin: "0 auto 24px auto" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(122,59,122,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7a3b7a", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7a3b7a" : "rgba(122,59,122,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#b06ab3" : "rgba(122,59,122,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#b06ab3",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(122,59,122,0.08)",
              border: "1px solid rgba(122,59,122,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7a3b7a", marginBottom: 8 }}>
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
      <div style={{ maxWidth: 820, margin: "0 auto 28px auto" }}>
        <div style={{
          background: "#12060a",
          border: "1px solid #2e1020",
          borderLeft: "4px solid #8B2020",
          borderRadius: 8,
          padding: "20px 24px",
          boxShadow: "0 4px 24px #0006",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#7a2a2a", textTransform: "uppercase", marginBottom: 10, fontWeight: "bold" }}>The Difficulty</div>
          <p style={{ margin: "0 0 14px 0", fontSize: 14, lineHeight: 1.75, color: "#c8a0a8" }}>
            The phenomena-noumena distinction generates an irresolvable internal tension. Kant requires things-in-themselves to <em>affect</em> our sensibility — for without this, appearances would be appearances of nothing, and empirical realism would collapse into pure idealism. Yet affection is a causal relation. Causality is one of the twelve categories of the understanding. And the categories, Kant insists, apply only to phenomena, only within the framework of time.
          </p>
          <p style={{ margin: "0 0 14px 0", fontSize: 14, lineHeight: 1.75, color: "#c8a0a8" }}>
            How can a non-temporal, non-spatial thing-in-itself causally produce sensory states in a temporal mind? The arrow of affection crosses the very boundary that the Critical philosophy declares uncrossable. Every subsequent systematic philosopher — Fichte, Schelling, Hegel — will seize on this crack in the Kantian edifice.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#8a5a5a", fontStyle: "italic", lineHeight: 1.6 }}>
            This pressure forces the next development: some will eliminate things-in-themselves entirely, collapsing reality back into the structures of self-positing consciousness; others will attempt to think the absolute directly, beyond all finite cognitive frameworks.
          </p>
        </div>
      </div>

      {/* Real-World Echoes */}
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{
          background: "#0e0618",
          border: "1px solid #2a1030",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(v => !v)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: 3, color: "#6a4a7a", textTransform: "uppercase", fontWeight: "bold" }}>Real-World Echoes</span>
              <span style={{ fontSize: 11, color: "#4a3a5a", fontStyle: "italic" }}>— concrete parallels</span>
            </div>
            {echoesOpen
              ? <ChevronUp size={16} color="#6a4a7a" />
              : <ChevronDown size={16} color="#6a4a7a" />
            }
          </button>

          {echoesOpen && (
            <div style={{ padding: "4px 24px 24px 24px" }}>
              <div style={{ borderTop: "1px solid #1e0e2e", paddingTop: 18 }}>
                <div style={{ marginBottom: 18, padding: "14px 16px", background: "#0a0418", borderRadius: 6, borderLeft: "2px solid #4A1942" }}>
                  <div style={{ fontSize: 11, color: "#9a7aaa", marginBottom: 6, fontWeight: "bold" }}>The Experienced Tree</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#8a708a", lineHeight: 1.7 }}>
                    When you perceive the oak in the garden, you are perceiving a genuine phenomenon — not an illusion, but a real empirical object structured by your spatial, temporal, and categorical faculties. Its green color, its height, its causal powers (shade, oxygen, falling branches) are all perfectly real within the human cognitive framework. What the tree is apart from all possible perception — whether it has color, extension, or any knowable property at all — remains permanently inaccessible. The scientific tree of physics (mass, charge, particle fields) is still a phenomenon, just a more refined one.
                  </p>
                </div>
                <div style={{ padding: "14px 16px", background: "#0a0418", borderRadius: 6, borderLeft: "2px solid #6a2a4a" }}>
                  <div style={{ fontSize: 11, color: "#9a7aaa", marginBottom: 6, fontWeight: "bold" }}>The Dual Standpoint of the Self</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#8a708a", lineHeight: 1.7 }}>
                    You can consider yourself in two ways. As a phenomenon — a body in space, a psychological subject in time, governed by the laws of nature and subject to empirical psychology — you are a link in the causal chain, predictable in principle. As a noumenon — a moral agent whose spontaneous rational will is not reducible to any causal story — you are free. This duality is not incoherence but the very condition of moral life. The same action that the neuroscientist may explain causally is the action for which you are held responsible. Kant needs both descriptions to be legitimate.
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

// ─── Part 8: The Antinomies and the Illusions of Pure Reason ───
function AntinomiesIllusionsPureReason() {
  const [activeAntinomy, setActiveAntinomy] = useState(0);
  const [runState, setRunState] = useState('idle'); // idle, running, collided, resolved
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ runState: 'idle', progress: 0 });

  const keyConcepts = [
    { id: "antinomy", label: "Antinomy", desc: "A conflict of reason with itself in which two mutually contradictory propositions can each be proven with apparently equally valid arguments. Kant identifies four antinomies in the first Critique — conflicts about the world's temporal beginning, its composition, the existence of freedom, and the necessity of a supreme being. These are not accidental errors but inevitable products of reason's drive toward the unconditioned." },
    { id: "transcendental_dialectic", label: "Transcendental Dialectic", desc: "The second major division of the Critique of Pure Reason, following the Transcendental Analytic. While the Analytic shows the legitimate use of the understanding within experience, the Dialectic exposes the illusions generated when pure reason overreaches experience. It analyzes the paralogisms (illusions about the soul), the antinomies (illusions about the world), and the ideal of pure reason (the illusion of a supreme being)." },
    { id: "cosmological_ideas", label: "Cosmological Ideas", desc: "Kant's term for the four rational ideas concerning the world-whole: the idea of a world-totality in time (beginning), in space (extent), in composition (simples), and in causality (freedom vs. necessity). These ideas arise inevitably from reason's drive to systematize experience by finding the unconditioned condition — but no possible experience can ever confirm or refute them." },
    { id: "regulative_constitutive", label: "Regulative vs. Constitutive", desc: "The crucial distinction between two roles a principle can play. A constitutive principle claims to establish facts about objects of experience (as the categories do). A regulative principle guides inquiry without claiming to describe any actual object — it functions as a maxim for systematizing knowledge. The ideas of reason (including the world-totality and God) can only be used regulatively, not constitutively, without generating illusion." },
    { id: "paralogisms", label: "Paralogisms", desc: "Fallacious syllogisms about the soul that pure reason commits when it tries to infer a simple, immortal, personal substance from the formal unity of self-consciousness. The paralogisms reveal that 'I think' does not license any inference about the soul as a substantial object — the transcendental unity of apperception is purely formal and tells us nothing about what the self is in itself." },
  ];

  const antinomies = [
    {
      number: 1,
      type: 'Mathematical',
      topic: 'Space & Time',
      thesis: 'The world has a beginning in time and is limited in space.',
      thesisArgs: ['Infinite regress impossible', 'Actual infinity incoherent'],
      antithesis: 'The world has no beginning in time and no limits in space.',
      antithesisArgs: ['Finite time requires empty time before', 'Spatial limit absurd'],
      resolution: 'Both False',
      resolutionText: 'The world as a totality is not an object of possible experience. Neither finite nor infinite applies — the question is illegitimate.',
      color: '#8B1A1A',
    },
    {
      number: 2,
      type: 'Mathematical',
      topic: 'Composition',
      thesis: 'Every composite substance consists of simple parts.',
      thesisArgs: ['Remove composite: simples remain', 'Ultimate constituents required'],
      antithesis: 'No composite thing consists of simple parts.',
      antithesisArgs: ['Space infinitely divisible', 'No empirical simples found'],
      resolution: 'Both False',
      resolutionText: 'Infinite divisibility of appearances does not prove or deny simples in things-in-themselves. The composition of the world-whole cannot be given in experience.',
      color: '#8B1A1A',
    },
    {
      number: 3,
      type: 'Dynamical',
      topic: 'Causality',
      thesis: 'Causality by natural law is not the only kind — there is also causality through freedom.',
      thesisArgs: ['Moral responsibility requires freedom', 'Nature cannot explain itself'],
      antithesis: 'There is no freedom — everything happens according to natural law.',
      antithesisArgs: ['Every event has a prior cause', 'Gaps in nature are inexplicable'],
      resolution: 'Both True',
      resolutionText: 'Natural necessity governs all phenomena. Freedom may be real in the noumenal realm. Two realms, two kinds of causality — no contradiction.',
      color: '#C47B2B',
    },
    {
      number: 4,
      type: 'Dynamical',
      topic: 'Necessity',
      thesis: 'There belongs to the world a being that is absolutely necessary.',
      thesisArgs: ['Contingent chain requires ground', 'Something must be unconditioned'],
      antithesis: 'No absolutely necessary being exists, in or outside the world.',
      antithesisArgs: ['Every existence is contingent', 'Necessary being inconceivable'],
      resolution: 'Both True',
      resolutionText: 'Phenomenal world: all is contingent. Noumenal realm: an unconditioned ground may exist without contradiction. The conflict is dissolved by distinguishing realms.',
      color: '#C47B2B',
    },
  ];

  const current = antinomies[activeAntinomy];

  useEffect(() => {
    setRunState('idle');
    stateRef.current = { runState: 'idle', progress: 0 };
    if (animRef.current) cancelAnimationFrame(animRef.current);
    drawCanvas('idle', 0);
  }, [activeAntinomy]);

  const drawCanvas = useCallback((state, progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0d0508');
    bgGrad.addColorStop(1, '#050305');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const isMath = current.type === 'Mathematical';
    const isDyn = current.type === 'Dynamical';

    if (state === 'resolved') {
      if (isMath) {
        drawExplosion(ctx, W / 2, H / 2, progress, W, H);
        drawBothFalse(ctx, W, H, progress);
      } else {
        drawDynamicalResolution(ctx, W, H, progress);
      }
      return;
    }

    if (state === 'collided') {
      drawCollision(ctx, W / 2, H / 2, W, H);
      return;
    }

    // Track
    const trackY = H / 2;
    ctx.strokeStyle = '#3a1a1a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, trackY);
    ctx.lineTo(W, trackY);
    ctx.stroke();

    // Rails
    for (let x = 0; x < W; x += 30) {
      ctx.strokeStyle = '#2a1212';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, trackY - 6);
      ctx.lineTo(x, trackY + 6);
      ctx.stroke();
    }

    // Train A (Thesis) — moves right
    const trainW = 100;
    const trainH = 50;
    const gap = state === 'running' ? (1 - progress) * (W / 2 - 120) : (W / 2 - 120);
    const trainAX = 30 + gap;
    const trainBX = W - 30 - gap - trainW;

    drawTrain(ctx, trainAX, trackY - trainH / 2, trainW, trainH, '#8B1A1A', 'THESIS', true, current.thesis.substring(0, 22) + '...');
    drawTrain(ctx, trainBX, trackY - trainH / 2, trainW, trainH, '#1A3A8B', 'ANTITHESIS', false, current.antithesis.substring(0, 22) + '...');

    // Steam particles
    if (state === 'running') {
      for (let i = 0; i < 4; i++) {
        const alpha = Math.random() * 0.5;
        ctx.fillStyle = `#ffffff${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(trainAX + trainW + Math.random() * 15, trackY - trainH / 2 - Math.random() * 20, 3 + Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(trainBX - Math.random() * 15, trackY - trainH / 2 - Math.random() * 20, 3 + Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Labels
    ctx.fillStyle = '#cc4444';
    ctx.font = 'bold 11px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('THESIS', trainAX + trainW / 2, trackY - trainH / 2 - 8);
    ctx.fillStyle = '#4466cc';
    ctx.fillText('ANTITHESIS', trainBX + trainW / 2, trackY - trainH / 2 - 8);
  }, [current, activeAntinomy]);

  function drawTrain(ctx, x, y, w, h, color, label, facingRight, text) {
    // Body
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    // Window
    ctx.fillStyle = '#ffeeaa';
    ctx.fillRect(x + (facingRight ? w - 25 : 10), y + 8, 18, 18);

    // Wheels
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(x + 15, y + h, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w - 15, y + h, 8, 0, Math.PI * 2);
    ctx.fill();

    // Chimney
    ctx.fillStyle = '#555';
    const chimneyX = facingRight ? x + w - 15 : x + 8;
    ctx.fillRect(chimneyX, y - 12, 10, 12);
  }

  function drawCollision(ctx, cx, cy, W, H) {
    // Flash background
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
    grad.addColorStop(0, '#ffaa00');
    grad.addColorStop(0.3, '#cc4400');
    grad.addColorStop(1, '#0d0508');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Explosion spikes
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const len = 60 + Math.random() * 80;
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = 2 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('COLLISION!', cx, cy - 20);
    ctx.font = '12px Georgia, serif';
    ctx.fillStyle = '#ffeeaa';
    ctx.fillText('Click "Resolve" to see the outcome', cx, cy + 10);
  }

  function drawExplosion(ctx, cx, cy, progress, W, H) {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150 * progress);
    grad.addColorStop(0, '#ffaa0044');
    grad.addColorStop(1, '#0d050800');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const len = 40 * progress;
      ctx.strokeStyle = '#ffcc0066';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.stroke();
    }
  }

  function drawBothFalse(ctx, W, H, progress) {
    const cx = W / 2;
    const cy = H / 2;

    ctx.fillStyle = '#cc4444';
    ctx.globalAlpha = Math.min(1, progress * 2);
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('BOTH FALSE', cx, cy - 20);

    ctx.fillStyle = '#ffeeaa';
    ctx.font = '13px Georgia, serif';
    ctx.globalAlpha = Math.min(1, Math.max(0, progress * 2 - 0.5));
    const lines = ['The world-whole is not an object', 'of possible experience.'];
    lines.forEach((line, i) => ctx.fillText(line, cx, cy + 15 + i * 20));
    ctx.globalAlpha = 1;
  }

  function drawDynamicalResolution(ctx, W, H, progress) {
    const cx = W / 2;
    const midY = H / 2;

    // Track split
    const splitProgress = Math.min(1, progress * 1.5);
    const topTrackY = midY - 60 * splitProgress;
    const botTrackY = midY + 60 * splitProgress;

    // Top track (Noumena / Thesis)
    ctx.strokeStyle = '#C47B2B';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, midY);
    ctx.lineTo(W - 20, topTrackY);
    ctx.stroke();

    // Bottom track (Phenomena / Antithesis)
    ctx.strokeStyle = '#4488cc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, midY);
    ctx.lineTo(W - 20, botTrackY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Left track
    ctx.strokeStyle = '#3a1a1a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(cx, midY);
    ctx.stroke();

    // Train thesis going to noumena track
    if (progress > 0.3) {
      const tp = Math.min(1, (progress - 0.3) / 0.7);
      const tx = cx + tp * (W - 20 - cx - 100);
      const ty = midY + tp * (topTrackY - midY);
      drawSmallTrain(ctx, tx, ty - 20, 70, 30, '#8B1A1A');
      ctx.fillStyle = '#C47B2B';
      ctx.font = '10px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = Math.min(1, tp * 2);
      ctx.fillText('FREEDOM', tx + 35, ty - 30);
      ctx.fillText('(Noumena)', tx + 35, ty - 18);
      ctx.globalAlpha = 1;
    }

    // Train antithesis going to phenomena track
    if (progress > 0.3) {
      const tp = Math.min(1, (progress - 0.3) / 0.7);
      const tx = cx + tp * (W - 20 - cx - 100);
      const ty = midY + tp * (botTrackY - midY);
      drawSmallTrain(ctx, tx, ty - 20, 70, 30, '#1A3A8B');
      ctx.fillStyle = '#4488cc';
      ctx.font = '10px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = Math.min(1, tp * 2);
      ctx.fillText('NECESSITY', tx + 35, ty - 30);
      ctx.fillText('(Phenomena)', tx + 35, ty - 18);
      ctx.globalAlpha = 1;
    }

    // "Both True" label
    ctx.fillStyle = '#C47B2B';
    ctx.globalAlpha = Math.min(1, progress * 2);
    ctx.font = 'bold 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('BOTH TRUE', cx / 2, midY);
    ctx.font = '11px Georgia, serif';
    ctx.fillStyle = '#ffeeaa';
    ctx.fillText('in different realms', cx / 2, midY + 18);
    ctx.globalAlpha = 1;

    // Door to moral philosophy
    if (progress > 0.7) {
      const doorAlpha = Math.min(1, (progress - 0.7) / 0.3);
      ctx.globalAlpha = doorAlpha;
      ctx.fillStyle = '#C47B2B';
      ctx.fillRect(20, midY - 45, 50, 60);
      ctx.fillStyle = '#ffeeaa';
      ctx.fillRect(25, midY - 40, 40, 50);
      ctx.fillStyle = '#8B1A1A';
      ctx.font = 'bold 8px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('MORAL', 45, midY - 10);
      ctx.fillText('PHILOSOPHY', 45, midY + 2);
      ctx.fillText('→', 45, midY + 14);
      ctx.globalAlpha = 1;
    }
  }

  function drawSmallTrain(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#ffeeaa';
    ctx.fillRect(x + 5, y + 6, 14, 14);
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(x + 12, y + h, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w - 12, y + h, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  useEffect(() => {
    drawCanvas(runState, 0);
  }, [runState, drawCanvas]);

  const runAnimation = () => {
    if (runState !== 'idle') return;
    setRunState('running');
    stateRef.current = { runState: 'running', progress: 0 };

    const start = performance.now();
    const duration = 2000;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      drawCanvas('running', progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRunState('collided');
        stateRef.current.runState = 'collided';
        drawCanvas('collided', 1);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const resolveAnimation = () => {
    if (runState !== 'collided') return;
    setRunState('resolved');
    stateRef.current = { runState: 'resolved', progress: 0 };

    const start = performance.now();
    const duration = 2500;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      drawCanvas('resolved', progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setRunState('idle');
    stateRef.current = { runState: 'idle', progress: 0 };
    drawCanvas('idle', 0);
  };

  const [hoveredAntinomy, setHoveredAntinomy] = useState(null);

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 40% 30%, #2a0808 0%, #0d0508 50%, #050308 100%)',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#e8d5c0',
      padding: '32px 24px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto 28px auto' }}>
        <div style={{ fontSize: 11, color: '#8B1A1A', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
          Part 8 of 21 · Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#f0e0c8', margin: '0 0 8px 0', lineHeight: 1.2 }}>
          The Antinomies and the Illusions of Pure Reason
        </h1>
        <p style={{ fontSize: 15, color: '#b0998a', margin: 0, lineHeight: 1.6 }}>
          When reason attempts to answer questions about the world as a whole, it inevitably produces contradictions — revealing both the power and the necessary limits of rational thought.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{ maxWidth: 900, margin: '0 auto 28px auto' }}>
        <div style={{
          background: '#0f0608ee',
          border: '1px solid #1a0808',
          borderLeft: '4px solid #8B1A1A',
          borderRadius: 6,
          padding: '20px 24px',
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8B1A1A', marginBottom: 10, fontWeight: 'bold' }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.75, fontSize: 14, color: '#c8b5a5' }}>
            Having established the limits of legitimate theoretical knowledge — phenomena only — a deeper question presses forward with urgency: what actually happens when reason ignores those limits and pursues the absolute totality it naturally and insatiably demands? The critical philosophy has drawn its boundaries, but boundaries demand testing. Reason does not rest content with conditioned experience; it drives toward the unconditioned, the total, the complete. This relentless drive is not an accident or a flaw — it is reason's very nature. And so we must witness what occurs when that nature overreaches, not to shame reason, but to demonstrate that the critical limits are necessary and not merely contingent restrictions.
          </p>
        </div>
      </div>

      {/* Main Visualization */}
      <div style={{ maxWidth: 900, margin: '0 auto 28px auto' }}>
        <div style={{
          background: '#0a0408f0',
          border: '1px solid #2a1010',
          borderRadius: 8,
          padding: '24px',
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8B1A1A', marginBottom: 6, fontWeight: 'bold' }}>
            The Four Antinomies
          </div>
          <p style={{ fontSize: 13, color: '#907060', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Select an antinomy, then run the collision to witness reason in self-contradiction.
          </p>

          {/* Antinomy selector */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {antinomies.map((a, i) => (
              <button
                key={i}
                onClick={() => { setActiveAntinomy(i); }}
                onMouseEnter={() => setHoveredAntinomy(i)}
                onMouseLeave={() => setHoveredAntinomy(null)}
                style={{
                  flex: '1 1 160px',
                  background: activeAntinomy === i ? (a.type === 'Mathematical' ? '#3a0a0a' : '#2a1a08') : '#150810',
                  border: `2px solid ${activeAntinomy === i ? a.color : '#2a1020'}`,
                  borderRadius: 6,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  boxShadow: activeAntinomy === i ? `0 0 12px ${a.color}44` : 'none',
                }}
              >
                <div style={{ fontSize: 10, color: a.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                  {a.type}
                </div>
                <div style={{ fontSize: 12, color: '#f0e0c8', fontWeight: 'bold' }}>
                  Antinomy {a.number}
                </div>
                <div style={{ fontSize: 11, color: '#907060', marginTop: 2 }}>
                  {a.topic}
                </div>
              </button>
            ))}
          </div>

          {/* Thesis / Antithesis display */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            <div style={{
              flex: 1,
              background: '#1a0505',
              border: '1px solid #3a1010',
              borderRadius: 6,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: '#cc4444', textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
                Thesis
              </div>
              <p style={{ fontSize: 13, color: '#e8d5c0', margin: '0 0 10px 0', lineHeight: 1.6 }}>
                {current.thesis}
              </p>
              <div style={{ borderTop: '1px solid #2a1010', paddingTop: 8 }}>
                {current.thesisArgs.map((arg, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#907060', marginTop: 4 }}>
                    • {arg}
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: '#8B1A1A',
              fontWeight: 'bold',
              padding: '0 4px',
            }}>
              VS
            </div>
            <div style={{
              flex: 1,
              background: '#050518',
              border: '1px solid #101030',
              borderRadius: 6,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: '#4466cc', textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
                Antithesis
              </div>
              <p style={{ fontSize: 13, color: '#e8d5c0', margin: '0 0 10px 0', lineHeight: 1.6 }}>
                {current.antithesis}
              </p>
              <div style={{ borderTop: '1px solid #101030', paddingTop: 8 }}>
                {current.antithesisArgs.map((arg, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#6080a0', marginTop: 4 }}>
                    • {arg}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <canvas
              ref={canvasRef}
              width={852}
              height={220}
              style={{ width: '100%', height: 220, borderRadius: 6, border: '1px solid #2a1010', display: 'block' }}
            />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['idle', 'collided'].includes(runState) && runState !== 'collided' && (
              <button
                onClick={runAnimation}
                onMouseEnter={() => setHoveredBtn('run')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: hoveredBtn === 'run' ? '#8B1A1A' : '#5a0f0f',
                  border: '1px solid #8B1A1A',
                  borderRadius: 6,
                  color: '#f0e0c8',
                  padding: '10px 28px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: 14,
                  letterSpacing: 1,
                  transition: 'background 0.2s',
                }}
              >
                Run Collision
              </button>
            )}
            {runState === 'collided' && (
              <button
                onClick={resolveAnimation}
                onMouseEnter={() => setHoveredBtn('resolve')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: hoveredBtn === 'resolve' ? '#C47B2B' : '#6a3a10',
                  border: `1px solid #C47B2B`,
                  borderRadius: 6,
                  color: '#f0e0c8',
                  padding: '10px 28px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: 14,
                  letterSpacing: 1,
                  transition: 'background 0.2s',
                }}
              >
                Resolve
              </button>
            )}
            {['running', 'resolved', 'collided'].includes(runState) && (
              <button
                onClick={resetAnimation}
                onMouseEnter={() => setHoveredBtn('reset')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: hoveredBtn === 'reset' ? '#2a2a2a' : '#181818',
                  border: '1px solid #444',
                  borderRadius: 6,
                  color: '#907060',
                  padding: '10px 28px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: 14,
                  letterSpacing: 1,
                  transition: 'background 0.2s',
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Resolution text */}
          {runState === 'resolved' && (
            <div style={{
              marginTop: 18,
              background: current.type === 'Mathematical' ? '#1a0505' : '#1a1005',
              border: `1px solid ${current.color}`,
              borderRadius: 6,
              padding: '16px 20px',
              borderLeft: `4px solid ${current.color}`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: current.color, textTransform: 'uppercase', marginBottom: 8, fontWeight: 'bold' }}>
                Resolution: {current.resolution}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#e8d5c0', lineHeight: 1.7 }}>
                {current.resolutionText}
              </p>
            </div>
          )}

          {/* Type legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, background: '#8B1A1A', borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: '#907060' }}>Mathematical Antinomies (1–2): Both sides false</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, background: '#C47B2B', borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: '#907060' }}>Dynamical Antinomies (3–4): Both sides true in different realms</span>
            </div>
          </div>

          {/* Transcendental illusion note */}
          <div style={{
            marginTop: 18,
            background: '#0f0a10',
            border: '1px solid #1a1020',
            borderRadius: 6,
            padding: '14px 18px',
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: '#7a5090', textTransform: 'uppercase', marginBottom: 6, fontWeight: 'bold' }}>
              Transcendental Illusion
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#a090b0', lineHeight: 1.7 }}>
              The illusion that generates all four antinomies is permanent and ineradicable: reason will always drive toward the unconditioned totality, because its very nature is to seek complete systematic unity. The antinomies do not expose a bug in reason — they expose a structural feature. Reason used regulatively (as a guiding ideal) is legitimate and necessary; reason used constitutively (as if producing actual knowledge of the world-whole) generates inevitable contradiction.
            </p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 900, margin: '0 auto 28px auto' }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(139,26,26,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8B1A1A', marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {keyConcepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: '6px 14px',
                background: hoveredConcept === c.id ? '#8B1A1A' : 'rgba(139,26,26,0.1)',
                border: `1px solid ${hoveredConcept === c.id ? '#bf4040' : 'rgba(139,26,26,0.35)'}`,
                borderRadius: 20,
                fontSize: 12,
                cursor: 'pointer',
                color: hoveredConcept === c.id ? '#f0ead8' : '#c8806a',
                transition: 'all 0.2s',
                fontFamily: 'Georgia, serif',
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{
            background: 'rgba(139,26,26,0.08)',
            border: '1px solid rgba(139,26,26,0.3)',
            borderRadius: 6,
            padding: '16px 20px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#8B1A1A', marginBottom: 8 }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: '#c8c0b4' }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Difficulty Panel */}
      <div style={{ maxWidth: 900, margin: '0 auto 28px auto' }}>
        <div style={{
          background: '#0a0c10ee',
          border: '1px solid #101820',
          borderLeft: '4px solid #4455aa',
          borderRadius: 6,
          padding: '20px 24px',
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#4455aa', marginBottom: 10, fontWeight: 'bold' }}>
            The Difficulty
          </div>
          <p style={{ margin: '0 0 12px 0', lineHeight: 1.75, fontSize: 14, color: '#c8b5a5' }}>
            The resolution of the third antinomy carves out a genuine logical space for freedom in the noumenal realm. Natural necessity governs all phenomena completely and without exception — neuroscience, physics, psychology, all of it. And yet freedom may be real in the noumenal realm without contradicting natural law, because the two realms are distinct. This is a genuine philosophical achievement: the contradiction is dissolved, not merely suppressed.
          </p>
          <p style={{ margin: 0, lineHeight: 1.75, fontSize: 14, color: '#c8b5a5' }}>
            But mere logical possibility is radically insufficient for moral philosophy. That freedom might exist in a realm beyond experience does nothing to ground moral obligation, responsibility, or the practical necessity of acting as if we are free. We need freedom not as a theoretical loophole but as a practically real and binding fact of rational agency. The antinomies have preserved the possibility of freedom by keeping the noumenal realm open — but now that possibility must become actuality through an entirely different mode of reason. This pressure forces the next development: a turn from the theoretical to the practical, from what can be known to what must be done.
          </p>
        </div>
      </div>

      {/* Real-World Echoes Panel */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          background: '#08080cee',
          border: '1px solid #181818',
          borderRadius: 6,
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={() => setHoveredBtn('echoes')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              width: '100%',
              background: hoveredBtn === 'echoes' ? '#0f0f14' : 'transparent',
              border: 'none',
              borderBottom: echosOpen ? '1px solid #181818' : 'none',
              padding: '16px 24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8B1A1A', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color="#8B1A1A" />
              : <ChevronDown size={16} color="#8B1A1A" />
            }
          </button>
          {echosOpen && (
            <div style={{ padding: '20px 24px' }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#8B1A1A', fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 }}>
                  The Origin of the Universe
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#c8b5a5', lineHeight: 1.75 }}>
                  Contemporary cosmology debates whether the universe had a temporal beginning — the Big Bang — or whether time itself extends infinitely in some form, perhaps through eternal inflation or cyclical models. This is almost precisely the First Antinomy in scientific dress. Kant's analysis suggests that asking about the temporal boundary of the universe-as-a-whole may exceed what any possible observation could settle, not because science is weak, but because the question reaches beyond what can be given in experience.
                </p>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#C47B2B', fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 }}>
                  Neuroscience and Moral Responsibility
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#c8b5a5', lineHeight: 1.75 }}>
                  The most urgent contemporary instance of the Third Antinomy appears in debates between neuroscience and moral philosophy. Neuroscience increasingly maps every decision, impulse, and value judgment to deterministic or probabilistic neural processes — threatening to eliminate the very concept of moral responsibility. Yet courts, ethics, and ordinary life cannot function without presupposing that agents are genuinely responsible for their actions. Kant's resolution: natural necessity governs the brain entirely as phenomenon; freedom may be real at a different level of description — not a gap in the causal chain, but a different kind of fact about rational agency.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Part 9: The Transition to Practical Philosophy ───
function TransitionToPracticalPhilosophy() {
  const [echosOpen, setEchosOpen] = useState(false);
  const [phase, setPhase] = useState(0); // 0=initial, 1=failedBridges, 2=newBridge
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredBridge, setHoveredBridge] = useState(false);
  const [failStep, setFailStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const concepts = [
    { id: 'practical', label: 'Practical Reason', desc: 'Reason operating in the domain of action — not describing what is, but determining what ought to be. It legislates to the will directly, without needing empirical input.' },
    { id: 'autonomy', label: 'Autonomy', desc: 'Self-legislation: the will gives itself its own law. Unlike heteronomy (where law comes from outside — desire, custom, authority), autonomy means rational beings are the source of their own moral obligations.' },
    { id: 'freedom', label: 'Freedom as Mediator', desc: 'Freedom is the keystone of the arch connecting the two philosophies. Theoretical reason showed freedom is possible (the Third Antinomy). Practical reason shows it is actual — the very condition of moral agency.' },
    { id: 'spontaneity', label: 'Active Spontaneity', desc: 'Just as understanding actively synthesizes intuitions (theoretical), practical reason actively determines the will. Reason is productive in both domains — not a passive mirror but a legislative power.' },
    { id: 'dignity', label: 'Human Dignity', desc: 'Persons have dignity — incomparable, incommensurable worth — because they are rational, self-legislating beings. This is what separates them from things with mere market price.' },
    { id: 'enlightenment', label: 'Enlightenment', desc: 'Kant\'s answer in "What is Enlightenment?" (1784): maturity is the courage to use one\'s own understanding without another\'s guidance. Sapere aude — dare to know.' },
  ];

  const failedBridges = [
    { label: 'Derive "ought" from "is"', reason: 'Hume\'s guillotine: no fact of nature entails a moral obligation.' },
    { label: 'Ground morality in desire', reason: 'Desires are contingent, particular, empirical — they cannot yield universal necessity.' },
    { label: 'Appeal to divine command', reason: 'Theoretical reason cannot prove divine existence — and even if it could, authority ≠ obligation.' },
  ];

  const startAnimation = () => {
    if (animating) return;
    setAnimating(true);
    setPhase(1);
    setFailStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setFailStep(step);
      if (step >= failedBridges.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase(2);
          setAnimating(false);
        }, 800);
      }
    }, 1100);
  };

  const reset = () => {
    setPhase(0);
    setFailStep(0);
    setAnimating(false);
    setHoveredBridge(false);
  };

  // Particle effect on canvas for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
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
        ctx.fillStyle = `#B5651D`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const W = 700;
  const H = 300;

  // SVG layout constants
  const leftCityX = 80;
  const rightCityX = 560;
  const chasmLeft = 200;
  const chasmRight = 500;
  const groundY = 220;
  const waterY = 230;

  const BridgeArc = ({ color, opacity, broken, label, yOffset = 0 }) => {
    const mx = (chasmLeft + chasmRight) / 2;
    const my = groundY - 55 + yOffset;
    return (
      <g opacity={opacity}>
        <path
          d={broken
            ? `M ${chasmLeft} ${groundY} Q ${mx - 40} ${my} ${mx} ${my + 20} M ${mx} ${my + 20} Q ${mx + 40} ${my} ${chasmRight} ${groundY}`
            : `M ${chasmLeft} ${groundY} Q ${mx} ${my} ${chasmRight} ${groundY}`}
          stroke={color}
          strokeWidth={broken ? 3 : 4}
          fill="none"
          strokeDasharray={broken ? "6 4" : "none"}
        />
        {label && (
          <text x={mx} y={my - 8} textAnchor="middle" fontSize="10" fill={color} fontFamily="Georgia, serif">{label}</text>
        )}
        {broken && (
          <text x={mx} y={my + 36} textAnchor="middle" fontSize="9" fill="#e06030" fontFamily="Georgia, serif">✕ collapsed</text>
        )}
      </g>
    );
  };

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 40% 30%, #3d1a08 0%, #1a0d04 40%, #0a0a0f 100%)',
      minHeight: '100vh',
      fontFamily: 'Georgia, serif',
      color: '#e8d5c0',
      padding: '0',
    }}>
      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto', padding: '40px 24px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#B5651D', textTransform: 'uppercase', marginBottom: '8px' }}>Part 9 of 21 · Kant's Critical Philosophy</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'normal', color: '#f0ddc8', margin: '0 0 6px', lineHeight: '1.3' }}>The Transition to Practical Philosophy</h1>
          <p style={{ fontSize: '14px', color: '#c4a882', margin: 0, fontStyle: 'italic', lineHeight: '1.6' }}>
            The completion of theoretical philosophy left a profound gap between the natural world and the moral world that only a new investigation of practical reason could fill.
          </p>
        </div>

        {/* ── 1. THE PROBLEM PANEL ── */}
        <div style={{
          background: '#110a06cc',
          border: '1px solid #3a1f0d',
          borderLeft: '4px solid #B5651D',
          borderRadius: '6px',
          padding: '24px 28px',
          marginBottom: '28px',
          marginTop: '28px',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#B5651D', textTransform: 'uppercase', marginBottom: '12px' }}>The Problem</div>
          <p style={{ margin: 0, lineHeight: '1.8', fontSize: '15px', color: '#dfc9ad' }}>
            The critique of pure reason showed that freedom cannot be theoretically proven — it is merely <em>possible</em> as a noumenal concept. But morality requires that freedom be actually <em>real</em>, not just logically possible. Theoretical philosophy mapped the laws of nature, the limits of knowledge, the structure of experience — and in doing so, exhausted itself. It could not tell us what we ought to do, nor what we may hope for. A different kind of investigation is needed: one that turns inward, toward the legislative power of reason itself.
          </p>
        </div>

        {/* ── 2. MAIN VISUALIZATION ── */}
        <div style={{
          background: '#0e0906cc',
          border: '1px solid #3a2010',
          borderRadius: '8px',
          padding: '28px',
          marginBottom: '28px',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#B5651D', textTransform: 'uppercase', marginBottom: '6px' }}>Main Visualization</div>
          <div style={{ fontSize: '13px', color: '#c4a882', marginBottom: '20px', lineHeight: '1.6' }}>
            Watch how every attempt to bridge the gap between <em>nature</em> and <em>morality</em> using theoretical tools collapses — until practical reason constructs its own crossing from within.
          </div>

          {/* Bridge SVG */}
          <div style={{ overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W, display: 'block', margin: '0 auto' }}>
              {/* Sky gradient */}
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a0d04" />
                  <stop offset="100%" stopColor="#2a1408" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1520" />
                  <stop offset="100%" stopColor="#05090f" />
                </linearGradient>
                <linearGradient id="bridgeGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c47020" />
                  <stop offset="50%" stopColor="#f0a040" />
                  <stop offset="100%" stopColor="#c47020" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width={W} height={H} fill="url(#skyGrad)" />

              {/* Water / chasm */}
              <rect x={chasmLeft} y={waterY} width={chasmRight - chasmLeft} height={H - waterY} fill="url(#waterGrad)" />
              <text x={(chasmLeft + chasmRight) / 2} y={H - 10} textAnchor="middle" fontSize="10" fill="#2a4060" fontFamily="Georgia, serif">— the unbridgeable chasm between nature and morality —</text>

              {/* Ground left */}
              <rect x="0" y={groundY} width={chasmLeft + 2} height={H - groundY} fill="#2a1a0a" />
              {/* Ground right */}
              <rect x={chasmRight - 2} y={groundY} width={W - chasmRight + 2} height={H - groundY} fill="#2a1a0a" />

              {/* LEFT CITY — Theoretical Philosophy */}
              {/* Base building cluster */}
              <rect x="15" y={groundY - 80} width="30" height="80" fill="#3a2210" />
              <rect x="50" y={groundY - 60} width="25" height="60" fill="#2e1c0c" />
              <rect x="80" y={groundY - 95} width="35" height="95" fill="#3a2210" />
              <rect x="120" y={groundY - 55} width="20" height="55" fill="#2e1c0c" />
              <rect x="145" y={groundY - 70} width="40" height="70" fill="#3a2210" />

              {/* Clock tower */}
              <rect x="88" y={groundY - 115} width="19" height="25" fill="#4a2d14" />
              <circle cx="97" cy={groundY - 105} r="7" fill="#1a0f06" stroke="#B5651D" strokeWidth="1" />
              <line x1="97" y1={groundY - 108} x2="97" y2={groundY - 102} stroke="#B5651D" strokeWidth="1" />
              <line x1="97" y1={groundY - 105} x2="101" y2={groundY - 105} stroke="#B5651D" strokeWidth="1" />

              {/* Telescope */}
              <line x1="30" y1={groundY - 85} x2="50" y2={groundY - 100} stroke="#B5651D" strokeWidth="2" />
              <ellipse cx="50" cy={groundY - 100} rx="5" ry="3" fill="none" stroke="#c4a882" strokeWidth="1" />

              {/* Stars / scientific dots left */}
              {[20, 45, 120, 155, 170].map((x, i) => (
                <circle key={i} cx={x} cy={groundY - 130 + i * 8} r="1.2" fill="#c4a882" opacity="0.5" />
              ))}

              <text x={leftCityX} y={groundY - 128} textAnchor="middle" fontSize="10" fill="#c4a882" fontFamily="Georgia, serif" fontStyle="italic">Theoretical Philosophy</text>
              <text x={leftCityX} y={groundY - 116} textAnchor="middle" fontSize="9" fill="#8a7060" fontFamily="Georgia, serif">Nature · Knowledge · Phenomena</text>

              {/* RIGHT CITY — Practical Philosophy */}
              <rect x={W - 60} y={groundY - 75} width="30" height="75" fill="#3a2210" />
              <rect x={W - 100} y={groundY - 90} width="35" height="90" fill="#2e1c0c" />
              <rect x={W - 140} y={groundY - 65} width="25" height="65" fill="#3a2210" />
              <rect x={W - 180} y={groundY - 80} width="40" height="80" fill="#2e1c0c" />
              <rect x={W - 215} y={groundY - 55} width="20" height="55" fill="#3a2210" />

              {/* Scales of justice */}
              <line x1={W - 120} y1={groundY - 95} x2={W - 120} y2={groundY - 75} stroke="#c4a882" strokeWidth="1.5" />
              <line x1={W - 130} y1={groundY - 88} x2={W - 110} y2={groundY - 88} stroke="#c4a882" strokeWidth="1.5" />
              <line x1={W - 130} y1={groundY - 88} x2={W - 130} y2={groundY - 83} stroke="#c4a882" strokeWidth="1" />
              <line x1={W - 110} y1={groundY - 88} x2={W - 110} y2={groundY - 83} stroke="#c4a882" strokeWidth="1" />
              <ellipse cx={W - 130} cy={groundY - 82} rx="5" ry="2" fill="none" stroke="#c4a882" strokeWidth="1" />
              <ellipse cx={W - 110} cy={groundY - 82} rx="5" ry="2" fill="none" stroke="#c4a882" strokeWidth="1" />

              {/* Human figures */}
              {[W - 65, W - 80, W - 55].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy={groundY - 22} r="5" fill="#5a3a1a" />
                  <rect x={x - 4} y={groundY - 17} width="8" height="12" fill="#4a2e12" />
                  <line x1={x - 7} y1={groundY - 13} x2={x + 7} y2={groundY - 13} stroke="#4a2e12" strokeWidth="2" />
                </g>
              ))}

              {/* Open book */}
              <path d={`M ${W - 175} ${groundY - 68} L ${W - 185} ${groundY - 62} L ${W - 155} ${groundY - 62} L ${W - 165} ${groundY - 68} Z`} fill="#6a4520" stroke="#B5651D" strokeWidth="0.8" />
              <line x1={W - 170} y1={groundY - 68} x2={W - 170} y2={groundY - 62} stroke="#B5651D" strokeWidth="0.8" />

              <text x={rightCityX} y={groundY - 128} textAnchor="middle" fontSize="10" fill="#c4a882" fontFamily="Georgia, serif" fontStyle="italic">Practical Philosophy</text>
              <text x={rightCityX} y={groundY - 116} textAnchor="middle" fontSize="9" fill="#8a7060" fontFamily="Georgia, serif">Freedom · Morality · Dignity</text>

              {/* FAILED BRIDGES */}
              {phase >= 1 && failStep >= 1 && (
                <BridgeArc color="#cc4444" opacity="0.7" broken label={failedBridges[0].label} yOffset={0} />
              )}
              {phase >= 1 && failStep >= 2 && (
                <BridgeArc color="#cc6644" opacity="0.7" broken label={failedBridges[1].label} yOffset={15} />
              )}
              {phase >= 1 && failStep >= 3 && (
                <BridgeArc color="#cc8844" opacity="0.7" broken label={failedBridges[2].label} yOffset={30} />
              )}

              {/* THE REAL BRIDGE */}
              {phase === 2 && (
                <g
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredBridge(true)}
                  onMouseLeave={() => setHoveredBridge(false)}
                >
                  {hoveredBridge && (
                    <path
                      d={`M ${chasmLeft} ${groundY} Q ${(chasmLeft + chasmRight) / 2} ${groundY - 90} ${chasmRight} ${groundY}`}
                      stroke="#f0b060"
                      strokeWidth="10"
                      fill="none"
                      opacity="0.18"
                      filter="url(#glow)"
                    />
                  )}
                  <path
                    d={`M ${chasmLeft} ${groundY} Q ${(chasmLeft + chasmRight) / 2} ${groundY - 90} ${chasmRight} ${groundY}`}
                    stroke="url(#bridgeGlow)"
                    strokeWidth={hoveredBridge ? 5 : 4}
                    fill="none"
                    filter={hoveredBridge ? "url(#glow)" : undefined}
                  />
                  {/* Bridge pillars */}
                  {[0.25, 0.5, 0.75].map((t, i) => {
                    const bx = chasmLeft + (chasmRight - chasmLeft) * t;
                    const by = groundY - 90 * Math.sin(Math.PI * t);
                    return (
                      <g key={i}>
                        <line x1={bx} y1={by} x2={bx} y2={groundY} stroke="#c47020" strokeWidth="1.5" opacity="0.6" />
                      </g>
                    );
                  })}
                  {/* Bridge label */}
                  <text
                    x={(chasmLeft + chasmRight) / 2}
                    y={groundY - 100}
                    textAnchor="middle"
                    fontSize={hoveredBridge ? "12" : "11"}
                    fill={hoveredBridge ? "#f0c070" : "#d4904a"}
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                  >
                    Practical Reason / Freedom
                  </text>
                </g>
              )}

            </svg>
          </div>

          {/* Hover info — parallel structure panel (rendered outside SVG to avoid overlap) */}
          {hoveredBridge && (
            <div style={{
              margin: '10px auto',
              maxWidth: 520,
              background: '#1a0e06ee',
              border: '1px solid #B5651D',
              borderRadius: 4,
              padding: '12px 18px',
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: '#B5651D', textTransform: 'uppercase', marginBottom: 8 }}>Parallel Structure</div>
              <div style={{ fontSize: 13, color: '#d4b890', marginBottom: 4 }}>Theoretical: Understanding → synthesizes intuitions → constitutes objects</div>
              <div style={{ fontSize: 13, color: '#d4b890' }}>Practical: Reason → determines the will → constitutes moral action</div>
            </div>
          )}

          {/* Controls */}
          <div style={{ textAlign: 'center', marginTop: '18px', marginBottom: '8px' }}>
            {phase === 0 && (
              <button
                onClick={startAnimation}
                style={{
                  background: '#2a1408',
                  border: '1px solid #B5651D',
                  color: '#e8c898',
                  fontFamily: 'Georgia, serif',
                  fontSize: '13px',
                  padding: '10px 28px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={e => e.target.style.background = '#3a1e0a'}
                onMouseLeave={e => e.target.style.background = '#2a1408'}
              >
                Watch the Bridges Collapse →
              </button>
            )}
            {phase === 1 && animating && (
              <div style={{ color: '#cc6644', fontSize: '13px', fontStyle: 'italic' }}>Attempting to bridge the gap...</div>
            )}
            {phase === 2 && (
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ color: '#c4a050', fontSize: '13px', fontStyle: 'italic' }}>The bridge of practical reason stands. Hover over it.</div>
                <button
                  onClick={reset}
                  style={{
                    background: 'transparent',
                    border: '1px solid #5a3018',
                    color: '#8a6030',
                    fontFamily: 'Georgia, serif',
                    fontSize: '11px',
                    padding: '6px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.target.style.borderColor = '#B5651D'}
                  onMouseLeave={e => e.target.style.borderColor = '#5a3018'}
                >
                  ↺ Reset
                </button>
              </div>
            )}
          </div>

          {/* Failed bridge explanations */}
          {phase >= 1 && failStep > 0 && (
            <div style={{ marginTop: '16px' }}>
              {failedBridges.slice(0, failStep).map((fb, i) => (
                <div key={i} style={{
                  background: '#1a0808aa',
                  border: '1px solid #5a2020',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  marginBottom: '8px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: '#cc4444', fontSize: '16px', marginTop: '1px' }}>✕</span>
                  <div>
                    <div style={{ color: '#e08060', fontSize: '12px', fontWeight: 'bold', marginBottom: '3px' }}>{fb.label}</div>
                    <div style={{ color: '#9a7060', fontSize: '12px', lineHeight: '1.5' }}>{fb.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core argument prose */}
          <div style={{ marginTop: '24px', borderTop: '1px solid #2a1808', paddingTop: '20px' }}>
            <p style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: '1.8', color: '#c4a882' }}>
              The parallel between theoretical and practical reason runs deep. Just as the understanding actively synthesizes raw intuitions to constitute knowable objects, practical reason actively determines the will through self-given principles. In both cases reason is not passive but productive — not merely discovering pre-existing truths but creating the very objects it engages with.
            </p>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#c4a882' }}>
              Freedom is the keystone of the entire arch. The Third Antinomy showed that freedom is not contradictory — it is noumenally possible. But possibility is not reality. Practical reason crosses the chasm that theoretical reason could only survey: it shows that freedom is actual, because it is the very precondition of moral agency itself.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(181,101,29,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#B5651D", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#B5651D" : "rgba(181,101,29,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#d4801a" : "rgba(181,101,29,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#c4a882",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(181,101,29,0.08)", border: "1px solid rgba(181,101,29,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#B5651D", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* ── 3. THE DIFFICULTY PANEL ── */}
        <div style={{
          background: '#0e0c0aaa',
          border: '1px solid #3a2808',
          borderLeft: '4px solid #d4801a',
          borderRadius: '6px',
          padding: '24px 28px',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#d4801a', textTransform: 'uppercase', marginBottom: '12px' }}>The Difficulty</div>
          <p style={{ margin: '0 0 12px', lineHeight: '1.8', fontSize: '15px', color: '#dfc9ad' }}>
            If practical reason can ground morality without empirical foundations — without appeal to desires, customs, traditions, or circumstances — then we need to identify the precise principle that practical reason provides. It must be universal: valid for all rational beings regardless of culture, desire, or consequence. It must be necessary: not something we might choose to follow but something reason itself commands. It must be derived from the bare form of rational self-legislation alone.
          </p>
          <p style={{ margin: 0, lineHeight: '1.8', fontSize: '14px', color: '#b49070', fontStyle: 'italic' }}>
            What is this principle, and how is it derived from pure practical reason alone? This pressure forces the next development: the formulation of the categorical imperative as the supreme law of moral reason.
          </p>
        </div>

        {/* ── 4. REAL-WORLD ECHOES (collapsible) ── */}
        <div style={{
          background: '#0e0c0aaa',
          border: '1px solid #3a2808',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: '18px 24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              userSelect: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a1008aa'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#B5651D', textTransform: 'uppercase' }}>Real-World Echoes</span>
            {echosOpen ? <ChevronUp size={16} color="#B5651D" /> : <ChevronDown size={16} color="#B5651D" />}
          </div>
          {echosOpen && (
            <div style={{ padding: '0 24px 24px' }}>
              <div style={{ borderTop: '1px solid #2a1808', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#160d0588', borderRadius: '4px', padding: '16px 18px', border: '1px solid #2e1a08' }}>
                  <div style={{ color: '#e8b870', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>What is Enlightenment? (1784)</div>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#a89070' }}>
                    Kant's essay defines rational maturity as the courage to use one's own understanding without another's guidance — Sapere aude. Written during the same period as the first Critique, it shows practical philosophy was never merely academic: it was a manifesto for intellectual autonomy against dogma, paternalism, and superstition.
                  </p>
                </div>
                <div style={{ background: '#160d0588', borderRadius: '4px', padding: '16px 18px', border: '1px solid #2e1a08' }}>
                  <div style={{ color: '#e8b870', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>American and French Revolutions (1776, 1789)</div>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#a89070' }}>
                    Kant lived through both revolutions and wrote of them with cautious admiration. They were, for him, practical experiments in the very idea he was developing philosophically: that legitimate political order must be grounded not in tradition or force but in rational self-legislation. The gap between natural history and moral progress was not merely theoretical — it was being enacted in the streets of Paris and Philadelphia.
                  </p>
                </div>
                <div style={{ background: '#160d0588', borderRadius: '4px', padding: '16px 18px', border: '1px solid #2e1a08' }}>
                  <div style={{ color: '#e8b870', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.5px' }}>Cosmopolitan Federation of Republican States</div>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#a89070' }}>
                    In "Perpetual Peace" (1795), Kant envisioned a world federation of republican states — not as a utopian fantasy but as what practical reason demands. Free, rational beings cannot stop legislating at national borders: the cosmopolitan scope of morality anticipates international law, the United Nations, and the very idea of universal human rights grounded not in culture but in the dignity of rational agency itself.
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

// ─── Part 10: The Categorical Imperative and the Foundation of Morality ───
function CategoricalImperativeFoundationMorality() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const [universalizeState, setUniversalizeState] = useState("idle");
  const [humanityState, setHumanityState] = useState("idle");
  const [kingdomState, setKingdomState] = useState("idle");
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const animStateRef = useRef({ particles: [], tick: 0, mode: "idle" });

  const examples = [
    {
      label: "False Promising",
      maxim: "I will make false promises when in financial difficulty.",
      universalResult: "collapse",
      universalExplanation: "If everyone made false promises, the institution of promising would collapse — no one would believe any promise. The maxim destroys its own precondition.",
      humanityResult: "fail",
      humanityExplanation: "The deceived lender is treated merely as a means — their rational agency is bypassed without consent. They are used as a tool, not respected as an end.",
      kingdomResult: "fail",
      kingdomExplanation: "No rational being, as a universal legislator, would enact a law permitting false promises, since they could also be the victim of such deception.",
    },
    {
      label: "Refusing to Help",
      maxim: "I will never help others in distress, focusing only on myself.",
      universalResult: "collapse",
      universalExplanation: "A world where no one helps anyone in distress is one you could not rationally will — you yourself may need help, and universal indifference destroys mutual aid.",
      humanityResult: "fail",
      humanityExplanation: "While not actively harming others, this treats people in distress as beneath moral consideration, failing to honor the value of their rational personhood.",
      kingdomResult: "fail",
      kingdomExplanation: "Rational beings as universal legislators would not enact universal indifference — they recognize their own potential vulnerability and the value of solidarity.",
    },
    {
      label: "Keeping Promises",
      maxim: "I will keep my promises even when it is inconvenient.",
      universalResult: "stable",
      universalExplanation: "A world of universal promise-keeping is perfectly coherent — trust is reinforced, cooperation flourishes, and no self-contradiction arises.",
      humanityResult: "pass",
      humanityExplanation: "Keeping promises respects the rational agency of the other person — it honors the commitment made to them as an autonomous being capable of planning their own life.",
      kingdomResult: "pass",
      kingdomExplanation: "Every rational being, as both legislator and subject, would willingly enact a universal law of promise-keeping — it benefits all and respects all.",
    },
    {
      label: "Whistleblowing",
      maxim: "I will expose institutional wrongdoing despite personal risk.",
      universalResult: "stable",
      universalExplanation: "Universal transparency about wrongdoing is coherent — accountability institutions function better, and no contradiction arises from universal adoption.",
      humanityResult: "pass",
      humanityExplanation: "Whistleblowing treats those harmed by wrongdoing as ends in themselves — it refuses to let their suffering be silently perpetuated for institutional convenience.",
      kingdomResult: "pass",
      kingdomExplanation: "Rational beings legislating for all would affirm accountability — a kingdom of ends requires that wrongdoing not be shielded from moral scrutiny.",
    },
  ];

  const concepts = [
    { id: "categorical", label: "Categorical Imperative", desc: "Commands unconditionally — 'Do X' — not contingent on any desire or goal. Derived from rationality itself." },
    { id: "hypothetical", label: "Hypothetical Imperative", desc: "Commands conditionally — 'Do X if you want Y' — binding only if you have the relevant desire. Not truly moral." },
    { id: "universallaw", label: "Formula of Universal Law", desc: "Act only on maxims you could will to become universal laws. Tests for logical consistency when generalized." },
    { id: "humanity", label: "Formula of Humanity", desc: "Treat rational beings always as ends in themselves, never merely as means. Grounds the dignity of persons." },
    { id: "kingdom", label: "Kingdom of Ends", desc: "Act as a legislating member of a republic of all rational beings, making laws for all as if all were legislators." },
    { id: "worth", label: "Intrinsic Moral Worth", desc: "Some things have price (can be substituted); rational persons have dignity (incomparable, irreplaceable worth)." },
  ];

  const ex = examples[selectedExample];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const state = animStateRef.current;

    function initParticles(mode) {
      state.particles = [];
      state.tick = 0;
      state.mode = mode;
      const count = mode === "collapse" ? 30 : mode === "stable" ? 30 : 20;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = 60 + Math.random() * 30;
        state.particles.push({
          x: W / 2 + Math.cos(angle) * r,
          y: H / 2 + Math.sin(angle) * r,
          vx: (Math.random() - 0.5) * (mode === "collapse" ? 3 : 1),
          vy: (Math.random() - 0.5) * (mode === "collapse" ? 3 : 1),
          angle,
          r,
          life: 1,
          color: mode === "stable" ? "#4CAF80" : mode === "collapse" ? "#E05A5A" : "#1D5C8A",
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      state.tick++;
      const { mode, particles, tick } = state;

      if (mode === "idle") {
        ctx.fillStyle = "#1a2535";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#2a3a50";
        ctx.font = "13px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("Select an example and", W / 2, H / 2 - 10);
        ctx.fillText("run the universalizability test", W / 2, H / 2 + 10);
      } else if (mode === "stable") {
        ctx.fillStyle = "#0d1f12";
        ctx.fillRect(0, 0, W, H);
        particles.forEach((p, i) => {
          const orbitR = p.r + Math.sin(tick * 0.02 + p.angle) * 5;
          const newAngle = p.angle + 0.012;
          p.angle = newAngle;
          p.x = W / 2 + Math.cos(newAngle) * orbitR;
          p.y = H / 2 + Math.sin(newAngle) * orbitR;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = "#2a8a50";
          ctx.globalAlpha = 0.2;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        const pulse = 0.5 + 0.5 * Math.sin(tick * 0.04);
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 20 + pulse * 5, 0, Math.PI * 2);
        ctx.fillStyle = "#3aaf70";
        ctx.globalAlpha = 0.3 + pulse * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#4CAF80";
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✓", W / 2, H / 2);
        ctx.textBaseline = "alphabetic";
      } else if (mode === "collapse") {
        ctx.fillStyle = "#1f0d0d";
        ctx.fillRect(0, 0, W, H);
        const progress = Math.min(tick / 120, 1);
        particles.forEach((p) => {
          p.x += p.vx * (1 + progress * 3);
          p.y += p.vy * (1 + progress * 3);
          p.life = Math.max(0, 1 - progress * 1.2);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life * 0.9;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        if (progress > 0.4) {
          const shake = (1 - progress) * 4;
          const sx = (Math.random() - 0.5) * shake;
          const sy = (Math.random() - 0.5) * shake;
          ctx.font = `bold ${14 + progress * 10}px Georgia, serif`;
          ctx.fillStyle = "#E05A5A";
          ctx.globalAlpha = progress;
          ctx.textAlign = "center";
          ctx.fillText("CONTRADICTION", W / 2 + sx, H / 2 + sy);
          ctx.globalAlpha = 1;
        }
      }

      animFrameRef.current = requestAnimationFrame(drawFrame);
    }

    if (universalizeState !== "idle") {
      initParticles(ex.universalResult === "stable" ? "stable" : "collapse");
    } else {
      state.mode = "idle";
    }

    animFrameRef.current = requestAnimationFrame(drawFrame);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [universalizeState, selectedExample]);

  const runTest = () => {
    setUniversalizeState("running");
    setHumanityState("running");
    setKingdomState("running");
    setTimeout(() => {
      setUniversalizeState(ex.universalResult);
      setHumanityState(ex.humanityResult);
      setKingdomState(ex.kingdomResult);
    }, 1200);
  };

  const resetTests = () => {
    setUniversalizeState("idle");
    setHumanityState("idle");
    setKingdomState("idle");
  };

  const getResultColor = (result) => {
    if (result === "stable" || result === "pass") return "#4CAF80";
    if (result === "collapse" || result === "fail") return "#E05A5A";
    if (result === "running") return "#F0B429";
    return "#2a3a50";
  };

  const getResultLabel = (result, type) => {
    if (result === "idle") return "—";
    if (result === "running") return "Testing...";
    if (type === "universal") return result === "stable" ? "Consistent" : "Contradiction";
    return result === "pass" ? "Passes" : "Fails";
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #0d2236 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e0d0",
      padding: "32px 20px",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#1D5C8A", textTransform: "uppercase", marginBottom: 8 }}>
            Part 10 of 21 — Kant's Critical Philosophy
          </div>
          <h1 style={{ fontSize: 26, fontWeight: "bold", color: "#d4c9b5", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            The Categorical Imperative and the Foundation of Morality
          </h1>
          <p style={{ fontSize: 14, color: "#8a9ab0", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Kant derived the supreme principle of morality from pure practical reason alone, yielding three equivalent formulations that together define what it means to act morally.
          </p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0e1a26",
          border: "1px solid #1a2a3a",
          borderLeft: "4px solid #1D5C8A",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#1D5C8A", textTransform: "uppercase", marginBottom: 12 }}>
            The Problem
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#c8bfaf", margin: 0 }}>
            Practical reason must provide a moral principle that is universal and necessary for all rational beings regardless of desires or circumstances. Every previous attempt had stumbled: grounding morality in happiness collapses when the virtuous suffer; grounding it in social convention makes it contingent and parochial; grounding it in human nature makes it descriptive, not prescriptive. <strong style={{ color: "#e0d4c0" }}>How can we derive a principle that binds all rational beings unconditionally, without appealing to any empirical fact about what beings happen to want?</strong> This is not merely an academic puzzle — it is the question of whether morality is real or merely a useful fiction.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0b1520",
          border: "1px solid #1a2a3a",
          borderRadius: 10,
          padding: "28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#1D5C8A", textTransform: "uppercase", marginBottom: 16 }}>
            The Moral Laboratory
          </div>

          {/* Example Selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#6a8aaa", marginBottom: 10 }}>Select a proposed action to test:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {examples.map((e, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedExample(i); resetTests(); }}
                  style={{
                    background: selectedExample === i ? "#1D5C8A" : "#131c28",
                    border: `1px solid ${selectedExample === i ? "#3a7ab0" : "#1e2e40"}`,
                    borderRadius: 6,
                    padding: "8px 16px",
                    fontSize: 13,
                    color: selectedExample === i ? "#ffffff" : "#8aaac8",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          {/* Maxim Display */}
          <div style={{
            background: "#0d1e30",
            border: "1px solid #1e3050",
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#5a8ab0", textTransform: "uppercase", marginBottom: 6 }}>
              Proposed Maxim
            </div>
            <div style={{ fontSize: 15, color: "#d8cfc0", fontStyle: "italic", lineHeight: 1.5 }}>
              "{ex.maxim}"
            </div>
          </div>

          {/* Run Button */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button
              onClick={runTest}
              disabled={universalizeState === "running"}
              style={{
                background: universalizeState === "running" ? "#2a3a50" : "#1D5C8A",
                border: "none",
                borderRadius: 6,
                padding: "10px 24px",
                fontSize: 13,
                color: "#ffffff",
                cursor: universalizeState === "running" ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5,
              }}
            >
              {universalizeState === "running" ? "Applying Tests..." : "Apply the Categorical Imperative"}
            </button>
            <button
              onClick={resetTests}
              style={{
                background: "transparent",
                border: "1px solid #2a3a50",
                borderRadius: 6,
                padding: "10px 18px",
                fontSize: 12,
                color: "#6a8aaa",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              Reset
            </button>
          </div>

          {/* Three Panels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>

            {/* Panel 1: Universal Law */}
            <div
              style={{
                background: "#0e1e2e",
                border: `2px solid ${getResultColor(universalizeState)}`,
                borderRadius: 8,
                padding: "16px",
                cursor: "pointer",
                transition: "border-color 0.5s",
              }}
              onClick={() => setActivePanel(0)}
            >
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a8ab0", textTransform: "uppercase", marginBottom: 8 }}>
                Formula I
              </div>
              <div style={{ fontSize: 13, color: "#c8d8e8", fontWeight: "bold", marginBottom: 6 }}>
                Universal Law
              </div>
              <div style={{ fontSize: 11, color: "#6a8aaa", marginBottom: 12, lineHeight: 1.5 }}>
                Can this maxim be universalized without contradiction?
              </div>
              <canvas
                ref={canvasRef}
                width={180}
                height={120}
                style={{ width: "100%", height: 100, borderRadius: 4, background: "#0a1520", display: "block" }}
              />
              <div style={{
                marginTop: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: getResultColor(universalizeState),
                textAlign: "center",
              }}>
                {getResultLabel(universalizeState, "universal")}
              </div>
            </div>

            {/* Panel 2: Humanity */}
            <div
              style={{
                background: "#0e1e2e",
                border: `2px solid ${getResultColor(humanityState)}`,
                borderRadius: 8,
                padding: "16px",
                cursor: "pointer",
                transition: "border-color 0.5s",
              }}
              onClick={() => setActivePanel(1)}
            >
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a8ab0", textTransform: "uppercase", marginBottom: 8 }}>
                Formula II
              </div>
              <div style={{ fontSize: 13, color: "#c8d8e8", fontWeight: "bold", marginBottom: 6 }}>
                Humanity
              </div>
              <div style={{ fontSize: 11, color: "#6a8aaa", marginBottom: 12, lineHeight: 1.5 }}>
                Are rational agents treated as ends, not merely means?
              </div>
              <svg width="100%" height="100" viewBox="0 0 180 100" style={{ display: "block", background: "#0a1520", borderRadius: 4 }}>
                {humanityState === "pass" && (
                  <>
                    <circle cx="90" cy="50" r="28" fill="none" stroke="#4CAF80" strokeWidth="2" opacity="0.4" />
                    <circle cx="90" cy="50" r="22" fill="none" stroke="#4CAF80" strokeWidth="1.5" opacity="0.7" />
                    <circle cx="90" cy="32" r="8" fill="#4CAF80" opacity="0.8" />
                    <line x1="90" y1="40" x2="90" y2="62" stroke="#4CAF80" strokeWidth="2.5" />
                    <line x1="75" y1="50" x2="105" y2="50" stroke="#4CAF80" strokeWidth="2.5" />
                    <line x1="90" y1="62" x2="78" y2="78" stroke="#4CAF80" strokeWidth="2.5" />
                    <line x1="90" y1="62" x2="102" y2="78" stroke="#4CAF80" strokeWidth="2.5" />
                    <text x="90" y="96" textAnchor="middle" fontSize="9" fill="#4CAF80" fontFamily="Georgia, serif">Autonomous Agent</text>
                  </>
                )}
                {humanityState === "fail" && (
                  <>
                    <circle cx="60" cy="40" r="8" fill="#E05A5A" opacity="0.8" />
                    <line x1="60" y1="48" x2="60" y2="68" stroke="#E05A5A" strokeWidth="2.5" />
                    <line x1="47" y1="57" x2="73" y2="57" stroke="#E05A5A" strokeWidth="2.5" />
                    <line x1="60" y1="68" x2="50" y2="82" stroke="#E05A5A" strokeWidth="2.5" />
                    <line x1="60" y1="68" x2="70" y2="82" stroke="#E05A5A" strokeWidth="2.5" />
                    <line x1="70" y1="57" x2="110" y2="57" stroke="#E05A5A" strokeWidth="2" strokeDasharray="4,2" />
                    <circle cx="125" cy="40" r="8" fill="#888" opacity="0.8" />
                    <line x1="125" y1="48" x2="125" y2="68" stroke="#888" strokeWidth="2.5" />
                    <line x1="112" y1="57" x2="138" y2="57" stroke="#888" strokeWidth="2.5" />
                    <line x1="125" y1="68" x2="115" y2="82" stroke="#888" strokeWidth="2.5" />
                    <line x1="125" y1="68" x2="135" y2="82" stroke="#888" strokeWidth="2.5" />
                    <text x="110" y="54" fontSize="16" fill="#E05A5A">⛓</text>
                    <text x="90" y="96" textAnchor="middle" fontSize="9" fill="#E05A5A" fontFamily="Georgia, serif">Used as Mere Means</text>
                  </>
                )}
                {(humanityState === "idle" || humanityState === "running") && (
                  <>
                    <circle cx="90" cy="38" r="8" fill="#2a4a6a" opacity="0.6" />
                    <line x1="90" y1="46" x2="90" y2="66" stroke="#2a4a6a" strokeWidth="2.5" />
                    <line x1="77" y1="55" x2="103" y2="55" stroke="#2a4a6a" strokeWidth="2.5" />
                    <line x1="90" y1="66" x2="80" y2="82" stroke="#2a4a6a" strokeWidth="2.5" />
                    <line x1="90" y1="66" x2="100" y2="82" stroke="#2a4a6a" strokeWidth="2.5" />
                    <text x="90" y="96" textAnchor="middle" fontSize="9" fill="#2a4a6a" fontFamily="Georgia, serif">{humanityState === "running" ? "Analyzing..." : "Awaiting test"}</text>
                  </>
                )}
              </svg>
              <div style={{
                marginTop: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: getResultColor(humanityState),
                textAlign: "center",
              }}>
                {getResultLabel(humanityState, "humanity")}
              </div>
            </div>

            {/* Panel 3: Kingdom of Ends */}
            <div
              style={{
                background: "#0e1e2e",
                border: `2px solid ${getResultColor(kingdomState)}`,
                borderRadius: 8,
                padding: "16px",
                cursor: "pointer",
                transition: "border-color 0.5s",
              }}
              onClick={() => setActivePanel(2)}
            >
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5a8ab0", textTransform: "uppercase", marginBottom: 8 }}>
                Formula III
              </div>
              <div style={{ fontSize: 13, color: "#c8d8e8", fontWeight: "bold", marginBottom: 6 }}>
                Kingdom of Ends
              </div>
              <div style={{ fontSize: 11, color: "#6a8aaa", marginBottom: 12, lineHeight: 1.5 }}>
                Could all rational beings collectively legislate this?
              </div>
              <svg width="100%" height="100" viewBox="0 0 180 100" style={{ display: "block", background: "#0a1520", borderRadius: 4 }}>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
                  const r = 32;
                  const cx = 90 + Math.cos(angle) * r;
                  const cy = 50 + Math.sin(angle) * r;
                  const color = kingdomState === "pass" ? "#4CAF80" : kingdomState === "fail" ? "#E05A5A" : "#2a4a6a";
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy - 6} r={5} fill={color} opacity={0.8} />
                      <line x1={cx} y1={cy - 1} x2={cx} y2={cy + 12} stroke={color} strokeWidth={1.5} />
                      <line x1={cx - 7} y1={cy + 5} x2={cx + 7} y2={cy + 5} stroke={color} strokeWidth={1.5} />
                    </g>
                  );
                })}
                {kingdomState === "pass" && (
                  <circle cx="90" cy="50" r="44" fill="none" stroke="#4CAF80" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
                )}
                {kingdomState === "fail" && (
                  <text x="90" y="55" textAnchor="middle" fontSize="18" fill="#E05A5A" opacity="0.7">✕</text>
                )}
                <text x="90" y="96" textAnchor="middle" fontSize="9"
                  fill={kingdomState === "pass" ? "#4CAF80" : kingdomState === "fail" ? "#E05A5A" : "#2a4a6a"}
                  fontFamily="Georgia, serif">
                  {kingdomState === "running" ? "Deliberating..." : kingdomState === "idle" ? "Republic of Reason" : kingdomState === "pass" ? "Unanimously Enacted" : "Rejected by All"}
                </text>
              </svg>
              <div style={{
                marginTop: 10,
                fontSize: 13,
                fontWeight: "bold",
                color: getResultColor(kingdomState),
                textAlign: "center",
              }}>
                {getResultLabel(kingdomState, "kingdom")}
              </div>
            </div>
          </div>

          {/* Explanation Panel */}
          {(universalizeState !== "idle" && universalizeState !== "running") && (
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { title: "Universal Law Analysis", text: ex.universalExplanation, result: universalizeState },
                { title: "Humanity Analysis", text: ex.humanityExplanation, result: humanityState },
                { title: "Kingdom of Ends Analysis", text: ex.kingdomExplanation, result: kingdomState },
              ].map((panel, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "#0d1a28",
                    border: `1px solid ${getResultColor(panel.result)}40`,
                    borderLeft: `3px solid ${getResultColor(panel.result)}`,
                    borderRadius: 6,
                    padding: "12px 14px",
                    fontSize: 12,
                    color: "#b0c4d8",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ fontSize: 10, letterSpacing: 1.5, color: getResultColor(panel.result), textTransform: "uppercase", marginBottom: 6 }}>
                    {panel.title}
                  </div>
                  {panel.text}
                </div>
              ))}
            </div>
          )}

          {/* Categorical vs Hypothetical Comparison */}
          <div style={{
            marginTop: 24,
            background: "#0d1a26",
            border: "1px solid #1e3050",
            borderRadius: 8,
            padding: "16px 20px",
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#5a8ab0", textTransform: "uppercase", marginBottom: 14 }}>
              The Core Distinction
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{
                background: "#0a1220",
                border: "1px solid #2a4a6a",
                borderRadius: 6,
                padding: "14px",
              }}>
                <div style={{ fontSize: 12, color: "#6aaad0", fontWeight: "bold", marginBottom: 8 }}>
                  Hypothetical Imperative
                </div>
                <div style={{ fontSize: 13, fontStyle: "italic", color: "#8abacc", marginBottom: 8 }}>
                  "If you want Y, then do X."
                </div>
                <div style={{ fontSize: 12, color: "#6a8aaa", lineHeight: 1.6 }}>
                  Binding only conditionally — on the presence of a desire. If you lack the relevant want, the command has no force. These cover most practical instructions but cannot ground universal moral law.
                </div>
              </div>
              <div style={{
                background: "#0a1a16",
                border: "1px solid #1D5C8A",
                borderRadius: 6,
                padding: "14px",
              }}>
                <div style={{ fontSize: 12, color: "#4abaaa", fontWeight: "bold", marginBottom: 8 }}>
                  Categorical Imperative
                </div>
                <div style={{ fontSize: 13, fontStyle: "italic", color: "#7abaaa", marginBottom: 8 }}>
                  "Do X." Full stop.
                </div>
                <div style={{ fontSize: 12, color: "#6a8aaa", lineHeight: 1.6 }}>
                  Binding unconditionally — regardless of what you happen to want. It derives from the structure of rational agency itself, not any contingent desire. This alone can ground universal morality.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(29,92,138,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1D5C8A", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map((c) => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#1D5C8A" : "rgba(29,92,138,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#3a7ab0" : "rgba(29,92,138,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#6a9ab8",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(29,92,138,0.08)", border: "1px solid rgba(29,92,138,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#1D5C8A", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0f1820",
          border: "1px solid #1a2a3a",
          borderLeft: "4px solid #2a5a7a",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#2a7a9a", textTransform: "uppercase", marginBottom: 12 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b8bfaf", margin: "0 0 12px 0" }}>
            The categorical imperative rests entirely on the concept of free rational agency — but freedom has so far been established only as a noumenal possibility, not as a practically necessary reality. If the will is not genuinely free, the entire architecture collapses: we cannot be commanded by reason if we are merely determined by nature. The imperative seems to presuppose what has not yet been proven.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b8bfaf", margin: 0 }}>
            A second tension cuts even deeper: if morality commands unconditionally, and the virtuous person may nonetheless suffer while the vicious flourish, is moral action ultimately rational or futile? The categorical imperative promises no reward — yet rationality seems to demand some connection between virtue and happiness. Experience provides none. Something more must be said about whether the moral universe is coherent.
          </p>
          <p style={{ fontSize: 13, color: "#5a8a9a", marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>
            This pressure forces the next development: demonstrating that freedom is not merely conceivable but practically necessary — and that the postulates of practical reason (freedom, immortality, God) are required to make sense of moral rationality itself.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e1820",
          border: "1px solid #1a2a3a",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, color: "#1D5C8A", textTransform: "uppercase" }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color="#1D5C8A" />
              : <ChevronDown size={16} color="#1D5C8A" />}
          </button>
          {echosOpen && (
            <div style={{ padding: "0 28px 24px 28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {[
                  {
                    title: "The False Promise Test",
                    body: "When a business considers misleading advertising — technically legal, widely practiced — the universalizability test asks: what if every advertiser did this? The resulting erosion of consumer trust reveals the hidden contradiction. The practice depends on general trust it systematically undermines.",
                  },
                  {
                    title: "Legitimate vs. Manipulative Employment",
                    body: "Hiring someone and giving them fair information and genuine choice is using them as means while respecting them as ends. But deceiving applicants about conditions, or exploiting psychological vulnerabilities in negotiation, treats them merely as instruments — violating the formula of humanity even when technically legal.",
                  },
                  {
                    title: "Whistleblowing and Institutional Loyalty",
                    body: "When an employee discovers dangerous wrongdoing, the kingdom of ends test asks: could rational beings legislate a universal duty of institutional silence? No — those harmed by the wrongdoing are also rational beings whose interests must be considered. Their standing as ends in themselves overrides institutional pressure to conceal.",
                  },
                ].map((echo, i) => (
                  <div key={i} style={{
                    background: "#0a1520",
                    border: "1px solid #1a2a3a",
                    borderRadius: 6,
                    padding: "14px 16px",
                  }}>
                    <div style={{ fontSize: 12, color: "#4a8ab0", fontWeight: "bold", marginBottom: 8 }}>
                      {echo.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#8a9aaa", lineHeight: 1.7 }}>
                      {echo.body}
                    </div>
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

// ─── Part 11: Freedom, Autonomy, and the Good Will ───
function FreedomAutonomyGoodwill() {
  const [sliderValue, setSliderValue] = useState(50);
  const [heteronomyMode, setHeteronomyMode] = useState(false);
  const [choiceMade, setChoiceMade] = useState(null);
  const [showChoice, setShowChoice] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const frameRef = useRef(0);

  const phenomenalWeight = sliderValue / 100;
  const noumenalWeight = 1 - phenomenalWeight;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const gears = [
      { x: 60, y: H - 60, r: 35, teeth: 8, speed: 0.008 },
      { x: 130, y: H - 45, r: 22, teeth: 6, speed: -0.013 },
      { x: 185, y: H - 60, r: 28, teeth: 7, speed: 0.010 },
      { x: 250, y: H - 50, r: 20, teeth: 5, speed: -0.015 },
      { x: 300, y: H - 62, r: 32, teeth: 8, speed: 0.009 },
    ];

    const particles = Array.from({ length: 18 }, (_, i) => ({
      x: 80 + Math.random() * (W - 160),
      y: 30 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }));

    function drawGear(ctx, x, y, r, teeth, angle, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#3D5A2E";
      ctx.fillStyle = "#1a2510";
      ctx.lineWidth = 1.5;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      const toothH = r * 0.28;
      const toothW = (2 * Math.PI) / (teeth * 2);
      for (let i = 0; i < teeth * 2; i++) {
        const ang = (i / (teeth * 2)) * Math.PI * 2;
        const rad = i % 2 === 0 ? r + toothH : r;
        if (i === 0) ctx.moveTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
        else ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = "#3D5A2E";
      ctx.stroke();
      ctx.restore();
    }

    function drawDeterministicArrows(ctx, t, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.6;
      ctx.strokeStyle = "#7a9a5e";
      ctx.lineWidth = 1;
      const positions = [80, 150, 220, 290];
      positions.forEach((px, i) => {
        const y = H - 100 - 10 * Math.sin(t * 0.05 + i);
        ctx.beginPath();
        ctx.moveTo(px, y);
        ctx.lineTo(px + 30, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 28, y - 4);
        ctx.lineTo(px + 35, y);
        ctx.lineTo(px + 28, y + 4);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawNoumenalLight(ctx, t, alpha) {
      ctx.save();
      const cx = W / 2;
      const cy = 70;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      grad.addColorStop(0, `rgba(180,220,140,${0.18 * alpha})`);
      grad.addColorStop(0.5, `rgba(61,90,46,${0.10 * alpha})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fill();

      // Radiating lines
      ctx.globalAlpha = 0.25 * alpha;
      ctx.strokeStyle = "#a8c880";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2 + t * 0.003;
        const r1 = 20;
        const r2 = 60 + 15 * Math.sin(t * 0.02 + i);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
        ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawParticles(ctx, t, alpha) {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 20 || p.x > W - 20) p.vx *= -1;
        if (p.y < 10 || p.y > 120) p.vy *= -1;
        const brightness = 0.5 + 0.5 * Math.sin(t * 0.04 + p.phase);
        ctx.save();
        ctx.globalAlpha = 0.5 * alpha * brightness;
        ctx.fillStyle = "#c0e090";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawHeteronomyChains(ctx, t, alpha) {
      if (!heteronomyMode) return;
      ctx.save();
      ctx.globalAlpha = alpha * 0.7;
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      // External authority arrows pointing inward
      const cx = W / 2;
      const cy = 70;
      [[cx - 90, cy - 30], [cx + 90, cy - 30], [cx - 80, cy + 40], [cx + 80, cy + 40]].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(cx + (sx < cx ? 18 : -18), cy + (sy < cy ? 8 : -8));
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawFigure(ctx, t) {
      const cx = W / 2;
      const divY = H / 2 + 10;

      // Lower half (phenomenal) — clockwork tint
      ctx.save();
      ctx.globalAlpha = 0.3 + 0.5 * phenomenalWeight;
      // Legs
      ctx.strokeStyle = "#7a9a5e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, divY + 30);
      ctx.lineTo(cx - 15, divY + 70 + 5 * Math.sin(t * 0.08));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, divY + 30);
      ctx.lineTo(cx + 15, divY + 70 + 5 * Math.sin(t * 0.08 + Math.PI));
      ctx.stroke();
      ctx.restore();

      // Upper half (noumenal) — luminous
      ctx.save();
      ctx.globalAlpha = 0.3 + 0.5 * noumenalWeight;
      // Head
      const headGrad = ctx.createRadialGradient(cx, divY - 60, 4, cx, divY - 60, 16);
      headGrad.addColorStop(0, "#d0eeaa");
      headGrad.addColorStop(1, "#3D5A2E");
      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.arc(cx, divY - 60, 16, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.strokeStyle = "#a8c880";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, divY - 44);
      ctx.lineTo(cx, divY + 30);
      ctx.stroke();
      // Arms
      ctx.beginPath();
      ctx.moveTo(cx, divY - 20);
      ctx.lineTo(cx - 30, divY + 5 + 4 * Math.sin(t * 0.05));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, divY - 20);
      ctx.lineTo(cx + 30, divY + 5 + 4 * Math.sin(t * 0.05 + 1));
      ctx.stroke();
      ctx.restore();

      // Dividing line
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "#3D5A2E";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(20, divY);
      ctx.lineTo(W - 20, divY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawChoiceScenario(ctx, t) {
      if (!showChoice) return;
      const cx = W / 2;
      const divY = H / 2 + 10;

      if (!heteronomyMode) {
        // Inclination arrow (pulling left/down)
        ctx.save();
        ctx.globalAlpha = 0.7 * phenomenalWeight;
        ctx.strokeStyle = "#cc6633";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#cc6633";
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.1);
        ctx.globalAlpha *= pulse;
        ctx.beginPath();
        ctx.moveTo(cx, divY + 50);
        ctx.lineTo(cx - 60, divY + 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 55, divY + 72);
        ctx.lineTo(cx - 63, divY + 82);
        ctx.lineTo(cx - 53, divY + 84);
        ctx.fill();
        ctx.font = "11px Georgia, serif";
        ctx.fillStyle = "#cc9966";
        ctx.fillText("inclination", cx - 100, divY + 85);
        ctx.restore();

        // Categorical Imperative beam (from above)
        ctx.save();
        ctx.globalAlpha = 0.8 * noumenalWeight;
        const beamGrad = ctx.createLinearGradient(cx, 10, cx, divY - 44);
        beamGrad.addColorStop(0, "#d0eeaa");
        beamGrad.addColorStop(1, "rgba(61,90,46,0)");
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 3 + 2 * Math.sin(t * 0.07);
        ctx.beginPath();
        ctx.moveTo(cx, 10);
        ctx.lineTo(cx, divY - 44);
        ctx.stroke();
        ctx.fillStyle = "#c0e090";
        ctx.font = "11px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("categorical", cx + 40, 55);
        ctx.fillText("imperative", cx + 40, 68);
        ctx.textAlign = "left";
        ctx.restore();
      } else {
        // Heteronomy: external authority arrow from right
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "#8B4513";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#8B4513";
        ctx.beginPath();
        ctx.moveTo(W - 20, divY - 20);
        ctx.lineTo(cx + 35, divY - 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 38, divY - 26);
        ctx.lineTo(cx + 28, divY - 20);
        ctx.lineTo(cx + 38, divY - 14);
        ctx.fill();
        ctx.font = "11px Georgia, serif";
        ctx.fillStyle = "#cc8855";
        ctx.fillText("external authority", cx + 45, divY - 15);
        ctx.restore();
      }
    }

    function loop() {
      frameRef.current += 1;
      const t = frameRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0d150a");
      bg.addColorStop(1, "#060a04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Phenomenal zone background
      ctx.save();
      ctx.globalAlpha = 0.15 + 0.2 * phenomenalWeight;
      ctx.fillStyle = "#1a2510";
      ctx.fillRect(0, H / 2 + 10, W, H / 2 - 10);
      ctx.restore();

      // Noumenal zone background
      ctx.save();
      ctx.globalAlpha = 0.08 + 0.12 * noumenalWeight;
      ctx.fillStyle = "#2a4020";
      ctx.fillRect(0, 0, W, H / 2 + 10);
      ctx.restore();

      drawNoumenalLight(ctx, t, noumenalWeight);
      drawParticles(ctx, t, noumenalWeight);
      drawHeteronomyChains(ctx, t, noumenalWeight);

      gears.forEach((g, i) => {
        g._angle = (g._angle || 0) + g.speed * (1 + phenomenalWeight * 0.5);
        drawGear(ctx, g.x, g.y, g.r, g.teeth, g._angle, phenomenalWeight * 0.8 + 0.2);
      });
      drawDeterministicArrows(ctx, t, phenomenalWeight);
      drawFigure(ctx, t);
      drawChoiceScenario(ctx, t);

      // Zone labels
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#a8c880";
      ctx.font = "italic 11px Georgia, serif";
      ctx.fillText("Noumenal Realm — Freedom", 14, 22);
      ctx.fillStyle = "#7a9a5e";
      ctx.fillText("Phenomenal Realm — Natural Law", 14, H - 12);
      ctx.restore();

      setAnimFrame(t);
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [sliderValue, heteronomyMode, showChoice]);

  const concepts = [
    { id: "neg_freedom", label: "Negative Freedom", color: "#7a9a5e", desc: "Independence from sensible impulses — freedom from external determination and instinct." },
    { id: "pos_freedom", label: "Positive Freedom", color: "#a8c880", desc: "Self-determination through rational principles — the will giving itself its own law." },
    { id: "trans_freedom", label: "Transcendental Freedom", color: "#c0e090", desc: "The power to initiate a causal series entirely from reason, unconditioned by nature." },
    { id: "autonomy", label: "Autonomy", color: "#a8d880", desc: "Giving moral laws to oneself through reason — the source of unconditional human dignity." },
    { id: "heteronomy", label: "Heteronomy", color: "#7a4520", desc: "When will is determined by external factors — desire, authority, custom — rather than self-given rational law." },
    { id: "good_will", label: "Good Will", color: "#d0eeaa", desc: "The only unconditionally good thing: a will acting consistently from duty, whose worth no circumstance can diminish." },
  ];

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 30%, #0d1a08 0%, #060a04 60%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#c8d8b8",
      padding: "0 0 60px 0",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{ padding: "40px 0 0 0" }}>
        <div style={{ fontSize: "11px", color: "#3D5A2E", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
          Part 11 of 21 — Kant's Moral Philosophy
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "normal", color: "#d0eeaa", margin: "0 0 8px 0", letterSpacing: "0.5px" }}>
          Freedom, Autonomy, and the Good Will
        </h1>
        <p style={{ fontSize: "14px", color: "#8aaa70", margin: 0, fontStyle: "italic", maxWidth: "700px" }}>
          Kant's moral philosophy grounds human dignity in the capacity for autonomous self-legislation and identifies the good will as the only unconditionally valuable thing.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{ margin: "32px 0 0 0", background: "#0d1a08cc", border: "1px solid #1a2a10", borderLeft: "3px solid #3D5A2E", borderRadius: "6px", padding: "24px 28px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#3D5A2E", marginBottom: "12px" }}>The Problem</div>
        <p style={{ margin: 0, lineHeight: "1.75", fontSize: "14px", color: "#b0c898" }}>
          The categorical imperative demands free rational agency — but human beings are also phenomenal creatures embedded in natural causality, subject to the same deterministic laws that govern falling stones. Kant's theoretical philosophy demonstrated only that freedom is <em>possible</em>, that it does not contradict natural science — not that it is <em>actual</em>. The pressure is acute: how can we affirm genuine moral freedom, the very foundation of moral responsibility, without contradicting the scientific account of a deterministic nature that leaves no room for uncaused causes?
        </p>
      </div>

      {/* Main Visualization */}
      <div style={{ margin: "32px 0 0 0" }}>
        <div style={{ background: "#0a120800", border: "1px solid #1e2e14", borderRadius: "8px", padding: "28px", backdropFilter: "blur(4px)" }}>
          <div style={{ fontSize: "13px", color: "#8aaa70", marginBottom: "20px", letterSpacing: "1px" }}>
            The Dual Nature — Phenomenal & Noumenal
          </div>

          {/* Canvas */}
          <div style={{ display: "flex", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid #2a3a1a", flexShrink: 0 }}>
              <canvas ref={canvasRef} width={360} height={320} style={{ display: "block" }} />
            </div>

            {/* Controls */}
            <div style={{ flex: 1, minWidth: "220px" }}>
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", color: "#8aaa70", marginBottom: "10px", letterSpacing: "1px" }}>
                  Phenomenal ←→ Noumenal emphasis
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  style={{ width: "100%", cursor: "pointer", accentColor: "#3D5A2E" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#5a7a44" }}>
                  <span>Natural Law</span>
                  <span>Rational Freedom</span>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <button
                  onClick={() => { setShowChoice(!showChoice); setChoiceMade(null); }}
                  style={{
                    background: showChoice ? "#1e3010" : "#0d1a08",
                    border: "1px solid #3D5A2E",
                    borderRadius: "4px",
                    color: "#a8c880",
                    padding: "9px 16px",
                    cursor: "pointer",
                    fontSize: "12px",
                    width: "100%",
                    marginBottom: "10px",
                    fontFamily: "Georgia, serif",
                    transition: "background 0.2s",
                  }}
                >
                  {showChoice ? "Hide Moral Choice Scenario" : "Show Moral Choice Scenario"}
                </button>

                <button
                  onClick={() => setHeteronomyMode(!heteronomyMode)}
                  style={{
                    background: heteronomyMode ? "#1a0d05" : "#0d1a08",
                    border: `1px solid ${heteronomyMode ? "#8B4513" : "#3D5A2E"}`,
                    borderRadius: "4px",
                    color: heteronomyMode ? "#cc9966" : "#a8c880",
                    padding: "9px 16px",
                    cursor: "pointer",
                    fontSize: "12px",
                    width: "100%",
                    fontFamily: "Georgia, serif",
                    transition: "background 0.2s",
                  }}
                >
                  {heteronomyMode ? "Mode: Heteronomy (External Rule)" : "Mode: Autonomy (Self-Rule)"}
                </button>
              </div>

              {showChoice && (
                <div style={{ background: "#0a120a", border: "1px solid #2a3a1a", borderRadius: "5px", padding: "14px", fontSize: "12px" }}>
                  <div style={{ color: "#c0e090", marginBottom: "8px", fontStyle: "italic" }}>Scenario: You find a wallet full of cash.</div>
                  {!heteronomyMode ? (
                    <p style={{ color: "#8aaa70", margin: "0 0 10px 0", lineHeight: "1.6" }}>
                      Inclination: keep it. But reason asks — could you universalize this maxim? The categorical imperative illuminates the noumenal will.
                    </p>
                  ) : (
                    <p style={{ color: "#cc8855", margin: "0 0 10px 0", lineHeight: "1.6" }}>
                      Heteronomy: you return the wallet because authority commands it, or because you fear punishment — not from self-given law.
                    </p>
                  )}
                  {!choiceMade && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => setChoiceMade("return")}
                        style={{ flex: 1, background: "#1a2a10", border: "1px solid #3D5A2E", borderRadius: "3px", color: "#a8c880", padding: "6px", cursor: "pointer", fontSize: "11px", fontFamily: "Georgia, serif" }}
                      >
                        Return it (duty)
                      </button>
                      <button
                        onClick={() => setChoiceMade("keep")}
                        style={{ flex: 1, background: "#150d05", border: "1px solid #8B4513", borderRadius: "3px", color: "#cc9966", padding: "6px", cursor: "pointer", fontSize: "11px", fontFamily: "Georgia, serif" }}
                      >
                        Keep it (inclination)
                      </button>
                    </div>
                  )}
                  {choiceMade && (
                    <div style={{ color: choiceMade === "return" ? "#c0e090" : "#cc9966", lineHeight: "1.6" }}>
                      {choiceMade === "return"
                        ? "The noumenal will acts from duty — moral worth resides in the maxim, not the outcome."
                        : "The phenomenal impulse wins here — but Kant insists this possibility is precisely why duty must constrain inclination."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Core Argument prose */}
          <div style={{ marginTop: "28px", borderTop: "1px solid #1a2a10", paddingTop: "22px" }}>
            <div style={{ fontSize: "12px", color: "#5a7a44", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>The Argument</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", maxWidth: "700px" }}>
              <div style={{ background: "#0d1508", border: "1px solid #2a4018", borderRadius: "5px", padding: "16px" }}>
                <div style={{ color: "#7aaa50", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px" }}>Transcendental Resolution</div>
                <p style={{ margin: 0, fontSize: "12px", color: "#8aaa70", lineHeight: "1.7" }}>
                  Natural determinism is confined to the phenomenal realm. As noumenal beings, humans exist outside the causal framework altogether — moral consciousness, felt as the constraint of duty over inclination, is our practical awareness of this freedom.
                </p>
              </div>
              <div style={{ background: "#0d1508", border: "1px solid #2a4018", borderRadius: "5px", padding: "16px" }}>
                <div style={{ color: "#d0eeaa", fontSize: "12px", marginBottom: "8px", letterSpacing: "1px" }}>The Good Will</div>
                <p style={{ margin: 0, fontSize: "12px", color: "#8aaa70", lineHeight: "1.7" }}>
                  Intelligence, courage, happiness — all can serve evil. Only a will acting consistently from duty has worth that no circumstance can diminish. This is why autonomy confers dignity that transcends all price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ margin: "28px 0 0 0" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(61,90,46,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#3D5A2E", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map((c) => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#3D5A2E" : "rgba(61,90,46,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#6aaa50" : "rgba(61,90,46,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7aaa60",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(61,90,46,0.08)",
              border: "1px solid rgba(61,90,46,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#3D5A2E", marginBottom: 8 }}>
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
      <div style={{ margin: "28px 0 0 0", background: "#0f0f0acc", border: "1px solid #1e1a10", borderLeft: "3px solid #7a6a2e", borderRadius: "6px", padding: "24px 28px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#7a6a2e", marginBottom: "12px" }}>The Difficulty</div>
        <p style={{ margin: "0 0 12px 0", lineHeight: "1.75", fontSize: "14px", color: "#b0a880" }}>
          Grounding morality in autonomous rational self-legislation raises a deep problem in moral psychology: how does pure reason actually <em>motivate</em> action in finite beings who are also creatures of desire, emotion, and habit? The rational moral law, by its very purity, seems suspended above the sensible world — remote from the appetites and feelings that actually move us to act. A merely rational imperative seems unable to reach beings who hunger, fear, and love.
        </p>
        <p style={{ margin: 0, fontSize: "13px", color: "#7a6a5a", fontStyle: "italic" }}>
          This pressure forces the next development: an account of moral feeling, the role of respect for the law, and how reason acquires practical motivating force in creatures of flesh and reason alike.
        </p>
      </div>

      {/* Real-World Echoes */}
      <div style={{ margin: "20px 0 0 0", background: "#0a0f0acc", border: "1px solid #1a1e12", borderRadius: "6px", overflow: "hidden" }}>
        <button
          onClick={() => setEchoesOpen(!echoesOpen)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "18px 24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Georgia, serif",
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#5a7a44" }}>Real-World Echoes</span>
          {echoesOpen
            ? <ChevronUp size={16} color="#3D5A2E" />
            : <ChevronDown size={16} color="#3D5A2E" />
          }
        </button>
        {echoesOpen && (
          <div style={{ padding: "0 24px 22px 24px", borderTop: "1px solid #1a2a10" }}>
            <p style={{ fontSize: "13px", color: "#8aaa70", lineHeight: "1.75", marginTop: "16px" }}>
              In his essay "What Is Enlightenment?", Kant describes the condition of <em>self-imposed tutelage</em> — the state of depending on another's authority to think and decide — as a failure to exercise autonomy. Moral maturity means having the courage to use one's own reason, to step from heteronomy into self-legislation. This maps directly onto contemporary debates about intellectual independence, conformity, and the social pressures that keep individuals from examining inherited beliefs.
            </p>
            <p style={{ fontSize: "13px", color: "#8aaa70", lineHeight: "1.75" }}>
              The phenomenology of moral obligation — the experience of <em>feeling</em> duty as a constraint, as something that demands action against what we might prefer — is itself Kantian evidence for our dual nature. When someone returns a found wallet despite wanting to keep it, and experiences this as genuinely obligatory rather than merely prudent, they are enacting the very structure Kant describes: the noumenal will imposing law on the phenomenal being.
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

// ─── Part 12: The Critique of Practical Reason and Moral Psychology ───
function CritiquePracticalReasonMoralPsychology() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [choiceMade, setChoiceMade] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [respectLevel, setRespectLevel] = useState(0);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [scaleAngle, setScaleAngle] = useState(0);
  const [hoveredMotivation, setHoveredMotivation] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const starsRef = useRef([]);

  const scenarios = [
    {
      title: "The Charitable Gift",
      description: "A wealthy merchant donates generously to the poor. He feels a warm glow of satisfaction from giving, enjoys the admiration of his peers, and the act aligns perfectly with his compassionate nature.",
      motivations: [
        { label: "From Inclination", id: "inclination", color: "#D4820A", description: "He gives because it feels good, earns admiration, and aligns with his sympathetic temperament." },
        { label: "From Duty", id: "duty", color: "#2C5F8A", description: "He gives because he recognizes the moral obligation to help those in need, regardless of how he feels." }
      ],
      correctId: "duty",
      inclinationVerdict: "Admirable but not morally worthy",
      dutyVerdict: "Genuinely morally worthy",
      inclinationExplanation: "Giving from warm sympathy and personal satisfaction is admirable and beneficial — but it carries no special moral worth. A person of cold temperament who gives despite feeling no inclination would demonstrate greater moral virtue, for they act from duty alone.",
      dutyExplanation: "When the merchant gives because duty demands it — recognizing the moral law regardless of personal feeling — the action achieves genuine moral worth. The motivation is reason itself, reliable and universal across all temperaments.",
    },
    {
      title: "The Honest Confession",
      description: "A student must confess to cheating. She finds it deeply uncomfortable and fears consequences, yet she recognizes she has a duty to be honest. She confesses despite every inclination urging silence.",
      motivations: [
        { label: "From Inclination", id: "inclination", color: "#D4820A", description: "She confesses because she fears being found out and wants to avoid worse punishment later." },
        { label: "From Duty", id: "duty", color: "#2C5F8A", description: "She confesses because honesty is a moral obligation she recognizes as binding, even at personal cost." }
      ],
      correctId: "duty",
      inclinationVerdict: "Contrary to pure duty",
      dutyVerdict: "Morally worthy — virtue under pressure",
      inclinationExplanation: "Confessing purely to avoid worse punishment is acting from self-interest — a natural inclination for self-preservation. The action may produce good results, but the motivation reveals it serves the self, not the moral law.",
      dutyExplanation: "Here virtue shines most clearly. She acts against every natural inclination, choosing duty despite discomfort. This is Kant's image of virtue at its purest: the disposition to choose the moral law precisely when inclination resists it.",
    },
    {
      title: "The Rescue",
      description: "A bystander sees someone drowning. One person leaps in instinctively, driven by natural compassion and without a second thought. Another hesitates, feels fear and reluctance, but jumps in having recognized it as their moral obligation.",
      motivations: [
        { label: "From Inclination", id: "inclination", color: "#D4820A", description: "Immediate, instinctive compassion — jumping in before reason has time to speak." },
        { label: "From Duty", id: "duty", color: "#2C5F8A", description: "Deliberate recognition of obligation — jumping in because it is required by the moral law, despite personal fear." }
      ],
      correctId: "duty",
      inclinationVerdict: "Heroic, but dependent on temperament",
      dutyVerdict: "Morally worthy — reason commanding action",
      inclinationExplanation: "The instinctive rescuer acts beautifully — but their virtue depends on having the right temperament. A cold or timid person with the same situation might not leap. Inclination-based virtue is unreliable across persons.",
      dutyExplanation: "The reluctant rescuer who overcomes fear through recognition of duty demonstrates the universality of moral action. Duty does not depend on having a warm temperament — it commands anyone who can reason, making it the foundation of moral community.",
    }
  ];

  const concepts = [
    { id: "respect", label: "Respect as Moral Feeling", color: "#2C3E7A", desc: "Respect (Achtung) is unique: produced a priori by reason's recognition of the moral law, not by sensible experience. It is simultaneously rational — generated by reason — and sensible — felt as genuine motivation. It humbles inclination while elevating the rational self." },
    { id: "taxonomy", label: "Duty vs. Inclination Taxonomy", color: "#3A6B8A", desc: "Kant distinguishes three types: actions contrary to duty (morally wrong), actions in accordance with duty from inclination (admirable but lacking moral worth), and actions from duty (genuinely morally worthy). Only the third type produces moral worth." },
    { id: "worth", label: "Moral Worth of Actions", color: "#4A7A6A", desc: "The moral worth of an action does not depend on its outcome or its alignment with natural inclination, but solely on the motivation: whether reason's recognition of the moral law drives the will. Even virtuous outcomes achieved by inclination have no special moral credit." },
    { id: "virtue", label: "Virtue as Ongoing Struggle", color: "#5A5A8A", desc: "For Kant, virtue is not a static perfection but a dynamic disposition — the ongoing commitment to choose duty over inclination whenever they conflict. Because finite beings always have inclinations, virtue is always under pressure, always demanding, and always achievable." },
    { id: "starry", label: "Starry Heavens & Moral Law", color: "#2C3E7A", desc: "The closing image of the second Critique: 'Two things fill the mind with ever-increasing admiration and awe: the starry heavens above me and the moral law within me.' The cosmos reveals our smallness as natural beings; the moral law reveals our greatness as rational agents." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 120; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random(),
          speed: Math.random() * 0.003 + 0.001,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        const pulse = 0.4 + 0.6 * Math.sin(t * star.speed * 60 + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.floor(180 + pulse * 75).toString(16).padStart(2,"0")}${Math.floor(185 + pulse * 70).toString(16).padStart(2,"0")}FF`;
        ctx.globalAlpha = pulse * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      t++;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleChoice = (motivationId) => {
    if (showResult) return;
    setChoiceMade(motivationId);
    setShowResult(true);
    const isCorrect = motivationId === scenarios[selectedScenario].correctId;
    if (motivationId === "duty") {
      setRespectLevel(prev => Math.min(100, prev + 33));
    }
    if (motivationId === "duty" && respectLevel >= 66) {
      setTimeout(() => setShowQuote(true), 800);
    }
  };

  const handleNextScenario = () => {
    const next = (selectedScenario + 1) % scenarios.length;
    setSelectedScenario(next);
    setChoiceMade(null);
    setShowResult(false);
    if (next === 2 && respectLevel >= 66) {
      setTimeout(() => setShowQuote(true), 1500);
    }
  };

  const scenario = scenarios[selectedScenario];

  const scaleLeft = choiceMade === "inclination" ? 18 : choiceMade === "duty" ? -18 : 0;
  const scaleRight = choiceMade === "duty" ? 18 : choiceMade === "inclination" ? -18 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 20%, #1a2550 0%, #0d1530 40%, #050810 100%)",
      fontFamily: "Georgia, serif",
      color: "#D8DCF0",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.6,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#7080B0", marginBottom: "10px" }}>
            Part 12 of 21 — Kant's Critical Philosophy
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: "normal", color: "#E8ECF8", margin: "0 0 10px", lineHeight: 1.3 }}>
            The Critique of Practical Reason and Moral Psychology
          </h1>
          <p style={{ fontSize: "14px", color: "#8090C0", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            The second Critique completed Kant's account of practical reason by analyzing moral feeling, the psychology of duty versus inclination, and the nature of virtue as ongoing moral struggle.
          </p>
        </div>

        {/* LAYER 1: THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(20, 25, 50, 0.85)",
          border: "1px solid rgba(44, 62, 122, 0.4)",
          borderLeft: "4px solid #2C3E7A",
          borderRadius: "8px",
          padding: "28px 32px",
          marginBottom: "32px",
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#2C5F9A", marginBottom: "14px", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.8, color: "#B8C4E0" }}>
            Establishing that autonomy grounds morality still leaves the question of how pure reason can actually motivate a finite being who also has sensible inclinations. If duty requires suppressing all feeling, moral philosophy seems psychologically unrealistic — a cold, inhuman demand that no actual person could be moved by. The rational architecture of the moral law stands complete, yet the motivational bridge between abstract obligation and lived action remains unbuilt.
          </p>
        </div>

        {/* LAYER 2: MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 20, 45, 0.9)",
          border: "1px solid rgba(44, 62, 122, 0.35)",
          borderRadius: "12px",
          padding: "32px",
          marginBottom: "32px",
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#7080B0", marginBottom: "6px" }}>
            The Moral Balance
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "normal", color: "#D0D8F0", margin: "0 0 6px" }}>
            Duty, Inclination, and Moral Worth
          </h2>
          <p style={{ fontSize: "13px", color: "#6878A8", margin: "0 0 28px", lineHeight: 1.6 }}>
            For each scenario, identify which motivation confers genuine moral worth on the action.
          </p>

          {/* Respect Meter */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#7080B0" }}>Respect Meter</span>
              <span style={{ fontSize: "12px", color: "#8090C0" }}>{respectLevel}% — {respectLevel < 33 ? "Recognition begins..." : respectLevel < 66 ? "Moral feeling rising..." : "Full moral awakening"}</span>
            </div>
            <div style={{ background: "rgba(30,40,80,0.6)", borderRadius: "4px", height: "10px", overflow: "hidden", border: "1px solid rgba(44,62,122,0.4)" }}>
              <div style={{
                height: "100%",
                width: `${respectLevel}%`,
                background: `linear-gradient(90deg, #2C3E7A, #5080D0)`,
                borderRadius: "4px",
                transition: "width 0.8s ease",
                boxShadow: respectLevel > 0 ? "0 0 10px rgba(80,130,210,0.5)" : "none",
              }} />
            </div>
            <p style={{ fontSize: "12px", color: "#5060A0", margin: "6px 0 0", fontStyle: "italic" }}>
              Respect (Achtung) is produced a priori by reason's recognition of the moral law — it is both rational and felt.
            </p>
          </div>

          {/* Scale SVG */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <svg width="340" height="160" viewBox="0 0 340 160" style={{ overflow: "visible" }}>
              {/* Fulcrum */}
              <polygon points="170,130 155,155 185,155" fill="#2C3E7A" opacity="0.9" />
              <rect x="145" y="153" width="50" height="6" rx="3" fill="#2C3E7A" opacity="0.8" />

              {/* Beam */}
              <g transform={`rotate(${scaleLeft * 0.5}, 170, 130)`} style={{ transition: "transform 0.6s ease" }}>
                <line x1="60" y1="108" x2="280" y2="108" stroke="#4A5A8A" strokeWidth="3" />
                <line x1="170" y1="108" x2="170" y2="130" stroke="#4A5A8A" strokeWidth="3" />

                {/* Left pan — Inclination */}
                <line x1="70" y1="108" x2="70" y2={130 + scaleLeft} stroke="#8070A0" strokeWidth="1.5" strokeDasharray="3,2" style={{ transition: "all 0.6s ease" }} />
                <ellipse cx="70" cy={132 + scaleLeft} rx="35" ry="12" fill="#C07010" opacity="0.25" stroke="#D4820A" strokeWidth="1" style={{ transition: "all 0.6s ease" }} />
                <text x="70" y={136 + scaleLeft} textAnchor="middle" fontSize="10" fill="#D4820A" style={{ transition: "all 0.6s ease", fontFamily: "Georgia, serif" }}>Inclination</text>

                {/* Right pan — Duty */}
                <line x1="270" y1="108" x2="270" y2={130 + scaleRight} stroke="#6080B0" strokeWidth="1.5" strokeDasharray="3,2" style={{ transition: "all 0.6s ease" }} />
                <ellipse cx="270" cy={132 + scaleRight} rx="35" ry="12" fill="#1A3A6A" opacity="0.4" stroke="#2C5F8A" strokeWidth="1" style={{ transition: "all 0.6s ease" }} />
                <text x="270" y={136 + scaleRight} textAnchor="middle" fontSize="10" fill="#5080C0" style={{ transition: "all 0.6s ease", fontFamily: "Georgia, serif" }}>Duty</text>
              </g>

              {/* Human figure at fulcrum */}
              <circle cx="170" cy="112" r="8" fill="#E8ECF8" opacity="0.9" />
              <line x1="170" y1="120" x2="170" y2="140" stroke="#E8ECF8" strokeWidth="2" opacity="0.9" />
              <line x1="160" y1="128" x2="180" y2="128" stroke="#E8ECF8" strokeWidth="2" opacity="0.9" />
              <line x1="170" y1="140" x2="163" y2="152" stroke="#E8ECF8" strokeWidth="2" opacity="0.9" />
              <line x1="170" y1="140" x2="177" y2="152" stroke="#E8ECF8" strokeWidth="2" opacity="0.9" />

              {/* Moral worth glow when duty chosen */}
              {choiceMade === "duty" && showResult && (
                <ellipse cx="270" cy={132 + scaleRight} rx="38" ry="15" fill="none" stroke="#5080D0" strokeWidth="2" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                </ellipse>
              )}
            </svg>
          </div>

          {/* Scenario Card */}
          <div style={{
            background: "rgba(25,32,65,0.7)",
            border: "1px solid rgba(44,62,122,0.4)",
            borderRadius: "10px",
            padding: "24px",
            marginBottom: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#5060A0" }}>
                Scenario {selectedScenario + 1} of {scenarios.length}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {scenarios.map((_, i) => (
                  <div key={i} style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: i === selectedScenario ? "#2C5F9A" : "rgba(44,62,122,0.3)",
                    border: "1px solid rgba(44,62,122,0.5)",
                  }} />
                ))}
              </div>
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: "normal", color: "#D0D8F0", margin: "0 0 12px" }}>
              {scenario.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#8898C8", lineHeight: 1.7, margin: "0 0 20px" }}>
              {scenario.description}
            </p>

            {!showResult ? (
              <div>
                <p style={{ fontSize: "12px", color: "#5060A0", margin: "0 0 14px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Which motivation gives this action moral worth?
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  {scenario.motivations.map(m => (
                    <button key={m.id}
                      onClick={() => handleChoice(m.id)}
                      onMouseEnter={() => setHoveredMotivation(m.id)}
                      onMouseLeave={() => setHoveredMotivation(null)}
                      style={{
                        flex: 1, minWidth: "160px",
                        background: hoveredMotivation === m.id ? `rgba(${m.id === "inclination" ? "180,100,10" : "30,70,130"},0.3)` : "rgba(20,28,60,0.6)",
                        border: `1px solid ${m.color}`,
                        borderRadius: "8px",
                        padding: "16px",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        boxShadow: hoveredMotivation === m.id ? `0 0 16px ${m.color}40` : "none",
                      }}>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: m.color, marginBottom: "6px", fontFamily: "Georgia, serif" }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: "12px", color: "#8090B8", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
                        {m.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  display: "flex", gap: "14px", marginBottom: "18px", flexWrap: "wrap"
                }}>
                  {scenario.motivations.map(m => {
                    const isChosen = choiceMade === m.id;
                    const isCorrect = m.id === scenario.correctId;
                    return (
                      <div key={m.id} style={{
                        flex: 1, minWidth: "160px",
                        background: isChosen ? (isCorrect ? "rgba(20,60,50,0.5)" : "rgba(60,20,20,0.5)") : "rgba(15,20,45,0.4)",
                        border: `1px solid ${isChosen ? (isCorrect ? "#2A7A5A" : "#7A2A2A") : "rgba(44,62,122,0.3)"}`,
                        borderRadius: "8px",
                        padding: "16px",
                        opacity: (!isChosen && !isCorrect) ? 0.5 : 1,
                      }}>
                        <div style={{ fontSize: "13px", fontWeight: "bold", color: m.color, marginBottom: "6px", fontFamily: "Georgia, serif" }}>
                          {m.label}
                          {isChosen && <span style={{ marginLeft: "8px", fontSize: "11px" }}>{isCorrect ? "✓ Chosen" : "✗ Chosen"}</span>}
                        </div>
                        <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: isCorrect ? "#2A9A6A" : "#888", marginBottom: "8px", fontFamily: "Georgia, serif" }}>
                          {m.id === "inclination" ? scenario.inclinationVerdict : scenario.dutyVerdict}
                        </div>
                        <div style={{ fontSize: "12px", color: "#7080A8", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
                          {m.id === "inclination" ? scenario.inclinationExplanation : scenario.dutyExplanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={handleNextScenario}
                  style={{
                    background: "rgba(44,62,122,0.3)",
                    border: "1px solid #2C3E7A",
                    borderRadius: "6px",
                    padding: "10px 22px",
                    color: "#A0B0E0",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    letterSpacing: "1px",
                  }}>
                  {selectedScenario < scenarios.length - 1 ? "Next Scenario →" : "Begin Again →"}
                </button>
              </div>
            )}
          </div>

          {/* Starry Heavens Quote */}
          {showQuote && (
            <div style={{
              background: "rgba(10,15,35,0.95)",
              border: "1px solid rgba(44,62,122,0.6)",
              borderRadius: "12px",
              padding: "32px",
              marginTop: "20px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: "radial-gradient(ellipse at 50% 0%, rgba(44,62,122,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#4A5A8A", marginBottom: "20px" }}>
                The Closing Words of the Second Critique
              </div>
              <blockquote style={{ margin: "0", fontSize: "17px", color: "#C8D4F0", lineHeight: 1.9, fontStyle: "italic" }}>
                "Two things fill the mind with ever-increasing admiration and awe, the more often and more steadily one reflects on them: the starry heavens above me and the moral law within me."
              </blockquote>
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#4A5A8A" }}>
                — Immanuel Kant, Critique of Practical Reason (1788)
              </div>
              <p style={{ fontSize: "13px", color: "#6070A0", margin: "16px 0 0", lineHeight: 1.7 }}>
                The cosmos diminishes us as natural beings subject to physical law. Yet within each finite person, the moral law elevates us beyond nature — making us members of an intelligible moral order as vast as the universe itself.
              </p>
            </div>
          )}
          {!showQuote && (
            <div style={{
              background: "rgba(10,15,35,0.5)",
              border: "1px dashed rgba(44,62,122,0.3)",
              borderRadius: "12px",
              padding: "18px 24px",
              marginTop: "20px",
              textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#4A5A80", fontStyle: "italic" }}>
                Choose duty in the scenarios above to unlock Kant's famous closing reflection on the starry heavens and the moral law...
              </p>
            </div>
          )}
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(44,95,154,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2C5F9A", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#2C5F9A" : "rgba(44,95,154,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#4a80cc" : "rgba(44,95,154,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#7a9acc",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(44,95,154,0.08)", border: "1px solid rgba(44,95,154,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#2C5F9A", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* LAYER 3: THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20, 20, 45, 0.85)",
          border: "1px solid rgba(60, 40, 100, 0.4)",
          borderLeft: "4px solid #3A2870",
          borderRadius: "8px",
          padding: "28px 32px",
          marginBottom: "24px",
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#5A4090", marginBottom: "14px", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px", fontSize: "15px", lineHeight: 1.8, color: "#A8A8D0" }}>
            Even with a complete moral psychology, morality raises a deeper existential problem. The moral law demands perfect virtue and promises that virtue should be rewarded with proportionate happiness — Kant calls this the "highest good." Yet perfect virtue is impossible for finite beings caught between reason and inclination, and experience shows that the virtuous often suffer while the wicked flourish. Nature and morality seem indifferent to one another.
          </p>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.8, color: "#7878A8", fontStyle: "italic" }}>
            Is moral action ultimately rational if the highest good — perfect virtue rewarded with proportionate happiness — seems permanently unachievable within any natural lifetime? This pressure forces the next development: Kant must argue for the postulates of pure practical reason — God, freedom, and immortality — as the conditions under which moral rationality can remain coherent.
          </p>
        </div>

        {/* LAYER 4: REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(15, 20, 45, 0.85)",
          border: "1px solid rgba(44,62,122,0.3)",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "20px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#7080A0",
              fontFamily: "Georgia, serif",
            }}>
            <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>Real-World Echoes</span>
            {echoesOpen ? <ChevronUp size={16} color="#5060A0" /> : <ChevronDown size={16} color="#5060A0" />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 28px 28px" }}>
              <p style={{ fontSize: "14px", color: "#5A6A8A", lineHeight: 1.7, margin: "0 0 18px", fontStyle: "italic" }}>
                These Kantian distinctions surface with surprising clarity in everyday moral life.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{
                  background: "rgba(20,28,60,0.5)",
                  border: "1px solid rgba(44,62,122,0.3)",
                  borderRadius: "8px",
                  padding: "18px 22px",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#A0B0D8", marginBottom: "8px" }}>
                    Natural Compassion vs. Principled Giving
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#7080A8", lineHeight: 1.7 }}>
                    Consider two donors to a homeless shelter. One gives because the sight of suffering moves them emotionally — their compassion is genuine and the outcome is good. Another gives despite feeling no particular emotion toward strangers, having reasoned that poverty is an injustice they are obligated to address. Kant would say only the second action has moral worth, however admirable the first may appear. The compassionate donor might stop giving should the sight of poverty become familiar or should their emotional resources be exhausted, while the duty-bound donor has a stable, universal reason that does not depend on emotional availability.
                  </p>
                </div>
                <div style={{
                  background: "rgba(20,28,60,0.5)",
                  border: "1px solid rgba(44,62,122,0.3)",
                  borderRadius: "8px",
                  padding: "18px 22px",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "#A0B0D8", marginBottom: "8px" }}>
                    Moral Feeling in Professional Ethics
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#7080A8", lineHeight: 1.7 }}>
                    Medical and legal professionals face this tension acutely. A doctor who feels deep personal warmth for every patient may provide excellent care, but their motivation is contingent on likability. The professional who treats every patient with equal care because their role carries a moral obligation — regardless of personal feeling — embodies something closer to Kantian virtue. Professional codes of ethics often implicitly encode this insight: obligation, not sentiment, must ground reliable moral practice.
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

// ─── Part 13: The Postulates of Practical Reason: God, Freedom, and Immortality ───
function PostulatesGodFreedomImmortality() {
  const [mode, setMode] = useState("theoretical");
  const [activeDoor, setActivedoor] = useState(null);
  const [hoveredDoor, setHoveredDoor] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animatingKey, setAnimatingKey] = useState(null);
  const [keyBroken, setKeyBroken] = useState({});
  const [doorOpen, setDoorOpen] = useState({});
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const keyConcepts = [
    { id: "summum_bonum", label: "Highest Good (Summum Bonum)", desc: "The complete moral ideal in which perfect virtue is crowned with happiness proportionate to it. Kant argues that the moral law commands us to pursue the summum bonum, yet its realization requires conditions that nature alone cannot provide — giving rise to the postulates of immortality and God as conditions of rational moral hope." },
    { id: "practical_postulate", label: "Practical Postulate", desc: "A proposition whose truth cannot be theoretically demonstrated but which must be assumed as a condition for the coherence of moral rationality. Unlike hypotheses or beliefs, practical postulates are not arbitrary — they are the specific conditions required by the undeniable demands of the moral law, which practical reason accepts as a form of rational moral faith." },
    { id: "immortality", label: "Immortality of the Soul", desc: "The first postulate of practical reason: because perfect virtue (complete conformity of the will with the moral law) is unachievable in any finite lifetime, and the moral law demands pursuit of perfect virtue, practical reason must postulate an endless continuation of personal existence — immortality — as the condition for infinite moral progress." },
    { id: "existence_god", label: "Existence of God", desc: "The second postulate of practical reason: because nature is indifferent to virtue, providing no guarantee that happiness is proportioned to moral worth, and because the summum bonum requires such proportion, practical reason must postulate a morally wise author of nature — God — who can guarantee the connection between virtue and happiness." },
    { id: "moral_faith", label: "Moral Faith", desc: "Kant's third mode of rational assent, distinct from theoretical knowledge and mere subjective belief. Moral faith is rational assent to the postulates required by the undeniable demands of moral obligation. It is not wishful thinking but a commitment grounded in the structure of practical reason itself — the form of rational acceptance appropriate to questions about the conditions of moral action." },
  ];

  const doors = [
    {
      id: "freedom",
      label: "Freedom",
      symbol: "⚖",
      color: "#7B5EA7",
      problem: "Determinism seems to rule all nature — how can we be truly responsible?",
      theoreticalBlock: "Theoretical reason cannot prove libertarian free will — causality pervades the phenomenal world.",
      practicalKey: "Morality presupposes responsibility. We must postulate freedom as the condition of genuine moral agency.",
      content: {
        title: "The Postulate of Freedom",
        description: "Behind the door of Freedom lies the recognition that moral responsibility demands genuine agency. Though theoretical reason cannot penetrate the veil of determinism in the phenomenal world, practical reason insists: the moral law commands us, therefore we must be capable of obeying it. The ought implies the can.",
        image: "freedom"
      }
    },
    {
      id: "immortality",
      label: "Immortality",
      symbol: "∞",
      color: "#8B6BB7",
      problem: "Finite beings cannot achieve the perfect virtue the moral law demands.",
      theoreticalBlock: "Theoretical reason offers no proof of a soul surviving death — empirical evidence speaks only of biological dissolution.",
      practicalKey: "Moral progress requires unlimited time. We must postulate immortality as the condition for infinite approximation toward holiness.",
      content: {
        title: "The Postulate of Immortality",
        description: "Behind the door of Immortality lies the infinite staircase of moral development. No finite life can complete the journey to perfect virtue — yet the moral law demands nothing less. Practical reason resolves this by postulating an endless continuation: not as proven fact, but as the rational condition without which moral striving would be ultimately incoherent.",
        image: "immortality"
      }
    },
    {
      id: "god",
      label: "God",
      symbol: "✦",
      color: "#9B7BC7",
      problem: "Nature is indifferent — virtue and happiness are systematically misaligned.",
      theoreticalBlock: "Theoretical reason's proofs of God's existence all fail — the ontological, cosmological, and teleological arguments cannot survive critical scrutiny.",
      practicalKey: "The highest good requires that virtue be proportionately rewarded with happiness. We must postulate God as the moral world-ruler who guarantees this proportion.",
      content: {
        title: "The Postulate of God's Existence",
        description: "Behind the door of God lies the great balancing of the moral universe. In nature, the virtuous suffer and the wicked prosper. Yet the highest good — perfect virtue crowned with proportionate happiness — is what morality commands us to pursue. Practical reason postulates a moral world-author, not as theological dogma, but as the rational ground of moral hope.",
        image: "god"
      }
    }
  ];

  const handleModeToggle = () => {
    const newMode = mode === "theoretical" ? "practical" : "theoretical";
    setMode(newMode);
    if (newMode === "theoretical") {
      setDoorOpen({});
      setKeyBroken({});
      setActivekey(null);
    }
  };

  const setActivekey = (v) => setAnimatingKey(v);

  const handleDoorClick = (doorId) => {
    if (mode === "theoretical") {
      setAnimatingKey(doorId);
      setKeyBroken(prev => ({ ...prev, [doorId]: true }));
      setTimeout(() => {
        setAnimatingKey(null);
      }, 800);
    } else {
      setDoorOpen(prev => ({ ...prev, [doorId]: !prev[doorId] }));
      setActivekey(null);
      setActivekey(doorId === activeKey ? null : doorId);
    }
  };

  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;
    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.01
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.angle += p.drift;
        p.x += Math.cos(p.angle) * p.speed;
        p.y -= p.speed * 0.5;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#6B4C9A";
        ctx.globalAlpha = 0.3 + Math.sin(t * 0.02 + p.angle) * 0.2;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      t++;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const FreedomSVG = () => (
    <svg viewBox="0 0 200 160" style={{ width: "100%", height: "140px" }}>
      <defs>
        <radialGradient id="fglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9B7BC7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="80" rx="70" ry="60" fill="url(#fglow)" />
      {[0,1,2,3,4,5].map(i => (
        <g key={i} transform={`translate(${30 + i * 28}, 80)`}>
          <rect x="-6" y="-25" width="12" height="50" rx="3" fill="#3a2a5a" stroke="#6B4C9A" strokeWidth="0.5" opacity="0.7" />
          <line x1="-8" y1={-15 + i * 5} x2="8" y2={-15 + i * 5} stroke="#6B4C9A" strokeWidth="0.8" opacity="0.5" />
        </g>
      ))}
      <g transform="translate(100, 80)">
        <circle cx="0" cy="0" r="16" fill="#1a0a2a" stroke="#9B7BC7" strokeWidth="1.5" />
        <text x="0" y="5" textAnchor="middle" fill="#C9A8E8" fontSize="14">⚡</text>
      </g>
      <line x1="60" y1="55" x2="100" y2="80" stroke="#9B7BC7" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
      <line x1="140" y1="55" x2="100" y2="80" stroke="#9B7BC7" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
      <text x="100" y="140" textAnchor="middle" fill="#9B7BC7" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">ought implies can</text>
    </svg>
  );

  const ImmortalitySVG = () => (
    <svg viewBox="0 0 200 160" style={{ width: "100%", height: "140px" }}>
      <defs>
        <radialGradient id="iglow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#7B5EA7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="90" rx="70" ry="55" fill="url(#iglow)" />
      {[0,1,2,3,4,5,6].map(i => {
        const progress = i / 6;
        const x = 60 + Math.sin(progress * Math.PI * 3) * 30;
        const y = 130 - i * 17;
        const opacity = 0.4 + progress * 0.6;
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={60 + Math.sin((i-1)/6 * Math.PI * 3) * 30}
                y1={130 - (i-1)*17}
                x2={x} y2={y}
                stroke="#8B6BB7" strokeWidth="1.5" opacity={opacity * 0.7}
              />
            )}
            <circle cx={x} cy={y} r={3 + progress * 4} fill="#1a0a2a" stroke="#8B6BB7" strokeWidth="1" opacity={opacity} />
            <text x={x} y={y + 4} textAnchor="middle" fill="#C9A8E8" fontSize={7 + progress * 5} opacity={opacity}>★</text>
          </g>
        );
      })}
      <text x="130" y="25" fill="#9B7BC7" fontSize="11" opacity="0.7" fontFamily="Georgia, serif">∞</text>
      <text x="100" y="148" textAnchor="middle" fill="#9B7BC7" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">infinite moral progress</text>
    </svg>
  );

  const GodSVG = () => (
    <svg viewBox="0 0 200 160" style={{ width: "100%", height: "140px" }}>
      <defs>
        <radialGradient id="gglow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#9B7BC7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="70" rx="75" ry="55" fill="url(#gglow)" />
      <line x1="100" y1="20" x2="100" y2="60" stroke="#9B7BC7" strokeWidth="2" />
      <line x1="50" y1="60" x2="150" y2="60" stroke="#9B7BC7" strokeWidth="2" />
      <line x1="50" y1="60" x2="50" y2="90" stroke="#9B7BC7" strokeWidth="1.5" />
      <line x1="150" y1="60" x2="150" y2="75" stroke="#9B7BC7" strokeWidth="1.5" />
      <rect x="30" y="90" width="40" height="18" rx="3" fill="#2a1a4a" stroke="#7B5EA7" strokeWidth="1" />
      <text x="50" y="103" textAnchor="middle" fill="#C9A8E8" fontSize="8" fontFamily="Georgia, serif">Virtue</text>
      <rect x="130" y="75" width="40" height="18" rx="3" fill="#2a1a4a" stroke="#7B5EA7" strokeWidth="1" />
      <text x="150" y="88" textAnchor="middle" fill="#C9A8E8" fontSize="8" fontFamily="Georgia, serif">Happiness</text>
      <circle cx="100" cy="15" r="8" fill="#1a0a2a" stroke="#C9A8E8" strokeWidth="1" />
      <text x="100" y="19" textAnchor="middle" fill="#C9A8E8" fontSize="9">✦</text>
      <text x="100" y="148" textAnchor="middle" fill="#9B7BC7" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">virtue rewarded with happiness</text>
    </svg>
  );

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #1a0d2e 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d4c5e8",
      padding: "0",
      position: "relative",
      overflow: "hidden"
    }}>
      <canvas ref={canvasRef} width={800} height={600} style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.5, zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#8B6BB7", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 13 of 21 — Kant's Critical Philosophy
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: "normal", color: "#e8d8f8", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            The Postulates of Practical Reason
          </h1>
          <p style={{ fontSize: "15px", color: "#9B7BC7", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
            God, Freedom, and Immortality
          </p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "#0f0820",
          border: "1px solid #2a1a3a",
          borderLeft: "4px solid #6B4C9A",
          borderRadius: "8px",
          padding: "24px 28px",
          marginBottom: "32px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4C9A", marginBottom: "12px" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "15px", color: "#c4b5d8" }}>
            Moral psychology established that <em>respect</em> motivates moral action — but morality now faces an existential threat. If perfect virtue is impossible for finite beings, and the natural world never rewards virtue with happiness, then striving to be moral appears ultimately irrational. The highest good is commanded yet seemingly unachievable: we are bound by an obligation that points toward an impossible destination.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0c0818",
          border: "1px solid #2a1a3a",
          borderRadius: "12px",
          padding: "28px",
          marginBottom: "32px"
        }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "13px", color: "#9B7BC7", marginBottom: "16px", lineHeight: 1.6 }}>
              The moral law commands pursuit of the <em>summum bonum</em> — perfect virtue proportionately rewarded with happiness. But this faces a double impossibility. Practical reason resolves it through three postulates.
            </div>

            {/* Mode Toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "8px" }}>
              <button
                onClick={() => { setMode("theoretical"); setDoorOpen({}); setActiveKey(null); setKeyBroken({}); }}
                style={{
                  padding: "10px 22px",
                  background: mode === "theoretical" ? "#3a1a5a" : "#1a0d2e",
                  border: "1px solid #6B4C9A",
                  borderRight: "none",
                  borderRadius: "6px 0 0 6px",
                  color: mode === "theoretical" ? "#e8d8f8" : "#6B4C9A",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "13px",
                  transition: "all 0.3s"
                }}
              >
                Theoretical Reason
              </button>
              <button
                onClick={() => setMode("practical")}
                style={{
                  padding: "10px 22px",
                  background: mode === "practical" ? "#3a1a5a" : "#1a0d2e",
                  border: "1px solid #6B4C9A",
                  borderLeft: "none",
                  borderRadius: "0 6px 6px 0",
                  color: mode === "practical" ? "#e8d8f8" : "#6B4C9A",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "13px",
                  transition: "all 0.3s"
                }}
              >
                Practical Faith
              </button>
            </div>
            <div style={{ fontSize: "11px", color: "#6B4C9A", fontStyle: "italic" }}>
              {mode === "theoretical" ? "All doors remain locked — click to see the broken key" : "Click each door to reveal what practical reason postulates"}
            </div>
          </div>

          {/* Three Doors */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            {doors.map((door) => {
              const isHovered = hoveredDoor === door.id;
              const isActive = activeKey === door.id;
              const isBroken = keyBroken[door.id];
              const isOpenDoor = doorOpen[door.id] && mode === "practical";

              return (
                <div key={door.id} style={{ flex: "1", minWidth: "220px", maxWidth: "260px" }}>
                  {/* Door */}
                  <div
                    onClick={() => {
                      if (mode === "theoretical") {
                        setKeyBroken(prev => ({ ...prev, [door.id]: true }));
                        setAnimatingKey(door.id);
                        setTimeout(() => setAnimatingKey(null), 900);
                      } else {
                        const newOpen = !doorOpen[door.id];
                        setDoorOpen(prev => ({ ...prev, [door.id]: newOpen }));
                        setActiveKey(newOpen ? door.id : null);
                      }
                    }}
                    onMouseEnter={() => setHoveredDoor(door.id)}
                    onMouseLeave={() => setHoveredDoor(null)}
                    style={{
                      position: "relative",
                      background: isOpenDoor
                        ? "linear-gradient(135deg, #1a0d2e, #2a1a4a)"
                        : isHovered
                          ? "linear-gradient(135deg, #1f1030, #2a1845)"
                          : "linear-gradient(135deg, #12091e, #1a0d2e)",
                      border: `2px solid ${isOpenDoor ? door.color : isHovered ? "#6B4C9A" : "#3a2a5a"}`,
                      borderRadius: "8px 8px 0 0",
                      padding: "20px 16px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      boxShadow: isHovered || isOpenDoor ? `0 0 20px ${door.color}40` : "none",
                      minHeight: "180px"
                    }}
                  >
                    {/* Door arch SVG */}
                    <svg viewBox="0 0 100 20" style={{ width: "100%", marginBottom: "8px" }}>
                      <path d="M5,20 L5,8 Q50,-5 95,8 L95,20" fill="none" stroke={door.color} strokeWidth="1.5" opacity="0.6" />
                    </svg>

                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px", opacity: isOpenDoor ? 1 : 0.7 }}>
                        {door.symbol}
                      </div>
                      <div style={{ fontSize: "15px", color: "#e8d8f8", marginBottom: "10px", letterSpacing: "1px" }}>
                        {door.label}
                      </div>

                      {/* Key animation area */}
                      <div style={{ minHeight: "50px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {mode === "theoretical" && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{
                              fontSize: isBroken ? "20px" : "18px",
                              transform: animatingKey === door.id ? "rotate(30deg)" : "rotate(0deg)",
                              transition: "transform 0.3s, color 0.3s",
                              color: isBroken ? "#8B2222" : "#6B4C9A",
                              display: "inline-block"
                            }}>
                              {isBroken ? "🗝️" : "🔑"}
                            </div>
                            {isBroken && (
                              <div style={{ fontSize: "10px", color: "#8B2222", marginTop: "4px", fontStyle: "italic" }}>
                                theoretical key fails
                              </div>
                            )}
                            {!isBroken && (
                              <div style={{ fontSize: "10px", color: "#5a3a7a", marginTop: "4px" }}>
                                click to try
                              </div>
                            )}
                          </div>
                        )}
                        {mode === "practical" && !isOpenDoor && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "16px", color: "#C9A8E8" }}>⚗</div>
                            <div style={{ fontSize: "10px", color: "#8B6BB7", marginTop: "4px", fontStyle: "italic" }}>
                              practical key ready
                            </div>
                          </div>
                        )}
                        {isOpenDoor && (
                          <div style={{ fontSize: "10px", color: door.color, fontStyle: "italic" }}>
                            postulate revealed ↓
                          </div>
                        )}
                      </div>

                      <div style={{
                        fontSize: "9px",
                        color: "#5a3a7a",
                        fontStyle: "italic",
                        marginTop: "6px",
                        lineHeight: 1.5
                      }}>
                        {door.problem}
                      </div>
                    </div>
                  </div>

                  {/* Door bottom strip */}
                  <div style={{
                    background: isOpenDoor ? door.color + "30" : "#1a0d2e",
                    border: `1px solid ${isOpenDoor ? door.color : "#2a1a3a"}`,
                    borderTop: "none",
                    borderRadius: "0 0 4px 4px",
                    height: "6px"
                  }} />

                  {/* Expanded content */}
                  {isOpenDoor && (
                    <div style={{
                      background: "#0f0820",
                      border: `1px solid ${door.color}`,
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      padding: "16px",
                      marginTop: "0",
                      animation: "fadeIn 0.4s ease"
                    }}>
                      {door.id === "freedom" && <FreedomSVG />}
                      {door.id === "immortality" && <ImmortalitySVG />}
                      {door.id === "god" && <GodSVG />}

                      <div style={{ fontSize: "12px", fontWeight: "bold", color: door.color, marginBottom: "8px" }}>
                        {door.content.title}
                      </div>
                      <div style={{ fontSize: "11px", lineHeight: 1.7, color: "#b8a8cc" }}>
                        {door.content.description}
                      </div>
                      <div style={{
                        marginTop: "12px",
                        padding: "10px",
                        background: "#1a0d2e",
                        border: `1px solid ${door.color}40`,
                        borderRadius: "4px",
                        fontSize: "11px",
                        color: "#9B7BC7",
                        fontStyle: "italic",
                        lineHeight: 1.6
                      }}>
                        <strong style={{ color: door.color, fontStyle: "normal" }}>Practical Key:</strong> {door.practicalKey}
                      </div>
                    </div>
                  )}

                  {/* Theoretical block tooltip */}
                  {mode === "theoretical" && isBroken && (
                    <div style={{
                      background: "#0f0820",
                      border: "1px solid #4a1a1a",
                      borderRadius: "0 0 8px 8px",
                      padding: "12px",
                      marginTop: "0"
                    }}>
                      <div style={{ fontSize: "10px", color: "#8B2222", fontWeight: "bold", marginBottom: "6px" }}>
                        Theoretical Reason Blocked:
                      </div>
                      <div style={{ fontSize: "10px", lineHeight: 1.6, color: "#9a7a7a", fontStyle: "italic" }}>
                        {door.theoreticalBlock}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Antinomy Display */}
          <div style={{ marginTop: "32px", padding: "20px", background: "#0f0820", border: "1px solid #2a1a3a", borderRadius: "8px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#6B4C9A", marginBottom: "12px", textTransform: "uppercase" }}>
              The Antinomy of Practical Reason
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px", padding: "14px", background: "#120a1e", border: "1px solid #3a2a5a", borderRadius: "6px" }}>
                <div style={{ fontSize: "11px", color: "#8B2222", marginBottom: "6px", letterSpacing: "1px" }}>THE COMMAND</div>
                <div style={{ fontSize: "12px", color: "#c4b5d8", lineHeight: 1.6 }}>
                  The moral law commands pursuit of the <em>summum bonum</em> — perfect virtue crowned with happiness proportionate to it.
                </div>
              </div>
              <div style={{ flex: 1, minWidth: "200px", padding: "14px", background: "#120a1e", border: "1px solid #3a2a5a", borderRadius: "6px" }}>
                <div style={{ fontSize: "11px", color: "#8B5522", marginBottom: "6px", letterSpacing: "1px" }}>THE IMPOSSIBILITY</div>
                <div style={{ fontSize: "12px", color: "#c4b5d8", lineHeight: 1.6 }}>
                  Finite beings cannot achieve perfect virtue. Nature does not reward virtue with happiness. The goal seems self-defeating.
                </div>
              </div>
              <div style={{ flex: 1, minWidth: "200px", padding: "14px", background: "#120a1e", border: `1px solid ${mode === "practical" ? "#4a2a7a" : "#3a2a5a"}`, borderRadius: "6px" }}>
                <div style={{ fontSize: "11px", color: mode === "practical" ? "#6B4C9A" : "#3a2a5a", marginBottom: "6px", letterSpacing: "1px", transition: "color 0.4s" }}>
                  THE RESOLUTION
                </div>
                <div style={{ fontSize: "12px", color: mode === "practical" ? "#c4b5d8" : "#5a4a6a", lineHeight: 1.6, transition: "color 0.4s" }}>
                  {mode === "practical"
                    ? "Postulate the three conditions that make the highest good achievable: freedom, immortality, and God."
                    : "Theoretical reason cannot resolve this — switch to Practical Faith mode to see the resolution."}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(107,76,154,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 24, marginTop: 24 }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#6B4C9A", marginBottom: "14px", textTransform: "uppercase" }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: hoveredConcept ? "16px" : "0" }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#6B4C9A" : "rgba(107,76,154,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#9B7BC7" : "rgba(107,76,154,0.35)"}`,
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#9B7BC7",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(107,76,154,0.08)", border: "1px solid rgba(107,76,154,0.3)", borderRadius: "6px", padding: "16px 20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", color: "#6B4C9A", marginBottom: "8px" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.75", color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "#0f0820",
          border: "1px solid #2a1a3a",
          borderLeft: "4px solid #4a2a6a",
          borderRadius: "8px",
          padding: "24px 28px",
          marginBottom: "24px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#4a2a6a", marginBottom: "12px" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: "15px", color: "#c4b5d8" }}>
            The postulates resolve the moral antinomy, but they open a profound philosophical wound. Kant spent much of the first <em>Critique</em> demonstrating that theoretical reason cannot reach God, immortality, or transcendental freedom — these lie beyond the limits of possible experience. Yet practical reason now seemingly reaches the same destinations through a different door. Critics immediately pressed: is the distinction between "theoretical impossibility" and "practical necessity" coherent, or is it merely a sophisticated way of smuggling the condemned metaphysics back in through a moral window?
          </p>
          <p style={{ margin: "0 0 14px 0", lineHeight: 1.8, fontSize: "15px", color: "#c4b5d8" }}>
            The deeper tension is that the postulates depend on the coherence of the highest good as a moral command — but some argue that demanding the union of virtue and happiness already assumes a kind of metaphysical worldview that pure morality should not require. If morality is genuinely unconditional, why does it need cosmic backing to remain rational?
          </p>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "14px", color: "#8B6BB7", fontStyle: "italic" }}>
            This pressure forces the next development: the critique of practical reason must be completed by examining how judgment applies the moral law to the concrete conditions of human life — how do we recognize what the duty actually demands in particular situations, and what is the nature of moral community among rational beings?
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0f0820",
          border: "1px solid #2a1a3a",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              padding: "18px 24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
              color: "#9B7BC7"
            }}
          >
            <span style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>Real-World Echoes</span>
            {echosOpen ? <ChevronUp size={16} color="#6B4C9A" /> : <ChevronDown size={16} color="#6B4C9A" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #2a1a3a" }}>
              <div style={{ marginTop: "20px" }}>
                <div style={{ padding: "18px", background: "#120a1e", border: "1px solid #3a2a5a", borderRadius: "6px", marginBottom: "14px" }}>
                  <div style={{ fontSize: "13px", color: "#9B7BC7", marginBottom: "8px", fontWeight: "bold" }}>
                    Liberal Protestant Theology
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#b8a8cc", lineHeight: 1.7 }}>
                    Nineteenth-century theologians like Albrecht Ritschl and Adolf von Harnack drew directly on Kantian moral foundations to reconstruct religious faith after the demolition of traditional metaphysical proofs. Instead of arguing for God's existence through cosmological arguments, they grounded faith in the moral experience of humanity — precisely Kant's move. This shaped liberal Protestantism's emphasis on ethics over doctrine and remains influential in religious thought that prioritizes moral commitment over creedal assertion.
                  </p>
                </div>
                <div style={{ padding: "18px", background: "#120a1e", border: "1px solid #3a2a5a", borderRadius: "6px" }}>
                  <div style={{ fontSize: "13px", color: "#9B7BC7", marginBottom: "8px", fontWeight: "bold" }}>
                    Human Rights Declarations and Practical Faith
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#b8a8cc", lineHeight: 1.7 }}>
                    The Universal Declaration of Human Rights (1948) and subsequent international rights frameworks operate on something structurally similar to Kantian practical postulation. The universality of human dignity and rights cannot be theoretically proved in any strict empirical sense — yet global governance proceeds as if these claims were certain, because moral commitment requires it. The declaration functions as a practical postulate: not theoretical knowledge, but rational necessity for moral and political coherence on a global scale.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px", fontSize: "11px", color: "#3a2a5a" }}>
          Part 13 of 21 — Postulates of Practical Reason
        </div>
      </div>
    </div>
  );
}

// ─── Part 14: The Critique of Judgment: Bridging Nature and Freedom ───
function CritiqueOfJudgmentBridgingNatureFreedom() {
  const [islandRisen, setIslandRisen] = useState(false);
  const [bridgesExtended, setBridgesExtended] = useState(false);
  const [hoveredBridge, setHoveredBridge] = useState(null);
  const [hoveredIsland, setHoveredIsland] = useState(null);
  const [zoomedOut, setZoomedOut] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [islandY, setIslandY] = useState(120);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  const concepts = [
    { id: "reflective", label: "Reflective Judgment", desc: "Unlike determinant judgment (which subsumes particulars under a given universal), reflective judgment must find or create the universal for a given particular. It operates freely, guided only by its own a priori principle of purposiveness." },
    { id: "determinant", label: "Determinant Judgment", desc: "Determinant judgment applies a known universal rule to a particular case — the standard mode of cognition in the first Critique. Nature gives us the universal; we subsume particulars beneath it." },
    { id: "purposiveness", label: "Purposiveness of Nature", desc: "We cannot help but approach organisms and beautiful objects as if they were designed for a purpose. This is not a metaphysical claim about design, but a regulative principle of how our minds must approach certain phenomena." },
    { id: "regulative", label: "Regulative Principle", desc: "A regulative principle tells us how to investigate — not what things are (constitutive). We must act as if nature is purposive to study organisms and appreciate beauty, but this does not mean nature actually has purposes." },
    { id: "aesthetic", label: "Aesthetic Judgment", desc: "When we find something beautiful, we experience a free harmonious play of imagination and understanding. The object seems purposively structured for our cognitive faculties, yet we cannot specify any particular purpose." },
    { id: "teleological", label: "Teleological Judgment", desc: "In a living organism, every part exists for the sake of every other part. This circular causality cannot be explained by mechanical science alone — we must think the organism teleologically, as a natural purpose." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Ocean waves
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const baseY = H * 0.55 + layer * 18;
        const amp = 6 - layer;
        const freq = 0.015 + layer * 0.003;
        const phase = timeRef.current * (0.4 + layer * 0.1);
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= W; x += 4) {
          ctx.lineTo(x, baseY + Math.sin(x * freq + phase) * amp);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        const alpha = 0.12 + layer * 0.05;
        ctx.fillStyle = `#1a4d6e${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }

      // Particles (sea foam / mist)
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#a8d5b5${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleRiseIsland = () => {
    if (animating) return;
    setAnimating(true);
    setIslandRisen(false);
    setBridgesExtended(false);
    setIslandY(120);
    let y = 120;
    const targetY = 0;
    const step = () => {
      y -= 2.5;
      setIslandY(y);
      if (y > targetY) {
        requestAnimationFrame(step);
      } else {
        setIslandRisen(true);
        setTimeout(() => {
          setBridgesExtended(true);
          setAnimating(false);
        }, 600);
      }
    };
    requestAnimationFrame(step);
  };

  const islandOffset = islandRisen ? 0 : islandY;

  const bridgeInfo = {
    aesthetic: {
      label: "Aesthetic Bridge",
      color: "#e8a838",
      desc: "The experience of beauty — finding natural and artistic forms harmoniously suited to our cognitive faculties — bridges nature and freedom by revealing that nature is not merely mechanical but resonant with human sensibility and moral feeling.",
    },
    teleological: {
      label: "Teleological Bridge",
      color: "#4fc38a",
      desc: "The study of living organisms — which cannot be understood through mechanical causation alone — bridges nature and freedom by showing that nature organizes itself according to purposive principles that parallel moral self-legislation.",
    },
  };

  const islandInfo = {
    nature: {
      label: "Nature Island",
      color: "#4a9cc7",
      desc: "The realm of mechanical causation, governed by natural law. Explored in the Critique of Pure Reason — phenomena are subject to the categories of understanding, especially efficient cause and effect.",
    },
    freedom: {
      label: "Freedom Island",
      color: "#b07fd4",
      desc: "The realm of moral action, governed by the categorical imperative. Explored in the Critique of Practical Reason — rational agents legislate universal moral law to themselves, acting freely beyond nature.",
    },
    judgment: {
      label: "Judgment Island",
      color: "#2A7D4F",
      desc: "The realm of reflective judgment, governed by purposiveness. Explored in the Critique of Judgment — beauty, sublimity, and organisms reveal a harmony between nature and our cognitive and moral capacities.",
    },
  };

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      background: "radial-gradient(ellipse at 40% 30%, #0d2e1a 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "32px 24px",
      color: "#e8e4dc",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 12, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#2A7D4F", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Part 14 of 21 · Kant's Critical Philosophy</div>
          <h1 style={{ fontSize: 28, fontWeight: "bold", margin: "0 0 8px", color: "#f0ece4", lineHeight: 1.3 }}>The Critique of Judgment: Bridging Nature and Freedom</h1>
          <p style={{ fontSize: 15, color: "#9ab5a0", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            The third Critique discovered that reflective judgment — operating through the principle of natural purposiveness — mediates between the theoretical and practical domains Kant had established.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#0f1a13cc",
          border: "1px solid #1a3a24",
          borderLeft: "4px solid #2A7D4F",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#2A7D4F", marginBottom: 12, fontWeight: "bold" }}>The Problem</div>
          <p style={{ margin: 0, lineHeight: 1.8, color: "#ccc9be", fontSize: 15 }}>
            The first two critiques established nature and freedom as separate realms governed by different principles — but free moral action must occur within nature. How can the free moral agent actually act in and on a natural world that operates by purely mechanical laws? How do the two realms connect? After completing his accounts of natural knowledge and moral reason, Kant faced an abyss: a rational being who is also a natural creature seemed to inhabit two entirely incompatible worlds simultaneously — a crisis demanding resolution.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0c1f12cc",
          border: "1px solid #1e3d28",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#2A7D4F", marginBottom: 20, fontWeight: "bold" }}>The Archipelago of Critique</div>

          {/* Canvas background */}
          <div style={{ position: "relative", marginBottom: 24 }}>
            <canvas ref={canvasRef} width={800} height={280} style={{ width: "100%", height: 280, borderRadius: 8, display: "block" }} />

            {/* SVG islands overlay */}
            <svg viewBox="0 0 800 280" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>

              {/* Ocean label */}
              <text x="400" y="210" textAnchor="middle" fill="#5a8fa8" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.7">The Gap — separating natural mechanism from moral freedom</text>

              {/* NATURE ISLAND */}
              <g
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIsland("nature")}
                onMouseLeave={() => setHoveredIsland(null)}
              >
                <ellipse cx="135" cy="165" rx="105" ry="48" fill="#0d2a3d" stroke={hoveredIsland === "nature" ? "#4a9cc7" : "#1e4a6a"} strokeWidth={hoveredIsland === "nature" ? 2.5 : 1.5} />
                <ellipse cx="135" cy="160" rx="100" ry="44" fill="#112e42" />
                {/* Gear icon */}
                <text x="80" y="150" fill="#4a9cc7" fontSize="22" fontFamily="Georgia, serif">⚙</text>
                <text x="130" y="148" fill="#4a9cc7" fontSize="16" fontFamily="Georgia, serif">⚙</text>
                <text x="165" y="158" fill="#4a9cc7" fontSize="12" fontFamily="Georgia, serif">⚙</text>
                {/* Labels */}
                <text x="135" y="172" textAnchor="middle" fill="#4a9cc7" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Nature Island</text>
                <text x="135" y="187" textAnchor="middle" fill="#8ab8cc" fontSize="10" fontFamily="Georgia, serif">Mechanical Causation</text>
                <text x="135" y="199" textAnchor="middle" fill="#6a9db5" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Critique of Pure Reason</text>
                {hoveredIsland === "nature" && (
                  <ellipse cx="135" cy="165" rx="105" ry="48" fill="none" stroke="#4a9cc7" strokeWidth="1" opacity="0.4">
                    <animate attributeName="rx" values="105;115;105" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="ry" values="48;54;48" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
                  </ellipse>
                )}
              </g>

              {/* FREEDOM ISLAND */}
              <g
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIsland("freedom")}
                onMouseLeave={() => setHoveredIsland(null)}
              >
                <ellipse cx="665" cy="165" rx="105" ry="48" fill="#1a0d2e" stroke={hoveredIsland === "freedom" ? "#b07fd4" : "#3d1e6a"} strokeWidth={hoveredIsland === "freedom" ? 2.5 : 1.5} />
                <ellipse cx="665" cy="160" rx="100" ry="44" fill="#1e1135" />
                <text x="615" y="152" fill="#b07fd4" fontSize="18" fontFamily="Georgia, serif">★</text>
                <text x="645" y="145" fill="#b07fd4" fontSize="22" fontFamily="Georgia, serif">⚖</text>
                <text x="690" y="155" fill="#b07fd4" fontSize="16" fontFamily="Georgia, serif">✦</text>
                <text x="665" y="172" textAnchor="middle" fill="#b07fd4" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Freedom Island</text>
                <text x="665" y="187" textAnchor="middle" fill="#c0a0d8" fontSize="10" fontFamily="Georgia, serif">Moral Self-Legislation</text>
                <text x="665" y="199" textAnchor="middle" fill="#a080c0" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Critique of Practical Reason</text>
                {hoveredIsland === "freedom" && (
                  <ellipse cx="665" cy="165" rx="105" ry="48" fill="none" stroke="#b07fd4" strokeWidth="1" opacity="0.4">
                    <animate attributeName="rx" values="105;115;105" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="ry" values="48;54;48" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
                  </ellipse>
                )}
              </g>

              {/* JUDGMENT ISLAND — rises from sea */}
              <g transform={`translate(0, ${islandRisen ? 0 : islandOffset})`} style={{ transition: "none" }}>
                {islandRisen && (
                  <>
                    {/* Aesthetic Bridge (left) */}
                    <g
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredBridge("aesthetic")}
                      onMouseLeave={() => setHoveredBridge(null)}
                    >
                      <path
                        d={bridgesExtended ? "M 240 155 Q 310 130 375 150" : "M 375 150 Q 375 150 375 150"}
                        stroke={hoveredBridge === "aesthetic" ? "#e8c860" : "#c8a030"}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={bridgesExtended ? "none" : "4 4"}
                        style={{ transition: "d 0.8s ease" }}
                      />
                      <path
                        d={bridgesExtended ? "M 240 162 Q 310 140 375 158" : "M 375 158 Q 375 158 375 158"}
                        stroke={hoveredBridge === "aesthetic" ? "#e8c860aa" : "#c8a03066"}
                        strokeWidth="3"
                        fill="none"
                      />
                      {bridgesExtended && (
                        <text x="295" y="130" textAnchor="middle" fill="#e8c860" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold">Aesthetic Bridge</text>
                      )}
                    </g>

                    {/* Teleological Bridge (right) */}
                    <g
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredBridge("teleological")}
                      onMouseLeave={() => setHoveredBridge(null)}
                    >
                      <path
                        d={bridgesExtended ? "M 425 150 Q 490 130 560 155" : "M 425 150 Q 425 150 425 150"}
                        stroke={hoveredBridge === "teleological" ? "#6de0a0" : "#2A7D4F"}
                        strokeWidth="6"
                        fill="none"
                        style={{ transition: "d 0.8s ease" }}
                      />
                      <path
                        d={bridgesExtended ? "M 425 158 Q 490 140 560 162" : "M 425 158 Q 425 158 425 158"}
                        stroke={hoveredBridge === "teleological" ? "#6de0a066" : "#2A7D4F44"}
                        strokeWidth="3"
                        fill="none"
                      />
                      {bridgesExtended && (
                        <text x="497" y="128" textAnchor="middle" fill="#4fc38a" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold">Teleological Bridge</text>
                      )}
                    </g>
                  </>
                )}

                {/* Island body */}
                <ellipse cx="400" cy="155" rx="90" ry="42" fill="#0a2010" stroke={hoveredIsland === "judgment" ? "#2A7D4F" : (islandRisen ? "#2A7D4F" : "#1a5030")} strokeWidth={islandRisen ? 2 : 1} />
                <ellipse cx="400" cy="150" rx="85" ry="38" fill="#0f2e18" />

                {/* Flowers and organic shapes */}
                {islandRisen && (
                  <>
                    <text x="360" y="142" fill="#a8e060" fontSize="16" fontFamily="Georgia, serif">✿</text>
                    <text x="390" y="138" fill="#e8c040" fontSize="14" fontFamily="Georgia, serif">✾</text>
                    <text x="418" y="143" fill="#60d880" fontSize="12" fontFamily="Georgia, serif">❀</text>
                    <text x="375" y="158" fill="#c8e890" fontSize="10" fontFamily="Georgia, serif">🌿</text>
                    <text x="405" y="155" fill="#a8d860" fontSize="10" fontFamily="Georgia, serif">✦</text>
                  </>
                )}

                <text x="400" y="168" textAnchor="middle" fill={islandRisen ? "#4fc38a" : "#2a6040"} fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">
                  {islandRisen ? "Judgment Island" : "..."}
                </text>
                {islandRisen && (
                  <>
                    <text x="400" y="182" textAnchor="middle" fill="#8ad4aa" fontSize="10" fontFamily="Georgia, serif">Purposive Harmony</text>
                    <text x="400" y="194" textAnchor="middle" fill="#5a9a78" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Critique of Judgment</text>
                  </>
                )}

                {/* Ripples if not yet risen */}
                {!islandRisen && (
                  <>
                    <ellipse cx="400" cy="170" rx="50" ry="12" fill="none" stroke="#2A7D4F" strokeWidth="1" opacity="0.3" />
                    <ellipse cx="400" cy="170" rx="70" ry="18" fill="none" stroke="#2A7D4F" strokeWidth="0.5" opacity="0.15" />
                  </>
                )}
              </g>

            </svg>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <button
              onClick={handleRiseIsland}
              disabled={animating}
              style={{
                background: animating ? "#1a3a24" : "#1a3a24",
                border: `1px solid ${animating ? "#2A7D4F66" : "#2A7D4F"}`,
                borderRadius: 6,
                padding: "10px 20px",
                color: animating ? "#5a8a68" : "#4fc38a",
                fontFamily: "Georgia, serif",
                fontSize: 13,
                cursor: animating ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!animating) e.target.style.background = "#254f32"; }}
              onMouseLeave={e => { e.target.style.background = "#1a3a24"; }}
            >
              {islandRisen ? "▶ Re-rise Judgment Island" : "▶ Rise, Judgment Island"}
            </button>
            <div style={{ fontSize: 12, color: "#6a8a76", padding: "10px 4px", fontStyle: "italic" }}>
              {!islandRisen ? "Watch the third Critique emerge to bridge the gap..." : bridgesExtended ? "Hover over the bridges to explore the two types of judgment" : "Bridges extending..."}
            </div>
          </div>

          {/* Bridge info panel */}
          {hoveredBridge && (
            <div style={{
              background: "#0c2016dd",
              border: `1px solid ${bridgeInfo[hoveredBridge].color}55`,
              borderLeft: `4px solid ${bridgeInfo[hoveredBridge].color}`,
              borderRadius: 8,
              padding: "16px 20px",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: bridgeInfo[hoveredBridge].color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontWeight: "bold" }}>{bridgeInfo[hoveredBridge].label}</div>
              <p style={{ margin: 0, color: "#c0ccc4", fontSize: 14, lineHeight: 1.7 }}>{bridgeInfo[hoveredBridge].desc}</p>
            </div>
          )}

          {/* Island info panel */}
          {hoveredIsland && !hoveredBridge && (
            <div style={{
              background: "#0c1820dd",
              border: `1px solid ${islandInfo[hoveredIsland].color}55`,
              borderLeft: `4px solid ${islandInfo[hoveredIsland].color}`,
              borderRadius: 8,
              padding: "16px 20px",
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 11, color: islandInfo[hoveredIsland].color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontWeight: "bold" }}>{islandInfo[hoveredIsland].label}</div>
              <p style={{ margin: 0, color: "#c0ccc4", fontSize: 14, lineHeight: 1.7 }}>{islandInfo[hoveredIsland].desc}</p>
            </div>
          )}

          {/* Core Argument */}
          <div style={{
            marginTop: 24,
            background: "#081a10cc",
            border: "1px solid #1a3420",
            borderRadius: 8,
            padding: "20px 22px",
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#4a8a60", marginBottom: 12 }}>The Core Argument</div>
            <p style={{ margin: 0, color: "#b8d4c4", fontSize: 14, lineHeight: 1.8 }}>
              After two critiques, an enormous gap remained between nature (governed by mechanical causation) and freedom (governing moral action). Kant discovered that a third faculty — reflective judgment — bridges this gap by approaching certain natural phenomena as if they were purposive, without claiming they actually have purposes. This principle is not constitutive, telling us what things are, but regulative, guiding how we investigate and respond to them. The third Critique completes the system by showing that nature, properly understood, points beyond itself toward super-sensible ideas — and that being both a natural creature and a free moral agent need not be a contradiction.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(42,125,79,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28, marginTop: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2A7D4F", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#2A7D4F" : "rgba(42,125,79,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#4fc38a" : "rgba(42,125,79,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#5a9a70",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(42,125,79,0.08)", border: "1px solid rgba(42,125,79,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#2A7D4F", marginBottom: 8 }}>
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
          background: "#0f1520cc",
          border: "1px solid #1e2a3a",
          borderLeft: "4px solid #4a7ab0",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#4a7ab0", marginBottom: 12, fontWeight: "bold" }}>The Difficulty</div>
          <p style={{ margin: "0 0 12px", lineHeight: 1.8, color: "#c0c4cc", fontSize: 15 }}>
            Introducing purposiveness as a regulative principle immediately raises new and difficult questions. What precisely are aesthetic and teleological judgment? Is beauty merely subjective — a pleasant feeling — or does it carry genuine universal validity? How do organisms differ from machines if both are complex arrangements of parts? And how exactly does the feeling of purposive harmony in beautiful nature connect to moral life and the supersensible?
          </p>
          <p style={{ margin: 0, lineHeight: 1.8, color: "#9098a8", fontSize: 14, fontStyle: "italic" }}>
            This pressure forces the next development: a detailed investigation of the two halves of the third Critique — the Critique of Aesthetic Judgment and the Critique of Teleological Judgment — each demanding its own close analysis of how purposiveness manifests in beauty, sublimity, and living nature.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "#0c1810cc",
          border: "1px solid #1a3020",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 12,
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
              color: "#6ab888",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: "bold" }}>Real-World Echoes</span>
            {echosOpen ? <ChevronUp size={18} color="#2A7D4F" /> : <ChevronDown size={18} color="#2A7D4F" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "4px 24px 24px" }}>
              <div style={{
                background: "#0a1e10",
                border: "1px solid #1a3420",
                borderRadius: 8,
                padding: "18px 20px",
                marginBottom: 14,
              }}>
                <div style={{ fontSize: 12, color: "#2A7D4F", marginBottom: 8, fontWeight: "bold" }}>Darwin and Teleological Analysis</div>
                <p style={{ margin: 0, color: "#a8c4b0", fontSize: 14, lineHeight: 1.75 }}>
                  Darwin acknowledged Kant's teleological analysis of organisms as genuinely relevant to his theory of natural selection. The very problem Kant identified — that organisms seem purposively organized in ways mechanical science alone cannot capture — drove Darwin toward a mechanism that could produce apparent purposiveness without design. The regulative necessity Kant described turned out to point toward a real natural process.
                </p>
              </div>
              <div style={{
                background: "#0a1e10",
                border: "1px solid #1a3420",
                borderRadius: 8,
                padding: "18px 20px",
              }}>
                <div style={{ fontSize: 12, color: "#2A7D4F", marginBottom: 8, fontWeight: "bold" }}>Contemporary Systems Biology</div>
                <p style={{ margin: 0, color: "#a8c4b0", fontSize: 14, lineHeight: 1.75 }}>
                  Systems biology employs concepts of circular causality, self-organization, and emergent function that closely parallel Kant's analysis of organisms as natural purposes. When biologists describe how metabolic networks maintain themselves through reciprocal causal relationships — where the whole both produces and is produced by its parts — they are using a framework whose philosophical foundations Kant explored over two centuries earlier.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 15: Aesthetic Judgment and the Beautiful ───
function AestheticJudgmentBeautiful() {
  const [selectedObject, setSelectedObject] = useState(0);
  const [beautyMode, setBeautyMode] = useState("free");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [hoveredMoment, setHoveredMoment] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const aestheticKeyConcepts = [
    { id: "free_play", label: "Free Play of Faculties", desc: "The distinctive state of mind in aesthetic experience: imagination and understanding engage each other without either one dominating. The imagination does not merely illustrate a concept, nor does the understanding merely classify a sensation — they play together freely, generating the feeling of beauty. This free play is what makes aesthetic experience irreducible to either pure sensation or pure cognition." },
    { id: "universal_communicability", label: "Universal Communicability", desc: "The defining mark of genuine aesthetic judgment: when we call something beautiful, we implicitly demand that all other rational beings agree, not as a matter of logic but of feeling. This claim to universal assent distinguishes beauty from the merely agreeable (which is subjective) and from the good (which is universal but conceptually grounded). The demand for agreement is what makes disputes about beauty meaningful rather than merely expressing preference." },
    { id: "disinterested_pleasure", label: "Disinterested Pleasure", desc: "Aesthetic pleasure in beauty is independent of any interest in the object's existence, usefulness, or moral goodness. We do not want to possess, consume, or use the beautiful object — we simply contemplate its form with pleasure. This disinterestedness distinguishes beauty from the agreeable (which pleases through desire) and from the morally good (which pleases through rational respect)." },
    { id: "sensus_communis", label: "Sensus Communis", desc: "Kant's term for the common sense — not an ordinary empirical faculty but a supposed shared standard of feeling that aesthetic judgment presupposes. When we judge something beautiful, we assume a community of feeling among all rational beings that is not based on any shared concept. The sensus communis is what makes the universal demand in aesthetic judgment coherent rather than arbitrary." },
    { id: "taste", label: "Taste as Aesthetic Judgment", desc: "For Kant, taste is the faculty for judging the beautiful — distinct from sensation, cognition, or moral feeling. A judgment of taste is singular (it concerns this object) yet claims universal validity, is disinterested yet bound up with pleasure, and demands agreement while resisting proof by concepts. This unique structure makes taste philosophically puzzling and, for Kant, philosophically profound." },
  ];

  const objects = [
    {
      name: "Abstract Pattern",
      emoji: "✦",
      type: "free",
      description: "A pure geometric arabesque — no function, no concept, just form.",
      moments: { disinterest: 95, universality: 85, purposiveness: 90, necessity: 80 },
      beautiful: true,
      adherentNote: null
    },
    {
      name: "Mountain Landscape",
      emoji: "⛰",
      type: "free",
      description: "A sweeping vista of peaks and valleys — nature's form without imposed purpose.",
      moments: { disinterest: 90, universality: 88, purposiveness: 85, necessity: 82 },
      beautiful: true,
      adherentNote: null
    },
    {
      name: "Ornate Chair",
      emoji: "🪑",
      type: "adherent",
      description: "A beautifully carved chair — judged partly against its concept as seating.",
      moments: { disinterest: 60, universality: 65, purposiveness: 70, necessity: 60 },
      beautiful: false,
      adherentNote: "Adherent beauty: judged partly by function — the concept of 'chair' constrains free play."
    },
    {
      name: "Wild Flower",
      emoji: "✿",
      type: "free",
      description: "A blossoming wildflower — appreciated without reference to its biological role.",
      moments: { disinterest: 97, universality: 90, purposiveness: 93, necessity: 88 },
      beautiful: true,
      adherentNote: null
    },
    {
      name: "Cathedral",
      emoji: "⛪",
      type: "adherent",
      description: "Gothic architecture — magnificent, yet judged against its sacred purpose.",
      moments: { disinterest: 55, universality: 70, purposiveness: 75, necessity: 65 },
      beautiful: false,
      adherentNote: "Adherent beauty: the building's religious purpose shapes how we judge its form."
    },
    {
      name: "Utility Chair",
      emoji: "🪑",
      type: "useful",
      description: "A plain functional chair — evaluated entirely by comfort and utility.",
      moments: { disinterest: 10, universality: 20, purposiveness: 15, necessity: 10 },
      beautiful: false,
      adherentNote: "Merely agreeable or useful — desire and function dominate, no free play."
    }
  ];

  const moments = [
    {
      key: "disinterest",
      label: "Disinterestedness",
      kantLabel: "Quality",
      color: "#D4A017",
      description: "The pleasure taken in beauty is independent of desire, utility, or personal interest. We do not want to possess or use the beautiful object — we simply contemplate it. This separates aesthetic from sensory or moral pleasure."
    },
    {
      key: "universality",
      label: "Subjective Universality",
      kantLabel: "Quantity",
      color: "#C4801A",
      description: "When we call something beautiful, we implicitly demand that everyone agree — yet without invoking any concept or proof. 'This is beautiful' carries a claim unlike 'I enjoy this.' This universality is subjective: felt, not derived."
    },
    {
      key: "purposiveness",
      label: "Purposiveness Without Purpose",
      kantLabel: "Relation",
      color: "#A06020",
      description: "Beautiful objects appear as if designed — they seem to have an internal harmony — yet no specific purpose can be named. The form strikes us as purposive without our being able to identify what purpose it serves."
    },
    {
      key: "necessity",
      label: "Exemplary Necessity",
      kantLabel: "Modality",
      color: "#8A5010",
      description: "Aesthetic judgment carries a kind of necessity — not logical proof, but the demand that any properly attentive person would agree. The beautiful object serves as an example of what all humans, sharing the same cognitive structure, should find harmonious."
    }
  ];

  const currentObj = objects[selectedObject];
  const isFullyBeautiful = beautyMode === "free"
    ? (currentObj.type === "free" && currentObj.beautiful)
    : currentObj.beautiful;

  const displayMoments = beautyMode === "free" && currentObj.type !== "free"
    ? { disinterest: currentObj.moments.disinterest * 0.7, universality: currentObj.moments.universality * 0.75, purposiveness: currentObj.moments.purposiveness * 0.8, necessity: currentObj.moments.necessity * 0.75 }
    : currentObj.moments;

  const allHigh = Object.values(displayMoments).every(v => v >= 75);

  useEffect(() => {
    if (allHigh) {
      setAnimating(true);
      const t = setTimeout(() => setGlowActive(true), 300);
      return () => clearTimeout(t);
    } else {
      setAnimating(false);
      setGlowActive(false);
    }
  }, [selectedObject, beautyMode, allHigh]);

  const GaugeMeter = ({ value, color, size = 80 }) => {
    const radius = size / 2 - 8;
    const circumference = 2 * Math.PI * radius;
    const filled = (value / 100) * circumference;
    const angle = -Math.PI / 2 + (value / 100) * 2 * Math.PI;
    const x = size / 2 + radius * Math.cos(angle);
    const y = size / 2 + radius * Math.sin(angle);

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#1a1a1a" strokeWidth={6}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text
          x={size / 2} y={size / 2 + 5}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.2}
          fontFamily="Georgia, serif"
          fontWeight="bold"
        >
          {Math.round(value)}
        </text>
      </svg>
    );
  };

  const ComparisonPanel = ({ obj, label }) => (
    <div style={{
      flex: 1,
      background: "#0d0d15",
      border: `1px solid #2a2a35`,
      borderRadius: 12,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }}>
      <div style={{ fontSize: 14, color: "#888", fontFamily: "Georgia, serif", letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 48 }}>{obj.emoji}</div>
      <div style={{ fontSize: 16, color: "#D4A017", fontFamily: "Georgia, serif", fontWeight: "bold" }}>{obj.name}</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {moments.map(m => (
          <div key={m.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <GaugeMeter value={obj.moments[m.key]} color={m.color} size={64} />
            <div style={{ fontSize: 10, color: "#aaa", fontFamily: "Georgia, serif", textAlign: "center", maxWidth: 64 }}>{m.label.split(" ")[0]}</div>
          </div>
        ))}
      </div>
      {obj.adherentNote && (
        <div style={{ fontSize: 12, color: "#C4801A", fontFamily: "Georgia, serif", fontStyle: "italic", textAlign: "center", marginTop: 8, lineHeight: 1.6 }}>
          {obj.adherentNote}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #2a1a00 0%, #0a0a0f 70%)",
      fontFamily: "Georgia, serif",
      padding: "32px 24px",
      color: "#e8e0d0"
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, color: "#D4A017", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>
          Part 15 of 21 — Kant's Critical Philosophy
        </div>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#f5e6c8", margin: "0 0 8px 0", lineHeight: 1.3 }}>
          Aesthetic Judgment and the Beautiful
        </h1>
        <p style={{ fontSize: 15, color: "#bbb", maxWidth: 640, margin: "0 auto", lineHeight: 1.7, fontStyle: "italic" }}>
          Beauty is neither an objective property nor a mere subjective preference but a universally communicable feeling arising from the harmonious free play of imagination and understanding.
        </p>
      </div>

      {/* Problem Panel */}
      <div style={{
        background: "#0d0d15",
        border: "1px solid #1e1e28",
        borderLeft: "4px solid #D4A017",
        borderRadius: 10,
        padding: "24px 28px",
        marginBottom: 28,
        maxWidth: 860,
        margin: "0 auto 28px auto"
      }}>
        <div style={{ fontSize: 11, color: "#D4A017", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>
          The Problem
        </div>
        <p style={{ fontSize: 15, color: "#c8bfaf", lineHeight: 1.8, margin: 0 }}>
          The third Critique promised a mediating principle between nature and freedom — but what precisely is the feeling of purposive harmony in aesthetic experience, and how can it be both subjectively felt and validly claimed for all rational beings without reducing to either mere personal preference or objective property? This is no academic puzzle: it cuts to the heart of whether beauty is something we share as rational beings or merely something each mind privately enjoys.
        </p>
      </div>

      {/* Main Visualization */}
      <div style={{
        background: "#0a0a12",
        border: "1px solid #2a2a35",
        borderRadius: 14,
        padding: 28,
        maxWidth: 860,
        margin: "0 auto 28px auto"
      }}>

        {/* Mode Toggles */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["free", "adherent"].map(mode => (
              <button
                key={mode}
                onClick={() => { setBeautyMode(mode); setComparisonMode(false); }}
                style={{
                  background: beautyMode === mode ? "#D4A017" : "#1a1a25",
                  color: beautyMode === mode ? "#000" : "#aaa",
                  border: `1px solid ${beautyMode === mode ? "#D4A017" : "#333"}`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontFamily: "Georgia, serif",
                  cursor: "pointer",
                  fontWeight: beautyMode === mode ? "bold" : "normal",
                  transition: "all 0.2s"
                }}
              >
                {mode === "free" ? "Free Beauty" : "Adherent Beauty"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            style={{
              background: comparisonMode ? "#C4801A" : "#1a1a25",
              color: comparisonMode ? "#000" : "#aaa",
              border: `1px solid ${comparisonMode ? "#C4801A" : "#333"}`,
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 13,
              fontFamily: "Georgia, serif",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {comparisonMode ? "Exit Comparison" : "Compare: Useful vs. Beautiful"}
          </button>
        </div>

        {comparisonMode ? (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <ComparisonPanel obj={objects[5]} label="Utilitarian Judgment" />
            <ComparisonPanel obj={objects[3]} label="Aesthetic Judgment" />
          </div>
        ) : (
          <>
            {/* Object Selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                Select an Object to Judge
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {objects.filter(o => beautyMode === "free" ? o.type !== "useful" : true).map((obj, i) => {
                  const idx = objects.indexOf(obj);
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedObject(idx)}
                      style={{
                        background: selectedObject === idx ? "#1e1808" : "#12121a",
                        border: `2px solid ${selectedObject === idx ? "#D4A017" : "#2a2a35"}`,
                        borderRadius: 10,
                        padding: "10px 16px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        transition: "all 0.2s",
                        minWidth: 80
                      }}
                    >
                      <span style={{ fontSize: 24 }}>{obj.emoji}</span>
                      <span style={{ fontSize: 11, color: selectedObject === idx ? "#D4A017" : "#888", fontFamily: "Georgia, serif" }}>
                        {obj.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Object Display */}
            <div style={{
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginBottom: 24
            }}>
              {/* Object card with potential golden halo */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                {glowActive && (
                  <div style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: 24,
                    background: "radial-gradient(ellipse, #D4A01755 0%, transparent 70%)",
                    boxShadow: "0 0 40px 20px #D4A01730",
                    animation: "pulse 2s ease-in-out infinite",
                    pointerEvents: "none"
                  }} />
                )}
                <div style={{
                  width: 120,
                  height: 120,
                  background: glowActive ? "#1e1808" : "#12121a",
                  border: `2px solid ${glowActive ? "#D4A017" : "#2a2a35"}`,
                  borderRadius: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.5s",
                  position: "relative"
                }}>
                  <span style={{ fontSize: 48 }}>{currentObj.emoji}</span>
                  {glowActive && (
                    <div style={{
                      position: "absolute",
                      bottom: -10,
                      background: "#D4A017",
                      color: "#000",
                      fontSize: 10,
                      fontFamily: "Georgia, serif",
                      fontWeight: "bold",
                      padding: "2px 8px",
                      borderRadius: 10,
                      letterSpacing: 1
                    }}>
                      BEAUTIFUL
                    </div>
                  )}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#f5e6c8", marginBottom: 6 }}>
                  {currentObj.name}
                </div>
                <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.7, margin: "0 0 12px 0" }}>
                  {currentObj.description}
                </p>
                {currentObj.adherentNote && beautyMode === "adherent" && (
                  <div style={{
                    background: "#1a1208",
                    border: "1px solid #C4801A",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    color: "#C4801A",
                    fontStyle: "italic",
                    lineHeight: 1.6
                  }}>
                    {currentObj.adherentNote}
                  </div>
                )}
                {glowActive && (
                  <div style={{
                    background: "#1a1500",
                    border: "1px solid #D4A017",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    color: "#D4A017",
                    lineHeight: 1.6,
                    marginTop: 8
                  }}>
                    All four moments align — this is a pure aesthetic judgment of beauty. Imagination and understanding are in free harmonious play.
                  </div>
                )}
              </div>
            </div>

            {/* Four Gauges */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16
            }}>
              {moments.map(m => (
                <div
                  key={m.key}
                  onMouseEnter={() => setHoveredMoment(m.key)}
                  onMouseLeave={() => setHoveredMoment(null)}
                  style={{
                    background: hoveredMoment === m.key ? "#14140e" : "#0d0d15",
                    border: `1px solid ${hoveredMoment === m.key ? m.color : "#1e1e28"}`,
                    borderRadius: 12,
                    padding: "16px 14px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: hoveredMoment === m.key ? `0 0 16px ${m.color}22` : "none"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ fontSize: 10, color: m.color, letterSpacing: 2, textTransform: "uppercase" }}>
                      {m.kantLabel}
                    </div>
                    <div style={{ fontSize: 13, color: "#e8e0d0", fontWeight: "bold", textAlign: "center" }}>
                      {m.label}
                    </div>
                  </div>

                  <GaugeMeter value={displayMoments[m.key]} color={m.color} size={80} />

                  {/* Bar indicator */}
                  <div style={{ width: "100%", height: 6, background: "#1a1a25", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${displayMoments[m.key]}%`,
                      background: m.color,
                      borderRadius: 3,
                      transition: "width 0.6s ease"
                    }} />
                  </div>

                  {hoveredMoment === m.key && (
                    <p style={{
                      fontSize: 12,
                      color: "#c8bfaf",
                      lineHeight: 1.7,
                      margin: 0,
                      textAlign: "center"
                    }}>
                      {m.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Cognitive Structure Diagram */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
                The Shared Cognitive Structure — How Subjective Universality is Possible
              </div>
              <svg width="100%" viewBox="0 0 500 140" style={{ maxWidth: 500, display: "block", margin: "0 auto" }}>
                {/* Object */}
                <rect x="10" y="50" width="80" height="40" rx="8" fill="#12121a" stroke="#2a2a35" strokeWidth="1.5" />
                <text x="50" y="68" textAnchor="middle" fill="#D4A017" fontSize="11" fontFamily="Georgia, serif">Beautiful</text>
                <text x="50" y="82" textAnchor="middle" fill="#D4A017" fontSize="11" fontFamily="Georgia, serif">Object</text>

                {/* Arrow to persons */}
                <line x1="90" y1="70" x2="160" y2="40" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="90" y1="70" x2="160" y2="70" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="90" y1="70" x2="160" y2="100" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="4,3" />

                {/* Person boxes */}
                {[25, 55, 85].map((y, i) => (
                  <g key={i}>
                    <rect x="160" y={y} width="100" height="30" rx="6" fill="#12121a" stroke="#2a2a35" strokeWidth="1" />
                    <text x="210" y={y + 12} textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="Georgia, serif">Imagination</text>
                    <text x="210" y={y + 23} textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="Georgia, serif">+ Understanding</text>
                  </g>
                ))}

                {/* Arrows to harmony */}
                <line x1="260" y1="40" x2="320" y2="65" stroke="#C4801A" strokeWidth="1.5" />
                <line x1="260" y1="70" x2="320" y2="70" stroke="#C4801A" strokeWidth="1.5" />
                <line x1="260" y1="100" x2="320" y2="75" stroke="#C4801A" strokeWidth="1.5" />

                {/* Harmony box */}
                <rect x="320" y="50" width="90" height="40" rx="8" fill="#1e1808" stroke="#D4A017" strokeWidth="2" />
                <text x="365" y="68" textAnchor="middle" fill="#D4A017" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Harmonious</text>
                <text x="365" y="82" textAnchor="middle" fill="#D4A017" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Free Play</text>

                {/* Arrow to claim */}
                <line x1="410" y1="70" x2="450" y2="70" stroke="#D4A017" strokeWidth="2" />
                <polygon points="450,65 460,70 450,75" fill="#D4A017" />

                <text x="470" y="65" textAnchor="middle" fill="#f5e6c8" fontSize="9" fontFamily="Georgia, serif">"This is</text>
                <text x="470" y="77" textAnchor="middle" fill="#f5e6c8" fontSize="9" fontFamily="Georgia, serif">beautiful"</text>

                {/* Shared structure label */}
                <text x="210" y="125" textAnchor="middle" fill="#666" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">
                  All humans share this cognitive structure
                </text>
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: 860, margin: "0 auto 24px auto" }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#D4A017", marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {aestheticKeyConcepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: "6px 14px",
                background: hoveredConcept === c.id ? "#D4A017" : "rgba(212,160,23,0.1)",
                border: `1px solid ${hoveredConcept === c.id ? "#e8c050" : "rgba(212,160,23,0.35)"}`,
                borderRadius: 20,
                fontSize: 12,
                cursor: "pointer",
                color: hoveredConcept === c.id ? "#f0ead8" : "#c4901a",
                transition: "all 0.2s",
                fontFamily: "Georgia, serif",
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{
            background: "rgba(212,160,23,0.08)",
            border: "1px solid rgba(212,160,23,0.3)",
            borderRadius: 6,
            padding: "16px 20px",
          }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: "#D4A017", marginBottom: 8 }}>
              {aestheticKeyConcepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
              {aestheticKeyConcepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
        </div>
      </div>

      {/* Difficulty Panel */}
      <div style={{
        background: "#0d0d15",
        border: "1px solid #1e1e28",
        borderLeft: "4px solid #8A5010",
        borderRadius: 10,
        padding: "24px 28px",
        marginBottom: 20,
        maxWidth: 860,
        margin: "0 auto 20px auto"
      }}>
        <div style={{ fontSize: 11, color: "#8A5010", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" }}>
          The Difficulty
        </div>
        <p style={{ fontSize: 15, color: "#c8bfaf", lineHeight: 1.8, margin: "0 0 12px 0" }}>
          Beautiful objects produce harmonious pleasure, but human beings also respond intensely to vast, overwhelming, or threatening natural phenomena — storms, mountain ranges, the infinite starry sky — that are far from harmonious. The experience of such phenomena is not pleasurable in the same way beauty is; it involves a kind of painful inadequacy that resolves into something greater. What kind of aesthetic experience is this? And what does it reveal about human nature that beauty, with all its achieved harmony, cannot reach?
        </p>
        <p style={{ fontSize: 14, color: "#8A5010", fontStyle: "italic", margin: 0, lineHeight: 1.7 }}>
          This pressure forces the next development: a reckoning with the Sublime, where the overwhelming exceeds all sensory harmony and forces reason itself to discover its own supersensible vocation.
        </p>
      </div>

      {/* Real-World Echoes */}
      <div style={{
        background: "#0d0d15",
        border: "1px solid #1e1e28",
        borderRadius: 10,
        maxWidth: 860,
        margin: "0 auto",
        overflow: "hidden"
      }}>
        <button
          onClick={() => setEchosOpen(!echosOpen)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "18px 28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#D4A017"
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
            Real-World Echoes
          </span>
          {echosOpen ? <ChevronUp size={18} color="#D4A017" /> : <ChevronDown size={18} color="#D4A017" />}
        </button>

        {echosOpen && (
          <div style={{ padding: "4px 28px 24px 28px" }}>
            <div style={{
              background: "#12121a",
              border: "1px solid #2a2a35",
              borderRadius: 10,
              padding: "18px 20px",
              marginBottom: 14
            }}>
              <div style={{ fontSize: 14, color: "#D4A017", fontWeight: "bold", marginBottom: 6 }}>
                The Wild Flower — Free Beauty in Nature
              </div>
              <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.7, margin: 0 }}>
                Kant's paradigm case of free beauty is the wildflower, appreciated without reference to its biological function as a reproductive organ or pollinator attractor. When we pause before it purely as form — its color, its symmetry, its delicate structure — we perform a disinterested contemplation that liberates the imagination to play freely with the understanding. The flower becomes a symbol of freedom: something that seems to follow its own inner law rather than any external determination.
              </p>
            </div>
            <div style={{
              background: "#12121a",
              border: "1px solid #2a2a35",
              borderRadius: 10,
              padding: "18px 20px"
            }}>
              <div style={{ fontSize: 14, color: "#D4A017", fontWeight: "bold", marginBottom: 6 }}>
                Cathedrals and Representational Art — Adherent Beauty
              </div>
              <p style={{ fontSize: 14, color: "#bbb", lineHeight: 1.7, margin: 0 }}>
                Gothic cathedrals and figurative paintings exemplify adherent beauty: their aesthetic judgment is inseparable from what they are for. When we admire a cathedral, we cannot fully set aside its sacred purpose — the soaring vault is beautiful partly because it evokes the reach toward the divine. Similarly, a portrait is judged partly against its concept as a likeness of a person. These are still aesthetic experiences, but they are constrained by conceptual purpose in ways that prevent fully free play — they achieve beauty through, not despite, their function.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Part 16: The Sublime and the Limits of Imagination ───
function SublimeLimitsOfImagination() {
  const [selectedScene, setSelectedScene] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, expanding, failing, rising
  const [imaginationScale, setImaginationScale] = useState(0);
  const [reasonScale, setReasonScale] = useState(0);
  const [moralMeter, setMoralMeter] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredScene, setHoveredScene] = useState(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  const scenes = [
    {
      name: "Starry Sky",
      type: "Mathematical Sublime",
      typeColor: "#7B5EA7",
      description: "Infinite space overwhelms our capacity to grasp cosmic scale — then reason grasps 'infinity' as a concept.",
      imaginationLabel: "Trying to comprehend infinite space...",
      reasonLabel: "Infinity · Supersensible Nature",
      bg: ["#0a0a1a", "#0d0a2a"],
      stars: true,
      symbol: "✦",
    },
    {
      name: "Volcanic Eruption",
      type: "Dynamical Sublime",
      typeColor: "#8B2020",
      description: "Volcanic force overwhelms our physical power — then moral dignity asserts our independence from nature.",
      imaginationLabel: "Physical power crushed by natural force...",
      reasonLabel: "Moral Dignity · Duty · Freedom",
      bg: ["#1a0a00", "#2a0a00"],
      volcanic: true,
      symbol: "▲",
    },
    {
      name: "Vast Canyon",
      type: "Mathematical Sublime",
      typeColor: "#7B5EA7",
      description: "Geological time and scale collapse temporal imagination — then reason conceives eternity beyond all measure.",
      imaginationLabel: "Attempting to grasp geological time...",
      reasonLabel: "Eternity · Rational Comprehension",
      bg: ["#1a0d06", "#120800"],
      canyon: true,
      symbol: "◈",
    },
  ];

  const concepts = [
    { id: "mathematical", label: "Mathematical Sublime", color: "#7B5EA7", desc: "Vastness of magnitude — infinite space, geological time — exceeds imaginative comprehension, revealing reason's capacity to think infinities beyond sensible limits." },
    { id: "dynamical", label: "Dynamical Sublime", color: "#8B4020", desc: "Natural forces — storms, volcanoes — overwhelm physical power, revealing our moral strength as beings capable of resisting natural domination through reason and duty." },
    { id: "failure", label: "Failure of Imagination", color: "#5A3A80", desc: "The productive failure: imagination's inability to grasp the infinite is not defeat but the trigger for reason's supersensible self-recognition." },
    { id: "supersensible", label: "Supersensible Capacities", color: "#4A6080", desc: "Reason's power to think beyond all sensible limits — the capacity that is revealed precisely when imagination collapses before the infinite." },
    { id: "negative", label: "Negative Presentation", color: "#604A80", desc: "The sublime 'presents' the infinite by showing what cannot be presented sensuously — pointing beyond itself toward supersensible ideas through productive failure." },
    { id: "moral", label: "Moral Significance", color: "#3A6040", desc: "The sublime's ultimate meaning: confronting the overwhelming reveals we are more than natural beings — our moral vocation transcends nature's power." },
  ];

  const runAnimation = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setPhase('expanding');
    setImaginationScale(0);
    setReasonScale(0);
    setMoralMeter(0);
    startTimeRef.current = null;

    const totalDuration = 4000;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / totalDuration, 1);

      if (t < 0.4) {
        // Imagination expands
        const localT = t / 0.4;
        const eased = Math.sin(localT * Math.PI * 0.5);
        setImaginationScale(eased * 1.0);
        setPhase('expanding');
        setReasonScale(0);
        setMoralMeter(0);
      } else if (t < 0.6) {
        // Imagination fails and collapses
        const localT = (t - 0.4) / 0.2;
        const collapse = 1.0 - localT * 0.8;
        setImaginationScale(collapse);
        setPhase('failing');
        setReasonScale(0);
        setMoralMeter(localT * 0.1);
      } else {
        // Reason rises
        const localT = (t - 0.6) / 0.4;
        const eased = localT < 0.5 ? 2 * localT * localT : 1 - Math.pow(-2 * localT + 2, 2) / 2;
        setImaginationScale(0.2 - localT * 0.15);
        setReasonScale(eased);
        setMoralMeter(0.1 + eased * 0.9);
        setPhase('rising');
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        setAnimating(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [animating]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scene = scenes[selectedScene];

  const StarField = () => {
    const starPositions = Array.from({length: 40}, (_, i) => ({
      x: (i * 137.5 % 100),
      y: (i * 73.1 % 100),
      r: 0.5 + (i % 4) * 0.5,
      opacity: 0.3 + (i % 5) * 0.14,
    }));
    return (
      <g>
        {starPositions.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#ffffff" opacity={s.opacity} />
        ))}
      </g>
    );
  };

  const VolcanicScene = ({ eruptIntensity }) => {
    const intensity = eruptIntensity || 0;
    return (
      <g>
        <polygon points="50,15 20,75 80,75" fill="#3a1a00" opacity="0.9" />
        <polygon points="50,15 35,55 65,55" fill="#5a2a00" opacity="0.8" />
        {intensity > 0.3 && (
          <>
            <ellipse cx="50" cy="14" rx={4 + intensity * 12} ry={3 + intensity * 8} fill="#ff4400" opacity={intensity * 0.8} />
            <ellipse cx="50" cy="10" rx={2 + intensity * 8} ry={2 + intensity * 14} fill="#ff6600" opacity={intensity * 0.6} />
            <ellipse cx="43" cy="8" rx={2} ry={intensity * 10} fill="#ff8800" opacity={intensity * 0.5} />
            <ellipse cx="57" cy="6" rx={2} ry={intensity * 12} fill="#ffaa00" opacity={intensity * 0.4} />
          </>
        )}
        <rect x="0" y="72" width="100" height="28" fill="#1a0800" opacity="0.8" />
        {intensity > 0.5 && (
          <>
            <circle cx="25" cy="68" r={intensity * 6} fill="#ff3300" opacity={intensity * 0.4} />
            <circle cx="75" cy="70" r={intensity * 4} fill="#ff6600" opacity={intensity * 0.3} />
          </>
        )}
      </g>
    );
  };

  const CanyonScene = () => (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#1a0d06" />
      <polygon points="0,20 30,45 50,35 70,50 100,25 100,0 0,0" fill="#3a1a0a" opacity="0.9" />
      <polygon points="0,100 0,40 20,55 50,42 80,58 100,38 100,100" fill="#2a1508" opacity="0.9" />
      <rect x="20" y="52" width="60" height="8" fill="#1a0d04" opacity="0.95" />
      <polygon points="0,38 15,50 25,44 40,52 55,44 70,53 85,45 100,37 100,100 0,100" fill="#4a2010" opacity="0.7" />
      <polygon points="5,35 20,48 35,40 50,48 65,40 80,50 95,38 100,100 0,100" fill="#5a2812" opacity="0.5" />
    </g>
  );

  const getImaginationColor = () => {
    if (phase === 'failing') return '#8B2020';
    if (phase === 'complete') return '#3a2050';
    return '#7B5EA7';
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #2a0a3a 0%, #1a0520 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e0f0",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#7B5EA7", marginBottom: 8, textTransform: "uppercase" }}>
            Part 16 of 21 · Aesthetic Theory
          </div>
          <h1 style={{ fontSize: 28, fontWeight: "normal", color: "#e8d8ff", margin: "0 0 10px 0", lineHeight: 1.3 }}>
            The Sublime and the Limits of Imagination
          </h1>
          <p style={{ fontSize: 15, color: "#b090c0", margin: 0, fontStyle: "italic", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            The sublime begins with the overwhelming failure of imagination before vast magnitudes or mighty forces, then transforms into awareness of our supersensible rational and moral nature.
          </p>
        </div>

        {/* 1. PROBLEM PANEL */}
        <div style={{
          background: "rgba(20, 10, 30, 0.85)",
          border: "1px solid #2a1040",
          borderLeft: "4px solid #4A2060",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#7B5EA7", marginBottom: 12, textTransform: "uppercase", fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#cdb8e0" }}>
            Beauty reveals harmonious purposiveness, but some of the most profound aesthetic experiences involve not harmony but overwhelming magnitude and power. An account of aesthetic experience limited to beauty seems incomplete — what is the experience of confronting something that exceeds all human scale and overwhelms our faculties?
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 8, 25, 0.90)",
          border: "1px solid #2a1040",
          borderRadius: 12,
          padding: "28px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#7B5EA7", marginBottom: 20, textTransform: "uppercase", fontWeight: "bold" }}>
            Main Visualization · The Structure of Sublime Experience
          </div>

          {/* Scene Selector */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {scenes.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!animating) {
                    setSelectedScene(i);
                    setPhase('idle');
                    setImaginationScale(0);
                    setReasonScale(0);
                    setMoralMeter(0);
                  }
                }}
                onMouseEnter={() => setHoveredScene(i)}
                onMouseLeave={() => setHoveredScene(null)}
                style={{
                  background: selectedScene === i ? `${s.typeColor}33` : "rgba(30,15,45,0.8)",
                  border: `1px solid ${selectedScene === i ? s.typeColor : '#3a1060'}`,
                  borderRadius: 6,
                  padding: "10px 18px",
                  color: selectedScene === i ? "#e8d8ff" : "#9070a0",
                  fontFamily: "Georgia, serif",
                  fontSize: 14,
                  cursor: animating ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  boxShadow: selectedScene === i ? `0 0 12px ${s.typeColor}44` : hoveredScene === i ? `0 0 8px ${s.typeColor}33` : "none",
                }}
              >
                <span style={{ marginRight: 6 }}>{s.symbol}</span>
                {s.name}
                <div style={{ fontSize: 10, color: s.typeColor, marginTop: 2 }}>{s.type}</div>
              </button>
            ))}
          </div>

          {/* Split Screen Visualization */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>

            {/* Left: Imagination's Attempt */}
            <div style={{
              flex: "1 1 300px",
              background: "rgba(10, 5, 20, 0.9)",
              border: "1px solid #2a1050",
              borderRadius: 8,
              padding: 16,
              minHeight: 280,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#7B5EA7", marginBottom: 12, textTransform: "uppercase" }}>
                Imagination's Attempt
              </div>

              <svg width="100%" viewBox="0 0 200 200" style={{ display: "block", overflow: "visible" }}>
                {/* Scene background */}
                <defs>
                  <radialGradient id="imgBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={scene.bg[0]} />
                    <stop offset="100%" stopColor={scene.bg[1]} />
                  </radialGradient>
                  <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={getImaginationColor()} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={getImaginationColor()} stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="200" height="200" fill="url(#imgBg)" />

                {scene.stars && <StarField />}
                {scene.volcanic && (
                  <g transform="scale(2) translate(0,0)">
                    <VolcanicScene eruptIntensity={imaginationScale * 0.6} />
                  </g>
                )}
                {scene.canyon && (
                  <g transform="scale(2) translate(0,0)">
                    <CanyonScene />
                  </g>
                )}

                {/* Imagination circle trying to encompass */}
                {imaginationScale > 0 && (
                  <>
                    <circle
                      cx="100" cy="100"
                      r={imaginationScale * 140}
                      fill="url(#circleGrad)"
                      stroke={getImaginationColor()}
                      strokeWidth={phase === 'failing' ? 2 : 1.5}
                      strokeDasharray={phase === 'failing' ? "6 4" : "none"}
                      opacity={0.7}
                    />
                    {phase === 'failing' && (
                      <>
                        <circle cx="100" cy="100" r={imaginationScale * 140 + 8} fill="none" stroke="#8B2020" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 8" />
                        <text x="100" y="100" textAnchor="middle" fill="#ff6060" fontSize="12" opacity="0.9" fontFamily="Georgia, serif">
                          ✗ Cannot grasp...
                        </text>
                      </>
                    )}
                    {phase === 'expanding' && (
                      <text x="100" y="100" textAnchor="middle" fill="#b090d0" fontSize="10" opacity="0.8" fontFamily="Georgia, serif">
                        Reaching...
                      </text>
                    )}
                  </>
                )}

                {phase === 'idle' && (
                  <text x="100" y="108" textAnchor="middle" fill="#6a4a8a" fontSize="11" fontFamily="Georgia, serif">
                    Press Trigger →
                  </text>
                )}

                {/* Strain lines when failing */}
                {phase === 'failing' && imaginationScale > 0.3 && (
                  <>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180;
                      const r1 = imaginationScale * 120;
                      const r2 = imaginationScale * 150;
                      return (
                        <line key={i}
                          x1={100 + Math.cos(rad) * r1}
                          y1={100 + Math.sin(rad) * r1}
                          x2={100 + Math.cos(rad) * r2}
                          y2={100 + Math.sin(rad) * r2}
                          stroke="#8B2020" strokeWidth="1" opacity="0.5"
                        />
                      );
                    })}
                  </>
                )}
              </svg>

              <div style={{ fontSize: 12, color: "#8a6aaa", marginTop: 8, fontStyle: "italic", minHeight: 36, textAlign: "center" }}>
                {phase === 'idle' && "Imagination at rest — awaiting confrontation"}
                {phase === 'expanding' && scene.imaginationLabel}
                {phase === 'failing' && "Imagination collapses — scale exceeds all sensible grasp"}
                {(phase === 'rising' || phase === 'complete') && "Imagination overwhelmed — unable to encompass the infinite"}
              </div>
            </div>

            {/* Right: Reason Rising */}
            <div style={{
              flex: "1 1 300px",
              background: "rgba(10, 5, 20, 0.9)",
              border: "1px solid #2a1050",
              borderRadius: 8,
              padding: 16,
              minHeight: 280,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#4A6080", marginBottom: 12, textTransform: "uppercase" }}>
                Reason's Response
              </div>

              <div style={{ flex: 1, position: "relative" }}>
                <svg width="100%" viewBox="0 0 200 200" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="reasonGrad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#4A2060" />
                      <stop offset="50%" stopColor="#7B5EA7" />
                      <stop offset="100%" stopColor="#b0a0ff" />
                    </linearGradient>
                    <linearGradient id="moralGrad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#1a4030" />
                      <stop offset="100%" stopColor="#3A9060" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="200" height="200" fill="#080510" />

                  {/* Reason bar */}
                  <rect x="20" y="160" width="70" height="5" fill="#2a1050" rx="2" />
                  {reasonScale > 0 && (
                    <>
                      <rect
                        x="20"
                        y={160 - reasonScale * 130}
                        width="70"
                        height={reasonScale * 130 + 5}
                        fill="url(#reasonGrad)"
                        rx="2"
                        opacity="0.9"
                      />
                      <text x="55" y={155 - reasonScale * 130} textAnchor="middle" fill="#d0b8ff" fontSize="8" fontFamily="Georgia, serif">
                        {scene.reasonLabel.split(' · ')[0]}
                      </text>
                      {scene.reasonLabel.split(' · ')[1] && (
                        <text x="55" y={145 - reasonScale * 130} textAnchor="middle" fill="#b090d0" fontSize="7" fontFamily="Georgia, serif">
                          {scene.reasonLabel.split(' · ')[1]}
                        </text>
                      )}
                    </>
                  )}
                  <text x="55" y="178" textAnchor="middle" fill="#6a4a8a" fontSize="9" fontFamily="Georgia, serif">Reason</text>

                  {/* Moral meter bar */}
                  <rect x="110" y="160" width="70" height="5" fill="#0a2010" rx="2" />
                  {moralMeter > 0 && (
                    <>
                      <rect
                        x="110"
                        y={160 - moralMeter * 130}
                        width="70"
                        height={moralMeter * 130 + 5}
                        fill="url(#moralGrad)"
                        rx="2"
                        opacity={0.7 + moralMeter * 0.2}
                      />
                      {moralMeter > 0.5 && (
                        <text x="145" y={150 - moralMeter * 130} textAnchor="middle" fill="#70d090" fontSize="8" fontFamily="Georgia, serif">
                          Moral
                        </text>
                      )}
                      {moralMeter > 0.7 && (
                        <text x="145" y={140 - moralMeter * 130} textAnchor="middle" fill="#50b070" fontSize="7" fontFamily="Georgia, serif">
                          Dignity
                        </text>
                      )}
                    </>
                  )}
                  <text x="145" y="178" textAnchor="middle" fill="#2a5030" fontSize="9" fontFamily="Georgia, serif">Moral Self</text>

                  {/* Connecting arrows */}
                  {phase === 'failing' && (
                    <line x1="90" y1="100" x2="110" y2="100" stroke="#7B5EA7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                  )}
                  {(phase === 'rising' || phase === 'complete') && reasonScale > 0.2 && (
                    <>
                      <line x1="90" y1={160 - reasonScale * 80} x2="110" y2={160 - moralMeter * 80} stroke="#7B5EA7" strokeWidth="1" opacity="0.4" />
                      <text x="100" y={150 - reasonScale * 60} textAnchor="middle" fill="#7B5EA7" fontSize="7" fontFamily="Georgia, serif">↑</text>
                    </>
                  )}

                  {/* Labels for bars */}
                  <rect x="18" y="158" width="74" height="7" fill="none" stroke="#4A2060" strokeWidth="0.5" rx="2" />
                  <rect x="108" y="158" width="74" height="7" fill="none" stroke="#1a4030" strokeWidth="0.5" rx="2" />

                  {phase === 'idle' && (
                    <text x="100" y="95" textAnchor="middle" fill="#3a2050" fontSize="10" fontFamily="Georgia, serif">
                      Awaiting failure...
                    </text>
                  )}
                </svg>
              </div>

              <div style={{ fontSize: 12, color: "#6a8a9a", marginTop: 8, fontStyle: "italic", minHeight: 36, textAlign: "center" }}>
                {phase === 'idle' && "Reason dormant — no trigger yet"}
                {phase === 'expanding' && "Reason waiting as imagination strains..."}
                {phase === 'failing' && "The turn begins — reason awakened by failure"}
                {phase === 'rising' && "Reason rises: " + scene.reasonLabel}
                {phase === 'complete' && "Reason fully revealed — supersensible nature disclosed"}
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <button
              onClick={runAnimation}
              disabled={animating}
              style={{
                background: animating ? "rgba(30,15,45,0.5)" : "rgba(74,32,96,0.7)",
                border: `1px solid ${animating ? "#2a1040" : "#7B5EA7"}`,
                borderRadius: 8,
                padding: "12px 32px",
                color: animating ? "#5a3a7a" : "#e8d8ff",
                fontFamily: "Georgia, serif",
                fontSize: 15,
                cursor: animating ? "not-allowed" : "pointer",
                boxShadow: animating ? "none" : "0 0 20px #4A206055",
                transition: "all 0.2s",
              }}
            >
              {animating ? "Experiencing the Sublime..." : `Trigger the ${scene.type} →`}
            </button>
          </div>

          {/* Scene Description */}
          <div style={{
            background: "rgba(20, 10, 35, 0.7)",
            border: `1px solid ${scene.typeColor}44`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 24,
            borderLeft: `3px solid ${scene.typeColor}`,
          }}>
            <span style={{ color: scene.typeColor, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              {scene.symbol} {scene.type} — {scene.name}
            </span>
            <p style={{ margin: 0, fontSize: 14, color: "#c0a8d8", lineHeight: 1.7 }}>{scene.description}</p>
          </div>

          {/* Repulsion-Attraction Flow */}
          <div style={{
            background: "rgba(15, 8, 25, 0.8)",
            border: "1px solid #2a1050",
            borderRadius: 8,
            padding: "20px",
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#7B5EA7", marginBottom: 16, textTransform: "uppercase" }}>
              The Emotional Sequence
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Confrontation", sub: "with the overwhelming", color: "#3a1a6a" },
                { label: "→", sub: "", color: "#4a2070", arrow: true },
                { label: "Repulsion", sub: "fear, recoil, inadequacy", color: "#6a2020" },
                { label: "→", sub: "", color: "#4a2070", arrow: true },
                { label: "Failure", sub: "imagination collapses", color: "#4a1040" },
                { label: "→", sub: "", color: "#4a2070", arrow: true },
                { label: "Attraction", sub: "reason self-discovers", color: "#1a4060" },
                { label: "→", sub: "", color: "#4a2070", arrow: true },
                { label: "Elevation", sub: "moral dignity revealed", color: "#1a4030" },
              ].map((step, i) => (
                step.arrow ? (
                  <div key={i} style={{ fontSize: 20, color: "#4a2070" }}>→</div>
                ) : (
                  <div key={i} style={{
                    background: `${step.color}88`,
                    border: `1px solid ${step.color}`,
                    borderRadius: 6,
                    padding: "8px 12px",
                    textAlign: "center",
                    minWidth: 80,
                  }}>
                    <div style={{ fontSize: 12, color: "#e8d8ff", fontWeight: "bold" }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: "#9080a0", marginTop: 2 }}>{step.sub}</div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Core Argument Prose */}
          <div style={{
            background: "rgba(10, 5, 20, 0.8)",
            border: "1px solid #2a1050",
            borderRadius: 8,
            padding: "20px 24px",
            marginTop: 20,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#7B5EA7", marginBottom: 12, textTransform: "uppercase" }}>
              The Core Argument
            </div>
            <p style={{ margin: "0 0 14px 0", fontSize: 14, lineHeight: 1.8, color: "#c0a8d8" }}>
              The sublime differs fundamentally from beauty: while beauty harmonizes our faculties, the sublime initially disrupts them. Mathematical sublime occurs when vastness — infinite space, geological time — exceeds imaginative comprehension, then reveals reason's capacity to think infinities beyond sensible limits.
            </p>
            <p style={{ margin: "0 0 14px 0", fontSize: 14, lineHeight: 1.8, color: "#c0a8d8" }}>
              Dynamical sublime occurs when natural forces overwhelm physical power, then reveals our moral strength as beings capable of resisting natural domination through reason and duty. The sublime is located not in the object but in our response: it is a 'negative presentation' of the infinite, pointing beyond itself toward supersensible ideas.
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "#b09acc" }}>
              The complex emotional sequence — repulsion then attraction — makes sublime experience both more disturbing and more morally significant than beauty. We discover, in the very moment of being overwhelmed, that we are more than natural beings.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(123,94,167,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 20, marginTop: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7B5EA7", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map((c) => (
              <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredConcept === c.id ? "#7B5EA7" : "rgba(123,94,167,0.1)", border: `1px solid ${hoveredConcept === c.id ? "#a080d0" : "rgba(123,94,167,0.35)"}`, borderRadius: 20, fontSize: 12, cursor: "pointer", color: hoveredConcept === c.id ? "#f0ead8" : "#9a78cc", transition: "all 0.2s" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(123,94,167,0.08)", border: "1px solid rgba(123,94,167,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7B5EA7", marginBottom: 8 }}>{concepts.find(c => c.id === hoveredConcept)?.label}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>{concepts.find(c => c.id === hoveredConcept)?.desc}</p>
            </div>
          )}
        </div>

        {/* 3. DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20, 10, 30, 0.85)",
          border: "1px solid #2a1040",
          borderLeft: "4px solid #603080",
          borderRadius: 8,
          padding: "24px 28px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#603080", marginBottom: 12, textTransform: "uppercase", fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 14px 0", fontSize: 15, lineHeight: 1.8, color: "#cdb8e0" }}>
            The sublime is even more subjectively located than beauty — it depends on moral and rational reflection rather than mere formal appreciation. This raises questions about the relationship between aesthetic genius and artistic creation: how can human artists deliberately produce objects that achieve these profound aesthetic effects, and what cognitive capacity enables such original creation?
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#9a7ab0", fontStyle: "italic", lineHeight: 1.7 }}>
            This pressure forces the next development: if sublime experience reveals our supersensible nature through the failure of natural faculties, then understanding how genius creates works that provoke such experiences demands a theory of original creative cognition that transcends mere rule-following.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "rgba(20, 10, 30, 0.85)",
          border: "1px solid #2a1040",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "#e8d8ff",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: 3, color: "#7B5EA7", textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echosOpen ? <ChevronUp size={18} color="#7B5EA7" /> : <ChevronDown size={18} color="#7B5EA7" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 28px 24px 28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Caspar David Friedrich", detail: "Sublime landscape paintings such as 'Wanderer above the Sea of Fog' deliberately stage the viewer's confrontation with overwhelming natural scale — the human figure dwarfed by mountains embodies the imaginative failure that triggers reason's self-recognition." },
                  { label: "Romantic Poets — Wordsworth", detail: "Wordsworth's 'Prelude' draws explicitly on dynamical sublime responses to Alpine storms and mountain encounters, tracing the poet's moral formation through experiences of natural overwhelming that produce what he called 'spots of time.'" },
                  { label: "Wilderness and Climate Consciousness", detail: "Contemporary experiences of standing before vast wilderness — or confronting climate change data showing planetary-scale transformation — evoke mathematical sublime responses: the imagination fails before geological or atmospheric scale, triggering rational-moral reflection about human responsibility." },
                ].map((echo, i) => (
                  <div key={i} style={{
                    background: "rgba(15, 8, 25, 0.7)",
                    border: "1px solid #2a1050",
                    borderRadius: 6,
                    padding: "14px 18px",
                    borderLeft: "3px solid #4A2060",
                  }}>
                    <div style={{ fontSize: 13, color: "#b090d0", fontWeight: "bold", marginBottom: 6 }}>{echo.label}</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#9a7ab0", lineHeight: 1.7 }}>{echo.detail}</p>
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

// ─── Part 17: Genius, Art, and Aesthetic Ideas ───
function GeniusArtAestheticIdeas() {
  const [activeLayer, setActiveLayer] = useState({ intention: true, skill: true, aesthetic: true });
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [geniusMeter, setGeniusMeter] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const intentionActive = activeLayer.intention;
  const skillActive = activeLayer.skill;
  const aestheticActive = activeLayer.aesthetic;

  const activeCount = (intentionActive ? 1 : 0) + (skillActive ? 1 : 0) + (aestheticActive ? 1 : 0);
  const giftLevel = aestheticActive ? Math.max(0, Math.min(100, 40 + (aestheticActive ? 60 : 0) - (intentionActive ? 20 : 0) - (skillActive ? 10 : 0))) : 0;

  useEffect(() => {
    const target = aestheticActive ? Math.max(0, Math.min(100, 40 + 60 - (intentionActive ? 20 : 0) - (skillActive ? 10 : 0))) : 0;
    let current = geniusMeter;
    const step = () => {
      current += (target - current) * 0.08;
      setGeniusMeter(Math.round(current));
      if (Math.abs(target - current) > 0.5) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setGeniusMeter(target);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [activeLayer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    if (particlesRef.current.length === 0 || !aestheticActive) {
      particlesRef.current = [];
    }

    if (aestheticActive && particlesRef.current.length < 40) {
      for (let i = particlesRef.current.length; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
          alpha: Math.random() * 0.6 + 0.2,
          hue: Math.random() > 0.5 ? '#C0392B' : '#E8A020',
        });
      }
    }

    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      if (aestheticActive) {
        particlesRef.current.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.hue;
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, [aestheticActive]);

  const concepts = [
    { id: 'originality', label: 'Originality', desc: 'Genius produces works that cannot be derived from any pre-existing rule. The work seems to create its own law, arriving as if inevitable yet unprecedented.' },
    { id: 'exemplary', label: 'Exemplary Character', desc: 'Great works serve as models for others without being imitable by rule. They set the standard without providing a formula — inspiring without prescribing.' },
    { id: 'inexplicable', label: 'Inexplicability', desc: 'Artists cannot explain how they achieve what they do. The gift of genius cannot be taught, transferred, or fully articulated — it resists systematic instruction.' },
    { id: 'fine_art', label: 'Fine Art Alone', desc: 'Genius belongs only to fine art, not mechanical arts (craft, technique) or agreeable art (entertainment). Only fine art demands this kind of transcendent creative power.' },
    { id: 'aesthetic_ideas', label: 'Aesthetic Ideas', desc: 'Representations of imagination that give much to think about, yet no determinate concept is adequate to them. They are the intuitive counterpart to rational ideas — inexpressible in words alone.' },
  ];

  const layers = [
    {
      id: 'intention',
      label: 'Conscious Intention',
      color: '#5D4037',
      textColor: '#D7CCC8',
      description: 'The artist\'s deliberate choices: sketches, plans, conceptual goals, technical decisions made with full awareness.',
      elements: [
        { x: 30, y: 30, text: 'rough sketch' },
        { x: 140, y: 50, text: 'color plan' },
        { x: 60, y: 80, text: 'composition rule' },
        { x: 180, y: 30, text: 'subject matter' },
        { x: 100, y: 60, text: 'scale' },
      ]
    },
    {
      id: 'skill',
      label: 'Skill & Tradition',
      color: '#37474F',
      textColor: '#B0BEC5',
      description: 'Inherited techniques, learned conventions, the accumulated tradition of the art form that flows through the artist\'s hand.',
      elements: [
        { x: 40, y: 35, text: 'sfumato' },
        { x: 160, y: 55, text: 'counterpoint' },
        { x: 80, y: 70, text: 'chiaroscuro' },
        { x: 190, y: 30, text: 'fugue form' },
        { x: 120, y: 45, text: 'perspective' },
      ]
    },
    {
      id: 'aesthetic',
      label: 'Aesthetic Ideas',
      color: '#7B1111',
      textColor: '#FFCDD2',
      description: 'What emerges beyond intention and skill — resonances, associations, meanings that seem to arise from the work itself, given by nature through the artist.',
      elements: [
        { x: 35, y: 40, text: 'mortality' },
        { x: 150, y: 25, text: 'transcendence' },
        { x: 90, y: 65, text: 'longing' },
        { x: 195, y: 50, text: 'time\'s passage' },
        { x: 120, y: 30, text: 'freedom' },
        { x: 60, y: 75, text: 'the infinite' },
      ]
    }
  ];

  const paintingElements = {
    intention: [
      { type: 'line', x1: 40, y1: 180, x2: 200, y2: 80, stroke: '#8D6E63', sw: 1.5 },
      { type: 'line', x1: 40, y1: 80, x2: 200, y2: 180, stroke: '#8D6E63', sw: 1.5 },
      { type: 'rect', x: 80, y: 90, w: 80, h: 80, stroke: '#8D6E63', fill: 'none', sw: 1 },
      { type: 'circle', x: 120, y: 130, r: 20, stroke: '#A1887F', fill: 'none', sw: 1 },
      { type: 'text', x: 45, y: 60, text: '↑ sky', fill: '#8D6E63', size: 10 },
      { type: 'text', x: 155, y: 190, text: 'ground ↓', fill: '#8D6E63', size: 10 },
    ],
    skill: [
      { type: 'ellipse', cx: 100, cy: 130, rx: 50, ry: 35, stroke: '#546E7A', fill: '#263238', sw: 2 },
      { type: 'ellipse', cx: 100, cy: 100, rx: 30, ry: 45, stroke: '#78909C', fill: '#37474F', sw: 2 },
      { type: 'line', x1: 60, y1: 75, x2: 140, y2: 75, stroke: '#546E7A', sw: 1 },
      { type: 'arc', cx: 100, cy: 130, r: 60, startAngle: 3.14, endAngle: 0, stroke: '#607D8B', sw: 1.5 },
    ],
    aesthetic: [
      { type: 'glow', cx: 100, cy: 115, r: 55, color: '#C0392B' },
      { type: 'glow', cx: 75, cy: 95, r: 25, color: '#E8A020' },
      { type: 'glow', cx: 135, cy: 145, r: 20, color: '#C0392B' },
      { type: 'rays', cx: 100, cy: 115, r: 70, color: '#C0392B' },
    ]
  };

  const drawLayer = (ctx, layerId) => {
    const els = paintingElements[layerId];
    els.forEach(el => {
      ctx.save();
      if (el.type === 'line') {
        ctx.beginPath();
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x2, el.y2);
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.sw;
        ctx.stroke();
      } else if (el.type === 'rect') {
        ctx.beginPath();
        ctx.rect(el.x, el.y, el.w, el.h);
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.sw;
        if (el.fill !== 'none') ctx.fillStyle = el.fill;
        ctx.stroke();
      } else if (el.type === 'circle') {
        ctx.beginPath();
        ctx.arc(el.x, el.y, el.r, 0, Math.PI * 2);
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.sw;
        ctx.stroke();
      } else if (el.type === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(el.cx, el.cy, el.rx, el.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.sw;
        ctx.fillStyle = el.fill;
        ctx.fill();
        ctx.stroke();
      } else if (el.type === 'arc') {
        ctx.beginPath();
        ctx.arc(el.cx, el.cy, el.r, el.startAngle, el.endAngle);
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.sw;
        ctx.stroke();
      } else if (el.type === 'glow') {
        const grad = ctx.createRadialGradient(el.cx, el.cy, 0, el.cx, el.cy, el.r);
        grad.addColorStop(0, el.color + 'AA');
        grad.addColorStop(1, el.color + '00');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(el.cx, el.cy, el.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (el.type === 'rays') {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(el.cx + Math.cos(angle) * 30, el.cy + Math.sin(angle) * 30);
          ctx.lineTo(el.cx + Math.cos(angle) * el.r, el.cy + Math.sin(angle) * el.r);
          ctx.strokeStyle = el.color + '55';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      } else if (el.type === 'text') {
        ctx.fillStyle = el.fill;
        ctx.font = `${el.size}px Georgia, serif`;
        ctx.fillText(el.text, el.x, el.y);
      }
      ctx.restore();
    });
  };

  const paintCanvasRef = useRef(null);
  useEffect(() => {
    const canvas = paintCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 240, 240);
    ctx.fillStyle = '#1a0a0a';
    ctx.fillRect(0, 0, 240, 240);

    if (intentionActive) drawLayer(ctx, 'intention');
    if (skillActive) drawLayer(ctx, 'skill');
    if (aestheticActive) drawLayer(ctx, 'aesthetic');
  }, [activeLayer]);

  const meterColor = geniusMeter > 70 ? '#C0392B' : geniusMeter > 40 ? '#E8A020' : '#546E7A';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 40% 30%, #4a0f0f 0%, #1a0505 40%, #0a0a0f 100%)',
      fontFamily: 'Georgia, serif',
      color: '#E8DDD0',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ color: '#C0392B', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Part 17 of 21</div>
          <h1 style={{ fontSize: 32, fontWeight: 'normal', color: '#F5E6D8', margin: '0 0 10px', lineHeight: 1.2 }}>Genius, Art, and Aesthetic Ideas</h1>
          <p style={{ fontSize: 15, color: '#B09080', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Kant's theory of genius explains how original artworks transcend conscious intention through nature's gift, expressing aesthetic ideas that communicate more than any concept can contain.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: '#12080a',
          border: '1px solid #2a1010',
          borderLeft: '4px solid #C0392B',
          borderRadius: 8,
          padding: '24px 28px',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#C0392B', marginBottom: 12 }}>The Problem</div>
          <p style={{ margin: 0, lineHeight: 1.85, fontSize: 15, color: '#C9B8A8' }}>
            If natural beauty reveals purposiveness without purpose, artworks pose a problem: they are obviously created by humans with intentions and purposes. How can human-made objects achieve the appearance of natural purposiveness that aesthetic judgment requires? And how does artistic communication convey meanings beyond literal content?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: '#0f0608',
          border: '1px solid #2a1010',
          borderRadius: 10,
          padding: '32px',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#C0392B', marginBottom: 6 }}>The Artistic Creation Simulator</div>
          <p style={{ fontSize: 13, color: '#8a7060', marginBottom: 28, lineHeight: 1.6 }}>
            Toggle each layer to see what the artwork expresses at each level of creation — from the artist's plan to nature's gift.
          </p>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>

            {/* Painting Canvas */}
            <div style={{ flex: '0 0 auto' }}>
              <div style={{ fontSize: 12, color: '#8a7060', marginBottom: 10, textAlign: 'center' }}>The Work Itself</div>
              <div style={{
                position: 'relative',
                width: 240,
                height: 240,
                borderRadius: 4,
                overflow: 'hidden',
                border: `2px solid #C0392B`,
                boxShadow: aestheticActive ? '0 0 30px #C0392B44' : '0 0 10px #00000080',
              }}>
                <canvas ref={paintCanvasRef} width={240} height={240} style={{ display: 'block' }} />
                <canvas ref={canvasRef} width={240} height={240} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

                {/* Layer labels overlaid */}
                {!intentionActive && !skillActive && !aestheticActive && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a0a0a' }}>
                    <span style={{ color: '#4a3030', fontSize: 12, textAlign: 'center' }}>All layers hidden</span>
                  </div>
                )}
              </div>

              {/* Layer floating badges */}
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {layers.map(layer => (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayer(prev => ({ ...prev, [layer.id]: !prev[layer.id] }))}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 6,
                      background: activeLayer[layer.id] ? layer.color + 'AA' : '#1a1010',
                      border: `1px solid ${activeLayer[layer.id] ? layer.color : '#2a1818'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      opacity: hoveredLayer && hoveredLayer !== layer.id ? 0.6 : 1,
                    }}
                  >
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: activeLayer[layer.id] ? layer.textColor : '#4a3030',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: activeLayer[layer.id] ? layer.textColor : '#5a4040' }}>
                      {layer.label}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: activeLayer[layer.id] ? '#aaa' : '#3a2020' }}>
                      {activeLayer[layer.id] ? 'ON' : 'OFF'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: layers description + genius meter */}
            <div style={{ flex: 1, minWidth: 220 }}>

              {/* Active layer description */}
              <div style={{ marginBottom: 20 }}>
                {layers.map(layer => (
                  activeLayer[layer.id] && (
                    <div key={layer.id} style={{
                      padding: '12px 16px',
                      background: layer.color + '33',
                      borderLeft: `3px solid ${layer.color}`,
                      borderRadius: '0 6px 6px 0',
                      marginBottom: 8,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 'bold', color: layer.textColor, marginBottom: 4, letterSpacing: 1 }}>
                        {layer.label.toUpperCase()}
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: '#C9B8A8', lineHeight: 1.6 }}>{layer.description}</p>
                    </div>
                  )
                ))}
                {!intentionActive && !skillActive && !aestheticActive && (
                  <div style={{ padding: '12px 16px', background: '#1a0a0a', borderLeft: '3px solid #3a1818', borderRadius: '0 6px 6px 0' }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#5a4040', fontStyle: 'italic' }}>Enable at least one layer to see what it contributes to the work.</p>
                  </div>
                )}
              </div>

              {/* Genius Gift Meter */}
              <div style={{
                background: '#16080c',
                border: '1px solid #2a1010',
                borderRadius: 8,
                padding: '16px 18px',
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#C0392B', marginBottom: 10 }}>
                  Genius Gift Meter
                </div>
                <p style={{ fontSize: 12, color: '#8a7060', marginBottom: 12, lineHeight: 1.5 }}>
                  The degree to which the work exceeds conscious intention — nature's contribution through the artist.
                </p>
                <div style={{ position: 'relative', height: 20, background: '#1a0a0a', borderRadius: 10, overflow: 'hidden', border: '1px solid #2a1010' }}>
                  <div style={{
                    height: '100%',
                    width: `${geniusMeter}%`,
                    background: `linear-gradient(90deg, #7B1111, ${meterColor})`,
                    borderRadius: 10,
                    transition: 'width 0.1s, background 0.3s',
                    boxShadow: geniusMeter > 60 ? `0 0 12px ${meterColor}88` : 'none',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: '#5a4040' }}>Craft alone</span>
                  <span style={{ fontSize: 13, color: meterColor, fontWeight: 'bold' }}>{geniusMeter}%</span>
                  <span style={{ fontSize: 10, color: '#5a4040' }}>Pure genius</span>
                </div>
                <p style={{ fontSize: 11, color: '#7a5858', marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
                  {geniusMeter >= 80
                    ? 'Nature speaks through the artist — transcendent originality.'
                    : geniusMeter >= 50
                    ? 'Aesthetic ideas begin to exceed what was planned.'
                    : geniusMeter >= 20
                    ? 'Skill and intention dominate; the gift is muted.'
                    : 'Without aesthetic ideas, no fine art — only craft.'}
                </p>
              </div>
            </div>
          </div>

          {/* Core Argument */}
          <div style={{ marginTop: 28, padding: '20px 24px', background: '#160a0c', border: '1px solid #2a1010', borderRadius: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#C0392B', marginBottom: 12 }}>Core Argument</div>
            <p style={{ margin: 0, fontSize: 14, color: '#C9B8A8', lineHeight: 1.85 }}>
              Genius is the innate mental disposition through which nature gives the rule to art — enabling artists to create works that seem to follow their own internal laws, achieving natural purposiveness despite obvious human intention. Its four marks are originality, exemplary character (serving as models without providing formulas), inexplicability (the gift cannot be taught by rule), and restriction to fine art alone. Aesthetic ideas are representations of imagination that give much to think about without any concept being adequate — the intuitive counterpart to rational ideas, expressing through imagery what conceptual language cannot capture. Great artworks transform inherited materials into apparently inevitable yet unprecedented forms, making them at once historically rooted and transcendently original.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28, marginTop: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#C0392B", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredConcept === c.id ? "#C0392B" : "rgba(192,57,43,0.1)", border: `1px solid ${hoveredConcept === c.id ? "#e05040" : "rgba(192,57,43,0.35)"}`, borderRadius: 20, fontSize: 12, cursor: "pointer", color: hoveredConcept === c.id ? "#f0ead8" : "#cc7060", transition: "all 0.2s" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#C0392B", marginBottom: 8 }}>{concepts.find(c => c.id === hoveredConcept)?.label}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>{concepts.find(c => c.id === hoveredConcept)?.desc}</p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: '#0a0c12',
          border: '1px solid #1a1a2a',
          borderLeft: '4px solid #8B4513',
          borderRadius: 8,
          padding: '24px 28px',
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#A0522D', marginBottom: 12 }}>The Difficulty</div>
          <p style={{ margin: '0 0 12px', lineHeight: 1.85, fontSize: 15, color: '#C9B8A8' }}>
            Kant's aesthetic theory has now fully analyzed beauty, the sublime, and artistic genius. But the third Critique also promised a teleological analysis of nature — specifically of living organisms that exhibit internal purposiveness. How do organisms differ from aesthetic objects, and can mechanical science fully explain life? The very concept of natural purposiveness that grounded aesthetic judgment now demands its own investigation in nature's most striking instances: the living body.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#8B6050', fontStyle: 'italic', lineHeight: 1.6 }}>
            This pressure forces the next development: from the purposiveness we project onto beauty and genius into the purposiveness we seem compelled to discover in organisms — a question that will test the limits of scientific explanation itself.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: '#0a0a10',
          border: '1px solid #1a1a2a',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderBottom: echosOpen ? '1px solid #1a1a2a' : 'none',
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#7a6a5a' }}>Real-World Echoes</div>
            {echosOpen ? <ChevronUp size={16} color="#C0392B" /> : <ChevronDown size={16} color="#C0392B" />}
          </div>
          {echosOpen && (
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  {
                    title: 'Bach, Shakespeare, Michelangelo',
                    text: 'These artists are the canonical exemplars Kant had in mind: works so original they established new standards for entire traditions, yet so complete they resist mere imitation. Every subsequent fugue composer lived in Bach\'s shadow without copying his formula.'
                  },
                  {
                    title: 'Romantic Theories of Artistic Creation',
                    text: 'Kant\'s concept of genius directly shaped Romantic aesthetics — Schiller, Schelling, and Coleridge all elaborated the idea of the artist as conduit for something beyond rational control, a force greater than personal intention flowing through the creative act.'
                  },
                  {
                    title: 'Art as Autonomous — Valuable in Itself',
                    text: 'The modern conception of fine art as intrinsically valuable, independent of decoration, moral instruction, or entertainment, traces directly to Kant. The separation of \'art for art\'s sake\' from craft and mere pleasure is Kantian at its root.'
                  }
                ].map(item => (
                  <div key={item.title} style={{
                    paddingLeft: 16,
                    borderLeft: '2px solid #C0392B44',
                  }}>
                    <div style={{ fontSize: 13, color: '#D4A090', marginBottom: 6, fontStyle: 'italic' }}>{item.title}</div>
                    <p style={{ margin: 0, fontSize: 13, color: '#9a8878', lineHeight: 1.75 }}>{item.text}</p>
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

// ─── Part 18: Teleology and the Purposiveness of Nature ───
function TeleologyPurposivenessOfNature() {
  const [selectedClockPart, setSelectedClockPart] = useState(null);
  const [selectedTreePart, setSelectedTreePart] = useState(null);
  const [mechanismOn, setMechanismOn] = useState(true);
  const [teleologyOn, setTeleologyOn] = useState(true);
  const [showDarwin, setShowDarwin] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clock');
  const [hoveredButton, setHoveredButton] = useState(null);
  const [animFrame, setAnimFrame] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [hoveredPill, setHoveredPill] = useState(null);
  const animRef = useRef(null);

  const keyConcepts = [
    { id: "natural_purpose", label: "Natural Purpose", desc: "Kant's technical term for an organized being in which each part exists both as an effect of and as a means to every other part. In a natural purpose, cause and effect circulate: the organism produces its own parts and maintains itself through internal circular causality. No artifact has this property — a clock's parts are assembled externally, while the tree's parts organize themselves." },
    { id: "organized_beings", label: "Organized Beings", desc: "Living organisms, which Kant argues require teleological judgment because their internal organization cannot be fully explained by mechanical causation alone. Unlike machines (externally assembled linear causal chains), organisms exhibit self-organization: each part exists for the sake of the whole, and the whole exists for the sake of each part. Kant does not claim organisms have literal purposes — only that we must think them teleologically." },
    { id: "regulative_teleology", label: "Regulative Teleology", desc: "The proper epistemic status of teleological thinking about nature: a regulative principle (guiding inquiry) rather than a constitutive claim (asserting that organisms have genuine, mind-independent purposes). We must think organisms as if they were purposive — we cannot explain them otherwise — but we cannot assert that purposiveness is an objective feature of nature independent of our need to understand it." },
    { id: "mechanism_teleology", label: "Mechanism vs. Teleology", desc: "The central tension in the philosophy of biology that Kant identifies. Mechanism explains phenomena through linear efficient causation (A causes B). Teleology requires circular causation (the whole explains the parts and vice versa). For Kant, neither can be eliminated: mechanism is the regulative ideal of science, but teleology is an indispensable complement for understanding organized beings. Neither suffices alone." },
    { id: "internal_purposiveness", label: "Internal Purposiveness", desc: "The self-referential organization of a living being in which the organism's own activity produces and maintains the very structures through which it acts. Kant contrasts this with external purposiveness (a plant is 'good for' herbivores) which does not establish natural purpose. Internal purposiveness — the organism's circular self-production — is what requires teleological judgment and cannot be captured by mechanical explanation." },
  ];

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = (frame + 1) % 360;
      setAnimFrame(frame);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const clockParts = [
    { id: 'mainspring', label: 'Mainspring', cx: 160, cy: 160, r: 22, causes: 'gearA', desc: 'Stores energy mechanically. Releases tension to drive the gear train in one direction only.' },
    { id: 'gearA', label: 'Drive Gear', cx: 220, cy: 130, r: 18, causes: 'gearB', desc: 'Receives force from mainspring. Transfers rotational energy forward — no feedback, no awareness of purpose.' },
    { id: 'gearB', label: 'Escapement', cx: 270, cy: 160, r: 16, causes: 'hands', desc: 'Regulates the release of energy. A passive mechanical brake — it does not "know" time.' },
    { id: 'hands', label: 'Clock Hands', cx: 240, cy: 210, r: 18, causes: null, desc: 'Terminal effect. The hands display time but do not constitute time — they are the final link in a linear chain.' },
    { id: 'case', label: 'Clock Case', cx: 170, cy: 220, r: 16, causes: null, desc: 'Container only. The case plays no causal role in timekeeping — it is an external support, not an organic part.' },
  ];

  const treeParts = [
    { id: 'leaf', label: 'Leaf', cx: 210, cy: 80, r: 20, color: '#27AE60', desc: 'Performs photosynthesis for the whole tree. But the tree also produces leaves — the leaf exists because of the tree and for the tree simultaneously.' },
    { id: 'trunk', label: 'Trunk', cx: 210, cy: 175, r: 22, color: '#6D4C41', desc: 'Supports leaves and transports nutrients. Yet trunk growth is regulated by the leaves above and roots below — each part governs the others.' },
    { id: 'root', label: 'Root', cx: 210, cy: 270, r: 20, color: '#8D6E63', desc: 'Absorbs water and nutrients for the whole. But root architecture is shaped by the demands of the canopy — cause and effect circulate.' },
    { id: 'fruit', label: 'Fruit', cx: 270, cy: 110, r: 18, color: '#E74C3C', desc: 'Contains seeds to reproduce the whole organism. The fruit exists for the sake of the species-form that also produced it — circular self-purpose.' },
    { id: 'bark', label: 'Bark', cx: 155, cy: 190, r: 16, color: '#A0522D', desc: 'Protects the living tissue of the trunk. Produced by the tree to serve the tree — the organism repairs and maintains itself, unlike any machine.' },
  ];

  const getClockArrow = (part) => {
    if (!part || !part.causes) return null;
    const target = clockParts.find(p => p.id === part.causes);
    if (!target) return null;
    return { x1: part.cx, y1: part.cy, x2: target.cx, y2: target.cy };
  };

  const getTreeArrows = (part) => {
    if (!part) return [];
    const others = treeParts.filter(p => p.id !== part.id);
    return others.map(other => ({
      x1: part.cx, y1: part.cy, x2: other.cx, y2: other.cy,
      key: `${part.id}-${other.id}`
    }));
  };

  const wiltOffset = (!mechanismOn && !teleologyOn) ? 30 : ((!mechanismOn && teleologyOn) ? 10 : 0);
  const treeOpacity = (!mechanismOn && !teleologyOn) ? 0.3 : 1.0;
  const treeScale = (!mechanismOn && !teleologyOn) ? 0.85 : ((!mechanismOn && teleologyOn) ? 0.95 : 1.0);

  const pulse = Math.sin(animFrame * Math.PI / 60);

  const selectedClock = clockParts.find(p => p.id === selectedClockPart);
  const selectedTree = treeParts.find(p => p.id === selectedTreePart);
  const clockArrow = getClockArrow(selectedClock);
  const treeArrows = getTreeArrows(selectedTree);

  const panelStyle = {
    background: 'rgba(15,25,20,0.85)',
    border: '1px solid rgba(39,174,96,0.25)',
    borderLeft: '4px solid #27AE60',
    borderRadius: '10px',
    padding: '28px 32px',
    marginBottom: '24px',
    fontFamily: 'Georgia, serif',
  };

  const tabStyle = (active) => ({
    padding: '10px 28px',
    background: active ? '#27AE60' : 'rgba(39,174,96,0.12)',
    color: active ? '#fff' : '#9bcea8',
    border: active ? '1px solid #27AE60' : '1px solid rgba(39,174,96,0.3)',
    borderRadius: '6px 6px 0 0',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '15px',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.2s',
    marginRight: '4px',
  });

  const toggleStyle = (active, color) => ({
    padding: '8px 18px',
    background: active ? color : 'rgba(30,40,35,0.7)',
    color: active ? '#fff' : '#888',
    border: `1px solid ${active ? color : 'rgba(255,255,255,0.2)'}`,
    borderRadius: '20px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '13px',
    transition: 'all 0.3s',
    marginRight: '8px',
  });

  return (
    <div style={{
      background: 'radial-gradient(ellipse at 40% 30%, #0d2b1a 0%, #071a10 45%, #03090a 100%)',
      minHeight: '100vh',
      padding: '40px 32px',
      fontFamily: 'Georgia, serif',
      color: '#d4e8da',
    }}>
      {/* PART INDICATOR */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span style={{ color: '#27AE60', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Part 18 of 21 · Kant's Critical Philosophy
        </span>
      </div>

      {/* TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h1 style={{ color: '#e8f5e9', fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1.3' }}>
          Teleology and the Purposiveness of Nature
        </h1>
        <p style={{ color: '#81c784', fontSize: '15px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6', fontStyle: 'italic' }}>
          Organisms cannot be fully understood through mechanical principles alone; reflective teleological judgment provides a regulative framework for biological investigation without positing non-physical causes.
        </p>
      </div>

      {/* 1. THE PROBLEM PANEL */}
      <div style={{ maxWidth: '900px', margin: '0 auto 28px auto' }}>
        <div style={panelStyle}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#27AE60', marginBottom: '12px', fontWeight: 'bold' }}>
            The Problem
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.75', color: '#c8e6c9', margin: 0 }}>
            The aesthetic analysis showed beauty and genius in human experience, but the third Critique must also explain how we understand living organisms — which exhibit organization, self-reproduction, and adaptive behavior that seem to resist purely mechanical explanation yet cannot invoke supernatural forces without violating scientific methodology. A clock yields its secrets to physics alone. A tree that repairs its own bark, grows toward light, and reproduces its form does not. Something is missing from the mechanical picture, and filling that gap without abandoning rigorous science is the urgent philosophical demand this section must answer.
          </p>
        </div>
      </div>

      {/* 2. MAIN VISUALIZATION */}
      <div style={{ maxWidth: '900px', margin: '0 auto 28px auto' }}>
        <div style={{
          background: 'rgba(10,22,15,0.92)',
          border: '1px solid rgba(39,174,96,0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {/* Tabs */}
          <div style={{ padding: '24px 28px 0 28px', borderBottom: '1px solid rgba(39,174,96,0.2)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#27AE60', marginBottom: '16px', fontWeight: 'bold' }}>
              Core Visualization — Natural Purpose vs. Mechanism
            </div>
            <div style={{ display: 'flex', marginBottom: '-1px' }}>
              <button style={tabStyle(activeTab === 'clock')} onClick={() => setActiveTab('clock')}>
                Clock — Pure Mechanism
              </button>
              <button style={tabStyle(activeTab === 'tree')} onClick={() => setActiveTab('tree')}>
                Tree — Natural Purpose
              </button>
              <button style={tabStyle(activeTab === 'darwin')} onClick={() => { setActiveTab('darwin'); setShowDarwin(true); }}>
                Darwin's Bridge
              </button>
            </div>
          </div>

          <div style={{ padding: '28px' }}>
            {/* CLOCK TAB */}
            {activeTab === 'clock' && (
              <div>
                <p style={{ color: '#9bcea8', fontSize: '14px', lineHeight: '1.65', marginBottom: '20px', maxWidth: '700px' }}>
                  In a clock, every part is externally assembled for a purpose imposed from outside by the watchmaker. Causes precede effects in strict linear sequence. Click any part to see the one-directional causal arrow — no part helps produce any other part.
                </p>
                <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '0 0 auto' }}>
                    <svg width="340" height="310" style={{ display: 'block' }}>
                      {/* Clock face background */}
                      <circle cx="210" cy="170" r="110" fill="rgba(30,50,40,0.4)" stroke="rgba(39,174,96,0.2)" strokeWidth="1" />
                      <circle cx="210" cy="170" r="108" fill="none" stroke="rgba(39,174,96,0.08)" strokeWidth="1" />

                      {/* Gear decorative lines */}
                      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
                        <line key={a}
                          x1={210 + 95 * Math.cos(a * Math.PI / 180)}
                          y1={170 + 95 * Math.sin(a * Math.PI / 180)}
                          x2={210 + 108 * Math.cos(a * Math.PI / 180)}
                          y2={170 + 108 * Math.sin(a * Math.PI / 180)}
                          stroke="rgba(39,174,96,0.3)" strokeWidth="2"
                        />
                      ))}

                      {/* Clock hands animation */}
                      <line
                        x1="210" y1="170"
                        x2={210 + 50 * Math.cos((animFrame * 6 - 90) * Math.PI / 180)}
                        y2={170 + 50 * Math.sin((animFrame * 6 - 90) * Math.PI / 180)}
                        stroke="#27AE60" strokeWidth="3" strokeLinecap="round"
                        opacity="0.5"
                      />
                      <line
                        x1="210" y1="170"
                        x2={210 + 35 * Math.cos((animFrame * 0.5 - 90) * Math.PI / 180)}
                        y2={170 + 35 * Math.sin((animFrame * 0.5 - 90) * Math.PI / 180)}
                        stroke="#81c784" strokeWidth="4" strokeLinecap="round"
                        opacity="0.5"
                      />

                      {/* Arrow for selected clock part */}
                      {clockArrow && (
                        <g>
                          <defs>
                            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                              <polygon points="0 0, 8 3, 0 6" fill="#F39C12" />
                            </marker>
                          </defs>
                          <line
                            x1={clockArrow.x1} y1={clockArrow.y1}
                            x2={clockArrow.x2} y2={clockArrow.y2}
                            stroke="#F39C12" strokeWidth="2.5" strokeDasharray="6 3"
                            markerEnd="url(#arrowhead)"
                            opacity={0.7 + 0.3 * pulse}
                          />
                        </g>
                      )}

                      {/* Clock parts */}
                      {clockParts.map(part => (
                        <g key={part.id}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedClockPart(selectedClockPart === part.id ? null : part.id)}
                        >
                          <circle
                            cx={part.cx} cy={part.cy} r={part.r}
                            fill={selectedClockPart === part.id ? 'rgba(243,156,18,0.35)' : 'rgba(39,174,96,0.12)'}
                            stroke={selectedClockPart === part.id ? '#F39C12' : 'rgba(39,174,96,0.5)'}
                            strokeWidth={selectedClockPart === part.id ? 2.5 : 1.5}
                          />
                          {/* Gear teeth visual */}
                          {[0,45,90,135,180,225,270,315].map(a => (
                            <rect key={a}
                              x={part.cx + (part.r - 3) * Math.cos(a * Math.PI / 180) - 3}
                              y={part.cy + (part.r - 3) * Math.sin(a * Math.PI / 180) - 3}
                              width="6" height="6"
                              fill={selectedClockPart === part.id ? 'rgba(243,156,18,0.5)' : 'rgba(39,174,96,0.3)'}
                              transform={`rotate(${a}, ${part.cx + (part.r - 3) * Math.cos(a * Math.PI / 180)}, ${part.cy + (part.r - 3) * Math.sin(a * Math.PI / 180)})`}
                              rx="1"
                            />
                          ))}
                          <text x={part.cx} y={part.cy + 1} textAnchor="middle" dominantBaseline="middle"
                            fill={selectedClockPart === part.id ? '#F39C12' : '#9bcea8'}
                            fontSize="9" fontFamily="Georgia, serif">
                            {part.label}
                          </text>
                        </g>
                      ))}

                      {/* Label: LINEAR */}
                      <text x="50" y="295" fill="rgba(243,156,18,0.7)" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">
                        Linear causal chain — no circularity
                      </text>
                    </svg>
                  </div>

                  {/* Clock description panel */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    {selectedClock ? (
                      <div style={{
                        background: 'rgba(243,156,18,0.08)',
                        border: '1px solid rgba(243,156,18,0.35)',
                        borderRadius: '8px',
                        padding: '18px',
                      }}>
                        <div style={{ color: '#F39C12', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>
                          {selectedClock.label}
                        </div>
                        <p style={{ color: '#e0c978', fontSize: '13px', lineHeight: '1.7', margin: '0 0 12px 0' }}>
                          {selectedClock.desc}
                        </p>
                        <div style={{ color: 'rgba(243,156,18,0.6)', fontSize: '12px', fontStyle: 'italic' }}>
                          {selectedClock.causes
                            ? `Causes → ${clockParts.find(p => p.id === selectedClock.causes)?.label}`
                            : 'Terminal effect — causes nothing further.'}
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: '#5a8a6a', fontSize: '13px', lineHeight: '1.7', paddingTop: '12px' }}>
                        <div style={{ color: '#27AE60', fontWeight: 'bold', marginBottom: '10px' }}>What makes a clock purely mechanical?</div>
                        <p>Each part is shaped externally by a craftsman. The clock has no capacity to repair itself, reproduce, or reorganize in response to damage. Remove any part and the rest cannot compensate. The purpose of the clock exists only in the mind of its maker — never in the clock itself.</p>
                        <p style={{ marginTop: '12px' }}>Click any part to trace the one-way causal arrow — this is what Kant calls mechanism: linear, external, non-purposive.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TREE TAB */}
            {activeTab === 'tree' && (
              <div>
                <p style={{ color: '#9bcea8', fontSize: '14px', lineHeight: '1.65', marginBottom: '16px', maxWidth: '700px' }}>
                  In an organism, each part exists both for the whole and through the whole. Click any part to see the web of mutual causation. Toggle mechanism and teleology to see what happens when each is removed.
                </p>

                {/* Toggles */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <button style={toggleStyle(mechanismOn, '#3498DB')} onClick={() => setMechanismOn(!mechanismOn)}>
                    {mechanismOn ? '■' : '□'} Mechanism {mechanismOn ? 'ON' : 'OFF'}
                  </button>
                  <button style={toggleStyle(teleologyOn, '#27AE60')} onClick={() => setTeleologyOn(!teleologyOn)}>
                    {teleologyOn ? '■' : '□'} Teleology {teleologyOn ? 'ON' : 'OFF'}
                  </button>
                  {!mechanismOn && !teleologyOn && (
                    <span style={{ color: '#E74C3C', fontSize: '12px', fontStyle: 'italic' }}>
                      Both removed — organism collapses
                    </span>
                  )}
                  {!mechanismOn && teleologyOn && (
                    <span style={{ color: '#27AE60', fontSize: '12px', fontStyle: 'italic' }}>
                      Teleology guides, mechanism explains — the Kantian balance
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '0 0 auto' }}>
                    <svg width="340" height="330" style={{ display: 'block' }}>
                      <defs>
                        <marker id="biArrow1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                          <polygon points="0 0, 7 2.5, 0 5" fill="#27AE60" opacity="0.8" />
                        </marker>
                        <marker id="biArrow2" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto-start-reverse">
                          <polygon points="0 0, 7 2.5, 0 5" fill="#27AE60" opacity="0.8" />
                        </marker>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <radialGradient id="groundGrad" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#3E2723" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#1B0000" stopOpacity="0.3" />
                        </radialGradient>
                      </defs>

                      {/* Ground */}
                      <ellipse cx="180" cy="310" rx="120" ry="18" fill="url(#groundGrad)" />

                      {/* Bi-directional arrows (teleology on) */}
                      {teleologyOn && treeArrows.map(arrow => {
                        const dx = arrow.x2 - arrow.x1;
                        const dy = arrow.y2 - arrow.y1;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const ox = -dy / dist * 8;
                        const oy = dx / dist * 8;
                        const progress = (animFrame % 90) / 90;
                        const dotX = arrow.x1 + dx * progress + ox;
                        const dotY = arrow.y1 + dy * progress + oy;
                        return (
                          <g key={arrow.key} opacity={0.55}>
                            <line
                              x1={arrow.x1 + ox} y1={arrow.y1 + oy}
                              x2={arrow.x2 + ox} y2={arrow.y2 + oy}
                              stroke="#27AE60" strokeWidth="1.5"
                              strokeDasharray="4 4"
                              markerEnd="url(#biArrow1)"
                            />
                            <circle cx={dotX} cy={dotY} r="3" fill="#27AE60" opacity="0.9" />
                          </g>
                        );
                      })}

                      {/* Tree trunk */}
                      {mechanismOn && (
                        <g transform={`translate(${wiltOffset * 0.3}, ${wiltOffset}) scale(${treeScale})`} style={{ transformOrigin: '185px 290px' }}>
                          <rect x="175" y={190 + wiltOffset * 0.5} width="22" height={100 - wiltOffset * 0.5}
                            fill="#6D4C41" rx="3" opacity={treeOpacity} />
                          {/* Main branches */}
                          <line x1="186" y1={200 + wiltOffset * 0.3} x2={160 - wiltOffset * 0.5} y2={155 + wiltOffset * 0.8}
                            stroke="#6D4C41" strokeWidth="10" strokeLinecap="round" opacity={treeOpacity} />
                          <line x1="186" y1={200 + wiltOffset * 0.3} x2={215 + wiltOffset * 0.3} y2={155 + wiltOffset * 0.8}
                            stroke="#6D4C41" strokeWidth="10" strokeLinecap="round" opacity={treeOpacity} />
                          <line x1="186" y1={180 + wiltOffset * 0.2} x2="186" y2={140 + wiltOffset * 0.6}
                            stroke="#6D4C41" strokeWidth="8" strokeLinecap="round" opacity={treeOpacity} />
                          {/* Sub-branches */}
                          <line x1={160 - wiltOffset * 0.3} y1={165 + wiltOffset * 0.6} x2={140 - wiltOffset * 0.5} y2={130 + wiltOffset}
                            stroke="#6D4C41" strokeWidth="5" strokeLinecap="round" opacity={treeOpacity} />
                          <line x1={215 + wiltOffset * 0.2} y1={165 + wiltOffset * 0.6} x2={240 + wiltOffset * 0.3} y2={125 + wiltOffset}
                            stroke="#6D4C41" strokeWidth="5" strokeLinecap="round" opacity={treeOpacity} />
                          {/* Canopy */}
                          {teleologyOn && (
                            <>
                              <ellipse cx={186} cy={108 + wiltOffset * 0.5} rx={52 - wiltOffset * 0.3} ry={38 - wiltOffset * 0.2}
                                fill="rgba(39,174,96,0.18)" stroke="#27AE60" strokeWidth="1" opacity={treeOpacity}
                                filter="url(#glow)" />
                              <ellipse cx={148 - wiltOffset * 0.3} cy={122 + wiltOffset * 0.5} rx={28 - wiltOffset * 0.2} ry={20}
                                fill="rgba(39,174,96,0.15)" stroke="#27AE60" strokeWidth="1" opacity={treeOpacity} />
                              <ellipse cx={228 + wiltOffset * 0.2} cy={115 + wiltOffset * 0.4} rx={30} ry={22}
                                fill="rgba(39,174,96,0.15)" stroke="#27AE60" strokeWidth="1" opacity={treeOpacity} />
                            </>
                          )}
                          {/* Roots */}
                          <line x1="182" y1="288" x2={155 - wiltOffset * 0.3} y2={308 + wiltOffset * 0.2}
                            stroke="#5D4037" strokeWidth="6" strokeLinecap="round" opacity={treeOpacity * 0.8} />
                          <line x1="190" y1="288" x2={215 + wiltOffset * 0.2} y2={308 + wiltOffset * 0.2}
                            stroke="#5D4037" strokeWidth="6" strokeLinecap="round" opacity={treeOpacity * 0.8} />
                          <line x1="186" y1="285" x2="186" y2={312 + wiltOffset * 0.1}
                            stroke="#5D4037" strokeWidth="5" strokeLinecap="round" opacity={treeOpacity * 0.8} />
                        </g>
                      )}

                      {/* If no mechanism: ghost outline */}
                      {!mechanismOn && (
                        <g opacity="0.2">
                          <rect x="175" y="190" width="22" height="100" fill="#6D4C41" rx="3" strokeDasharray="4 4" stroke="#888" />
                        </g>
                      )}

                      {/* Tree parts — clickable */}
                      {treeParts.map(part => (
                        <g key={part.id}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedTreePart(selectedTreePart === part.id ? null : part.id)}
                        >
                          <circle
                            cx={part.cx} cy={part.cy} r={part.r + 4}
                            fill="transparent"
                          />
                          <circle
                            cx={part.cx} cy={part.cy} r={part.r}
                            fill={selectedTreePart === part.id ? `${part.color}44` : `${part.color}22`}
                            stroke={selectedTreePart === part.id ? part.color : `${part.color}80`}
                            strokeWidth={selectedTreePart === part.id ? 2.5 : 1.5}
                            filter={selectedTreePart === part.id ? 'url(#glow)' : 'none'}
                          />
                          <text x={part.cx} y={part.cy + 1} textAnchor="middle" dominantBaseline="middle"
                            fill={selectedTreePart === part.id ? part.color : '#9bcea8'}
                            fontSize="9" fontFamily="Georgia, serif">
                            {part.label}
                          </text>
                        </g>
                      ))}

                      {/* Circular causality label */}
                      {teleologyOn && (
                        <text x="18" y="325" fill="rgba(39,174,96,0.7)" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                          Circular causality — each part for the whole
                        </text>
                      )}
                      {!teleologyOn && (
                        <text x="30" y="325" fill="rgba(231,76,60,0.6)" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                          Teleology removed — incomplete picture
                        </text>
                      )}
                    </svg>
                  </div>

                  {/* Tree description panel */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    {selectedTree ? (
                      <div style={{
                        background: `${selectedTree.color}14`,
                        border: `1px solid ${selectedTree.color}55`,
                        borderRadius: '8px',
                        padding: '18px',
                      }}>
                        <div style={{ color: selectedTree.color, fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                          {selectedTree.label}
                        </div>
                        <p style={{ color: '#c8e6c9', fontSize: '13px', lineHeight: '1.7', margin: '0 0 12px 0' }}>
                          {selectedTree.desc}
                        </p>
                        <div style={{ color: 'rgba(39,174,96,0.7)', fontSize: '12px', fontStyle: 'italic' }}>
                          ↔ Mutually causes and is caused by all other parts — this is circular causality.
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: '#5a8a6a', fontSize: '13px', lineHeight: '1.7', paddingTop: '8px' }}>
                        <div style={{ color: '#27AE60', fontWeight: 'bold', marginBottom: '10px' }}>Natural Purpose — Circular Causality</div>
                        <p>Kant defines a natural purpose as a being that is simultaneously cause and effect of itself. Every part exists both because of the whole and for the whole. No part is merely a passive cog — each contributes to producing and maintaining the others.</p>
                        <p style={{ marginTop: '12px' }}>Toggle mechanism off to see the structure collapse — mechanism is necessary. Toggle teleology off to see how the picture becomes incomplete. Both are needed, at different methodological levels.</p>
                        <p style={{ marginTop: '12px' }}>Click any part to see the web of mutual causation that no linear model can capture.</p>
                      </div>
                    )}

                    {/* Regulative vs Constitutive */}
                    <div style={{
                      marginTop: '16px',
                      background: 'rgba(39,174,96,0.07)',
                      border: '1px solid rgba(39,174,96,0.2)',
                      borderRadius: '8px',
                      padding: '14px',
                    }}>
                      <div style={{ color: '#27AE60', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '1px' }}>
                        REGULATIVE vs. CONSTITUTIVE
                      </div>
                      <p style={{ color: '#9bcea8', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                        Teleological judgment is <em style={{ color: '#c8e6c9' }}>regulative</em>: we judge organisms <em>as if</em> they were natural purposes. This is a methodological stance, not a metaphysical claim. We do not assert that non-physical causes operate in organisms — we use purposive concepts as a heuristic guide where mechanical models prove insufficient.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Antinomy panel */}
                <div style={{
                  marginTop: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <div style={{
                    background: 'rgba(52,152,219,0.08)',
                    border: '1px solid rgba(52,152,219,0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}>
                    <div style={{ color: '#3498DB', fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>
                      THESIS
                    </div>
                    <p style={{ color: '#aed6f1', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>
                      All production of material things and their forms must be judged as possible according to merely mechanical laws. Mechanical explanation must be pursued as far as possible — it is the foundation of natural science.
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(39,174,96,0.08)',
                    border: '1px solid rgba(39,174,96,0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}>
                    <div style={{ color: '#27AE60', fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>
                      ANTITHESIS
                    </div>
                    <p style={{ color: '#c8e6c9', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>
                      Some products of material nature cannot be judged as possible according to merely mechanical laws. Organisms exhibit organization that demands teleological concepts as a supplementary investigative framework.
                    </p>
                  </div>
                  <div style={{
                    gridColumn: '1 / -1',
                    background: 'rgba(230,200,50,0.06)',
                    border: '1px solid rgba(230,200,50,0.25)',
                    borderRadius: '8px',
                    padding: '14px',
                    textAlign: 'center',
                  }}>
                    <span style={{ color: '#e6c832', fontSize: '12px', fontStyle: 'italic' }}>
                      Resolution: Both are true at different levels — mechanism as constitutive science, teleology as regulative heuristic. The antinomy dissolves when we distinguish what we can know from how we must investigate.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* DARWIN TAB */}
            {activeTab === 'darwin' && (
              <div>
                <p style={{ color: '#9bcea8', fontSize: '14px', lineHeight: '1.65', marginBottom: '24px', maxWidth: '700px' }}>
                  Kant left a gap: teleological concepts guide investigation but cannot be given a mechanical explanation. Darwin filled precisely this gap — natural selection provides a mechanical account of apparent design. This is the bridge Kant left open.
                </p>

                {/* Three-column evolution diagram */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                  {/* Kant box */}
                  <div style={{
                    background: 'rgba(39,174,96,0.1)',
                    border: '2px solid rgba(39,174,96,0.5)',
                    borderRadius: '10px',
                    padding: '20px 18px',
                    width: '200px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: '#27AE60', fontSize: '16px', marginBottom: '6px' }}>Kant</div>
                    <div style={{ color: '#c8e6c9', fontSize: '11px', lineHeight: '1.6' }}>
                      Teleological judgment is <em>regulative</em>. We must judge organisms as-if purposive, but cannot explain <em>how</em> this purposiveness arises mechanically.
                    </div>
                    <div style={{
                      marginTop: '10px',
                      background: 'rgba(39,174,96,0.15)',
                      borderRadius: '4px',
                      padding: '6px',
                      color: '#81c784',
                      fontSize: '11px',
                      fontStyle: 'italic',
                    }}>
                      Gap: no mechanical account of apparent design
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#F39C12', fontSize: '28px', lineHeight: '1' }}>→</div>
                    <div style={{ color: '#F39C12', fontSize: '10px', fontStyle: 'italic', marginTop: '4px' }}>fills gap</div>
                  </div>

                  {/* Darwin box */}
                  <div style={{
                    background: 'rgba(243,156,18,0.1)',
                    border: '2px solid rgba(243,156,18,0.5)',
                    borderRadius: '10px',
                    padding: '20px 18px',
                    width: '200px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: '#F39C12', fontSize: '16px', marginBottom: '6px' }}>Darwin</div>
                    <div style={{ color: '#e8d5a0', fontSize: '11px', lineHeight: '1.6' }}>
                      Natural selection provides a <em>purely mechanical</em> account of how adaptive organization arises — survival, variation, inheritance over time.
                    </div>
                    <div style={{
                      marginTop: '10px',
                      background: 'rgba(243,156,18,0.12)',
                      borderRadius: '4px',
                      padding: '6px',
                      color: '#f0c060',
                      fontSize: '11px',
                      fontStyle: 'italic',
                    }}>
                      Mechanical teleology — purpose without a purposer
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#9B59B6', fontSize: '28px', lineHeight: '1' }}>→</div>
                    <div style={{ color: '#9B59B6', fontSize: '10px', fontStyle: 'italic', marginTop: '4px' }}>extends to</div>
                  </div>

                  {/* Systems Biology box */}
                  <div style={{
                    background: 'rgba(155,89,182,0.1)',
                    border: '2px solid rgba(155,89,182,0.5)',
                    borderRadius: '10px',
                    padding: '20px 18px',
                    width: '200px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: '#9B59B6', fontSize: '14px', marginBottom: '6px' }}>Systems Biology</div>
                    <div style={{ color: '#d8c0e8', fontSize: '11px', lineHeight: '1.6' }}>
                      Circular causality, feedback networks, self-organization — Kant's concepts become technical vocabulary in contemporary biological science.
                    </div>
                    <div style={{
                      marginTop: '10px',
                      background: 'rgba(155,89,182,0.12)',
                      borderRadius: '4px',
                      padding: '6px',
                      color: '#c39bd3',
                      fontSize: '11px',
                      fontStyle: 'italic',
                    }}>
                      Regulative becomes investigative program
                    </div>
                  </div>
                </div>

                {/* Natural selection diagram */}
                <div style={{
                  background: 'rgba(243,156,18,0.06)',
                  border: '1px solid rgba(243,156,18,0.25)',
                  borderRadius: '10px',
                  padding: '20px 24px',
                }}>
                  <div style={{ color: '#F39C12', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '14px' }}>
                    NATURAL SELECTION AS MECHANICAL TELEOLOGY
                  </div>
                  <svg width="100%" height="80" style={{ display: 'block' }}>
                    {['Variation', 'Selection', 'Inheritance', 'Adaptation'].map((step, i) => {
                      const x = i * 25 + 5;
                      const active = Math.floor(animFrame / 60) % 4 === i;
                      return (
                        <g key={step}>
                          <rect x={`${x}%`} y="15" width="18%" height="50"
                            rx="6"
                            fill={active ? 'rgba(243,156,18,0.25)' : 'rgba(243,156,18,0.08)'}
                            stroke={active ? '#F39C12' : 'rgba(243,156,18,0.35)'}
                            strokeWidth={active ? 2 : 1}
                          />
                          <text x={`${x + 9}%`} y="44" textAnchor="middle"
                            fill={active ? '#F39C12' : '#c8a85a'}
                            fontSize="12" fontFamily="Georgia, serif">
                            {step}
                          </text>
                          {i < 3 && (
                            <text x={`${x + 23}%`} y="44" textAnchor="middle" fill="rgba(243,156,18,0.5)" fontSize="18">→</text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                  <p style={{ color: '#c8a85a', fontSize: '13px', lineHeight: '1.65', margin: '10px 0 0 0' }}>
                    Darwin explicitly acknowledged Kant's teleological analysis. Natural selection vindicates the regulative use of teleological concepts by providing the mechanical story: apparent purposes arise through blind variation selected by environmental pressure — no designer, no vitalism, yet genuine organization. Kant's framework predicted that such a mechanical account was both needed and possible.
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Key Concepts Row */}
          <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(39,174,96,0.15)', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'Natural Purpose', desc: 'Being simultaneously cause and effect of itself' },
              { label: 'Circular Causality', desc: 'Parts produce whole; whole produces parts' },
              { label: 'Regulative Teleology', desc: 'Judge as-if purposive without claiming metaphysical fact' },
              { label: 'Antinomy Resolved', desc: 'Mechanism + teleology at different methodological levels' },
              { label: 'Self-Organization', desc: 'Contemporary systems biology operationalizes this concept' },
            ].map((concept) => (
              <div key={concept.label}
                onMouseEnter={() => setHoveredPill(concept.label)}
                onMouseLeave={() => setHoveredPill(null)}
                style={{
                  padding: '8px 14px',
                  background: hoveredPill === concept.label ? 'rgba(39,174,96,0.2)' : 'rgba(39,174,96,0.07)',
                  border: `1px solid ${hoveredPill === concept.label ? '#27AE60' : 'rgba(39,174,96,0.3)'}`,
                  borderRadius: '20px',
                  cursor: 'default',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}>
                <span style={{ color: '#c8e6c9', fontSize: '12px', fontFamily: 'Georgia, serif' }}>{concept.label}</span>
                {hoveredPill === concept.label && (
                  <div style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#0a1a0f',
                    border: '1px solid rgba(39,174,96,0.4)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    width: '180px',
                    color: '#9bcea8',
                    fontSize: '11px',
                    lineHeight: '1.5',
                    zIndex: 10,
                    textAlign: 'center',
                    whiteSpace: 'normal',
                  }}>
                    {concept.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ maxWidth: '900px', margin: '0 auto 24px auto' }}>
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(39,174,96,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)" }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#27AE60', marginBottom: '14px' }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: hoveredConcept ? '16px' : '0' }}>
          {keyConcepts.map(c => (
            <div
              key={c.id}
              onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
              style={{
                padding: '6px 14px',
                background: hoveredConcept === c.id ? '#27AE60' : 'rgba(39,174,96,0.1)',
                border: `1px solid ${hoveredConcept === c.id ? '#4fd080' : 'rgba(39,174,96,0.35)'}`,
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer',
                color: hoveredConcept === c.id ? '#f0ead8' : '#5acea8',
                transition: 'all 0.2s',
                fontFamily: 'Georgia, serif',
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{
            background: 'rgba(39,174,96,0.08)',
            border: '1px solid rgba(39,174,96,0.3)',
            borderRadius: '6px',
            padding: '16px 20px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#27AE60', marginBottom: '8px' }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.label}
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.75', color: '#c8c0b4' }}>
              {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
            </p>
          </div>
        )}
        </div>
      </div>

      {/* 3. THE DIFFICULTY PANEL */}
      <div style={{ maxWidth: '900px', margin: '0 auto 24px auto' }}>
        <div style={{
          background: 'rgba(15,25,20,0.85)',
          border: '1px solid rgba(39,174,96,0.2)',
          borderLeft: '4px solid #1a7a42',
          borderRadius: '10px',
          padding: '28px 32px',
          fontFamily: 'Georgia, serif',
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#1a9a52', marginBottom: '12px', fontWeight: 'bold' }}>
            The Difficulty
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.75', color: '#b0d4b8', margin: 0 }}>
            The teleological analysis completes the third Critique's bridge between nature and freedom, resolving the antinomy and positioning teleological judgment as a regulative supplement to mechanical science. Yet this very completion raises a new, larger question: the three Critiques — of pure reason, practical reason, and judgment — have now addressed knowledge, morality, and the reflective judgment of beauty and organisms. But how do these three interlocking architectures form a unified philosophical system? What is the single coherent vision behind them, and what has Kant's critical philosophy permanently contributed to how we think about science, ethics, politics, aesthetics, and human culture? The system as a whole demands to be understood.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#7aaa8a', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This pressure forces the next development: a synoptic view of the three Critiques as a unified system and an assessment of Kant's enduring philosophical legacy across every domain of modern thought.
          </p>
        </div>
      </div>

      {/* 4. REAL-WORLD ECHOES (collapsible) */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(15,25,20,0.85)',
          border: '1px solid rgba(39,174,96,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={() => setHoveredButton('echoes')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: '100%',
              background: hoveredButton === 'echoes' ? 'rgba(39,174,96,0.12)' : 'transparent',
              border: 'none',
              padding: '20px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}>
            <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#27AE60', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={18} color="#27AE60" />
              : <ChevronDown size={18} color="#27AE60" />
            }
          </button>

          {echosOpen && (
            <div style={{ padding: '0 32px 28px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {[
                  {
                    title: 'Darwin and Natural Selection',
                    icon: '🌱',
                    text: 'Darwin explicitly engaged with Kant\'s teleological analysis in the Origin of Species. Natural selection provides the mechanical story that Kant said was needed: adaptive organization emerges from blind variation under environmental pressure. Purpose without a purposer — mechanical teleology realized.'
                  },
                  {
                    title: 'Systems Biology',
                    icon: '⚙',
                    text: 'Contemporary systems biology uses exactly the concepts Kant identified: circular causality, feedback networks, self-organization, emergent properties. When biologists model gene regulatory networks as self-sustaining loops, they operationalize Kant\'s natural purpose under a new name.'
                  },
                  {
                    title: 'Ecology and Environmental Science',
                    icon: '🌍',
                    text: 'Environmental scientists understand ecosystems as integrated wholes through feedback relationships — nutrient cycles, predator-prey dynamics, climate feedbacks — that resist reduction to independent linear mechanisms. The ecosystem behaves as Kant\'s natural purpose writ large.'
                  },
                ].map(item => (
                  <div key={item.title} style={{
                    background: 'rgba(39,174,96,0.06)',
                    border: '1px solid rgba(39,174,96,0.2)',
                    borderRadius: '8px',
                    padding: '18px',
                  }}>
                    <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                    <div style={{ color: '#27AE60', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</div>
                    <p style={{ color: '#9bcea8', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>{item.text}</p>
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

// ─── Part 19: Political Philosophy and the Ideal of Perpetual Peace ───
function PoliticalPhilosophyPerpetualPeace() {
  const [activeArticles, setActiveArticles] = useState({
    republican: false,
    federation: false,
    cosmopolitan: false
  });
  const [timelineYear, setTimelineYear] = useState(1795);
  const [hoveredNation, setHoveredNation] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredArticle, setHoveredArticle] = useState(null);

  const timelineEvents = [
    { year: 1795, label: "Kant's Perpetual Peace", type: "kant" },
    { year: 1815, label: "Concert of Europe", type: "partial" },
    { year: 1919, label: "League of Nations", type: "kantian" },
    { year: 1945, label: "United Nations Founded", type: "kantian" },
    { year: 1950, label: "European Coal & Steel Community", type: "kantian" },
    { year: 1957, label: "Treaty of Rome (EEC)", type: "kantian" },
    { year: 1993, label: "European Union Established", type: "kantian" },
    { year: 2002, label: "International Criminal Court", type: "kantian" },
    { year: 2024, label: "Present Day", type: "present" }
  ];

  const nations = [
    { id: "france", name: "France", x: 230, y: 140, w: 60, h: 50, color: "#1a3a5c", republican: true, federation: true },
    { id: "germany", name: "Germany", x: 295, y: 120, w: 65, h: 55, color: "#1a3a5c", republican: true, federation: true },
    { id: "uk", name: "UK", x: 185, y: 100, w: 45, h: 45, color: "#1a3a5c", republican: true, federation: true },
    { id: "russia", name: "Russia", x: 380, y: 80, w: 100, h: 80, color: "#3d1a1a", republican: false, federation: false },
    { id: "usa", name: "USA", x: 60, y: 130, w: 90, h: 65, color: "#1a3a5c", republican: true, federation: true },
    { id: "china", name: "China", x: 480, y: 130, w: 85, h: 70, color: "#3d1a1a", republican: false, federation: false },
    { id: "india", name: "India", x: 430, y: 200, w: 65, h: 55, color: "#2a3a1a", republican: true, federation: false },
    { id: "brazil", name: "Brazil", x: 130, y: 220, w: 70, h: 60, color: "#2a3a1a", republican: true, federation: false },
  ];

  const conflicts = [
    { from: "france", to: "germany", active: true },
    { from: "russia", to: "uk", active: true },
    { from: "china", to: "usa", active: true },
    { from: "russia", to: "germany", active: true },
  ];

  const federationLinks = [
    { from: "france", to: "germany" },
    { from: "france", to: "uk" },
    { from: "germany", to: "uk" },
    { from: "usa", to: "uk" },
    { from: "usa", to: "france" },
  ];

  const getNationCenter = (id) => {
    const n = nations.find(n => n.id === id);
    if (!n) return { x: 0, y: 0 };
    return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
  };

  const getNationColor = (nation) => {
    if (activeArticles.republican && nation.republican) {
      return "#1a4d7a";
    }
    if (activeArticles.republican && !nation.republican) {
      return "#5c1a1a";
    }
    return nation.color;
  };

  const getNationBorderColor = (nation) => {
    if (activeArticles.federation && nation.federation) return "#2980B9";
    if (activeArticles.republican && nation.republican) return "#4aa3df";
    return "#2a4a6a";
  };

  const currentEvents = timelineEvents.filter(e => e.year <= timelineYear);

  const concepts = [
    { id: "innate", label: "Innate Right to Freedom", desc: "Every person possesses independence from others' constraining will, insofar as consistent with universal freedom. Political institutions must protect this right — they cannot create what already exists by nature." },
    { id: "republican", label: "Republican Constitution", desc: "Not necessarily democracy, but: freedom for all as human beings, equality before the law, and independent citizenship participating in legislation. Separates the form of government from form of administration." },
    { id: "perpetual", label: "Perpetual Peace", desc: "Not merely a truce but a positive condition sustained by law. Requires three definitive articles working together: republican constitutions, a federation of free states, and cosmopolitan right." },
    { id: "cosmopolitan", label: "Cosmopolitan Right", desc: "The right of all persons to attempt peaceful contact anywhere on earth — not hospitality as a favor, but as a right. Strangers may not be treated as enemies. Commerce and enlightenment flow through this right." },
  ];

  const articles = [
    {
      id: "republican",
      title: "First Article: Republican Constitutions",
      short: "Republican",
      desc: "Republican constitutions make citizens reluctant to approve wars they themselves must bear the costs of — in blood, treasure, and reconstruction. When the people who decide war are the same people who suffer it, the calculus changes.",
      icon: "⚖"
    },
    {
      id: "federation",
      title: "Second Article: World Federation",
      short: "Federation",
      desc: "A federation of free states resolves disputes through law rather than force. Not a world government that absorbs sovereignty, but a voluntary league where member states commit to peaceful arbitration of conflicts.",
      icon: "🌐"
    },
    {
      id: "cosmopolitan",
      title: "Third Article: Cosmopolitan Right",
      short: "Cosmopolitan",
      desc: "Cosmopolitan right protects peaceful visitors and travelers — the universal right to attempt commerce, exchange, and contact across borders. This is the seed from which commerce, understanding, and peace grow.",
      icon: "✈"
    }
  ];

  const toggleArticle = (id) => {
    setActiveArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progressPercent = (timelineYear - 1795) / (2024 - 1795) * 100;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 20%, #0d2a3d 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d4dde8",
      padding: "0 0 60px 0"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{ padding: "40px 0 0 0" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#2980B9", textTransform: "uppercase", marginBottom: "8px" }}>
          Part 19 of 21 — Political Philosophy
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "normal", margin: "0 0 8px 0", color: "#e8f4fd", lineHeight: 1.3 }}>
          Political Philosophy and the Ideal of Perpetual Peace
        </h1>
        <p style={{ fontSize: "15px", color: "#8ab4cc", margin: "0", fontStyle: "italic", lineHeight: 1.6 }}>
          Kant grounded legitimate political authority in the protection of innate human freedom and envisioned a world federation of republican states as both a moral duty and a practical possibility.
        </p>
      </div>

      {/* THE PROBLEM PANEL */}
      <div style={{ margin: "32px 0 0 0" }}>
        <div style={{
          background: "#0f1a26",
          border: "1px solid #1a3a5c",
          borderLeft: "4px solid #2980B9",
          borderRadius: "6px",
          padding: "24px 28px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#2980B9", textTransform: "uppercase", marginBottom: "12px" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "15px", color: "#b8cfe0" }}>
            Having established that human beings are autonomous moral agents with unconditional dignity, we need to determine what political institutions and international arrangements are consistent with this dignity — and how moral principles can be realized in the actual historical world of competing states and powers. The moral law commands universally, but states wage war, dominate one another, and treat foreign persons as threats. The gap between the moral ideal and political reality demands an answer that is both principled and practical.
          </p>
        </div>
      </div>

      {/* MAIN VISUALIZATION */}
      <div style={{ margin: "32px 0 0 0" }}>
        <div style={{
          background: "#0a1520",
          border: "1px solid #1a3a5c",
          borderRadius: "8px",
          padding: "28px",
          overflow: "hidden"
        }}>
          <div style={{ fontSize: "13px", letterSpacing: "2px", color: "#4aa3df", textTransform: "uppercase", marginBottom: "6px" }}>
            The Architecture of Perpetual Peace
          </div>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#7a9ab5", lineHeight: 1.6 }}>
            Activate Kant's three definitive articles below to see how each transforms the international order. Adjust the timeline to watch real-world approximations emerge.
          </p>

          {/* Article Toggle Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            {articles.map(article => (
              <button
                key={article.id}
                onClick={() => toggleArticle(article.id)}
                onMouseEnter={() => setHoveredArticle(article.id)}
                onMouseLeave={() => setHoveredArticle(null)}
                style={{
                  background: activeArticles[article.id] ? "#2980B9" : (hoveredArticle === article.id ? "#1a3a5c" : "#0f2030"),
                  border: `1px solid ${activeArticles[article.id] ? "#4aa3df" : "#2a4a6a"}`,
                  borderRadius: "4px",
                  color: activeArticles[article.id] ? "#ffffff" : "#8ab4cc",
                  padding: "10px 18px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>{article.icon}</span>
                <span>{article.short} Constitution</span>
                {activeArticles[article.id] && <span style={{ fontSize: "10px", background: "#1a5a8a", padding: "2px 6px", borderRadius: "3px" }}>ACTIVE</span>}
              </button>
            ))}
            <button
              onClick={() => setActiveArticles({ republican: false, federation: false, cosmopolitan: false })}
              style={{
                background: "#0f1a26",
                border: "1px solid #3d1a1a",
                borderRadius: "4px",
                color: "#8a6a6a",
                padding: "10px 18px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "Georgia, serif"
              }}
            >
              Reset
            </button>
          </div>

          {/* Article Description Panel */}
          {Object.values(activeArticles).some(v => v) && (
            <div style={{
              background: "#0d2030",
              border: "1px solid #2980B9",
              borderRadius: "6px",
              padding: "16px 20px",
              marginBottom: "20px"
            }}>
              {articles.filter(a => activeArticles[a.id]).map((article, i) => (
                <div key={article.id} style={{ marginBottom: i < articles.filter(a => activeArticles[a.id]).length - 1 ? "12px" : "0" }}>
                  <div style={{ fontSize: "12px", color: "#4aa3df", marginBottom: "4px", letterSpacing: "1px" }}>{article.title}</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#b0c8dc", lineHeight: 1.7 }}>{article.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* SVG Map */}
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <svg width="100%" viewBox="0 0 620 300" style={{ display: "block", background: "#060e18", borderRadius: "6px", border: "1px solid #1a3a5c" }}>
              {/* Ocean texture lines */}
              {[50, 100, 150, 200, 250].map(y => (
                <line key={y} x1="0" y1={y} x2="620" y2={y} stroke="#0d2030" strokeWidth="1" />
              ))}

              {/* Conflict arrows */}
              {conflicts.map((conflict, i) => {
                const from = getNationCenter(conflict.from);
                const to = getNationCenter(conflict.to);
                const fromNation = nations.find(n => n.id === conflict.from);
                const toNation = nations.find(n => n.id === conflict.to);
                const bothRepublican = activeArticles.republican && fromNation?.republican && toNation?.republican;
                const bothFederation = activeArticles.federation && fromNation?.federation && toNation?.federation;
                if (bothFederation) return null;
                const opacity = bothRepublican ? 0.3 : 0.8;
                const color = bothRepublican ? "#7a3333" : "#cc2222";
                const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 20 };
                return (
                  <g key={i}>
                    <path
                      d={`M${from.x},${from.y} Q${mid.x},${mid.y} ${to.x},${to.y}`}
                      stroke={color}
                      strokeWidth={bothRepublican ? "1" : "1.5"}
                      fill="none"
                      opacity={opacity}
                      strokeDasharray={bothRepublican ? "4,4" : "none"}
                    />
                    <polygon
                      points={`${to.x},${to.y} ${to.x - 5},${to.y - 8} ${to.x + 5},${to.y - 8}`}
                      fill={color}
                      opacity={opacity}
                      transform={`rotate(${Math.atan2(to.y - mid.y, to.x - mid.x) * 180 / Math.PI + 90}, ${to.x}, ${to.y})`}
                    />
                  </g>
                );
              })}

              {/* Federation legal links */}
              {activeArticles.federation && federationLinks.map((link, i) => {
                const from = getNationCenter(link.from);
                const to = getNationCenter(link.to);
                const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 15 };
                return (
                  <path
                    key={i}
                    d={`M${from.x},${from.y} Q${mid.x},${mid.y} ${to.x},${to.y}`}
                    stroke="#2980B9"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                    strokeDasharray="6,3"
                  />
                );
              })}

              {/* Cosmopolitan movement arrows */}
              {activeArticles.cosmopolitan && [
                { x1: 210, y1: 160, x2: 270, y2: 145 },
                { x1: 155, y1: 220, x2: 200, y2: 180 },
                { x1: 340, y1: 160, x2: 400, y2: 180 },
                { x1: 460, y1: 175, x2: 430, y2: 220 },
              ].map((arrow, i) => (
                <g key={i}>
                  <line
                    x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2}
                    stroke="#27ae60" strokeWidth="1.5" opacity="0.7"
                  />
                  <circle cx={arrow.x1} cy={arrow.y1} r="3" fill="#27ae60" opacity="0.8" />
                </g>
              ))}

              {/* Nations */}
              {nations.map(nation => (
                <g key={nation.id}>
                  <rect
                    x={nation.x} y={nation.y} width={nation.w} height={nation.h}
                    rx="4"
                    fill={getNationColor(nation)}
                    stroke={getNationBorderColor(nation)}
                    strokeWidth={hoveredNation === nation.id ? "2" : "1"}
                    style={{ cursor: "pointer", transition: "all 0.4s ease" }}
                    onMouseEnter={() => setHoveredNation(nation.id)}
                    onMouseLeave={() => setHoveredNation(null)}
                    opacity={hoveredNation && hoveredNation !== nation.id ? 0.7 : 1}
                  />
                  <text
                    x={nation.x + nation.w / 2}
                    y={nation.y + nation.h / 2 + 5}
                    textAnchor="middle"
                    fill={getNationBorderColor(nation)}
                    fontSize="11"
                    fontFamily="Georgia, serif"
                    style={{ pointerEvents: "none" }}
                  >
                    {nation.name}
                  </text>
                  {activeArticles.republican && (
                    <text
                      x={nation.x + nation.w / 2}
                      y={nation.y + nation.h / 2 - 8}
                      textAnchor="middle"
                      fill={nation.republican ? "#4aa3df" : "#cc4444"}
                      fontSize="9"
                      fontFamily="Georgia, serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {nation.republican ? "Rep." : "Autocracy"}
                    </text>
                  )}
                </g>
              ))}

              {/* Hovered nation tooltip */}
              {hoveredNation && (() => {
                const nation = nations.find(n => n.id === hoveredNation);
                if (!nation) return null;
                const cx = nation.x + nation.w / 2;
                const cy = nation.y - 20;
                return (
                  <g>
                    <rect x={cx - 60} y={cy - 18} width="120" height="20" rx="3" fill="#0d2030" stroke="#2980B9" strokeWidth="1" />
                    <text x={cx} y={cy - 4} textAnchor="middle" fill="#4aa3df" fontSize="10" fontFamily="Georgia, serif">
                      {nation.republican ? "Republican State" : "Non-Republican State"}
                    </text>
                  </g>
                );
              })()}

              {/* Legend */}
              <g transform="translate(10, 255)">
                <rect x="0" y="0" width="200" height="36" rx="3" fill="#060e18" stroke="#1a3a5c" strokeWidth="1" opacity="0.9" />
                {activeArticles.federation && (
                  <line x1="8" y1="10" x2="24" y2="10" stroke="#2980B9" strokeWidth="1.5" strokeDasharray="4,2" />
                )}
                {activeArticles.federation && (
                  <text x="28" y="14" fill="#4aa3df" fontSize="9" fontFamily="Georgia, serif">Legal federation links</text>
                )}
                {activeArticles.cosmopolitan && (
                  <circle cx="12" cy="27" r="3" fill="#27ae60" />
                )}
                {activeArticles.cosmopolitan && (
                  <text x="20" y="31" fill="#4aca80" fontSize="9" fontFamily="Georgia, serif">Cosmopolitan movement</text>
                )}
                {!activeArticles.federation && !activeArticles.cosmopolitan && (
                  <text x="8" y="22" fill="#4a6a8a" fontSize="9" fontFamily="Georgia, serif">Activate articles to see changes</text>
                )}
              </g>
            </svg>
          </div>

          {/* Timeline Slider */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "12px", letterSpacing: "2px", color: "#4aa3df", textTransform: "uppercase" }}>
                Historical Timeline
              </div>
              <div style={{ fontSize: "14px", color: "#e8f4fd", fontWeight: "bold" }}>
                {timelineYear === 1795 ? "1795 — Kant writes Perpetual Peace" : timelineYear + " CE"}
              </div>
            </div>
            <input
              type="range"
              min="1795"
              max="2024"
              value={timelineYear}
              onChange={(e) => setTimelineYear(parseInt(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#2980B9",
                cursor: "pointer",
                marginBottom: "12px"
              }}
            />
            <div style={{ position: "relative", height: "60px" }}>
              <div style={{ position: "absolute", top: "50%", left: "0", right: "0", height: "2px", background: "#1a3a5c", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "0", width: `${progressPercent}%`, height: "2px", background: "#2980B9", transform: "translateY(-50%)", transition: "width 0.2s" }} />
              {timelineEvents.map((event, i) => {
                const pct = (event.year - 1795) / (2024 - 1795) * 100;
                const isActive = event.year <= timelineYear;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${pct}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div style={{
                      width: event.type === "kantian" ? "10px" : "8px",
                      height: event.type === "kantian" ? "10px" : "8px",
                      borderRadius: "50%",
                      background: isActive ? (event.type === "kantian" ? "#2980B9" : event.type === "kant" ? "#e8c060" : "#60a860") : "#1a3a5c",
                      border: `2px solid ${isActive ? "#4aa3df" : "#2a4a6a"}`,
                      cursor: "pointer",
                      transition: "all 0.3s"
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.nextSibling.style.opacity = "1";
                        e.currentTarget.nextSibling.style.visibility = "visible";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.nextSibling.style.opacity = "0";
                        e.currentTarget.nextSibling.style.visibility = "hidden";
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#0d2030",
                      border: "1px solid #2980B9",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "10px",
                      color: "#4aa3df",
                      whiteSpace: "nowrap",
                      opacity: "0",
                      visibility: "hidden",
                      transition: "opacity 0.2s",
                      zIndex: 10
                    }}>
                      {event.year}: {event.label}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Active events */}
            <div style={{ marginTop: "8px", minHeight: "40px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {currentEvents.filter(e => e.type === "kantian").map((event, i) => (
                  <span key={i} style={{
                    background: "#0d2030",
                    border: "1px solid #2980B9",
                    borderRadius: "3px",
                    padding: "3px 8px",
                    fontSize: "11px",
                    color: "#4aa3df"
                  }}>
                    {event.year}: {event.label}
                  </span>
                ))}
                {currentEvents.filter(e => e.type === "kantian").length === 0 && (
                  <span style={{ fontSize: "12px", color: "#4a6a8a", fontStyle: "italic" }}>
                    Advance the timeline to see Kantian institutions emerge in history...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Three Forces Panel */}
          <div style={{ marginTop: "24px", background: "#060e18", border: "1px solid #1a3a5c", borderRadius: "6px", padding: "20px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "2px", color: "#4aa3df", textTransform: "uppercase", marginBottom: "12px" }}>
              Three Forces Supporting Peace's Practical Possibility
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {[
                { force: "Republican Constitutions", icon: "⚖", note: "Citizens who bear the costs of war resist its declaration" },
                { force: "Commercial Interdependence", icon: "⚓", note: "Trade creates mutual interest in stability and open borders" },
                { force: "Spread of Enlightenment", icon: "◎", note: "Reason and moral progress gradually overcome prejudice and aggression" }
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center", padding: "12px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ fontSize: "13px", color: "#e8f4fd", marginBottom: "6px" }}>{item.force}</div>
                  <div style={{ fontSize: "11px", color: "#6a96b8", lineHeight: 1.6, fontStyle: "italic" }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(41,128,185,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", margin: "24px 0" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#2980B9", marginBottom: 14 }}>
          Key Concepts — Click to Explore
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
          {concepts.map(concept => (
            <div key={concept.id} onClick={() => setHoveredConcept(hoveredConcept === concept.id ? null : concept.id)}
              style={{ padding: "6px 14px", background: hoveredConcept === concept.id ? "#2980B9" : "rgba(41,128,185,0.1)", border: `1px solid ${hoveredConcept === concept.id ? "#4aa3df" : "rgba(41,128,185,0.35)"}`, borderRadius: 20, fontSize: 12, cursor: "pointer", color: hoveredConcept === concept.id ? "#f0ead8" : "#6aa3cc", transition: "all 0.2s" }}>
              {concept.label}
            </div>
          ))}
        </div>
        {hoveredConcept && (
          <div style={{ background: "rgba(41,128,185,0.08)", border: "1px solid rgba(41,128,185,0.3)", borderRadius: 6, padding: "16px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: "#2980B9", marginBottom: 8 }}>{concepts.find(c => c.id === hoveredConcept)?.label}</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>{concepts.find(c => c.id === hoveredConcept)?.desc}</p>
          </div>
        )}
      </div>

      {/* THE DIFFICULTY PANEL */}
      <div style={{ margin: "24px 0 0 0" }}>
        <div style={{
          background: "#0f1520",
          border: "1px solid #1a3050",
          borderLeft: "4px solid #1a6090",
          borderRadius: "6px",
          padding: "24px 28px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#1a90c0", textTransform: "uppercase", marginBottom: "12px" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 16px 0", lineHeight: 1.8, fontSize: "15px", color: "#a8c0d8" }}>
            Kant's political vision raises deep questions about the relationship between formal institutions and genuine moral motivation. Can political and legal structures alone produce lasting peace and respect for human dignity, or do they require an underlying transformation of moral consciousness? The European Union may have made war between France and Germany unthinkable — but is that because of institutional design, or because the citizens of those states genuinely changed? The United Nations exists as a federation, yet wars continue among and within states that are nominal members. The form may be present while the spirit remains absent.
          </p>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: "14px", color: "#7a96b0", fontStyle: "italic" }}>
            This pressure forces the next development: we must ask whether human beings are actually capable of the moral progress Kant's entire system demands — whether history tends toward enlightenment or whether something darker in human nature perpetually resists the structures of reason. Kant's philosophy of religion and his theory of radical evil wait to confront this question.
          </p>
        </div>
      </div>

      {/* REAL-WORLD ECHOES PANEL */}
      <div style={{ margin: "24px 0 0 0" }}>
        <div style={{
          background: "#0a1520",
          border: "1px solid #1a3a5c",
          borderRadius: "6px",
          overflow: "hidden"
        }}>
          <div
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              padding: "18px 24px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              userSelect: "none"
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#2980B9", textTransform: "uppercase" }}>
              Real-World Echoes
            </div>
            {echoesOpen ? <ChevronUp size={18} color="#2980B9" /> : <ChevronDown size={18} color="#2980B9" />}
          </div>
          {echoesOpen && (
            <div style={{ padding: "0 24px 24px 24px", borderTop: "1px solid #1a3a5c" }}>
              <p style={{ fontSize: "13px", color: "#6a96b8", margin: "16px 0", fontStyle: "italic", lineHeight: 1.7 }}>
                Kant died in 1804, yet his political philosophy keeps re-emerging in the institutions modernity builds when it tries to escape perpetual war:
              </p>
              {[
                { title: "The United Nations (1945)", text: "Its founders — including figures who had read Kant — explicitly drew on the idea of a federation of states resolving disputes through international law rather than force. The Charter's prohibition on aggressive war is directly Kantian in spirit." },
                { title: "The International Court of Justice", text: "Kant's vision of replacing force with legal arbitration finds its closest institutional expression here: a court where states, like persons, submit their disputes to impartial judgment rather than the sword." },
                { title: "The European Union", text: "The most successful realization of peaceful federation among formerly hostile nations in history. France and Germany — which fought three catastrophic wars in 70 years — now share currency, laws, and open borders. Kant would have recognized this as his federation made real." },
                { title: "Human Rights Declarations", text: "The Universal Declaration of Human Rights (1948) reflects Kantian universal moral principles — rights that every person possesses not as a citizen of any state, but as a human being, grounded in dignity rather than granted by governments." }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 3 ? "16px" : "0",
                  paddingBottom: i < 3 ? "16px" : "0",
                  borderBottom: i < 3 ? "1px solid #1a3a5c" : "none"
                }}>
                  <div style={{ fontSize: "13px", color: "#4aa3df", marginBottom: "6px", fontWeight: "bold" }}>{echo.title}</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#8ab4cc", lineHeight: 1.7 }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

// ─── Part 20: Religion Within the Boundaries of Reason ───
function ReligionWithinBoundariesOfReason() {
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedDoctrine, setSelectedDoctrine] = useState(null);
  const [invisibleChurch, setInvisibleChurch] = useState(false);
  const [hoveredDoctrine, setHoveredDoctrine] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const keyConcepts = [
    { id: "radical_evil", label: "Radical Evil", desc: "Kant's account of the universal human propensity to prioritize self-love over the moral law — not because we are wholly corrupt, but because we systematically corrupt the moral incentive by subordinating duty to inclination. Radical evil is not particular vicious acts but a deep orientation of will that affects the root (radix) of our practical reason. It requires not reform but a complete revolution in moral disposition." },
    { id: "moral_religion", label: "Moral Religion", desc: "Kant's reconstruction of religion as essentially grounded in moral experience rather than metaphysical proofs or supernatural revelation. The true essence of religion is moral: worshipping God means striving to fulfill our duties as if they were divine commands. Historical faith and ritual are legitimate as vehicles for moral community, but their value is purely instrumental — they are justified only insofar as they promote moral virtue." },
    { id: "ecclesiastical_faith", label: "Ecclesiastical Faith", desc: "The historically particular, doctrinally specific form of religious life — with its creeds, rituals, clergy, and sacred texts. Kant views ecclesiastical faith as an inevitable 'vehicle' for the moral religion of reason: human beings need symbolic, communal, and institutional expression for their moral and religious lives. But it is a vehicle, not the destination — its legitimacy depends on its service to the moral religion beneath it." },
    { id: "religion_within_reason", label: "Religion Within Reason", desc: "The title and thesis of Kant's 1793 work: that the authentic content of religion is entirely accessible to and grounded in pure practical reason, and that historical religious doctrines (incarnation, atonement, resurrection) find their true meaning as symbolic expressions of moral truths that reason itself requires. This is not a rejection of religion but a rational reconstruction of it." },
    { id: "ethical_community", label: "Church as Ethical Community", desc: "Kant's ideal of a universal moral community — the invisible church — united not by shared historical doctrine but by shared commitment to the moral law. The visible church (actual historical religious institutions) should be understood as an approximation to this ideal: its external organization and ritual are justified to the extent that they serve the formation of moral character and build toward a community of virtue among all rational beings." },
  ];

  useEffect(() => {
    setTimeout(() => setPanelVisible(true), 100);
  }, []);

  const doctrines = [
    {
      id: "incarnation",
      label: "Incarnation",
      x: 160,
      y: 180,
      traditional: "The eternal Son of God takes on human flesh, uniting divine and human natures in the person of Jesus Christ — God made manifest in history, a unique metaphysical event at the center of Christian cosmology.",
      kantian: "The ideal of moral perfection made vivid and humanly accessible. Reason itself projects the archetype of a morally perfect humanity — the 'Son of God' as a symbol of what every rational being ought to strive to become. The historical figure serves as a representation of a moral ideal immanent to reason itself.",
      color: "#c084fc"
    },
    {
      id: "atonement",
      label: "Atonement",
      x: 340,
      y: 130,
      traditional: "Christ's suffering and death satisfy divine justice for human sin, reconciling humanity to God through substitutionary sacrifice — an objective transaction in the moral order of the cosmos that no human effort could accomplish alone.",
      kantian: "A symbol of the moral truth that genuine conversion — a revolution in disposition — makes it as if the old sinful self has died and a new moral self is born. No external atonement can substitute for inner moral transformation. The symbol points to the real possibility of overcoming radical evil through a complete renewal of will.",
      color: "#a78bfa"
    },
    {
      id: "resurrection",
      label: "Resurrection",
      x: 520,
      y: 180,
      traditional: "The bodily rising of Christ from death, defeating mortality and inaugurating the new creation — a literal historical miracle that grounds Christian hope in a transformed physical cosmos and personal immortality.",
      kantian: "The ultimate triumph of the moral good — a symbol of practical hope that virtue is not ultimately futile. The postulate of immortality grounds hope that the soul's moral progress continues beyond death, and that the highest good (happiness proportioned to virtue) is ultimately achievable. History bends toward justice.",
      color: "#818cf8"
    }
  ];

  const historicalAlpha = Math.max(0.15, (100 - sliderValue) / 100);
  const rationalAlpha = Math.max(0.15, sliderValue / 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #2d1040 0%, #150825 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#e8e0f0",
      padding: "40px 24px"
    }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#884EA0", textTransform: "uppercase", marginBottom: 8 }}>
            Part 20 of 21 — Kant's Critical Philosophy
          </div>
          <h1 style={{ fontSize: 28, fontWeight: "normal", margin: "0 0 12px 0", color: "#f0e8ff" }}>
            Religion Within the Boundaries of Reason
          </h1>
          <p style={{ fontSize: 15, color: "#b89fcc", margin: 0, lineHeight: 1.6, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            Kant reconstructed religious belief by grounding it in moral experience rather than theoretical argument, reinterpreting traditional doctrines as symbols of moral truths.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#12081e",
          border: "1px solid #2a1040",
          borderLeft: "4px solid #884EA0",
          borderRadius: 8,
          padding: "28px 32px",
          marginBottom: 32,
          opacity: panelVisible ? 1 : 0,
          transform: panelVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease, transform 0.6s ease"
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#884EA0", textTransform: "uppercase", marginBottom: 14, fontWeight: "bold" }}>
            The Problem
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "#d4c4e8" }}>
            The postulates of practical reason established that moral action requires faith in freedom, immortality, and God — but how does this connect to actual religious traditions and their historical revelation claims? Can traditional religious faith be preserved in a critical philosophy that has ruled out theoretical metaphysics? The gap between abstract moral postulates and the lived richness of concrete religion — its stories, rituals, communities, and particular saviors — demanded a new kind of philosophical translation.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0f0720",
          border: "1px solid #2a1040",
          borderRadius: 12,
          padding: "32px",
          marginBottom: 32
        }}>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#884EA0", textTransform: "uppercase", marginBottom: 6 }}>
            Main Visualization
          </div>
          <h2 style={{ fontSize: 20, fontWeight: "normal", margin: "0 0 8px 0", color: "#f0e8ff" }}>
            Rational Reconstruction: Two Layers of Faith
          </h2>
          <p style={{ fontSize: 14, color: "#9a7fb8", margin: "0 0 28px 0", lineHeight: 1.6 }}>
            Adjust the slider to shift between Historical Faith (the richness of particular tradition) and Rational Faith (universal moral meaning). Click each doctrine to reveal Kant's reinterpretation. Explore the Invisible Church to see what remains when all historical particularity dissolves.
          </p>

          {/* Slider */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#c084fc", letterSpacing: 1 }}>Historical Faith</span>
              <span style={{ fontSize: 13, color: "#60a5fa", letterSpacing: 1 }}>Rational Faith</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={e => { setSliderValue(Number(e.target.value)); setInvisibleChurch(false); }}
              style={{
                width: "100%",
                accentColor: "#884EA0",
                cursor: "pointer",
                height: 6
              }}
            />
            <div style={{ textAlign: "center", fontSize: 12, color: "#7a5a90", marginTop: 6 }}>
              {sliderValue < 25 ? "Deeply Historical" : sliderValue < 45 ? "Historically Weighted" : sliderValue < 55 ? "Balanced" : sliderValue < 75 ? "Rationally Weighted" : "Fully Rational"}
            </div>
          </div>

          {/* SVG Cathedral Scene */}
          <div style={{ position: "relative", marginBottom: 24 }}>
            <svg viewBox="0 0 680 320" style={{ width: "100%", borderRadius: 8, overflow: "visible" }}>
              <defs>
                <radialGradient id="bgGlow" cx="50%" cy="60%" r="60%">
                  <stop offset="0%" stopColor="#2d1050" stopOpacity={invisibleChurch ? "0.1" : "0.8"} />
                  <stop offset="100%" stopColor="#0a0510" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="lightBeam" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#884EA0" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="680" height="320" fill="url(#bgGlow)" rx="8" />
              <rect width="680" height="320" fill="url(#lightBeam)" rx="8" />

              {/* HISTORICAL LAYER — Cathedral Architecture */}
              <g opacity={invisibleChurch ? 0.03 : historicalAlpha} style={{ transition: "opacity 1.2s ease" }}>
                {/* Cathedral Floor */}
                <rect x="60" y="270" width="560" height="10" fill="#3d2060" />
                {/* Main nave walls */}
                <rect x="100" y="120" width="480" height="155" fill="#1a0d2e" stroke="#3d2060" strokeWidth="1" />
                {/* Nave columns left */}
                <rect x="130" y="130" width="16" height="140" fill="#2d1050" />
                <rect x="190" y="130" width="16" height="140" fill="#2d1050" />
                <rect x="250" y="130" width="16" height="140" fill="#2d1050" />
                {/* Nave columns right */}
                <rect x="534" y="130" width="16" height="140" fill="#2d1050" />
                <rect x="474" y="130" width="16" height="140" fill="#2d1050" />
                <rect x="414" y="130" width="16" height="140" fill="#2d1050" />
                {/* Central tower */}
                <polygon points="340,30 280,120 400,120" fill="#250e42" stroke="#4a2070" strokeWidth="1.5" />
                {/* Cross atop tower */}
                <line x1="340" y1="38" x2="340" y2="70" stroke="#c084fc" strokeWidth="2.5" opacity="0.8" />
                <line x1="328" y1="52" x2="352" y2="52" stroke="#c084fc" strokeWidth="2.5" opacity="0.8" />
                {/* Rose window */}
                <circle cx="340" cy="90" r="22" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.7" />
                <circle cx="340" cy="90" r="14" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />
                <circle cx="340" cy="90" r="6" fill="#7c3aed" opacity="0.4" />
                {[0,45,90,135,180,225,270,315].map((angle, i) => (
                  <line key={i}
                    x1={340 + 6 * Math.cos(angle * Math.PI / 180)}
                    y1={90 + 6 * Math.sin(angle * Math.PI / 180)}
                    x2={340 + 22 * Math.cos(angle * Math.PI / 180)}
                    y2={90 + 22 * Math.sin(angle * Math.PI / 180)}
                    stroke="#7c3aed" strokeWidth="1" opacity="0.5"
                  />
                ))}
                {/* Side towers */}
                <polygon points="160,60 130,130 190,130" fill="#1e0c38" stroke="#3d2060" strokeWidth="1" />
                <polygon points="520,60 490,130 550,130" fill="#1e0c38" stroke="#3d2060" strokeWidth="1" />
                {/* Stained glass windows */}
                {[160, 260, 420, 520].map((x, i) => (
                  <g key={i}>
                    <rect x={x - 14} y="150" width="28" height="45" rx="14" fill={["#6d28d9","#7c3aed","#5b21b6","#6d28d9"][i]} opacity="0.35" />
                    <line x1={x} y1="155" x2={x} y2="190" stroke="#c4b5fd" strokeWidth="0.8" opacity="0.4" />
                    <line x1={x - 10} y1="175" x2={x + 10} y2="175" stroke="#c4b5fd" strokeWidth="0.8" opacity="0.4" />
                  </g>
                ))}
                {/* Altar */}
                <rect x="300" y="240" width="80" height="28" fill="#2d1050" stroke="#4a2070" strokeWidth="1" />
                <rect x="315" y="225" width="50" height="16" fill="#3d1a6e" stroke="#5b3090" strokeWidth="1" />
                {/* Candles */}
                <rect x="298" y="220" width="4" height="20" fill="#f0e0a0" opacity="0.6" />
                <circle cx="300" cy="218" r="3" fill="#ffd700" opacity="0.8" />
                <rect x="378" y="220" width="4" height="20" fill="#f0e0a0" opacity="0.6" />
                <circle cx="380" cy="218" r="3" fill="#ffd700" opacity="0.8" />
                {/* Pews */}
                {[145, 175, 205, 435, 465, 495].map((x, i) => (
                  <rect key={i} x={x} y="255" width="25" height="10" fill="#1e0c38" stroke="#2d1050" strokeWidth="0.5" />
                ))}
              </g>

              {/* RATIONAL LAYER — Moral geometry */}
              <g opacity={invisibleChurch ? 0.95 : rationalAlpha} style={{ transition: "opacity 1.2s ease" }}>
                {/* Moral law hexagon */}
                <polygon
                  points="340,60 390,88 390,144 340,172 290,144 290,88"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={sliderValue > 50 ? 1.5 : 0.8}
                  opacity={sliderValue > 50 ? 0.6 : 0.3}
                />
                {/* Inner triangle — categorical imperative */}
                <polygon
                  points="340,82 374,136 306,136"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth={sliderValue > 60 ? 1.2 : 0.6}
                  opacity={sliderValue > 60 ? 0.5 : 0.2}
                />
                {/* Highest good circle */}
                <circle cx="340" cy="116" r="24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth={sliderValue > 40 ? 1 : 0.5}
                  strokeDasharray="4 3"
                  opacity={sliderValue > 40 ? 0.6 : 0.2}
                />
                {/* Connecting lines — postulates */}
                {[
                  [340, 116, 160, 180],
                  [340, 116, 340, 130],
                  [340, 116, 520, 180]
                ].map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#818cf8"
                    strokeWidth={sliderValue > 50 ? 1 : 0.5}
                    strokeDasharray="5 4"
                    opacity={sliderValue > 50 ? 0.5 : 0.2}
                    style={{ transition: "opacity 0.8s ease" }}
                  />
                ))}
                {/* Labels */}
                {sliderValue > 40 && (
                  <>
                    <text x="340" y="108" textAnchor="middle" fill="#60a5fa" fontSize="9" opacity={rationalAlpha} fontFamily="Georgia, serif">MORAL LAW</text>
                    <text x="340" y="122" textAnchor="middle" fill="#a78bfa" fontSize="8" opacity={rationalAlpha * 0.8} fontFamily="Georgia, serif">Highest Good</text>
                  </>
                )}
              </g>

              {/* Invisible Church overlay */}
              {invisibleChurch && (
                <g>
                  <ellipse cx="340" cy="200" rx="240" ry="80" fill="#884EA0" opacity="0.08" />
                  <ellipse cx="340" cy="200" rx="180" ry="60" fill="#884EA0" opacity="0.07" />
                  <ellipse cx="340" cy="200" rx="120" ry="40" fill="#884EA0" opacity="0.06" />
                  {/* Figures representing moral community */}
                  {[180, 240, 300, 340, 380, 440, 500].map((x, i) => (
                    <g key={i}>
                      <circle cx={x} cy={220 - (i % 2) * 10} r="7" fill="#c084fc" opacity="0.5" />
                      <line x1={x} y1={227 - (i % 2) * 10} x2={x} y2={255} stroke="#a78bfa" strokeWidth="1.5" opacity="0.4" />
                      <line x1={x - 10} y1={237 - (i % 2) * 10} x2={x + 10} y2={237 - (i % 2) * 10} stroke="#a78bfa" strokeWidth="1.5" opacity="0.4" />
                    </g>
                  ))}
                  <text x="340" y="290" textAnchor="middle" fill="#c084fc" fontSize="12" fontFamily="Georgia, serif" opacity="0.8">
                    The Invisible Church — Community of Moral Virtue
                  </text>
                </g>
              )}

              {/* Doctrine icons — always visible */}
              {doctrines.map(doc => {
                const isHovered = hoveredDoctrine === doc.id;
                const isSelected = selectedDoctrine?.id === doc.id;
                return (
                  <g key={doc.id}
                    onClick={() => setSelectedDoctrine(isSelected ? null : doc)}
                    onMouseEnter={() => setHoveredDoctrine(doc.id)}
                    onMouseLeave={() => setHoveredDoctrine(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx={doc.x} cy={doc.y} r={isHovered || isSelected ? 22 : 18}
                      fill={isSelected ? doc.color : "#1a0d2e"}
                      stroke={doc.color}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      opacity={invisibleChurch ? 0.2 : 0.95}
                      filter={isHovered ? "url(#softGlow)" : "none"}
                      style={{ transition: "all 0.3s ease" }}
                    />
                    <text x={doc.x} y={doc.y - 3} textAnchor="middle" fill={isSelected ? "#fff" : doc.color}
                      fontSize="8" fontFamily="Georgia, serif" opacity={invisibleChurch ? 0.2 : 1}>
                      {doc.label.substring(0, 3)}
                    </text>
                    <text x={doc.x} y={doc.y + 7} textAnchor="middle" fill={isSelected ? "#fff" : doc.color}
                      fontSize="8" fontFamily="Georgia, serif" opacity={invisibleChurch ? 0.2 : 1}>
                      {doc.label.substring(3, 6)}
                    </text>
                    <text x={doc.x} y={doc.y + 32} textAnchor="middle" fill={doc.color}
                      fontSize="10" fontFamily="Georgia, serif" opacity={invisibleChurch ? 0.2 : 0.85}>
                      {doc.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Invisible Church Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <button
              onClick={() => setInvisibleChurch(!invisibleChurch)}
              style={{
                background: invisibleChurch ? "#884EA0" : "transparent",
                border: "1.5px solid #884EA0",
                borderRadius: 24,
                padding: "10px 28px",
                color: invisibleChurch ? "#fff" : "#884EA0",
                fontSize: 13,
                fontFamily: "Georgia, serif",
                cursor: "pointer",
                letterSpacing: 1,
                transition: "all 0.4s ease",
                boxShadow: invisibleChurch ? "0 0 20px #884EA055" : "none"
              }}
            >
              {invisibleChurch ? "Return to Historical View" : "View the Invisible Church"}
            </button>
          </div>

          {/* Doctrine Panel */}
          {selectedDoctrine && !invisibleChurch && (
            <div style={{
              background: "#150a25",
              border: `1.5px solid ${selectedDoctrine.color}`,
              borderRadius: 10,
              padding: "24px 28px",
              marginBottom: 20,
              animation: "fadeIn 0.4s ease"
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: selectedDoctrine.color, textTransform: "uppercase", marginBottom: 10 }}>
                Doctrine — {selectedDoctrine.label}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#9a7fb8", textTransform: "uppercase", marginBottom: 8 }}>
                    Traditional Meaning
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14, color: "#c4a8e0" }}>
                    {selectedDoctrine.traditional}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: "#60a5fa", textTransform: "uppercase", marginBottom: 8 }}>
                    Kant's Rational Reading
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14, color: "#b8d4f8" }}>
                    {selectedDoctrine.kantian}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctrine(null)}
                style={{
                  marginTop: 16,
                  background: "transparent",
                  border: "none",
                  color: "#7a5a90",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  padding: 0
                }}
              >
                ✕ Close
              </button>
            </div>
          )}

          {/* Core Argument prose */}
          <div style={{ marginTop: 24, padding: "20px 0 0 0", borderTop: "1px solid #2a1040" }}>
            <p style={{ margin: 0, lineHeight: 1.85, fontSize: 14, color: "#c4a8e0" }}>
              Kant's philosophy of religion centers on whether human beings can become morally worthy of happiness despite their radical evil — the universal tendency to rationalize selfish behavior over moral duty. This is not a flaw in nature but a propensity affecting the very root of moral choice, requiring not gradual reform but a complete revolution in disposition. The traditional Christian doctrines of incarnation, atonement, and resurrection serve as powerful symbols of moral truths: the ideal of perfection, the possibility of genuine conversion, and the ultimate triumph of goodness. Religion addresses the practical need for hope that moral effort is meaningful, grounding faith not in supernatural proofs but in the moral postulates reason itself requires.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(136,78,160,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#884EA0", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{ padding: "6px 14px", background: hoveredConcept === c.id ? "#884EA0" : "rgba(136,78,160,0.1)", border: `1px solid ${hoveredConcept === c.id ? "#bb80d8" : "rgba(136,78,160,0.35)"}`, borderRadius: 20, fontSize: 12, cursor: "pointer", color: hoveredConcept === c.id ? "#f0ead8" : "#9a7fb8", transition: "all 0.2s", fontFamily: "Georgia, serif" }}>
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{ background: "rgba(136,78,160,0.08)", border: "1px solid rgba(136,78,160,0.3)", borderRadius: 6, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#884EA0", marginBottom: 8 }}>{keyConcepts.find(c => c.id === hoveredConcept)?.label}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>{keyConcepts.find(c => c.id === hoveredConcept)?.desc}</p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0d0820",
          border: "1px solid #2a1040",
          borderLeft: "4px solid #5b3a7a",
          borderRadius: 8,
          padding: "28px 32px",
          marginBottom: 32
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#7a4a9a", textTransform: "uppercase", marginBottom: 14, fontWeight: "bold" }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 16px 0", lineHeight: 1.8, fontSize: 15, color: "#c4a8e0" }}>
            Reconstructing religion as essentially moral raises a profound question about what is lost in translation. If incarnation means only the ideal of moral perfection, if atonement means only inner transformation, if resurrection means only rational hope — then what remains of the specific historical community, the embodied ritual, the irreducible mystery, and the particular person whose name the tradition bears? Kant's critics, from Hegel to Kierkegaard, pressed this wound: the universal moral community cannot substitute for the particular, flesh-and-blood community that gathers, worships, mourns, and celebrates together.
          </p>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "#a08bc0", fontStyle: "italic" }}>
            The tension between universal rational religion and the irreducible particularity of historical faith — between what reason can endorse everywhere and what only this tradition, this story, this meal can enact — remains achingly unresolved. This pressure forces the next development: the post-Kantian attempts to think history itself as the medium of the absolute, rather than a mere vehicle for timeless moral truths.
          </p>
        </div>

        {/* REAL-WORLD ECHOES — Collapsible */}
        <div style={{
          background: "#0d0820",
          border: "1px solid #2a1040",
          borderRadius: 8,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "20px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#c4a8e0",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: 3, color: "#884EA0", textTransform: "uppercase", fontWeight: "bold" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={18} color="#884EA0" />
              : <ChevronDown size={18} color="#884EA0" />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 32px 28px 32px" }}>
              <div style={{ borderTop: "1px solid #2a1040", paddingTop: 20 }}>
                <div style={{ display: "grid", gap: 16 }}>
                  {[
                    {
                      title: "Liberal Protestant Theology",
                      text: "Theologians from Schleiermacher through Harnack and Tillich drew on Kantian foundations to argue that Christianity's essence lies in its moral and spiritual content, not in doctrinal supernaturalism — making religion compatible with modern science and critical history."
                    },
                    {
                      title: "Kierkegaard's Counter-Response",
                      text: "Kierkegaard's entire project can be read as a sustained protest against Kant's moralization: the leap of faith, the teleological suspension of the ethical, and the absolute paradox of the Incarnation all insist that authentic religion requires a particularity and passion that rational morality can never capture."
                    },
                    {
                      title: "Interfaith Dialogue",
                      text: "Contemporary interfaith conversations often draw on the Kantian distinction between historical faith (particular doctrines) and universal moral principles as a way to find common ground across traditions without demanding doctrinal agreement — a practical legacy of Kant's rational religion."
                    }
                  ].map((echo, i) => (
                    <div key={i} style={{
                      background: "#100820",
                      border: "1px solid #2a1040",
                      borderRadius: 8,
                      padding: "16px 20px"
                    }}>
                      <div style={{ fontSize: 13, color: "#884EA0", marginBottom: 8, letterSpacing: 0.5 }}>
                        {echo.title}
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: "#9a7fb8", lineHeight: 1.7 }}>
                        {echo.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Part 21: The Unity of the Critical System and Kant's Legacy ───
function UnityCriticalSystemKantsLegacy() {
  const [selectedWing, setSelectedWing] = useState(null);
  const [hoveredWing, setHoveredWing] = useState(null);
  const [hoveredFigure, setHoveredFigure] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [viewMode, setViewMode] = useState("facade"); // "facade" or "floorplan"
  const [timelineYear, setTimelineYear] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const keyConcepts = [
    { id: "critical_philosophy", label: "Critical Philosophy", desc: "Kant's name for his own project: a philosophy that examines the conditions and limits of reason's legitimate use before making any substantive claims about reality, morality, or beauty. 'Critical' (from the Greek krinein, to judge) means the careful examination of what reason can and cannot do — a meta-philosophical investigation prior to any first-order metaphysical, ethical, or aesthetic doctrine." },
    { id: "architectonic", label: "Architectonic", desc: "Kant's term for the systematic structure of philosophical knowledge — the plan according to which philosophical inquiry should be organized as a unified, internally coherent whole rather than a mere aggregate of insights. The three Critiques form an architectonic: theoretical philosophy, practical philosophy, and the philosophy of judgment each addresses one of reason's fundamental faculties, and together they cover the full domain of rational activity." },
    { id: "german_idealism", label: "German Idealism Legacy", desc: "The philosophical movement immediately following Kant — Fichte, Schelling, and Hegel — that took Kant's transcendental philosophy as its starting point and attempted to overcome its internal tensions (especially the phenomena-noumena distinction and the gap between theoretical and practical reason). German Idealism represents the most systematic attempt to complete or transcend the Critical project by thinking the absolute directly." },
    { id: "copernican_turn", label: "Copernican Turn", desc: "Kant's own analogy for his revolution in philosophy: just as Copernicus solved astronomical problems by making the earth move around the sun rather than vice versa, Kant solved epistemological problems by making objects conform to our cognitive faculties rather than our knowledge conform to objects. The mind does not passively receive a ready-made world — it actively constitutes the structural features of experience." },
    { id: "three_critiques", label: "Kant's Three Critiques", desc: "The three great works that define the Critical philosophy: the Critique of Pure Reason (1781/1787) examines theoretical knowledge and its limits; the Critique of Practical Reason (1788) examines moral reason and the categorical imperative; the Critique of Judgment (1790) examines aesthetic and teleological judgment and bridges the gap between the first two Critiques. Together they constitute a systematic account of the three fundamental capacities of rational beings: to know, to act, and to feel." },
  ];

  const wings = {
    left: {
      id: "left",
      label: "Critique of Pure Reason",
      subtitle: "Theoretical Philosophy",
      question: "What can I know?",
      color: "#3A6EA5",
      lightColor: "#5A9ED5",
      contents: [
        "Space & Time as forms of intuition",
        "Categories of the understanding",
        "Transcendental unity of apperception",
        "Limits of speculative reason",
        "Science & empirical knowledge"
      ],
      description: "The left wing houses reason's theoretical employment — the conditions that make knowledge of nature possible. Here the knowing subject actively structures experience through a priori forms, establishing both the scope and the boundaries of science."
    },
    center: {
      id: "center",
      label: "Critique of Judgment",
      subtitle: "Aesthetic & Teleological",
      question: "What may I hope?",
      color: "#2E7D5A",
      lightColor: "#4EAD8A",
      contents: [
        "Aesthetic judgment & the sublime",
        "Free beauty and purposiveness",
        "Teleological judgment in nature",
        "Bridge between nature and freedom",
        "Reflective judgment"
      ],
      description: "The central wing bridges the gulf between nature and freedom, between necessity and spontaneity. Aesthetic and teleological judgment provide the connective tissue that makes the critical system a genuine unity rather than a fragmented collection."
    },
    right: {
      id: "right",
      label: "Critique of Practical Reason",
      subtitle: "Moral Philosophy",
      question: "What ought I to do?",
      color: "#B8860B",
      lightColor: "#E8A020",
      contents: [
        "Categorical imperative",
        "Autonomy & rational self-legislation",
        "Human dignity as end in itself",
        "Moral law & practical postulates",
        "Law, rights & perpetual peace"
      ],
      description: "The right wing houses reason's practical employment — the self-legislative capacity that grounds morality, human rights, and political institutions. Here the rational will gives itself the moral law, establishing human dignity as the foundation of all ethics."
    }
  };

  const figures = [
    { id: "hegel", name: "Hegel", year: 1807, x: 0.12, label: "Absolute Idealism — overcomes the thing-in-itself", wing: "left" },
    { id: "schiller", name: "Schiller", year: 1795, x: 0.25, label: "Aesthetic education as moral formation", wing: "center" },
    { id: "marx", name: "Marx", year: 1844, x: 0.38, label: "Transforms Kantian critique into social critique", wing: "right" },
    { id: "nietzsche", name: "Nietzsche", year: 1886, x: 0.50, label: "Challenges Kantian morality at its roots", wing: "right" },
    { id: "rawls", name: "Rawls", year: 1971, x: 0.65, label: "Justice as fairness — Neo-Kantian political philosophy", wing: "right" },
    { id: "habermas", name: "Habermas", year: 1981, x: 0.78, label: "Communicative reason extends Kantian project", wing: "center" },
    { id: "korsgaard", name: "Korsgaard", year: 1996, x: 0.90, label: "Self-constitution grounds Kantian ethics", wing: "right" }
  ];

  const visibleFigures = figures.filter((f, i) => i <= timelineYear);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#E8A020`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const wingOrder = ["left", "center", "right"];

  const renderFacade = () => {
    const svgW = 700;
    const svgH = 420;

    const wingDefs = [
      { id: "left", x: 20, y: 60, w: 195, h: 280, color: "#3A6EA5", lightColor: "#5A9ED5", label: "Critique of Pure Reason", sub: "What can I know?", roofColor: "#2A5E95" },
      { id: "center", x: 252, y: 30, w: 196, h: 310, color: "#2E7D5A", lightColor: "#4EAD8A", label: "Critique of Judgment", sub: "What may I hope?", roofColor: "#1E6D4A" },
      { id: "right", x: 485, y: 60, w: 195, h: 280, color: "#9B7200", lightColor: "#E8A020", label: "Critique of Practical Reason", sub: "What ought I to do?", roofColor: "#7B6200" }
    ];

    const corridors = [
      { x1: 215, y1: 200, x2: 252, y2: 185 },
      { x1: 448, y1: 200, x2: 485, y2: 185 }
    ];

    return (
      <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", maxWidth: svgW, display: "block", margin: "0 auto" }}>
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a0f" />
          </radialGradient>
          <filter id="wingGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width={svgW} height={svgH} fill="url(#skyGrad)" />

        {/* Ground */}
        <rect x={0} y={375} width={svgW} height={45} fill="#111118" />
        <line x1={0} y1={375} x2={svgW} y2={375} stroke="#E8A020" strokeWidth={1} strokeOpacity={0.3} />

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <circle key={i} cx={(i * 37 + 15) % svgW} cy={(i * 19 + 5) % 30 + 5} r={0.8} fill="#E8A020" opacity={0.4} />
        ))}

        {/* Corridors */}
        {corridors.map((c, i) => (
          <rect key={i} x={c.x1} y={c.y1 - 15} width={c.x2 - c.x1} height={30} fill="#1a1a2e" stroke="#E8A020" strokeWidth={0.5} strokeOpacity={0.4} />
        ))}

        {/* Wings */}
        {wingDefs.map(w => {
          const isHovered = hoveredWing === w.id;
          const isSelected = selectedWing === w.id;
          const glowOpacity = isHovered || isSelected ? 0.6 : 0.15;
          const fillOpacity = isHovered || isSelected ? 0.95 : 0.75;

          return (
            <g key={w.id} style={{ cursor: "pointer" }}
              onClick={() => setSelectedWing(selectedWing === w.id ? null : w.id)}
              onMouseEnter={() => setHoveredWing(w.id)}
              onMouseLeave={() => setHoveredWing(null)}>

              {/* Glow */}
              <rect x={w.x - 4} y={w.y - 4} width={w.w + 8} height={w.h + 8}
                fill={w.color} opacity={glowOpacity} rx={3}
                style={{ filter: "blur(8px)" }} />

              {/* Body */}
              <rect x={w.x} y={w.y} width={w.w} height={w.h}
                fill={w.color} opacity={fillOpacity} rx={2}
                stroke={isSelected ? "#E8A020" : w.lightColor}
                strokeWidth={isSelected ? 2 : 1} />

              {/* Roof triangle */}
              <polygon
                points={`${w.x},${w.y} ${w.x + w.w / 2},${w.y - 35} ${w.x + w.w},${w.y}`}
                fill={w.roofColor} opacity={fillOpacity} stroke={w.lightColor} strokeWidth={1} />

              {/* Columns */}
              {[0.2, 0.4, 0.6, 0.8].map((frac, ci) => (
                <rect key={ci} x={w.x + w.w * frac - 4} y={w.y + 20} width={8} height={w.h - 60}
                  fill={w.roofColor} opacity={0.6} />
              ))}

              {/* Windows */}
              {[0, 1, 2].map(row => [0, 1, 2].map(col => (
                <rect key={`${row}-${col}`}
                  x={w.x + 20 + col * 55} y={w.y + 30 + row * 70} width={35} height={45}
                  fill={isHovered || isSelected ? w.lightColor : "#0d1117"}
                  opacity={isHovered || isSelected ? 0.5 : 0.8}
                  stroke={w.lightColor} strokeWidth={0.5} rx={2} />
              )))}

              {/* Label */}
              <text x={w.x + w.w / 2} y={w.y + w.h + 18} textAnchor="middle"
                fill={isSelected ? "#E8A020" : w.lightColor}
                fontSize={10} fontFamily="Georgia, serif" fontWeight={isSelected ? "bold" : "normal"}>
                {w.label}
              </text>
              <text x={w.x + w.w / 2} y={w.y + w.h + 32} textAnchor="middle"
                fill="#aaaaaa" fontSize={9} fontFamily="Georgia, serif" fontStyle="italic">
                {w.sub}
              </text>
            </g>
          );
        })}

        {/* Central inscription */}
        <text x={svgW / 2} y={390} textAnchor="middle"
          fill="#E8A020" fontSize={11} fontFamily="Georgia, serif" letterSpacing={2} opacity={0.7}>
          THE CRITICAL SYSTEM
        </text>

        {/* Unity arch */}
        <path d={`M 20,${wingDefs[0].y} Q ${svgW / 2},${wingDefs[0].y - 80} ${wingDefs[2].x + wingDefs[2].w},${wingDefs[2].y}`}
          fill="none" stroke="#E8A020" strokeWidth={1.5} strokeDasharray="6,4" opacity={0.35} />

        {/* "UNITY" label on arch */}
        <text x={svgW / 2} y={wingDefs[1].y - 55} textAnchor="middle"
          fill="#E8A020" fontSize={9} fontFamily="Georgia, serif" letterSpacing={3} opacity={0.6}>
          UNITY OF REASON
        </text>
      </svg>
    );
  };

  const renderFloorplan = () => {
    const svgW = 700;
    const svgH = 360;

    return (
      <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", maxWidth: svgW, display: "block", margin: "0 auto" }}>
        <defs>
          <radialGradient id="floorGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a0f" />
          </radialGradient>
        </defs>
        <rect width={svgW} height={svgH} fill="url(#floorGrad)" />

        {/* Title */}
        <text x={svgW / 2} y={22} textAnchor="middle" fill="#E8A020" fontSize={11}
          fontFamily="Georgia, serif" letterSpacing={3} opacity={0.8}>
          FLOOR PLAN — UNITY FROM ABOVE
        </text>

        {/* Left wing room */}
        <rect x={40} y={50} width={175} height={260} fill="#3A6EA5" opacity={0.3}
          stroke="#5A9ED5" strokeWidth={1.5} rx={4}
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedWing(selectedWing === "left" ? null : "left")}
          onMouseEnter={() => setHoveredWing("left")}
          onMouseLeave={() => setHoveredWing(null)} />
        <text x={127} y={155} textAnchor="middle" fill="#5A9ED5" fontSize={10}
          fontFamily="Georgia, serif" fontWeight="bold">Pure Reason</text>
        <text x={127} y={170} textAnchor="middle" fill="#5A9ED5" fontSize={9}
          fontFamily="Georgia, serif" fontStyle="italic">Knowledge</text>
        {["Intuition", "Categories", "Science"].map((t, i) => (
          <text key={i} x={127} y={195 + i * 16} textAnchor="middle" fill="#aac8e8" fontSize={8}
            fontFamily="Georgia, serif">{t}</text>
        ))}

        {/* Center wing room */}
        <rect x={262} y={40} width={176} height={280} fill="#2E7D5A" opacity={0.3}
          stroke="#4EAD8A" strokeWidth={1.5} rx={4}
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedWing(selectedWing === "center" ? null : "center")}
          onMouseEnter={() => setHoveredWing("center")}
          onMouseLeave={() => setHoveredWing(null)} />
        <text x={350} y={155} textAnchor="middle" fill="#4EAD8A" fontSize={10}
          fontFamily="Georgia, serif" fontWeight="bold">Judgment</text>
        <text x={350} y={170} textAnchor="middle" fill="#4EAD8A" fontSize={9}
          fontFamily="Georgia, serif" fontStyle="italic">Bridge</text>
        {["Beauty", "Sublime", "Teleology"].map((t, i) => (
          <text key={i} x={350} y={195 + i * 16} textAnchor="middle" fill="#a0d8c0" fontSize={8}
            fontFamily="Georgia, serif">{t}</text>
        ))}

        {/* Right wing room */}
        <rect x={485} y={50} width={175} height={260} fill="#9B7200" opacity={0.3}
          stroke="#E8A020" strokeWidth={1.5} rx={4}
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedWing(selectedWing === "right" ? null : "right")}
          onMouseEnter={() => setHoveredWing("right")}
          onMouseLeave={() => setHoveredWing(null)} />
        <text x={572} y={155} textAnchor="middle" fill="#E8A020" fontSize={10}
          fontFamily="Georgia, serif" fontWeight="bold">Practical Reason</text>
        <text x={572} y={170} textAnchor="middle" fill="#E8A020" fontSize={9}
          fontFamily="Georgia, serif" fontStyle="italic">Morality</text>
        {["Autonomy", "Dignity", "Law"].map((t, i) => (
          <text key={i} x={572} y={195 + i * 16} textAnchor="middle" fill="#e8d090" fontSize={8}
            fontFamily="Georgia, serif">{t}</text>
        ))}

        {/* Corridors */}
        <rect x={215} y={155} width={47} height={50} fill="#1e1e2e" stroke="#E8A020"
          strokeWidth={1} strokeDasharray="3,3" opacity={0.7} />
        <rect x={438} y={155} width={47} height={50} fill="#1e1e2e" stroke="#E8A020"
          strokeWidth={1} strokeDasharray="3,3" opacity={0.7} />

        {/* Arrows in corridors */}
        <line x1={220} y1={180} x2={258} y2={180} stroke="#E8A020" strokeWidth={1.5} opacity={0.6} />
        <polygon points="258,176 264,180 258,184" fill="#E8A020" opacity={0.6} />
        <line x1={258} y1={180} x2={220} y2={180} stroke="#E8A020" strokeWidth={1.5} opacity={0.6}
          strokeDasharray="0" />

        <line x1={442} y1={180} x2={480} y2={180} stroke="#E8A020" strokeWidth={1.5} opacity={0.6} />
        <polygon points="480,176 486,180 480,184" fill="#E8A020" opacity={0.6} />

        {/* Outer border */}
        <rect x={20} y={30} width={660} height={300} fill="none" stroke="#E8A020"
          strokeWidth={1} strokeOpacity={0.2} rx={6} />

        {/* Bottom label */}
        <text x={svgW / 2} y={345} textAnchor="middle" fill="#888888" fontSize={9}
          fontFamily="Georgia, serif" fontStyle="italic">
          Three wings — one building — one rational subject at the center
        </text>
      </svg>
    );
  };

  const selectedWingData = selectedWing ? wings[selectedWing] : null;

  return (
    <div style={{
      background: "radial-gradient(ellipse at center top, #3d2a04 0%, #1a1208 30%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e8e0d0",
      padding: "0",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Canvas background particles */}
      <canvas ref={canvasRef} width={800} height={600}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#E8A020", opacity: 0.7, marginBottom: 8 }}>
            PART 21 OF 21 — KANT'S CRITICAL PHILOSOPHY
          </div>
          <h1 style={{ fontSize: 26, fontWeight: "normal", color: "#f0e8d0", margin: "0 0 8px 0", lineHeight: 1.3 }}>
            The Unity of the Critical System and Kant's Legacy
          </h1>
          <p style={{ fontSize: 14, color: "#aaa090", fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>
            The three Critiques form a complete and systematic account of human reason — their influence continues across philosophy, science, politics, and culture.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#0d0d15",
          border: "1px solid #2a2a3a",
          borderLeft: "4px solid #E8A020",
          borderRadius: 6,
          padding: "24px 28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#E8A020", marginBottom: 12, fontWeight: "bold" }}>
            THE PROBLEM
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#c8c0b0", margin: 0 }}>
            Three separate Critiques cover three separate domains — but do they form a genuine unity or merely a collection?
            The <em>Critique of Pure Reason</em> analyzes knowledge, the <em>Critique of Practical Reason</em> analyzes morality,
            and the <em>Critique of Judgment</em> analyzes aesthetic experience. Three vast systems, each internally complete.
            Is there a single edifice here, or three unconnected buildings standing in the same philosophical quarter?
            And does this 18th-century system remain relevant to contemporary challenges in science, politics, ethics, and culture —
            or has history rendered it a museum exhibit, impressive but inert?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0a0a14",
          border: "1px solid #2a2a3a",
          borderRadius: 8,
          padding: "28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#E8A020", marginBottom: 6, fontWeight: "bold" }}>
            THE CRITICAL EDIFICE
          </div>
          <p style={{ fontSize: 13, color: "#888880", fontStyle: "italic", marginBottom: 20, lineHeight: 1.6 }}>
            Click any wing to explore its contents. Toggle between facade and floor plan views. Advance the timeline to witness Kant's living legacy.
          </p>

          {/* View toggle */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {["facade", "floorplan"].map(v => (
              <button key={v} onClick={() => setViewMode(v)} style={{
                background: viewMode === v ? "#E8A020" : "#1a1a2a",
                color: viewMode === v ? "#0a0a0f" : "#aaaaaa",
                border: `1px solid ${viewMode === v ? "#E8A020" : "#333344"}`,
                borderRadius: 4,
                padding: "7px 18px",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                fontSize: 12,
                letterSpacing: 1,
                fontWeight: viewMode === v ? "bold" : "normal",
                transition: "all 0.2s"
              }}>
                {v === "facade" ? "Facade View" : "Floor Plan"}
              </button>
            ))}
          </div>

          {/* Building visualization */}
          <div style={{ marginBottom: 24 }}>
            {viewMode === "facade" ? renderFacade() : renderFloorplan()}
          </div>

          {/* Selected wing detail */}
          {selectedWingData && (
            <div style={{
              background: "#0d0d1a",
              border: `1px solid ${selectedWingData.color}`,
              borderLeft: `4px solid ${selectedWingData.lightColor}`,
              borderRadius: 6,
              padding: "20px 24px",
              marginBottom: 20,
              transition: "all 0.3s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: selectedWingData.lightColor, marginBottom: 4 }}>
                    {selectedWingData.subtitle.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 17, color: "#f0e8d0", marginBottom: 4 }}>{selectedWingData.label}</div>
                  <div style={{ fontSize: 13, color: "#aaaaaa", fontStyle: "italic" }}>"{selectedWingData.question}"</div>
                </div>
                <button onClick={() => setSelectedWing(null)} style={{
                  background: "transparent", border: `1px solid ${selectedWingData.color}`,
                  color: selectedWingData.lightColor, borderRadius: 4, padding: "4px 12px",
                  cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 11
                }}>Close ✕</button>
              </div>
              <p style={{ fontSize: 13, color: "#c0b8a8", lineHeight: 1.8, marginBottom: 16 }}>
                {selectedWingData.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selectedWingData.contents.map((item, i) => (
                  <span key={i} style={{
                    background: selectedWingData.color + "33",
                    border: `1px solid ${selectedWingData.color}66`,
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontSize: 11,
                    color: selectedWingData.lightColor
                  }}>{item}</span>
                ))}
              </div>
            </div>
          )}

          {/* Wing quick-select buttons */}
          {!selectedWingData && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              {wingOrder.map(wid => {
                const w = wings[wid];
                return (
                  <button key={wid} onClick={() => setSelectedWing(wid)}
                    onMouseEnter={() => setHoveredWing(wid)}
                    onMouseLeave={() => setHoveredWing(null)}
                    style={{
                      flex: 1, minWidth: 160,
                      background: hoveredWing === wid ? w.color + "44" : "#111120",
                      border: `1px solid ${w.color}`,
                      borderRadius: 5, padding: "12px 14px",
                      cursor: "pointer", fontFamily: "Georgia, serif",
                      textAlign: "left", transition: "all 0.2s"
                    }}>
                    <div style={{ fontSize: 10, color: w.lightColor, letterSpacing: 1, marginBottom: 4 }}>
                      {w.subtitle.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12, color: "#d8d0c0" }}>{w.label}</div>
                    <div style={{ fontSize: 11, color: "#888880", fontStyle: "italic", marginTop: 4 }}>
                      "{w.question}"
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Unity insight */}
          <div style={{
            background: "#0f0f1e",
            border: "1px solid #2a2a3a",
            borderTop: "2px solid #E8A020",
            borderRadius: 6,
            padding: "18px 22px",
            marginBottom: 28
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#E8A020", marginBottom: 10 }}>
              THE UNIFYING INSIGHT
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#c8c0b0", margin: 0 }}>
              The three wings are united by a single underlying truth: in all its employments — theoretical, practical, aesthetic —
              human reason is <em>active, spontaneous, and self-legislative</em>. The knowing subject does not passively receive reality;
              the moral agent does not discover laws from outside; the aesthetic judge does not merely react. In each case, reason
              gives form to experience from within. This self-legislative character of rationality is what makes a human being simultaneously
              a creature of nature and a citizen of the intelligible world — finite, yet free.
            </p>
          </div>

          {/* Living Legacy Timeline */}
          <div style={{
            background: "#0a0a14",
            border: "1px solid #2a2a3a",
            borderRadius: 8,
            padding: "20px 24px"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#E8A020", marginBottom: 6, fontWeight: "bold" }}>
              THE LIVING LEGACY — ADVANCE THROUGH HISTORY
            </div>
            <p style={{ fontSize: 12, color: "#888880", fontStyle: "italic", marginBottom: 16, lineHeight: 1.5 }}>
              Drag the slider to watch philosophers enter Kant's edifice — arguing, extending, transforming.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <input type="range" min={0} max={figures.length - 1} value={timelineYear}
                onChange={e => setTimelineYear(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "#E8A020", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#666660", marginTop: 4 }}>
                <span>1780s — Kant</span>
                <span>Today</span>
              </div>
            </div>

            {/* Figures display */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {figures.map((fig, i) => {
                const visible = i <= timelineYear;
                const isHov = hoveredFigure === fig.id;
                const w = wings[fig.wing];
                return (
                  <div key={fig.id}
                    onMouseEnter={() => setHoveredFigure(fig.id)}
                    onMouseLeave={() => setHoveredFigure(null)}
                    style={{
                      background: visible ? (isHov ? w.color + "55" : "#111120") : "#0a0a0f",
                      border: `1px solid ${visible ? w.color : "#1a1a22"}`,
                      borderRadius: 6,
                      padding: "10px 14px",
                      opacity: visible ? 1 : 0.25,
                      transition: "all 0.3s",
                      cursor: visible ? "pointer" : "default",
                      minWidth: 140,
                      flex: "1"
                    }}>
                    <div style={{ fontSize: 13, color: visible ? w.lightColor : "#444", fontWeight: "bold", marginBottom: 3 }}>
                      {fig.name}
                    </div>
                    <div style={{ fontSize: 10, color: "#888880", marginBottom: visible && isHov ? 6 : 0 }}>
                      {fig.year}
                    </div>
                    {visible && isHov && (
                      <div style={{ fontSize: 11, color: "#c0b8a8", lineHeight: 1.5, borderTop: `1px solid ${w.color}44`, paddingTop: 6, marginTop: 4 }}>
                        {fig.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current figure spotlight */}
            {visibleFigures.length > 0 && (
              <div style={{
                marginTop: 16, background: "#0f0f1e",
                border: `1px solid ${wings[figures[timelineYear].wing].color}`,
                borderRadius: 6, padding: "14px 18px"
              }}>
                <span style={{ fontSize: 11, color: wings[figures[timelineYear].wing].lightColor, letterSpacing: 1 }}>
                  LATEST INTERLOCUTOR: </span>
                <span style={{ fontSize: 13, color: "#e0d8c8" }}>
                  {figures[timelineYear].name} ({figures[timelineYear].year}) — {figures[timelineYear].label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(122,58,144,0.2)", borderRadius: 8, padding: "clamp(16px,3vw,24px)", marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#b070d0", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7a3a90" : "rgba(122,58,144,0.1)",
                  border: `1px solid ${hoveredConcept === c.id ? "#b070d0" : "rgba(122,58,144,0.35)"}`,
                  borderRadius: 20,
                  fontSize: 12,
                  cursor: "pointer",
                  color: hoveredConcept === c.id ? "#f0ead8" : "#b070d0",
                  transition: "all 0.2s",
                  fontFamily: "Georgia, serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(122,58,144,0.08)",
              border: "1px solid rgba(122,58,144,0.3)",
              borderRadius: 6,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#b070d0", marginBottom: 8 }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#c8c0b4" }}>
                {keyConcepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#0d0d15",
          border: "1px solid #2a2a3a",
          borderLeft: "4px solid #7a3a90",
          borderRadius: 6,
          padding: "24px 28px",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#b070d0", marginBottom: 12, fontWeight: "bold" }}>
            THE DIFFICULTY
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#c8c0b0", margin: "0 0 14px 0" }}>
            Kant's system itself generates tensions that philosophy has grappled with ever since. The distinction between
            phenomena and noumena divides reality into what we can know and what we must think but cannot access — a fault
            line that later philosophers could not leave undisturbed. The practical postulates (God, freedom, immortality)
            that reason requires for morality seem to conflict with the theoretical prohibition on metaphysical knowledge.
            And the claim that universal rational principles govern morality sits uneasily with the reality of particular
            historical traditions, cultures, and embodied experience that shape moral life in irreducibly concrete ways.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#c8c0b0", margin: 0 }}>
            These tensions proved generative rather than destructive: they launched German Idealism (Fichte, Schelling, Hegel),
            existentialism (Kierkegaard, Sartre), analytic philosophy (Frege's response to psychologism, Strawson's
            neo-Kantianism), and continental thought (Husserl's phenomenology, Habermas's discourse ethics). Kant remains
            a living interlocutor rather than a closed chapter precisely because his questions are unfinished. This pressure
            forces the next development — the post-Kantian attempt to achieve what Kant left incomplete: a fully unified
            account of nature, freedom, and spirit that transcends the critical system's internal divisions without abandoning
            its fundamental insight into reason's self-legislative character.
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "#0d0d15",
          border: "1px solid #2a2a3a",
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 40
        }}>
          <button onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%", background: "transparent",
              border: "none", padding: "18px 28px",
              cursor: "pointer", fontFamily: "Georgia, serif",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
            <span style={{ fontSize: 10, letterSpacing: 3, color: "#E8A020", fontWeight: "bold" }}>
              REAL-WORLD ECHOES
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color="#E8A020" />
              : <ChevronDown size={16} color="#E8A020" />}
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 28px 24px 28px", borderTop: "1px solid #1a1a2a" }}>
              <p style={{ fontSize: 13, color: "#888880", fontStyle: "italic", marginBottom: 18, lineHeight: 1.6 }}>
                Kant's critical philosophy did not remain within academia — it shaped the institutions, declarations, and practices of modernity.
              </p>
              {[
                {
                  title: "The United Nations & International Court of Justice",
                  body: "Kant's 1795 essay Perpetual Peace envisioned a federation of republican states bound by international law. The UN, ICJ, and EU represent institutional realizations of precisely this vision — rational cosmopolitanism translated into law and governance."
                },
                {
                  title: "Universal Human Rights Declarations",
                  body: "The Universal Declaration of Human Rights (1948) grounds rights in the inherent dignity of the human person — a formulation that maps directly onto Kant's second formulation of the categorical imperative: treat humanity always as an end, never merely as a means."
                },
                {
                  title: "Cognitive Science & Constructive Perception",
                  body: "Contemporary neuroscience and cognitive psychology have confirmed that perception is constructive — the brain actively builds models of reality rather than passively recording it. Kant's transcendental aesthetic anticipated this by two centuries, identifying space and time as forms the mind imposes on experience."
                },
                {
                  title: "Applied Ethics — Medical, Business, Environmental",
                  body: "Across professional ethics, the categorical imperative provides a practical test: Can the maxim of your action be universalized? Does it treat persons as ends in themselves? Medical informed consent, corporate governance standards, and environmental ethics frameworks all draw on this Kantian scaffolding."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  background: "#0a0a12",
                  border: "1px solid #2a2a3a",
                  borderLeft: `3px solid #E8A020`,
                  borderRadius: 4,
                  padding: "14px 18px",
                  marginBottom: 12
                }}>
                  <div style={{ fontSize: 12, color: "#E8A020", fontWeight: "bold", marginBottom: 6, letterSpacing: 0.5 }}>
                    {echo.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b0a898", lineHeight: 1.7, margin: 0 }}>
                    {echo.body}
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

const vizMap = {
  "kant_revolutionary_introduction": KantRevolutionaryIntroduction,
  "making_of_revolutionary_mind": MakingOfRevolutionaryMind,
  "critical_turn_first_critique": CriticalTurnFirstCritique,
  "space_time_forms_of_intuition": SpaceTimeFormsOfIntuition,
  "categories_logic_of_experience": CategoriesLogicOfExperience,
  "transcendental_deduction_unity": TranscendentalDeductionUnity,
  "phenomena_noumena_limits_of_knowledge": PhenomenaNoumenaLimitsOfKnowledge,
  "antinomies_illusions_pure_reason": AntinomiesIllusionsPureReason,
  "transition_to_practical_philosophy": TransitionToPracticalPhilosophy,
  "categorical_imperative_foundation_morality": CategoricalImperativeFoundationMorality,
  "freedom_autonomy_goodwill": FreedomAutonomyGoodwill,
  "critique_practical_reason_moral_psychology": CritiquePracticalReasonMoralPsychology,
  "postulates_god_freedom_immortality": PostulatesGodFreedomImmortality,
  "critique_of_judgment_bridging_nature_freedom": CritiqueOfJudgmentBridgingNatureFreedom,
  "aesthetic_judgment_beautiful": AestheticJudgmentBeautiful,
  "sublime_limits_of_imagination": SublimeLimitsOfImagination,
  "genius_art_aesthetic_ideas": GeniusArtAestheticIdeas,
  "teleology_purposiveness_of_nature": TeleologyPurposivenessOfNature,
  "political_philosophy_perpetual_peace": PoliticalPhilosophyPerpetualPeace,
  "religion_within_boundaries_of_reason": ReligionWithinBoundariesOfReason,
  "unity_critical_system_kants_legacy": UnityCriticalSystemKantsLegacy
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