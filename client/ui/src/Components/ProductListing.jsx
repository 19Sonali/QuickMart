import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // Number of products per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5161/api/Product") // Fetch product data
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
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Product Listing</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {currentProducts.map((product) => (
          <div
            key={product.productID}
            onClick={() => navigate(`/product/${product.productID}`)} // Navigate to product detail page
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
            }}
          >
            <img
              src={product.image || "https://via.placeholder.com/150"} // Placeholder image
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px", padding: "10px 20px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
