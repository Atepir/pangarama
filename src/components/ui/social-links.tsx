import { SOCIAL_ICONS } from "@/components/ui/social-icons";
import { SOCIAL_LINKS, siteConfig, type SocialNetwork } from "@/config/site";
import { cn } from "@/lib/cn";

const NETWORK_LABELS: Record<SocialNetwork, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
};

const ORDER: readonly SocialNetwork[] = ["linkedin", "facebook", "youtube"];

const TONE: Record<"light" | "dark", string> = {
  light: "border-on-dark-faint text-on-dark",
  dark: "border-navy/30 text-navy",
};

/**
 * Icônes monochromes des réseaux. Les URL non confirmées restent affichées
 * (fidélité à la maquette) mais désactivées, sans jamais inventer de lien.
 */
export function SocialLinks({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-[10px] lg:gap-3", className)}>
      {ORDER.map((network) => {
        const link = SOCIAL_LINKS.find((item) => item.network === network);
        const Icon = SOCIAL_ICONS[network];
        const label = link
          ? link.ariaLabel
          : `${siteConfig.name} sur ${NETWORK_LABELS[network]} — lien officiel à confirmer`;
        const circle = cn(
          "flex h-[34px] w-[34px] items-center justify-center rounded-full border transition-colors duration-300 ease-editorial lg:h-9 lg:w-9",
          TONE[tone],
        );

        return (
          <li key={network}>
            {link ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className={cn(circle, "hover:border-gold-soft hover:text-gold-soft")}
              >
                <Icon aria-hidden="true" className="h-3 w-3 lg:h-4 lg:w-4" />
              </a>
            ) : (
              <span
                role="img"
                aria-label={label}
                title={label}
                className={cn(circle, "cursor-default opacity-45")}
              >
                <Icon aria-hidden="true" className="h-3 w-3 lg:h-4 lg:w-4" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
