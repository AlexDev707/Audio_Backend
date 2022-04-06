const request = require("supertest");
const path = require("path");
const app = require("../app");
const audio = path.join(__dirname, "../../uploads/XXXTENTACION - Revenge.mp3");
const image = path.join(__dirname, "../../uploads/MySkills.jpg");

describe("CREATE NEW AUDIO: ", () => {
  test("should create new audio: ", async () => {
    jest.setTimeout(30000)
    const response = await await request(app)
      .post("/api/audios")
      .field("author", "XXX")
      .field("title", "Revenge")
      .field("genres", "rap")
      .attach("audio", audio)
      .attach("image", image)

    expect(response.statusCode).toBe(201);
  });
});
describe("SEARCH AUDIO BY QUERY PARAMS: ", () => {
  test("should find audios: ", async () => {
    jest.setTimeout(30000)
    const response = await await request(app)
      .get("/api/audios")
      .query({
          query: "Revenge",
          page: 1,
          perPage: 12,
          sortBy: 'streamsCount',
          sortOrder: 1
      })

    expect(response.statusCode).toBe(200);
    expect(response.body.length > 0).toBe(true)
  });
});
