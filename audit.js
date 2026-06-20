const fs = require('fs');

const files = fs.readdirSync('frontend/pages').filter(f => f.endsWith('.js'));
let issues = {
  glassmorphism: [],
  noLazyLoad: 0,
  hardcodedColors: [],
  inlineStyles: 0,
};

files.forEach(f => {
  const content = fs.readFileSync('frontend/pages/' + f, 'utf8');
  
  if (content.includes('section--glow') || content.includes('bg-glass')) {
    issues.glassmorphism.push(f);
  }
  
  const imgs = content.match(/<img[^>]+>/g) || [];
  imgs.forEach(img => {
    if (!img.includes('loading="lazy"')) issues.noLazyLoad++;
  });

  const styles = content.match(/style="([^"]+)"/g) || [];
  issues.inlineStyles += styles.length;
});

console.log("Audit Results:");
console.log(JSON.stringify(issues, null, 2));
