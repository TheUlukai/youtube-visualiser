function MetaphysicsSubstanceEssence() {
  const ACCENT = "#B45309";
  const ACCENT_LIGHT = "#D97706";
  const ACCENT_DIM = "#3a1a02";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeView, setActiveView] = useState("aristotle");
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState(null);
  const [draggedProp, setDraggedProp] = useState(null);
  const [hoveredProp, setHoveredProp] = useState(null);
  const [propRings, setPropRings] = useState({
    "animate": "essential",
    "mammal": "essential",
    "four-legged": "essential",
    "breathes": "essential",
    "brown": "accidental",
    "fast": "accidental",
    "scar on flank": "accidental",
    "tall": "accidental",
  });
  const [feedback, setFeedback] = useState(null);

  const essentialDefs = {
    "animate": "Being alive is core to what a horse is.",
    "mammal": "Belonging to mammals defines horse's biological kind.",
    "four-legged": "Quadrupedal structure is part of horse's essential form.",
    "breathes": "Respiration is a mark of animal life — essential.",
    "brown": "Color varies among horses — purely accidental.",
    "fast": "Speed varies by individual — accidental feature.",
    "scar on flank": "A wound's trace — wholly contingent, accidental.",
    "tall": "Height varies; no essential height for horseness.",
  };

  const aristotleEssential = new Set(["animate", "mammal", "four-legged", "breathes"]);

  const keyConcepts = [
    { id: "substance", label: "Substance (ousia)", desc: "For Aristotle, substances are the bedrock of reality — individual things like this horse, this oak tree, this person. Everything else (qualities, relations, quantities) exists only insofar as some substance bears it. Remove the substance and its properties dissolve with it." },
    { id: "essence", label: "Essence vs. Accident", desc: "The essence of a thing is what it must be to be the kind of thing it is — remove an essential property and the thing ceases to exist as that kind. An accident is merely what a thing happens to be — brown, fast, scarred — contingent features that could change without altering the thing's fundamental identity." },
    { id: "primary", label: "Primary vs. Secondary Substance", desc: "Primary substances are individual concrete things (this particular horse). Secondary substances are species and genera (horse, animal). Primary substances are ontologically prior — species exist because individuals exist, not the reverse. Yet both are called 'substance,' creating an enduring tension." },
    { id: "essentialism", label: "Essentialism", desc: "Aristotle's essentialism holds that natural kinds have real essences discoverable by investigation. Science aims at essences, not mere regularities. Ethical norms are grounded in human essence (rational animal). This makes both science and ethics objective rather than conventional." },
    { id: "universals", label: "Problem of Universals", desc: "Are species and genera — secondary substances — truly real, or just names we apply to collections of individuals? Aristotle tried to say universals are real but only in individuals, not apart from them. This middle path satisfied few, launching the medieval realist vs. nominalist controversy." },
    { id: "priority", label: "Ontological Priority", desc: "To say X is ontologically prior to Y means Y depends on X for its existence, not vice versa. Aristotle argues substances are prior to their properties: the color brown depends on the horse to exist, but not the reverse. This asymmetry structures his entire metaphysics." },
  ];

  const realWorldEchoes = [
    { title: "Aquinas vs. Ockham: Realism vs. Nominalism", body: "Medieval philosophy split over whether secondary substances (species, genera) are real. Aquinas followed Aristotle in affirming that universals have a genuine footing in things. William of Ockham famously denied this — only individuals exist; universals are mere names (nomina). This debate shaped logic, theology, and politics for centuries." },
    { title: "Hume's Bundle Theory", body: "David Hume challenged the very concept of substance as a substratum bearing properties. When you examine experience, he argued, you find only bundles of perceptions — no persistent 'thing' underlying them. This struck at Aristotle's primary substances and forced subsequent philosophy to reconstruct personal identity, causation, and objecthood without a substance core." },
    { title: "Quantum Mechanics and Individual Identity", body: "Identical quantum particles (electrons, photons) lack the individual identity Aristotle's primary substances require. Two electrons of the same type are not merely similar — they are numerically indistinguishable in ways classical objects are not. This challenges whether the category of 'individual substance' applies at the fundamental level of nature." },
    { title: "E.J. Lowe and Contemporary Substance Metaphysics", body: "Philosopher E.J. Lowe argued in the late 20th century that a four-category ontology — individual substances, kinds, attributes, and modes — was both necessary and coherent. Against modern eliminativism, Lowe held that substances and natural kinds are irreducible to physics, reviving Aristotelian metaphysics in sophisticated analytic form." },
  ];

  function handlePropClick(prop) {
    if (selectedProp === prop) {
      setSelectedProp(null);
      setFeedback(null);
      return;
    }
    setSelectedProp(prop);
    setFeedback(null);
  }

  function moveProp(prop, targetRing) {
    const current = propRings[prop];
    if (current === targetRing) return;
    const isAristotelianEssential = aristotleEssential.has(prop);
    let msg = "";
    if (targetRing === "essential" && !isAristotelianEssential) {
      msg = `Aristotle would disagree: "${prop}" can vary without changing what it is to be a horse. It's accidental.`;
    } else if (targetRing === "accidental" && isAristotelianEssential) {
      msg = `Aristotle would object: removing "${prop}" would make it no longer a horse. This is essential to horseness.`;
    } else if (targetRing === "essential" && isAristotelianEssential) {
      msg = `Correct: "${prop}" is essential — a horse without this is not truly a horse.`;
    } else {
      msg = `Correct: "${prop}" is accidental — it can change without affecting what makes a horse a horse.`;
    }
    setPropRings(prev => ({ ...prev, [prop]: targetRing }));
    setFeedback({ prop, msg, correct: (targetRing === "essential") === isAristotelianEssential });
  }

  const essentialProps = Object.entries(propRings).filter(([, v]) => v === "essential").map(([k]) => k);
  const accidentalProps = Object.entries(propRings).filter(([, v]) => v === "accidental").map(([k]) => k);

  const blurAmount = activeView === "modern" ? 1 : 0;

  // SVG layout
  const cx = 300, cy = 240;
  const r1 = 70, r2 = 140, r3 = 200;

  function polarToXY(angle, r) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function distributeOnRing(items, r, spread = 360) {
    return items.map((item, i) => {
      const angle = items.length === 1 ? 0 : (i / items.length) * spread;
      const pos = polarToXY(angle, r);
      return { item, ...pos };
    });
  }

  const essentialPositions = distributeOnRing(essentialProps, (r1 + r2) / 2 + 10);
  const accidentalPositions = distributeOnRing(accidentalProps, (r2 + r3) / 2 + 5);

  function getPillColor(ring, prop) {
    if (hoveredProp === prop) return ACCENT_LIGHT;
    if (ring === "essential") return ACCENT;
    return "#4a3520";
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 40% 30%, #2a1000 0%, #0a0a0f 100%)`,
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 4 of 15 — Aristotle: Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Metaphysics: Substance, Essence, and What Really Exists
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle mapped the fundamental structure of reality by distinguishing substances from properties, and essential natures from accidental features.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(20,10,0,0.7)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,15px)", color: "#d4c9b8", lineHeight: 1.75 }}>
            Aristotle's empirical method needed conceptual frameworks to organize observations, but what are those frameworks tracking? Are the categories and kinds we observe — horse, tree, human — genuinely real features of the world, or human impositions?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(15,8,0,0.8)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 12,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: "clamp(14px,2.5vw,18px)", color: ACCENT_LIGHT, marginBottom: 6 }}>
              The Structure of a Substance
            </div>
            <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
              Click any property to learn about it. Drag it to the other ring to test whether Aristotle would call it essential or accidental.
            </p>
            {/* Toggle */}
            <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 4 }}>
              {["aristotle", "modern"].map(v => (
                <button
                  key={v}
                  onClick={() => { setActiveView(v); setFeedback(null); }}
                  style={{
                    background: activeView === v ? ACCENT : "rgba(30,15,0,0.8)",
                    color: activeView === v ? "#f0ead8" : SUBTITLE_COLOR,
                    border: `1px solid ${ACCENT}66`,
                    padding: "7px 18px",
                    cursor: "pointer",
                    fontSize: "clamp(11px,1.5vw,13px)",
                    fontFamily: "Georgia, serif",
                    borderRadius: v === "aristotle" ? "6px 0 0 6px" : "0 6px 6px 0",
                    transition: "background 0.2s",
                  }}
                >
                  {v === "aristotle" ? "Aristotle's View" : "Modern Biology's View"}
                </button>
              ))}
            </div>
          </div>

          {activeView === "modern" && (
            <div style={{
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}55`,
              borderRadius: 8,
              padding: "10px 16px",
              marginBottom: 14,
              fontSize: "clamp(12px,1.6vw,13px)",
              color: "#c8b89a",
              lineHeight: 1.65,
            }}>
              <strong style={{ color: ACCENT_LIGHT }}>Modern biology's view:</strong> Species have no sharp essential core. Traits form probabilistic clusters — the rings blur. A "horse" is any population member sharing a statistical family resemblance, not a fixed essence. The boundary between essential and accidental dissolves.
            </div>
          )}

          <svg viewBox="0 0 600 480" width="100%" style={{ display: "block", margin: "0 auto", maxWidth: 600 }}>
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#1a0800" />
                <stop offset="100%" stopColor="#080508" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="softBlur">
                <feGaussianBlur stdDeviation={activeView === "modern" ? "5" : "0"} />
              </filter>
            </defs>

            <rect x="0" y="0" width="600" height="480" fill="url(#bgGrad)" rx="10" />

            {/* Outer accidental ring */}
            <circle
              cx={cx} cy={cy} r={r3}
              fill={activeView === "modern" ? `${ACCENT}18` : "#1a0800"}
              stroke={activeView === "modern" ? "#88440088" : `${ACCENT}55`}
              strokeWidth={activeView === "modern" ? "1.5" : "1.5"}
              strokeDasharray={activeView === "modern" ? "6 4" : "none"}
              filter={activeView === "modern" ? "url(#softBlur)" : "none"}
            />
            {/* Essential ring */}
            <circle
              cx={cx} cy={cy} r={r2}
              fill="#120800"
              stroke={activeView === "modern" ? `${ACCENT}44` : `${ACCENT}88`}
              strokeWidth={activeView === "modern" ? "1" : "2"}
              strokeDasharray={activeView === "modern" ? "4 4" : "none"}
              filter={activeView === "modern" ? "url(#softBlur)" : "none"}
            />
            {/* Core substance circle */}
            <circle cx={cx} cy={cy} r={r1} fill={`${ACCENT}22`} stroke={ACCENT} strokeWidth="2" filter="url(#glow)" />

            {/* Ring labels */}
            <text x={cx} y={cy - r2 - 8} textAnchor="middle" fill={activeView === "modern" ? `${ACCENT}88` : ACCENT_LIGHT} fontSize="12" fontFamily="Georgia, serif">
              {activeView === "modern" ? "Trait Cluster (blurred)" : "Accidental Properties"}
            </text>
            <text x={cx} y={cy - r1 - 76} textAnchor="middle" fill={activeView === "modern" ? `${ACCENT}66` : `${ACCENT}cc`} fontSize="11" fontFamily="Georgia, serif">
              {activeView === "modern" ? "Probable Core" : "Essential Properties"}
            </text>

            {/* Horse icon in center */}
            <text x={cx} y={cy - 12} textAnchor="middle" fontSize="32" fontFamily="Georgia, serif">🐴</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill={ACCENT_LIGHT} fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">HORSE</text>
            <text x={cx} y={cy + 32} textAnchor="middle" fill={`${ACCENT}99`} fontSize="10" fontFamily="Georgia, serif">primary substance</text>

            {/* Modern blur overlay */}
            {activeView === "modern" && (
              <>
                <circle cx={cx} cy={cy} r={r2 + 15} fill="none" stroke={`${ACCENT}33`} strokeWidth="20" opacity="0.5" />
                <circle cx={cx} cy={cy} r={r1 + 15} fill="none" stroke={`${ACCENT}22`} strokeWidth="15" opacity="0.4" />
              </>
            )}

            {/* Essential property nodes */}
            {essentialPositions.map(({ item, x, y }) => (
              <g key={item}
                style={{ cursor: "pointer" }}
                onClick={() => handlePropClick(item)}
                onMouseEnter={() => setHoveredProp(item)}
                onMouseLeave={() => setHoveredProp(null)}
              >
                <rect
                  x={x - 38} y={y - 13}
                  width={76} height={26}
                  rx={13}
                  fill={selectedProp === item ? ACCENT : (hoveredProp === item ? `${ACCENT}cc` : `${ACCENT}44`)}
                  stroke={selectedProp === item ? ACCENT_LIGHT : ACCENT}
                  strokeWidth="1.5"
                  filter={selectedProp === item ? "url(#glow)" : "none"}
                />
                <text x={x} y={y + 5} textAnchor="middle" fill="#f0ead8" fontSize="10.5" fontFamily="Georgia, serif">
                  {item}
                </text>
                {/* drag hint */}
                <text x={x} y={y + 20} textAnchor="middle" fill={`${ACCENT}88`} fontSize="8" fontFamily="Georgia, serif">
                  click
                </text>
              </g>
            ))}

            {/* Accidental property nodes */}
            {accidentalPositions.map(({ item, x, y }) => (
              <g key={item}
                style={{ cursor: "pointer" }}
                onClick={() => handlePropClick(item)}
                onMouseEnter={() => setHoveredProp(item)}
                onMouseLeave={() => setHoveredProp(null)}
              >
                <rect
                  x={x - 40} y={y - 13}
                  width={80} height={26}
                  rx={13}
                  fill={selectedProp === item ? "#4a2a0a" : (hoveredProp === item ? "#3a2010" : "#1e1008")}
                  stroke={selectedProp === item ? ACCENT_LIGHT : `${ACCENT}66`}
                  strokeWidth="1.5"
                  strokeDasharray={activeView === "modern" ? "4 3" : "none"}
                />
                <text x={x} y={y + 5} textAnchor="middle" fill={selectedProp === item ? "#f0ead8" : SUBTITLE_COLOR} fontSize="10.5" fontFamily="Georgia, serif">
                  {item}
                </text>
                <text x={x} y={y + 20} textAnchor="middle" fill={`${ACCENT}66`} fontSize="8" fontFamily="Georgia, serif">
                  click
                </text>
              </g>
            ))}
          </svg>

          {/* Selected property detail + move buttons */}
          {selectedProp && (
            <div style={{
              background: "rgba(30,12,0,0.85)",
              border: `1px solid ${ACCENT}66`,
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 12,
            }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6 }}>
                "{selectedProp}"
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "clamp(12px,1.6vw,13px)", color: "#c8b89a", lineHeight: 1.65 }}>
                {essentialDefs[selectedProp]}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => moveProp(selectedProp, "essential")}
                  style={{
                    background: propRings[selectedProp] === "essential" ? ACCENT : "rgba(40,20,0,0.8)",
                    color: "#f0ead8",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 6,
                    padding: "7px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(11px,1.5vw,13px)",
                  }}
                >
                  Move to Essential Ring
                </button>
                <button
                  onClick={() => moveProp(selectedProp, "accidental")}
                  style={{
                    background: propRings[selectedProp] === "accidental" ? "#4a2a0a" : "rgba(40,20,0,0.8)",
                    color: "#f0ead8",
                    border: `1px solid ${ACCENT}66`,
                    borderRadius: 6,
                    padding: "7px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(11px,1.5vw,13px)",
                  }}
                >
                  Move to Accidental Ring
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 8,
              background: feedback.correct ? "rgba(20,40,10,0.7)" : "rgba(40,10,10,0.7)",
              border: `1px solid ${feedback.correct ? "#5a8a2a" : "#8a2a2a"}`,
              fontSize: "clamp(12px,1.6vw,13px)",
              color: feedback.correct ? "#a8d888" : "#e88888",
              lineHeight: 1.65,
            }}>
              {feedback.correct ? "✓ " : "✗ "}{feedback.msg}
            </div>
          )}

          {/* Legend */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: ACCENT, border: `1px solid ${ACCENT_LIGHT}` }} />
              <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>Essential (inner ring)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1e1008", border: `1px solid ${ACCENT}66` }} />
              <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>Accidental (outer ring)</span>
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT : ACCENT + "88"}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              marginTop: 14,
              padding: "14px 18px",
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}55`,
              borderRadius: 8,
            }}>
              <div style={{ fontSize: "clamp(13px,1.8vw,14px)", color: ACCENT_LIGHT, fontWeight: "bold", marginBottom: 6 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: "#c8b89a", lineHeight: 1.75 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(20,10,0,0.7)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ margin: "0 0 10px 0", fontSize: "clamp(13px,1.8vw,15px)", color: "#d4c9b8", lineHeight: 1.75 }}>
            Modern science abandoned essences in favor of structural descriptions and causal laws — gold is just any atom with 79 protons, species have no Aristotelian essence but only statistical trait distributions. This raises the question of whether Aristotelian metaphysics is compatible with science at all.
          </p>
          <p style={{ margin: 0, fontSize: "clamp(12px,1.6vw,13px)", color: `${ACCENT}cc`, lineHeight: 1.6, fontStyle: "italic" }}>
            This pressure forces the next development: if essences dissolve into causal structures, can purpose and teleology survive in the scientific worldview?
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(15,8,0,0.7)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Georgia, serif",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {realWorldEchoes.map((echo, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: `${ACCENT}0a`,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {echo.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {echo.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 4 of 15 — Aristotle: Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

export default MetaphysicsSubstanceEssence;