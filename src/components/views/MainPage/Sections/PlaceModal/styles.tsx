import styled from "@emotion/styled";
import { SM_SIZE } from "config";

export const PlaceModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 80%;
  .recom_for_title {
    margin-bottom: 1rem;
  }
  .recom_choose_title {
    margin-top: 1.5rem;
  }
  .placeTags {
    margin: 1rem 0;
    .tag {
      margin: 0 0.5rem 0 0;
      cursor: default;
    }
  }
  .placeCards {
    width: 100%;
    display: flex;
    span {
      background-color: rgba(0, 0, 0, 0);
      color: black;
      text-decoration: underline;
    }
    .card_title {
      font-size: 1.7rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    font-size: 0.8rem;
    width: 95%;
    top: 12%;
    left: 2.5%;
    transform: inherit;
    height: 420px;
    margin: 0;
    .placeTags {
      margin: 0;
    }
    .placeCards {
      span {
        font-size: 1rem;
      }
      .card_title {
        font-size: 1.4rem;
      }
    }
    .crown {
      width: 3rem;
    }
  }
`;
