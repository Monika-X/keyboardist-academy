'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — User Routes
 *  backend/routes/userRoutes.js
 * ============================================================
 */

const express = require('express');
const router  = express.Router();

const userCtrl = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require authentication
router.use(protect);

// ── Current user ──────────────────────────────────────────────
router.patch('/update-me', upload.single('image'), userCtrl.updateMe);
router.delete('/delete-me', userCtrl.deleteMe);

// ── Admin-only ────────────────────────────────────────────────
router.use(authorize('admin'));
router.route('/')
  .get(userCtrl.getAllUsers);

router.route('/:id')
  .get(userCtrl.getUser)
  .patch(upload.single('image'), userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
