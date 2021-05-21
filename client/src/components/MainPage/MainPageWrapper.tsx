import { FC, ReactNode } from "react";
import Navigation from "../Navigation";
import Header from "../Header";
import Footer from "../Footer";
import styled from "@emotion/styled";
import { SM_SIZE } from "../../config";
const PageWrapper = styled.div`
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
      height: 50%;
      width: 100%;
    }
    &_acm {
      height: 30%;
      width: 100%;
      transition: 0.3s all;
      &:hover {
        height: 70%;
      }
    }
    @media only screen and (max-width: ${SM_SIZE}) {
      &_route {
        height: 55%;
      }
    }
  }
`;

interface Wrapper {
  children: ReactNode;
}

const MainPageWrapper: FC<Wrapper> = ({ children }) => {
  return (
    <PageWrapper>
      <Header />
      <div className="main_wrapper">
        <Navigation />
        <div className="content_wrapper">
          <Footer />
          {children}
        </div>
      </div>
    </PageWrapper>
  );
};

export default MainPageWrapper;
