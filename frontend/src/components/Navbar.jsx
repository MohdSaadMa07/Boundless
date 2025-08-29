import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar({ openLogin, cartCount = 0, onCartClick }) {
  const [user, setUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", objectFit: "contain", transition: "transform 0.3s" }}
        />
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        {["Home", "Collections", "Visit Us", "About"].map((text, idx) => (
          <Link
            key={idx}
            to={text === "Home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`}
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: 500,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1e90ff")}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            {text}
          </Link>
        ))}

        {/* Cart */}
        <button
        onClick={user ? onCartClick : openLogin?.open} // ✅ works now
        style={{
          padding: "6px 14px",
          border: "none",
          borderRadius: "20px",
          backgroundColor: "#1e90ff",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: 500,
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0d6efd")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e90ff")}
      >
        <FaShoppingCart />
        {cartCount > 0 && <span>({cartCount})</span>}
      </button>

        {/* Auth */}
        {!user ? (
          <button
            onClick={openLogin?.open}
            style={{
              padding: "6px 16px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "#1e90ff",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0d6efd")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e90ff")}
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 16px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#d9363e")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
