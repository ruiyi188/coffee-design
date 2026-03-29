#!/usr/bin/env node

/**
 * check-links.mjs — Dead link checker for Coffee Design
 * 
 * Scans all HTML files, extracts internal href/src links,
 * verifies each target file exists on disk.
 * 
 * Usage:  node scripts/check-links.mjs
 * Exit:   0 = all links OK, 1 = dead links found
 * 
 * @version 1.1.0
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXTENSIONS = ['.html'];
const IGNORE_PREFIXES = ['http', 'https', 'mailto:', 'tel:', 'javascript:', '#', 'data:'];

let totalLinks = 0;
let deadLinks = [];
let checkedFiles = 0;

// Collect all HTML files
function findHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue;
      results = results.concat(findHtmlFiles(fullPath));
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

// Extract href and src attributes from HTML
function extractLinks(html) {
  const links = [];
  // Match href="..." and src="..." (not external, not anchors)
  const regex = /(?:href|src)="([^"]*?)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

// Check if a link target is an internal file and exists
function isInternal(link) {
  for (const prefix of IGNORE_PREFIXES) {
    if (link.startsWith(prefix)) return false;
  }
  // Skip empty
  if (!link || link === '') return false;
  return true;
}

// Main
function main() {
  console.log('🔗 Coffee Design — Link Checker v1.1.0');
  console.log('=' .repeat(50));
  console.log('Root:', ROOT);
  console.log('');

  const htmlFiles = findHtmlFiles(ROOT);
  console.log(`Found ${htmlFiles.length} HTML files\n`);

  for (const filePath of htmlFiles) {
    const relFile = path.relative(ROOT, filePath);
    const fileDir = path.dirname(filePath);
    const html = fs.readFileSync(filePath, 'utf-8');
    const links = extractLinks(html);
    checkedFiles++;

    for (const link of links) {
      if (!isInternal(link)) continue;
      totalLinks++;

      // Resolve the link relative to the file's directory
      // Strip query strings and anchors
      const cleanLink = link.split('?')[0].split('#')[0];
      if (!cleanLink) continue;

      const targetPath = path.resolve(fileDir, cleanLink);

      if (!fs.existsSync(targetPath)) {
        deadLinks.push({
          file: relFile,
          link: link,
          resolved: path.relative(ROOT, targetPath)
        });
      }
    }
  }

  // Report
  console.log('─'.repeat(50));
  console.log(`📄 Files scanned:    ${checkedFiles}`);
  console.log(`🔗 Internal links:   ${totalLinks}`);
  console.log(`❌ Dead links:       ${deadLinks.length}`);
  console.log('─'.repeat(50));

  if (deadLinks.length > 0) {
    console.log('\n⚠️  Dead Links Report:\n');
    deadLinks.forEach(function(d, i) {
      console.log(`  ${i + 1}. [${d.file}]`);
      console.log(`     href="${d.link}"`);
      console.log(`     → resolved: ${d.resolved}`);
      console.log('');
    });
    console.log(`\n❌ FAILED: ${deadLinks.length} dead link(s) found.`);
    process.exit(1);
  } else {
    console.log('\n✅ PASSED: All internal links are valid.\n');
    process.exit(0);
  }
}

main();
