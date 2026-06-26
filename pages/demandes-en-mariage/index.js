import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../../data/scenarios";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import FormulaireSejourMaurice from "../../components/FormulaireSejourMaurice";
import SiteFooter from "../../components/SiteFooter";

export default function DemandesEnMariage() {
  const [sejourFormOpen, setSejourFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sejourFormOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sejourFormOpen]);

  return (
    <>
      <Head>
        <title>Demandes en mariage — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Découvrez nos 10 scénarios de demande en mariage sur mesure à La Réunion. De l'hélicoptère au lagon de l'Île Maurice, chaque instant est unique."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="section-eyebrow">10 scénarios signature</div>
          <h1 className="page-hero-h1">Les demandes <em>en mariage</em></h1>
          <p className="page-hero-sub">
            200+ histoires d'amour et d'événements inoubliables.<br />
            Choisissez votre scénario, nous créons le reste.
          </p>
        </section>

        {/* ── GRILLE DES SCÉNARIOS ── */}
        <section className="section">
          <div className="container">
            <div className="scenarios-grid scenarios-grid--full">
              {SCENARIOS.map((s) => (
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
          </div>
        </section>

        {/* ── BANNIÈRE SÉJOUR MAURICE ── */}
        <section className="section">
          <div className="container">
            <div className="maurice-banner">
              <div className="maurice-banner-content">
                <p className="maurice-banner-text">
                  🌴 Organisez votre week-end de demande en mariage à l'Île Maurice, en formule tout compris&nbsp;! Grâce à notre partenariat rapproché avec une agence de voyage locale, nous pouvons inclure vols, hébergement et l'un de nos scénarios magiques.
                </p>
                <button
                  className="btn-fuchsia"
                  onClick={() => setSejourFormOpen(true)}
                >
                  Demander ce séjour →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark" id="contact">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre moment unique<br />mérite une <em>attention absolue</em>
          </h2>
          <p className="cta-final-sub">
            Partagez-nous votre vision. Nous créons ensemble l'événement
            qui vous ressemble, sur mesure, à La Réunion.
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
