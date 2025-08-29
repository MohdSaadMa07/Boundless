import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Collection from "../Collection";
import Auth from "../Auth";
import CartSidebar from "../CartSidebar"; 
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addToCart as addToCartAPI, getCart } from "../../api/addCartApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY_HERE");

const Collections = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const data = await getCart(currentUser.uid);
          setCart(data.items || []);
        } catch (error) {
          console.error("Failed to fetch cart on login:", error);
          setCart([]);
        }
      } else {
        setCart([]);
        setCartOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loginModal = {
    open: () => setShowAuth(true),
    close: () => setShowAuth(false),
  };

  const addToCart = async (book) => {
    if (!user) {
      loginModal.open();
      return;
    }
    try {
      const updatedCart = await addToCartAPI(user.uid, book);
      setCart(updatedCart.items || []);
      alert(`${book.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      loginModal.open();
      return;
    }
    setCartOpen(true);
  };

  return (
    <>
      <Navbar
        openLogin={loginModal}
        user={user}
        cartCount={cart.length}
        onCartClick={handleCartClick}
      />

      <Collection 
        user={user} 
        openLogin={loginModal.open} 
        addToCart={addToCart} 
      />

      <Footer />

      {showAuth && (
        <div
          onClick={() => setShowAuth(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "350px",
              maxWidth: "90%",
            }}
          >
            <Auth onSuccess={loginModal.close} />
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <Elements stripe={stripePromise}>
          <CartSidebar
            user={user}
            cart={cart}
            setCart={setCart}
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          />
        </Elements>
      )}
    </>
  );
};

export default Collections;
