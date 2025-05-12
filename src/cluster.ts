import cluster from "cluster";
import os from "os";
import http from "http";
import { startServer } from "./server";

const PORT = 4000;
const numCPUs = os.availableParallelism?.() || os.cpus().length;
const workerPorts = Array.from({ length: numCPUs - 1 }, (_, i) => PORT + 1 + i);

if (cluster.isPrimary) {
  let currentWorker = 0;

  // Fork workers
  for (let i = 0; i < workerPorts.length; i++) {
    cluster.fork({ PORT: workerPorts[i] });
  }

  // Load balancer on PORT
  const balancer = http.createServer((req, res) => {
    const targetPort = workerPorts[currentWorker];
    const proxy = http.request(
      {
        hostname: "localhost",
        port: targetPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

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
} else {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : PORT + 1;
  startServer(port);
}
