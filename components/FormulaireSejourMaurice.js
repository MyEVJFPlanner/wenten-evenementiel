import { useState } from "react";

const CHAMPS_REQUIS = ["prenom", "nom", "email", "telephone", "periode", "nombrePersonnes"];

const INITIAL = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  periode: "",
  nombrePersonnes: "2",
  budget: "À discuter",
  message: "",
};

export default function FormulaireSejourMaurice({ onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = CHAMPS_REQUIS.filter((k) => !form[k].trim());
    if (missing.length) {
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demande-sejour-maurice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");
      setSuccess(true);
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal-header">
          <div className="modal-eyebrow">🌴 Île Maurice · Lagoon Love</div>
          <h2 className="modal-title">Votre séjour complet</h2>
          <p className="modal-sub">
            Complétez ce formulaire et nous vous recontactons pour construire votre séjour sur mesure.
          </p>
        </div>

        {success ? (
          <div className="form-success">
            <div className="form-success-icon">✈️</div>
            <div className="form-success-title">Demande envoyée !</div>
            <p className="form-success-sub">
              Nous vous recontactons très prochainement.<br />
              Cette fenêtre va se fermer automatiquement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reservation-form" noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fs-prenom">Prénom *</label>
                <input
                  id="fs-prenom"
                  type="text"
                  required
                  value={form.prenom}
                  onChange={set("prenom")}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="form-field">
                <label htmlFor="fs-nom">Nom *</label>
                <input
                  id="fs-nom"
                  type="text"
                  required
                  value={form.nom}
                  onChange={set("nom")}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fs-email">Email *</label>
                <input
                  id="fs-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="fs-tel">Téléphone *</label>
                <input
                  id="fs-tel"
                  type="tel"
                  required
                  value={form.telephone}
                  onChange={set("telephone")}
                  placeholder="+262 692 00 00 00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fs-periode">Période souhaitée *</label>
                <input
                  id="fs-periode"
                  type="text"
                  required
                  value={form.periode}
                  onChange={set("periode")}
                  placeholder="Ex : Décembre 2026, été 2027…"
                />
              </div>
              <div className="form-field">
                <label htmlFor="fs-personnes">Nombre de personnes *</label>
                <select
                  id="fs-personnes"
                  value={form.nombrePersonnes}
                  onChange={set("nombrePersonnes")}
                >
                  {["2", "3", "4", "5", "6", "7+"].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="fs-budget">Budget approximatif (optionnel)</label>
              <select
                id="fs-budget"
                value={form.budget}
                onChange={set("budget")}
              >
                <option>À discuter</option>
                <option>Moins de 2 000 €</option>
                <option>2 000 – 4 000 €</option>
                <option>4 000 € et plus</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="fs-message">Message (optionnel)</label>
              <textarea
                id="fs-message"
                value={form.message}
                onChange={set("message")}
                placeholder="Vos souhaits, questions, détails sur votre projet…"
                rows={3}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="btn-fuchsia"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
