import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const getVehicle = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status 
     FROM vehicles 
     WHERE id=$1`,
    [vehicle_id]
  );

  if (getVehicle.rows.length === 0) {
    throw new Error("Vehicles Not Found");
  }

  if (getVehicle.rows[0].availability_status === "booked") {
    throw new Error("Vehicle Booked Already");
  }

  const startDate = new Date(rent_start_date as Date);
  const endDate = new Date(rent_end_date as Date);

  const difference = endDate.getTime() - startDate.getTime();

  const rentCount = difference / (1000 * 60 * 60 * 24);

  if (rentCount <= 0) {
    throw new Error("End Date Must Bigger than start date");
  }

  const total_price = rentCount * getVehicle.rows[0].daily_rent_price;

  const result = await pool.query(
    `
    INSERT INTO bookings(
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status
    ) VALUES($1, $2, $3, $4, $5, 'active') RETURNING *    
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const booking = result.rows[0];
  await pool.query(
    `
    UPDATE vehicles SET availability_status='booked' WHERE id=$1
    `,
    [vehicle_id]
  );

  return {
    ...booking,
    total_price: Number(booking.total_price),
    vehicle: {
      vehicle_name: getVehicle.rows[0].vehicle_name,
      daily_rent_price: getVehicle.rows[0].daily_rent_price,
    },
  };
};

const getBookingUserAndAdminView = async (user: JwtPayload) => {
  if (user.role === "admin") {
    const adminResult = await pool.query(
      `
      SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        CAST(b.total_price AS FLOAT) AS total_price, 
        b.status,
        json_build_object(
          'name', u.name,
          'email', u.email
        ) AS customer,
        json_build_object(
          'vehicle_name', v.vehicle_name,
          'registration_number', v.registration_number
        ) AS vehicle
      FROM bookings b
      JOIN users u ON u.id = b.customer_id
      JOIN vehicles v ON v.id = b.vehicle_id
      ORDER BY b.id DESC
      `
    );

    return adminResult.rows;
  }

  // CUSTOMER VIEW
  const customerResult = await pool.query(
    `
    SELECT 
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      CAST(b.total_price AS FLOAT) AS total_price,
      b.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number,
        'type', v.type
      ) AS vehicle
    FROM bookings b
    JOIN vehicles v ON v.id = b.vehicle_id
    WHERE b.customer_id = $1
    ORDER BY b.id DESC
    `,
    [user.id]
  );

  return customerResult.rows;
};

export const bookingService = {
  createBooking,
  getBookingUserAndAdminView,
};
