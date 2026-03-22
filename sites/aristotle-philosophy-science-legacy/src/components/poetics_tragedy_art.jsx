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

export default PoeticsTragedyArt;