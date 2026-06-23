require('dotenv').config();
const cloudinary = require('./backend/config/cloudinary');

async function run() {
  try {
    const result = await cloudinary.uploader.upload(
      'C:\\Users\\LOKII_1526\\.gemini\\antigravity-ide\\brain\\af443ecb-40d1-4dec-8a91-176e32caf916\\media__1782194773151.jpg',
      {
        folder: 'keyboardist-academy/assets',
        public_id: 'login_bg_image',
        overwrite: true
      }
    );
    console.log('UPLOAD_SUCCESS:' + result.secure_url);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
