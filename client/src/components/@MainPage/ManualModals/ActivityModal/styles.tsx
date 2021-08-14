import { BLUE_COLOR, SM_SIZE } from "../../../../config";
import styled from "@emotion/styled";

export const ActivityModalWrapper = styled.div`
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  margin: 0;
  width: 95%;
  height: 85%;
  overflow-y: auto;
  h3 {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .recommend {
    &_container {
      display: grid;
      grid-template-rows: repeat(3, 32%);
      grid-template-columns: repeat(3, 1fr);
      height: 80%;
      gap: 7px;
      margin: 1rem 0;
    }
    &_tags {
      margin: 1rem 0;
      li {
        margin-right: 0.5rem;
        cursor: default;
      }
    }
    &_card {
      cursor: pointer;
      position: relative;
      transition: 0.4s all;
      &:hover {
        h4 {
          opacity: 1;
        }
        .recommend_img {
          opacity: 0.3;
        }
      }
      .recommend_img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      h4 {
        opacity: 0;
        position: absolute;
        width: 80%;
        font-size: 0.9rem;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &_submit {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      button {
        font-size: 2rem;
        font-weight: bold;
        &:hover {
          color: ${BLUE_COLOR};
        }
      }
    }
    &_checked {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    top: 10%;
    height: 70%;
    .recommend {
      &_container {
        gap: 4px;
      }
      &_card {
        h4 {
          width: 100%;
          font-size: 0.5rem;
        }
      }
      &_checked {
        width: 30%;
      }
    }
  }
`;
