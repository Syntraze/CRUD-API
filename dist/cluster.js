"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const http_1 = __importDefault(require("http"));
const server_1 = require("./server");
const PORT = 4000;
const numCPUs = os_1.default.availableParallelism?.() || os_1.default.cpus().length;
const workerPorts = Array.from({ length: numCPUs - 1 }, (_, i) => PORT + 1 + i);
if (cluster_1.default.isPrimary) {
    let currentWorker = 0;
    for (let i = 0; i < workerPorts.length; i++) {
        cluster_1.default.fork({ PORT: workerPorts[i] });
    }
    const balancer = http_1.default.createServer((req, res) => {
        const targetPort = workerPorts[currentWorker];
        const proxy = http_1.default.request({
            hostname: "localhost",
            port: targetPort,
            path: req.url,
            method: req.method,
            headers: req.headers,
        }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
            proxyRes.pipe(res);
        });
        req.pipe(proxy);
        proxy.on("error", (err) => {
            res.writeHead(502);
            res.end("Bad Gateway");
        });
        currentWorker = (currentWorker + 1) % workerPorts.length;
    });
    balancer.listen(PORT, () => {
        console.log(`Load balancer listening on port ${PORT}`);
    });
}
else {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : PORT + 1;
    (0, server_1.startServer)(port);
}
