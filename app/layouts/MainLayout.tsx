import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useLocation, useMatches } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin, ScrollTrigger } from 'gsap/all';

import {
  excludePaths,
  smoothScrollPaths,
} from '@/constants/shared/layout.constants';
import { useAuthStore } from '@/store/authStore';
import { useNavHeight } from '@/store/navHeightStore';
import { useMenuStore } from '@/store/menuStore';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useNavigationVisibility } from '@/context/NavigationVisibilityContext';
import Navbar from '@/components/common/Navbar';
import SettingsPanel from '@/components/navbar/SettingsPanel';
import ThemeButton from '@/components/common/ThemeButton';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const matches = useMatches();
  
  const user = useAuthStore((state) => state.user);
  const addMenuHeight = useNavHeight((state) => state.addMenuHeight);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const closeMenuExpand = useMenuStore((state) => state.closeMenuExpand);
  const closePanel = useOverlayPanelStore((state) => state.closePanel);
  const { isNavigationSuppressed } = useNavigationVisibility();
  
  const enableSmoothScroll = smoothScrollPaths.includes(pathname);
  const isNotFound =
  matches.length > 0 &&
  matches[matches.length - 1].id.toString().endsWith('NotFound');
  const areExcludedPaths = excludePaths.includes(pathname) || isNotFound;
  const shouldShowNavigation = !areExcludedPaths && !isNavigationSuppressed;
  const [isNavbarMounted, setIsNavbarMounted] = useState(shouldShowNavigation);
  const [isNavbarVisible, setIsNavbarVisible] = useState(shouldShowNavigation);

  useEffect(() => {
    if (shouldShowNavigation) {
      setIsNavbarMounted(true);
      setIsNavbarVisible(true);
      return;
    }

    closeMenuExpand();
    setIsNavbarVisible(false);
  }, [closeMenuExpand, shouldShowNavigation]);

  useEffect(() => {
    closePanel();
  }, [closePanel, pathname]);

  useGSAP(
    () => {
      if (!shouldShowNavigation) {
        gsap.set('.main-wrapper', { y: 0, paddingBottom: 0 });
        return;
      }

      gsap.to('.main-wrapper', {
        y: menuExpanded ? addMenuHeight : 0,
        paddingBottom: menuExpanded ? addMenuHeight : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: mainRef,
      dependencies: [addMenuHeight, menuExpanded, shouldShowNavigation],
    },
  );

  return (
    <div className="overflow-hidden">
      <ThemeButton />
      {isNavbarMounted && (
        <Navbar
          isVisible={isNavbarVisible}
          onExitComplete={() => setIsNavbarMounted(false)}
        />
      )}
      <SmoothScrollProvider enabled={enableSmoothScroll}>
        {Boolean(user) && <SettingsPanel />}
        <main className="selection:bg-primary/30 relative" ref={mainRef}>
          <div
            className={`main-wrapper ${shouldShowNavigation ? 'pt-(--nav-height)' : 'pt-0'}`}
          >
            {children}
          </div>
        </main>
      </SmoothScrollProvider>
    </div>
  );
};

export default MainLayout;
