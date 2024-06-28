import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { AuthProvider } from "./context/AuthProvider";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import axiosInstance from "./serviceApis/axiosInstance";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";


const App = () => {

  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    axiosInstance.interceptors.request.use(function (config) {
      setLoading(true);
      return config;
    }, function (error) {
      setLoading(false)
      return Promise.reject(error);
    });
  
  axiosInstance.interceptors.response.use(function (response) {
    setLoading(false)
      return response;
    },  function (error) {
      setLoading(false);
      console.log("intercept",error)
      return Promise.reject(error);
    });
  },[])

  console.log("loader->",loading)

  return (
    <AuthProvider>
      <div>
      {loading&&          <div class="loader-overlay">
      <div class="loader"><ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /></div>
    </div>  }

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
