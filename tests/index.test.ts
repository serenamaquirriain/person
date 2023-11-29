import app from "../src/app";
import request from "supertest";

describe("GET /persons",  ()=> {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/persons").send();
        expect(response.statusCode).toBe(200);
    })
})

describe("POST /persons", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/persons").send();
        expect(response.statusCode).toBe(200);
    })
    
})