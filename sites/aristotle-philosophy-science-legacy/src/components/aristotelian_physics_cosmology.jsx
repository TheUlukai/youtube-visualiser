function AristotelianPhysicsCosmology() {
  const ACCENT = "#D97706";
  const ACCENT_LIGHT = "#F59E0B";
  const ACCENT_DIM = "#3a2a08";
  const TITLE_COLOR = "#f0ead8";
  const SUBTITLE_COLOR = "#b8b0a8";

  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showRightAnswers, setShowRightAnswers] = useState(false);
  const [echoesOpen, setEchoesOpen] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAnimFrame(f => (f + 1) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const keyConcepts = [
    { id: "naturalviolent", label: "Natural vs. Violent Motion", desc: "Natural motion is a body's intrinsic tendency to seek its proper place — earth falls, fire rises — requiring no external cause once released. Violent motion is imposed against a body's nature by continuous contact with an external mover: the moment the mover stops touching, violent motion ceases. This distinction was Aristotle's alternative to inertia, and it made intuitive sense until Galileo showed that falling bodies accelerate uniformly regardless of weight." },
    { id: "fiveelements", label: "Five Elements & Natural Places", desc: "Earth, water, air, fire, and quintessence (aether) each have a natural place in a layered cosmos: earth at the center, water surrounding it, air above, fire at the periphery of the sublunary realm, and aether composing the unchanging celestial spheres beyond. A displaced element 'seeks' its natural place — an Aristotelian explanation of gravity and buoyancy that conflates direction with causation." },
    { id: "noinertia", label: "Absence of Inertia", desc: "Aristotle held that every motion requires a continuous mover — if you throw a stone, the air disturbed by the throw must continue pushing the stone after it leaves your hand. Newton's First Law — that bodies in motion stay in motion without any continuing force — directly contradicts this. The absence of the concept of inertia meant Aristotle could not account for projectile motion, planetary orbits, or any uniform rectilinear motion without invoking a sustaining cause." },
    { id: "continuousmover", label: "Continuous Mover Principle", desc: "Aristotle demanded that for every motion there is a mover in continuous contact: omne quod movetur ab alio movetur — everything moved is moved by another. This principle was his solution to the chain of causation, ultimately terminating in the Unmoved Mover. It produced a physics where transmitted force requires physical contact at every moment, which made action at a distance — gravity, magnetism, electromagnetism — literally inconceivable within the system." },
    { id: "sublunarycelestial", label: "Sublunary vs. Celestial Realms", desc: "Below the Moon everything is composed of the four elements, subject to generation and corruption. Above the Moon the heavens are made of quintessence, which moves only in perfect eternal circles and never changes in any other way. This two-realm division was demolished by Galileo's telescopic observations of sunspots and lunar mountains, and by Newton's demonstration that the same gravitational law governs both falling apples and orbiting moons." },
    { id: "novacuum", label: "Rejection of Vacuum", desc: "Aristotle argued that a vacuum is impossible: motion requires a medium to offer resistance, and without resistance motion would be instantaneous — which is absurd. He also argued that a void has no directional properties and thus could not explain natural motion toward places. Torricelli's barometer, Pascal's experiments, and eventually the vacuum of outer space refuted this completely, though Einstein's curved spacetime ironically echoed Aristotle's intuition that space itself has structure." },
  ];

  const objects = [
    { id: "stone", label: "Falling Stone", aristotle: "Earth element seeks its natural place at the center. Falls because its nature demands it. Heavier = more earth = falls faster.", modern: "Gravity accelerates all bodies equally (9.8 m/s²) regardless of mass. Inertia — not nature — is the fundamental property." },
    { id: "flame", label: "Rising Flame", aristotle: "Fire element seeks its natural place at the periphery of the sublunary sphere. Rises naturally, requiring no mover.", modern: "Hot gas is less dense than surrounding air; buoyancy (pressure differential) pushes it upward. No 'natural place' involved." },
    { id: "moon", label: "The Moon", aristotle: "Made of quintessence. Moves in a perfect eternal circle carried by a celestial sphere. Never changes, never corrupts.", modern: "Rocky body orbiting under gravity. Has mountains, craters, and is slowly spiraling away from Earth. Same physics as falling stone." },
    { id: "arrow", label: "Fired Arrow", aristotle: "Violent motion imposed by the bow. Air closed behind the arrow pushes it forward. Stops when disturbed air is exhausted.", modern: "Inertia carries the arrow. Air drag decelerates it. No continued push needed — Newton's First Law." },
  ];

  const selectedObj = objects.find(o => o.id === selectedObject);

  const cx = 130, cy = 130, r = 120;
  const deg = (animFrame * Math.PI) / 180;

  const renderAristotelianCosmos = () => {
    const layers = [
      { r: 118, color: "#6366f1", label: "Quintessence" },
      { r: 90, color: "#f97316", label: "Fire" },
      { r: 68, color: "#93c5fd", label: "Air" },
      { r: 50, color: "#1d4ed8", label: "Water" },
      { r: 32, color: "#78716c", label: "Earth" },
    ];
    const moonAngle = deg;
    const moonX = cx + 90 * Math.cos(moonAngle);
    const moonY = cy + 90 * Math.sin(moonAngle);

    const arrowPath = selectedObject === "arrow"
      ? `M${cx + 20},${cy} L${cx + 75},${cy - 5}`
      : null;

    return (
      <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 300 }}>
        {layers.map((l, i) => (
          <circle key={i} cx={cx} cy={cy} r={l.r} fill={l.color}
            fillOpacity={0.18} stroke={l.color} strokeWidth={1.2} strokeOpacity={0.5} />
        ))}
        {/* Earth */}
        <circle cx={cx} cy={cy} r={18} fill="#57534e" stroke="#78716c" strokeWidth={1.5} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill="#e7e5e4" fontFamily="Georgia, serif">Earth</text>

        {/* Moon orbiting */}
        <circle cx={moonX} cy={moonY} r={8}
          fill={selectedObject === "moon" ? "#c4b5fd" : "#d1d5db"}
          stroke={selectedObject === "moon" ? ACCENT_LIGHT : "#9ca3af"}
          strokeWidth={selectedObject === "moon" ? 2 : 1} />

        {/* Quintessence sphere ring */}
        <circle cx={cx} cy={cy} r={108} fill="none" stroke="#6366f1" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.4} />

        {/* Natural motion arrows */}
        {/* Stone falls */}
        {selectedObject === "stone" && (
          <g>
            <circle cx={cx + 50} cy={cy - 60} r={6} fill="#78716c" stroke={ACCENT} strokeWidth={2} />
            <line x1={cx + 50} y1={cy - 54} x2={cx + 50} y2={cy - 28} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <text x={cx + 62} y={cy - 55} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">seeks center</text>
          </g>
        )}
        {selectedObject === "flame" && (
          <g>
            <ellipse cx={cx - 50} cy={cy + 40} rx={6} ry={10} fill="#f97316" fillOpacity={0.9} stroke={ACCENT} strokeWidth={1.5} />
            <line x1={cx - 50} y1={cy + 30} x2={cx - 50} y2={cy + 5} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <text x={cx - 80} y={cy + 20} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">seeks periphery</text>
          </g>
        )}
        {selectedObject === "arrow" && (
          <g>
            <line x1={cx + 10} y1={cy} x2={cx + 80} y2={cy - 10} stroke={ACCENT_LIGHT} strokeWidth={2} markerEnd="url(#arrow-a)" />
            <circle cx={cx + 80} cy={cy - 10} r={4} fill="#a8a29e" stroke={ACCENT} strokeWidth={1.5} />
            <text x={cx + 30} y={cy - 16} fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">air pushes</text>
          </g>
        )}
        {selectedObject === "moon" && (
          <g>
            <circle cx={moonX} cy={moonY} r={8} fill="none" stroke={ACCENT_LIGHT} strokeWidth={2} strokeDasharray="3 2" />
            <text x={cx} y={cy + 105} textAnchor="middle" fontSize="8" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">perfect circle, eternal</text>
          </g>
        )}

        {/* Right-answers highlight */}
        {showRightAnswers && (
          <g>
            <circle cx={cx} cy={cy} r={115} fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="6 4" strokeOpacity={0.7} />
            <text x={cx} y={18} textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="Georgia, serif">Space has structure ✓</text>
          </g>
        )}

        <defs>
          <marker id="arrow-a" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ACCENT_LIGHT} />
          </marker>
        </defs>

        <text x={cx} y={250} textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">Aristotle's Cosmos</text>
        <text x={cx} y={10} textAnchor="middle" fontSize="8" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif" fontStyle="italic">geocentric · layered elements</text>
      </svg>
    );
  };

  const renderModernCosmos = () => {
    const sunX = 130, sunY = 130;
    const planetData = [
      { name: "Mercury", orbitR: 30, size: 3, color: "#a8a29e", speed: 4.1 },
      { name: "Venus", orbitR: 48, size: 5, color: "#fde68a", speed: 1.6 },
      { name: "Earth", orbitR: 68, size: 6, color: "#3b82f6", speed: 1.0 },
      { name: "Mars", orbitR: 90, size: 4, color: "#ef4444", speed: 0.53 },
    ];

    return (
      <svg viewBox="0 0 260 260" width="100%" style={{ maxWidth: 300 }}>
        {/* Sun */}
        <circle cx={sunX} cy={sunY} r={16} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
        <circle cx={sunX} cy={sunY} r={22} fill="none" stroke="#fbbf24" strokeWidth={1} strokeOpacity={0.3} />
        <text x={sunX} y={sunY + 4} textAnchor="middle" fontSize="8" fill="#292524" fontFamily="Georgia, serif" fontWeight="bold">Sun</text>

        {planetData.map((p, i) => {
          const angle = deg * p.speed + i * 1.2;
          const px = sunX + p.orbitR * Math.cos(angle);
          const py = sunY + p.orbitR * Math.sin(angle);

          const isEarth = p.name === "Earth";
          const moonAngle2 = deg * 3 + i;
          const moonX2 = px + 13 * Math.cos(moonAngle2);
          const moonY2 = py + 13 * Math.sin(moonAngle2);

          const highlightMoon = selectedObject === "moon" && isEarth;
          const highlightEarth = selectedObject === "stone" && isEarth;

          return (
            <g key={p.name}>
              <ellipse cx={sunX} cy={sunY} rx={p.orbitR} ry={p.orbitR * 0.92}
                fill="none" stroke="#374151" strokeWidth={0.8} strokeDasharray="3 3" />
              <circle cx={px} cy={py} r={p.size}
                fill={p.color}
                stroke={highlightEarth ? ACCENT_LIGHT : "#fff"}
                strokeWidth={highlightEarth ? 2 : 0.5} />

              {/* Gravity vector toward sun */}
              {(selectedObject === "stone" && isEarth) && (
                <line x1={px} y1={py} x2={sunX + (px - sunX) * 0.3} y2={sunY + (py - sunY) * 0.3}
                  stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" strokeOpacity={0.8} />
              )}

              {isEarth && (
                <g>
                  <circle cx={sunX} cy={sunY} r={p.orbitR + 14}
                    fill="none" stroke="#374151" strokeWidth={0.5} strokeDasharray="2 3" />
                  <circle cx={moonX2} cy={moonY2} r={3}
                    fill={highlightMoon ? "#c4b5fd" : "#9ca3af"}
                    stroke={highlightMoon ? ACCENT_LIGHT : "#6b7280"}
                    strokeWidth={highlightMoon ? 2 : 0.5} />
                  {highlightMoon && (
                    <line x1={moonX2} y1={moonY2} x2={px + (moonX2 - px) * 0.2} y2={py + (moonY2 - py) * 0.2}
                      stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" strokeOpacity={0.8} />
                  )}
                </g>
              )}

              {selectedObject === "flame" && isEarth && (
                <g>
                  <ellipse cx={px + 8} cy={py - 8} rx={4} ry={7} fill="#f97316" fillOpacity={0.8} />
                  <text x={px + 18} y={py - 12} fontSize="7" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">buoyancy</text>
                </g>
              )}

              {selectedObject === "arrow" && isEarth && (
                <g>
                  <line x1={px - 12} y1={py} x2={px + 12} y2={py - 5}
                    stroke={ACCENT_LIGHT} strokeWidth={1.5} markerEnd="url(#arrow-m)" />
                  <text x={px - 10} y={py - 10} fontSize="7" fill={ACCENT_LIGHT} fontFamily="Georgia, serif">inertia</text>
                </g>
              )}
            </g>
          );
        })}

        {showRightAnswers && (
          <g>
            <text x={sunX} y={22} textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="Georgia, serif">Curved spacetime ≈ Aristotle's structured space ✓</text>
            <circle cx={sunX} cy={sunY} r={115} fill="none" stroke="#10b981" strokeWidth={1.5} strokeDasharray="5 3" strokeOpacity={0.5} />
          </g>
        )}

        <defs>
          <marker id="arrow-m" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ACCENT_LIGHT} />
          </marker>
        </defs>

        <text x={sunX} y={250} textAnchor="middle" fontSize="10" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif">Modern Cosmos</text>
        <text x={sunX} y={10} textAnchor="middle" fontSize="8" fill={SUBTITLE_COLOR} fontFamily="Georgia, serif" fontStyle="italic">heliocentric · gravity · inertia</text>
      </svg>
    );
  };

  return (
    <div style={{
      background: "radial-gradient(ellipse at 40% 30%, #3a1a02 0%, #1a0e00 40%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "clamp(16px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: "#e7e5e4"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 7 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Physics, Motion, and Cosmology
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle's comprehensive physics of natural and violent motion, natural places, and a geocentric finite cosmos was spectacularly wrong yet asked all the right questions.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 3vw, 22px)",
          marginBottom: 20
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
            Aristotle's form-matter and potentiality-actuality framework needed a physical theory to explain how actual movers actualize potentials in the material world — a metaphysics of change required a corresponding physics of motion. The grand categories of hylomorphism demanded to know: what actually moves what, by what mechanism, according to what laws? Without a physics, metaphysics floated free of the world it claimed to explain.
          </p>
        </div>

        {/* MAIN VISUALIZATION */}
        <div style={{
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${ACCENT}44`,
          borderRadius: 10,
          padding: "clamp(14px, 3vw, 26px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Two Cosmos, One Object — Interactive Comparison
          </div>

          {/* Object selector */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {objects.map(obj => (
              <button key={obj.id}
                onClick={() => setSelectedObject(selectedObject === obj.id ? null : obj.id)}
                style={{
                  background: selectedObject === obj.id ? ACCENT : "rgba(0,0,0,0.3)",
                  border: `1px solid ${selectedObject === obj.id ? ACCENT_LIGHT : ACCENT + "55"}`,
                  borderRadius: 20,
                  color: selectedObject === obj.id ? "#fff" : SUBTITLE_COLOR,
                  padding: "6px 14px",
                  fontSize: "clamp(11px,1.6vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}>
                {obj.label}
              </button>
            ))}
            <button
              onClick={() => setShowRightAnswers(r => !r)}
              style={{
                background: showRightAnswers ? "#065f46" : "rgba(0,0,0,0.3)",
                border: `1px solid ${showRightAnswers ? "#10b981" : "#374151"}`,
                borderRadius: 20,
                color: showRightAnswers ? "#6ee7b7" : SUBTITLE_COLOR,
                padding: "6px 14px",
                fontSize: "clamp(11px,1.6vw,13px)",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.2s"
              }}>
              Where Aristotle Was Right ✓
            </button>
          </div>

          {/* Side by side cosmos */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 200px", minWidth: 180, maxWidth: 320 }}>
              {renderAristotelianCosmos()}
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
              <div style={{ color: ACCENT, fontSize: 20, fontWeight: "bold" }}>vs.</div>
            </div>
            <div style={{ flex: "1 1 200px", minWidth: 180, maxWidth: 320 }}>
              {renderModernCosmos()}
            </div>
          </div>

          {/* Explanation panel */}
          {selectedObj && (
            <div style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 12
            }}>
              <div style={{
                flex: "1 1 180px",
                background: "rgba(217,119,6,0.08)",
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 16px"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  Aristotle on {selectedObj.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                  {selectedObj.aristotle}
                </p>
              </div>
              <div style={{
                flex: "1 1 180px",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid #3b82f644",
                borderRadius: 8,
                padding: "14px 16px"
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#60a5fa", marginBottom: 8 }}>
                  Modern Physics on {selectedObj.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                  {selectedObj.modern}
                </p>
              </div>
            </div>
          )}

          {showRightAnswers && (
            <div style={{
              marginTop: 16,
              background: "rgba(6,78,59,0.2)",
              border: "1px solid #10b98155",
              borderRadius: 8,
              padding: "14px 16px"
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#10b981", marginBottom: 8 }}>
                Where Aristotle Was Right
              </div>
              <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c9c1b8", lineHeight: 1.7, margin: 0 }}>
                Einstein's curved spacetime vindicates Aristotle's intuition that space itself has properties — it is not a neutral void but a structured medium that shapes motion. Aristotle was also right that different domains of reality may require different explanatory principles (sublunary vs. celestial), even if he drew the boundary wrongly. His insistence that physics must account for all four kinds of change — place, quality, quantity, substance — anticipated a truly general physical theory.
              </p>
            </div>
          )}

          {!selectedObj && !showRightAnswers && (
            <p style={{ textAlign: "center", fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, marginTop: 14, fontStyle: "italic" }}>
              Click an object above to animate both cosmologies simultaneously, or toggle "Where Aristotle Was Right."
            </p>
          )}
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${ACCENT}33`,
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: hoveredConcept ? 16 : 0 }}>
            {keyConcepts.map(kc => (
              <button key={kc.id}
                onClick={() => setHoveredConcept(hoveredConcept === kc.id ? null : kc.id)}
                style={{
                  background: hoveredConcept === kc.id ? ACCENT : "transparent",
                  border: `1px solid ${hoveredConcept === kc.id ? ACCENT_LIGHT : ACCENT + "66"}`,
                  borderRadius: 20,
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  padding: "6px 14px",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  transition: "all 0.2s"
                }}>
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const kc = keyConcepts.find(k => k.id === hoveredConcept);
            return kc ? (
              <div style={{
                background: `${ACCENT}11`,
                border: `1px solid ${ACCENT}44`,
                borderRadius: 8,
                padding: "14px 18px"
              }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 8 }}>
                  {kc.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
                  {kc.desc}
                </p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.35)",
          borderLeft: `4px solid ${ACCENT}`,
          borderRadius: "0 8px 8px 0",
          padding: "clamp(14px, 3vw, 22px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c9c1b8", lineHeight: 1.75, margin: 0 }}>
            Reliance on unaided phenomenological observation without controlled experiments or mathematics produced a physics that was internally consistent but fundamentally wrong about falling bodies, inertia, planetary orbits, and the structure of the cosmos. Galileo showed that objects fall at the same rate regardless of weight — directly contradicting Aristotle. Kepler showed orbits are ellipses, not circles. Newton unified sublunary and celestial physics under a single law. The system's very coherence made it dangerous: it gave philosophical authority to observable illusions, lending scholarly prestige to errors for nearly two millennia. This pressure forces the next development — the question of how Aristotle's teleological biology and psychology tried to operate on better observational ground than his physics.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => setEchoesOpen(o => !o)}
            style={{
              width: "100%",
              background: "transparent",
              border: `1px solid ${ACCENT}33`,
              borderRadius: echoesOpen ? "8px 8px 0 0" : 8,
              padding: "14px 18px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, fontFamily: "Georgia, serif" }}>
              Real-World Echoes
            </span>
            {echoesOpen ? <ChevronUp size={16} color={ACCENT} /> : <ChevronDown size={16} color={ACCENT} />}
          </button>
          {echoesOpen && (
            <div style={{
              background: "rgba(0,0,0,0.25)",
              border: `1px solid ${ACCENT}33`,
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: "clamp(14px, 3vw, 22px)"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Galileo's Inclined Plane Experiments", body: "By rolling balls down inclined planes and timing them with water clocks, Galileo proved that all bodies fall with equal acceleration regardless of mass — directly refuting Aristotle's claim that heavier earth-laden objects fall faster. The experiment required a controlled setup precisely because common observation seemed to confirm Aristotle: air resistance does make heavy objects fall faster in practice. Controlled experiment was the methodological revolution." },
                  { title: "Kepler's Elliptical Orbits", body: "Kepler's three laws of planetary motion, derived from Tycho Brahe's precise observational data, showed that planets move in ellipses with varying speed — utterly impossible within Aristotle's framework of perfect circular motion at constant speed. The quintessence of celestial spheres was replaced by mathematical curves describable by equations, demolishing the sublunary/celestial divide." },
                  { title: "Newton's Universal Gravitation", body: "Newton's inverse-square law of gravitation applied identically to a falling apple and the orbiting Moon, proving that Aristotle's two realms — sublunary and celestial — operate under a single set of physical laws. The Principia Mathematica of 1687 was the definitive refutation of Aristotelian cosmology, replacing natural places and quintessence with force, mass, and acceleration." },
                  { title: "Einstein's Curved Spacetime", body: "General relativity describes gravity not as a force but as the curvature of spacetime — space itself has properties that direct the motion of objects. In an ironic vindication, Aristotle was right that space is not a neutral void. He was wrong about what those properties are and how they work, but his rejection of a featureless vacuum as physically incoherent anticipated that spacetime geometry is a physical entity with causal power." },
                ].map((card, i) => (
                  <div key={i} style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    borderRadius: "0 6px 6px 0",
                    background: `${ACCENT}0a`,
                    padding: "14px 18px"
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
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 7 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

export default AristotelianPhysicsCosmology;