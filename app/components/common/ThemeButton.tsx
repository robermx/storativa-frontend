import { FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeProps } from '@/interfaces/theme.interface';

const ThemeButton: FC<ThemeProps> = ({ setIsDarkMode, isDarkMode }) => {
  return (
    <div className="absolute right-4 sm:right-8 top-6 flex justify-center items-center z-60">
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="rounded-full transition-all cursor-pointer"
        aria-label="Cambiar tema"
      >
        {isDarkMode ? (
          <Sun className="text-accent fill-accent" size={26} />
        ) : (
          <Moon className="text-transparent fill-dark" size={26} />
        )}
      </button>
    </div>
  );
};

export default ThemeButton;
