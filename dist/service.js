"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// service.ts
const db_1 = require("./db");
const crypto_1 = require("crypto");
exports.userService = {
    getAll: () => db_1.users,
    getById: (id) => db_1.users.find((user) => user.id === id),
    create: (data) => {
        const newUser = { ...data, id: (0, crypto_1.randomUUID)() };
        db_1.users.push(newUser);
        return newUser;
    },
    update: (id, data) => {
        const index = db_1.users.findIndex((user) => user.id === id);
        if (index === -1)
            return undefined;
        const updatedUser = { ...data, id };
        db_1.users[index] = updatedUser;
        return updatedUser;
    },
    delete: (id) => {
        const index = db_1.users.findIndex((user) => user.id === id);
        if (index === -1)
            return false;
        db_1.users.splice(index, 1);
        return true;
    },
};
