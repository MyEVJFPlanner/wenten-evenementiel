import Head from "next/head";
import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import SiteFooter from "../../components/SiteFooter";

const ANNONCES = [
  {
    slug: "borne-photo",
    emoji: "📸",
    titre: "Borne Photo Illimitée",
    tagline: "Des souvenirs instantanés pour tous vos invités",
    description:
      "Ajoutez une touche fun et mémorable à votre mariage avec notre borne photo en location. Vos invités peuvent se prendre en photo à volonté, seuls ou à plusieurs, avec ou sans accessoires, pendant tout le vin d'honneur ou la soirée. Chacun repart avec un souvenir immédiat, et vous gardez toutes les photos à la fin de l'événement.",
    inclus: [
      "Installation complète",
      "Photos illimitées",
      "Accessoires photo",
      "Impressions instantanées (selon formule)",
      "Remise des photos en fin de prestation",
    ],
    idealPour: ["Vin d'honneur", "Soirée de mariage", "Anniversaire", "Événement d'entreprise"],
    photo: "/images/mariages/borne-photo.jpg",
  },
  {
    slug: "livre-or-audio",
    emoji: "🎙️",
    titre: "Livre d'Or Audio en location",
    tagline: "Les voix de vos proches, pour toujours",
    description:
      "Plus original qu'un livre d'or classique, le livre d'or audio permet à vos invités d'enregistrer un message vocal plutôt que de l'écrire. Installé dès le vin d'honneur, il capture les voix et les rires de la journée, pour un souvenir que vous pourrez réécouter indéfiniment.",
    inclus: [
      "Location du dispositif",
      "Installation et mise en service",
      "Messagerie personnalisée",
      "Autonomie longue durée",
      "Récupération des enregistrements",
    ],
    idealPour: ["Vin d'honneur", "Mariage", "Anniversaire", "Départ en retraite"],
    photo: "/images/mariages/livre-or-audio.jpg",
  },
  {
    slug: "vins-dhonneur",
    emoji: "🥂",
    titre: "Vins d'Honneur",
    tagline: "Un moment convivial, orchestré avec soin",
    description:
      "Le vin d'honneur est ce premier temps fort après la cérémonie, où vos invités se retrouvent autour d'un verre pour célébrer votre union. Wenten Événementiel vous accompagne dans l'organisation complète de ce moment : mise en ambiance, animations, coordination avec vos prestataires pour un vin d'honneur fluide et à votre image.",
    inclus: [
      "Conseil et organisation personnalisée",
      "Coordination avec vos prestataires",
      "Mise en ambiance et animations sur demande",
      "Présence sur place",
    ],
    idealPour: ["Mariage", "Cérémonie laïque", "Fiançailles"],
    gradient: "linear-gradient(135deg, #3a2010 0%, #C4781A 60%, #E8A84A 100%)",
  },
];

export default function Mariages() {
  return (
    <>
      <Head>
        <title>Mariages — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Borne photo, livre d'or audio, vin d'honneur... Wenten Événementiel vous accompagne pour faire de votre mariage un moment inoubliable à La Réunion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="section-eyebrow">Bientôt disponible</div>
          <h1 className="page-hero-h1">Mariages &amp; <em>grandes occasions</em></h1>
          <p className="page-hero-sub">
            Borne photo, livre d'or audio, vins d'honneur... De nouveaux services
            dédiés au mariage arrivent bientôt. Contactez-nous dès maintenant pour
            être les premiers informés.
          </p>
        </section>

        {/* ── GRILLE DES ANNONCES ── */}
        <section className="section">
          <div className="container">
            <div className="mariages-grid">
              {ANNONCES.map((a) => (
                <div key={a.slug} className="mariage-card">
                  {/* Zone visuelle */}
                  <div
                    className="mariage-card-visual"
                    style={a.photo ? {} : { background: a.gradient }}
                  >
                    {a.photo ? (
                      <Image
                        src={a.photo}
                        alt={a.titre}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        sizes="(max-width: 900px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="mariage-card-emoji">{a.emoji}</span>
                    )}
                    <span className="mariage-soon-badge">Bientôt disponible</span>
                  </div>

                  {/* Contenu */}
                  <div className="mariage-card-body">
                    <div className="concept-title">{a.titre}</div>
                    <div className="mariage-card-tagline">{a.tagline}</div>
                    <p className="detail-desc-text" style={{ marginBottom: "24px" }}>
                      {a.description}
                    </p>

                    <div className="inclus-header">Ce qui est inclus</div>
                    <ul className="inclus-list" style={{ marginBottom: "20px" }}>
                      {a.inclus.map((item) => (
                        <li key={item} className="inclus-item">
                          <span className="inclus-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="inclus-header">Idéal pour</div>
                    <div className="ideal-pour-tags" style={{ marginBottom: "8px" }}>
                      {a.idealPour.map((tag) => (
                        <span key={tag} className="ideal-pour-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark">
          <div className="cta-final-eyebrow">Votre mariage sur mesure</div>
          <h2 className="cta-final-title">
            Parlons de votre <em>grand jour</em>
          </h2>
          <p className="cta-final-sub">
            Ces services arrivent bientôt. En attendant, contactez-nous pour
            discuter de votre projet — nous trouverons ensemble la meilleure
            formule pour votre mariage.
          </p>
          <a href="mailto:info@wentenevenementielreunion.com" className="btn-fuchsia">
            Nous contacter →
          </a>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
