/* eslint-disable react-hooks/exhaustive-deps */

import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { mainStore } from "../../store/store";
import { main_nav_list } from "../../config";
import { IdxHash } from "../../types";
import { navCSS, SubMenuCSS } from "./styles";

const Navigation: FC = observer(() => {
  const history = useHistory();
  let navRefs = useRef<HTMLUListElement[]>([]);

  // Get the indexHash for slide menu animation (Jang-hyun-soo)
  let activeIdx = 0;
  let idxHash: IdxHash[] = [];

  const [stopAnimation, setStopAnimation] = useState<number | null>(null);

  const onClickMenu = useCallback((menuIdx: number) => {
    let menuIdxWithActiveIdx = idxHash.find((v) => {
      return v.menuIdx === menuIdx;
    });
    mainStore.onChangeActiveMenu(menuIdxWithActiveIdx as IdxHash);
    navRefs?.current[menuIdxWithActiveIdx?.activeIdx as number].classList.toggle("onSubMenu");
  }, []);

  const onClickSubMenu = useCallback((menuName: string, path: string, subMenuIdx: number) => {
    if (mainStore.onSmallNav) {
      mainStore.onToggleSmallNav();
    }
    if (menuName === "activity") {
      history.push(`/${menuName}/${path.toLowerCase()}`);
    }
    if (menuName === "stay") {
      history.push("/stay");
      mainStore.changePlace(mainStore.recommend_places[subMenuIdx].id - 1);
    }
  }, []);

  const onClickNoSubMenu = useCallback(() => {
    if (mainStore.onSmallNav) {
      mainStore.onToggleSmallNav();
    }
    mainStore.onChangeActiveMenu(null);
  }, []);

  useEffect(() => {
    if (mainStore.activeMenuIdx) {
      navRefs.current[mainStore.activeMenuIdx.activeIdx].classList.add("onSubMenu");
      setStopAnimation(mainStore.activeMenuIdx.menuIdx);
    } else {
      setStopAnimation(null);
    }
  }, [navRefs]);

  return (
    <nav css={navCSS(mainStore.onSmallNav)}>
      <ul>
        {main_nav_list.map((list, menuIdx) => {
          return (
            <li key={menuIdx} className="nav_menu">
              {list.length > 2 ? (
                <a onClick={() => onClickMenu(menuIdx)} className="nav_menu_link">
                  {list[0]}
                </a>
              ) : (
                <Link onClick={onClickNoSubMenu} className="nav_menu_link" to={`/${list[1]}`}>
                  {list[0]}
                </Link>
              )}
              {/* Sub Menu */}
              {list.length > 2 && (
                <div css={SubMenuCSS(menuIdx, stopAnimation)} className="nav_sub_menu">
                  <ul
                    className="offSubMenu"
                    ref={(el) => {
                      //el will be pushed sequentially that's why i did ++ (JANG-HYUN-SOO 2021-05-22)
                      idxHash.push({ menuIdx, activeIdx: activeIdx++ });
                      navRefs.current = [...navRefs.current, el!];
                    }}
                  >
                    {list.slice(2, list.length).map((subList, subMenuIdx) => (
                      <li key={subMenuIdx}>
                        <a
                          className="sub_menu_link"
                          onClick={() => onClickSubMenu(list[1], subList, subMenuIdx)}
                        >
                          {list[1] === "stay"
                            ? mainStore.recommend_places[subMenuIdx]?.title._text
                            : subList}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navigation;
