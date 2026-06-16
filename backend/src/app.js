const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/cloudinary");

const healthRoutes = require("./routes/healthRoutes");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/test", testRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
