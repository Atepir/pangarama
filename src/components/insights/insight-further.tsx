import { InsightCartography } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { ARTICLE_LABELS } from "@/content/pages";

/**
 * Bloc « Aller plus loin » : carte blanche de sollicitation et cadre de 500 × 330 px
 * portant la cartographie légendée.
 */
export function InsightFurther() {
  return (
    <section className="bg-navy">
      <Container className="section-y-tight">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[50px]">
          <Reveal className="flex flex-1 flex-col gap-3 bg-white px-6 py-5 lg:gap-[12px] lg:px-[25px] lg:py-[20px]">
            {/* Surtitre à 11 px, comme le reste du gabarit. */}
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-ink">
              {ARTICLE_LABELS.furtherEyebrow}
            </p>

            <h2 className="text-[22px] font-bold leading-[1.18] tracking-[-0.44px] text-navy [text-wrap:wrap] lg:max-w-[650px] lg:text-[28px] lg:tracking-[-0.56px]">
              {ARTICLE_LABELS.furtherTitle}
            </h2>

            <p className="text-body-sm text-body lg:max-w-[620px]">
              {ARTICLE_LABELS.furtherText}
            </p>

            {/* La maquette n'ouvre pas de CTA dans cette carte : il vient du brief éditorial. */}
            <ActionLink
              href={ARTICLE_LABELS.furtherCta.href}
              variant="navy"
              className="mt-1 self-start"
            >
              {ARTICLE_LABELS.furtherCta.label}
            </ActionLink>
          </Reveal>

          <Reveal
            delay={80}
            className="relative aspect-[500/330] w-full max-w-[500px] overflow-clip rounded-frame bg-navy lg:shrink-0"
          >
            <InsightCartography className="absolute left-[8%] top-[8.5%] w-[84%] lg:left-[40px] lg:top-[28px] lg:w-[420px]" />

            <p className="absolute left-[26%] top-[85.5%] text-[10px] font-bold leading-[1.35] text-on-dark-warm lg:left-[130px] lg:top-[282px]">
              {ARTICLE_LABELS.furtherCaption}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
