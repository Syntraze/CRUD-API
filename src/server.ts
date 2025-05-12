
import http from "http";
import { userController } from "./controller";

export function startServer(port: number) {
  const server = http.createServer((req, res) => userController(req, res));
  server.listen(port, () => {
    console.log(`Worker listening on port ${port}`);
  });
}
