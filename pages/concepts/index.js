import Head from "next/head";
import Image from "next/image";
import { concepts } from "../../data/concepts";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import SectionContact from "../../components/SectionContact";
import SiteFooter from "../../components/SiteFooter";

function getPrixLabel(c) {
  if (c.prix) return `dès ${c.prix} €${c.prixUnite || ""}${c.minPersonnes ? ` · ${c.minPersonnes} pers. min.` : ""}`;
  if (c.packs) {
    const min = Math.min(...c.packs.map((p) => parseInt(p.prixLivraison, 10)));
    return `dès ${min} €`;
  }
  return "Sur devis";
}

export default function ConceptsIndex() {
  return (
    <>
      <Head>
        <title>Nos concepts événementiels — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Guinguette Bohème, Cinétoilé, Vintage & Vinyles... Des concepts clés en main pour anniversaires, soirées et événements d'entreprise à La Réunion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="section-eyebrow">{concepts.length} concepts clés en main</div>
          <h1 className="page-hero-h1">Nos <em>concepts</em> événementiels</h1>
          <p className="page-hero-sub">
            Guinguette bohème, cinéma en plein air, soirée vintage...
            chaque concept est pensé pour créer des souvenirs uniques,
            pour tous types d'événements.
          </p>
        </section>

        <section className="section">
          <div className="container">
            <div className="concepts-grid">
              {concepts.map((c) => (
                <a key={c.slug} href={`/concepts/${c.slug}`} className="concept-card">
                  <div
                    className="concept-img-wrap"
                    style={!c.photo ? { background: c.gradient } : {}}
                  >
                    {c.photo && (
                      <Image
                        src={c.photo}
                        alt={c.titre}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      />
                    )}
                    <span
                      className="concept-emoji-badge"
                      style={!c.photo ? { fontSize: "3rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } : {}}
                    >
                      {c.emoji}
                    </span>
                  </div>
                  <div className="concept-body">
                    <div className="concept-title">{c.titre}</div>
                    <div className="concept-desc">{c.accroche}</div>
                    <div className="concept-price">{getPrixLabel(c)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <SectionContact
          eyebrow="Votre événement sur mesure"
          titre={<>Un concept, une <em>vision unique</em></>}
          sub="Chaque détail est pensé pour vous. Parlez-nous de votre projet et nous créons ensemble l'événement qui vous ressemble."
        />
      </main>

      <SiteFooter />
    </>
  );
}
