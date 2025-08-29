import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import list from "../assets/list.json";
import { addToCart as addCartApi, getCart as fetchCart } from "../api/addCartApi";

const Collection = ({ user, openLogin, addToCart }) => {
  const [cartCount, setCartCount] = useState(0);

  const paidBooks = list.filter((book) => book.price > 0);

  // Fetch initial cart count for logged-in user
  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }

    const fetchUserCart = async () => {
      try {
        const data = await fetchCart(user.uid);
        setCartCount(data.items?.length || 0);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        // Don't crash the component, just log the error
        setCartCount(0);
      }
    };

    fetchUserCart();
  }, [user]);

  const handleAddToCart = async (book) => {
    if (!user) {
      openLogin(); // show login modal
      return;
    }

    try {
      // Use the addToCart prop from parent instead of direct API call
      if (addToCart) {
        await addToCart(book);
        const newCount = cartCount + 1;
        setCartCount(newCount);
        return;
      }

      // Fallback to direct API call with correct data structure
      const cartData = {
        userId: user.uid,
        productId: book.id.toString(), // Ensure it's a string
        name: book.name,
        price: book.price,
        image: book.image,
        quantity: 1,
      };

      await addCartApi(cartData);
      alert(`${book.name} added to cart!`);
      
      const newCount = cartCount + 1;
      setCartCount(newCount);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ padding: "40px", background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Paid Book Collections
      </h2>

      <Slider {...settings}>
        {paidBooks.map((book) => (
          <div key={book.id} style={{ padding: "10px" }}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={book.image}
                alt={book.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                {book.name}
              </h3>
              <p style={{ color: "#777" }}>Category: {book.category}</p>
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "#1e90ff" }}>
                ₹{book.price}
              </p>

              <button
                onClick={() => handleAddToCart(book)}
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#1e90ff",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Collection;