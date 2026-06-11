'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Review Model
 *  backend/models/Review.js
 * ============================================================
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    course: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'Course',
      required: [true, 'Course reference is required.'],
    },
    student: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'User',
      required: [true, 'Student reference is required.'],
    },
    rating: {
      type    : Number,
      required: [true, 'Rating is required.'],
      min     : [1, 'Rating must be at least 1.'],
      max     : [5, 'Rating cannot exceed 5.'],
    },
    title: {
      type     : String,
      trim     : true,
      maxlength: [100, 'Review title cannot exceed 100 characters.'],
    },
    body: {
      type     : String,
      required : [true, 'Review body is required.'],
      maxlength: [1000, 'Review cannot exceed 1000 characters.'],
    },
    isVerifiedPurchase: { type: Boolean, default: false },
    helpfulVotes      : { type: Number, default: 0 },
    isPublished       : { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ── One review per student per course ────────────────────────
reviewSchema.index({ course: 1, student: 1 }, { unique: true });
reviewSchema.index({ course: 1, rating: -1 });

// ── Static: recalculate course average rating ─────────────────
reviewSchema.statics.calcAverageRating = async function (courseId) {
  const stats = await this.aggregate([
    { $match: { course: courseId, isPublished: true } },
    {
      $group: {
        _id          : '$course',
        reviewCount  : { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  const Course = mongoose.model('Course');
  if (stats.length > 0) {
    await Course.findByIdAndUpdate(courseId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount  : stats[0].reviewCount,
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      averageRating: 0,
      reviewCount  : 0,
    });
  }
};

// ── Hooks: auto-update course stats ──────────────────────────
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.course);
});

reviewSchema.post('deleteOne', { document: true, query: false }, function () {
  this.constructor.calcAverageRating(this.course);
});

module.exports = mongoose.model('Review', reviewSchema);
