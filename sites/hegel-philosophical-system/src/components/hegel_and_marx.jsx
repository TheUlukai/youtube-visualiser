function HegelAndMarx() {
  const CORE_ARGUMENT = `Marx accepts Hegel's insight that human beings realize themselves through creative activity but argues that Hegel remains trapped in abstract philosophical speculation, failing to analyze the concrete material conditions that determine human life. Marx's alienated labor directly parallels the master-slave dialectic but locates alienation in capitalist property relations rather than pure consciousness: workers are separated from their products, their productive activity, their human essence, and each other. The dialectical development of capitalism — concentrating workers, generating crises, reducing the rate of profit — will produce the conditions for its own revolutionary overthrow. But Marx's critique is also that Hegelian philosophy is ideologically conservative, reconciling people to unjust conditions by presenting them as rational necessity rather than spurring practical transformation.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [isEchoesOpen, setIsEchoesOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const animRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const concepts = [
    {
      id: "alienation",
      label: "Alienation",
      hegel: "Spirit becomes estranged from itself when it externalizes itself in objective form, failing to recognize its own products as expressions of itself. This estrangement is a necessary stage in Spirit's self-realization — consciousness must pass through alienation to achieve genuine self-knowledge.",
      marx: "Workers are estranged from their products (owned by capital), from their productive activity (sold as labor-power), from their human essence (species-being reduced to mere survival), and from each other (competing in the labor market). Alienation is not a spiritual condition but a material one rooted in property relations."
    },
    {
      id: "dialectic",
      label: "Dialectic",
      hegel: "The dialectic is the self-movement of the Concept — Idea generates its own contradiction, works through the negation, and arrives at a higher synthesis that preserves and transforms the original. History is the logical unfolding of Spirit coming to know itself.",
      marx: "The dialectic is the self-movement of material contradictions — between forces and relations of production, between classes with opposing interests. Capitalism generates its own gravediggers by concentrating workers, creating crises, and reducing the rate of profit until revolutionary transformation becomes materially necessary."
    },
    {
      id: "recognition",
      label: "Recognition",
      hegel: "Self-consciousness requires recognition from another self-consciousness. The master-slave dialectic shows how unequal recognition produces unstable social relations — the slave's labor transforms the world while the master stagnates, eventually inverting the power relation through the slave's developed self-consciousness.",
      marx: "The master-slave dialectic maps directly onto capitalist class relations, but the inversion is not spiritual — it is material. Workers recognize their common interests through shared conditions in factories. Class consciousness emerges from material circumstances, not abstract philosophical reflection."
    },
    {
      id: "rational_kernel",
      label: "Rational Kernel",
      hegel: "What is rational is actual, and what is actual is rational — the existing social order contains within it the rational structure of Spirit's self-realization. Philosophy comprehends the present as rational necessity, reconciling us to historical actuality.",
      marx: "The 'rational kernel' in the Hegelian dialectic must be extracted from its 'mystical shell.' The dialectic's insight into contradiction and transformation is correct — but Hegel's idealism inverts the real relationship, making philosophy serve as ideological reconciliation to unjust conditions rather than a weapon for changing them."
    },
    {
      id: "commodity_fetishism",
      label: "Commodity Fetishism",
      hegel: "Consciousness in its alienated forms mistakes its own products for independent, self-subsistent realities. In Phenomenology, Spirit must work through these reified forms — religion, morality, law — recognizing them as its own creations before achieving genuine freedom.",
      marx: "Commodity fetishism is the economic form of this mystification: social relations between people appear as relations between things. The value of commodities seems to be a natural property of objects rather than crystallized human labor. This is not mere philosophical confusion but a real appearance generated by capitalist production itself."
    },
    {
      id: "revolutionary_practice",
      label: "Revolutionary Practice",
      hegel: "The Owl of Minerva flies at dusk — philosophy can only comprehend its epoch after it has passed. The philosopher reconciles thought to the rational structure already present in actuality. Transformation happens through conceptual recognition, not external intervention.",
      marx: "The 11th Thesis on Feuerbach: philosophers have only interpreted the world; the point is to change it. Theory must become practical — not merely comprehending contradictions but articulating the interests of the class whose material position makes it the agent of historical transformation. Praxis unites theory and practice."
    }
  ];

  const handleFlip = () => {
    if (animating) return;
    setAnimating(true);
    const start = Date.now();
    const duration = 900;
    const startProgress = isFlipped ? 1 : 0;
    const endProgress = isFlipped ? 0 : 1;

    const animate = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startProgress + (endProgress - startProgress) * eased;
      setFlipProgress(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsFlipped(!isFlipped);
        setAnimating(false);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
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

    let particles = [];
    let rafId;

    const init = () => {
      particles = [];
      for (let i = 0; i < 38; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.4,
          alpha: Math.random() * 0.25 + 0.05
        });
      }
    };
    init();

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#DC2626`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const p = flipProgress;
  const scaleY = Math.abs(Math.cos(p * Math.PI));
  const midFlip = p > 0.25 && p < 0.75;

  const hegelOpacity = midFlip ? 0 : (p < 0.5 ? 1 - p * 2 : 0);
  const marxOpacity = midFlip ? 0 : (p > 0.5 ? (p - 0.5) * 2 : 0);
  const showHegel = p < 0.5;
  const showMarx = p >= 0.5;

  const diagramOpacity = showHegel ? Math.max(0, 1 - p * 2.5) : Math.max(0, (p - 0.4) * 2.5);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 60% 20%, #3b0a0a 0%, #1a0505 40%, #0a0a0f 100%)",
        fontFamily: "Georgia, serif",
        padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
        overflowX: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.18em",
            color: "#DC2626",
            textTransform: "uppercase",
            marginBottom: "8px",
            opacity: 0.85
          }}>
            Part 15 of 20 — Hegel's Complete System
          </div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 42px)",
            color: "#f5e6e6",
            margin: "0 0 10px 0",
            fontWeight: "normal",
            letterSpacing: "-0.01em",
            lineHeight: 1.2
          }}>
            The Spectre of Materialism
          </h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#c9a8a8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontStyle: "italic"
          }}>
            Marx preserves the dialectical structure of Hegelian philosophy while inverting its foundations, grounding historical development in material productive forces rather than the development of consciousness.
          </p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{
          background: "rgba(30, 8, 8, 0.82)",
          border: "1px solid rgba(220, 38, 38, 0.25)",
          borderLeft: "4px solid #DC2626",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#DC2626",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>
            The Problem
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#e8d0d0",
            lineHeight: 1.75,
            margin: 0
          }}>
            Hegel's civil society analysis reveals deep tensions between market freedom and social solidarity — but does a purely philosophical-conceptual account of these tensions adequately grasp their material roots, or does it ideologically mystify them? When philosophy declares the actual to be rational, does it illuminate reality or provide intellectual cover for its injustices? The pressure of this question is nothing less than a demand to judge whether thinking can change the world, or only ever reconcile us to it.
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


        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(20, 5, 5, 0.75)",
          border: "1px solid rgba(220, 38, 38, 0.2)",
          borderRadius: "12px",
          padding: "clamp(16px, 3.5vw, 36px)",
          marginBottom: "clamp(20px, 4vw, 32px)"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "clamp(12px, 2.5vw, 24px)"
          }}>
            <h2 style={{
              fontSize: "clamp(15px, 2.2vw, 20px)",
              color: "#f0d8d8",
              margin: "0 0 8px 0",
              fontWeight: "normal",
              letterSpacing: "0.03em"
            }}>
              The Materialist Inversion
            </h2>
            <p style={{
              fontSize: "clamp(12px, 1.5vw, 13px)",
              color: "#a08080",
              margin: 0,
              fontStyle: "italic"
            }}>
              Flip the diagram to see Marx's inversion — then hover concepts below to compare formulations
            </p>
          </div>

          {/* Flip Diagram */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "clamp(16px, 3vw, 28px)"
          }}>
            <div style={{
              width: "100%",
              maxWidth: "500px",
              position: "relative"
            }}>
              <svg
                viewBox="0 0 500 320"
                width="100%"
                style={{
                  transform: `scaleY(${scaleY})`,
                  transformOrigin: "center center",
                  transition: animating ? "none" : "transform 0.1s"
                }}
              >
                {/* Background */}
                <rect width="500" height="320" fill="rgba(10,5,5,0.0)" />

                {showHegel ? (
                  <g opacity={diagramOpacity}>
                    {/* Hegel: Ideas on top, Matter below */}
                    {/* Top box: Ideas/Spirit */}
                    <rect x="80" y="20" width="340" height="90" rx="10"
                      fill="rgba(220,38,38,0.18)" stroke="#DC2626" strokeWidth="2" />
                    <text x="250" y="50" textAnchor="middle"
                      fill="#f5c6c6" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Ideas / Spirit / Consciousness
                    </text>
                    <text x="250" y="72" textAnchor="middle"
                      fill="#c89090" fontSize="12" fontFamily="Georgia, serif">
                      The Concept unfolds through its own logic
                    </text>
                    <text x="250" y="92" textAnchor="middle"
                      fill="#c89090" fontSize="11" fontFamily="Georgia, serif">
                      History = Spirit's self-realization
                    </text>

                    {/* Arrows downward */}
                    <line x1="200" y1="114" x2="200" y2="200" stroke="#DC2626" strokeWidth="2" strokeDasharray="6,4" />
                    <polygon points="200,205 195,195 205,195" fill="#DC2626" />
                    <line x1="300" y1="114" x2="300" y2="200" stroke="#DC2626" strokeWidth="2" strokeDasharray="6,4" />
                    <polygon points="300,205 295,195 305,195" fill="#DC2626" />
                    <text x="250" y="165" textAnchor="middle"
                      fill="#DC2626" fontSize="11" fontFamily="Georgia, serif">
                      determines
                    </text>

                    {/* Bottom box: Material Reality */}
                    <rect x="80" y="208" width="340" height="90" rx="10"
                      fill="rgba(80,20,20,0.35)" stroke="#7a3030" strokeWidth="1.5" />
                    <text x="250" y="238" textAnchor="middle"
                      fill="#b89090" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Material Reality / Nature
                    </text>
                    <text x="250" y="260" textAnchor="middle"
                      fill="#907070" fontSize="12" fontFamily="Georgia, serif">
                      The external, contingent domain
                    </text>
                    <text x="250" y="280" textAnchor="middle"
                      fill="#907070" fontSize="11" fontFamily="Georgia, serif">
                      Secondary expression of Idea
                    </text>

                    {/* Label */}
                    <text x="250" y="316" textAnchor="middle"
                      fill="#DC2626" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">
                      Hegel: Idealist
                    </text>
                  </g>
                ) : (
                  <g opacity={diagramOpacity}>
                    {/* Marx: Material Base on top (visually, since diagram is flipped), Superstructure below */}
                    {/* When diagram is flipped, bottom is now top */}
                    {/* Top box (was bottom): Material Base */}
                    <rect x="80" y="20" width="340" height="90" rx="10"
                      fill="rgba(180, 60, 60, 0.28)" stroke="#DC2626" strokeWidth="2.5" />
                    <text x="250" y="50" textAnchor="middle"
                      fill="#ffd0d0" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Material Base / Productive Forces
                    </text>
                    <text x="250" y="72" textAnchor="middle"
                      fill="#e0a0a0" fontSize="12" fontFamily="Georgia, serif">
                      Forces & relations of production
                    </text>
                    <text x="250" y="92" textAnchor="middle"
                      fill="#e0a0a0" fontSize="11" fontFamily="Georgia, serif">
                      Class struggle drives history
                    </text>

                    {/* Arrows upward — now the base determines superstructure */}
                    <line x1="200" y1="114" x2="200" y2="200" stroke="#ff6b6b" strokeWidth="2.5" />
                    <polygon points="200,205 195,195 205,195" fill="#ff6b6b" />
                    <line x1="300" y1="114" x2="300" y2="200" stroke="#ff6b6b" strokeWidth="2.5" />
                    <polygon points="300,205 295,195 305,195" fill="#ff6b6b" />
                    <text x="250" y="165" textAnchor="middle"
                      fill="#ff6b6b" fontSize="11" fontFamily="Georgia, serif">
                      generates
                    </text>

                    {/* Bottom box: Superstructure / Ideas */}
                    <rect x="80" y="208" width="340" height="90" rx="10"
                      fill="rgba(60, 20, 20, 0.5)" stroke="#7a2020" strokeWidth="1.5" />
                    <text x="250" y="238" textAnchor="middle"
                      fill="#c09090" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic">
                      Superstructure / Ideology
                    </text>
                    <text x="250" y="260" textAnchor="middle"
                      fill="#907070" fontSize="12" fontFamily="Georgia, serif">
                      Law, philosophy, religion, culture
                    </text>
                    <text x="250" y="280" textAnchor="middle"
                      fill="#907070" fontSize="11" fontFamily="Georgia, serif">
                      Reflects & legitimates material base
                    </text>

                    {/* Label */}
                    <text x="250" y="316" textAnchor="middle"
                      fill="#ff8080" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic">
                      Marx: Materialist
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Flip Button */}
            <button
              onClick={handleFlip}
              disabled={animating}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#DC2626";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(220,38,38,0.15)";
                e.currentTarget.style.color = "#f0c0c0";
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                marginTop: "clamp(8px, 2vw, 16px)",
                padding: "clamp(9px, 1.5vw, 13px) clamp(20px, 3.5vw, 36px)",
                background: "rgba(220,38,38,0.15)",
                border: "2px solid #DC2626",
                borderRadius: "30px",
                color: "#f0c0c0",
                fontSize: "clamp(12px, 1.6vw, 15px)",
                fontFamily: "Georgia, serif",
                cursor: animating ? "not-allowed" : "pointer",
                letterSpacing: "0.05em",
                transition: "background 0.25s, color 0.25s, transform 0.2s",
                opacity: animating ? 0.6 : 1
              }}
            >
              {isFlipped ? "⟳ Restore Hegel" : "⟲ Invert with Marx"}
            </button>
          </div>

          {/* Core Argument prose */}
          <div style={{
            marginTop: "clamp(20px, 3.5vw, 32px)",
            borderTop: "1px solid rgba(220,38,38,0.15)",
            paddingTop: "clamp(16px, 2.5vw, 24px)"
          }}>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#d0b0b0",
              lineHeight: 1.8,
              margin: "0 0 14px 0"
            }}>
              Marx accepts Hegel's deepest insight — that human beings realize themselves through creative activity — but argues Hegel remains trapped in abstract philosophical speculation. The master-slave dialectic, for Marx, is not a drama of pure consciousness but a structural analysis of class: the worker labors, transforms the world, and yet finds the product of that labor owned by another, confronting her as an alien power. Alienation is not a spiritual condition to be overcome through philosophical recognition; it is a material condition inscribed in property relations.
            </p>
            <p style={{
              fontSize: "clamp(13px, 1.7vw, 15px)",
              color: "#d0b0b0",
              lineHeight: 1.8,
              margin: 0
            }}>
              The dialectical development of capitalism — concentrating workers in factories where they recognize shared interests, generating periodic crises, and steadily reducing the rate of profit — produces the material conditions for its own revolutionary transformation. But Marx's critique cuts deeper: Hegelian philosophy, by presenting existing social arrangements as the rational expression of Spirit, performs an ideological function, reconciling people to unjust conditions rather than illuminating the material contradictions that could transform them.
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #DC262633",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#DC2626", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#DC2626" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#DC2626" : "#DC262655"}`,
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
          {hoveredConcept && (() => {
            const c = concepts.find(x => x.id === hoveredConcept);
            return c ? (
              <div style={{ marginTop: 4 }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: "clamp(10px, 2vw, 16px)",
                }}>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid #DC262644",
                    borderTop: "3px solid #a06060",
                    borderRadius: "6px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#a06060", marginBottom: "8px" }}>
                      Hegel — {c.label}
                    </div>
                    <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>{c.hegel}</p>
                  </div>
                  <div style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid #DC262644",
                    borderTop: "3px solid #DC2626",
                    borderRadius: "6px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#DC2626", marginBottom: "8px" }}>
                      Marx — {c.label}
                    </div>
                    <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>{c.marx}</p>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(25, 6, 6, 0.82)",
          border: "1px solid rgba(180, 60, 60, 0.2)",
          borderLeft: "4px solid #b03030",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b03030",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>
            The Difficulty
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.7vw, 15px)",
            color: "#e8d0d0",
            lineHeight: 1.75,
            margin: "0 0 12px 0"
          }}>
            If Hegelian philosophy is partially ideological — if conceptual accounts of social reality can function to mystify rather than illuminate the conditions they describe — then the question spreads beyond politics and economics. Can any purely philosophical account of art, beauty, or cultural achievement escape similar charges? When Hegel declares that great art manifests Absolute Spirit in sensuous form, is he comprehending genuine human achievement or aestheticizing the products of conditions we should be transforming? The materialist suspicion, once introduced, colonizes every domain of philosophical inquiry.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: "#a07070",
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic"
          }}>
            This pressure forces the next development: whether aesthetic theory can be grounded in anything beyond ideology — whether beauty itself might be the one domain where material conditions do not fully determine the meaning of human creation.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(20, 5, 5, 0.75)",
          border: "1px solid rgba(220, 38, 38, 0.18)",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setIsEchoesOpen(!isEchoesOpen)}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#DC2626",
              fontFamily: "Georgia, serif",
              fontWeight: "bold"
            }}>
              Real-World Echoes
            </span>
            {isEchoesOpen
              ? <ChevronUp size={18} color="#DC2626" />
              : <ChevronDown size={18} color="#DC2626" />
            }
          </button>

          {isEchoesOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)"
            }}>
              {[
                {
                  title: "Revolutionary Movements",
                  text: "The Russian, Chinese, and Cuban revolutionary movements explicitly drew on the Marxist-Hegelian historical dialectic — using the theory of contradictions within capitalism to time and justify political transformation. Mao's essay 'On Contradiction' is a direct engagement with Hegelian-Marxist dialectical logic applied to concrete historical conditions."
                },
                {
                  title: "Factory Concentration and Class Consciousness",
                  text: "Marx's prediction that concentrating workers in large industrial enterprises would generate class consciousness played out in the formation of trade unions and workers' parties. Shared conditions of labor — identical wages, identical hours, identical exposure to industrial hazards — created exactly the recognition of common interest that Marx derived from his inversion of Hegel's master-slave dialectic."
                },
                {
                  title: "Commodity Fetishism Today",
                  text: "Capital's analysis of commodity fetishism — social relations between people appearing as relations between things — finds its contemporary form in brand culture, financial derivatives, and algorithmic pricing, where the social labor producing value becomes invisible behind the spectacle of commodities. This directly parallels Hegel's account of consciousness mistaking its own products for independent, self-subsistent realities."
                },
                {
                  title: "The 11th Thesis in Practice",
                  text: "'The point is not to interpret the world but to change it' became the founding slogan of activist philosophy, from Frankfurt School critical theory to liberation theology to contemporary social movements. The tension between interpretation and transformation — between understanding conditions and mobilizing to change them — remains the central problem of politically engaged thought."
                }
              ].map((item, i) => (
                <div key={i} style={{
                  borderLeft: "2px solid rgba(220,38,38,0.35)",
                  paddingLeft: "clamp(12px, 2vw, 18px)",
                  marginBottom: i < 3 ? "clamp(14px, 2.5vw, 20px)" : 0
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    color: "#DC2626",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>
                    {item.title}
                  </div>
                  <p style={{
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    color: "#c8a8a8",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(20px, 4vw, 36px)",
          paddingBottom: "clamp(12px, 2vw, 20px)"
        }}>
          <span style={{
            fontSize: "clamp(10px, 1.3vw, 12px)",
            color: "#6a3030",
            letterSpacing: "0.1em"
          }}>
            ◆ Next: Absolute Spirit in Aesthetic Form ◆
          </span>
        </div>

      </div>
    </div>
  );
}

export default HegelAndMarx;