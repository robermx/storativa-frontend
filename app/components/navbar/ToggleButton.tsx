import { FC } from 'react';
import { Menu, X } from 'lucide-react';

import { useMenuStore } from '@/store/menuStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';

const ToggleButton: FC = () => {
  const toggleMenuExpand = useMenuStore((state) => state.toggleMenuExpand);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const user = useAuthStore((state) => state.user);

  return (
    <button
      onClick={toggleMenuExpand}
      className={`relative w-8 h-8 cursor-pointer ${Boolean(user) ? 'dark:text-light text-dark' : 'text-light'} disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
      disabled={areSettingsOpen}
      aria-expanded={menuExpanded}
      aria-controls="emergent-menu"
    >
      <Menu className={`menu-icon absolute inset-0`} size={32}/>
      <X className={`x-icon absolute inset-0 opacity-0`} size={32} />
    </button>
  );
};

export default ToggleButton;
