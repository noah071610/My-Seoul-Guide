import styled from "@emotion/styled";
import { FC, memo } from "react";
import MainPageWrapper from "./MainPageWrapper";

const Error = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 5rem;
  }
  p {
    text-align: center;
  }
`;

const ErrorPage: FC = memo(() => {
  return (
    <MainPageWrapper>
      <Error>
        <h1>Opps!</h1>
        <br />
        <h3>There's some problem to load this page</h3>
        <p>We will fix this problem as soon as possible, Sorry and Thank you for your patience</p>
      </Error>
    </MainPageWrapper>
  );
});

export default memo(ErrorPage);
