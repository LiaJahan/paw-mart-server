import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE order
router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch {
    res.status(500).json({ message: "Failed to create order" });
  }
});

// GET orders by email
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    const orders = await Order.find({ email });

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;