/* Runs outside the app bundle: app globals come through window.__BP (see ui/56-lazy.js). */
with (window.__BP) {
// ---------- v7.6.55: A1c log. Dated entries the person types in, kept on this device. It gives no advice. US units (%).
// proposals-1125: this card is a view of the app's ONE A1c log (S.a1cLog, through window.__BP), shared with Step 1 and the Projection
// lab form. The newest result is the A1c the simulator uses. (The old separate "theosis-a1c" store is moved into it on load.)
const A1 = {
  load() { return a1cItems(); },
  save() { return true; },
  ui: { date: "", val: "", err: "", msg: "" },
};
const a1Today = () => a1cToday();
const a1Fmt = (d) => d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "date not entered";
function a1Chart(it) {
  it = it.filter((x) => x.date); if (it.length < 2) return "";
  const W = 300, H = 110, P = 22, t = it.map((x) => new Date(x.date + "T12:00:00").getTime()), v = it.map((x) => x.v), t0 = Math.min(...t), t1 = Math.max(...t), lo = Math.floor(Math.min(...v) - 0.3), hi = Math.ceil(Math.max(...v) + 0.3);
  const X = (x) => P + (t1 === t0 ? (W - 2 * P) / 2 : (x - t0) / (t1 - t0) * (W - 2 * P)), Y = (y) => H - P - (y - lo) / (hi - lo || 1) * (H - 2 * P);
  const pts = it.map((x, i) => `${X(t[i]).toFixed(1)},${Y(x.v).toFixed(1)}`);
  return `<svg class="a1-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="A1c entries over time, from ${it[0].v}% on ${a1Fmt(it[0].date)} to ${it[it.length - 1].v}% on ${a1Fmt(it[it.length - 1].date)}">
    <text x="2" y="${Y(hi) + 4}" class="ax">${hi}%</text><text x="2" y="${Y(lo) + 4}" class="ax">${lo}%</text>
    <polyline points="${pts.join(" ")}" fill="none" stroke="#6fa8ff" stroke-width="2"/>${pts.map((p) => `<circle cx="${p.split(",")[0]}" cy="${p.split(",")[1]}" r="3.5" fill="#6fa8ff"/>`).join("")}
    <text x="${P}" y="${H - 4}" class="ax">${a1Fmt(it[0].date)}</text><text x="${W - P}" y="${H - 4}" class="ax" text-anchor="end">${a1Fmt(it[it.length - 1].date)}</text></svg>`;
}
function a1cCardHtmlNow() {
  const it = A1.load(), u = A1.ui; if (!u.date) u.date = a1Today();
  return `<div class="v-card a1-card" id="a1-card"><h2>A1c log</h2><p class="hint">Write down A1c results from your lab reports to see them over time. This is the same A1c log as Step 1: your newest result is the A1c the simulator uses. It gives no advice. Talk with your healthcare provider about what your results mean.</p>
  <div class="a1-form"><label>Date of the test<input type="date" id="a1-date" value="${esc(u.date)}" max="${a1Today()}"></label><label>A1c (%)<input type="text" inputmode="decimal" id="a1-val" placeholder="e.g. 6.1" value="${esc(u.val)}"></label><button type="button" class="btn btn-primary" id="a1-save">Save</button></div>
  ${u.err ? `<p class="err" role="alert">${esc(u.err)}</p>` : u.msg ? `<p class="hint" role="status">${esc(u.msg)}</p>` : ""}
  ${it.length ? `${window.BodyEngine && BodyEngine.a1cRefHtml ? BodyEngine.a1cRefHtml(+it[it.length - 1].v) : ""}${a1Chart(it)}<ul class="a1-list">${it.slice().reverse().map((x) => `<li><b>${x.v}%</b> · ${a1Fmt(x.date)} <button type="button" class="link-btn" data-a1-del="${esc(x.id)}" aria-label="Delete the ${x.v}% entry from ${a1Fmt(x.date)}">Delete</button></li>`).join("")}</ul>${it.length >= 2 ? `<p class="hint">A1c reflects roughly the past 2–3 months, and lab results can vary a little from test to test. Talk with your healthcare provider before reading much into a change.</p>` : ""}` : `<p class="hint">No entries yet.</p>`}</div>`;
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("#a1-save,[data-a1-del]"); if (!t) return; const u = A1.ui, it = A1.load();
  if (t.dataset.a1Del) { a1cDel(t.dataset.a1Del); u.msg = ""; u.err = ""; renderViews(); return; }
  u.date = ($("#a1-date") || {}).value || ""; u.val = ($("#a1-val") || {}).value || ""; const v = +String(u.val).replace(",", ".");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(u.date)) { u.err = "Pick the date of the test."; u.msg = ""; return renderViews(); }
  if (u.date > a1Today()) { u.err = "The date can't be in the future."; u.msg = ""; return renderViews(); }
  if (!Number.isFinite(v) || v < 3 || v > 20) { u.err = "Enter the A1c as a percent, between 3 and 20 (for example 6.1). Check it for typos."; u.msg = ""; return renderViews(); }
  a1cPut(v, u.date);   // one entry per test date: the same date again replaces it
  u.err = ""; u.msg = it.some((x) => x.date === u.date) ? "Updated the result for that date. Saved on this device." : "Saved on this device."; u.val = ""; renderViews();
});
window.BodyPlanA1c = A1;

window.a1cCardHtmlNow = a1cCardHtmlNow;
}
