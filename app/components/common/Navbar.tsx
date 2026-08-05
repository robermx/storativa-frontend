import { FC, useRef } from 'react';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

import { useMenuStore } from '@/store/menuStore';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import UserInfo from '../navbar/UserInfo';
import ToggleButton from '../navbar/ToggleButton';
import EmergentMenu from '../navbar/EmergentMenu';
import CustomLink from '../shared/CustomLink';
import useDynamicNavHeight from '@/hooks/useDynamicNavHeight';
import { useNavHeight } from '@/store/navHeightStore';

interface NavbarProps {
  areExcludedPaths: boolean;
}

const Navbar: FC<NavbarProps> = ({ areExcludedPaths }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useDynamicNavHeight(menuRef, addMenuRef);
  const user = useAuthStore((state) => state.user);
  const themeExpanded = useThemeStore((state) => state.themeExpanded);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const navHeight = useNavHeight((state) => state.navHeight);

  useGSAP(
    () => {
      gsap.to('.navbar-wrapper', {
        y: areExcludedPaths ? -navHeight : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.menu-button', {
        x: themeExpanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.items-wrapper', {
        y: menuExpanded ? 40 : 0,
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
      dependencies: [areExcludedPaths, themeExpanded, menuExpanded, navHeight],
    },
  );

  return (
    <nav ref={menuRef} className="fixed w-full z-50" inert={areExcludedPaths}>
      <div
        className={`navbar-wrapper transition-colors ${user ? 'dark:bg-darkness bg-lightness' : 'bg-primary'} flex justify-between items-center py-3 px-4 sm:px-8`}
      >
        {Boolean(user) ? <UserInfo /> : <CustomLink isMainMenu />}
        <ToggleButton />
      </div>
      <EmergentMenu addMenuRef={addMenuRef} />
    </nav>
  );
};

export default Navbar;
