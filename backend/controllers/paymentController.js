import mongoose from "mongoose";
import { createMockOrder, verifyMockPayment } from "../utils/mockRazorpay.js";
import Order from "../models/Order.js";

export const createPaymentOrder = async (req, res) => {
  const { amount } = req.body;

  const order = createMockOrder(amount);

  res.json({
    razorpayOrder: order,
    mock: true
  });
};

export const confirmPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // 1️⃣ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        msg: "Invalid MongoDB order ID"
      });
    }

    // 2️⃣ Find order
    const order = await Order.findById(orderId);

    // 3️⃣ If order not found
    if (!order) {
      return res.status(404).json({
        msg: "Order not found"
      });
    }

    // 4️⃣ Mock payment success
    const payment = verifyMockPayment();

    order.paymentStatus = "PAID";
    order.status = "Order Received";
    order.paymentId = payment.paymentId;

    await order.save();

    res.json({
      msg: "Payment successful (mock)",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};