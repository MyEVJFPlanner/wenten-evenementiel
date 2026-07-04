import { useState } from "react";
import { avisGoogle } from "../data/avis";

function Stars({ note }) {
  return (
    <span className="gr-stars" aria-label={`${note} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= note ? "gr-star gr-star--full" : "gr-star gr-star--empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

function AvisCard({ avis }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 200;
  const truncated = avis.texte.length > MAX && !expanded;

  return (
    <div className="gr-card">
      <div className="gr-card-header">
        <div className="gr-avatar gr-avatar--initial" style={{ background: avis.couleur }}>
          {avis.initiale}
        </div>
        <div className="gr-card-meta">
          <div className="gr-author">{avis.prenom}</div>
          <div className="gr-date">{avis.date}</div>
        </div>
        <Stars note={avis.note} />
      </div>
      <p className="gr-text">
        {truncated ? `${avis.texte.slice(0, MAX).trimEnd()}…` : avis.texte}
      </p>
      {avis.texte.length > MAX && (
        <button className="gr-read-more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Réduire" : "Lire plus"}
        </button>
      )}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="gr-section">
      <div className="container">
        <div className="gr-header">
          <div className="section-eyebrow">Avis vérifiés Google</div>
          <h2 className="section-title">Ce que disent <em>nos clients</em></h2>

          <div className="gr-global">
            <div className="gr-global-score">
              <span className="gr-global-num">{avisGoogle.note.toFixed(1)}</span>
              <span className="gr-global-max">/5</span>
            </div>
            <Stars note={Math.round(avisGoogle.note)} />
            <div className="gr-global-total">{avisGoogle.total} avis Google</div>
            <a
              href={avisGoogle.lienGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className="gr-see-all"
            >
              Voir tous nos avis sur Google →
            </a>
          </div>
        </div>

        <div className="gr-grid">
          {avisGoogle.avis.map((a) => (
            <AvisCard key={a.prenom} avis={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
