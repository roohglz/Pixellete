import { useState } from "react";
import "./Playground.css";

const TOOLS = [
  {
    id: "website",
    icon: "◩",
    title: "Website",
    description: "Build a visual direction for a website.",
  },
  {
    id: "social",
    icon: "◎",
    title: "Social",
    description: "See your palette as a social post.",
  },
  {
    id: "branding",
    icon: "✦",
    title: "Branding",
    description: "Create a tiny visual identity.",
  },
  {
    id: "fashion",
    icon: "◇",
    title: "Fashion",
    description: "Turn your colours into an outfit.",
  },
  {
    id: "interior",
    icon: "□",
    title: "Interior",
    description: "Imagine a room in your palette.",
  },
  {
    id: "packaging",
    icon: "▱",
    title: "Packaging",
    description: "See your palette on a product.",
  },
];

function Playground({ palette }) {
  const [activeTool, setActiveTool] = useState("website");

  if (!palette || !palette.colors || palette.colors.length < 5) {
    return null;
  }

  const colors = palette.colors.map((item) => item[1]);

  return (
    <section className="playground">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="playground-heading">

        <div>

          <p className="playground-eyebrow">
            PIXELLETE PLAYGROUND
          </p>

          <h2>
            Now make
            <br />
            <i>something.</i>
          </h2>

          <p className="playground-intro">
            Your palette is only the beginning.
            Explore what these colours could become.
          </p>

        </div>


        {/* PALETTE STRIP */}

        <div className="playground-palette">

          {colors.map((color, index) => (
            <div
              key={color}
              className="playground-palette-color"
              style={{
                backgroundColor: color,
              }}
            >
              <span>
                0{index + 1}
              </span>
            </div>
          ))}

        </div>

      </div>


      {/* =========================================
          TOOL SELECTOR
      ========================================= */}

      <div className="playground-tools">

        {TOOLS.map((tool) => (

          <button
            key={tool.id}
            className={
              activeTool === tool.id
                ? "playground-tool active"
                : "playground-tool"
            }
            onClick={() => setActiveTool(tool.id)}
          >

            <span className="tool-icon">
              {tool.icon}
            </span>

            <span className="tool-title">
              {tool.title}
            </span>

            <span className="tool-description">
              {tool.description}
            </span>

            <span className="tool-arrow">
              ↗
            </span>

          </button>

        ))}

      </div>


      {/* =========================================
          CANVAS
      ========================================= */}

      <div
        className="playground-canvas"
        style={{
          "--c1": colors[0],
          "--c2": colors[1],
          "--c3": colors[2],
          "--c4": colors[3],
          "--c5": colors[4],
        }}
      >

        {/* WEBSITE */}

        {activeTool === "website" && (
          <WebsitePreview colors={colors} />
        )}


        {/* SOCIAL */}

        {activeTool === "social" && (
          <SocialPreview colors={colors} />
        )}


        {/* BRANDING */}

        {activeTool === "branding" && (
          <BrandingPreview colors={colors} />
        )}


        {/* FASHION */}

        {activeTool === "fashion" && (
          <FashionPreview colors={colors} />
        )}


        {/* INTERIOR */}

        {activeTool === "interior" && (
          <InteriorPreview colors={colors} />
        )}


        {/* PACKAGING */}

        {activeTool === "packaging" && (
          <PackagingPreview colors={colors} />
        )}

      </div>

    </section>
  );
}


/* ==================================================
   WEBSITE
================================================== */

function WebsitePreview({ colors }) {

  return (

    <div
      className="creation website-creation"
      style={{
        backgroundColor: colors[0],
        color: colors[4],
      }}
    >

      <div className="website-nav">

        <strong>
          studio°
        </strong>

        <div>
          <span>Work</span>
          <span>About</span>
          <span>Contact</span>
        </div>

      </div>


      <div className="website-content">

        <div>

          <small>
            CREATIVE STUDIO
          </small>

          <h3>
            Ideas that
            <br />
            <em>feel like something.</em>
          </h3>

          <p>
            A small studio creating thoughtful
            things for curious people.
          </p>

          <button
            style={{
              backgroundColor: colors[4],
              color: colors[0],
            }}
          >
            Explore work →
          </button>

        </div>


        <div
          className="website-orb"
          style={{
            backgroundColor: colors[2],
          }}
        >

          <div
            style={{
              backgroundColor: colors[3],
            }}
          />

        </div>

      </div>


      <div className="website-bottom">

        <span>
          SELECTED WORK
        </span>

        <span>
          01 — 04
        </span>

      </div>

    </div>

  );
}


/* ==================================================
   SOCIAL
================================================== */

function SocialPreview({ colors }) {

  return (

    <div
      className="creation social-creation"
      style={{
        backgroundColor: colors[1],
      }}
    >

      <div className="social-phone">

        <div
          className="phone-bar"
          style={{
            color: colors[0],
          }}
        >
          <span>9:41</span>
          <span>•••</span>
        </div>


        <div
          className="social-post"
          style={{
            backgroundColor: colors[0],
          }}
        >

          <div className="social-user">

            <span
              style={{
                backgroundColor: colors[3],
              }}
            >
              p
            </span>

            <strong
              style={{
                color: colors[4],
              }}
            >
              pixellete
            </strong>

          </div>


          <div
            className="social-art"
            style={{
              backgroundColor: colors[2],
              color: colors[0],
            }}
          >

            <span>
              FIND
              <br />
              YOUR
              <br />
              <em
                style={{
                  color: colors[3],
                }}
              >
                colours.
              </em>
            </span>

          </div>


          <div
            className="social-caption"
            style={{
              color: colors[4],
            }}
          >

            <strong>
              pixellete
            </strong>

            <br />

            Colour is a feeling.

          </div>

        </div>

      </div>


      <div className="creation-copy">

        <small>
          SOCIAL MEDIA
        </small>

        <h3>
          Your palette,
          <br />
          <em>on the feed.</em>
        </h3>

        <p>
          See how your colours could become
          a social identity.
        </p>

      </div>

    </div>

  );
}


