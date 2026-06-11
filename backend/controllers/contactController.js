'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Contact Controller
 *  backend/controllers/contactController.js
 * ============================================================
 */

const Contact    = require('../models/Contact');
const catchAsync = require('../utils/catchAsync');
const AppError   = require('../utils/AppError');

// ── POST /api/v1/contact ─────────────────────────────────────
exports.submitContact = catchAsync(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const contact = await Contact.create({
    name, email, phone, subject, message,
    ipAddress: req.ip,
  });

  res.status(201).json({
    status : 'success',
    message: 'Your message has been received. We will get back to you shortly.',
    data   : { id: contact._id },
  });
});

// ── GET /api/v1/contact  (Admin) ─────────────────────────────
exports.getAllMessages = catchAsync(async (req, res) => {
  const page  = parseInt(req.query.page,  10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip  = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    Contact.find().sort('-createdAt').skip(skip).limit(limit),
    Contact.countDocuments(),
  ]);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    total,
    data: { messages },
  });
});

// ── PATCH /api/v1/contact/:id/read  (Admin) ─────────────────
exports.markAsRead = catchAsync(async (req, res, next) => {
  const msg = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!msg) return next(new AppError('Message not found.', 404));
  res.status(200).json({ status: 'success', data: { message: msg } });
});

// ── DELETE /api/v1/contact/:id  (Admin) ─────────────────────
exports.deleteMessage = catchAsync(async (req, res, next) => {
  const msg = await Contact.findByIdAndDelete(req.params.id);
  if (!msg) return next(new AppError('Message not found.', 404));
  res.status(204).json({ status: 'success', data: null });
});
