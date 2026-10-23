// One-off image optimiser for the site's photos.
// Creates WebP copies beside the originals (originals are left untouched).
// Usage: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const MAX_WIDTH = 1600;
const QUALITY = 78;
const SKIP_DIRS = ["newsletter"];

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      out.push(...walk(full));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
};

const files = walk(ROOT);
let saved = 0;

for (const file of files) {
  const before = fs.statSync(file).size;

  const target = file.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(target)) continue;

  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(target);

  const after = fs.statSync(target).size;
  saved += before - after;
  console.log(
    `${path.relative(ROOT, file)}  ${(before / 1024 / 1024).toFixed(2)}MB → ${(
      after / 1024
    ).toFixed(0)}KB`
  );
}

console.log(`\nDone. Saved ${(saved / 1024 / 1024).toFixed(1)} MB.`);
