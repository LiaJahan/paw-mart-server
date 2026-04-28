import express from "express";
import Listing from "../models/Listing.js";

const router = express.Router();


// ➕ CREATE listing
router.post("/", async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create listing" });
  }
});


// 📥 GET listings (with filters + limit)
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

    // limit support (for recent listings)
    if (req.query.limit) {
      queryBuilder = queryBuilder.limit(Number(req.query.limit));
    }

    const listings = await queryBuilder;

    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});


// ✏️ UPDATE listing
router.put("/:id", async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});


// ❌ DELETE listing (with basic ownership check)
router.delete("/:id", async (req, res) => {
  try {
    const { email } = req.query;

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.email !== email) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});


export default router;