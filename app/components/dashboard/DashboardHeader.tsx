import { useRef } from 'react';
import { useLocation } from 'react-router';
import { useGSAP } from '@gsap/react';

import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { getInitials } from '@/utils/getInitials';
import { getSectionSubtitle } from '@/utils/getSectionSubtitle';
import DashboardMenu from './DashboardMenu';
import SettingsPanel from './SettingsPanel';
import { useThemeStore } from '@/store/themeStore';
import gsap from 'gsap';

const DashboardHeader = () => {
  const location = useLocation();
  const dashboardHeaderRef = useRef<HTMLDivElement>(null);
  const expanded = useThemeStore((state) => state.expanded);
  const user = useAuthStore((state) => state.user);
  const toggleSettings = useSettingsStore((state) => state.toggleSettings);

  useGSAP(
    () => {
      gsap.to('.button-wrapper', {
        x: expanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: dashboardHeaderRef,
      dependencies: [expanded],
    },
  );

  return (
    <header
      ref={dashboardHeaderRef}
      className="relative flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 p-6 bg-lightness dark:bg-darkness rounded-b-2xl shadow-sm border border-dark/10 dark:border-light/10 overflow-visible"
    >
      <div className="flex items-center gap-4">
        <div
          onClick={toggleSettings}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:opacity-90 transition-opacity"
        >
          {user ? getInitials(user?.fullName) : 'U'}
        </div>
        <div>
          <h1 className="text-xl font-bold text-dark dark:text-light">
            Hola, {user?.fullName || 'Usuario'}
          </h1>
          <p className="text-dark/60 dark:text-light/60 text-sm">
            {getSectionSubtitle(location.pathname)}
          </p>
        </div>
      </div>
      <DashboardMenu />
      <SettingsPanel />
    </header>
  );
};

export default DashboardHeader;
