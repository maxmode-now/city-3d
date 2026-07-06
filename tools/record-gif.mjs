// Records the README demo GIF: drives the app in headless Chrome through a
// short Seoul → night → New York choreography while capturing frames, then
// encodes them with gifenc.
//
// Usage: start the dev server (npm run dev), then `npm run record:gif`.
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';

const { GIFEncoder, quantize, applyPalette } = gifenc;

const URL = process.env.DEMO_URL ?? 'http://localhost:5173/';
const OUT = process.env.OUT ?? 'docs/demo.gif';
const WIDTH = 720;
const HEIGHT = 450;
const FRAME_MS = 220; // target capture interval

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error('No Chrome or Edge executable found');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForFunction('window.__map && window.__map.loaded()', {
  timeout: 60000,
});
await sleep(1500);

// Frame capture runs in parallel with the choreography below
const frames = [];
let capturing = true;
const captureLoop = (async () => {
  while (capturing) {
    const t = Date.now();
    frames.push(await page.screenshot({ type: 'png' }));
    const spent = Date.now() - t;
    if (spent < FRAME_MS) await sleep(FRAME_MS - spent);
  }
})();

const t0 = Date.now();
await page.click('#landmark-list li[data-id="lotte-tower"]');
await sleep(5200);
await page.click('#theme-controls button[data-theme="night"]');
await sleep(2600);
await page.click('#city-controls button[data-city="nyc"]');
await sleep(7200);
await page.click('#landmark-list li[data-id="one-wtc"]');
await sleep(5200);
await page.click('#landmark-list li[data-id="empire-state"]');
await sleep(6200);
capturing = false;
await captureLoop;
const elapsed = Date.now() - t0;
await browser.close();

const delay = Math.round(elapsed / frames.length);
console.log(`captured ${frames.length} frames in ${(elapsed / 1000).toFixed(1)}s (~${delay}ms/frame), encoding...`);

const gif = GIFEncoder();
for (const buf of frames) {
  const png = PNG.sync.read(buf);
  const rgba = new Uint8Array(png.data.buffer, png.data.byteOffset, png.data.length);
  const palette = quantize(rgba, 256);
  const index = applyPalette(rgba, palette);
  gif.writeFrame(index, png.width, png.height, { palette, delay });
}
gif.finish();

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.from(gif.bytes()));
const mb = (fs.statSync(OUT).size / 1e6).toFixed(1);
console.log(`wrote ${OUT}: ${frames.length} frames, ${mb} MB`);
