import styled from "@emotion/styled";
import { GRAY_COLOR, MD_SIZE, RED_COLOR, SM_SIZE } from "config";

export const CheckListWrapper = styled.section`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 75%;
  left: 50%;
  width: 70%;
  height: 370px;
  overflow: auto;
  transform-style: preserve-3d;
  perspective: 300px;
  visibility: hidden;
  animation: flip 0.4s 0.8s forwards;
  box-shadow: 10px 10px 30px ${GRAY_COLOR};
  .listForm {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1.5rem;
    h3 {
      transition: 0.3;
      background-image: linear-gradient(transparent calc(100% - 3px), ${RED_COLOR} 5px);
      background-repeat: no-repeat;
      background-size: 0% 100%;
      span {
        margin-left: 5px;
        color: ${RED_COLOR};
        font-size: 0.9rem;
      }
    }
  }
  .checkBox {
    margin: 1rem 0 2rem 0;
    label {
      margin: 0.5rem 1rem 0.5rem 0;
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    height: 230px;
    width: 90%;
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    width: 95%;
    .listForm {
      font-size: 0.8rem;
    }
  }
`;
