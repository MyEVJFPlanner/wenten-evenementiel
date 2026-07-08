const ITEMS = [
  "Réponse sous 24h",
  "Devis gratuit et sans engagement",
  "Acompte sécurisé",
  "14 ans d'expérience à La Réunion",
];

export default function LigneReassurance({ dark = false }) {
  const checkColor = dark ? "#5FD4C8" : "#0E8C8C";
  const textColor = dark ? "rgba(255,255,255,0.72)" : "#5a7070";
  const sepColor = dark ? "rgba(255,255,255,0.25)" : "rgba(14,140,140,0.25)";

  return (
    <div className="reassurance-bar">
      {ITEMS.map((item, i) => (
        <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          {i > 0 && <span style={{ color: sepColor, margin: "0 6px" }}>·</span>}
          <span style={{ color: checkColor, fontWeight: 700, fontSize: "13px" }}>✓</span>
          <span style={{ color: textColor, fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>{item}</span>
        </span>
      ))}
    </div>
  );
}
