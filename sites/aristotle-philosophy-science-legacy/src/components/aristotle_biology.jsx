function AristotleBiology() {
  const CORE_ARGUMENT = `While Aristotle's physics was his greatest failure, his biology was his greatest success. He personally dissected hundreds of species and accurately described dolphin and whale mammalian characteristics, shark placenta, ruminant stomachs, and chick embryonic development — achievements not surpassed for centuries. His theoretical framework organized life forms into a scala naturae (nutritive, sensitive, and rational soul levels), developed the first natural taxonomy based on multiple anatomical criteria, and explained biological features teleologically through the functions they serve. His concept of epigenesis — that organisms develop progressively from undifferentiated matter rather than growing from miniature preformed versions — was correct. Darwin eliminated fixed species and conscious teleology, but functional explanation and the focus on organizational form persist in contemporary biology.`;
  const splitMatch = CORE_ARGUMENT.match(/^(.{30,}?[.!?])\s+([A-Z][\s\S]*)$/);
  const coreIdLead = splitMatch ? splitMatch[1] : CORE_ARGUMENT;
  const coreIdBody = splitMatch ? splitMatch[2] : "";

  const ACCENT = "#059669";
  const ACCENT_LIGHT = "#34d399";
  const ACCENT_DIM = "#052e1c";
  const TITLE_COLOR = "#e8f5f0";
  const SUBTITLE_COLOR = "#a7c4b8";

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [hoveredAnimal, setHoveredAnimal] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [teleologyMode, setTeleologyMode] = useState("aristotle");
  const [echosOpen, setEchosOpen] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);

  const animals = [
    {
      id: "dolphin",
      name: "Dolphin",
      icon: "🐬",
      x: 18, y: 30,
      aristotle: {
        desc: "Aristotle noted that dolphins breathe air, nurse their young with milk, have warm blood, and give live birth — placing them firmly outside the fish category despite living in the sea.",
        classification: "Warm-blooded, live-bearing, air-breathing — not a fish",
        status: "correct"
      },
      modern: {
        desc: "Modern taxonomy classifies dolphins as cetacean mammals (Delphinidae), descended from terrestrial artiodactyls. Aristotle's intuition preceded formal mammalian systematics by two millennia.",
        classification: "Order Cetacea, Class Mammalia",
        confirmed: true
      }
    },
    {
      id: "shark",
      name: "Shark",
      icon: "🦈",
      x: 62, y: 22,
      aristotle: {
        desc: "Aristotle described what is now called placental viviparity in certain sharks (particularly the smooth dogfish), observing a yolk-sac placenta connecting embryo to mother — a claim so remarkable it was doubted for centuries.",
        classification: "Selachian (cartilaginous), viviparous with placental connection",
        status: "correct"
      },
      modern: {
        desc: "19th century zoologists confirmed the placental connection in Mustelus laevis. The placenta of chondrichthyans is structurally analogous to mammalian placentas. Aristotle's observation was vindicated after 2,000 years.",
        classification: "Class Chondrichthyes; some species: Order Carcharhiniformes",
        confirmed: true
      }
    },
    {
      id: "octopus",
      name: "Octopus",
      icon: "🐙",
      x: 40, y: 55,
      aristotle: {
        desc: "Aristotle described octopus mating in detail, noting the use of the hectocotylus arm for reproduction — though he misunderstood the precise mechanism. He also correctly described their ink, suction cups, and color-changing.",
        classification: "Soft-bodied (malakion), cephalopod — no skeleton",
        status: "partial"
      },
      modern: {
        desc: "Aristotle's cephalopod grouping is taxonomically sound. His description of the hectocotylus prefigured 19th century discoveries by Cuvier. Most behavioral and anatomical observations were accurate.",
        classification: "Class Cephalopoda, Order Octopoda",
        confirmed: true
      }
    },
    {
      id: "chick",
      name: "Chick Embryo",
      icon: "🐣",
      x: 75, y: 55,
      aristotle: {
        desc: "Aristotle opened eggs daily over the course of incubation and described the progressive development of the heart, blood vessels, and organs — arguing that form emerges gradually from undifferentiated matter (epigenesis), not from a miniature pre-formed creature.",
        classification: "Oviparous, warm-blooded; epigenetic development",
        status: "correct"
      },
      modern: {
        desc: "Aristotle's epigenesis concept was vindicated against preformationism in the 18th–19th centuries. His sequential organ emergence description remarkably anticipates Hamburger–Hamilton staging. The heart appearing first aligns with modern developmental biology.",
        classification: "Class Aves; embryogenesis via regulatory gene networks",
        confirmed: true
      }
    },
    {
      id: "ruminant",
      name: "Ruminant",
      icon: "🐄",
      x: 28, y: 72,
      aristotle: {
        desc: "Aristotle described the multiple stomach chambers of ruminants (cattle, sheep) and connected this anatomical complexity to their dietary function — digesting tough plant material. He saw this as a clear example of organs serving purposes.",
        classification: "Many-stomached, hornless or horned, plant-eating",
        status: "correct"
      },
      modern: {
        desc: "The four-chambered stomach (rumen, reticulum, omasum, abomasum) of ruminants is well-characterized. Aristotle's functional description was essentially correct, though he lacked knowledge of microbial fermentation.",
        classification: "Infraorder Pecora, family-dependent; foregut fermenters",
        confirmed: true
      }
    }
  ];

  const keyConcepts = [
    {
      id: "scala",
      label: "Scala Naturae",
      desc: "The 'ladder of nature' — Aristotle's hierarchical ordering of living things by their soul capacities: nutritive (plants), sensitive (animals), and rational (humans). This was not an evolutionary tree but a static hierarchy of complexity. It organized the natural world conceptually for the first time and influenced biology through Linnaeus and beyond."
    },
    {
      id: "teleology",
      label: "Teleological Biology",
      desc: "Aristotle explained biological features by asking what function they serve — 'the eye is for seeing.' This final-cause reasoning treated organisms as organized wholes where every part contributes to the creature's characteristic activity. Darwin showed how natural selection produces the appearance of purpose without conscious design, but functional language remains indispensable in modern biology."
    },
    {
      id: "epigenesis",
      label: "Epigenesis",
      desc: "Aristotle's doctrine that an organism develops progressively from undifferentiated material — the embryo is not a miniature preformed adult. This was correct and was vindicated against preformationism in the 18th century. Modern developmental genetics, with gene regulatory networks switching on sequentially, is the mechanistic realization of epigenetic development."
    },
    {
      id: "homology",
      label: "Homology",
      desc: "Aristotle noticed that disparate animals share structurally similar parts in different forms — what we now call homologous structures. He observed that the bones of human arms, horse forelegs, and bird wings correspond. Darwin interpreted this as evidence of common descent; Aristotle saw it as formal similarity across nature's hierarchy."
    },
    {
      id: "classification",
      label: "Natural Classification",
      desc: "Aristotle developed the first systematic taxonomy using multiple anatomical criteria rather than single features. He distinguished fish, birds, cetaceans, insects, and mollusks with remarkable accuracy. His insistence on using 'essential' features — those tied to function and form — anticipates phylogenetic systematics."
    },
    {
      id: "spontaneous",
      label: "Spontaneous Generation Error",
      desc: "Aristotle believed that simpler animals — eels, insects, shellfish — could arise spontaneously from mud, dew, or rotting matter. This was his most significant biological error, finally refuted by Pasteur in 1859. It stemmed from his scala naturae: if plants arise from seeds, the lowest animals might arise from inorganic matter directly."
    }
  ];

  const teleologyData = {
    organ: "The vertebrate eye",
    aristotle: {
      label: "Aristotelian Final Cause",
      explanation: "The eye exists for the sake of seeing. Its structure — lens, iris, retina — is intelligible only in terms of the end it serves: providing the animal with visual perception of its environment. The final cause (vision) explains why the parts are organized exactly as they are. Remove the function and the arrangement becomes arbitrary.",
      structure: ["Final cause: vision", "Material cause: transparent humor, tissue", "Formal cause: sphere with focusing apparatus", "Efficient cause: developmental process"],
      color: "#7c3aed"
    },
    darwin: {
      label: "Darwinian Selected Effect",
      explanation: "The eye has the structure it has because ancestral organisms with slightly better light-detection survived and reproduced more than those without. Natural selection accumulated small improvements over millions of generations. The 'purpose' of the eye is not a real goal but a post-hoc description of what the selected trait does. Function language describes selection history, not genuine teleology.",
      structure: ["Selected effect: increased survival via detection", "Mechanism: cumulative natural selection", "History: from photoreceptor patch to complex eye", "Teleology: apparent, not intrinsic"],
      color: "#059669"
    }
  };

  const echoes = [
    {
      title: "Dolphins and Whales: Classification Vindicated",
      body: "Aristotle's insistence that cetaceans were not fish but warm-blooded, air-breathing, milk-giving creatures was largely ignored by medieval naturalists who returned them to the fish category. It took Linnaeus in 1758, working from similar observational criteria, to formally restore Aristotle's original correct classification. The observation that physiological function determines natural kind membership proved more durable than superficial ecological resemblance."
    },
    {
      title: "Shark Placenta: A 2,000-Year Vindication",
      body: "Aristotle's description of placental viviparity in the dogfish shark was dismissed as error for centuries because it seemed too mammalian for a fish. In 1842, zoologist Johannes Müller confirmed the placental connection in Mustelus laevis, exactly as Aristotle had described. This remains one of the most striking cases of ancient empirical observation being dismissed and then confirmed by modern science."
    },
    {
      title: "Developmental Biology and Genetic Regulatory Networks",
      body: "Aristotle's concept of epigenesis — progressive differentiation from an undifferentiated start — maps remarkably onto modern developmental genetics. The sequential activation of Hox genes and regulatory cascades during embryogenesis is essentially the mechanistic account of what Aristotle called formal causation in development. His question 'what guides the developmental process toward the mature form?' now has a molecular answer."
    },
    {
      title: "Karen Neander and Naturalized Teleology",
      body: "Philosopher Karen Neander's 'selected effects' theory of biological function attempts to preserve functional language within a Darwinian framework: the heart's function is to pump blood because that is what selection selected it for. This directly echoes the Aristotelian–Darwinian tension: Aristotle thought function was irreducible; Darwin seemed to eliminate it; Neander argues functional explanation is naturalizable but not eliminable — the deepest question Aristotle's biology poses to modern philosophy of science."
    }
  ];

  const getStatusColor = (status, confirmed) => {
    if (status === "correct" && confirmed) return "#34d399";
    if (status === "partial") return "#fbbf24";
    return "#f87171";
  };

  const getStatusLabel = (status, confirmed) => {
    if (status === "correct" && confirmed) return "✓ Confirmed Correct";
    if (status === "partial") return "~ Partially Correct";
    return "✗ Incorrect";
  };

  const selectedAnimalData = selectedAnimal ? animals.find(a => a.id === selectedAnimal) : null;

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 20%, #052e1c 0%, #0a0f0c 60%, #0a0a0f 100%)",
      minHeight: "100vh",
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Georgia, serif",
      color: "#d4e8df"
    }}>
      <div style={{ maxWidth: "min(90vw, 860px)", margin: "0 auto" }}>

        {/* SECTION HEADER */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
            Part 8 of 15 — Aristotle's Philosophy, Science, and Legacy
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: "normal", color: TITLE_COLOR, margin: "0 0 8px 0" }}>
            Biology and the Science of Life
          </h1>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: SUBTITLE_COLOR, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            Aristotle's greatest empirical success was systematic biology, where observational accuracy and functional framework anticipated discoveries confirmed millennia later.
          </p>
        </div>

        {/* THE PROBLEM PANEL */}
        <div style={{
          background: "rgba(5,150,105,0.07)",
          border: "1px solid " + ACCENT + "44",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Problem
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
            The four-causes framework promised that final causes — purposes and functions — were essential to complete explanation, but it needed empirical grounding. What are the actual functions of actual biological structures in actual organisms? Without concrete observation, teleology remained abstract metaphysics rather than science.
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
          background: "rgba(0,0,0,0.35)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>
            Aristotle's Zoological Investigations
          </div>
          <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 20px 0", lineHeight: 1.6 }}>
            Click any animal Aristotle studied to compare his original description with modern taxonomy.
          </p>

          {/* Animal selection grid */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
            justifyContent: "center"
          }}>
            {animals.map(animal => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(selectedAnimal === animal.id ? null : animal.id)}
                onMouseEnter={() => setHoveredAnimal(animal.id)}
                onMouseLeave={() => setHoveredAnimal(null)}
                style={{
                  background: selectedAnimal === animal.id
                    ? ACCENT + "33"
                    : hoveredAnimal === animal.id
                    ? "rgba(5,150,105,0.12)"
                    : "rgba(0,0,0,0.3)",
                  border: selectedAnimal === animal.id
                    ? "2px solid " + ACCENT
                    : "1px solid " + ACCENT + "44",
                  borderRadius: 8,
                  padding: "10px 16px",
                  cursor: "pointer",
                  color: selectedAnimal === animal.id ? ACCENT_LIGHT : "#c8ddd6",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(12px,1.6vw,14px)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <span style={{ fontSize: "clamp(16px,2.5vw,20px)" }}>{animal.icon}</span>
                <span>{animal.name}</span>
              </button>
            ))}
          </div>

          {/* Animal detail panel */}
          {selectedAnimalData ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}>
              <div style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap"
              }}>
                {/* Aristotle panel */}
                <div style={{
                  flex: "1 1 280px",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid #7c3aed44",
                  borderRadius: 8,
                  padding: "clamp(12px,2vw,18px)"
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>
                    Aristotle's Description (~350 BCE)
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#d4c8f0", lineHeight: 1.75, margin: "0 0 12px 0" }}>
                    {selectedAnimalData.aristotle.desc}
                  </p>
                  <div style={{
                    background: "rgba(124,58,237,0.12)",
                    borderRadius: 6,
                    padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 4 }}>
                      Classification
                    </div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "#c4b8e8", fontStyle: "italic" }}>
                      {selectedAnimalData.aristotle.classification}
                    </div>
                  </div>
                </div>

                {/* Modern science panel */}
                <div style={{
                  flex: "1 1 280px",
                  background: "rgba(5,150,105,0.08)",
                  border: "1px solid " + ACCENT + "44",
                  borderRadius: 8,
                  padding: "clamp(12px,2vw,18px)"
                }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
                    Modern Science's Verdict
                  </div>
                  <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c8ddd6", lineHeight: 1.75, margin: "0 0 12px 0" }}>
                    {selectedAnimalData.modern.desc}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap"
                  }}>
                    <div style={{
                      background: getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed) + "22",
                      border: "1px solid " + getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed) + "66",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: "clamp(11px,1.5vw,12px)",
                      color: getStatusColor(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed),
                      fontWeight: "bold"
                    }}>
                      {getStatusLabel(selectedAnimalData.aristotle.status, selectedAnimalData.modern.confirmed)}
                    </div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, fontStyle: "italic" }}>
                      {selectedAnimalData.modern.classification}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "24px",
              color: SUBTITLE_COLOR,
              fontSize: "clamp(12px,1.6vw,14px)",
              fontStyle: "italic"
            }}>
              Select an animal above to see Aristotle's observations compared with modern science
            </div>
          )}

          {/* Teleology Module */}
          <div style={{
            marginTop: 24,
            background: "rgba(0,0,0,0.25)",
            border: "1px solid " + ACCENT + "33",
            borderRadius: 8,
            padding: "clamp(14px,2.5vw,20px)"
          }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>
              Teleology Module
            </div>
            <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: SUBTITLE_COLOR, margin: "0 0 14px 0", lineHeight: 1.6 }}>
              Toggle between explanatory frameworks for <em>{teleologyData.organ}</em>:
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => setTeleologyMode("aristotle")}
                style={{
                  background: teleologyMode === "aristotle" ? "#7c3aed33" : "transparent",
                  border: teleologyMode === "aristotle" ? "2px solid #7c3aed" : "1px solid #7c3aed44",
                  borderRadius: 6,
                  padding: "7px 14px",
                  color: teleologyMode === "aristotle" ? "#a78bfa" : "#8b7ab8",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer"
                }}
              >
                Aristotelian Final Cause
              </button>
              <button
                onClick={() => setTeleologyMode("darwin")}
                style={{
                  background: teleologyMode === "darwin" ? ACCENT + "33" : "transparent",
                  border: teleologyMode === "darwin" ? "2px solid " + ACCENT : "1px solid " + ACCENT + "44",
                  borderRadius: 6,
                  padding: "7px 14px",
                  color: teleologyMode === "darwin" ? ACCENT_LIGHT : SUBTITLE_COLOR,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer"
                }}
              >
                Darwinian Selected Effect
              </button>
            </div>

            {teleologyMode === "aristotle" ? (
              <div style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid #7c3aed44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>
                  Aristotelian Final Cause
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#d4c8f0", lineHeight: 1.75, margin: "0 0 14px 0" }}>
                  {teleologyData.aristotle.explanation}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {teleologyData.aristotle.structure.map((s, i) => (
                    <div key={i} style={{
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid #7c3aed44",
                      borderRadius: 4,
                      padding: "4px 10px",
                      fontSize: "clamp(10px,1.4vw,12px)",
                      color: "#c4b8e8"
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                background: "rgba(5,150,105,0.08)",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT_LIGHT, marginBottom: 8 }}>
                  Darwinian Selected Effect
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "#c8ddd6", lineHeight: 1.75, margin: "0 0 14px 0" }}>
                  {teleologyData.darwin.explanation}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {teleologyData.darwin.structure.map((s, i) => (
                    <div key={i} style={{
                      background: ACCENT + "15",
                      border: "1px solid " + ACCENT + "44",
                      borderRadius: 4,
                      padding: "4px 10px",
                      fontSize: "clamp(10px,1.4vw,12px)",
                      color: "#9ec8b8"
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
            <p style={{ fontSize: "clamp(11px,1.5vw,12px)", color: SUBTITLE_COLOR, margin: "12px 0 0 0", fontStyle: "italic", lineHeight: 1.6 }}>
              Notice: both frameworks preserve functional language — what changes is whether that function is intrinsic to the organism's nature or a record of selection history.
            </p>
          </div>
        </div>

        {/* KEY CONCEPTS PANEL */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
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
                  border: "1px solid " + ACCENT + (hoveredConcept === kc.id ? "" : "77"),
                  borderRadius: 20,
                  padding: "5px 14px",
                  color: hoveredConcept === kc.id ? "#f0ead8" : ACCENT_LIGHT,
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(11px,1.5vw,13px)",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {kc.label}
              </button>
            ))}
          </div>
          {hoveredConcept && (() => {
            const concept = keyConcepts.find(k => k.id === hoveredConcept);
            return concept ? (
              <div style={{
                marginTop: 10,
                background: ACCENT + "12",
                border: "1px solid " + ACCENT + "44",
                borderRadius: 8,
                padding: "clamp(12px,2vw,16px)"
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
                  {concept.label}
                </div>
                <p style={{ fontSize: "clamp(12px,1.6vw,14px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
                  {concept.desc}
                </p>
              </div>
            ) : null;
          })()}
        </div>

        {/* THE DIFFICULTY PANEL */}
        <div style={{
          background: "rgba(5,150,105,0.05)",
          border: "1px solid " + ACCENT + "33",
          borderLeft: "4px solid " + ACCENT,
          borderRadius: 8,
          padding: "clamp(16px,3vw,24px)",
          marginBottom: 16
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>
            The Difficulty
          </div>
          <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "#c8ddd6", lineHeight: 1.75, margin: 0 }}>
            Aristotle's teleological biology assumed fixed species with eternal essences — the shark is essentially a shark, the dolphin essentially a dolphin, each with a permanent natural kind. Darwin's evolutionary theory demolished this assumption: species are mutable, essences are fictions, and natural selection explains the appearance of purposive design without any actual purpose. The question left open is whether genuine teleology survives in biology or has been fully naturalized away — whether functions are real features of organisms or merely convenient descriptions of selection histories. This pressure forces the next development: the confrontation between Aristotelian essentialism and modern evolutionary theory.
          </p>
        </div>

        {/* REAL-WORLD ECHOES */}
        <div style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid " + ACCENT + "33",
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <button
            onClick={() => setEchosOpen(!echosOpen)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "clamp(14px,2.5vw,20px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Georgia, serif"
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>
              Real-World Echoes
            </span>
            {echosOpen
              ? <ChevronUp size={16} color={ACCENT} />
              : <ChevronDown size={16} color={ACCENT} />
            }
          </button>
          {echosOpen && (
            <div style={{ padding: "0 clamp(14px,2.5vw,20px) clamp(14px,2.5vw,20px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {echoes.map((echo, i) => (
                  <div key={i} style={{
                    borderLeft: "3px solid " + ACCENT,
                    borderRadius: "0 6px 6px 0",
                    background: ACCENT + "0a",
                    padding: "14px 18px"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: ACCENT_LIGHT, marginBottom: 6 }}>
                      {echo.title}
                    </div>
                    <p style={{ fontSize: 13, color: "#b8b0a8", lineHeight: 1.7, margin: 0 }}>
                      {echo.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: ACCENT_DIM, letterSpacing: 1 }}>
          Part 8 of 15 — Aristotle's Philosophy, Science, and Legacy
        </div>

      </div>
    </div>
  );
}

export default AristotleBiology;