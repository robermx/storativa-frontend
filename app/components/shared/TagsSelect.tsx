import { FC, Fragment } from 'react';
import { TagsSelectProps } from '@/interfaces/input.interface';

const TagsSelect: FC<TagsSelectProps> = ({
  inputName,
  value = [],
  error,
  onChange,
  options,
}) => {
  const handleToggle = (tag: string) => {
    const newValue = value.includes(tag)
      ? value.filter((t) => t !== tag)
      : [...value, tag];
    onChange?.(newValue);
  };

  return (
    <Fragment>
      <div className="flex flex-wrap gap-2" id={inputName}>
        {options.map((tag) => {
          const isSelected = value.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary text-accent'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="relative mt-1">
        {error && (
          <span className="absolute text-xs text-red-500 dark:text-red-600 font-medium bottom-1">
            {error}
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default TagsSelect;
