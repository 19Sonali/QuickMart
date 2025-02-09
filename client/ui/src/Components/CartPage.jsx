import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the API or local storage
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5161/api/Cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items.");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5161/api/Cart/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <p className="text-center mt-20">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 rounded"
            />
            <div className="flex-1 mx-4">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-gray-600">Price: Rs.{item.price}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Total: Rs.{totalAmount}</h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
