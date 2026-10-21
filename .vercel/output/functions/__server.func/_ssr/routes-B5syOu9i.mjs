import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { _ as ArrowRight, l as Footprints, p as Clock, u as FlaskConical } from "../_libs/lucide-react.mjs";
import { r as SiteShell, t as Button } from "./site-shell-zZ3O12yd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B5syOu9i.js
var import_jsx_runtime = require_jsx_runtime();
var why = [
	{
		icon: Clock,
		title: "Scroll forward through time",
		body: "Move ahead week by week and month by month to see how daily choices about food, movement and habits might add up over time."
	},
	{
		icon: Footprints,
		title: "Compare everyday decisions",
		body: "Try a different plan or keep current habits and see how the estimated paths may differ, with every estimate hedged and explained. An optional inside view adds an illustration."
	},
	{
		icon: FlaskConical,
		title: "Evidence-based, cited content",
		body: "Explanations drawn from published research, with numbered citations you can check."
	}
];
var tools = [
	{
		href: "/simulator/",
		title: "Metabolic Simulator",
		body: "Scroll forward through time to see how daily decisions about food, movement and habits might shape health. Estimates are hedged and for education only."
	},
	{
		href: "/simulator/pft-inside/",
		title: "Personal Fat Threshold model",
		body: "A 3D illustration of the idea that people may differ in how much fat they can store safely."
	},
	{
		href: "/hacks",
		title: "Holwey’s Handy Health Hacks",
		body: "Practical nutrition and exercise tips, plus nerd-out deep dives for the curious."
	}
];
var card = "health-card block border border-border bg-surface p-6";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "health-mesh text-ink-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-phone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/health-logo-phone.png",
						alt: "Theosis Health emblem: a silver shield bearing the Star of Life, a cross, and the serpent of healing, above the words Theosis Health.",
						className: "no-outline mx-auto block h-auto w-full max-w-full object-contain object-top"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-desktop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/health-logo.jpg",
						alt: "Theosis Health emblem: a silver shield bearing the Star of Life, a cross, and the serpent of healing, above the words Theosis Health.",
						className: "no-outline block max-h-[80svh] w-full object-cover object-center"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-widest text-health uppercase",
								children: "Draft copy · Nick to edit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "sr-only",
								children: "Theosis Health"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl",
								children: "Plain-language metabolic health education, created by a licensed physician assistant. For education only, not medical advice. Scroll forward through time to see how everyday decisions about food, movement and habits might affect health in the months and years ahead."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink-muted",
								children: "Education only, not medical advice. Talk with your healthcare provider."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "onInk",
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#tools",
										children: ["What you’ll find ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "onInkOutline",
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#founder",
										children: "About the founder"
									})
								})]
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
				children: "Why Theosis Health"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-3",
				children: why.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: card,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-7 text-health" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl font-semibold uppercase",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: body
						})
					]
				}, title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "tools",
			className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
				children: "What you’ll find"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-3",
				children: tools.map((t) => {
					const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold uppercase",
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: t.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 inline-flex items-center gap-1 font-medium text-health",
							children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					] });
					return t.href === "/hacks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						className: card,
						children: inner
					}, t.href) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: t.href,
						className: card,
						children: inner
					}, t.href);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "founder",
			className: "mx-auto max-w-6xl px-5 pb-20 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${card} flex flex-col items-start gap-5 sm:flex-row sm:items-center`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/nick.jpg",
					alt: "Nick Holwey, founder of Theosis Health",
					className: "size-24 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold uppercase",
					children: "About the founder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Theosis Health was founded by Nick Holwey, PA-C, a licensed physician assistant, to make metabolic health easier to see and understand. Theosis Health is an education company. His clinical work is done separately through Theosis Medical LLC."
				})] })]
			})
		})
	] });
}
//#endregion
export { Home as component };
