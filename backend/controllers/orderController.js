import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";

export const placeOrder = async (req, res) => {
  try {
    const { pizza, totalPrice } = req.body;

    const inventory = await Inventory.findOne();

    if (!inventory || inventory.bases <= 0)
      return res.status(400).json({ msg: "Out of stock" });

    inventory.bases--;
    inventory.sauces--;
    inventory.cheese--;
    inventory.veggies--;

    await inventory.save();

    const order = await Order.create({
      user: req.user._id,
      pizza,
      totalPrice
    });

    res.json({ msg: "Order placed", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
