import { useState } from "react";

const CHAMPS_REQUIS = ["prenom", "nom", "email", "telephone", "date", "prenomConjoint"];

const INITIAL = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  date: "",
  prenomConjoint: "",
  heureContact: "Matin",
  canalContact: "Téléphone",
  message: "",
};

export default function FormulaireReservation({ scenario, onClose }) {
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
      const res = await fetch("/api/demande-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, scenario: scenario.titre }),
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
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-eyebrow">Scénario {scenario.numero}</div>
          <h2 className="modal-title">{scenario.titre}</h2>
          <p className="modal-sub">
            Complétez ce formulaire et nous vous recontactons très rapidement.
          </p>
        </div>

        {success ? (
          <div className="form-success">
            <div className="form-success-icon">💌</div>
            <div className="form-success-title">Demande envoyée !</div>
            <p className="form-success-sub">
              Nous vous recontactons très bientôt.<br />
              Cette fenêtre va se fermer automatiquement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reservation-form" noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="f-prenom">Prénom *</label>
                <input
                  id="f-prenom"
                  type="text"
                  required
                  value={form.prenom}
                  onChange={set("prenom")}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="form-field">
                <label htmlFor="f-nom">Nom *</label>
                <input
                  id="f-nom"
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
                <label htmlFor="f-email">Email *</label>
                <input
                  id="f-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="f-tel">Téléphone *</label>
                <input
                  id="f-tel"
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
                <label htmlFor="f-date">Date envisagée *</label>
                <input
                  id="f-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={set("date")}
                />
              </div>
              <div className="form-field">
                <label htmlFor="f-conjoint">Prénom de votre conjoint(e) *</label>
                <input
                  id="f-conjoint"
                  type="text"
                  required
                  value={form.prenomConjoint}
                  onChange={set("prenomConjoint")}
                  placeholder="Son prénom"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="f-heure">Heure pour vous contacter</label>
                <select
                  id="f-heure"
                  value={form.heureContact}
                  onChange={set("heureContact")}
                >
                  <option>Matin</option>
                  <option>Après-midi</option>
                  <option>Soirée</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="f-canal">Canal préféré</label>
                <select
                  id="f-canal"
                  value={form.canalContact}
                  onChange={set("canalContact")}
                >
                  <option>Téléphone</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-message">Message (optionnel)</label>
              <textarea
                id="f-message"
                value={form.message}
                onChange={set("message")}
                placeholder="Vos souhaits particuliers, questions, contexte..."
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
