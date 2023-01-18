import request from "supertest";
import app from "../app";

describe("Brand testing", () => {
    test("Get all brands", () => {
        return request(app)
            .get("/brand")
            .expect(200)
    });
    test("Get brand per ID 1", () => {
        return request(app)
            .get("/brand/28")
            .then(response => {
                expect(response.body).toStrictEqual({"id":28,"description":"Adsomos"})
            })
    })
});
