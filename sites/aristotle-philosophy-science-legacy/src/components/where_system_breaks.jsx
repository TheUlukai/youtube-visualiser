function WhereSystemBreaks() {
  const CORE_ARGUMENT = `Aristotle's system breaks at multiple foundational points: modern physics eliminated natural places, inertia refuted continuous movers, and quantum mechanics violates substance metaphysics at the fundamental level. Evolutionary biology eliminated fixed species with real essences. The hard problem of consciousness — why does functional organization produce subjective experience? — remains unanswered by hylemorphism. The is-ought gap challenges his naturalistic ethics. Feminist critics show that his exclusions of women and slaves are not incidental but built into his core metaphysical categories (matter as passive-feminine, form as active-masculine). Internal tensions — between particular and universal substances, between hylemorphism and the immortal active intellect — were never resolved. Yet the 20th century revival shows that even after all these failures, something valuable remains: his questions, his balanced approach between observation and theory, and specific domains like ethics, rhetoric, and narrative theory where his insights still outperform alternatives.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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

export default WhereSystemBreaks;