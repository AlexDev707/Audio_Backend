const { AudioModel } = require("../models");
const fs = require("fs").promises;
const cloudinary = require("cloudinary").v2;
class AudiosService {
  //* Create new audio
  async create(audioData, files) {
   const audio = await cloudinary.uploader.upload(files.audio[0].path, {
      resource_type: "video",
    });
    const image = await cloudinary.uploader.upload(files.image[0].path);
    await fs.unlink(
      `${files.audio[0].destination}/${files.audio[0].originalname}`
    );
    await fs.unlink(
      `${files.image[0].destination}/${files.image[0].originalname}`
    );
    const newAudio = await AudioModel.create({
      ...audioData,
      genres: audioData.genres.split(", "),
      audioUrl: audio.url,
      imageUrl: image.url
    });
    return newAudio;
  }
  //* Search songs by query params
  async searchSongsWithParams(queryData) {
    const { query = "", page = 1, perPage = 12, sortBy, sortOrder } = queryData;
    const audios = await AudioModel.find(
      {
        title: {
          $regex: query,
          $options: "i",
        },
      },
      null,
      {
        limit: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
        sort: {
          [sortBy]: Number(sortOrder),
        },
      }
    );
    return audios;
  }
  //* Get 12 new songs
  /**
   *  @param {String} sortOrder ASC | DESC
   * @returns
   */

  async getNew() {
    const newAudios = AudioModel.find(null, null, {
      sort: {
        createdAt: -1,
      },
      limit: 12,
    });
    return newAudios;
  }
  //* Get top 12 songs by genre
  async getTopByGenre() {}
  //* Search songs by query
  async getSongsByQuery() {}
  async incrementStreamsCount(audioId) {
    const newCount = await AudioModel.findByIdAndUpdate(
      audioId,
      { $inc: { streamsCount: 1 } },
      {
        new: true,
      }
    );
    return newCount;
  }
}

module.exports = AudiosService;
