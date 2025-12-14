import request from "supertest";
import app from "../../src/app";

describe("GET /api/sweets", () => {
  it("should return all sweets for an authenticated user", async () => {
    // login as admin (already exists)
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const token = loginRes.body.token;

    // create one sweet (admin allowed)
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 30,
        quantity: 50,
      });

    // get sweets
    const response = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
