import type { ReactElement, SVGProps } from "react";

import type { SocialNetwork } from "@/config/site";

type IconProps = SVGProps<SVGSVGElement>;

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Pictogrammes monochromes des réseaux sociaux, dessinés dans le style du site
 * (trait 1.6, `currentColor`) : lucide-react ne fournit plus d'icônes de marque.
 */
export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...BASE} {...props}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4" />
      <path d="M7.9 10.9V17" />
      <circle cx="7.9" cy="7.7" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11.8 17v-6.1" />
      <path d="M11.8 13.4c0-1.3 1-2.3 2.2-2.3s2.1.9 2.1 2.3V17" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...BASE} {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M15.1 8.3h-1a2.1 2.1 0 0 0-2.1 2.1V17" />
      <path d="M10.2 12.7h4.3" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...BASE} {...props}>
      <rect x="2.75" y="5.75" width="18.5" height="12.5" rx="3.6" />
      <path d="M10.4 9.4l4.6 2.6-4.6 2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<SocialNetwork, (props: IconProps) => ReactElement> = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};
