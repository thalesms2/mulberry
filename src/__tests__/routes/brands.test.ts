import {describe, expect, it, jest} from '@jest/globals';
import { request } from 'https';
import test from 'node:test';

import brand from '../../routes/Brands';

describe('server.ts tests', () => {
    test("Math test", () => {
        expect(2 + 2).toBe(4)
    })
})

describe('Brand test', () => {
    test("Get all brand", async () => {
        const res = await request(brand).get("")
    })
})