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
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  // schemaValidate(create),
  audiosController.create
);

router.get("/", audiosController.searchSongsWithQueryParams);
router.get("/new", audiosController.getNewSongs);
router.get("/mixes/:genre", async (req, res) => {
  try { 
    let { genre } = req.params;
    
    if(genre === "all"){
      const audiosSortAll = await AudioModel.find(
      null,
      null,
      {
        limit: 12,
        sort: {streamsCount: -1}
      });
  
      return res.json(audiosSortAll);
    }

    const audiosSortByGenre = await AudioModel.find({
      genres: genre,
    },
    null,
    {
      limit: 12,
      sort: {streamsCount: -1}
    });

    res.json(audiosSortByGenre)
  } catch(error) {
    res.status(500).send(error);
  }
});
router.get("/autocomplete", async (req, res) => {
  try {
    let { search} = req.query;
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

    res.json(audios);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

//  audiosController.getSongsByQueryString
 );
router.patch("/:audioId/listen", audiosController.incrementStreamsCount);
module.exports = router;
