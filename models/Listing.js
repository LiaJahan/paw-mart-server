import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  location: String,
  description: String,
  image: String,
  email: String,
  date: String,
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
