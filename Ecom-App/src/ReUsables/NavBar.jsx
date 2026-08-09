import { useContext } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import { useProductFilters } from "../UseContext/ProductFilterContext";
import avatar from "../assets/shop with me.jpg";
import gobyLogo from "../assets/goby-logo.png";

const NavBar = () => {
  const { cartCount } = useContext(CartContext);
  const { filters, setFilters } = useProductFilters();

  const handleCategoryChange = (event) => {
    setFilters((prev) => ({ ...prev, category: event.target.value }));
  };

  return (
    <nav className="navbar">
      <Link to="/homepage" className="navbar-brand">
        <img src={gobyLogo} alt="Goby logo" className="navbar-brand-logo" />
        {/* <span className="navbar-brand-text">Goby Store</span> */}
      </Link>

      <ul className="nav-links">
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart" className="cart-link">Cart{cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}</Link></li>
        <li><Link to="/allproductspage">Products</Link></li>
        <li className="nav-filter-item">
          <select name="category" value={filters.category} onChange={handleCategoryChange} className="nav-select">
            <option value="All">All categories</option>
            <option value="Tech-Gudgets">Computer Accessories</option>
            <option value="Beauty & Selfcare">Beauty & Selfcare</option>
            <option value="Home-Decor">Home Decors</option>
          </select>
        </li>
      </ul>

      <Link to="/profile" className="nav-profile-link">
        <img src={avatar} alt="profile" className="nav-profile-avatar" />
      </Link>
    </nav>
  );
};

export default NavBar;
