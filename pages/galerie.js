import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import SiteFooter from "../components/SiteFooter";

const EXT = { 11: "png", 22: "webp" };
const PHOTOS = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  const ext = EXT[n] || "jpg";
  return `/images/galerie/photo-${String(n).padStart(2, "0")}.${ext}`;
});

export default function Galerie() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const open = (i) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const prev = useCallback(() => setLightboxIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setLightboxIdx((i) => (i + 1) % PHOTOS.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIdx, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  return (
    <>
      <Head>
        <title>Galerie — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Découvrez en images les plus beaux moments créés par Wenten Événementiel — demandes en mariage, soirées, concepts et événements sur mesure à La Réunion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="section-eyebrow">Nos réalisations</div>
          <h1 className="page-hero-h1">La <em>galerie</em></h1>
          <p className="page-hero-sub">
            Des instants capturés, des émotions préservées.
            Chaque image raconte une histoire unique.
          </p>
        </section>

        <section className="section">
          <div className="container">
            <div className="galerie-masonry">
              {PHOTOS.map((src, i) => (
                <button
                  key={src}
                  className="galerie-item"
                  onClick={() => open(i)}
                  aria-label={`Voir la photo ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Wenten Événementiel — photo ${i + 1}`}
                    width={600}
                    height={800}
                    className="galerie-img"
                    sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final section-dark">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre moment unique mérite une <em>attention absolue</em>
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

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div className="lightbox" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Fermer">✕</button>

          <button
            className="lightbox-nav lightbox-nav--prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
          >
            ‹
          </button>

          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[lightboxIdx]}
              alt={`Photo ${lightboxIdx + 1}`}
              className="lightbox-img"
            />
          </div>

          <button
            className="lightbox-nav lightbox-nav--next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
          >
            ›
          </button>

          <div className="lightbox-counter">
            {lightboxIdx + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
}
