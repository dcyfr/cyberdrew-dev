#!/usr/bin/env node
/*
  Quick asset analyzer: lists large assets and finds unreferenced public/ files.
  - Flags assets > 150KB
  - Reports files in public/ not referenced in src/** or index.html
*/
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const PUBLIC_DIR = path.join(root, 'public');
const SRC_DIR = path.join(root, 'src');
const HTML_ENTRY = path.join(root, 'index.html');
const LARGE_BYTES = 150 * 1024; // 150KB

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) return walk(res);
    return res;
  }));
  return files.flat();
}

async function getFileSize(file) {
  const stat = await fs.stat(file);
  return stat.size;
}

async function main() {
  const report = { large: [], unreferenced: [] };
  const ignoreExact = new Set([
    '/_headers', '/_redirects', '/robots.txt', '/favicon.ico'
  ]);
  // 1) Large assets in public/
  try {
    const publicFiles = await walk(PUBLIC_DIR);
    for (const f of publicFiles) {
      const size = await getFileSize(f);
      if (size >= LARGE_BYTES) {
        report.large.push({ file: path.relative(root, f), size });
      }
    }

    // 2) Unreferenced public files
    const [srcFiles, html] = await Promise.all([
      walk(SRC_DIR),
      fs.readFile(HTML_ENTRY, 'utf8').catch(() => ''),
    ]);

    const code = html + '\n' + (await Promise.all(srcFiles.map(f => fs.readFile(f, 'utf8').catch(() => '')))).join('\n');

    for (const f of publicFiles) {
      const rel = path.relative(root, f).replace(/^public\//, '/');
  if (ignoreExact.has(rel)) continue;
  if (!code.includes(rel)) {
        // also try without leading slash
        const alt = rel.startsWith('/') ? rel.slice(1) : rel;
        if (!code.includes(alt)) {
          report.unreferenced.push(rel);
        }
      }
    }
  } catch (e) {
    console.error('Error analyzing assets:', e.message);
    process.exitCode = 1;
  }

  // Output
  console.log('Asset Analysis Report');
  console.log('======================');
  if (report.large.length) {
    console.log('\nLarge assets (>= 150KB):');
    for (const { file, size } of report.large) {
      console.log(` - ${file} (${(size/1024).toFixed(1)} KB)`);
    }
  } else {
    console.log('\nNo large assets found');
  }

  if (report.unreferenced.length) {
    console.log('\nPossibly unreferenced public/ files:');
    for (const f of report.unreferenced) console.log(' -', f);
  } else {
    console.log('\nNo unreferenced public/ files detected');
  }
}

main();
