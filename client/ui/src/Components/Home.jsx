import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AutoCarousel from "./Carousel";
import ProductListing from "./ProductListing";

const Home = () => {
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
        setProducts(data.slice(0, 6)); 
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
      
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="w-full overflow-x-hidden">
        <AutoCarousel />
      </section>

      {/* About Us Section */}
      <section className="w-full px-6 lg:px-12 py-12 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
        <h2 className="text-4xl font-bold text-center">Welcome to QuickMart</h2>
        <p className="mt-4 text-lg font-medium text-center">
          Your one-stop shop for the best deals on electronics, fashion, and
          home essentials. We provide high-quality products at unbeatable
          prices with fast delivery.
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-12 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.productID}
                className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.imageUrl}
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
                  <strong>Price:</strong> Rs. {product.price}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/productlisting"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-6 lg:px-12 py-12 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
        <h2 className="text-3xl font-bold text-center">What Our Customers Say</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-8">
          <div className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg font-medium">
              "QuickMart has the best deals! Fast delivery and great quality."
            </p>
            <h4 className="font-bold mt-4">- John Doe</h4>
          </div>
          <div className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg font-medium">
              "I love shopping here. The products are exactly as described!"
            </p>
            <h4 className="font-bold mt-4">- Sarah Lee</h4>
          </div>
          <div className="bg-white dark:bg-gray-700 dark:border dark:border-gray-600 p-6 rounded-lg shadow-lg max-w-sm">
            <p className="text-lg font-medium">
              "Best customer service ever. Highly recommended!"
            </p>
            <h4 className="font-bold mt-4">- Mike Johnson</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white dark:text-gray-300 p-8 text-center">
        <p className="text-lg">&copy; 2025 QuickMart. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
