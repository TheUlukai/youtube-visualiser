function Alienation() {
  const CORE_ARGUMENT = `Alienation occurs whenever consciousness encounters its own products or expressions as foreign powers that appear to control it — in relationship to nature, social institutions, cultural achievements, religious projections, and philosophical abstractions. All forms of alienation share the structure of externality: something that actually expresses human activity appears as an independent force opposing human purposes. But alienation also serves crucial positive functions: it forces consciousness to confront the inadequacy of immediate relationships, develops critical distance from tradition, and motivates social reform. The goal is not to eliminate alienation by returning to pre-alienated immediacy, but to achieve 'mediated immediacy' — forms of relationship that preserve the gains of reflection while enabling genuine recognition within concrete institutions.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

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

export default Alienation;