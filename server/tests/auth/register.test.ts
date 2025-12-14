import request from "supertest";
import app from "../../src/app";
 


describe("POST /auth/register", () => {
    // Test case for user registration
    
    it("should register a new user", async () => {
        const email = `test${Date.now()}@test.com`;
        const response = await request(app)
            .post("/auth/register")
            .send({
                email: email,
                password: "password123"
            })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("email");
        expect(response.body.email).toBe(email);

    })
    // Test case for duplicate email registration
    it("should return 400 if same email is used", async ()=>{

        const email = `test${Date.now()}@test.com`;
        await request(app).post("/auth/register")
            .send({
                email:email,
                password: "password123"
            })

        
        const response = await request(app).post("/auth/register")
            .send({
                email: email,
                password: "password123"
            })
          
            expect(response.status).toBe(400);  
    })

})

 