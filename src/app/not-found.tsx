import { fontVariables } from "./fonts";
import "./globals.css";

// Global not-found renders outside the [locale] tree — keep it minimal.
// It renders its own <html>, so it needs the font variables applied here too;
// without them the global `body`/`h1` rules resolve to their fallback stacks.
export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body style={{ margin: 0 }}>
        <section
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#04141f",
            color: "#f4f1ec",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <p className="label" style={{ opacity: 0.5 }}>
              404
            </p>
            <h1 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
              Page not found
            </h1>
            <a
              href="/"
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "0.9rem 1.8rem",
                background: "#f4f1ec",
                color: "#04141f",
                borderRadius: "999px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back home
            </a>
          </div>
        </section>
      </body>
    </html>
  );
}
