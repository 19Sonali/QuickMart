import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="text-center text-2xl mt-10">Home Page</h1>} />
        <Route path="/product-listing" element={<h1 className="text-center text-2xl mt-10">Product Listing</h1>} />
        <Route path="/product-detail" element={<h1 className="text-center text-2xl mt-10">Product Detail</h1>} />
        <Route path="/cart" element={<h1 className="text-center text-2xl mt-10">Cart Page</h1>} />
        <Route path="/checkout" element={<h1 className="text-center text-2xl mt-10">Checkout Page</h1>} />
      </Routes>
    </Router>
  );
}
