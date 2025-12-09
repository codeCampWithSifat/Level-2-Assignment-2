"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};
const updateUser = async (id, payload) => {
    const { name, email, phone, role } = payload;
    console.log({ name, email, phone, role });
    const result = await db_1.pool.query(`
       UPDATE users
       SET
          name = COALESCE($1, name),
          email = COALESCE(LOWER($2), email),
          phone = COALESCE($3, phone),
          role = COALESCE($4, role)
          WHERE id = $5
      RETURNING id, name, email, phone, role`, [name, email, phone, role, id]);
    return result;
};
const deleteUser = async (id) => {
    console.log("id", id);
};
exports.userService = {
    getAllUsers,
    updateUser,
    deleteUser,
};
