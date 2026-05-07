import { FC, PropsWithChildren } from 'react';
import { useLocation, useMatches } from 'react-router';

import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { excludePaths } from '@/constants/common/layout.constants';
import ThemeButton from '@/components/common/ThemeButton';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

const smoothScrollPaths = ['/'];

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
      {!excludedRoutes && <NavBar />}
      <div className="flex flex-col font-sans selection:bg-primary/60 selection:text-white">
        <main>{children}</main>

        {!excludedRoutes && <Footer />}
      </div>
    </SmoothScrollProvider>
  );
};

export default MainLayout;
