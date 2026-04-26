import { FC } from "react";
import ThemeButton from "./ThemeButton";
import { ThemeProps } from "@/interfaces/theme.interface";

const Footer: FC<ThemeProps> = ({ setIsDarkMode, isDarkMode }) => {
  return (
    <footer className="bg-lightness dark:bg-darkness py-2 px-8">
      <div className="flex justify-between">
        <ThemeButton setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
        <p className="text-dark dark:text-accent">© {new Date().getFullYear()} Derechos Reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
