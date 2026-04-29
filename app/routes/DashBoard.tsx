import { useNavigate, NavLink } from 'react-router';

import { useAuthStore } from '@/store/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);

  const handeleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="">
      <h1>Hola, {fullName || 'Usuario'}</h1>
      <button className="bg-primary p-2" onClick={handeleLogout}>
        logout
      </button>
      <NavLink to="/">home</NavLink>
    </div>
  );
};

export default Dashboard;
