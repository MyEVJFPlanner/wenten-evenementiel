import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../../data/scenarios";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";

export default function DemandesEnMariage() {
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

      <footer className="footer">
        <div className="footer-logo">WENTEN <span>événementiel</span></div>
        <p className="footer-sub">La Réunion · Depuis 2017</p>
      </footer>
    </>
  );
}
