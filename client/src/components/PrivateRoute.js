import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

const isLandlord = () => {
  const role = localStorage.getItem("role");
  return role === "landlord";
};

function PrivateRoute({ children, roleRequired }) {
  const location = useLocation(); // This gets the current location (to store it for redirect after login)

  // If user is not authenticated, redirect to login and store the current location to return after login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires a specific role (e.g., landlord), check if the user has that role
  if (roleRequired === "landlord" && !isLandlord()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;

