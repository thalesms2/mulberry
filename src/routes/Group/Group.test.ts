import request from "supertest"
import app from "../../app"

jest.setTimeout(100000)

describe("Group testing", () => {
    test("Create a new group", () => {
        return request(app)
        .post("/group")
        .send({ id: 1000, description: "New group", userId: 1 })
        .expect(function (res) {
            res.body.group.id = 1000
            res.body.group.description = "New group"
            res.body.log.type = "CREATE"
            res.body.log.description = "GROUP 1000 - New group CREATED"
            res.body.log.userId = 1
        })  
        .expect(200)
    })
    test("Get all groups", () => {
        return request(app).get("/group").expect(200)
    })
    test("Get brand per ID 1000", () => {
        return request(app)
        .get("/group/1000")
        .expect(function (res) {
            res.body.id = 1000
            res.body.description = "New group"
        })
    })
    test("Delete a group", () => {
        return request(app)
        .delete("/group")
        .send({ id: 1000 })
        .expect(200)
    })
})