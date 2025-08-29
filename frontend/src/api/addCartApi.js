import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Get cart for a user
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/cart/${userId}`);
    return response.data; // Should return { items: [...] }
  } catch (error) {
    console.error("Error fetching cart:", error);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      return { items: [] }; // Return empty cart if user not found
    }
    
    throw error;
  }
};

// Add item to cart - Updated to match backend expectations
export const addToCart = async (userId, bookData) => {
  try {
    const payload = {
      userId,
      productId: bookData.id?.toString() || bookData.productId?.toString(),
      name: bookData.name,
      price: bookData.price,
      image: bookData.image,
      quantity: bookData.quantity || 1,
    };

    console.log("Sending to backend:", payload);

    const response = await axios.post(`${API_BASE}/cart/add`, payload);
    return response.data; // Should return { items: [...] }
  } catch (error) {
    console.error("Error adding to cart:", error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (userId, itemId) => {
  try {
    const response = await axios.delete(`${API_BASE}/cart/delete/${userId}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};