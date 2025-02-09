import React, { useState } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOrderPlacement = async () => {
    try {
      const response = await fetch("http://localhost:5161/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: formData,
          // Add other necessary order details here
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
      setOrderSuccess(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto mt-20 p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
      </form>
      <div className="mt-6">
        <button
          onClick={handleOrderPlacement}
          className="w-full bg-green-500 text-white py-2 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
