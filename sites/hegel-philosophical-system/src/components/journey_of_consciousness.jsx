function JourneyOfConsciousness() {
  const CORE_ARGUMENT = `Hegel shows that even the most immediate form of knowledge — pointing at 'this, here, now' — already depends on universal concepts, undermining the idea of pure sensory given. Each stage of consciousness (sense certainty, perception, understanding) collapses under its own internal contradictions and forces a transition to a richer stage. The decisive turning point is the emergence of self-consciousness, where mind recognizes that it has been present and active in every stage of knowing. But self-consciousness cannot validate itself in isolation; it requires acknowledgment from other self-conscious beings, making knowledge inherently intersubjective.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [activeStep, setActiveStep] = useState(null);
  const [sublated, setSublated] = useState([]);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const accent = "#3B82F6";

  const keyConcepts = [
    { id: "sense_certainty", label: "Sense Certainty", desc: "Sense certainty is the opening position of consciousness: the conviction that the most immediate, pre-conceptual contact with a 'this, here, now' is the richest and most certain kind of knowledge. Hegel shows this is the poorest: the very words used to point — 'this,' 'here,' 'now' — are universal terms that dissolve the singular they aim at. Language is already conceptual, and 'the ineffable' cannot be expressed." },
    { id: "perception", label: "Perception", desc: "Consciousness moves to perception — the attempt to grasp the determinate thing as a bundle of properties. But the thing cannot be both a unified one and a many-propertied multiplicity without contradiction. Consciousness oscillates between attributing unity to the thing itself and to its own act of comparison, unable to stabilize a consistent account of the object." },
    { id: "understanding", label: "Understanding", desc: "The Understanding posits invisible forces and laws behind appearances — the supersensible world as the true explanation of sensuous phenomena. But this inner world turns out to be an inverted world: every law has its inversion equally valid, and the very distinction between appearance and inner truth collapses. What the Understanding sought behind appearances is just appearances understood more systematically." },
    { id: "self_consciousness", label: "Self-Consciousness", desc: "When the inner world collapses, consciousness turns back on itself and discovers that what it was seeking — the explanation of things — was always its own activity. This is the birth of self-consciousness: 'I = I.' But this pure self-reflection is immediately unstable, because self-consciousness can only confirm itself through the recognition of another self-consciousness." },
    { id: "intersubjectivity", label: "Intersubjectivity", desc: "The Phenomenology's most famous insight: self-consciousness is inherently intersubjective. A solitary self cannot validate itself by introspection; it requires acknowledgment from another free self-consciousness. This recognition is not a social nicety but a metaphysical necessity — without mutual recognition, self-consciousness remains a hollow claim rather than a lived reality." },
    { id: "absolute_knowledge", label: "Absolute Knowledge", desc: "The Phenomenology culminates in Absolute Knowledge — not omniscience but the point at which consciousness recognizes that the entire journey it has undergone (from sense certainty through religion) was the self-development of Spirit coming to know itself. The separation between the knowing subject and what is known is finally overcome: knowledge and its object are both revealed as Spirit's own movement." },
  ];

  const steps = [
    {
      id: 0,
      label: "Sense Certainty",
      subtitle: "The richest, most immediate knowing",
      color: "#3B82F6",
      contradiction: "When I say 'this tree, here, now' — I try to grasp the singular. But 'here' is also behind me, above me, across the world. 'Now' is day, night, this moment, and the next. The very words I use to point dissolve into universals, sweeping the singular away. What seemed the most concrete proves the most abstract.",
      sublatedContent: "The insight that immediate sensation already contains conceptual mediation — that every 'given' is shaped by universal structures of language and thought.",
      animationHint: "dissolving"
    },
    {
      id: 1,
      label: "Perception",
      subtitle: "Things with multiple properties",
      color: "#6366F1",
      contradiction: "I see a grain of salt: white, cubic, tart, hard. But which is the 'real' salt — the whiteness or the cubeness? Each property seems to exclude the others, yet they must coexist in one thing. Perception oscillates between the unity of the thing and the multiplicity of its properties, unable to hold both consistently.",
      sublatedContent: "The understanding that objects are not bundles of accidental properties, but that unity and multiplicity require a deeper organizing principle — a lawful inner structure.",
      animationHint: "splitting"
    },
    {
      id: 2,
      label: "Understanding",
      subtitle: "Invisible forces behind appearances",
      color: "#8B5CF6",
      contradiction: "Science explains visible effects through invisible laws — gravity, electromagnetism, forces. The 'real' world becomes a supersensible beyond. But these inner forces are only ever known through their outer expressions. The curtain conceals nothing — or rather, we ourselves placed the curtain there and then sought what lay behind it.",
      sublatedContent: "The recognition that the laws mind projects onto nature are mind's own structures — that in understanding the world, consciousness discovers itself. The object and the subject begin to mirror each other.",
      animationHint: "reflection"
    },
    {
      id: 3,
      label: "Self-Consciousness",
      subtitle: "Mind recognizes itself in its knowing",
      color: "#A855F7",
      contradiction: "I recognize that I have been present in every stage of knowing — the 'I' that structures experience. But this self-certainty is hollow without external confirmation. Another self-consciousness faces me, each of us claiming to be the universal standpoint, each needing the other's recognition to be real.",
      sublatedContent: "The necessity of intersubjectivity: genuine self-knowledge requires recognition from other selves. Knowledge is not a private achievement but a social, historical process.",
      animationHint: "encounter"
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

    const ctx = canvas.getContext("2d");
    let animFrame;
    let particles = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 38; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -Math.random() * 0.22 - 0.05,
          alpha: Math.random() * 0.35 + 0.08,
          hue: 210 + Math.random() * 60
        });
      }
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `#${Math.round(29 + p.hue * 0.3).toString(16).padStart(2,'0')}4ED8`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  const handleStepClick = (id) => {
    if (activeStep === id) {
      setActiveStep(null);
    } else {
      setActiveStep(id);
      setSublated(prev => prev.includes(id) ? prev : [...prev, id]);
    }
  };

  const outerStyle = {
    background: "radial-gradient(ellipse at 40% 20%, #0f2a6e 0%, #080818 70%, #0a0a0f 100%)",
    minHeight: "100vh",
    fontFamily: "Georgia, serif",
    padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    boxSizing: "border-box"
  };

  const wrapperStyle = {
    maxWidth: "min(90vw, 860px)",
    margin: "0 auto",
    position: "relative"
  };

  const cardBase = {
    background: "#0d1b3e99",
    border: "1px solid #1D4ED833",
    borderRadius: "10px",
    padding: "clamp(16px, 3vw, 28px)",
    marginBottom: "clamp(16px, 3vw, 28px)"
  };

  return (
    <div style={outerStyle}>
      <div style={wrapperStyle}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", letterSpacing: "0.18em", color: "#93C5FD", textTransform: "uppercase", marginBottom: "8px" }}>
            Part 2 of 20 — Phenomenology of Spirit
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 38px)", color: "#E0EAFF", margin: "0 0 10px 0", fontWeight: "normal", letterSpacing: "0.02em" }}>
            The Journey of Consciousness
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: "#93C5FD", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            The Phenomenology of Spirit traces the necessary stages through which consciousness must pass to arrive at genuine self-knowledge.
          </p>
        </div>

        {/* PROBLEM PANEL */}
        <div style={{ ...cardBase, borderLeft: "4px solid #1D4ED8", background: "#07122e99" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "10px" }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#CBD5E1", lineHeight: 1.75, margin: 0 }}>
            If all thinking develops dialectically through contradiction, what does this mean for the development of the individual mind? Can consciousness ever achieve genuine, non-arbitrary knowledge — or is every claim to knowing just one more moment in an endless, groundless oscillation? The pressure is urgent: without an answer, philosophy itself collapses into relativism.
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
        <div style={{ ...cardBase, background: "#08122899", position: "relative", overflow: "hidden", padding: 0 }}>

          {/* Canvas background */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, padding: "clamp(16px, 3vw, 28px)" }}>
            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "6px" }}>
              The Staircase of Knowing
            </div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", margin: "0 0 clamp(16px, 3vw, 24px) 0", lineHeight: 1.6 }}>
              Each stage below carries within it a contradiction that forces the ascent to the next. Click any step to witness the internal collapse — and what is preserved in the rising.
            </p>

            <div style={{ display: "flex", gap: "clamp(10px, 2vw, 20px)", alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* Staircase column */}
              <div style={{ flex: "1 1 min(260px, 100%)", minWidth: 0 }}>
                {steps.map((step, idx) => {
                  const isActive = activeStep === step.id;
                  const isHovered = hoveredStep === step.id;
                  const isSublated = sublated.includes(step.id);
                  const stepOffset = idx * 18;

                  return (
                    <div key={step.id} style={{ marginBottom: "clamp(8px, 1.5vw, 14px)", marginLeft: `${stepOffset}px`, transition: "margin 0.3s ease" }}>
                      {/* Step button */}
                      <div
                        onClick={() => handleStepClick(step.id)}
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "8px",
                          padding: "clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 18px)",
                          background: isActive
                            ? `${step.color}22`
                            : isHovered ? "#1a2a5e99" : "#101c3e88",
                          border: `2px solid ${isActive ? step.color : isHovered ? "#3B82F699" : "#1D4ED855"}`,
                          boxShadow: isActive ? `0 0 18px ${step.color}44` : isHovered ? `0 0 10px #1D4ED844` : "none",
                          transition: "all 0.25s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}
                      >
                        {/* Step number */}
                        <div style={{
                          width: "clamp(24px, 3.5vw, 32px)",
                          height: "clamp(24px, 3.5vw, 32px)",
                          borderRadius: "50%",
                          background: isActive ? step.color : "#1D4ED866",
                          border: `2px solid ${step.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(10px, 1.4vw, 13px)",
                          color: "#E0EAFF",
                          fontWeight: "bold",
                          flexShrink: 0,
                          transition: "background 0.25s ease"
                        }}>
                          {idx + 1}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: isActive ? "#E0EAFF" : "#93C5FD", fontWeight: "bold", letterSpacing: "0.02em" }}>
                            {step.label}
                          </div>
                          <div style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: "#64748B", fontStyle: "italic", marginTop: "2px" }}>
                            {step.subtitle}
                          </div>
                        </div>

                        {isSublated && !isActive && (
                          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#4ADE80", letterSpacing: "0.1em", flexShrink: 0 }}>
                            sublated ✓
                          </div>
                        )}

                        <div style={{ color: step.color, fontSize: "clamp(12px, 1.8vw, 16px)", flexShrink: 0, transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>
                          ▼
                        </div>
                      </div>

                      {/* Expanded panel */}
                      {isActive && (
                        <div style={{
                          marginTop: "4px",
                          borderRadius: "0 0 8px 8px",
                          background: "#050e2799",
                          border: `1px solid ${step.color}55`,
                          borderTop: "none",
                          padding: "clamp(12px, 2vw, 18px)",
                          animation: "none"
                        }}>
                          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", color: step.color, textTransform: "uppercase", marginBottom: "8px" }}>
                            Internal Contradiction
                          </div>
                          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#CBD5E1", lineHeight: 1.7, margin: "0 0 14px 0" }}>
                            {step.contradiction}
                          </p>

                          {/* Dissolution animation hint */}
                          <ContradictionViz step={step} />

                          <div style={{ borderTop: `1px solid ${step.color}33`, paddingTop: "12px", marginTop: "12px" }}>
                            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.18em", color: "#4ADE80", textTransform: "uppercase", marginBottom: "6px" }}>
                              What is Sublated (Preserved-and-Transcended)
                            </div>
                            <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#86EFAC", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                              {step.sublatedContent}
                            </p>
                          </div>

                          {idx < steps.length - 1 && (
                            <div style={{ textAlign: "center", marginTop: "14px" }}>
                              <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#60A5FA", letterSpacing: "0.08em" }}>
                                Contradiction forces ascent to →
                              </div>
                              <div style={{ fontSize: "clamp(13px, 1.8vw, 16px)", color: steps[idx + 1].color, fontWeight: "bold", marginTop: "4px" }}>
                                {steps[idx + 1].label}
                              </div>
                            </div>
                          )}
                          {idx === steps.length - 1 && (
                            <div style={{ textAlign: "center", marginTop: "14px" }}>
                              <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#A855F7", letterSpacing: "0.08em", fontStyle: "italic" }}>
                                The journey approaches Absolute Knowledge — but only through the struggle for recognition...
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Summit indicator */}
                <div style={{
                  marginLeft: `${steps.length * 18}px`,
                  padding: "clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 18px)",
                  borderRadius: "8px",
                  background: "#1D4ED811",
                  border: "1px dashed #1D4ED866",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "clamp(10px, 1.4vw, 13px)", color: "#C4B5FD", letterSpacing: "0.1em", fontStyle: "italic" }}>
                    ✦ Absolute Knowledge — the goal beyond the horizon ✦
                  </div>
                </div>
              </div>

              {/* Sublated tracker sidebar */}
              {sublated.length > 0 && (
                <div style={{
                  flex: "0 0 min(200px, 100%)",
                  background: "#04091eaa",
                  border: "1px solid #4ADE8033",
                  borderRadius: "8px",
                  padding: "clamp(10px, 1.8vw, 16px)"
                }}>
                  <div style={{ fontSize: "clamp(9px, 1.2vw, 10px)", letterSpacing: "0.18em", color: "#4ADE80", textTransform: "uppercase", marginBottom: "10px" }}>
                    Sublated So Far
                  </div>
                  <p style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: "#64748B", fontStyle: "italic", margin: "0 0 10px 0", lineHeight: 1.5 }}>
                    Each insight is cancelled in its one-sidedness, yet preserved in the richer whole:
                  </p>
                  {sublated.map(id => (
                    <div key={id} style={{
                      marginBottom: "8px",
                      padding: "6px 8px",
                      borderRadius: "5px",
                      background: `${steps[id].color}15`,
                      borderLeft: `3px solid ${steps[id].color}`
                    }}>
                      <div style={{ fontSize: "clamp(10px, 1.3vw, 12px)", color: steps[id].color, fontWeight: "bold", marginBottom: "3px" }}>
                        {steps[id].label}
                      </div>
                      <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", color: "#86EFAC", lineHeight: 1.5 }}>
                        {steps[id].sublatedContent}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

        {/* DIFFICULTY PANEL */}
        <div style={{ ...cardBase, borderLeft: "4px solid #7C3AED", background: "#0e0a2699" }}>
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#A78BFA", textTransform: "uppercase", fontVariant: "small-caps", marginBottom: "10px" }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#CBD5E1", lineHeight: 1.75, margin: "0 0 12px 0" }}>
            Self-consciousness cannot validate itself through solitary introspection. It requires acknowledgment from other self-conscious beings, making knowledge inherently intersubjective. But what happens when two self-conscious beings first encounter each other — each claiming to be the universal standard of what is real, each needing the other's recognition to be fully itself?
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#A78BFA", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the primal struggle between two self-consciousnesses — each willing to risk everything, even life itself, to secure recognition from the other.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{ ...cardBase, background: "#08112299", marginBottom: 0 }}>
          <div
            onClick={() => setEchosOpen(o => !o)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "clamp(9px, 1.2vw, 11px)", letterSpacing: "0.2em", color: "#60A5FA", textTransform: "uppercase", fontVariant: "small-caps" }}>
              Real-World Echoes
            </div>
            <div style={{ color: "#60A5FA", display: "flex", alignItems: "center" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {echosOpen && (
            <div style={{ marginTop: "16px" }}>
              <div style={{
                padding: "clamp(12px, 2vw, 18px)",
                borderRadius: "6px",
                background: "#0d1a3e88",
                border: "1px solid #1D4ED833",
                marginBottom: "12px"
              }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#93C5FD", fontWeight: "bold", marginBottom: "6px" }}>
                  Physics and the Supersensible
                </div>
                <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                  Modern science exemplifies the 'Understanding' stage: we explain visible effects through invisible causes — gravity curves spacetime, electromagnetism propagates fields, quarks bind nucleons. The 'real' world retreats behind the phenomena into an invisible, lawlike supersensible domain. Yet, as Hegel saw, these laws are mind's own projections onto nature.
                </p>
              </div>
              <div style={{
                padding: "clamp(12px, 2vw, 18px)",
                borderRadius: "6px",
                background: "#0d1a3e88",
                border: "1px solid #1D4ED833"
              }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#93C5FD", fontWeight: "bold", marginBottom: "6px" }}>
                  Western Philosophy as the Struggle for Recognition
                </div>
                <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                  The history of Western philosophy and culture can itself be read as the Phenomenology writ large — successive civilizations and thinkers each attempting to resolve the problem of mutual recognition: Stoic withdrawal, Roman legal personhood, Christian inwardness, Enlightenment autonomy. Each is a stage that collapses under its own contradictions and forces the next attempt.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function ContradictionViz({ step }) {
  const svgRef = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => (t + 1) % 60);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const t = tick / 60;

  if (step.animationHint === "dissolving") {
    const words = ["this", "here", "now"];
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        {words.map((w, i) => {
          const phase = (t + i * 0.33) % 1;
          const opacity = Math.abs(Math.sin(phase * Math.PI));
          const scale = 0.7 + 0.5 * Math.abs(Math.sin(phase * Math.PI * 0.7));
          return (
            <g key={w} transform={`translate(${50 + i * 90}, 30) scale(${scale})`}>
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle"
                fill={step.color} opacity={opacity}
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(11px, 1.8vw, 14px)", fontStyle: "italic" }}>
                {w}
              </text>
              <text x={12 + Math.sin(phase * Math.PI * 2) * 8} y={-8 + Math.cos(phase * Math.PI * 2) * 5}
                textAnchor="middle" dominantBaseline="middle"
                fill="#93C5FD" opacity={1 - opacity}
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>
                universal
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (step.animationHint === "splitting") {
    const phase = t;
    const split = Math.abs(Math.sin(phase * Math.PI));
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <circle cx="150" cy="30" r="18" fill="none" stroke={step.color} strokeWidth="1.5" opacity="0.6" />
        {["white", "cubic", "tart", "hard"].map((prop, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
          const r = 14 + split * 22;
          const x = 150 + Math.cos(angle) * r;
          const y = 30 + Math.sin(angle) * r;
          return (
            <text key={prop} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fill={step.color} opacity={0.5 + split * 0.5}
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)", fontStyle: "italic" }}>
              {prop}
            </text>
          );
        })}
        <text x="150" y="30" textAnchor="middle" dominantBaseline="middle"
          fill="#E0EAFF" opacity={1 - split * 0.7}
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(9px, 1.4vw, 11px)" }}>
          salt
        </text>
      </svg>
    );
  }

  if (step.animationHint === "reflection") {
    const phase = t;
    const pulse = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <line x1="50" y1="30" x2="130" y2="30" stroke={step.color} strokeWidth="1.5" opacity="0.7" strokeDasharray="4 3" />
        <line x1="170" y1="30" x2="250" y2="30" stroke={step.color} strokeWidth="1.5" opacity="0.7" strokeDasharray="4 3" />
        <ellipse cx="150" cy="30" rx={12 + pulse * 6} ry={8 + pulse * 4}
          fill="none" stroke={step.color} strokeWidth="1.5" opacity={0.5 + pulse * 0.4} />
        <text x="90" y="24" textAnchor="middle" fill="#93C5FD" opacity="0.8"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>outer</text>
        <text x="210" y="24" textAnchor="middle" fill="#93C5FD" opacity="0.8"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>inner</text>
        <text x="150" y="30" textAnchor="middle" dominantBaseline="middle"
          fill={step.color} opacity={pulse}
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1vw, 9px)" }}>mind</text>
      </svg>
    );
  }

  if (step.animationHint === "encounter") {
    const phase = t;
    const dist = 28 + Math.abs(Math.sin(phase * Math.PI)) * 28;
    return (
      <svg viewBox="0 0 300 60" width="100%" style={{ maxWidth: "300px", margin: "10px 0", display: "block" }}>
        <circle cx={150 - dist} cy="30" r="12" fill={step.color} opacity="0.25" />
        <text x={150 - dist} y="30" textAnchor="middle" dominantBaseline="middle"
          fill={step.color} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>I</text>
        <circle cx={150 + dist} cy="30" r="12" fill="#EC489988" opacity="0.25" />
        <text x={150 + dist} y="30" textAnchor="middle" dominantBaseline="middle"
          fill="#EC4899" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(8px, 1.2vw, 10px)" }}>Other</text>
        {dist < 40 && (
          <line x1={150 - dist + 14} y1="30" x2={150 + dist - 14} y2="30"
            stroke="#F59E0B" strokeWidth="1" opacity={1 - dist / 56} strokeDasharray="3 3" />
        )}
      </svg>
    );
  }

  return null;
}

export default JourneyOfConsciousness