import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { T as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as SiteShell, o as cn } from "./site-shell-CFtZWAZC.mjs";
import { t as Input } from "./input-DI01t26K.mjs";
//#region ../th-nav/node_modules/.nitro/vite/services/ssr/assets/contact-CyCsWjEY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-md bg-ink px-3.5 py-3 font-sans text-base text-fg shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 ease-out placeholder:text-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var FORM_NAME = "theosishealth-contact";
var lbl = "text-xs font-medium tracking-widest text-muted uppercase";
function Page() {
	const [state, setState] = (0, import_react.useState)("idle");
	const [err, setErr] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		if (String(data.get("company-website") || "")) {
			setState("sent");
			return;
		}
		const email = String(data.get("email") || "").trim(), message = String(data.get("message") || "").trim();
		if (!/^\S+@\S+\.\S+$/.test(email) || !message) {
			setErr("Please add a valid email and a message.");
			setState("error");
			return;
		}
		setState("sending");
		setErr("");
		try {
			const body = new URLSearchParams();
			data.forEach((v, k) => body.append(k, String(v)));
			body.set("form-name", FORM_NAME);
			const r = await fetch("/__forms.html", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: body.toString()
			});
			if (!r.ok) throw new Error(String(r.status));
			form.reset();
			setState("sent");
		} catch {
			setErr("Something went wrong sending that. Please try again in a moment.");
			setState("error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "health-mesh text-ink-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-health uppercase",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold uppercase sm:text-5xl",
					children: "Get in touch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-lg leading-relaxed text-ink-muted",
					children: "For general questions about the tools and Health Hacks. Please don’t send personal medical details."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-ink-muted",
					children: [
						"Or email ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:support@theosishealth.com",
							className: "font-medium text-health",
							children: "support@theosishealth.com"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-ink-muted",
					children: "Theosis Health is an education company and doesn’t provide medical care. For medical questions, talk with your healthcare provider."
				})
			] }), state === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-6 text-fg shadow-border sm:p-8",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold uppercase",
					children: "Thanks, message sent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "We read every note. Replies may take a few days."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				name: FORM_NAME,
				method: "POST",
				onSubmit,
				noValidate: true,
				className: "rounded-xl bg-surface p-5 text-fg shadow-border sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "hidden",
						name: "form-name",
						value: FORM_NAME
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Leave this empty ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "company-website",
							tabIndex: -1,
							autoComplete: "off"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								htmlFor: "name",
								children: "Your name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								name: "name",
								autoComplete: "name",
								placeholder: "Jordan Hale"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								name: "email",
								type: "email",
								autoComplete: "email",
								placeholder: "you@example.com",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: lbl,
									htmlFor: "topic",
									children: "Topic"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "topic",
									name: "topic",
									placeholder: "Simulator, Health Hacks, calculator, feedback…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: lbl,
									htmlFor: "message",
									children: "Message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "message",
									name: "message",
									rows: 6,
									placeholder: "Questions or feedback about the tools. No personal medical details, please.",
									required: true
								})]
							})
						]
					}),
					state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-red-400",
						role: "alert",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: state === "sending",
							className: "inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold text-white disabled:opacity-60",
							style: { background: "#4587c6" },
							children: [
								state === "sending" ? "Sending…" : "Send message",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No account required. We’ll never spam you or sell your email."
						})]
					})
				]
			})]
		})
	}) });
}
//#endregion
export { Page as component };
