function RecognitionStructure() {
  const [sliderValue, setSliderValue] = useState(0);
  const [hoveredStage, setHoveredStage] = useState(null);
  const [expandedEchoes, setExpandedEchoes] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  const stages = [
    {
      id: "domination",
      label: "Master–Slave",
      range: [0, 0.28],
      color: "#c0392b",
      description: "The master forces recognition from the slave, but this recognition is worthless — it comes from someone the master has denied as a free equal. The victor gains an empty mirror.",
      gap: 0.72,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "one-way",
      fail: "Recognition without freedom is flattery, not acknowledgment."
    },
    {
      id: "stoicism",
      label: "Stoic Withdrawal",
      range: [0.28, 0.55],
      color: "#8e44ad",
      description: "The Stoic and Skeptic retreat inward, asserting independence from all external recognition. Freedom becomes purely interior — but a self-consciousness that turns away from others cannot confirm its own content.",
      gap: 0.6,
      leftAngle: -35,
      rightAngle: 35,
      arrows: "none",
      fail: "Negative freedom cannot generate positive selfhood."
    },
    {
      id: "ethical",
      label: "Ethical Life",
      range: [0.55, 0.78],
      color: "#0891B2",
      description: "In shared institutions — family, civil society, the state — recognition is embedded in social roles and laws. Partial mutuality emerges, though individual and universal remain in tension.",
      gap: 0.3,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "bidirectional-partial",
      fail: "Institutional recognition can become alienating when institutions lose their living spirit."
    },
    {
      id: "mutual",
      label: "Mutual Recognition",
      range: [0.78, 1.0],
      color: "#10b981",
      description: "Free beings acknowledge each other as free. The gap closes. Each self finds itself in the other — not by dominating, not by withdrawing, but through the reciprocal gift of acknowledgment that constitutes genuine freedom.",
      gap: 0.05,
      leftAngle: 0,
      rightAngle: 0,
      arrows: "bidirectional-full",
      fail: null
    }
  ];

  const getCurrentStage = (val) => {
    return stages.find(s => val >= s.range[0] && val <= s.range[1]) || stages[3];
  };

  const currentStage = getCurrentStage(sliderValue);

  const interpolate = (val) => {
    const s = getCurrentStage(val);
    const progress = (val - s.range[0]) / (s.range[1] - s.range[0]);
    return { stage: s, progress };
  };

  const { stage, progress } = interpolate(sliderValue);

  const getGap = () => {
    const s = getCurrentStage(sliderValue);
    const idx = stages.indexOf(s);
    if (idx < stages.length - 1) {
      const next = stages[idx + 1];
      const p = (sliderValue - s.range[0]) / (s.range[1] - s.range[0]);
      return s.gap + (next.gap - s.gap) * p;
    }
    return s.gap;
  };

  const currentGap = getGap();

  const concepts = [
    { id: "anerkennung", label: "Anerkennung", sub: "Recognition", desc: "The fundamental act by which one consciousness acknowledges another as genuinely free and rational — and is itself acknowledged in return. Not mere approval, but ontological confirmation." },
    { id: "intersubjectivity", label: "Intersubjectivity", sub: "The Between", desc: "Selfhood does not precede social relation but emerges through it. 'I' am always already constituted through the gaze, language, and acknowledgment of others." },
    { id: "unhappy", label: "Unhappy Consciousness", sub: "The Divided Self", desc: "When recognition fails — or is projected onto an unreachable transcendent — consciousness experiences itself as irreconcilably split: finite here, infinite there, never whole." },
    { id: "social", label: "Reason as Social Achievement", sub: "Spirit as We", desc: "What Hegel calls Geist — spirit — is not a metaphysical substance but the living reality of human beings recognizing each other in shared institutions, language, and practice." }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let t = 0;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const stageColor = getCurrentStage(sliderValue).color;
      const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        return [r,g,b];
      };
      const [sr,sg,sb] = hex2rgb(stageColor);

      // Draw subtle wave lines
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y0 = h * 0.15 + i * (h * 0.18);
        const alpha = 0.04 + i * 0.015;
        ctx.strokeStyle = `rgba(${sr},${sg},${sb},${alpha})`;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = y0 + Math.sin((x / w) * Math.PI * 3 + t * 0.4 + i * 0.8) * (h * 0.04);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Particle field
      const particleCount = 18;
      for (let i = 0; i < particleCount; i++) {
        const px = (Math.sin(i * 2.3 + t * 0.15) * 0.4 + 0.5) * w;
        const py = (Math.cos(i * 1.7 + t * 0.1) * 0.4 + 0.5) * h;
        const radius = 1.5 + Math.sin(i + t * 0.3) * 1;
        const opa = 0.08 + Math.sin(i + t * 0.2) * 0.04;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sr},${sg},${sb},${opa})`;
        ctx.fill();
      }

      t += 0.02;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [sliderValue]);

  const renderSVGFigures = () => {
    const gap = currentGap;
    const leftX = 0.5 - gap / 2 - 0.12;
    const rightX = 0.5 + gap / 2 + 0.12;
    const figureY = 0.42;

    const s = getCurrentStage(sliderValue);
    const leftRotate = s.leftAngle;
    const rightRotate = s.rightAngle;

    const arrowType = s.arrows;
    const stageColor = s.color;

    const centerX = 0.5;

    return (
      <svg viewBox="0 0 800 400" width="100%" style={{ maxWidth: "min(90vw,860px)", display: "block", margin: "0 auto" }}>
        <defs>
          <radialGradient id="leftGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={stageColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stageColor} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={stageColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stageColor} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={stageColor} />
          </marker>
          <marker id="arrowLeft" markerWidth="8" markerHeight="8" refX="0" refY="3" orient="auto-start-reverse">
            <path d="M6,0 L0,3 L6,6 Z" fill={stageColor} />
          </marker>
        </defs>

        {/* Background ellipses for each figure */}
        <ellipse cx={leftX * 800} cy={figureY * 400} rx={60} ry={70} fill="url(#leftGlow)" />
        <ellipse cx={rightX * 800} cy={figureY * 400} rx={60} ry={70} fill="url(#rightGlow)" />

        {/* Left figure */}
        <g transform={`translate(${leftX * 800}, ${figureY * 400}) rotate(${leftRotate})`}>
          {/* Head */}
          <circle cx={0} cy={-80} r={22} fill="#1a2a35" stroke={stageColor} strokeWidth="2" filter="url(#glow)" />
          {/* Body */}
          <rect x={-14} y={-56} width={28} height={56} rx={6} fill="#1a2a35" stroke={stageColor} strokeWidth="1.5" />
          {/* Arms */}
          <line x1={-14} y1={-45} x2={-36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={14} y1={-45} x2={36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          {/* Legs */}
          <line x1={-8} y1={0} x2={-14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={8} y1={0} x2={14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          {/* Face dot */}
          <circle cx={-6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <circle cx={6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          {/* Label */}
          <text x={0} y={65} textAnchor="middle" fill={stageColor} fontSize="13" fontFamily="Georgia, serif" opacity="0.9">Self</text>
        </g>

        {/* Right figure */}
        <g transform={`translate(${rightX * 800}, ${figureY * 400}) rotate(${rightRotate})`}>
          <circle cx={0} cy={-80} r={22} fill="#1a2a35" stroke={stageColor} strokeWidth="2" filter="url(#glow)" />
          <rect x={-14} y={-56} width={28} height={56} rx={6} fill="#1a2a35" stroke={stageColor} strokeWidth="1.5" />
          <line x1={-14} y1={-45} x2={-36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={14} y1={-45} x2={36} y2={-20} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={-8} y1={0} x2={-14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <line x1={8} y1={0} x2={14} y2={38} stroke={stageColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx={-6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <circle cx={6} cy={-82} r={3} fill={stageColor} opacity="0.8" />
          <text x={0} y={65} textAnchor="middle" fill={stageColor} fontSize="13" fontFamily="Georgia, serif" opacity="0.9">Other</text>
        </g>

        {/* Gap label */}
        {gap > 0.1 && (
          <text x={400} y={figureY * 400 - 95} textAnchor="middle" fill="#888888" fontSize="11" fontFamily="Georgia, serif">
            — gap —
          </text>
        )}

        {/* Arrows based on mode */}
        {arrowType === "one-way" && (
          <>
            <line
              x1={rightX * 800 - 55}
              y1={figureY * 400 - 40}
              x2={leftX * 800 + 55}
              y2={figureY * 400 - 40}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowLeft)"
              opacity="0.9"
              strokeDasharray="4,3"
            />
            <text x={400} y={figureY * 400 - 20} textAnchor="middle" fill={stageColor} fontSize="11" fontFamily="Georgia, serif" opacity="0.7">coerced acknowledgment</text>
          </>
        )}

        {arrowType === "bidirectional-partial" && (
          <>
            <line
              x1={leftX * 800 + 55}
              y1={figureY * 400 - 50}
              x2={rightX * 800 - 55}
              y2={figureY * 400 - 50}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowRight)"
              opacity="0.75"
            />
            <line
              x1={rightX * 800 - 55}
              y1={figureY * 400 - 30}
              x2={leftX * 800 + 55}
              y2={figureY * 400 - 30}
              stroke={stageColor}
              strokeWidth="2.5"
              markerEnd="url(#arrowLeft)"
              opacity="0.75"
            />
            <text x={400} y={figureY * 400 - 10} textAnchor="middle" fill={stageColor} fontSize="11" fontFamily="Georgia, serif" opacity="0.7">partial mutuality</text>
          </>
        )}

        {arrowType === "bidirectional-full" && (
          <>
            {[...Array(3)].map((_, i) => (
              <line
                key={i}
                x1={leftX * 800 + 55}
                y1={figureY * 400 - 55 + i * 18}
                x2={rightX * 800 - 55}
                y2={figureY * 400 - 55 + i * 18}
                stroke={stageColor}
                strokeWidth={i === 1 ? 3 : 2}
                markerEnd="url(#arrowRight)"
                markerStart="url(#arrowLeft)"
                opacity={0.9 - i * 0.15}
                filter={i === 1 ? "url(#glow)" : undefined}
              />
            ))}
            <text x={400} y={figureY * 400 + 10} textAnchor="middle" fill={stageColor} fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.9">free recognition of the free</text>
          </>
        )}

        {arrowType === "none" && (
          <>
            <text x={400} y={figureY * 400 - 40} textAnchor="middle" fill={stageColor} fontSize="12" fontFamily="Georgia, serif" opacity="0.75" fontStyle="italic">— withdrawn —</text>
            <line x1={350} y1={figureY * 400 - 50} x2={400} y2={figureY * 400 - 55} stroke={stageColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            <line x1={450} y1={figureY * 400 - 50} x2={400} y2={figureY * 400 - 55} stroke={stageColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          </>
        )}

        {/* Stage markers on bottom axis */}
        {stages.map((s, i) => {
          const mx = (s.range[0] + s.range[1]) / 2;
          const isActive = currentStage.id === s.id;
          return (
            <g key={s.id}>
              <circle
                cx={80 + mx * 640}
                cy={370}
                r={isActive ? 7 : 4}
                fill={isActive ? s.color : "#333"}
                stroke={s.color}
                strokeWidth="1.5"
                opacity={isActive ? 1 : 0.5}
              />
              <text
                x={80 + mx * 640}
                y={390}
                textAnchor="middle"
                fill={isActive ? s.color : "#666"}
                fontSize="10"
                fontFamily="Georgia, serif"
                opacity={isActive ? 1 : 0.6}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Axis line */}
        <line x1={80} y1={370} x2={720} y2={370} stroke="#333" strokeWidth="1" />
      </svg>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #062e3f 0%, #050c14 50%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#e0e8ed",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0891B2",
            textTransform: "uppercase",
            marginBottom: "10px",
            opacity: 0.9
          }}>Part 11 of 20 — Phenomenology of Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "normal",
            margin: "0 0 10px 0",
            color: "#f0f8ff",
            letterSpacing: "-0.02em"
          }}>The Drama of Recognition</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#8ab8c8",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>Recognition is the fundamental intersubjective structure through which human beings achieve self-consciousness, freedom, and authentic selfhood.</p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(8, 20, 30, 0.85)",
          borderLeft: "3px solid #0891B2",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)",
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#0891B2",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontVariant: "small-caps"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            margin: 0,
            color: "#c8dde8",
            fontStyle: "italic"
          }}>
            The Absolute System and its culmination in philosophy reveal that truth is systematic and intersubjective — but what is the underlying human need that drives all these developments from individual consciousness through social institutions to absolute spirit? Philosophy has mapped the territory, yet the engine remains unnamed. What compels the self to leave its solitude and enter the dangerous, necessary world of other selves?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(6, 18, 28, 0.9)",
          borderRadius: "10px",
          border: "1px solid rgba(8,145,178,0.2)",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <h2 style={{
            fontSize: "clamp(15px, 2.2vw, 20px)",
            fontWeight: "normal",
            color: "#0891B2",
            margin: "0 0 8px 0",
            letterSpacing: "0.04em"
          }}>The Dialectic of Recognition</h2>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7a9aaa",
            margin: "0 0 20px 0",
            lineHeight: 1.6
          }}>
            Drag the slider to move through the stages. Watch how the figures relate — and fail to relate — at each moment of the dialectic.
          </p>

          {/* Canvas background + SVG overlay */}
          <div ref={containerRef} style={{
            position: "relative",
            width: "100%",
            height: "clamp(260px, 40vw, 420px)",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "20px",
            background: "rgba(3, 10, 18, 0.7)"
          }}>
            <canvas ref={canvasRef} style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }} />
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {renderSVGFigures()}
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#7a9aaa", letterSpacing: "0.05em" }}>Mode of Recognition</span>
              <span style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: currentStage.color,
                fontWeight: "bold",
                letterSpacing: "0.05em",
                transition: "color 0.4s ease"
              }}>{currentStage.label}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(sliderValue * 100)}
              onChange={e => setSliderValue(e.target.value / 100)}
              style={{
                width: "100%",
                appearance: "none",
                height: "6px",
                borderRadius: "3px",
                background: `linear-gradient(to right, ${currentStage.color} ${sliderValue * 100}%, #1a2a35 ${sliderValue * 100}%)`,
                outline: "none",
                cursor: "pointer"
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px"
            }}>
              {stages.map(s => (
                <span key={s.id} style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  color: currentStage.id === s.id ? s.color : "#445",
                  transition: "color 0.3s",
                  textAlign: "center",
                  flex: 1
                }}>{s.label.split("–")[0]}</span>
              ))}
            </div>
          </div>

          {/* Stage description card */}
          <div style={{
            background: "rgba(8, 145, 178, 0.07)",
            borderLeft: `3px solid ${currentStage.color}`,
            borderRadius: "6px",
            padding: "clamp(14px, 2.5vw, 22px)",
            transition: "border-color 0.4s ease",
            marginBottom: "20px"
          }}>
            <div style={{
              fontSize: "clamp(14px, 1.9vw, 17px)",
              color: currentStage.color,
              marginBottom: "10px",
              fontWeight: "normal",
              transition: "color 0.4s"
            }}>{currentStage.label}</div>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              lineHeight: 1.75,
              color: "#c0d4de",
              margin: "0 0 10px 0"
            }}>{currentStage.description}</p>
            {currentStage.fail && (
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#e8b86a",
                borderTop: "1px solid rgba(232,184,106,0.2)",
                paddingTop: "10px",
                fontStyle: "italic"
              }}>
                Why it fails: {currentStage.fail}
              </div>
            )}
            {!currentStage.fail && (
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#10b981",
                borderTop: "1px solid rgba(16,185,129,0.2)",
                paddingTop: "10px",
                fontStyle: "italic"
              }}>
                The telos of the dialectic — genuine selfhood achieved through the other, not despite them.
              </div>
            )}
          </div>

        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #0891B233",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#0891B2", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#0891B2" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#0891B2" : "#0891B255"}`,
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
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #0891B244", borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#0891B2", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(8, 14, 24, 0.88)",
          borderLeft: "3px solid #0e6a80",
          borderRadius: "6px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#0e6a80",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontVariant: "small-caps"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            lineHeight: 1.75,
            margin: "0 0 14px 0",
            color: "#b8ccd8"
          }}>
            The drive for recognition, once named, reveals a new wound. If acknowledgment from other free beings is what self-consciousness requires, what happens when no such acknowledgment appears — or when the self, despairing of finite recognition, projects its infinite longing onto a transcendent beyond? The consciousness that cannot find itself in any earthly mirror turns toward heaven, but this divine infinity only deepens the split: the finite self here, the infinite there, a gap that cannot be crossed by any act of will. This is the <em>unhappy consciousness</em> — self-consciousness in a condition of irreconcilable division, worshipping what it can never become, mourning what it has cast away.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7a96a6",
            fontStyle: "italic",
            borderTop: "1px solid rgba(14,106,128,0.3)",
            paddingTop: "12px",
            margin: 0,
            lineHeight: 1.7
          }}>
            This pressure forces the next development: understanding how alienated consciousness arises from failed recognition, and tracing the long path through medieval devotion, Stoic endurance, and skeptical negation toward the moment when the unhappy consciousness finally discovers the social world in which genuine reconciliation becomes possible.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(8, 14, 24, 0.75)",
          borderRadius: "6px",
          border: "1px solid rgba(8,145,178,0.15)",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setExpandedEchoes(!expandedEchoes)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px)",
              cursor: "pointer",
              color: "#0891B2",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontVariant: "small-caps"
            }}>Real-World Echoes</span>
            {expandedEchoes
              ? <ChevronUp size={18} color="#0891B2" />
              : <ChevronDown size={18} color="#0891B2" />
            }
          </button>

          {expandedEchoes && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              borderTop: "1px solid rgba(8,145,178,0.12)"
            }}>
              {[
                {
                  title: "Rights and Dignity",
                  text: "When someone declares 'I am a rational person, worthy of respect,' the declaration alone is insufficient. It requires acknowledgment from other rational agents — legal recognition, institutional forms, social practices. The civil rights movement, feminist struggles, LGBTQ+ recognition movements: all are, at the philosophical level, battles for Anerkennung."
                },
                {
                  title: "Stoic Philosophers under Roman Slavery",
                  text: "Epictetus and Marcus Aurelius represent the Stoic response to failed recognition: retreat inward. 'My freedom is in my will; no master can touch it.' This achieves a real negative freedom, an independence from external fortune — but it abandons the claim to be recognized as free by others, producing a self that is, in Hegel's terms, abstract and contentless."
                },
                {
                  title: "Medieval Christian Devotion",
                  text: "The monk fasting, the saint performing mortification of the flesh, the believer projecting all value onto an infinite God: these practices represent the unhappy consciousness in historical form — the attempt to achieve recognition from an infinite transcendent source when finite human recognition has failed or been refused. The divine becomes the only mirror that matters."
                }
              ].map((echo, i) => (
                <div key={i} style={{
                  marginTop: "18px",
                  paddingLeft: "clamp(12px, 2vw, 18px)",
                  borderLeft: "2px solid rgba(8,145,178,0.3)"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#0891B2",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab4c0",
                    lineHeight: 1.7,
                    margin: 0
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default RecognitionStructure;