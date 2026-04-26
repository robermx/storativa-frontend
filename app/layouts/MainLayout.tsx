import { Dispatch, FC, PropsWithChildren } from "react";
import { useLocation } from "react-router";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { excludePaths } from "@/constants/common/layout.constants";

interface MainLayoutProps {
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  setIsDarkMode,
  isDarkMode,
}) => {
  const { pathname } = useLocation();

  const isAuthPage = excludePaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      {!isAuthPage && (
        <NavBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      )}
      <main className={`grow ${isAuthPage ? "flex items-center justify-center pb-10" : ""}`}>{children}</main>
      {!isAuthPage && <Footer />}
      
    </div>
  );
};

export default MainLayout;
