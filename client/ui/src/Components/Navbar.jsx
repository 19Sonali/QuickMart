import { useState, useEffect } from "react";
import { Sun, Moon, ShoppingCart, CreditCard } from "lucide-react";
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
    <nav className="w-full fixed top-0 left-0 bg-blue-500 dark:bg-gray-900 text-gray-900 dark:text-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl text-white font-bold">QuickStore</h1>
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="hover:text-blue-200 text-white dark:hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/productlisting" className="hover:text-blue-200 text-white dark:hover:text-blue-400">Product Listing</Link>
          </li>
          <li>
            <Link to="/product-detail" className="hover:text-blue-200 text-white dark:hover:text-blue-400">Product Detail</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="hover:text-blue-200 text-white dark:hover:text-blue-400">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link to="/checkout" className="hover:text-blue-200 text-white dark:hover:text-blue-400">
            <CreditCard className="w-6 h-6" />
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </div>
    </nav>
  );
}