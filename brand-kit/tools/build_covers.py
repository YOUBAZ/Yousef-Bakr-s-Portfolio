#!/usr/bin/env python3
"""
build_covers.py: generate blog banners and project covers from the site's data.

    python3 brand-kit/tools/build_covers.py --fonts <dir> --chrome <path>

Needs: pip install playwright   (and a Chromium; --chrome points at its binary)
Run it again whenever a post or project is added, renamed or re-dated.
Fonts expected in --fonts (IBM Plex, .woff):
    ibm-plex-sans-latin-{400,500,600}-normal.woff, ibm-plex-mono-latin-500-normal.woff

Reads  public/data/blogs.json, public/data/projects.json, brand-kit/brand.json
Writes public/images/blog/<id>.png      1200x630 at 2x
       public/images/blog/default.png   fallback for a post with no cover
       public/images/projects/<id>.png  1280x800 (16:10) at 2x
       ...and a <name>-dark.png beside each, which the site swaps in for dark mode.

Layout is BRAND.md section 6: header strip, visible 12-column grid, a signal
marker under the headline, footer strip with the Merge Y. Signal colour goes on
exactly one element per cover. The stack is never listed (CLAUDE.md, assets).
Never hand-edit the outputs: change the data or THESES below and run again.
"""
import argparse, html, json, os, pathlib, re
from datetime import datetime

from playwright.sync_api import sync_playwright

KIT = pathlib.Path(__file__).resolve().parents[1]
ROOT = KIT.parent
BRAND = json.loads((KIT / "brand.json").read_text())
PALETTES = {t: {k: v["hex"] for k, v in BRAND["palette"][t].items()} for t in ("light", "dark")}
C = dict(PALETTES["light"])  # the active theme; main() switches it per pass
G = BRAND["marks"]["glyph"]
I = BRAND["identity"]

# The argument each post makes, carried over from the v2.4 banners. One line of
# headline, one line of support, and the diagram that draws it.
THESES = {
    "ai-agents-agentic-systems-2025": ("Agents are a control-flow problem",
        "Where the flow lives once the model decides the next step, and what you can still trace when it does.", "branch"),
    "rag-retrieval-augmented-generation-2025": ("Retrieval is a data problem first",
        "Chunking, embeddings and ranking decide the answer long before the model ever sees it.", "retrieval"),
    "edge-computing-serverless-2025": ("The edge is a latency decision",
        "What moves out, what stays central, and what a cold start actually costs you per request.", "edge"),
    "getting-started-with-ai-engineering": ("Prompts are configuration",
        "Version them, evaluate them and trace them like anything else that ships to production.", "steps"),
    "modern-devops-practices-2024": ("The pipeline is a product",
        "It has users, it has uptime, and it has a blast radius when it breaks.", "pipeline"),
    "building-scalable-microservices": ("Most teams need boundaries",
        "Deployment topology and code structure are two different decisions. Teams collapse them into one, then pay for it.", "gateway"),
}

esc = html.escape


def merge_y(h):
    poly = lambda pts: "M" + " L".join(f"{x} {y}" for x, y in pts) + " Z"
    x0, y0, x1, y1 = G["bounds"]
    w = (x1 - x0) / (y1 - y0) * h
    return (f'<svg viewBox="{x0} {y0} {x1-x0} {y1-y0}" width="{w:.1f}" height="{h}">'
            f'<path d="{poly(G["main"])}" fill="{C["ink"]}"/>'
            f'<path d="{poly(G["branch"])}" fill="{C["signal"]}"/></svg>')


# ---------------------------------------------------------------- diagrams
# 420x300 boxes. Ink strokes, muted labels, one signal element each.
def label(x, y, t, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-family="PlexMono" font-size="13" fill="{C["muted"]}" '
            f'text-anchor="{anchor}">{t}</text>')


