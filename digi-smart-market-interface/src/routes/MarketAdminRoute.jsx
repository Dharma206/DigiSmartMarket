import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const MarketAdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const userDetails = user ? JSON.parse(user) : null;
  const { isAuthenticated, login } = useAuth();

  return isAuthenticated&&userDetails?.role==='MarketAdmin'  ? children : <Navigate to="/login" />;
};

export default MarketAdminRoute;