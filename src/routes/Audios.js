const express = require("express");
const { AudiosController } = require("../controllers");
const { upload } = require("../utils");
const { schemaValidate } = require("../middlewares");
const { create } = require("../validationSchemas");
const audiosController = new AudiosController();
const router = express.Router();
router.post(
  "/",
  upload.none(),
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  // schemaValidate(create),
  audiosController.create
);
router.get("/", audiosController.searchSongsWithQueryParams);
router.get("/new", audiosController.getNewSongs);
router.get("/mixes/:genre", audiosController.getTopSongs);
router.get("/autocomplete", audiosController.getSongsByQueryString);
module.exports = router;
