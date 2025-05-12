// controller.ts
import * as http from "http";
import { userService } from "./service";
import { isValidUUID, parseBody, sendJson } from "./utils/utils";

export async function userController(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const method = req.method;
  const url = req.url || "";
  const match = url.match(/^\/api\/users\/?([a-zA-Z0-9\-]*)?$/);

  if (!match) {
    return sendJson(res, 404, { message: "Endpoint not found" });
  }

  const userId = match[1];

  try {
    if (method === "GET" && !userId) {
      return sendJson(res, 200, userService.getAll());
    }

    if (method === "GET" && userId) {
      if (!isValidUUID(userId))
        return sendJson(res, 400, { message: "Invalid UUID" });
      const user = userService.getById(userId);
      if (!user) return sendJson(res, 404, { message: "User not found" });
      return sendJson(res, 200, user);
    }


    sendJson(res, 404, { message: "Endpoint not found" });
  } catch (err) {
    sendJson(res, 500, { message: "Internal server error" });
  }
}
