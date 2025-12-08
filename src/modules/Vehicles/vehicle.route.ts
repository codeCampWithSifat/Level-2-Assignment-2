import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin"), vehicleController.createVehicel);
router.get("/", vehicleController.getAllVehicels);
export const vehicelRoutes = router;
