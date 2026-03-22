function LivingLegacy() {
  const CORE_ARGUMENT = `Hegel's remarkable influence across two centuries reflects his systematic engagement with perennial human concerns — freedom, recognition, alienation, the individual and community — rather than merely historical curiosity. Direct transmission runs through Marx's revolutionary theory, Kierkegaard's and Sartre's existentialism, Lacan's psychoanalysis, and feminist and postcolonial theory (Fanon, de Beauvoir, Bhabha). Even analytic philosophy has undergone a Hegelian revival through McDowell, Brandom, and Pinkard. Contemporary neuroscience independently confirms Hegelian insights about the intersubjective origins of self-consciousness. The most productive relationship to this legacy involves critical appropriation — preserving dialectical insights while rejecting Eurocentric assumptions about historical progress, and remaining open to reinterpretation rather than dogmatic repetition.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [selectedNode, setSelectedNode] = useState(null);
  const [criticalMode, setCriticalMode] = useState(false);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const accent = "#D4A017";

  const keyConcepts = [
    { id: "marxist_materialism", label: "Marxist Historical Materialism", desc: "Marx's appropriation of Hegel inverts the dialectic: where Hegel's Spirit develops through ideas, Marx grounds development in material productive forces and class struggle. The dialectical logic of contradiction, negation, and synthesis is preserved but applied to the concrete economic and social conditions that shape consciousness rather than to consciousness shaping reality." },
    { id: "existentialism", label: "Existentialism (Kierkegaard / Sartre)", desc: "Kierkegaard's attack on Hegel became the foundation of existentialism: the actual individual, with her irreducible anxiety, passion, and faith, cannot be dissolved into the rational system. Sartre radicalized this by making individual freedom and radical responsibility the irreducible starting points — inverting Hegel's move from individual freedom to institutional actualization." },
    { id: "lacanian_psychoanalysis", label: "Lacanian Psychoanalysis", desc: "Lacan's return to Freud via Hegel (mediated through Kojève) reinterprets the unconscious through the master-slave dialectic and the structure of desire. For Lacan, desire is always the desire of the Other — structured by recognition and the fundamental lack that drives the subject's relation to the symbolic order. The Hegelian logic of intersubjectivity enters the heart of psychoanalytic theory." },
    { id: "feminist_postcolonial", label: "Feminist and Postcolonial Appropriations", desc: "Thinkers like Simone de Beauvoir, Frantz Fanon, and more recently Robert Williams and Susan Buck-Morss have read Hegel's master-slave dialectic through the lens of gender and colonialism. Fanon showed that colonial racism structures recognition in precisely the way Hegel describes — except the promised dialectical reversal is systematically blocked by the colonial apparatus of violence." },
    { id: "analytic_revival", label: "Hegelian Revival in Analytic Philosophy", desc: "Robert Brandom, John McDowell, and Robert Pippin have brought Hegel into dialogue with contemporary analytic philosophy of mind and language. Brandom's inferentialist semantics owes explicit debts to Hegel's logic; McDowell's account of the space of reasons draws on the Phenomenology; Pippin argues that Hegel's idealism is a plausible response to problems analytic philosophy has yet to solve." },
    { id: "neuroscience_intersubjectivity", label: "Neuroscience and Intersubjective Self-Consciousness", desc: "Contemporary neuroscience and developmental psychology have converged — through entirely different methods — on the Hegelian conclusion that selfhood is irreducibly intersubjective. Infants develop self-consciousness through mirroring interactions with caregivers; the capacity for self-knowledge is grounded in the ability to see oneself from the other's perspective. Hegel's logic of recognition maps onto empirical findings about human development." },
  ];

  const nodes = [
    {
      id: "hegel",
      label: "Hegel",
      sublabel: "(1831)",
      x: 50,
      y: 50,
      domain: "center",
      color: "#D4A017",
      radius: 28,
      concept: null,
      description: null,
    },
    {
      id: "marx",
      label: "Marx",
      sublabel: "1818–1883",
      x: 20,
      y: 18,
      domain: "political",
      color: "#C0392B",
      radius: 20,
      concept: "Historical Materialism",
      description:
        "Marx inverted Hegel's idealist dialectic, grounding the movement of history in material conditions and class struggle rather than Spirit. He preserved the triadic structure of contradiction and synthesis while insisting that 'the ideal is nothing else than the material world reflected by the human mind.' The master–slave dialectic became a lens for understanding labor, alienation, and revolutionary transformation.",
      critique:
        "Marx accused Hegel of mystification — of treating real social contradictions as mere moments in the self-development of Absolute Spirit. The critique arrow runs from materialism back to idealism.",
    },
    {
      id: "kierkegaard",
      label: "Kierkegaard",
      sublabel: "1813–1855",
      x: 78,
      y: 15,
      domain: "existential",
      color: "#2980B9",
      radius: 18,
      concept: "Existential Inwardness",
      description:
        "Kierkegaard found Hegel's system too abstract to address the concrete existing individual. He seized on Hegel's categories of freedom and spirit but redirected them inward, insisting that truth is subjectivity. The leap of faith, the stages of existence, and the category of the individual all respond to — and revolt against — Hegel's absorption of particularity into the universal.",
      critique:
        "Kierkegaard's entire project is a sustained protest against the Hegelian system's erasure of the existing individual in favour of speculative totality.",
    },
    {
      id: "sartre",
      label: "Sartre",
      sublabel: "1905–1980",
      x: 82,
      y: 35,
      domain: "existential",
      color: "#2980B9",
      radius: 17,
      concept: "Being-for-Others",
      description:
        "Sartre transformed Hegel's recognition dialectic into the ontology of the look: the other's gaze petrifies my freedom, making conflict the fundamental structure of intersubjectivity. His Critique of Dialectical Reason later reintegrated Marxist and Hegelian threads, attempting a dialectical anthropology of groups, praxis, and seriality.",
      critique:
        "Sartre rejected Hegel's reconciliatory synthesis, insisting that conflict between consciousnesses cannot be finally resolved — each consciousness seeks to objectify the other.",
    },
    {
      id: "lacan",
      label: "Lacan",
      sublabel: "1901–1981",
      x: 75,
      y: 72,
      domain: "psychoanalysis",
      color: "#27AE60",
      radius: 17,
      concept: "Mirror Stage & Recognition",
      description:
        "Lacan reread Freud through Hegel's Phenomenology, particularly the master–slave dialectic and the structure of desire as always desire of the Other's desire. The mirror stage — where the infant first recognizes itself as a unified image in the other's gaze — is a directly Hegelian insight about the intersubjective constitution of subjectivity. Language, for Lacan, is the medium through which the Hegelian Other operates.",
      critique:
        "Lacan introduced the Real as what resists dialectical resolution — a permanent remainder that prevents the Hegelian reconciliation from ever fully closing.",
    },
    {
      id: "fanon",
      label: "Fanon",
      sublabel: "1925–1961",
      x: 25,
      y: 78,
      domain: "postcolonial",
      color: "#D4A017",
      radius: 17,
      concept: "Colonial Recognition",
      description:
        "Frantz Fanon deployed the master–slave dialectic to analyze the psychic structure of colonialism. In Black Skin, White Masks, he showed that the colonial situation perverts Hegelian recognition: the colonized subject is denied the reciprocal recognition that would constitute genuine selfhood. Yet Hegel assumed a symmetry between combatants that the colonial situation destroys — the colonizer's recognition is structurally withheld.",
      critique:
        "Fanon exposed the Eurocentrism latent in Hegel's account of world history and the 'master–slave' narrative, showing that actual colonial masters had no need of the slave's recognition to sustain their self-consciousness.",
    },
    {
      id: "debeauvoir",
      label: "de Beauvoir",
      sublabel: "1908–1986",
      x: 15,
      y: 55,
      domain: "postcolonial",
      color: "#D4A017",
      radius: 17,
      concept: "The Second Sex",
      description:
        "Simone de Beauvoir's analysis of woman as 'the Other' draws directly on Hegelian categories of recognition and otherness. Man constitutes himself as the Essential by defining woman as the Inessential Other — a structure of domination legible through the master–slave dialectic. De Beauvoir asked why women have historically not risen to revolt as the slave does, finding the answer in their dispersal and lack of collective solidarity.",
      critique:
        "De Beauvoir challenged Hegel's assumption that the dialectic of recognition tends toward reciprocity, revealing how gender structures can arrest the movement at permanent asymmetry.",
    },
    {
      id: "mcdowell",
      label: "McDowell",
      sublabel: "b. 1942",
      x: 50,
      y: 88,
      domain: "analytic",
      color: "#7F8C8D",
      radius: 16,
      concept: "Second Nature & Normativity",
      description:
        "John McDowell's Mind and World revives Hegel's concept of Geist to resolve the impasse between empiricism and rationalism in analytic philosophy of mind. Concepts are not merely imposed on a conceptually neutral sensory given; rather, nature itself — through the cultivation of 'second nature' in upbringing — becomes conceptually articulated. Brandom and Pinkard similarly find in Hegel's inferentialist semantics a resource for contemporary philosophy of language and mind.",
      critique:
        "The analytic Hegelian revival tends to bracket Hegel's metaphysics of Absolute Spirit, appropriating his method while leaving open whether the holistic commitments can be sustained.",
    },
    {
      id: "neuroscience",
      label: "Neuroscience",
      sublabel: "Social Cognition",
      x: 50,
      y: 12,
      domain: "mind",
      color: "#8E44AD",
      radius: 16,
      concept: "Intersubjective Self-Consciousness",
      description:
        "Contemporary research on social cognition and the default mode network independently confirms Hegel's insight that self-consciousness is intersubjectively constituted. Studies of mirror neurons, theory of mind, and developmental psychology show that the capacity for self-awareness emerges through the experience of being recognized by others — infants develop a sense of self through the reciprocal gaze of caregivers, echoing Hegel's argument that 'self-consciousness achieves its satisfaction only in another self-consciousness.'",
      critique:
        "Neuroscience provides empirical confirmation without the speculative scaffolding, raising the question of whether Hegel's metaphysical apparatus is necessary for the insights it generates.",
    },
  ];

  const connections = [
    { from: "hegel", to: "marx", type: "transmission" },
    { from: "hegel", to: "kierkegaard", type: "transmission" },
    { from: "hegel", to: "sartre", type: "transmission" },
    { from: "hegel", to: "lacan", type: "transmission" },
    { from: "hegel", to: "fanon", type: "transmission" },
    { from: "hegel", to: "debeauvoir", type: "transmission" },
    { from: "hegel", to: "mcdowell", type: "transmission" },
    { from: "hegel", to: "neuroscience", type: "transmission" },
    { from: "marx", to: "hegel", type: "critique" },
    { from: "kierkegaard", to: "hegel", type: "critique" },
    { from: "sartre", to: "hegel", type: "critique" },
    { from: "lacan", to: "hegel", type: "critique" },
    { from: "fanon", to: "hegel", type: "critique" },
    { from: "debeauvoir", to: "hegel", type: "critique" },
  ];

  const domainColors = {
    center: "#D4A017",
    political: "#C0392B",
    existential: "#2980B9",
    psychoanalysis: "#27AE60",
    postcolonial: "#D4A017",
    analytic: "#7F8C8D",
    mind: "#8E44AD",
  };

  const domainLabels = {
    political: "Political Theory",
    existential: "Existentialism",
    psychoanalysis: "Psychoanalysis",
    postcolonial: "Feminist & Postcolonial",
    analytic: "Analytic Philosophy",
    mind: "Neuroscience / Mind",
  };

  const getNodeById = (id) => nodes.find((n) => n.id === id);

  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ w: 600, h: 500 });

  useEffect(() => {
    if (!svgRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.max(320, w * 0.75);
        setSvgSize({ w, h });
      }
    });
    obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  const toSVG = (pct, dim) => (pct / 100) * dim;

  const getLinePoints = (fromNode, toNode) => {
    const x1 = toSVG(fromNode.x, svgSize.w);
    const y1 = toSVG(fromNode.y, svgSize.h);
    const x2 = toSVG(toNode.x, svgSize.w);
    const y2 = toSVG(toNode.y, svgSize.h);
    return { x1, y1, x2, y2 };
  };

  const getCurvePath = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = my - (dy * 0.15) + (mx - x1) * 0.1;
    const cy = mx + (dx * 0.15) + (my - y1) * 0.1;
    return `M ${x1} ${y1} Q ${mx + (y2 - y1) * 0.1} ${my - (x2 - x1) * 0.1} ${x2} ${y2}`;
  };

  const uniqueDomains = [...new Set(nodes.filter(n => n.domain !== "center").map(n => n.domain))];

  return (
    <div style={{
      background: "radial-gradient(ellipse at center, #2a1a00 0%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8d8b0",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(20px, 4vw, 36px)" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#D4A017",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}>Part 20 of 20 — Hegel's Complete System</div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "bold",
            color: "#D4A017",
            margin: "0 0 8px 0",
            textShadow: "0 0 30px #D4A01755",
          }}>The Living Legacy</h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#b8a070",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>Two centuries after his death, Hegel's concepts and methods continue to shape intellectual and political life across philosophy, politics, psychoanalysis, and beyond.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#12100a",
          border: "1px solid #2a2010",
          borderLeft: "4px solid #D4A017",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#D4A017",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "12px",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#d4c090",
            margin: 0,
            fontStyle: "italic",
          }}>
            The speculative method achieves systematic self-knowledge — but does this represent a final philosophical achievement, or does each generation need to rethink these problems in light of contemporary conditions and challenges? If Spirit truly comprehends itself in Hegel's system, why do thinkers keep returning to it, transforming it, arguing with it? The very vitality of the Hegelian inheritance suggests either that the system was never final, or that its generative tensions cannot be closed.
          </p>
        </div>
        {/* The Core Idea */}
        {CORE_ARGUMENT && (
          <div style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}25`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                          color: ACCENT, marginBottom: 10 }}>
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
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "12px",
          }}>
            <div>
              <h2 style={{
                fontSize: "clamp(15px, 2.2vw, 20px)",
                color: "#D4A017",
                margin: "0 0 4px 0",
              }}>Influence Map</h2>
              <p style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#8a7a50",
                margin: 0,
              }}>Click any thinker to explore their relationship with Hegel</p>
            </div>
            <button
              onClick={() => setCriticalMode(m => !m)}
              style={{
                background: criticalMode ? "#D4A017" : "#1a1508",
                color: criticalMode ? "#0a0a0f" : "#D4A017",
                border: "2px solid #D4A017",
                borderRadius: "20px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "clamp(10px, 1.4vw, 12px)",
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
              }}
            >
              {criticalMode ? "Critique Mode ON" : "Show Critiques"}
            </button>
          </div>

          {/* Domain Legend */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
          }}>
            {uniqueDomains.map(domain => (
              <div key={domain} style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "clamp(9px, 1.2vw, 11px)",
                color: "#a09060",
              }}>
                <div style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: domainColors[domain],
                  flexShrink: 0,
                }} />
                {domainLabels[domain]}
              </div>
            ))}
          </div>

          {/* SVG Influence Map */}
          <div ref={svgRef} style={{ width: "100%", position: "relative" }}>
            <svg
              viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
              width="100%"
              style={{ display: "block" }}
            >
              <defs>
                <radialGradient id="hegelGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4A017" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="arrowCritique" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#FF6B6B" opacity="0.9" />
                </marker>
                <marker id="arrowTransmit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#D4A017" opacity="0.6" />
                </marker>
              </defs>

              {/* Background glow for Hegel center */}
              <ellipse
                cx={toSVG(50, svgSize.w)}
                cy={toSVG(50, svgSize.h)}
                rx={svgSize.w * 0.18}
                ry={svgSize.h * 0.18}
                fill="url(#hegelGlow)"
              />

              {/* Connections */}
              {connections.map((conn, i) => {
                const fromNode = getNodeById(conn.from);
                const toNode = getNodeById(conn.to);
                if (!fromNode || !toNode) return null;
                const { x1, y1, x2, y2 } = getLinePoints(fromNode, toNode);

                const isTransmission = conn.type === "transmission";
                const isCritique = conn.type === "critique";

                if (criticalMode && isTransmission) return null;
                if (!criticalMode && isCritique) return null;

                const opacity = criticalMode
                  ? (isCritique ? 0.85 : 0.15)
                  : (isTransmission ? 0.6 : 0.15);

                const strokeColor = isCritique ? "#FF6B6B" : "#D4A017";
                const strokeDash = isCritique ? "6,4" : "none";

                return (
                  <path
                    key={i}
                    d={getCurvePath(x1, y1, x2, y2)}
                    stroke={strokeColor}
                    strokeWidth={isCritique ? 1.5 : 1.8}
                    strokeDasharray={strokeDash}
                    fill="none"
                    opacity={opacity}
                    markerEnd={isCritique ? "url(#arrowCritique)" : "url(#arrowTransmit)"}
                    style={{ transition: "opacity 0.4s ease" }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const cx = toSVG(node.x, svgSize.w);
                const cy = toSVG(node.y, svgSize.h);
                const r = Math.max(14, (node.radius / 28) * Math.min(svgSize.w, svgSize.h) * 0.065);
                const isSelected = selectedNode && selectedNode.id === node.id;
                const isHovered = hoveredNode === node.id;
                const isCenter = node.id === "hegel";

                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      if (!isCenter) {
                        setSelectedNode(isSelected ? null : node);
                      }
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: isCenter ? "default" : "pointer" }}
                  >
                    {(isSelected || isHovered) && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 8}
                        fill={node.color}
                        opacity="0.15"
                        style={{ transition: "all 0.2s ease" }}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={isCenter ? "#1a1000" : "#0e0c08"}
                      stroke={node.color}
                      strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 2}
                      filter={isCenter || isSelected ? "url(#glow)" : "none"}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    {isCenter && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r * 0.65}
                        fill="#D4A017"
                        opacity="0.25"
                      />
                    )}
                    <text
                      x={cx}
                      y={cy - (node.sublabel ? 4 : 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={node.color}
                      fontSize={Math.max(8, r * 0.55)}
                      fontFamily="Georgia, serif"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                    {node.sublabel && (
                      <text
                        x={cx}
                        y={cy + r * 0.5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={node.color}
                        fontSize={Math.max(6, r * 0.38)}
                        fontFamily="Georgia, serif"
                        opacity="0.75"
                      >
                        {node.sublabel}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mode explanation */}
          <div style={{
            marginTop: "12px",
            padding: "10px 14px",
            background: criticalMode ? "#1a0808" : "#100e04",
            border: `1px solid ${criticalMode ? "#FF6B6B44" : "#D4A01733"}`,
            borderRadius: "6px",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#a09060",
            lineHeight: 1.5,
          }}>
            {criticalMode
              ? "Critique mode: dashed red arrows show where each tradition pushed back against Hegel — challenging Eurocentrism, idealism, or the promise of reconciliation."
              : "Transmission mode: gold lines trace the flow of Hegelian concepts across two centuries of thought. Toggle 'Show Critiques' to see where traditions resisted."}
          </div>

          {/* Selected node detail */}
          {selectedNode && (
            <div style={{
              marginTop: "20px",
              background: "#12100a",
              border: `2px solid ${selectedNode.color}`,
              borderRadius: "10px",
              padding: "clamp(14px, 2.5vw, 22px)",
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}>
                <div>
                  <div style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    color: selectedNode.color,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>{domainLabels[selectedNode.domain]}</div>
                  <h3 style={{
                    fontSize: "clamp(16px, 2.4vw, 22px)",
                    color: selectedNode.color,
                    margin: 0,
                  }}>{selectedNode.label} <span style={{ fontSize: "0.65em", opacity: 0.7 }}>{selectedNode.sublabel}</span></h3>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#a09060",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}>Hegelian concept: {selectedNode.concept}</div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${selectedNode.color}55`,
                    color: selectedNode.color,
                    borderRadius: "4px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif",
                  }}
                >Close</button>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.7vw, 14px)",
                lineHeight: 1.75,
                color: "#d4c090",
                margin: "0 0 14px 0",
              }}>{selectedNode.description}</p>
              {selectedNode.critique && (
                <div style={{
                  borderTop: "1px solid #2a2010",
                  paddingTop: "12px",
                }}>
                  <div style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    color: "#FF6B6B",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}>Where They Pushed Back</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#c0a080",
                    margin: 0,
                    fontStyle: "italic",
                  }}>{selectedNode.critique}</p>
                </div>
              )}
            </div>
          )}

          {/* Core argument prose */}
          <div style={{
            marginTop: "24px",
            borderTop: "1px solid #2a2010",
            paddingTop: "20px",
          }}>
            <h3 style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "#D4A017",
              margin: "0 0 12px 0",
            }}>Critical Appropriation</h3>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#b8a870",
              margin: "0 0 12px 0",
            }}>
              Hegel himself declared that philosophy is "its time comprehended in thoughts." This means the Hegelian legacy cannot simply be transmitted whole — each generation must rethink freedom, recognition, and alienation in light of its own historical situation. The most productive inheritance is neither dogmatic repetition nor wholesale rejection, but critical appropriation: preserving the dialectical method while interrogating its assumptions.
            </p>
            <p style={{
              fontSize: "clamp(12px, 1.7vw, 14px)",
              lineHeight: 1.8,
              color: "#b8a870",
              margin: 0,
            }}>
              The thinkers on this map did not simply apply Hegel — they transformed him. Marx materialized the dialectic; Kierkegaard individualized it; Fanon decolonized it; Lacan psychoanalyzed it. Even neuroscience has arrived, through entirely different methods, at the Hegelian conclusion that selfhood is irreducibly intersubjective. This convergence from multiple directions suggests something more than historical accident: these ideas persist because they address perennial features of the human condition.
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

        {/* Difficulty Panel */}
        <div style={{
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderLeft: "4px solid #8E44AD",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            color: "#8E44AD",
            textTransform: "uppercase",
            fontVariant: "small-caps",
            marginBottom: "12px",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#c8b8d8",
            margin: "0 0 12px 0",
          }}>
            This is the final movement of the series, and the difficulty it leaves is generative rather than aporetic: the Hegelian legacy has no clean resolution because productive intellectual inheritance requires ongoing critical transformation, not canonical closure. Every appropriation creates a new interpretation, and every critique generates new possibilities. The demand to preserve dialectical insight while rejecting Eurocentric assumptions about historical progress is itself a dialectical task — and one that remains genuinely open.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            lineHeight: 1.7,
            color: "#9a8aaa",
            margin: 0,
            fontStyle: "italic",
          }}>
            This openness is not a failure of the system but its deepest truth: philosophy is always already the task of comprehending one's own time in thought — and the time is never finished arriving.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e0c08",
          border: "1px solid #2a2010",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 28px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              color: "#D4A017",
              textTransform: "uppercase",
              fontVariant: "small-caps",
            }}>Real-World Echoes</span>
            <span style={{ color: "#D4A017" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)",
              borderTop: "1px solid #2a2010",
            }}>
              {[
                {
                  title: "20th-Century Revolutionary Movements",
                  text: "Revolutionary movements in Russia, China, and Cuba drew explicitly on Marxist-Hegelian dialectic — understanding history as driven by contradictions that generate their own supersession. Lenin, Mao, and Che each adapted the dialectical method to specific national conditions, exemplifying the critical appropriation the legacy demands.",
                },
                {
                  title: "Fanon and Colonial Psychology",
                  text: "In Black Skin, White Masks (1952), Frantz Fanon deployed the master–slave dialectic to expose how colonialism imposes a split consciousness on the colonized — forcing them to see themselves through the eyes of the colonizer. This is Hegel's recognition structure analyzed under conditions Hegel never contemplated.",
                },
                {
                  title: "Lacan and the Linguistic Unconscious",
                  text: "Jacques Lacan's seminars throughout the 1950s–70s systematically reread Freud through Hegel, particularly through Alexandre Kojève's influential lectures. The mirror stage, the structure of desire, and the symbolic order all bear the imprint of Hegelian intersubjectivity translated into psychoanalytic register.",
                },
                {
                  title: "The Analytic Hegelian Revival",
                  text: "John McDowell's Mind and World (1994), Robert Brandom's Making It Explicit (1994), and Terry Pinkard's Hegel's Phenomenology (1994) collectively launched a Hegelian revival in Anglophone philosophy, demonstrating that Hegel's insights about conceptual holism, normativity, and second nature remain vital for contemporary debates.",
                },
                {
                  title: "Simone de Beauvoir and the Second Sex",
                  text: "De Beauvoir's landmark work (1949) showed that the Hegelian structure of recognition — where one consciousness constitutes itself as essential by rendering another inessential — operates with particular force in the construction of femininity. Woman is made 'Other' so that Man can achieve selfhood without reciprocity.",
                },
                {
                  title: "Neuroscience and Intersubjective Selfhood",
                  text: "Research on social cognition, mirror neurons, and infant development confirms that self-awareness does not precede social interaction but emerges through it. Babies develop a sense of self by being recognized, named, and responded to — an empirical convergence with Hegel's claim that self-consciousness achieves satisfaction only in another self-consciousness.",
                },
              ].map((echo, i) => (
                <div key={i} style={{
                  padding: "16px 0",
                  borderBottom: i < 5 ? "1px solid #1a1508" : "none",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#D4A017",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}>{echo.title}</div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    lineHeight: 1.7,
                    color: "#a09060",
                    margin: 0,
                  }}>{echo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "16px 0",
          borderTop: "1px solid #2a2010",
        }}>
          <p style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#5a4a20",
            margin: 0,
            letterSpacing: "0.1em",
          }}>
            Part 20 of 20 — End of Hegel's Complete Philosophical System
          </p>
          <p style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            color: "#D4A01755",
            margin: "6px 0 0 0",
            fontStyle: "italic",
          }}>
            "Philosophy is its own time apprehended in thoughts." — G.W.F. Hegel
          </p>
        </div>

      </div>
    </div>
  );
}

export default LivingLegacy;