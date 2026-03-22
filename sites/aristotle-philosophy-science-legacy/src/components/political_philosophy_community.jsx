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

export default PoliticalPhilosophyCommunity;