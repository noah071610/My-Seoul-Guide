import styled from "@emotion/styled";
import { Modal } from "antd";
import { SM_SIZE } from "../../../config";

export const LedgerModalWrapper = styled(Modal)`
  h3:first-of-type {
    margin-bottom: 0.5rem;
  }
  h3:nth-of-type(n + 2) {
    margin: 1rem 0 0.5rem 0;
  }
  .type_selector {
    width: 40%;
  }
  .payment {
    &_usd {
      width: 30%;
    }
    &_krw {
      width: 40%;
    }
    &_memo {
      width: 70%;
    }
    &_btn {
      margin-top: 1rem;
      width: 30%;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .type_selector {
      width: 60%;
    }
    .payment {
      &_usd {
        width: 40%;
      }
      &_krw {
        width: 50%;
      }
      &_btn {
        width: 50%;
      }
    }
  }
`;
