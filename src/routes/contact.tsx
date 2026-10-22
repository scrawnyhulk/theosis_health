import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Submissions go to Netlify Forms (form "theosishealth-contact", defined in public/__forms.html).
// Turn on an email notification to nick@theosishealth.com in Netlify > Forms > Form notifications.
const FORM_NAME = "theosishealth-contact";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Theosis Health" }, { name: "description", content: "General questions about the Theosis Health tools and Health Hacks." }] }),
  component: Page,
});

const lbl = "text-xs font-medium tracking-widest text-muted uppercase";

function Page() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company-website") || "")) { setState("sent"); return; } // honeypot: bots fill this
    const email = String(data.get("email") || "").trim(), message = String(data.get("message") || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email) || !message) { setErr("Please add a valid email and a message."); setState("error"); return; }
    setState("sending"); setErr("");
    try {
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      body.set("form-name", FORM_NAME);
      const r = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!r.ok) throw new Error(String(r.status));
      form.reset(); setState("sent");
    } catch {
      setErr("Something went wrong sending that. Please try again in a moment."); setState("error");
    }
  }

  return (
    <SiteShell>
      <section className="health-mesh text-ink-fg">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-20">
          <div>
            <p className="text-xs font-medium tracking-widest text-health uppercase">Contact</p>
            <h1 className="mt-3 font-display text-4xl font-semibold uppercase sm:text-5xl">Get in touch</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">For general questions about the tools and Health Hacks. Please don’t send personal medical details.</p>
            <p className="mt-6 text-sm text-ink-muted">Theosis Health is an education company and doesn’t provide medical care. For medical questions, talk with your healthcare provider.</p>
          </div>
          {state === "sent" ? (
            <div className="rounded-xl bg-surface p-6 text-fg shadow-border sm:p-8" role="status">
              <h2 className="font-display text-2xl font-semibold uppercase">Thanks, message sent</h2>
              <p className="mt-2 text-muted">We read every note. Replies may take a few days.</p>
            </div>
          ) : (
            <form name={FORM_NAME} method="POST" onSubmit={onSubmit} noValidate className="rounded-xl bg-surface p-5 text-fg shadow-border sm:p-8">
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="hidden" aria-hidden="true"><label>Leave this empty <input name="company-website" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className={lbl} htmlFor="name">Your name</label><Input id="name" name="name" autoComplete="name" placeholder="Jordan Hale" /></div>
                <div><label className={lbl} htmlFor="email">Email</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
                <div className="sm:col-span-2"><label className={lbl} htmlFor="topic">Topic</label><Input id="topic" name="topic" placeholder="Simulator, Health Hacks, calculator, feedback…" /></div>
                <div className="sm:col-span-2"><label className={lbl} htmlFor="message">Message</label><Textarea id="message" name="message" rows={6} placeholder="Questions or feedback about the tools. No personal medical details, please." required /></div>
              </div>
              {state === "error" && <p className="mt-4 text-sm text-red-400" role="alert">{err}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={state === "sending"} className="inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold text-white disabled:opacity-60" style={{ background: "#4587c6" }}>
                  {state === "sending" ? "Sending…" : "Send message"} <ArrowRight className="size-4" />
                </button>
                <p className="text-sm text-muted">No account required. We’ll never spam you or sell your email.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
