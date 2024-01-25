import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../utils/auth";

const ProtectedRoute = ({ path, element: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      path={path}
      element={isAuthenticated ? <Component /> : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;
