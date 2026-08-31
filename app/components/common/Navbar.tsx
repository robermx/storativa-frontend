import { FC, useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

import { useMenuStore } from '@/store/menuStore';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import UserInfo from '../navbar/UserInfo';
import ToggleButton from '../navbar/ToggleButton';
import EmergentMenu from '../navbar/EmergentMenu';
import BrandLink from '../shared/BrandLink';
import useDynamicNavHeight from '@/hooks/useDynamicNavHeight';
import { useNavHeight } from '@/store/navHeightStore';

interface NavbarProps {
  isVisible: boolean;
  onExitComplete: () => void;
}

const Navbar: FC<NavbarProps> = ({ isVisible, onExitComplete }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useDynamicNavHeight(menuRef, addMenuRef);
  const user = useAuthStore((state) => state.user);
  const themeExpanded = useThemeStore((state) => state.themeExpanded);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const navHeight = useNavHeight((state) => state.navHeight);

  useGSAP(
    () => {
      if (!menuRef.current) return;

      gsap.to(menuRef.current, {
        y: isVisible ? 0 : -navHeight,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          if (!isVisible) onExitComplete();
        },
      });
      gsap.to('.navbar-wrapper', {
        paddingRight: themeExpanded ? 100 : 60,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.emergent-menu-wrapper', {
        y: isVisible && menuExpanded ? 40 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.menu-icon', {
        rotation: menuExpanded ? 90 : 0,
        opacity: menuExpanded ? 0 : 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to('.x-icon', {
        rotation: menuExpanded ? 0 : -90,
        opacity: menuExpanded ? 1 : 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    },
    {
      scope: menuRef,
      dependencies: [isVisible, menuExpanded, navHeight, themeExpanded],
    },
  );

  return (
    <nav ref={menuRef} className="fixed w-full z-50">
      <div
        className={`navbar-wrapper flex gap-x-3 justify-between items-center transition-colors ${user ? 'dark:bg-darkness bg-lightness' : 'bg-primary'} py-3 pl-3 sm:pl-4 md:pl-6 pr-15`}
      >
        {Boolean(user) ? <UserInfo /> : <BrandLink />}
        <ToggleButton />
      </div>
      <EmergentMenu addMenuRef={addMenuRef} />
    </nav>
  );
};

export default Navbar;
