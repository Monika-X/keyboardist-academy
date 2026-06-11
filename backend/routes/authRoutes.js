'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Auth Routes
 *  backend/routes/authRoutes.js
 * ============================================================
 */

const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();

const auth     = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// ── Validation chains ────────────────────────────────────────
const registerRules = [
  body('firstName').trim().notEmpty().withMessage('First name is required.'),
  body('lastName').trim().notEmpty().withMessage('Last name is required.'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .matches(/(?=.*[A-Z])(?=.*[0-9])/)
    .withMessage('Password must contain at least one uppercase letter and one number.'),
];

const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// ── Public routes ─────────────────────────────────────────────
router.post('/register', registerRules, validate, auth.register);
router.post('/login',    loginRules,    validate, auth.login);
router.post('/logout',   auth.logout);
router.get ('/verify-email',     auth.verifyEmail);
router.post('/forgot-password',  auth.forgotPassword);
router.patch('/reset-password',  auth.resetPassword);

// ── Protected routes ──────────────────────────────────────────
router.use(protect);
router.get  ('/me',              auth.getMe);
router.patch('/update-password', auth.updatePassword);

module.exports = router;
