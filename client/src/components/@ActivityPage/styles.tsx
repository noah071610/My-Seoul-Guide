import styled from "@emotion/styled";
import { BLUE_COLOR, GRAY_COLOR, LG_SIZE, SM_SIZE } from "../../config";

export const AttractionList = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: calc(100vh - 10rem);
  @media only screen and (max-width: ${LG_SIZE}) {
    grid-template-columns: repeat(2, 1fr);
    height: calc(130vh);
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PagenationBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 1rem;
  .btn-prev {
    &:hover {
      color: ${BLUE_COLOR};
    }
    margin-right: 1rem;
    span {
      margin-right: 1rem;
    }
  }
  .btn-next {
    &:hover {
      color: ${BLUE_COLOR};
    }
    span {
      margin-left: 1rem;
    }
  }
  .btn-none {
    user-select: none;
    color: ${GRAY_COLOR};
    margin-right: 1rem;
    span {
      margin-right: 1rem;
    }
  }
`;
