const bcrypt = require("bcryptjs");
const { isEmailServiceConfigured } = require("../config/smtp");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const getOtpExpiryDate = () => {
  const minutes = Number(process.env.OTP_EXPIRES_IN_MINUTES || 10);
  return new Date(Date.now() + minutes * 60 * 1000);
};

const buildOtpEmail = (otp, purpose) => ({
  subject: `Your ${purpose} OTP`,
  text: `Your ${purpose} OTP is ${otp}. It expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Your ${purpose} OTP</h2>
      <p>Use this OTP to continue:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This OTP expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.</p>
    </div>
  `
});

const throwOtpEmailUnavailable = () => {
  const error = new Error("Email service is not configured. OTP cannot be sent.");
  error.statusCode = 503;
  throw error;
};

const saveAndSendOtp = async (user, purpose) => {
  const otp = generateOtp();
  const wasNewUser = user.isNew;
  const previousOtp = user.otp;
  const previousOtpExpiresAt = user.otpExpiresAt;

  user.otp = await bcrypt.hash(otp, 12);
  user.otpExpiresAt = getOtpExpiryDate();
  await user.save();

  try {
    await sendEmail({
      to: user.email,
      ...buildOtpEmail(otp, purpose)
    });
  } catch (error) {
    if (wasNewUser) {
      await User.deleteOne({ _id: user._id });
    } else {
      user.otp = previousOtp;
      user.otpExpiresAt = previousOtpExpiresAt;
      await user.save({ validateBeforeSave: false });
    }

    throwOtpEmailUnavailable();
  }
};

const verifyOtpForUser = async ({ email, otp }) => {
  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+otp +otpExpiresAt");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.otp || !user.otpExpiresAt) {
    const error = new Error("OTP not found. Please request a new OTP.");
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiresAt < new Date()) {
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const error = new Error("OTP expired. Please request a new OTP.");
    error.statusCode = 400;
    throw error;
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  user.otp = undefined;
  user.otpExpiresAt = undefined;

  return user;
};

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    token,
    user: user.toSafeObject()
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409);
      throw new Error("User already exists");
    }

    if (!isEmailServiceConfigured()) {
      throwOtpEmailUnavailable();
    }

    const user = new User({
      name,
      email: normalizedEmail,
      password,
      isEmailVerified: false
    });

    await saveAndSendOtp(user, "register verification");

    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email."
    });
  } catch (error) {
    next(error);
  }
};

const verifyRegisterOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);
    user.isEmailVerified = true;
    await user.save();

    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    if (!isEmailServiceConfigured()) {
      throwOtpEmailUnavailable();
    }

    await saveAndSendOtp(user, "login verification");

    res.status(200).json({
      success: true,
      message: "Login OTP sent to email."
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
    }

    await user.save();
    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
};

const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.toSafeObject()
  });
};

module.exports = {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
  getProfile
};
