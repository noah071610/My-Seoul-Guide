/* eslint-disable react-hooks/exhaustive-deps */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { mainStore } from "../@store/store";
import { MAIN_COLOR, main_nav_list, MD_SIZE, WHITE_COLOR } from "../config";
import { IdxHash } from "../types";

const navCSS = (onSmallNav: boolean) => css`
  transition: 0.3s all;
  width: 320px;
  height: 100vh;
  font-size: 1.1rem;
  background-color: ${MAIN_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nav_menu {
    &_link {
      padding: 1.5rem;
      color: ${WHITE_COLOR};
      background-color: ${MAIN_COLOR};
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  .offSubMenu {
    transform: translateY(-100%);
    height: 0;
  }
  .onSubMenu {
    transform: translateY(0);
    height: 100%;
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    ${onSmallNav
      ? `transform:translateX(0); width:200px; position:absolute; top:0; left:0;z-index:1;`
      : `transform: translateX(-100px);
    width: 0px;
    height: 100%;`}
    .nav_menu {
      &_link {
        font-size: 1rem;
      }
    }
  }
`;

const SubMenuCSS = (menuIdx: number, stopAnimation: number | null) => css`
  overflow: hidden;
  ul {
    ${stopAnimation === menuIdx ? null : "transition: transform 0.3s"};
  }
  a {
    color: white;
    padding: 1rem 0 1rem 3rem;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Navigation: FC = observer(() => {
  const history = useHistory();
  let navRefs = useRef<HTMLUListElement[]>([]);

  // Get the indexHash for slide menu animation
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
                      //el will be pushed sequentially that's why i did ++
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
