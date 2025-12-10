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

  const getAll = result.rows.map((row) => ({
    ...row,
    daily_rent_price: Number(row.daily_rent_price),
  }));

  return getAll;
};

const getSingleVehicle = async (id: string | undefined) => {
  const result = await pool.query(
    `
    SELECT * FROM vehicles WHERE id=$1
    `,
    [id]
  );
  if (result.rows.length > 0) {
    result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
  }
  return result;
};

const updateVehicle = async (
  id: string | undefined,
  payload: Record<string, unknown>
) => {
  if (!id) {
    throw new Error("Vehicle ID is required");
  }

  // Build dynamic query
  const fields = Object.keys(payload);
  const values = Object.values(payload);

  if (fields.length === 0) {
    throw new Error("No data provided");
  }

  // create SET field=$1, field=$2, ...
  const setQuery = fields
    .map((field, index) => `${field}=$${index + 1}`)
    .join(", ");

  const query = `
    UPDATE vehicles
    SET ${setQuery}
    WHERE id = $${fields.length + 1}
    RETURNING 
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price::FLOAT AS daily_rent_price,
      availability_status;
  `;

  const result = await pool.query(query, [...values, id]);

  return result;
};

const deleteVehicle = async (id: string | undefined) => {
  const vehicle = await pool.query(
    `
    SELECT * FROM vehicles WHERE id=$1
    `,
    [id]
  );

  if (vehicle.rows[0].availability_status === "booked") {
    throw new Error("Vehicle Booked Now. It can't delete");
  }
  const result = await pool.query(
    `
    DELETE FROM vehicles WHERE id=$1
    `,
    [id]
  );

  return result;
};

export const vehicleService = {
  createVehicel,
  getAllVehicels,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
