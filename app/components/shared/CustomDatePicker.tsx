import { FC, useState, useRef, useId, useEffect } from 'react';
import { format, parse, isValid } from 'date-fns';
import { Calendar } from 'lucide-react';
import { DayPicker, getDefaultClassNames } from '@daypicker/react';
import '@daypicker/react/style.css';
import { CustomCalendarInputProps } from '@/interfaces/input.interface';
import { es } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const INPUT_FORMAT = 'dd/MM/yyyy';
const calendarLocales = { es, en: enUS } as const;

const CustomDatePicker: FC<CustomCalendarInputProps> = ({
  inputName,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
}) => {
  const { t, i18n } = useTranslation('common');
  const inputId = useId();
  const dropdownId = useId();

  const [month, setMonth] = useState(() => {
    if (value && isValid(parse(value, INPUT_FORMAT, new Date()))) {
      return parse(value, INPUT_FORMAT, new Date());
    }
    return new Date();
  });
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? '');

  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setAreSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const selectedDate =
    value && isValid(parse(value, INPUT_FORMAT, new Date()))
      ? parse(value, INPUT_FORMAT, new Date())
      : undefined;

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      onChange?.('');
    } else {
      setMonth(date);
      const formatted = format(date, INPUT_FORMAT);
      setInputValue(formatted);
      onChange?.(formatted);
    }
    setAreSettingsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');

    if (rawValue.length === 0) {
      setInputValue('');
      onChange?.('');
      return;
    }

    let formatted = '';
    if (rawValue.length <= 2) {
      formatted = rawValue;
    } else if (rawValue.length <= 4) {
      formatted = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
    } else {
      const day = rawValue.slice(0, 2);
      const monthNum = rawValue.slice(2, 4);
      const year = rawValue.slice(4, 8);
      formatted = `${day}/${monthNum}/${year}`;
    }

    setInputValue(formatted);

    if (rawValue.length === 8) {
      const parsed = parse(formatted, INPUT_FORMAT, new Date());
      if (isValid(parsed)) {
        setMonth(parsed);
        onChange?.(formatted);
      }
    } else {
      onChange?.(formatted);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.length > 0 && inputValue.length < 10) {
      const parsed = parse(inputValue, INPUT_FORMAT, new Date());
      if (!isValid(parsed)) {
        setInputValue('');
        onChange?.('');
      }
    }
    onBlur?.();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setAreSettingsOpen(false);
      inputContainerRef.current?.blur();
    }
  };

  const toggleDropdown = () => {
    setAreSettingsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div ref={inputContainerRef} className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="tel"
          name={inputName}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          maxLength={10}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-invalid={!!error}
          className={`peer block w-full rounded-md bg-transparent py-2.25 px-3 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 cursor-text appearance-none [-webkit-appearance:none] dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary sm:text-sm/6 transition-all ${
            error ? 'focus:outline-red-400 dark:focus:outline-red-500' : ''
          }`}
        />
        <button
          type="button"
          onClick={toggleDropdown}
          aria-label={t('calendar.openAriaLabel')}
          aria-haspopup="listbox"
          aria-controls={dropdownId}
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          <Calendar size={20} />
        </button>
      </div>

      {areSettingsOpen && (
        <div
          ref={dropdownRef}
          id={dropdownId}
          role="listbox"
          aria-label={t('calendar.chooseDateAriaLabel')}
          className="absolute z-10 mt-1 left-0 bg-light dark:bg-dark rounded-lg shadow-lg border border-gray-200 dark:border-white/10 p-3 rdp-datepicker-dropdown"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleDayPickerSelect}
            classNames={{
              root: defaultClassNames.root,
              month_grid: defaultClassNames.month_grid,
              caption_label: defaultClassNames.caption_label,
              button_previous: defaultClassNames.button_previous,
              button_next: defaultClassNames.button_next,
              weekday: defaultClassNames.weekday,
              day_button: defaultClassNames.day_button,
            }}
            locale={
              calendarLocales[i18n.language as keyof typeof calendarLocales] ??
              es
            }
            styles={{
              caption_label: { color: 'var(--color-primary)' },
            }}
          />
        </div>
      )}

      {error && (
        <div className="relative top-1">
          <span className="absolute text-xs text-red-600/80 font-medium">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
