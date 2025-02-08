import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-lightBlue dark:bg-gray-900 text-gray-900 dark:text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">MyStore</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/product-listing" className="hover:text-blue-700 dark:hover:text-blue-400">Product Listing</Link>
          </li>
          <li>
            <Link to="/product-detail" className="hover:text-blue-700 dark:hover:text-blue-400">Product Detail</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-700 dark:hover:text-blue-400">Cart</Link>
          </li>
          <li>
            <Link to="/checkout" className="hover:text-blue-700 dark:hover:text-blue-400">Checkout</Link>
          </li>
        </ul>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
        </button>
      </div>
    </nav>
  );
}
