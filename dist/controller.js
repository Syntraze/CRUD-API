"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const service_1 = require("./service");
const utils_1 = require("./utils/utils");
async function userController(req, res) {
    const method = req.method;
    const url = req.url || "";
    const match = url.match(/^\/api\/users\/?([a-zA-Z0-9\-]*)?$/);
    if (!match) {
        return (0, utils_1.sendJson)(res, 404, { message: "Endpoint not found" });
    }
    const userId = match[1];
    try {
        if (method === "GET" && !userId) {
            return (0, utils_1.sendJson)(res, 200, service_1.userService.getAll());
        }
        if (method === "GET" && userId) {
            if (!(0, utils_1.isValidUUID)(userId))
                return (0, utils_1.sendJson)(res, 400, { message: "Invalid UUID" });
            const user = service_1.userService.getById(userId);
            if (!user)
                return (0, utils_1.sendJson)(res, 404, { message: "User not found" });
            return (0, utils_1.sendJson)(res, 200, user);
        }
        if (method === "POST" && !userId) {
            const body = await (0, utils_1.parseBody)(req);
            const { username, age, hobbies } = body;
            if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
                return (0, utils_1.sendJson)(res, 400, { message: "Missing or invalid user data" });
            }
            const newUser = service_1.userService.create({ username, age, hobbies });
            return (0, utils_1.sendJson)(res, 201, newUser);
        }
        if (method === "PUT" && userId) {
            if (!(0, utils_1.isValidUUID)(userId))
                return (0, utils_1.sendJson)(res, 400, { message: "Invalid UUID" });
            const user = service_1.userService.getById(userId);
            if (!user)
                return (0, utils_1.sendJson)(res, 404, { message: "User not found" });
            const body = await (0, utils_1.parseBody)(req);
            const { username, age, hobbies } = body;
            if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
                return (0, utils_1.sendJson)(res, 400, { message: "Missing or invalid user data" });
            }
            const updatedUser = service_1.userService.update(userId, {
                username,
                age,
                hobbies,
            });
            return (0, utils_1.sendJson)(res, 200, updatedUser);
        }
        if (method === "DELETE" && userId) {
            if (!(0, utils_1.isValidUUID)(userId))
                return (0, utils_1.sendJson)(res, 400, { message: "Invalid UUID" });
            const deleted = service_1.userService.delete(userId);
            if (!deleted)
                return (0, utils_1.sendJson)(res, 404, { message: "User not found" });
            res.writeHead(204);
            return res.end();
        }
        (0, utils_1.sendJson)(res, 404, { message: "Endpoint not found" });
    }
    catch (err) {
        (0, utils_1.sendJson)(res, 500, { message: "Internal server error" });
    }
}
exports.userController = userController;
