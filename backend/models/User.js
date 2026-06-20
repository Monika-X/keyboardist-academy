'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Mongoose User Model
 *  backend/models/User.js
 * ============================================================
 */

const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const crypto    = require('crypto');
const { ROLES } = require('../config/constants');

const userSchema = new mongoose.Schema(
  {
    // ── Identity ───────────────────────────────────────────
    firstName: {
      type     : String,
      required : [true, 'First name is required.'],
      trim     : true,
      maxlength: [50, 'First name cannot exceed 50 characters.'],
    },
    lastName: {
      type     : String,
      required : [true, 'Last name is required.'],
      trim     : true,
      maxlength: [50, 'Last name cannot exceed 50 characters.'],
    },
    email: {
      type     : String,
      required : [true, 'Email address is required.'],
      unique   : true,
      lowercase: true,
      trim     : true,
      match    : [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    phone: {
      type : String,
      trim : true,
      match: [/^[+]?[\d\s\-().]{7,20}$/, 'Please enter a valid phone number.'],
    },

    // ── Auth ───────────────────────────────────────────────
    password: {
      type     : String,
      required : [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters.'],
      select   : false,
    },
    role: {
      type   : String,
      enum   : Object.values(ROLES),
      default: ROLES.STUDENT,
    },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifyToken   : String,
    emailVerifyExpire  : Date,
    passwordResetToken : String,
    passwordResetExpire: Date,
    passwordChangedAt  : Date,

    // ── Profile ────────────────────────────────────────────
    imageUrl: {
      type   : String,
      default: 'default-avatar.webp',
    },
    publicId: {
      type: String,
    },
    bio: {
      type     : String,
      maxlength: [500, 'Bio cannot exceed 500 characters.'],
    },
    socialLinks: {
      youtube  : { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter  : { type: String, default: '' },
    },

    // ── Instructor fields ──────────────────────────────────
    expertise    : [String],
    yearsOfExp   : { type: Number, min: 0 },
    qualifications: [String],

    // ── Account state ──────────────────────────────────────
    isActive     : { type: Boolean, default: true },
    lastLoginAt  : Date,
    enrolledCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
  },
  {
    timestamps: true,
    toJSON    : { virtuals: true },
    toObject  : { virtuals: true },
  }
);

// ── Indexes ──────────────────────────────────────────────────
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// ── Virtuals ──────────────────────────────────────────────────
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// ── Pre-save: hash password ───────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
  next();
});

// ── Instance method: compare passwords ──────────────────────
userSchema.methods.matchPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Check if password was changed after JWT was issued.
 * @param {number} jwtIat  – JWT iat timestamp (seconds)
 */
userSchema.methods.changedPasswordAfter = function (jwtIat) {
  if (this.passwordChangedAt) {
    const changedTs = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtIat < changedTs;
  }
  return false;
};

/** Generate and hash a password-reset token. Returns the *plain* token. */
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000; // 10 min
  return resetToken;
};

/** Generate and hash an email-verification token. Returns the *plain* token. */
userSchema.methods.createEmailVerifyToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailVerifyToken  = crypto.createHash('sha256').update(token).digest('hex');
  this.emailVerifyExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 h
  return token;
};

module.exports = mongoose.model('User', userSchema);
