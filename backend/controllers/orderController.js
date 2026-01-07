import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { pizza, totalPrice } = req.body;

    const order = new Order({
      user: req.user._id,
      pizza,
      totalPrice
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
