/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { Divider } from "antd";
import { mainStore } from "../@store/store";

const settingBar = (onSetting: boolean) => css`
  display: flex;
  ul {
    width: 100%;
    padding: 0 1rem;
    display: ${onSetting ? "flex" : "none"};
  }
`;

const Header: FC = observer(() => {
  const [onSetting, onChangeSetting] = useToggle(false);
  return (
    <header>
      <Link className="header_logo" to="/">
        My Seoul Guide
      </Link>
      <div css={settingBar(onSetting)}>
        <ul className="settingBar">
          <li className="settingIcon">
            <Link to="/">
              <span>Go back First-page</span>
            </Link>
            <Divider type="vertical" />
          </li>
          <li className="settingIcon">
            <Link to="/">
              <span>FeedBack</span>
            </Link>
          </li>
        </ul>
        <a className="settingIcon" onClick={onChangeSetting}>
          <SettingOutlined />
        </a>
        <a className="settingIcon md_visible" onClick={mainStore.onToggleSmallNav}>
          <MenuOutlined />
        </a>
      </div>
    </header>
  );
});

export default Header;
