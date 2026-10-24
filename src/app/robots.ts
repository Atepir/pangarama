import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Tout le site public est indexable : il n'expose aucune route privée.
 *
 * Le fichier est figé au build (`output: "export"`), comme `sitemap.ts`.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url.replace(/\/+$/, ""),
  };
}
