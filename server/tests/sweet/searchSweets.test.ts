import request from "supertest";
import app from "../../src/app";

describe("GET /api/sweets/search", () => {
  it("should search sweets by name", async () => {
    // login as admin (reuse admin to create data)
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const token = loginRes.body.token;

    // create sweets
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Kaju Katli ${Date.now()}`,
        category: "Indian",
        price: 40,
        quantity: 10,
      });

    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Chocolate Bar ${Date.now()}`,
        category: "Western",
        price: 30,
        quantity: 15,
      });

    // search by name
    const res = await request(app)
      .get("/api/sweets/search?name=kaju")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name.toLowerCase()).toContain("kaju");
  });
});
