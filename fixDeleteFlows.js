const fs = require('fs');
const path = require('path');

const controllers = ['courseController', 'facultyController', 'galleryController', 'portfolioController', 'eventController', 'testimonialController', 'userController', 'settingController'];

controllers.forEach(ctrl => {
  const file = path.join(__dirname, 'backend/controllers', ctrl + '.js');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // For 7 controllers with deleteOne()
    const deleteRegex = /if\s*\(\s*(\w+)\.publicId\s*\)\s*\{\s*await\s+cloudinaryService\.deleteImage\(\1\.publicId\);\s*\}\s*await\s+\1\.deleteOne\(\);/g;
    
    content = content.replace(deleteRegex, 
`const publicIdToDelete = $1.publicId;
  await $1.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }`);

    // For userController deleteMe()
    const deleteMeRegex = /if\s*\(\s*user\s*&&\s*user\.publicId\s*\)\s*\{\s*await\s+cloudinaryService\.deleteImage\(user\.publicId\);\s*\}\s*await\s+User\.findByIdAndUpdate\(\s*req\.user\.id\s*,\s*\{\s*isActive:\s*false\s*,\s*publicId:\s*null\s*,\s*imageUrl:\s*'default-avatar\.webp'\s*\}\s*\);/g;
    
    content = content.replace(deleteMeRegex, 
`const publicIdToDelete = user ? user.publicId : null;
  await User.findByIdAndUpdate(req.user.id, { isActive: false, publicId: null, imageUrl: 'default-avatar.webp' });
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }`);

    fs.writeFileSync(file, content);
  }
});

console.log('Delete flows fixed.');
