import { FC } from "react";
import { NavLink } from "react-router";

import MainLogo from "@/assets/logo/MainLogo";
import IsoSimple from "@/assets/logo/IsoSimple";
import { Menu } from "lucide-react";

const NavBar: FC = () => {
  return (
    <nav className="bg-primary sticky top-0 z-50 py-3 sm:pl-8 pl-4 pr-15 sm:pr-19">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <IsoSimple />
              <MainLogo
                className={`transition-colors ${isActive ? "text-white" : "text-secondary hover:text-white"}`}
              />
            </div>
          )}
        </NavLink>
        <Menu className="sm:hidden text-accent"/>
        <div className="hidden sm:flex gap-5 hover:text-white">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
