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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-20">
          <ContactForm />
          <ContactChannels />
        </div>
      </Container>
    </section>
  );
}
