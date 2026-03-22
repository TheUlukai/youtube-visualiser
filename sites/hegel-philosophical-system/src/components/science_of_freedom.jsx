function ScienceOfFreedom() {
  const CORE_ARGUMENT = `Hegel rejects the liberal identification of freedom with absence of external constraint, calling it bondage to arbitrary desire. Genuine freedom is positive self-determination according to rational principles, and this cannot be achieved in isolation. The Philosophy of Right traces freedom's development through abstract right (property and contract), morality (individual conviction, Kantian duty), and ethical life (Sittlichkeit) — the highest stage where individual moral conviction and objective social institutions achieve unity. Ethical life is realized through the family (immediate love-based unity), civil society (market and voluntary associations), and the rational state (the synthesis of particular and universal freedom). Political participation thereby becomes a form of self-realization rather than self-sacrifice.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [hoveredStep, setHoveredStep] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [vennHover, setVennHover] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const accent = "#0369A1";

  const keyConcepts = [
    { id: "negative_positive_freedom", label: "Negative vs. Positive Freedom", desc: "Negative freedom is freedom-from: the absence of external obstacles and coercion. Positive freedom is freedom-to: the capacity for genuine self-determination according to rational principles. Hegel insists that negative freedom is a necessary but insufficient starting point. A will that has no obligations and faces no constraints has no determinate content — it is an empty freedom that cannot distinguish genuine self-realization from arbitrary whim." },
    { id: "abstract_right", label: "Abstract Right", desc: "Abstract right is the first stage of Objective Spirit: freedom expressed as the legal capacity to own property, enter contracts, and be protected from wrong. Persons are recognized as bearers of rights, but only in the abstract — as isolated atoms with no account of their inner convictions or shared purposes. Abstract right is freedom as form only, unable to specify which purposes are worth pursuing." },
    { id: "morality", label: "Morality (Moralität)", desc: "Morality internalizes freedom: the will is now self-legislating, following universal principles derived from conscience rather than external command. This is Kant's domain — the categorical imperative, duty for its own sake. But Hegel argues Kantian morality is tragically empty: the universal form of duty cannot generate concrete obligations, and the moral standpoint produces endless 'ought' without the determinate 'is' of actual social life." },
    { id: "sittlichkeit", label: "Ethical Life (Sittlichkeit)", desc: "Sittlichkeit is the synthesis where individual moral conviction and objective social institutions achieve living unity. Unlike morality, ethical life is concrete: the individual finds herself genuinely at home in the institutions that shape her. Family provides immediate love-based unity; civil society mediates particular interests; and the rational state synthesizes particular and universal freedom. This is freedom genuinely actualized." },
    { id: "civil_society", label: "Civil Society", desc: "Civil society is the middle term between family and state — the realm of market exchange, voluntary associations, and professional corporations. Here individuals pursue private interests but are bound into a system of mutual dependence. Civil society enables unprecedented freedom and development but also generates systemic inequality and atomization, requiring the mediating institutions of the state to preserve its gains while correcting its excesses." },
    { id: "rational_state", label: "The Rational State", desc: "The rational state, for Hegel, is not an external constraint on freedom but its fullest realization — the institution in which universal rational law, particular group interests, and individual subjective freedom are unified. The state is 'the actuality of concrete freedom' because in it the individual wills what reason endorses, and reason is embodied in institutions the individual can genuinely call her own." },
  ];

  const steps = [
    {
      id: "abstract_right",
      label: "Abstract Right",
      number: "I",
      subtitle: "Property & Contract",
      color: "#1e6fa8",
      institutions: ["Property", "Contract", "Wrong & Punishment"],
      description: "The first stage of freedom is purely formal: the free will expressed through ownership of external objects and recognition between persons as bearers of rights. Here freedom appears as the capacity to possess, exchange, and enforce claims. Yet this is insufficient — abstract right treats persons as isolated atoms with no account of inner conviction or shared ends. It mistakes the shell of freedom for its substance.",
      critique: "Abstract right is freedom as form only — it cannot tell us which purposes are worth pursuing, nor does it bind persons into genuine community.",
      hegelQuote: "A person must translate his freedom into an external sphere in order to exist as Idea."
    },
    {
      id: "morality",
      label: "Morality",
      number: "II",
      subtitle: "Conscience & Duty",
      color: "#0369A1",
      institutions: ["Purpose & Responsibility", "Intention & Welfare", "Good & Conscience"],
      description: "Morality (Moralität) internalizes freedom — the will is now self-legislating, following universal principles derived from conscience rather than mere external custom. This is Kant's domain: the categorical imperative, duty for its own sake, the moral subject who gives herself the law. Yet Kant's morality remains tragically empty. The universal form of duty cannot by itself generate concrete obligations; the moral standpoint produces endless 'ought' without the determinate 'is' of actual social life.",
      critique: "Morality's formal universality is its glory and its prison — it transcends custom but cannot provide the concrete, living content that makes freedom real.",
      hegelQuote: "The moral standpoint is the standpoint of the will so far as it is infinite not merely in itself but for itself."
    },
    {
      id: "ethical_life",
      label: "Ethical Life",
      number: "III",
      subtitle: "Sittlichkeit",
      color: "#0284c7",
      institutions: ["Family", "Civil Society", "The State"],
      description: "Sittlichkeit — ethical life — is the synthesis where individual moral conviction and objective social institutions achieve living unity. Here freedom is no longer abstract form or inner duty but concrete actuality: the individual finds herself at home in the institutions that shape her. The family provides immediate love-based unity; civil society (market and voluntary associations) mediates particular interests; and the rational state synthesizes particular and universal freedom. This is the highest stage because freedom here is genuinely actualized rather than merely claimed or commanded.",
      critique: "Ethical life resolves the antinomy of abstract right and morality by showing freedom as inherently social — self-realization requires rational institutions.",
      hegelQuote: "Ethical life is the Idea of freedom as the living Good which has its knowledge and volition in self-consciousness."
    }
  ];

  const ethicalInstitutions = [
    {
      id: "family",
      label: "Family",
      icon: "⌂",
      desc: "Immediate unity through love — the individual transcends isolated selfhood through natural bonds of care and recognition within the household.",
      color: "#0369A1"
    },
    {
      id: "civil_society",
      label: "Civil Society",
      icon: "⚙",
      desc: "The sphere of particular interests: market relations, voluntary associations, corporations. Here individuals pursue private ends, yet through mutual dependence generate a social fabric — though one riven by inequality requiring regulation.",
      color: "#0284c7"
    },
    {
      id: "state",
      label: "The State",
      icon: "◈",
      desc: "The rational state is the synthesis — it embodies the community's shared rational nature, enabling citizens to participate in universal ends while remaining particular persons. Political participation becomes self-realization.",
      color: "#38bdf8"
    }
  ];

  const [selectedInstitution, setSelectedInstitution] = useState(null);

  const stepData = selectedStep ? steps.find(s => s.id === selectedStep) : null;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 20%, #012e4a 0%, #050810 100%)",
      minHeight: "100vh",
      fontFamily: "Georgia, serif",
      color: "#e2e8f0",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)"
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 4vw, 36px)", textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 1.4vw, 12px)",
            letterSpacing: "0.2em",
            color: "#0369A1",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "Georgia, serif"
          }}>
            Part 8 of 20 — Hegel's System
          </div>
          <h1 style={{
            fontSize: "clamp(22px, 4vw, 38px)",
            fontWeight: "bold",
            color: "#f0f9ff",
            margin: "0 0 10px 0",
            letterSpacing: "-0.01em",
            fontFamily: "Georgia, serif"
          }}>
            The Science of Freedom
          </h1>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontFamily: "Georgia, serif"
          }}>
            Genuine freedom is not the absence of constraint — it is achieved through participation in rational social institutions.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderLeft: "4px solid #0369A1",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(20px, 4vw, 36px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0369A1",
            marginBottom: "12px",
            fontFamily: "Georgia, serif"
          }}>
            The Problem
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
            margin: 0,
            fontFamily: "Georgia, serif"
          }}>
            Spirit has achieved self-consciousness — but consciousness alone is not enough. Freedom must become actual, must walk in the world. Yet here the crisis deepens: <span style={{ color: "#7dd3fc", fontStyle: "italic" }}>Spirit requires objective social institutions to fully realize freedom</span>, but what specific institutional architecture makes genuine collective freedom possible without crushing individual autonomy? Provide too little structure and freedom atomizes into chaos; provide too much and the living subject is swallowed by the machine of the state. The problem inherited from Kant and the French Revolution alike is this unbearable tension — and Hegel insists it must be resolved not by choosing one side but by thinking through both at once.
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
        <div style={{
          background: "#060d18",
          border: "1px solid #1a3347",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(20px, 4vw, 36px)"
        }}>
          <div style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#e2e8f0",
            fontWeight: "bold",
            marginBottom: "6px",
            fontFamily: "Georgia, serif"
          }}>
            The Staircase of Freedom
          </div>
          <p style={{
            fontSize: "clamp(11px, 1.5vw, 13px)",
            color: "#64748b",
            marginBottom: "clamp(16px, 3vw, 28px)",
            fontFamily: "Georgia, serif"
          }}>
            Click each stage to explore its logic, limits, and the critique that drives the ascent.
          </p>

          {/* Staircase SVG */}
          <svg viewBox="0 0 700 280" width="100%" style={{ maxWidth: "700px", display: "block", margin: "0 auto", marginBottom: "clamp(12px, 2vw, 20px)" }}>
            {/* Background grid lines */}
            <line x1="0" y1="280" x2="700" y2="280" stroke="#1a3347" strokeWidth="1"/>
            <line x1="0" y1="200" x2="700" y2="200" stroke="#1a3347" strokeWidth="0.5" strokeDasharray="4,4"/>
            <line x1="0" y1="140" x2="700" y2="140" stroke="#1a3347" strokeWidth="0.5" strokeDasharray="4,4"/>

            {/* Step 1 — Abstract Right */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "abstract_right" ? null : "abstract_right")}
              onMouseEnter={() => setHoveredStep("abstract_right")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="20" y="210" width="200" height="70"
                fill={selectedStep === "abstract_right" ? "#1e3a52" : hoveredStep === "abstract_right" ? "#162a3d" : "#0e1f2d"}
                stroke={selectedStep === "abstract_right" ? "#38bdf8" : "#1e6fa8"}
                strokeWidth={selectedStep === "abstract_right" ? "2" : "1"}
                rx="4"
              />
              <rect x="20" y="210" width="5" height="70" fill="#1e6fa8" rx="2"/>
              <text x="135" y="237" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">I</text>
              <text x="135" y="256" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Abstract Right</text>
              <text x="135" y="272" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Georgia, serif">Property · Contract</text>
            </g>

            {/* Step arrow up */}
            <polygon points="230,230 245,220 245,240" fill="#1e6fa8" opacity="0.7"/>
            <line x1="233" y1="230" x2="260" y2="230" stroke="#1e6fa8" strokeWidth="1.5" opacity="0.7"/>

            {/* Step 2 — Morality */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "morality" ? null : "morality")}
              onMouseEnter={() => setHoveredStep("morality")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="250" y="150" width="200" height="130"
                fill={selectedStep === "morality" ? "#1a3554" : hoveredStep === "morality" ? "#142841" : "#0b1929"}
                stroke={selectedStep === "morality" ? "#38bdf8" : "#0369A1"}
                strokeWidth={selectedStep === "morality" ? "2" : "1"}
                rx="4"
              />
              <rect x="250" y="150" width="5" height="130" fill="#0369A1" rx="2"/>
              <text x="355" y="177" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">II</text>
              <text x="355" y="196" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Morality</text>
              <text x="355" y="213" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Georgia, serif">Conscience · Duty</text>
              <text x="355" y="234" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Categorical Imperative</text>
              <text x="355" y="250" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Formal universality</text>
              <text x="355" y="266" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">without content</text>
            </g>

            {/* Step arrow up */}
            <polygon points="460,170 475,160 475,180" fill="#0284c7" opacity="0.7"/>
            <line x1="463" y1="170" x2="490" y2="170" stroke="#0284c7" strokeWidth="1.5" opacity="0.7"/>

            {/* Step 3 — Ethical Life */}
            <g
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedStep(selectedStep === "ethical_life" ? null : "ethical_life")}
              onMouseEnter={() => setHoveredStep("ethical_life")}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <rect
                x="480" y="60" width="200" height="220"
                fill={selectedStep === "ethical_life" ? "#1a3d5c" : hoveredStep === "ethical_life" ? "#123046" : "#091828"}
                stroke={selectedStep === "ethical_life" ? "#7dd3fc" : "#0284c7"}
                strokeWidth={selectedStep === "ethical_life" ? "2" : "1"}
                rx="4"
              />
              {/* Glow effect for highest step */}
              {(selectedStep === "ethical_life" || hoveredStep === "ethical_life") && (
                <rect x="480" y="60" width="200" height="220" fill="none" stroke="#38bdf8" strokeWidth="1" rx="4" opacity="0.4"/>
              )}
              <rect x="480" y="60" width="5" height="220" fill="#0284c7" rx="2"/>
              <text x="585" y="88" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif">III</text>
              <text x="585" y="108" textAnchor="middle" fill="#f0f9ff" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">Ethical Life</text>
              <text x="585" y="126" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="Georgia, serif">Sittlichkeit</text>
              <line x1="500" y1="135" x2="670" y2="135" stroke="#1a4060" strokeWidth="1"/>
              <text x="585" y="153" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="Georgia, serif">Family</text>
              <text x="585" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="Georgia, serif">Civil Society</text>
              <text x="585" y="187" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">The State</text>
              <line x1="500" y1="197" x2="670" y2="197" stroke="#1a4060" strokeWidth="1"/>
              <text x="585" y="217" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Georgia, serif">Synthesis of</text>
              <text x="585" y="232" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Georgia, serif">particular & universal</text>
              <text x="585" y="268" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="Georgia, serif">↑ Rational Freedom ↑</text>
            </g>

            {/* Vertical freedom label */}
            <text x="12" y="200" fill="#1e4060" fontSize="9" fontFamily="Georgia, serif" transform="rotate(-90, 12, 200)">FREEDOM</text>

            {/* Negative vs Positive label */}
            <text x="30" y="200" fill="#334155" fontSize="9" fontFamily="Georgia, serif">Negative ↓</text>
            <text x="490" y="55" fill="#334155" fontSize="9" fontFamily="Georgia, serif">Positive ↑</text>
          </svg>

          {/* Step Detail Panel */}
          {stepData && (
            <div style={{
              background: "#07111c",
              border: "1px solid #1e3a52",
              borderLeft: `4px solid ${stepData.color}`,
              borderRadius: "8px",
              padding: "clamp(14px, 2.5vw, 24px)",
              marginBottom: "clamp(16px, 3vw, 24px)",
              transition: "all 0.3s ease"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <span style={{
                    fontSize: "clamp(9px, 1.2vw, 11px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: stepData.color,
                    fontFamily: "Georgia, serif"
                  }}>
                    Stage {stepData.number}
                  </span>
                  <h3 style={{
                    fontSize: "clamp(15px, 2.2vw, 20px)",
                    color: "#f0f9ff",
                    margin: "4px 0 2px 0",
                    fontFamily: "Georgia, serif"
                  }}>
                    {stepData.label}
                  </h3>
                  <p style={{
                    fontSize: "clamp(11px, 1.4vw, 13px)",
                    color: "#64748b",
                    margin: 0,
                    fontFamily: "Georgia, serif"
                  }}>{stepData.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  style={{
                    background: "#1a3347",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    fontFamily: "Georgia, serif"
                  }}
                >
                  Close ×
                </button>
              </div>
              <div style={{ marginTop: "16px" }}>
                <p style={{
                  fontSize: "clamp(12px, 1.7vw, 14px)",
                  lineHeight: "1.75",
                  color: "#cbd5e1",
                  margin: "0 0 14px 0",
                  fontFamily: "Georgia, serif"
                }}>
                  {stepData.description}
                </p>
                <div style={{
                  background: "#0b1e2e",
                  borderLeft: "3px solid #334155",
                  padding: "10px 14px",
                  marginBottom: "14px",
                  borderRadius: "0 4px 4px 0"
                }}>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    fontStyle: "italic",
                    color: "#7dd3fc",
                    margin: 0,
                    fontFamily: "Georgia, serif"
                  }}>
                    "{stepData.hegelQuote}"
                  </p>
                  <p style={{
                    fontSize: "clamp(10px, 1.2vw, 11px)",
                    color: "#475569",
                    margin: "6px 0 0 0",
                    fontFamily: "Georgia, serif"
                  }}>— Hegel, Philosophy of Right</p>
                </div>
                <div style={{
                  background: "#0f1e2e",
                  border: "1px solid #1e3347",
                  borderRadius: "6px",
                  padding: "10px 14px"
                }}>
                  <span style={{
                    fontSize: "clamp(9px, 1.1vw, 10px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#ef4444",
                    fontFamily: "Georgia, serif"
                  }}>
                    The Critique
                  </span>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: "6px 0 0 0",
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    {stepData.critique}
                  </p>
                </div>
                <div style={{ marginTop: "14px" }}>
                  <span style={{
                    fontSize: "clamp(9px, 1.1vw, 10px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#64748b",
                    fontFamily: "Georgia, serif"
                  }}>Institutions</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                    {stepData.institutions.map(inst => (
                      <span key={inst} style={{
                        background: "#0e2235",
                        border: `1px solid ${stepData.color}`,
                        color: "#7dd3fc",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "clamp(10px, 1.3vw, 12px)",
                        fontFamily: "Georgia, serif"
                      }}>
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ethical Life Sub-institutions */}
          <div style={{ marginBottom: "clamp(16px, 3vw, 28px)" }}>
            <div style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#64748b",
              marginBottom: "clamp(10px, 2vw, 16px)",
              fontFamily: "Georgia, serif"
            }}>
              Ethical Life's three spheres — explore each:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px, 1.5vw, 14px)" }}>
              {ethicalInstitutions.map(inst => {
                const isSelected = selectedInstitution === inst.id;
                return (
                  <div
                    key={inst.id}
                    onClick={() => setSelectedInstitution(isSelected ? null : inst.id)}
                    style={{
                      flex: "1 1 clamp(120px, 28%, 220px)",
                      background: isSelected ? "#0e2235" : "#07111c",
                      border: `1px solid ${isSelected ? inst.color : "#1a3347"}`,
                      borderRadius: "8px",
                      padding: "clamp(12px, 2vw, 18px)",
                      cursor: "pointer",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = inst.color; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "#1a3347"; }}
                  >
                    <div style={{
                      fontSize: "clamp(18px, 3vw, 24px)",
                      marginBottom: "6px"
                    }}>
                      {inst.icon}
                    </div>
                    <div style={{
                      fontSize: "clamp(12px, 1.7vw, 15px)",
                      color: isSelected ? "#f0f9ff" : "#e2e8f0",
                      fontWeight: "bold",
                      fontFamily: "Georgia, serif",
                      marginBottom: "4px"
                    }}>
                      {inst.label}
                    </div>
                    {isSelected && (
                      <p style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: "1.65",
                        fontFamily: "Georgia, serif"
                      }}>
                        {inst.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Venn Diagram — The Rational State */}
          <div style={{
            background: "#06101a",
            border: "1px solid #1a3347",
            borderRadius: "10px",
            padding: "clamp(14px, 2.5vw, 24px)"
          }}>
            <div style={{
              fontSize: "clamp(12px, 1.7vw, 15px)",
              color: "#7dd3fc",
              fontWeight: "bold",
              marginBottom: "6px",
              fontFamily: "Georgia, serif"
            }}>
              The Rational State: The Synthesis
            </div>
            <p style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              color: "#64748b",
              marginBottom: "clamp(12px, 2vw, 20px)",
              fontFamily: "Georgia, serif"
            }}>
              Hover over each region to understand what the state synthesizes.
            </p>
            <svg viewBox="0 0 500 220" width="100%" style={{ maxWidth: "500px", display: "block", margin: "0 auto" }}>
              {/* Left circle — Particular Interest */}
              <circle
                cx="185" cy="110" r="90"
                fill={vennHover === "particular" ? "#0f2d44" : "#071624"}
                stroke={vennHover === "particular" ? "#0369A1" : "#1a3a52"}
                strokeWidth={vennHover === "particular" ? "2" : "1"}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={() => setVennHover("particular")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Right circle — Universal Principle */}
              <circle
                cx="315" cy="110" r="90"
                fill={vennHover === "universal" ? "#0f2d44" : "#071624"}
                stroke={vennHover === "universal" ? "#0369A1" : "#1a3a52"}
                strokeWidth={vennHover === "universal" ? "2" : "1"}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={() => setVennHover("universal")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Overlap — Rational Freedom — glowing */}
              <ellipse
                cx="250" cy="110" rx="42" ry="80"
                fill={pulse ? "#0f3a5a" : "#0c2d47"}
                stroke={pulse ? "#38bdf8" : "#0369A1"}
                strokeWidth={pulse ? "2.5" : "1.5"}
                style={{ cursor: "pointer", transition: "all 0.9s ease" }}
                onMouseEnter={() => setVennHover("synthesis")}
                onMouseLeave={() => setVennHover(null)}
              />
              {/* Labels */}
              <text x="135" y="96" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Particular</text>
              <text x="135" y="112" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Interest</text>
              <text x="135" y="132" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Civil Society</text>
              <text x="135" y="146" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Individual Ends</text>

              <text x="368" y="96" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Universal</text>
              <text x="368" y="112" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="Georgia, serif" fontWeight="bold">Principle</text>
              <text x="368" y="132" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Rational Law</text>
              <text x="368" y="146" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Georgia, serif">Common Good</text>

              <text x="250" y="104" textAnchor="middle" fill="#f0f9ff" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">Rational</text>
              <text x="250" y="119" textAnchor="middle" fill="#f0f9ff" fontSize="9.5" fontFamily="Georgia, serif" fontWeight="bold">Freedom</text>
              {pulse && (
                <text x="250" y="136" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="Georgia, serif">★</text>
              )}
            </svg>

            {/* Venn Tooltip */}
            <div style={{
              minHeight: "60px",
              marginTop: "14px",
              padding: "12px 16px",
              background: "#071420",
              border: "1px solid #1a3347",
              borderRadius: "6px",
              transition: "all 0.2s ease"
            }}>
              {vennHover === "particular" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>Particular Interest:</span> The individual's private aims, needs, and voluntary associations — the domain of civil society. Without the universal, particularity degenerates into selfishness and market anarchy.
                </p>
              )}
              {vennHover === "universal" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>Universal Principle:</span> The rational law and common good that transcend any individual's preference. Without the particular, universality becomes an abstract tyranny that crushes concrete life.
                </p>
              )}
              {vennHover === "synthesis" && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#94a3b8", margin: 0, fontFamily: "Georgia, serif", lineHeight: "1.65" }}>
                  <span style={{ color: "#38bdf8", fontWeight: "bold" }}>Rational Freedom:</span> The synthesis where citizens identify their own deepest purposes with the rational institutions of the state. Political participation is not sacrifice of the self — it is the highest form of self-realization.
                </p>
              )}
              {!vennHover && (
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "#334155", margin: 0, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  Hover over a region of the diagram to see what it represents...
                </p>
              )}
            </div>
          </div>

          {/* Negative vs Positive Freedom Toggle */}
          <div style={{ marginTop: "clamp(16px, 3vw, 24px)" }}>
            <div style={{
              fontSize: "clamp(12px, 1.6vw, 14px)",
              color: "#64748b",
              marginBottom: "12px",
              fontFamily: "Georgia, serif"
            }}>
              The central distinction Hegel draws:
            </div>
            <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 14px)", flexWrap: "wrap" }}>
              <div style={{
                flex: "1 1 clamp(140px, 45%, 300px)",
                background: "#07111c",
                border: "1px solid #1a3347",
                borderTop: "3px solid #ef4444",
                borderRadius: "6px",
                padding: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{
                  fontSize: "clamp(10px, 1.3vw, 12px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  marginBottom: "8px",
                  fontFamily: "Georgia, serif"
                }}>
                  Negative Freedom
                </div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#94a3b8",
                  margin: 0,
                  lineHeight: "1.65",
                  fontFamily: "Georgia, serif"
                }}>
                  Freedom as absence of external constraint. The liberal ideal: no one compels me. Yet Hegel argues this is bondage in disguise — the slave of arbitrary desire, with no account of what makes a will genuinely free rather than merely unobstructed.
                </p>
              </div>
              <div style={{
                flex: "1 1 clamp(140px, 45%, 300px)",
                background: "#07111c",
                border: "1px solid #1a3347",
                borderTop: "3px solid #0369A1",
                borderRadius: "6px",
                padding: "clamp(12px, 2vw, 18px)"
              }}>
                <div style={{
                  fontSize: "clamp(10px, 1.3vw, 12px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#0369A1",
                  marginBottom: "8px",
                  fontFamily: "Georgia, serif"
                }}>
                  Positive Freedom
                </div>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)",
                  color: "#94a3b8",
                  margin: 0,
                  lineHeight: "1.65",
                  fontFamily: "Georgia, serif"
                }}>
                  Freedom as self-determination according to rational principles. The will is genuinely free when it wills what reason endorses — and this requires rational institutions in which the individual is genuinely recognized and at home. Freedom is achieved, not merely given.
                </p>
              </div>
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

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderLeft: "4px solid #0c4a6e",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
          marginBottom: "clamp(16px, 3vw, 28px)"
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.2vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0c4a6e",
            marginBottom: "12px",
            fontFamily: "Georgia, serif"
          }}>
            The Difficulty
          </div>
          <p style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            lineHeight: "1.75",
            color: "#cbd5e1",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif"
          }}>
            The Philosophy of Right delivers a genuine resolution: freedom actualized in the rational state. But this very success generates a pressing new problem. If the rational state is the highest embodiment of objective freedom, how does this particular, historically situated state fit into the larger sweep of world history? States rise and fall — the Greek polis gave way to Rome, Rome to the Christian kingdoms, those to modern constitutional orders. Is there a rational pattern to this succession, or is history merely a slaughterhouse of political forms with no redemptive logic?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.6vw, 14px)",
            color: "#475569",
            margin: 0,
            fontStyle: "italic",
            fontFamily: "Georgia, serif"
          }}>
            This pressure forces the next development: a philosophy of world history in which Geist moves through successive civilizations, each embodying a partial form of freedom, toward a final reconciliation — not within any single state, but in the very concept of history itself.
          </p>
        </div>

        {/* REAL-WORLD ECHOES — collapsible */}
        <div style={{
          background: "#050f1a",
          border: "1px solid #1e3a52",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              color: "#e2e8f0",
              fontFamily: "Georgia, serif"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                fontSize: "clamp(9px, 1.2vw, 11px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0369A1",
                fontFamily: "Georgia, serif"
              }}>
                Real-World Echoes
              </span>
              <span style={{
                fontSize: "clamp(11px, 1.5vw, 13px)",
                color: "#475569",
                fontFamily: "Georgia, serif"
              }}>
                — concrete parallels today
              </span>
            </div>
            {echosOpen ? <ChevronUp size={18} color="#0369A1"/> : <ChevronDown size={18} color="#0369A1"/>}
          </button>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
              borderTop: "1px solid #1a3347"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 18px)", marginTop: "clamp(14px, 2.5vw, 20px)" }}>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Property Rights as Actualized Purpose
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    When someone owns a home, business, or creative work, they do not merely possess an asset — they have externalized their will into the world. Property rights, on Hegel's account, are not primarily economic instruments but the institutional recognition of persons as free agents capable of projecting their purposes outward. Abstract right's genuine insight lives here, however incomplete it remains by itself.
                  </p>
                </div>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Kant's Categorical Imperative as Morality's Limit
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    Kant's formula — "Act only according to that maxim you could will as universal law" — captures morality's formal universality with precision. Yet critics have long noted its emptiness: almost any maxim can be universalized with enough ingenuity. Hegel sharpens this critique: the categorical imperative tells us the form of moral reasoning but cannot deliver its content without appeal to the very social life it was meant to transcend.
                  </p>
                </div>
                <div style={{
                  background: "#07111c",
                  border: "1px solid #1a3347",
                  borderRadius: "6px",
                  padding: "clamp(12px, 2vw, 18px)"
                }}>
                  <div style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#7dd3fc",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif"
                  }}>
                    Civil Society's Dialectic: Markets and Inequality
                  </div>
                  <p style={{
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: "1.65",
                    fontFamily: "Georgia, serif"
                  }}>
                    Hegel recognized that market competition — the engine of civil society — generates both wealth and systemic inequality. Left to its own logic, the market concentrates advantages and produces a "rabble" (Pöbel) excluded from genuine participation. This is not a failure of markets per se but the internal dialectic of civil society demanding state regulation. The ongoing debates around antitrust law, welfare states, and labor standards are live instances of this Hegelian insight playing out in real political time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "clamp(24px, 4vw, 40px)",
          paddingBottom: "clamp(16px, 3vw, 24px)"
        }}>
          <p style={{
            fontSize: "clamp(10px, 1.3vw, 12px)",
            color: "#1e3a52",
            fontFamily: "Georgia, serif",
            fontStyle: "italic"
          }}>
            Part 8 of 20 — The Science of Freedom
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScienceOfFreedom;