const express = require("express");
const audios = require("./Audios");
const router = express.Router();

router.use("/audios", audios);

module.exports = router;
