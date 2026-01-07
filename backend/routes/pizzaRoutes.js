import express from "express";
import { createPizza, getPizzas } from "../controllers/pizzaController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, createPizza);   // admin later
router.get("/", getPizzas);

export default router;
