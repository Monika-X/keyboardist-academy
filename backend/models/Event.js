'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Event Model
 *  backend/models/Event.js
 * ============================================================
 */

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required.'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required.']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required.']
    },
    time: {
      type: String,
      required: [true, 'Event time is required.']
    },
    location: {
      type: String,
      required: [true, 'Event location is required.'],
      trim: true
    },
    image: {
      type: String,
      default: 'default-event.webp'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
