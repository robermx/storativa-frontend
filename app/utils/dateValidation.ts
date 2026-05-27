import { parse, isValid, getDaysInMonth } from 'date-fns';

const INPUT_FORMAT = 'dd/MM/yyyy';

export const isValidDate = (value: string): boolean => {
  if (!value) return false;
  if (value.length !== 10) return false;
  if (value[2] !== '/' || value[5] !== '/') return false;
  const day = parseInt(value.slice(0, 2), 10);
  const month = parseInt(value.slice(3, 5), 10);
  const year = parseInt(value.slice(6, 10), 10);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > getDaysInMonth(new Date(year, month - 1))) return false;
  if (year < 1) return false;
  if (year > 9999) return false;
  const parsed = parse(value, INPUT_FORMAT, new Date());
  return isValid(parsed);
};

const parseDate = (value: string): Date | null => {
  if (!value) return null;
  const parsed = parse(value, INPUT_FORMAT, new Date());
  return isValid(parsed) ? parsed : null;
};

export const validateDateField = (
  value: string,
  otherValue: string | undefined,
  isFrom: boolean,
): true | string => {
  if (!value) return true;

  if (!isValidDate(value)) {
    return 'Fecha inválida (formato: dd/mm/aaaa)';
  }

  if (otherValue && isValidDate(otherValue)) {
    const thisDate = parseDate(value);
    const otherDate = parseDate(otherValue);
    if (thisDate && otherDate) {
      if (isFrom && thisDate >= otherDate) {
        return 'La fecha de inicio debe ser anterior a la de fin';
      }
      if (!isFrom && thisDate <= otherDate) {
        return 'La fecha de fin debe ser posterior a la de inicio';
      }
    }
  }

  return true;
};
