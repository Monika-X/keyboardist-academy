'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose Enrollment Model
 *  backend/models/Enrollment.js
 * ============================================================
 */

const mongoose = require('mongoose');
const { ENROLLMENT_STATUS, PAYMENT_STATUS } = require('../config/constants');

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'User',
      required: [true, 'Student reference is required.'],
    },
    course: {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : 'Course',
      required: [true, 'Course reference is required.'],
    },

    // ── Progress ──────────────────────────────────────────
    completedLessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
    ],
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    lastAccessedAt  : Date,
    completedAt     : Date,

    // ── Payment ───────────────────────────────────────────
    amountPaid    : { type: Number, required: true, min: 0 },
    paymentStatus : {
      type   : String,
      enum   : Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    paymentMethod : { type: String, default: 'card' },
    transactionId : { type: String, default: '' },

    // ── Enrollment State ──────────────────────────────────
    status: {
      type   : String,
      enum   : Object.values(ENROLLMENT_STATUS),
      default: ENROLLMENT_STATUS.ACTIVE,
    },
    certificateIssued  : { type: Boolean, default: false },
    certificateIssuedAt: Date,
  },
  {
    timestamps: true,
    toJSON    : { virtuals: true },
    toObject  : { virtuals: true },
  }
);

// ── Prevent duplicate enrollments ──────────────────────────────
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ student: 1, status: 1 });
enrollmentSchema.index({ course: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
