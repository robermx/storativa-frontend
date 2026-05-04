import { FC, PropsWithChildren } from 'react';
import { useLocation, useMatches } from 'react-router';

import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { excludePaths } from '@/constants/common/layout.constants';
import ThemeButton from '@/components/common/ThemeButton';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const matches = useMatches();

  const isNotFound =
    matches.length > 0 &&
    matches[matches.length - 1].id.toString().endsWith('NotFound');
  const excludedRoutes = excludePaths.includes(pathname) || isNotFound;

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      {!excludedRoutes && <NavBar />}
      <ThemeButton />
      <main className="grow">{children}</main>

      {!excludedRoutes && <Footer />}
    </div>
  );
};

export default MainLayout;
