import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
    it("should register a new user", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                email: "test@test.com",
                password: "password123"
            })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("email");
        expect(response.body.email).toBe("test@test.com");

    })

})