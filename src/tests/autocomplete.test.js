const request = require("supertest");
const path = require("path");
const app = require("../app");
const audio = path.join(__dirname, "../../uploads/2.mp3");
const image = path.join(__dirname, "../../uploads/1.jpg");
const mongoose = require("mongoose");
const { AudioModel } = require("../models");
const { array } = require("../utils/multer");
const { prototype } = require("events");

describe("AUTOCOMPLETE", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await AudioModel.deleteMany();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should show matching audios: ", async () => {
    jest.setTimeout(500000);

    await request(app)
      .post("/api/audios")
      .field("author", "XXX")
      .field("title", "Revenge")
      .field("genres", "rap")
      .attach("audio", audio)
      .attach("image", image);

    const response = await request(app)
      .get("/api/audios/autocomplete")
      .query("search", "R");

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length >= 0).toBe(true);
  });
});
