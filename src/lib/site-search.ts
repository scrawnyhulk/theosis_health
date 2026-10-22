import { hacks, nerdGroups, nerdTopics, type HackSlug } from "@/lib/hacks";

export type SearchHit = {
  id: string;
  section: string;
  title: string;
  blurb: string;
} & (
  | { hrefKind: "hacks" }
  | { hrefKind: "hack"; slug: HackSlug }
  | { hrefKind: "nerd-hub" }
  | { hrefKind: "nerd"; topic: string }
);

type Indexed = SearchHit & { haystack: string };

function pack(title: string, ...parts: Array<string | undefined | readonly string[]>): string {
  return [title, ...parts.flatMap((p) => (Array.isArray(p) ? p : p ? [p] : []))]
    .join(" ")
    .toLowerCase();
}

function topicText(topic: (typeof nerdTopics)[number]): string {
  const extra: string[] = [];
  if ("steps" in topic && topic.steps) {
    for (const step of topic.steps) {
      extra.push(step.title);
      if ("kicker" in step && typeof step.kicker === "string") extra.push(step.kicker);
      if ("paragraphs" in step && Array.isArray(step.paragraphs)) extra.push(...step.paragraphs);
    }
  }
  if ("extraImages" in topic && Array.isArray(topic.extraImages)) {
    for (const img of topic.extraImages) {
      if ("title" in img && typeof img.title === "string") extra.push(img.title);
      if ("alt" in img && typeof img.alt === "string") extra.push(img.alt);
    }
  }
  return pack(topic.title, topic.lede, topic.paragraphs, extra);
}

const index: Indexed[] = [
  {
    id: "hacks-hub",
    section: "Health Hacks",
    title: "Health Hacks",
    blurb: "The 20% that actually moves the needle.",
    hrefKind: "hacks" as const,
    haystack: pack("health hacks", "protein calories food exercise"),
  },
  ...hacks.flatMap((h) =>
    h.slug === "nerd-out"
      ? []
      : [
          {
            id: `hack-${h.slug}`,
            section: "Health Hacks",
            title: h.title,
            blurb: h.lede,
            hrefKind: "hack" as const,
            slug: h.slug,
            haystack: pack(h.title, h.lede, h.paragraphs),
          },
        ],
  ),
  {
    id: "nerd-hub",
    section: "Nutritional Nerd Out",
    title: "Nutritional Nerd Out",
    blurb: "Mechanisms. How stuff actually works.",
    hrefKind: "nerd-hub" as const,
    haystack: pack("nutritional nerd out", "nerd out", "atp protein diabetes cholesterol"),
  },
  ...nerdTopics.map((topic) => {
    const group = nerdGroups.find((g) => (g.topicIds as readonly string[]).includes(topic.id));
    return {
      id: `nerd-${topic.id}`,
      section: group?.title ?? "Nutritional Nerd Out",
      title: topic.title,
      blurb: topic.lede.split("\n")[0],
      hrefKind: "nerd" as const,
      topic: topic.id,
      haystack: pack(topic.title, topic.lede, group?.title, topicText(topic)),
    };
  }),
];

export function searchSite(query: string, limit = 12): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return index
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (tokens.every((t) => item.haystack.includes(t))) score = item.haystack.includes(q) ? 45 : 30;
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((row) => {
      const { haystack: _h, ...hit } = row.item;
      return hit;
    });
}
