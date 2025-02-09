import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productID } = useParams(); // Get productID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Reset loading state when productID changes
    fetch(`http://localhost:5161/api/Product/${productID}`) // Fetch product details by ID
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
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
  }, [productID]); // Add productID as a dependency

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  const handleAddToCart = () => {
    alert(`${product.name} added to cart!`);
    // You can implement cart functionality here
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
