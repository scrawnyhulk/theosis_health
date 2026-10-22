# Builds site assets from Nick's final Theosis Health logo (scripts/brand/final/theosis-health-logo.png).
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter
HERE="/workspace/theosishealth/scripts/brand/final/"; PUB="/workspace/theosishealth/public/"
src=Image.open(HERE+"theosis-health-logo.png").convert("RGB"); W,H=src.size; s=W/1254
A=np.asarray(src).astype(np.float32)

def widen(target_w):
    """Extend the stone background sideways: smoothed edge colour + recycled stone grain, feathered into the original."""
    ext=(target_w-W)//2; e=int(100*s)
    edgeL=gaussian_filter(A[:, :e].mean(1),(30,0)); edgeR=gaussian_filter(A[:, -e:].mean(1),(30,0))
    gs=A[:, :e]; grain=gs-gaussian_filter(gs,(8,8,0))
    reps=ext//e+2; tile=np.concatenate([grain if i%2==0 else grain[:, ::-1] for i in range(reps)],1)
    L=edgeL[:,None,:]+tile[:, :ext]; R=edgeR[:,None,:]+tile[:, :ext][:, ::-1]
    mid=A.copy(); f=int(90*s)
    t=np.linspace(0,1,f)[None,:,None]
    flatL=edgeL[:,None,:]+grain[:, :f]; flatR=edgeR[:,None,:]+grain[:, -f:]
    mid[:, :f]=flatL*(1-t)+A[:, :f]*t
    mid[:, -f:]=A[:, -f:]*(1-t)+flatR*t
    out=np.concatenate([L,mid,R],1)
    xs=np.linspace(-1,1,out.shape[1]); v=1-0.35*np.clip(np.abs(xs)-0.55,0,1)/0.45
    out*=v[None,:,None]
    return Image.fromarray(np.clip(out,0,255).astype("uint8"))

# 1) hero: the square logo with its stone edges feathered to transparent, so the page's own navy shows through (no visible box).
def feathered():
    """Alpha = soft round halo around the emblem (no square corners) + a keyed glow that keeps the wordmark and leaf tips solid."""
    n=W; yy,xx=np.mgrid[0:n,0:n].astype(np.float32)/n
    r=np.sqrt(((xx-0.5)/0.50)**2+((yy-0.42)/0.47)**2)                   # ellipse centred on the cross + laurel
    halo=np.clip((1.0-r)/0.35,0,1); halo=halo*halo*(3-2*halo)
    lum=A.max(-1); key=np.clip((lum-70)/60,0,1)                        # chrome / blue artwork brighter than the stone
    glow=np.clip(gaussian_filter(key,6*s)*1.6,0,1)                     # small soft glow around the artwork
    a=np.maximum(halo,np.maximum(key,glow))
    edge=np.minimum(np.minimum(xx,1-xx),np.minimum(yy,1-yy)); a*=np.clip(edge/0.03,0,1)  # never touch the outer edge
    return Image.fromarray(np.dstack([A,a*255]).clip(0,255).astype("uint8"),"RGBA")
FE=feathered(); BG=(5,8,13)
def flat(im): b=Image.new("RGB",im.size,BG); b.paste(im,(0,0),im); return b
ph=FE.resize((1080,1080),Image.LANCZOS)
ph.save(PUB+"images/theosis-health-hero-phone.webp",quality=88,alpha_quality=100); flat(ph).save(PUB+"images/theosis-health-hero-phone.jpg",quality=86,optimize=True,progressive=True)
desk=Image.new("RGBA",(1920,1080),(0,0,0,0)); desk.alpha_composite(FE.resize((1080,1080),Image.LANCZOS),(420,0))
desk.save(PUB+"images/theosis-health-hero.webp",quality=88,alpha_quality=100); flat(desk).save(PUB+"images/theosis-health-hero.jpg",quality=86,optimize=True,progressive=True)

# keyed cut-out (alpha from brightness above the navy stone)
def keyed(box):
    c=np.asarray(src.crop(box)).astype(np.float32)
    lum=c.max(-1); bgl=gaussian_filter(lum,40)*0.0+55
    a=np.clip((lum-bgl)/45,0,1)
    a=gaussian_filter(a,0.6)
    rgba=np.dstack([c,a*255]).astype("uint8"); return Image.fromarray(rgba,"RGBA")
