import Image from "next/image";
import { Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <a href="/" style={{ display: "inline-block", lineHeight: 0 }}>
        <Image
          src="/images/logo-wenten.png"
          alt="Wenten Événementiel"
          width={1181}
          height={1181}
          style={{
            height: "56px",
            width: "auto",
            filter: "brightness(0) invert(1) drop-shadow(0 1px 4px rgba(0,0,0,0.3))",
            opacity: 0.9,
          }}
        />
      </a>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        letterSpacing: "0.1em",
        color: "#BFE9E2",
        marginTop: "10px",
        marginBottom: "0",
      }}>
        La Réunion · Depuis 2012
      </p>
      <a
        href="https://www.instagram.com/wentenevenementielreunion/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Suivez-nous sur Instagram"
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginTop: "14px",
          color: "rgba(255,255,255,0.55)",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#D6428E"}
        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
      >
        <Instagram size={22} />
      </a>
      <p className="footer-sub footer-legal">
        <a href="/mentions-legales">Mentions légales</a>
      </p>
    </footer>
  );
}
