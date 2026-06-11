'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Express Application Setup
 *  backend/app.js
 * ============================================================
 *  Central Express app configuration:
 *  - Security middleware (Helmet, CORS, Rate Limiting, HPP)
 *  - Body parsing
 *  - Request logging (Morgan)
 *  - Static file serving
 *  - Route mounting
 *  - Global error handler
 * ============================================================
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const xss = require('xss');
require('dotenv').config();

// ── Internal modules ─────────────────────────────────────────
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// ── Route imports ─────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollRoutes = require('./routes/enrollmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const settingRoutes = require('./routes/settingRoutes');

const app = express();

// ── Security: HTTP headers ───────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:', '*'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        connectSrc: ["'self'", "http://localhost:5000", "http://127.0.0.1:5000", "https://*.onrender.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// ── CORS ─────────────────────────────────────────────────────
const corsOptions = {
  origin: (origin, callback) => {
    // Allow same-origin requests (e.g. static files served from this server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://127.0.0.1:5000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ];

    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.onrender.com') ||
      (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).includes(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ── Rate Limiting ────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests from this IP. Please try again later.',
  },
});
app.use('/api', limiter);

// ── Auth-specific stricter rate limit ────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: {
    status: 429,
    error: 'Too many login attempts. Please try again after 15 minutes.',
  },
});
app.use('/api/v1/auth', authLimiter);

// ── Body parsers ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ── Data sanitization ────────────────────────────────────────
app.use(mongoSanitize()); // NoSQL injection
// XSS sanitization — sanitize string fields in req.body
app.use((req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    const sanitize = (obj) => {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') obj[key] = xss(obj[key]);
        else if (typeof obj[key] === 'object' && obj[key] !== null) sanitize(obj[key]);
      }
    };
    sanitize(req.body);
  }
  next();
});

// ── Prevent parameter pollution ──────────────────────────────
app.use(
  hpp({
    whitelist: ['sort', 'fields', 'page', 'limit', 'level', 'price'],
  })
);

// ── Request logging (dev only) ───────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Static files — Frontend ──────────────────────────────────
app.use(
  express.static(path.join(__dirname, '../frontend'), {
    maxAge: process.env.NODE_ENV === 'production' ? '30d' : 0,
  })
);

// ── API Health Check ─────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🎹 Keyboardist Academy API is live',
    env: process.env.NODE_ENV,
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ── DB connectivity guard — return 503 instead of crashing ───
const mongoose = require('mongoose');
app.use('/api/v1', (req, res, next) => {
  // Allow health check through always
  if (req.path === '/health') return next();
  // ReadyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: 'error',
      message: 'Database not connected. Please check MongoDB Atlas IP whitelist and try again shortly.'
    });
  }
  next();
});

// ── Mount API routes ─────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/enrollments', enrollRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/portfolios', portfolioRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/settings', settingRoutes);

// ── SPA fallback — serve index.html for non-API routes ───────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// ── 404 handler ──────────────────────────────────────────────
app.use(notFound);

// ── Global error handler (must be last) ──────────────────────
app.use(errorHandler);

module.exports = app;
