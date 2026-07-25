import { FC, Fragment, MouseEvent } from 'react';
import { NavLink } from 'react-router';

import { useAuthStore } from '@/store/authStore';
import { publicRoutes, privateRoutes } from '@/constants/common/navbarRoutes';

interface EmergencyMenuProps {
  handleClick: (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    path: string,
  ) => void;
}

const EmergentMenu: FC<EmergencyMenuProps> = ({ handleClick }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="absolute overflow-hidden w-full">
      <div className="items-wrapper min-h-8 dark:bg-accent bg-secondary relative bottom-10 flex justify-end items-center gap-x-3 px-6">
        {(user ? privateRoutes : publicRoutes).map((route) => (
          <Fragment key={route.id}>
            <NavLink
              onClick={(event) => handleClick(event, route.path)}
              to={route.path}
              className={({ isActive }) =>
                `transition-colors font-bold ${isActive ? 'text-darkness' : 'text-gray-500 hover:text-darkness'}`
              }
            >
              {route.routeName}
            </NavLink>
            <span className="text-primary last:hidden">|</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default EmergentMenu;
