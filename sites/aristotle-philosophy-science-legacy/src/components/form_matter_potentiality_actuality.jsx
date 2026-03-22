function FormMatterPotentialityActuality() {
  const CORE_ARGUMENT = `Everything physical is a compound of form (organizing structure) and matter (underlying stuff), and change happens when matter loses one form and takes on another while persisting through the transition. This hylomorphism resolves Parmenides' paradox (change would require something from nothing) by showing that change moves from potential being to actual being — not from non-being. The seed is potentially a tree without being actually a tree; change actualizes that potential. Nothing, however, can move from potentiality to actuality on its own: actuality is metaphysically prior, and every chain of actualization must terminate in something that is pure actuality with no unrealized potential — Aristotle's Unmoved Mover.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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

export default FormMatterPotentialityActuality;