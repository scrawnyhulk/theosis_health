# Builds Theosis Health logo assets from the Theosis Medical originals:
# recolors blue -> teal and replaces MEDICAL with HEALTH in the same spaced style.
import numpy as np, colorsys, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
SRC = "/workspace/site/public/images/"; OUT = "/workspace/theosishealth/public/images/"
FONT = "/usr/share/fonts/truetype/sand-box/google/Lexend Exa/LexendExa-VariableFont_wght.ttf"
TEAL = (34, 184, 160)

def teal_shift(im):
    a = np.asarray(im).astype(float) / 255
    rgb = a[..., :3]; r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mx = rgb.max(-1); mn = rgb.min(-1); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    # blue-dominant pixels; weight by how blue they are
    w = np.clip((b - np.maximum(r, g)) * 6, 0, 1) * np.clip(sat * 3, 0, 1)
    # target: rotate hue to teal (~170deg) keeping value/sat: new = (r', g', b') with g,b swapped-ish
    lum = mx
    tr, tg, tb = TEAL[0]/255, TEAL[1]/255, TEAL[2]/255
    k = lum / (TEAL[1]/255)  # scale teal by brightness of the blue
    k = np.clip(k * 0.95, 0, 1.4)
    newr = np.clip(mn + (tr - 0.13) * k, 0, 1); newg = np.clip(mn * 0.5 + tg * k, 0, 1); newb = np.clip(mn * 0.5 + tb * k, 0, 1)
    out = rgb.copy()
    out[..., 0] = r * (1 - w) + newr * w; out[..., 1] = g * (1 - w) + newg * w; out[..., 2] = b * (1 - w) + newb * w
    a[..., :3] = out
    return Image.fromarray((a * 255).astype(np.uint8), im.mode)

def fill_band(im, x0, x1, y0, y1, transparent):
    a = np.asarray(im).copy()
    if transparent:
        a[y0:y1, x0:x1, 3] = 0
    else:
        top = a[y0 - 3:y0].astype(float).mean(0); bot = a[y1:y1 + 3].astype(float).mean(0)
        for i, y in enumerate(range(y0, y1)):
            t = i / max(1, y1 - y0 - 1); a[y, x0:x1] = (top * (1 - t) + bot * t)[x0:x1]
    out = Image.fromarray(a, im.mode)
    if not transparent:  # soften the patch
        reg = out.crop((x0, y0, x1, y1)).filter(ImageFilter.GaussianBlur(3)); out.paste(reg, (x0, y0))
    return out

def draw_word(im, word, x0, x1, cy, cap_h, weight=400, glow=True):
    font = ImageFont.truetype(FONT, 100); font.set_variation_by_axes([weight])
    bb = font.getbbox("H"); size = int(100 * cap_h / (bb[3] - bb[1]))
    font = ImageFont.truetype(FONT, size); font.set_variation_by_axes([weight])
    widths = [font.getbbox(c)[2] - font.getbbox(c)[0] for c in word]
    gap = ((x1 - x0) - sum(widths)) / (len(word) - 1)
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(layer)
    x = x0; top = cy - cap_h / 2
    for c, wd in zip(word, widths):
        cb = font.getbbox(c); d.text((x - cb[0], top - cb[1]), c, font=font, fill=TEAL + (255,)); x += wd + gap
    base = im.convert("RGBA")
    if glow:
        g = layer.filter(ImageFilter.GaussianBlur(max(2, cap_h / 6)))
        ga = np.asarray(g).copy(); ga[..., 3] = (ga[..., 3] * 0.6).astype(np.uint8); base = Image.alpha_composite(base, Image.fromarray(ga))
    return Image.alpha_composite(base, layer).convert(im.mode)

def letters_box(im, y0, y1, xl, xr):
    a = np.asarray(im.convert("RGB")).astype(int); m = (a[..., 2] > a[..., 0] + 40) & (a[..., 2] > 90)
    cols = m[y0:y1].sum(0); xs = [x for x in range(xl, xr) if cols[x] > 0]
    rows = [y for y in range(y0, y1) if m[y, xl:xr].sum() > 0]
    return xs[0], xs[-1], rows[0], rows[-1]

jobs = [  # file, out, (band y0,y1), letter search x range, transparent
    ("header-lockup.png", "health-header-lockup.png", (124, 156), (250, 482), True),
    ("logo.jpg", "health-logo.jpg", (752, 806), (632, 1044), False),
    ("logo-phone.png", "health-logo-phone.png", (900, 948), (228, 618), False),
]
for src, out, (y0, y1), (xl, xr), tr in jobs:
    im = Image.open(SRC + src); im = im.convert("RGBA" if tr else "RGB")
    lx0, lx1, ly0, ly1 = letters_box(im, y0, y1, xl, xr)
    print(src, "letters", lx0, lx1, ly0, ly1)
    im = teal_shift(im)
    im = fill_band(im, lx0 - 4, lx1 + 5, ly0 - 4, ly1 + 5, tr)
    im = draw_word(im, "HEALTH", lx0, lx1, (ly0 + ly1) / 2, ly1 - ly0 + 1, glow=not tr)
    im.save(OUT + out, quality=92) if out.endswith("jpg") else im.save(OUT + out)
