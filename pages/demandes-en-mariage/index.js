import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../../data/scenarios";
import SiteHeader from "../../components/SiteHeader";
import SiteMeta from "../../components/SiteMeta";
import SejourMauriceSection from "../../components/SejourMauriceSection";
import SectionContact from "../../components/SectionContact";
import SiteFooter from "../../components/SiteFooter";

function getPrixLabel(s) {
  const p = s.prix;
  if (!p) return null;
  if (!isNaN(Number(p))) return `dès ${p} €`;
  return p; // "Sur devis" ou autre texte
}

export default function DemandesEnMariage() {

  return (
    <>
      <Head>
        <title>Demandes en mariage — Wenten Événementiel La Réunion</title>
        <meta
          name="description"
          content="Découvrez nos 10 scénarios de demande en mariage sur mesure à La Réunion. De l'hélicoptère au lagon de l'Île Maurice, chaque instant est unique."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="section-eyebrow">10 scénarios signature</div>
          <h1 className="page-hero-h1">Les demandes <em>en mariage</em></h1>
          <p className="page-hero-sub">
            1000+ histoires d'amour et d'événements inoubliables.<br />
            Choisissez votre scénario, nous créons le reste.
          </p>
        </section>

        {/* ── SIGNATURE 100% OUI ── */}
        <p className="demandes-signature">
          💍 Depuis 14 ans, nous accompagnons chaque demande en mariage avec la même attention — et à ce jour, toutes se sont conclues par un OUI.
        </p>

        {/* ── GRILLE DES SCÉNARIOS ── */}
        <section className="section">
          <div className="container">
            <div className="scenarios-grid scenarios-grid--full">
              {SCENARIOS.map((s) => (
                <a
                  key={s.slug}
                  href={`/demandes-en-mariage/${s.slug}`}
                  className="scenario-card"
                >
                  <div className="scenario-img-wrap">
                    <Image
                      src={s.photo}
                      alt={s.titre}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                    />
                    <span className="scenario-badge">Scénario {s.numero}</span>
                  </div>
                  <div className="scenario-body">
                    <div className="scenario-title">{s.titre}</div>
                    <div className="scenario-desc">{s.accroche}</div>
                    {getPrixLabel(s) && (
                      <div className="scenario-price">{getPrixLabel(s)}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── SÉJOUR MAURICE ── */}
        <SejourMauriceSection />

        <SectionContact
          eyebrow="Parlons de votre projet"
          titre={<>Votre moment unique<br />mérite une <em>attention absolue</em></>}
          sub="Partagez-nous votre vision. Nous créons ensemble le scénario qui vous ressemble."
          defaultType="Demande en mariage"
        />
      </main>

      <SiteFooter />
    </>
  );
}
