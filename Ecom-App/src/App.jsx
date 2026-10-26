import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
import "./App.css"
import { ProductFilterProvider } from "./UseContext/ProductFilterContext";
import AddProduct from "./EcomPages/AddProduct";

const App = () => {
  return (
    <div>
      <Router>
        <ProductFilterProvider>
          
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Navigate to="/loginpage" replace />} />
  <Route path="/loginpage" element={<LoginPage />} />
  <Route path="/registerpage" element={<RegisterPage />} />

  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/allproductspage" element={<AllProductsPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/checkout" element={<CheckOutPage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/products/:productId" element={<ProductDetails />} />
    <Route path="/addproduct" element={<AddProduct />} />
  </Route>

  {/* Unknown routes */}
  <Route path="*" element={<Navigate to="/loginpage" replace />} />
</Routes>

        </ProductFilterProvider>
      </Router>
    </div>
  );
};

export default App;
