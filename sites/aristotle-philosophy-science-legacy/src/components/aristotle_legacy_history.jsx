function AristotleLegacyHistory() {
  const ACCENT = "#A16207";
  const ACCENT_LIGHT = "#D4A017";
  const ACCENT_DIM = "#3a2402";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#c8b89a";
  const BG = "radial-gradient(ellipse at 40% 30%, #2a1600 0%, #0a0a0f 100%)";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(1), 300);
    return () => clearTimeout(t);
  }, []);

  const keyConcepts = [
    { id: "transmission", label: "Transmission of Texts", desc: "After Aristotle's death, his lecture notes were stored in a cellar, damaged by moisture, and nearly lost. Andronicus of Rhodes edited and organized the surviving corpus around 60 BCE, creating the canonical texts we still read — meaning almost everything we have of Aristotle passed through this single editorial act. Without it, Western philosophy would look radically different." },
    { id: "averroes", label: "Islamic Aristotelianism", desc: "Averroes (Ibn Rushd) and Avicenna (Ibn Sina) preserved Aristotle's complete works when European Christians knew only fragments of his logic. Averroes wrote such authoritative commentaries that Dante simply called him 'the Commentator.' Islamic philosophers extended, corrected, and deeply engaged Aristotle rather than merely copying him, producing original metaphysics and epistemology in dialogue with his framework." },
    { id: "aquinas", label: "Aquinas's Synthesis", desc: "Thomas Aquinas achieved the most ambitious intellectual synthesis of the medieval world: fusing Aristotle's pagan philosophy with Christian theology. He argued that reason (Aristotle) and faith (scripture) were complementary routes to truth. This made Aristotle the official philosopher of the Catholic Church, embedding his categories — substance, form, essence, potency — into the very structure of Christian doctrine." },
    { id: "scholastic", label: "Scholastic Dominance", desc: "Medieval universities organized their entire curricula around Aristotle's works. Logic, natural philosophy, ethics, and metaphysics were all taught through his texts. This dominance was so total that 'the Philosopher' with no further identification meant Aristotle alone. For three centuries, to dispute Aristotle was to dispute the educational establishment itself." },
    { id: "revolution", label: "Scientific Revolution", desc: "Galileo, Descartes, and Newton defined their project partly through rejecting Aristotelian physics — his doctrines of natural place, the unmoved mover, and the distinction between celestial and terrestrial motion. Yet the rejection was selective: his logic, ethics, rhetoric, and biological concepts retained influence. The scientific revolution overthrew Aristotle's answers while leaving his questions standing." },
    { id: "revival", label: "20th Century Revival", desc: "MacIntyre's After Virtue (1981) sparked a neo-Aristotelian renaissance in ethics by arguing that modern moral philosophy had collapsed without the teleological framework Aristotle provided. Nussbaum's capabilities approach applied Aristotelian flourishing to development economics. Philosophers of mind rediscovered hylomorphism; metaphysicians revisited his essentialism — showing his questions outlast his answers." },
  ];

  const historyNodes = [
    { id: "death", year: -322, label: "Death & Near-Loss", shortLabel: "322 BCE", x: 4, figure: "Aristotle dies in Chalcis. His library and lecture notes are bequeathed to Theophrastus, then descend through a chain of custody that ends in a cellar — stored to avoid Macedonian confiscation, damaged by moisture and insects. For two centuries the corpus nearly vanishes.", kept: "Biological observation methods, logical works circulate separately", transformed: "Lecture notes deteriorate and are partially lost", rejected: "Public dialogues (now lost) once made him famous" },
    { id: "andronicus", year: -60, label: "Andronicus of Rhodes", shortLabel: "~60 BCE", x: 11, figure: "Andronicus edits the surviving lecture notes into the canonical corpus, inventing the term 'metaphysics' (ta meta ta physika — 'the things after the physics'). Every Aristotle text we read passed through his editorial judgment. He organized works by topic, created the titles, and shaped how posterity would understand Aristotle's system.", kept: "Surviving lecture notes on logic, physics, biology, ethics, metaphysics", transformed: "Raw lecture notes organized into treatises with imposed structure", rejected: "Public dialogues and popular writings left aside" },
    { id: "avicenna", year: 1000, label: "Avicenna (Ibn Sina)", shortLabel: "~1000 CE", x: 30, figure: "Avicenna claims to have read the Metaphysics forty times without understanding it until he read Al-Farabi's commentary. He then produced original extensions of Aristotle in medicine, psychology, and metaphysics — his distinction between essence and existence became central to medieval theology. He read Aristotle as a basis for a complete philosophical system integrating science, theology, and mysticism.", kept: "Hylomorphism, logic, theory of the soul, natural philosophy", transformed: "Essence/existence distinction extended far beyond Aristotle", rejected: "Aristotle's denial of individual immortality" },
    { id: "averroes", year: 1180, label: "Averroes (Ibn Rushd)", shortLabel: "1180 CE", x: 38, figure: "Averroes wrote short, middle, and long commentaries on virtually every Aristotle text, earning the title 'the Commentator' in Dante's Divine Comedy. He argued for the unity of the intellect — one shared active intellect for all humanity — which scandalized Christian theologians. His translations and commentaries were the primary vehicle through which Aristotle entered the Latin West in the 12th century.", kept: "Aristotelian logic as the definitive method of reasoning", transformed: "Psychology radically revised toward collective intellect", rejected: "Personal individual immortality of the soul" },
    { id: "aquinas", year: 1265, label: "Thomas Aquinas", shortLabel: "1265 CE", x: 46, figure: "Aquinas wrote detailed commentaries on Aristotle and integrated his philosophy into Christian theology in the Summa Theologica. He argued that Aristotle's account of final causality and the unmoved mover was compatible with — indeed pointed toward — Christian creation and providence. He made Aristotle the official philosopher of Catholicism, a status formalized at the Council of Trent and confirmed by Leo XIII's encyclical Aeterni Patris (1879).", kept: "Form, matter, substance, actuality, potency, teleology, the good", transformed: "Prime mover becomes the Christian God of creation ex nihilo", rejected: "Aristotle's eternity of the world (incompatible with Genesis)" },
    { id: "universities", year: 1300, label: "Scholastic Universities", shortLabel: "1300 CE", x: 52, figure: "Medieval universities — Paris, Oxford, Bologna — organized their curricula entirely around Aristotle. The Arts faculty taught his logic, natural philosophy, and ethics as the foundation for theology and law. Being a university-educated person meant having absorbed Aristotle. The Condemnation of 1277, which censured 219 propositions (many Aristotelian), shows how central — and how dangerous — his dominance had become.", kept: "Entire curriculum structure, logic, natural philosophy, ethics", transformed: "Aristotle's naturalism filtered through theological necessity", rejected: "His most materialist and anti-providential doctrines" },
    { id: "galileo", year: 1632, label: "Galileo", shortLabel: "1632 CE", x: 65, figure: "Galileo's Dialogue Concerning the Two Chief World Systems (1632) is organized as a debate between a defender of Aristotle (Simplicio) and a Copernican. He systematically demolishes Aristotelian physics: things don't move toward natural places, the heavens are not made of different stuff from earth, heavier objects don't fall faster. His method of mathematical idealization directly contradicts Aristotle's physics. Yet Galileo retained Aristotelian categories of demonstration and logical argument.", kept: "Logical rigor, structure of scientific demonstration", transformed: "Empirical observation combined with mathematics replaces qualitative physics", rejected: "Natural place, natural motion, qualitative physics, geocentrism" },
    { id: "newton", year: 1687, label: "Newton", shortLabel: "1687 CE", x: 72, figure: "Newton's Principia Mathematica (1687) completed the overthrow of Aristotelian cosmology. Universal gravitation showed that the same laws govern celestial and terrestrial motion — obliterating Aristotle's distinction. Inertia contradicted natural motion. The clockwork universe replaced the teleological cosmos. Yet Newtonian science retained something Aristotelian: the search for universal necessary laws governing natural kinds.", kept: "Universal laws of nature, systematic explanation of motion", transformed: "Teleology replaced by mechanical causation and mathematics", rejected: "Teleological cosmology, natural place, celestial/terrestrial distinction" },
    { id: "macintyre", year: 1981, label: "MacIntyre", shortLabel: "1981 CE", x: 88, figure: "Alasdair MacIntyre's After Virtue (1981) argued that modern moral philosophy had collapsed into incoherence because it inherited Aristotelian moral concepts (virtue, human nature, the good) while rejecting the teleological framework that made them intelligible. His proposed solution: return to an Aristotelian virtue ethics grounded in practices and community. This sparked a major revival of virtue ethics in Anglo-American philosophy.", kept: "Virtue, teleology, human flourishing, the role of community", transformed: "Aristotelian ethics reconstructed for pluralist modern societies", rejected: "Aristotle's biological essentialism and exclusion of women and slaves" },
    { id: "nussbaum", year: 1995, label: "Nussbaum & Revival", shortLabel: "1995 CE", x: 96, figure: "Martha Nussbaum's capabilities approach applies Aristotelian flourishing (eudaimonia) to development economics and human rights, asking what capabilities a dignified human life requires. Simultaneously: David Braine and others revive hylomorphism in philosophy of mind; Kit Fine and E.J. Lowe revive Aristotelian essentialism in metaphysics; neo-Aristotelian naturalism flourishes in ethics. Aristotle's questions — what is a substance? what is the good? what is the soul? — prove more durable than his answers.", kept: "Eudaimonia, capabilities, function, essence, hylomorphism", transformed: "Applied to global justice, disability, development economics", rejected: "Specific biological claims, hierarchical politics, exclusionary definitions" },
  ];

  const riverPath = (t) => {
    const steps = [
      { pct: 0.04, width: 18, y: 0.5 },
      { pct: 0.11, width: 4, y: 0.5 },
      { pct: 0.20, width: 6, y: 0.5 },
      { pct: 0.30, width: 12, y: 0.42 },
      { pct: 0.38, width: 16, y: 0.45 },
      { pct: 0.46, width: 22, y: 0.5 },
      { pct: 0.52, width: 26, y: 0.5 },
      { pct: 0.65, width: 14, y: 0.45 },
      { pct: 0.72, width: 10, y: 0.48 },
      { pct: 0.88, width: 24, y: 0.5 },
      { pct: 0.96, width: 32, y: 0.5 },
    ];
    return steps;
  };

  const eraLabels = [
    { label: "Greek", pct: 0.07, color: "#8B6914" },
    { label: "Hellenistic", pct: 0.18, color: "#8B6914" },
    { label: "Islamic Golden Age", pct: 0.34, color: "#C17A20" },
    { label: "Medieval", pct: 0.49, color: "#C17A20" },
    { label: "Scientific Revolution", pct: 0.685, color: "#6B7C93" },
    { label: "Modern Revival", pct: 0.92, color: "#A16207" },
  ];

  const streams = [
    { label: "Virtue Ethics", x: 90, y: 0.32 },
    { label: "Phil. of Mind", x: 93, y: 0.42 },
    { label: "Metaphysics", x: 92, y: 0.52 },
    { label: "Political Phil.", x: 90, y: 0.62 },
    { label: "Rhetoric", x: 88, y: 0.70 },
  ];

  const W = 900;
  const H = 340;

  const getNodeX = (node) => (node.x / 100) * W;
  const getNodeY = () => H * 0.5;

  const riverSegments = () => {
    const pts = riverPath();
    return pts.map(p => ({ x: p.pct * W, y: p.y * H, w: p.width }));
  };

  const segs = riverSegments();

  const buildRiverPoly = () => {
    const top = segs.map(s => `${s.x},${s.y - s.w}`).join(" ");
    const bot = [...segs].reverse().map(s => `${s.x},${s.y + s.w}`).join(" ");
    return top + " " + bot;
  };

  const buildCellarDip = () => {
    const x1 = 0.06 * W, x2 = 0.22 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.72} ${x2} ${H * 0.5}`;
  };

  const buildIslamicBulge = () => {
    const x1 = 0.25 * W, x2 = 0.55 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.25} ${x2} ${H * 0.5}`;
  };

  const buildRevDip = () => {
    const x1 = 0.58 * W, x2 = 0.80 * W;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${H * 0.5} Q ${midX} ${H * 0.68} ${x2} ${H * 0.5}`;
  };

  const buildFanStreams = () => {
    return streams.map((s, i) => {
      const startX = 0.82 * W;
      const endX = (s.x / 100) * W;
      const endY = s.y * H;
      return `M ${startX} ${H * 0.5} Q ${(startX + endX) / 2 + 10} ${endY - 10} ${endX} ${endY}`;
    });
  };

  const fanPaths = buildFanStreams();

  return (
    <div style={{
      background: BG,
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 14 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Aristotle's Legacy and His Influence Through History
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            From near-disappearance after his death to Islamic preservation, medieval synthesis with Christianity, and modern revival, Aristotle's influence is the story of Western intellectual history itself.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: 0 }}>
            Aristotle's comprehensive system needed transmission across time, cultural translation across radically different civilizations, and integration with religious worldviews that his pagan philosophy never anticipated — and his errors needed eventual overthrow without losing his genuine insights.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 10,
          padding: "clamp(14px,2.5vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            The River of Influence — 322 BCE to Present
          </div>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#9a8870", margin: "0 0 18px 0", lineHeight: 1.6 }}>
            Click any figure on the timeline to see how they engaged with Aristotle — what they kept, transformed, or rejected.
          </p>

          {/* SVG Timeline */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <svg viewBox={`0 0 ${W} ${H + 80}`} width="100%" style={{ display: "block", minWidth: 320 }}>
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4a2800" stopOpacity="0.3" />
                  <stop offset="25%" stopColor={ACCENT} stopOpacity="0.5" />
                  <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.7" />
                  <stop offset="65%" stopColor="#4a6080" stopOpacity="0.4" />
                  <stop offset="80%" stopColor="#3a3a2a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="islamicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity="0.0" />
                  <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="softglow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background eras */}
              <rect x="0" y="0" width={W * 0.24} height={H} fill="#1a0e00" opacity="0.4" />
              <rect x={W * 0.24} y="0" width={W * 0.34} height={H} fill="#1a1000" opacity="0.3" />
              <rect x={W * 0.58} y="0" width={W * 0.24} height={H} fill="#0a1020" opacity="0.4" />
              <rect x={W * 0.82} y="0" width={W * 0.18} height={H} fill="#100e00" opacity="0.3" />

              {/* Era labels */}
              {eraLabels.map((era, i) => (
                <text key={i} x={era.pct * W} y={H - 10} textAnchor="middle"
                  fontSize="9" fill={era.color} opacity="0.7" fontFamily="Georgia, serif"
                  letterSpacing="1">
                  {era.label}
                </text>
              ))}

              {/* Main river body */}
              <polygon
                points={buildRiverPoly()}
                fill="url(#riverGrad)"
                opacity={animStep >= 1 ? 0.85 : 0}
                style={{ transition: "opacity 1.5s ease" }}
              />

              {/* Cellar dip annotation */}
              <path d={buildCellarDip()} fill="none" stroke="#6b4010" strokeWidth="2"
                strokeDasharray="5,4" opacity="0.6" />
              <text x={W * 0.13} y={H * 0.82} textAnchor="middle" fontSize="8.5"
                fill="#8B6010" fontFamily="Georgia, serif" fontStyle="italic">
                underground (cellar)
              </text>

              {/* Islamic bulge annotation */}
              <path d={buildIslamicBulge()} fill="none" stroke={ACCENT_LIGHT} strokeWidth="1.5"
                strokeDasharray="6,3" opacity="0.5" />
              <text x={W * 0.40} y={H * 0.18} textAnchor="middle" fontSize="8.5"
                fill={ACCENT_LIGHT} fontFamily="Georgia, serif" fontStyle="italic">
                preserved & extended
              </text>

              {/* Scientific revolution dip */}
              <path d={buildRevDip()} fill="none" stroke="#5a7090" strokeWidth="2"
                strokeDasharray="5,4" opacity="0.5" />
              <text x={W * 0.69} y={H * 0.75} textAnchor="middle" fontSize="8.5"
                fill="#7090a0" fontFamily="Georgia, serif" fontStyle="italic">
                contested & reduced
              </text>

              {/* Fan streams */}
              {fanPaths.map((path, i) => (
                <path key={i} d={path} fill="none"
                  stroke={ACCENT_LIGHT} strokeWidth="1.2" opacity="0.55"
                  strokeDasharray="4,3" />
              ))}
              {streams.map((s, i) => (
                <text key={i}
                  x={(s.x / 100) * W + 4}
                  y={s.y * H + 4}
                  fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif" opacity="0.85">
                  {s.label}
                </text>
              ))}

              {/* Timeline axis */}
              <line x1="0" y1={H * 0.5} x2={W} y2={H * 0.5} stroke="#3a2a10" strokeWidth="1" opacity="0.4" />

              {/* Historical nodes */}
              {historyNodes.map((node, i) => {
                const nx = getNodeX(node);
                const ny = getNodeY();
                const isSelected = selectedNode && selectedNode.id === node.id;
                const isHovered = hoveredNode === node.id;
                const r = isSelected ? 11 : isHovered ? 9 : 7;
                return (
                  <g key={node.id} style={{ cursor: "pointer" }}
                    onClick={() => setSelectedNode(isSelected ? null : node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}>
                    {(isSelected || isHovered) && (
                      <circle cx={nx} cy={ny} r={r + 8} fill={ACCENT} opacity="0.2" filter="url(#softglow)" />
                    )}
                    <circle cx={nx} cy={ny} r={r}
                      fill={isSelected ? ACCENT_LIGHT : isHovered ? ACCENT : "#2a1600"}
                      stroke={isSelected ? ACCENT_LIGHT : ACCENT}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      filter={isSelected ? "url(#glow)" : "none"}
                    />
                    <line x1={nx} y1={ny - r} x2={nx} y2={H * 0.5 - 28}
                      stroke={ACCENT} strokeWidth="0.8" opacity="0.45" />
                    <text x={nx} y={H * 0.5 - 32} textAnchor="middle"
                      fontSize="8.5" fill={isSelected ? ACCENT_LIGHT : "#b09060"}
                      fontFamily="Georgia, serif"
                      fontWeight={isSelected ? "bold" : "normal"}>
                      {node.shortLabel}
                    </text>
                    <text x={nx} y={H * 0.5 - 42} textAnchor="middle"
                      fontSize="8" fill={isSelected ? TITLE_COLOR : "#9a8060"}
                      fontFamily="Georgia, serif">
                      {node.label.length > 14 ? node.label.slice(0, 13) + "…" : node.label}
                    </text>
                  </g>
                );
              })}

              {/* Time axis labels */}
              <text x={4} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif">322 BCE</text>
              <text x={W - 4} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif" textAnchor="end">Present</text>
              <text x={W * 0.5} y={H + 14} fontSize="9" fill="#7a6040" fontFamily="Georgia, serif" textAnchor="middle">1000 CE</text>
            </svg>
          </div>

          {/* Selected node profile */}
          {selectedNode && (
            <div style={{
              marginTop: 20,
              background: "rgba(20,12,0,0.7)",
              border: `1px solid ${ACCENT}66`,
              borderRadius: 8,
              padding: "clamp(14px,2.5vw,20px)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>
                    Figure Profile
                  </div>
                  <div style={{ fontSize: "clamp(15px,2.2vw,18px)", color: ACCENT_LIGHT, marginBottom: 4, fontWeight: "bold" }}>
                    {selectedNode.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#7a6040", marginBottom: 12 }}>{selectedNode.shortLabel}</div>
                </div>
                <button onClick={() => setSelectedNode(null)} style={{
                  background: "transparent", border: `1px solid ${ACCENT}44`,
                  color: ACCENT, borderRadius: 4, padding: "4px 10px",
                  cursor: "pointer", fontSize: 11, fontFamily: "Georgia, serif"
                }}>close ×</button>
              </div>
              <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: "0 0 16px 0" }}>
                {selectedNode.figure}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                {[
                  { label: "Kept", text: selectedNode.kept, color: "#4a8040" },
                  { label: "Transformed", text: selectedNode.transformed, color: ACCENT },
                  { label: "Rejected", text: selectedNode.rejected, color: "#804040" },
                ].map(col => (
                  <div key={col.label} style={{
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${col.color}44`,
                    borderRadius: 6,
                    padding: "10px 12px",
                  }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: col.color, marginBottom: 6 }}>{col.label}</div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#a09878", lineHeight: 1.7 }}>{col.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedNode && (
            <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#6a5838", fontStyle: "italic" }}>
              Select a figure above to see their relationship with Aristotle's corpus
            </div>
          )}
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => {
              const active = hoveredConcept === kc.id;
              return (
                <button key={kc.id}
                  onClick={() => setHoveredConcept(active ? null : kc.id)}
                  style={{
                    background: active ? ACCENT : "transparent",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: active ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(11px,1.5vw,13px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "background 0.2s, color 0.2s",
                  }}>
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(k => k.id === hoveredConcept);
            return kc ? (
              <div style={{
                marginTop: 12,
                padding: "14px 16px",
                background: `${ACCENT}11`,
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>{kc.label}</div>
                <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: 0 }}>{kc.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, lineHeight: 1.8, margin: "0 0 10px 0" }}>
            Aristotle's dominance became so absolute that his errors were treated as dogmas, actively blocking scientific progress — and even today the question of how much of his system can be selectively retrieved without its systematic unity remains unresolved, raising the question of whether neo-Aristotelian philosophy is genuine retrieval or mere appropriation of vocabulary.
          </p>
          <p style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#8a7050", margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: an assessment of what in Aristotle endures, and what the final shape of his legacy in contemporary thought actually looks like.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%", background: "transparent", border: "none",
              padding: "clamp(12px,2vw,18px) clamp(16px,3vw,24px)",
              cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Andronicus of Rhodes (~60 BCE)", body: "Andronicus edited scattered lecture notes into the organized corpus that defines Aristotle for us today. He invented the word 'metaphysics' accidentally — it simply meant 'the books placed after the Physics.' Every Aristotle text we read is a product of his editorial decisions, meaning our entire relationship to Aristotle is mediated by a first-century scholar whose selection criteria we cannot fully reconstruct." },
                { title: "Averroes and the Latin West (12th century)", body: "Averroes' commentaries on Aristotle — translated into Latin alongside Aristotle's own texts — gave medieval Christian scholars their first systematic access to the full Aristotelian corpus. His doctrine of the unity of the intellect scandalized Christian thinkers (it seemed to deny individual immortality) but his logical and scientific commentaries became indispensable. He is the figure who made Aristotle a live presence in Western universities." },
                { title: "Galileo and the Dialogue (1632)", body: "Galileo's Dialogue Concerning the Two Chief World Systems dramatizes the conflict between Aristotelian natural philosophy and the emerging mathematical science of nature. The Aristotelian character, Simplicio, argues from natural place and qualitative motion; Salviati (Galileo's voice) argues from experiment and mathematics. The Dialogue was a cultural weapon: it made Aristotelian physics look like the position of a simpleton. The Inquisition understood the point." },
                { title: "MacIntyre's After Virtue (1981)", body: "MacIntyre's book is the founding document of contemporary virtue ethics and one of the most influential works of moral philosophy in the 20th century. He argued that modern ethics — Kantian, utilitarian, emotivist — had inherited Aristotelian vocabulary without Aristotelian teleology, producing incoherence. His solution was a return to the Aristotelian tradition, reinterpreted through the lens of social practices and communities. This sparked a generation of neo-Aristotelian work in ethics, political philosophy, and philosophy of religion." },
              ].map((card) => (
                <div key={card.title} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: `${ACCENT}0a`,
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>{card.title}</div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>{card.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 14 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

export default AristotleLegacyHistory;