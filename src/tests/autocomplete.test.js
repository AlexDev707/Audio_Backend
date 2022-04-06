const request = require("supertest");
const app = require("../app");

describe("AUTOCOMPLETE", () => {
  test("should show matching audios: ", async () => {
    jest.setTimeout(30000);
    const response = await request(app)
      .get("/api/audios/autocomplete")
      .query("search", 12);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});
