import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { _ as ArrowRight, l as Footprints, p as Clock, u as FlaskConical } from "../_libs/lucide-react.mjs";
import { r as SiteShell } from "./site-shell-Coxd6dm8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBQrPyXO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
							className: "mt-5 max-w-xl text-lg leading-relaxed text-ink-fg/90 sm:text-xl",
							children: "Simple tools and realistic Health Hacks to help re-inspire a healthy lifestyle while navigating a hectic life."
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
function SodaCard() {
	const [i, setI] = (0, import_react.useState)(0);
	const c = useTween(i * 140), lb = c / 3500;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "One small swap: soda or Starbucks vs diet or zero-calorie drinks"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Slide forward in time to see roughly how one sweet drink a day (a 12\xA0oz soda is about 140 calories) could add up, compared with a diet or zero-calorie drink instead."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mk-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSlider, {
					id: "mkr",
					value: i,
					onChange: setI,
					describedBy: "mknote"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mk-paths",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mk-path",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🥤 Soda or sweet coffee drink" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-barbox",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mk-bar",
									style: {
										background: "#d4a056",
										height: `${Math.max(4, lb / (51100 / 3500) * 100)}%`
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-num",
								children: [
									"+",
									fmtLb(lb),
									" lb"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-small",
								children: [Math.round(c).toLocaleString(), " extra calories so far"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mk-path",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🥤 Diet or zero-calorie drink" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-barbox",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mk-bar",
									style: {
										background: "#4587c6",
										height: "4px"
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-num",
								children: "+0 lb"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								children: "0 extra calories"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "mknote",
					className: "mk-small",
					style: { marginTop: "1rem" },
					children: "Rough educational estimate only: about 140 calories a day (a 12\xA0oz soda) vs 0 for diet or zero-calorie drinks. Many sweet coffee drinks run 200–400+ calories, so the real gap could be bigger, and roughly 3,500 calories ≈ 1 lb of fat. Real-life results are usually smaller and vary from person to person. Not medical advice."
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
	const c = useTween(i * 150), lb = c / 3500;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mk-h2",
			children: "One small swap: higher-protein day vs lower-protein day"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mk-sub",
			children: "Protein tends to help people feel full longer, so many end up eating a bit less without trying. Slide forward to see how that could add up."
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🍳 Higher-protein day" }),
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
									background: "#3d9a6a"
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
										background: "#4587c6",
										height: "4px"
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-num",
								children: "0 extra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mk-small",
								children: "baseline for comparison"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mk-path",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🥯 Lower-protein day" }),
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
										height: `${Math.max(4, lb / 16.5 * 100)}%`
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-num",
								children: [
									"+",
									Math.round(c).toLocaleString(),
									" cal"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mk-small",
								children: [
									"more calories eaten so far (about +",
									fmtLb(lb),
									" lb)"
								]
							})
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
							"aria-label": "Footnote 1",
							children: "1"
						}) }),
						" To be careful, this uses a much smaller 150 calories a day, and roughly 3,500 calories ≈ 1 lb of fat. Results vary from person to person and are often smaller. Not medical advice."
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
						"1. Weigelt DS, et al. A high-protein diet induces sustained reductions in appetite, ad libitum caloric intake, and body weight. ",
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
