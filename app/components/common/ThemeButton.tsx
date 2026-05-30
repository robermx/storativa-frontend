import { FC, useRef } from 'react';
import gsap from 'gsap';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useGSAP } from '@gsap/react';

const ThemeButton: FC = () => {
  const expanded = useThemeStore((state) => state.expanded);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleExpand = useThemeStore((state) => state.toggleExpand);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const themeContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.animated-container', {
        x: expanded ? -38 : 0,
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

  const handleToggleTheme = () => {
    toggleDarkMode();
    toggleExpand();
  };

  return (
    <section
      ref={themeContainer}
      className="absolute overflow-hidden right-0 w-17 h-8 top-5"
    >
      <div className="animated-container absolute -right-9.5">
        <div className="flex justify-end items-center gap-2 border-t border-b border-l rounded-bl-md rounded-tl-md border-dark/20 dark:border-light/20 py-1 bg-white dark:bg-slate-900">
          <button
            onClick={toggleExpand}
            className="px-1 border-r border-dark/20 dark:border-light/20 cursor-pointer"
            aria-label={expanded ? 'Contraer menú' : 'Expandir menú'}
          >
            <ChevronLeft
              size={18}
              className="arrow-icon text-dark dark:text-light"
            />
          </button>

          <button
            onClick={handleToggleTheme}
            className="pr-2 cursor-pointer"
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <Sun className="text-accent fill-accent" size={22} />
            ) : (
              <Moon className="text-transparent fill-dark" size={22} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThemeButton;
