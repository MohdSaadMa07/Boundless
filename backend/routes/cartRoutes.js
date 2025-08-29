import express from "express";
import {
  getCartItems,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCartItems);
router.post("/add", addToCart);
router.delete("/delete/:userId/:itemId", removeFromCart);

export default router;
