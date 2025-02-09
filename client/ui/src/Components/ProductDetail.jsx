import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productID } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the specific product details
    fetch(`http://localhost:5161/api/Product/${productID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found.");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [productID]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Right Section: Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-red-500 mb-2">
            Price: Rs.{product.price}
          </p>
          <div className="flex items-center mb-4">
            <label className="mr-2 text-sm text-gray-600">Quantity:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="border rounded w-16 text-center"
            />
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;