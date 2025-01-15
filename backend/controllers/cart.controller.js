const Cart = require("../models/cart.model"); 

const addToCart = async (req, res) => {
  const { email, id, name, price, qty, size } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("Request body:", req.body); 

    let cart = await Cart.findOne({ email });

    if (!cart) {
      cart = new Cart({
        email,
        order_data: [{ id, name, price, qty, size }],
      });
    } else {
      const existingItemIndex = cart.order_data.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (existingItemIndex > -1) {
        cart.order_data[existingItemIndex].qty += qty;
      } else {
        cart.order_data.push({ id, name, price, qty, size });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};


const getCart = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ order_data: cart.order_data }); // Send only the order_data
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

const removeItem = async (req, res) => {
  const { email, itemId, size } = req.body; // Expecting email, itemId, and size from the request body

  try {
    // Validate request body
    if (!email || !itemId || !size) {
      return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    // Find the user's cart by email
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Check if the item exists in the cart
    const itemExists = cart.order_data.some(
      (item) => item.id === itemId && item.size === size
    );

    if (!itemExists) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    // Filter out the item that matches the itemId and size
    cart.order_data = cart.order_data.filter(
      (item) => !(item.id === itemId && item.size === size)
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      updatedCart: cart.order_data, // Optional: Return the updated cart for confirmation
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { addToCart, getCart, removeItem};
