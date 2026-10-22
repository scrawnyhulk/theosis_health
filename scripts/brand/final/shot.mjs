import { chromium } from "playwright";
const [,, prefix] = process.argv;
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [name, w, h, mobile] of [["phone",390,844,true],["desktop",1280,900,false]]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor: mobile?2:1, isMobile: mobile, hasTouch: mobile });
  await p.goto("http://localhost:8080/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${prefix}-${name}.png`, fullPage: false });
  await p.evaluate(()=>document.querySelector("#tools")?.scrollIntoView()); await p.waitForTimeout(800);
  await p.screenshot({ path: `${prefix}-${name}-tools.png` });
  await p.close();
}
await b.close();
