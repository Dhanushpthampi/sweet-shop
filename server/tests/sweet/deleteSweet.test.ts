import request from "supertest";
import app from "../../src/app";

describe("DELETE /api/sweets/:id", () => {
  it("should allow admin to delete a sweet", async () => {
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
        name: `Barfi ${Date.now()}`,
        category: "Indian",
        price: 30,
        quantity: 20,
      });

    const sweetId = createRes.body._id;

    // delete the sweet
    const deleteRes = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe("Sweet deleted successfully");
  });
});
