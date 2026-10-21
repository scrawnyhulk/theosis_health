import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { r as SiteShell } from "./site-shell-DrGfqXSO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Cpr9P5mj.js
var import_jsx_runtime = require_jsx_runtime();
var CONTACT_EMAIL = "nick@theosishealth.com";
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-5 py-16 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-health px-4 py-2 font-semibold text-health",
				children: "DRAFT: contact address not final. Nick to choose."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-4xl font-semibold uppercase",
				children: "Contact"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Questions or feedback about the tools? Email us at:"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${CONTACT_EMAIL}`,
				className: "mt-2 inline-block text-lg font-medium text-health",
				children: CONTACT_EMAIL
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Theosis Health is an education company and doesn’t provide medical care. Please don’t send personal health information. For medical questions, talk with your healthcare provider."
			})
		]
	}) });
}
//#endregion
export { Page as component };
