'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Email Service Utility
 *  backend/utils/sendEmail.js
 * ============================================================
 *  Sends transactional emails via Nodemailer using SMTP.
 * ============================================================
 */

const nodemailer = require('nodemailer');
const { BRAND }  = require('../config/constants');

/**
 * @typedef {object} MailOptions
 * @property {string}   to       – Recipient email
 * @property {string}   subject  – Email subject line
 * @property {string}   html     – HTML body
 * @property {string}  [text]    – Plain-text fallback
 */

/**
 * Send an email using SMTP credentials from environment variables.
 * @param {MailOptions} options
 * @returns {Promise<void>}
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = nodemailer.createTransport({
    host  : process.env.SMTP_HOST,
    port  : parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false, // STARTTLS
    auth  : {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from   : `"${process.env.FROM_NAME || BRAND.NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    text   : text || subject,
    html,
  });
};

// ── Email Templates ──────────────────────────────────────────

/**
 * Generate a base HTML email wrapper using brand colors.
 * @param {string} bodyContent  – Inner HTML content
 */
const emailWrapper = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${BRAND.NAME}</title>
</head>
<body style="margin:0;padding:0;background:#121212;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#121212;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#6C63FF;padding:32px;text-align:center;">
              <h1 style="margin:0;color:#F5F5F2;font-size:26px;letter-spacing:1px;">
                🎹 ${BRAND.NAME}
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#F5F5F2;font-size:16px;line-height:1.7;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px;text-align:center;border-top:1px solid #2a2a2a;color:#888;font-size:13px;">
              &copy; ${new Date().getFullYear()} ${BRAND.NAME}. All rights reserved.<br/>
              <a href="https://${BRAND.DOMAIN}" style="color:#6C63FF;text-decoration:none;">${BRAND.DOMAIN}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * Send a welcome / email-verification email.
 * @param {string} to
 * @param {string} firstName
 * @param {string} verifyUrl  – Full URL with token
 */
const sendVerificationEmail = (to, firstName, verifyUrl) =>
  sendEmail({
    to,
    subject: `Welcome to ${BRAND.NAME} — Verify Your Email`,
    html   : emailWrapper(`
      <p>Hi <strong>${firstName}</strong>,</p>
      <p>Welcome to <strong>${BRAND.NAME}</strong>! We're thrilled to have you on board.</p>
      <p>Please verify your email address by clicking the button below:</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="${verifyUrl}"
           style="background:#6C63FF;color:#F5F5F2;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Verify My Email
        </a>
      </p>
      <p>This link expires in <strong>24 hours</strong>.</p>
      <p>If you did not create an account, please ignore this email.</p>
    `),
  });

/**
 * Send a password-reset email.
 * @param {string} to
 * @param {string} firstName
 * @param {string} resetUrl   – Full URL with reset token
 */
const sendPasswordResetEmail = (to, firstName, resetUrl) =>
  sendEmail({
    to,
    subject: `${BRAND.NAME} — Password Reset Request`,
    html   : emailWrapper(`
      <p>Hi <strong>${firstName}</strong>,</p>
      <p>You requested a password reset for your ${BRAND.NAME} account.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="${resetUrl}"
           style="background:#6C63FF;color:#F5F5F2;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Reset My Password
        </a>
      </p>
      <p>This link expires in <strong>10 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email — your password remains unchanged.</p>
    `),
  });

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
