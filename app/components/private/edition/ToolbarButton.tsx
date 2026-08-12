import { FC } from 'react';

interface ToolbarButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={`rounded-md p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
      active
        ? 'bg-primary text-light'
        : 'text-dark/70 hover:bg-primary/10 hover:text-primary dark:text-light/70'
    }`}
  >
    {children}
  </button>
);

export default ToolbarButton;
