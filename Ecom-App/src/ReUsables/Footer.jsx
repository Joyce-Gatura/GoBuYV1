import { Link, useNavigate } from "react-router-dom";
import "../styles/footer.css";
import { useProductFilters } from "../UseContext/ProductFilterContext";

const Footer = () => {
  const navigate = useNavigate();
  const { setFilters } = useProductFilters();

  const openCategory = (category) => {
    setFilters((previous) => ({ ...previous, category }));
    navigate("/allproductspage");
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>GoBuy</h2>
          <p>We deliver across Kenya.</p>
          <p className="footer-hours"> From:Mon - Sat, 8:00 AM - 6:00 PM</p>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <Link to="/allproductspage"></Link>
          <button onClick={() => openCategory("All")}>All Products</button>
          <button onClick={() => openCategory("Tech-Gudgets")}>Computer accessories</button>
          <button onClick={() => openCategory("Beauty & Selfcare")}>Beauty & selfcare</button>
          <button onClick={() => openCategory("Home-Decor")}>Home decor</button>
        </div>

        <div className="footer-column">
          <h3>Customer care</h3>
          <Link to="/about">About GoBuy</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/profile">Track your order</Link>
          <span>Returns and help</span>
        </div>

        <div className="footer-column footer-contact">
          <h3>Get in touch</h3>
          <a href="tel:+254700000000">+254 746******</a>
          <a href="mailto:gaturajoy@gmail.com">hello@gobuy.co.ke</a>
          <span>Nyeri, Kenya</span>
          <span>Secure M-Pesa payments</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} GoBuy. All rights reserved.</span>
        <span>Trusted shopping for every home.</span>
      </div>
    </footer>
  );
};

export default Footer;
