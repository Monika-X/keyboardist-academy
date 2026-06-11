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

// Public routes
router.get('/', portfolioCtrl.getAllPortfolios);
router.get('/:id', portfolioCtrl.getPortfolio);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', portfolioCtrl.createPortfolio);
router.route('/:id')
  .patch(portfolioCtrl.updatePortfolio)
  .delete(portfolioCtrl.deletePortfolio);

module.exports = router;
