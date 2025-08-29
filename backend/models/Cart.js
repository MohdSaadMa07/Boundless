import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // Changed from ObjectId to String
  quantity: { type: Number, default: 1 },
  name: { type: String, required: true },      // Store book details directly
  price: { type: Number, required: true },
  image: { type: String },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
}, {
  timestamps: true // Add created/updated timestamps
});

export default mongoose.model("Cart", cartSchema);