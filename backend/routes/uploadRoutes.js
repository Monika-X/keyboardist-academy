'use strict';

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth'); // Optional: for security

// Upload image (POST /api/v1/upload)
router.post('/', upload.single('image'), uploadController.uploadImage);

// Replace image (PUT /api/v1/upload/:publicId)
// Use (*) to catch slashes in Cloudinary public IDs (e.g. folder/filename)
router.put('/:publicId(*)', upload.single('image'), uploadController.replaceImage);

// Delete image (DELETE /api/v1/upload/:publicId)
router.delete('/:publicId(*)', uploadController.deleteImage);

module.exports = router;
