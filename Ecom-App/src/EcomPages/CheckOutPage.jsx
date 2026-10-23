

import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../UseContext/CartContext";
import NavBar from "../ReUsables/NavBar";
import "../styles/checkout.css";
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const deliveryOptions = {
  carrefour: {
    label: "Carrefour",
    cost: 0,
  },
  g4s: {
    label: "G4S",
    cost: 500,
  },
  posta: {
    label: "Posta",
    cost: 700,
  },
};

const CheckOutPage = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    county: "",
    town: "",
    deliveryMode: "carrefour",
  });

  const [loading, setLoading] = useState(false);

  const deliveryCost = useMemo(
    () => deliveryOptions[formData.deliveryMode].cost,
    [formData.deliveryMode]
  );

  const amountPayable = Number(totalPrice) + Number(deliveryCost);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------
      // STEP 1: CREATE PENDING ORDER
      // -----------------------------------------
const phone = formData.phoneNumber.trim();

const phoneRegex = /^(07|01)\d{8}$/;

if (!phoneRegex.test(phone)) {
  alert("Enter a valid Kenyan phone number, e.g. 0712345678");
  return;
}
    

      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),

        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        deliveryAddress: formData.town,
        city: formData.county,
        paymentMethod: "M-Pesa",
      };

      console.log("Creating order:", orderData);

      const orderResponse = await fetch(
        `${API_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const orderDataResponse = await orderResponse.json();

      console.log("Order response:", orderDataResponse);

      if (!orderResponse.ok) {
        throw new Error(
          orderDataResponse.message || "Failed to create order"
        );
      }

      const order = orderDataResponse.order;

      if (!order || !order.id) {
        throw new Error("Order ID was not returned by the server.");
      }

      console.log("Created order:", order);

      // -----------------------------------------
      // STEP 2: INITIATE M-PESA STK PUSH
      // -----------------------------------------

      const mpesaResponse = await fetch(
        `${API_URL}/api/mpesa/stkpush`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            orderId: order.id,
            phoneNumber: formData.phoneNumber,
            amount: amountPayable,
            accountReference: order.id,
            transactionDescription: "GoBuy Order Payment",
          }),
        }
      );

      const mpesaData = await mpesaResponse.json();

      console.log("M-Pesa response:", mpesaData);

      if (!mpesaResponse.ok) {
        throw new Error(
          mpesaData.message || "Failed to initiate M-Pesa payment"
        );
      }

      // -----------------------------------------
      // STEP 3: INFORM CUSTOMER
      // -----------------------------------------

      alert(
        "M-Pesa payment request sent to your phone. Please enter your M-Pesa PIN to complete the payment."
      );

      console.log(
        "CheckoutRequestID:",
        mpesaData.data?.CheckoutRequestID
      );

      /*
        IMPORTANT:

        We do NOT clear the cart here.

        We do NOT reduce stock here.

        The backend callback will handle the successful payment
        and stock reduction.
      */

    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.message ||
          "Something went wrong while processing your payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <NavBar />

      <div className="checkout-card">
        <h2>Checkout</h2>

        <p>
          Complete your delivery details and pay with M-Pesa.
        </p>

        <form
          onSubmit={handleSubmit}
          className="checkout-form"
        >
          <div className="form-grid">


             <label >
            Full Name

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="2547XXXXXXXX"
            />
          </label>

          <label>
            County

            <input
              type="text"
              name="county"
              value={formData.county}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Town

            <input
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Delivery Mode

            <select
              name="deliveryMode"
              value={formData.deliveryMode}
              onChange={handleChange}
              required
            >
              <option value="carrefour">
                Carrefour - Within Bomas (Free)
              </option>

              <option value="g4s">
                G4S - Ksh 500
              </option>

              <option value="posta">
                Posta - Ksh 700
              </option>
            </select>
          </label>





          </div>

        
         
          <div
            className="checkout-summary"
            aria-live="polite"
          >
            <p>
              Subtotal: Ksh{" "}
              {Number(totalPrice).toLocaleString()}
            </p>

            <p>
              Delivery: Ksh{" "}
              {Number(deliveryCost).toLocaleString()}
            </p>

            <p className="checkout-total">
              Amount Payable: Ksh{" "}
              {Number(amountPayable).toLocaleString()}
            </p>
          </div>

          <button
            type="submit"
            className="pay-btn"
            disabled={loading}
          >
            {loading
              ? "Processing Payment..."
              : "Pay with M-Pesa"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPage;