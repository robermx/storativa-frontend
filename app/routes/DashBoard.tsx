import { useLocation, useNavigate } from "react-router";

import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { fullName, email } = state;

  const handeleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/login");
  };


  return (
    <div className="block">
      <h1>Bienvenido, {fullName || "Usuario"}</h1>
      <p>Tu correo es: {email}</p>
      <button className="bg-primary p-2" onClick={handeleLogout}>
        logout
      </button>
    </div>
  );
};

export default Dashboard;
