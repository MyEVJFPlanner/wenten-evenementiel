import Image from "next/image";
import { equipe } from "../data/equipe";

export default function EquipeSection() {
  return (
    <section style={{ padding: "80px 24px", textAlign: "center", background: "transparent" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{
          fontSize: "11px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#0E8C8C",
          marginBottom: "12px",
        }}>
          L'équipe Wenten
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(32px, 5vw, 42px)",
          fontWeight: 600,
          color: "#16302E",
          lineHeight: 1.2,
          marginBottom: "56px",
        }}>
          Notre équipe à votre service
        </h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px 32px",
        }}>
          {equipe.map((member) => {
            const initial = member.prenom.charAt(0);
            return (
              <div key={member.prenom} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "140px" }}>
                {member.photo ? (
                  <div style={{
                    width: "clamp(96px, 12vw, 150px)",
                    height: "clamp(96px, 12vw, 150px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    outline: "6px solid #fff",
                    outlineOffset: "-6px",
                    boxShadow: "0 0 0 7px rgba(214,66,146,0.25), 0 10px 28px rgba(14,140,140,0.18)",
                    position: "relative",
                    flexShrink: 0,
                  }}>
                    <Image
                      src={member.photo}
                      alt={member.prenom}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="150px"
                    />
                  </div>
                ) : (
                  <div style={{
                    width: "clamp(96px, 12vw, 150px)",
                    height: "clamp(96px, 12vw, 150px)",
                    borderRadius: "50%",
                    background: "linear-gradient(160deg, #BFE9E2 0%, #F4C9DD 100%)",
                    outline: "6px solid #fff",
                    outlineOffset: "-6px",
                    boxShadow: "0 0 0 7px rgba(214,66,146,0.25), 0 10px 28px rgba(14,140,140,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "38px",
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1,
                      userSelect: "none",
                    }}>
                      {initial}
                    </span>
                  </div>
                )}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#16302E",
                  marginTop: "14px",
                  lineHeight: 1.2,
                }}>
                  {member.prenom}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12.5px",
                  color: "#6b7c7a",
                  marginTop: "4px",
                  lineHeight: 1.45,
                  textAlign: "center",
                }}>
                  {member.fonction}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
