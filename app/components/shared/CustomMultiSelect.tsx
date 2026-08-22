import { FC, useState, Fragment, MouseEvent } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomMultiSelectProps } from '@/interfaces/input.interface';
import { titleFormat } from '@/utils/titleFormat';
import clsx from 'clsx';

const CustomMultiSelect: FC<CustomMultiSelectProps> = ({
  inputName,
  label,
  placeholder,
  error,
  value = [],
  onChange,
  onBlur,
  options,
}) => {
  const { t } = useTranslation('common');
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedValues = Array.isArray(value) ? value : [];

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value),
  );

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleChange = (newValue: number[] | number) => {
    onChange?.(Array.isArray(newValue) ? newValue : [newValue]);
  };

  const handleRemove = (optionValue: number, e: MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== optionValue);
    onChange?.(newValues);
  };

  return (
    <div className="group w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="text-sm/6 font-medium text-dark dark:text-light"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <Listbox multiple value={selectedValues} onChange={handleChange}>
          <div className="relative">
            <ListboxButton
              id={inputName}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur?.();
              }}
              className={clsx(
                'grid w-full cursor-default grid-cols-1 rounded-md py-2 pr-10 pl-3 text-left outline-1 -outline-offset-1 sm:text-sm/6 min-h-10.5',
                isFocused
                  ? 'outline-2 -outline-offset-2 outline-primary'
                  : 'outline-gray-300 dark:outline-light/10',
                error && 'outline-2 -outline-offset-2 outline-red-400',
              )}
            >
              <div className="flex flex-wrap items-center gap-1 pr-6">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((opt) => (
                    <span
                      key={opt.value}
                      className="inline-flex items-center gap-1 rounded-md bg-primary/20 text-primary px-2 py-1 text-xs font-medium"
                    >
                      {titleFormat(opt.name)}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleRemove(opt.value, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRemove(opt.value, e as unknown as MouseEvent);
                          }
                        }}
                        className="hover:bg-primary/30 rounded-full p-0.5 cursor-pointer"
                      >
                        <X size={12} />
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="text-dark/40 dark:text-light/40 truncate">
                    {placeholder}
                  </span>
                )}
              </div>
            </ListboxButton>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
            </div>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-lightness dark:bg-darkness py-2 text-base outline-1 -outline-offset-1 outline-white/10 shadow-lg sm:text-sm">
                <div className="px-3 pb-2">
                  <div className="relative">
                    <Search
                      aria-hidden="true"
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search')}
                      className="w-full rounded-md border border-gray-300 dark:border-light/20 bg-transparent py-1.5 pl-9 pr-3 text-dark dark:text-light placeholder:text-gray-400 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {t('noResults')}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <ListboxOption
                        key={option._id}
                        value={option.value}
                        className="group relative cursor-default py-2 pr-12 pl-3 text-dark dark:text-light select-none data-focus:bg-primary data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <div className="mr-3 flex h-5 w-5 items-center justify-center rounded border-2 transition-colors data-checked:border-primary data-checked:bg-primary">
                            {isSelected && (
                              <Check
                                size={12}
                                className="text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {titleFormat(option.name)}
                          </span>
                        </div>
                      </ListboxOption>
                    );
                  })
                )}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>

      {error && (
        <span className="mt-1 block text-xs text-red-500 dark:text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomMultiSelect;
