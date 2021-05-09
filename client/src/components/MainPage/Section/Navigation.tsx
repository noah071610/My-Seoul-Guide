/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { main_nav_list } from "../../../config";

const Navigation: FC = observer(() => {
  const wordsRef = useRef<HTMLDivElement[]>([]);

  const onClickMenu = (i: number) => {
    wordsRef.current[i].classList.toggle("onSubMenu");
  };
  return (
    <nav>
      <ul>
        {main_nav_list.map((list, i) => {
          return (
            <li key={i} className="nav_menu">
              <a onClick={() => onClickMenu(i)} className="nav_menu_link">
                {list[0]}
              </a>
              <ul className="nav_sub_menu">
                <div
                  className="offSubMenu"
                  ref={(el) => (wordsRef.current = [...wordsRef.current, el!])}
                  key={i}
                >
                  <li>
                    <a>dwfwefew</a>
                  </li>
                  <li>
                    <a>adsfawefawfew</a>
                  </li>
                  <li>
                    <a>fewfewfewfw</a>
                  </li>
                </div>
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navigation;
