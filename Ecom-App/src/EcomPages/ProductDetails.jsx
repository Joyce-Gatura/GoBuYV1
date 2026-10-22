import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import { useInventory } from "../UseContext/InventoryContext";
import { useToast } from "../UseContext/ToastContext";
import NavBar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import homeproducts from "../ProductsData/HomeDecor";
import computer from "../ProductsData/Computer";
import Beauty from "../ProductsData/Beauty";
import "../styles/productdetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = [...homeproducts, ...computer, ...Beauty].find((item) => item.id === productId);
  const { cartItems, addToCart } = useContext(CartContext);
  const { getStock } = useInventory();
  const { showToast } = useToast();

  if (!product) {
    return <><NavBar /><main className="product-details empty-details"><h2>Product not found</h2><Link to="/allproductspage">Back to products</Link></main><Footer /></>;
  }

  const stock = getStock(product);
  const addProduct = () => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if ((cartItem?.quantity || 0) >= stock) return;
    addToCart(product);
    showToast(`${product.name} added to your cart.`);
  };

  return (
    <div className="product-details-page">
      <NavBar />
      <main className="product-details">
        <Link to="/allproductspage" className="back-link">Back to products</Link>
        <section className="details-panel">
          <img src={product.img || product.image || product.picture_url} alt={product.name} />
          <div className="details-copy">
            <p className="details-category">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="details-id">Product ID: {product.id}</p>
            <p className="details-price">Ksh {Number(product.price).toLocaleString()}</p>
            <p className="details-stock">{stock > 0 ? `${stock} units available` : "Out of stock"}</p>
            <button className="details-add-button" onClick={addProduct} disabled={stock === 0}>
              {stock > 0 ? "Add to cart" : "Out of stock"}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
