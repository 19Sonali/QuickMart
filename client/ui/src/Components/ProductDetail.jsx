import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("🔄 Fetching product:", productID);

    fetch(`http://localhost:5161/api/Product/${productID}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found.");
        return response.json();
      })
      .then((data) => {
        console.log("Product Loaded:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [productID]);

  const handleAddToCart = async () => {
    console.log("🛒 Add to Cart button clicked!");

    if (!product) {
      console.error("Product is null!");
      setError("Product details are missing.");
      return;
    }

    if (!product.productID) { 
      console.error("Product ID is missing!", product);
      setError("Invalid product details.");
      return;
    }

    const cartData = { productId: product.productID, quantity };
    console.log("Sending cart data:", cartData);

    try {
      const response = await fetch("http://localhost:5161/api/Cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to add product to cart.");
      }

      const data = await response.json();
      console.log("Cart updated:", data);
      setSuccessMessage("Product added to cart successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <img
            src={product?.imageUrl || "/placeholder.jpg"}
            alt={product?.name || "Product Image"}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <p className="text-gray-700 mb-4">{product?.description}</p>
          <p className="text-lg font-semibold text-red-500 mb-2">
            Price: Rs.{product?.price}
          </p>
          <div className="flex items-center mb-4">
            <label className="mr-2 text-sm text-gray-600">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded w-16 text-center"
            />
          </div>
          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
