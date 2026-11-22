#!/usr/bin/env node
/**
 * build-cv — print the CV from its source, scripts/cv/cv.html.
 *
 * Fills the double-brace tokens from brand-kit/brand.json (light palette, the Merge Y),
 * prints A4 with headless Chrome, then renders a PNG of each page for the /cv
 * preview, so the page never embeds the browser's PDF viewer.
 *
 *   CHROME=/path/to/chrome npm run cv:build
 *
 * Needs Chrome or Chromium (CHROME, or `google-chrome`/`chromium` on PATH),
 * poppler's `pdftoppm`, and network access for the Plex web fonts.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT_DIR = join(ROOT, "public/images/CV");
const PDF = join(OUT_DIR, "Yousef-Bakr-CV.pdf");

const brand = JSON.parse(readFileSync(join(ROOT, "brand-kit/brand.json"), "utf8"));
const site = readFileSync(join(ROOT, "src/config/brand.js"), "utf8");
const revision = site.match(/revision:\s*"([^"]+)"/)?.[1] ?? "";

const L = Object.fromEntries(
  Object.entries(brand.palette.light).map(([k, v]) => [k, v.hex])
);
const { main, branch, bounds } = brand.marks.glyph;
const toPath = (pts) => `M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
const [x0, y0, x1, y1] = bounds;
const side = Math.max(x1 - x0, y1 - y0) + 4;

// Static TTFs from the local kit, if it is there. Chrome embeds a static face
// as TrueType; Google's variable Plex Sans comes out as Type 3 glyphs.
const FONT_DIR = join(ROOT, "brand-kit/fonts");
const FACES = [
  ["IBM Plex Sans", 400, "IBMPlexSans-Regular.ttf"],
  ["IBM Plex Sans", 500, "IBMPlexSans-Medium.ttf"],
  ["IBM Plex Sans", 600, "IBMPlexSans-SemiBold.ttf"],
  ["IBM Plex Mono", 400, "IBMPlexMono-Regular.ttf"],
  ["IBM Plex Mono", 500, "IBMPlexMono-Medium.ttf"],
];
const fontFaces = FACES.every(([, , file]) => existsSync(join(FONT_DIR, file)))
  ? FACES.map(
      ([family, weight, file]) =>
        `@font-face{font-family:"${family}";font-weight:${weight};src:url("file://${join(FONT_DIR, file)}") format("truetype")}`
    ).join("\n  ")
  : "";

const tokens = {
  FONT_FACES: fontFaces,
  GROUND: L.ground,
  INK: L.ink,
  MUTED: L.muted,
  RULE: L.rule,
  SIGNAL: L.signal,
  REVISION: revision,
  GLYPH_MAIN: toPath(main),
  GLYPH_BRANCH: toPath(branch),
  GLYPH_VIEWBOX: `${(x0 + x1) / 2 - side / 2} ${(y0 + y1) / 2 - side / 2} ${side} ${side}`,
};

let html = readFileSync(join(ROOT, "scripts/cv/cv.html"), "utf8");
html = html.replace(/\{\{(\w+)\}\}/g, (m, key) => {
  if (!(key in tokens)) throw new Error(`cv.html: unknown token ${m}`);
  return tokens[key];
});

const chrome =
  process.env.CHROME ||
  ["google-chrome", "chromium", "chromium-browser"].find((bin) => {
    try {
      execFileSync("which", [bin], { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  });
if (!chrome) throw new Error("Set CHROME to a Chrome or Chromium binary.");

const work = mkdtempSync(join(tmpdir(), "cv-"));
const page = join(work, "cv.html");
writeFileSync(page, html);

execFileSync(chrome, [
  "--headless=new",
  "--no-sandbox",
  "--no-pdf-header-footer",
  "--virtual-time-budget=10000",
  `--print-to-pdf=${PDF}`,
  `file://${page}`,
], { stdio: "ignore" });
rmSync(work, { recursive: true, force: true });

// One PNG per page for the on-page preview. Old pages are removed first so a
// shorter CV does not leave a stale page behind.
for (const f of readdirSync(OUT_DIR)) {
  if (/^page-\d+\.png$/.test(f)) unlinkSync(join(OUT_DIR, f));
}
execFileSync("pdftoppm", ["-png", "-r", "120", PDF, join(OUT_DIR, "page")]);
const pages = readdirSync(OUT_DIR).filter((f) => /^page-\d+\.png$/.test(f)).sort();
console.log(`cv: ${PDF.replace(ROOT, "")} · ${pages.length} page(s): ${pages.join(", ")}`);
