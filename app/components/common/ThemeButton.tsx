import { FC } from "react";
import { Moon, Sun } from "lucide-react"
import { ThemeProps } from "@/interfaces/theme.interface";

const ThemeButton: FC<ThemeProps> = ({ setIsDarkMode, isDarkMode }) => {
  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="rounded-full transition-all cursor-pointer"
      aria-label="Cambiar tema"
    >
      {isDarkMode ? (
        <Sun className="text-accent fill-accent" size={24} />
      ) : (
        <Moon className="text-transparent fill-dark" size={24} />
      )}
    </button>
  );
};

export default ThemeButton;
