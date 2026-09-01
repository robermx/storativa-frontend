import { FC } from 'react';
import { Menu, X } from 'lucide-react';

import { useMenuStore } from '@/store/menuStore';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useAuthStore } from '@/store/authStore';

const ToggleButton: FC = () => {
  const toggleMenuExpand = useMenuStore((state) => state.toggleMenuExpand);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const activePanel = useOverlayPanelStore((state) => state.activePanel);
  const user = useAuthStore((state) => state.user);

  return (
    <button
      onClick={toggleMenuExpand}
      className={`relative w-7 h-7 top-2 cursor-pointer ${Boolean(user) ? 'dark:text-light text-dark' : 'text-light'} disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed`}
      disabled={Boolean(activePanel)}
      aria-expanded={menuExpanded}
      aria-controls="emergent-menu"
    >
      <Menu className={`menu-icon absolute inset-0`} size={24} />
      <X className={`x-icon absolute inset-0 opacity-0`} size={24} />
    </button>
  );
};

export default ToggleButton;
