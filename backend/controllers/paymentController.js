// paymentController.js
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount in smallest currency unit, e.g., paisa

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr", // change if needed
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
