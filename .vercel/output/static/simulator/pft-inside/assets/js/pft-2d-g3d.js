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
  var V="7720",BASE="assets/img/figure-g3d/",X=[0,25,50,75,100];
  var mode="fat";try{mode=localStorage.getItem("pft-2d-g3d-mode")==="cut"?"cut":"fat"}catch(e){}
  var wrap=document.createElement("div");wrap.className="pft2d-g3d";wrap.setAttribute("role","img");
  wrap.setAttribute("aria-label","Front-view teaching illustration of how fat is stored as the slider moves, illustrating typical patterns");
  wrap.innerHTML='<div class="pft2d-g3d-frames"><img alt="" decoding="async" class="a"><img alt="" decoding="async" class="b"></div>'+
    '<div class="pft2d-g3d-bar" role="group" aria-label="2D tissue view"><button type="button" data-g2="fat">Fat + muscle</button><button type="button" data-g2="cut">Inside abdomen</button></div>';
  stage.appendChild(wrap);stage.dataset.g3d2d="on";
  var A=wrap.querySelector("img.a"),B=wrap.querySelector("img.b");
  var url=function(m,x){return BASE+m+"-"+x+".webp?v="+V};
  var pre={};function want(m){if(pre[m])return;pre[m]=1;X.forEach(function(x){var i=new Image();i.src=url(m,x)})}
  function draw(){
    var v=Math.max(0,Math.min(100,+range.value||0)),i=0;while(i<X.length-2&&v>X[i+1])i++;
    var t=Math.max(0,Math.min(1,(v-X[i])/(X[i+1]-X[i])));
    var ua=url(mode,X[i]),ub=url(mode,X[i+1]);
    if(A.getAttribute("src")!==ua)A.setAttribute("src",ua);if(B.getAttribute("src")!==ub)B.setAttribute("src",ub);
    B.style.opacity=t.toFixed(3);wrap.dataset.frame=mode+":"+X[i]+"-"+X[i+1]+"@"+t.toFixed(2);
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
