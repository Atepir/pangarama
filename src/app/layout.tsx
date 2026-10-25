import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/config/site";
import { absoluteUrl, organizationJsonLd, SOCIAL_IMAGE } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const socialImageUrl = absoluteUrl(SOCIAL_IMAGE.path);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "fr_FR",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: socialImageUrl,
        width: SOCIAL_IMAGE.width,
        height: SOCIAL_IMAGE.height,
        alt: SOCIAL_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: socialImageUrl, alt: SOCIAL_IMAGE.alt }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#16243d",
};

/**
 * Active les animations lorsque JavaScript est disponible. Le contenu reste
 * visible avec ou sans cette classe, y compris avant l'hydratation.
 */
const ENABLE_JS_CLASS = "document.documentElement.classList.add('js');";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENABLE_JS_CLASS }} />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-body">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-on-dark-strong"
        >
          Aller au contenu
        </a>

        <SiteHeader />

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <SiteFooter />

        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
