// src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext"; // Import the useAuth hook

const ProtectedRoute = ({ element }) => {
  const { authState } = useAuth(); // Access authState from UserContext

  // Check if the user is authenticated
  if (!authState.token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, return the element
  return element;
};

export default ProtectedRoute;