/* ==================================================
   BRANDING
================================================== */

function BrandingPreview({ colors }) {

  return (

    <div
      className="creation branding-creation"
      style={{
        backgroundColor: colors[4],
      }}
    >

      <div
        className="business-card"
        style={{
          backgroundColor: colors[0],
          color: colors[4],
        }}
      >

        <div
          className="brand-star"
          style={{
            color: colors[3],
          }}
        >
          ✦
        </div>

        <div>

          <strong>
            ATELIER
          </strong>

          <p>
            Objects with a story.
          </p>

        </div>

        <small>
          EST. 2026
        </small>

      </div>


      <div className="creation-copy branding-copy">

        <small>
          BRAND IDENTITY
        </small>

        <h3>
          Five colours.
          <br />
          <em>One identity.</em>
        </h3>

        <div className="mini-swatches">

          {colors.map((color) => (

            <span
              key={color}
              style={{
                backgroundColor: color,
              }}
            />

          ))}

        </div>

      </div>

    </div>

  );
}


/* ==================================================
   FASHION
================================================== */

function FashionPreview({ colors }) {

  return (

    <div
      className="creation fashion-creation"
      style={{
        backgroundColor: colors[0],
      }}
    >

      <div className="fashion-copy">

        <small>
          FASHION
        </small>

        <h3>
          Wear the
          <br />
          <em>feeling.</em>
        </h3>

        <p>
          A colour story translated into
          an everyday outfit.
        </p>

      </div>


      <div className="outfit">

        {/* HEAD */}

        <div
          className="person-head"
          style={{
            backgroundColor: colors[4],
          }}
        />


        {/* TOP */}

        <div
          className="person-top"
          style={{
            backgroundColor: colors[2],
          }}
        />


        {/* PANTS */}

        <div
          className="person-pants"
          style={{
            backgroundColor: colors[3],
          }}
        />


        {/* SHOES */}

        <div className="person-shoes">

          <span
            style={{
              backgroundColor: colors[1],
            }}
          />

          <span
            style={{
              backgroundColor: colors[1],
            }}
          />

        </div>

      </div>


      <div className="fashion-swatches">

        {colors.map((color) => (

          <span
            key={color}
            style={{
              backgroundColor: color,
            }}
          />

        ))}

      </div>

    </div>

  );
}


/* ==================================================
   INTERIOR
================================================== */

function InteriorPreview({ colors }) {

  return (

    <div
      className="creation interior-creation"
      style={{
        backgroundColor: colors[0],
      }}
    >

      <div className="room">

        {/* WALL */}

        <div
          className="room-wall"
          style={{
            backgroundColor: colors[1],
          }}
        >

          <div
            className="wall-art"
            style={{
              backgroundColor: colors[3],
            }}
          />

        </div>


        {/* FLOOR */}

        <div
          className="room-floor"
          style={{
            backgroundColor: colors[4],
          }}
        />


        {/* SOFA */}

        <div
          className="sofa"
          style={{
            backgroundColor: colors[2],
          }}
        />

        <div
          className="sofa-leg left"
          style={{
            backgroundColor: colors[4],
          }}
        />

        <div
          className="sofa-leg right"
          style={{
            backgroundColor: colors[4],
          }}
        />


        {/* PLANT */}

        <div className="plant">

          <div className="plant-stem" />

          <div
            className="plant-leaf one"
            style={{
              backgroundColor: colors[3],
            }}
          />

          <div
            className="plant-leaf two"
            style={{
              backgroundColor: colors[3],
            }}
          />

        </div>

      </div>


      <div className="creation-copy interior-copy">

        <small>
          INTERIOR
        </small>

        <h3>
          A room with
          <br />
          <em>a feeling.</em>
        </h3>

        <p>
          Walls, furniture and little
          details brought together.
        </p>

      </div>

    </div>

  );
}


/* ==================================================
   PACKAGING
================================================== */

function PackagingPreview({ colors }) {

  return (

    <div
      className="creation packaging-creation"
      style={{
        backgroundColor: colors[1],
      }}
    >

      <div
        className="package-box"
        style={{
          backgroundColor: colors[0],
          color: colors[4],
        }}
      >

        <div
          className="package-symbol"
          style={{
            color: colors[3],
          }}
        >
          ✦
        </div>

        <strong>
          SUNDAY
          <br />
          OBJECTS
        </strong>

        <small>
          MADE FOR SLOW DAYS
        </small>

      </div>


      <div className="creation-copy">

        <small>
          PACKAGING
        </small>

        <h3>
          Put your
          <br />
          <em>palette on a shelf.</em>
        </h3>

        <p>
          See how your colours could become
          a physical product.
        </p>

      </div>

    </div>

  );
}


export default Playground;