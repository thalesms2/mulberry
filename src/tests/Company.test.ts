import request from "supertest";
import app from "../app";

jest.setTimeout(100000);
describe("Company testing", () => {
    test("Create a new company", () => {
        return request(app)
            .post("/company")
            .send({ id: 1000, name: "Test Company", userId: 1 })
            .expect(function (res) {
                res.body.company.id = 1000
                res.body.company.name = "Test Company"
                res.body.log.type = "CREATED";
                res.body.log.description = "COMPANY 1000 - Test Company CREATED";
                res.body.log.userId = "1";
            })
            .expect(200);
    });
    test("Get all companys", () => {
        return request(app).get("/company").expect(200);
    });
    test("Get company per ID 1000", () => {
        return request(app)
            .get("/company/1000")
            .expect(200);
    });
    test('Delete a company', () => {
        return request(app)
        .delete("/company")
        .send({ id: 1000 })
        .expect(200)
    })
});
