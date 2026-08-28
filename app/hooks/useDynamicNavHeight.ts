import { useNavHeight } from '@/store/navHeightStore';
import { RefObject, useEffect } from 'react';

const useDynamicNavHeight = (
  navRef: RefObject<HTMLDivElement | null>,
  addMenuRef: RefObject<HTMLDivElement | null>,
) => {
  const setNavHeight = useNavHeight((state) => state.setNavHeight);
  const setAddMenuHeight = useNavHeight((state) => state.setAddMenuHeight);

  useEffect(() => {
    if (!navRef.current || !addMenuRef.current) return;

    const navEl = navRef.current;
    const addMenuEl = addMenuRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;

        if (entry.target === navEl) {
          setNavHeight(height);
          document.documentElement.style.setProperty('--nav-height', `${height}`);
        } else if (entry.target === addMenuEl) {
          document.documentElement.style.setProperty('--add-menu-height', `${height}`);
          setAddMenuHeight(height);
        }
      }
    });

    resizeObserver.observe(navEl);
    resizeObserver.observe(addMenuEl);
    return () => resizeObserver.disconnect();
  }, []);
};

export default useDynamicNavHeight;
