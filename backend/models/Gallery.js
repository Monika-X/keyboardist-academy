'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Gallery Model
 *  backend/models/Gallery.js
 * ============================================================
 */

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required.'],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required.']
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
