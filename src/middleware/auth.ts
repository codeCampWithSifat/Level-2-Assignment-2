import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(500).json({
          success: false,
          message: "You are not allowed!!",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;

      const user = await pool.query(
        `
      SELECT * FROM users WHERE email=$1
      `,
        [decoded.email]
      );
      if (user.rows.length === 0) {
        throw new Error("User not found!");
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          success: false,
          error: "unauthorized!!!",
        });
      }
      next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
