const express = require("express");
const { AudiosController } = require("../controllers");
const { upload } = require("../utils");
const { schemaValidate } = require("../middlewares");
const { create } = require("../validationSchemas");
const audiosController = new AudiosController();
const router = express.Router();
router.post(
  "/",
  schemaValidate(create),
  upload.single("audioUrl"),
  audiosController.create
);
router.get("/", audiosController.searchSongsWithQueryParams);
router.get("/new", audiosController.getNewSongs);
router.get("/mixes/:genre", audiosController.getTopSongs);
router.get("/autocomplete", audiosController.getSongsByQueryString);
router.patch("/audios/:audioId/listen", audiosController.incrementStreamsCount);
module.exports = router;
