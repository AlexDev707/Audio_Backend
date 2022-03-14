const { AudioModel } = require("../models");
class AudiosService {
  //* Create new audio
  async create(audioData) {
    const newAudio = await AudioModel.create(audioData);
    return newAudio;
  }
  //* Search songs by query params
  async searchSongsWithParams() {}

  //* Get 12 new songs
  /**
   *  @param {String} sortOrder ASC | DESC
   * @returns
   */

  async getNew(sortOrder) {
    const newAudios = AudioModel.find(null, null, {
      sort: {
        createdAt: sortOrder === ASC ? 1 : -1,
      },
    });
    return newAudios;
  }
  //* Get top 12 songs by genre
  async getTopByGenre() {}
  //* Search songs by query
  async getSongsByQuery() {}
  async incrementStreamsCount() {
    const newCount = await AudioModel.findOneAndUpdate(
      req.body.streamsCount,
      +1
    );
    return newCount;
  }
}

module.exports = AudiosService;
