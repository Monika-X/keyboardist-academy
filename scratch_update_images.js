require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('./backend/config/cloudinary');
const Course = require('./backend/models/Course');
const path = require('path');

const uploads = [
  {
    file: path.join(__dirname, 'frontend/assets/images/acoustic_guitar.jpg'),
    titleRegex: /Acoustic Guitar/i
  },
  {
    file: path.join(__dirname, 'frontend/assets/images/jazz_keyboard.jpg'),
    titleRegex: /Jazz Keyboard/i
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    for (const item of uploads) {
      console.log(`Uploading ${item.file} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(item.file, {
        folder: 'keyboardist-academy/courses',
        use_filename: true,
        unique_filename: false
      });
      console.log(`Uploaded: ${result.secure_url}`);

      const course = await Course.findOneAndUpdate(
        { title: item.titleRegex },
        { 
          imageUrl: result.secure_url,
          publicId: result.public_id
        },
        { new: true }
      );
      if (course) {
        console.log(`Updated course in DB: ${course.title}`);
      } else {
        console.log(`Course not found for regex: ${item.titleRegex}`);
      }
    }

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
