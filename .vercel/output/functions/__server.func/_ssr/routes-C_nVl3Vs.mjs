import { l as hacks } from "./hacks-Dnwxk09X.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { _ as ArrowRight, l as Footprints, p as Clock, u as FlaskConical } from "../_libs/lucide-react.mjs";
import { r as SiteShell, t as Button } from "./site-shell-BHU20CZU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C_nVl3Vs.js
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
		img: "/images/cards/simulator.webp",
		title: "Metabolic Simulator",
		body: "Scroll forward through time to see how daily decisions about food, movement and habits might shape health. Estimates are hedged and for education only."
	},
	{
		href: "/simulator/pft-inside/",
		img: "/images/cards/pft.webp",
		title: "Personal Fat Threshold model",
		body: "A 3D illustration of the idea that people may differ in how much fat they can store safely."
	},
	{
		href: "/fat-burn-calculator/",
		img: "/images/cards/fat-burn-calculator.webp",
		title: "Max Fat Burn Calculator",
		body: "An estimate of how fast fat loss might go while limiting muscle loss, based on published research."
	}
];
function CardImage({ src, ratio }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "block w-full bg-cover bg-center",
		style: {
			aspectRatio: ratio,
			backgroundImage: `url(${src}), radial-gradient(120% 90% at 85% 15%, rgba(69,135,198,.28), transparent 55%), linear-gradient(160deg, #0e1c30 0%, #08111d 100%)`
		}
	});
}
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
							children: "Simple tools and plain-language Health Hacks to help you see how everyday choices add up over time."
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
									href: "/simulator/",
									children: ["Try the simulator ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "onInkOutline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#hacks",
									children: "Health Hacks"
								})
							})]
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "tools",
			className: "mx-auto max-w-6xl px-5 pt-16 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/simulator/",
				className: "health-card group block overflow-hidden border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardImage, {
					src: "/images/cards/simulator.webp",
					ratio: "16 / 9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
							children: ["Metabolic Simulator", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
							className: "mt-3 max-w-3xl text-lg text-muted",
							children: tools[0].body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-6 inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold text-white",
							style: { background: "#4587c6" },
							children: ["Try the simulator ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "hacks",
			className: "mx-auto max-w-6xl px-5 py-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
					children: "Health Hacks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hacks",
					className: "inline-flex min-h-11 items-center gap-1 font-medium text-health",
					children: ["All Health Hacks ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: hacks.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hacks/$slug",
					params: { slug: h.slug },
					className: "health-card block overflow-hidden border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardImage, {
						src: `/images/cards/hacks/${h.slug}.webp`,
						ratio: "4 / 3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold text-health",
								children: h.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl font-semibold uppercase",
								children: h.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								children: h.lede
							})
						]
					})]
				}, h.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
				children: "More tools"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2",
				children: tools.slice(1).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: t.href,
					className: "health-card block overflow-hidden border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardImage, {
						src: t.img,
						ratio: "4 / 3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
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
						]
					})]
				}, t.href))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
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
