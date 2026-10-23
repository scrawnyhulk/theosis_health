import { i as __toESM } from "../_runtime.mjs";
import { c as hackCovers, l as hacks } from "./hacks-Dnwxk09X.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { _ as ArrowRight, l as Footprints, p as Clock, u as FlaskConical } from "../_libs/lucide-react.mjs";
import { a as SODA_PERSON, c as maintenance, i as EXAMPLE, o as extraLbByDay, s as lostLbByDay } from "./router-cQICj1Ks.mjs";
import { a as SiteShell, i as NavPlaque, r as NavIcon } from "./site-shell-DeZc4Hhv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KqkRByhj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Swap this slug to feature a different existing Health Hack. Text is pulled from src/lib/hacks.ts, not written here. */
var HACK_OF_THE_WEEK = "dont-drink-calories";
function HackOfTheWeek() {
	const h = hacks.find((x) => x.slug === HACK_OF_THE_WEEK);
	if (!h) return null;
	const cover = hackCovers[h.slug];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-labelledby": "hotw-title",
		className: "flare-card flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold tracking-[0.16em] text-health uppercase",
					children: "Hack of the week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "hotw-title",
					className: "font-display text-xl font-semibold uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks/$slug",
						params: { slug: h.slug },
						className: "hover:underline",
						children: h.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink-fg/85",
					children: h.lede
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-ink-muted",
					children: "General education, not medical advice. What works can vary from person to person."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hacks",
					className: "group mt-1 self-start",
					"aria-label": "See all Health Hacks",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPlaque, {
						size: "menu",
						label: "See all Health Hacks"
					})
				})
			]
		}), cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: cover.src,
			alt: cover.alt,
			loading: "lazy",
			width: 1280,
			height: 853,
			className: "mt-auto block h-auto w-full"
		}) : null]
	});
}
/** Home: featured Metabolic Simulator card paired with the Hack of the week (side by side on PC, stacked on phone). */
function HomeFeatures() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-6 grid max-w-5xl gap-4 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"aria-labelledby": "simfeat-title",
			className: "flex h-full flex-col overflow-hidden rounded-xl border border-[#79b4f6]/60 bg-surface/80 shadow-[0_0_0_1px_rgb(91_156_236_/_0.35),0_0_28px_rgb(42_122_224_/_0.45)] ring-2 ring-[#5b9cec]/50 transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgb(121_180_246_/_0.5),0_0_40px_rgb(42_122_224_/_0.65)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/simulator-card-cover.jpg",
				alt: "Phone showing the Metabolic Simulator's see-through figure",
				loading: "lazy",
				width: 1200,
				height: 675,
				className: "block h-auto w-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-health uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, {
							name: "pulse",
							className: "size-5"
						}), " Free tool · Beta"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "simfeat-title",
						className: "font-display text-xl font-semibold uppercase",
						children: "Metabolic Simulator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink-fg/85",
						children: "See where you may stand relative to your personal fat threshold, and how daily habits could change it over time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ink-muted",
						children: "Estimates are hedged and for education only, not medical advice."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/simulator/",
						className: "mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-md bg-[#2a7ae0] px-4 font-semibold text-white transition-colors hover:bg-[#3a8af0]",
						children: ["Try the simulator ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "→"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HackOfTheWeek, {})]
	});
}
Math.round(maintenance(SODA_PERSON) / 10) * 10;
var PROT_LB = lostLbByDay(150);
var BAR_MAX = PROT_LB[365] * 1.05;
var barH = (lb) => `${Math.max(4, lb / BAR_MAX * 100)}%`;
var EXAMPLE_NOTE = `Example person, not a prediction: a ${EXAMPLE.age}-year-old, 5'9", ${EXAMPLE.weightLb}-lb man with about ${EXAMPLE.bodyFatPct}% body fat who is lightly active; individual numbers will differ. Try the simulator to see your own.`;
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "sr-only",
							children: "Theosis Health"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-tagline",
							children: "“Simple tools. Smarter choices. Meaningful change.”"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
							className: "mk-hero-rule",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFeatures, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mk-welcome",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-semibold uppercase sm:text-3xl",
									children: "Welcome to Theosis Health"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-2xl text-ink-fg/85",
									children: "Our bodies are a lot like machines. We’re made of parts (protein) and run on fuel (carbohydrates and fats). Most adults burn roughly 60–110 calories an hour, so a few sips of a sweet drink or a few extra bites can be more than we need in that moment. We store the extra, and small things add up fast."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 max-w-2xl text-ink-fg/85",
									children: [
										"We each have a different-sized fuel tank for storing fat safely, set largely by our genes. Once ours is full, the extra fuel has nowhere safe to go. It gets harder to clear sugar and fat from the bloodstream, so blood sugar starts to rise. That tipping point is our personal fat threshold, and it’s how so many people slide into insulin resistance, prediabetes and type 2 diabetes without realizing it. ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/simulator/pft-inside/",
											className: "font-medium text-health underline underline-offset-2 hover:no-underline",
											children: "See what happens inside as fat builds up →"
										}),
										" Today 40.1 million people in the US have diabetes, 115.2 million adults have prediabetes,",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#wf1",
											"aria-label": "Footnote 1",
											children: "1"
										}) }),
										" and about 1 in 3 adults have metabolic syndrome.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#wf2",
											"aria-label": "Footnote 2",
											children: "2"
										}) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 max-w-2xl text-ink-fg/85",
									children: [
										"Theosis Health and the ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/simulator/",
											className: "font-medium text-health underline underline-offset-2 hover:no-underline",
											children: "Theosis Metabolic Simulator"
										}),
										" were created to help you find small, targeted changes that fit the life you already have, without giving up every food you enjoy."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mk-chips",
									"aria-label": "Quick facts",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "40.1 million" }),
											" people in the US have diabetes (2023)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf1",
												"aria-label": "Footnote 1",
												children: "1"
											}) })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "115.2 million" }),
											" US adults have prediabetes",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf1",
												"aria-label": "Footnote 1",
												children: "1"
											}) })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "About 1 in 3" }),
											" US adults (34.7%) have metabolic syndrome (2011–2016)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf2",
												"aria-label": "Footnote 2",
												children: "2"
											}) })
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									className: "mk-fn",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										id: "wf1",
										children: "CDC. National Diabetes Statistics Report (updated Sept 16, 2026)."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										id: "wf2",
										children: [
											"Hirode G, Wong RJ. Trends in the prevalence of metabolic syndrome in the United States, 2011–2016. ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "JAMA." }),
											" 2020;323(24):2526–2528."
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-ink-muted",
							children: "Education only, not medical advice. Talk with your healthcare provider."
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapCarousel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbox, {}),
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
var TICKS = [
	[0, "Today"],
	[30, "1 mo"],
	[91, "3 mo"],
	[182, "6 mo"],
	[365, "1 yr"]
];
var fmtLb = (lb) => lb.toFixed(1);
function timeLabel(d) {
	if (d === 0) return "Today";
	if (d >= 365) return "1 year";
	if (d < 14) return d === 1 ? "1 day" : `${d} days`;
	if (d < 60) return `${Math.round(d / 7)} weeks`;
	const m = Math.round(d / 30.4);
	return m >= 12 ? "1 year" : `${m} months`;
}
function useTween(target, ms = 220) {
	const [v, setV] = (0, import_react.useState)(target);
	const from = (0, import_react.useRef)(target);
	const cur = (0, import_react.useRef)(target);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			cur.current = target;
			setV(target);
			return;
		}
		from.current = cur.current;
		const t0 = performance.now();
		let raf = 0;
		const step = (t) => {
			const k = Math.min(1, (t - t0) / ms);
			const e = 1 - Math.pow(1 - k, 3);
			cur.current = from.current + (target - from.current) * e;
			setV(cur.current);
			if (k < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [target, ms]);
	return v;
}
function TimeSlider({ id, value, onChange, describedBy }) {
	const near = TICKS.reduce((a, t) => Math.abs(t[0] - value) < Math.abs(a[0] - value) ? t : a)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: id,
			className: "mk-small",
			children: ["Move the slider: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
				style: { color: "#fff" },
				children: timeLabel(value)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			className: "mk-range",
			type: "range",
			min: 0,
			max: 365,
			step: 1,
			value,
			list: `${id}-ticks`,
			"aria-valuetext": timeLabel(value),
			"aria-describedby": describedBy,
			onChange: (e) => onChange(+e.target.value)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
			id: `${id}-ticks`,
			children: TICKS.map(([d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d }, d))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mk-ticks mk-ticks-abs",
			"aria-hidden": "true",
			children: TICKS.map(([d, t]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: d === near ? "on" : "",
				style: { left: `${d / 365 * 100}%` },
				children: t
			}, t))
		})
	] });
}
var LOSS = "#3d9a6a";
var ADAPT_NOTE = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "mk-adapt",
	children: "Includes metabolic adaptation"
});
var GAIN = "#e07a4f";
var G_PC = {
	w: 760,
	h: 200,
	l: 46,
	r: 18,
	t: 18,
	b: 32
};
var G_PH = {
	w: 360,
	h: 220,
	l: 36,
	r: 10,
	t: 16,
	b: 30
};
function useNarrow() {
	const [n, setN] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const m = window.matchMedia("(max-width: 640px)");
		const f = () => setN(m.matches);
		f();
		m.addEventListener("change", f);
		return () => m.removeEventListener("change", f);
	}, []);
	return n;
}
var SUGARY = [
	{
		id: "can",
		name: "Can of pop",
		short: "the can of pop",
		kcal: 140,
		src: "Coca-Cola, 12 fl oz can (coca-cola.com)"
	},
	{
		id: "20oz",
		name: "20 oz pop",
		short: "the 20 oz pop",
		kcal: 240,
		src: "Coca-Cola, 20 fl oz bottle (coca-cola.com)"
	},
	{
		id: "sbux",
		name: "Starbucks drink",
		short: "the Starbucks drink",
		kcal: 380,
		src: "Grande Caramel Frappuccino, 16 fl oz (starbucks.com)"
	},
	{
		id: "gulp",
		name: "Big Gulp",
		short: "the Big Gulp",
		kcal: 420,
		src: "Coca-Cola fountain, 30 fl oz, no ice (Coca-Cola fountain nutrition chart)"
	},
	{
		id: "energy",
		name: "Full-sugar energy drink",
		short: "the energy drink",
		kcal: 230,
		src: "Monster Energy Original, 16 fl oz (monsterenergy.com)"
	},
	{
		id: "sweettea",
		name: "Sweet tea",
		short: "the sweet tea",
		kcal: 190,
		src: "Gold Peak Sweet Tea, 18.5 fl oz (coca-cola.com)"
	}
];
var ZERO = [
	{
		id: "unsweet",
		name: "Unsweet tea",
		short: "unsweet tea",
		kcal: 5,
		src: "Brewed black tea, 16 fl oz (USDA FDC 173227)"
	},
	{
		id: "water",
		name: "Water",
		short: "water",
		kcal: 0,
		src: "Water"
	},
	{
		id: "dpzcan",
		name: "Dr Pepper Zero can",
		short: "a Dr Pepper Zero can",
		kcal: 0,
		src: "Dr Pepper Zero Sugar, 12 fl oz label"
	},
	{
		id: "dpz20",
		name: "Dr Pepper Zero 20 oz",
		short: "a Dr Pepper Zero 20 oz",
		kcal: 0,
		src: "Dr Pepper Zero Sugar, 20 fl oz label"
	},
	{
		id: "zeroenergy",
		name: "Zero-cal energy drink",
		short: "a zero-cal energy drink",
		kcal: 10,
		src: "Monster Zero Ultra, 16 fl oz (monsterenergy.com)"
	},
	{
		id: "coffee",
		name: "Black coffee",
		short: "black coffee",
		kcal: 4,
		src: "Brewed coffee, 12 fl oz (USDA FDC 171890)"
	}
];
var SODA_SR = `Example: a ${SODA_PERSON.age}-year-old, 5'5", ${SODA_PERSON.weightLb}-lb woman with about ${SODA_PERSON.bodyFatPct}% body fat who is lightly active, so she needs about ${(Math.round(maintenance(SODA_PERSON) / 10) * 10).toLocaleString()} calories a day.`;
var curveCache = /* @__PURE__ */ new Map();
var curve = (diff, gain) => {
	const key = `${gain ? "g" : "l"}${diff}`;
	let c = curveCache.get(key);
	if (!c) {
		c = gain ? extraLbByDay(diff, 365, SODA_PERSON) : lostLbByDay(diff, 365, SODA_PERSON);
		curveCache.set(key, c);
	}
	return c;
};
var at = (c, d) => {
	const a = Math.floor(d), b = Math.min(365, a + 1);
	return c[a] + (c[b] - c[a]) * (d - a);
};
function Chips({ label, items, sel, onSel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sd-chipgrp",
		role: "group",
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sd-chiplab",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sd-chips",
			children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: `sd-chip${sel === x.id ? " on" : ""}`,
				"aria-pressed": sel === x.id,
				onClick: () => onSel(x.id),
				children: [x.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [x.kcal, " cal"] })]
			}, x.id))
		})]
	});
}
function SodaCard() {
	const [i, setI] = (0, import_react.useState)(365);
	const [keep, setKeep] = (0, import_react.useState)(false);
	const [sid, setSid] = (0, import_react.useState)("can");
	const [zid, setZid] = (0, import_react.useState)("water");
	const narrow = useNarrow();
	const G = narrow ? G_PH : G_PC;
	const S = SUGARY.find((x) => x.id === sid), Z = ZERO.find((x) => x.id === zid);
	const diff = Math.max(0, S.kcal - Z.kcal);
	const d = useTween(i), k = useTween(keep ? 1 : 0, 450);
	const g = curve(diff, true), l = curve(diff, false);
	const yNeed = Math.max(g[365], l[365]);
	const yMax = useTween(Math.max(4, Math.ceil(yNeed * 1.15 / 4) * 4), 450);
	const tg = useTween(at(g, i), 450), tl = useTween(at(l, i), 450);
	const val = (x) => k * at(g, x) - (1 - k) * at(l, x);
	const gx = (x) => G.l + x / 365 * (G.w - G.l - G.r);
	const gy = (lb) => G.t + (yMax - lb) / (2 * yMax) * (G.h - G.t - G.b);
	const lb = k * tg - (1 - k) * tl;
	const pts = [];
	for (let x = 0; x < d; x += 3) pts.push(`${gx(x).toFixed(1)},${gy(val(x) * (lb / (val(d) || 1) || 1)).toFixed(1)}`);
	pts.push(`${gx(d).toFixed(1)},${gy(lb).toFixed(1)}`);
	const col = keep ? GAIN : LOSS;
	const shown = Math.abs(lb) < .05 ? "0" : `${lb > 0 ? "+" : "−"}${fmtLb(Math.abs(lb))}`;
	const lx = gx(d), ly = gy(lb), anchor = lx > G.w - 90 ? "end" : "start";
	const yt = [
		1,
		.5,
		0,
		-.5,
		-1
	].map((f) => Math.round(f * yMax));
	const sign = keep ? "+" : "−";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "See how your favorite drink alone affects your day, week, month, and year"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Example: someone who needs about 2,000 calories a day. Pick a drink and a zero-calorie swap. If nothing else about their diet changes, keeping that drink or cutting it could add up like this."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mk-card sd-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sd-tags",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sd-tag",
						children: "Example person, not a prediction"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mk-adapt",
						style: { marginTop: 0 },
						children: "Includes metabolic adaptation"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sd-pick",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Their drink now",
						items: SUGARY,
						sel: sid,
						onSel: setSid
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Zero-calorie swap",
						items: ZERO,
						sel: zid,
						onSel: setZid
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sd-pills",
					role: "group",
					"aria-label": "Choose what happens",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `sd-pill keep${keep ? " on" : ""}`,
						"aria-pressed": keep,
						onClick: () => setKeep(true),
						children: ["Keep ", S.name.toLowerCase().startsWith("starbucks") ? "the Starbucks drink" : S.short]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `sd-pill sw${!keep ? " on" : ""}`,
						"aria-pressed": !keep,
						onClick: () => setKeep(false),
						children: ["Switch to ", Z.short]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sd-num",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mk-num",
							style: {
								color: keep ? "#f0936b" : "#5cc48e",
								fontSize: "3rem"
							},
							children: [shown, " lb"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sd-cal",
							children: [
								keep ? "Extra calories" : "Calories cut",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mk-small",
									children: [
										"(",
										S.kcal,
										" − ",
										Z.kcal,
										" = ",
										diff,
										" a day)"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sd-row",
							children: [
								["Day", 1],
								["Week", 7],
								["Month", 30],
								["Year", 365]
							].map(([n, dd]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sd-cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									style: { color: keep ? "#f0936b" : "#5cc48e" },
									children: [diff ? sign : "", (dd * diff).toLocaleString()]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n })]
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mk-small",
							style: { marginTop: ".3rem" },
							children: [
								diff ? sign : "",
								(Math.round(d) * diff).toLocaleString(),
								" cal by ",
								timeLabel(i).toLowerCase(),
								" · month = 30 days · weight change is an estimate"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "sd-graph",
					viewBox: `0 0 ${G.w} ${G.h}`,
					role: "img",
					"aria-label": `Line graph: estimated weight change about ${shown} pounds after ${timeLabel(i)}`,
					children: [
						yt.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: G.l,
							x2: G.w - G.r,
							y1: gy(v),
							y2: gy(v),
							stroke: "#ffffff14"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: G.l - 8,
							y: gy(v) + 4,
							textAnchor: "end",
							className: "sd-ax",
							children: v > 0 ? `+${v}` : v
						})] }, v)),
						TICKS.filter(([t]) => !narrow || t !== 30).map(([t, lab]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: gx(t),
							y: G.h - 10,
							textAnchor: t === 0 ? "start" : t === 365 ? "end" : "middle",
							className: "sd-ax",
							children: lab
						}, t)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: 12,
							y: G.t + (G.h - G.t - G.b) / 2,
							className: "sd-ax",
							transform: `rotate(-90 12 ${G.t + (G.h - G.t - G.b) / 2})`,
							textAnchor: "middle",
							children: "lb"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: G.l,
							x2: G.w - G.r,
							y1: gy(0),
							y2: gy(0),
							stroke: "#9fb0c4",
							strokeDasharray: "6 6",
							strokeWidth: 1.5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: G.w - G.r,
							y: gy(0) + (keep ? 18 : -8),
							textAnchor: "end",
							className: "sd-base",
							children: "2,000-calorie day, nothing else changes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
							points: pts.join(" "),
							fill: "none",
							stroke: col,
							strokeWidth: 4,
							strokeLinecap: "round",
							strokeLinejoin: "round",
							style: { transition: "stroke .4s" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: lx,
							cy: ly,
							r: 7,
							fill: col,
							stroke: "#0b1320",
							strokeWidth: 3,
							style: { transition: "fill .4s" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: anchor === "end" ? lx - 12 : lx + 12,
							y: ly + (lb >= 0 ? -10 : 22),
							textAnchor: anchor,
							className: "sd-pt",
							fill: col,
							children: [shown, " lb"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSlider, {
					id: "mkr",
					value: i,
					onChange: setI,
					describedBy: "mknote"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "mknote",
					className: "mk-small",
					style: { marginTop: "1rem" },
					children: "Rough educational estimate only. The math uses the calorie difference between the two drinks, every day. The pounds come from the simulator's energy-balance model, which includes metabolic adaptation, so both lines slow over time instead of adding up in a straight line. Real-life results vary from person to person. Not medical advice."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mk-small",
					style: {
						fontSize: ".78rem",
						opacity: .85
					},
					children: [SODA_SR, " Individual numbers will differ. Try the simulator to see your own."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mk-small",
					style: {
						fontSize: ".72rem",
						opacity: .75
					},
					children: [
						"Calories used: ",
						S.name,
						", ",
						S.kcal,
						" (",
						S.src,
						"); ",
						Z.name,
						", ",
						Z.kcal,
						" (",
						Z.src,
						"). Fountain drinks with ice usually have a bit less."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mk-btns",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "mk-btn p",
				to: "/hacks/$slug",
				params: { slug: "dont-drink-calories" },
				children: "Read the Health Hack →"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "mk-simlink",
			href: "/simulator/",
			children: "See your own numbers in the simulator (Beta) →"
		})
	] });
}
function ProteinCard() {
	const [i, setI] = (0, import_react.useState)(0);
	const c = useTween(i * 150), lb = useTween(PROT_LB[i]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "One small swap: lower-protein → higher-protein day"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Protein tends to help people feel full longer, so many end up eating a bit less without trying. Say someone switches to higher-protein meals and eats about 150 fewer calories a day on their own. Slide forward to see about how much they could lose."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mk-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSlider, {
					id: "mkp",
					value: i,
					onChange: setI,
					describedBy: "mkpnote"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mk-paths",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mk-path",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🥯 Stay lower-protein" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								style: { marginTop: ".6rem" },
								children: "Fullness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-meter",
								role: "img",
								"aria-label": "Fullness: lower",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
									width: "40%",
									background: "#d4a056"
								} })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								children: "Tends to get hungry sooner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-barbox",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mk-bar",
									style: {
										background: "#d4a056",
										height: "4px"
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-num",
								children: "0 lb"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								children: "no change in weight"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mk-path mk-win",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🍳 Switch to higher-protein" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								style: { marginTop: ".6rem" },
								children: "Fullness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-meter",
								role: "img",
								"aria-label": "Fullness: higher",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
									width: "80%",
									background: LOSS
								} })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								children: "Tends to feel full longer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-barbox",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mk-bar",
									style: {
										background: LOSS,
										height: barH(lb)
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-num mk-loss",
								children: [lb < .05 ? "0" : `−${fmtLb(lb)}`, " lb"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-small",
								children: [
									"could lose about ",
									fmtLb(lb),
									" lb · about ",
									Math.round(c).toLocaleString(),
									" fewer calories eaten so far"
								]
							}),
							ADAPT_NOTE
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					id: "mkpnote",
					className: "mk-small",
					style: { marginTop: "1rem" },
					children: [
						"Rough illustration only, not a prediction. In one study, people who raised protein from about 15% to 30% of their calories ate about 441 fewer calories a day on their own.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#fn1",
							"aria-label": "Footnote 3",
							children: "3"
						}) }),
						" To be careful, this uses a much smaller 150 calories a day, run through the simulator's energy-balance model with metabolic adaptation, so the loss slows over time. Results vary from person to person. Not medical advice."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mk-small",
					style: {
						fontSize: ".78rem",
						opacity: .85
					},
					children: EXAMPLE_NOTE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					id: "fn1",
					className: "mk-small",
					style: {
						fontSize: ".75rem",
						opacity: .8
					},
					children: [
						"3. Weigelt DS, et al. A high-protein diet induces sustained reductions in appetite, ad libitum caloric intake, and body weight. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Am J Clin Nutr." }),
						" 2005;82(1):41–48."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mk-btns",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "mk-btn p",
				to: "/hacks/$slug",
				params: { slug: "protein-label" },
				children: "Read the Health Hack: The Protein × 10 Trick →"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "mk-simlink",
			href: "/simulator/",
			children: "See your own numbers in the simulator (Beta) →"
		})
	] });
}
var SLIDES = [SodaCard, ProteinCard];
function SwapCarousel() {
	const [cur, setCur] = (0, import_react.useState)(0);
	const N = SLIDES.length;
	const x0 = (0, import_react.useRef)(null);
	const go = (n) => setCur(Math.max(0, Math.min(N - 1, n)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mk-wrap",
		id: "swap",
		"aria-roledescription": "carousel",
		"aria-label": "Everyday swaps",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mk-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Below are a few examples of simple changes that can make a big impact. These are just a few examples — try the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/simulator/",
						children: "Theosis Metabolic Simulator"
					}),
					" to see what changes unique to your own life could mean."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "mk-btn s mk-introbtn",
					href: "/simulator/",
					children: "Try the simulator →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mk-car",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mk-arrow l",
						"aria-label": "Previous swap",
						disabled: cur === 0,
						onClick: () => go(cur - 1),
						children: "‹"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mk-vp",
						onTouchStart: (e) => {
							if (e.target.type !== "range") x0.current = e.touches[0].clientX;
						},
						onTouchEnd: (e) => {
							if (x0.current == null) return;
							const dx = e.changedTouches[0].clientX - x0.current;
							if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
							x0.current = null;
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mk-track",
							style: { transform: `translateX(-${cur * 100}%)` },
							children: SLIDES.map((S, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-slide",
								role: "group",
								"aria-roledescription": "slide",
								"aria-label": `Swap ${j + 1} of ${N}`,
								"aria-hidden": j !== cur,
								inert: j !== cur ? true : void 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(S, {})
							}, j))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mk-arrow r",
						"aria-label": "Next swap",
						disabled: cur === N - 1,
						onClick: () => go(cur + 1),
						children: "›"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mk-dots",
				children: SLIDES.map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `mk-dot${j === cur ? " on" : ""}`,
					"aria-label": `Swap ${j + 1}`,
					"aria-current": j === cur ? "true" : void 0,
					onClick: () => go(j)
				}, j))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mk-count",
				"aria-live": "polite",
				children: [
					"Swap ",
					cur + 1,
					" of ",
					N,
					" · tap the arrows or swipe"
				]
			})
		]
	});
}
var steps = [
	{
		slug: "where-to-start",
		title: "Where to Start",
		body: "Pick one small thing, not ten."
	},
	{
		slug: "dont-drink-calories",
		title: "Don't Drink Calories",
		body: "The soda swap above, plus easy zero-calorie drink ideas."
	},
	{
		slug: "protein-label",
		title: "The Protein × 10 Trick",
		body: "A quick way to read a food label in the grocery aisle."
	},
	{
		slug: "fast-food",
		title: "Fast Food Hacks",
		body: "Better picks for busy days on the road."
	},
	{
		slug: "exercise",
		title: "Exercise Hacks",
		body: "Simple ways to add movement into a hectic week."
	}
];
function Steps() {
	const ref = (0, import_react.useRef)(null);
	const [anim, setAnim] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		setAnim(true);
		const io = new IntersectionObserver((es) => es.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("in");
				io.unobserve(e.target);
			}
		}), { threshold: .2 });
		el.querySelectorAll(".mk-ms").forEach((m) => io.observe(m));
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mk-wrap",
		id: "steps",
		style: { paddingTop: "1rem" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mk-h2",
				children: "Small steps that stack"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mk-sub",
				children: "Pick any one and start today. Each step stacks on the last. No waiting, no all-or-nothing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref,
				className: `mk-tl${anim ? " mk-anim" : ""}`,
				children: steps.map((s, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mk-ms",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/hacks/$slug",
						params: { slug: s.slug },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-when",
								children: ["Step ", j + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: s.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mk-small",
								children: s.body
							})
						]
					})
				}, s.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mk-btns",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "mk-btn s",
					to: "/hacks",
					children: "See all Health Hacks →"
				})
			})
		]
	});
}
function Toolbox() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "tools",
		className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mk-eyebrow",
				children: "Tools"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
				children: "The Health Toolbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "A few tools to see the numbers behind everyday choices."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mk-feat md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mk-ribbon",
							children: "Pro version coming soon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "mk-art",
							href: "/simulator/",
							"aria-label": "Open the simulator",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/images/sim-card.svg",
								alt: "Illustration: a figure beside two projection lines over time",
								width: 480,
								height: 300,
								style: {
									display: "block",
									width: "100%",
									height: "auto"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-2xl font-semibold uppercase",
								children: ["Metabolic Simulator", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mk-hp",
									children: "Beta"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								style: { maxWidth: "44rem" },
								children: tools[0].body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mk-pro",
								children: "Coming in Pro: AI-powered projections, a personalized learning plan, in-app progress tracking, and a phone app."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-btns",
								style: { marginTop: "1rem" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "mk-btn p",
									href: "/simulator/",
									children: "Try it free →"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mk-small",
								style: {
									marginTop: ".75rem",
									fontSize: ".78rem"
								},
								children: "Educational tools, not medical advice."
							})
						] })
					]
				}), tools.slice(1).map((t) => {
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
				})]
			})
		]
	});
}
var why = [
	{
		icon: Clock,
		title: "Scroll forward through time",
		body: "Move ahead week by week and month by month to see how daily choices about food, movement, and habits might affect your body over time."
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
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "why",
		className: "mx-auto max-w-6xl px-5 pb-16 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mk-eyebrow",
				children: "Why"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold uppercase sm:text-4xl",
				children: "Why Theosis Health"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-3",
				children: why.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: card,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-7 text-health",
							"aria-hidden": "true"
						}),
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
			})
		]
	});
}
//#endregion
export { Home as component };
