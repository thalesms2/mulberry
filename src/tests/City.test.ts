import request from "supertest";
import app from "../app";

jest.setTimeout(100000);
describe("City testing", () => {
    test('Create a new city', () => {
        return request(app)
        .post('/city')
        .send({
            code: 1000,
            name: 'Test city',
            codeState: 'SC',
            userId: 1
        })
        .expect(function (res) {
            console.log(res.body)
            res.body.city.code = 1000
            res.body.city.name = 'Test city'
            res.body.city.statesCode = 'SC'
            res.body.log.type = 'CREATED'
            res.body.log.description = "CITY 1000 - Test city - SC CREATED";
            res.body.log.userId = 1;
        })
    })
    test('Get all citys', () => {
        return request(app)
        .get('/city')
        .expect(200)
    })
    test('Get city per code 1000', () => {
        return request(app)
        .get('/city/1000')
        .expect(function (res) {
            res.body.city.code = 1000
            res.body.city.name = 'Test city'
            res.body.city.statesCode = 'SC'
        })
    })
    test('Delete a city', () => {
        return request(app)
        .delete('/city')
        .send({ code: 1000 })
        .expect(200)
    })
})