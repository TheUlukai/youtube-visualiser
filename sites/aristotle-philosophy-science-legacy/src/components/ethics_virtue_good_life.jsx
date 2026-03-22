function EthicsVirtueGoodLife() {
  const ACCENT = "#EA580C";
  const ACCENT_LIGHT = "#FB923C";
  const ACCENT_DIM = "#3a1a06";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";
  const BG = "radial-gradient(ellipse at 40% 30%, #2a1005 0%, #0f0805 60%, #0a0a0f 100%)";

  const [selectedVirtue, setSelectedVirtue] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [practiceCount, setPracticeCount] = useState(0);
  const [practiceLabel, setPracticeLabel] = useState("");
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const virtues = [
    {
      name: "Courage",
      deficiency: "Cowardice",
      excess: "Recklessness",
      scenarios: [
        {
          label: "Facing Protest Danger",
          defDesc: "You flee at the first sign of risk, abandoning fellow protesters to danger — driven purely by fear.",
          meanDesc: "You stay to support others despite real danger, acting from principle — fear is felt but mastered by reason.",
          excessDesc: "You charge into violence recklessly, heedless of genuine peril — confusing bravado with bravery.",
        },
        {
          label: "Confronting a Bully",
          defDesc: "You look away, pretending not to notice, prioritizing your comfort over justice.",
          meanDesc: "You intervene proportionally — firm but measured — addressing the situation without needless escalation.",
          excessDesc: "You escalate immediately to aggression, seeking confrontation beyond what the situation warrants.",
        },
        {
          label: "Whistleblowing at Work",
          defDesc: "You stay silent about serious wrongdoing, letting fear of retaliation override your duty.",
          meanDesc: "You report the wrongdoing through appropriate channels, accepting real personal risk for the right reason.",
          excessDesc: "You broadcast everything recklessly without regard for collateral harm to uninvolved parties.",
        },
      ],
    },
    {
      name: "Generosity",
      deficiency: "Miserliness",
      excess: "Profligacy",
      scenarios: [
        {
          label: "Friend in Financial Need",
          defDesc: "You refuse any help, prioritizing your wealth over genuine care for a close friend.",
          meanDesc: "You give what you can meaningfully afford — neither too little nor so much it harms your own stability.",
          excessDesc: "You give everything impulsively, leaving yourself unable to help anyone — including yourself — later.",
        },
        {
          label: "Charitable Giving",
          defDesc: "You find every reason to avoid giving, even when you have substantial surplus.",
          meanDesc: "You give regularly and deliberately to worthwhile causes, proportionate to your means and their need.",
          excessDesc: "You give compulsively to feel good, without discernment, often to causes that squander the funds.",
        },
        {
          label: "Managing Shared Expenses",
          defDesc: "You consistently underpay your share, burdening others with costs that are rightfully yours.",
          meanDesc: "You contribute your fair share — neither exploiting others nor insisting on extravagant over-contribution.",
          excessDesc: "You throw money at every shared cost to avoid discomfort, enabling poor financial decisions by others.",
        },
      ],
    },
    {
      name: "Temperance",
      deficiency: "Insensibility",
      excess: "Self-Indulgence",
      scenarios: [
        {
          label: "Eating and Drinking",
          defDesc: "You deny yourself all pleasure as if bodily appetite were shameful, becoming joyless and austere.",
          meanDesc: "You enjoy food and drink with genuine pleasure, neither obsessing nor denying — savoring without excess.",
          excessDesc: "You pursue bodily pleasures compulsively, allowing appetite to override reason and duty.",
        },
        {
          label: "Social Pleasures",
          defDesc: "You refuse all leisure and fun, treating enjoyment as a moral failing.",
          meanDesc: "You participate in social pleasure appropriately — present, joyful, and still capable of restraint.",
          excessDesc: "You chase every pleasure immediately, unable to delay gratification even when important things call.",
        },
        {
          label: "Rest and Recreation",
          defDesc: "You work without rest, treating any recreation as waste — leading to burnout and rigidity.",
          meanDesc: "You rest and play appropriately, recognizing that recovery and joy are part of a flourishing life.",
          excessDesc: "You prioritize leisure so heavily that duties and relationships suffer under the weight of self-pleasure.",
        },
      ],
    },
    {
      name: "Justice",
      deficiency: "Unfairness (taking too little)",
      excess: "Grasping (taking too much)",
      scenarios: [
        {
          label: "Dividing Resources",
          defDesc: "You assign yourself too little out of false modesty, creating imbalance and devaluing your contribution.",
          meanDesc: "You divide proportionally to contribution and need — neither self-serving nor self-abnegating.",
          excessDesc: "You claim more than your share, rationalizing advantage while others bear undue costs.",
        },
        {
          label: "Evaluating Colleagues",
          defDesc: "You consistently underrate yourself and others from excessive deference, distorting accurate judgment.",
          meanDesc: "You assess merit honestly and proportionally, giving each person what they genuinely deserve.",
          excessDesc: "You inflate your evaluations of allies and deflate those of rivals to gain unfair advantage.",
        },
        {
          label: "Civic Participation",
          defDesc: "You withdraw entirely from civic life, refusing to shoulder any communal burden.",
          meanDesc: "You contribute to civic life proportionally to your capacity — present, honest, and fairly engaged.",
          excessDesc: "You manipulate civic structures to concentrate power and advantage beyond your just share.",
        },
      ],
    },
  ];

  const keyConcepts = [
    {
      id: "eudaimonia",
      label: "Eudaimonia",
      desc: "Eudaimonia is often translated as 'happiness' but is better rendered as flourishing or living well. For Aristotle it is not a feeling or pleasant state but an ongoing activity — a life of excellent rational activity expressed through virtuous character and meaningful relationships. It is the final end to which all human action ultimately aims.",
    },
    {
      id: "mean",
      label: "Doctrine of the Mean",
      desc: "Virtue is a disposition to choose the mean between excess and deficiency — but this is not arithmetic. The mean is relative to the person and situation, requiring practical wisdom to identify. The courageous response for a trained soldier differs from that for an untrained civilian facing the same threat.",
    },
    {
      id: "phronesis",
      label: "Phronesis",
      desc: "Practical wisdom (phronesis) is the master intellectual virtue that guides all the moral virtues. It is the cultivated capacity to discern what reason demands in each particular situation — not a set of rules but a kind of perceptual sensitivity developed through experience, reflection, and good character.",
    },
    {
      id: "habituation",
      label: "Habituation",
      desc: "We become virtuous by practicing virtuous acts, just as we become builders by building. Virtue cannot be acquired by reading about it — it requires repeated action until the disposition becomes second nature. The goal is not mere compliance but genuine desire: the virtuous person wants to do the right thing.",
    },
    {
      id: "philia",
      label: "Friendship (Philia)",
      desc: "Aristotle considered deep friendship (philia) essential to eudaimonia, not merely instrumental. The highest form is friendship based on mutual admiration of character — each person wishing the good of the other for the other's own sake. Such friendship is a mirror in which we see and develop our own virtue.",
    },
    {
      id: "function",
      label: "Function Argument",
      desc: "Aristotle argues that every kind of thing has a characteristic function (ergon). The function of a human being is rational activity — what distinguishes us from plants (nutrition) and animals (sensation). Living well means performing this function excellently, which just is exercising virtue of the rational soul.",
    },
  ];

  const currentVirtue = virtues[selectedVirtue];
  const currentScenario = currentVirtue.scenarios[selectedScenario];

  const sliderRegion = sliderValue < 33 ? "deficiency" : sliderValue > 66 ? "excess" : "mean";
  const sliderDescription =
    sliderRegion === "deficiency"
      ? currentScenario.defDesc
      : sliderRegion === "excess"
      ? currentScenario.excessDesc
      : currentScenario.meanDesc;

  const sliderLabel =
    sliderRegion === "deficiency"
      ? currentVirtue.deficiency
      : sliderRegion === "excess"
      ? currentVirtue.excess
      : currentVirtue.name + " (The Mean)";

  const sliderColor =
    sliderRegion === "deficiency"
      ? "#6b7280"
      : sliderRegion === "excess"
      ? "#dc2626"
      : ACCENT;

  const gaugePercent = Math.min((practiceCount / 20) * 100, 100);
  const gaugeStage =
    gaugePercent < 25
      ? "Novice — acts reluctantly, with effort"
      : gaugePercent < 50
      ? "Developing — acts consistently but with strain"
      : gaugePercent < 75
      ? "Practiced — acts well, rarely struggles"
      : gaugePercent < 100
      ? "Habituated — virtue feels natural, not forced"
      : "Character Formed — virtue is second nature";

  function handlePractice() {
    if (practiceCount < 20) {
      setPracticeCount((c) => c + 1);
      setPracticeLabel("Practice act performed!");
      setTimeout(() => setPracticeLabel(""), 1200);
    }
  }

  function handleReset() {
    setPracticeCount(0);
    setPracticeLabel("Character gauge reset.");
    setTimeout(() => setPracticeLabel(""), 1200);
  }

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
        color: TITLE_COLOR,
        padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
      }}
    >
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 8,
            }}
          >
            Part 10 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: "normal",
              color: TITLE_COLOR,
              margin: "0 0 8px 0",
            }}
          >
            Ethics, Virtue, Character, and the Good Life
          </h1>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: SUBTITLE_COLOR,
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            Aristotle grounded morality in human flourishing, arguing that virtue is a stable disposition of character cultivated through habituation and guided by practical wisdom.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.35)",
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: "0 8px 8px 0",
            padding: "clamp(14px, 3vw, 22px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
            Aristotle's metaphysics established that things have natural functions whose fulfillment constitutes their excellence, and his psychology showed that humans are rational animals — but what does excellent rational activity as a human actually look like in practice, and how do we cultivate it?
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}44`,
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 28px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 18,
            }}
          >
            Interactive Virtue Explorer
          </div>

          {/* Virtue Selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR, marginBottom: 10, letterSpacing: 1 }}>
              Choose a Virtue:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {virtues.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => { setSelectedVirtue(i); setSelectedScenario(0); setSliderValue(50); }}
                  style={{
                    background: selectedVirtue === i ? ACCENT : "rgba(0,0,0,0.4)",
                    border: `1px solid ${selectedVirtue === i ? ACCENT : ACCENT + "55"}`,
                    borderRadius: 20,
                    color: selectedVirtue === i ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(12px, 1.6vw, 14px)",
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                    transition: "all 0.2s",
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR, marginBottom: 10, letterSpacing: 1 }}>
              Choose a Situation:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {currentVirtue.scenarios.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => { setSelectedScenario(i); setSliderValue(50); }}
                  style={{
                    background: selectedScenario === i ? ACCENT + "33" : "transparent",
                    border: `1px solid ${selectedScenario === i ? ACCENT : ACCENT + "33"}`,
                    borderRadius: 6,
                    color: selectedScenario === i ? ACCENT_LIGHT : SUBTITLE_COLOR,
                    fontSize: "clamp(11px, 1.5vw, 13px)",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Virtue Spectrum Diagram */}
          <div style={{ marginBottom: 20 }}>
            <svg
              viewBox="0 0 600 80"
              width="100%"
              style={{ display: "block", maxWidth: "100%" }}
              aria-label="Virtue spectrum diagram"
            >
              {/* Background gradient bar */}
              <defs>
                <linearGradient id="virtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="40%" stopColor={ACCENT} />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <rect x="40" y="28" width="520" height="14" rx="7" fill="url(#virtGrad)" opacity="0.5" />

              {/* Mean zone highlight */}
              <rect x="213" y="26" width="174" height="18" rx="9" fill={ACCENT} opacity="0.2" />
              <rect x="213" y="26" width="174" height="18" rx="9" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />

              {/* Slider thumb */}
              <circle
                cx={40 + (sliderValue / 100) * 520}
                cy="35"
                r="12"
                fill={sliderColor}
                stroke="#f0ead8"
                strokeWidth="2"
                style={{ filter: `drop-shadow(0 0 6px ${sliderColor})` }}
              />

              {/* Labels */}
              <text x="40" y="68" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="Georgia, serif">
                {currentVirtue.deficiency}
              </text>
              <text x="300" y="16" textAnchor="middle" fill={ACCENT_LIGHT} fontSize="12" fontFamily="Georgia, serif" fontStyle="italic">
                {currentVirtue.name}
              </text>
              <text x="560" y="68" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="Georgia, serif">
                {currentVirtue.excess}
              </text>
            </svg>

            {/* Slider Input */}
            <div style={{ padding: "0 4px" }}>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: ACCENT,
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "clamp(10px, 1.3vw, 12px)", color: SUBTITLE_COLOR }}>
                <span>← Deficiency</span>
                <span>The Mean</span>
                <span>Excess →</span>
              </div>
            </div>
          </div>

          {/* Response Description */}
          <div
            style={{
              background: "rgba(0,0,0,0.35)",
              border: `1px solid ${sliderColor}55`,
              borderLeft: `4px solid ${sliderColor}`,
              borderRadius: "0 8px 8px 0",
              padding: "clamp(12px, 2vw, 18px)",
              marginBottom: 8,
              minHeight: 80,
              transition: "border-color 0.3s",
            }}
          >
            <div
              style={{
                fontSize: "clamp(10px, 1.4vw, 12px)",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: sliderColor,
                marginBottom: 8,
              }}
            >
              {sliderLabel}
            </div>
            <p style={{ fontSize: "clamp(13px, 1.7vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
              {sliderDescription}
            </p>
          </div>
          {sliderRegion === "mean" && (
            <div
              style={{
                background: ACCENT + "11",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: "clamp(12px, 1.6vw, 13px)",
                color: ACCENT_LIGHT,
                fontStyle: "italic",
              }}
            >
              Aristotle: The mean is not the same for everyone. Phronesis — practical wisdom — discerns what the situation and person require. The virtuous person acts at the right time, in the right way, to the right degree, toward the right person, for the right reason.
            </div>
          )}

          {/* Habituation Panel */}
          <div
            style={{
              marginTop: 28,
              background: "rgba(0,0,0,0.25)",
              border: `1px solid ${ACCENT}33`,
              borderRadius: 8,
              padding: "clamp(14px, 2.5vw, 22px)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 14,
              }}
            >
              The Habituation Model
            </div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: SUBTITLE_COLOR, lineHeight: 1.7, margin: "0 0 16px 0" }}>
              Virtue is not innate — it is built through practice. Each act of {currentVirtue.name.toLowerCase()} shapes the character. Click to practice virtuous acts and watch the disposition solidify.
            </p>

            {/* Gauge */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "clamp(11px, 1.5vw, 13px)", color: SUBTITLE_COLOR }}>
                <span>Character Gauge</span>
                <span style={{ color: ACCENT_LIGHT }}>{Math.round(gaugePercent)}%</span>
              </div>
              <div
                style={{
                  height: 18,
                  background: "rgba(0,0,0,0.5)",
                  borderRadius: 9,
                  border: `1px solid ${ACCENT}44`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${gaugePercent}%`,
                    background: gaugePercent === 100
                      ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`
                      : `linear-gradient(90deg, ${ACCENT}99, ${ACCENT})`,
                    borderRadius: 9,
                    transition: "width 0.4s ease",
                    boxShadow: gaugePercent > 50 ? `0 0 10px ${ACCENT}88` : "none",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: "clamp(12px, 1.6vw, 13px)",
                  color: gaugePercent === 100 ? ACCENT_LIGHT : SUBTITLE_COLOR,
                  fontStyle: "italic",
                  minHeight: 20,
                }}
              >
                {gaugeStage}
              </div>
            </div>

            {/* Practice markers */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "clamp(12px, 3vw, 18px)",
                    height: "clamp(12px, 3vw, 18px)",
                    borderRadius: "50%",
                    background: i < practiceCount ? ACCENT : "rgba(0,0,0,0.4)",
                    border: `1px solid ${i < practiceCount ? ACCENT : ACCENT + "33"}`,
                    transition: "background 0.3s",
                    boxShadow: i < practiceCount ? `0 0 4px ${ACCENT}66` : "none",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={handlePractice}
                disabled={practiceCount >= 20}
                style={{
                  background: practiceCount >= 20 ? "rgba(0,0,0,0.3)" : ACCENT,
                  border: "none",
                  borderRadius: 6,
                  color: practiceCount >= 20 ? SUBTITLE_COLOR : "#f0ead8",
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  padding: "9px 20px",
                  cursor: practiceCount >= 20 ? "not-allowed" : "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "background 0.2s",
                }}
              >
                Practice {currentVirtue.name}
              </button>
              <button
                onClick={handleReset}
                style={{
                  background: "transparent",
                  border: `1px solid ${ACCENT}55`,
                  borderRadius: 6,
                  color: ACCENT_LIGHT,
                  fontSize: "clamp(12px, 1.6vw, 14px)",
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                }}
              >
                Reset
              </button>
              {practiceLabel && (
                <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: ACCENT_LIGHT, fontStyle: "italic" }}>
                  {practiceLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 24px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 14,
            }}
          >
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 14 : 0 }}>
            {keyConcepts.map((kc) => (
              <button
                key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT : ACCENT + "66"}`,
                  borderRadius: 20,
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontSize: "clamp(12px, 1.5vw, 13px)",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s",
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (
            <div
              style={{
                background: ACCENT + "11",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "clamp(12px, 2vw, 18px)",
                marginTop: 4,
              }}
            >
              <div style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: TITLE_COLOR, fontWeight: "bold", marginBottom: 8 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ fontSize: "clamp(12px, 1.7vw, 14px)", color: "#c8bfb0", lineHeight: 1.8, margin: 0 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.35)",
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: "0 8px 8px 0",
            padding: "clamp(14px, 3vw, 22px)",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: "0 0 10px 0" }}>
            Grounding ethics in human nature and function faces Hume's is-ought gap — facts about human nature do not automatically yield normative conclusions about how we should live. Even granting that humans have a rational function, why must we perform it excellently, or at all? The naturalistic foundation Aristotle offers is philosophically contested.
          </p>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "#c8bfb0", lineHeight: 1.75, margin: 0 }}>
            Aristotle's specific catalogue of virtues also appears culturally parochial — designed for aristocratic Greek males with leisure for philosophical contemplation, raising charges of elitism and exclusion that any revival must squarely address. This pressure forces the next development: how can practical and productive knowledge be systematized, and what is the relationship between wisdom and making?
          </p>
        </div>

        {/* REAL-WORLD ECHOES PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchosOpen((o) => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(12px, 2.5vw, 18px) clamp(16px, 3vw, 24px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              Real-World Echoes
            </span>
            {echosOpen ? (
              <ChevronUp size={16} color={ACCENT} />
            ) : (
              <ChevronDown size={16} color={ACCENT} />
            )}
          </button>
          {echosOpen && (
            <div
              style={{
                padding: "0 clamp(16px, 3vw, 24px) clamp(16px, 3vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  MacIntyre's After Virtue and the Revival
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Alasdair MacIntyre's 1981 diagnosis of modern moral philosophy as fragmented and incoherent — and his argument that only a return to Aristotelian virtue ethics could provide a coherent moral framework — sparked a major revival that now dominates academic ethics alongside its Kantian and utilitarian rivals.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Nussbaum's Capabilities Approach
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Martha Nussbaum extended Aristotle's eudaimonia into a cross-cultural framework for human development, arguing that flourishing requires a threshold of capabilities — not just GDP — and using this to critique development economics and global poverty. Her approach has directly influenced UN human development indices.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Moral Psychology and Character Research
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Psychological research on moral development — from Bandura's social learning theory to Angela Duckworth's work on grit and character — has largely confirmed Aristotle's intuition that moral character is formed through practice, modeling, and habituation rather than purely through rational rule-following.
                </p>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: "0 6px 6px 0",
                  background: ACCENT + "0a",
                  padding: "14px 18px",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                  Virtue Ethics in Professional Education
                </div>
                <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                  Medical, legal, and business ethics education has increasingly adopted virtue ethics frameworks, recognizing that rule-based compliance training is insufficient for cultivating the practical wisdom and integrity that professions actually require. Character formation programs in medicine explicitly draw on the habituation model.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div
          style={{
            textAlign: "center",
            marginTop: 36,
            fontSize: 12,
            color: ACCENT_DIM,
            letterSpacing: 1,
          }}
        >
          Part 10 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>

      </div>
    </div>
  );
}

export default EthicsVirtueGoodLife;