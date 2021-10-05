import styled from "@emotion/styled";
import { MD_SIZE, SM_SIZE } from "config";

export const HeaderWrapper = styled.header`
  position: relative;
  padding: 1rem;
  display: flex;
  height: 61px;
  justify-content: space-between;
  .header {
    &_logo {
      color: black;
      font-family: "Kaushan Script", cursive;
      font-weight: bold;
    }
    &_list {
      display: flex;
      .settingIcon {
        font-size: 1.2rem;
        margin-left: 1rem;
        a {
          display: inline-block;
        }
      }
    }
  }

  @media only screen and (max-width: ${MD_SIZE}) {
    .header_logo {
      font-size: 1.2rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .header_list {
      .settingIcon {
        margin-left: 1.5rem;
        span {
          font-size: 1.3rem;
        }
      }
    }
  }
`;
