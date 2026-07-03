import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { entreprises } from "../data/entreprises";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import SiteFooter from "../components/SiteFooter";
import FormulaireConcept from "../components/FormulaireConcept";

function LogoItem({ logo }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="logo-item">
      {imgError ? (
        <span className="logo-item-text">{logo.nom}</span>
      ) : (
        <img
          src={logo.logo}
          alt={logo.nom}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

export default function Entreprises() {
  const [modalOpen, setModalOpen] = useState(false);
  const fakeConcept = { emoji: "🤝", titre: "Événement d'entreprise" };

  return (
    <>
      <Head>
        <title>Événements d'entreprise — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Séminaires, soirées de gala, team building, cocktails d'entreprise à La Réunion. Wenten Événementiel organise vos événements professionnels sur mesure."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="maurice-hero-section" style={{ minHeight: 520 }}>
          <div className="maurice-hero-bg">
            <Image
              src={entreprises.hero.photo}
              alt="Événements d'entreprise à La Réunion"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
            />
          </div>
          <div className="maurice-hero-overlay" />
          <div className="maurice-hero-content">
            <div className="section-eyebrow" style={{ color: "#BFE9E2" }}>
              Événements d'entreprise
            </div>
            <h1 className="maurice-hero-title">{entreprises.hero.titre}</h1>
            <p className="maurice-hero-sub">{entreprises.hero.accroche}</p>
            <button
              className="btn-fuchsia"
              onClick={() => setModalOpen(true)}
            >
              {entreprises.hero.cta} →
            </button>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="section">
          <div className="container">
            <p className="entreprises-intro">{entreprises.intro}</p>
          </div>
        </section>

        {/* ── PRESTATIONS ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="section-eyebrow" style={{ textAlign: "center", marginBottom: 32 }}>
              Nos prestations
            </div>
            <div className="entreprises-grid">
              {entreprises.prestations.map((p) => (
                <div key={p.titre} className="prestation-card">
                  <div className="prestation-emoji">{p.emoji}</div>
                  <h2 className="prestation-titre">{p.titre}</h2>
                  <p className="prestation-desc">{p.description}</p>
                  <ul className="prestation-inclus">
                    {p.inclus.map((item) => (
                      <li key={item} className="prestation-check">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGOS RÉFÉRENCES ── */}
        <section className="section logos-section">
          <div className="container">
            <div className="section-eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>
              Références
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                fontWeight: 400,
                color: "var(--deep)",
                textAlign: "center",
                margin: "0 0 36px",
              }}
            >
              {entreprises.references.titre}
            </h2>
            <div className="logos-grid">
              {entreprises.references.logos.map((logo) => (
                <LogoItem key={logo.nom} logo={logo} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark">
          <div className="cta-final-eyebrow">Sur mesure &amp; gratuit</div>
          <h2 className="cta-final-title">
            {entreprises.cta.titre}
          </h2>
          <p className="cta-final-sub">{entreprises.cta.texte}</p>
          <button
            className="btn-fuchsia"
            onClick={() => setModalOpen(true)}
          >
            {entreprises.cta.bouton} →
          </button>
        </section>
      </main>

      <SiteFooter />

      {modalOpen && (
        <FormulaireConcept
          concept={fakeConcept}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
