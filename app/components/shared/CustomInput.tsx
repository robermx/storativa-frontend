import { FC, useState, useMemo, Fragment } from 'react';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
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
    };
    return (
      configs[inputType as InputEnumType] || configs[InputEnumType.fullName]
    );
  }, [inputType, showPassword]);

  const { Icon, type, autoComplete } = inputConfig;

  return (
    <Fragment>
      <div className="relative group">
        <input
          {...rest}
          id={inputName}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`block w-full rounded-md bg-transparent px-3 py-1.5 pr-10 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${error ? 'focus:outline-red-400 dark:focus:outline-red-500 ' : 'focus:outline-primary'} sm:text-sm/6 dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 transition-all`}
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
      <div className="relative">
        {error && (
          <span className="absolute text-xs text-red-500 dark:text-red-600 font-medium bottom-1">
            {error}
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default CustomInput;
