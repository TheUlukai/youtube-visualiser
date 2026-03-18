function UnhappyConsciousness() {
  const [asceticLevel, setAsceticLevel] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [echosOpen, setEchosOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [resolveProgress, setResolveProgress] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const resolveAnimRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  const concepts = [
    { id: "unhappy", label: "Unhappy Consciousness", desc: "The form of awareness split between what it is and what it longs to be — finite existence gazing upward at an infinite it can never grasp." },
    { id: "division", label: "Finite vs. Infinite", desc: "Consciousness experiences itself as base, changing, mortal — while projecting all perfection onto an unchanging, eternal, unreachable beyond." },
    { id: "asceticism", label: "Self-Denial & Asceticism", desc: "Every renunciation of finite pleasure is meant to close the gap — yet each act of self-denial reinforces the very split it seeks to heal." },
    { id: "alienation", label: "Religious Alienation", desc: "The divine becomes wholly other: the more magnificent the transcendent, the more worthless finite existence appears by comparison." },
    { id: "heart", label: "The Devoted Heart", desc: "Feeling replaces knowledge; the yearning itself becomes proof of connection — yet the beloved infinite remains perpetually absent." },
    { id: "mediated", label: "Mediated Immediacy", desc: "The resolution arrives not by escaping finitude but by discovering that infinity is always already present within finite forms." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.offsetWidth;
      canvas.height = Math.min(container.offsetWidth * 0.75, 480);
    });
    resizeObserver.observe(container);
    canvas.width = container.offsetWidth;
    canvas.height = Math.min(container.offsetWidth * 0.75, 480);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.001,
          vy: (Math.random() - 0.5) * 0.001,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          hue: Math.random() > 0.5 ? "finite" : "infinite",
        });
      }
    };
    initParticles();

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
      bg.addColorStop(0, "#1a0a3a");
      bg.addColorStop(1, "#04020f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const baseFiniteY = H * 0.82;
      const baseInfiniteY = H * 0.12;
      const silhouetteY = H * 0.47;

      const stretchFactor = resolved ? 0 : asceticLevel / 100;
      const rp = resolved ? resolveProgress : 0;

      // Compute positions with stretch
      const finiteY = resolved
        ? silhouetteY * (1 - rp) + baseFiniteY * rp + (silhouetteY - (silhouetteY * (1 - rp) + baseFiniteY * rp)) * rp
        : baseFiniteY + stretchFactor * H * 0.03;

      const infiniteY = resolved
        ? silhouetteY * (1 - rp) + baseInfiniteY * rp - (((silhouetteY * (1 - rp) + baseInfiniteY * rp)) - silhouetteY) * rp
        : baseInfiniteY - stretchFactor * H * 0.08;

      const finiteActualY = resolved
        ? baseFiniteY + (silhouetteY - baseFiniteY) * rp
        : baseFiniteY + stretchFactor * H * 0.03;

      const infiniteActualY = resolved
        ? baseInfiniteY + (silhouetteY - baseInfiniteY) * rp
        : baseInfiniteY - stretchFactor * H * 0.08;

      const finiteR = resolved ? 28 * (1 - rp * 0.5) : 28;
      const infiniteR = resolved ? 36 * (1 - rp * 0.5) : 36 - stretchFactor * 6;
      const mergedR = resolved ? 32 * rp : 0;

      // Draw tension line
      if (!resolved || rp < 0.8) {
        const lineAlpha = resolved ? 1 - rp : 0.4 + stretchFactor * 0.3;
        ctx.save();
        ctx.globalAlpha = lineAlpha;
        const grad = ctx.createLinearGradient(cx, infiniteActualY, cx, finiteActualY);
        grad.addColorStop(0, "#e8d5ff");
        grad.addColorStop(0.5, "#7C3AED");
        grad.addColorStop(1, "#4a4a6a");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + stretchFactor * 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, infiniteActualY + infiniteR);
        ctx.lineTo(cx, finiteActualY - finiteR);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Finite orb
      if (!resolved || rp < 0.95) {
        const orbAlpha = resolved ? 1 - rp : 1;
        ctx.save();
        ctx.globalAlpha = orbAlpha;
        const finiteGrad = ctx.createRadialGradient(cx - 4, finiteActualY - 4, 2, cx, finiteActualY, finiteR);
        finiteGrad.addColorStop(0, "#6b6b8a");
        finiteGrad.addColorStop(0.6, "#3a3a5c");
        finiteGrad.addColorStop(1, "#1a1a2e");
        ctx.fillStyle = finiteGrad;
        ctx.beginPath();
        ctx.arc(cx, finiteActualY, finiteR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#555577";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Finite label
        ctx.fillStyle = "#aaaacc";
        ctx.font = `${Math.max(9, W * 0.022)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Finite Existence", cx, finiteActualY + finiteR + 16);
        ctx.font = `${Math.max(7, W * 0.016)}px Georgia, serif`;
        ctx.fillStyle = "#7777aa";
        ctx.fillText("body · desire · mortality", cx, finiteActualY + finiteR + 30);
        ctx.restore();
      }

      // Infinite orb
      if (!resolved || rp < 0.95) {
        const orbAlpha = resolved ? 1 - rp : 1;
        ctx.save();
        ctx.globalAlpha = orbAlpha;
        const pulse = Math.sin(timeRef.current * 1.5) * 0.15 + 0.85;
        const glow = ctx.createRadialGradient(cx, infiniteActualY, 0, cx, infiniteActualY, infiniteR * 2.5);
        glow.addColorStop(0, "#ffffff22");
        glow.addColorStop(0.4, "#c4a0ff18");
        glow.addColorStop(1, "#00000000");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, infiniteActualY, infiniteR * 2.5, 0, Math.PI * 2);
        ctx.fill();

        const infGrad = ctx.createRadialGradient(cx - 6, infiniteActualY - 6, 2, cx, infiniteActualY, infiniteR);
        infGrad.addColorStop(0, "#ffffff");
        infGrad.addColorStop(0.3, "#e8d5ff");
        infGrad.addColorStop(0.7, "#9f70ff");
        infGrad.addColorStop(1, "#4a1a8a");
        ctx.fillStyle = infGrad;
        ctx.globalAlpha = orbAlpha * pulse;
        ctx.beginPath();
        ctx.arc(cx, infiniteActualY, infiniteR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c4a0ff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.globalAlpha = orbAlpha;
        ctx.fillStyle = "#ddd0ff";
        ctx.font = `${Math.max(9, W * 0.022)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Infinite Ideal", cx, infiniteActualY - infiniteR - 18);
        ctx.font = `${Math.max(7, W * 0.016)}px Georgia, serif`;
        ctx.fillStyle = "#b09edd";
        ctx.fillText("God · perfect love · utopia", cx, infiniteActualY - infiniteR - 6);
        ctx.restore();
      }

      // Merged orb
      if (resolved && rp > 0.3) {
        const mergeAlpha = Math.min(1, (rp - 0.3) / 0.7);
        ctx.save();
        ctx.globalAlpha = mergeAlpha;
        const pulse2 = Math.sin(timeRef.current * 2) * 0.1 + 0.9;
        const bigR = 44 * pulse2;

        const glow2 = ctx.createRadialGradient(cx, silhouetteY - 10, 0, cx, silhouetteY - 10, bigR * 2.2);
        glow2.addColorStop(0, "#ffffff33");
        glow2.addColorStop(0.5, "#9f70ff22");
        glow2.addColorStop(1, "#00000000");
        ctx.fillStyle = glow2;
        ctx.beginPath();
        ctx.arc(cx, silhouetteY - 10, bigR * 2.2, 0, Math.PI * 2);
        ctx.fill();

        const mergeGrad = ctx.createRadialGradient(cx - 8, silhouetteY - 18, 4, cx, silhouetteY - 10, bigR);
        mergeGrad.addColorStop(0, "#ffffff");
        mergeGrad.addColorStop(0.25, "#e8d5ff");
        mergeGrad.addColorStop(0.55, "#7C3AED");
        mergeGrad.addColorStop(0.8, "#3a3a5c");
        mergeGrad.addColorStop(1, "#1a0a3a");
        ctx.fillStyle = mergeGrad;
        ctx.beginPath();
        ctx.arc(cx, silhouetteY - 10, bigR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#c4a0ff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#f0e8ff";
        ctx.font = `bold ${Math.max(10, W * 0.025)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("Infinite within Finite", cx, silhouetteY - 10 + bigR + 20);
        ctx.restore();
      }

      // Silhouette
      const silAlpha = resolved ? 0.3 + rp * 0.4 : 0.85;
      const stretchY = resolved ? 0 : stretchFactor * H * 0.035;
      ctx.save();
      ctx.globalAlpha = silAlpha;

      const headY = silhouetteY - 32 - stretchY;
      const headR = 14;
      const bodyTop = headY + headR;
      const bodyBot = silhouetteY + 32 + stretchY;
      const bodyW = 20;

      // Head
      const silGrad = ctx.createLinearGradient(cx - bodyW, headY - headR, cx + bodyW, bodyBot);
      silGrad.addColorStop(0, resolved && rp > 0.5 ? "#7C3AED" : "#2a2a44");
      silGrad.addColorStop(1, resolved && rp > 0.5 ? "#4a1a8a" : "#111128");
      ctx.fillStyle = silGrad;

      ctx.beginPath();
      ctx.arc(cx, headY, headR, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(cx - bodyW * 0.6, bodyTop + 4);
      ctx.bezierCurveTo(cx - bodyW, bodyTop + 12, cx - bodyW * 1.2, silhouetteY, cx - bodyW * 0.8, bodyBot);
      ctx.lineTo(cx + bodyW * 0.8, bodyBot);
      ctx.bezierCurveTo(cx + bodyW * 1.2, silhouetteY, cx + bodyW, bodyTop + 12, cx + bodyW * 0.6, bodyTop + 4);
      ctx.closePath();
      ctx.fill();

      // Arms reaching
      if (!resolved || rp < 0.6) {
        const armAlpha2 = resolved ? 1 - rp : 1;
        ctx.globalAlpha = silAlpha * armAlpha2;
        const armStretch = stretchFactor * 14;
        // Left arm down
        ctx.beginPath();
        ctx.moveTo(cx - bodyW * 0.6, bodyTop + 20);
        ctx.quadraticCurveTo(cx - bodyW * 2.2 - armStretch * 0.5, silhouetteY + 20 + armStretch, cx - bodyW * 1.5 - armStretch * 0.3, bodyBot + 5 + armStretch * 0.4);
        ctx.lineWidth = 6;
        ctx.strokeStyle = silGrad;
        ctx.stroke();
        // Right arm up
        ctx.beginPath();
        ctx.moveTo(cx + bodyW * 0.6, bodyTop + 20);
        ctx.quadraticCurveTo(cx + bodyW * 2.2 + armStretch * 0.5, silhouetteY - 20 - armStretch, cx + bodyW * 1.5 + armStretch * 0.3, headY - armStretch * 0.6);
        ctx.stroke();
        ctx.globalAlpha = silAlpha;
      }

      ctx.restore();

      // Floating particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * W;
        const py = p.y * H;
        ctx.save();
        ctx.globalAlpha = p.opacity * (resolved ? 0.3 : 0.7);
        ctx.fillStyle = p.hue === "infinite" ? "#9f70ff" : "#555577";
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Ascetic label
      if (!resolved && stretchFactor > 0.1) {
        ctx.save();
        ctx.globalAlpha = stretchFactor;
        ctx.fillStyle = "#cc6666";
        ctx.font = `italic ${Math.max(8, W * 0.018)}px Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("The harder consciousness strives upward — the further the ideal recedes", cx, H * 0.5 + 6);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [asceticLevel, resolved, resolveProgress]);

  const handleResolve = () => {
    if (animating) return;
    if (resolved) {
      setResolved(false);
      setResolveProgress(0);
      setAsceticLevel(0);
      return;
    }
    setAnimating(true);
    let progress = 0;
    const animate = () => {
      progress += 0.018;
      setResolveProgress(Math.min(1, progress));
      if (progress < 1) {
        resolveAnimRef.current = requestAnimationFrame(animate);
      } else {
        setResolved(true);
        setAnimating(false);
      }
    };
    resolveAnimRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (resolved || animating) return;
    setResolveProgress(0);
  }, [resolved, animating]);

  const [conceptPanelOpen, setConceptPanelOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #2d0a5e 0%, #0a0410 60%, #04020f 100%)",
      fontFamily: "Georgia, serif",
      padding: "clamp(16px, 4vw, 40px) clamp(12px, 3vw, 24px)",
      color: "#d4c8f0",
    }}>
      <div style={{
        maxWidth: "min(90vw, 860px)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vw, 28px)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", paddingBottom: "8px" }}>
          <div style={{
            fontSize: "clamp(10px, 1.6vw, 12px)",
            letterSpacing: "0.2em",
            color: "#7C3AED",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "Georgia, serif",
          }}>Part 13 of 20 — Hegel's Phenomenology of Spirit</div>
          <h1 style={{
            fontSize: "clamp(22px, 4.5vw, 42px)",
            fontWeight: "bold",
            color: "#f0e8ff",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
            fontFamily: "Georgia, serif",
          }}>The Agony of Division</h1>
          <p style={{
            fontSize: "clamp(13px, 2vw, 17px)",
            color: "#a090cc",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.5,
            fontFamily: "Georgia, serif",
          }}>The unhappy consciousness is the form of awareness torn between finite existence and infinite aspiration, projecting all value onto an unattainable transcendent beyond.</p>
        </div>

        {/* Problem Panel */}
        <div style={{
          background: "#0e0820",
          border: "1px solid #2a1a50",
          borderLeft: "4px solid #7C3AED",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7C3AED",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
          }}>The Problem</div>
          <p style={{
            fontSize: "clamp(13px, 2vw, 16px)",
            lineHeight: 1.7,
            color: "#c8b8e8",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            If reality is rational and recognition is the very structure of self-consciousness, why does consciousness so frequently experience itself as <em>irreconcilably divided</em> — torn from its own essence, straining toward a perfection it can never inhabit? Why does the very capacity for self-reflection so often become a source of anguish rather than freedom? Something essential in the architecture of spirit seems to generate alienation not as accident but as necessity.
          </p>
        </div>

        {/* Main Visualization */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div style={{
            padding: "clamp(16px, 3vw, 24px)",
            borderBottom: "1px solid #1a0a30",
          }}>
            <h2 style={{
              fontSize: "clamp(15px, 2.5vw, 20px)",
              color: "#e0d0ff",
              margin: "0 0 6px 0",
              fontFamily: "Georgia, serif",
            }}>The Structure of Unhappy Consciousness</h2>
            <p style={{
              fontSize: "clamp(11px, 1.7vw, 14px)",
              color: "#8878aa",
              margin: 0,
              fontFamily: "Georgia, serif",
            }}>The silhouette is stretched between the dim weight below and the brilliant ideal above. Adjust the ascetic effort to witness the self-defeating logic — then press Resolution to discover where the infinite truly resides.</p>
          </div>

          <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%" }}
            />
          </div>

          {/* Controls */}
          <div style={{
            padding: "clamp(14px, 2.5vw, 22px)",
            borderTop: "1px solid #1a0a30",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Slider */}
            <div style={{ opacity: resolved ? 0.4 : 1, transition: "opacity 0.5s" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}>
                <label style={{
                  fontSize: "clamp(11px, 1.7vw, 14px)",
                  color: "#b09edd",
                  fontFamily: "Georgia, serif",
                }}>Ascetic Effort</label>
                <span style={{
                  fontSize: "clamp(10px, 1.5vw, 13px)",
                  color: "#7C3AED",
                  fontFamily: "Georgia, serif",
                }}>{asceticLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={asceticLevel}
                onChange={(e) => !resolved && setAsceticLevel(Number(e.target.value))}
                disabled={resolved}
                style={{
                  width: "100%",
                  accentColor: "#7C3AED",
                  cursor: resolved ? "not-allowed" : "pointer",
                  height: "6px",
                }}
              />
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "clamp(9px, 1.3vw, 11px)",
                color: "#665588",
                marginTop: "4px",
                fontFamily: "Georgia, serif",
              }}>
                <span>Passive acceptance</span>
                <span>Maximum renunciation</span>
              </div>
            </div>

            {/* Resolution button */}
            <button
              onClick={handleResolve}
              disabled={animating}
              style={{
                background: resolved ? "#1a0a3a" : "linear-gradient(135deg, #4a1a8a, #7C3AED)",
                border: "1px solid #7C3AED",
                borderRadius: "8px",
                color: resolved ? "#9f70ff" : "#ffffff",
                fontSize: "clamp(12px, 1.8vw, 15px)",
                padding: "12px 24px",
                cursor: animating ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
                transition: "all 0.3s",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => { if (!animating) e.currentTarget.style.boxShadow = "0 0 20px #7C3AED66"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {resolved ? "Reset: Return to Division" : animating ? "Dissolving the separation..." : "Resolution: Discover the Infinite Within"}
            </button>

            {resolved && (
              <p style={{
                fontSize: "clamp(12px, 1.7vw, 14px)",
                color: "#c4a0ff",
                fontStyle: "italic",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
                fontFamily: "Georgia, serif",
              }}>
                The two poles collapse into one: the infinite was never elsewhere. Finite existence's very capacity for infinite longing reveals infinity already present within it.
              </p>
            )}
          </div>
        </div>

        {/* Core Argument */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 24px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7C3AED",
            marginBottom: "14px",
            fontFamily: "Georgia, serif",
          }}>The Argument</div>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            Unhappy consciousness emerges when the social world no longer offers adequate recognition — when its institutions feel hollow, its bonds insufficient. The self turns inward, then upward, projecting all genuine value onto an infinite transcendent source: God, perfect love, utopia. But this projection generates a devastating logic. The more magnificent the infinite appears, the more wretched finite existence becomes by comparison.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            Every act of renunciation — fasting, prayer, mortification, utopian sacrifice — is intended to close the gap between finite self and infinite ideal. Yet each renunciation reinforces the very division it seeks to overcome: the self that performs the renunciation is still there, now watching itself renounce, generating a subtle spiritual pride that replaces genuine transcendence.
          </p>
          <p style={{
            fontSize: "clamp(13px, 1.9vw, 16px)",
            lineHeight: 1.75,
            color: "#c0b0e0",
            margin: 0,
            fontFamily: "Georgia, serif",
          }}>
            The deeper error, Hegel insists, is treating the infinite as entirely external to finite existence. The decisive insight is this: finite consciousness's very capacity to <em>aspire</em> toward the infinite — to feel the lack, to long across the gap — already demonstrates that infinity is not elsewhere. It is the power within finitude that drives the striving itself. Resolution comes not by escaping the finite but by recognizing that the infinite is realized precisely through finite institutions, relationships, and historical forms.
          </p>
        </div>

        {/* Key Concepts */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid #7C3AED33",
          borderRadius: 8,
          padding: "clamp(16px, 3vw, 24px)",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: "clamp(9px, 1.3vw, 11px)", letterSpacing: 2, textTransform: "uppercase", color: "#7C3AED", marginBottom: 14 }}>
            Key Concepts — Click to Explore
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: hoveredConcept ? 16 : 0 }}>
            {concepts.map(c => (
              <div
                key={c.id}
                onClick={() => setHoveredConcept(hoveredConcept === c.id ? null : c.id)}
                style={{
                  padding: "6px 14px",
                  background: hoveredConcept === c.id ? "#7C3AED" : "rgba(0,0,0,0.3)",
                  border: `1px solid ${hoveredConcept === c.id ? "#7C3AED" : "#7C3AED55"}`,
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
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #7C3AED44", borderRadius: 6, padding: "16px 20px", marginTop: 4 }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: "bold", color: "#7C3AED", marginBottom: 8 }}>
                {concepts.find(c => c.id === hoveredConcept)?.label}
              </div>
              <p style={{ margin: 0, fontSize: "clamp(11px, 1.5vw, 13px)", lineHeight: 1.75, color: "#c8c0b4" }}>
                {concepts.find(c => c.id === hoveredConcept)?.desc}
              </p>
            </div>
          )}
        </div>

        {/* Difficulty Panel */}
        <div style={{
          background: "#0a0c1a",
          border: "1px solid #1a2050",
          borderLeft: "4px solid #4a6acd",
          borderRadius: "8px",
          padding: "clamp(16px, 3vw, 28px)",
        }}>
          <div style={{
            fontSize: "clamp(9px, 1.4vw, 11px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4a6acd",
            marginBottom: "12px",
            fontFamily: "Georgia, serif",
          }}>The Difficulty</div>
          <p style={{
            fontSize: "clamp(13px, 2vw, 16px)",
            lineHeight: 1.7,
            color: "#b0b8d8",
            margin: "0 0 14px 0",
            fontFamily: "Georgia, serif",
          }}>
            If unhappy consciousness is overcome by discovering the infinite within finite forms — through institutions, relationships, historical life — then the character of those finite forms becomes philosophically urgent. The movement beyond unhappy consciousness leads to 'reason': the discovery that consciousness can find itself reflected in the objective world. But this requires concrete social and economic institutions through which that discovery is mediated. What is the character of those institutions? What makes them adequate — or inadequate — vehicles for the realization of spirit?
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.7vw, 14px)",
            lineHeight: 1.6,
            color: "#7a88bb",
            margin: 0,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}>
            This pressure forces the next development: a sustained examination of how reason attempts to recognize itself in the social world — and why that recognition so frequently fails, generating new forms of alienation far more sophisticated than the simple division of unhappy consciousness.
          </p>
        </div>

        {/* Real-World Echoes */}
        <div style={{
          background: "#080614",
          border: "1px solid #2a1a50",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          <div
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "clamp(14px, 2.5vw, 22px)",
              cursor: "pointer",
              background: echosOpen ? "#0e0820" : "transparent",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0e0820"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = echosOpen ? "#0e0820" : "transparent"; }}
          >
            <div style={{
              fontSize: "clamp(9px, 1.4vw, 11px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7C3AED",
              fontFamily: "Georgia, serif",
            }}>Real-World Echoes</div>
            <div style={{ color: "#7C3AED" }}>
              {echosOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {echosOpen && (
            <div style={{
              padding: "0 clamp(14px, 2.5vw, 22px) clamp(14px, 2.5vw, 22px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              {[
                {
                  title: "Medieval Christian Spirituality",
                  body: "The logic of monastic self-mortification follows the structure precisely: the more perfect God appears, the more worthless finite human existence becomes by comparison. Flagellant movements, extreme fasting, the cult of suffering — each attempt to eliminate the finite self only intensifies the consciousness of division.",
                },
                {
                  title: "Romantic Idealization",
                  body: "Secular unhappy consciousness finds its home in the idealization of perfect love. When actual beloved persons are held to impossible standards of transcendent perfection, every real intimacy disappoints. The beloved must be infinite — and therefore is never met in actual flesh. The relationship remains perpetually with an ideal, never a person.",
                },
                {
                  title: "Utopian Political Movements",
                  body: "Political utopianisms that demand immediate total transformation exhibit the same structure: the perfect future society is so radically opposed to existing arrangements that any compromise with present institutions becomes treason. The movement consumes itself in purity spirals — each purge of the impure reinforcing the distance between the actual and the ideal.",
                },
              ].map((ex, i) => (
                <div key={i} style={{
                  background: "#0d0820",
                  border: "1px solid #2a1a40",
                  borderRadius: "8px",
                  padding: "16px",
                }}>
                  <div style={{
                    fontSize: "clamp(12px, 1.8vw, 15px)",
                    color: "#c4a0ff",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif",
                  }}>{ex.title}</div>
                  <p style={{
                    fontSize: "clamp(12px, 1.7vw, 14px)",
                    color: "#8878aa",
                    lineHeight: 1.65,
                    margin: 0,
                    fontFamily: "Georgia, serif",
                  }}>{ex.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px, 1.4vw, 12px)",
          color: "#443366",
          paddingBottom: "8px",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.08em",
        }}>
          Part 13 of 20 · Hegel's Complete Philosophical System
        </div>
      </div>
    </div>
  );
}

export default UnhappyConsciousness;