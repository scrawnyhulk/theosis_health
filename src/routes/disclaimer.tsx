import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import body from "@/content/legal/disclaimer.html?raw";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ meta: [{ title: "Medical Disclaimer — Theosis Health" }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <article className="legal mt-6" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
    </SiteShell>
  );
}
