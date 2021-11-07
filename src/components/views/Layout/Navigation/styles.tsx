import { css } from "@emotion/react";
import { MAIN_COLOR, MD_SIZE, WHITE_COLOR } from "config";

export const navCSS = (onSmallNav: boolean) => css`
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
      ? `transform:translateX(0); width:200px; position:absolute; top:0; left:0;z-index:50;`
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

export const SubMenuCSS = (menuIdx: number, stopAnimation: number | null) => css`
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
