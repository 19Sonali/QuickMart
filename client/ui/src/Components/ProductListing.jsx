import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5161/api/Product")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <p className="text-center text-xl font-medium text-gray-900 dark:text-gray-200">
          Loading products...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <p className="text-center text-xl font-medium text-red-600 dark:text-red-400">
          Error: {error}
        </p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <p className="text-center text-xl font-medium text-gray-900 dark:text-gray-200">
          No products available.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
      <div className="w-full px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-200 mb-8">
          Product Listing
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product.productID}`}
              key={product.productID}
              className="text-decoration-none"
            >
              <div className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <img
                  src={`https://via.placeholder.com/200`}
                  alt={product.name}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {product.description}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mt-4">
                  <strong>Price:</strong> ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
