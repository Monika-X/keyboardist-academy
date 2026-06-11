'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Lesson Routes
 *  backend/routes/lessonRoutes.js
 * ============================================================
 */

const express = require('express');
const router  = express.Router({ mergeParams: true });

const lessonCtrl = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/auth');

// ── Public: list lessons (free previews visible) ─────────────
router.get('/', lessonCtrl.getLessons);
router.get('/:id', lessonCtrl.getLesson);

// ── Protected ─────────────────────────────────────────────────
router.use(protect);
router.post('/',    authorize('instructor', 'admin'), lessonCtrl.createLesson);
router.patch('/:id',  authorize('instructor', 'admin'), lessonCtrl.updateLesson);
router.delete('/:id', authorize('admin'),               lessonCtrl.deleteLesson);

module.exports = router;
