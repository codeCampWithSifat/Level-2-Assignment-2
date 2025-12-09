import { Request, Response } from "express";
import { vehicleService } from "./vehicel.service";

const createVehicel = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicel(req.body);
    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVehicels = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicels();
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved  successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getSingleVehicle(req.params?.vehicleId);
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved  successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateVehicle(
      req.params.vehicleId,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await vehicleService.deleteVehicle(req.params.vehicleId);
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleController = {
  createVehicel,
  getAllVehicels,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
