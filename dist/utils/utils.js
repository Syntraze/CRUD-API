"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = exports.sendJson = exports.isValidUUID = void 0;
function isValidUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
exports.isValidUUID = isValidUUID;
function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
exports.sendJson = sendJson;
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            }
            catch {
                reject(new Error("Invalid JSON"));
            }
        });
    });
}
exports.parseBody = parseBody;
