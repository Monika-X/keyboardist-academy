const fs = require('fs');

let css = fs.readFileSync('frontend/style.css', 'utf8');

// Upgrade form-input
css = css.replace(/\.form-input\s*\{[^}]+\}/, `.form-input {
  display      : flex;
  align-items  : center;
  width        : 100%;
  height       : 54px;
  padding      : 14px 16px;
  background-color: rgba(255, 255, 255, 0.02);
  border       : 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  color        : var(--text-primary);
  font-family  : var(--font-body);
  transition   : border-color 0.3s ease, background-color 0.3s ease;
}`);

// Upgrade form-input:focus
css = css.replace(/\.form-input:focus\s*\{[^}]+\}/, `.form-input:focus {
  outline      : none;
  border-color : var(--violet);
  background-color: rgba(255, 255, 255, 0.04);
}`);

// Upgrade form-textarea
css = css.replace(/\.form-textarea\s*\{[^}]+\}/, `.form-textarea {
  display      : block;
  width        : 100%;
  padding      : 14px 16px;
  background-color: rgba(255, 255, 255, 0.02);
  border       : 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  color        : var(--text-primary);
  font-family  : var(--font-body);
  resize       : vertical;
  min-height   : 120px;
  transition   : border-color 0.3s ease, background-color 0.3s ease;
}`);

// Upgrade form-textarea:focus
css = css.replace(/\.form-textarea:focus\s*\{[^}]+\}/, `.form-textarea:focus {
  outline      : none;
  border-color : var(--violet);
  background-color: rgba(255, 255, 255, 0.04);
}`);

// Ensure grids collapse on mobile (< 768px)
const mobileGridFix = `
@media (max-width: 767px) {
  .grid-2, .grid-3, .grid-4, .grid-5 {
    grid-template-columns: 1fr !important;
  }
}
`;

if (!css.includes('.grid-2, .grid-3, .grid-4, .grid-5')) {
  css += '\\n' + mobileGridFix;
}

fs.writeFileSync('frontend/style.css', css);
