"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./modules/Authentication/auth.route");
const db_1 = __importDefault(require("./config/db"));
const vehicle_route_1 = require("./modules/Vehicles/vehicle.route");
const users_route_1 = require("./modules/Users/users.route");
const booking_route_1 = require("./modules/Bookings/booking.route");
const app = (0, express_1.default)();
// use the middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database initialize
(0, db_1.default)();
// Auth Api
app.use("/api/v1/auth", auth_route_1.authRoutes);
// Vehicle Api
app.use("/api/v1/vehicles", vehicle_route_1.vehicelRoutes);
// Users Api
app.use("/api/v1/users", users_route_1.userRoutes);
// Bookings Api
app.use("/api/v1/bookings", booking_route_1.bookingRoutes);
app.get("/", (req, res) => {
    res.send("Hello Level-2 Assignment-2 ...");
});
exports.default = app;
