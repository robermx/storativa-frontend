import { Fragment, useRef } from 'react';
import { useLocation } from 'react-router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useSettingsStore } from '@/store/settingsStore';
import { getSectionSubtitle } from '@/utils/getSubtitleByPath';
import { getInitials } from '@/utils/getInitials';

import SettingsPanel from '@/components//navbar/SettingsPanel';
import DashboardMenu from './DashboardMenu';

const DashboardHeader = () => {
  const location = useLocation();
  const dashboardHeaderRef = useRef<HTMLDivElement>(null);
  const themeExpanded = useThemeStore((state) => state.themeExpanded);
  const user = useAuthStore((state) => state.user);
  const toggleSettings = useSettingsStore((state) => state.toggleSettings);

  const handleSettingsClick = () => {
    const currentScrollY =
      window.scrollY || document.documentElement.scrollTop || 0;

    if (currentScrollY === 0) {
      toggleSettings();
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

  useGSAP(
    () => {
      gsap.to('.button-wrapper', {
        x: themeExpanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: dashboardHeaderRef,
      dependencies: [themeExpanded],
    },
  );

  return (
    <Fragment>
      <header
        ref={dashboardHeaderRef}
        className="flex items-start justify-between gap-4 p-5 bg-lightness dark:bg-darkness border border-dark/10 dark:border-light/10 overflow-visible"
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSettingsClick}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:opacity-90 transition-opacity"
          >
            {user ? getInitials(user?.fullName) : 'U'}
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-dark dark:text-light">
              Hola, {user?.fullName || 'Usuario'}
            </h1>
            <p className="text-dark/60 dark:text-light/60 text-sm">
              {getSectionSubtitle(location.pathname)}
            </p>
          </div>
        </div>
        <DashboardMenu />
      </header>
      <SettingsPanel />
    </Fragment>
  );
};

export default DashboardHeader;
