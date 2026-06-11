'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Course Model
 *  backend/models/Course.js
 * ============================================================
 */

const mongoose = require('mongoose');
const { COURSE_LEVELS, COURSE_CATEGORIES } = require('../config/constants');

const courseSchema = new mongoose.Schema(
  {
    // ── Core Info ─────────────────────────────────────────
    title: {
      type     : String,
      required : [true, 'Course title is required.'],
      trim     : true,
      unique   : true,
      maxlength: [120, 'Title cannot exceed 120 characters.'],
    },
    slug: {
      type  : String,
      unique: true,
      lowercase: true,
    },
    description: {
      type     : String,
      required : [true, 'Course description is required.'],
      maxlength: [2000, 'Description cannot exceed 2000 characters.'],
    },
    shortDescription: {
      type     : String,
      maxlength: [200, 'Short description cannot exceed 200 characters.'],
    },

    // ── Categorisation ────────────────────────────────────
    category: {
      type    : String,
      required: [true, 'Category is required.'],
      enum    : COURSE_CATEGORIES,
    },
    level: {
      type    : String,
      required: [true, 'Level is required.'],
      enum    : Object.values(COURSE_LEVELS),
      default : COURSE_LEVELS.BEGINNER,
    },
    tags: [{ type: String, lowercase: true, trim: true }],

    // ── Instructor ────────────────────────────────────────
    instructor: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'User',
      required: [true, 'Instructor is required.'],
    },

    // ── Pricing ───────────────────────────────────────────
    price: {
      type   : Number,
      required: [true, 'Price is required.'],
      min    : [0, 'Price cannot be negative.'],
    },
    discountPrice: {
      type     : Number,
      validate : {
        validator(v) { return v == null || v < this.price; },
        message  : 'Discount price must be less than the original price.',
      },
    },
    isFree: { type: Boolean, default: false },

    // ── Media ─────────────────────────────────────────────
    thumbnail : { type: String, default: 'default-course.webp' },
    previewVideo: { type: String, default: '' },

    // ── Content ───────────────────────────────────────────
    lessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
    ],
    totalLessons  : { type: Number, default: 0 },
    totalDuration : { type: Number, default: 0 }, // minutes
    requirements  : [String],
    whatYouLearn  : [String],
    targetAudience: [String],

    // ── Stats ─────────────────────────────────────────────
    enrollmentCount: { type: Number, default: 0 },
    averageRating  : { type: Number, default: 0, min: 0, max: 5 },
    reviewCount    : { type: Number, default: 0 },

    // ── Status ────────────────────────────────────────────
    isPublished: { type: Boolean, default: false },
    publishedAt : Date,
    isFeatured  : { type: Boolean, default: false },
    language    : { type: String, default: 'English' },
  },
  {
    timestamps: true,
    toJSON    : { virtuals: true },
    toObject  : { virtuals: true },
  }
);

// ── Indexes ──────────────────────────────────────────────────
courseSchema.index({ slug: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ isPublished: 1, isFeatured: 1 });
courseSchema.index({ averageRating: -1 });

// ── Virtual: effective price ──────────────────────────────────
courseSchema.virtual('effectivePrice').get(function () {
  return this.isFree ? 0 : (this.discountPrice ?? this.price);
});

// ── Pre-save: auto-generate slug ──────────────────────────────
courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
