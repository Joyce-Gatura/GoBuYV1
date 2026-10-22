
import { useEffect, useState } from "react";
import "../styles/homepage.css";
import NavBar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import Banner from "../ReUsables/Banner";
import ProductBox from "../Components/ProductBox";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/featured"
        );

        if (!response.ok) {
          throw new Error("Failed to load featured products.");
        }

        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error("Featured products error:", err);
        setError("Unable to load featured products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <Banner />

      <section className="products-section">
        <h2 className="h2">Discover the best deals and products tailored just for you!</h2>

        {loading ? (
          <p className="products-message">Loading featured products...</p>
        ) : error ? (
          <p className="products-message error-message">{error}</p>
        ) : featuredProducts.length === 0 ? (
          <p className="products-message">
            No featured products available at the moment.
          </p>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductBox key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

