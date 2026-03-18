function KantCritique() {
  const [activeWall, setActiveWall] = useState(null);
  const [activeMerge, setActiveMerge] = useState(null);
  const [hoveredWall, setHoveredWall] = useState(false);
  const [hoveredMerge, setHoveredMerge] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [activeConceptIdx, setActiveConceptIdx] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  const concepts = [
    { label: "Copernican Revolution", short: "Objects conform to cognition", detail: "Kant's decisive insight: the mind is not a passive mirror of reality but actively constitutes experience through its own forms. Yet this raises the question: what about the reality behind those forms?" },
    { label: "Phenomena / Noumena", short: "The knowable vs. the unknowable", detail: "Phenomena are appearances structured by our cognitive forms. Noumena — things-in-themselves — lie forever beyond reach. But Hegel asks: how can we speak meaningfully of what is, by definition, beyond all speech?" },
    { label: "Categories of Understanding", short: "The mind's constitutive forms", detail: "Kant's twelve categories (causality, substance, etc.) make experience possible. Hegel agrees but insists they are not merely subjective: they are the logical skeleton of reality itself." },
    { label: "Categorical Imperative", short: "Duty without content", detail: "Act only on maxims you can universalize. Formally powerful, but silent on which duties to pursue or how to order social life. The empty formalism of 'do your duty' cannot generate a living ethical world." },
    { label: "Dualism of Form/Content", short: "The split Hegel must heal", detail: "Kant separates the form mind imposes from the content given from outside. For Hegel, this separation is itself a product of thought — which means thought can overcome it from within." },
    { label: "Speculative Idealism", short: "Hegel's solution", detail: "Reality is not alien to thought; it is thought's own self-development. The categories are not our subjective impositions but the objective structure of being itself — and so genuine systematic knowledge is possible." },
  ];

  const keyConcepts = [
    { id: "copernican_revolution", label: "Copernican Revolution in Philosophy", desc: "Kant's decisive insight is that experience is possible only because the mind actively constitutes it through its own forms — objects must conform to our cognition, not our cognition to objects. This inverts the naive view that knowledge is passive reception. But it raises the question Hegel presses: if the mind's forms structure everything we can know, what is the status of the thing-in-itself that supposedly exists behind those forms?" },
    { id: "phenomena_noumena", label: "Phenomena vs. Things-in-Themselves", desc: "Kant splits reality into phenomena (appearances structured by our cognitive forms, which we can know) and things-in-themselves (the reality behind appearances, which forever lies beyond knowledge). Hegel's objection: we cannot coherently speak of what is, by definition, beyond all speech. The thing-in-itself is a self-contradictory notion — it is posited as causing our sensations, but causality is itself a category Kant says applies only to phenomena." },
    { id: "categories_of_understanding", label: "Categories of Understanding", desc: "Kant's twelve categories (causality, substance, necessity, etc.) are the a priori forms that make experience possible — without them, sensory data would be a formless manifold. Hegel agrees that categories are not derived from experience. But he insists they are not merely our subjective cognitive equipment: they are the objective logical structure of reality itself, which is why genuine scientific knowledge of the world is possible." },
    { id: "categorical_imperative", label: "Kant's Moral Philosophy / Categorical Imperative", desc: "Act only according to maxims you could universalize without contradiction — this is Kant's categorical imperative, the supreme principle of morality derived from pure practical reason alone, independent of all inclination or consequence. Hegel finds this formally powerful but materially empty: the universalizability test cannot generate specific obligations or order social life. The 'ought' floats free of any determinate ethical content." },
    { id: "dualism_form_content", label: "Dualism of Form and Content", desc: "Kant's entire philosophy rests on a strict separation between form (supplied by the mind: the pure intuitions of space and time, the categories of understanding) and content (given from outside through sensory affection). For Hegel, this dualism is itself a product of thought — thought has drawn this distinction within itself. This means thought is capable of overcoming the dualism from within, which is exactly what speculative idealism proposes." },
    { id: "speculative_idealism", label: "Speculative Idealism", desc: "Hegel's speculative idealism dissolves Kant's dualism by eliminating the thing-in-itself entirely: reality is not alien to thought but is thought's own self-development. The categories of the Logic are not our subjective impositions on a resistant given but the objective structure of being itself — the same structure that unfolds in nature and returns to itself in Spirit. Genuine, systematic knowledge of reality is therefore possible." },
  ];

  const wallObjDetails = [
    { id: "thing-itself", label: "The Thing-in-Itself", text: "Hegel's objection: Kant posits the thing-in-itself as causing our sensory affections while simultaneously declaring it unknowable. But causality is itself a category of understanding — one Kant says applies only to phenomena. To use 'cause' to describe what lies beyond phenomena is a performative contradiction that collapses on its own terms." },
    { id: "formal-ethics", label: "Formal Ethics", text: "Kant's categorical imperative requires universalizability but cannot tell us what to universalize. Contradictory maxims can each pass the universalizability test. The moral law is an empty formalism — the 'ought' floats free of any determinate content, leaving ethical life ungrounded." },
    { id: "subjective-category", label: "Subjective Categories", text: "If categories merely belong to the subjective mind and impose structure on an alien content, then science describes only our cognitive habits, not reality. Yet Kant simultaneously wants Newtonian physics to have objective validity. This tension between subjective form and objective claim is irresolvable within Kant's own framework." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const setSize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight || 220;
    };
    setSize();

    const observer = new ResizeObserver(setSize);
    observer.observe(parent);

    const ctx = canvas.getContext("2d");
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;

      // Draw two spiraling currents merging
      for (let stream = 0; stream < 2; stream++) {
        const sign = stream === 0 ? 1 : -1;
        ctx.beginPath();
        for (let i = 0; i < 300; i++) {
          const frac = i / 299;
          const angle = frac * Math.PI * 6 + sign * Math.PI / 2 + t * 0.5;
          const radius = maxR * frac * 0.5;
          const spiralX = cx + radius * Math.cos(angle);
          const spiralY = cy + radius * Math.sin(angle) * 0.55;
          if (i === 0) ctx.moveTo(spiralX, spiralY);
          else ctx.lineTo(spiralX, spiralY);
        }
        const grad = ctx.createLinearGradient(cx - maxR * 0.5, 0, cx + maxR * 0.5, 0);
        if (stream === 0) {
          grad.addColorStop(0, "#1e3a5f44");
          grad.addColorStop(0.5, "#3b82f6aa");
          grad.addColorStop(1, "#7c3aed88");
        } else {
          grad.addColorStop(0, "#44337a44");
          grad.addColorStop(0.5, "#9333eaaa");
          grad.addColorStop(1, "#475569aa");
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Pulsing center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.18);
      glow.addColorStop(0, "#475569cc");
      glow.addColorStop(0.4, "#47556944");
      glow.addColorStop(1, "#00000000");
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.18 + Math.sin(t * 2) * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Floating particles along the streams
      for (let p = 0; p < 12; p++) {
        const pFrac = ((p / 12) + t * 0.03) % 1;
        const sign = p % 2 === 0 ? 1 : -1;
        const angle = pFrac * Math.PI * 6 + sign * Math.PI / 2 + t * 0.5;
        const radius = maxR * pFrac * 0.5;
        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle) * 0.55;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? "#3b82f6cc" : "#9333eacc";
        ctx.fill();
      }

      t += 0.018;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, []);

  const accent = "#475569";
  const darkBg = "#0d1117";
  const cardBg = "#111827ee";
  const borderColor = "#1e293b";

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 40% 30%, #1a2535 0%, #0a0a0f 80%)",
      fontFamily: "Georgia, serif",
      color: "#cbd5e1",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "8px",
          }}>Part 12 of 20 — Hegel's Complete System</div>
          <h1 style={{
            fontSize: "clamp(20px, 3.5vw, 34px)",
            color: "#f1f5f9",
            margin: "0 0 8px 0",
            lineHeight: 1.25,
            fontWeight: "normal",
          }}>The Kantian Revolution and Its Limits</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#94a3b8",
            margin: 0,
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>Hegel sees himself as completing Kant's Copernican revolution by eliminating the dualisms that prevent Kant from achieving genuine systematic knowledge.</p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderLeft: `4px solid ${accent}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            margin: 0,
            color: "#e2e8f0",
          }}>
            The drive for recognition requires intersubjective institutions, but the philosophical framework for understanding how thought relates to reality needs to be clarified — Kant attempted this, but did he succeed? At the cusp of modernity, we need to know whether the categories through which we grasp the world are our own subjective impositions or whether they genuinely disclose what is real. Without an answer, every claim to knowledge — scientific, moral, political — trembles on uncertain ground.
          </p>
        </div>

        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <h2 style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#f1f5f9",
            margin: "0 0 20px 0",
            fontWeight: "normal",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}>Two Architectures of Knowledge</h2>

          {/* Split Diagram: Kant vs Hegel */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}>
            {/* Kant's System */}
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#94a3b8",
                textAlign: "center",
                marginBottom: "8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>Kant's System</div>
              <svg viewBox="0 0 300 220" width="100%" style={{ display: "block", maxWidth: "100%" }}>
                {/* Background rooms */}
                <rect x="4" y="20" width="128" height="176" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                <rect x="168" y="20" width="128" height="176" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />

                {/* Room labels */}
                <text x="68" y="50" textAnchor="middle" fill="#60a5fa" fontSize="11" fontFamily="Georgia, serif">Phenomena</text>
                <text x="68" y="64" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">(Knowable)</text>
                <text x="232" y="50" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Georgia, serif">Noumena</text>
                <text x="232" y="64" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="Georgia, serif">(Unknowable)</text>

                {/* Icons in rooms */}
                <circle cx="68" cy="110" r="22" fill="#1d4ed822" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="68" y="116" textAnchor="middle" fill="#60a5fa" fontSize="16">⚙</text>

                <circle cx="232" cy="110" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="232" y="116" textAnchor="middle" fill="#334155" fontSize="16">?</text>

                {/* The Wall */}
                <rect x="136" y="14" width="28" height="194" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="150" y="115" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif" transform="rotate(-90 150 115)">WALL</text>

                {/* Clickable wall zones */}
                {wallObjDetails.map((w, i) => {
                  const yPos = 35 + i * 60;
                  const isActive = activeWall === w.id;
                  const isHov = hoveredWall === w.id;
                  return (
                    <g key={w.id}
                      onClick={() => setActiveWall(isActive ? null : w.id)}
                      onMouseEnter={() => setHoveredWall(w.id)}
                      onMouseLeave={() => setHoveredWall(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle cx="150" cy={yPos} r={isActive || isHov ? 9 : 7}
                        fill={isActive ? "#7c3aed" : isHov ? "#475569" : "#1e293b"}
                        stroke={isActive ? "#a78bfa" : "#475569"} strokeWidth="1.5" />
                      <text x="150" y={yPos + 4} textAnchor="middle" fill="#f1f5f9" fontSize="8">✕</text>
                    </g>
                  );
                })}

                {/* Arrow trying to cross */}
                <path d="M 100 155 Q 130 145 140 155" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
                <polygon points="140,151 148,155 140,159" fill="#f59e0b" opacity="0.7" />
                <text x="80" y="178" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="Georgia, serif">Can we cross?</text>

                <text x="150" y="215" textAnchor="middle" fill="#334155" fontSize="8" fontFamily="Georgia, serif">Click the ✕ marks on the wall</text>
              </svg>
            </div>

            {/* Hegel's System */}
            <div style={{ position: "relative" }}>
              <div style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#94a3b8",
                textAlign: "center",
                marginBottom: "8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>Hegel's System</div>
              <div style={{ position: "relative", width: "100%", paddingBottom: "73%" }}>
                <canvas ref={canvasRef} style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  background: "#0d1117",
                  border: "1px solid #1e293b",
                }} />
                {/* Overlay labels */}
                <div
                  onClick={() => setActiveMerge(activeMerge === "thought" ? null : "thought")}
                  onMouseEnter={() => setHoveredMerge("thought")}
                  onMouseLeave={() => setHoveredMerge(null)}
                  style={{
                    position: "absolute", top: "12%", left: "8%",
                    background: hoveredMerge === "thought" || activeMerge === "thought" ? "#1d4ed866" : "#0d111788",
                    border: `1px solid ${hoveredMerge === "thought" || activeMerge === "thought" ? "#3b82f6" : "#1e293b"}`,
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    color: "#93c5fd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>Thought</div>
                <div
                  onClick={() => setActiveMerge(activeMerge === "being" ? null : "being")}
                  onMouseEnter={() => setHoveredMerge("being")}
                  onMouseLeave={() => setHoveredMerge(null)}
                  style={{
                    position: "absolute", bottom: "12%", right: "8%",
                    background: hoveredMerge === "being" || activeMerge === "being" ? "#44337a66" : "#0d111788",
                    border: `1px solid ${hoveredMerge === "being" || activeMerge === "being" ? "#9333ea" : "#1e293b"}`,
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    color: "#c4b5fd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>Being</div>
                <div style={{
                  position: "absolute", bottom: "4%", left: "50%", transform: "translateX(-50%)",
                  fontSize: "clamp(8px, 1.2vw, 10px)",
                  color: "#334155",
                  whiteSpace: "nowrap",
                }}>Click labels to explore</div>
              </div>
            </div>
          </div>

          {/* Wall objection panel */}
          {activeWall && (() => {
            const w = wallObjDetails.find(x => x.id === activeWall);
            return (
              <div style={{
                background: "#1a0a2e",
                border: "1px solid #7c3aed",
                borderRadius: "8px",
                padding: "16px 20px",
                marginBottom: "16px",
                animation: "none",
              }}>
                <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#a78bfa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Hegel's Objection: {w.label}</div>
                <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>{w.text}</p>
              </div>
            );
          })()}

          {/* Merge panel */}
          {activeMerge && (
            <div style={{
              background: "#0f0a1e",
              border: "1px solid #3b82f6",
              borderRadius: "8px",
              padding: "16px 20px",
              marginBottom: "16px",
            }}>
              {activeMerge === "thought" && (
                <>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#93c5fd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Thought — the active current</div>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>For Hegel, thought is not a passive receptacle but the self-moving activity by which reality becomes determinate and knowable. The categories of logic are not our subjective impositions — they are the forms through which being articulates itself. Thought thinking itself just is being becoming self-aware.</p>
                </>
              )}
              {activeMerge === "being" && (
                <>
                  <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", color: "#c4b5fd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Being — the other current</div>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 1.7vw, 14px)", lineHeight: 1.7, color: "#e2e8f0" }}>Being, stripped of all determination, is indistinguishable from pure nothing — and this very indeterminacy sets thought in motion. Rather than a brute alien 'given' that imposes itself from outside, being is the concrete totality of all determinate relations that thought has made explicit. The wall between knower and known dissolves.</p>
                </>
              )}
            </div>
          )}

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            borderTop: "1px solid #1e293b",
            paddingTop: "20px",
          }}>
            <p style={{
              margin: "0 0 12px 0",
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}>
              Kant's Copernican revolution correctly identifies that objects must conform to our cognition rather than the other way around — grounding the possibility of scientific knowledge. But in doing so, Kant splits reality into phenomena (what we can know) and things-in-themselves (what forever escapes us), and this division is self-undermining. The thing-in-itself supposedly affects our sensory apparatus — but "affection" is a causal relation, and causality is precisely one of Kant's categories that applies only to phenomena. Kant has used a concept he forbids to describe what lies beyond the concept's legitimate reach.
            </p>
            <p style={{
              margin: 0,
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}>
              Hegel's resolution is radical: eliminate the thing-in-itself entirely. If the categories are not mere subjective impositions but the objective logical structure of reality, thought and being are not two sides of a wall but two currents of a single self-developing process. Speculative idealism does not deny an external world — it denies that anything could be genuinely external to the rational structure that thought and being share.
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

        {/* 3. THE DIFFICULTY PANEL */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderLeft: "4px solid #334155",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#334155",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            margin: "0 0 14px 0",
            color: "#e2e8f0",
          }}>
            If reality is thoroughly conceptual and the dualisms between subject and object, duty and inclination, are not ultimate but produced by a rational whole that can in principle overcome them — then how does the most alienated and divided form of consciousness arise within this system? How does a consciousness that experiences irreconcilable inner division, that finds itself split against itself with no hope of reconciliation, emerge within what Hegel insists is ultimately rational? The very completeness of the speculative solution raises the sharpest possible question about suffering, estrangement, and what consciousness looks like when rational unity seems least available.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 14px)",
            lineHeight: 1.7,
            margin: 0,
            color: "#475569",
            fontStyle: "italic",
          }}>
            This pressure forces the next development: the anatomy of unhappy consciousness — the structure of a mind at war with itself — and how even that extremity is a determinate stage within Spirit's self-recovery.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 28px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#94a3b8",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: accent,
              fontWeight: "bold",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={18} color={accent} />
              : <ChevronDown size={18} color={accent} />}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)",
              borderTop: `1px solid ${borderColor}`,
              paddingTop: "20px",
            }}>
              {[
                {
                  title: "The Empty Categorical Imperative",
                  body: "Kant's categorical imperative — act only on universalizable maxims — is formally powerful but silent on content. It cannot tell us whether to prioritize individual freedom or communal solidarity, whether markets or redistribution. Contemporary policy debates where abstract principles generate contradictory specific duties are a living demonstration of what Hegel diagnosed: the gap between formal universality and determinate ethical life."
                },
                {
                  title: "Newtonian Physics and Einstein",
                  body: "Kant took Newtonian mechanics as a fixed, timeless framework — the very form of possible experience. Einstein's relativity revealed that 'absolute space' and 'simultaneous events' are not given features of reality but conceptual constructions that serve certain purposes and break down under others. The categories we use to frame experience are themselves historically produced and revisable — vindicating Hegel's insistence on the conceptual constitution of what we call nature."
                },
                {
                  title: "The Unknowable Thing-in-Itself in Modern Epistemology",
                  body: "Whenever a philosophical or scientific position posits a 'true reality' that is, by definition, beyond all possible evidence or test, it replicates Kant's performative contradiction. String theory's landscape of unobservable universes, or the claim that consciousness is 'really' just brain states we can never directly access — both deploy a concept of the unknowable while making substantive claims about it, precisely the move Hegel identifies as incoherent."
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  marginBottom: i < 2 ? "20px" : 0,
                  paddingBottom: i < 2 ? "20px" : 0,
                  borderBottom: i < 2 ? `1px solid ${borderColor}` : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#60a5fa",
                    marginBottom: "8px",
                    fontStyle: "italic",
                  }}>{echo.title}</div>
                  <p style={{
                    margin: 0,
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    lineHeight: 1.75,
                    color: "#94a3b8",
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: "12px" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#1e293b", letterSpacing: "0.1em" }}>
            Hegel's Complete System · Part 12 of 20
          </div>
        </div>

      </div>
    </div>
  );
}

export default KantCritique;