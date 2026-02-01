
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Listing from "./models/Listing.js";
import listingsRouter from "./routes/listings.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://pawMartUser:ShEcFYfAfM8rZPdl@cluster0.ph8mefq.mongodb.net/paw-mart?retryWrites=true&w=majority"
)

.then(() => console.log("MongoDB connected perfectly"))
.catch(err => console.log(err));


app.use("/listings", listingsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
