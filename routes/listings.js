// server/routes/listings.js
import express from "express";
import Listing from "../models/listingModel.js";

const router = express.Router();

// POST /listings — Add new listing
router.post("/", async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
