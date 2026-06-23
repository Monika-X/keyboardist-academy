require('dotenv').config();
const cloudinary = require('./backend/config/cloudinary');
const path = require('path');

async function run() {
  try {
    const file = path.join('C:\\Users\\LOKII_1526\\.gemini\\antigravity-ide\\brain\\8fc34c3e-a93c-4690-909d-8359c6b924d6', 'media__1782201575760.jpg');
    console.log(`Uploading ${file}...`);
    const result = await cloudinary.uploader.upload(file, {
      folder: 'keyboardist-academy/assets',
      use_filename: true,
      unique_filename: false
    });
    console.log(`Uploaded to Cloudinary: ${result.secure_url}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
