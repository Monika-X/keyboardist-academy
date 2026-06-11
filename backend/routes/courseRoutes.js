'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Course Routes
 *  backend/routes/courseRoutes.js
 * ============================================================
 */

const express = require('express');
const router  = express.Router({ mergeParams: true });

const courseCtrl = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// ── Public ────────────────────────────────────────────────────
router.get('/featured', courseCtrl.getFeaturedCourses);
router.get('/stats',    protect, authorize('admin'), courseCtrl.getCourseStats);
router.get('/',         courseCtrl.getAllCourses);
router.get('/:slug',    courseCtrl.getCourse);

// ── Protected: Instructor / Admin ────────────────────────────
router.use(protect);
router.post('/', authorize('instructor', 'admin'), courseCtrl.createCourse);
router
  .route('/:id')
  .patch (authorize('instructor', 'admin'), courseCtrl.updateCourse)
  .delete(authorize('admin'),               courseCtrl.deleteCourse);

module.exports = router;
