import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    pizza: {
      type: Object,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Order Received",
        "In Kitchen",
        "Out for Delivery",
        "Delivered"
      ],
      default: "Order Received"
    },

    totalPrice: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING"
    },

    paymentId: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
