import { Request, Response } from "express";
import { userService } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved  successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user as JwtPayload;
    const userId = req.params.userId;
    if (loggedInUser.role === "customer" && loggedInUser.id != userId) {
      return res.status(403).json({
        success: false,
        message:
          "You can't update another user. You can update your own profile",
      });
    }
    // By any chance customer give role in the body it will delete automatically
    if (loggedInUser.role === "customer") {
      delete req.body.role;
    }
    const result = await userService.updateUser(req.params.userId, req.body);
    return res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.userId);
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved  successfully",
      data: {},
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