EMB=tuple(int(v*s) for v in (215,95,1050,880))   # cross + laurel
WORD=tuple(int(v*s) for v in (130,905,1125,1125)) # THEOSIS / HEALTH
def clean_emblem():
    """Emblem matte: keep bright chrome/blue artwork, drop the textured stone and glitter speckle, keep thin helix rungs near the cross."""
    from scipy import ndimage as nd
    c=np.asarray(src.crop(EMB)).astype(np.float32)
    r,g,b=c[...,0],c[...,1],c[...,2]; lum=c.max(-1); sat=b-np.maximum(r,g)
    m=(lum>125)|((sat>55)&(b>110))
    lab,n=nd.label(m); idx=range(1,n+1)
    sz=nd.sum(m,lab,idx); ml=nd.mean(lum,lab,idx)
    big=np.isin(lab,1+np.where(sz>=400)[0]); near=nd.binary_dilation(big,iterations=40)
    nearc=nd.maximum(near,lab,idx)
    keep=[i+1 for i in range(n) if sz[i]>=400 or (sz[i]>=30 and ml[i]>165 and nearc[i])]
    m=np.isin(lab,keep)
    m=nd.binary_closing(m,iterations=2)
    holes=nd.binary_fill_holes(m)&~m; hl,hn=nd.label(holes); hs=nd.sum(holes,hl,range(1,hn+1))
    m|=np.isin(hl,1+np.where(hs<120)[0])
    ring=nd.binary_dilation(m,iterations=2)&~m
    soft=np.clip((np.maximum(lum,sat*2)-80)/60,0,1)
    a=np.where(m,1.0,np.where(ring,soft*0.7,0.0)); a=nd.gaussian_filter(a,0.6)*nd.binary_dilation(m,iterations=3)
    im=Image.fromarray(np.dstack([c,a*255]).clip(0,255).astype("uint8"),"RGBA"); im=im.crop(im.getbbox())
    return im
emb=clean_emblem(); word=keyed(WORD)
word=word.crop(word.getbbox())
emb.save(HERE+"emblem-cutout.png"); word.save(HERE+"wordmark-cutout.png")

# 2) header lockup (3x for crisp 48-56px display): emblem + wordmark
LH=168; e=emb.resize((round(emb.width*LH/emb.height),LH),Image.LANCZOS)
ww=round(word.width*LH*0.62/word.height); wd=word.resize((ww,round(LH*0.62)),Image.LANCZOS)
gap=22; lock=Image.new("RGBA",(e.width+gap+wd.width,LH),(0,0,0,0))
lock.alpha_composite(e,(0,0)); lock.alpha_composite(wd,(e.width+gap,(LH-wd.height)//2))
lock=lock.filter(ImageFilter.UnsharpMask(1.2,60,2))
lock.save(PUB+"images/theosis-health-header-lockup.png",optimize=True)
lock.save(PUB+"images/theosis-health-header-lockup.webp",quality=92)

# 3) icons from the square cross+laurel crop on its own stone background
side=int(860*s); cx,cy=int(632*s),int(487*s)
sq=src.crop((cx-side//2,cy-side//2,cx+side//2,cy+side//2))
for n,f in ((32,"favicon-32.png"),(180,"apple-touch-icon.png"),(192,"icon-192.png"),(512,"icon-512.png")):
    im=sq.resize((n,n),Image.LANCZOS)
    if n<=64: im=im.filter(ImageFilter.UnsharpMask(0.8,80,1))
    im.save(PUB+f,optimize=True)
# maskable: emblem within the 80% safe zone on stone padding
pad=int(side*0.22); big=src.crop((cx-side//2-pad,cy-side//2-pad,cx+side//2+pad,cy+side//2+pad)).resize((512,512),Image.LANCZOS)
big.save(PUB+"icon-512-maskable.png",optimize=True)
sq.resize((48,48),Image.LANCZOS).save(PUB+"favicon.ico",sizes=[(16,16),(32,32),(48,48)])

# 4) og image 1200x630
og=widen(int(H*1200/630)).resize((1200,630),Image.LANCZOS); og.save(PUB+"og.jpg",quality=88,optimize=True,progressive=True)
print("ok")

# 5) horizontal hero lockup (emblem left, wordmark right) + stacked phone version, transparent, with a soft glow halo
def soft_glow(im, pad):
    big=Image.new("RGBA",(im.width+2*pad,im.height+2*pad),(0,0,0,0)); big.alpha_composite(im,(pad,pad)); return big
def hero_h():
    EH=900; e=emb.resize((round(emb.width*EH/emb.height),EH),Image.LANCZOS)
    WH=round(EH*0.36); wd=word.resize((round(word.width*WH/word.height),WH),Image.LANCZOS)
    gap=70; pad=40; im=Image.new("RGBA",(e.width+gap+wd.width+2*pad,EH+2*pad),(0,0,0,0))
    im.alpha_composite(e,(pad,pad)); im.alpha_composite(wd,(pad+e.width+gap,pad+(EH-WH)//2)); return im
def hero_v():
    EH=900; e=emb.resize((round(emb.width*EH/emb.height),EH),Image.LANCZOS)
    WW=round(e.width*1.08); wd=word.resize((WW,round(word.height*WW/word.width)),Image.LANCZOS)
    gap=40; pad=30; Wd=max(e.width,wd.width)+2*pad; im=Image.new("RGBA",(Wd,EH+gap+wd.height+2*pad),(0,0,0,0))
    im.alpha_composite(e,((Wd-e.width)//2,pad)); im.alpha_composite(wd,((Wd-wd.width)//2,pad+EH+gap)); return im
for nm,im in (("theosis-health-hero-h",hero_h()),("theosis-health-hero-v",hero_v())):
    im.save(PUB+f"images/{nm}.webp",quality=90,alpha_quality=100); im.save(PUB+f"images/{nm}.png",optimize=True); print(nm,im.size)
