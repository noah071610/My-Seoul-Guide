import { FC, memo, ReactNode } from "react";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";

interface Wrapper {
  children: ReactNode;
}

const MainPageWrapper: FC<Wrapper> = memo(({ children }) => {
  return (
    <div className="main_page_wrapper">
      <Header />
      <div className="main_wrapper">
        <Navigation isSmall={false} />
        <div className="main_content_wrapper">
          <Footer />
          {children}
        </div>
      </div>
    </div>
  );
});

export default memo(MainPageWrapper);
