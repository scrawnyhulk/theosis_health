import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import body from "@/content/legal/disclaimer.html?raw";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Medical Disclaimer (DRAFT) — Theosis Health" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="rounded-lg border border-health px-4 py-2 font-semibold text-health">DRAFT — pending Nick’s review. Not yet in effect.</p>
        <article className="legal mt-6" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
    </SiteShell>
  );
}
