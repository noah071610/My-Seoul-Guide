import styled from "@emotion/styled";
import { SM_SIZE } from "config";

export const AppInformationWrapper = styled.aside`
  position: fixed;
  width: 100%;
  transition: 0.4s all;
  padding: 1rem 1rem 2rem 1rem;
  right: 0;
  background-color: #fff;
  z-index: 100;
  text-align: end;
  border-bottom: 1px solid $GRAY_COLOR;
  .information {
    &_list {
      li {
        display: inline-block;
        margin-left: 0.8rem;
        font-size: 1.5rem;
      }
    }
    &_gobackBtn {
      display: inline-block;
      font-size: 1rem;
      font-weight: bold;
      margin: 0.3rem 0 1rem 0;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .information_list {
      li {
        span {
          font-size: 1.3rem;
        }
      }
    }
  }
`;
