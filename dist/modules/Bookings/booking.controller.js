"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.createBooking(req.body);
        console.log("Booking", result);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: {},
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
};
