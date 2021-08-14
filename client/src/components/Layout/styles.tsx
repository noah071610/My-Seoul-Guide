import styled from "@emotion/styled";
import { SM_SIZE } from "../../config";

export const LayoutWrapper = styled.div`
  width: 100%;
  .main_wrapper {
    height: calc(100vh - 59.26px);
    display: flex;
    position: relative;
    .content_wrapper {
      width: 100%;
      overflow: auto;
      position: relative;
    }
  }
  .map {
    &_route {
      height: calc(100% - 330px);
      width: 100%;
    }
    &_acm {
      height: calc(100% - 470px);
      width: 100%;
      transition: 0.3s all;
      &:hover {
        height: 70%;
      }
    }
    @media only screen and (max-width: ${SM_SIZE}) {
      &_route {
        height: calc(100% - 350px);
      }
    }
  }
`;
