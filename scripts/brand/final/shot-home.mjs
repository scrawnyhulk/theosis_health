import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [name, w, h, mobile] of [["phone",390,844,true],["desktop",1280,800,false]]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor: mobile?2:1, isMobile: mobile, hasTouch: mobile });
  await p.goto("http://localhost:8080/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `shots/home-hacks-${name}.png` });
  await p.screenshot({ path: `shots/home-hacks-${name}-full.png`, fullPage: true });
  console.log(name, await p.evaluate(()=>[...document.querySelectorAll("h2")].map(e=>e.textContent).join(" | ")));
}
await b.close();
