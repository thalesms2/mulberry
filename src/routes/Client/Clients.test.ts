import request from "supertest";
import app from "../../app";

jest.setTimeout(100000);
// describe("Client testing", () => {
//     test("Create a new client", () => {
//         return request(app)
//             .post("/brand")
//             .expect(200);
//     });
//     test("Get all clients", () => {
//         return request(app).get("/client").expect(200);
//     });
//     test("Get client per ID 1000", () => {
//         return request(app)
//             .get("/client/1000")
//             .expect(200);
//     });
//     test('Delete a client', () => {
//         return request(app)
//         .delete("/client")
//         .send({ id: 1000 })
//         .expect(200)
//     })
// });
