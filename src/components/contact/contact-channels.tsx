import { CONTACT } from "@/config/site";
import { CONTACT_CHANNELS, CONTACT_CONFIDENTIALITY } from "@/content/pages";

type ChannelId = (typeof CONTACT_CHANNELS)[number]["id"];

/** Valeurs affichées : la maquette les isole du contenu éditorial. */
const CHANNEL_VALUES: Record<ChannelId, { value: string; href?: string }> = {
  ecrire: { value: CONTACT.email, href: CONTACT.emailHref },
  appeler: { value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  rencontrer: { value: CONTACT.location },
};

/** Colonne latérale : les trois façons de prendre contact. */
export function ContactChannels() {
  return (
    <aside className="flex w-full max-w-[640px] flex-col lg:max-w-none">
      {CONTACT_CHANNELS.map((channel) => {
        const { value, href } = CHANNEL_VALUES[channel.id];

        return (
          <div
            key={channel.id}
            className="flex flex-col gap-1.5 border-t border-rule py-5 first:border-t-0 first:pt-0"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold-ink">
              {channel.label}
            </p>

            {href ? (
              <a
                href={href}
                className="self-start text-display-4 wrap-anywhere text-navy transition-colors duration-200 ease-editorial hover:text-gold-ink"
              >
                {value}
              </a>
            ) : (
              <p className="text-display-4 text-navy">{value}</p>
            )}

            <p className="text-body-sm text-body">{channel.description}</p>
          </div>
        );
      })}

      <div className="flex flex-col gap-2 border-t border-rule pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold-ink">
          {CONTACT_CONFIDENTIALITY.title}
        </p>
        <p className="text-body-sm text-body">{CONTACT_CONFIDENTIALITY.text}</p>
      </div>
    </aside>
  );
}
