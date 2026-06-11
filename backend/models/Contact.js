'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Contact Message Model
 *  backend/models/Contact.js
 * ============================================================
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name   : { type: String, required: true, trim: true, maxlength: 100 },
    email  : {
      type    : String,
      required: true,
      lowercase: true,
      trim    : true,
      match   : [/^\S+@\S+\.\S+$/, 'Please enter a valid email.'],
    },
    phone   : { type: String, trim: true },
    subject : { type: String, required: true, trim: true, maxlength: 200 },
    message : { type: String, required: true, maxlength: 2000 },
    isRead  : { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
    repliedAt: Date,
    ipAddress: String,
  },
  { timestamps: true }
);

contactSchema.index({ isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
