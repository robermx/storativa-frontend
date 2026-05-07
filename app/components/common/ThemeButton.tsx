import { FC, useRef, useState } from 'react';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ThemeButton: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const themeContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.animated-container', {
        x: expanded ? 0 : 40,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to('.arrow-icon', {
        rotate: expanded ? 180 : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: themeContainer,
      dependencies: [expanded],
    },
  );

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleToggleTheme = () => {
    toggleDarkMode();
    handleToggleExpand();
  };

  return (
    <div
      ref={themeContainer}
      className="fixed top-22 right-0 overflow-hidden z-100"
    >
      <div className="animated-container flex justify-end items-center gap-2 border-t border-b border-l rounded-bl-md rounded-tl-md border-dark/20 dark:border-light/20 py-1 bg-white dark:bg-slate-900">
        <button
          onClick={handleToggleExpand}
          className="px-1 border-r border-dark/20 dark:border-light/20"
          aria-label={expanded ? 'Contraer menú' : 'Expandir menú'}
        >
          <ChevronLeft
            size={18}
            className="arrow-icon text-dark dark:text-light"
          />
        </button>

        <button
          onClick={handleToggleTheme}
          className="pr-2"
          aria-label="Cambiar tema"
        >
          {isDarkMode ? (
            <Sun className="text-accent fill-accent" size={22} />
          ) : (
            <Moon className="text-dark fill-dark" size={22} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ThemeButton;
