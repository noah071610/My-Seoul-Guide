import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BLUE_COLOR, MD_SIZE, WHITE_COLOR } from "../../../config";

export const LandingPageWrapper = styled.div`
  position: relative;
  .slick-slider {
    height: 100vh;
    overflow: hidden;
    .landing_bg {
      width: 100%;
      height: 100vh;
    }
  }
  .landing_title {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      transition: 0.3s;
      font-family: "Kaushan Script", cursive;
      color: ${WHITE_COLOR};
      text-align: center;
      user-select: none;
      background-image: linear-gradient(transparent calc(100% - 3px), ${WHITE_COLOR} 5px);
      background-repeat: no-repeat;
      background-size: 0% 100%;
    }
    button {
      transition: 0.3s;
      font-size: 2rem;
      font-weight: bold;
      color: ${WHITE_COLOR};
      &:hover {
        color: ${BLUE_COLOR};
      }
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    .landing_title {
      h1 {
        font-size: 2.5rem;
      }
      button {
        font-size: 1.5rem;
      }
    }
  }
`;

export const TitleUp = (onForm: boolean) => css`
  ${onForm ? "transform:translateY(-210%)" : "transform:translateY(-20%)"};
  ${onForm && "animation: underLining 0.3s 0.4s forwards"};
`;

export const ButtonDown = (onForm: boolean) => css`
  ${onForm ? "transform:translateY(440%)" : "transform:translateY(0)"}
`;

export const PosterCSS = (imageURL: string) => css`
  background: url(${imageURL}) no-repeat fixed center;
  background-size: cover;
  animation: zoomInOut 20s infinite linear alternate forwards;
`;
