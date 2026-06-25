import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { concepts } from "../../data/concepts";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import FormulaireConcept from "../../components/FormulaireConcept";
import SiteFooter from "../../components/SiteFooter";

export function getStaticPaths() {
  return {
    paths: concepts.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const index = concepts.findIndex((c) => c.slug === params.slug);
  const concept = concepts[index];
  const suggestions = [1, 2].map(
    (offset) => concepts[(index + offset) % concepts.length]
  );
  return { props: { concept, suggestions } };
}

export default function ConceptDetail({ concept, suggestions }) {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = formOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [formOpen]);

  return (
    <>
      <Head>
        <title>{concept.titre} — Wenten Événementiel La Réunion</title>
        <meta name="description" content={concept.accroche} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="detail-hero">
          <div className="detail-hero-bg">
            <Image
              src={concept.photo}
              alt={concept.titre}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
            />
          </div>
          <div className="detail-hero-gradient" />
          <div className="detail-hero-content">
            <span className="detail-hero-numero">
              {concept.emoji} Concept événementiel
            </span>
            <h1 className="detail-h1">{concept.titre}</h1>
            <p className="detail-accroche">{concept.accroche}</p>
          </div>
        </section>

        {/* ── CORPS ── */}
        <section className="section">
          <div className="container">
            <div className="detail-body-grid">
              {/* Colonne principale */}
              <div className="detail-description-col">
                <div className="section-eyebrow">Le concept</div>
                <div className="detail-desc-body">
                  {concept.description.split("\n\n").map((para, i) => (
                    <p key={i} className="detail-desc-text">{para.trim()}</p>
                  ))}
                </div>

                {/* Idéal pour */}
                {concept.idealPour && (
                  <>
                    <div className="inclus-header">Idéal pour</div>
                    <div className="ideal-pour-tags">
                      {concept.idealPour.map((item) => (
                        <span key={item} className="ideal-pour-tag">{item}</span>
                      ))}
                    </div>
                  </>
                )}

                {/* Ce qui est inclus */}
                {concept.inclus && (
                  <>
                    <div className="inclus-header">Ce qui est inclus</div>
                    <ul className="inclus-list">
                      {concept.inclus.map((item) => (
                        <li key={item} className="inclus-item">
                          <span className="inclus-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Repas au choix (Vintage & Vinyles) */}
                {concept.repasAuChoix && (
                  <div style={{ marginTop: "40px" }}>
                    <div className="inclus-header">Repas au choix</div>
                    <div className="repas-grid">
                      {concept.repasAuChoix.map((repas) => (
                        <div key={repas.nom} className="repas-card">
                          <div className="repas-nom">{repas.nom}</div>
                          <ul className="repas-details">
                            {repas.details.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Options en plus */}
                {concept.options && concept.options.length > 0 && (
                  <div className="options-bloc">
                    <div className="options-bloc-title">Options en plus</div>
                    <ul className="options-list">
                      {concept.options.map((opt) => (
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

                {/* Infos pratiques */}
                {concept.infosPratiques && (
                  <div style={{ marginTop: "36px" }}>
                    <div className="inclus-header">Infos pratiques</div>
                    <ul className="infos-pratiques-list">
                      {concept.infosPratiques.map((info) => (
                        <li key={info} className="infos-pratiques-item">{info}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Colonne info sticky */}
              <div className="detail-info-col">
                <div className="info-card">
                  <div className="info-price">
                    dès {concept.prix} €{concept.prixUnite || ""}
                  </div>
                  {concept.minPersonnes && (
                    <p className="info-prix-note">
                      À partir de {concept.minPersonnes} personnes
                    </p>
                  )}
                  {concept.prixNote && (
                    <p className="info-prix-note" style={{ marginTop: concept.minPersonnes ? "6px" : undefined }}>
                      {concept.prixNote}
                    </p>
                  )}
                  <div className="info-duree-label" style={{ marginTop: "20px" }}>Lieu</div>
                  <div className="info-duree">Au choix</div>
                  <button
                    className="btn-fuchsia info-cta"
                    onClick={() => setFormOpen(true)}
                  >
                    Réserver ce concept →
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
              Découvrir un <em>autre concept</em>
            </h2>
            <div className="suggestions-grid">
              {suggestions.map((s) => (
                <a key={s.slug} href={`/concepts/${s.slug}`} className="concept-card">
                  <div className="concept-img-wrap">
                    <Image
                      src={s.photo}
                      alt={s.titre}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="concept-emoji-badge">{s.emoji}</span>
                  </div>
                  <div className="concept-body">
                    <div className="concept-title">{s.titre}</div>
                    <div className="concept-desc">{s.accroche}</div>
                    <div className="concept-price">
                      dès {s.prix} €{s.prixUnite || ""}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre événement mérite une <em>attention absolue</em>
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

      <SiteFooter />

      {formOpen && (
        <FormulaireConcept concept={concept} onClose={() => setFormOpen(false)} />
      )}
    </>
  );
}
