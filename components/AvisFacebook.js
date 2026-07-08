const AVIS = [
  {
    texte: "Top confiance et organisation. Je recommande.",
    auteur: "Meg Marde",
    initiale: "M",
    couleur: "#D6428E",
  },
  {
    texte: "J'ai fait appel à Wenten Événementiel Réunion depuis la métropole pour une demande en fiançailles à la Réunion. Candice a été depuis le début de nos échanges toujours à l'écoute, réactive et a su comprendre mes besoins et mes attentes pour réaliser une super prestation le jour J. Je la recommande vivement pour ce type de prestation, elle a réussi à rendre ce moment magique.",
    auteur: "Raphael Muratyan",
    initiale: "R",
    couleur: "#5B7FA6",
  },
];

export default function AvisFacebook() {
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
        <div className="avis-fb-grid">
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
      </div>
    </section>
  );
}
