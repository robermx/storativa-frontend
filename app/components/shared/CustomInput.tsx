import { FC, useState, useMemo, Fragment } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  User,
  WholeWord,
  ChartNoAxesGantt,
  MapPinHouse,
  UserPlus,
  ClockArrowUp,
} from 'lucide-react';
import { CustomInputProps, InputEnumType } from '@/interfaces/input.interface';

const CustomInput: FC<CustomInputProps> = ({
  inputType,
  inputName,
  placeholder,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputConfig = useMemo(() => {
    const configs = {
      [InputEnumType.Password]: {
        type: showPassword ? 'text' : 'password',
        Icon: showPassword ? EyeOff : Eye,
        autoComplete: 'current-password',
      },
      [InputEnumType.Email]: {
        type: 'text',
        autoComplete: 'email',
        Icon: Mail,
      },
      [InputEnumType.fullName]: {
        type: 'text',
        autoComplete: 'username',
        Icon: User,
      },
      [InputEnumType.title]: {
        type: 'text',
        Icon: WholeWord,
        autoComplete: 'title',
      },
      [InputEnumType.period]: {
        type: 'text',
        Icon: ChartNoAxesGantt,
        autoComplete: 'period',
      },
      [InputEnumType.place]: {
        type: 'text',
        Icon: MapPinHouse,
        autoComplete: 'place',
      },
      [InputEnumType.characterName]: {
        type: 'text',
        Icon: UserPlus,
        autoComplete: 'character-name',
      },
      [InputEnumType.time]: {
        type: 'text',
        Icon: ClockArrowUp,
        autoComplete: 'time',
      },
    };
    return (
      configs[inputType as InputEnumType] || configs[InputEnumType.fullName]
    );
  }, [inputType, showPassword]);

  const { Icon, type, autoComplete } = inputConfig;
  const isNumeric = inputType === InputEnumType.time;

  return (
    <Fragment>
      <div className="group w-full">
        <div className="relative">
          <input
            {...rest}
            id={inputName}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={isNumeric ? 'numeric' : undefined}
            pattern={isNumeric ? '[0-9]*' : undefined}
            className={`block w-full rounded-md bg-transparent px-3 py-1.5 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${error ? 'focus:outline-red-600/50' : 'focus:outline-primary'} sm:text-sm/6 dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 transition-all`}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {inputType === InputEnumType.Password ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="flex items-center justify-center text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary focus:outline-none transition-colors cursor-pointer"
                tabIndex={-1}
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
              >
                <Icon size={20} strokeWidth={2} />
              </button>
            ) : (
              <Icon
                className="text-gray-400 dark:text-gray-500 pointer-events-none"
                size={20}
                strokeWidth={2}
              />
            )}
          </div>
        </div>
        {error && (
          <div className="relative top-0.5">
            <span className="absolute text-xs text-red-600/80 font-medium">
              {error}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CustomInput;
