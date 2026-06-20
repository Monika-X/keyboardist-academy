const fs = require('fs');
let c = fs.readFileSync('frontend/pages/admin-dashboard.js', 'utf8');

c = c.replace(/section--glow/g, '');
c = c.replace(/bg-glass/g, 'bg-overlay');
c = c.replace(/bg-tinted/g, 'bg-overlay');
c = c.replace(/var\(--surface-0\)/g, 'var(--bg-base)');
c = c.replace(/hover:bg-glass/g, 'hover:bg-overlay hover:border-violet');
c = c.replace(/class="border-bottom text-tertiary"/g, 'class="border-bottom text-secondary text-xs uppercase font-bold tracking-wider"');
c = c.replace(/<tr class="border-bottom(.*?)>/g, '<tr class="border-bottom transition-all hover:bg-overlay"$1>');
c = c.replace(/class="form-input"/g, 'class="form-input admin-input"');
c = c.replace(/class="form-input admin-input w-full"/g, 'class="form-input admin-input w-full"'); // just in case

// Inject custom styles inside renderLayout
const styleBlock = `
      <style>
        .admin-input {
          background-color: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text-primary);
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        .admin-input:focus {
          outline: none;
          border-color: var(--violet) !important;
          background-color: rgba(255, 255, 255, 0.04) !important;
        }
        .admin-sidebar-nav button.btn--primary {
          background: var(--violet) !important;
          color: white !important;
        }
        .upload-preview-container {
          border: 1px dashed rgba(255,255,255,0.1);
          padding: 8px;
          border-radius: 12px;
          background: rgba(0,0,0,0.2);
        }
        .admin-stat-card {
          border-left: 2px solid transparent;
        }
        .admin-stat-card:hover {
          border-left-color: var(--violet);
        }
      </style>
      <section class="section"`;

c = c.replace(/<section class="section"/, styleBlock);

// Upgrade statistics cards
c = c.replace(/class="card p-6 border bg-overlay flex col gap-2 hover:scale transition-transform"/g, 'class="card p-6 border-subtle bg-overlay flex col gap-2 hover:scale transition-transform admin-stat-card" style="border-radius: var(--radius-md); box-shadow: var(--shadow-sm);"');

// Enhance Image upload previews
c = c.replace(/style="max-height: 100px; border-radius: 8px; border: 1px solid var\(--border-color\);"/g, 'style="max-height: 120px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1); object-fit: cover; width: 100%;" class="upload-preview-container"');

fs.writeFileSync('frontend/pages/admin-dashboard.js', c);
