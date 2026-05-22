import { FC, useState, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { CustomCalendarInputProps } from '@/interfaces/input.interface';

const CustomDatePicker: FC<CustomCalendarInputProps> = ({
  inputName,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue =
    value && isValid(parseISO(value))
      ? format(parseISO(value), 'yyyy-MM-dd')
      : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="group w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          id={inputName}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => setIsFocused(true)}
          className={`peer block w-full rounded-md bg-transparent px-3 py-1.5 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 cursor-pointer appearance-none [-webkit-appearance:none] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${error ? 'focus:outline-red-400 dark:focus:outline-red-500' : 'focus:outline-primary'} sm:text-sm/6 dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 transition-all ${!displayValue && !isFocused ? 'text-gray-400 dark:text-gray-500' : ''}`}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.showPicker()}
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          aria-label="Open calendar"
        >
          <Calendar className="text-gray-400 dark:text-gray-500" size={20} />
        </button>
      </div>
      <div className="relative top-1">
        {error && (
          <span className="absolute text-xs text-red-500 dark:text-red-600 font-medium">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
