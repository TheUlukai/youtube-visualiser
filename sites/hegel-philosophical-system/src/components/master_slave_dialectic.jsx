function MasterSlaveDialectic() {
  const CORE_ARGUMENT = `When two self-consciousnesses meet, each claiming universal validity, a struggle for recognition ensues in which one risks death and becomes master while the other submits and becomes slave. The master's victory is Pyrrhic: recognition from a coerced inferior is worthless, and the master becomes dependent on the slave for all material needs. Meanwhile, through disciplined labor the slave develops genuine competence, encounters the resistance of the material world, and sees himself reflected in his products — achieving a more substantive self-consciousness than the master's abstract domination. The dialectical reversal is complete when the slave's growing autonomy makes the master's power unsustainable.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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

export default MasterSlaveDialectic;