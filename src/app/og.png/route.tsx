import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { SOCIAL_IMAGE } from "@/lib/seo";

const WORDMARK = siteConfig.wordmark;

/**
 * Image sociale du site, servie à une URL stable (`/og.png`) afin que les
 * métadonnées n'aient pas à dépendre d'un nom de fichier généré au build.
 * Elle reprend les aplats de la charte : fond navy, filet et accents or.
 *
 * Générée une seule fois au build : aucune requête ne déclenche de rendu, et
 * l'export statique écrit le fichier `out/og.png` (d'où le dossier nommé
 * `og.png`).
 */
export const dynamic = "force-static";

const COLORS = {
  navy: "#16243d",
  white: "#ffffff",
  gold: "#bb975a",
  goldSoft: "#d3b57f",
  intro: "#c6cdda",
  faint: "#b9c2d2",
} as const;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.navy,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 64, height: 6, backgroundColor: COLORS.gold }} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: COLORS.goldSoft,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Wordmark bicolore du logo : « PANG » en blanc, « ARAMA » en or. */}
          <div style={{ display: "flex", fontSize: 96, fontWeight: 400, letterSpacing: 8 }}>
            <span style={{ color: COLORS.white }}>{WORDMARK.head}</span>
            <span style={{ color: COLORS.gold }}>{WORDMARK.tail}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 32,
              maxWidth: 940,
              color: COLORS.intro,
            }}
          >
            {siteConfig.shortDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${COLORS.gold}`,
            paddingTop: 28,
            fontSize: 24,
            color: COLORS.faint,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.location}</div>
          <div style={{ display: "flex" }}>{siteConfig.email}</div>
        </div>
      </div>
    ),
    { width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height },
  );
}
