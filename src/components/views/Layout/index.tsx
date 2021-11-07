import { FC } from "react";
import Navigation from "./Navigation";
import Header from "./Header";
import AppInformation from "./AppInformation";
import { LayoutWrapper } from "./styles";

const MainLayout: FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <div className="layout_wrapper">
        <Navigation />
        <main className="main_content_wrapper">
          <AppInformation />
          {children}
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default MainLayout;
