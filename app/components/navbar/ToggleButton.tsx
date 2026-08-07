import { FC } from 'react';
import { Menu, X } from 'lucide-react';

import { useMenuStore } from '@/store/menuStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';

const ToggleButton: FC = () => {
  const toggleMenuExpand = useMenuStore((state) => state.toggleMenuExpand);
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const user = useAuthStore((state) => state.user);

  return (
    <button
      onClick={toggleMenuExpand}
      className={`relative w-6 h-6 cursor-pointer ${Boolean(user) ? 'dark:text-light text-dark' : 'text-light'} disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
      disabled={areSettingsOpen}
    >
      <Menu className={`menu-icon absolute inset-0`} />
      <X className={`x-icon absolute inset-0 opacity-0`} />
    </button>
  );
};

export default ToggleButton;
