import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import listingsRouter from "./routes/listings.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", ordersRouter);
app.use("/listings", listingsRouter);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected perfectly"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));