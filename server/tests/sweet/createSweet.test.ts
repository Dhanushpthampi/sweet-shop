import request from "supertest";
import app from "../../src/app";

describe("POST /api/sweets", () => {
  it("should allow admin to create a sweet", async () => {
    // login as existing admin
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "secretPassword",
      });

    const token = loginRes.body.token;
    const sweetName =`Gulab Jamun ${Date.now()}`;
    // create sweet
    const response = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: sweetName,
        category: "Indian",
        price: 50,
        quantity: 100,
        imageUrl:
          "https://media.istockphoto.com/id/163064596/photo/gulab-jamun.jpg",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", sweetName);
    expect(response.body).toHaveProperty("category", "Indian");
  });
});
