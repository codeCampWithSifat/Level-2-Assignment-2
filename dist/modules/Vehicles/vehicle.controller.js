"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicel_service_1 = require("./vehicel.service");
const createVehicel = async (req, res) => {
    try {
        const result = await vehicel_service_1.vehicleService.createVehicel(req.body);
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
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
const getAllVehicels = async (req, res) => {
    try {
        const result = await vehicel_service_1.vehicleService.getAllVehicels();
        return res.status(200).json({
            success: true,
            message: "Vehicle retrieved  successfully",
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
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicel_service_1.vehicleService.getSingleVehicle(req.params?.vehicleId);
        return res.status(200).json({
            success: true,
            message: "Vehicle retrieved  successfully",
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
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicel_service_1.vehicleService.updateVehicle(req.params.vehicleId, req.body);
        return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
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
const deleteVehicle = async (req, res) => {
    try {
        await vehicel_service_1.vehicleService.deleteVehicle(req.params.vehicleId);
        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.vehicleController = {
    createVehicel,
    getAllVehicels,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
