"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.createBooking(req.body);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getBookingUserAndAdminView = async (req, res) => {
    try {
        const user = req.user;
        const result = await booking_service_1.bookingService.getBookingUserAndAdminView(user);
        return res.status(200).json({
            success: true,
            message: user.role === "admin"
                ? "Bookings retrieved successfully"
                : "Your bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getBookingUserAndAdminView,
};
