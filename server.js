'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Express Server Entry Point
 *  server.js
 * ============================================================
 */

// ── Load environment variables ───────────────────────────────
require('dotenv').config();

//DEBUG CHECK
console.log("ENV CHECK:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});

const app = require('./backend/app');
const connectDB = require('./backend/config/database');

const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB Atlas ─────────────────────────────────
connectDB();

// ── Start HTTP server ────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(
    `\n🎹  Keyboardist Academy Server running in ${process.env.NODE_ENV} mode on port ${PORT}\n`
  );
});

// ── Graceful shutdown on unhandled promise rejections ────────
process.on('unhandledRejection', (err) => {
  console.error(`❌  Unhandled Rejection: ${err.message}`);
  // Do not crash the server on Cloudinary 403 errors during development
});

// ── Graceful shutdown on uncaught exceptions ─────────────────
process.on('uncaughtException', (err) => {
  console.error(`❌  Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// ── SIGTERM signal (e.g. Docker / PM2 shutdown) ──────────────
process.on('SIGTERM', () => {
  console.log('👋  SIGTERM received. Shutting down gracefully…');
  server.close(() => {
    console.log('✅  Server closed.');
    process.exit(0);
  });
});
