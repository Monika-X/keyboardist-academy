'use strict';

const cloudinary = require('../config/cloudinary');

/**
 * Uploads an image buffer to Cloudinary
 * @param {Buffer} buffer - The image buffer from req.file.buffer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<{imageUrl: string, publicId: string}>}
 */
exports.uploadImage = async (buffer, folder = 'keyboardist_academy_uploads') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error Details:', error);
          return reject(new Error('File upload failed.'));
        }
        resolve({ imageUrl: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Deletes an image from Cloudinary safely
 * @param {String} publicId - The Cloudinary publicId
 */
exports.deleteImage = async (publicId) => {
  if (!publicId) return; // safe skip
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
};

/**
 * Replaces an old image with a new one
 * @param {String} oldPublicId - The existing image publicId
 * @param {Buffer} newBuffer - The new image buffer
 * @returns {Promise<{imageUrl: string, publicId: string}>}
 */
exports.replaceImage = async (oldPublicId, newBuffer) => {
  const result = await exports.uploadImage(newBuffer);
  // Only delete old if new upload succeeds
  if (oldPublicId) {
    await exports.deleteImage(oldPublicId);
  }
  return result;
};
