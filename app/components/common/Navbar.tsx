import { FC, Fragment, useRef } from 'react';
import { NavLink } from 'react-router';
import {
  Navbar as MainNavigate,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from 'flowbite-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useAuthStore } from '@/store/authStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';
import { useThemeStore } from '@/store/themeStore';

const Navbar: FC = () => {
  const user = useAuthStore((state) => state.user);
  const expanded = useThemeStore((state) => state.expanded);
  const menuItems = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.items-wrapper', {
        x: expanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: menuItems,
      dependencies: [expanded],
    },
  );

  return (
    <MainNavigate ref={menuItems} className="bg-lightness dark:bg-darkness">
      <NavbarBrand href="/" as={NavLink}>
        <div className="flex items-center gap-3">
          <IsoSimple />
          <MainLogo className="text-primary" />
        </div>
      </NavbarBrand>
      <NavbarToggle className="items-wrapper relative right-6" />

      <NavbarCollapse>
        {user ? (
          <Fragment>
            <NavLink
              className="text-dark dark:text-light px-4 py-2 text-right text-lg m-0"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </Fragment>
        ) : (
          <Fragment>
            <NavLink
              className="text-dark dark:text-light px-4 py-2 text-right text-lg m-0"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className="text-dark dark:text-light px-4 py-2 text-right text-lg m-0"
              to="/login"
            >
              Login
            </NavLink>
          </Fragment>
        )}
      </NavbarCollapse>
    </MainNavigate>
  );
};

export default Navbar;
