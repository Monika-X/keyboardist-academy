'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Token Service
 *  backend/services/tokenService.js
 * ============================================================
 *  Centralises token rotation / blacklist logic.
 *  Extend this module if you add Redis-based token blacklisting.
 * ============================================================
 */

const { generateToken, verifyToken } = require('../config/jwt');

/**
 * Issue a fresh access token for the given user payload.
 * @param {object} user  – { _id, role }
 * @returns {string}
 */
const issueAccessToken = (user) =>
  generateToken({ id: user._id, role: user.role });

/**
 * Decode and validate an incoming token string.
 * @param {string} token
 * @returns {{ id: string, role: string, iat: number, exp: number }}
 */
const decodeToken = (token) => verifyToken(token);

module.exports = { issueAccessToken, decodeToken };
