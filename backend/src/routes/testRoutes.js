const express = require("express");
const {
  getTestMessage,
  getCloudinaryStatus
} = require("../controllers/testController");

const router = express.Router();

router.get("/", getTestMessage);
router.get("/cloudinary", getCloudinaryStatus);

module.exports = router;
