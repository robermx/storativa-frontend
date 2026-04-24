import { Dispatch, FC } from "react";
import { NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";

import MainLogo from "@/assets/logo/MainLogo";

interface NavBarProps {
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const NavBar: FC<NavBarProps> = ({ setIsDarkMode, isDarkMode }) => {
  return (
    <nav className="p-4 bg-primary backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-8">
      <NavLink to="/">
        {({ isActive }) => (
          <MainLogo
            className={`transition-colors ${isActive ? "text-white" : "text-secondary hover:text-white"}`}
          />
        )}
      </NavLink>
      <div className="flex gap-6">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-colors ${isActive ? "text-white" : "text-secondary hover:text-white"}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `transition-colors ${isActive ? "text-white" : "text-secondary hover:text-white"}`
          }
        >
          Login
        </NavLink>
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="rounded-full transition-all"
          aria-label="Cambiar tema"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400 fill-yellow-400" size={24} />
          ) : (
            <Moon className="text-transparent fill-gray-600" size={24} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
