function LogicArchitectureOfThought() {
  const CORE_ARGUMENT = `Before Aristotle, people reasoned and argued but no one had systematically identified the rules that make arguments valid rather than fallacious. Aristotle's invention of the syllogism — two premises yielding a conclusion by formal necessity — was revolutionary because validity depended on structure, not content. He mapped every valid syllogistic form, distinguished universal from particular statements, identified the principle of non-contradiction as an unprovable but indispensable foundation, and recognized that different contexts (demonstrative, dialectical, rhetorical) require different standards of proof. His logic is not merely a tool but a description of how rational thinking actually works.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const ACCENT = "#7C3AED";
  const ACCENT_LIGHT = "#a78bfa";
  const ACCENT_DIM = "#2d1a5e";
  const ACCENT_DARK = "#1a0a3a";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [selectedForm, setSelectedForm] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("builder");
  const [hoveredPill, setHoveredPill] = useState(null);

  // Syllogism builder state
  const [majorTerm, setMajorTerm] = useState("All humans");
  const [majorPred, setMajorPred] = useState("are mortal");
  const [minorTerm, setMinorTerm] = useState("All Greeks");
  const [minorPred, setMinorPred] = useState("are human");
  const [validated, setValidated] = useState(null);
  const [matchedForm, setMatchedForm] = useState(null);
  const [animating, setAnimating] = useState(false);

  const syllogisticForms = [
    {
      id: "barbara",
      name: "Barbara",
      mood: "AAA-1",
      schema: ["All M are P", "All S are M", "All S are P"],
      example: ["All humans are mortal", "All Greeks are human", "All Greeks are mortal"],
      description: "The most celebrated form. Universal affirmatives chained to yield a universal affirmative conclusion.",
    },
    {
      id: "celarent",
      name: "Celarent",
      mood: "EAE-1",
      schema: ["No M are P", "All S are M", "No S are P"],
      example: ["No reptiles are warm-blooded", "All snakes are reptiles", "No snakes are warm-blooded"],
      description: "Universal negative major with universal affirmative minor yields universal negative conclusion.",
    },
    {
      id: "darii",
      name: "Darii",
      mood: "AII-1",
      schema: ["All M are P", "Some S are M", "Some S are P"],
      example: ["All mammals nurse their young", "Some creatures are mammals", "Some creatures nurse their young"],
      description: "Universal affirmative major with particular affirmative minor yields particular affirmative conclusion.",
    },
    {
      id: "ferio",
      name: "Ferio",
      mood: "EIO-1",
      schema: ["No M are P", "Some S are M", "Some S are P"],
      example: ["No fish are warm-blooded", "Some animals are fish", "Some animals are not warm-blooded"],
      description: "Universal negative major with particular affirmative minor yields particular negative conclusion.",
    },
  ];

  function parseQuantifier(phrase) {
    const p = phrase.trim().toLowerCase();
    if (p.startsWith("all ")) return { q: "A", term: p.slice(4).trim() };
    if (p.startsWith("no ")) return { q: "E", term: p.slice(3).trim() };
    if (p.startsWith("some ") && !p.includes(" not ")) return { q: "I", term: p.slice(5).trim() };
    if (p.startsWith("some ") && p.includes(" not ")) return { q: "O", term: p.slice(5).replace(" not", "").trim() };
    return null;
  }

  function parsePredicate(phrase) {
    const p = phrase.trim().toLowerCase();
    if (p.startsWith("are not ")) return { neg: true, term: p.slice(8).trim() };
    if (p.startsWith("are ")) return { neg: false, term: p.slice(4).trim() };
    return null;
  }

  function validateSyllogism() {
    setAnimating(true);
    setTimeout(() => {
      const maj = parseQuantifier(majorTerm);
      const majP = parsePredicate(majorPred);
      const min = parseQuantifier(minorTerm);
      const minP = parsePredicate(minorPred);

      if (!maj || !majP || !min || !minP) {
        setValidated("invalid");
        setMatchedForm(null);
        setAnimating(false);
        return;
      }

      const middleTerm = majP.term;
      const minSubject = min.term;
      const minPredTerm = minP.term;
      const majorSubject = maj.term;

      // Check if minor predicate matches major subject (middle term connection)
      if (minPredTerm !== middleTerm && minPredTerm !== majorSubject) {
        setValidated("invalid");
        setMatchedForm(null);
        setAnimating(false);
        return;
      }

      // Check for Barbara: All M are P, All S are M → All S are P
      if (maj.q === "A" && !majP.neg && min.q === "A" && !minP.neg) {
        const form = syllogisticForms.find(f => f.id === "barbara");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "E" && min.q === "A") {
        const form = syllogisticForms.find(f => f.id === "celarent");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "A" && min.q === "I") {
        const form = syllogisticForms.find(f => f.id === "darii");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      if (maj.q === "E" && min.q === "I") {
        const form = syllogisticForms.find(f => f.id === "ferio");
        setValidated("valid");
        setMatchedForm(form);
        setAnimating(false);
        return;
      }

      setValidated("invalid");
      setMatchedForm(null);
      setAnimating(false);
    }, 400);
  }

  const keyConcepts = [
    {
      id: "syllogism",
      label: "Syllogism",
      desc: "A syllogism is a deductive argument in which a conclusion follows necessarily from two premises sharing a middle term. Aristotle identified 256 possible syllogistic forms and proved which 19 are genuinely valid. The key insight is that validity is purely structural — it depends on the form of the premises, never their content.",
    },
    {
      id: "formal-validity",
      label: "Formal Validity",
      desc: "An argument is formally valid if the conclusion cannot be false when the premises are true, regardless of what the premises are about. This separates validity (structural correctness) from soundness (true premises). Aristotle was the first to make this distinction explicit, enabling logic to function as a content-independent discipline.",
    },
    {
      id: "non-contradiction",
      label: "Non-Contradiction",
      desc: "The principle that no proposition can be both true and false at the same time and in the same respect. Aristotle recognized this as the most certain of all principles — one that cannot be proven from more basic premises but that underlies all rational thought. Without it, no argument could distinguish a valid conclusion from its denial.",
    },
    {
      id: "demonstrative",
      label: "Demonstrative vs. Dialectical",
      desc: "Demonstrative reasoning starts from certain first principles and generates necessary conclusions (as in mathematics). Dialectical reasoning starts from commonly accepted opinions and tests them through dialogue. Aristotle insisted these require different standards: demanding certainty from dialectical argument is a category error, just as accepting mere opinion in mathematics.",
    },
    {
      id: "categorical",
      label: "Categorical Statements",
      desc: "Every syllogism is built from four types of categorical statement: All S are P (universal affirmative, A), No S are P (universal negative, E), Some S are P (particular affirmative, I), Some S are not P (particular negative, O). These four forms — represented by medieval logicians using vowels from 'affirmo' and 'nego' — exhaust the space of simple subject-predicate claims.",
    },
    {
      id: "description-of-thought",
      label: "Logic as Description",
      desc: "For Aristotle, logic was not merely a calculus or formal game but a systematic description of how rational minds actually operate. The Organon (meaning 'instrument') was positioned as a preparatory discipline: before doing philosophy, science, or rhetoric, one must understand the structure of valid thought itself. This gave logic a peculiar double status — both normative and descriptive.",
    },
  ];

  const inputStyle = {
    background: "rgba(124,58,237,0.12)",
    border: `1px solid ${ACCENT}55`,
    borderRadius: 6,
    padding: "8px 12px",
    color: TITLE_COLOR,
    fontFamily: "Georgia, serif",
    fontSize: "clamp(11px,1.6vw,13px)",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  const validColor = validated === "valid" ? "#22c55e" : validated === "invalid" ? "#ef4444" : ACCENT;

  return (
    <div style={{
      background: `radial-gradient(ellipse at 30% 20%, ${ACCENT_DARK} 0%, #0a0a0f 70%)`,
      minHeight: "100vh",
      padding: "clamp(20px,4vw,48px) clamp(12px,3vw,24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
            Part 3 of 15 — Aristotle: Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Logic and the Architecture of Thought
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle invented formal logic as a discipline, creating the first systematic map of valid reasoning that dominated for over two thousand years.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${ACCENT}44`,
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>
            Even Aristotle's empirical method required reasoning from observations to theories, but there were no systematic rules for distinguishing valid inferences from fallacious ones — anyone could argue anything without a formal check.
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
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          {/* Tab Bar */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { id: "builder", label: "Syllogism Builder" },
              { id: "forms", label: "The 4 Classic Forms" },
              { id: "limits", label: "Aristotle's Limit" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? ACCENT : "rgba(124,58,237,0.15)",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 20,
                  padding: "6px 16px",
                  color: activeTab === tab.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* BUILDER TAB */}
          {activeTab === "builder" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 20, lineHeight: 1.7 }}>
                Construct a syllogism. Begin premises with <em>All</em>, <em>No</em>, or <em>Some</em>. Predicates should start with <em>are</em> or <em>are not</em>. The system checks whether a valid First-Figure Aristotelian form results.
              </p>

              <div style={{ display: "grid", gap: 16, marginBottom: 20 }}>
                {/* Major Premise */}
                <div style={{
                  background: "rgba(124,58,237,0.08)",
                  border: `1px solid ${ACCENT}33`,
                  borderRadius: 8,
                  padding: "16px",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
                    Major Premise
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>SUBJECT</div>
                      <input
                        value={majorTerm}
                        onChange={e => { setMajorTerm(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. All humans"
                      />
                    </div>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>PREDICATE</div>
                      <input
                        value={majorPred}
                        onChange={e => { setMajorPred(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. are mortal"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                    "{majorTerm} {majorPred}"
                  </div>
                </div>

                {/* Minor Premise */}
                <div style={{
                  background: "rgba(124,58,237,0.08)",
                  border: `1px solid ${ACCENT}33`,
                  borderRadius: 8,
                  padding: "16px",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
                    Minor Premise
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>SUBJECT</div>
                      <input
                        value={minorTerm}
                        onChange={e => { setMinorTerm(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. All Greeks"
                      />
                    </div>
                    <div style={{ flex: "1 1 140px" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 4, letterSpacing: 1 }}>PREDICATE</div>
                      <input
                        value={minorPred}
                        onChange={e => { setMinorPred(e.target.value); setValidated(null); setMatchedForm(null); }}
                        style={inputStyle}
                        placeholder="e.g. are human"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: "clamp(13px,1.8vw,15px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                    "{minorTerm} {minorPred}"
                  </div>
                </div>
              </div>

              <button
                onClick={validateSyllogism}
                disabled={animating}
                style={{
                  background: ACCENT,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 28px",
                  color: "#f0ead8",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px,1.7vw,14px)",
                  cursor: animating ? "wait" : "pointer",
                  marginBottom: 20,
                  opacity: animating ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {animating ? "Checking..." : "Check Validity"}
              </button>

              {validated && (
                <div style={{
                  background: validated === "valid" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${validColor}55`,
                  borderLeft: `4px solid ${validColor}`,
                  borderRadius: 8,
                  padding: "16px 20px",
                  transition: "all 0.3s",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: validColor, marginBottom: 8 }}>
                    {validated === "valid" ? "Valid Syllogism" : "Invalid Form"}
                  </div>

                  {validated === "valid" && matchedForm ? (
                    <div>
                      <div style={{ fontSize: "clamp(14px,2vw,17px)", color: TITLE_COLOR, marginBottom: 8 }}>
                        Form: <strong style={{ color: ACCENT_LIGHT }}>{matchedForm.name}</strong> ({matchedForm.mood})
                      </div>
                      <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0", lineHeight: 1.7 }}>
                        {matchedForm.description}
                      </p>
                      <div style={{
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: 6,
                        padding: "12px 16px",
                      }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>SCHEMA</div>
                        {matchedForm.schema.map((s, i) => (
                          <div key={i} style={{
                            fontSize: "clamp(12px,1.6vw,14px)",
                            color: i === 2 ? ACCENT_LIGHT : "#d0c8c0",
                            borderTop: i === 2 ? `1px solid ${ACCENT}44` : "none",
                            paddingTop: i === 2 ? 8 : 0,
                            marginTop: i === 2 ? 4 : 0,
                            fontStyle: "italic",
                          }}>
                            {i === 2 ? "∴ " : ""}{s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
                        The premises do not connect through a shared middle term in any valid First-Figure form. Try ensuring the predicate of the major premise matches the predicate of the minor premise (the middle term that links them).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* FORMS TAB */}
          {activeTab === "forms" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 20, lineHeight: 1.7 }}>
                Aristotle identified 256 possible combinations of premise types and proved exactly which are valid. Here are the four canonical First-Figure forms — the clearest and most powerful. Medieval logicians gave them memorable names encoding their structure.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {syllogisticForms.map(form => (
                  <div
                    key={form.id}
                    onClick={() => setSelectedForm(selectedForm === form.id ? null : form.id)}
                    style={{
                      background: selectedForm === form.id ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.07)",
                      border: `1px solid ${selectedForm === form.id ? ACCENT : ACCENT + "33"}`,
                      borderRadius: 8,
                      padding: "14px 18px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: "clamp(14px,2vw,17px)", color: ACCENT_LIGHT, fontWeight: "bold" }}>{form.name}</span>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#6b7280", marginLeft: 10 }}>{form.mood}</span>
                      </div>
                      <div style={{ fontSize: 11, color: ACCENT_LIGHT }}>
                        {selectedForm === form.id ? "▲ collapse" : "▼ expand"}
                      </div>
                    </div>

                    {selectedForm === form.id && (
                      <div style={{ marginTop: 14 }}>
                        <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.7 }}>
                          {form.description}
                        </p>
                        <div style={{ display: "grid", gap: 12 }}>
                          {/* Schema */}
                          <div style={{
                            background: "rgba(0,0,0,0.3)",
                            borderRadius: 6,
                            padding: "12px 16px",
                          }}>
                            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>ABSTRACT SCHEMA</div>
                            {form.schema.map((s, i) => (
                              <div key={i} style={{
                                fontSize: "clamp(12px,1.6vw,14px)",
                                color: i === 2 ? ACCENT_LIGHT : "#d0c8c0",
                                borderTop: i === 2 ? `1px solid ${ACCENT}44` : "none",
                                paddingTop: i === 2 ? 8 : 0,
                                marginTop: i === 2 ? 4 : 0,
                                fontStyle: "italic",
                              }}>
                                {i === 2 ? "∴ " : ""}{s}
                              </div>
                            ))}
                          </div>
                          {/* Example */}
                          <div style={{
                            background: "rgba(0,0,0,0.2)",
                            borderRadius: 6,
                            padding: "12px 16px",
                          }}>
                            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT_LIGHT, marginBottom: 8 }}>CONCRETE EXAMPLE</div>
                            {form.example.map((s, i) => (
                              <div key={i} style={{
                                fontSize: "clamp(12px,1.6vw,14px)",
                                color: i === 2 ? "#a78bfa" : "#b8b0a8",
                                borderTop: i === 2 ? `1px solid ${ACCENT}33` : "none",
                                paddingTop: i === 2 ? 8 : 0,
                                marginTop: i === 2 ? 4 : 0,
                              }}>
                                {i === 2 ? "∴ " : ""}{s}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIMITS TAB */}
          {activeTab === "limits" && (
            <div>
              <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, marginBottom: 24, lineHeight: 1.7 }}>
                Aristotle's logic triumphed for two millennia — yet a simple argument about height exposes its fundamental boundary.
              </p>

              {/* The Failing Argument */}
              <div style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderLeft: "4px solid #ef4444",
                borderRadius: 8,
                padding: "18px 20px",
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#f87171", marginBottom: 12 }}>
                  The Argument That Breaks the Mold
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#fca5a5", marginBottom: 4 }}>
                  John is taller than Mary.
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#fca5a5", marginBottom: 12 }}>
                  Mary is taller than Susan.
                </div>
                <div style={{ fontStyle: "italic", fontSize: "clamp(13px,1.8vw,15px)", color: "#ef4444", borderTop: "1px solid rgba(239,68,68,0.3)", paddingTop: 10 }}>
                  ∴ John is taller than Susan.
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "14px 0 0 0", lineHeight: 1.7 }}>
                  This conclusion is obviously correct — yet no Aristotelian syllogism can validate it. The argument uses a <em>relation</em> ("taller than") that spans two individuals. Aristotelian logic only handles properties belonging to categories. There is no middle term here in the syllogistic sense — only a transitive relation connecting three named individuals.
                </p>
              </div>

              {/* Why It Fails - SVG Diagram */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 12 }}>
                  Why Syllogistic Structure Fails
                </div>
                <svg viewBox="0 0 700 220" width="100%" style={{ maxWidth: 700 }}>
                  <defs>
                    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L8,3 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L8,3 z" fill={ACCENT} />
                    </marker>
                  </defs>

                  {/* Aristotelian side - FAILING */}
                  <text x="170" y="22" textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="Georgia,serif" letterSpacing="2">ARISTOTELIAN (fails)</text>

                  <rect x="110" y="38" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="54" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Subject</text>
                  <text x="170" y="70" textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="Georgia,serif" fontStyle="italic">John</text>

                  <rect x="110" y="100" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="116" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Middle Term?</text>
                  <text x="170" y="132" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">taller than Mary</text>

                  <rect x="110" y="160" width="120" height="40" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                  <text x="170" y="178" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Georgia,serif">Predicate</text>
                  <text x="170" y="194" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">taller than Susan</text>

                  <line x1="170" y1="78" x2="170" y2="98" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowRed)" />
                  <line x1="170" y1="140" x2="170" y2="158" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowRed)" />

                  <text x="295" y="115" textAnchor="middle" fill="#6b7280" fontSize="20" fontFamily="Georgia,serif">✕</text>
                  <text x="295" y="135" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia,serif">no shared</text>
                  <text x="295" y="148" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="Georgia,serif">category</text>

                  {/* Modern side - SUCCEEDING */}
                  <text x="530" y="22" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="12" fontFamily="Georgia,serif" letterSpacing="2">PREDICATE LOGIC (works)</text>

                  <rect x="430" y="38" width="200" height="42" rx="6" fill="rgba(124,58,237,0.15)" stroke={ACCENT} strokeWidth="1" />
                  <text x="530" y="56" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">∀x∀y∀z [ Taller(x,y) ∧</text>
                  <text x="530" y="72" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">Taller(y,z) → Taller(x,z) ]</text>

                  <line x1="530" y1="82" x2="530" y2="108" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

                  <rect x="430" y="110" width="200" height="42" rx="6" fill="rgba(124,58,237,0.1)" stroke={ACCENT} strokeWidth="1" />
                  <text x="530" y="128" textAnchor="middle" fill="#d0c8c0" fontSize="11" fontFamily="Georgia,serif">Taller(John,Mary)</text>
                  <text x="530" y="144" textAnchor="middle" fill="#d0c8c0" fontSize="11" fontFamily="Georgia,serif">Taller(Mary,Susan)</text>

                  <line x1="530" y1="154" x2="530" y2="166" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#arrowPurple)" />

                  <rect x="430" y="168" width="200" height="36" rx="6" fill="rgba(124,58,237,0.2)" stroke={ACCENT} strokeWidth="1.5" />
                  <text x="530" y="184" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="11" fontFamily="Georgia,serif">∴ Taller(John,Susan) ✓</text>
                  <text x="530" y="198" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="Georgia,serif">by transitivity rule</text>
                </svg>
              </div>

              <div style={{
                background: "rgba(124,58,237,0.1)",
                border: `1px solid ${ACCENT}33`,
                borderRadius: 8,
                padding: "14px 18px",
              }}>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>
                  Modern predicate logic — developed by Frege in 1879 and refined by Russell — introduces <strong style={{ color: ACCENT_LIGHT }}>variables</strong> ranging over individuals, <strong style={{ color: ACCENT_LIGHT }}>quantifiers</strong> (∀ and ∃), and <strong style={{ color: ACCENT_LIGHT }}>relation symbols</strong>. This allows the transitivity of "taller than" to be stated as a general axiom and applied mechanically. What Aristotle captured about class-inclusion logic was correct and deep — it simply could not reach the relational structure that mathematics requires.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${ACCENT}88`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(c => c.id === hoveredConcept);
            return kc ? (
              <div style={{
                background: "rgba(0,0,0,0.3)",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 18px",
                marginTop: 4,
              }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>{kc.label}</div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.75 }}>{kc.desc}</p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${ACCENT}44`,
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: "0 0 12px 0", lineHeight: 1.75 }}>
            Aristotelian logic handles categorical statements elegantly but cannot process relational arguments ("John is taller than Mary") or the quantifiers essential to mathematics, leaving vast territories of rational thought — including all of modern mathematical logic — beyond its reach.
          </p>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#6b7280", margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: How does Aristotle extend his framework beyond bare logic to explain how humans actually acquire knowledge of the world?
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
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
              padding: "clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT_LIGHT,
              fontFamily: "Georgia, serif",
            }}>
              Real-World Echoes
            </span>
            {echoesOpen
              ? <ChevronUp size={16} color={ACCENT_LIGHT} />
              : <ChevronDown size={16} color={ACCENT_LIGHT} />
            }
          </button>

          {echoesOpen && (
            <div style={{
              padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Legal Argument and Fallacy Detection</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Every common law jurisdiction implicitly relies on Aristotelian logic when courts identify fallacious reasoning. The formal distinction between a valid argument and a persuasive-but-invalid one — the difference between sound precedent and rhetorical sleight of hand — traces directly to Aristotle's enumeration of fallacies in the Sophistical Refutations. Trial advocacy textbooks still teach the same categorical errors Aristotle named.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Medical Diagnosis as Practical Syllogism</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Physicians routinely practice a form of Barbara: all cases presenting symptom-cluster X indicate disease D; this patient presents symptom-cluster X; therefore this patient likely has disease D. Aristotle himself recognized medicine as the paradigm case of practical syllogistic reasoning, where universal medical knowledge is applied to a particular patient. Modern clinical decision support algorithms formalize exactly this inferential structure.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Computer Science and the Frege-Russell Revolution</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Frege's Begriffsschrift (1879) and Russell and Whitehead's Principia Mathematica (1910) extended Aristotelian logic precisely where it failed — adding quantifiers and relations. This predicate logic became the foundation of computer science: every database query language (SQL uses universal and existential quantifiers), every type system, and every formal verification tool descends from this revolution that Aristotle's limits made necessary.
                </p>
              </div>
              <div style={{ borderLeft: "3px solid " + ACCENT, borderRadius: "0 6px 6px 0", background: ACCENT + "0a", padding: "14px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>Fred Sommers and the Neo-Aristotelian Revival</div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  In the 1960s–80s, philosopher Fred Sommers developed a "traditional formal logic" showing that Aristotelian term logic, properly extended, could handle many relational inferences that supposedly required Fregean predicate logic. His work demonstrated that Aristotle's framework was less limited than the standard narrative suggests — and sparked an active research program in neo-Aristotelian logic that continues in philosophical logic journals today.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 3 of 15 — Aristotle: Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

export default LogicArchitectureOfThought;