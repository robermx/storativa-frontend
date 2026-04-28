import { useLocation } from "react-router";

const Dashboard = () => {
  const { state } = useLocation();
  const { fullName, email } = state;

  return (
    <div>
      <h1>Bienvenido, {fullName || "Usuario"}</h1>
      <p>Tu correo es: {email}</p>
    </div>
  );
};

export default Dashboard;
