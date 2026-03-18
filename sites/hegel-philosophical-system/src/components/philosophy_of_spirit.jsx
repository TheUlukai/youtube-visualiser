function PhilosophyOfSpirit() {
  const [selectedRing, setSelectedRing] = useState(null);
  const [hoveredRing, setHoveredRing] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animOffset, setAnimOffset] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const accent = "#1E40AF";

  const keyConcepts = [
    { id: "subjective_spirit", label: "Subjective Spirit", desc: "Subjective Spirit is the first stage — spirit as it exists within the individual: the soul, consciousness, and mind. It encompasses anthropology (spirit embedded in nature and the body), phenomenology (consciousness becoming self-consciousness), and psychology (the faculties of feeling, imagination, and will). It is spirit's most immediate and least free form." },
    { id: "objective_spirit", label: "Objective Spirit", desc: "Objective Spirit is spirit externalized in social institutions — the realm of law, morality, and ethical life. Here freedom is no longer merely inward or individual but embodied in the structures of family, civil society, and the state. This is Hegel's political philosophy: spirit achieving reality by giving itself an objective, institutional form that all members inhabit." },
    { id: "absolute_spirit", label: "Absolute Spirit", desc: "Absolute Spirit is spirit's highest realization — the moment when it comprehends itself as the inner truth of all reality, no longer limited by individual finitude or particular institutions. It manifests through art (sensuous self-knowing), religion (representational self-knowing), and philosophy (conceptual self-knowing). Philosophy is the completion of Spirit's journey." },
    { id: "freedom", label: "Freedom", desc: "Freedom is not a property of isolated individuals but the telos of the entire development of Spirit. Hegel distinguishes mere freedom-from (negative freedom, absence of external constraint) from genuine freedom-to (positive freedom, self-determination according to rational principles). Real freedom is achieved only in rational institutions that make self-realization possible for all." },
    { id: "mutual_recognition", label: "Mutual Recognition", desc: "Self-consciousness requires recognition from another self-consciousness — I cannot know myself as free unless others acknowledge my freedom, and I must acknowledge theirs. This mutual recognition is not merely a social nicety but a metaphysical necessity: the structure of self-conscious freedom is inherently intersubjective, which is why Spirit must externalize itself in social life." },
    { id: "ethical_life", label: "Ethical Life", desc: "Sittlichkeit (ethical life) is the third and highest moment of Objective Spirit — the concrete social world of actual ethical institutions (family, civil society, state) in which individuals find their freedom genuinely realized. Unlike abstract morality, ethical life provides substantive content: the individual is not isolated and self-legislating but embedded in living traditions and mutual obligations." },
  ];

  const rings = [
    {
      id: "absolute",
      label: "Absolute Spirit",
      sublabel: "Art · Religion · Philosophy",
      color: "#1E40AF",
      lightColor: "#3B82F6",
      radius: 0.9,
      description: "The highest form of Spirit's self-understanding, where consciousness grasps the Absolute in sensuous form (art), representational thought (religion), and pure conceptual comprehension (philosophy).",
      stages: [
        { name: "Art", desc: "Spirit expressed in sensuous material — architecture, sculpture, painting, music, poetry — each medium a different degree of spiritual inwardness." },
        { name: "Revealed Religion", desc: "Spirit represented in narrative, image, and community — God as a being who becomes human, reconciling finite and infinite in representational form." },
        { name: "Philosophy", desc: "Spirit comprehending itself in pure thought — the Concept knowing itself as the truth of all reality, the culmination of the entire Hegelian system." },
      ]
    },
    {
      id: "objective",
      label: "Objective Spirit",
      sublabel: "Right · Morality · Ethical Life",
      color: "#1D4ED8",
      lightColor: "#60A5FA",
      radius: 0.62,
      description: "Freedom made objective in social institutions. Individual will externalizes itself into laws, customs, and political structures, achieving a reality beyond any single person.",
      stages: [
        { name: "Abstract Right", desc: "The sphere of property and contract — persons recognized as free through their external possessions and formal agreements." },
        { name: "Morality", desc: "The inner life of conscience — the individual's capacity to will the good and bear responsibility for intentions, not merely actions." },
        { name: "Ethical Life (Sittlichkeit)", desc: "Concrete freedom in living institutions: the Family as love's unity, Civil Society as market interdependence, the State as rational universal freedom." },
      ]
    },
    {
      id: "subjective",
      label: "Subjective Spirit",
      sublabel: "Soul · Consciousness · Mind",
      color: "#2563EB",
      lightColor: "#93C5FD",
      radius: 0.34,
      description: "Spirit as it first awakens in the individual — from the sleeping soul embedded in nature, through the struggle of self-consciousness, to theoretical and practical reason.",
      stages: [
        { name: "Anthropology (Soul)", desc: "The natural soul immersed in bodily life — feeling, habit, sensation — still bound to nature but beginning to differentiate." },
        { name: "Phenomenology of Spirit", desc: "Consciousness confronting the world and other selves — sensory certainty, perception, understanding, and the dialectic of master and servant." },
        { name: "Psychology (Mind)", desc: "Theoretical mind cognizing truth, practical mind pursuing the good — the individual achieving integrated rational agency." },
      ]
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;

    const resize = () => {
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (container) ro.observe(container);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = (t) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.44;

      // Draw animated flowing arrows
      const numArrows = 12;
      for (let i = 0; i < numArrows; i++) {
        const phase = (i / numArrows) * Math.PI * 2;
        const progress = ((t * 0.0004 + i / numArrows) % 1);

        // Outward path (0 to 0.5)
        if (progress < 0.5) {
          const p = progress / 0.5;
          const r = p * maxR;
          const angle = phase + p * 0.3;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          const alpha = Math.sin(p * Math.PI) * 0.6;
          const size = 3 + p * 4;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `#93C5FD${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        } else {
          // Return path (0.5 to 1)
          const p = (progress - 0.5) / 0.5;
          const r = (1 - p) * maxR;
          const angle = phase + 0.3 + p * 0.5;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          const alpha = Math.sin(p * Math.PI) * 0.4;
          const size = 2 + (1 - p) * 3;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `#1E40AF${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame((ts) => draw(ts));
    };

    animRef.current = requestAnimationFrame((ts) => draw(ts));
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const getOpacity = (ringId) => {
    if (!selectedRing && !hoveredRing) return 1;
    if (selectedRing === ringId || hoveredRing === ringId) return 1;
    if (selectedRing && selectedRing !== ringId) return 0.3;
    if (hoveredRing && hoveredRing !== ringId) return 0.5;
    return 1;
  };

  const selectedData = rings.find(r => r.id === selectedRing);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #0f1e4a 0%, #060810 70%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e2e8f0",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vw, 32px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#60A5FA",
            marginBottom: "8px",
          }}>Part 7 of 20 · Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "normal",
            margin: "0 0 8px",
            color: "#e2e8f0",
          }}>The Realm of Human Spirit</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#93C5FD",
            margin: 0,
            fontStyle: "italic",
          }}>Spirit is the self-conscious return of the Absolute Idea to itself through human consciousness, culture, and freedom.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderLeft: "4px solid #1E40AF",
          borderRadius: "8px",
          padding: "clamp(16px, 2.5vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3B82F6",
            marginBottom: "10px",
            fontVariant: "small-caps",
          }}>The Problem</div>
          <p style={{
            margin: 0,
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
          }}>
            Nature reaches its limit in organic life — the plant that responds to light, the animal that feels and strives. Yet no organism can step back and ask <em>what it is</em>, nor reshape the world according to a freely chosen rational purpose. Life alone cannot become aware of itself as life. The pressure accumulates into an unavoidable question: <strong style={{ color: "#93C5FD" }}>how does the transition to genuine self-consciousness and freedom occur?</strong> Something must rupture from within nature's necessity and discover that it is not merely a thing among things but a subject — a being for whom the world exists.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#080d1e",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          overflow: "hidden",
        }}>
          <div style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#93C5FD",
            marginBottom: "4px",
            textAlign: "center",
          }}>The Triadic Structure of Spirit</div>
          <div style={{
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: "#64748b",
            marginBottom: "clamp(12px, 2vw, 20px)",
            textAlign: "center",
          }}>Click any ring to explore its stages</div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 2.5vw, 24px)",
            alignItems: "center",
          }}>
            {/* SVG Ring Diagram */}
            <div style={{ position: "relative", width: "100%", maxWidth: "460px" }}>
              <div ref={containerRef} style={{ position: "relative", width: "100%", paddingBottom: "90%" }}>
                <canvas ref={canvasRef} style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: "100%",
                  pointerEvents: "none",
                }} />
                <svg
                  viewBox="0 0 400 360"
                  width="100%"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                >
                  <defs>
                    <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0f1e4a" stopOpacity="0.6" />
                    </radialGradient>
                    <radialGradient id="midGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.7" />
                    </radialGradient>
                    <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Outer ring - Absolute Spirit */}
                  <circle
                    cx="200" cy="180" r="158"
                    fill="url(#outerGrad)"
                    stroke={selectedRing === "absolute" || hoveredRing === "absolute" ? "#3B82F6" : "#1E40AF"}
                    strokeWidth={selectedRing === "absolute" ? "3" : "1.5"}
                    opacity={getOpacity("absolute")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "absolute" ? null : "absolute")}
                    onMouseEnter={() => setHoveredRing("absolute")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "absolute" || hoveredRing === "absolute" ? "url(#glow)" : "none"}
                  />

                  {/* Middle ring - Objective Spirit */}
                  <circle
                    cx="200" cy="180" r="108"
                    fill="url(#midGrad)"
                    stroke={selectedRing === "objective" || hoveredRing === "objective" ? "#60A5FA" : "#1D4ED8"}
                    strokeWidth={selectedRing === "objective" ? "3" : "1.5"}
                    opacity={getOpacity("objective")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "objective" ? null : "objective")}
                    onMouseEnter={() => setHoveredRing("objective")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "objective" || hoveredRing === "objective" ? "url(#glow)" : "none"}
                  />

                  {/* Inner ring - Subjective Spirit */}
                  <circle
                    cx="200" cy="180" r="58"
                    fill="url(#innerGrad)"
                    stroke={selectedRing === "subjective" || hoveredRing === "subjective" ? "#93C5FD" : "#2563EB"}
                    strokeWidth={selectedRing === "subjective" ? "3" : "1.5"}
                    opacity={getOpacity("subjective")}
                    style={{ cursor: "pointer", transition: "opacity 0.3s, stroke-width 0.2s" }}
                    onClick={() => setSelectedRing(selectedRing === "subjective" ? null : "subjective")}
                    onMouseEnter={() => setHoveredRing("subjective")}
                    onMouseLeave={() => setHoveredRing(null)}
                    filter={selectedRing === "subjective" || hoveredRing === "subjective" ? "url(#glow)" : "none"}
                  />

                  {/* Center dot */}
                  <circle cx="200" cy="180" r="7" fill="#93C5FD" opacity="0.8" />

                  {/* Labels */}
                  <text x="200" y="183" textAnchor="middle" fill="#bfdbfe"
                    fontSize="9" fontFamily="Georgia, serif" opacity={getOpacity("subjective")}
                    style={{ pointerEvents: "none" }}>Subjective</text>

                  <text x="200" y="108" textAnchor="middle" fill="#bfdbfe"
                    fontSize="10" fontFamily="Georgia, serif" opacity={getOpacity("objective")}
                    style={{ pointerEvents: "none" }}>Objective Spirit</text>

                  <text x="200" y="36" textAnchor="middle" fill="#bfdbfe"
                    fontSize="11" fontFamily="Georgia, serif" opacity={getOpacity("absolute")}
                    style={{ pointerEvents: "none" }}>Absolute Spirit</text>

                  {/* Sub-labels for outer rings */}
                  <text x="200" y="120" textAnchor="middle" fill="#93C5FD"
                    fontSize="7.5" fontFamily="Georgia, serif" opacity={getOpacity("objective") * 0.8}
                    style={{ pointerEvents: "none" }}>Right · Morality · Ethical Life</text>

                  <text x="200" y="49" textAnchor="middle" fill="#93C5FD"
                    fontSize="7.5" fontFamily="Georgia, serif" opacity={getOpacity("absolute") * 0.8}
                    style={{ pointerEvents: "none" }}>Art · Religion · Philosophy</text>

                  {/* Outward arrows */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 200 + Math.cos(rad) * 65;
                    const y1 = 180 + Math.sin(rad) * 65;
                    const x2 = 200 + Math.cos(rad) * 155;
                    const y2 = 180 + Math.sin(rad) * 155;
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#1E40AF" strokeWidth="0.8" opacity="0.35"
                        strokeDasharray="4 4"
                        style={{ pointerEvents: "none" }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Selected Ring Detail Panel */}
            {selectedData && (
              <div style={{
                width: "100%",
                background: "#0a1128",
                border: `1px solid ${selectedData.lightColor}55`,
                borderLeft: `4px solid ${selectedData.lightColor}`,
                borderRadius: "8px",
                padding: "clamp(14px, 2.5vw, 24px)",
                animation: "none",
              }}>
                <div style={{
                  fontSize: "clamp(15px, 2.2vw, 19px)",
                  color: selectedData.lightColor,
                  marginBottom: "4px",
                }}>{selectedData.label}</div>
                <div style={{
                  fontSize: "clamp(11px, 1.4vw, 13px)",
                  color: "#64748b",
                  marginBottom: "12px",
                  fontStyle: "italic",
                }}>{selectedData.sublabel}</div>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  lineHeight: "1.75",
                  color: "#cbd5e1",
                  margin: "0 0 16px",
                }}>{selectedData.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedData.stages.map((stage, idx) => (
                    <div key={idx} style={{
                      background: "#060d20",
                      border: `1px solid ${selectedData.color}44`,
                      borderRadius: "6px",
                      padding: "clamp(10px, 2vw, 16px)",
                    }}>
                      <div style={{
                        fontSize: "clamp(12px, 1.6vw, 14px)",
                        color: selectedData.lightColor,
                        marginBottom: "4px",
                        fontWeight: "bold",
                      }}>{idx + 1}. {stage.name}</div>
                      <div style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: "#94a3b8",
                        lineHeight: "1.65",
                      }}>{stage.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ring selector buttons */}
            <div style={{
              display: "flex",
              gap: "clamp(8px, 1.5vw, 12px)",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}>
              {rings.map((ring) => (
                <button
                  key={ring.id}
                  onClick={() => setSelectedRing(selectedRing === ring.id ? null : ring.id)}
                  onMouseEnter={(e) => { e.currentTarget.style.background = ring.color + "55"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = selectedRing === ring.id ? ring.color + "44" : "#0a0f1e"; }}
                  style={{
                    background: selectedRing === ring.id ? ring.color + "44" : "#0a0f1e",
                    border: `1px solid ${selectedRing === ring.id ? ring.lightColor : ring.color}`,
                    borderRadius: "6px",
                    padding: "clamp(6px, 1vw, 10px) clamp(12px, 2vw, 18px)",
                    color: selectedRing === ring.id ? ring.lightColor : "#94a3b8",
                    fontSize: "clamp(10px, 1.4vw, 13px)",
                    fontFamily: "Georgia, serif",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {ring.label}
                </button>
              ))}
            </div>

            {/* Core argument prose */}
            <div style={{
              width: "100%",
              background: "#07101f",
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 24px)",
              borderTop: "1px solid #1e293b",
            }}>
              <div style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3B82F6",
                marginBottom: "10px",
              }}>The Movement of Spirit</div>
              <p style={{
                margin: "0 0 12px",
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: "1.8",
                color: "#cbd5e1",
              }}>
                Spirit is not a ghostly substance floating above the world — it is the realm of human consciousness, society, and culture, the point where the logical categories discovered in the Science of Logic become <em>explicitly</em> self-conscious. The three rings are not merely categories but stages of freedom's own self-actualization.
              </p>
              <p style={{
                margin: 0,
                fontSize: "clamp(12px, 1.6vw, 14px)",
                lineHeight: "1.8",
                color: "#cbd5e1",
              }}>
                Spirit externalizes itself outward from the bare individual into social institutions and cultural forms — then returns inward, recognizing those external structures as expressions of its own rational nature. This journey of <strong style={{ color: "#60A5FA" }}>externalization and return</strong> is Spirit's freedom: not escape from the world, but the recognition that the rational structure of the world is Spirit's own.
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
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderLeft: "4px solid #2563EB",
          borderRadius: "8px",
          padding: "clamp(16px, 2.5vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#60A5FA",
            marginBottom: "10px",
            fontVariant: "small-caps",
          }}>The Difficulty</div>
          <p style={{
            margin: "0 0 14px",
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
          }}>
            The full realization of Spirit requires concrete social and political institutions — freedom is not an inner feeling but a structure that must be built into the actual world. But this creates a tension that mere description cannot resolve: <strong style={{ color: "#93C5FD" }}>what exactly does a rational political order look like?</strong> How does the state reconcile the individual's particular will with the demands of universal law without simply crushing one or the other? And when actual states fail to be rational — as history repeatedly shows — does Hegel's system provide any grounds for critique, or does it simply justify whatever exists?
          </p>
          <p style={{
            margin: 0,
            fontSize: "clamp(12px, 1.6vw, 14px)",
            lineHeight: "1.7",
            color: "#64748b",
            fontStyle: "italic",
          }}>
            This pressure forces the next development — a detailed analysis of the institutions of Objective Spirit: property, contract, conscience, family, civil society, and the constitutional state as the concrete home of human freedom.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0a0f1e",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0f1e4a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom: echosOpen ? "1px solid #1e293b" : "none",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3B82F6",
              fontFamily: "Georgia, serif",
              fontVariant: "small-caps",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#3B82F6" />
              : <ChevronDown size={16} color="#3B82F6" />}
          </button>
          {echosOpen && (
            <div style={{ padding: "clamp(14px, 2.5vw, 24px)" }}>
              {[
                {
                  title: "The Family",
                  body: "For Hegel, the family is the first and most immediate form of ethical life — persons united not by contract but by love, holding property in common, submerging individual selfishness in care for one another. Every household that functions through genuine mutual devotion rather than legal obligation enacts this first stage of Objective Spirit."
                },
                {
                  title: "Civil Society",
                  body: "The market economy and its supporting institutions — courts, police, trade associations — constitute civil society: the sphere where individuals pursue their private interests yet are unknowingly bound together by mutual dependence. Modern capitalism and its regulatory frameworks are the living embodiment of this middle stage, where particular freedom is real but isolated from genuine community."
                },
                {
                  title: "The Constitutional State",
                  body: "The modern democratic state, with its constitution, representative institutions, and rule of law, represents Hegel's synthesis: a structure in which individuals can recognize their own rational will in universal laws they have collectively created. The ongoing debates about constitutional democracy — how to balance individual rights with collective goods — are precisely the tensions Hegel diagnosed."
                },
              ].map((ex, i) => (
                <div key={i} style={{
                  marginBottom: i < 2 ? "clamp(12px, 2vw, 18px)" : 0,
                  paddingBottom: i < 2 ? "clamp(12px, 2vw, 18px)" : 0,
                  borderBottom: i < 2 ? "1px solid #1e293b" : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(13px, 1.8vw, 15px)",
                    color: "#60A5FA",
                    marginBottom: "6px",
                  }}>{ex.title}</div>
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    lineHeight: "1.75",
                    color: "#94a3b8",
                  }}>{ex.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default PhilosophyOfSpirit;