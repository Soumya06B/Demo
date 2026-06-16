const { transporter } = require("../config/smtp");

const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    const error = new Error("Email service is not configured");
    error.statusCode = 503;
    throw error;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error("Email send failed:", error.message);

    const emailError = new Error("Email service is not configured");
    emailError.statusCode = 503;
    throw emailError;
  }
};

module.exports = sendEmail;
