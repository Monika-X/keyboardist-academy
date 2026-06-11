'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Enrollment Routes
 *  backend/routes/enrollmentRoutes.js
 * ============================================================
 */

const express = require('express');
const router  = express.Router();

const enrollCtrl = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get ('/my',                   enrollCtrl.getMyEnrollments);
router.post('/:courseId',            enrollCtrl.enrollInCourse);
router.get ('/:id',                  enrollCtrl.getEnrollment);
router.patch('/:id/progress',        enrollCtrl.updateProgress);

module.exports = router;
