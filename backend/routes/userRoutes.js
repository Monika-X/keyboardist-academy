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

// All routes require authentication
router.use(protect);

// ── Current user ──────────────────────────────────────────────
router.patch('/update-me',  userCtrl.updateMe);
router.delete('/delete-me', userCtrl.deleteMe);

// ── Admin-only ────────────────────────────────────────────────
router.use(authorize('admin'));
router.route('/')
  .get(userCtrl.getAllUsers);

router.route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
