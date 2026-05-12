import { FC, Fragment, useRef } from 'react';
import { NavLink } from 'react-router';
import gsap from 'gsap';
import { Menu } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';
import { useGSAP } from '@gsap/react';
import { useThemeStore } from '@/store/themeStore';

const NavBar: FC = () => {
  // const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  // const logout = useAuthStore((state) => state.logout);
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

  // const handleLogout = () => {
  //   logout();
  //   navigate('/', { replace: true });
  // };

  return (
    <nav ref={menuItems} className="bg-primary top-0 z-50 py-3 px-4 sm:px-8">
      <div className="flex justify-between items-center">
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
        <Menu className="sm:hidden text-accent" />
        <div className="items-wrapper relative hidden sm:flex right-3.5 gap-5 hover:text-white">
          {user ? (
            <Fragment>
              {/* <p className="text-accent">{`Hola: ${user?.fullName || 'fulano'}`}</p> */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
              {/* <button
                className="text-secondary hover:text-white cursor-pointer"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button> */}
            </Fragment>
          ) : (
            <Fragment>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-colors font-bold ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `transition-colors font-bold ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
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

export default NavBar;
