

import { useEffect, useState } from "react";
import NavBar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import ProductBox from "../Components/ProductBox";
import "../styles/allproductspage.css";
import { useProductFilters } from "../UseContext/ProductFilterContext";

const AllProductsPage = () => {
  const { filters } = useProductFilters();

  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setAllProducts(data);
      } catch (error) {
        console.error("Fetch products error:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


console.log("Selected filter:", filters.category);
console.log(
  "Database product categories:",
  allproducts.map((product) => product.category)
);

const visibleProducts = allproducts.filter((product) => {
  if (filters.category === "All") {
    return true;
  }

  return (
    product.category?.trim().toLowerCase() ===
    filters.category?.trim().toLowerCase()
  );
});

  return (
    <div className="all-products-page">
      <NavBar />

      <section className="products-section">
        <h2 className="h2">All Products:</h2>
        {/* <h2 className="h2">Discover the best deals and products tailored just for you!</h2> */}


        {loading && (
          <p className="empty-state">Loading products...</p>
        )}

        {error && (
          <p className="empty-state">{error}</p>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <ProductBox
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p className="empty-state">
                No products match the selected category.
              </p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AllProductsPage;