"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_service_1 = require("./users.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await users_service_1.userService.getAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users retrieved  successfully",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const userId = req.params.userId;
        if (loggedInUser.role === "customer" && loggedInUser.id != userId) {
            return res.status(403).json({
                success: false,
                message: "You can't update another user. You can update your own profile",
            });
        }
        // By any chance customer give role in the body it will delete automatically
        if (loggedInUser.role === "customer") {
            delete req.body.role;
        }
        const result = await users_service_1.userService.updateUser(req.params.userId, req.body);
        return res.status(200).json({
            success: true,
            message: "User Updated successfully",
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
const deleteUser = async (req, res) => {
    try {
        const result = await users_service_1.userService.deleteUser(req.params.userId);
        return res.status(200).json({
            success: true,
            message: "Vehicle retrieved  successfully",
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
exports.userController = {
    getAllUsers,
    updateUser,
    deleteUser,
};
