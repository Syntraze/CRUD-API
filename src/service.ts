// service.ts
import { User } from "./utils/user.interface";
import { randomUUID } from "crypto";

const users: User[] = [];

export const userService = {
  getAll: (): User[] => users,

  getById: (id: string): User | undefined =>
    users.find((user) => user.id === id),


};
