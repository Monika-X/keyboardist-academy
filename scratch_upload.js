require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('./backend/config/cloudinary');
const Course = require('./backend/models/Course');
const path = require('path');

const uploads = [
  {
    file: path.join(__dirname, 'frontend/assets/images/fundamentals.jpg'),
    title: 'Piano Fundamentals: Beginner to Masterclass',
    featured: true
  },
  {
    file: path.join(__dirname, 'frontend/assets/images/advanced.jpg'),
    title: 'Advanced Classical Virtuoso: Chopin & Liszt Technique',
    featured: true
  },
  {
    file: path.join(__dirname, 'frontend/assets/images/theory.jpg'),
    title: 'Sight Reading & Essential Music Theory',
    featured: true
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Reset featured for all courses first
    await Course.updateMany({}, { isFeatured: false });

    for (const item of uploads) {
      console.log(`Uploading ${item.file}...`);
      const result = await cloudinary.uploader.upload(item.file, {
        folder: 'keyboardist-academy/courses',
        use_filename: true,
        unique_filename: false
      });
      console.log(`Uploaded to Cloudinary: ${result.secure_url}`);

      const course = await Course.findOneAndUpdate(
        { title: item.title },
        { 
          imageUrl: result.secure_url,
          publicId: result.public_id,
          isFeatured: item.featured
        },
        { new: true }
      );
      if (course) {
        console.log(`Updated course: ${course.title} (Featured: ${course.isFeatured})`);
      } else {
        console.log(`Course NOT FOUND: ${item.title}`);
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
