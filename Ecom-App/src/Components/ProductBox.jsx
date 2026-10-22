
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import CartContext from "../UseContext/CartContext";
// import { useInventory } from "../UseContext/InventoryContext";
// import { useToast } from "../UseContext/ToastContext";
// import "../styles/productbox.css";

// const ProductBox = ({
//   product,
//   isCartItem = false,
// }) => {
//   const {
//     cartItems,
//     addToCart,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//   } = useContext(CartContext);
//   const { getStock } = useInventory();
//   const { showToast } = useToast();
//   const stock = getStock(product);
//   const cartItem = cartItems.find((item) => item.id === product.id);

//   const handleAddToCart = () => {
//     if ((cartItem?.quantity || 0) >= stock) return;
//     addToCart(product);
//     showToast(`${product.name} added to your cart.`);
//   };

//   const price = Number(
//     product.price ?? product.price_per_unit ?? 0
//   );

//   const image =
//     product.img ||
//     product.image ||
//     product.picture_url;

//   return (
//     <div className="product-container">
//       <div className="product-box">

//         {/* Product Image */}
//         {!isCartItem ? <Link to={`/products/${product.id}`}><img src={image} alt={product.name} className="product-image" /></Link> : <img src={image} alt={product.name} className="product-image" />}

//         {/* Product Name */}
//         <h3 className="product-name">
//           {!isCartItem ? <Link to={`/products/${product.id}`}>{product.name}</Link> : product.name}
//         </h3>

//         {/* Product Price */}
//         <p className="product-price">
//           Ksh {price.toLocaleString()}
//         </p>
//         <p className={`product-stock ${stock === 0 ? "out-of-stock" : ""}`}>
//           {stock > 0 ? `${stock} left in stock` : "Out of stock"}
//         </p>

//         {/* NORMAL PRODUCT */}
//         {!isCartItem && (
//           <button
//             className="add-to-cart-btn"
//             onClick={handleAddToCart}
//             disabled={stock === 0}
//           >
//             {stock > 0 ? "Add to Cart" : "Out of Stock"}
//           </button>
//         )}

//         {/* CART PRODUCT */}
//         {isCartItem && (
//           <div className="cart-product-controls">

//             <div className="quantity-controls">

//               <button
//                 className="quantity-btn"
//                 onClick={() => decreaseQuantity(product.id)}
//               >
//                 −
//               </button>

//               <span className="quantity">
//                 {product.quantity}
//               </span>

//               <button
//                 className="quantity-btn"
//                 onClick={() => increaseQuantity(product.id)}
//                 disabled={product.quantity >= stock}
//                 aria-label={`Increase ${product.name} quantity`}
//               >
//                 +
//               </button>

//             </div>

//             <button
//               className="remove-btn"
//               onClick={() => removeFromCart(product.id)}
//             >
//               Remove
//             </button>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductBox;

import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import { useToast } from "../UseContext/ToastContext";
import "../styles/productbox.css";

const ProductBox = ({ product, isCartItem = false }) => {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const { showToast } = useToast();

  // Product stock now comes directly from PostgreSQL
  const stock = Number(product.stock ?? 0);

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    if ((cartItem?.quantity || 0) >= stock) {
      showToast("No more stock available.");
      return;
    }

    addToCart(product);
    showToast(`${product.name} added to your cart.`);
  };

  const price = Number(product.price ?? 0);

  const image = product.image || product.img || product.picture_url;

  return (
    <div className="product-container">
      <div className="product-box">

        {/* Product Image */}
        {!isCartItem ? (
          <Link to={`/products/${product.id}`}>
            <img
              src={image}
              alt={product.name}
              className="product-image"
            />
          </Link>
        ) : (
          <img
            src={image}
            alt={product.name}
            className="product-image"
          />
        )}

        {/* Product Name */}
        <h3 className="product-name">
          {!isCartItem ? (
            <Link to={`/products/${product.id}`}>
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>

        {/* Product Price */}
        <p className="product-price">
          Ksh {price.toLocaleString()}
        </p>

        {/* Stock */}
        <p
          className={`product-stock ${
            stock === 0 ? "out-of-stock" : ""
          }`}
        >
          {stock > 0
            ? `${stock} left in stock`
            : "Out of stock"}
        </p>

        {/* NORMAL PRODUCT */}
        {!isCartItem && (
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        )}

        {/* CART PRODUCT */}
        {isCartItem && (
          <div className="cart-product-controls">

            <div className="quantity-controls">

              <button
                className="quantity-btn"
                onClick={() =>
                  decreaseQuantity(product.id)
                }
              >
                −
              </button>

              <span className="quantity">
                {product.quantity}
              </span>

              <button
                className="quantity-btn"
                onClick={() =>
                  increaseQuantity(product.id)
                }
                disabled={product.quantity >= stock}
                aria-label={`Increase ${product.name} quantity`}
              >
                +
              </button>

            </div>

            <button
              className="remove-btn"
              onClick={() =>
                removeFromCart(product.id)
              }
            >
              Remove
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProductBox;
