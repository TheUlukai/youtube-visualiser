function AbsoluteSpiritArtReligionPhilosophy() {
  const [luminosity, setLuminosity] = useState(1);
  const [activePanel, setActivePanel] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  const accent = "#C026D3";

  const keyConcepts = [
    { id: "absolute_spirit", label: "Absolute Spirit", desc: "Absolute Spirit is Hegel's name for mind or spirit at its fullest self-realization — the moment when thought comprehends itself as the inner truth of all reality. Art, religion, and philosophy are its three successive forms, each offering a different medium through which Spirit comes to know itself." },
    { id: "art_sensuous", label: "Art as Sensuous Appearance", desc: "For Hegel, art is the first and most immediate mode in which the Absolute becomes present to consciousness — through the beautiful sensuous shape of stone, sound, or image. The Idea shines through material form, but because the medium is external and resistant, art can only partially express what Spirit truly is." },
    { id: "art_forms", label: "Symbolic / Classical / Romantic Art", desc: "Hegel traces three historical forms of art: Symbolic art (ancient Egypt) where Spirit and matter are inadequately matched; Classical art (ancient Greece) where they achieve perfect sensuous harmony in the human body; and Romantic art (Christian Europe) where Spirit withdraws inward, beginning to outgrow the sensuous medium entirely." },
    { id: "religion_representational", label: "Religion as Representational Truth", desc: "Religion grasps the same absolute truth as philosophy but in the medium of Vorstellung — picture-thinking or representation. It narrates in stories, images, and rituals what philosophy will express in pure concepts. Christianity captures the speculative truth of the unity of finite and infinite, but clothes it in historical narrative rather than transparent thought." },
    { id: "philosophy_conceptual", label: "Philosophy as Conceptual Self-Transparency", desc: "Philosophy is the culmination of Absolute Spirit because it grasps the truth in its own proper medium — the self-moving concept (Begriff). Where art requires sensuous material and religion requires narrative images, philosophy strips away every external husk and lets Spirit comprehend itself purely in thought." },
    { id: "end_of_art", label: "End of Art Thesis", desc: "Hegel argues that art has reached its historical end — not that people will stop making art, but that art can no longer serve as the highest vehicle for Spirit's self-knowledge. In the modern world, philosophy has taken over that function; art becomes an object of theoretical reflection rather than the living presence of the sacred." },
  ];

  const panels = [
    {
      id: "art",
      label: "Art",
      subtitle: "Sensuous Appearance of the Idea",
      icon: "◈",
      color: "#e07b39",
      stages: [
        { name: "Symbolic", culture: "Egyptian", desc: "Form is inadequate to content. The pyramid points toward an infinite mystery that exceeds every finite shape — spirit struggles to express itself through matter.", glyph: "△" },
        { name: "Classical", culture: "Greek", desc: "Perfect unity of form and spiritual content. The sculptured human body becomes the ideal vessel for divine spirit — neither too much nor too little.", glyph: "○" },
        { name: "Romantic", culture: "Christian", desc: "Inner spiritual life exceeds all finite form. Painting and music gesture toward inwardness that no external shape can fully contain.", glyph: "♦" }
      ],
      desc: "Art makes spiritual truth sensorially present as beauty. It is the first, most immediate mode in which Absolute Spirit cognizes itself — through the shining of the idea in sensuous form."
    },
    {
      id: "religion",
      label: "Religion",
      subtitle: "Representational Truth",
      icon: "✦",
      color: "#5b8dee",
      stages: [
        { name: "Nature Religion", culture: "Ancient", desc: "Spirit worships itself in natural forces — light, storm, fertility. The divine is immediate, unmediated, external.", glyph: "☀" },
        { name: "Art Religion", culture: "Greek", desc: "The divine is shaped by human craft into beautiful, individuated gods. Spirit begins to recognize its own reflection in ideal human form.", glyph: "⚱" },
        { name: "Revealed Religion", culture: "Christian", desc: "God becomes human. The infinite enters the finite absolutely. Spirit recognizes the finite-infinite unity through the narrative of incarnation, death, and resurrection.", glyph: "✝" }
      ],
      desc: "Religion grasps the same truth as art, but through representational narrative and feeling rather than sensuous form. Its highest achievement is the Christian recognition of finite-infinite unity."
    },
    {
      id: "philosophy",
      label: "Philosophy",
      subtitle: "Conceptual Self-Transparency",
      icon: "⬡",
      color: "#C026D3",
      stages: [
        { name: "Eastern Philosophy", culture: "Ancient East", desc: "Pure abstract being — undifferentiated unity. Thought has not yet distinguished itself from its object. Spirit is immediate to itself.", glyph: "∞" },
        { name: "Greek Philosophy", culture: "Athens", desc: "The discovery of the concept, of dialectic, of the movement of thought thinking itself. Logos becomes the medium of spirit's self-articulation.", glyph: "Φ" },
        { name: "Speculative Idealism", culture: "Modern", desc: "Absolute knowing: thought thinks itself thinking the whole. Philosophy completes the system, recognizing that the real is rational and the rational is real.", glyph: "◉" }
      ],
      desc: "Philosophy supersedes art and religion by expressing absolute truth in pure conceptual thinking — requiring no sensuous support, no narrative image. It is Spirit transparent to itself in thought."
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = 80;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const ctx = canvas.getContext("2d");
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const artGlow = luminosity <= 1 ? 1 : Math.max(0, 1 - (luminosity - 1));
      const relGlow = luminosity <= 1 ? luminosity : luminosity <= 2 ? 1 : Math.max(0, 1 - (luminosity - 2));
      const philGlow = luminosity <= 2 ? luminosity / 2 : 1;

      const colors = [
        { r: 224, g: 123, b: 57, a: artGlow },
        { r: 91, g: 141, b: 238, a: relGlow },
        { r: 192, g: 38, b: 211, a: philGlow }
      ];

      const nodeCount = 18;
      for (let i = 0; i < nodeCount; i++) {
        const section = Math.floor(i / 6);
        const c = colors[section];
        const x = (i / nodeCount) * w + Math.sin(t * 0.7 + i) * 6;
        const y = h / 2 + Math.sin(t + i * 0.9) * 18;
        const r = 3 + Math.sin(t * 1.2 + i) * 2;
        const alpha = c.a * (0.5 + 0.5 * Math.sin(t * 0.8 + i));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.round(c.r).toString(16).padStart(2,"0")}${Math.round(c.g).toString(16).padStart(2,"0")}${Math.round(c.b).toString(16).padStart(2,"0")}`;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (i < nodeCount - 1) {
          const nx = ((i + 1) / nodeCount) * w + Math.sin(t * 0.7 + i + 1) * 6;
          const ny = h / 2 + Math.sin(t + (i + 1) * 0.9) * 18;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          const nc = colors[Math.floor((i + 1) / 6)];
          ctx.strokeStyle = `#${Math.round((c.r + nc.r) / 2).toString(16).padStart(2,"0")}${Math.round((c.g + nc.g) / 2).toString(16).padStart(2,"0")}${Math.round((c.b + nc.b) / 2).toString(16).padStart(2,"0")}`;
          ctx.globalAlpha = (c.a + nc.a) / 2 * 0.4;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      t += 0.02;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [luminosity]);

  const getPanelOpacity = (panelId) => {
    const idx = panels.findIndex(p => p.id === panelId);
    const pos = idx / 2;
    if (luminosity <= 1) {
      if (idx === 0) return 1;
      return 0.3 + 0.4 * (luminosity * (idx === 1 ? 0.7 : 0.4));
    }
    if (luminosity <= 2) {
      const t = luminosity - 1;
      if (idx === 0) return 1 - t * 0.6;
      if (idx === 1) return 0.6 + t * 0.4;
      return 0.2 + t * 0.5;
    }
    const t = luminosity - 2;
    if (idx === 0) return 0.3 + (1 - t) * 0.1;
    if (idx === 1) return 0.8 - t * 0.5;
    return 0.7 + t * 0.3;
  };

  const getPanelGlow = (panelId) => {
    const idx = panels.findIndex(p => p.id === panelId);
    if (luminosity <= 1) return idx === 0 ? 1 : 0;
    if (luminosity <= 2) {
      const t = luminosity - 1;
      if (idx === 0) return 1 - t;
      if (idx === 1) return t;
      return 0;
    }
    const t = luminosity - 2;
    if (idx === 1) return 1 - t;
    if (idx === 2) return t;
    return 0;
  };

  const getLuminosityLabel = () => {
    if (luminosity < 0.7) return "Sensuous Immediacy";
    if (luminosity < 1.3) return "The Beautiful";
    if (luminosity < 1.7) return "Art into Religion";
    if (luminosity < 2.3) return "The Holy";
    if (luminosity < 2.7) return "Religion into Philosophy";
    return "Conceptual Transparency";
  };

  return (
    <div ref={containerRef} style={{
      background: "radial-gradient(ellipse at 50% 20%, #3d0a42 0%, #12031a 50%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      boxSizing: "border-box"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            color: accent,
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 10 of 20 · Absolute Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            color: "#f5e6ff",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            letterSpacing: "0.02em"
          }}>The Beautiful, the Holy, and the True</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#b898c8",
            margin: 0,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6
          }}>Art, Religion, and Philosophy as the three modes through which humanity achieves complete self-understanding of its relationship to ultimate reality.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#1a0a1e",
          border: "1px solid #2a1030",
          borderLeft: `4px solid ${accent}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.1vw, 10px)",
            letterSpacing: "0.25em",
            color: accent,
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#e8d0f0",
            margin: 0,
            lineHeight: 1.7
          }}>
            Political history reaches its limit in the rational state — the institutional embodiment of freedom. Yet the state, however rational, remains a finite arrangement of laws and customs. What lies beyond finite political institutions as the ultimate form in which Spirit knows itself? The organism of civic life still operates through external necessity, through force of habit and law. But Spirit's deepest need is not merely to be enacted — it must be <em>known</em>, fully and transparently, as the infinite expressing itself through and as finite existence. The urgency is this: a civilization that has achieved the rational state but lacks the capacity for absolute self-understanding remains, in the deepest sense, incomplete.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#110718",
          border: "1px solid #2a0a35",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>

          {/* Luminosity Slider */}
          <div style={{ marginBottom: "clamp(16px, 3vw, 24px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#e07b39", letterSpacing: "0.15em", textTransform: "uppercase" }}>Sensuous</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: accent, letterSpacing: "0.1em" }}>{getLuminosityLabel()}</div>
                <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#6a4a7a", marginTop: "2px" }}>dial to trace Spirit's ascent</div>
              </div>
              <span style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#C026D3", letterSpacing: "0.15em", textTransform: "uppercase" }}>Conceptual</span>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #e07b39, #5b8dee, #C026D3)",
                marginBottom: "4px"
              }} />
              <input
                type="range"
                min="0"
                max="3"
                step="0.01"
                value={luminosity}
                onChange={e => setLuminosity(parseFloat(e.target.value))}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  appearance: "none",
                  height: "24px",
                  background: "transparent",
                  position: "absolute",
                  top: "-14px",
                  left: 0
                }}
              />
            </div>
          </div>

          {/* Canvas Wave */}
          <canvas ref={canvasRef} style={{ width: "100%", display: "block", marginBottom: "clamp(16px, 3vw, 20px)", borderRadius: "6px" }} />

          {/* Triptych Panels */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(16px, 3vw, 24px)"
          }}>
            {panels.map((panel, idx) => {
              const opacity = getPanelOpacity(panel.id);
              const glow = getPanelGlow(panel.id);
              const isActive = activePanel === panel.id;
              const isHovered = hoveredPanel === panel.id;
              return (
                <div
                  key={panel.id}
                  onClick={() => setActivePanel(isActive ? null : panel.id)}
                  onMouseEnter={() => setHoveredPanel(panel.id)}
                  onMouseLeave={() => setHoveredPanel(null)}
                  style={{
                    background: `${panel.color}11`,
                    border: `1px solid ${isActive || isHovered ? panel.color : panel.color + "44"}`,
                    borderTop: `3px solid ${panel.color}`,
                    borderRadius: "8px",
                    padding: "clamp(10px, 2vw, 18px)",
                    cursor: "pointer",
                    opacity: opacity,
                    boxShadow: glow > 0.3 ? `0 0 ${Math.round(glow * 30)}px ${panel.color}66` : "none",
                    transition: "all 0.4s ease",
                    transform: isActive ? "translateY(-4px)" : "translateY(0)"
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <div style={{ fontSize: "clamp(20px, 4vw, 32px)", color: panel.color, lineHeight: 1 }}>{panel.icon}</div>
                    <div style={{ fontSize: "clamp(13px, 2vw, 17px)", color: "#f0e0ff", fontWeight: "normal", marginTop: "6px" }}>{panel.label}</div>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: panel.color, marginTop: "3px", letterSpacing: "0.05em" }}>{panel.subtitle}</div>
                  </div>

                  {/* Stages as mini glyphs */}
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px" }}>
                    {panel.stages.map((stage, si) => (
                      <div
                        key={stage.name}
                        onClick={e => { e.stopPropagation(); setActiveStage(activeStage === `${panel.id}-${si}` ? null : `${panel.id}-${si}`); }}
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                          padding: "4px",
                          borderRadius: "4px",
                          background: activeStage === `${panel.id}-${si}` ? panel.color + "33" : "transparent",
                          border: activeStage === `${panel.id}-${si}` ? `1px solid ${panel.color}66` : "1px solid transparent",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ fontSize: "clamp(14px, 2.5vw, 20px)", color: panel.color }}>{stage.glyph}</div>
                        <div style={{ fontSize: "clamp(8px, 1vw, 10px)", color: "#c090d8", marginTop: "2px", whiteSpace: "nowrap" }}>{stage.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Detail */}
          {activeStage && (() => {
            const [pid, sidxStr] = activeStage.split("-");
            const sidx = parseInt(sidxStr);
            const panel = panels.find(p => p.id === pid);
            const stage = panel.stages[sidx];
            return (
              <div style={{
                background: panel.color + "15",
                border: `1px solid ${panel.color}55`,
                borderRadius: "8px",
                padding: "clamp(12px, 2.5vw, 20px)",
                marginBottom: "clamp(12px, 2vw, 18px)",
                animation: "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "clamp(16px, 3vw, 24px)", color: panel.color }}>{stage.glyph}</span>
                  <div>
                    <span style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: panel.color }}>{stage.name}</span>
                    <span style={{ fontSize: "clamp(11px, 1.4vw, 13px)", color: "#8a6a98", marginLeft: "10px" }}>({stage.culture})</span>
                  </div>
                </div>
                <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#dcc8ea", margin: 0, lineHeight: 1.7 }}>{stage.desc}</p>
              </div>
            );
          })()}

          {/* Active Panel Description */}
          {activePanel && (() => {
            const panel = panels.find(p => p.id === activePanel);
            return (
              <div style={{
                background: panel.color + "11",
                border: `1px solid ${panel.color}44`,
                borderRadius: "8px",
                padding: "clamp(12px, 2.5vw, 20px)",
                marginBottom: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", letterSpacing: "0.2em", color: panel.color, textTransform: "uppercase", marginBottom: "8px" }}>{panel.label} — Full Account</div>
                <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#dcc8ea", margin: 0, lineHeight: 1.7 }}>{panel.desc}</p>
              </div>
            );
          })()}

          {/* SVG Progression Diagram */}
          <svg viewBox="0 0 600 90" width="100%" style={{ display: "block", marginTop: "8px" }}>
            <defs>
              <linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e07b39" />
                <stop offset="50%" stopColor="#5b8dee" />
                <stop offset="100%" stopColor="#C026D3" />
              </linearGradient>
            </defs>
            {/* Timeline line */}
            <line x1="40" y1="45" x2="560" y2="45" stroke="url(#progGrad)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />

            {/* Art node */}
            <circle cx="100" cy="45" r="22" fill="#e07b3922" stroke="#e07b39" strokeWidth="1.5" opacity={getPanelOpacity("art")} />
            <text x="100" y="41" textAnchor="middle" fill="#e07b39" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("art")}>◈</text>
            <text x="100" y="56" textAnchor="middle" fill="#e07b39" fontSize="9" fontFamily="Georgia, serif" opacity={getPanelOpacity("art")}>ART</text>
            <text x="100" y="78" textAnchor="middle" fill="#8a6070" fontSize="8" fontFamily="Georgia, serif">Sensuous</text>

            {/* Arrow 1 */}
            <path d="M 130 45 Q 200 20 270 45" stroke="#8a6888" strokeWidth="1" fill="none" opacity="0.5" />
            <polygon points="268,40 275,45 268,50" fill="#8a6888" opacity="0.5" />
            <text x="200" y="28" textAnchor="middle" fill="#7a5888" fontSize="8" fontFamily="Georgia, serif">representation</text>

            {/* Religion node */}
            <circle cx="300" cy="45" r="22" fill="#5b8dee22" stroke="#5b8dee" strokeWidth="1.5" opacity={getPanelOpacity("religion")} />
            <text x="300" y="41" textAnchor="middle" fill="#5b8dee" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("religion")}>✦</text>
            <text x="300" y="56" textAnchor="middle" fill="#5b8dee" fontSize="8" fontFamily="Georgia, serif" opacity={getPanelOpacity("religion")}>RELIGION</text>
            <text x="300" y="78" textAnchor="middle" fill="#6a6090" fontSize="8" fontFamily="Georgia, serif">Narrative</text>

            {/* Arrow 2 */}
            <path d="M 330 45 Q 400 20 470 45" stroke="#8a6888" strokeWidth="1" fill="none" opacity="0.5" />
            <polygon points="468,40 475,45 468,50" fill="#8a6888" opacity="0.5" />
            <text x="400" y="28" textAnchor="middle" fill="#7a5888" fontSize="8" fontFamily="Georgia, serif">pure concept</text>

            {/* Philosophy node */}
            <circle cx="500" cy="45" r="22" fill="#C026D322" stroke="#C026D3" strokeWidth="1.5" opacity={getPanelOpacity("philosophy")} />
            <text x="500" y="41" textAnchor="middle" fill="#C026D3" fontSize="14" fontFamily="Georgia, serif" opacity={getPanelOpacity("philosophy")}>⬡</text>
            <text x="500" y="56" textAnchor="middle" fill="#C026D3" fontSize="7.5" fontFamily="Georgia, serif" opacity={getPanelOpacity("philosophy")}>PHILOSOPHY</text>
            <text x="500" y="78" textAnchor="middle" fill="#9060a8" fontSize="8" fontFamily="Georgia, serif">Conceptual</text>

            {/* Luminosity marker */}
            <circle
              cx={40 + (luminosity / 3) * 520}
              cy="45"
              r="5"
              fill="#ffffff"
              opacity="0.7"
            />
          </svg>

          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#7a5888",
            textAlign: "center",
            margin: "10px 0 0 0",
            fontStyle: "italic"
          }}>Click any panel or stage glyph to explore · Drag the slider to trace Spirit's ascent from beauty to truth</p>
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

        {/* The Difficulty Panel */}
        <div style={{
          background: "#0e1020",
          border: "1px solid #1a1535",
          borderLeft: "4px solid #6040c0",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.1vw, 10px)",
            letterSpacing: "0.25em",
            color: "#6040c0",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "10px"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#ccc0e0",
            margin: "0 0 14px 0",
            lineHeight: 1.7
          }}>
            If philosophy is the highest form of Spirit's self-knowledge and completes the entire system, a sharp tension emerges at its summit. Philosophy achieves conceptual self-transparency — but the self that becomes transparent is not a solitary mind. The entire architecture of Hegel's system has shown that self-consciousness is never immediate: it requires recognition by another, passes through the risk of desire and struggle, develops through labor, law, love, and history. The very movement that culminates in absolute knowing presupposes a structure of mutual recognition — and yet philosophy, in its purest form, seems to withdraw into solitary contemplation of the concept.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#ccc0e0",
            margin: 0,
            lineHeight: 1.7
          }}>
            Moreover, if art has truly been "ended" as the primary vehicle of cultural truth — if the modern world has passed beyond the stage where beauty could carry the full weight of absolute meaning — then what becomes of embodied, sensuous human experience in a civilization that has sublated it into concept? The question of how individual self-consciousness, which requires others to know itself, relates to the system's completed totality remains as an unresolved pressure. <span style={{ color: "#9070c8", fontStyle: "italic" }}>This pressure forces the next development: a rethinking of recognition, intersubjectivity, and what it means for Spirit to know itself not in solitary philosophy but through the living structure of human acknowledgment.</span>
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e0e18",
          border: "1px solid #1a1525",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              padding: "clamp(14px, 2.5vw, 20px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.1vw, 10px)",
              letterSpacing: "0.25em",
              color: accent,
              textTransform: "uppercase",
              fontVariant: "small-caps"
            }}>Real-World Echoes</div>
            {echosOpen
              ? <ChevronUp size={16} color={accent} />
              : <ChevronDown size={16} color={accent} />}
          </div>

          {echosOpen && (
            <div style={{ padding: "0 clamp(14px, 2.5vw, 20px) clamp(14px, 2.5vw, 20px)" }}>
              {[
                {
                  label: "The Egyptian Pyramid",
                  text: "The great pyramids embody symbolic art in its most monumental form. Their sheer mass and geometric perfection strive toward infinite mystery — but the spiritual content (death, resurrection, the journey of the soul) exceeds any shape that architecture can provide. Form and content are not yet reconciled; the pyramid points beyond itself, a sign gesturing toward what it cannot contain."
                },
                {
                  label: "Greek Sculpture and the Classical Ideal",
                  text: "In the Olympian gods as rendered by Phidias or Praxiteles, Hegel sees the classical ideal achieved: the individuated human body, perfected and idealized, becomes the adequate vehicle for divine spiritual content. The god is not symbolized by the human form — it IS the human form, raised to its ideal essence. Form and content are in perfect, serene unity."
                },
                {
                  label: "Christian Painting: Raphael and Leonardo",
                  text: "The Madonnas of Raphael and the Christ figures of Leonardo illustrate romantic art's achievement: the face and gesture become transparent to inner spiritual life — to love, grief, transcendence — in a way that no finite sensuous form can fully exhaust. The painting points inward, beyond itself. Its greatness lies in what it cannot quite show."
                },
                {
                  label: "Modern Art and the End of Art",
                  text: "Contemporary art's self-reflexivity — conceptual art, art about art, art that interrogates what art is — illustrates Hegel's 'end of art' thesis. When art becomes primarily about its own conditions and no longer carries a civilization's spiritual substance, it has entered the post-artistic mode he predicted: form without the weight of absolute content, freedom without sacred necessity."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 3 ? "clamp(12px, 2vw, 16px)" : 0,
                  paddingBottom: i < 3 ? "clamp(12px, 2vw, 16px)" : 0,
                  borderBottom: i < 3 ? "1px solid #1e1528" : "none"
                }}>
                  <div style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: accent, marginBottom: "6px" }}>{echo.label}</div>
                  <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#b0a0c0", margin: 0, lineHeight: 1.7 }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "clamp(24px, 4vw, 40px)", paddingBottom: "16px" }}>
          <div style={{ fontSize: "clamp(9px, 1.1vw, 10px)", color: "#3a2a45", letterSpacing: "0.2em" }}>
            HEGEL'S COMPLETE PHILOSOPHICAL SYSTEM · PART 10 OF 20
          </div>
        </div>

      </div>
    </div>
  );
}

export default AbsoluteSpiritArtReligionPhilosophy;