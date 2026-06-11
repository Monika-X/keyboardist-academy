'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Lesson Model
 *  backend/models/Lesson.js
 * ============================================================
 */

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type     : String,
      required : [true, 'Lesson title is required.'],
      trim     : true,
      maxlength: [150, 'Title cannot exceed 150 characters.'],
    },
    course: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'Course',
      required: [true, 'Course reference is required.'],
    },
    order: {
      type    : Number,
      required: [true, 'Lesson order is required.'],
      min     : [1, 'Order must be at least 1.'],
    },
    description: {
      type     : String,
      maxlength: [1000, 'Description cannot exceed 1000 characters.'],
    },

    // ── Content ───────────────────────────────────────────
    videoUrl     : { type: String, default: '' },
    videoDuration: { type: Number, default: 0 }, // seconds
    content      : { type: String, default: '' }, // rich-text notes
    attachments  : [
      {
        name: String,
        url : String,
        type: { type: String, enum: ['pdf', 'mp3', 'sheet', 'zip', 'other'] },
      },
    ],

    // ── Settings ──────────────────────────────────────────
    isFree      : { type: Boolean, default: false },
    isPublished : { type: Boolean, default: false },
    section     : { type: String, default: 'Introduction' },
  },
  {
    timestamps: true,
    toJSON    : { virtuals: true },
    toObject  : { virtuals: true },
  }
);

lessonSchema.index({ course: 1, order: 1 });

// ── Virtual: human-readable duration ─────────────────────────
lessonSchema.virtual('durationFormatted').get(function () {
  const m = Math.floor(this.videoDuration / 60);
  const s = this.videoDuration % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
});

module.exports = mongoose.model('Lesson', lessonSchema);
