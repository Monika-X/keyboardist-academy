'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Contact Routes
 *  backend/routes/contactRoutes.js
 * ============================================================
 */

const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();

const contactCtrl = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required.').isLength({ max: 2000 }),
];

// ── Public ────────────────────────────────────────────────────
router.post('/', contactRules, validate, contactCtrl.submitContact);

// ── Admin only ────────────────────────────────────────────────
router.use(protect, authorize('admin'));
router.get('/',           contactCtrl.getAllMessages);
router.patch('/:id/read', contactCtrl.markAsRead);
router.delete('/:id',      contactCtrl.deleteMessage);

module.exports = router;
