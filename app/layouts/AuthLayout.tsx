import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const [status, setStatus] = useState<"loading" | "auth" | "unauth">("loading");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    
    setTimeout(() => {
      setStatus(token ? "auth" : "unauth");
    }, 0);
  }, []);

  // Mientras verificamos el token, no renderizamos nada (o un spinner)
  if (status === "loading") {
    return null; 
  }

  if (status === "unauth") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
}