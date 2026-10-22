import { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.js";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("Login successful:", data);

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message);

      // Redirect after successful login
      navigate("/HomePage");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Loginpage">
      <div className="login-card">

        {/* Left image panel */}
        

        {/* Right form panel */}
        <div className="login-form-panel">

          <h3 style={{ textAlign: "center" }}>
            GoBuy Online Shop
          </h3>

          <h1 className="Register-link">
            Login
          </h1>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="login-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="success-message" role="status">
                {message}
              </p>
            )}

            <button type="submit">
              Login
            </button>

          </form>

          <div className="Register-link login-register-prompt">
            <h4>
              New Here?{" "}
              <Link to="/registerpage">Register</Link>
            </h4>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default LoginPage;