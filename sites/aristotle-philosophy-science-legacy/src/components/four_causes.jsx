function FourCauses() {
  const CORE_ARGUMENT = `Modern science explains by tracing effects back to prior physical events, but Aristotle insisted this is incomplete. Full explanation requires four causes: what something is made of (material), its structure or pattern (formal), the agent that brings it into being (efficient), and the purpose or goal it serves (final). For a bronze statue: bronze is the material cause, the shape is the formal cause, the sculptor is the efficient cause, and honoring Athena is the final cause. Aristotle applied this framework not only to artifacts but to natural objects, arguing that nature acts for ends — acorns grow into oaks because that is their natural telos — and this teleological biology dominated Western science until the scientific revolution systematically eliminated formal and final causes from physics.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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

export default FourCauses;