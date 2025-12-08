import { pool } from "../../config/db";

const createVehicel = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name, type,registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  const row = result.rows[0];
  row.daily_rent_price = Number(row.daily_rent_price);

  return { rows: [row] };
};

const getAllVehicels = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

export const vehicleService = {
  createVehicel,
  getAllVehicels,
};
