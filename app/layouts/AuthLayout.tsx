
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const location = useLocation();
  // Tu lógica de sesión (puedes usar un context después)
  const isAuthenticated = !!localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}