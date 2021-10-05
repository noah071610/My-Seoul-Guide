import { InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { mainStore } from "@store/store";
import { HeaderWrapper } from "./styles";

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
    <HeaderWrapper>
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
    </HeaderWrapper>
  );
});

export default Header;
