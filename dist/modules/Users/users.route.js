"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)("admin"), users_controller_1.userController.getAllUsers);
router.put("/:userId", (0, auth_1.default)("admin", "customer"), users_controller_1.userController.updateUser);
router.delete("/:userId", (0, auth_1.default)("admin"), users_controller_1.userController.deleteUser);
exports.userRoutes = router;
