import { FC } from 'react';
import { CustomTextAreaProps } from '@/interfaces/input.interface';

const CustomTextArea: FC<CustomTextAreaProps> = ({
  inputName,
  placeholder,
  error,
  rows = 3,
  maxChar,
  ...rest
}) => {
  return (
    <div className="gruup w-full">
      <div className="relative">
        <textarea
          {...rest}
          id={inputName}
          rows={rows}
          placeholder={placeholder}
          className={`block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-dark outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 resize-none ${error ? 'focus:outline-red-600/50' : 'focus:outline-primary'} sm:text-sm/6 dark:text-light dark:outline-white/10 dark:placeholder:text-gray-500 transition-all`}
          maxLength={maxChar}
        />
      </div>
      {maxChar && (
        <div className="relative top-0.5 flex justify-end">
          <span className="absolute text-xs text-gray-500 font-medium">
            {`${rest?.value?.length || 0} / ${maxChar}`}
          </span>
        </div>
      )}
      {error && (
        <div className="relative top-0.5">
          <span className="absolute text-xs text-red-600/80 font-medium">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
