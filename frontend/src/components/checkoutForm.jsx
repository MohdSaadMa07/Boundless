// components/CheckoutForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ user, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Clear previous success messages

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again.");
      return;
    }

    setLoading(true);
    try {
      // 1. Call backend to create PaymentIntent
      // Ensure your backend server is running on http://localhost:5000
      const { data } = await axios.post("http://localhost:5000/api/payment/create", {
        amount, // This amount should already be in cents from CartSidebar
        userId: user ? user.uid : null, // Pass userId if available, handle guest checkout if applicable
      });

      const clientSecret = data.clientSecret;

      // 2. Confirm the card payment using CardElement
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Collect billing details if required, e.g., name, email
            // name: user ? user.displayName : 'Guest Customer',
            // email: user ? user.email : 'guest@example.com',
          },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
        // Here you would typically:
        // - Clear the user's cart
        // - Redirect to a success page
        // - Show a success message and order details
        console.log("Payment Succeeded!", result.paymentIntent);
        // Example: navigate('/order-confirmation', { state: { paymentIntentId: result.paymentIntent.id } });
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      // More detailed error handling for network or backend issues
      setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Complete Your Purchase</h2>
        <p style={styles.amountDisplay}>
          Paying: **₹{(amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}**
        </p>

        {/* Card Element - Styled for better appearance */}
        <div style={styles.cardElementWrapper}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        <button type="submit" disabled={!stripe || loading} style={styles.payButton}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Feedback Messages */}
        {error && <div style={styles.errorMessage}>Error: {error}</div>}
        {success && <div style={styles.successMessage}>Payment Successful! Thank you for your order.</div>}
      </form>
    </div>
  );
};

// Custom styling for CardElement to match the overall theme
const CARD_ELEMENT_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#32325d',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
      ':-webkit-autofill': {
        color: '#fce883',
      },
    },
    invalid: {
      iconColor: '#fa755a',
      color: '#fa755a',
    },
  },
};

// --- Inline Styles for the CheckoutForm Component ---
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa', // Light background
    padding: '20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '450px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    fontFamily: 'Inter, sans-serif', // Modern font
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '2rem', // Larger title
    color: '#343a40', // Darker text for title
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '700', // Bolder title
  },
  amountDisplay: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#007bff', // Blue to highlight amount
    textAlign: 'center',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#e9f5ff',
    borderRadius: '8px',
  },
  cardElementWrapper: {
    border: '1px solid #ced4da', // Light border
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#fdfdfe',
    transition: 'border-color 0.3s ease-in-out',
  },
  payButton: {
    padding: '15px 25px',
    backgroundColor: '#28a745', // Green for payment
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.2)',
  },
  payButtonHover: { // For hover effect
    backgroundColor: '#218838',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(40, 167, 69, 0.3)',
  },
  payButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'translateY(0)',
  },
  errorMessage: {
    color: '#dc3545', // Red for errors
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '0.9rem',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '5px',
    padding: '10px',
  },
  successMessage: {
    color: '#28a745', // Green for success
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '0.9rem',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    padding: '10px',
  },
};

export default CheckoutForm;