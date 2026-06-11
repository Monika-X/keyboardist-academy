'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Portfolio Model
 *  backend/models/Portfolio.js
 * ============================================================
 */

const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Portfolio title is required.'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Portfolio description is required.']
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required.'],
      trim: true
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required.'],
      trim: true
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required.']
    },
    thumbnail: {
      type: String,
      default: 'default-portfolio.webp'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
