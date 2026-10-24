import { Container } from "@/components/layout/container";
import { HOME_ACTIVITY } from "@/content/pages";

/**
 * Bandeau d'activité sous le hero : les quatre publics accompagnés, sur aplat
 * navy. Il sert de respiration entre le hero et la présentation.
 */
export function ActivityStrip() {
  return (
    <section className="bg-navy">
      <Container padding="wide" className="py-6 lg:py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-soft lg:w-[104px] lg:shrink-0">
            {HOME_ACTIVITY.label}
          </p>
          <span aria-hidden="true" className="hidden h-8 w-px bg-line-dark lg:block" />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-10">
            {HOME_ACTIVITY.audiences.map((audience) => (
              <li key={audience} className="text-body-sm font-medium text-on-dark-muted">
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
