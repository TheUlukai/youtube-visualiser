function HegelianAesthetics() {
  const CORE_ARGUMENT = `Hegel's aesthetics is grounded in the conviction that genuine art achieves truth revelation — not mere decoration or entertainment — by making universal spiritual content present through particular sensuous forms. Architecture is the most material art, capable of expressing humanity's relationship to environment and eternity but limited to spatial arrangement. Sculpture achieves representation of living beings, reaching its peak in Greek idealized human form. Painting transcends sculpture by representing inner psychological life through color and light. Music surpasses spatial arts by existing in time, directly expressing the movement of inner experience without representational content. Poetry, using language, achieves the highest synthesis — determinate conceptual content in a temporal, sensuous medium — but in doing so approaches philosophy, pointing beyond purely aesthetic experience.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [selectedArt, setSelectedArt] = useState(null);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [echoesHovered, setEchoesHovered] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#7E22CE";

  const keyConcepts = [
    { id: "beauty_sensuous", label: "Beauty as Sensuous Appearance", desc: "For Hegel, beauty is not a subjective pleasure response but the Idea's sensuous shining — the moment when rational content makes itself perceptible in material form. A work is beautiful when spirit and matter are so fully integrated that the form seems to emanate necessarily from its content, and the content appears self-evidently in the form." },
    { id: "five_art_forms", label: "Architecture / Sculpture / Painting / Music / Poetry", desc: "Hegel's five art forms are ranked by the ratio of spiritual to material content. Architecture is most material (stone serving symbol); sculpture achieves the perfect classical balance in the human body; painting, music, and poetry progressively dematerialize, moving from visual surface to temporal sound to pure conceptual language — tracing art's own internal development toward spirit." },
    { id: "form_content", label: "Form and Content", desc: "The central aesthetic problem for Hegel is the relationship between spiritual content (what the artwork means, what it expresses) and sensuous form (the specific material in which it is expressed). Great art achieves their perfect unity; failed or transitional art shows a gap — either the form overwhelms the content (mere decoration) or the content exceeds the form (the failure of romantic art)." },
    { id: "inner_life", label: "Inner Life vs. External Representation", desc: "Painting and music begin to portray inner subjectivity — emotion, psychological depth, individual character — rather than the objective external world of architecture and sculpture. This shift marks a crucial transition: art starts to reflect on the interior life of the human spirit, a project that ultimately requires language and concept, not sensuous form." },
    { id: "temporal_spatial", label: "Temporal vs. Spatial Arts", desc: "A fundamental division in the arts distinguishes spatial forms (architecture, sculpture, painting — which exist simultaneously in space) from temporal forms (music, poetry — which unfold through time). This division maps onto the increasing internalization of art: time is the medium of subjective consciousness, and the temporal arts are closer to spirit's own mode of being." },
    { id: "poetic_language", label: "Poetic Language", desc: "Poetry is the highest art form for Hegel because it uses the most dematerialized medium — language, the element of thought itself. Poetic language still has sensuous qualities (rhythm, sound, image) but its primary medium is meaning, making it the art form closest to philosophy. Poetry is art on the threshold of its own supersession." },
  ];

  const artForms = [
    {
      id: "architecture",
      label: "Architecture",
      icon: "⬛",
      symbol: "▲",
      position: 0,
      material: "Stone, wood, space — massive physical matter shaped into enclosures and monuments.",
      strength: "Commands awe through sheer weight and proportion; creates sacred spatial relationships between humanity and the infinite.",
      limitation: "Cannot represent living beings or inner life — spirit remains imprisoned in inert matter, pointing beyond itself but unable to speak.",
      example: "Egyptian pyramids encasing the dead in geometric immensity; Greek temples whose columns enact rational harmony between earth and sky.",
      sensuousness: 0.95,
      spirituality: 0.15,
    },
    {
      id: "sculpture",
      label: "Sculpture",
      icon: "🗿",
      symbol: "◆",
      position: 1,
      material: "Marble, bronze — three-dimensional form carved or cast into the likeness of living beings.",
      strength: "Achieves perfect unity of spiritual content and sensuous form in the idealized human body; the divine made touchable.",
      limitation: "Locked in spatial stillness — the inner life of thought and feeling cannot move through stone; color and expression remain absent.",
      example: "Greek kouros figures and Phidias's Athena: the serene, idealized human form as the adequate sensuous vessel for classical divinity.",
      sensuousness: 0.78,
      spirituality: 0.38,
    },
    {
      id: "painting",
      label: "Painting",
      icon: "🎨",
      symbol: "●",
      position: 2,
      material: "Pigment on flat surface — two dimensions, light, color, and pictorial illusion.",
      strength: "Represents interiority: the play of light across a face, grief in the eyes, devotion in a gesture — the psychological becomes visible.",
      limitation: "Still bound to spatial representation; the inner life depicted remains frozen in a moment, incapable of true temporal unfolding.",
      example: "Raphael's Madonnas and Leonardo's sfumato: spiritual luminosity rendered through color gradients that dissolve material boundaries.",
      sensuousness: 0.60,
      spirituality: 0.58,
    },
    {
      id: "music",
      label: "Music",
      icon: "♪",
      symbol: "♫",
      position: 3,
      material: "Tone, rhythm, duration — vibrations unfolding through time with no spatial extension.",
      strength: "Directly embodies the movement of inner life — joy, longing, grief — without needing to represent anything external at all.",
      limitation: "Lacks determinate content; music's emotion is real but vague, unable to articulate the specific conceptual truths spirit must know.",
      example: "Bach's counterpoint as mathematical feeling; Beethoven's late quartets where purely sonic development mirrors the dialectic of consciousness.",
      sensuousness: 0.42,
      spirituality: 0.72,
    },
    {
      id: "poetry",
      label: "Poetry",
      icon: "✍",
      symbol: "✦",
      position: 4,
      material: "Language — the most spiritual of all materials, combining sound with determinate conceptual meaning.",
      strength: "Unites temporal sensuousness with articulate conceptual content; can represent any subject, any inner state, any idea in vivid particularity.",
      limitation: "In achieving the highest synthesis, poetry approaches philosophy — its very power reveals that art's sensuous medium is finally inadequate for absolute truth.",
      example: "Dante's Divine Comedy and Shakespeare's tragedies: language that thinks while it sings, where concept and image are inseparable.",
      sensuousness: 0.22,
      spirituality: 0.92,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    let animFrame;
    let particles = [];

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.35 + 0.05,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#7E22CE`;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animFrame = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const getBarColor = (art, type) => {
    if (type === "sensuous") {
      const val = art.sensuousness;
      if (val > 0.7) return "#7E22CE";
      if (val > 0.4) return "#9333EA";
      return "#C084FC";
    } else {
      const val = art.spirituality;
      if (val > 0.7) return "#D4AF37";
      if (val > 0.4) return "#B8962E";
      return "#8B6914";
    }
  };

  const isSelected = (id) => selectedArt === id;
  const isHovered = (id) => hoveredArt === id;

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at 40% 30%, #2d0a5e 0%, #0a0a0f 70%)",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        color: "#e8e0f0",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      }}
    >
      <div
        style={{
          maxWidth: "min(90vw, 860px)",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vw, 40px)" }}>
          <div
            style={{
              fontSize: "clamp(10px, 1.4vw, 12px)",
              letterSpacing: "0.25em",
              color: "#9F7AEA",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Part 17 of 20 · Hegel's Philosophical System
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: "normal",
              color: "#f0e8ff",
              margin: "0 0 10px",
              letterSpacing: "0.02em",
            }}
          >
            The Realm of Sensuous Knowing
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "#b89fd4",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontStyle: "italic",
            }}
          >
            Hegel's systematic aesthetics analyzes how each art form — architecture, sculpture,
            painting, music, poetry — has its own material, expressive possibilities, and
            historical trajectory.
          </p>
        </div>

        {/* Problem Panel */}
        <div
          style={{
            background: "#0f0a1a",
            border: "1px solid #2a1a40",
            borderLeft: "4px solid #7E22CE",
            borderRadius: "6px",
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7E22CE",
              marginBottom: "12px",
              fontVariant: "small-caps",
            }}
          >
            The Problem
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              lineHeight: "1.8",
              color: "#cfc0e8",
              margin: 0,
            }}
          >
            If art has been superseded as cultural authority, we still need a detailed account of
            what different art forms can and cannot achieve — how does Hegel's systematic
            philosophy of specific art forms illuminate the relationship between aesthetic and
            other forms of human understanding? The urgency is real: without this analysis, the
            death of art remains an empty proclamation, and the particular glories of architecture,
            music, and poetry remain philosophically unaccounted for.
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


        {/* Main Visualization */}
        <div
          style={{
            background: "#0c0817",
            border: "1px solid #2a1a40",
            borderRadius: "8px",
            padding: "clamp(16px, 3vw, 32px)",
            marginBottom: "clamp(20px, 3vw, 32px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Canvas background */}
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: "normal",
                color: "#e0d0f8",
                margin: "0 0 6px",
                textAlign: "center",
              }}
            >
              The Five Art Forms: From Matter to Spirit
            </h2>
            <p
              style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#9070b0",
                textAlign: "center",
                margin: "0 0 clamp(16px, 3vw, 28px)",
                fontStyle: "italic",
              }}
            >
              Click each form to explore its material, strength, limitation, and historical example.
            </p>

            {/* Gradient axis labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(9px, 1.3vw, 11px)",
                  color: "#7E22CE",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ← Sensuous Immediacy
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 1.3vw, 11px)",
                  color: "#D4AF37",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Spiritual Adequacy →
              </div>
            </div>

            {/* Gradient bar */}
            <div
              style={{
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #7E22CE, #3b1878, #8B6914, #D4AF37)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                opacity: 0.7,
              }}
            />

            {/* Art form cards row */}
            <div
              style={{
                display: "flex",
                gap: "clamp(6px, 1.5vw, 14px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                flexWrap: "nowrap",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              {artForms.map((art) => {
                const active = isSelected(art.id);
                const hovered = isHovered(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArt(active ? null : art.id)}
                    onMouseEnter={() => setHoveredArt(art.id)}
                    onMouseLeave={() => setHoveredArt(null)}
                    style={{
                      flex: "1 0 clamp(54px, 14vw, 130px)",
                      minWidth: "54px",
                      cursor: "pointer",
                      background: active
                        ? "rgba(126,34,206,0.22)"
                        : hovered
                        ? "rgba(126,34,206,0.12)"
                        : "rgba(20,12,36,0.7)",
                      border: active
                        ? "1px solid #7E22CE"
                        : hovered
                        ? "1px solid #5b1f9a"
                        : "1px solid #2a1a40",
                      borderRadius: "6px",
                      padding: "clamp(10px, 1.8vw, 18px) clamp(6px, 1.2vw, 12px)",
                      textAlign: "center",
                      transition: "all 0.22s ease",
                      boxShadow: active
                        ? "0 0 18px rgba(126,34,206,0.35)"
                        : hovered
                        ? "0 0 10px rgba(126,34,206,0.2)"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(20px, 3.5vw, 32px)",
                        marginBottom: "6px",
                        lineHeight: 1,
                      }}
                    >
                      {art.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(10px, 1.4vw, 13px)",
                        color: active ? "#d4b8ff" : "#a08ac0",
                        fontWeight: active ? "bold" : "normal",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {art.label}
                    </div>

                    {/* Mini bars */}
                    <div style={{ marginTop: "10px" }}>
                      <div
                        style={{
                          fontSize: "clamp(8px, 1.1vw, 10px)",
                          color: "#6a5080",
                          marginBottom: "3px",
                          textAlign: "left",
                        }}
                      >
                        Sens.
                      </div>
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          background: "#1a1028",
                          marginBottom: "5px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.sensuousness * 100}%`,
                            borderRadius: "2px",
                            background: "#7E22CE",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(8px, 1.1vw, 10px)",
                          color: "#6a5080",
                          marginBottom: "3px",
                          textAlign: "left",
                        }}
                      >
                        Spirit.
                      </div>
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.spirituality * 100}%`,
                            borderRadius: "2px",
                            background: "#D4AF37",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SVG dual-axis chart */}
            <svg
              viewBox="0 0 500 100"
              width="100%"
              style={{ display: "block", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              <defs>
                <linearGradient id="sensBg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="spirBg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="500" height="100" fill="url(#sensBg)" />
              <rect x="0" y="0" width="500" height="100" fill="url(#spirBg)" />

              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={50 + i * 100}
                  y1="0"
                  x2={50 + i * 100}
                  y2="100"
                  stroke="#2a1a40"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}

              {/* Sensuous line */}
              <polyline
                points={artForms
                  .map((a, i) => `${50 + i * 100},${100 - a.sensuousness * 85}`)
                  .join(" ")}
                fill="none"
                stroke="#7E22CE"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Spiritual line */}
              <polyline
                points={artForms
                  .map((a, i) => `${50 + i * 100},${100 - a.spirituality * 85}`)
                  .join(" ")}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {artForms.map((art, i) => (
                <g key={art.id}>
                  <circle
                    cx={50 + i * 100}
                    cy={100 - art.sensuousness * 85}
                    r={selectedArt === art.id ? 7 : 4.5}
                    fill={selectedArt === art.id ? "#7E22CE" : "#4a1580"}
                    stroke="#7E22CE"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s ease" }}
                  />
                  <circle
                    cx={50 + i * 100}
                    cy={100 - art.spirituality * 85}
                    r={selectedArt === art.id ? 7 : 4.5}
                    fill={selectedArt === art.id ? "#D4AF37" : "#6b4c10"}
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s ease" }}
                  />
                </g>
              ))}

              {/* Labels */}
              {artForms.map((art, i) => (
                <text
                  key={art.id}
                  x={50 + i * 100}
                  y="98"
                  textAnchor="middle"
                  fontSize="7"
                  fill={selectedArt === art.id ? "#d4b8ff" : "#6a5080"}
                  fontFamily="Georgia, serif"
                >
                  {art.label}
                </text>
              ))}

              {/* Legend */}
              <circle cx="12" cy="12" r="4" fill="#7E22CE" />
              <text x="20" y="16" fontSize="7" fill="#9370c8" fontFamily="Georgia, serif">
                Sensuousness
              </text>
              <circle cx="12" cy="26" r="4" fill="#D4AF37" />
              <text x="20" y="30" fontSize="7" fill="#b8982e" fontFamily="Georgia, serif">
                Spirituality
              </text>
            </svg>

            {/* Expanded card */}
            {selectedArt && (() => {
              const art = artForms.find((a) => a.id === selectedArt);
              return (
                <div
                  style={{
                    background: "rgba(20,10,40,0.92)",
                    border: "1px solid #7E22CE",
                    borderRadius: "8px",
                    padding: "clamp(14px, 2.5vw, 26px)",
                    marginTop: "4px",
                    boxShadow: "0 0 24px rgba(126,34,206,0.25)",
                    animation: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>{art.icon}</span>
                    <h3
                      style={{
                        fontSize: "clamp(15px, 2.2vw, 20px)",
                        color: "#e0d0f8",
                        margin: 0,
                        fontWeight: "normal",
                      }}
                    >
                      {art.label}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                      gap: "clamp(10px, 2vw, 18px)",
                    }}
                  >
                    {[
                      { label: "Material", text: art.material, color: "#9F7AEA" },
                      { label: "Expressive Strength", text: art.strength, color: "#68D391" },
                      { label: "Inherent Limitation", text: art.limitation, color: "#F6AD55" },
                      { label: "Historical Example", text: art.example, color: "#D4AF37" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          background: "rgba(126,34,206,0.07)",
                          border: "1px solid #2a1a40",
                          borderRadius: "5px",
                          padding: "clamp(10px, 1.8vw, 16px)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(9px, 1.2vw, 11px)",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: item.color,
                            marginBottom: "8px",
                          }}
                        >
                          {item.label}
                        </div>
                        <p
                          style={{
                            fontSize: "clamp(12px, 1.6vw, 14px)",
                            color: "#c8b8e0",
                            lineHeight: "1.7",
                            margin: 0,
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Duality bars */}
                  <div style={{ marginTop: "16px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1 0 140px" }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.2vw, 11px)",
                          color: "#7E22CE",
                          marginBottom: "5px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Sensuous Immediacy — {Math.round(art.sensuousness * 100)}%
                      </div>
                      <div
                        style={{
                          height: "8px",
                          borderRadius: "4px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.sensuousness * 100}%`,
                            borderRadius: "4px",
                            background: "linear-gradient(to right, #4a1580, #7E22CE)",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: "1 0 140px" }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.2vw, 11px)",
                          color: "#D4AF37",
                          marginBottom: "5px",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Spiritual Adequacy — {Math.round(art.spirituality * 100)}%
                      </div>
                      <div
                        style={{
                          height: "8px",
                          borderRadius: "4px",
                          background: "#1a1028",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${art.spirituality * 100}%`,
                            borderRadius: "4px",
                            background: "linear-gradient(to right, #6b4c10, #D4AF37)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Core argument prose */}
            <div
              style={{
                marginTop: "clamp(16px, 2.5vw, 24px)",
                padding: "clamp(14px, 2vw, 20px)",
                background: "rgba(14,8,26,0.7)",
                borderRadius: "6px",
                border: "1px solid #1e1230",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  lineHeight: "1.85",
                  color: "#b8a8d0",
                  margin: 0,
                }}
              >
                Hegel's aesthetics is grounded in the conviction that genuine art achieves{" "}
                <span style={{ color: "#c084fc", fontStyle: "italic" }}>truth revelation</span> —
                not mere decoration or entertainment — by making universal spiritual content
                present through particular sensuous forms. Moving from architecture through sculpture,
                painting, and music to poetry, each art form trades increasing sensuous presence
                for increasing capacity to articulate the inner life of spirit. The progression is
                not simply historical but{" "}
                <span style={{ color: "#c084fc", fontStyle: "italic" }}>logical</span>: each
                form both fulfills and surpasses the one before it, until poetry's linguistic
                medium — the most spiritual of materials — itself begins to dissolve into pure
                philosophical thought.
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
            background: "#0d0818",
            border: "1px solid #2a1a40",
            borderLeft: "4px solid #9333EA",
            borderRadius: "6px",
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9333EA",
              marginBottom: "12px",
              fontVariant: "small-caps",
            }}
          >
            The Difficulty
          </div>
          <p
            style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              lineHeight: "1.8",
              color: "#cfc0e8",
              margin: "0 0 14px",
            }}
          >
            The detailed analysis of art and aesthetic experience raises the broader question of
            alienation: when cultural achievements appear as monuments to past greatness rather
            than living expressions of creativity, how does this aesthetic alienation relate to
            the wider phenomenon of estrangement in human experience? The pyramids and cathedrals
            that once embodied a living spiritual world now stand before us as magnificent but
            distant — we can analyze them but no longer inhabit their world. Art's supersession
            is not merely a philosophical thesis but a lived condition: the museum replaces the
            temple, the concert hall replaces communal ritual, and appreciation substitutes for
            genuine spiritual participation.
          </p>
          <p
            style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#8b6aaa",
              fontStyle: "italic",
              margin: 0,
              lineHeight: "1.7",
            }}
          >
            This pressure forces the next development: a reckoning with alienation itself — the
            structure of consciousness estranged from its own products — which will demand a
            philosophical account of how spirit returns to itself through the very estrangement
            it has created.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div
          style={{
            background: "#0d0818",
            border: "1px solid #2a1a40",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={() => setEchoesHovered(true)}
            onMouseLeave={() => setEchoesHovered(false)}
            style={{
              width: "100%",
              background: echoesHovered ? "rgba(126,34,206,0.08)" : "transparent",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7E22CE",
                fontFamily: "Georgia, serif",
                fontVariant: "small-caps",
              }}
            >
              Real-World Echoes
            </span>
            {echoesOpen ? (
              <ChevronUp size={16} color="#7E22CE" />
            ) : (
              <ChevronDown size={16} color="#7E22CE" />
            )}
          </button>

          {echoesOpen && (
            <div
              style={{
                padding: "0 clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 22px)",
                borderTop: "1px solid #1e1230",
              }}
            >
              {[
                {
                  title: "Egyptian Pyramids",
                  text: "The Great Pyramid of Giza embodies symbolic architecture at its most extreme: geometric immensity expressing the weight of death and eternity, where spirit is wholly consumed by its inert material shell.",
                },
                {
                  title: "Greek Temples",
                  text: "The Parthenon creates sacred space through mathematical proportions — columns whose measured intervals enact rational harmony between earth and sky, spirit at home in its sensuous form.",
                },
                {
                  title: "Renaissance Masters",
                  text: "Raphael's Sistine Madonna and Leonardo's Virgin of the Rocks render spiritual luminosity through color and light — interiority made visible, the divine accessible through the particular human face.",
                },
                {
                  title: "Gothic Cathedrals",
                  text: "Chartres and Amiens dematerialize stone into light-filled space: flying buttresses transfer weight outward so that walls dissolve into stained glass, matter yearning to transcend itself into pure luminosity.",
                },
              ].map((echo, i) => (
                <div
                  key={i}
                  style={{
                    marginTop: "14px",
                    paddingLeft: "14px",
                    borderLeft: "2px solid #3a1a60",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: "#9F7AEA",
                      marginBottom: "4px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {echo.title}
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.6vw, 14px)",
                      color: "#a090c0",
                      lineHeight: "1.7",
                      margin: 0,
                    }}
                  >
                    {echo.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            padding: "clamp(10px, 2vw, 16px) 0",
          }}
        >
          <p
            style={{
              fontSize: "clamp(10px, 1.4vw, 12px)",
              color: "#4a3a60",
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            "The beauty of art is beauty born of the spirit and born again..." — Hegel, Aesthetics
          </p>
        </div>
      </div>
    </div>
  );
}

export default HegelianAesthetics;