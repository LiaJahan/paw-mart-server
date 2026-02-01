// server/models/listingModel.js
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  email: { type: String, required: true },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
