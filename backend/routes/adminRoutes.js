'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Admin Routes
 *  backend/routes/adminRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Public auth routes
router.post('/login', adminCtrl.loginAdmin);
router.post('/register', adminCtrl.registerAdmin); // Can be protected in production

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/', adminCtrl.getAllAdmins);
router.route('/:id')
  .get(adminCtrl.getAdmin)
  .patch(adminCtrl.updateAdmin)
  .delete(adminCtrl.deleteAdmin);

module.exports = router;
