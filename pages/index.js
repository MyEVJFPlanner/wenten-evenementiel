import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../data/scenarios";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import EquipeSection from "../components/EquipeSection";
import FormulaireSejourMaurice from "../components/FormulaireSejourMaurice";
import SiteFooter from "../components/SiteFooter";

const HOMEPAGE_SCENARIOS = SCENARIOS.slice(0, 4);

const UNIVERS = [
  { label: "Mariages", img: "/images/galerie/photo-19.jpg" },
  { label: "Guinguette Bohème", img: "/images/galerie/photo-05.jpg" },
  { label: "Pyjama Party Premium", img: "/images/galerie/photo-20.jpg" },
  { label: "Cinétoilé", img: "/images/galerie/photo-21.jpg" },
  { label: "EVJF & EVG", img: "/images/galerie/photo-03.jpg", href: "https://www.myevjfplanner.com" },
];

export default function Home() {
  const [sejourFormOpen, setSejourFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sejourFormOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sejourFormOpen]);

  return (
    <>
      <Head>
        <title>Wenten Événementiel — La Réunion</title>
        <meta
          name="description"
          content="Spécialiste des demandes en mariage, mariages et événements sur mesure à La Réunion. 14 ans d'expertise, plus de 200 événements réalisés."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO — photo-13 : piscine à débordement au coucher de soleil ── */}
        <section className="hero">
          <div className="hero-bg">
            <Image
              src="/images/hero-marry-me.jpg"
              alt="Événement Wenten — La Réunion"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 50%" }}
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
              <a href="/demandes-en-mariage" className="btn-primary">Découvrir nos scénarios →</a>
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
              <a href="/demandes-en-mariage" className="section-link">Voir les 10 scénarios →</a>
            </div>
            <div className="scenarios-grid">
              {HOMEPAGE_SCENARIOS.map((s) => (
                <a
                  key={s.slug}
                  href={`/demandes-en-mariage/${s.slug}`}
                  className="scenario-card"
                >
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
                </a>
              ))}
            </div>
            <div className="section-cta">
              <a href="/demandes-en-mariage" className="btn-pill-outline">Voir tous les scénarios →</a>
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
              {UNIVERS.map((u) => {
                const Tag = u.href ? "a" : "div";
                const linkProps = u.href
                  ? { href: u.href, target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <Tag key={u.label} className="univers-card" style={u.href ? { cursor: "pointer" } : {}} {...linkProps}>
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
                  </Tag>
                );
              })}
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

        {/* ── ÉQUIPE ── */}
        <EquipeSection />

        {/* ── SÉJOUR MAURICE ── */}
        <section className="maurice-hero-section">
          <div className="maurice-hero-bg">
            <Image
              src="/images/lagoon-love/lagoon-love-01.webp"
              alt="Demande en mariage à l'Île Maurice"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
            />
            <div className="maurice-hero-overlay" />
          </div>
          <div className="maurice-hero-content">
            <div className="section-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Formule exclusive</div>
            <h2 className="maurice-hero-title">🌴 Votre week-end complet à l'Île Maurice</h2>
            <p className="maurice-hero-text">
              Organisez votre week-end de demande en mariage à l'Île Maurice, en formule tout compris&nbsp;! Grâce à notre partenariat rapproché avec une agence de voyage partenaire, nous pouvons inclure vols, hébergement et l'un de nos scénarios magiques.
            </p>
            <button className="btn-fuchsia" onClick={() => setSejourFormOpen(true)}>
              Demander ce séjour →
            </button>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark" id="contact">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre moment unique<br />mérite une <em>attention absolue</em>
          </h2>
          <p className="cta-final-sub">
            Partagez-nous votre vision. Nous créons ensemble l'événement qui vous ressemble, sur mesure, à La Réunion.
          </p>
          <a href="mailto:contact@wenten-evenementiel.re" className="btn-fuchsia">
            Demander un devis personnalisé →
          </a>
        </section>
      </main>

      <SiteFooter />

      {sejourFormOpen && (
        <FormulaireSejourMaurice onClose={() => setSejourFormOpen(false)} />
      )}
    </>
  );
}
