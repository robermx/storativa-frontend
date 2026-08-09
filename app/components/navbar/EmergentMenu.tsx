import { FC, RefObject } from 'react';

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
        {(Boolean(user) ? privateRoutes : publicRoutes).map((route) => (
          <CustomLink
            key={route.id}
            path={route.path}
            displayName={route.displayName}
            withPipe
          />
        ))}
      </div>
    </div>
  );
};

export default EmergentMenu;
