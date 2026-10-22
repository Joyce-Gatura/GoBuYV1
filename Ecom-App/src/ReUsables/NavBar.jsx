import { useContext, useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import { useProductFilters } from "../UseContext/ProductFilterContext";
import avatar from "../assets/shop with me.jpg";
import gobyLogo from "../assets/goby-logo.png";
import { ChevronDown, LogIn, LogOut, PackageCheck, ShoppingBag, UserPlus, UserRound } from "lucide-react";
import { logoutUser } from "../services/api.js";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    console.error("Unable to read the saved user profile:", error);
    return null;
  }
};

const NavBar = () => {
  const { cartCount } = useContext(CartContext);
  const { filters, setFilters } = useProductFilters();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [user, setUser] = useState(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
        profileButtonRef.current?.focus();
      }
    };

    const handleStorageChange = () => {
      setUser(getStoredUser());
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isProfileMenuOpen]);

  const handleCategoryChange = (event) => {
    setFilters((prev) => ({ ...prev, category: event.target.value }));
  };

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    setIsSettingsMenuOpen(false);
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/loginpage");
    }
  };

  const handleProfileButtonClick = () => {
    setUser(getStoredUser());
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
    setIsProfileMenuOpen((isOpen) => !isOpen);
    if (isProfileMenuOpen) {
      setIsSettingsMenuOpen(false);
    }
  };

  const handleSettingsMenuToggle = () => {
    setIsSettingsMenuOpen((isOpen) => !isOpen);
  };

  const handleSettingsNavigate = (section) => {
    setIsProfileMenuOpen(false);
    setIsSettingsMenuOpen(false);
    navigate(`/profile#${section}`);
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



            


            <option value="All">--All categories--</option>
            <option value="Tech-Gudgets">Computer Accessories</option>
            <option value="Beauty & Selfcare">Beauty & Selfcare</option>
            <option value="Home-Decor">Home Decors</option>
          </select>
        </li>
      </ul>

      <div className="nav-profile-menu" ref={profileMenuRef}>
        <button
          type="button"
          className="nav-profile-link"
          aria-label={isProfileMenuOpen ? "Close account menu" : "Open account menu"}
          aria-haspopup="true"
          aria-expanded={isProfileMenuOpen}
          aria-controls="profile-dropdown"
          onClick={handleProfileButtonClick}
          ref={profileButtonRef}
        >
          <img
            src={user?.profileImage || user?.avatar || avatar}
            alt=""
            className="nav-profile-avatar"
          />
        </button>

        <div
          id="profile-dropdown"
          className={`profile-dropdown${isProfileMenuOpen ? " is-open" : ""}`}
          aria-hidden={!isProfileMenuOpen}
          inert={!isProfileMenuOpen}
        >
          <div className="profile-dropdown-header">
            {isAuthenticated ? (
              <>
                <img
                  src={user?.profileImage || user?.avatar || avatar}
                  alt=""
                  className="profile-dropdown-avatar"
                />
                <div className="profile-dropdown-identity">
                  <strong>{user?.name || "Your GoBuy account"}</strong>
                  {user?.email ? <span>{user.email}</span> : null}
                </div>
              </>
            ) : (
              <div className="profile-dropdown-identity">
                <strong>Welcome to GoBuy</strong>
                <span>Sign in to manage your account</span>
              </div>
            )}
          </div>

          <div className="profile-dropdown-links">
            {isAuthenticated ? (
              <>
                <Link to="/profile#orders-section" onClick={() => setIsProfileMenuOpen(false)}>
                  <UserRound aria-hidden="true" />
                  <span>My Orders</span>
                </Link>
                <Link to="/cart" onClick={() => setIsProfileMenuOpen(false)}>
                  <ShoppingBag aria-hidden="true" />
                  <span>Your cart</span>
                  {cartCount > 0 ? <span className="profile-dropdown-count">{cartCount}</span> : null}
                </Link>
              </>
            ) : (
              <>
                <Link to="/loginpage" onClick={() => setIsProfileMenuOpen(false)}>
                  <LogIn aria-hidden="true" />
                  <span>Sign in</span>
                </Link>
                <Link to="/registerpage" onClick={() => setIsProfileMenuOpen(false)}>
                  <UserPlus aria-hidden="true" />
                  <span>Create an account</span>
                </Link>
              </>
            )}
            <Link to="/allproductspage" onClick={() => setIsProfileMenuOpen(false)}>
              <PackageCheck aria-hidden="true" />
              <span>Browse products</span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="profile-dropdown-footer">
              <div className="profile-settings-menu">
                <button type="button" className="profile-settings-toggle" onClick={handleSettingsMenuToggle}>
                  <UserRound aria-hidden="true" />
                  <span>Settings</span>
                  <ChevronDown aria-hidden="true" className={`profile-settings-chevron${isSettingsMenuOpen ? " is-open" : ""}`} />
                </button>

                <div className={`profile-settings-submenu${isSettingsMenuOpen ? " is-open" : ""}`}>
                  <button type="button" onClick={() => handleSettingsNavigate("personal-information")}>
                    Personal information
                  </button>
                  <button type="button" onClick={() => handleSettingsNavigate("change-password")}>
                    Change password
                  </button>
                  <button type="button" onClick={() => handleSettingsNavigate("delete-account")}>
                    Delete account
                  </button>
                </div>
              </div>

              <button type="button" onClick={handleLogout}>
                <LogOut aria-hidden="true" />
                <span>Log out</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
