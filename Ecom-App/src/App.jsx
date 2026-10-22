import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./EcomPages/RegisterPage";
import LoginPage from "./EcomPages/LoginPage";
import HomePage from "./EcomPages/HomePage";
import AllProductsPage from "./EcomPages/AllProductsPage";
import About from "./EcomPages/About";
import Cart from "./Components/Cart";
import Contact from "./EcomPages/Contact";
import "./App.css";
import CheckOutPage from "./EcomPages/CheckOutPage";
import Profile from "./Components/Profile";
import ProductDetails from "./EcomPages/ProductDetails";
import "./app.css"
import { ProductFilterProvider } from "./UseContext/ProductFilterContext";
import AddProduct from "./EcomPages/AddProduct";

const App = () => {
  return (
    <div>
      <Router>
        <ProductFilterProvider>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/registerpage" element={<RegisterPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/allproductspage" element={<AllProductsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        </ProductFilterProvider>
      </Router>
    </div>
  );
};

export default App;
