function AristotleIntroduction() {
  const ACCENT = "#C2410C";
  const ACCENT_LIGHT = "#f97316";
  const ACCENT_DIM = "#3a1205";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echoesOpen, setEchoesOpen] = useState(false);

  const domains = [
    {
      id: "logic",
      label: "Logic",
      angle: 0,
      legacyScore: 92,
      retained: true,
      claim: "Syllogistic reasoning is the foundation of valid inference — if A implies B, and B implies C, then A implies C.",
      modern: "Formal logic still uses Aristotelian syllogisms as its historical bedrock. Predicate logic extended rather than replaced his framework. His core insight was correct.",
    },
    {
      id: "ethics",
      label: "Ethics",
      angle: 45,
      legacyScore: 85,
      retained: true,
      claim: "Virtue is a mean between extremes; human flourishing (eudaimonia) is the highest good and purpose of life.",
      modern: "Virtue ethics is a major contemporary school. Aristotle's 'eudaimonia' directly informs modern debates in moral philosophy, psychology, and political theory.",
    },
    {
      id: "biology",
      label: "Biology",
      angle: 90,
      legacyScore: 60,
      retained: false,
      claim: "Women have fewer teeth than men. Spontaneous generation creates flies from rotting meat. The heart is the seat of thought.",
      modern: "Spectacularly wrong on anatomy — women and men have the same number of teeth. Spontaneous generation was disproven by Pasteur. The brain, not the heart, controls thought.",
    },
    {
      id: "physics",
      label: "Physics",
      angle: 135,
      legacyScore: 15,
      retained: false,
      claim: "Heavier objects fall faster than lighter ones. All matter is composed of four elements: earth, water, fire, air.",
      modern: "Galileo disproved falling-body claims experimentally. Newtonian mechanics and atomic theory replaced elemental theory entirely. Almost nothing survived.",
    },
    {
      id: "politics",
      label: "Politics",
      angle: 180,
      legacyScore: 78,
      retained: true,
      claim: "Humans are political animals (zoon politikon). The best government balances elements of monarchy, aristocracy, and democracy.",
      modern: "The idea of humans as inherently social/political beings remains foundational. Constitutional mixed governance echoes his Politeia. His classification of government types persists in political science.",
    },
    {
      id: "metaphysics",
      label: "Metaphysics",
      angle: 225,
      legacyScore: 80,
      retained: true,
      claim: "Substance, essence, form, and matter are the fundamental categories of being. Everything has a telos — a final purpose.",
      modern: "Aristotelian categories shaped medieval scholasticism and persist in contemporary ontology. 'Essence' debates in analytic philosophy trace directly to his Metaphysics.",
    },
    {
      id: "rhetoric",
      label: "Rhetoric",
      angle: 270,
      legacyScore: 88,
      retained: true,
      claim: "Persuasion rests on three pillars: ethos (credibility), pathos (emotion), and logos (logic). Rhetoric is a neutral art of discourse.",
      modern: "Ethos, pathos, logos are taught in every communications curriculum worldwide. His Rhetoric remains the foundational text of the field after 2,400 years.",
    },
    {
      id: "poetics",
      label: "Poetics",
      angle: 315,
      legacyScore: 82,
      retained: true,
      claim: "Tragedy achieves catharsis through pity and fear. Drama must have unity of plot; character serves story.",
      modern: "Catharsis, mimesis, and dramatic unity remain central to literary criticism and film theory. Screenwriting manuals still cite Aristotle's three-act structure implicitly.",
    },
  ];

  const keyConcepts = [
    {
      id: "systematic",
      label: "Systematic Philosophy",
      desc: "Aristotle was the first thinker to attempt a total account of reality — not just ethics or nature, but everything simultaneously. His treatises form an interconnected web where logic grounds biology, biology informs ethics, and ethics shapes politics. This systematic ambition set the template for what 'philosophy' as a discipline would mean for millennia.",
    },
    {
      id: "observation",
      label: "Observation & Reason",
      desc: "Unlike his teacher Plato, Aristotle insisted that knowledge must begin with sensory observation of the actual world. He dissected animals, surveyed 158 constitutions, and catalogued hundreds of species. Yet he also recognized that raw observation without rational structure yields only data, not understanding — the combination of both is his signature method.",
    },
    {
      id: "dominance",
      label: "Intellectual Dominance",
      desc: "For nearly 1,800 years — from roughly 300 CE to 1600 CE — Aristotle's texts were the intellectual scaffolding of Western civilization. Medieval universities taught 'the Philosopher' (no first name needed) as near-scripture. Islamic scholars preserved and extended his work during Europe's Dark Ages. Disagreeing with Aristotle required extraordinary justification.",
    },
    {
      id: "wrong",
      label: "Spectacularly Wrong",
      desc: "Aristotle claimed women have fewer teeth than men, that heavier objects fall faster, and that the brain is merely a cooling organ for the blood. He never counted teeth or tested falling bodies — revealing that even his empirical method had blind spots. His errors are as instructive as his insights: they show where confident deduction outran careful observation.",
    },
    {
      id: "frameworks",
      label: "Conceptual Frameworks",
      desc: "Even when specific Aristotelian claims were overturned, his conceptual frameworks often survived. The categories of substance and accident, the distinction between form and matter, the idea of teleological explanation — these are lenses through which we still perceive philosophical problems, whether or not we endorse the original answers Aristotle gave.",
    },
    {
      id: "legacy",
      label: "Philosophical Legacy",
      desc: "Contemporary law uses Aristotelian notions of equity and proportional justice. Modern biology's taxonomy traces to his classification project. Virtue ethics is a thriving field in moral philosophy. Literary criticism still debates catharsis. No other single thinker has seeded so many living intellectual traditions simultaneously across such unrelated domains.",
    },
  ];

  const realWorldEchoes = [
    {
      title: "How We Organize Knowledge",
      body: "University faculties — humanities, sciences, social sciences, arts — reflect Aristotle's original disciplinary divisions. The very idea that knowledge can be partitioned into domains with distinct methods is his. Library classification systems, academic journal categories, and curriculum design all trace their logic to his encyclopedic project of sorting what there is to know.",
    },
    {
      title: "How We Justify Moral Choices",
      body: "When people argue that a character trait (honesty, courage, compassion) is a virtue that leads to human flourishing, they are reasoning in Aristotelian terms — whether they know it or not. Contemporary moral psychology, positive psychology's concept of 'well-being,' and legal notions of 'good character' all flow from his Nicomachean Ethics.",
    },
    {
      title: "How We Structure Scientific Inquiry",
      body: "The demand that scientific claims be grounded in observation, that causes be sought rather than mere correlations, and that explanations identify what a thing fundamentally is — these methodological commitments are Aristotelian. The Scientific Revolution refined his methods but inherited the basic epistemological architecture.",
    },
    {
      title: "Rhetoric and Modern Persuasion",
      body: "Every political speech, advertising campaign, and courtroom argument is unconsciously structured by Aristotle's three appeals: ethos (why should I trust you?), pathos (how does this make me feel?), logos (does the reasoning hold?). Marketing consultants and debate coaches use exactly these categories, often without knowing their ancient source.",
    },
  ];

  const cx = 200;
  const cy = 200;
  const outerR = 150;
  const innerR = 42;
  const spokePad = 18;

  function polarToXY(angleDeg, r) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function getLegacyColor(score, retained) {
    if (retained) {
      const t = (score - 60) / 40;
      return ACCENT_LIGHT;
    }
    return "#4a4a5a";
  }

  const active = selectedDomain || hoveredDomain;
  const activeDomain = domains.find((d) => d.id === active);

  return (
    <div
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #3a1205 0%, #0a0a0f 80%)`,
        minHeight: "100vh",
        padding: "clamp(20px, 4vw, 48px) clamp(12px, 3vw, 24px)",
        fontFamily: "Georgia, serif",
        color: TITLE_COLOR,
      }}
    >
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 10,
            }}
          >
            Part 1 of 15 — Aristotle: Philosophy, Science & Legacy
          </div>
          <h1
            style={{
              fontSize: "clamp(22px,4vw,36px)",
              fontWeight: "normal",
              color: TITLE_COLOR,
              margin: "0 0 10px 0",
              lineHeight: 1.3,
            }}
          >
            The Most Influential Mind in History
          </h1>
          <p
            style={{
              fontSize: "clamp(13px,2vw,16px)",
              color: SUBTITLE_COLOR,
              margin: 0,
              lineHeight: 1.7,
              fontStyle: "italic",
              maxWidth: 620,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Understanding Aristotle's extraordinary reach across disciplines and why even his errors reveal a systematic genius.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div
          style={{
            background: "rgba(0,0,0,0.38)",
            border: `1px solid ${ACCENT}44`,
            borderRadius: 12,
            padding: "clamp(16px,3vw,32px)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 4,
            }}
          >
            Aristotle's Domain — Interactive Map
          </div>
          <p style={{ fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, margin: "0 0 20px 0", lineHeight: 1.6 }}>
            Click any domain spoke to reveal what Aristotle claimed, what modernity thinks, and how much survived. Glowing spokes indicate lasting influence; dimmed spokes mark where he was overturned.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg
              viewBox="0 0 400 400"
              width="100%"
              style={{ maxWidth: 420, display: "block" }}
              aria-label="Aristotle domain radial diagram"
            >
              {/* Outer ring */}
              <circle
                cx={cx}
                cy={cy}
                r={outerR + 14}
                fill="none"
                stroke={ACCENT + "22"}
                strokeWidth={1}
              />
              <circle
                cx={cx}
                cy={cy}
                r={outerR - 10}
                fill="none"
                stroke={ACCENT + "15"}
                strokeWidth={1}
                strokeDasharray="4 6"
              />

              {/* Spokes and labels */}
              {domains.map((d) => {
                const tip = polarToXY(d.angle, outerR - spokePad);
                const labelPos = polarToXY(d.angle, outerR + 26);
                const isActive = active === d.id;
                const glowColor = d.retained ? ACCENT_LIGHT : "#6a6a7a";
                const strokeColor = isActive ? ACCENT_LIGHT : d.retained ? ACCENT + "cc" : "#4a4a5a";
                const strokeW = isActive ? 3.5 : 2;

                // Score marker position
                const markerR = innerR + ((outerR - innerR - spokePad) * d.legacyScore) / 100;
                const markerPos = polarToXY(d.angle, markerR);

                return (
                  <g key={d.id}>
                    {/* Spoke line */}
                    <line
                      x1={polarToXY(d.angle, innerR).x}
                      y1={polarToXY(d.angle, innerR).y}
                      x2={tip.x}
                      y2={tip.y}
                      stroke={strokeColor}
                      strokeWidth={strokeW}
                      strokeLinecap="round"
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />

                    {/* Glow effect for retained */}
                    {d.retained && (
                      <line
                        x1={polarToXY(d.angle, innerR).x}
                        y1={polarToXY(d.angle, innerR).y}
                        x2={tip.x}
                        y2={tip.y}
                        stroke={ACCENT_LIGHT}
                        strokeWidth={isActive ? 8 : 5}
                        strokeLinecap="round"
                        opacity={isActive ? 0.18 : 0.08}
                        style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
                      />
                    )}

                    {/* Legacy score marker */}
                    <circle
                      cx={markerPos.x}
                      cy={markerPos.y}
                      r={isActive ? 6 : 4}
                      fill={d.retained ? ACCENT_LIGHT : "#6a6a7a"}
                      opacity={isActive ? 1 : 0.7}
                      style={{ transition: "r 0.3s, opacity 0.3s" }}
                    />

                    {/* Hit area */}
                    <line
                      x1={polarToXY(d.angle, innerR).x}
                      y1={polarToXY(d.angle, innerR).y}
                      x2={tip.x}
                      y2={tip.y}
                      stroke="transparent"
                      strokeWidth={22}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedDomain(selectedDomain === d.id ? null : d.id)
                      }
                      onMouseEnter={() => setHoveredDomain(d.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    />

                    {/* Domain label */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? ACCENT_LIGHT : d.retained ? "#d4c8b8" : SUBTITLE_COLOR}
                      fontSize={isActive ? 13 : 11.5}
                      fontFamily="Georgia, serif"
                      style={{
                        cursor: "pointer",
                        transition: "fill 0.3s, font-size 0.3s",
                        userSelect: "none",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                      onClick={() =>
                        setSelectedDomain(selectedDomain === d.id ? null : d.id)
                      }
                      onMouseEnter={() => setHoveredDomain(d.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Center circle */}
              <circle
                cx={cx}
                cy={cy}
                r={innerR}
                fill="#0a0a0f"
                stroke={ACCENT}
                strokeWidth={2}
              />
              <circle
                cx={cx}
                cy={cy}
                r={innerR - 6}
                fill="none"
                stroke={ACCENT + "44"}
                strokeWidth={1}
              />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                fill={TITLE_COLOR}
                fontSize={13}
                fontFamily="Georgia, serif"
                fontStyle="italic"
              >
                Aristotle
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fill={ACCENT + "cc"}
                fontSize={9}
                fontFamily="Georgia, serif"
                letterSpacing={1}
              >
                384–322 BCE
              </text>

              {/* Legend */}
              <g transform="translate(16, 370)">
                <circle cx={7} cy={7} r={5} fill={ACCENT_LIGHT} opacity={0.85} />
                <text x={16} y={11} fill={SUBTITLE_COLOR} fontSize={9.5} fontFamily="Georgia, serif">
                  Largely retained
                </text>
                <circle cx={110} cy={7} r={5} fill="#6a6a7a" />
                <text x={119} y={11} fill={SUBTITLE_COLOR} fontSize={9.5} fontFamily="Georgia, serif">
                  Largely overturned
                </text>
              </g>
            </svg>

            {/* Detail panel */}
            <div
              style={{
                width: "100%",
                minHeight: 140,
                background: activeDomain ? "rgba(194,65,12,0.08)" : "rgba(0,0,0,0.2)",
                border: `1px solid ${activeDomain ? ACCENT + "55" : "#ffffff11"}`,
                borderRadius: 8,
                padding: "clamp(14px,2vw,20px)",
                transition: "background 0.4s, border-color 0.4s",
              }}
            >
              {activeDomain ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "clamp(16px,2.5vw,22px)",
                        color: activeDomain.retained ? ACCENT_LIGHT : "#9a9ab0",
                        fontWeight: "bold",
                      }}
                    >
                      {activeDomain.label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: activeDomain.retained ? ACCENT_LIGHT : "#6a6a7a",
                        background: activeDomain.retained ? ACCENT + "22" : "#6a6a7a22",
                        border: `1px solid ${activeDomain.retained ? ACCENT + "55" : "#6a6a7a55"}`,
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      {activeDomain.retained ? "Largely Retained" : "Largely Overturned"}
                    </span>
                  </div>

                  {/* Legacy score bar */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: SUBTITLE_COLOR, marginBottom: 4, letterSpacing: 1 }}>
                      LEGACY SCORE — {activeDomain.legacyScore}%
                    </div>
                    <div style={{ height: 6, background: "#ffffff15", borderRadius: 4, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${activeDomain.legacyScore}%`,
                          background: activeDomain.retained
                            ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`
                            : "#4a4a5a",
                          borderRadius: 4,
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: ACCENT,
                          marginBottom: 4,
                        }}
                      >
                        Aristotle's Claim
                      </div>
                      <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: "#d4c8b8", lineHeight: 1.7, fontStyle: "italic" }}>
                        "{activeDomain.claim}"
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: activeDomain.retained ? ACCENT_LIGHT : "#9a9ab0",
                          marginBottom: 4,
                        }}
                      >
                        Modern Assessment
                      </div>
                      <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.7 }}>
                        {activeDomain.modern}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 140,
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ fontSize: "clamp(13px,2vw,15px)", color: SUBTITLE_COLOR, fontStyle: "italic", textAlign: "center" }}>
                    Click or hover any domain spoke to explore Aristotle's claims and their modern legacy.
                  </div>
                  <div style={{ fontSize: 11, color: ACCENT + "88", letterSpacing: 1 }}>
                    8 DOMAINS · 2,400 YEARS OF INFLUENCE
                  </div>
                </div>
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
            marginBottom: 16,
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: hoveredConcept ? 16 : 0,
            }}
          >
            {keyConcepts.map((kc) => {
              const isActive = hoveredConcept === kc.id;
              return (
                <button
                  key={kc.id}
                  onClick={() => setHoveredConcept(isActive ? null : kc.id)}
                  style={{
                    background: isActive ? ACCENT : "transparent",
                    border: `1px solid ${isActive ? ACCENT : ACCENT + "66"}`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    color: isActive ? "#f0ead8" : ACCENT_LIGHT,
                    fontSize: "clamp(11px,1.6vw,13px)",
                    fontFamily: "Georgia, serif",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s, color 0.2s",
                  }}
                >
                  {kc.label}
                </button>
              );
            })}
          </div>
          {hoveredConcept && (
            <div
              style={{
                marginTop: 12,
                background: ACCENT + "12",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 6,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(12px,1.8vw,14px)", color: SUBTITLE_COLOR, lineHeight: 1.75 }}>
                {keyConcepts.find((k) => k.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${ACCENT}33`,
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: 8,
            padding: "clamp(16px,3vw,24px)",
            marginBottom: 16,
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
          <p style={{ margin: 0, fontSize: "clamp(13px,1.9vw,15px)", color: "#d4c8b8", lineHeight: 1.8 }}>
            If Aristotle was both profoundly right and spectacularly wrong, we need a principled method for distinguishing what to keep from what to discard. His legacy score varies from 92% in Logic to barely 15% in Physics — yet both emerged from the same mind using ostensibly the same approach of observation and reason. This tension raises the deeper question of what philosophical method he was actually using and where it came from. This pressure forces the next development: understanding the intellectual world Aristotle inherited and how his method was forged from it.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 8,
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setEchoesOpen(!echoesOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px) clamp(16px,3vw,24px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ACCENT,
                fontFamily: "Georgia, serif",
              }}
            >
              Real-World Echoes
            </span>
            {echoesOpen ? (
              <ChevronUp size={16} color={ACCENT} />
            ) : (
              <ChevronDown size={16} color={ACCENT} />
            )}
          </button>

          {echoesOpen && (
            <div
              style={{
                padding: "0 clamp(16px,3vw,24px) clamp(16px,3vw,24px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {realWorldEchoes.map((echo, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    borderRadius: "0 6px 6px 0",
                    background: ACCENT + "0a",
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: ACCENT_LIGHT,
                      marginBottom: 6,
                    }}
                  >
                    {echo.title}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#b8b0a8",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {echo.body}
                  </p>
                </div>
              ))}
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
          Part 1 of 15 — Aristotle: Philosophy, Science & Legacy
        </div>
      </div>
    </div>
  );
}

export default AristotleIntroduction;