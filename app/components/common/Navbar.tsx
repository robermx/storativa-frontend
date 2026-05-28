import { FC, Fragment, useRef } from 'react';
import { NavLink } from 'react-router';
import gsap from 'gsap';
import { Menu } from 'lucide-react';
import { useGSAP } from '@gsap/react';

import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useMoblieExpand } from '@/store/mobileStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';

const Navbar: FC = () => {
  const user = useAuthStore((state) => state.user);
  const expanded = useThemeStore((state) => state.expanded);
  const mobileExpand = useMoblieExpand((state) => state.mobileExpand);
  const toggleMobileExpand = useMoblieExpand(
    (state) => state.toggleMobileExpand,
  );
  const menuItems = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.menu-button', {
        x: expanded ? -38 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.items-wrapper', {
        y: mobileExpand ? 0 : -40,
        duration: 0.3,
        ease: 'power2.in',
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
          onClick={toggleMobileExpand}
          className="menu-button relative right-7 sm:right-3"
        >
          <Menu className="text-light" />
        </button>
      </div>
      <div className="overflow-hidden relative min-h-10">
        <div className="items-wrapper absolute px-4 py-2 right-0 flex gap-x-4 z-30">
          {user ? (
            <Fragment>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-colors font-bold ${isActive ? 'text-darkness dark:text-lightness' : 'text-gray-500 hover:text-darkness dark:hover:text-lightness'}`
                }
              >
                About
              </NavLink>
              <span className="text-primary">|</span>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `transition-colors font-bold ${isActive ? 'text-darkness dark:text-lightness' : 'text-gray-500 hover:text-darkness dark:hover:text-lightness'}`
                }
              >
                Login
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
