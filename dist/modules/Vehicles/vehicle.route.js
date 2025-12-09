"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.createVehicel);
router.get("/", vehicle_controller_1.vehicleController.getAllVehicels);
router.get("/:vehicleId", vehicle_controller_1.vehicleController.getSingleVehicle);
router.put("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateVehicle);
router.delete("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicelRoutes = router;
