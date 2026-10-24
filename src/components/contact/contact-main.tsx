import { Container } from "@/components/layout/container";

import { ContactChannels } from "./contact-channels";
import { ContactForm } from "./contact-form";

/**
 * Corps de la page Contact : le formulaire en colonne principale, les
 * coordonnées et le repère géographique en colonne latérale.
 */
export function ContactMain() {
  return (
    <section className="bg-ivory">
      <Container className="section-y">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,640px)_minmax(0,360px)] lg:items-start lg:justify-between lg:gap-16">
          <ContactForm className="max-w-[640px]" />
          <ContactChannels />
        </div>
      </Container>
    </section>
  );
}
