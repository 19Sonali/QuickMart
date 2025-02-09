import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductListing from "./Components/ProductListing";
import ProductDetail from "./Components/ProductDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlisting" element={<ProductListing />} />
        <Route path="/product/:productID" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
