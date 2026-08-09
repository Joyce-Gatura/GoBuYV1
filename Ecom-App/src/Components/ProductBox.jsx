import { useContext } from "react";
import CartContext from "../UseContext/CartContext";
import "../styles/productbox.css";

const ProductBox = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    window.confirm(`${product.name} added to cart successfully. Continue shopping?`);
  };

  return (
    <div className="product-container">
      <div className="product-box">
        <img src={product.img || product.image} alt={product.name} className="product-image" />

        <h3 className="product-name">{product.name}</h3>

        <p className="product-price">Ksh {product.price.toLocaleString()}</p>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductBox;