'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Setting Routes
 *  backend/routes/settingRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const settingCtrl = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.route('/:key')
  .get(settingCtrl.getSettingByKey);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(settingCtrl.getAllSettings)
  .post(upload.single('image'), settingCtrl.upsertSetting);

router.route('/:key')
  .delete(settingCtrl.deleteSetting);

module.exports = router;
