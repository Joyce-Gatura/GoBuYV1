import React from "react";
import NavBar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import ProductBox from "../Components/ProductBox";
import products from "../ProductsData/Modern";
import "../styles/allproductspage.css";
import { useProductFilters } from "../UseContext/ProductFilterContext";

const AllProductsPage = () => {
  const { filters } = useProductFilters();

  const visibleProducts = products.filter((product) => {
    return filters.category === "All" || product.category === filters.category;
  });

  return (
    <div className="all-products-page">
      <NavBar />

      <section className="products-section">
        <h2 className="products-title">Our Products</h2>

        <div className="products-grid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => <ProductBox key={product.id} product={product} />)
          ) : (
            <p className="empty-state">No products match the selected category.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllProductsPage;