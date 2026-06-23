import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../data/scenarios";

const NAV_LINKS = [
  { label: "Demandes en mariage", href: "#scenarios" },
  { label: "Mariages", href: "#univers" },
  { label: "Concepts", href: "#univers" },
  { label: "Entreprises", href: "#univers" },
  { label: "Galerie", href: "#galerie" },
];

const HOMEPAGE_SCENARIOS = SCENARIOS.slice(0, 4);

const UNIVERS = [
  { label: "Mariages", img: "/images/galerie/photo-19.jpg" },
  { label: "Guinguette Bohème", img: "/images/galerie/photo-05.jpg" },
  { label: "Pyjama Party Premium", img: "/images/galerie/photo-20.jpg" },
  { label: "Cinétoilé", img: "/images/galerie/photo-21.jpg" },
  { label: "EVJF & EVG", img: "/images/galerie/photo-03.jpg" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Wenten Événementiel — La Réunion</title>
        <meta name="description" content="Spécialiste des demandes en mariage, mariages et événements sur mesure à La Réunion. 14 ans d'expertise, plus de 200 événements réalisés." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* ── HEADER ── */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#" className="logo-text">
            WENTEN <span>événementiel</span>
          </a>
          <nav className="nav-links-desktop">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <a href="#contact" className="btn-devis">Devis →</a>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </header>

      {/* ── DRAWER MOBILE ── */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="drawer-panel">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="drawer-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="drawer-cta" onClick={() => setMenuOpen(false)}>Demander un devis →</a>
        </div>
      </div>

      <main>
        {/* ── HERO — photo-13 : piscine à débordement au coucher de soleil ── */}
        <section className="hero">
          <div className="hero-bg">
            <Image
              src="/images/galerie/photo-13.jpg"
              alt="Événement Wenten — La Réunion"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 55%" }}
              sizes="100vw"
            />
          </div>
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-line" />
              14 ans d'expertise · La Réunion
              <span className="hero-badge-line" />
            </div>
            <h1 className="hero-h1">
              L'art de sublimer<br />vos plus beaux <em>instants</em>
            </h1>
            <p className="hero-sub">
              Demandes en mariage, mariages, concepts événementiels et soirées d'entreprise —<br />
              chaque création naît d'une histoire unique, la vôtre.
            </p>
            <div className="hero-ctas">
              <a href="#scenarios" className="btn-primary">Découvrir nos scénarios →</a>
              <a href="#contact" className="btn-outline-white">Demander un devis</a>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES ── */}
        <div className="stats-bar">
          <div className="stats-grid">
            {[
              { num: "14", label: "ans d'expérience" },
              { num: "200+", label: "événements réalisés" },
              { num: "10", label: "scénarios signature" },
              { num: "4.9★", label: "avis clients" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCÉNARIOS ── */}
        <section className="section" id="scenarios">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-eyebrow">Nos créations phare</div>
                <h2 className="section-title">Les demandes <em>en mariage</em></h2>
              </div>
              <a href="#scenarios" className="section-link">Voir les 10 scénarios →</a>
            </div>
            <div className="scenarios-grid">
              {HOMEPAGE_SCENARIOS.map((s) => (
                <div key={s.slug} className="scenario-card">
                  <div className="scenario-img-wrap">
                    <Image
                      src={s.photo}
                      alt={s.titre}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                    />
                    <span className="scenario-badge">Scénario {s.numero}</span>
                  </div>
                  <div className="scenario-body">
                    <div className="scenario-title">{s.titre}</div>
                    <div className="scenario-desc">{s.accroche}</div>
                    <div className="scenario-price">dès {s.prix} €</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-cta">
              <a href="#scenarios" className="btn-pill-outline">Voir tous les scénarios →</a>
            </div>
          </div>
        </section>

        {/* ── UNIVERS ── */}
        <section className="section section-alt" id="univers">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-eyebrow">De A à Z</div>
                <h2 className="section-title">Nos <em>univers</em></h2>
              </div>
            </div>
            <div className="univers-grid">
              {UNIVERS.map((u) => (
                <div key={u.label} className="univers-card">
                  <Image
                    src={u.img}
                    alt={u.label}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                  <div className="univers-overlay">
                    <span className="univers-label">{u.label}</span>
                  </div>
                </div>
              ))}
              <div className="univers-card-blank">
                <div className="univers-blank-label">Entreprises</div>
                <div className="univers-blank-sub">Séminaires · Galas · Team Building</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE ── */}
        <section className="testimonial-section">
          <div className="testimonial-stars">★★★★★</div>
          <blockquote className="testimonial-quote">
            "Wenten a transformé notre demande en mariage en un moment magique, au-delà de tout ce qu'on aurait pu imaginer. Chaque détail était parfait, l'émotion était totale."
          </blockquote>
          <p className="testimonial-author">— Sofia & Thomas, demande en mariage · Lagon Love</p>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final" id="contact">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">Votre moment unique<br />mérite une <em>attention absolue</em></h2>
          <p className="cta-final-sub">
            Partagez-nous votre vision. Nous créons ensemble l'événement qui vous ressemble, sur mesure, à La Réunion.
          </p>
          <a href="mailto:contact@wenten-evenementiel.re" className="btn-fuchsia">
            Demander un devis personnalisé →
          </a>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">WENTEN <span>événementiel</span></div>
        <p className="footer-sub">La Réunion · Depuis 2017</p>
      </footer>
    </>
  );
}
