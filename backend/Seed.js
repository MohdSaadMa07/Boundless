import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";   // your Mongoose model
import booksArray from "./list.js";    // the array to push

dotenv.config(); // load .env variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

const seedDB = async () => {
  try {
    await Book.deleteMany({});         // Clear existing books
    await Book.insertMany(booksArray); // Insert all books from list.js
    console.log("Books collection seeded successfully!");
  } catch (err) {
    console.log("Error seeding DB:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
