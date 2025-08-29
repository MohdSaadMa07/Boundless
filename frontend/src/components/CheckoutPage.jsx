// components/CheckoutPage.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = ({ user }) => {
  const location = useLocation();
  const { amount } = location.state || {};

  if (!amount) {
    return <div>No checkout amount specified. Please go back to your cart.</div>;
  }

  // ✅ Add the 'mode' and 'currency' options here
  const options = {
    mode: 'payment', // Required for a one-time payment
    amount: amount,
    currency: 'usd',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm user={user} amount={amount} />
    </Elements>
  );
};

export default CheckoutPage;