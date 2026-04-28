import { useLocation, useNavigate } from "react-router";

import { useAuthStore } from "@/store/authStore";
import { checkUserStatus } from "@/services/auth.service";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { fullName, email } = state;

  const handeleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/login");
  };

  const handleCheck = async () => {
    const { user, token, refreshToken } = await checkUserStatus();
    console.log({ user, token, refreshToken });
  };

  return (
    <div className="block">
      <h1>Bienvenido, {fullName || "Usuario"}</h1>
      <p>Tu correo es: {email}</p>
      <button className="bg-primary p-2" onClick={handeleLogout}>
        logout
      </button>
      <button className="bg-secondary p-2" onClick={handleCheck}>
        check status
      </button>
    </div>
  );
};

export default Dashboard;
