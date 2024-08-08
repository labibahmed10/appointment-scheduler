import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = false;

  return auth ? <>{children}</> : <Navigate to="/registration" replace />;
};

export default PrivateRoute;