def diagram(kind):
    ink, sig, rule = C["ink"], C["signal"], C["rule"]
    s = []
    if kind == "branch":
        s.append(f'<path d="M20 150 H150" stroke="{ink}" stroke-width="2.5" fill="none"/>')
        for y, t, hot in ((60, "plan", True), (150, "act", False), (240, "observe", False)):
            s.append(f'<path d="M150 150 L230 {y} H330" stroke="{ink}" stroke-width="2.5" fill="none"/>')
            s.append(f'<rect x="330" y="{y-9}" width="18" height="18" fill="{sig if hot else ink}"/>')
            s.append(label(360, y + 5, t))
        s.append(f'<rect x="143" y="143" width="14" height="14" fill="{ink}"/>')
    elif kind == "retrieval":
        for gx, t in ((20, "corpus"), (300, "context")):
            n = 9 if gx == 20 else 4
            step = 100 / n
            for i in range(n):
                for j in range(n):
                    s.append(f'<rect x="{gx + i*step:.1f}" y="{90 + j*step:.1f}" width="{step*.55:.1f}" height="{step*.55:.1f}" fill="{ink if gx==300 else C["muted"]}"/>')
            s.append(label(gx, 230, t))
        s.append(f'<path d="M130 120 Q210 10 290 120" stroke="{sig}" stroke-width="3" fill="none"/>')
    elif kind == "edge":
        import random
        rnd = random.Random(7)
        s.append(f'<rect x="20" y="130" width="34" height="34" fill="{sig}"/>')
        s.append(label(20, 190, "core"))
        for _ in range(70):
            x = 140 + rnd.random() ** 0.7 * 260
            y = 30 + rnd.random() * 240
            size = 4 + (x - 140) / 260 * 10
            s.append(f'<rect x="{x:.0f}" y="{y:.0f}" width="{size:.0f}" height="{size:.0f}" fill="{ink}" opacity="{0.35 + (x-140)/260*0.65:.2f}"/>')
        s.append(label(400, 290, "edge", "end"))
    elif kind == "steps":
        for k, t in enumerate(("prompt", "eval", "trace", "guardrail")):
            x = 20 + k * 70
            y = 60 + k * 60
            s.append(label(x, y - 10, t))
            s.append(f'<path d="M{x} {y} H400" stroke="{sig if k == 0 else ink}" stroke-width="{3 if k == 0 else 1.5}"/>')
    elif kind == "pipeline":
        s.append(f'<rect x="40" y="30" width="340" height="240" fill="none" stroke="{ink}" stroke-width="2" rx="4"/>')
        s.append(f'<path d="M140 30 H280" stroke="{sig}" stroke-width="5"/>')
        for k, t in enumerate(("build", "test", "deploy", "observe")):
            s.append(f'<text x="80" y="{100 + k*40}" font-family="PlexMono" font-size="17" fill="{ink if k == 0 else C["muted"]}">{t}</text>')
    elif kind == "gateway":
        s.append(f'<rect x="140" y="20" width="140" height="56" fill="none" stroke="{sig}" stroke-width="3" rx="4"/>')
        s.append(f'<text x="210" y="54" font-family="PlexMono" font-size="15" fill="{ink}" text-anchor="middle">gateway</text>')
        for k, t in enumerate(("auth", "users", "orders", "payment")):
            x = 10 + k * 104
            s.append(f'<path d="M210 76 L{x+42} 210" stroke="{rule}" stroke-width="1.5"/>')
            s.append(f'<rect x="{x}" y="210" width="84" height="50" fill="{C["ground"]}" stroke="{ink}" stroke-width="1.5" rx="4"/>')
            s.append(f'<text x="{x+42}" y="240" font-family="PlexMono" font-size="13" fill="{ink}" text-anchor="middle">{t}</text>')
    return f'<svg viewBox="0 0 420 300" width="420" height="300">{"".join(s)}</svg>'


# ---------------------------------------------------------------- page shell
def shell(w, h, fonts, body, top_left, top_right, foot_right):
    ff = lambda wt, fam: pathlib.Path(f"{fonts}/ibm-plex-{fam}-latin-{wt}-normal.woff").as_uri()
    cols = "".join("<span></span>" for _ in range(12))
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Plex;src:url({ff(400,'sans')});font-weight:400}}
@font-face{{font-family:Plex;src:url({ff(500,'sans')});font-weight:500}}
@font-face{{font-family:Plex;src:url({ff(600,'sans')});font-weight:600}}
@font-face{{font-family:PlexMono;src:url({ff(500,'mono')});font-weight:500}}
*{{margin:0;box-sizing:border-box}}
body{{width:{w}px;height:{h}px;background:{C['ground']};color:{C['ink']};font-family:Plex;position:relative;overflow:hidden}}
.strip{{position:absolute;left:64px;right:64px;display:flex;align-items:center;gap:24px;font-family:PlexMono;font-weight:500;font-size:17px;color:{C['muted']}}}
.top{{top:34px;padding-bottom:16px;border-bottom:1px solid {C['rule']}}}
.bot{{bottom:34px;padding-top:16px;border-top:1px solid {C['rule']}}}
.push{{margin-left:auto}}
.grid{{position:absolute;left:64px;right:64px;top:86px;bottom:86px;display:grid;grid-template-columns:repeat(12,1fr)}}
.grid span{{border-left:1px solid {C['rule']}}} .grid span:last-child{{border-right:1px solid {C['rule']}}}
.panel{{position:absolute;background:{C['ground']}}}
h1{{font-weight:600;letter-spacing:-.01em;line-height:1.08}}
.marker{{width:44px;height:3px;background:{C['signal']}}}
.sub{{color:{C['muted']};line-height:1.45}}
.mono{{font-family:PlexMono;font-weight:500}}
</style></head><body>
<div class="strip top"><span>{top_left}</span><span class="push">{top_right}</span></div>
<div class="grid">{cols}</div>
{body}
<div class="strip bot">{merge_y(22)}<span style="color:{C['ink']}">{esc(I['name'])}</span><span>{esc(I['role'])}</span><span class="push">{foot_right}</span></div>
</body></html>"""


def blog_cover(post, n, total, fonts):
    title, sub, kind = THESES.get(post["id"], (post["title"], post.get("description", ""), "branch"))
    date = datetime.fromisoformat(post["publishDate"].replace("Z", "+00:00")).strftime("%d %b %Y")
    body = f"""
