import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import Navigation from "../Navigation";
import Header from "../Header";

interface Wrapper {
  children: ReactNode;
}

const MainPageWrapper: FC<Wrapper> = observer(({ children }) => {
  return (
    <div className="main_page_wrapper">
      <Header />
      <div className="main_wrapper">
        <Navigation isSmall={false} />
        <div className="main_content_wrapper">{children}</div>
      </div>
    </div>
  );
});

export default MainPageWrapper;
