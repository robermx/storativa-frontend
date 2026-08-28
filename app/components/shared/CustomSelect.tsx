import { FC, useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { CustomSelectProps } from '@/interfaces/input.interface';
import { titleFormat } from '@/utils/titleFormat';

const CustomSelect: FC<CustomSelectProps> = ({
  inputName,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
  options,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full">
      <Listbox
        value={value ?? ''}
        onChange={(newValue) => {
          onChange?.(newValue);
        }}
      >
        <div className="relative">
          <ListboxButton
            id={inputName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            className={`grid w-full cursor-default grid-cols-1 rounded-md py-2.25 px-3 text-left outline-1 -outline-offset-1' ${
              isFocused
                ? 'outline-2 -outline-offset-2  outline-primary'
                : 'outline-gray-300 dark:outline-light/10'
            } sm:text-sm/6 ${error ? 'outline-2 -outline-offset-2 outline-red-400' : ''}`}
          >
            <span
              className={`col-start-1 row-start-1 ${selectedOption?.label ? 'text-dark dark:text-light' : 'text-dark/40 dark:text-light/40'} flex items-center gap-3 pr-6`}
            >
              <span className="block truncate">
                {titleFormat(selectedOption?.label || '') || placeholder}
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-lightness dark:bg-darkness py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {options.map((option) => (
              <ListboxOption
                key={option._id}
                value={option.value}
                className="group relative cursor-default py-2 pr-9 pl-3 text-dark dark:text-light select-none data-focus:bg-primary data-focus:outline-hidden"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                    {titleFormat(option.label)}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                  <Check aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {error && (
        <span className="mt-1 block text-xs text-red-500 dark:text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
