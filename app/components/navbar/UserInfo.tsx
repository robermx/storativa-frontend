import { FC } from 'react';
import { useLocation, useRouteLoaderData } from 'react-router';
import gsap from 'gsap';

import { getInitials } from '@/utils/getInitials';
import { getSubtitleByPath } from '@/utils/getSubtitleByPath';
import { titleFormat } from '@/utils/titleFormat';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useMenuStore } from '@/store/menuStore';
import { clientLoader as eLoader } from '@/routes/Edition';

const UserInfo: FC = () => {
  const editionData = useRouteLoaderData<typeof eLoader>('routes/Edition');
  const { pathname } = useLocation();

  const user = useAuthStore((state) => state.user);
  const toggleSettings = useSettingsStore((state) => state.toggleSettings);
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);
  const title = editionData?.storativa.title;

  const handleSettingsClick = () => {
    const currentScrollY =
      window.scrollY || document.documentElement.scrollTop || 0;

    if (currentScrollY === 0) {
      toggleSettings();
      closeMenuExpand();
      return;
    }

    const scrollState = { y: currentScrollY };

    gsap.to(scrollState, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        window.scrollTo(0, scrollState.y);
      },
      onComplete: toggleSettings,
    });
  };

  return (
    <div className="flex min-w-0 flex-1 gap-3">
      <button
        type="button"
        onClick={handleSettingsClick}
        className="h-12.5 w-12.5 shrink-0 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
      >
        {getInitials(user?.fullName || 'User')}
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-md font-bold text-dark dark:text-light sm:text-xl">
          {title
            ? titleFormat(title)
            : titleFormat(user?.fullName || 'usuario')}
        </h1>
        <p className="truncate text-dark/60 dark:text-light/60 text-sm">
          {getSubtitleByPath(pathname)}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
