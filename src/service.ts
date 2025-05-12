// service.ts
import { users } from "./db";
import { User } from "./utils/user.interface";
import { randomUUID } from "crypto";



export const userService = {
  getAll: (): User[] => users,

  getById: (id: string): User | undefined =>
    users.find((user) => user.id === id),

  create: (data: Omit<User, "id">): User => {
    const newUser: User = { ...data, id: randomUUID() };
    users.push(newUser);
    return newUser;
  },

  update: (id: string, data: Omit<User, "id">): User | undefined => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    const updatedUser = { ...data, id };
    users[index] = updatedUser;
    return updatedUser;
  },

  delete: (id: string): boolean => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};
