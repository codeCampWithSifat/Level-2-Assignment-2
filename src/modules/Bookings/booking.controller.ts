import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.message,
    });
  }
};

const getBookingUserAndAdminView = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    const result = await bookingService.getBookingUserAndAdminView(user);
    return res.status(200).json({
      success: true,
      message:
        user.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const user = req.user as JwtPayload;
    const result = await bookingService.updateBooking(
      bookingId,
      user,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: result?.message,
      data: {
        ...result?.booking,
        ...(result?.vehicle ? { vehicle: result.vehicle } : {}),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      errors: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookingUserAndAdminView,
  updateBooking,
};
