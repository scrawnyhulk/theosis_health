import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [n,w,h,m] of [["phone",390,844,true],["desktop",1280,800,false]]) {
 const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:m?2:1,isMobile:m,hasTouch:m});
 await p.goto("http://localhost:8080/contact",{waitUntil:"networkidle"}); await p.waitForTimeout(1200);
 await p.evaluate(()=>document.querySelectorAll("[role=dialog],dialog").forEach(e=>e.remove()));
 await p.screenshot({path:`shots/contact-${n}.png`,fullPage:true}); }
await b.close();
