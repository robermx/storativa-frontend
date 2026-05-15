import { useRef } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { getInitials } from '@/utils/getInitials';
import { Home, LogOut, Plus } from 'lucide-react';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const expanded = useThemeStore((state) => state.expanded);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const dashboardHeaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.button-wrapper', {
        x: expanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: dashboardHeaderRef,
      dependencies: [expanded],
    },
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      ref={dashboardHeaderRef}
      className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 p-6 bg-lightness dark:bg-darkness rounded-xl shadow-sm border border-dark/10 dark:border-light/10"
    >
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
      <div className="button-wrapper relative flex gap-3 right-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
        >
          <Home />
        </button>
        <button
          onClick={() => navigate('/create')}
          className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
        >
          <Plus />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
        >
          <LogOut />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
