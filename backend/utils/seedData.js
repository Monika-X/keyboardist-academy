'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Database Seeder
 *  backend/utils/seedData.js
 * ============================================================
 *  Usage: node backend/utils/seedData.js
 * ============================================================
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Models
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is undefined.');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected for seeding...');
};

const seedData = async () => {
  try {
    // 1. Connect
    await connectDB();

    // 2. Clear existing data
    console.log('Cleaning existing collections...');
    await User.deleteMany();
    await Course.deleteMany();
    await Lesson.deleteMany();
    await Enrollment.deleteMany();
    await Review.deleteMany();
    console.log('Collections cleared.');

    // 3. Create Default Instructor/Admin
    console.log('Creating instructor/admin user...');
    const instructor = await User.create({
      firstName: 'Agilan',
      lastName: 'Musiq',
      email: 'admin@keyboardist.academy',
      password: 'AdminPass123!',
      role: 'admin',
      isEmailVerified: true,
      bio: 'Renowned concert pianist and composer. Passionate about bringing world-class piano training to students worldwide.',
      expertise: ['Classical Piano', 'Music Theory', 'Improvisation'],
      yearsOfExp: 15,
      qualifications: ['Master of Music in Piano Performance - Juilliard'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
    console.log(`Instructor created: ${instructor.fullName} (${instructor.email})`);

    // 4. Define Courses
    console.log('Defining courses...');
    const coursesData = [
      {
        title: 'Piano Fundamentals: Beginner to Masterclass',
        description: 'Establish a rock-solid foundation in piano performance. Learn correct posture, basic scales, reading sheet music, and playing your very first elegant classical songs. This course is perfectly designed for absolute beginners who have never touched a keyboard before.',
        shortDescription: 'Your ultimate starting point. Learn piano posture, basic notation, scales, and simple melodies.',
        category: 'Classical Piano',
        level: 'beginner',
        price: 0,
        isFree: true,
        isPublished: true,
        isFeatured: true,
        instructor: instructor._id,
        requirements: ['Any 61-key or 88-key keyboard/piano', 'No prior music knowledge required'],
        whatYouLearn: [
          'Proper hand posture and seating position',
          'Read treble and bass clef sheet music',
          'Play primary major scales (C, G, F)',
          'Perform classic songs like Ode to Joy and Für Elise (Simplified)',
        ],
        targetAudience: ['Absolute beginners', 'Self-taught piano players looking for structure'],
        tags: ['piano', 'beginner', 'classical', 'basics'],
      },
      {
        title: 'Jazz Keyboard & Modern Improvisation',
        description: 'Unlock the secrets of jazz harmony and spontaneous creation. Discover secondary dominants, 2-5-1 chord progressions, pentatonic scales, blue notes, and the art of jazz phrasing. Designed for intermediate players ready to break away from sheet music.',
        shortDescription: 'Master jazz chords, swing rhythms, and the art of improvising piano solos.',
        category: 'Jazz Keyboard',
        level: 'intermediate',
        price: 49.99,
        isPublished: true,
        isFeatured: true,
        instructor: instructor._id,
        requirements: ['Basic understanding of major scales', 'Able to play basic chords with two hands'],
        whatYouLearn: [
          'Extended chord voicings (7ths, 9ths, 11ths)',
          'The 2-5-1 progression in multiple keys',
          'How to improvise using jazz scales and modes',
          'Accompanying vocalists or other soloists',
        ],
        targetAudience: ['Intermediate classical pianists wanting to learn jazz', 'Modern keyboard players'],
        tags: ['jazz', 'improvisation', 'chords', 'modern'],
      },
      {
        title: 'Sight Reading & Essential Music Theory',
        description: 'Demystify sheet music instantly. Learn how to instantly recognize intervals, complex time signatures, dynamic markers, and keys. Develop the brain-to-hand motor connection to sight-read piano pieces on the first attempt.',
        shortDescription: 'Read sheet music faster and grasp the core mechanics behind beautiful arrangements.',
        category: 'Music Theory',
        level: 'beginner',
        price: 29.99,
        isPublished: true,
        isFeatured: false,
        instructor: instructor._id,
        requirements: ['A piano or keyboard', 'Basic recognition of piano keys'],
        whatYouLearn: [
          'Recognize key signatures instantly',
          'Understand complex rhythms, syncopations, and triplets',
          'Master interval recognition techniques',
          'Practical daily sight reading exercises',
        ],
        targetAudience: ['Musicians looking to improve score reading', 'Piano students preparing for exams'],
        tags: ['theory', 'sight-reading', 'notation', 'exercises'],
      },
      {
        title: 'Advanced Classical Virtuoso: Chopin & Liszt Technique',
        description: 'Push your piano playing to the absolute limit. Tackle virtuosic techniques including polyrhythms, rapid arpeggios, octave leaps, and expressiveness. We study masterpieces by Chopin, Liszt, and Rachmaninoff in extreme depth.',
        shortDescription: 'Build elite finger independence, speed, and deep emotional expressiveness.',
        category: 'Classical Piano',
        level: 'advanced',
        price: 99.99,
        isPublished: true,
        isFeatured: true,
        instructor: instructor._id,
        requirements: ['At least 3-4 years of piano experience', 'Able to play scales at high tempos'],
        whatYouLearn: [
          'Develop finger strength, flexibility, and high-speed dexterity',
          'Interpret complex rubato and dynamic expression',
          'Tackle polyrhythmic challenges (3 against 4, etc.)',
          'Advanced performance practice and memorization tips',
        ],
        targetAudience: ['Advanced students', 'Professional pianists looking for expert coaching'],
        tags: ['advanced', 'classical', 'chopin', 'technique'],
      },
    ];

    const courses = [];
    for (const cData of coursesData) {
      const course = await Course.create(cData);
      courses.push(course);
      console.log(`Course created: ${course.title} (Slug: ${course.slug})`);
    }

    // 5. Add Lessons
    console.log('Adding lessons for each course...');
    const lessonsData = {
      [courses[0]._id]: [
        {
          title: 'Introduction to the Piano Keyboard',
          order: 1,
          section: 'Getting Started',
          description: 'Familiarize yourself with the layout of black and white keys, identify middle C, and understand octave groups.',
          videoDuration: 320,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: true,
          isPublished: true,
        },
        {
          title: 'Correct Seating & Hand Posture',
          order: 2,
          section: 'Getting Started',
          description: 'Avoid injuries and play with fluid speed by perfecting your posture, bench height, and curved fingers.',
          videoDuration: 410,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: true,
          isPublished: true,
        },
        {
          title: 'Understanding the Staff & Clefs',
          order: 3,
          section: 'Basic Notation',
          description: 'A friendly introduction to reading notes on the Treble Clef and Bass Clef staffs.',
          videoDuration: 580,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
        {
          title: 'Playing Your First Major Scale (C Major)',
          order: 4,
          section: 'Hands-on Playing',
          description: 'Master the correct fingering (1-2-3 thumb tuck to 1-2-3-4-5) for C Major in the right hand.',
          videoDuration: 640,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
      ],
      [courses[1]._id]: [
        {
          title: 'The Swing Feel & Basic Seventh Chords',
          order: 1,
          section: 'Jazz Basics',
          description: 'Understand how jazz timing differs from classical. Learn major, minor, and dominant 7th chords.',
          videoDuration: 490,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: true,
          isPublished: true,
        },
        {
          title: 'The Golden 2-5-1 Progression',
          order: 2,
          section: 'Jazz Harmony',
          description: 'Explore the most critical progression in jazz music. Learn standard shell voicings.',
          videoDuration: 720,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
        {
          title: 'Introducing the Blues Scale & Improvisation',
          order: 3,
          section: 'Improvisation',
          description: 'Learn to improvise beautiful, expressive melodies over a swing backing track.',
          videoDuration: 850,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
      ],
      [courses[2]._id]: [
        {
          title: 'The Science of Reading Intervals',
          order: 1,
          section: 'Sight Reading',
          description: 'Read intervals instead of single notes to immediately double your reading speed.',
          videoDuration: 420,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: true,
          isPublished: true,
        },
        {
          title: 'Decoding Key Signatures',
          order: 2,
          section: 'Music Theory',
          description: 'The circle of fifths made easy. Learn sharps, flats, and keys.',
          videoDuration: 550,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
      ],
      [courses[3]._id]: [
        {
          title: 'Chopin Finger Independence Exercises',
          order: 1,
          section: 'Technique Builder',
          description: 'Use Chopins custom finger training to achieve absolute control over weak fingers like 4 and 5.',
          videoDuration: 900,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: true,
          isPublished: true,
        },
        {
          title: 'Mastering the Polyrhythm: 3 Against 2 and 4 Against 3',
          order: 2,
          section: 'Polyrhythms',
          description: 'Learn how to subdivide and feel independent tempos in each hand without losing alignment.',
          videoDuration: 1100,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          isFree: false,
          isPublished: true,
        },
      ],
    };

    for (const courseId of Object.keys(lessonsData)) {
      const lessonsList = lessonsData[courseId];
      const lessonIds = [];
      let totalDurationSeconds = 0;

      for (const lData of lessonsList) {
        const lesson = await Lesson.create({ ...lData, course: courseId });
        lessonIds.push(lesson._id);
        totalDurationSeconds += lesson.videoDuration;
      }

      await Course.findByIdAndUpdate(courseId, {
        lessons: lessonIds,
        totalLessons: lessonIds.length,
        totalDuration: Math.round(totalDurationSeconds / 60),
      });

      console.log(`Added ${lessonIds.length} lessons to Course ID: ${courseId}`);
    }

    // 6. Create Reviews
    console.log('Generating sample reviews...');
    const reviewer = await User.create({
      firstName: 'Johann',
      lastName: 'Bach',
      email: 'student@keyboardist.academy',
      password: 'StudentPass123!',
      role: 'student',
      isEmailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    });

    await Review.create({
      course: courses[0]._id,
      student: reviewer._id,
      rating: 5,
      title: 'Amazing course!',
      body: 'Excellent structure! I went from zero to playing basic classical melodies in just a couple of weeks.',
    });

    await Review.create({
      course: courses[1]._id,
      student: reviewer._id,
      rating: 5,
      title: 'Highly recommended!',
      body: 'The explanation of 2-5-1 shell voicings is worth the price alone. Highly recommended!',
    });

    // Update rating stats
    await Course.findByIdAndUpdate(courses[0]._id, { averageRating: 5.0, reviewCount: 1 });
    await Course.findByIdAndUpdate(courses[1]._id, { averageRating: 5.0, reviewCount: 1 });

    console.log('\n✅ Database successfully seeded!');
    console.log('---------------------------------------------------------');
    console.log(`Admin/Instructor: admin@keyboardist.academy / AdminPass123!`);
    console.log(`Student:          student@keyboardist.academy / StudentPass123!`);
    console.log('---------------------------------------------------------\n');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
