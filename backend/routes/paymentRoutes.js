import express from "express";
import { createPaymentOrder, confirmPayment } from "../controllers/paymentController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createPaymentOrder);
router.post("/confirm", protect, confirmPayment);

export default router;
