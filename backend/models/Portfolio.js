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
      default: ''
    },
    imageUrl: {
      type: String,
      default: 'default-portfolio.webp'
    },
    publicId: {
      type: String
    },
    mediaPublicId: {
      type: String
    },
    type: {
      type: String,
      enum: ['image', 'video', 'audio'],
      default: 'image'
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
