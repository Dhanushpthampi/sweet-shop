import request from "supertest";
import app from "../../src/app";

describe("POST /api/sweets/:id/purchase", () => {
  it("should allow a user to purchase a sweet", async () => {
    // 🔐 login as admin
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const adminToken = adminLogin.body.token;

    // 🍬 create sweet
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: `Halwa ${Date.now()}`,
        category: "Indian",
        price: 15,
        quantity: 5,
      });

    const sweetId = createRes.body._id;

    // 👤 register normal user (UNIQUE email)
    const userEmail = `user_${Date.now()}@test.com`;
    const userPassword = "password123";

    await request(app)
      .post("/api/auth/register")
      .send({
        email: userEmail,
        password: userPassword,
      });

    // 🔑 login as normal user
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: userEmail,
        password: userPassword,
      });

    const userToken = userLogin.body.token;

    // 🛒 purchase sweet
    const purchaseRes = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(purchaseRes.status).toBe(200);
    expect(purchaseRes.body.quantity).toBe(4);
  });
});
