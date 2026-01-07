import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pizza: Object,
  status: { type: String, default: "Order Received" },
  totalPrice: Number
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
