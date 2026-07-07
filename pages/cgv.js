import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import SiteFooter from "../components/SiteFooter";

const ARTICLES = [
  { id: "art1",  num: "1",  titre: "Objet et champ d'application" },
  { id: "art2",  num: "2",  titre: "Identification du Prestataire" },
  { id: "art3",  num: "3",  titre: "Devis et commande" },
  { id: "art4",  num: "4",  titre: "Tarifs et modalités de paiement" },
  { id: "art5",  num: "5",  titre: "Annulation et report" },
  { id: "art6",  num: "6",  titre: "Obligations du Client" },
  { id: "art7",  num: "7",  titre: "Obligations et responsabilité du Prestataire" },
  { id: "art8",  num: "8",  titre: "Force majeure" },
  { id: "art9",  num: "9",  titre: "Droit à l'image" },
  { id: "art10", num: "10", titre: "Réclamations" },
  { id: "art11", num: "11", titre: "Protection des données personnelles" },
  { id: "art12", num: "12", titre: "Droit applicable et litiges" },
];

export default function CGV() {
  return (
    <>
      <Head>
        <title>Conditions Générales de Vente — Wenten Événementiel La Réunion</title>
        <meta name="description" content="Conditions Générales de Vente de Wenten Événementiel Réunion (SARL Ninja Presta). En vigueur au 07/07/2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="section-eyebrow">Documents contractuels</div>
          <h1 className="page-hero-h1">Conditions Générales <em>de Vente</em></h1>
          <p className="page-hero-sub">En vigueur au 07/07/2026 · SARL Ninja Presta — Wenten Événementiel Réunion</p>
        </section>

        <div className="cgv-layout">
          {/* ── SOMMAIRE ── */}
          <aside className="cgv-sommaire">
            <div className="cgv-sommaire-title">Sommaire</div>
            <nav>
              {ARTICLES.map((a) => (
                <a key={a.id} href={`#${a.id}`} className="cgv-sommaire-link">
                  <span className="cgv-sommaire-num">Art. {a.num}</span>
                  {a.titre}
                </a>
              ))}
            </nav>
          </aside>

          {/* ── CONTENU ── */}
          <div className="cgv-content">

            <article id="art1" className="cgv-article">
              <h2 className="cgv-h2">Article 1 — Objet et champ d'application</h2>
              <p>Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre la société SARL Ninja Presta, exploitant la marque commerciale Wenten Événementiel Réunion (ci-après « le Prestataire »), et toute personne physique ou morale (ci-après « le Client ») souhaitant faire appel à ses services d'organisation d'événements : demandes en mariage, cérémonies laïques, événements d'entreprise, séminaires, et prestations événementielles associées.</p>
              <p>Toute commande de prestation implique l'acceptation sans réserve des présentes CGV par le Client, qui reconnaît en avoir pris connaissance préalablement à la signature du devis.</p>
            </article>

            <article id="art2" className="cgv-article">
              <h2 className="cgv-h2">Article 2 — Identification du Prestataire</h2>
              <div className="cgv-identite">
                <p><strong>SARL Ninja Presta</strong></p>
                <p>Siège social : 8 Ruelle Boulot, 97400 Saint-Denis, La Réunion</p>
                <p>SIRET : 942 669 623 00012</p>
                <p>Marque commerciale : Wenten Événementiel Réunion</p>
              </div>
            </article>

            <article id="art3" className="cgv-article">
              <h2 className="cgv-h2">Article 3 — Devis et commande</h2>
              <p>Toute prestation fait l'objet d'un devis personnalisé, établi sur la base des informations transmises par le Client (date, lieu, nombre de participants, prestations souhaitées). Ce devis est valable 30 jours à compter de sa date d'émission, sauf mention contraire.</p>
              <p>La commande est considérée comme ferme et définitive à réception :</p>
              <ul className="cgv-list">
                <li>du devis signé par le Client, portant la mention « bon pour accord » ;</li>
                <li>et du versement de l'acompte prévu à l'article 4.</li>
              </ul>
              <p>Toute modification de la prestation demandée après validation du devis (changement de date, de lieu, d'effectif, ajout d'options) fera l'objet d'un avenant et pourra entraîner une révision du tarif.</p>
            </article>

            <article id="art4" className="cgv-article">
              <h2 className="cgv-h2">Article 4 — Tarifs et modalités de paiement</h2>
              <p>Les tarifs applicables sont ceux indiqués sur le devis accepté par le Client, exprimés en euros, toutes taxes comprises (TTC) sauf mention contraire.</p>
              <p>Le règlement s'effectue selon l'échéancier suivant, sauf accord particulier mentionné au devis :</p>
              <ul className="cgv-list">
                <li>Un acompte de <strong>50 % du montant total</strong> est exigé à la réservation, pour valider la prestation ;</li>
                <li>Le solde est exigible au plus tard <strong>7 jours avant la date de l'événement</strong>, sauf accord écrit contraire.</li>
              </ul>
              <p>Les moyens de paiement acceptés sont : virement bancaire, carte bancaire, ou tout autre moyen précisé sur le devis.</p>
              <p>Tout retard de paiement pourra entraîner la suspension de la prestation, sans préjudice de toute autre voie d'action.</p>
            </article>

            <article id="art5" className="cgv-article">
              <h2 className="cgv-h2">Article 5 — Annulation et report</h2>

              <h3 className="cgv-h3">5.1 Annulation à l'initiative du Client</h3>
              <p>En cas d'annulation par le Client, les sommes versées sont conservées par le Prestataire selon le barème suivant, calculé à compter de la date d'annulation notifiée par écrit :</p>
              <ul className="cgv-list">
                <li><strong>Annulation à plus de 30 jours</strong> avant la date de l'événement : l'acompte reste acquis au Prestataire ;</li>
                <li><strong>Annulation entre 30 et 15 jours</strong> avant la date de l'événement : 50 % du montant total de la prestation reste dû ;</li>
                <li><strong>Annulation à moins de 15 jours</strong> avant la date de l'événement : 100 % du montant total de la prestation reste dû.</li>
              </ul>

              <h3 className="cgv-h3">5.2 Report</h3>
              <p>Toute demande de report de date doit être formulée par écrit au moins 15 jours avant la date initialement prévue, et reste soumise à la disponibilité du Prestataire. Un report accepté ne donne lieu à aucun frais supplémentaire, sous réserve que la nouvelle date soit fixée dans un délai de 6 mois.</p>

              <h3 className="cgv-h3">5.3 Annulation à l'initiative du Prestataire</h3>
              <p>En cas d'annulation par le Prestataire pour un motif qui lui est propre (hors cas de force majeure), les sommes déjà versées par le Client seront intégralement remboursées, sans préjudice d'une indemnisation complémentaire si un préjudice avéré est démontré.</p>
            </article>

            <article id="art6" className="cgv-article">
              <h2 className="cgv-h2">Article 6 — Obligations du Client</h2>
              <p>Le Client s'engage à :</p>
              <ul className="cgv-list">
                <li>fournir des informations exactes et complètes nécessaires à la bonne organisation de l'événement ;</li>
                <li>s'assurer, le cas échéant, des autorisations nécessaires à l'occupation du lieu choisi (domaine public, propriété privée, plage, etc.), sauf si cette démarche est explicitement prise en charge par le Prestataire selon le devis ;</li>
                <li>garantir l'accès au lieu de la prestation dans des conditions permettant l'installation prévue ;</li>
                <li>régler les sommes dues dans les délais convenus.</li>
              </ul>
            </article>

            <article id="art7" className="cgv-article">
              <h2 className="cgv-h2">Article 7 — Obligations et responsabilité du Prestataire</h2>
              <p>Le Prestataire s'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution de la prestation commandée, dans le respect des délais et modalités convenus avec le Client.</p>
              <p>La responsabilité du Prestataire ne saurait être engagée en cas de mauvaise exécution ou d'inexécution résultant :</p>
              <ul className="cgv-list">
                <li>d'un cas de force majeure (voir article 8) ;</li>
                <li>d'un fait imputable au Client (informations erronées, accès refusé au lieu, etc.) ;</li>
                <li>du fait d'un tiers extérieur à la prestation (prestataires tiers non mandatés par Wenten Événementiel Réunion, conditions météorologiques, etc.).</li>
              </ul>
              <p>Le Prestataire ne saurait être tenu responsable des dommages matériels causés par les convives ou invités du Client sur le matériel loué ou installé.</p>
            </article>

            <article id="art8" className="cgv-article">
              <h2 className="cgv-h2">Article 8 — Force majeure</h2>
              <p>Aucune des parties ne pourra être tenue responsable de l'inexécution de ses obligations en cas de force majeure, telle que définie par la jurisprudence française (catastrophe naturelle, événement climatique majeur, décision administrative, épidémie, etc.). Dans un tel cas, les parties conviendront de bonne foi d'un report de la prestation ou d'un remboursement partiel, selon les sommes effectivement engagées par le Prestataire à la date de l'événement empêché.</p>
            </article>

            <article id="art9" className="cgv-article">
              <h2 className="cgv-h2">Article 9 — Droit à l'image</h2>
              <p>Sauf opposition écrite et expresse du Client avant la date de l'événement, le Prestataire se réserve le droit de photographier ou filmer les installations et prestations réalisées, à des fins de communication (site internet, réseaux sociaux, supports commerciaux), à l'exclusion de toute image permettant d'identifier clairement les invités sans leur consentement.</p>
            </article>

            <article id="art10" className="cgv-article">
              <h2 className="cgv-h2">Article 10 — Réclamations</h2>
              <p>Toute réclamation relative à l'exécution de la prestation doit être adressée par écrit au Prestataire dans un délai de <strong>8 jours</strong> suivant la date de l'événement, à l'adresse du siège social ou par email, accompagnée de tout élément permettant d'instruire la demande.</p>
            </article>

            <article id="art11" className="cgv-article">
              <h2 className="cgv-h2">Article 11 — Protection des données personnelles</h2>
              <p>Les données personnelles collectées dans le cadre de la relation commerciale (identité, coordonnées, informations relatives à l'événement) sont traitées par le Prestataire dans le respect du Règlement Général sur la Protection des Données (RGPD). Elles sont utilisées exclusivement pour la bonne exécution de la prestation et la gestion de la relation client, et ne sont en aucun cas cédées à des tiers à des fins commerciales sans consentement préalable.</p>
              <p>Conformément à la réglementation en vigueur, le Client dispose d'un droit d'accès, de rectification, d'opposition et de suppression des données le concernant, qu'il peut exercer en contactant le Prestataire.</p>
            </article>

            <article id="art12" className="cgv-article">
              <h2 className="cgv-h2">Article 12 — Droit applicable et litiges</h2>
              <p>Les présentes CGV sont soumises au droit français. En cas de litige relatif à leur interprétation ou leur exécution, et à défaut de résolution amiable, les tribunaux compétents de La Réunion seront seuls compétents, sauf disposition légale impérative contraire.</p>
            </article>

            {/* ── CONTACT ── */}
            <div className="cgv-contact">
              <div className="cgv-contact-title">Contact</div>
              <p>Pour toute question relative aux présentes CGV, vous pouvez contacter Wenten Événementiel Réunion :</p>
              <ul className="cgv-list">
                <li>Adresse : 8 Ruelle Boulot, 97400 Saint-Denis, La Réunion</li>
                <li>Email : <a href="mailto:info@wentenevenementielreunion.com">info@wentenevenementielreunion.com</a></li>
                <li>Site : <a href="https://www.wentenevenementielreunion.com">www.wentenevenementielreunion.com</a></li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
