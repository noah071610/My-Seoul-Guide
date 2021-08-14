import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BLUE_COLOR, WHITE_COLOR } from "../../config";

export const MainPageWrapper = (isSubmit: boolean, isPermanetSubmit: boolean) => css`
  transition: 0.8s all;
  transform: translateY(${isSubmit ? (isPermanetSubmit ? 0 : "-50%") : 0});
`;

export const RoutePreview = styled.div`
  background-color: ${WHITE_COLOR};
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  transform: translateY(-100%);
  z-index: 1;
  cursor: pointer;
  h3 {
    color: ${BLUE_COLOR};
  }
  span {
    position: absolute;
    font-size: 2rem;
    bottom: -1rem;
    left: -1rem;
  }
`;

export const TogoPopup = styled.div`
  display: flex;
  width: 200px;
  a {
    width: 50%;
    text-align: center;
  }
`;
