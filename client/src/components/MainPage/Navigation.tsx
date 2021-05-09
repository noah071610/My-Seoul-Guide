/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { main_nav_list } from "../../config";
import useToggle from "../../hooks/useToggle";

const subMenu = (onMenu: boolean) => css`
  transition: 0.4s all;
  transform: ${onMenu ? "translateY(0)" : "translateY(-150%)"};
`;

const Navigation: FC = observer(() => {
  const [onMenu, onClickMenu] = useToggle(false);

  return (
    <nav>
      <ul>
        {main_nav_list.map((list, i) => {
          return (
            <li className="nav_menu" key={i}>
              <a className="nav_menu_link" onClick={onClickMenu}>
                {list[0]}
              </a>
              <ul css={subMenu(onMenu)} className="nav_sub_menu">
                <li>
                  <a>dwfwefew</a>
                </li>
                <li>
                  <a>adsfawefawfew</a>
                </li>
                <li>
                  <a>fewfewfewfw</a>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navigation;
