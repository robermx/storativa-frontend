import { FC, Fragment, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';

import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';
import { privateRoutes, publicRoutes } from '@/constants/common/navbarRoutes';

const Navbar: FC = () => {
  const [mobileExpand, setMobileExpand] = useState<boolean>(false);
  const menuItems = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
  const expanded = useThemeStore((state) => state.expanded);

  useGSAP(
    () => {
      gsap.to('.menu-button', {
        x: expanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.items-wrapper', {
        y: mobileExpand ? 40 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.menu-icon', {
        rotation: mobileExpand ? 90 : 0,
        opacity: mobileExpand ? 0 : 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to('.x-icon', {
        rotation: mobileExpand ? 0 : -90,
        opacity: mobileExpand ? 1 : 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    },
    {
      scope: menuItems,
      dependencies: [expanded, mobileExpand],
    },
  );

  return (
    <nav ref={menuItems}>
      <div className="bg-primary flex justify-between items-center py-3 px-4 sm:px-8 z-50">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <IsoSimple />
              <MainLogo
                className={`transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`}
              />
            </div>
          )}
        </NavLink>
        <button
          onClick={() => setMobileExpand(!mobileExpand)}
          className="menu-button relative right-7 sm:right-3 w-6 h-6"
        >
          <Menu className="menu-icon text-light absolute inset-0" />
          <X className="x-icon text-light absolute inset-0 opacity-0" />
        </button>
      </div>
      <div className="overflow-y-hidden relative min-h-10">
        <div className="items-wrapper flex absolute bottom-10 right-0 gap-x-4 z-30 px-4 py-2">
          {user
            ? privateRoutes.map((route) => (
                <Fragment key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `transition-colors font-bold ${isActive ? 'text-darkness dark:text-lightness' : 'text-gray-500 hover:text-darkness dark:hover:text-lightness'}`
                    }
                  >
                    {route.routeName}
                  </NavLink>
                  <span className="text-primary last:hidden">|</span>
                </Fragment>
              ))
            : publicRoutes.map((route) => (
                <Fragment key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `transition-colors font-bold ${isActive ? 'text-darkness dark:text-lightness' : 'text-gray-500 hover:text-darkness dark:hover:text-lightness'}`
                    }
                  >
                    {route.routeName}
                  </NavLink>
                  <span className="text-primary last:hidden">|</span>
                </Fragment>
              ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
