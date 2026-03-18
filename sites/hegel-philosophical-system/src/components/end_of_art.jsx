function EndOfArt() {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [mirrorClicked, setMirrorClicked] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#9D174D";

  const keyConcepts = [
    { id: "end_of_art_thesis", label: "End of Art Thesis", desc: "Hegel's provocative claim is that art has reached its historical end — not that creation ceases, but that art can no longer serve as the highest vehicle for Spirit's self-knowledge. In the modern period, reflective thought (philosophy) has superseded sensuous intuition as the proper medium for truth, leaving art to circle back on itself in self-reflexive critique." },
    { id: "symbolic_classical_romantic", label: "Symbolic / Classical / Romantic Art", desc: "These three art-forms trace the history of the relationship between spiritual content and sensuous form. In symbolic art they are inadequately matched; in classical art they achieve perfect harmony in the human body; in romantic art the spiritual content begins to overwhelm the sensuous medium, pointing beyond art toward religion and philosophy." },
    { id: "art_truth_revelation", label: "Art as Truth Revelation", desc: "For Hegel, great art is not mere decoration but a mode of truth — it makes absolute content (freedom, the divine, spirit's self-understanding) sensorially present and perceptible. The beautiful artwork is not beautiful in a merely aesthetic sense but because the Idea shines through its material form with particular clarity and completeness." },
    { id: "dissolution", label: "Dissolution of Art", desc: "Romantic art contains within itself the logic of its own dissolution: by progressively internalizing spiritual content and withdrawing from the sensuous surface, it produces art that is increasingly self-critical, ironic, and reflective. This culminates in the modern moment where art comments on art — the gallery's mirror as art's most honest self-portrait." },
    { id: "self_reflexivity", label: "Art's Self-Reflexivity", desc: "Post-romantic art becomes aware of its own historicity, its own conditions, its own contradictions. Rather than naively presenting the divine in sensuous form, it reflects on whether and how such presentation is still possible. This self-consciousness is a sign of art's intellectual maturity, but also of its supersession by philosophical thought." },
    { id: "cultural_fragmentation", label: "Cultural Fragmentation", desc: "Modern culture no longer has a single spiritual content that all art can coherently express — no shared mythology, sacred order, or communal self-understanding. This fragmentation means no sensuous form can hold what modernity's plural, individualistic spirit requires, and art proliferates into endless styles, each valid in its own terms, none authoritative." },
  ];

  const stages = [
    {
      id: "symbolic",
      label: "Symbolic",
      subtitle: "Egyptian Art",
      color: "#C4860A",
      x: 60,
      description: "Spiritual content strains against inadequate form. The pyramid points toward meaning it cannot fully express — spirit struggles to find itself in stone.",
      artworks: [
        { name: "The Pyramid", desc: "Form gestures toward infinite spirit but cannot contain it. The sphinx stares outward — a riddle that exceeds its own body." },
        { name: "The Sphinx", desc: "Half-human, half-animal: spirit is present but not yet fully individuated. The form is too material to capture what it seeks." }
      ]
    },
    {
      id: "classical",
      label: "Classical",
      subtitle: "Greek Art",
      color: "#C4A035",
      x: 230,
      description: "Perfect unity of spiritual content and sensuous form. The Greek statue of a god achieves the ideal — but only by limiting spirit to what beauty can embody.",
      artworks: [
        { name: "Apollo Belvedere", desc: "Spirit perfectly at home in its body. The divine is fully present — but divinity here is bounded by what human form can show." },
        { name: "The Parthenon", desc: "Proportion as truth. Form and content achieve equilibrium — yet this beauty cannot express the infinite depths that Christianity will demand." }
      ]
    },
    {
      id: "romantic",
      label: "Romantic",
      subtitle: "Christian & Modern",
      color: "#9D174D",
      x: 400,
      description: "Spirit recognizes the inadequacy of all sensuous form. The cathedral dematerializes stone into light — beauty is sacrificed for spiritual depth.",
      artworks: [
        { name: "Gothic Cathedral", desc: "Stone dissolved into light and height. The building reaches upward because spirit has recognized it cannot be at home in any finite form." },
        { name: "Dutch Interior", desc: "The mundane becomes spiritually charged — but precisely because spirit has retreated inward, away from public myth. Subjectivity deepens; sensuous unity fractures." }
      ]
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let animFrame;
    let particles = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: -Math.random() * 0.3 - 0.05,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    };
    initParticles();

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `#9D174D${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  const stageInfo = stages.find(s => s.id === activeStage);

  return (
    <div ref={containerRef} style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #3d0820 0%, #1a0510 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      position: "relative",
      overflowX: "hidden"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#9D174D",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 16 of 20 — Hegel's Aesthetics</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            color: "#f0e0e8",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            letterSpacing: "0.03em"
          }}>The Twilight of Beauty</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 16px)",
            color: "#b8909a",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5
          }}>Hegel's 'end of art' thesis: how art supersedes itself</p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #3d0820",
          borderLeft: "4px solid #9D174D",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#9D174D",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0d8",
            lineHeight: 1.75,
            margin: 0
          }}>
            The Hegelian-Marxist tension raises the question of whether purely aesthetic experience can achieve genuine truth — and more broadly, <em>what is the status of art in the development of absolute spirit?</em> If thought unfolds historically toward greater self-knowledge, where does sensuous beauty fit in a system that ends in pure conceptual comprehension? Can the image ever do what the concept does — and if so, at what cost to both?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 5, 10, 0.9)",
          border: "1px solid #3d0820",
          borderRadius: "8px",
          marginBottom: "clamp(20px, 4vw, 32px)",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "clamp(14px, 2.5vw, 24px)",
            borderBottom: "1px solid #2a0815"
          }}>
            <h2 style={{
              fontSize: "clamp(14px, 2.2vw, 20px)",
              color: "#f0dde5",
              margin: "0 0 6px 0",
              fontWeight: "normal"
            }}>The Museum of Spirit's Journey</h2>
            <p style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              color: "#9a7080",
              margin: 0,
              fontStyle: "italic"
            }}>Hover over each gallery to explore — click artworks for deeper detail — enter the Modern Room</p>
          </div>

          {/* Gallery SVG */}
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "0" }}>
              <svg
                viewBox="0 0 860 380"
                width="100%"
                style={{ display: "block" }}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <radialGradient id="floorGrad" cx="50%" cy="100%" r="60%">
                    <stop offset="0%" stopColor="#2a0815" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0a0508" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C4860A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C4860A" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glowRose" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9D174D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9D174D" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="wallGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2a1008" />
                    <stop offset="100%" stopColor="#0f0508" />
                  </linearGradient>
                  <linearGradient id="wallGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#221008" />
                    <stop offset="100%" stopColor="#0d0508" />
                  </linearGradient>
                  <linearGradient id="wallGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#200812" />
                    <stop offset="100%" stopColor="#0d040a" />
                  </linearGradient>
                  <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d1525" />
                    <stop offset="40%" stopColor="#5a2040" />
                    <stop offset="100%" stopColor="#2a0f1d" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Background */}
                <rect width="860" height="380" fill="url(#floorGrad)" />

                {/* Floor perspective lines */}
                <line x1="0" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="860" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="215" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="645" y1="380" x2="430" y2="200" stroke="#2a0815" strokeWidth="0.5" strokeOpacity="0.3" />

                {/* Room 1: Symbolic (leftmost, largest in view) */}
                <g
                  onMouseEnter={() => setHoveredRoom("symbolic")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "symbolic" ? null : "symbolic")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="20" y="60" width="200" height="260" fill="url(#wallGrad1)"
                    stroke={activeStage === "symbolic" ? "#C4860A" : hoveredRoom === "symbolic" ? "#7a5505" : "#2a1008"}
                    strokeWidth={activeStage === "symbolic" ? "2" : "1"}
                  />
                  {hoveredRoom === "symbolic" && (
                    <rect x="20" y="60" width="200" height="260" fill="url(#glowGold)" />
                  )}
                  {/* Room label */}
                  <text x="120" y="90" textAnchor="middle" fill="#C4860A" fontSize="13" fontFamily="Georgia, serif" letterSpacing="2">SYMBOLIC</text>
                  <text x="120" y="107" textAnchor="middle" fill="#7a5530" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Egyptian</text>
                  {/* Pyramid artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("pyramid"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="55" y="130" width="80" height="100" fill="#1a0c06" stroke={hoveredArtwork === "pyramid" ? "#C4860A" : "#3d2010"} strokeWidth="1.5" />
                    {/* Pyramid shape */}
                    <polygon points="95,145 140,215 50,215" fill="#3d2810" stroke="#5a3a15" strokeWidth="1" />
                    <line x1="95" y1="145" x2="95" y2="215" stroke="#5a3a15" strokeWidth="0.5" strokeOpacity="0.5" />
                    {/* Ground */}
                    <rect x="50" y="215" width="90" height="5" fill="#2a1a08" />
                    {/* Glow on hover */}
                    {hoveredArtwork === "pyramid" && (
                      <rect x="55" y="130" width="80" height="100" fill="#C4860A" fillOpacity="0.07" />
                    )}
                    <text x="95" y="245" textAnchor="middle" fill="#7a5530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">The Pyramid</text>
                  </g>
                  {/* Sphinx artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("sphinx"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="145" y="150" width="65" height="80" fill="#1a0c06" stroke={hoveredArtwork === "sphinx" ? "#C4860A" : "#3d2010"} strokeWidth="1.5" />
                    {/* Sphinx silhouette */}
                    <ellipse cx="177" cy="205" rx="22" ry="12" fill="#3d2810" />
                    <circle cx="177" cy="183" r="12" fill="#3d2810" />
                    <rect x="165" y="193" width="24" height="12" fill="#3d2810" />
                    {hoveredArtwork === "sphinx" && (
                      <rect x="145" y="150" width="65" height="80" fill="#C4860A" fillOpacity="0.07" />
                    )}
                    <text x="178" y="245" textAnchor="middle" fill="#7a5530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">The Sphinx</text>
                  </g>
                  {/* Door to next room */}
                  <rect x="170" y="200" width="42" height="90" fill="#0f0608" stroke="#2a1008" strokeWidth="1" rx="2" />
                  <rect x="172" y="202" width="38" height="86" fill="#0d0507" />
                  <text x="191" y="310" textAnchor="middle" fill="#3d1520" fontSize="8" fontFamily="Georgia, serif">→</text>
                </g>

                {/* Room 2: Classical (middle) */}
                <g
                  onMouseEnter={() => setHoveredRoom("classical")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "classical" ? null : "classical")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="230" y="90" width="175" height="230" fill="url(#wallGrad2)"
                    stroke={activeStage === "classical" ? "#C4A035" : hoveredRoom === "classical" ? "#7a6605" : "#221008"}
                    strokeWidth={activeStage === "classical" ? "2" : "1"}
                  />
                  {hoveredRoom === "classical" && (
                    <rect x="230" y="90" width="175" height="230" fill="url(#glowGold)" />
                  )}
                  <text x="317" y="116" textAnchor="middle" fill="#C4A035" fontSize="12" fontFamily="Georgia, serif" letterSpacing="2">CLASSICAL</text>
                  <text x="317" y="131" textAnchor="middle" fill="#7a6530" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Greek</text>

                  {/* Apollo artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("apollo"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="255" y="150" width="70" height="100" fill="#18100a" stroke={hoveredArtwork === "apollo" ? "#C4A035" : "#302008"} strokeWidth="1.5" />
                    {/* Statue silhouette */}
                    <ellipse cx="290" cy="168" rx="9" ry="10" fill="#4a3820" />
                    <rect x="283" y="178" width="14" height="30" fill="#4a3820" />
                    <rect x="275" y="185" width="10" height="20" fill="#4a3820" />
                    <rect x="295" y="183" width="10" height="22" fill="#4a3820" />
                    <rect x="281" y="208" width="8" height="25" fill="#4a3820" />
                    <rect x="289" y="208" width="8" height="25" fill="#4a3820" />
                    {hoveredArtwork === "apollo" && (
                      <rect x="255" y="150" width="70" height="100" fill="#C4A035" fillOpacity="0.08" />
                    )}
                    <text x="290" y="263" textAnchor="middle" fill="#7a6530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Apollo</text>
                  </g>

                  {/* Parthenon artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("parthenon"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="335" y="165" width="58" height="85" fill="#18100a" stroke={hoveredArtwork === "parthenon" ? "#C4A035" : "#302008"} strokeWidth="1.5" />
                    {/* Temple columns */}
                    <rect x="340" y="220" width="48" height="20" fill="#3a2d15" />
                    <rect x="340" y="215" width="48" height="5" fill="#4a3a1a" />
                    {[0, 1, 2, 3, 4].map(i => (
                      <rect key={i} x={343 + i * 9} y="178" width="5" height="37" fill="#4a3a1a" />
                    ))}
                    <polygon points="340,178 388,178 364,168" fill="#4a3a1a" />
                    {hoveredArtwork === "parthenon" && (
                      <rect x="335" y="165" width="58" height="85" fill="#C4A035" fillOpacity="0.08" />
                    )}
                    <text x="364" y="262" textAnchor="middle" fill="#7a6530" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Parthenon</text>
                  </g>

                  {/* Door */}
                  <rect x="375" y="215" width="22" height="75" fill="#0f0608" stroke="#221008" strokeWidth="1" rx="1" />
                </g>

                {/* Room 3: Romantic */}
                <g
                  onMouseEnter={() => setHoveredRoom("romantic")}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => setActiveStage(activeStage === "romantic" ? null : "romantic")}
                  style={{ cursor: "pointer" }}
                >
                  <rect x="410" y="115" width="150" height="205" fill="url(#wallGrad3)"
                    stroke={activeStage === "romantic" ? "#9D174D" : hoveredRoom === "romantic" ? "#5a0e2d" : "#200812"}
                    strokeWidth={activeStage === "romantic" ? "2" : "1"}
                  />
                  {hoveredRoom === "romantic" && (
                    <rect x="410" y="115" width="150" height="205" fill="url(#glowRose)" />
                  )}
                  <text x="485" y="138" textAnchor="middle" fill="#9D174D" fontSize="12" fontFamily="Georgia, serif" letterSpacing="2">ROMANTIC</text>
                  <text x="485" y="153" textAnchor="middle" fill="#6a2040" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">Christian / Modern</text>

                  {/* Cathedral artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("cathedral"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="425" y="170" width="60" height="95" fill="#120608" stroke={hoveredArtwork === "cathedral" ? "#9D174D" : "#2a0815"} strokeWidth="1.5" />
                    {/* Cathedral silhouette */}
                    <polygon points="455,180 455,230 425,230" fill="#2a1020" />
                    <polygon points="455,180 485,230 455,230" fill="#2a1020" />
                    <rect x="437" y="200" width="10" height="30" fill="#200d18" />
                    <rect x="448" y="200" width="10" height="30" fill="#200d18" />
                    {/* Stained glass glow */}
                    <rect x="440" y="193" width="6" height="10" fill="#4a1030" />
                    <rect x="449" y="193" width="6" height="10" fill="#4a1030" />
                    <polygon points="455,178 449,190 461,190" fill="#1a0815" />
                    {hoveredArtwork === "cathedral" && (
                      <rect x="425" y="170" width="60" height="95" fill="#9D174D" fillOpacity="0.1" />
                    )}
                    <text x="455" y="277" textAnchor="middle" fill="#6a2040" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Cathedral</text>
                  </g>

                  {/* Dutch Interior artwork */}
                  <g
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredArtwork("dutch"); }}
                    onMouseLeave={(e) => { e.stopPropagation(); setHoveredArtwork(null); }}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="498" y="180" width="52" height="85" fill="#120608" stroke={hoveredArtwork === "dutch" ? "#9D174D" : "#2a0815"} strokeWidth="1.5" />
                    {/* Interior scene */}
                    <rect x="503" y="195" width="22" height="30" fill="#1a0d10" />
                    <rect x="506" y="198" width="8" height="12" fill="#3a1a20" />
                    <rect x="516" y="198" width="8" height="12" fill="#3a1a20" />
                    <ellipse cx="524" cy="215" rx="7" ry="9" fill="#2a1018" />
                    <line x1="524" y1="195" x2="524" y2="225" stroke="#3d1525" strokeWidth="0.5" />
                    {hoveredArtwork === "dutch" && (
                      <rect x="498" y="180" width="52" height="85" fill="#9D174D" fillOpacity="0.1" />
                    )}
                    <text x="524" y="277" textAnchor="middle" fill="#6a2040" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Dutch Interior</text>
                  </g>

                  {/* Door to modern */}
                  <rect x="545" y="215" width="12" height="65" fill="#0f0608" stroke="#200812" strokeWidth="1" rx="1" />
                </g>

                {/* Room 4: Modern / Mirror Room */}
                <g>
                  <rect x="565" y="135" width="125" height="185" fill="#0d0508"
                    stroke={mirrorClicked ? "#9D174D" : "#1a0810"}
                    strokeWidth={mirrorClicked ? "1.5" : "1"}
                  />
                  <text x="627" y="158" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#3d1525"} fontSize="11" fontFamily="Georgia, serif" letterSpacing="2">MODERN</text>

                  {/* Mirror */}
                  <g
                    onClick={() => setMirrorClicked(!mirrorClicked)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x="590" y="175" width="74" height="95" rx="3" fill="url(#mirrorGrad)"
                      stroke={mirrorClicked ? "#9D174D" : "#3d1525"}
                      strokeWidth={mirrorClicked ? "2" : "1"}
                      filter="url(#softGlow)"
                    />
                    {/* Mirror reflection lines */}
                    <line x1="593" y1="178" x2="593" y2="267" stroke="#4a1a2d" strokeWidth="0.5" strokeOpacity="0.4" />
                    <line x1="597" y1="177" x2="590" y2="270" stroke="#4a1a2d" strokeWidth="0.3" strokeOpacity="0.3" />
                    {/* Reflected figure (abstract) */}
                    {mirrorClicked ? (
                      <>
                        <circle cx="627" cy="210" r="8" fill="none" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.6" />
                        <line x1="627" y1="218" x2="627" y2="245" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="615" y1="228" x2="639" y2="228" stroke="#9D174D" strokeWidth="1" strokeOpacity="0.5" />
                        <text x="627" y="200" textAnchor="middle" fill="#9D174D" fontSize="10" fontFamily="Georgia, serif">?</text>
                      </>
                    ) : (
                      <>
                        <line x1="620" y1="195" x2="635" y2="265" stroke="#3d1525" strokeWidth="0.5" strokeOpacity="0.5" />
                        <line x1="625" y1="193" x2="630" y2="268" stroke="#4a1a2d" strokeWidth="0.4" strokeOpacity="0.3" />
                      </>
                    )}
                    {/* Mirror label */}
                    <text x="627" y="283" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#3d1525"} fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">
                      {mirrorClicked ? "Click again" : "Click mirror"}
                    </text>
                  </g>

                  {/* Empty room text */}
                  <text x="627" y="310" textAnchor="middle" fill="#2a0f1a" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">
                    {mirrorClicked ? "" : "(empty)"}
                  </text>
                </g>

                {/* Vanishing point / horizon glow */}
                <ellipse cx="430" cy="200" rx="60" ry="30" fill="#9D174D" fillOpacity="0.05" />

                {/* Labels below */}
                <text x="120" y="355" textAnchor="middle" fill="#5a3020" fontSize="10" fontFamily="Georgia, serif">Form ≠ Spirit</text>
                <text x="317" y="355" textAnchor="middle" fill="#5a5020" fontSize="10" fontFamily="Georgia, serif">Form = Spirit</text>
                <text x="485" y="355" textAnchor="middle" fill="#5a1535" fontSize="10" fontFamily="Georgia, serif">Form &lt; Spirit</text>
                <text x="627" y="355" textAnchor="middle" fill={mirrorClicked ? "#9D174D" : "#2a0f1a"} fontSize="10" fontFamily="Georgia, serif">Spirit reflects</text>

                {/* Progression arrow */}
                <line x1="50" y1="370" x2="780" y2="370" stroke="#3d1525" strokeWidth="0.5" strokeOpacity="0.4" />
                <polygon points="780,367 790,370 780,373" fill="#3d1525" fillOpacity="0.4" />
                <text x="420" y="376" textAnchor="middle" fill="#3d1525" fontSize="9" fontFamily="Georgia, serif" letterSpacing="1">historical development of spirit →</text>
              </svg>
            </div>
          </div>

          {/* Mirror Revelation */}
          {mirrorClicked && (
            <div style={{
              margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
              padding: "clamp(14px, 2.5vw, 20px)",
              background: "rgba(30, 5, 18, 0.9)",
              border: "1px solid #9D174D",
              borderRadius: "6px",
              borderLeft: "3px solid #9D174D"
            }}>
              <div style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                color: "#9D174D",
                textTransform: "uppercase",
                marginBottom: "10px"
              }}>The Mirror Speaks</div>
              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#e0c0cc",
                lineHeight: 1.75,
                margin: 0,
                fontStyle: "italic"
              }}>
                "Art now reflects on itself rather than on ultimate truth. Where the pyramid could not contain its meaning, and the Greek statue fully embodied the divine, and the cathedral reached beyond all earthly form — modern art turns its gaze inward, toward its own conditions, its own making, its own inability to say what it once said. The artist becomes critic; the artwork becomes question. This is not death, but it is no longer the highest vocation."
              </p>
            </div>
          )}

          {/* Stage Detail Panel */}
          {activeStage && stageInfo && (
            <div style={{
              margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
              padding: "clamp(14px, 2.5vw, 20px)",
              background: "rgba(25, 5, 15, 0.9)",
              border: `1px solid ${stageInfo.color}`,
              borderRadius: "6px",
              borderLeft: `3px solid ${stageInfo.color}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px", flexWrap: "wrap" }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.18em",
                    color: stageInfo.color,
                    textTransform: "uppercase",
                    fontWeight: "bold"
                  }}>{stageInfo.label} Art</span>
                  <span style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#9a7080",
                    marginLeft: "12px",
                    fontStyle: "italic"
                  }}>{stageInfo.subtitle}</span>
                </div>
                <button
                  onClick={() => setActiveStage(null)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${stageInfo.color}`,
                    color: stageInfo.color,
                    cursor: "pointer",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >close</button>
              </div>
              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#e8d0d8",
                lineHeight: 1.75,
                margin: "0 0 16px 0"
              }}>{stageInfo.description}</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {stageInfo.artworks.map(aw => (
                  <div key={aw.name} style={{
                    flex: "1 1 180px",
                    padding: "clamp(10px, 1.8vw, 16px)",
                    background: "rgba(15, 5, 10, 0.7)",
                    border: `1px solid ${stageInfo.color}40`,
                    borderRadius: "4px"
                  }}>
                    <div style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: stageInfo.color,
                      marginBottom: "6px",
                      fontStyle: "italic"
                    }}>{aw.name}</div>
                    <p style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: "#c0a0b0",
                      lineHeight: 1.65,
                      margin: 0
                    }}>{aw.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artwork Tooltip */}
          {hoveredArtwork && !activeStage && (() => {
            const allArtworks = stages.flatMap(s => s.artworks.map(a => ({ ...a, stageColor: s.color })));
            const found = allArtworks.find(a => a.name.toLowerCase().replace(/ /g, "") === hoveredArtwork.replace(/ /g, "")
              || (hoveredArtwork === "pyramid" && a.name === "The Pyramid")
              || (hoveredArtwork === "sphinx" && a.name === "The Sphinx")
              || (hoveredArtwork === "apollo" && a.name === "Apollo Belvedere")
              || (hoveredArtwork === "parthenon" && a.name === "The Parthenon")
              || (hoveredArtwork === "cathedral" && a.name === "Gothic Cathedral")
              || (hoveredArtwork === "dutch" && a.name === "Dutch Interior")
            );
            if (!found) return null;
            return (
              <div style={{
                margin: "0 clamp(12px, 2vw, 24px) clamp(12px, 2vw, 20px)",
                padding: "clamp(10px, 1.8vw, 16px)",
                background: "rgba(20, 5, 12, 0.95)",
                border: `1px solid ${found.stageColor}60`,
                borderRadius: "5px",
                borderLeft: `2px solid ${found.stageColor}`
              }}>
                <div style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: found.stageColor,
                  marginBottom: "6px",
                  fontStyle: "italic"
                }}>{found.name}</div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#c0a0b0",
                  lineHeight: 1.65,
                  margin: 0
                }}>{found.desc}</p>
              </div>
            );
          })()}

          {/* Core argument prose */}
          <div style={{
            padding: "clamp(14px, 2.5vw, 24px)",
            borderTop: "1px solid #2a0815"
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              color: "#9a7080",
              lineHeight: 1.8,
              margin: 0
            }}>
              Each gallery represents a historical stage in art's self-understanding. Click a room to explore the relationship between spiritual content and sensuous form. The logic is cumulative: each stage achieves more spiritual depth at the cost of sensuous perfection, until romantic art reaches a point where the spiritual content <em>exceeds what any sensuous form can hold</em> — and art quietly turns to face itself. The modern room's mirror is not a failure of art but its own most honest statement.
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

        {/* Particle canvas background accent */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none"
        }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #3d0820",
          borderLeft: "4px solid #6b0f35",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#6b0f35",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0d8",
            lineHeight: 1.75,
            margin: "0 0 14px 0"
          }}>
            If art has been superseded as the primary vehicle of cultural truth, how should we understand the nature of aesthetic experience and the specific capacities of different art forms — and what does Hegel's systematic aesthetics reveal about the relationship between beauty, truth, and meaning? The end of art thesis does not simply devalue art; it raises sharper questions about what different arts can do that philosophy cannot. Architecture, music, poetry, painting — each has a distinct relationship to sensuousness and concept. Does Hegel's own careful analysis of these arts undermine his broader claim that they have been surpassed?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#9a7080",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: a systematic account of the individual arts themselves — architecture as the most material, music as the most immaterial, poetry as the art that nearly dissolves into thought — and their specific powers to carry or exceed the spiritual content that Hegel has shown art at its limit cannot finally hold.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(20, 5, 12, 0.85)",
          border: "1px solid #2a0815",
          borderRadius: "6px",
          overflow: "hidden",
          position: "relative",
          zIndex: 2
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif"
            }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              color: "#9D174D",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}>Real-World Echoes</div>
            {echoesOpen
              ? <ChevronUp size={16} color="#9D174D" />
              : <ChevronDown size={16} color="#9D174D" />
            }
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)" }}>
              {[
                {
                  title: "Egyptian Pyramids & Sphinxes",
                  body: "The pyramids are Hegel's paradigm case of symbolic art: their form (massive, geometrically pure, inhuman in scale) points toward a spiritual meaning it cannot quite articulate. The sphinx — part human, part animal — embodies the riddle of spirit not yet individuated. Meaning exceeds and strains against the stone."
                },
                {
                  title: "Greek Statues of Gods & Heroes",
                  body: "The Apollo Belvedere or the sculptures of the Parthenon represent, for Hegel, the highest achievement of art's proper vocation: the perfect unity of spiritual content and sensuous form. The god is fully present in the marble — but this also means divinity is bounded by what a beautiful human body can express."
                },
                {
                  title: "Medieval Cathedrals",
                  body: "Gothic architecture enacts the romantic dissolution of matter into spirit: stone is carved into lacework, walls become windows, height replaces horizontal enclosure. The building reaches, rather than rests. This is Christian art recognizing that no finite form can contain the infinite — sensuous beauty is sacrificed to spiritual yearning."
                },
                {
                  title: "Contemporary Art & Democratic Societies",
                  body: "Modern debates about art's role in democracy echo Hegel's thesis: when art becomes primarily critical, ironic, or self-referential — when it reflects on its own conditions rather than embodying shared cultural truth — it has entered the self-reflexive mode that Hegel predicted. Contemporary art's turn to institutional critique, conceptualism, and post-medium practice all confirm that art now operates in philosophy's neighborhood."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 3 ? "clamp(12px, 2vw, 18px)" : 0,
                  padding: "clamp(12px, 2vw, 18px)",
                  background: "rgba(15, 5, 10, 0.6)",
                  border: "1px solid #2a0815",
                  borderRadius: "4px"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#d4a0b5",
                    marginBottom: "8px",
                    fontStyle: "italic"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9a7080",
                    lineHeight: 1.75,
                    margin: 0
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          marginTop: "clamp(20px, 3vw, 28px)",
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#3d1525",
          letterSpacing: "0.1em"
        }}>
          Part 16 of 20 · Hegel's Complete Philosophical System
        </div>
      </div>
    </div>
  );
}

export default EndOfArt;