import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router";

import MainLogo from "@/assets/logo/MainLogo";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      <nav className="p-4 bg-primary backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 flex justify-between items-center px-8">
        <NavLink to="/">
          <MainLogo fill="white" />
        </NavLink>
        <div className="flex gap-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-colors ${isActive ? "text-secondary" : "text-white hover:text-secondary"}`
            }
          >
            About
          </NavLink>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="p-8 bg-dark text-white text-center">
        <p>© {new Date().getFullYear()} Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default MainLayout;
