'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Portfolio Routes
 *  backend/routes/portfolioRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../controllers/portfolioController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', portfolioCtrl.getAllPortfolios);
router.get('/:id', portfolioCtrl.getPortfolio);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mediaFile', maxCount: 1 }]), portfolioCtrl.createPortfolio);
router.route('/:id')
  .patch(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'mediaFile', maxCount: 1 }]), portfolioCtrl.updatePortfolio)
  .delete(portfolioCtrl.deletePortfolio);

module.exports = router;
