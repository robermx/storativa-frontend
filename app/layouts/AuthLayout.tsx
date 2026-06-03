import { Outlet } from 'react-router';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export const AuthLayout = () => {
  return (
    <div className="w-full ">
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
