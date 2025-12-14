import request from "supertest";
import app from "../../src/app";

describe("PUT /api/sweets/:id", () => {
  it("should allow admin to update a sweet", async () => {
    // login as admin
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const token = loginRes.body.token;

    // create a sweet
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Ladoo ${Date.now()}`,
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    const sweetId = createRes.body._id;

    // update the sweet
    const updateRes = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 25,
        quantity: 40,
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.price).toBe(25);
    expect(updateRes.body.quantity).toBe(40);
  });
});
