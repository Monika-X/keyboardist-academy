'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Event Controller
 *  backend/controllers/eventController.js
 * ============================================================
 */

const Event = require('../models/Event');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinaryService = require('../services/cloudinaryService');

// Get all events
exports.getAllEvents = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Event.find(), req.query)
    .filter()
    .search(['title', 'description', 'location'])
    .sort()
    .limitFields()
    .paginate();

  const events = await features.query;

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: { events }
  });
});

// Get single event
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError('No event found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event }
  });
});

// Create event
exports.createEvent = catchAsync(async (req, res, next) => {
  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  let event;
  try {
    event = await Event.create(req.body);
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(201).json({
    status: 'success',
    data: { event }
  });
});

// Update event
exports.updateEvent = catchAsync(async (req, res, next) => {
  let event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError('No event found with that ID.', 404));
  }

  const oldPublicId = event.publicId;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  try {
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (req.file && oldPublicId) {
      await cloudinaryService.deleteImage(oldPublicId);
    }
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { event }
  });
});

// Delete event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError('No event found with that ID.', 404));
  }

  const publicIdToDelete = event.publicId;
  await event.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
