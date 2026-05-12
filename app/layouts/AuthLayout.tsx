import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const AuthLayout = () => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [token, navigate, location]);

  if (!token) {
    return null;
  }

  return <Outlet />;
};

export default AuthLayout;
