import express from "express";
const router = express.Router();

// Example route
router.post("/", async (req, res) => {
  res.send({ message: "Listing received" });
});

export default router;  // ✅ default export
