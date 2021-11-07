import styled from "@emotion/styled";
import { SM_SIZE } from "config";

export const Budget = styled.div`
  display: flex;
  padding: 1rem;
  font-weight: normal;
  justify-content: space-between;
  align-items: center;
  .budget_title {
    margin-right: 1rem;
    font-size: 1.2rem;
    &_input {
      border: none;
      border-bottom: 1px solid $GRAY_COLOR;
      width: 20%;
      &:focus {
        border: none;
        outline: none;
        border-bottom: 1px solid $GRAY_COLOR;
      }
    }
  }
  .budget_btns {
    a {
      display: inline-block;
      margin-left: 1rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    flex-direction: column;
    align-items: flex-start;
    .budget_title {
      font-size: 1.4rem;
    }
    .budget_btns {
      margin-top: 1rem;
      a {
        font-size: 1.1rem;
        margin: 0 1rem 0 0;
      }
    }
  }
`;

export const PaymentLists = styled.ul`
  padding: 1rem;
  display: flex;
  font-size: 0.9rem;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: 0.3s all;
  .memo_list {
    display: inline-block;
  }
  .delete_btn {
    display: inline-block;
    margin-left: 1rem;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    flex-direction: column;
    .rest_list {
      display: none;
    }
    .memo_list {
      display: block;
      margin-top: 1rem;
    }
  }
`;
