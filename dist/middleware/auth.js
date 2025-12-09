"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = require("../config/db");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(500).json({
                    success: false,
                    message: "You Have No Token",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            const user = await db_1.pool.query(`
      SELECT * FROM users WHERE email=$1
      `, [decoded.email]);
            if (user.rows.length === 0) {
                throw new Error("User not found!");
            }
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(401).json({
                    success: false,
                    error: "unauthorized!!!",
                });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    };
};
exports.default = auth;
