import {describe, expect, it, jest} from '@jest/globals';
import request from "supertest";

import app from "../app";

describe("Test app.js", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/");
        expect(res.body).toEqual({message: "Hello World!"})
    });
});
