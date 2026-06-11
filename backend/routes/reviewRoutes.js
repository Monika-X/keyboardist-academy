'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Review Routes
 *  backend/routes/reviewRoutes.js
 * ============================================================
 */

const express = require('express');
const router  = express.Router({ mergeParams: true });

const reviewCtrl = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/',    reviewCtrl.getCourseReviews);

router.use(protect);
router.post('/',   reviewCtrl.createReview);
router.patch('/:id',  reviewCtrl.updateReview);
router.delete('/:id', authorize('student', 'admin'), reviewCtrl.deleteReview);

module.exports = router;
