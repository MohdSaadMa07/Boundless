import React from "react";
import { removeFromCart } from "../api/addCartApi";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ user, cart = [], setCart, open, onClose }) => {
  const navigate = useNavigate();

  // Don't render anything if not open
  if (!open) return null;

  // Group items by productId and sum quantities
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(groupedItem => groupedItem.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.itemIds = existingItem.itemIds || [existingItem._id];
      existingItem.itemIds.push(item._id);
    } else {
      acc.push({
        ...item,
        itemIds: [item._id]
      });
    }
    return acc;
  }, []);

  const handleRemove = async (productId) => {
    if (!user) return;

    try {
      const groupedItem = groupedCart.find(item => item.productId === productId);
      if (!groupedItem) return;

      for (const itemId of groupedItem.itemIds) {
        await removeFromCart(itemId);
      }

      setCart(cart.filter(item => item.productId !== productId));
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!user || newQuantity < 1) return;

    try {
      const groupedItem = groupedCart.find(item => item.productId === productId);
      if (!groupedItem) return;

      const currentQuantity = groupedItem.quantity;
      const difference = newQuantity - currentQuantity;

      if (difference > 0) {
        const { addToCart } = await import("../api/addCartApi");
        await addToCart(user.uid, {
          id: productId,
          name: groupedItem.name,
          price: groupedItem.price,
          image: groupedItem.image,
          quantity: difference
        });
      } else if (difference < 0) {
        const itemsToRemove = Math.abs(difference);
        const itemIdsToRemove = groupedItem.itemIds.slice(0, itemsToRemove);

        for (const itemId of itemIdsToRemove) {
          await removeFromCart(itemId);
        }
      }

      const { getCart } = await import("../api/addCartApi");
      const updatedCart = await getCart(user.uid);
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity");
    }
  };

const handleCheckout = () => {
  if (!user) {
    alert("Please log in first!");
    return;
  }

  const totalAmountInCents = totalPrice * 100; // Stripe requires the amount in cents

  // Pass the total amount as state to the /checkoutForm route
  navigate("/checkoutPage", {
    state: {
      amount: totalAmountInCents
    }
  });
};

  const totalPrice = groupedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = groupedCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "400px",
          backgroundColor: "#fff",
          boxShadow: "-2px 0 20px rgba(0,0,0,0.15)",
          transform: "translateX(0)",
          zIndex: 1100,
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <style jsx>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div 
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "#f8f9fa" }}
        >
          <div>
            <h2 style={{ margin: 0, color: "#333", fontSize: "20px" }}>Your Cart</h2>
            {totalItems > 0 && (
              <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "14px" }}>
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", fontSize: "24px", cursor: "pointer", color: "#666", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {groupedCart.length === 0 ? (
            <div style={{ textAlign: "center", color: "#666", marginTop: "50px", fontSize: "16px" }}>
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🛒</div>
              <p>Your cart is empty</p>
              <p style={{ fontSize: "14px", color: "#999" }}>Add some books to get started!</p>
            </div>
          ) : (
            groupedCart.map((item) => (
              <div key={item.productId} style={{ display: "flex", gap: "15px", marginBottom: "20px", padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#fafafa", transition: "box-shadow 0.3s" }}
                onMouseEnter={(e) => e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"} onMouseLeave={(e) => e.target.style.boxShadow = "none"}
              >
                {/* Image */}
                <div style={{ position: "relative" }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/80x100?text=No+Image"; }}
                    style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "6px", backgroundColor: "#f0f0f0" }}
                  />
                  {item.quantity > 1 && (
                    <div style={{ position: "absolute", top: "-8px", right: "-8px", backgroundColor: "#1e90ff", color: "#fff", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", border: "2px solid #fff" }}>
                      {item.quantity}
                    </div>
                  )}
                </div>
                
                {/* Item Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#333", lineHeight: "1.3" }}>{item.name}</h4>
                    <p style={{ margin: "0 0 8px 0", color: "#1e90ff", fontSize: "14px", fontWeight: "600" }}>${item.price} each</p>
                    
                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{ width: "30px", height: "30px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: item.quantity <= 1 ? "#f5f5f5" : "#fff", cursor: item.quantity <= 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: item.quantity <= 1 ? "#ccc" : "#666" }}
                      >−</button>
                      <span style={{ minWidth: "40px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        style={{ width: "30px", height: "30px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#666" }}
                      >+</button>
                    </div>

                    <p style={{ margin: "0 0 12px 0", fontWeight: "bold", color: "#333", fontSize: "16px" }}>
                      Subtotal: ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleRemove(item.productId)}
                    style={{ alignSelf: "flex-start", padding: "6px 12px", border: "1px solid #ff4757", borderRadius: "4px", backgroundColor: "#fff", color: "#ff4757", cursor: "pointer", fontSize: "12px", fontWeight: "500", transition: "all 0.3s" }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = "#ff4757"; e.target.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = "#fff"; e.target.style.color = "#ff4757"; }}
                  >
                    Remove All ({item.quantity})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {groupedCart.length > 0 && (
          <div style={{ padding: "20px", borderTop: "1px solid #eee", backgroundColor: "#f8f9fa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", fontSize: "18px" }}>
              <span style={{ fontWeight: "600", color: "#333" }}>Total Amount:</span>
              <span style={{ fontWeight: "bold", color: "#1e90ff", fontSize: "20px" }}>₹{totalPrice.toLocaleString()}</span>
            </div>
            <button
              style={{ width: "100%", padding: "14px", background: "linear-gradient(45deg, #1e90ff, #0d6efd)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "16px", transition: "transform 0.2s, box-shadow 0.3s" }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 12px rgba(30, 144, 255, 0.3)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
              onClick={handleCheckout} // ✅ added
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
