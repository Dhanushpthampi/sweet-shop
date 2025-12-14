import request from "supertest";
import app from "../../src/app";

describe("POST /api/sweets/:id/restock", () => {
  it("should allow admin to restock a sweet", async () => {
    // login as admin
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const adminToken = adminLogin.body.token;

    // create sweet
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: `Barfi ${Date.now()}`,
        category: "Indian",
        price: 20,
        quantity: 10,
      });

    const sweetId = createRes.body._id;

    // restock
    const restockRes = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        quantity: 5,
      });

    expect(restockRes.status).toBe(200);
    expect(restockRes.body.quantity).toBe(15);
  });
});
