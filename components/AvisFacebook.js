import { useRef } from "react";

const AVIS = [
  {
    texte: "Top confiance et organisation. Je recommande.",
    auteur: "Meg Marde",
    initiale: "M",
    couleur: "#D6428E",
  },
  {
    texte: "J'ai fait appel à Wenten Événementiel Réunion depuis la métropole pour une demande en fiançailles à la Réunion. Candice a été depuis le début de nos échanges toujours à l'écoute, réactive et a su comprendre mes besoins et mes attentes pour réaliser une super prestation le jour J.",
    auteur: "Raphael Muratyan",
    initiale: "R",
    couleur: "#5B7FA6",
  },
  {
    texte: "Nous sommes passés par Wenten pour organiser un enterrement de vie de garçons à Maurice, tout était incroyable ! Merci à Candice pour son professionnalisme et sa disponibilité.",
    auteur: "Romain, Valtao Activities",
    initiale: "R",
    couleur: "#0E8C8C",
  },
  {
    texte: "Agence très pro et réactive, des packs aussi originaux les uns que les autres !",
    auteur: "Angel's Coiffure",
    initiale: "A",
    couleur: "#C4781A",
  },
  {
    texte: "Je recommande fortement, super animation et souvenir pour mes invités, tout le monde a adoré le photo box.",
    auteur: "Elodie Niamdila",
    initiale: "E",
    couleur: "#8B6BB1",
  },
  {
    texte: "Super service, à l'écoute, je recommande vivement pour toutes celles qui souhaitent passer un EVJF au top !",
    auteur: "Missy Work",
    initiale: "M",
    couleur: "#B03478",
  },
];

export default function AvisFacebook() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".avis-fb-card")?.offsetWidth || 300;
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="avis-fb-section">
      <div className="container">
        <div className="avis-fb-header">
          <div className="section-eyebrow">Avis clients Facebook</div>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Ils nous font <em>confiance</em>
          </h2>
          <div className="avis-fb-stat">
            <span className="avis-fb-stat-num">96%</span>
            <span className="avis-fb-stat-sep">·</span>
            <span className="avis-fb-stat-label">de recommandation sur 33 avis Facebook</span>
          </div>
        </div>

        <div className="avis-fb-carousel-wrap">
          <button
            className="avis-fb-nav avis-fb-nav--prev"
            onClick={() => scroll(-1)}
            aria-label="Avis précédent"
          >
            ‹
          </button>

          <div className="avis-fb-carousel" ref={scrollRef}>
            {AVIS.map((a) => (
              <div key={a.auteur} className="avis-fb-card">
                <div className="avis-fb-stars">★★★★★</div>
                <p className="avis-fb-texte">"{a.texte}"</p>
                <div className="avis-fb-footer">
                  <div className="avis-fb-avatar" style={{ background: a.couleur }}>
                    {a.initiale}
                  </div>
                  <span className="avis-fb-auteur">— {a.auteur}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="avis-fb-nav avis-fb-nav--next"
            onClick={() => scroll(1)}
            aria-label="Avis suivant"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
