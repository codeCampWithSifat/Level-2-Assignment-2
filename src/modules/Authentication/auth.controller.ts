import { Request, Response } from "express";
import { authService } from "./auth.service";

const registeredUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.registeredUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: "User Login Successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  registeredUser,
  loginUser,
};
