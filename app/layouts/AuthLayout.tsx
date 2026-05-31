import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';
import useHydrated from '@/hooks/useHydrated';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export const AuthLayout = () => {
  const hydrated = useHydrated();
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !token) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [hydrated, token, navigate, location]);

  if (!hydrated || !token) {
    return null;
  }

  return (
    <div className="w-full ">
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
