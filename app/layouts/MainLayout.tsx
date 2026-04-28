import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

import NavBar from '@/components/common/NavBar';
import Footer from '@/components/common/Footer';
import { excludePaths } from '@/constants/common/layout.constants';
import { ThemeProps } from '@/interfaces/theme.interface';
import ThemeButton from '@/components/common/ThemeButton';

const MainLayout: FC<PropsWithChildren<ThemeProps>> = ({
  children,
  setIsDarkMode,
  isDarkMode,
}) => {
  const { pathname } = useLocation();

  const isAuthPage = excludePaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      {!isAuthPage && <NavBar />}
      <ThemeButton setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main className={`grow`}>{children}</main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;
