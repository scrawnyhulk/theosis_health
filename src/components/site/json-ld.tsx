import { site } from "@/lib/content";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: "Theosis Health LLC",
      url: site.url,
      description: site.description,
      founder: { "@type": "Person", name: "Nick Holwey", honorificSuffix: "PA-C" },
    },
    { "@type": "WebSite", name: site.name, url: site.url, description: site.description, publisher: { "@id": `${site.url}/#org` } },
  ],
};

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
