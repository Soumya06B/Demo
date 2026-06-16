const cloudinary = require("../config/cloudinary");

const getTestMessage = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Frontend connected to backend successfully"
  });
};

const getCloudinaryStatus = (req, res) => {
  const config = cloudinary.config();

  res.status(200).json({
    success: true,
    message: "Cloudinary is configured successfully",
    cloudName: config.cloud_name
  });
};

module.exports = {
  getTestMessage,
  getCloudinaryStatus
};
