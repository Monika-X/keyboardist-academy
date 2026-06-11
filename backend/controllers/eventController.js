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
  const event = await Event.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { event }
  });
});

// Update event
exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!event) {
    return next(new AppError('No event found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event }
  });
});

// Delete event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return next(new AppError('No event found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
