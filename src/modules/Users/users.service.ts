import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const updateUser = async (
  id: string | undefined,
  payload: Record<string, unknown>
) => {
  const { name, email, phone, role } = payload;
  console.log({ name, email, phone, role });

  const result = await pool.query(
    `
       UPDATE users
       SET
          name = COALESCE($1, name),
          email = COALESCE(LOWER($2), email),
          phone = COALESCE($3, phone),
          role = COALESCE($4, role)
          WHERE id = $5
      RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id]
  );

  return result;
};

const deleteUser = async (id: string | undefined) => {
  console.log("id", id);
};
export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
