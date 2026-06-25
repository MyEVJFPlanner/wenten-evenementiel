import Image from "next/image";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";

const socialLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  color: "rgba(255,255,255,0.55)",
  transition: "color 0.2s",
};

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={socialLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#D6428E")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
    >
      {children}
    </a>
  );
}

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
      <div style={{ display: "flex", gap: "16px", marginTop: "14px", justifyContent: "center" }}>
        <SocialLink href="https://www.instagram.com/wentenevenementielreunion/" label="Suivez-nous sur Instagram">
          <InstagramIcon size={22} />
        </SocialLink>
        <SocialLink href="https://www.facebook.com/WentenEvenementielReunion" label="Suivez-nous sur Facebook">
          <FacebookIcon size={22} />
        </SocialLink>
      </div>
      <p className="footer-sub footer-legal">
        <a href="/mentions-legales">Mentions légales</a>
      </p>
    </footer>
  );
}
