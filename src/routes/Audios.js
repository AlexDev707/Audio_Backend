const express = require("express");
const { AudiosController } = require("../controllers");
const { upload } = require("../utils");
const { schemaValidate } = require("../middlewares");
const { create } = require("../validationSchemas");
const { AudioModel } = require("../models");
const audiosController = new AudiosController();
const router = express.Router();
router.post(
  "/",
  express.urlencoded(),
  schemaValidate(create),
  upload.single("audioUrl"),
  audiosController.create
);
router.get("/", audiosController.searchSongsWithQueryParams);
router.get("/new", audiosController.getNewSongs);
router.get("/mixes/:genre", audiosController.getTopSongs);
router.get("/autocomplete", async (req, res) => {
  try {
    let { search, perPage = 2, page = 1 } = req.query;
    if (page === '') {
      page = 1;
    }

    const audios = await AudioModel.find(
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },
      null,
      {
        limit: 12
      }
    );

    const count = await AudioModel.countDocuments({
      title: {
        $regex: search,
        $options: 'i',
      },
    });

    res.json({
      audios,
      count: count,
      activePage: Number(page),
      perPage: Number(perPage),
      pagesCount: Math.ceil(count / Number(perPage)),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

//  audiosController.getSongsByQueryString
 );
router.patch("/audios/:audioId/listen", audiosController.incrementStreamsCount);
module.exports = router;
