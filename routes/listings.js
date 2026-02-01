import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  res.send({ message: "Listing received" });
});

export default router;