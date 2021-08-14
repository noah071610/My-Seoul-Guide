import { FC, ReactNode } from "react";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";
import { LayoutWrapper } from "./styles";

interface Wrapper {
  children: ReactNode;
}

const MainLayout: FC<Wrapper> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <div className="main_wrapper">
        <Navigation />
        <main className="content_wrapper">
          <Footer />
          {children}
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default MainLayout;
