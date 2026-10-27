/* Personal Fat Threshold V23 · lazy 3D anatomy runtime.
   V23: works from file:// (embedded model fallback), free orbit with inertia + pinch zoom, frame-table body states shared with the 2D renders, glycogen tint.
   Geometry: Theosis Health procedural anatomy on a MakeHuman CC0 base, see CREDITS.md.
   Shape changes (fat pads, abdominal projection, omental fat, organ tint) are illustrative, not measurements. */
(function(){
  "use strict";
  const T=window.AnatomyThree;
  if(!T)return;
  // The trimmed three build exports Vector3 but not Vector4. The cut-window uniform needs one;
  // without it this file throws while loading and the 3D figure never starts.
  if(!T.Vector4){T.Vector4=function Vector4(x,y,z,w){this.x=x||0;this.y=y||0;this.z=z||0;this.w=w==null?1:w};T.Vector4.prototype.isVector4=true;T.Vector4.prototype.set=function(x,y,z,w){this.x=x;this.y=y;this.z=z;this.w=w;return this}}
  const ROLE={Skin:"skin",Muscles:"muscle",Bones:"bone",Heart:"heart",Liver:"liver",Gallbladder:"gall",Stomach:"stomach",Pancreas:"pancreas",
    Duodenum:"intestine",Jejunum:"intestine",Ascending_colon:"colon",Transverse_colon:"colon",Descending_colon:"colon",Sigmoid_colon:"colon",
    Greater_omentum:"omentum",Mesentery:"mesentery",Spleen:"spleen",Arteries:"vessel","Kidney.l":"kidney","Kidney.r":"kidney",Urinary_bladder:"bladder",Nails:"nail",Lungs:"lung",Diaphragm:"diaphragm",Vena_cava:"vein"}; // anatomy pass: lungs, diaphragm, IVC
  const MUSCLE_NAMES=["Deltoid (anterior part)", "Deltoid (middle part)", "Deltoid (posterior part)", "Biceps brachii", "Brachialis", "Triceps brachii (long head)", "Triceps brachii (lateral head)", "Brachioradialis", "Forearm flexors", "Forearm extensors", "Extensor carpi radialis", "Rectus femoris", "Vastus lateralis", "Vastus medialis", "Sartorius", "Adductor group", "Tensor fasciae latae", "Biceps femoris", "Semitendinosus", "Gastrocnemius (medial head)", "Gastrocnemius (lateral head)", "Soleus", "Tibialis anterior", "Fibularis (peroneus) longus", "Soleus (medial)", "Pectoralis major", "Pectoralis major (abdominal part)", "Rectus abdominis", "Rectus abdominis", "Rectus abdominis", "Rectus abdominis", "External oblique", "External oblique", "Serratus anterior", "Serratus anterior", "Latissimus dorsi", "Trapezius (upper)", "Trapezius (middle)", "Trapezius (lower)", "Infraspinatus", "Teres major", "Erector spinae", "Gluteus maximus", "Gluteus medius", "Sternocleidomastoid", "Infrahyoid (strap) muscles", "Splenius / upper trapezius"]; // V32e: index = muscles.py MUS order (id-1)
  const LABEL={skin:"Skin",fat:"Subcutaneous fat (under the skin)",muscle:"Skeletal muscle",bone:"Skeleton",heart:"Heart",liver:"Liver",gall:"Gallbladder",
    stomach:"Stomach",pancreas:"Pancreas",intestine:"Small intestine",colon:"Large intestine (colon)",omentum:"Greater omentum · visceral fat",mesentery:"Mesentery · visceral fat",
    spleen:"Spleen",kidney:"Kidney",bladder:"Urinary bladder",vessel:"Arteries (arterial tree)",nail:"Nails (finger- and toenails)",lung:"Lungs",diaphragm:"Diaphragm",vein:"Inferior vena cava"};
  // Threshold profiles change the starting body; slider fat is added on top.
  const BASE={lower:{mass:0,belly:0,visc:0},moderate:{mass:0,belly:0,visc:0},larger:{mass:.45,belly:0,visc:0},extreme:{mass:1,belly:.3,visc:.45}};
  // Same body states as the 2D render frames (v22src/frames.json): [subq, mass, belly, visc, liver, pancreas, hyper] at fuel 0/40/55/70/85/100 (V24).
  const FX=[0,40,55,70,85,100];
  const FR={
    lower:[[.06,0,0,0,0,0,0],[.24,0,.13,.13,0,0,0],[.32,0,.25,.25,.09,.01,0],[.38,0,.37,.37,.43,.31,0],[.42,0,.48,.48,.82,.76,0],[.44,0,.55,.55,1,1,0]],
    moderate:[[.2,.1,.06,.06,0,0,0],[.48,.14,.2,.2,0,0,0],[.64,.18,.35,.35,0,0,0],[.8,.22,.53,.53,.2,.01,0],[.92,.26,.72,.72,.71,.54,0],[.98,.28,.85,.85,1,1,0]],
    larger:[[.36,.5,.1,.1,0,0,0],[.62,.5,.2,.2,0,0,0],[.82,.5,.3,.3,0,0,0],[1,.5,.42,.42,0,0,0],[1.14,.5,.72,.66,.14,0,0],[1.2,.5,1.05,1,1,1,0]],
    extreme:[[.5,1,.42,.48,0,0,0],[.6,1,.42,.48,0,0,.32],[.68,1,.42,.48,0,0,.55],[.76,1,.42,.48,0,0,.78],[.82,1,.43,.5,0,0,.96],[.86,1,.47,.53,0,0,1.1]]};
  function frameState(profile,x){const R=FR[profile]||FR.moderate;x=Math.max(0,Math.min(100,+x||0));let i=0;while(i<FX.length-2&&x>FX[i+1])i++;
    const t=(x-FX[i])/(FX[i+1]-FX[i]);return R[i].map((v,k)=>v+(R[i+1][k]-v)*t)}
  const EL_MIN=-1.2,EL_MAX=1.35,D_MIN=.6,D_MAX=7;  // V26: closer zoom (with pan) for liver/visceral detail
  const clampEl=v=>Math.max(EL_MIN,Math.min(EL_MAX,v)),clampDist=v=>Math.max(D_MIN,Math.min(D_MAX,v));
  const VIEWS={front:0,three:-.62,side:-Math.PI/2,back:Math.PI};
  const reduce=window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):{matches:false};

  const GLSL_COMMON=`
  varying vec3 vPos;
  uniform float uCut; uniform float uHalf; uniform float uTime; uniform vec4 uBS;
  float pftHash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
  float pftNoise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
    return mix(mix(mix(pftHash(i),pftHash(i+vec3(1,0,0)),f.x),mix(pftHash(i+vec3(0,1,0)),pftHash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix(pftHash(i+vec3(0,0,1)),pftHash(i+vec3(1,0,1)),f.x),mix(pftHash(i+vec3(0,1,1)),pftHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
  // V26: cellular (Worley) noise -> (F1,F2): fat lobules, septa and fat droplets
  vec2 pftCell(vec3 p){vec3 i=floor(p),f=fract(p);float d1=8.,d2=8.;
    for(int z=-1;z<=1;z++)for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec3 g=vec3(float(x),float(y),float(z));
      vec3 o=vec3(pftHash(i+g),pftHash(i+g+19.1),pftHash(i+g+47.3));vec3 r=g+o-f;float d=dot(r,r);
      if(d<d1){d2=d1;d1=d;}else if(d<d2){d2=d;}}
    return vec2(sqrt(d1),sqrt(d2));}
  float pftAbd(vec3 p,float front){/* day1026c: window lives in body space (root sx/sy scale) and narrows for a lean waist */p=vec3(p.x/uBS.x,(p.y-uBS.z)/uBS.y,p.z/uBS.x);float ax=pow(abs((p.x+.005)/(.13*uBS.w)),2.6);float ay=pow(abs((p.y-1.05)/(.2*(.5+.5*uBS.w))),2.6);
    return (1.-smoothstep(.9,1.,ax+ay))*smoothstep(front-.01,front+.01,p.z);}
  `;
  const GLSL_BUMP=`vec3 pftBump(vec3 n,float h,float s){vec3 dpx=dFdx(-vViewPosition),dpy=dFdy(-vViewPosition);float dhx=dFdx(h),dhy=dFdy(h);
    vec3 r1=cross(dpy,n),r2=cross(n,dpx);float det=dot(dpx,r1);vec3 g=sign(det)*(dhx*r1+dhy*r2);return normalize(abs(det)*n-s*g);}
  `;
  const PFT_BS={value:new T.Vector4(1,1,0,1)};
  function patch(mat,key,o){
    mat.userData.uniforms=o.uniforms;
    mat.onBeforeCompile=function(sh){
      Object.assign(sh.uniforms,o.uniforms);sh.uniforms.uBS=PFT_BS;
      sh.vertexShader="varying vec3 vPos;\n"+(o.vdecl||"")+sh.vertexShader.replace("#include <project_vertex>",(o.vpre||"")+"#include <project_vertex>\nvPos=(modelMatrix*vec4(transformed,1.0)).xyz;\n"+(o.vmain||""));
      let f=sh.fragmentShader.replace("#include <common>","#include <common>\n"+GLSL_COMMON+(o.fdecl||""));
      f=f.replace("void main() {",GLSL_BUMP+"\nfloat pftDome=1.;\nvoid main() {");f=f.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\nreflectedLight.directDiffuse*=pftDome;reflectedLight.indirectDiffuse*=pftDome;"); /* r25o: form-shading multiplier applied after the warm re-hue pass, which would otherwise cancel brightness changes */
      f=f.replace("#include <clipping_planes_fragment>","#include <clipping_planes_fragment>\n"+(o.discard||""));
      if(o.color)f=f.replace("#include <color_fragment>","#include <color_fragment>\n"+o.color);
      if(o.normal)f=f.replace("#include <normal_fragment_maps>","#include <normal_fragment_maps>\n"+o.normal);
      if(o.light)f=f.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\n"+o.light);
      sh.fragmentShader=f;
    };
    mat.customProgramCacheKey=()=>"pft23-"+key;
    return mat;
  }
  const U=v=>({value:v});

  function create(canvas,opts){
    opts=opts||{};
    const cfg=window.PFT_CONFIG||{},models=cfg.models||{};
    const url=models.anatomy||models.skin;
    let renderer;
    // Probe WebGL first so a missing GPU falls back to 2D quietly (no three.js console errors).
    try{const pc=document.createElement("canvas");if(!(pc.getContext("webgl2")||pc.getContext("webgl")))throw 0}catch(e){setTimeout(()=>opts.onError&&opts.onError(new Error("WebGL unavailable")),0);return stub()}
    try{
      renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:"high-performance"});
    }catch(e){setTimeout(()=>opts.onError&&opts.onError(e),0);return stub()}
    if(!renderer.getContext()){setTimeout(()=>opts.onError&&opts.onError(new Error("WebGL unavailable")),0);return stub()}
    renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.AgXToneMapping||T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.setClearColor(0x000000,0);

    const scene=new T.Scene();
    const camera=new T.PerspectiveCamera(28,1,.05,40);
    // Lighting: soft key from front-left, cool rim lights, slate hemisphere fill.
    const hemi=new T.HemisphereLight(0x9fb6d0,0x1a1410,.55);scene.add(hemi);
    const key=new T.DirectionalLight(0xfff1e6,2.6);key.position.set(-2.4,3.2,3.4);key.castShadow=true;
    key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-1.1;key.shadow.camera.right=1.1;key.shadow.camera.top=2.1;key.shadow.camera.bottom=-.3;
    key.shadow.camera.near=.5;key.shadow.camera.far=9;key.shadow.bias=-.0004;key.shadow.normalBias=.025;key.shadow.radius=4;
    key.target.position.set(0,.9,0);scene.add(key,key.target);
    const fill=new T.DirectionalLight(0xc8dcff,.55);fill.position.set(2.6,1.4,2.6);scene.add(fill);
    const rimL=new T.DirectionalLight(0xa9c8ff,1.6);rimL.position.set(-2.2,2.0,-2.6);scene.add(rimL);
    const rimR=new T.DirectionalLight(0xa9c8ff,1.4);rimR.position.set(2.4,2.2,-2.4);scene.add(rimR);
    [fill,rimL,rimR].forEach(l=>{l.target.position.set(0,.9,0);scene.add(l.target)});
    // V25: in the cut-away views the organs are lit by a soft camera headlight instead of shadows (shadows from ribs/muscle hid liver fat and glycogen).
    const head=new T.DirectionalLight(0xfff6ee,0);head.position.set(0,0,1);camera.add(head);head.target.position.set(0,0,-1);camera.add(head.target);scene.add(camera);
    // Floor: soft contact shadow + faint green glow (Theosis palette).
    // soft contact shadow (blob) instead of a cast floor shadow: no clipped shadow fragments
    const sc=document.createElement("canvas");sc.width=sc.height=128;const s2=sc.getContext("2d");const sg=s2.createRadialGradient(64,64,0,64,64,64);
    sg.addColorStop(0,"rgba(0,0,0,.55)");sg.addColorStop(.5,"rgba(0,0,0,.22)");sg.addColorStop(1,"rgba(0,0,0,0)");s2.fillStyle=sg;s2.fillRect(0,0,128,128);
    const floor=new T.Mesh(new T.PlaneGeometry(.75,.42),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc),transparent:true,depthWrite:false}));floor.rotation.x=-Math.PI/2;floor.position.y=.001;scene.add(floor);
    const gc=document.createElement("canvas");gc.width=gc.height=128;const g2=gc.getContext("2d");const gr=g2.createRadialGradient(64,64,0,64,64,64);
    gr.addColorStop(0,"rgba(130,200,80,.55)");gr.addColorStop(.45,"rgba(90,160,60,.18)");gr.addColorStop(1,"rgba(60,120,40,0)");g2.fillStyle=gr;g2.fillRect(0,0,128,128);
    const glow=new T.Mesh(new T.PlaneGeometry(1.2,.8),new T.MeshBasicMaterial({map:new T.CanvasTexture(gc),transparent:true,depthWrite:false,blending:T.AdditiveBlending}));
    glow.rotation.x=-Math.PI/2;glow.position.y=.002;scene.add(glow);

    // ---------- materials ----------
    const shared={uCut:U(0),uHalf:U(0),uTime:U(0)};
    const st={subq:0,mass:0,belly:0,visc:0,liver:0,pancreas:0,hyper:0,gly:0,glyL:0};
    const tgt={...st};
    const fatU={...shared,uSubq:U(0),uMass:U(0),uBelly:U(0),uHyper:U(0),uFatOp:U(.86)};
    const M={};
    M.skin=patch(new T.MeshPhysicalMaterial({color:0xb08672,roughness:.58,metalness:0,specularIntensity:.55,sheen:.3,sheenColor:new T.Color(0xd98e78),sheenRoughness:.6,clearcoat:0,side:T.DoubleSide}),"skin",{
      uniforms:shared,
      discard:"if(uCut>.5&&pftAbd(vPos,.025)>.5)discard;",
      color:"if(!gl_FrontFacing){diffuseColor.rgb=vec3(.20,.035,.03);}else{float cav=clamp(length(fwidth(normalize(vNormal)))*5.,0.,1.);diffuseColor.rgb*=1.-.28*cav;} // V32g2: crease/knuckle shading",
      normal:"if(gl_FrontFacing){normal=pftBump(normal,pftNoise(vPos*260.)*.5+pftNoise(vPos*55.),.0009);float hnd=smoothstep(.17,.20,abs(vPos.x))*smoothstep(.60,.63,vPos.y)*(1.-smoothstep(.78,.81,vPos.y)),ft=1.-smoothstep(.07,.10,vPos.y);if(hnd+ft>.01){normal=pftBump(normal,hnd*pftNoise(vPos*vec3(320.,1500.,320.))+ft*pftNoise(vPos*vec3(320.,320.,1500.))+.6*pftNoise(vPos*820.),.00042*(hnd+ft));}} // V32i: fine skin lines + pores on hands and feet",
      light:`#if NUM_DIR_LIGHTS>0
        for(int i=0;i<NUM_DIR_LIGHTS;i++){float nl=dot(normal,directionalLights[i].direction);float w=max(0.,(nl+.6)/1.6)-max(0.,nl);
        reflectedLight.directDiffuse+=diffuseColor.rgb*vec3(1.,.38,.26)*w*directionalLights[i].color*.55;}
      #endif
      // V25: back rim lights are kept low on the body surface (they drew bright lines along upward-facing folds)`});
    M.fat=patch(new T.MeshPhysicalMaterial({color:0xf0c35a,roughness:.55,sheen:.15,sheenColor:new T.Color(0xffe2a0),clearcoat:.15,transparent:true,depthWrite:false,side:T.FrontSide}),"fat",{
      uniforms:fatU,
      vdecl:"#ifndef USE_COLOR\nattribute vec4 color;\n#endif\nvarying vec4 vW;\n",vmain:"vW=color;",
      fdecl:"varying vec4 vW;uniform float uSubq,uMass,uBelly,uHyper,uFatOp;\n",
      discard:"if(uHalf>.5&&vPos.x<0.0)discard;",
      color:`float th=vW.r*uSubq+vW.a*uHyper*.9+vW.g*uMass*.8+vW.r*uBelly*.2;float lob=pftNoise(vPos*38.);
        diffuseColor.rgb=mix(vec3(.95,.64,.12),vec3(1.,.83,.30),lob*.7+.15);
        diffuseColor.a=min(.96,.42+.24*smoothstep(.0,.3,vW.r+vW.g*.6)+.5*smoothstep(.05,.8,th))*uFatOp;if(diffuseColor.a<.01)discard;`,
      normal:"normal=pftBump(normal,pftNoise(vPos*38.)+.35*pftNoise(vPos*110.),.0016);"});
    const muscleU={uSel:U(0),...shared,uGly:U(0),uMG:{value:new Array(48).fill(0)},uMGk:U(1),uMView:U(0)}; /* v7.6.78: per-muscle growth (index = muscle id), local-unit scale, muscle-only view */
    M.muscle=patch(new T.MeshStandardMaterial({color:0x7d1d17,roughness:.55,metalness:0}),"muscle27",{
      uniforms:muscleU,vdecl:"attribute vec3 color;\nattribute float aBelly;\nattribute float aFib;attribute float aEdge;attribute float aTd;varying float vTd;varying float vBel;\nuniform float uMG[48];uniform float uMGk;\nvarying float vMid;varying float vGrow;varying float vFib;varying float vEdge;\n",vpre:"{int mi0=int(floor(color.r*64.+.5));float g0=(mi0>0&&mi0<48)?uMG[mi0]:0.;vGrow=g0;transformed+=normalize(objectNormal)*g0*aBelly*uMGk;}\n",vmain:"vMid=color.r;vFib=aFib;vEdge=aEdge;vTd=aTd;vBel=aBelly;\n",fdecl:"uniform float uGly,uSel,uMView;\nvarying float vMid;varying float vGrow;varying float vFib;varying float vEdge;varying float vTd;varying float vBel;\n",discard:"if(uCut>.5&&pftAbd(vPos,.03)>.5)discard;if(uCut>.5&&uHalf<.5&&vPos.y>1.47)discard; ",
      color:`float fib,fib2;if(vEdge>=0.){float fq=vFib*1500.+pftNoise(vPos*70.)*3.;float fa=1.-smoothstep(.4,1.2,fwidth(fq));fib=mix(.6,.5+.5*sin(fq),fa);fib2=mix(.85,.75+.25*sin(fq*2.7+1.3),fa);}else{fib=sin(vPos.x*1400.+pftNoise(vPos*vec3(60.,8.,60.))*9.)*.5+.5;fib2=sin(vPos.z*1400.+pftNoise(vPos*vec3(60.,8.,60.)+7.)*9.)*.5+.5;}
        float s=fib*fib2;diffuseColor.rgb*=mix(.62,1.12,s);
        float mid=vMid*64.;float mi=floor(mid+.5);float mt=abs(mi-27.)<.5?26.:mi;float hv=fract(sin(mt*12.9898+.7)*43758.5453); /* r25n: pec abdominal part shares the pec tone (no mid-chest colour step) */diffuseColor.rgb*=mi>.5?(vEdge>=0.?(.86+.24*hv):(.74+.46*hv)):1.;
        float seam=vEdge>=0.?(1.-smoothstep(.7,1.5,vEdge))*.7:clamp(fwidth(mid)*3.5,0.,1.);if(vEdge>=0.)diffuseColor.rgb*=mix(.55,1.,smoothstep(.8,3.2,vEdge)); /* r25m: smooth border lines + soft groove shading beside them */diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.93,.86,.78),(uMView>.5?.24:.55)*seam); // pale fascia line between muscles (softer in the muscle-only view)
        if(abs(mi-45.)<.5){float td=clamp(vTd,0.,1.);float ph=vFib*7200.+pftNoise(vPos*vec3(40.,220.,40.))*2.4;float st=.5+.5*sin(ph);float st2=.5+.5*sin(ph*2.2+1.3);vec3 ten=mix(vec3(.74,.66,.56),vec3(.98,.95,.90),st*.7+st2*.3);ten*=mix(.78,1.08,st);diffuseColor.rgb=mix(diffuseColor.rgb,ten,smoothstep(.2,.92,td));} /* SCM sternal insertion: pale fibrous cord (strands along the tendon), not a flat colour fade */
        if(abs(mi-46.)<.5&&vPos.y>1.36&&vPos.y<1.55&&abs(vPos.x)<.055&&vPos.z>.025&&vPos.z<.078)diffuseColor.rgb=mix(diffuseColor.rgb*.82,vec3(.50,.20,.18),.48); /* deeper strap seen in the SCM fossa, not the bare neck surface */
        if(uMView>.5&&vEdge>=0.){float mi2=floor(vMid*64.+.5);float lum=dot(diffuseColor.rgb,vec3(.3,.59,.11));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.80,.28,.17)*(.55+1.15*lum),.62);{float l2=dot(diffuseColor.rgb,vec3(.3,.59,.11));diffuseColor.rgb=max(vec3(0.),mix(vec3(l2),diffuseColor.rgb,1.4))*vec3(1.04,.94,.9);}float limb=(mi2>3.5&&mi2<25.5)?1.:0.;if(vPos.z>.03&&vPos.y>1.26&&vPos.y<1.43&&((mi2>25.5&&mi2<27.5)||(mi2>.5&&mi2<1.5))){float sx=abs(vPos.x),xd=.150+(1.405-vPos.y)*.42;float gm=1.;float gd=max(smoothstep(.0012,.0048,abs(sx-xd)),max(1.-smoothstep(1.285,1.305,vPos.y),step(.178,sx)));float gc=max(smoothstep(.0012,.0045,abs(vPos.y-(1.372-.34*(sx-.02)))),max(max(step(xd-.004,sx),step(sx,.022)),step(mi2,1.5)));diffuseColor.rgb*=mix(.6,1.,gm)*mix(.6,1.,gd)*mix(.55,1.,gc);} /* r25n: deltopectoral and clavicular/sternal head grooves */
        if(vPos.z>.03&&vPos.y>1.25&&vPos.y<1.405){float sx=abs(vPos.x),w=.0062+.0045*smoothstep(1.355,1.395,vPos.y)-.003*smoothstep(1.285,1.25,vPos.y);float pl=1.-smoothstep(w-.0015,w+.0008,sx);diffuseColor.rgb=mix(diffuseColor.rgb*mix(.62,1.,smoothstep(.0,.004,sx-w)),vec3(.84,.78,.66),pl*.8);} /* r25n: pale sternal plate, pectoral fibres attach to its lateral edges */
        if(vPos.z>.03&&vPos.y>1.2&&vPos.y<1.36){float sx=abs(vPos.x);float yb=1.248+.62*max(0.,sx-.025)+.004*sin(sx*90.);float d=vPos.y-yb;float m=smoothstep(.012,.03,sx)*(1.-smoothstep(.15,.175,sx));float u=-d;diffuseColor.rgb*=1.-.36*m*smoothstep(0.,.003,u)*(1.-smoothstep(.004,.014,u));diffuseColor.rgb*=1.+.07*m*step(0.,d)*(1.-smoothstep(0.,.02,d));} /* r25n: rounded lower pec edge - soft undercut shadow below, light rim above */
        if(vPos.z>.03&&vPos.y>.93&&vPos.y<1.245){float sx=abs(vPos.x);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.86,.78,.68),.38*(1.-smoothstep(.0018,.0045,sx))*smoothstep(.93,.97,vPos.y));} /* r25n: pale linea alba between the rectus columns */
        if(vPos.z>-.01&&vPos.y<1.395&&vPos.y>1.36){float sx=abs(vPos.x);float d=1.393-.04*max(0.,sx-.12)-vPos.y;diffuseColor.rgb*=mix(mix(.58,1.,smoothstep(.0,.008,d)),1.,smoothstep(.13,.165,sx)+1.-smoothstep(.004,.012,sx));} /* r25n: shadowed shelf where the clavicular head tucks under the clavicle */
        if(mi2>25.5&&mi2<27.5&&vPos.z>.03){float sx=abs(vPos.x);vec2 q=vec2((sx-.09)/.08,(vPos.y-1.306)/.074);float r=length(vec2(q.x*(q.x<0.?.55:1.),q.y));pftDome=mix(1.4,.64,smoothstep(.0,1.15,r))*(1.+.09*smoothstep(.65,0.,length(q-vec2(-.1,.28))))*mix(.86,1.,smoothstep(-1.15,-.75,q.y));} /* r25o: dome form shading - lit crown, darker rim, so the pec reads rounded */if(mi2>25.5&&mi2<27.5){float bb=.5+.5*cos(vFib*1500./5.5-1.5+pftNoise(vPos*40.)*.6);diffuseColor.rgb*=mix(.8,1.03,smoothstep(.1,.6,bb));} /* r25n: pectoral fascicle bundles converging on the humerus */float td=max(vTd,limb*(1.-smoothstep(.12,.32,vBel)));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.90,.84,.76),td*.85);} /* r25m: lighter salmon muscle with pale tendons/aponeurosis in the Muscle view */
        if(uMView>.5){float cav=clamp(length(fwidth(normalize(vNormal)))*4.,0.,1.);diffuseColor.rgb*=1.-.3*cav;diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.08,.9,.88),.5);diffuseColor.rgb*=1.+.10*smoothstep(0.,.012,vGrow);} // v7.6.78: Netter-style depth: darker creases between bellies, slightly fuller red where muscle grew
        if(uSel>.5&&abs(mi-uSel)<.5)diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.,.72,.36),.42);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.55,.33,.28),pftNoise(vPos*16.)*.18);
        float gr=smoothstep(.64,.74,pftNoise(vPos*230.));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.15,.62,.55),uGly*.12);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.5,1.,.9),min(.55,uGly*.6*gr)); // V32g: lighter glycogen speckle so muscle borders stay readable`,
      normal:`normal=pftBump(normal,fib*fib2,.0006);if(abs(vMid*64.-45.)<.5)normal=pftBump(normal,sin(vFib*7200.),.0014*clamp(vTd,0.,1.));`,light:"if(uMView>.5&&vEdge>=0.)reflectedLight.indirectDiffuse+=diffuseColor.rgb*.08;"});
    M.nail=new T.MeshStandardMaterial({color:0xc99a8c,roughness:.42,metalness:0});
    const boneU={...shared,uBMV:U(0)};M.bone=patch(new T.MeshStandardMaterial({color:0xcfc4ae,roughness:.62}),"bone",{uniforms:boneU,fdecl:"uniform float uBMV;\n",discard:"if(uCut>.5&&pftAbd(vPos,.03)>.5)discard;if(uCut>.5&&uHalf<.5&&vPos.y>1.47)discard; if(uBMV>.5&&((vPos.z<-.02&&abs(vPos.x)<.035&&vPos.y>1.05&&vPos.y<1.52)||vPos.y>1.47))discard; /* r25n: Muscle view - spinous processes sit under the trapezius/erector origins; the clavicles stay as a pale shelf */"});
    const organ=(c,r,extra)=>new T.MeshPhysicalMaterial(Object.assign({color:c,roughness:Math.min(.8,r+.2),clearcoat:.06,clearcoatRoughness:.6,specularIntensity:.35,sheen:.12,sheenColor:new T.Color(0xffc0b0)},extra||{}));
    const liverU={...shared,uLiver:U(0),uGlyL:U(0)},pancU={...shared,uPanc:U(0)},omU={...shared,uVisc:U(0)};
    // V26: hepatic steatosis - the whole liver turns paler and yellower from within (diffuse, patchy/mottled
    // parenchyma with fine fat droplets), swells slightly and its edges round off; no fat "blobs" on top.
    M.liver=patch(organ(0x5a1510,.34),"liver",{uniforms:liverU,fdecl:"uniform float uLiver,uGlyL;\n",
      vdecl:"uniform float uLiver;\n",vpre:"transformed+=objectNormal*(.0015+uLiver*.006);\n",
      color:`float n1=pftNoise(vPos*34.),n2=pftNoise(vPos*96.+3.7),n3=pftNoise(vPos*260.+9.1);
        float lw=.55*pftNoise(vPos*9.+1.3)+.3*pftNoise(vPos*21.+5.)+.15*pftNoise(vPos*47.);float lr=1.-abs(2.*pftNoise(vPos*120.+2.2)-1.);
        vec3 healthy=mix(vec3(.25,.045,.032),vec3(.37,.085,.055),lw)*(1.-.03*smoothstep(.8,1.,lr));
        vec3 fatty=mix(vec3(.56,.27,.10),vec3(.68,.42,.17),n2*.7+n3*.3);
        float patchy=smoothstep(.15,.85,n1*.6+lw*.3+n3*.1+(uLiver-.6)*1.1);
        float amt=clamp(uLiver*(.3+.7*patchy),0.,1.);
        diffuseColor.rgb=mix(healthy,fatty,amt*.72);
        if(uLiver>.02){vec2 dc=pftCell(vPos*300.);float drop=(1.-smoothstep(.12,.36,dc.x))*smoothstep(.35,.65,n3*.5+patchy*.5);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.80,.58,.34),drop*uLiver*.13);}
        float gq=smoothstep(.5,.68,n3);float gl=uGlyL*(1.-.35*uLiver);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.15,.62,.55),gl*.10*(1.-.8*uLiver));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.30,.85,.75),gl*.12*smoothstep(.45,.75,n2*.6+n3*.4));`,
      normal:"normal=pftBump(normal,lw*.25+(uLiver>.02?(1.-smoothstep(.1,.34,pftCell(vPos*300.).x))*.5*uLiver:0.),.0006);"});
    const r10p=window.__PFT_R10PA!==0; /* r10: the Voronoi lobule net read as a cracked "giraffe" plate pattern; domain-warp the cells so lobule borders wander, round the lobule profile, and soften the septa/edge darkening */
    M.pancreas=patch(organ(0xd29a62,.42),"pancreas"+(r10p?"10":""),{uniforms:pancU,fdecl:"uniform float uPanc;\n",
      color:r10p?"vec3 pq=vPos*165.;pq+=(vec3(pftNoise(vPos*31.),pftNoise(vPos*31.+5.2),pftNoise(vPos*31.+9.7))-.5)*1.5;vec2 pc=pftCell(pq);float pfw=length(fwidth(pq));float paa=1.-smoothstep(.35,.95,pfw);float pe=pc.y-pc.x;vec2 pc3=pftCell(pq*2.4+7.);float paa3=1.-smoothstep(.35,.95,pfw*2.4);float lob=smoothstep(.0,.9,pe);float lo=mix(.55,.62*lob+.38*smoothstep(.0,.5,pc3.y-pc3.x),paa)+.26*(pftNoise(vPos*38.)-.5);float dep=smoothstep(.0,.06,pftNoise(vPos*55.)-(.68-uPanc*.3))*min(1.,uPanc*3.);vec3 pk=mix(vec3(.60,.30,.16),vec3(.86,.54,.29),clamp(lo,0.,1.));pk=mix(pk,pk*vec3(1.05,.92,.88),smoothstep(.3,.75,pftNoise(vPos*17.+3.)));float sep=(1.-smoothstep(.0,.22+pfw*.3,pe))*paa*smoothstep(.3,.75,pftNoise(vPos*60.+1.7));pk=mix(pk,vec3(.66,.34,.22),sep*.14);pk*=mix(.94,1.,smoothstep(.0,.45,pe)*paa+(1.-paa));diffuseColor.rgb=mix(pk,vec3(.97,.82,.40),dep);":"vec3 pq=vPos*165.;vec2 pc=pftCell(pq);float pfw=length(fwidth(pq));float paa=1.-smoothstep(.35,.95,pfw);float pe=pc.y-pc.x;vec2 pc3=pftCell(pq*2.4+7.);float paa3=1.-smoothstep(.35,.95,pfw*2.4);float lob=smoothstep(.0,.55,pe);float lo=mix(.5,.7*lob+.3*smoothstep(.0,.4,pc3.y-pc3.x),paa)+.3*(pftNoise(vPos*38.)-.5);float dep=smoothstep(.0,.06,pftNoise(vPos*55.)-(.68-uPanc*.3))*min(1.,uPanc*3.);vec3 pk=mix(vec3(.60,.29,.16),vec3(.86,.53,.29),clamp(lo,0.,1.));pk=mix(pk,pk*vec3(1.05,.90,.88),smoothstep(.3,.75,pftNoise(vPos*17.+3.)));float sep=(1.-smoothstep(.0,.16+pfw*.25,pe))*paa*smoothstep(.2,.65,pftNoise(vPos*60.+1.7));pk=mix(pk,vec3(.64,.31,.21),sep*.19);pk*=mix(.91,1.,smoothstep(.0,.3,pe)*paa+(1.-paa));diffuseColor.rgb=mix(pk,vec3(.97,.82,.40),dep);",
      normal:r10p?"normal=pftBump(normal,(smoothstep(.0,.9,pe)*(1.-.25*pc.x)*.48+.16*smoothstep(.0,.5,pc3.y-pc3.x)*paa3)*paa+dep*2.,.00022);":"normal=pftBump(normal,(smoothstep(.0,.55,pe)*(1.-.3*pc.x)*.58+.2*smoothstep(.0,.4,pc3.y-pc3.x)*paa3)*paa+dep*2.,.00022);"});
    // V26: visceral (omental) fat as lobulated yellow fat with pinkish septa and fine vessels, draped over the
    // bowel (thinner between lobules, so loops show through) instead of one smooth yellow mass.
    M.omentum=patch(organ(0xf0c35a,.5,{transparent:true,depthWrite:false,side:T.DoubleSide,clearcoat:.22,clearcoatRoughness:.35,sheen:0}),"omentum",{uniforms:omU,fdecl:"uniform float uVisc;\n",
      color:`vec2 c=pftCell(vPos*72.);float edge=c.y-c.x;float lob=smoothstep(.03,.22,edge);float dome=1.-smoothstep(.0,.75,c.x);
        float tint=pftNoise(vPos*30.);vec2 c2=pftCell(vPos*190.);float sub=smoothstep(.02,.12,c2.y-c2.x);
        vec3 fat=mix(vec3(.84,.54,.15),vec3(.98,.76,.30),tint*.55+dome*.45)*mix(.86,1.,sub)*mix(.7,1.,dome);
        vec3 sept=vec3(.70,.36,.28);
        vec3 vq=vPos*vec3(18.,26.,18.);vq+=vec3(pftNoise(vq*.5+2.1),pftNoise(vq*.5+6.3),pftNoise(vq*.5+9.7))*1.4;float v1=abs(pftNoise(vq)-.5),v2=abs(pftNoise(vq*2.4+5.3)-.5);
        float vw1=fwidth(v1),vw2=fwidth(v2);float ves=max(1.-smoothstep(vw1*.5,.010+vw1*1.6,v1),.6*(1.-smoothstep(vw2*.5,.006+vw2*1.6,v2)))*(1.-smoothstep(.04,.12,vw1)); /* day1023 r2: warped, anti-aliased, thinner veil vessels (were polygonal red lines) */
        diffuseColor.rgb=mix(sept,fat,lob);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.62,.16,.10),ves*.55);
        float base=.08+.46*min(1.,uVisc*1.6);base=min(base,mix(.56,.24,smoothstep(.30,.90,uVisc)));  // v70: thinner veil so organs read in the default view  // V32i: stays partly see-through at high visceral fat so the organs behind still read
        diffuseColor.a=base*mix(.5,1.,lob)+ves*.06;`,
      normal:"normal=pftBump(normal,dome+.25*tint,.0035);"});
    M.mesentery=M.omentum; // V32e: the mesentery sheet shares the lobulated visceral-fat material
    // V26: mesenteric fat - lobulated yellow fat gathers along the bowel loops as visceral fat grows
    const bowelU={...shared,uVisc:omU.uVisc};
    const bowel=(c,r,k)=>patch(organ(c,r),k,{uniforms:bowelU,fdecl:"uniform float uVisc;\n",
      color:`float m=smoothstep(.42,.72,pftNoise(vPos*26.)+.15*pftNoise(vPos*80.))*min(1.,uVisc*1.5);vec2 c=pftCell(vPos*80.);
        float lob=smoothstep(.03,.2,c.y-c.x);float dm=1.-smoothstep(.0,.7,c.x);vec3 fat=mix(vec3(.84,.54,.15),vec3(.98,.76,.30),dm)*mix(.72,1.,dm);
        diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(.72,.40,.30),fat,lob),m*.9);`,
      normal:"normal=pftBump(normal,dm*min(1.,uVisc*1.5),.002);"});
    M.heart=organ(0x8f1a14,.3,{emissive:new T.Color(0x5a0804),emissiveIntensity:.6});
    M.gall=organ(window.__PFT_R25===0?0x8a8e66:0x6e6a40,.3); /* r25: muted olive (was a brighter sage green) */M.stomach=organ(0xc4787a,.36);M.intestine=bowel(0xc08a80,.38,"intestine");M.colon=bowel(0xae8070,.4,"colon");
    M.vessel=patch(organ(0x8a0f0c,.3,{emissive:new T.Color(0x3a0402),emissiveIntensity:.5}),"vessel",{uniforms:shared,discard:"if(uCut>.5&&pftAbd(vPos,.03)>.5)discard;if(uCut>.5&&uHalf<.5&&vPos.y>1.47)discard; "});
    M.spleen=organ(0x7a2240,.35);M.kidney=organ(0x8e3a2a,.35);M.duodenum=bowel(0xd09a7e,.38,"intestine");M.bladder=organ(0xc9a08a,.4);
    // anatomy pass: lungs (pale pink, see-through so the heart reads), diaphragm (muscle with a paler central tendon), IVC (deoxygenated blue)
    M.lung=organ(0xe3aaa6,.6,{transparent:true,opacity:.5,depthWrite:false,clearcoat:.1,sheen:.4});
    M.diaphragm=patch(organ(0x9a3a30,.55,{transparent:true,opacity:.5,depthWrite:false,side:T.DoubleSide,clearcoat:.15}),"diaphragm",{uniforms:shared,vdecl:"attribute vec3 color;\nattribute float aDf;\nvarying float vTen;varying float vDf;\n",vmain:"vTen=color.r;vDf=aDf;\n",fdecl:"varying float vTen;varying float vDf;\n",color:"diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.86,.80,.72),vTen*.85);diffuseColor.a*=mix(.15,1.,smoothstep(.08,.6,abs(dot(normalize(vNormal),normalize(vViewPosition)))))*mix(.12,1.,vDf);"});
    M.vein=organ(0x2c3f86,.32,{emissive:new T.Color(0x0a1030),emissiveIntensity:.4});
    // ---------- v69: painted-illustration surface pass (all original shader code) ----------
    // Adds to organ/bone materials: baked cavity occlusion (aOcc), painterly edge darkening and lit crowns, fine tissue grain
    // in the normal and roughness, a soft studio reflection (wet serosal glisten) and, where asked, a fine surface-vessel net.
    const GLSL_PAINT=`varying vec3 vPw;varying float vOcc;
      float pH(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
      float pN(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(pH(i),pH(i+vec3(1,0,0)),f.x),mix(pH(i+vec3(0,1,0)),pH(i+vec3(1,1,0)),f.x),f.y),mix(mix(pH(i+vec3(0,0,1)),pH(i+vec3(1,0,1)),f.x),mix(pH(i+vec3(0,1,1)),pH(i+vec3(1,1,1)),f.x),f.y),f.z);}
      float pV(vec3 x){vec3 i=floor(x),f=fract(x);float d1=8.,d2=8.;for(int a=-1;a<=1;a++)for(int b=-1;b<=1;b++)for(int c=-1;c<=1;c++){vec3 g=vec3(a,b,c),o=vec3(pH(i+g),pH(i+g+19.1),pH(i+g+47.3));float d=length(g+o-f);if(d<d1){d2=d1;d1=d;}else if(d<d2)d2=d;}return d2-d1;}`;
    // r02: colon surface from the baked (weight, arc length, ring angle) coordinates: haustral creases, pale taeniae, fat tags
    const GLSL_COL=`varying vec4 vCo;
      vec4 pCol(vec4 c,float vis){float w=c.x,s=c.y,th=atan(c.w,c.z);float ph=s/.031+.18*sin(s*19.)+.08*sin(s*53.);float u=fract(ph),hid=floor(ph);
        float fa=1.-smoothstep(.12,.35,fwidth(ph));float a=mod(th+1.0472,2.0944)-1.0472,dt=abs(a),kb=floor((th+1.0472)/2.0944);
        float band=1.-smoothstep(.05,.11,dt);float hf=floor(ph+.5);float fh1=pH(vec3(hf,3.1,.7)),fh2=pH(vec3(hf,5.7,.3));float fw=.08+.08*fh1;float fold=(1.-smoothstep(.0,fw,min(u,1.-u)+.03*sin(th*4.+hf*1.7)+.02*sin(th*12.+hf)))*(.75+.25*sin(th*3.+hf*2.3))*smoothstep(.10,.42,dt)*fa*(.5+.5*fh2); /* day1023 r1: crescentic folds: width/depth vary per haustrum, wavy line, taper into the taeniae */
        float r1=pH(vec3(hid,kb,7.3)),r2=pH(vec3(hid,kb,1.9)),sd=r2>.5?1.:-1.;
        float du=(u-.28-.44*r1)*.031,dv=(a*sd-.30)*.021;float rr=.0026*(.7+.9*min(1.,vis*1.4))*(.75+.5*r2);float dd=length(vec2(du*1.25,dv))/rr*(1.+.35*(pN(vec3(du,dv,hid)*900.)-.5));float tg=(1.-smoothstep(.25,1.,dd))*step(.35,r1)*fa;
        return vec4(fold,band*fa,tg,w);}`;
    function paint(mat,key,o){o=o||{};if(window.__PFT_NOPAINT)return mat;const prev=mat.onBeforeCompile;mat.onBeforeCompile=function(sh,r){if(prev)prev.call(this,sh,r);
      sh.vertexShader="attribute float aOcc;varying vec3 vPw;varying float vOcc;\n"+(o.stom?"attribute vec3 aSt;varying vec3 vSt;\n":"")+(o.col?"attribute vec4 aCo;varying vec4 vCo;\n":"")+(o.sib?"attribute vec4 aSb;varying vec2 vSb;\n":"")+sh.vertexShader.replace("#include <project_vertex>","#include <project_vertex>\nvPw=(modelMatrix*vec4(transformed,1.0)).xyz;vOcc=aOcc;\n"+(o.stom?"vSt=aSt;\n":"")+(o.col?"vCo=aCo;\n":"")+(o.sib?"vSb=aSb.xy;\n":""));
      let f=sh.fragmentShader.replace("#include <common>","#include <common>\n"+GLSL_PAINT+(o.stom?"varying vec3 vSt;\n":"")+(o.col?GLSL_COL:"")+(o.sib?"varying vec2 vSb;\n":""));
      const gs=(o.grain||1).toFixed(2),vs=(o.vessels||0).toFixed(2),gl=(o.gloss==null?1:o.gloss).toFixed(2),vc=o.vcol||"vec3(.55,.06,.05)";
      f=f.replace("#include <roughnessmap_fragment>","#include <roughnessmap_fragment>\nroughnessFactor=clamp(roughnessFactor*(1.-"+(o.rg||.3).toFixed(2)+"*.5+"+(o.rg||.3).toFixed(2)+"*pN(vPw*200.*"+gs+")),.12,1.);");
      f=f.replace("#include <normal_fragment_maps>","#include <normal_fragment_maps>\n"+(o.col?"{vec4 cq=pCol(vCo,.5);cq.z*=smoothstep(.3,.65,abs(normalize(vNormal).z));normal=pftBump(normal,(-cq.x*1.1+cq.y*.12+cq.z*cq.z*1.2)*cq.w,.0018);}":"")+"{float e=.00006*"+gs+"*"+(o.bump||1).toFixed(2)+";vec3 q=vPw*(170.*"+gs+");float n0=pN(q)+.5*pN(q*2.7);"+(o.stom?"":"")+"vec3 dpx=dFdx(vPw),dpy=dFdy(vPw);float dx=dFdx(n0),dy=dFdy(n0);vec3 r1=cross(dpy,normal),r2=cross(normal,dpx);float det=dot(dpx,r1);e*=smoothstep(.08,.55,abs(normalize(vNormal).z));if(abs(det)>1e-12)normal=normalize(abs(det)*normal-e*sign(det)*(dx*r1+dy*r2)*40.);}");
      f=f.replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\n{float rim=1.-abs(normalize(vNormal).z);"+(o.warm?"{float kk=(1.-.45*vOcc)*mix(1.10,.62,pow(rim,1.6));diffuseColor.rgb*=pow(vec3(kk),vec3(.72,1.,1.18));}":"diffuseColor.rgb*=(1.-.45*vOcc)*mix(1.10,.62,pow(rim,1.6));")+""+(o.liv?"{vec3 wn=normalize((vec4(normalize(vNormal),0.)*viewMatrix).xyz);float fx=vPw.x-(-.006+.08*(vPw.y-1.20))+.0006*sin(vPw.y*90.);float fw=(.0007+.0006*smoothstep(1.15,1.24,vPw.y))+length(fwidth(vPw))*.7;float fm=max(smoothstep(.15,.45,wn.z),smoothstep(.3,.6,wn.y))*smoothstep(-.3,.0,wn.y);float fl=(1.-smoothstep(fw*.35,fw,abs(fx)))*fm;float fs=(1.-smoothstep(fw,fw*4.,abs(fx)))*(1.-fl)*fm*step(0.,fx);diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.25,1.12,1.08)+vec3(.05,.03,.03),fl*.55);diffuseColor.rgb*=1.-.14*fs;float und=1.-smoothstep(-.5,-.08,wn.y);diffuseColor.rgb*=1.-.26*und;}":"")+(o.tone?"{float tn=pN(vPw*22.)+.5*pN(vPw*61.+4.3);diffuseColor.rgb*=1.+"+o.tone.toFixed(2)+"*(tn*1.33-1.);"+(o.tint?"diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*"+o.tint+"*1.12,smoothstep(.35,.8,pN(vPw*9.+2.1)));":"")+"}":"")+
        (o.stom?"float sx=vSt.x,cv=vSt.y,an=atan(vSt.z,vSt.y);float wob=pN(vPw*55.)*.5;float gL=1.-smoothstep(.0,.07,abs(cv-.84+.03*wob));float lL=1.-smoothstep(.0,.06,abs(cv+.84-.03*wob));float br=(1.-smoothstep(.0,.07,abs(fract(sx*9.+wob*2.2+cv*.6)-.5)))*smoothstep(.4,.62,pN(vPw*24.));float gB=br*smoothstep(.55,.86,cv)*step(cv,.86);float lB=br*smoothstep(.45,.86,-cv)*step(-cv,.86)*.7;float vv=max(gL,lL*.8)+0.*(gB+lB)*smoothstep(.06,.16,sx)*(1.-smoothstep(.9,.98,sx));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.52,.08,.07),vv*.62);{float mid=1.-abs(cv);diffuseColor.rgb*=mix(.84,1.03,smoothstep(.0,.8,mid))*(.86+.24*pN(vPw*11.+1.3));diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.02,.93,.88),smoothstep(.35,.75,pN(vPw*6.+4.)));diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.93,.86,.92),smoothstep(.55,.95,abs(cv))*.6);float fib=sin(sx*70.+cv*9.+pN(vPw*30.)*3.);diffuseColor.rgb*=1.+.08*fib*smoothstep(.1,.5,mid);float rg=fract(sx*14.+cv*2.5+pN(vPw*18.)*1.5);float rug=(1.-smoothstep(.0,.12,abs(rg-.5)))*smoothstep(.45,.75,pN(vPw*9.))*smoothstep(.2,.6,mid);diffuseColor.rgb*=1.-.14*rug;float bb=(gB+lB)*smoothstep(.06,.16,sx)*(1.-smoothstep(.9,.98,sx));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.55,.10,.09),bb*.6);}":"")+(o.col?"{vec4 cq=pCol(vCo,uVisc);cq.z*=smoothstep(.3,.65,abs(normalize(vNormal).z));float cw=cq.w;diffuseColor.rgb*=mix(vec3(1.),vec3(.76,.59,.55),cq.x*cw);diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.05,1.01,.95)+vec3(.03,.025,.02),cq.y*.45*cw);float tgd=cq.z;diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(.78,.48,.16),vec3(.96,.76,.34),tgd*(.7+.3*pN(vPw*700.))),smoothstep(.0,.5,tgd)*cw*.85);}":"")+(o.vessels&&o.fine?"{vec3 q=vPw*"+(o.vscale||"90.")+"*.35;q+=vec3(pN(q*.45+3.1),pN(q*.45+7.7),pN(q*.45+1.9))*1.6;float a1=abs(2.*pN(q)-1.),a2=abs(2.*pN(q*2.3+11.)-1.);float w1=fwidth(a1),w2=fwidth(a2);float l1=(1.-smoothstep(w1*.6,w1*2.2,a1))*(1.-smoothstep(.5,1.4,length(fwidth(q)))),l2=(1.-smoothstep(w2*.45,w2*1.7,a2))*(1.-smoothstep(.25,.7,length(fwidth(q*2.3))));float vm=smoothstep(.25,.6,pN(vPw*14.));diffuseColor.rgb=mix(diffuseColor.rgb,"+vc+",clamp(l1*.85+l2*.5*smoothstep(.3,.7,pN(q*.8)),0.,1.)*vm*"+vs+");diffuseColor.rgb*=1.-.06*(1.-smoothstep(.0,.25,a1))*vm;}":o.vessels?"float vn=abs(2.*pN(vPw*"+(o.vscale||"90.")+"*.35)-1.);float vl=1.-smoothstep(.0,.07,vn);float vm=smoothstep(.35,.65,pN(vPw*14.));diffuseColor.rgb=mix(diffuseColor.rgb,"+vc+",vl*vm*"+vs+");":"")+"}");
      // r06: small bowel - circumferential vasa recta running from the mesenteric border (fade before the antimesenteric
      // border, fwidth-faded when sub-pixel), a soft yellow mesenteric fat strip (grows with visceral fat) and a slightly
      // deeper, less uniform wall tone on the mesenteric side.
      if(o.sib)f=f.replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\n{float ms=vSb.y;float ph=vSb.x/.0052+.9*pN(vPw*36.)+.35*pN(vPw*97.+2.);float wd=fwidth(ph);float gr=fwidth(vSb.x)/max(length(dFdx(vPw))+length(dFdy(vPw)),1e-7);float fa=(1.-smoothstep(.22,.55,wd))*(1.-smoothstep(1.2,1.8,gr));float aa=abs(fract(ph)-.5);float ti=pH(vec3(floor(ph),3.1,7.7));float ln=1.-smoothstep(.06+wd*.5,.13+wd*1.3,aa);float mm=smoothstep(-.75+.95*ti,-.45+.95*ti,ms)*(.55+.45*pH(vec3(floor(ph),9.2,1.3)));float cal=smoothstep(.0,.25,ms+.5);diffuseColor.rgb*=mix(1.05,.93,cal)*(1.+.06*(pN(vPw*48.)-.5));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.56,.11,.10),ln*mm*fa*.72);float vz=min(1.,uVisc*1.4);float fm=smoothstep(.86-.42*vz,.97-.12*vz,ms+.12*(pN(vPw*60.)-.5))*(.45+.55*vz);float lb=smoothstep(.0,.35,pV(vPw*170.));float dm2=pN(vPw*230.);diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(.80,.52,.28),vec3(.97,.78,.38)*(.9+.18*dm2),lb),fm*(.5+.38*vz)); /* r27: lobulated mesenteric fat creeping around the loops from the mesenteric border as visceral fat rises */}");
      // r10: the two cool (a9c8ff) back/rim key lights lit the pancreas groove between head and uncinate (surfaces facing away from the camera) as a lilac/grey-blue smudge;
      // `wl` keeps each pixel's light brightness but re-hues direct diffuse (and, at half strength, indirect diffuse) toward the tissue colour, and direct/indirect/clearcoat/sheen specular toward warm white, so creases shade warm brown
      if(o.wl)f=f.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\n{vec3 lw=vec3(.2126,.7152,.0722);vec3 ah=diffuseColor.rgb/max(dot(diffuseColor.rgb,lw),1e-4);vec3 dd=reflectedLight.directDiffuse;reflectedLight.directDiffuse=mix(dd,dot(dd,lw)*ah,"+o.wl.toFixed(2)+");vec3 ds=reflectedLight.directSpecular;reflectedLight.directSpecular=mix(ds,vec3(dot(ds,lw))*vec3(1.04,1.,.94),"+Math.min(1,o.wl).toFixed(2)+");vec3 is=reflectedLight.indirectSpecular;reflectedLight.indirectSpecular=mix(is,vec3(dot(is,lw))*vec3(1.04,1.,.94),"+Math.min(1,o.wl).toFixed(2)+");vec3 id=reflectedLight.indirectDiffuse;reflectedLight.indirectDiffuse=mix(id,dot(id,lw)*ah,"+(o.wl*.5).toFixed(2)+");\n#ifdef USE_CLEARCOAT\nclearcoatSpecularDirect=mix(clearcoatSpecularDirect,vec3(dot(clearcoatSpecularDirect,lw))*vec3(1.04,1.,.94),"+Math.min(1,o.wl).toFixed(2)+");\n#endif\n#ifdef USE_SHEEN\nsheenSpecularDirect=mix(sheenSpecularDirect,vec3(dot(sheenSpecularDirect,lw))*vec3(1.04,1.,.94),"+Math.min(1,o.wl).toFixed(2)+");\n#endif\n}");
      f=f.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\n{vec3 Vv=normalize(vViewPosition);vec3 nW=(vec4(normal,0.)*viewMatrix).xyz;reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(1.,.86,.80)*"+(o.bounce||.35).toFixed(2)+"*(1.-smoothstep(-.85,.05,nW.y));vec3 Rr=reflect(-Vv,normal);float Fr=.04+.96*pow(1.-clamp(dot(normal,Vv),0.,1.),5.);float rf=roughnessFactor;vec3 env=mix(vec3(.17,.14,.13),vec3(1.,.93,.86),smoothstep(-.1-.7*rf,.8+.4*rf,Rr.y))+vec3(.6,.7,.9)*smoothstep(.5-.5*rf,1.,-Rr.x)*.35*(1.-.5*rf);env=mix(env,vec3(.45,.42,.40),rf*rf);reflectedLight.indirectSpecular+=env*Fr*(1.-.85*rf)*(1.-.85*rf)*"+gl+"*.9;}");
      sh.fragmentShader=f;};
      const ck0=mat.customProgramCacheKey,ck=ck0?()=>String(ck0.call(mat)).slice(0,60):()=>"";mat.customProgramCacheKey=()=>ck()+"|v69"+key;mat.needsUpdate=true;return mat}
    // wet serosal sheen on viscera (clearcoat), ivory bone, glossier fat
    [M.liver,M.pancreas,M.stomach,M.spleen,M.kidney,M.heart,M.gall,M.intestine,M.colon,M.duodenum,M.bladder,M.vein].forEach(m=>{if(m&&"clearcoat" in m){m.clearcoat=Math.max(m.clearcoat||0,.32);m.clearcoatRoughness=.28}});
    M.liver.clearcoat=.45;M.liver.clearcoatRoughness=.3;M.liver.roughness=.45;paint(M.liver,"liver4",{grain:.7,gloss:.7,rg:.08,bump:.2,liv:1});if(window.__PFT_R10PA!==0)paint(M.pancreas,"panc10",{grain:.6,gloss:.6,bump:.03,rg:.06,tone:.10,warm:1,wl:1,vessels:.3,vscale:"70.",fine:1,vcol:"vec3(.55,.14,.12)"});else paint(M.pancreas,"panc",{grain:.6,gloss:.6,bump:.1,rg:.12,tone:.12,vessels:.3,vscale:"70.",fine:1,vcol:"vec3(.55,.14,.12)"}); /* r10: bump .1 -> .03 + warm crease shading (grey-blue smudge in the head, same family as r01/r04/r07-r09) */M.pancreas.clearcoat=.2;M.pancreas.clearcoatRoughness=.4;M.stomach.color.set(0xd4867e);paint(M.stomach,"stom",{grain:.5,stom:1,gloss:.9,bump:.001,rg:.12,tone:.15,vessels:.45,vscale:"60.",fine:1,vcol:"vec3(.62,.16,.14)"});M.stomach.clearcoat=.2;M.stomach.clearcoatRoughness=.38;paint(M.spleen,"spl");paint(M.kidney,"kid");
    paint(M.heart,"heart",{vessels:.35,vscale:"45.",vcol:"vec3(.85,.72,.45)"});paint(M.gall,"gall",{gloss:window.__PFT_R25===0?.8:.6,grain:.6,bump:.12,rg:.1,tint:window.__PFT_R25===0?"vec3(.84,.90,.92)":"vec3(.93,.90,.80)",tone:.16,vessels:.4,vscale:"70.",fine:1,vcol:"vec3(.55,.20,.14)"});const r09=window.__PFT_R09BW!==0; /* r09: bump .2 on the small bowel/colon reflected the dark env half as blue-grey blotches (same family as r01/r04/r07/r08); near-flat bump, soft painterly tone, and occlusion/rim shading that darkens warm (red falls off less than blue) instead of grey */paint(M.intestine,"int"+(r09?"9":""),r09?{vessels:.22,vscale:"110.",fine:1,bump:.03,rg:.06,tone:.08,warm:1,gloss:.85,sib:1,vcol:"vec3(.60,.12,.11)"}:{vessels:.45,vscale:"110.",fine:1,bump:.2,gloss:.85,sib:1,vcol:"vec3(.60,.12,.11)"});M.intestine.clearcoat=.22;M.intestine.clearcoatRoughness=.36;M.omentum.clearcoat=.1;M.omentum.clearcoatRoughness=.55;M.omentum.roughness=.62; // r06: the thin omental/mesenteric veil was putting a glassy sheen over the loops
    paint(M.colon,"col"+(window.__PFT_R09BW!==0?"9":""),window.__PFT_R09BW!==0?{vessels:.5,vscale:"80.",fine:1,bump:.03,rg:.06,tone:.08,warm:1,col:1,vcol:"vec3(.58,.13,.12)"}:{vessels:.75,vscale:"80.",fine:1,bump:.2,col:1,vcol:"vec3(.58,.13,.12)"});
    if(M.duodenum!==M.intestine)paint(M.duodenum,"duo",window.__PFT_R08DU===0?{vessels:.45,fine:1,bump:.2,vcol:"vec3(.60,.12,.11)"}:{vessels:.45,fine:1,bump:.03,rg:.06,tone:.08,vcol:"vec3(.60,.12,.11)"}); /* r08: bump .2 smeared into grey-brown smudges on the thin C-loop tube; near-flat bump + soft painterly tone instead */paint(M.bladder,"bl");paint(M.lung,"lung",{grain:2.,gloss:.6});paint(M.vein,"vein",{gloss:1,grain:.6,bump:.15,rg:.1,tone:.08});
    M.bone.color.set(0xe9dcc2);M.bone.roughness=.55;if(window.__PFT_R07BN===0)paint(M.bone,"bone",{grain:1.3,gloss:.25});else paint(M.bone,"bone",{grain:.8,gloss:.3,bump:.12,rg:.1,tone:.1,tint:"vec3(1.02,.97,.90)"}); // r07: default bump 1 crumpled the ribs/pelvis into grey "granite" paper (eso-junction and gut views); smooth ivory with a soft warm tone instead
    // r03: viscera use a neutral (hue-preserving) tone curve so the cut-away keeps Netter-like saturated, layered colour instead of the
    // washed-out look AgX gives organs; skin, fat, muscle and bone keep the renderer's AgX curve, so the figure and skin tones are unchanged.
    const ntm=m=>{if(!m||m.userData.ntm||window.__PFT_AGXORG)return;m.userData.ntm=1;const prev=m.onBeforeCompile;m.onBeforeCompile=function(sh,r){if(prev)prev.call(this,sh,r);
      if(T.NeutralToneMapping!=null)sh.fragmentShader=sh.fragmentShader.replace("#include <tonemapping_fragment>","#if defined( TONE_MAPPING )\n gl_FragColor.rgb=NeutralToneMapping(gl_FragColor.rgb);\n#endif")};
      const ck0=m.customProgramCacheKey,ck=ck0?()=>String(ck0.call(m)):()=>"";m.customProgramCacheKey=()=>ck()+"|ntm";m.needsUpdate=true};
    [M.liver,M.gall,M.stomach,M.pancreas,M.intestine,M.colon,M.duodenum,M.spleen,M.kidney,M.bladder,M.heart,M.vessel,M.vein,M.omentum,M.lung,M.diaphragm].forEach(ntm);
    const LOWQ=window.__PFT_LOWQ!=null?!!window.__PFT_LOWQ:!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||Math.min(screen.width,screen.height)<600;
    // v70: the fat shell covers most of the screen, so its clearcoat lobe is desktop-only; phones keep a glossy-looking but cheaper fat
    if(LOWQ){M.fat.clearcoat=0;M.fat.roughness=.36;M.fat.specularIntensity=Math.max(M.fat.specularIntensity||.5,.6)}else{M.fat.clearcoat=.38;M.fat.clearcoatRoughness=.3;M.fat.roughness=.42}


    // ---------- labels ----------
    const host=canvas.parentElement;
    const mkLabel=(text,cls)=>{const d=document.createElement("div");d.className="pft3d-flabel "+(cls||"");d.setAttribute("aria-hidden","true");d.innerHTML="<i></i><span></span>";d.querySelector("span").textContent=text;host.appendChild(d);return d};
    const labels=[
      {el:mkLabel("Skin/subcutaneous fat removed","l-left"),anchor:new T.Vector3(-.11,1.33,.105),modes:["composition"],side:-1},
      {el:mkLabel("Visceral fat","l-right"),anchor:new T.Vector3(.05,.98,.11),modes:["composition","internal"],side:1,dyn:true},
      {el:mkLabel("Cross-section showing visceral organs","l-left"),anchor:new T.Vector3(-.04,1.235,.115),modes:["internal"],side:-1}];

    // ---------- camera state (eased) ----------
    const cam={az:VIEWS.three,el:.06,dist:3.85,ty:.9,px:0},camT={...cam};
    let vesselsOn=true;const vBtn=document.getElementById("pft3d-vessels");
    // V32e: hide the muscle layer so the arterial tree (and skeleton) can be seen
    // V32g2: glycogen speckle on/off (3D) so muscle borders can be studied
    let glyOn=true;const gBtn=document.getElementById("pft3d-glytoggle");
    if(gBtn)gBtn.addEventListener("click",()=>{glyOn=!glyOn;gBtn.setAttribute("aria-pressed",String(!glyOn));gBtn.textContent=glyOn?"Hide speckle":"Show speckle";dirty=true;kick()});
    let musclesOn=true;const mBtn=document.getElementById("pft3d-muscles");
    if(mBtn)mBtn.addEventListener("click",()=>{musclesOn=!musclesOn;mBtn.setAttribute("aria-pressed",String(!musclesOn));mBtn.textContent=musclesOn?"Hide muscles":"Show muscles";applyMode();kick()});
    if(vBtn)vBtn.addEventListener("click",()=>{vesselsOn=!vesselsOn;vBtn.setAttribute("aria-pressed",String(vesselsOn));applyMode();kick()});
    let framing="full",mode="composition",dirty=true,ready=false,lastT=performance.now(),raf=0,meshes=[],byRole={};
    function setFramingT(f){framing=f;camT.px=0;if(f==="abdomen"){camT.dist=1.75;camT.ty=1.06;camT.el=.04}else{camT.dist=3.85;camT.ty=.9;camT.el=.06}syncNav(true);kick()}
    const baseDist=()=>framing==="abdomen"?1.75:3.85,baseTy=()=>framing==="abdomen"?1.06:.9;

    function resize(){const w=canvas.clientWidth||1,h=canvas.clientHeight||1;if(canvas.width!==Math.round(w*renderer.getPixelRatio())||canvas.height!==Math.round(h*renderer.getPixelRatio())){renderer.setSize(w,h,false);camera.aspect=w/h;
      // keep the whole body in portrait/narrow stages
      camera.fov=w/h<.62?34:28;camera.updateProjectionMatrix();dirty=true}}
    const ro=window.ResizeObserver?new ResizeObserver(()=>{resize();kick()}):null;if(ro)ro.observe(canvas);

    function applyMode(){
      const show={external:["skin","nail"],composition:["vessel","fat","nail","muscle","bone","heart","liver","gall","stomach","pancreas","intestine","colon","omentum","mesentery","spleen","kidney","bladder","lung","diaphragm","vein"],
        internal:["vessel","skin","nail","muscle","bone","heart","liver","gall","stomach","pancreas","intestine","colon","omentum","mesentery","spleen","kidney","bladder","lung","diaphragm","vein"],
        muscle:g3dOn?["g3d"]:["muscle","bone"]}[mode]; /* r26 (R12): Grab3D CC0 muscle base replaces the procedural muscles+bones in the Muscle view */ /* v7.6.78: muscle-only view (skin, fat and organs hidden) */
      meshes.forEach(m=>{m.visible=show.indexOf(m.userData.role)>=0&&((m.userData.role!=="vessel"&&m.userData.role!=="vein")||vesselsOn)&&(m.userData.role!=="muscle"||musclesOn||mode==="muscle")&&(m.userData.role!=="heart"||(m.userData.hra&&mode==="composition"&&!musclesOn))}); /* v74: heart is fully covered by the chest wall otherwise (0 px in every view), so skip drawing it */
      if(mBtn)mBtn.hidden=mode==="external"||mode==="muscle";
      if(vBtn)vBtn.hidden=mode==="external"||mode==="muscle";
      shared.uCut.value=mode==="external"||mode==="muscle"?0:1;muscleU.uMView.value=mode==="muscle"?1:0;boneU.uBMV.value=(mode==="muscle"&&window.__PFT_R25M!==0)?1:0;if(window.__PFT_R25M!==0){M.bone.color.setHex(mode==="muscle"?0xddd2b2:0xcfc4ae);M.bone.roughness=mode==="muscle"?.9:.62}/* r25n: clavicles etc. read as subtle warm bone in the Muscle view */shared.uHalf.value=mode==="composition"?1:0;
      if(byRole.skin)byRole.skin.forEach(m=>{m.castShadow=mode==="external";});
      if(byRole.muscle)byRole.muscle.forEach(m=>{m.receiveShadow=mode==="muscle"||mode!=="external";});
      // V25: shadows only on the body surface; cut-away views get shadow-free, soft frontal light
      const cut=mode!=="external"&&mode!=="muscle";key.castShadow=!cut;head.intensity=cut?.85:.6;rimL.intensity=cut?1.6:.42;rimR.intensity=cut?1.4:.38;fill.intensity=cut?.55:.6;hemi.intensity=cut?.75:.55;key.intensity=cut?2.1:2.25;
      // Teaching offset (as in the 2D renders): bring the pancreas and gallbladder forward in the cut-away views so they are not hidden behind stomach/liver.
      const off={pancreas:[0,0,.004],gall:[0,.010,-.016]}; // v7.6.67: true positions (was a large teaching offset that floated the pancreas in front of the liver)
      for(const r in off)(byRole[r]||[]).forEach(m=>{if(!m.userData.p0)m.userData.p0=m.position.clone();m.position.copy(m.userData.p0);if(mode!=="external"&&mode!=="muscle")m.position.add(new T.Vector3(...off[r]))});
      dirty=true;
    }
    function stepState(dt){
      const k=reduce.matches?1:1-Math.exp(-dt*4.5);let moving=false;
      for(const n in st){const d=tgt[n]-st[n];if(Math.abs(d)>1e-4){st[n]+=d*k;moving=true}else st[n]=tgt[n]}
      if(!ptrs.size&&(Math.abs(vAz)>.003||Math.abs(vEl)>.003)){
        if(reduce.matches){vAz=vEl=0}else{camT.az+=vAz*dt;cam.az=camT.az;const ne=clampEl(camT.el+vEl*dt);if(ne===camT.el)vEl=0;camT.el=ne;cam.el=ne;const f=Math.exp(-dt*3.2);vAz*=f;vEl*=f;moving=true}}
      {const a=muscleU.uMG.value;for(let i=0;i<48;i++){const d=mgT[i]-a[i];if(Math.abs(d)>2e-6){a[i]+=d*k;moving=true}else a[i]=mgT[i]}}
      const ck=reduce.matches?1:1-Math.exp(-dt*5.5);
      let dAz=camT.az-cam.az;dAz=Math.atan2(Math.sin(dAz),Math.cos(dAz));
      if(Math.abs(dAz)>1e-4||Math.abs(camT.dist-cam.dist)>1e-4||Math.abs(camT.ty-cam.ty)>1e-4||Math.abs(camT.el-cam.el)>1e-4||Math.abs(camT.px-cam.px)>1e-4){
        cam.az+=dAz*ck;cam.dist+=(camT.dist-cam.dist)*ck;cam.ty+=(camT.ty-cam.ty)*ck;cam.el+=(camT.el-cam.el)*ck;cam.px+=(camT.px-cam.px)*ck;moving=true}
      return moving;
    }
    // v7.6.67: continuous, capped body-measure bias (height/weight/waist/age/sex/body fat/A1c) from the host page; default = no change
    const bias={subq:0,mass:0,belly:0,visc:0,liver:0,pancreas:0,sx:1,sy:1};let rootRef=null;const bz=(x,m)=>Math.max(0,Math.min(m,x));
    window.PFTAnatomyBias=function(b){b=b||{};const c=(x,l)=>Math.max(-l,Math.min(l,+x||0));bias.subq=c(b.subq,.35);bias.mass=c(b.mass,.3);bias.belly=c(b.belly,.3);bias.visc=c(b.visc,.25);bias.liver=c(b.liver,.2);bias.pancreas=c(b.pancreas,.15);
      bias.sx=1+c((+b.sx||1)-1,.12);bias.sy=1+c((+b.sy||1)-1,.08);dirty=true;applyState();kick&&kick()};
    if(window.__pftBias)Promise.resolve().then(()=>{try{window.PFTAnatomyBias(window.__pftBias)}catch(e){}});
    // r29 (day 1026): visceral-fat envelope. The omentum/mesentery "visc" morph is authored for a full belly; when the outer body comes from
    // the person's own height/weight/waist (setOuter) or an A1c tilts fat inward, visc can be high while the skin belly stays small, and the
    // omentum apron pushed out through the abdominal wall (a floating yellow fat pad in side/3/4 Inside view). Cap visc per mesh so every
    // omentum vertex stays >= 12 mm behind the skin front surface for the current skin morph state.
    let envP=null;
    function envPrep(){envP=[];const sk=byRole.skin&&byRole.skin[0];if(!sk||!rootRef)return;rootRef.updateMatrixWorld(true);const MX=rootRef.matrixWorld.constructor;
      const inv=new MX().copy(rootRef.matrixWorld).invert(),v=new T.Vector3(),cell=.015,key=(x,y)=>Math.round(x/cell)+","+Math.round(y/cell);
      const morphs=(m,names)=>{const g=m.geometry,d=m.morphTargetDictionary||{},ma=g.morphAttributes.position||[];return names.map(n=>n in d?ma[d[n]]:null)};
      const sm=new MX().multiplyMatrices(inv,sk.matrixWorld),sp=sk.geometry.attributes.position,[mb,ms,mm]=morphs(sk,["belly","subq","mass"]),rel=sk.geometry.morphTargetsRelative,grid=new Map();
      const P=new T.Vector3(),Q=new T.Vector3(),D3=(a,i,base)=>{if(!a)return 0;Q.fromBufferAttribute(a,i);if(!rel)Q.sub(base);Q.applyMatrix4(sm).sub(new T.Vector3().setFromMatrixPosition(sm));return Q.z};
      const nrm=new T.Vector3();for(let i=0;i<sp.count;i++){P.fromBufferAttribute(sp,i);const base=P.clone();P.applyMatrix4(sm);if(P.y<.6||P.y>1.4||Math.abs(P.x)>.22)continue;
        const k=key(P.x,P.y),e={z:P.z,b:D3(mb,i,base),s:D3(ms,i,base),m:D3(mm,i,base)},o=grid.get(k);if(!o||e.z>o.z)grid.set(k,e)}
      ["omentum","mesentery"].forEach(r=>(byRole[r]||[]).forEach(m=>{const d=m.morphTargetDictionary;if(!d||!("visc" in d)||m.userData.g3d)return;const g=m.geometry,pp=g.attributes.position,mv=g.morphAttributes.position[d.visc],rl=g.morphTargetsRelative;
        const om=new MX().multiplyMatrices(inv,m.matrixWorld),t0=new T.Vector3().setFromMatrixPosition(om),vs=[];
        for(let i=0;i<pp.count;i+=1){P.fromBufferAttribute(pp,i);const base=P.clone();P.applyMatrix4(om);Q.fromBufferAttribute(mv,i);if(!rl)Q.sub(base);Q.applyMatrix4(om).sub(t0);if(Q.z<=1e-5)continue;
          const S=grid.get(key(P.x+Q.x*.5,P.y+Q.y*.5));if(S)vs.push([P.z,Q.z,S])}
        envP.push({m,vs})}));window.__pftEnv=envP}
    function envCap(m,want){if(!envP)try{envPrep()}catch(e){console.warn("venv",e);envP=[]}const E=envP.find(e=>e.m===m);if(!E||window.__PFT_VENV===0)return want;
      const b=bz(st.belly+bias.belly,1.25),s=bz(st.subq+bias.subq,1.25),ma=bz(st.mass+bias.mass,1.1);let cap=want;
      for(const [z0,dz,S] of E.vs){const lim=(S.z+S.b*b+S.s*s+S.m*ma-.012-z0)/dz;if(lim<cap)cap=lim}return Math.max(0,cap)}
    function applyState(){
      meshes.forEach(m=>{const d=m.morphTargetDictionary,inf=m.morphTargetInfluences;if(!d)return;
        if("subq" in d)inf[d.subq]=bz(st.subq+bias.subq,1.25);if("mass" in d)inf[d.mass]=bz(st.mass+bias.mass,1.1);if("belly" in d)inf[d.belly]=bz(st.belly+bias.belly,1.25);if("visc" in d){const w=bz(st.visc+bias.visc,1);inf[d.visc]=(m.userData.role==="omentum"||m.userData.role==="mesentery")?envCap(m,w):w;}if("hyper" in d)inf[d.hyper]=st.hyper;});
      const B=bias;fatU.uSubq.value=bz(st.subq+B.subq,1.25);fatU.uMass.value=bz(st.mass+B.mass,1.1);fatU.uBelly.value=bz(st.belly+B.belly,1.25);fatU.uHyper.value=st.hyper;
      liverU.uLiver.value=bz(st.liver+B.liver,1);liverU.uGlyL.value=glyOn?st.glyL:0;muscleU.uGly.value=glyOn&&mode!=="muscle"?st.gly:0;pancU.uPanc.value=bz(st.pancreas+B.pancreas,1);omU.uVisc.value=bz(st.visc+B.visc,1);if(rootRef){rootRef.scale.set(B.sx*B.sy,B.sy,B.sx*B.sy);/* day1026b: height scales the body proportionally (a taller person is not a vertically stretched one); sx = BMI build on top */rootRef.position.y=1.05*(1-B.sy);}{const xz=rootRef?B.sx*B.sy:1,sy=rootRef?B.sy:1,lean=Math.min(1,Math.max(0,(bz(st.subq+B.subq,1.25)+bz(st.belly+B.belly,1.25))/1.1)),w=window.__PFT_CUTW===0?1:.8+.2*lean*(2-lean);PFT_BS.value.set(xz,sy,rootRef?rootRef.position.y:0,w)}
      if(M.heart)M.heart.emissiveIntensity=.45;
    }
    const v3=new T.Vector3();
    function placeLabels(){
      const w=canvas.clientWidth,h=canvas.clientHeight,ox=canvas.offsetLeft,oy=canvas.offsetTop;const facing=Math.cos(cam.az);
      labels.forEach(L=>{
        const on=ready&&L.modes.indexOf(mode)>=0&&facing>.25&&!(L.dyn&&st.visc<.04&&mode==="composition");
        L.el.classList.toggle("on",on);if(!on)return;
        v3.copy(L.anchor);if(L.dyn){v3.z+=.1*st.belly;v3.y-=.03*st.visc}
        v3.project(camera);const x=ox+(v3.x*.5+.5)*w,y=oy+(-v3.y*.5+.5)*h;
        // keep the label text inside the stage: flip side when it would be clipped
        // keep the text inside the stage: preferred side, else above the anchor (never flip onto the other structure)
        if(!L.tw)L.tw=L.el.querySelector("span").offsetWidth;const tw=(L.tw||160)+22;
        const fits=L.side<0?x-ox>=tw:ox+w-x>=tw;const top=!fits;
        L.el.classList.toggle("l-left",!top&&L.side<0);L.el.classList.toggle("l-right",!top&&L.side>0);L.el.classList.toggle("l-top",top);
        if(top){const half=(L.tw||160)/2+6;const dx=Math.max(ox+half-x,Math.min(0,ox+w-half-x));L.el.style.setProperty("--dx",dx.toFixed(1)+"px")}
        L.el.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";
      });
    }
    function frame(now){
      raf=0;const dt=Math.max(0,Math.min(.1,(now-lastT)/1000));lastT=Math.max(lastT,now); // V26: rAF time can precede lastT after a long task; never step backwards
      resize();
      const moving=stepState(dt);
      if(moving||dirty){
        applyState();
        const r=cam.dist,ce=Math.cos(cam.el);
        // V26: pan offset (px sideways in the view, ty vertical) moves the orbit target
        const tx=cam.px*Math.cos(cam.az),tz=-cam.px*Math.sin(cam.az);
        camera.position.set(tx+Math.sin(cam.az)*ce*r,cam.ty+Math.sin(cam.el)*r,tz+Math.cos(cam.az)*ce*r);camera.lookAt(tx,cam.ty,tz);
        renderer.render(scene,camera);placeLabels();dirty=false;
      }
      if(moving)kick();
    }
    function kick(){dirty=true;if(!raf)raf=requestAnimationFrame(frame)}

    // ---------- input: free orbit (drag), pinch / wheel zoom, inertia; V26: pan (move) when zoomed ----------
    const ptrs=new Map();let moved=0,vAz=0,vEl=0,lastMove=0,pinch0=0,dist0=0,mid=null,act="rotate";
    let dragMode="rotate",autoNav=true;const coarse=window.matchMedia&&window.matchMedia("(pointer:coarse)").matches;
    canvas.style.touchAction="none";
    const clampPx=v=>Math.max(-.75,Math.min(.75,v)),clampTy=v=>Math.max(.05,Math.min(1.8,v));
    const zoomed=()=>camT.dist<baseDist()*.82;
    function upp(){return 2*cam.dist*Math.tan(camera.fov*Math.PI/360)/Math.max(1,canvas.clientHeight)}
    function pan(dx,dy){const u=upp();camT.px=clampPx(camT.px-dx*u);camT.ty=clampTy(camT.ty+dy*u);cam.px=camT.px;cam.ty=camT.ty;kick()}
    const $n=id=>document.getElementById(id);
    function syncNav(recenter){
      // auto: drag moves the view while zoomed in, rotates otherwise (unless the user picked a mode)
      if(recenter){autoNav=true}
      if(autoNav)dragMode="rotate"; // v7.6.72: one-finger/left drag always rotates (any zoom); two-finger/right/Shift-drag moves
      const mv=$n("pft3d-move");if(mv){mv.setAttribute("aria-pressed",String(dragMode==="pan"));mv.classList.toggle("active",dragMode==="pan")}
      const st=$n("pft3d-status");
      if(st&&ready)st.textContent=dragMode==="pan"?(coarse?"Move mode · drag to move · tap ✥ to rotate":"Move mode · drag to move · Shift-drag to rotate · Reset view to recenter")
        :(coarse?"Drag to rotate · pinch to zoom · two fingers to move":"3D anatomy · drag to rotate · scroll to zoom · right-drag to move");
      const stage=canvas.closest&&canvas.closest(".human-3d-stage");if(stage)stage.dataset.drag=dragMode;
    }
    function zoomTo(d){const was=zoomed();camT.dist=clampDist(d);if(camT.dist>=baseDist()*.98&&!was){}
      // zooming fully back out recenters the view
      if(camT.dist>=baseDist()*.98){camT.px=0;camT.ty=baseTy()}
      syncNav(false);kick()}
    function pinchStart(){const p=[...ptrs.values()];pinch0=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)||1;dist0=camT.dist;mid={x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2}}
    canvas.addEventListener("contextmenu",e=>e.preventDefault());
    canvas.addEventListener("pointerdown",e=>{ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=0;vAz=vEl=0;lastMove=performance.now();
      act=(e.button===1||e.button===2)?"pan":(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey)?(dragMode==="pan"?"rotate":"pan"):dragMode;
      try{canvas.setPointerCapture(e.pointerId)}catch(_){ }if(ptrs.size===2)pinchStart();if(e.pointerType!=="mouse"||e.button!==0)e.preventDefault()});
    canvas.addEventListener("pointermove",e=>{const p=ptrs.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);
      if(ptrs.size>=2){const q=[...ptrs.values()];const d=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y)||1;camT.dist=clampDist(dist0*pinch0/d);cam.dist=camT.dist;
        const m2={x:(q[0].x+q[1].x)/2,y:(q[0].y+q[1].y)/2};if(mid)pan(m2.x-mid.x,m2.y-mid.y);mid=m2;syncNav(false);kick();return}
      if(act==="pan"){vAz=vEl=0;pan(dx,dy);return}
      const k=Math.PI/Math.max(260,canvas.clientWidth);           // a full stage-width drag ≈ 180°
      const dAz=-dx*k*1.15,dEl=dy*k*.9;
      camT.az+=dAz;cam.az=camT.az;camT.el=clampEl(camT.el+dEl);cam.el=camT.el;
      const now=performance.now(),dt=Math.max(.008,(now-lastMove)/1000);lastMove=now;
      vAz=Math.max(-7,Math.min(7,dAz/dt));vEl=Math.max(-5,Math.min(5,dEl/dt));kick()});
    const end=e=>{if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);
      if(ptrs.size===1){vAz=vEl=0;mid=null;act=dragMode;return}
      if(e.type==="pointerup"&&moved<5&&e.button!==2)pick(e);
      if(act==="pan"||performance.now()-lastMove>90||reduce.matches)vAz=vEl=0;
      if(camT.dist>=baseDist()*.98&&mid!==null){camT.px=0;camT.ty=baseTy()}mid=null;kick()};
    canvas.addEventListener("pointerup",end);canvas.addEventListener("pointercancel",end);canvas.addEventListener("lostpointercapture",end);
    canvas.addEventListener("wheel",e=>{e.preventDefault();
      if(e.shiftKey&&!e.ctrlKey){pan(-e.deltaX||0,-(e.deltaY||0));return}
      zoomTo(camT.dist*Math.exp(e.deltaY*(e.ctrlKey?.01:.0012)))},{passive:false});
    function resetView(){camT.az=VIEWS.front;camT.el=framing==="abdomen"?.04:.06;vAz=vEl=0;setFramingT(framing);syncNav(true)}
    canvas.addEventListener("dblclick",resetView);
    canvas.addEventListener("keydown",e=>{const k=e.key;let h=true;const P=40;
      if(e.shiftKey&&k==="ArrowLeft")pan(P,0);else if(e.shiftKey&&k==="ArrowRight")pan(-P,0);else if(e.shiftKey&&k==="ArrowUp")pan(0,P);else if(e.shiftKey&&k==="ArrowDown")pan(0,-P);
      else if(k==="ArrowLeft")camT.az+=.25;else if(k==="ArrowRight")camT.az-=.25;else if(k==="ArrowUp")camT.el=clampEl(camT.el+.2);else if(k==="ArrowDown")camT.el=clampEl(camT.el-.2);
      else if(k==="+"||k==="=")zoomTo(camT.dist*.85);else if(k==="-")zoomTo(camT.dist/.85);else if(k==="0"||k==="Home")resetView();else h=false;
      if(h){e.preventDefault();kick()}});
    // V26: zoom / move / reset buttons (index.html #pft3d-nav)
    const nb=(id,f)=>{const b=$n(id);if(b)b.addEventListener("click",f)};
    nb("pft3d-zoomin",()=>zoomTo(camT.dist*.8));nb("pft3d-zoomout",()=>zoomTo(camT.dist/.8));
    nb("pft3d-move",()=>{autoNav=false;dragMode=dragMode==="pan"?"rotate":"pan";syncNav(false)});
    nb("pft3d-reset",()=>{resetView();const fb=document.querySelector('[data-pft3d-view="front"]');if(fb)fb.click()});
    const ray=new T.Raycaster(),ndc=new T.Vector2();
    function pick(e){
      if(!ready)return;const r=canvas.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);
      const hits=ray.intersectObjects(meshes.filter(m=>m.visible&&m.userData.role!=="fat"),false);
      let name=null;for(const h of hits){const p=h.point;const role=h.object.userData.role;
        if((role==="skin"||role==="muscle"||role==="bone")&&mode!=="external"&&inWindow(p))continue;name=LABEL[role];
          if(role==="muscle"){const ca=h.object.geometry.attributes.color;let id=0;if(ca&&h.face)id=Math.round(ca.getX(h.face.a)*64);const mn=id>0&&MUSCLE_NAMES[id-1];muscleU.uSel.value=mn?id:0;if(mn)name="Muscle · "+mn;kick()}else if(muscleU.uSel.value){muscleU.uSel.value=0;kick()}
          break}
      opts.onPick&&opts.onPick(name);
    }
    function inWindow(p){const b=PFT_BS.value,x=p.x/b.x,y=(p.y-b.z)/b.y,z=p.z/b.x;const ax=Math.pow(Math.abs((x+.005)/(.13*b.w)),2.6),ay=Math.pow(Math.abs((y-1.05)/(.2*(.5+.5*b.w))),2.6);return ax+ay<.95&&z>.025}

    // ---------- v7.6.67 anatomy pass (original procedural geometry; reference: standard anatomy texts, no traced images) ----------
    function v67Anatomy(root){
      root.updateMatrixWorld(true);const get=r=>byRole[r]||[];const W=new T.Vector3();
      const worldPts=m=>{const p=m.geometry.attributes.position,a=new Float32Array(p.count*3);for(let i=0;i<p.count;i++){W.fromBufferAttribute(p,i).applyMatrix4(m.matrixWorld);a[i*3]=W.x;a[i*3+1]=W.y;a[i*3+2]=W.z}return a};
      // 1) Liver: keep a clearance from the ribs (no intersecting) by tucking contact vertices toward the liver's centre; then solid, opaque, drawn before shells.
      const L=get("liver")[0],Bn=get("bone");
      if(L&&Bn.length){
        // 1a) Liver (v7.6.67b): original procedural outline replacing the boxy source mesh: large right lobe under the right ribs, left lobe
        //     tapering across the epigastrium, dome under the diaphragm, inferior border slanting up from the right costal margin,
        //     gallbladder fossa and ligamentum teres notch on the inferior surface. Built in world space, then converted to the liver's local space.
        const g=L.geometry=(()=>{const NA=84,NBr=56,pos=[],idx=[],ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)},X0=-.093,X1=.078;
          for(let i=0;i<=NA;i++){const a=i/NA*Math.PI,u=(1-Math.cos(a))/2,x=X0+(X1-X0)*u,sa=Math.pow(Math.sin(a),.42+.5*u*u);
            const yb=1.116+.078*Math.pow(u,1.3),yt=1.250-.040*Math.pow(Math.max(0,u-.22),2)-.005*Math.exp(-Math.pow((u-.6)/.09,2)),cyy=(yt+yb)/2,hy=(yt-yb)/2;
            const zb=-.040+.072*ss(.35,1,u),zf=.077+.016*ss(.4,.85,u),czz=(zf+zb)/2,hz=(zf-zb)/2;
            for(let j=0;j<=NBr;j++){const bb=j/NBr*Math.PI*2,sb=Math.sin(bb),cb=Math.cos(bb),e=.72,ps=Math.sign(sb)*Math.pow(Math.abs(sb),e),pc=Math.sign(cb)*Math.pow(Math.abs(cb),e);
              let y=cyy+hy*ps*sa,z=czz+hz*pc*sa;const lo=Math.max(0,-sb),an=Math.max(0,cb);
              y+=.011*Math.exp(-Math.pow((u-.30)/.05,2))*lo*Math.sqrt(an)*sa+.006*Math.exp(-Math.pow((u-.52)/.018,2))*lo*an*sa; // GB fossa, teres notch
              z-=.010*Math.pow(lo,2)*an*ss(.0,.5,u)*sa; // visceral surface faces down and back: thinner anterior-inferior edge
              const up=Math.max(0,sb),bk=Math.max(0,-cb);
              const th6=Math.min(1,hz/.05);z-=.009*up*up*an*sa*th6;y-=.003*up*up*an*(1-u)*sa*th6; // anterior-superior surface curves back under the costal cartilages (no rib dent)
              const fg=Math.exp(-Math.pow((u-.53+.02*up)/.011,2))*an*(.4+.6*up);y-=.0025*fg*up*th6;z-=.0030*fg*th6; // falciform ligament groove: right/left lobe demarcation
              y-=.010*Math.exp(-Math.pow((u-.44)/.045,2))*bk*lo*sa; // caudate lobe: posterior-inferior bulge beside the IVC
              {const wb=ss(.55,.40,u)*ss(.2,.6,up)*ss(.2,.6,bk);z=z+(Math.max(z,czz-hz*.82*sa)-z)*wb} // bare area hint: flattened posterior-superior contact with the diaphragm
              pos.push(x,y,z)}}
          for(let i=0;i<NA;i++)for(let j=0;j<NBr;j++){const A=i*(NBr+1)+j,B=A+NBr+1;idx.push(A,B,A+1,B,B+1,A+1)}
          const ng=new T.BufferGeometry();ng.setAttribute("position",new T.Float32BufferAttribute(pos,3));ng.setIndex(idx);
          if(L.geometry.attributes.color)ng.setAttribute("color",new T.Float32BufferAttribute(new Float32Array(pos.length).fill(1),3));
          if(L.geometry.attributes.uv)ng.setAttribute("uv",new T.Float32BufferAttribute(new Float32Array(pos.length/3*2),2));return ng})();
        L.updateMatrixWorld(true);const lp=g.attributes.position.array.slice();g.attributes.position.array.set(lp.map(()=>0));
        let mn=[9,9,9],mx=[-9,-9,-9],cx=0,cy=0,cz=0,n=lp.length/3;
        for(let i=0;i<n;i++){for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],lp[i*3+k]);mx[k]=Math.max(mx[k],lp[i*3+k])}cx+=lp[i*3]/n;cy+=lp[i*3+1]/n;cz+=lp[i*3+2]/n}
        const cell=.01,grid=new Map(),key=(x,y,z)=>Math.floor(x/cell)+","+Math.floor(y/cell)+","+Math.floor(z/cell);
        for(const b of Bn){const bp=worldPts(b);for(let i=0;i<bp.length;i+=3){const x=bp[i],y=bp[i+1],z=bp[i+2];if(x<mn[0]-.02||x>mx[0]+.02||y<mn[1]-.02||y>mx[1]+.02||z<mn[2]-.02||z>mx[2]+.02)continue;const k=key(x,y,z);let a=grid.get(k);if(!a)grid.set(k,a=[]);a.push(x,y,z)}}
        const CLR=.0075,near=(x,y,z)=>{let best=1e9;const ix=Math.floor(x/cell),iy=Math.floor(y/cell),iz=Math.floor(z/cell);for(let a=-1;a<=1;a++)for(let b2=-1;b2<=1;b2++)for(let c=-1;c<=1;c++){const arr=grid.get((ix+a)+","+(iy+b2)+","+(iz+c));if(!arr)continue;for(let j=0;j<arr.length;j+=3){const dx=x-arr[j],dy=y-arr[j+1],dz=z-arr[j+2],d=dx*dx+dy*dy+dz*dz;if(d<best)best=d}}return Math.sqrt(best)};
        L.userData.lp0=lp.slice();const rc=new Float32Array(85*3);for(let r=0;r<85;r++){for(let j=0;j<57;j++)for(let k=0;k<3;k++)rc[r*3+k]+=lp[(r*57+j)*3+k]/57}
        let moved=0;for(let it=0;it<4;it++){for(let i=0;i<n;i++){const x=lp[i*3],y=lp[i*3+1],z=lp[i*3+2],d=near(x,y,z);if(d<CLR){const ri=Math.floor(i/57),rcx=rc[ri*3],rcy=rc[ri*3+1],rcz=rc[ri*3+2],vx=(rcx-x)*.25,vy=(rcy-y)*.6,vz=rcz-z,l=Math.hypot(vx,vy,vz)||1,s=(CLR-d)+.0012;lp[i*3]+=vx/l*s;lp[i*3+1]+=vy/l*s;lp[i*3+2]+=vz/l*s;moved++}}}
        // smooth the rib tuck so the surface stays a smooth organ (no dents/spikes): average displacements over mesh neighbours, then a light re-tuck
        {const o=L.userData.lp0,ix=g.index.array,nb=Array.from({length:n},()=>new Set());for(let i=0;i<ix.length;i+=3){const a=ix[i],b=ix[i+1],c=ix[i+2];nb[a].add(b).add(c);nb[b].add(a).add(c);nb[c].add(a).add(b)}
          let d=new Float32Array(n*3);for(let i=0;i<n*3;i++)d[i]=lp[i]-o[i];
          for(let it=0;it<10;it++){const e=new Float32Array(n*3);for(let i=0;i<n;i++){let c=1,x=d[i*3],y=d[i*3+1],z=d[i*3+2];for(const j of nb[i]){x+=d[j*3];y+=d[j*3+1];z+=d[j*3+2];c++}e[i*3]=x/c;e[i*3+1]=y/c;e[i*3+2]=z/c;
            const m0=Math.hypot(d[i*3],d[i*3+1],d[i*3+2]),m1=Math.hypot(e[i*3],e[i*3+1],e[i*3+2]);if(m1<m0*.85&&m0>0){const k=m0*.85/m1;e[i*3]*=k;e[i*3+1]*=k;e[i*3+2]*=k}}d=e}
          for(let i=0;i<n*3;i++){const ri=Math.floor(i/171),w=ri>72?Math.max(0,(84-ri)/12):1;lp[i]=o[i]+d[i]*w}for(let r=0;r<85;r++)for(let k=0;k<3;k++){const A=(r*57)*3+k,B=(r*57+56)*3+k,mv=(lp[A]+lp[B])/2;lp[A]=lp[B]=mv}}
        const pa=g.attributes.position;
        if(pa.isInterleavedBufferAttribute||pa.normalized||!(pa.array instanceof Float32Array)){g.setAttribute("position",new T.Float32BufferAttribute(new Float32Array(pa.count*3),3))}
        const P=g.attributes.position;for(let i=0;i<n;i++){W.set(lp[i*3],lp[i*3+1],lp[i*3+2]);L.worldToLocal(W);P.setXYZ(i,W.x,W.y,W.z)}P.needsUpdate=true;
        // winding check: a closed organ must have positive signed volume, else its outside faces are culled and the inside wall shows (the "hollow" look)
        {const ix=g.index,cnt=ix?ix.count:P.count;let vol=0;const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();for(let i=0;i<cnt;i+=3){const i0=ix?ix.getX(i):i,i1=ix?ix.getX(i+1):i+1,i2=ix?ix.getX(i+2):i+2;a.fromBufferAttribute(P,i0);b.fromBufferAttribute(P,i1);c.fromBufferAttribute(P,i2);vol+=a.dot(b.cross(c))}
          L.userData.vol0=vol;if(vol<0&&ix){const arr=Array.from(ix.array);for(let i=0;i<arr.length;i+=3){const s=arr[i+1];arr[i+1]=arr[i+2];arr[i+2]=s}g.setIndex(arr)}}
        if(g.attributes.normal)g.deleteAttribute("normal");g.computeVertexNormals();g.computeBoundingSphere();
        Object.assign(M.liver,{transparent:false,opacity:1,depthWrite:true,depthTest:true,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,side:T.FrontSide});M.liver.needsUpdate=true;L.renderOrder=1;L.userData.v67={moved};}
      // 1b) Same winding check for the other closed organs (flip inside-out meshes; normals negated, smoothing kept)
      const flips=[];for(const r of ["stomach","spleen","kidney","gall","heart","bladder","colon","intestine"])for(const m of get(r)){const g=m.geometry,P=g.attributes.position,ix=g.index;if(!ix||m.morphTargetInfluences)continue;let vol=0;const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
        for(let i=0;i<ix.count;i+=3){a.fromBufferAttribute(P,ix.getX(i));b.fromBufferAttribute(P,ix.getX(i+1));c.fromBufferAttribute(P,ix.getX(i+2));vol+=a.dot(b.cross(c))}
        if(vol<0){const ng=g.clone(),arr=Array.from(ng.index.array);for(let i=0;i<arr.length;i+=3){const s=arr[i+1];arr[i+1]=arr[i+2];arr[i+2]=s}ng.setIndex(arr);if(ng.attributes.normal)ng.deleteAttribute("normal");ng.computeVertexNormals();m.geometry=ng;flips.push(r)}}
      root.userData.v67flips=flips;

      // 2) Pancreas: rebuilt as an elongated, flattened, lobulated gland lying obliquely at about L1-L2: head inside the duodenal C-loop
      //    (right of the superior mesenteric vessels), neck in front of the portal/SMV confluence, body across the aorta behind the stomach,
      //    tail rising to the splenic hilum. 3) Duodenum: C-loop (D1-D4) around the head, added because the source model has none.
      const pm=get("pancreas")[0],sp=get("spleen")[0];
      const hil=sp?(()=>{const a=worldPts(sp);let x=0,y=0,z=0,c=0;for(let i=0;i<a.length;i+=3)if(a[i]<.062){x+=a[i];y+=a[i+1];z+=a[i+2];c++}return c?[x/c-.006,y/c-.004,z/c+.004]:[.054,1.165,-.03]})():[.054,1.165,-.03];
      const crv=(pts)=>{const P=pts.map(p=>new T.Vector3(...p)),S=[];for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];for(let k=0;k<20;k++){const s=k/20,s2=s*s,s3=s2*s;S.push(new T.Vector3(
          .5*(2*p1.x+(-p0.x+p2.x)*s+(2*p0.x-5*p1.x+4*p2.x-p3.x)*s2+(-p0.x+3*p1.x-3*p2.x+p3.x)*s3),.5*(2*p1.y+(-p0.y+p2.y)*s+(2*p0.y-5*p1.y+4*p2.y-p3.y)*s2+(-p0.y+3*p1.y-3*p2.y+p3.y)*s3),.5*(2*p1.z+(-p0.z+p2.z)*s+(2*p0.z-5*p1.z+4*p2.z-p3.z)*s2+(-p0.z+3*p1.z-3*p2.z+p3.z)*s3)))}}S.push(P[P.length-1].clone());
        const Lc=[0];for(let i=1;i<S.length;i++)Lc.push(Lc[i-1]+S[i].distanceTo(S[i-1]));const tot=Lc[Lc.length-1];
        const at=u=>{const d=u*tot;let i=1;while(i<S.length-1&&Lc[i]<d)i++;const f=(d-Lc[i-1])/Math.max(1e-9,Lc[i]-Lc[i-1]);return S[i-1].clone().lerp(S[i],f)};
        return {getPointAt:at,getTangentAt:u=>at(Math.min(1,u+.004)).sub(at(Math.max(0,u-.004))).normalize()}};
      const tube=(pts,prof,seg,rad)=>{const cur=crv(pts);const pos=[],idx=[];
        for(let i=0;i<=seg;i++){const u=i/seg,c=cur.getPointAt(u),[a,b,lob]=prof(u);const tg=cur.getTangentAt(u);let N=new T.Vector3(0,0,1).cross(tg);if(N.lengthSq()<1e-6)N.set(1,0,0);N.normalize();const Bv=tg.clone().cross(N).normalize();
          for(let j=0;j<=rad;j++){const th=j/rad*Math.PI*2,lb=1+lob*(Math.sin(th*5+u*40)*.5+Math.sin(u*90+th*3)*.5);const cap=Math.pow(Math.sin(Math.min(1,Math.min(u,1-u)*14)*Math.PI/2),.5);
            const q=c.clone().addScaledVector(N,Math.cos(th)*a*lb*cap).addScaledVector(Bv,Math.sin(th)*b*lb*cap);pos.push(q.x,q.y,q.z)}}
        for(let i=0;i<seg;i++)for(let j=0;j<rad;j++){const A=i*(rad+1)+j,B=A+rad+1;idx.push(A,B,A+1,B,B+1,A+1)}
        const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g};
      if(pm){const ty=Math.min(hil[1],1.140),pts=[[-.034,1.049,.026],[-.042,1.060,.030],[-.042,1.074,.034],[-.032,1.088,.039],[-.012,1.097,.043],[.012,1.104,.040],[.032,1.111,.026],[.046,1.120+(ty-1.13)*.4,.008],[hil[0]-.004,ty,hil[2]+.004]];
        const prof=u=>{const h=Math.max(0,1-Math.abs(u-.13)/.17),tl=Math.max(0,(u-.66)/.34);return [.0105+.0085*h-.0040*tl,.0058+.0050*h-.0018*tl,.07]};  // vertical half-height a, AP half-thickness b
        const toL=(g)=>{const a=g.attributes.position;for(let i=0;i<a.count;i++){W.fromBufferAttribute(a,i);pm.worldToLocal(W);a.setXYZ(i,W.x,W.y,W.z)}g.computeVertexNormals()};const g=tube(pts,prof,96,24);toL(g);
        const col=new Float32Array(g.attributes.position.count*3).fill(1);g.setAttribute("color",new T.Float32BufferAttribute(col,3));
        pm.geometry=g;pm.morphTargetInfluences=undefined;pm.morphTargetDictionary=undefined;pm.userData.v67=true;
        // duodenum: pylorus -> D1 (back and right) -> D2 descending (in front of the right kidney hilum) -> D3 across the aorta/IVC -> D4 up to the flexure
        const dpts=[[-.020,1.111,.058],[-.040,1.114,.047],[-.058,1.106,.036],[-.068,1.088,.031],[-.067,1.064,.031],[-.058,1.043,.034],[-.036,1.033,.038],[-.010,1.034,.040],[.010,1.041,.038],[.022,1.056,.034],[.025,1.072,.030]];
        const dg=tube(dpts,u=>{const k=1+.42*Math.exp(-Math.pow((u-.10)/.055,2));return [.0105*k,.0095*k,.0]},110,20);toL(dg);dg.setAttribute("color",new T.Float32BufferAttribute(new Float32Array(dg.attributes.position.count*3).fill(1),3));
        const dm=new T.Mesh(dg,M.duodenum);dm.userData.role="intestine";dm.name="Duodenum";dm.frustumCulled=false;pm.add(dm); // child of the pancreas: follows its offset and any bias
        meshes.push(dm);(byRole.intestine=byRole.intestine||[]).push(dm);root.userData.panPm=pm;root.userData.panPts=pts;}
      // ---------- v7.6.68: lungs, colon, small bowel, liver details, portal/splenic vessels (all original procedural geometry) ----------
      try{v68Anatomy()}catch(e){console.warn("anatomy pass v68",e)}
      function v68Anatomy(){
      const ss=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
      const spl=(pts,per)=>{const S=[],d=pts[0].length;for(let i=0;i<pts.length-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
        for(let k=0;k<per;k++){const s=k/per,s2=s*s,s3=s2*s,q=[];for(let c=0;c<d;c++)q.push(.5*(2*p1[c]+(-p0[c]+p2[c])*s+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*s2+(-p0[c]+3*p1[c]-3*p2[c]+p3[c])*s3));S.push(q)}}S.push(pts[pts.length-1].slice());return S};
      // tube along a 3D path with extra per-point channels (radius etc.), parallel-transport frames
      const tube2=(pts,rf,rad,per)=>{const S=spl(pts,per||12),V=S.map(q=>new T.Vector3(q[0],q[1],q[2])),Lc=[0];for(let i=1;i<V.length;i++)Lc.push(Lc[i-1]+V[i].distanceTo(V[i-1]));const tot=Lc[Lc.length-1];
        const pos=[],idx=[];let N=null;
        for(let i=0;i<V.length;i++){const tg=V[Math.min(V.length-1,i+1)].clone().sub(V[Math.max(0,i-1)]).normalize();
          if(!N){N=new T.Vector3(0,1,0);if(Math.abs(N.dot(tg))>.9)N.set(1,0,0)}N.sub(tg.clone().multiplyScalar(N.dot(tg))).normalize();const Bv=tg.clone().cross(N).normalize(),c=V[i];
          for(let j=0;j<=rad;j++){const th=j/rad*Math.PI*2,[a,b]=rf(Lc[i]/tot,th,Lc[i],S[i],tot);const ct=Math.cos(th),st=Math.sin(th);pos.push(c.x+N.x*ct*a+Bv.x*st*b,c.y+N.y*ct*a+Bv.y*st*b,c.z+N.z*ct*a+Bv.z*st*b)}}
        for(let i=0;i<V.length-1;i++)for(let j=0;j<rad;j++){const A=i*(rad+1)+j,B=A+rad+1;idx.push(A,B,A+1,B,B+1,A+1)}
        const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setIndex(idx);return g};
      const capR=(s,tot,l0,l1)=>Math.sqrt(Math.max(0,Math.sin(Math.min(1,s/l0)*Math.PI/2)))*Math.sqrt(Math.max(0,Math.sin(Math.min(1,(tot-s)/l1)*Math.PI/2)));
      const fixVol=g=>{const P=g.attributes.position,ix=g.index;let vol=0;const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();for(let i=0;i<ix.count;i+=3){a.fromBufferAttribute(P,ix.getX(i));b.fromBufferAttribute(P,ix.getX(i+1));c.fromBufferAttribute(P,ix.getX(i+2));vol+=a.dot(b.cross(c))}
        if(vol<0){const arr=Array.from(ix.array);for(let i=0;i<arr.length;i+=3){const t=arr[i+1];arr[i+1]=arr[i+2];arr[i+2]=t}g.setIndex(arr)}g.computeVertexNormals();g.computeBoundingSphere();return g};
      const addW=(g,mat,role,name,parent)=>{const m=new T.Mesh(g,mat);parent.add(m);m.updateMatrixWorld(true);const P=g.attributes.position;for(let i=0;i<P.count;i++){W.fromBufferAttribute(P,i);m.worldToLocal(W);P.setXYZ(i,W.x,W.y,W.z)}
        if(!g.attributes.color)g.setAttribute("color",new T.Float32BufferAttribute(new Float32Array(P.count*3).fill(1),3));fixVol(g);m.userData.role=role;m.name=name;m.frustumCulled=false;m.userData.v68=true;meshes.push(m);(byRole[role]=byRole[role]||[]).push(m);return m};
      const drop=m=>{m.parent&&m.parent.remove(m);const i=meshes.indexOf(m);if(i>=0)meshes.splice(i,1);const r=byRole[m.userData.role];if(r){const j=r.indexOf(m);if(j>=0)r.splice(j,1)}};
      const host=(get("stomach")[0]||get("liver")[0]).parent;
      // ===== Lungs: fill the bony thorax (radial clearance table from the ribs), apex just above the clavicle, base on the diaphragm dome,
      //       mediastinum/heart impression with a cardiac notch on the left, oblique fissures (both) and a horizontal fissure (right).
      const oldL=get("lung").slice();
      if(oldL.length){const bp=[];for(const b of Bn){const a=worldPts(b);for(let i=0;i<a.length;i+=3){const x=a[i],y=a[i+1],z=a[i+2];if(y>1.09&&y<1.47&&Math.abs(x)<.18&&z>-.13&&z<.15)bp.push(x,y,z)}}
        const Y0=1.09,DY=.006,NYb=64,NAb=32,ax=(s,y)=>[s*(.050-.012*ss(1.33,1.42,y)),.004-.008*ss(1.30,1.42,y)];
        const tab={};for(const s of [-1,1]){const t=Array.from({length:NYb},()=>new Float32Array(NAb).fill(9));for(let i=0;i<bp.length;i+=3){const y=bp[i+1],yb=Math.floor((y-Y0)/DY);if(yb<0||yb>=NYb)continue;const [cx,cz]=ax(s,y),dx=bp[i]-cx,dz=bp[i+2]-cz,r=Math.hypot(dx,dz);if(r<.014)continue;
            const ab=Math.floor((Math.atan2(dz,dx)+Math.PI)/(2*Math.PI)*NAb)%NAb;if(r<t[yb][ab])t[yb][ab]=r}
          for(let it=0;it<NAb;it++)for(const row of t)for(let ab=0;ab<NAb;ab++)if(row[ab]>=9){const l=row[(ab+NAb-1)%NAb],r=row[(ab+1)%NAb];const c=[l,r].filter(v=>v<9);if(c.length)row[ab]=Math.min(...c)+.004}
          const u=t.map((row,yb)=>row.map((_,ab)=>{let m=9;for(let d=-4;d<=4;d++){const rr=t[yb+d];if(!rr)continue;for(let e=-1;e<=1;e++)m=Math.min(m,rr[(ab+e+NAb)%NAb])}return m}));tab[s]=u}
        const rib=(s,y,th)=>{const yb=Math.max(0,Math.min(NYb-1,Math.floor((y-Y0)/DY))),a=((th+Math.PI)/(2*Math.PI)*NAb+NAb*4)%NAb,a0=Math.floor(a)%NAb,a1=(a0+1)%NAb,f=a-Math.floor(a);return tab[s][yb][a0]*(1-f)+tab[s][yb][a1]*f};
        // diaphragm height map (top surface), dilated so the lateral/posterior recesses are covered
        const HC=.008,HX0=-.18,HZ0=-.14,HNX=46,HNZ=38,H=new Float32Array(HNX*HNZ).fill(-9);const dm0=get("diaphragm")[0];
        if(dm0){const a=worldPts(dm0);for(let i=0;i<a.length;i+=3){const ix=Math.floor((a[i]-HX0)/HC),iz=Math.floor((a[i+2]-HZ0)/HC);if(ix>=0&&ix<HNX&&iz>=0&&iz<HNZ)H[iz*HNX+ix]=Math.max(H[iz*HNX+ix],a[i+1])}
          for(let it=0;it<8;it++){const H2=H.slice();for(let z=0;z<HNZ;z++)for(let x=0;x<HNX;x++){if(H[z*HNX+x]>-9)continue;let s=0,c=0;for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz;if(xx>=0&&xx<HNX&&zz>=0&&zz<HNZ&&H[zz*HNX+xx]>-9){s+=H[zz*HNX+xx];c++}}if(c)H2[z*HNX+x]=s/c-.004}H.set(H2)}}
        for(let it=0;it<3;it++){const H2=H.slice();for(let z=1;z<HNZ-1;z++)for(let x=1;x<HNX-1;x++){let a=0,c=0;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){const h=H[(z+dz)*HNX+x+dx];if(h>-9){a+=h;c++}}if(c)H2[z*HNX+x]=a/c}H.set(H2)}
        const hAt=(x,z)=>{const ix=Math.max(0,Math.min(HNX-1,Math.floor((x-HX0)/HC))),iz=Math.max(0,Math.min(HNZ-1,Math.floor((z-HZ0)/HC)));return H[iz*HNX+ix]};
        let hc=null;const hm=get("heart")[0];if(hm){const b=new T.Box3().setFromObject(hm);hc={c:[(b.min.x+b.max.x)/2,b.min.y+(b.max.y-b.min.y)*.36,(b.min.z+b.max.z)/2],r:[(b.max.x-b.min.x)*.5,(b.max.y-b.min.y)*.40,(b.max.z-b.min.z)*.5]}}
        const YA=1.416,YB=1.135,NI=60,NJ=48,pos=[],col=[],idx=[];
        for(const s of [-1,1]){const base=pos.length/3,R=[];
          for(let i=0;i<=NI;i++){const v=i/NI,y=YB+(YA-YB)*Math.sin(v*Math.PI/2),row=[];
            for(let j=0;j<=NJ;j++){const th=j/NJ*Math.PI*2;let r=Math.min(.15,.062*Math.pow(Math.max(0,YA-y)/.08,.62))*Math.sqrt(Math.min(1,v/.035));r=Math.min(r,rib(s,y,th)-.006);row.push(Math.max(0,r))}R.push(row)}
          for(let it=0;it<3;it++)for(let i=1;i<NI;i++)for(let j=0;j<=NJ;j++){const jm=(j+NJ-1)%NJ,jp=(j+1)%NJ,av=(R[i][j]*2+R[i][jm]+R[i][jp]+R[i-1][j]+R[i+1][j])/6,y=YB+(YA-YB)*Math.sin(i/NI*Math.PI/2);R[i][j]=Math.min(av,rib(s,y,j/NJ*Math.PI*2)-.006)}
          for(let i=0;i<=NI;i++){const v=i/NI,yy=YB+(YA-YB)*Math.sin(v*Math.PI/2);for(let j=0;j<=NJ;j++){const th=j/NJ*Math.PI*2,[cx,cz]=ax(s,yy);let x=cx+Math.cos(th)*R[i][j],z=cz+Math.sin(th)*R[i][j],y=yy;
            if(s*x<.010)x=s*.010;  // mediastinum: lungs do not cross the midline
            if(hc){const dy=(y-hc.c[1])/hc.r[1],dz=(z-hc.c[2])/hc.r[2],q=1.12-dy*dy-dz*dz;if(q>0){const xe=hc.c[0]+s*hc.r[0]*Math.sqrt(q);if(s*x<s*xe)x=xe}}  // cardiac impression
            if(s>0){const nb=Math.exp(-Math.pow((y-1.29)/.032,2))*ss(-.005,.04,z);x=Math.max(x,.012+.050*nb)}  // cardiac notch (left upper lobe, anterior border)
            {const hb=hAt(x,z),bs=Math.max(YB,Math.min(1.24,hb>-9?hb+.004:1.175));y=bs+(yy-YB)*(YA-bs)/(YA-YB)}
            // fissures: oblique (both lungs), horizontal (right only, anterior to the oblique)
            const fo=y-((s<0?1.37:1.385)-1.30*(z+.05)),fh=s<0&&fo>0?y-1.300:9;const gr=Math.max(Math.exp(-Math.pow(fo/.0028,2)),Math.exp(-Math.pow(fh/.0028,2)));
            const dx=x-cx,dz2=z-cz,dl=Math.hypot(dx,dz2)||1;x-=dx/dl*.0035*gr;z-=dz2/dl*.0035*gr;
            pos.push(x,y,z);const sh=1-.55*gr;col.push(sh,sh,sh)}}
          for(let i=0;i<NI;i++)for(let j=0;j<NJ;j++){const A=base+i*(NJ+1)+j,B=A+NJ+1;idx.push(A,B,A+1,B,B+1,A+1)}
          const top=base+NI*(NJ+1);let tx=0,ty=0,tz=0;for(let j=0;j<=NJ;j++){tx+=pos[(top+j)*3];ty+=pos[(top+j)*3+1];tz+=pos[(top+j)*3+2]}for(let j=0;j<=NJ;j++){pos[(top+j)*3]=tx/(NJ+1);pos[(top+j)*3+1]=ty/(NJ+1)+.002;pos[(top+j)*3+2]=tz/(NJ+1)}}
        const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("color",new T.Float32BufferAttribute(col,3));g.setIndex(idx);
        const par=oldL[0].parent;oldL.forEach(drop);M.lung.vertexColors=true;M.lung.needsUpdate=true;const lm=addW(g,M.lung,"lung","Lungs",par);lm.renderOrder=2}
      // ===== Colon: caecum + appendix, ascending, hepatic flexure, sagging transverse, high splenic flexure, descending, S-shaped sigmoid, rectum.
      //       Haustra (sacculations) and three taeniae coli; smooth sigmoid/rectum.  [x,y,z,radius,haustra]
      const oldC=get("colon").slice();
      if(oldC.length){const cp=[[-.083,.900,.050,.012,0],[-.086,.912,.049,.019,.2],[-.090,.940,.045,.018,.7],[-.092,.975,.042,.016,1],[-.093,1.020,.040,.015,1],[-.091,1.062,.040,.015,1],[-.087,1.092,.044,.015,1],[-.078,1.104,.052,.015,1],
          [-.060,1.098,.066,.014,1],[-.034,1.082,.080,.014,1],[-.005,1.070,.086,.014,1],[.025,1.074,.084,.014,1],[.054,1.096,.070,.014,1],[.076,1.128,.046,.013,1],[.088,1.146,.026,.013,1],[.098,1.128,.012,.013,1],
          [.100,1.075,.012,.012,1],[.098,1.015,.016,.012,1],[.094,.960,.024,.012,.8],[.080,.920,.040,.0115,.3],[.052,.902,.062,.0115,.15],[.022,.912,.069,.0115,.1],[-.008,.906,.060,.0115,.1],[-.020,.887,.042,.012,.05],[-.008,.866,.018,.013,0],[.001,.845,-.008,.015,0],[.001,.818,-.026,.016,0],[.000,.796,-.030,.010,0]];
        const g=tube2(cp,(u,th,s,q,tot)=>{const h=q[4];let r=q[3]*capR(s,tot,.010,.006);const hs=Math.pow(Math.abs(Math.sin(Math.PI*s/.0165)),.55),ta=Math.max(0,Math.cos(3*th))**8;r*=1+h*(.16*hs-.06)-h*.10*ta;return [r,r]},20,14);
        const par=oldC[0].parent;oldC.forEach(drop);addW(g,M.colon,"colon","Colon",par);
        const ap=tube2([[-.079,.906,.040,.0042],[-.074,.893,.035,.0038],[-.068,.881,.032,.0035],[-.060,.874,.035,.0033],[-.053,.873,.041,.003]],(u,th,s,q,tot)=>{const r=q[3]*capR(s,tot,.002,.004);return [r,r]},10,10);
        addW(ap,M.colon,"colon","Appendix",par)}
      // ===== Small bowel: jejunum loops mostly upper left (wider), ileum lower right (narrower), ending at the ileocaecal junction.
      const oldI=get("intestine").filter(m=>m.name!=="Duodenum");
      if(oldI.length){const sb=[[.025,1.070,.030,.0095],[.036,1.064,.040,.0095]];let k=0;const hsh=n=>{const x=Math.sin(n*127.1)*43758.5;return x-Math.floor(x)};
        const row=(y,x0,x1,r,z0)=>{const n=9;for(let i=1;i<=n;i++){const t=i/n,j=k*13+i;sb.push([x0+(x1-x0)*t+(hsh(j)-.5)*.010,y+.007*Math.sin(t*Math.PI*3+k)+(hsh(j+5)-.5)*.006,z0+.020*Math.sin(t*Math.PI*2.2+k*1.9)+(hsh(j+9)-.5)*.010,r])}k++};
        // jejunum: upper left, thicker, more loops; layered front/back
        [[1.056,.012,.080,.052],[1.044,.080,.004,.034],[1.032,.006,.082,.060],[1.020,.082,.000,.040],[1.008,.002,.080,.064],[.996,.080,-.006,.036],[.986,-.004,.060,.058]].forEach(([y,a,b,z])=>row(y,a,b,.0095,z));
        // ileum: lower right, narrower, down into the pelvis rim
        [[.974,.050,-.064,.040],[.962,-.066,.034,.062],[.950,.030,-.066,.036],[.938,-.066,.026,.060],[.926,.020,-.064,.038],[.914,-.062,.014,.058],[.904,.008,-.058,.044]].forEach(([y,a,b,z])=>row(y,a,b,.0080,z));
        sb.push([-.060,.915,.048,.0078],[-.066,.925,.048,.0076]);
        const g=tube2(sb,(u,th,s,q,tot)=>{const r=q[3]*capR(s,tot,.004,.004);return [r,r*.94]},9,9);
        const par=oldI[0].parent;oldI.forEach(drop);addW(g,M.intestine,"intestine","Small intestine",par)}
      // ===== Hepatic veins (right, middle, left) draining into the IVC just below the diaphragm
      if(L){const hv=[[[-.078,1.185,.002],[-.056,1.215,-.004],[-.034,1.236,-.009]],[[-.040,1.160,.032],[-.034,1.205,.010],[-.029,1.240,-.006]],[[.030,1.200,.026],[.004,1.226,.008],[-.022,1.242,-.006]]];
        hv.forEach((p,i)=>{const g=tube2(p.map(q=>q.concat([.0045])),(u,th,s,q,tot)=>{const r=.0022+.0026*u;return [r,r]},8,10);addW(g,M.vein,"vein","Hepatic vein "+["R","M","L"][i],host)})}
      // ===== Portal system and splenic vessels, attached to the pancreas so they move with it
      const pm2=root.userData.panPm,pp=root.userData.panPts;
      if(pm2&&pp){const art=M.artPS||(M.artPS=organ(0xa3201a,.32,{emissive:new T.Color(0x2a0402),emissiveIntensity:.4}));if(window.__PFT_R10AN!==0)ntm(art); /* r10: these two arteries are made after the r03 Neutral pass, so they were the only viscera left on AgX */const P=new T.Vector3();
        const toPm=m=>{pm2.add(m);m.updateMatrixWorld(true);m.position.set(0,0,0);m.quaternion.identity();m.scale.set(1,1,1)};
        const mk=(pts,r0,r1,mat,name)=>{const g=tube2(pts,(u,th,s,q,tot)=>{const r=(r0+(r1-r0)*u)*capR(s,tot,.002,.002);return [r,r]},8,10);const m=new T.Mesh(g,mat);toPm(m);pm2.updateMatrixWorld(true);
          const A=g.attributes.position;for(let i=0;i<A.count;i++){P.fromBufferAttribute(A,i);pm2.worldToLocal(P);A.setXYZ(i,P.x,P.y,P.z)}g.setAttribute("color",new T.Float32BufferAttribute(new Float32Array(A.count*3).fill(1),3));fixVol(g);
          m.userData.role="vein";m.name=name;m.frustumCulled=false;m.userData.v68=true;meshes.push(m);(byRole.vein=byRole.vein||[]).push(m);return m};
        mk([[-.002,1.000,.052],[-.004,1.035,.048],[-.008,1.068,.036],[-.011,1.090,.029]],.0045,.0055,M.vein,"Superior mesenteric vein");
        mk([[-.011,1.090,.029],[-.020,1.108,.026],[-.032,1.124,.029],[-.042,1.136,.034]],.0062,.0058,M.vein,"Portal vein");
        const neck=3;const sv=[[-.011,1.090,.029]];for(let i=neck+1;i<pp.length;i++)sv.push([pp[i][0],pp[i][1]-.003,pp[i][2]-.010]);mk(sv,.0042,.0036,M.vein,"Splenic vein");
        const sa=[[.006,1.128,.016],[.012,1.126,.030]];for(let i=neck+2;i<pp.length;i++){const t=i-neck;sa.push([pp[i][0],pp[i][1]+.012+.004*Math.sin(t*2.1),pp[i][2]-.004+.004*Math.cos(t*1.7)])}mk(sa,.003,.0026,art,"Splenic artery");
        mk([[.006,1.128,.016],[-.006,1.131,.024],[-.020,1.132,.028],[-.036,1.140,.036]],.0028,.0024,art,"Common hepatic artery")}
      }
    }

    // ---------- v69: realistic reference organ shapes (HRA 3D Reference Object Library, CC BY 4.0) ----------
    // Each reference organ is re-fitted into the box of the organ it replaces, so placement, cut-away windows, fat and
    // teaching offsets stay as before; meshes with morph targets are never replaced. Falls back to the procedural organs if absent.
    function v69HRA(root){const H=window.PFT_HRA;if(!H||!H.organs)return 0;let n=0;
      const dec=s=>{const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer};
      const W=new T.Vector3(),C=new T.Vector3();root.updateMatrixWorld(true);
      const box=ms=>{const b=new T.Box3();ms.forEach(m=>{m.updateMatrixWorld(true);b.union(new T.Box3().setFromBufferAttribute(m.geometry.attributes.position).applyMatrix4(m.matrixWorld))});return b};
      const swap=(m,key,mode)=>{const o=H.organs[key];if(!o||!m||!m.geometry)return;const ma=m.geometry.morphAttributes;if(ma&&Object.keys(ma).length)return;
        const b=box([m]);let qp,ix,ao;
         if(o.v){const D=T.MeshoptDecoder,v=new Uint16Array(o.n*4),i32=new Uint32Array(o.t*3);D.decodeVertexBuffer(new Uint8Array(v.buffer),o.n,8,new Uint8Array(dec(o.v)));D.decodeIndexBuffer(new Uint8Array(i32.buffer),o.t*3,4,new Uint8Array(dec(o.ix))); /* v74: meshopt-compressed (xyz + cavity shade packed in 4 x uint16) */
           qp=new Uint16Array(o.n*3);ao=new Uint8Array(o.n);for(let q=0;q<o.n;q++){qp[q*3]=v[q*4];qp[q*3+1]=v[q*4+1];qp[q*3+2]=v[q*4+2];ao[q]=v[q*4+3]}ix=o.n<65536?new Uint16Array(i32):i32}
         else{qp=new Uint16Array(dec(o.p));ix=o.n<65536?new Uint16Array(dec(o.i)):new Uint32Array(dec(o.i));ao=new Uint8Array(dec(o.ao))}
        const sz=[0,1,2].map(a=>o.max[a]-o.min[a]),tz=[0,1,2].map(a=>b.max.getComponent(a)-b.min.getComponent(a));let sc=[0,1,2].map(a=>tz[a]/sz[a]),off=[0,1,2].map(a=>b.min.getComponent(a));
        if(mode==="uni"){const u=Math.sqrt(sc[0]*sc[2]);sc=[u,u,u];off=[b.min.x+(tz[0]-sz[0]*u)/2,b.max.y-sz[1]*u,b.min.z+(tz[2]-sz[2]*u)/2]}
        if(mode==="soft"){const g=Math.cbrt(sc[0]*sc[1]*sc[2]);sc=sc.map(v=>Math.sqrt(v*g));off=[0,1,2].map(a=>b.min.getComponent(a)+(tz[a]-sz[a]*sc[a])/2)}
        const pos=new Float32Array(o.n*3),occ=new Float32Array(o.n),col=new Float32Array(o.n*3);
        for(let v=0;v<o.n;v++){for(let a=0;a<3;a++)W.setComponent(a,off[a]+(qp[v*3+a]/65535)*sz[a]*sc[a]);m.worldToLocal(W);pos[v*3]=W.x;pos[v*3+1]=W.y;pos[v*3+2]=W.z;const c=ao[v]/255;occ[v]=1-c;col[v*3]=col[v*3+1]=col[v*3+2]=key==="lungs"?.55+.45*c:1}
        const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("aOcc",new T.Float32BufferAttribute(occ,1));g.setAttribute("color",new T.Float32BufferAttribute(col,3));
        if(m.geometry.attributes.uv)g.setAttribute("uv",new T.Float32BufferAttribute(new Float32Array(o.n*2),2));
        g.setIndex(new T.BufferAttribute(ix,1));{let vol=0;for(let i=0;i<ix.length;i+=3){const a=ix[i]*3,b2=ix[i+1]*3,c=ix[i+2]*3;vol+=pos[a]*(pos[b2+1]*pos[c+2]-pos[b2+2]*pos[c+1])-pos[a+1]*(pos[b2]*pos[c+2]-pos[b2+2]*pos[c])+pos[a+2]*(pos[b2]*pos[c+1]-pos[b2+1]*pos[c])}if(vol<0)for(let i=0;i<ix.length;i+=3){const t=ix[i+1];ix[i+1]=ix[i+2];ix[i+2]=t}}g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();m.geometry.dispose&&m.geometry.dispose();m.geometry=g;m.userData.hra=key;n++}; // v70: winding fixed by signed volume, so single-sided (DoubleSide cost ~25% frame time)
      const by=r=>meshes.filter(m=>m.userData.role===r&&m.isMesh);const nm=x=>meshes.find(m=>m.name===x);
      swap(by("liver").sort((a,b)=>b.geometry.attributes.position.count-a.geometry.attributes.position.count)[0],"liver");
      swap(nm("Lungs"),"lungs");swap(nm("Colon"),"colon");swap(nm("Small intestine"),"smallint","soft");
      // r02: haustra, taeniae coli and appendices epiploicae on the reference colon (original procedural code). The HRA mesh
      // has no UVs, so a centre line is fitted to it (chain-constrained Lloyd fit from a coarse caecum->rectum guide in box
      // fractions), every vertex gets (weight, arc length, ring angle from the anterior taenia) in aCo, and the haustral
      // sacculations are baked into the geometry once at load (no extra triangles or draw calls).
      const colonCoords=m=>{if(!m||!m.geometry||!m.userData.hra)return;const g=m.geometry,Pa=g.attributes.position,n=Pa.count;m.updateMatrixWorld(true);
        const P=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++){v.fromBufferAttribute(Pa,i).applyMatrix4(m.matrixWorld);P[i*3]=v.x;P[i*3+1]=v.y;P[i*3+2]=v.z}
        const bb=new T.Box3().setFromArray(P),mn=bb.min.toArray(),ex=bb.max.clone().sub(bb.min).toArray();
        const SD=[[.157,.355,.503],[.157,.507,.503],[.157,.7,.503],[.179,.837,.572],[.314,.727,.814],[.538,.741,.848],[.717,.837,.814],[.852,.975,.641],[.897,.837,.503],[.888,.617,.503],[.874,.424,.503],[.762,.287,.538],[.583,.245,.572],[.448,.231,.434],[.448,.121,.159],[.448,.011,.055]].map(s=>s.map((f,a)=>mn[a]+f*ex[a]));
        let C=[];for(let i=0;i<SD.length-1;i++){const a=SD[i],b=SD[i+1],k=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])/.025));for(let j=0;j<k;j++)C.push([0,1,2].map(q=>a[q]+(b[q]-a[q])*j/k))}C.push(SD[SD.length-1].slice());
        const K=C.length,asg=new Int32Array(n);
        for(let it=0;it<12;it++){const S=C.map(()=>[0,0,0,0]);for(let i=0;i<n;i++){let bd=1e9,bi=0;for(let k=0;k<K;k++){const c=C[k],d=(P[i*3]-c[0])**2+(P[i*3+1]-c[1])**2+(P[i*3+2]-c[2])**2;if(d<bd){bd=d;bi=k}}asg[i]=bi;const s=S[bi];s[0]+=P[i*3];s[1]+=P[i*3+1];s[2]+=P[i*3+2];s[3]++}
          let N=C.map((c,k)=>S[k][3]>3?[S[k][0]/S[k][3],S[k][1]/S[k][3],S[k][2]/S[k][3]]:c.slice());for(let r=0;r<2;r++)N=N.map((c,k)=>k==0||k==K-1?c:c.map((x,a)=>.6*x+.2*(N[k-1][a]+N[k+1][a])));C=N}
        // densify (Catmull-Rom), arc length, anterior-referenced frame (smoothed)
        const Q=[];for(let k=0;k<K-1;k++){const p0=C[Math.max(0,k-1)],p1=C[k],p2=C[k+1],p3=C[Math.min(K-1,k+2)];for(let j=0;j<6;j++){const t=j/6,t2=t*t,t3=t2*t;Q.push([0,1,2].map(a=>.5*(2*p1[a]+(-p0[a]+p2[a])*t+(2*p0[a]-5*p1[a]+4*p2[a]-p3[a])*t2+(-p0[a]+3*p1[a]-3*p2[a]+p3[a])*t3)))}}Q.push(C[K-1]);
        const M2=Q.length,L=[0],Tg=[],E1=[];for(let k=1;k<M2;k++)L.push(L[k-1]+Math.hypot(Q[k][0]-Q[k-1][0],Q[k][1]-Q[k-1][1],Q[k][2]-Q[k-1][2]));const LT=L[M2-1];
        for(let k=0;k<M2;k++){const a=Q[Math.max(0,k-1)],b=Q[Math.min(M2-1,k+1)];Tg.push(new T.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]).normalize())}
        for(let k=0;k<M2;k++){const t=Tg[k],e=new T.Vector3(0,.25,1).addScaledVector(t,-(.25*t.y+t.z));E1.push(e.lengthSq()>1e-6?e.normalize():new T.Vector3(1,0,0))}
        for(let r=0;r<4;r++)for(let k=1;k<M2-1;k++){E1[k].add(E1[k-1]).add(E1[k+1]).addScaledVector(Tg[k],-E1[k].dot(Tg[k]));if(E1[k].lengthSq()>1e-9)E1[k].normalize()}
        const co=new Float32Array(n*4),tx=new Float32Array(n*3),rad=new Float32Array(n),seg=new Int32Array(n),fr=new Float32Array(n);const sr=new Float32Array(M2),sc=new Float32Array(M2);
        for(let i=0;i<n;i++){let bd=1e9,bk=0,bf=0;const x=P[i*3],y=P[i*3+1],z=P[i*3+2];for(let k=0;k<M2-1;k++){const a=Q[k],b=Q[k+1],dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],l2=dx*dx+dy*dy+dz*dz||1e-12;let f=((x-a[0])*dx+(y-a[1])*dy+(z-a[2])*dz)/l2;f=f<0?0:f>1?1:f;const d=(x-a[0]-f*dx)**2+(y-a[1]-f*dy)**2+(z-a[2]-f*dz)**2;if(d<bd){bd=d;bk=k;bf=f}}
          seg[i]=bk;fr[i]=bf;rad[i]=Math.sqrt(bd);sr[bk]+=rad[i];sc[bk]++}
        const Rl=new Float32Array(M2);for(let k=0;k<M2;k++){let s=0,c=0;for(let j=Math.max(0,k-8);j<=Math.min(M2-1,k+8);j++){s+=sr[j];c+=sc[j]}Rl[k]=c?s/c:.02}
        const c0=new T.Vector3(),r=new T.Vector3(),e2=new T.Vector3(),tA=2.0944,SS=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
        for(let i=0;i<n;i++){const k=seg[i],f=fr[i],a=Q[k],b=Q[k+1];c0.set(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f);const t=Tg[k],e1=E1[k];
          r.set(P[i*3],P[i*3+1],P[i*3+2]).sub(c0);r.addScaledVector(t,-r.dot(t));const rl=r.length();if(rl>1e-7)r.multiplyScalar(1/rl);e2.crossVectors(t,e1);
          const th=Math.atan2(r.dot(e2),r.dot(e1)),s=L[k]+f*(L[k+1]-L[k]),R=Rl[k];
          // weight: no sacculations on the rectum (last ~9 cm) or on the appendix/caecal tip (vertices far off the fitted tube)
          const w=(1-SS(s,LT-.11,LT-.07))*(1-SS(rad[i]/R,1.45,1.9))*SS(s,.0,.03);
          co[i*4]=w;co[i*4+1]=s;co[i*4+2]=Math.cos(th);co[i*4+3]=Math.sin(th);rad[i]=R;tx[i*3]=r.x;tx[i*3+1]=r.y;tx[i*3+2]=r.z}
        // where neighbouring vertices project onto different parts of the centre line (tight flexures) the arc length jumps:
        // no sacculation there, feathered over the welded mesh so the duplicated seam vertices stay crack-free
        const wm=new Map(),id=new Int32Array(n);for(let i=0;i<n;i++){const k=Math.round(P[i*3]/5e-4)+","+Math.round(P[i*3+1]/5e-4)+","+Math.round(P[i*3+2]/5e-4);let q=wm.get(k);if(q===undefined){q=i;wm.set(k,i)}id[i]=q}
        const ix=g.index.array,jmp=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]],ds=Math.abs(co[a*4+1]-co[b*4+1])-1.3*Math.hypot(P[a*3]-P[b*3],P[a*3+1]-P[b*3+1],P[a*3+2]-P[b*3+2]);if(ds>jmp[a])jmp[a]=ds;if(ds>jmp[b])jmp[b]=ds}
        let W=new Float32Array(n);for(let i=0;i<n;i++)W[i]=id[i]===i?co[i*4]*(1-SS(jmp[i],.004,.012)):0;
        for(let it=0;it<3;it++){const A=new Float32Array(n),Cn=new Float32Array(n),Mn=W.slice();for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]];A[a]+=W[b];Cn[a]++;A[b]+=W[a];Cn[b]++;if(W[b]<Mn[a])Mn[a]=W[b];if(W[a]<Mn[b])Mn[b]=W[a]}
          for(let i=0;i<n;i++)if(id[i]===i&&Cn[i])W[i]=it<1?Mn[i]:.5*W[i]+.5*A[i]/Cn[i]}
        for(let i=0;i<n;i++){const w=W[id[i]];co[i*4]=w;const s=co[i*4+1],th=Math.atan2(co[i*4+3],co[i*4+2]),R=rad[i];
          const ph=s/.031+.18*Math.sin(s*19)+.08*Math.sin(s*53),u=ph-Math.floor(ph),dt=Math.abs(((th+tA/2)%tA+tA)%tA-tA/2);
          const band=1-SS(dt,.05,.11),fold=(1-SS(Math.min(u,1-u),0,.2))*(1-band),pouch=Math.sin(Math.PI*u);
          const d=R*w*(.12*pouch*SS(dt,.08,.45)-.14*fold-.02*band);
          v.set(P[i*3],P[i*3+1],P[i*3+2]).addScaledVector(r.set(tx[i*3],tx[i*3+1],tx[i*3+2]),d);m.worldToLocal(v);Pa.setXYZ(i,v.x,v.y,v.z)}
        Pa.needsUpdate=true;g.setAttribute("aCo",new T.Float32BufferAttribute(co,4));g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();m.userData.colonLen=LT};
      try{colonCoords(nm("Colon"))}catch(e){console.warn("colon haustra",e)}
      // r06: small-bowel calibre + mesenteric frame (original procedural code, HRA mesh only, no new triangles/draw calls).
      // The jejunum/ileum is one long convoluted tube, so instead of a guided centre line each welded vertex gets a local
      // tube axis (smallest eigenvector of its 2-ring normal covariance), a tube radius from circumferential curvature and an
      // approximate centre point. Smooth 3D noise sampled at the centre point dilates/narrows whole rings (calibre variation,
      // wider jejunum upper-left, narrower ileum lower-right). The axis is integrated into a local axial coordinate (BFS +
      // relaxation) for circumferential vasa recta in the shader, and each vertex gets a mesenteric-border weight from the
      // direction to the mesentery root (upper left -> right iliac fossa). aSb = (axial s, mesenteric cos, 0, 0).
      const sibCoords=m=>{if(!m||!m.geometry||!m.userData.hra||!m.geometry.index)return;const g=m.geometry,Pa=g.attributes.position,n=Pa.count,ix=g.index.array;m.updateMatrixWorld(true);
        const P=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++){v.fromBufferAttribute(Pa,i).applyMatrix4(m.matrixWorld);P[i*3]=v.x;P[i*3+1]=v.y;P[i*3+2]=v.z}
        const wm=new Map(),id=new Int32Array(n);for(let i=0;i<n;i++){const k=Math.round(P[i*3]/5e-4)+","+Math.round(P[i*3+1]/5e-4)+","+Math.round(P[i*3+2]/5e-4);let q=wm.get(k);if(q===undefined){q=i;wm.set(k,i)}id[i]=q}
        const N=new Float32Array(n*3),dg=new Int32Array(n+1);
        for(let t=0;t<ix.length;t+=3){const a=id[ix[t]],b=id[ix[t+1]],c=id[ix[t+2]];const ux=P[b*3]-P[a*3],uy=P[b*3+1]-P[a*3+1],uz=P[b*3+2]-P[a*3+2],wx=P[c*3]-P[a*3],wy=P[c*3+1]-P[a*3+1],wz=P[c*3+2]-P[a*3+2];
          const nx=uy*wz-uz*wy,ny=uz*wx-ux*wz,nz=ux*wy-uy*wx;for(const q of [a,b,c]){N[q*3]+=nx;N[q*3+1]+=ny;N[q*3+2]+=nz}dg[a]+=2;dg[b]+=2;dg[c]+=2}
        for(let i=0;i<n;i++){const l=Math.hypot(N[i*3],N[i*3+1],N[i*3+2])||1;N[i*3]/=l;N[i*3+1]/=l;N[i*3+2]/=l}
        const st=new Int32Array(n+1);for(let i=0;i<n;i++)st[i+1]=st[i]+dg[i];const fill=st.slice(0,n),nb=new Int32Array(st[n]);
        for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]];nb[fill[a]++]=b;nb[fill[b]++]=a}
        const reps=[];for(let i=0;i<n;i++)if(id[i]===i&&st[i+1]>st[i])reps.push(i);
        const A=new Float32Array(n*3),stamp=new Int32Array(n).fill(-1),ring=[];
        for(const i of reps){ring.length=0;stamp[i]=i;for(let a=st[i];a<st[i+1];a++){const j=nb[a];if(stamp[j]!==i){stamp[j]=i;ring.push(j)}}const r1=ring.length;for(let q=0;q<r1;q++){const j=ring[q];for(let a=st[j];a<st[j+1];a++){const k=nb[a];if(stamp[k]!==i){stamp[k]=i;ring.push(k)}}}
          let c00=0,c01=0,c02=0,c11=0,c12=0,c22=0,lo=2,fj=i;for(const j of ring){const x=N[j*3],y=N[j*3+1],z=N[j*3+2];c00+=x*x;c01+=x*y;c02+=x*z;c11+=y*y;c12+=y*z;c22+=z*z;const d=x*N[i*3]+y*N[i*3+1]+z*N[i*3+2];if(d<lo){lo=d;fj=j}}
          const tr=c00+c11+c22;let ax=N[i*3+1]*N[fj*3+2]-N[i*3+2]*N[fj*3+1],ay=N[i*3+2]*N[fj*3]-N[i*3]*N[fj*3+2],az=N[i*3]*N[fj*3+1]-N[i*3+1]*N[fj*3];if(ax*ax+ay*ay+az*az<1e-8){ax=1;ay=0;az=0}
          for(let it=0;it<8;it++){const x=(tr-c00)*ax-c01*ay-c02*az,y=-c01*ax+(tr-c11)*ay-c12*az,z=-c02*ax-c12*ay+(tr-c22)*az,l=Math.hypot(x,y,z)||1;ax=x/l;ay=y/l;az=z/l}A[i*3]=ax;A[i*3+1]=ay;A[i*3+2]=az}
        for(let r=0;r<2;r++){const B=A.slice();for(const i of reps){let x=B[i*3],y=B[i*3+1],z=B[i*3+2];for(let a=st[i];a<st[i+1];a++){const j=nb[a],s=Math.sign(B[j*3]*B[i*3]+B[j*3+1]*B[i*3+1]+B[j*3+2]*B[i*3+2])||1;x+=s*B[j*3];y+=s*B[j*3+1];z+=s*B[j*3+2]}
          const nx=N[i*3],ny=N[i*3+1],nz=N[i*3+2],dn=x*nx+y*ny+z*nz;x-=dn*nx;y-=dn*ny;z-=dn*nz;const l=Math.hypot(x,y,z);if(l>1e-9){A[i*3]=x/l;A[i*3+1]=y/l;A[i*3+2]=z/l}}}
        // tube radius from circumferential curvature (median over the mesh)
        const ks=[];for(const i of reps){let ks0=0,kc=0;const ax=A[i*3],ay=A[i*3+1],az=A[i*3+2];for(let a=st[i];a<st[i+1];a++){const j=nb[a];let ex=P[j*3]-P[i*3],ey=P[j*3+1]-P[i*3+1],ez=P[j*3+2]-P[i*3+2];let d=ex*ax+ey*ay+ez*az;ex-=d*ax;ey-=d*ay;ez-=d*az;
          let fx=N[j*3]-N[i*3],fy=N[j*3+1]-N[i*3+1],fz=N[j*3+2]-N[i*3+2];d=fx*ax+fy*ay+fz*az;fx-=d*ax;fy-=d*ay;fz-=d*az;const ee=ex*ex+ey*ey+ez*ez;if(ee>1e-10){ks0+=(fx*ex+fy*ey+fz*ez)/ee;kc++}}if(kc)ks.push(ks0/kc)}
        ks.sort((a,b)=>a-b);const kap=ks[ks.length>>1]||60,Rm=Math.min(.03,Math.max(.006,1/Math.max(kap,1)));
        const bb=new T.Box3().setFromArray(P),mn=bb.min,ex=bb.max.clone().sub(bb.min);
        const hh=(x,y,z)=>{const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return s-Math.floor(s)},sm=t=>t*t*(3-2*t);
        const vn=(x,y,z)=>{const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),fx=sm(x-xi),fy=sm(y-yi),fz=sm(z-zi);let r=0;for(let c=0;c<8;c++){const dx=c&1,dy=c>>1&1,dz=c>>2&1;r+=hh(xi+dx,yi+dy,zi+dz)*(dx?fx:1-fx)*(dy?fy:1-fy)*(dz?fz:1-fz)}return r*2-1};
        // mesentery root (patient's upper left at ~L2 -> right iliac fossa), posterior, in box fractions
        const R0=[mn.x+.66*ex.x,mn.y+.80*ex.y,mn.z+.22*ex.z],R1=[mn.x+.28*ex.x,mn.y+.22*ex.y,mn.z+.22*ex.z],rd=[R1[0]-R0[0],R1[1]-R0[1],R1[2]-R0[2]],rl2=rd[0]**2+rd[1]**2+rd[2]**2;
        const D=new Float32Array(n),MS=new Float32Array(n);
        for(const i of reps){const cx=P[i*3]-N[i*3]*Rm,cy=P[i*3+1]-N[i*3+1]*Rm,cz=P[i*3+2]-N[i*3+2]*Rm;
          const f1=vn(cx/.042,cy/.042,cz/.042),f2=vn(cx/.016+5.3,cy/.016+1.7,cz/.016+8.1),jf=Math.max(-1,Math.min(1,(cx-mn.x)/ex.x+(cy-mn.y)/ex.y-1));
          D[i]=Rm*(.20*f1+.06*f2+.09*jf);
          let f=((cx-R0[0])*rd[0]+(cy-R0[1])*rd[1]+(cz-R0[2])*rd[2])/rl2;f=f<0?0:f>1?1:f;let dx=R0[0]+f*rd[0]-cx,dy=R0[1]+f*rd[1]-cy,dz=R0[2]+f*rd[2]-cz;const ax=A[i*3],ay=A[i*3+1],az=A[i*3+2],da=dx*ax+dy*ay+dz*az;dx-=da*ax;dy-=da*ay;dz-=da*az;const l=Math.hypot(dx,dy,dz)||1;
          MS[i]=(dx*N[i*3]+dy*N[i*3+1]+dz*N[i*3+2])/l}
        // axial coordinate: BFS with sign-aligned axes, then Jacobi relaxation (only local consistency matters)
        const S=new Float32Array(n),seen=new Uint8Array(n),Q=new Int32Array(n);for(const s0 of reps){if(seen[s0])continue;let h=0,tl=0;Q[tl++]=s0;seen[s0]=1;while(h<tl){const i=Q[h++];for(let a=st[i];a<st[i+1];a++){const j=nb[a];if(seen[j])continue;seen[j]=1;
          if(A[j*3]*A[i*3]+A[j*3+1]*A[i*3+1]+A[j*3+2]*A[i*3+2]<0){A[j*3]*=-1;A[j*3+1]*=-1;A[j*3+2]*=-1}
          const mx=.5*(A[i*3]+A[j*3]),my=.5*(A[i*3+1]+A[j*3+1]),mz=.5*(A[i*3+2]+A[j*3+2]);S[j]=S[i]+(P[j*3]-P[i*3])*mx+(P[j*3+1]-P[i*3+1])*my+(P[j*3+2]-P[i*3+2])*mz;Q[tl++]=j}}}
        for(let r=0;r<24;r++){const S0=S.slice();for(const i of reps){let s=0,c=0;for(let a=st[i];a<st[i+1];a++){const j=nb[a],sg=Math.sign(A[j*3]*A[i*3]+A[j*3+1]*A[i*3+1]+A[j*3+2]*A[i*3+2])||1;if(sg<0)continue;
          s+=S0[j]-((P[j*3]-P[i*3])*A[i*3]+(P[j*3+1]-P[i*3+1])*A[i*3+1]+(P[j*3+2]-P[i*3+2])*A[i*3+2]);c++}if(c)S[i]=.5*S0[i]+.5*s/c}}
        const sb=new Float32Array(n*4);for(let i=0;i<n;i++){const q=id[i],d=D[q];v.set(P[i*3]+N[q*3]*d,P[i*3+1]+N[q*3+1]*d,P[i*3+2]+N[q*3+2]*d);m.worldToLocal(v);Pa.setXYZ(i,v.x,v.y,v.z);sb[i*4]=S[q];sb[i*4+1]=MS[q]}
        Pa.needsUpdate=true;g.setAttribute("aSb",new T.Float32BufferAttribute(sb,4));g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();m.userData.sibR=Rm};
      if(window.__PFT_R06SB!==0)try{sibCoords(nm("Small intestine"))}catch(e){console.warn("small bowel calibre",e)}
      const ap=nm("Appendix");if(ap)ap.visible=false,ap.scale.set(1e-4,1e-4,1e-4); // the reference colon carries its own caecum + appendix
      by("pancreas").forEach(m=>swap(m,"pancreas"));by("spleen").forEach(m=>swap(m,"spleen"));by("gall").forEach(m=>swap(m,"gall"));
      by("kidney").forEach(m=>{const b=box([m]);swap(m,(b.min.x+b.max.x)/2>0?"kidneyL":"kidneyR","uni")});
      by("heart").forEach(m=>swap(m,"heart","soft"));
      // r25 (day 1025, original procedural code): (a) mesentery fan, (b) round arteries at the top of the stomach,
      // (c) smoother small-bowel loop tips, see below. window.__PFT_R25=0 gives the previous behaviour.
      if(window.__PFT_R25!==0){const SS=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
      // (c) small-bowel loop tips: the reference mesh is coarse where loops turn back on themselves, so the tightest
      // bends read as faceted ridges. Curvature-weighted Taubin smoothing (shrink-free) over the welded mesh, then
      // welded normals so duplicated seam vertices shade as one. No new triangles.
      try{const m=nm("Small intestine");if(m&&m.geometry&&m.geometry.index&&m.userData.hra){const g=m.geometry,Pa=g.attributes.position,n=Pa.count,ix=g.index.array;
        const P=new Float32Array(Pa.array.length);P.set(Pa.array);const wm=new Map(),id=new Int32Array(n);for(let i=0;i<n;i++){const k=Math.round(P[i*3]/5e-4)+","+Math.round(P[i*3+1]/5e-4)+","+Math.round(P[i*3+2]/5e-4);let q=wm.get(k);if(q===undefined){q=i;wm.set(k,i)}id[i]=q}
        const fn=()=>{const N=new Float32Array(n*3);for(let t=0;t<ix.length;t+=3){const a=id[ix[t]],b=id[ix[t+1]],c=id[ix[t+2]];const ux=P[b*3]-P[a*3],uy=P[b*3+1]-P[a*3+1],uz=P[b*3+2]-P[a*3+2],wx=P[c*3]-P[a*3],wy=P[c*3+1]-P[a*3+1],wz=P[c*3+2]-P[a*3+2];const nx=uy*wz-uz*wy,ny=uz*wx-ux*wz,nz=ux*wy-uy*wx;for(const q of [a,b,c]){N[q*3]+=nx;N[q*3+1]+=ny;N[q*3+2]+=nz}}
          for(let i=0;i<n;i++){const l=Math.hypot(N[i*3],N[i*3+1],N[i*3+2])||1;N[i*3]/=l;N[i*3+1]/=l;N[i*3+2]/=l}return N};
        let N=fn();const sh=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]],d=1-(N[a*3]*N[b*3]+N[a*3+1]*N[b*3+1]+N[a*3+2]*N[b*3+2]);if(d>sh[a])sh[a]=d;if(d>sh[b])sh[b]=d}
        const w=new Float32Array(n);for(let i=0;i<n;i++)w[i]=SS(sh[i],.02,.14);for(let r=0;r<2;r++){const w0=w.slice();for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]];if(w0[b]*.7>w[a])w[a]=w0[b]*.7;if(w0[a]*.7>w[b])w[b]=w0[a]*.7}}
        for(let it=0;it<10;it++){const lam=it%2?-.53:.5,A=new Float32Array(n*3),C=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=id[ix[t+e]],b=id[ix[t+(e+1)%3]];for(let q=0;q<3;q++){A[a*3+q]+=P[b*3+q];A[b*3+q]+=P[a*3+q]}C[a]++;C[b]++}
          for(let i=0;i<n;i++)if(id[i]===i&&C[i]){const k=lam*w[i];for(let q=0;q<3;q++)P[i*3+q]+=k*(A[i*3+q]/C[i]-P[i*3+q])}}
        N=fn();const Na=new Float32Array(n*3);for(let i=0;i<n;i++){const q=id[i];Pa.setXYZ(i,P[q*3],P[q*3+1],P[q*3+2]);Na[i*3]=N[q*3];Na[i*3+1]=N[q*3+1];Na[i*3+2]=N[q*3+2]}
        Pa.needsUpdate=true;g.setAttribute("normal",new T.Float32BufferAttribute(Na,3));g.computeBoundingBox();g.computeBoundingSphere()}}catch(e){console.warn("r25 bowel tips",e)}
      // (a) mesentery fan: a thin, translucent, pleated sheet from the posterior root (upper left at ~L2 down to the right
      // iliac fossa) out to the mesenteric border of the loops, with faint radial arcade vessels and a little fat near the
      // root. One small mesh (~1.7k triangles), drawn with the other veils (renderOrder 2, no depth write).
      try{const m=nm("Small intestine");const sb=m&&m.geometry.attributes.aSb;if(m&&sb){m.updateMatrixWorld(true);const Pa=m.geometry.attributes.position,Nn=m.geometry.attributes.normal,n=Pa.count;
        const P=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++){v.fromBufferAttribute(Pa,i).applyMatrix4(m.matrixWorld);P[i*3]=v.x;P[i*3+1]=v.y;P[i*3+2]=v.z}
        const bb=new T.Box3().setFromArray(P),mn=bb.min,ex=bb.max.clone().sub(bb.min);
        const R0=new T.Vector3(mn.x+.66*ex.x,mn.y+.80*ex.y,mn.z+.20*ex.z),R1=new T.Vector3(mn.x+.28*ex.x,mn.y+.22*ex.y,mn.z+.20*ex.z),rd=R1.clone().sub(R0),rl=rd.length();rd.normalize();
        const K=72,J=12,bins=Array.from({length:K},()=>[]),q=new T.Vector3();
        for(let i=0;i<n;i+=1){if(sb.getY(i)<.55)continue;q.set(P[i*3],P[i*3+1],P[i*3+2]).sub(R0);const f=q.dot(rd)/rl;if(f<0||f>1)continue;q.addScaledVector(rd,-q.dot(rd)*1);const d=q.length();if(d<.012)continue;bins[Math.min(K-1,Math.floor(f*K))].push([d,P[i*3],P[i*3+1],P[i*3+2]])}
        let E=[];for(let k=0;k<K;k++){const b=bins[k].sort((a,c)=>a[0]-c[0]);const f=(k+.5)/K,r=R0.clone().addScaledVector(rd,f*rl);if(b.length<3){E.push(null);continue}const s=b[Math.floor(b.length*.8)];E.push(new T.Vector3(s[1],s[2],s[3]).sub(r))}
        const okE=E.filter(Boolean);if(okE.length>K/3){const avg=okE.reduce((a,c)=>a.add(c),new T.Vector3()).multiplyScalar(1/okE.length);E=E.map(e=>e||avg.clone());
          for(let r=0;r<4;r++)E=E.map((e,k)=>k==0||k==K-1?e:e.clone().multiplyScalar(.5).addScaledVector(E[k-1],.25).addScaledVector(E[k+1],.25));
          const pos=[],col=[],idx=[],ft=[];for(let k=0;k<K;k++){const f=(k+.5)/K,r=R0.clone().addScaledVector(rd,f*rl),e=E[k],nr=new T.Vector3().crossVectors(rd,e).normalize(),el=e.length(),end=SS(f,0,.07)*(1-SS(f,.93,1));
            const vs=(k%4===0)?1:(k%4===2?.35:0);
            for(let j=0;j<=J;j++){const t=j/J,pl=.0045*Math.pow(t,1.3)*Math.sin(k*Math.PI/2.5+t*2.0)+.0012*Math.sin(k*1.7+t*9.);
              const p=r.clone().addScaledVector(e,t*(.35+.65*end)).addScaledVector(nr,pl+.006*Math.sin(Math.PI*t)*el/.05);pos.push(p.x,p.y,p.z);
              ft.push(t,f);const fat=(1-SS(t,.0,.45))*.7,vv=vs*SS(t,.05,.2)*(1-SS(t,.75,.95))*.8;let cr=.94-.06*fat,cg=.80-.03*fat,cb=.64-.22*fat;cr=cr*(1-vv)+.62*vv;cg=cg*(1-vv)+.16*vv;cb=cb*(1-vv)+.13*vv;
              const a=(.42+.2*fat+.25*vv)*(1-SS(t,.8,1))*SS(f,0,.05)*(1-SS(f,.95,1));col.push(cr,cg,cb,a)}}
          for(let k=0;k<K-1;k++)for(let j=0;j<J;j++){const A=k*(J+1)+j,B=A+J+1;idx.push(A,B,A+1,B,B+1,A+1)}
          const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("color",new T.Float32BufferAttribute(col,4));g.setIndex(idx);g.setAttribute("aFt",new T.Float32BufferAttribute(ft,2));g.computeVertexNormals();g.computeBoundingSphere();
          const mat=M.mesFan||(M.mesFan=window.__PFT_R27MES===0?new T.MeshStandardMaterial({color:0xffffff,vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,roughness:.55,metalness:0}):patch(new T.MeshPhysicalMaterial({color:0xffffff,vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,roughness:.42,metalness:0,clearcoat:.35,clearcoatRoughness:.3}),"mesfan27",{uniforms:omU,
            /* r27: mesenteric fat - with visceral fat the thin fan fills with yellow lobulated fat from the root outward and puffs up along the arcades (driven by uVisc = A1c / PFT visceral input) */
            vdecl:"attribute vec2 aFt;varying vec2 vFt;uniform float uVisc;\n",vpre:"{float th=uVisc*(1.-smoothstep(.15,.95,aFt.x*(1.-.55*uVisc)));float lb=.5+.5*sin(aFt.y*260.+aFt.x*17.)*sin(aFt.x*31.+aFt.y*90.);transformed+=normalize(objectNormal)*th*(.0025+.0045*lb);}\n",vmain:"vFt=aFt;\n",
            fdecl:"uniform float uVisc;varying vec2 vFt;\n",
            color:"{float reach=.18+.8*min(1.,uVisc*1.25);float fz=(1.-smoothstep(reach-.25,reach,vFt.x))*min(1.,uVisc*1.8);vec2 c=pftCell(vPos*150.);float lob=smoothstep(.02,.2,c.y-c.x);float dm=1.-smoothstep(.0,.8,c.x);vec2 c2=pftCell(vPos*380.);float sub=smoothstep(.02,.14,c2.y-c2.x);vec3 fat=mix(vec3(.86,.60,.20),vec3(1.,.82,.40),dm*.6+.4*pftNoise(vPos*40.))*mix(.88,1.,sub)*mix(.74,1.,dm);vec3 sep=vec3(.80,.50,.32);diffuseColor.rgb=mix(diffuseColor.rgb,mix(sep,fat,lob),fz*.92);diffuseColor.a=mix(diffuseColor.a,max(diffuseColor.a,.82*mix(.75,1.,lob)),fz);pftDome=mix(1.,.78+.3*dm,fz);}",
            normal:"normal=pftBump(normal,pftCell(vPos*150.).x*-1.*min(1.,uVisc*1.6),.0022);"}));
          const fm=new T.Mesh(g,mat);fm.name="Mesentery fan";fm.userData.role="mesentery";fm.userData.v68=true;fm.frustumCulled=false;fm.renderOrder=2;fm.receiveShadow=false;const hp=m.parent;hp.updateMatrixWorld(true);{const A=g.attributes.position;for(let i=0;i<A.count;i++){v.fromBufferAttribute(A,i);hp.worldToLocal(v);A.setXYZ(i,v.x,v.y,v.z)}g.computeVertexNormals();g.computeBoundingSphere()}hp.add(fm);meshes.push(fm);(byRole.mesentery=byRole.mesentery||[]).push(fm)}}}catch(e){console.warn("r25 mesentery fan",e)}
      // (b) the reference arterial tree has a few square-section stubs at the top of the stomach (left gastric /
      // oesophageal branches). Each one is replaced by a round, tapered tube fitted to its centre line (same material).
      try{const m=nm("mesh_20"),q=new T.Vector3();if(m&&m.geometry.index){m.updateMatrixWorld(true);const g=m.geometry,Pa=g.attributes.position,n=Pa.count,ix=g.index.array;
        const W=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++){v.fromBufferAttribute(Pa,i).applyMatrix4(m.matrixWorld);W[i*3]=v.x;W[i*3+1]=v.y;W[i*3+2]=v.z}
        const wm=new Map(),id=new Int32Array(n);for(let i=0;i<n;i++){const k=Math.round(W[i*3]/2e-4)+","+Math.round(W[i*3+1]/2e-4)+","+Math.round(W[i*3+2]/2e-4);let q=wm.get(k);if(q===undefined){q=i;wm.set(k,i)}id[i]=q}
        const par=new Int32Array(n).map((_,i)=>i),fd=x=>{while(par[x]!==x)x=par[x]=par[par[x]];return x};for(let t=0;t<ix.length;t+=3){const a=fd(id[ix[t]]);par[fd(id[ix[t+1]])]=a;par[fd(id[ix[t+2]])]=a}
        const C=new Map();for(let i=0;i<n;i++){const r=fd(id[i]);let c=C.get(r);if(!c)C.set(r,c={v:[],mn:[9,9,9],mx:[-9,-9,-9]});c.v.push(i);for(let a=0;a<3;a++){c.mn[a]=Math.min(c.mn[a],W[i*3+a]);c.mx[a]=Math.max(c.mx[a],W[i*3+a])}}
        const kill=new Set();const add=[];
        for(const [r,c] of C){if(!(c.v.length<400&&c.mn[1]>1.24&&c.mx[1]<1.33&&c.mn[2]>.02&&c.mn[0]>-.045&&c.mx[0]<.07))continue;
          const vs=[...new Set(c.v.map(i=>id[i]))],ce=new T.Vector3();vs.forEach(i=>ce.x+=W[i*3]/vs.length);vs.forEach(i=>ce.y+=W[i*3+1]/vs.length);vs.forEach(i=>ce.z+=W[i*3+2]/vs.length);
          let ax=new T.Vector3(1,.3,.2).normalize();for(let it=0;it<12;it++){const nx=new T.Vector3();vs.forEach(i=>{q.set(W[i*3]-ce.x,W[i*3+1]-ce.y,W[i*3+2]-ce.z);nx.addScaledVector(q,q.dot(ax))});if(nx.lengthSq()>0)ax=nx.normalize()}
          const pr=vs.map(i=>(W[i*3]-ce.x)*ax.x+(W[i*3+1]-ce.y)*ax.y+(W[i*3+2]-ce.z)*ax.z),lo=Math.min(...pr),hi=Math.max(...pr),NB=7,B=Array.from({length:NB},()=>[0,0,0,0]);
          vs.forEach((i,k)=>{const b=Math.min(NB-1,Math.floor((pr[k]-lo)/(hi-lo+1e-9)*NB));B[b][0]+=W[i*3];B[b][1]+=W[i*3+1];B[b][2]+=W[i*3+2];B[b][3]++});
          let pts=B.filter(b=>b[3]).map(b=>new T.Vector3(b[0]/b[3],b[1]/b[3],b[2]/b[3]));if(pts.length<2)continue;
          let rs=0;vs.forEach((i,k)=>{q.set(W[i*3],W[i*3+1],W[i*3+2]).sub(ce);q.addScaledVector(ax,-q.dot(ax));rs+=q.length()});
          // the square stubs are flat boxes: use the mean cross-section distance, a little thinner, as the tube radius
          const rad=Math.min(.0021,rs/vs.length*.45);for(let r2=0;r2<2;r2++)pts=pts.map((p,k)=>k==0||k==pts.length-1?p:p.clone().multiplyScalar(.5).addScaledVector(pts[k-1],.25).addScaledVector(pts[k+1],.25));
          const cr=(t)=>{const L=pts.length-1,x=Math.min(L-1e-6,t*L),k=Math.floor(x),u=x-k,p0=pts[Math.max(0,k-1)],p1=pts[k],p2=pts[k+1],p3=pts[Math.min(L,k+2)],u2=u*u,u3=u2*u;
            return new T.Vector3(.5*(2*p1.x+(-p0.x+p2.x)*u+(2*p0.x-5*p1.x+4*p2.x-p3.x)*u2+(-p0.x+3*p1.x-3*p2.x+p3.x)*u3),.5*(2*p1.y+(-p0.y+p2.y)*u+(2*p0.y-5*p1.y+4*p2.y-p3.y)*u2+(-p0.y+3*p1.y-3*p2.y+p3.y)*u3),.5*(2*p1.z+(-p0.z+p2.z)*u+(2*p0.z-5*p1.z+4*p2.z-p3.z)*u2+(-p0.z+3*p1.z-3*p2.z+p3.z)*u3))};
          const NS=14,NR=12,tp=[],ti=[];let Nf=null;for(let a=0;a<=NS;a++){const s=a/NS,c0=cr(s),tgv=cr(Math.min(1,s+.02)).sub(cr(Math.max(0,s-.02))).normalize();if(!Nf){Nf=new T.Vector3(0,1,0);if(Math.abs(Nf.dot(tgv))>.9)Nf.set(1,0,0)}Nf.addScaledVector(tgv,-Nf.dot(tgv)).normalize();const Bf=new T.Vector3().crossVectors(tgv,Nf);
            const rr=rad*(1-.25*s)*Math.sqrt(Math.max(0,Math.min(1,(1-s)/.07)))*Math.sqrt(Math.min(1,s/.05));for(let j=0;j<=NR;j++){const th=j/NR*Math.PI*2;tp.push(c0.x+(Nf.x*Math.cos(th)+Bf.x*Math.sin(th))*rr,c0.y+(Nf.y*Math.cos(th)+Bf.y*Math.sin(th))*rr,c0.z+(Nf.z*Math.cos(th)+Bf.z*Math.sin(th))*rr)}}
          for(let a=0;a<NS;a++)for(let j=0;j<NR;j++){const A=a*(NR+1)+j,B2=A+NR+1;ti.push(A,B2,A+1,B2,B2+1,A+1)}
          const tg=new T.BufferGeometry();tg.setAttribute("position",new T.Float32BufferAttribute(tp,3));tg.setIndex(ti);add.push(tg);c.v.forEach(i=>kill.add(i))}
        if(add.length){const keep=[];for(let t=0;t<ix.length;t+=3)if(!kill.has(ix[t]))keep.push(ix[t],ix[t+1],ix[t+2]);g.setIndex(keep);
          add.forEach((tg,k)=>{{const A=tg.attributes.position;for(let i=0;i<A.count;i++){v.fromBufferAttribute(A,i);m.worldToLocal(v);A.setXYZ(i,v.x,v.y,v.z)}tg.computeVertexNormals();tg.computeBoundingSphere()}for(const nmA in g.attributes)if(!tg.attributes[nmA]){const A=g.attributes[nmA];tg.setAttribute(nmA,new T.Float32BufferAttribute(new Float32Array(tg.attributes.position.count*A.itemSize).fill(nmA==="color"?1:0),A.itemSize))}
            const tm=new T.Mesh(tg,m.material);tm.name="Gastric artery "+(k+1);tm.userData.role="vessel";tm.userData.v68=true;tm.frustumCulled=false;m.parent.add(tm);tm.position.copy(m.position);tm.quaternion.copy(m.quaternion);tm.scale.copy(m.scale);meshes.push(tm);(byRole.vessel=byRole.vessel||[]).push(tm)})}}}catch(e){console.warn("r25 gastric arteries",e)}
      }
      return n}
    // v70: original procedural stomach (swept tube): fundus, body, greater/lesser curvature, antrum and a narrow pylorus that
    // ends at the start of the duodenum. Carries (along, curvature side, ring angle) for the curvature vessel arcades.
    // v73: (a) left lobe of the liver drapes a little further over the stomach (smooth weight, no seam);
    //      (b) diaphragm lifted onto the liver's upper surface so it no longer slices through it (removes the dark streak).
    function v73LiverDiaph(){const big=r=>meshes.filter(m=>m.userData.role===r&&m.isMesh&&m.visible!==false).sort((a,b)=>b.geometry.attributes.position.count-a.geometry.attributes.position.count)[0];
      const lv=big("liver");if(!lv)return;lv.updateMatrixWorld(true);const P=lv.geometry.attributes.position,q=new T.Vector3(),ss=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
      let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<P.count;i++){q.fromBufferAttribute(P,i);lv.localToWorld(q);x0=Math.min(x0,q.x);x1=Math.max(x1,q.x);y0=Math.min(y0,q.y);y1=Math.max(y1,q.y)}
      const xs=x0+(x1-x0)*.55;for(let i=0;i<P.count;i++){q.fromBufferAttribute(P,i);lv.localToWorld(q);const w=ss(xs,x1,q.x);if(w<=0)continue;const lo=1-ss(y0,y1,q.y)*.6;
        q.x+=.014*w;q.y-=.018*w*lo;q.z+=.024*w*lo;lv.worldToLocal(q);P.setXYZ(i,q.x,q.y,q.z)}
      {const ix=lv.geometry.index&&lv.geometry.index.array,TB=window.__PFT_R05TB==null?8:window.__PFT_R05TB;if(ix&&TB){const A=P.array,n=P.count,S=new Float32Array(n*3),C=new Float32Array(n);
        /* r05: Taubin lambda|mu fairing of the decimated HRA liver (closed, welded, 5.2k verts): removes the lumpy facets that broke up the
           wet highlight into blocky streaks, without shrinking the organ or adding triangles. ~2 ms. */
        for(let i=0;i<ix.length;i+=3){C[ix[i]]+=2;C[ix[i+1]]+=2;C[ix[i+2]]+=2}
        for(let it=0;it<TB*2;it++){const f=it%2?-.53:.5;S.fill(0);for(let i=0;i<ix.length;i+=3)for(let k=0;k<3;k++){const a=ix[i+k]*3,o1=ix[i+(k+1)%3]*3,o2=ix[i+(k+2)%3]*3;for(let d=0;d<3;d++)S[a+d]+=A[o1+d]+A[o2+d]}
          for(let v=0;v<n;v++)if(C[v])for(let d=0;d<3;d++)A[v*3+d]+=f*(S[v*3+d]/C[v]-A[v*3+d])}}}
      P.needsUpdate=true;lv.geometry.computeVertexNormals();lv.geometry.computeBoundingSphere();
      /* r05: the HRA liver is a decimated mesh, so its vertex normals carry small facet creases that showed as blocky patches in the
         wet highlight. Smooth the normal field only (positions untouched): 3 umbrella passes over the triangle adjacency (a few ms). */
      {const g=lv.geometry,ix=g.index&&g.index.array;if(ix&&window.__PFT_R05TB!==0){const NA=g.attributes.normal,n=NA.count;let A=Float32Array.from(NA.array),B=new Float32Array(n*3);
        for(let it=0;it<3;it++){B.set(A);for(let i=0;i<ix.length;i+=3){const a=ix[i]*3,b=ix[i+1]*3,c=ix[i+2]*3;for(let k=0;k<3;k++){const xa=A[a+k],xb=A[b+k],xc=A[c+k];B[a+k]+=(xb+xc)*.5;B[b+k]+=(xa+xc)*.5;B[c+k]+=(xa+xb)*.5}}
          for(let v=0;v<n;v++){const x=B[v*3],y=B[v*3+1],z=B[v*3+2],l=Math.hypot(x,y,z)||1;B[v*3]=x/l;B[v*3+1]=y/l;B[v*3+2]=z/l}const t=A;A=B;B=t}
        NA.array.set(A);NA.needsUpdate=true}}
      meshes.filter(m=>m.userData.role==="diaphragm"&&m.isMesh).forEach(m=>{if(!m.geometry.attributes.aDf)m.geometry.setAttribute("aDf",new T.BufferAttribute(new Float32Array(m.geometry.attributes.position.count).fill(1),1))});const dm=big("diaphragm");if(!dm)return;dm.updateMatrixWorld(true);const C=.006,NX=Math.ceil((x1-x0)/C)+1;let z0=1e9,z1=-1e9;
      for(let i=0;i<P.count;i++){q.fromBufferAttribute(P,i);lv.localToWorld(q);z0=Math.min(z0,q.z);z1=Math.max(z1,q.z)}const NZ=Math.ceil((z1-z0)/C)+1,H=new Float32Array(NX*NZ).fill(-9);
      for(let i=0;i<P.count;i++){q.fromBufferAttribute(P,i);lv.localToWorld(q);const a=Math.round((q.x-x0)/C),b=Math.round((q.z-z0)/C);for(let da=-1;da<=1;da++)for(let db=-1;db<=1;db++){const k=(b+db)*NX+a+da;if(a+da>=0&&a+da<NX&&b+db>=0&&b+db<NZ&&H[k]<q.y)H[k]=q.y}}
      const D=dm.geometry.attributes.position,f=new Float32Array(D.count).fill(1);dm.geometry.setAttribute("aDf",new T.BufferAttribute(f,1));for(let i=0;i<D.count;i++){q.fromBufferAttribute(D,i);dm.localToWorld(q);const a=Math.round((q.x-x0)/C),b=Math.round((q.z-z0)/C);if(a<0||a>=NX||b<0||b>=NZ)continue;const h=H[b*NX+a];
        f[i]=h>-9?ss(.0,.025,q.y-h):1}
      }
    function v70Stomach(){const sm=meshes.filter(m=>m.userData.role==="stomach"&&m.isMesh).sort((a,b)=>b.geometry.attributes.position.count-a.geometry.attributes.position.count)[0];
      if(!sm||sm.morphTargetInfluences)return 0;const V=(x,y,z)=>new T.Vector3(x,y,z);const b=new T.Box3().setFromObject(sm);if(b.isEmpty())return 0;
      const du=meshes.find(m=>m.name==="Duodenum");let P=V(.024,1.112,.052);if(du){du.updateMatrixWorld(true);const A=du.geometry.attributes.position,w=V(0,0,0);let bx=-9;for(let i=0;i<A.count;i++){w.fromBufferAttribute(A,i).applyMatrix4(du.matrixWorld);if(w.y>bx){bx=w.y;P=w.clone()}}}
      const nx=t=>b.min.x+t*(b.max.x-b.min.x),ny=t=>b.min.y+t*(b.max.y-b.min.y),nz=t=>b.min.z+t*(b.max.z-b.min.z);
      const K=[[V(nx(.80),ny(.98),nz(.37)),.044],[V(nx(.82),ny(.90),nz(.42)),.046],[V(nx(.80),ny(.70),nz(.50)),.043],[V(nx(.74),ny(.46),nz(.58)),.040],
        [V(nx(.60),ny(.25),nz(.65)),.035],[V(nx(.42),ny(.18),nz(.68)),.030],[V((nx(.42)+P.x)/2+.004,(ny(.18)+P.y)/2,(nz(.68)+P.z)/2),.026],[P.clone().add(V(.007,0,0)),.009],[P.clone(),.012]]; // v71: fuller fundus, antral bulge, tight pylorus
      const cr=(a,b2,c,d,t)=>{const t2=t*t,t3=t2*t;return .5*((2*b2)+(-a+c)*t+(2*a-5*b2+4*c-d)*t2+(-a+3*b2-3*c+d)*t3)};
      // v72: denser sweep, rounded fundus dome (no pinched cap), smooth body masks, pylorus continued inside the duodenal bulb, Taubin smoothing
      {const d0=K[K.length-1][0].clone().sub(K[K.length-2][0]).normalize();K.push([K[K.length-1][0].clone().add(d0.multiplyScalar(.009)).add(V(-.004,-.002,0)),.012])}
      const NS=128,NR=48,pts=[],rad=[];for(let i=0;i<=NS;i++){const u=i/NS*(K.length-1),k=Math.min(K.length-2,Math.floor(u)),t=u-k,g=j=>K[Math.max(0,Math.min(K.length-1,j))];
        pts.push(V(cr(g(k-1)[0].x,g(k)[0].x,g(k+1)[0].x,g(k+2)[0].x,t),cr(g(k-1)[0].y,g(k)[0].y,g(k+1)[0].y,g(k+2)[0].y,t),cr(g(k-1)[0].z,g(k)[0].z,g(k+1)[0].z,g(k+2)[0].z,t)));
        rad.push((g(k)[1]+(g(k+1)[1]-g(k)[1])*(t*t*(3-2*t)))*.88)}
      // fundus dome: extend the axis backwards and close with a hemispherical radius profile
      {const tg0=pts[1].clone().sub(pts[0]).normalize(),r0=rad[0],ND=14;for(let k=1;k<=ND;k++){const th=k/ND*Math.PI/2;pts.unshift(pts[0].clone().sub(tg0.clone().multiplyScalar(r0*(Math.sin(th)-Math.sin((k-1)/ND*Math.PI/2)))));rad.unshift(r0*Math.cos(th)+1e-4)}}
      {const n=pts.length,tg1=pts[n-1].clone().sub(pts[n-2]).normalize(),r1=rad[n-1],ND=8;for(let k=1;k<=ND;k++){const th=k/ND*Math.PI/2;pts.push(pts[pts.length-1].clone().add(tg1.clone().multiplyScalar(r1*(Math.sin(th)-Math.sin((k-1)/ND*Math.PI/2)))));rad.push(r1*Math.cos(th)+1e-4)}}
      const NT=pts.length-1,sm2=x=>x*x*(3-2*x),band=(x,a0,a1,a2,a3)=>sm2(Math.min(1,Math.max(0,(x-a0)/(a1-a0))))*(1-sm2(Math.min(1,Math.max(0,(x-a2)/(a3-a2)))));
      const pos=[],st=[],ix=[],Z=V(0,0,1),L=q=>{sm.updateMatrixWorld(true);return sm.worldToLocal(q)};let prevOut=null;
      // r08: ring planes follow a radius-scaled smoothed tangent, so rings no longer fan together and fold over on the tight inner (lesser-curvature/cardia) bend, which drew a crack-like crease near the fundus
      const R08=window.__PFT_R08ST!==0,R08S=window.__PFT_R08S||1,TG=[];{const sa=[0];for(let i=1;i<=NT;i++)sa.push(sa[i-1]+pts[i].distanceTo(pts[i-1]));const raw=[];for(let i=0;i<=NT;i++)raw.push(pts[Math.min(NT,i+1)].clone().sub(pts[Math.max(0,i-1)]).normalize());
        for(let i=0;i<=NT;i++){if(!R08){TG.push(raw[i]);continue}const sg=Math.max(1e-4,R08S*rad[i]),t=V(0,0,0);for(let k=0;k<=NT;k++){const d=(sa[k]-sa[i])/sg;if(d*d<9)t.add(raw[k].clone().multiplyScalar(Math.exp(-d*d)))}TG.push(t.normalize())}}
      for(let i=0;i<=NT;i++){const tg=TG[i].clone();let out=V(-tg.y,tg.x,0);if(out.lengthSq()<1e-6)out=prevOut.clone();out.normalize();if(prevOut&&out.dot(prevOut)<0)out.negate();prevOut=out.clone();
        const w=tg.clone().cross(out).normalize();if(w.z<0)w.negate();const sx=i/NT,body=band(sx,.10,.25,.78,.92);
        for(let j=0;j<NR;j++){const a=j/NR*Math.PI*2,c=Math.cos(a),sn=Math.sin(a);
          const bulge=1+body*(.13*Math.max(0,c)**1.5-.06*Math.max(0,-c)**1.5)+.035*Math.cos(2*a)*body+.02*Math.cos(3*a+.8)*body;
          const q=pts[i].clone().add(out.clone().multiplyScalar(c*rad[i]*bulge)).add(w.clone().multiplyScalar(sn*rad[i]*.84));pos.push(q.x,q.y,q.z);st.push(sx,c,sn)}}
      for(let i=0;i<NT;i++)for(let j=0;j<NR;j++){const a=i*NR+j,b2=i*NR+(j+1)%NR,c=a+NR,d=b2+NR;ix.push(a,c,b2,b2,c,d)}
      {const tip=pts[0].clone().sub(pts[1].clone().sub(pts[0]).normalize().multiplyScalar(1e-4));const k=pos.length/3;pos.push(tip.x,tip.y,tip.z);st.push(0,0,0);for(let j=0;j<NR;j++)ix.push(k,(j+1)%NR,j);
        const e=pts[NT],k2=pos.length/3;pos.push(e.x,e.y,e.z);st.push(1,0,0);for(let j=0;j<NR;j++){const a=NT*NR+j,b2=NT*NR+(j+1)%NR;ix.push(k2,a,b2)}}
      // Taubin smoothing on the grid (removes creases without shrinking)
      {const n=pos.length/3,nb=Array.from({length:n},()=>new Set());for(let i=0;i<ix.length;i+=3){const A=ix[i],B=ix[i+1],C=ix[i+2];nb[A].add(B).add(C);nb[B].add(A).add(C);nb[C].add(A).add(B)}
        const step=f=>{const o=pos.slice();for(let v=0;v<n;v++){let x=0,y=0,z=0;for(const u of nb[v]){x+=pos[u*3];y+=pos[u*3+1];z+=pos[u*3+2]}const m=nb[v].size;o[v*3]+=f*(x/m-pos[v*3]);o[v*3+1]+=f*(y/m-pos[v*3+1]);o[v*3+2]+=f*(z/m-pos[v*3+2])}for(let q=0;q<o.length;q++)pos[q]=o[q]};
        for(let it=0;it<14;it++){step(.5);step(-.53)}}
      for(let v=0;v<pos.length/3;v++){const q=L(V(pos[v*3],pos[v*3+1],pos[v*3+2]));pos[v*3]=q.x;pos[v*3+1]=q.y;pos[v*3+2]=q.z}
      const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("aSt",new T.Float32BufferAttribute(st,3));g.setAttribute("aOcc",new T.Float32BufferAttribute(new Float32Array(pos.length/3),1));
      if(sm.geometry.attributes.uv)g.setAttribute("uv",new T.Float32BufferAttribute(new Float32Array(pos.length/3*2),2));g.setIndex(ix);
      {let vol=0;const I=g.index.array,p=pos;for(let i=0;i<I.length;i+=3){const a=I[i]*3,b2=I[i+1]*3,c=I[i+2]*3;vol+=p[a]*(p[b2+1]*p[c+2]-p[b2+2]*p[c+1])-p[a+1]*(p[b2]*p[c+2]-p[b2+2]*p[c])+p[a+2]*(p[b2]*p[c+1]-p[b2+1]*p[c])}if(vol<0)for(let i=0;i<I.length;i+=3){const t=I[i+1];I[i+1]=I[i+2];I[i+2]=t}}
      g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();sm.geometry.dispose&&sm.geometry.dispose();sm.geometry=g;sm.userData.v70=1;
      meshes.filter(m=>m.userData.role==="stomach"&&m!==sm).forEach(m=>m.visible=false);
      // esophagus stub: from the cardia (lesser-curvature side, just below the fundus) up through the diaphragm hiatus, slightly right and posterior
      {const ic=14+Math.round(NS*.17),tg=pts[ic+1].clone().sub(pts[ic-1]).normalize(),out=V(-tg.y,tg.x,0).normalize();const ca=pts[ic].clone().add(out.clone().multiplyScalar(-rad[ic]*.25));
        const E=[ca,ca.clone().add(V(-.006,.022,-.006)),ca.clone().add(V(-.010,.048,-.014)),ca.clone().add(V(-.012,.075,-.020))],er=[.026,.012,.0085,.008]; // flared base sunk into the cardia (smooth junction)
        const ep=[],ei=[],NE=40,NRE=28;for(let i=0;i<=NE;i++){const u=i/NE*(E.length-1),k=Math.min(E.length-2,Math.floor(u)),t=u-k;const c=E[k].clone().lerp(E[k+1],t),r=er[k]+(er[k+1]-er[k])*(t*t*(3-2*t));const d=E[k+1].clone().sub(E[k]).normalize();
          const a1=V(1,0,0).sub(d.clone().multiplyScalar(d.x)).normalize(),a2=d.clone().cross(a1);for(let j=0;j<NRE;j++){const a=j/NRE*Math.PI*2;const q=c.clone().add(a1.clone().multiplyScalar(Math.cos(a)*r)).add(a2.clone().multiplyScalar(Math.sin(a)*r*.8));L(q);ep.push(q.x,q.y,q.z)}}
        for(let i=0;i<NE;i++)for(let j=0;j<NRE;j++){const a=i*NRE+j,b2=i*NRE+(j+1)%NRE;ei.push(a,b2,a+NRE,b2,b2+NRE,a+NRE)}
        const eg=new T.BufferGeometry();eg.setAttribute("position",new T.Float32BufferAttribute(ep,3));const R07=window.__PFT_R07EJ!==0;const eo=new Float32Array(ep.length/3);
        if(R07){// r07: soft contact shading at the cardia (both sides of the esophagus/stomach intersection) so the junction reads as a gentle notch, not a cut line
          for(let i=0;i<=NE;i++){const t=i/NE;const o=.30*(1-Math.min(1,t/.16))**2;for(let j=0;j<NRE;j++)eo[i*NRE+j]=o}
          const so=sm.geometry.attributes.aOcc,sp=sm.geometry.attributes.position,W=V(0,0,0);sm.updateMatrixWorld(true);for(let v=0;v<sp.count;v++){W.fromBufferAttribute(sp,v);sm.localToWorld(W);const d=W.distanceTo(ca);if(d<.05){const k=1-Math.min(1,Math.max(0,(d-.016)/.03));so.setX(v,Math.max(so.getX(v),.28*k*k*(3-2*k)))}}so.needsUpdate=true}
        eg.setAttribute("aOcc",new T.Float32BufferAttribute(eo,1));if(R07)eg.setAttribute("aSt",new T.Float32BufferAttribute(new Float32Array(ep.length),3));eg.setIndex(ei);eg.computeVertexNormals();
        if(R07&&!M.esoph){// r07: the stub now shares the stomach's shader (paint tone + serosal vessels + Neutral tone curve, all world-space so they run continuously across the seam); before, it kept AgX and read pale beige against the pink stomach
          const m2=M.stomach.clone();m2.side=T.DoubleSide;m2.onBeforeCompile=M.stomach.onBeforeCompile;const ck=M.stomach.customProgramCacheKey;m2.customProgramCacheKey=()=>ck.call(M.stomach)+"|eso2";M.esoph=m2}
        M.esoph=M.esoph||paint(organ(0xd4867e,.36,{side:T.DoubleSide,clearcoat:.32,clearcoatRoughness:.28}),"eso",{grain:.5,gloss:1.1,bump:.001,rg:.04}); /* v74: matches the stomach wall (no colour seam at the cardia) */const em=new T.Mesh(eg,M.esoph);em.name="Esophagus (stub)";em.userData.role="stomach";em.renderOrder=sm.renderOrder;sm.add(em);meshes.push(em)}
      return 1}
    // v7.6.78: per-vertex "belly" weight for muscle growth: 1 in the middle of each muscle, tapering to 0 at its ends
    // (along the muscle's longest axis), so growing muscles swell like real muscle bellies instead of puffing up evenly.
    // SCM (id 45): one diagonal belly from the mastoid, a thin fibrous sternal cord onto
    // the manubrium, and a flat clavicular sheet seated on the superior clavicle.
    // Two deeper straps (id 46) show in the triangular opening. The old sheet is sunk.
    // Grab3D stays Muscle view. window.__PFT_SCM=0 restores the baked sheet.
    function scmStraps(m,W,id){
      const g=m.geometry,P=g.attributes.position,n=P.count;
      const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
      const ys=[1.458,1.430,1.408,1.378],sxA=[.036,.022,.015,.012],cxA=[.042,.048,.040,.036];
      const xAt=(xs,y)=>{let i=0;while(i<ys.length-2&&y<ys[i+1])i++;const u=(ys[i]-y)/Math.max(1e-4,ys[i]-ys[i+1]);return xs[i]+(xs[i+1]-xs[i])*Math.min(1,Math.max(0,u))};
      for(let i=0;i<n;i++){const x=W[i*3],y=W[i*3+1],z=W[i*3+2],ax=Math.abs(x);
        if(id[i]===45){if(y<1.52&&y>1.36&&ax<.10&&z>.01)W[i*3+2]-=.006;id[i]=ax>.08||z<.015?37:(y<1.40&&z>.04&&ax<.09?26:46)}
        if(y<=1.458&&y>=1.385&&ax>.008&&ax<.09&&z>-.01){const xs=xAt(sxA,y),xc=xAt(cxA,y);
          if(ax>xs+.004&&ax<xc-.004){const mid=Math.min(1,Math.min(ax-xs-.004,xc-.004-ax)/.01),along=sm(1.45,1.395,y);
            W[i*3+2]-=.022*mid*along;if(z>0)W[i*3]-=Math.sign(x||1)*.004*mid*along}}}
      const inv=m.matrixWorld.clone().invert(),v=new T.Vector3();
      for(let i=0;i<n;i++){v.set(W[i*3],W[i*3+1],W[i*3+2]).applyMatrix4(inv);P.setXYZ(i,v.x,v.y,v.z)}
      P.needsUpdate=true;g.computeVertexNormals();
      if(m.userData.scmBuilt)return;m.userData.scmBuilt=1;scmMesh(m);
    }
    function scmMesh(m){
      const skin=byRole.skin&&byRole.skin[0],SZ=new Map();
      if(skin){skin.updateMatrixWorld(true);const SP=skin.geometry.attributes.position,u=new T.Vector3();
        for(let i=0;i<SP.count;i++){u.fromBufferAttribute(SP,i).applyMatrix4(skin.matrixWorld);if(u.y<1.30||u.y>1.68||u.z<=0)continue;
          const kz=Math.floor(u.x/.012)+","+Math.floor(u.y/.012),oz=SZ.get(kz);if(oz===undefined||u.z>oz)SZ.set(kz,u.z)}}
      const skinZ=(x,y)=>{let z=-1;const a=Math.floor(x/.012),b=Math.floor(y/.012);for(let p=-1;p<=1;p++)for(let q=-1;q<=1;q++){const o=SZ.get((a+p)+","+(b+q));if(o!==undefined&&o>z)z=o}return z<0?null:z};
      const clavTop=x=>{const ax=Math.abs(x),S=[[.03,1.386,.078],[.04,1.399,.080],[.05,1.400,.080],[.06,1.402,.074],[.07,1.402,.067],[.08,1.404,.063],[.09,1.403,.060],[.10,1.404,.045]];
        if(ax<=S[0][0])return S[0];if(ax>=S[S.length-1][0])return S[S.length-1];let i=0;while(i<S.length-2&&ax>S[i+1][0])i++;const t=(ax-S[i][0])/(S[i+1][0]-S[i][0]);return [ax,S[i][1]+(S[i+1][1]-S[i][1])*t,S[i][2]+(S[i+1][2]-S[i][2])*t]};
      const belly=[[.066,1.592,.010],[.056,1.548,.030],[.046,1.502,.046],[.036,1.462,.056]];
      const stern=[[.034,1.460,.062],[.026,1.438,.074],[.020,1.418,.082],[.015,1.404,.083]];
      const cord=[[.016,1.412,.082],[.013,1.396,.080],[.011,1.384,.078],[.010,1.372,.074]];
      const clav=[[.038,1.458,.048],[.046,1.434,.058],[.052,1.418,.068],[.058,1.406,.076]];
      const floorA=[[.021,1.492,.050],[.023,1.456,.054],[.025,1.424,.056],[.024,1.400,.054]];
      const floorB=[[.032,1.468,.044],[.034,1.436,.048],[.034,1.412,.050],[.032,1.398,.048]];
      const wB=u=>.014+.006*Math.sin(Math.min(1,u)*Math.PI),tB=u=>.008+.003*Math.sin(Math.min(1,u)*Math.PI);
      const wS=u=>.011*(1-u)+.0034*u,tS=u=>.007*(1-u)+.0032*u;
      const wC=u=>.014*(1-u)+.046*u,tC=u=>.0028*(1-u)+.0016*u;
      const pos=[],col=[],fib=[],edg=[],bel=[],td=[],idx=[];
      const sample=(poly,n)=>{const d=[0];for(let i=1;i<poly.length;i++)d.push(d[i-1]+Math.hypot(poly[i][0]-poly[i-1][0],poly[i][1]-poly[i-1][1],poly[i][2]-poly[i-1][2]));const L=d[d.length-1]||1,out=[];
        for(let k=0;k<n;k++){const t=L*(n===1?0:k/(n-1));let i=0;while(i<d.length-2&&d[i+1]<t)i++;const u=(t-d[i])/Math.max(1e-6,d[i+1]-d[i]);out.push([poly[i][0]+(poly[i+1][0]-poly[i][0])*u,poly[i][1]+(poly[i+1][1]-poly[i][1])*u,poly[i][2]+(poly[i+1][2]-poly[i][2])*u])}return out};
      const frameAt=(C,i)=>{let tx,ty,tz;if(i===0){tx=C[1][0]-C[0][0];ty=C[1][1]-C[0][1];tz=C[1][2]-C[0][2]}else if(i===C.length-1){tx=C[i][0]-C[i-1][0];ty=C[i][1]-C[i-1][1];tz=C[i][2]-C[i-1][2]}else{tx=C[i+1][0]-C[i-1][0];ty=C[i+1][1]-C[i-1][1];tz=C[i+1][2]-C[i-1][2]}
        let tl=Math.hypot(tx,ty,tz)||1;tx/=tl;ty/=tl;tz/=tl;return [tx,ty,tz]};
      const addTube=(poly,wf,tf,side,kind)=>{const NR=26,NA=kind==="c"?12:8,C=sample(poly.map(p=>[p[0]*side,p[1],p[2]]),NR),base=pos.length/3,flat=kind==="c";
        for(let i=0;i<NR;i++){const u=i/(NR-1);const [tx,ty,tz]=frameAt(C,i);
          let ox,oy,oz,bx,by,bz;
          if(flat){bx=side;by=.04;bz=0;let bd=bx*tx+by*ty+bz*tz;bx-=bd*tx;by-=bd*ty;bz-=bd*tz;let bl=Math.hypot(bx,by,bz)||1;bx/=bl;by/=bl;bz/=bl;
            ox=0;oy=.06;oz=1;let od=ox*tx+oy*ty+oz*tz;ox-=od*tx;oy-=od*ty;oz-=od*tz;let ol=Math.hypot(ox,oy,oz)||1;ox/=ol;oy/=ol;oz/=ol;
            const bd2=bx*ox+by*oy+bz*oz;bx-=bd2*ox;by-=bd2*oy;bz-=bd2*oz;bl=Math.hypot(bx,by,bz)||1;bx/=bl;by/=bl;bz/=bl}
          else{ox=C[i][0];oy=0;oz=C[i][2];let od=ox*tx+oy*ty+oz*tz;ox-=od*tx;oy-=od*ty;oz-=od*tz;let ol=Math.hypot(ox,oy,oz);if(ol<1e-5){ox=side;oy=0;oz=.5;ol=Math.hypot(ox,oy,oz)}ox/=ol;oy/=ol;oz/=ol;
            ox*=1;oy+=.05;oz+=.4;od=ox*tx+oy*ty+oz*tz;ox-=od*tx;oy-=od*ty;oz-=od*tz;ol=Math.hypot(ox,oy,oz)||1;ox/=ol;oy/=ol;oz/=ol;
            bx=ty*oz-tz*oy;by=tz*ox-tx*oz;bz=tx*oy-ty*ox;const bl=Math.hypot(bx,by,bz)||1;bx/=bl;by/=bl;bz/=bl}
          const hw=wf(u)/2,ht=tf(u),seat=flat?Math.min(1,Math.max(0,(u-.46)/.42)):0;
          for(let k=0;k<NA;k++){const a=-1+2*k/(NA-1);
            const lift=flat?(1-a*a)*.4+.5:Math.sqrt(Math.max(0,1-a*a));
            const out=flat?ht*lift:ht*(kind==="s"&&u>.45?.55+.45*lift:.22+.78*lift);
            let px=C[i][0]+bx*a*hw+ox*out,py=C[i][1]+by*a*hw+oy*out,pz=C[i][2]+bz*a*hw+oz*out;
            if(seat>0){const top=clavTop(px);py=py*(1-seat)+(top[1]+.0011)*seat;pz=pz*(1-seat)+(top[2]+.0018)*seat}
            if(!(flat&&u>.52)){const zm=skinZ(px,py);if(zm&&pz>zm-.0022){const back=Math.min(.005,pz-(zm-.0022));px-=ox*back;py-=oy*back;pz-=oz*back}}
            pos.push(px,py,pz);col.push(45/64,0,0);fib.push(a*hw);
            const rim=k===0||k===NA-1,tuck=kind!=="b"&&u<.14;edg.push(tuck||!rim?3.2:.4);
            bel.push(kind==="b"?Math.sin(Math.min(1,u)*Math.PI):Math.sin(Math.min(1,.25+u*.5)*Math.PI)*(flat?.35:1));
            const tu=kind==="s"?Math.min(1,Math.max(0,(u-.5)/.5)):0;td.push(tu*tu*(3-2*tu))}}
        for(let i=0;i<NR-1;i++)for(let k=0;k<NA-1;k++){const a=base+i*NA+k,b=a+1,c=a+NA,d=c+1;idx.push(a,b,c,b,d,c)}};
      const addLoop=(poly,radF,side,mid)=>{const NR=16,NA=10,C=sample(poly.map(p=>[p[0]*side,p[1],p[2]]),NR),base=pos.length/3;
        for(let i=0;i<NR;i++){const u=i/(NR-1);const [tx,ty,tz]=frameAt(C,i);
          let ox=side*.15,oy=.05,oz=1,od=ox*tx+oy*ty+oz*tz;ox-=od*tx;oy-=od*ty;oz-=od*tz;let ol=Math.hypot(ox,oy,oz)||1;ox/=ol;oy/=ol;oz/=ol;
          let bx=ty*oz-tz*oy,by=tz*ox-tx*oz,bz=tx*oy-ty*ox,bl=Math.hypot(bx,by,bz)||1;bx/=bl;by/=bl;bz/=bl;
          const rad=radF(u);
          for(let k=0;k<NA;k++){const ang=k/NA*Math.PI*2,cs=Math.cos(ang),sn=Math.sin(ang);
            const px=C[i][0]+(bx*cs+ox*sn)*rad,py=C[i][1]+(by*cs+oy*sn)*rad,pz=C[i][2]+(bz*cs+oz*sn)*rad;
            pos.push(px,py,pz);col.push(mid/64,0,0);fib.push(cs*rad);edg.push(3.2);
            bel.push(mid===45?.12:.35);td.push(mid===45?.78+.22*u:0)}}
        for(let i=0;i<NR-1;i++)for(let k=0;k<NA;k++){const a=base+i*NA+k,b=base+i*NA+(k+1)%NA,c=a+NA,d=base+(i+1)*NA+(k+1)%NA;idx.push(a,b,c,b,d,c)}};
      for(const side of [1,-1]){addTube(belly,wB,tB,side,"b");addTube(stern,wS,tS,side,"s");addLoop(cord,u=>.00155*(1-u)+.00125*u,side,45);addTube(clav,wC,tC,side,"c");addLoop(floorA,()=>.00155,side,46);addLoop(floorB,()=>.00125,side,46)}
      const geo=new T.BufferGeometry(),inv=m.matrixWorld.clone().invert(),vv=new T.Vector3();
      for(let i=0;i<pos.length;i+=3){vv.set(pos[i],pos[i+1],pos[i+2]).applyMatrix4(inv);pos[i]=vv.x;pos[i+1]=vv.y;pos[i+2]=vv.z}
      geo.setAttribute("position",new T.Float32BufferAttribute(pos,3));
      geo.setAttribute("color",new T.Float32BufferAttribute(col,3));
      geo.setAttribute("aFib",new T.BufferAttribute(new Float32Array(fib),1));
      geo.setAttribute("aEdge",new T.BufferAttribute(new Float32Array(edg),1));
      geo.setAttribute("aBelly",new T.BufferAttribute(new Float32Array(bel),1));
      geo.setAttribute("aTd",new T.BufferAttribute(new Float32Array(td),1));
      geo.setIndex(idx);geo.computeVertexNormals();geo.computeBoundingSphere();
      const mat=M.muscle.clone();mat.side=T.DoubleSide;mat.polygonOffset=true;mat.polygonOffsetFactor=-2;mat.polygonOffsetUnits=-2;
      mat.onBeforeCompile=M.muscle.onBeforeCompile;const ck=M.muscle.customProgramCacheKey;mat.customProgramCacheKey=()=>ck.call(M.muscle)+"|scm2";
      const strap=new T.Mesh(geo,mat);strap.name="Sternocleidomastoid";strap.userData.role="muscle";strap.userData.scm=1;
      strap.position.copy(m.position);strap.quaternion.copy(m.quaternion);strap.scale.copy(m.scale);
      strap.frustumCulled=false;strap.castShadow=true;strap.receiveShadow=true;
      m.parent.add(strap);meshes.push(strap);(byRole.muscle=byRole.muscle||[]).push(strap);
    }
    function musclePrep(){
      // r25m (day 1025, original procedural code): Muscle-view accuracy pass on the shared figure. Runs once, before aBelly.
      // (1) chest: the pectoralis major was two horizontal bands with a flat lower border; it is relabelled as a fan from the
      //     clavicle/sternum whose lower border rises from the 6th-rib level beside the sternum to the front axillary fold,
      //     with the lower (abdominal) part as a thin strip along that border; what lay below goes to rectus/oblique/serratus.
      // (2) fibre direction per muscle (aFib = across-fibre coordinate in metres): fans converge on their insertion
      //     (pectoralis on the humerus, deltoid on the deltoid tuberosity, latissimus in the armpit, trapezius on the
      //     acromion), obliques/gluteus maximus run diagonally, limb/rectus/erector fibres run along the long axis.
      //     Before, every muscle had the same vertical striation.
      // (3) aEdge = smoothed surface distance to the nearest muscle border, so the fascia lines between muscles are smooth
      //     curves of even width instead of a per-vertex staircase.
      const r25m=m=>{const g=m.geometry,P=g.attributes.position,C=g.attributes.color,n=P.count;if(!g.index)return;const ix=g.index.array;m.updateMatrixWorld(true);
        const W=new Float32Array(n*3),v=new T.Vector3();for(let i=0;i<n;i++){v.fromBufferAttribute(P,i).applyMatrix4(m.matrixWorld);W[i*3]=v.x;W[i*3+1]=v.y;W[i*3+2]=v.z}
        const id=new Int32Array(n);for(let i=0;i<n;i++)id[i]=Math.round(C.getX(i)*64);
        if(window.__PFT_SCM!==0)try{scmStraps(m,W,id)}catch(e){console.warn("scm",e)}
        // (1) chest relabel (front of the chest only; deltoid, arm and neck labels are kept)
        const chest=new Set([26,27,28,32,34,35]);
        for(let i=0;i<n;i++){const x=W[i*3],y=W[i*3+1],z=W[i*3+2],ax=Math.abs(x);if(!chest.has(id[i])||z<.035||ax>.205||y<1.19||y>1.415)continue;
          const yb=1.248+.62*Math.max(0,ax-.025)+.004*Math.sin(ax*90); // lower border: ~6th rib beside the sternum, rising to the axillary fold
          const xd=.150+(1.405-y)*.42;if(y>=yb){if(ax>xd&&y>1.27)id[i]=1;else id[i]=y<yb+.014&&ax<.12?27:26}
          else id[i]=ax<.062?28:(ax>.112&&y>1.2?34:32)}
        // rectus abdominis is ~6-7 cm wide each side of the linea alba; the outer part of the wide panels goes to the external oblique
        for(let i=0;i<n;i++){const ax=Math.abs(W[i*3]);if(id[i]>=28&&id[i]<=31&&W[i*3+2]>.03&&ax>.058+.006*Math.max(0,(1.10-W[i*3+1])/.1))id[i]=32}
        for(let i=0;i<n;i++){const y=W[i*3+1],sx=Math.abs(W[i*3]);if((id[i]===26||id[i]===27)&&W[i*3+2]>0&&y>1.27&&sx>.150+(1.405-y)*.42)id[i]=1} // r25n: pec stops at the deltopectoral line
        for(let i=0;i<n;i++)C.setX(i,id[i]/64);C.needsUpdate=true;
        // tendon weight: limb muscles end in pale tendons; lower latissimus/erector region = thoracolumbar aponeurosis
        const TD=new Float32Array(n);for(let i=0;i<n;i++){const mi=id[i],ax=Math.abs(W[i*3]),y=W[i*3+1];if(mi===36&&y<1.06&&ax<.09)TD[i]=Math.min(1,(1.06-y)/.05)*(1-Math.max(0,(ax-.06)/.03));}g.setAttribute("aTd",new T.BufferAttribute(TD,1));
        // per (muscle, side) box
        const key=i=>id[i]*2+(W[i*3]<0?1:0),bx=new Map();for(let i=0;i<n;i++){const k=key(i);let b=bx.get(k);if(!b)bx.set(k,b=[9,9,9,-9,-9,-9]);for(let a=0;a<3;a++){b[a]=Math.min(b[a],W[i*3+a]);b[a+3]=Math.max(b[a+3],W[i*3+a])}}
        const fan={26:[.172,1.322,.05],27:[.172,1.322,.05],1:[.215,1.25,.035],2:[.225,1.25,.02],3:[.215,1.25,0],36:[.165,1.32,-.02],37:[.19,1.40,-.03],38:[.19,1.39,-.04],39:[.19,1.38,-.04],40:[.20,1.31,-.04],41:[.19,1.31,-.03],44:[.16,.86,0]};
        const diag={32:[.6,-.8],33:[.6,-.8],43:[.75,-.66],34:[.85,.5],35:[.85,.5],15:[.38,.92],45:[.45,.89]}; // fibre direction in the frontal plane for the right-hand (+x) side, mirrored for the left. SCM runs mastoid (up, lateral) to the sternum.
        const F=new Float32Array(n);for(let i=0;i<n;i++){const x=W[i*3],y=W[i*3+1],z=W[i*3+2],s=x<0?-1:1,mi=id[i];
          if(mi===26||mi===27){const q=fan[mi],dx=s*x-q[0],dy=y-q[1],dz=z-q[2];F[i]=Math.atan2(dy,Math.max(.01,Math.hypot(dx,dz)))*.12} // pec: all fibres lie medial of the humerus insertion, no angle wrap
          else if(fan[mi]){const q=fan[mi],dx=s*x-q[0],dy=y-q[1],dz=z-q[2];const r=Math.hypot(dx,dy,dz);F[i]=Math.atan2(dy,Math.hypot(dx,dz)*(dx<0?-1:1))*.12}
          else if(diag[mi]){const d=diag[mi];F[i]=(s*x)*(-d[1])+y*d[0]}
          else{const b=bx.get(key(i));const cx=(b[0]+b[3])/2,cz=(b[2]+b[5])/2,r=Math.max(.01,Math.min(b[3]-b[0],b[5]-b[2])/2);F[i]=Math.atan2(z-cz,x-cx)*r}}
        // r25n: sub-head grooves (visual only; growth ids unchanged) + tendons/aponeuroses from the reference set
        const SB=new Uint8Array(n),hf=i=>{const b=bx.get(key(i));return (W[i*3+1]-b[1])/Math.max(1e-4,b[4]-b[1])},uf=i=>{const b=bx.get(key(i));const s=W[i*3]<0?-1:1;return s*(W[i*3]-(b[0]+b[3])/2)/Math.max(1e-4,(b[3]-b[0])/2)};
        const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
        for(let i=0;i<n;i++){const mi=id[i],x=W[i*3],y=W[i*3+1],z=W[i*3+2],sx=x<0?-x:x;let h,u;
          if(mi===4){h=hf(i);u=uf(i);if(h>.22)SB[i]=u>.04*Math.sin(h*7)?1:2;if(h<.16)TD[i]=Math.max(TD[i],(1-sm(.04,.16,h))*sm(-.7,-.1,-Math.abs(u)))} // biceps: long (lateral) + short (medial) head, distal tendon
          else if(mi===6||mi===7){h=hf(i);if(z<-.0){const b=bx.get(6*2+(x<0?1:0));if(b){const cx=(b[0]+b[3])/2,hw=Math.abs(x-cx)/Math.max(1e-3,(b[3]-b[0])/2),th=(.33-.2*hw*hw);if(h<th)TD[i]=Math.max(TD[i],sm(0,.12,th-h)*(1-sm(.45,.8,hw))*.5)}}} // triceps: flat common tendon (horseshoe) over the lower back of the arm
          else if(mi===9){h=hf(i);u=uf(i);if(h>.35)SB[i]=u<-.33?1:u<.3?2:3;if(h<.22)TD[i]=Math.max(TD[i],1-sm(.08,.22,h))} // forearm flexor mass: 3 bellies to the wrist tendons
          else if(mi===10||mi===11){h=hf(i);u=uf(i);if(mi===10&&h>.3)SB[i]=u<0?1:2;if(h<.25)TD[i]=Math.max(TD[i],1-sm(.1,.25,h))} // extensor mass + wrist tendons
          else if(mi===12||mi===13||mi===14){h=hf(i);const lim=mi===14?.05:.13;if(h<lim)TD[i]=Math.max(TD[i],1-sm(lim*.3,lim,h))} // quadriceps tendon into the patella (vastus medialis teardrop stays fleshy low)
          else if(mi===20||mi===21){h=hf(i);u=uf(i);if(h<.16)TD[i]=Math.max(TD[i],(1-sm(.03,.16,h))*.55*(1-sm(.2,.8,Math.abs(u))))} // gastrocnemius heads end on the Achilles aponeurosis
          else if(mi===22||mi===25){h=hf(i);u=uf(i);if(z<0&&h<.4)TD[i]=Math.max(TD[i],(1-sm(.12,.4,h))*(1-sm(.25,.6,Math.abs(u))))} // Achilles tendon
          else if(mi===23){h=hf(i);if(h<.2)TD[i]=Math.max(TD[i],1-sm(.06,.2,h))}
          else if((mi===26||mi===27)&&z>.03){SB[i]=x<0?4:0;if(mi===26&&y>1.372-.34*(sx-.02))SB[i]|=1} // pectoralis: clavicular vs sternal head
          else if((mi===38||mi===39)&&z<0&&sx>.02&&sx<.07+(1.41-y)*.25&&y>1.25&&y<1.41){SB[i]=1} // rhomboids implied under the middle trapezius
        }
        for(let i=0;i<n;i++)if(id[i]===1||id[i]===26){const x=W[i*3],y=W[i*3+1],sx=x<0?-x:x;const d=Math.abs(sx-(.150+(1.405-y)*.42));if(y>1.27&&y<1.41&&d<.008&&W[i*3+2]>.03)SB[i]=SB[i]|8} // deltopectoral groove line
        const gid=i=>(id[i]===26||id[i]===27?26*16:id[i]*16+(SB[i]&7)); /* pec midline, head split and deltopectoral line are drawn analytically in the shader (crisper than the coarse mesh) */
        // (3) distance to a border, relaxed over the mesh edges (metres), then smoothed
        const E=new Float32Array(n).fill(1);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],b=ix[t+(e+1)%3];if(gid(a)!==gid(b)){const l=.5*Math.hypot(W[a*3]-W[b*3],W[a*3+1]-W[b*3+1],W[a*3+2]-W[b*3+2]);if(l<E[a])E[a]=l;if(l<E[b])E[b]=l}}
        for(let it=0;it<10;it++)for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],b=ix[t+(e+1)%3],l=Math.hypot(W[a*3]-W[b*3],W[a*3+1]-W[b*3+1],W[a*3+2]-W[b*3+2]);if(E[a]+l<E[b])E[b]=E[a]+l;if(E[b]+l<E[a])E[a]=E[b]+l}
        for(let it=0;it<4;it++){const A=new Float32Array(n),Cn=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],b=ix[t+(e+1)%3];A[a]+=E[b];Cn[a]++;A[b]+=E[a];Cn[b]++}for(let i=0;i<n;i++)if(Cn[i])E[i]=.5*E[i]+.5*A[i]/Cn[i]}
        let Lm=0;for(let t=0;t<ix.length;t+=3){const a=ix[t],b=ix[t+1];Lm+=Math.hypot(W[a*3]-W[b*3],W[a*3+1]-W[b*3+1],W[a*3+2]-W[b*3+2])}Lm/=ix.length/3;for(let i=0;i<n;i++)E[i]/=Lm; /* in edge lengths */
                {const Nn=g.attributes.normal,sc=m.matrixWorld.getMaxScaleOnAxis()||1,DZ=new Float32Array(n);let any=0;
          if(Nn){const msk=new Uint8Array(n);for(let i=0;i<n;i++){const y=W[i*3+1],sx=Math.abs(W[i*3]);if(W[i*3+2]>.03&&y>1.23&&y<1.37&&sx<.17&&(id[i]===26||id[i]===27||id[i]===28||id[i]===32||id[i]===34))msk[i]=1+Math.round(9*sm(1.23,1.28,y)*(1-sm(1.34,1.37,y))*(1-sm(.14,.17,sx)))}
            for(let it=0;it<6;it++){const A=new Float32Array(n*6),Cn=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],b=ix[t+(e+1)%3];for(const [p,q] of [[a,b],[b,a]]){if(!msk[p])continue;A[p*6]+=P.getX(q);A[p*6+1]+=P.getY(q);A[p*6+2]+=P.getZ(q);A[p*6+3]+=Nn.getX(q);A[p*6+4]+=Nn.getY(q);A[p*6+5]+=Nn.getZ(q);Cn[p]++}}
              const lam=it%2?-.53:.5;for(let i=0;i<n;i++){if(!Cn[i])continue;const c=Cn[i];const wq=.5*(msk[i]-1)/9;let nx=Nn.getX(i)+wq*(A[i*6+3]/c-Nn.getX(i)),ny=Nn.getY(i)+wq*(A[i*6+4]/c-Nn.getY(i)),nz=Nn.getZ(i)+wq*(A[i*6+5]/c-Nn.getZ(i)); /* feathered, no hard edge at the top of the abs */const L=Math.hypot(nx,ny,nz)||1;Nn.setXYZ(i,nx/L,ny/L,nz/L)}}} // r25n: soften the base mesh's horizontal mid-chest fold
          if(Nn){for(let i=0;i<n;i++){const mi=id[i],sx=Math.abs(W[i*3]);let amp=0,cap=7;
            if((mi===26||mi===27)&&W[i*3+2]>=.03){const y=W[i*3+1],R12=window.__PFT_R12!==0,ex=Math.max(0,sx-.04),yb=R12?1.248+.62*Math.max(0,sx-.025)*.35+4.6*ex*ex:1.248+.62*Math.max(0,sx-.025),d=y-yb,qx=(sx-(R12?.095:.088))/(R12?.085:.072),qy=(y-1.298)/(y<1.298?.06:.095),cr=Math.exp(-1.1*(qx*qx+qy*qy)),sb=sm(-.006,.016,d),lq=(sx-.138)/.032,lf=R12?.62*Math.exp(-lq*lq)*sm(1.25,1.29,y)*(1-sm(1.33,1.38,y)):0;DZ[i]=window.__PFT_R11===0?0:(R12?.044:.034)*sb*(.38+.62*cr+lf)*(R12?1-sm(.14,.215,sx)*sm(.14,.215,sx):1-sm(.15,.195,sx))*sm(.006,.03,sx)*(1-sm(1.36,1.405,y));/* r25q (R12): rounder pec sides - curved (quadratic) lower/lateral border instead of a straight diagonal, crown shifted outward, extra lateral fill toward the armpit, soft squared lateral falloff; __PFT_R12=0 restores R11 */if(DZ[i])any=1;if(window.__PFT_R11!==0)continue;amp=.021*(1-sm(.15,.2,sx))*sm(.008,.034,sx)*(1+.9*sm(1.36,1.27,y));cap=18} // r25p (R11): pec mesh reshaped analytically - steep curved shelf rising off the lower border over the upper abs, full dome crowned low-centre; not capped by distance-to-edge like the old bulge
            else if(mi===14){const h=hf(i);amp=.0065*(1-sm(.3,.55,h))*sm(.04,.14,h);cap=6} // vastus medialis teardrop above the knee
            else if(mi===12||mi===13){amp=.0028;cap=8}
            else if(mi===6||mi===7){const h=hf(i);amp=.0032*sm(.3,.5,h);cap=6} // triceps heads stand proud of the flat tendon
            if(!amp)continue;const t=Math.min(1,E[i]/cap);DZ[i]=amp*t*t*(3-2*t);any=1}
          if(any&&window.__PFT_PECCLAMP!==0)try{const sk=byRole.skin&&byRole.skin[0];if(sk){ /* r28 (day 1025): keep the reshaped pec under the skin - the r25p/q bulge (up to 4.4 cm) pushed the pectoral dome out through the skin/fat envelope in Fat + muscle and Inside views. Clamp each bulging vertex to the skin's front surface (resting shape) minus 7 mm; __PFT_PECCLAMP=0 restores the unclamped bulge */
            sk.updateMatrixWorld(true);const SP=sk.geometry.attributes.position,Hc=.01,SZ=new Map(),u=new T.Vector3();for(let i=0;i<SP.count;i++){u.fromBufferAttribute(SP,i).applyMatrix4(sk.matrixWorld);if(u.z<0||u.y<1.1||u.y>1.5)continue;const kk=Math.floor(u.x/Hc)+","+Math.floor(u.y/Hc);const o=SZ.get(kk);if(o===undefined||u.z>o)SZ.set(kk,u.z)}
            const front=(x,y)=>{const a=Math.floor(x/Hc),b=Math.floor(y/Hc);let z=1e9;for(let p=-1;p<=1;p++)for(let q=-1;q<=1;q++){const o=SZ.get((a+p)+","+(b+q));if(o!==undefined&&o<z)z=o}return z};
            for(let i=0;i<n;i++){if(!DZ[i])continue;const nz=Math.max(.25,Nn.getZ(i)),lim=front(W[i*3],W[i*3+1])-.007;if(lim>1e8)continue;if(W[i*3+2]+nz*DZ[i]>lim)DZ[i]=Math.max(0,(lim-W[i*3+2])/nz)}}}catch(e){console.warn("pec clamp",e)}
          if(any){const G=new Float32Array(n*3),Cn=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],c=ix[t+(e+1)%3];if(!DZ[a]&&!DZ[c])continue;const dx=W[c*3]-W[a*3],dy=W[c*3+1]-W[a*3+1],dw=W[c*3+2]-W[a*3+2],l2=dx*dx+dy*dy+dw*dw||1e-9,k=(DZ[c]-DZ[a])/l2;G[a*3]+=k*dx;G[a*3+1]+=k*dy;G[a*3+2]+=k*dw;Cn[a]++;G[c*3]+=k*dx;G[c*3+1]+=k*dy;G[c*3+2]+=k*dw;Cn[c]++}
            for(let i=0;i<n;i++){if(!Cn[i])continue;const nx=Nn.getX(i),ny=Nn.getY(i),nz=Nn.getZ(i);let gx=G[i*3]/Cn[i]*2,gy=G[i*3+1]/Cn[i]*2,gz=G[i*3+2]/Cn[i]*2;const d=gx*nx+gy*ny+gz*nz;gx-=d*nx;gy-=d*ny;gz-=d*nz;let ox=nx-gx,oy=ny-gy,oz=nz-gz;const L=Math.hypot(ox,oy,oz)||1;Nn.setXYZ(i,ox/L,oy/L,oz/L);if(DZ[i])P.setXYZ(i,P.getX(i)+nx*DZ[i]/sc,P.getY(i)+ny*DZ[i]/sc,P.getZ(i)+nz*DZ[i]/sc)}P.needsUpdate=true;Nn.needsUpdate=true;if(window.__PFT_R11!==0){for(let it=0;it<5;it++){const A=new Float32Array(n*3),Cn=new Float32Array(n);for(let t=0;t<ix.length;t+=3)for(let e=0;e<3;e++){const a=ix[t+e],b=ix[t+(e+1)%3];for(const [p,q] of [[a,b],[b,a]]){if(!(id[p]===26||id[p]===27)||!DZ[p])continue;A[p*3]+=Nn.getX(q);A[p*3+1]+=Nn.getY(q);A[p*3+2]+=Nn.getZ(q);Cn[p]++}}for(let i=0;i<n;i++){if(!Cn[i])continue;let nx=.4*Nn.getX(i)+.6*A[i*3]/Cn[i],ny=.4*Nn.getY(i)+.6*A[i*3+1]/Cn[i],nz=.4*Nn.getZ(i)+.6*A[i*3+2]/Cn[i];const L=Math.hypot(nx,ny,nz)||1;Nn.setXYZ(i,nx/L,ny/L,nz/L)}}} /* r25p: smooth the reshaped pec normals so the dome reads as one rounded form, not terraced rows */}}} // r25n: pectoral bulge (rounded fan, not a flat plate)
        g.setAttribute("aFib",new T.BufferAttribute(F,1));g.setAttribute("aEdge",new T.BufferAttribute(E,1))};
      (byRole.muscle||[]).forEach(m=>{const g=m.geometry,P=g.attributes.position,C=g.attributes.color,n=P.count;if(!C||g.attributes.aBelly)return;
        if(window.__PFT_R25M!==0)try{r25m(m)}catch(e){console.warn("r25 muscle",e)}
        if(!g.attributes.aTd)g.setAttribute("aTd",new T.BufferAttribute(new Float32Array(n),1));if(!g.attributes.aEdge){g.setAttribute("aEdge",new T.BufferAttribute(new Float32Array(n).fill(-1),1));g.setAttribute("aFib",new T.BufferAttribute(new Float32Array(n),1))}
        const bb={};for(let i=0;i<n;i++){const id=Math.round(C.getX(i)*64);const b=bb[id]||(bb[id]=[1e9,1e9,1e9,-1e9,-1e9,-1e9]);const x=P.getX(i),y=P.getY(i),z=P.getZ(i);
          if(x<b[0])b[0]=x;if(y<b[1])b[1]=y;if(z<b[2])b[2]=z;if(x>b[3])b[3]=x;if(y>b[4])b[4]=y;if(z>b[5])b[5]=z}
        const w=new Float32Array(n);for(let i=0;i<n;i++){const id=Math.round(C.getX(i)*64),b=bb[id];const e=[b[3]-b[0],b[4]-b[1],b[5]-b[2]];const ax=e.indexOf(Math.max(...e));
          const v=ax===0?P.getX(i):ax===1?P.getY(i):P.getZ(i),t=(v-(b[ax]+b[ax+3])/2)/(e[ax]/2||1);w[i]=Math.pow(Math.max(0,1-t*t),.6)}
        g.setAttribute("aBelly",new T.BufferAttribute(w,1));
        g.computeBoundingBox();});
      // local units -> metres: the body is ~1.75 m tall in the scene; growth values are given in metres
      const sk=byRole.skin&&byRole.skin[0];if(sk){sk.geometry.computeBoundingBox();const h=sk.geometry.boundingBox.max.y-sk.geometry.boundingBox.min.y;const ws=new T.Vector3();sk.getWorldScale(ws);muscleU.uMGk.value=h>5?h/1.75:1;}
    }
    // muscle id (1-based, MUSCLE_NAMES order) -> plain group used by the simulator
    const MUSCLE_GROUP=["shoulders","shoulders","shoulders","biceps","biceps","triceps","triceps","forearms","forearms","forearms","forearms","quads","quads","quads","quads","quads","glutes","hamstrings","hamstrings","calves","calves","calves","calves","calves","calves","chest","chest","core","core","core","core","core","core","chest","chest","back","back","back","back","back","back","back","glutes","glutes","","",""];
    const mgT=new Array(48).fill(0);function setMuscleGrowth(gr){gr=gr||{};const a=mgT;for(let i=0;i<MUSCLE_GROUP.length;i++){const v=+gr[MUSCLE_GROUP[i]]||0;a[i+1]=Math.max(0,Math.min(.03,v))}kick&&kick()}
    // ---------- load ----------
    const loader=new T.GLTFLoader();loader.setMeshoptDecoder(T.MeshoptDecoder);
    let loadSource="none";
    function onGLTF(gltf){
      const root=gltf.scene;
      root.traverse(o=>{
        if(!o.isMesh)return;
        const mname=(o.material&&o.material.name||"").replace(/\.\d+$/,"");const role=ROLE[mname]||"intestine";
        o.userData.role=role;o.material=M[role]||M.intestine;o.castShadow=role==="skin"||role==="muscle"||role==="bone";o.receiveShadow=role!=="omentum"&&role!=="mesentery";
        o.frustumCulled=false;meshes.push(o);(byRole[role]=byRole[role]||[]).push(o);
        if(role==="skin"){
          const f=new T.Mesh(o.geometry,M.fat);f.userData.role="fat";f.morphTargetDictionary=o.morphTargetDictionary;f.morphTargetInfluences=o.morphTargetInfluences.slice();
          f.renderOrder=3;f.frustumCulled=false;o.parent.add(f);f.position.copy(o.position);f.quaternion.copy(o.quaternion);f.scale.copy(o.scale);f.updateMatrix();
          meshes.push(f);(byRole.fat=byRole.fat||[]).push(f);
        }
        if(role==="omentum"||role==="mesentery"||role==="lung"||role==="diaphragm")o.renderOrder=2;
      });
      try{v67Anatomy(root)}catch(e){console.warn("anatomy pass",e)}try{root.userData.hra=v69HRA(root)}catch(e){console.warn("anatomy pass v69",e)}try{v70Stomach()}catch(e){console.warn("anatomy pass v70",e)}try{v73LiverDiaph()}catch(e){console.warn("anatomy pass v73",e)}try{musclePrep()}catch(e){console.warn("muscle prep",e)}rootRef=root;scene.add(root);ready=true;if(/pftdebug/.test(location.hash))window.__pft3d={scene,meshes,T,renderer,camera};applyMode();applyState();resize();kick();
      opts.onReady&&opts.onReady();syncNav(false);
      try{g3dLoad(root)}catch(e){console.warn("g3d",e)}
      try{g3dOrgans()}catch(e){console.warn("g3d organs",e)}
    }
    // r26 (R12, day 1025): Muscle-view base mesh = Grab3D "Human Muscles" (CC0 1.0). Fitted to our figure (feet, height,
    // centre) with a 1 mm forward offset. Growth is kept: each Grab3D vertex inherits the muscle id + belly weight of the
    // nearest procedural muscle vertex, and the vertex shader swells it by uMG[id] exactly like the procedural muscles
    // (Advanced = per-muscle values, Simple = even values). window.__PFT_G3D=0 restores the procedural Muscle view.
    let g3dOn=false;
    function g3dLoad(root){
      if(window.__PFT_G3D===0||!url)return;const gu=models.g3dMuscles||url.replace(/[^\/]*$/,"grab3d-human-muscles.glb");
      new T.GLTFLoader().load(gu,g=>{try{
        const ms=byRole.muscle||[],sk=byRole.skin&&byRole.skin[0];if(!ms.length||!sk)return;
        const bb=new T.Box3();ms.forEach(m=>{m.updateMatrixWorld(true);bb.expandByObject(m)});const sb=new T.Box3().setFromObject(sk);
        const gs=g.scene;gs.updateMatrixWorld(true);const gb=new T.Box3().setFromObject(gs);
        const k=(bb.max.y-bb.min.y)/(gb.max.y-gb.min.y);gs.scale.multiplyScalar(k);gs.updateMatrixWorld(true);gb.setFromObject(gs);
        gs.position.set(((bb.min.x+bb.max.x)-(gb.min.x+gb.max.x))/2,bb.min.y-gb.min.y,((bb.min.z+bb.max.z)-(gb.min.z+gb.max.z))/2+.001);gs.updateMatrixWorld(true);
        // nearest procedural-muscle vertex (world space, 2 cm hash grid) -> muscle id + belly weight
        const H=.02,grid=new Map(),pts=[],V=new T.Vector3();
        ms.forEach(m=>{const P=m.geometry.attributes.position,C=m.geometry.attributes.color,B=m.geometry.attributes.aBelly;if(!C)return;for(let i=0;i<P.count;i++){V.fromBufferAttribute(P,i).applyMatrix4(m.matrixWorld);const j=pts.length;pts.push([V.x,V.y,V.z,Math.round(C.getX(i)*64),B?B.getX(i):1]);const key=Math.floor(V.x/H)+","+Math.floor(V.y/H)+","+Math.floor(V.z/H);(grid.get(key)||grid.set(key,[]).get(key)).push(j)}});
        const near=(x,y,z)=>{const a=Math.floor(x/H),b=Math.floor(y/H),c=Math.floor(z/H);let best=-1,bd=1e9;for(let r=1;r<=3&&best<0;r++)for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++)for(let l=-r;l<=r;l++){const L=grid.get((a+i)+","+(b+j)+","+(c+l));if(L)for(const q of L){const p=pts[q],d=(p[0]-x)**2+(p[1]-y)**2+(p[2]-z)**2;if(d<bd){bd=d;best=q}}}return best};
        /* day1026b: waist/belly follow the SKIN's own belly/subq/mass morph targets (nearest skin vertex, 2 cm grid), not a hand-made
             Gaussian push. Muscles get a damped share (abdominal wall rides out on visceral growth; fat sits outside them), and only where the
             skin itself moves, so arms/hands at waist height and pecs no longer inflate. */
          const SG=window.__g3dSkinGrid||(window.__g3dSkinGrid=(()=>{const g=sk.geometry,sp=g.attributes.position,d=sk.morphTargetDictionary||{},ma=g.morphAttributes.position||[],rel=g.morphTargetsRelative;
            const tg=["belly","subq","mass"].map(n=>n in d?ma[d[n]]:null);sk.updateMatrixWorld(true);const L=sk.matrixWorld.clone().setPosition(0,0,0),G=new Map(),arr=[],A=new T.Vector3(),Bq=new T.Vector3();
            for(let i=0;i<sp.count;i++){A.fromBufferAttribute(sp,i);const base=A.clone();A.applyMatrix4(sk.matrixWorld);const e=[A.x,A.y,A.z];
              tg.forEach(t=>{if(!t){e.push(0,0,0);return}Bq.fromBufferAttribute(t,i);if(!rel)Bq.sub(base);Bq.applyMatrix4(L);e.push(Bq.x,Bq.y,Bq.z)});
              const j=arr.length;arr.push(e);const key=Math.floor(A.x/H)+","+Math.floor(A.y/H)+","+Math.floor(A.z/H);(G.get(key)||G.set(key,[]).get(key)).push(j)}
            return {G,arr}})());
          const snear=(x,y,z)=>{const a=Math.floor(x/H),b=Math.floor(y/H),c=Math.floor(z/H);let best=-1,bd=1e9;for(let r=1;r<=3&&best<0;r++)for(let i=-r;i<=r;i++)for(let j=-r;j<=r;j++)for(let l=-r;l<=r;l++){const L=SG.G.get((a+i)+","+(b+j)+","+(c+l));if(L)for(const q of L){const p=SG.arr[q],dd=(p[0]-x)**2+(p[1]-y)**2+(p[2]-z)**2;if(dd<bd){bd=dd;best=q}}}return best};
        gs.traverse(o=>{if(!o.isMesh)return;const P=o.geometry.attributes.position,n=P.count,mid=new Float32Array(n),bel=new Float32Array(n),dB=new Float32Array(n*3),dS=new Float32Array(n*3),dM=new Float32Array(n*3);
          o.updateMatrixWorld(true);const Li=o.matrixWorld.clone().setPosition(0,0,0).invert(),W3=new T.Vector3();
          for(let i=0;i<n;i++){V.fromBufferAttribute(P,i).applyMatrix4(o.matrixWorld);const q=near(V.x,V.y,V.z);if(q>=0){mid[i]=pts[q][3];bel[i]=pts[q][4]}
            /* day1026c: no more nearest-skin-vertex copy (that pulled thigh/hip fat deltas onto lateral-leg muscle and made per-vertex
               ridges on the abs). Skin deltas are Gaussian-averaged over ~6 cm, masked to the front/side abdominal wall only (arms, legs,
               glutes, chest = 0), and capped, so the wall widens smoothly instead of stretching the six-pack into a potbelly.
               day1026c: Muscle-view bulge is driven by VISCERAL fat (omU.uVisc, same driver as Inside abdomen): visceral sits behind the wall and pushes it out; subcutaneous/belly fat sits outside the muscle, so it barely moves it. */
            const hh=sb.max.y-sb.min.y,t=(V.y-sb.min.y)/hh,cx=(sb.min.x+sb.max.x)/2,cz=(sb.min.z+sb.max.z)/2,ax=Math.abs(V.x-cx);
            const ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
            const wm=ss(.50,.555,t)*(1-ss(.635,.69,t))*(1-ss(.085,.135,ax))*ss(cz-.04,cz+.03,V.z);
            if(wm>.001){const a=Math.floor(V.x/H),b=Math.floor(V.y/H),c=Math.floor(V.z/H),acc=[0,0,0,0,0,0,0,0,0];let ws=0;
              for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++)for(let l=-3;l<=3;l++){const L=SG.G.get((a+i)+","+(b+j)+","+(c+l));if(L)for(const q of L){const p=SG.arr[q],dd=(p[0]-V.x)**2+(p[1]-V.y)**2+(p[2]-V.z)**2;if(dd>.0036)continue;const w=Math.exp(-dd/.0008);ws+=w;for(let u=0;u<9;u++)acc[u]+=w*p[3+u]}}
              if(ws>0)[[dB,0],[dS,3],[dM,6]].forEach(([D,o3])=>{W3.set(acc[o3]/ws,acc[o3+1]/ws,acc[o3+2]/ws);W3.y*=.25;const m=W3.length(),cap=.045;if(m>cap)W3.multiplyScalar(cap/m);W3.multiplyScalar(wm).applyMatrix4(Li);D[i*3]=W3.x;D[i*3+1]=W3.y;D[i*3+2]=W3.z})}}
          o.geometry.setAttribute("aMid",new T.BufferAttribute(mid,1));o.geometry.setAttribute("aGB",new T.BufferAttribute(bel,1));
          o.geometry.setAttribute("aDB",new T.BufferAttribute(dB,3));o.geometry.setAttribute("aDS",new T.BufferAttribute(dS,3));o.geometry.setAttribute("aDM",new T.BufferAttribute(dM,3));
          const mt=o.material;mt.onBeforeCompile=sh=>{sh.uniforms.uMG=muscleU.uMG;sh.uniforms.uMGk={get value(){return muscleU.uMGk.value/k}};sh.uniforms.uFB=fatU.uBelly;sh.uniforms.uFS=fatU.uSubq;sh.uniforms.uFM=fatU.uMass;sh.uniforms.uFV=omU.uVisc;
            sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nattribute float aMid;attribute float aGB;uniform float uMG[48];uniform float uMGk;attribute vec3 aDB;attribute vec3 aDS;attribute vec3 aDM;uniform float uFB,uFS,uFM,uFV;").replace("#include <begin_vertex>","#include <begin_vertex>\n{int mi0=int(aMid+.5);float g0=(mi0>0&&mi0<48)?uMG[mi0]:0.;transformed+=normalize(objectNormal)*(g0*aGB*uMGk)+aDB*(.55*uFV+.06*uFB)+aDS*(.02*uFS)+aDM*(.08*uFM);}")};
          mt.customProgramCacheKey=()=>"g3dgrow";o.userData.role="g3d";o.castShadow=o.receiveShadow=true;o.frustumCulled=false;meshes.push(o);(byRole.g3d=byRole.g3d||[]).push(o)});
        (rootRef||scene).attach(gs);g3dOn=true;/* day1026: under the body root so height/frame scale applies */window.__pftG3D=1;applyMode();kick()}catch(e){console.warn("g3d fit",e)}},undefined,e=>console.warn("g3d load",e));
    }
    // r27 (day 1025): Grab3D CC0 1.0 organ models (heart, lungs, liver, stomach, kidneys) replace the procedural/HRA organ
    // shapes in every inside view (Half & half, Inside, and the simulator's embedded inside view, which loads this same file).
    // Each is fitted to the bounding box of the organ it replaces (per-axis scale held within +/-20% of uniform), so positions
    // stay anatomical. The liver keeps our steatosis material (driven by liver fat / A1c) and the lungs our see-through pink veil; heart, stomach and kidneys keep Grab3D's textures.
    // The replaced meshes are only hidden (role "<role>P"). window.__PFT_G3DO=0 restores the previous organs.
    function g3dOrgans(){
      if(window.__PFT_G3DO===0||!url)return;const base=url.replace(/[^\/]*$/,""),v="?v=7710";
      const L={heart:"g3d-human-heart-cutaway.glb",lung:"g3d-human-lungs.glb",liver:"g3d-human-liver.glb",stomach:"g3d-human-stomach.glb",kidney:"g3d-human-kidney.glb"};
      const ld=new T.GLTFLoader();ld.setMeshoptDecoder&&T.MeshoptDecoder&&ld.setMeshoptDecoder(T.MeshoptDecoder);
      const fit=(gs,box,mirror,sh)=>{if(sh){const c0=box.getCenter(new T.Vector3());box=box.clone().translate(c0.clone().negate());box.min.multiplyScalar(sh);box.max.multiplyScalar(sh);box.translate(c0)}gs.updateMatrixWorld(true);const gb=new T.Box3().setFromObject(gs),ge=gb.getSize(new T.Vector3()),te=box.getSize(new T.Vector3());
        const k=[te.x/ge.x,te.y/ge.y,te.z/ge.z],u=Math.cbrt(k[0]*k[1]*k[2]);gs.scale.set(...k.map(x=>Math.max(u*.8,Math.min(u*1.2,x))));if(mirror)gs.scale.x*=-1;gs.updateMatrixWorld(true);
        gb.setFromObject(gs);const c=box.getCenter(new T.Vector3()),gc=gb.getCenter(new T.Vector3());gs.position.add(c.sub(gc));gs.updateMatrixWorld(true)};
      const adopt=(gs,role,old)=>{gs.traverse(o=>{if(!o.isMesh)return;o.userData.role=role;o.userData.g3d=1;if(role==="heart")o.userData.hra=1;o.frustumCulled=false;o.castShadow=false;o.receiveShadow=true;
          if(role==="liver")o.material=M.liver;else if(role==="lung"){o.material=M.lung;o.renderOrder=2}else{const mt=o.material;if(mt)mt.roughness=Math.min(.6,mt.roughness==null?.5:mt.roughness)}
          meshes.push(o);(byRole[role]=byRole[role]||[]).push(o)});if(rootRef&&window.__PFT_G3DROOT!==0)rootRef.attach(gs);else scene.add(gs); /* r29 (day 1026): parent to the body root so the per-person sx/sy body scale also moves these organs (on the scene they stayed at default size and the lungs/heart poked out through the neck/back of the head when the body was scaled down) */old.forEach(m=>{m.userData.role=role+"P"})};
      const boxOf=list=>{const b=new T.Box3();list.forEach(m=>{m.updateMatrixWorld(true);b.expandByObject(m)});return b};
      Object.keys(L).forEach(role=>{const old=(byRole[role]||[]).filter(m=>!m.userData.g3d&&m.userData.role===role);if(!old.length)return;
        ld.load(base+L[role]+v,g=>{try{
          if(role==="kidney"&&old.length>1){old.forEach((m,i)=>{const gs=i?g.scene.clone(true):g.scene;const b=boxOf([m]);fit(gs,b,b.getCenter(new T.Vector3()).x<0,.96);adopt(gs,role,[m])})}
          else{if(window.__PFT_G3DROT!==0)g.scene.rotation.y=Math.PI; /* Grab3D organs are authored facing -z; turn them to face forward so the liver sits on the patient's right */fit(g.scene,boxOf(old),false,role==="lung"?.86:.96);adopt(g.scene,role,old)}
          window.__pftG3DO=(window.__pftG3DO||0)+1;applyMode();kick()}catch(e){console.warn("g3d organ "+role,e)}},undefined,e=>console.warn("g3d organ load "+role,e))});
    }
    // file:// pages cannot fetch the .glb (browsers block local XHR/fetch), so the same model also ships as a
    // classic script (assets/models/pft-anatomy.glb.js) that defines a base64 string; it is used on file:// or if the fetch fails.
    function loadEmbedded(){
      return new Promise((res,rej)=>{if(window.PFT_ANATOMY_GLB_B64)return res();const el=document.createElement("script");
        el.src=models.anatomyEmbedded||(url+".js");el.async=true;el.onload=()=>window.PFT_ANATOMY_GLB_B64?res():rej(new Error("Embedded 3D model is empty"));
        el.onerror=()=>rej(new Error("Could not load "+el.src));document.head.appendChild(el)})
      .then(()=>{const b=atob(window.PFT_ANATOMY_GLB_B64),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer});
    }
    const fail=err=>{opts.onError&&opts.onError(err)};
    const parse=buf=>{try{loader.parse(buf,"",g=>{loadSource="embedded";onGLTF(g)},fail)}catch(e){fail(e)}};
    const hraP=new Promise(res=>{if(window.PFT_HRA||!url)return res();const el=document.createElement("script");el.src=(models.hraOrgans||url.replace(/[^\/]*$/,"hra-organs.js"))+"?v=7674";el.async=true;el.onload=el.onerror=()=>res();document.head.appendChild(el)});
    if(location.protocol==="file:"||!url)Promise.all([loadEmbedded(),hraP]).then(([b])=>parse(b),fail);
    else loader.load(url,g=>{loadSource="glb";hraP.then(()=>onGLTF(g))},undefined,err=>{Promise.all([loadEmbedded(),hraP]).then(([b])=>parse(b),()=>fail(err))});

    const api={
      framing:"full",
      setLayer(layer,opacity){mode=layer==="internal"?"internal":layer==="external"?"external":"composition";if(typeof opacity==="number"&&isFinite(opacity))fatU.uFatOp.value=opacity;applyMode();kick()},
      setMuscleView(on){mode=on?"muscle":"composition";applyMode();kick()},setMuscleGrowth,muscleGroups:MUSCLE_GROUP,
      setView(v){if(v in VIEWS){camT.az=VIEWS[v];camT.el=framing==="abdomen"?.04:.06;vAz=vEl=0;kick()}},
      setFraming(f){setFramingT(f==="abdomen"?"abdomen":"full");api.framing=framing},
      rotateBy(d){camT.az+=d;cam.az+=d;kick()},
      resetView(){resetView()},setDragMode(m){autoNav=false;dragMode=m==="pan"?"pan":"rotate";syncNav(false)},
      update(s){
        if(s&&typeof s.slider==="number"){const f=frameState(s.profile,s.slider);tgt.subq=f[0];tgt.mass=f[1];tgt.belly=f[2];tgt.visc=f[3];tgt.liver=f[4];tgt.pancreas=f[5];tgt.hyper=f[6]||0;}
        else{const p=s&&s.pftFat||{};const b=BASE[s&&s.profile]||BASE.moderate;
          tgt.subq=+p.subcutaneous||0;tgt.mass=b.mass;tgt.belly=Math.min(1.2,b.belly+(+p.visceralTissue||0));tgt.visc=Math.min(1,b.visc+(+p.visceralTissue||0));
          tgt.liver=+p.liver||0;tgt.pancreas=+p.pancreas||0;tgt.hyper=0;}
        // v7.6.78: the simulator's outer body for this point of the plan (from projected body fat % and waist); inner organs untouched
        if(s&&s.outer&&typeof s.outer.subq==="number"){tgt.subq=Math.max(0,Math.min(1.25,s.outer.subq));tgt.mass=Math.max(0,Math.min(1.1,s.outer.mass||0));tgt.belly=Math.max(tgt.belly*.5,Math.min(1.25,s.outer.belly||0));}
        // v7.6.78: an A1c the person entered re-splits inner fat only (around the organs + liver); outer subq/mass/belly unchanged.
        // day1026 fat-scaling: when the simulator sends its own visceral / liver amounts (from the person's depot model: body fat, waist, weight,
        // plus blood-sugar / fatty-liver clues), those drive omentum, mesentery, bowel fat and liver directly; the fixed A1c tilt is skipped.
        const ov=s&&s.outer&&typeof s.outer.visc==="number";if(ov){tgt.visc=Math.max(0,Math.min(1,s.outer.visc));if(typeof s.outer.liver==="number")tgt.liver=Math.max(0,Math.min(1,s.outer.liver));}
        if(!ov&&s&&typeof s.organTilt==="number"){const t=Math.max(0,Math.min(1,s.organTilt));tgt.visc=tgt.visc*.2+t*(1-tgt.visc*.2);tgt.liver=tgt.liver*.1+t*(1-tgt.liver*.1);}
        // glycogen: strong while it fills (prelude), then a quieter "stocked" tint
        const gm=+(s&&s.glycogenMuscle)||0,gl=+(s&&s.glycogenLiver)||0,ph=!!(s&&s.glycogenPhase);
        tgt.gly=gm*(ph?1:.45);tgt.glyL=gl*(ph?1:.45);kick()},
      inspect(){return {ready,mode,framing,view:cam.az,el:cam.el,dist:cam.dist,px:cam.px,ty:cam.ty,drag:dragMode,source:loadSource,vessels:vesselsOn,muscles:musclesOn,vesselVisible:meshes.some(m=>m.userData.role==="vessel"&&m.visible),state:{...st},target:{...tgt},meshes:meshes.map(m=>m.userData.role)}},
      organs(){return Object.keys(byRole).filter(r=>!/skin|fat|muscle|bone/.test(r)).map(r=>LABEL[r])},
      sample(){return null},
      dispose(){ro&&ro.disconnect();renderer.dispose()}
    };
    resize();kick();
    return api;
  }
  function stub(){return {framing:"full",setLayer(){},setView(){},setFraming(){},rotateBy(){},update(){},inspect(){return {ready:false}},organs(){return []},sample(){return null}}}
  window.Anatomy3D={create,version:"v22"};
})();
