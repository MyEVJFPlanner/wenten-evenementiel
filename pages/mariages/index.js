import Head from "next/head";
import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import SectionContact from "../../components/SectionContact";
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
  {
    slug: "vin-honneur-gourmand",
    emoji: "🍽️",
    titre: "Vin d'Honneur Gourmand — avec Matthias JOMA",
    tagline: "Un moment convivial, gourmand et soigné",
    prix: "79 € / pers. · min. 15 personnes",
    description:
      "En partenariat avec Matthias JOMA, chef à domicile, Wenten Événementiel vous propose une formule complète pour votre vin d'honneur ou votre engagement party : un buffet gourmand et raffiné, associé à notre décoration et mise en ambiance signature, pour un moment clé en main.",
    inclusSections: [
      {
        titre: "Traiteur — Matthias JOMA",
        items: [
          "3 sortes de charcuteries fines, 3 sortes de fromages affinés",
          "Variété de pains artisanaux, légumes de saison frais coupés",
          "Condiments : cornichons, olives",
          "Houmous maison au cumin & huile d'olive",
          "Rillettes de poisson fumé maison, fromage frais & moutarde à l'ancienne",
          "Tapenade maison aux olives noires & basilic frais",
          "Créolité : samoussas poulet, samoussas fromage, beignets songe (2/pers chacun)",
          "Riz chauffé",
          "Dessert : 2 mignardises / pers. (tartelette duo chocolat grand cru & ganache vanille · tartelette citron meringuée au zeste de combava)",
          "Boissons : citronnade maison au sirop de fleur de sureau · thé vert glacé à la pitaya",
          "Table de cocktail avec nappe noire",
        ],
      },
      {
        titre: "Décoration & coordination — Wenten",
        items: [
          "Décoration bohème soignée, adaptable selon le thème",
          "Mise en ambiance et installation complète",
          "Coordination sur place le jour J",
        ],
      },
    ],
    idealPour: ["Vin d'honneur", "Cérémonie laïque", "Fiançailles", "Mariage", "Événement d'entreprise"],
    gradient: "linear-gradient(135deg, #0E2016 0%, #1B5233 55%, #A8C686 100%)",
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
          <div className="section-eyebrow">Nos services mariage</div>
          <h1 className="page-hero-h1">Mariages &amp; <em>grandes occasions</em></h1>
          <p className="page-hero-sub">
            Borne photo, livre d'or audio, vins d'honneur... Wenten Événementiel
            vous accompagne pour faire de votre mariage un moment inoubliable à La Réunion.
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
                  </div>

                  {/* Contenu */}
                  <div className="mariage-card-body">
                    <div className="concept-title">{a.titre}</div>
                    <div className="mariage-card-tagline">{a.tagline}</div>
                    {a.prix && (
                      <div className="mariage-card-prix">{a.prix}</div>
                    )}
                    <p className="detail-desc-text" style={{ marginBottom: "24px" }}>
                      {a.description}
                    </p>

                    {a.inclusSections ? (
                      a.inclusSections.map((section) => (
                        <div key={section.titre}>
                          <div className="inclus-header">{section.titre}</div>
                          <ul className="inclus-list" style={{ marginBottom: "20px" }}>
                            {section.items.map((item) => (
                              <li key={item} className="inclus-item">
                                <span className="inclus-check">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="inclus-header">Ce qui est inclus</div>
                        <ul className="inclus-list" style={{ marginBottom: "20px" }}>
                          {a.inclus.map((item) => (
                            <li key={item} className="inclus-item">
                              <span className="inclus-check">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="inclus-header">Idéal pour</div>
                    <div className="ideal-pour-tags" style={{ marginBottom: "24px" }}>
                      {a.idealPour.map((tag) => (
                        <span key={tag} className="ideal-pour-tag">{tag}</span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="btn-fuchsia"
                      style={{ display: "inline-block", fontSize: "14px", padding: "12px 24px" }}
                    >
                      Demander un devis →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionContact
          eyebrow="Votre mariage sur mesure"
          titre={<>Parlons de votre <em>grand jour</em></>}
          sub="Partagez-nous votre vision. Nous créons ensemble le mariage qui vous ressemble, sur mesure, à La Réunion."
        />
      </main>

      <SiteFooter />
    </>
  );
}