<div class="panel" style="left:64px;top:132px;width:600px;padding:20px 32px 20px 0">
  <h1 style="font-size:54px">{esc(title)}</h1>
  <div class="marker" style="margin-top:26px"></div>
  <p class="sub" style="font-size:21px;margin-top:22px;max-width:540px">{esc(sub)}</p>
</div>
<div class="panel" style="right:72px;top:150px;padding:10px">{diagram(kind)}</div>"""
    return shell(1200, 630, fonts, body, "Decision log", esc(date), f"{n:02d} / {total:02d}")


def default_cover(fonts):
    body = f"""
<div class="panel" style="left:64px;top:150px;width:700px;padding:20px 32px 20px 0">
  <h1 style="font-size:56px">The decisions rather than the tools.</h1>
  <div class="marker" style="margin-top:26px"></div>
  <p class="sub" style="font-size:21px;margin-top:22px">{esc(I['slogan'])}</p>
</div>
<div class="panel" style="right:96px;top:170px;padding:10px">{merge_y(220)}</div>"""
    return shell(1200, 630, fonts, body, "Decision log", "Writing", esc(I["site"]))


def project_cover(p, fonts):
    key = (p.get("highlights") or [None])[0]
    status = "Case study" if p.get("brief") else "Open source"
    fig = ""
    if key:
        fig = f"""
<div class="panel" style="right:72px;top:250px;width:360px;padding:24px 0 24px 28px;border-left:2px solid {C['ink']}">
  <p class="mono" style="font-size:92px;line-height:1;color:{C['signal_type']}">{esc(key['value'])}</p>
  <p class="mono" style="font-size:19px;color:{C['muted']};margin-top:14px;line-height:1.4">{esc(key['label'])}</p>
</div>"""
    width = 640 if key else 960
    body = f"""
<div class="panel" style="left:64px;top:{160 if key else 240}px;width:{width}px;padding:20px 32px 20px 0">
  <p class="mono" style="font-size:20px;color:{C['signal_type'] if not key else C['muted']}">{esc(p.get('role', ''))}</p>
  <h1 style="font-size:{76 if len(p['title']) < 16 else 62}px;margin-top:18px">{esc(p['title'])}</h1>
  <div class="marker" style="margin-top:28px"></div>
  <p class="sub" style="font-size:23px;margin-top:24px">{esc(first_sentence(p.get('summary', '')))}</p>
</div>{fig}"""
    return shell(1280, 800, fonts, body, status, esc(p.get("context") or ""), "Projects")


# Assets never list the stack (CLAUDE.md). Cut a summary before its tool list.
STACK_CLAUSE = re.compile(r"\s+(built with|built on|powered by|using)\b.*$", re.I)


def first_sentence(text):
    s = text.split(". ")[0].rstrip(".")
    s = STACK_CLAUSE.sub("", s).rstrip(",")
    return s + "." if s else ""


def build_jobs(blogs_sorted, projects, fonts):
    jobs = [(f"public/images/blog/{b['id']}.png", blog_cover(b, i + 1, len(blogs_sorted), fonts), 1200, 630)
            for i, b in enumerate(blogs_sorted)]
    jobs.append(("public/images/blog/default.png", default_cover(fonts), 1200, 630))
    jobs += [(f"public/images/projects/{p['id']}.png", project_cover(p, fonts), 1280, 800) for p in projects]
    return jobs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts", required=True)
    ap.add_argument("--chrome", required=True)
    a = ap.parse_args()

    blogs = json.loads((ROOT / "public/data/blogs.json").read_text())
    blogs = blogs.get("blogs", blogs) if isinstance(blogs, dict) else blogs
    projects = json.loads((ROOT / "public/data/projects.json").read_text())["projects"]
    blogs_sorted = sorted(blogs, key=lambda b: b["publishDate"])


    tmp = KIT / "tools" / ".cover.html"
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path=a.chrome)
        for theme in ("light", "dark"):
            C.clear()
            C.update(PALETTES[theme])
            suffix = "" if theme == "light" else "-dark"
            for out, page_html, w, h in build_jobs(blogs_sorted, projects, a.fonts):
                out = out.replace(".png", f"{suffix}.png")
                pg = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
                tmp.write_text(page_html)
                pg.goto(tmp.as_uri())
                pg.wait_for_timeout(300)
                pg.screenshot(path=str(ROOT / out))
                pg.close()
                print("  " + out)
        browser.close()
    tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
