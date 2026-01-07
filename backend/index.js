import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import pizzaRoutes from "./routes/pizzaRoutes.js";


import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import protect from "./middlewares/authMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pizzas", pizzaRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/admin", adminRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Pizza API Running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ msg: "Protected access granted", user: req.user });
});

app.listen(5000, () => console.log("Server started on port 5000"));
