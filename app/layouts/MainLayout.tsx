import { FC, PropsWithChildren, useRef } from 'react';
import { useLocation, useMatches } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin, ScrollTrigger } from 'gsap/all';

import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';
import ThemeButton from '@/components/common/ThemeButton';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import {
  excludePaths,
  smoothScrollPaths,
} from '@/constants/common/layout.constants';
import SettingsPanel from '@/components/navbar/SettingsPanel';
import { useAuthStore } from '@/store/authStore';
import { useNavHeight } from '@/store/navHeightStore';
import { useMenuStore } from '@/store/menuStore';

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const matches = useMatches();
  const user = useAuthStore((state) => state.user);
  const navHeight = useNavHeight((state) => state.navHeight);
  const addMenuHeight = useNavHeight((state) => state.addMenuHeight);
  const menuExpanded = useMenuStore((state) => state.menuExpanded);
  const enableSmoothScroll = smoothScrollPaths.includes(pathname);

  const isNotFound =
    matches.length > 0 &&
    matches[matches.length - 1].id.toString().endsWith('NotFound');
  const areExcludedPaths = excludePaths.includes(pathname) || isNotFound;

  useGSAP(
    () => {
      gsap.to('.main-wrapper', {
        y: areExcludedPaths ? -navHeight : menuExpanded ? addMenuHeight : 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
    {
      scope: mainRef,
      dependencies: [menuExpanded, areExcludedPaths],
    },
  );

  return (
    <>
      <ThemeButton />
      <Navbar areExcludedPaths={areExcludedPaths} />
      <SmoothScrollProvider enabled={enableSmoothScroll}>
        {Boolean(user) && <SettingsPanel />}
        <main
          className="selection:bg-primary/30 relative"
          ref={mainRef}
          style={{ paddingTop: navHeight }}
        >
          <div className="main-wrapper">{children}</div>
        </main>
        {/* {Boolean(user) || (!areExcludedPaths && <Footer />)} */}
      </SmoothScrollProvider>
    </>
  );
};

export default MainLayout;
