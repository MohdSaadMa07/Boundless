import React from "react";

const Card = ({ item }) => {
  const cardStyle = {
    width: "280px",
    height: "380px",
    marginTop: "20px",
    
    marginLeft: "30px",
    marginBottom: "20px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "white",
    fontFamily: "Poppins, sans-serif",
    transition: "transform 0.2s ease",
    position: "relative", // ✅ needed for absolute positioning
  };

  const imageSection = {
    display: "flex",
    height: "150px",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const contentStyle = {
    padding: "16px",
    paddingBottom: "40px", // ✅ leave space for bottom tag
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px",
    display: "flex",
    alignItems: "center",
  };

  const textStyle = { fontSize: "14px", color: "#555" };

  const tagStyle = {
    fontSize: "12px",
    padding: "6px 12px",
    borderRadius: "12px",
    color: "#333",
    cursor: "pointer",
    position: "absolute", // ✅ fix position
    bottom: "10px",
    left: "16px",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Image */}
      <div style={imageSection}>
        <img
          src={item.image}
          alt={item.name}
          style={{ maxWidth: "100%", height: "180px", objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{item.name}</h3>
        <p style={textStyle}>{item.title}</p>
      </div>

      {/* Fixed Bottom Tag */}
      {item.price === 0 ? (
        <span style={{ ...tagStyle, background: "#d4edda", color: "#155724" }}>Free</span>
      ) : (
        <span style={{ ...tagStyle, background: "#f8d7da", color: "#721c24" }}>Buy Now</span>
      )}
    </div>
  );
};

export default Card;
