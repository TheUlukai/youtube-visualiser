function ArchitectureOfTheAbsolute() {
  const CORE_ARGUMENT = `Hegel's system begins with the most abstract possible starting point — pure Being — and derives, through purely internal conceptual development, increasingly concrete categories culminating in the Absolute Idea. This Idea must then externalize itself as Nature (logic in spatial-temporal form) and return to itself as Spirit (self-conscious freedom). The three spheres — Logic, Nature, Spirit — are not separate subjects but three aspects of a single self-developing reality, making the system genuinely circular: each part presupposes and completes every other. The Absolute is not a static finished entity but an eternal process of self-differentiation and self-recovery.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [selectedRing, setSelectedRing] = useState(null);
  const [hoveredRing, setHoveredRing] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [pulseT, setPulseT] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const accent = "#6D28D9";

  const keyConcepts = [
    { id: "the_absolute", label: "The Absolute", desc: "The Absolute is Hegel's term for reality as a self-comprehending totality — not a thing or substance but a self-developing process that contains and generates all finite things within itself. It is not something separate from the world but the world understood as a unified, rational whole." },
    { id: "logic_nature_spirit", label: "Logic / Nature / Spirit", desc: "Hegel's system divides into three spheres: the Logic (pure conceptual structures before any world exists), Nature (the Idea externalized in space and time), and Spirit (the Idea returning to itself through conscious freedom). These are not separate topics but three phases of a single self-unfolding reality." },
    { id: "externalization", label: "Externalization", desc: "Externalization (Entäusserung) is the moment the Absolute Idea 'lets itself go' into Nature — into the realm of space, time, and physical contingency. This is a necessary step: Spirit can only return to itself by first going outside itself, encountering an other, and recognizing that other as itself." },
    { id: "self_returning_circle", label: "Self-Returning Circle", desc: "The entire system is circular: the end (Absolute Spirit knowing itself) is already implicitly present at the beginning (pure Being), and the beginning is fully understood only in light of the end. This is not a vicious circle but what Hegel calls the 'circle of circles' — each part presupposes and completes every other." },
    { id: "idea_in_otherness", label: "Idea in Otherness", desc: "Nature is not the opposite of thought but the Idea in the form of otherness — logic in spatial-temporal disguise. This means that the rational structure uncovered in the Logic is the same structure science discovers in the natural world, making genuine knowledge of nature possible without appeal to an unknowable thing-in-itself." },
    { id: "systematic_philosophy", label: "Systematic Philosophy", desc: "Hegel insists philosophy must be a system — not a collection of isolated insights but an internally connected whole where each claim derives its meaning from its place in the total structure. A philosophical claim pulled from the system is like a limb severed from a living body: it cannot function as it did when alive." },
  ];

  const rings = [
    {
      id: "logic",
      label: "Logic",
      color: "#6D28D9",
      description: "The inner rational structure of reality — pure conceptual categories developing from Being through Essence to the Absolute Idea, before any externalization in time or space.",
      stages: [
        { name: "Being", desc: "The most abstract, immediate starting point: pure undetermined presence." },
        { name: "Essence", desc: "Being reflecting on itself, generating appearance and ground distinctions." },
        { name: "The Notion", desc: "The self-determining concept — subjectivity, objectivity, and their unity." },
        { name: "Absolute Idea", desc: "Logic's culmination: thought that grasps itself as the whole." }
      ]
    },
    {
      id: "nature",
      label: "Nature",
      color: "#9333EA",
      description: "The Idea in its otherness — logical categories externalized in space, time, and matter. Nature is not opposed to Spirit but is Logic alienated from itself, awaiting return.",
      stages: [
        { name: "Mechanics", desc: "Space, time, matter — the abstract externality of natural being." },
        { name: "Physics", desc: "Light, chemical process — nature gaining inner differentiation." },
        { name: "Organics", desc: "Life itself — nature's highest form, preparing for self-consciousness." },
        { name: "Geology & Biology", desc: "The earth organism culminating in the animal subject." }
      ]
    },
    {
      id: "spirit",
      label: "Spirit",
      color: "#A855F7",
      description: "Logic returning to itself through Nature — self-conscious freedom realizing the rational structure first laid out abstractly in Logic, now made concrete in mind, culture, and history.",
      stages: [
        { name: "Subjective Spirit", desc: "Individual consciousness — soul, phenomenology, psychology." },
        { name: "Objective Spirit", desc: "Right, morality, and ethical life — freedom made institutional." },
        { name: "Absolute Spirit", desc: "Art, religion, and philosophy — Spirit knowing itself as Absolute." },
        { name: "Absolute Knowledge", desc: "The complete circle closed: systematic self-comprehension." }
      ]
    }
  ];

  useEffect(() => {
    let frame;
    const tick = (t) => {
      timeRef.current = t;
      setPulseT(t);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const draw = (t) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const baseR = minDim * 0.08;

      const numParticles = 60;
      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2 + t * 0.0003;
        const radiusFactor = 0.2 + 0.3 * ((i * 0.618033) % 1);
        const r = minDim * radiusFactor;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const alpha = 0.08 + 0.12 * Math.sin(t * 0.001 + i);
        const size = 1 + 1.5 * ((i * 0.31) % 1);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `#6D28D9${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  const t = pulseT;
  const pulse = 0.5 + 0.5 * Math.sin(t * 0.002);
  const slowPulse = 0.5 + 0.5 * Math.sin(t * 0.0008);

  const ringRadii = [42, 68, 90];
  const viewBoxSize = 220;
  const cx = 110;
  const cy = 110;

  const getStrokeDash = (ringIndex) => {
    const phase = (t * 0.0004 + ringIndex * 0.33) % 1;
    return `${phase * 100} ${100 - phase * 100 + 0.01}`;
  };

  const isActive = (id) => selectedRing === id || hoveredRing === id;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 50% 30%, #2e1065 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      fontFamily: "Georgia, serif",
      color: "#e2d9f3"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vw, 28px)"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(4px, 1vw, 8px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: "8px"
          }}>Part 4 of 20 — Hegel's System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: "normal",
            color: "#f5f0ff",
            margin: "0 0 8px 0",
            letterSpacing: "0.02em"
          }}>The Architecture of the Absolute</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c4b5fd",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.6
          }}>
            The Absolute is not a supernatural entity but the complete, self-developing totality of thought and being, grasped as a single systematic whole.
          </p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#12091f",
          border: "1px solid #2d1b69",
          borderLeft: "4px solid #6D28D9",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7c3aed",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd6fe",
            margin: 0
          }}>
            The master-slave dialectic revealed that individual self-consciousness collapses under scrutiny — each self requires another self to be recognized, and that recognition is always fraught, unequal, incomplete. But this raises an urgent, vertiginous question: <em>what is the ultimate framework</em> — the total structure of reality — within which all these developments of consciousness, nature, and social life actually fit together? Without such a framework, philosophy has no ground beneath it, only an endless series of partial perspectives colliding without resolution.
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
        <div style={{
          background: "#0d0820",
          border: "1px solid #2d1b69",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div
            ref={containerRef}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              pointerEvents: "none",
              overflow: "hidden"
            }}
          >
            <canvas ref={canvasRef} style={{ display: "block" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "clamp(14px, 2.2vw, 18px)",
              fontWeight: "normal",
              color: "#c4b5fd",
              textAlign: "center",
              margin: "0 0 clamp(12px, 2vw, 20px) 0",
              letterSpacing: "0.05em"
            }}>The Triadic System — Logic · Nature · Spirit</h2>

            {/* SVG Diagram */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                width="100%"
                style={{ maxWidth: "360px", display: "block" }}
                aria-label="Triadic diagram of Logic, Nature, and Spirit"
              >
                <defs>
                  <radialGradient id="absGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9 + pulse * 0.1} />
                    <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.4 + pulse * 0.2} />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Radiating lines from center */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const lineAlpha = 0.2 + 0.15 * Math.sin(t * 0.001 + i * 0.8);
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={cx + Math.cos(rad) * 100}
                      y2={cy + Math.sin(rad) * 100}
                      stroke="#6D28D9"
                      strokeWidth="0.3"
                      strokeOpacity={lineAlpha}
                    />
                  );
                })}

                {/* Ring 3 — Spirit (outermost) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[2]}
                  fill="none"
                  stroke={isActive("spirit") ? "#A855F7" : "#5b21b6"}
                  strokeWidth={isActive("spirit") ? 3 : 1.5}
                  strokeOpacity={isActive("spirit") ? 0.9 : 0.5}
                  filter={isActive("spirit") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "spirit" ? null : "spirit")}
                  onMouseEnter={() => setHoveredRing("spirit")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                {/* Animated arc for Spirit */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[2]}
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="1"
                  strokeOpacity={0.6 + slowPulse * 0.2}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[2] * 0.3} ${Math.PI * 2 * ringRadii[2] * 0.7}`}
                  strokeDashoffset={-t * 0.04}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx}
                  y={cy - ringRadii[2] - 4}
                  textAnchor="middle"
                  fill={isActive("spirit") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="8"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "spirit" ? null : "spirit")}
                  onMouseEnter={() => setHoveredRing("spirit")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Spirit</text>

                {/* Ring 2 — Nature (middle) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[1]}
                  fill="none"
                  stroke={isActive("nature") ? "#9333EA" : "#6D28D9"}
                  strokeWidth={isActive("nature") ? 3 : 1.5}
                  strokeOpacity={isActive("nature") ? 0.9 : 0.55}
                  filter={isActive("nature") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "nature" ? null : "nature")}
                  onMouseEnter={() => setHoveredRing("nature")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                <circle
                  cx={cx} cy={cy} r={ringRadii[1]}
                  fill="none"
                  stroke="#9333EA"
                  strokeWidth="1"
                  strokeOpacity={0.6 + pulse * 0.2}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[1] * 0.25} ${Math.PI * 2 * ringRadii[1] * 0.75}`}
                  strokeDashoffset={-t * 0.06}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx + ringRadii[1] + 4}
                  y={cy + 3}
                  textAnchor="start"
                  fill={isActive("nature") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="7.5"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "nature" ? null : "nature")}
                  onMouseEnter={() => setHoveredRing("nature")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Nature</text>

                {/* Ring 1 — Logic (innermost) */}
                <circle
                  cx={cx} cy={cy} r={ringRadii[0]}
                  fill="none"
                  stroke={isActive("logic") ? "#6D28D9" : "#4c1d95"}
                  strokeWidth={isActive("logic") ? 3 : 1.5}
                  strokeOpacity={isActive("logic") ? 1 : 0.6}
                  filter={isActive("logic") ? "url(#glow)" : "none"}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => setSelectedRing(selectedRing === "logic" ? null : "logic")}
                  onMouseEnter={() => setHoveredRing("logic")}
                  onMouseLeave={() => setHoveredRing(null)}
                />
                <circle
                  cx={cx} cy={cy} r={ringRadii[0]}
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="1.2"
                  strokeOpacity={0.7 + pulse * 0.15}
                  strokeDasharray={`${Math.PI * 2 * ringRadii[0] * 0.2} ${Math.PI * 2 * ringRadii[0] * 0.8}`}
                  strokeDashoffset={-t * 0.08}
                  strokeLinecap="round"
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx}
                  y={cy + ringRadii[0] + 10}
                  textAnchor="middle"
                  fill={isActive("logic") ? "#e9d5ff" : "#c4b5fd"}
                  fontSize="7.5"
                  fontFamily="Georgia, serif"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRing(selectedRing === "logic" ? null : "logic")}
                  onMouseEnter={() => setHoveredRing("logic")}
                  onMouseLeave={() => setHoveredRing(null)}
                >Logic</text>

                {/* Central Absolute node */}
                <circle
                  cx={cx} cy={cy}
                  r={12 + pulse * 3}
                  fill="url(#absGrad)"
                  filter="url(#strongGlow)"
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={cx} cy={cy}
                  r={8}
                  fill="#6D28D9"
                  fillOpacity={0.8 + pulse * 0.2}
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={cx} y={cy - 2}
                  textAnchor="middle"
                  fill="#f5f0ff"
                  fontSize="4.5"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >The</text>
                <text
                  x={cx} y={cy + 4.5}
                  textAnchor="middle"
                  fill="#f5f0ff"
                  fontSize="4.5"
                  fontFamily="Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >Absolute</text>

                {/* Clockwise arrows */}
                {[0, 1, 2].map((ri) => {
                  const r = ringRadii[ri];
                  const arrowAngle = (t * [0.0006, 0.0005, 0.0004][ri]) % (Math.PI * 2);
                  const ax = cx + Math.cos(arrowAngle) * r;
                  const ay = cy + Math.sin(arrowAngle) * r;
                  const dx = -Math.sin(arrowAngle) * 4;
                  const dy = Math.cos(arrowAngle) * 4;
                  const colors = ["#8b5cf6", "#a855f7", "#c084fc"];
                  return (
                    <g key={ri} style={{ pointerEvents: "none" }}>
                      <polygon
                        points={`${ax},${ay} ${ax - dx - dy * 0.5},${ay - dy + dx * 0.5} ${ax - dx + dy * 0.5},${ay - dy - dx * 0.5}`}
                        fill={colors[ri]}
                        fillOpacity={0.9}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Instruction */}
            <p style={{
              textAlign: "center",
              fontSize: "clamp(10px, 1.4vw, 12px)",
              color: "#7c3aed",
              margin: "8px 0 16px 0",
              letterSpacing: "0.05em"
            }}>
              Click any ring to explore its stages
            </p>

            {/* Expanded Ring Detail */}
            {selectedRing && (() => {
              const ring = rings.find(r => r.id === selectedRing);
              return (
                <div style={{
                  background: "#160b2e",
                  border: `1px solid ${ring.color}44`,
                  borderLeft: `4px solid ${ring.color}`,
                  borderRadius: "8px",
                  padding: "clamp(14px, 2.5vw, 22px)",
                  marginTop: "4px",
                  transition: "all 0.3s"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px"
                  }}>
                    <h3 style={{
                      fontSize: "clamp(15px, 2.4vw, 20px)",
                      color: ring.color,
                      margin: 0,
                      fontWeight: "normal"
                    }}>{ring.label}</h3>
                    <button
                      onClick={() => setSelectedRing(null)}
                      style={{
                        background: "none",
                        border: `1px solid ${ring.color}66`,
                        color: "#a78bfa",
                        borderRadius: "4px",
                        padding: "2px 10px",
                        cursor: "pointer",
                        fontSize: "clamp(10px, 1.4vw, 12px)",
                        fontFamily: "Georgia, serif"
                      }}
                    >Close</button>
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#ddd6fe",
                    lineHeight: 1.7,
                    margin: "0 0 16px 0"
                  }}>{ring.description}</p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
                    gap: "10px"
                  }}>
                    {ring.stages.map((stage, i) => (
                      <div key={i} style={{
                        background: "#1e0f40",
                        border: `1px solid ${ring.color}33`,
                        borderRadius: "6px",
                        padding: "12px"
                      }}>
                        <div style={{
                          fontSize: "clamp(11px, 1.5vw, 13px)",
                          color: ring.color,
                          marginBottom: "6px",
                          fontWeight: "bold"
                        }}>
                          {["I.", "II.", "III.", "IV."][i]} {stage.name}
                        </div>
                        <div style={{
                          fontSize: "clamp(10px, 1.4vw, 12px)",
                          color: "#c4b5fd",
                          lineHeight: 1.6
                        }}>{stage.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Core Argument prose */}
            {!selectedRing && (
              <div style={{ marginTop: "clamp(16px, 2.5vw, 24px)" }}>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  color: "#c4b5fd",
                  lineHeight: 1.8,
                  margin: "0 0 12px 0"
                }}>
                  Hegel's system begins with the most abstract possible starting point — pure Being — and derives, through purely internal conceptual development, increasingly concrete categories culminating in the Absolute Idea. This Idea must then externalize itself as Nature (logic in spatial-temporal form) and return to itself as Spirit (self-conscious freedom).
                </p>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  color: "#c4b5fd",
                  lineHeight: 1.8,
                  margin: 0
                }}>
                  The three spheres — Logic, Nature, Spirit — are not separate subjects but three aspects of a single self-developing reality, making the system genuinely circular: each part presupposes and completes every other. The Absolute is not a static finished entity but an eternal process of self-differentiation and self-recovery.
                </p>
              </div>
            )}
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
          background: "#0f0a1e",
          border: "1px solid #3b1f6e",
          borderLeft: "4px solid #9333EA",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9333EA",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#ddd6fe",
            margin: "0 0 12px 0"
          }}>
            If the Absolute is grasped systematically through Logic, Nature, and Spirit, we need a detailed account of how pure thought itself develops — what is the internal logic of logical categories before they are externalized in Nature? The triadic framework names the structure but does not yet unfold it from within. The whole system rests on Logic, yet Logic's own internal movement remains to be shown.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#a78bfa",
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.6
          }}>
            This pressure forces the next development: a painstaking, category-by-category derivation of how pure thought moves from Being through Essence to the Notion — the Science of Logic itself, from the ground up.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0d0820",
          border: "1px solid #2d1b69",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 28px)",
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
              color: "#7c3aed",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echoesOpen
              ? <ChevronUp size={18} color="#7c3aed" />
              : <ChevronDown size={18} color="#7c3aed" />
            }
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)"
            }}>
              <div style={{
                borderTop: "1px solid #2d1b69",
                paddingTop: "clamp(14px, 2.5vw, 20px)",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{
                  background: "#160b2e",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #6D28D9"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a78bfa",
                    marginBottom: "8px",
                    fontWeight: "bold"
                  }}>Einstein and the Revision of Physics</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c4b5fd",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    When Einstein's relativity challenged Newtonian mechanics, it was not one isolated concept that changed — mass, time, space, simultaneity, gravity, and causation all had to be reconceived together. No concept could be revised in isolation because they formed a mutually dependent system. This mirrors Hegel's insistence that the categories of Logic, Nature, and Spirit are internally bound: to grasp one truly is to grasp all.
                  </p>
                </div>
                <div style={{
                  background: "#160b2e",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #9333EA"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a78bfa",
                    marginBottom: "8px",
                    fontWeight: "bold"
                  }}>The Organism and Its Organs</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c4b5fd",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    No organ of the body is intelligible in isolation — the heart only makes sense in relation to blood, lungs, brain, and the organism's life as a whole. Each part exists for the whole and through the whole. Hegel's Logic, Nature, and Spirit relate in exactly this way: not as independent compartments but as moments of a living totality in which each part is the whole seen from a particular vantage.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ArchitectureOfTheAbsolute;