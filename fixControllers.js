const fs = require('fs');
const path = require('path');

const controllers = ['courseController', 'facultyController', 'galleryController', 'portfolioController', 'eventController', 'testimonialController', 'userController', 'settingController'];

controllers.forEach(ctrl => {
  const file = path.join(__dirname, 'backend/controllers', ctrl + '.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace require
    content = content.replace(/const cloudinary = require\('\.\.\/config\/cloudinary'\);/g, "const cloudinaryService = require('../services/cloudinaryService');");
    
    // Replace cloudinary.uploader.destroy(X) with cloudinaryService.deleteImage(X)
    content = content.replace(/await cloudinary\.uploader\.destroy\((.*?)\)\.catch\(\(\) => \{\}\);/g, "await cloudinaryService.deleteImage($1);");
    
    // Fix req.body.image/thumbnail/avatar/value -> req.body.imageUrl and new uploadImage
    // But since the upload happens BEFORE, the controllers do:
    // if (req.file) { req.body.thumbnail = req.file.path; req.body.publicId = req.file.filename; }
    // We need to change that to:
    // if (req.file) { const result = await cloudinaryService.uploadImage(req.file.buffer); req.body.imageUrl = result.imageUrl; req.body.publicId = result.publicId; }
    
    content = content.replace(/if\s*\(\s*req\.file\s*\)\s*\{[\s\S]*?req\.body\.(?:thumbnail|image|imageUrl|avatar|value)\s*=\s*req\.file\.path;[\s\S]*?req\.body\.publicId\s*=\s*req\.file\.filename;[\s\S]*?\}/g, 
`if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }`);

    // Specifically for settingController: value = req.file.path -> value = uploadResult.imageUrl
    content = content.replace(/if\s*\(\s*req\.file\s*\)\s*\{[\s\S]*?value\s*=\s*req\.file\.path;[\s\S]*?publicId\s*=\s*req\.file\.filename;[\s\S]*?\}/g, 
`if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    value = uploadResult.imageUrl;
    publicId = uploadResult.publicId;
  }`);

    // Specifically for userController: filtered.avatar = req.file.path -> filtered.imageUrl = uploadResult.imageUrl
    content = content.replace(/if\s*\(\s*req\.file\s*\)\s*\{[\s\S]*?const currentUser = await User.findById\(req\.user\.id\);[\s\S]*?oldPublicId = currentUser\.publicId;[\s\S]*?filtered\.avatar\s*=\s*req\.file\.path;[\s\S]*?filtered\.publicId\s*=\s*req\.file\.filename;[\s\S]*?\}/g, 
`let oldPublicId;
  if (req.file) {
    const currentUser = await User.findById(req.user.id);
    oldPublicId = currentUser.publicId;
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    filtered.imageUrl = uploadResult.imageUrl;
    filtered.publicId = uploadResult.publicId;
  }`);

    // In deleteMe (userController): avatar: 'default-avatar.webp' -> imageUrl: 'default-avatar.webp'
    content = content.replace(/avatar:\s*'default-avatar\.webp'/g, "imageUrl: 'default-avatar.webp'");

    fs.writeFileSync(file, content);
  }
});
console.log('Controllers patched successfully.');
