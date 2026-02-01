// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Listing from "./models/Listing.js";
import listingsRouter from "./routes/listings.js"; // ✅ only once

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://pawMartUser:ShEcFYfAfM8rZPdl@cluster0.ph8mefq.mongodb.net/paw-mart?retryWrites=true&w=majority"
)

.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log(err));



// Routes
app.use("/listings", listingsRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
