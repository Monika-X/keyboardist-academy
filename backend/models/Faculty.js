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
    image: {
      type: String,
      default: 'default-faculty.webp'
    },
    education: {
      type: [String],
      default: []
    },
    specialties: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
