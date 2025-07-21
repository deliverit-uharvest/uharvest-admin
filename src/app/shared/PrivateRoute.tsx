import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/tokenService";

const PrivateRoute: React.FC = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
