// The hero copy sits on the left of the photo. Overlays darken it further, so
// the source file itself must carry detail there. A photo that is already dark
// or flat on the left fails here instead of being hidden behind more gradient.
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const MIN_WIDTH = 3200;
const MIN_MEAN = 0.1;
const MIN_STD = 0.04;
const LEFT_SHARE = 0.3;

const file = process.argv[2] ?? join(process.cwd(), "public", "images", "hero", "timmins-hero.jpg");

if (!existsSync(file)) {
  console.warn(`check-hero-image: ${file} not found. Skipping check.`);
  process.exit(0);
}

const image = sharp(file);
const { width = 0, height = 0 } = await image.metadata();
const problems = [];

if (width < MIN_WIDTH) problems.push(`width ${width}px is below ${MIN_WIDTH}px`);
if (width && height && width / height < 16 / 9 - 0.01) problems.push(`aspect ${(width / height).toFixed(2)} is narrower than 16:9`);

const leftWidth = Math.max(1, Math.round(width * LEFT_SHARE));
const { data, info } = await sharp(file)
  .extract({ left: 0, top: 0, width: leftWidth, height })
  .removeAlpha()
  .toColourspace("srgb")
  .raw()
  .toBuffer({ resolveWithObject: true });

const toLinear = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

let sum = 0;
let sumSq = 0;
const pixels = info.width * info.height;
for (let i = 0; i < data.length; i += info.channels) {
  const y = 0.2126 * toLinear(data[i]) + 0.7152 * toLinear(data[i + 1]) + 0.0722 * toLinear(data[i + 2]);
  sum += y;
  sumSq += y * y;
}
const mean = sum / pixels;
const std = Math.sqrt(Math.max(0, sumSq / pixels - mean * mean));

if (mean < MIN_MEAN) problems.push(`left ${LEFT_SHARE * 100}% mean luminance ${mean.toFixed(3)} is below ${MIN_MEAN}`);
if (std < MIN_STD) problems.push(`left ${LEFT_SHARE * 100}% luminance std ${std.toFixed(3)} is below ${MIN_STD}`);

const summary = `${width}x${height}, left mean ${mean.toFixed(3)}, std ${std.toFixed(3)}`;
if (problems.length) {
  console.error(`check-hero-image: ${file} fails (${summary})\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`check-hero-image: ok (${summary})`);
