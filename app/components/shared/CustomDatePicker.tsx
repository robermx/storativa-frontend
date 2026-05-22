import { FC, useState, useRef, useId, useEffect } from 'react';
import { format, parse, isValid } from 'date-fns';
import { Calendar } from 'lucide-react';
import { DayPicker, getDefaultClassNames } from '@daypicker/react';
import '@daypicker/react/style.css';
import { CustomCalendarInputProps } from '@/interfaces/input.interface';
import { es } from 'date-fns/locale';

const INPUT_FORMAT = 'dd/MM/yyyy';
const VALUE_FORMAT = 'yyyy-MM-dd';

// const MONTHS_ES = [
//   'Enero',
//   'Febrero',
//   'Marzo',
//   'Abril',
//   'Mayo',
//   'Junio',
//   'Julio',
//   'Agosto',
//   'Septiembre',
//   'Octubre',
//   'Noviembre',
//   'Diciembre',
// ];

// const WEEKDAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// const getYears = () => {
//   const currentYear = new Date().getFullYear();
//   const years: number[] = [];
//   for (let y = currentYear + 10; y >= currentYear - 100; y--) {
//     years.push(y);
//   }
//   return years;
// };

// const YEARS = getYears();

const CustomDatePicker: FC<CustomCalendarInputProps> = ({
  inputName,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
}) => {
  const inputId = useId();
  const dropdownId = useId();

  const [inputValue, setInputValue] = useState(() =>
    value && isValid(parse(value, VALUE_FORMAT, new Date()))
      ? format(parse(value, VALUE_FORMAT, new Date()), INPUT_FORMAT)
      : '',
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    value && isValid(parse(value, VALUE_FORMAT, new Date()))
      ? parse(value, VALUE_FORMAT, new Date())
      : undefined,
  );
  const [month, setMonth] = useState(() => selectedDate ?? new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  // const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  // const [showYearDropdown, setShowYearDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // setShowMonthDropdown(false);
        // setShowYearDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined);
      setInputValue('');
      setValidationError('');
      onChange?.('');
    } else {
      setSelectedDate(date);
      setMonth(date);
      const formatted = format(date, INPUT_FORMAT);
      setInputValue(formatted);
      setValidationError('');
      onChange?.(format(date, VALUE_FORMAT));
    }
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setValidationError('');

    if (rawValue.length === 0) {
      setInputValue('');
      setSelectedDate(undefined);
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
        setSelectedDate(parsed);
        setMonth(parsed);
        onChange?.(format(parsed, VALUE_FORMAT));
      } else {
        setValidationError('Fecha inválida');
        setSelectedDate(undefined);
      }
    } else if (rawValue.length < 8) {
      setSelectedDate(undefined);
    }
  };

  const handleInputBlur = () => {
    if (inputValue && inputValue.length === 10 && !selectedDate) {
      setValidationError('Fecha inválida');
    }
    onBlur?.();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const parsed = parse(inputValue, INPUT_FORMAT, new Date());
      if (isValid(parsed)) {
        setSelectedDate(parsed);
        setMonth(parsed);
        onChange?.(format(parsed, VALUE_FORMAT));
        setValidationError('');
      } else {
        setValidationError('Fecha inválida');
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    // setShowMonthDropdown(false);
    // setShowYearDropdown(false);
  };

  // const goToPrevMonth = () =>
  //   setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  // const goToNextMonth = () =>
  //   setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  // const selectMonth = (monthIndex: number) => {
  //   setMonth((m) => new Date(m.getFullYear(), monthIndex, 1));
  //   setShowMonthDropdown(false);
  // };

  // const selectYear = (year: number) => {
  //   setMonth((m) => new Date(year, m.getMonth(), 1));
  //   setShowYearDropdown(false);
  // };

  // const currentMonthIndex = month.getMonth();
  // const currentYear = month.getFullYear();

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          name={inputName}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          maxLength={10}
          aria-describedby={
            error || validationError ? `${inputId}-error` : undefined
          }
          aria-invalid={!!error || !!validationError}
          className={`peer block w-full rounded-md bg-transparent px-3 py-1.5 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 cursor-text appearance-none [-webkit-appearance:none] dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary sm:text-sm/6 transition-all ${
            error || validationError
              ? 'focus:outline-red-400 dark:focus:outline-red-500'
              : ''
          }`}
        />
        <button
          type="button"
          onClick={toggleDropdown}
          aria-label="Abrir calendario"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          <Calendar size={20} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          id={dropdownId}
          role="listbox"
          aria-label="Elegir fecha"
          className="absolute z-50 mt-1 left-0 bg-light dark:bg-dark rounded-lg shadow-lg border border-gray-200 dark:border-white/10 p-3 rdp-datepicker-dropdown"
        >
          {/* <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded cursor-pointer"
              aria-label="Mes anterior"
            >
              <ChevronLeft
                size={20}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowMonthDropdown((v) => !v);
                    setShowYearDropdown(false);
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded cursor-pointer"
                >
                  {MONTHS_ES[currentMonthIndex]}
                  <ChevronDown size={16} />
                </button>
                {showMonthDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-light dark:bg-dark-secondary border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {MONTHS_ES.map((mes, i) => (
                      <button
                        key={mes}
                        type="button"
                        onClick={() => selectMonth(i)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ${
                          i === currentMonthIndex
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {mes}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowYearDropdown((v) => !v);
                    setShowMonthDropdown(false);
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded cursor-pointer"
                >
                  {currentYear}
                  <ChevronDown size={16} />
                </button>
                {showYearDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-light dark:bg-dark-secondary border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {YEARS.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => selectYear(year)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer ${
                          year === currentYear
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded cursor-pointer"
              aria-label="Mes siguiente"
            >
              <ChevronRight
                size={20}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div> */}

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
            locale={es}
            styles={{
              caption_label: { color: 'var(--color-primary)' },
            }}
          />
        </div>
      )}

      {(error || validationError) && (
        <span
          id={`${inputId}-error`}
          className="mt-1 block text-xs text-red-500 dark:text-red-600 font-medium"
        >
          {validationError || error}
        </span>
      )}
    </div>
  );
};

export default CustomDatePicker;
