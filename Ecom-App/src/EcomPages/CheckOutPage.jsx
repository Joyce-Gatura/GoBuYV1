import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import NavBar from "../ReUsables/NavBar";
import "../styles/checkout.css";
import { useOrders } from "../UseContext/OrderContext";

const deliveryOptions = {
  carrefour: { label: "Carrefour", cost: 0 },
  g4s: { label: "G4S / Posta", cost: 500 },
};

const CheckOutPage = () => {
  const { totalPrice, clearCart } = useContext(CartContext);
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    county: "",
    town: "",
    deliveryMode: "carrefour",
  });

  const deliveryCost = useMemo(
    () => deliveryOptions[formData.deliveryMode].cost,
    [formData.deliveryMode]
  );

  const amountPayable = Number(totalPrice) + deliveryCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder({
      item: "Checkout order",
      address: `${formData.town}, ${formData.county}`,
      amount: amountPayable,
      deliveryMode: deliveryOptions[formData.deliveryMode].label,
    });
    clearCart();
    const confirmed = window.confirm(
      `Payment request sent for Ksh ${amountPayable.toLocaleString()} to ${formData.phoneNumber}`
    );

    if (confirmed) {
      navigate("/profile");
    }
  };

  return (
    <div className="checkout-page">
      <NavBar />
      <div className="checkout-card">
        <h2>Checkout</h2>
        <p>Complete your delivery details and pay with M-Pesa.</p>

        <form onSubmit={handleSubmit} className="checkout-form">
          <label>
            Full Name
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </label>

          <label>
            Phone Number
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </label>

          <label>
            County
            <input type="text" name="county" value={formData.county} onChange={handleChange} required />
          </label>

          <label>
            Town
            <input type="text" name="town" value={formData.town} onChange={handleChange} required />
          </label>

          <label>
            Delivery Mode
            <select name="deliveryMode" value={formData.deliveryMode} onChange={handleChange} required>
              <option value="carrefour">Carrefour</option>
              <option value="g4s">G4S / Posta</option>
            </select>
          </label>

          <div className="checkout-summary" aria-live="polite">
            <p>Subtotal: Ksh {Number(totalPrice).toLocaleString()}</p>
            <p>Delivery: Ksh {deliveryCost.toLocaleString()}</p>
            <p className="checkout-total">Amount Payable: Ksh {amountPayable.toLocaleString()}</p>
          </div>

          <button type="submit" className="pay-btn">
            Pay with M-Pesa
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPage;
