'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Setting Model
 *  backend/models/Setting.js
 * ============================================================
 */

const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, 'Settings key is required.'],
      unique: true,
      trim: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed
    },
    publicId: {
      type: String
    },
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
