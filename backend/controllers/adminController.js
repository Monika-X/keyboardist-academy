'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Admin Controller
 *  backend/controllers/adminController.js
 * ============================================================
 */

const Admin = require('../models/Admin');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');
const { sendTokenResponse } = require('../config/jwt');

// Register Admin
exports.registerAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return next(new AppError('Admin with this email already exists.', 400));
  }

  const admin = await Admin.create({ name, email, password });

  sendTokenResponse(admin, 201, res);
});

// Admin Login
exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.matchPassword(password))) {
    return next(new AppError('Invalid email or password.', 401));
  }

  sendTokenResponse(admin, 200, res);
});

// Get all admins
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Admin.find(), req.query)
    .filter()
    .search(['name', 'email'])
    .sort()
    .limitFields()
    .paginate();

  const admins = await features.query;

  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: { admins }
  });
});

// Get single admin
exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return next(new AppError('No admin found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { admin }
  });
});

// Update admin
exports.updateAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!admin) {
    return next(new AppError('No admin found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { admin }
  });
});

// Delete admin
exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) {
    return next(new AppError('No admin found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
