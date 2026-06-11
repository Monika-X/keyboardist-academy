'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Express Server Entry Point
 *  server.js
 * ============================================================
 */

const app = require('./backend/app');
const connectDB = require('./backend/config/database');

// ── Load environment variables ───────────────────────────────
require('dotenv').config();

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
  server.close(() => process.exit(1));
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
