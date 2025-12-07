import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const registeredUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  if (!password || (password as string).length <= 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const hashPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3 ,$4, $5) RETURNING *
    `,
    [name, email, hashPassword, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

const loginUser = async (payload: Record<string, unknown>) => {
  console.log("Login User");
  const { email, password } = payload;

  const isUserExist = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );
  if (isUserExist.rows.length === 0) {
    throw new Error("User Not Exists");
  }
  const isMatchedPassword = await bcrypt.compare(
    password as string,
    isUserExist.rows[0].password
  );

  if (!isMatchedPassword) {
    throw new Error("Password Not Matched");
  }

  const jwtPayload = {
    id: isUserExist.rows[0].id,
    name: isUserExist.rows[0].name,
    email: isUserExist.rows[0].email,
    role: isUserExist.rows[0].role,
  };

  const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
    expiresIn: "7d",
  });
  const user = isUserExist.rows[0];
  delete user.password;

  return { token, user };
};

export const authService = {
  registeredUser,
  loginUser,
};
