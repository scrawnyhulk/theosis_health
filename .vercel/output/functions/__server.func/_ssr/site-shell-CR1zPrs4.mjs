import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as X, s as Menu } from "../_libs/lucide-react.mjs";
import { i as site } from "./router-D3u_CDkt.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-CR1zPrs4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var data = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "MedicalBusiness",
			"@id": `${site.url}/#business`,
			name: "Theosis Medical, LLC",
			url: site.url,
			email: site.email,
			telephone: "+1-765-487-0777",
			description: site.description,
			image: `${site.url}/images/logo.jpg`,
			founder: { "@id": `${site.url}/#nick` },
			areaServed: [
				"Illinois",
				"Wisconsin",
				"Michigan",
				"Indiana"
			]
		},
		{
			"@type": "Person",
			"@id": `${site.url}/#nick`,
			name: "Nick Holwey",
			honorificSuffix: "PA-C",
			jobTitle: "Emergency Medicine Physician Associate",
			description: site.description,
			image: `${site.url}/images/nick.jpg`,
			url: `${site.url}/#about`,
			worksFor: { "@id": `${site.url}/#business` },
			alumniOf: [{
				"@type": "CollegeOrUniversity",
				name: "Wichita State University"
			}, {
				"@type": "CollegeOrUniversity",
				name: "University of Illinois"
			}]
		},
		{
			"@type": "WebSite",
			name: site.name,
			url: site.url,
			description: site.description,
			publisher: { "@id": `${site.url}/#business` }
		}
	]
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
/** Sister-site lockup: same shield as Theosis Medical, wordmark set in CSS. */
function LogoLockup({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex h-12 items-center gap-2 sm:h-14", className),
		"aria-label": "Theosis Health",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/images/header-shield.png",
			alt: "",
			className: "no-outline h-full w-auto object-contain"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col items-stretch leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-b from-white via-slate-300 to-slate-500 bg-clip-text font-display text-2xl font-bold tracking-[0.08em] text-transparent sm:text-3xl",
				children: "THEOSIS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-0.5 flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-health" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[10px] font-semibold tracking-[0.45em] text-health sm:text-xs",
						children: "HEALTH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-health" })
				]
			})]
		})]
	});
}
var MEDICAL = "https://theosismedical.com";
var ABOUT_CLINICIAN = `${MEDICAL}/#about`;
var CONTACT = `${MEDICAL}/#contact`;
var healthNav = [
	{
		href: "/simulator/",
		label: "Simulator"
	},
	{
		href: "/simulator/pft-inside/",
		label: "Fat Threshold"
	},
	{
		href: "/fat-burn-calculator/",
		label: "Fat-burn calculator"
	}
];
var l = "text-sm text-ink-muted hover:text-ink-fg";
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-ink text-ink-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 border-t border-border px-5 py-10 sm:px-8 md:flex-row md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm text-ink-muted",
						children: "Education only, not medical advice. Talk with your healthcare provider."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/simulator/",
						className: l,
						children: "Metabolic Simulator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/simulator/pft-inside/",
						className: l,
						children: "Personal Fat Threshold model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						className: l,
						children: "Holwey’s Handy Health Hacks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/fat-burn-calculator/",
						className: l,
						children: "Fat-burn calculator"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 text-sm text-ink-muted md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: ABOUT_CLINICIAN,
						className: l,
						children: "About the clinician"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: CONTACT,
						className: l,
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: MEDICAL,
						className: l,
						children: "Theosis Medical (clinical / locums)"
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/disclaimer",
						className: l,
						children: "Disclaimer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						site.year,
						" Theosis Health LLC · Illinois"
					] })
				]
			})]
		})
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
var plaqueShell = "relative inline-flex items-center overflow-hidden rounded-[3px] border border-white/10 leading-none shadow-[2px_3px_0_0_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.16)]";
var plaqueBg = {
	backgroundColor: "rgb(8 13 20 / 0.72)",
	backgroundImage: "url(/images/navy-grain.jpg)",
	backgroundSize: "420px"
};
function HolweyHacksMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(plaqueShell, "-rotate-2 items-center justify-center px-2.5 py-1.5 transition-[transform,box-shadow,background-color,border-color] duration-150", "group-hover:rotate-0 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[2px_3px_0_0_rgb(0_0_0_/_0.3)]", className),
		style: plaqueBg,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
			style: { backgroundColor: "#2a7ae0" },
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative font-display text-[16px] font-semibold tracking-[0.16em] uppercase sm:text-[18px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hh-metal-blue",
				children: "H"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hh-metal",
				children: "ealth Hacks"
			})]
		})]
	});
}
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
var item = "shrink-0 text-sm font-medium tracking-wide text-muted uppercase transition-colors duration-150 hover:text-fg";
var mItem = "flex min-h-12 items-center border-b border-border text-base font-medium text-fg";
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const close = () => setOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex min-h-11 shrink-0 items-center",
					onClick: close,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-4 whitespace-nowrap xl:flex",
					"aria-label": "Primary",
					children: [
						healthNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: n.href,
							className: item,
							children: n.label
						}, n.href)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hacks",
							className: "group shrink-0",
							"aria-label": "Health Hacks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HolweyHacksMark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ABOUT_CLINICIAN,
							className: item,
							children: "About the clinician"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "invert",
					size: "sm",
					className: "hidden md:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: CONTACT,
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
					healthNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: n.href,
						className: mItem,
						children: n.label
					}, n.href)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hacks",
						className: "group flex min-h-12 items-center border-b border-border py-2",
						onClick: close,
						"aria-label": "Health Hacks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HolweyHacksMark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: ABOUT_CLINICIAN,
						className: mItem,
						children: "About the clinician"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: CONTACT,
						className: "flex min-h-12 items-center text-base font-medium text-accent",
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
export { cn as a, SiteShell as i, Button as n, HacksPlaque as r, ABOUT_CLINICIAN as t };
