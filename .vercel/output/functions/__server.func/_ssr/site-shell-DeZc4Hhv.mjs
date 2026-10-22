import { i as __toESM } from "../_runtime.mjs";
import { h as nerdTopics, l as hacks, m as nerdGroups, x as site } from "./hacks-Dnwxk09X.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, n as require_react_dom, r as Slot } from "../_libs/@radix-ui/react-label+[...].mjs";
import { c as Menu, g as ChevronDown, o as Search, r as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region ../../workspace/theosishealth/node_modules/.nitro/vite/services/ssr/assets/site-shell-DeZc4Hhv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var data = {
	"@context": "https://schema.org",
	"@graph": [{
		"@type": "Organization",
		"@id": `${site.url}/#org`,
		name: "Theosis Health LLC",
		url: site.url,
		description: site.description,
		founder: {
			"@type": "Person",
			name: "Nick Holwey",
			honorificSuffix: "PA-C"
		}
	}, {
		"@type": "WebSite",
		name: site.name,
		url: site.url,
		description: site.description,
		publisher: { "@id": `${site.url}/#org` }
	}]
};
function JsonLd() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Theosis Health lockup: chrome cross-and-laurel mark with the THEOSIS / HEALTH wordmark (cut out from Nick's final logo). */
function LogoLockup({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/images/theosis-health-header-lockup.png",
		width: 900,
		height: 168,
		alt: "Theosis Health",
		className: cn("no-outline block h-[35px] w-auto object-contain object-left sm:h-[46px]", className)
	});
}
var l = "text-sm text-ink-muted hover:text-ink-fg";
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-ink text-ink-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 border-t border-border px-5 py-10 sm:px-8 md:flex-row md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/simulator/",
						className: l,
						children: "Metabolic Simulator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/simulator/pft-inside/",
						className: l,
						children: "Personal Fat Threshold Model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						className: l,
						children: "Health Hacks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/fat-burn-calculator/",
						className: l,
						children: "Maximal Fat Loss Calculator"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 text-sm text-ink-muted md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: l,
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: l,
						children: "Terms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: l,
						children: "Privacy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/consumer-health-privacy",
						className: l,
						children: "Consumer Health Privacy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/disclaimer",
						className: l,
						children: "Disclaimer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						children: ["Founded by Nick Holwey, PA-C, a licensed physician assistant. Education only, no medical care. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/disclaimer",
							className: "underline",
							children: "Medical Disclaimer"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto max-w-6xl px-5 pb-8 text-xs text-ink-muted sm:px-8",
			children: [
				"© ",
				site.year,
				" Theosis Health LLC · Educational content only, not medical advice. Theosis Health does not provide medical care."
			]
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			invert: "bg-steel text-ink hover:bg-steel/90",
			outline: "bg-transparent text-fg shadow-border hover:bg-fg/5",
			ghost: "bg-transparent text-fg hover:bg-fg/8",
			onInk: "bg-steel text-ink hover:bg-steel/90",
			onInkOutline: "bg-transparent text-ink-fg shadow-ink-ring hover:bg-ink-fg/8"
		},
		size: {
			default: "h-11 rounded-sm px-5",
			lg: "h-12 rounded-sm px-6",
			sm: "h-9 rounded-sm px-3.5",
			icon: "size-11 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function pack(title, ...parts) {
	return [title, ...parts.flatMap((p) => Array.isArray(p) ? p : p ? [p] : [])].join(" ").toLowerCase();
}
function topicText(topic) {
	const extra = [];
	if ("steps" in topic && topic.steps) for (const step of topic.steps) {
		extra.push(step.title);
		if ("kicker" in step && typeof step.kicker === "string") extra.push(step.kicker);
		if ("paragraphs" in step && Array.isArray(step.paragraphs)) extra.push(...step.paragraphs);
	}
	if ("extraImages" in topic && Array.isArray(topic.extraImages)) for (const img of topic.extraImages) {
		if ("title" in img && typeof img.title === "string") extra.push(img.title);
		if ("alt" in img && typeof img.alt === "string") extra.push(img.alt);
	}
	return pack(topic.title, topic.lede, topic.paragraphs, extra);
}
var index = [
	{
		id: "hacks-hub",
		section: "Health Hacks",
		title: "Health Hacks",
		blurb: "The 20% that actually moves the needle.",
		hrefKind: "hacks",
		haystack: pack("health hacks", "protein calories food exercise")
	},
	...hacks.flatMap((h) => h.slug === "nerd-out" ? [] : [{
		id: `hack-${h.slug}`,
		section: "Health Hacks",
		title: h.title,
		blurb: h.lede,
		hrefKind: "hack",
		slug: h.slug,
		haystack: pack(h.title, h.lede, h.paragraphs)
	}]),
	{
		id: "nerd-hub",
		section: "Nutritional Nerd Out",
		title: "Nutritional Nerd Out",
		blurb: "Mechanisms. How stuff actually works.",
		hrefKind: "nerd-hub",
		haystack: pack("nutritional nerd out", "nerd out", "atp protein diabetes cholesterol")
	},
	...nerdTopics.map((topic) => {
		const group = nerdGroups.find((g) => g.topicIds.includes(topic.id));
		return {
			id: `nerd-${topic.id}`,
			section: group?.title ?? "Nutritional Nerd Out",
			title: topic.title,
			blurb: topic.lede.split("\n")[0],
			hrefKind: "nerd",
			topic: topic.id,
			haystack: pack(topic.title, topic.lede, group?.title, topicText(topic))
		};
	})
];
function searchSite(query, limit = 12) {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const tokens = q.split(/\s+/).filter(Boolean);
	return index.map((item) => {
		let score = 0;
		const title = item.title.toLowerCase();
		if (title === q) score = 100;
		else if (title.startsWith(q)) score = 80;
		else if (title.includes(q)) score = 60;
		else if (tokens.every((t) => item.haystack.includes(t))) score = item.haystack.includes(q) ? 45 : 30;
		return {
			item,
			score
		};
	}).filter((row) => row.score > 0).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, limit).map((row) => {
		const { haystack: _h, ...hit } = row.item;
		return hit;
	});
}
function QuickFind() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [section, setSection] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	function close() {
		setOpen(false);
		setSection(null);
		setQuery("");
	}
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const t = window.setTimeout(() => inputRef.current?.focus(), 50);
		function onKey(e) {
			if (e.key === "Escape") close();
		}
		document.addEventListener("keydown", onKey);
		return () => {
			window.clearTimeout(t);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);
	const hits = searchSite(query);
	const searching = query.trim().length > 0;
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "fixed inset-0 z-40 bg-ink/40",
		"aria-label": "Close quick find",
		onClick: close
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		id: "quick-find-panel",
		"aria-label": "Quick find",
		className: cn("fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-border bg-ink shadow-ink-ring transition-transform duration-200 ease-out", open ? "translate-x-0" : "-translate-x-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 font-display text-2xl font-semibold tracking-wide uppercase",
					children: "Quick Find"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Close quick find",
					onClick: close,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "search",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search the site…",
						className: "h-11 w-full rounded-sm bg-fg/8 pr-3 pl-10 text-sm text-ink-fg placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-2",
				children: searching ? hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-3 py-6 text-sm text-muted",
					children: [
						"Nothing matches “",
						query.trim(),
						"”."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HitLink, {
					hit,
					onPick: close
				}) }, hit.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
					open: section === "hacks",
					label: "Health Hacks",
					onToggle: () => setSection((v) => v === "hacks" ? null : "hacks"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						onClick: close,
						className: "flex min-h-11 items-center px-3 text-sm text-accent",
						children: "All Health Hacks"
					}), hacks.map((h) => h.slug === "nerd-out" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/hacks/nerd-out",
						onClick: close,
						className: "flex min-h-11 items-center gap-3 px-3 text-sm leading-snug text-fg hover:bg-fg/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold text-accent",
							children: h.n
						}), h.title]
					}, h.slug) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/hacks/$slug",
						params: { slug: h.slug },
						onClick: close,
						className: "flex min-h-11 items-center gap-3 px-3 text-sm leading-snug text-fg hover:bg-fg/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold text-accent",
							children: h.n
						}), h.title]
					}, h.slug))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
					open: section === "nerd",
					label: "Nutritional Nerd Out",
					onToggle: () => setSection((v) => v === "nerd" ? null : "nerd"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks/nerd-out",
						onClick: close,
						className: "flex min-h-11 items-center px-3 text-sm text-accent",
						children: "All Nutritional Nerd Out"
					}), nerdGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-2 text-xs font-medium tracking-widest text-accent uppercase",
							children: group.title
						}), group.topicIds.map((id) => {
							const topic = nerdTopics.find((t) => t.id === id);
							if (!topic) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hacks/nerd-out/$topic",
								params: { topic: id },
								onClick: close,
								className: "flex min-h-11 items-center px-3 text-sm leading-snug text-fg hover:bg-fg/10",
								children: topic.title
							}, id);
						})]
					}, group.id))]
				})] })
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		className: "shrink-0",
		"aria-expanded": open,
		"aria-controls": "quick-find-panel",
		"aria-label": open ? "Close quick find" : "Quick find",
		onClick: () => setOpen((v) => !v),
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 28 20",
			className: "size-6",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 4h24M2 10h24M2 16h24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			})
		})
	}), mounted ? (0, import_react_dom.createPortal)(panel, document.body) : null] });
}
function HitLink({ hit, onPick }) {
	const className = "flex min-h-11 flex-col justify-center rounded-sm px-3 py-2 hover:bg-fg/10";
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[10px] font-medium tracking-widest text-accent uppercase",
		children: hit.section
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm leading-snug text-fg",
		children: hit.title
	})] });
	if (hit.hrefKind === "hacks") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/hacks",
		onClick: onPick,
		className,
		children: inner
	});
	if (hit.hrefKind === "hack") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/hacks/$slug",
		params: { slug: hit.slug },
		onClick: onPick,
		className,
		children: inner
	});
	if (hit.hrefKind === "nerd-hub") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/hacks/nerd-out",
		onClick: onPick,
		className,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/hacks/nerd-out/$topic",
		params: { topic: hit.topic },
		onClick: onPick,
		className,
		children: inner
	});
}
function SectionBlock({ open, label, onToggle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex min-h-11 w-full items-center justify-between rounded-sm px-3 text-left text-sm font-medium tracking-wide text-ink-fg uppercase hover:bg-fg/10",
			"aria-expanded": open,
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 text-accent transition-transform", open && "rotate-180") })]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pb-2",
			children
		}) : null]
	});
}
var plaqueShell = "relative inline-flex items-center overflow-hidden rounded-[3px] border border-white/10 leading-none shadow-[2px_3px_0_0_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.16)]";
var plaqueBg = {
	backgroundColor: "rgb(8 13 20 / 0.72)",
	backgroundImage: "url(/images/navy-grain.jpg)",
	backgroundSize: "420px"
};
function HacksPlaque({ title, className, compact, inline }) {
	const mark = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(plaqueShell, compact ? "gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2" : "gap-3 px-4 py-2.5 sm:px-5 sm:py-3", className),
		style: plaqueBg,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("shrink-0 rounded-full bg-accent", compact ? "h-4 w-[2px] sm:h-5" : "h-6 w-[3px] sm:h-8"),
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("relative whitespace-nowrap font-display font-semibold tracking-[0.16em] uppercase", compact ? "text-[15px] sm:text-[18px]" : "text-[22px] sm:text-[32px] lg:text-[36px]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hh-metal-blue",
				children: title.slice(0, 1)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hh-metal",
				children: title.slice(1)
			})]
		})]
	});
	if (compact || inline) return mark;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex w-full items-center gap-4",
		children: [mark, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden h-px min-w-8 flex-1 bg-border sm:block",
			"aria-hidden": true
		})]
	});
}
/** Nav plaque matching HealthHacksMark (grain plaque, metal type, blue first letter), straight at rest. featured = solid Theosis blue. */
function NavPlaque({ label, icon, size = "nav", featured, badge, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(plaqueShell, "gap-1.5 px-2 py-1.5 transition-[box-shadow,background-color,border-color,filter] duration-150", featured ? "border-[#79b4f6]/50 bg-[#2a7ae0] shadow-[0_0_14px_rgb(42_122_224_/_0.45),2px_3px_0_0_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.25)] group-hover:brightness-110 group-hover:shadow-[0_0_20px_rgb(42_122_224_/_0.6),2px_3px_0_0_rgb(0_0_0_/_0.4)]" : "group-hover:border-accent group-hover:bg-accent group-hover:shadow-[2px_3px_0_0_rgb(0_0_0_/_0.3)]", className),
		style: featured ? { backgroundImage: "linear-gradient(180deg, #3a8af0 0%, #2a7ae0 50%, #1f63bd 100%)" } : plaqueBg,
		children: [
			!featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
				style: { backgroundColor: "#2a7ae0" },
				"aria-hidden": true
			}) : null,
			icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative flex", featured ? "text-white" : "text-[#5b9cec] group-hover:text-white"),
				children: icon
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative font-display font-semibold uppercase", size === "nav" ? "text-[13px] tracking-[0.1em]" : "text-[16px] tracking-[0.14em]"),
				children: featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-white [text-shadow:0_1px_0_rgb(0_0_0_/_0.35)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[#0b2a55] [text-shadow:0_1px_0_rgb(255_255_255_/_0.35)]",
						children: label.slice(0, 1)
					}), label.slice(1)]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hh-metal-blue",
					children: label.slice(0, 1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hh-metal",
					children: label.slice(1)
				})] })
			}),
			badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative ml-0.5 rounded-full bg-[#2a7ae0] px-1.5 py-px text-[9px] font-bold tracking-wide text-white uppercase group-hover:bg-white group-hover:text-[#1f63bd]",
				children: badge
			}) : null
		]
	});
}
/** Top nav tools, after Health Hacks. */
var healthNav = [
	{
		href: "/simulator/",
		label: "Metabolic Simulator",
		icon: "pulse",
		badge: "Beta"
	},
	{
		href: "/simulator/pft-inside/",
		label: "Personal Fat Threshold Model",
		icon: "gauge",
		badge: void 0
	},
	{
		href: "/fat-burn-calculator/",
		label: "Maximal Fat Loss Calculator",
		icon: "flame",
		badge: void 0
	}
];
/** Small inline line icons for the top nav (aria-hidden, brand blue via text-health). */
function NavIcon({ name, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "16",
		height: "16",
		"aria-hidden": "true",
		focusable: "false",
		className: `shrink-0 ${className}`,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2.2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			name === "pulse" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12h4l2.5-6 4 12 2.5-6H21" }),
			name === "gauge" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 18a8 8 0 1 1 16 0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 18l4-5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "18",
					r: "1"
				})
			] }),
			name === "flame" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 21c-3.9 0-6.5-2.6-6.5-6 0-3.5 3-5.5 3.5-9 2 1.3 3 3 3 5 1-.8 1.6-2 1.7-3.3C16.4 9.6 18.5 12 18.5 15c0 3.4-2.6 6-6.5 6z" })
		]
	});
}
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const close = () => setOpen(false);
	const isHome = useRouterState({ select: (s) => s.location.pathname }) === "/";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 sm:gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickFind, {}),
					isHome ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "sr-only focus:not-sr-only focus:flex focus:min-h-11 focus:items-center",
						onClick: close,
						children: "Theosis Health home"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex min-h-11 shrink-0 items-center",
						onClick: close,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-3 whitespace-nowrap xl:flex",
						"aria-label": "Primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hacks",
							className: "group shrink-0",
							"aria-label": "Health Hacks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPlaque, { label: "Health Hacks" })
						}), healthNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: n.href,
							className: "group shrink-0",
							"aria-label": n.badge ? `${n.label} (${n.badge})` : n.label,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPlaque, {
								label: n.label,
								badge: n.badge,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, { name: n.icon })
							})
						}, n.href))]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "invert",
					size: "sm",
					className: "hidden md:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: "Contact"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "xl:hidden",
					"aria-expanded": open,
					"aria-controls": "mobile-nav",
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-nav",
			hidden: !open,
			className: cn("border-t border-border bg-bg/90 backdrop-blur-md xl:hidden", open ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-6xl flex-col px-5 py-3",
				"aria-label": "Mobile",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						className: "group flex min-h-12 items-center border-b border-border py-2",
						onClick: close,
						"aria-label": "Health Hacks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPlaque, {
							size: "menu",
							label: "Health Hacks"
						})
					}),
					healthNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: n.href,
						className: "group flex min-h-12 items-center border-b border-border py-2",
						"aria-label": n.badge ? `${n.label} (${n.badge})` : n.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavPlaque, {
							size: "menu",
							label: n.label,
							badge: n.badge,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, {
								name: n.icon,
								className: "size-5"
							})
						})
					}, n.href)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "flex min-h-12 items-center text-base font-medium text-accent",
						onClick: close,
						children: "Contact"
					})
				]
			})
		})]
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-svh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { SiteShell as a, NavPlaque as i, HacksPlaque as n, cn as o, NavIcon as r, Button as t };
