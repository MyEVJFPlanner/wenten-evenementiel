import Head from "next/head";
import Image from "next/image";
import { SCENARIOS } from "../data/scenarios";
import SiteHeader from "../components/SiteHeader";
import SiteMeta from "../components/SiteMeta";
import EquipeSection from "../components/EquipeSection";
import SejourMauriceSection from "../components/SejourMauriceSection";
import GoogleReviews from "../components/GoogleReviews";
import SiteFooter from "../components/SiteFooter";

const HOMEPAGE_SCENARIOS = SCENARIOS.slice(0, 4);

const APERCU_CARDS = [
  {
    titre: "Pack Cinétoilé",
    tagline: "Cinéma en plein air, cosy & inoubliable",
    href: "/concepts/pack-cinetoile",
    photo: "/images/concepts/pack-cinetoile-08.jpg",
  },
  {
    titre: "Soirée Pyjama Party",
    tagline: "Tipis, étoiles et nuit féerique",
    href: "/concepts/pyjama-party",
    photo: "/images/concepts/pyjama-party-07.png",
  },
  {
    titre: "Love on the Ocean",
    tagline: "Demande en mariage sur catamaran",
    href: "/demandes-en-mariage/love-on-the-ocean",
    photo: "/images/galerie/photo-22.webp",
  },
  {
    titre: "Guinguette Bohème",
    tagline: "Votre événement clés en main",
    href: "/concepts/guinguette-boheme",
    photo: "/images/concepts/guinguette-boheme.jpg",
  },
];

const UNIVERS = [
  { label: "Mariages", img: "/images/galerie/photo-19.jpg", href: "/mariages" },
  { label: "Guinguette Bohème", img: "/images/galerie/photo-05.jpg", href: "/concepts/guinguette-boheme" },
  { label: "Pyjama Party Premium", img: "/images/galerie/photo-20.jpg", href: "/concepts/pyjama-party" },
  { label: "Cinétoilé", img: "/images/galerie/photo-21.jpg", href: "/concepts/pack-cinetoile" },
  { label: "EVJF & EVG", img: "/images/galerie/photo-03.jpg", href: "https://www.myevjfplanner.com" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Wenten Événementiel — La Réunion</title>
        <meta
          name="description"
          content="Spécialiste des demandes en mariage, mariages et événements sur mesure à La Réunion. 14 ans d'expertise, plus de 200 événements réalisés."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SiteMeta />
      </Head>

      <SiteHeader />

      <main>
        {/* ── HERO — photo-13 : piscine à débordement au coucher de soleil ── */}
        <section className="hero">
          <div className="hero-bg">
            <Image
              src="/images/hero-marry-me.jpg"
              alt="Événement Wenten — La Réunion"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 50%" }}
              sizes="100vw"
            />
          </div>
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-line" />
              14 ans d'expertise · 100% de OUI · La Réunion &amp; Île Maurice
              <span className="hero-badge-line" />
            </div>
            <h1 className="hero-h1">
              L'art de sublimer<br />vos plus beaux <em>instants</em>
            </h1>
            <p className="hero-sub">
              Demandes en mariage, mariages, concepts événementiels et soirées d'entreprise —<br />
              chaque création naît d'une histoire unique, la vôtre.
            </p>
            <div className="hero-ctas">
              <a href="/demandes-en-mariage" className="btn-primary">Découvrir nos scénarios →</a>
              <a href="#contact" className="btn-outline-white">Demander un devis</a>
            </div>
          </div>
        </section>

        {/* ── APERÇU EN UN COUP D'ŒIL ── */}
        <section className="apercu-section">
          <div className="apercu-grid">
            {APERCU_CARDS.map((c) => (
              <a key={c.href} href={c.href} className="apercu-card">
                <Image
                  src={c.photo}
                  alt={c.titre}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="apercu-overlay" />
                <div className="apercu-content">
                  <div className="apercu-title">{c.titre}</div>
                  <div className="apercu-tagline">{c.tagline}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── CHIFFRES ── */}
        <div className="stats-bar">
          <div className="stats-grid">
            {[
              { num: "14", label: "ans d'expérience" },
              { num: "200+", label: "événements réalisés" },
              { num: "100%", label: "de OUI 💍" },
              { num: "10", label: "scénarios signature" },
              { num: "4.9★", label: "avis clients" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCÉNARIOS ── */}
        <section className="section" id="scenarios">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-eyebrow">Nos créations phare</div>
                <h2 className="section-title">Les demandes <em>en mariage</em></h2>
              </div>
              <a href="/demandes-en-mariage" className="section-link">Voir les 10 scénarios →</a>
            </div>
            <div className="scenarios-grid">
              {HOMEPAGE_SCENARIOS.map((s) => (
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
                    <div className="scenario-price">dès {s.prix} €</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="section-cta">
              <a href="/demandes-en-mariage" className="btn-pill-outline">Voir tous les scénarios →</a>
            </div>
          </div>
        </section>

        {/* ── UNIVERS ── */}
        <section className="section section-alt" id="univers">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-eyebrow">De A à Z</div>
                <h2 className="section-title">Nos <em>univers</em></h2>
              </div>
            </div>
            <div className="univers-grid">
              {UNIVERS.map((u) => {
                const Tag = u.href ? "a" : "div";
                const isExternal = u.href && u.href.startsWith("http");
                const linkProps = u.href
                  ? { href: u.href, ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                  : {};
                return (
                  <Tag key={u.label} className="univers-card" style={u.href ? { cursor: "pointer" } : {}} {...linkProps}>
                    <Image
                      src={u.img}
                      alt={u.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                    <div className="univers-overlay">
                      <span className="univers-label">{u.label}</span>
                    </div>
                  </Tag>
                );
              })}
              <div className="univers-card-blank">
                <div className="univers-blank-label">Entreprises</div>
                <div className="univers-blank-sub">Séminaires · Galas · Team Building</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGE ── */}
        <section className="testimonial-section">
          <div className="testimonial-stars">★★★★★</div>
          <blockquote className="testimonial-quote">
            "Wenten a transformé notre demande en mariage en un moment magique, au-delà de tout ce qu'on aurait pu imaginer. Chaque détail était parfait, l'émotion était totale."
          </blockquote>
          <p className="testimonial-author">— Sofia & Thomas, demande en mariage · Lagon Love</p>
        </section>

        {/* ── SÉJOUR MAURICE ── */}
        <SejourMauriceSection />

        {/* ── AVIS GOOGLE ── */}
        <GoogleReviews />

        {/* ── ÉQUIPE ── */}
        <EquipeSection />

        {/* ── CTA FINAL ── */}
        <section className="cta-final section-dark" id="contact">
          <div className="cta-final-eyebrow">Parlons de votre projet</div>
          <h2 className="cta-final-title">
            Votre moment unique<br />mérite une <em>attention absolue</em>
          </h2>
          <p className="cta-final-sub">
            Partagez-nous votre vision. Nous créons ensemble l'événement qui vous ressemble, sur mesure, à La Réunion.
          </p>
          <a href="mailto:info@wentenevenementielreunion.com" className="btn-fuchsia">
            Demander un devis personnalisé →
          </a>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
