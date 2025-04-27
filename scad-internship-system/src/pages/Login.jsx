import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure correct path for the CSS
import gucLogo from "../assets/guc.jpg"; // Path to the logo

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now
    console.log("Logging in with", email, password);
    navigate("/student-dashboard"); // Redirect to dashboard
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={gucLogo} alt="GUC Logo" className="logo" />
        </div>
        <h2 className="login-title">Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
