import { chromium } from "playwright";
const [,, prefix] = process.argv;
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [name, w, h, mobile] of [["phone",390,844,true],["desktop",1280,800,false],["wide",1920,1080,false]]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor: mobile?2:1, isMobile: mobile, hasTouch: mobile });
  await p.goto("http://localhost:8080/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>{const i=document.querySelector(".hero-logo img"); if(!i) return null; const b=i.getBoundingClientRect(); return {top:b.top,bottom:b.bottom,left:b.left,right:b.right,vh:innerHeight,vw:innerWidth};});
  console.log(name, JSON.stringify(r));
  await p.screenshot({ path: `${prefix}-${name}.png` });
  await p.close();
}
await b.close();
