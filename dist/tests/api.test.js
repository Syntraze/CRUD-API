"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_1 = __importDefault(require("http"));
const controller_1 = require("../controller");
let server;
beforeAll(() => {
    server = http_1.default.createServer((req, res) => (0, controller_1.userController)(req, res));
    server.listen(3000);
});
afterAll((done) => {
    server.close(done);
});
describe("User API", () => {
    let userId;
    it("GET /api/users -> empty array", async () => {
        const res = await (0, supertest_1.default)(server).get("/api/users");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("POST /api/users -> create user", async () => {
        const res = await (0, supertest_1.default)(server)
            .post("/api/users")
            .send({ username: "John", age: 25, hobbies: ["reading"] });
        expect(res.status).toBe(201);
        expect(res.body.username).toBe("John");
        userId = res.body.id;
    });
    it("GET /api/users/:id -> fetch created user", async () => {
        const res = await (0, supertest_1.default)(server).get(`/api/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(userId);
    });
    it("PUT /api/users/:id -> update user", async () => {
        const res = await (0, supertest_1.default)(server)
            .put(`/api/users/${userId}`)
            .send({ username: "Jane", age: 30, hobbies: ["traveling"] });
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("Jane");
    });
    it("DELETE /api/users/:id -> delete user", async () => {
        const res = await (0, supertest_1.default)(server).delete(`/api/users/${userId}`);
        expect(res.status).toBe(204);
    });
    it("GET /api/users/:id -> user not found after delete", async () => {
        const res = await (0, supertest_1.default)(server).get(`/api/users/${userId}`);
        expect(res.status).toBe(404);
    });
});
