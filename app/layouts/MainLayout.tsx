import { Dispatch, FC, PropsWithChildren } from "react";
import { NavLink } from "react-router";

import MainLogo from "@/assets/logo/MainLogo";
import { Moon, Sun } from "lucide-react";

interface MainLayoutProps {
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  setIsDarkMode,
  isDarkMode,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
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

      <main className="grow">{children}</main>

      <footer className="p-8 bg-dark text-white text-center">
        <p>© {new Date().getFullYear()} Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default MainLayout;
