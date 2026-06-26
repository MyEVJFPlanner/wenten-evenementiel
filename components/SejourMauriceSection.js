import { useState, useEffect } from "react";
import Image from "next/image";
import FormulaireSejourMaurice from "./FormulaireSejourMaurice";

export default function SejourMauriceSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <section className="maurice-hero-section">
        <div className="maurice-hero-bg">
          <Image
            src="/images/maurice-plage.jpg"
            alt="Demande en mariage à l'Île Maurice"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />
          <div className="maurice-hero-overlay" />
        </div>
        <div className="maurice-hero-content">
          <div className="section-eyebrow" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.14em" }}>
            Formule exclusive
          </div>
          <h2 className="maurice-hero-title">🌴 Votre week-end complet à l'Île Maurice</h2>
          <p className="maurice-hero-text">
            Organisez votre week-end de demande en mariage à l'Île Maurice, en formule tout compris&nbsp;! Grâce à notre partenariat rapproché avec une agence de voyage partenaire, nous pouvons inclure vols, hébergement et l'un de nos scénarios magiques.
          </p>
          <div className="maurice-hero-items">
            <div className="maurice-hero-item">
              <span className="maurice-hero-item-icon">✈️</span>
              <span className="maurice-hero-item-label">Vol aller-retour</span>
            </div>
            <div className="maurice-hero-item">
              <span className="maurice-hero-item-icon">🏨</span>
              <span className="maurice-hero-item-label">Hébergement</span>
            </div>
            <div className="maurice-hero-item">
              <span className="maurice-hero-item-icon">💍</span>
              <span className="maurice-hero-item-label">Scénario sur mesure</span>
            </div>
          </div>
          <button className="btn-fuchsia" onClick={() => setOpen(true)}>
            Demander ce séjour →
          </button>
        </div>
      </section>

      {open && <FormulaireSejourMaurice onClose={() => setOpen(false)} />}
    </>
  );
}
