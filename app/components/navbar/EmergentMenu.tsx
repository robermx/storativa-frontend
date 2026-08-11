import { FC, Fragment, RefObject } from 'react';

import { useAuthStore } from '@/store/authStore';
import { publicRoutes, privateRoutes } from '@/constants/shared/navbarRoutes';
import CustomLink from '../shared/CustomLink';

interface EmergentMenuProps {
  addMenuRef: RefObject<HTMLDivElement | null>;
}

const EmergentMenu: FC<EmergentMenuProps> = ({ addMenuRef }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div
      ref={addMenuRef}
      id="emergent-menu"
      className="absolute w-full overflow-hidden"
    >
      <div className="emergent-menu-wrapper dark:bg-accent bg-secondary relative bottom-10 flex justify-end items-center gap-x-3 px-6">
        {(Boolean(user) ? privateRoutes : publicRoutes).map(
          (route, index, routes) => (
            <Fragment key={route.id}>
              <CustomLink
                to={route.path}
                className="text-gray-500 hover:text-darkness"
                activeClassName="text-darkness"
              >
                {route.displayName}
              </CustomLink>
              {index < routes.length - 1 && (
                <span className="text-primary">|</span>
              )}
            </Fragment>
          ),
        )}
      </div>
    </div>
  );
};

export default EmergentMenu;
