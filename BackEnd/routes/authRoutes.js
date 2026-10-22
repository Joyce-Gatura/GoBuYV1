import express from "express";
import { register, login ,logout,deleteAccount,changePassword,} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.post("/change-password", authMiddleware, changePassword);
export default router;