// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth.jsx";
import Home from "./components/home/Home.jsx";
import Collections from "./components/collections/Collections.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import Visit from "./components/Visit.jsx";
import Navbar from "./components/Navbar.jsx"; // Assuming you have a Navbar component

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    // ✅ You MUST wrap your Routes (and usually Navbar) with BrowserRouter
    <BrowserRouter>
      {/* Navbar should typically be inside BrowserRouter too if it uses Link */}
      <Navbar /* Add any necessary props like user, cartCount, onCartClick, openLogin here */ />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/collections" element={<Collections user={user} cart={cart} setCart={setCart} />} />
        <Route path="/visitus" element={<Visit />} /> {/* This route is correct */}
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/checkoutPage" element={<CheckoutPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}