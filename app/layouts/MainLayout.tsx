import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { excludePaths } from '@/constants/common/layout.constants';
import ThemeButton from '@/components/common/ThemeButton';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const isAuthPage = excludePaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      {!isAuthPage && <NavBar />}
      <ThemeButton />
      <main className={`grow`}>{children}</main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;
