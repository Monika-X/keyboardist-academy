'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Faculty Routes
 *  backend/routes/facultyRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const facultyCtrl = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', facultyCtrl.getAllFaculty);
router.get('/:id', facultyCtrl.getFacultyMember);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', facultyCtrl.createFacultyMember);
router.route('/:id')
  .patch(facultyCtrl.updateFacultyMember)
  .delete(facultyCtrl.deleteFacultyMember);

module.exports = router;
