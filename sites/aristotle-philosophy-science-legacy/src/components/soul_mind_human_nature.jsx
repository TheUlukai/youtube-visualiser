function SoulMindHumanNature() {
  const CORE_ARGUMENT = `For Aristotle, psyche (soul) is not a separate spiritual substance but the principle of life — the form or organization that makes a living body alive. All living things have nutritive soul; animals add sensitive soul (perception, desire, locomotion); humans add rational soul. Soul is inseparable from body as shape is inseparable from wax, making personal immortality generally impossible — except for the obscure 'active intellect,' described as separable, immortal, and eternal, generating centuries of conflicting interpretations. This hylemorphic psychology anticipates modern functionalism: mental states are defined by their functional roles (what they do causally) rather than their physical substrate, and could in principle be realized in different matter — while still failing to explain why functional organization produces subjective conscious experience.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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
        {/* The Core Idea */}
        {CORE_ARGUMENT && (
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}25`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                          color: ACCENT, marginBottom: 10 }}>
              The Core Idea
            </div>
            <p style={{ fontSize: 15, color: "#e8e0d4", lineHeight: 1.6,
                        margin: coreIdBody ? "0 0 8px" : 0 }}>
              {coreIdLead}
            </p>
            {coreIdBody && (
              <p style={{ fontSize: 13, color: "#a09898", lineHeight: 1.75, margin: 0 }}>
                {coreIdBody}
              </p>
            )}
          </div>
        )}


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

export default SoulMindHumanNature;