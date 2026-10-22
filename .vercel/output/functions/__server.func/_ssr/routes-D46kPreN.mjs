import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { _ as ArrowRight, l as Footprints, p as Clock, u as FlaskConical } from "../_libs/lucide-react.mjs";
import { r as SiteShell, t as Button } from "./site-shell-kAGCx3nd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D46kPreN.js
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
		title: "Health Hacks",
		body: "Practical nutrition and exercise tips, plus nerd-out deep dives for the curious."
	}
];
var card = "health-card block border border-border bg-surface p-6";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "health-mesh text-ink-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-logo mx-auto flex max-w-7xl items-center justify-center px-4 pt-6 sm:px-8 md:pt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						media: "(min-width: 640px)",
						srcSet: "/images/theosis-health-hero-h.webp",
						type: "image/webp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						media: "(min-width: 640px)",
						srcSet: "/images/theosis-health-hero-h.png"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						srcSet: "/images/theosis-health-hero-v.webp",
						type: "image/webp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/theosis-health-hero-v.png",
						alt: "Theosis Health logo: a chrome three-bar Orthodox cross wrapped by a blue DNA double helix inside a chrome and blue laurel wreath, beside the words Theosis Health.",
						fetchPriority: "high",
						className: "no-outline block h-auto w-auto object-contain"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Simple tools and realistic Health Hacks to help you navigate and improve your health in a hectic life."
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
			})]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl font-semibold uppercase",
							children: [t.title, t.href === "/simulator/" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 inline-block rounded-full border px-2 py-0.5 align-middle font-sans text-xs font-semibold normal-case tracking-wide",
								style: {
									color: "#4587c6",
									borderColor: "rgba(69,135,198,.55)",
									background: "rgba(69,135,198,.1)"
								},
								children: "Beta"
							})]
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
