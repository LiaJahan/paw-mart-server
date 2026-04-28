import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: "Failed to create listing" });
  }
});

// GET (with filter + limit)
router.get("/", async (req, res) => {
  try {
    const query = {};

    // filter by email
    if (req.query.email) {
      query.email = req.query.email;
    }

    // filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    let queryBuilder = Listing.find(query);

    // limit
    if (req.query.limit) {
      queryBuilder = queryBuilder.limit(Number(req.query.limit));
    }

    const listings = await queryBuilder;

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE (with owner check)
router.delete("/:id", async (req, res) => {
  try {
    const { email } = req.query;

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Not found" });
    }

    if (listing.email !== email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;