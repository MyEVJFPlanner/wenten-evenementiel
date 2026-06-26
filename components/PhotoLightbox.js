import { useState, useEffect, useCallback, useRef } from "react";

export default function PhotoLightbox({ photos, startIndex = 0, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const touchX = useRef(null);

  const items = photos.map((p) =>
    typeof p === "string" ? { src: p, type: "image" } : p
  );
  const current = items[idx];
  const total = items.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = saved; };
  }, []);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchX.current = null;
  };

  return (
    <div
      className="plb-overlay"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="plb-close" onClick={onClose} aria-label="Fermer">✕</button>

      {total > 1 && (
        <span className="plb-counter">{idx + 1} / {total}</span>
      )}

      {total > 1 && (
        <button
          className="plb-nav plb-nav--prev"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Photo précédente"
        >
          ‹
        </button>
      )}

      <div className="plb-inner" onClick={(e) => e.stopPropagation()}>
        {current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            controls
            autoPlay
            className="plb-media"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.src}
            src={current.src}
            alt=""
            className="plb-media"
          />
        )}
      </div>

      {total > 1 && (
        <button
          className="plb-nav plb-nav--next"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Photo suivante"
        >
          ›
        </button>
      )}
    </div>
  );
}
