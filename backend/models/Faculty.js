'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Faculty Model
 *  backend/models/Faculty.js
 * ============================================================
 */

const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is required.'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Faculty designation/role is required.'],
      trim: true
    },
    bio: {
      type: String,
      required: [true, 'Bio is required.']
    },
    imageUrl: {
      type: String,
      default: 'default-faculty.webp'
    },
    publicId: {
      type: String
    },
    education: {
      type: [String],
      default: []
    },
    specialties: {
      type: [String],
      default: []
    },
    yearsOfExp: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
