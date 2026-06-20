'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Gallery Routes
 *  backend/routes/galleryRoutes.js
 * ============================================================
 */

const express = require('express');
const router = express.Router();
const galleryCtrl = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', galleryCtrl.getAllGalleryItems);
router.get('/:id', galleryCtrl.getGalleryItem);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', upload.single('image'), galleryCtrl.createGalleryItem);
router.route('/:id')
  .patch(upload.single('image'), galleryCtrl.updateGalleryItem)
  .delete(galleryCtrl.deleteGalleryItem);

module.exports = router;
