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
import SettingsPanel from '@/components/dashboard/SettingsPanel';
import { useAuthStore } from '@/store/authStore';

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const user = useAuthStore((state) => state.user);
  const enableSmoothScroll = smoothScrollPaths.includes(pathname);

  const isNotFound =
    matches.length > 0 &&
    matches[matches.length - 1].id.toString().endsWith('NotFound');
  const areExcludedPaths = excludePaths.includes(pathname) || isNotFound;

  return (
    <>
      <ThemeButton />
      <Navbar areExcludedPaths={areExcludedPaths} />
      <SmoothScrollProvider enabled={enableSmoothScroll}>
        {user && <SettingsPanel />}
        <main className="selection:bg-primary/30">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
};

export default MainLayout;
