"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const http_1 = __importDefault(require("http"));
const controller_1 = require("./controller");
function startServer(port) {
    const server = http_1.default.createServer((req, res) => (0, controller_1.userController)(req, res));
    server.listen(port, () => {
        console.log(`Worker listening on port ${port}`);
    });
}
