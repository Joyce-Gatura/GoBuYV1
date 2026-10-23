import {useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import "../styles/profile.css";
import avatar from "../assets/shop with me.jpg";
import { logoutUser } from "../services/api.js";
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeSettingsView = ["personal-information", "change-password", "delete-account"].includes(location.hash.replace("#", ""))
    ? location.hash.replace("#", "")
    : "";
  const [storedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const [ordersError, setOrdersError] = useState("");
  const [profile, setProfile] = useState({
    fullName: storedUser?.name || "",
    email: storedUser?.email || "gatura@email.com",
    phone: storedUser?.phone || "+254 7********",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securityMessage, setSecurityMessage] = useState("");

  useEffect(() => {
    if (!securityMessage) return undefined;

    const timeoutId = window.setTimeout(() => setSecurityMessage(""), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [securityMessage]);

  // SAVE PROFILE

useEffect(() => {
  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setOrdersError("Please log in to view your orders.");
        setOrdersLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/orders/my-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setOrdersError(error.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  fetchMyOrders();
}, []);


  const handleProfileSave = (event) => {
    event.preventDefault();

    if (!profile.fullName.trim() || !profile.email.trim()) {
      setSecurityMessage("Please complete your name and email before saving.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setSecurityMessage("Please enter a valid email address.");
      return;
    }


    // Update user details
    const updatedUser = {
      ...storedUser,
      name: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);
    setSecurityMessage("Profile updated successfully.");
  };



  const handleSecurityAction = (message) => {
    setSecurityMessage(message);
  };



  // Password change

  
const handlePasswordSave = async (event) => {
  event.preventDefault();

  // 1. Check that all fields are filled
  if (
    !passwords.oldPassword ||
    !passwords.newPassword ||
    !passwords.confirmPassword
  ) {
    setSecurityMessage("Please fill in all password fields.");
    return;
  }

  // 2. Check password length
  if (passwords.newPassword.length < 8) {
    setSecurityMessage(
      "New password must be at least 8 characters long."
    );
    return;
  }

  // 3. Check that new passwords match
  if (passwords.newPassword !== passwords.confirmPassword) {
    setSecurityMessage("New passwords do not match.");
    return;
  }

  // 4. Get the logged-in user's JWT
  const token = localStorage.getItem("token");

  if (!token) {
    setSecurityMessage("Please login again to change your password.");
    return;
  }

  try {
    // 5. Send password change request to backend
    const response = await fetch(
      `${API_URL}/api/auth/change-password`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          currentPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      }
    );

    // 6. Get backend response
    const data = await response.json();

    // 7. Handle errors from backend
    if (!response.ok) {
      setSecurityMessage(
        data.message || "Failed to change password."
      );
      return;
    }

    // 8. Success
    setSecurityMessage(
      "Password changed successfully."
    );

    // 9. Close form
    setShowPasswordForm(false);

    // 10. Clear password fields
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error("Change password error:", error);

    setSecurityMessage(
      "Unable to connect to the server. Please try again."
    );
  }
};



 


  // Logout User

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      navigate("/loginpage");
    }
  };


  // DELETE ACCOUNT




  const handleDeleteAccount =async  () => {
    const confirmed=window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSecurityMessage("You are not logged in. Please log in to delete your account.");
        navigate("/loginpage");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setSecurityMessage(data.message || "Failed to delete account.");
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/loginpage");
    } catch (error) {
      console.error("Error deleting account:", error);
      setSecurityMessage("Unable to delete account. Please try again later.");
    }
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-shell">
        <div className="profile-card">
          <div className="profile-hero">
            <div className="profile-user">
              <div className="profile-avatar">
                <img src={avatar} alt="profile" />
              </div>
              <div className="profile-heading">
                <h2>{profile.fullName}</h2>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setIsEditing((value) => !value)}>
                {isEditing ? "Cancel" : "Edit profile"}
              </button>
            </div>
          </div>

          {isEditing ? (
            <form className="edit-form" onSubmit={handleProfileSave}>
              <input value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} />
              <input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
              <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />
              <button className="edit-btn" type="submit">Save changes</button>
            </form>
          ) : null}

          <div className="profile-grid">
            {activeSettingsView === "personal-information" ? (
              <div className="section-card">
                <h3>Personal information</h3>
                <div className="info-list">
                  <div className="info-item"><span>Full name</span><strong>{profile.fullName}</strong></div>
                  <div className="info-item"><span>Email</span><strong>{profile.email}</strong></div>
                  <div className="info-item"><span>Phone</span><strong>{profile.phone}</strong></div>
                </div>
              </div>
            ) : activeSettingsView === "change-password" ? (
              <div className="section-card">
                <h3>Security</h3>
                <p>Keep your account protected with a strong password.</p>
                <div className="security-actions">
                  <button className="secondary-btn" onClick={() => {
                    setShowPasswordForm(true);
                    handleSecurityAction("Password change requested. Verify your 2FA code to continue.");
                  }}>
                    Change password
                  </button>
                </div>

                {showPasswordForm ? (
                  <form className="password-form" onSubmit={handlePasswordSave}>
                    <label>
                      <span>Old password</span>
                      <input type="password" value={passwords.oldPassword} onChange={(event) => setPasswords({ ...passwords, oldPassword: event.target.value })} />
                    </label>
                    <label>
                      <span>New password</span>
                      <input type="password" value={passwords.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })} />
                    </label>
                    <label>
                      <span>Confirm new password</span>
                      <input type="password" value={passwords.confirmPassword} onChange={(event) => setPasswords({ ...passwords, confirmPassword: event.target.value })} />
                    </label>
                    <div className="password-form-actions">
                      <button className="edit-btn" type="submit">Save</button>
                      <button className="secondary-btn" type="button" onClick={() => {
                        setShowPasswordForm(false);
                        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
                      }}>Cancel</button>
                    </div>
                  </form>
                ) : null}
              </div>
            ) : activeSettingsView === "delete-account" ? (
              <div className="section-card">
                <h3>Account actions</h3>
                <p>Once you have deleted your Account you cannot acess it!</p>
                <div className="security-actions">
                  <button className="secondary-btn" onClick={handleLogout}>Log out</button>
                  <button className="danger-btn" onClick={handleDeleteAccount}>Delete account</button>
                </div>
              </div>
            ) : (
              <div className="section-card" id="orders-section">
                <h3>My orders</h3>

                {ordersLoading && (
                  <p className="empty-order">Loading your orders...</p>
                )}

                {ordersError && (
                  <p className="empty-order">{ordersError}</p>
                )}

                {!ordersLoading &&
                  !ordersError &&
                  orders.length > 0 ? (
                    orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="order-item">

                        <div className="order-meta">
                          <strong>Order #{order.id}</strong>

                          <span
                            className={`status-pill status-${order.status
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {order.items?.map((item) => (
                          <div
                            key={item.id}
                            className="order-product"
                          >
                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              className="order-product-image"
                            />

                            <div className="order-product-details">
                              <p>
                                <strong>Product:</strong>{" "}
                                {item.product?.name}
                              </p>

                              <p>
                                <strong>Quantity:</strong>{" "}
                                {item.quantity}
                              </p>

                              <p>
                                <strong>Price:</strong> Ksh{" "}
                                {Number(item.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}

                        <p>
                          <strong>Address:</strong>{" "}
                          {order.deliveryAddress}, {order.city}
                        </p>

                        <p>
                          <strong>Total:</strong> Ksh{" "}
                          {Number(order.totalAmount).toLocaleString()}
                        </p>

                        <p>
                          <strong>Payment:</strong>{" "}
                          {order.paymentMethod}
                        </p>

                        <div className="delivery-track">
                          <div className="track-step active">
                            Placed
                          </div>

                          <div
                            className={`track-step ${
                              ["Packed", "On the way", "Delivered"].includes(
                                order.status
                              )
                                ? "active"
                                : ""
                            }`}
                          >
                            Packed
                          </div>

                          <div
                            className={`track-step ${
                              ["On the way", "Delivered"].includes(
                                order.status
                              )
                                ? "active"
                                : ""
                            }`}
                          >
                            On the way
                          </div>

                          <div
                            className={`track-step ${
                              order.status === "Delivered"
                                ? "active"
                                : ""
                            }`}
                          >
                            Delivered
                          </div>
                        </div>

                      </div>
                    ))
                  ) : (
                    !ordersLoading &&
                    !ordersError && (
                      <p className="empty-order">
                        Your checked out orders will appear here.
                      </p>
                    )
                  )}
              </div>
            )}
          </div>
        </div>

        {securityMessage ? (
          <div className="profile-toast" role="status" aria-live="polite">
            {securityMessage}
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
