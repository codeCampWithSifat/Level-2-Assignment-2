import express from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);

router.get(
  "/",
  auth("admin", "customer"),
  bookingController.getBookingUserAndAdminView
);

export const bookingRoutes = router;
