import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  type OverlayPanel,
  useOverlayPanelStore,
} from '@/store/overlayPanelStore';
import { useMenuStore } from '@/store/menuStore';

type OpenableOverlayPanel = Exclude<OverlayPanel, null>;

export const useOpenOverlayPanel = () => {
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const activePanel = useOverlayPanelStore((state) => state.activePanel);
  const openPanel = useOverlayPanelStore((state) => state.openPanel);
  const closePanel = useOverlayPanelStore((state) => state.closePanel);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);

  useEffect(
    () => () => {
      scrollTweenRef.current?.kill();
    },
    [],
  );

  const handlePanelClick = useCallback(
    (panel: OpenableOverlayPanel) => {
      if (activePanel === panel) {
        closePanel();
        return;
      }

      if (menuExpanded) closeMenuExpand();

      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop || 0;

      if (currentScrollY === 0) {
        openPanel(panel);
        return;
      }

      scrollTweenRef.current?.kill();

      const scrollState = { y: currentScrollY };
      scrollTweenRef.current = gsap.to(scrollState, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          window.scrollTo(0, scrollState.y);
        },
        onComplete: () => {
          scrollTweenRef.current = null;
          openPanel(panel);
        },
      });
    },
    [activePanel, closeMenuExpand, closePanel, menuExpanded, openPanel],
  );

  return { handlePanelClick };
};
