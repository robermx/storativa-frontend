import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
