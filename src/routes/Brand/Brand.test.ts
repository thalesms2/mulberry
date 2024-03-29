import request from "supertest";
import app from "../../app";

jest.setTimeout(100000);
describe("Brand testing", () => {
    test("Create a new brand", () => {
        return request(app)
            .post("/brand")
            .send({ id: 1000, description: "New Brand", userId: 1 })
            .expect(function (res) {
                res.body.brand.id = 1000;
                res.body.brand.description = "New Brand";
                res.body.log.type = "CREATED";
                res.body.log.description = "BRAND 1000 - New Brand CREATED";
                res.body.log.userId = "1";
            })
            .expect(200);
    });
    test("Get all brands", () => {
        return request(app).get("/brand").expect(200);
    });
    test("Edit brand 1000", () => {
        return request(app)
        .put("/brand")
        .send({
            id: 1000,
            description: "Edited Brand",
            userId: 1
        })
        .expect(function (res) {
            res.body.brand.id = 1000
            res.body.brand.description = "Edited Brand"
            res.body.log.type = "EDIT"
            res.body.log.description = "BRAND 1000 EDITED - DESCRIPTION New Brand NEW DESCRIPTION Edited Brand"
            res.body.log.userId = 1
        })
        .expect(200)
    })
    test("Get brand per ID 1000", () => {
        return request(app)
            .get("/brand/1000")
            .expect(function (res) {
                res.body.id = 1000
                res.body.description = "Edited Brand"
            });
    });
    test('Delete a brand', () => {
        return request(app)
        .delete("/brand")
        .send({ id: 1000 })
        .expect(200)
    })
    test("Delete all brands", () => {
        return request(app)
        .delete("/brand/all")
        .expect(200)
    })
});
