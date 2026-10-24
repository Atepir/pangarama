type JsonLdData = Record<string, unknown> | readonly Record<string, unknown>[];

/** Injecte un bloc JSON-LD (Organization, Article, BreadcrumbList…). */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
