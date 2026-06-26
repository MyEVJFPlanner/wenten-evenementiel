import { useState, useEffect } from "react";
import Image from "next/image";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";

const NAV_LINKS = [
  { label: "Demandes en mariage", href: "/demandes-en-mariage" },
  { label: "Concepts", href: "/concepts" },
  { label: "Mariages", href: "/#mariages" },
  { label: "Entreprises", href: "/#entreprises" },
  { label: "Galerie", href: "/galerie" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <a href="/" className="logo-img-link">
            <Image
              src="/images/logo-wenten.png"
              alt="Wenten Événementiel — La Réunion"
              width={1181}
              height={1181}
              style={{ height: "clamp(64px, 8vw, 130px)", width: "auto", objectFit: "contain" }}
              priority
            />
          </a>
          <nav className="nav-links-desktop">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="https://www.instagram.com/wentenevenementielreunion/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Instagram"
              className="header-instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.facebook.com/WentenEvenementielReunion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Facebook"
              className="header-instagram"
            >
              <FacebookIcon size={20} />
            </a>
            <a href="/#contact" className="btn-devis">Devis →</a>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </header>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="drawer-panel">
          <a href="/" className="drawer-logo">
            <Image
              src="/images/logo-wenten.png"
              alt="Wenten Événementiel"
              width={64}
              height={64}
              style={{ objectFit: "contain" }}
            />
          </a>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="drawer-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a
            href="https://www.instagram.com/wentenevenementielreunion/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Instagram"
            className="drawer-link"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => setMenuOpen(false)}
          >
            <InstagramIcon size={18} />
            Instagram
          </a>
          <a
            href="https://www.facebook.com/WentenEvenementielReunion"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Facebook"
            className="drawer-link"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => setMenuOpen(false)}
          >
            <FacebookIcon size={18} />
            Facebook
          </a>
          <a href="/#contact" className="drawer-cta" onClick={() => setMenuOpen(false)}>Demander un devis →</a>
        </div>
      </div>
    </>
  );
}
