#!/usr/bin/env python3
"""
build_marks.py: generate every logo file from brand.json.

    python3 tools/build_marks.py --fonts <dir with IBM Plex .ttf files>

Needs: pip install fonttools uharfbuzz
Font files expected in --fonts:
    ibm-plex-sans-latin-600-normal.ttf   (wordmark)
    ibm-plex-mono-latin-500-normal.ttf   (descriptor)

Type is shaped with HarfBuzz (real kerning) and converted to outlines, so the
SVGs render identically with or without the fonts installed. Never hand-edit
the files in logo/. Change brand.json and run this again.
"""
import argparse, json, os

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND = json.load(open(os.path.join(ROOT, "brand.json")))
OUT = os.path.join(ROOT, "logo")
P = BRAND["palette"]
G = BRAND["marks"]["glyph"]


def outline(text, ttf_path, size, tracking_em=0.0):
    """Return (svg path d, advance width, cap height) for text at size px."""
    blob = hb.Blob.from_file_path(ttf_path)
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})

    tt = TTFont(ttf_path)
    gs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    upm = tt["head"].unitsPerEm
    s = size / upm
    cap = tt["OS/2"].sCapHeight * s

    pen = SVGPathPen(gs)
    x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        # flip y: font units go up, SVG goes down. Baseline sits at y = 0.
        tp = TransformPen(pen, (s, 0, 0, -s, (x + pos.x_offset) * s, -pos.y_offset * s))
        gs[name].draw(tp)
        x += pos.x_advance + tracking_em * upm
    x -= tracking_em * upm  # no tracking after the last glyph
    return pen.getCommands(), x * s, cap


def poly(pts):
    return "M" + " L".join(f"{x:g} {y:g}" for x, y in pts) + " Z"


MAIN_D, BRANCH_D = poly(G["main"]), poly(G["branch"])


def glyph_svg(ink, signal, scale=1.0, dx=0.0, dy=0.0):
    """Merge Y: main line in ink, branch in signal. Pass signal=ink for the all-ink version."""
    t = f'transform="translate({dx:.2f} {dy:.2f}) scale({scale:.4f})"'
    return f'<g {t}><path d="{MAIN_D}" fill="{ink}"/><path d="{BRANCH_D}" fill="{signal}"/></g>'


# Glyph bounds in grid units, from brand.json. The square crop adds a 2-unit margin.
GX0, GY0, GX1, GY1 = G["bounds"]
_side = max(GX1 - GX0, GY1 - GY0) + 4.0
SQUARE = f"{(GX0 + GX1) / 2 - _side / 2:g} {(GY0 + GY1) / 2 - _side / 2:g} {_side:g} {_side:g}"


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


def write(name, content):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(content)
    print("  logo/" + name)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts", required=True)
    fonts = ap.parse_args().fonts
    os.makedirs(OUT, exist_ok=True)

    name = BRAND["marks"]["wordmark"]["text"]
    desc = BRAND["marks"]["descriptor"]["text"]
    sans = os.path.join(fonts, "ibm-plex-sans-latin-600-normal.ttf")
    mono = os.path.join(fonts, "ibm-plex-mono-latin-500-normal.ttf")

    WM_SIZE, DESC_SIZE, PAD = 48, 15, 4
    tracking = float(BRAND["type"]["rules"]["headline_tracking"].replace("em", ""))
    wm_d, wm_w, cap = outline(name, sans, WM_SIZE, tracking)
    ds_d, ds_w, ds_cap = outline(desc, mono, DESC_SIZE)

    for theme, key in (("on-light", "light"), ("on-dark", "dark")):
        ink, muted, sig = P[key]["ink"]["hex"], P[key]["muted"]["hex"], P[key]["signal"]["hex"]

        # 1. Wordmark: the primary mark. Name only.
        top = WM_SIZE * 0.78  # room for ascenders above the baseline
        h = top + WM_SIZE * 0.26 + PAD
        body = f'<path transform="translate({PAD} {top + PAD})" d="{wm_d}" fill="{ink}"/>'
        write(f"wordmark-{theme}.svg", svg(wm_w + 2 * PAD, h + PAD, body, name))

        # 2. Lockup: wordmark over the descriptor. Document-header form.
        gap = 14
        ds_base = top + PAD + WM_SIZE * 0.22 + gap + ds_cap
        h = ds_base + DESC_SIZE * 0.3 + PAD
        body = (
            f'<path transform="translate({PAD} {top + PAD})" d="{wm_d}" fill="{ink}"/>'
            f'<path transform="translate({PAD + 1.5} {ds_base:.2f})" d="{ds_d}" fill="{muted}"/>'
        )
        write(f"lockup-{theme}.svg", svg(max(wm_w, ds_w) + 2 * PAD, h, body, f"{name}, {desc}"))

        # 3. Horizontal lockup: Merge Y, then wordmark. For footers and headers.
        # Construction rule: the mark is 1.45x the wordmark cap height, centred on
        # the cap height, with a 0.4em gap.
        base = top + PAD
        mh = cap * G["lockup_height_to_cap"]
        gscale = mh / (GY1 - GY0)
        gw = (GX1 - GX0) * gscale
        gtop = base - cap / 2 - mh / 2
        body = glyph_svg(ink, sig, gscale, PAD - GX0 * gscale, gtop - GY0 * gscale)
        tx = PAD + gw + WM_SIZE * 0.4
        body += f'<path transform="translate({tx:.2f} {base})" d="{wm_d}" fill="{ink}"/>'
        write(f"lockup-horizontal-{theme}.svg", svg(tx + wm_w + PAD, base + WM_SIZE * 0.26 + PAD, body, name))

        # 4. Merge Y alone, cropped square so it fills small sizes. Signal and all-ink.
        for suffix, branch in (("", sig), ("-mono", ink)):
            write(
                f"glyph{suffix}-{theme}.svg",
                svg(48, 48, glyph_svg(ink, branch), "Merge Y").replace('viewBox="0.00 0.00 48.00 48.00"', f'viewBox="{SQUARE}"').replace('viewBox="0 0 48.00 48.00"', f'viewBox="{SQUARE}"'),
            )

    # 5. Favicon: one file, follows the system theme.
    L, D = P["light"], P["dark"]
    fav = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{SQUARE}">'
        f"<style>.m{{fill:{L['ink']['hex']}}}.b{{fill:{L['signal']['hex']}}}"
        f"@media (prefers-color-scheme: dark){{.m{{fill:{D['ink']['hex']}}}.b{{fill:{D['signal']['hex']}}}}}</style>"
        f'<path class="m" d="{MAIN_D}"/><path class="b" d="{BRANCH_D}"/></svg>\n'
    )
    write("favicon.svg", fav)


if __name__ == "__main__":
    main()
