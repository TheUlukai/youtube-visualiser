function CivilSociety() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const figuresRef = useRef([]);
  const containerRef = useRef(null);

  const accent = "#D97706";

  const keyConcepts = [
    { id: "system_of_needs", label: "System of Needs", desc: "The system of needs is Hegel's name for the market economy understood philosophically: a vast web of mutual dependence in which each person pursues private ends and, through that very pursuit, serves others' needs. It is the first sphere of civil society and generates unprecedented freedom and social complexity, but also systemic inequality and alienation." },
    { id: "division_of_labor", label: "Division of Labor", desc: "Through specialization, individuals become dependent on the social whole for their survival and development. Division of labor is simultaneously liberating (it allows mastery and market participation) and limiting (it narrows the individual's activity and makes her vulnerable to economic forces beyond her control, a theme Marx would later radicalize)." },
    { id: "administration_of_justice", label: "Administration of Justice", desc: "Civil society requires a legal system that transforms abstract right into positive law — actually enforceable rules specifying rights of property, contract, and personal security. For Hegel this is not merely a practical necessity but a recognition: law makes persons visible to each other as rights-bearing subjects, not merely as competitors." },
    { id: "police_regulation", label: "Police (Public Regulation)", desc: "In Hegel's usage, 'police' (Polizei) means something much broader than law enforcement: the entire system of public economic regulation, consumer protection, poverty relief, and public works. It exists because market exchange alone cannot guarantee welfare or correct systemic failures — a kind of proto-welfare-state function." },
    { id: "corporation", label: "Corporation", desc: "Corporations (professional guilds and voluntary associations) are intermediate institutions between the isolated individual and the state. They provide social identity, mutual support, and ethical formation for their members — bridging the gap between private market actors and the public political community, and countering the atomization the market otherwise produces." },
    { id: "inequality", label: "Social Class and Inequality", desc: "Civil society inevitably generates three social classes — the agricultural class, the business class, and the universal class (civil servants) — and chronic inequality. Hegel sees this not as a contingent failure but as structurally necessary: the very freedom that enables development also enables concentration of advantage. This tension is what compels the state." },
  ];

  const districts = {
    family: {
      label: "Family",
      emoji: "🏠",
      color: "#7C3AED",
      x: 12, y: 55,
      title: "The Family",
      concept: "Natural Unity",
      description: "The family is the original ethical community — bound by love and biological ties rather than contract. It provides children's first recognition and instills ethical dispositions. But it cannot extend recognition to strangers, nor can it meet the complex needs of modern individuals through mere domestic life alone.",
      limitation: "Limited to blood and sentiment; cannot address the universal stranger."
    },
    corporations: {
      label: "Corporations",
      emoji: "⚙️",
      color: "#059669",
      x: 70, y: 20,
      title: "The Corporation",
      concept: "Occupational Associations",
      description: "Corporations — Hegel's term for guilds and professional associations — provide a second family for individuals. They confer social honor and identity through one's craft or profession, offering mutual support and a sense of belonging that pure market relations destroy. They mediate between private individuals and the abstract state.",
      limitation: "Particular loyalties can conflict with universal interest; risk of guild protectionism."
    },
    justice: {
      label: "Justice",
      emoji: "⚖️",
      color: "#2563EB",
      x: 70, y: 75,
      title: "Administration of Justice",
      concept: "Legal Framework",
      description: "Abstract right must be made concrete in laws and courts. The administration of justice transforms the empty form of rights into a living institution — enforcing contracts, protecting property, and adjudicating disputes. Without law, market exchange collapses into mere power.",
      limitation: "Law treats persons as formal equals while ignoring substantive inequalities."
    },
    police: {
      label: "Police / Regulation",
      emoji: "🏛️",
      color: "#DC2626",
      x: 12, y: 20,
      title: "The Police (Public Regulation)",
      concept: "Public Economic Regulation & Welfare",
      description: "Hegel's 'police' (Polizei) is far broader than law enforcement — it encompasses all public economic regulation, infrastructure, consumer protection, and social welfare. It corrects market failures: preventing monopoly, ensuring public health and safety, and providing for those who cannot provide for themselves through the market.",
      limitation: "Paternalistic regulation risks stifling the very freedom civil society exists to protect."
    },
    state: {
      label: "The State",
      emoji: "🏛️",
      color: "#D97706",
      x: 41, y: 2,
      title: "The State (on the Horizon)",
      concept: "Ethical Totality",
      description: "The state is not simply a regulator of civil society but its ethical completion. Where civil society sees only particular interests, the state grasps the universal good. It gives civil society its ultimate rational form — not by abolishing market freedom but by embedding it within institutions that honor the common life.",
      limitation: "The state's relation to civil society remains deeply contested — is it guardian or oppressor?"
    }
  };

  const inequalityData = [
    { label: "Merchant", size: 1.0, color: "#D97706", growth: 0.008 },
    { label: "Artisan", size: 0.65, color: "#6B7280", growth: 0.002 },
    { label: "Worker", size: 0.45, color: "#6B7280", growth: -0.001 },
    { label: "Poor", size: 0.25, color: "#4B5563", growth: -0.004 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initFigures(canvas);
    });

    resizeObserver.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initFigures(canvas);
    animate(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  function initFigures(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const figures = [];
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.28;

    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      figures.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        pile: 3 + Math.random() * 8,
        role: i < 3 ? "rich" : i < 10 ? "middle" : "poor",
        cx, cy, radius
      });
    }
    figuresRef.current = figures;
  }

  function animate(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw market floor
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
      grad.addColorStop(0, "#1a0f00");
      grad.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw market ring
      ctx.strokeStyle = "#D9770640";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.33, 0, Math.PI * 2);
      ctx.stroke();

      // Label
      ctx.fillStyle = "#D97706";
      ctx.font = `bold ${Math.max(10, w * 0.025)}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.fillText("MARKETPLACE", cx, cy - Math.min(w, h) * 0.3);

      const figures = figuresRef.current;
      figures.forEach(fig => {
        // Bounce within market circle
        const dx = fig.x - cx;
        const dy = fig.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > fig.radius * 0.88) {
          fig.vx -= dx * 0.002;
          fig.vy -= dy * 0.002;
        }

        fig.x += fig.vx;
        fig.y += fig.vy;
        fig.vx *= 0.99;
        fig.vy *= 0.99;
        if (Math.abs(fig.vx) < 0.05) fig.vx += (Math.random() - 0.5) * 0.3;
        if (Math.abs(fig.vy) < 0.05) fig.vy += (Math.random() - 0.5) * 0.3;

        // Accumulation effect
        if (fig.role === "rich") fig.pile = Math.min(fig.pile + 0.015, 20);
        else if (fig.role === "poor") fig.pile = Math.max(fig.pile - 0.008, 0.5);

        // Draw figure
        const r = Math.max(3, Math.min(w, h) * 0.018);
        const pileColor = fig.role === "rich" ? "#D97706" : fig.role === "middle" ? "#6B7280" : "#374151";
        
        // Pile of goods
        ctx.fillStyle = pileColor + "80";
        ctx.beginPath();
        ctx.ellipse(fig.x, fig.y + r * 0.8, r * 0.4 * (fig.pile / 8), r * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Person body
        ctx.fillStyle = fig.role === "rich" ? "#F59E0B" : fig.role === "middle" ? "#9CA3AF" : "#4B5563";
        ctx.beginPath();
        ctx.arc(fig.x, fig.y, r * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = "#FBBF7480";
        ctx.beginPath();
        ctx.arc(fig.x, fig.y - r * 0.7, r * 0.32, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }

  const districtKeys = Object.keys(districts);

  const svgPositions = {
    family: { cx: "14%", cy: "62%" },
    corporations: { cx: "72%", cy: "22%" },
    justice: { cx: "72%", cy: "76%" },
    police: { cx: "14%", cy: "22%" },
    state: { cx: "50%", cy: "5%" }
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3d1c02 0%, #1a0d00 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8dcc8"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vw, 32px)"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#D97706",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 14 of 20 — Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            color: "#F5DEB3",
            margin: "0 0 8px",
            fontWeight: "normal",
            lineHeight: 1.2
          }}>The World of Needs and Work</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c4a97a",
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.5
          }}>Civil society is the realm of market relationships and voluntary associations<br style={{ display: "none" }} /> that enables individual freedom while generating inequalities requiring institutional correction.</p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "#0f0a04ee",
          border: "1px solid #2a1a08",
          borderLeft: "4px solid #D97706",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D97706",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd0b8",
            margin: 0
          }}>
            The movement beyond unhappy consciousness and toward reason requires concrete institutions — but what is the character of the intermediate social realm between the family and the state where individuals first encounter each other as strangers? The family offers warmth and unity, but it cannot recognize the universal person. Pure abstract right is too thin to sustain a life. Something must stand between the intimacy of the home and the grandeur of the state: a world of strangers exchanging goods and labor, seeking recognition not through love but through work, need, and mutual dependence.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "#0c0804f5",
          border: "1px solid #2a1a08",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <h2 style={{
              fontSize: "clamp(15px, 2.2vw, 20px)",
              color: "#F5DEB3",
              margin: "0 0 6px",
              fontWeight: "normal"
            }}>Civil Society: The Marketplace and Its Districts</h2>
            <p style={{
              fontSize: "clamp(12px, 1.5vw, 14px)",
              color: "#a0896a",
              margin: 0,
              fontStyle: "italic"
            }}>Click any district to explore its role and limitation. Watch the marketplace below — inequality accumulates in real time.</p>
          </div>

          {/* City Map SVG + Canvas composite */}
          <div style={{ position: "relative", width: "100%" }}>
            <svg
              viewBox="0 0 500 320"
              width="100%"
              style={{ display: "block", maxWidth: "860px" }}
              aria-label="Civil Society Map"
            >
              {/* Background */}
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#1a1000" />
                  <stop offset="100%" stopColor="#060408" />
                </radialGradient>
                <radialGradient id="marketGlow" cx="50%" cy="55%" r="30%">
                  <stop offset="0%" stopColor="#D9770618" />
                  <stop offset="100%" stopColor="#D9770600" />
                </radialGradient>
              </defs>
              <rect width="500" height="320" fill="url(#bgGrad)" rx="8" />
              <rect width="500" height="320" fill="url(#marketGlow)" rx="8" />

              {/* Connecting lines from districts to center */}
              {[
                { x1: 70, y1: 198, x2: 210, y2: 185 },
                { x1: 362, y1: 72, x2: 302, y2: 140 },
                { x1: 362, y1: 245, x2: 302, y2: 195 },
                { x1: 70, y1: 72, x2: 198, y2: 140 },
                { x1: 250, y1: 22, x2: 250, y2: 118 }
              ].map((line, i) => (
                <line
                  key={i}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="#D9770630"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Canvas marketplace in center - represented as embedded foreignObject */}
              <foreignObject x="140" y="108" width="220" height="160">
                <div style={{ width: "100%", height: "100%" }}>
                  <canvas
                    ref={canvasRef}
                    style={{ width: "100%", height: "100%", display: "block", borderRadius: "50%" }}
                  />
                </div>
              </foreignObject>

              {/* Market circle border */}
              <circle cx="250" cy="188" r="110" fill="none" stroke="#D9770650" strokeWidth="1.5" strokeDasharray="6 3" />

              {/* District nodes */}
              {/* Family - bottom left */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "family" ? null : "family")}
                onMouseEnter={() => setHoveredDistrict("family")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="10" y="162" width="120" height="74" rx="8"
                  fill={selectedDistrict === "family" ? "#2d1a5a" : hoveredDistrict === "family" ? "#1e1240" : "#140d2a"}
                  stroke={selectedDistrict === "family" ? "#7C3AED" : "#3d2870"}
                  strokeWidth={selectedDistrict === "family" ? 2 : 1}
                />
                <text x="70" y="184" textAnchor="middle" fill="#A78BFA" fontSize="18">🏠</text>
                <text x="70" y="203" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold">FAMILY</text>
                <text x="70" y="217" textAnchor="middle" fill="#8b7fc0" fontSize="8.5" fontFamily="Georgia, serif">Natural Unity</text>
                <text x="70" y="228" textAnchor="middle" fill="#6d6494" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">love & kinship</text>
              </g>

              {/* Police - top left */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "police" ? null : "police")}
                onMouseEnter={() => setHoveredDistrict("police")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="10" y="30" width="120" height="74" rx="8"
                  fill={selectedDistrict === "police" ? "#3d0a0a" : hoveredDistrict === "police" ? "#280808" : "#1a0808"}
                  stroke={selectedDistrict === "police" ? "#DC2626" : "#5a1a1a"}
                  strokeWidth={selectedDistrict === "police" ? 2 : 1}
                />
                <text x="70" y="52" textAnchor="middle" fill="#FCA5A5" fontSize="18">🏛</text>
                <text x="70" y="70" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">POLICE / REGULATION</text>
                <text x="70" y="84" textAnchor="middle" fill="#c08080" fontSize="8.5" fontFamily="Georgia, serif">Public Regulation</text>
                <text x="70" y="96" textAnchor="middle" fill="#805050" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">welfare & order</text>
              </g>

              {/* Corporations - top right */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "corporations" ? null : "corporations")}
                onMouseEnter={() => setHoveredDistrict("corporations")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="370" y="30" width="120" height="74" rx="8"
                  fill={selectedDistrict === "corporations" ? "#0a2d1e" : hoveredDistrict === "corporations" ? "#071e14" : "#041208"}
                  stroke={selectedDistrict === "corporations" ? "#059669" : "#0a3a20"}
                  strokeWidth={selectedDistrict === "corporations" ? 2 : 1}
                />
                <text x="430" y="52" textAnchor="middle" fill="#6EE7B7" fontSize="18">⚙</text>
                <text x="430" y="70" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">CORPORATIONS</text>
                <text x="430" y="84" textAnchor="middle" fill="#4db090" fontSize="8.5" fontFamily="Georgia, serif">Occupational Assoc.</text>
                <text x="430" y="96" textAnchor="middle" fill="#2e7060" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">guilds & professions</text>
              </g>

              {/* Justice - bottom right */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "justice" ? null : "justice")}
                onMouseEnter={() => setHoveredDistrict("justice")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="370" y="212" width="120" height="74" rx="8"
                  fill={selectedDistrict === "justice" ? "#071628" : hoveredDistrict === "justice" ? "#050f1c" : "#030810"}
                  stroke={selectedDistrict === "justice" ? "#2563EB" : "#0a2050"}
                  strokeWidth={selectedDistrict === "justice" ? 2 : 1}
                />
                <text x="430" y="234" textAnchor="middle" fill="#93C5FD" fontSize="18">⚖</text>
                <text x="430" y="252" textAnchor="middle" fill="#93c5fd" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">JUSTICE</text>
                <text x="430" y="266" textAnchor="middle" fill="#6090c0" fontSize="8.5" fontFamily="Georgia, serif">Legal Framework</text>
                <text x="430" y="278" textAnchor="middle" fill="#405880" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">courts & contracts</text>
              </g>

              {/* State - top center */}
              <g
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedDistrict(selectedDistrict === "state" ? null : "state")}
                onMouseEnter={() => setHoveredDistrict("state")}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                <rect x="178" y="2" width="144" height="50" rx="8"
                  fill={selectedDistrict === "state" ? "#2d1a00" : hoveredDistrict === "state" ? "#1e1200" : "#140c00"}
                  stroke={selectedDistrict === "state" ? "#D97706" : "#6b4500"}
                  strokeWidth={selectedDistrict === "state" ? 2.5 : 1.5}
                />
                <text x="250" y="22" textAnchor="middle" fill="#FBBF24" fontSize="14">🏛</text>
                <text x="250" y="36" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">THE STATE</text>
                <text x="250" y="47" textAnchor="middle" fill="#c4902a" fontSize="7.5" fontFamily="Georgia, serif" fontStyle="italic">on the horizon</text>
              </g>

              {/* Market label overlay */}
              <text x="250" y="304" textAnchor="middle" fill="#D97706" fontSize="9" fontFamily="Georgia, serif" opacity="0.7">click districts to explore → inequality accumulates in the market</text>
            </svg>
          </div>

          {/* Selected district detail panel */}
          {selectedDistrict && (
            <div style={{
              background: "#0f0a04f0",
              border: `1px solid ${districts[selectedDistrict].color}60`,
              borderLeft: `4px solid ${districts[selectedDistrict].color}`,
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 22px)",
              animation: "none"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
              }}>
                <span style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}>{districts[selectedDistrict].emoji}</span>
                <div>
                  <div style={{
                    fontSize: "clamp(14px, 2vw, 17px)",
                    color: "#F5DEB3",
                    fontWeight: "bold"
                  }}>{districts[selectedDistrict].title}</div>
                  <div style={{
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    color: districts[selectedDistrict].color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}>{districts[selectedDistrict].concept}</div>
                </div>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: 1.7,
                color: "#c8b89a",
                margin: "0 0 12px"
              }}>{districts[selectedDistrict].description}</p>
              <div style={{
                background: "#ffffff08",
                border: `1px solid ${districts[selectedDistrict].color}30`,
                borderRadius: "4px",
                padding: "10px 14px"
              }}>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: districts[selectedDistrict].color,
                  display: "block",
                  marginBottom: "4px"
                }}>Limitation</span>
                <span style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#a09080",
                  fontStyle: "italic"
                }}>{districts[selectedDistrict].limitation}</span>
              </div>
            </div>
          )}

          {/* Core Argument prose */}
          <div style={{
            background: "#ffffff06",
            border: "1px solid #2a1a08",
            borderRadius: "8px",
            padding: "clamp(14px, 2.5vw, 20px)"
          }}>
            <div style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D97706",
              marginBottom: "10px",
              fontWeight: "bold"
            }}>Hegel's Core Argument</div>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              lineHeight: 1.8,
              color: "#c0aa88",
              margin: 0
            }}>
              Civil society emerges when individuals leave the natural unity of the family and pursue their particular interests through relationships with strangers. Through the division of labor and voluntary exchange, it enables unprecedented individual development and social cooperation — respecting freedom by allowing people to choose occupations, associations, and consumption. But market relationships treat people primarily as means for satisfying needs rather than as ends deserving recognition, and generate self-reinforcing inequalities, cyclical crises, and social fragmentation. Three mechanisms manage these tensions: the administration of justice establishing the legal framework, the police providing public economic regulation and welfare, and the corporation offering professional associations that provide social identity and mutual support between the family and the state.
            </p>
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

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "#0a0c0fee",
          border: "1px solid #1a1f2a",
          borderLeft: "4px solid #6B7280",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            color: "#b0b8c8",
            margin: "0 0 14px"
          }}>
            Civil society generates inequalities and social fragmentation that it cannot resolve on its own. The same market freedom that enables individual development relentlessly concentrates wealth, creates a class of the permanently poor — what Hegel calls the "rabble" — and produces periodic crises of overproduction. The corporation and the police can mitigate these tensions but cannot eliminate them. Hegel's account here is remarkably prescient: he sees that market society contains within it a structural tendency toward class conflict and social disintegration. This points toward the necessity of the state, but it also opens a wound that Hegel's own account of the state cannot fully close. Later theorists — above all Marx — will seize on precisely this point: that civil society's contradictions are deeper than any bourgeois state can heal.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.5vw, 13px)",
            color: "#7a8090",
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: the question of whether the state can genuinely achieve the ethical totality that civil society fails to provide, or whether it too remains merely the instrument of particular class interests.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "#0a0804ee",
          border: "1px solid #2a1a08",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D97706",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#D97706" />
              : <ChevronDown size={16} color="#D97706" />
            }
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 20px) clamp(14px, 2.5vw, 20px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>
              {[
                {
                  title: "Market Competition and Inequality",
                  text: "Market competition leading to exploitation, inequality, and overproduction crises — from the 19th-century factory system to 21st-century platform monopolies — enacts precisely Hegel's structural insight: that the market produces its own negation in the form of those it leaves behind."
                },
                {
                  title: "Trade Guilds and Professional Associations",
                  text: "The corporation lives on in modern professional associations, trade unions, and licensing bodies — institutions that offer social identity and mutual support beyond the purely private, just as Hegel envisioned. The AMA, bar associations, and labor unions are all Hegelian corporations in this broad sense."
                },
                {
                  title: "Public Economic Regulation",
                  text: "Hegel's 'police' power anticipates the modern regulatory state: antitrust law, consumer protection agencies, public health systems, zoning boards, social insurance. These are all responses to the same structural failure of civil society to regulate itself that Hegel diagnosed in 1820."
                },
                {
                  title: "Labor, Capital, and Marx",
                  text: "Hegel saw workers selling labor power to those who own the means of production — and recognized that this relationship, while formally free, generates substantive unfreedom and class division. Marx radicalized this insight, arguing that the state cannot overcome these contradictions but merely masks them."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  background: "#ffffff05",
                  border: "1px solid #2a1a08",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 16px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#D97706",
                    fontWeight: "bold",
                    marginBottom: "6px"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#a09070",
                    margin: 0
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#4a3820",
          paddingBottom: "8px"
        }}>
          Civil Society · Hegel's Philosophy of Right §182–256
        </div>

      </div>
    </div>
  );
}

export default CivilSociety;