import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../../data/scenarios";
import SiteHeader from "../../components/SiteHeader";
import FormulaireReservation from "../../components/FormulaireReservation";

export function getStaticPaths() {
  return {
    paths: SCENARIOS.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const index = SCENARIOS.findIndex((s) => s.slug === params.slug);
  const scenario = SCENARIOS[index];
  const mediaItems = [
    ...(scenario.photos ? scenario.photos : [scenario.photo]).map((src) => ({
      type: "image",
      src,
    })),
    ...(scenario.videos || []).map((src) => ({ type: "video", src })),
  ];
  const suggestions = [1, 2, 3].map(
    (offset) => SCENARIOS[(index + offset) % SCENARIOS.length]
  );
  return { props: { scenario, mediaItems, suggestions } };
}

function RingRating({ note, nombreAvis }) {
  return (
    <div className="ring-rating">
      {[1, 2, 3, 4, 5].map((i) => {
        let opacity = 0.25;
        if (i <= Math.floor(note)) opacity = 1;
        else if (i === Math.ceil(note) && note % 1 > 0) opacity = note % 1;
        return (
          <span key={i} className="ring-icon" style={{ opacity }}>
            💍
          </span>
        );
      })}
      <span className="ring-text">
        {note}/5 · {nombreAvis} avis
      </span>
    </div>
  );
}

export default function ScenarioDetail({ scenario, mediaItems, suggestions }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const current = mediaItems[activeIdx];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setFormOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen || formOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, formOpen]);

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
        {/* ── HERO GALERIE ── */}
        <section className="detail-hero">
          {/* Image/vidéo principale — clic = lightbox */}
          <div
            className="detail-hero-bg"
            style={{ cursor: "zoom-in" }}
            onClick={() => setLightboxOpen(true)}
            role="button"
            aria-label="Voir en grand"
          >
            {current.type === "image" ? (
              <Image
                src={current.src}
                alt={scenario.titre}
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="100vw"
              />
            ) : (
              <video
                src={current.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <div className="detail-hero-gradient" />
          <div
            className="detail-hero-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="detail-hero-numero">Scénario {scenario.numero}</span>
            <h1 className="detail-h1">{scenario.titre}</h1>
            {scenario.note && (
              <RingRating note={scenario.note} nombreAvis={scenario.nombreAvis} />
            )}
            <p className="detail-accroche">{scenario.accroche}</p>
          </div>
        </section>

        {/* ── MINIATURES ── */}
        {mediaItems.length > 1 && (
          <div className="detail-thumbs-strip">
            {mediaItems.map((m, i) => (
              <button
                key={i}
                className={`detail-thumb${i === activeIdx ? " active" : ""}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Média ${i + 1}`}
              >
                {m.type === "image" ? (
                  <Image
                    src={m.src}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="88px"
                  />
                ) : (
                  <>
                    <video
                      src={m.src}
                      muted
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span className="detail-thumb-play">▶</span>
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── LIGHTBOX ── */}
        {lightboxOpen && (
          <div className="lightbox" onClick={() => setLightboxOpen(false)}>
            <button
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
              {current.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={current.src}
                  alt={scenario.titre}
                  className="lightbox-img"
                />
              ) : (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  className="lightbox-video"
                />
              )}
            </div>
          </div>
        )}

        {/* ── CORPS ── */}
        <section className="section">
          <div className="container">
            <div className="detail-body-grid">
              {/* Description + inclus + options */}
              <div className="detail-description-col">
                <div className="section-eyebrow">Le scénario</div>
                <div className="detail-desc-body">
                  {scenario.description.split("\n\n").map((para, i) => (
                    <p key={i} className="detail-desc-text">
                      {para.trim()}
                    </p>
                  ))}
                </div>

                <div className="inclus-header">Ce qui est inclus</div>
                <ul className="inclus-list">
                  {scenario.inclus.map((item) => (
                    <li key={item} className="inclus-item">
                      <span className="inclus-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {scenario.options && (
                  <div className="options-bloc">
                    <div className="options-bloc-title">Options en plus</div>
                    <ul className="options-list">
                      {scenario.options.map((opt) => (
                        <li key={opt.nom} className="options-item">
                          <span className="options-item-left">
                            <span className="options-item-nom">{opt.nom}</span>
                            {opt.detail && (
                              <span className="options-item-detail">{opt.detail}</span>
                            )}
                          </span>
                          <span className="options-item-prix">+ {opt.prix} €</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Info pratique sticky */}
              <div className="detail-info-col">
                <div className="info-card">
                  <div className="info-price">dès {scenario.prix} €</div>
                  {scenario.prixNote && (
                    <p className="info-prix-note">{scenario.prixNote}</p>
                  )}
                  <div className="info-duree-label">Durée</div>
                  <div className="info-duree">{scenario.duree}</div>
                  {scenario.maxPersonnes && (
                    <div className="info-personnes">👥 {scenario.maxPersonnes}</div>
                  )}
                  <button
                    className="btn-fuchsia info-cta"
                    onClick={() => setFormOpen(true)}
                  >
                    Demander ce scénario →
                  </button>
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
        <section className="cta-final section-dark" id="contact">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre moment unique<br />mérite une <em>attention absolue</em>
          </h2>
          <p className="cta-final-sub">
            Partagez-nous votre vision. Nous créons ensemble l'événement
            qui vous ressemble, sur mesure, à La Réunion.
          </p>
          <button className="btn-fuchsia" onClick={() => setFormOpen(true)}>
            Demander un devis personnalisé →
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-logo">
          WENTEN <span>événementiel</span>
        </div>
        <p className="footer-sub">La Réunion · Depuis 2017</p>
      </footer>

      {/* ── FORMULAIRE MODALE ── */}
      {formOpen && (
        <FormulaireReservation
          scenario={scenario}
          onClose={() => setFormOpen(false)}
        />
      )}
    </>
  );
}
