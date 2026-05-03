import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  buyerName: String,
  email: String,
  quantity: Number,
  price: Number,
  address: String,
  phone: String,
  date: String,
  additionalNotes: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;