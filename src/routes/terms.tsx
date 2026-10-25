import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import body from "@/content/legal/terms.html?raw";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use — Theosis Health" }] }),
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
