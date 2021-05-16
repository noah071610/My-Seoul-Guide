import { InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { mainStore } from "../@store/store";

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
    <header>
      <Link className="header_logo" to="/">
        My Seoul Guide
      </Link>
      <div>
        <a className="settingIcon" onClick={onClickInfo}>
          <InfoCircleOutlined />
        </a>
        <a className="settingIcon md_visible" onClick={onClickMenu}>
          <MenuOutlined />
        </a>
      </div>
    </header>
  );
});

export default Header;
