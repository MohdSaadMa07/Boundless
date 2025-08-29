import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();

// The path has been changed from "/create-payment-intent" to "/create"
router.post("/create", createPaymentIntent);

export default router;