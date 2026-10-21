import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";

// DRAFT: Nick to choose the Theosis Health contact address (or a form).
const CONTACT_EMAIL = "nick@theosishealth.com";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Theosis Health" }] }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="rounded-lg border border-health px-4 py-2 font-semibold text-health">DRAFT: contact address not final. Nick to choose.</p>
        <h1 className="mt-6 font-display text-4xl font-semibold uppercase">Contact</h1>
        <p className="mt-4 text-muted">Questions or feedback about the tools? Email us at:</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block text-lg font-medium text-health">{CONTACT_EMAIL}</a>
        <p className="mt-6 text-sm text-muted">Theosis Health is an education company and doesn’t provide medical care. Please don’t send personal health information. For medical questions, talk with your healthcare provider.</p>
      </section>
    </SiteShell>
  );
}
