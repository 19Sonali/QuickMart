import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch("http://localhost:5161/api/Product")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="w-full overflow-x-hidden mt-20 min-h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Product Listing Section */}
      <section className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-12 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.productID} to={`/product/${product.productID}`}>
                <div className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={`https://via.placeholder.com/200`}
                    alt={product.name}
                    className="w-full rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mt-4">
                    <strong>Price:</strong> ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white dark:text-gray-300 p-8 text-center">
        <p className="text-lg">&copy; 2025 QuickMart. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default ProductListing;