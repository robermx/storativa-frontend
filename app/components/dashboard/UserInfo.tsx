import { FC } from "react";
import gsap from "gsap";

import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useMenuStore } from "@/store/menuStore";
import { getInitials } from "@/utils/getInitials";
import { getSectionSubtitle } from "@/utils/getSectionSubtitle";


const UserInfo: FC = () => {
  const user = useAuthStore((state) => state.user);
  const toggleSettings = useSettingsStore((state) => state.toggleSettings);
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);

  const handleSettingsClick = () => {
    const currentScrollY =
      window.scrollY || document.documentElement.scrollTop || 0;

    if (currentScrollY === 0) {
      toggleSettings();
      closeMenuExpand()
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
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleSettingsClick}
        className="w-12.5 h-12.5 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:opacity-90 transition-opacity"
      >
        {getInitials(user?.fullName || "User")}
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
  );
};

export default UserInfo;
