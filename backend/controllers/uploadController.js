const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file.' });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const publicId = req.params.publicId || req.params[0];

    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Public ID is required.' });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok' && result.result !== 'not found') {
      return res.status(400).json({ success: false, message: 'Failed to delete image from Cloudinary.' });
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

exports.replaceImage = async (req, res, next) => {
  try {
    const publicId = req.params.publicId || req.params[0];

    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Old Public ID is required to replace.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a new image file.' });
    }

    // Delete the old image
    await cloudinary.uploader.destroy(publicId);

    // Return the new image details
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    next(error);
  }
};
