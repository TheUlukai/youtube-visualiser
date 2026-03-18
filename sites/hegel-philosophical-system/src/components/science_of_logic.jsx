function ScienceOfLogic() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(["becoming"]));
  const [scrubPosition, setScrubPosition] = useState(0);
  const [echosOpen, setEchosOpen] = useState(false);
  const [beingHovered, setBeingHovered] = useState(false);
  const [nothingHovered, setNothingHovered] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const mergeRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(800);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setSvgWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const bothHovered = beingHovered || nothingHovered;

  useEffect(() => {
    let frame;
    if (bothHovered) {
      const animate = () => {
        setMergeProgress(p => {
          if (p >= 1) return 1;
          frame = requestAnimationFrame(animate);
          return Math.min(1, p + 0.04);
        });
      };
      frame = requestAnimationFrame(animate);
    } else {
      const animate = () => {
        setMergeProgress(p => {
          if (p <= 0) return 0;
          frame = requestAnimationFrame(animate);
          return Math.max(0, p - 0.04);
        });
      };
      frame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frame);
  }, [bothHovered]);

  const accent = "#0F766E";

  const keyConcepts = [
    { id: "pure_being", label: "Pure Being", desc: "The Science of Logic begins with pure Being — the most abstract, indeterminate thought possible. Being with no further specification is so empty that it immediately collapses into its opposite, Nothing. This is not a logical error but the first movement of thought: indeterminacy cannot remain stable and must generate its own contradiction." },
    { id: "nothing", label: "Nothing", desc: "Pure Nothing — the complete absence of determination — is just as indeterminate as pure Being. Hegel's insight is that they are identical in content (both are utterly empty) yet different in intent (Being aims at presence, Nothing at absence). This identity-in-difference is the engine that drives thought forward into Becoming." },
    { id: "becoming", label: "Becoming", desc: "Becoming is the first concrete thought: the unity of Being and Nothing in transition. Things come to be (Being passing into Nothing) and pass away (Nothing passing into Being). Becoming is the first genuine category because it holds the contradiction of Being and Nothing together, rather than claiming either alone." },
    { id: "determinate_being", label: "Determinate Being", desc: "From Becoming, thought arrives at determinate being (Dasein) — being with a specific quality, a 'this rather than that.' Quality leads to Quantity (determinacy that is externally comparable), and Quantity leads to Measure (the qualitatively significant quantity, as in a physical threshold). These three sections constitute the Logic of Being." },
    { id: "logic_of_essence", label: "Logic of Essence", desc: "The Logic of Essence explores the category of Ground — things as having hidden inner natures that appear in their outward form. Essence, Appearance, and Actuality are the three moments: essence grounds appearance, appearance expresses essence, and their unity is actual, causally interconnected reality. This is the logic of scientific explanation." },
    { id: "absolute_idea", label: "Logic of the Concept / Absolute Idea", desc: "The Logic of the Concept is the highest section: the concept is self-determining, not derived from anything outside itself. It culminates in the Absolute Idea — the self-comprehending whole of all logical categories. The Absolute Idea then releases itself into Nature, beginning the transition from Logic to the Philosophy of Nature." },
  ];

  const nodes = {
    being: {
      id: "being", label: "Pure Being", division: "being",
      x: 0.28, y: 0.06,
      desc: "The most empty, presuppositionless concept possible. Pure Being has no determination, no content — it is the attempt to think sheer immediacy itself.",
      contradiction: "Pure Being, utterly without content, is indistinguishable from Pure Nothing.",
      children: []
    },
    nothing: {
      id: "nothing", label: "Pure Nothing", division: "being",
      x: 0.72, y: 0.06,
      desc: "The complete absence of determination. Pure Nothing, like Pure Being, has no content, no difference — it is simply emptiness itself.",
      contradiction: "Pure Nothing, the complete absence of all, is identical to Pure Being in its utter emptiness.",
      children: []
    },
    becoming: {
      id: "becoming", label: "Becoming", division: "being",
      x: 0.5, y: 0.17,
      desc: "Being and Nothing each pass over into the other. Their unity-in-opposition is not static but a restless movement: this is Becoming — the first concrete logical category.",
      contradiction: "Becoming contains within itself two moments (coming-to-be, ceasing-to-be) which tend to cancel each other, producing a stable result.",
      children: ["determinate_being"]
    },
    determinate_being: {
      id: "determinate_being", label: "Determinate Being", division: "being",
      x: 0.5, y: 0.29,
      desc: "Becoming sublates itself into stable Determinate Being (Dasein): being with a specific quality. To be determinate is to be this and not that — quality as such.",
      contradiction: "Quality implies its other (negation of quality), leading to the problem of the One and the Many, and ultimately to Quantity.",
      children: ["quality", "quantity"]
    },
    quality: {
      id: "quality", label: "Quality", division: "being",
      x: 0.3, y: 0.41,
      desc: "The immediate character of something — what makes it THIS thing. Quality is identical with being: to lose its quality is for a thing to cease to be what it is.",
      contradiction: "Quality generates its negation. Something is defined by what it is NOT. This otherness is internal to it, driving toward Quantity.",
      children: []
    },
    quantity: {
      id: "quantity", label: "Quantity", division: "being",
      x: 0.7, y: 0.41,
      desc: "Being whose determination is external and indifferent to it. Quantity can change without the thing ceasing to be what it is — unlike Quality.",
      contradiction: "Quantity and Quality are not independent: at a certain quantum, a qualitative change occurs. This unity is Measure.",
      children: ["measure"]
    },
    measure: {
      id: "measure", label: "Measure", division: "being",
      x: 0.5, y: 0.53,
      desc: "The unity of Quality and Quantity — the specific quantum that constitutes a thing's quality. Measure is where Being shows its inner necessity most concretely.",
      contradiction: "Measure implies something that persists through qualitative changes, a substrate behind appearances. This drives us into the Logic of Essence.",
      children: ["essence_core"]
    },
    essence_core: {
      id: "essence_core", label: "Essence", division: "essence",
      x: 0.5, y: 0.63,
      desc: "Essence is Being reflected into itself — the 'inner' reality behind outer appearance. It introduces the categorial oppositions of inner/outer, identity/difference, appearance/reality.",
      contradiction: "Essence splits into Identity and Difference. Pure identity contains difference within itself; pure difference presupposes identity. These generate the logic of Ground and Existence.",
      children: ["identity_diff", "ground"]
    },
    identity_diff: {
      id: "identity_diff", label: "Identity & Difference", division: "essence",
      x: 0.28, y: 0.74,
      desc: "Identity (A=A) seems pure but secretly contains difference (A is NOT not-A). Difference cannot be stated without identity. Together they generate Contradiction as a category.",
      contradiction: "Essence as identity-in-difference points to something that grounds appearances — a Cause behind Effects.",
      children: []
    },
    ground: {
      id: "ground", label: "Ground & Cause", division: "essence",
      x: 0.72, y: 0.74,
      desc: "The Essence as Ground explains Existence. Causal relations belong here: a cause is the ground of its effect. But finite causality leads to infinite regress.",
      contradiction: "The infinite causal chain of Essence points beyond itself to a self-grounding reality — the Concept that gives itself its own content.",
      children: ["concept_node"]
    },
    concept_node: {
      id: "concept_node", label: "The Concept", division: "concept",
      x: 0.5, y: 0.84,
      desc: "The Concept (Begriff) is the unity of Universality, Particularity, and Individuality. It is not merely subjective thought but the self-determining structure of reality itself.",
      contradiction: "The Concept must actualize itself through Judgment and Syllogism, ultimately achieving perfect self-unity in the Absolute Idea.",
      children: ["absolute_idea"]
    },
    absolute_idea: {
      id: "absolute_idea", label: "Absolute Idea", division: "concept",
      x: 0.5, y: 0.94,
      desc: "The Absolute Idea is the complete, self-transparent system of all logical categories — the Concept that fully comprehends itself. It is Logic's culmination and must now externalize itself as Nature.",
      contradiction: "The Absolute Idea is purely logical, abstract, self-contained. But self-externalization into Nature introduces contingency, space, and time — the very opposites of pure logic.",
      children: []
    }
  };

  const divisionColors = {
    being: "#D97706",
    essence: "#0F766E",
    concept: "#7C3AED"
  };

  const divisionLabels = {
    being: "Logic of Being",
    essence: "Logic of Essence",
    concept: "Logic of the Concept"
  };

  const nodeOrder = [
    "being", "nothing", "becoming", "determinate_being",
    "quality", "quantity", "measure", "essence_core",
    "identity_diff", "ground", "concept_node", "absolute_idea"
  ];

  const visibleCount = Math.round(scrubPosition * (nodeOrder.length - 2)) + 2;
  const visibleNodes = new Set(nodeOrder.slice(0, visibleCount));

  const isNodeVisible = (id) => {
    if (id === "being" || id === "nothing") return true;
    return visibleNodes.has(id);
  };

  const getAllEdges = () => {
    const edges = [];
    edges.push({ from: "being", to: "becoming", special: true });
    edges.push({ from: "nothing", to: "becoming", special: true });
    Object.values(nodes).forEach(node => {
      node.children.forEach(child => {
        edges.push({ from: node.id, to: child, special: false });
      });
    });
    return edges;
  };

  const SVG_H = 900;
  const SVG_W = 800;

  const getX = (nx) => nx * SVG_W;
  const getY = (ny) => ny * SVG_H;

  const selectedData = selectedNode ? nodes[selectedNode] : null;

  const handleNodeClick = (id) => {
    if (id === "being" || id === "nothing") return;
    setSelectedNode(prev => prev === id ? null : id);
  };

  const scrubHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setScrubPosition(Math.max(0, Math.min(1, x)));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 20%, #0d3330 0%, #0a0a0f 70%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#e8e8e8"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(16px, 3vw, 28px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.5vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0F766E",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>Part 5 of 20 — The Science of Logic</div>
          <h1 style={{
            fontSize: "clamp(20px, 4vw, 36px)",
            fontWeight: "normal",
            color: "#f0f0f0",
            margin: "0 0 8px 0",
            lineHeight: 1.2
          }}>The Logic of Pure Thought</h1>
          <p style={{
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#a0b0af",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.6
          }}>Hegel's Science of Logic derives the fundamental categories of thought and reality from the internal contradictions of pure Being itself.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0e1a19",
          border: "1px solid #1a3330",
          borderLeft: "4px solid #0F766E",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 3vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0F766E",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#c8d8d6",
            margin: 0
          }}>
            If the Absolute is the systematic whole of Logic-Nature-Spirit, we need to see exactly how the logical dimension develops: <em>how does pure thought generate its own content without arbitrary assumptions?</em> Any starting point we choose seems to smuggle in presuppositions from outside — yet philosophy demands a truly presuppositionless beginning. The system's claim to necessity hangs entirely on whether this is possible.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#0b1817",
          border: "1px solid #1a3330",
          borderRadius: "12px",
          padding: "clamp(14px, 2.5vw, 28px)",
          marginBottom: "clamp(20px, 3vw, 32px)"
        }}>
          <div style={{
            fontSize: "clamp(14px, 2.2vw, 18px)",
            color: "#e0ede8",
            marginBottom: "8px",
            letterSpacing: "0.05em"
          }}>The Dialectical Unfolding of Logical Categories</div>
          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#7a9a96",
            marginBottom: "16px",
            lineHeight: 1.6,
            margin: "0 0 16px 0"
          }}>
            Hover between Being and Nothing to witness their identity generate Becoming. Scrub the timeline to watch the logic unfold. Click any node to read its contradiction and necessity.
          </p>

          {/* Division Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            {Object.entries(divisionLabels).map(([key, label]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: divisionColors[key]
                }} />
                <span style={{
                  fontSize: "clamp(10px, 1.4vw, 12px)",
                  color: "#8aada8",
                  letterSpacing: "0.05em"
                }}>{label}</span>
              </div>
            ))}
          </div>

          {/* SVG Graph */}
          <div ref={svgContainerRef} style={{ width: "100%", position: "relative" }}>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              width="100%"
              style={{ display: "block" }}
            >
              <defs>
                <filter id="glow-being">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-nothing">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-selected">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="merge-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D97706" stopOpacity={mergeProgress * 0.6} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Merge glow between Being and Nothing */}
              {mergeProgress > 0 && (
                <ellipse
                  cx={SVG_W * 0.5}
                  cy={SVG_H * 0.06}
                  rx={SVG_W * 0.25 * mergeProgress}
                  ry={40 * mergeProgress}
                  fill="url(#merge-glow)"
                  opacity={mergeProgress}
                />
              )}

              {/* Merge label */}
              {mergeProgress > 0.3 && (
                <text
                  x={SVG_W * 0.5}
                  y={SVG_H * 0.06 + 5}
                  textAnchor="middle"
                  fill={`rgba(217,119,6,${mergeProgress})`}
                  fontSize="14"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                >
                  indistinguishable...
                </text>
              )}

              {/* Edges */}
              {getAllEdges().map((edge, i) => {
                const fromNode = nodes[edge.from];
                const toNode = nodes[edge.to];
                if (!isNodeVisible(edge.from) || !isNodeVisible(edge.to)) return null;
                const x1 = getX(fromNode.x);
                const y1 = getY(fromNode.y);
                const x2 = getX(toNode.x);
                const y2 = getY(toNode.y);
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const color = divisionColors[toNode.division];
                const isSpecial = edge.special;
                return (
                  <g key={i}>
                    <path
                      d={`M ${x1} ${y1} Q ${midX} ${midY - 10} ${x2} ${y2}`}
                      fill="none"
                      stroke={color}
                      strokeWidth={isSpecial ? "1.5" : "1"}
                      strokeOpacity={isSpecial ? 0.4 + mergeProgress * 0.4 : 0.3}
                      strokeDasharray={isSpecial ? "4 4" : "none"}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {Object.values(nodes).map(node => {
                if (!isNodeVisible(node.id)) return null;
                const x = getX(node.x);
                const y = getY(node.y);
                const color = divisionColors[node.division];
                const isSelected = selectedNode === node.id;
                const isHov = hoveredNode === node.id;
                const isBeing = node.id === "being";
                const isNothing = node.id === "nothing";
                const specialOpacity = (isBeing || isNothing)
                  ? Math.max(0.35, 1 - mergeProgress * 0.65)
                  : 1;
                const radius = (isBeing || isNothing) ? 32 : isSelected ? 36 : 28;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: (isBeing || isNothing) ? "default" : "pointer" }}
                    onMouseEnter={() => {
                      setHoveredNode(node.id);
                      if (isBeing) setBeingHovered(true);
                      if (isNothing) setNothingHovered(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      if (isBeing) setBeingHovered(false);
                      if (isNothing) setNothingHovered(false);
                    }}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {/* Outer glow ring for selected */}
                    {isSelected && (
                      <circle
                        cx={x} cy={y} r={radius + 10}
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.4"
                        filter="url(#glow-selected)"
                      />
                    )}
                    {/* Hover ring */}
                    {isHov && !isSelected && (
                      <circle
                        cx={x} cy={y} r={radius + 8}
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.35"
                      />
                    )}
                    {/* Main circle */}
                    <circle
                      cx={x} cy={y} r={radius}
                      fill="#0b1817"
                      stroke={color}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                      strokeOpacity={specialOpacity}
                      fillOpacity={specialOpacity}
                    />
                    {/* Inner fill */}
                    <circle
                      cx={x} cy={y} r={radius - 2}
                      fill={color}
                      fillOpacity={isSelected ? 0.25 : isHov ? 0.18 : 0.08}
                    />
                    {/* Label */}
                    <text
                      x={x} y={y - 4}
                      textAnchor="middle"
                      fill={color}
                      fillOpacity={specialOpacity}
                      fontSize={isBeing || isNothing ? "13" : "12"}
                      fontFamily="Georgia, serif"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {node.label.split(" ").length > 2
                        ? node.label.split(" ").slice(0, 2).join(" ")
                        : node.label}
                    </text>
                    {node.label.split(" ").length > 2 && (
                      <text
                        x={x} y={y + 10}
                        textAnchor="middle"
                        fill={color}
                        fillOpacity={specialOpacity}
                        fontSize="12"
                        fontFamily="Georgia, serif"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {node.label.split(" ").slice(2).join(" ")}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Node Detail */}
          {selectedData && (
            <div style={{
              background: "#0d2420",
              border: `1px solid ${divisionColors[selectedData.division]}44`,
              borderLeft: `3px solid ${divisionColors[selectedData.division]}`,
              borderRadius: "8px",
              padding: "clamp(12px, 2vw, 20px)",
              marginTop: "16px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px"
              }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: divisionColors[selectedData.division],
                    display: "block",
                    marginBottom: "4px"
                  }}>{divisionLabels[selectedData.division]}</span>
                  <div style={{
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: "#f0f0f0",
                    fontWeight: "normal"
                  }}>{selectedData.label}</div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{
                    background: "none",
                    border: `1px solid ${divisionColors[selectedData.division]}44`,
                    color: "#7a9a96",
                    cursor: "pointer",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "clamp(10px, 1.3vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >close</button>
              </div>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#c0d4d0",
                lineHeight: 1.7,
                margin: "0 0 12px 0"
              }}>{selectedData.desc}</p>
              <div style={{
                borderTop: `1px solid ${divisionColors[selectedData.division]}22`,
                paddingTop: "12px"
              }}>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7a9a96",
                  display: "block",
                  marginBottom: "6px"
                }}>Internal Contradiction</span>
                <p style={{
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  color: "#9ab8b4",
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: "italic"
                }}>{selectedData.contradiction}</p>
              </div>
            </div>
          )}

          {/* Hover tooltip for Being/Nothing */}
          {(hoveredNode === "being" || hoveredNode === "nothing") && (
            <div style={{
              background: "#0d2420",
              border: "1px solid #D97706",
              borderRadius: "8px",
              padding: "clamp(10px, 1.8vw, 16px)",
              marginTop: "12px"
            }}>
              <p style={{
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#c8a060",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic"
              }}>
                {hoveredNode === "being"
                  ? nodes.being.desc
                  : nodes.nothing.desc}
              </p>
              <p style={{
                fontSize: "clamp(11px, 1.4vw, 13px)",
                color: "#8a7040",
                lineHeight: 1.6,
                margin: "8px 0 0 0"
              }}>Move toward the other node to witness their indistinguishability generate Becoming...</p>
            </div>
          )}

          {/* Timeline Scrubber */}
          <div style={{ marginTop: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0F766E"
              }}>Logical Progression</span>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                color: "#5a7a76"
              }}>
                {nodeOrder.slice(2, visibleCount).length} categories unfolded
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "24px",
                background: "#071210",
                borderRadius: "12px",
                border: "1px solid #1a3330",
                cursor: "pointer",
                position: "relative",
                userSelect: "none"
              }}
              onClick={scrubHandler}
              onMouseMove={(e) => { if (e.buttons === 1) scrubHandler(e); }}
            >
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${scrubPosition * 100}%`,
                background: "linear-gradient(90deg, #D97706, #0F766E, #7C3AED)",
                borderRadius: "12px",
                transition: "width 0.1s ease",
                opacity: 0.7
              }} />
              <div style={{
                position: "absolute",
                top: "50%",
                left: `${scrubPosition * 100}%`,
                transform: "translate(-50%, -50%)",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#f0f0f0",
                border: "2px solid #0F766E",
                boxShadow: "0 0 8px #0F766E"
              }} />
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "6px"
            }}>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#D97706" }}>Pure Being</span>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#0F766E" }}>Measure</span>
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", color: "#7C3AED" }}>Absolute Idea</span>
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
          background: "#0e1420",
          border: "1px solid #1a2040",
          borderLeft: "4px solid #3b4fa0",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6080d0",
            marginBottom: "12px",
            fontWeight: "bold"
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: 1.75,
            color: "#b0c0d8",
            margin: "0 0 12px 0"
          }}>
            The Absolute Idea is logically complete — a perfectly self-transparent system of all necessary categories, requiring nothing outside itself. Yet it remains purely abstract, moving in the ether of pure thought. How do these entirely logical categories appear in the concrete, contingent, spatial-temporal world of Nature? The Logic is not yet Nature; the necessity of pure thought is not yet the contingency of falling stones and rotating planets.
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#7088b0",
            fontStyle: "italic",
            margin: 0
          }}>
            This pressure forces the next development: the Absolute Idea must freely release itself into its own otherness — Nature — and the question becomes how pure logical structure can be the inner essence of the apparently senseless contingency of the natural world.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#0e1817",
          border: "1px solid #1a3330",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              color: "#0F766E",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}>Real-World Echoes</span>
            {echosOpen
              ? <ChevronUp size={16} color="#0F766E" />
              : <ChevronDown size={16} color="#0F766E" />}
          </button>
          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)"
            }}>
              <div style={{
                borderTop: "1px solid #1a3330",
                paddingTop: "clamp(12px, 2vw, 20px)"
              }}>
                <div style={{
                  background: "#071410",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  marginBottom: "12px",
                  borderLeft: "3px solid #0F766E"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#0F766E",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>Mathematical Derivation</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab8b4",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    A mathematician beginning from axioms derives entire structures without empirical input — just as Hegel's Logic derives all categories from pure Being. The necessity feels non-arbitrary, self-generating; each theorem follows from internal compulsion rather than external discovery. Yet the result is somehow about reality.
                  </p>
                </div>
                <div style={{
                  background: "#071410",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)",
                  borderLeft: "3px solid #7C3AED"
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9060c8",
                    marginBottom: "6px",
                    fontStyle: "italic"
                  }}>Scientific Frameworks Becoming Concrete</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    color: "#9ab8b4",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    Abstract physics (pure equations) becomes concrete only through application — the empty formalism of quantum mechanics acquires determinacy when interpreted against experimental results. The movement from abstract framework to concrete application mirrors Hegel's logic of categories becoming increasingly determinate through their own internal contradictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.3vw, 12px)",
          color: "#3a5550",
          paddingBottom: "8px"
        }}>
          Hegel, Science of Logic (1812–16) · Interactive exploration of dialectical necessity
        </div>

      </div>
    </div>
  );
}

export default ScienceOfLogic;