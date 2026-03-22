function PhilosophyOfHistory() {
  const CORE_ARGUMENT = `Hegel argues that history exhibits a comprehensible rational development: the motor is the human need for recognition, whose inevitable conflicts generate dialectical change as societies develop new institutions to overcome existing contradictions. He divides world history into four epochs — Oriental (one is free: the despot), Greek (some are free: the citizen), Roman (legal universality without ethical community), Germanic (all are in principle free through the Christian-Protestant-Enlightenment inheritance) — each representing a higher stage of freedom's self-consciousness. Historical change occurs through the 'cunning of reason': particular passions and interests serve as unwitting instruments of rational development they did not intend. The French Revolution exemplifies both the achievement of universal freedom and the terror of applying abstract principles without mediating institutions.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [selectedEpoch, setSelectedEpoch] = useState(null);
  const [hoveredEpoch, setHoveredEpoch] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredEchos, setHoveredEchos] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const epochs = [
    {
      id: "oriental",
      label: "Oriental",
      subtitle: "One is Free",
      period: "Ancient East",
      color: "#C2410C",
      freedom: "Freedom exists only in the despot. The divine ruler embodies the state absolutely; all others exist as subjects without personal right.",
      contradiction: "When freedom belongs to one alone, it is arbitrary will — not true freedom. The despot's whim is not reason, and subjugated peoples cannot recognize themselves as free.",
      transition: "The Persian synthesis of diverse peoples under law plants the seed of universality, but the structure collapses under its own rigidity, giving way to the Greek spirit of civic participation.",
      motif: "pyramid"
    },
    {
      id: "greek",
      label: "Greek",
      subtitle: "Some are Free",
      period: "Classical Antiquity",
      color: "#9A3412",
      freedom: "The citizen participates in the life of the polis. Beautiful ethical community — the individual finds meaning in collective civic existence.",
      contradiction: "Freedom is real but limited: slaves and women are excluded. The unity of individual and community rests on unreflective custom, not self-conscious reason. Socratic questioning destroys the naive harmony.",
      transition: "The collapse of the polis under Alexander and Rome universalizes the Greek individual — but strips citizenship of its ethical community, leaving only abstract legal personhood.",
      motif: "parthenon"
    },
    {
      id: "roman",
      label: "Roman",
      subtitle: "Legal Universality",
      period: "Roman Empire",
      color: "#7C2D12",
      freedom: "Every person is a legal subject — a formal right-bearer before the law. The concept of the person achieves universal scope.",
      contradiction: "Legal universality without ethical community. The Roman 'person' is a hollow abstraction; real life is servitude and empire. The longing for genuine inner freedom cannot be satisfied by external law alone.",
      transition: "Christianity answers Roman alienation by locating freedom in the inner life — the soul's infinite worth before God — transforming the abstract legal person into a spiritually free subject.",
      motif: "eagle"
    },
    {
      id: "germanic",
      label: "Germanic",
      subtitle: "All are Free",
      period: "Modern World",
      color: "#854D0E",
      freedom: "Through the Protestant Reformation, Enlightenment, and French Revolution, the principle is established: all persons are free in principle. The rational state embodies this in concrete institutions.",
      contradiction: "The French Revolution shows the danger of abstract freedom — applying universal principles without mediating institutions produces the Terror. Freedom must be realized through particular institutions, not abstract will.",
      transition: "Constitutional monarchy synthesizes popular sovereignty with institutional stability — but even the most rational political order remains historically particular, raising the question of what lies beyond political history.",
      motif: "arch"
    }
  ];

  const echoes = [
    { title: "Persian Empire", text: "Incorporated diverse peoples under administrative universality while maintaining despotic structure — the Oriental moment of unity-without-freedom replayed in every modern authoritarian 'modernizer'." },
    { title: "Greek City-States", text: "Achieved genuine political participation and civic identity, yet excluded slaves and women — a recurring pattern where freedom is real for insiders and nonexistent for those the community defines as outside." },
    { title: "The French Revolution & Terror", text: "Applied abstract universal principles — Liberty, Equality — without the mediating institutions that make freedom concrete. Every revolutionary purism that destroys existing structures risks reproducing the Terror." },
    { title: "Constitutional Monarchy", text: "Hegel's synthesis: representative institutions, rule of law, and an executive that embodies state unity. The tension between populism and constitutional constraint is the Germanic world's living problem." }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      const w = container.offsetWidth;
      const h = Math.min(120, w * 0.18);
      canvas.width = w;
      canvas.height = h;
    });
    resizeObserver.observe(container);

    const w = container.offsetWidth;
    const h = Math.min(120, w * 0.18);
    canvas.width = w;
    canvas.height = h;

    const draw = (timestamp) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;
      const ctx = canvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // River base gradient
      const riverGrad = ctx.createLinearGradient(0, 0, cw, 0);
      riverGrad.addColorStop(0, "#1a0a02");
      riverGrad.addColorStop(0.25, "#3d1a08");
      riverGrad.addColorStop(0.5, "#5c2a0e");
      riverGrad.addColorStop(0.75, "#7a3510");
      riverGrad.addColorStop(1, "#9a4515");
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, 0, cw, ch);

      // River flow lines
      for (let layer = 0; layer < 6; layer++) {
        ctx.beginPath();
        const yBase = ch * 0.2 + layer * (ch * 0.12);
        const amplitude = 3 + layer * 1.5;
        const freq = 0.008 + layer * 0.002;
        const speed = 0.4 + layer * 0.15;
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= cw; x += 4) {
          const y = yBase + Math.sin(x * freq + t * speed) * amplitude + Math.sin(x * freq * 1.7 + t * speed * 0.6) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }
        const alpha = 0.15 + layer * 0.05;
        ctx.strokeStyle = `#F97316${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Eddies at transition points (between epochs)
      const eddiePosX = [cw * 0.27, cw * 0.5, cw * 0.73];
      eddiePosX.forEach((ex, i) => {
        const ey = ch * 0.5;
        const pulseR = 8 + Math.sin(t * 1.2 + i * 2.1) * 4;
        for (let ring = 0; ring < 3; ring++) {
          const r = pulseR + ring * 8;
          const alpha = Math.max(0, 0.4 - ring * 0.12) * (0.6 + 0.4 * Math.sin(t * 0.8 + i));
          ctx.beginPath();
          ctx.arc(ex, ey, r, 0, Math.PI * 2);
          ctx.strokeStyle = `#F97316${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Spiral
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 4; angle += 0.15) {
          const spiralR = (angle / (Math.PI * 4)) * pulseR;
          const sx = ex + spiralR * Math.cos(angle + t * 2 + i);
          const sy = ey + spiralR * Math.sin(angle + t * 2 + i) * 0.6;
          if (angle === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `#FDBA74aa`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Floating particles
      for (let p = 0; p < 20; p++) {
        const px = ((p * 137.5 + t * 30) % cw);
        const py = ch * 0.2 + Math.sin(px * 0.02 + t * 0.3 + p) * ch * 0.3;
        const alpha = 0.3 + 0.3 * Math.sin(t * 0.5 + p);
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `#FED7AA${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  function PyramidMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <polygon points="30,4 56,46 4,46" fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" />
        <line x1="30" y1="4" x2="30" y2="46" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="18" y1="25" x2="42" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
        <circle cx="30" cy="10" r="2.5" fill={color} opacity="0.8" />
      </svg>
    );
  }

  function ParthenonMotif({ color, size }) {
    const cols = 6;
    const colW = 42 / cols;
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <rect x="6" y="40" width="48" height="5" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <rect x="10" y="35" width="40" height="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
        <polygon points="8,12 52,12 56,20 4,20" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        {Array.from({ length: cols }).map((_, i) => (
          <rect key={i} x={12 + i * 7} y="20" width="3" height="15" fill={color} opacity="0.7" />
        ))}
      </svg>
    );
  }

  function EagleMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <ellipse cx="30" cy="28" rx="8" ry="10" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M22,24 Q10,15 6,20 Q14,22 22,28" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M38,24 Q50,15 54,20 Q46,22 38,28" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <path d="M26,38 Q30,44 34,38" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
        <circle cx="30" cy="22" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <path d="M28,20 Q30,17 32,20" fill={color} opacity="0.8" />
      </svg>
    );
  }

  function ArchMotif({ color, size }) {
    return (
      <svg viewBox="0 0 60 50" width={size} height={size * 0.83} style={{ display: "block" }}>
        <path d="M12,46 L12,22 Q12,6 30,6 Q48,6 48,22 L48,46" fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" />
        <path d="M18,46 L18,24 Q18,14 30,14 Q42,14 42,24 L42,46" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <line x1="6" y1="46" x2="54" y2="46" stroke={color} strokeWidth="2" opacity="0.9" />
        <circle cx="30" cy="6" r="3" fill={color} opacity="0.7" />
        <line x1="30" y1="6" x2="30" y2="46" stroke={color} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
      </svg>
    );
  }

  function EpochMotif({ motif, color, size }) {
    if (motif === "pyramid") return <PyramidMotif color={color} size={size} />;
    if (motif === "parthenon") return <ParthenonMotif color={color} size={size} />;
    if (motif === "eagle") return <EagleMotif color={color} size={size} />;
    if (motif === "arch") return <ArchMotif color={color} size={size} />;
    return null;
  }

  const outerStyle = {
    background: "radial-gradient(ellipse at 40% 30%, #3d1a0880 0%, #1a0a0260 40%, #0a0a0f 100%)",
    minHeight: "100vh",
    fontFamily: "Georgia, serif",
    padding: "clamp(16px, 4vw, 40px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const wrapperStyle = {
    width: "100%",
    maxWidth: "min(90vw, 860px)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(20px, 3vw, 32px)"
  };

  const accent = "#C2410C";

  const keyConcepts = [
    { id: "cunning_of_reason", label: "Cunning of Reason", desc: "The cunning of reason (List der Vernunft) is Hegel's explanation for how rational outcomes emerge from irrational passions: world-historical individuals pursue self-interested goals, but reason uses those passions as instruments for its own ends. Caesar conquered for personal glory; reason used him to create the conditions for a new political epoch." },
    { id: "historical_epochs", label: "World-Historical Epochs", desc: "Hegel divides world history into four epochs corresponding to different stages of freedom's realization: the Oriental world (one free), the Greek world (some free), the Roman world (abstract legal freedom for all), and the Germanic world (freedom fully actualized in the constitutional state). Each stage inherits the problems of the last and raises the degree of conscious freedom." },
    { id: "recognition", label: "Recognition and Historical Change", desc: "The struggle for recognition is the engine of historical change. Peoples and world-historical individuals demand that their claims to freedom and self-determination be acknowledged, and when existing institutions deny that recognition, historical rupture follows. The French Revolution is the most dramatic example: the demand for universal recognition overturning an entire social order." },
    { id: "french_revolution", label: "French Revolution", desc: "The French Revolution is the pivotal world-historical event in Hegel's account — the moment when freedom becomes a conscious political principle that the modern world must institutionalize. But its abstract universalism, disconnected from concrete institutions and traditions, collapses into the Terror. For Hegel, this proves that freedom must be institutionally embodied, not merely asserted." },
    { id: "constitutional_monarchy", label: "Constitutional Monarchy", desc: "The rational state, for Hegel, takes the form of a constitutional monarchy in which universal law, particular interests (represented through estates and civil society), and individual sovereignty are unified. This is not a defense of arbitrary monarchy but of a differentiated state structure in which rational freedom is concretely realized for all members." },
    { id: "geist_in_history", label: "Spirit in History", desc: "Hegel's philosophy of history is not mere chronology but the account of Geist (Spirit) becoming self-conscious through temporal development. History has a structure — it is going somewhere — and that destination is freedom's self-knowledge. Nations are the vehicles of Spirit at particular stages; no nation is the permanent bearer, and history 'uses up' peoples as it advances." },
  ];

  const cardStyle = {
    background: "#0e080280",
    border: "1px solid #854D0E40",
    borderRadius: "8px",
    padding: "clamp(16px, 3vw, 28px)"
  };

  const problemCardStyle = {
    ...cardStyle,
    borderLeft: "4px solid #854D0E",
    background: "#0e080290"
  };

  const difficultyCardStyle = {
    ...cardStyle,
    borderLeft: "4px solid #7C2D12",
    background: "#0e080290"
  };

  const labelStyle = {
    fontVariant: "small-caps",
    fontSize: "clamp(10px, 1.4vw, 12px)",
    letterSpacing: "0.12em",
    color: "#C2410C",
    marginBottom: "10px",
    textTransform: "uppercase"
  };

  return (
    <div style={outerStyle}>
      <div style={wrapperStyle}>

        {/* Part indicator */}
        <div style={{ textAlign: "center", marginBottom: "-8px" }}>
          <span style={{ fontSize: "clamp(10px, 1.3vw, 11px)", color: "#854D0E90", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Part 9 of 20 — Philosophy of Spirit
          </span>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", color: "#FED7AA", margin: "0 0 10px 0", fontWeight: "normal", letterSpacing: "0.03em" }}>
            The Cunning of Reason
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: "#FDBA7490", margin: 0, fontStyle: "italic", lineHeight: "1.5" }}>
            World history is the progressive realization of human freedom, driven not by conscious planning but by the rational outcomes that emerge from the collision of particular passions.
          </p>
        </div>

        {/* 1. PROBLEM PANEL */}
        <div style={problemCardStyle}>
          <div style={labelStyle}>The Problem</div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#FED7AAcc", lineHeight: "1.7", margin: 0 }}>
            If the rational state is the highest form of objective spirit — the institutional embodiment of freedom — then history confronts philosophy with an urgent question. How did humanity arrive at it? Surveying the vast pageant of empires, conquests, and civilizations that preceded the modern world, one finds not steady progress but apparent chaos: dynasties rising and falling, wars obliterating cultures, passions and accidents shaping outcomes. Is there a rational pattern underlying the seemingly chaotic succession of historical empires and cultures, or is the idea of the rational state merely our present flattering itself?
          </p>
        </div>
        {/* The Core Idea */}
        {CORE_ARGUMENT && (
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${accent}25`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                          color: accent, marginBottom: 10 }}>
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


        {/* 2. MAIN VISUALIZATION */}
        <div style={{ ...cardStyle, background: "#08050290", border: "1px solid #854D0E30" }}>

          {/* Header */}
          <div style={{ marginBottom: "clamp(16px, 2.5vw, 24px)" }}>
            <div style={labelStyle}>The Four World-Historical Epochs</div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#FDBA7480", margin: 0, fontStyle: "italic" }}>
              Click any epoch to explore its form of freedom, its inner contradiction, and the transition that drove history forward.
            </p>
          </div>

          {/* Epoch markers — horizontal flow */}
          <div ref={containerRef} style={{ width: "100%" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(6px, 1.5vw, 14px)",
              marginBottom: "16px"
            }}>
              {epochs.map((epoch, idx) => {
                const isSelected = selectedEpoch === epoch.id;
                const isHovered = hoveredEpoch === epoch.id;
                const motifSize = 52;
                return (
                  <div
                    key={epoch.id}
                    onClick={() => setSelectedEpoch(isSelected ? null : epoch.id)}
                    onMouseEnter={() => setHoveredEpoch(epoch.id)}
                    onMouseLeave={() => setHoveredEpoch(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "clamp(10px, 2vw, 18px) clamp(6px, 1.5vw, 12px)",
                      background: isSelected ? "#3d1a0850" : isHovered ? "#2a100420" : "#1a080210",
                      border: `1px solid ${isSelected ? epoch.color + "cc" : isHovered ? epoch.color + "60" : epoch.color + "30"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? `0 0 20px ${epoch.color}40` : isHovered ? `0 0 10px ${epoch.color}20` : "none",
                      position: "relative"
                    }}
                  >
                    {/* Roman numeral */}
                    <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: epoch.color + "90", marginBottom: "6px", letterSpacing: "0.1em" }}>
                      {["I", "II", "III", "IV"][idx]}
                    </span>

                    {/* Motif */}
                    <div style={{ marginBottom: "8px", filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${epoch.color}80)` : "none", transition: "filter 0.25s ease" }}>
                      <EpochMotif motif={epoch.motif} color={epoch.color} size={motifSize} />
                    </div>

                    <span style={{ fontSize: "clamp(11px, 1.5vw, 14px)", fontWeight: "bold", color: "#FED7AAcc", marginBottom: "3px", textAlign: "center" }}>
                      {epoch.label}
                    </span>
                    <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: epoch.color, fontStyle: "italic", textAlign: "center", lineHeight: "1.3" }}>
                      {epoch.subtitle}
                    </span>
                    <span style={{ fontSize: "clamp(8px, 1.1vw, 10px)", color: "#FDBA7450", marginTop: "4px", textAlign: "center" }}>
                      {epoch.period}
                    </span>

                    {isSelected && (
                      <div style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        background: epoch.color,
                        borderRadius: "50%"
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Connector arrows between epochs */}
            <svg viewBox="0 0 800 30" width="100%" style={{ display: "block", marginBottom: "0px", overflow: "visible" }}>
              {[0.27, 0.5, 0.73].map((x, i) => (
                <g key={i}>
                  <line x1={x * 800 - 20} y1="15" x2={x * 800 + 20} y2="15" stroke="#854D0E60" strokeWidth="1.5" />
                  <polygon points={`${x * 800 + 20},15 ${x * 800 + 12},11 ${x * 800 + 12},19`} fill="#854D0E60" />
                </g>
              ))}
              <text x="400" y="28" textAnchor="middle" fill="#854D0E50" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">
                dialectical transitions
              </text>
            </svg>

            {/* Animated River: Cunning of Reason */}
            <div style={{ position: "relative", marginTop: "4px" }}>
              <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", borderRadius: "6px", border: "1px solid #854D0E30" }}
              />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                textAlign: "center"
              }}>
                <span style={{ fontSize: "clamp(9px, 1.3vw, 12px)", color: "#FED7AA80", fontStyle: "italic", letterSpacing: "0.08em", textShadow: "0 0 8px #0a0a0f" }}>
                  ~ The Cunning of Reason ~
                </span>
              </div>
            </div>
            <p style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#854D0E70", fontStyle: "italic", textAlign: "center", margin: "6px 0 0 0" }}>
              Eddies mark the collision of passions that generate unintended rational outcomes
            </p>
          </div>

          {/* Expanded epoch detail */}
          {selectedEpoch && (() => {
            const epoch = epochs.find(e => e.id === selectedEpoch);
            return (
              <div style={{
                marginTop: "clamp(14px, 2vw, 20px)",
                padding: "clamp(14px, 2.5vw, 22px)",
                background: "#1a080230",
                border: `1px solid ${epoch.color}50`,
                borderRadius: "8px",
                borderLeft: `4px solid ${epoch.color}`,
                animation: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <EpochMotif motif={epoch.motif} color={epoch.color} size={40} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "clamp(15px, 2.2vw, 20px)", color: "#FED7AA", fontWeight: "normal" }}>
                      The {epoch.label} World
                    </h3>
                    <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: epoch.color, fontStyle: "italic" }}>
                      {epoch.subtitle} — {epoch.period}
                    </span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Form of Freedom
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.freedom}
                    </p>
                  </div>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Inner Contradiction
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.contradiction}
                    </p>
                  </div>
                  <div style={{ background: "#0e050110", border: `1px solid ${epoch.color}25`, borderRadius: "6px", padding: "14px", gridColumn: epoch.id === "germanic" ? "1 / -1" : "auto" }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.12em", color: epoch.color + "cc", marginBottom: "8px" }}>
                      Transition Forward
                    </div>
                    <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA99", lineHeight: "1.65", margin: 0 }}>
                      {epoch.transition}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

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

        {/* 3. DIFFICULTY PANEL */}
        <div style={difficultyCardStyle}>
          <div style={{ ...labelStyle, color: "#C2410C" }}>The Difficulty</div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#FED7AAcc", lineHeight: "1.7", margin: "0 0 12px 0" }}>
            Even the most rational political order — the constitutional state that embodies freedom for all — remains historically particular and finite. It arose through specific cultural struggles, Protestant and Enlightenment traditions, revolutionary upheaval, and it bears the marks of its origins. If history is the self-development of reason toward freedom, and if the modern state represents the culmination of political history, then what lies beyond? The nation-state can be rational in form and yet provincial in spirit, capable of war, domination, and cultural narrowness. The question presses: is political self-consciousness the ultimate form of human achievement, or does spirit seek a higher medium — art, religion, philosophy — in which it knows itself not as citizen but as the thinking subject that comprehends the whole?
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#C2410C90", fontStyle: "italic", margin: 0 }}>
            This pressure forces the next development: the move from Objective Spirit — spirit realized in institutions — to Absolute Spirit, where humanity recognizes its deepest nature not in political community but in art, revealed religion, and philosophical thought.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES — collapsible */}
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={() => setHoveredEchos(true)}
            onMouseLeave={() => setHoveredEchos(false)}
            style={{
              width: "100%",
              background: hoveredEchos ? "#1a080220" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.2s ease"
            }}
          >
            <span style={{ ...labelStyle, margin: 0, color: "#C2410C" }}>Real-World Echoes</span>
            <span style={{ color: "#854D0E" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 2.5vw, 24px)", borderTop: "1px solid #854D0E20" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "14px", marginTop: "16px" }}>
                {echoes.map((echo, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#14060210",
                        border: "1px solid #854D0E25",
                        borderRadius: "6px",
                        padding: "14px",
                      }}
                    >
                      <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#C2410C", fontWeight: "bold", marginBottom: "8px" }}>
                        {echo.title}
                      </div>
                      <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#FED7AA80", lineHeight: "1.6", margin: 0 }}>
                        {echo.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: "8px" }}>
          <span style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#854D0E50", letterSpacing: "0.15em", fontStyle: "italic" }}>
            Hegel's Philosophy of History — The Cunning of Reason
          </span>
        </div>

      </div>
    </div>
  );
}

export default PhilosophyOfHistory;