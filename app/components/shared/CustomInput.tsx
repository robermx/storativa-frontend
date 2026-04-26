import { FC, useState, useMemo } from "react";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { CustomInputProps, InputEnumType } from "@/interfaces/input.interface";

const CustomInput: FC<CustomInputProps> = ({
  inputType,
  inputName,
  placeholder,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputConfig = useMemo(() => {
    const configs = {
      [InputEnumType.Password]: {
        type: showPassword ? "text" : "password",
        autoComplete: "current-password",
        Icon: showPassword ? EyeOff : Eye,
      },
      [InputEnumType.Email]: {
        type: "email",
        autoComplete: "email",
        Icon: Mail,
      },
      [InputEnumType.UserName]: {
        type: "text",
        autoComplete: "username",
        Icon: User,
      },
    };
    return (
      configs[inputType as InputEnumType] || configs[InputEnumType.UserName]
    );
  }, [inputType, showPassword]);

  const { Icon, type, autoComplete } = inputConfig;

  return (
    <div className="relative group">
      <input
        id={inputName}
        name={inputName}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        autoComplete={autoComplete}
        className="block w-full rounded-md bg-light px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-primary transition-all"
      />

      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {inputType === InputEnumType.Password ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex items-center justify-center text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary focus:outline-none transition-colors cursor-pointer"
            tabIndex={-1}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
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
  );
};

export default CustomInput;
