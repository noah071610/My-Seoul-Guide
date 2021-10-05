import { BLUE_COLOR, SM_SIZE, WHITE_COLOR } from "config";
import styled from "@emotion/styled";

export const RouteCardListMenu = styled.div`
  .ant-select-selection-item {
    padding: 0 !important;
  }
  .ant-select-arrow {
    display: none;
  }
  .route {
    &_header {
      padding: 1rem;
      font-size: 0.9rem;
      display: flex;
    }
    &_title {
      display: flex;
      align-items: center;
      &_name {
        margin-right: 1rem;
      }
    }
    &_recm {
      display: flex;
      align-items: center;
      &_desc {
        margin: 0 0.5rem 0 1.5rem;
      }
      &_list {
        display: flex;
        align-items: center;
        li {
          margin: 0 0 0 0.5rem;
          &:hover {
            a {
              color: ${WHITE_COLOR};
            }
          }
        }
      }
    }
    @media only screen and (max-width: ${SM_SIZE}) {
      &_header {
        padding: 1rem;
        flex-direction: column;
      }
      &_title {
        display: block;
        &_name {
          margin-right: 1rem;
        }
      }
      &_recm {
        margin-top: 1.5rem;
        &_desc {
          margin: 0 0.5rem 0 0;
        }
        &_list {
          li {
            margin-right: 0.5rem;
            display: inline-block;
          }
        }
      }
    }
  }
`;

export const SliderPrevBtn = styled.button`
  position: absolute;
  z-index: 1;
  top: -3rem;
  font-size: 1.5rem;
  right: 3rem;
  &:hover {
    color: ${BLUE_COLOR};
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    display: none;
  }
`;

export const SliderNextBtn = styled.button`
  position: absolute;
  z-index: 1;
  top: -3rem;
  font-size: 1.5rem;
  right: 1rem;
  &:hover {
    color: ${BLUE_COLOR};
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    display: none;
  }
`;
