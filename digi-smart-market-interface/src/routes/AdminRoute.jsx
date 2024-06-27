import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const userDetails = user ? JSON.parse(user) : null;
  const { isAuthenticated, login } = useAuth();

  console.log("private auth->", isAuthenticated);

  return isAuthenticated&&userDetails?.role==='Admin'  ? children : <Navigate to="/login" />;
};

export default AdminRoute;