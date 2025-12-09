"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const registeredUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    if (!password || password.length <= 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
    INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3 ,$4, $5) RETURNING *
    `, [name, email, hashPassword, phone, role]);
    delete result.rows[0].password;
    return result;
};
const loginUser = async (payload) => {
    console.log("Login User");
    const { email, password } = payload;
    const isUserExist = await db_1.pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
    if (isUserExist.rows.length === 0) {
        throw new Error("User Not Exists");
    }
    const isMatchedPassword = await bcryptjs_1.default.compare(password, isUserExist.rows[0].password);
    if (!isMatchedPassword) {
        throw new Error("Password Not Matched");
    }
    const jwtPayload = {
        id: isUserExist.rows[0].id,
        name: isUserExist.rows[0].name,
        email: isUserExist.rows[0].email,
        role: isUserExist.rows[0].role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtSecret, {
        expiresIn: "7d",
    });
    const user = isUserExist.rows[0];
    delete user.password;
    return { token, user };
};
exports.authService = {
    registeredUser,
    loginUser,
};
