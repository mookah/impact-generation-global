// Verifies every /images/... reference in the source maps to a real file.
// Usage: node scripts/check-images.mjs
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "lib"];
const missing = [];
const seen = new Set();

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
};

for (const root of roots) {
  for (const file of walk(root)) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)) {
      const ref = match[1];
      if (seen.has(ref)) continue;
      seen.add(ref);
      if (!fs.existsSync(path.join("public", ref))) missing.push(`${ref}  (${file})`);
    }
  }
}

console.log(`Checked ${seen.size} image references.`);
if (missing.length) {
  console.log(`\nMISSING (${missing.length}):`);
  for (const item of missing) console.log("  " + item);
  process.exitCode = 1;
} else {
  console.log("All image references resolve.");
}
