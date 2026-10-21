import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms (DRAFT) — Theosis Health" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="rounded-lg border border-accent px-4 py-2 font-semibold text-accent">DRAFT — placeholder pending legal review. Not in effect.</p>
        <h1 className="mt-6 font-display text-4xl font-semibold uppercase">Terms</h1>
        <p className="mt-4 text-muted">Theosis Health LLC (Illinois). Content to be written by counsel before launch.</p>
      </section>
    </SiteShell>
  );
}
