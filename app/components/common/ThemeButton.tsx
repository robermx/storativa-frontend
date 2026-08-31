import { FC, useRef } from 'react';
import gsap from 'gsap';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useGSAP } from '@gsap/react';

const ThemeButton: FC = () => {
  const themeExpanded = useThemeStore((state) => state.themeExpanded);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleThemeExpand = useThemeStore((state) => state.toggleThemeExpand);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const themeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.theme-wrapper', {
        x: themeExpanded ? -40 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.arrow-icon', {
        rotate: themeExpanded ? 180 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: themeRef,
      dependencies: [themeExpanded],
    },
  );

  const handleToggleTheme = () => {
    toggleDarkMode();
    toggleThemeExpand();
  };

  return (
    <section
      ref={themeRef}
      className="fixed z-60 -right-10 top-6.5"
    >
      <div className="theme-wrapper relative bg-lightness dark:bg-darkness rounded-bl-md rounded-tl-md">
        <div className="flex justify-end items-center gap-2 border-dark/20 dark:border-light/20 py-1">
          <button
            onClick={toggleThemeExpand}
            className="px-1 border-r border-dark/20 dark:border-light/20 cursor-pointer"
            aria-label={themeExpanded ? 'Contraer menú' : 'Expandir menú'}
          >
            <ChevronLeft
              size={24}
              className="arrow-icon text-dark dark:text-light"
            />
          </button>

          <button
            onClick={handleToggleTheme}
            className="pr-2 cursor-pointer"
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <Sun className="text-accent fill-accent" size={24} />
            ) : (
              <Moon className="text-transparent fill-dark" size={24} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThemeButton;
