function SpeculativeMethod() {
  const CORE_ARGUMENT = `Unlike approaches that impose external methods on philosophical subject matter, Hegel argues that genuine philosophical thinking must allow its method to emerge from the content itself — the method is inseparable from the results. Traditional empiricism and rationalism both assume a separation between knowing subject and known object; Kantian critical philosophy limits this to phenomena. Hegel's speculative method transcends these dualisms by recognizing that thinking and being are aspects of a single self-differentiating process. The key operational principle is determinate negation: every false view contains partial truth that must be preserved while its limitations are overcome, generating developmental progress rather than mere rejection. The system is holistic — no concept has meaning in isolation — and genuinely circular, returning enriched to its starting points.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [echosOpen, setEchosOpen] = useState(false);
  const [mode, setMode] = useState(null); // null | 'abstract' | 'determinate'
  const [chainStep, setChainStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [abstractDeleted, setAbstractDeleted] = useState([]);
  const [determinateHistory, setDeterminateHistory] = useState([]);
  const [showSplit, setShowSplit] = useState(false);
  const [splitFade, setSplitFade] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const animRef = useRef(null);

  const accent = "#6366f1";

  const keyConcepts = [
    { id: "speculative_thinking", label: "Speculative Thinking", desc: "Speculative thinking is Hegel's name for the mode of thought capable of holding contradictions together without forcing premature resolution. Rather than treating opposites as external to each other (as the understanding does), speculative reason follows their inner movement — the way each term passes into its opposite and generates a richer unity from that tension." },
    { id: "determinate_negation", label: "Determinate Negation", desc: "Abstract negation simply cancels: 'not-A.' Determinate negation preserves what was true in what it negates and elevates it to a higher standpoint. When Becoming negates the identity of Being and Nothing, it does not destroy them but holds their unity-in-opposition in a single dynamic concept. Every step forward in the Logic is a determinate negation." },
    { id: "aufhebung", label: "Aufhebung (Sublation)", desc: "Aufhebung is Hegel's key technical term, deliberately exploiting the German word's triple meaning: to cancel, to preserve, and to elevate. Each dialectical movement sublates its starting point — the lower category is cancelled as independent, preserved as a moment within a richer whole, and elevated to a new level of concreteness. Nothing is simply discarded." },
    { id: "method_from_content", label: "Method from Content", desc: "Unlike Kant, who supplies categories to experience from outside, Hegel insists that the philosophical method must arise from the movement of its subject matter itself. The method of the Logic is not imposed on its content but is extracted from it: logic develops its own method as it proceeds, making the beginning and the method appear only at the end." },
    { id: "systematic_holism", label: "Systematic Holism", desc: "No philosophical concept has meaning in isolation — each is what it is only through its relations to every other concept in the system. Truth is 'the whole,' as Hegel famously says. A concept grasped in abstraction from its place in the total movement of thought is always a partial, one-sided representation — a fragment mistaken for a self-sufficient whole." },
    { id: "circular_return", label: "Philosophy as Self-Knowing Activity", desc: "The system ends where it begins, but the return is not a simple loop — it is a circle that, in completing itself, reveals itself as the ground of its own starting point. The Absolute Idea at the close of the Logic shows that Being at the opening was always already the implicit self-determination of the Idea. Philosophy's end illuminates its beginning." },
  ];

  const chainConcepts = [
    { id: 0, label: "Being", x: 50, y: 50, color: "#6366f1", size: 28 },
    { id: 1, label: "Nothing", x: 200, y: 50, color: "#8b5cf6", size: 28, kernelOf: 0 },
    { id: 2, label: "Becoming", x: 125, y: 150, color: "#a78bfa", size: 34, kernelOf: 1, richer: true },
    { id: 3, label: "Determinate\nBeing", x: 270, y: 150, color: "#c4b5fd", size: 38, kernelOf: 2, richer: true },
    { id: 4, label: "Quality", x: 390, y: 80, color: "#ddd6fe", size: 40, kernelOf: 3, richer: true },
    { id: 5, label: "Something", x: 390, y: 220, color: "#818cf8", size: 42, kernelOf: 4, richer: true },
  ];

  const baseEdges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  const visibleNodes = mode === 'abstract'
    ? chainConcepts.slice(0, Math.max(1, 3 - abstractDeleted.length))
    : mode === 'determinate'
    ? chainConcepts.slice(0, Math.min(chainStep + 2, chainConcepts.length))
    : chainConcepts.slice(0, 2);

  const visibleEdges = baseEdges.filter(e =>
    visibleNodes.find(n => n.id === e.from) && visibleNodes.find(n => n.id === e.to)
  );

  function handleAbstractNegation() {
    if (animating) return;
    setMode('abstract');
    setAnimating(true);
    setAbstractDeleted(prev => {
      const next = [...prev, prev.length];
      return next;
    });
    setTimeout(() => setAnimating(false), 600);
  }

  function handleDeterminateNegation() {
    if (animating) return;
    setMode('determinate');
    setShowSplit(true);
    setSplitFade(1);
    setAnimating(true);
    setTimeout(() => {
      setSplitFade(0);
      setTimeout(() => {
        setShowSplit(false);
        setChainStep(prev => Math.min(prev + 1, chainConcepts.length - 2));
        setDeterminateHistory(prev => [...prev, chainStep]);
        setAnimating(false);
      }, 500);
    }, 900);
  }

  function handleReset() {
    setMode(null);
    setChainStep(0);
    setAbstractDeleted([]);
    setDeterminateHistory([]);
    setShowSplit(false);
    setSplitFade(0);
    setAnimating(false);
  }

  const svgViewBox = "0 0 480 300";

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #1a2030 0%, #0a0a0f 80%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e5e7eb",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px, 3vw, 32px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(8px, 2vw, 16px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.5vw, 12px)",
            letterSpacing: "0.18em",
            color: "#6b7280",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>Part 19 of 20 · Hegel's Philosophical System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 40px)",
            fontWeight: "bold",
            color: "#f9fafb",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
          }}>The Method of Philosophy</h1>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 17px)",
            color: "#9ca3af",
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Hegel's speculative method allows philosophical content to generate its own method through determinate negation, making thinking itself the deepest subject of philosophy.
          </p>
        </div>

        {/* 1. THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(17, 24, 39, 0.85)",
          borderLeft: "4px solid #1F2937",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          boxShadow: "0 2px 24px rgba(31,41,55,0.3)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.3vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#d1d5db",
            lineHeight: 1.75,
            margin: 0,
          }}>
            The analysis of alienation and its overcoming requires a philosophical method adequate to the dynamic, self-developing character of reality — but what is that method, and how does it differ from both empiricist and rationalist alternatives? Empiricism imports an external observer; rationalism imposes pre-formed categories. Neither can let content speak for itself. Something more radical is needed: a method that does not stand apart from its subject matter but emerges from within it, a method that <em>moves</em> as reality itself moves.
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


        {/* 2. MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15, 20, 35, 0.92)",
          borderRadius: "12px",
          border: "1px solid rgba(99,102,241,0.18)",
          padding: "clamp(16px, 3vw, 32px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
        }}>
          <h2 style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "#e0e7ff",
            margin: "0 0 6px 0",
          }}>Negation as Method: Abstract vs. Determinate</h2>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 15px)",
            color: "#9ca3af",
            margin: "0 0 20px 0",
            lineHeight: 1.65,
          }}>
            Every philosophical concept can be negated in two ways. <strong style={{ color: "#a78bfa" }}>Abstract negation</strong> simply erases — leaving emptiness and dead ends. <strong style={{ color: "#6ee7b7" }}>Determinate negation</strong> transforms — preserving the kernel of truth while sublating the error, generating a richer, more concrete concept. Use the controls below to see both in action, then chain determinate negations to watch the network grow.
          </p>

          {/* Controls */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "22px",
          }}>
            {[
              { label: "Abstract Negation", key: "abstract", color: "#ef4444", glow: "#ef444455" },
              { label: "Determinate Negation", key: "determinate", color: "#6ee7b7", glow: "#6ee7b755" },
              { label: "Reset", key: "reset", color: "#6b7280", glow: "#6b728055" },
            ].map(btn => (
              <button
                key={btn.key}
                onClick={btn.key === "reset" ? handleReset : btn.key === "abstract" ? handleAbstractNegation : handleDeterminateNegation}
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: `1.5px solid ${btn.color}`,
                  color: btn.color,
                  borderRadius: "6px",
                  padding: "8px 18px",
                  fontSize: "clamp(11px, 1.6vw, 14px)",
                  fontFamily: "Georgia, serif",
                  cursor: animating && btn.key !== "reset" ? "not-allowed" : "pointer",
                  opacity: animating && btn.key !== "reset" ? 0.5 : 1,
                  transition: "box-shadow 0.2s, background 0.2s",
                  boxShadow: hoveredNode === btn.key ? `0 0 12px ${btn.glow}` : "none",
                }}
                onMouseEnter={() => setHoveredNode(btn.key)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Status label */}
          <div style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#6b7280",
            marginBottom: "10px",
            minHeight: "20px",
          }}>
            {mode === null && "Start with Abstract or Determinate Negation to see the difference."}
            {mode === 'abstract' && `Abstract negation: concepts are simply deleted — ${Math.min(abstractDeleted.length, 2)} removed. The network shrinks toward emptiness.`}
            {mode === 'determinate' && `Determinate negation applied ${determinateHistory.length + (chainStep > 0 ? 0 : 0)} time(s). The network grows richer with each transformation.`}
          </div>

          {/* SVG Network */}
          <div style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}>
            <svg
              viewBox={svgViewBox}
              width="100%"
              style={{ display: "block", overflow: "visible" }}
            >
              <defs>
                <filter id="glow-purple">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-green">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#4b5563" />
                </marker>
              </defs>

              {/* Edges */}
              {visibleEdges.map((e, i) => {
                const fn = visibleNodes.find(n => n.id === e.from);
                const tn = visibleNodes.find(n => n.id === e.to);
                if (!fn || !tn) return null;
                return (
                  <line
                    key={i}
                    x1={fn.x}
                    y1={fn.y}
                    x2={tn.x}
                    y2={tn.y}
                    stroke={mode === 'determinate' ? "#6ee7b744" : "#4b556344"}
                    strokeWidth="1.5"
                    markerEnd="url(#arrow)"
                    style={{ transition: "all 0.4s" }}
                  />
                );
              })}

              {/* Split animation overlay */}
              {showSplit && mode === 'determinate' && chainStep < chainConcepts.length - 2 && (() => {
                const target = chainConcepts[Math.min(chainStep + 1, chainConcepts.length - 1)];
                return (
                  <g opacity={splitFade} style={{ transition: "opacity 0.5s" }}>
                    {/* Kernel (preserved truth) */}
                    <circle
                      cx={target.x - 18}
                      cy={target.y - 14}
                      r={target.size * 0.5}
                      fill="#6ee7b7"
                      filter="url(#glow-green)"
                      opacity="0.85"
                    />
                    <text
                      x={target.x - 18}
                      y={target.y - 14}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="7"
                      fill="#064e3b"
                      fontFamily="Georgia, serif"
                    >kernel</text>
                    {/* Sublated error (dissolving) */}
                    <circle
                      cx={target.x + 18}
                      cy={target.y + 12}
                      r={target.size * 0.45}
                      fill="#ef4444"
                      opacity={splitFade * 0.4}
                      style={{ transition: "opacity 0.5s" }}
                    />
                    <text
                      x={target.x + 18}
                      y={target.y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="7"
                      fill="#fca5a5"
                      fontFamily="Georgia, serif"
                      opacity={splitFade * 0.7}
                    >error↗</text>
                  </g>
                );
              })()}

              {/* Abstract deletion X marks */}
              {mode === 'abstract' && abstractDeleted.map((d, i) => {
                const idx = 1 + i;
                const node = chainConcepts[idx];
                if (!node) return null;
                return (
                  <g key={"del-" + i}>
                    <circle cx={node.x} cy={node.y} r={node.size + 4} fill="#1a0a0a" opacity="0.85" />
                    <line x1={node.x - 12} y1={node.y - 12} x2={node.x + 12} y2={node.y + 12} stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                    <line x1={node.x + 12} y1={node.y - 12} x2={node.x - 12} y2={node.y + 12} stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                  </g>
                );
              })}

              {/* Nodes */}
              {visibleNodes.map((node, i) => {
                const isNew = mode === 'determinate' && i === visibleNodes.length - 1 && chainStep > 0;
                const isDeleted = mode === 'abstract' && abstractDeleted.includes(i - 1) && i > 0;
                if (isDeleted) return null;

                const lines = node.label.split('\n');
                return (
                  <g
                    key={node.id}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.4s",
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size + (hoveredNode === node.id ? 4 : 0)}
                      fill={isNew ? "#6ee7b733" : "rgba(17,24,39,0.95)"}
                      stroke={isNew ? "#6ee7b7" : node.color}
                      strokeWidth={isNew ? 2.5 : 1.8}
                      filter={isNew ? "url(#glow-green)" : hoveredNode === node.id ? "url(#glow-purple)" : "none"}
                      style={{ transition: "all 0.35s" }}
                    />
                    {lines.map((line, li) => (
                      <text
                        key={li}
                        x={node.x}
                        y={node.y + (lines.length === 1 ? 0 : (li - 0.5) * 9)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={clampFontSize(node.size)}
                        fill={isNew ? "#6ee7b7" : node.color}
                        fontFamily="Georgia, serif"
                        style={{ userSelect: "none", transition: "all 0.3s" }}
                      >
                        {line}
                      </text>
                    ))}
                    {isNew && (
                      <text
                        x={node.x}
                        y={node.y + node.size + 14}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#6ee7b7"
                        fontFamily="Georgia, serif"
                        opacity="0.7"
                      >▲ richer</text>
                    )}
                  </g>
                );
              })}

              {/* Abstract negation — gap label */}
              {mode === 'abstract' && abstractDeleted.length > 0 && (
                <text
                  x={240}
                  y={270}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#ef444488"
                  fontFamily="Georgia, serif"
                >
                  Dead end — negation leaves only absence
                </text>
              )}

              {/* Determinate negation — growth label */}
              {mode === 'determinate' && chainStep >= 2 && (
                <text
                  x={240}
                  y={275}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6ee7b788"
                  fontFamily="Georgia, serif"
                >
                  The network grows denser and more concrete
                </text>
              )}
            </svg>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            background: "rgba(31,41,55,0.4)",
            borderRadius: "8px",
            padding: "clamp(14px, 2.5vw, 22px)",
            borderLeft: "3px solid #6366f1",
          }}>
            <p style={{
              fontSize: "clamp(13px, 1.8vw, 15px)",
              color: "#d1d5db",
              lineHeight: 1.8,
              margin: 0,
            }}>
              Traditional philosophy assumes a standing opposition: the knowing subject on one side, the known object on the other. Empiricism fills the subject with external data; rationalism equips it with innate categories. Kant draws the sharpest line — we know phenomena, never things-in-themselves. Hegel's decisive move is to recognize that this very opposition is itself a product of thinking, and thinking can reflect on it. When thought examines its own movement, it discovers that every apparent limit conceals a passage — not by jumping over the limit from outside, but by pressing immanently against it until the limit reveals its own other side. This is speculative thinking: patient, relentless, and ultimately self-knowing.
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
          background: "rgba(17, 24, 39, 0.85)",
          borderLeft: "4px solid #374151",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          boxShadow: "0 2px 24px rgba(31,41,55,0.2)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.3vw, 11px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: "12px",
            fontWeight: "bold",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#d1d5db",
            lineHeight: 1.75,
            margin: "0 0 12px 0",
          }}>
            If speculative philosophy achieves the highest form of self-knowledge — if the method truly sublates all prior approaches and the system genuinely closes on itself — a new and urgent question emerges. What is Hegel's living legacy? How have subsequent thinkers appropriated, transformed, and criticized his system? Marx inverted the dialectic into material history; Kierkegaard exploded it from within through the irreducibly singular existing individual; analytic philosophy largely bypassed it; poststructuralism found in it a totalizing violence to be resisted. What remains genuinely urgent in Hegel's vision, and what must be released?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#6b7280",
            fontStyle: "italic",
            margin: 0,
          }}>
            This pressure forces the next development: a reckoning with Hegel's reception, transformation, and the stakes of his system for thinking in our own time.
          </p>
        </div>

        {/* 4. REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: "rgba(17, 24, 39, 0.8)",
          borderRadius: "8px",
          border: "1px solid rgba(99,102,241,0.12)",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "clamp(14px, 2.5vw, 22px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <span style={{
              fontSize: "clamp(9px, 1.3vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontWeight: "bold",
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={18} color="#6b7280" />
              : <ChevronDown size={18} color="#6b7280" />}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              {[
                {
                  title: "Hegel's Notorious Difficulty",
                  body: "Hegel's prose is famously dense — and deliberately so. Ordinary language was built for stable identities and external relations. Speculative content, which is constitutively self-moving and self-differentiating, strains against those structures. Every sentence must somehow hold the object, its negation, and their unity simultaneously. The difficulty is not an accident of style but a consequence of using a static medium to express dynamic reality.",
                },
                {
                  title: "Plato vs. Hegel: External vs. Immanent Dialectics",
                  body: "Plato's dialogues proceed dialectically, but Socrates often introduces a new distinction or analogy from outside — a move Hegel calls 'arbitrary.' Hegel's claim is that genuine dialectic must be driven by the content's own nature. When 'Being' is fully thought, it passes into 'Nothing' not because the philosopher decides to introduce a new idea, but because pure Being, as utterly indeterminate, is indistinguishable from Nothing. The movement is immanent, necessary, and impersonal.",
                },
                {
                  title: "Einstein's Relativity as Holistic Conceptual Revision",
                  body: "When Einstein reconceived simultaneity, he did not merely add a new fact to physics — he forced the reconstruction of time, space, mass, and energy as an interconnected whole. No single concept could remain fixed while the others shifted. This illustrates Hegel's insight that concepts form a web of mutual determination: genuine conceptual change is always holistic, never merely additive. The speculative method anticipates precisely this kind of systematic conceptual transformation.",
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  background: "rgba(31,41,55,0.45)",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "2px solid #4b5563",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.7vw, 15px)",
                    color: "#a5b4fc",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ca3af",
                    lineHeight: 1.72,
                    margin: 0,
                  }}>{echo.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function clampFontSize(size) {
  if (size > 38) return "9";
  if (size > 32) return "8.5";
  return "8";
}

function ConceptCard({ term, desc }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(99,102,241,0.12)" : "rgba(31,41,55,0.5)",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "rgba(75,85,99,0.3)"}`,
        borderRadius: "7px",
        padding: "clamp(10px, 2vw, 16px)",
        cursor: "pointer",
        transition: "all 0.25s",
      }}
    >
      <div style={{
        fontSize: "clamp(12px, 1.6vw, 14px)",
        color: "#c7d2fe",
        fontWeight: "bold",
        marginBottom: open ? "8px" : 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "6px",
      }}>
        <span>{term}</span>
        <span style={{ color: "#6b7280", fontSize: "clamp(10px, 1.5vw, 12px)", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <p style={{
          fontSize: "clamp(11px, 1.5vw, 13px)",
          color: "#9ca3af",
          lineHeight: 1.65,
          margin: 0,
        }}>{desc}</p>
      )}
    </div>
  );
}

export default SpeculativeMethod