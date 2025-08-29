import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add multiple books (bulk insert) → useful for your JSON migration
router.post("/seed", async (req, res) => {
  try {
    await Book.deleteMany(); // optional, clears old books
    const books = await Book.insertMany(req.body);
    res.json({ message: "Books seeded!", books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
