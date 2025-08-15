#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Simple CI budget checker for Vite dist outputs
// Configure budgets in KB; gzip sizes are not counted here, this uses file sizes on disk.
const BUDGETS = {
  vendor: 450 * 1024, // 450 KB
  motion: 90 * 1024,  // 90 KB
  radix: 60 * 1024,   // 60 KB
  markdown: 80 * 1024, // 80 KB
  highlight: 60 * 1024, // 60 KB
};

const DIST_DIR = path.resolve('dist/assets');

function getFiles(dir) {
  return fs.readdirSync(dir).filter(f => /\.(js|css)$/i.test(f));
}

function checkBudgets() {
  const files = getFiles(DIST_DIR);
  const results = [];
  const errors = [];

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    const stat = fs.statSync(filePath);
    const size = stat.size;

    for (const [name, limit] of Object.entries(BUDGETS)) {
      if (file.startsWith(name + '-') && size > limit) {
        errors.push({ file, size, limit, name });
      }
    }

    // Optional: set a global hard ceiling for any single JS file
    const GLOBAL_LIMIT = 600 * 1024; // 600 KB
    if (/\.js$/i.test(file) && size > GLOBAL_LIMIT) {
      errors.push({ file, size, limit: GLOBAL_LIMIT, name: 'global' });
    }

    results.push({ file, size });
  }

  if (errors.length) {
    console.error('Bundle budget exceeded for:');
    for (const e of errors) {
      console.error(` - ${e.file} (${(e.size/1024).toFixed(1)} KB) > ${(e.limit/1024).toFixed(1)} KB [${e.name}]`);
    }
    process.exit(1);
  } else {
    console.log('Bundle budgets OK');
    for (const r of results.sort((a,b)=>b.size-a.size).slice(0, 20)) {
      console.log(` - ${r.file} ${(r.size/1024).toFixed(1)} KB`);
    }
  }
}

try {
  checkBudgets();
} catch (err) {
  console.error('Error running bundle budget check:', err?.message || err);
  // Fail closed in CI
  process.exit(1);
}
