"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const crypto_1 = require("crypto");
const users = [];
exports.userService = {
    getAll: () => users,
    getById: (id) => users.find((user) => user.id === id),
    create: (data) => {
        const newUser = { ...data, id: (0, crypto_1.randomUUID)() };
        users.push(newUser);
        return newUser;
    },
    update: (id, data) => {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1)
            return undefined;
        const updatedUser = { ...data, id };
        users[index] = updatedUser;
        return updatedUser;
    },
    delete: (id) => {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1)
            return false;
        users.splice(index, 1);
        return true;
    },
};
