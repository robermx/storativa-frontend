import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

import { useThemeStore } from '@/store/themeStore';
import { EDITOR_THEME_SWATCH } from '@/constants/common/toolbar.constants';



export interface EditorSelectOption {
  value: string;
  label: string;
  swatch?: string;
}

interface EditorSelectProps {
  ariaLabel: string;
  value: string;
  options: EditorSelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EditorSelect = ({
  ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
}: EditorSelectProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const selectedOption = options.find((option) => option.value === value);

  const resolveSwatchColor = (swatch?: string) => {
    if (!swatch) return undefined;

    return swatch === EDITOR_THEME_SWATCH
      ? isDarkMode
        ? 'var(--color-light)'
        : 'var(--color-dark)'
      : swatch;
  };

  const selectedSwatchColor = resolveSwatchColor(selectedOption?.swatch);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <ListboxButton
          aria-label={ariaLabel}
          className="flex h-9 min-w-28 items-center gap-2 rounded-md border border-dark/10 bg-light px-2 text-left text-sm text-dark outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-35 dark:border-light/10 dark:bg-dark dark:text-light"
        >
          {selectedSwatchColor && (
            <span
              aria-hidden="true"
              className="size-3 shrink-0 rounded-full border border-dark/15 dark:border-light/20"
              style={{ backgroundColor: selectedSwatchColor }}
            />
          )}
          <span className="min-w-0 flex-1 truncate">
            {selectedOption?.label ?? ariaLabel}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-dark/55 dark:text-light/55"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute left-0 z-30 mt-1 min-w-full overflow-hidden rounded-md border border-dark/10 bg-light py-1 text-sm shadow-lg outline-none dark:border-light/10 dark:bg-dark data-closed:scale-95 data-closed:opacity-0 data-enter:transition data-leave:transition"
        >
          {options.map((option) => {
            const swatchColor = resolveSwatchColor(option.swatch);

            return (
              <ListboxOption
                key={option.value || option.label}
                value={option.value}
                className="group flex cursor-default items-center gap-2 px-3 py-2 text-dark select-none data-focus:bg-primary data-focus:text-light dark:text-light"
              >
                {swatchColor && (
                  <span
                    aria-hidden="true"
                    className="size-3 shrink-0 rounded-full border border-dark/15 dark:border-light/20"
                    style={{ backgroundColor: swatchColor }}
                  />
                )}
                <span className="flex-1 truncate group-data-selected:font-semibold">
                  {option.label}
                </span>
                <Check
                  aria-hidden="true"
                  className="size-4 opacity-0 group-data-selected:opacity-100 group-data-focus:text-light"
                />
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default EditorSelect;
