const { AudioModel } = require("../models");
class AudiosService {
  //* Create new audio
  async create(audioData) {
    const newAudio = await AudioModel.create(audioData);
    return newAudio;
  }
  //* Search songs by query params
  async searchSongsWithParams(){}
  //* Get 12 new songs
  async getNew() {}
  //* Get top 12 songs by genre
  async getTopByGenre() {}
  //* Search songs by query
  async getSongsByQuery() {}
}
module.exports = AudiosService;
