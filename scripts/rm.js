#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Get directories from command line arguments
const dirs = process.argv.slice(2);

if (dirs.length === 0) {
  console.error("Usage: node scripts/rm.js <dir1> [dir2] ...");
  process.exit(1);
}

dirs.forEach((dir) => {
  const targetPath = path.resolve(process.cwd(), dir);
  if (fs.existsSync(targetPath)) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
    } catch (error) {
      console.error(`Error removing ${dir}:`, error.message);
      process.exit(1);
    }
  }
});
