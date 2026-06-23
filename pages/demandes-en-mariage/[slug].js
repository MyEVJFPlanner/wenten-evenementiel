import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../../data/scenarios";
import SiteHeader from "../../components/SiteHeader";

export function getStaticPaths() {
  return {
    paths: SCENARIOS.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const index = SCENARIOS.findIndex((s) => s.slug === params.slug);
  const scenario = SCENARIOS[index];
  const suggestions = [1, 2, 3].map(
    (offset) => SCENARIOS[(index + offset) % SCENARIOS.length]
  );
  return { props: { scenario, suggestions } };
}

export default function ScenarioDetail({ scenario, suggestions }) {
  return (
    <>
      <Head>
        <title>{scenario.titre} — Wenten Événementiel La Réunion</title>
        <meta name="description" content={scenario.accroche} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO PLEINE PHOTO ── */}
        <section className="detail-hero">
          <div className="detail-hero-bg">
            <Image
              src={scenario.photo}
              alt={scenario.titre}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
            />
          </div>
          <div className="detail-hero-gradient" />
          <div className="detail-hero-content">
            <span className="detail-hero-numero">Scénario {scenario.numero}</span>
            <h1 className="detail-h1">{scenario.titre}</h1>
            <p className="detail-accroche">{scenario.accroche}</p>
          </div>
        </section>

        {/* ── CORPS ── */}
        <section className="section">
          <div className="container">
            <div className="detail-body-grid">
              {/* Description + inclus */}
              <div className="detail-description-col">
                <div className="section-eyebrow">Le scénario</div>
                <p className="detail-desc-text">{scenario.description}</p>

                <div className="inclus-header">Ce qui est inclus</div>
                <ul className="inclus-list">
                  {scenario.inclus.map((item) => (
                    <li key={item} className="inclus-item">
                      <span className="inclus-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info pratique sticky */}
              <div className="detail-info-col">
                <div className="info-card">
                  <div className="info-price">dès {scenario.prix} €</div>
                  <div className="info-duree-label">Durée</div>
                  <div className="info-duree">{scenario.duree}</div>
                  <a href="mailto:contact@wenten-evenementiel.re" className="btn-fuchsia info-cta">
                    Demander ce scénario →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SUGGESTIONS ── */}
        <section className="suggestions-section">
          <div className="container">
            <div className="section-eyebrow">Continuer l'exploration</div>
            <h2 className="section-title" style={{ marginBottom: "32px" }}>
              Découvrir un <em>autre scénario</em>
            </h2>
            <div className="suggestions-grid">
              {suggestions.map((s) => (
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
                      sizes="(max-width: 768px) 100vw, 33vw"
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
        <section className="cta-final" id="contact">
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
