import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_string}`,
});

const initDataBase = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(20),
        role VARCHAR(20) NOT NULL
        )
        `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
    )
    `);
};

export default initDataBase;
