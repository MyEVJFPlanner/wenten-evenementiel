import { useState } from "react";
import LigneReassurance from "./LigneReassurance";

const TYPES = [
  "Demande en mariage",
  "Guinguette Bohème",
  "Pack Cinétoilé",
  "Pyjama Party",
  "Pack Vintage & Vinyles",
  "Beach Brunch",
  "Borne Photo Illimitée",
  "Livre d'Or Audio en location",
  "Vins d'Honneur",
  "Vin d'Honneur Gourmand — Matthias JOMA",
  "Mariage — Accompagnement complet",
  "Séjour Île Maurice",
  "Événement d'entreprise / Séminaire",
  "Autre",
];

const INITIAL = { nom: "", email: "", telephone: "", typeEvenement: "", date: "", message: "" };

export default function SectionContact({ eyebrow, titre, sub, defaultType }) {
  const [form, setForm] = useState({ ...INITIAL, typeEvenement: defaultType || "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.telephone || !form.typeEvenement) {
      setError("Merci de remplir tous les champs obligatoires (*).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demande-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-contact section-dark" id="contact">
      <div className="section-contact-inner">

        {/* ── Colonne gauche ── */}
        <div className="section-contact-left">
          <div className="cta-final-eyebrow" style={{ textAlign: "left" }}>
            {eyebrow || "Parlons de votre projet"}
          </div>
          <h2 className="cta-final-title" style={{ textAlign: "left", marginBottom: "16px" }}>
            {titre || (
              <>Votre moment unique<br />mérite une <em>attention absolue</em></>
            )}
          </h2>
          {sub && (
            <p className="cta-final-sub" style={{ textAlign: "left", margin: "0 0 28px" }}>
              {sub}
            </p>
          )}
          <LigneReassurance dark />
        </div>

        {/* ── Colonne droite : formulaire ── */}
        <div className="section-contact-right">
          {success ? (
            <div className="sc-success">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>💌</div>
              <div className="sc-success-title">Demande envoyée !</div>
              <p className="sc-success-sub">
                Nous vous recontactons sous 24h.<br />
                Un email de confirmation vient de vous être envoyé.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="sc-nom">Nom *</label>
                  <input id="sc-nom" type="text" required value={form.nom} onChange={set("nom")} placeholder="Votre nom" />
                </div>
                <div className="form-field">
                  <label htmlFor="sc-email">Email *</label>
                  <input id="sc-email" type="email" required value={form.email} onChange={set("email")} placeholder="votre@email.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="sc-tel">Téléphone *</label>
                  <input id="sc-tel" type="tel" required value={form.telephone} onChange={set("telephone")} placeholder="+262 692 00 00 00" />
                </div>
                <div className="form-field">
                  <label htmlFor="sc-type">Type d'événement *</label>
                  <select id="sc-type" required value={form.typeEvenement} onChange={set("typeEvenement")}>
                    <option value="">Choisir...</option>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="sc-date">Date souhaitée</label>
                <input id="sc-date" type="date" value={form.date} onChange={set("date")} />
              </div>

              <div className="form-field">
                <label htmlFor="sc-msg">Message</label>
                <textarea id="sc-msg" value={form.message} onChange={set("message")} rows={3} placeholder="Décrivez votre projet, vos questions..." />
              </div>

              {error && (
                <p className="form-error" style={{ marginBottom: "12px" }}>
                  ⚠️ {error}
                </p>
              )}

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
    </section>
  );
}
