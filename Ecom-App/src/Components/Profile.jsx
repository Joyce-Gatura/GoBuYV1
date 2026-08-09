import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import "../styles/profile.css";
import avatar from "../assets/shop with me.jpg";
import { useOrders } from "../UseContext/OrderContext";

const Profile = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "Joyce Gatura",
    email: "gatura@email.com",
    phone: "+254 7********",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securityMessage, setSecurityMessage] = useState("");

  const savedOrders = useMemo(() => orders.slice(0, 3), [orders]);

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

    setIsEditing(false);
    setSecurityMessage("Profile updated successfully.");
  };

  const handleSecurityAction = (message) => {
    setSecurityMessage(message);
  };

  const handlePasswordSave = (event) => {
    event.preventDefault();

    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setSecurityMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setSecurityMessage("New password must be at least 8 characters long.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setSecurityMessage("New passwords do not match.");
      return;
    }

    setSecurityMessage("Password updated successfully. 2FA verification completed.");
    setShowPasswordForm(false);
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    navigate("/loginpage");
  };

  const handleDeleteAccount = () => {
    setSecurityMessage("Account deletion requested. Our team will contact you shortly.");
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
            <div className="section-card">
              <h3>Personal information</h3>
              <div className="info-list">
                <div className="info-item"><span>Full name</span><strong>{profile.fullName}</strong></div>
                <div className="info-item"><span>Email</span><strong>{profile.email}</strong></div>
                <div className="info-item"><span>Phone</span><strong>{profile.phone}</strong></div>
              </div>
            </div>

            <div className="section-card">
              <h3>My orders</h3>
              {savedOrders.length > 0 ? savedOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-meta">
                    <strong>{order.id}</strong>
                    <span className={`status-pill status-${order.status}`}>{order.status}</span>
                  </div>
                  <p><strong>Item:</strong> {order.item}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Amount:</strong> Ksh {Number(order.amount).toLocaleString()}</p>
                  <div className="delivery-track">
                    <div className="track-step active">Placed</div>
                    <div className={`track-step ${order.progress >= 2 ? "active" : ""}`}>Packed</div>
                    <div className={`track-step ${order.progress >= 3 ? "active" : ""}`}>On the way</div>
                    <div className={`track-step ${order.progress >= 4 ? "active" : ""}`}>Delivered</div>
                  </div>
                </div>
              )) : <p className="empty-order">Your checked out orders will appear here.</p>}
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-grid">
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

            <div className="section-card">
              <h3>Account actions</h3>
              <div className="security-actions">
                <button className="secondary-btn" onClick={handleLogout}>Log out</button>
                <button className="danger-btn" onClick={handleDeleteAccount}>Delete account</button>
              </div>
            </div>
          </div>
        </div>

        {securityMessage ? <div className="profile-toast">{securityMessage}</div> : null}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
