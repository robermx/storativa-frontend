import { Dispatch, FC, PropsWithChildren } from "react";

import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

interface MainLayoutProps {
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  setIsDarkMode,
  isDarkMode,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      <NavBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
