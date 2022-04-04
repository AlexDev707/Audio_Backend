const request = require("supertest");
const app = require("../app");

describe("INCREMENT STREAMS COUNT", () => {
  test("should increment streams count: ", async () => {
    jest.setTimeout(30000);
    const response = await request(app).patch(
      "/api/audios/62321a582f11d4c5a60cdce1/listen"
    );

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});
