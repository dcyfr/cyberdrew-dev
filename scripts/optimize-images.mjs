#!/usr/bin/env node
/*
  Simple image optimizer scaffold (no external deps):
  - Lists images suitable for conversion to WebP/AVIF
  - You can pipe paths to your preferred CLI (e.g., imagemin, sharp) outside repo
*/
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const exts = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) return walk(res);
    return res;
  }));
  return files.flat();
}

async function main() {
  const dirs = [path.join(root, 'public'), path.join(root, 'src/assets')];
  const all = (await Promise.all(dirs.map(d => walk(d).catch(() => [])))).flat();
  const candidates = all.filter(f => exts.has(path.extname(f).toLowerCase()));
  if (!candidates.length) {
    console.log('No PNG/JPEG assets found.');
    return;
  }
  console.log('Images that could be converted to WebP/AVIF:');
  for (const f of candidates) {
    console.log(' -', path.relative(root, f));
  }
}

main();
