import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { concepts } from "../../data/concepts";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import FormulaireConcept from "../../components/FormulaireConcept";
import PhotoLightbox from "../../components/PhotoLightbox";
import LigneReassurance from "../../components/LigneReassurance";
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
  const photos = (concept.photos || [concept.photo]).filter(Boolean);
  const suggestions = [1, 2].map(
    (offset) => concepts[(index + offset) % concepts.length]
  );
  return { props: { concept, photos, suggestions } };
}

function getMinPrix(concept) {
  if (concept.tarifs) return `dès ${concept.tarifs[0].prix} €`;
  if (concept.prix) return `dès ${concept.prix} €${concept.prixUnite || ""}`;
  if (concept.packs) {
    const min = Math.min(...concept.packs.map((p) => parseInt(p.prixLivraison, 10)));
    return `dès ${min} €`;
  }
  return "Sur devis";
}

export default function ConceptDetail({ concept, photos, suggestions }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [nbPersonnes, setNbPersonnes] = useState(
    concept.tarifs ? concept.tarifs[0].personnes : 2
  );
  const [avecChef, setAvecChef] = useState(false);

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
          <div
            className="detail-hero-bg"
            style={{
              cursor: photos.length > 1 ? "zoom-in" : "default",
              ...(photos.length === 0 && concept.gradient ? { background: concept.gradient } : {}),
            }}
            onClick={() => photos.length > 1 && setLightboxOpen(true)}
            role={photos.length > 1 ? "button" : undefined}
            aria-label={photos.length > 1 ? "Voir en grand" : undefined}
          >
            {photos.length > 0 && (
              <Image
                src={photos[activeIdx]}
                alt={concept.titre}
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="100vw"
              />
            )}
            {photos.length > 1 && (
              <div className="detail-hero-zoom-hint" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            )}
          </div>
          <div className="detail-hero-gradient" />
          <div className="detail-hero-content" onClick={(e) => e.stopPropagation()}>
            <span className="detail-hero-numero">
              {concept.emoji} Concept événementiel
            </span>
            <h1 className="detail-h1">{concept.titre}</h1>
            <p className="detail-accroche">{concept.accroche}</p>
          </div>
        </section>

        {/* ── MINIATURES ── */}
        {photos.length > 1 && (
          <div className="detail-thumbs-strip">
            {photos.map((src, i) => (
              <button
                key={i}
                className={`detail-thumb${i === activeIdx ? " active" : ""}`}
                onClick={() => { setActiveIdx(i); setLightboxOpen(true); }}
                aria-label={`Photo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="88px"
                />
              </button>
            ))}
          </div>
        )}

        {lightboxOpen && (
          <PhotoLightbox
            photos={photos}
            startIndex={activeIdx}
            onClose={() => setLightboxOpen(false)}
          />
        )}

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

                {/* Packs (Pyjama Party) */}
                {concept.packs && (
                  <div style={{ marginTop: "8px" }}>
                    <div className="inclus-header">Choisissez votre pack</div>
                    <div className="packs-pyjama-grid">
                      {concept.packs.map((pack) => (
                        <div
                          key={pack.nom}
                          className="pack-pyjama-card"
                          style={pack.accent ? { borderTop: `3px solid ${pack.accent}` } : undefined}
                        >
                          {pack.icon && (
                            <div className="pack-pyjama-icon">{pack.icon}</div>
                          )}
                          {pack.badge && (
                            <span className="pack-pyjama-badge">{pack.badge}</span>
                          )}
                          <div
                            className="pack-pyjama-nom"
                            style={pack.accent ? { color: pack.accent } : undefined}
                          >
                            {pack.nom}
                          </div>
                          <ul className="pack-pyjama-inclus">
                            {pack.inclus.map((item) => (
                              <li key={item} className="inclus-item">
                                <span className="inclus-check">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="pack-pyjama-prix">
                            <div className="pack-pyjama-prix-row">
                              <span className="pack-pyjama-prix-label">Livraison seule</span>
                              <span className="pack-pyjama-prix-val">{pack.prixLivraison} €</span>
                            </div>
                            <div className="pack-pyjama-prix-row">
                              <span className="pack-pyjama-prix-label">Livraison + installation</span>
                              <span className="pack-pyjama-prix-val">{pack.prixLivraisonInstallation} €</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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

                {/* Sous-sections (formules, etc.) */}
                {concept.inclusSections && concept.inclusSections.map((section) => (
                  <div key={section.titre} style={{ marginTop: "24px" }}>
                    <div className="inclus-header">{section.titre}</div>
                    <ul className="inclus-list" style={{ marginBottom: "20px" }}>
                      {section.items.map((item) => (
                        <li key={item} className="inclus-item">
                          <span className="inclus-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

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
                          {opt.prixParPers ? (
                            <span className="options-item-prix">+ {opt.prixParPers} €/pers</span>
                          ) : opt.prix ? (
                            <span className="options-item-prix">+ {opt.prix} €</span>
                          ) : null}
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
                  {concept.tarifs ? (
                    <>
                      <div className="tarif-label">Nombre de personnes</div>
                      <select
                        className="tarif-select"
                        value={nbPersonnes}
                        onChange={(e) => setNbPersonnes(Number(e.target.value))}
                      >
                        {concept.tarifs.map((t) => (
                          <option key={t.personnes} value={t.personnes}>
                            {t.personnes} personne{t.personnes > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>

                      {concept.optionChef && (
                        <label className="chef-toggle">
                          <input
                            type="checkbox"
                            className="chef-toggle-checkbox"
                            checked={avecChef}
                            onChange={(e) => setAvecChef(e.target.checked)}
                          />
                          <span className="chef-toggle-text">
                            <span className="chef-toggle-label">Option traiteur · +{concept.optionChef.prix} €/pers</span>
                            <span className="chef-toggle-sub">{concept.optionChef.label}</span>
                            <span className="chef-toggle-sub">{concept.optionChef.description}</span>
                          </span>
                        </label>
                      )}

                      <div className="tarif-total-bloc">
                        <div className="tarif-total-label">Total estimé</div>
                        <div className="tarif-total-prix">
                          {(
                            (concept.tarifs.find((t) => t.personnes === nbPersonnes)?.prix || 0) +
                            (avecChef && concept.optionChef ? concept.optionChef.prix * nbPersonnes : 0)
                          ).toLocaleString("fr-FR")} €
                        </div>
                        {avecChef && concept.optionChef && (
                          <div className="tarif-total-detail">
                            Base {concept.tarifs.find((t) => t.personnes === nbPersonnes)?.prix} € + Chef {concept.optionChef.prix * nbPersonnes} €
                          </div>
                        )}
                      </div>

                      {concept.prixNote && (
                        <p className="info-prix-note">{concept.prixNote}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="info-price">{getMinPrix(concept)}</div>
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
                    </>
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
                  <div
                    className="concept-img-wrap"
                    style={!s.photo ? { background: s.gradient } : {}}
                  >
                    {s.photo && (
                      <Image
                        src={s.photo}
                        alt={s.titre}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <span
                      className="concept-emoji-badge"
                      style={!s.photo ? { fontSize: "3rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } : {}}
                    >
                      {s.emoji}
                    </span>
                  </div>
                  <div className="concept-body">
                    <div className="concept-title">{s.titre}</div>
                    <div className="concept-desc">{s.accroche}</div>
                    <div className="concept-price">{getMinPrix(s)}</div>
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
          <LigneReassurance dark />
        </section>
      </main>

      <SiteFooter />

      {formOpen && (
        <FormulaireConcept concept={concept} onClose={() => setFormOpen(false)} />
      )}
    </>
  );
}
