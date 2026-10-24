import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { ABOUT_ENGAGEMENTS } from "@/content/about";

/** Les cinq engagements : cartes numérotées. */
export function EngagementsSection() {
  return (
    <section className="bg-paper">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-8">
          <SectionEyebrow>{ABOUT_ENGAGEMENTS.eyebrow}</SectionEyebrow>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ABOUT_ENGAGEMENTS.items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-card border border-line bg-ivory p-5 lg:p-6"
              >
                <p className="text-[12px] font-bold tracking-[0.08em] text-gold-ink">
                  {String(item.order).padStart(2, "0")}
                </p>
                <h3 className="text-display-4 text-navy">{item.title}</h3>
                <p className="text-body-sm text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
