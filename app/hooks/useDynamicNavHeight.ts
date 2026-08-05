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
        } else if (entry.target === addMenuEl) {
          setAddMenuHeight(height);
        }
      }
    });

    resizeObserver.observe(navEl);
    resizeObserver.observe(addMenuEl);
    console.log("pasa observer")
    return () => resizeObserver.disconnect();
  }, [navRef, addMenuRef, setAddMenuHeight, setNavHeight]);
};

export default useDynamicNavHeight;
