import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import NavBar from "../ReUsables/NavBar";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (


    
    <div className="cart-page">
        <NavBar/>

      
      <div className="cart-card">

      
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <p>{cartItems.length} item{cartItems.length === 1 ? "" : "s"}</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty.</h3>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img || item.image} alt={item.name} />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    {/* <p>Ksh {item.price.toLocaleString()}</p> */}
                  </div>

                  <div className="cart-quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <div className="cart-item-actions">
                    <p className="cart-item-total">Ksh {(item.price * item.quantity).toLocaleString()}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <h3>Subtotal</h3>
              </div>
              <div className="cart-summary-actions">
                <h2>Ksh {totalPrice.toLocaleString()}</h2>
                <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;