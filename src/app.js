const express = require("express");
const volleyball = require("volleyball");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { apiRouter } = require("./routes");
const app = express();
const cloudinary = require("cloudinary");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use("/api", apiRouter);
app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    message: error.message,
  });
});

module.exports = app;
