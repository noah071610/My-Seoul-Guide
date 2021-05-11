/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { mainStore } from "../@store/store";
import { main_nav_list, MD_SIZE } from "../config";

interface NavProps {
  isSmall: boolean;
}

const SubMenuCSS = (menuIdx: number, stopAnimation: number | null) => css`
  overflow: hidden;
  div {
    ${stopAnimation === menuIdx ? null : "transition: 0.3s all"};
  }
  a {
    color: white;
    padding: 1rem 0 1rem 3rem;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const navCSS = (onSmallNav: boolean) => css`
  transition: 0.3s all;
  @media only screen and (max-width: ${MD_SIZE}) {
    ${onSmallNav &&
    "transform:translateX(0); width:200px; position:absolute; top:59.26px;left:0;z-index:1; font-size:0.8rem; height:100%"};
  }
`;

export interface IdxHash {
  menuIdx: number;
  activeIdx: number;
}

const Navigation: FC<NavProps> = observer(() => {
  let navRefs = useRef<HTMLDivElement[]>([]);

  // Get the indexHash for slide menu animation
  let activeIdx = 0;
  let idxHash: IdxHash[] = [];

  const [stopAnimation, setStopAnimation] = useState<number | null>(null);
  const history = useHistory();
  const onClickMenu = useCallback((menuIdx: number) => {
    let menuIdxWithActiveIdx = idxHash.find((v) => {
      return v.menuIdx === menuIdx;
    });
    //where is the ref index for opening sub menu? => activeIndex
    //idxHash {menuIdx: menu index which have sub menus , activeIndex}
    mainStore.onChangeActiveMenu(menuIdxWithActiveIdx as IdxHash);
    navRefs?.current[menuIdxWithActiveIdx?.activeIdx as number].classList.toggle("onSubMenu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickSubMenu = (path: string, subMenuIdx: number) => {
    if (path === "airport_route") {
      mainStore.deleteAcmCard();
      mainStore.addAirportCard(subMenuIdx);
    } else if (path === "acm") {
      mainStore.deleteAirportCard();
      mainStore.addAcmCard(subMenuIdx);
    }
    if (mainStore.onSmallNav) {
      mainStore.onToggleSmallNav();
    }
    history.push(`/${path}`);
  };
  const onClickNoSubMenu = () => {
    if (mainStore.onSmallNav) {
      mainStore.onToggleSmallNav();
    }
    mainStore.onChangeActiveMenu(null);
  };
  useEffect(() => {
    if (mainStore.activeMenuIdx) {
      navRefs.current[mainStore.activeMenuIdx.activeIdx].classList.add("onSubMenu");
      setStopAnimation(mainStore.activeMenuIdx.menuIdx);
    } else {
      setStopAnimation(null);
    }
  }, [navRefs]);

  return (
    <nav css={navCSS(mainStore.onSmallNav)} className="nav">
      <ul>
        {main_nav_list.map((list, menuIdx) => {
          return (
            <li key={menuIdx} className="nav_menu">
              {list.length > 2 ? (
                <a onClick={() => onClickMenu(menuIdx)} className="nav_menu_link">
                  {list[0]}
                </a>
              ) : (
                <Link onClick={onClickNoSubMenu} className="nav_menu_link" to={list[1]}>
                  {list[0]}
                </Link>
              )}
              {/* Sub Menu */}
              {list.length > 2 && (
                <ul css={SubMenuCSS(menuIdx, stopAnimation)} className="nav_sub_menu">
                  <div
                    className="offSubMenu"
                    ref={(el) => {
                      //el will be pushed sequentially that's why i did ++ ㅇㅋ?
                      idxHash.push({ menuIdx, activeIdx: activeIdx++ });
                      navRefs.current = [...navRefs.current, el!];
                    }}
                  >
                    {list.slice(2, list.length).map((subList, subMenuIdx) => (
                      <li key={subMenuIdx}>
                        <a
                          className="sub_menu_link"
                          onClick={() => onClickSubMenu(list[1], subMenuIdx)}
                        >
                          {subList}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navigation;
