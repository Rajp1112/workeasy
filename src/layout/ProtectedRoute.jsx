import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // simple check

  if (!isAuthenticated) {
    return <Navigate to="/protected-fallback" replace />; // redirect to fallback
  }

  return children;
};

export default ProtectedRoute;
