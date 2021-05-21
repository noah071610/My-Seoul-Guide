import { InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { mainStore } from "../@store/store";
import { MD_SIZE, SM_SIZE } from "../config";

const HeaderComponent = styled.header`
  position: relative;
  padding: 1rem;
  display: flex;
  height: 61px;
  justify-content: space-between;
  .header {
    &_logo {
      color: black;
      font-family: "Kaushan Script", cursive;
      font-weight: bold;
    }
    &_list {
      display: flex;
      .settingIcon {
        font-size: 1.2rem;
        margin-left: 1rem;
        a {
          display: inline-block;
        }
      }
    }
  }

  @media only screen and (max-width: ${MD_SIZE}) {
    .header_logo {
      font-size: 1.2rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .header_list {
      .settingIcon {
        margin-left: 1.5rem;
        span {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

const Header: FC = observer(() => {
  const onClickInfo = useCallback(() => {
    mainStore.onToggleInfoModal();
    mainStore.offSmallNav();
  }, []);
  const onClickMenu = useCallback(() => {
    mainStore.onToggleSmallNav();
    mainStore.offInfoModal();
  }, []);

  return (
    <HeaderComponent>
      <Link className="header_logo" to="/">
        My Seoul Guide
      </Link>
      <ul className="header_list">
        <li>
          <a className="settingIcon" onClick={onClickInfo}>
            <InfoCircleOutlined />
          </a>
        </li>
        <li>
          <a className="settingIcon md_visible" onClick={onClickMenu}>
            <MenuOutlined />
          </a>
        </li>
      </ul>
    </HeaderComponent>
  );
});

export default Header;
