import { useAuth } from "@/context/AuthContext";
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/registration" state={{ from: location }} replace />;
};

export default PrivateRoute;
