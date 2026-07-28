import { FC } from 'react';

import { useAuthStore } from '@/store/authStore';
import { publicRoutes, privateRoutes } from '@/constants/common/navbarRoutes';
import CustomLink from '../shared/CustomLink';

const EmergentMenu: FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="absolute overflow-hidden w-full">
      <div className="items-wrapper min-h-8 dark:bg-accent bg-secondary relative bottom-10 flex justify-end items-center gap-x-3 px-6">
        {(user ? privateRoutes : publicRoutes).map((route) => (
          <CustomLink
            key={route.id}
            path={route.path}
            displayName={route.displayName}
          />
        ))}
      </div>
    </div>
  );
};

export default EmergentMenu;
