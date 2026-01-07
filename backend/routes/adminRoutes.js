import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/adminController.js";
import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Admin routes
router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id", protect, adminOnly, updateOrderStatus);

export default router;
