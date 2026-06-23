const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER = { name: "Wenten Événementiel", email: "contact@wenten-evenementiel.re" };

async function sendEmail(apiKey, payload) {
  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ sender: SENDER, ...payload }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo error: ${err}`);
  }
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    prenom,
    nom,
    email,
    telephone,
    date,
    prenomConjoint,
    heureContact,
    canalContact,
    message,
    scenario,
  } = req.body || {};

  if (!prenom || !nom || !email || !telephone || !date || !prenomConjoint || !scenario) {
    return res.status(400).json({ error: "Champs requis manquants." });
  }

  const apiKey = process.env.BREVO_API_KEY_WENTEN;
  if (!apiKey) {
    console.error("BREVO_API_KEY_WENTEN non définie");
    return res.status(500).json({ error: "Configuration serveur manquante." });
  }

  const dateFormatted = formatDate(date);
  const row = (label, value, alt) =>
    `<tr${alt ? ' style="background:#F4FBFA"' : ""}><td style="padding:9px 12px;font-weight:600;color:#5C7370;width:180px;font-size:13px;">${label}</td><td style="padding:9px 12px;font-size:14px;color:#16302E;">${value}</td></tr>`;

  const adminHtml = `
<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E2EFEC;">
  <div style="background:#0E8C8C;padding:24px 28px;">
    <p style="color:#fff;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 6px;">Wenten Événementiel — Nouvelle demande</p>
    <h1 style="color:#fff;font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0;">🔔 ${scenario}</h1>
  </div>
  <div style="padding:28px;">
    <table style="border-collapse:collapse;width:100%;border-radius:8px;overflow:hidden;border:1px solid #E2EFEC;">
      ${row("Scénario", `<strong>${scenario}</strong>`, false)}
      ${row("Prénom", prenom, true)}
      ${row("Nom", nom, false)}
      ${row("Email", `<a href="mailto:${email}" style="color:#0E8C8C;">${email}</a>`, true)}
      ${row("Téléphone", telephone, false)}
      ${row("Date envisagée", dateFormatted, true)}
      ${row("Prénom conjoint(e)", prenomConjoint, false)}
      ${row("Heure contact", heureContact, true)}
      ${row("Canal préféré", canalContact, false)}
      ${message ? row("Message", message.replace(/\n/g, "<br>"), true) : ""}
    </table>
    <p style="font-size:12px;color:#5C7370;margin-top:20px;">Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Indian/Reunion" })} (heure Réunion)</p>
  </div>
</div>`;

  const clientHtml = `
<div style="font-family:'Inter',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;padding:0;border-radius:16px;overflow:hidden;border:1px solid #E2EFEC;">
  <div style="background:#F4FBFA;padding:28px 32px 24px;border-bottom:1px solid #E2EFEC;">
    <p style="font-family:Georgia,serif;font-size:22px;color:#16302E;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px;">WENTEN <span style="color:#D6428E;font-style:italic;font-size:15px;letter-spacing:0.04em;">événementiel</span></p>
    <p style="font-size:11px;color:#5C7370;letter-spacing:0.08em;text-transform:uppercase;margin:0;">La Réunion · Depuis 2017</p>
  </div>
  <div style="padding:32px;">
    <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:400;color:#16302E;margin:0 0 20px;">Votre demande a bien été reçue 💌</h2>
    <p style="color:#5C7370;line-height:1.7;margin:0 0 12px;">Bonjour ${prenom},</p>
    <p style="color:#5C7370;line-height:1.7;margin:0 0 12px;">
      Nous avons bien reçu votre demande pour le scénario
      <strong style="color:#0E8C8C;">${scenario}</strong>,
      envisagé le <strong style="color:#16302E;">${dateFormatted}</strong>.
    </p>
    <p style="color:#5C7370;line-height:1.7;margin:0 0 24px;">
      Notre équipe vous recontacte très prochainement —
      de préférence <strong>${heureContact.toLowerCase()}</strong> par <strong>${canalContact}</strong>.
    </p>
    <p style="color:#5C7370;font-size:13px;line-height:1.6;margin:0;">
      À très bientôt,<br>
      <strong style="color:#16302E;">Candice &amp; l'équipe Wenten</strong>
    </p>
  </div>
  <div style="background:#F4FBFA;padding:16px 32px;border-top:1px solid #E2EFEC;">
    <p style="font-size:11px;color:#5C7370;margin:0;">
      Wenten Événementiel · <a href="mailto:contact@wenten-evenementiel.re" style="color:#0E8C8C;">contact@wenten-evenementiel.re</a>
    </p>
  </div>
</div>`;

  try {
    await sendEmail(apiKey, {
      to: [{ email: "candice@myevjfplanner.com", name: "Candice — Wenten" }],
      subject: `🔔 Nouvelle demande — ${scenario}`,
      htmlContent: adminHtml,
    });
    await sendEmail(apiKey, {
      to: [{ email, name: `${prenom} ${nom}` }],
      subject: "Votre demande a bien été reçue — Wenten Événementiel",
      htmlContent: clientHtml,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("demande-scenario:", err.message);
    return res
      .status(500)
      .json({ error: "Échec de l'envoi. Veuillez réessayer ou nous contacter directement." });
  }
}
