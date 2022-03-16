const { AudioModel } = require("../models");
const fs = require("fs").promises;
const cloudinary = require("cloudinary").v2;
const { getAudioDurationInSeconds } = require("get-audio-duration");
class AudiosService {
  //* Create new audio
  async create(audioData, file) {
    const duration = await getAudioDurationInSeconds(file.filepath);
    await cloudinary.uploader.upload(file.filepath, {
      resource_type: "video",
    });
    await fs.unlink(process.cwd(), `uploads/${file.originalname}`);
    const newAudio = await AudioModel.create({
      ...audioData,
      fileUrl: file.filepath,
      duration: duration / 1000,
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
    const newCount = await AudioModel.findByIdAndUpdate(
      req.params.audioId,
      { $inc: { streamsCount: 1 } },
      {
        new: true,
      }
    );
    return newCount;
  }
}

module.exports = AudiosService;
