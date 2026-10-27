import { i as __toESM } from "../_runtime.mjs";
import { c as hackCovers, l as hacks } from "./hacks-BTF2hTRc.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { T as ArrowRight, b as Clock, g as FlaskConical, h as Footprints } from "../_libs/lucide-react.mjs";
import { a as SiteShell, i as NavPlaque, r as NavIcon } from "./site-shell-RWexaFBk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C-bHN4bC.js
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
var LB = 2.2046226218;
var RHO_F = 4250 * LB;
var RHO_L = 1800;
var TEF_BETA = .1;
var AT_BETA_UP = .2;
var AT_UP_MAXEXCESS = 1e3;
var AT_TAU = 14;
var AT_CAP = .25;
var EXAMPLE = {
	sex: "m",
	age: 40,
	heightCm: 175.3,
	weightLb: 180,
	bodyFatPct: 25,
	lightActivityKcal: 250
};
/** Example person for the soda card: maintenance about 2,000 kcal/day. */
var SODA_PERSON = {
	sex: "f",
	age: 40,
	heightCm: 165.1,
	weightLb: 170,
	bodyFatPct: 35,
	lightActivityKcal: 250
};
var bmrP = (P, kg) => 10 * kg + 6.25 * P.heightCm - 5 * P.age + (P.sex === "m" ? 5 : -161);
var tdeeP = (P, kg) => bmrP(P, kg) * 1.2 + P.lightActivityKcal;
/** Maintenance calories at starting weight. */
var maintenance = (P) => tdeeP(P, P.weightLb / LB);
/** Extra pounds vs staying at maintenance, for each day 0..365, when eating `surplus` kcal/day more. */
function extraLbByDay(surplus, days = 365, P = EXAMPLE) {
	const tdee = (kg) => tdeeP(P, kg);
	const w0 = P.weightLb / LB;
	let F = w0 * P.bodyFatPct / 100, L = w0 - F, adapt = 0;
	const ei0 = tdee(w0), intake = ei0 + surplus;
	const out = [0];
	for (let d = 0; d < days; d++) {
		const t = tdee(F + L);
		const target = -Math.min(AT_CAP * t, AT_BETA_UP * Math.min(intake - ei0, AT_UP_MAXEXCESS));
		adapt += (target - adapt) / AT_TAU;
		const E = intake - (t - adapt - TEF_BETA * (ei0 - intake));
		const pm = 10.4 / (10.4 + F);
		const dF = E / (RHO_F + RHO_L * pm / (1 - pm));
		F += dF;
		L += dF * pm / (1 - pm);
		out.push((F + L - w0) * LB);
	}
	return out;
}
var AT_BETA = .14;
/** Pounds lost vs staying at maintenance, for each day 0..365, when eating `cut` kcal/day less. Includes metabolic adaptation. */
function lostLbByDay(cut, days = 365, P = EXAMPLE) {
	const tdee = (kg) => tdeeP(P, kg);
	const w0 = P.weightLb / LB;
	let F = w0 * P.bodyFatPct / 100, L = w0 - F, adapt = 0;
	const ei0 = tdee(w0), intake = ei0 - cut;
	const out = [0];
	for (let d = 0; d < days; d++) {
		const t = tdee(F + L);
		const target = Math.min(AT_CAP * t, AT_BETA * Math.max(0, t - intake));
		adapt += (target - adapt) / AT_TAU;
		const E = intake - (t - adapt - TEF_BETA * (ei0 - intake));
		const pm = 10.4 / (10.4 + F);
		const dF = E / (RHO_F + RHO_L * pm / (1 - pm));
		F += dF;
		L += dF * pm / (1 - pm);
		out.push((w0 - F - L) * LB);
	}
	return out;
}
var SODA_MAINT = Math.round(maintenance(SODA_PERSON) / 10) * 10;
var SODA_MAINT_SHOWN = Math.round(SODA_MAINT / 100) * 100;
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 max-w-2xl text-ink-fg/85",
									children: ["We’ve all heard the advice: eat less, move more. Daily life makes it more complicated than that. Most of us have a general sense of what a “healthy diet” looks like, but putting it into practice day to day can be hard. Small food choices that don’t seem significant can add up more than we realize, and research shows metabolism can start drifting off track years before a diagnosis of type 2 diabetes.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#wf1",
										"aria-label": "Footnote 1",
										children: "1"
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 max-w-2xl text-ink-fg/85",
									children: [
										"If the human body were a machine, protein would be the parts, and carbohydrates and fats would be the fuel. Genetics help set how much fuel each person can safely store. Once that capacity is exceeded, fat tends to build up in organs like the liver and pancreas, which can contribute to insulin resistance and type 2 diabetes.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#wf2",
											"aria-label": "Footnote 2",
											children: "2"
										}) }),
										" These changes often develop quietly, before obvious symptoms appear. ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "/simulator/pft-inside/",
											className: "font-medium text-health underline underline-offset-2 hover:no-underline",
											children: "See what happens inside as fat builds up →"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-ink-fg/85",
									children: "Theosis Health helps you look under the hood: how the human body works, what can knock it off track, and where simple changes can help. We pair clear explanations with practical tools, so you can focus on manageable choices that make a meaningful difference. It starts with knowing what matters and making it work in real life."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-ink-fg/85",
									children: "Below are a couple of simple choices that can quietly derail our health, or be low-hanging fruit that moves things in the right direction, even if everything else stays the same."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mk-chips",
									"aria-label": "Quick facts",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "40.1 million" }),
											" people in the US have diabetes (2023)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf3",
												"aria-label": "Footnote 3",
												children: "3"
											}) })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "115.2 million" }),
											" US adults have prediabetes",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf3",
												"aria-label": "Footnote 3",
												children: "3"
											}) })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "About 1 in 3" }),
											" US adults (34.7%) have metabolic syndrome (2011–2016)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#wf4",
												"aria-label": "Footnote 4",
												children: "4"
											}) })
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									className: "mk-fn",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											id: "wf1",
											children: [
												"Tabák AG, et al. Trajectories of glycaemia, insulin sensitivity, and insulin secretion before diagnosis of type 2 diabetes: an analysis from the Whitehall II study. ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Lancet." }),
												" 2009;373(9682):2215–2221."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											id: "wf2",
											children: [
												"Taylor R, Holman RR. Normal weight individuals who develop type 2 diabetes: the personal fat threshold. ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Clin Sci (Lond)." }),
												" 2015;128(7):405–410."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											id: "wf3",
											children: "CDC. National Diabetes Statistics Report (updated Sept 16, 2026)."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											id: "wf4",
											children: [
												"Hirode G, Wong RJ. Trends in the prevalence of metabolic syndrome in the United States, 2011–2016. ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "JAMA." }),
												" 2020;323(24):2526–2528."
											]
										})
									]
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
		src: "Grande Caramel Frappuccino, 16 fl oz, whole milk and whipped cream (starbucks.com)"
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
var SODA_SR = `Example: a ${SODA_PERSON.age}-year-old, 5'5", ${SODA_PERSON.weightLb}-lb person with about ${SODA_PERSON.bodyFatPct}% body fat who is lightly active, so they need about ${SODA_MAINT_SHOWN.toLocaleString()} calories a day.`;
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
var PAIR = {
	can: "dpzcan",
	"20oz": "dpz20",
	sbux: "coffee",
	gulp: "water",
	energy: "zeroenergy",
	sweettea: "unsweet"
};
function SodaCard() {
	const [i, setI] = (0, import_react.useState)(365);
	const [sid, setSid] = (0, import_react.useState)("can");
	const [zid, setZid] = (0, import_react.useState)(PAIR.can);
	const narrow = useNarrow();
	const G = narrow ? G_PH : G_PC;
	const S = SUGARY.find((x) => x.id === sid), Z = ZERO.find((x) => x.id === zid);
	const pick = (id) => {
		setSid(id);
		setZid(PAIR[id] ?? "water");
	};
	const diff = Math.max(0, S.kcal - Z.kcal);
	const d = useTween(i);
	const g = curve(S.kcal, true), l = curve(diff, false);
	const yMax = useTween(Math.max(4, Math.ceil(Math.max(g[365], l[365]) * 1.15 / 4) * 4), 450);
	const tg = useTween(at(g, i), 450), tl = useTween(at(l, i), 450);
	const gx = (x) => G.l + x / 365 * (G.w - G.l - G.r);
	const gy = (lb) => G.t + (yMax - lb) / (2 * yMax) * (G.h - G.t - G.b);
	const line = (c, s, end) => {
		const p = [];
		const k = (x) => s * at(c, x) * (end / (at(c, d) || 1) || 1);
		for (let x = 0; x < d; x += 3) p.push(`${gx(x).toFixed(1)},${gy(k(x)).toFixed(1)}`);
		p.push(`${gx(d).toFixed(1)},${gy(s * end).toFixed(1)}`);
		return p.join(" ");
	};
	const lbTxt = (v, s) => Math.abs(v) < .05 ? "0" : `${s}${fmtLb(Math.abs(v))}`;
	const keepTxt = lbTxt(tg, "+"), swapTxt = lbTxt(tl, "−");
	const lx = gx(d), anchor = lx > G.w - 90 ? "end" : "start";
	const yt = [
		1,
		.5,
		0,
		-.5,
		-1
	].map((f) => Math.round(f * yMax));
	const when = timeLabel(i).toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "One daily drink, two stories"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Same example person, same drink. What tends to happen depends on what changes."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mk-card sd-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "sd-now",
					className: "sd-step",
					style: { display: "block" },
					children: "The drink"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sd-selwrap",
					style: {
						maxWidth: "26rem",
						margin: ".4rem 0 1rem"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "sd-now",
						className: "sd-select",
						value: S.id,
						onChange: (e) => pick(e.target.value),
						children: SUGARY.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: x.id,
							children: [
								x.name,
								" (",
								x.kcal,
								" cal)"
							]
						}, x.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "st-grid",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "st-card keep",
						"aria-labelledby": "st-a",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "st-a",
								className: "st-tag",
								children: "Story A · Adding a drink"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "st-steps",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"A person’s weight is steady. They eat about ",
									SODA_MAINT_SHOWN.toLocaleString(),
									" calories a day, enough to maintain."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"They add one ",
									S.name.toLowerCase(),
									" a day and eat the same otherwise: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
										"+",
										S.kcal,
										" cal a day"
									] }),
									"."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "st-out",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["After ", when] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [keepTxt, " lb"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "The extra calories tend to add up to weight gain." })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "st-card swap",
						"aria-labelledby": "st-b",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "st-b",
								className: "st-tag",
								children: "Story B · Switching a drink"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "st-steps",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"Their weight is stuck, steady while they drink one ",
									S.name.toLowerCase(),
									" a day."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "sd-swap",
										children: "They switch to"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sd-selwrap st-inline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											id: "sd-swap",
											className: "sd-select",
											value: Z.id,
											onChange: (e) => setZid(e.target.value),
											children: ZERO.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: x.id,
												children: [
													x.name,
													" (",
													x.kcal,
													" cal)"
												]
											}, x.id))
										})
									}),
									" ",
									"and don’t replace those calories: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
										"−",
										diff,
										" cal a day"
									] }),
									"."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "st-out",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["After ", when] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [swapTxt, " lb"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "The swap doesn’t burn fat. Removing those calories creates a deficit, which tends to lead to weight loss." })
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "st-legend mk-small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "k",
							children: "●"
						}),
						" Story A: add it ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "s",
							children: "●"
						}),
						" Story B: switch it"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "sd-graph",
					viewBox: `0 0 ${G.w} ${G.h}`,
					role: "img",
					"aria-label": `Line graph after ${when}: Story A, adding ${S.short}, about ${keepTxt} pounds; Story B, switching to ${Z.short}, about ${swapTxt} pounds`,
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
							points: line(g, 1, tg),
							fill: "none",
							stroke: GAIN,
							strokeWidth: 4,
							strokeLinecap: "round",
							strokeLinejoin: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
							points: line(l, -1, tl),
							fill: "none",
							stroke: LOSS,
							strokeWidth: 4,
							strokeLinecap: "round",
							strokeLinejoin: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: lx,
							cy: gy(tg),
							r: 7,
							fill: GAIN,
							stroke: "#0b1320",
							strokeWidth: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: lx,
							cy: gy(-tl),
							r: 7,
							fill: LOSS,
							stroke: "#0b1320",
							strokeWidth: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: anchor === "end" ? lx - 12 : lx + 12,
							y: gy(tg) - 10,
							textAnchor: anchor,
							className: "sd-pt",
							fill: GAIN,
							children: [
								"A ",
								keepTxt,
								" lb"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: anchor === "end" ? lx - 12 : lx + 12,
							y: gy(-tl) + 22,
							textAnchor: anchor,
							className: "sd-pt",
							fill: LOSS,
							children: [
								"B ",
								swapTxt,
								" lb"
							]
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
					children: "Rough educational estimate for an example person, not a prediction. Story A uses the drink’s calories on top of maintenance; Story B uses the calories removed by the swap, every day, with everything else the same. The pounds come from the simulator's energy-balance model, which includes metabolic adaptation, so both lines slow over time instead of adding up in a straight line. Real-life results vary from person to person. Not medical advice. Method based on Hall KD et al., Lancet 2011;378:826–837, which found the old 3,500-calories-per-pound rule overestimates long-term change."
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
var F = {
	flakes: {
		name: "Frosted flakes cereal, 1½ cups",
		g: 62,
		fdc: 172990,
		per: [
			389,
			4.25,
			.87,
			90.2,
			1.2
		]
	},
	milk: {
		name: "2% milk, 1 cup",
		g: 244,
		fdc: 171267,
		per: [
			50,
			3.3,
			1.98,
			4.8,
			0
		]
	},
	eggs: {
		name: "3 large eggs, scrambled",
		g: 183,
		fdc: 172187,
		per: [
			149,
			9.99,
			10.98,
			1.61,
			0
		]
	},
	bagel: {
		name: "Plain bagel, medium",
		g: 105,
		fdc: 174899,
		per: [
			264,
			10.56,
			1.32,
			52.38,
			1.6
		]
	},
	cream: {
		name: "Cream cheese, 2 tbsp",
		g: 29,
		fdc: 173418,
		per: [
			350,
			6.15,
			34.44,
			5.52,
			0
		]
	},
	greek: {
		name: "Plain nonfat Greek yogurt, 6 oz",
		g: 170,
		fdc: 2705424,
		per: [
			59,
			10.3,
			.37,
			3.64,
			0
		]
	},
	blue: {
		name: "Blueberries, ½ cup",
		g: 74,
		fdc: 171711,
		per: [
			57,
			.74,
			.33,
			14.49,
			2.4
		]
	},
	muffin: {
		name: "Blueberry muffin, large",
		g: 139,
		fdc: 172765,
		per: [
			375,
			4.49,
			16.07,
			53,
			1.1
		]
	},
	cottage1: {
		name: "2% cottage cheese, 1 cup",
		g: 226,
		fdc: 172182,
		per: [
			81,
			10.45,
			2.27,
			4.76,
			0
		]
	},
	mac: {
		name: "Macaroni and cheese, 1 cup",
		g: 230,
		fdc: 2708811,
		per: [
			223,
			8.68,
			10.5,
			23.1,
			1.2
		]
	},
	chicken: {
		name: "Roasted chicken breast, 1 cup diced",
		g: 140,
		fdc: 171477,
		per: [
			165,
			31.02,
			3.57,
			0,
			0
		]
	},
	romaine: {
		name: "Romaine, 2 cups (no dressing)",
		g: 94,
		fdc: 169247,
		per: [
			17,
			1.23,
			.3,
			3.29,
			2.1
		]
	},
	burger: {
		name: "Fast-food cheeseburger",
		g: 127,
		fdc: 170691,
		per: [
			270,
			13.49,
			12.9,
			25.46,
			1.9
		]
	},
	fries: {
		name: "French fries, 1 regular order",
		g: 110,
		fdc: 2709461,
		per: [
			312,
			3.43,
			14.7,
			41.4,
			3.8
		]
	},
	tuna: {
		name: "Tuna in water, 1 can drained",
		g: 113,
		fdc: 171986,
		per: [
			116,
			25.51,
			.82,
			0,
			0
		]
	},
	cottageH: {
		name: "2% cottage cheese, ½ cup",
		g: 113,
		fdc: 172182,
		per: [
			81,
			10.45,
			2.27,
			4.76,
			0
		]
	},
	grilled: {
		name: "Grilled cheese sandwich",
		g: 116,
		fdc: 2705804,
		per: [
			368,
			13.4,
			23.3,
			26.4,
			1.2
		]
	},
	turkey: {
		name: "Sliced turkey breast, 4 oz",
		g: 113,
		fdc: 172941,
		per: [
			106,
			14.81,
			3.77,
			2.2,
			0
		]
	},
	pizza: {
		name: "3 slices, medium restaurant pizza",
		g: 264,
		fdc: 2708640,
		per: [
			282,
			11.7,
			11.9,
			32,
			2.3
		]
	},
	sirloin: {
		name: "Lean top sirloin, 6 oz cooked",
		g: 170,
		fdc: 168635,
		per: [
			188,
			30.29,
			6.55,
			0,
			0
		]
	},
	broccoli: {
		name: "Broccoli, 1 cup, boiled",
		g: 156,
		fdc: 169967,
		per: [
			35,
			2.38,
			.41,
			7.18,
			3.3
		]
	},
	rice: {
		name: "Fried rice, 2 cups",
		g: 332,
		fdc: 2708951,
		per: [
			174,
			3.84,
			3.19,
			32.5,
			1.1
		]
	},
	shrimp: {
		name: "Cooked shrimp, 6 oz",
		g: 170,
		fdc: 175180,
		per: [
			99,
			23.98,
			.28,
			.2,
			0
		]
	},
	veg: {
		name: "Mixed vegetables, 1 cup",
		g: 182,
		fdc: 170472,
		per: [
			65,
			2.86,
			.15,
			13.09,
			4.4
		]
	},
	burrito: {
		name: "2 bean-and-cheese burritos (frozen)",
		g: 258,
		fdc: 173336,
		per: [
			221,
			7.07,
			6.3,
			34.01,
			3.4
		]
	},
	salmon: {
		name: "Salmon, 6 oz cooked",
		g: 170,
		fdc: 175168,
		per: [
			206,
			22.1,
			12.35,
			0,
			0
		]
	},
	beans: {
		name: "Green beans, 1 cup",
		g: 125,
		fdc: 169141,
		per: [
			35,
			1.89,
			.28,
			7.88,
			3.2
		]
	}
};
var MEALS = [
	{
		id: "breakfast",
		label: "Breakfast",
		pairs: [
			{
				id: "cereal",
				label: "Cereal → eggs",
				lo: {
					title: "Frosted flakes and milk",
					items: [F.flakes, F.milk]
				},
				hi: {
					title: "Scrambled eggs",
					items: [F.eggs]
				}
			},
			{
				id: "bagel",
				label: "Bagel → Greek yogurt",
				lo: {
					title: "Bagel and cream cheese",
					items: [F.bagel, F.cream]
				},
				hi: {
					title: "Greek yogurt and berries",
					items: [F.greek, F.blue]
				}
			},
			{
				id: "muffin",
				label: "Muffin → cottage cheese",
				lo: {
					title: "Blueberry muffin",
					items: [F.muffin]
				},
				hi: {
					title: "Cottage cheese and berries",
					items: [F.cottage1, F.blue]
				}
			}
		]
	},
	{
		id: "lunch",
		label: "Lunch",
		pairs: [
			{
				id: "mac",
				label: "Mac and cheese → chicken salad",
				lo: {
					title: "Mac and cheese",
					items: [F.mac]
				},
				hi: {
					title: "Chicken and greens",
					items: [F.chicken, F.romaine]
				}
			},
			{
				id: "burger",
				label: "Burger and fries → tuna plate",
				lo: {
					title: "Cheeseburger and fries",
					items: [F.burger, F.fries]
				},
				hi: {
					title: "Tuna, greens and cottage cheese",
					items: [
						F.tuna,
						F.romaine,
						F.cottageH
					]
				}
			},
			{
				id: "grilled",
				label: "Grilled cheese → turkey plate",
				lo: {
					title: "Grilled cheese",
					items: [F.grilled]
				},
				hi: {
					title: "Turkey and cottage cheese",
					items: [F.turkey, F.cottageH]
				}
			}
		]
	},
	{
		id: "dinner",
		label: "Dinner",
		pairs: [
			{
				id: "pizza",
				label: "Pizza → steak",
				lo: {
					title: "Pepperoni pizza",
					items: [F.pizza]
				},
				hi: {
					title: "Steak and broccoli",
					items: [F.sirloin, F.broccoli]
				}
			},
			{
				id: "rice",
				label: "Fried rice → shrimp",
				lo: {
					title: "Fried rice",
					items: [F.rice]
				},
				hi: {
					title: "Shrimp and vegetables",
					items: [F.shrimp, F.veg]
				}
			},
			{
				id: "burrito",
				label: "Burritos → salmon",
				lo: {
					title: "Bean-and-cheese burritos",
					items: [F.burrito]
				},
				hi: {
					title: "Salmon and green beans",
					items: [F.salmon, F.beans]
				}
			}
		]
	}
];
var tot = (items) => {
	const s = [
		0,
		0,
		0,
		0,
		0
	];
	for (const f of items) f.per.forEach((v, j) => s[j] += v * f.g / 100);
	const [kcal, p, fat, carb, fib] = s;
	return {
		kcal: Math.round(kcal),
		p: Math.round(p)
	};
};
function MealSide({ kind, step, title, items, note, children }) {
	const t = tot(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `sd-side ${kind}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sd-step",
				children: step
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontWeight: 600,
					fontSize: "1.05rem"
				},
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "pm-items",
				children: items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f.name }, f.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pm-stats",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.kcal }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "calories" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [t.p, " g"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "protein" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mk-small",
				children: note
			}),
			children
		]
	});
}
function ProteinCard() {
	const [mid, setMid] = (0, import_react.useState)("breakfast");
	const [pid, setPid] = (0, import_react.useState)("cereal");
	const M = MEALS.find((m) => m.id === mid);
	const P = M.pairs.find((x) => x.id === pid) ?? M.pairs[0];
	const a = tot(P.lo.items), b = tot(P.hi.items);
	const dk = b.kcal - a.kcal, dp = b.p - a.p;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "Choose protein at every meal"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Everyday plates that are high in calories and low in protein tend to leave people hungry sooner. A protein-first swap tends to keep people full on fewer calories. Pick a meal, then a swap."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mk-card sd-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pm-tabs",
					role: "group",
					"aria-label": "Pick a meal",
					children: MEALS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pm-tab",
						"aria-pressed": m.id === mid,
						onClick: () => {
							setMid(m.id);
							setPid(m.pairs[0].id);
						},
						children: m.label
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pm-chips",
					role: "group",
					"aria-label": `${M.label} swaps`,
					children: M.pairs.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pm-chip",
						"aria-pressed": x.id === P.id,
						onClick: () => setPid(x.id),
						children: x.label
					}, x.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sd-vs",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealSide, {
							kind: "now",
							step: "High-calorie, low-protein",
							title: P.lo.title,
							items: P.lo.items,
							note: "Tends to leave people hungry sooner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sd-arrow",
							"aria-hidden": "true",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealSide, {
							kind: "swap",
							step: "Protein-first swap",
							title: P.hi.title,
							items: P.hi.items,
							note: "Tends to keep people full longer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pm-diff",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sd-step",
									children: "What the swap changes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sd-out",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sd-o swap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Protein" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
											dp >= 0 ? "+" : "−",
											Math.abs(dp),
											" g"
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `sd-o ${dk <= 0 ? "swap" : "keep"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Calories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [dk > 0 ? "+" : dk < 0 ? "−" : "", Math.abs(dk)] })]
									})]
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					id: "pmnote",
					className: "mk-small",
					style: { marginTop: "1rem" },
					children: [
						"Research shows people tend to eat less on their own when more of their calories come from protein: in one study, going from about 15% to 30% protein, people ate about 441 fewer calories a day.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#fn1",
							"aria-label": "Footnote 5",
							children: "5"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#fn2",
							"aria-label": "Footnote 6",
							children: "6"
						}) }),
						" Results vary. Education only, not medical advice."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mk-small",
					style: {
						fontSize: ".72rem",
						opacity: .75
					},
					children: [
						"Nutrients: USDA FoodData Central, per item: ",
						[...P.lo.items, ...P.hi.items].map((f) => `${f.name} (${f.g} g, FDC ${f.fdc})`).join("; "),
						". Brands, recipes and portions vary."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					id: "fn1",
					className: "mk-small",
					style: {
						fontSize: ".75rem",
						opacity: .8
					},
					children: [
						"5. Weigle DS, et al. A high-protein diet induces sustained reductions in appetite, ad libitum caloric intake, and body weight despite compensatory changes in diurnal plasma leptin and ghrelin concentrations. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Am J Clin Nutr." }),
						" 2005;82(1):41–48."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					id: "fn2",
					className: "mk-small",
					style: {
						fontSize: ".75rem",
						opacity: .8
					},
					children: [
						"6. Simpson SJ, Raubenheimer D. Obesity: the protein leverage hypothesis. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Obes Rev." }),
						" 2005;6(2):133–142."
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
		body: "Move ahead week by week and month by month to see how daily choices about food, movement, and habits might affect the human body over time."
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
