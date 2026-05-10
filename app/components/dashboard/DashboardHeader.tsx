import { useAuthStore } from '@/store/authStore';
import { getInitials } from '@/utils/getInitials';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
          {user ? getInitials(user?.fullName) : 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-light">
            Hola, {user?.fullName || 'Usuario'}
          </h1>
          <p className="text-dark/60 dark:text-light/60 text-sm">Dashboard</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
      >
        <LogOut />
        Cerrar sesión
      </button>
    </header>
  );
};

export default DashboardHeader;
