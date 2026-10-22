import { chromium } from "playwright";
import { execSync } from "child_process";
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
for (const [name, w, mobile] of [["phone",390,true],["desktop",1280,false]]) {
  const files=[];
  for (const [k,u] of [["site","/contact"],["sim","/simulator/index.html"],["pft","/simulator/pft-inside/index.html"],["calc","/fat-burn-calculator/index.html"]]) {
    const p = await b.newPage({ viewport:{width:w,height:400}, deviceScaleFactor: mobile?2:1, isMobile: mobile, hasTouch: mobile });
    await p.goto("http://localhost:8080"+u, { waitUntil: "networkidle" }); await p.waitForTimeout(1200); await p.keyboard.press("Escape"); await p.evaluate(()=>document.querySelectorAll("[role=dialog],dialog,.modal").forEach(e=>e.remove())); await p.waitForTimeout(300);
    const f=`/tmp/hdr-${name}-${k}.png`; await p.screenshot({ path:f, clip:{x:0,y:0,width:w,height:110} }); files.push(f); await p.close();
  }
  execSync(`python3 -c "from PIL import Image;ims=[Image.open(f) for f in '${files.join(" ")}'.split()];o=Image.new('RGB',(ims[0].width,sum(i.height+6 for i in ims)),(255,255,255));y=0
for i in ims: o.paste(i,(0,y)); y+=i.height+6
o.save('shots/headers-v2-${name}.png')"`);
}
await b.close();
