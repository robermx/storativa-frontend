import { FC, useRef } from 'react';
import { NavLink } from 'react-router';
import gsap from 'gsap';

import { useGSAP } from '@gsap/react';

import { useMenuStore } from '@/store/menuStore';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';
import UserInfo from '../dashboard/UserInfo';
import ToggleButton from '../navbar/ToggleButton';
import EmergentMenu from '../navbar/EmergentMenu';
import useNavigationLink from '@/hooks/useNavigationLink';

interface NavbarProps {
  areExcludedPaths: boolean;
}

const Navbar: FC<NavbarProps> = ({ areExcludedPaths }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const themeExpanded = useThemeStore((state) => state.themeExpanded);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);

  const { handleNavLinkClick } = useNavigationLink();

  useGSAP(
    () => {
      gsap.to('.navbar-wrapper', {
        y: areExcludedPaths ? -74 : 0,
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
      dependencies: [areExcludedPaths, themeExpanded, menuExpanded],
    },
  );

  return (
    <nav ref={menuRef} className="fixed w-full z-50">
      <div
        className={`navbar-wrapper transition-colors ${user ? 'dark:bg-darkness bg-lightness' : 'bg-primary'} flex justify-between items-center py-3 px-4 sm:px-8`}
      >
        {user ? (
          <UserInfo />
        ) : (
          <NavLink to="/" onClick={(event) => handleNavLinkClick(event, '/')}>
            {({ isActive }) => (
              <div className="flex items-center gap-3">
                <IsoSimple />
                <MainLogo
                  className={`transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`}
                />
              </div>
            )}
          </NavLink>
        )}
        <ToggleButton />
      </div>
      <EmergentMenu handleClick={handleNavLinkClick} />
    </nav>
  );
};

export default Navbar;
