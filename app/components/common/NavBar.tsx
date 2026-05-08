import { FC, Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Menu } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';
import MainLogo from '@/assets/logo/MainLogo';
import IsoSimple from '@/assets/logo/IsoSimple';

const NavBar: FC = () => {
  const navigate = useNavigate();
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav className="bg-primary top-0 z-50 py-3 px-4 sm:px-8">
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
        <div className="hidden sm:flex gap-5 hover:text-white">
          {fullName ? (
            <Fragment>
              <p className="text-accent">{`Hola: ${fullName}`}</p>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
              <button
                className="text-secondary hover:text-white cursor-pointer"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </Fragment>
          ) : (
            <Fragment>
              {/* <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
                }
              >
                About
              </NavLink> */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-white' : 'text-secondary hover:text-white'}`
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
