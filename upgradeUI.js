const fs = require('fs');

let content = fs.readFileSync('frontend/pages/admin-dashboard.js', 'utf8');

// 1. Add preview listener
if (!content.includes('attachPreviewListener')) {
  const previewLogic = `  const attachPreviewListener = (fileId, previewContainerId, previewImgId) => {
    const fileInput = document.getElementById(fileId);
    if (!fileInput) return;
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        document.getElementById(previewImgId).src = URL.createObjectURL(file);
        document.getElementById(previewContainerId).style.display = 'block';
      }
    });
  };\n`;
  content = content.replace('  // Active module state', previewLogic + '\n  // Active module state');
}

// 2. Refactor Courses
content = content.replace(
  /<div class="form-group">\s*<label class="form-label label">Thumbnail Image URL<\/label>\s*<input type="text" id="c-thumb" class="form-input" value="\$\{data\.imageUrl \|\| '\/assets\/images\/default\.jpg'\}" \/>\s*<\/div>/,
  `<div class="form-group">
      <label class="form-label label">Upload Course Image</label>
      <input type="file" id="c-file" accept="image/*" class="form-input" />
      <div id="c-preview-container" class="mt-2" style="display: \${data.imageUrl ? 'block' : 'none'};">
        <img id="c-preview" src="\${data.imageUrl || ''}" style="max-height: 100px; border-radius: 8px; border: 1px solid var(--border-color);" />
      </div>
    </div>`
);

// Course Add
content = content.replace(
  /const payload = \{\s*title: document\.getElementById\('c-title'\)\.value,\s*category: document\.getElementById\('c-category'\)\.value,\s*description: document\.getElementById\('c-desc'\)\.value,\s*totalDuration: parseInt\(document\.getElementById\('c-duration'\)\.value\),\s*price: parseFloat\(document\.getElementById\('c-price'\)\.value\),\s*level: document\.getElementById\('c-level'\)\.value,\s*imageUrl: document\.getElementById\('c-thumb'\)\.value,\s*isPublished: document\.getElementById\('c-published'\)\.checked\s*\};\s*await Api\.post\('\/courses', payload\);/g,
  `const formData = new FormData();
      formData.append('title', document.getElementById('c-title').value);
      formData.append('category', document.getElementById('c-category').value);
      formData.append('description', document.getElementById('c-desc').value);
      formData.append('totalDuration', document.getElementById('c-duration').value);
      formData.append('price', document.getElementById('c-price').value);
      formData.append('level', document.getElementById('c-level').value);
      formData.append('isPublished', document.getElementById('c-published').checked);
      const fileInput = document.getElementById('c-file');
      if (fileInput.files[0]) formData.append('image', fileInput.files[0]);
      
      await Api.post('/courses', formData);`
);

// Course Edit
content = content.replace(
  /const payload = \{\s*title: document\.getElementById\('c-title'\)\.value,\s*category: document\.getElementById\('c-category'\)\.value,\s*description: document\.getElementById\('c-desc'\)\.value,\s*totalDuration: parseInt\(document\.getElementById\('c-duration'\)\.value\),\s*price: parseFloat\(document\.getElementById\('c-price'\)\.value\),\s*level: document\.getElementById\('c-level'\)\.value,\s*imageUrl: document\.getElementById\('c-thumb'\)\.value,\s*isPublished: document\.getElementById\('c-published'\)\.checked\s*\};\s*await Api\.patch\(\`\/courses\/\$\{id\}\`, payload\);/g,
  `const formData = new FormData();
      formData.append('title', document.getElementById('c-title').value);
      formData.append('category', document.getElementById('c-category').value);
      formData.append('description', document.getElementById('c-desc').value);
      formData.append('totalDuration', document.getElementById('c-duration').value);
      formData.append('price', document.getElementById('c-price').value);
      formData.append('level', document.getElementById('c-level').value);
      formData.append('isPublished', document.getElementById('c-published').checked);
      const fileInput = document.getElementById('c-file');
      if (fileInput.files[0]) formData.append('image', fileInput.files[0]);

      await Api.patch(\`/courses/\${id}\`, formData);`
);

// Attach previews for course
content = content.replace(
  /openModalDialog\('Add Course', getCourseFields\(\), async \(\) => \{/g,
  `openModalDialog('Add Course', getCourseFields(), async () => {`
);
content = content.replace(
  /triggerAddCourse = \(\) => \{\s*openModalDialog\('Add Course'/g,
  `triggerAddCourse = () => {
    openModalDialog('Add Course'`
);
// To be safe we just add the attachPreviewListener before the modal opens, wait! modal elements don't exist until AFTER openModalDialog. 
// We should attach it inside a setTimeout or modify openModalDialog.
