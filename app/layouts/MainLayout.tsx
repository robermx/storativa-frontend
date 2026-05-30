import { FC, PropsWithChildren } from 'react';
import { useLocation, useMatches } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin, ScrollTrigger } from 'gsap/all';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ThemeButton from '@/components/common/ThemeButton';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import {
  excludePaths,
  smoothScrollPaths,
} from '@/constants/common/layout.constants';

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const matches = useMatches();

  const isNotFound =
    matches.length > 0 &&
    matches[matches.length - 1].id.toString().endsWith('NotFound');
  const excludedRoutes = excludePaths.includes(pathname) || isNotFound;
  const enableSmoothScroll =
    smoothScrollPaths.includes(pathname) && !isNotFound;

  return (
    <SmoothScrollProvider enabled={enableSmoothScroll}>
      <ThemeButton />
      {!excludedRoutes && <Navbar />}
      <div className="flex flex-col selection:bg-primary/30">
        <main>{children}</main>
        {!excludedRoutes && <Footer />}
      </div>
    </SmoothScrollProvider>
  );
};

export default MainLayout;
