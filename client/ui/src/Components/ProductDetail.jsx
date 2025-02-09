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
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.price}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
