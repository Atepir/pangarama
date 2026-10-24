import type { Metadata } from "next";

import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMain } from "@/components/contact/contact-main";
import { ContactSteps } from "@/components/contact/contact-steps";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Présentez votre projet, votre problématique ou votre besoin : PANGARAMA revient vers vous pour comprendre votre contexte et envisager la réponse la plus adaptée.",
  path: "/contact",
  keywords: [
    "contact PANGARAMA",
    "demande de mission",
    "cabinet de conseil Ouagadougou",
    "partenariat Burkina Faso",
    "devis étude stratégique",
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <ContactSteps />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
