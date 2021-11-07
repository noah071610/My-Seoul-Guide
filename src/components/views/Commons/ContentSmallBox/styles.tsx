import styled from "@emotion/styled";
import { MD_SIZE, SM_SIZE } from "config";

export const ContentSmallWrapper = styled.article`
  position: relative;
  padding: 1rem;
  transition: 0.4s all;
  width: 100%;
  .cardTitle {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 1.3rem;
    &_text {
      font-family: "Kaushan Script", cursive;
    }
    a:last-child {
      font-size: 0.9rem;
    }
  }
  .get_point {
    margin: 0.8rem 0 0 0;
  }
  .image_wrapper {
    overflow: hidden;
    border-radius: 10px;
    .place_img {
      width: 100%;
      height: 175px;
      transition: 0.4s all;
      border-radius: 10px;
    }
  }
  .crown {
    position: absolute;
    top: 3rem;
    right: -1rem;
    transform: rotate(45deg);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    .place_img {
      transform: scale(1.05);
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    .cardTitle {
      a {
        display: none;
      }
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    padding: 0.5rem;
    .cardTitle {
      margin: 0 0 0.3rem 0;
      &_text {
        font-size: 1.2rem;
      }
    }
    .image_wrapper {
      .place_img,
      .airport_img {
        height: 120px;
      }
    }
  }
`;
