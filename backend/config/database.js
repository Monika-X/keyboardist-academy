'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — MongoDB Atlas Connection
 *  backend/config/database.js
 * ============================================================
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌  MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  // Mongoose global settings
  mongoose.set('strict', true);
  mongoose.set('strictQuery', false);

  // ── Connection lifecycle events ──────────────────────────
  mongoose.connection.on('error', (err) => {
    console.error(`❌  MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️   MongoDB disconnected. Mongoose will retry automatically…');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔁  MongoDB reconnected successfully.');
  });

  mongoose.connection.on('connected', () => {
    console.log(
      `✅  MongoDB Atlas connected: ${mongoose.connection.host} [${mongoose.connection.name}]`
    );
  });

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS   : 10000,
      socketTimeoutMS            : 45000,
      // Allow TLS regardless of system OpenSSL version
      tls                        : true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames   : true,
      retryWrites                : true,
    });
  } catch (error) {
    // Do NOT crash the server — log and keep running.
    // The frontend will receive a clean 503 JSON response from the DB guard
    // middleware in app.js instead of "failed to fetch" (connection refused).
    console.error(`⚠️   MongoDB initial connection failed: ${error.message}`);
    console.warn('      Server is still running. Whitelist your IP in MongoDB Atlas to fix this.');
  }
};

module.exports = connectDB;
