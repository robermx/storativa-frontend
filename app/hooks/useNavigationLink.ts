import { useMenuStore } from '@/store/menuStore';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router';

const useNavigationLink = () => {
  const navigate = useNavigate();

  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (!menuExpanded) return;

    event.preventDefault();
    closeMenuExpand();
    window.setTimeout(() => navigate(path), 300);
  };

  return { handleNavLinkClick };
};

export default useNavigationLink;
