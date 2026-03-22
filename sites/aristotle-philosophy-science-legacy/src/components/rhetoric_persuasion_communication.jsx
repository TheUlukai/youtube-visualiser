function RhetoricPersuasionCommunication() {
  const CORE_ARGUMENT = `Aristotle defined rhetoric as the art of discovering available means of persuasion in any given situation — not mere manipulation but a systematic discipline applicable wherever communication aims to change minds. He identified three modes of persuasion: ethos (speaker credibility), pathos (appropriate emotional engagement), and logos (rational argument), insisting all three are necessary because humans are neither purely rational nor purely emotional. He classified rhetorical situations (legal, political, ceremonial), analyzed emotions systematically as psychological states with characteristic objects and causes, and identified the enthymeme — an argument with audience-supplied premises — as rhetoric's core unit. The ethical status of rhetoric remains contested: the same framework that enables democratic deliberation enables propaganda.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const ACCENT = "#DC2626";
  const ACCENT_LIGHT = "#ef4444";
  const ACCENT_DIM = "#3a0a0a";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [activeTab, setActiveTab] = useState("analyze");
  const [selectedSpeech, setSelectedSpeech] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [ethos, setEthos] = useState(33);
  const [pathos, setPathos] = useState(33);
  const [logos, setLogos] = useState(34);
  const [audience, setAudience] = useState("general");
  const [showImpact, setShowImpact] = useState(false);

  const keyConcepts = [
    { id: "ethos", label: "Ethos", desc: "Ethos is the mode of persuasion based on the speaker's character and credibility. Aristotle argued that audiences must trust the speaker's goodwill, competence, and virtue before accepting their arguments — making perceived character arguably the most powerful persuasive tool. A doctor's recommendation works partly because of their ethos, independent of the technical content." },
    { id: "pathos", label: "Pathos", desc: "Pathos involves moving audiences through appropriate emotional engagement. Aristotle devoted extensive analysis to specific emotions — anger, pity, fear, envy — identifying their characteristic objects, what triggers them, and what dissolves them. He did not condemn emotional appeal but insisted it must be fitting to the situation, not manufactured to distract from weak reasoning." },
    { id: "logos", label: "Logos", desc: "Logos is persuasion through reasoned argument. In rhetoric, this typically means the enthymeme — a syllogism with one premise supplied by the audience from shared beliefs. Because rhetoric addresses probable matters rather than certainties, logos in rhetoric is probabilistic reasoning, not demonstration. The audience's active participation in completing the argument makes it more persuasive." },
    { id: "enthymeme", label: "Enthymeme", desc: "The enthymeme is Aristotle's name for the rhetorical syllogism — an argument where one premise is left unstated because the audience already believes it. For example: 'This politician served in the military, so they understand sacrifice' leaves implicit the premise that military service teaches the nature of sacrifice. The audience's act of supplying the premise makes them complicit in the conclusion." },
    { id: "three-genres", label: "Three Genres", desc: "Aristotle classified rhetorical situations into three types: forensic (legal, concerning past actions and justice), deliberative (political, concerning future actions and advantage), and epideictic (ceremonial, concerning present praise or blame and honor). Each genre has characteristic time orientation, purpose, and dominant appeal, though all three modes appear in each." },
    { id: "dual-use", label: "Dual-Use Problem", desc: "Rhetoric's framework is content-neutral — the same analysis that helps a doctor persuade patients to take life-saving medicine helps a demagogue spread fear of a minority group. Aristotle acknowledged this but argued the danger of rhetoric is not unique to it: medicine can poison as well as heal. He considered the ability to argue both sides of a case essential for recognizing the enemy's moves." },
  ];

  const speeches = [
    {
      title: "Anti-Smoking Ad",
      segments: [
        { text: "As a cardiologist with 20 years of experience treating lung cancer patients,", type: "ethos", label: "Ethos", tooltip: "Establishes speaker credibility through professional expertise and direct patient experience." },
        { text: " I've held the hands of people dying from choices made at 16.", type: "pathos", label: "Pathos", tooltip: "Visceral emotional appeal — creates fear and grief through a specific, human image of suffering." },
        { text: " Studies show smoking causes 90% of lung cancers and kills 480,000 Americans annually.", type: "logos", label: "Logos", tooltip: "Statistical argument — concrete numbers function as logos, grounding the emotional appeal in verifiable fact." },
        { text: " You have the power to choose a different story.", type: "pathos", label: "Pathos", tooltip: "Appeal to agency and hope — shifts emotion from fear to empowerment, closing with positive emotional motivation." },
      ]
    },
    {
      title: "Political Speech",
      segments: [
        { text: "My grandfather built this town with his hands.", type: "ethos", label: "Ethos", tooltip: "Establishes belonging and authenticity — rooting identity in shared community history to build trust." },
        { text: " Our children are inheriting a broken system,", type: "pathos", label: "Pathos", tooltip: "Fear and grief appeal centered on children — invoking parental protective instinct." },
        { text: " and the data is clear: wages have fallen 12% in real terms since 2000.", type: "logos", label: "Logos", tooltip: "Statistical logos — the specific figure and time range make the claim appear precise and researched." },
        { text: " We are better than this. We have always been better than this.", type: "pathos", label: "Pathos", tooltip: "Collective pride appeal — invokes shared identity and past greatness as emotional motivation for action." },
      ]
    },
    {
      title: "Vaccine Advocacy",
      segments: [
        { text: "The FDA, CDC, and WHO all recommend this vaccine after reviewing trials involving 40,000 participants.", type: "logos", label: "Logos", tooltip: "Logos through institutional authority and scale of evidence — the number of trial participants signals rigorous testing." },
        { text: " Parents, I understand the fear —", type: "pathos", label: "Pathos", tooltip: "Direct emotional acknowledgment — validating the audience's existing fear before addressing it disarms defensiveness." },
        { text: " Dr. Chen herself vaccinated her own children last month.", type: "ethos", label: "Ethos", tooltip: "Personal ethos through example — a credible expert's own behavior is more persuasive than abstract recommendation." },
        { text: " The risk of serious illness from the disease is 40 times greater than any vaccine side effect.", type: "logos", label: "Logos", tooltip: "Comparative logos — framing risk as a ratio makes the rational case concrete and actionable." },
      ]
    }
  ];

  const typeColors = { ethos: "#3b82f6", pathos: ACCENT, logos: "#eab308" };
  const typeColorsDim = { ethos: "#1e3a5f", pathos: "#3a0a0a", logos: "#3a2e00" };

  const currentSpeech = speeches[selectedSpeech];

  const segmentCounts = currentSpeech.segments.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {});
  const total = currentSpeech.segments.length;

  function getImpactScore() {
    const audienceWeights = {
      general: { ethos: 0.35, pathos: 0.4, logos: 0.25 },
      expert: { ethos: 0.25, pathos: 0.2, logos: 0.55 },
      emotional: { ethos: 0.2, pathos: 0.6, logos: 0.2 },
      skeptical: { ethos: 0.45, pathos: 0.15, logos: 0.4 },
    };
    const w = audienceWeights[audience];
    const e = ethos / 100, p = pathos / 100, l = logos / 100;
    const balance = 1 - Math.abs(e - w.ethos) - Math.abs(p - w.pathos) - Math.abs(l - w.logos);
    return Math.max(0, Math.min(100, Math.round(balance * 120)));
  }

  function handleSlider(mode, val) {
    const v = parseInt(val);
    if (mode === "ethos") {
      const diff = v - ethos;
      const newPathos = Math.max(0, Math.min(100 - v, pathos - diff / 2));
      const newLogos = Math.max(0, 100 - v - newPathos);
      setEthos(v); setPathos(Math.round(newPathos)); setLogos(Math.round(newLogos));
    } else if (mode === "pathos") {
      const diff = v - pathos;
      const newEthos = Math.max(0, Math.min(100 - v, ethos - diff / 2));
      const newLogos = Math.max(0, 100 - v - newEthos);
      setPathos(v); setEthos(Math.round(newEthos)); setLogos(Math.round(newLogos));
    } else {
      const diff = v - logos;
      const newEthos = Math.max(0, Math.min(100 - v, ethos - diff / 2));
      const newPathos = Math.max(0, 100 - v - newEthos);
      setLogos(v); setEthos(Math.round(newEthos)); setPathos(Math.round(newPathos));
    }
    setShowImpact(false);
  }

  const impactScore = getImpactScore();

  const audienceLabels = { general: "General Public", expert: "Expert Audience", emotional: "Emotionally Engaged", skeptical: "Skeptical Audience" };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 20%, #2a0505 0%, #0a0a0f 70%)",
      minHeight: "100vh",
      padding: "clamp(20px,4vw,48px) clamp(12px,3vw,24px)",
      fontFamily: "Georgia, serif",
      color: TITLE_COLOR,
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 12 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Rhetoric, Persuasion, and Communication
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle systematized persuasion as a legitimate art form, identifying ethos, pathos, and logos as the three universal modes of effective and ethical communication.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
            Aristotle's logic and ethics established standards for valid reasoning and virtuous action, but real political and legal life requires persuading actual audiences who are not purely rational — a gap between philosophical ideal and practical necessity.
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
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px,3vw,28px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 16 }}>
            Persuasion Analyzer — Aristotle's Framework in Action
          </div>

          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["analyze", "design"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? ACCENT : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeTab === tab ? ACCENT : ACCENT + "44"}`,
                borderRadius: 6,
                color: activeTab === tab ? "#fff" : SUBTITLE_COLOR,
                padding: "8px 18px",
                fontSize: "clamp(12px,1.6vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                letterSpacing: 0.5,
              }}>
                {tab === "analyze" ? "Analyze Mode" : "Design Mode"}
              </button>
            ))}
          </div>

          {activeTab === "analyze" && (
            <div>
              {/* Speech Selector */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {speeches.map((s, i) => (
                  <button key={i} onClick={() => { setSelectedSpeech(i); setHoveredSegment(null); }} style={{
                    background: selectedSpeech === i ? ACCENT + "22" : "transparent",
                    border: `1px solid ${selectedSpeech === i ? ACCENT : ACCENT + "33"}`,
                    borderRadius: 20,
                    color: selectedSpeech === i ? ACCENT_LIGHT : SUBTITLE_COLOR,
                    padding: "5px 14px",
                    fontSize: "clamp(11px,1.5vw,12px)",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}>
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                {[["ethos", "Ethos — Credibility"], ["pathos", "Pathos — Emotion"], ["logos", "Logos — Reason"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: typeColors[k] }} />
                    <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Annotated Text */}
              <div style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 8,
                padding: "clamp(14px,2.5vw,20px)",
                marginBottom: 18,
                lineHeight: 1.9,
                fontSize: "clamp(13px,1.8vw,15px)",
              }}>
                {currentSpeech.segments.map((seg, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredSegment(i)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => setHoveredSegment(hoveredSegment === i ? null : i)}
                    style={{
                      background: hoveredSegment === i ? typeColors[seg.type] + "44" : typeColors[seg.type] + "22",
                      borderBottom: `2px solid ${typeColors[seg.type]}`,
                      borderRadius: 3,
                      padding: "1px 2px",
                      cursor: "pointer",
                      color: hoveredSegment === i ? "#fff" : TITLE_COLOR,
                      transition: "background 0.2s",
                      display: "inline",
                    }}
                  >
                    {seg.text}
                  </span>
                ))}
              </div>

              {/* Tooltip */}
              {hoveredSegment !== null && (
                <div style={{
                  background: typeColorsDim[currentSpeech.segments[hoveredSegment].type],
                  border: `1px solid ${typeColors[currentSpeech.segments[hoveredSegment].type]}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 18,
                }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: typeColors[currentSpeech.segments[hoveredSegment].type], marginBottom: 6 }}>
                    {currentSpeech.segments[hoveredSegment].label} Move
                  </div>
                  <p style={{ margin: 0, fontSize: "clamp(12px,1.7vw,14px)", color: TITLE_COLOR, lineHeight: 1.6 }}>
                    {currentSpeech.segments[hoveredSegment].tooltip}
                  </p>
                </div>
              )}

              {/* Balance Gauges */}
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                Appeal Balance
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["ethos", "Ethos"], ["pathos", "Pathos"], ["logos", "Logos"]].map(([k, label]) => {
                  const pct = Math.round(((segmentCounts[k] || 0) / total) * 100);
                  return (
                    <div key={k}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: typeColors[k] }}>{label}</span>
                        <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR }}>{segmentCounts[k] || 0} of {total} segments ({pct}%)</span>
                      </div>
                      <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: typeColors[k],
                          borderRadius: 4,
                          transition: "width 0.4s",
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "design" && (
            <div>
              {/* Audience Selector */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 10 }}>
                  Select Your Audience
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Object.entries(audienceLabels).map(([k, v]) => (
                    <button key={k} onClick={() => { setAudience(k); setShowImpact(false); }} style={{
                      background: audience === k ? ACCENT + "22" : "transparent",
                      border: `1px solid ${audience === k ? ACCENT : ACCENT + "33"}`,
                      borderRadius: 20,
                      color: audience === k ? ACCENT_LIGHT : SUBTITLE_COLOR,
                      padding: "5px 12px",
                      fontSize: "clamp(11px,1.4vw,12px)",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                    }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                  Adjust Your Appeal Mix
                </div>
                {[["ethos", "Ethos — Credibility", ethos, "#3b82f6"], ["pathos", "Pathos — Emotion", pathos, ACCENT], ["logos", "Logos — Reason", logos, "#eab308"]].map(([mode, label, val, col]) => (
                  <div key={mode} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "clamp(12px,1.7vw,14px)", color: col }}>{label}</span>
                      <span style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, fontVariantNumeric: "tabular-nums" }}>{val}%</span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={val}
                      onChange={e => handleSlider(mode, e.target.value)}
                      style={{ width: "100%", accentColor: col, cursor: "pointer" }}
                    />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginTop: 4 }}>
                      <div style={{ height: "100%", width: `${val}%`, background: col, borderRadius: 3, transition: "width 0.3s" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Triangle Visualization */}
              <div style={{ marginBottom: 20 }}>
                <svg viewBox="0 0 300 240" width="100%" style={{ maxWidth: 320, display: "block", margin: "0 auto" }}>
                  {/* Background triangle */}
                  <polygon points="150,20 20,220 280,220" fill="rgba(255,255,255,0.03)" stroke={ACCENT + "33"} strokeWidth="1" />
                  {/* Dynamic inner triangle based on values */}
                  {(() => {
                    const eN = ethos / 100, pN = pathos / 100, lN = logos / 100;
                    const sum = eN + pN + lN || 1;
                    const e = eN / sum, p = pN / sum, l = lN / sum;
                    const apex = [150, 20]; const bl = [20, 220]; const br = [280, 220];
                    const x = apex[0] * e + bl[0] * p + br[0] * l;
                    const y = apex[1] * e + bl[1] * p + br[1] * l;
                    const ix1 = apex[0] * 0.5 + x * 0.5;
                    const iy1 = apex[1] * 0.5 + y * 0.5;
                    const ix2 = bl[0] * 0.5 + x * 0.5;
                    const iy2 = bl[1] * 0.5 + y * 0.5;
                    const ix3 = br[0] * 0.5 + x * 0.5;
                    const iy3 = br[1] * 0.5 + y * 0.5;
                    return (
                      <>
                        <polygon points={`${ix1},${iy1} ${ix2},${iy2} ${ix3},${iy3}`}
                          fill={ACCENT + "18"} stroke={ACCENT + "88"} strokeWidth="1.5" />
                        <circle cx={x} cy={y} r={8} fill={ACCENT} opacity={0.9} />
                        <circle cx={x} cy={y} r={14} fill="none" stroke={ACCENT + "55"} strokeWidth="1" />
                      </>
                    );
                  })()}
                  {/* Labels */}
                  <text x="150" y="12" textAnchor="middle" fill="#3b82f6" fontSize="12" fontFamily="Georgia, serif">Ethos</text>
                  <text x="8" y="235" textAnchor="start" fill={ACCENT} fontSize="12" fontFamily="Georgia, serif">Pathos</text>
                  <text x="292" y="235" textAnchor="end" fill="#eab308" fontSize="12" fontFamily="Georgia, serif">Logos</text>
                  {/* Corner dots */}
                  <circle cx="150" cy="20" r="4" fill="#3b82f6" opacity="0.8" />
                  <circle cx="20" cy="220" r="4" fill={ACCENT} opacity="0.8" />
                  <circle cx="280" cy="220" r="4" fill="#eab308" opacity="0.8" />
                </svg>
              </div>

              {/* Predict Impact Button */}
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <button onClick={() => setShowImpact(true)} style={{
                  background: ACCENT,
                  border: "none",
                  borderRadius: 6,
                  color: "#fff",
                  padding: "10px 28px",
                  fontSize: "clamp(12px,1.7vw,14px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  letterSpacing: 0.5,
                }}>
                  Predict Persuasive Impact
                </button>
              </div>

              {showImpact && (
                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 8,
                  padding: "clamp(14px,2.5vw,20px)",
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT + "99", marginBottom: 12 }}>
                    Predicted Impact Score
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                    <div style={{
                      fontSize: "clamp(28px,5vw,48px)",
                      fontWeight: "bold",
                      color: impactScore > 60 ? "#4ade80" : impactScore > 35 ? "#eab308" : ACCENT,
                      minWidth: 70,
                    }}>
                      {impactScore}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${impactScore}%`,
                          background: impactScore > 60 ? "#4ade80" : impactScore > 35 ? "#eab308" : ACCENT,
                          borderRadius: 6,
                          transition: "width 0.5s",
                        }} />
                      </div>
                      <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, marginTop: 6 }}>
                        out of 100 — for a {audienceLabels[audience]}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.7vw,14px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.7 }}>
                    {impactScore > 60
                      ? "This balance aligns well with your audience's persuasive needs. Aristotle would recognize this as kairos — the right message in the right measure for the moment."
                      : impactScore > 35
                      ? "This mix has partial alignment. Consider adjusting your dominant appeal to better match how this audience processes arguments."
                      : "This balance works against you with this audience. Your dominant appeal does not match their primary mode of receptivity — a key insight from Aristotle's audience analysis."}
                  </p>
                  <div style={{ marginTop: 12, padding: "10px 14px", background: ACCENT + "11", borderRadius: 6, borderLeft: `3px solid ${ACCENT}` }}>
                    <p style={{ margin: 0, fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, lineHeight: 1.6, fontStyle: "italic" }}>
                      Ethical note: This same framework that predicts effective persuasion applies equally to manipulative messaging. The tool is neutral; the intent is not.
                    </p>
                  </div>
                </div>
              )}
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
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map(c => (
              <button key={c.id} onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)} style={{
                background: hoveredConcept === c.id ? ACCENT : "transparent",
                border: `1px solid ${hoveredConcept === c.id ? ACCENT : ACCENT + "66"}`,
                borderRadius: 20,
                color: hoveredConcept === c.id ? "#f0ead8" : ACCENT_LIGHT,
                padding: "6px 14px",
                fontSize: "clamp(11px,1.5vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "background 0.2s",
              }}>
                {c.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const c = keyConcepts.find(x => x.id === hoveredConcept);
            return (
              <div style={{
                borderTop: `1px solid ${ACCENT}33`,
                paddingTop: 14,
                marginTop: 6,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  {c.label}
                </div>
                <p style={{ margin: 0, fontSize: "clamp(13px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.7 }}>
                  {c.desc}
                </p>
              </div>
            );
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px,3vw,22px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: "0 0 10px 0", lineHeight: 1.7 }}>
            Because rhetoric is content-neutral — its tools apply equally to truth and falsehood, justice and injustice — teaching rhetoric systematizes manipulation as readily as legitimate persuasion, a danger amplified enormously by modern mass media, microtargeting, and disinformation at industrial scale.
          </p>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: ACCENT_LIGHT, margin: 0, fontStyle: "italic" }}>
            This pressure forces the next development: the question of whether rational demonstration and rhetorical persuasion can ever fully converge, or whether the gap between ideal argument and effective communication is permanent.
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
          <button onClick={() => setEchoesOpen(!echoesOpen)} style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "clamp(12px,2.5vw,18px) clamp(16px,3vw,24px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={16} color={ACCENT} /> : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{ padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  title: "Legal Education and Trial Advocacy",
                  body: "Law schools explicitly teach Aristotle's three modes: establishing attorney credibility through court manner and expertise (ethos), crafting narratives that elicit appropriate jury emotions (pathos), and marshaling evidence and inference (logos). Trial advocacy courses are essentially applied Aristotelian rhetoric, validating his claim that persuasion in adversarial settings is a systematic discipline."
                },
                {
                  title: "Anti-Smoking and Public Health Campaigns",
                  body: "Decades of research in health communication confirm that effective campaigns combine all three modes. Surgeon General warnings provide logos through statistics; graphic warning labels deploy pathos through visceral imagery; endorsements by recognizable medical figures build ethos. Campaigns relying on logos alone consistently underperform those integrating all three modes."
                },
                {
                  title: "Vaccine Advocacy and Credible Messengers",
                  body: "Vaccination campaigns that use trusted community figures rather than distant experts demonstrate Aristotle's insight that ethos is context-dependent — credibility belongs to the audience's perception, not objective credentials. A community pastor's recommendation may carry more persuasive weight than a virologist's, precisely because the audience grants that ethos within their evaluative frame."
                },
                {
                  title: "Social Media Microtargeting and Disinformation",
                  body: "Contemporary political microtargeting operationalizes Aristotle's audience analysis at industrial scale: platforms profile users to identify their dominant receptivity mode, then deliver ethos, pathos, or logos appeals tailored to that profile. Disinformation campaigns deliberately deploy false ethos (fake experts), manufactured pathos (fabricated outrage), and distorted logos (cherry-picked statistics) — the Aristotelian toolkit weaponized."
                },
              ].map((card, i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 12 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

export default RhetoricPersuasionCommunication;