/**
 * Mailer Utility (SMTP)
 */

const nodemailer = require('nodemailer');
const config = require('../config');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = config.email || {};
  if (!smtpUser || !smtpPass) return null;

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return transporter;
}

async function sendMail({ to, subject, text, html }) {
  const t = getTransporter();
  if (!t) {
    throw new Error('SMTP not configured (missing SMTP_USER/SMTP_PASS)');
  }

  const fromEmail = config.email?.fromEmail || config.email?.smtpUser;
  const fromName = config.email?.fromName || 'SMM Panel';

  return t.sendMail({
    from: fromName && fromEmail ? `${fromName} <${fromEmail}>` : fromEmail,
    to,
    subject,
    text,
    html,
  });
}

module.exports = {
  sendMail,
};


