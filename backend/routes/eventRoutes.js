'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Event Routes
 *  backend/routes/eventRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', eventCtrl.getAllEvents);
router.get('/:id', eventCtrl.getEvent);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', upload.single('image'), eventCtrl.createEvent);
router.route('/:id')
  .patch(upload.single('image'), eventCtrl.updateEvent)
  .delete(eventCtrl.deleteEvent);

module.exports = router;
