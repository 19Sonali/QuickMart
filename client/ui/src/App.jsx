import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductListing from "./Components/ProductListing";
import ProductDetail from "./Components/ProductDetail";
import CartPage from "./Components/CartPage"; // Updated: Importing CartPage
import CheckoutPage from "./Components/CheckoutPage"; // Updated: Importing CheckoutPage

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlisting" element={<ProductListing />} />
        <Route
          path="/product/:productID"
          element={
            <ProductDetail cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/cart"
          element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} // Updated: CartPage component
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} // Updated: CheckoutPage component
        />
      </Routes>
    </Router>
  );
}
