/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";

interface Wrapper {
  children: ReactNode;
}

const MainPageWrapper: FC<Wrapper> = observer(({ children }) => {
  return (
    <div className="main_page_wrapper">
      <header>
        <Link className="header_logo" to="/">
          My Seoul Guide
        </Link>
        <ul className="header_menu">
          <li>
            <Link to="/">
              <SettingOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              <InfoCircleOutlined />
            </Link>
          </li>
        </ul>
      </header>
      <div className="main_wrapper">
        <Navigation />
        {children}
      </div>
    </div>
  );
});

export default MainPageWrapper;
