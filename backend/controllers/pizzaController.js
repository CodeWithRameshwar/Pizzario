import Pizza from "../models/Pizza.js";

export const createPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json({ msg: "Pizza added", pizza });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true });
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
