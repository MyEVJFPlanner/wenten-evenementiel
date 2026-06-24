import Head from "next/head";
import { mentionsLegales } from "../data/mentions-legales";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import SiteFooter from "../components/SiteFooter";

export default function MentionsLegales() {
  const sections = Object.values(mentionsLegales);

  return (
    <>
      <Head>
        <title>Mentions légales — Wenten Événementiel La Réunion</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="section-eyebrow">Informations légales</div>
          <h1 className="page-hero-h1">Mentions <em>légales</em></h1>
        </section>

        <section className="section">
          <div className="container">
            <div className="mentions-body">
              {sections.map((s) => (
                <div key={s.titre} className="mentions-section">
                  <h2 className="mentions-titre">{s.titre}</h2>
                  <div className="mentions-contenu">
                    {s.contenu.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
