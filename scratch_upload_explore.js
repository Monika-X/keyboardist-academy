require('dotenv').config();
const cloudinary = require('./backend/config/cloudinary');
const path = require('path');

const uploads = [
  path.join(__dirname, 'frontend/assets/images/explore_traditional.jpg'),
  path.join(__dirname, 'frontend/assets/images/explore_jazz.jpg'),
  path.join(__dirname, 'frontend/assets/images/explore_virtuoso.jpg')
];

async function run() {
  try {
    for (const file of uploads) {
      console.log(`Uploading ${file} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(file, {
        folder: 'keyboardist-academy/explore',
        use_filename: true,
        unique_filename: false
      });
      console.log(`Uploaded: ${result.secure_url}`);
    }
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
