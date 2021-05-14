/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { FC, MouseEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { Divider, message, Popconfirm } from "antd";
import { mainStore } from "../@store/store";

const settingBar = (onSetting: boolean) => css`
  display: flex;
  ul {
    width: 100%;
    padding: 0 1rem;
    display: ${onSetting ? "flex" : "none"};
  }
`;
function confirm(e: MouseEvent<HTMLElement, MouseEvent>) {
  console.log(e);
}

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
            <Popconfirm
              title="Are you sure to go back first page?"
              onConfirm={() => confirm}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <span>Go back First-page</span>
              </a>
            </Popconfirm>
            <Divider type="vertical" />
          </li>
          <li className="settingIcon">
            <a href="mailto:noah071610@naver.com">
              <span>FeedBack</span>
            </a>
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
