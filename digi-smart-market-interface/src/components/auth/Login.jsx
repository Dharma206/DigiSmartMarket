import React, { useState } from "react";
import { postLogin } from "../../serviceApis/loginapi";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import logo from "../../assets/FarmNotes.png";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }
    try {
      const userData = await postLogin({ email: username, password });
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      login();
      toast.success('Login succesfully');
      navigate("/dashboard");
    } catch (error) {
      console.log("error->",error)
      toast.error(error?.response?.data?.error)
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="log-form">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <h4>Sign In </h4>
        <form>
          <input
            type="text"
            title="username"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            title="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
          <button type="button" className="button-wrapper" onClick={handleLogin}>
            Login
          </button>
          <Link to="/signup" className="forgot">
            Create an Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
