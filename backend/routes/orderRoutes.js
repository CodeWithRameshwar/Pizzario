import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "Order route working" });
});

export default router;
