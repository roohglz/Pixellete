import { useState } from "react";
import "./App.css";
import Playground from "./components/Playground";

const MOODS = [
  { name: "Dreamy", emoji: "☁️" },
  { name: "Cozy", emoji: "☕" },
  { name: "Moody", emoji: "🌙" },
  { name: "Nostalgic", emoji: "📷" },
  { name: "Playful", emoji: "🍒" },
  { name: "Earthy", emoji: "🌿" },
  { name: "Minimal", emoji: "○" },
  { name: "Bold", emoji: "✦" },
];

const VARIANT_NAMES = {
  safe: {
    title: "The Safe Choice",
    description: "balanced · versatile · easy to live with",
  },
  expressive: {
    title: "The Expressive Choice",
    description: "characterful · emotional · memorable",
  },
  distinctive: {
    title: "The Distinctive Choice",
    description: "unexpected · striking · full of personality",
  },
};

function App() {
  const [vibe, setVibe] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  const [palettes, setPalettes] = useState([]);
  const [activePalette, setActivePalette] = useState(null);

  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // GENERATE PALETTE
  // --------------------------------------------------

  const generatePalette = async (
    text = vibe,
    mood = selectedMood
  ) => {
    const query = text.trim();

    if (!query) {
      setError("Tell me a little about the feeling you're looking for.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://colorfor.ai/api/public/v1/palette?query=${encodeURIComponent(
          query
        )}&count=5`
      );

      if (!response.ok) {
        throw new Error("Palette generation failed.");
      }

      const data = await response.json();

      if (!data.palettes || data.palettes.length === 0) {
        throw new Error("No palettes were returned.");
      }

      const formattedPalettes = data.palettes.map((item) => {
        const variant = item.variant || "expressive";

        return {
          variant,
          title:
            VARIANT_NAMES[variant]?.title ||
            `${variant} palette`,
          description:
            VARIANT_NAMES[variant]?.description ||
            "colours chosen for your mood",
          rationale: item.rationale || "",
          colors: item.colors.map((hex, index) => [
            `Colour ${String(index + 1).padStart(2, "0")}`,
            hex,
          ]),
        };
      });

      setPalettes(formattedPalettes);

      // Start with the expressive palette if available
      const expressive =
        formattedPalettes.find(
          (palette) => palette.variant === "expressive"
        ) || formattedPalettes[0];

      setActivePalette(expressive);

      setSelectedMood(mood);

      setTimeout(() => {
        document
          .getElementById("palette-result")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 150);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while creating your palette. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // COPY COLOR
  // --------------------------------------------------

  const copyColor = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);

      setCopied(hex);

      setTimeout(() => {
        setCopied(null);
      }, 1200);
    } catch (err) {
      console.error("Could not copy colour:", err);
    }
  };

  // --------------------------------------------------
  // MOOD BUTTON
  // --------------------------------------------------

  const chooseMood = (mood) => {
    const moodText = mood.name.toLowerCase();

    setVibe(moodText);
    setSelectedMood(moodText);

    generatePalette(moodText, moodText);
  };

  return (
    <main className="app">

      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">
          pixellete<span>°</span>
        </div>

        <div className="nav-right">
          <span>Find your colours</span>
        </div>
      </nav>


      {/* HERO */}

      <section className="hero">

        <p className="eyebrow">
          A colour tool for people who don't know colour theory
        </p>

        <h1>
          Find colours
          <br />
          that <i>feel</i> like you.
        </h1>

        <p className="hero-description">
          Tell Pixellete what you're imagining. We'll turn the
          feeling into a colour world.
        </p>


        {/* INPUT */}

        <div className="input-card">

          <textarea
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="Try something like: rainy Sunday, old books, coffee, warm lights..."
          />

          <button
            className="generate-button"
            onClick={() => generatePalette()}
            disabled={loading}
          >
            {loading ? "Finding your colours..." : "Make my palette"}

            {!loading && <span>→</span>}
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {/* MOODS */}

        <div className="mood-section">

          <span className="mood-label">
            Or start with a feeling
          </span>

          <div className="mood-list">

            {MOODS.map((mood) => (

              <button
                key={mood.name}
                className={
                  selectedMood === mood.name.toLowerCase()
                    ? "mood active"
                    : "mood"
                }
                onClick={() => chooseMood(mood)}
              >
                <span>{mood.emoji}</span>
                {mood.name}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* RESULTS */}

      {activePalette && (

        <section
          className="result-section"
          id="palette-result"
        >

          {/* RESULT HEADER */}

          <div className="result-heading">

            <div>

              <p className="eyebrow">
                Your colour world
              </p>

              <h2>
                {activePalette.title}
              </h2>

              <p>
                {activePalette.description}
              </p>

              {activePalette.rationale && (
                <p className="palette-rationale">
                  {activePalette.rationale}
                </p>
              )}

            </div>

            <button
              className="again-button"
              onClick={() => generatePalette()}
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Generate again ↗"}
            </button>

          </div>


          {/* VARIANT SWITCHER */}

          {palettes.length > 1 && (

            <div className="variant-list">

              {palettes.map((palette) => (

                <button
                  key={palette.variant}
                  className={
                    activePalette.variant === palette.variant
                      ? "variant active"
                      : "variant"
                  }
                  onClick={() =>
                    setActivePalette(palette)
                  }
                >
                  {palette.variant}
                </button>

              ))}

            </div>

          )}


          {/* COLOURS */}

          <div className="palette-grid">

            {activePalette.colors.map(
              ([name, hex], index) => (

                <button
                  className="color-card"
                  key={hex}
                  style={{
                    backgroundColor: hex,
                  }}
                  onClick={() => copyColor(hex)}
                >

                  <div className="color-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="color-info">

                    <strong>
                      {name}
                    </strong>

                    <span>
                      {copied === hex
                        ? "Copied!"
                        : hex}
                    </span>

                  </div>

                </button>

              )
            )}

          </div>


          {/* PREVIEW */}

          <Playground palette={activePalette} />
           </section>
      )};

      {/* FOOTER */}

      <footer>

        <div className="logo">
          pixellete<span>°</span>
        </div>

        <p>
          Colours, but make them feel right.
        </p>

      </footer>

    </main>
  );
}

export default App;