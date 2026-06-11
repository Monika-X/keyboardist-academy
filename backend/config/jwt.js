'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — JWT Configuration
 *  backend/config/jwt.js
 * ============================================================
 *  Centralised JWT helpers for token generation and validation.
 * ============================================================
 */

const jwt = require('jsonwebtoken');

// ── Constants (loaded once at startup) ──────────────────────
const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_EXPIRE  = process.env.JWT_EXPIRE  || '7d';
const COOKIE_DAYS = parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 7;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.');
}

/**
 * Generate a signed JWT for a given payload.
 * @param {object} payload  – e.g. { id: user._id, role: user.role }
 * @returns {string}  signed JWT string
 */
const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

/**
 * Verify a JWT and return the decoded payload.
 * @param {string} token
 * @returns {object} decoded payload
 * @throws  {JsonWebTokenError | TokenExpiredError}
 */
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

/**
 * Build the HTTP-only cookie options object.
 * @param {boolean} [clearCookie=false]  – pass true to build an expiry-in-past cookie
 * @returns {object} Express cookie options
 */
const cookieOptions = (clearCookie = false) => ({
  expires  : clearCookie
    ? new Date(Date.now() - 1000)
    : new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000),
  httpOnly : true,                              // Not accessible via JS
  secure   : process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite : 'strict',                          // CSRF protection
});

/**
 * Send token as JSON response AND set it as an HTTP-only cookie.
 * @param {object} user      – Mongoose user document
 * @param {number} statusCode – HTTP status code
 * @param {object} res       – Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken({ id: user._id, role: user.role });

  res
    .status(statusCode)
    .cookie('jwt', token, cookieOptions())
    .json({
      status: 'success',
      token,
      data: {
        user: {
          id       : user._id,
          firstName: user.firstName,
          lastName : user.lastName,
          email    : user.email,
          role     : user.role,
          avatar   : user.avatar,
        },
      },
    });
};

module.exports = { generateToken, verifyToken, cookieOptions, sendTokenResponse };
