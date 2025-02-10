import React, { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderPlacement = async () => {
    setOrderSuccess(true); // Show message immediately
    try {
      const response = await fetch("http://localhost:5161/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerDetails: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-md ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {orderSuccess ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-green-500">
              Order Placed Successfully!
            </h1>
            <p>Thank you for your purchase.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 bg-transparent focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 bg-transparent focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 bg-transparent focus:ring-2 focus:ring-green-400"
                />
              </div>
            </form>
            <div className="mt-6">
              <button
                onClick={handleOrderPlacement}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
