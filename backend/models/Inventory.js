import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  bases: Number,
  sauces: Number,
  cheese: Number,
  veggies: Number
});

export default mongoose.model("Inventory", inventorySchema);
