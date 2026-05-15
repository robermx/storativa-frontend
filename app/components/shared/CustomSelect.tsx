import { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { CustomSelectProps } from '@/interfaces/input.interface';

const CustomSelect: FC<CustomSelectProps> = ({
  inputName,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
  options,
}) => {
  return (
    <div className="group w-full">
      <div className="relative">
        <select
          id={inputName}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full rounded-md bg-transparent px-3 py-1.5 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 appearance-none focus:outline-2 focus:-outline-offset-2 ${error ? 'focus:outline-red-400 dark:focus:outline-red-500' : 'focus:outline-primary'} sm:text-sm/6 dark:text-light dark:outline-white/10 transition-all ${!value ? 'text-gray-400 dark:text-gray-500' : ''}`}
        >
          <option value={0} disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className="text-gray-400 dark:text-gray-500"
            size={20}
            strokeWidth={2}
          />
        </div>
      </div>
      <div className="relative">
        {error && (
          <span className="absolute text-xs text-red-500 dark:text-red-600 font-medium bottom-1">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
