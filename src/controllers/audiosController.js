const { AudiosService } = require("../services");
class AudiosController {
  constructor() {
    this.audiosService = new AudiosService();
  }
  /**
   * Create new audio
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  create = async (req, res, next) => {
    try {
      const newAudio = await this.audiosService.create(req.body, req.files);
      res.json(newAudio);
    } catch (error) {
      next(error);
    }
  };
  /**
   * Search songs by query params
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  searchSongsWithQueryParams = async (req, res, next) => {
    try {
      const response = this.audiosService.searchSongsWithParams(req.query);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
  /**
   * Get 12 new songs
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getNewSongs = async (req, res, next) => {
    try {
      const newAudios = await this.audiosService.getNew();
      res.json(newAudios);
    } catch (error) {
      next(error);
    }
  };
  /**
   * Get top 12 songs by genre
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getTopSongs = async (req, res, next) => {
    try {
      const { genre } = req.params;
    } catch (error) {
      next(error);
    }
  };
  /**
   * Search songs by query
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getSongsByQueryString = async (req, res, next) => {
    try {
      const { query } = req.query;
    } catch (error) {
      next(error);
    }
  };

  /**
   * Patch streams count
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  incrementStreamsCount = async (req, res, next) => {
    try {
      const newCount = await this.audiosService.incrementStreamsCount();
      res.json(newCount);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AudiosController;
