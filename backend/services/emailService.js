'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Email Service
 *  backend/services/emailService.js
 * ============================================================
 *  Higher-level service that composes email templates.
 *  Controllers call this layer — not the utility directly.
 * ============================================================
 */

const {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require('../utils/sendEmail');
const { BRAND } = require('../config/constants');

/**
 * Send an enrollment confirmation email.
 * @param {object} options
 * @param {string} options.to
 * @param {string} options.firstName
 * @param {string} options.courseTitle
 * @param {string} options.courseSlug
 */
const sendEnrollmentConfirmation = ({ to, firstName, courseTitle, courseSlug }) =>
  sendEmail({
    to,
    subject: `You're enrolled: ${courseTitle} — ${BRAND.NAME}`,
    html   : `
      <h2>Hi ${firstName}!</h2>
      <p>You have successfully enrolled in <strong>${courseTitle}</strong>.</p>
      <p>
        <a href="${process.env.CLIENT_URL}/courses/${courseSlug}"
           style="background:#6C63FF;color:#F5F5F2;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Start Learning
        </a>
      </p>
      <p>Happy practising! 🎹</p>
    `,
  });

/**
 * Send a certificate issued notification.
 */
const sendCertificateEmail = ({ to, firstName, courseTitle, certificateUrl }) =>
  sendEmail({
    to,
    subject: `Certificate Issued: ${courseTitle} — ${BRAND.NAME}`,
    html   : `
      <h2>Congratulations, ${firstName}! 🎉</h2>
      <p>You have successfully completed <strong>${courseTitle}</strong>.</p>
      <p>
        <a href="${certificateUrl}"
           style="background:#6C63FF;color:#F5F5F2;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Download Certificate
        </a>
      </p>
    `,
  });

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendEnrollmentConfirmation,
  sendCertificateEmail,
};
