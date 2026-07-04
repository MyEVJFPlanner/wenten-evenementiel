import { useState } from "react";

const PLACE_ID = "ChIJK-OeryiCGBgRAnfIiBO0ae4";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

function Stars({ rating }) {
  return (
    <span className="gr-stars" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "gr-star gr-star--full" : "gr-star gr-star--empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

function Avatar({ name, photoUrl }) {
  const [imgError, setImgError] = useState(false);
  const initial = name ? name[0].toUpperCase() : "?";

  if (imgError || !photoUrl) {
    return <div className="gr-avatar gr-avatar--initial">{initial}</div>;
  }

  return (
    <img
      className="gr-avatar"
      src={photoUrl}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 200;
  const text = review.text || "";
  const truncated = text.length > MAX && !expanded;

  return (
    <div className="gr-card">
      <div className="gr-card-header">
        <Avatar name={review.author_name} photoUrl={review.profile_photo_url} />
        <div className="gr-card-meta">
          <div className="gr-author">{review.author_name}</div>
          <div className="gr-date">{review.relative_time_description}</div>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="gr-text">
        {truncated ? `${text.slice(0, MAX).trimEnd()}…` : text}
      </p>
      {text.length > MAX && (
        <button className="gr-read-more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Réduire" : "Lire plus"}
        </button>
      )}
    </div>
  );
}

export default function GoogleReviews({ data }) {
  if (!data || !data.reviews || data.reviews.length === 0) return null;

  const { rating, total, reviews } = data;

  return (
    <section className="gr-section">
      <div className="container">
        <div className="gr-header">
          <div className="section-eyebrow">Avis vérifiés Google</div>
          <h2 className="section-title">Ce que disent <em>nos clients</em></h2>

          {rating && (
            <div className="gr-global">
              <div className="gr-global-score">
                <span className="gr-global-num">{rating.toFixed(1)}</span>
                <span className="gr-global-max">/5</span>
              </div>
              <Stars rating={Math.round(rating)} />
              {total > 0 && (
                <div className="gr-global-total">{total} avis Google</div>
              )}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gr-see-all"
              >
                Voir tous les avis sur Google →
              </a>
            </div>
          )}
        </div>

        <div className="gr-grid">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
