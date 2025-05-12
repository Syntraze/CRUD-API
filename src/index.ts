
import * as http from "http";
import { userController } from "./controller";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/api/users")) {
    userController(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
  }
});

server.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
