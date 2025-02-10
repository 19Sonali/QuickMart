import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5161/api/Cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items.");
        }
        const data = await response.json();
        console.log("Cart Data:", data);
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
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto mt-20 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            <img
              src={
                item.product.imageUrl && item.product.imageUrl.startsWith("http")
                  ? item.product.imageUrl
                  : "https://via.placeholder.com/100"
              }
              alt={item.product.name}
              className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1 text-center sm:text-left mx-4">
              <h2 className="font-bold text-lg">{item.product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">Price: Rs.{item.product.price}</p>
              <div className="flex justify-center sm:justify-start items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 font-bold mt-4 sm:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold">Total: Rs.{totalAmount}</h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
