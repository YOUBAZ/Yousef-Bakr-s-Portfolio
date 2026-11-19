#!/usr/bin/env python3
"""
verify.py: check the brand kit against brand.json.

    python3 brand-kit/tools/verify.py [dir ...]

With no arguments it checks brand-kit/. Pass other directories to check them too.

Fails (exit 1) on:
  - any hex colour that is not in brand.json
  - any font-family that is not IBM Plex
  - a retired name or role, or a location, inside an asset (svg, html, css, js)

Rule-definition files (BRAND.md, brand.json, this script) may name retired strings,
because that is where the rules are written down. They are still checked for colour.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BRAND = json.load(open(os.path.join(ROOT, "brand.json")))
IDENT = BRAND["identity"]

HEX = re.compile(r"#[0-9A-Fa-f]{6}\b")
FONT = re.compile(r"font-family\s*:\s*([^;}\"]+)", re.I)
ASSET_EXT = {".svg", ".html", ".css", ".js"}
TEXT_EXT = ASSET_EXT | {".md", ".json", ".py", ".txt"}
RULE_FILES = {"BRAND.md", "brand.json", "verify.py"}
ALLOWED_FONTS = {"ibm plex sans", "ibm plex mono", "ibm plex sans arabic",
                 "monospace", "sans-serif", "system-ui", "ui-monospace"}

OK_HEX = {
    v["hex"].upper()
    for theme in BRAND["palette"].values()
    for v in theme.values()
}
BANNED_IN_ASSETS = IDENT["retired_names"] + IDENT["retired_roles"] + IDENT["never_on_assets"]


def check(path):
    name = os.path.basename(path)
    ext = os.path.splitext(path)[1].lower()
    text = open(path, encoding="utf-8", errors="ignore").read()
    problems = []

    for h in set(HEX.findall(text)):
        if h.upper() not in OK_HEX:
            problems.append(f"colour {h} is not in brand.json")

    if ext in ASSET_EXT:
        for decl in FONT.findall(text):
            for fam in decl.split(","):
                fam = fam.strip().strip("'\"").lower()
                if fam.startswith("var("):
                    continue
                if fam and fam not in ALLOWED_FONTS:
                    problems.append(f"font '{fam}' is not IBM Plex")

    if ext in ASSET_EXT and name not in RULE_FILES:
        for s in BANNED_IN_ASSETS:
            if re.search(rf"\b{re.escape(s)}\b", text, re.I):
                problems.append(f"'{s}' must not appear on an asset")

    return problems


def main():
    dirs = sys.argv[1:] or [ROOT]
    checked, failed = 0, 0
    for d in dirs:
        for base, subdirs, files in os.walk(d):
            subdirs[:] = [s for s in subdirs if s not in {"node_modules", ".git", "__pycache__"}]
            for f in sorted(files):
                if os.path.splitext(f)[1].lower() not in TEXT_EXT:
                    continue
                p = os.path.join(base, f)
                checked += 1
                for msg in check(p):
                    failed += 1
                    print(f"FAIL {os.path.relpath(p)}: {msg}")
    print(f"{checked} files checked · {failed} violations")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
