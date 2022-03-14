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
      const newAudio = this.audiosService.create(req.body, req.file);
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
}
module.exports = AudiosController;
