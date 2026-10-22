

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import NavBar from "../ReUsables/NavBar";
import { useInventory } from "../UseContext/InventoryContext";
import Footer from "../ReUsables/Footer";
import "../styles/cart.css";
import shoppingct from "../assets/shoppingct.png";
const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);
  const { getStock } = useInventory();

  return (
    <div className="cart-page">

      <NavBar />

      <main className="cart-card">

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <div className="cart-header">

              <img src={shoppingct} alt="Shopping Cart" />

              {/* <h3> */}
              {/* Your Cart has {cartItems.length}{" "}
                item{cartItems.length === 1 ? "" : "s"}!
              </h3> */}
            </div>

            <h3>
              Looks like you haven't added anything
              yet.
            </h3>

            <p>Click Shop Now to continue shopping.</p>

            <button
              className="shop-now-btn"
              onClick={() => navigate("/allproductspage")}
            >
              Shop Now
            </button>

          </div>

        ) : (

          <>
            {/* CART PRODUCTS */}

            <h3 className="h3">Added Items:</h3>

            <div className="cart-products" aria-label="Cart items">
              

              {cartItems.map((item) => (

                <article key={item.id} className="cart-item">
                  <img src={item.img || item.image || item.picture_url} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    {/* <p className="cart-item-price">@ Ksh {Number(item.price).toLocaleString()}</p> */}
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name} quantity`}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => increaseQuantity(item.id)} disabled={item.quantity >= getStock(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                    </div>
                    <strong className="item-price"> Ksh {(Number(item.price) * item.quantity).toLocaleString()}</strong>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </article>

              ))}

            </div>


            {/* CART SUMMARY */}

            <div className="cart-summary">

              <div><h4>Total: Ksh {totalPrice.toLocaleString()}</h4></div>

              <div className="cart-summary-actions">

                <button
                  className="checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>

              </div>



            </div>

          </>



        )}

        <h2 className="h2">Recently Viewed Products</h2>


        {/* <div className="recently-viewed">


            {allproducts.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}




        </div> */}

      </main>
      <Footer />

    </div>
  );
};

export default Cart;
