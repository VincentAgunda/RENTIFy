import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

const isLandlord = () => {
  const role = localStorage.getItem("role");
  return role === "landlord";
};

function PrivateRoute({ children, roleRequired }) {
  // Allow public access to the dashboard route
  if (window.location.pathname === "/dashboard") {
    return children;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roleRequired === "landlord" && !isLandlord()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
