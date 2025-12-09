"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const registeredUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.registeredUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.loginUser(req.body);
        return res.status(200).json({
            success: true,
            message: "User Login Successfully",
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
exports.authController = {
    registeredUser,
    loginUser,
};
