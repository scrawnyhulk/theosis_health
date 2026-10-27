/* Custom 2D figure rendered from the shared Grab3D anatomy (scripts/render-pft-2d.mjs).
   Front-view frames for "Fat + muscle" and "Inside abdomen" at slider 0/25/50/75/100;
   the slider crossfades neighbouring frames. Older 2D art (assets/img/figure/) stays
   available: add ?legacy2d=1, set window.PFT_LEGACY_2D=true before this script, or
   localStorage.setItem('pft-2d-legacy','1'). */
(function(){
  "use strict";
  var q=location.search,legacy=/[?&]legacy2d=1/.test(q)||window.PFT_LEGACY_2D===true;
  try{if(localStorage.getItem("pft-2d-legacy")==="1")legacy=true;if(/[?&]legacy2d=0/.test(q))legacy=false}catch(e){}
  var stage=document.getElementById("pft3d-stage"),range=document.getElementById("fat-range");
  if(legacy||!stage||!range)return;
  var V="7740",BASE="assets/img/figure-g3d/",X=[0,10,20,30,40,50,60,70,80,90,100]; /* day 1026: 11 stops, all stacked + preloaded, opacity-only crossfade (no src swaps = no skips) */
  var mode="fat";try{mode=localStorage.getItem("pft-2d-g3d-mode")==="cut"?"cut":"fat"}catch(e){}
  var wrap=document.createElement("div");wrap.className="pft2d-g3d";wrap.setAttribute("role","img");
  wrap.setAttribute("aria-label","Front-view teaching illustration of how fat is stored as the slider moves, illustrating typical patterns");
  wrap.innerHTML='<div class="pft2d-g3d-frames"></div>'+
    '<div class="pft2d-g3d-bar" role="group" aria-label="2D tissue view"><button type="button" data-g2="fat">Fat + muscle</button><button type="button" data-g2="cut">Inside abdomen</button></div>';
  stage.appendChild(wrap);stage.dataset.g3d2d="on";
  var box=wrap.querySelector(".pft2d-g3d-frames");
  var url=function(m,x){return BASE+m+"-"+x+".webp?v="+V};
  var imgs={};function want(m){if(imgs[m])return;imgs[m]=X.map(function(x){var i=document.createElement("img");i.alt="";i.decoding="async";i.src=url(m,x);i.style.opacity="0";i.dataset.m=m;box.appendChild(i);return i})}
  var raf=0;function draw(){if(!raf)raf=requestAnimationFrame(paint)}
  function paint(){raf=0;want(mode);
    var v=Math.max(0,Math.min(100,+range.value||0)),i=0;while(i<X.length-2&&v>X[i+1])i++;
    var t=Math.max(0,Math.min(1,(v-X[i])/(X[i+1]-X[i])));
    for(var m in imgs)imgs[m].forEach(function(im,j){var o=m!==mode?0:j===i?1:j===i+1?t:0;im.style.opacity=String(o);im.style.zIndex=j===i+1?2:j===i?1:0});
    wrap.dataset.frame=mode+":"+X[i]+"-"+X[i+1]+"@"+t.toFixed(2);
  }
  function setMode(m){mode=m==="cut"?"cut":"fat";wrap.dataset.mode=mode;
    wrap.querySelectorAll("[data-g2]").forEach(function(b){var on=b.dataset.g2===mode;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on))});
    try{localStorage.setItem("pft-2d-g3d-mode",mode)}catch(e){}want(mode);draw()}
  wrap.querySelectorAll("[data-g2]").forEach(function(b){b.addEventListener("click",function(){setMode(b.dataset.g2)})});
  range.addEventListener("input",draw);range.addEventListener("change",draw);
  new MutationObserver(draw).observe(range,{attributes:true,attributeFilter:["value"]});
  setInterval(function(){if(stage.dataset.renderer==="2d"&&wrap.dataset.v!==range.value){wrap.dataset.v=range.value;draw()}},120);
  setMode(mode);setTimeout(function(){want(mode==="cut"?"fat":"cut")},2500);
  window.PFT2DG3D={setMode:setMode,redraw:draw};
})();
