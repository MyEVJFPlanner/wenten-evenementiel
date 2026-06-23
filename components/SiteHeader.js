import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Demandes en mariage", href: "/demandes-en-mariage" },
  { label: "Mariages", href: "/#univers" },
  { label: "Concepts", href: "/#univers" },
  { label: "Entreprises", href: "/#univers" },
  { label: "Galerie", href: "/#galerie" },
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
          <a href="/" className="logo-text">
            WENTEN <span>événementiel</span>
          </a>
          <nav className="nav-links-desktop">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a href="/#contact" className="btn-devis">Devis →</a>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </header>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="drawer-panel">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="drawer-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="/#contact" className="drawer-cta" onClick={() => setMenuOpen(false)}>Demander un devis →</a>
        </div>
      </div>
    </>
  );
}
