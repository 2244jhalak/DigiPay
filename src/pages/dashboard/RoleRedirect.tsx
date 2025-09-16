
import { getUser } from "../../utilities/Auth";
import { Navigate } from "react-router";

const RoleRedirect = () => {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin-dashboard" replace />;
    case "agent":
      return <Navigate to="/agent-dashboard" replace />;
    case "user":
      return <Navigate to="/user-dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleRedirect;
