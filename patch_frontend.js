const fs = require('fs');

const pagesDir = 'frontend/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.js'));

let glowRemovals = 0;
let glassRemovals = 0;
let lazyAdditions = 0;
const affectedPages = new Set();

files.forEach(f => {
  const filePath = `${pagesDir}/${f}`;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove section--glow
  const glowMatches = content.match(/section--glow/g);
  if (glowMatches) {
    glowRemovals += glowMatches.length;
    content = content.replace(/section--glow/g, '');
  }

  // 2. Replace bg-glass with bg-overlay border-subtle
  const glassMatches = content.match(/bg-glass/g);
  if (glassMatches) {
    glassRemovals += glassMatches.length;
    content = content.replace(/bg-glass/g, 'bg-overlay border-subtle');
  }

  // Replace bg-tinted with bg-overlay
  content = content.replace(/bg-tinted/g, 'bg-overlay');

  // 3. Add loading="lazy" to imgs without it
  content = content.replace(/<img([^>]+)>/g, (match, attrs) => {
    if (!attrs.includes('loading=')) {
      lazyAdditions++;
      return `<img${attrs} loading="lazy">`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    affectedPages.add(f);
  }
});

console.log("Patch Results:");
console.log(`Files modified: ${affectedPages.size}`);
console.log(`Pages affected: ${Array.from(affectedPages).join(', ')}`);
console.log(`Count of section--glow removals: ${glowRemovals}`);
console.log(`Count of bg-glass removals: ${glassRemovals}`);
console.log(`Count of loading="lazy" additions: ${lazyAdditions}`);
