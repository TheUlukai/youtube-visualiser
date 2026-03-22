function EmpiricalRevolution() {
  const CORE_ARGUMENT = `Against Plato's claim that true knowledge requires turning away from the physical world toward eternal Forms, Aristotle proposed a radical alternative: start with what you can observe, collect data, identify patterns, and only then construct theories — which must be tested and corrected against further observation. This empirical method produced the first systematic biology in human history, including accurate identifications of mammalian characteristics in dolphins and the difference between vertebrates and invertebrates. Yet Aristotle knew observation alone was insufficient; he paired it with conceptual categories (substance, quantity, quality, relation, place, time, position, state, action, affection) to organize what was observed.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const ACCENT = "#0E7490";
  const ACCENT_LIGHT = "#38BDF8";
  const ACCENT_DIM = "#0a3040";
  const ACCENT_MID = "#0E749066";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [draggedConcept, setDraggedConcept] = useState(null);
  const [placedConcept, setPlacedConcept] = useState(null);
  const [activeSide, setActiveSide] = useState(null);
  const [methodStep, setMethodStep] = useState(-1);
  const [methodRunning, setMethodRunning] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  const concepts = [
    { id: "table", label: "Table", icon: "⬛" },
    { id: "justice", label: "Justice", icon: "⚖" },
    { id: "beauty", label: "Beauty", icon: "✦" },
  ];

  const methodSteps = [
    { label: "Observe", desc: "Go out and look at actual things in the world — specimens, behaviors, events." },
    { label: "Categorize", desc: "Sort observations into meaningful groups using conceptual categories." },
    { label: "Theorize", desc: "Construct a general explanation from the patterns you find." },
    { label: "Test", desc: "Check your theory against new observations and cases." },
    { label: "Revise", desc: "Correct the theory where it fails, then cycle again." },
  ];

  const platoAnalysis = {
    table: { title: "The Form of Table", body: "Your wooden table is a pale shadow of the eternal, perfect Form of Table-ness. True knowledge of the table means ascending beyond this imperfect copy to grasp the unchanging ideal that it imperfectly reflects. The physical table is almost irrelevant to genuine understanding." },
    justice: { title: "The Form of Justice", body: "Justice in this city or that court case is a mere approximation of the eternal Form of Justice — absolute, unchanging, perfect. True knowledge of justice requires turning away from messy human affairs toward the pure Idea itself, grasped by intellect alone." },
    beauty: { title: "The Form of Beauty", body: "This beautiful face or sunset is only beautiful because it participates, weakly, in the Form of Beauty — perfect and eternal. Real philosophical inquiry ascends from particular beautiful things to Beauty Itself, leaving the sensory world behind." },
  };

  const aristotleAnalysis = {
    table: { title: "What actual tables do", body: "Examine real tables: wood, stone, metal, small, large, three-legged, four-legged. A table is defined by its function and form together — its substance is the organized matter that enables it to serve its purpose. Categories apply: substance (what it is), quantity (size), quality (material), relation (to chairs), place, state. Theory emerges from specimens." },
    justice: { title: "Justice in actual communities", body: "Observe real constitutions — Aristotle surveyed 158 of them. Justice differs: distributive (fair shares), corrective (rectifying wrongs), reciprocal (fair exchange). Theorize from these cases, then test the theory on new communities. Ethics requires knowing actual human beings, not just an abstract Form." },
    beauty: { title: "Beauty in actual things", body: "Beautiful objects share observable features: order, symmetry, definiteness, appropriate magnitude. Observe tragic plays, fine horses, well-proportioned buildings. Beauty is not a separate realm but a property of things in this world — your theory of beauty must account for why these particular things strike us as beautiful." },
  };

  const runMethod = () => {
    if (methodRunning) return;
    setMethodRunning(true);
    setMethodStep(-1);
    let step = 0;
    const advance = () => {
      setMethodStep(step);
      step++;
      if (step < methodSteps.length) {
        setTimeout(advance, 1100);
      } else {
        setTimeout(() => {
          setMethodRunning(false);
        }, 1200);
      }
    };
    setTimeout(advance, 200);
  };

  const keyConcepts = [
    { id: "empiricism", label: "Empiricism", desc: "Empiricism is the philosophical commitment to grounding all knowledge in sensory experience and observation. For Aristotle, this was not mere data-collection — it was the necessary first step in any inquiry, preventing theory from floating free of reality. Without grounding claims in what can be observed, philosophy becomes mythology." },
    { id: "forms_rejected", label: "Forms Rejected", desc: "Plato's Forms were eternal, perfect, non-physical archetypes that physical things merely imitate. Aristotle rejected their separate existence, arguing that the 'form' of a thing — what makes it what it is — exists only within the thing itself, not in a transcendent realm. This keeps philosophy tethered to the actual world." },
    { id: "categories", label: "Ten Categories", desc: "Aristotle developed ten fundamental categories for organizing observations: substance, quantity, quality, relation, place, time, position, state, action, and affection. These are the irreducible types of things one can say about anything that exists. They give observation a conceptual skeleton without replacing observation with pure abstraction." },
    { id: "systematic_bio", label: "Systematic Biology", desc: "Aristotle's biological works — Historia Animalium, Parts of Animals, Generation of Animals — represent the first systematic attempt to describe and classify the living world. He described over 500 species, performed dissections, and correctly identified dolphins and whales as air-breathing mammals, not fish — a finding not rediscovered for 2,000 years." },
    { id: "theory_balance", label: "Theory-Observation Balance", desc: "Aristotle understood that raw observation without theory is blind, and theory without observation is empty. He developed a method of moving back and forth: observe particulars, form a universal theory, check it against new particulars, revise. This feedback loop is the ancestor of scientific method as we practice it today." },
    { id: "lyceum", label: "The Lyceum", desc: "Aristotle founded his school, the Lyceum, in Athens around 335 BCE — arguably the world's first research institution. Students and collaborators collected biological specimens, surveyed constitutions, and collaborated on systematic inquiries across every field. Knowledge was organized, cumulative, and cooperative rather than individual and oracular." },
  ];

  const echoExamples = [
    { title: "The Lyceum as Proto-University", body: "Aristotle's Lyceum pioneered the idea of organized, collaborative inquiry. Students collected data across disciplines — biology, politics, rhetoric, logic — building a shared body of knowledge. This model of a research community dedicated to systematic inquiry prefigures the modern university and research institute." },
    { title: "Dolphins as Non-Fish", body: "Aristotle's careful observations led him to correctly classify dolphins and whales as viviparous, air-breathing animals fundamentally different from fish. This identification was ignored or forgotten for nearly two millennia, only being confirmed by modern zoology. It stands as a striking vindication of his observational method against pure categorization by appearance." },
    { title: "158 Constitutions Surveyed", body: "Before theorizing about the ideal state in the Politics, Aristotle and his students collected and analyzed 158 actual Greek constitutions. This empirical political science — grounding normative theory in comparative institutional data — is the direct ancestor of modern political science and comparative government studies." },
    { title: "Nancy Cartwright's Aristotelian Physics", body: "Contemporary philosopher Nancy Cartwright argues that modern physics is deeply Aristotelian in spirit: it concerns the causal capacities of specific kinds of things in specific contexts, not universal laws that hold absolutely everywhere. Her 'dappled world' view echoes Aristotle's insistence that nature is varied and context-dependent, not reducible to a single abstract formalism." },
  ];

  const selectedConceptAnalysis = placedConcept && activeSide;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 20%, #0a2a33 0%, #080c10 70%, #0a0a0f 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#d4cfc8",
      padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 2 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            The Empirical Revolution
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle rebuilt philosophy from the ground up by insisting that theory must begin with and be tested against observable reality.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8c0b8", lineHeight: 1.8, margin: 0 }}>
            Plato's philosophy demanded turning away from the changing physical world toward eternal abstract Forms, making theory completely disconnected from actual tables, actual human beings, and actual moral struggles. Philosophy had become an escape from reality rather than an explanation of it.
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


        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid " + ACCENT + "44",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Interactive — Two Worlds of Knowledge
          </div>

          {/* Concept chooser */}
          <div style={{ marginBottom: 18, textAlign: "center" }}>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0" }}>
              Choose a concept, then drop it into Plato's or Aristotle's world to see how each analyzes it:
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {concepts.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setDraggedConcept(c.id); setPlacedConcept(null); setActiveSide(null); }}
                  style={{
                    background: draggedConcept === c.id ? ACCENT : "rgba(14,116,144,0.15)",
                    border: "1px solid " + ACCENT,
                    borderRadius: 20,
                    padding: "6px 18px",
                    color: draggedConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    transition: "all 0.2s",
                  }}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
            {draggedConcept && (
              <p style={{ fontSize: 12, color: ACCENT_LIGHT, marginTop: 8, fontStyle: "italic" }}>
                Now click a side below to place "{concepts.find(c => c.id === draggedConcept)?.label}"
              </p>
            )}
          </div>

          {/* Split screen */}
          <div style={{ display: "flex", gap: 10, alignItems: "stretch", flexWrap: "wrap" }}>
            {/* Plato's side */}
            <div
              onClick={() => { if (draggedConcept) { setPlacedConcept(draggedConcept); setActiveSide("plato"); } }}
              style={{
                flex: "1 1 200px",
                background: activeSide === "plato" ? "rgba(14,116,144,0.12)" : "rgba(20,10,40,0.5)",
                border: activeSide === "plato" ? "2px solid " + ACCENT : "1px solid #3a2a5a",
                borderRadius: 8,
                padding: "clamp(12px, 2vw, 20px)",
                cursor: draggedConcept ? "pointer" : "default",
                transition: "all 0.3s",
                minWidth: 0,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: "#a080d0", marginBottom: 4 }}>
                  Plato's World
                </div>
                <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#8070a0", fontStyle: "italic" }}>
                  Eternal Forms & Pure Reason
                </div>
              </div>

              {/* SVG ethereal realm */}
              <svg viewBox="0 0 220 160" width="100%" style={{ display: "block", maxWidth: 280, margin: "0 auto" }}>
                {/* Stars/ether */}
                {[[20,15],[200,25],[110,10],[50,140],[180,130],[30,90],[200,100]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r={1.2} fill="#c0a0ff" opacity={0.5} />
                ))}
                {/* Glowing perfect shapes (Forms) */}
                <circle cx={110} cy={45} r={28} fill="none" stroke="#b090ff" strokeWidth={1.5} opacity={0.7} />
                <circle cx={110} cy={45} r={20} fill="none" stroke="#c8a8ff" strokeWidth={0.8} opacity={0.5} />
                <text x={110} y={49} textAnchor="middle" fill="#e0d0ff" fontSize={10} fontFamily="Georgia, serif">FORM</text>
                <polygon points="55,95 85,55 115,95" fill="none" stroke="#b090ff" strokeWidth={1.5} opacity={0.6} />
                <polygon points="155,95 175,60 195,95" fill="none" stroke="#c0a0e8" strokeWidth={1.2} opacity={0.5} />
                {/* Shadowy copies below */}
                <line x1={40} y1={108} x2={220} y2={108} stroke="#4a3a6a" strokeWidth={0.8} strokeDasharray="4,3" />
                <rect x={45} y={113} width={30} height={18} rx={2} fill="#2a1a3a" stroke="#4a3a6a" strokeWidth={1} opacity={0.7} />
                <text x={60} y={126} textAnchor="middle" fill="#6a5a8a" fontSize={8} fontFamily="Georgia, serif">shadow</text>
                <rect x={90} y={116} width={24} height={14} rx={2} fill="#2a1a3a" stroke="#3a2a5a" strokeWidth={1} opacity={0.6} />
                <text x={102} y={127} textAnchor="middle" fill="#5a4a7a" fontSize={7} fontFamily="Georgia, serif">copy</text>
                <rect x={140} y={114} width={28} height={16} rx={2} fill="#1a0a2a" stroke="#3a2a5a" strokeWidth={1} opacity={0.5} />
                <text x={154} y={126} textAnchor="middle" fill="#4a3a6a" fontSize={7} fontFamily="Georgia, serif">illusion</text>
                {/* Arrow down */}
                <text x={110} y={105} textAnchor="middle" fill="#7060a0" fontSize={9} fontFamily="Georgia, serif">↓ pale imitations</text>
              </svg>

              {placedConcept && activeSide === "plato" && platoAnalysis[placedConcept] && (
                <div style={{ marginTop: 12, background: "rgba(80,40,120,0.18)", borderRadius: 6, padding: "10px 12px", borderLeft: "3px solid #b090ff" }}>
                  <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#c8a8ff", marginBottom: 6 }}>
                    {platoAnalysis[placedConcept].title}
                  </div>
                  <p style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "#a090c0", lineHeight: 1.7, margin: 0 }}>
                    {platoAnalysis[placedConcept].body}
                  </p>
                </div>
              )}
            </div>

            {/* Aristotle's side */}
            <div
              onClick={() => { if (draggedConcept) { setPlacedConcept(draggedConcept); setActiveSide("aristotle"); } }}
              style={{
                flex: "1 1 200px",
                background: activeSide === "aristotle" ? "rgba(14,116,144,0.12)" : "rgba(5,20,15,0.5)",
                border: activeSide === "aristotle" ? "2px solid " + ACCENT : "1px solid #1a3a2a",
                borderRadius: 8,
                padding: "clamp(12px, 2vw, 20px)",
                cursor: draggedConcept ? "pointer" : "default",
                transition: "all 0.3s",
                minWidth: 0,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 4 }}>
                  Aristotle's World
                </div>
                <div style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#508090", fontStyle: "italic" }}>
                  Observation & Naturalist's Notebook
                </div>
              </div>

              {/* SVG naturalist notebook */}
              <svg viewBox="0 0 220 160" width="100%" style={{ display: "block", maxWidth: 280, margin: "0 auto" }}>
                {/* Notebook page */}
                <rect x={20} y={8} width={180} height={144} rx={4} fill="#f5efd8" opacity={0.08} stroke="#0E7490" strokeWidth={0.8} />
                {/* Ruled lines */}
                {[30,42,54,66,78,90,102,114,126,138].map((y,i) => (
                  <line key={i} x1={30} y1={y} x2={190} y2={y} stroke="#0E7490" strokeWidth={0.3} opacity={0.3} />
                ))}
                {/* Sketched dolphin */}
                <ellipse cx={75} cy={48} rx={28} ry={10} fill="none" stroke="#0E7490" strokeWidth={1.2} opacity={0.8} />
                <path d="M103,44 Q115,48 108,55" fill="none" stroke="#0E7490" strokeWidth={1.2} opacity={0.8} />
                <path d="M47,46 Q40,38 44,42" fill="none" stroke="#0E7490" strokeWidth={1} opacity={0.7} />
                <ellipse cx={79} cy={44} rx={2.5} ry={2.5} fill="#0E7490" opacity={0.6} />
                {/* Label */}
                <text x={30} y={75} fill="#0E7490" fontSize={7.5} fontFamily="Georgia, serif" fontStyle="italic" opacity={0.9}>Delphinus — breathes air,</text>
                <text x={30} y={85} fill="#0E7490" fontSize={7.5} fontFamily="Georgia, serif" fontStyle="italic" opacity={0.9}>warm-blooded. Not a fish.</text>
                {/* Comparative table sketch */}
                <line x1={30} y1={100} x2={190} y2={100} stroke="#0E7490" strokeWidth={0.6} opacity={0.5} />
                <line x1={90} y1={100} x2={90} y2={150} stroke="#0E7490" strokeWidth={0.5} opacity={0.4} />
                <line x1={140} y1={100} x2={140} y2={150} stroke="#0E7490" strokeWidth={0.5} opacity={0.4} />
                <text x={35} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Feature</text>
                <text x={95} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Fish</text>
                <text x={145} y={112} fill="#0E7490" fontSize={6.5} fontFamily="Georgia, serif" opacity={0.7}>Dolphin</text>
                <line x1={30} y1={115} x2={190} y2={115} stroke="#0E7490" strokeWidth={0.4} opacity={0.35} />
                <text x={35} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>Breathes</text>
                <text x={95} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>gills</text>
                <text x={145} y={126} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>lungs</text>
                <text x={35} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>Birth</text>
                <text x={95} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>eggs</text>
                <text x={145} y={138} fill="#0E7490" fontSize={6} fontFamily="Georgia, serif" opacity={0.65}>live young</text>
              </svg>

              {placedConcept && activeSide === "aristotle" && aristotleAnalysis[placedConcept] && (
                <div style={{ marginTop: 12, background: "rgba(14,116,144,0.12)", borderRadius: 6, padding: "10px 12px", borderLeft: "3px solid " + ACCENT }}>
                  <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {aristotleAnalysis[placedConcept].title}
                  </div>
                  <p style={{ fontSize: "clamp(11px, 1.5vw, 12px)", color: "#90b8c0", lineHeight: 1.7, margin: 0 }}>
                    {aristotleAnalysis[placedConcept].body}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Aristotle's Method Cycle */}
          <div style={{ marginTop: 24, borderTop: "1px solid " + ACCENT + "33", paddingTop: 20 }}>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                Aristotle's Method
              </div>
              <button
                onClick={runMethod}
                disabled={methodRunning}
                style={{
                  background: methodRunning ? "rgba(14,116,144,0.2)" : ACCENT,
                  border: "none",
                  borderRadius: 20,
                  padding: "7px 22px",
                  color: methodRunning ? ACCENT_LIGHT : "#f0ead8",
                  cursor: methodRunning ? "default" : "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  letterSpacing: 1,
                  transition: "all 0.2s",
                }}
              >
                {methodRunning ? "Running..." : "Animate the Cycle"}
              </button>
            </div>

            {/* Method steps visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
              {methodSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    background: methodStep >= i ? ACCENT : "rgba(14,116,144,0.1)",
                    border: "1px solid " + (methodStep >= i ? ACCENT : ACCENT + "44"),
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: "clamp(11px, 1.4vw, 13px)",
                    color: methodStep >= i ? "#f0ead8" : SUBTITLE_COLOR,
                    transition: "all 0.4s",
                    textAlign: "center",
                    minWidth: 60,
                  }}>
                    {step.label}
                  </div>
                  {i < methodSteps.length - 1 && (
                    <div style={{ color: methodStep > i ? ACCENT : ACCENT + "44", fontSize: 14, transition: "color 0.4s" }}>→</div>
                  )}
                  {i === methodSteps.length - 1 && methodStep === methodSteps.length - 1 && (
                    <div style={{ color: ACCENT, fontSize: 12 }}>↺</div>
                  )}
                </div>
              ))}
            </div>

            {methodStep >= 0 && methodStep < methodSteps.length && (
              <div style={{
                marginTop: 14,
                background: "rgba(14,116,144,0.1)",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 6,
                padding: "10px 16px",
                textAlign: "center",
                fontSize: "clamp(12px, 1.6vw, 14px)",
                color: "#b0d0d8",
                lineHeight: 1.6,
                transition: "opacity 0.3s",
              }}>
                <span style={{ color: ACCENT_LIGHT, fontWeight: "bold" }}>{methodSteps[methodStep].label}: </span>
                {methodSteps[methodStep].desc}
              </div>
            )}
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: "1px solid " + ACCENT + (hoveredConcept === kc.id ? "ff" : "88"),
                  borderRadius: 16,
                  padding: "5px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div style={{
              background: "rgba(14,116,144,0.1)",
              border: "1px solid " + ACCENT + "55",
              borderRadius: 6,
              padding: "12px 16px",
            }}>
              <div style={{ fontSize: "clamp(12px, 1.6vw, 13px)", fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: "#a8c8d0", lineHeight: 1.75, margin: 0 }}>
                {keyConcepts.find(k => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "55",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8c0b8", lineHeight: 1.8, margin: "0 0 10px 0" }}>
            Aristotle's empiricism relied on careful but unaided observation, which can be deeply misleading. His physics failed because everyday observations about motion and falling objects do not reveal the true underlying laws without controlled experiments and mathematical rigor. A stone dropped from a height does not obviously confirm Newtonian mechanics.
          </p>
          <p style={{ fontSize: "clamp(12px, 1.6vw, 13px)", color: ACCENT_LIGHT, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the question of what kind of reasoning and method can correct for the limits of raw observation...
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              width: "100%",
              background: hoverBtn ? "rgba(14,116,144,0.08)" : "transparent",
              border: "none",
              padding: "clamp(14px, 2vw, 20px) clamp(16px, 3vw, 24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.2s",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            <span style={{ color: ACCENT }}>
              {echoesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {echoExamples.map((ex, i) => (
                <div key={i} style={{
                  borderLeft: "3px solid " + ACCENT,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {ex.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {ex.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 2 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

export default EmpiricalRevolution;