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

const browser = await chromium.launch();
const page = await browser.newPage();

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

const overflowed = await page.evaluate(() => document.body.scrollHeight > 1123); // A4 @ 96dpi
await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();

console.log(`wrote ${OUT}`);
if (overflowed) console.warn('WARNING: content exceeds one A4 page.');
