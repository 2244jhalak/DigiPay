
import { Navigate } from "react-router";
import { getUser, getToken } from "../utilities/Auth";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  roles?: string[]; // e.g., ["admin", "agent"]
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const user = getUser();
  const token = getToken();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
