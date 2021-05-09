import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import Navigation from "./Section/Navigation";
import Header from "./Section/Header";

interface Wrapper {
  children: ReactNode;
}

const MainPageWrapper: FC<Wrapper> = observer(({ children }) => {
  return (
    <div className="main_page_wrapper">
      <Header />
      <div className="main_wrapper">
        <Navigation />
        {children}
      </div>
    </div>
  );
});

export default MainPageWrapper;
