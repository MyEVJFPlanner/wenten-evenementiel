import { useState } from "react";

const FAQ = [
  {
    q: "Combien de temps à l'avance dois-je réserver ?",
    r: "Nous recommandons de nous contacter au moins 3 à 4 semaines avant votre événement, mais n'hésitez pas à nous solliciter même pour un projet plus proche : nous ferons notre possible pour vous accompagner.",
  },
  {
    q: "Que se passe-t-il en cas d'imprévu (météo, empêchement) ?",
    r: "Nous nous adaptons autant que possible : report de date, changement de lieu selon la météo. Consultez nos CGV pour le détail des modalités.",
  },
  {
    q: "Comment se passe le paiement ?",
    r: "Un acompte de 50% à la réservation, le solde avant l'événement. Paiement sécurisé en ligne, en une fois.",
  },
  {
    q: "Le devis m'engage-t-il ?",
    r: "Non, la demande de devis est gratuite et sans engagement. Vous ne validez votre réservation qu'en signant et en réglant l'acompte.",
  },
];

export default function FaqAccordeon() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-inner">
          <div className="section-eyebrow">On répond à vos questions</div>
          <h2 className="section-title" style={{ marginBottom: "32px" }}>
            Questions <em>fréquentes</em>
          </h2>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div key={i} className={`faq-item${open === i ? " faq-item--open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className="faq-chevron">{open === i ? "−" : "+"}</span>
                </button>
                <div className="faq-a-wrap" style={{ display: open === i ? "block" : "none" }}>
                  <p className="faq-a">{item.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
