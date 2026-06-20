'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Testimonial Routes
 *  backend/routes/testimonialRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const testimonialCtrl = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', testimonialCtrl.getAllTestimonials);
router.get('/:id', testimonialCtrl.getTestimonial);

// Protected student or admin to submit
router.post('/', upload.single('image'), testimonialCtrl.createTestimonial);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/:id')
  .patch(upload.single('image'), testimonialCtrl.updateTestimonial)
  .delete(testimonialCtrl.deleteTestimonial);

module.exports = router;
