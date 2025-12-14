import request from "supertest";
import app from "../../src/app";

describe("POST /api/auth/login", () => {
    // Test case for user login
    it("should login an existing user", async () => {
        const email = `test${Date.now()}@test.com`;
        const password = "password123";

        // First, register the user
        await request(app)
            .post("/api/auth/register")
            .send({
                email: email,
                password: password
            });

        // Then, attempt to login
        const response = await request(app)
            .post("/api/auth/login").send({
                email: email,
                password: password,
            });


            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
    });

    it("should not accept wrong password", async () => {
        const email = `test${Date.now()}@test.com`;
        const password = "password123";

        // First, register the user
        await request(app)
            .post("/api/auth/register")
            .send({
                email: email,
                password: password
            });

        // Then, attempt to login with wrong password
        const response = await request(app)
            .post("/api/auth/login").send({
                email: email,
                password: "wrongpassword",
            });

        expect(response.status).toBe(401);
    });
});
 