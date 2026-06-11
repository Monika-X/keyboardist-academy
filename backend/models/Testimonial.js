'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Testimonial Model
 *  backend/models/Testimonial.js
 * ============================================================
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Reviewer name is required.'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Reviewer designation/role is required.'],
      trim: true
    },
    text: {
      type: String,
      required: [true, 'Testimonial feedback text is required.']
    },
    avatar: {
      type: String,
      default: 'default-avatar.webp'
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1.'],
      max: [5, 'Rating cannot exceed 5.'],
      default: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
