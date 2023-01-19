import request from "supertest";
import app from "../app";

jest.setTimeout(100000);
describe("Brand testing", () => {
    test("Get all brands", () => {
        return request(app).get("/brand").expect(200);
    });
    test("Get brand per ID 1", () => {
        return request(app)
            .get("/brand/28")
            .then((response) => {
                expect(response.body).toStrictEqual({
                    id: 28,
                    description: "Adsomos",
                });
            });
    });
    test("Create a new brand", async () => {
        return request(app)
            .post("/brand")
            .send({ id: 1, description: "New Brand", userId: 1 })
            .expect(function (res) {
                console.log(res.body.brand)
                res.body.brand.id = 1;
                res.body.brand.description = "New brand";
                res.body.log.type = "CREATED";
                res.body.log.description = "BRAND 1 - New brand CREATED";
                res.body.log.userId = "1";
            })
            .expect(200);
    });
});
