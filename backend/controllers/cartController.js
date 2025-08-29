import Cart from "../models/Cart.js";
// Remove Book import since we're storing book details directly in cart

// Get cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the cart for the user
    const userCart = await Cart.findOne({ userId });
    if (!userCart) return res.json({ items: [] }); // Return consistent structure

    // Since we're storing book details in cart items, no need to lookup Book model
    const cartWithDetails = userCart.items.map((item) => ({
      _id: item._id,
      productId: item.productId,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image,
    }));

    res.json({ items: cartWithDetails });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1, name, price, image } = req.body;

    // Validate required fields
    if (!userId || !productId || !name || !price) {
      return res.status(400).json({ 
        error: "Missing required fields: userId, productId, name, price" 
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create cart if doesn't exist
      cart = new Cart({ 
        userId, 
        items: [{ productId, quantity, name, price, image }] 
      });
    } else {
      const itemIndex = cart.items.findIndex(i => i.productId === productId);
      if (itemIndex > -1) {
        // Item exists → increment quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productId, quantity, name, price, image });
      }
    }

    await cart.save();
    res.status(201).json({ items: cart.items });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    res.json({ message: "Item removed from cart", items: cart.items });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};