function DialecticalMethod() {
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [animatingArc, setAnimatingArc] = useState(null);
  const [arcProgress, setArcProgress] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [activeExample, setActiveExample] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredExample, setHoveredExample] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);
  const arcRef = useRef(null);

  const accent = "#B91C1C";

  const keyConcepts = [
    { id: "dialectic", label: "Dialectic", desc: "Dialectic is not a method applied to a pre-existing subject matter but the inherent movement of thought and reality themselves. Every finite determination contains an internal contradiction — a tension between what it claims to be and what it actually is — and this tension drives thought forward to richer, more concrete determinations. Hegel rehabilitates the ancient art of dialectic as the logic of all rational development." },
    { id: "aufhebung", label: "Sublation (Aufhebung)", desc: "Aufhebung is Hegel's master concept, exploiting the German word's three meanings simultaneously: to cancel, to preserve, and to elevate. The dialectical resolution of a contradiction does not simply destroy the opposing terms but lifts them into a higher unity that contains them as subordinate moments. Nothing is lost; everything is transformed." },
    { id: "contradiction_productive", label: "Contradiction as Productive", desc: "Against the traditional logical law of non-contradiction, Hegel argues that contradiction is not a sign of error but the engine of development. Things actually contain contradictions — finite things are both what they are and conditioned by what they are not — and it is precisely this internal tension that drives them to develop, change, and deepen. Contradiction is the root of all movement and vitality." },
    { id: "self_moving_concept", label: "Self-Moving Concept", desc: "The concept (Begriff) is not static but self-moving — it generates its own content through internal development rather than receiving it from an external source. This is what distinguishes Hegel from Kant: Kant's categories are fixed forms imposed on an alien matter, while Hegel's categories develop from one another through their own immanent logic." },
    { id: "negation", label: "Negation", desc: "Negation is not merely the logical operation of denial but the positive force by which each stage of thought transcends itself. Determinate negation — negation that has content — is the key: when a concept negates itself, what emerges is not mere emptiness but a specific new determination. 'The negative is itself something positive,' as Hegel puts it." },
    { id: "totality", label: "Totality", desc: "Truth is the whole — no partial determination, isolated from its relations to everything else, can express what is genuinely real. The totality is not the sum of its parts but the self-differentiating unity that generates its parts as its own moments and returns to itself through them. This is why philosophy must be a system: only in the system does each part receive its proper meaning." },
  ];

  const circleData = {
    being: {
      id: "being",
      label: "Being",
      x: 50,
      y: 28,
      color: "#B91C1C",
      definition: "Pure, immediate, indeterminate presence — the simplest thought, utterly empty of content. To say something 'is' without any further qualification.",
      concept: "Thesis"
    },
    nothing: {
      id: "nothing",
      label: "Nothing",
      x: 20,
      y: 72,
      color: "#7f1d1d",
      definition: "Pure absence, void, the complete negation of being. Yet to think Nothing is still to think — it has the same emptiness as Being.",
      concept: "Antithesis"
    },
    becoming: {
      id: "becoming",
      label: "Becoming",
      x: 80,
      y: 72,
      color: "#dc2626",
      definition: "The unity in which Being passes into Nothing and Nothing passes into Being — the first concrete thought, the movement itself. Aufhebung in action.",
      concept: "Synthesis (Aufhebung)"
    }
  };

  const examples = [
    {
      label: "Seed → Plant",
      stages: ["Seed", "Negation of Seed", "Plant"],
      descriptions: [
        "The seed exists in pure potential — it is, yet contains within itself the drive to cease being a seed.",
        "The seed negates itself, dissolving its form, seemingly destroyed in darkness and soil.",
        "Aufhebung: the seed is cancelled, preserved, and elevated — its substance lives on transformed as the plant."
      ],
      icon: "🌱"
    },
    {
      label: "Autocracy → State",
      stages: ["Empire", "Revolt", "Modern State"],
      descriptions: [
        "Ancient empires unify people under absolute authority — pure collective order, individual will absorbed.",
        "Individual liberties assert themselves against collective domination — particularity rebels against universality.",
        "The modern constitutional state sublates both: universal law that recognizes individual rights, neither pure empire nor pure anarchy."
      ],
      icon: "⚖️"
    },
    {
      label: "Tech → Policy",
      stages: ["Innovation", "Crisis", "Governance"],
      descriptions: [
        "Rapid technological advancement — pure forward motion, the drive to connect, automate, and transform society.",
        "Privacy erosion, job displacement, algorithmic injustice — the contradictions latent in innovation become acute.",
        "Socially conscious tech policy: innovation preserved but bounded, rights recognized, the synthesis still unfolding."
      ],
      icon: "💻"
    }
  ];

  const currentExample = examples[activeExample];
  const activeStage = Math.min(Math.floor(sliderValue / 34), 2);

  const triggerArcAnimation = (fromId, toId) => {
    if (arcRef.current) cancelAnimationFrame(arcRef.current);
    setAnimatingArc({ from: fromId, to: toId });
    setArcProgress(0);
    const start = performance.now();
    const duration = 900;
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setArcProgress(t);
      if (t < 1) {
        arcRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (fromId === "being" && toId === "nothing") {
            triggerArcAnimation("nothing", "becoming");
          } else if (fromId === "nothing" && toId === "becoming") {
            triggerArcAnimation("being", "becoming");
          } else {
            setAnimatingArc(null);
            setArcProgress(0);
          }
        }, 200);
      }
    };
    arcRef.current = requestAnimationFrame(animate);
  };

  const handleCircleClick = (id) => {
    setActiveCircle(activeCircle === id ? null : id);
    if (id === "being") {
      triggerArcAnimation("being", "nothing");
    } else if (id === "nothing") {
      triggerArcAnimation("nothing", "becoming");
    } else if (id === "becoming") {
      triggerArcAnimation("being", "becoming");
    }
  };

  useEffect(() => {
    return () => {
      if (arcRef.current) cancelAnimationFrame(arcRef.current);
    };
  }, []);

  const getArcPath = (fromKey, toKey) => {
    const from = circleData[fromKey];
    const to = circleData[toKey];
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.3;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.3;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  const getPointOnPath = (fromKey, toKey, t) => {
    const from = circleData[fromKey];
    const to = circleData[toKey];
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.3;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.3;
    const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
    const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
    return { x, y };
  };

  const selectedCircle = activeCircle ? circleData[activeCircle] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 20%, #450a0a 0%, #1a0505 40%, #0a0a0f 100%)",
      fontFamily: "Georgia, serif",
      color: "#f5f0eb",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(24px, 4vw, 40px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#B91C1C",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 1 of 20 — Hegel's System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            fontWeight: "normal",
            margin: "0 0 8px 0",
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2
          }}>The Revolutionary Method</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 17px)",
            color: "#c9a89a",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5
          }}>Hegel's dialectic reframes contradiction not as a logical failure but as the engine driving both thought and reality forward.</p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(185,28,28,0.3)",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(10px, 1.3vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B91C1C",
            marginBottom: "clamp(10px, 2vw, 18px)"
          }}>The Dialectical Trinity</div>

          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#c9a89a",
            lineHeight: 1.7,
            marginBottom: "clamp(12px, 2vw, 20px)",
            margin: "0 0 clamp(12px, 2vw, 20px) 0"
          }}>
            Click any concept to set it in motion. Watch how Being passes into Nothing, and how both are absorbed — cancelled, preserved, elevated — into Becoming.
          </p>

          {/* SVG Diagram */}
          <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <svg viewBox="0 0 100 105" width="100%" style={{ overflow: "visible", display: "block" }}>
              <defs>
                <radialGradient id="glowBeing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B91C1C" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowNothing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowBecoming" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#B91C1C" opacity="0.8" />
                </marker>
              </defs>

              {/* Static arcs */}
              {[["being","nothing"],["nothing","becoming"],["being","becoming"]].map(([a,b]) => (
                <path
                  key={`${a}-${b}`}
                  d={getArcPath(a, b)}
                  fill="none"
                  stroke="rgba(185,28,28,0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                />
              ))}

              {/* Animated arc */}
              {animatingArc && (() => {
                const pts = [];
                for (let i = 0; i <= 30; i++) {
                  const t = (i / 30) * arcProgress;
                  const p = getPointOnPath(animatingArc.from, animatingArc.to, t);
                  pts.push(`${p.x},${p.y}`);
                }
                const dot = getPointOnPath(animatingArc.from, animatingArc.to, arcProgress);
                return (
                  <g>
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke="#B91C1C"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <circle cx={dot.x} cy={dot.y} r="1.5" fill="#fff" opacity="0.9" />
                    <circle cx={dot.x} cy={dot.y} r="3" fill="#B91C1C" opacity="0.3" />
                  </g>
                );
              })()}

              {/* Circles */}
              {Object.values(circleData).map((c) => {
                const isHovered = hoveredCircle === c.id;
                const isActive = activeCircle === c.id;
                const r = 10;
                return (
                  <g
                    key={c.id}
                    transform={`translate(${c.x}, ${c.y})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCircleClick(c.id)}
                    onMouseEnter={() => setHoveredCircle(c.id)}
                    onMouseLeave={() => setHoveredCircle(null)}
                  >
                    {(isHovered || isActive) && (
                      <circle r={r + 5} fill={c.color} opacity="0.15" />
                    )}
                    <circle
                      r={r}
                      fill={isActive ? c.color : "rgba(15,5,5,0.85)"}
                      stroke={c.color}
                      strokeWidth={isActive ? "1.5" : "1"}
                      opacity="1"
                    />
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fontSize="3.8"
                      fontFamily="Georgia, serif"
                      fill={isActive ? "#fff" : c.color}
                      fontWeight="bold"
                    >{c.label}</text>
                    <text
                      textAnchor="middle"
                      dy="4.8em"
                      fontSize="2.5"
                      fontFamily="Georgia, serif"
                      fill="rgba(201,168,154,0.7)"
                      fontStyle="italic"
                    >{c.concept}</text>
                  </g>
                );
              })}

              {/* Aufhebung label in center */}
              <text x="50" y="55" textAnchor="middle" fontSize="2.8" fontFamily="Georgia, serif" fill="rgba(185,28,28,0.5)" fontStyle="italic">Aufhebung</text>
              <text x="50" y="59" textAnchor="middle" fontSize="2" fontFamily="Georgia, serif" fill="rgba(185,28,28,0.35)">cancel · preserve · elevate</text>
            </svg>
          </div>

          {/* Info panel for active circle */}
          <div style={{
            minHeight: "80px",
            background: selectedCircle ? "rgba(185,28,28,0.08)" : "transparent",
            border: selectedCircle ? "1px solid rgba(185,28,28,0.25)" : "1px solid transparent",
            borderRadius: "8px",
            padding: selectedCircle ? "clamp(12px, 2vw, 18px)" : "0",
            marginTop: "clamp(8px, 2vw, 16px)",
            transition: "all 0.3s ease"
          }}>
            {selectedCircle ? (
              <>
                <div style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  color: selectedCircle.color,
                  fontWeight: "bold",
                  marginBottom: "6px"
                }}>{selectedCircle.label} — {selectedCircle.concept}</div>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  color: "#e8d5ce",
                  lineHeight: 1.7,
                  margin: 0
                }}>{selectedCircle.definition}</p>
              </>
            ) : (
              <p style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "rgba(201,168,154,0.5)",
                textAlign: "center",
                fontStyle: "italic",
                margin: "clamp(12px, 2vw, 18px) 0"
              }}>Click a circle to reveal its meaning and watch the dialectical movement unfold...</p>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(185,28,28,0.15)", margin: "clamp(16px, 3vw, 28px) 0" }} />

          {/* Slider Examples */}
          <div style={{
            fontSize: "clamp(10px, 1.3vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#B91C1C",
            marginBottom: "clamp(8px, 1.5vw, 14px)"
          }}>Drag the Dialectic — Real-World Examples</div>

          {/* Example selector */}
          <div style={{
            display: "flex",
            gap: "clamp(6px, 1.5vw, 12px)",
            marginBottom: "clamp(12px, 2vw, 20px)",
            flexWrap: "wrap"
          }}>
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setActiveExample(i); setSliderValue(0); }}
                onMouseEnter={() => setHoveredExample(i)}
                onMouseLeave={() => setHoveredExample(null)}
                style={{
                  background: activeExample === i ? "rgba(185,28,28,0.3)" : "rgba(255,255,255,0.04)",
                  border: activeExample === i ? "1px solid #B91C1C" : "1px solid rgba(185,28,28,0.2)",
                  borderRadius: "6px",
                  padding: "6px clamp(10px, 2vw, 16px)",
                  color: activeExample === i ? "#fff" : "#c9a89a",
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                  boxShadow: (hoveredExample === i || activeExample === i) ? "0 0 10px rgba(185,28,28,0.3)" : "none"
                }}
              >{ex.icon} {ex.label}</button>
            ))}
          </div>

          {/* Stage display */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            gap: "clamp(4px, 1vw, 8px)"
          }}>
            {currentExample.stages.map((stage, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: "center",
                padding: "clamp(8px, 1.5vw, 12px) clamp(4px, 1vw, 8px)",
                background: activeStage === i ? "rgba(185,28,28,0.25)" : "rgba(255,255,255,0.03)",
                border: activeStage === i ? "1px solid #B91C1C" : "1px solid rgba(185,28,28,0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                boxShadow: activeStage === i ? "0 0 16px rgba(185,28,28,0.3)" : "none"
              }}>
                <div style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  color: activeStage === i ? "#B91C1C" : "rgba(185,28,28,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "4px"
                }}>{i === 0 ? "Thesis" : i === 1 ? "Antithesis" : "Synthesis"}</div>
                <div style={{
                  fontSize: "clamp(11px, 1.6vw, 14px)",
                  color: activeStage === i ? "#fff" : "#888",
                  fontWeight: activeStage === i ? "bold" : "normal",
                  transition: "all 0.3s"
                }}>{stage}</div>
              </div>
            ))}
          </div>

          {/* Slider */}
          <div style={{ position: "relative", margin: "clamp(8px, 1.5vw, 14px) 0" }}>
            <input
              type="range"
              min={0}
              max={99}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{
                width: "100%",
                cursor: "pointer",
                accentColor: "#B91C1C",
                height: "4px"
              }}
            />
          </div>

          {/* Stage description */}
          <div style={{
            background: "rgba(185,28,28,0.06)",
            border: "1px solid rgba(185,28,28,0.15)",
            borderLeft: "3px solid #B91C1C",
            borderRadius: "0 6px 6px 0",
            padding: "clamp(10px, 2vw, 16px)",
            minHeight: "60px"
          }}>
            <p style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#e8d5ce",
              lineHeight: 1.75,
              margin: 0,
              fontStyle: "italic"
            }}>
              {currentExample.descriptions[activeStage]}
            </p>
          </div>

          {/* Core argument prose */}
          <div style={{ marginTop: "clamp(16px, 3vw, 28px)" }}>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#c9a89a",
              lineHeight: 1.8,
              margin: "0 0 12px 0"
            }}>
              Traditional logic treats contradiction as a fatal error to be eliminated. Hegel inverts this entirely: contradictions are the very force that moves thinking and reality toward higher unities.
            </p>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#c9a89a",
              lineHeight: 1.8,
              margin: 0
            }}>
              Every concept contains within itself its own opposition. The resolution of that tension — <em style={{ color: "#e8d5ce" }}>Aufhebung</em> — simultaneously cancels, preserves, and elevates. This movement is not imposed from outside but flows from the inner nature of the content itself. Truth, therefore, is not found in isolated propositions but only in the complete, self-developing totality.
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

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(127,29,29,0.35)",
          borderLeft: "3px solid #7f1d1d",
          borderRadius: "0 10px 10px 0",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(12px, 2.5vw, 22px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 10px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9a3232",
            marginBottom: "clamp(8px, 1.5vw, 14px)"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#c9a89a",
            lineHeight: 1.8,
            margin: "0 0 10px 0"
          }}>
            If reality and thought both develop through internal contradiction — if everything carries within it the seed of its own negation — then we face a vertiginous question: can any individual mind actually know anything at all? Is consciousness itself trapped in contradiction, forever reaching for truths it cannot hold?
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#c9a89a",
            lineHeight: 1.8,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: we need a new account of how consciousness itself develops through these very contradictions — the journey Hegel calls the Phenomenology of Spirit.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(185,28,28,0.2)",
          borderRadius: "10px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px, 2vw, 20px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 10px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B91C1C"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#B91C1C" />
              : <ChevronDown size={16} color="#B91C1C" />}
          </button>

          {echosOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)" }}>
              {examples.map((ex, i) => (
                <div key={i} style={{
                  marginBottom: i < examples.length - 1 ? "clamp(12px, 2vw, 18px)" : 0,
                  paddingBottom: i < examples.length - 1 ? "clamp(12px, 2vw, 18px)" : 0,
                  borderBottom: i < examples.length - 1 ? "1px solid rgba(185,28,28,0.1)" : "none"
                }}>
                  <div style={{
                    fontSize: "clamp(13px, 1.7vw, 15px)",
                    color: "#e8d5ce",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <span>{ex.icon}</span>
                    <span style={{ fontWeight: "bold" }}>{ex.label}</span>
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#c9a89a",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {ex.descriptions[0]} Then: {ex.descriptions[1].toLowerCase()} Finally: {ex.descriptions[2].toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default DialecticalMethod;