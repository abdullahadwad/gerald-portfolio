import { ImageResponse } from "next/og";

// ── Static site-level OG image ─────────────────────────────────────────────
// Rendered at the edge. Mirrors the site's typographic aesthetic:
// near-black background, generous letter-spacing, light-weight type.

export const runtime = "edge";
export const alt = "Gerald Gyimah — Writer / Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px 88px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: production company label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "#555555",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#555555",
              fontWeight: 400,
            }}
          >
            Still Room Productions
          </span>
        </div>

        {/* Centre: name + role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: "76px",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#F5F1EA",
              lineHeight: 1,
            }}
          >
            Gerald Gyimah
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#888880",
            }}
          >
            Writer / Director
          </span>
        </div>

        {/* Bottom: domain */}
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#444444",
            fontWeight: 400,
          }}
        >
          geraldgyimah.com
        </span>
      </div>
    ),
    { ...size }
  );
}
