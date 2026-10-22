import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";
import { registerUser } from "../services/api.js";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      setMessage(data.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log("Registered user:", data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registerpage">

      <div className="register-card">

        {/* Left image panel */}
       
        {/* Right form panel */}
        <div className="register-form-panel">

          <div className="register-header">
            <div>
              <h3 style={{ textAlign: "center" ,fontWeight:"600"}}>
                Welcome to GoBuy-Online Shop. Sign Up to manage your account
              </h3>

              <h2>Sign Up</h2>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>

            <div className="name-row">
              <div className="form-group">
              <label htmlFor="register-name">Name</label>

                <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email</label>

              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>

              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="Create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>

              <input
                id="register-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="success-message" role="status">
                {message}
              </p>
            )}

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-btn"
            >
              Register
            </button>

            <div className="Loginlink">
              <h4>
                Already have an account?{" "}
                <Link to="/LoginPage">Log in</Link>
              </h4>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;