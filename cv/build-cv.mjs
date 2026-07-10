/**
 * Renders cv/cv.html to public/cv.pdf via headless Chromium.
 *
 *   node cv/build-cv.mjs
 *
 * Chrome's print pipeline (Skia/PDF) is what produced the original file, so the
 * output stays text-selectable with embedded font subsets — which matters
 * because recruiters' applicant-tracking systems parse the text layer.
 *
 * Waits on document.fonts.ready: without it Chromium prints before Bricolage
 * Grotesque arrives from Google Fonts and silently falls back to system-ui.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, 'cv.html');
const OUT = resolve(here, '..', 'public', 'cv.pdf');

// A4 at 96dpi. The viewport must match the print width, or the overflow check
// below measures a layout the printer will never produce.
const A4 = { width: 794, height: 1123 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: A4 });
await page.emulateMedia({ media: 'print' });

await page.goto(`file://${SRC}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const usedFallback = await page.evaluate(() => {
  const f = [...document.fonts].filter((x) => x.status === 'loaded');
  return !f.some((x) => x.family.includes('Bricolage'));
});
if (usedFallback) {
  console.error('Bricolage Grotesque did not load — refusing to print a fallback-font CV.');
  await browser.close();
  process.exit(1);
}

// Measure the real content bottom, not documentElement.scrollHeight — that
// saturates at the viewport height, so it reports "exactly one page" for any
// document that fits, and tells you nothing about the remaining headroom.
const height = await page.evaluate(() => {
  const bottom = Math.max(
    ...[...document.querySelectorAll('body > *')].map((el) => el.getBoundingClientRect().bottom)
  );
  return Math.round(bottom + parseFloat(getComputedStyle(document.body).paddingBottom));
});

await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();

const slack = A4.height - height;
console.log(`wrote ${OUT} — content ${height}px of ${A4.height}px (${slack}px headroom)`);

if (slack < 0) {
  console.error(`\nERROR: the CV spills onto a second page. A one-page CV is the brief.`);
  console.error(`Trim ${-slack}px of content, or tighten the type scale.`);
  process.exit(1);
}
if (slack < 25) {
  console.warn(`WARNING: only ${slack}px of headroom. Font metrics vary between machines;`);
  console.warn('a build elsewhere could spill to two pages.');
}
