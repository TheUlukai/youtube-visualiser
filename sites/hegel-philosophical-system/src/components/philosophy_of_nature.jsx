function PhilosophyOfNature() {
  const CORE_ARGUMENT = `Nature is not an independent realm separate from thought but the Absolute Idea in the form of otherness — logical structure realized in space, time, and matter. Unlike pure logical development, natural forms are characterized by contingency and external determination, which Hegel calls the 'impotence of nature.' Nevertheless, nature exhibits a rational progression from the most abstract forms (space, time, matter, motion) through physics (magnetism, electricity, chemistry) to organic life — each level showing greater internal unity and self-determination. Organic life achieves genuine individuality and self-maintenance but remains trapped in biological cycles and cannot take itself as its own object.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const [activeTier, setActiveTier] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredTier, setHoveredTier] = useState(null);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  const mechanicsCanvasRef = useRef(null);
  const physicsCanvasRef = useRef(null);
  const organicsCanvasRef = useRef(null);
  const animFrameRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mechanics animation: bouncing particle
  useEffect(() => {
    if (activeTier !== 'mechanics') return;
    const canvas = mechanicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 30, y = 30, vx = 2.2, vy = 1.7;
    let raf;
    const W = canvas.width, H = canvas.height;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = '#1a3a2a';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= W; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
      }
      for (let j = 0; j <= H; j += 20) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
      }
      // particle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#15803D';
      ctx.shadowColor = '#15803D';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      // trail
      x += vx; y += vy;
      if (x < 8 || x > W - 8) vx *= -1;
      if (y < 8 || y > H - 8) vy *= -1;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  // Physics animation: iron filings around magnet
  useEffect(() => {
    if (activeTier !== 'physics') return;
    const canvas = physicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // draw magnet
      const mx = W / 2, my = H / 2;
      ctx.fillStyle = '#0e2a1a';
      ctx.fillRect(mx - 18, my - 8, 36, 16);
      ctx.fillStyle = '#15803D';
      ctx.fillRect(mx - 18, my - 8, 18, 16);
      ctx.fillStyle = '#4a1a1a';
      ctx.fillRect(mx, my - 8, 18, 16);
      ctx.fillStyle = '#a3e6c0';
      ctx.font = 'bold 9px Georgia';
      ctx.fillText('N', mx - 13, my + 5);
      ctx.fillStyle = '#e6a3a3';
      ctx.fillText('S', mx + 8, my + 5);
      // field lines
      const numLines = 14;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const r0 = 22;
        ctx.beginPath();
        for (let r = r0; r < 80; r += 2) {
          const fx = Math.cos(angle) * r;
          const fy = Math.sin(angle) * r;
          // dipole field distortion
          const dx = fx - 18, dy = fy;
          const dx2 = fx + 18, dy2 = fy;
          const r1 = Math.sqrt(dx * dx + dy * dy) + 0.1;
          const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.1;
          const fieldX = dx / (r1 * r1 * r1) - dx2 / (r2 * r2 * r2);
          const fieldY = dy / (r1 * r1 * r1) - dy2 / (r2 * r2 * r2);
          const mag = Math.sqrt(fieldX * fieldX + fieldY * fieldY) + 0.001;
          const nx2 = fieldX / mag, ny2 = fieldY / mag;
          const px = mx + fx + nx2 * (r - r0) * 0.3;
          const py = my + fy + ny2 * (r - r0) * 0.3;
          if (r === r0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const alpha = 0.4 + 0.3 * Math.sin(t * 0.04 + i * 0.4);
        ctx.strokeStyle = `#15803D`;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // animated filings
      const filings = 28;
      for (let i = 0; i < filings; i++) {
        const baseAngle = (i / filings) * Math.PI * 2 + t * 0.005;
        const r = 30 + (i % 4) * 14;
        const fx = mx + Math.cos(baseAngle) * r;
        const fy = my + Math.sin(baseAngle) * r;
        const lineAngle = baseAngle + Math.PI / 2;
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(lineAngle);
        ctx.fillStyle = '#a3e6c0';
        ctx.globalAlpha = 0.7;
        ctx.fillRect(-5, -1, 10, 2);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  // Organics animation: growing/dying plant
  useEffect(() => {
    if (activeTier !== 'organics') return;
    const canvas = organicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    let raf;
    function drawBranch(x, y, angle, length, depth, alpha) {
      if (depth === 0 || length < 3) return;
      const ex = x + Math.cos(angle) * length;
      const ey = y - Math.sin(angle) * length;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = depth > 2 ? '#15803D' : '#4ade80';
      ctx.globalAlpha = alpha;
      ctx.lineWidth = depth * 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;
      drawBranch(ex, ey, angle + 0.45, length * 0.68, depth - 1, alpha * 0.9);
      drawBranch(ex, ey, angle - 0.45, length * 0.68, depth - 1, alpha * 0.9);
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // cell-like background circles
      for (let i = 0; i < 8; i++) {
        const cx = (i % 4) * (W / 3.5) + 10;
        const cy = H - 15 - Math.floor(i / 4) * 20;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = '#15803D';
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      // cycle: 0-120 grow, 120-180 full, 180-240 die
      const cycle = t % 240;
      let growFactor, deathAlpha;
      if (cycle < 120) {
        growFactor = cycle / 120;
        deathAlpha = 1;
      } else if (cycle < 180) {
        growFactor = 1;
        deathAlpha = 1;
      } else {
        growFactor = 1;
        deathAlpha = 1 - (cycle - 180) / 60;
      }
      const maxLen = 38 * growFactor;
      if (maxLen > 2) {
        ctx.save();
        drawBranch(W / 2, H - 10, Math.PI / 2, maxLen, 5, deathAlpha);
        ctx.restore();
      }
      // leaf cells near tips when grown
      if (growFactor > 0.7) {
        const leafAlpha = (growFactor - 0.7) / 0.3 * deathAlpha;
        for (let i = 0; i < 5; i++) {
          const lx = W / 2 + (i - 2) * 14;
          const ly = H - maxLen * 0.7 - 10;
          ctx.beginPath();
          ctx.ellipse(lx, ly, 6, 10, i * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = '#22c55e';
          ctx.globalAlpha = leafAlpha * 0.6;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      // soil
      ctx.fillStyle = '#0e2a1a';
      ctx.fillRect(0, H - 10, W, 10);
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [activeTier]);

  const accent = "#15803D";

  const keyConcepts = [
    { id: "externalization", label: "Externalization", desc: "Nature is the Absolute Idea in the form of externalization (Entäusserung): the logical structure that was entirely self-contained in the Logic now exists outside itself, dispersed in space and time. This is not a failure but a necessary moment — Spirit cannot return to itself without first having gone outside itself, and nature is that necessary outside." },
    { id: "contingency", label: "Contingency", desc: "Unlike the pure logical necessity of the Logic, natural forms are characterized by contingency and external determination. Hegel speaks of the 'impotence of nature' (Ohnmacht der Natur): natural things fail to fully realize their concept, exhibiting accident, irregularity, and deviation from rational form. This contingency is not a defect of our knowledge but an actual feature of natural existence as externalized spirit." },
    { id: "mechanics", label: "Mechanics", desc: "The first tier of nature is mechanics — the realm of space, time, matter, and motion. Here natural things are purely external to each other: they relate only through collision, gravitation, and displacement. Mechanics is nature at its most external, its least self-related. Gravity is the first hint of an inner relation — matter's tendency to be with other matter — but it remains an external force." },
    { id: "physics", label: "Physics", desc: "The second tier, physics, deals with qualitative natural forms: light, magnetism, electricity, chemical processes. Here natural things begin to exhibit inner distinctions and polar relations — they are no longer merely juxtaposed but stand in relations of attraction and repulsion, identity and difference. Physics shows nature becoming more self-differentiated, exhibiting something analogous to concept-structure." },
    { id: "organic_life", label: "Organic Life", desc: "Organic life is the highest stage of nature and the transition to Spirit. The living organism is self-maintaining — it actively preserves its form against the external environment, drawing matter into itself and transforming it according to its own inner principle. The organism has something like a concept of itself: a unified plan that it realizes and sustains. But it cannot take itself as its own object — that requires the transition to Spirit." },
    { id: "impotence_of_nature", label: "Impotence of Nature", desc: "Nature's highest achievement (the living individual organism) is simultaneously its limit: the organism cannot become self-conscious, cannot take its own concept as an object of knowledge, cannot know that it is a realization of logical structure. This is the impotence of nature — not weakness in a pejorative sense, but the structural boundary between natural existence and spiritual existence, the point where nature sublates itself into Spirit." },
  ];

  const tiers = [
    {
      id: 'mechanics',
      label: 'Mechanics',
      sublabel: 'Space · Time · Matter · Motion',
      description: 'The most abstract layer of nature: pure extension in space and time, mass and motion. Here logical categories appear as sheer externality — bodies defined by position and momentum, indifferent to one another. Necessity operates as blind mechanical law, with no internal principle of self-organization.',
      texture: 'grid',
      color: '#15803D',
      lightColor: '#4ade80',
    },
    {
      id: 'physics',
      label: 'Physics',
      sublabel: 'Magnetism · Electricity · Chemistry',
      description: 'Physical processes show greater internal differentiation: magnetism holds opposite poles in unity, electricity discharges tension between opposed charges, and chemistry transforms substances through their mutual negation. Here matter begins to exhibit something like inner polarity — the first hint of self-relation in natural forms.',
      texture: 'fields',
      color: '#166534',
      lightColor: '#86efac',
    },
    {
      id: 'organics',
      label: 'Organic Life',
      sublabel: 'Individuality · Self-Maintenance · Death',
      description: 'The living organism achieves genuine individuality: it actively maintains itself through continuous material exchange, metabolizes its environment, and reproduces its form. Yet organic life remains caught in biological cycles — it cannot take itself as object, cannot know itself as self. This is the impotence of nature at its highest.',
      texture: 'cells',
      color: '#14532d',
      lightColor: '#bbf7d0',
    },
  ];

  const pulseOpacity = 0.5 + 0.5 * Math.sin(pulsePhase * 0.2);
  const pulseY = -4 + 4 * Math.sin(pulsePhase * 0.2);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #052e16 0%, #0a0a0f 80%)',
      fontFamily: 'Georgia, serif',
      color: '#d1fae5',
      padding: 'clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)',
    }}>
      <div style={{
        maxWidth: 'min(90vw, 860px)',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(20px, 4vw, 36px)', textAlign: 'center' }}>
          <div style={{
            fontSize: 'clamp(10px, 1.5vw, 12px)',
            letterSpacing: '0.18em',
            color: '#4ade80',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>Part 6 of 20 — Philosophy of Nature</div>
          <h1 style={{
            fontSize: 'clamp(22px, 4vw, 38px)',
            fontWeight: 'bold',
            color: '#f0fdf4',
            margin: '0 0 10px 0',
            lineHeight: 1.2,
          }}>Nature as Idea in Otherness</h1>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#86efac',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}>Nature is the externalization of logical categories into spatial, temporal, and material existence — rational in structure yet marked by contingency.</p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: '#0c1a10',
          border: '1px solid #1a3a22',
          borderLeft: '4px solid #15803D',
          borderRadius: '8px',
          padding: 'clamp(16px, 3vw, 28px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 24px #0a2a1280',
        }}>
          <div style={{
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4ade80',
            marginBottom: '12px',
            fontVariant: 'small-caps',
          }}>The Problem</div>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#d1fae5',
            margin: 0,
            lineHeight: 1.7,
          }}>
            The Absolute Idea has achieved its fullest logical articulation — yet it remains purely conceptual, abstract, enclosed within thought's own movement. If the Idea is truly absolute, it cannot remain sealed within itself. It must externalize, must become other to itself. <em>But how do purely logical categories appear in the contingent, resisting materiality of the actual world?</em> How does necessity become nature — blind, spatial, temporal, shot through with accident?
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
          background: '#0a1a0f',
          border: '1px solid #1a3a22',
          borderRadius: '12px',
          padding: 'clamp(16px, 3vw, 32px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 40px #0a2a1240',
        }}>
          <h2 style={{
            fontSize: 'clamp(15px, 2.2vw, 20px)',
            color: '#f0fdf4',
            margin: '0 0 8px 0',
            letterSpacing: '0.04em',
          }}>The Ladder of Nature</h2>
          <p style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            color: '#86efac',
            margin: '0 0 24px 0',
            fontStyle: 'italic',
          }}>Click any tier to explore its examples and animations</p>

          {/* Ladder SVG + Tiers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
            {/* Transition to Spirit arrow at top */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '8px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `translateY(${pulseY}px)`,
                transition: 'none',
              }}>
                <div style={{
                  fontSize: 'clamp(9px, 1.3vw, 12px)',
                  color: '#4ade80',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: pulseOpacity,
                  border: '1px dashed #15803D',
                  borderRadius: '20px',
                  padding: '5px 16px',
                  marginBottom: '6px',
                  background: '#0a1f12',
                }}>Transition to Spirit</div>
                <svg viewBox="0 0 30 28" width="30" style={{ opacity: pulseOpacity }}>
                  <polygon points="15,0 28,28 2,28" fill="#15803D" />
                </svg>
              </div>
            </div>

            {/* Tiers in reverse order (organics on top, mechanics at bottom) */}
            {[...tiers].reverse().map((tier, reversedIdx) => {
              const isActive = activeTier === tier.id;
              const isHovered = hoveredTier === tier.id;
              return (
                <div key={tier.id}>
                  <div
                    onClick={() => setActiveTier(isActive ? null : tier.id)}
                    onMouseEnter={() => setHoveredTier(tier.id)}
                    onMouseLeave={() => setHoveredTier(null)}
                    style={{
                      cursor: 'pointer',
                      background: isActive
                        ? '#0d2a18'
                        : isHovered
                        ? '#0b2014'
                        : '#091509',
                      border: `2px solid ${isActive ? tier.color : isHovered ? '#1a4a2a' : '#112a18'}`,
                      borderLeft: `5px solid ${tier.color}`,
                      borderRadius: '8px',
                      padding: 'clamp(12px, 2vw, 20px)',
                      transition: 'all 0.2s',
                      boxShadow: isActive ? `0 0 20px ${tier.color}40` : isHovered ? `0 0 12px ${tier.color}20` : 'none',
                      marginBottom: isActive ? '0' : '6px',
                      borderBottomLeftRadius: isActive ? '0' : '8px',
                      borderBottomRightRadius: isActive ? '0' : '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{
                          fontSize: 'clamp(14px, 2vw, 18px)',
                          fontWeight: 'bold',
                          color: tier.lightColor,
                          marginBottom: '2px',
                        }}>{tier.label}</div>
                        <div style={{
                          fontSize: 'clamp(10px, 1.4vw, 13px)',
                          color: '#86efac',
                          fontStyle: 'italic',
                        }}>{tier.sublabel}</div>
                      </div>
                      <div style={{
                        color: tier.lightColor,
                        fontSize: 'clamp(18px, 2.5vw, 22px)',
                        marginLeft: '12px',
                        transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}>
                        {isActive ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isActive && (
                    <div style={{
                      background: '#061210',
                      border: `2px solid ${tier.color}`,
                      borderTop: 'none',
                      borderRadius: '0 0 8px 8px',
                      padding: 'clamp(14px, 2.5vw, 24px)',
                      marginBottom: '6px',
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        alignItems: 'center',
                      }}>
                        {/* Canvas animation */}
                        <div style={{ width: '100%', maxWidth: '320px' }}>
                          <div style={{
                            fontSize: 'clamp(9px, 1.2vw, 11px)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: tier.lightColor,
                            marginBottom: '6px',
                            textAlign: 'center',
                          }}>
                            {tier.id === 'mechanics' && 'Mechanical Motion'}
                            {tier.id === 'physics' && 'Magnetic Field Lines'}
                            {tier.id === 'organics' && 'Growth & Death Cycle'}
                          </div>
                          <div style={{
                            border: `1px solid ${tier.color}`,
                            borderRadius: '6px',
                            overflow: 'hidden',
                            background: '#040e08',
                          }}>
                            {tier.id === 'mechanics' && (
                              <canvas
                                ref={mechanicsCanvasRef}
                                width={280}
                                height={120}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                            {tier.id === 'physics' && (
                              <canvas
                                ref={physicsCanvasRef}
                                width={280}
                                height={140}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                            {tier.id === 'organics' && (
                              <canvas
                                ref={organicsCanvasRef}
                                width={280}
                                height={140}
                                style={{ display: 'block', width: '100%' }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{
                          fontSize: 'clamp(12px, 1.6vw, 15px)',
                          color: '#d1fae5',
                          margin: 0,
                          lineHeight: 1.75,
                          textAlign: 'left',
                          width: '100%',
                        }}>{tier.description}</p>

                        {/* Key concepts chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
                          {tier.id === 'mechanics' && ['externalization', 'contingency', 'mechanics'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                          {tier.id === 'physics' && ['physics', 'polarity', 'chemistry'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                          {tier.id === 'organics' && ['organic life', 'impotence of nature', 'individuality'].map(c => (
                            <span key={c} style={{
                              background: '#0d2a18',
                              border: `1px solid ${tier.color}`,
                              borderRadius: '20px',
                              padding: '3px 12px',
                              fontSize: 'clamp(10px, 1.3vw, 12px)',
                              color: tier.lightColor,
                              letterSpacing: '0.08em',
                            }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Ground line */}
            <div style={{
              borderTop: '2px solid #1a3a22',
              marginTop: '8px',
              paddingTop: '8px',
              textAlign: 'center',
              fontSize: 'clamp(10px, 1.3vw, 12px)',
              color: '#4ade80',
              letterSpacing: '0.12em',
              opacity: 0.6,
            }}>Pure Logical Categories — point of departure</div>
          </div>

          {/* Core argument prose */}
          <div style={{
            marginTop: 'clamp(20px, 3vw, 28px)',
            borderTop: '1px solid #1a3a22',
            paddingTop: 'clamp(16px, 2.5vw, 24px)',
          }}>
            <p style={{
              fontSize: 'clamp(13px, 1.7vw, 15px)',
              color: '#a7f3d0',
              margin: 0,
              lineHeight: 1.8,
            }}>
              Nature is not a realm separate from thought — it is the Absolute Idea in the form of otherness, logical structure realized as space, time, and matter. Unlike the clean necessity of pure logic, natural forms are characterized by contingency and external determination: what Hegel calls the <em>impotence of nature</em>. Yet nature is not chaos. It exhibits a rational progression — from the bare exteriority of mechanics through the polar tensions of physical processes to the self-maintaining unity of organic life. Each level shows greater internal self-relation, until at the apex the living organism achieves genuine individuality. But it cannot take itself as its own object. Nature's highest achievement is also its limit.
            </p>
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
          background: '#0c1a10',
          border: '1px solid #1a3a22',
          borderLeft: '4px solid #166534',
          borderRadius: '8px',
          padding: 'clamp(16px, 3vw, 28px)',
          marginBottom: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 0 24px #0a2a1260',
        }}>
          <div style={{
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#4ade80',
            marginBottom: '12px',
            fontVariant: 'small-caps',
          }}>The Difficulty</div>
          <p style={{
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: '#d1fae5',
            margin: '0 0 14px 0',
            lineHeight: 1.7,
          }}>
            Even the highest form of organic life cannot transcend the biological cycle of growth, reproduction, and death. The organism self-maintains, but it remains locked in repetition — its individuality is always finite, always reclaimed by nature's indifferent processes. It cannot step outside itself, cannot recognize itself <em>as itself</em>. The gap between living and knowing remains absolute within nature's own resources.
          </p>
          <p style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            color: '#86efac',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            This pressure forces the next development: if nature reaches its own limit in the organism that cannot know itself, something must arise that is no longer merely natural — something that can take its own existence as an object. This is the demand for Spirit, and it cannot be met from within nature alone.
          </p>
        </div>

        {/* REAL-WORLD ECHOES (collapsible) */}
        <div style={{
          background: '#0a1a0f',
          border: '1px solid #1a3a22',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: 'clamp(16px, 3vw, 24px)',
        }}>
          <button
            onClick={() => setEchosOpen(o => !o)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 'clamp(14px, 2.5vw, 20px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'Georgia, serif',
            }}
          >
            <span style={{
              fontSize: 'clamp(9px, 1.2vw, 11px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4ade80',
              fontVariant: 'small-caps',
            }}>Real-World Echoes</span>
            <span style={{ color: '#4ade80' }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          {echosOpen && (
            <div style={{
              padding: 'clamp(4px, 1vw, 8px) clamp(16px, 3vw, 28px) clamp(16px, 3vw, 28px)',
              borderTop: '1px solid #1a3a22',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    title: 'The Magnet as Self-Organizing System',
                    body: 'A magnet maintains its polarity through continuous interaction with its magnetic field and surrounding matter — an inanimate object exhibiting something like self-organization. For Hegel, this is physics showing the first trace of internal relation: the system is defined by its own internal tension, not merely by external forces acting upon it.'
                  },
                  {
                    title: 'Living Organisms and Metabolic Identity',
                    body: 'Every living cell continuously replaces its own constituents while maintaining its form — the organism persists through constant material change. This is Hegelian self-maintenance made biological: identity is not static substance but active self-reproduction. Yet the cell has no experience of itself, no self-knowledge.'
                  },
                  {
                    title: 'Death as the Dialectical Limit',
                    body: 'Death is not an external accident that happens to organisms but the internal contradiction of finite natural individuality made explicit. The organism\'s very effort to maintain itself — metabolism, growth, reproduction — is driven by and ultimately consumed by its finitude. Hegel reads this as nature itself pointing beyond biology toward something that can acknowledge its own mortality.'
                  },
                ].map((echo, i) => (
                  <div key={i} style={{
                    borderLeft: '3px solid #15803D',
                    paddingLeft: '16px',
                  }}>
                    <div style={{
                      fontSize: 'clamp(12px, 1.6vw, 14px)',
                      color: '#4ade80',
                      marginBottom: '6px',
                      fontWeight: 'bold',
                    }}>{echo.title}</div>
                    <p style={{
                      fontSize: 'clamp(12px, 1.6vw, 14px)',
                      color: '#d1fae5',
                      margin: 0,
                      lineHeight: 1.7,
                    }}>{echo.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav hint */}
        <div style={{
          textAlign: 'center',
          fontSize: 'clamp(10px, 1.4vw, 12px)',
          color: '#166534',
          letterSpacing: '0.1em',
          paddingBottom: '8px',
        }}>
          — Nature's limit points toward Part 7: The Philosophy of Spirit —
        </div>
      </div>
    </div>
  );
}

export default PhilosophyOfNature;